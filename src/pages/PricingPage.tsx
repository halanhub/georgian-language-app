import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Loader, Shield, Star, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useSubscription } from '../hooks/useSubscription';
import { createCheckoutSession } from '../lib/stripe';
import { STRIPE_PRODUCTS } from '../stripe-config';
import { useTranslation } from 'react-i18next';

const PricingPage: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const { hasActiveSubscription } = useSubscription();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const successUrl = `${window.location.origin}/settings?checkout=success&tab=subscription`;
      const cancelUrl = `${window.location.origin}/pricing?checkout=canceled`;
      
      console.log(`Initiating checkout for premium plan with price ID: ${STRIPE_PRODUCTS.premium.priceId}`);
      
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
                <span className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}>{t('pricing.title')}</span> - პრემიუმ გეგმები
              </h1>
              <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('pricing.subtitle')}
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
                  {t('common.back')}
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
              <p>{t('pricing.checkout_canceled')}</p>
            </div>
          )}
          
          {showSuccess && (
            <div className={`mb-8 p-4 rounded-md ${
              theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
            }`}>
              <p>{t('pricing.subscription_activated')}</p>
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
              {t('pricing.choose_plan')}
            </h2>
            <p className={`mt-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('pricing.select_best_plan')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('pricing.free.title')}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $0
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t('pricing.free.period')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {t('pricing.features.free', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex">
                      <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={user ? "/beginner" : "/signup"} 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-gray-700 text-white hover:bg-gray-600' : 
                    'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  } transition-colors`}
                >
                  {t('pricing.get_started')}
                </Link>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className={`rounded-lg shadow-lg overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800 ring-2 ring-blue-500' : 'bg-white ring-2 ring-blue-500'
            }`}>
              <div className={`p-1 text-center text-sm font-semibold ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                {t('pricing.premium.recommended')}
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('pricing.premium.title')}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $4.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t('pricing.premium.period')}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <ul className="space-y-4">
                  {t('pricing.features.premium', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex">
                      <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
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
                        {t('common.loading')}
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        {t('pricing.premium.manage_subscription')}
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className={`w-full px-4 py-2 rounded-md text-sm font-medium flex items-center justify-center ${
                      loading
                        ? (theme === 'dark' ? 'bg-blue-700 text-gray-300 cursor-not-allowed' : 'bg-blue-300 text-gray-500 cursor-not-allowed')
                        : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                    }`}
                  >
                    {loading ? (
                      <>
                        <Loader size={16} className="animate-spin mr-2" />
                        {t('common.loading')}
                      </>
                    ) : (
                      <>
                        <CreditCard size={16} className="mr-2" />
                        {t('pricing.premium.subscribe_now')}
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
              {t('pricing.why_premium.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-blue-100">
                <Zap size={24} className="text-blue-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.why_premium.complete_path.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.why_premium.complete_path.description')}
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-green-100">
                <Star size={24} className="text-green-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.why_premium.premium_content.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.why_premium.premium_content.description')}
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} text-center`}>
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-purple-100">
                <Shield size={24} className="text-purple-600" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.why_premium.advanced_features.title')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.why_premium.advanced_features.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('pricing.faq.title')}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.faq.cancel_anytime.question')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.faq.cancel_anytime.answer')}
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.faq.payment_methods.question')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.faq.payment_methods.answer')}
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.faq.free_trial.question')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.faq.free_trial.answer')}
              </p>
            </div>
            
            <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('pricing.faq.change_plan.question')}
              </h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('pricing.faq.change_plan.answer')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;