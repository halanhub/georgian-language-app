import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import Stripe from "npm:stripe@13.9.0";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
  apiVersion: "2023-10-16",
});

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

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
    // Get the signature from the headers
    const signature = req.headers.get('stripe-signature');
    if (!signature) {
      return new Response(
        JSON.stringify({ error: 'No signature header' }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Get the webhook secret from environment variables
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      return new Response(
        JSON.stringify({ error: 'Webhook secret not configured' }),
        { 
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Get the request body
    const body = await req.text();
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        
        // Get the user ID from the metadata
        const userId = session.metadata?.user_id || session.client_reference_id;
        
        if (!userId) {
          console.error('No user ID found in session metadata or client reference ID');
          break;
        }
        
        // Update the user's subscription status in the database
        const response = await fetch(`${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            subscription_status: 'active',
            subscription_id: session.subscription,
            updated_at: new Date().toISOString()
          })
        });
        
        if (!response.ok) {
          console.error('Error updating user subscription status:', await response.text());
        }
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        
        // Get the customer ID
        const customerId = subscription.customer;
        
        // Get the customer
        const customer = await stripe.customers.retrieve(customerId);
        
        if (!customer || customer.deleted) {
          console.error('Customer not found or deleted');
          break;
        }
        
        // Find the user with this email
        const response = await fetch(`${supabaseUrl}/rest/v1/user_profiles?select=id&email=eq.${customer.email}`, {
          headers: {
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        if (!response.ok) {
          console.error('Error finding user:', await response.text());
          break;
        }
        
        const users = await response.json();
        
        if (!users || users.length === 0) {
          console.error('No user found with email:', customer.email);
          break;
        }
        
        const userId = users[0].id;
        
        // Update the user's subscription status
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            subscription_status: subscription.status,
            subscription_id: subscription.id,
            updated_at: new Date().toISOString()
          })
        });
        
        if (!updateResponse.ok) {
          console.error('Error updating user subscription status:', await updateResponse.text());
        }
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        
        // Get the customer ID
        const customerId = subscription.customer;
        
        // Get the customer
        const customer = await stripe.customers.retrieve(customerId);
        
        if (!customer || customer.deleted) {
          console.error('Customer not found or deleted');
          break;
        }
        
        // Find the user with this email
        const response = await fetch(`${supabaseUrl}/rest/v1/user_profiles?select=id&email=eq.${customer.email}`, {
          headers: {
            'Authorization': `Bearer ${supabaseKey}`
          }
        });
        
        if (!response.ok) {
          console.error('Error finding user:', await response.text());
          break;
        }
        
        const users = await response.json();
        
        if (!users || users.length === 0) {
          console.error('No user found with email:', customer.email);
          break;
        }
        
        const userId = users[0].id;
        
        // Update the user's subscription status
        const updateResponse = await fetch(`${supabaseUrl}/rest/v1/user_profiles?id=eq.${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseKey}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            subscription_status: 'inactive',
            subscription_id: null,
            updated_at: new Date().toISOString()
          })
        });
        
        if (!updateResponse.ok) {
          console.error('Error updating user subscription status:', await updateResponse.text());
        }
        
        break;
      }
      
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error handling webhook:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
});