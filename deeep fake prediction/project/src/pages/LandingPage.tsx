import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, Zap, Lock, Code, Cpu, Globe, ChevronRight } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary-950 to-secondary-900">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-500/10 text-primary-400 text-sm font-medium mb-6">
                <Shield size={16} className="mr-2" />
                <span>Deepfake Security Solution</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
                Protect Video Calls from <span className="text-primary-500">Deepfake Attacks</span> in Real-Time
              </h1>
              <p className="text-lg text-secondary-300 mb-8">
                DeepShield uses advanced AI to detect and prevent deepfakes during live video calls, protecting your business, healthcare, and education communications from impersonation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/demo"
                  className="px-8 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium text-center"
                >
                  Try the Demo
                </Link>
                <Link
                  to="/technology"
                  className="px-8 py-3 rounded-lg bg-secondary-800 hover:bg-secondary-700 transition-colors duration-300 text-white font-medium text-center"
                >
                  Learn More
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary-500" />
                  <span className="text-secondary-300 text-sm">Real-time analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary-500" />
                  <span className="text-secondary-300 text-sm">Low latency</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-primary-500" />
                  <span className="text-secondary-300 text-sm">99% accuracy</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="bg-secondary-800 rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/5792641/pexels-photo-5792641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="DeepShield in action" 
                    className="w-full h-auto"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-primary-500/10 to-transparent pointer-events-none"></div>
                  <div className="absolute top-4 right-4 bg-danger-500/90 text-white text-xs font-bold px-2 py-1 rounded-md flex items-center">
                    <AlertOverlay />
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-primary-500/20 rounded-full blur-xl"></div>
                <div className="absolute -top-4 -left-4 h-20 w-20 bg-primary-600/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-950">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Key Features</h2>
            <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
              Our comprehensive solution integrates seamlessly with your existing video call platforms
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap size={24} />}
              title="Real-Time Detection"
              description="Analyze video frames and audio in microseconds to detect manipulation without affecting call quality."
            />
            <FeatureCard
              icon={<Cpu size={24} />}
              title="AI-Powered Analysis"
              description="Advanced neural networks trained on millions of real and fake samples to identify even the subtlest manipulations."
            />
            <FeatureCard
              icon={<Lock size={24} />}
              title="Secure Verification"
              description="Multi-factor biometric authentication ensures the person you're speaking with is who they claim to be."
            />
            <FeatureCard
              icon={<Code size={24} />}
              title="Simple Integration"
              description="SDK for WebRTC platforms like Zoom, Google Meet, Microsoft Teams, and custom solutions."
            />
            <FeatureCard
              icon={<Shield size={24} />}
              title="Compliance Ready"
              description="Meet security requirements for healthcare, finance, legal, and educational video communications."
            />
            <FeatureCard
              icon={<Globe size={24} />}
              title="Edge Computing"
              description="Process sensitive data locally on device to preserve privacy and reduce latency."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary-900">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-gradient-to-r from-secondary-800 to-secondary-800/50 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 h-64 w-64 bg-primary-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-48 w-48 bg-primary-600/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-2/3">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ready to secure your video communications?
                </h2>
                <p className="text-lg text-secondary-300">
                  Try our interactive demo or contact us for a personalized consultation.
                </p>
              </div>
              <div className="md:w-1/3 flex flex-col sm:flex-row md:flex-col gap-4">
                <Link
                  to="/demo"
                  className="px-8 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium text-center flex items-center justify-center"
                >
                  Try Demo <ChevronRight size={16} className="ml-2" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-3 rounded-lg bg-secondary-700 hover:bg-secondary-600 transition-colors duration-300 text-white font-medium text-center"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Feature Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="bg-secondary-900/50 hover:bg-secondary-800/50 transition-colors duration-300 rounded-xl p-6 border border-secondary-800">
      <div className="h-12 w-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-secondary-300">{description}</p>
    </div>
  );
};

// Alert Overlay Component for Hero Image
const AlertOverlay: React.FC = () => {
  return (
    <>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-1">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>DEEPFAKE DETECTED</span>
    </>
  );
};

export default LandingPage;