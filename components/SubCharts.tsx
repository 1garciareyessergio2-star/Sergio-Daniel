
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Subscription, Category } from '../types';

interface SubChartsProps {
  subscriptions: Subscription[];
}

const COLORS = ['#6366f1', '#a855f7', '#eab308', '#22c55e', '#10b981', '#64748b'];

const SubCharts: React.FC<SubChartsProps> = ({ subscriptions }) => {
  const dataMap = subscriptions.reduce((acc, sub) => {
    const monthlyPrice = sub.billingCycle === 'Monthly' ? sub.price : sub.price / 12;
    acc[sub.category] = (acc[sub.category] || 0) + monthlyPrice;
    return acc;
  }, {} as Record<Category, number>);

  // Fix: Cast value to number because Object.entries often infers the value as 'unknown' in certain TypeScript configurations
  const data = Object.entries(dataMap).map(([name, value]) => ({
    name,
    value: parseFloat((value as number).toFixed(2))
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-[400px]">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Spend by Category</h2>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubCharts;
