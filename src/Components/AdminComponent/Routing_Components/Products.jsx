import React from 'react'
import ProductModal from './ProductComponents/ProductModal'
import LatestProducts from './MainDashComponents/LatestProducts'

export default function Products() {
  return (
    <div>
        <h3 className='text-2xl text-gray-500 font-medium ml-7'>Product Management</h3>
        <div>
          <ProductModal/>
          <LatestProducts/>
        </div>
    </div>
  )
}
