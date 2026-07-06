---
type: reference
title: "Complexity Theory (P, NP, Reductions, Hardness)"
status: Active
---

# Complexity Theory (P, NP, Reductions, Hardness)

- **Source:** distilled from Sipser + Garey-Johnson + CLRS Ch. 34
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

- Deciding whether a problem is likely to have a polynomial algorithm — or whether you should switch to heuristics, approximations, or parameterized algorithms.
- Framing interview discussions about intractability ("this is NP-hard, here's my heuristic").
- Recognizing classic NP-complete problems: SAT, 3-SAT, 3-COL, HAM-CYCLE, TSP (decision), VERTEX-COVER, INDEPENDENT-SET, CLIQUE, SUBSET-SUM, KNAPSACK (decision), PARTITION.

## Interview View

### Complexity classes cheat sheet

| Class | Rough definition | Example |
|---|---|---|
| **P** | Solvable in polynomial time deterministically | Sort, shortest path, max-flow |
| **NP** | Certificate verifiable in polynomial time | SAT, HAM-CYCLE, TSP (decision) |
| **co-NP** | Complement's certificate verifiable in poly time | TAUT, non-HAM-CYCLE |
| **NP-hard** | As hard as any NP problem (under poly-time reduction) | TSP (optimization), HALTING |
| **NP-complete** | NP ∩ NP-hard | SAT, 3-SAT, 3-COL, VC, IS, CLIQUE |
| **PSPACE** | Polynomial space | QBF, two-player games |
| **EXPTIME** | Exponential time | Generalized chess, go |
| **Decidable** | Some algorithm halts and answers | Most problems we study |
| **Undecidable** | No algorithm can decide | Halting problem, Post correspondence |

`P ⊆ NP ⊆ PSPACE ⊆ EXPTIME`. Each inclusion is believed strict, but only `P ⊊ EXPTIME` is proven.

### Recognizing NP-completeness (classic problems to reduce from)

| Problem | Input | Question |
|---|---|---|
| **SAT** | Boolean formula `φ` | Is there a satisfying assignment? |
| **3-SAT** | `φ` in 3-CNF | Same |
| **VERTEX-COVER** | Graph `G`, int `k` | Vertex cover of size ≤ k? |
| **INDEPENDENT-SET** | Graph `G`, int `k` | Independent set of size ≥ k? |
| **CLIQUE** | Graph `G`, int `k` | Clique of size ≥ k? |
| **HAM-CYCLE** | Graph `G` | Hamiltonian cycle exists? |
| **3-COL** | Graph `G` | 3-colorable? |
| **SUBSET-SUM** | Ints `S`, target `t` | Subset of `S` summing to `t`? |
| **PARTITION** | Ints `S` | Can `S` be split into two equal-sum subsets? |
| **TSP (decision)** | Graph with weights, budget `B` | Tour with cost ≤ B? |
| **KNAPSACK (decision)** | Items (w_i, v_i), capacity `W`, target `V` | Achievable value ≥ V? |

Know their reductions: `SAT → 3-SAT → {IS, VC, CLIQUE, 3-COL, HAM-CYCLE, ...}`.

### Polynomial-time reduction template

To show `A ≤_p B` (A reduces to B):

1. Describe a poly-time mapping `f: instances of A → instances of B`.
2. Prove: `x ∈ A ⟺ f(x) ∈ B`.

Then: if `B ∈ P`, so is `A`; if `A` is NP-hard, so is `B`.

### What to do when a problem is NP-hard

- **Exponential exact algorithm** with good constants: `2^n`, `O(1.2^n)` branch-and-bound, memoized search.
- **Approximation algorithm** — polynomial time, bounded-ratio. E.g., 2-approx vertex cover, `ln n`-approx set cover.
- **Heuristic** — simulated annealing, genetic, local search; no guarantees but works in practice.
- **Parameterized (FPT)** — polynomial in input size, exponential in a "small" parameter `k`.
- **Special-case polynomial** — e.g., VC on trees/bipartite graphs; 2-SAT is polynomial.
- **Integer Linear Programming (ILP) solvers** — Gurobi/CPLEX/CBC can crush "big" NP-hard instances.

### Classic problems

| Problem | Status |
|---|---|
| Boolean formula satisfiability (SAT) | NP-complete |
| Graph 2-coloring / bipartite check | P (BFS) |
| Graph 3-coloring | NP-complete |
| Max-flow / min-cut | P |
| Shortest path (non-negative) | P (Dijkstra) |
| Shortest path (negative allowed, no cycles) | P (Bellman-Ford) |
| Longest path | NP-hard (reduces to HAM-PATH) |
| TSP | NP-hard (optimization); NP-complete (decision) |
| Euler circuit | P (constructive — all even degree + connected) |
| Hamiltonian circuit | NP-complete |
| 2-SAT | P (implication graph + SCC) |
| 3-SAT | NP-complete |
| Min-cost bipartite matching | P (Hungarian) |
| Minimum spanning tree | P (Kruskal, Prim) |
| Steiner tree | NP-hard |

## Reference View

### Why the `P = NP?` question matters

If `P = NP`: every problem whose solutions can be verified efficiently can also be *found* efficiently. Consequences:

- Public-key crypto would collapse.
- Optimization problems (protein folding, logistics, scheduling) become tractable.
- Mathematics itself — proof search becomes polynomial.

If `P ≠ NP` (widely believed): no poly-time algorithm for any NP-complete problem exists. All known evidence — failed attempts, lower bounds for restricted models — supports this.

### Cook-Levin theorem (1971)

SAT is NP-complete. Proof sketch: for any NP problem with verifier `V`, encode `V(x, certificate) = 1` as a Boolean formula whose variables correspond to tape cells and states of the verifier's computation. Size is polynomial. Then `SAT` being easy would make any NP problem easy.

After this, NP-completeness spread by reductions — Karp's 21 NP-complete problems (1972) kicked off the catalog.

### Fine-grained complexity

Not all polynomial algorithms are equal. For example:

- **3-SUM conjecture** — no `O(n^{2-ε})` algorithm for 3-SUM.
- **SETH (Strong Exponential Time Hypothesis)** — no `O((2-ε)^n)` for SAT.
- These imply conditional lower bounds for problems like edit distance (`O(n^{2-ε})` unlikely), APSP (`O(n^{3-ε})` unlikely).

### Randomized and quantum classes

| Class | Meaning |
|---|---|
| **RP** | Poly-time randomized, one-sided error (if answer = yes, accept with prob ≥ ½) |
| **BPP** | Two-sided bounded error (prob ≥ 2/3 of correct answer) |
| **ZPP** | Zero-error expected poly-time |
| **BQP** | Bounded-error quantum poly-time |
| **PH** | Polynomial hierarchy (generalizes NP, co-NP) |

`P ⊆ ZPP ⊆ RP ⊆ BPP`. `P ⊆ BQP`. Whether `BPP = P` is open (believed yes, since derandomization under plausible assumptions).

### Space classes

| Class | Meaning |
|---|---|
| **L** | Log-space deterministic |
| **NL** | Log-space non-deterministic |
| **PSPACE** | Polynomial space |

`L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE`. Reachability in a directed graph is NL-complete.

### Hierarchy theorems

- **Time hierarchy**: `DTIME(f(n)) ⊊ DTIME(f(n) · log f(n))` — more time strictly lets you do more.
- **Space hierarchy**: similar for space.

These prove `P ⊊ EXPTIME` unconditionally.

### Approximation factors — what's achievable

| Problem | Best known approx ratio |
|---|---|
| Vertex cover | 2 (trivial), no (2 - ε) unless UGC fails |
| Set cover | `ln n`, matching lower bound (assuming `P ≠ NP`) |
| TSP (metric) | 1.5 (Christofides); 1.5 - ε just beat (2020: 1.5 - 10^{-36}) |
| TSP (general) | Not approximable to any constant |
| Max-SAT | 7/8 (random assignment), optimal |
| Knapsack | FPTAS: `(1 - ε)`-approx in poly(n, 1/ε) |
| Euclidean TSP, k-means | PTAS |
| Graph coloring | `n^{1-ε}`-hard (essentially no good approximation) |

### Unique Games Conjecture (UGC)

A conjecture strictly stronger than `P ≠ NP`. If true, many approximation bounds become tight. Independent of whether `P = NP`.

### Pitfalls

- **"NP means non-polynomial"** — NO. NP means *non-deterministic polynomial*; any P problem is in NP.
- **"NP-complete means intractable in practice"** — many NP-complete problems solve instances with millions of variables in practice via SAT solvers, ILP, or specialized heuristics.
- **Showing NP membership but not completeness** — to claim NP-complete, you must also prove a known NP-complete problem reduces to yours.
- **Reducing in the wrong direction** — `A ≤_p B` means "B is at least as hard as A". To show B is NP-hard, reduce a known NP-hard problem to it, not the reverse.
- **Assuming polynomial always means fast** — `O(n^{100})` is polynomial but worse than `O(2^n)` for small `n`.
- **Forgetting input-size matters** — strongly NP-complete (SUBSET-SUM is weakly NP; CLIQUE is strongly NP-complete). "Weakly" means pseudo-polynomial algorithms can solve small-number instances.

### Real-world uses

- **Crypto** — security relies on conjectured hardness (factoring, discrete log, SVP).
- **Solver engineering** — SAT solvers (MiniSAT, Glucose, CaDiCaL), SMT solvers, ILP solvers power real-world optimization.
- **Scheduling, routing, logistics** — NP-hard cores; solved via heuristics + domain knowledge.
- **Bioinformatics** — genome assembly, protein folding are NP-hard; approximations essential.
- **Chip design** — placement, routing are NP-hard.
- **Machine learning theory** — VC dimension, PAC learning connect to complexity classes.
- **Security analysis** — program analysis is undecidable in general (Rice's theorem); sound over-approximations are used.

### When *not* to dive into complexity theory

- You just need to ship — first profile, then optimize. Complexity is the "why" behind algorithm choice, not a daily tool.
- Problem is in P but slow — you need better constants or better data structures, not a complexity-class discussion.
- Interview asks for an algorithm — state "this is NP-hard" only if you're sure and can identify a reduction; otherwise just say "I don't know a poly-time algorithm and will use a heuristic/DP".

## See Also

- [`paradigms/approximation.md`](/algorithms/paradigms/approximation.md) — approximation algorithms for NP-hard problems.
- [`paradigms/randomized.md`](/algorithms/paradigms/randomized.md) — randomized classes (RP, BPP).
- [`graph/flows.md`](/algorithms/graph/flows.md) — matching / flow reductions appear in NPC proofs.
- [`graph/connectivity-scc.md`](/algorithms/graph/connectivity-scc.md) — 2-SAT via SCC.
- [`dp-patterns/knapsack.md`](/algorithms/dp-patterns/knapsack.md) — pseudo-polynomial DP for weakly NP-complete problems.
- [`../interviews/algorithms-ds.md`](/interviews/algorithms-ds.md) — interview recap.
