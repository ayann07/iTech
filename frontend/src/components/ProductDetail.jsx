import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../main";
import Loading from "./Loader";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState("");
    const { authToken } = useSelector(state => state.user);
    const addToCart = async () => {
        try {
            const res = await fetch(`${BASE_URL}/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authToken
                },
                body: JSON.stringify({ productId: product.id, quantity: 1 }) // Sending product ID & quantity
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to add item to cart");
            }

            toast.success("Item added to cart! 🛒");
        } catch (err) {
            console.error("Error adding to cart:", err);
            toast.error(err.message || "Something went wrong");
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${BASE_URL}/products/${id}`);
                const data = await res.json();
                setProduct(data.data);
                setMainImage(data.data.images[0]); // Set first image as default
            } catch (error) {
                console.error("Failed to fetch product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <Loading />;

    return (
        <div className="container mx-auto py-10 px-6">
            <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 transition-all duration-300 hover:shadow-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    <div>

                        <div className="h-96 flex items-center justify-center bg-gray-100 rounded-xl shadow-lg overflow-hidden relative group">
                            <motion.img
                                src={mainImage}
                                alt={product.name}
                                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                                key={mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            />
                        </div>


                        <div className="flex mt-4 gap-3 justify-center">
                            {product.images.map((img, index) => (
                                <motion.img
                                    key={index}
                                    src={img}
                                    alt={`Thumbnail ${index}`}
                                    className={`h-20 w-20 object-cover border-2 rounded-md cursor-pointer transition-all duration-300 
                                    ${mainImage === img ? "border-indigo-500 shadow-lg scale-110" : "border-gray-300"}
                                    `}
                                    onClick={() => setMainImage(img)}
                                    whileHover={{ scale: 1.1 }}
                                />
                            ))}
                        </div>
                    </div>


                    <div className="space-y-6">
                        <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
                        <p className="text-gray-600 text-lg">{product.description}</p>
                        <p className="text-3xl font-bold text-black">₹{product.price}</p>


                        <div className="flex space-x-4">
                            <motion.button
                                className="border-2 border-gray-800 font-semibold py-3 px-8 rounded-full bg-gray-800 text-white transition ease-in-out duration-300 mr-2 shadow-md hover:shadow-lg"
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Buy Now
                            </motion.button>

                            <motion.button
                                onClick={addToCart}
                                className="flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-3 px-8 rounded-full hover:from-indigo-700 hover:to-purple-700 transition ease-in-out duration-300 shadow-md hover:shadow-xl"
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Add to Cart
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
