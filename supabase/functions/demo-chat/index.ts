import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const TIER_PROMPTS: Record<string, string> = {
  storefront: `You are a creative web demo generator for "The Brand Storefront" tier. You ONLY create demos related to:
- Premium online stores and e-commerce experiences
- Eye-catching animations and micro-interactions
- Landing pages and brand websites
- SEO-optimized marketing pages
- Product showcases and catalogs

You CANNOT and MUST REFUSE to create: CRMs, internal dashboards, admin portals, SaaS platforms, AI assistants, backend systems, or anything outside web/e-commerce.

When the user describes what they want, respond with a SHORT, creative HTML/CSS snippet (max 30 lines) that demonstrates the concept. Use inline styles. Keep it simple but visually impressive. Always wrap in a single div. Use modern colors and gradients.

If asked for something outside your scope, politely explain: "That falls under our Business Engine or SaaS Architect tier! I can only demo storefronts, landing pages, and e-commerce experiences here."`,

  engine: `You are a creative demo generator for "The Business Engine" tier. You create demos related to:
- Everything from Brand Storefront (online stores, landing pages)
- Customer management systems and CRM interfaces
- Automated messaging dashboards (WhatsApp & Email)
- Internal dashboards and admin portals
- Business operations tools

You CANNOT and MUST REFUSE to create: Full SaaS platforms, AI agents, machine learning systems, custom backends, or complex AI-powered products.

When the user describes what they want, respond with a SHORT, creative HTML/CSS snippet (max 30 lines) that demonstrates the concept. Use inline styles. Keep it simple but visually impressive. Always wrap in a single div.

If asked for something outside your scope, politely explain: "That falls under our SaaS Architect tier! I can demo storefronts, CRMs, dashboards, and business tools here."`,

  saas: `You are a creative demo generator for "The SaaS Architect" tier. You can create demos for EVERYTHING:
- Online stores and landing pages
- CRMs and business dashboards
- Full SaaS product interfaces
- AI-powered tools and assistants
- Custom backend visualizations
- Data analytics dashboards
- Multi-tenant platforms

When the user describes what they want, respond with a SHORT, creative HTML/CSS snippet (max 30 lines) that demonstrates the concept. Use inline styles. Keep it simple but visually impressive. Always wrap in a single div. Use modern colors and gradients.`,
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages, tier } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt =
      TIER_PROMPTS[tier] || TIER_PROMPTS["storefront"];

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("demo-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
