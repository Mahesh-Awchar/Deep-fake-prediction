import React from 'react';
import VideoPlayer from '../components/video/VideoPlayer';
import DetectionMetrics from '../components/detection/DetectionMetrics';
import ResultsLog from '../components/detection/ResultsLog';
import { useDetection } from '../context/DetectionContext';
import { Play, Shield, AlertTriangle, Info } from 'lucide-react';

const DemoPage: React.FC = () => {
  const { isAnalyzing, startAnalysis, stopAnalysis, resetDetection } = useDetection();

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Deepfake Detection Demo</h1>
          <p className="text-secondary-300">
            Experience real-time deepfake detection in a simulated video call environment.
          </p>
        </div>
        
        {/* Info Alert */}
        <div className="mb-8 p-4 rounded-lg bg-secondary-800/80 border border-secondary-700 flex items-start gap-3">
          <Info className="text-primary-400 h-5 w-5 mt-0.5" />
          <div>
            <h3 className="font-medium text-white mb-1">How to use this demo</h3>
            <p className="text-secondary-300 text-sm">
              Press play on the video to start the simulated call. The system will begin analyzing the video for potential 
              manipulations. This demo shows how our technology would detect deepfakes in a real video call, with 
              visual indicators and detailed logs. For this demo, we're simulating both authentic and manipulated content.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player Column */}
          <div className="lg:col-span-2">
            <VideoPlayer />
            
            {/* Controls */}
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={isAnalyzing ? stopAnalysis : startAnalysis}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  isAnalyzing 
                    ? 'bg-secondary-700 hover:bg-secondary-600 text-white' 
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                } transition-colors duration-300`}
              >
                {isAnalyzing ? (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Stop Analysis
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    Start Analysis
                  </>
                )}
              </button>
              <button
                onClick={resetDetection}
                className="px-4 py-2 rounded-lg bg-secondary-800 hover:bg-secondary-700 text-white font-medium transition-colors duration-300"
              >
                Reset
              </button>
            </div>
            
            {/* Results Log */}
            <div className="mt-8">
              <ResultsLog />
            </div>
          </div>
          
          {/* Metrics Column */}
          <div className="flex flex-col gap-8">
            <div className="bg-secondary-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Detection Metrics</h2>
              <DetectionMetrics />
            </div>
            
            {/* Information Panel */}
            <div className="bg-secondary-800/50 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">What We Detect</h2>
              <div className="space-y-4">
                <FeatureItem 
                  icon={<div className="h-8 w-8 rounded-md bg-primary-500/20 flex items-center justify-center text-primary-500">
                    <AlertTriangle size={16} />
                  </div>}
                  title="Facial Manipulations"
                  description="Inconsistent facial movements, unnatural expressions, and digital artifacts around eyes and mouth."
                />
                <FeatureItem 
                  icon={<div className="h-8 w-8 rounded-md bg-primary-500/20 flex items-center justify-center text-primary-500">
                    <AlertTriangle size={16} />
                  </div>}
                  title="Voice Analysis"
                  description="Voice pattern inconsistencies, synthetic tones, and mismatched lip movements."
                />
                <FeatureItem 
                  icon={<div className="h-8 w-8 rounded-md bg-primary-500/20 flex items-center justify-center text-primary-500">
                    <AlertTriangle size={16} />
                  </div>}
                  title="Background Anomalies"
                  description="Lighting inconsistencies, unusual reflections, and digital artifacts between subject and background."
                />
                <FeatureItem 
                  icon={<div className="h-8 w-8 rounded-md bg-primary-500/20 flex items-center justify-center text-primary-500">
                    <AlertTriangle size={16} />
                  </div>}
                  title="Liveness Detection"
                  description="Differentiates between real people and pre-recorded or synthetic footage by analyzing micro-movements."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="flex gap-3">
      {icon}
      <div>
        <h3 className="font-medium text-white">{title}</h3>
        <p className="text-sm text-secondary-300">{description}</p>
      </div>
    </div>
  );
};

export default DemoPage;