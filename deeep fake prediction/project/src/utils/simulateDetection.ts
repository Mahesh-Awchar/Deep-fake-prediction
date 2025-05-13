import { v4 as uuidv4 } from 'uuid';
import { DetectionResult, DetectionType } from '../types/detection';

// This simulates detection results for demo purposes
export const simulateDetection = (): DetectionResult => {
  // Random number to determine if this will be an "authentic" result or a "deepfake" detection
  const random = Math.random();
  
  // 70% chance of authentic result, 30% chance of some kind of manipulation detected
  if (random < 0.7) {
    return {
      id: uuidv4(),
      timestamp: Date.now(),
      type: DetectionType.AUTHENTIC,
      severity: 0,
      confidence: 0.95 + (Math.random() * 0.05), // High confidence in authentic result
      description: 'No manipulation detected.',
    };
  }
  
  // Determine what type of manipulation to simulate
  const manipulationTypes = [
    DetectionType.FACIAL_MANIPULATION,
    DetectionType.VOICE_MANIPULATION,
    DetectionType.BACKGROUND_INCONSISTENCY,
    DetectionType.EMOTION_MISMATCH,
    DetectionType.LIVENESS_FAILURE,
  ];
  
  const selectedType = manipulationTypes[Math.floor(Math.random() * manipulationTypes.length)];
  
  // Generate a severity level (higher is more severe)
  const severity = 0.3 + (Math.random() * 0.7);
  
  // Generate a confidence level (how sure the system is of the detection)
  const confidence = 0.6 + (Math.random() * 0.4);
  
  // Create descriptions based on the type of manipulation
  const descriptions = {
    [DetectionType.FACIAL_MANIPULATION]: 'Unusual facial movements detected.',
    [DetectionType.VOICE_MANIPULATION]: 'Voice patterns show artificial modulation.',
    [DetectionType.BACKGROUND_INCONSISTENCY]: 'Background elements show inconsistencies.',
    [DetectionType.EMOTION_MISMATCH]: 'Facial expression doesn\'t match emotional context.',
    [DetectionType.LIVENESS_FAILURE]: 'Failed liveness check - possible pre-recorded media.',
  };
  
  // For facial manipulations, include a location
  const location = selectedType === DetectionType.FACIAL_MANIPULATION ? {
    x: 40 + (Math.random() * 20),
    y: 30 + (Math.random() * 20),
    width: 20 + (Math.random() * 10),
    height: 30 + (Math.random() * 10),
  } : undefined;
  
  return {
    id: uuidv4(),
    timestamp: Date.now(),
    type: selectedType,
    severity,
    confidence,
    location,
    description: descriptions[selectedType],
  };
};

// Generate mock historical detection data
export const generateMockHistoricalData = (count: number) => {
  const mockData = [];
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - (i * 86400000 * (1 + Math.random()))); // Random days in the past
    const manipulationTypes = [
      DetectionType.FACIAL_MANIPULATION,
      DetectionType.VOICE_MANIPULATION,
      DetectionType.BACKGROUND_INCONSISTENCY,
      DetectionType.EMOTION_MISMATCH,
      DetectionType.LIVENESS_FAILURE,
    ];
    
    mockData.push({
      id: uuidv4(),
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      duration: `${Math.floor(5 + Math.random() * 20)}m ${Math.floor(Math.random() * 60)}s`,
      detectionType: Math.random() > 0.3 
        ? manipulationTypes[Math.floor(Math.random() * manipulationTypes.length)]
        : DetectionType.AUTHENTIC,
      maxSeverity: Math.random(),
      screenshot: i % 3 === 0 ? `https://images.pexels.com/photos/5702281/pexels-photo-5702281.jpeg?auto=compress&cs=tinysrgb&w=300` : undefined,
    });
  }
  
  return mockData;
};