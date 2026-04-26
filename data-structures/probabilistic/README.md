# Probabilistic Data Structures

> **Source:** Personal notes + distilled from various papers
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Trade **exact answers** for **dramatically lower memory / faster operations**, usually with **tunable error bounds**.

---

## Table of Contents

- [When to Use Probabilistic DS](#when-to-use-probabilistic-ds)
- [The Core Trick — Hashing as Dimension Reduction](#the-core-trick--hashing-as-dimension-reduction)
- [Decision Table](#decision-table)
- [Complexity Comparison](#complexity-comparison)
- [Files in This Section](#files-in-this-section)
- [See Also](#see-also)

---

## When to Use Probabilistic DS

You're handling **streaming / large-scale data** and can tolerate small, quantified error in exchange for:

1. **Sub-linear memory** — billions of items in kilobytes
2. **Constant-time ops** regardless of data size
3. **Mergeable state** — combine partial results across workers/shards

Typical contexts:
- Streaming analytics, log pipelines
- Database query planning (selectivity estimates)
- CDN / cache admission control
- Security (dedup URLs, detect heavy hitters)
- Network monitoring
- Search engines (dedup document fingerprints)

If you have **exact** requirements and data fits in RAM, use exact structures ([hash set](../hash-based/sets.md), sorted index, etc.).

---

## The Core Trick — Hashing as Dimension Reduction

Every probabilistic DS here relies on the same insight:

> A good hash function maps inputs uniformly into a fixed-size space. You can then use **array position(s) + bit tricks + counts** to extract aggregate properties — *without storing the items themselves*.

- **Bloom filter** — multiple hashes set bits; "maybe in set or definitely not"
- **Count-Min Sketch** — multiple hashes index counters; min across is the estimated count
- **HyperLogLog** — hash → count leading zeros → infer cardinality from maximum
- **MinHash** — hash permutations → min value signatures → Jaccard similarity
- **Reservoir sampling** — uniform probability via counter, not hash, but same "sublinear state" theme

---

## Decision Table

| You want to... | Use | Memory | Error |
|----------------|-----|--------|-------|
| Check "is X in the set?" on a huge set | **[Bloom filter](bloom-filter.md)** | ~10 bits/item | False positives (tunable) |
| ...and be able to delete | **Counting Bloom** / **Cuckoo filter** | ~2× Bloom | False positives |
| Count **unique items** in a stream | **[HyperLogLog](hyperloglog.md)** | 12 KB for 2% error on billions | ±2% typical |
| Count **frequency** of items | **[Count-Min Sketch](count-min-sketch.md)** | O(w·d) | Over-count only, bounded |
| Uniform **random sample** from unknown-size stream | **[Reservoir sampling](reservoir-sampling.md)** | O(k) | None (uniform) |
| Estimate **set similarity** (Jaccard) | **[MinHash](minhash.md)** | O(k) signatures | ±1/√k |
| Ordered search with O(log n) but simpler than balanced tree | **[Skip list](skip-list.md)** | Expected O(n) | None (just randomized structure) |
| Heavy-hitter detection (top-k frequent) | **Count-Min + heap** | O(w·d + k) | Bounded |
| Quantile estimation on stream | **t-digest, GK-sketch, q-digest** | Kilobytes | ±~1% |

---

## Complexity Comparison

| Structure | Time (per op) | Space | Deterministic? | Mergeable? |
|-----------|---------------|-------|----------------|------------|
| Bloom filter | O(k) | O(n) bits | Yes (insert/query) | ✓ (OR) |
| Counting Bloom | O(k) | O(n) counters | Yes | ✓ (add) |
| Cuckoo filter | O(1) avg | O(n) cells | Yes | Partial |
| Count-Min Sketch | O(d) | O(w·d) | Yes | ✓ (add) |
| HyperLogLog | O(1) | **O(log log n)** | Yes | ✓ (max) |
| MinHash (k hashes) | O(k) | O(k) | Yes | ✓ (pairwise min) |
| Skip list | O(log n) expected | O(n) expected | No (random insert) | N/A |
| Reservoir sampling | O(1) | O(k) | No | Possible (weighted) |

*n = items seen; w, d = sketch width/depth; k = hash count or sample size.*

---

## Files in This Section

- [bloom-filter.md](bloom-filter.md) — approximate membership, no-false-negatives
- [counting-bloom-filter.md](counting-bloom-filter.md) — Bloom + delete (counters instead of bits)
- [cuckoo-filter.md](cuckoo-filter.md) — add/delete/query via fingerprint cuckoo hashing; usually the modern default
- [count-min-sketch.md](count-min-sketch.md) — approximate frequency
- [hyperloglog.md](hyperloglog.md) — approximate cardinality (unique count)
- [skip-list.md](skip-list.md) — probabilistic ordered search
- [reservoir-sampling.md](reservoir-sampling.md) — streaming uniform sample
- [minhash.md](minhash.md) — set similarity

---

## See Also

- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — exact membership
- [../hash-based/sets.md](../hash-based/sets.md)
- [../../system-design/redis/](../../system-design/redis/) — Redis has native HLL (`PFADD`/`PFCOUNT`) and Bloom filter module (RedisBloom)
- [../README.md](../README.md) — top-level decision table
