---
name: nextjs-b2b-site
description: Reference for building B2B consulting/marketing websites using the Citrus stack: Next.js 16.2.9 App Router, React 19, Tailwind v4, Framer Motion 12. Covers project scaffold, design tokens, CSS utility classes, reusable components, page layout patterns, animation conventions, ContentBlock data patterns, and Vercel deployment rules. Use whenever starting or extending a website in this stack.
---

# Next.js B2B Site — Reference

## 1. Stack & Versions

Use these exact versions. Deviating causes breakage the CI/lint pipeline will not catch locally.

| Package | Version |
|---|---|
| next | 16.2.9 |
| react / react-dom | 19.2.4 |
| framer-motion | ^12.42.0 |
| lucide-react | ^1.22.0 |
| tailwindcss | ^4 |
| @tailwindcss/postcss | ^4 |
| typescript | ^5 |
| eslint | ^9 |
| eslint-config-next | 16.2.9 |

Node version gate — add to `package.json`:
```json
"engines": { "node": ">=20" }
```

**Never add:** `clsx`, `tsparticles`, `dotted-map`, `playwright`. Keep dependencies minimal — if a utility exists in lucide-react or Framer Motion, use that instead of a new package.

---

## 2. Project Structure

```
src/
  app/
    layout.tsx           ← root layout: font load, Navbar + Footer + Providers wrapper
    globals.css          ← ALL design tokens + ALL utility animation classes
    page.tsx             ← homepage
    [route]/
      page.tsx           ← 'use client' page content
      layout.tsx         ← metadata only (export const metadata, return children)
  components/
    ui/                  ← Navbar, Footer, AnimatedSection, BookingButton, BookingModal, Providers
    sections/            ← CTASection, ProcessFlow, LogoMarquee, TrustStats, GlobalFootprint
    hero-visuals/        ← animated SVG/canvas panels per hero (LiveScan, Glance, SolutionFinder, IndustryCoverage)
  data/
    case-studies.ts      ← ContentBlock union type + CaseStudy[] array + getCaseStudy helper
    map-dots.json        ← SVG dot-map coordinate data (points[], pins[])
  lib/                   ← utilities; keep empty until actually needed
public/
  logos/clients/         ← client logos as .webp
  logos/partners/        ← partner logos as .webp
  logos/integrations/    ← integration logos as .svg/.png
  [PlatformName].png     ← platform brand images; filenames are case-sensitive
```

**Git repo root = Next.js app root.** No subdirectory nesting. `package.json` lives at the repo root, not inside a `citrus-website/` subfolder or similar.

---

## 3. Root Layout

```tsx
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Providers from '@/components/ui/Providers';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <div className="gradient-mesh" />
        <div className="floating-orbs" />
        <div className="floating-orb-pink" />
        <div className="particles" />
        <div className="noise" />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
```

The five ambient divs (`gradient-mesh`, `floating-orbs`, `floating-orb-pink`, `particles`, `noise`) are defined in `globals.css` at `z-index: -1`. They create a living backdrop for the entire site. Never remove them — they are what separates the premium feel from a plain white page.

`Providers` wraps `BookingProvider` which manages the global booking modal context.

---

## 4. Per-Route Layout (Metadata Only)

```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title | Site Name',
  description: 'Page description under 160 chars.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
```

- `layout.tsx` files are **server components** — no `'use client'` directive, no Framer Motion, no hooks.
- `page.tsx` files are **always `'use client'`** because they use Framer Motion animations.
- Put all animation, interaction, and visual logic in the page file, not the layout.

---

## 5. Design Tokens

```css
/* globals.css */
@theme inline {
  --color-background:    #fafbfc;
  --color-foreground:    #0f172a;
  --color-citrus:        #2dd4a8;   /* primary brand */
  --color-citrus-dark:   #0d9488;
  --color-citrus-light:  #d1fae5;
  --color-coral:         #f472b6;   /* accent */
  --color-coral-dark:    #e11d48;
  /* full slate-50 through slate-950 palette */
  --font-sans: var(--font-jakarta), 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
}
```

**Tailwind v4 note:** `@theme inline` replaces the old `tailwind.config.js` extend pattern. All custom tokens go in `globals.css`, not a config file.

**Color cycle for index-based coloring** — use this pattern everywhere cards, icons, or badges are colored by position:
```tsx
const colors = [
  { solid: '#2dd4a8', text: 'text-citrus-dark', bg: 'bg-citrus/10' },   // citrus
  { solid: '#818cf8', text: 'text-indigo-400',  bg: 'bg-indigo-50'  },  // indigo
  { solid: '#f472b6', text: 'text-pink-400',    bg: 'bg-pink-50'    },   // pink
];
const c = colors[i % 3];
```

---

## 6. CSS Utility Classes

All defined in `globals.css`. Never recreate these inline — always use the class name.

### Ambient Background (fixed, z-index: -1)
- `.gradient-mesh` — full-page radial gradient tint (citrus/indigo/pink at low opacity)
- `.floating-orbs` — two large blurred orbs (citrus top-left, indigo bottom-right) via pseudo-elements
- `.floating-orb-pink` — pink orb mid-right, separate element
- `.particles` — micro dot particles via box-shadow on pseudo-elements; no library needed
- `.noise` — SVG fractalNoise texture overlay at 1.2% opacity

### Hero Backgrounds (position: absolute inside section)
- `.aurora-bg` — large citrus/indigo blob pair, absolute inside hero section
- `.aurora-third` — coral blob, absolute sibling; always place both together
- `.grid-pattern` — radial-gradient dot grid, `background-size: 32px 32px`; set `opacity-20` or `opacity-30` on the element

### Section Wrappers
- `.section-light` — white bg, `padding: 56px 0`
- `.section-muted` — `#f8fafb` bg, `padding: 56px 0`
- `.section-dark` — near-black with multi-stop radial citrus/indigo/pink gradients; text is white
- `.section-gradient` — `linear-gradient(135deg, #f0fdf8, #f8fafb 50%, #f0fdf8)`
- `.section` — padding only, no background color

### Cards
- `.glass-card` — white bg, 1px `#e8ecf1` border, shadow, hover lifts 5px with citrus-tinted shadow
- `.dark-card` — dark gradient bg (`#080d1a → #0e1525`), citrus border tint, two pseudo-element orb blobs inside
- `.border-gradient` — 1px animated gradient border (citrus→indigo→pink, 8s spin); wrap inner `<div>` to restore background
- `.border-gradient-dark` — same border but inner bg is dark

### Text
- `.gradient-text` — animated `linear-gradient(135deg, #2dd4a8, #818cf8, #f472b6)`; applies `background-clip: text` and shifts over 6s

### Buttons
- `.btn-primary` — dark bg, citrus border tint, shimmer sweep on hover, lifts 2px
- `.btn-secondary` — white bg, slate border, citrus on hover
- `.btn-citrus` — full citrus→teal→indigo gradient, lifts + scales on hover

### Animation Utilities
- `.glow-pulse` — cycles box-shadow through citrus→indigo→pink over 6s
- `.animate-marquee` — scrolls left; set `--duration` CSS variable to control speed
- `.animate-marquee-reverse` — scrolls right

### Orbs (decorative, absolute positioned)
- `.orb` — base class: `position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none`
- `.orb-citrus`, `.orb-coral`, `.orb-indigo` — color-specific backgrounds with drift animation

---

## 7. Page Layout Pattern

### Hero Section
```tsx
<section className="relative min-h-[85vh] flex items-center pt-28 pb-16 overflow-hidden">
  <div className="aurora-bg" />
  <div className="aurora-third" />
  <div className="absolute inset-0 grid-pattern opacity-30" />

  <div className="relative max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-bold text-slate-900 leading-[1.1] tracking-[-0.03em] mb-6">
          Main headline{' '}
          <span className="gradient-text">with gradient emphasis.</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-2xl">
          Supporting copy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <BookingButton className="btn-primary text-base px-8 py-4">
            CTA label <ArrowRight className="w-5 h-5" />
          </BookingButton>
          <Link href="#section-id" className="btn-secondary text-base px-8 py-4">
            Secondary CTA
          </Link>
        </div>
      </motion.div>

      {/* Right col: hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden lg:block"
      >
        <div className="dark-card p-6 glow-pulse">
          {/* dark-card panel or hero-visual component */}
        </div>
      </motion.div>
    </div>
  </div>
</section>
```

**Hero `min-h` by page type:**
- Homepage: `min-h-[92vh]`
- Interior pages (services, platforms): `min-h-[85vh]`
- Index/listing pages (case studies, industries): `min-h-[55vh]`, centered, no right column

### Section Alternation Order
After the hero, sections alternate in this order:
1. `.section-light` (white)
2. `.section-dark` (near-black)
3. `.section-gradient` (soft green tint)
4. `.section-muted` (`#f8fafb`)
5. Repeat as needed

### Max-Width Container
Use this string exactly, every time:
```tsx
className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16"
```

### Wrap Every Section's Content in AnimatedSection
```tsx
<section className="section-light relative">
  <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">
    <AnimatedSection className="text-center mb-10">
      <h2 className="text-[2rem] font-bold text-slate-900 tracking-[-0.02em]">Heading</h2>
    </AnimatedSection>
    {/* card grids, etc. */}
  </div>
</section>
```

### Page Ending Pattern
Every page ends with:
```tsx
<ProcessFlow heading="..." steps={[...]} />  {/* optional */}
<CTASection headline="..." subtext="..." primaryCTA="..." />  {/* always last */}
```

---

## 8. Component API Reference

### AnimatedSection
Scroll-triggered entrance animation. Wraps any content block.

```tsx
<AnimatedSection
  direction="up"    // 'up' | 'left' | 'right' | 'scale' — default 'up'
  delay={0}         // seconds
  className=""
>
  {children}
</AnimatedSection>
```

Variants: `up` = `y: 60→0`; `left` = `x: -60→0`; `right` = `x: 60→0`; `scale` = `0.9→1`. All use `viewport={{ once: true, margin: '-60px' }}`.

---

### CTASection
Full-bleed dark closing section with orb backdrop.

```tsx
<CTASection
  headline="Your headline here."
  subtext="Optional supporting line."
  primaryCTA="Button label"
  primaryHref="/contact"         // pass for SEO; button still opens BookingModal
  secondaryCTA="Or email us"     // optional
  secondaryHref="mailto:..."     // optional
/>
```

---

### ProcessFlow
Multi-step flow: horizontal on desktop (wraps to rows after 4), vertical on mobile. Colors cycle citrus→indigo→pink.

```tsx
<ProcessFlow
  heading="Section heading"
  subheading="Optional supporting line."
  steps={[
    { title: 'Step title', desc: 'Short description.', icon: <Search className="w-5 h-5" />, href: '/optional-link' },
  ]}
/>
```

Steps with an `href` become `<Link>` cards. Steps without `href` are plain `<div>` cards.

---

### LogoMarquee
Infinite-scroll logo strip. Doubles the array internally for a seamless loop.

```tsx
<LogoMarquee
  logos={[{ src: '/logos/clients/logo.webp', alt: 'Client Name' }]}
  speed={35}        // seconds for one pass; default 30
  reverse={false}   // true = right-to-left
  grayscale={true}  // default true; false for partner logos
/>
```

Use two rows (different speeds, one reversed) for the homepage social-proof section.

---

### BookingButton
Opens the global `BookingModal` via context. Never use inline onClick.

```tsx
<BookingButton className="btn-primary text-base px-8 py-4">
  Book a call <ArrowRight className="w-5 h-5" />
</BookingButton>

// Or trigger programmatically:
import { useBooking } from '@/components/ui/BookingModal';
const { open } = useBooking();
```

---

### BookingModal / Providers
`BookingProvider` is already inside `Providers` in the root layout — nothing extra to wire up. The modal has two views: `choose` (email vs calendar) and `book` (embedded booking iframe). It resets to `choose` 300ms after close.

**Update per client:** the iframe URL is hardcoded in `BookingModal.tsx`:
```tsx
src="https://outlook.office.com/book/YOUR_BOOKING_URL"
```

---

### TrustStats
Animated count-up stat bar. Edit the array inside the component when counts change.

```tsx
<TrustStats />
```

---

### GlobalFootprint
Interactive SVG dot-map. Pulls coordinate data from `src/data/map-dots.json`.

```tsx
<GlobalFootprint />
```

---

## 9. Animation Conventions

### Standard Easing
```ts
ease: [0.22, 1, 0.36, 1]  // snappy ease-out; use for all entrances
```

### Scroll-Triggered (inline, not via AnimatedSection)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: i * 0.08, duration: 0.4 }}
>
```

Always `viewport={{ once: true }}`. Stagger with `i * 0.08` but cap total delay at 0.3s for long lists.

### Hover Lift
```tsx
<motion.div whileHover={{ y: -6 }}>  {/* large cards */}
<motion.div whileHover={{ y: -4 }}>  {/* medium cards */}
<motion.div whileHover={{ y: -3 }}>  {/* tight grids */}
```

### Hero Content Entry (animate, not whileInView)
```tsx
// Left column
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}

// Right column visual
initial={{ opacity: 0, x: 40, scale: 0.95 }}
animate={{ opacity: 1, x: 0, scale: 1 }}
transition={{ delay: 0.3, duration: 0.8 }}
```

### React Compiler Rules (enforced by Next 16)
These will fail the build if violated:

```ts
// BAD — Math.random() in render
const angle = Math.random() * 360;

// GOOD — module-level constant
const SEED_ANGLES = [12, 45, 78, 134, 201, 267];
```

```ts
// BAD — mutable reassignment in render
let total = 0;
items.forEach(x => { total += x.value; });

// GOOD — use reduce / precomputed array
const rowStarts = rows.map((_, i) => rows.slice(0, i).reduce((s, r) => s + r.length, 0));
```

Every animation value must be deterministic between server and client.

---

## 10. Navbar Pattern

The Navbar is a fixed floating pill that transitions from `bg-white/40` to `bg-white/80 backdrop-blur-2xl` on scroll.

Key structural choices:
- Fixed, centered, `max-w-[1100px]`, `top-4`, `rounded-2xl`
- `scrolled` boolean state triggers border and shadow change via `useEffect` on `window.scroll`
- Dropdown menus use `AnimatePresence` + `onMouseEnter/Leave` on their trigger button
- Mobile: full-screen overlay (`fixed inset-0 z-40 bg-white`) toggled by hamburger
- All pages need **`pt-28`** on their hero section to clear the navbar

---

## 11. ContentBlock Pattern

### Type Definition
```ts
export type ContentBlock =
  | { type: 'heading'; text: string; level?: 'sub' }
  | { type: 'paragraph'; text: string }
  | { type: 'bullets'; items: string[] }
  | { type: 'stats'; items: { value: string; label: string }[]; title?: string };
```

### CaseStudy Shape
```ts
export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  client: string;
  summary: string;
  heroStats: { value: string; label: string }[];
  blocks: ContentBlock[];
}
```

### How `groupBlocks()` Interprets the Block Stream
- `heading` without `level: 'sub'` → starts a new **Section**
- `heading` with `level: 'sub'` → starts a new **Item** within the current section
- All other blocks go into the current item's content, or into the section's intro if no item has started

### Rendering Rules (in CaseStudyContent.tsx)
| Condition | Renders as |
|---|---|
| Section with 1 item | Inline (no grid) |
| Section with 2+ items, heading contains "solution" | `SolutionTimeline` — vertical numbered list with gradient connector line |
| Section with 2+ items, any other heading | `ItemCardGrid` — 2-col colored card grid, colors by index |

### Stats Icon Auto-Detection
- Value contains `$` → `DollarSign` icon
- Value contains `%` → `Percent` icon
- Label contains `hr`, `hour`, `day`, `week`, `min` → `Clock` icon
- Fallback → `TrendingUp` icon

### Stats Grid Width by Count
- 1 item → `max-w-[220px]`
- 2 items → `grid-cols-2`
- 3+ items → `grid-cols-2 sm:grid-cols-3`

---

## 12. Hero Visual Patterns

### Pattern A: Static Dark Card (most service/platform pages)
```tsx
<div className="dark-card p-6 glow-pulse">
  <div className="flex items-center justify-between mb-5">
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-citrus/20 flex items-center justify-center">
        <Icon className="w-4 h-4 text-citrus" />
      </div>
      <span className="text-[13px] font-semibold text-white">Panel title</span>
    </div>
    <span className="text-[11px] text-citrus font-medium flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-citrus animate-pulse" /> Active
    </span>
  </div>
  <div className="space-y-2.5">
    {rows.map(({ label, value }) => (
      <div key={label} className="flex justify-between items-center p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
        <span className="text-[12px] text-slate-400">{label}</span>
        <span className="text-[12px] font-semibold text-white">{value}</span>
      </div>
    ))}
  </div>
</div>
```

### Pattern B: Animated SVG Component (homepage, solutions, industries)
Separate files in `src/components/hero-visuals/`. Each is fully self-contained. Use `useEffect` + Framer Motion for animation loops. Never call `Math.random()` inside render.

Available components: `LiveScanVisual`, `GlanceVisual`, `SolutionFinderVisual`, `IndustryCoverageVisual`.

---

## 13. Deployment & Vercel

### vercel.json (repo root)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
```

### .gitignore (required entries)
```
node_modules/
.next/
.vercel
test-results/
.env*
```

### Vercel Dashboard Checklist
1. **Root Directory** — must be where `package.json` lives; leave blank if the repo root is the Next.js root
2. **Framework Preset** — Next.js
3. **Node.js Version** — 20.x (matches `engines` field in `package.json`)

### Path Alias
```json
// tsconfig.json
"paths": { "@/*": ["./src/*"] }
```
Use `@/components/...`, `@/data/...` throughout. Never use relative paths like `../../`.

---

## 14. Common Pitfalls

### 1. Unused imports fail lint on build
ESLint 9 + eslint-config-next 16.2.9 treats unused imports as errors. Before every commit, verify every import is consumed in JSX or logic. This includes named imports from lucide-react.

### 2. Case-sensitive filenames
macOS is case-insensitive; Vercel (Linux) is not. A file named `ConexusOneAI.png` imported as `conexusoneai.png` works locally and 404s on Vercel. Always match import paths exactly to the filename on disk, including capitalization.

### 3. Math.random() in render
The React Compiler (active in Next 16+) flags non-deterministic values in render as violations. Move all seed values to module level or derive them deterministically from stable props (e.g., `string.length * 7 + i * 13`).

### 4. Mutable variable reassignment in render
```ts
// BAD — reassigns cursor inside a loop that runs during render
let cursor = 0;
for (const row of rows) { cursor += row.length; }

// GOOD — precompute before render
const rowStarts = rows.map((_, i) => rows.slice(0, i).reduce((s, r) => s + r.length, 0));
```

### 5. All pages are 'use client'
Framer Motion requires client-side rendering. Every `page.tsx` must have `'use client'` at the top. Layout files do not.

### 6. BookingModal iframe URL
The Outlook booking URL is hardcoded in `BookingModal.tsx`. When cloning for a new client, find and replace this before launch.

### 7. Dark section text contrast
Inside `.section-dark`, use `text-white` for headings and `text-slate-400` for body. Never use `text-slate-700` or darker — it will be invisible. Bordered items use `border-white/8` and `bg-white/[0.02]` for delineation.

---

## 15. Typography Scale

| Use | Class |
|---|---|
| Page h1 | `text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.03em]` |
| Section h2 | `text-[2rem] font-bold tracking-[-0.02em]` |
| Card h3 | `text-[15px] font-bold` |
| Body copy (light bg) | `text-[15px] text-slate-500 leading-[1.7]` |
| Body copy (dark bg) | `text-[15px] text-slate-400 leading-[1.8]` |
| Small body | `text-[13px] text-slate-500 leading-[1.6]` |
| Micro labels | `text-[11px] font-bold uppercase tracking-[0.15em]` |
| Stat values | `text-[1.75rem] font-bold` or `text-[2rem] font-bold gradient-text` |

Headings always use `font-bold` (700). Card titles use `font-bold`. Labels use `font-medium` (500) or `font-semibold` (600).

---

## 16. Adding a New Page (Checklist)

1. Create `src/app/[route]/layout.tsx` — metadata only, no `'use client'`
2. Create `src/app/[route]/page.tsx` — `'use client'` at top
3. Add the hero section from the scaffold in Section 7
4. Add the route to **Navbar** (appropriate dropdown array or top-level link)
5. Add the route to **Footer** (appropriate column)
6. Add a `dark-card` (Pattern A) or hero visual component (Pattern B) in the right column
7. Follow section alternation: `.section-light` → `.section-dark` → `.section-gradient` → `.section-muted`
8. Wrap every section's content block in `<AnimatedSection>`
9. End the page with `<CTASection>`
10. Verify before commit: no unused imports, public asset filenames case-match their import paths
