---
name: release-readiness
description: "Assess configured releases and deployment workflows."
---

# Release Readiness

Use a user-supplied service manifest, tracker query, build identifier, CI workflow, target environment, and readiness rules. Discover actual tooling rather than assume a dashboard server exists. Validate membership, acceptance criteria, checks, approvals, migration sequence, rollback, and health, giving linked evidence and observation time. If a dashboard is wanted, use or build one against the manifest with session-provided authentication. Before deployment show exact repository, workflow, revision, environment, inputs, and rollback. Dispatch only when authorized, follow the run, then verify health. This is portable workflow guidance, not a bundled service-specific application.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
