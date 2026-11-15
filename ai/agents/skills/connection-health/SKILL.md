---
name: connection-health
description: "Diagnose CLI and connector authentication failures."
---

# Connection Health

Identify service, operation, active account, and exact error class. Start with read-only checks that hide secret values. Distinguish authentication, authorization, network, deprecated endpoint, rate limit, stale process, and rotating-refresh-token races. Avoid simultaneous refreshes. Prefer existing diagnostics and current official documentation. Never print authentication stores. Explain remediation and effects; do not clear credentials or kill unrelated processes without authorization. Verify the originally failing operation afterward.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
