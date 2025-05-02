// Follow this setup guide to integrate the Deno runtime into your application:
// https://deno.land/manual/examples/deploy_node_npm

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "npm:openai@4.28.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

// Simple in-memory rate limiter
// This will reset when the function is redeployed
const rateLimiter = {
  // Store IP addresses and their request timestamps
  requests: new Map<string, number[]>(),
  
  // Maximum requests per minute per IP
  maxRequestsPerMinute: 5,
  
  // Check if an IP has exceeded the rate limit
  isRateLimited(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    
    // Get existing requests or initialize empty array
    const requests = this.requests.get(ip) || [];
    
    // Filter out requests older than the window
    const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);
    
    // Update the requests for this IP
    this.requests.set(ip, recentRequests);
    
    // Check if the number of recent requests exceeds the limit
    return recentRequests.length >= this.maxRequestsPerMinute;
  },
  
  // Add a request for an IP
  addRequest(ip: string): void {
    const now = Date.now();
    const requests = this.requests.get(ip) || [];
    requests.push(now);
    this.requests.set(ip, requests);
  },
  
  // Get remaining requests for an IP
  getRemainingRequests(ip: string): number {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute window
    
    const requests = this.requests.get(ip) || [];
    const recentRequests = requests.filter(timestamp => now - timestamp < windowMs);
    
    return Math.max(0, this.maxRequestsPerMinute - recentRequests.length);
  }
};

// Backoff strategy for OpenAI API calls
const backoff = {
  // Maximum number of retries
  maxRetries: 3,
  
  // Initial delay in milliseconds
  initialDelay: 1000,
  
  // Calculate delay for a given retry attempt
  getDelay(attempt: number): number {
    // Exponential backoff: initialDelay * 2^attempt
    return this.initialDelay * Math.pow(2, attempt);
  }
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
    // Get client IP for rate limiting
    const clientIp = req.headers.get("x-forwarded-for") || "unknown-ip";
    
    // Check rate limit
    if (rateLimiter.isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded. Please try again later.",
          remainingRequests: 0,
          resetInSeconds: 60
        }),
        {
          status: 429,
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json",
            "Retry-After": "60"
          },
        }
      );
    }

    // Get the request body
    let requestBody;
    try {
      requestBody = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { messages } = requestBody;

    // Validate input
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request. Messages array is required." }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get the API key from environment variables
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      console.error("OpenAI API key not configured");
      return new Response(
        JSON.stringify({ 
          error: "Service configuration error. Please try again later.",
          details: "OpenAI API key not configured"
        }),
        {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Add this request to the rate limiter
    rateLimiter.addRequest(clientIp);

    // Initialize OpenAI client
    const openai = new OpenAI({
      apiKey: apiKey,
    });

    // Add system message to guide the assistant's behavior
    const systemMessage = {
      role: "system",
      content: "You are a helpful Georgian language learning assistant. Provide concise, accurate information about the Georgian language, culture, and help with translations. When appropriate, include both Georgian script and Latin transliteration."
    };

    const allMessages = [systemMessage, ...messages];

    // Implement retry logic with exponential backoff
    let lastError = null;
    let response = null;
    
    for (let attempt = 0; attempt < backoff.maxRetries; attempt++) {
      try {
        // Call the OpenAI API
        const completion = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: allMessages,
          temperature: 0.7,
          max_tokens: 500,
        });
        
        // If successful, set response and break the loop
        response = completion.choices[0].message.content;
        break;
      } catch (error) {
        console.error(`OpenAI API error (attempt ${attempt + 1}):`, error);
        lastError = error;
        
        // Check if the error is related to rate limits or quotas
        if (error.status === 429 || (error.message && error.message.includes("quota"))) {
          // If this is the last retry, throw the error
          if (attempt === backoff.maxRetries - 1) {
            throw error;
          }
          
          // Otherwise, wait and retry
          const delay = backoff.getDelay(attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
        
        // For other errors, don't retry
        throw error;
      }
    }
    
    // If we exhausted all retries and still have an error
    if (!response && lastError) {
      throw lastError;
    }

    // Return the successful response
    return new Response(
      JSON.stringify({
        message: response,
        rateLimit: {
          remaining: rateLimiter.getRemainingRequests(clientIp),
          resetInSeconds: 60
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in chat-assistant function:", error);
    
    // Check if the error is related to OpenAI API quota
    const isQuotaError = error.status === 429 || (error.message && (
      error.message.includes("quota") || 
      error.message.includes("rate limit") || 
      error.message.includes("capacity")
    ));
    
    // Check for authentication errors
    const isAuthError = error.status === 401 || (error.message && 
      error.message.includes("authentication"));
    
    let statusCode = 500;
    let errorMessage = "Internal server error. Please try again later.";
    let additionalHeaders = {};

    if (isQuotaError) {
      statusCode = 429;
      errorMessage = "OpenAI API quota exceeded. Please try again later.";
      additionalHeaders = { "Retry-After": "300" };
    } else if (isAuthError) {
      statusCode = 503;
      errorMessage = "Service configuration error. Please try again later.";
    }
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message
      }),
      {
        status: statusCode,
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json",
          ...additionalHeaders
        },
      }
    );
  }
});