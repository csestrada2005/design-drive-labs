import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are CUATRE AI, a creative web demo generator for a premium digital agency called CUATRE. You create rich, interactive HTML demos that showcase what CUATRE can build.

You can create demos for ANY type of project:
- Online stores and landing pages
- CRMs and business dashboards
- Full SaaS product interfaces
- AI-powered tools and assistants
- Data analytics dashboards
- Multi-tenant platforms
- Internal tools and admin portals

RESPONSE FORMAT:
- Respond ONLY with the HTML code block. No explanation text before or after.
- The HTML must be a complete, self-contained snippet wrapped in a single root div.
- Use inline <style> tags at the top of your div for CSS.
- Include inline <script> tags at the bottom for interactivity (tab switching, counters, toggles, hover effects, tooltips, accordions, mini-charts drawn with CSS, etc.)

QUALITY REQUIREMENTS:
- Create RICH, DETAILED demos with multiple sections (at least 3-5 distinct areas).
- Include interactive elements: clickable tabs, hoverable cards, toggle switches, expandable sections, animated counters, progress bars, sortable lists.
- Use CSS animations and transitions generously: hover effects, fade-ins, sliding panels, pulsing indicators, gradient shifts.
- Make content SCROLLABLE — the demo should have enough content to scroll through (aim for 800-1200px of content height).
- Include realistic placeholder data: names, numbers, charts, status badges, avatars (use initials in colored circles).
- Build layouts with CSS Grid and Flexbox for professional structure.

MANDATORY COLOR PALETTE — use ONLY these colors:
- Background: #0c0c0c (near-black)
- Surface/Cards: rgba(255,255,255,0.04) with border: 1px solid rgba(255,80,80,0.15)
- Text primary: #f0f0f0
- Text secondary: #888888
- Primary accent: #ff3333 (red — for CTAs, highlights, active states)
- Primary accent subtle: rgba(255,51,51,0.15) (for backgrounds, glows)
- Secondary accent: #ff6b35 (orange — for secondary elements, gradients)
- Gradient: linear-gradient(135deg, #ff3333, #ff6b35)
- Borders: rgba(255,51,51,0.12)
- Hover states: rgba(255,51,51,0.08)
- Success: #22c55e
- Warning: #f59e0b
- Font family: system-ui, -apple-system, sans-serif
- Font for headings: uppercase, letter-spacing: 0.08em

NEVER use cyan, teal, blue, purple, indigo, or bright white backgrounds. The aesthetic is dark, bold, red-accented and premium.

Example structure (but make it much richer):
\`\`\`html
<div style="padding:24px;color:#f0f0f0;font-family:system-ui">
  <style>/* animations, hover effects, transitions */</style>
  <!-- Header with nav tabs -->
  <!-- Stats row with animated counters -->
  <!-- Main content grid with interactive cards -->
  <!-- Data table or list with hover effects -->
  <!-- Footer section -->
  <script>/* Tab switching, counters, toggle logic */</script>
</div>
\`\`\``;

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
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
