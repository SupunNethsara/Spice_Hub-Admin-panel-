import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigate = useNavigate();

    const logout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are not logged in.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`, 
                },
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.removeItem("token"); // Remove the token from localStorage
                alert(data.message || "Logged out successfully.");
                navigate("/login"); 
            } else {
                alert(data.message || "Logout failed.");
            }
        } catch (error) {
            console.error("Error during logout:", error);
            alert("An error occurred while logging out.");
        }
    };

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div style={{ backgroundColor: '#f5f6f7' }} className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/*  Site header */}
                <Header  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} logout={logout} />

                <main className="grow">
                    <div style={{ backgroundColor: '#f5f6f7' }} className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto ">

                    </div>
                </main>




            </div>
        </div>
    );
}

export default Dashboard;