import React, { useState } from 'react';
import { Search } from 'lucide-react';
import type { Customer } from '../../types/analytics';
import { getCustomers } from '../../services/mongodb';

interface CustomerSearchProps {
  onCustomerSelect: (customer: Customer) => void;
}

const CustomerSearch: React.FC<CustomerSearchProps> = ({ onCustomerSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    try {
      const results = await getCustomers(searchQuery);
      setCustomers(results);
    } catch (error) {
      console.error('Error searching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary-800/50 rounded-lg p-6 mb-6">
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search customers by name, email, or address..."
            className="w-full px-4 py-2 bg-secondary-700 rounded-lg text-white placeholder-secondary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
        </div>
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors duration-300"
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {customers.length > 0 && (
        <div className="space-y-2">
          {customers.map((customer) => (
            <div
              key={customer._id}
              onClick={() => onCustomerSelect(customer)}
              className="p-4 bg-secondary-700 rounded-lg cursor-pointer hover:bg-secondary-600 transition-colors duration-300"
            >
              <h3 className="text-white font-medium">{customer.name}</h3>
              <p className="text-secondary-400 text-sm">{customer.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-1 bg-primary-500/20 text-primary-400 text-xs rounded-full">
                  {customer.tier_and_details.tier}
                </span>
                <span className="text-secondary-400 text-xs">
                  Active since {new Date(customer.tier_and_details.active_since).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerSearch;