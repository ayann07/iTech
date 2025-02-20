import React, { useState } from "react";
import uploadImageToCloudinary from "../../utils/UploadCloudinary";
import { BASE_URL } from "../../main";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../components/Loader";


const AddProduct = () => {
    const [loading, setLoading] = useState(false)
    const { authToken } = useSelector(state => state.user)
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        images: [],
    });
    const [previewImages, setPreviewImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);

        const validFiles = files.filter(file =>
            ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
        );
        if (validFiles.length !== files.length) {
            console.error("Invalid file type. Only JPG, JPEG, and PNG are allowed.");
            return;
        }

        const filePreviews = validFiles.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...filePreviews]);

        try {
            const uploadedImages = await Promise.all(
                validFiles.map(async (file) => {
                    const imageUrl = await uploadImageToCloudinary(file);
                    return imageUrl;
                })
            );

            setFormData(prev => ({
                ...prev,
                images: [...prev.images, ...uploadedImages],
            }));

            console.log("Uploaded Images:", uploadedImages);
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const removeImage = (index) => {
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.price || !formData.stock || formData.images.length === 0) {
            console.error("All fields are required, including at least one image.");
            return;
        }

        try {
            setLoading(true);
            const res = await fetch(`${BASE_URL}/admin/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authToken
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if (res.ok) {
                toast.success('Product added successfully!')
            }
            else {
                toast.error("some error occured, try again!")
            }
            setFormData({ name: "", description: "", price: "", stock: "", images: [] });
            setPreviewImages([]);
        } catch (error) {
            toast.error("Error while submitting product:", error);
        }
        finally {
            setLoading(false)
        }
    };

    return (
        <div className="p-6 min-h-screen flex justify-center items-center">
            {loading ? (
                <Loading />
            ) : (
                <form onSubmit={handleSubmit} className="bg-white/30 backdrop-blur-lg p-8 rounded-xl shadow-2xl max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Add New Product</h1>

                    <div className="space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                            required
                        />

                        <textarea
                            name="description"
                            placeholder="Description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                            required
                        />

                        <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                            required
                        />

                        <input
                            type="number"
                            name="stock"
                            placeholder="Stock"
                            value={formData.stock}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
                            required
                        />

                        <input
                            type="file"
                            multiple
                            accept=".jpg,.jpeg,.png"
                            onChange={handleImageUpload}
                            className="w-full p-2 border border-gray-300 rounded-lg shadow-md cursor-pointer file:bg-purple-500 file:text-white file:px-4 file:py-2 file:rounded-md file:border-none file:mr-3"
                        />
                    </div>

                    {/* Image Previews */}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {previewImages.map((image, index) => (
                            <div key={index} className="relative w-20 h-20">
                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-full h-full object-cover rounded-lg shadow-md border border-gray-300"
                                />
                                <button
                                    type="button"
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    onClick={() => removeImage(index)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="submit"
                        className="mt-6 w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold px-5 py-3 rounded-lg shadow-lg hover:opacity-90 transition-all"
                    >
                        Add Product
                    </button>
                </form>
            )}

        </div>
    );
};

export default AddProduct;

