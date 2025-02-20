import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../main"; // Backend URL
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setOrderItems } from "../redux/orderSlice";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const { authToken } = useSelector(state => state.user);
    console.log(cartItems)

    const handleCheckout = () => {
        const orderItems = cartItems.map(item => ({
            productId: item.product.id,
            quantity: item.quantity,
            name: item.product.name,
            price: item.product.price,
            subTotal: item.subprice
        }));

        dispatch(setOrderItems(orderItems));
        navigate("/checkout");
    };
    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`${BASE_URL}/cart`, {
                    method: "GET",
                    headers: {
                        "Authorization": authToken,
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "No item found in cart");
                }

                setCartItems(data.data.cartItems || []);
            } catch (err) {

                console.error("Error fetching cart:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [authToken]);

    const incrementQuantity = async (id) => {
        // Optimistic UI update
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity + 1, subprice: item.subprice + item.product.price }
                    : item
            )
        );

        try {
            const res = await fetch(`${BASE_URL}/cart/item/increment/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": authToken
                }
            });

            if (!res.ok) {
                throw new Error("Failed to update quantity");
            }

            await refreshCart(); // Sync data with the backend after the update
        } catch (err) {
            setError("Error updating quantity");
            console.error("Error incrementing item:", err);

            // Rollback optimistic update on error
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity - 1, subprice: item.subprice - item.product.price }
                        : item
                )
            );
        }
    };

    const decrementQuantity = async (id) => {
        // Optimistic UI update
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.product.id === id
                    ? { ...item, quantity: item.quantity - 1, subprice: item.subprice - item.product.price }
                    : item
            )
        );

        try {
            const res = await fetch(`${BASE_URL}/cart/item/decrement/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization": authToken
                }
            });

            if (!res.ok) {
                throw new Error("Failed to update quantity");
            }

            await refreshCart(); // Sync data with the backend after the update
        } catch (err) {
            setError("Error updating quantity");
            console.error("Error decrementing item:", err);

            // Rollback optimistic update on error
            setCartItems(prevItems =>
                prevItems.map(item =>
                    item.product.id === id
                        ? { ...item, quantity: item.quantity + 1, subprice: item.subprice + item.product.price }
                        : item
                )
            );
        }
    };

    const removeItem = async (id) => {
        try {
            const res = await fetch(`${BASE_URL}/cart/remove/item/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": authToken
                }
            });

            if (!res.ok) {
                throw new Error("Failed to remove item");
            }

            await refreshCart(); // Sync data with the backend after removing the item
        } catch (err) {
            setError("Error removing item");
            console.error("Error removing item:", err);
        }
    };

    const clearCart = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cart/remove`, {
                method: "DELETE",
                headers: {
                    "Authorization": authToken
                }
            });

            if (!res.ok) {
                throw new Error("Failed to clear cart");
            }
            setCartItems([])

        } catch (err) {
            setError("Error clearing cart");
            console.error("Error clearing cart:", err);
        }
    };

    const refreshCart = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cart`, {
                method: "GET",
                headers: {
                    "Authorization": authToken
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to refresh cart");
            }

            setCartItems(data.data.cartItems || []); // Ensure cartItems is always an array
        } catch (err) {
            setError("Error refreshing cart");
            console.error("Error refreshing cart:", err);
        }
    };

    if (loading) return <p className="text-center text-lg">Loading cart...</p>;

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">🛒 Your Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600 text-lg">
                    Your cart is empty. <Link to="/" className="text-indigo-600 font-semibold">Continue Shopping</Link>
                </div>
            ) : (
                <div className="bg-white shadow-lg rounded-2xl p-6">
                    {/* Cart Items List */}
                    <div className="space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b pb-4">
                                {/* Product Image & Details */}
                                <div className="flex items-center space-x-4">
                                    <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 rounded-lg shadow-md object-cover" />
                                    <div>
                                        <h2 className="text-xl font-semibold">{item.product.name}</h2>
                                        <p className="text-gray-600">₹{item.product.price}</p>
                                    </div>
                                </div>

                                {/* Quantity & Subtotal */}
                                <div className="flex items-center space-x-3">
                                    <motion.button
                                        onClick={() => decrementQuantity(item.product.id)}
                                        className="bg-gray-300 px-3 py-1 rounded-full text-gray-700 hover:bg-gray-400 transition-all"
                                        whileTap={{ scale: 0.9 }}
                                    >−</motion.button>

                                    <span className="text-lg font-semibold">{item.quantity}</span>

                                    <motion.button
                                        onClick={() => incrementQuantity(item.product.id)}
                                        className="bg-gray-800 text-white px-3 py-1 rounded-full hover:bg-gray-900 transition-all"
                                        whileTap={{ scale: 0.9 }}
                                    >+</motion.button>
                                </div>

                                {/* Subtotal */}
                                <p className="text-lg font-semibold">₹{item.subprice}</p>

                                {/* Remove Item */}
                                <motion.button
                                    onClick={() => removeItem(item.product.id)}
                                    className="text-red-500 font-semibold hover:text-red-700 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    Remove
                                </motion.button>
                            </div>
                        ))}
                    </div>

                    {/* Total Price & Checkout */}
                    <div className="mt-6 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            Total: ₹{cartItems.reduce((total, item) => total + item.subprice, 0)}
                        </h2>

                        <motion.button
                            onClick={handleCheckout}
                            className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-purple-800 transition-all shadow-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Proceed to Checkout
                        </motion.button>
                    </div>

                    {/* Clear Cart Button */}
                    <div className="mt-4 text-right">
                        <motion.button
                            onClick={clearCart}
                            className="text-red-600 hover:text-red-800 transition-all font-semibold"
                            whileTap={{ scale: 0.95 }}
                        >
                            Clear Cart
                        </motion.button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
