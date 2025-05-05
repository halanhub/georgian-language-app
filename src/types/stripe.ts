export interface PriceOption {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval?: 'month' | 'year' | null;
  features: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  prices: PriceOption[];
}

export interface CheckoutSession {
  id: string;
  url: string;
}

export interface CustomerPortalSession {
  url: string;
}

export interface SubscriptionDetails {
  customer_id: string;
  subscription_id: string | null;
  subscription_status: 'not_started' | 'incomplete' | 'incomplete_expired' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' | 'paused';
  price_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
  cancel_at_period_end: boolean;
  payment_method_brand: string | null;
  payment_method_last4: string | null;
}