---
name: code-review
description: "Review code for correctness, concurrency, and security."
---

# Code Review

Fetch the actual diff, base/head identifiers, description, discussion, checks, and surrounding implementation. Stop on authentication failure rather than infer an unseen diff. Trace callers, persistence, retries, cancellation, and partial failure. Prioritize authorization boundaries, isolation, atomicity, idempotency, transaction scope, lost updates, and resource lifetime. Each finding needs severity, file/line, concrete trigger, consequence, and feasible correction. Distinguish questions from proven defects. Assess scale, observability, rollback, compatibility, and meaningful tests. Report findings first, then coverage and uncertainty; recheck head before submitting a review.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
