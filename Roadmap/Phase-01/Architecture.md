# Architecture — Phase 01

## Decisions
- Utilized Turborepo for skip-cache optimization across builds and lints.
- Set up shared tsconfig configuration base under `tooling/typescript/tsconfig.json` to unify compiler flags.
- Extracted shared ESLint configuration into `tooling/eslint/eslint.config.js` to ensure uniform styles across workspaces.
- Documented role restrictions and package directories boundaries explicitly inside `ARCHITECTURE.md`.
