"""Pure helpers for OKF migration of the personal KB. No file I/O in this module."""
from __future__ import annotations
import re
import posixpath

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
    fm["status"] = bq.get("status") or "Active"
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
