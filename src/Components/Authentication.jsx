import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../index.css';

export default function Authentication() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      localStorage.setItem("token", data.token);
  alert('logging succesfull')
      
      navigate("/admin");
    } else {
      alert(data.message || "Login Failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/3 p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center">Sign in to your account</h2>
          <form onSubmit={login} className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-gray-200 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100  border-gray-200 focus:outline-none focus:border-gray-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-700 transition-all"
            >
              Sign In
            </button>
          </form>
          <p className="mt-6 text-xs text-gray-600 text-center">
            I agree to abide by
            <a href="#" className="text-blue-600 underline mx-1">Terms of Service</a>
            and
            <a href="#" className="text-blue-600 underline mx-1">Privacy Policy</a>
          </p>
         
        </div>
        {/* Right Side - Full Screen Image */}
        <div className="hidden md:flex w-2/3 bg-cover bg-center relative">
          <div className="image-sec absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      
          </div>
        </div>
      </div>
    </div>
  );
}
