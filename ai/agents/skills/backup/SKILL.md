---
name: backup
description: "Audit coverage, runs, artifacts, and restoreability."
---

# Backup Audit

Inventory source paths, destinations, exclusions, retention, schedules, and account ownership. Distinguish Git commits from dirty files, ignored unique data, and archives. Account for symlink targets and omitted Git history. Verify archive completion, size against the previous run, readability, and sample content hashes. A scheduler entry or zero exit code proves neither success nor cloud upload. For account closure, prove storage and recovery factors remain independently accessible. Separate faithful recovery backups from generalized exports. Restore into a fresh directory, verify checksums/decryption, inspect paths before extracting, and compare content. Show concrete mutating operations first; audits remain read-only.

Locate optional sources through private configuration described in [portable setup](../../README.md). Use available authenticated CLI tools/connectors or user-supplied material; report missing dependencies and stop dependent work rather than inventing evidence. Preserve user scope. External posting, deployments, destructive actions, and account changes require the user's authorization. Never store credentials, real rosters, or private runtime data in this package.
