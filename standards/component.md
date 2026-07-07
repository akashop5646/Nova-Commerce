# UI Component Standard

Every Klin UI component package must conform to the following standards:

## Package File Structure
```
packages/ui/[component]/
├── package.json      # Package configuration with category and version
├── manifest.json     # Declarative component metadata
├── [Component].tsx   # React component implementation
├── render.ts         # Standard unified render wrapper
├── config.ts         # Default configurations (allowed children, icons)
├── schema.ts         # Puck fields schema
├── defaults.ts       # Default props constant values
├── variants.ts       # Design variants styling definitions
├── tokens.ts         # Token variable overrides
├── animations.ts     # Animation configurations
├── validation.ts     # Zod props validation checks
├── migration.ts      # Template structure migration script
├── preview.ts        # Preview metadata configurations
├── stories.tsx       # Playground preview stories
├── tests.ts          # Package unit tests
└── README.md         # Component developer docs
```

## Guidelines
- **Automatic Registration**: Components must be dynamically scanned and loaded via the loader scan pipeline. No manual registrations.
- **Puck Compatibility**: Component schemas must follow the Puck adapter standard.
- **Design Tokens Only**: Never hardcode colors, padding, margins, or animations. Use custom CSS properties from the theme compiler.
- **Accessibility (A11y)**: Must satisfy WCAG AA contrast ratios and support screen reader attributes.
