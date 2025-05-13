import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import DashboardPage from './pages/DashboardPage';
import DeveloperPage from './pages/DeveloperPage';
import TechnologyPage from './pages/TechnologyPage';
import { DetectionProvider } from './context/DetectionContext';

function App() {
  return (
    <DetectionProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-secondary-950 to-secondary-900">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/developers" element={<DeveloperPage />} />
              <Route path="/technology" element={<TechnologyPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </DetectionProvider>
  );
}

export default App;