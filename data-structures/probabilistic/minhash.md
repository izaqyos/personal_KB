# MinHash

> **Source:** Broder (1997)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Estimate **Jaccard similarity** between sets in tiny constant space per set.

---

## Table of Contents

- [When to Use](#when-to-use)
- [Interview View](#interview-view)
- [Reference View](#reference-view)
- [See Also](#see-also)

---

## When to Use

- Near-duplicate detection on documents, URLs, images (via shingles / features)
- Plagiarism, spam, mirror detection
- Clustering of large collections by similarity
- Blocking step before expensive pairwise comparisons
- **Not** when: you need exact Jaccard on small sets (just compute it directly)

**Canonical workload:** Google / Bing web dedup — find near-duplicate pages among billions of URLs without comparing each pair.

---

## Interview View

### Jaccard Similarity Recap

```
J(A, B) = |A ∩ B| / |A ∪ B|     ∈ [0, 1]
```

Computing exactly needs both sets. MinHash estimates it **from compact fingerprints** each the size of one small array.

### The Core Idea

Pick a random hash function `h`. Compute `min(h(x) for x in A)` and `min(h(x) for x in B)`. Remarkable fact:

```
P[ min_h(A) == min_h(B) ] = J(A, B)
```

**Why:** the element producing the min is equally likely to be anywhere in A ∪ B. It's in A ∩ B iff the two mins match. That happens exactly with probability |A ∩ B| / |A ∪ B|.

With k independent hash functions, estimate Jaccard as:

```
Ĵ(A, B) = (# of matching mins) / k
```

Error: ~1/√k.

### Minimal Python

```python
import hashlib
import random

class MinHash:
    def __init__(self, k: int = 128, seed: int = 42):
        rng = random.Random(seed)
        # k pairs (a, b) for linear hashes h(x) = (a*x + b) mod p
        self.p = (1 << 61) - 1  # Mersenne prime
        self.params = [(rng.randrange(1, self.p), rng.randrange(0, self.p)) for _ in range(k)]
        self.k = k
        self.signature = [self.p] * k

    def _h(self, item: bytes) -> int:
        return int(hashlib.md5(item).hexdigest(), 16)

    def add(self, item: bytes):
        x = self._h(item)
        for i, (a, b) in enumerate(self.params):
            v = (a * x + b) % self.p
            if v < self.signature[i]:
                self.signature[i] = v

    @staticmethod
    def jaccard(m1: "MinHash", m2: "MinHash") -> float:
        assert m1.k == m2.k
        matches = sum(1 for a, b in zip(m1.signature, m2.signature) if a == b)
        return matches / m1.k
```

### Document Shingling

To apply MinHash to text, first convert to a set of **shingles** (n-grams):

```python
def shingles(text: str, n: int = 5):
    return {text[i:i+n] for i in range(len(text) - n + 1)}
```

Then MinHash the shingles. Two documents with most shingles in common → high estimated Jaccard.

### Locality-Sensitive Hashing (LSH) — Making Search Fast

Naive pairwise comparison of N MinHash signatures is O(N²). **LSH** buckets similar signatures together:

1. Split each k-length signature into `b` bands of `r` rows (k = b·r)
2. For each band, hash the tuple of r values → bucket
3. Any pair landing in the same bucket for **at least one band** is a candidate pair
4. Verify with actual Jaccard

Tune `b`, `r` to define a similarity threshold. This gives **sub-linear near-duplicate search**.

---

## Reference View

### Properties

| Property | Value |
|----------|-------|
| Estimates | Jaccard similarity |
| Signature size | k integers (typically 64-bit) |
| Memory per set | O(k) |
| Error (std) | ~1/√k |
| k = 128 | Error ~9% |
| k = 1024 | Error ~3% |

### Add vs Merge

- **Add element to MinHash:** O(k) hash + compare
- **Merge two MinHashes (union estimate):** element-wise min of signatures → represents A ∪ B
- **Intersection Jaccard:** can't recover set sizes, only similarity

### Variants

| Variant | Improvement |
|---------|-------------|
| **Classic MinHash** | k hash functions |
| **Bottom-k / KMV sketch** | Single hash; keep k smallest; simpler, same accuracy |
| **One-permutation hashing** | Single hash, split into k bins, take min per bin; much faster |
| **HyperMinHash** | Combines MinHash + HLL-style leading-zero counts — very compact |
| **b-bit MinHash** (Li & König 2010) | Only keep b=1,2 bits per hash value — 1/32× memory |
| **Weighted MinHash** | For weighted sets / multisets |

### MinHash vs Other Similarity Techniques

| Method | Metric | Good for |
|--------|--------|----------|
| **MinHash** | Jaccard | Sparse sets, shingles, documents |
| **SimHash** | Cosine-ish | Dense vectors, text similarity |
| **LSH-random projection** | Cosine | High-dim real vectors (ML embeddings) |
| **pHash, dHash** | Hamming distance | Images |
| **Edit distance** | Levenshtein | Short strings |

### Real-World Uses

| System | Use |
|--------|-----|
| **Google / Bing web index** | Near-duplicate page detection |
| **AltaVista (original paper)** | Shingle + MinHash, mid-90s |
| **GitHub / Gitea** | Near-duplicate repository detection |
| **Plagiarism checkers** (Turnitin, MOSS) | Fingerprinting |
| **Hadoop / Spark mllib** | `datasketch` / `minhashlsh` libraries |
| **Redis MinHash / RediSearch** | Available via modules |
| **Dedup pipelines** (news aggregators, bioinformatics) | |

### Practical Python Library

`pip install datasketch` — production-grade MinHash + LSH.

```python
from datasketch import MinHash, MinHashLSH

m1 = MinHash(num_perm=128)
for shingle in shingles(doc1):
    m1.update(shingle.encode('utf8'))

lsh = MinHashLSH(threshold=0.8, num_perm=128)
lsh.insert("doc1", m1)
candidates = lsh.query(m_query)
```

### Pitfalls

1. **Using non-stable hash** (Python `hash()`) — signatures won't match across processes
2. **Too few permutations** — noisy similarity estimates; need k ≥ 128 usually
3. **Comparing signatures with different `k` or hash parameters** — invalid
4. **Shingle size too small** — common English 1-grams look similar regardless of content
5. **Confusing Jaccard with cosine** — they differ; Jaccard ignores multiplicity

---

## See Also

- [README.md](README.md) — probabilistic overview
- [bloom-filter.md](bloom-filter.md)
- [hyperloglog.md](hyperloglog.md) — cardinality estimation
- [../hash-based/sets.md](../hash-based/sets.md)
- [../README.md](../README.md) — decision table
