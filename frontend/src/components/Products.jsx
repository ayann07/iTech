import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { BASE_URL } from "../main";

const sampleProducts = [
    {
        id: 1,
        name: "MacBook Pro 16”",
        description: "Powerful M2 chip, stunning Retina display, and a sleek aluminum design.",
        price: 2399,
    },
    {
        id: 2,
        name: "iPhone 14 Pro",
        description: "A16 Bionic chip, 48MP camera, and Dynamic Island for a new iPhone experience.",
        price: 1099,
    },
    {
        id: 3,
        name: "iPad Air",
        description: "Lightweight, powerful, and perfect for both work and entertainment.",
        price: 599,
    },
];

const Products = () => {
    const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(false)
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/products`, { method: "GET" });
                const data = await res.json();
                // console.log(data)
                setProducts(data.data);
            } catch (error) {
                toast.error("Failed to fetch products!");
            } finally {
                setLoading(false);
            }
            
        };
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Our Products</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {products && products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Products;
