# Reservoir Sampling

> **Source:** Vitter (1985) — Algorithm R
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Uniform random sample of size **k** from a stream of **unknown length n**, using only **O(k) memory**.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Sample from a stream you can't store (log file, network packets, database scan)
- Sample from a source of unknown size
- Sample from data too big to shuffle
- **Not** when: you can load the data and just shuffle (use `random.sample`)

**Canonical workload:** "Give me 1000 random log lines from today's 2 TB access log without keeping the whole log in memory."

---

## Interview View

### Algorithm R (simple, optimal)

For k=1:
```python
import random

def sample_one(stream):
    chosen = None
    for i, x in enumerate(stream):
        if random.randint(0, i) == 0:
            chosen = x
    return chosen
```

**Each element is picked with probability 1/n** where n = stream length. Proof sketch: at step i, we pick the new element with prob 1/(i+1). Probability that element at position j survives to the end = 1/(j+1) · (j+1)/(j+2) · ... · (n-1)/n = 1/n. ✓

### General k — Reservoir

```python
import random

def reservoir_sample(stream, k: int) -> list:
    reservoir = []
    for i, x in enumerate(stream):
        if i < k:
            reservoir.append(x)
        else:
            j = random.randint(0, i)  # inclusive
            if j < k:
                reservoir[j] = x
    return reservoir
```

**Invariant:** after seeing n items, each item has been selected with probability k/n (for n ≥ k).

**Time:** O(n). **Space:** O(k).

### Why It Works (proof by induction)

At step n with n ≥ k:
- Previous reservoir item had probability `k/(n-1)` of being present
- Now: probability it survives = prob new item kicked it out = `k/n · 1/k = 1/n`, so survival prob = `1 - 1/n = (n-1)/n`
- Combined: `k/(n-1) · (n-1)/n = k/n`. ✓

### Algorithm L (faster for big streams)

Algorithm R inspects every item. **Algorithm L** uses the skipping trick: after each replacement, skip ahead a random number of items drawn from a geometric distribution. Runtime drops from O(n) to **O(k · (1 + log(n/k)))**.

```python
import math
import random

def reservoir_sample_L(stream, k: int):
    reservoir = []
    it = iter(stream)
    for _ in range(k):
        reservoir.append(next(it))

    W = math.exp(math.log(random.random()) / k)
    i = k
    try:
        while True:
            i += int(math.log(random.random()) / math.log(1 - W)) + 1
            # Advance stream to position i
            for _ in range(i - k):
                next(it)
            reservoir[random.randint(0, k - 1)] = next(it)
            W *= math.exp(math.log(random.random()) / k)
            i += 1
            k = i  # not strictly needed; track position
    except StopIteration:
        pass
    return reservoir
```

(For interviews, show Algorithm R. Mention Algorithm L exists when optimizing huge streams.)

---

## Reference View

### Variants

| Variant | Use |
|---------|-----|
| **Algorithm R** | Simple, O(n) |
| **Algorithm L / Z** | Skip-ahead, O(k log(n/k)), better on disk |
| **Weighted reservoir (A-Res)** | Each item has a weight; sample proportional to weight |
| **Distributed reservoir** | Sample in parallel shards, then combine |
| **Sliding window reservoir** | Sample from last m items, not all of history |

### Weighted Reservoir Sampling (Efraimidis-Spirakis)

Each item `x_i` with weight `w_i`:

```python
import heapq
import random
import math

def weighted_reservoir(stream, k):
    heap = []  # min-heap of (key, item)
    for x, w in stream:
        key = random.random() ** (1 / w)
        if len(heap) < k:
            heapq.heappush(heap, (key, x))
        elif key > heap[0][0]:
            heapq.heapreplace(heap, (key, x))
    return [x for _, x in heap]
```

Selection probability is proportional to weight. Beautiful one-pass algorithm.

### Distributed Reservoir Sampling

Each worker samples k items locally, attaching a per-worker count. Combine by weighted-resampling with weight = count.

### Operations & Complexity

| Op | Time | Space |
|----|------|-------|
| Process next item | O(1) amortized | O(k) |
| Final sample | Available always | O(k) |
| Merge two reservoirs | O(k) with weights | O(k) |

### Reservoir Sampling vs Alternatives

| Need | Use |
|------|-----|
| k random items, known n | `random.sample(lst, k)` |
| k random items, stream, **unknown n** | Reservoir |
| Weighted sampling | A-Res (above) |
| Top-k by score | [Heap](../trees/heap.md), not reservoir |
| Sample **with replacement** | Simple multinomial |

### Real-World Uses

- **Log sampling** — production debugging; sample 0.1% of all requests
- **A/B testing traffic splitting** — though usually done with hash %
- **Database query sampling** (Postgres `TABLESAMPLE SYSTEM` uses blocks; `BERNOULLI` per-row; neither is reservoir, but `ORDER BY random() LIMIT k` equivalent is)
- **ML training** — subsample training examples from huge datasets
- **Telemetry / observability** — Honeycomb, Lightstep sample spans; Datadog APM trace sampling
- **Big data** — Spark `sample(false, frac)` can be reservoir when count unknown
- **Streaming medians / quantiles** — first approximation before moving to t-digest

### Pitfalls

1. **Using `random.randint(0, i-1)` vs `(0, i)`** — off-by-one changes probability. Inclusive upper bound for index `i` at step `i` is correct.
2. **Reseeding random inside loop** — destroys independence
3. **Applying to a `list`** — pointless; just shuffle and take first k
4. **Assuming sample is in stream order** — it isn't; order in reservoir depends on replacements
5. **Infinite stream final state** — no issue; any moment you query, you have a valid uniform sample of what's passed so far

---

## See Also

- [README.md](README.md) — probabilistic overview
- [../trees/heap.md](../trees/heap.md) — weighted version uses heap
- [../hash-based/sets.md](../hash-based/sets.md)
- [../README.md](../README.md) — decision table
