import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export interface SubscriptionDetails {
  subscription_id: string | null;
  subscription_status: string;
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setHasActiveSubscription(false);
        setSubscriptionDetails(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Query the secure view that joins customers and subscriptions
        const { data, error: fetchError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (data) {
          // Check if subscription is active
          const isActive = data.subscription_status === 'active' || 
                          data.subscription_status === 'trialing';
          
          setHasActiveSubscription(isActive);
          setSubscriptionDetails(data);
        } else {
          setHasActiveSubscription(false);
          setSubscriptionDetails(null);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch subscription'));
        setHasActiveSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user]);

  return { hasActiveSubscription, subscriptionDetails, loading, error };
}