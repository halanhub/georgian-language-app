import { supabase } from '../lib/supabase';
import { STRIPE_PRODUCTS } from '../stripe-config';

/**
 * Creates a checkout session for a subscription
 */
export const createCheckoutSession = async (
  productName: 'premium' | 'annual',
  successUrl: string,
  cancelUrl: string
) => {
  try {
    const product = STRIPE_PRODUCTS[productName];
    
    if (!product) {
      throw new Error(`Product ${productName} not found`);
    }

    const { data, error } = await supabase.functions.invoke('stripe-checkout', {
      body: {
        price_id: product.priceId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        mode: product.mode
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
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};