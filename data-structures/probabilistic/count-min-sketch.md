# Count-Min Sketch

> **Source:** Cormode & Muthukrishnan (2005)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Frequency estimator for data streams. Think "Bloom filter, but for counts".

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Streaming frequency estimation — **"how many times has X appeared?"**
- Heavy-hitter detection — find items appearing > some threshold
- Replacing a full `Counter` when the key space is huge
- **Not** when: you need exact counts, or you need to know the items themselves (sketch doesn't store keys)

**Canonical workload:** "What are the top-100 most-queried search terms today across 10 billion queries?"

---

## Interview View

### Structure

A **2D array of counters**: `d` rows × `w` columns.

Each row has its own hash function `h_i : key → [0, w)`.

```
        col 0  col 1  col 2  ...  col w-1
row 0 [  0      0      0     ...   0  ]   h_0
row 1 [  0      0      0     ...   0  ]   h_1
row 2 [  0      0      0     ...   0  ]   h_2
...
row d-1[ 0      0      0     ...   0  ]   h_{d-1}
```

### Operations

- **Add(x, c=1):** for each row i, increment `counter[i][h_i(x)]` by c
- **Count(x):** return **min** across rows: `min_i counter[i][h_i(x)]`

**Why min?** Collisions can only *inflate* counts. The minimum across rows is the "least contaminated" estimate — that's the best lower bound.

### Minimal Python

```python
import hashlib

class CountMinSketch:
    def __init__(self, w: int, d: int):
        self.w = w
        self.d = d
        self.table = [[0] * w for _ in range(d)]

    def _hashes(self, s: bytes):
        for i in range(self.d):
            h = int(hashlib.md5(i.to_bytes(2, 'big') + s).hexdigest(), 16)
            yield h % self.w

    def add(self, s: bytes, c: int = 1):
        for i, idx in enumerate(self._hashes(s)):
            self.table[i][idx] += c

    def count(self, s: bytes) -> int:
        return min(self.table[i][idx] for i, idx in enumerate(self._hashes(s)))
```

### Heavy Hitters (Top-K)

Combine CMS with a min-heap of candidate top items:

```python
import heapq
from collections import defaultdict

class TopK:
    def __init__(self, k: int, w: int, d: int):
        self.cms = CountMinSketch(w, d)
        self.k = k
        self.heap = []        # (count, item) min-heap
        self.in_heap = {}     # item -> count

    def add(self, item: bytes):
        self.cms.add(item)
        est = self.cms.count(item)
        if item in self.in_heap:
            self.in_heap[item] = est
            # Lazy: next pop will reflect updated value
        elif len(self.heap) < self.k:
            heapq.heappush(self.heap, (est, item))
            self.in_heap[item] = est
        elif est > self.heap[0][0]:
            _, old = heapq.heapreplace(self.heap, (est, item))
            del self.in_heap[old]
            self.in_heap[item] = est
```

### Sizing

Given target error `ε` (additive, as fraction of stream size N) and confidence `δ`:

```
w = ⌈e / ε⌉
d = ⌈ln(1 / δ)⌉
```

**Rule of thumb:** for ε = 0.001 (0.1% of stream size) and δ = 0.01 (99% confidence):
- w ≈ 2,718
- d ≈ 5
- Total counters: ~13,600. Tiny.

---

## Reference View

### Error Guarantee (additive)

For item x with true count c(x), let N = sum of all counts:

```
P[ estimate(x) ≤ c(x) + ε·N ] ≥ 1 − δ
```

- **Never underestimates** — `estimate(x) ≥ c(x)` always
- Error is **additive in N**, not in c(x) — great for heavy hitters (their count dominates), weaker for rare items

### Operations & Complexity

| Op | Time | Space |
|----|------|-------|
| Add | O(d) | — |
| Count | O(d) | — |
| Merge | O(w·d) | — |
| Memory | O(w·d) counters | — |

**Merge:** element-wise addition of two sketches (if built with same w, d, hash fns). Perfect for distributed aggregation.

### Variants

| Variant | Idea | Use |
|---------|------|-----|
| **Count-Min Sketch (CMS)** | Basic version | Standard |
| **Count-Mean-Min (CMM)** | Subtract estimated noise before taking min | Better for low-frequency items |
| **Conservative update** | Only increment the counter(s) equal to the current min | Tighter bound for heavy hitters |
| **Count Sketch** | Signs ±1 per row; average, not min | Better for frequencies with both signs (deletes) |
| **ASketch** | Partition: exact for frequent, CMS for tail | Better accuracy at cost of some mgmt |

### CMS vs Count Sketch

- **CMS** (Cormode-Muthukrishnan): always overestimates, good for positive streams
- **Count Sketch** (Charikar-Chen-Farach-Colton): unbiased, good for deletions / signed updates, but higher variance per point

### CMS vs Counter/Dict

| | CMS | `collections.Counter` |
|--|-----|----------------------|
| Memory | O(w·d) independent of # keys | O(# distinct keys) |
| Add | O(d) | O(1) |
| Count | O(d), approximate | O(1), exact |
| Supports enumeration | ✗ | ✓ |
| Mergeable across workers | ✓ | ✓ |

Use CMS when the key space is huge (billions of URLs, IPs, search queries) and exact counts aren't needed.

### Real-World Uses

| System | Use |
|--------|-----|
| **Redis (RedisBloom)** | `CMS.INITBYPROB`, `CMS.INCRBY`, `CMS.QUERY` |
| **Apache Spark / Flink** | Heavy hitters in streaming windows |
| **Cloudflare / CDNs** | Per-IP request rate monitoring, DDoS detection |
| **Database query optimizers** | Join selectivity estimation (e.g. Presto, Vertica) |
| **AT&T / network monitoring** | Per-flow bandwidth estimation |
| **Google Zetta / analytics** | Top-K queries on huge streams |

### Pitfalls

1. **Reusing the same hash** across rows — destroys the guarantee. Use seeded/salted hashes.
2. **Quoting "within ε·N"** — error scales with total stream size, which can be huge. Be careful when reporting to end users.
3. **Negative counts** — basic CMS doesn't support; use Count Sketch if needed
4. **Using for cardinality** — CMS estimates frequency, not unique count. Use [HyperLogLog](hyperloglog.md).

---

## See Also

- [bloom-filter.md](bloom-filter.md) — similar hashing trick for membership
- [hyperloglog.md](hyperloglog.md) — cardinality (unique count)
- [reservoir-sampling.md](reservoir-sampling.md) — other streaming primitive
- [README.md](README.md) — probabilistic overview
- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — exact alternative
- [../README.md](../README.md) — decision table
