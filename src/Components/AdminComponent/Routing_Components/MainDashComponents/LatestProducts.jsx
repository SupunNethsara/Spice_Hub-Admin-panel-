import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react';
export default function LatestProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:8000/api/getproducts').then(response => {
            setProducts(response.data);
        })
            .catch(error => {
                console.log("There was an error fetching the products:", error);
            });

    }, []);

    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900 ">
                <div class="px-4 mx-auto max-w-screen-2xl ">
                    <div class="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                        <div class="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
                            <div class="flex items-center flex-1 space-x-4">
                                <h5>
                                    <span class="text-gray-500">All Products:</span>
                                    <span className="text-red-700"> 60</span>
                                </h5>
                                <h5>
                                    <span class="text-gray-500">Total sales:</span>
                                    <span className='text-green-600'> $88.4k</span>
                                </h5>
                            </div>

                        </div>
                        <div class="overflow-x-auto">
                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="p-4">
                                            <div class="flex items-center">

                                            </div>
                                        </th>
                                        <th scope="col" class="px-4 py-3">Product</th>
                                        <th scope="col" class="px-4 py-3">Category</th>
                                        <th scope="col" class="px-4 py-3">price</th>
                                        <th scope="col" class="px-4 py-3">Delete</th>
                                        <th scope="col" class="px-4 py-3">Edit</th>
                                        <th scope="col" class="px-4 py-3">Status</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id} class=" hover:bg-gray-100 dark:hover:bg-gray-700">
                                            <td class="w-4 px-4 py-3">

                                            </td>
                                            <th scope="row" class="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <img src={`http://localhost:8000/storage/${product.Product_image}`} alt={product.product_name} class="w-auto h-15 mr-3" />
                                               
                                            </th>
                                            <td class="px-4 py-2">
                                                <span class="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300"> {product.product_name}</span>
                                            </td>
                                            <td class="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div class="flex items-center">
                                                LKR.{product.Product_price}
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

                                    ))}

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
