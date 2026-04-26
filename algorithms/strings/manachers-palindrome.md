# Manacher's Algorithm (Palindromes in Linear Time)

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

- Find **all** palindromic substrings in linear time — `O(n)`.
- Longest palindromic substring.
- Number of palindromic substrings.
- Palindromic partitioning, minimum number of insertions for palindrome, etc. — Manacher's `p[i]` array is the building block.

When the problem involves palindromes and expansion-from-center gives `O(n²)`, Manacher's shaves it to `O(n)`.

## Interview View

### Core idea (expand-around-center, but smart)

For each center, extend while characters match. Naively `O(n²)`. Manacher's adds a **mirror** trick: within the span of a previously-found palindrome, the next palindrome's radius is at least as long as its mirror's — so we can skip ahead.

### Template — Manacher's on transformed string

```python
def manacher(s):
    """Return longest palindromic substring."""
    # Transform to handle even-length palindromes uniformly
    t = '#' + '#'.join(s) + '#'
    n = len(t)
    p = [0] * n          # p[i] = radius of palindrome at i in t
    center = right = 0
    for i in range(n):
        mirror = 2 * center - i
        if i < right:
            p[i] = min(right - i, p[mirror])
        # expand
        while i - p[i] - 1 >= 0 and i + p[i] + 1 < n and t[i - p[i] - 1] == t[i + p[i] + 1]:
            p[i] += 1
        if i + p[i] > right:
            center, right = i, i + p[i]
    # Extract longest
    max_len, center_idx = max((v, i) for i, v in enumerate(p))
    start = (center_idx - max_len) // 2
    return s[start:start + max_len]
```

### Count palindromic substrings

Total palindromes = `sum((p[i] + 1) // 2 for i in range(len(t)))` — each palindrome at center `i` in `t` corresponds to `(p[i] + 1) // 2` palindromic substrings in `s`.

### Classic problems

| Problem | Approach |
|---|---|
| Longest Palindromic Substring | Manacher's |
| Count Palindromic Substrings | sum over `p` array |
| Palindromic Partitioning (min cuts) | Manacher + DP |
| Shortest palindrome by prepending | Manacher on reversed |
| Longest palindromic subsequence | DP (not Manacher) |
| Palindrome Pairs in array | hashing or suffix/prefix palindrome check |
| Valid Palindrome (remove ≤ K chars) | Manacher + LPS DP |

### Eertree (palindromic tree) — alternative for counting distinct palindromes

Manacher gives all occurrences but counting *distinct* palindromes is easier with eertree. Complexity `O(n)`, each distinct palindrome is a node.

## Reference View

### Why transform with `#`?

Palindromes come in odd and even length. To unify, insert a separator between every pair of characters and at the boundaries:

- `"abba"` → `"#a#b#b#a#"`
- Now every palindrome's center is at a single position (odd-length in the transformed string).

After finding `p[i]` (radius in transformed), the palindrome length in original is `p[i]` (just the count of non-`#` chars in the radius).

### The "mirror" trick in detail

Suppose the rightmost-reaching palindrome found so far has center `c` and right endpoint `r`. For a new position `i ≤ r`:

- Let `mirror = 2c - i` (reflection of `i` about `c`).
- We know `t[c-k..c+k]` is a palindrome for `k ≤ r-c`, so the behavior at `i` mirrors that at `mirror`.
- Set `p[i] = min(r - i, p[mirror])` as a lower bound (might expand further from there).

This cap + opportunistic extension keeps total work `O(n)`.

### Complexity

| Operation | Time | Space |
|---|---|---|
| Manacher's build | `O(n)` | `O(n)` |
| LPS query | `O(1)` after build | — |
| Count distinct palindromes (eertree) | `O(n)` | `O(n)` |

### Pitfalls

- **Forgetting the transform** — without `#`-padding, handling even palindromes gets hairy.
- **Separator character** — the `#` must not appear in the original string. Use a byte outside the alphabet.
- **Off-by-one in radius interpretation** — `p[i]` is the radius; length is `2*p[i] + 1` in transformed, `p[i]` in original.
- **Extracting the substring** — the `start` calculation confuses people; `(center - max_len) // 2` converts back to original-string indices.
- **Confusing "substring" with "subsequence"** — Manacher is substring-only. Subsequence is a DP problem.

### Real-world uses

- **Bioinformatics** — palindromic DNA sequences (hairpins, restriction sites); gene regulatory patterns.
- **Text analysis** — detect repeated palindromic patterns (rare outside puzzles, but shows up).
- **Plagiarism / authenticity checks** — quick palindromic fingerprint as one signal.
- **Competitive programming** — staple for any palindrome problem.
- **Regex optimizations** — fast detection of palindromic substrings for special handling.

### When *not* to use

- Problem is about **subsequences**, not substrings → DP.
- You need just a **single palindromicity check** → expand-around-center is fine.
- Approximate palindromes (with `k` mismatches) → different algorithm.
- Large alphabet where the `#` transform is awkward — use eertree (palindromic tree) instead.

## See Also

- [`z-algorithm.md`](z-algorithm.md) — related linear-time string trick.
- [`pattern-matching.md`](pattern-matching.md) — when used in combination.
- [`edit-distance.md`](edit-distance.md) — approximate palindromes.
- [`../dp-patterns/lis-lcs.md`](../dp-patterns/lis-lcs.md) — longest palindromic subsequence via LCS.
- [`suffix-structures.md`](suffix-structures.md) — for indexed palindrome queries.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
