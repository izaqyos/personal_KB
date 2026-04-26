# Counting Bloom Filter

> **Source:** Fan, Cao, Almeida, Broder (2000) "Summary Cache" + personal notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

A Bloom filter with **deletions**. Replace each bit with a small counter; `add` increments, `delete` decrements. Same `k` hashes, same query semantics as Bloom — "definitely not" or "probably yes" — but you can now take things out.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- You need Bloom-filter semantics **plus the ability to remove items**.
- Membership set changes over time (cache eviction, session expiry, content moderation blocklist with pardons).
- Streaming data where old items should be aged out.

**Not** when: you never delete (plain Bloom is 4× smaller), or when false *negatives* would be catastrophic (see caveat below — they're possible in practice).

---

## Interview View

### How it works in 30 seconds

1. Array of `m` small counters (typically 4 bits each), all zero.
2. `k` independent hash functions.
3. **add(x):** increment the `k` counters at `h_1(x)…h_k(x)`.
4. **delete(x):** decrement the same `k` counters.
5. **query(x):** return True iff **all** those counters are > 0.

Plain Bloom is the special case where counters saturate at 1 and can't decrement.

### Minimal Python implementation

```python
import hashlib

class CountingBloomFilter:
    def __init__(self, m: int, k: int, counter_bits: int = 4):
        self.m = m
        self.k = k
        self.max_count = (1 << counter_bits) - 1  # 15 for 4-bit
        self.counts = [0] * m

    def _positions(self, x: bytes):
        h1 = int.from_bytes(hashlib.md5(x).digest()[:8], 'big')
        h2 = int.from_bytes(hashlib.sha1(x).digest()[:8], 'big')
        for i in range(self.k):
            yield (h1 + i * h2) % self.m

    def add(self, x: bytes):
        for p in self._positions(x):
            if self.counts[p] < self.max_count:
                self.counts[p] += 1
            # else: saturated — this slot can never decrement accurately again

    def delete(self, x: bytes):
        """Caller must guarantee x was previously added. Otherwise silent corruption."""
        for p in self._positions(x):
            if 0 < self.counts[p] < self.max_count:
                self.counts[p] -= 1
            # if saturated, we can't safely decrement — leave alone

    def __contains__(self, x: bytes) -> bool:
        return all(self.counts[p] > 0 for p in self._positions(x))
```

### The counter-bits choice

- **4 bits per slot (max 15)** is the canonical default. Overflow probability at 1% FP design is ~`1.37 × 10^{-15}`. Safe for billions of inserts.
- **8 bits** if you're paranoid or insert-heavy.
- **2 bits** only if you know `k · n/m` is tiny — overflow will bite you.

### Memory

Vs plain Bloom: **4× the memory** for 4-bit counters (same `m`, same `k`). So ~40 bits per element for 1% FP rate vs 10 bits.

Worked rough sizing: 1 billion items at 1% FP → plain Bloom ~1.25 GB; counting Bloom ~5 GB.

### Classic problems

| Problem | Why CBF |
|---|---|
| Distributed cache "summary" with entry expiry | Original paper's use case (Squid proxies) |
| Session / token blocklist with revocation | Need delete |
| Network flow tracking with timeout | Need delete |
| Streaming dedup with sliding window | Age out old items |
| Reference-count membership for garbage collection | Counter value ≈ refcount |

---

## Reference View

### What breaks vs plain Bloom

Plain Bloom has **no false negatives by construction**. Counting Bloom *can* produce false negatives in two ways:

1. **Counter saturation + overflow dropped**. If a slot saturated at 15 and more adds arrived, you can't track them. When you delete the saturating key, you've lost count → future queries may return False for a key still "in" the set. The standard defense: pick counter width so saturation probability is negligible.
2. **Deleting a key that was never inserted**. Decrements counters that belong to other keys. A later query for those other keys may return False. **You must guarantee the caller tracks membership correctly** — CBF has no safety net.

This is why CBF is often paired with a "ground truth" exact set during maintenance, or deployed only where inserts and deletes are strictly paired (refcount semantics).

### FP rate — identical to Bloom

Same formula — the counter machinery doesn't change the math of "are all `k` bits nonzero":

```
p ≈ (1 - e^(-kn/m))^k
```

With the same `m/n` ratio, you get the same FP rate as Bloom. The 4× memory buys you *delete*, not better accuracy.

### Counter saturation math

A slot's count after `n` inserts with `k` hashes is binomial(`kn`, `1/m`), mean `kn/m`. For the 1%-FP-optimal point `kn/m = ln 2 ≈ 0.693`, P(count ≥ 16) on a 4-bit counter is astronomically small:

- Poisson approx P(X ≥ 16 | λ ≈ 0.693) ≈ `6.8 × 10^{-18}` per slot.
- Across a billion slots: ~`7 × 10^{-9}` chance of *any* saturation.

4 bits is overkill unless `k · n/m` is unusually large.

### Variants

| Variant | Change | Trade |
|---|---|---|
| **Spectral Bloom filter** | Variable-length counters, estimate multiplicities | More complex encoding |
| **d-left Counting Bloom** | Cuckoo-hash counters into d partitions | ~50% less space for same FP |
| **Quotient filter** | Linear-probed fingerprint storage | Better cache + resizeable (see cuckoo-filter.md) |
| **Cuckoo filter** | Fingerprint-based alternative | Usually better than CBF (see below) |

### CBF vs Cuckoo filter — the modern default

For new code, **Cuckoo filter is almost always a better choice** than Counting Bloom:

- Similar or smaller space (depending on target FP rate).
- Supports delete with no overflow risk — just matches fingerprints in buckets.
- Better cache locality (2 bucket probes vs `k` scattered slots).
- Drop-in semantics for add/delete/query.

CBF survives because it's simple to implement and merge (counter-wise add), and because of embedded systems / legacy code. New systems should evaluate Cuckoo.

### Complexity

| Op | Time | Memory |
|---|---|---|
| add | `O(k)` | — |
| delete | `O(k)` | — |
| query | `O(k)` | — |
| Full structure | — | `O(m)` counters × counter bits |

### Pitfalls

1. **Deleting a never-inserted key silently corrupts the filter** — no way to detect.
2. **Counter saturation** — at design loads, vanishingly rare for 4-bit; catastrophic for 2-bit at even moderate load. Size counters for peak expected `kn/m`.
3. **No false negatives only holds *if* saturation never occurs and all deletes match prior adds.** Unlike plain Bloom, this isn't automatic.
4. **Merging** — counter-wise add works for two CBFs with identical `m`, `k`, hashes. Result's counters may saturate though.
5. **4× memory cost** — if you don't actually delete, use plain Bloom.
6. **Use real hash functions** — MurmurHash3, xxHash, double-hashing trick. Python's `hash()` is process-randomized.

### Real-world uses

| System | Use |
|---|---|
| **Squid proxy cache** | "Summary cache" — original paper, tracks peer caches' contents |
| **Click-detection / ad-fraud pipelines** | Age out counted events |
| **Network flow monitoring** | Active-flow table with expiry |
| **Blockchain mempool membership with eviction** | Short-lived membership |
| **Streaming dedup with TTL** | Forget old fingerprints |
| **Reference counting in GC / COW filesystems** | Counter semantics fit directly |

---

## See Also

- [bloom-filter.md](bloom-filter.md) — the no-delete parent
- [cuckoo-filter.md](cuckoo-filter.md) — often the better choice for add/delete/query
- [count-min-sketch.md](count-min-sketch.md) — similar "counter grid" structure for frequency estimation
- [README.md](README.md) — probabilistic DS decision table
- [../README.md](../README.md) — top-level decision table
