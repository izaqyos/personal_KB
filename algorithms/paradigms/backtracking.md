# Backtracking

- **Source:** distilled from CLRS + CP patterns
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

- You need to enumerate combinatorial structures (permutations, subsets, partitions, placements).
- The state space is too big to brute force fully but admits **pruning** (infeasible partials → early cut).
- Constraint satisfaction: N-Queens, Sudoku, graph coloring, parsing.
- The solution is a sequence of choices with a clear "undo" (DFS on a tree of decisions).

If every partial extension needs to be explored, that's enumeration; if you can cut branches once they're known-bad, that's backtracking.

## Interview View

### Template — skeleton

```python
def backtrack(state, choices):
    if is_goal(state):
        record(state)
        return
    for choice in possible_choices(state, choices):
        if not is_valid(state, choice):
            continue            # prune
        apply(state, choice)
        backtrack(state, choices)
        undo(state, choice)     # the backtrack
```

### Permutations

```python
def permutations(nums):
    out = []
    def bt(path, used):
        if len(path) == len(nums):
            out.append(path[:])
            return
        for i, x in enumerate(nums):
            if used[i]: continue
            used[i] = True
            path.append(x)
            bt(path, used)
            path.pop()
            used[i] = False
    bt([], [False] * len(nums))
    return out
```

### Subsets (include/exclude)

```python
def subsets(nums):
    out = []
    def bt(i, path):
        if i == len(nums):
            out.append(path[:])
            return
        # exclude
        bt(i + 1, path)
        # include
        path.append(nums[i])
        bt(i + 1, path)
        path.pop()
    bt(0, [])
    return out
```

### Combination Sum (dedupe by index)

```python
def combination_sum(candidates, target):
    candidates.sort()
    out = []
    def bt(start, target, path):
        if target == 0:
            out.append(path[:])
            return
        for i in range(start, len(candidates)):
            x = candidates[i]
            if x > target: break
            path.append(x)
            bt(i, target - x, path)  # `i` allows reuse
            path.pop()
    bt(0, target, [])
    return out
```

### N-Queens

```python
def solve_n_queens(n):
    out = []
    cols = set(); diag1 = set(); diag2 = set()
    def bt(r, board):
        if r == n:
            out.append(['.' * c + 'Q' + '.' * (n - c - 1) for c in board])
            return
        for c in range(n):
            if c in cols or r - c in diag1 or r + c in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            board.append(c)
            bt(r + 1, board)
            board.pop()
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    bt(0, [])
    return out
```

### Classic problems

| Problem | Pruning idea |
|---|---|
| Permutations / Subsets | `used[]` bitmap |
| Combinations / Combination Sum | sorted + `start` index |
| Permutations II (dups) | sort + skip `i>start and a[i]==a[i-1] and not used[i-1]` |
| N-Queens | conflict sets by col + diagonals |
| Sudoku | constraint propagation (domain sets) |
| Word Search (grid) | visited-in-path mark, DFS |
| Palindrome Partitioning | check prefix palindromic before recursing |
| Expression Add Operators | carry-multiplier trick to handle precedence |
| Restore IP Addresses | segment must be in `[0, 255]` with no leading zeros |

## Reference View

### Pruning principles

1. **Feasibility pruning** — cut when the partial solution already violates a constraint.
2. **Bound pruning (branch-and-bound)** — cut when an optimistic bound on the rest is still worse than the current best.
3. **Symmetry breaking** — fix the first queen's column to half the board, skip mirror solutions.
4. **Ordering** — try the most constrained variable next (fewest legal values) — MRV heuristic in Sudoku.
5. **Memoization across branches** — if the same substate recurs, it's DP in disguise.

Good backtracking without pruning is still exponential. Good backtracking *with* pruning can solve instances that brute force can't.

### Variants

- **Enumeration** — list all solutions.
- **Existence** — return as soon as one is found.
- **Optimization (branch and bound)** — track best-so-far, prune on bound.
- **Iterative-deepening DFS** — backtracking with incrementally larger depth limits. Trades time for memory, used in IDA*.
- **Constraint propagation** — after each choice, propagate implications to reduce future domains (AC-3 for CSP, "naked singles" in Sudoku).

### Deduplication in permutations/combinations

**Sort + skip at same level**:

```python
def permute_unique(nums):
    nums.sort()
    out = []; used = [False] * len(nums)
    def bt(path):
        if len(path) == len(nums):
            out.append(path[:]); return
        for i in range(len(nums)):
            if used[i]: continue
            if i > 0 and nums[i] == nums[i-1] and not used[i-1]:
                continue   # same value, previous occurrence not used → skip to dedupe
            used[i] = True; path.append(nums[i])
            bt(path)
            path.pop(); used[i] = False
    bt([])
    return out
```

The `not used[i-1]` check means: among equal values, we only branch on the leftmost unused one at each level → one canonical path per distinct permutation.

### Complexity

Generally `O(b^d)` where `b` = branching factor, `d` = depth. Explicitly:

| Problem | Size |
|---|---|
| All permutations of `n` | `O(n · n!)` |
| All subsets of `n` | `O(n · 2^n)` |
| All combinations of size `k` | `O(k · C(n,k))` |
| N-Queens (with pruning) | empirically much less than `n!` |
| Sudoku (with propagation) | near-constant for common instances |

Space: `O(d)` for recursion + the path.

### Pitfalls

- **Forgetting to undo** — if you mutate shared state, you must undo after the recursive call.
- **Shallow-copying `path`** — you append the same list object to `out` and keep mutating it. Use `path[:]` or `tuple(path)`.
- **Duplicate results** on multiset inputs — sort + skip rule above.
- **Exponential without pruning** — if you see all branches always explored, rethink. Often a constraint check belongs *before* the recursive call, not after.
- **Recursion depth** — Python's default is 1000; raise for deep searches.
- **Global state across unrelated branches** — easy to leak; prefer parameters.

### Real-world uses

- **SAT / SMT solvers** — DPLL is backtracking with unit propagation.
- **Constraint programming (MiniZinc, OR-Tools)** — variable ordering + propagation + backtracking.
- **Puzzle solvers** — Sudoku, crosswords, Kakuro.
- **Planning / scheduling** — rostering, timetabling.
- **Regex engines (backtracking flavor)** — PCRE, Python's `re`. Pathological inputs cause catastrophic backtracking.
- **Game engines — minimax with alpha-beta pruning** — backtracking + bound pruning.
- **Parser generators** — PEG / packrat parsers (with memoization = DP).

### When *not* to use

- The state space is so small that brute-force enumeration is fine.
- The problem has overlapping subproblems — DP is drastically faster.
- The problem admits a greedy proof — greedy wins.
- You need *count* of solutions but they number in the trillions — there's often a closed form or inclusion-exclusion.

## See Also

- [`dynamic-programming.md`](dynamic-programming.md) — backtracking with memoization = DP.
- [`greedy.md`](greedy.md) — sometimes backtracking is overkill.
- [`randomized.md`](randomized.md) — random restarts escape bad backtracking branches.
- [`../patterns/meet-in-the-middle.md`](../patterns/meet-in-the-middle.md) — tame exponential search.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
