# Security & Threat Validation Standard

Protecting client inputs and merchant sites configurations is a top priority.

## Guidelines
- **Input Sanitization**: AI Website Generator engines must sanitize outputs to block cross-site scripting (XSS) threat vectors. Raw HTML injection is disallowed.
- **Dependency Sandboxing**: Extensions and third-party plugin scripts must be validated for safe scopes before sandbox installation.
- **Sensitive Config**: Secrets, API credentials, and client keys must only be managed via `@klin/config`. Environment configurations must not be directly fetched from random packages.
