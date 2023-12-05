import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Products from "./components/Products/Products";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";
import { CircularProgress, Container, Typography } from "@mui/material";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }
  const handleAddCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart)
    fetchCart();
  }
  const deleteCart = async () => {
    setCart(await commerce.cart.empty());
  }
  const handleUpdateQty = async (productId, quantity) => {
    fetchCart();
    const { cart } = await commerce.cart.update(productId, {
      quantity: quantity,
    });
    setCart(cart);
    fetchCart();
  };
  const handleRemoveItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
    fetchCart();
  };
  const refreshCart = async () => {
    const newCart = commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  console.log(cart);
  if (!products.length) {
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
  return (
    <Router>
      <NavBar totalitems={cart?.total_items} />
      <Routes>
        <Route
          exact
          element={
            <>
              <Home />
              <Products products={products} onAddToCart={handleAddCart} />
            </>
          }
          path="/"
        />
        <Route path="/products" element={<Products products={products} onAddToCart={handleAddCart} />}

        />
        <Route path="/cart" element={<Cart cart={cart} onRemoveAll={deleteCart} onUpdateCartQty={handleUpdateQty} onRemoveItem={handleRemoveItem} />} />
        <Route
            element={
              <ProductDetails products={products} onAddToCart={handleAddCart} />
            }
            path="/product/:id"
          />
          <Route
            element={
              <Checkout
                cart={cart}
                order={order}
                handleCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
                setOrder={setOrder}
              />
            }
            path="/cart/checkout"
          />
      </Routes>
      
      <Footer />
    </Router>

  )
}
export default App;