import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      // Show success message
    } catch (error) {
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

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
                Contact Us
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
                <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-blue-100'
                    }`}>
                      <Mail className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={20} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Email
                      </p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        support@georgianlearning.com
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full mr-4 ${
                      theme === 'dark' ? 'bg-gray-700' : 'bg-purple-100'
                    }`}>
                      <Phone className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} size={20} />
                    </div>
                    <div>
                      <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Phone
                      </p>
                      <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                        +995 XXX XXX XXX
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h2 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Quick Links
                </h2>
                <div className="space-y-2">
                  <Link
                    to="/support"
                    className={`block px-4 py-2 rounded-md ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    Support Center
                  </Link>
                  <Link
                    to="/beginner"
                    className={`block px-4 py-2 rounded-md ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    Learning Resources
                  </Link>
                  <Link
                    to="/chat"
                    className={`block px-4 py-2 rounded-md ${
                      theme === 'dark'
                        ? 'hover:bg-gray-700 text-gray-300'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    AI Chat Assistant
                  </Link>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-lg`}>
              <h2 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } sm:text-sm`}
                  />
                </div>

                <div>
                  <label 
                    htmlFor="email" 
                    className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } sm:text-sm`}
                  />
                </div>

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
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } sm:text-sm`}
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
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                        : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    } sm:text-sm`}
                  />
                </div>

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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;