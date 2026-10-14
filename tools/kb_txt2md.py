"""Convert a legacy utl.vim-style KB text file into split OKF markdown notes.

Legacy layout: a `Table Of Contents` banner + TOC lines ending `<URL:#tn=...>` (+ optional
`END TOC` marker), then a body with `N. Title` headings at column 0 and indented `N.M...`
subsections. One note is written per top-level section to
`<dir>/<kb-slug>/<NN>-<title-slug>.md` plus a per-KB README.md. Text between headings is kept
verbatim inside fenced ```text blocks. Files without a TOC (or with < 2 matched sections)
become a single `<name>.md`.

    python tools/kb_txt2md.py <file> [--dry-run] [--root .]

Without --dry-run the notes are written and the source is `git rm`'d, but only after the
no-loss check (every non-blank body line reproduced in the notes, as a multiset) passes.
"""
import argparse
import os
import re
import subprocess
import sys
import unicodedata
from collections import Counter, deque
from dataclasses import dataclass, field
from datetime import datetime, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import okf_lib as okf  # noqa: E402

URL_MARK = "<URL:#tn="
_URL_RE = re.compile(r"<URL[^>]*>")
_TAGS_RE = re.compile(r"[,;\s]*\btags\s*:\s*(.*)$", re.I)
_NUM_RE = re.compile(r"^(\d+(?:\.\d+)*)\.?(?:\s+(.*))?$")
_TOP_BODY_RE = re.compile(r"^(\d+)\.\s+(\S.*)$")
_SUB_BODY_RE = re.compile(r"^\s*(\d+(?:\.\d+)+)\.?(?:\s+(.*))?$")
_END_TOC_RE = re.compile(r"\.{3,}\s*END TOC", re.I)
_CHEAT_RE = re.compile(r"one-?liner|cheat|shortcut", re.I)


# ---------------------------------------------------------------- normalisation
def decode(raw) -> str:
    """bytes -> str: UTF-8 (BOM stripped), else cp1252, else latin-1. CRLF/CR -> LF."""
    if isinstance(raw, str):
        s = raw
    else:
        if raw.startswith(b"\xef\xbb\xbf"):
            raw = raw[3:]
        for enc in ("utf-8", "cp1252", "latin-1"):
            try:
                s = raw.decode(enc)
                break
            except UnicodeDecodeError:
                continue
    return s.replace("\r\n", "\n").replace("\r", "\n")


def slugify(s: str, maxlen: int = 60) -> str:
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return s[:maxlen].strip("-")


def kb_slug(name: str) -> str:
    """KB_python -> kb-python, NetworkKB -> kb-network, kb-cpp -> kb-cpp."""
    base = re.sub(r"\.(txt|md)$", "", name, flags=re.I)
    base = re.sub(r"(?<=[a-z])(?=[A-Z])", "-", base)          # camelCase -> camel-Case
    parts = [p for p in re.split(r"[^A-Za-z0-9]+", base) if p and p.lower() != "kb"]
    rest = slugify("-".join(parts))
    return f"kb-{rest}" if rest else "kb"


def _strip_tags(s: str) -> str:
    """Drop a trailing `tags: ...` part; a title that is only tags keeps the tag text."""
    head = _TAGS_RE.sub("", s)
    if head.strip(" ,;:"):
        return head
    m = _TAGS_RE.search(s)
    return m.group(1) if m else s


def norm_title(s: str) -> str:
    s = _strip_tags(_URL_RE.sub("", s))
    s = " ".join(s.split())
    return re.sub(r"[\s.,:;]+$", "", s).casefold()


def clean_title(s: str) -> str:
    s = _strip_tags(" ".join(_URL_RE.sub("", s).split()))
    return s.rstrip(" ,;:") or s


def harvest_tags(headings) -> list:
    out = []
    for h in headings:
        m = _TAGS_RE.search(h)
        if m:
            for w in re.split(r"[,\s]+", m.group(1)):
                t = slugify(w)
                if t and t not in out:
                    out.append(t)
    return out


def collapse(s: str) -> str:
    return " ".join(s.split())


# ---------------------------------------------------------------------- TOC
@dataclass
class TocEntry:
    num: str
    depth: int
    raw: str
    norm: str
    owner: int  # index of the enclosing depth-1 entry


def find_toc(lines):
    """Return (start, end_exclusive) of the TOC block, or None."""
    start = None
    for i, l in enumerate(lines[:60]):
        if "table of contents" in l.lower() and URL_MARK not in l:
            start = i
            break
    if start is None:
        first = next((i for i, l in enumerate(lines[:10]) if l.strip()), None)
        if first is None or URL_MARK not in lines[first]:
            return None
        start = first - 1
    last_url = None
    for i in range(start + 1, len(lines)):
        l = lines[i]
        if _END_TOC_RE.search(l):
            return start, i + 1
        if URL_MARK in l:
            last_url = i
        elif l.strip():
            break
    return (start, last_url + 1) if last_url is not None else None


def parse_toc(toc_lines):
    entries, owner = [], -1
    for l in toc_lines:
        if URL_MARK not in l:
            continue
        m = _NUM_RE.match(l[:l.index(URL_MARK)].strip())
        if not m:
            continue
        num, title = m.group(1), (m.group(2) or "").strip()
        depth = len(num.split("."))
        if depth == 1:
            owner += 1
        if owner < 0:
            continue
        entries.append(TocEntry(num, depth, title, norm_title(title), owner))
    return entries


# --------------------------------------------------------------------- model
@dataclass
class Section:
    top_idx: int
    num: str
    title: str                                   # heading text as written (after "N. ")
    items: list = field(default_factory=list)    # ("h", depth, text) | ("t", line)


@dataclass
class Plan:
    rel: str
    kb_dir: str = ""
    notes: dict = field(default_factory=dict)    # rel path -> text
    skipped: list = field(default_factory=list)
    n_sections: int = 0
    single: bool = False
    expected: Counter = field(default_factory=Counter)


def _fence(lines):
    longest = max((len(m.group(0)) for l in lines for m in re.finditer(r"`+", l)), default=0)
    f = "`" * max(3, longest + 1)
    return [f + "text", *lines, f]


def _trim(lines):
    a, b = 0, len(lines)
    while a < b and not lines[a].strip():
        a += 1
    while b > a and not lines[b - 1].strip():
        b -= 1
    return lines[a:b]


def _render_items(items):
    """items -> markdown lines (headings + fenced verbatim text chunks)."""
    out, buf = [], []

    def flush():
        chunk = _trim(buf)
        if chunk:
            out.extend(["", *_fence(chunk)])
        buf.clear()

    for it in items:
        if it[0] == "h":
            flush()
            out.extend(["", f"{'#' * min(max(it[1], 2), 4)} {collapse(it[2])}"])
        else:
            buf.append(it[1])
    flush()
    return out


def _frontmatter(title, tags, at, legacy_source, desc, ntype="reference"):
    return okf.render_frontmatter({
        "type": ntype, "title": title, "description": desc, "tags": tags,
        "generated": {"by": okf.OKF_ACTOR, "at": at}, "status": "stable",
        "capture_type": "source", "legacy_source": legacy_source})


def _note_type(title):
    return "cheatsheet" if _CHEAT_RE.search(title) else "reference"


def _expected_from(sections, preamble):
    """Exact text for non-heading lines, whitespace-collapsed text for heading lines."""
    c = Counter(l for l in preamble if l.strip())
    for s in sections:
        c[collapse(f"{s.num}. {s.title}")] += 1
        for it in s.items:
            if it[0] == "h":
                c[collapse(it[2])] += 1
            elif it[1].strip():
                c[it[1]] += 1
    return c


def convert(raw, rel_path: str, commit_iso: str = "2000-01-01T00:00:00Z") -> Plan:
    lines = decode(raw).split("\n")
    if lines and lines[-1] == "":
        lines.pop()
    rel_path = rel_path.replace(os.sep, "/")
    d, name = os.path.split(rel_path)
    stem = re.sub(r"\.txt$", "", name, flags=re.I)
    kslug = kb_slug(name)
    kb_dir = f"{d}/{kslug}" if d else kslug
    plan = Plan(rel=rel_path, kb_dir=kb_dir)

    toc = find_toc(lines)
    entries, body = [], lines
    if toc:
        entries = parse_toc(lines[toc[0]:toc[1]])
        body = lines[toc[1]:]
    tops = [e for e in entries if e.depth == 1]
    by_title = {}
    for idx, e in enumerate(tops):
        if e.norm:
            by_title.setdefault(e.norm, deque()).append(idx)
    subs = {}
    for e in entries:
        if e.depth > 1 and e.norm:
            subs.setdefault(e.owner, Counter())[(e.num, e.norm)] += 1

    preamble, sections, cur = [], [], None
    for l in body:
        m = _TOP_BODY_RE.match(l)
        if m and by_title.get(norm_title(m.group(2))):
            idx = by_title[norm_title(m.group(2))].popleft()
            cur = Section(idx, m.group(1), m.group(2).strip())
            sections.append(cur)
            continue
        if cur is None:
            preamble.append(l)
            continue
        sm = _SUB_BODY_RE.match(l)
        if sm and sm.group(2):
            key = (sm.group(1), norm_title(sm.group(2)))
            pool = subs.get(cur.top_idx)
            if pool and pool.get(key, 0) > 0:
                pool[key] -= 1
                cur.items.append(("h", len(sm.group(1).split(".")), l.strip()))
                continue
        cur.items.append(("t", l))

    matched = {s.top_idx for s in sections}
    plan.skipped = [f"{t.num}. {t.raw}" for i, t in enumerate(tops)
                    if t.norm and i not in matched]

    if len(sections) < 2:
        plan.single = True
        plan.expected = Counter(l for l in body if l.strip())
        fm = _frontmatter(stem, [slugify(stem) or "kb"], commit_iso, rel_path,
                          f"Legacy KB {name}, kept as a single fenced text note.")
        content = [fm, "", f"# {stem}", *_render_items([("t", l) for l in body])]
        plan.notes[f"{d}/{stem}.md" if d else f"{stem}.md"] = "\n".join(content) + "\n"
        plan.n_sections = 1
        return plan

    plan.expected = _expected_from(sections, preamble)
    width = max(2, len(str(len(sections))))
    readme_link = f"/{kb_dir}/README.md"
    used, toc_rank, pre_file = set(), {}, None
    order = ([("pre", None)] if any(l.strip() for l in preamble) else []) \
        + [("sec", s) for s in sections]

    for kind, s in order:
        if kind == "pre":
            title, num, hdrs, items = "Preamble", "preamble", [], [("t", l) for l in preamble]
            slug, nn, h1 = "preamble", "0" * width, "Preamble"
            desc = f"Text before the first section of the legacy {stem} notes."
        else:
            title, num = clean_title(s.title), s.num
            hdrs = [s.title] + [it[2] for it in s.items if it[0] == "h"]
            items = s.items
            slug = slugify(title) or "section"
            nn = str(sections.index(s) + 1).zfill(width)
            h1 = collapse(s.title)
            desc = f"Section {num} of the legacy {stem} notes."
        base, k = slug, 2
        while slug in used:
            slug = f"{base[:57]}-{k}"
            k += 1
        used.add(slug)
        fname = f"{nn}-{slug}.md"
        tags = [kslug] + [t for t in harvest_tags(hdrs) if t != kslug]
        fm = _frontmatter(title, tags, commit_iso, f"{rel_path}#{num}", desc, _note_type(title))
        md = [fm, "", f"# {h1}", "", f"[↑ {stem}]({readme_link})", *_render_items(items)]
        plan.notes[f"{kb_dir}/{fname}"] = "\n".join(md) + "\n"
        if kind == "sec":
            toc_rank[s.top_idx] = (fname, title)
        else:
            pre_file = fname

    rl = [_frontmatter(stem, [kslug], commit_iso, rel_path,
                       f"Index of the {len(sections)} sections converted from the legacy {name} KB.",
                       "guide"),
          "", f"# {stem}", "",
          f"Converted from the legacy text KB `{rel_path}`, one note per top-level section.", ""]
    if pre_file:
        rl.append(f"* [Preamble](/{kb_dir}/{pre_file})")
    for idx in sorted(toc_rank):
        fname, title = toc_rank[idx]
        rl.append(f"* [{title}](/{kb_dir}/{fname})")
    plan.notes[f"{kb_dir}/README.md"] = "\n".join(rl) + "\n"
    plan.n_sections = len(sections)
    return plan


# ------------------------------------------------------------------ no-loss
def produced_multiset(plan: Plan) -> Counter:
    """Re-derive the line multiset from the rendered notes (fenced lines + heading lines)."""
    c = Counter()
    for path, text in plan.notes.items():
        if path.endswith("/README.md") and not plan.single:
            continue
        src = str(okf.read_frontmatter(text).get("legacy_source", ""))
        num = src.split("#", 1)[1] if "#" in src else None
        lines = text.split("\n")
        end = next(i for i in range(1, len(lines)) if lines[i].strip() == "---")
        fence, h1_seen = None, False
        for l in lines[end + 1:]:
            if fence is not None:
                if l == fence:
                    fence = None
                elif l.strip():
                    c[l] += 1
                continue
            m = re.match(r"^(`{3,})text$", l)
            if m:
                fence = m.group(1)
            elif l.startswith("# ") and not h1_seen:
                h1_seen = True
                if num and num != "preamble":
                    c[collapse(f"{num}. {l[2:]}")] += 1
            elif re.match(r"^#{2,4} ", l):
                c[collapse(l.split(" ", 1)[1])] += 1
    return c


def verify(plan: Plan):
    """Return (missing, extra) Counters; empty `missing` means nothing was lost."""
    got = produced_multiset(plan)
    return plan.expected - got, got - plan.expected


# ------------------------------------------------------------------------ CLI
def last_commit_iso(root, rel):
    try:
        out = subprocess.run(["git", "log", "-1", "--format=%cI", "--", rel], cwd=root,
                             capture_output=True, text=True, check=True).stdout.strip()
        return datetime.fromisoformat(out).astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except Exception:
        return datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("file")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--root", default=".")
    a = ap.parse_args(argv)
    root = os.path.abspath(a.root)
    rel = os.path.relpath(os.path.abspath(a.file), root)
    with open(os.path.join(root, rel), "rb") as fh:
        raw = fh.read()
    plan = convert(raw, rel, last_commit_iso(root, rel))
    missing, extra = verify(plan)
    print(f"source: {rel}")
    print(f"mode: {'single note' if plan.single else f'{plan.n_sections} sections -> {plan.kb_dir}/'}")
    for p, t in sorted(plan.notes.items()):
        print(f"  note {p} ({t.count(chr(10))} lines)")
    for s in plan.skipped:
        print(f"  skipped (absent in body): {s}")
    print(f"no-loss: {'PASS' if not missing else 'FAIL'} "
          f"(missing {sum(missing.values())}, extra {sum(extra.values())})")
    if missing:
        for l, n in list(missing.items())[:10]:
            print(f"    missing x{n}: {l[:100]!r}")
        return 1
    if a.dry_run:
        return 0
    full_dir = os.path.join(root, plan.kb_dir)
    if not plan.single and os.path.isdir(full_dir) and os.listdir(full_dir):
        print(f"error: {plan.kb_dir} exists and is not empty", file=sys.stderr)
        return 1
    for p in plan.notes:
        if os.path.exists(os.path.join(root, p)) and p != rel:
            print(f"error: {p} already exists", file=sys.stderr)
            return 1
    subprocess.run(["git", "rm", "-q", "--", rel], cwd=root, check=True)
    for p, t in plan.notes.items():
        full = os.path.join(root, p)
        os.makedirs(os.path.dirname(full) or ".", exist_ok=True)
        with open(full, "w", encoding="utf-8", newline="\n") as fh:
            fh.write(t)
    print(f"wrote {len(plan.notes)} files; git rm {rel}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
