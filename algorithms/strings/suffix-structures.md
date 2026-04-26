# Suffix Structures (Suffix Array, Suffix Tree, Suffix Automaton)

- **Source:** distilled from CP patterns
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

- Many substring queries on a **fixed text** — preprocess once, query fast.
- Longest common substring (LCS) of two strings (different from LCS of sequences).
- Count of distinct substrings.
- Longest repeated substring.
- Lexicographically k-th substring.
- Full-text indexes for search (precursor to FM-index / BWT).

Three main structures: **suffix array**, **suffix tree**, **suffix automaton**. All express the same substring information in different forms.

## Interview View

### Suffix array — `O(n log n)` naive build

```python
def suffix_array_naive(s):
    """Returns array sa where s[sa[i]:] is the i-th smallest suffix."""
    return sorted(range(len(s)), key=lambda i: s[i:])
```

`O(n² log n)` due to suffix comparisons. Fine for `n ≤ 10^3`-ish.

### Suffix array — `O(n log² n)` via prefix-doubling

```python
def suffix_array(s):
    s = s + '\0'
    n = len(s)
    sa = sorted(range(n), key=lambda i: s[i])
    rank = [0] * n
    for i, idx in enumerate(sa):
        rank[idx] = i
    k = 1
    tmp = [0] * n
    while k < n:
        def key(i):
            return (rank[i], rank[i + k] if i + k < n else -1)
        sa.sort(key=key)
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i-1]] + (1 if key(sa[i]) != key(sa[i-1]) else 0)
        rank = tmp[:]
        if rank[sa[-1]] == n - 1: break
        k *= 2
    return sa[1:]   # drop the '\0' suffix
```

### Kasai's LCP array — `O(n)` given suffix array

```python
def lcp_array(s, sa):
    n = len(s)
    rank = [0] * n
    for i, idx in enumerate(sa):
        rank[idx] = i
    lcp = [0] * n
    h = 0
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]
            while i + h < n and j + h < n and s[i + h] == s[j + h]:
                h += 1
            lcp[rank[i]] = h
            if h > 0: h -= 1
    return lcp  # lcp[i] = longest common prefix of sa[i-1] and sa[i]
```

### Count of distinct substrings via suffix array

```python
def distinct_substrings(s):
    sa = suffix_array(s)
    lcp = lcp_array(s, sa)
    n = len(s)
    total = n * (n + 1) // 2                 # all substrings
    overlap = sum(lcp)                       # repeated prefixes
    return total - overlap
```

### Classic problems

| Problem | Tool |
|---|---|
| Longest repeated substring | suffix array + max lcp |
| Longest common substring of two strings | concat + SA + LCP, avoid same-side matches |
| Count of distinct substrings | SA + LCP |
| K-th substring in lexicographical order | SA + cumulative lcp |
| Pattern matching (many queries) | binary search on SA, or suffix automaton |
| Longest palindrome via suffix automaton | palindromic tree / eertree |
| Burrows-Wheeler Transform (BWT) | basis for compression / bioinformatics indexes |

## Reference View

### Suffix array vs suffix tree vs suffix automaton

| | Suffix Array | Suffix Tree | Suffix Automaton |
|---|---|---|---|
| Space | `O(n)` (ints) | `O(n · σ)` or `O(n)` compacted | `O(n · σ)` |
| Build time | `O(n log n)` / `O(n)` (DC3, SA-IS) | `O(n)` (Ukkonen) | `O(n)` |
| Substring match | `O(m log n)` | `O(m)` | `O(m)` |
| LCS of two strings | SA + LCP | walk the tree | build on both |
| Implementation difficulty | medium | hard | medium |
| Interview friendliness | highest | lowest | mid |

In practice: **suffix array + LCP** handles 90% of problems and is the most-implemented. Suffix automaton is elegant and linear-time-build; suffix trees are canonical but implementation-heavy.

### Suffix array construction — algorithm landscape

- **Naive sort** — `O(n² log n)` (or `O(n · n log n)` in Python due to string comparisons).
- **Prefix doubling (Manber-Myers)** — `O(n log² n)`.
- **Prefix doubling + radix sort** — `O(n log n)`.
- **SA-IS (Induced Sorting)** — `O(n)`, widely used in libraries.
- **DC3 (Kärkkäinen-Sanders)** — `O(n)`, elegant recursive algorithm.

For interview purposes, `O(n log² n)` is plenty; for library work, use SA-IS (or link to a package).

### Suffix automaton

Minimal DFA that recognizes all substrings of `s`. Built online in `O(n)` time with `O(n · σ)` space. Each state represents an **equivalence class** of substrings with the same right-extensions.

Use cases: count distinct substrings (sum over states of `len(state) - len(link)`), check if a pattern is a substring (walk the automaton), find the longest common substring of two strings (build on first, walk with second).

### LCP array applications

Once you have `sa` and `lcp`:

- **Longest repeated substring** = `max(lcp)`.
- **Distinct substrings** = `n(n+1)/2 - sum(lcp)`.
- **Longest common substring** = max `lcp[i]` where the two involved suffixes belong to different source strings (in concat with separator).

### Complexity

| Operation | Suffix array | Suffix automaton | Suffix tree |
|---|---|---|---|
| Build | `O(n log n)` (prefix doubling) | `O(n · σ)` | `O(n · σ)` (Ukkonen) |
| Pattern match | `O(m log n)` | `O(m)` | `O(m)` |
| Count distinct substr | `O(n)` after SA+LCP | `O(n)` | `O(n)` |
| LCS two strings | `O(n+m)` after SA+LCP | `O(n+m)` | `O(n+m)` |

### Pitfalls

- **End-of-string sentinel** — append `\0` (or any char less than all others) to avoid boundary issues in SA building. Many bugs disappear.
- **LCP array indexing** — `lcp[i]` usually refers to the LCP of `sa[i]` and `sa[i-1]`; check your convention.
- **Non-ASCII characters** — encode to bytes or integers carefully; sort order must be consistent.
- **Python string slicing is `O(n)`** — comparisons in naive suffix sort are expensive. Use indices and `cmp_to_key` if going naive, or just implement prefix doubling.
- **Suffix automaton last node** — when extending, the "clone" step is subtle; consult a reference.
- **Suffix tree edge labels stored implicitly** — don't store full substrings.

### Real-world uses

- **Full-text search engines (Lucene-like)** — rarely use raw suffix arrays; use FM-index (BWT-based) built from suffix arrays.
- **Bioinformatics — read alignment (BWA, Bowtie)** — FM-index on reference genomes.
- **Compression — bzip2 uses BWT** derived from the sorted suffix rotations.
- **`grep -z` variants for compressed text**.
- **Plagiarism / clone detection at code level** — longest common substring of token streams.
- **Fuzzy matching / autocomplete on big corpora** — suffix-array-based prefix scans.
- **Malware analysis — shared substring detection across binaries**.

### When *not* to use

- Text changes often → suffix structures are expensive to rebuild. Use dynamic structures (wavelet trees, dynamic SA variants) or hashing.
- Short strings → KMP / Rabin-Karp / regex is simpler.
- Multi-pattern over fixed pattern set → Aho-Corasick is simpler.
- You only need exact-match count → hash table.

## See Also

- [`pattern-matching.md`](pattern-matching.md) — when preprocessing isn't justified.
- [`aho-corasick.md`](aho-corasick.md) — fixed pattern set.
- [`z-algorithm.md`](z-algorithm.md) — simpler for specific tasks.
- [`edit-distance.md`](edit-distance.md) — approximate substring matching.
- [`../../data-structures/trees/trie.md`](../../data-structures/trees/trie.md) — cousin of suffix tree.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
