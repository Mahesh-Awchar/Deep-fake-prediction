import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-secondary-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xl font-bold"
          >
            <Shield className="text-primary-500 h-7 w-7" />
            <span className="text-white">Deep<span className="text-primary-500">Shield</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/demo" active={location.pathname === '/demo'}>Demo</NavLink>
            <NavLink to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</NavLink>
            <NavLink to="/developers" active={location.pathname === '/developers'}>Developers</NavLink>
            <NavLink to="/technology" active={location.pathname === '/technology'}>Technology</NavLink>
            <Link 
              to="/demo" 
              className="px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium"
            >
              Try Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-4 py-4">
            <MobileNavLink to="/demo" active={location.pathname === '/demo'}>Demo</MobileNavLink>
            <MobileNavLink to="/dashboard" active={location.pathname === '/dashboard'}>Dashboard</MobileNavLink>
            <MobileNavLink to="/developers" active={location.pathname === '/developers'}>Developers</MobileNavLink>
            <MobileNavLink to="/technology" active={location.pathname === '/technology'}>Technology</MobileNavLink>
            <Link 
              to="/demo" 
              className="w-full px-4 py-3 rounded-md bg-primary-500 hover:bg-primary-600 transition-colors duration-300 text-white font-medium text-center"
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`font-medium transition-colors duration-300 hover:text-primary-400 ${
        active ? 'text-primary-400' : 'text-white'
      }`}
    >
      {children}
    </Link>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ to, active, children }) => {
  return (
    <Link
      to={to}
      className={`py-3 px-4 rounded-md transition-colors duration-300 ${
        active ? 'bg-secondary-800 text-primary-400' : 'text-white hover:bg-secondary-800/50'
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;