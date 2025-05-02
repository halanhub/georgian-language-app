import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Lock } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../hooks/useSubscription';

interface SubscriptionBannerProps {
  type?: 'inline' | 'full';
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ type = 'inline' }) => {
  const { theme } = useTheme();
  const { hasActiveSubscription } = useSubscription();

  if (hasActiveSubscription) {
    return null;
  }

  if (type === 'inline') {
    return (
      <div className={`rounded-lg p-4 mb-6 ${
        theme === 'dark' ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-100'
      }`}>
        <div className="flex items-start">
          <Lock className={`h-5 w-5 mt-0.5 mr-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <div>
            <h3 className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>
              Premium Content
            </h3>
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>
              Upgrade to access intermediate and advanced lessons, plus all premium features.
            </p>
            <Link
              to="/pricing"
              className={`inline-flex items-center mt-2 text-xs font-medium ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'
              }`}
            >
              <CreditCard className="h-3.5 w-3.5 mr-1" />
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`py-3 px-4 ${
      theme === 'dark' ? 'bg-blue-900/30 border-y border-blue-800' : 'bg-blue-50 border-y border-blue-100'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-3 sm:mb-0">
          <Lock className={`h-5 w-5 mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-sm ${theme === 'dark' ? 'text-blue-200' : 'text-blue-700'}`}>
            Upgrade to premium for only $4.99/month to unlock all content and features
          </p>
        </div>
        <Link
          to="/pricing"
          className={`px-4 py-1.5 rounded text-sm font-medium ${
            theme === 'dark' 
              ? 'bg-blue-700 text-white hover:bg-blue-600' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionBanner;