import React from 'react';
import { TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import type { AnalyticsInsight } from '../../types/analytics';

interface InsightCardProps {
  insight: AnalyticsInsight;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight }) => {
  const getIcon = () => {
    switch (insight.type) {
      case 'trend':
        return <TrendingUp className="h-6 w-6 text-primary-500" />;
      case 'anomaly':
        return <AlertTriangle className="h-6 w-6 text-accent-500" />;
      default:
        return <FileText className="h-6 w-6 text-secondary-400" />;
    }
  };

  const getCardStyle = () => {
    switch (insight.type) {
      case 'trend':
        return 'border-primary-500/20 bg-primary-500/10';
      case 'anomaly':
        return 'border-accent-500/20 bg-accent-500/10';
      default:
        return 'border-secondary-700 bg-secondary-800/50';
    }
  };

  return (
    <div className={`rounded-lg p-6 border ${getCardStyle()}`}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-secondary-800">
          {getIcon()}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white mb-2">{insight.title}</h3>
          <p className="text-secondary-300">{insight.description}</p>
          {insight.score !== undefined && (
            <div className="mt-4 flex items-center gap-2">
              <div className="text-sm font-medium text-secondary-400">Confidence Score:</div>
              <div className="px-2 py-1 rounded-full bg-secondary-700 text-white text-sm">
                {Math.round(insight.score * 100)}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;