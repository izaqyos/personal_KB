# HyperLogLog

> **Source:** Flajolet, Fusy, Gandouet, Meunier (2007) + Google improvements
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Estimate **cardinality** (number of distinct items) in **O(log log n)** memory. The star probabilistic DS — counts billions of uniques in **~12 KB**.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- "How many unique visitors / IPs / queries / URLs?"
- Need approximate count with tiny memory
- Need to **merge** counts across shards / time windows — HLLs merge trivially
- **Not** when: you need exact count (use hash set), need the items themselves, or the set fits in RAM

**Canonical workload:** "Unique daily active users across 1000 servers, merged at end of day."

---

## Interview View

### The Intuition in One Paragraph

Hash each item to a uniformly-random bit string. Count the number of **leading zeros** in each hash. The maximum number of leading zeros `ρ_max` you've ever seen tells you roughly how many distinct items you've hashed:

- 1 leading zero is as likely as flipping tails once → expected after ~2 uniques
- `ρ` leading zeros → expected after ~2^ρ uniques
- So **cardinality ≈ 2^ρ_max**

That's it. HLL just makes this estimator less noisy by splitting items into buckets and averaging.

### The Algorithm (Sketch)

1. Decide `m = 2^b` buckets (more buckets = less error)
2. For each incoming item x:
   - Hash: `h = hash(x)`
   - Use the top `b` bits as bucket index `j`
   - In the remaining bits, count leading zeros + 1 → `ρ`
   - `registers[j] = max(registers[j], ρ)`
3. Estimate:
   - Harmonic mean of `2^registers[j]` across buckets, times a correction constant

### Accuracy

Standard error: **σ ≈ 1.04 / √m**

| Buckets m | Bits b | Memory | Error σ |
|-----------|--------|--------|---------|
| 1024 | 10 | ~640 B | ~3.25% |
| 4096 | 12 | ~2.5 KB | ~1.63% |
| **16384** | **14** | **~12 KB** | **~0.81%** ← Redis default |
| 65536 | 16 | ~48 KB | ~0.41% |

### Minimal Python Implementation

```python
import hashlib
import math

class HyperLogLog:
    def __init__(self, b: int = 14):
        self.b = b
        self.m = 1 << b
        self.registers = [0] * self.m
        # Bias-correction constant α_m (Flajolet et al. Table 1)
        if self.m == 16: self.alpha = 0.673
        elif self.m == 32: self.alpha = 0.697
        elif self.m == 64: self.alpha = 0.709
        else: self.alpha = 0.7213 / (1 + 1.079 / self.m)

    def add(self, item: bytes):
        h = int(hashlib.sha1(item).hexdigest(), 16)
        # Top b bits = bucket
        j = h >> (160 - self.b)
        # Remaining bits — count leading zeros + 1
        w = h & ((1 << (160 - self.b)) - 1)
        rho = (160 - self.b) - w.bit_length() + 1 if w else (160 - self.b) + 1
        self.registers[j] = max(self.registers[j], rho)

    def count(self) -> int:
        Z = 1.0 / sum(2.0 ** -r for r in self.registers)
        E = self.alpha * self.m * self.m * Z

        # Small-range correction: linear counting when many registers are zero
        zeros = self.registers.count(0)
        if E <= 2.5 * self.m and zeros:
            E = self.m * math.log(self.m / zeros)
        return int(E)

    def merge(self, other: "HyperLogLog"):
        assert self.b == other.b
        self.registers = [max(a, b) for a, b in zip(self.registers, other.registers)]
```

### Why Python's `hash()` Is a Bad Choice Here

Randomized per process. Use SHA-1 or xxHash for cross-process consistency.

---

## Reference View

### Core Insight — "log log n"

To store counts up to N, you need:
- Hash set: O(N) items × pointer size ⇒ **O(N log N) bits**
- Naive counter: O(log N) bits
- **HyperLogLog: O(log log N) bits per register**, O(m · log log N) total

For N = 10⁹:
- log N ≈ 30 → max `ρ` needs 5 bits per register
- Registers: 16384 × 5 bits ≈ 10 KB
- Error: < 1%

### Variants

| Variant | Improvement |
|---------|-------------|
| **LogLog** (Durand-Flajolet 2003) | Original; used arithmetic mean, ~30% worse error |
| **HyperLogLog** (Flajolet et al. 2007) | Harmonic mean of `2^register` → massive improvement |
| **HyperLogLog++** (Google, Heule et al. 2013) | Sparse representation for small cardinalities, better bias correction at medium range, 64-bit hash. **The version used in Redis and BigQuery.** |
| **Sliding HLL** | Time-windowed unique counts |
| **TailCut / HLL-TailCut+** | Compression for lots of HLLs |

### Key Properties

| Property | Value |
|----------|-------|
| Error | σ ≈ 1.04/√m (~0.81% for m=16384) |
| Memory | O(m · log log n) — typically 12 KB |
| Add | O(1) |
| Count | O(m) — still tiny, constant-ish |
| **Mergeable** | ✓ Element-wise max of registers |
| **Intersection** | Not directly; use inclusion-exclusion with ± error |
| Insertion-order independent | ✓ |

### Merge Is Perfect

Merging two HLLs: take element-wise max of registers. **This merge is exact** — the resulting HLL is identical to one built from the union of the original streams. Unmatched in distributed aggregation.

→ In Redis: `PFMERGE dest src1 src2 src3`

### Intersection Is Not Free

HLL doesn't support direct intersection. Workaround:

```
|A ∩ B| = |A| + |B| − |A ∪ B|
```

Compute each via HLL. Problem: error accumulates, and |A ∩ B| might be small relative to |A| + |B|. For small intersections, large relative error.

### Real-World Uses

| System | Use |
|--------|-----|
| **Redis** | `PFADD key item...`, `PFCOUNT key`, `PFMERGE dest src...` — native data type since 2.8.9 |
| **Google BigQuery** | `APPROX_COUNT_DISTINCT()` — HLL++ under the hood |
| **PostgreSQL `hll` extension** | Mergeable HLLs as a column type |
| **Amazon Redshift** | `APPROXIMATE COUNT(DISTINCT ...)` |
| **Apache Druid / Pinot** | Sketch columns for instant unique-count queries |
| **Snowflake** | `APPROX_COUNT_DISTINCT()` |
| **DataSketches (Apache)** | Java/C++ sketch library used by LinkedIn, Yahoo |

### When to Use Redis HLL

```
PFADD dailyUsers user:123 user:456 user:789
PFCOUNT dailyUsers              # ~3
PFMERGE weekly daily:mon daily:tue daily:wed  # combine days
PFCOUNT weekly                  # unique users across days
```

Each HLL key costs **12 KB** regardless of how many items you add. You can track a million HLL keys in ~12 GB.

### Pitfalls

1. **Confusing with frequency** — HLL counts uniques, not how many times. For frequencies use [Count-Min Sketch](count-min-sketch.md).
2. **Per-process `hash()`** — inconsistency across workers / restarts. Use deterministic hash.
3. **Small cardinalities** — naive HLL is biased for small N. HLL++ uses linear counting for this range.
4. **Expecting exact** — error is a fixed ~1% relative, not 0.
5. **Interpreting merge as union** — yes, but of the streams, not the estimates. Adding two HLL estimates is wrong; merge the sketches first, then count.

### Related: log log n Intuition

The "log log n" space is remarkable because:
- Counting to n naively: ~log₂(n) bits
- But the **max value in n random draws of leading-zero counts** itself is ~log₂(log₂(n))
- HLL stores m of these, each log log n bits → O(m log log n) total

This is why Flajolet called the original paper's algorithm "LogLog" — the name sticks.

---

## See Also

- [bloom-filter.md](bloom-filter.md)
- [count-min-sketch.md](count-min-sketch.md)
- [minhash.md](minhash.md) — similarity sketch
- [README.md](README.md) — probabilistic overview
- [../hash-based/sets.md](../hash-based/sets.md) — exact alternative
- [../../system-design/redis/redis-primer.md](../../system-design/redis/redis-primer.md) — Redis HLL commands
- [../README.md](../README.md) — decision table
