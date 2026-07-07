# Playbook: Upgrading Component Layout Schemas

Instructions to perform safe schema version migrations:

1. **Verify Increment Version**: Update version variable from v1 to v2.
2. **Implement Migration Script**: Write transform logic mapping old property names to new schema properties in `migration.ts`.
3. **Audit Rendering**: Run compiler test sweeps to confirm storefront layouts translate correctly.
