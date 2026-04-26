# Pattern Matching (KMP, Rabin-Karp, Boyer-Moore)

- **Source:** distilled from CLRS + CP patterns
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

- Find occurrences of a pattern `P` (length `m`) in a text `T` (length `n`).
- Multiple patterns → Aho-Corasick (see [`aho-corasick.md`](aho-corasick.md)).
- Approximate matching → Z-algo + LCP or edit-distance DP.
- Single fixed pattern, large text, one pass: KMP is the reliable default.

Beyond `str.find`: worth implementing when you want provable bounds, multi-pattern matching, or you're building higher-level tools (regex engines, greps, text indexes).

## Interview View

### KMP — compute failure function and scan

```python
def kmp_failure(p):
    """fail[i] = length of longest proper prefix of p[:i+1] that's also a suffix."""
    fail = [0] * len(p)
    k = 0
    for i in range(1, len(p)):
        while k > 0 and p[k] != p[i]:
            k = fail[k - 1]
        if p[k] == p[i]:
            k += 1
        fail[i] = k
    return fail

def kmp_search(t, p):
    if not p: return [0]
    fail = kmp_failure(p)
    out = []
    q = 0
    for i, ch in enumerate(t):
        while q > 0 and p[q] != ch:
            q = fail[q - 1]
        if p[q] == ch:
            q += 1
        if q == len(p):
            out.append(i - len(p) + 1)
            q = fail[q - 1]
    return out
```

`O(n + m)` time, `O(m)` extra space. Always.

### Rabin-Karp — rolling hash

```python
def rabin_karp(t, p, base=257, mod=(1 << 61) - 1):
    n, m = len(t), len(p)
    if m > n: return []
    ph = 0; th = 0; h = 1
    for _ in range(m - 1):
        h = (h * base) % mod
    for i in range(m):
        ph = (ph * base + ord(p[i])) % mod
        th = (th * base + ord(t[i])) % mod
    out = []
    for i in range(n - m + 1):
        if ph == th and t[i:i+m] == p:     # verify to reject false collisions
            out.append(i)
        if i < n - m:
            th = ((th - ord(t[i]) * h) * base + ord(t[i+m])) % mod
    return out
```

`O(n + m)` expected. Great for multi-pattern search by hashing all patterns and checking every window.

### Python built-ins

```python
t = "ababcabababcd"; p = "abcd"
if p in t:                  # substring check: O(n*m) worst, but very fast C loop
    print(t.find(p))        # -1 if not found
# For all occurrences:
import re
occurrences = [m.start() for m in re.finditer(re.escape(p), t)]
```

Python's `in` uses a hybrid of two-way and Boyer-Moore-like scanning internally; extremely fast for most inputs but without the hard theoretical bound of KMP.

### Classic problems

| Problem | Algorithm |
|---|---|
| Substring search | KMP / built-in |
| Implement `strStr()` | KMP |
| Shortest Palindrome | KMP on `s + '#' + reverse(s)` |
| Repeated Substring Pattern | `s` is in `(s + s)[1:-1]` |
| Multi-pattern search | Aho-Corasick |
| String rotation | KMP on doubled string |
| Longest prefix that is also suffix | failure function |
| Distinct substrings | suffix array / suffix automaton |

### Longest prefix-suffix (KMP-derived)

```python
def longest_prefix_suffix(s):
    """Longest proper prefix of s that is also a suffix."""
    return kmp_failure(s)[-1]
```

## Reference View

### KMP failure function — what it means

`fail[i]` = length of the longest proper prefix of `p[:i+1]` that's also a suffix. If we're matching and hit a mismatch at position `q` of the pattern, instead of restarting at `q=0`, we move back to `fail[q-1]` — the longest prefix that's still a valid suffix match. No characters of `t` are re-examined; `t`'s index `i` never decreases.

### Z-algorithm (see `z-algorithm.md`)

Computes `z[i]` = length of longest substring starting at `i` that matches a prefix of the string. Equivalent expressive power to KMP, often simpler to reason about.

### Rabin-Karp vs KMP

| | Rabin-Karp | KMP |
|---|---|---|
| Worst case | `O(n·m)` (hash collisions) | `O(n+m)` guaranteed |
| Expected | `O(n+m)` | `O(n+m)` |
| Multi-pattern | easy (hash all patterns) | awkward |
| Hashing required | yes | no |
| Adversarial inputs | possible to break unkeyed hashes | no issue |

Use double-hashing or keyed hashes (`random.randint` seed) to defeat adversarial collisions.

### Boyer-Moore and BMH

**Boyer-Moore** — skip ahead using bad-character and good-suffix rules. Sublinear in practice on typical texts (average `O(n/m)` when alphabet is large). `Θ(n·m)` worst without Galil's rule, `Θ(n)` with.

**BMH (Boyer-Moore-Horspool)** — simpler variant with only bad-character rule. Widely implemented (most `grep`-like tools).

### Complexity summary

| Algorithm | Preprocess | Search | Space | Notes |
|---|---|---|---|---|
| Naive | 0 | `O(n·m)` | `O(1)` | simple but bad |
| KMP | `O(m)` | `O(n)` | `O(m)` | safe default |
| Rabin-Karp | `O(m)` | `O(n+m)` exp | `O(1)` | multi-pattern friendly |
| Boyer-Moore | `O(m + σ)` | `O(n/m)` best, `O(n)` with Galil | `O(m + σ)` | fastest in practice |
| BMH | `O(m + σ)` | `O(n)` avg | `O(σ)` | used widely |
| Two-way | `O(m)` | `O(n)` | `O(1)` | Python's `in` uses this |

### Pitfalls

- **Empty pattern** — many algorithms diverge. Define behavior explicitly.
- **Unicode** — Python strings iterate by codepoint (not byte); careful with `encode`/`decode` in multi-byte contexts.
- **Adversarial Rabin-Karp** — predictable hash seeds let attackers construct collisions. Always verify or use double hashing.
- **Off-by-one in failure function** — `fail[i]` refers to prefix of length `i+1`; common mix-up.
- **Boyer-Moore on small alphabet** — skip opportunities vanish; performance degrades to linear.
- **Overflow in rolling hash** — use Mersenne primes like `(1<<61)-1` and integer arithmetic.

### Real-world uses

- **grep / ripgrep / ag** — Boyer-Moore variants.
- **Text editors' search** — mix of BMH, two-way, and regex engines.
- **DNA sequence matching** — KMP when small pattern; suffix structures for big.
- **Intrusion detection systems** — Aho-Corasick for signature matching.
- **Web crawlers — detecting known boilerplate** with multi-pattern search.
- **Spell checkers — rolling hash for near-matches**.
- **Plagiarism detection** — rolling-hash fingerprinting (Rabin-Karp style, MOSS).
- **Version control diff** — pattern matching inside diff windows.
- **SQL `LIKE` matching in databases** — typically two-way or Boyer-Moore variants.

### When *not* to use

- You have many short patterns → Aho-Corasick.
- Large static text, many queries → suffix array / suffix automaton (index once, query fast).
- Approximate matching required → edit distance DP, bit-parallel algorithms.
- Regex-like patterns — use an NFA/DFA engine.

## See Also

- [`z-algorithm.md`](z-algorithm.md) — alternative to KMP failure function.
- [`aho-corasick.md`](aho-corasick.md) — multi-pattern extension of KMP.
- [`suffix-structures.md`](suffix-structures.md) — indexing for many queries.
- [`edit-distance.md`](edit-distance.md) — approximate matching.
- [`../../data-structures/trees/trie.md`](../../data-structures/trees/trie.md) — backbone of Aho-Corasick.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
