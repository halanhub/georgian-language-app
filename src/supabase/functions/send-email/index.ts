import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCorsPreflightRequest } from "../_shared/cors.ts";
import { SMTPClient } from "npm:emailjs@4.0.3";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return handleCorsPreflightRequest();
  }

  try {
    // Get the request body
    const { name, email, subject, message } = await req.json();
    
    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }
    
    // Configure SMTP client
    const client = new SMTPClient({
      user: Deno.env.get("SMTP_USER") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
      host: Deno.env.get("SMTP_HOST") || "",
      port: parseInt(Deno.env.get("SMTP_PORT") || "587"),
      tls: true,
    });
    
    // Send email
    await client.sendAsync({
      text: `
        Name: ${name}
        Email: ${email}
        
        ${message}
      `,
      from: Deno.env.get("SMTP_FROM") || "noreply@georgianlanguage.online",
      to: "contact@georgianlanguage.online",
      subject: `Contact Form: ${subject}`,
    });
    
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});