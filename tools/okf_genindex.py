"""Generate per-directory index.md listing in-scope OKF concept files, plus links to
subdirectories so every level is reachable from the root index (progressive disclosure)."""
import os
import okf_lib as okf
from okf_migrate import iter_md

OKF_VERSION = "0.2"


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
        rel = rel.replace(os.sep, "/")
        d = os.path.dirname(rel)
        by_dir.setdefault(d, []).append(
            {"title": fm.get("title") or os.path.basename(rel),
             "path": "/" + rel, "description": fm.get("description")})
    for d, p in sorted(okf.index_plan(by_dir).items()):
        body = okf.generate_index_v2(d or "(root)", p["concepts"], p["subdirs"])
        if not d:
            body = f'---\nokf_version: "{OKF_VERSION}"\n---\n' + body
        with open(os.path.join(args.root, d, "index.md"), "w", encoding="utf-8") as fh:
            fh.write(body)
        print(f"index.md ({len(p['concepts'])} concepts, {len(p['subdirs'])} subdirs) -> {d or '(root)'}")


if __name__ == "__main__":
    main()
