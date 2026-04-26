# Aho-Corasick

- **Source:** distilled from CP patterns + classic references
- **Author:** Yosi Izaq
- **Captured:** 2026-04-23
- **Status:** complete
- **Type:** concept

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

## When to Use

- Search for **many patterns** (`k` patterns of total length `M`) in one or more texts — all occurrences, in one pass.
- Building a multi-pattern scanner: intrusion detection, profanity filter, DNA motif search, biology, plagiarism detection.
- Real-time streaming text inspection with a fixed pattern set.

One preprocessing pass builds the trie and fail links; then each character of text does `O(1)` amortized work.

## Interview View

### Build the automaton

```python
from collections import deque

class AhoCorasick:
    def __init__(self):
        self.goto = [{}]         # trie children
        self.out = [[]]          # patterns ending at this node (index list)
        self.fail = [0]

    def add(self, pattern, idx):
        node = 0
        for ch in pattern:
            if ch not in self.goto[node]:
                self.goto.append({})
                self.out.append([])
                self.fail.append(0)
                self.goto[node][ch] = len(self.goto) - 1
            node = self.goto[node][ch]
        self.out[node].append(idx)

    def build(self):
        q = deque()
        # Level 1: fail links go to root
        for ch, nxt in list(self.goto[0].items()):
            self.fail[nxt] = 0
            q.append(nxt)
        while q:
            u = q.popleft()
            for ch, v in self.goto[u].items():
                # fail link of v = walk fail from u until we find a transition on ch
                f = self.fail[u]
                while f and ch not in self.goto[f]:
                    f = self.fail[f]
                self.fail[v] = self.goto[f].get(ch, 0) if f != 0 or ch in self.goto[0] else 0
                if self.fail[v] == v:
                    self.fail[v] = 0
                # merge output links from fail
                self.out[v].extend(self.out[self.fail[v]])
                q.append(v)

    def search(self, text):
        node = 0
        matches = []
        for i, ch in enumerate(text):
            while node and ch not in self.goto[node]:
                node = self.fail[node]
            node = self.goto[node].get(ch, 0)
            for pat_idx in self.out[node]:
                matches.append((i, pat_idx))
        return matches
```

### Usage

```python
ac = AhoCorasick()
patterns = ["he", "she", "his", "hers"]
for i, p in enumerate(patterns):
    ac.add(p, i)
ac.build()
print(ac.search("ahishers"))
# [(3, 2), (5, 0), (7, 3), (7, 0)]  (position, pattern_index)
```

### Classic problems

| Problem | Use |
|---|---|
| Find occurrences of `k` patterns in text | core |
| Replace all of many keywords | core |
| Longest valid subsequence built from patterns | AC + DP |
| Count occurrences of dictionary words in string | core |
| Street fighter / profanity filter | core |
| Virus signature detection | core |
| DNA motif search | core |

## Reference View

### What AC adds over a trie

A trie matches a pattern only if the text starts at a trie-root. AC adds **fail links** so that after reading a character that doesn't extend the current trie path, we jump to the next-longest prefix of some pattern that's a suffix of what we've read. This turns a tree into an automaton — one deterministic transition per input character.

### Fail link structure

For each node `v`:

- **fail[v]** — longest proper suffix of the string at `v` that's also a prefix of some pattern.
- **out[v]** — patterns ending at `v`, merged with those along the fail-chain (so you can list all matches at `v` without walking the chain again).

Computed via BFS layer by layer, because `fail` of a child depends on `fail` of its parent.

### Variants

- **Goto function with implicit transitions** — materialize all transitions (even via fail chains) to get a strict DFA with `O(1)` per character without `while` loops. Space is `O(M · σ)` where `σ` is alphabet size.
- **Generalized suffix automaton** — supports substring queries, not just exact prefix matches. More general but more complex.
- **Aho-Corasick on the reverse** — for certain palindrome / rotation variants.

### Complexity

| Step | Time | Space |
|---|---|---|
| Build trie + fail links | `O(M · σ)` or `O(M + k·σ)` | `O(M · σ)` |
| Search | `O(n + z)` where `z` = number of matches | `O(M · σ)` |

`M` = total length of patterns, `k` = number of patterns, `n` = text length.

### Pitfalls

- **Memory blowup** — each trie node stores up to `σ` children. For large alphabets (Unicode), use dicts — slower per-char but bounded memory.
- **Fail links of level-1 nodes** — all go to root. Special-case or handle in the BFS.
- **Output merging** — without merging outputs into `out[v]`, you'd walk the fail chain per match → potentially `O(n · max_depth)`.
- **Unicode** — work over codepoints; but be consistent with normalization (NFC vs NFD).
- **Preprocessing cost** — if your pattern set is small and static, preprocessing can be expensive relative to naive scanning.
- **Overlap handling** — AC reports all matches, including overlapping ones (`"he"` and `"she"` both match `"she"`). If you want non-overlapping, post-process.

### Real-world uses

- **Snort / Suricata intrusion detection** — signature matching over network packets.
- **ClamAV antivirus** — Aho-Corasick variant scans files for signature matches.
- **fgrep** — multi-pattern search.
- **Keyword highlighters in editors / IDEs** — fast multi-keyword scanning.
- **Chat / content moderation** — profanity and phrase-list filtering at streaming throughput.
- **DNA motif scanning** — search for many motifs in gigabases.
- **Log analysis — search for many error signatures** simultaneously.
- **Search engine query suggestion** — match user query against a dictionary of completions.

### When *not* to use

- You have only one (or very few) patterns → KMP / Rabin-Karp / Boyer-Moore is simpler.
- Pattern set changes per query → preprocessing cost isn't amortized; use hashing.
- You need approximate matching → bit-parallel algorithms or fuzzy matching.
- Memory is tight with a large alphabet — map characters to small indices first.

## See Also

- [`pattern-matching.md`](pattern-matching.md) — single-pattern alternatives.
- [`z-algorithm.md`](z-algorithm.md) — simpler multi-pass alternative for single patterns.
- [`suffix-structures.md`](suffix-structures.md) — when text is fixed, patterns vary.
- [`../../data-structures/trees/trie.md`](../../data-structures/trees/trie.md) — backbone DS.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
