# Playbook: Create Extensions/Plugins

Instructions to hook custom logic into the Customizer:

1. **Scaffold Plugin Package**: Initialize in `packages/marketplace/`.
2. **Define Hook Listeners**: Implement lifecycle listeners (`beforeRender`, `afterRender`, etc.).
3. **Register Extension**: Publish package manifest details to the local plugin manager registry.
