"""Pure helpers for OKF migration of the personal KB. No file I/O in this module."""
from __future__ import annotations
import re
import posixpath

TYPE_TAXONOMY = ["guide", "reference", "cheatsheet", "pattern", "decision-pack",
                 "system-card", "primer", "comparison", "security-review", "setup"]
DEFAULT_TYPE = "reference"
OKF_ACTOR = "human:izaqyos"   # curator of record for generated.by (OKF v0.2 §7)
STATUS_MAP = {"active": "stable", "draft": "draft", "archived": "deprecated",
              "stable": "stable", "deprecated": "deprecated",
              "pattern": "stable",     # a kind, not a lifecycle state (kind already in tags)
              "proposed": "draft"}     # a decision state; preserved as decision_status

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
    """First non-empty line after a real (non-code) `## TL;DR` heading."""
    lines = [(l.rstrip("\n"), code) for l, code in _fence_state_lines(text)]
    for i, (line, code) in enumerate(lines):
        if not code and line.strip().lower().startswith("## tl;dr"):
            for nxt, nxt_code in lines[i + 1:]:
                if nxt.strip() and not nxt_code:
                    return _strip_md(nxt.strip())
    return None


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
    if p.startswith("docs/superpowers/plans/"):
        return "plan"
    if p.startswith("docs/superpowers/specs/"):
        return "spec"
    if posixpath.basename(p) == "readme.md":
        return "guide"
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
        fm["generated"] = {"by": OKF_ACTOR, "at": ts}
    if bq.get("author"):
        fm["author"] = bq["author"]
    fm["status"] = STATUS_MAP.get((bq.get("status") or "active").strip().lower(), "stable")
    if bq.get("type"):
        fm["capture_type"] = bq["type"]
    return fm


_ORDER = ["type", "title", "description", "resource", "tags",
          "generated", "author", "status", "capture_type"]
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
        if isinstance(v, dict):
            lines.append(f"{k}: {{ " + ", ".join(f"{a}: {_scalar(b)}" for a, b in v.items()) + " }")
        elif isinstance(v, list):
            lines.append(f"{k}: [" + ", ".join(_scalar(x) for x in v) + "]")
        else:
            lines.append(f"{k}: {_scalar(v)}")
    lines.append("---")
    return "\n".join(lines)


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
    if any(re.match(r"type\s*:\s*\S", l) for l in block):
        return text
    insert = f"type: {_scalar(type_value)}\n"
    return lines[0] + insert + "".join(block) + lines[close] + "".join(lines[close + 1:])


def inject_frontmatter(text: str, fm: dict) -> str:
    if has_yaml_frontmatter(text):
        return _ensure_type_in_existing(text, fm.get("type", DEFAULT_TYPE))
    return render_frontmatter(fm) + "\n\n" + text


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


_INLINE_CODE_RE = re.compile(r"`[^`]+`")


def _fence_state_lines(text: str):
    """Yield (line_with_ending, is_code): is_code True for fence markers,
    every line inside a ``` / ~~~ fence, and 4-space/tab-indented code lines
    (conservative: an indented list item is treated as code and left alone)."""
    in_fence = False
    for line in text.splitlines(keepends=True):
        s = line.lstrip()
        if s.startswith("```") or s.startswith("~~~"):
            in_fence = not in_fence
            yield line, True
        elif not in_fence and line.startswith(("    ", "\t")):
            yield line, True
        else:
            yield line, in_fence


def _outside_inline_code(line: str):
    """Yield (segment, is_code) pairs splitting a line on `inline code` spans."""
    last = 0
    for m in _INLINE_CODE_RE.finditer(line):
        yield line[last:m.start()], False
        yield m.group(0), True
        last = m.end()
    yield line[last:], False


def rewrite_links(text: str, file_reldir: str) -> str:
    def repl(m):
        new = resolve_link(m.group("target"), file_reldir)
        return m.group("pre") + new + m.group("post") if new is not None else m.group(0)
    parts = []
    for line, is_code in _fence_state_lines(text):
        if is_code:
            parts.append(line)
            continue
        parts.extend(seg if seg_is_code else _LINK_RE.sub(repl, seg)
                     for seg, seg_is_code in _outside_inline_code(line))
    return "".join(parts)


def extract_absolute_links(text: str) -> list:
    out = []
    for line, is_code in _fence_state_lines(text):
        if is_code:
            continue
        for seg, seg_is_code in _outside_inline_code(line):
            if seg_is_code:
                continue
            for m in _LINK_RE.finditer(seg):
                t = m.group("target")
                if t.startswith("/"):
                    out.append(t.split("#", 1)[0])
    return out


_OKF_DATE_RE = re.compile(r"^##\s+(?P<date>\d{4}-\d{2}-\d{2})\s*$")


def normalize_log(text: str) -> str:
    """Mixed log (OKF `## YYYY-MM-DD` sections + legacy `## [date] action | topic | source`
    entries) -> pure OKF form, newest date first. Preamble (everything before the first
    `## ` heading) is kept verbatim; OKF-section bodies are kept verbatim; legacy entries
    become `* **Action**: topic — source` bullets appended after that date's OKF bullets."""
    lines = text.splitlines()
    first = next((i for i, l in enumerate(lines) if l.startswith("## ")), len(lines))
    preamble = "\n".join(lines[:first]).rstrip()
    by_date: dict = {}
    cur = None
    for line in lines[first:]:
        m_okf, m_leg = _OKF_DATE_RE.match(line), _LOG_HEAD_RE.match(line)
        if m_okf:
            cur = by_date.setdefault(m_okf.group("date"), [])
        elif m_leg:
            cur = by_date.setdefault(m_leg.group("date"), [])
            cur.append(f"* **{m_leg.group('action').capitalize()}**: "
                       f"{m_leg.group('topic')} — {m_leg.group('source')}")
            cur = _LegacyBody(cur)
        elif cur is not None and line.strip():
            cur.append(line)
    out = [preamble, ""] if preamble else []
    for date in sorted(by_date, reverse=True):
        out += [f"## {date}"] + [str(x) for x in by_date[date]] + [""]
    return "\n".join(out).rstrip() + "\n"


class _LegacyBody:
    """Appends a legacy entry's body lines as indented sub-bullets of its bullet."""
    def __init__(self, target: list):
        self.target = target

    def append(self, line: str):
        self.target.append(f"  {line.strip()}")


def index_plan(concepts_by_dir: dict) -> dict:
    """{reldir: [concept entries]} ('' = root, '/'-separated) -> {reldir: {"concepts": [...],
    "subdirs": [(child_reldir, recursive_concept_count)]}} for every dir with concepts plus all
    of its ancestors, so each level's index.md links down to the next (progressive disclosure)."""
    dirs = set()
    for d in concepts_by_dir:
        while True:
            dirs.add(d)
            if not d:
                break
            d = posixpath.dirname(d)
    def count(d):
        return sum(len(v) for k, v in concepts_by_dir.items()
                   if k == d or (k.startswith(d + "/") if d else True))
    plan = {}
    for d in dirs:
        kids = sorted((c for c in dirs if c and posixpath.dirname(c) == d), key=str.lower)
        plan[d] = {"concepts": sorted(concepts_by_dir.get(d, []), key=lambda e: e["title"].lower()),
                   "subdirs": [(c, count(c)) for c in kids]}
    return plan


def generate_index_v2(dir_title: str, concepts: list, subdirs: list) -> str:
    out = [f"# {dir_title}", ""]
    for e in concepts:
        desc = f" - {e['description']}" if e.get("description") else ""
        out.append(f"* [{e['title']}]({e['path']}){desc}")
    if subdirs:
        if concepts:
            out += ["", "# Subdirectories", ""]
        for c, n in subdirs:
            out.append(f"* [{posixpath.basename(c)}](/{c}/) - {n} concept{'s' if n != 1 else ''}")
    out.append("")
    return "\n".join(out)


def extract_internal_links(text: str, file_reldir: str) -> list:
    """All non-external link targets (absolute and relative), fence/inline-code aware,
    resolved to repo-relative posix paths (no leading '/', anchor and query dropped,
    %-escapes decoded). Pure: existence is checked by the caller."""
    from urllib.parse import unquote
    out = []
    for line, is_code in _fence_state_lines(text):
        if is_code:
            continue
        for seg, seg_is_code in _outside_inline_code(line):
            if seg_is_code:
                continue
            for m in _LINK_RE.finditer(seg):
                t = m.group("target")
                if t.startswith(("#", "mailto:")) or re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", t):
                    continue
                path = unquote(t.split("#", 1)[0].split("?", 1)[0])
                if not path:
                    continue
                joined = path.lstrip("/") if path.startswith("/") else posixpath.join(file_reldir, path)
                out.append(posixpath.normpath(joined).rstrip("/") or ".")
    return out


_ISO_DAY_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")


def validate_index(text: str, is_root: bool) -> list:
    if not has_yaml_frontmatter(text):
        return []
    fm = read_frontmatter(text)
    if is_root and fm and set(fm) <= {"okf_version"}:
        return []
    return ["index.md must not carry frontmatter" + ("" if not is_root else " other than okf_version")]


def validate_log(text: str) -> list:
    heads = [l[3:].strip() for l in text.splitlines() if l.startswith("## ")]
    errs = [f"log heading not YYYY-MM-DD: {h[:40]!r}" for h in heads if not _ISO_DAY_RE.match(h)]
    days = [h for h in heads if _ISO_DAY_RE.match(h)]
    if days != sorted(days, reverse=True):
        errs.append("log dates not newest-first")
    return errs


def upgrade_frontmatter_v02(text: str, fallback_at: str | None = None):
    """OKF v0.1 -> v0.2 frontmatter, edited line-wise so every other line stays byte-identical.
    - `timestamp: X` -> `generated: { by: OKF_ACTOR, at: X }` (§13.1 breaking rename)
    - no timestamp/generated: add `generated` from `captured`, else from `fallback_at`
    - `status` mapped via STATUS_MAP (§5.4); `proposed` also keeps `decision_status: proposed`
    Returns (new_text, notes). Unknown status values are left as-is and reported in notes."""
    if not has_yaml_frontmatter(text):
        return text, []
    lines = text.splitlines(keepends=True)
    close = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if close is None:
        return text, []
    fm = read_frontmatter(text)
    notes, block = [], lines[1:close]
    nl = "\n"

    def gen_line(at):
        return f"generated: {{ by: {_scalar(OKF_ACTOR)}, at: {_scalar(at)} }}{nl}"

    out = []
    for line in block:
        m = re.match(r"^(timestamp|status):\s*(.*?)\s*$", line)
        if m and m.group(1) == "timestamp" and "generated" not in fm:
            out.append(gen_line(str(fm.get("timestamp") or m.group(2).strip('"\''))))
            continue
        if m and m.group(1) == "status":
            raw = str(fm.get("status", "")).strip()
            new = STATUS_MAP.get(raw.lower())
            if new is None:
                notes.append(f"unknown status {raw!r} left unchanged")
                out.append(line)
                continue
            if new != raw:
                out.append(f"status: {new}{nl}")
                if raw.lower() == "proposed" and "decision_status" not in fm:
                    out.append(f"decision_status: proposed{nl}")
                continue
        out.append(line)
    if "generated" not in fm and "timestamp" not in fm:
        at = to_iso8601(str(fm["captured"])) if fm.get("captured") else fallback_at
        if at:
            out.append(gen_line(at))
        else:
            notes.append("no date source for generated.at")
    new_text = lines[0] + "".join(out) + "".join(lines[close:])
    return new_text, notes
