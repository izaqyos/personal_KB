# GCD & Modular Arithmetic

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

- Compute `gcd`, `lcm`, or solve `ax + by = gcd(a, b)` (extended Euclidean).
- Modular exponentiation, modular inverse.
- Solving linear congruences `ax ≡ b (mod m)`.
- Chinese Remainder Theorem (CRT) for system of congruences.
- Cryptography building blocks (RSA, Diffie-Hellman, ECDSA) — but don't roll your own crypto.

## Interview View

### Euclid's algorithm — iterative GCD

```python
def gcd(a, b):
    while b:
        a, b = b, a % b
    return abs(a)

def lcm(a, b):
    return abs(a * b) // gcd(a, b) if a and b else 0
```

Or `math.gcd(a, b)` / `math.lcm(a, b)` in Python 3.9+.

### Extended Euclidean — solve `ax + by = gcd(a, b)`

```python
def ext_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = ext_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1
```

### Modular inverse (when `gcd(a, m) == 1`)

```python
def mod_inverse(a, m):
    g, x, _ = ext_gcd(a % m, m)
    if g != 1:
        return None          # no inverse
    return x % m
```

Or: `pow(a, -1, m)` in Python 3.8+.

### Fast modular exponentiation (built-in)

```python
pow(base, exp, mod)      # O(log exp), handles negatives and huge exp
```

Manual:

```python
def mod_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp & 1:
            result = result * base % mod
        base = base * base % mod
        exp >>= 1
    return result
```

### Linear congruence `ax ≡ b (mod m)`

Has a solution iff `gcd(a, m) | b`. If so:

```python
def solve_linear_congruence(a, b, m):
    g, x, _ = ext_gcd(a, m)
    if b % g != 0:
        return None
    x0 = x * (b // g) % (m // g)
    return x0, m // g        # x0 + k*(m/g) for k ∈ Z are all solutions
```

### Chinese Remainder Theorem

For pairwise-coprime moduli:

```python
def crt(remainders, moduli):
    """Find x s.t. x ≡ r_i (mod m_i) for all i. Moduli must be pairwise coprime."""
    M = 1
    for m in moduli: M *= m
    result = 0
    for r, m in zip(remainders, moduli):
        Mi = M // m
        yi = mod_inverse(Mi, m)
        result = (result + r * Mi * yi) % M
    return result
```

For non-coprime moduli, use pairwise merging via extended Euclidean.

### Classic problems

| Problem | Use |
|---|---|
| GCD of array | fold `gcd` |
| LCM of array | fold `lcm` (watch overflow in C++) |
| Fraction simplify | divide num/denom by `gcd` |
| Mod inverse | `pow(a, -1, m)` |
| Compute `nCr mod p` (p prime) | Fermat + factorials |
| Solve `ax + by = c` | extended Euclidean |
| Rabbit meets frog on a circle | CRT |
| Sum of k identical tickets mod m | modular sum |

### `nCr mod p` for prime `p`

```python
def precompute_factorials(n, mod):
    f = [1] * (n + 1)
    for i in range(1, n + 1):
        f[i] = f[i-1] * i % mod
    inv_f = [1] * (n + 1)
    inv_f[n] = pow(f[n], -1, mod)
    for i in range(n - 1, -1, -1):
        inv_f[i] = inv_f[i+1] * (i+1) % mod
    return f, inv_f

def ncr(n, r, mod, f, inv_f):
    if r < 0 or r > n: return 0
    return f[n] * inv_f[r] % mod * inv_f[n-r] % mod
```

`O(n)` preprocessing, `O(1)` queries.

## Reference View

### Euclid's correctness

`gcd(a, b) = gcd(b, a mod b)` — because any common divisor of `a, b` divides `a mod b = a - (a//b)*b`, and vice versa. Termination: each step strictly decreases `b`, and `b ≥ 0`, so it terminates in `O(log min(a, b))` steps by the Fibonacci worst case.

### Extended Euclidean — what `x, y` mean

The algorithm returns `g = gcd(a, b)` and integers `x, y` such that `ax + by = g`. These are called **Bézout coefficients**. Uses: modular inverse (`ax ≡ 1 (mod m)` requires `gcd(a, m) = 1`), and solving linear Diophantine equations.

### Fermat's little theorem

For prime `p` and `a` not divisible by `p`: `a^{p-1} ≡ 1 (mod p)`. Hence `a^{p-2} ≡ a^{-1} (mod p)`. Widely used for modular inverse when modulus is prime.

### Euler's theorem (generalization)

If `gcd(a, n) = 1`: `a^{φ(n)} ≡ 1 (mod n)`, where `φ` is Euler's totient. Handles composite `n`.

### Modular inverse — three ways

1. **`pow(a, -1, m)`** — works for any `gcd(a, m) = 1`. Uses extended Euclidean under the hood.
2. **Fermat's little** — only for prime modulus: `a^{m-2} mod m`.
3. **Extended Euclidean directly** — when you want the coefficients too.

### Modular arithmetic pitfalls

- Negative numbers: `-3 % 7` = 4 in Python, but in C/C++/Java it's `-3`. Use `((x % m) + m) % m` to normalize.
- Overflow: in Python, never; elsewhere, `a * b` overflows when `a, b ~ 10^9` and you use `int32`. Use `int64` or `__int128`.
- Division is multiplication by inverse; can only do if `gcd` = 1.

### Complexity

| Operation | Time |
|---|---|
| Euclid gcd | `O(log min(a, b))` |
| Extended Euclid | `O(log min(a, b))` |
| Modular exponentiation | `O(log exp)` |
| Modular inverse | `O(log m)` |
| Linear congruence | `O(log m)` |
| CRT (k moduli) | `O(k log M)` |

### Pitfalls

- **Gcd of `0` and `0`** — usually defined as `0`, but some convention. Python's `math.gcd(0, 0) = 0`.
- **`lcm(a, b)` overflow** — `a * b` can overflow before dividing by gcd. Compute `a // gcd(a, b) * b`.
- **Modular inverse when `gcd != 1`** — doesn't exist; return `None` and handle in caller.
- **Negative modular arithmetic** — always normalize.
- **CRT with non-coprime moduli** — classical form fails; use pairwise merge.
- **Big exponent modular pow** — use built-in `pow` not manual, especially for crypto-grade moduli (constant-time matters).
- **Rolling your own crypto** — don't. Use vetted libraries (`cryptography` in Python).

### Real-world uses

- **RSA encryption** — modular exponentiation on huge primes.
- **Diffie-Hellman key exchange** — same primitive.
- **Digital signatures (ECDSA, Ed25519)** — modular arithmetic over elliptic curves.
- **Hashing with polynomial rolling hash** — mod a large prime.
- **Chinese Remainder Theorem in signal processing** — efficient algorithms for DFT-like transforms.
- **Checksums — CRC** uses polynomial arithmetic mod a fixed polynomial.
- **Random number generation** — linear congruential generators (`state = (a * state + c) % m`).
- **Time arithmetic on modular clocks** — calendars, scheduling.
- **Cryptocurrency / blockchain** — elliptic curve math, signatures, HD wallets.

### When *not* to use

- You have access to Python's built-ins (`math.gcd`, `pow(a, -1, m)`) — use them.
- Cryptographic application → use a vetted library; don't implement yourself.
- Arbitrary-precision isn't needed → use fixed-width integer ops in C/C++ with care.

## See Also

- [`primes.md`](primes.md) — primality testing, factorization.
- [`combinatorics.md`](combinatorics.md) — `nCr mod p`, Lucas' theorem.
- [`bit-manipulation.md`](bit-manipulation.md) — bit tricks.
- [`../paradigms/randomized.md`](../paradigms/randomized.md) — Miller-Rabin, Pollard-ρ.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
