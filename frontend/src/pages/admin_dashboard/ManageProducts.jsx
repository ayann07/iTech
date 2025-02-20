import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../main";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../components/Loader";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from 'sweetalert2';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authToken } = useSelector((state) => state.user);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${BASE_URL}/products`, { method: "GET" });
                const data = await res.json();
                setProducts(data.data);
            } catch (error) {
                toast.error("Failed to fetch products!");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            reverseButtons: true
        });

        if (result.isConfirmed) {
            try {
                const res = await fetch(`${BASE_URL}/admin/products/${id}`, {
                    method: "DELETE",
                    headers: { Authorization: authToken },
                });
                if (res.ok) {
                    toast.success("Product deleted successfully!");
                    setProducts(products.filter((product) => product.id !== id));
                } else {
                    toast.error("Failed to delete product.");
                }
            } catch (error) {
                toast.error("Error deleting product.");
            }
        } else {
            toast.info("Product deletion was canceled.");
        }
    };

    const handleUpdate = (id) => {
        window.location.href = `/admin-dashboard/edit-product/${id}`;
    };

    return (
        <div className="p-6 min-h-screen flex justify-center">
            <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl border border-gray-300 transition duration-300 ease-in-out transform hover:shadow-2xl p-4">
                {loading ? (
                    <Loading />
                ) : (
                    <div className="overflow-hidden">
                        <div className="max-h-[500px] overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-gray-800 text-white">
                                    <tr>
                                        <th className="p-4 text-left font-semibold">Name</th>
                                        <th className="p-4 text-left font-semibold">Price</th>
                                        <th className="p-4 text-left font-semibold">Stock</th>
                                        <th className="p-4 text-center font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300">
                                    {products && products.length > 0 ? (
                                        products.map((product, index) => (
                                            <tr 
                                                key={product.id} 
                                                className={`transition duration-300 ease-in-out transform hover:scale-[1.02] ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                                            >
                                                <td className="p-4">
                                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                                </td>
                                                <td className="p-4 text-gray-700">₹{product.price}</td>
                                                <td className="p-4 text-gray-700">{product.stock}</td>
                                                <td className="p-4 flex justify-center gap-4">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-110"
                                                        onClick={() => handleUpdate(product.id)}
                                                        title="Edit"
                                                    >
                                                        <FiEdit />
                                                    </button>
                                                    <button
                                                        className="text-red-600 hover:text-red-800 transition-transform transform hover:scale-110"
                                                        onClick={() => handleDelete(product.id)}
                                                        title="Delete"
                                                    >
                                                        <FiTrash2 />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="p-6 text-center text-gray-600">
                                                No product found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageProducts;
