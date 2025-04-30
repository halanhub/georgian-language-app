import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Mail, MessageCircle, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SupportPage: React.FC = () => {
  const { theme } = useTheme();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubject('');
      setMessage('');
      // Show success message
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      question: 'How do I reset my password?',
      answer: 'To reset your password, click on the "Forgot password?" link on the login page. Enter your email address, and we\'ll send you instructions to reset your password.'
    },
    {
      question: 'Can I change my learning level?',
      answer: 'Yes, you can change your learning level at any time from your profile settings. However, we recommend completing each level before moving to the next one.'
    },
    {
      question: 'How do I track my progress?',
      answer: 'Your progress is automatically tracked as you complete lessons and quizzes. You can view your progress on your profile page and at the beginning of each level.'
    },
    {
      question: 'Are the lessons available offline?',
      answer: 'Currently, our lessons require an internet connection. However, we\'re working on adding offline support for basic lessons and vocabulary practice.'
    },
    {
      question: 'How often is new content added?',
      answer: 'We regularly update our content with new lessons, exercises, and cultural materials. Follow our news section to stay updated on new additions.'
    }
  ];

  return (
    <div className="pt-16 pb-16">
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <Link
                to="/"
                className={`mr-4 p-2 rounded-full ${
                  theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ArrowLeft size={20} />
              </Link>
              <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Support Center
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contact Support
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label 
                      htmlFor="subject" 
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      } sm:text-sm`}
                      required
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="message" 
                      className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`mt-1 block w-full rounded-md shadow-sm ${
                        theme === 'dark'
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                          : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      } sm:text-sm`}
                      required
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        isSubmitting
                          ? (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-400')
                          : (theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700')
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Contact Info & Quick Links */}
            <div className="space-y-6">
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      support@georgianlearning.com
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className={`h-5 w-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} />
                    <span className={`ml-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                      Live chat available 9AM-5PM GMT
                    </span>
                  </div>
                </div>
              </div>

              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Quick Links
                </h3>
                <nav className="space-y-2">
                  <Link
                    to="/settings"
                    className={`block px-3 py-2 rounded-md text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="/beginner"
                    className={`block px-3 py-2 rounded-md text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Learning Resources
                  </Link>
                  <Link
                    to="/chat"
                    className={`block px-3 py-2 rounded-md text-sm ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    AI Chat Assistant
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className={`mt-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
            <h2 className={`text-xl font-bold mb-6 flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <HelpCircle className="mr-2" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                  <h3 className={`text-lg font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;