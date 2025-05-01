import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Camera, Mail, Save, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const truncateEmail = (email: string) => {
  if (email.length > 25) {
    return `${email.substring(0, 22)}...`;
  }
  return email;
};

const ProfileSettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    progress: true,
    reminders: false,
    news: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Update user profile logic would go here
      
      // Show success message
    } catch (error) {
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 pb-16">
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
        {/* Header */}
        <div className={`py-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
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
                  Profile Settings
                </h1>
              </div>
              <button
                type="submit"
                form="settings-form"
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${
                  isLoading
                    ? (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500')
                    : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                }`}
              >
                <Save size={16} className="mr-2" />
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Profile Picture Section */}
            <div className={`md:col-span-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
              <div className="text-center">
                <div className="relative inline-block">
                  <div className={`w-32 h-32 rounded-full mx-auto ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                    <User size={64} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                  </div>
                  <button
                    className={`absolute bottom-0 right-0 p-2 rounded-full ${
                      theme === 'dark' 
                        ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' 
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <Camera size={20} />
                  </button>
                </div>
                <h2 className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {user?.displayName || 'Your Name'}
                </h2>
                <p className={`text-sm overflow-hidden text-ellipsis ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                  {truncateEmail(user?.email || '')}
                </p>
              </div>
            </div>

            {/* Settings Form */}
            <div className="md:col-span-2">
              <form id="settings-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                  <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="display-name" 
                        className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        id="display-name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        } sm:text-sm`}
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                  <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Preferences
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="language" 
                        className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Interface Language
                      </label>
                      <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`mt-1 block w-full rounded-md shadow-sm ${
                          theme === 'dark'
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500'
                            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                        } sm:text-sm`}
                      >
                        <option value="en">English</option>
                        <option value="ka">ქართული</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notifications */}
                <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                  <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Email Notifications
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Receive updates via email
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          notifications.email
                            ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600')
                            : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200')
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notifications.email ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Progress Updates
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get notified about your learning progress
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications(prev => ({ ...prev, progress: !prev.progress }))}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          notifications.progress
                            ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600')
                            : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200')
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notifications.progress ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          Daily Reminders
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Get daily reminders to practice
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications(prev => ({ ...prev, reminders: !prev.reminders }))}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          notifications.reminders
                            ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600')
                            : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200')
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notifications.reminders ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                          News & Updates
                        </h4>
                        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Receive news about new features and content
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setNotifications(prev => ({ ...prev, news: !prev.news }))}
                        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                          notifications.news
                            ? (theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600')
                            : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200')
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            notifications.news ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;