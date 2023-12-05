import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Confirmation = ({ order, error, setOrder }) => {
  if (error) {
    return (
      <>
        <Typography variant="h5" gutterBottom>
          Error: {error}
        </Typography>
        <Button
          LinkComponent={Link}
          to="/"
          color="success"
          variant="contained"
          disableElevation
          onClick={() => setOrder({})}
        >
          Back To Home
        </Button>
      </>
    );
  }

  return order.customer ? (
    <div>
      <Typography variant="h5" fontWeight="700" textAlign="center">
        Order Confirmed.
      </Typography>
      <CheckCircle
        sx={{
          fontSize: "10rem",
          margin: "0 auto",
          display: "block",
          color: "#2e7d32",
        }}
      />
      <Typography variant="h6">
        Thank you for your purchase, {order.customer.firstname}{" "}
        {order.customer.lastname}
      </Typography>
      <Divider />
      <Typography variant="body1" sx={{ fontWeight: "bolder", fontFamily: "times-new-roman" }}>
        Order ref: {order.customer_reference}
      </Typography>
      <br />
      <Button
        LinkComponent={Link}
        to="/"
        color="success"
        variant="contained"
        disableElevation
        onClick={() => setOrder({})}
      >
        Back To Home
      </Button>
    </div>
  ) : (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "400px",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Confirmation;