# Algorithms

> **Source:** Personal notes + CLRS, Sedgewick, Erickson, cp-algorithms
> **Author:** Yosi Izaq
> **Captured:** 2026-04-23
> **Status:** Active
> **Type:** compiled

Structured algorithms reference — paradigms, families, and problem-solving patterns. Every entry has:

- **Interview View** — template code, classic problem, Python idioms
- **Reference View** — variants, proofs, real-world uses, pitfalls

Python throughout.

---

## Table of Contents

- [Problem → Algorithm Decision Table](#problem--algorithm-decision-table)
- [Paradigm Cheat Sheet](#paradigm-cheat-sheet)
- [Complexity Landscape](#complexity-landscape)
- [Sections](#sections)
- [Relationship to data-structures/](#relationship-to-data-structures)
- [See Also](#see-also)

---

## Problem → Algorithm Decision Table

| Problem signal | Algorithm / Pattern |
|----------------|---------------------|
| Sorted array → find X | **Binary search** |
| "Minimum / maximum X such that P(X) holds" | **[Binary search on answer](patterns/binary-search-on-answer.md)** |
| Sliding range with constraint | **[Sliding window](patterns/sliding-window.md)** |
| Subarray sums / range counts | **[Prefix sums / XOR](patterns/prefix-suffix.md)** |
| Two sums in sorted array | **[Two pointers](patterns/two-pointers.md)** |
| Next greater / smaller element | **[Monotonic stack](patterns/monotonic-stack-queue.md)** |
| Sliding window max/min | **[Monotonic deque](patterns/monotonic-stack-queue.md)** |
| Cycle in linked list / functional graph | **[Floyd's tortoise-hare](patterns/fast-slow-pointers.md)** |
| Huge search space, bidirectional | **[Meet in the middle](patterns/meet-in-the-middle.md)** |
| Events over time / range overlaps | **[Line sweep](patterns/line-sweep.md)** |
| **Optimal** substructure + overlapping subproblems | **[Dynamic programming](paradigms/dynamic-programming.md)** |
| Optimal choice is **local** and safe | **[Greedy](paradigms/greedy.md)** |
| Enumerate all valid configurations | **[Backtracking](paradigms/backtracking.md)** |
| Split, solve, merge | **[Divide and conquer](paradigms/divide-and-conquer.md)** |
| Shortest path, non-negative | **[Dijkstra / A*](graph/shortest-path.md)** |
| Shortest path, negative edges | **[Bellman-Ford](graph/shortest-path.md)** |
| All-pairs shortest path | **[Floyd-Warshall / Johnson's](graph/shortest-path.md)** |
| Connect all vertices, min cost | **[MST (Kruskal/Prim)](graph/mst.md)** |
| Strongly connected components | **[Tarjan / Kosaraju](graph/connectivity-scc.md)** |
| Bipartite matching | **[Hopcroft-Karp](graph/matching.md)** |
| Max flow / min cut | **[Edmonds-Karp / Dinic's](graph/flows.md)** |
| Find pattern in text | **[KMP / Rabin-Karp / Z-algo](strings/pattern-matching.md)** |
| Multi-pattern matching | **[Aho-Corasick](strings/aho-corasick.md)** |
| All palindromic substrings | **[Manacher's](strings/manachers-palindrome.md)** |
| Edit distance | **[Levenshtein DP](strings/edit-distance.md)** |
| Fit items with weight limit | **[Knapsack](dp-patterns/knapsack.md)** |
| Longest increasing subsequence | **[LIS](dp-patterns/lis-lcs.md)** (`O(n log n)` patience sort) |
| Count number of ways / min coins | **[Coin change](dp-patterns/coin-change.md)** |
| TSP on 20 cities | **[Bitmask DP](dp-patterns/bitmask-dp.md)** |
| Count integers with property | **[Digit DP](dp-patterns/digit-dp.md)** |
| Tree, compute per-subtree | **[DP on trees](dp-patterns/dp-on-trees.md)** |
| Primes up to N | **[Sieve of Eratosthenes](number-theory/primes.md)** |
| `x^n mod p` quickly | **[Fast exponentiation](number-theory/gcd-modular.md)** |
| Count set bits, XOR tricks | **[Bit manipulation](bit-manipulation.md)** |
| Convex hull of points | **[Graham / Andrew monotone chain](geometry/convex-hull.md)** |
| Closest pair of points | **[D&C O(n log n)](geometry/closest-pair.md)** |

---

## Paradigm Cheat Sheet

| Paradigm | When to use | How to check feasibility |
|----------|-------------|---------------------------|
| **Brute force** | n ≤ ~20 for 2ⁿ, ~10 for n! | Always the first candidate |
| **[Divide & conquer](paradigms/divide-and-conquer.md)** | Problem splits into independent subproblems | Merge cost < work saved |
| **[Dynamic programming](paradigms/dynamic-programming.md)** | Overlapping subproblems + optimal substructure | State graph is polynomial |
| **[Greedy](paradigms/greedy.md)** | Local choice + **exchange argument** proves safety | Prove: no better global solution exists if we make this local choice |
| **[Backtracking](paradigms/backtracking.md)** | Enumerate / search all valid structures | Aggressive pruning required |
| **[Randomized](paradigms/randomized.md)** | Deterministic is too slow; expected time is OK | Analyze expected complexity |
| **[Approximation](paradigms/approximation.md)** | Problem is NP-hard; near-optimal is acceptable | Quantify the approximation ratio |

### DP vs Greedy

Both make choices over states. Difference:
- **Greedy:** one locally-optimal choice, no reconsideration → only works if an exchange argument proves it safe
- **DP:** consider *all* choices at each state, memoize → always correct if state is right

**When unsure, start with DP.** Greedy is DP with the right proof.

### DP vs D&C

- **D&C:** subproblems are *independent*
- **DP:** subproblems *overlap* — memoize to avoid re-solving

### DP vs Backtracking

- **DP:** you only want the *value* (min cost, count, ...) — collapse equivalent paths
- **Backtracking:** you need the actual *configurations* — enumerate and undo

---

## Complexity Landscape

### Sorting

| Algorithm | Best | Avg | Worst | Space | Stable | Notes |
|-----------|------|-----|-------|-------|--------|-------|
| Bubble | n | n² | n² | 1 | ✓ | Never use in practice |
| Insertion | n | n² | n² | 1 | ✓ | Best on small / nearly-sorted |
| Selection | n² | n² | n² | 1 | ✗ | |
| Merge | n log n | n log n | n log n | n | ✓ | Stable, predictable |
| Quick | n log n | n log n | n² | log n | ✗ | Fast in practice |
| Heap | n log n | n log n | n log n | 1 | ✗ | In-place, no worst-case blow-up |
| TimSort | n | n log n | n log n | n | ✓ | Python/Java default |
| Counting | n+k | n+k | n+k | k | ✓ | Integer keys, small range |
| Radix | n·d | n·d | n·d | n+b | ✓ | Integer or fixed-width keys |

### Searching

| Algorithm | Time | Precondition |
|-----------|------|---------------|
| Linear | O(n) | — |
| Binary | O(log n) | Sorted |
| Ternary | O(log n) | Unimodal |
| Interpolation | O(log log n) avg / O(n) worst | Sorted, uniform distribution |
| Exponential + binary | O(log n) | Sorted, unbounded / huge |

### Graph (for context — deeper in data-structures/graph/graph-algorithms.md)

| Problem | Algorithm | Time |
|---------|-----------|------|
| Single-source shortest (unweighted) | BFS | O(V+E) |
| Single-source shortest (non-neg) | Dijkstra | O((V+E) log V) |
| Single-source shortest (any) | Bellman-Ford | O(VE) |
| All-pairs shortest | Floyd-Warshall | O(V³) |
| All-pairs shortest (sparse) | Johnson's | O(V² log V + VE) |
| MST | Kruskal / Prim | O(E log E) / O((V+E) log V) |
| SCC | Tarjan / Kosaraju | O(V+E) |
| Max flow (Edmonds-Karp) | BFS-based | O(VE²) |
| Max flow (Dinic's) | Layered | O(V²E) |
| Max bipartite matching | Hopcroft-Karp | O(E√V) |

### Strings

| Problem | Algorithm | Time |
|---------|-----------|------|
| Substring search | KMP / Z / Rabin-Karp | O(n+m) |
| Multi-pattern | Aho-Corasick | O(n + m + z) |
| All palindromes | Manacher's | O(n) |
| Longest common substring | Suffix array | O(n log n) build + O(n) query |
| Edit distance | DP | O(nm) |

---

## Sections

### [Paradigms](paradigms/)
How to approach problems at a structural level.
- [divide-and-conquer](paradigms/divide-and-conquer.md)
- [dynamic-programming](paradigms/dynamic-programming.md)
- [greedy](paradigms/greedy.md)
- [backtracking](paradigms/backtracking.md)
- [randomized](paradigms/randomized.md)
- [approximation](paradigms/approximation.md)

### [Patterns](patterns/)
Idiomatic structural patterns applied across problems.
- [two-pointers](patterns/two-pointers.md)
- [sliding-window](patterns/sliding-window.md)
- [prefix-suffix](patterns/prefix-suffix.md)
- [monotonic-stack-queue](patterns/monotonic-stack-queue.md)
- [fast-slow-pointers](patterns/fast-slow-pointers.md)
- [meet-in-the-middle](patterns/meet-in-the-middle.md)
- [binary-search-on-answer](patterns/binary-search-on-answer.md)
- [line-sweep](patterns/line-sweep.md)

### [Sorting](sorting/)
- [comparison-sorts](sorting/comparison-sorts.md)
- [non-comparison-sorts](sorting/non-comparison-sorts.md)
- [external-sort](sorting/external-sort.md)
- [timsort](sorting/timsort.md)

### [Searching](searching/)
- [binary-search](searching/binary-search.md)
- [ternary-search](searching/ternary-search.md)
- [exponential-jump](searching/exponential-jump.md)

### [DP Patterns](dp-patterns/)
Catalog of classical DP formulations.
- [knapsack](dp-patterns/knapsack.md)
- [lis-lcs](dp-patterns/lis-lcs.md)
- [coin-change](dp-patterns/coin-change.md)
- [matrix-chain](dp-patterns/matrix-chain.md)
- [dp-on-trees](dp-patterns/dp-on-trees.md)
- [dp-on-dag](dp-patterns/dp-on-dag.md)
- [bitmask-dp](dp-patterns/bitmask-dp.md)
- [digit-dp](dp-patterns/digit-dp.md)

### [Graph Algorithms](graph/)
Deeper coverage beyond the practical templates in [data-structures/graph/](../data-structures/graph/).
- [shortest-path](graph/shortest-path.md)
- [mst](graph/mst.md)
- [connectivity-scc](graph/connectivity-scc.md)
- [matching](graph/matching.md)
- [flows](graph/flows.md)

### [Strings](strings/)
- [pattern-matching](strings/pattern-matching.md)
- [z-algorithm](strings/z-algorithm.md)
- [aho-corasick](strings/aho-corasick.md)
- [manachers-palindrome](strings/manachers-palindrome.md)
- [suffix-structures](strings/suffix-structures.md)
- [edit-distance](strings/edit-distance.md)

### [Number Theory](number-theory/)
- [gcd-modular](number-theory/gcd-modular.md)
- [primes](number-theory/primes.md)
- [combinatorics](number-theory/combinatorics.md)

### [Bit Manipulation](bit-manipulation.md)

### [Geometry](geometry/)
- [orientation-segments](geometry/orientation-segments.md)
- [convex-hull](geometry/convex-hull.md)
- [polygon](geometry/polygon.md)
- [closest-pair](geometry/closest-pair.md)

### [Complexity Theory](complexity-theory.md)
P, NP, NP-complete — brief reference.

### [Archive](archive/)
Legacy `AlgorithmsKB` (pre-sanitization) preserved for reference.

---

## Relationship to data-structures/

The [data-structures/](../data-structures/) section includes **practical templates** for:
- BFS / DFS / Dijkstra / Prim / Kruskal / topological sort in `data-structures/graph/graph-algorithms.md`
- Union-Find operations in `data-structures/sets-and-disjoint/disjoint-set.md`
- Heap operations in `data-structures/trees/heap.md`
- Trie in `data-structures/trees/trie.md`

This **algorithms/** section goes deeper:
- **Variants, proofs, alternate implementations**
- **Families of related algorithms** (all shortest-path variants in one place)
- **Advanced algorithms** not covered in DS (SCC, flows, matching, geometry, suffix arrays)
- **Problem-solving patterns** that are algorithmic but not tied to a single DS

When an algorithm sits naturally with a DS, the template lives there and both files cross-link.

---

## See Also

- [../data-structures/](../data-structures/README.md) — DS section with graph algorithm templates
- [../interviews/algorithms-ds.md](../interviews/algorithms-ds.md) — quick-reference cheat sheet (TypeScript)
- [../interview-qs-kb](../interview-qs-kb) — older C-based Q&A
- [../leetcode-kb](../leetcode-kb) — practice problems
