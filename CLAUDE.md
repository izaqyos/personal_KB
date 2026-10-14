# Personal KB — Working Conventions

> **Source:** Internal working conventions
> **Author:** Yosi Izaq
> **Captured:** 2026-05-07
> **Status:** Active
> **Type:** compiled

---

**Full conventions:** [`agents/KNOWLEDGE-CAPTURE.md`](agents/KNOWLEDGE-CAPTURE.md) -- routing table, frontmatter standard, workflows, rules.

Read that file before any capture. The rules below are a reminder, not a substitute.

---

## Golden Rules (enforced)

1. **Index** — every new `.md` must be linked from `README.md` under the correct section
2. **Log** — every change (ingest / update / rename / lint) gets an OKF-form entry at the **top** of `log.md`:
   `## YYYY-MM-DD` heading (newest first) + `* **Action**: [Title](/path.md) — source` bullets
3. **Frontmatter** — every new `.md` (READMEs included; not `index.md`/`log.md`/`CLAUDE.md`) starts with OKF v0.2 YAML frontmatter: `type` (required), `title`, `description`, `generated: { by: human:izaqyos, at: <ISO datetime> }`, `status: stable|draft|deprecated`. See `agents/KNOWLEDGE-CAPTURE.md#frontmatter-standard`
4. **Kebab-case** — all new files and directories. Don't rename legacy files unless doing a full sanitization pass
5. **Deduplicate first** — search existing KB for the topic before creating a new file; prefer to update/enrich
6. **Distill, don't copy** — extract concepts, not raw dumps. Raw dumps go in `raw/`
7. **Cross-reference** — add `## See Also` to related files when topics overlap
8. **OKF gate before commit** — `python tools/okf_genindex.py . && python tools/okf_validate.py . --strict && python tools/okf_links.py . --check` (needs `pip install -r tools/requirements-dev.txt`)
9. **Git commit message** — `kb: {brief description}` -- no Co-Authored-By

## Trigger Phrases (run the capture workflow)

- "add to my kb" / "save to personal kb" / "capture this" / "save this article" → Workflow A–D in [`agents/KNOWLEDGE-CAPTURE.md`](agents/KNOWLEDGE-CAPTURE.md)
- "sanitize kb" / "lint kb" → invoke `/sanitize-kb` skill
- `/kb-add <path-or-url>` → dedicated capture slash command (if present)
- `kb-capture` skill → invoke via `Skill` tool for the full capture workflow

## Directory Layout

Reference the routing table in [`agents/KNOWLEDGE-CAPTURE.md`](agents/KNOWLEDGE-CAPTURE.md#routing-table). Key anchors:

- `ml-and-ai/` — ML, LLMs, AI tooling
- `system-design/` — architecture, distributed systems
- `interviews/` — interview pattern guides
- `algorithms/`, `leetcode-kb` — DS & algorithms
- `raw/` — **immutable** source dumps, never LLM-modified
- `log.md` — append-only ingest log
- `README.md` — master index with ToC
