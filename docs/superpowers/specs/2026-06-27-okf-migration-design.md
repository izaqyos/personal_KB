# OKF Migration — Design Spec

> **Status:** Approved design (brainstorming complete) — pending implementation plan
> **Date:** 2026-06-27
> **Author:** Yosi Izaq (with Claude)
> **Scope repos:** `personal_KB` (pilot), `git_cp/p81-imagine-rag` (assessment/follow-on). `personal_code` is OUT of scope.
> **Reference:** [Open Knowledge Format (OKF)](/ml-and-ai/llm-kb/open-knowledge-format-okf.md) · [Official spec](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

---

## 1. Problem / Motivation

Google Cloud announced the **Open Knowledge Format (OKF) v0.1** on 2026-06-12 — a vendor-neutral spec for curated knowledge as a directory of markdown files with YAML frontmatter. It formalizes the "LLM-wiki" pattern this KB already runs on (Karpathy gist → [llm-knowledge-base-maintenance](/ml-and-ai/llm-kb/llm-knowledge-base-maintenance.md)). Adopting it gives: a likely interop standard, machine-readable frontmatter, a navigable concept graph, and version metadata — at low cost because the KB is already ~80% the same shape.

**OKF's only hard requirement:** every non-reserved `.md` has parseable YAML frontmatter with a non-empty `type`. Reserved files `index.md` and `log.md` follow defined structures when present. Everything else is soft guidance.

## 2. Decision

Adopt OKF, **piloting on `personal_KB`** in two phases, validate the pilot, then sweep. Assess (and likely migrate) `p81-imagine-rag` reusing the same tooling. Do **not** touch `personal_code` (it is a code repo; OKF is for knowledge, not source).

## 3. Current state (surveyed 2026-06-27)

- **982 `.md` files**; only **5** have YAML frontmatter, **73** use the blockquote `> **Source:**` header, ~900 have no structured metadata.
- **~40 extensionless legacy mega-dumps** at root (`kb-cpp` 1.8M, `dominions-kb` 4M, `sap-cf-kb` 3.1M, `java-kb` 886K, …) — raw reference, not curated concepts.
- 33 top-level dirs. Master index = `README.md`. `log.md` is append-only, oldest-first, `## [YYYY-MM-DD] action | topic | source`.
- Links are relative. Cross-refs via `## See Also`.

## 4. Scope

| Phase | Target set | In/Out |
|---|---|---|
| **A (pilot)** | Curated subset: the 73 blockquote + 5 YAML files + their organized topic dirs (`ml-and-ai/`, `system-design/`, `network/`, `databases/`, `interviews/`, `js-fe-frameworks/`, `FE/`, `typescript/`, …) — **~78 files** | IN |
| **A** | ~900 unstructured legacy `.md`, ~40 extensionless dumps, `raw/` | OUT (Phase B / never) |
| **B (sweep)** | Whole repo: remaining `.md` get frontmatter+`type`; extensionless dumps renamed `.md` + frontmatter (or explicitly fenced); `index.md` everywhere; **all relative links rewritten to `/`-absolute** | IN (after A validated) |
| **p81-imagine-rag** | Separate work repo, already 68% conformant — add `type`, normalize, exclude internal dirs | Follow-on, same tooling |

`personal_code` — **OUT** entirely.

## 5. Phase A design (approved approach "A")

### 5.1 Tooling (reusable across A, B, p81-rag)
- **`tools/okf-migrate.py`** — idempotent. For each in-scope file: inject/merge YAML frontmatter at the very top, **keeping the `> **Source:**` blockquote** below the `# Title` (header style decision: *add YAML, keep blockquote*). Re-running must not duplicate or clobber existing frontmatter.
- **`tools/okf-validate.py`** — checks the 3 OKF hard rules over a target dir set; prints non-conformant files. This **is** the "validate it went well" gate.
- **`tools/okf-genindex.py`** (may be folded into migrate) — generate per-dir `index.md` from frontmatter.

### 5.2 Frontmatter mapping (YAML on top; blockquote retained)
| OKF field | Derived from | Notes |
|---|---|---|
| `type` *(required)* | path / filename / content heuristics | Taxonomy below; default `reference` |
| `title` | `# Title` line | |
| `description` | first TL;DR / summary line | |
| `resource` | URL inside `> **Source:**` | omit if none |
| `tags` | topic dir + keywords | YAML list |
| `timestamp` | `Captured:` date | ISO 8601 (`YYYY-MM-DDT00:00:00Z` if only a date) |
| `author` | `> **Author:**` | custom key |
| `status` | `> **Status:**` | custom key |
| `capture_type` | `> **Type:**` (`source`/`compiled`) | **custom key — must NOT collide with OKF `type`** |

**`type` taxonomy (v1):** `guide`, `reference`, `cheatsheet`, `pattern`, `decision-pack`, `system-card`, `primer`, `comparison`, `security-review`, `setup`. Unknown → `reference` (flagged in migrate output for manual review).

### 5.3 Indexes
- **In-scope precisely =** the files that already carry frontmatter (blockquote or YAML), wherever they live. Unstructured `.md` sharing a dir with them stay OUT until Phase B.
- Auto-generate `index.md` in each dir containing in-scope files, listing the **in-scope files only** (`* [Title](/abs/path) - description` from frontmatter). Dirs that mix curated + unstructured files get a **partial** index in A, completed in B (this is expected, not a defect).
- **Keep `README.md`** as the human landing page (non-reserved file — allowed by OKF).
- Add `okf_version: "0.1"` to a **root `index.md`** (the only index.md permitted frontmatter).

### 5.4 log.md
**Decision: reshape to OKF form** — newest-first, `## YYYY-MM-DD` headings, `* **Action**:` bullets, preserving every existing entry. Scripted + git-tracked → reversible. (Action verbs map: ingest→Creation, update→Update, etc.)

### 5.5 Links
Phase A: `/`-absolute only for the new `index.md` links. Existing relative `See Also` links unchanged in A. Full relative→`/`-absolute rewrite is **Phase B**.

### 5.6 Validation gate (exit criteria for Phase A)
`okf-validate.py` passes: every in-scope file has parseable YAML frontmatter + non-empty `type`; all `index.md` links resolve; root `index.md` has `okf_version`; `log.md` parses as OKF. Spot-check render of 3–4 files. Only then "gear up for B."

## 6. Phase B outline (after A validated)
- Frontmatter+`type` on all remaining `.md`.
- Extensionless dumps: rename `<name>` → `<name>.md` + minimal frontmatter (`type: reference`, `capture_type: source`), OR fence under a clearly-marked legacy/raw area. Decide per-file size/value during B planning.
- `index.md` in every dir.
- **Relative → `/`-absolute link rewrite** repo-wide (scripted, single consistent pass). Rationale: a `/`-absolute link is identical regardless of the referencing file's location, so files can move without breaking links (OKF-preferred). Trade-off: not clickable on GitHub web view, needs base-path config in some local viewers — acceptable for an agent-facing bundle.

## 7. p81-imagine-rag follow-on
- Already **68% conformant**: 483 `.md`, 100% have YAML frontmatter (ETL'd, PII-scrubbed; `_manifest.json` inventory).
- **Blocking gap: no `type`** (has `domain`, orthogonal — keep both). Reuse `okf-migrate.py`.
- Normalize `etl_run` → ISO 8601 `timestamp`; consider `README.md` → `index.md`.
- **Exclude / mark `access_control: internal`:** `incidents/`, `kb/bugs/`, `processes/` (team-internal ops knowledge). `_manifest.json` stays an ETL artifact, not in-bundle.
- Effort ~half a day; the KB pilot de-risks it.

## 8. Risks & mitigations
- **v0.1 churn** → frontmatter is additive; blockquote retained; all scripted/reversible.
- **`type` collision** with existing `Type:` → mapped to `capture_type`.
- **Bad auto-`type`** → migrate flags defaults for manual review; validate gate before B.
- **log.md reshape invasive** → scripted, content-preserving, git-tracked.
- **Link rewrite breakage** (Phase B) → validator resolves every link before commit.

## 9. Out of scope
- `personal_code` (code repo).
- Phase B execution (planned only after A validated).
- Any Google OKF *software*/validator adoption — this is content restructuring, not tooling lock-in.

## 10. Decisions made during brainstorming
1. Approach **A** (curated-core, legacy fenced) for the pilot; **B** (whole-repo) after validation.
2. Header style: **add YAML, keep blockquote**.
3. log.md: **reshape to OKF**.
4. `personal_code`: **out**. CheckPoint target = `p81-imagine-rag` (clean ETL repo), **assess + likely migrate**, not the raw work tree.
