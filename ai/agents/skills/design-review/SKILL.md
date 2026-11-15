---
name: design-review
description: "Review designs through requirements, edge cases, ownership, actions, and dependencies."
---

# Design Review

Read the complete design and referenced requirements, identifying version and status. Review five lenses: measurable nonfunctional requirements; edge and partial-failure cases; affected ownership boundaries; decisions/actions required from the user; dependencies with owner, ETA, and lateness impact. Check load, latency budgets, consistency, authorization, migration, compatibility, observability, rollout, and rollback. Cite document sections or code. Output decisions, prioritized findings, unknowns, and author feedback when requested. Capture only reusable knowledge appropriate to the destination.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
