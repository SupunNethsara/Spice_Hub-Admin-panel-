import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/Admin_panel";
import React from 'react'
import Authentication from "./Components/Authentication";
import ProtectedRoute from "./Components/ProtectedRoute";
import './Style.css';



function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Authentication/>} />
        <Route path="/login" element={<Authentication/>} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
