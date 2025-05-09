import { supabase } from '../lib/supabase';
import type { CheckoutSession, CustomerPortalSession, SubscriptionDetails } from '../types/stripe';

/**
 * Creates a checkout session for a subscription
 */
export const createCheckoutSession = async (
  productName: 'premium' | 'annual',
  successUrl: string,
  cancelUrl: string
) => {
  try {
    // Map product names to price IDs
    const priceIds = {
      premium: 'price_1RKLGCAZyAKEiVfuqpDnIxcU',
      annual: 'price_1RKLGCAZyAKEiVfuqpDnIxcU'
    };
    
    const priceId = priceIds[productName];
    
    if (!priceId) {
      throw new Error(`Invalid product name: ${productName}`);
    }

    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: 'subscription'
      }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Creates a customer portal session for managing subscriptions
 */
export const createCustomerPortalSession = async (returnUrl: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('create-portal-session', {
      body: { returnUrl }
    });

    if (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

/**
 * Gets the user's subscription details
 */
export const getUserSubscription = async () => {
  try {
    const { data, error } = await supabase
      .from('stripe_user_subscriptions')
      .select('*')
      .maybeSingle();

    if (error) {
      console.error('Error fetching subscription:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    throw error;
  }
};

/**
 * Gets the user's order history
 */
export const getUserOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('stripe_user_orders')
      .select('*')
      .order('order_date', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};