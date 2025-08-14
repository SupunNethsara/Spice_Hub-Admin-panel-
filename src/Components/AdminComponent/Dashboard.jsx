import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);



    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div style={{ backgroundColor: '#f5f6f7' }} className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div style={{ backgroundColor: '#f5f6f7' }} className="px-2 sm:px-3 lg:px-3 py-3 w-full max-w-9xl mx-auto">
                        <div className="bg-white shadow-md rounded-lg p-5">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;