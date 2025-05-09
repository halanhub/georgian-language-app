import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FolderX } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`text-center max-w-md w-full space-y-8`}>
        <FolderX className={`h-24 w-24 mx-auto ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
        
        <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          404 | Page Not Found
        </h2>
        
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        
        <Link 
          to="/"
          className={`inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium ${
            theme === 'dark' 
              ? 'bg-red-700 text-white hover:bg-red-800'
              : 'bg-red-600 text-white hover:bg-red-700'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            theme === 'dark' ? 'focus:ring-red-400 focus:ring-offset-gray-900' : 'focus:ring-red-500 focus:ring-offset-white'
          }`}
        >
          <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;