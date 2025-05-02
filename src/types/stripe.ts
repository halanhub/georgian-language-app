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
  id: string;
  status: string;
  current_period_end: number;
  cancel_at_period_end: boolean;
  price_id: string;
  product_id: string;
}