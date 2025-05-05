import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Loader, Shield, Star, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { createCheckoutSession } from '../lib/stripe';
import { STRIPE_PRODUCTS } from '../stripe-config';

const PricingPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<'premium' | 'annual'>('premium');

  // Check for query parameters that might indicate checkout status
  const params = new URLSearchParams(location.search);
  const checkoutStatus = params.get('checkout');
  const showSuccess = checkoutStatus === 'success';
  const showError = checkoutStatus === 'canceled';

  const handleSubscribe = async () => {
    if (!user) {
      // Redirect to login if not logged in
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Create a checkout session
      const successUrl = `${window.location.origin}/settings?checkout=success`;
      const cancelUrl = `${window.location.origin}/pricing?checkout=canceled`;
      
      const { url } = await createCheckoutSession(
        selectedPlan,
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
      setLoading(false);
    }
  };

  const handleManageSubscription = () => {
    navigate('/settings?tab=subscription');
  };

  return (
    <div className="pt-16 pb-16">
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-2/3">
              <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>Premium Plans</span> - პრემიუმ გეგმები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Unlock the full Georgian language learning experience with our premium plans.
              </p>
              <div className="flex flex-wrap gap-2">
                <Link
                  to="/"
                  className={`inline-flex items-center px-4 py-2 rounded font-medium text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-white text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showError && (
            <div className={`mb-8 p-4 rounded-md ${
              theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
            }`}>
              <p>The checkout process was canceled. Please try again if you want to subscribe.</p>
            </div>
          )}
          
          {showSuccess && (
            <div className={`mb-8 p-4 rounded-md ${
              theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
            }`}>
              <p>Your subscription has been activated successfully!</p>
            </div>
          )}
          
          {error && (
            <div className={`mb-8 p-4 rounded-md ${
              theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
            }`}>
              <p>{error}</p>
            </div>
          )}
          
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Choose Your Plan
            </h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Select the plan that best fits your learning needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Free
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $0
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /forever
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Access to beginner lessons
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Basic vocabulary practice
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Limited quizzes
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Basic progress tracking
                    </span>
                  </li>
                </ul>
                
                <button
                  disabled={true}
                  className={`w-full px-4 py-2 rounded-md text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Current Plan
                </button>
              </div>
            </div>
            
            {/* Monthly Premium Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden transform ${
              selectedPlan === 'premium' && !hasActiveSubscription
                ? (theme === 'dark' ? 'bg-gray-800 ring-2 ring-blue-500 scale-105' : 'bg-white ring-2 ring-blue-500 scale-105')
                : (theme === 'dark' ? 'bg-gray-800' : 'bg-white')
            }`}>
              <div className={`p-1 text-center text-sm font-semibold ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                Monthly
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Premium
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $4.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /month
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Access to all lessons (Beginner to Advanced)
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Unlimited vocabulary practice
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      All quizzes and exercises
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Advanced progress tracking
                    </span>
                  </li>
                </ul>
                
                {hasActiveSubscription ? (
                  <button
                    onClick={handleManageSubscription}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      loading
                        ? (theme === 'dark' ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')
                    }`}
                  >
                    {loading && selectedPlan === 'premium' ? (
                      <>
                        <Loader size={16} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        Manage Subscription
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPlan('premium');
                      handleSubscribe();
                    }}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      loading
                        ? (theme === 'dark' ? 'bg-blue-700 text-gray-300 cursor-not-allowed' : 'bg-blue-300 text-gray-500 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                    }`}
                  >
                    {loading && selectedPlan === 'premium' ? (
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
                )}
              </div>
            </div>
            
            {/* Annual Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden transform ${
              selectedPlan === 'annual' && !hasActiveSubscription
                ? (theme === 'dark' ? 'bg-gray-800 ring-2 ring-green-500 scale-105' : 'bg-white ring-2 ring-green-500 scale-105')
                : (theme === 'dark' ? 'bg-gray-800' : 'bg-white')
            }`}>
              <div className={`p-1 text-center text-sm font-semibold ${
                theme === 'dark' ? 'bg-green-600 text-white' : 'bg-green-600 text-white'
              }`}>
                Best Value
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Annual
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $49.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    /year
                  </span>
                </div>
                <p className={`mt-1 text-sm ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                  Save 16% compared to monthly
                </p>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-4">
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      All Premium features
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Priority support
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Early access to new features
                    </span>
                  </li>
                  <li className="flex">
                    <Check size={20} className={`flex-shrink-0 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      16% savings compared to monthly plan
                    </span>
                  </li>
                </ul>
                
                {hasActiveSubscription ? (
                  <button
                    onClick={handleManageSubscription}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      loading
                        ? (theme === 'dark' ? 'bg-gray-600 text-gray-300 cursor-not-allowed' : 'bg-gray-300 text-gray-500 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300')
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader size={16} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        Manage Subscription
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedPlan('annual');
                      handleSubscribe();
                    }}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      loading
                        ? (theme === 'dark' ? 'bg-green-700 text-gray-300 cursor-not-allowed' : 'bg-green-300 text-gray-500 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700')
                    }`}
                  >
                    {loading && selectedPlan === 'annual' ? (
                      <>
                        <Loader size={16} className="animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        Subscribe Annually
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Why Choose Premium?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-blue-100">
                <Zap size={24} className="text-blue-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Complete Learning Path
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Access all levels from beginner to advanced, with a structured curriculum designed for optimal learning.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-green-100">
                <Star size={24} className="text-green-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Premium Content
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Enjoy exclusive lessons, exercises, and learning materials created by language experts.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-purple-100">
                <Shield size={24} className="text-purple-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Advanced Features
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Track your progress in detail, access personalized learning recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Can I cancel my subscription anytime?
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Yes, you can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                What payment methods do you accept?
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We accept all major credit and debit cards, including Visa, Mastercard, American Express, and Discover.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Is there a free trial?
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                We don't offer a free trial, but our free plan gives you access to beginner lessons so you can experience our platform before upgrading.
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                How do I change my plan?
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                You can manage your subscription at any time from your account settings. Changes will take effect at the start of your next billing cycle.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;