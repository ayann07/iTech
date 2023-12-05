import React, { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Snackbar,
  SnackbarContent,
} from "@mui/material";

const ProductDetails = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((x) => x.id === id);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!product) {
    return (
      <>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5">Loading...</Typography>
        </Container>
      </>
    );
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
    setSnackbarOpen(true);
  };

  return (
    <Container>
      <Typography variant="h3" mt="70px" mb="20px" textAlign="center" sx={{ fontFamily: "times-new-roman", fontWeight: "bolder" }}>
        Product
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper style={{ padding: "1rem" }} variant="outlined" square>
            <img src={product.image.url} alt={product.name} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper style={{ padding: "1rem", marginTop: "5rem" }} variant="outlined" square>
            <Typography variant="h4" component="h4" fontWeight="500">
              {product.name}
            </Typography>
            <Typography
              variant="h6"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{ mt: 3 }}
              onClick={handleAddToCart}
              disabled={!product.inventory.available}
            >
              {!product.inventory.available ? "Out Of Stock" : "Add To Cart"}
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{ mt: 3, ml: 3 }}
              LinkComponent={NavLink}
              to="/cart"
              color="inherit"
            >
              View Cart
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={7000} 
        onClose={handleSnackbarClose}
      >
        <SnackbarContent
          sx={{
            backgroundColor: "#2e6b31",
            color: "white",
          }}
          message="Item added successfully!"
        />
      </Snackbar>
    </Container>
  );
};

export default ProductDetails;
