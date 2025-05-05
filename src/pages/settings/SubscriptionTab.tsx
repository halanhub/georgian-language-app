import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Check, X, Loader } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useSubscription } from '../../hooks/useSubscription';
import { createCheckoutSession, createCustomerPortalSession } from '../../services/stripeService';
import { STRIPE_PRODUCTS } from '../../stripe-config';

interface SubscriptionTabProps {
  showSuccessMessage?: boolean;
}

const SubscriptionTab: React.FC<SubscriptionTabProps> = ({ showSuccessMessage = false }) => {
  const { theme } = useTheme();
  const { hasActiveSubscription, subscriptionDetails, loading } = useSubscription();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'annual'>('premium');

  const handleSubscribe = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Create a checkout session
      const successUrl = `${window.location.origin}/settings?checkout=success&tab=subscription`;
      const cancelUrl = `${window.location.origin}/pricing?checkout=canceled`;
      
      const session = await createCheckoutSession(selectedPlan, successUrl, cancelUrl);
      
      // Redirect to Stripe checkout
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError('Failed to process subscription. Please try again later.');
      setIsLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const returnUrl = `${window.location.origin}/settings?tab=subscription`;
      const session = await createCustomerPortalSession(returnUrl);
      
      if (session?.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Failed to create customer portal session');
      }
    } catch (err) {
      console.error('Error creating customer portal session:', err);
      setError('Failed to access subscription management. Please try again later.');
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
                {hasActiveSubscription ? 'Premium Subscription' : 'Free Plan'}
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
                  {subscriptionDetails.price_id === STRIPE_PRODUCTS.annual.priceId ? 'Annual' : 'Monthly'} Premium
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
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <label className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Select a Plan:
                  </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedPlan('premium')}
                    className={`p-4 rounded-lg border-2 text-left ${
                      selectedPlan === 'premium'
                        ? (theme === 'dark' ? 'border-blue-500 bg-blue-900/30' : 'border-blue-500 bg-blue-50')
                        : (theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Monthly</h4>
                      {selectedPlan === 'premium' && (
                        <Check size={18} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                      )}
                    </div>
                    <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      $4.99<span className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>/month</span>
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Billed monthly
                    </p>
                  </button>
                  
                  <button
                    onClick={() => setSelectedPlan('annual')}
                    className={`p-4 rounded-lg border-2 text-left ${
                      selectedPlan === 'annual'
                        ? (theme === 'dark' ? 'border-green-500 bg-green-900/30' : 'border-green-500 bg-green-50')
                        : (theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Annual</h4>
                      {selectedPlan === 'annual' && (
                        <Check size={18} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} />
                      )}
                    </div>
                    <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      $49.99<span className={`text-sm font-normal ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>/year</span>
                    </p>
                    <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                      Save 16% compared to monthly
                    </p>
                  </button>
                </div>
              </div>
              
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