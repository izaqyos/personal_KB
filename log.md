# KB Ingest Log

> **Source:** Personal KB maintenance
> **Author:** Yosi Izaq
> **Captured:** 2026-05-07
> **Status:** Active
> **Type:** compiled

---

Append-only. Format: ## [YYYY-MM-DD] action | topic | source

---

## [2026-04-30] update | js-fe-frameworks/react.md | conversation distillation

- Added new "React 19 Patterns" section with annotated code examples for the headline 19 features:
  1. Actions + `useActionState` + `useFormStatus` — declarative form submission with pending/error
  2. `useOptimistic` — instant UI before network confirms (with auto-revert on error)
  3. `use(promise)` — unwrap promises in render; conditional context reads
  4. `ref` as a regular prop — `forwardRef` no longer needed
  5. Document metadata hoisting (`<title>`, `<meta>`, `<link>` rendered anywhere)
  6. Server Components + Server Actions (App Router pattern with `'use server'`)
- Each example annotated inline with numbered comments explaining the *why*, not just the *what*
- Added "When to reach for what" cheat sheet table mapping goals → React 19 APIs
- Updated ToC

## [2026-04-30] ingest | js-fe-frameworks (react, vue, angular, svelte, ui5) | personal notes + official docs

- Created new section directory `js-fe-frameworks/` for JavaScript frontend framework references
- Added `js-fe-frameworks/README.md` — section index with at-a-glance comparison matrix, "how to pick one" guide, and a common-concepts cross-mapping table (props/state/effect/conditional/list/two-way binding/cleanup/DI across all five)
- Added `js-fe-frameworks/react.md` — what is React, mental model, hooks reference (incl. React 19's `use`, `useOptimistic`, `useActionState`, `useFormStatus`), component patterns, full version history (v0.x → v19) with class→hooks migration cheat sheet and 17→18, 18→19 upgrade gotchas, rendering internals (vDOM/reconciliation/Fiber/concurrent), Server Components, state management options, performance/memoization, ecosystem cheat sheet
- Added `js-fe-frameworks/vue.md` — what is Vue, Composition vs Options API, reactivity (refs, reactive, computed, watch), version history (v0.x → 3.5 + Vapor mode) with v2→v3 migration gotchas, Pinia, VueUse, Nuxt
- Added `js-fe-frameworks/angular.md` — what is Angular, components/templates with new `@if`/`@for`/`@switch` control flow, DI, RxJS, signals, version history (AngularJS → 20 zoneless), key migrations (View Engine→Ivy, NgModules→standalone, Zone.js→zoneless), routing, NgRx vs signals
- Added `js-fe-frameworks/svelte.md` — compile-to-vanilla mental model, runes ($state/$derived/$effect/$props/$bindable etc.), version history (v1 → v5+, v6 plans), SvelteKit (file routing, load, form actions, adapters), Svelte 4 → 5 migration map, stores
- Added `js-fe-frameworks/ui5.md` — SAPUI5 vs OpenUI5, MVC anatomy (XML view + controller + manifest.json), JSON/OData v2/v4 models with binding modes/expression binding/formatters, Fiori Elements floorplans, version history (1.0 → 2.x) with major migrations, UI5 tooling and TypeScript story
- Indexed all five files in main `README.md` under Web Development with a new "JS Frontend Frameworks" subsection
- Cross-refs: each framework file links the other four; all link back to `typescript/`, `javascript-kb`, `nodejs-kb`. UI5 also cross-refs `sap-cf-kb`/`sap-cf-kb-v2`. React cross-refs the existing `typescript/react-sse-hook.md`

## [2026-04-29] ingest | bitnet-b1.58 | arXiv 2402.17764 + 2504.12285 + microsoft/BitNet repo + HF model card + InfoQ

- Added `ml-and-ai/theory/bitnet-b1-58.md` — comprehensive doc on Microsoft's ternary-weight LLM
- Sections: TL;DR, theory (1.58-bit math, BitLinear layer, absmean weight + absmax 8-bit activation quant, architecture deltas vs Llama, why train-from-scratch matters), lineage (b1.0 → b1.58 → 2B4T), full benchmark + memory + energy tables from the 2B4T model card, practical considerations (why GPUs don't help, when not to use, ecosystem variants), and a step-by-step **MacBook Pro M4** guide for `bitnet.cpp` (brew llvm@18 prereq, conda env, gguf download, `setup_env.py -q i2_s`, run + benchmark commands, troubleshooting table)
- Cross-refs: TurboQuant (back-link added), Local LLM Setup, LLM KB Maintenance Guide
- Indexed in `README.md` under ML, AI, and LLMs → ml-and-ai/theory/

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

## [2026-05-07] lint | full-kb-sweep | sanitize-kb

- Fixed broken links in algorithm docs (`algorithms/README.md`, `algorithms/number-theory/bit-manipulation.md`, `algorithms/number-theory/primes.md`).
- Removed unresolved link targets in `README.md` and replaced unresolved references in combinatorics/sliding-window notes with non-link text.
- Added standard metadata headers to outlier docs (`CLAUDE.md`, `agents/KNOWLEDGE-CAPTURE.md`, `deployment/Blue_Green/docs/PIPELINE-SPEC.md`, and nano-banana prompt files).
- Updated maintenance wording in `README.md` to reflect practical exceptions (index/policy files and legacy naming).

## [2026-05-19] ingest | js-fe-frameworks/react-virtualization.md | conversation distillation

- Created [`js-fe-frameworks/react-virtualization.md`](js-fe-frameworks/react-virtualization.md) — step-by-step guide on React virtualization, distilled from a 101-summary into a 12-step learning path:
  1. Understand the problem (10k rows → DOM cost)
  2. Understand windowing (spacer + absolute positioning + per-scroll math)
  3. Decide tree — when to virtualize, when not (row-count thresholds + "yes" / "no" signals)
  4. Library pick — comparison + decision (@tanstack/react-virtual default for new code, react-window for components, react-virtuoso for variable heights)
  5. Hello world (fixed-height, react-window minimal example)
  6. Variable heights — measurement cache pattern; react-window VariableSizeList vs TanStack measureElement vs Virtuoso "just works"
  7. Overscan, scrollToIndex, sticky headers
  8. Virtualized grids (both axes)
  9. Integrate w/ infinite scroll — TanStack + useInfiniteQuery, Virtuoso endReached
  10. Gotchas table — 12 entries (bounded height, keys, a11y, find-in-page, anchored scroll, measure-on-mount jank, nested scroll, form-focus-on-scroll, CSS transform breaking sticky, ResizeObserver, overflow:hidden)
  11. Headless TanStack flavor — full useVirtualizer hook walkthrough
  12. What virtualization is NOT — pagination, IntersectionObserver, useDeferredValue, React.memo, content-visibility: auto
- **Bidirectional cross-ref:** added "Deep dive" link in [`react.md` § Performance § Big lists](js-fe-frameworks/react.md#big-lists) pointing here.
- **Cheat sheet** at the bottom: decision tree from "Need to render > 500 rows" → which lib + sane defaults (overscan 5, sample-10 row estimate, item.id keys, memo the row component).
- Indexed in `README.md` under js-fe-frameworks sub-table.
