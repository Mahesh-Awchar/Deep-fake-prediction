import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { DetectionResult, DetectionStatus, DetectionType } from '../types/detection';
import { simulateDetection } from '../utils/simulateDetection';

interface DetectionContextProps {
  isAnalyzing: boolean;
  detectionStatus: DetectionStatus;
  detectionResults: DetectionResult[];
  confidenceScore: number;
  startAnalysis: () => void;
  stopAnalysis: () => void;
  resetDetection: () => void;
}

const DetectionContext = createContext<DetectionContextProps | undefined>(undefined);

export const DetectionProvider = ({ children }: { children: ReactNode }) => {
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [detectionStatus, setDetectionStatus] = useState<DetectionStatus>(DetectionStatus.IDLE);
  const [detectionResults, setDetectionResults] = useState<DetectionResult[]>([]);
  const [confidenceScore, setConfidenceScore] = useState<number>(100);
  const [analysisInterval, setAnalysisInterval] = useState<number | null>(null);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setDetectionStatus(DetectionStatus.ANALYZING);
    
    // Clear any existing interval
    if (analysisInterval) {
      window.clearInterval(analysisInterval);
    }
    
    // Set up interval for simulated detection events
    const interval = window.setInterval(() => {
      const result = simulateDetection();
      
      setDetectionResults(prev => {
        // Keep only the last 10 results for performance
        const newResults = [...prev, result];
        if (newResults.length > 10) {
          return newResults.slice(newResults.length - 10);
        }
        return newResults;
      });
      
      // Update confidence score based on detection results
      if (result.type !== DetectionType.AUTHENTIC) {
        setConfidenceScore(prev => {
          const newScore = prev - (result.severity * 5);
          return Math.max(newScore, 0);
        });
        
        // Update status if we've found a potential deepfake
        if (result.severity > 0.7) {
          setDetectionStatus(DetectionStatus.ALERT);
        } else if (result.severity > 0.4) {
          setDetectionStatus(DetectionStatus.WARNING);
        }
      }
    }, 2000);
    
    setAnalysisInterval(interval);
  };

  const stopAnalysis = () => {
    setIsAnalyzing(false);
    
    if (analysisInterval) {
      window.clearInterval(analysisInterval);
      setAnalysisInterval(null);
    }
  };

  const resetDetection = () => {
    stopAnalysis();
    setDetectionStatus(DetectionStatus.IDLE);
    setDetectionResults([]);
    setConfidenceScore(100);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (analysisInterval) {
        window.clearInterval(analysisInterval);
      }
    };
  }, [analysisInterval]);

  return (
    <DetectionContext.Provider
      value={{
        isAnalyzing,
        detectionStatus,
        detectionResults,
        confidenceScore,
        startAnalysis,
        stopAnalysis,
        resetDetection,
      }}
    >
      {children}
    </DetectionContext.Provider>
  );
};

export const useDetection = (): DetectionContextProps => {
  const context = useContext(DetectionContext);
  if (context === undefined) {
    throw new Error('useDetection must be used within a DetectionProvider');
  }
  return context;
};