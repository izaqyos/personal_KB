"""Validate OKF conformance. Exit 1 on any failure.

Default: in-scope concept files only (legacy Phase A/B gate).
--strict: OKF v0.2 §11 over the whole bundle — every non-reserved .md has frontmatter with a
non-empty `type`; index.md carries no frontmatter (root may carry okf_version only); log.md
headings are YYYY-MM-DD, newest first. CLAUDE.md is a documented exclusion (agent instructions,
not knowledge) and is reported, not failed. Portable skill artifacts use their native schema."""
import os
import re
import sys

import yaml
import okf_lib as okf
from okf_migrate import iter_md, iter_all_md

STRICT_EXCLUDED = {"CLAUDE.md"}


def validate_skill_artifact(text: str, expected_name: str) -> list:
    """Validate native skill frontmatter without imposing the KB document schema."""
    match = re.match(r"^---\n(.*?)\n---(?:\n|$)", text, re.S)
    if not match:
        return ["missing native skill frontmatter"]
    try:
        data = yaml.safe_load(match.group(1))
    except yaml.YAMLError:
        return ["unparseable native skill frontmatter"]
    if not isinstance(data, dict):
        return ["skill frontmatter is not a mapping"]
    errors = []
    allowed = {"name", "description", "license", "allowed-tools", "metadata"}
    if set(data) - allowed:
        errors.append("unsupported native skill frontmatter field")
    name = data.get("name")
    if not isinstance(name, str) or not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", name) or len(name) > 64:
        errors.append("invalid skill name")
    elif name != expected_name:
        errors.append("skill name differs from directory")
    description = data.get("description")
    if not isinstance(description, str) or not description.strip() or len(description) > 1024:
        errors.append("missing/invalid skill description")
    return errors


def is_portable_skill(rel: str) -> bool:
    """Only direct installable entry points under the portable package use this schema."""
    parts = rel.replace(os.sep, "/").split("/")
    return len(parts) == 5 and parts[:3] == ["ai", "agents", "skills"] and parts[-1] == "SKILL.md"


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
            if is_portable_skill(rel):
                errs = validate_skill_artifact(text, os.path.basename(os.path.dirname(rel)))
            elif base in STRICT_EXCLUDED:
                print(f"EXCLUDED {rel}")
                continue
            elif base == "index.md":
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
