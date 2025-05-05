import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@13.9.0";
import { corsHeaders, handleCorsPreflightRequest } from "../_shared/cors.ts";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest();
  }

  try {
    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { 
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Get the JWT token from the authorization header
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the JWT token with Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    
    const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseKey,
      },
    });
    
    if (!verifyResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    const user = await verifyResponse.json();
    
    // Get the customer ID for the user
    const { data: customers, error: customerError } = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    if (customerError || !customers || customers.length === 0) {
      return new Response(
        JSON.stringify({ subscription: null }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    const customerId = customers[0].id;
    
    // Get the subscriptions for the customer
    const { data: subscriptions, error: subscriptionError } = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      expand: ['data.default_payment_method', 'data.items.data.price.product'],
      limit: 1,
    });
    
    if (subscriptionError || !subscriptions || subscriptions.length === 0) {
      return new Response(
        JSON.stringify({ subscription: null }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    const subscription = subscriptions[0];
    const priceId = subscription.items.data[0].price.id;
    const productId = subscription.items.data[0].price.product.id;
    
    return new Response(
      JSON.stringify({
        subscription: {
          id: subscription.id,
          status: subscription.status,
          current_period_end: subscription.current_period_end,
          cancel_at_period_end: subscription.cancel_at_period_end,
          price_id: priceId,
          product_id: productId
        }
      }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});