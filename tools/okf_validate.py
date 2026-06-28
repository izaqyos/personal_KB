"""Validate OKF conformance over in-scope KB files. Exit 1 on any failure."""
import sys
import okf_lib as okf
from okf_migrate import iter_md


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    args = ap.parse_args()
    failures = checked = 0
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        if not okf.is_in_scope(text):
            continue
        checked += 1
        for err in okf.validate_text(text):
            failures += 1
            print(f"FAIL {rel}: {err}")
    print(f"\nchecked {checked} in-scope files, {failures} failures")
    sys.exit(1 if failures else 0)


if __name__ == "__main__":
    main()
