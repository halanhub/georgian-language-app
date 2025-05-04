import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';
import SubscriptionBanner from '../SubscriptionBanner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresSubscription = false 
}) => {
  const { user, loading } = useAuth();
  const { hasActiveSubscription, loading: subscriptionLoading } = useSubscription();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading || (requiresSubscription && subscriptionLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!user) {
    console.log('User not authenticated, redirecting to login');
    // Redirect to login but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route requires subscription and user doesn't have one, redirect to pricing
  if (requiresSubscription && !hasActiveSubscription) {
    console.log('Subscription required but not active, redirecting to pricing');
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // If the route requires subscription, show a banner at the top
  if (requiresSubscription) {
    return (
      <>
        <SubscriptionBanner type="full" />
        {children}
      </>
    );
  }

  // User is authenticated and meets all requirements
  return <>{children}</>;
};

export default ProtectedRoute;