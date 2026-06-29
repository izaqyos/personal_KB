"""Generate per-directory index.md listing in-scope OKF concept files."""
import os
import okf_lib as okf
from okf_migrate import iter_md


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("root")
    args = ap.parse_args()
    by_dir = {}
    for full, rel in iter_md(args.root):
        with open(full, encoding="utf-8") as fh:
            text = fh.read()
        fm = okf.read_frontmatter(text)
        if not fm.get("type"):
            continue
        d = os.path.dirname(full)
        abspath = "/" + rel.replace(os.sep, "/")
        by_dir.setdefault(d, []).append(
            {"title": fm.get("title") or os.path.basename(rel),
             "path": abspath, "description": fm.get("description")})
    for d, entries in by_dir.items():
        entries.sort(key=lambda e: e["title"].lower())
        title = os.path.relpath(d, args.root)
        title = "(root)" if title == "." else title
        body = okf.generate_index(title, entries)
        if os.path.abspath(d) == os.path.abspath(args.root):
            body = '---\nokf_version: "0.1"\n---\n' + body
        with open(os.path.join(d, "index.md"), "w", encoding="utf-8") as fh:
            fh.write(body)
        print(f"index.md ({len(entries)} entries) -> {title}")


if __name__ == "__main__":
    main()
