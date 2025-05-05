// Stripe product configuration
export const STRIPE_PRODUCTS = {
  premium: {
    price_id: 'price_1RKLGCAZyAKEiVfuqpDnIxcU', // ✅ snake_case
    name: 'Premium',
    description: 'Access to all lessons (Beginner to Advanced), unlimited vocabulary practice, and all quizzes and exercises',
    mode: 'subscription' as const
  },
  annual: {
    price_id: 'price_1RKLQCAZyAKEiVfuQyfLQsTi', // ✅ snake_case
    name: 'Annual',
    description: 'Save 16% with annual billing - access to all premium features',
    mode: 'subscription' as const
  }
};

// Helper function to get product by ID
export const getProductById = (id: string) => {
  return Object.values(STRIPE_PRODUCTS).find(product => product.price_id === id);
};

// Helper function to get product by name
export const getProductByName = (name: string) => {
  return Object.values(STRIPE_PRODUCTS).find(product => 
    product.name.toLowerCase() === name.toLowerCase()
  );
};
