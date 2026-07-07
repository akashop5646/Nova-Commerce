# Playbook: Publish Storefront Layouts

Instructions for publication pipeline execution:

1. **Trigger Save**: Visual Customizer saves the current state (`@klin/builder-core`).
2. **Execute Validation Workflow**: System audits variables validation.
3. **Execute Compiler**: Convert JSON template into static production pages.
4. **Deploy Assets**: Push compiled layouts and CSS variables to CDN.
