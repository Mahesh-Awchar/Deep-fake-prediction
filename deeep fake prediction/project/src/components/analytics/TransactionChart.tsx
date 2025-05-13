import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { Transaction } from '../../types/analytics';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TransactionChartProps {
  transactions: Transaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({ transactions }) => {
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const data = {
    labels: sortedTransactions.map(t => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: 'Transaction Amount',
        data: sortedTransactions.map(t => t.amount),
        borderColor: 'rgb(13, 148, 136)',
        backgroundColor: 'rgba(13, 148, 136, 0.5)',
        tension: 0.4,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#CBD5E1'
        }
      },
      title: {
        display: true,
        text: 'Transaction History',
        color: '#CBD5E1'
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        },
        ticks: {
          color: '#CBD5E1'
        }
      },
      x: {
        grid: {
          color: 'rgba(203, 213, 225, 0.1)'
        },
        ticks: {
          color: '#CBD5E1'
        }
      }
    }
  };

  return (
    <div className="bg-secondary-800/50 rounded-lg p-6">
      <Line data={data} options={options} />
    </div>
  );
};

export default TransactionChart;