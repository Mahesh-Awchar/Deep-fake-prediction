import React, { useRef, useEffect } from 'react';
import { useDetection } from '../../context/DetectionContext';
import { DetectionStatus, DetectionType } from '../../types/detection';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface DetectionVisualizerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
}

const DetectionVisualizer: React.FC<DetectionVisualizerProps> = ({ videoRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { 
    isAnalyzing, 
    detectionStatus, 
    detectionResults, 
    confidenceScore 
  } = useDetection();

  // Draw facial detection overlays
  useEffect(() => {
    if (!isAnalyzing || !canvasRef.current || !videoRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    // Clear canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw detector boxes for facial manipulations
    const facialDetections = detectionResults.filter(
      result => result.type === DetectionType.FACIAL_MANIPULATION && result.location
    );
    
    facialDetections.forEach(detection => {
      if (!detection.location) return;
      
      const { x, y, width, height } = detection.location;
      
      // Calculate color based on severity (green to red)
      const red = Math.min(255, Math.round(255 * detection.severity));
      const green = Math.min(255, Math.round(255 * (1 - detection.severity)));
      
      // Draw rectangle with dynamic color and opacity
      context.strokeStyle = `rgba(${red}, ${green}, 0, 0.8)`;
      context.lineWidth = 2;
      context.strokeRect(
        canvas.width * (x / 100), 
        canvas.height * (y / 100), 
        canvas.width * (width / 100), 
        canvas.height * (height / 100)
      );
      
      // Add label if severity is high enough
      if (detection.severity > 0.5) {
        context.fillStyle = `rgba(${red}, ${green}, 0, 0.9)`;
        context.font = '12px Inter';
        context.fillText(
          'Potential manipulation', 
          canvas.width * (x / 100), 
          canvas.height * (y / 100) - 5
        );
      }
    });
    
  }, [isAnalyzing, detectionResults, videoRef]);

  // Ensure canvas size matches video
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && videoRef.current) {
        canvasRef.current.width = videoRef.current.clientWidth;
        canvasRef.current.height = videoRef.current.clientHeight;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [videoRef]);

  // Status indicator color based on detection status
  const getStatusColor = () => {
    switch (detectionStatus) {
      case DetectionStatus.ALERT:
        return 'text-danger-500';
      case DetectionStatus.WARNING:
        return 'text-accent-500';
      case DetectionStatus.ANALYZING:
        return 'text-primary-500';
      default:
        return 'text-success-500';
    }
  };

  // Status indicator icon based on detection status
  const getStatusIcon = () => {
    switch (detectionStatus) {
      case DetectionStatus.ALERT:
        return <AlertCircle className="h-5 w-5" />;
      case DetectionStatus.WARNING:
        return <AlertTriangle className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="relative">
      {/* Detection overlay canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
      
      {/* Status indicator */}
      {isAnalyzing && (
        <div className="absolute top-4 right-4">
          <div 
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-900/80 backdrop-blur-sm ${getStatusColor()}`}
          >
            {getStatusIcon()}
            <span className="text-sm font-medium">
              {detectionStatus === DetectionStatus.ALERT ? 'Potential Deepfake' : 
               detectionStatus === DetectionStatus.WARNING ? 'Suspicious Activity' : 
               'Analyzing...'}
            </span>
          </div>
        </div>
      )}
      
      {/* Confidence meter */}
      {isAnalyzing && (
        <div className="absolute bottom-4 left-4 right-4 bg-secondary-900/80 backdrop-blur-sm rounded-lg p-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Authentication Confidence</span>
            <span 
              className={`text-sm font-medium ${
                confidenceScore > 80 ? 'text-success-500' : 
                confidenceScore > 50 ? 'text-accent-500' : 
                'text-danger-500'
              }`}
            >
              {confidenceScore}%
            </span>
          </div>
          <div className="h-2 w-full bg-secondary-700 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full ${
                confidenceScore > 80 ? 'bg-success-500' : 
                confidenceScore > 50 ? 'bg-accent-500' : 
                'bg-danger-500'
              }`}
              style={{ width: `${confidenceScore}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetectionVisualizer;