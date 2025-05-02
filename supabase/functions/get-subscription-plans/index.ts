import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@13.9.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Define the subscription plans with their features
const subscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    description: "Essential Georgian language learning tools",
    prices: [],
    features: [
      "Access to all beginner lessons",
      "Basic vocabulary practice",
      "Limited quizzes",
      "Progress tracking"
    ]
  },
  {
    id: "premium",
    name: "Premium",
    description: "Complete Georgian language learning experience",
    prices: [],
    features: [
      "Access to all lessons (Beginner to Advanced)",
      "Unlimited vocabulary practice",
      "All quizzes and exercises",
      "Advanced progress tracking",
      "Downloadable learning materials",
      "Priority support"
    ]
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Fetch all active products
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price']
    });
    
    // Fetch all prices
    const prices = await stripe.prices.list({
      active: true,
      expand: ['data.product']
    });
    
    // Map products to subscription plans
    const plans = subscriptionPlans.map(plan => {
      // Find the product that matches this plan
      const product = products.data.find(p => 
        p.metadata.plan_id === plan.id
      );
      
      if (!product) {
        return plan;
      }
      
      // Find all prices for this product
      const productPrices = prices.data.filter(price => 
        price.product === product.id
      );
      
      // Map prices to price options
      const priceOptions = productPrices.map(price => ({
        id: price.id,
        name: product.name,
        description: product.description || '',
        price: price.unit_amount ? price.unit_amount / 100 : 0,
        currency: price.currency,
        interval: price.type === 'recurring' ? price.recurring?.interval : null,
        features: product.features?.map(f => f.name) || []
      }));
      
      return {
        ...plan,
        prices: priceOptions
      };
    });
    
    return new Response(
      JSON.stringify(plans),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});