# Case Study System

All case studies use one layout, one typography system, and the same seven sections:

| Section | Purpose |
| --- | --- |
| 00 / Introduction | Product premise, role, ownership, scope, status |
| 01 / The Opportunity | Problem, evidence or assumptions, guiding question |
| 02 / Defining the Product | Architecture, core journey, boundaries |
| 03 / Designing the Experience | Key decisions, alternatives, tradeoffs, interaction evidence |
| 04 / Designing the System | Shared patterns and genuine iterations |
| 05 / The Product | One connected end-to-end walkthrough |
| 06 / Reflection | Learning, supported outcomes, limitations, next steps |

## One Source For Each Concern

- `app/case-studies/structure.ts`: the section order, titles, anchors, and validation. Missing, empty, reordered, or renamed sections fail with a clear error rather than silently disappearing.
- `content/case-studies/<slug>.mdx`: the project's narrative. Spots comes from the user-supplied case study, with capitalization changed to Spots and visual notes replaced by media slots. Forma is an explicit concept narrative using the same structure, with unknown ownership and unverified outcomes identified.
- `app/case-studies/content.ts`: project registration, listing summary, cover, and named media/gallery slots. No narrative paragraphs belong here.
- `app/case-studies/case-study.tsx`: shared layout, section rendering, media resolution, and next-project navigation. No project-specific layout branches.
- `app/case-studies/gallery.tsx`: shared canvas, swipe/arrow navigation, fade, and enlarged viewer. Visible galleries advance every three seconds with a 200ms opacity-only fade. They pause on hover, keyboard focus, an enlarged view, or a hidden tab; reduced-motion preferences disable automatic cycling. Only the next slide is prefetched and decoded. Galleries never determine the narrative order.
- `styles/main.css`: existing shared site typography. Dark regular-weight headings, muted body copy, and 150% line height.

## Add Any Project

1. Copy `content/case-studies/TEMPLATE.mdx` to `<slug>.mdx` in the same folder.
2. Keep the seven exact section headings. Write project-specific subheadings and paragraphs beneath them. Only claim evidence you can support.
3. Add a project to `studies` in `app/case-studies/content.ts`, including its cover and listing summary.
4. Register media under descriptive keys, then place `<Gallery name="discovery" />` or `<Media name="walkthrough" />` next to the relevant writing. Unknown names fail clearly.
5. Export assets into `public/images/<project>/` and reference their actual filenames. A 1920×1080 export is supported. Existing galleries preserve image proportions and open larger on click.

The route `/case-studies/<slug>` is automatic. No new page layout or stylesheet is needed. Do not copy a previous project's page component.

## Spots Image Order

- Discovery: explore default → explore 5.
- Conversational entry/context: chat default → chat attached state → chat selected+attached state.
- Response to itinerary: chat 8 → itinerary pop → itinerary schedule → full trip view 2.
- System images: systems-0 → systems-1 → systems-2 → systems-3 → systems-4 → systems-5. Only systems-0 receives additional white canvas spacing; the remaining exports fill the gallery because they include their own canvas.

Each group appears once, within the section it supports. The unfinished Spots video has been removed from The Product section until a complete walkthrough is ready.

## Local Preview And Checks

From `/Users/khushpatel/my-portfolio`, run `npm run dev`. Open `/case-studies`, `/case-studies/spots`, or `/case-studies/forma` on the printed local URL.

Run `node node_modules/typescript/bin/tsc --noEmit --incremental false` and `node node_modules/@biomejs/biome/bin/biome check app/case-studies` for scoped checks. The existing `npm run build` includes repository-wide autofixes; avoid it for a read-only check.

## Sharing

This area is unlisted, excluded from generated sitemaps, and marked noindex/nofollow. It has no password; anyone with its URL can forward it. All work stays local until the user explicitly authorizes publishing. Do not push or deploy.
