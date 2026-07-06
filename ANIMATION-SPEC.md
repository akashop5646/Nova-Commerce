# Kiln Animation & Fluidity Specification

> **Purpose**: Define a consistent animation language across all Kiln pages — from micro-interactions to page transitions — so the frontend developer can implement with confidence.
>
> **Stack**: TanStack Router + React 19 + Tailwind CSS v4 + `tw-animate-css`
>
> **Scope**: Read-only specification. No source code changes.

---

## Table of Contents

1. [Design Tokens & Global Easing](#1-design-tokens--global-easing)
2. [Utility Layer — CSS Custom Properties](#2-utility-layer--css-custom-properties)
3. [Per-Page Animation Spec](#3-per-page-animation-spec)
   - 3a. Landing Page (`/`)
   - 3b. Dashboard (`/dashboard`)
   - 3c. Signup (`/signup`)
   - 3d. Onboarding (`/onboarding/*`)
   - 3e. Onboarding Building (`/onboarding/building`)
4. [Micro-Interactions](#4-micro-interactions)
5. [Page Transitions](#5-page-transitions)
6. [Loading & Skeleton States](#6-loading--skeleton-states)
7. [Accessibility — `prefers-reduced-motion`](#7-accessibility--prefers-reduced-motion)
8. [Implementation Checklist](#8-implementation-checklist)

---

## 1. Design Tokens & Global Easing

### Easing Curves

Define these in `src/styles.css` as CSS custom properties under `:root` so every animation references the same timing function.

| Token | Value | Use Case |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary entrance/exit easing. Spring-like deceleration. |
| `--ease-in-out-sine` | `cubic-bezier(0.37, 0, 0.63, 1)` | Subtle ambient motion (skeleton pulse, progress fill). |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful overshoot for buttons, badges, cards on hover/select. |
| `--ease-linear` | `linear` | Utility only — avoid in user-facing animations. |

### Duration Tokens

| Token | Value | Use Case |
|---|---|---|
| `--duration-fast` | `150ms` | Hover color transitions, focus ring, icon rotations. |
| `--duration-normal` | `300ms` | Card lifts, nav hovers, expand/collapse, stagger intervals. |
| `--duration-slow` | `500ms` | Page entrance sequences, progress bars, skeleton pulse. |
| `--duration-slower` | `700ms` | Large hero entrance, decorative background movement. |

### Stagger Tokens

| Token | Value | Use Case |
|---|---|---|
| `--stagger-fast` | `50ms` | Items in a list (nav, checklist rows, footer links). |
| `--stagger-normal` | `80ms` | Cards in a grid (pillars, pricing, testimonials). |
| `--stagger-slow` | `120ms` | Major page sections (Hero → LogoStrip → Pillars). |

### CSS Implementation Location

Add to the `:root` block in `src/styles.css`:

```css
:root {
  /* ...existing tokens... */

  /* Easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-sine: cubic-bezier(0.37, 0, 0.63, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 700ms;

  /* Stagger */
  --stagger-fast: 50ms;
  --stagger-normal: 80ms;
  --stagger-slow: 120ms;
}
```

---

## 2. Utility Layer — CSS Custom Properties

### Tailwind v4 Utility Extensions

Register custom Tailwind utilities in `@theme inline` or as `@utility` rules so developers can use semantic class names:

```css
/* In @theme inline, add transition-property tokens */
--transition-spring: all var(--duration-normal) var(--ease-out-expo);
--transition-bounce: all var(--duration-normal) var(--ease-spring);
--transition-fade: opacity var(--duration-normal) var(--ease-in-out-sine);

/* Custom @utility rules */
@utility animate-fade-up {
  animation: fade-up var(--duration-slow) var(--ease-out-expo) both;
}

@utility animate-fade-in {
  animation: fade-in var(--duration-normal) var(--ease-in-out-sine) both;
}

@utility animate-scale-in {
  animation: scale-in var(--duration-normal) var(--ease-spring) both;
}

@utility animate-slide-in-right {
  animation: slide-in-right var(--duration-slow) var(--ease-out-expo) both;
}

@utility animate-slide-in-left {
  animation: slide-in-left var(--duration-slow) var(--ease-out-expo) both;
}

@utility animate-counter {
  animation: counter-up var(--duration-slower) var(--ease-out-expo) both;
}

/* Keyframes */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slide-in-left {
  from { opacity: 0; transform: translateX(-24px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes counter-up {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes underline-slide {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@keyframes shimmer {
  from { background-position: -200% 0; }
  to   { background-position: 200% 0; }
}
```

### Stagger Helper

Use inline `style` props for stagger delays. The pattern:

```tsx
style={{ animationDelay: `calc(${index} * var(--stagger-normal))` }}
```

This keeps stagger logic declarative without JavaScript timer dependencies.

---

## 3. Per-Page Animation Spec

### 3a. Landing Page (`/`)

#### SiteHeader

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Header bar | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 0ms | On load |
| Logo icon | `scale-in` | `--duration-normal` | `--ease-spring` | 0ms | On load |
| Nav links | `fade-in` (each) | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On load |
| CTA button "Start free trial" | `fade-in` | `--duration-normal` | `--ease-out-expo` | 100ms | On load |

#### Hero

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Badge ("New — one-click TikTok Shop sync") | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | On load |
| Headline ("Start, run, and grow…") | `fade-up` | `--duration-slow` | `--ease-out-expo` | 80ms | On load |
| Subheadline paragraph | `fade-up` | `--duration-slow` | `--ease-out-expo` | 160ms | On load |
| CTA buttons row | `fade-up` | `--duration-slow` | `--ease-out-expo` | 240ms | On load |
| Fine print ("3-day free trial…") | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 400ms | On load |
| HeroMock (dashboard card) | `fade-up` + `scale(0.98→1)` | `--duration-slower` | `--ease-out-expo` | 200ms | On load |
| Floating "New order" card | `fade-in` + `translateY(8→0)` | `--duration-slow` | `--ease-spring` | 600ms | On load (bouncy entrance) |
| Background radial gradient | Subtle `opacity: 0.5→0.6` pulse | `3s` | `--ease-in-out-sine` | — | Continuous ambient |

#### HeroMock — Bar Chart

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Bar columns (12 bars) | `scaleY(0→1)` from bottom | `--duration-slow` | `--ease-out-expo` | `i * 50ms` | On load (staggered) |

#### LogoStrip

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| "Two million businesses…" text | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 0ms | Scroll into view |
| Brand name logos (7 items) | `fade-in` (each) | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | Scroll into view |

#### Pillars (4-card grid)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Section eyebrow + heading | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | Scroll into view |
| Pillar card (×4) | `fade-up` | `--duration-slow` | `--ease-out-expo` | `i * --stagger-normal` | Scroll into view |
| Icon inside card | `scale-in` | `--duration-normal` | `--ease-spring` | `(i * --stagger-normal) + 100ms` | Scroll into view (slightly delayed relative to card) |

#### FeatureZig (×3 sections)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Text column (eyebrow, heading, body, link) | `fade-up` (staggered children) | `--duration-slow` | `--ease-out-expo` | `0, 80, 160, 240ms` | Scroll into view |
| Mock column (StorefrontMock, CheckoutMock, AnalyticsMock) | `fade-up` + subtle `translateX(±12→0)` | `--duration-slow` | `--ease-out-expo` | 120ms | Scroll into view |
| "Learn more" link underline | `underline-slide` (scaleX) | `--duration-normal` | `--ease-out-expo` | — | Hover |

#### StorefrontMock — Product Grid

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Product card (×4) | `scale-in` | `--duration-normal` | `--ease-spring` | `i * --stagger-fast` | Scroll into view |

#### AnalyticsMock — Line Chart

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| SVG path stroke | `stroke-dashoffset` from full to 0 | `1200ms` | `--ease-out-expo` | 200ms | Scroll into view |
| SVG area fill | `opacity: 0→1` | `800ms` | `--ease-in-out-sine` | 800ms | After stroke completes |
| Stat boxes (Sessions, Conv. rate, Avg. order) | `fade-up` | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | Scroll into view |

#### Testimonials

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Heading + stars | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | Scroll into view |
| Testimonial card (×3) | `fade-up` | `--duration-slow` | `--ease-out-expo` | `i * --stagger-normal` | Scroll into view |
| Metric badge | `scale-in` | `--duration-normal` | `--ease-spring` | `(i * --stagger-normal) + 200ms` | Scroll into view |

#### Pricing

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Section heading + description | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | Scroll into view |
| Pricing tier (×3) | `fade-up` | `--duration-slow` | `--ease-out-expo` | `i * --stagger-normal` | Scroll into view |
| Highlighted tier ("Grow") | `fade-up` + subtle `scale(1.01→1)` | `--duration-slow` | `--ease-spring` | `1 * --stagger-normal` | Scroll into view (spring for emphasis) |
| "Most popular" badge | `scale-in` | `--duration-normal` | `--ease-spring` | `(1 * --stagger-normal) + 200ms` | Scroll into view |

#### FinalCTA

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| CTA card container | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | Scroll into view |
| Zap icon | `scale-in` + slight rotation | `--duration-normal` | `--ease-spring` | 0ms | Scroll into view |
| Headline | `fade-up` | `--duration-slow` | `--ease-out-expo` | 80ms | Scroll into view |
| Subtext + button | `fade-up` | `--duration-slow` | `--ease-out-expo` | 160ms | Scroll into view |

#### SiteFooter

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Footer columns (×5) | `fade-up` | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | Scroll into view |
| Bottom bar (copyright, links) | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 200ms | Scroll into view |

---

### 3b. Dashboard (`/dashboard`)

#### Sidebar

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Sidebar panel | `slide-in-left` | `--duration-slow` | `--ease-out-expo` | 0ms | On mount |
| Logo | `scale-in` | `--duration-normal` | `--ease-spring` | 100ms | On mount |
| Nav items (×10) | `fade-in` | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On mount |

#### TopBar

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| TopBar container | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 0ms | On mount |
| Search input | `fade-in` + `scaleX(0.98→1)` | `--duration-normal` | `--ease-out-expo` | 100ms | On mount |
| Bell icon + avatar | `scale-in` | `--duration-normal` | `--ease-spring` | 150ms | On mount |

#### Main Content — Greeting

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Greeting heading ("Good morning…") | `fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | On mount |
| Subtext | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 100ms | On mount |

#### Setup Guide Section

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Card container | `fade-up` | `--duration-slow` | `--ease-out-expo` | 150ms | On mount |
| Section header (eyebrow, heading, description) | `fade-up` (staggered) | `--duration-normal` | `--ease-out-expo` | `0, 60, 120ms` | On mount |
| Progress bar fill | `width: 0→{percent}%` | `--duration-slow` | `--ease-out-expo` | 300ms | On mount |
| Checklist items (×6) | `fade-up` | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On mount |
| Expand/collapse chevron | `rotate(0→180°)` | `--duration-fast` | `--ease-out-expo` | — | On click |
| Checklist item content (expand) | `fade-up` + `height: auto` | `--duration-normal` | `--ease-out-expo` | 0ms | On click |
| Check circle (mark done) | `scale-in` with `--ease-spring` | `--duration-normal` | `--ease-spring` | 0ms | On click |
| Strikethrough on completed text | `opacity: 1→0.5` + `line-through` | `--duration-fast` | `--ease-in-out-sine` | 0ms | On click |

#### Empty Stat Cards

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Stat card (×3) | `fade-up` | `--duration-slow` | `--ease-out-expo` | `i * --stagger-normal` | On mount |
| Value text ("$0.00") | `fade-in` | `--duration-normal` | `--ease-out-expo` | `(i * --stagger-normal) + 100ms` | On mount |

#### Empty Orders Section

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Card container | `fade-up` | `--duration-slow` | `--ease-out-expo` | 300ms | On mount |
| Shopping bag icon | `scale-in` | `--duration-normal` | `--ease-spring` | 400ms | On mount |
| Heading + text + CTA | `fade-up` (staggered) | `--duration-normal` | `--ease-out-expo` | `0, 80, 160ms` | On mount |

---

### 3c. Signup (`/signup`)

#### Left Panel (Desktop)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Green gradient panel | `fade-in` | `--duration-slower` | `--ease-in-out-sine` | 0ms | On mount |
| Logo + brand | `fade-in` | `--duration-normal` | `--ease-out-expo` | 200ms | On mount |
| Blockquote | `fade-up` | `--duration-slow` | `--ease-out-expo` | 400ms | On mount |
| Attribution text | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 600ms | On mount |

#### Right Panel — Form

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Mobile logo (hidden on lg) | `fade-in` | `--duration-normal` | `--ease-out-expo` | 0ms | On mount |
| Heading "Create your account" | `fade-up` | `--duration-slow` | `--ease-out-expo` | 100ms | On mount |
| Subtext | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 200ms | On mount |
| Social buttons (Google, Apple) | `fade-up` (each) | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On mount |
| Divider ("or") | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 200ms | On mount |
| Form fields (Email, Password) | `fade-up` (each) | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On mount |
| Submit button "Create account" | `fade-up` | `--duration-normal` | `--ease-out-expo` | 200ms | On mount |
| Error message | `fade-in` + `translateY(4→0)` | `--duration-fast` | `--ease-out-expo` | 0ms | On validation error |
| Terms text | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 300ms | On mount |
| "Already have an account?" | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 350ms | On mount |

---

### 3d. Onboarding (`/onboarding/*`)

#### Layout Chrome

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Header bar | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 0ms | On mount |
| Logo | `scale-in` | `--duration-normal` | `--ease-spring` | 0ms | On mount |
| Progress bar fill | `width: 0→{progress}%` | `--duration-slow` | `--ease-out-expo` | 200ms | On mount / step change |
| Step counter text | `fade-in` | `--duration-fast` | `--ease-in-out-sine` | 0ms | On step change |
| Back link | `fade-in` | `--duration-fast` | `--ease-out-expo` | 0ms | On step change |

#### Step Content (via `<Outlet />`)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Step content wrapper (`<div key={pathname}>`) | `animate-fade-up` | `--duration-slow` | `--ease-out-expo` | 0ms | On route change (key change triggers re-mount) |
| `StepTitle` — eyebrow | `fade-in` | `--duration-normal` | `--ease-out-expo` | 0ms | On mount |
| `StepTitle` — heading | `fade-up` | `--duration-slow` | `--ease-out-expo` | 80ms | On mount |
| `StepTitle` — subtitle | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 160ms | On mount |

#### Option Cards (via `wizard.tsx` `<OptionCard />`)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Option card (each) | `fade-up` | `--duration-normal` | `--ease-out-expo` | `i * --stagger-fast` | On mount |
| Selected indicator (check/checkbox) | `scale-in` | `--duration-normal` | `--ease-spring` | 0ms | On select |
| Card border → selected state | `border-color` transition | `--duration-fast` | `--ease-in-out-sine` | 0ms | On select |

#### Continue Button (via `wizard.tsx` `<ContinueLink />`)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Button entrance | `fade-up` | `--duration-normal` | `--ease-out-expo` | 200ms | On mount |
| Disabled → enabled state | `opacity: 0.5→1` | `--duration-fast` | `--ease-in-out-sine` | 0ms | On enable |

---

### 3e. Onboarding Building (`/onboarding/building`)

| Element | Animation | Duration | Easing | Delay | Trigger |
|---|---|---|---|---|---|
| Logo icon | `scale-in` with `--ease-spring` | `--duration-slow` | `--ease-spring` | 0ms | On mount |
| Heading ("Building {store}…") | `fade-up` | `--duration-slow` | `--ease-out-expo` | 200ms | On mount |
| Subtext | `fade-in` | `--duration-normal` | `--ease-in-out-sine` | 400ms | On mount |
| Step items (×4) | `fade-up` (each) | `--duration-normal` | `--ease-out-expo` | `i * --stagger-normal` | On mount |
| Active step spinner | `animate-spin` (existing) | — | — | — | While active |
| Step → completed transition | Check icon `scale-in` with `--ease-spring` | `--duration-normal` | `--ease-spring` | 0ms | On completion |
| Step opacity (inactive) | `opacity: 0.4` | `--duration-fast` | `--ease-in-out-sine` | 0ms | On step change |

---

## 4. Micro-Interactions

### Buttons

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover (primary)** | `transform: translateY(-1px)` + `box-shadow` elevation increase (from `--shadow-soft` to `--shadow-card`) + `opacity: 0.9→1` | `--duration-fast` | `--ease-out-expo` |
| **Hover (secondary/ghost)** | `background-color` shift to `bg-muted` | `--duration-fast` | `--ease-in-out-sine` |
| **Active/Pressed** | `transform: translateY(0)` + `scale(0.98)` | `--duration-fast` | `--ease-spring` |
| **Focus visible** | `ring-2 ring-ring/30` with `outline-offset: 2px` | `--duration-fast` | `--ease-in-out-sine` |
| **Disabled** | `opacity: 0.5` + `cursor: not-allowed` (no animation) | — | — |

**Implementation**: Add `transition` + specific properties to button base classes. Use `hover:-translate-y-px hover:shadow-[var(--shadow-card)] active:scale-[0.98]` as Tailwind utilities, or define a custom `@utility` for consistency.

### Cards (Pillars, Pricing, Testimonials, Stat Cards)

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover** | `transform: translateY(-2px)` + `box-shadow: var(--shadow-card)` (from `shadow-none` or `shadow-sm`) | `--duration-normal` | `--ease-out-expo` |
| **Default** | `transform: translateY(0)` + `box-shadow: none` | `--duration-normal` | `--ease-out-expo` |

**Implementation**: Apply `transition-all` with `duration-[--duration-normal] ease-[--ease-out-expo]` and `hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]`. The Pillars cards already use `hover:shadow-[var(--shadow-card)]` — add `hover:-translate-y-0.5`.

### Form Inputs (Signup, Dashboard search)

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Focus** | `ring-2 ring-ring/30` + `border-color` shift to `--ring` color | `--duration-fast` | `--ease-in-out-sine` |
| **Blur (unfocus)** | Return to default `border-border` + no ring | `--duration-fast` | `--ease-in-out-sine` |
| **Error state** | `ring-2 ring-destructive/30` + `border-destructive` | `--duration-fast` | `--ease-in-out-sine` |

**Implementation**: Already partially implemented with `focus:ring-2 focus:ring-ring/30`. Enhance by adding `transition-all duration-[--duration-fast]` to input base class. Ensure `border-color` is included in the transition.

### Sidebar Nav Items (Dashboard)

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover (inactive)** | `background-color: muted/60` + `translateX(2px)` | `--duration-fast` | `--ease-out-expo` |
| **Default (inactive)** | `background-color: transparent` + `translateX(0)` | `--duration-fast` | `--ease-out-expo` |
| **Active** | `background-color: foreground/[0.06]` (no translate) | — | — |

**Implementation**: Add `hover:translate-x-0.5` to inactive nav button classes. The `transition` class is already present.

### Links (Underline Slide-In)

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover** | Decorative underline `scaleX: 0→1` from left origin | `--duration-normal` | `--ease-out-expo` |
| **Default** | Decorative underline `scaleX: 0` (hidden) | — | — |

**Implementation pattern**:

```tsx
// For text links with animated underline:
<a className="group relative inline-block">
  <span>Learn more</span>
  <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-terracotta transition-transform duration-[--duration-normal] ease-[--ease-out-expo] group-hover:scale-x-100" />
</a>
```

The "Learn more" links in FeatureZig already have `decoration-[var(--terracotta)] decoration-2 underline-offset-4` — replace with the animated underline pattern for a more fluid feel.

### Social Login Buttons (Signup)

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover** | `background-color: bg-muted` + `border-color` subtle shift | `--duration-fast` | `--ease-in-out-sine` |
| **Active** | `scale(0.98)` | `--duration-fast` | `--ease-spring` |

### Pricing Tier Hover

| State | Transformation | Duration | Easing |
|---|---|---|---|
| **Hover (non-highlighted)** | `translateY(-2px)` + `shadow-card` | `--duration-normal` | `--ease-out-expo` |
| **Hover (highlighted "Grow")** | `translateY(-2px)` + subtle `scale(1.01)` | `--duration-normal` | `--ease-spring` |

---

## 5. Page Transitions

### Recommended Approach: Fade-Through

Use TanStack Router's `Transition` or route-level wrapper for a cohesive feel.

**Behavior**:
- Outgoing page: `opacity: 1→0` over `200ms` with `ease-in-out-sine`
- Incoming page: `opacity: 0→1` + `translateY(8→0)` over `300ms` with `ease-out-expo`
- Overlap: 100ms crossfade (outgoing starts fading, incoming starts entering)

**Implementation Strategy**:

Create a `PageTransition` wrapper component that wraps `<Outlet />` in `__root.tsx` or a layout route:

```tsx
// Pseudocode — not actual implementation
function PageTransition({ children }) {
  const location = useLocation();
  return (
    <div
      key={location.pathname}
      className="animate-fade-up"
      style={{ animationDuration: 'var(--duration-slow)' }}
    >
      {children}
    </div>
  );
}
```

The `key` change on route navigation triggers React unmount/remount, which fires the CSS animation.

**Special Cases**:

| Transition | Behavior |
|---|---|
| `/ → /signup` | Fade-through (default) |
| `/signup → /onboarding/name` | Slide-left (outgoing slides left, incoming slides in from right) — signals forward progress |
| `/onboarding/* → /onboarding/*` (step change) | Fade-up only on content area (header/progress bar stays stable, only `<Outlet />` animates) |
| `/onboarding/building → /dashboard` | Fade-through with slightly longer duration (500ms) — "reveal" moment |
| `/dashboard → /` | Fade-through (default) |

**Existing Animation**: The onboarding layout already uses `<div key={pathname} className="w-full animate-fade-in">` around `<Outlet />`. Upgrade this to `animate-fade-up` for the vertical slide effect.

---

## 6. Loading & Skeleton States

### Dashboard Stat Cards — Skeleton Placeholders

When dashboard data is loading (or for the current empty state), use skeleton placeholders with a shimmer effect.

**Skeleton Component Enhancement**:

The existing `Skeleton` component uses `animate-pulse`. Enhance with a shimmer gradient for a more polished feel:

```css
@utility animate-shimmer {
  background: linear-gradient(
    90deg,
    var(--muted) 0%,
    oklch(0.96 0.01 80) 50%,
    var(--muted) 100%
  );
  background-size: 200% 100%;
  animation: shimmer var(--duration-slower) var(--ease-in-out-sine) infinite;
}
```

**Skeleton Layout for Stat Cards**:

```
┌─────────────────────┐
│ ▓▓▓▓▓▓▓▓▓▓ (title)  │  ← Skeleton line, 40% width, height 12px
│ ▓▓▓▓▓▓▓▓▓▓▓▓ (val)  │  ← Skeleton line, 60% width, height 32px, mt-1
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓ (hint)│  ← Skeleton line, 80% width, height 12px, mt-2
└─────────────────────┘
```

**Stagger**: Each stat card skeleton fades in with `i * --stagger-normal` delay.

### Progress Bar Animation

Already implemented with `transition-all duration-500`. Enhance:

| Property | Current | Proposed |
|---|---|---|
| Duration | `500ms` (hardcoded) | `var(--duration-slow)` (500ms, but tokenized) |
| Easing | Default (ease) | `var(--ease-out-expo)` for a snappier fill |
| Visual | Solid terracotta fill | Add subtle gradient: `linear-gradient(90deg, var(--terracotta), oklch(0.72 0.13 40))` |

### Onboarding Building Steps

The step completion animation is already handled by the `setTimeout` cascade (900ms intervals). Enhance:

| Element | Enhancement |
|---|---|
| Step item opacity transition | Already uses inline `opacity` style — add `transition: opacity var(--duration-fast) var(--ease-in-out-sine)` |
| Check icon entrance | Add `animate-scale-in` class when `done` becomes true |
| Spinner → Check swap | Crossfade: spinner `opacity: 1→0` + check `opacity: 0→1` over `200ms` |

---

## 7. Accessibility — `prefers-reduced-motion`

### Global Rule

Add to `src/styles.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Behavior**: All entrance animations, micro-interactions, and transitions are effectively instant. Elements appear immediately without motion. Progress bars fill instantly. Skeleton pulse is instant (still visible as a static placeholder).

### Per-Element Handling

| Animation Type | Reduced Motion Behavior |
|---|---|
| `fade-up` entrance | Elements appear instantly (no translateY, no opacity transition) |
| `scale-in` | Elements appear at final scale instantly |
| Page transitions | Instant swap (no crossfade) |
| Button hover lift | No translateY — color change only |
| Card hover lift | No translateY — shadow change only |
| Sidebar nav translateX | No translate — background color change only |
| Underline slide-in | Instant appearance (scaleX goes to 1 immediately) |
| Skeleton shimmer | Static muted background (no gradient animation) |
| Progress bar fill | Instant fill to final width |
| Bar chart bars | All bars appear at final height instantly |
| SVG line chart draw | Path appears fully drawn instantly |

### Implementation Note

The global `@media (prefers-reduced-motion: reduce)` rule handles 90% of cases. For any JavaScript-driven animations (e.g., scroll-triggered entrance via `IntersectionObserver`), check `window.matchMedia('(prefers-reduced-motion: reduce)')` and skip the animation registration if true.

---

## 8. Implementation Checklist

### Phase 1 — Foundation (styles.css)

- [ ] Add easing tokens (`--ease-out-expo`, `--ease-in-out-sine`, `--ease-spring`) to `:root`
- [ ] Add duration tokens (`--duration-fast`, `--duration-normal`, `--duration-slow`, `--duration-slower`) to `:root`
- [ ] Add stagger tokens (`--stagger-fast`, `--stagger-normal`, `--stagger-slow`) to `:root`
- [ ] Add `@keyframes` for `fade-up`, `fade-in`, `scale-in`, `slide-in-right`, `slide-in-left`, `underline-slide`, `shimmer`
- [ ] Add `@utility` rules for `animate-fade-up`, `animate-fade-in`, `animate-scale-in`, `animate-slide-in-right`, `animate-slide-in-left`, `animate-shimmer`
- [ ] Add `@media (prefers-reduced-motion: reduce)` global override

### Phase 2 — Scroll-Triggered Entrances (Landing Page)

- [ ] Install or implement a lightweight `IntersectionObserver` hook (e.g., `useInView` from a small custom hook or `@radix-ui/react-use-in-view`)
- [ ] Apply `animate-fade-up` with stagger delays to: Pillar cards, FeatureZig sections, Testimonial cards, Pricing tiers, Footer columns
- [ ] Apply `animate-scale-in` with stagger to: Product mockup cards, Metric badges
- [ ] Apply `animate-fade-in` to: LogoStrip brands, Footer bottom bar

### Phase 3 — Hero Entrance (Landing Page)

- [ ] Implement staggered `fade-up` for Hero text elements (badge → headline → subhead → CTAs → fine print)
- [ ] Implement `fade-up` + `scale` for HeroMock card
- [ ] Implement bouncy entrance for floating "New order" card
- [ ] Implement bar chart `scaleY` animation with stagger

### Phase 4 — Micro-Interactions

- [ ] Enhance primary button: add `hover:-translate-y-px hover:shadow-[var(--shadow-card)] active:scale-[0.98]`
- [ ] Enhance cards: add `hover:-translate-y-0.5` (Pillars, Pricing, Testimonials)
- [ ] Enhance sidebar nav: add `hover:translate-x-0.5` to inactive items
- [ ] Implement animated underline on "Learn more" links
- [ ] Enhance input focus transitions: add `transition-all duration-[--duration-fast]`

### Phase 5 — Dashboard Animations

- [ ] Apply staggered `fade-up` to sidebar nav items on mount
- [ ] Apply `fade-up` stagger to setup guide checklist items
- [ ] Enhance progress bar easing to `--ease-out-expo`
- [ ] Add `scale-in` to check circle on task completion
- [ ] Apply staggered `fade-up` to stat cards

### Phase 6 — Signup & Onboarding

- [ ] Apply staggered `fade-up` to signup form elements
- [ ] Apply `fade-up` to left panel content (desktop)
- [ ] Upgrade onboarding content wrapper from `animate-fade-in` to `animate-fade-up`
- [ ] Apply staggered `fade-up` to option cards in wizard
- [ ] Add `scale-in` to selected indicator in option cards

### Phase 7 — Page Transitions

- [ ] Create `PageTransition` wrapper component
- [ ] Wrap `<Outlet />` in root layout or relevant layout routes
- [ ] Configure fade-through for most transitions
- [ ] Configure slide-left for signup → onboarding progression
- [ ] Test with TanStack Router's route change lifecycle

### Phase 8 — Loading States

- [ ] Enhance `Skeleton` component with shimmer gradient
- [ ] Create skeleton layouts for dashboard stat cards
- [ ] Add skeleton shimmer keyframe animation
- [ ] Test skeleton → content transition

---

## Appendix: Tailwind Class Reference

Quick reference for the developer — the Tailwind classes that correspond to each animation type:

| Animation | Tailwind Classes |
|---|---|
| Fade up entrance | `animate-fade-up` (custom utility) |
| Fade in | `animate-fade-in` (custom utility) |
| Scale in | `animate-scale-in` (custom utility) |
| Slide in right | `animate-slide-in-right` (custom utility) |
| Slide in left | `animate-slide-in-left` (custom utility) |
| Button hover lift | `transition-all duration-[150ms] ease-[var(--ease-out-expo)] hover:-translate-y-px hover:shadow-[var(--shadow-card)]` |
| Button press | `active:scale-[0.98]` |
| Card hover lift | `transition-all duration-[300ms] ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]` |
| Nav hover slide | `transition-all duration-[150ms] ease-[var(--ease-out-expo)] hover:translate-x-0.5` |
| Input focus ring | `transition-all duration-[150ms] focus:ring-2 focus:ring-ring/30` |
| Shimmer skeleton | `animate-shimmer` (custom utility) |
| Stagger delay | `style={{ animationDelay: 'calc(N * var(--stagger-normal))' }}` |

---

*Specification authored for the Kiln frontend team. All timing values are tuned for the warm paper/ink aesthetic with terracotta and emerald accents — animations should feel deliberate, warm, and unhurried, never bouncy or distracting.*
