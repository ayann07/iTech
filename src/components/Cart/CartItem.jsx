import React from "react";
import { Box, Card, CardMedia, IconButton, Typography } from "@mui/material";
import { Cancel, AddCircle, RemoveCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CartItem = ({ item, onUpdateCartQty, onRemoveItem }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Card
        sx={{
          display: "flex",
          flexGrow: "1",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            color: "#000",
            textDecoration: "none",
            flexGrow: 1,
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 80 }}
            image={item.image.url}
            alt={item.name}
          />
          <Typography
            component={Link}
            to={`/product/${item.product_id}`}
            variant="h5"
            sx={{ color: "inherit", textDecoration: "none" }}
          >
            {item.name}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="Decrease Quantity"
            onClick={() => onUpdateCartQty(item.id, item?.quantity - 1)}
          >
            <RemoveCircle />
          </IconButton>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            mx={1}
          >
            {item?.quantity}
          </Typography>
          <IconButton
            aria-label="Increase Quantity"
            onClick={() => onUpdateCartQty(item.id, item?.quantity + 1)}
          >
            <AddCircle />
          </IconButton>
        </div>
        <Typography variant="subtitle1" component="div" mx={2}>
          {item.line_total.formatted_with_symbol}
        </Typography>
      </Card>
      <Box sx={{ display: "block", marginY: "auto", p: 1 }}>
        <IconButton
          aria-label="Remove from Cart"
          onClick={() => onRemoveItem(item.id)}
        >
          <Cancel color="error" />
        </IconButton>
      </Box>
    </div>
  );
};

export default CartItem;