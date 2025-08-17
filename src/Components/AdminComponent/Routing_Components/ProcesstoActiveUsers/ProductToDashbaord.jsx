import React, { useState } from 'react';
import ProductModalUser from './ProductModalUser';
import ProductUserTable from './ProductUserTable';

function ProductToDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  
  const handleProductAdded = () => {
  alert('New product added');
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <button
          onClick={handleOpenModal}
          className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add New Product
        </button>
      </div>
      
      <ProductModalUser
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onProductAdded={handleProductAdded}
      />
      <ProductUserTable/>
    </div>
  );
}

export default ProductToDashboard;