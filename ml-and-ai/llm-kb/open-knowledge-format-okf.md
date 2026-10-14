---
type: reference
title: Open Knowledge Format (OKF)
description: "OKF is a vendor-neutral spec for representing curated knowledge as a directory of markdown files with YAML frontmatter, so AI agents (and humans) can read, write, and exchange it without any SDK, runtime, or proprietary platform. Google Cloud announced it on 2026-06-12; v0.1 at launch (\"a starting point, not a finished standard\"); v0.2 since 2026-07-24 adds provenance, trust, lifecycle and attested computations."
resource: "https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing"
timestamp: "2026-10-14T00:00:00Z"
author: "Yosi Izaq (distilled from Google Cloud announcement + spec, 2026-06-12)"
status: Active
capture_type: compiled
---

# Open Knowledge Format (OKF)

> **Source:** [Google Cloud Blog — How OKF can improve data sharing](https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing) · [Official spec: GoogleCloudPlatform/knowledge-catalog `okf/SPEC.md`](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md) (v0.1) · **Canonical home since 2026-08:** [GoogleCloudPlatform/open-knowledge-format `SPEC.md`](https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md) (v0.2)
> **Author:** Yosi Izaq (distilled from Google Cloud announcement + spec, 2026-06-12)
> **Captured:** 2026-06-27
> **Status:** Active
> **Type:** compiled

---

## TL;DR

OKF is a **vendor-neutral spec for representing curated knowledge as a directory of markdown files with YAML frontmatter**, so AI agents (and humans) can read, write, and exchange it without any SDK, runtime, or proprietary platform. Google Cloud announced it on **2026-06-12** as **v0.1** ("a starting point, not a finished standard"). **v0.2** shipped 2026-07-24 — see [v0.2 changes](#v02-changes-2026-07-24) below.

It formalizes the "LLM-wiki" pattern that's been surfacing for the past year as Obsidian vaults, `AGENTS.md`, and `llms.txt`. A bundle is *just files* — it renders on GitHub, ships as a tarball, mounts on any filesystem.

> **This is essentially the pattern this KB already uses.** See [[llm-knowledge-base-maintenance]] (built on Karpathy's "LLM Wiki" gist). OKF's value is that it *standardizes* the convention and gives drift/version metadata a defined home.

## OKF vs. RAG (they are complementary, not competing)

| | OKF | RAG |
|---|---|---|
| **What it is** | A **format** — how knowledge is *organized, curated, transported* | A **retrieval mechanism** — how relevant context is *re-derived at query time* |
| **Knowledge state** | Pre-compiled, stable, curated concepts agents load directly into context | Raw chunks re-embedded/re-searched per query |
| **Update model** | Agents/humans read and **edit the source** directly | Source is chunked; not edited in place |
| **Relationship info** | Cross-links survive as a graph | Lost in chunking |

**Complementary:** OKF gives RAG systems cleaner, structured source material plus relationship context that raw chunks don't carry. OKF standardizes *representation/transport*; RAG handles *retrieval*.

## Pros / Cons

**Pros**
- Zero lock-in — just markdown + YAML + git; no SDK, runtime, or account.
- Human- *and* agent-readable; renders on GitHub, ships as a tarball, mounts anywhere.
- The cross-link **graph survives** (RAG chunking loses it).
- Curated + stable + version-controlled → agents load it directly into context.
- Likely to become a shared interop standard; conformance bar is trivially low.

**Cons**
- v0.1 — will churn; early-adopter risk.
- Only `type` is enforced, so two "OKF" bundles can still be wildly inconsistent ("a standard, or just a folder?").
- No retrieval/search layer of its own — still need RAG or grep at scale.
- Tooling/validator ecosystem is immature.
- Curation is manual labor; metadata drifts if unmaintained.

## Bundle structure

A bundle is a directory tree of markdown files — **no prescribed organization**. Distribute as a git repo (recommended), tarball, or subdir of a larger repo.

```
sales/
├── index.md              # directory listing (progressive disclosure)
├── log.md                # chronological change history (optional)
├── datasets/
│   ├── index.md
│   └── orders_db.md
├── tables/
│   ├── index.md
│   ├── orders.md
│   └── customers.md
└── metrics/
    └── weekly_active_users.md
```

**Reserved filenames** (must NOT be used for concept docs):
- `index.md` — directory listing for progressive disclosure
- `log.md` — chronological update history

## Concept documents

Every concept is one UTF-8 markdown file = **YAML frontmatter + markdown body**.

### Frontmatter fields

| Field | Status | Meaning |
|---|---|---|
| `type` | **REQUIRED** (the only one) | Short string identifying the kind of concept. Consumers use it for routing, filtering, presentation. |
| `title` | recommended | Human-readable display name |
| `description` | recommended | Single-sentence summary |
| `resource` | recommended | URI uniquely identifying the underlying asset |
| `tags` | recommended | YAML list of short strings |
| `timestamp` | recommended (v0.1) | ISO 8601 datetime of last meaningful change. **Superseded in v0.2 by `generated.at`.** |

- Producers **may add custom key-value pairs**; consumers **must preserve unknown keys** and tolerate unrecognized fields.
- Conventional (optional) body section headings: `# Schema`, `# Examples`, `# Citations`.

### Example

```yaml
---
type: BigQuery Table
title: Orders
description: One row per completed customer order.
resource: https://console.cloud.google.com/bigquery?p=acme&d=sales&t=orders
tags: [sales, revenue]
timestamp: 2026-05-28T14:30:00Z
---
# Schema
| Column | Type | Description |
|--------|------|-------------|
| `order_id` | STRING | Globally unique order identifier. |
| `customer_id` | STRING | FK to [customers](/tables/customers.md). |
```

## Cross-linking

- **Absolute (bundle-relative):** begin with `/`, relative to bundle root — **recommended** (stable when docs move).
- **Relative:** standard markdown relative paths.
- A link asserts a relationship; the *kind* of relationship is conveyed by surrounding prose, not the link itself.
- Consumers must tolerate broken links gracefully.

## index.md (progressive disclosure)

No frontmatter (one exception below). Enumerates directory contents so an agent can navigate without loading everything:

```
# Section Heading
* [Title](url) - short description
```

Descriptions should come from the linked concept's frontmatter. May be auto-generated by producers or synthesized dynamically by consumers.

## log.md (change history)

Optional. Date-grouped, **newest first**, ISO 8601 `YYYY-MM-DD` headings:

```
## 2026-05-22
* **Update**: Description.
* **Creation**: Description.
```

## Versioning

Bundle may declare target version via `okf_version: "0.1"` in the **bundle-root `index.md` frontmatter** — the *only* case where an `index.md` carries frontmatter. Consumers should attempt best-effort consumption rather than refusing unknown versions.

## Conformance

A conformant bundle requires only:
1. Every non-reserved `.md` file has parseable YAML frontmatter.
2. Every frontmatter block has a non-empty `type` field.
3. Reserved filenames (`index.md`, `log.md`) follow their structures when present.

Consumers must **not** reject bundles for: missing optional fields, unknown `type` values, unknown keys, broken links, or absent index files. Everything beyond the three rules is soft guidance.

## Design principles

1. **Minimally opinionated** — only `type` is required; no prescribed content model.
2. **Producer/consumer independence** — who writes ≠ who consumes; the format is the contract, tooling is swappable at each end.
3. **Format, not platform** — no accounts, no SDK; published as an open standard.

## Reference implementations shipped by Google

- **Enrichment agent** — walks BigQuery datasets, drafts OKF docs, crawls docs to enrich them.
- **Static HTML visualizer** — converts a bundle into an interactive graph view, no backend.
- **Sample bundles** — GA4 e-commerce, Stack Overflow, Bitcoin datasets.

## v0.2 changes (2026-07-24)

The spec moved to its own repo, [GoogleCloudPlatform/open-knowledge-format](https://github.com/GoogleCloudPlatform/open-knowledge-format), in 2026-08; the `knowledge-catalog/okf/` copy is a frozen snapshot. v0.2 is a minor bump with **two breaking changes**. A v0.1 bundle is still consumable through the fallbacks the spec defines.

**Breaking**
- `timestamp` → `generated: { by, at }`. Consumers MAY fall back to a legacy `timestamp`.
- The body `# Citations` list → frontmatter `sources`. Consumers MAY still parse a legacy `# Citations` list.

**Added (all optional)**

| Family | Fields | Meaning |
|---|---|---|
| Provenance | `sources: [{ id, resource, title, author, usage_count, last_modified }]`, `usage_window` | What the concept derives from. `resource` is required per entry. Per-claim attribution uses a markdown footnote whose label is a `sources[].id` (`[^id]`). Credibility is *inferred* from the signals, never stored as a score. |
| Trust | `generated: { by, at }`, `verified: [{ by, at }]` | Who wrote it vs who confirmed it. A bare `verified` mapping = a one-element list. |
| Trust tier (derived) | — | No `verified` → **unverified**; only non-human verifiers → **machine-confirmed**; any `human:` verifier → **human-reviewed**. Advisory, not access control. |
| Lifecycle | `status: draft \| stable \| deprecated` (absent ⇒ `stable`), `stale_after: <instant>` | Stale when `now >= stale_after`. |
| Computation | `type: Attested Computation` + `runtime`, `parameters`, `computation`, `executor`, `attester`; body `# Computation` | A sanctioned way to compute a value; an agent only fills declared parameters, and a deterministic (no-LLM) attester checks the run's receipt. |

**Actor convention** for `generated.by` / `verified[].by`: `<producer>/<version>` for agents, `human:<id>` for people (MUST be used for human-authored or human-confirmed content), `process:<id>` for automation.

All timestamps are ISO 8601 datetimes with an explicit UTC offset (e.g. `2026-06-30T14:00:00Z`). The root `index.md` declares `okf_version: "0.2"`.

**Unchanged:** the three conformance rules, reserved filenames, the required `type`, the recommended `title`/`description`/`resource`/`tags`, cross-linking, and the `index.md` / `log.md` formats.

**Tooling:** the reference CLI (`reference_agent`) has two subcommands: `enrich` (an agent that drafts concepts from BigQuery or web sources) and `visualize` (a static HTML graph viewer). There is **no official validator**, so conformance is checked by your own tooling (this KB: `tools/okf_validate.py`).

## How this maps to *this* KB's conventions

| This KB (see [CLAUDE.md] / KNOWLEDGE-CAPTURE.md) | OKF v0.1 | Gap to close if adopting |
|---|---|---|
| 5-field frontmatter (Source/Author/Captured/Status/Type) | `type` required + recommended `title`/`description`/`resource`/`tags`/`timestamp` | Add `type`; map fields. Custom keys are allowed, so existing fields can stay. |
| `README.md` master index | `index.md` per directory (progressive disclosure) | Per-dir `index.md` vs one master README — additive, not conflicting. |
| `log.md` append-only, `## [YYYY-MM-DD] action \| topic \| source` | `log.md`, newest-first, `## YYYY-MM-DD` + `* **Action**:` bullets | Order (newest-first) and bullet shape differ. |
| Kebab-case files, `## See Also` bidirectional links | Bundle-relative `/`-absolute links; relationship in prose | Switch links to `/`-absolute for move-stability. |
| `Type: source \| compiled` | `type` is free-form per-concept | Our `compiled/source` could become one custom field alongside `type`. |
| `Status: Active \| Draft \| Stale \| Archived` | v0.2 defines `status: draft \| stable \| deprecated` + `stale_after` | Map Active→`stable`, Draft→`draft`, Archived→`deprecated`; Stale → a past `stale_after`. |
| `Author:` / `Captured:` | v0.2 `generated: { by: human:<id>, at }` | Author+date become one `generated` entry; `timestamp` is legacy. |

**Net:** the KB is ~80% OKF-shaped already. Adoption is mostly (a) add a `type` to every file, (b) add per-directory `index.md`, (c) normalize `log.md` ordering, (d) prefer `/`-absolute links.

## Sources

- Google Cloud Blog, 2026-06-12 — https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing
- Spec v0.2 (canonical) — https://github.com/GoogleCloudPlatform/open-knowledge-format/blob/main/SPEC.md
- Spec v0.1 → v0.2 history (frozen copy) — https://github.com/GoogleCloudPlatform/knowledge-catalog/commits/main/okf/SPEC.md (v0.2 migration commit #227, 2026-07-24)

## See Also

- [[llm-knowledge-base-maintenance]] — the "LLM Wiki" pattern (Karpathy gist) this KB is built on; OKF formalizes it.
- [[local-llm-setup-ollama-continue-vscode]] — running local models that could consume/produce OKF bundles.
