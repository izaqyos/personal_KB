# Personal KB — Working Conventions

**Full conventions:** [`agents/KNOWLEDGE-CAPTURE.md`](agents/KNOWLEDGE-CAPTURE.md) -- routing table, frontmatter standard, workflows, rules.

Read that file before any capture. The rules below are a reminder, not a substitute.

---

## Golden Rules (enforced)

1. **Index** — every new `.md` must be linked from `README.md` under the correct section
2. **Log** — every change (ingest / update / rename / lint) gets a line in `log.md`:
   `## [YYYY-MM-DD] action | topic | source`
3. **Frontmatter** — every new `.md` (except README) gets the 5-field header (Source / Author / Captured / Status / Type) right after the `# Title`
4. **Kebab-case** — all new files and directories. Don't rename legacy files unless doing a full sanitization pass
5. **Deduplicate first** — search existing KB for the topic before creating a new file; prefer to update/enrich
6. **Distill, don't copy** — extract concepts, not raw dumps. Raw dumps go in `raw/`
7. **Cross-reference** — add `## See Also` to related files when topics overlap
8. **Git commit message** — `kb: {brief description}` -- no Co-Authored-By

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
