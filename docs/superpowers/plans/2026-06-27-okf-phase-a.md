# OKF Migration — Phase A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build idempotent, tested Python tooling that brings the *curated* subset of `personal_KB` into OKF v0.1 conformance, then run it and pass a validation gate.

**Architecture:** A pure-function library (`tools/okf_lib.py`) holds all parsing/derivation/rendering logic and is unit-tested with pytest. Four thin CLI wrappers (`okf_migrate.py`, `okf_genindex.py`, `okf_reshape_log.py`, `okf_validate.py`) do file I/O on top of the library. Tooling is built TDD-first (Tasks 1–6), then executed against the real KB (Task 7).

**Tech Stack:** Python 3.14, pytest (tests), PyYAML (frontmatter parse/validate — MIT license).

## Global Constraints

- Python ≥ 3.11; use a repo-local venv at `.venv` (gitignored).
- New deps limited to `pytest` + `pyyaml` (both permissive licenses — PyYAML is MIT). No others.
- All tooling lives under `tools/`. All functions in `okf_lib.py` are **pure** (no file I/O); I/O only in CLI wrappers.
- **Idempotent:** re-running migrate must not duplicate or corrupt frontmatter.
- Header style: **add YAML frontmatter at the very top; keep the existing `> **Source:**` blockquote** below the `# Title` (never delete it).
- `type` taxonomy (closed list): `guide, reference, cheatsheet, pattern, decision-pack, system-card, primer, comparison, security-review, setup`. Unknown → `reference`.
- Existing `> **Type:** source|compiled` maps to a **custom `capture_type`** key — NEVER to OKF `type`.
- Migrate exclusions: `.git/`, `raw/` (immutable), `.venv/`, `docs/superpowers/`, and the reserved filenames `README.md`, `index.md`, `log.md`. Non-`.md` files (incl. the ~40 extensionless legacy dumps) are skipped automatically.
- **In-scope = a file that already has a blockquote header OR YAML frontmatter.** Unstructured `.md` are left untouched in Phase A.
- **Commits:** Tasks 1–6 (tooling under `tools/`) commit normally. **Task 7 (KB content migration) must NOT be auto-committed** — stage changes, print a summary, and hand to the user (user commits KB content manually).

---

### Task 1: Scaffold + header/date parsing helpers

**Files:**
- Create: `tools/okf_lib.py`
- Create: `tools/test_okf_lib.py`
- Create: `tools/requirements-dev.txt`
- Modify: `.gitignore` (add `.venv/`)

**Interfaces:**
- Produces: `parse_blockquote_header(text:str)->dict`, `extract_url(value:str)->str|None`, `to_iso8601(value:str)->str|None`, `extract_title(text:str)->str|None`, `extract_description(text:str)->str|None`.

- [ ] **Step 1: Create venv + install dev deps**

```bash
cd /Users/yosii/work/git/personal_KB
python3 -m venv .venv
.venv/bin/pip install --quiet pytest pyyaml
printf 'pytest\npyyaml\n' > tools/requirements-dev.txt
printf '.venv/\n' >> .gitignore
```

- [ ] **Step 2: Write the failing tests**

```python
# tools/test_okf_lib.py
import okf_lib as okf

SAMPLE = """# LLM Knowledge Base Maintenance Guide

> **Source:** [Karpathy's LLM Wiki Gist](https://gist.github.com/karpathy/abc), personal experience
> **Author:** Yosi Izaq
> **Captured:** 2026-04-09
> **Status:** Active
> **Type:** compiled

---

## TL;DR

A **practical** guide to running an LLM wiki.
"""

def test_parse_blockquote_header():
    h = okf.parse_blockquote_header(SAMPLE)
    assert h["author"] == "Yosi Izaq"
    assert h["status"] == "Active"
    assert h["type"] == "compiled"
    assert h["source"].startswith("[Karpathy")

def test_extract_url():
    assert okf.extract_url("[x](https://gist.github.com/karpathy/abc), more") == "https://gist.github.com/karpathy/abc"
    assert okf.extract_url("no url here") is None

def test_to_iso8601():
    assert okf.to_iso8601("2026-04-09") == "2026-04-09T00:00:00Z"
    assert okf.to_iso8601("2026-04-09T12:00:00Z") == "2026-04-09T12:00:00Z"
    assert okf.to_iso8601("") is None

def test_extract_title():
    assert okf.extract_title(SAMPLE) == "LLM Knowledge Base Maintenance Guide"

def test_extract_description():
    assert okf.extract_description(SAMPLE) == "A practical guide to running an LLM wiki."
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `ModuleNotFoundError: No module named 'okf_lib'`.

- [ ] **Step 4: Write minimal implementation**

```python
# tools/okf_lib.py
"""Pure helpers for OKF migration of the personal KB. No file I/O in this module."""
from __future__ import annotations
import re

TYPE_TAXONOMY = ["guide", "reference", "cheatsheet", "pattern", "decision-pack",
                 "system-card", "primer", "comparison", "security-review", "setup"]
DEFAULT_TYPE = "reference"

_BQ_RE = re.compile(r"^>\s*\*\*(?P<key>[^:*]+):\*\*\s*(?P<val>.*?)\s*$")
_URL_RE = re.compile(r"\((https?://[^)\s]+)\)")
_DATE_RE = re.compile(r"\b(\d{4}-\d{2}-\d{2})\b")


def parse_blockquote_header(text: str) -> dict:
    fields = {}
    for line in text.splitlines()[:25]:
        m = _BQ_RE.match(line)
        if m:
            fields[m.group("key").strip().lower()] = m.group("val").strip()
    return fields


def extract_url(value: str | None):
    m = _URL_RE.search(value or "")
    return m.group(1) if m else None


def to_iso8601(value: str | None):
    if not value:
        return None
    if "T" in value:
        return value.strip()
    m = _DATE_RE.search(value)
    return f"{m.group(1)}T00:00:00Z" if m else None


def extract_title(text: str):
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("# "):
            return s[2:].strip()
    return None


def _strip_md(s: str) -> str:
    s = re.sub(r"\*\*([^*]+)\*\*", r"\1", s)
    s = re.sub(r"`([^`]+)`", r"\1", s)
    return s.strip()


def extract_description(text: str):
    lines = text.splitlines()
    for i, line in enumerate(lines):
        if line.strip().lower().startswith("## tl;dr"):
            for nxt in lines[i + 1:]:
                if nxt.strip():
                    return _strip_md(nxt.strip())
    return None
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (5 passed).

- [ ] **Step 6: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/requirements-dev.txt .gitignore
git commit -m "kb: okf tooling — header/date parsing helpers (tested)"
```

---

### Task 2: type derivation + frontmatter build/render

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`

**Interfaces:**
- Consumes: `parse_blockquote_header`, `extract_url`, `to_iso8601`, `extract_title`, `extract_description`.
- Produces: `derive_type(path:str, text:str="")->str`, `build_frontmatter(path:str, text:str)->dict`, `render_frontmatter(fm:dict)->str`.

- [ ] **Step 1: Write the failing tests**

```python
# append to tools/test_okf_lib.py

def test_derive_type():
    assert okf.derive_type("xss-cross-site-scripting.md") == "security-review"
    assert okf.derive_type("ml-and-ai/opus-4-6-system-card/card.md") == "system-card"
    assert okf.derive_type("network/vpn-auth-psk-vs-x509-vs-wireguard.md") == "comparison"
    assert okf.derive_type("FE/react/virtualization/perf-budget.md") == "decision-pack"
    assert okf.derive_type("random-notes.md") == "reference"

def test_build_frontmatter():
    fm = okf.build_frontmatter("ml-and-ai/llm-kb/maint.md", SAMPLE)
    assert fm["type"] == "reference"
    assert fm["title"] == "LLM Knowledge Base Maintenance Guide"
    assert fm["resource"] == "https://gist.github.com/karpathy/abc"
    assert fm["timestamp"] == "2026-04-09T00:00:00Z"
    assert fm["author"] == "Yosi Izaq"
    assert fm["status"] == "Active"
    assert fm["capture_type"] == "compiled"
    assert "type" in fm and fm["capture_type"] != fm["type"]

def test_render_frontmatter_order_and_fences():
    fm = {"type": "guide", "title": "Hello: World", "tags": ["a", "b"]}
    out = okf.render_frontmatter(fm)
    lines = out.splitlines()
    assert lines[0] == "---" and lines[-1] == "---"
    assert lines[1] == "type: guide"
    assert lines[2] == 'title: "Hello: World"'   # colon forces quoting
    assert lines[3] == "tags: [a, b]"
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: module 'okf_lib' has no attribute 'derive_type'`.

- [ ] **Step 3: Write minimal implementation**

```python
# append to tools/okf_lib.py

_TYPE_RULES = [
    ("system-card", ("system-card", "system_card")),
    ("cheatsheet", ("cheatsheet", "cheat-sheet", "cheat_sheet")),
    ("setup", ("setup", "install", "getting-started")),
    ("primer", ("primer",)),
    ("comparison", ("-vs-", "comparison")),
    ("security-review", ("xss", "deserialization", "security-review")),
    ("decision-pack", ("decision", "debate", "budget", "retrofit")),
    ("pattern", ("pattern", "saga")),
]


def derive_type(path: str, text: str = "") -> str:
    p = path.lower()
    for t, needles in _TYPE_RULES:
        if any(n in p for n in needles):
            return t
    if "interviews/" in p:
        return "guide"
    return DEFAULT_TYPE


def build_frontmatter(path: str, text: str) -> dict:
    bq = parse_blockquote_header(text)
    fm: dict = {"type": derive_type(path, text)}
    title = extract_title(text)
    if title:
        fm["title"] = title
    desc = extract_description(text)
    if desc:
        fm["description"] = desc
    url = extract_url(bq.get("source"))
    if url:
        fm["resource"] = url
    ts = to_iso8601(bq.get("captured"))
    if ts:
        fm["timestamp"] = ts
    if bq.get("author"):
        fm["author"] = bq["author"]
    if bq.get("status"):
        fm["status"] = bq["status"]
    if bq.get("type"):
        fm["capture_type"] = bq["type"]
    return fm


_ORDER = ["type", "title", "description", "resource", "tags",
          "timestamp", "author", "status", "capture_type"]
_NEEDS_QUOTE = re.compile(r'[:#\[\]{}",&*?|<>=!%@`]')


def _scalar(v) -> str:
    s = str(v)
    if s == "" or _NEEDS_QUOTE.search(s) or s.strip() != s:
        return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'
    return s


def render_frontmatter(fm: dict) -> str:
    lines = ["---"]
    keys = [k for k in _ORDER if k in fm] + [k for k in fm if k not in _ORDER]
    for k in keys:
        v = fm[k]
        if isinstance(v, list):
            lines.append(f"{k}: [" + ", ".join(_scalar(x) for x in v) + "]")
        else:
            lines.append(f"{k}: {_scalar(v)}")
    lines.append("---")
    return "\n".join(lines)
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (8 passed).

- [ ] **Step 5: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py
git commit -m "kb: okf tooling — type derivation + frontmatter build/render (tested)"
```

---

### Task 3: in-scope detection + idempotent injection + migrate CLI

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`
- Create: `tools/okf_migrate.py`

**Interfaces:**
- Consumes: `build_frontmatter`, `render_frontmatter`.
- Produces: `has_yaml_frontmatter(text:str)->bool`, `is_in_scope(text:str)->bool`, `inject_frontmatter(text:str, fm:dict)->str`. CLI `okf_migrate.py <root> [--dry-run]`.

- [ ] **Step 1: Write the failing tests**

```python
# append to tools/test_okf_lib.py

def test_is_in_scope():
    assert okf.is_in_scope(SAMPLE) is True
    assert okf.is_in_scope("---\ntype: x\n---\n# T\n") is True
    assert okf.is_in_scope("# Just a title\n\nbody, no header\n") is False

def test_inject_is_idempotent():
    fm = okf.build_frontmatter("p.md", SAMPLE)
    once = okf.inject_frontmatter(SAMPLE, fm)
    assert once.startswith("---\ntype: reference\n")
    assert "# LLM Knowledge Base Maintenance Guide" in once
    assert "> **Source:**" in once          # blockquote preserved
    twice = okf.inject_frontmatter(once, okf.build_frontmatter("p.md", once))
    assert twice == once                      # idempotent

def test_inject_existing_yaml_without_type_gets_type():
    text = "---\ntitle: X\n---\n# X\n"
    out = okf.inject_frontmatter(text, {"type": "guide"})
    assert out == "---\ntype: guide\ntitle: X\n---\n# X\n"

def test_inject_existing_yaml_with_type_unchanged():
    text = "---\ntype: reference\ntitle: X\n---\n# X\n"
    assert okf.inject_frontmatter(text, {"type": "guide"}) == text
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: module 'okf_lib' has no attribute 'is_in_scope'`.

- [ ] **Step 3: Write minimal implementation**

```python
# append to tools/okf_lib.py

def has_yaml_frontmatter(text: str) -> bool:
    return text.startswith("---\n") or text.startswith("---\r\n")


def is_in_scope(text: str) -> bool:
    return has_yaml_frontmatter(text) or bool(parse_blockquote_header(text))


def _ensure_type_in_existing(text: str, type_value: str) -> str:
    lines = text.splitlines(keepends=True)
    if not lines or lines[0].strip() != "---":
        return text
    close = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if close is None:
        return text
    block = lines[1:close]
    if any(re.match(r"\s*type\s*:\s*\S", l) for l in block):
        return text
    insert = f"type: {_scalar(type_value)}\n"
    return lines[0] + insert + "".join(block) + lines[close] + "".join(lines[close + 1:])


def inject_frontmatter(text: str, fm: dict) -> str:
    if has_yaml_frontmatter(text):
        return _ensure_type_in_existing(text, fm.get("type", DEFAULT_TYPE))
    return render_frontmatter(fm) + "\n\n" + text
```

```python
# tools/okf_migrate.py
"""Inject OKF YAML frontmatter into in-scope KB files. Idempotent."""
import argparse, os
import okf_lib as okf

EXCLUDE_DIRS = {".git", "raw", ".venv", "node_modules"}
EXCLUDE_PREFIXES = ("docs/superpowers/",)
RESERVED = {"README.md", "index.md", "log.md"}


def iter_md(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if not fn.endswith(".md") or fn in RESERVED:
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            if any(rel.startswith(p) for p in EXCLUDE_PREFIXES):
                continue
            yield full, rel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    changed = skipped = 0
    hist = {}
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        if not okf.is_in_scope(text):
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


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run unit tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (12 passed).

- [ ] **Step 5: Smoke-test the CLI on a temp tree**

```bash
cd /Users/yosii/work/git/personal_KB
mkdir -p /tmp/okf_smoke/sub
printf '# T\n\n> **Source:** [x](https://e.com/a)\n> **Captured:** 2026-01-02\n> **Type:** compiled\n\n---\nbody\n' > /tmp/okf_smoke/sub/a.md
.venv/bin/python tools/okf_migrate.py /tmp/okf_smoke --dry-run
.venv/bin/python tools/okf_migrate.py /tmp/okf_smoke
head -5 /tmp/okf_smoke/sub/a.md
rm -rf /tmp/okf_smoke
```
Expected: dry-run lists `[DRY] sub/a.md type=reference`; real run writes it; `head` shows `---` / `type: reference` at top.

- [ ] **Step 6: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/okf_migrate.py
git commit -m "kb: okf tooling — idempotent frontmatter injection + migrate CLI (tested)"
```

---

### Task 4: per-directory index.md generation

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`
- Create: `tools/okf_genindex.py`

**Interfaces:**
- Consumes: `has_yaml_frontmatter` (to read frontmatter of migrated files).
- Produces: `read_frontmatter(text:str)->dict`, `generate_index(dir_title:str, entries:list[dict])->str`. CLI `okf_genindex.py <root>` (writes `index.md` per dir containing in-scope files; root `index.md` also gets `okf_version: "0.1"`).

- [ ] **Step 1: Write the failing tests**

```python
# append to tools/test_okf_lib.py

def test_read_frontmatter():
    text = '---\ntype: guide\ntitle: Hello\ndescription: A thing.\n---\n# Hello\n'
    fm = okf.read_frontmatter(text)
    assert fm["type"] == "guide" and fm["title"] == "Hello" and fm["description"] == "A thing."

def test_generate_index_absolute_links():
    entries = [{"title": "Foo", "path": "/sub/foo.md", "description": "Does foo."},
               {"title": "Bar", "path": "/sub/bar.md", "description": None}]
    out = okf.generate_index("sub", entries)
    assert out.splitlines()[0] == "# sub"
    assert "* [Foo](/sub/foo.md) - Does foo." in out
    assert "* [Bar](/sub/bar.md)" in out and "Bar](/sub/bar.md) -" not in out
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: ... 'read_frontmatter'`.

- [ ] **Step 3: Write minimal implementation**

```python
# append to tools/okf_lib.py
import yaml as _yaml


def read_frontmatter(text: str) -> dict:
    if not has_yaml_frontmatter(text):
        return {}
    lines = text.splitlines()
    close = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if close is None:
        return {}
    try:
        data = _yaml.safe_load("\n".join(lines[1:close]))
    except _yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def generate_index(dir_title: str, entries: list) -> str:
    out = [f"# {dir_title}", ""]
    for e in entries:
        desc = f" - {e['description']}" if e.get("description") else ""
        out.append(f"* [{e['title']}]({e['path']}){desc}")
    out.append("")
    return "\n".join(out)
```

```python
# tools/okf_genindex.py
"""Generate per-directory index.md listing in-scope OKF concept files."""
import os
import okf_lib as okf
from okf_migrate import iter_md, EXCLUDE_DIRS, EXCLUDE_PREFIXES, RESERVED


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    args = ap.parse_args()
    by_dir = {}
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        fm = okf.read_frontmatter(text)
        if not fm.get("type"):
            continue
        d = os.path.dirname(full)
        abspath = "/" + rel.replace(os.sep, "/")
        by_dir.setdefault(d, []).append(
            {"title": fm.get("title") or os.path.basename(rel),
             "path": abspath, "description": fm.get("description")})
    for d, entries in by_dir.items():
        entries.sort(key=lambda e: e["title"].lower())
        title = os.path.relpath(d, args.root)
        title = "(root)" if title == "." else title
        body = okf.generate_index(title, entries)
        if os.path.abspath(d) == os.path.abspath(args.root):
            body = '---\nokf_version: "0.1"\n---\n' + body
        with open(os.path.join(d, "index.md"), "w", encoding="utf-8") as fh:
            fh.write(body)
        print(f"index.md ({len(entries)} entries) -> {title}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (14 passed).

- [ ] **Step 5: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/okf_genindex.py
git commit -m "kb: okf tooling — per-dir index.md generation + root okf_version (tested)"
```

---

### Task 5: log.md reshape to OKF form

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`
- Create: `tools/okf_reshape_log.py`

**Interfaces:**
- Produces: `parse_log(text:str)->list[dict]`, `reshape_log(text:str, header:str="# KB Ingest Log")->str`. CLI `okf_reshape_log.py <path-to-log.md>` (writes a `.okf` sibling for review, does NOT overwrite in place).

- [ ] **Step 1: Write the failing tests**

```python
# append to tools/test_okf_lib.py

LOG = """# KB Ingest Log

## [2026-06-25] update | databases/x.md | learning session
- added 3 sections

## [2026-06-04] ingest | FE/react/ | claude chat
- new dir
- companion doc
"""

def test_parse_log():
    e = okf.parse_log(LOG)
    assert len(e) == 2
    assert e[0]["date"] == "2026-06-25" and e[0]["action"] == "update"
    assert e[0]["topic"] == "databases/x.md" and e[0]["source"] == "learning session"

def test_reshape_log_newest_first_and_format():
    out = okf.reshape_log(LOG)
    body = out.splitlines()
    assert body[0] == "# KB Ingest Log"
    # newest date heading appears before the older one
    assert body.index("## 2026-06-25") < body.index("## 2026-06-04")
    assert "* **Update**: databases/x.md — learning session" in out
    assert "* **Ingest**: FE/react/ — claude chat" in out
    assert "  - added 3 sections" in out          # body nested under entry
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: ... 'parse_log'`.

- [ ] **Step 3: Write minimal implementation**

```python
# append to tools/okf_lib.py
from collections import OrderedDict

_LOG_HEAD_RE = re.compile(
    r"^##\s*\[(?P<date>\d{4}-\d{2}-\d{2})\]\s*(?P<action>\w+)\s*\|\s*(?P<topic>.*?)\s*\|\s*(?P<source>.*?)\s*$")


def parse_log(text: str) -> list:
    entries, cur = [], None
    for line in text.splitlines():
        m = _LOG_HEAD_RE.match(line)
        if m:
            if cur:
                entries.append(cur)
            cur = {"date": m.group("date"), "action": m.group("action"),
                   "topic": m.group("topic"), "source": m.group("source"), "body": []}
        elif cur is not None:
            cur["body"].append(line)
    if cur:
        entries.append(cur)
    return entries


def reshape_log(text: str, header: str = "# KB Ingest Log") -> str:
    by_date = OrderedDict()
    for e in parse_log(text):
        by_date.setdefault(e["date"], []).append(e)
    out = [header, "", "> Reshaped to OKF log form (newest-first).", ""]
    for date in sorted(by_date, reverse=True):
        out.append(f"## {date}")
        for e in by_date[date]:
            out.append(f"* **{e['action'].capitalize()}**: {e['topic']} — {e['source']}")
            for b in e["body"]:
                if b.strip():
                    out.append(f"  {b.strip()}")
        out.append("")
    return "\n".join(out).rstrip() + "\n"
```

```python
# tools/okf_reshape_log.py
"""Reshape an append-only KB log into OKF newest-first form. Writes <path>.okf for review."""
import argparse
import okf_lib as okf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    args = ap.parse_args()
    with open(args.path, encoding="utf-8") as fh:
        text = fh.read()
    out = okf.reshape_log(text)
    with open(args.path + ".okf", "w", encoding="utf-8") as fh:
        fh.write(out)
    print(f"wrote {args.path}.okf ({len(okf.parse_log(text))} entries) — review, then mv over the original")


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (17 passed).

- [ ] **Step 5: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/okf_reshape_log.py
git commit -m "kb: okf tooling — log.md reshape to newest-first OKF form (tested)"
```

---

### Task 6: conformance validator

**Files:**
- Modify: `tools/okf_lib.py`
- Modify: `tools/test_okf_lib.py`
- Create: `tools/okf_validate.py`

**Interfaces:**
- Consumes: `has_yaml_frontmatter`, `read_frontmatter`.
- Produces: `validate_text(text:str)->list[str]`. CLI `okf_validate.py <root>` → exit 0 if all in-scope files conformant, else exit 1 and list failures.

- [ ] **Step 1: Write the failing tests**

```python
# append to tools/test_okf_lib.py

def test_validate_text():
    assert okf.validate_text("---\ntype: guide\n---\n# x\n") == []
    assert "missing YAML frontmatter" in okf.validate_text("# no fm\n")
    assert any("type" in e for e in okf.validate_text("---\ntitle: x\n---\n# x\n"))
    assert any("type" in e for e in okf.validate_text("---\ntype:   \n---\n# x\n"))
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: FAIL — `AttributeError: ... 'validate_text'`.

- [ ] **Step 3: Write minimal implementation**

```python
# append to tools/okf_lib.py

def validate_text(text: str) -> list:
    if not has_yaml_frontmatter(text):
        return ["missing YAML frontmatter"]
    lines = text.splitlines()
    close = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if close is None:
        return ["unterminated frontmatter"]
    try:
        data = _yaml.safe_load("\n".join(lines[1:close]))
    except _yaml.YAMLError as ex:
        return [f"unparseable YAML: {ex}"]
    if not isinstance(data, dict):
        return ["frontmatter is not a mapping"]
    t = data.get("type")
    return [] if isinstance(t, str) and t.strip() else ["missing/empty `type`"]
```

```python
# tools/okf_validate.py
"""Validate OKF conformance over in-scope KB files. Exit 1 on any failure."""
import sys
import okf_lib as okf
from okf_migrate import iter_md


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    args = ap.parse_args()
    failures = checked = 0
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        if not okf.is_in_scope(text):
            continue
        checked += 1
        for err in okf.validate_text(text):
            failures += 1
            print(f"FAIL {rel}: {err}")
    print(f"\nchecked {checked} in-scope files, {failures} failures")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `cd tools && ../.venv/bin/pytest test_okf_lib.py -q`
Expected: PASS (18 passed).

- [ ] **Step 5: Commit**

```bash
cd /Users/yosii/work/git/personal_KB
git add tools/okf_lib.py tools/test_okf_lib.py tools/okf_validate.py
git commit -m "kb: okf tooling — conformance validator (tested)"
```

---

### Task 7: Execute the migration on personal_KB + validation gate

**Files:**
- Modify: ~78 in-scope curated `.md` files across the KB (frontmatter prepended)
- Create: `index.md` in each dir containing in-scope files; root `index.md`
- Modify: `log.md` (after review of `log.md.okf`)

**Interfaces:**
- Consumes: all four CLIs from Tasks 3–6.

> **NO AUTO-COMMIT in this task.** Run, review, stage, and hand to the user — the user commits KB content manually.

- [ ] **Step 1: Confirm clean baseline + full test suite green**

```bash
cd /Users/yosii/work/git/personal_KB
git status --short
.venv/bin/pytest tools/test_okf_lib.py -q
```
Expected: tooling already committed (Tasks 1–6); `18 passed`.

- [ ] **Step 2: Dry-run migrate and eyeball the type histogram**

Run: `.venv/bin/python tools/okf_migrate.py . --dry-run | tee /tmp/okf-dryrun.txt`
Expected: ~78 `[DRY]` lines + a `type histogram`. Scan for obviously wrong `type` assignments (e.g. a guide tagged `reference`). Note any file needing a manual `type` fix.

- [ ] **Step 3: Run migrate for real**

Run: `.venv/bin/python tools/okf_migrate.py .`
Expected: same files now `[WRITE]`. Re-run once: `.venv/bin/python tools/okf_migrate.py .` → expected `0 changed` (proves idempotency on real data).

- [ ] **Step 4: Generate indexes**

Run: `.venv/bin/python tools/okf_genindex.py .`
Expected: one `index.md (...)` line per dir with in-scope files; a root `index.md` with `okf_version: "0.1"`.

- [ ] **Step 5: Reshape log, review, then swap in**

```bash
.venv/bin/python tools/okf_reshape_log.py log.md
diff log.md log.md.okf | head -40   # sanity-check no entries lost
mv log.md.okf log.md
```
Expected: the `.okf` file is newest-first with `* **Action**:` bullets and every original entry present.

- [ ] **Step 6: Run the validation gate (Phase A exit criterion)**

Run: `.venv/bin/python tools/okf_validate.py .`
Expected: `0 failures`, exit 0. If any FAIL lines: fix the offending file's `type` (or its frontmatter) by hand and re-run until clean.

- [ ] **Step 7: Spot-check render + stage for user**

```bash
sed -n '1,15p' ml-and-ai/llm-kb/open-knowledge-format-okf.md   # frontmatter on top, blockquote intact below
git add -A
git status --short
```
Then STOP and tell the user: validation passed, changes staged, ready for them to commit (suggested: `kb: adopt OKF v0.1 for curated core (Phase A)`). Do **not** run `git commit`.

---

## Self-Review

**Spec coverage** (against `2026-06-27-okf-migration-design.md`):
- §5.1 tooling → Tasks 1–6 ✅ · §5.2 frontmatter mapping → Task 2 (`build_frontmatter`) ✅ · `type` taxonomy + `capture_type` non-collision → Task 2 tests ✅ · §5.3 indexes + root `okf_version` → Task 4 ✅ · §5.4 log reshape → Task 5 ✅ · §5.5 links: `/`-absolute in index.md only → Task 4 (`generate_index` emits `/`-absolute) ✅; full link rewrite correctly deferred to Phase B ✅ · §5.6 validation gate → Task 6 + Task 7 Step 6 ✅ · header style (add YAML, keep blockquote) → Task 3 `test_inject_is_idempotent` asserts blockquote preserved ✅ · exclusions (`raw/`, `docs/superpowers/`, reserved, non-`.md`) → Task 3 CLI ✅ · idempotency → Task 3 + Task 7 Step 3 ✅ · no-auto-commit of content → Task 7 ✅.
- Phase B (§6) and p81-imagine-rag (§7) are intentionally NOT in this plan — they are separate follow-on plans, as designed.

**Placeholder scan:** No TBD/TODO; every code step has complete code; every test has real assertions.

**Type consistency:** `iter_md` / `EXCLUDE_*` / `RESERVED` defined in `okf_migrate.py` (Task 3) and imported by `okf_genindex.py` (Task 4) and `okf_validate.py` (Task 6). `read_frontmatter`, `has_yaml_frontmatter`, `is_in_scope`, `validate_text`, `generate_index`, `reshape_log`, `build_frontmatter`, `render_frontmatter`, `inject_frontmatter` names are consistent across all tasks and their tests.
