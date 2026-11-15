---
name: pull-request-review
description: "Run end-to-end reviews with local notes and coverage evidence."
---

# Pull Request Review

Resolve repository/PR and read project review requirements. Fetch metadata, base/head, diff, checks, and discussion. Review code and surrounding behavior for correctness, authorization, concurrency, integrity, compatibility, performance, observability, tests, rollout, and rollback. Findings require concrete trigger, consequence, file/line, and correction. Passing CI is not approval evidence. Sweeps paginate the entire filtered set and compare with existing reviews, reporting gaps. Local notes include date, reviewed head, scope, findings, and validation. Generalize reusable lessons before public capture. Recheck head before submitting an authorized review.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
