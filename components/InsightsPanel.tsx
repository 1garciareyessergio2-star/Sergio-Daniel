
import React from 'react';
import { Insight } from '../types';

interface InsightsPanelProps {
  insights: Insight[];
  loading: boolean;
  onRefresh: () => void;
}

const InsightsPanel: React.FC<InsightsPanelProps> = ({ insights, loading, onRefresh }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900 flex items-center">
          <svg className="w-5 h-5 text-indigo-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Optimization Hacks
        </h2>
        <button 
          onClick={onRefresh}
          disabled={loading}
          className="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors disabled:opacity-50"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <p className="text-gray-500 text-sm">Hacking your budget for savings...</p>
          </div>
        ) : insights.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No insights available. Add subscriptions to start hacking!</p>
          </div>
        ) : (
          insights.map((insight, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-indigo-50 bg-indigo-50/30 flex items-start space-x-3">
              <div className={`mt-1 flex-shrink-0 w-2 h-2 rounded-full ${insight.severity === 'high' ? 'bg-red-500' : insight.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'}`}></div>
              <div>
                <h4 className="font-bold text-indigo-900 text-sm mb-1">{insight.title}</h4>
                <p className="text-gray-600 text-xs leading-relaxed">{insight.description}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <button 
          className="w-full bg-gray-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-800 transition-colors flex justify-center items-center shadow-lg"
          onClick={onRefresh}
        >
          Generate New Hacks
        </button>
      </div>
    </div>
  );
};

export default InsightsPanel;
