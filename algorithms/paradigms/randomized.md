# Randomized Algorithms

- **Source:** distilled from CLRS + MR (Motwani-Raghavan) summaries
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

- Worst-case deterministic bounds are hard but **expected-case** bounds are easy (QuickSort/QuickSelect, hashing).
- You want to break symmetry or worst-case adversarial input (random pivots, random starts).
- Exact is infeasible, approximate is fine (sampling, sketches, Monte Carlo estimation).
- You need to avoid bad worst-case with no knowledge of inputs (randomized algorithms turn "bad inputs" into "bad coin flips").

Two flavors: **Las Vegas** (always correct, expected-fast) vs **Monte Carlo** (bounded error, always-fast).

## Interview View

### Quickselect — expected O(n)

```python
import random

def quickselect(nums, k):
    """Return the k-th smallest (0-indexed)."""
    nums = nums[:]  # don't mutate caller
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        pivot_idx = random.randint(lo, hi)
        pivot_idx = partition(nums, lo, hi, pivot_idx)
        if pivot_idx == k:
            return nums[k]
        elif pivot_idx < k:
            lo = pivot_idx + 1
        else:
            hi = pivot_idx - 1

def partition(a, lo, hi, p):
    pv = a[p]
    a[p], a[hi] = a[hi], a[p]
    store = lo
    for i in range(lo, hi):
        if a[i] < pv:
            a[store], a[i] = a[i], a[store]
            store += 1
    a[store], a[hi] = a[hi], a[store]
    return store
```

Expected `O(n)`, worst `O(n²)` (random pivots make worst-case adversarially hard to trigger).

### Reservoir sampling (k samples from a stream of unknown length)

```python
import random

def reservoir_sample(stream, k):
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir
```

Why uniform: by induction, after `n` items each has probability `k/n` of being in the reservoir.

### Randomized primality test (Miller-Rabin)

```python
import random

def miller_rabin(n, rounds=20):
    if n < 2: return False
    if n % 2 == 0: return n == 2
    d = n - 1; r = 0
    while d % 2 == 0:
        d //= 2; r += 1
    for _ in range(rounds):
        a = random.randrange(2, n - 1)
        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = (x * x) % n
            if x == n - 1:
                break
        else:
            return False
    return True  # probably prime
```

Monte Carlo: error ≤ `4^{-rounds}`. With 20 rounds, error ≤ `10^{-12}`.

### Classic randomized algorithms

| Algorithm | Flavor | Expected / Error bound |
|---|---|---|
| Quicksort (random pivot) | Las Vegas | expected `O(n log n)` |
| Quickselect | Las Vegas | expected `O(n)` |
| Karger's min cut | Monte Carlo | `Ω(1/n²)` correctness, repeat `n² log n` for high prob |
| Miller-Rabin | Monte Carlo | error ≤ `4^{-k}` |
| Reservoir sampling | — | exact uniform (LV) |
| Skip lists | Las Vegas | expected `O(log n)` per op |
| Treap | Las Vegas | expected `O(log n)` per op |
| Hash functions w/ random seed | — | defeats adversaries |
| Bloom filter | — | bounded false-positive rate |
| Count-Min / HLL sketches | Monte Carlo | probabilistic estimates |
| Simulated annealing, genetic algorithms | Monte Carlo | no guarantees, heuristic |

## Reference View

### Las Vegas vs Monte Carlo

| | Las Vegas | Monte Carlo |
|---|---|---|
| Answer correctness | always correct | correct with probability ≥ `1-ε` |
| Runtime | random (finite in expectation) | fixed |
| Example | Quicksort with random pivot | Miller-Rabin |

Trade-off: LV never lies but may run long; MC runs fast but can be wrong. For MC, run multiple rounds with independent randomness to crush the error bound.

### Boosting success probability

If one run succeeds with probability `p`, running `k` independent rounds succeeds with probability `1 - (1-p)^k`. For `p = 1/n²`, running `O(n² log n)` rounds gives `1 - 1/n` success (Karger's min cut).

### Randomized data structures

- **Skip list** — randomized balancing by coin flips. See [`../../data-structures/probabilistic/skip-list.md`](../../data-structures/probabilistic/skip-list.md).
- **Treap** — binary tree + random heap priorities → expected balanced.
- **Bloom filter / CMS / HLL** — probabilistic set / count / cardinality. See `../../data-structures/probabilistic/`.

### Randomization against adversaries

**Hash table collisions** — an attacker who knows your hash function can craft inputs that all collide. Python 3 randomizes the hash seed per process for exactly this reason (string/bytes hash randomization, PEP 456). Languages without this (older Java, PHP) were vulnerable to "hash-DoS."

### Complexity considerations

- Expected complexity != worst-case. When latency matters (real-time), consider the tail distribution.
- `Pr[time > c · E[time]] ≤ 1/c` (Markov) — for Quicksort this is much stronger via Chernoff bounds.
- Monte Carlo error compounds if you run dependent rounds — use independent randomness (cryptographic RNG if the application is adversarial).

### Pitfalls

- **Using `random` for crypto** — Python's `random` is Mersenne Twister, fast but predictable. Use `secrets` for passwords/tokens.
- **Seed reuse across runs** — reproducibility is good for tests, terrible for production randomness.
- **Assuming independence** where there isn't any (e.g., sampling from a stream where items correlate).
- **Thin error bounds on too few rounds** — always translate "probability of failure ≤ X" into the number of rounds you run.
- **Floating-point sampling bias** — `random.random() * n` isn't uniform over integers; use `randint` / `randrange`.

### Real-world uses

- **Load balancing — power of two choices.** Hash each request to 2 servers, send to less-loaded. Exponentially better balance than random.
- **Distributed consensus — randomized leader election** in protocols like Ben-Or's, Rabin's synchronous consensus.
- **Cryptography — nonces, keys, salts, random padding.**
- **ML — SGD, mini-batching, dropout, random forests, feature hashing.**
- **Databases — random sampling for statistics, reservoir sampling for top-N estimates.**
- **Networking — randomized exponential backoff** (classic CSMA/CD, TCP retry).
- **Simulation — Monte Carlo integration, MCMC.**
- **Testing — fuzzing, property-based testing (QuickCheck, Hypothesis).**

### When *not* to use

- Reproducibility is required and the random choices aren't seedable in a consistent way.
- Adversary controls randomness (bad PRNG, predictable seed).
- Deterministic algorithm is comparably simple and fast.
- Mission-critical correctness with no tolerance for even tiny error (avionics, pacemakers): prefer deterministic unless the error is provably negligible.

## See Also

- [`divide-and-conquer.md`](divide-and-conquer.md) — randomized quicksort/quickselect.
- [`approximation.md`](approximation.md) — randomized rounding for approx.
- [`../../data-structures/probabilistic/`](../../data-structures/probabilistic/) — Bloom, HLL, skip list, CMS, reservoir, MinHash.
- [`../number-theory/primes.md`](../number-theory/primes.md) — Miller-Rabin.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
