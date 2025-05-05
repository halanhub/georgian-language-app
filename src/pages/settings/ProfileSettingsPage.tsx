import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Camera, Mail, Save, User, Award, Clock, BookOpen, Brain, Calendar, CheckCircle2, AlertCircle, CreditCard, Loader, Trash2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useUserProfile } from '../../hooks/useUserProfile';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useUserAchievements } from '../../hooks/useUserAchievements';
import SubscriptionTab from './SubscriptionTab';

const truncateEmail = (email: string) => {
  if (email.length > 25) {
    return `${email.substring(0, 22)}...`;
  }
  return email;
};

const ProfileSettingsPage: React.FC = () => {
  const { user, uploadAvatar } = useAuth();
  const { theme } = useTheme();
  const location = useLocation();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile();
  const { progress, loading: progressLoading } = useUserProgress();
  const { achievements, loading: achievementsLoading } = useUserAchievements();
  
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [language, setLanguage] = useState('en');
  const [notifications, setNotifications] = useState({
    email: true,
    progress: true,
    reminders: false,
    news: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'success' | 'error' | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'tracking' | 'subscription'>('profile');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for query parameters that might indicate checkout status
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const checkoutStatus = params.get('checkout');
    const tab = params.get('tab');
    
    if (checkoutStatus === 'success') {
      setSaveStatus('success');
    }
    
    if (tab === 'subscription') {
      setActiveTab('subscription');
    }
  }, [location]);

  // Set initial form values when profile loads
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
      setEmail(profile.email || '');
      
      // Set avatar preview if available
      if (profile.avatarUrl) {
        setAvatarPreview(profile.avatarUrl);
      }
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSaveStatus(null);
    
    try {
      // First, handle avatar upload if there's a new file
      if (avatarFile) {
        setIsUploading(true);
        try {
          await uploadAvatar(avatarFile);
          setAvatarFile(null); // Clear the file after upload
        } catch (error) {
          console.error('Error uploading avatar:', error);
          setUploadError('Failed to upload avatar. Please try again.');
          // Continue with other profile updates even if avatar upload fails
        } finally {
          setIsUploading(false);
        }
      }
      
      // Update other profile information
      await updateProfile({
        displayName
      });
      
      setSaveStatus('success');
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle avatar file selection
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Please select an image file (JPEG, PNG, etc.)');
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setUploadError('Image size should be less than 2MB');
        return;
      }
      
      setAvatarFile(file);
      setUploadError(null);
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file input click
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  // Remove avatar
  const handleRemoveAvatar = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      await updateProfile({ avatarUrl: null });
      setAvatarPreview(null);
      setAvatarFile(null);
      setSaveStatus('success');
    } catch (error) {
      console.error('Error removing avatar:', error);
      setSaveStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Calculate progress percentages
  const calculateProgress = () => {
    if (!profile) return {
      lessonsCompleted: 0,
      totalLessons: 45,
      quizzesTaken: 0,
      quizzesScore: 0,
      studyStreak: 0,
      totalStudyTime: 0,
      wordsLearned: 0,
      level: 'Beginner'
    };

    const completedLessons = progress?.filter(p => p.completed)?.length || 0;
    const quizzes = progress?.filter(p => p.lessonId.includes('quiz')) || [];
    const quizzesTaken = quizzes.length;
    const quizzesScore = quizzes.length > 0 
      ? Math.round(quizzes.reduce((sum, q) => sum + (q.score || 0), 0) / quizzesTaken) 
      : 0;

    return {
      lessonsCompleted: profile.lessonsCompleted || completedLessons,
      totalLessons: 45, // Fixed total for now
      quizzesTaken,
      quizzesScore,
      studyStreak: profile.studyStreak || 0,
      totalStudyTime: profile.totalStudyTime || 0,
      wordsLearned: profile.wordsLearned || 0,
      level: profile.level || 'Beginner'
    };
  };

  const userProgress = calculateProgress();

  // Loading state
  if (profileLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

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
              {activeTab === 'profile' && (
                <button
                  type="submit"
                  form="settings-form"
                  disabled={isLoading || isUploading}
                  className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${
                    isLoading || isUploading
                      ? (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500')
                      : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                  }`}
                >
                  {isLoading || isUploading ? (
                    <>
                      <Loader size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? (theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600')
                    : (theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                }`}
              >
                <User size={16} className="inline mr-2" />
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tracking'
                    ? (theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600')
                    : (theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                }`}
              >
                <Award size={16} className="inline mr-2" />
                Learning Tracking
              </button>
              <button
                onClick={() => setActiveTab('subscription')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'subscription'
                    ? (theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600')
                    : (theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300')
                }`}
              >
                <CreditCard size={16} className="inline mr-2" />
                Subscription
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {saveStatus === 'success' && activeTab !== 'subscription' && (
            <div className={`mb-6 p-4 rounded-md flex items-start ${
              theme === 'dark' ? 'bg-green-900 text-green-100' : 'bg-green-100 text-green-800'
            }`}>
              <CheckCircle2 className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>Your profile has been updated successfully!</p>
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className={`mb-6 p-4 rounded-md flex items-start ${
              theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
            }`}>
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>There was an error updating your profile. Please try again.</p>
            </div>
          )}
          
          {uploadError && (
            <div className={`mb-6 p-4 rounded-md flex items-start ${
              theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
            }`}>
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>{uploadError}</p>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Profile Picture Section */}
              <div className={`md:col-span-1 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <div className="text-center">
                  <div className="relative inline-block">
                    <div 
                      className={`w-32 h-32 rounded-full mx-auto overflow-hidden cursor-pointer ${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                      } flex items-center justify-center`}
                      onClick={handleAvatarClick}
                    >
                      {avatarPreview || profile?.avatarUrl ? (
                        <img 
                          src={avatarPreview || profile?.avatarUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={64} className={theme === 'dark' ? 'text-gray-500' : 'text-gray-400'} />
                      )}
                    </div>
                    <button
                      onClick={handleAvatarClick}
                      className={`absolute bottom-0 right-0 p-2 rounded-full ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' 
                          : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      }`}
                    >
                      <Camera size={20} />
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  
                  {(avatarPreview || profile?.avatarUrl) && (
                    <button
                      onClick={handleRemoveAvatar}
                      className={`mt-2 text-sm flex items-center mx-auto ${
                        theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
                      }`}
                    >
                      <Trash2 size={14} className="mr-1" />
                      Remove photo
                    </button>
                  )}
                  
                  <h2 className={`mt-4 text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {profile?.displayName || 'Your Name'}
                  </h2>
                  <p className={`text-sm overflow-hidden text-ellipsis ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    {truncateEmail(profile?.email || '')}
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className={`text-sm font-medium mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      Support
                    </h3>
                    <Link
                      to="/contact"
                      className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium ${
                        theme === 'dark' 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <Mail size={16} className="mr-2" />
                      Contact Support
                    </Link>
                  </div>
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
                          disabled
                          className={`mt-1 block w-full rounded-md shadow-sm ${
                            theme === 'dark'
                              ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                          } sm:text-sm`}
                        />
                        <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                          Email cannot be changed. Contact support if you need to update your email.
                        </p>
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
                          <option value="ru">Русский</option>
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
          )}

          {activeTab === 'tracking' && (
            <div className="space-y-8">
              {/* Learning Overview */}
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <h3 className={`text-lg font-medium mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Learning Overview
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <BookOpen size={20} className={`mr-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Lessons Completed
                      </h4>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {userProgress.lessonsCompleted}/{userProgress.totalLessons}
                    </p>
                    <div className="mt-2">
                      <div className={`w-full h-2 rounded-full ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div 
                          className={`h-2 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`}
                          style={{ width: `${(userProgress.lessonsCompleted / userProgress.totalLessons) * 100}%` }}
                        ></div>
                      </div>
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {Math.round((userProgress.lessonsCompleted / userProgress.totalLessons) * 100)}% complete
                      </p>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <Brain size={20} className={`mr-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Quiz Performance
                      </h4>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {userProgress.quizzesScore}%
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {userProgress.quizzesTaken} quizzes taken
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <Calendar size={20} className={`mr-2 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Study Streak
                      </h4>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {userProgress.studyStreak} days
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Current streak
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="flex items-center mb-2">
                      <Clock size={20} className={`mr-2 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
                      <h4 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        Total Study Time
                      </h4>
                    </div>
                    <p className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {userProgress.totalStudyTime} hrs
                    </p>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      Since you started
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements Summary */}
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Achievements
                  </h3>
                  <Link 
                    to="/achievements"
                    className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                  >
                    View All
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl mb-2">🏆</div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {achievements?.length || 0} Earned
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl mb-2">🔤</div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Alphabet Master
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <div className="text-3xl mb-2">🔥</div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {userProgress.studyStreak}-Day Streak
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg text-center ${theme === 'dark' ? 'bg-gray-700 opacity-50' : 'bg-gray-50 opacity-50'}`}>
                    <div className="text-3xl mb-2">⭐</div>
                    <p className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Next: 10 Quizzes
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Progress */}
              <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow`}>
                <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Recent Progress
                </h3>
                
                {progress && progress.length > 0 ? (
                  <div className="space-y-4">
                    {progress.slice(0, 5).map((item, index) => (
                      <div 
                        key={item.id}
                        className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-full mr-3 ${
                              theme === 'dark' ? 'bg-gray-600' : 'bg-white'
                            }`}>
                              {item.lessonId.includes('quiz') 
                                ? <Brain size={16} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} />
                                : <BookOpen size={16} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} />
                              }
                            </div>
                            <div>
                              <p className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                {item.lessonId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </p>
                              <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                {item.lessonId.includes('quiz') 
                                  ? `Score: ${item.score || 0}%` 
                                  : item.completed ? 'Completed' : 'In progress'
                                }
                              </p>
                            </div>
                          </div>
                          <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                            {formatDate(item.updatedAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`p-6 text-center rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                      No progress data available yet. Start learning to track your progress!
                    </p>
                  </div>
                )}
                
                {progress && progress.length > 5 && (
                  <div className="mt-4 text-center">
                    <Link 
                      to="/achievements"
                      className={`text-sm font-medium ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}
                    >
                      View All Progress
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <SubscriptionTab showSuccessMessage={saveStatus === 'success'} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;