
export type Category = 'Entertainment' | 'Work' | 'Utility' | 'Lifestyle' | 'Finance' | 'Other';

export interface Subscription {
  id: string;
  name: string;
  price: number;
  category: Category;
  billingCycle: 'Monthly' | 'Yearly';
  nextBillingDate: string;
  status: 'Active' | 'Paused' | 'Cancelled';
}

export interface Insight {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}
