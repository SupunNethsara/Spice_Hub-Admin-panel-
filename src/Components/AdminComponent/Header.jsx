import React, { useState } from 'react';
import Search from './Routing_Components/MainDashComponents/Search';

function Header({ sidebarOpen, setSidebarOpen }) {
    return (
        <header className="bg-white border-b border-gray-100 shadow-sm z-10">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center">
                    <button
                        className="text-gray-500 hover:text-gray-600 lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    
                    <div className="relative ml-4 lg:ml-6">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="block w-64 pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#c41d00] focus:border-transparent"
                        />
                    </div>
                </div>
                
                <div className="flex items-center space-x-4">
                    <button className="relative p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-50">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="absolute top-0 right-0 w-3 h-3 bg-[#4f39f6] rounded-full"></span>
                    </button>
                    
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#4f39f6] to-[#4f39f6] flex items-center justify-center text-white font-semibold">
                        JD
                    </div>
                </div>
            </div>
        </header>
    );
}


export default Header;