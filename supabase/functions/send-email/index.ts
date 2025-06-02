import { Resend } from "npm:resend@1.0.0";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Create a Supabase client to verify the JWT token
const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_ANON_KEY") ?? ""
);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify the JWT token
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("No authorization header");
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error("Invalid authorization token");
    }

    const { type, email, role } = await req.json();

    if (!email) {
      throw new Error("Email is required");
    }

    if (type === "welcome") {
      if (!role) {
        throw new Error("Role is required for welcome email");
      }

      await resend.emails.send({
        from: "ProactiveCare <onboarding@resend.dev>",
        to: email,
        subject: "Welcome to ProactiveCare",
        html: `
          <h1>Welcome to ProactiveCare!</h1>
          <p>Thank you for joining as a ${role}. We're excited to have you on board.</p>
          <p>You can now access the platform to:</p>
          <ul>
            ${role === "carer" ? `
              <li>Monitor patient activities</li>
              <li>Receive real-time alerts</li>
              <li>Track health metrics</li>
            ` : `
              <li>Stay updated on your loved one's well-being</li>
              <li>View activity reports</li>
              <li>Communicate with care providers</li>
            `}
          </ul>
          <p>If you have any questions, please don't hesitate to reach out.</p>
        `
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});