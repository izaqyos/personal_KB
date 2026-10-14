"""Rewrite relative markdown links to '/'-absolute (Phase B) and check that
every internal link (absolute or relative) resolves to a real file, case-sensitively.

Rewrite scope = iter_md (content files; reserved README/index/log/CLAUDE excluded,
so those stay GitHub-clickable). Check scope = every bundle .md (iter_all_md),
including READMEs, index.md, log.md and docs/. Both are fence-aware via okf_lib.
"""
import argparse
import os
import sys
import okf_lib as okf
from okf_migrate import iter_md, iter_all_md


# Relative links stay relative here: GitHub renders README.md as the folder landing page and
# resolves its relative links; docs/superpowers are historical design records.
NO_REWRITE_BASENAMES = {"README.md"}
NO_REWRITE_PREFIXES = ("docs/superpowers/",)


def rewrite(root: str) -> int:
    changed = 0
    for full, rel in iter_md(root):
        if os.path.basename(rel) in NO_REWRITE_BASENAMES or rel.startswith(NO_REWRITE_PREFIXES):
            continue
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


def exists_exact_case(root: str, relpath: str, _cache={}) -> bool:
    """os.path.exists, but case-sensitive even on macOS/Windows (GitHub is case-sensitive)."""
    cur = root
    for part in relpath.split("/"):
        if part in (".", ""):
            continue
        if part == "..":
            cur = os.path.dirname(cur)
            continue
        if cur not in _cache:
            try:
                _cache[cur] = set(os.listdir(cur))
            except OSError:
                return False
        if part not in _cache[cur]:
            return False
        cur = os.path.join(cur, part)
    return True


def check(root: str) -> int:
    """Every internal link (absolute and relative) in every bundle .md resolves, case-sensitively."""
    broken = 0
    for full, rel in iter_all_md(root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        reldir = os.path.dirname(rel).replace(os.sep, "/")
        for target in okf.extract_internal_links(text, reldir):
            if not exists_exact_case(root, target):
                broken += 1
                print(f"BROKEN {rel} -> {target}")
    print(f"\n{broken} broken internal link(s)")
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
