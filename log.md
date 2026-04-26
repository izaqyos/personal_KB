# KB Ingest Log

Append-only. Format: ## [YYYY-MM-DD] action | topic | source

---

## [2026-04-23] ingest | dsu-applications | personal notes + CLRS / Felzenszwalb-Huttenlocher / Sedgewick

- Added `data-structures/sets-and-disjoint/applications.md` — canonical DSU workloads walked through end-to-end
- Five scenarios, each with problem/why-DSU-fits/Python code/practical notes:
  1. Incremental graph connectivity (`ConnectivityTracker` with `add_edge` returning bool for cycle detection)
  2. Kruskal's MST (sorted edges + union, stop at `n - 1` edges)
  3. Image segmentation (Felzenszwalb-Huttenlocher 2004: `Int(C) + k/|C|` merge threshold, Int tracked per component)
  4. Type unification in compilers (Hindley-Milner `Unifier` class with occurs check, Var/Con types)
  5. Percolation simulations (virtual TOP/BOTTOM nodes, backwash bug note, p* ≈ 0.5927 for 2D)
- Updated `disjoint-set.md` See Also to back-link applications.md and cross-ref `algorithms/graph/mst.md`
- Updated top-level `README.md` under Disjoint Set subsection

## [2026-04-23] ingest | counting-bloom-filter + cuckoo-filter | personal notes + papers

- Added `data-structures/probabilistic/counting-bloom-filter.md` (Fan et al. 2000 "Summary Cache")
- Added `data-structures/probabilistic/cuckoo-filter.md` (Fan-Andersen-Kaminsky-Mitzenmacher 2014)
- Both with full Interview/Reference views, Python code, sizing tables, pitfalls, real-world uses, and explicit comparisons to each other and to Bloom
- Key points: Cuckoo is the modern default for add/delete/query at FP ≤ 3%; CBF survives mainly in legacy code / embedded
- Expanded Bloom filter's "The Hash Functions" section to explain the double-hashing trick in depth (Kirsch-Mitzenmacher 2008) and walk through the `(h1 + i*h2) % m` code line-by-line
- Updated `data-structures/probabilistic/README.md` files-in-section list
- Updated top-level `README.md` under Probabilistic subsection

## [2026-04-23] update | bloom-filter | worked example

- Added "Why 'usually no' is the sweet spot — worked example" subsection to `data-structures/probabilistic/bloom-filter.md` under Negative Cache pattern
- Clarifies that FP rate only applies to actually-absent subset, not all queries
- Walks through 90%-hit vs 10%-hit scenarios with concrete numbers; savings table for 90/50/10% hit rates
- Fixes the common confusion: ceiling on savings = miss count, Bloom captures ~(1-p) of those

## [2026-04-23] ingest | algorithms | personal notes + distilled from CLRS / Kleinberg-Tardos / Sipser / CP patterns

- Created new top-level section `algorithms/` organizing algorithm knowledge into 9 subdirectories
- Added 45 new `.md` files with dual **Interview View** (template + classic problems) and **Reference View** (variants, complexity, pitfalls, real-world, when not to use), Python throughout
- Files created:
  - `algorithms/README.md` — section index, decision map, cross-refs to DS
  - `algorithms/complexity-theory.md` — P, NP, reductions, classic NPC problems, what to do when NP-hard
  - `patterns/` — two-pointers, sliding-window, prefix-suffix, monotonic-stack-queue, fast-slow-pointers, meet-in-the-middle, binary-search-on-answer, line-sweep (8)
  - `paradigms/` — divide-and-conquer, dynamic-programming, greedy, backtracking, randomized, approximation (6)
  - `sorting/` — comparison-sorts, non-comparison-sorts, external-sort, timsort (4)
  - `searching/` — binary-search, ternary-search, exponential-jump (3)
  - `dp-patterns/` — knapsack, lis-lcs, coin-change, matrix-chain, dp-on-trees, dp-on-dag, bitmask-dp, digit-dp (8)
  - `graph/` — shortest-path, mst, connectivity-scc, matching, flows (5)
  - `strings/` — pattern-matching, z-algorithm, aho-corasick, manachers-palindrome, suffix-structures, edit-distance (6)
  - `number-theory/` — gcd-modular, primes, combinatorics, bit-manipulation (4)
  - `geometry/` — orientation-segments, convex-hull, polygon, closest-pair (4)
  - `archive/AlgorithmsKB` — legacy single-file notes moved
- Split rationale: data-structures/ keeps practical templates; algorithms/ goes deeper on variants and paradigms, complementary not duplicative
- Every file has 5-field frontmatter, ToC, When to Use, Interview View, Reference View, See Also
- Cross-linked to `interviews/algorithms-ds.md`, `data-structures/`, `leetcode-kb`

## [2026-04-23] ingest | data-structures | personal notes + distilled from multiple sources

- Created new top-level section `data-structures/` organizing DS knowledge into 7 subdirectories
- Added 25 new `.md` files with dual **Interview View** / **Reference View** sections, Python code throughout
- Files created:
  - `data-structures/README.md` — section index with decision table + full complexity cheat sheet
  - `linear/` — arrays, linked-lists, stacks-queues
  - `hash-based/` — hash-tables, sets
  - `trees/` — binary-tree, bst, balanced-trees, heap, trie, b-tree
  - `graph/` — graph-representations, graph-algorithms
  - `sets-and-disjoint/` — disjoint-set (Union-Find)
  - `probabilistic/` — README, bloom-filter, count-min-sketch, hyperloglog, skip-list, reservoir-sampling, minhash
  - `specialized/` — lru-cache, segment-tree, fenwick-tree
- Filled gaps vs. previous coverage: bloom filter, HyperLogLog (log log n), disjoint set, count-min sketch, skip list, reservoir sampling, MinHash, BST/heap/trie as standalone files, balanced trees, B-tree
- Every file has 5-field frontmatter, ToC, When to Use, Interview View, Reference View, See Also
- Cross-linked to `interviews/algorithms-ds.md`, `system-design/redis/`, `kb-db`, `leetcode-kb`

## [2026-04-20] ingest | local-llm-setup-ollama-continue-vscode | ~/Downloads

- Added `ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md` (Ollama+Continue VSCode setup on M4 Pro 48GB)
- Added frontmatter + See Also section; indexed in README under ML/AI > llm-kb
- Renamed from `local-llm-setup-ollama-continue.md` to reflect VSCode IDE scope

## [2026-04-10] lint | full-kb-audit | Initial sanitization

- Renamed 69 files/directories to kebab-case
- Added frontmatter headers to 18 .md files
- Added cross-references (See Also) to 20 .md files
- Fixed broken internal links (redis_primer.md -> redis-primer.md)
- Flagged stubs: go-bk (empty), tasks-wiki (1 line), index-wiki (vimwiki relic)
- Created raw/ directory for future source dump migration
- Created this log.md
- Built comprehensive README.md index with Table of Contents

### Raw file candidates (not yet moved)

The following top-level files are raw source dumps (plain text, no markdown).
Future cleanup: convert to .md or move to raw/:

- acs-faqs, c-kb, coe3-kb, containers-kb, devops-kb
- dominions-kb, dominions-kb-1-3, dominions-kb.back
- eclipse-kb, ergonomics-kb, excel-kb
- ge-kb, ge-kb.copy, ge-pet-kb, general-kb
- go-bk, go-kb, intellij-kb, interview-qs-kb
- iphone-kb, java-kb, javascript-kb
- kb-chrome, kb-cisco, kb-cpp, kb-cygwin, kb-db
- kb-ed, kb-jrules, kb-mac, kb-mq, kb-scripts
- kb-security, kb-sql, kb-system-design, kb-tools
- kb-uii, kb-vmware, unix-kb
- leetcode-kb, ml-kb, modeling-drawing-kb
- neovim-kb, nestjs-kb, nodejs-kb, rust-kb
- sap-cf-kb, sap-cf-kb-v2
- sfe-commands, sfe-how-to, shadow-era-kb
- swig-how-to, make-how-to, troubleshoot
- web-programming-kb, wiki-kb, temp-file, stam
