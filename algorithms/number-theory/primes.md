# Primes, Sieves, Factorization

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

- Generate all primes up to `n` — sieve.
- Test primality of a specific number (possibly huge) — Miller-Rabin.
- Factorize a number into primes — trial division (small), Pollard's ρ (huge).
- Count divisors / sum of divisors / compute Euler's totient for many numbers — sieve-augmented.
- Crypto primitives (RSA key generation, Diffie-Hellman) — but again, don't roll your own.

## Interview View

### Sieve of Eratosthenes — `O(n log log n)`

```python
def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i*i, n + 1, i):
                is_prime[j] = False
    return [i for i in range(n + 1) if is_prime[i]]
```

### Linear sieve (also gives smallest prime factor) — `O(n)`

```python
def linear_sieve(n):
    spf = [0] * (n + 1)           # smallest prime factor
    primes = []
    for i in range(2, n + 1):
        if spf[i] == 0:
            spf[i] = i
            primes.append(i)
        for p in primes:
            if p > spf[i] or i * p > n:
                break
            spf[i * p] = p
    return primes, spf
```

Factor any `x ≤ n` in `O(log x)` via `spf`:

```python
def factor(x, spf):
    result = {}
    while x > 1:
        p = spf[x]
        result[p] = result.get(p, 0) + 1
        x //= p
    return result
```

### Trial division — `O(√n)` for one number

```python
def trial_factor(n):
    factors = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors[d] = factors.get(d, 0) + 1
            n //= d
        d += 1
    if n > 1:
        factors[n] = factors.get(n, 0) + 1
    return factors
```

### Miller-Rabin primality (deterministic for 64-bit with good witness set)

```python
def miller_rabin(n):
    if n < 2: return False
    for p in (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37):
        if n == p: return True
        if n % p == 0: return False
    d, r = n - 1, 0
    while d % 2 == 0: d //= 2; r += 1
    # Witnesses below are deterministic for n < 3,317,044,064,679,887,385,961,981
    for a in (2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37):
        if a >= n: continue
        x = pow(a, d, n)
        if x == 1 or x == n - 1: continue
        for _ in range(r - 1):
            x = x * x % n
            if x == n - 1: break
        else:
            return False
    return True
```

### Pollard's ρ factorization — huge numbers

```python
import math, random

def pollard_rho(n):
    if n % 2 == 0: return 2
    while True:
        x = random.randrange(2, n)
        y = x
        c = random.randrange(1, n)
        d = 1
        while d == 1:
            x = (x * x + c) % n
            y = (y * y + c) % n
            y = (y * y + c) % n
            d = math.gcd(abs(x - y), n)
        if d != n:
            return d

def factor_big(n):
    if n == 1: return {}
    if miller_rabin(n): return {n: 1}
    d = pollard_rho(n)
    a = factor_big(d)
    b = factor_big(n // d)
    for k, v in b.items():
        a[k] = a.get(k, 0) + v
    return a
```

### Classic problems

| Problem | Use |
|---|---|
| Count primes ≤ n | sieve |
| kth prime | sieve |
| Smallest / largest prime factor table | linear sieve |
| Is `n` prime for huge `n` | Miller-Rabin |
| Factor `n` for huge `n` | Pollard's ρ |
| Euler's totient `φ(n)` for many `n` | sieve variant |
| Divisor count / sum for many `n` | multiplicative sieve |
| Segmented sieve (primes in `[L, R]` for huge `L, R`) | sieve base primes ≤ √R, then mark |

### Euler's totient sieve

```python
def totient_sieve(n):
    phi = list(range(n + 1))
    for i in range(2, n + 1):
        if phi[i] == i:   # i is prime
            for j in range(i, n + 1, i):
                phi[j] -= phi[j] // i
    return phi
```

## Reference View

### Density of primes

By the Prime Number Theorem, `π(n) ~ n / ln n`. So primes thin out but don't vanish — there are ~`n / ln n` primes ≤ `n`.

### Why linear sieve?

Eratosthenes marks composite `c = p · q` multiple times (once per distinct prime factor). Linear sieve ensures each composite is marked exactly once, by its smallest prime factor. Useful because it produces `spf[i]` for free — essential for fast per-number factorization.

### Miller-Rabin — how it works

If `n` is prime, `a^{n-1} ≡ 1 (mod n)` (Fermat). Write `n - 1 = 2^r · d`. Then one of:

- `a^d ≡ 1 (mod n)`, or
- `a^{2^i · d} ≡ -1 (mod n)` for some `0 ≤ i < r`.

If neither holds, `n` is composite and `a` is a *witness* of compositeness. Probabilistic in general; with specific witness sets, deterministic up to certain bounds (e.g., witnesses `{2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37}` cover all `n < 3.3 · 10^{24}`).

### Pollard's ρ — why it works

Uses the birthday paradox: in a sequence `x_i = f(x_{i-1}) mod n` with `f(x) = x² + c`, there's a cycle modulo any prime factor `p` of `n` of length ~`O(√p)`. Floyd's cycle detection finds it, and `gcd(|x_i - x_j|, n)` reveals a non-trivial factor.

Expected `O(n^{1/4})` per factor — still subexponential. Fast in practice for up to ~19-digit composites.

### Segmented sieve

For `[L, R]` with `R - L ≤ 10^7` but `R ≈ 10^{12}`:

1. Sieve primes up to `√R` first.
2. For each such prime `p`, mark multiples in `[L, R]`.

Memory `O(R - L)`, time `O((R - L) log log R + √R)`.

### Complexity

| Algorithm | Time |
|---|---|
| Eratosthenes | `O(n log log n)` |
| Linear sieve | `O(n)` |
| Trial division (one `n`) | `O(√n)` |
| Miller-Rabin (one `n`) | `O(k log³ n)` (k witnesses) |
| Pollard's ρ (one `n`) | Expected `O(n^{1/4})` per factor |
| Segmented sieve | `O((R - L) log log R + √R)` |

### Pitfalls

- **Sieve memory** — `n = 10^9` needs 1 GB with `bool[]`; use bitset, segmented sieve, or don't sieve.
- **Miller-Rabin for small `n`** — handle `n < 2` and small primes as base cases.
- **Witness sets for Miller-Rabin** — wrong witness set → non-deterministic. Look up the right one for your range.
- **Pollard's ρ on prime `n`** — infinite loop. Always Miller-Rabin first.
- **`int32` overflow** in `i * i` during sieve → use `int64` or start `for j in range(i*i, ...)` only when `i <= √n`.
- **Linear sieve correctness** — breaking out of inner loop when `p > spf[i]` is essential; else duplicates.

### Real-world uses

- **RSA key generation** — generate random large primes via Miller-Rabin-backed `isPrime`.
- **Cryptographic primitives** — Diffie-Hellman, ElGamal, prime fields for ECC.
- **Hashing — large prime moduli** for polynomial rolling hash.
- **Bioinformatics** — prime-indexed hash tables (e.g., minimizers).
- **PRNGs** — some generators depend on prime-order cycles.
- **Math olympiads / CP** — divisor-sum, totient, Mobius function problems.
- **Integer factorization research** — number field sieve builds on Pollard's ρ / elliptic curve method.

### When *not* to use

- `n` is a specific known small number → just use `math.isqrt`, trial-divide.
- You need *all* primes ≤ `10^9` — memory is infeasible; segment or generate online.
- Crypto-grade: use vetted libs (`cryptography`, `gmpy2`). Side-channel-safe primality matters.
- You just want `is_prime` for a single medium-sized number — trial division is fine up to ~`10^{12}`.

## See Also

- [`gcd-modular.md`](gcd-modular.md) — modular arithmetic building blocks.
- [`combinatorics.md`](combinatorics.md) — `nCr mod p`, inclusion-exclusion with primes.
- [`../paradigms/randomized.md`](../paradigms/randomized.md) — Miller-Rabin as a Monte Carlo algorithm.
- [`../../data-structures/hash/README.md`](../../data-structures/hash/README.md) — primes as hash moduli.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
