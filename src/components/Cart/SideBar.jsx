import { Button, Divider, List, ListItem, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ cart, isEmpty, onRemoveAll }) => {
  return (
    <>
      <List>
        <ListItem>
          <Typography variant="h5" component="h5" sx={{ fontWeight: "bolder" }}>
            Summary
          </Typography>
        </ListItem>
        <Divider />
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h5">
            Total items:
          </Typography>
          <Typography variant="h5" component="h5">
            {isEmpty ? 0 : cart.total_items}
          </Typography>
        </ListItem>
        <ListItem sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5" component="h5">
            Total Price:
          </Typography>
          <Typography variant="h5" component="h5">
            {isEmpty ? "₹0.00" : cart.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
        <ListItem>
          <Button
            style={{ display: "block", margin: "0 auto" }}
            color="error"
            variant="outlined"
            disableElevation
            onClick={() => onRemoveAll()}
            disabled={isEmpty}
          >
            Empty Cart
          </Button>
          <Button
            LinkComponent={Link}
            to="/cart/checkout"
            style={{ display: "block", margin: "0 auto" }}
            color="success"
            variant="contained"
            disableElevation
            disabled={isEmpty}
          >
            Checkout
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export default SideBar;