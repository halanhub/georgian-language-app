import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Send, CheckCircle, XCircle, Loader } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import emailjs from '@emailjs/browser';

const ContactPage: React.FC = () => {
  const { theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

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
    setSubmitStatus(null);
    setErrorMessage('');
    
    try {
      // EmailJS configuration
      const serviceId = 'service_lhutv6w';
      const templateId = 'template_gnfcdat';
      const publicKey = 'Dvvd7uv3oERbrebKR';
      
      // Send the email
      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        publicKey
      );
      
      console.log('Email sent successfully:', result.text);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unknown error occurred');
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
                        contact@georgianlanguage.online
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Quick Links
                </h3>
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
              
              {submitStatus === 'success' && (
                <div className={`mb-6 p-4 rounded-md flex items-center ${
                  theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
                }`}>
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <p>Thank you for your message! We'll get back to you within 24 hours.</p>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className={`mb-6 p-4 rounded-md flex items-center ${
                  theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
                }`}>
                  <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <div>
                    <p>There was an error sending your message.</p>
                    {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                    <p className="text-sm mt-1">Please try again or email us directly.</p>
                  </div>
                </div>
              )}
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                    <>
                      <Loader size={16} className="animate-spin mr-2" />
                      Sending...
                    </>
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