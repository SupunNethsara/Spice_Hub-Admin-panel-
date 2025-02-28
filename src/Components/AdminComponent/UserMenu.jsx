import { useState } from "react";

export default function UserMenu({ logout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-3">
      {/* Profile Button */}
      <button
        type="button"
        className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        id="user-menu-button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        <img
          className="size-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
        />
      </button>

      {/* User Menu */}
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5"
          role="menu"
          aria-orientation="vertical"
        >
          <a href="#" className="block px-4 py-2 text-sm text-gray-700">
            Your Profile
          </a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700">
            Settings
          </a>
          <a onClick={logout} href="#" className="block px-4 py-2 text-sm text-gray-700">
            Sign out
          </a>
        </div>
      )}
    </div>
  );
}
