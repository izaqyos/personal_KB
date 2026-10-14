import os
import subprocess

import pytest

import kb_redundancy as kr


@pytest.mark.parametrize("name,key", [
    ("KB_perl.back", "perl"), ("KB_perl", "perl"), ("kb-cpp", "cpp"), ("CPP", "cpp"),
    ("unix-kb", "unix"), ("dominions-kb-1-3", "dominions"), ("dominions-kb.html", "dominions"),
    ("vi_tips_updated", "vi-tips"), ("vi_tips", "vi-tips"), ("search_n_replace_1", "search-n-replace"),
    ("search_n_replace_2", "search-n-replace"), ("vimrc.txt", "vimrc"), (".vimrc", "vimrc"),
    ("_vimrc", "vimrc"), (".vimrc-back", "vimrc"), ("foo-v2", "foo"), ("aceKB", "aceKB".lower()),
])
def test_normalise(name, key):
    assert kr.normalise(name) == key


def _git(cwd, *a):
    subprocess.run(["git", *a], cwd=cwd, check=True, capture_output=True)


@pytest.fixture
def repo(tmp_path):
    _git(tmp_path, "init", "-q")
    _git(tmp_path, "config", "user.email", "t@t")
    _git(tmp_path, "config", "user.name", "t")
    body = "\n".join(f"line {i}" for i in range(40))
    (tmp_path / "perl").mkdir()
    (tmp_path / "perl/KB_perl").write_text(body + "\nextra\n")
    (tmp_path / "perl/KB_perl.back").write_text(body + "\n")
    (tmp_path / "x").mkdir()
    (tmp_path / "x/a_1").write_text("one\ntwo\n")
    (tmp_path / "x/a_2").write_text("one\ntwo\n")
    (tmp_path / "kb-cpp").write_text("alpha\nbeta\n")
    (tmp_path / "CPP").mkdir()
    (tmp_path / "CPP/notes").write_text("gamma\ndelta\n")
    (tmp_path / "x/.DS_Store").write_bytes(b"\0junk")
    _git(tmp_path, "add", "-A")
    _git(tmp_path, "commit", "-qm", "init")
    return tmp_path


def test_metrics():
    a = type("I", (), {"lineset": {"a", "b"}})()
    b = type("I", (), {"lineset": {"a", "b", "c", "d"}})()
    assert kr.containment(a, b) == 1.0
    assert kr.containment(b, a) == 0.5
    assert kr.jaccard(a, b) == 0.5


def test_clusters_and_report(repo):
    files = kr.git_files(str(repo))
    cl = kr.build_clusters(str(repo), files)
    assert "perl/perl" in cl and "x/a" in cl and "top:cpp" in cl
    assert not any(".ds_store" in k for k in cl)
    rows = kr.report_rows(str(repo), cl, {})
    by = {r["cluster"]: r for r in rows}
    assert by["perl/perl"]["action"] == "delete perl/KB_perl.back"
    assert by["x/a"]["identical"] == "yes" and by["x/a"]["action"].startswith("delete")
    assert by["top:cpp"]["action"].startswith("keep both")


def test_main_writes_okf_report(repo):
    kr.main([str(repo), "--out", "docs/kb-review/redundancy.md"])
    text = (repo / "docs/kb-review/redundancy.md").read_text()
    assert text.startswith("---\ntype: review\n")
    assert "status: draft" in text and "| cluster |" in text
    assert "x/.DS_Store" in text
