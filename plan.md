PROMPT 1 — Klin Core Framework
You are the Chief Software Architect for Klin.

Klin is a next-generation ecommerce website builder.

Your task is NOT to build UI.

Your task is to build the complete framework that powers Klin.

Think of this as building React or Next.js before building websites.

DO NOT create dashboards.

DO NOT create pages.

DO NOT create templates.

DO NOT create ecommerce websites.

Instead create the framework.

------------------------------------------------

Mission

Create the complete foundation that every future feature depends on.

Everything should be modular.

Everything should be scalable.

Everything should be production ready.

------------------------------------------------

Technology

Next.js

React

TypeScript

Tailwind

FastAPI

PostgreSQL

Puck

Framer Motion

------------------------------------------------

Framework Structure

Design

Core

Registry

Rendering

Components

Templates

Theme Engine

Template Engine

Design Tokens

Animation Engine

Publishing

State Management

Storage

Assets

Utilities

Hooks

Types

Everything.

------------------------------------------------

Design the folder structure.

Explain every folder.

Explain every dependency.

Explain every service.

Explain communication between services.

Never build UI.

Never build templates.

Only architecture.
PROMPT 2 — Klin Component Library Framework
Build the Klin Component Library Framework.

Do NOT build components yet.

Instead build the architecture.

Design

Component Registry

Component Loader

Component Manifest

Component Metadata

Component Versioning

Component Validation

Component Categories

Component Tokens

Animation Integration

Accessibility

Localization

Puck Registration

Developer APIs

Component SDK

Folder Structure

Developer Documentation

Every future component must plug into this framework.

Do NOT create Hero.

Do NOT create Product Card.

Only create the framework that allows components to exist.
PROMPT 3 — Klin Template Engine Framework
Build the Klin Template Engine.

Do NOT build templates.

Instead create the framework.

The engine should support

Template Registration

Template Validation

Template Metadata

Template Versioning

Template Installation

Template Updating

Template Publishing

Template Categories

Industry Tags

Preview Images

Dependencies

Theme References

JSON Schema

Migration

Marketplace Compatibility

Folder Structure

Storage

Database Design

Everything production ready.

Templates do not exist yet.

Only build the engine.
PROMPT 4 — Klin Theme Engine Framework
Build the Klin Theme Engine.

Themes are not templates.

Themes contain

Colors

Typography

Spacing

Border Radius

Shadow

Animations

Buttons

Cards

Inputs

Containers

Everything token based.

Design

Theme Registry

Theme Loader

Theme Resolver

Theme Tokens

Theme Validation

Theme Versioning

Theme Overrides

Theme Inheritance

Storage

Database

Folder Structure

Everything production ready.

Do not build themes.

Build the framework.
PROMPT 5 — Klin Puck Integration Framework
Build the Klin Editor Framework.

Use the official Puck Editor.

GitHub

https://github.com/puckeditor/puck

Puck is ONLY the editing engine.

Do NOT build another editor.

Do NOT modify Puck core.

Extend it.

Create

Component Registry

Template Loader

Theme Resolver

JSON Loader

Autosave

History

Publishing

Validation

Preview Renderer

Plugin Layer

Everything around Puck.

Do NOT build UI.

Do NOT style Puck.

Do NOT build pages.

Only build the framework that connects Klin with Puck.
PROMPT 6 — Klin Renderer Framework
Build the Rendering Engine.

Do not build websites.

Create

JSON Parser

Template Loader

Theme Loader

Component Resolver

Data Injector

Renderer

SSR

Hydration

Caching

Preview Renderer

Publish Renderer

Performance Optimizer

Everything modular.

No UI.
PROMPT 7 — Klin Publishing Framework
Build the Publishing Engine.

Merchant edits website.

↓

Autosave

↓

Draft

↓

Validate

↓

Optimize

↓

Generate Version

↓

Deploy

↓

Publish

↓

Rollback

Everything should be modular.

Everything production ready.

No UI.
PROMPT 8 — Klin Plugin Framework
Build the Klin Extension System.

Support

Plugins

Marketplace Packages

Component Packs

Theme Packs

Animation Packs

Typography Packs

Icons

Developer Packages

Everything installable.

Design

Registry

Package Format

Versioning

Validation

Security

Dependencies

Lifecycle

No UI.
PROMPT 9 — Klin Developer SDK
Build the Developer SDK.

Developers should create

Components

Templates

Themes

Plugins

Animations

Everything using one SDK.

Create

CLI

Validation

Testing

Packaging

Publishing

Versioning

Hot Reload

Developer Documentation

No UI.
PROMPT 10 — Klin AI Rules
Design the AI Rules for Klin.

Future AI should NEVER create random HTML.

AI should NEVER create random React.

AI should ONLY compose Klin Components.

AI should ONLY use registered Templates.

AI should ONLY use Theme Tokens.

AI should ONLY generate Template JSON.

AI should validate every output before saving.

Design the architecture that allows AI to safely generate Klin Templates without breaking compatibility.
⭐ This is the roadmap I'd follow

Don't  build everything at once.

Instead:

Sprint 1
Framework

Sprint 2
Component Library Framework

Sprint 3
Puck Integration

Sprint 4
First Component (Button)

Sprint 5
Hero

Sprint 6
Header

Sprint 7
Footer

Sprint 8
Product Card

Sprint 9
First Template

Sprint 10
Builder UI

Notice something important: the first template comes only after the framework and component system exist. That means every template you build later is automatically compatible with Puck, your renderer, and your publishing pipeline, instead of requiring manual conversion. This foundation-first approach will save you a huge amount of refactoring later.