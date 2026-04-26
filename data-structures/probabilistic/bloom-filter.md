# Bloom Filter

> **Source:** Bloom (1970) + personal notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Probabilistic set membership. **"X is definitely not in the set"** or **"X is probably in the set"**.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Quick "probably present" check **before** an expensive exact lookup (disk, RPC)
- Huge set that won't fit in RAM as a hash set
- Deduplicate streaming events where occasional duplicates are OK
- **Not** when: you cannot tolerate false positives, you need to list members, you need to delete (use Counting Bloom or Cuckoo filter)

Canonical workload: **"don't ask the database / S3 if this key exists — the Bloom filter already says no."**

---

## Interview View

### How It Works in 30 Seconds

1. Bit array of size `m`, all zeros
2. `k` independent hash functions: `h_1, h_2, ..., h_k`
3. **Insert(x):** set bits at `h_1(x) % m, h_2(x) % m, ...` to 1
4. **Query(x):** return True iff **all** those bits are 1

**No false negatives** (if you inserted it, all bits are set). **False positives possible** (other inserts may have set those same bits).

### Minimal Python Implementation

```python
import hashlib
from bitarray import bitarray  # or use int + bit ops

class BloomFilter:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.bits = bitarray(m)
        self.bits.setall(0)

    def _hashes(self, item: bytes):
        # Double-hashing trick: derive k hashes from 2 real hashes
        h1 = int(hashlib.md5(item).hexdigest(), 16)
        h2 = int(hashlib.sha1(item).hexdigest(), 16)
        for i in range(self.k):
            yield (h1 + i * h2) % self.m

    def add(self, item: bytes):
        for idx in self._hashes(item):
            self.bits[idx] = 1

    def __contains__(self, item: bytes) -> bool:
        return all(self.bits[idx] for idx in self._hashes(item))
```

### Without Extra Libraries (pure Python)

```python
class BloomFilter:
    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.bits = 0  # big int as bit array

    def _hashes(self, s: str):
        h1 = hash(("a", s)) & ((1 << 64) - 1)
        h2 = hash(("b", s)) & ((1 << 64) - 1)
        for i in range(self.k):
            yield (h1 + i * h2) % self.m

    def add(self, s):
        for i in self._hashes(s):
            self.bits |= 1 << i

    def __contains__(self, s):
        return all((self.bits >> i) & 1 for i in self._hashes(s))
```

### Sizing — the formulas you'll be asked

Given desired false-positive rate `p` and expected items `n`:

```
m = -(n * ln p) / (ln 2)^2         # bit array size
k = (m / n) * ln 2                 # number of hash functions
```

Rules of thumb:
- **~10 bits per item** gives ~1% false positive rate
- **~15 bits per item** gives ~0.1%
- **Optimal k ≈ 7** for 1% FP rate

```python
import math

def optimal_params(n: int, p: float) -> tuple[int, int]:
    m = math.ceil(-n * math.log(p) / (math.log(2) ** 2))
    k = max(1, round((m / n) * math.log(2)))
    return m, k
```

---

## Reference View

### Properties

| Property | Value |
|----------|-------|
| **False negatives** | Never |
| **False positives** | Yes, rate tunable |
| **Delete** | Not supported (clearing a bit could affect other keys) |
| **Memory** | O(n) bits, ~10 bits/item for 1% FP |
| **Lookup** | O(k) hash ops |
| **Merge** | Bitwise OR two filters (same m, same hashes) |

### Error Analysis

Probability that a specific bit is **still 0** after n inserts with k hashes:

```
P(bit 0) = (1 - 1/m)^(k·n) ≈ e^(-k·n/m)
```

False positive probability:

```
p ≈ (1 - e^(-k·n/m))^k
```

Minimize over k: `k* = (m/n) · ln 2`, giving optimal p ≈ `(1/2)^k = 0.6185^(m/n)`.

### Capacity Table

| Bits per item (m/n) | Optimal k | FP rate |
|---------------------|-----------|---------|
| 5 | 3 | ~9% |
| 8 | 5 | ~2.1% |
| 10 | 7 | ~1.0% |
| 15 | 10 | ~0.16% |
| 20 | 14 | ~0.02% |
| 30 | 21 | ~10⁻⁴ |

→ For 1 billion items at 1% FP, you need ~1.25 GB. Compare to a hash set: 100+ GB.

### Variants

| Variant | Feature | Tradeoff |
|---------|---------|----------|
| **Counting Bloom filter** | Delete supported (counters instead of bits) | 4× memory typically |
| **Scalable Bloom filter** | Grows as items added | Chain of filters, slightly worse FP |
| **Partitioned Bloom** | Each hash gets its own bit range | Simpler analysis |
| **Cuckoo filter** | Supports delete, better cache behavior, lower FP/bit | Has a tiny chance of insert failure when full |
| **Quotient filter** | Better cache behavior, resizable, delete | More complex |
| **Bloomier filter** | Stores function values, not just membership | Specialized |
| **Stable Bloom filter** | Forgets over time (FIFO flavor) | Useful for streams |

**When to prefer Cuckoo filter over Bloom:**
- Need delete
- Want better lookup cache behavior
- Need slightly better space-accuracy tradeoff
- Can tolerate occasional "too full to insert" failure

### The Hash Functions — the double-hashing trick

In principle, a Bloom filter needs `k` independent hash functions. Implementing `k` different hashes is inconvenient and slow — each one adds a full pass over the input. In practice, you only compute **two** real hashes and derive the other `k - 2` cheaply.

**Kirsch & Mitzenmacher (2008)** proved that for any target FP rate, the sequence

```
h_i(x) = h_1(x) + i · h_2(x)   mod m,   for i = 0, 1, ..., k-1
```

yields a false-positive rate **asymptotically identical** to `k` independent hashes. The intuition: even though `h_i` are not independent (they're linear in `i`), the distribution of the `k` chosen positions is uniform enough that Bloom's analysis carries over.

Why it works in practice:

- `h_1(x)` picks a random starting bit.
- `h_2(x)` picks a random stride.
- `(h_1 + i·h_2) mod m` walks a pseudo-random arithmetic progression through `[0, m)`.
- If `gcd(h_2, m) = 1`, the walk hits `k` distinct positions with near-uniform distribution.

In code:

```python
def _positions(self, x: bytes):
    h1 = int.from_bytes(hashlib.md5(x).digest()[:8], 'big')
    h2 = int.from_bytes(hashlib.sha1(x).digest()[:8], 'big')
    return [(h1 + i * h2) % self.m for i in range(self.k)]
```

Reading it piece by piece:

- `hashlib.md5(x).digest()[:8]` — MD5 the input, take the first 8 bytes of the 16-byte digest.
- `int.from_bytes(..., 'big')` — interpret those 8 bytes as a 64-bit unsigned integer. That's `h_1`.
- Same for SHA-1 → `h_2`.
- The list comprehension generates `k` indices `(h1 + 0·h2), (h1 + 1·h2), ..., (h1 + (k-1)·h2)`, each mod `m` to fit into the bit array.

One MD5 + one SHA1 pass, `k` cheap `ADD + MUL + MOD` ops. For `k = 7`, that's a 3–4× speedup over computing 7 full hashes.

MD5 and SHA1 are overkill quality-wise (and slower than needed). Production implementations use:

- **MurmurHash3** — fast, non-cryptographic, uniform distribution. De-facto standard.
- **xxHash (xxh64 / xxh3)** — faster than Murmur, same distribution quality.
- **CityHash / FarmHash** — Google's variants, similar performance.
- **FNV** — simple but weaker distribution; avoid for Bloom.
- **Don't use Python's `hash()`** — randomized per process (PEP 456), so a filter written on one run can't be queried by another run or machine.

The `h_2` output also needs to be odd (or at least coprime to `m`) for the walk to visit `k` distinct positions when `m` is a power of 2. Most implementations either set `m` to a prime or OR `h_2` with 1.

### Real-World Uses

| System | Use |
|--------|-----|
| **Google Bigtable / HBase / Cassandra** | Skip SSTable disk read if filter says key not present |
| **Chrome / Safari** | Safe Browsing — "is this URL malicious?" |
| **Squid / Akamai** | Cache admission control (don't cache one-hit wonders) |
| **Bitcoin SPV clients** | Request only transactions matching a Bloom filter (privacy tradeoff) |
| **Medium's Recommendation** | Articles already seen by user |
| **PostgreSQL** | `bloom` index extension for equality queries on many columns |
| **CDN edge cache** | "Have we seen this URL before?" before fetching origin |
| **Redis (RedisBloom module)** | `BF.ADD`, `BF.EXISTS` |

### The Pattern: "Negative Cache"

Bloom filter in front of an expensive oracle:

```
request → bloom.contains(key)?
   ├─ No  → definitely absent → return 404 immediately (save DB hit)
   └─ Yes → probably present → query DB (may be a false positive)
```

This is the dominant production pattern. You save **most** of the DB/disk/network calls at tiny memory cost.

### Why "usually no" is the sweet spot — worked example

Bloom only helps on the **"no" path** (true negatives). Keys that are actually in the set always return "yes" from the filter (no false negatives), so they hit the DB regardless. The ceiling on savings is the **miss count**, and Bloom captures ~`(1 - p)` of those. **The FP rate applies only to the actually-absent subset — not to all queries.**

Assume 100 queries, 1% FP rate.

**Case A — 90% hit rate (keys usually present):**

- 90 queries, key IS in DB → Bloom says "yes" (always) → 90 DB lookups
- 10 queries, key NOT in DB → Bloom says "no" 99% (~9.9 skipped), "yes" 1% (~0.1 wasted DB lookups)
- **Total: ~90.1 DB lookups. Saved ~9.9 out of 100.**

**Case B — 10% hit rate (keys usually absent):**

- 10 queries, key IS in DB → 10 DB lookups
- 90 queries, key NOT in DB → ~89.1 skipped, ~0.9 FP hits
- **Total: ~10.9 DB lookups. Saved ~89 out of 100.**

| Scenario | True negatives (max savings) | Captured at 1% FP | Actual DB lookups | % saved |
|---|---|---|---|---|
| 90% hit rate | 10 | ~9.9 | ~90.1 | ~10% |
| 50% hit rate | 50 | ~49.5 | ~50.5 | ~50% |
| 10% hit rate | 90 | ~89.1 | ~10.9 | ~89% |

Savings scale directly with miss rate. This is why Bloom ships in every LSM database: per-SSTable miss rates are ~90%+, so Bloom eliminates ~9 of every 10 disk seeks.

### Pitfalls

1. **Using `hash()` in Python** — different hash per process ⇒ filter unusable after restart
2. **Wrong sizing** — undersized filter has FP rate skyrocketing as you pass capacity; always size for expected growth
3. **Deleting by clearing bits** — silently corrupts the filter. Use Counting Bloom.
4. **Merging filters with different m or hash fns** — not valid
5. **Assuming Bloom = compact hash set** — you can't iterate membership

---

## See Also

- [README.md](README.md) — overview
- [counting-bloom-filter.md](counting-bloom-filter.md) — Bloom + delete via counters
- [cuckoo-filter.md](cuckoo-filter.md) — usually the modern default when you need add/delete/query
- [count-min-sketch.md](count-min-sketch.md) — similar hashing trick for counts
- [hyperloglog.md](hyperloglog.md) — similar approach for cardinality
- [../hash-based/sets.md](../hash-based/sets.md) — exact alternative
- [../../system-design/redis/](../../system-design/redis/) — RedisBloom module
- [../README.md](../README.md) — top-level decision table
