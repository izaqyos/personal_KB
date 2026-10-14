"""Find redundant / similar-named files in the KB and write an OKF review report.

Usage: python tools/kb_redundancy.py [ROOT] [--out docs/kb-review/redundancy.md]

Clusters tracked files by normalised name (same parent dir), plus top-level
folder-vs-file clusters (e.g. kb-cpp vs CPP/), plus a few hand-listed groups.
Pairs are scored (identical, containment, Jaccard) and a *proposed* action is
suggested.  Nothing is modified; the report is for human approval.
"""
import argparse
import hashlib
import html
import itertools
import os
import re
import subprocess
from collections import defaultdict

TEXT_EXT_STRIP = {".txt", ".back", ".bak", ".copy", ".html", ".htm", ".md", ".tex", ".pdf"}
SKIP_NAMES = {"index", "readme", "log", "claude", ".ds_store"}
JUNK_EXT = {".aux", ".dvi", ".toc"}

# Hand-listed groups whose names do not normalise together.  name -> glob-free path list.
MANUAL_GROUPS = {
    "vimrc set": ["vi/.vimrc", "vi/.vimrc-back", "vi/_vimrc", "vi/_vimrc_windows", "vi/vimrc.txt",
                  "vi/vimrc.html", "vi/.vimrc_cygwin", "vi/.vimrc_linux", "vi/.vimrc_lnx",
                  "linux/environment_files/.vimrc"],
    "unix-kb vs linux/KB_Linux": ["unix-kb", "linux/KB_Linux"],
    "ace vs network kb": ["Network/ACE/aceKB", "Network/NetworkKB"],
    "windows kbs": ["windows/kb-win", "windows/kb-windows", "windows-shortcuts/windows_kb"],
}


# Preferred base file per manual group (otherwise the largest text file).
MANUAL_BASE = {"vimrc set": "vi/.vimrc_linux"}
# Title tokens too generic to signal a same-topic pair.
TITLE_STOP = {"design", "the", "a", "an", "of", "and", "to", "in", "for", "with", "on", "guide", "notes", "interview",
              "knowledge", "base", "patterns", "phase", "implementation", "plan", "spec", "migration",
              "react", "typescript", "vite", "okf", "data", "structures"}


# Hand-reviewed decisions, keyed "A|B" or "A" (A = first file in the row).  Used by default;
# anything not listed falls back to the heuristic in propose().
REVIEWED = {
    "Network/ACE/aceKB": ("keep", "5% overlap with NetworkKB; ACE book outline plus a small cookbook (275 lines), becomes one note in P3"),
    "perl/KB_perl.back": ("delete perl/KB_perl.back", "99% of its lines are in KB_perl (the newer, 2x larger file)"),
    "vi/vi_tips": ("merge vi/vi_tips into vi/vi_tips_updated, then delete vi_tips",
                   "older (2006) edition of the same zzapper tips; ~25% of its lines are not in the 2007 edition"),
    "vi/.vimrc_lnx": ("delete vi/.vimrc_lnx", "99% contained in .vimrc_linux (near-duplicate)"),
    "linux/environment_files/.vimrc": ("delete linux/environment_files/.vimrc",
                                       "96% contained in vi/.vimrc_linux; uncertain: it sits with other dotfiles, confirm it is not an install source"),
    "vi/.vimrc": ("merge unique lines into vi/.vimrc_linux, then delete vi/.vimrc", "94% already in .vimrc_linux (older, smaller)"),
    "vi/_vimrc": ("delete vi/_vimrc (merge unique lines into _vimrc_windows first)",
                  "82% contained in _vimrc_windows; older Windows variant"),
    "vi/_vimrc_windows": ("keep both + rename (vimrc-windows)", "93% shared with the linux file; remaining ~7% is Windows-specific"),
    "vi/.vimrc_cygwin": ("keep both + rename (vimrc-cygwin)", "~87% shared with the linux file; platform variant; option: consolidate the three into one vimrc with has() switches"),
    "vi/.vimrc-back": ("delete vi/.vimrc-back",
                       "42-line backup snippet (cscope setup) with a former-employer project path; no portable knowledge; needs user OK"),
    "vi/vimrc.txt": ("delete vi/vimrc.txt", "83% of its lines are in vimrc.html (same third-party amix vimrc); keep the html"),
    "vi/vimrc.html": ("keep (third-party amix vimrc page)", "belongs under raw/third-party/ in P3, not a personal vimrc"),
    "dominions-kb-1-3": ("delete dominions-kb-1-3", "100% of its lines are in dominions-kb (older revision)"),
    "dominions-kb.html": ("keep both for now; review unique ~14% then delete or merge",
                          "86% of the html text is in dominions-kb; the rest may be markup rendering only"),
    "windows/kb-windows": ("merge windows/kb-windows and windows/kb-win into one file named windows/kb-windows",
                           "63%/80% mutual containment, near-equal size (two revisions of the same KB)"),
    "windows-shortcuts/windows_kb": ("keep both + rename (kebab-case)", "keyboard shortcuts only; distinct from kb-win/kb-windows"),
    "unix-kb": ("keep both (consider moving unix-kb under linux/)", "2% overlap: unix-kb is shell/grep recipes, KB_Linux is RPM/sysadmin"),
    "CPP/": ("keep both + rename (CPP/ -> kebab-case, or fold under kb-cpp/ after P3)",
             "1% overlap: kb-cpp is the main KB, CPP/ holds coding-rules, Threads_CPP and the perf paper"),
    "tools/": ("rename kb-tools -> kb-desktop-tools",
               "kb-tools is legacy desktop-tool notes (windows file mgmt, AV, IDEs); tools/ is the OKF script folder; update README row and KNOWLEDGE-CAPTURE routing"),
    "vi/search_n_replace_1": ("keep both + rename (search-and-replace-with-vi-part-1/2)",
                              "SunWorld column parts 1 and 2; only 9-15% overlap"),
    "vi/vi.htm": ("keep", "different content (HTML tutorial vs KB_vi)"),
    "vi/Vim_Tip_2.htm": ("keep", "distinct tip pages of a numbered series"),
    "vi/Vim_Tip_3.htm": ("keep", "distinct tip pages of a numbered series"),
    "CPP/cpp_performance_KB.pdf": ("keep", "LaTeX source (.tex) and its rendered .pdf; build artifacts removed separately"),
    "vi/vimqrc.pdf": ("keep", "html and pdf renditions of the Vim quick reference (third-party)"),
}


def normalise(name):
    """Normalised cluster key for a file or folder base name."""
    n = name.lower()
    changed = True
    while changed:
        changed = False
        base, ext = os.path.splitext(n)
        if ext in TEXT_EXT_STRIP and base:
            n, changed = base, True
    n = n.lstrip("._")
    n = re.sub(r"[\s_\-]+", "-", n)
    for pat in (r"-?1-3$", r"-?v2$", r"-?(updated|back|bak|copy)$", r"-\d+$"):
        n2 = re.sub(pat, "", n)
        if n2 != n and n2:
            n = n2
    n = re.sub(r"^kb-", "", n)
    n = re.sub(r"-kb$", "", n)
    if n == "kb":
        return n
    return n.strip("-")


def git_files(root):
    out = subprocess.run(["git", "ls-files", "-z"], cwd=root, capture_output=True, check=True).stdout
    return [p for p in out.decode("utf-8", "replace").split("\0") if p]


def last_change(root, paths):
    """Latest commit date (YYYY-MM-DD) among paths."""
    if not paths:
        return "?"
    r = subprocess.run(["git", "log", "-1", "--format=%cs", "--"] + list(paths), cwd=root,
                       capture_output=True, text=True)
    return r.stdout.strip() or "?"


def read_bytes(root, rel):
    # a path may be a directory: concatenate its tracked files (caller passes list)
    with open(os.path.join(root, rel), "rb") as f:
        return f.read()


def is_text(data):
    return b"\0" not in data[:4096]


class Item:
    """A file, or a folder treated as the union of its tracked files."""

    def __init__(self, root, rel, members):
        self.rel = rel
        self.members = members
        blobs = []
        for m in members:
            try:
                blobs.append(read_bytes(root, m))
            except OSError:
                pass
        self.data = b"".join(blobs)
        self.is_dir = members != [rel]
        self.text = is_text(self.data)
        self.sha = hashlib.sha1(self.data).hexdigest()
        if self.text:
            txt = self.data.decode("utf-8", "replace").replace("\r\n", "\n")
            if rel.lower().endswith((".html", ".htm")):
                txt = html.unescape(re.sub(r"<[^>]+>", "", txt))
            lines = txt.split("\n")
            self.nlines = len(lines)
            self.lineset = {l.strip() for l in lines if l.strip()}
        else:
            self.nlines = 0
            self.lineset = set()
        self.size = len(self.data)
        self.date = last_change(root, members)


def containment(a, b):
    if not a.lineset:
        return 0.0
    return len(a.lineset & b.lineset) / len(a.lineset)


def jaccard(a, b):
    u = a.lineset | b.lineset
    return len(a.lineset & b.lineset) / len(u) if u else 0.0


def propose(a, b):
    """Action suggestion for 'other' a relative to base b. Returns (action, reason)."""
    if a.sha == b.sha:
        return f"delete {a.rel}", "byte-identical to base"
    if not (a.text and b.text):
        return f"keep both", "binary/derived pair, not comparable by lines"
    ca, cb, j = containment(a, b), containment(b, a), jaccard(a, b)
    if ca >= 0.95:
        return f"delete {a.rel}", f"{ca:.0%} of its lines already in {b.rel}"
    if cb >= 0.95:
        return f"delete {b.rel}", f"{cb:.0%} of its lines already in {a.rel}"
    if j >= 0.5 or max(ca, cb) >= 0.6:
        return f"merge {a.rel} into {b.rel}", "substantial overlap, unique parts remain"
    return "keep both + rename", "different content; give distinct names"


def build_clusters(root, files):
    fileset = set(files)
    clusters = defaultdict(list)  # (parent, key) -> [rel]
    for rel in files:
        base = os.path.basename(rel)
        ext = os.path.splitext(base)[1].lower()
        if base.lower() == ".ds_store" or ext in JUNK_EXT:
            continue
        key = normalise(base)
        if key in SKIP_NAMES or not key:
            continue
        clusters[(os.path.dirname(rel), key)].append(rel)
    out = {}
    for (parent, key), rels in clusters.items():
        if len(rels) > 1:
            out[f"{parent + '/' if parent else ''}{key}"] = [(r, [r]) for r in sorted(rels)]
    # top-level folder-vs-file
    top = defaultdict(lambda: {"files": [], "dirs": {}})
    for rel in files:
        parts = rel.split("/")
        if len(parts) == 1:
            if parts[0].lower() != ".ds_store":
                top[normalise(parts[0])]["files"].append(rel)
        else:
            top[normalise(parts[0])]["dirs"].setdefault(parts[0], []).append(rel)
    for key, d in top.items():
        if key in SKIP_NAMES or not d["files"] and len(d["dirs"]) < 2:
            continue
        if (d["files"] and d["dirs"]) or len(d["dirs"]) > 1 or len(d["files"]) > 1:
            items = [(f, [f]) for f in sorted(d["files"])]
            items += [(dn + "/", sorted(ms)) for dn, ms in sorted(d["dirs"].items())]
            if len(items) > 1 and any(i[0].endswith("/") for i in items):
                out[f"top:{key}"] = items
    for name, paths in MANUAL_GROUPS.items():
        items = [(p, [p]) for p in paths if p in fileset]
        if len(items) > 1:
            out[f"manual:{name}"] = items
    manual_sets = [set(p for p, _ in v) for k, v in out.items() if k.startswith("manual:")]
    for k in [k for k, v in out.items() if not k.startswith("manual:")
              and any(set(p for p, _ in v) <= m for m in manual_sets)]:
        del out[k]
    return out


def title_similar_md(root, files):
    """Pairs of .md concepts with similar titles (token Jaccard >= 0.6) in different files."""
    import okf_lib
    titles = []
    for rel in files:
        if not rel.endswith(".md") or rel.startswith("docs/") or os.path.basename(rel) in ("index.md", "log.md", "CLAUDE.md"):
            continue
        try:
            fm = okf_lib.read_frontmatter(open(os.path.join(root, rel), encoding="utf-8").read())
        except Exception:
            fm = None
        t = None
        if isinstance(fm, dict):
            t = fm.get("title")
        elif isinstance(fm, tuple) and fm and isinstance(fm[0], dict):
            t = fm[0].get("title")
        if not t:
            t = os.path.splitext(os.path.basename(rel))[0].replace("-", " ")
        toks = {w for w in re.findall(r"[a-z0-9+#]+", str(t).lower()) if w not in TITLE_STOP}
        if toks and os.path.basename(rel) != "README.md":
            titles.append((rel, str(t), toks))
    res = []
    for (ra, ta, sa), (rb, tb, sb) in itertools.combinations(titles, 2):
        if os.path.dirname(ra) == os.path.dirname(rb) and os.path.basename(ra) == "README.md":
            continue
        j = len(sa & sb) / len(sa | sb)
        if j >= 0.6:
            ta_txt = open(os.path.join(root, ra), encoding="utf-8", errors="replace").read()
            tb_txt = open(os.path.join(root, rb), encoding="utf-8", errors="replace").read()
            linked = (os.path.basename(rb) in ta_txt) and (os.path.basename(ra) in tb_txt)
            res.append((j, ra, ta, rb, tb, linked))
    return sorted(res, reverse=True)


def report_rows(root, clusters, overrides):
    rows = []
    for cname in sorted(clusters):
        items = [Item(root, rel, members) for rel, members in clusters[cname]]
        base = max(items, key=lambda i: (i.text, i.nlines, i.size))
        mb = MANUAL_BASE.get(cname.replace("manual:", "", 1))
        if mb:
            base = next((i for i in items if i.rel == mb), base)
        texts = [i for i in items if i.text]
        if len(items) > 3 and all(max(containment(a, b), containment(b, a)) < 0.6
                                  for a, b in itertools.combinations(texts, 2)):
            if cname not in overrides:
                rows.append({
                    "cluster": cname, "files": f"{len(items)} files, e.g. `{items[0].rel}` .. `{items[-1].rel}`",
                    "identical": "no", "cont": "<60% pairwise", "jac": "low",
                    "sizes": f"{sum(i.size for i in items)}B total", "date": max(i.date for i in items),
                    "action": "keep", "reason": "numbered series of distinct parts (no pair overlaps)"})
                continue
        for o in items:
            if o is base:
                continue
            a, b = o, base
            ca, cb, j = containment(a, b), containment(b, a), jaccard(a, b)
            action, reason = propose(a, b)
            rv = {**REVIEWED, **overrides}
            for k in (f"{a.rel}|{b.rel}", a.rel):
                if k in rv:
                    action, reason = rv[k]
                    break
            rows.append({
                "cluster": cname, "files": f"`{a.rel}` vs `{b.rel}`",
                "identical": "yes" if a.sha == b.sha else "no",
                "cont": f"{ca:.0%} / {cb:.0%}" if a.text and b.text else "n/a",
                "jac": f"{j:.2f}" if a.text and b.text else "n/a",
                "sizes": f"{a.size}B/{a.nlines}L vs {b.size}B/{b.nlines}L",
                "date": max(a.date, b.date), "action": action, "reason": reason,
            })
        if len(items) <= 10:
            for a, b in itertools.combinations([i for i in items if i is not base], 2):
                rv0 = {**REVIEWED, **overrides}
                if not (a.text and b.text) or min(containment(a, b), containment(b, a)) < 0.8:
                    continue
                if a.rel in rv0 or b.rel in rv0:
                    continue  # already decided in the base rows
                if (a.rel, b.rel) != tuple(sorted((a.rel, b.rel))):
                    a, b = b, a
                rv = {**REVIEWED, **overrides}
                if f"{a.rel}|{b.rel}" in rv:
                    action, reason = rv[f"{a.rel}|{b.rel}"]
                else:
                    action, reason = "see base row; " + propose(a, b)[0], "extra pair with high overlap"
                    if a.rel in rv and "vimrc.txt" in a.rel:
                        continue
                rows.append({
                    "cluster": cname, "files": f"`{a.rel}` vs `{b.rel}` (non-base pair)",
                    "identical": "yes" if a.sha == b.sha else "no",
                    "cont": f"{containment(a, b):.0%} / {containment(b, a):.0%}",
                    "jac": f"{jaccard(a, b):.2f}",
                    "sizes": f"{a.size}B/{a.nlines}L vs {b.size}B/{b.nlines}L",
                    "date": max(a.date, b.date), "action": action, "reason": reason})
    return rows


def render(rows, similar, junk):
    def esc(s):
        return s.replace("|", "\\|")
    out = ["---", "type: review", 'title: "KB redundancy report (P2)"',
           "description: Clusters of similar-named or overlapping files with identical/containment/Jaccard metrics and a proposed action for each; awaiting approval.",
           'generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }', "status: draft", "---", "",
           "# KB redundancy report (P2)", "",
           "Generated by `tools/kb_redundancy.py`. Containment A->B is the share of A's non-blank lines found in B "
           "(A is the first file named in a row, B the larger one). Proposed actions are suggestions pending user approval.", "",
           "| cluster | files | identical? | containment A->B / B->A | Jaccard | sizes | last change | proposed action | reason |",
           "|---|---|---|---|---|---|---|---|---|"]
    for r in rows:
        out.append("| " + " | ".join(esc(str(r[k])) for k in
                   ("cluster", "files", "identical", "cont", "jac", "sizes", "date", "action", "reason")) + " |")
    out += ["", "## Junk (tracked build artifacts and OS files; removed in the same P2 commit)", ""]
    out += [f"- {j}" for j in junk] or ["- none"]
    out += ["", "## Same-topic markdown notes (title similarity)", ""]
    if similar:
        out += ["| similarity | note A | note B | proposed action |", "|---|---|---|---|"]
        for j, ra, ta, rb, tb, linked in similar:
            act = "keep both (already cross-linked)" if linked else "add mutual See Also, or merge if content overlaps"
            out.append(f"| {j:.2f} | `{ra}` ({esc(ta)}) | `{rb}` ({esc(tb)}) | {act} |")
    else:
        out.append("None found.")
    return "\n".join(out) + "\n"


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("root", nargs="?", default=".")
    ap.add_argument("--out", default="docs/kb-review/redundancy.md")
    ap.add_argument("--overrides", default=None, help="python file defining OVERRIDES={cluster:(action,reason)}")
    args = ap.parse_args(argv)
    root = os.path.abspath(args.root)
    files = [f for f in git_files(root) if os.path.exists(os.path.join(root, f))]
    overrides = {}
    if args.overrides:
        ns = {}
        exec(open(args.overrides).read(), ns)
        overrides = ns.get("OVERRIDES", {})
    clusters = build_clusters(root, files)
    rows = report_rows(root, clusters, overrides)
    junk = [f"`{f}`" for f in files if os.path.basename(f) == ".DS_Store"
            or os.path.splitext(f)[1] in JUNK_EXT]
    text = render(rows, title_similar_md(root, files), junk)
    out = os.path.join(root, args.out)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"{len(rows)} rows -> {args.out}")
    from collections import Counter
    print(dict(Counter(r["action"].split()[0] for r in rows)))


if __name__ == "__main__":
    main()
