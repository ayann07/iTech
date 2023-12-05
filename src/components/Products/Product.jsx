import React from "react";
import { Card, CardActionArea, CardContent, CardMedia, Typography, IconButton, Divider, Snackbar, SnackbarContent } from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useState } from "react";

import { NavLink } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: "345px",
    margin: "0 auto",
  },
  image: {
    aspectRatio: "4/3",
    objectFit: "contain",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto 1rem",
  },
})
const Product = ({ product, onAddToCart }) => {
  const classes = useStyles();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleAddToCart = () => {
    onAddToCart(product.id, 1);
    setSnackbarOpen(true);
  };
  return (
    <Card variant="outlined" className={classes.root}>
      <CardActionArea LinkComponent={NavLink} to={`/product/${product.id}`}>
        <CardMedia
          component="img"
          image={product.image.url}
          alt={product.name}
          className={classes.image} />
        <Divider />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">{product.name}</Typography>
          <Typography variant="body2" color="text.secondary"
            dangerouslySetInnerHTML={{ __html: product.description }} />
        </CardContent>
      </CardActionArea>
      <div className={classes.content}>
        <Typography variant="h5" py={0.5}>{product.price.formatted_with_symbol}</Typography>
        <IconButton aria-label="add to shopping cart"
          onClick={handleAddToCart}
          disabled={!product.inventory.available}
        >
          {product.inventory.available ? (<AddShoppingCartIcon />)
            : (<ProductionQuantityLimitsIcon />)
          }
        </IconButton>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarOpen}
        autoHideDuration={3000} 
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
    </Card>
  )
}
export default Product;