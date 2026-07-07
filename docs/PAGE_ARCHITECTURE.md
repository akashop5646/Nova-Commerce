# Page Engine Architecture

This document defines the composition rules, lifecycles, and serialization standards of the Klin Page Engine (`@klin/pages`).

---

## 1. Package Responsibility
The Page Engine serves as the core coordinator mapping Website templates, layouts, routing rules, drafts, and SEO headers to agnostic Render Tree definitions. It decouples customizer content editing from visual output render technologies.

## 2. Lifecycle
The page lifecycle transitions through the following stages:
`Created` → `Loading` → `Resolving Template` → `Resolving Blocks` → `Resolving Theme` → `Validating` → `Ready` → `Editing` → `Saving` → `Publishing` → `Archived` → `Disposed`.

## 3. Render Tree
Render trees are platform-independent JSON graphs constructed from `RenderNode` and `RenderTree` schemas. They carry the element's id, component properties, slots, and device viewports context.

## 4. Override Resolution
The `OverrideResolver` takes template layouts and merges override diffs (e.g. customized hero copy) without modifying the original template. Property values are combined recursively.

## 5. Route Resolution
The `RouteManager` matches static, nested, and parameter paths (e.g., `/blog/:slug`), and reports overlapping path conflicts. It also handles redirects (301/302).

## 6. Navigation Graph
The `NavigationGraph` manages the site navigation nodes tree to dynamically assemble menus, internal linking anchors, breadcrumbs, and index pathways.

## 7. Dependency Graph
The `PageDependencyGraph` tracks templates, blocks, themes, components, and assets. The `PageDependencyResolver` recursively maps this tree.

## 8. SEO Pipeline
The `SEOManager` configures meta descriptions, canonical URLs, robot index instructions, and multilingual hreflang paths. `MetaGenerator` renders these to target header elements.

## 9. Serialization
The `PageSerializer` and `PageDeserializer` marshal and unmarshal Page definitions into structured JSON payloads.

## 10. Versioning
The self-describing `DocumentVersion` tracks schema, page, template, block, and theme versions, allowing deterministic parsing of stored content.

## 11. Migration
The `MigrationEngine` upgrades legacy page schemas up to target versions before loading definitions into the factory.

## 12. Public APIs
APIs are exposed via `PageManager` (for page CRUD operations), `PageRenderer` (compiling render trees), and `RouteManager` (address resolution).

## 13. Events
Emits workspace events (`page.created`, `page.published`, `page.route.changed`, etc.) over the Event Bus for logging, caching, and analytics.

## 14. Performance
`MetricsCollector` monitors validation delays, render tree compilation speeds, and serialization overhead.

## 15. Extension Guide
Developers can register lifecycle hook listeners (`beforeSave`, `afterPublish`) using `PageHooks` to run custom compilation logic.

## 16. AI Integration
AI layout generations are guided by `AIPageMetadata` detailing tone preferences, target business types, and block composition guidelines.

## 17. Renderer Interface
The compiled Render Tree is passed to `@klin/renderer` for final HTML/CSS compilation.
