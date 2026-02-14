
import React, { useState, useEffect, useCallback } from 'react';
import { Subscription, Insight } from './types';
import DashboardHeader from './components/DashboardHeader';
import SummaryCards from './components/SummaryCards';
import SubCharts from './components/SubCharts';
import SubList from './components/SubList';
import InsightsPanel from './components/InsightsPanel';
import AddSubModal from './components/AddSubModal';
import { getSubscriptionHacks } from './services/geminiService';

const MOCK_DATA: Subscription[] = [
  { id: '1', name: 'Netflix', price: 19.99, category: 'Entertainment', billingCycle: 'Monthly', nextBillingDate: '2023-11-20', status: 'Active' },
  { id: '2', name: 'Slack Pro', price: 8.75, category: 'Work', billingCycle: 'Monthly', nextBillingDate: '2023-11-15', status: 'Active' },
  { id: '3', name: 'Gym Membership', price: 55.00, category: 'Lifestyle', billingCycle: 'Monthly', nextBillingDate: '2023-11-01', status: 'Active' },
  { id: '4', name: 'Amazon Prime', price: 139.00, category: 'Entertainment', billingCycle: 'Yearly', nextBillingDate: '2024-05-10', status: 'Active' },
  { id: '5', name: 'iCloud+', price: 2.99, category: 'Utility', billingCycle: 'Monthly', nextBillingDate: '2023-11-22', status: 'Active' },
];

const App: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(MOCK_DATA);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = useCallback(async () => {
    setLoadingInsights(true);
    const results = await getSubscriptionHacks(subscriptions);
    setInsights(results);
    setLoadingInsights(false);
  }, [subscriptions]);

  useEffect(() => {
    fetchInsights();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddSubscription = (newSub: Omit<Subscription, 'id'>) => {
    const subWithId: Subscription = {
      ...newSub,
      id: Math.random().toString(36).substr(2, 9),
    };
    setSubscriptions([...subscriptions, subWithId]);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
  };

  return (
    <div className="min-h-screen pb-20">
      <DashboardHeader />
      
      <main className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Subscription Hub</h2>
            <p className="text-gray-500">Track and optimize your digital portfolio.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New Sub
          </button>
        </div>

        <SummaryCards subscriptions={subscriptions} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-8">
            <SubList subscriptions={subscriptions} onDelete={handleDeleteSubscription} />
          </div>
          <div className="lg:col-span-4 space-y-8">
            <InsightsPanel 
              insights={insights} 
              loading={loadingInsights} 
              onRefresh={fetchInsights} 
            />
            <SubCharts subscriptions={subscriptions} />
          </div>
        </div>

        {/* Action Bar (Sticky Mobile) */}
        <div className="md:hidden fixed bottom-6 right-6 left-6 z-40">
           <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold shadow-2xl flex justify-center items-center"
           >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Quick Add Sub
           </button>
        </div>
      </main>

      <AddSubModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddSubscription} 
      />
    </div>
  );
};

export default App;
