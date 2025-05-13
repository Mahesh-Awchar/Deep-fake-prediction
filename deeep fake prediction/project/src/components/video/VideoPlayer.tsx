import React, { useRef, useState, useEffect } from 'react';
import { useDetection } from '../../context/DetectionContext';
import DetectionVisualizer from '../detection/DetectionVisualizer';
import { Play, Pause, Video, MicOff, PhoneOff } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const { isAnalyzing, startAnalysis, stopAnalysis } = useDetection();

  // Simulated video sources - in a real app these would be WebRTC streams
  const videoSources = [
    'https://assets.mixkit.co/videos/preview/mixkit-woman-running-her-hands-through-her-hair-1169-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-young-mother-with-her-little-daughter-decorating-a-christmas-tree-39745-large.mp4',
    'https://assets.mixkit.co/videos/preview/mixkit-portrait-of-a-woman-in-a-pool-1259-large.mp4'
  ];

  // Select a random video on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    if (videoRef.current) {
      videoRef.current.src = videoSources[randomIndex];
    }
  }, []);

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        stopAnalysis();
      } else {
        videoRef.current.play();
        startAnalysis();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleEndCall = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    stopAnalysis();
  };

  return (
    <div className="rounded-xl overflow-hidden bg-secondary-950 shadow-xl relative">
      {/* Video element */}
      <div className="aspect-video relative">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          loop
          muted={isMuted}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* Detection visualizer overlay */}
        <DetectionVisualizer videoRef={videoRef} />
        
        {/* Play/pause overlay when not playing */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-secondary-950/70 flex items-center justify-center" onClick={togglePlayback}>
            <div className="rounded-full bg-primary-500 p-4 cursor-pointer hover:bg-primary-600 transition-colors duration-300">
              <Play size={24} className="text-white" />
            </div>
          </div>
        )}
      </div>
      
      {/* Video controls */}
      <div className="bg-secondary-900 p-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-3">
            <button
              onClick={togglePlayback}
              className="rounded-full bg-secondary-800 p-2 hover:bg-secondary-700 transition-colors duration-300"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </button>
            <button
              onClick={toggleMute}
              className={`rounded-full p-2 transition-colors duration-300 ${
                isMuted 
                  ? 'bg-secondary-800 hover:bg-secondary-700' 
                  : 'bg-primary-600 hover:bg-primary-700'
              }`}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <MicOff size={18} />
            </button>
            <button
              className="rounded-full bg-secondary-800 p-2 hover:bg-secondary-700 transition-colors duration-300"
              aria-label="Toggle camera"
            >
              <Video size={18} />
            </button>
          </div>
          
          <button
            onClick={handleEndCall}
            className="rounded-full bg-danger-500 p-2 hover:bg-danger-600 transition-colors duration-300"
            aria-label="End call"
          >
            <PhoneOff size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;