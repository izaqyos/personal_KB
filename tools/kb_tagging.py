"""P4 helper: digest notes for tagging agents, and apply their results to frontmatter.

  python tools/kb_tagging.py digest <out_dir> [--chunk 180]
      Writes <out_dir>/chunk-NN.jsonl: one {"path", "title", "type", "tags", "headings", "head"} per
      concept note (index.md/log.md/CLAUDE.md and raw/ excluded). "head" = first ~25 non-blank
      content lines (fence markers dropped), so an agent can tag without opening the file.

  python tools/kb_tagging.py apply <results.json> [--vocab tools/tags.yaml] [--dry-run]
      results.json = {"<path>": {"description": "...", "tags": ["a", "b"]}, ...}
      Sets `description` and `tags` in each note's frontmatter (other keys untouched, body untouched).
      Tags must exist in the vocabulary; unknown tags are dropped and reported. Descriptions are
      trimmed to one line, <= 200 chars.
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys

import yaml

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import okf_lib as okf  # noqa: E402
from okf_migrate import iter_all_md  # noqa: E402

SKIP_BASENAMES = {"index.md", "log.md", "CLAUDE.md"}


def load_vocab(path: str) -> set:
    """tags.yaml: {group: [tag, ...], ...} -> flat set of tags."""
    data = yaml.safe_load(open(path, encoding="utf-8")) or {}
    out = set()
    for v in data.values():
        out.update(str(t) for t in (v or []))
    return out


def split_frontmatter(text: str):
    """-> (frontmatter_lines, body) ; frontmatter_lines excludes the --- fences."""
    if not okf.has_yaml_frontmatter(text):
        return None, text
    lines = text.split("\n")
    close = next((i for i in range(1, len(lines)) if lines[i].strip() == "---"), None)
    if close is None:
        return None, text
    return lines[1:close], "\n".join(lines[close + 1:])


def digest_note(text: str, max_head: int = 25) -> dict:
    fm = okf.read_frontmatter(text)
    _, body = split_frontmatter(text)
    headings, head = [], []
    for line in body.split("\n"):
        s = line.strip()
        if s.startswith("#"):
            if len(headings) < 15:
                headings.append(s[:120])
            continue
        if not s or s.startswith(("```", "~~~", "[↑")):
            continue
        if len(head) < max_head:
            head.append(s[:160])
    return {"title": fm.get("title"), "type": fm.get("type"), "tags": fm.get("tags") or [],
            "headings": headings, "head": head}


def set_fields(text: str, description: str | None, tags: list | None) -> str:
    """Replace/insert `description` and `tags` lines in the frontmatter; everything else byte-identical."""
    fm_lines, body = split_frontmatter(text)
    if fm_lines is None:
        raise ValueError("no frontmatter")
    new = []
    for line in fm_lines:
        if description is not None and re.match(r"^description\s*:", line):
            continue
        if tags is not None and re.match(r"^tags\s*:", line):
            continue
        new.append(line)
    # insert after title (or after type) to keep the OKF key order readable
    anchor = next((i for i, l in enumerate(new) if re.match(r"^title\s*:", l)), None)
    if anchor is None:
        anchor = next((i for i, l in enumerate(new) if re.match(r"^type\s*:", l)), -1)
    ins = []
    if description is not None:
        ins.append(f"description: {okf._scalar(description)}")
    if tags is not None:
        ins.append("tags: [" + ", ".join(okf._scalar(t) for t in tags) + "]")
    new[anchor + 1:anchor + 1] = ins
    return "---\n" + "\n".join(new) + "\n---\n" + body


def clean_description(d: str) -> str:
    d = " ".join(str(d).split())
    return d if len(d) <= 200 else d[:197].rstrip() + "..."


def cmd_digest(root: str, out_dir: str, chunk: int) -> None:
    os.makedirs(out_dir, exist_ok=True)
    rows = []
    for full, rel in iter_all_md(root):
        rel = rel.replace(os.sep, "/")
        if os.path.basename(rel) in SKIP_BASENAMES or rel.startswith(("raw/", "tools/")):
            continue
        with open(full, encoding="utf-8") as fh:
            d = digest_note(fh.read())
        d["path"] = rel
        rows.append(d)
    rows.sort(key=lambda r: r["path"])
    for n in range(0, len(rows), chunk):
        with open(os.path.join(out_dir, f"chunk-{n // chunk:02d}.jsonl"), "w", encoding="utf-8") as fh:
            for r in rows[n:n + chunk]:
                fh.write(json.dumps(r, ensure_ascii=False) + "\n")
    print(f"{len(rows)} notes -> {(len(rows) + chunk - 1) // chunk} chunks in {out_dir}")


def cmd_apply(root: str, results: str, vocab_path: str, dry: bool) -> int:
    vocab = load_vocab(vocab_path)
    data = json.load(open(results, encoding="utf-8"))
    changed = unknown_total = missing = 0
    for rel, v in sorted(data.items()):
        full = os.path.join(root, rel)
        if not os.path.exists(full):
            print(f"MISSING {rel}")
            missing += 1
            continue
        tags = [str(t).strip().lower() for t in (v.get("tags") or [])]
        unknown = [t for t in tags if t not in vocab]
        tags = list(dict.fromkeys(t for t in tags if t in vocab))
        if unknown:
            unknown_total += len(unknown)
            print(f"UNKNOWN-TAGS {rel}: {unknown}")
        desc = clean_description(v["description"]) if v.get("description") else None
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        new = set_fields(text, desc, tags or None)
        if new != text:
            changed += 1
            if not dry:
                with open(full, "w", encoding="utf-8") as fh:
                    fh.write(new)
    print(f"{changed} notes {'would change' if dry else 'updated'}; {unknown_total} unknown tags dropped; {missing} missing paths")
    return 1 if missing else 0


def main() -> None:
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    d = sub.add_parser("digest")
    d.add_argument("out_dir")
    d.add_argument("--chunk", type=int, default=180)
    d.add_argument("--root", default=".")
    a = sub.add_parser("apply")
    a.add_argument("results")
    a.add_argument("--vocab", default="tools/tags.yaml")
    a.add_argument("--root", default=".")
    a.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    if args.cmd == "digest":
        cmd_digest(args.root, args.out_dir, args.chunk)
    else:
        sys.exit(cmd_apply(args.root, args.results, args.vocab, args.dry_run))


if __name__ == "__main__":
    main()
