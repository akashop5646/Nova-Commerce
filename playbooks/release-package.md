# Playbook: Release Package

Instructions to publish components packages:

1. **Verify Lint & Typecheck**: Run `pnpm lint` and `pnpm build` locally.
2. **Increment Version**: Adjust semantic version value inside `package.json`.
3. **Register Package**: Add the package configuration entry in the registry system index.
