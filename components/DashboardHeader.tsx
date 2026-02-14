
import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200 py-4 px-6 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            SubHack
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium text-gray-500">
          <a href="#" className="text-indigo-600 border-b-2 border-indigo-600 pb-1">Dashboard</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Subscriptions</a>
          <a href="#" className="hover:text-gray-900 transition-colors">AI Insights</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Settings</a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-indigo-500 transition-colors">
            Connect Bank
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
