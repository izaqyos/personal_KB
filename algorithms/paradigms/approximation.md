# Approximation Algorithms

- **Source:** distilled from Vazirani + Williamson-Shmoys + CLRS
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

- Problem is **NP-hard** (or just expensive) but you need an answer soon.
- "Good enough" is acceptable, with a **provable** quality bound (ratio, additive).
- You need a deterministic or randomized polynomial-time algorithm with guarantees — as opposed to heuristics that may do well in practice but promise nothing.

This is not "heuristics with benchmark results." An approximation algorithm has a proven ratio `ρ` between its cost and the optimum cost.

## Interview View

### Vertex cover — 2-approximation (pick both endpoints of each matching edge)

```python
def vertex_cover_2_approx(edges):
    """edges: iterable of (u, v). Returns a vertex cover of size ≤ 2·OPT."""
    cover = set()
    for u, v in edges:
        if u not in cover and v not in cover:
            cover.add(u)
            cover.add(v)
    return cover
```

**Proof of 2-approx:** The set of edges `{(u,v)}` we processed — where neither endpoint was already covered — forms a matching `M`. Any valid cover must include at least one endpoint of each edge in `M`, so `OPT ≥ |M|`. We added both endpoints → `|cover| = 2|M| ≤ 2·OPT`.

### Set cover — greedy (ln n)-approximation

```python
def set_cover_greedy(universe, subsets):
    """Greedy: repeatedly pick the set that covers the most uncovered elements."""
    universe = set(universe)
    picked = []
    covered = set()
    remaining = [set(s) for s in subsets]
    while covered != universe:
        best_i = max(range(len(remaining)), key=lambda i: len(remaining[i] - covered))
        picked.append(best_i)
        covered |= remaining[best_i]
    return picked
```

**Proof sketch:** Ratio is `H_n = 1 + 1/2 + ... + 1/n ≈ ln n`. Tight: there are instances where any polynomial algorithm does at most `(1-ε) ln n` better unless P=NP.

### Metric TSP — Christofides 1.5-approximation (sketch)

1. Compute MST `T` of the graph.
2. Find minimum-weight perfect matching `M` on the odd-degree vertices of `T`.
3. Combine `T ∪ M` → every vertex has even degree → Eulerian tour exists.
4. Shortcut repeated vertices to get a Hamiltonian tour.

Ratio: 1.5. Proof uses triangle inequality and the fact that OPT tour gives two disjoint matchings on the odd-degree set.

### Classic approximations

| Problem | Ratio | Technique |
|---|---|---|
| Vertex Cover | 2 | maximal matching |
| Set Cover | `ln n` | greedy |
| Load Balancing (makespan) | 2 | greedy list-scheduling |
| Load Balancing | 4/3 | LPT (longest processing time first) |
| Metric TSP | 1.5 | Christofides |
| TSP (general) | no constant | APX-hard |
| Knapsack (PTAS) | `1+ε` for any ε | scaled DP |
| Max-Cut | 0.878 | Goemans-Williamson SDP (randomized) |
| Bin Packing | 11/9 · OPT + 6/9 | First-Fit Decreasing |
| Steiner Tree | ~1.39 | LP rounding / primal-dual |
| Facility Location | ~1.488 | LP rounding |

## Reference View

### Approximation classes

| Class | Meaning |
|---|---|
| `ρ`-approximation | polynomial time, always `≤ ρ · OPT` (or `≥ OPT/ρ` for max) |
| PTAS | for every `ε > 0`, exists `(1+ε)`-approximation; runtime poly in `n` but may explode in `1/ε` |
| FPTAS | same but runtime also polynomial in `1/ε` |
| APX | has some constant-factor approximation |
| APX-hard | no PTAS unless P=NP |

Knapsack has an FPTAS. TSP (general) is APX-hard. Set Cover's `ln n` is essentially tight.

### Techniques

- **Greedy** — vertex cover, set cover, load balancing.
- **Local search** — repeatedly swap to improve; k-median, k-center.
- **LP rounding** — solve the LP relaxation, round the fractional solution back to integers.
- **Primal-dual** — Steiner tree, facility location.
- **Metric embedding** — embed into trees / simpler metrics with bounded distortion.
- **Randomized rounding** — `x_i ∈ [0,1]` from LP → flip a coin with probability `x_i`. Concentration bounds give ratio.
- **Dual fitting** — analyze via the LP dual without explicitly rounding.
- **Scaling** (PTAS) — round inputs to a coarser scale, solve exactly.

### PTAS / FPTAS: knapsack example

0/1 knapsack is NP-hard. But DP gives `O(nW)` (pseudo-polynomial). Idea:

1. Scale values: `v'_i = ⌊v_i / K⌋` for chosen `K = εV_max / n`.
2. Solve DP in `O(n · n · v_max / K) = O(n³ / ε)`.
3. Solution with scaled values is within `(1-ε)` of OPT.

FPTAS: polynomial in both `n` and `1/ε`.

### Approximation vs heuristics vs exact

| | Correctness guarantee | Runtime |
|---|---|---|
| Exact | optimum | often exponential / NP |
| Approximation | provable ratio | polynomial |
| Heuristic | none; empirical | any (often fast) |

Simulated annealing, genetic algorithms, and tabu search are heuristics — no provable bound.

### Complexity sketches

- Vertex cover 2-approx: `O(V + E)`.
- Set cover greedy: `O(|U| · Σ|S_i|)` or faster with clever structures.
- Christofides: dominated by matching (`O(n³)`) and MST (`O(E log V)`).
- LP-based approximations: dominated by LP solving (`O(n^3.5)` or worse in practice).

### Pitfalls

- **Ratio vs gap.** A 2-approximation guarantees ≤ 2·OPT *in the worst case*. Average might be much better. Don't confuse.
- **Integrality gap.** LP-relaxation's OPT may be far from integer OPT. Your rounding can't beat the gap. Vertex cover LP gap is 2 (matches the combinatorial algorithm).
- **Approximation ratio `ρ` for maximization vs minimization.** For min: `ALG ≤ ρ · OPT`; for max: `ALG ≥ OPT / ρ`. Some papers invert.
- **"Better in practice" isn't a proof.** Benchmark data is useful but doesn't substitute for a theorem.
- **Hidden assumptions** — Christofides requires triangle inequality; generic TSP has no constant approximation.

### Real-world uses

- **VLSI layout** — Steiner tree approximations.
- **Network design** — primal-dual facility location for CDN placement.
- **Task scheduling on clusters** — list scheduling, LPT approximations.
- **Bin packing in cloud VMs** — first-fit-decreasing (FFD) with proven ratio.
- **Clustering** — k-center has a 2-approx via farthest-first; `k-means++` has `O(log k)` expected ratio.
- **Routing & logistics** — VRP approximations; Christofides for delivery tours.
- **Compiler register allocation** — Chaitin's graph coloring is heuristic; with LP rounding we get approximations.

### When *not* to use

- OPT is solvable exactly in acceptable time (small `n`, tractable structure like trees).
- Application needs a certified-optimal answer (billing settlements, legal rounding).
- Integrality gap is too high — the approximation is useless.
- Heuristic + empirical benchmarks is acceptable and easier (ML hyperparameter search, scheduling in a sandbox).

## See Also

- [`greedy.md`](greedy.md) — most constant-factor approximations are greedy.
- [`randomized.md`](randomized.md) — randomized rounding, Monte Carlo approximation.
- [`dynamic-programming.md`](dynamic-programming.md) — FPTAS via scaled DP.
- [`../graph/matching.md`](../graph/matching.md) — building block for Christofides.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
