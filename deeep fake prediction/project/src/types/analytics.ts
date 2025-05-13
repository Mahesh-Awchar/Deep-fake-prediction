export interface Customer {
  _id: string;
  name: string;
  email: string;
  address: string;
  birthdate: Date;
  tier_and_details: {
    tier: string;
    benefits: string[];
    active_since: Date;
  };
}

export interface Account {
  _id: string;
  account_id: string;
  limit: number;
  products: string[];
  customer_id: string;
}

export interface Transaction {
  _id: string;
  account_id: string;
  transaction_code: string;
  amount: number;
  date: Date;
  symbol: string;
  price: number;
  total: number;
}

export interface SearchQuery {
  text: string;
  filters?: {
    dateRange?: {
      start: Date;
      end: Date;
    };
    amount?: {
      min?: number;
      max?: number;
    };
    type?: string[];
  };
}

export interface AnalyticsInsight {
  type: 'summary' | 'anomaly' | 'trend';
  title: string;
  description: string;
  score?: number;
  metadata?: Record<string, any>;
}