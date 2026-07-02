# OKF Migration — Phase B Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend OKF v0.1 conformance from the curated core (Phase A, merged as `kb: adopt OKF v0.1 for curated core (Phase A)`) to the remaining unstructured KB files, and rewrite in-content relative links to bundle-`/`-absolute form behind a link-checker gate.

**Architecture:** Extends the Phase A toolkit (`tools/okf_lib.py` pure library + thin CLI wrappers) with the same TDD discipline. Two mechanical changes to existing tools (`--all` mode on `okf_migrate.py`; a `status: Active` default in `build_frontmatter`), then one new isolated high-risk unit — the link rewriter/checker (`okf_links.py` + pure path logic in `okf_lib.py`). Execution runs the full pipeline against the real KB behind **two** gates (conformance + link integrity), with **no auto-commit**.

**Tech Stack:** Python 3.14, pytest, PyYAML (already installed in repo `.venv`). No new dependencies.

**Builds on:** [Phase B design spec](/docs/superpowers/specs/2026-06-30-okf-phase-b-design.md) · [Phase A plan](/docs/superpowers/plans/2026-06-27-okf-phase-a.md) · [OKF reference](/ml-and-ai/llm-kb/open-knowledge-format-okf.md)

## Global Constraints

- Python ≥ 3.11; use the repo-local venv at `.venv` (gitignored). Run tests with `.venv/bin/pytest`, tools with `.venv/bin/python`.
- No new dependencies (pytest + pyyaml only).
- All functions in `okf_lib.py` are **pure** (no file I/O); I/O only in CLI wrappers under `tools/`.
- **Idempotent:** re-running migrate or link-rewrite must not duplicate/corrupt output.
- `type` taxonomy (closed list): `guide, reference, cheatsheet, pattern, decision-pack, system-card, primer, comparison, security-review, setup`. Unknown → `reference`.
- Unstructured-file frontmatter = `type` (path-derived) + `title` (from `# heading`) + `status: Active`. **No fabricated `resource`/`author`/`capture_type`** (no source metadata exists to map).
- Migrate/rewrite exclusions (unchanged from Phase A): dirs `.git`, `raw`, `.venv`, `node_modules`, all dot-dirs; prefix `docs/superpowers/`; reserved filenames `README.md`, `index.md`, `log.md`, `CLAUDE.md`. Non-`.md` files (incl. the ~52 extensionless legacy dumps) are skipped automatically → **legacy dumps stay out of the bundle** (design decision 1).
- **Rewrite scope = content files only** (`iter_md`, which excludes reserved). README/log keep relative links (human-clickable on GitHub); generated `index.md` files are already `/`-absolute. **Check scope = all `.md` incl. reserved** (validates the generated `index.md` links too).
- Link rewriter and checker are **fence-aware**: links inside ```` ``` ````/`~~~` code fences are never rewritten and never checked (avoids corrupting/false-flagging example code).
- **Commits:** Tasks 1–3 (tooling under `tools/`) commit normally with `kb: {desc}` messages (no Co-Authored-By). **Task 4 (KB content migration + link rewrite) must NOT be auto-committed** — stage, print a summary, hand to the user.

---

## Scope reality (surveyed 2026-07-01, post-Phase-A)

`iter_md` currently yields **122 `.md` files** (node_modules/raw/dot-dirs/docs-superpowers/reserved already excluded). Of those, **72 are already conformant** (Phase A) and **50 are unstructured** — the Phase B migrate target:
- **49 under `algorithms/*`** (dp-patterns, geometry, graph, number-theory, paradigms, patterns, searching, sorting, strings, + `complexity-theory.md`)
- **1** `learning/PILLARS.md`

> The design spec's "~75 unstructured" was an earlier estimate; the true current count is **50**. The tooling operates on whatever `iter_md` yields, so the exact number is not hard-coded. `learning/app/` needs no special exclusion — its only non-`node_modules` `.md` is `README.md`, already reserved (verified 2026-07-01).

Link rewrite target: relative markdown links across content files (Phase A design cited ~319 occurrences / ~105 files; the checker validates the result regardless of count).

---

### Task 1: Migrate unstructured files (`--all` mode + `status: Active` default)

Enables the 50 unstructured files to receive correct frontmatter. Two coupled changes delivering one outcome: "unstructured files migrate to `{type, title, status: Active}`."

**Files:**
- Modify: `tools/okf_lib.py` (`build_frontmatter` — default status)
- Modify: `tools/test_okf_lib.py` (new test)
- Modify: `tools/okf_migrate.py` (`--all` flag)

**Interfaces:**
- Consumes: `derive_type`, `extract_title`, `extract_description`, `parse_blockquote_header`, `is_in_scope`, `build_frontmatter`, `inject_frontmatter` (all existing).
- Produces: `build_frontmatter(path, text)` now includes `status: "Active"` when no blockquote `Status` is present. CLI `okf_migrate.py <root> [--dry-run] [--all]` — `--all` bypasses the `is_in_scope` filter (every non-excluded `.md` is migrated).

- [ ] **Step 1: Write the failing test** (append to `tools/test_okf_lib.py`)

```python
def test_build_frontmatter_unstructured_defaults_status_active():
    # An unstructured file: a title, no blockquote header, no YAML.
    text = "# Sliding Window\n\nThe sliding-window pattern keeps a moving range.\n"
    fm = okf.build_frontmatter("algorithms/patterns/sliding-window.md", text)
    assert fm["type"] == "pattern"          # path contains "patterns"
    assert fm["title"] == "Sliding Window"
    assert fm["status"] == "Active"         # <-- new default
    # no source metadata may be fabricated:
    assert "resource" not in fm
    assert "author" not in fm
    assert "capture_type" not in fm

def test_build_frontmatter_keeps_blockquote_status_when_present():
    # Regression: a file WITH a blockquote Status must keep its own value.
    text = ("# X\n\n> **Author:** Yosi Izaq\n> **Status:** Draft\n"
            "> **Type:** compiled\n\n---\nbody\n")
    fm = okf.build_frontmatter("x.md", text)
    assert fm["status"] == "Draft"
    assert fm["capture_type"] == "compiled"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `KeyError: 'status'` (first test; `build_frontmatter` omits status when no blockquote).

- [ ] **Step 3: Implement the default status** (in `tools/okf_lib.py`, `build_frontmatter`)

Replace the existing status line:

```python
    if bq.get("status"):
        fm["status"] = bq["status"]
```

with:

```python
    fm["status"] = bq.get("status") or "Active"
```

(All other lines of `build_frontmatter` unchanged. This is safe for Phase A files: they already carry YAML frontmatter, so `inject_frontmatter` takes the `_ensure_type_in_existing` path and uses only `fm["type"]` — the `status` value is never re-applied to them.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (all previous + 2 new).

- [ ] **Step 5: Add the `--all` flag** (in `tools/okf_migrate.py`)

Add the argument and gate the scope filter on it. Change the `main()` body:

```python
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--all", action="store_true",
                    help="migrate every non-excluded .md (not just files with an existing header)")
    args = ap.parse_args()
    changed = skipped = 0
    hist = {}
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        if not args.all and not okf.is_in_scope(text):
            continue
        fm = okf.build_frontmatter(rel, text)
        hist[fm["type"]] = hist.get(fm["type"], 0) + 1
        new = okf.inject_frontmatter(text, fm)
        if new == text:
            skipped += 1
            continue
        changed += 1
        print(f"[{'DRY' if args.dry_run else 'WRITE'}] {rel}  type={fm['type']}")
        if not args.dry_run:
            with open(full, "w", encoding="utf-8") as fh:
                fh.write(new)
    print(f"\n{changed} changed, {skipped} already-conformant. type histogram: {hist}")
```

(Only the `--all` argument and the `if not args.all and not okf.is_in_scope(text):` line change; the rest is identical to the committed version.)

- [ ] **Step 6: Smoke-test `--all` on a temp tree**

```bash
cd /Users/yosii/work/git/personal_KB
rm -rf /tmp/okf_all && mkdir -p /tmp/okf_all/algorithms/patterns
printf '# Sliding Window\n\nA moving range over a sequence.\n' > /tmp/okf_all/algorithms/patterns/sliding-window.md
echo "--- default mode: unstructured file is skipped ---"
.venv/bin/python tools/okf_migrate.py /tmp/okf_all --dry-run
echo "--- --all mode: it is migrated ---"
.venv/bin/python tools/okf_migrate.py /tmp/okf_all --all
head -6 /tmp/okf_all/algorithms/patterns/sliding-window.md
rm -rf /tmp/okf_all
```
Expected: default mode prints `0 changed`; `--all` prints `[WRITE] algorithms/patterns/sliding-window.md type=pattern`; `head` shows `---` / `type: pattern` / `title: Sliding Window` / `status: Active`.

- [ ] **Step 7: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/okf_migrate.py
git commit -m "kb: okf tooling — --all migrate mode + status:Active default (tested)"
```

---

### Task 2: Link path-resolution logic (pure, in `okf_lib.py`)

The highest-risk unit, isolated and exhaustively unit-tested with no file I/O (design spec §4.3).

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`

**Interfaces:**
- Produces:
  - `resolve_link(target: str, file_reldir: str) -> str | None` — a relative markdown-link target resolved against the file's own directory to a `/`-absolute repo path (anchor preserved). Returns `None` for links to leave untouched (`http(s)://`, `mailto:`, other `scheme://`, pure `#anchor`, already-`/`-absolute).
  - `rewrite_links(text: str, file_reldir: str) -> str` — rewrite every relative link in non-fenced lines via `resolve_link`.
  - `extract_absolute_links(text: str) -> list[str]` — every `/`-absolute link target (path only, anchor stripped) in non-fenced lines.

- [ ] **Step 1: Write the failing tests** (append to `tools/test_okf_lib.py`)

```python
def test_resolve_link_relative_to_absolute():
    assert okf.resolve_link("../x/y.md", "p/q") == "/p/x/y.md"
    assert okf.resolve_link("./z.md", "p/q") == "/p/q/z.md"
    assert okf.resolve_link("w.md", "p/q") == "/p/q/w.md"
    assert okf.resolve_link("w.md#sec", "p/q") == "/p/q/w.md#sec"   # anchor preserved
    assert okf.resolve_link("root.md", "") == "/root.md"            # file at repo root

def test_resolve_link_skips_external_and_absolute():
    assert okf.resolve_link("https://e.com/a", "p") is None
    assert okf.resolve_link("http://e.com", "p") is None
    assert okf.resolve_link("mailto:x@y.com", "p") is None
    assert okf.resolve_link("#anchor", "p") is None
    assert okf.resolve_link("/already/abs.md", "p") is None

def test_rewrite_links_body():
    text = "See [a](../x/y.md), [b](z.md#s), [ext](https://e.com), [loc](#top).\n"
    out = okf.rewrite_links(text, "p/q")
    assert "[a](/p/x/y.md)" in out
    assert "[b](/p/q/z.md#s)" in out
    assert "[ext](https://e.com)" in out   # unchanged
    assert "[loc](#top)" in out            # unchanged

def test_rewrite_links_skips_code_fences():
    text = "```\n[x](../a.md)\n```\n[y](../a.md)\n"
    out = okf.rewrite_links(text, "d")
    assert "[x](../a.md)" in out   # inside fence -> untouched
    assert "[y](/a.md)" in out     # outside fence -> rewritten

def test_extract_absolute_links():
    text = "[a](/p/x.md) [b](/q/y.md#s) [c](../rel.md) [d](https://e.com)\n"
    assert okf.extract_absolute_links(text) == ["/p/x.md", "/q/y.md"]

def test_extract_absolute_links_skips_fences():
    text = "```\n[a](/p/x.md)\n```\n[b](/q/y.md)\n"
    assert okf.extract_absolute_links(text) == ["/q/y.md"]
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: module 'okf_lib' has no attribute 'resolve_link'`.

- [ ] **Step 3: Write minimal implementation** (append to `tools/okf_lib.py`)

```python
import posixpath

_LINK_RE = re.compile(r"(?P<pre>\]\()(?P<target>[^)\s]+)(?P<post>\))")


def resolve_link(target: str, file_reldir: str):
    """Relative markdown-link target -> '/'-absolute repo path (anchor preserved).
    Returns None for links that must be left untouched."""
    if target.startswith(("http://", "https://", "mailto:", "#", "/")):
        return None
    if "://" in target:            # any other scheme (ftp:, ssh:, ...)
        return None
    path, hash_, anchor = target.partition("#")
    if not path:
        return None
    joined = posixpath.normpath(posixpath.join(file_reldir, path))
    return "/" + joined + (hash_ + anchor if hash_ else "")


def _fence_state_lines(text: str):
    """Yield (line_with_ending, is_code): is_code True for fence markers and
    every line inside a ``` / ~~~ fence."""
    in_fence = False
    for line in text.splitlines(keepends=True):
        s = line.lstrip()
        if s.startswith("```") or s.startswith("~~~"):
            in_fence = not in_fence
            yield line, True
        else:
            yield line, in_fence


def rewrite_links(text: str, file_reldir: str) -> str:
    def repl(m):
        new = resolve_link(m.group("target"), file_reldir)
        return m.group("pre") + new + m.group("post") if new is not None else m.group(0)
    parts = []
    for line, is_code in _fence_state_lines(text):
        parts.append(line if is_code else _LINK_RE.sub(repl, line))
    return "".join(parts)


def extract_absolute_links(text: str) -> list:
    out = []
    for line, is_code in _fence_state_lines(text):
        if is_code:
            continue
        for m in _LINK_RE.finditer(line):
            t = m.group("target")
            if t.startswith("/"):
                out.append(t.split("#", 1)[0])
    return out
```

(`import re` already exists at the top of `okf_lib.py`; add `import posixpath` near it. The `_LINK_RE` target class `[^)\s]+` deliberately excludes whitespace, so a link carrying a `"title"` — `](url "t")` — won't match and is left untouched. Image links `![alt](path)` share the `](path)` shape and are rewritten identically, which is intended.)

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (all previous + 6 new).

- [ ] **Step 5: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py
git commit -m "kb: okf tooling — relative→absolute link resolution (pure, tested)"
```

---

### Task 3: Link rewriter/checker CLI (`okf_links.py`)

**Files:**
- Modify: `tools/okf_migrate.py` (add backward-compatible `include_reserved` param to `iter_md`)
- Modify: `tools/test_okf_lib.py` (test the new param)
- Create: `tools/okf_links.py`

**Interfaces:**
- Consumes: `okf_lib.rewrite_links`, `okf_lib.extract_absolute_links`, `okf_migrate.iter_md`.
- Produces: `iter_md(root, include_reserved=False)` (extended). CLI `okf_links.py <root> (--rewrite | --check)` — `--rewrite` rewrites content-file relative links in place; `--check` exits non-zero and lists any `/`-absolute link (across all `.md`, reserved included) whose target file is missing.

- [ ] **Step 1: Write the failing test** (append to `tools/test_okf_lib.py`)

```python
import okf_migrate as m

def test_iter_md_include_reserved(tmp_path):
    (tmp_path / "a.md").write_text("# A\n")
    (tmp_path / "README.md").write_text("# R\n")
    (tmp_path / "index.md").write_text("# I\n")
    default = {rel for _, rel in m.iter_md(str(tmp_path))}
    withres = {rel for _, rel in m.iter_md(str(tmp_path), include_reserved=True)}
    assert "a.md" in default and "README.md" not in default and "index.md" not in default
    assert {"a.md", "README.md", "index.md"} <= withres
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py::test_iter_md_include_reserved -q`
Expected: FAIL — `TypeError: iter_md() got an unexpected keyword argument 'include_reserved'`.

- [ ] **Step 3: Extend `iter_md`** (in `tools/okf_migrate.py`)

Replace the `iter_md` definition with:

```python
def iter_md(root, include_reserved=False):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS and not d.startswith(".")]
        for fn in filenames:
            if not fn.endswith(".md") or (fn in RESERVED and not include_reserved):
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            if any(rel.startswith(p) for p in EXCLUDE_PREFIXES):
                continue
            yield full, rel
```

(Only the signature and the `fn in RESERVED` guard change; existing callers `iter_md(args.root)` keep the default `False` and are unaffected.)

- [ ] **Step 4: Run test to verify it passes**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py::test_iter_md_include_reserved -q`
Expected: PASS.

- [ ] **Step 5: Write the CLI** (`tools/okf_links.py`)

```python
"""Rewrite relative markdown links to '/'-absolute (Phase B) and check that
every '/'-absolute link resolves to a real file.

Rewrite scope = iter_md (content files; reserved README/index/log/CLAUDE excluded,
so those stay GitHub-clickable). Check scope = all .md incl. reserved (validates
generated index.md links too). Both are fence-aware via okf_lib.
"""
import argparse
import os
import sys
import okf_lib as okf
from okf_migrate import iter_md


def rewrite(root: str) -> int:
    changed = 0
    for full, rel in iter_md(root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        reldir = os.path.dirname(rel).replace(os.sep, "/")
        new = okf.rewrite_links(text, reldir)
        if new != text:
            changed += 1
            print(f"[REWRITE] {rel}")
            with open(full, "w", encoding="utf-8") as fh:
                fh.write(new)
    print(f"\n{changed} files rewritten")
    return 0


def check(root: str) -> int:
    broken = 0
    for full, rel in iter_md(root, include_reserved=True):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        for target in okf.extract_absolute_links(text):
            if not os.path.exists(os.path.join(root, target.lstrip("/"))):
                broken += 1
                print(f"BROKEN {rel} -> {target}")
    print(f"\n{broken} broken '/'-absolute link(s)")
    return 1 if broken else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--rewrite", action="store_true")
    g.add_argument("--check", action="store_true")
    args = ap.parse_args()
    sys.exit(rewrite(args.root) if args.rewrite else check(args.root))


if __name__ == "__main__":
    main()
```

- [ ] **Step 6: Smoke-test rewrite + check on a temp tree**

```bash
cd /Users/yosii/work/git/personal_KB
rm -rf /tmp/okf_lnk && mkdir -p /tmp/okf_lnk/sub
printf '# A\n\nGo to [b](../b.md) or [ext](https://e.com).\n' > /tmp/okf_lnk/sub/a.md
printf '# B\n' > /tmp/okf_lnk/b.md
echo "--- rewrite ---"
.venv/bin/python tools/okf_links.py /tmp/okf_lnk --rewrite
grep -q '](/b.md)' /tmp/okf_lnk/sub/a.md && echo "rewrite OK (relative -> /-absolute)"
grep -q 'https://e.com' /tmp/okf_lnk/sub/a.md && echo "external preserved"
echo "--- check (clean) ---"
.venv/bin/python tools/okf_links.py /tmp/okf_lnk --check ; echo "exit=$? (expect 0)"
echo "--- check (broken) ---"
printf '# C\n\nDead [d](/missing.md).\n' > /tmp/okf_lnk/c.md
.venv/bin/python tools/okf_links.py /tmp/okf_lnk --check ; echo "exit=$? (expect 1)"
rm -rf /tmp/okf_lnk
```
Expected: rewrite turns `../b.md` into `/b.md` and prints `[REWRITE] sub/a.md`; external link preserved; clean check exits 0; broken check prints `BROKEN c.md -> /missing.md` and exits 1.

- [ ] **Step 7: Full test suite green + commit**

```bash
cd /Users/yosii/work/git/personal_KB
.venv/bin/pytest tools/test_okf_lib.py -q
git add tools/okf_migrate.py tools/test_okf_lib.py tools/okf_links.py
git commit -m "kb: okf tooling — link rewriter + checker CLI (tested)"
```
Expected: all tests pass before commit.

---

### Task 4: Execute Phase B on personal_KB + dual gate

**Files:**
- Modify: the 50 unstructured `.md` files (frontmatter prepended)
- Modify: content `.md` files whose relative links get rewritten to `/`-absolute
- Create/Modify: `index.md` in each dir now containing in-scope files (algorithms subdirs get new ones)
- No tooling changes.

**Interfaces:**
- Consumes: all CLIs — `okf_migrate.py --all`, `okf_genindex.py`, `okf_links.py --rewrite`, `okf_validate.py`, `okf_links.py --check`.

> **NO AUTO-COMMIT in this task.** Run, review, stage, and hand to the user — the user commits KB content manually.

- [ ] **Step 1: Confirm clean baseline + full test suite green**

```bash
cd /Users/yosii/work/git/personal_KB
git status --short          # expect empty (Phase A + Tasks 1–3 committed)
.venv/bin/pytest tools/test_okf_lib.py -q
```
Expected: clean tree; all tests pass.

- [ ] **Step 2: Dry-run `--all` migrate; eyeball the histogram + confirm ~50 files**

```bash
.venv/bin/python tools/okf_migrate.py . --all --dry-run | tee /tmp/okf-b-dryrun.txt
```
Expected: ~50 `[DRY]` lines (49 `algorithms/*` + `learning/PILLARS.md`), `0` for the already-conformant 72 (they hit the idempotent existing-YAML path → not listed as changed). Scan the `type histogram` for obviously wrong assignments (e.g. a pattern file tagged `reference`). Note any file needing a manual `type` fix after the run.

- [ ] **Step 3: Verify every target file has a `# title`** (so `title` is never silently dropped)

```bash
for f in $(.venv/bin/python tools/okf_migrate.py . --all --dry-run | awk '/^\[DRY\]/{print $2}'); do
  head -20 "$f" | grep -q '^# ' || echo "NO TITLE: $f"
done
echo "title check done"
```
Expected: only `title check done` (no `NO TITLE:` lines). If any file lacks a title, add a `# Title` heading by hand before the real run.

- [ ] **Step 4: Run `--all` migrate for real + prove idempotency**

```bash
.venv/bin/python tools/okf_migrate.py . --all
.venv/bin/python tools/okf_migrate.py . --all      # second run
```
Expected: first run lists ~50 `[WRITE]`; second run prints `0 changed` (idempotent on real data).

- [ ] **Step 5: Generate indexes (now covering ~122 files)**

```bash
.venv/bin/python tools/okf_genindex.py .
```
Expected: one `index.md (...)` line per dir with in-scope files, including new `algorithms/*` subdir indexes; root `index.md` retains `okf_version: "0.1"`.

- [ ] **Step 6: Rewrite relative links → `/`-absolute**

```bash
.venv/bin/python tools/okf_links.py . --rewrite
.venv/bin/python tools/okf_links.py . --rewrite    # second run
```
Expected: first run lists `[REWRITE]` files and a count; second run prints `0 files rewritten` (idempotent — `/`-absolute links are skipped by `resolve_link`).

- [ ] **Step 7: DUAL GATE — conformance AND link integrity**

```bash
.venv/bin/python tools/okf_validate.py .    ; echo "validate exit=$?"
.venv/bin/python tools/okf_links.py . --check ; echo "links exit=$?"
```
Expected: `0 failures` (conformance over all ~122 in-scope) with exit 0, **and** `0 broken '/'-absolute link(s)` with exit 0. If `--check` reports BROKEN links, inspect each: a genuine pre-existing dead link should be fixed at its source; a bad rewrite indicates a `resolve_link` bug (stop and fix the tool, re-run from Step 6). Do not proceed until both gates are clean.

- [ ] **Step 8: Spot-check render + stage for user**

```bash
sed -n '1,8p' algorithms/patterns/sliding-window.md    # frontmatter: type/title/status:Active
git diff --stat | tail -5
git diff -- data-structures/trees/heap.md | head -20   # a Phase-A file: links now /-absolute, frontmatter intact
git add -A
git status --short | awk '{print $1}' | sort | uniq -c
```
Then STOP and tell the user: both gates passed, changes staged, ready to commit. Suggested message: `kb: extend OKF v0.1 to full bundle + /-absolute links (Phase B)`. Do **not** run `git commit`.

---

## Self-Review

**Spec coverage** (against `2026-06-30-okf-phase-b-design.md`):
- §4.1 `--all` mode → Task 1 (flag + smoke test) ✅
- §4.2 default `status: Active`, no fabricated resource/author/capture_type → Task 1 (`test_build_frontmatter_unstructured_defaults_status_active`) ✅
- §4.3 `okf_links.py` rewriter + checker; pure logic in `okf_lib`, I/O in CLI; skip external/anchor/absolute; preserve anchor → Tasks 2 (pure) + 3 (CLI) ✅. Fence-awareness added as a correctness hardening beyond the spec's regex sketch.
- §4.4 genindex/validate unchanged, pick up new files → Task 4 Steps 5, 7 ✅
- §5 execution order (baseline → migrate --all → genindex → links --rewrite → two gates → spot-check/stage) + NO auto-commit → Task 4 ✅
- §6 prerequisite (Phase A content committed) → satisfied: committed as `c7ae988 kb: adopt OKF v0.1 for curated core (Phase A)`; Step 1 re-confirms a clean baseline ✅
- §7 out of scope (legacy-dump content, node_modules, learning/app) → dumps are non-`.md` (auto-skipped); node_modules/dot-dirs excluded; `learning/app` verified covered by node_modules + reserved README ✅
- §8 risks: link-resolution correctness → separate rewrite/check + dual gate + fence-awareness + idempotency re-runs ✅; `/`-absolute GitHub render → mitigated by keeping README/log out of rewrite scope (documented decision) ✅; `--all` over-reach → exclusions + dry-run histogram + title check before real run ✅

**Placeholder scan:** No TBD/TODO; every code step shows complete code; every test has real assertions; every command has expected output.

**Type consistency:** `iter_md(root, include_reserved=False)` defined in Task 3, used by `okf_links.py` (both modes) — matches. `resolve_link`/`rewrite_links`/`extract_absolute_links`/`_fence_state_lines`/`_LINK_RE` defined in Task 2, consumed in Task 3 CLI — names consistent across tasks and tests. `build_frontmatter` signature unchanged (Task 1 only alters its body). CLI names (`--all`, `--rewrite`, `--check`, `--dry-run`) consistent between Tasks 1/3 and their Task 4 usages.

**Decisions log (Phase B):**
1. Legacy dumps: **out / auto-skipped** (non-`.md`).
2. Unstructured frontmatter: **type + title + status:Active** (no fabricated source fields).
3. Link rewrite scope: **content files only** (README/log stay relative/human-clickable; generated index.md already `/`-absolute); **check scope: all files**.
4. Rewriter/checker are **fence-aware** (correctness hardening — never touch links inside code fences).
