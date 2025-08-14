import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'
export default function LatestProducts() {
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/getproducts')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.log("There was an error fetching the products:", error);
            });
    }, []);

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:8000/api/deleteproduct/${id}`)
            .then(response => {
                setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
                alert('Product deleted successfully!');
            })
            .catch(error => {
                console.error("There was an error deleting the product:", error);
                alert('Failed to delete product!');
            });
    };

    const openEditModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleEditSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:8000/api/updateproduct/${selectedProduct.id}`, selectedProduct)
            .then(response => {
                setProducts(prevProducts => prevProducts.map(product => product.id === selectedProduct.id ? response.data : product));
                closeEditModal();
                alert('Product updated successfully!');
            })
            .catch(error => {
                console.error("There was an error updating the product:", error);
                alert('Failed to update product!');
            });
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-screen-2xl">
                    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                            <div className="flex items-center flex-1 space-x-4">
                                <h5>
                                    <span className="text-gray-500">All Products:</span>
                                    <span className="text-red-700"> 60</span>
                                </h5>
                                <h5>
                                    <span className="text-gray-500">Total sales:</span>
                                    <span className='text-green-600'> $88.4k</span>
                                </h5>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="p-4"></th>
                                        <th scope="col" className="px-4 py-3">Product</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">Delete</th>
                                        <th scope="col" className="px-4 py-3">Edit</th>
                                        <th scope="col" className="px-4 py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td className="w-4 px-4 py-3"></td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {product.Product_image && (
                                                    <img
                                                        src={`http://localhost:8000/storage/${JSON.parse(product.Product_image)[0]}`}
                                                        alt={product.product_name}
                                                        className="w-10 h-10 mr-3 object-cover"
                                                    />
                                                )}
                                            </td>
                                            <td className="px-4 py-2">
                                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"> {product.product_name}</span>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className="flex items-center">
                                                    LKR.{product.Product_price}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-red-700 cursor-pointer hover:text-red-800">
                                                <button
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-blue-700 cursor-pointer">
                                                <button onClick={() => openEditModal(product)}>Edit</button>
                                            </td>
                                            <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <p className='text-green-400'>Done</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed  inset-0  overflow-y-auto h-full w-full flex items-center justify-center">
                    <div className="bg-gray-900 text-white rounded-lg shadow-xl p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="product_name">
                                    Product Name
                                </label>
                                <input
                                    type="text"
                                    id="product_name"
                                    value={selectedProduct.product_name}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, product_name: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="Product_price">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    id="Product_price"
                                    value={selectedProduct.Product_price}
                                    onChange={(e) => setSelectedProduct({ ...selectedProduct, Product_price: e.target.value })}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}