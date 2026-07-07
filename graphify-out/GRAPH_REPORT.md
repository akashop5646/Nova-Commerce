# Graph Report - Kiln  (2026-07-07)

## Corpus Check
- 81 files · ~106,982 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 705 nodes · 834 edges · 47 communities (44 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9f6670d6`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 69 edges
2. `compilerOptions` - 17 edges
3. `3a. Landing Page (`/`)` - 13 edges
4. `DashboardLayout()` - 12 edges
5. `UX Research: Animation Guidelines for Kiln` - 12 edges
6. `Kiln Animation & Fluidity Specification` - 11 edges
7. `Kiln — UX Architecture & Motion Specification` - 10 edges
8. `scripts` - 9 edges
9. `8. Implementation Checklist` - 9 edges
10. `Kiln — E-commerce Store Builder Dashboard` - 9 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogHeader()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `BreadcrumbSeparator()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `BreadcrumbEllipsis()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/breadcrumb.tsx → src/lib/utils.ts
- `CommandShortcut()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/command.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (47 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.03
Nodes (61): dependencies, class-variance-authority, clsx, cmdk, cors, date-fns, dotenv, embla-carousel-react (+53 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (19): DashboardLayout(), navItems, empty, hydrate(), listeners, OnboardingState, persist(), resetOnboarding() (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (39): useIsMobile(), Input, Separator, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader() (+31 more)

### Community 3 - "Community 3"
Cohesion: 0.04
Nodes (44): 1. Current State Assessment, 3.1 Setup Checklist (`Dashboard` component, line 84–172), 3.2 Empty State Cards (`EmptyStat` component, line 281–289), 3.3 "No Orders" Empty State (line 180–197), 3.4 Sidebar Navigation (`Sidebar` component, line 211–252), 3. Dashboard UX Animations, 4.1 Onboarding Layout (`onboarding.tsx`, line 17–70), 4.2 Building Step (`onboarding.building.tsx`, line 17–70) (+36 more)

### Community 4 - "Community 4"
Cohesion: 0.05
Nodes (38): 1. Design Tokens & Global Easing, 2. Utility Layer — CSS Custom Properties, 4. Micro-Interactions, 5. Page Transitions, 6. Loading & Skeleton States, 7. Accessibility — `prefers-reduced-motion`, 8. Implementation Checklist, Appendix: Tailwind Class Reference (+30 more)

### Community 5 - "Community 5"
Cohesion: 0.06
Nodes (32): 1.1 Landing Page — `index.tsx`, 1.2 Dashboard — `dashboard.tsx`, 1.3 Signup — `signup.tsx`, 1.4 Onboarding — `onboarding.tsx` + child routes, 1. Information Hierarchy & Visual Flow, 3.1 Above-the-Fold Prioritization, 3.2 Skeleton/Placeholder Strategy, 3.3 Route Transition Performance (+24 more)

### Community 6 - "Community 6"
Cohesion: 0.06
Nodes (31): devDependencies, concurrently, eslint, eslint-config-prettier, @eslint/js, eslint-plugin-prettier, eslint-plugin-react-hooks, eslint-plugin-react-refresh (+23 more)

### Community 7 - "Community 7"
Cohesion: 0.07
Nodes (30): 3. Per-Page Animation Spec, 3a. Landing Page (`/`), 3b. Dashboard (`/dashboard`), 3c. Signup (`/signup`), 3d. Onboarding (`/onboarding/*`), 3e. Onboarding Building (`/onboarding/building`), AnalyticsMock — Line Chart, Continue Button (via `wizard.tsx` `<ContinueLink />`) (+22 more)

### Community 8 - "Community 8"
Cohesion: 0.11
Nodes (8): useInView(), UseInViewOptions, FeatureZig(), FinalCTA(), HowItWorks(), Pillars(), PricingSection(), TestimonialSection()

### Community 9 - "Community 9"
Cohesion: 0.09
Nodes (12): AccordionContent, AccordionItem, AccordionTrigger, Checkbox, HoverCardContent, PopoverContent, Progress, RadioGroup (+4 more)

### Community 10 - "Community 10"
Cohesion: 0.19
Nodes (16): cn(), Button, ButtonProps, buttonVariants, Calendar(), CalendarDayButton(), Pagination(), PaginationContent (+8 more)

### Community 11 - "Community 11"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, jsx, lib, module, moduleResolution, noEmit, noFallthroughCasesInSwitch (+11 more)

### Community 12 - "Community 12"
Cohesion: 0.10
Nodes (20): 2.1 Landing Page Entrance Animations, 2.2 Dashboard Interactions, 2.3 Signup Page Interactions, 2.4 Onboarding Wizard Transitions, 2. Motion Choreography, Back Button, Building Step (final step), Empty Stat Cards (+12 more)

### Community 13 - "Community 13"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 14 - "Community 14"
Cohesion: 0.11
Nodes (15): Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, ContextMenuCheckboxItem, ContextMenuContent (+7 more)

### Community 15 - "Community 15"
Cohesion: 0.12
Nodes (14): Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut() (+6 more)

### Community 16 - "Community 16"
Cohesion: 0.12
Nodes (11): Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator, MenubarShortcut() (+3 more)

### Community 17 - "Community 17"
Cohesion: 0.14
Nodes (11): FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext, FormItemContextValue, FormLabel (+3 more)

### Community 18 - "Community 18"
Cohesion: 0.14
Nodes (12): Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext, CarouselOptions (+4 more)

### Community 19 - "Community 19"
Cohesion: 0.17
Nodes (4): userSchema, app, authLimiter, googleClient

### Community 20 - "Community 20"
Cohesion: 0.18
Nodes (7): ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, THEMES

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (11): 2.1 Conversion Impact Data, 2.2 Recommended Landing Page Animation Plan, 2. E-Commerce Landing Page Animations, Analytics Mock SVG Chart (`AnalyticsMock`, line 423–433), Feature Zig-Zag Sections (`FeatureZig` component, line 315–350), Final CTA Section (`FinalCTA` component, line 628–655), Hero Section (`Hero` component, line 105–152), Logo Strip (`LogoStrip` component, line 239–255) (+3 more)

### Community 22 - "Community 22"
Cohesion: 0.20
Nodes (9): Build, Development, Installation, Kiln — E-commerce Store Builder Dashboard, Lint, Prerequisites, Preview production build, Project Structure (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.20
Nodes (9): DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 24 - "Community 24"
Cohesion: 0.22
Nodes (8): AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader(), AlertDialogOverlay, AlertDialogTitle

### Community 25 - "Community 25"
Cohesion: 0.22
Nodes (8): Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow

### Community 26 - "Community 26"
Cohesion: 0.25
Nodes (7): Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 27 - "Community 27"
Cohesion: 0.25
Nodes (6): DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 28 - "Community 28"
Cohesion: 0.25
Nodes (7): NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 29 - "Community 29"
Cohesion: 0.25
Nodes (7): SelectContent, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger

### Community 30 - "Community 30"
Cohesion: 0.33
Nodes (5): ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 31 - "Community 31"
Cohesion: 0.40
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 32 - "Community 32"
Cohesion: 0.40
Nodes (4): InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 34 - "Community 34"
Cohesion: 0.50
Nodes (3): Avatar, AvatarFallback, AvatarImage

### Community 35 - "Community 35"
Cohesion: 0.67
Nodes (3): Badge(), BadgeProps, badgeVariants

### Community 36 - "Community 36"
Cohesion: 0.50
Nodes (3): TabsContent, TabsList, TabsTrigger

## Knowledge Gaps
- **459 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `css` (+454 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 10` to `Community 2`, `Community 9`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 20`, `Community 23`, `Community 24`, `Community 25`, `Community 26`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 34`, `Community 35`, `Community 36`, `Community 39`?**
  _High betweenness centrality (0.081) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 0` to `Community 6`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **Why does `Kiln Animation & Fluidity Specification` connect `Community 4` to `Community 7`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _459 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.03278688524590164 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05952380952380952 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.05087881591119334 - nodes in this community are weakly interconnected._