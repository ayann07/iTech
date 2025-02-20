import React from "react";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BASE_URL } from "../main";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
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
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg p-6 w-80 hover:shadow-2xl transition duration-300 transform hover:scale-105"
      whileHover={{ scale: 1.05 }}
    >

      <div className="h-56 flex items-center justify-center overflow-hidden rounded-xl">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain rounded-lg shadow-md"
        />
      </div>

      <div className="mt-6 space-y-3">

        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">{product.name}</h2>

        <p className="text-sm text-gray-500 line-clamp-3">{product.description}</p>

        <p className="text-xl font-bold text-black">₹{product.price}</p>

        <div className="flex justify-between mt-4">
          <Link to={`/product-detail/${product.id}`}>
            <motion.button
              className=" border-2 border-gray-800 font-semibold py-2 px-6 rounded-full bg-gray-800 text-white transition ease-in-out duration-300 mr-2"
              whileTap={{ scale: 0.95 }}
            >

              View Details
            </motion.button>
          </Link>
          <motion.button
            onClick={addToCart}
            className="flex items-center bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white py-2 px-6 rounded-full hover:from-indigo-700 hover:to-purple-700 transition ease-in-out duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

