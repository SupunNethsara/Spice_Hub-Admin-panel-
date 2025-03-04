import React, { useState } from 'react';
import axios from 'axios';
export default function ProductModal() {
    const [openModal, setOpenModal] = useState(false);
    const [category, setCategory] = useState('');
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
        image: null,
    });

    const categories = [
        'Whole Spices', 'Ground Spices', 'Blended Spices',
        'Herbs', 'Seasonings', 'Aromatic Spices',
        'Pepper & Chilies', 'Exotic Spices'
    ];

    function modalOpen() {
        setOpenModal(true);
    }

    function modalClose() {
        setOpenModal(false);
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
        setFormData({ ...formData, image: event.target.files[0] });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            const response = await axios.post('http://localhost:8000/api/addproduct', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                alert('Product Added Successfully!');
                modalClose();
                setFormData({
                    ename: '', sname: '', brand: '', price: '', weight: '',
                    unit_of_measurement: '', stock: '', expiry_date: '',
                    description: '', image: null
                });
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
                    className="block bg-gray-950 text-white hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Create Product
                </button>
            </div>

            {openModal && (
                <div
                    style={{ background: 'rgba(0, 0, 0, 0.7)' }}
                    className="fixed inset-0 z-100 flex justify-center items-center w-full h-full"
                >
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto bg-white rounded-lg shadow sm:p-5">
                        <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
                            <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                                <button
                                    onClick={modalClose}
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="sr-only">Close Modal</span>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            EName
                                        </label>
                                        <input
                                            type="text"
                                            name="product_name"
                                            id="ename"
                                            value={formData.ename}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type product name"
                                            required=""
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            SName
                                        </label>
                                        <input
                                            type="text"
                                            name="product_sname"
                                            id="sname"
                                            value={formData.product_sname}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type product name"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Brand
                                        </label>
                                        <input
                                            type="text"
                                            name="brand"
                                            id="brand"
                                            value={formData.brand}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Product brand"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="Product_price"
                                            id="price"
                                            value={formData.Product_price}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="LKR.100.00"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            value={formData.category}  
                                            onChange={handleCategoryChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        >
                                            <option value="">Select category</option>
                                            {categories.map((cat, index) => (
                                                <option key={index} value={cat}>
                                                    {cat}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Weight (kg)
                                        </label>
                                        <input
                                            type="number"
                                            name="weight"
                                            id="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter weight"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="unit_of_measurement" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Unit of Measurement
                                        </label>
                                        <input
                                            type="text"
                                            name="unit_of_measurement"
                                            id="unit_of_measurement"
                                            value={formData.unit_of_measurement}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="kg, g, lbs, etc."
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Stock
                                        </label>
                                        <input
                                            type="number"
                                            name="stock"
                                            id="stock"
                                            value={formData.stock}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter stock quantity"
                                            required=""
                                        />
                                    </div>



                                    <div>
                                        <label htmlFor="expiry_date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            name="expiry_date"
                                            id="expiry_date"
                                            value={formData.expiry_date}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            required=""
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Description
                                        </label>
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Enter product description"
                                        />
                                    </div>


                                </div>
                                <div>

                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" name='image' onChange={handleImageChange} type="file" />



                                </div>
                                <button
                                    type="submit"
                                    className="mt-7 block bg-blue-500 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
