# Theme Package Standard

Themes encapsulate colors, typography scales, spacing offsets, border settings, and motion curves.

## Guidelines
- Color keys must support light/dark variants and utilize valid HEX or oklch format.
- Spacing tokens must map to unified variables (`--klin-spacing-*`).
- Theme resolver must inject properties dynamically to the DOM without layout shifts.
