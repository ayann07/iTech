import {
    Alert,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
    CircularProgress
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import SideBar from "./SideBar";

const Cart = ({ cart, onUpdateCartQty, onRemoveItem, onRemoveAll }) => {
    const isEmpty = !cart?.total_items;
    if (!cart) {
        return (
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
        );
    }

    const EmptyCart = () => {
        return (
            <>
                <Alert severity="error">
                    You have no items in your shopping cart, start adding some!
                </Alert>
                <Button
                    LinkComponent={Link}
                    to="/"
                    variant="contained"
                    color="warning"
                    disableElevation
                    sx={{ mt: 3 }}
                >
                    Go Back
                </Button>
            </>
        );
    };

    const FilledCart = () => {
        return (
            <Grid container rowSpacing={3}>
                {cart.line_items.map((item) => (
                    <Grid item key={item.id} sx={{ width: "100%" }}>
                        <CartItem
                            item={item}
                            onUpdateCartQty={onUpdateCartQty}
                            onRemoveItem={onRemoveItem}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };
    return (
        <Container>
            <Typography
                variant="h3"
                component="h3"
                marginTop="70px"
                marginBottom="20px"
                textAlign="center"
                sx={{ fontWeight: "bolder", fontFamily: "times-new-roman" }}
            >
                Your Shoping Cart
            </Typography>
            <Grid container columnSpacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper style={{ padding: "1rem" }} variant="outlined" square>
                        <Typography variant="h5" component="h5" sx={{ fontWeight: "bolder" }}>
                            Added Items
                        </Typography>
                        <Divider style={{ marginBottom: "1rem" }} />
                        {isEmpty ? <EmptyCart /> : <FilledCart />}
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper style={{ padding: "1rem" }} variant="outlined" square>
                        <SideBar cart={cart} isEmpty={isEmpty} onRemoveAll={onRemoveAll} />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );

};

export default Cart;