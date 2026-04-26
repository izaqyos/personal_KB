# Digit DP

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

- You need to **count** (or aggregate over) numbers in `[0, N]` (or `[L, R]`) satisfying a digit-level property.
- `N` is huge (up to 10¹⁸), so iterating is impossible — but the number of *digits* is small (≤ 19).
- Typical properties: "digit sum = S," "no two adjacent digits equal," "contains 5," "at most `k` distinct digits."

Trick: fix the number digit by digit. State = position + auxiliary info + a **"tight"** flag indicating whether we're still bounded by `N`.

## Interview View

### Template — count numbers in `[0, N]` with some property

```python
from functools import cache

def count_le(N, property_ok):
    digits = list(map(int, str(N)))
    n = len(digits)

    @cache
    def dp(pos, state, tight, started):
        if pos == n:
            return 1 if property_ok(state, started) else 0
        limit = digits[pos] if tight else 9
        total = 0
        for d in range(0 if started else 0, limit + 1):
            new_state = transition(state, d, started)
            new_tight = tight and (d == limit)
            new_started = started or (d > 0)
            total += dp(pos + 1, new_state, new_tight, new_started)
        return total

    return dp(0, initial_state, True, False)
```

- **`tight`**: if True, the `pos`-th digit is bounded by `digits[pos]`; else free up to 9.
- **`started`**: has the number's leading non-zero digit appeared? Useful when leading zeros shouldn't count (e.g., "digit 0" in `007`).
- **`state`**: problem-specific — sum so far, last digit, mask of digits used, etc.

### Example — count numbers in `[0, N]` with digit sum ≤ S

```python
from functools import cache

def count_digit_sum_le(N, S):
    digits = list(map(int, str(N)))
    n = len(digits)

    @cache
    def dp(pos, acc, tight):
        if pos == n:
            return 1 if acc <= S else 0
        limit = digits[pos] if tight else 9
        total = 0
        for d in range(limit + 1):
            if acc + d > S: break           # small speedup
            total += dp(pos + 1, acc + d, tight and d == limit)
        return total

    return dp(0, 0, True)
```

### Range `[L, R]` = `count_le(R) - count_le(L-1)`

```python
def count_in_range(L, R, predicate_counter):
    return predicate_counter(R) - predicate_counter(L - 1)
```

### Example — count numbers in `[L, R]` with no two equal adjacent digits

```python
from functools import cache

def count_no_adj_equal(N):
    if N < 0: return 0
    digits = list(map(int, str(N)))
    n = len(digits)

    @cache
    def dp(pos, last, tight, started):
        if pos == n:
            return 1
        limit = digits[pos] if tight else 9
        total = 0
        for d in range(0, limit + 1):
            if started and d == last:
                continue
            new_started = started or (d > 0)
            new_last = d if new_started else -1
            total += dp(pos + 1, new_last, tight and d == limit, new_started)
        return total

    return dp(0, -1, True, False)

def count_no_adj_equal_range(L, R):
    return count_no_adj_equal(R) - count_no_adj_equal(L - 1)
```

### Classic problems

| Problem | State |
|---|---|
| Count of Integers with Digit Sum = S | running digit sum |
| Numbers at Most N with Unique Digits | bitmask of used digits + started |
| Numbers With No Two Adjacent Digits Equal | last digit |
| Rotated Digits / Confusing Numbers | per-position validity + state |
| Numbers Divisible by K | running sum mod K |
| Lexicographically K-th Number | build digit by digit, count below |
| Numbers with exactly X digits that... | prepopulate position start |
| Windy number (|d-d'|≥2 adjacent) | last digit |

## Reference View

### State anatomy

- **`pos`** — current digit index (always).
- **`tight`** — still bounded by the upper limit.
- **`started`** — only matters if leading-zero semantics differ.
- **auxiliary (problem-specific)** — sum, last digit, mask of digits used, running mod.

Tune the state to be as small as possible. Common sizes: `pos ≤ 19`, `tight ∈ {0,1}`, `started ∈ {0,1}`, aux in `[0, small_bound]`. Memoization fits easily.

### Why `tight` is essential

Without it, you'd overcount: at any position where you've matched the prefix of `N` exactly, you're restricted to digits up to `digits[pos]`; otherwise free.

Shortcut: once you place a digit strictly less than `digits[pos]`, `tight` becomes False for the rest — the remaining positions can be anything in `0..9`, so you can often close a closed-form for the rest.

### Leading zeros

Two choices:

1. Treat "7" as "0000000007" — digit 0 appears 9 times. Bug-prone.
2. Track `started` flag — only *real* digits count.

Pick one and be consistent; problems often specify.

### Range conversion

`f(L, R) = f(0, R) - f(0, L-1)`. Pay attention to `L = 0` edge case.

### Complexity

| Variant | Time | Space |
|---|---|---|
| basic (pos, tight, started) | `O(d · 2 · 2 · 10)` | `O(d · 2 · 2)` |
| with aux of size `S` | `O(d · 2 · 2 · S · 10)` | `O(d · 2 · 2 · S)` |

`d` = number of digits in `N`. For `N ≤ 10^18`, `d ≤ 19`. Aux typically `O(d)` or a small constant.

### Pitfalls

- **Forgetting `tight`** — overcounts.
- **Forgetting `started`** — miscounts leading-zero behavior (e.g., "contains digit 5" overcounts if `007` → "contains 0").
- **Caching `tight=True` branches forever** — `functools.cache` is fine, but reset between different `N` calls if you use a module-level cache.
- **Off-by-one on `[L, R]` vs `[0, R]`** — `count(R) - count(L-1)`, not `count(R) - count(L)`.
- **Transition function must be pure** — if `property_ok` or `transition` depends on outer state, cache is wrong.
- **Large auxiliary** — `pos * digit * mask * 2 * 2` can explode; trim state.

### Real-world uses

- **Bank / finance audits** — count account numbers in a range matching a pattern (e.g., "no three consecutive zeros").
- **Cryptography counting problems** — count primes in ranges with digit constraints (rare, but shows up).
- **Competitive programming** — a staple of counting problems.
- **Query engines over numeric data** — cardinality estimation when constraints are digit-level (unusual but possible).
- **Lottery / lexical ordering problems** — find the k-th number in some range with a property.

### When *not* to use

- `N` is small (say ≤ 10^6) — iterate directly.
- Property isn't digit-level — different DP shape.
- You need all qualifying numbers, not just count — enumerate.

## See Also

- [`bitmask-dp.md`](bitmask-dp.md) — when the state is a set of used digits.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../number-theory/combinatorics.md`](../number-theory/combinatorics.md) — closed forms for "rest of digits unrestricted."
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
