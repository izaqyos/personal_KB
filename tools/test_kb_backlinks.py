import kb_backlinks as b


def fm(title):
    return f"---\ntype: reference\ntitle: {title}\n---\n"


def write(tmp, rel, text):
    p = tmp / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text)


def run(tmp):
    for rel, (text, sources) in b.compute(str(tmp)).items():
        (tmp / rel).write_text(b.with_block(text, sources))


def test_one_way_link_gets_backlink_and_is_idempotent(tmp_path):
    write(tmp_path, "a.md", fm("Alpha") + "# A\n\nSee [B](/x/b.md).\n")
    write(tmp_path, "x/b.md", fm("Beta") + "# B\n\nbody\n")
    run(tmp_path)
    out = (tmp_path / "x/b.md").read_text()
    assert "## See Also" in out and "* [Alpha](/a.md)" in out
    assert out.count(b.START) == 1
    run(tmp_path)
    assert (tmp_path / "x/b.md").read_text() == out
    assert b.START not in (tmp_path / "a.md").read_text()      # a gets nothing: b doesn't link to a


def test_mutual_links_need_no_block(tmp_path):
    write(tmp_path, "a.md", fm("A") + "[b](b.md)\n")
    write(tmp_path, "b.md", fm("B") + "[a](./a.md)\n")
    run(tmp_path)
    assert b.START not in (tmp_path / "a.md").read_text()
    assert b.START not in (tmp_path / "b.md").read_text()


def test_existing_see_also_is_reused_and_outside_text_untouched(tmp_path):
    write(tmp_path, "a.md", fm("A") + "[b](/b.md)\n")
    body = fm("B") + "# B\n\n## See Also\n\n- [c](https://example.com) — external\n"
    write(tmp_path, "b.md", body)
    run(tmp_path)
    out = (tmp_path / "b.md").read_text()
    assert out.startswith(body.rstrip("\n"))
    assert out.count("## See Also") == 1


def test_block_removed_when_link_disappears(tmp_path):
    write(tmp_path, "a.md", fm("A") + "[b](/b.md)\n")
    write(tmp_path, "b.md", fm("B") + "x\n")
    run(tmp_path)
    write(tmp_path, "a.md", fm("A") + "no link now\n")
    run(tmp_path)
    assert b.START not in (tmp_path / "b.md").read_text()


def test_index_and_readme_excluded(tmp_path):
    write(tmp_path, "README.md", fm("R") + "[b](/b.md)\n")
    write(tmp_path, "index.md", "# i\n\n* [b](/b.md)\n")
    write(tmp_path, "b.md", fm("B") + "x\n")
    run(tmp_path)
    assert b.START not in (tmp_path / "b.md").read_text()
