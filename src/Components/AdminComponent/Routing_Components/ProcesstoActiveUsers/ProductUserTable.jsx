import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductUserTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getOrder');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-8">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Short Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (LKR)</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products.map((product) => {
                            let productImages = [];
                            try {
                                productImages = JSON.parse(product.Product_image);
                            } catch (e) {
                                console.error("Error parsing product images:", e);
                            }
                            const firstImage = productImages.length > 0 ? productImages[0] : null;

                            return (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {firstImage ? (
                                            <img
                                                src={`http://localhost:8000/storage/${firstImage}`}
                                                alt={product.product_name}
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-xs text-gray-500">No Image</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.product_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.product_sname}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {Number(product.Product_price) ? Number(product.Product_price).toFixed(2) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.weight}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.unit_of_measurement}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.stock}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(product.expiry_date).toLocaleDateString()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductUserTable;