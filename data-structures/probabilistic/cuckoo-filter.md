# Cuckoo Filter

> **Source:** Fan, Andersen, Kaminsky, Mitzenmacher (2014) "Cuckoo Filter: Practically Better Than Bloom" + personal notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Approximate set membership with **add, delete, and query**. Usually the right modern choice over Bloom / Counting Bloom: smaller at FP ≤ 3%, supports delete natively, better cache behavior. Based on cuckoo hashing of compact **fingerprints** (not the items themselves).

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- You need Bloom-filter-style approximate membership **and** delete support.
- Your target FP rate is ≤ ~3% (sweet spot; at lower targets Cuckoo beats both Bloom and CBF on space).
- Throughput and cache behavior matter (lookup touches only 1–2 cache lines).
- You're okay with a rare "table full" insert failure — you must resize or accept the miss.

**Not** when: your FP target is very loose (> 3% — Bloom still wins on bits/item there), or when you can't tolerate insert failure at all.

---

## Interview View

### How it works in 30 seconds

1. Array of `m` **buckets**, each holding up to `b` slots (typically `b = 4`).
2. Each item gets a compact **fingerprint** `f(x)` — say 8 bits.
3. Item has **two candidate buckets**, `i_1` and `i_2`, related by:

   ```
   i_1 = hash(x) % m
   i_2 = i_1 XOR hash(f)        # partial-key cuckoo hashing
   ```

4. **add(x):** place fingerprint `f` in either bucket if there's room. If full, **evict** a random fingerprint there, recompute its alternate bucket, retry. Fail after ~500 evictions.
5. **query(x):** check if `f` appears in `i_1` or `i_2`.
6. **delete(x):** remove one copy of `f` from `i_1` or `i_2`.

The **partial-key cuckoo trick** (bucket XOR'd by fingerprint hash) is what makes deletion work: you can evict a fingerprint and still know its "other" bucket without needing the original key.

### Minimal Python implementation

```python
import random, hashlib

class CuckooFilter:
    def __init__(self, m: int, bucket_size: int = 4, fp_bits: int = 8, max_kicks: int = 500):
        self.m = m
        self.b = bucket_size
        self.fp_mask = (1 << fp_bits) - 1
        self.max_kicks = max_kicks
        self.buckets = [[] for _ in range(m)]

    def _fp(self, x: bytes) -> int:
        h = int.from_bytes(hashlib.md5(x).digest()[:8], 'big')
        fp = h & self.fp_mask
        return fp if fp != 0 else 1   # reserve 0 as "empty"

    def _i1(self, x: bytes) -> int:
        h = int.from_bytes(hashlib.sha1(x).digest()[:8], 'big')
        return h % self.m

    def _alt(self, i: int, fp: int) -> int:
        h = int.from_bytes(hashlib.sha256(fp.to_bytes(4, 'big')).digest()[:8], 'big')
        return (i ^ h) % self.m

    def add(self, x: bytes) -> bool:
        fp = self._fp(x)
        i1 = self._i1(x)
        i2 = self._alt(i1, fp)
        for i in (i1, i2):
            if len(self.buckets[i]) < self.b:
                self.buckets[i].append(fp)
                return True
        # Both buckets full — evict and relocate
        i = random.choice((i1, i2))
        for _ in range(self.max_kicks):
            slot = random.randrange(self.b)
            fp, self.buckets[i][slot] = self.buckets[i][slot], fp
            i = self._alt(i, fp)
            if len(self.buckets[i]) < self.b:
                self.buckets[i].append(fp)
                return True
        return False  # table effectively full

    def __contains__(self, x: bytes) -> bool:
        fp = self._fp(x)
        i1 = self._i1(x)
        i2 = self._alt(i1, fp)
        return fp in self.buckets[i1] or fp in self.buckets[i2]

    def delete(self, x: bytes) -> bool:
        fp = self._fp(x)
        i1 = self._i1(x)
        i2 = self._alt(i1, fp)
        for i in (i1, i2):
            if fp in self.buckets[i]:
                self.buckets[i].remove(fp)
                return True
        return False
```

### Why the XOR trick matters

A naive cuckoo hash would store two hashes per item to know "the other bucket." Cuckoo filter **doesn't store items** — just fingerprints. Given a fingerprint you find in bucket `i`, you still need to know its alternate bucket to relocate it. The trick:

```
i_alt = i XOR hash(fingerprint)
```

This is symmetric: `alt(alt(i)) == i`. So from a fingerprint alone you can compute its other bucket. That's the whole reason Cuckoo filters can delete (and evict) while Bloom/CBF can't recover the "identity" of a bit.

### Sizing rules of thumb

| Target FP | Fingerprint size | Bucket size | Bits/item |
|---|---|---|---|
| ~3% | 8 bits | 4 | ~9 |
| ~0.1% | 12 bits | 4 | ~13 |
| ~0.01% | 16 bits | 4 | ~17 |

Load factor up to ~95% before insert failures start.

### Classic problems

| Problem | Why Cuckoo wins |
|---|---|
| Membership + delete | Native delete |
| Cache admission with eviction | Fits add/delete/query pattern |
| Content moderation blocklist with pardons | Delete support |
| Read-heavy approximate dedup | Lookup touches 2 cache lines vs `k` scattered |
| Replacement for Counting Bloom in new code | Almost always better |

---

## Reference View

### Cuckoo filter vs Bloom filter

| | Bloom | Cuckoo |
|---|---|---|
| Delete | No | Yes (native) |
| FP rate at 10 bits/item | ~1% | ~0.3% |
| FP rate at 8 bits/item | ~2% | ~1% |
| Memory at loose FP (>3%) | Wins | Loses |
| Lookup cost | `k` scattered bit reads | 2 bucket reads (cache-friendly) |
| Insert failure possible? | No | Yes (at high load) |
| Mergeable | Yes (OR) | Limited |
| Theoretical simplicity | Simple | Moderate |

### Cuckoo vs Counting Bloom

- Cuckoo is usually **smaller** at the same FP rate (8-bit fingerprint + 95% load ≈ 9 bits/item; CBF at 1% FP needs ~40 bits/item including counter width).
- Cuckoo's delete is **safe** — you compare exact fingerprints. CBF's decrement can't tell whose bit it is, so an unpaired delete silently corrupts.
- Cuckoo fails closed at high load (insert rejected); CBF fails open (counter overflow + later false negatives).

For new designs, **pick Cuckoo** unless you specifically need CBF's add-merge semantics.

### How FP rate arises

Query `x` checks if `f(x)` lives in `i_1(x)` or `i_2(x)`. A false positive happens when *another* key `y` has the same fingerprint *and* landed in one of these buckets. With `b = 4` slots per bucket and fingerprint of `l` bits, FP ≈ `2b / 2^l = 8 / 2^l`. So 8-bit fingerprints give ~3%, 12-bit ~0.2%.

This is why Cuckoo is cleanest at **low** FP targets — the fingerprint grows logarithmically, but Bloom's bits-per-item grows faster.

### Load factor / insert failure

Expected load before failure: ~95% for `b = 4`. Beyond that, eviction chains fail to terminate. In practice:

- Size for 2× expected peak.
- Support resize (re-insert all fingerprints into a larger table).
- Or fall back to a chained overflow list.

### The "fingerprint = 0" gotcha

A 0 fingerprint is indistinguishable from an empty slot. Implementations reserve 0 and remap to 1 (as in the code above). Mild FP bias, usually ignored.

### Complexity

| Op | Time | Memory |
|---|---|---|
| add (success) | `O(1)` expected | — |
| add (with evictions) | `O(log n)` in the worst case in practice | — |
| query | `O(1)` — 2 bucket lookups | — |
| delete | `O(1)` — 2 bucket lookups | — |
| Full structure | — | `m · b · l` bits (fingerprint × slots) |

### Variants

- **Morton filter** (2018) — cache- and SIMD-optimized variant, ~60% faster inserts.
- **Vacuum filter** (2019) — better load factor, designed for set reconciliation.
- **d-ary cuckoo** — more buckets per key, better load but more lookups.
- **Xor filter** (2019) — static set, ~8 bits/item at 0.4% FP, slightly better than Cuckoo for static-set use cases (no add/delete, build once).

### Pitfalls

1. **Resize path must be designed in** — load factor 95% is a cliff. Plan for rebuild at ~80%.
2. **Delete without prior add** — returns False, doesn't corrupt (unlike CBF). Safe but surprising.
3. **Duplicate inserts** — CF doesn't collapse them. Adding the same key four times fills one slot per add; the fifth add triggers eviction. Either dedupe upstream or accept the behavior.
4. **Fingerprint collisions across different keys** — two keys with same `f` and bucket pair become indistinguishable. Delete removes one copy, later query still returns True for the remaining. This is by design.
5. **Concurrent updates** — naive impl isn't thread-safe (eviction chains). Production versions lock buckets or use lock-free fingerprint swaps.
6. **Weak hash function** — partial-key cuckoo needs `hash(fingerprint)` to be well-distributed; weak hashes cluster buckets.
7. **Don't use for long-term persistence with code upgrades** — if hash function or fingerprint width changes, the filter is invalid. Version it or rebuild.

### Real-world uses

| System | Use |
|---|---|
| **RocksDB (as alternative Bloom config)** | Table membership filter |
| **MyRocks / TiKV** | Key existence check |
| **Redis (RedisBloom module)** | `CF.ADD`, `CF.EXISTS`, `CF.DEL` |
| **Aerospike** | Duplicate-detection in streams |
| **Facebook Cachelib** | Cache admission |
| **Modern CDN edge filters** | Dedup with TTL — delete works |

### When *not* to use

- Very loose FP targets (> 3%) — Bloom is strictly smaller.
- Can't tolerate any insert failure and can't afford resize — use Bloom + external delete list.
- Need to merge filters across shards — Bloom's OR merge is much simpler.
- Static set built once, queried often — consider Xor filter instead.

---

## See Also

- [bloom-filter.md](bloom-filter.md) — simpler no-delete sibling
- [counting-bloom-filter.md](counting-bloom-filter.md) — older delete-capable alternative
- [README.md](README.md) — probabilistic DS decision table
- [../hash-based/hash-tables.md](../hash-based/hash-tables.md) — cuckoo hashing (exact variant; conceptual parent)
- [../../system-design/redis/](../../system-design/redis/) — RedisBloom module hosts cuckoo filter
- [../README.md](../README.md) — top-level decision table
