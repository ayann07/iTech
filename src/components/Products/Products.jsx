import React from "react";
import Product from "./Product";
import { Box, Grid, Typography } from "@mui/material";
const Products = ({ products, onAddToCart }) => {
    return (
        <Box my="70px">
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h3" mb="20px" sx={{ fontWeight: "bolder", fontFamily: "times-new-roman" }}>Products</Typography>
            </div>
            <Grid container justifyContent="center" spacing={4} py="2rem">
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}
export default Products;
