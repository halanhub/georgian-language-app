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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Get the request body
    let requestData;
    try {
      requestData = await req.json();
    } catch (error) {
      console.error("Error parsing request body:", error);
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { price_id, success_url, cancel_url, mode } = requestData;
    
    if (!price_id || !success_url || !cancel_url) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Get the authorization header from the request
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error("No authorization header provided");
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
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Supabase URL or key not configured");
      return new Response(
        JSON.stringify({ error: 'Service configuration error' }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    console.log("Verifying user token...");
    const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseKey,
      },
    });
    
    if (!verifyResponse.ok) {
      console.error("Token verification failed:", await verifyResponse.text());
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { 
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    const user = await verifyResponse.json();
    console.log("User verified:", user.id);
    
    // Check if user already has a Stripe customer
    console.log("Checking for existing Stripe customer...");
    const { data: customers, error: customerError } = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });
    
    let customerId;
    
    if (customerError) {
      console.error("Error fetching Stripe customers:", customerError);
      return new Response(
        JSON.stringify({ error: 'Error fetching customer information' }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    if (customers && customers.data.length > 0) {
      // Use existing customer
      customerId = customers.data[0].id;
      console.log("Using existing Stripe customer:", customerId);
    } else {
      // Create new customer
      try {
        console.log("Creating new Stripe customer for:", user.email);
        const newCustomer = await stripe.customers.create({
          email: user.email,
          metadata: {
            user_id: user.id,
          },
        });
        customerId = newCustomer.id;
        console.log("Created new Stripe customer:", customerId);
        
        // Store customer in database
        const customerResponse = await fetch(`${supabaseUrl}/rest/v1/stripe_customers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            user_id: user.id,
            customer_id: customerId,
          })
        });
        
        if (!customerResponse.ok) {
          console.error("Error storing customer in database:", await customerResponse.text());
          // Continue anyway, as we have the Stripe customer created
        }
      } catch (error) {
        console.error("Error creating Stripe customer:", error);
        return new Response(
          JSON.stringify({ error: 'Failed to create customer' }),
          { 
            status: 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
    }
    
    // Create a checkout session
    console.log("Creating checkout session with price:", price_id);
    try {
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: price_id,
            quantity: 1,
          },
        ],
        mode: mode || 'subscription',
        success_url: success_url,
        cancel_url: cancel_url,
        metadata: {
          user_id: user.id,
        },
      });
      
      console.log("Checkout session created:", session.id);
      
      return new Response(
        JSON.stringify({ id: session.id, url: session.url }),
        { 
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      return new Response(
        JSON.stringify({ error: error.message }),
        { 
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});