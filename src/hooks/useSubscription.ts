import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import type { SubscriptionDetails } from '../types/stripe';

export function useSubscription() {
  const { user, isAdmin } = useAuth();
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState<SubscriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastChecked, setLastChecked] = useState<number>(0);

  useEffect(() => {
    const fetchSubscription = async () => {
      if (!user) {
        setHasActiveSubscription(false);
        setSubscriptionDetails(null);
        setLoading(false);
        return;
      }

      // Don't check more than once every 30 seconds
      const now = Date.now();
      if (lastChecked > 0 && now - lastChecked < 30000) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // If user is admin, they have access to everything
        if (isAdmin) {
          setHasActiveSubscription(true);
          setSubscriptionDetails(null);
          setLoading(false);
          setLastChecked(now);
          return;
        }
        
        // Query the secure view that joins customers and subscriptions
        const { data, error: fetchError } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();

        if (fetchError) {
          console.error('Error fetching subscription:', fetchError);
          throw fetchError;
        }

        if (data) {
          // Check if subscription is active
          const isActive = data.subscription_status === 'active' || 
                          data.subscription_status === 'trialing';
          
          setHasActiveSubscription(isActive);
          setSubscriptionDetails(data);
          
          console.log('Subscription data loaded:', {
            isActive,
            status: data.subscription_status,
            priceId: data.price_id
          });
        } else {
          setHasActiveSubscription(false);
          setSubscriptionDetails(null);
          console.log('No subscription found for user');
        }

        setLastChecked(now);
      } catch (err) {
        console.error('Error fetching subscription:', err);
        setError(err instanceof Error ? err : new Error('Failed to fetch subscription'));
        setHasActiveSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, [user, isAdmin, lastChecked]);

  return { hasActiveSubscription, subscriptionDetails, loading, error };
}