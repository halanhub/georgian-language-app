import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user type
export type User = {
  id: string;
  email: string;
  displayName?: string;
};

// Define auth context type
type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would make a request to a server
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (simplified for demo)
      if (!email || !password) {
        throw new Error('Please provide email and password');
      }
      
      // Create mock user
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        displayName: email.split('@')[0],
      };
      
      // Save user to localStorage and state
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock signup function
  const signup = async (email: string, password: string, displayName: string) => {
    try {
      setLoading(true);
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate input
      if (!email || !password || !displayName) {
        throw new Error('Please provide all required fields');
      }
      
      // Create mock user
      const newUser = {
        id: 'user-' + Date.now(),
        email,
        displayName,
      };
      
      // Save user to localStorage and state
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Mock logout function
  const logout = async () => {
    setLoading(true);
    // Mock API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};