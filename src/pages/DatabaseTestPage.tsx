import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Database, Check, X, RefreshCw, User, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const DatabaseTestPage: React.FC = () => {
  const { theme } = useTheme();
  const { user, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'success' | 'error' | null>(null);
  const [authStatus, setAuthStatus] = useState<'success' | 'error' | null>(null);
  const [dataStatus, setDataStatus] = useState<'success' | 'error' | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<{
    connection: string;
    auth: string;
    data: string;
  }>({
    connection: '',
    auth: '',
    data: '',
  });

  useEffect(() => {
    testDatabaseConnection();
  }, [user]);

  const testDatabaseConnection = async () => {
    setIsLoading(true);
    setConnectionStatus(null);
    setAuthStatus(null);
    setDataStatus(null);
    setErrorMessage(null);
    
    const results = {
      connection: '',
      auth: '',
      data: '',
    };

    try {
      // Test 1: Basic connection
      try {
        const { data, error } = await supabase.from('user_profiles').select('count(*)', { count: 'exact', head: true });
        
        if (error) throw error;
        
        setConnectionStatus('success');
        results.connection = 'Successfully connected to Supabase';
      } catch (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus('error');
        results.connection = `Connection failed: ${error.message || 'Unknown error'}`;
        setErrorMessage(error.message || 'Failed to connect to the database');
        setIsLoading(false);
        setTestResults(results);
        return;
      }

      // Test 2: Authentication
      if (user) {
        try {
          const { data, error } = await supabase
            .from('user_profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (error && error.code !== 'PGRST116') {
            throw error;
          }
          
          setAuthStatus('success');
          results.auth = `Authentication successful. User profile ${data ? 'found' : 'not found but can be created'}.`;
          
          if (isAdmin) {
            results.auth += ' User has admin privileges.';
          }
        } catch (error) {
          console.error('Auth test failed:', error);
          setAuthStatus('error');
          results.auth = `Authentication test failed: ${error.message || 'Unknown error'}`;
        }
      } else {
        setAuthStatus('error');
        results.auth = 'Not authenticated. Please log in to test authentication.';
      }

      // Test 3: Data operations (if authenticated)
      if (user) {
        try {
          // Try to insert a test record
          const testId = `test_${Date.now()}`;
          
          // First, try a read operation
          const { data: readData, error: readError } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', user.id)
            .limit(1);
          
          if (readError) throw readError;
          
          // Then try a write operation (insert and delete)
          const { data: insertData, error: insertError } = await supabase
            .from('user_progress')
            .insert({
              user_id: user.id,
              lesson_id: testId,
              completed: false,
              time_spent: 0
            })
            .select()
            .single();
          
          if (insertError) throw insertError;
          
          // Clean up the test record
          const { error: deleteError } = await supabase
            .from('user_progress')
            .delete()
            .eq('id', insertData.id);
          
          if (deleteError) throw deleteError;
          
          setDataStatus('success');
          results.data = 'Data operations successful. Read, write, and delete operations completed.';
        } catch (error) {
          console.error('Data operations test failed:', error);
          setDataStatus('error');
          results.data = `Data operations test failed: ${error.message || 'Unknown error'}`;
        }
      } else {
        results.data = 'Data operations skipped. Authentication required.';
      }
    } catch (error) {
      console.error('Database test failed:', error);
      setErrorMessage(error.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
      setTestResults(results);
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
                  Database Connection Test
                </h1>
              </div>
              <button
                onClick={testDatabaseConnection}
                disabled={isLoading}
                className={`inline-flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium ${
                  isLoading
                    ? (theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-300 text-gray-500')
                    : (theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-600 text-white hover:bg-blue-700')
                }`}
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <RefreshCw size={16} className="mr-2" />
                    Run Tests
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg mb-8`}>
            <div className="flex items-center mb-6">
              <Database className={`h-8 w-8 mr-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Supabase Connection Status
              </h2>
            </div>

            <div className="space-y-6">
              {/* Connection Test */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Database Connection
                  </h3>
                  <div className={`flex items-center ${
                    isLoading ? 'text-gray-400' :
                    connectionStatus === 'success' ? 'text-green-500' :
                    connectionStatus === 'error' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {isLoading ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : connectionStatus === 'success' ? (
                      <Check size={18} />
                    ) : connectionStatus === 'error' ? (
                      <X size={18} />
                    ) : null}
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isLoading ? 'Testing connection...' : testResults.connection || 'Not tested yet'}
                </p>
              </div>

              {/* Authentication Test */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Authentication
                  </h3>
                  <div className={`flex items-center ${
                    isLoading ? 'text-gray-400' :
                    authStatus === 'success' ? 'text-green-500' :
                    authStatus === 'error' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {isLoading ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : authStatus === 'success' ? (
                      <Check size={18} />
                    ) : authStatus === 'error' ? (
                      <X size={18} />
                    ) : null}
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isLoading ? 'Testing authentication...' : testResults.auth || 'Not tested yet'}
                </p>
                {!user && (
                  <div className="mt-2">
                    <Link
                      to="/login"
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                      }`}
                    >
                      Log in to test authentication
                    </Link>
                  </div>
                )}
              </div>

              {/* Data Operations Test */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Data Operations
                  </h3>
                  <div className={`flex items-center ${
                    isLoading ? 'text-gray-400' :
                    dataStatus === 'success' ? 'text-green-500' :
                    dataStatus === 'error' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {isLoading ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : dataStatus === 'success' ? (
                      <Check size={18} />
                    ) : dataStatus === 'error' ? (
                      <X size={18} />
                    ) : null}
                  </div>
                </div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isLoading ? 'Testing data operations...' : testResults.data || 'Not tested yet'}
                </p>
              </div>
            </div>

            {errorMessage && (
              <div className={`mt-6 p-4 rounded-md ${
                theme === 'dark' ? 'bg-red-900 text-red-100' : 'bg-red-100 text-red-800'
              }`}>
                <h3 className="font-medium mb-2">Error Details</h3>
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </div>

          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h3 className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Connection Information
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Supabase URL
                </h4>
                <div className={`p-3 rounded-md font-mono text-sm ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  {import.meta.env.VITE_SUPABASE_URL || 'Not configured'}
                </div>
              </div>
              
              <div>
                <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Authentication Status
                </h4>
                <div className={`p-3 rounded-md font-mono text-sm ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  {user ? (
                    <div className="flex items-center">
                      <span>Authenticated as: {user.email}</span>
                      {isAdmin && (
                        <span className="ml-2 px-2 py-1 text-xs rounded bg-green-700 text-white flex items-center">
                          <Shield size={12} className="mr-1" /> Admin
                        </span>
                      )}
                    </div>
                  ) : 'Not authenticated'}
                </div>
              </div>
              
              <div>
                <h4 className={`text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Database Schema
                </h4>
                <div className={`p-3 rounded-md font-mono text-sm ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                }`}>
                  <ul className="list-disc list-inside space-y-1">
                    <li>user_profiles</li>
                    <li>user_progress</li>
                    <li>user_achievements</li>
                    <li>stripe_customers</li>
                    <li>stripe_subscriptions</li>
                    <li>stripe_orders</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTestPage;