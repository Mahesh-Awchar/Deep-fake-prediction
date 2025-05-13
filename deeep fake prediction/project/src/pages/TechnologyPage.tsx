import React from 'react';
import { Shield, Cpu, Brain, MoveHorizontal, BadgeCheck, Clock, BarChart2 } from 'lucide-react';

const TechnologyPage: React.FC = () => {
  return (
    <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Hero Section */}
        <section className="py-12 mb-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Technology</h1>
            <p className="text-xl text-secondary-300 mb-8">
              DeepShield combines advanced machine learning, computer vision, and audio analysis 
              to detect deepfakes in real-time with unprecedented accuracy.
            </p>
          </div>
          
          <div className="mt-12 relative">
            <div className="bg-secondary-800/70 rounded-2xl p-8 border border-secondary-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <img 
                    src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="AI Detection Technology" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-white mb-4">How We Detect Deepfakes</h2>
                  <p className="text-secondary-300 mb-6">
                    Our multi-modal approach analyzes both video and audio streams simultaneously, 
                    looking for inconsistencies that are invisible to the human eye but detectable 
                    by our proprietary algorithms.
                  </p>
                  <ul className="space-y-3">
                    <TechListItem>
                      Facial micro-expression analysis
                    </TechListItem>
                    <TechListItem>
                      Voice pattern authentication
                    </TechListItem>
                    <TechListItem>
                      3D mesh reconstruction validation
                    </TechListItem>
                    <TechListItem>
                      Temporal consistency tracking
                    </TechListItem>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 h-32 w-32 bg-primary-500/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -left-6 h-24 w-24 bg-primary-600/10 rounded-full blur-xl"></div>
          </div>
        </section>
        
        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Our Technology Stack</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TechStackCard
              icon={<Brain className="h-7 w-7" />}
              title="Deep Neural Networks"
              description="Convolutional Neural Networks (CNNs) and Recurrent Neural Networks (RNNs) trained on millions of real and synthetic videos."
            />
            <TechStackCard
              icon={<Cpu className="h-7 w-7" />}
              title="Edge Computing"
              description="Optimized TensorFlow Lite and ONNX models that run directly on user devices for privacy and reduced latency."
            />
            <TechStackCard
              icon={<MoveHorizontal className="h-7 w-7" />}
              title="Real-Time Streaming"
              description="WebRTC integration with custom processing nodes for frame-by-frame analysis with minimal latency impact."
            />
          </div>
        </section>
        
        {/* Technical Approach */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Our Technical Approach</h2>
          
          <div className="bg-secondary-800/50 rounded-xl p-8 border border-secondary-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Face and Voice Verification</h3>
                <p className="text-secondary-300 mb-4">
                  Our system creates a biometric signature of the authenticated user and continuously
                  compares incoming video frames against this signature. We analyze:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Facial landmark movements and their natural correlation patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Skin texture and reflectance properties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Voiceprint frequency distribution and speech patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Audio-visual synchronization verification</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Latency-Optimized Architecture</h3>
                <p className="text-secondary-300 mb-4">
                  DeepShield's architecture is designed to process video with minimal latency, critical for
                  maintaining the quality of video calls while providing security.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <Clock className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Average additional latency: <strong>15-30ms</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <BarChart2 className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">Processing rate: <strong>30 frames per second</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 text-primary-500 mt-0.5" />
                    <span className="text-secondary-200">GPU acceleration via WebGL and Metal</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Research and Updates */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Research and Ongoing Improvements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary-800/50 rounded-xl p-6 border border-secondary-700">
              <h3 className="text-xl font-bold text-white mb-4">Adversarial Training</h3>
              <p className="text-secondary-300">
                Our models are continuously trained against the latest deepfake generation techniques in an 
                adversarial setting. As fraudsters develop new methods, our detection capabilities evolve
                to match, creating a cycle of improvement.
              </p>
            </div>
            
            <div className="bg-secondary-800/50 rounded-xl p-6 border border-secondary-700">
              <h3 className="text-xl font-bold text-white mb-4">Research Partnerships</h3>
              <p className="text-secondary-300">
                We collaborate with leading universities and research institutions to stay at the forefront 
                of deepfake detection technology, participating in open challenges and publishing findings
                to advance the field.
              </p>
            </div>
          </div>
        </section>
        
        {/* Performance Metrics */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Performance Metrics</h2>
          
          <div className="bg-secondary-800/50 rounded-xl p-8 border border-secondary-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Detection Accuracy"
                value="99.4%"
                description="On benchmark datasets"
              />
              <MetricCard
                title="False Positive Rate"
                value="0.5%"
                description="Industry-leading precision"
              />
              <MetricCard
                title="Processing Time"
                value="15ms"
                description="Per frame average"
              />
              <MetricCard
                title="Update Frequency"
                value="Weekly"
                description="Continuous improvement"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Tech List Item Component
interface TechListItemProps {
  children: React.ReactNode;
}

const TechListItem: React.FC<TechListItemProps> = ({ children }) => {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-1">
        <Shield className="h-5 w-5 text-primary-500" />
      </div>
      <span className="text-secondary-200">{children}</span>
    </li>
  );
};

// Tech Stack Card Component
interface TechStackCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-secondary-800/70 rounded-xl p-6 border border-secondary-700 hover:bg-secondary-800 transition-colors duration-300">
      <div className="h-14 w-14 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-secondary-300">{description}</p>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  description: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, description }) => {
  return (
    <div className="text-center p-6">
      <h3 className="text-secondary-400 font-medium mb-2">{title}</h3>
      <p className="text-3xl font-bold text-primary-500 mb-1">{value}</p>
      <p className="text-secondary-400 text-sm">{description}</p>
    </div>
  );
};

export default TechnologyPage;