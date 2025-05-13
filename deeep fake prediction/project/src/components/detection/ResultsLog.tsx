import React from 'react';
import { useDetection } from '../../context/DetectionContext';
import { DetectionType } from '../../types/detection';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  VolumeX, 
  Layers, 
  Eye, 
  AlertCircle 
} from 'lucide-react';

const ResultsLog: React.FC = () => {
  const { detectionResults } = useDetection();

  // Display the latest results first
  const sortedResults = [...detectionResults].reverse();

  return (
    <div className="rounded-lg bg-secondary-800/50 p-4 h-full overflow-hidden flex flex-col">
      <h3 className="text-sm font-medium text-secondary-300 mb-3">Detection Log</h3>
      
      <div className="flex-grow overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {sortedResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary-500 text-sm">No detection results yet</p>
          </div>
        ) : (
          sortedResults.map(result => (
            <LogEntry key={result.id} 
              type={result.type} 
              description={result.description} 
              timestamp={result.timestamp} 
              severity={result.severity} 
            />
          ))
        )}
      </div>
    </div>
  );
};

interface LogEntryProps {
  type: DetectionType;
  description: string;
  timestamp: number;
  severity: number;
}

const LogEntry: React.FC<LogEntryProps> = ({ type, description, timestamp, severity }) => {
  // Get appropriate icon and color based on detection type and severity
  const getIconAndColor = () => {
    if (type === DetectionType.AUTHENTIC) {
      return {
        icon: <CheckCircle className="h-5 w-5" />,
        color: 'text-success-500',
        bgColor: 'bg-success-500/10',
      };
    }
    
    // High severity
    if (severity > 0.7) {
      return {
        icon: <XCircle className="h-5 w-5" />,
        color: 'text-danger-500',
        bgColor: 'bg-danger-500/10',
      };
    }
    
    // Medium severity
    if (severity > 0.4) {
      return {
        icon: <AlertTriangle className="h-5 w-5" />,
        color: 'text-accent-500',
        bgColor: 'bg-accent-500/10',
      };
    }
    
    // Type-specific icons for low severity
    switch (type) {
      case DetectionType.FACIAL_MANIPULATION:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: 'text-primary-400',
          bgColor: 'bg-primary-400/10',
        };
      case DetectionType.VOICE_MANIPULATION:
        return {
          icon: <VolumeX className="h-5 w-5" />,
          color: 'text-primary-400',
          bgColor: 'bg-primary-400/10',
        };
      case DetectionType.BACKGROUND_INCONSISTENCY:
        return {
          icon: <Layers className="h-5 w-5" />,
          color: 'text-primary-400',
          bgColor: 'bg-primary-400/10',
        };
      case DetectionType.EMOTION_MISMATCH:
        return {
          icon: <Eye className="h-5 w-5" />,
          color: 'text-primary-400',
          bgColor: 'bg-primary-400/10',
        };
      default:
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          color: 'text-primary-400',
          bgColor: 'bg-primary-400/10',
        };
    }
  };

  const { icon, color, bgColor } = getIconAndColor();
  const timeString = new Date(timestamp).toLocaleTimeString();

  return (
    <div className={`p-3 rounded-md ${bgColor} flex items-start gap-3`}>
      <div className={color}>
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <p className={`text-sm font-medium ${color}`}>
            {type === DetectionType.AUTHENTIC ? 'Authentic Frame' : type.split('_').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            ).join(' ')}
          </p>
          <span className="text-xs text-secondary-500">{timeString}</span>
        </div>
        <p className="text-xs text-secondary-300 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default ResultsLog;