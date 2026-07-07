# Playbook: Create Block

Follow these steps to compose a new block section:

## Step 1: Create Block Folder
Scaffold under `packages/blocks/[block-name]/`.

## Step 2: Configure Manifest
- Set name in `package.json` to `@klin/blocks/[block-name]`.
- Define allowed sub-components (child nodes) inside `config.ts` rules.

## Step 3: Implement Composite Render
- Compose visual elements inside `[Block].tsx` pulling atomic tags from `@klin/ui`.
- Enforce that layout variables are resolved via theme CSS variables.
