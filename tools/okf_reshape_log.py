"""Normalize a KB log (legacy and/or OKF entries) into OKF newest-first form.
Writes <path>.okf for review."""
import argparse
import okf_lib as okf


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    args = ap.parse_args()
    with open(args.path, encoding="utf-8") as fh:
        text = fh.read()
    out = okf.normalize_log(text)
    with open(args.path + ".okf", "w", encoding="utf-8") as fh:
        fh.write(out)
    print(f"wrote {args.path}.okf ({len(okf.parse_log(text))} entries) — review, then mv over the original")


if __name__ == "__main__":
    main()
