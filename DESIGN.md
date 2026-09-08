# DEExpress visual system

## Stack

Tailwind CSS v4 (via `@tailwindcss/postcss`). The entire design system lives in `app/globals.css` as `@theme` tokens (brand colors, fonts, keyframe animations); all components use utility classes. Shared primitives (`container`, `Eyebrow`, `BtnLink`, `PageHero`, section constants) live in `components/ui.tsx`.

## World

Modern logistics-tech: a premium, globally competitive identity built around network imagery — dotted coverage maps, animated route arcs, gradient navy surfaces and precise operational detail. The site reads like a control tower: calm, confident, always oriented toward the next action (quote or track).

## Color

- Ink navy: `#050D1A` / `#0A1B31` for heroes, tracking band and footer; royal glows layered as radial gradients.
- Royal blue: `#1E5EFF` / `#1849C9` for links, map nodes, focus rings and gradient CTA panels.
- Signal orange: `#FF7A1A` / `#FF9142` for primary actions, route arcs, active map nodes and accent text (gradient to `#FFB454` gold).
- Light gray `#F4F6FA` and white surfaces with `#E4E9F0` hairlines for cleanliness and readability.

## Typography

Sora is the display face for page titles, section headings, cards and metrics; Inter is the UI and reading face for copy, forms, navigation and metadata. The role scale is deliberately compact: `type-display-hero`, `type-display-section`, `type-display-card`, `type-body-lead`, `type-body`, `type-label`, and `type-data`. Body copy is 16px minimum with a 1.75 line height and should remain within 65–72ch. Labels are 12px/700 uppercase with measured tracking; data uses tabular numerals.

Use the semantic `text-ink`, `text-ink-muted`, `bg-surface`, `bg-surface-muted`, and `border-border` tokens for standard interface surfaces. Reusable CSS primitives are `ui-button` (with size and color modifiers), `ui-field`, `ui-label`, `ui-card`, `ui-form-card`, and `ui-status-card`; use them before composing one-off control styles. The -specific `.new-home` surface retains its local Saans treatment as a separately authored editorial experience.

## Composition

Full-bleed dark heroes with radial glow + grid overlays on every page, followed by alternating white/light-gray sections. Cards use 20px radii, hairline borders and lift-on-hover. The interactive dotted map (Europe, Africa, Middle East) anchors the coverage story on Home and Destinations.

## Interaction language

- Scroll-reveal via IntersectionObserver on all sections.
- Animated counters in the hero stats rail.
- Interactive map: clickable/hoverable region nodes with pulsing rings and flowing orange arcs.
- Marquee of service modes; form-first conversion paths with success states; shipment tracking widget with staged timeline demo.
- Floating WhatsApp button on every page.
- EN/DE language switch persisted to localStorage; all copy served from `lib/i18n.tsx`.

## Content guardrails

Real company data (address, contacts, register, VAT) is used. The full destination country list is not yet configured — destinations remain regional. Tracking shows a clearly labeled preview timeline; live API integration is pending. Forms simulate submission client-side until a backend endpoint is connected.
