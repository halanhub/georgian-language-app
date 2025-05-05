import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Mail, RefreshCw, AlertCircle } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { supabase } from '../../lib/supabase';

const ConfirmationPage: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [error, setError] = useState('');
  const [confirmationStatus, setConfirmationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const navigate = useNavigate();

  // Get email from localStorage if available
  useEffect(() => {
    const storedEmail = localStorage.getItem('signupEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  // Handle email confirmation from URL token
  useEffect(() => {
    const handleConfirm = async () => {
      try {
        const { data, error } = await supabase.auth.getSession(); // automatically reads token from URL
        
        if (error) {
          console.error('Email confirmation failed:', error.message);
          setConfirmationStatus('error');
          setError(error.message);
        } else if (data.session) {
          console.log('Email confirmed and session started.');
          setConfirmationStatus('success');
          
          // Redirect to home page after successful confirmation
          setTimeout(() => {
            navigate('/');
          }, 2000);
        }
      } catch (err: any) {
        console.error('Error during confirmation:', err);
        setConfirmationStatus('error');
        setError(err.message);
      }
    };

    // Check if we have a hash in the URL (which might contain the token)
    if (window.location.hash) {
      handleConfirm();
    }
  }, [navigate]);

  const handleResendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email address to resend the confirmation.');
      return;
    }

    setIsResending(true);
    setResendSuccess(false);
    setError('');
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/confirmation`
        }
      });
      
      if (error) throw error;
      
      setResendSuccess(true);
    } catch (err: any) {
      setError('Failed to resend confirmation email. Please try again later.');
      console.error('Error resending confirmation:', err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className={`max-w-md w-full space-y-8 p-8 rounded-lg shadow-lg ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
          }`}>
            {confirmationStatus === 'success' ? (
              <CheckCircle className={`h-10 w-10 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            ) : confirmationStatus === 'error' ? (
              <AlertCircle className={`h-10 w-10 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`} />
            ) : (
              <Mail className={`h-10 w-10 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
            )}
          </div>
          
          <h2 className={`mt-6 text-center text-3xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {confirmationStatus === 'success' 
              ? 'Email Verified Successfully!' 
              : confirmationStatus === 'error'
                ? 'Verification Failed'
                : t('confirmation.title')}
          </h2>
          
          <p className={`mt-4 text-center ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {confirmationStatus === 'success'
              ? 'Your account has been activated. You will be redirected to the home page shortly.'
              : confirmationStatus === 'error'
                ? 'There was a problem verifying your email. Please try again or request a new verification link.'
                : t('confirmation.subtitle')}
          </p>
        </div>
        
        {confirmationStatus === 'pending' && (
          <div className={`mt-8 p-6 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-start mb-4">
              <Mail className={`flex-shrink-0 h-6 w-6 mr-3 ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <div>
                <h3 className={`text-lg font-medium ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Check your inbox
                </h3>
                <p className={`mt-1 text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  We've sent a confirmation email to {email || 'your email address'}. Click the link in the email to verify your account.
                </p>
                <p className={`mt-2 text-sm font-medium ${
                  theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
                }`}>
                  Please check your spam/junk folder if you don't see the email in your inbox.
                </p>
              </div>
            </div>
            
            {!email && (
              <div className="mb-4">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  Your Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white focus:border-blue-500 focus:ring-blue-500'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  } sm:text-sm`}
                  placeholder="Enter your email"
                />
              </div>
            )}
            
            {error && (
              <div className={`p-3 rounded-md mb-4 ${
                theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'
              }`}>
                {error}
              </div>
            )}
            
            {resendSuccess && (
              <div className={`p-3 rounded-md mb-4 ${
                theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'
              }`}>
                Confirmation email resent successfully! Please check your inbox and spam folder.
              </div>
            )}
            
            <button
              onClick={handleResendConfirmation}
              disabled={isResending}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ${
                isResending
                  ? (theme === 'dark' ? 'bg-gray-600 text-gray-300' : 'bg-gray-300 text-gray-500')
                  : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {isResending ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4 mr-2" />
                  Resending...
                </>
              ) : (
                'Resend Confirmation Email'
              )}
            </button>
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <Link 
            to="/login"
            className={`flex justify-center items-center py-3 px-4 border border-transparent rounded-md text-sm font-medium ${
              theme === 'dark' ? 'bg-red-700 hover:bg-red-800 text-white' : 'bg-red-600 hover:bg-red-700 text-white'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === 'dark' ? 'focus:ring-red-400 focus:ring-offset-gray-900' : 'focus:ring-red-500 focus:ring-offset-white'
            }`}
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            {t('confirmation.login')}
          </Link>
          
          <Link 
            to="/"
            className={`flex justify-center items-center py-3 px-4 rounded-md text-sm font-medium ${
              theme === 'dark' 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            Return to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;