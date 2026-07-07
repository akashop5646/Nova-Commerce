# Playbook: Create Template

Follow these steps to build a page assembly layout:

## Step 1: Initialize Package
Scaffold under `packages/templates/[template-name]/`.

## Step 2: Configure Layout Tree
- Assemble sections in `template.json`.
- Must only reference registered blocks (`@klin/blocks/*`) and UI components (`@klin/ui/*`).

## Step 3: Validate Schemas
- Apply Zod validations from `@klin/schemas` to verify output template integrity.
