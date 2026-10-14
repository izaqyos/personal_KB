"""P5a: maintain a managed backlinks block in every concept note.

For every concept->concept link A -> B where B does not link back to A (outside the managed block),
B gets a bullet `* [A title](/A.md)` inside:

    <!-- backlinks:start -->
    ### Backlinks

    * [A title](/a.md)
    <!-- backlinks:end -->

The block lives at the end of the note, under the note's existing `## See Also` heading if it has one,
otherwise under a new `## See Also` heading. Idempotent: the block is recomputed from scratch on every
run, text outside the markers is never touched, and links inside the block are ignored when computing.

  python tools/kb_backlinks.py [--root .] [--dry-run]
"""
from __future__ import annotations

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import okf_lib as okf  # noqa: E402
from okf_migrate import iter_all_md  # noqa: E402

START, END = "<!-- backlinks:start -->", "<!-- backlinks:end -->"
BLOCK_RE = re.compile(r"\n*" + re.escape(START) + r".*?" + re.escape(END) + r"\n?", re.S)
SKIP_BASENAMES = {"index.md", "log.md", "README.md", "CLAUDE.md"}
SKIP_PREFIXES = ("raw/", "docs/", "tools/")


def is_concept(rel: str) -> bool:
    return os.path.basename(rel) not in SKIP_BASENAMES and not rel.startswith(SKIP_PREFIXES)


def strip_block(text: str) -> str:
    return BLOCK_RE.sub("\n", text).rstrip("\n") + "\n"


def outgoing(text: str, rel: str) -> set:
    reldir = os.path.dirname(rel)
    return {t for t in okf.extract_internal_links(strip_block(text), reldir) if t.endswith(".md")}


def render_block(sources: list) -> str:
    lines = [START, "### Backlinks", ""] + [f"* [{title}](/{path})" for title, path in sources] + [END]
    return "\n".join(lines)


def with_block(text: str, sources: list) -> str:
    base = strip_block(text)
    if not sources:
        return base
    head = "" if re.search(r"(?m)^## See Also\s*$", base) else "\n## See Also\n"
    return base + head + "\n" + render_block(sources) + "\n"


def compute(root: str) -> dict:
    """-> {rel: (text, [ (title, src_rel), ... ])} for every concept note."""
    notes, titles, links = {}, {}, {}
    for full, rel in iter_all_md(root):
        rel = rel.replace(os.sep, "/")
        if not is_concept(rel):
            continue
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        notes[rel] = text
        titles[rel] = str(okf.read_frontmatter(text).get("title") or os.path.basename(rel))
        links[rel] = outgoing(text, rel)
    incoming = {r: set() for r in notes}
    for a, outs in links.items():
        for b in outs:
            if b in notes and b != a and a not in links[b]:
                incoming[b].add(a)
    return {r: (notes[r], sorted(((titles[a], a) for a in incoming[r]), key=lambda x: x[0].lower()))
            for r in notes}


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", default=".")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    changed = added = 0
    for rel, (text, sources) in sorted(compute(args.root).items()):
        new = with_block(text, sources)
        if new != text:
            changed += 1
            added += len(sources)
            if not args.dry_run:
                with open(os.path.join(args.root, rel), "w", encoding="utf-8") as fh:
                    fh.write(new)
    print(f"{changed} notes {'would change' if args.dry_run else 'updated'}; {added} backlinks in blocks")


if __name__ == "__main__":
    main()
