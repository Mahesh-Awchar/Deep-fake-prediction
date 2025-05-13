import React, { useState } from 'react';
import { Code, Copy, Check, ChevronRight, Book, MessageCircle, Cpu, Globe } from 'lucide-react';

const DeveloperPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'webrtc' | 'rest' | 'mobile'>('webrtc');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  const handleCopyCode = (snippetId: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(snippetId);
    
    setTimeout(() => {
      setCopiedSnippet(null);
    }, 2000);
  };

  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Developer SDK</h1>
          <p className="text-xl text-secondary-300 mb-6">
            Integrate real-time deepfake detection into your applications with our easy-to-use SDK.
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#documentation" 
              className="px-5 py-2.5 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium flex items-center"
            >
              View Documentation <ChevronRight size={16} className="ml-1" />
            </a>
            <a 
              href="#examples" 
              className="px-5 py-2.5 rounded-lg bg-secondary-800 hover:bg-secondary-700 transition-colors duration-300 text-white font-medium"
            >
              See Examples
            </a>
          </div>
        </div>
        
        {/* Platform Tabs */}
        <div className="bg-secondary-800 rounded-lg overflow-hidden mb-12">
          <div className="border-b border-secondary-700">
            <div className="flex">
              <PlatformTab 
                active={activeTab === 'webrtc'} 
                onClick={() => setActiveTab('webrtc')}
                label="WebRTC SDK"
                icon={<Globe size={16} />}
              />
              <PlatformTab 
                active={activeTab === 'rest'} 
                onClick={() => setActiveTab('rest')}
                label="REST API"
                icon={<Code size={16} />}
              />
              <PlatformTab 
                active={activeTab === 'mobile'} 
                onClick={() => setActiveTab('mobile')}
                label="Mobile SDK"
                icon={<Cpu size={16} />}
              />
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'webrtc' && (
              <div>
                <p className="text-secondary-300 mb-6">
                  Integrate DeepShield directly into your WebRTC-based video calling applications with our JavaScript SDK.
                  Works with Zoom, Google Meet, Microsoft Teams, and custom WebRTC implementations.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Installation</h3>
                  <CodeSnippet
                    language="bash"
                    code="npm install @deepshield/webrtc-sdk"
                    snippetId="install"
                    onCopy={handleCopyCode}
                    isCopied={copiedSnippet === 'install'}
                  />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Quick Start</h3>
                  <CodeSnippet
                    language="javascript"
                    code={`import { DeepShield } from '@deepshield/webrtc-sdk';

// Initialize with your API key
const detector = new DeepShield({
  apiKey: 'YOUR_API_KEY',
  sensitivity: 0.8,
  onDetection: (result) => {
    console.log('Detection result:', result);
    if (result.severity > 0.7) {
      // Handle potential deepfake
      showAlert(result);
    }
  }
});

// Connect to your WebRTC stream
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
detector.attachToStream(stream);

// Start detection
detector.startAnalysis();

// Later, when the call ends
detector.stopAnalysis();`}
                    snippetId="quickstart"
                    onCopy={handleCopyCode}
                    isCopied={copiedSnippet === 'quickstart'}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'rest' && (
              <div>
                <p className="text-secondary-300 mb-6">
                  Our REST API allows you to analyze pre-recorded or streaming video for deepfake manipulation.
                  Perfect for content moderation, identity verification, and security applications.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Authentication</h3>
                  <CodeSnippet
                    language="bash"
                    code={`curl -X POST https://api.deepshield.ai/v1/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"video_url": "https://example.com/video.mp4"}'`}
                    snippetId="rest-auth"
                    onCopy={handleCopyCode}
                    isCopied={copiedSnippet === 'rest-auth'}
                  />
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">Response Format</h3>
                  <CodeSnippet
                    language="json"
                    code={`{
  "status": "complete",
  "id": "ana_12345",
  "results": {
    "is_manipulated": true,
    "confidence": 0.92,
    "manipulations": [
      {
        "type": "facial_manipulation",
        "severity": 0.87,
        "timestamp": 14.3,
        "bounding_box": {
          "x": 0.4,
          "y": 0.3,
          "width": 0.2,
          "height": 0.3
        }
      }
    ],
    "analysis_time": 2.4
  }
}`}
                    snippetId="rest-response"
                    onCopy={handleCopyCode}
                    isCopied={copiedSnippet === 'rest-response'}
                  />
                </div>
              </div>
            )}
            
            {activeTab === 'mobile' && (
              <div>
                <p className="text-secondary-300 mb-6">
                  DeepShield Mobile SDK enables deepfake detection directly on iOS and Android devices,
                  with optimized on-device machine learning for privacy and low-latency.
                </p>
                
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white mb-4">iOS Integration</h3>
                  <CodeSnippet
                    language="swift"
                    code={`import DeepShieldSDK

class VideoCallViewController: UIViewController {
    
    private var detector: DSDetector?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // Initialize the detector
        detector = DSDetector(apiKey: "YOUR_API_KEY")
        detector?.sensitivity = 0.8
        detector?.delegate = self
    }
    
    func startVideoCall() {
        // Connect to camera
        let cameraSession = DSCameraSession()
        cameraSession.startCapture()
        
        // Attach detector to camera feed
        detector?.attachToSession(cameraSession)
        
        // Start analysis
        detector?.startAnalysis()
    }
}

extension VideoCallViewController: DSDetectorDelegate {
    func detector(_ detector: DSDetector, didDetectResult result: DSDetectionResult) {
        if result.severity > 0.7 {
            showDeepfakeWarning(result)
        }
    }
}`}
                    snippetId="ios-integration"
                    onCopy={handleCopyCode}
                    isCopied={copiedSnippet === 'ios-integration'}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Key Integration Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                <Globe className="h-6 w-6" />
              </div>}
              title="Cross-Platform Support"
              description="Consistent APIs across web, mobile, and server environments with SDKs for all major platforms."
            />
            <FeatureCard
              icon={<div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                <Cpu className="h-6 w-6" />
              </div>}
              title="Edge Computing"
              description="On-device processing reduces latency and preserves privacy for sensitive video content."
            />
            <FeatureCard
              icon={<div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                <Code className="h-6 w-6" />
              </div>}
              title="Flexible API"
              description="Customize detection sensitivity, filter types of manipulations, and integrate with your existing authentication flow."
            />
          </div>
        </div>
        
        {/* Documentation */}
        <div id="documentation" className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Documentation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DocCard
              icon={<Book className="h-6 w-6" />}
              title="Getting Started"
              description="Quick setup guides for all platforms"
              link="#getting-started"
            />
            <DocCard
              icon={<Code className="h-6 w-6" />}
              title="API Reference"
              description="Complete documentation of all API endpoints and parameters"
              link="#api-reference"
            />
            <DocCard
              icon={<MessageCircle className="h-6 w-6" />}
              title="Integration Tutorials"
              description="Step-by-step guides for common use cases"
              link="#tutorials"
            />
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-gradient-to-r from-secondary-800 to-secondary-800/50 rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to integrate?</h2>
              <p className="text-secondary-300">
                Get your API key and start securing your video calls today.
              </p>
            </div>
            <a 
              href="#api-key"
              className="px-6 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium"
            >
              Get API Key
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Platform Tab Component
interface PlatformTabProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const PlatformTab: React.FC<PlatformTabProps> = ({ active, onClick, label, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors duration-300 ${
        active 
          ? 'bg-secondary-700 text-white border-b-2 border-primary-500' 
          : 'text-secondary-400 hover:text-white hover:bg-secondary-700/50'
      }`}
    >
      {icon}
      {label}
    </button>
  );
};

// Code Snippet Component
interface CodeSnippetProps {
  language: string;
  code: string;
  snippetId: string;
  onCopy: (snippetId: string, code: string) => void;
  isCopied: boolean;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ language, code, snippetId, onCopy, isCopied }) => {
  return (
    <div className="relative group">
      <div className="bg-secondary-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-secondary-800">
          <span className="text-xs font-medium text-secondary-400">{language}</span>
          <button
            onClick={() => onCopy(snippetId, code)}
            className="p-1.5 rounded hover:bg-secondary-700 transition-colors"
            aria-label="Copy code"
          >
            {isCopied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} className="text-secondary-400 group-hover:text-white" />
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-secondary-300 text-sm font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );
};

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-secondary-800/50 hover:bg-secondary-800 transition-colors duration-300 rounded-xl p-6 border border-secondary-700">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-secondary-300">{description}</p>
    </div>
  );
};

// Documentation Card Component
interface DocCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const DocCard: React.FC<DocCardProps> = ({ icon, title, description, link }) => {
  return (
    <a 
      href={link}
      className="bg-secondary-800/50 hover:bg-secondary-800 transition-colors duration-300 rounded-xl p-6 border border-secondary-700 block"
    >
      <div className="text-primary-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-secondary-300 mb-4">{description}</p>
      <div className="flex items-center text-primary-500 font-medium">
        <span>View Documentation</span>
        <ChevronRight size={16} className="ml-1" />
      </div>
    </a>
  );
};

export default DeveloperPage;