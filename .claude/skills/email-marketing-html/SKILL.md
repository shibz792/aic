---
name: email-marketing-html
description: Use when building or revising a marketing/invitation/announcement email as raw HTML — table-based, inline-CSS, Outlook-safe, destined for an ESP or a direct send. Trigger on requests like "build an email invite," "email template," "HTML email for this campaign," "make this email look premium," or any request to send something by email that isn't a plain-text message. Produces email-client-safe markup (not a webpage) with deliberate design aesthetics and conversion-focused structure — not a generic AI-template blast.
---

# Email Marketing HTML

An HTML email is a different medium from a webpage wearing the same CSS: it
renders inside a dozen hostile, inconsistent engines (Outlook desktop still
uses Word's HTML renderer), most of the audience never scrolls past the
first screen, and the entire job of the document is to get one click. This
skill exists because those three facts change almost every default decision
a web-literate build would otherwise make.

Treat the three layers below as inseparable. A technically bulletproof email
with generic design converts worse than it should. A gorgeous design that
breaks in Outlook never gets seen by half the list. A beautiful, bulletproof
email with no single clear action doesn't convert at all.

## Before writing any markup: a short interview

Don't start generating HTML from a one-line request. Get these answered
first — they change the build, and guessing wrong wastes the whole draft:

1. **What's the one action?** The entire email should serve exactly one
   primary link (RSVP, book a call, claim an offer). If the request implies
   two unrelated actions, push back and ask which one actually matters —
   a second, secondary action can repeat the *same* link lower down, but a
   genuinely different action splits the funnel and halves both conversion
   rates.
2. **Real hosted logo URLs, or do we need a fallback?** SVG is unreliable in
   Outlook desktop, and a locally-referenced file path does nothing in an
   email client — it has to be a real `https://` URL the recipient's client
   can fetch. If the brand doesn't have hosted PNG/JPG logos yet, say so and
   either ask the user for a hosted URL or build a clean text wordmark
   instead (see "Logos" below) — never invent or guess an image URL.
3. **Who signs it, and is it personal?** A named sender with a real
   title reads as an invitation; "The Marketing Team" reads as a blast.
   Ask who's signing and whether there's a merge-tag first name to greet
   the recipient with.
4. **What are the real facts?** Date, time, venue, price, deadline — get
   the specifics instead of placeholder copy. An email full of "Lorem
   ipsum" energy (vague superlatives standing in for real details) is the
   single fastest way to make a send look like a template.
5. **Does the account already have an unsubscribe mechanism / sender
   address?** Needed for the compliance footer — see "Trust and compliance"
   below.

## Layer 1 — Email-client-safe engineering (non-negotiable)

These aren't style preferences; violate them and the email breaks for a
meaningful slice of recipients, usually invisibly to you since your own
preview client won't reproduce the failure.

- **Table-based layout.** Every structural element is
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0">`,
  not a `<div>` with flexbox/grid. Outlook desktop renders with Word's
  engine, which has no flexbox or grid support at all.
- **Inline CSS is the source of truth.** A `<style>` block is for
  `@media` queries and light progressive enhancement only — several major
  clients strip `<head>` styles entirely. Every color, font, padding that
  must land goes inline on the element.
- **MSO conditional comments** (`<!--[if mso]> ... <![endif]-->`) wrap
  anything Outlook needs handled differently: a fixed-width table wrapper
  so the layout doesn't collapse, and VML button fallbacks (next point).
- **Bulletproof CTA buttons.** A real `<a>` styled as a button handles
  every modern client. Outlook desktop needs a `<v:roundrect>` VML
  fallback inside `<!--[if mso]>`, or the button degrades to unstyled
  blue underlined text. See `references/email-html-patterns.md` for the
  exact markup — copy it rather than re-deriving it.
- **600–640px max width, single column.** Mobile stacking via
  `@media (max-width:600px)` is a bonus for clients that honor it
  (Apple Mail, Gmail app) — Outlook and some webmail clients ignore media
  queries completely, so **the unstyled base layout must already work**
  on a narrow screen. Design mobile-first in practice: if it only works
  because the media query kicks in, it's broken for a meaningful chunk of
  opens.
- **Images.** Alt text on every image — many clients block images by
  default, so the email should still make sense with alt text standing in.
  Never rely on a background-image for anything load-bearing (text
  readability, the CTA). See "Logos" below for the hosted-URL requirement.
- **Hidden preheader text.** The line shown next to the subject in the
  inbox, before the recipient opens anything. Always write one
  deliberately — see "Preheader" under Layer 3, since it's functionally
  part of the funnel, not a technical afterthought.
- **Dark mode meta tags**
  (`<meta name="color-scheme" content="light">` +
  `<meta name="supported-color-schemes" content="light">`) tell clients
  that auto-remap colors not to touch a deliberately-designed palette —
  include them even on a light-background email, since without them some
  clients will still try to invert parts of it.
- **No JavaScript, no video embeds.** Neither executes in email clients;
  use a static image (ideally linking out to the real video) instead.

Full copy-pasteable markup for all of the above — preheader div, MSO
table wrapper, the bulletproof button with VML fallback, the responsive
`<style>` block — lives in `references/email-html-patterns.md`. Read it
before building rather than re-deriving this boilerplate from memory; it's
been hand-verified (tag-balance checked, rendered, link-checked) and
copying it is both faster and safer than reconstructing it.
`assets/starter-template.html` is a blank, working skeleton with all of
this already wired up — start a new build from a copy of it rather than
an empty file.

## Layer 2 — Design aesthetics: don't look AI-generated

Read `.claude/skills/web-design-aesthetic/SKILL.md` first — its "premium
vs. template" checklist and typography-pairing guidance apply here
directly. Two things are different in the email context specifically:

- **Fonts are web-safe stacks only.** Custom fonts and `@font-face` are
  unreliable across clients, so the "characterful display face + quiet
  workhorse" pairing has to come from what's actually installed:
  `Georgia, 'Times New Roman', serif` (or `Palatino`) for an editorial
  serif display voice, paired with `-apple-system, 'Segoe UI', Roboto,
  Helvetica, Arial, sans-serif` for body and UI text. This is still a
  genuine pairing with real contrast — it reads as "designed," not as a
  limitation, when the weight/size contrast between the two is deliberate.
- **Gradients, shadows, and rounded corners all have to be done with real
  hosted-attribute and inline-CSS equivalents**, not the modern CSS
  shorthand a webpage would use — e.g. `bgcolor="#16224d"` *and*
  `style="background:#16224d"` together (belt-and-suspenders: the
  attribute is what old Outlook actually honors), `border-radius` inline
  for clients that support it with a square fallback for those that
  don't. A gradient or rounded card that only renders in some clients
  should degrade to something still acceptable, not broken.

Everything else from the web-design-aesthetic checklist applies unchanged:
avoid the purple-to-blue gradient used for every surface, avoid uniform
`border-radius: 999px` on every element, avoid an icon-in-a-circle repeated
with zero variation, avoid em dashes and Lorem-ipsum-energy copy, avoid
numbered markers on content that isn't actually sequential. **Vary the
recipe on purpose** — if the last email built with this skill used a
calendar date-tile and a checkmark-circle list, the next one earns a
genuinely different structural idea instead of reskinning the same layout
with new copy. Re-read the last email this skill produced (if one exists
in the project) before starting, specifically to avoid repeating its exact
structure.

### Logos

A hosted image is required for a real logo — SVG and local file paths
don't work in email clients. If the user hasn't provided a hosted PNG/JPG
URL:

1. Ask for one (most teams already have logos hosted somewhere — a CDN,
   their website's own `/public` assets once deployed, or an image host).
2. If genuinely unavailable, build a clean typographic wordmark instead
   (styled text, not an image) rather than guessing a URL or leaving a
   broken image placeholder — a well-set text lockup looks intentional; a
   broken image icon looks broken.

Never fabricate an image URL that hasn't been confirmed to actually host
the right file.

## Layer 3 — Funnel and conversion principles

- **One primary action, repeated at most twice.** Every CTA button in the
  email should point at the same link (unless the interview surfaced a
  genuinely separate second action). Repeating the same button once near
  the top and once near the bottom, after the reader has absorbed the
  pitch, out-converts a single button or a button-per-section — but a
  button in every section dilutes urgency instead of building it.
- **The ask is visible without scrolling, on mobile.** A recipient
  skimming a phone screen in three seconds should see who this is from,
  what's being asked, and roughly why, before they have to scroll.
- **Scannable hierarchy over dense prose.** Short paragraphs, a labeled
  details block (date/time/venue as label-value pairs, not buried in a
  sentence), a short bulleted list rather than a paragraph trying to do a
  list's job.
- **Personalization-ready.** Default to a merge-tag greeting
  (`$[FNAME|there]$` for Zoho-style platforms, `{{first_name}}` for most
  others — ask which the sending platform uses, or default to the Zoho
  style already established in this project) rather than a generic "Hi
  there" with no merge path at all.
- **Honest urgency only.** Real facts, stated plainly, earn their place —
  a real date, a real capacity number, a real deadline. Never invent a
  countdown, an inflated attendee count, a fake "X spots left" counter, or
  a testimonial/stat that wasn't provided. State the real constraint once
  with confidence; don't repeat it four times to manufacture pressure it
  doesn't have.
- **Trust and compliance signals, especially B2B.** A named sender with a
  title, a real signature block, a physical address, and an unsubscribe
  link in the footer. These aren't just legal cover — a footer with a
  real address and an honest opt-out reads as a legitimate business
  communication rather than a phishing-adjacent blast, which affects
  whether a wary recipient trusts the rest of the email.
- **Preheader text is part of the funnel, not an afterthought.** It's
  what's visible in the inbox before the email is even opened — write it
  deliberately to extend the subject line's hook, don't leave it to
  default to the email's first line of body text (which is usually a logo
  alt tag or a stray greeting, and wastes the slot).

## After building

Before handing the file back:

- Check tag balance (`table`/`tr`/`td` open vs. close counts match) and
  check for stray content outside `<html>`.
- Grep the file for every CTA link and confirm they all point at the
  intended URL — a single typo'd link is the costliest possible bug in a
  marketing email.
- Grep for em dashes and any names/claims the project has specifically
  asked to be excluded (check this project's established conventions
  before assuming none apply).
- Render it in a browser at both a desktop width (~700px viewport) and a
  mobile width (~390px) to catch obvious layout breaks and confirm every
  image actually loads (a 0-width/broken image is a dead giveaway the
  logo URL was wrong).
- Say plainly that a browser render is not the same as a real Outlook/
  Gmail/Apple Mail test, and recommend a real send-test through the
  user's ESP before a production send — browser previews don't reproduce
  every client quirk this skill defends against.
