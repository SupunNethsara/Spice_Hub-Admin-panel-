import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/Admin_panel";
import React from 'react'
import Authentication from "./Components/Authentication";
import ProtectedRoute from "./Components/ProtectedRoute";
import './Style.css';
import MainDash from "./Components/AdminComponent/Routing_Components/MainDash";
import Products from "./Components/AdminComponent/Routing_Components/Products";
import ProductToDashbaord from "./Components/AdminComponent/Routing_Components/ProcesstoActiveUsers/ProductToDashbaord";
import ShippingManagement from "./Components/AdminComponent/Routing_Components/ShipingComponents/ShippingManagement";




function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Authentication />} />
        <Route path="/login" element={<Authentication />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        >
          <Route index element={<MainDash />} />
          <Route path="main" element={<MainDash />} />
          <Route path="products" element={<Products />} />
          <Route path="user-products" element={<ProductToDashbaord />} />
          <Route path="shipping" element={<ShippingManagement />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
