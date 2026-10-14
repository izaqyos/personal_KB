"""P5b: propose related-but-unlinked note pairs for agents to judge.

Score = shared specific tags (generic content-kind tags ignored) + shared title words.
For each CURATED note (not under a legacy kb-* folder, not a third-party pointer) list its top-N
candidates among all notes; pairs already linked in either direction are skipped.
Curated notes with no inbound links come first.

  python tools/kb_related.py <out.md> [--top 5] [--root .]
"""
from __future__ import annotations

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import okf_lib as okf  # noqa: E402
import kb_backlinks as bl  # noqa: E402
from okf_migrate import iter_all_md  # noqa: E402

GENERIC = {"legacy", "third-party", "cheatsheet", "one-liners", "tutorial", "reference", "guide", "faq",
           "tips", "howto", "examples", "course-notes", "book-notes", "interview-prep",
           "troubleshooting", "glossary", "comparison", "primer", "case-study", "configuration-file"}
STOP = set("a an and the of for to in on with vs from by how what why your my notes guide kb part "
           "using use intro introduction overview basics legacy section".split())


def is_legacy(rel: str) -> bool:
    return bool(re.search(r"(^|/)kb-[^/]+/", rel))


def words(title: str) -> set:
    return {w for w in re.findall(r"[a-z0-9+#]+", title.lower()) if len(w) > 2 and w not in STOP}


def load(root: str) -> dict:
    out = {}
    for full, rel in iter_all_md(root):
        rel = rel.replace(os.sep, "/")
        if not bl.is_concept(rel):
            continue
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        fm = okf.read_frontmatter(text)
        tags = {str(t) for t in (fm.get("tags") or [])} - GENERIC
        out[rel] = {"title": str(fm.get("title") or rel), "tags": tags, "words": words(str(fm.get("title") or "")),
                    "links": bl.outgoing(text, rel), "third": "third-party" in (fm.get("tags") or [])}
    return out


def score(a: dict, b: dict) -> float:
    return 2.0 * len(a["tags"] & b["tags"]) + 1.0 * len(a["words"] & b["words"])


def candidates(notes: dict, top: int) -> list:
    inbound = {r: 0 for r in notes}
    for r, n in notes.items():
        for t in n["links"]:
            if t in inbound and t != r:
                inbound[t] += 1
    curated = [r for r, n in notes.items() if not is_legacy(r) and not n["third"]]
    rows = []
    for a in sorted(curated, key=lambda r: (inbound[r] > 0, r)):
        na = notes[a]
        scored = []
        for b, nb in notes.items():
            if b == a or b in na["links"] or a in nb["links"]:
                continue
            s = score(na, nb)
            if s >= 4.0 and len(na["tags"] & nb["tags"]) >= 2:
                scored.append((s, b))
        for s, b in sorted(scored, reverse=True)[:top]:
            rows.append((a, inbound[a], b, s, sorted(na["tags"] & notes[b]["tags"])))
    return rows


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("--top", type=int, default=5)
    ap.add_argument("--root", default=".")
    args = ap.parse_args()
    notes = load(args.root)
    rows = candidates(notes, args.top)
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write("| note (curated) | inbound | candidate | score | shared tags |\n|---|---|---|---|---|\n")
        for a, n, b, s, shared in rows:
            fh.write(f"| /{a} | {n} | /{b} | {s:.0f} | {', '.join(shared)} |\n")
    print(f"{len(rows)} candidate pairs for {len({r[0] for r in rows})} curated notes -> {args.out}")


if __name__ == "__main__":
    main()
