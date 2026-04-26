# Coin Change DP

- **Source:** distilled from CLRS + LeetCode patterns
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

- Decision or counting problem over denominations summing to a target.
- Three standard flavors: **min coins**, **number of combinations** (unordered), **number of ordered sequences**.
- A special case of [unbounded knapsack](knapsack.md), but common enough to deserve its own page.

Note: standard coin systems (US coins, Euro coins) are *canonical* — greedy works. Arbitrary denominations are *not* canonical — only DP gives the right answer.

## Interview View

### Minimum number of coins

```python
def min_coins(coins, amount):
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0
    for c in range(1, amount + 1):
        for coin in coins:
            if c >= coin and dp[c - coin] + 1 < dp[c]:
                dp[c] = dp[c - coin] + 1
    return dp[amount] if dp[amount] != INF else -1
```

### Number of combinations (order irrelevant)

```python
def num_combinations(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:           # OUTER loop: coins
        for c in range(coin, amount + 1):
            dp[c] += dp[c - coin]
    return dp[amount]
```

Swapping the loops gives **permutations** (ordered sequences) — a different answer.

### Number of permutations (order matters)

```python
def num_permutations(coins, amount):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for c in range(1, amount + 1):   # OUTER loop: amount
        for coin in coins:
            if c >= coin:
                dp[c] += dp[c - coin]
    return dp[amount]
```

### Reconstructing one minimum-coin solution

```python
def min_coins_solution(coins, amount):
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0
    choice = [-1] * (amount + 1)
    for c in range(1, amount + 1):
        for coin in coins:
            if c >= coin and dp[c - coin] + 1 < dp[c]:
                dp[c] = dp[c - coin] + 1
                choice[c] = coin
    if dp[amount] == INF: return None
    out = []
    while amount > 0:
        out.append(choice[amount])
        amount -= choice[amount]
    return out
```

### Bounded coins (each coin available `k_i` times)

Use bounded knapsack with binary decomposition — see [`knapsack.md`](knapsack.md).

### Classic problems

| Problem | Flavor |
|---|---|
| Coin Change (min coins for amount) | min |
| Coin Change 2 (number of ways) | combinations |
| Perfect Squares (min squares summing to N) | min with coin set = perfect squares |
| Combination Sum IV | permutations |
| Integer break / rod cutting | max product / value variant |
| Number of dice rolls summing to target | `k` dice, `f` faces → permutation DP |

## Reference View

### Loop order — the crucial trick

| Loop order | Counts |
|---|---|
| outer `coins`, inner `amount` | **combinations** (unordered) |
| outer `amount`, inner `coins` | **permutations** (ordered) |

Why: outer `coins` fixes the *set of coins* and asks "how many ways ignoring order." Outer `amount` asks "how many paths to reach this amount," where each step picks any coin — different coin orders count separately.

### Complexity

| Variant | Time | Space |
|---|---|---|
| min coins / combinations / permutations | `O(n · A)` | `O(A)` |
| bounded (binary decomposition) | `O(A · Σ log k_i)` | `O(A)` |
| reconstruction | `O(n · A)` + `O(A)` extra | `O(A)` |

`n` = number of coin types, `A` = amount.

### Canonical vs non-canonical coin systems

A coin system is **canonical** if the greedy (largest coin first) always gives the minimum number of coins.

- US pennies/nickels/dimes/quarters (1, 5, 10, 25) — canonical.
- Counterexample: denominations `{1, 3, 4}` for amount 6 — greedy: `4+1+1 = 3 coins`; optimal: `3+3 = 2 coins`.

DP handles both; greedy only works for canonical.

### Counting large numbers

For "number of ways mod M" problems:

```python
def num_combinations_mod(coins, amount, mod=10**9 + 7):
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:
        for c in range(coin, amount + 1):
            dp[c] = (dp[c] + dp[c - coin]) % mod
    return dp[amount]
```

### Pitfalls

- **Wrong loop order** → counts the wrong thing (combinations vs permutations).
- **`dp[0] = 1` or `0`?** For counting ways, `dp[0] = 1` (one way: pick nothing). For min coins, `dp[0] = 0`.
- **Forgetting the `INF` check** at the end of min-coins — `return -1` (or similar) if unreachable.
- **Negative or zero denominations** — undefined behavior; guard inputs.
- **Greedy coin change for arbitrary coins** — classic wrong answer.
- **Using `dp[c] = min(dp[c], dp[c-coin]+1)` without checking reachability** — overflows to garbage.

### Real-world uses

- **Currency and vending machines** — min-coin change (for canonical systems).
- **Payment splitting** — "how many ways to split $X across these bill denominations."
- **Combinatorial counting problems** — dice, stamps (Chicken McNugget).
- **Compilers / register scheduling** — variations of coin-like problems.
- **Game design — counting hand configurations** in card games.

### When *not* to use

- Coin system is canonical → greedy is `O(n)` and simpler.
- Denominations are continuous → not a coin-change problem.
- Amount `A` is huge (say, > 10⁹) → DP table blows up; consider number-theoretic approaches (Chicken McNugget theorem for 2 coins, generating functions for small `n`).

## See Also

- [`knapsack.md`](knapsack.md) — general unbounded knapsack.
- [`../paradigms/dynamic-programming.md`](../paradigms/dynamic-programming.md) — umbrella.
- [`../paradigms/greedy.md`](../paradigms/greedy.md) — for canonical coin systems.
- [`../number-theory/combinatorics.md`](../number-theory/combinatorics.md) — Frobenius / Chicken McNugget.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
