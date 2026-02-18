import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PROJECTS = [
  {
    id: "papachoa",
    prompts: [
      "Modern website homepage for 'Papachoa' outdoor adventure brand. Hero section with dramatic mountain landscape, bold white typography, dark overlay. Full browser screenshot mockup, 16:9 ratio, ultra minimal design.",
      "Papachoa adventure brand website about page. Team photos in black and white, clean minimal layout, whitespace, editorial typography. Browser screenshot mockup.",
      "Papachoa services page showing trekking packages. Card grid layout, muted earth tones, professional photography placeholders. Minimal website screenshot.",
      "Papachoa contact/booking page. Clean form design, map integration, dark sidebar, premium minimal aesthetic. Website screenshot.",
      "Papachoa gallery page. Masonry photo grid, dark background, white minimal navigation. Premium outdoor photography website screenshot.",
    ],
  },
  {
    id: "pawnshop",
    prompts: [
      "E-commerce website for a premium pawn shop. Dark moody homepage, gold accents, product hero with jewelry/watches. Sleek modern storefront screenshot.",
      "Pawn shop product listing page. Clean grid of luxury items, minimal dark theme, subtle gold highlights. E-commerce website screenshot.",
      "Pawn shop product detail page. Large product photo, trust badges, buy/sell CTA buttons, dark elegant design. E-commerce screenshot.",
      "Pawn shop sell/appraisal form page. Clean multi-step form, camera icon, professional minimal dark design. Website screenshot.",
      "Pawn shop about/trust page. Store photos, testimonials, dark premium layout, gold typography accents. Website screenshot.",
    ],
  },
  {
    id: "jewelry",
    prompts: [
      "Luxury jewelry e-commerce homepage. Elegant black background, gold typography, ring/necklace hero product photo, ultra premium aesthetic. Website screenshot.",
      "Jewelry catalog collection page. Minimal white/cream background, product grid, delicate sans-serif typography, lots of whitespace. Screenshot.",
      "Jewelry product detail page. Single product close-up, gold/cream palette, size guide, add to cart. Luxury e-commerce screenshot.",
      "Jewelry brand story/lookbook page. Editorial full-bleed photography, minimal text overlay, fashion magazine aesthetic. Website screenshot.",
      "Jewelry checkout/cart page. Minimal cream white design, order summary, premium UX feel. E-commerce website screenshot.",
    ],
  },
  {
    id: "rawpaw",
    prompts: [
      "D2C pet food brand 'Raw Paw' website homepage. Clean white background, playful yet premium, dog photo hero, bold green accents. Brand website screenshot.",
      "Raw Paw product page showing raw dog food packages. Vibrant product photography on white, ingredient badges, clean layout. E-commerce screenshot.",
      "Raw Paw subscription plan page. Pricing tiers, dog illustrations, green/white palette, friendly minimal design. Website screenshot.",
      "Raw Paw about/mission page. Brand story, founder photo, nature imagery, clean editorial layout. Website screenshot.",
      "Raw Paw blog/recipes page. Article grid, clean typography, food photography, wellness brand aesthetic. Website screenshot.",
    ],
  },
  {
    id: "system",
    prompts: [
      "Custom CRM dashboard interface. Dark mode, data tables, sidebar navigation, charts and KPI cards. Internal business system screenshot.",
      "Business automation portal. Workflow builder interface, node-based diagram, dark UI, minimal tech aesthetic. Dashboard screenshot.",
      "Internal reporting dashboard. Line charts, bar graphs, data tables, dark sidebar, professional business system UI. Screenshot.",
      "Customer management system. Contact list, search filters, profile cards, dark minimal UI, CRM interface screenshot.",
      "Automation settings/configuration panel. Toggle switches, form fields, dark premium UI, technical dashboard interface screenshot.",
    ],
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { projectId } = await req.json().catch(() => ({ projectId: null }));

    // Filter to specific project or generate all
    const projectsToGenerate = projectId
      ? PROJECTS.filter((p) => p.id === projectId)
      : PROJECTS;

    const results: Record<string, string[]> = {};

    for (const project of projectsToGenerate) {
      console.log(`Generating images for: ${project.id}`);
      const urls: string[] = [];

      for (let i = 0; i < project.prompts.length; i++) {
        const prompt = project.prompts[i];
        console.log(`  Image ${i + 1}/5: ${prompt.slice(0, 60)}...`);

        try {
          // Check if already exists
          const filePath = `${project.id}/${i + 1}.png`;
          const { data: existing } = await supabase.storage
            .from("project-mockups")
            .getPublicUrl(filePath);

          // Try to HEAD the existing file
          const headRes = await fetch(existing.publicUrl, { method: "HEAD" });
          if (headRes.ok) {
            console.log(`  Skipping (already exists): ${filePath}`);
            urls.push(existing.publicUrl);
            continue;
          }
        } catch (_) {
          // Continue to generate
        }

        // Generate image via Lovable AI
        const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-image",
            messages: [{ role: "user", content: prompt }],
            modalities: ["image", "text"],
          }),
        });

        if (!aiRes.ok) {
          console.error(`AI error for ${project.id}[${i}]: ${aiRes.status}`);
          urls.push("");
          continue;
        }

        const aiData = await aiRes.json();
        const imageData = aiData.choices?.[0]?.message?.images?.[0]?.image_url?.url;

        if (!imageData) {
          console.error(`No image in response for ${project.id}[${i}]`);
          urls.push("");
          continue;
        }

        // Convert base64 to bytes
        const base64 = imageData.replace(/^data:image\/\w+;base64,/, "");
        const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));

        // Upload to storage
        const filePath = `${project.id}/${i + 1}.png`;
        const { error: uploadError } = await supabase.storage
          .from("project-mockups")
          .upload(filePath, bytes, {
            contentType: "image/png",
            upsert: true,
          });

        if (uploadError) {
          console.error(`Upload error: ${uploadError.message}`);
          urls.push("");
          continue;
        }

        const { data: publicData } = supabase.storage
          .from("project-mockups")
          .getPublicUrl(filePath);

        urls.push(publicData.publicUrl);
        console.log(`  ✓ Uploaded: ${filePath}`);

        // Small delay to avoid rate limiting
        await new Promise((r) => setTimeout(r, 1500));
      }

      results[project.id] = urls;
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
