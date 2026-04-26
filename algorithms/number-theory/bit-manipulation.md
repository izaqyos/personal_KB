# Bit Manipulation

- **Source:** distilled from Hacker's Delight + CP patterns
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

- Sets of size ≤ 32 (or ≤ 64) represented as integers — fast membership, union, intersection.
- Bitmask DP on subsets — `O(2^n · poly(n))`.
- Parity / XOR puzzles — "find single number among doubles" etc.
- Low-level optimizations — bit tricks in hot loops, SIMD-adjacent scanning.
- Gray codes, Hamming codes, popcount-based hashing.

## Interview View

### Core one-liners

```python
# Test bit i:        x & (1 << i)
# Set bit i:         x |=  (1 << i)
# Clear bit i:       x &= ~(1 << i)
# Toggle bit i:      x ^=  (1 << i)
# Lowest set bit:    x & -x
# Clear lowest set:  x & (x - 1)
# Is power of 2:     x > 0 and (x & (x - 1)) == 0
# Count set bits:    bin(x).count('1') / x.bit_count() (Py 3.10+)
# Leftmost bit pos:  x.bit_length() - 1
# Swap without tmp:  a ^= b; b ^= a; a ^= b
```

### Iterate over subsets of a mask `m`

```python
sub = m
while sub > 0:
    # use sub
    sub = (sub - 1) & m
# loop body also runs for sub == 0 if you want; do one extra iteration
```

### Iterate over set bits of `x`

```python
while x:
    low = x & -x        # isolated lowest bit
    i = low.bit_length() - 1
    # use i
    x ^= low
```

### Single non-duplicate (XOR trick)

```python
def single(nums):
    """Every number appears twice except one. XOR all."""
    result = 0
    for n in nums: result ^= n
    return result
```

### Two non-duplicates (everything else appears twice)

```python
def two_singles(nums):
    xor = 0
    for n in nums: xor ^= n
    # any set bit distinguishes the two answers
    diff = xor & -xor
    a = b = 0
    for n in nums:
        if n & diff: a ^= n
        else: b ^= n
    return a, b
```

### Power of 2 / nearest power

```python
def is_pow2(x): return x > 0 and x & (x - 1) == 0
def next_pow2(x): return 1 if x <= 1 else 1 << (x - 1).bit_length()
```

### Reverse bits (32-bit)

```python
def reverse_bits_32(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)
        n >>= 1
    return result
```

### Gray code (position `i`)

```python
def gray(i): return i ^ (i >> 1)
```

Consecutive Gray codes differ in exactly one bit — used in mechanical encoders, hypercube traversals.

### Classic problems

| Problem | Trick |
|---|---|
| Single number (everyone twice + one single) | XOR all |
| Two singles | XOR + diff bit |
| Number of 1 bits | `x.bit_count()` |
| Power of 2 / 4 check | `x & (x-1)` |
| Count bits for all `i ∈ [0, n]` | `bits[i] = bits[i >> 1] + (i & 1)` |
| Bitwise AND of range `[L, R]` | common prefix of `L` and `R` |
| Gray code sequence | `i ^ (i >> 1)` |
| Subset sum via meet-in-the-middle | hash subsets by bitmask |
| Maximum XOR pair | trie of bits |
| Sum over all subsets | SOS DP |

### SOS DP (Sum Over Subsets) — `O(n · 2^n)`

```python
def sos_dp(f):
    """For each mask m, compute sum of f[sub] over all sub ⊆ m."""
    n = (len(f)).bit_length() - 1
    F = f[:]
    for i in range(n):
        for m in range(1 << n):
            if m & (1 << i):
                F[m] += F[m ^ (1 << i)]
    return F
```

## Reference View

### Why `x & -x` isolates the lowest set bit

In two's complement, `-x = ~x + 1`. The bits below the lowest set bit of `x` are all 0 in both `x` and `-x`, and at that bit `x` has 1 while `-x` also has 1 (because of the `+1` carry). All higher bits are complementary. So `x & -x` keeps only the lowest 1.

Used in **Fenwick trees** to walk partial-sum nodes.

### Popcount — hardware-accelerated

Modern CPUs have a POPCNT instruction (~1 cycle). Python exposes it via `int.bit_count()` (3.10+) or via `bin(x).count('1')` (slower). In C/C++: `__builtin_popcount(x)`.

For a 64-bit integer without hardware support, the SWAR trick:

```
x = x - ((x >> 1) & 0x5555555555555555)
x = (x & 0x3333333333333333) + ((x >> 2) & 0x3333333333333333)
x = (x + (x >> 4)) & 0x0f0f0f0f0f0f0f0f
popcount = (x * 0x0101010101010101) >> 56
```

### Parity via XOR

`x XOR x = 0`, `x XOR 0 = x`. Any pair of duplicates cancels. Used in:

- Find missing number in `[0..n]`.
- RAID parity (simple XOR parity).
- Hamming codes.
- Reed-Solomon (generalized over `GF(2^k)`).

### Bitwise subset operations (set theory over 32/64-bit universe)

| Op | Meaning |
|---|---|
| `a | b` | union |
| `a & b` | intersection |
| `a & ~b` | set difference |
| `a ^ b` | symmetric difference |
| `a & b == a` | `a ⊆ b` |
| `a & (a-1)` | `a` with lowest element removed |

### Python quirks

- Ints are arbitrary precision — no overflow, but `~x` is `-x - 1` (not bit-flipped of fixed width). For 32-bit, use `~x & 0xFFFFFFFF`.
- `>>` on negative ints is arithmetic (sign-preserving).
- `bin(-5)` is `'-0b101'`, not a two's-complement view.
- Use `int.to_bytes` and `int.from_bytes` for raw byte views.

### Complexity

| Operation | Time |
|---|---|
| Test/set/clear/toggle single bit | `O(1)` |
| Popcount | `O(1)` on hardware; `O(log w)` SWAR |
| Subset iteration of `m` | `O(2^{popcount(m)})` |
| Iterate all subsets of `[n]` | `O(2^n)` |
| Iterate all pairs `(sub, mask)` with `sub ⊆ mask` | `O(3^n)` (!) |
| SOS DP | `O(n · 2^n)` |

`3^n` comes from: for each element, it's either in `sub`, in `mask \ sub`, or outside `mask`.

### Pitfalls

- **Signed right shift in C/Java** — `>>` on negative is arithmetic; use `>>>` in Java, or cast to unsigned.
- **Python `~`** doesn't mask to a width — `~0 = -1`, not all ones of some width.
- **Overflow on `1 << 63`** in C/Java — use `1L << 63` or unsigned.
- **Checking "power of 2" for 0** — `0 & (-1) = 0` satisfies `x & (x-1) == 0` but 0 isn't a power of 2. Guard with `x > 0`.
- **Iterating subsets forgetting 0** — the `while sub > 0` loop doesn't run for `sub = 0`. Handle separately if needed.
- **XOR of big list** in Python is fine; in C, beware overflow only if using sized types.
- **Confusing Gray code with one-hot** — Gray is a reordering of `0..n-1` where consecutive differ in one bit; one-hot is completely different.

### Real-world uses

- **Feature flag storage** — bitmask of up to 64 flags in one int.
- **Compression (bitmap indexes)** — RoaringBitmap, EWAH.
- **Graph algorithms** on ≤ 20–22 vertices — adjacency bitmasks for fast neighbor-intersection.
- **Chess engines** — bitboards for piece positions.
- **Regex engines** — bit-parallel matching (e.g., bitap / Shift-Or / Myers bit-parallel edit distance).
- **Cryptography** — XOR is the core op of stream ciphers and AES' linear steps.
- **Error-correcting codes** — Hamming, Reed-Solomon, LDPC.
- **Compilers / SIMD** — popcount-based hashing, bitwise predication.
- **Fenwick trees / BITs** — `x & -x` navigation.
- **Bloom filters** — bitarray with multiple hash functions.

### When *not* to use

- Set size > 64 — use Python `set` or bitarray library; native ops lose their edge.
- Readability matters more than speed — write explicit ops.
- You're in Python and the constants are small — `set` is idiomatic and nearly as fast for many cases.
- Crypto-sensitive — timing attacks via branches on bits; use constant-time primitives.

## See Also

- [`gcd-modular.md`](gcd-modular.md) — modular exponentiation uses bit scan of exponent.
- [`combinatorics.md`](combinatorics.md) — Lucas' theorem via bit AND in `p = 2`.
- [`../dp-patterns/bitmask-dp.md`](../dp-patterns/bitmask-dp.md) — subsets as bitmasks.
- [`../paradigms/divide-and-conquer.md`](../paradigms/divide-and-conquer.md) — SWAR popcount is D&C on bits.
- [`../../data-structures/trees/fenwick.md`](../../data-structures/trees/fenwick.md) — `x & -x` navigation.
- [`../../data-structures/probabilistic/bloom-filter.md`](../../data-structures/probabilistic/bloom-filter.md) — bit arrays at scale.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
