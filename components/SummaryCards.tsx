
import React from 'react';
import { Subscription } from '../types';

interface SummaryCardsProps {
  subscriptions: Subscription[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ subscriptions }) => {
  const monthlyTotal = subscriptions.reduce((acc, s) => {
    return acc + (s.billingCycle === 'Monthly' ? s.price : s.price / 12);
  }, 0);

  const activeCount = subscriptions.filter(s => s.status === 'Active').length;
  const potentialSavings = monthlyTotal * 0.15; // Estimated 15% optimization potential

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-1">Total Monthly Burn</span>
        <span className="text-3xl font-bold text-gray-900">${monthlyTotal.toFixed(2)}</span>
        <div className="mt-4 flex items-center text-xs font-semibold text-red-600 bg-red-50 w-max px-2 py-1 rounded">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          4.2% vs last month
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
        <span className="text-sm font-medium text-gray-500 mb-1">Active Subscriptions</span>
        <span className="text-3xl font-bold text-gray-900">{activeCount}</span>
        <div className="mt-4 flex items-center text-xs font-semibold text-indigo-600 bg-indigo-50 w-max px-2 py-1 rounded">
          Managing effectively
        </div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col bg-gradient-to-br from-indigo-50 to-white">
        <span className="text-sm font-medium text-indigo-600 mb-1">AI Savings Hack Potential</span>
        <span className="text-3xl font-bold text-gray-900">${potentialSavings.toFixed(2)}</span>
        <div className="mt-4 flex items-center text-xs font-semibold text-green-600 bg-green-50 w-max px-2 py-1 rounded">
          Ready to optimize
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
