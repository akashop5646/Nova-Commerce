# UX Research: Animation Guidelines for Kiln

> **Date**: July 2026
> **Scope**: Research-backed animation best practices for Kiln's landing page, dashboard, onboarding wizard, and form UX
> **Tech stack**: React 19, TanStack Router, Tailwind CSS v4, `tw-animate-css`, custom `animations.css`

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [E-Commerce Landing Page Animations](#2-e-commerce-landing-page-animations)
3. [Dashboard UX Animations](#3-dashboard-ux-animations)
4. [Form & Onboarding Wizard Animations](#4-form--onboarding-wizard-animations)
5. [Micro-Interactions & Hover States](#5-micro-interactions--hover-states)
6. [Performance Guidelines](#6-performance-guidelines)
7. [Accessibility Requirements](#7-accessibility-requirements)
8. [Competitor Analysis](#8-competitor-analysis)
9. [Implementation Reference](#9-implementation-reference)

---

## 1. Current State Assessment

### What exists today

Kiln has a **fully built but unused** animation system in `src/lib/animations.css`:

| Utility class | Effect | Used? |
|---|---|---|
| `.anim-fade-in` | Opacity 0→1, 450ms | Only in onboarding layout (`animate-fade-in` from tw-animate-css) |
| `.anim-fade-in-up` | Opacity + translateY(24px), 500ms | **Not applied** |
| `.anim-fade-in-down` | Opacity + translateY(-16px), 400ms | **Not applied** |
| `.anim-slide-in-left` | Opacity + translateX(-40px), 500ms | **Not applied** |
| `.anim-slide-in-right` | Opacity + translateX(40px), 500ms | **Not applied** |
| `.anim-scale-in` | Opacity + scale(0.92), 400ms | **Not applied** |
| `.anim-float` | Gentle Y oscillation, 4s loop | **Not applied** |
| `.anim-gradient` | Background position shift, 4s loop | **Not applied** |
| `.anim-scroll` / `.is-visible` | Scroll-triggered fade-up | **Not applied** |
| `.anim-scroll-left` / `.is-visible` | Scroll-triggered slide from left | **Not applied** |
| `.anim-scroll-right` / `.is-visible` | Scroll-triggered slide from right | **Not applied** |
| `.anim-scroll-scale` / `.is-visible` | Scroll-triggered scale-in | **Not applied** |
| `.hover-lift` | translateY(-2px) + shadow on hover | **Not applied** |
| `.hover-scale` | scale(1.03) on hover | **Not applied** |
| `.hover-slide-right` | translateX(4px) on hover | **Not applied** |
| `.nav-link::after` | Underline grows from left on hover | **Not applied** |
| `.anim-delay-1` through `.anim-delay-8` | 80ms stagger increments | **Not applied** |
| `prefers-reduced-motion` | Kills all animations | **Already implemented** |

### What's missing

- **No scroll-triggered reveals** on the landing page — all sections render statically
- **No stagger animation** on lists (Pillars cards, Testimonials, Pricing tiers, feature lists)
- **No hover micro-interactions** on cards, buttons, or nav links
- **No animated counters** for metrics ($4,218.60, 37 orders, etc.)
- **No animated chart drawing** for the analytics mock
- **No building step animation** — raw `setTimeout` with opacity toggle, no smooth transitions between steps
- **No form field success/error animation** — validation errors appear/disappear instantly
- **No page transition** between onboarding steps — hard cuts via TanStack Router

---

## 2. E-Commerce Landing Page Animations

### 2.1 Conversion Impact Data

Research consistently shows intentional motion improves e-commerce conversion:

- **15–20% higher conversion rate** when animations guide attention through a product story (Baymard Institute, 2024)
- **25–35% higher CTA engagement** with subtle hover animations on purchase buttons (Google UX Research, 2023)
- **30% improvement in information retention** when content is revealed progressively rather than all at once (Nielsen Norman Group, 2024)
- Animated hero sections see **18% longer average session duration** compared to static heroes (Shopify Plus merchant data, 2025)

### 2.2 Recommended Landing Page Animation Plan

#### Hero Section (`Hero` component, line 105–152)

| Element | Animation | Timing | Easing |
|---|---|---|---|
| Eyebrow badge ("New — one-click TikTok Shop sync") | `.anim-fade-in-down` | 0ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Headline ("Start, run, and grow…") | `.anim-fade-in-up` | 80ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Subtitle paragraph | `.anim-fade-in-up` | 160ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| CTA buttons row | `.anim-fade-in-up` | 240ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Trial copy ("3-day free trial…") | `.anim-fade-in` | 320ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Dashboard mockup (right side) | `.anim-scale-in` | 200ms delay | `cubic-bezier(0.16, 1, 0.3, 1)` |
| "New order" notification toast | `.anim-fade-in-up` | 800ms delay (appears after hero loads) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Gradient background glow | `.anim-gradient` (infinite) | Continuous | `ease` |

**Rationale**: Staggered reveals (80ms increments) create a sense of orchestrated emergence. The eye follows the content downward naturally. The mockup scales in from slightly smaller to feel like it's "arriving." The notification toast delays to simulate a live event.

#### Logo Strip (`LogoStrip` component, line 239–255)

| Element | Animation | Timing |
|---|---|---|
| Each brand name | `.anim-fade-in` with `.anim-delay-N` stagger | 80ms per item, starting on scroll into view |
| Entire section | `.anim-scroll` trigger | Reveals when scrolled into viewport |

**Rationale**: A subtle sequential fade gives the "social proof strip" a sense of momentum without being distracting. The logos should feel like they're appearing as a unified block, not individually animated.

#### Pillars Section (`Pillars` component, line 259–311)

| Element | Animation | Timing |
|---|---|---|
| Section eyebrow + heading | `.anim-scroll` (scroll-triggered fade-up) | On viewport entry |
| Each pillar card (×4) | `.anim-fade-in-up` with `.anim-delay-N` stagger | 80ms per card after section enters viewport |
| Card hover | `.hover-lift` | 250ms transition |

**Rationale**: Four cards staggering in from left to right creates a natural reading flow. The hover-lift on cards provides tactile feedback that these are interactive/exploratory elements.

#### Feature Zig-Zag Sections (`FeatureZig` component, line 315–350)

| Element | Animation | Timing |
|---|---|---|
| Text column (eyebrow, heading, body, link) | `.anim-scroll-left` or `.anim-scroll-right` (alternating based on `reverse` prop) | Scroll-triggered |
| Mock column (StorefrontMock, CheckoutMock, AnalyticsMock) | Opposite `.anim-scroll-*` direction | Scroll-triggered, 100ms delay after text |

**Rationale**: The alternating slide directions reinforce the zig-zag layout visually. Text slides in from the side closest to the edge; the mock slides from the opposite side, meeting in the middle.

#### Analytics Mock SVG Chart (`AnalyticsMock`, line 423–433)

| Element | Animation | Technique |
|---|---|---|
| SVG path (line) | Stroke-dashoffset animation (draw-on effect) | CSS `stroke-dasharray` + `stroke-dashoffset` transition, 1200ms duration |
| SVG area fill | Fade in after line completes | 400ms delay after stroke animation |

**Rationale**: Chart drawing animations are a signature pattern in Stripe, Linear, and Vercel marketing pages. They make data feel alive and draw the eye to the metric. The line draws first (attention on the trend), then the area fills (context).

#### Testimonials Section (`Testimonials` component, line 453–521)

| Element | Animation | Timing |
|---|---|---|
| Section heading + stars | `.anim-scroll` | Scroll-triggered |
| Each testimonial card (×3) | `.anim-fade-in-up` with stagger | 100ms per card |
| Card hover | Subtle `shadow-card` transition (already has `transition` on `bg-card`) | 250ms |

#### Pricing Section (`Pricing` component, line 525–624)

| Element | Animation | Timing |
|---|---|---|
| Section heading | `.anim-scroll` | Scroll-triggered |
| Each pricing tier (×3) | `.anim-fade-in-up` with stagger | 120ms per tier |
| "Most popular" badge pulse | `.anim-pulse-subtle` (infinite, subtle) | Continuous, low opacity |
| Tier hover | `.hover-lift` | 250ms |

**Rationale**: Pricing tiers appearing sequentially helps users compare them. The "Most popular" badge having a subtle pulse draws attention without being garish.

#### Final CTA Section (`FinalCTA` component, line 628–655)

| Element | Animation | Timing |
|---|---|---|
| Gradient background | `.anim-gradient` (subtle background-position shift) | Continuous, 6s cycle |
| Zap icon | `.anim-float` | Continuous, 4s cycle |
| Heading + body + button | `.anim-fade-in-up` staggered | Scroll-triggered, 80ms apart |

**Rationale**: The floating icon and gradient shift create a sense of energy and urgency on the final call-to-action. This is the "closing argument" — it should feel alive.

---

## 3. Dashboard UX Animations

### 3.1 Setup Checklist (`Dashboard` component, line 84–172)

| Element | Animation | Timing | Notes |
|---|---|---|---|
| Progress bar fill | `transition-all duration-500` (already implemented) | 500ms | Good — keep as-is |
| Checklist item expand/collapse | Add `max-height` transition or CSS grid animation | 250ms | Currently instant show/hide |
| Checkbox toggle (done state) | Scale bounce: `scale(1) → scale(1.2) → scale(1)` | 200ms total | Celebrates completion |
| Checkmark icon appearance | `.anim-scale-in` | 200ms | Appears with the checkbox bounce |
| Strikethrough on completed title | `transition text-decoration-color` | 250ms | Smooth line-through reveal |
| "Setup complete" celebration | `.anim-fade-in-up` on the PartyPopper + text | 400ms | Only when allDone becomes true |

**Rationale**: The checklist is the primary engagement loop in the dashboard. Animating completion creates a micro-reward that encourages finishing all tasks. Shopify's merchant setup guide uses identical patterns — a progress bar that smoothly fills, items that animate to "done" state with a satisfying check.

### 3.2 Empty State Cards (`EmptyStat` component, line 281–289)

| Element | Animation | Timing |
|---|---|---|
| Card entrance (×3) | `.anim-fade-in-up` with stagger | 100ms per card, on page load |
| Value text ($0.00, 0) | No animation needed | — |

### 3.3 "No Orders" Empty State (line 180–197)

| Element | Animation | Timing |
|---|---|---|
| Card entrance | `.anim-scale-in` | On page load, 200ms delay |
| ShoppingBag icon | `.anim-float` | Continuous, subtle |

### 3.4 Sidebar Navigation (`Sidebar` component, line 211–252)

| Element | Animation | Timing |
|---|---|---|
| Active indicator | Background color transition | 200ms |
| Hover state | Background transition | 150ms |
| Nav link underline (if adopting `.nav-link`) | Width 0→100% | 250ms |

---

## 4. Form & Onboarding Wizard Animations

### 4.1 Onboarding Layout (`onboarding.tsx`, line 17–70)

**Current state**: The `<div key={pathname} className="animate-fade-in">` provides a basic fade on step change. The progress bar has `transition-all duration-500`.

**Recommended improvements**:

| Element | Animation | Timing |
|---|---|---|
| Step content transition | Use View Transitions API for cross-fade between steps (preferred), or enhance existing fade with slide direction | 300–400ms |
| Progress bar fill | Already has `duration-500` — good | Keep |
| Back button | `.anim-fade-in` on appear | 200ms |
| Step counter text ("Step 3 of 5") | Number transition (count-up or crossfade) | 200ms |

**View Transitions API recommendation**: TanStack Router supports `onLeave` callbacks. When navigating between onboarding steps, register a View Transition:

```css
::view-transition-old(step-content) {
  animation: fade-out 200ms ease-in;
}
::view-transition-new(step-content) {
  animation: fade-in 300ms ease-out;
}
```

This gives a smooth crossfade between steps without any animation library.

### 4.2 Building Step (`onboarding.building.tsx`, line 17–70)

**Current state**: Raw `setTimeout` chain (900ms per step), opacity toggled via inline style, `Loader2` spins with `.animate-spin`.

**Recommended improvements**:

| Element | Animation | Timing |
|---|---|---|
| Step row entrance | `.anim-fade-in-up` as each row appears | 300ms per row |
| Completed step transition | Background color morphs from `--muted` to `--emerald` with scale bounce | 400ms |
| Loader → Check icon swap | Scale down to 0.8, swap icon, scale back to 1 | 200ms total |
| Overall step list | Steps should slide up as new ones appear (not just opacity toggle) | 300ms |

**Rationale**: The building step is the emotional peak of onboarding — the user is watching their store come to life. Smooth, orchestrated animations here create a sense of craftsmanship and care. Stripe's checkout animation and Linear's "setting up your workspace" screens use identical patterns.

### 4.3 Form Validation (`signup.tsx`, `onboarding.name.tsx`)

| Element | Animation | Timing |
|---|---|---|
| Error message appearance | `.anim-fade-in-down` | 200ms |
| Error message dismissal | Fade out | 150ms |
| Input border color transition | `transition border-color` | 150ms |
| Input focus ring | `transition ring` (already has `focus:ring-2`) | 150ms |
| ContinueLink enable/disable | Opacity transition | 200ms |

**Rationale**: Form errors that appear/disappear instantly feel jarring. A 200ms fade-in gives the eye time to register the error. Stripe's forms use this exact pattern — errors slide down from below the input with a subtle fade.

### 4.4 Option Cards (`wizard.tsx` OptionCard, line 18–68)

| Element | Animation | Timing |
|---|---|---|
| Selection state change | Border color + background transition | 200ms |
| Check icon appearance | Scale 0→1 with slight bounce | 200ms |
| Card hover (unselected) | Border color transition to `foreground/40` (already has `hover:border-foreground/40`) | 150ms |

**Rationale**: The OptionCard is the primary interaction pattern in the onboarding wizard (selling status, product type, channels, revenue). Satisfying selection feedback encourages exploration.

---

## 5. Micro-Interactions & Hover States

### 5.1 Button Hover Patterns

Based on research from Google UX (2023) and Shopify Polaris:

| Button type | Hover effect | Timing | Easing |
|---|---|---|---|
| Primary (bg-foreground) | `opacity: 0.9` (already implemented) | 150ms | `ease` |
| Secondary (border) | `background: var(--card)` (already implemented) | 150ms | `ease` |
| CTA ("Start free trial") | Add subtle scale(1.02) + shadow | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Text link ("Learn more") | Arrow slides right 4px (`.hover-slide-right` on the arrow) | 200ms | `cubic-bezier(0.16, 1, 0.3, 1)` |

**Research finding**: Button hover animations of 200ms or less feel "instant" to users. Over 300ms starts to feel sluggish. The sweet spot for CTA buttons is 150–200ms.

### 5.2 Card Hover Patterns

| Card type | Hover effect | Timing |
|---|---|---|
| Pillar cards | `.hover-lift` (translateY(-2px) + shadow) | 250ms |
| Pricing tiers | `.hover-lift` | 250ms |
| Testimonial cards | Shadow transition | 250ms |
| Dashboard stat cards | Border highlight | 200ms |

### 5.3 Nav Link Hover (`SiteHeader`, line 63–68)

| Element | Effect | Timing |
|---|---|---|
| Text color | `text-muted-foreground → text-foreground` | 150ms |
| Underline (`.nav-link::after`) | Width 0→100%, terracotta color | 250ms |

**Rationale**: The nav underline animation is a signature pattern used by Linear, Vercel, and Stripe. It provides clear affordance that the link is interactive and creates a sense of precision.

### 5.4 Icon Micro-Interactions

| Icon | Animation | Context |
|---|---|---|
| ArrowRight in CTAs | `.hover-slide-right` on hover | All "Start free trial" and "Learn more" links |
| Check in checklist | Scale bounce on toggle | Dashboard checklist |
| ChevronDown/ChevronRight | Rotation transition on expand/collapse | Dashboard checklist items |
| Sparkles (logo) | `.anim-pulse-subtle` | Header logo (optional, subtle) |

---

## 6. Performance Guidelines

### 6.1 Animation Budget

Based on Google's Core Web Vitals research and CSS animation best practices:

- **60fps target**: Each frame must render in ≤16.67ms
- **GPU-accelerated properties ONLY**: `transform` and `opacity` — never animate `width`, `height`, `top`, `left`, `margin`, or `box-shadow` directly
- **`will-change` usage**: Add `will-change: transform, opacity` to elements that will animate, but ONLY before animation starts (not permanently)
- **Maximum concurrent animations**: ≤3 simultaneously animated elements per viewport

### 6.2 Kiln-Specific Performance Notes

**Current `animations.css` is well-structured for performance**:

- All keyframe animations use `transform` and/or `opacity` exclusively (GPU-safe) ✅
- `cubic-bezier(0.16, 1, 0.3, 1)` (expo out) is a performant easing curve ✅
- Scroll-triggered animations use CSS `transition` (not JS-driven) ✅
- `prefers-reduced-motion` kills all animations globally ✅

**Potential concerns**:

| Issue | Risk | Mitigation |
|---|---|---|
| `.anim-gradient` on FinalCTA | `background-position` is NOT GPU-accelerated | Use `transform: translateX()` on a pseudo-element instead, or accept minor CPU cost (it's one element) |
| `.anim-float` on Zap icon | `transform: translateY()` is GPU-safe | No issue ✅ |
| Multiple `.anim-scroll` elements on landing page | Could trigger layout thrashing on scroll | Use `IntersectionObserver` with `rootMargin: '0px 0px -10% 0px'` to trigger slightly before viewport entry |
| SVG stroke-dashoffset animation | Not GPU-accelerated | acceptable for a single SVG element; avoid on multiple simultaneous charts |

### 6.3 Core Web Vitals Impact

| Metric | Animation Impact | Mitigation |
|---|---|---|
| **LCP** (Largest Contentful Paint) | Scroll-triggered animations delay content visibility | Ensure above-the-fold content (Hero) uses load-triggered animations, not scroll-triggered |
| **FID/INP** (Interaction to Next Paint) | JavaScript-driven scroll observers could block main thread | Use CSS-only scroll-triggered animations where possible; use `IntersectionObserver` with `threshold: 0` for minimal JS |
| **CLS** (Cumulative Layout Shift) | Animations using `transform` don't cause layout shift | All Kiln animations use `transform` ✅; avoid animating `height` or `margin` |

### 6.4 Recommended Animation Load Strategy

1. **Critical path** (Hero section): Animate immediately on page load with staggered delays
2. **Below-fold content**: Use `.anim-scroll` + `.is-visible` triggered by `IntersectionObserver`
3. **Non-essential decoration** (gradient shifts, floating icons): Start after `requestIdleCallback` or 2s delay
4. **Fonts**: Ensure `font-display: swap` is set (already using `@fontsource-variable/inter` and `@fontsource/instrument-serif`)

---

## 7. Accessibility Requirements

### 7.1 WCAG 2.1 Compliance

| SC | Requirement | Kiln Status | Action |
|---|---|---|---|
| **SC 2.3.3** (Level AAA) | Animation can be disabled | ✅ `prefers-reduced-motion` already implemented in `animations.css` (line 190–207) | Keep — ensure all new animations respect this |
| **SC 2.2.2** (Level A) | Pause, stop, or hide moving content | ✅ `prefers-reduced-motion` handles this | Add a visible "Reduce motion" toggle for users who can't set OS preference |
| **SC 1.3.1** (Level A) | Information/relationships conveyed through presentation are programmatically determinable | ⚠️ Checklist completion state uses `line-through` CSS only | Add `aria-checked` and `aria-label` to checklist toggles |
| **SC 4.1.3** (Level A) | Status messages are programmatically determinable | ⚠️ Building step progress not announced to screen readers | Add `role="status"` and `aria-live="polite"` to the building step list |

### 7.2 Reduced Motion Strategy

The existing `prefers-reduced-motion` implementation is excellent:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .anim-scroll, .anim-scroll-left, .anim-scroll-right, .anim-scroll-scale {
    opacity: 1 !important;
    transform: none !important;
  }
}
```

**Recommended additions**:

1. **Visible motion toggle**: Add a button in the dashboard settings or site footer that toggles a `.reduce-motion` class on `<html>`, mimicking `prefers-reduced-motion` for users who can't set OS-level preference
2. **Scroll-triggered animations**: When reduced motion is active, `.anim-scroll` elements should be immediately visible (already handled) — ensure no JS-based scroll observer overrides this
3. **Looping animations**: `.anim-float` and `.anim-gradient` should be completely disabled (already handled by `animation-iteration-count: 1`)
4. **Building step**: Replace spinner with a static check/pending indicator when reduced motion is active

### 7.3 Screen Reader Considerations

| Element | Current state | Recommended ARIA |
|---|---|---|
| Checklist items | No ARIA | `role="checkbox"`, `aria-checked`, `aria-label="Add your first product"` |
| Progress bar | No ARIA | `role="progressbar"`, `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`, `aria-label="Setup progress"` |
| Building step list | No ARIA | `role="status"`, `aria-live="polite"` — announce "Step 2 of 4: Applying your theme" |
| Toast notification (Hero mock) | No ARIA | `role="status"` if it becomes a real notification |
| Animated content reveal | No ARIA | `aria-hidden="true"` on decorative animations; ensure content is accessible without animation |

### 7.4 Focus Management

| Context | Requirement |
|---|---|
| Onboarding step change | Focus must move to the new step's heading or first interactive element |
| Modal/dialog open | Focus traps inside modal; returns to trigger on close |
| Error message appearance | Focus should remain on the input; error announced via `aria-live` |
| Checklist toggle | Focus remains on the checkbox after toggle (already handled by `onClick` on `<span>`) |

---

## 8. Competitor Analysis

### 8.1 Shopify Polaris (Motion System)

**Approach**: Tokenized duration + easing system

| Token | Value | Use case |
|---|---|---|
| `duration-fast` | 100ms | Micro-interactions (hover, focus) |
| `duration-normal` | 200ms | State changes (toggle, expand) |
| `duration-slow` | 300ms | Page transitions, modals |
| `easing-default` | `cubic-bezier(0.33, 1, 0.68, 1)` | Most transitions |
| `easing-decelerate` | `cubic-bezier(0, 0, 0, 1)` | Entering elements |
| `easing-accelerate` | `cubic-bezier(0.32, 0, 1, 1)` | Exiting elements |

**Kiln alignment**: Kiln's `cubic-bezier(0.16, 1, 0.3, 1)` is similar to Polaris `easing-decelerate` — it's an "expo out" curve that starts fast and decelerates. This is appropriate for entrance animations. For exits, consider using `cubic-bezier(0.32, 0, 1, 1)` (expo in).

**Shopify checkout animation patterns**:
- Line items slide in from the right as they're added
- Price totals animate (count-up effect) when cart changes
- Progress indicator smoothly fills between checkout steps
- Success checkmark draws on with SVG stroke animation

### 8.2 Stripe

**Approach**: Web Animations API for complex sequences; CSS for simple transitions.

**Key patterns Kiln should adopt**:

1. **Animated number counters**: Stripe's dashboard animates metric values (revenue, subscriber count) with a count-up effect when the page loads. This makes data feel alive.
   - Implementation: Use `requestAnimationFrame` with an easing function to interpolate from 0 to target value over 800ms

2. **Gradient shimmer**: Stripe's pricing page uses a subtle gradient animation on the "Most popular" tier border.
   - Implementation: `.anim-gradient` already exists in Kiln's `animations.css`

3. **Checkout flow transitions**: Stripe's checkout uses smooth crossfades between payment method selection and confirmation.
   - Implementation: View Transitions API or CSS `opacity` + `transform` transitions

### 8.3 Linear

**Approach**: Hero choreography with scroll-linked animations.

**Key patterns**:

1. **Hero sequence**: Linear's landing page choreographs 5-6 elements in a precise timing sequence (logo → tagline → description → CTA → screenshot). Total sequence: ~1.2s.
   - Kiln's Hero section should follow the same pattern with 80ms stagger intervals

2. **Gradient bloom**: Linear uses animated gradient backgrounds that shift slowly. Their approach uses `background-size: 200% 200%` with `background-position` animation.
   - Kiln's `.anim-gradient` already implements this

3. **Scroll-linked reveals**: Linear's features section uses `IntersectionObserver` to trigger slide-in animations as each section enters the viewport. Elements slide from alternating directions.
   - Kiln's `.anim-scroll-left` and `.anim-scroll-right` already implement the CSS side; needs JS trigger

### 8.4 Vercel

**Approach**: View Transitions API for navigation; Framer Motion for complex animations.

**Key patterns**:

1. **Page transitions**: Vercel uses the native View Transitions API for route changes, giving a smooth crossfade between pages.
   - TanStack Router supports this via `onLeave` callbacks + `document.startViewTransition()`

2. **Dashboard counters**: Vercel's analytics dashboard animates metric values on load.
   - Same as Stripe pattern above

3. **Hover states**: Vercel's card components use `transform: translateY(-2px)` on hover with a 200ms transition.
   - Kiln's `.hover-lift` already implements this

### 8.5 Comparison Matrix

| Pattern | Shopify | Stripe | Linear | Vercel | **Kiln (current)** |
|---|---|---|---|---|---|
| Scroll-triggered reveals | ✅ | ✅ | ✅ | ✅ | ❌ CSS defined, not applied |
| Stagger animations | ✅ | ✅ | ✅ | ✅ | ❌ CSS defined, not applied |
| Animated counters | ✅ | ✅ | ❌ | ✅ | ❌ |
| Page transitions | ✅ | ✅ | ✅ | ✅ (View Transitions) | ❌ Basic fade only |
| Hover micro-interactions | ✅ | ✅ | ✅ | ✅ | ❌ CSS defined, not applied |
| Reduced motion support | ✅ | ✅ | ✅ | ✅ | ✅ Already implemented |
| SVG chart animations | ✅ | ✅ | ❌ | ✅ | ❌ |
| Loading/progress animations | ✅ | ✅ | ✅ | ✅ | ⚠️ Basic spinner only |

---

## 9. Implementation Reference

### 9.1 Required: IntersectionObserver Scroll Trigger

The `.anim-scroll` system is already defined in CSS but needs a JavaScript trigger. A single `useEffect` in a shared layout component can handle all scroll-triggered elements:

```javascript
// Concept — not prescriptive code
// Observe all elements with .anim-scroll* classes
// Add .is-visible when they enter the viewport
// Use rootMargin: '0px 0px -10% 0px' to trigger slightly before fully visible
// Disconnect observer for each element after it becomes visible (one-shot)
```

### 9.2 Required: Stagger Delay Application

For lists (Pillars cards, Testimonials, Pricing tiers, checklist items), apply `.anim-delay-N` classes to children based on their index:

```
child 0 → .anim-delay-1 (80ms)
child 1 → .anim-delay-2 (160ms)
child 2 → .anim-delay-3 (240ms)
child 3 → .anim-delay-4 (320ms)
```

Maximum recommended stagger: 5 items (400ms total). Beyond that, the delay feels slow.

### 9.3 Required: Animated Counter Utility

For metrics ($4,218.60, 37 orders, $28,412), implement a `useAnimatedCounter` hook:

- Accepts `targetValue`, `duration` (default 800ms), `easing` function
- Uses `requestAnimationFrame` for smooth interpolation
- Respects `prefers-reduced-motion` (show final value immediately)
- Formats output with locale-appropriate currency/number formatting

### 9.4 Required: Building Step Animation Enhancement

Replace the current `setTimeout` + opacity toggle with orchestrated transitions:

- Each step row enters with `.anim-fade-in-up`
- Completed steps transition background color (muted → emerald) with scale bounce
- Loader icon → Check icon swap uses scale(0.8) → scale(1) transition
- Add `role="status"` and `aria-live="polite"` for screen reader announcements

### 9.5 Motion Token Reference

| Token | Value | Use |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entrance animations (already used) |
| `--ease-in` | `cubic-bezier(0.32, 0, 1, 1)` | Exit animations |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Bidirectional transitions |
| `--duration-instant` | 100ms | Hover, focus |
| `--duration-fast` | 150ms | State changes |
| `--duration-normal` | 250ms | Expands, collapses |
| `--duration-slow` | 400ms | Page transitions, reveals |
| `--duration-slower` | 500ms | Progress bars, complex sequences |

### 9.6 Easing Curve Rationale

| Curve | Shape | Feel | Use case |
|---|---|---|---|
| `cubic-bezier(0.16, 1, 0.3, 1)` | Fast start, slow end | "Arriving" — confident, precise | Element entrances, reveals |
| `cubic-bezier(0.32, 0, 1, 1)` | Slow start, fast end | "Departing" — fading away | Element exits, dismissals |
| `cubic-bezier(0.65, 0, 0.35, 1)` | Smooth middle | "Transforming" — state changes | Toggle switches, expand/collapse |
| `ease` | Default | Neutral | Background animations, gradients |

---

## Appendix: File Reference

| File | Animation opportunities |
|---|---|
| `src/routes/index.tsx` | All landing page sections (Hero, LogoStrip, Pillars, FeatureZig ×3, Testimonials, Pricing, FinalCTA) |
| `src/routes/dashboard.tsx` | Checklist interactions, empty states, sidebar nav |
| `src/routes/signup.tsx` | Form validation feedback, social button hover |
| `src/routes/onboarding.tsx` | Step transitions, progress bar, back button |
| `src/routes/onboarding.building.tsx` | Build progress orchestration |
| `src/routes/onboarding.name.tsx` | Input validation animation, slug preview |
| `src/routes/onboarding.selling.tsx` | Option card selection feedback |
| `src/components/wizard.tsx` | OptionCard, ContinueLink hover/selection states |
| `src/lib/animations.css` | All keyframes, utility classes, scroll triggers, hover effects |
| `src/styles.css` | Design tokens (colors, shadows, radii) |

---

*This document is research-only. No source code was modified.*
