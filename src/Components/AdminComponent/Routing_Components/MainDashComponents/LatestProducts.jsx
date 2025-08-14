import React from 'react'

export default function LatestProducts() {
    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="px-4 mx-auto max-w-screen-2xl">
                    <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                            <div className="flex items-center flex-1 space-x-4">
                                <h5>
                                    <span class="text-gray-500">All Products:</span>
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
                                    <tr class=" hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td class="w-4 px-4 py-3">

                                        </td>
                                        <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <img src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png" alt="iMac Front Image" class="w-auto h-8 mr-3" />
                                            Apple iMac 27&#34;
                                        </th>
                                        <td class="px-4 py-2">
                                            <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">Desktop PC</span>
                                        </td>
                                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <div class="flex items-center">
                                               LKR.100.00
                                            </div>
                                        </td>
                                        <td class="px-4 py-2 font-medium text-red-700 cursor-pointer hover:text-red-800"><a>Delete</a></td>
                                        <td class="px-4 py-2 font-medium text-blue-700  cursor-pointer"><a>Edit</a></td>
                                        <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap ">
                                            <div class="flex items-center">

                                                <p className='text-green-400'>Done</p>
                                            </div>
                                        </td>


                                    </tr>

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