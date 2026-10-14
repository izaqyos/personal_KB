import json

import kb_tagging as t

NOTE = """---
type: reference
title: "Logging"
description: Section 12 of the legacy KB_python notes.
tags: [kb-python, the, logging]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
---

# Logging, tags: Logging

[↑ KB_python](/python/kb-python/README.md)

````text
import logging
logging.basicConfig(level=logging.DEBUG)
````
"""


def test_digest_note_skips_fences_and_backlink():
    d = t.digest_note(NOTE)
    assert d["title"] == "Logging"
    assert d["headings"] == ["# Logging, tags: Logging"]
    assert d["head"] == ["import logging", "logging.basicConfig(level=logging.DEBUG)"]


def test_set_fields_replaces_only_description_and_tags():
    out = t.set_fields(NOTE, "Python logging module basics.", ["python", "logging"])
    assert 'description: Python logging module basics.' in out
    assert "tags: [python, logging]" in out
    assert "Section 12 of the legacy" not in out and "the," not in out
    # everything else untouched, body byte-identical
    assert out.split("\n---\n", 1)[1] == NOTE.split("\n---\n", 1)[1]
    assert 'generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }' in out
    assert t.split_frontmatter(out)[0][0] == "type: reference"


def test_set_fields_quotes_and_inserts_after_title():
    note = "---\ntype: x\ntitle: T\n---\nbody\n"
    out = t.set_fields(note, "Uses: colons", ["a"])
    assert out.startswith('---\ntype: x\ntitle: T\ndescription: "Uses: colons"\ntags: [a]\n---\n')


def test_apply_drops_unknown_tags(tmp_path):
    (tmp_path / "n.md").write_text(NOTE)
    vocab = tmp_path / "tags.yaml"
    vocab.write_text("languages: [python]\nos: []\ntopics: [logging]\n")
    res = tmp_path / "r.json"
    res.write_text(json.dumps({"n.md": {"description": "d " * 150, "tags": ["Python", "nope", "logging"]}}))
    assert t.cmd_apply(str(tmp_path), str(res), str(vocab), False) == 0
    out = (tmp_path / "n.md").read_text()
    assert "tags: [python, logging]" in out
    assert len([l for l in out.split("\n") if l.startswith("description:")][0]) < 215


def test_apply_reports_missing(tmp_path):
    vocab = tmp_path / "tags.yaml"
    vocab.write_text("x: [a]\n")
    res = tmp_path / "r.json"
    res.write_text(json.dumps({"nope.md": {"description": "d", "tags": ["a"]}}))
    assert t.cmd_apply(str(tmp_path), str(res), str(vocab), False) == 1
