import { loadStripe } from '@stripe/stripe-js';
import { supabase } from './supabase';
import type { CheckoutSession, CustomerPortalSession, SubscriptionDetails } from '../types/stripe';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const getStripe = () => {
  return stripePromise;
};

// Create a checkout session
export const createCheckoutSession = async (
  productName: 'premium' | 'annual', 
  successUrl: string, 
  cancelUrl: string
): Promise<CheckoutSession> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: { 
        price_id: productName === 'premium' ? 'price_1RKLOQPJT7FVTkW5ZFAsbRrH' : 'price_1RKLOqPJT7FVTkW5ZFAsbRrH', 
        success_url: successUrl, 
        cancel_url: cancelUrl,
        mode: 'subscription'
      }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Create a customer portal session
export const createCustomerPortalSession = async (
  returnUrl: string
): Promise<CustomerPortalSession> => {
  try {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: { returnUrl }
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
};

// Get user subscription
export const getUserSubscription = async (): Promise<{ subscription: SubscriptionDetails | null }> => {
  try {
    const { data, error } = await supabase.functions.invoke('get-user-subscription');

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    throw error;
  }
};