import re
from collections import Counter

import kb_txt2md as k
import okf_lib as okf

BANNER = ".........................................Table Of Contents........."
END = ".................................................END TOC.........."


def toc_line(text):
    return f"{text} <URL:#tn={text}>"


def make(toc, body, end=True):
    parts = [BANNER, *[toc_line(t) for t in toc]]
    if end:
        parts.append(END)
    return "\n".join(parts + ["", ""] + body) + "\n"


def notes_of(plan):
    return {p: t for p, t in plan.notes.items() if not p.endswith("README.md")}


def fenced_lines(text):
    out, fence = [], None
    for l in text.split("\n"):
        if fence is not None:
            if l == fence:
                fence = None
            else:
                out.append(l)
        else:
            m = re.match(r"^(`{3,})text$", l)
            if m:
                fence = m.group(1)
    return out


BASIC = make(
    ["1. Alpha", "\t1.1 first sub", "2. Beta"],
    ["Description: preamble text", "", "1. Alpha", "\t1.1 first sub", "\tcode here", "", "2. Beta", "beta body"])


def test_basic_split_and_no_loss():
    p = k.convert(BASIC, "python/KB_demo", "2025-01-02T03:04:05Z")
    assert p.kb_dir == "python/kb-demo"
    names = sorted(p.notes)
    assert names == ["python/kb-demo/00-preamble.md", "python/kb-demo/01-alpha.md",
                     "python/kb-demo/02-beta.md", "python/kb-demo/README.md"]
    m, e = k.verify(p)
    assert not m and not e
    a = p.notes["python/kb-demo/01-alpha.md"]
    fm = okf.read_frontmatter(a)
    assert fm["type"] == "reference" and fm["status"] == "stable"
    assert fm["capture_type"] == "source" and fm["legacy_source"] == "python/KB_demo#1"
    assert fm["generated"] == {"by": "human:izaqyos", "at": "2025-01-02T03:04:05Z"}
    assert "kb-demo" in fm["tags"]
    assert "[↑ KB_demo](/python/kb-demo/README.md)" in a
    assert "\n## 1.1 first sub\n" in a
    readme = p.notes["python/kb-demo/README.md"]
    assert okf.read_frontmatter(readme)["type"] == "guide"
    assert "(/python/kb-demo/01-alpha.md)" in readme


def test_nested_odd_indentation_toc():
    toc = ["3. Tools", "\t3.1 GUI", "\t\t3.1.1 Tk", "\t\t3.1.2 more", "\t\t    3.1.2.1 started",
           "\t\t    3.1.2.2", "\t3.2 Pygame", "4. Other"]
    body = ["3. Tools", "\t3.1 GUI", "x", "\t\t3.1.1 Tk", "y", "\t\t3.1.2 more",
            "\t\t    3.1.2.1 started", "deep", "\t3.2 Pygame", "z", "4. Other", "o"]
    p = k.convert(make(toc, body), "KB_x")
    t = p.notes["kb-x/01-tools.md"]
    assert "\n## 3.1 GUI\n" in t
    assert "\n### 3.1.1 Tk\n" in t
    assert "\n#### 3.1.2.1 started\n" in t
    assert "\n## 3.2 Pygame\n" in t
    assert not k.verify(p)[0]


def test_heading_with_tags():
    toc = ["1. GUI, tags: python GUI UX UI", "\t1.1 Sub, tags: Tk Widgets", "2. Next"]
    body = ["1. GUI, tags: python GUI UX UI", "\t1.1 Sub, tags: Tk Widgets", "t", "2. Next", "n"]
    p = k.convert(make(toc, body), "KB_x")
    t = p.notes["kb-x/01-gui.md"]
    fm = okf.read_frontmatter(t)
    assert fm["title"] == "GUI"
    assert fm["tags"] == ["kb-x", "python", "gui", "ux", "ui", "tk", "widgets"]
    assert not k.verify(p)[0]


def test_title_absent_in_body_is_skipped():
    toc = ["1. Alpha", "2. Ghost", "3. Gamma"]
    body = ["1. Alpha", "a", "3. Gamma", "g"]
    p = k.convert(make(toc, body), "KB_x")
    assert p.skipped == ["2. Ghost"]
    assert len(notes_of(p)) == 2
    assert not k.verify(p)[0]


def test_duplicate_titles_and_out_of_order_numbers():
    toc = ["2. Same", "1. Same", "5. Other"]
    body = ["2. Same", "first", "1. Same", "second", "5. Other", "third"]
    p = k.convert(make(toc, body), "KB_x")
    assert sorted(notes_of(p)) == ["kb-x/01-same.md", "kb-x/02-same-2.md", "kb-x/03-other.md"]
    assert "first" in p.notes["kb-x/01-same.md"]
    assert "second" in p.notes["kb-x/02-same-2.md"]
    assert not k.verify(p)[0]


def test_backticks_lengthen_fence():
    body = ["1. Alpha", "use ```` four ticks ````", "and ``` three", "2. Beta", "plain"]
    p = k.convert(make(["1. Alpha", "2. Beta"], body), "KB_x")
    t = p.notes["kb-x/01-alpha.md"]
    assert "`````text\n" in t
    assert fenced_lines(t) == ["use ```` four ticks ````", "and ``` three"]
    assert "\n```text\nplain\n```\n" in p.notes["kb-x/02-beta.md"]
    assert not k.verify(p)[0]


def test_latin1_input():
    raw = make(["1. Café", "2. Beta"], ["1. Café", "naïve é", "2. Beta", "b"]).encode("latin-1")
    p = k.convert(raw, "KB_x")
    assert "naïve é" in p.notes["kb-x/01-cafe.md"]
    assert not k.verify(p)[0]


def test_cp1252_smart_quotes():
    raw = make(["1. A", "2. B"], ["1. A", "“quoted”", "2. B", "b"]).encode("cp1252")
    p = k.convert(raw, "KB_x")
    assert "“quoted”" in p.notes["kb-x/01-a.md"]


def test_crlf_input():
    raw = BASIC.replace("\n", "\r\n").encode()
    p = k.convert(raw, "KB_demo")
    assert all("\r" not in t for t in p.notes.values())
    assert not k.verify(p)[0]


def test_preamble_only_when_nonempty():
    body = ["1. Alpha", "a", "2. Beta", "b"]
    p = k.convert(make(["1. Alpha", "2. Beta"], body), "KB_x")
    assert not any("preamble" in n for n in p.notes)
    p2 = k.convert(BASIC, "KB_x")
    assert "kb-x/00-preamble.md" in p2.notes
    assert "Description: preamble text" in p2.notes["kb-x/00-preamble.md"]


def test_no_toc_file_is_single_note():
    p = k.convert("just some\n\ttext\n1. not a heading\n", "unix-kb")
    assert p.single and list(p.notes) == ["unix-kb.md"]
    assert fenced_lines(p.notes["unix-kb.md"]) == ["just some", "\ttext", "1. not a heading"]
    assert not k.verify(p)[0]


def test_single_section_file_is_single_note():
    p = k.convert(make(["1. Only"], ["1. Only", "x"]), "troubleshoot.txt")
    assert p.single and list(p.notes) == ["troubleshoot.md"]
    assert not k.verify(p)[0]


def test_toc_without_end_marker():
    p = k.convert(make(["1. Alpha", "2. Beta"], ["1. Alpha", "a", "2. Beta", "b"], end=False), "KB_x")
    assert not p.single and not k.verify(p)[0]


def test_slugs_and_kb_names():
    assert k.kb_slug("KB_python") == "kb-python"
    assert k.kb_slug("NetworkKB") == "kb-network"
    assert k.kb_slug("kb-cpp") == "kb-cpp"
    assert k.kb_slug("KB_vi") == "kb-vi"
    assert len(k.slugify("x" * 100)) <= 60
    assert k.slugify("Café (bases)!") == "cafe-bases"


def test_nn_width_follows_section_count():
    toc = [f"{i}. S{i}" for i in range(1, 101)]
    body = [x for i in range(1, 101) for x in (f"{i}. S{i}", "t")]
    p = k.convert(make(toc, body), "KB_x")
    assert "kb-x/001-s1.md" in p.notes and "kb-x/100-s100.md" in p.notes


def test_no_loss_detects_dropped_line():
    p = k.convert(BASIC, "KB_demo")
    path = "python/kb-demo/01-alpha.md" if "python/kb-demo/01-alpha.md" in p.notes else "KB_demo/01-alpha.md"
    key = next(x for x in p.notes if x.endswith("01-alpha.md"))
    p.notes[key] = p.notes[key].replace("\tcode here\n", "")
    missing, _ = k.verify(p)
    assert missing == Counter({"\tcode here": 1})


def test_no_loss_multiset_property_with_messy_body():
    body = ["pre", "1. Alpha", "dup", "dup", "\t1.1 first sub", "dup", "  indented", "\ttab",
            "``` weird", "", "", "2. Beta", "1. Alpha", "tail   "]
    p = k.convert(make(["1. Alpha", "\t1.1 first sub", "2. Beta"], body), "KB_x")
    m, e = k.verify(p)
    assert not m and not e
    got = Counter()
    for t in notes_of(p).values():
        got.update(l for l in fenced_lines(t) if l.strip())
    assert got["dup"] == 3 and got["tail   "] == 1 and got["1. Alpha"] == 1


def test_sentence_heading_guard_top_level():
    long_t = "use nc to listen on a port and send some data over it now"
    src = make(["1. Alpha", f"2. {long_t}", "3. Beta"],
               ["1. Alpha", "alpha body", f"1. {long_t}", "tip text", "3. Beta", "beta body"])
    p = k.convert(src, "Network/KB_demo")
    assert sorted(notes_of(p)) == ["Network/kb-demo/01-alpha.md", "Network/kb-demo/02-beta.md"]
    body = "\n".join(fenced_lines(p.notes["Network/kb-demo/01-alpha.md"]))
    assert f"1. {long_t}" in body and "tip text" in body
    assert p.guarded and not p.skipped
    m, e = k.verify(p)
    assert not m and not e


def test_sentence_heading_guard_sub_level():
    long_t = " ".join(["word"] * 13)
    src = make(["1. Alpha", f"\t1.1 {long_t}", "2. Beta"],
               ["1. Alpha", f"\t1.1 {long_t}", "\ttext", "2. Beta", "b"])
    p = k.convert(src, "d/KB_demo")
    a = p.notes["d/kb-demo/01-alpha.md"]
    assert "## " not in a
    assert f"1.1 {long_t}" in "\n".join(fenced_lines(a))
    m, e = k.verify(p)
    assert not m and not e


def giant_src(n_sub=3, per=10):
    toc = ["1. Big", *[f"\t1.{i} Sub {i}" for i in range(1, n_sub + 1)], "2. Small"]
    body = ["1. Big", "intro line"]
    for i in range(1, n_sub + 1):
        body.append(f"\t1.{i} Sub {i}")
        body += [f"line {i}-{j}" for j in range(per)]
    body += ["2. Small", "s"]
    return make(toc, body)


def test_giant_note_split_one_level():
    p = k.convert(giant_src(), "d/KB_demo", giant=20)
    assert p.split == ["d/kb-demo/01-big/"]
    names = sorted(p.notes)
    assert "d/kb-demo/01-big/README.md" in names
    assert "d/kb-demo/01-big/00-intro.md" in names
    assert "d/kb-demo/01-big/02-sub-2.md" in names
    assert "d/kb-demo/01-big.md" not in names
    r = p.notes["d/kb-demo/01-big/README.md"]
    assert okf.read_frontmatter(r)["type"] == "guide"
    assert "/d/kb-demo/01-big/03-sub-3.md" in r and "/d/kb-demo/README.md" in r
    assert "(/d/kb-demo/01-big/README.md)" in p.notes["d/kb-demo/README.md"]
    m, e = k.verify(p)
    assert not m and not e


def test_giant_note_not_split_below_threshold():
    p = k.convert(giant_src(), "d/KB_demo")
    assert not p.split and "d/kb-demo/01-big.md" in p.notes


def test_giant_note_recursive_third_level():
    toc = ["1. Big", "\t1.1 Sub", "\t1.1.1 Deep a", "\t1.1.2 Deep b", "2. Small"]
    body = ["1. Big", "\t1.1 Sub", "\t1.1.1 Deep a", *[f"a{j}" for j in range(30)],
            "\t1.1.2 Deep b", *[f"b{j}" for j in range(30)], "2. Small", "s"]
    p = k.convert(make(toc, body), "d/KB_demo", giant=40)
    assert "d/kb-demo/01-big/01-sub/README.md" in p.notes
    assert "d/kb-demo/01-big/01-sub/02-deep-b.md" in p.notes
    m, e = k.verify(p)
    assert not m and not e


def test_long_heading_continuing_numbering_stays_a_section():
    long_t = "a very long but genuine section title with many words in it"
    src = make(["1. Alpha", f"2. {long_t}"], ["1. Alpha", "a", f"2. {long_t}", "b"])
    p = k.convert(src, "d/KB_demo")
    assert len(notes_of(p)) == 2 and not p.guarded
