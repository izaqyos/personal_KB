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


def test_validate_text():
    assert okf.validate_text("---\ntype: guide\n---\n# x\n") == []
    assert "missing YAML frontmatter" in okf.validate_text("# no fm\n")
    assert any("type" in e for e in okf.validate_text("---\ntitle: x\n---\n# x\n"))
    assert any("type" in e for e in okf.validate_text("---\ntype:   \n---\n# x\n"))


def test_validate_text_unterminated_frontmatter():
    errs = okf.validate_text("---\ntype: x\n# no closing fence\n")
    assert errs, "Expected errors for unterminated frontmatter"
    assert any("unterminated" in e for e in errs)


def test_validate_text_unparseable_yaml():
    errs = okf.validate_text("---\ntype: x\n bad: : :\n  - [unclosed\n---\n# t\n")
    assert errs, "Expected errors for unparseable YAML"
    assert any("unparseable" in e for e in errs)


# --- iter_md dot-directory pruning ---

def test_iter_md_skips_dot_dirs():
    """iter_md must yield files in normal subdirs but NOT files inside dot-dirs."""
    import tempfile, pathlib
    from okf_migrate import iter_md

    IN_SCOPE_BODY = "# T\n\n> **Source:** [x](https://e.com/a)\n"

    with tempfile.TemporaryDirectory() as root:
        root = pathlib.Path(root)
        # normal subdir
        normal = root / "notes"
        normal.mkdir()
        (normal / "article.md").write_text(IN_SCOPE_BODY)
        # dot-subdir (should be pruned)
        dot = root / ".superpowers"
        dot.mkdir()
        (dot / "scratch.md").write_text(IN_SCOPE_BODY)

        results = [rel for _full, rel in iter_md(str(root))]

    assert any("article.md" in r for r in results), f"normal file missing from results: {results}"
    assert not any(".superpowers" in r for r in results), f"dot-dir file leaked into results: {results}"


# --- Defect 1 regression tests ---

_NESTED_TYPE_DOC = """\
---
name: my-tool
description: A useful tool
metadata:
  type: compiled
---
# My Tool

Body text.
"""

def test_inject_nested_type_gets_top_level_type():
    """A doc whose frontmatter has metadata.type but NO top-level type must receive top-level type."""
    out = okf.inject_frontmatter(_NESTED_TYPE_DOC, {"type": "guide"})
    fm = okf.read_frontmatter(out)
    # Top-level type must be inserted
    assert fm["type"] == "guide", f"Expected top-level type=guide, got: {fm.get('type')!r}"
    # The nested metadata block must be preserved intact
    assert "metadata:" in out
    assert "  type: compiled" in out


def test_inject_genuine_top_level_type_unchanged():
    """A doc with a genuine top-level type: must not be modified (idempotent guard)."""
    text = "---\ntype: reference\ntitle: X\n---\n# X\n"
    out = okf.inject_frontmatter(text, {"type": "guide"})
    assert out == text, "Genuine top-level type: must be left unchanged"
