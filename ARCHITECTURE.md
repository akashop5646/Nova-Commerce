# Klin Platform Architecture & Dependency Guidelines

This document outlines the core structural principles and dependency rules governing the **Klin** monorepo codebase.

---

## The Klin Golden Rules

1. **Everything is a Package.** — All code components, engines, and services must exist as self-contained packages.
2. **Everything is Versioned.** — Every package, template, block, and schema preserves semantic versioning.
3. **Everything is Discoverable.** — Registry layers scan and index package manifests automatically.
4. **Everything is Typed.** — Zero-tolerance policy for loose or untyped Javascript.
5. **Everything is Theme Token Based.** — No hardcoded spacing, typography size or hex color values.
6. **Everything is AI Compatible.** — Structural schema interfaces enable safe and optimized LLM generation.
7. **Everything is Puck Compatible.** — Packages expose mapping adapters to mount editor canvas.
8. **Everything is Testable.** — Each package maintains native validation test definitions.
9. **Everything is Replaceable.** — Abstract adapters enable core engines to function regardless of canvas integrations.
10. **Nothing is Hardcoded.** — Config engines compile JSON templates into visual views.

---

## Allowed Dependency Mappings

To prevent circular reference loops and design drifts, package imports are restricted:

| Package Namespace | Permitted Imports | Notes |
|:---|:---|:---|
| `@klin/core` | None | Deepest core logic (logging, state lifecycle) |
| `@klin/shared` | `@klin/core` | Basic shared types, converters, and constants |
| `@klin/ui` | `@klin/core`, `@klin/shared`, `@klin/theme` | Design system elements (e.g. `@klin/ui/button`) |
| `@klin/blocks` | `@klin/ui`, `@klin/core`, `@klin/shared` | Ecommerce section grids (e.g. `@klin/blocks/hero`) |
| `@klin/templates` | `@klin/blocks`, `@klin/ui` | Composed template setups |
| `@klin/renderer` | `@klin/templates`, `@klin/blocks` | Server/Client rendering compiler |
| `apps/*` | `packages/*` | Top-level applications. Apps never import from other apps |

*Strict rule*: Packages never reference folders outside their designated dependency direction (e.g., `@klin/ui` must never import from `@klin/templates`).

---

## 15-Phase Development Roadmap

1. **Phase 1: Workspace & Tooling** (Current phase)
2. **Phase 2: Core + Registry + Commands**
3. **Phase 3: UI Package (Button POC)**
4. **Phase 4: Hero Block**
5. **Phase 5: Renderer**
6. **Phase 6: Puck Adapter**
7. **Phase 7: Builder Core**
8. **Phase 8: Store Engine**
9. **Phase 9: Dashboard**
10. **Phase 10: Design Studio**
11. **Phase 11: Templates**
12. **Phase 12: Marketplace**
13. **Phase 13: Billing**
14. **Phase 14: Extensions**
15. **Phase 15: AI Website Generator**
