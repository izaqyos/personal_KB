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
