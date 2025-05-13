export enum DetectionStatus {
  IDLE = 'idle',
  ANALYZING = 'analyzing',
  WARNING = 'warning',
  ALERT = 'alert',
}

export enum DetectionType {
  AUTHENTIC = 'authentic',
  FACIAL_MANIPULATION = 'facial_manipulation',
  VOICE_MANIPULATION = 'voice_manipulation',
  BACKGROUND_INCONSISTENCY = 'background_inconsistency',
  EMOTION_MISMATCH = 'emotion_mismatch',
  LIVENESS_FAILURE = 'liveness_failure',
}

export interface DetectionResult {
  id: string;
  timestamp: number;
  type: DetectionType;
  severity: number; // 0-1 scale
  confidence: number; // 0-1 scale
  location?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  description: string;
}

export interface HistoricalDetection {
  id: string;
  date: string;
  time: string;
  duration: string;
  detectionType: DetectionType;
  maxSeverity: number;
  screenshot?: string;
}