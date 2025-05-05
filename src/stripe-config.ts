// Stripe product configuration
export const STRIPE_PRODUCTS = {
  premium: {
    priceId: 'price_1RKLGCAZyAKEiVfuqpDnIxcU',
    name: 'Premium',
    description: 'Access to all lessons (Beginner to Advanced), unlimited vocabulary practice, and all quizzes and exercises',
    mode: 'subscription' as const
  },
  annual: {
    priceId: 'price_1RKLQCAZyAKEiVfuQyfLQsTi',
    name: 'Annual',
    description: 'Save 16% with annual billing - access to all premium features',
    mode: 'subscription' as const
  }
};

// Helper function to get product by ID
export const getProductById = (id: string) => {
  return Object.values(STRIPE_PRODUCTS).find(product => product.priceId === id);
};

// Helper function to get product by name
export const getProductByName = (name: string) => {
  return Object.values(STRIPE_PRODUCTS).find(product => 
    product.name.toLowerCase() === name.toLowerCase()
  );
};