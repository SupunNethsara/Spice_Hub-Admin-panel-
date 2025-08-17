import React, { useState } from 'react';
import axios from 'axios';

function ProductModalUser({ isOpen, onClose, onProductAdded }) {
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

  const [formData, setFormData] = useState({
    product_name: '',
    product_sname: '',
    Product_price: '',
    category: categories[0],
    weight: '',
    unit_of_measurement: '',
    stock: '',
    expiry_date: '',
    description: '',
    images: []
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files
    });

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('product_name', formData.product_name);
      formDataToSend.append('product_sname', formData.product_sname);
      formDataToSend.append('Product_price', formData.Product_price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('weight', formData.weight);
      formDataToSend.append('unit_of_measurement', formData.unit_of_measurement);
      formDataToSend.append('stock', formData.stock);
      formDataToSend.append('expiry_date', formData.expiry_date);
      formDataToSend.append('description', formData.description);
      
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });

      const response = await axios.post('http://localhost:8000/api/StoreProduct', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccessMessage('Product added successfully!');
      // Reset form
      setFormData({
        product_name: '',
        product_sname: '',
        Product_price: '',
        category: categories[0],
        weight: '',
        unit_of_measurement: '',
        stock: '',
        expiry_date: '',
        description: '',
        images: []
      });
      setPreviewImages([]);
      
      // Notify parent component
      if (onProductAdded) {
        onProductAdded();
      }
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Add New Product</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Short Name</label>
                <input
                  type="text"
                  name="product_sname"
                  value={formData.product_sname}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Price (LKR)</label>
                <input
                  type="number"
                  name="Product_price"
                  value={formData.Product_price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Weight</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit of Measurement</label>
                <input
                  type="text"
                  name="unit_of_measurement"
                  value={formData.unit_of_measurement}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  min="0"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Images</label>
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                multiple
                accept="image/*"
                required
              />
              <p className="mt-1 text-sm text-gray-500">Upload multiple images of the product</p>
            </div>
            
            {previewImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Image Previews</h3>
                <div className="flex flex-wrap gap-2">
                  {previewImages.map((preview, index) => (
                    <img 
                      key={index} 
                      src={preview} 
                      alt={`Preview ${index}`} 
                      className="h-24 w-24 object-cover rounded border border-gray-300"
                    />
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductModalUser;