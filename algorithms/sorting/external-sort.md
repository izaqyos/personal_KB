# External Sort

- **Source:** distilled from DB/OS textbooks + CP patterns
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

- Dataset doesn't fit in RAM — you're working off disk / SSD / network storage.
- Sorting logs, CSVs, or intermediate shuffle output in batch pipelines.
- Merging already-sorted streams (from multiple shards or clusters).

The canonical algorithm is **external merge sort**: split into RAM-sized runs, sort each in memory, merge runs back together with a k-way merge.

## Interview View

### Template — two-pass external merge sort (sketch)

```python
import heapq
from itertools import count

def external_sort(input_path, output_path, mem_limit_bytes=100_000_000):
    # Phase 1: create sorted runs
    run_paths = []
    with open(input_path) as f:
        chunk = []
        size = 0
        for line in f:
            chunk.append(line)
            size += len(line)
            if size >= mem_limit_bytes:
                run_paths.append(write_sorted_run(chunk))
                chunk.clear(); size = 0
        if chunk:
            run_paths.append(write_sorted_run(chunk))

    # Phase 2: k-way merge using a min-heap
    files = [open(p) for p in run_paths]
    with open(output_path, 'w') as out:
        for line in heapq.merge(*files):
            out.write(line)
    for f in files: f.close()

def write_sorted_run(lines):
    import tempfile
    lines.sort()
    tmp = tempfile.NamedTemporaryFile(mode='w', delete=False)
    tmp.writelines(lines)
    tmp.close()
    return tmp.name
```

`heapq.merge` does exactly the k-way merge — one entry per input stream in a min-heap.

### K-way merge using a heap

```python
import heapq

def k_way_merge(streams):
    heap = []
    iters = [iter(s) for s in streams]
    for i, it in enumerate(iters):
        try:
            val = next(it)
            heapq.heappush(heap, (val, i))
        except StopIteration:
            pass
    while heap:
        val, i = heapq.heappop(heap)
        yield val
        try:
            nxt = next(iters[i])
            heapq.heappush(heap, (nxt, i))
        except StopIteration:
            pass
```

Each output step: one pop + one push → `O(log k)`. Total: `O(n log k)` for n items across k streams.

### Classic problems

| Problem | Solution |
|---|---|
| Sort 100GB of log lines, 4GB RAM | External merge sort, 25 runs of 4GB, merge |
| Merge K sorted streams | k-way merge with heap |
| Top-N from huge file | tournament / reservoir / external sort + head |
| Group-by on huge file | external sort by group key, then scan |
| Distributed sort | local sort + shuffled k-way merge (MapReduce pattern) |

## Reference View

### Phase structure

1. **Run generation.** Read chunks that fit in memory; sort each in memory (Timsort); write as a sorted run.
2. **Merge phase.** k-way merge using a heap. If you have more runs than you can merge at once (fan-in limited by memory / file handles), do multiple rounds: merge `k` runs at a time → `R/k` bigger runs → repeat.

### Memory budget

With memory `M`, each run is `~M` bytes.
- Number of runs: `R = N/M`.
- Fan-in `k` = how many files you can keep open + buffers for. Practical: `k = M / block_size`.
- If `R ≤ k` → single merge pass = 2 reads/writes of the data total.
- Else, multi-pass merging: `⌈log_k R⌉` passes.

### Replacement selection (fewer, larger runs)

Instead of chunk-sort-write, use a heap of size `M`: keep filling it until full, then pop the smallest that's `≥` last output → write; if input's next is `<` last output, mark it for the next run. Produces runs of expected size `~2M` instead of `M`, halving the number of merge passes.

### External sort in distributed systems

MapReduce shuffles are external sorts spanning many nodes. Each mapper produces locally sorted runs (partitioned by reducer key hash); reducers pull their partition from each mapper and k-way merge. Spark/Flink do essentially the same with more caching.

### I/O vs CPU

External sort is usually **I/O-bound** — CPU runs ahead. Optimization: compress runs (CPU cost buys I/O savings), use sequential reads, align to block boundaries, avoid random seeks.

### Complexity

| Quantity | Cost |
|---|---|
| Reads + writes per merge pass | `2N` |
| Number of merge passes | `⌈log_k (N/M)⌉` |
| CPU time per item | `O(log k)` heap ops per output |
| Total I/O | `2N · (1 + ⌈log_k (N/M)⌉)` |

Typically one pass if `N/M ≤ k` (usually the case).

### Pitfalls

- **File-handle limit** (`ulimit`, typically 1024–65535) — don't try to open more streams than the OS allows. If you must, merge in rounds.
- **Encoding** — line-based merging assumes UTF-8 / ASCII; binary records need fixed-size I/O or length-prefixed.
- **Tie-breaking** — stable sort requires tagging records with their input stream index and original offset; otherwise equal keys can arbitrarily reorder.
- **Disk space** — total scratch space is `2×` input size during the merge phase. Make sure the filesystem has headroom.
- **Sort key normalization** — if your key requires canonicalization (case folding, locale collation), do it once before writing runs; repeated work during merge is slow.
- **Line length bounded assumption** — gigabyte-long "lines" crash naive readers. Use buffered reads.

### Real-world uses

- **Unix `sort`** — external merge sort. `sort -S 2G` sets the memory budget; spills to tmpfiles.
- **Databases: sort-merge joins, ORDER BY on huge tables** — typically external sort.
- **Hadoop MapReduce shuffle** — external sort across the cluster.
- **Spark shuffle spill** — external sort when partition doesn't fit in memory.
- **Log analysis** — sort petabytes of log events by timestamp before analysis.
- **OLAP / warehouse pre-aggregation** — sorted input enables linear-time group-by.

### When *not* to use

- Data fits in RAM → in-memory sort is simpler and faster.
- You can stream-process with a rolling window (no full sort needed).
- You only need top-K — a heap of size K (`O(n log k)`) avoids sorting the rest.
- You can replace "sort then group" with "hash group" if you don't need the sorted output.

## See Also

- [`comparison-sorts.md`](comparison-sorts.md) — in-memory sorting.
- [`../../data-structures/trees/heap.md`](../../data-structures/trees/heap.md) — underlying k-way merge structure.
- [`../../system-design/`](../../system-design/) — MapReduce / shuffle designs.
- [`../../interviews/algorithms-ds.md`](../../interviews/algorithms-ds.md) — interview recap.
