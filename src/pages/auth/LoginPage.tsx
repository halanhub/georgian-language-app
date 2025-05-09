import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, AlertCircle, Mail, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';

// Constants for retry mechanism
const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 1000; // 1 second

type LocationState = {
  from?: {
    pathname: string;
  };
};

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);
  const [networkStatus, setNetworkStatus] = useState<'online' | 'offline' | 'unknown'>('unknown');
  const [retryCount, setRetryCount] = useState(0);
  const [retryDelay, setRetryDelay] = useState(INITIAL_RETRY_DELAY);
  
  const { login, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  
  const locationState = location.state as LocationState;
  const from = locationState?.from?.pathname || '/';

  // Check network status
  useEffect(() => {
    const checkNetworkStatus = () => {
      if (navigator.onLine) {
        setNetworkStatus('online');
      } else {
        setNetworkStatus('offline');
      }
    };

    // Initial check
    checkNetworkStatus();

    // Add event listeners for network status changes
    const handleOnline = () => {
      setNetworkStatus('online');
      setError('');
    };
    
    const handleOffline = () => {
      setNetworkStatus('offline');
      setError('You are currently offline. Please check your internet connection and try again.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Clean up event listeners
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address to resend the confirmation.');
      return;
    }
    
    setIsResendingEmail(true);
    setResendSuccess(false);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirmation`,
        }
      });
      
      if (error) throw error;
      
      setResendSuccess(true);
      setError('');
    } catch (err: any) {
      console.error('Failed to resend confirmation email:', err);
      setError('Failed to resend confirmation email. Please try again later.');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    setIsResettingPassword(true);
    setResetPasswordSuccess(false);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setResetPasswordSuccess(true);
      setError('');
    } catch (err: any) {
      console.error('Failed to send password reset email:', err);
      setError('Failed to send password reset email. Please try again later.');
    } finally {
      setIsResettingPassword(false);
    }
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const attemptLogin = async (retryAttempt: number = 0): Promise<void> => {
    try {
      await login(email, password);
      // If successful, reset retry count and navigate
      setRetryCount(0);
      setRetryDelay(INITIAL_RETRY_DELAY);
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error('Login attempt error:', err);
      
      const isNetworkError = err.message?.includes('Failed to fetch') || 
                            err.message?.includes('NetworkError') || 
                            err.message?.includes('network') ||
                            err.message?.includes('timed out');

      if (isNetworkError && retryAttempt < MAX_RETRIES) {
        // Calculate exponential backoff delay
        const backoffDelay = INITIAL_RETRY_DELAY * Math.pow(2, retryAttempt);
        setRetryDelay(backoffDelay);
        setRetryCount(retryAttempt + 1);
        setError(`Network error. Retrying in ${backoffDelay / 1000} seconds... (Attempt ${retryAttempt + 1}/${MAX_RETRIES})`);
        
        // Wait for the backoff period
        await sleep(backoffDelay);
        
        // Retry the login
        return attemptLogin(retryAttempt + 1);
      }

      // Handle different error types
      if (err.message?.includes('Invalid login credentials')) {
        setError('The email or password you entered is incorrect. Please try again.');
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please confirm your email address before logging in.');
      } else if (isNetworkError) {
        setError('Network connection failed after multiple attempts. Please check your internet connection and try again later.');
        setNetworkStatus('offline');
      } else {
        setError(err.message || 'An error occurred during login. Please try again.');
      }
      throw err; // Re-throw to be caught by handleSubmit
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if offline
    if (networkStatus === 'offline') {
      setError('You are currently offline. Please check your internet connection and try again.');
      return;
    }
    
    setError('');
    setIsLoading(true);
    setResendSuccess(false);
    setResetPasswordSuccess(false);
    
    try {
      await attemptLogin();
    } catch (err) {
      // Error is already handled in attemptLogin
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Manual retry button handler
  const handleRetry = async () => {
    if (retryCount >= MAX_RETRIES) {
      setRetryCount(0); // Reset count for manual retry
      setRetryDelay(INITIAL_RETRY_DELAY);
    }
    
    setNetworkStatus('unknown');
    setError('');
    
    // Check network status
    if (navigator.onLine) {
      setNetworkStatus('online');
      await handleSubmit(new Event('submit') as any);
    } else {
      setNetworkStatus('offline');
      setError('You are still offline. Please check your internet connection and try again.');
    }
  };

  const renderNetworkStatus = () => {
    if (networkStatus === 'unknown' || networkStatus === 'online') return null;

    return (
      <div className={`p-4 mb-4 rounded-md ${
        theme === 'dark' ? 'bg-yellow-900/50' : 'bg-yellow-50'
      }`}>
        <div className="flex items-center">
          <WifiOff className={`h-5 w-5 mr-2 ${
            theme === 'dark' ? 'text-yellow-200' : 'text-yellow-400'
          }`} />
          <p className={`text-sm ${
            theme === 'dark' ? 'text-yellow-200' : 'text-yellow-700'
          }`}>
            You are currently offline. Some features may be unavailable.
          </p>
        </div>
      </div>
    );
  };

  const renderErrorMessage = () => {
    if (!error && !resendSuccess && !resetPasswordSuccess) return null;

    const isEmailNotConfirmed = error.includes('confirm your email');
    const messageType = error ? 'error' : 'success';
    const message = resetPasswordSuccess 
      ? 'Password reset email sent! Please check your inbox.'
      : resendSuccess 
        ? 'Confirmation email sent! Please check your inbox.'
        : error;

    return (
      <div className={`p-4 rounded-md ${
        messageType === 'error'
          ? theme === 'dark' ? 'bg-red-900/50' : 'bg-red-50'
          : theme === 'dark' ? 'bg-green-900/50' : 'bg-green-50'
      }`}>
        <div className="flex">
          <AlertCircle className={`h-5 w-5 mr-2 flex-shrink-0 ${
            messageType === 'error'
              ? theme === 'dark' ? 'text-red-200' : 'text-red-400'
              : theme === 'dark' ? 'text-green-200' : 'text-green-400'
          }`} />
          <div className="flex-1">
            <p className={`text-sm ${
              messageType === 'error'
                ? theme === 'dark' ? 'text-red-200' : 'text-red-700'
                : theme === 'dark' ? 'text-green-200' : 'text-green-700'
            }`}>
              {message}
            </p>
            {isEmailNotConfirmed && (
              <div className="mt-3">
                <button
                  onClick={handleResendConfirmation}
                  disabled={isResendingEmail}
                  className={`inline-flex items-center text-sm font-medium ${
                    theme === 'dark'
                      ? 'text-red-200 hover:text-red-100'
                      : 'text-red-700 hover:text-red-800'
                  }`}
                >
                  <Mail className="h-4 w-4 mr-1" />
                  {isResendingEmail ? 'Sending...' : 'Resend confirmation email'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div>
          <h2 className={`text-center text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t('common.login')}
          </h2>
          <p className={`mt-2 text-center text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Continue your Georgian language learning journey
          </p>
        </div>
        
        {renderNetworkStatus()}
        {renderErrorMessage()}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none relative block w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500'
                }`}
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded border focus:ring-2 ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 focus:ring-red-500 text-red-600' 
                    : 'bg-white border-gray-300 focus:ring-red-500 text-red-600'
                }`}
              />
              <label htmlFor="remember-me" className={`ml-2 block text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Remember me
              </label>
            </div>

            <button
              type="button"
              onClick={handleResetPassword}
              disabled={isResettingPassword}
              className={`text-sm font-medium hover:underline ${
                theme === 'dark' ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'
              }`}
            >
              {isResettingPassword ? 'Sending reset email...' : 'Forgot password?'}
            </button>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || networkStatus === 'offline'}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white ${
                isLoading || networkStatus === 'offline'
                  ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400')
                  : (theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700')
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' ? 'focus:ring-red-400 focus:ring-offset-gray-900' : 'focus:ring-red-500 focus:ring-offset-white'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn className={`h-5 w-5 ${
                  isLoading || networkStatus === 'offline'
                    ? (theme === 'dark' ? 'text-gray-500' : 'text-gray-300') 
                    : (theme === 'dark' ? 'text-red-400 group-hover:text-red-300' : 'text-red-500 group-hover:text-red-400')
                }`} />
              </span>
              {isLoading ? 'Logging in...' : t('common.login')}
            </button>
          </div>
        </form>

        {/* Retry button for network errors */}
        {(error.includes('network') || error.includes('timed out') || error.includes('Failed to fetch')) && (
          <div className="mt-4 text-center">
            <button
              onClick={handleRetry}
              disabled={isLoading}
              className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                isLoading
                  ? (theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-300 text-gray-600')
                  : (theme === 'dark' ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700')
              }`}
            >
              <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Retrying...' : 'Retry Connection'}
            </button>
            <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              Attempt {retryCount + 1} of {MAX_RETRIES}
            </p>
          </div>
        )}

        <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className={`font-medium hover:underline ${
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`}>
            {t('common.signup')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;