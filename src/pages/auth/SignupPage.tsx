import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const SignupPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const { signup, user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Validate inputs
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    if (!agreeToTerms) {
      return setError('You must agree to the Terms of Service and Privacy Policy');
    }
    
    setIsLoading(true);
    
    try {
      // Store email in localStorage for the confirmation page
      localStorage.setItem('signupEmail', email);
      
      await signup(email, password, displayName);
      setSuccess(true);
      // Navigate to confirmation page after successful signup
      navigate('/confirmation');
    } catch (err: any) {
      console.error('Signup error:', err);
      
      // Handle different error types
      if (err.message) {
        if (err.message.includes('already registered')) {
          setError('This email is already registered. Please log in instead.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to create an account. Please try again.');
      }
      
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            რეგისტრაცია <span className="mx-2">|</span> Sign Up
          </h2>
          <p className={`mt-2 text-center text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start your Georgian language learning journey
          </p>
        </div>
        
        {error && (
          <div className={`p-3 rounded-md flex items-start ${
            theme === 'dark' ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700'
          }`}>
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
        
        {success && (
          <div className={`p-3 rounded-md ${
            theme === 'dark' ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'
          }`}>
            Account created successfully! Please check your email to verify your account.
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="display-name" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Display Name
              </label>
              <input
                id="display-name"
                name="display-name"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className={`appearance-none relative block w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500'
                }`}
                placeholder="John Doe"
              />
            </div>
            
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
                  autoComplete="new-password"
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
              <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                Password must be at least 6 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`appearance-none relative block w-full px-3 py-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:z-10 sm:text-sm ${
                    theme === 'dark' 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-400 focus:ring-red-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500 focus:ring-red-500'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className={`h-4 w-4 rounded border focus:ring-2 ${
                theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 focus:ring-red-500 text-red-600' 
                  : 'bg-white border-gray-300 focus:ring-red-500 text-red-600'
              }`}
            />
            <label htmlFor="terms" className={`ml-2 block text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              I agree to the{' '}
              <Link to="/terms-of-service" className={`font-medium hover:underline ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className={`font-medium hover:underline ${
                theme === 'dark' ? 'text-red-400' : 'text-red-600'
              }`}>
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading || success}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white ${
                isLoading || success
                  ? (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-400')
                  : (theme === 'dark' ? 'bg-red-700 hover:bg-red-800' : 'bg-red-600 hover:bg-red-700')
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                theme === 'dark' ? 'focus:ring-red-400 focus:ring-offset-gray-900' : 'focus:ring-red-500 focus:ring-offset-white'
              }`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className={`h-5 w-5 ${
                  isLoading || success
                    ? (theme === 'dark' ? 'text-gray-500' : 'text-gray-300') 
                    : (theme === 'dark' ? 'text-red-400 group-hover:text-red-300' : 'text-red-500 group-hover:text-red-400')
                }`} />
              </span>
              {isLoading ? 'Creating Account...' : success ? 'Account Created!' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className={`text-center text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-medium hover:underline ${
            theme === 'dark' ? 'text-red-400' : 'text-red-600'
          }`}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;