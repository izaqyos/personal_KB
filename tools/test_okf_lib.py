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
