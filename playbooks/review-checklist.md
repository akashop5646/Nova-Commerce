# Playbook: Developer PR Review Checklist

Verify these boxes are checked before merging layout changes:

- [ ] Every component package exposes a correct `manifest.json`.
- [ ] Properties and variants utilize dynamic design tokens (no hardcoded style properties).
- [ ] Zod validation schemas verify template parameters.
- [ ] Custom CLI build outputs verify without ESLint warning messages.
- [ ] Accessibility wcag checks verify AA contrast thresholds.
