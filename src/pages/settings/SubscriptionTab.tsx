import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Check, X, Loader } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSubscription } from '../../hooks/useSubscription';
import { createCheckoutSession, createCustomerPortalSession } from '../../lib/stripe';

interface SubscriptionTabProps {
  showSuccessMessage?: boolean;
}

const SubscriptionTab: React.FC<SubscriptionTabProps> = ({ showSuccessMessage = false }) => {
  const { theme } = useTheme();
  const { hasActiveSubscription, subscriptionDetails, loading } = useSubscription();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a checkout session
      const successUrl = `${window.location.origin}/settings?checkout=success&tab=subscription`;
      const cancelUrl = `${window.location.origin}/pricing?checkout=canceled`;
      
      const { url } = await createCheckoutSession(
        'premium',
        successUrl,
        cancelUrl
      );
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session - no URL returned');
      }
    } catch (err: any) {
      console.error('Error creating checkout session:', err);
      setError('Failed to process subscription. Please try again later. Error: ' + (err.message || 'Unknown error'));
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const returnUrl = `${window.location.origin}/settings?tab=subscription`;
      
      const { url } = await createCustomerPortalSession(returnUrl);
      
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create customer portal session - no URL returned');
      }
    } catch (err: any) {
      console.error('Error creating customer portal session:', err);
      setError('Failed to access subscription management. Please try again later. Error: ' + (err.message || 'Unknown error'));
      setIsLoading(false);
    }
  };

  // Format subscription end date
  const formatSubscriptionEndDate = (timestamp: number | null) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get product name from price ID
  const getProductName = (priceId: string | null) => {
    if (!priceId) return 'Premium';
    
    const product = Object.values(STRIPE_PRODUCTS).find(p => p.priceId === priceId);
    if (!product) return 'Premium';
    
    return product.name;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className={`p-4 rounded-md ${
          theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
        }`}>
          <p>Your subscription has been activated successfully!</p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className={`p-4 rounded-md ${
          theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
        }`}>
          <p>{error}</p>
        </div>
      )}
      
      {/* Subscription Status */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
        <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Subscription Status
        </h3>
        
        <div className={`p-6 rounded-lg ${
          hasActiveSubscription 
            ? (theme === 'dark' ? 'bg-green-900/30 border border-green-800' : 'bg-green-50 border border-green-100')
            : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50')
        }`}>
          <div className="flex items-center mb-4">
            <div className={`p-3 rounded-full mr-4 ${
              hasActiveSubscription
                ? (theme === 'dark' ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800')
                : (theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-600')
            }`}>
              <CreditCard size={24} />
            </div>
            <div>
              <h4 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {hasActiveSubscription ? `${getProductName(subscriptionDetails?.price_id)} Subscription` : 'Free Plan'}
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {hasActiveSubscription 
                  ? 'You have access to all premium features and content' 
                  : 'Upgrade to access all features and content'}
              </p>
            </div>
          </div>
          
          {hasActiveSubscription && subscriptionDetails && (
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
                }`}>
                  Active
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Plan:</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Premium
                </span>
              </div>
              <div className="flex justify-between">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Renewal Date:</span>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {formatSubscriptionEndDate(subscriptionDetails.current_period_end)}
                </span>
              </div>
              {subscriptionDetails.cancel_at_period_end && (
                <div className="flex justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Status:</span>
                  <span className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
                  }`}>
                    Cancels at period end
                  </span>
                </div>
              )}
              {subscriptionDetails.payment_method_last4 && (
                <div className="flex justify-between">
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Payment Method:</span>
                  <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {subscriptionDetails.payment_method_brand?.toUpperCase()} •••• {subscriptionDetails.payment_method_last4}
                  </span>
                </div>
              )}
              <div className="pt-4 mt-4 border-t border-gray-700">
                <button
                  onClick={handleManageSubscription}
                  disabled={isLoading}
                  className={`block w-full text-center py-2 rounded-md text-sm font-medium ${
                    isLoading
                      ? (theme === 'dark' ? 'bg-blue-700 text-gray-300 cursor-not-allowed' : 'bg-blue-300 text-gray-500 cursor-not-allowed')
                      : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader size={16} className="inline-block animate-spin mr-2" />
                      Loading...
                    </>
                  ) : (
                    'Manage Subscription'
                  )}
                </button>
              </div>
            </div>
          )}
          
          {!hasActiveSubscription && (
            <div className="mt-4">
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className={`block w-full text-center py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                  isLoading
                    ? (theme === 'dark' ? 'bg-blue-700 text-gray-300 cursor-not-allowed' : 'bg-blue-300 text-gray-500 cursor-not-allowed')
                    : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader size={16} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={16} className="mr-2" />
                    Subscribe Now
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Plan Comparison */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
        <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Plan Comparison
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Feature
                </th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Free
                </th>
                <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Premium
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y divide-gray-200 dark:divide-gray-700`}>
              <tr>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Beginner Lessons
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
              </tr>
              <tr>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Intermediate Lessons
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <X size={18} className="text-red-500" />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
              </tr>
              <tr>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Advanced Lessons
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <X size={18} className="text-red-500" />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
              </tr>
              <tr>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  All Quizzes
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <X size={18} className="text-red-500" />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
              </tr>
              <tr>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Advanced Progress Tracking
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <X size={18} className="text-red-500" />
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  <Check size={18} className="text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {!hasActiveSubscription && (
          <div className="mt-6 text-center">
            <button
              onClick={handleSubscribe}
              disabled={isLoading}
              className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${
                isLoading
                  ? (theme === 'dark' ? 'bg-blue-700 text-gray-300 cursor-not-allowed' : 'bg-blue-300 text-gray-500 cursor-not-allowed')
                  : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
              }`}
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={16} className="mr-2" />
                  Upgrade to Premium
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionTab;