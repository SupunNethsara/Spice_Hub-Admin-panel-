import React, { useState } from 'react';
import Search from './Routing_Components/MainDashComponents/Search';

function Header({
  sidebarOpen,
  setSidebarOpen,
  variant = 'default',
}) {
  return (
    <header className={`sticky top-0 before:absolute before:inset-0 bg-white  before:-z-10 z-30 ${variant === 'v2' || variant === 'v3' ? ' after:absolute after:h-px after:inset-x-0 after:top-full   after:-z-10' : 'max-lg:shadow-xs  '} ${variant === 'v2' ? '' : ''} ${variant === 'v3' ? '' : ''}`}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : ' '}`}>
          <div className="flex">
            <button
              className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => { e.stopPropagation(); setSidebarOpen(!sidebarOpen); }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
            <Search />
          </div>

          <div className="flex items-center space-x-3">
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;