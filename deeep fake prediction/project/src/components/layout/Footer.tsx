import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-950 pt-16 pb-8 text-secondary-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-4">
              <Shield className="text-primary-500 h-6 w-6" />
              <span className="text-white">Deep<span className="text-primary-500">Shield</span></span>
            </Link>
            <p className="mb-4 text-secondary-400">
              Protecting video call integrity with real-time deepfake detection technology.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Github size={18} />} />
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
              <SocialLink href="#" icon={<Mail size={18} />} />
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-2">
              <FooterLink to="/demo">Live Demo</FooterLink>
              <FooterLink to="/features">Features</FooterLink>
              <FooterLink to="/pricing">Pricing</FooterLink>
              <FooterLink to="/roadmap">Roadmap</FooterLink>
              <FooterLink to="/changelog">Changelog</FooterLink>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink to="/developers">Developer SDK</FooterLink>
              <FooterLink to="/documentation">Documentation</FooterLink>
              <FooterLink to="/api">API Reference</FooterLink>
              <FooterLink to="/technology">Technology</FooterLink>
              <FooterLink to="/blog">Blog</FooterLink>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} DeepShield, Inc. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-secondary-500 hover:text-secondary-300 text-sm transition-colors duration-300">
              Privacy
            </a>
            <a href="#" className="text-secondary-500 hover:text-secondary-300 text-sm transition-colors duration-300">
              Terms
            </a>
            <a href="#" className="text-secondary-500 hover:text-secondary-300 text-sm transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => {
  return (
    <li>
      <Link
        to={to}
        className="text-secondary-400 hover:text-primary-400 transition-colors duration-300"
      >
        {children}
      </Link>
    </li>
  );
};

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <a
      href={href}
      className="h-9 w-9 rounded-full bg-secondary-800 flex items-center justify-center transition-colors duration-300 hover:bg-primary-500 hover:text-white"
    >
      {icon}
    </a>
  );
};

export default Footer;