import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import toast from "react-hot-toast";
import { BASE_URL } from "../main";


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
