// CORS headers for Supabase Edge Functions
// Configured for https://www.georgianlanguage.online

/**
 * Default CORS headers allowing requests from georgianlanguage.online
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.georgianlanguage.online",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

/**
 * Creates a CORS-enabled response
 * @param body Response body (object or string)
 * @param status HTTP status code
 * @returns Response with CORS headers
 */
export function corsResponse(body: unknown, status = 200): Response {
  return new Response(
    body ? JSON.stringify(body) : null,
    {
      status,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    }
  );
}

/**
 * Handles CORS preflight requests
 * @returns Response for OPTIONS requests
 */
export function handleCorsPreflightRequest(): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

/**
 * Wraps a request handler with CORS support
 * @param handler The request handler function
 * @returns A function that handles the request with CORS support
 */
export function withCors(handler: (req: Request) => Promise<Response>) {
  return async (req: Request): Promise<Response> => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
      return handleCorsPreflightRequest();
    }
    
    try {
      // Process the request with the handler
      return await handler(req);
    } catch (error) {
      // Return a CORS-enabled error response
      console.error("Error processing request:", error);
      return corsResponse(
        { error: error instanceof Error ? error.message : "Unknown error occurred" },
        500
      );
    }
  };
}