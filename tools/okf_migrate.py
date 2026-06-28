"""Inject OKF YAML frontmatter into in-scope KB files. Idempotent."""
import argparse, os
import okf_lib as okf

EXCLUDE_DIRS = {".git", "raw", ".venv", "node_modules"}
EXCLUDE_PREFIXES = ("docs/superpowers/",)
RESERVED = {"README.md", "index.md", "log.md"}


def iter_md(root):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d not in EXCLUDE_DIRS]
        for fn in filenames:
            if not fn.endswith(".md") or fn in RESERVED:
                continue
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, root)
            if any(rel.startswith(p) for p in EXCLUDE_PREFIXES):
                continue
            yield full, rel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()
    changed = skipped = 0
    hist = {}
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        if not okf.is_in_scope(text):
            continue
        fm = okf.build_frontmatter(rel, text)
        hist[fm["type"]] = hist.get(fm["type"], 0) + 1
        new = okf.inject_frontmatter(text, fm)
        if new == text:
            skipped += 1
            continue
        changed += 1
        print(f"[{'DRY' if args.dry_run else 'WRITE'}] {rel}  type={fm['type']}")
        if not args.dry_run:
            with open(full, "w", encoding="utf-8") as fh:
                fh.write(new)
    print(f"\n{changed} changed, {skipped} already-conformant. type histogram: {hist}")


if __name__ == "__main__":
    main()
