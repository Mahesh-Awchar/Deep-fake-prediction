import React, { useState } from 'react';
import CustomerSearch from '../components/analytics/CustomerSearch';
import TransactionChart from '../components/analytics/TransactionChart';
import InsightCard from '../components/analytics/InsightCard';
import type { Customer, Account, Transaction, AnalyticsInsight } from '../types/analytics';
import { getCustomerAccounts, getAccountTransactions, getTransactionInsights } from '../services/mongodb';

const DashboardPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [insights, setInsights] = useState<AnalyticsInsight[]>([]);

  const handleCustomerSelect = async (customer: Customer) => {
    setSelectedCustomer(customer);
    try {
      const customerAccounts = await getCustomerAccounts(customer._id);
      setAccounts(customerAccounts);
      
      if (customerAccounts.length > 0) {
        const accountTransactions = await getAccountTransactions(customerAccounts[0].account_id);
        setTransactions(accountTransactions);
        
        const transactionInsights = await getTransactionInsights(customerAccounts[0].account_id);
        
        // Generate insights based on transaction data
        const newInsights: AnalyticsInsight[] = [
          {
            type: 'summary',
            title: 'Account Overview',
            description: `Total of ${transactionInsights.totalTransactions} transactions with an average amount of $${Math.round(transactionInsights.avgAmount)}.`
          },
          {
            type: 'trend',
            title: 'Transaction Pattern',
            description: 'Consistent spending pattern with regular monthly deposits.',
            score: 0.85
          },
          {
            type: 'anomaly',
            title: 'Unusual Activity Detected',
            description: `Transaction amount of $${transactionInsights.maxAmount} is significantly higher than average.`,
            score: 0.92
          }
        ];
        
        setInsights(newInsights);
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Financial Insights Dashboard</h1>
      
      <CustomerSearch onCustomerSelect={handleCustomerSelect} />
      
      {selectedCustomer && (
        <div className="space-y-8">
          <div className="bg-secondary-800/50 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Customer Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-secondary-400 mb-2">Personal Information</h3>
                <p className="text-white">{selectedCustomer.name}</p>
                <p className="text-secondary-300">{selectedCustomer.email}</p>
                <p className="text-secondary-300">{selectedCustomer.address}</p>
              </div>
              <div>
                <h3 className="text-secondary-400 mb-2">Account Status</h3>
                <p className="text-white">{selectedCustomer.tier_and_details.tier} Tier</p>
                <p className="text-secondary-300">
                  Active since {new Date(selectedCustomer.tier_and_details.active_since).toLocaleDateString()}
                </p>
              </div>
              <div>
                <h3 className="text-secondary-400 mb-2">Benefits</h3>
                <div className="space-y-1">
                  {selectedCustomer.tier_and_details.benefits.map((benefit, index) => (
                    <p key={index} className="text-secondary-300">{benefit}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {transactions.length > 0 && (
            <>
              <TransactionChart transactions={transactions} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights.map((insight, index) => (
                  <InsightCard key={index} insight={insight} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;