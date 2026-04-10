# LLM Knowledge Base Maintenance Guide

> **Source:** [Karpathy's LLM Wiki Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f), personal experience (~135-file KB)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-09
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [Karpathy's Core Pattern](#karpathys-core-pattern)
- [Architecture](#architecture)
- [The Lint Cycle (Health Checks)](#the-lint-cycle-health-checks)
- [Frontmatter Standard](#frontmatter-standard)
- [Practical Lessons from a 135-File KB](#practical-lessons-from-a-135-file-kb)
- [Tools](#tools)
- [References](#references)

---

## Karpathy's Core Pattern

The mental model: treat the LLM as a **compiler** that transforms raw inputs into structured, interlinked knowledge.

**Three layers:**

1. `raw/` (immutable sources) — articles, papers, Confluence dumps, screenshots
2. `wiki/` (LLM-compiled articles) — structured markdown with cross-references
3. `schema` (CLAUDE.md conventions) — rules the LLM follows when reading/writing

**Key principles:**

- Humans curate sources and ask questions. The LLM does the bookkeeping.
- Incremental compilation: new raw data integrates into existing structure without rewriting everything.
- Query outputs feed back into wiki — every exploration compounds. If you ask the LLM a question and it produces a good answer, that answer becomes a new wiki page.
- The LLM never invents sources. It synthesizes from what is in `raw/`.

---

## Architecture

```
knowledge-base/
├── raw/                  # Immutable staging area
│   ├── articles/         # Web articles, blog posts
│   ├── papers/           # Academic papers, whitepapers
│   ├── confluence/       # Confluence page exports
│   └── notes/            # Meeting notes, interview notes
├── wiki/                 # LLM-maintained articles (or topic dirs)
│   ├── networking/
│   ├── security/
│   └── architecture/
├── index.md              # Content catalog with one-line summaries
├── log.md                # Append-only chronological record
└── CLAUDE.md             # Schema: naming rules, frontmatter, conventions
```

### index.md

A content-oriented catalog. One line per page with a summary. Updated on every ingest.

```markdown
## Networking
- [vpn-split-tunneling](wiki/networking/vpn-split-tunneling.md) — How split tunneling works and when to use it
- [dns-resolution-flow](wiki/networking/dns-resolution-flow.md) — End-to-end DNS resolution in SASE environments
```

### log.md

Append-only. Every action gets a timestamped entry.

```markdown
## [2026-04-09] ingest | VPN split tunneling | https://example.com/article
## [2026-04-09] compile | dns-resolution-flow | raw/articles/dns-deep-dive.md
## [2026-04-08] lint | fixed 3 broken links, added 2 missing index entries
```

---

## The Lint Cycle (Health Checks)

Run periodically (monthly minimum, weekly if the KB is actively growing) to maintain integrity.

| # | Check | What it catches |
|---|-------|-----------------|
| 1 | **Index completeness** | Every file on disk must appear in `index.md` |
| 2 | **Broken links** | All internal `[text](path)` links must resolve to existing files |
| 3 | **Orphan pages** | Files referenced nowhere — not in the index, not linked from other pages |
| 4 | **Stale content** | Files not updated in 6+ months — mark as `Status: Stale` or archive |
| 5 | **Naming consistency** | kebab-case filenames, no underscores, consistent prefixes per directory |
| 6 | **Frontmatter consistency** | Every file has Source, Captured, Status, Type fields |
| 7 | **Duplicate detection** | Overlapping topics that should be merged or cross-linked |
| 8 | **Cross-reference gaps** | Related topics that don't link to each other |
| 9 | **Contradictions** | Conflicting information across files (e.g., two pages disagree on a protocol detail) |
| 10 | **Missing metadata** | Files without dates, sources, or status |

### Running a lint

Ask the LLM to perform the lint against the full file list. Provide the index and a directory listing. The LLM will produce a report with specific file paths and recommended fixes.

Prompt template:

```
Here is my KB index (index.md) and a directory listing (ls -R).
Run the 10-point lint cycle. For each check, list specific violations
with file paths. Suggest fixes.
```

---

## Frontmatter Standard

Every file starts with this block. No exceptions.

```markdown
# Title

> **Source:** [URL or origin]
> **Author:** [Name]
> **Captured:** [YYYY-MM-DD]
> **Status:** Active | Draft | Stale | Archived
> **Type:** source | compiled
```

**Status values:**

| Status | Meaning |
|--------|---------|
| `Active` | Current, accurate, maintained |
| `Draft` | Incomplete, needs review |
| `Stale` | Not updated in 6+ months, may be outdated |
| `Archived` | Kept for reference, no longer maintained |

**Type values:**

| Type | Meaning |
|------|---------|
| `source` | Raw ingested content (articles, Confluence captures, papers) |
| `compiled` | LLM-synthesized from one or more sources |

---

## Practical Lessons from a 135-File KB

These are hard-won observations from maintaining a real knowledge base over several months.

**Index-based navigation beats RAG at this scale.** At ~100-400 articles, a well-maintained index with one-line summaries is faster and more reliable than vector search. No embedding model, no vector DB, no retrieval tuning. The LLM reads the index and knows exactly which files to pull.

**33% of files were unindexed after 4 months.** Without regular linting, a third of the knowledge base became invisible. Files existed on disk but were not in the index, so the LLM never knew to reference them. Lint regularly or knowledge disappears.

**No true duplicates, but 5 topic clusters lacked cross-references.** Duplicate files are rare when one person curates. The real problem is related pages that don't link to each other. A page on "DNS security" and a page on "SASE DNS flow" should reference each other but won't unless you enforce it.

**Naming drift happens fast.** `snake_case` vs `kebab-case` vs `camelCase` — pick one on day 1 and enforce it in CLAUDE.md. Renaming 40 files later is painful.

**Frontmatter styles diverge.** When multiple agents or sessions write files, each invents its own frontmatter layout. Establish ONE standard (see above) and include it in the schema file.

**Empty placeholder files accumulate.** Directories and files created "for later" that never get filled. Audit quarterly. Delete or fill them.

**Confluence captures need explicit tagging.** A Confluence export is raw source material, not a synthesized article. Tag it `Type: source` so the LLM knows to compile from it rather than serve it directly.

---

## Tools

| Tool | Purpose |
|------|---------|
| **Obsidian** | Markdown editor with graph view for visualizing connections between pages |
| **Obsidian Web Clipper** | Browser extension for ingesting articles directly into `raw/` as markdown |
| **Git** | Version history, branching, collaboration. Every KB change is a commit. |
| **qmd CLI** | Hybrid BM25/vector search for when the KB outgrows pure index navigation |
| **Claude Code / LLM agents** | Compilation (raw to wiki), lint cycles, cross-referencing, query answering |

### Workflow

1. **Ingest:** Clip article with Obsidian Web Clipper or paste into `raw/`
2. **Log:** Append entry to `log.md`
3. **Compile:** Ask LLM to read the raw source and produce/update a wiki page
4. **Index:** Update `index.md` with the new page and a one-line summary
5. **Cross-link:** Add links from related existing pages to the new page
6. **Commit:** `git add . && git commit -m "ingest: [topic]"`

---

## References

- [Karpathy's LLM Wiki Gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) — the original three-layer pattern
- [Karpathy's X post on LLM Knowledge Bases](https://x.com/karpathy/status/2039805659525644595) — discussion and examples
- [DAIR.AI — LLM Knowledge Bases](https://academy.dair.ai/blog/llm-knowledge-bases-karpathy) — expanded writeup with additional context

---

## See Also

- [TurboQuant Technical Overview](../theory/turboquant-doc.md)
