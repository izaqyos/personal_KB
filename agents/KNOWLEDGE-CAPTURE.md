# Knowledge Capture Agent — Personal KB

**Purpose:** Capture reusable technical knowledge from any source — articles, courses, LeetCode solutions, code projects, conversations, videos — and maintain this KB as a healthy, navigable, LLM-friendly knowledge base.

**KB Path:** `/Users/yosii/work/git/personal_KB/`

---

## Table of Contents

- [Core Responsibilities](#core-responsibilities)
- [Source Types](#source-types)
- [Routing Table](#routing-table)
- [Naming Rules](#naming-rules)
- [Frontmatter Standard](#frontmatter-standard)
- [Capture Workflows](#capture-workflows)
- [KB Directory Structure](#kb-directory-structure)
- [Raw Sources](#raw-sources)
- [Ingest Log](#ingest-log)
- [Periodic Lint](#periodic-lint)
- [Rules](#rules)
- [Trigger Phrases](#trigger-phrases)

---

## Core Responsibilities

1. **Capture & Convert** — extract knowledge from any source and convert to local markdown
2. **Classify & Route** — file into the correct directory based on topic
3. **Link** — add to README.md index, cross-reference related files
4. **Deduplicate or Enrich** — check existing files first; update rather than create duplicates
5. **Track Provenance** — note source URL, author, and capture date
6. **Log** — append every change to `log.md`

---

## Source Types

| Source | How to Access | Examples |
|--------|--------------|----------|
| **Articles / Blog Posts** | `WebFetch` with URL | Best practices, framework guides, design patterns |
| **Books / Courses** | Manual notes or conversation | Key concepts, chapter summaries |
| **LeetCode / Interview Prep** | Conversation or local files | Patterns, solutions, topic guides |
| **Code Projects** | Local repos at `~/work/git/personal_code/` | Implementation patterns, project learnings |
| **Videos / Talks** | `WebFetch` transcript or manual notes | Conference talks, tutorials |
| **Chat Explanations** | Current conversation context | Concepts explained during Q&A worth preserving |
| **Stack Overflow / Forums** | `WebFetch` with URL | Solutions to specific problems |
| **Documentation** | `WebFetch` or manual | Tool/framework reference distilled |

---

## Routing Table

| Topic | Target Location | Examples |
|-------|----------------|----------|
| **Programming Languages** | `{language}/` or `kb-{language}` | `python/`, `rust-kb`, `typescript/` |
| **Algorithms & DS** | `algorithms/` or `interviews/` | `algorithms-ds.md`, `binary-search.md` |
| **System Design** | `system-design/` | `redis/`, `redlock.md` |
| **Databases** | `kb-db` or `kb-sql` | SQL patterns, DB admin |
| **DevOps / Containers** | `devops-kb`, `containers-kb` | Docker, K8s, CI/CD |
| **ML / AI** | `ml-and-ai/` | LLM practices, model theory |
| **Security** | `kb-security` | Auth, crypto, network sec |
| **Networking** | `network/` | Protocols, Wireshark, DNS |
| **Unix / Linux / Shell** | `unix-kb`, `bash/`, `sed/`, `awk/` | Shell scripting, system admin |
| **Editors** | `neovim-kb`, `vi/`, `eclipse-kb` | Editor configs, plugins |
| **Interview Prep** | `interviews/`, `interview-qs-kb`, `leetcode-kb` | Patterns, study guides |
| **Tools** | `kb-tools` or dedicated file | Specific tool reference |
| **Games / Hobbies** | `{game}-kb` | `dominions-kb`, `shadow-era-kb` |
| **Personal / Legacy** | root level | `ge-kb`, `sfe-*`, legacy workplace KBs |

### When topic doesn't fit

If a new topic doesn't match any existing directory:
1. Create a new kebab-case file or directory at root level
2. Add to README.md index under the appropriate section
3. Log the ingest

---

## Naming Rules

- **Always kebab-case:** `system-design-patterns.md`, `redis-primer.md`
- **No spaces, no underscores, no camelCase**
- **Directories:** `ml-and-ai/`, `system-design/`, `interviews/`
- **Files:** `{descriptive-name}.md` for markdown, extensionless for legacy plaintext
- **Legacy files:** don't rename unless doing a full sanitization pass — they're git-tracked

---

## Frontmatter Standard

Every `.md` file (except README.md) should have this header after the `# Title`:

```markdown
# Document Title

> **Source:** [URL or description of origin]
> **Author:** [Name] (if known)
> **Captured:** [YYYY-MM-DD]
> **Status:** Active | Draft | Stale | Archived
> **Type:** source | compiled
```

| Field | Values | Notes |
|-------|--------|-------|
| **Source** | URL, "Personal notes", "Course: X", "Book: X" | Where it came from |
| **Author** | Name or "Yosi Izaq" for personal notes | Who wrote the original |
| **Captured** | `YYYY-MM-DD` | When added to KB |
| **Status** | `Active` (current), `Draft` (WIP), `Stale` (outdated), `Archived` (kept for reference) | Freshness indicator |
| **Type** | `source` (raw capture), `compiled` (synthesized/curated) | How much processing was done |

---

## Capture Workflows

### Workflow A: Articles & Web Content

1. **Fetch** — `WebFetch` with the URL
2. **Distill** — extract key concepts, patterns, takeaways (don't copy verbatim)
3. **Contextualize** — note how it relates to existing knowledge
4. **Route** — file into appropriate directory per routing table
5. **Index** — add to README.md
6. **Log** — append to `log.md`
7. **Cross-ref** — add "See Also" links to related existing files

### Workflow B: Course / Book Notes

1. **Summarize** — key concepts, not transcription
2. **Structure** — use headings, tables, code examples
3. **Route** — topic directory or `learning/`
4. **Index + Log + Cross-ref**

### Workflow C: LeetCode / Interview Patterns

1. **Capture** — pattern name, when to use, complexity, template code
2. **Route** — `interviews/` for pattern guides, `leetcode-kb` or personal_code repo for solutions
3. **Cross-ref** — link related patterns (e.g., sliding-window → two-pointers)
4. **Index + Log**

### Workflow D: Conversation Knowledge

When a Q&A session produces reusable knowledge:

1. **Identify** — is this worth preserving beyond this conversation?
2. **Extract** — pull the reusable concept, not the conversation
3. **Route + Index + Log + Cross-ref**

---

## KB Directory Structure

```
personal_KB/
  README.md              -- master index with ToC (ALWAYS updated)
  KNOWLEDGE-CAPTURE.md   -- this file (conventions + workflows)
  log.md                 -- append-only ingest log
  raw/                   -- immutable source dumps (articles, transcripts)
  
  # Programming Languages
  python/                -- Python notes, snippets
  typescript/            -- TypeScript patterns
  rust-kb                -- Rust reference
  go-kb                  -- Go reference
  c-kb                   -- C reference
  kb-cpp                 -- C++ reference
  java-kb                -- Java reference
  javascript-kb          -- JavaScript reference
  perl/                  -- Perl reference
  
  # Frameworks & Tools
  nestjs-kb              -- NestJS
  nodejs-kb              -- Node.js
  neovim-kb, neovim.md   -- Neovim config & plugins
  containers-kb          -- Docker, K8s
  devops-kb              -- CI/CD, infra
  
  # Knowledge Domains
  algorithms/            -- DS & algorithms
  system-design/         -- Architecture, distributed systems
  interviews/            -- Interview pattern guides
  ml-and-ai/             -- Machine learning, LLMs
  kb-security            -- Security reference
  kb-db, kb-sql          -- Database reference
  network/               -- Networking, protocols
  
  # System & Shell
  unix-kb                -- Unix/Linux reference
  bash/, sed/, awk/      -- Shell scripting
  linux/                 -- Linux specifics
  
  # Legacy & Personal
  ge-kb, ge-pet-kb       -- GE workplace KBs
  acs, acs-faqs          -- ACS product KB
  sfe-*, sap-cf-*        -- SAP/SFE workplace KBs
  dominions-kb, shadow-era-kb  -- Game KBs
```

---

## Raw Sources (`raw/`)

Immutable staging area. Files here are **never modified** after capture.

- Article dumps, video transcripts, raw web clippings
- Naming: `{YYYY-MM-DD}-{source-type}-{descriptive-name}.md`
- Example: `2026-04-10-article-karpathy-llm-knowledge-bases.md`
- These feed into compiled KB articles

---

## Ingest Log (`log.md`)

Append-only. Every KB change gets a line:

```
## [YYYY-MM-DD] action | topic | source
```

| Action | When |
|--------|------|
| `ingest` | New file added |
| `update` | Existing file modified |
| `lint` | Health check / sanitization pass |
| `cross-ref` | Added See Also links |
| `rename` | File renamed |
| `archive` | File marked as archived |
| `delete` | File removed |

---

## Periodic Lint

Run `/sanitize-kb` targeting this repo to maintain health. Checks:

1. **Index completeness** — every file on disk in README.md
2. **Broken links** — all internal links resolve
3. **Naming consistency** — kebab-case, no underscores
4. **Frontmatter presence** — all 5 fields on .md files
5. **Cross-reference gaps** — related topics linked
6. **Stale content** — files not updated in 6+ months
7. **Orphan files** — files referenced nowhere

**Frequency:** quarterly or after large ingestion batches.

---

## Rules

1. **Always update README.md** — every new file must be indexed
2. **Always append to log.md** — every change gets logged
3. **Deduplicate first** — search existing KB before creating new files
4. **Distill, don't copy** — extract patterns/concepts, not raw dumps (those go in `raw/`)
5. **Kebab-case only** — for new files. Don't rename legacy unless doing full sanitization
6. **Add frontmatter** — to all new .md files
7. **Cross-reference** — add See Also links when topics overlap
8. **Git commit after batches** — commit message: `kb: {brief description}` — no co-authored-by
9. **Table of Contents** — always include in new index/guide files

---

## Trigger Phrases

| Phrase | Action |
|--------|--------|
| "save to personal kb" / "add to my kb" | Capture content and route to personal KB |
| "save this article" | Fetch URL, distill, store |
| "capture this for later" | Extract reusable knowledge from conversation |
| "update my kb" | Modify existing entry |
| "sanitize personal kb" / "lint personal kb" | Run `/sanitize-kb` on this repo |

---

**Last Updated:** April 10, 2026
