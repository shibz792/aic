---
name: web-design-aesthetic
description: Use when designing, redesigning, or auditing a full website or marketing page for visual quality. Provides a premium-vs-template design rubric, a checklist of "AI-generated template" tells to avoid, and a scoring method for rating a site's design maturity. Trigger on requests like "make this look premium," "audit the design," "this looks cheap/generic," or before shipping any new page/section design.
---

# Web Design Aesthetic — Premium vs. Template

Most functional websites plateau at "competent template" and never cross into
"this was art-directed by someone with a point of view." The gap is not
effort, it's a small number of default choices repeated everywhere. This
skill names those defaults so they can be caught and deliberately replaced.

## The core principle

**A template applies one recipe uniformly. A premium site varies the
recipe on purpose, and the variation is legible as intent.**

If every section is `eyebrow → h2 → p → grid of identical cards`, if every
card is `icon-in-circle → title → paragraph → same radius → same shadow`,
if every button is the same pill with the same gradient — the page reads
as one component stamped N times, regardless of how polished that one
component is. Premium reads as a sequence of considered decisions: this
section breaks the grid because the content demands it, this button is
solid because it's the one action that matters, this heading is huge
because it's the thesis statement.

## Checklist: signs of an AI-generated / template site

Watch for these clustering together — one or two is a style choice, four
or more is a template:

- **Purple-to-blue (or teal-to-violet) gradient** used as the hero
  background, the primary button, and the CTA panel — the same gradient
  doing every job on the page.
- **Space Grotesk / Inter / Poppins** as the default "safe" font pairing,
  used with no real type-scale contrast between display and body.
- **`border-radius: 999px` on everything** — every button, badge, and
  chip is a pill. No sharp edges anywhere to create contrast.
- **Accent bar or rail on rounded cards** — a 3-4px gradient strip on top
  of every card, applied uniformly regardless of what the card contains.
- **Numbered markers (01/02/03)** on content that isn't actually
  sequential — three "pillars" or "values" dressed up as a process.
- **Icon-in-a-tinted-circle**, same size, same stroke width, repeated
  dozens of times down the page — feature grids that are visually
  identical to every other SaaS feature grid.
- **One shadow recipe for everything** — cards, buttons, and modals all
  share the exact same soft colored shadow regardless of elevation.
- **Circular photo collage hero** (one big circle + 2-3 smaller overlapping
  circles of stock/generated photos) — a very recognizable
  website-builder / stock-template hero motif.
- **Every section centered**, or every section the same
  `left-copy / right-visual` split, with zero structural variation
  between sections or between pages.
- **Alternating only two background tones** (white / off-white) with no
  full-bleed moment, no break in rhythm, nothing that surprises the eye
  on the way down the page.
- **Identical page shell across every route** — same hero shape, same
  section cadence, just different words. Reads as one template
  instantiated four times.

None of these are wrong in isolation — gradients, pills, and icon grids
are all legitimate tools. The tell is *uniform, unvaried application*:
using the one recipe everywhere because it's safe, not because each
instance earned that treatment.

## What actually reads as premium

**Typography does the work of hierarchy, not just size.** A premium page
pairs a characterful display face with a quieter body face, and creates
contrast through weight, width, and color — not just bumping font-size.
If every heading level is the same font at a different size, the page
has no typographic voice.

**Color is restrained and specific.** One considered accent, used where
it earns attention (one CTA, one highlight), not smeared across every
button and border. Neutrals are chosen with a slight hue bias toward the
palette, not default grays.

**Layout varies with intent.** Not every section is a centered grid of
equal cards. Some content wants an asymmetric split, an overlapping
image, a full-bleed break, a single oversized statement. The rhythm of
the page (tight → spacious → dense → airy) should feel composed, not
metronomic.

**Depth is tuned per element, not copy-pasted.** A resting card, a
hovered card, a modal, and a primary button all sit at different
elevations and should not share one identical shadow value.

**Motion is an accent, not a default.** One or two orchestrated moments
(a hero entrance, a meaningful scroll reveal) land harder than the same
fade-up-on-scroll animation applied to every single element on the page.
Once every card fades in the same way, the animation stops registering as
craft and starts registering as boilerplate.

**Imagery has a point of view.** A consistent crop ratio, a consistent
color grade/duotone, a consistent subject distance — treated like a
system, not a scattered set of stock choices.

**Structure encodes real information.** Numbered steps, dividers, and
eyebrows should be true about the content (a real sequence, a real
category boundary) — not decoration borrowed because it "looks
designed."

## Scoring a site (use this to produce a rating)

Score each dimension 0-10, then average for an overall score. Anchor the
scores against the checklist above, not against "does it look broken":

| Dimension | 0-3 (template) | 4-6 (competent) | 7-10 (bespoke) |
|---|---|---|---|
| Typography | One safe pairing, size-only hierarchy | Clear scale, some weight variation | Distinctive pairing, real editorial voice |
| Color | Default gradient/neutral everywhere | Consistent but generic palette | Restrained, specific, purposefully applied |
| Layout rhythm | Same section shape repeated | Some variation section to section | Composed rhythm, intentional breaks |
| Depth/shadow | One shadow value everywhere | A couple of tuned values | Elevation system, per-material |
| Motion | None, or same fade on everything | A few tasteful reveals | Orchestrated, purposeful, restrained |
| Imagery | Generic/stock, inconsistent treatment | Decent photos, loose consistency | Systemized treatment, strong art direction |
| Distinctiveness | Could be any SaaS in this space | Recognizable brand color/voice | Unmistakably this brand, memorable |

**Translate the average to a rough market-value read** (a heuristic for
communicating the gap, not a literal pricing formula):

- **0-3: "$50 template"** — looks like an unmodified page builder theme.
- **4-5.5: "$2-5k freelancer build"** — solid, functional, safe. Nothing
  wrong, nothing memorable.
- **5.5-7.5: "$15-40k studio build"** — real design system, some
  distinctive choices, still plays it safe in places.
- **7.5-9: "$75-150k agency build"** — art-directed, distinctive
  typography and layout, imagery treated as a system, motion used with
  restraint and purpose.
- **9-10: category-defining** — the design itself becomes part of the
  brand's word-of-mouth.

## How to close the gap when auditing

1. Name the recipe being repeated (e.g. "every card is icon-circle +
   title + paragraph + top gradient bar").
2. Count how many times it repeats across the page/site. High repeat
   count with zero variation is the actual defect, not the recipe itself.
3. For each repeated recipe, pick the 1-2 instances that most deserve a
   different treatment (the hero, the highest-priority CTA, the section
   that's actually a sequence) and redesign only those — resist reflowing
   the whole system, which usually just produces a new uniform recipe.
4. Cut before adding: removing a redundant section or an unearned
   animation reads as more premium than adding another visual flourish.
5. Walk every section at the actual rendered viewport (not just skimming
   markup) and flag dead space: a sticky column taller than its content,
   a flex/grid track with nothing balancing it, a card with a fixed
   min-height nothing fills. Empty space is only a design choice when
   something else on the page justifies it (a breathing-room pause after
   a dense section). Unclaimed space next to unrelated content is a bug.

## Typography pairing (reference before choosing fonts)

**The one-line rule:** pick one *voice* (a characterful display face for
headlines) and one *workhorse* (a quiet, legible face for body text and
UI chrome). Add a third *utility* face (monospace) only if the content
has genuinely data-like or system-like elements (tags, code, IDs,
timestamps) — don't add a mono face just for decoration.

**Contrast comes from weight/width/x-height before it comes from family.**
Two different sans-serifs at the same weight and size read as a mistake,
not a pairing. If the display and body face are going to be visually
close, separate them hard on weight (400 vs 800) or size ratio.

**Where the display face and the body face split:**
- Display face handles: h1, hero statements, big standalone numbers,
  section thesis statements. Anything under ~24px should not use a
  display-only face — most are drawn for large optical sizes and go
  muddy or cramped small.
- Body face handles: paragraphs, nav, buttons, labels, h3 and smaller
  headings that sit close to body copy.
- Mono face handles: tags, chips, system/product identifiers, stats,
  anything tabular.

**Type scale:** 3-4 sizes maximum per page context. Ratio between steps
should be at least 1.25, commonly 1.333-1.5 for a marketing page. Display
heading is typically 2-3x the body size, not a fixed px value — set it
relative so the ratio survives redesigns.

**Line-height:** headings 1.1-1.3 (tighter as size grows), body text
1.5-1.7. Long-form paragraphs want the higher end; short UI copy the
lower end.

**Reliable pairing patterns for product/marketing sites (2026):**
- Geometric/expressive display sans (e.g. Bricolage Grotesque, Clash
  Display, General Sans) + a clean grotesk workhorse (e.g. Geist, Inter,
  Switzer) — the "distinctive headline, invisible body" pattern. Good
  default for AI/tech product sites that want to feel current without
  going full editorial serif.
- High-contrast display serif + modern sans body — sophistication,
  editorial/consulting feel. Higher risk of reading as generic "premium
  template" if the serif is Fraunces/Playfair and the sans is Inter —
  pick less common pairings if going this route.
- Single variable font across both roles, differentiated only by weight
  axis — safe, cohesive, lower risk but also lower "distinctive voice"
  ceiling. Only recommended when the variable font has genuinely wide
  weight/optical-size range (e.g. Geist, which spans both comfortably).

**Vercel/Linear-era "AI product" visual language**, useful when the brief
explicitly wants to signal "AI company" rather than "consulting firm":
single restrained accent color against a near-monochrome base, Geist or
Geist Mono for anything system/tag-like, bento-grid layouts (one dominant
card + smaller supporting cards, not a uniform grid), sharp 1px borders
with shadow reserved for hover/elevation rather than baked into every
resting element, subtle dot/grid background texture instead of gradient
mesh.

## CSS tooling worth reaching for

Don't hand-roll every token from scratch when a small, respected library
already solved it — but don't pull in a heavy framework for a project
that doesn't need one either.

- **Open Props** (`open-props` on npm) — not a framework, just curated
  CSS custom properties: spacing scale, shadow scale, radii, easing
  curves, aspect ratios, animation durations. Works with plain CSS, no
  build step opinions, tiny footprint. Import only the modules a project
  needs (`open-props/sizes.min.css`, `/easing.min.css`, `/shadows.min.css`,
  etc.) rather than the whole library, and layer the project's own brand
  color tokens on top — Open Props' color tokens are a generic base, a
  real brand should still define its own palette.
- **Radix Primitives** (`@radix-ui/react-*`) — headless, accessible
  component behavior (dialog focus-trap, popover positioning, tooltip
  timing) for React projects, with zero visual opinion — style it
  entirely with the project's own CSS. Worth it the moment a project
  hand-rolls a modal/dropdown/tooltip and starts accumulating focus-trap
  or escape-key edge cases; not worth it for a single simple modal.
- **Tailwind v4** — reach for it on new projects that want utility-class
  velocity; retrofitting it onto an existing hand-written CSS codebase is
  usually not worth the churn unless the project is being rebuilt anyway.
- Prefer these over inventing bespoke spacing/shadow numbers by eye —
  curated scales read as more considered specifically because the
  increments aren't arbitrary.
