"""Rewrite relative markdown links to '/'-absolute (Phase B) and check that
every '/'-absolute link resolves to a real file.

Rewrite scope = iter_md (content files; reserved README/index/log/CLAUDE excluded,
so those stay GitHub-clickable). Check scope = all .md incl. reserved (validates
generated index.md links too). Both are fence-aware via okf_lib.
"""
import argparse
import os
import sys
import okf_lib as okf
from okf_migrate import iter_md


def rewrite(root: str) -> int:
    changed = 0
    for full, rel in iter_md(root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        reldir = os.path.dirname(rel).replace(os.sep, "/")
        new = okf.rewrite_links(text, reldir)
        if new != text:
            changed += 1
            print(f"[REWRITE] {rel}")
            with open(full, "w", encoding="utf-8") as fh:
                fh.write(new)
    print(f"\n{changed} files rewritten")
    return 0


def check(root: str) -> int:
    broken = 0
    for full, rel in iter_md(root, include_reserved=True):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        for target in okf.extract_absolute_links(text):
            if not os.path.exists(os.path.join(root, target.lstrip("/"))):
                broken += 1
                print(f"BROKEN {rel} -> {target}")
    print(f"\n{broken} broken '/'-absolute link(s)")
    return 1 if broken else 0


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--rewrite", action="store_true")
    g.add_argument("--check", action="store_true")
    args = ap.parse_args()
    sys.exit(rewrite(args.root) if args.rewrite else check(args.root))


if __name__ == "__main__":
    main()
