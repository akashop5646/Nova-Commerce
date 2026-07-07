# Playbook: Create Component

Follow these steps to create a new visual UI component:

## Step 1: Initialize Package Folder
Scaffold a new folder under `packages/ui/[component-name]/`.

## Step 2: Create Configurations
- Define `package.json` declaring name (`@klin/ui/[component-name]`) and category.
- Define `manifest.json` describing properties, versions, and variants mapping.
- Add `config.ts` specifying allowed children list and responsive defaults.

## Step 3: Implement Visual Code
- Code the component visual interface inside `[Component].tsx`.
- Setup dynamic rendering adapter mapping inside `render.ts`.
- Map variables overrides in `tokens.ts` and `animations.ts`.

## Step 4: Validate
- Write unit tests in `tests.ts`.
- Audit design compliance against `standards/component.md`.
