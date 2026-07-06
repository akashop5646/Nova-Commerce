# Kiln — UX Architecture & Motion Specification

> **Purpose**: Define animation choreography, perceived-performance strategies, and emotional-design tokens
> across the four core pages (Landing, Signup, Onboarding, Dashboard).
> **Scope**: Specification only — no source code modifications.

---

## 1. Information Hierarchy & Visual Flow

### 1.1 Landing Page — `index.tsx`

**Page purpose**: Convert visitors into trial signups.
**Primary CTA**: "Start free trial" button.
**Secondary CTA**: "Watch demo" button.

**Eye movement: Z-pattern.**
The page is a long-scroll marketing page with alternating left/right feature sections (the `FeatureZig` component). A Z-pattern applies at the viewport level within each section, while the overall scroll follows an F-pattern for the hero area.

| Zone | Element | Visual Weight | Rationale |
|------|---------|---------------|-----------|
| **Hero — top-left** | Announcement pill ("New — one-week TikTok Shop sync") | Low | Sets context, low friction |
| **Hero — left** | Headline "Start, run, *and grow* your business." | **Highest** | First impression, emotional hook |
| **Hero — left** | Subtext paragraph | Medium | Supports headline, clarifies value |
| **Hero — left** | CTA row (Start free trial + Watch demo) | **High** | Conversion target |
| **Hero — right** | HeroMock (dashboard preview) | Medium-High | Social proof via "real" product screenshot |
| **Below fold** | Logo strip (social proof) | Low | Trust reinforcement, no action needed |
| **Pillars section** | 4-column feature cards | Medium | Scan-level overview |
| **Feature zig-zags** | Alternating text + mock | Medium | Deep-dive, one feature per viewport |
| **Testimonials** | 3-card grid with quotes + metrics | Medium | Trust building |
| **Pricing** | 3-tier pricing cards | **High** | Decision point |
| **Final CTA** | Gradient banner with button | **High** | Last conversion opportunity |

**Reading order within each FeatureZig section:**
1. Eyebrow label (terracotta color draws the eye)
2. Heading (large display font)
3. Body text (supporting detail)
4. "Learn more" link
5. Mock illustration (confirms understanding)

When `reverse` is true, the mock appears on the left (desktop) — the eye still reads text left first, then verifies with the visual on the right.

### 1.2 Dashboard — `dashboard.tsx`

**Page purpose**: Guide new merchants through store setup; display business metrics.
**Primary CTA**: Setup task actions (Add product, Customize theme, etc.).

**Reading order (F-pattern for scanning):**

| Priority | Zone | Element |
|----------|------|---------|
| 1 | Top-left | Greeting ("Good morning, {name}.") |
| 2 | Below greeting | Setup guide card (the dominant visual block) |
| 3 | Progress bar inside setup guide | Current completion % |
| 4 | Checklist items | Expand/collapse accordion |
| 5 | Below setup guide | Empty stat cards (Total sales, Sessions, Orders) |
| 6 | Bottom | "No orders yet" empty state |

The sidebar is a persistent navigation element, not part of the content flow. It should be visually quieter than the main content area.

### 1.3 Signup — `signup.tsx`

**Page purpose**: Frictionless account creation.
**Primary CTA**: Social login buttons (Google, Apple) or email form submit.

**Reading order (linear, top-to-bottom):**

| Step | Element | Notes |
|------|---------|-------|
| 1 | Logo (mobile only) or left panel testimonial | Context setting |
| 2 | "Create your account" heading | Confirmation of intent |
| 3 | Social login buttons | **Primary path** — lowest friction |
| 4 | "or" divider | Transition to secondary path |
| 5 | Email + password form | Fallback path |
| 6 | Terms text | Legal, minimal weight |

**Desktop (split layout):** Left panel is purely atmospheric — the testimonial quote provides social proof while the user's eye focuses on the right-side form. The dark left panel creates visual weight that balances the form without competing for attention.

### 1.4 Onboarding — `onboarding.tsx` + child routes

**Page purpose**: Walk new users through 5 setup steps.
**Primary CTA**: "Next" / "Continue" (in child routes, not shown in layout).

**Reading order:**

1. Logo + progress bar (header) — always visible, always oriented
2. Back link (when not on first step) — secondary navigation
3. Main content area (centered, single column) — the active step's form/question
4. Step counter text ("Step 3 of 5") — subtle orientation

The layout is deliberately minimal — no sidebar, no distractions. The `key={pathname}` on the content wrapper means each step is a fresh mount, which is the right moment for transition animations.

---

## 2. Motion Choreography

### 2.1 Landing Page Entrance Animations

**Overall principle**: Elements should feel like they are *revealing themselves* to the user as they scroll, not flying in from nowhere. The motion should feel like the page is unfolding, not performing.

#### Hero Section (above the fold — immediate load)

| Element | Animation | Timing | Easing |
|---------|-----------|--------|--------|
| Announcement pill | Fade in + translate down 8px | 0ms delay, 400ms duration | `ease-out` |
| Headline | Fade in + translate down 16px | 100ms delay, 500ms duration | `ease-out` |
| Subtext | Fade in + translate down 12px | 200ms delay, 400ms duration | `ease-out` |
| CTA buttons | Fade in + translate down 12px | 300ms delay, 400ms duration | `ease-out` |
| Trial details text | Fade in | 400ms delay, 300ms duration | `ease-out` |
| HeroMock (dashboard preview) | Fade in + scale from 0.96 to 1 | 250ms delay, 600ms duration | `ease-out` |
| Floating "New order" card | Fade in + translate up from bottom | 800ms delay, 500ms duration | `ease-out` |

**Stagger principle**: Left column elements enter first (they carry the message), right column mock enters slightly later (it's visual confirmation). The floating notification card enters last — it's a delightful surprise that rewards scrolling attention.

#### Logo Strip

| Element | Animation | Trigger |
|---------|-----------|---------|
| Brand names | Fade in sequentially, 50ms stagger between each | On scroll into viewport (IntersectionObserver) |
| Uppercase label | Fade in + translate up 8px | Before brand names |

#### Pillars (4-column feature cards)

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section eyebrow | Fade in + translate up 12px | On scroll into viewport |
| Heading | Fade in + translate up 12px, 100ms after eyebrow | On scroll into viewport |
| 4 cards | Fade in + translate up 20px, 80ms stagger between cards | On scroll into viewport, after heading |

#### Feature Zig-Zag Sections (×3)

| Element | Animation | Trigger |
|---------|-----------|---------|
| Text column (eyebrow, heading, body, link) | Fade in + translate up 20px | On scroll into viewport |
| Mock column | Fade in + translate up 24px + scale 0.97→1, 150ms after text | On scroll into viewport |

When `reverse` is true, the mock is on the left (via `lg:order-1`) — the animation direction should still feel like the mock is "arriving" from below, not from the opposite side. This keeps the scroll-based reveal consistent.

**Zig-zag rhythm**: Alternate sections should feel like a conversation — "here's the claim" (text enters first) → "here's the proof" (mock arrives). This creates a satisfying call-and-response cadence.

#### Testimonials

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section heading | Fade in + translate up 12px | On scroll into viewport |
| Star rating | Fade in, 200ms after heading | On scroll into viewport |
| 3 testimonial cards | Fade in + translate up 20px, 100ms stagger | On scroll into viewport |

#### Pricing

| Element | Animation | Trigger |
|---------|-----------|---------|
| Section header (eyebrow, heading, subtext) | Fade in + translate up 12px | On scroll into viewport |
| 3 pricing cards | Fade in + translate up 24px, 100ms stagger | On scroll into viewport, after header |
| Highlighted card ("Grow") | Additionally: subtle scale 1.0→1.02 on hover (CSS only) | Hover |

#### Final CTA Banner

| Element | Animation | Trigger |
|---------|-----------|---------|
| Gradient background | Already visible (static) | — |
| Zap icon | Fade in + rotate -10°→0° | On scroll into viewport |
| Heading | Fade in + translate up 12px | 100ms after icon |
| Subtext | Fade in + translate up 12px | 200ms after icon |
| Button | Fade in + translate up 12px | 300ms after icon |

### 2.2 Dashboard Interactions

#### Setup Guide — Task Completion

This is the most important micro-interaction in the product. When a user clicks a checkbox to mark a task complete:

| Moment | Animation | Duration |
|--------|-----------|----------|
| Checkbox tap | Circle fills with `var(--emerald)`, check icon scales from 0→1 with elastic ease | 300ms |
| Task title | Text gets `line-through` decoration, fades to `muted-foreground` | 200ms |
| Progress bar | Width animates to new percentage | 500ms, ease-out |
| Progress text | Counter updates (e.g., "2 of 6" → "3 of 6") | Immediate |
| PartyPopper icon | If percent > 50%, opacity transitions from 0.35→1 | 400ms |

**When ALL tasks complete:**

| Moment | Animation | Duration |
|--------|-----------|----------|
| Setup guide header | Text changes to "Setup complete." | — |
| Confetti burst | 15-20 small particles (terracotta, emerald, gold) burst from the progress bar area, arc outward and fade | 1200ms total |
| Progress bar | Fills to 100% and pulses once (scale 1.0→1.03→1.0) | 600ms |
| Dismiss button | Fades in (was hidden for incomplete state) | 300ms |

**Dismiss animation**: When user clicks X on the completed setup guide:
- Entire card collapses height to 0 with opacity fade
- Duration: 400ms
- After collapse, below content (stat cards, empty state) slides up to fill the gap

#### Sidebar Navigation

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Hover (inactive item) | Background fades to `muted/60`, text to `foreground` | 150ms |
| Active item indicator | Left border or background highlight | 150ms |
| Click (navigate) | Active state transitions to new item | 150ms crossfade |

Keep sidebar transitions fast — they're utility interactions, not moments for delight.

#### TopBar Search

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Focus on search input | Width expands from 256px to 320px, ring appears | 200ms |
| Blur | Width contracts back, ring fades | 200ms |

#### Empty Stat Cards

| Animation | Trigger | Duration |
|-----------|---------|----------|
| Fade in + translate up 12px, 80ms stagger | On initial page load (they're above fold for returning users) | 400ms |

### 2.3 Signup Page Interactions

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Page load — form elements | Staggered fade in: heading → subtext → social buttons → divider → form → terms | 60ms stagger, 300ms each |
| Social button hover | Background transitions to `muted` | 150ms |
| Social button click | Scale 0.97→1.0 (press feedback) + navigate | 150ms |
| Form input focus | Border color transitions, subtle ring appears | 200ms |
| Error message | Fade in + translate down 4px | 200ms |
| Submit button click | Scale 0.97→1.0 press feedback, then loading spinner replaces text | 150ms press, then hold |
| Left panel (desktop) | Static — no animation, purely atmospheric | — |

**Transition to onboarding**: When signup submits successfully, the page should crossfade to `/onboarding/name` rather than hard-cutting. This makes the signup → onboarding flow feel like entering a new space, not being redirected.

### 2.4 Onboarding Wizard Transitions

This is where motion has the highest impact on perceived quality. The wizard has 6 steps, and the transition between them should feel like *turning pages in a book* — not like loading a new page.

#### Step Transitions

| Direction | Animation | Duration | Easing |
|-----------|-----------|----------|--------|
| Forward (next step) | Current content fades out + translates left 30px; new content fades in + translates from right 30px | 350ms | `ease-in-out` |
| Backward (back button) | Current content fades out + translates right 30px; new content fades in + translates from left 30px | 350ms | `ease-in-out` |

**Why horizontal?** The progress bar moves left-to-right, so the spatial metaphor should match. Moving forward = content slides left (the user is progressing rightward). Moving back = content slides right.

**The `key={pathname}` on the content wrapper** (line 64 of `onboarding.tsx`) already forces a fresh mount per step. The animation should be applied to this wrapper:
- On forward navigation: wrapper enters with `translateX(30px) + opacity 0` → `translateX(0) + opacity 1`
- On backward navigation: wrapper enters with `translateX(-30px) + opacity 0` → `translateX(0) + opacity 1`

#### Progress Bar Animation

| Moment | Animation | Duration |
|--------|-----------|----------|
| Step change | Bar width animates smoothly to new percentage | 500ms, ease-out |
| Step text update | "Step 3 of 5" updates immediately | — |

The progress bar should use `transition: width 500ms ease-out` (already partially implemented via `transition-all duration-500` in the current code).

#### Back Button

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Hover | Text color transitions to `foreground`, arrow shifts left 2px | 150ms |
| Click | Triggers backward step transition (see above) | — |

#### Building Step (final step)

The `/onboarding/building` route hides the header chrome (`showChrome = false`). The transition from the previous step to this final step should feel like a *reveal*:

| Moment | Animation | Duration |
|--------|-----------|----------|
| Header fades out | Opacity 1→0, height collapses | 300ms |
| Content centers vertically | Smooth reflow | 300ms |
| "Building" content appears | Fade in + scale 0.95→1.0 | 500ms |

---

## 3. Perceived Performance

### 3.1 Above-the-Fold Prioritization

**Landing page load sequence:**

| Priority | Element | Strategy |
|----------|---------|----------|
| 1 | SiteHeader (logo, nav, CTA) | Inline CSS, no JS dependency. Paint immediately. |
| 2 | Hero headline + subtext + CTAs | Text content should be server-rendered or inlined. No waiting for JS bundle. |
| 3 | HeroMock (dashboard preview) | Can be a static image or inline SVG — no lazy loading for this element. |
| 4 | Everything below the fold | Lazy-load with IntersectionObserver. Do not block first paint. |

**Signup page load sequence:**

| Priority | Element | Strategy |
|----------|---------|----------|
| 1 | Form + social buttons | Render immediately. This is the only thing the user needs. |
| 2 | Left panel testimonial | Static content, render immediately but it's below fold on mobile. |

**Dashboard page load sequence:**

| Priority | Element | Strategy |
|----------|---------|----------|
| 1 | Sidebar + TopBar | Render immediately (layout shell). |
| 2 | Greeting + setup guide | Render immediately (the primary content). |
| 3 | Stat cards + empty state | Render immediately (they're simple, no data fetching). |

### 3.2 Skeleton/Placeholder Strategy

#### Landing Page

No skeletons needed — the page is static marketing content. Instead:

- **Image lazy loading**: HeroMock and feature mocks should use `loading="lazy"` for images, or inline SVGs (which is what the current implementation does — all mocks are pure CSS/HTML, no external images).
- **Font loading**: The display font (`font-display`) should have `font-display: swap` to prevent invisible text during font load.

#### Dashboard

| Component | Skeleton Strategy |
|-----------|-------------------|
| Setup guide checklist | No skeleton needed — content is immediate from local state. |
| Stat cards (Total sales, Sessions, Orders) | Show the empty-state values ("$0.00", "0") immediately. If real data were fetched, show shimmer rectangles for value + label. |
| Orders table (when populated) | 3-5 shimmer rows with rounded rectangles for each column. |
| Sidebar nav | No skeleton — static list of links. |

**Shimmer animation** (for future data-fetching scenarios):
```css
/* Specification only — do not implement */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
/* Use a linear-gradient with muted color → slightly lighter → muted */
/* Duration: 1.5s, infinite, ease-in-out */
```

#### Signup

No skeletons needed — the form is immediate and local. No data fetching occurs on this page.

#### Onboarding

No skeletons needed — each step is a simple form/question rendered immediately.

### 3.3 Route Transition Performance

TanStack Router supports route-level code splitting. The perceived cost of navigating between pages should be minimized:

| Transition | Strategy |
|------------|----------|
| Landing → Signup | Show a brief crossfade (200ms). The signup form is small and loads fast. |
| Signup → Onboarding | Crossfade (200ms). Onboarding layout is lightweight. |
| Onboarding step → step | Horizontal slide (see §2.4). No full-page reload — `Outlet` swaps content. |
| Onboarding → Dashboard | This is the "big reveal" — see §4.2 for the full choreography. |

**Prefetching**: TanStack Router supports `preload` on `<Link>`. The following routes should prefetch on hover:
- Landing "Start free trial" → preload `/signup`
- Signup form submit → preload `/onboarding/name`
- Onboarding final step → preload `/dashboard`

---

## 4. Emotional Design

### 4.1 Animation Mood

| Context | Mood | How |
|---------|------|-----|
| Landing page hero | **Confident, warm** | Slow, deliberate fades. No bouncy or playful motion. The terracotta color palette already conveys warmth — animations should feel grounded and assured. |
| Feature sections | **Curious, inviting** | Elements reveal as the user explores. The zig-zag pattern creates a rhythm that feels like a guided tour. |
| Testimonials | **Authentic, human** | Cards enter with gentle motion. The avatar circles are warm-toned. No mechanical or corporate feel. |
| Pricing | **Trustworthy, clear** | Cards enter with minimal animation. The highlighted "Grow" card should feel elevated but not flashy. No urgency animations (no pulsing, no countdown timers). |
| Dashboard setup guide | **Encouraging, gamified** | Progress bar fill is satisfying. Checkmark animation is crisp. Confetti on completion is the single moment of delight. |
| Onboarding wizard | **Calm, guided** | Horizontal slides feel like page turns. The minimal chrome reduces anxiety. Each step should feel like progress, not labor. |
| Signup | **Fast, effortless** | Minimal animation. The page should feel like it's barely there — just a form between the user and their store. |

### 4.2 Delightful Micro-Moments

| Moment | Animation | Where |
|--------|-----------|-------|
| **First sale celebration** (future) | Confetti burst + "Your first sale!" toast notification with a subtle bounce | Dashboard, when a real order comes in |
| **Setup complete** | Confetti from progress bar + "Nice work" message | Dashboard setup guide (§2.2) |
| **Onboarding building step** | A kiln/furnace loading animation — something that visually represents "we're building your store" | Onboarding `/building` route |
| **Pricing card hover** | Subtle shadow elevation + scale 1.01 | Landing pricing section |
| **CTA button hover** | Background opacity transition (already `hover:opacity-90`) — consider adding a subtle arrow slide-right on hover | All CTA buttons |
| **Logo gradient** | The terracotta gradient on the logo icon could have a very subtle hue-shift animation (cycling ±5 on the hue) over 8 seconds — barely perceptible but alive | Header logo |

### 4.3 Pricing Trust Signals

| Element | Strategy |
|---------|----------|
| Highlighted card | The "Grow" card uses `var(--ink)` background with white text — this already creates visual authority. Add a subtle `box-shadow` elevation to make it feel "lifted" above the other two. |
| "Most popular" badge | Already present. No animation needed — static badges feel more trustworthy than animated ones. |
| Price display | The large `text-5xl` price is the right anchor. No animated counters — static numbers feel more honest. |
| Check marks in feature list | The `Check` icon with terracotta/emerald color is already a trust signal. No animation needed on load — they should be immediately visible. |
| "Start free trial" buttons | The arrow icon (`ArrowRight`) could shift 2px right on hover — a subtle "this leads somewhere" cue. |

---

## 5. Navigation Fluidity

### 5.1 Sidebar (Dashboard)

| State | Visual Treatment | Transition |
|-------|------------------|------------|
| Default (inactive) | `text-muted-foreground`, no background | — |
| Hover | `bg-muted/60`, `text-foreground` | 150ms ease |
| Active | `bg-foreground/[0.06]`, `font-medium`, `text-foreground` | 150ms crossfade on navigate |
| Icon | Stays the same size/color in all states | No change — icons are stable landmarks |

**Do NOT animate**: Sidebar width, sidebar item height, or icon transforms. These should be instant. Sidebar motion is purely color/background transitions.

### 5.2 Header Sticky Behavior (Landing)

The header is already `sticky top-0` with `backdrop-blur-md`. Current implementation is solid.

**Enhancement specification**:
- On scroll past 0px: header background opacity increases from `80%` to `95%` over 200ms. This creates a subtle "solidifying" effect as the user scrolls past the hero.
- On scroll back to top: opacity returns to 80%.
- Implementation: Use a scroll event listener that toggles a class after `window.scrollY > 50`.

**Do NOT animate**: Header height. It should remain 64px (`h-16`) at all times. No shrinking/expanding header — it breaks layout predictability.

### 5.3 Back Button (Onboarding)

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Hover | Text: `text-foreground`, arrow: translates left 2px | 150ms |
| Click | Triggers backward step transition (§2.4) | 350ms |

The back button should only appear when `idx > 0` (already implemented). When it appears/disappears between steps, it should fade in/out with the header transition, not pop in abruptly.

### 5.4 Mobile Navigation (Future Consideration)

The current sidebar is `hidden md:block`. When mobile navigation is added:

| Element | Specification |
|---------|---------------|
| Hamburger icon | Slide-in drawer from left, 300ms, ease-out |
| Overlay | Fade in from 0→60% black, 200ms |
| Drawer items | Same styling as desktop sidebar |
| Close | Reverse of open: drawer slides left, overlay fades out |

---

## 6. Responsive Considerations

### 6.1 Animation Intensity by Viewport

| Viewport | Strategy |
|----------|----------|
| **Desktop (≥1024px)** | Full animation choreography as specified in §2. All entrance animations, all micro-interactions. |
| **Tablet (768px–1023px)** | Same as desktop. The layout already adapts (e.g., FeatureZig stacks vertically). Animations should still trigger on scroll. |
| **Mobile (<768px)** | **Reduce motion by 50%**: shorter durations (e.g., 300ms instead of 500ms), smaller translate distances (e.g., 12px instead of 20px). Remove stagger delays between cards (they stack vertically, so stagger feels odd). |

### 6.2 `prefers-reduced-motion` Support

All animation specifications above should be wrapped in a `prefers-reduced-motion: no-preference` media query. When the user has reduced motion enabled:

| Original Animation | Reduced Motion Replacement |
|--------------------|---------------------------|
| Translate + fade | Fade only (no translate) |
| Scale animations | Instant snap to final state |
| Confetti burst | Simple "Setup complete" text change, no particles |
| Horizontal slide (onboarding) | Crossfade only (no horizontal translate) |
| Stagger delays | All elements appear simultaneously |
| Progress bar fill | Instant width change (no 500ms transition) |

### 6.3 Touch-Friendly Hover Alternatives

| Desktop Hover State | Mobile Touch Alternative |
|---------------------|-------------------------|
| Sidebar item hover → background change | Active state shown on `:active` (touch), stays highlighted while touch is held |
| Pricing card hover → shadow elevation | No hover equivalent. Cards should have a slight default shadow so they don't feel "flat" on touch. |
| CTA button hover → opacity 90% | `:active` state → opacity 85% (already works via CSS `hover:opacity-90` — add `active:opacity-85`) |
| "Learn more" link hover → underline | Already underlined by default (`underline decoration-2`), no change needed |
| Tooltip-like interactions | Avoid entirely on mobile. If any tooltips exist, convert to inline text or expandable sections. |

### 6.4 Viewport-Triggered Animations on Mobile

On mobile, the IntersectionObserver thresholds should be adjusted:

| Desktop Threshold | Mobile Threshold | Reason |
|-------------------|------------------|--------|
| 10% of element visible | 5% of element visible | Smaller screens mean elements enter viewport sooner. Triggering earlier prevents the "blank space then pop-in" effect. |

### 6.5 Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint (FCP) | < 1.2s | Inline critical CSS, defer non-critical JS |
| Largest Contentful Paint (LCP) | < 2.5s | Hero text is the LCP element — it should be pure HTML, no JS dependency |
| Cumulative Layout Shift (CLS) | < 0.1 | Fixed dimensions for all mocks/cards. No images that load without dimensions. |
| Total Blocking Time (TBT) | < 200ms | Defer below-fold animations to `requestIdleCallback` or IntersectionObserver |

**Animation performance rules:**
- Only animate `transform` and `opacity` (GPU-composited properties)
- Never animate `width`, `height`, `margin`, `padding`, or `top`/`left` (causes layout recalculation)
- Use `will-change: transform` on elements that will animate (remove after animation completes)
- All entrance animations should use `IntersectionObserver`, not scroll event listeners

---

## Appendix A: Animation Timing Reference

| Token Name | Value | Use Case |
|------------|-------|----------|
| `duration-instant` | 100ms | Hover state changes, focus rings |
| `duration-fast` | 150ms | Button press feedback, sidebar hover |
| `duration-normal` | 300ms | Step transitions, card entrances |
| `duration-slow` | 500ms | Progress bar fill, page-level transitions |
| `duration-delight` | 800ms–1200ms | Confetti, celebration moments |
| `ease-default` | `ease-out` | Most entrance animations |
| `ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Checkmark pop, micro-delight moments |
| `ease-smooth` | `ease-in-out` | Onboarding step transitions |

## Appendix B: Color Tokens for Motion

| Token | Value | Use |
|-------|-------|-----|
| `--terracotta` | Brand primary | Progress bars, active states, accent animations |
| `--emerald` | Success/completion | Checkmarks, success confetti, "paid" badges |
| Gold (from confetti palette) | `oklch(0.85 0.12 85)` | Confetti particles |
| White | `#fff` | Confetti particles on dark backgrounds |

## Appendix C: Component Animation Checklist

- [ ] Hero entrance stagger (6 elements)
- [ ] Logo strip sequential fade
- [ ] Pillars section stagger (4 cards)
- [ ] Feature zig-zag scroll reveals (3 sections × 2 columns)
- [ ] Testimonial card stagger (3 cards)
- [ ] Pricing card stagger (3 cards)
- [ ] Final CTA entrance (4 elements)
- [ ] Dashboard greeting fade-in
- [ ] Setup guide accordion expand/collapse
- [ ] Checklist checkbox → checkmark animation
- [ ] Progress bar fill animation
- [ ] Setup complete confetti burst
- [ ] Setup guide dismiss collapse
- [ ] Sidebar hover transitions
- [ ] TopBar search focus/blur
- [ ] Signup form stagger entrance
- [ ] Signup error message entrance
- [ ] Signup → onboarding crossfade
- [ ] Onboarding forward step slide
- [ ] Onboarding backward step slide
- [ ] Onboarding progress bar fill
- [ ] Onboarding → dashboard reveal transition
- [ ] `prefers-reduced-motion` fallbacks for all above
