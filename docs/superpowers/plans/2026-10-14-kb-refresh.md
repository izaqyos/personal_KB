---
type: plan
title: "Personal KB refresh: private split, dedupe, txt→md, tags, links, outdated rewrite"
description: Phased plan (Sonnet work packages, Opus rewrites) to split employer KBs out, dedupe, convert legacy text to split markdown notes, tag, link and refresh outdated content.
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
status: stable
---

# Personal KB refresh: private split, dedupe, txt→md, tags, links, outdated rewrite

## Context
`~/work/git/personal_KB` (**PUBLIC** repo, `main` = OKF v0.2 compliant since today) has two layers:
- **145 curated OKF notes** (`*.md`): only 4 have `tags`, 10 have `description`, 17 have no inbound links from other notes, 220 one-way links have no backlink.
- **~650k lines of legacy text**: ~120 `utl.vim`-style KB files (`KB_python`, `kb-cpp`, `sap-cf-kb`, …) plus 25 `.txt` files.
  - Legacy format: a numbered TOC with `<URL:#tn=…>` anchors (utl isn't installed in nvim, so the links are dead), then a body with `N. Title` headings at column 0 and tab-indented `N.M` subsections. Some headings carry inline `tags: …`.
  - Content is often outdated (e.g. Python 2 `print "%x"` in `python/KB_python`).
  - Some of it is former-employer material that shouldn't be public.

The user wants:
- outdated knowledge flagged **and rewritten to current practice** (rewrites done by Opus agents);
- `.txt` and legacy text converted to `.md`, **split into one note per top-level section**;
- tags/keywords, plus missing links and backlinks;
- employer KBs **moved to a private repo**;
- redundant similar-named files and folders consolidated.

Execution is by **Sonnet agents**; Opus only for content rewrites. The plan is written as self-contained work packages.

## Global rules (paste into every agent prompt)
1. Repo `~/work/git/personal_KB`, branch `kb-refresh` (created in P0). Never push, force-push or rebase. Never delete outside the approved lists in this plan.
2. Read `CLAUDE.md` and `agents/KNOWLEDGE-CAPTURE.md` first.
   - Commit messages: `kb: <phase-id> — <what>`, **no Co-Authored-By**.
   - Each change gets a bullet under today's `## YYYY-MM-DD` at the top of `log.md`.
3. The repo is public. Never add employer-internal content, hostnames, colleague names, secrets or personal data. If you find any, add it to `docs/kb-review/sensitive.md` instead of copying it.
4. Never invent facts. Every outdated/current claim needs a source URL found with WebSearch/WebFetch in this session.
5. Gate before every commit (venv: `python3 -m venv .venv && .venv/bin/pip install -r tools/requirements-dev.txt`; `.venv/` is gitignored):
   `.venv/bin/python tools/okf_genindex.py . && .venv/bin/python tools/okf_validate.py . --strict && .venv/bin/python tools/okf_links.py . --check && (cd tools && ../.venv/bin/python -m pytest -q)`.
   All must pass.
6. Frontmatter format: OKF v0.2 per `agents/KNOWLEDGE-CAPTURE.md#frontmatter-standard`, with `generated: { by: "human:izaqyos", at: <ISO> }`.
7. Reuse `tools/okf_lib.py`; don't duplicate it. Relevant helpers:
   - frontmatter: `read_frontmatter`, `render_frontmatter`, `inject_frontmatter`, `build_frontmatter`, `derive_type`;
   - links: `extract_internal_links`, `rewrite_links`, `_fence_state_lines`;
   - indexes: `index_plan`, `generate_index_v2`;
   - logs and validation: `normalize_log`, `validate_*`.

   Use `tools/okf_migrate.py:iter_all_md` to walk files. New scripts go in `tools/`, with tests in `tools/test_*.py`.

## Phases (run in order; ⏸ = stop for user approval)

### P0: Setup (orchestrator, 5 min)
- `git checkout main && git pull --ff-only && git checkout -b kb-refresh`.
- Copy this plan to `docs/superpowers/plans/2026-10-14-kb-refresh.md` (agents read it there). Create `docs/kb-review/`.
- Commit.

### P1: Employer KBs → private repo (1 Sonnet agent)
- **Whole-file moves** (confirmed employer material):
  - `sap-cf-kb`, `sap-cf-kb-v2` (SAP);
  - `ACS/` (7 files), `acs-faqs`, `kb-cisco` (Cisco);
  - `ge-kb`, `ge-pet-kb` (GE);
  - `sfe-commands`, `sfe-how-to`, `troubleshoot` (SFE team, Comverse).
- **Check first, then move or keep:** `kb-uii` and `kb-jrules`. Move if the content names internal products, hosts or colleagues.
- **Steps:**
  1. `gh repo create izaqyos/personal_KB_private --private --description "Private KB: former-employer notes"`. No existing private repo matches; `obsidian_notes` is a different purpose.
  2. Clone to `~/work/git/personal_KB_private`. Copy the files, keeping paths under `employers/<company>/…`, with a README listing their origin. Commit and push **that** repo. Pushing the private repo is approved by this plan.
  3. In personal_KB: `git rm` them, and remove their rows from `README.md` (add a one-line note that employer notes live in a private repo, with no link).
- **Mixed files:** scan the remaining legacy KBs for employer markers (`grep -nEi 'cisco\.com|\.cisco\.|sap\.corp|wdf\.sap|ondemand\.com|ge\.com|gehealthcare|checkpoint|comverse'`, plus internal-looking hostnames and colleague names). List hits in `docs/kb-review/sensitive.md` (file, line, reason, proposed action: move-section / redact / public-ok). Don't edit mixed files yet; P3 applies the approved actions per section.
- Commit: `kb: P1 — move employer KBs to private repo`.
- ⏸ **User reviews `sensitive.md`**, and decides whether to purge history. HEAD-only removal leaves the files in public git history. The optional purge, `git filter-repo --path … --invert-paths` + force-push, needs explicit approval and isn't part of this plan.

### P2: Redundancy report and cleanup (1 Sonnet agent)
1. Write `tools/kb_redundancy.py`:
   - cluster names (lowercase; strip `kb`/`KB_`/`-kb`, `_`/`-`, `.txt`/`.back`/`-updated`/`_N`/`-1-3`/`-v2` suffixes);
   - for each pair, compute: byte-identical? line-set Jaccard? A ⊂ B (≥95% of A's lines in B)?
   - output `docs/kb-review/redundancy.md`.
2. Known clusters to cover:

   | Cluster | Notes |
   |---|---|
   | `*.txt` twins | 11 byte-identical: `Network/{NetworkKB,sslKB,ACE/aceKB}.txt`, `python/KB_python.txt`, `bash/KB_bash.txt`, `linux/KB_Linux.txt`, `perl/KB_perl.txt`, `sed/KB_sed.txt`, `awk/kb_awk.txt`, `ant/antKB.txt`, `algorithms/archive/AlgorithmsKB.txt` |
   | `perl/KB_perl.back` | |
   | `vi/vi_tips` vs `vi/vi_tips_updated` | |
   | vimrc set | `vi/{.vimrc,.vimrc-back,_vimrc,_vimrc_windows,vimrc.txt,vimrc.html}`, `linux/environment_files/.vimrc` |
   | `vi/search_n_replace_{1,2}` | |
   | `dominions-kb` vs `dominions-kb-1-3` vs `dominions-kb.html` | |
   | `kb-cpp` vs `CPP/` | README says different content; verify |
   | `unix-kb` vs `linux/KB_Linux` | |
   | `windows/{kb-win,kb-windows}` vs `windows-shortcuts/windows_kb` | |
   | `kb-tools` | Legacy notes; not the same as `tools/` (OKF scripts). Rename to avoid confusion |
   | Junk | 12 tracked `.DS_Store`; `CPP/cpp_performance_KB.{aux,dvi,log,toc}` LaTeX build artifacts (keep `.tex`/`.pdf`) |

3. Proposed action per row:
   - **delete** (identical, or junk/backup fully contained in the kept file);
   - **merge** (overlapping: keep the newer/larger file as the base; append unique sections from the other under `## Merged from <file>`);
   - **keep both** (different content; give them distinct names);
   - **rename**.
4. ⏸ **User approves the table.** Then apply it: deletions via `git rm`; add `.DS_Store` and `*.aux *.dvi *.toc` (for `CPP/`) to `.gitignore`; merges before P3 so the merged file converts once.
5. Commit: `kb: P2 — dedupe <n> redundant files`.

### P3: Legacy text → split markdown notes (1 Sonnet agent writes the tool; the run is mechanical)
**Tool:** `tools/kb_txt2md.py` with tests. Behaviour:
- **Input:** a legacy file.
- **Normalise first:** if not UTF-8, decode as cp1252/latin-1 → UTF-8. CRLF → LF. Tabs are kept inside fences.
- **TOC:** the block before the first body heading that matches TOC entry 1. Recognise it by a `Table Of Contents` banner and/or lines ending `<URL:#tn=…>`. Drop it; the generated index replaces it.
- **Body:** split on top-level headings that match TOC top entries (`^\d+\. title` at column 0, title equal to the TOC title after stripping `<URL…>` and whitespace). One file per top-level section: `<dir>/<kb-slug>/<NN>-<title-slug>.md`. Examples: `python/KB_python` → `python/kb-python/12-logging.md`; root `kb-cpp` → `kb-cpp/…`.
- **Note content:**
  - `# <Title>`;
  - subsections (`N.M…` TOC titles found in the section) become `##`/`###`/`####` by depth;
  - the text between headings goes verbatim inside a fenced block. Use a fence longer than any backtick run inside, info-string `text`. Don't render raw text as markdown.
- **Frontmatter:**
  - `type: reference` (or `cheatsheet` if the title contains one-liners/cheat/shortcuts);
  - `title`;
  - `tags`: the harvested inline `tags:` values, lowercased and deduped, plus the KB name;
  - `generated: { by: "human:izaqyos", at: <last commit ISO of the source file> }`;
  - `status: stable`;
  - `capture_type: source`;
  - `legacy_source: <original path>#<section number>`.
- **Index:** `index.md` per KB folder via `okf_genindex.py`. The KB also gets a `README.md` (type `guide`) listing its sections in TOC order.
- **No-TOC files:** no TOC, or under 2 top-level sections (e.g. `unix-kb`, `troubleshoot`) → one note, `<name>.md`, with the body fenced.
- **Third-party copies stay unconverted:** `bash/Advanced_Bash_Scripting_Guide`, `bash/Bash_Guide_For_Beginners`, `vi/vi_manual.txt`, `vi/CVIM_Help`, `vi/VI_FAQS`, `python/Python_Programming_Print_Version`, `python/Thinking_Tkinter`, `sed/SedTutorial`, `awk/awk_tut`, `Network/rfc1180.txt`, and HTML exports. Move them with `git mv` into `raw/third-party/<topic>/`, unchanged. Add a short pointer note `<topic>/<name>.md` (type `reference`, with `resource:` = the canonical public URL, found via WebSearch).
- **Leave as-is:** `*/examples/**`, scripts, images and data files.
- **Delete the source** with `git rm` after the split note set passes the gate; history keeps it.
- **Scope:** every remaining extensionless or `.txt` legacy KB after P1/P2. About 75 files → roughly 1,300 notes. Section counts: `leetcode-kb` 331, `java-kb` 127, `vi/KB_vi` 81, `python/KB_python` 70.
- **Sensitive sections:** apply the P1-approved actions (move to the private repo, or redact) during the split.

**Tests (must pass):**
- TOC parsing with nested and odd indentation (`KB_python`'s `    3.1.2.1`);
- a heading with `tags:`;
- a title absent from the body (skip, report);
- duplicate titles (suffix `-2`);
- a fence containing backticks;
- a latin-1 file;
- round-trip: the concatenation of the fenced bodies equals the original body text, minus heading lines (asserts nothing is lost).

**Run:** one commit per top-level folder (`kb: P3 — convert python/ legacy KB to <n> notes`), gate green each time.
⏸ **Spot-check:** the user opens 3 converted KBs on a GitHub preview, or locally with `glow`, before the remaining folders run.

### P4: Tags and descriptions (Sonnet, batches of ≤40 notes; parallel by folder, max 4 agents)
- **First (1 agent):** build `tools/tags.yaml`, the controlled vocabulary. Harvest it from:
  - existing frontmatter `tags`;
  - the P3-harvested inline tags;
  - folder names;
  - README section names.

  Normalise to kebab-case singular, ~150–250 tags, grouped (language, networking, security, os, tooling, ai, algorithms, …). Commit.
- **Per batch:** for each note, read the frontmatter and the first ~150 lines. Then:
  - set `description` (one factual sentence, ≤160 chars, no marketing);
  - set `tags` (3–8, **only from `tags.yaml`**). New tag candidates go into `docs/kb-review/tag-proposals.md`, not into notes.

  Edit frontmatter only, via `okf_lib` render (no body changes).
- **After all batches:** the orchestrator reviews `tag-proposals.md`, adds accepted tags to `tags.yaml`, and one agent applies them.
- Commit per folder: `kb: P4 — tags+descriptions <folder>`.

### P5: Links and backlinks
- **5a, mechanical (1 Sonnet agent writes `tools/kb_backlinks.py` + tests):**
  - For every concept→concept link A→B where B has no link to A, maintain a managed block at the end of B:
    `## See Also` plus `<!-- backlinks:start -->` … `<!-- backlinks:end -->`, one bullet `* [A title](/A.md)` each.
  - Idempotent. Never touch text outside the markers. Skip `index.md`/`log.md`/README.
  - Expected ~220 backlinks before P3, more after.
- **5b, semantic missing links (Sonnet, per tag cluster):**
  - `tools/kb_related.py` proposes candidate pairs: notes sharing ≥2 tags, or title terms, with no existing link either way. It writes `docs/kb-review/link-candidates.md`.
  - Agents judge each candidate by reading both notes. For true relations, they add one prose bullet in A's `## See Also` (outside the managed block), e.g. `[B](/B.md) — why it's related`.
  - Priority: the 17 curated notes with no inbound links, then curated↔legacy bridges (e.g. `Network/ipsec-primer.md` ↔ the converted `Network/kb-network/*ipsec*`).
  - Re-run 5a after 5b.
- Commit: `kb: P5 — backlinks + related links`.

### P6: Outdated triage (Sonnet, parallel by folder, max 4; WebSearch required)
- Per note, flag content that is outdated **as of 2026-10**, with a source. Examples:
  - Python 2 syntax and libraries;
  - deprecated APIs and tools: win2k, cygwin-era scripts, Eclipse/IntelliJ specifics, old Node/Java versions, iPhone, old vim plugins;
  - stale model/tool lineups in `ml-and-ai/llm-kb/*`, which move monthly;
  - dead links (HEAD-check external URLs; record 404s).
- Output rows in `docs/kb-review/outdated.md`: `note | section | claim | why outdated | current practice | source URL | severity (high: wrong now / med: superseded / low: historical-only) | action (rewrite / deprecate / ok)`.
- Pure-history topics that have no modern equivalent (win2k perf, utl.vim) → `action: deprecate` (`status: deprecated`, a one-line reason, no rewrite).
- Edit no files except the report. Commit the report.
- ⏸ **User skims `outdated.md`** (high and med rows) and strikes rows to skip.

### P7: Rewrites (Opus agents, model `opus`; batches of ≤10 notes, max 3 parallel)
- For each approved `rewrite` row, rewrite the section in place to current practice:
  - proper markdown (unfence code, add language tags);
  - keep the note's structure and headings;
  - add a `sources:` entry (`id`, `resource`, `title`) per source, with `[^id]` footnotes on the changed claims (OKF §5.1);
  - bump `generated.at`;
  - set `stale_after` (+6 months for ml-and-ai/llm notes, +24 months otherwise).
- Unchanged sections stay fenced as-is.
- Apply `deprecate` rows: `status: deprecated` plus a one-line `> Deprecated (2026-10): reason` under the title.
- Fix dead links: point them to the current URL, or mark them `(dead link, 2026-10)`.
- Commit per batch: `kb: P7 — rewrite outdated <topic>`, gate green.

### P8: Finish (orchestrator)
- Regenerate indexes.
- Update `README.md`: new KB folder layout, `raw/third-party/`, the tag vocabulary pointer, and the note about the private repo.
- Add a log entry summarising P1–P7 counts.
- Full gate plus a final `okf_audit` (the scratch audit script, or `okf_validate --strict`).
- Report: commits, files per phase, rows left in `outdated.md` and `sensitive.md`.
- Don't push. Give the user the review and push commands (⏸).

## Agent prompt template (Sonnet, for P4/P5b/P6 batches)
```
You are a KB maintenance agent. Follow "Global rules" in docs/superpowers/plans/2026-10-14-kb-refresh.md exactly.
Phase: <P4|P5b|P6>. Work package: <folder or file list>. Inputs: <tags.yaml / link-candidates rows / notes>.
Do only this phase's edits. Before committing run the gate; if anything fails, fix it or stop and report.
Return: files changed, rows added to docs/kb-review/*.md, anything you skipped and why.
```
The orchestrator (main session) dispatches packages with the Agent tool (`model: "sonnet"`, or `"opus"` for P7). It merges nothing itself, and checks each package's gate and diff stat before the next.

## Critical files
- **Modify:** `README.md`, `log.md`, `.gitignore`; legacy KBs (converted, then removed); all concept notes' frontmatter (P4); `## See Also` sections (P5); outdated sections (P7).
- **New:**
  - `tools/kb_txt2md.py`, `tools/kb_redundancy.py`, `tools/kb_backlinks.py`, `tools/kb_related.py`, `tools/tags.yaml`, plus their tests;
  - `docs/kb-review/{sensitive,redundancy,tag-proposals,link-candidates,outdated}.md`;
  - `raw/third-party/`;
  - a new private repo `izaqyos/personal_KB_private`.
- **Reuse:** `tools/okf_lib.py`, `tools/okf_migrate.py` (`iter_all_md`), `tools/okf_genindex.py`, `tools/okf_validate.py`, `tools/okf_links.py`, `tools/okf_upgrade_v02.py`.

## Verification
- Gate (rule 5) green after every commit. `pytest` covers the new tools, including the P3 no-loss round-trip test.
- **P3 no-loss check:** for each converted source, a script compares the source body lines (minus TOC and heading lines) against the concatenated fenced bodies; zero missing lines.
- **Public-safety check:**
  - `grep -rEi` for the P1 employer markers over the public tree shows only rows marked `public-ok` in `sensitive.md`;
  - the private repo contains every moved file (`diff` the lists).
- **Coverage targets:**
  - 100% of concept notes have `description` and ≥3 `tags` from `tags.yaml`;
  - 0 one-way links between curated notes;
  - 0 curated notes without inbound links;
  - 0 broken internal links (case-sensitive);
  - every `outdated.md` row is in `done` or `skipped` state.
- **Manual:** the user spot-checks the P3 output (⏸) and skims `outdated.md` (⏸) before Opus rewrites.
