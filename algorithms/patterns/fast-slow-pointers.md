# Fast / Slow Pointers (Floyd's Tortoise and Hare)

- **Source:** distilled from LeetCode/CP patterns
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

- Detect a cycle in a linked list or a functional graph `f: X → X`.
- Find the start of the cycle.
- Find the middle of a linked list in one pass.
- Happy Number / cycle detection in numeric sequences.
- Detect duplicate in `[1..n]` array (treat array as a function).

Why it works: if a cycle exists, the fast pointer (speed 2) laps the slow pointer (speed 1) and they meet inside the cycle in at most `μ + λ` steps, where `μ` is the "tail" length and `λ` is the cycle length. Deterministic `O(n)` time, `O(1)` space.

## Interview View

### Template — detect cycle

```python
class ListNode:
    def __init__(self, val=0, nxt=None):
        self.val = val
        self.next = nxt

def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
```

### Template — start of cycle (Floyd's 2-phase)

```python
def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            break
    else:
        return None
    slow = head
    while slow is not fast:
        slow = slow.next
        fast = fast.next
    return slow
```

Why phase 2: let `μ` = distance from head to cycle start, `λ` = cycle length, `k` = distance from cycle start to meeting point. After meeting, `slow` traveled `μ + k`, fast traveled `2(μ + k)` but also `μ + k + n·λ`, so `μ + k ≡ 0 (mod λ)`. A pointer walked `μ` from head and another `μ` from the meeting point both land at the cycle start.

### Template — middle of linked list

```python
def middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # for even length, this is the second of the two middles
```

### Classic problems

| Problem | Trick |
|---|---|
| Linked List Cycle I | fast/slow meeting |
| Linked List Cycle II (start) | Floyd phase 2 |
| Happy Number | apply `digits_squared_sum` repeatedly, detect cycle |
| Find Duplicate in `[1..n]` | treat `nums[i]` as "next" pointer |
| Middle of Linked List | slow at end = middle |
| Palindrome Linked List | middle + reverse second half + compare |
| Reorder List | middle + reverse + merge |

### Duplicate in `[1..n]` (no extra space, no mutation)

```python
def find_duplicate(nums):
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow
```

## Reference View

### Variants

- **Floyd's algorithm** — speeds 1 and 2. Standard.
- **Brent's algorithm** — teleport `slow` to `fast` periodically; fewer `next` calls in practice, same `O(n)` asymptotics. Useful when "advance" is expensive.
- **k-apart gap** — for "nth from end in one pass," move `fast` k steps then walk both together (a fast/slow *gap*, not a *speed*, idea).

### Brent's variant (sketch)

```python
def brent_cycle(head):
    power = lam = 1
    tortoise = head
    hare = head.next
    while tortoise is not hare:
        if power == lam:
            tortoise = hare
            power *= 2
            lam = 0
        hare = hare.next
        lam += 1
    # lam = cycle length; find start by advancing hare lam steps then walking together.
```

### Complexity

| Task | Time | Space |
|---|---|---|
| cycle detection | `O(n)` | `O(1)` |
| cycle start | `O(n)` | `O(1)` |
| middle node | `O(n)` | `O(1)` |
| compare: hash-set approach | `O(n)` | `O(n)` |

The win is **space**, not time. If `O(n)` aux is fine, a hash set is simpler and equally fast.

### Pitfalls

- Null checks on `fast` *and* `fast.next` — forgetting one segfaults/NPEs on even-length lists.
- Reassigning `slow = head` for phase 2 — classic off-by-one if you start `slow = head.next`.
- "Middle" ambiguity: for even `n`, Floyd's `slow` lands on index `n//2` (second middle). If you want the first middle, start `fast = head.next`.
- Applying cycle detection to an array that can be mutated: much simpler to mark visited by negating. Floyd's is for when you *can't* mutate or there's no extra space.

### Real-world uses

- **Garbage collection / reference graphs** — cycle detection in cyclic object graphs (pre-mark-and-sweep hack on constrained devices).
- **Pseudo-random number generator cycle detection** — Pollard's `ρ` for integer factorization uses Floyd/Brent.
- **Detecting loops in DNS CNAME chains, URL redirects, symlink resolution**.
- **State-machine loop detection** — finite automata where you only have "step," not an adjacency listing.
- **Cryptographic hash-chain analysis** — birthday/meet-in-the-middle precursors on iterated hashes.

### When *not* to use

- You have fast random access and can afford `O(n)` space → hash set is simpler.
- The graph isn't functional (each node has multiple outgoing edges) — Floyd's assumes a single `next`.
- You need *all* cycles or SCC structure — use Tarjan/Kosaraju instead.

## See Also

- [`../../data-structures/linear/linked-lists.md`](../../data-structures/linear/linked-lists.md) — base DS.
- [`two-pointers.md`](two-pointers.md) — different-direction same-pattern family.
- [`../number-theory/`](../number-theory/) — Pollard's ρ uses this trick for factorization.
- [`../graph/connectivity-scc.md`](../graph/connectivity-scc.md) — when "cycle" means structural cycles in general graphs.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
