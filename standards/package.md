# Package Configuration Standard

All monorepo libraries must behave as installable modules.

## Standard package.json Template
```json
{
  "name": "@klin/[category]/[name]",
  "version": "1.0.0",
  "category": "foundation",
  "dependencies": [],
  "peerDependencies": {
    "@klin/core": "^1.0.0"
  }
}
```
All packages must configure standard exports compiling code cleanly in ESLint check cycles.
