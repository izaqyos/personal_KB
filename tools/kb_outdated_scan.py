"""P6 pre-triage: flag notes with likely-outdated content via heuristics (agents verify with sources).

  python tools/kb_outdated_scan.py <out.md> [--root .] [--min 2]

Each rule is (id, regex, why, modern hint). A note's score = number of distinct rules hit, weighted
by hit counts (capped). Notes scoring >= --min are listed, highest first, with per-rule counts and the
first matching line number, so a triage agent can jump straight to the evidence.
"""
from __future__ import annotations

import argparse
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import kb_backlinks as bl  # noqa: E402
from okf_migrate import iter_all_md  # noqa: E402

RULES = [
    ("py2-print", r"^\s*print\s+[\"'%\w]", "Python 2 print statement", "print() function (Python 3)"),
    ("py2-except", r"except\s+\w+(\.\w+)*\s*,\s*\w+\s*:", "Python 2 `except E, e:`", "`except E as e:`"),
    ("py2-api", r"\b(raw_input|xrange|urllib2|iteritems|itervalues|has_key|cPickle|ConfigParser\b|StringIO\.StringIO|unicode\()", "Python 2-only API", "Python 3 equivalents"),
    ("py2-version", r"(?i)\bpython\s*2\.[0-7]\b", "targets Python 2 (EOL 2020)", "Python 3.12+"),
    ("cpp-legacy", r"std::auto_ptr|bind1st|bind2nd|std::random_shuffle|\bregister\s+int\b|boost::shared_ptr", "removed/deprecated C++ API", "unique_ptr/shared_ptr, lambdas, std::shuffle (C++17+)"),
    ("js-legacy", r"\b(bower|grunt|gulpfile|tslint|require\(['\"]request['\"]\)|moment\(|\$\.ajax|var\s+self\s*=\s*this)", "superseded JS tooling/API", "npm/pnpm, ESLint, fetch/axios, Temporal/date-fns, arrow functions"),
    ("node-old", r"(?i)\bnode(\.js)?\s*v?(0\.\d+|[4-9]|1[0-6])(\.\d+)+\b", "old Node.js major (EOL)", "Node 22/24 LTS"),
    ("java-old", r"(?i)\b(jdk\s*1\.[3-8]|java\s*(se\s*)?[5-8]\b|j2ee|applet)", "old Java version/API", "Java 21 LTS"),
    ("net-tools", r"(?m)^\s*(sudo\s+)?(ifconfig|netstat|route\s+(add|del)|arp\s+-)", "deprecated net-tools", "ip / ss (iproute2)"),
    ("sysv-init", r"(?m)\b(service\s+\w+\s+(start|stop|restart)|/etc/init\.d/\w+\s+(start|stop)|chkconfig)\b", "SysV init commands", "systemctl (systemd)"),
    ("apt-key", r"\bapt-key\s+add\b", "apt-key is deprecated", "signed-by keyrings in /etc/apt/keyrings"),
    ("weak-crypto", r"(?i)\b(sslv2|sslv3|tls\s*1\.0|tlsv1\b|rc4|des-cbc|3des|md5\s+(signature|hash|cert)|sha-?1\s+(cert|signature))", "weak/obsolete crypto", "TLS 1.2/1.3, AES-GCM/ChaCha20, SHA-256+"),
    ("eol-os", r"(?i)\b(windows\s*(2000|2k|xp|vista|7)|win2k|centos\s*[5-7]|ubuntu\s*1[0-6]\.04|mac\s*os\s*x\s*10\.[0-9]\b)", "EOL operating system", "current OS versions"),
    ("vim-legacy", r"(?i)\b(pathogen|vundle|syntastic|neocomplcache|neocomplete)\b", "superseded Vim plugin", "native packages / vim-plug, ALE / LSP"),
    ("svn-cvs", r"(?m)^\s*(svn|cvs)\s+(co|checkout|commit|update)\b", "old VCS workflow", "git"),
    ("py-setup", r"python\s+setup\.py\s+(install|develop)|easy_install", "deprecated Python packaging", "pip / uv / pyproject.toml"),
]
RX = [(i, re.compile(p), why, hint) for i, p, why, hint in RULES]


def scan_text(text: str) -> dict:
    hits = {}
    for n, line in enumerate(text.split("\n"), 1):
        for rid, rx, _, _ in RX:
            if rx.search(line):
                h = hits.setdefault(rid, [0, n])
                h[0] += 1
    return hits


def score(hits: dict) -> float:
    return sum(1 + min(c, 10) / 10 for c, _ in hits.values())


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("out")
    ap.add_argument("--root", default=".")
    ap.add_argument("--min", type=float, default=1.0)
    args = ap.parse_args()
    rows = []
    for full, rel in iter_all_md(args.root):
        rel = rel.replace(os.sep, "/")
        if not bl.is_concept(rel):
            continue
        with open(full, encoding="utf-8") as fh:
            hits = scan_text(fh.read())
        if hits and score(hits) >= args.min:
            rows.append((score(hits), rel, hits))
    rows.sort(key=lambda r: (-r[0], r[1]))
    why = {i: (w, h) for i, _, w, h in RX}
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write("| score | note | signals (rule: count @first line) |\n|---|---|---|\n")
        for s, rel, hits in rows:
            sig = "; ".join(f"{rid}: {c} @L{first}" for rid, (c, first) in sorted(hits.items()))
            fh.write(f"| {s:.1f} | /{rel} | {sig} |\n")
        fh.write("\n## Rules\n\n| rule | why outdated | modern equivalent |\n|---|---|---|\n")
        for rid, (w, h) in why.items():
            fh.write(f"| {rid} | {w} | {h} |\n")
    print(f"{len(rows)} notes flagged -> {args.out}")


if __name__ == "__main__":
    main()
