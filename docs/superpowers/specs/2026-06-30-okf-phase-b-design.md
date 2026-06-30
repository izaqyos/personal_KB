# OKF Migration — Phase B Design Spec

> **Status:** Approved design (brainstorming complete) — pending implementation plan
> **Date:** 2026-06-30
> **Builds on:** [Phase A (merged)](/docs/superpowers/plans/2026-06-27-okf-phase-a.md) · [original OKF migration design](/docs/superpowers/specs/2026-06-27-okf-migration-design.md) · [OKF reference](/ml-and-ai/llm-kb/open-knowledge-format-okf.md)
> **Repo:** `personal_KB`. `personal_code` and `git_cp/p81-imagine-rag` remain separate efforts.

---

## 1. Context

Phase A brought the **curated subset (80 files with existing frontmatter)** into OKF v0.1 conformance and is merged to `main` (tooling committed; content migration may still be uncommitted — see Prereq). Phase B extends conformance to the **rest of the real KB** and rewrites cross-links to the OKF-preferred form.

## 2. Scope reality (surveyed 2026-06-30)

Excluding `node_modules`, the embedded `learning/app/` Node project, and scratch dirs, the **real KB is 155 markdown files**:
- **80 already structured** (Phase A — have frontmatter)
- **75 unstructured** — the Phase B target. **All 75 have a `# title`** (0 without). ~45 are under `algorithms/*` (patterns, dp-patterns, strings, paradigms, graph, sorting, number-theory, geometry, searching); the rest are scattered (a couple in `learning/`, `typescript/`, `system-design/redis/`, `network/`, `ml-and-ai/theory/`).

Plus: **52 extensionless legacy dumps (~21 MB)** at root (e.g. `kb-cpp` 1.8M, `dominions-kb` 4M, `java-kb`), and **319 relative `.md` link occurrences across 105 files**.

> The original design's "~900 unstructured files" was inflated by `node_modules`; the true target is ~75 well-formed files.

## 3. Decisions (from brainstorm)

1. **Legacy dumps → left OUT of the bundle (fenced as legacy).** They are raw reference, not curated concepts; renaming a 4 MB dump into a "concept" adds noise and risks breaking references. No renames, no moves. Documented as out-of-bundle (optionally a single `legacy`-note listing them).
2. **Unstructured files → frontmatter = `type` (path-derived) + `title` (from `# heading`) + `status: Active`.** No fabricated `resource`/`author`/`capture_type` (no source metadata exists to map).
3. **Link rewrite → done in Phase B, as a separately-validated step.** Relative → bundle-absolute `/path`, gated by a link-checker. (Accepted trade-off: `/`-absolute links are not clickable on GitHub's web view; this is an agent-portability win.)

## 4. Tooling changes (extends the Phase A toolkit; same TDD discipline)

### 4.1 `okf_migrate.py` — `--all` mode
Add a `--all` flag that treats **every non-excluded `.md`** as in-scope (bypasses the `is_in_scope` filter), so metadata-less files get migrated. Exclusions unchanged (`.git`, dot-dirs, `raw/`, `node_modules`, `docs/superpowers/`, reserved `README.md`/`index.md`/`log.md`/`CLAUDE.md`). Idempotent: Phase A files already have YAML frontmatter → the existing-YAML path only ensures `type`, never duplicates.

### 4.2 `okf_lib.build_frontmatter` — default status
When no blockquote supplies a `Status`, default `status: "Active"`. This affects **only freshly-injected files** (the 75); Phase A files already carry `status` and re-runs hit the existing-YAML path, so behavior there is unchanged. Add a unit test for the no-blockquote case → `{type, title, status: Active}` (no resource/author/capture_type keys).

### 4.3 New `okf_links.py` — rewriter + checker (highest-risk unit, isolated)
- **Rewriter:** for each non-excluded `.md`, find relative markdown links (`](../x)`, `](./x)`, `](x.md)` and similar), resolve each against the **file's own directory** to an absolute repo path, and rewrite to `/`-absolute (`/dir/file.md`). **Skip:** `http(s)://`, `mailto:`, pure-anchor links (`#foo`), and already-`/`-absolute links. Preserve any `#anchor` suffix.
- **Checker:** for every `/`-absolute link in the repo, verify the target file exists relative to the bundle root; exit non-zero and list any broken link. This is the Phase B link gate.
- Pure path-resolution logic in `okf_lib` (testable, no I/O); file walking + writing in `okf_links.py`.

### 4.4 `okf_genindex.py` / `okf_validate.py` — unchanged
Both already pick up the newly-migrated files (they walk by frontmatter/`is_in_scope`, which is now satisfied by the 75).

## 5. Execution & gates (Task-7-style, NO auto-commit)

1. Confirm clean baseline (Phase A content committed) + full test suite green.
2. `okf_migrate.py . --all` (dry-run first; eyeball type histogram for the 75) → real run → idempotency re-run (0 changed).
3. `okf_genindex.py .` (indexes now cover ~155 files).
4. `okf_links.py --rewrite .` (relative → `/`-absolute).
5. **Two gates:** `okf_validate.py .` = 0 failures (conformance over all ~155) **and** `okf_links.py --check .` = 0 broken links.
6. Spot-check render; stage changes; hand to user (user commits).

## 6. Prerequisite
**Phase A's content migration must be committed first** (clean baseline) so Phase B's diff is reviewable in isolation. Phase B brainstorm/spec/plan can be authored without it; execution cannot start until it's done.

## 7. Out of scope
- Legacy-dump **content** (fenced, not migrated).
- `node_modules/`, `learning/app/` (embedded Node project — not knowledge).
- `personal_code`, `git_cp/p81-imagine-rag` (separate efforts; p81-rag reuses this same tooling later).

## 8. Risks & mitigations
- **Link-resolution correctness** (the main risk) → the checker validates every rewritten link resolves to a real file before the gate passes; rewrite + check are separate so a bad rewrite is caught, not shipped.
- **`/`-absolute GitHub-render** → accepted trade-off (agent-portability over web-click).
- **`--all` over-reach** → exclusions + dry-run histogram review before the real run.

## 9. Decisions log
1. Dumps: **out / fenced**. 2. Unstructured FM: **type + title + status:Active**. 3. Link rewrite: **in B, separately gated**.
