"""Validate OKF conformance. Exit 1 on any failure.

Default: in-scope concept files only (legacy Phase A/B gate).
--strict: OKF v0.2 §11 over the whole bundle — every non-reserved .md has frontmatter with a
non-empty `type`; index.md carries no frontmatter (root may carry okf_version only); log.md
headings are YYYY-MM-DD, newest first. CLAUDE.md is a documented exclusion (agent instructions,
not knowledge) and is reported, not failed."""
import os
import sys
import okf_lib as okf
from okf_migrate import iter_md, iter_all_md

STRICT_EXCLUDED = {"CLAUDE.md"}


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    ap.add_argument("--strict", action="store_true")
    args = ap.parse_args()
    failures = checked = 0
    files = iter_all_md(args.root) if args.strict else iter_md(args.root)
    for full, rel in files:
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        base = os.path.basename(rel)
        if args.strict:
            if base in STRICT_EXCLUDED:
                print(f"EXCLUDED {rel}")
                continue
            if base == "index.md":
                errs = okf.validate_index(text, is_root=os.path.dirname(rel) == "")
            elif base == "log.md":
                errs = okf.validate_log(text)
            else:
                errs = okf.validate_text(text)
        else:
            if not okf.is_in_scope(text):
                continue
            errs = okf.validate_text(text)
        checked += 1
        for err in errs:
            failures += 1
            print(f"FAIL {rel}: {err}")
    print(f"\nchecked {checked} {'files (strict)' if args.strict else 'in-scope files'}, {failures} failures")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
