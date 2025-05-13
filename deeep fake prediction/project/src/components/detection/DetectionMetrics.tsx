import React from 'react';
import { useDetection } from '../../context/DetectionContext';
import { DetectionType } from '../../types/detection';
import { 
  AlertTriangle, 
  Activity, 
  VolumeX, 
  Eye, 
  Aperture, 
  Layers 
} from 'lucide-react';

const DetectionMetrics: React.FC = () => {
  const { 
    isAnalyzing, 
    detectionResults, 
    confidenceScore 
  } = useDetection();

  // Count detections by type
  const countByType = {
    [DetectionType.FACIAL_MANIPULATION]: 0,
    [DetectionType.VOICE_MANIPULATION]: 0,
    [DetectionType.BACKGROUND_INCONSISTENCY]: 0,
    [DetectionType.EMOTION_MISMATCH]: 0,
    [DetectionType.LIVENESS_FAILURE]: 0,
  };

  detectionResults.forEach(result => {
    if (result.type in countByType) {
      countByType[result.type as keyof typeof countByType]++;
    }
  });

  // Get the highest severity detection in recent results
  const getHighestSeverity = () => {
    if (detectionResults.length === 0) return 0;
    
    return Math.max(...detectionResults.map(result => result.severity));
  };

  // Icons for each detection type
  const typeIcons = {
    [DetectionType.FACIAL_MANIPULATION]: <Aperture className="h-5 w-5" />,
    [DetectionType.VOICE_MANIPULATION]: <VolumeX className="h-5 w-5" />,
    [DetectionType.BACKGROUND_INCONSISTENCY]: <Layers className="h-5 w-5" />,
    [DetectionType.EMOTION_MISMATCH]: <Eye className="h-5 w-5" />,
    [DetectionType.LIVENESS_FAILURE]: <AlertTriangle className="h-5 w-5" />,
  };

  if (!isAnalyzing) {
    return (
      <div className="rounded-lg bg-secondary-800/50 p-6 text-center">
        <p className="text-secondary-400">Start analysis to view detection metrics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <MetricCard 
          title="Authentication Score" 
          value={`${confidenceScore}%`} 
          icon={<Activity className="h-5 w-5" />}
          status={
            confidenceScore > 80 ? 'success' : 
            confidenceScore > 50 ? 'warning' : 
            'danger'
          }
        />
        <MetricCard 
          title="Risk Level" 
          value={
            getHighestSeverity() < 0.3 ? 'Low' : 
            getHighestSeverity() < 0.7 ? 'Medium' : 
            'High'
          } 
          icon={<AlertTriangle className="h-5 w-5" />}
          status={
            getHighestSeverity() < 0.3 ? 'success' : 
            getHighestSeverity() < 0.7 ? 'warning' : 
            'danger'
          }
        />
      </div>

      {/* Detection types */}
      <div>
        <h3 className="text-sm font-medium text-secondary-300 mb-3">Detection Types</h3>
        <div className="space-y-2">
          {Object.entries(countByType).map(([type, count]) => (
            <TypeMetricRow 
              key={type} 
              type={type as DetectionType} 
              count={count} 
              icon={typeIcons[type as DetectionType]} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  status: 'success' | 'warning' | 'danger';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, status }) => {
  const statusClasses = {
    success: 'text-success-500',
    warning: 'text-accent-500',
    danger: 'text-danger-500',
  };

  return (
    <div className="bg-secondary-800/50 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <span className={statusClasses[status]}>{icon}</span>
        <span className="text-sm font-medium text-secondary-300 ml-2">{title}</span>
      </div>
      <p className={`text-xl font-bold ${statusClasses[status]}`}>{value}</p>
    </div>
  );
};

interface TypeMetricRowProps {
  type: DetectionType;
  count: number;
  icon: React.ReactNode;
}

const TypeMetricRow: React.FC<TypeMetricRowProps> = ({ type, count, icon }) => {
  // Convert enum to display text
  const typeDisplay = {
    [DetectionType.FACIAL_MANIPULATION]: 'Facial Manipulation',
    [DetectionType.VOICE_MANIPULATION]: 'Voice Manipulation',
    [DetectionType.BACKGROUND_INCONSISTENCY]: 'Background Inconsistency',
    [DetectionType.EMOTION_MISMATCH]: 'Emotion Mismatch',
    [DetectionType.LIVENESS_FAILURE]: 'Liveness Failure',
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-md ${count > 0 ? 'bg-secondary-800' : 'bg-secondary-900'}`}>
      <div className="flex items-center">
        <span className={count > 0 ? 'text-accent-500' : 'text-secondary-600'}>
          {icon}
        </span>
        <span className="ml-3 text-sm font-medium">
          {typeDisplay[type]}
        </span>
      </div>
      <div className={`text-sm font-medium px-2 py-0.5 rounded-full ${
        count > 0 ? 'bg-accent-500/20 text-accent-400' : 'bg-secondary-800 text-secondary-500'
      }`}>
        {count}
      </div>
    </div>
  );
};

export default DetectionMetrics;