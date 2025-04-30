import React from 'react';
import { Heart, Mail, Github as GitHub } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`py-6 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} ქართული ენა. All rights reserved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className={`text-sm hover:${theme === 'dark' ? 'text-white' : 'text-red-600'} transition-colors`}
              aria-label="Contact us"
            >
              <Mail size={18} className="inline mr-1" />
              Contact
            </a>
            <div className="flex items-center">
              <span className="text-sm">Made with</span>
              <Heart size={16} className={`mx-1 ${theme === 'dark' ? 'text-red-400' : 'text-red-500'}`} />
              <span className="text-sm">for Georgian language learners</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;