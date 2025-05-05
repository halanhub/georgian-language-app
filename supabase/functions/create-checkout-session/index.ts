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
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      console.error("❌ No Authorization header provided");
      return new Response(JSON.stringify({ error: "No authorization header" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const token = authHeader.replace("Bearer ", "");
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    console.log("🔐 Verifying Supabase token...");
    const verifyResponse = await fetch(`${supabaseUrl}/auth/v1/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: supabaseKey,
      },
    });

    if (!verifyResponse.ok) {
      console.error("❌ Invalid Supabase token");
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const user = await verifyResponse.json();
    console.log("👤 Authenticated user:", user);

    const body = await req.json();
    console.log("👉 Incoming request body:", body);

    const { price_id, success_url, cancel_url, mode } = body;

    if (!price_id || !success_url || !cancel_url) {
      console.error("❌ Missing required parameters", { price_id, success_url, cancel_url });
      return new Response(JSON.stringify({ error: "Missing required parameters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const priceIdMap = {
      premium: "price_1RKLGCAZyAKEiVfuqpDnlxcU", // Replace if needed
    };

    const actualPriceId = priceIdMap[price_id] || price_id;

    console.log("📦 Stripe session create payload:", {
      customer_email: user.email,
      client_reference_id: user.id,
      price: actualPriceId,
      success_url,
      cancel_url,
      mode,
    });

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        customer_email: user.email,
        client_reference_id: user.id,
        payment_method_types: ["card"],
        line_items: [
          {
            price: actualPriceId,
            quantity: 1,
          },
        ],
        mode: mode || "subscription",
        success_url,
        cancel_url,
        metadata: {
          user_id: user.id,
        },
      });
    } catch (stripeError) {
      console.error("❌ Stripe API error:", stripeError);
      return new Response(JSON.stringify({ error: stripeError.message || "Stripe error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("✅ Stripe session created:", session.id);

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("🔥 Error creating checkout session:", error.message || error);
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
