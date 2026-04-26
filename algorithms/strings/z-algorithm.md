# Z-Algorithm

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

- Pattern matching — `Z(p + '$' + t)` finds all occurrences of `p` in `t`.
- Longest proper prefix that's also a substring starting elsewhere.
- Count of distinct substrings, period detection, string rotations — all express neatly with Z.
- When you want something conceptually simpler than KMP's failure function.

Both KMP and Z do the same kinds of jobs in `O(n)`; Z is often more intuitive.

## Interview View

### The Z-function

```python
def z_function(s):
    """z[i] = length of longest substring starting at i that matches a prefix of s."""
    n = len(s)
    z = [0] * n
    z[0] = n       # convention: whole string matches itself
    l = r = 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z
```

`O(n)` — amortized by the `[l, r]` window invariant.

### Pattern matching via Z

```python
def z_pattern_search(text, pattern):
    combined = pattern + '$' + text   # $ is any character not in either string
    z = z_function(combined)
    m = len(pattern)
    return [i - m - 1 for i in range(len(combined)) if z[i] == m]
```

### Classic problems

| Problem | Z-based solution |
|---|---|
| Find all occurrences of `p` in `t` | `Z(p + '$' + t)` |
| Longest substring that is also a prefix | `max(z[i])` for `i > 0` |
| Count distinct substrings | per-index length minus `z` overlap (advanced) |
| Period of string | smallest `p` with `n % p == 0` and `z[p] == n - p` |
| Check string rotation | `s2` is a rotation of `s1` iff it's a substring of `s1 + s1` |
| Longest common prefix (one-sided) | `z[i]` gives `lcp(s, s[i:])` |

### Example — smallest period

```python
def smallest_period(s):
    n = len(s)
    z = z_function(s)
    for p in range(1, n):
        if n % p == 0 and z[p] == n - p:
            return p
    return n
```

## Reference View

### The window `[l, r]`

The window `[l, r]` is the rightmost Z-box found so far: a substring `s[l:r]` that matches `s[0:r-l]`. When processing position `i`:

- If `i < r`: we already know `s[l:r]` is a copy of `s[0:r-l]`, so `s[i:r] == s[i-l:r-l]`. We can copy `z[i-l]` but capped at `r - i`.
- If `i >= r` or the copied value reached the end of the current Z-box: try to extend character by character.

Amortized: across the whole run, the right pointer `r` only advances, so the total work spent on the `while` loop is `O(n)`.

### Equivalence to KMP

KMP's failure function and the Z-function can be derived from each other in linear time. Most algorithms expressible with one are expressible with the other — pick whichever is clearer for the problem.

### Variants

- **Z on reverse** — useful for palindromic problems (combine with original).
- **Multi-pattern Z** — concatenate patterns with separators; watch for cross-boundary matches.
- **2D Z** — for 2D pattern matching in images; complex but exists.

### Complexity

| Operation | Cost |
|---|---|
| Z-function build | `O(n)` time, `O(n)` space |
| Pattern matching via Z | `O(n + m)` |

### Pitfalls

- **Choosing separator** — the `$` character must not appear in either pattern or text. Use a byte outside the alphabet (e.g., `'\0'` or `chr(0)`).
- **`z[0]` convention** — some sources define `z[0] = 0`, others `z[0] = n`. Be consistent.
- **`min(r - i, z[i-l])`** — critical cap; without it, you can walk past the known window and double-count.
- **Iterating `r > i` vs `r >= i`** — off-by-one.
- **Unicode / non-byte strings** — comparing characters only works if your string is genuinely a sequence of comparable codepoints; UTF-8 byte strings need care.

### Real-world uses

- **Plagiarism detection** — scan for large overlapping substrings via Z-function-based fingerprints.
- **Periodicity detection in time series** — find smallest repeated motif.
- **String rotation checks** — "is `s2` a rotation of `s1`?" via `Z(s1 + '$' + s2 + s2)`.
- **Parser preprocessing** — Z-array computed once for recurring lookups.
- **Competitive programming staple** for string problems where KMP feels awkward.

### When *not* to use

- You just need to find a single substring occurrence in a short string — Python's `in` is simpler.
- Multi-pattern matching — Aho-Corasick.
- Many queries on a big fixed text — suffix automaton / suffix array.
- Approximate matching — edit distance.

## See Also

- [`pattern-matching.md`](pattern-matching.md) — KMP and friends, same job.
- [`manachers-palindrome.md`](manachers-palindrome.md) — related linear-time trick for palindromes.
- [`suffix-structures.md`](suffix-structures.md) — for indexed queries.
- [`../../data-structures/trees/trie.md`](../../data-structures/trees/trie.md) — for multi-pattern search.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
