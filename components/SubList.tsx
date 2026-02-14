
import React from 'react';
import { Subscription, Category } from '../types';

interface SubListProps {
  subscriptions: Subscription[];
  onDelete: (id: string) => void;
}

const categoryColors: Record<Category, string> = {
  Entertainment: 'bg-purple-100 text-purple-700',
  Work: 'bg-blue-100 text-blue-700',
  Utility: 'bg-yellow-100 text-yellow-700',
  Lifestyle: 'bg-green-100 text-green-700',
  Finance: 'bg-emerald-100 text-emerald-700',
  Other: 'bg-gray-100 text-gray-700',
};

const SubList: React.FC<SubListProps> = ({ subscriptions, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Active Subscriptions</h2>
        <button className="text-indigo-600 text-sm font-semibold hover:underline">View All</button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Frequency</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscriptions.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-lg bg-gray-200 mr-3 flex items-center justify-center font-bold text-gray-500 text-xs uppercase">
                      {sub.name.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{sub.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${categoryColors[sub.category]}`}>
                    {sub.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                  ${sub.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {sub.billingCycle}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full mr-2 ${sub.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    <span className="text-sm text-gray-700">{sub.status}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => onDelete(sub.id)}
                    className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubList;
