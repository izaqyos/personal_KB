# Combinatorics

- **Source:** distilled from Concrete Mathematics + CP patterns
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

- Count arrangements, selections, partitions, subsets, paths.
- Compute `nCr`, `nPr` — possibly mod a prime.
- Counting problems using inclusion-exclusion (surjections, derangements).
- Catalan-flavored counting (balanced parens, binary trees, triangulations).
- Stirling (partitions into subsets or cycles), Bell numbers, generating functions.

## Interview View

### nCr — small values, direct

```python
from math import comb, perm
comb(10, 3)    # 120  = C(10, 3)
perm(10, 3)    # 720  = P(10, 3)
```

### nCr mod p — prime modulus, standard method

Precompute factorials and inverse factorials:

```python
def precompute(n, mod):
    f = [1] * (n + 1)
    for i in range(1, n + 1):
        f[i] = f[i-1] * i % mod
    inv_f = [1] * (n + 1)
    inv_f[n] = pow(f[n], -1, mod)
    for i in range(n, 0, -1):
        inv_f[i-1] = inv_f[i] * i % mod
    return f, inv_f

def ncr_mod(n, r, mod, f, inv_f):
    if r < 0 or r > n: return 0
    return f[n] * inv_f[r] % mod * inv_f[n-r] % mod
```

`O(n)` preprocessing, `O(1)` queries.

### Lucas' theorem — `nCr mod p` for HUGE `n`, `r` with small prime `p`

```python
def lucas(n, r, p):
    """C(n, r) mod p for prime p, works even when n, r are astronomically large."""
    if r == 0: return 1
    ni, ri = n % p, r % p
    if ri > ni: return 0
    # small C(ni, ri) mod p via precomputed f, inv_f up to p-1
    return (lucas(n // p, r // p, p) * ncr_small(ni, ri, p)) % p
```

### Catalan numbers

```python
def catalan(n):
    # C_n = C(2n, n) / (n+1)
    return comb(2*n, n) // (n + 1)

def catalan_dp(n):
    C = [0] * (n + 1)
    C[0] = 1
    for i in range(1, n + 1):
        C[i] = sum(C[j] * C[i-1-j] for j in range(i))
    return C[n]
```

First few: `1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862`.

### Stirling numbers (second kind) — partitions into k non-empty subsets

```python
def stirling2(n, k):
    S = [[0] * (k + 1) for _ in range(n + 1)]
    S[0][0] = 1
    for i in range(1, n + 1):
        for j in range(1, k + 1):
            S[i][j] = j * S[i-1][j] + S[i-1][j-1]
    return S[n][k]
```

### Inclusion-Exclusion — counting surjections from `[n]` to `[k]`

```python
def surjections(n, k):
    # = k! · S(n, k), or via inclusion-exclusion
    total = 0
    for i in range(k + 1):
        sign = 1 if i % 2 == 0 else -1
        total += sign * comb(k, i) * (k - i) ** n
    return total
```

### Derangements — permutations with no fixed point

```python
def derangement(n):
    # D(n) = (n-1) · (D(n-1) + D(n-2)), D(0)=1, D(1)=0
    if n == 0: return 1
    if n == 1: return 0
    a, b = 1, 0
    for i in range(2, n + 1):
        a, b = b, (i - 1) * (a + b)
    return b
```

### Classic problems

| Problem | Use |
|---|---|
| Number of subsets | `2^n` |
| Number of permutations | `n!` |
| Lattice paths `(0,0) → (a,b)` going right/up only | `C(a+b, a)` |
| Balanced parenthesization | Catalan |
| Number of BSTs with `n` keys | Catalan |
| Number of triangulations of convex polygon | Catalan |
| Number of ways to distribute `n` items into `k` boxes (surjective) | `k! · S(n, k)` |
| Probability no fixed point | `D(n) / n!` → `1/e` |
| Number of ways to write `n` as ordered sum of positive ints | `2^{n-1}` |
| Number of ways to color a graph with `k` colors | chromatic polynomial |

## Reference View

### Binomial identities (useful in proofs / CP)

- **Pascal's rule**: `C(n, r) = C(n-1, r-1) + C(n-1, r)`.
- **Symmetry**: `C(n, r) = C(n, n-r)`.
- **Vandermonde**: `C(m+n, r) = Σ_k C(m, k) · C(n, r-k)`.
- **Hockey stick**: `C(r, r) + C(r+1, r) + ... + C(n, r) = C(n+1, r+1)`.
- **Binomial theorem**: `(x + y)^n = Σ_k C(n, k) x^k y^{n-k}`.

### Stars and bars

Number of ways to write `n` as ordered sum of `k` non-negative integers: `C(n + k - 1, k - 1)`.

With each part ≥ 1: `C(n - 1, k - 1)`.

### Lucas' theorem

For prime `p` and `n, r` with base-`p` expansions `n = Σ n_i p^i`, `r = Σ r_i p^i`:

`C(n, r) mod p = Π C(n_i, r_i) mod p`.

So for `p = 2`, `C(n, r)` is odd iff `r AND n == r` (i.e., each bit of `r` is also set in `n`). Used in many parity problems.

### Generating functions (sketch)

The ordinary generating function of `(a_n)` is `A(x) = Σ a_n x^n`. Problems on sequences become problems on formal power series:

- Sum of two sequences = sum of GFs.
- Convolution (product of GFs) counts sequence pairs summing to a given value.
- Catalan GF: `C(x) = 1 + x · C(x)²`, so `C(x) = (1 - √(1-4x)) / (2x)`.
- Fibonacci GF: `F(x) = x / (1 - x - x²)`.

Useful for closed-form solutions and recurrences.

### Möbius and inclusion-exclusion

Möbius function `μ(n)`:

- `1` if `n` is square-free with even number of prime factors.
- `-1` if `n` is square-free with odd number of prime factors.
- `0` if `n` has a squared prime factor.

Möbius inversion: if `f(n) = Σ_{d|n} g(d)`, then `g(n) = Σ_{d|n} μ(n/d) f(d)`.

### Frobenius / Chicken McNugget

For coprime positive integers `a, b`, the largest amount that *can't* be expressed as `ax + by` with `x, y ≥ 0` is `ab - a - b`. Generalizes to more variables but no closed form.

### Complexity

| Task | Time |
|---|---|
| `nCr` (Python `math.comb`) | `O(min(r, n-r))` |
| `nCr mod p` (preprocessed) | `O(n)` prep, `O(1)` query |
| Lucas `nCr mod p` for huge `n` | `O(p + log_p n)` |
| Catalan `C_n` | `O(n)` via `C(2n, n) / (n+1)` |
| Stirling S(n, k) | `O(nk)` DP |
| Inclusion-Exclusion over `m` sets | `O(2^m · f(...))` |

### Pitfalls

- **Integer overflow in C/Java** — `nCr` blows up fast. Use Python (arbitrary precision) or mod.
- **Precomputing factorials mod `p` when `n ≥ p`** — don't; use Lucas'.
- **`nCr mod m` when `m` is composite** — can't invert via Fermat; use CRT over prime-power factors, or other tricks.
- **Catalan for big `n`** — grows `~4^n / n^{1.5}`; use mod or big-int.
- **Stirling second-kind recurrences** — easy to swap indices or sign.
- **Inclusion-exclusion blowup** — `2^n` terms; exponentially expensive for large universes. Use structure (Möbius over divisor poset, etc.).

### Real-world uses

- **Probability and statistics** — sampling, combinatorial probability.
- **Machine learning** — counting configurations in graphical models, tree enumerations.
- **Compiler design** — expression trees ↔ Catalan.
- **Cryptographic birthday bounds** — collision probability.
- **Game theory — combinatorial game state counts**.
- **Networking — counting paths / flows in DAGs**.
- **Quantum circuit counting** — Catalan-like enumerations.

### When *not* to use

- Small instance, direct formula works — use `math.comb`.
- Problem has structure that makes enumeration unnecessary (symmetry, generating-function closed form).
- You're drowning in `2^n` terms of inclusion-exclusion — switch to Möbius or DP on subsets.

## See Also

- [`gcd-modular.md`](gcd-modular.md) — modular inverse, CRT for mod computations.
- [`primes.md`](primes.md) — prime-based moduli, Lucas' theorem needs prime `p`.
- [`../dp-patterns/coin-change.md`](../dp-patterns/coin-change.md) — Frobenius problem.
- [`../dp-patterns/bitmask-dp.md`](../dp-patterns/bitmask-dp.md) — counting-on-subsets, SOS DP.
- [`../../math-and-stats/probability.md`](../../math-and-stats/probability.md) — combinatorial probability.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
