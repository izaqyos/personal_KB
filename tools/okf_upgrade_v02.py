"""Upgrade concept frontmatter from OKF v0.1 to v0.2 (generated/status), idempotent.
generated.at fallback for files with no timestamp/captured = the file's last commit date on
--ref (default main). Usage: python tools/okf_upgrade_v02.py . [--dry-run]"""
import argparse
import os
import subprocess
import okf_lib as okf
from okf_migrate import iter_all_md

SKIP = {"index.md", "log.md", "CLAUDE.md"}


def last_commit_iso(root, rel, ref):
    out = subprocess.run(["git", "-C", root, "log", "-1", "--format=%cI", ref, "--", rel],
                         capture_output=True, text=True).stdout.strip()
    return out or None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--ref", default="main")
    args = ap.parse_args()
    changed = 0
    for full, rel in iter_all_md(args.root):
        if os.path.basename(rel) in SKIP:
            continue
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        fallback = last_commit_iso(args.root, rel, args.ref)
        new, notes = okf.upgrade_frontmatter_v02(text, fallback_at=fallback)
        for n in notes:
            print(f"NOTE {rel}: {n}")
        if new != text:
            changed += 1
            print(f"[{'DRY' if args.dry_run else 'WRITE'}] {rel}")
            if not args.dry_run:
                with open(full, "w", encoding="utf-8") as fh:
                    fh.write(new)
    print(f"\n{changed} files upgraded")


if __name__ == "__main__":
    main()
