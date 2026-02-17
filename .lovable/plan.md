
# Show Only Preview (No Code) in Tier Demo Cards

## What Changes

### 1. Redesign `TierDemoChat.tsx` -- Preview-First Layout
Currently the chat shows raw code text in message bubbles and has a side preview panel. The new layout will:

- Keep the chat input at the bottom (user still types prompts)
- Hide all raw assistant message text -- never show the code to the user
- Show ONLY the rendered iframe preview as the main content area, taking up the full card space
- While loading/streaming, show a centered loading spinner with "Generating your demo..."
- Once HTML is extracted from the AI response, render it full-bleed in the iframe inside the card
- Keep the header with tier name and close button
- Remove the side-by-side split layout entirely -- the preview IS the content

### 2. Update `ServicesSection.tsx` -- Full-Width Card Expansion
When a card is expanded (chat mode), instead of staying in the 3-column grid, the expanded card should:

- Use `layout` + `layoutId` with framer-motion to smoothly animate the card to span all 3 columns (`md:col-span-3`)
- Increase the height to give the preview room (e.g., `h-[520px]`)
- Non-expanded cards stay visible but shrink/fade slightly
- Smooth animation using `AnimatePresence` and `layout` transitions

### Flow
1. User clicks "Prompt a demo with our AI"
2. Card smoothly expands to full width across all 3 columns
3. User sees a clean input bar at the bottom + empty state with sparkle icon
4. User types a prompt (e.g., "A website for a company that sells videogames")
5. Loading spinner appears while AI streams
6. Once HTML is extracted, the iframe preview renders full-bleed inside the card -- no code visible
7. User can type another prompt to regenerate
8. Close button collapses back to normal card

## Technical Details

### `TierDemoChat.tsx`
- Remove the message bubble rendering for assistant messages
- Keep messages state internally for conversation context (sent to AI), but don't render assistant messages
- Show user messages as small chips/pills above the input so user remembers what they asked
- Main area: if `htmlPreview` exists, render full iframe; if loading, show spinner; if empty, show placeholder
- Remove the `md:flex-row` split layout and the conditional preview panel

### `ServicesSection.tsx`
- When `expandedIdx !== null`, the expanded card gets `md:col-span-3` class
- Non-expanded cards get `hidden md:block opacity-30 pointer-events-none` to fade out
- Use `motion.div` `layout` prop for smooth grid reflow animation
- Increase expanded card height from `h-[480px]` to `h-[520px]`
