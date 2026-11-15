---
type: guide
title: Portable agent workflows
description: Portable personal workflow and client setup reference.
generated:
  by: ai:assistant
  at: '2026-11-15T00:00:00Z'
status: stable
---

# Portable agent workflows

## Table of Contents

- [Contents](#contents)
- [Private configuration](#private-configuration)
- [Installation](#installation)
- [Dependencies and coverage](#dependencies-and-coverage)
- [Verification](#verification)


Version 1.0.0 · Created 2026-11-15 · Source: authored workflow concepts and personal configuration, manually generalized.

---
- [Contents](#contents)
- [Private configuration](#private-configuration)
- [Installation](#installation)
- [Dependencies and coverage](#dependencies-and-coverage)
- [Verification](#verification)
---

## Contents

Self-contained workflow definitions for Claude commands and Codex skills.

- [backup](skills/backup/SKILL.md)
- [architecture-help](skills/architecture-help/SKILL.md)
- [brief](skills/brief/SKILL.md)
- [bug-scan](skills/bug-scan/SKILL.md)
- [capacity](skills/capacity/SKILL.md)
- [code-review](skills/code-review/SKILL.md)
- [commands](skills/commands/SKILL.md)
- [connection-health](skills/connection-health/SKILL.md)
- [daily-context](skills/daily-context/SKILL.md)
- [design-review](skills/design-review/SKILL.md)
- [disk](skills/disk/SKILL.md)
- [execution-report](skills/execution-report/SKILL.md)
- [explain-code](skills/explain-code/SKILL.md)
- [growth](skills/growth/SKILL.md)
- [issue-triage](skills/issue-triage/SKILL.md)
- [kb-maintenance](skills/kb-maintenance/SKILL.md)
- [knowledge-capture](skills/knowledge-capture/SKILL.md)
- [learn](skills/learn/SKILL.md)
- [leetcode-coach](skills/leetcode-coach/SKILL.md)
- [local-models](skills/local-models/SKILL.md)
- [meeting-summary](skills/meeting-summary/SKILL.md)
- [mentions](skills/mentions/SKILL.md)
- [morning](skills/morning/SKILL.md)
- [ownership-map](skills/ownership-map/SKILL.md)
- [planning](skills/planning/SKILL.md)
- [pull-request-review](skills/pull-request-review/SKILL.md)
- [release](skills/release/SKILL.md)
- [release-readiness](skills/release-readiness/SKILL.md)
- [self-assessment](skills/self-assessment/SKILL.md)
- [sprint-prep](skills/sprint-prep/SKILL.md)
- [system-design-coach](skills/system-design-coach/SKILL.md)
- [tools-inventory](skills/tools-inventory/SKILL.md)
- [work-allocation](skills/work-allocation/SKILL.md)
- [writing-style](skills/writing-style/SKILL.md)

## Private configuration

Keep a local copy of config.example.json outside Git and provide its location when invoking workflows. Angle-bracket paths in instructions refer to those settings; they are documentation placeholders, not shell variables.

Set repository roots, private practice/context paths, learning data/context files, optional service endpoints, and ownership maps for your environment. Tokens, real rosters, session history, and customer data do not belong in this package.

## Installation

After cloning the knowledge repository, locate this ai/agents directory. Select the workflows you want.

For Codex, link each selected skills/WORKFLOW directory into ~/.agents/skills/WORKFLOW, or the skill location supported by your client. For Claude, link a selected skill into ~/.claude/skills/WORKFLOW, or link the corresponding standalone file in claude/commands into ~/.claude/commands.

Inspect existing destinations and retain a dated copy before replacing any configuration. Keep links pointed to the cloned package so relative documentation resolves. Standalone command files link back to this package's README.

Merge selected preferences from claude/settings.example.json, codex/config.example.toml, and codex/AGENTS.md into your client setup. Authenticate with your own accounts. Plugins, built-in system skills, connector credentials, sessions, and caches are installed or recreated by the client rather than copied.

## Dependencies and coverage

Service-dependent modes require configured live services and must report unavailable evidence. Learning commands need a schedule, tracks, topic banks, agent-context files, and private logs; they verify those sources before starting.

Entry points were renamed by generic capability. Restricted rosters, policies, operational records, code-review rules, and application code were not exported. Release readiness is a generic configurable workflow rather than a bundled dashboard application.

The authored statusline implementation already exists in the separate code repository at ai_tools/claude_code/statusline/. Consult that project's installation instructions if wanted. Managed marketplace skills and client-supplied system skills are deliberately not vendored.

Original command aliases map to the generic workflows by purpose: catalog, briefing, issue triage, reviews, capacity, planning, context, reporting, maintenance, release readiness, and learning. Use generic names on the new machine.

## Verification

Installable skill entry points use their native name/description schema, validated by the KB gate. Other package notes use normal KB metadata. This identity-free package uses a generic assistant provenance marker rather than a personal curator identifier.

Validate skill frontmatter, local links, JSON/TOML syntax, and privacy scans before installing. The exported tree should contain no stale absolute home paths, organization identifiers, known personal names, credentials, or external symlinks.

A new machine still needs client applications, selected integrations, private local configuration, and data repositories. Publishing this package alone does not prove private data restoration.
