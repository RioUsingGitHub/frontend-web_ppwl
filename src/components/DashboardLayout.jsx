import React, { useState } from 'react';
import { Menu, Users, Package, Settings, Grip, ChevronLeft, ChevronRight } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const menuItems = [
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Grip, label: 'Categories', path: '/categories' },
    { icon: Settings, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-white shadow-lg transition-all duration-300 fixed h-full`}>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-3 border-b">
          {isSidebarOpen ? (
            <div className="flex items-center space-x-2">
              <Menu className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-800">Dashboard</span>
            </div>
          ) : (
            <Menu className="w-8 h-8 text-blue-600 mx-auto" />
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {isSidebarOpen ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.path}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <item.icon className={`w-6 h-6 ${!isSidebarOpen && 'mx-auto'}`} />
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        <main className="p-8 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}; // yohohohohohohohoho selesai :D

export default DashboardLayout;