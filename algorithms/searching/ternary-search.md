# Ternary Search

- **Source:** distilled from CP patterns
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

- The function is **unimodal** on the search range: strictly increasing then strictly decreasing (or vice versa).
- You want to find the **maximum** (or minimum) of a function.
- Function evaluation is feasible but derivative isn't — so Newton's method isn't available.

Classic setup: "cost(x) is convex with a unique minimum — find x that minimizes it."

## Interview View

### Template — real-valued, maximize

```python
def ternary_search_max(f, lo, hi, iters=100):
    for _ in range(iters):
        m1 = lo + (hi - lo) / 3
        m2 = hi - (hi - lo) / 3
        if f(m1) < f(m2):
            lo = m1
        else:
            hi = m2
    return (lo + hi) / 2
```

### Template — integer-valued

```python
def ternary_search_int(f, lo, hi):
    """Find x in [lo, hi] maximizing f. Unimodal integer-valued f."""
    while hi - lo > 2:
        m1 = lo + (hi - lo) // 3
        m2 = hi - (hi - lo) // 3
        if f(m1) < f(m2):
            lo = m1 + 1
        else:
            hi = m2 - 1
    return max(range(lo, hi + 1), key=f)
```

### Classic problems

| Problem | Setup |
|---|---|
| Find peak of bitonic array | ternary on index |
| Minimum of convex cost function | ternary on real |
| Optimal throw angle | ternary on angle in `[0, π/2]` |
| Optimal cut of rod (continuous) | ternary on cut position |
| Minimizing distance to polyline | ternary on parameter `t` |

### Peak of bitonic array

```python
def peak_of_bitonic(a):
    lo, hi = 0, len(a) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if a[mid] < a[mid + 1]:
            lo = mid + 1
        else:
            hi = mid
    return lo
```

Note: simple binary search works for a monotone-pair condition (`a[mid] < a[mid+1]` is "we're still ascending"). Ternary is for when you truly need function samples at two interior points.

## Reference View

### Why ternary (not binary)

On a unimodal function, binary search's "compare against target" doesn't apply — there's no target. You compare two interior samples `m1 < m2`:

- `f(m1) < f(m2)` → maximum is right of `m1`. Drop `[lo, m1)`.
- `f(m1) > f(m2)` → maximum is left of `m2`. Drop `(m2, hi]`.
- `f(m1) == f(m2)` → maximum is in `[m1, m2]`. Drop both ends safely (assuming strictly unimodal).

Each iteration shrinks by `1/3`. So `iters = log_{3/2}(range/precision)`.

### Strictly unimodal vs weakly

Weakly unimodal (flat top) breaks ternary — three points could all have the same value and you don't know which side to drop. Perturb or switch to a different strategy.

### Golden-section search

Replace `1/3` points with the golden ratio `φ ≈ 1.618`. Reuses one evaluation per iteration → one function call per step instead of two. Same asymptotics, 30% fewer evaluations.

```python
PHI = (1 + 5**0.5) / 2
INV_PHI = 1 / PHI       # ≈ 0.618

def golden_section_max(f, lo, hi, eps=1e-9):
    m1 = hi - (hi - lo) * INV_PHI
    m2 = lo + (hi - lo) * INV_PHI
    f1, f2 = f(m1), f(m2)
    while hi - lo > eps:
        if f1 < f2:
            lo = m1
            m1 = m2; f1 = f2
            m2 = lo + (hi - lo) * INV_PHI
            f2 = f(m2)
        else:
            hi = m2
            m2 = m1; f2 = f1
            m1 = hi - (hi - lo) * INV_PHI
            f1 = f(m1)
    return (lo + hi) / 2
```

### Complexity

| Variant | Iterations |
|---|---|
| Ternary (real, eps precision) | `log_{3/2}(range/eps)` |
| Golden section (real) | `log_{1/φ}(range/eps) ≈ 1.44 log_2(...)` |
| Ternary (integer on `[lo, hi]`) | `O(log(hi-lo))` |

Each iteration: 2 (ternary) or 1 (golden section) function evaluations.

### Pitfalls

- **Function isn't strictly unimodal** — plateaus, noise, multiple local maxima → ternary silently gives wrong answers.
- **Integer ternary boundary** — when `hi - lo` is small (1 or 2), you have to evaluate exhaustively; skipping that step loops forever or misses the max.
- **Float precision** — 100 iterations with `1/3`-shrink gives `(2/3)^100 ≈ 10^{-18}` — fine. Fewer iterations = worse.
- **Comparing floats for equality** as tie-breaker — don't.
- **Stochastic / noisy functions** — ternary/golden are deterministic; noise makes them fail. Use stochastic optimization.

### Real-world uses

- **Physics simulations** — finding the minimum-energy configuration along one axis.
- **ML hyperparameter sweeps** when the metric is unimodal (rare, but e.g., learning-rate optima in well-conditioned problems).
- **Optics / signal processing** — peak detection in a smoothed signal.
- **Game physics** — finding the closest point on a trajectory to a target.
- **Financial optimization** — convex 1-D subproblems inside a larger pipeline.
- **Operations research** — 1-D line search inside gradient-free optimizers (Nelder-Mead, Powell).

### When *not* to use

- Function isn't unimodal — use grid search, simulated annealing, or a specialized solver.
- You have gradient information — Newton's method or binary search on the derivative (`f'(x) = 0`).
- Function is multidimensional — use coordinate descent, BFGS, or gradient-based methods.
- Function is noisy — use stochastic methods (CMA-ES, Bayesian optimization).

## See Also

- [`binary-search.md`](binary-search.md) — for monotone predicates.
- [`exponential-jump.md`](exponential-jump.md) — when bounds aren't known.
- [`../patterns/binary-search-on-answer.md`](../patterns/binary-search-on-answer.md) — nearby technique.
- [`../paradigms/randomized.md`](../paradigms/randomized.md) — when function is noisy.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
