import React, { useState } from 'react';
import axios from 'axios';
import { XMarkIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function ProductModal() {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        product_name: '',
        product_sname: '',
        brand: '',
        Product_price: '',
        category: '',
        weight: '',
        unit_of_measurement: '',
        stock: '',
        expiry_date: '',
        description: '',
        images: [],
    });
    const [previewImages, setPreviewImages] = useState([]);

   const categories = [
    'මුරුණු කුඩු නොකපූ මසාලා (Whole Spices)',
    'මසාලා කුඩු (Ground Spices)',               
    'මිශ්‍රිත මසාලා (Blended Spices)',         
    'වර්ගා (ඇලු, කොළ, මුල)(Herbs)',  
    'අමුණුම් (Seasonings) (Seasonings)',    
    'සුගඳ මසාලා (Aromatic Spices)',             
    'මිරිස් & මිරිස් වර්ග (Pepper & Chilies)',      
    'විශේෂ/අනර්ඝ මසාලා (Exotic Spices)',
    'තේජස් කොළ සහ සුවඳ පඳුරු (Fresh Herbs)'   
];


    function modalOpen() {
        setOpenModal(true);
    }

    function modalClose() {
        setOpenModal(false);
        setFormData({
            product_name: '',
            product_sname: '',
            brand: '',
            Product_price: '',
            category: '',
            weight: '',
            unit_of_measurement: '',
            stock: '',
            expiry_date: '',
            description: '',
            images: [],
        });
        setPreviewImages([]);
    }

    function handleCategoryChange(event) {
        setFormData({
            ...formData,
            category: event.target.value,
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleImageChange(event) {
        const files = Array.from(event.target.files);
        const newImages = [...formData.images, ...files];
        setFormData({ ...formData, images: newImages });
        
      
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...newPreviews]);
    }

    function removeImage(index) {
        const newImages = [...formData.images];
        const newPreviews = [...previewImages];
        
        newImages.splice(index, 1);
        newPreviews.splice(index, 1);
        
        setFormData({ ...formData, images: newImages });
        setPreviewImages(newPreviews);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key !== 'images') {
                data.append(key, formData[key]);
            }
        });
        
         formData.images.forEach(image => {
            data.append('images[]', image);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/addproduct', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                alert('Product Added Successfully!');
                modalClose();
            }
        } catch (error) {
            if (error.response) {
                console.error("Error submitting product:", error.response.data);
                alert(JSON.stringify(error.response.data.errors, null, 2));
            } else {
                console.error("Error:", error);
                alert("An unexpected error occurred.");
            }
        }
    }

    return (
        <div>
            <div className="flex justify-end m-5">
                <button
                    onClick={modalOpen}
                    className="flex items-center gap-2 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Create Product
                </button>
            </div>

            {openModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center border-b pb-4">
                                <h3 className="text-2xl font-bold text-gray-800">Add New Product</h3>
                                <button
                                    onClick={modalClose}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="mt-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Name (English)
                                            </label>
                                            <input
                                                type="text"
                                                name="product_name"
                                                value={formData.product_name}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Type product name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Product Name (Sinhala)
                                            </label>
                                            <input
                                                type="text"
                                                name="product_sname"
                                                value={formData.product_sname}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Type product name"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Brand
                                            </label>
                                            <input
                                                type="text"
                                                name="brand"
                                                value={formData.brand}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="Product brand"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Price (LKR)
                                            </label>
                                            <input
                                                type="number"
                                                name="Product_price"
                                                value={formData.Product_price}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="100.00"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Category
                                            </label>
                                            <select
                                                value={formData.category}
                                                onChange={handleCategoryChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
                                            >
                                                <option value="">Select category</option>
                                                {categories.map((cat, index) => (
                                                    <option key={index} value={cat}>{cat}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Weight
                                                </label>
                                                <input
                                                    type="number"
                                                    name="weight"
                                                    value={formData.weight}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Unit
                                                </label>
                                                <input
                                                    type="text"
                                                    name="unit_of_measurement"
                                                    value={formData.unit_of_measurement}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                    placeholder="kg, g, etc."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Stock Quantity
                                            </label>
                                            <input
                                                type="number"
                                                name="stock"
                                                value={formData.stock}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                placeholder="100"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="date"
                                                name="expiry_date"
                                                value={formData.expiry_date}
                                                onChange={handleInputChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows="3"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Enter product description"
                                    />
                                </div>
                                <div className="mt-6">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Product Images (Upload multiple)
                                    </label>
                                    
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {previewImages.map((preview, index) => (
                                            <div key={index} className="relative group">
                                                <img 
                                                    src={preview} 
                                                    alt={`Preview ${index}`}
                                                    className="h-24 w-24 object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <XMarkIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <PhotoIcon className="h-8 w-8 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                PNG, JPG, JPEG (MAX. 5MB each)
                                            </p>
                                        </div>
                                        <input 
                                            id="dropzone-file" 
                                            type="file" 
                                            className="hidden" 
                                            multiple
                                            onChange={handleImageChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                <div className="mt-8 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={modalClose}
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-600 rounded-md text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save Product
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}