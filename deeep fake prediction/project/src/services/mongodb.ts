import { MongoClient, ServerApiVersion } from 'mongodb';
import type { Customer, Account, Transaction } from '../types/analytics';

const uri = import.meta.env.VITE_MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

export async function getCustomers(query: string = '', limit: number = 10): Promise<Customer[]> {
  try {
    const database = client.db("sample_analytics");
    const customers = database.collection<Customer>("customers");
    
    const pipeline = [
      {
        $search: {
          index: "default",
          text: {
            query: query,
            path: ["name", "email", "address"],
            fuzzy: {}
          }
        }
      },
      { $limit: limit }
    ];

    const result = await customers.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
}

export async function getCustomerAccounts(customerId: string): Promise<Account[]> {
  try {
    const database = client.db("sample_analytics");
    const accounts = database.collection<Account>("accounts");
    
    return await accounts.find({ customer_id: customerId }).toArray();
  } catch (error) {
    console.error("Error fetching customer accounts:", error);
    throw error;
  }
}

export async function getAccountTransactions(
  accountId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Transaction[]> {
  try {
    const database = client.db("sample_analytics");
    const transactions = database.collection<Transaction>("transactions");
    
    const query: any = { account_id: accountId };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = startDate;
      if (endDate) query.date.$lte = endDate;
    }
    
    return await transactions
      .find(query)
      .sort({ date: -1 })
      .toArray();
  } catch (error) {
    console.error("Error fetching account transactions:", error);
    throw error;
  }
}

export async function getTransactionInsights(accountId: string): Promise<any> {
  try {
    const database = client.db("sample_analytics");
    const transactions = database.collection("transactions");
    
    const pipeline = [
      { $match: { account_id: accountId } },
      {
        $group: {
          _id: null,
          totalTransactions: { $sum: 1 },
          totalAmount: { $sum: "$amount" },
          avgAmount: { $avg: "$amount" },
          maxAmount: { $max: "$amount" },
          minAmount: { $min: "$amount" }
        }
      }
    ];
    
    const results = await transactions.aggregate(pipeline).toArray();
    return results[0] || null;
  } catch (error) {
    console.error("Error getting transaction insights:", error);
    throw error;
  }
}