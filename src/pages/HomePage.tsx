import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, ChevronRight, CreditCard, Dices, Globe } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../hooks/useSubscription';
import { useTranslation } from 'react-i18next';
import learnGeorgianImage from '../assets/images/learn-georgian.webp';
import { STRIPE_PRODUCTS } from '../stripe-config';
  const HomePage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const { hasActiveSubscription } = useSubscription();
  const { t } = useTranslation();

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className={`relative py-20 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-r from-red-50 to-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center md:text-left md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                <span className={`${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>
                  {t('home.title')}
                </span> ქართული ენა
              </h1>
              <p className={`text-lg md:text-xl mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {t('home.subtitle')}
              </p>
              <div className="space-x-4">
                {!user ? (
                  <>
                    <Link 
                      to="/signup" 
                      className={`inline-block px-6 py-3 rounded-md text-white font-medium shadow-lg transition-transform hover:scale-105 ${
                        theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                      }`}
                    >
                      {t('home.start_learning')}
                    </Link>
                    <Link 
                      to="/login" 
                      className={`inline-block px-6 py-3 rounded-md font-medium transition-colors ${
                        theme === 'dark' ? 
                        'text-gray-300 bg-gray-800 hover:bg-gray-700' : 
                        'text-gray-700 bg-white hover:bg-gray-100'
                      }`}
                    >
                      {t('common.login')}
                    </Link>
                  </>
                ) : (
                  <Link 
                    to="/beginner" 
                    className={`inline-block px-6 py-3 rounded-md text-white font-medium shadow-lg transition-transform hover:scale-105 ${
                      theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {t('home.continue_learning')}
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden md:block md:w-1/2">
              <img 
                src={learnGeorgianImage} 
                alt="Georgian alphabet and language learning" 
                className="mx-auto rounded-lg shadow-xl max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('home.smart_way')}
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.platform_description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <Book size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.learning_paths')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('home.features.learning_paths_desc')}
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <Dices size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.interactive')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('home.features.interactive_desc')}
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`p-6 rounded-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-red-50 text-gray-800'
            }`}>
              <div className={`p-3 rounded-full inline-block mb-4 ${
                theme === 'dark' ? 'bg-gray-600' : 'bg-red-100'
              }`}>
                <Book size={24} className={theme === 'dark' ? 'text-red-400' : 'text-red-600'} />
              </div>
              <h3 className="text-xl font-bold mb-2">{t('home.features.resources')}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                {t('home.features.resources_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Levels Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('home.levels.title')}
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.levels.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Beginner */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-green-600' : 'bg-green-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.levels.beginner')}
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home.levels.beginner_features', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight size={16} className={theme === 'dark' ? 'text-green-400' : 'text-green-500'} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to={user ? "/beginner" : "/signup"} 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-green-700 text-white hover:bg-green-800' : 
                    'bg-green-500 text-white hover:bg-green-600'
                  } transition-colors`}
                >
                  {user ? t('home.levels.continue_learning') : t('home.levels.start_learning')}
                </Link>
              </div>
            </div>

            {/* Intermediate */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.levels.intermediate')}
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home.levels.intermediate_features', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                {hasActiveSubscription ? (
                  <Link 
                    to="/intermediate" 
                    className={`block w-full text-center py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-blue-700 text-white hover:bg-blue-800' : 
                      'bg-blue-500 text-white hover:bg-blue-600'
                    } transition-colors`}
                  >
                    {t('home.levels.continue_learning')}
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`flex items-center justify-center w-full py-2 rounded-md font-medium ${
                      theme === 'dark' 
                        ? 'bg-blue-700 text-white hover:bg-blue-800' 
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    <CreditCard size={16} className="mr-2" />
                    {t('home.levels.upgrade_to_access')}
                  </Link>
                )}
              </div>
            </div>

            {/* Advanced */}
            <div className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`h-3 ${theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500'}`}></div>
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.levels.advanced')}
                </h3>
                <ul className={`space-y-2 mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {t('home.levels.advanced_features', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-500'} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                {hasActiveSubscription ? (
                  <Link 
                    to="/advanced" 
                    className={`block w-full text-center py-2 rounded-md font-medium ${
                      theme === 'dark' ? 
                      'bg-purple-700 text-white hover:bg-purple-800' : 
                      'bg-purple-500 text-white hover:bg-purple-600'
                    } transition-colors`}
                  >
                    {t('home.levels.continue_learning')}
                  </Link>
                ) : (
                  <Link
                    to="/pricing"
                    className={`flex items-center justify-center w-full py-2 rounded-md font-medium ${
                      theme === 'dark' 
                        ? 'bg-purple-700 text-white hover:bg-purple-800' 
                        : 'bg-purple-500 text-white hover:bg-purple-600'
                    }`}
                  >
                    <CreditCard size={16} className="mr-2" />
                    {t('home.levels.upgrade_to_access')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('home.pricing.title')}
            </h2>
            <p className={`max-w-2xl mx-auto text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('home.pricing.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.pricing.free')}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $0
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t('home.pricing.forever')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {t('home.pricing.features.free', { returnObjects: true }).map((feature: string, index: number) => (
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
                  {t('home.pricing.get_started')}
                </Link>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className={`rounded-lg overflow-hidden shadow-lg ${
              theme === 'dark' ? 'bg-gray-800 ring-2 ring-blue-500' : 'bg-white ring-2 ring-blue-500'
            }`}>
              <div className={`p-1 text-center text-sm font-semibold ${
                theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'
              }`}>
                Most Popular
              </div>
              <div className={`p-6 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {t('home.pricing.premium')}
                </h3>
                <div className="mt-4 flex items-baseline">
                  <span className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    $4.99
                  </span>
                  <span className={`ml-1 text-xl font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {t('home.pricing.month')}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {t('home.pricing.features.premium', { returnObjects: true }).map((feature: string, index: number) => (
                    <li key={index} className="flex">
                      <ChevronRight size={16} className={`mt-1 ${theme === 'dark' ? 'text-green-400' : 'text-green-500'}`} />
                      <span className="ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/pricing" 
                  className={`block w-full text-center py-2 rounded-md font-medium ${
                    theme === 'dark' ? 
                    'bg-blue-700 text-white hover:bg-blue-800' : 
                    'bg-blue-600 text-white hover:bg-blue-700'
                  } transition-colors`}
                >
                  {t('home.pricing.subscribe_now')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-800' : 'bg-red-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Globe size={48} className={`mx-auto mb-4 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
            <h2 className={`text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('home.cta.title')}
            </h2>
            <p className={`max-w-2xl mx-auto text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {t('home.cta.description')}
            </p>
            {!user ? (
              <Link 
                to="/signup" 
                className={`inline-block px-8 py-4 rounded-md text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {t('home.cta.create_account')}
              </Link>
            ) : (
              <Link 
                to="/beginner" 
                className={`inline-block px-8 py-4 rounded-md text-lg font-medium text-white shadow-lg transition-transform hover:scale-105 ${
                  theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {t('home.cta.continue_journey')}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* SEO Content Section (Hidden visually but available for search engines) */}
      <section className={`py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t('faq.seo.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('faq.seo.why_learn.title')}
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('faq.seo.why_learn.content')}
              </p>
              
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('faq.seo.approach.title')}
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('faq.seo.approach.content')}
              </p>
            </div>
            
            <div>
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('faq.seo.alphabet.title')}
              </h3>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('faq.seo.alphabet.content')}
              </p>
              
              <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {t('faq.seo.grammar.title')}
              </h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {t('faq.seo.grammar.content')}
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className={`text-xl font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {t('faq.seo.start.title')}
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {t('faq.seo.start.content')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;