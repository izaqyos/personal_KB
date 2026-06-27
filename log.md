# KB Ingest Log

> **Source:** Personal KB maintenance
> **Author:** Yosi Izaq
> **Captured:** 2026-05-07
> **Status:** Active
> **Type:** compiled

---

Append-only. Format: ## [YYYY-MM-DD] action | topic | source

---

## [2026-06-04] ingest | FE/react/virtualization/ | claude chat (FW rules page debate)

- Added `FE/react/virtualization/` — decision pack companion to existing `js-fe-frameworks/react-virtualization.md`. Where the existing file is the *how*, this one is the *whether* and *how-to-argue-the-whether*:
  - `README.md` — 101 dump + downsides catalogue + variable-height pain + style-prop retrofit problem + alternatives-to-`.map()` decision table
  - `perf-budget.md` — concrete numerical budget template (mount < 100ms, scroll ≥ 50fps, INP < 200ms, DOM nodes < 8k) + measurement protocol + escalation order (memo → useMemo → debounce → column-virt → pagination → full virt)
  - `tl-debate.md` — 10-round playbook for pushing back on premature virt, each with TL's claim, the counter, and a redirect onto measurable ground
  - `design-for-retrofit.md` — the `style?: CSSProperties` prop pattern + JS-index striping + forwardRef advice — 10-min concession that converts a future virt project from a 2-sprint refactor to a 1-PR drop-in
  - `demo.html` — single-file React perf demo (toggleable 100 / 1k / 10k / 50k rows, virt-on/off, live FPS+heap+DOM-node panel)
- Indexed in `README.md` under Web Development → JS Frontend Frameworks as a sub-row beneath the existing `react-virtualization.md` entry
- Cross-refs: bidirectional See Also between the two virtualization docs

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

## [2026-06-07] ingest | network/dynamic-dns-ddns.md | web research (RFC 2136, dnspython, provider APIs)
- New compiled DDNS reference for programmers: what DDNS is, RFC 2136 message anatomy (Zone/Prereq/Update/Additional), TSIG auth.
- Python clients: dnspython RFC 2136 + TSIG example (keys from env), provider HTTP API examples (Duck DNS GET, Cloudflare PATCH via requests).
- Update-on-change client loop + TTL/security gotchas. Sources: RFC 2136, dnspython.org, PowerDNS, pfSense.
- Indexed in README.md under Networking and Security (sub-row under network/).

## [2026-06-14] ingest | xss-cross-site-scripting.md | PortSwigger + OWASP cheat sheets + MDN/web.dev (web search)
- New compiled XSS reference: reflected/stored/DOM-based types with vulnerable→fixed demos (Express + React/Angular/Vue), DOM sources & sinks table, mXSS note.
- Defense layers: context-aware output encoding (encode-on-output), framework auto-escaping + dangerouslySetInnerHTML pitfall, DOMPurify allow-list, strict nonce-based CSP + strict-dynamic, Trusted Types (require-trusted-types-for), HttpOnly/SameSite cookies, nosniff.
- Includes copy-pasteable "XSS-Safe Coding" 1-pager cheat sheet (do/don't, context→encoding, sink→safe-swap).
- Indexed in README.md under Networking and Security; bidirectional See Also with interviews/security-patterns.md. Note: user's pasted-text #1 (171 lines) did not reach context — doc built from PortSwigger/OWASP/MDN.

## [2026-06-14] update | xss-cross-site-scripting.md | CP internal code-review training briefing (pasted)
- Folded in the briefing that didn't reach context on first ingest. New "Code-Review Lens" section: one-question review heuristic, unsafe-vs-safe-sink definition, British Airways 2018 Magecart incident anchor, XSS-game level-1 demo link.
- Added 3 code-review scenario challenges (reflected/stored/DOM) each with the minimum-acceptable fix AND why the tempting wrong answers fail (encodeURIComponent for HTML context, regex-strip, char-blacklist).
- Cheat sheet gained REVIEW HEURISTIC + "NOT A FIX" cluster + rule-of-thumb. README note + frontmatter Source/Updated lines refreshed.

## [2026-06-14] ingest | insecure-deserialization.md | CP code-review briefing + PortSwigger + OWASP + MS Learn (web search)
- New compiled deserialization reference, sibling to the XSS doc (shared code-review-lens framing). One-question review heuristic + "exploit runs during parse, validate-after is too late" note.
- WSUS Oct-2025 (CVE-2025-59287) unauth-RCE-as-SYSTEM incident anchor. 3 code-review scenario challenges (raw client bytes / HMAC-signed cache / polymorphic @class) with minimum fix + why wrong answers (HMAC=integrity not safety, blocklist class names, validate-after) fail.
- Gadget-chain explainer (ysoserial), per-language danger map (Java/Python/PHP/.NET/Node/Ruby) with dangerous APIs + magic bytes (rO0AB, AC ED, O:8:, __reduce__, _$$ND_FUNC$$_) + safe swaps. Prevention priority list + 1-pager cheat sheet.
- Indexed README (Networking and Security); bidirectional See Also with xss-cross-site-scripting.md.

## [2026-06-15] ingest | network/vpn-auth-psk-vs-x509-vs-wireguard.md | Technical Q&A session (general networking)
- New compiled VPN-auth reference. IPsec (IKE phases, ESP/AH, tunnel/transport; PSK vs x509+EAP), OpenVPN (static-key vs TLS mode + tls-auth/tls-crypt), WireGuard (curve25519 keypairs / Noise_IK / optional PQ PresharedKey).
- 5-column comparison table (PKI, PFS, rotation, offline-dict, scaling, crypto-agility) + maturity path PSK→x509→WireGuard. Clean general-knowledge doc (no internal/CP refs).
- Indexed README (Networking and Security § under network/). See Also → network/sslKB.txt + xss doc.

## [2026-06-24] ingest | databases/relational-design-postgres-mongo.md | Learning session (general DB knowledge)
- New compiled DB-design reference. Normalization 1NF→5NF (+BCNF) w/ anomalies + worked examples + slip-catches; FK referential actions (ON DELETE/UPDATE: NO ACTION/RESTRICT/CASCADE/SET NULL/SET DEFAULT, RESTRICT-vs-NO-ACTION timing, FK-index trap); Postgres capability tour (constraints/MVCC/CTEs/index types/jsonb/pgvector/extensions); Postgres vs Mongo table + normalization tie-back; "Choosing PG for a control-plane/config store" section.
- New top-level `databases/` dir (kb-db + kb-sql were legacy single files, not dirs). Indexed README (Databases and Data). See Also → interviews/database-patterns.md + legacy kb-sql/kb-db. Generic — no internal/CP refs.

## [2026-06-25] update | databases/relational-design-postgres-mongo.md | Learning session (general DB knowledge)
- Added 3 sections: SQL command sub-languages (DDL/DML/DCL/TCL/DQL + DELETE-vs-TRUNCATE-vs-DROP + transactional-DDL); TypeScript+Postgres tooling (Drizzle/Kysely/Prisma/MikroORM/TypeORM/drivers + migrations Atlas/drizzle-kit/node-pg-migrate + control-plane raw-SQL-escape-hatch gotcha + recommended Drizzle+Atlas+zod stack); SQLite when/where (not-for-SoT, edge per-node replica pattern, distributed-SQLite Turso/libSQL/D1/LiteFS, shared Drizzle/Kysely dialect bonus).
- Updated ToC (6 → 9 sections). Generic — no Cv5/internal refs (work-specific PG-vs-Mongo pitch kept out, offered to work KB separately).

## [2026-06-27] ingest | ml-and-ai/llm-kb/open-knowledge-format-okf.md | Google Cloud OKF announcement (2026-06-12) + official spec (knowledge-catalog okf/SPEC.md)
- New file: Open Knowledge Format (OKF) — Google Cloud's vendor-neutral markdown+YAML spec (v0.1) for curated, version-controlled, cross-linked agent knowledge bundles. Distilled from GCloud blog + official SPEC.md (not blog paraphrase).
- Covered: OKF-vs-RAG (complementary), bundle structure, reserved `index.md`/`log.md`, frontmatter (`type` is the only required field + recommended title/description/resource/tags/timestamp), cross-linking (prefer `/`-absolute), conformance rules, design principles, Google reference impls.
- Added a mapping table: this KB is ~80% OKF-shaped already; adoption = add `type`, per-dir `index.md`, normalize log ordering, `/`-absolute links.
- Cross-ref: bidirectional See Also with llm-knowledge-base-maintenance.md (Karpathy LLM-wiki pattern OKF formalizes). Indexed in README ml-and-ai/llm-kb row.

## [2026-06-27] ingest | ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md | DeepReinforce Ornith-1.0 release (2026-06-25) + MarkTechPost coverage
- New file: Ornith-1.0 — DeepReinforce's open-source (MIT) agentic-coding model family (9B/31B dense, 35B/397B MoE), built on Gemma 4 + Qwen 3.5, trained with self-scaffolding RL (learns its own harness/scaffold jointly with the solution policy via token-level GRPO).
- Covered: model sizes + deployment footprint (9B ~19GB bf16, single 80GB GPU), 262k context, benchmarks (Terminal-Bench 2.1 397B=77.5 / 9B=43.1; SWE-Bench Verified 397B=82.4 / 9B=69.4), 3-layer anti-reward-hacking safeguards (trust boundary / deterministic monitor / frozen LLM judge).
- Pros/cons table for adoption: open weights + no egress + strong small-model efficiency vs. not-frontier-leading (trails Opus 4.8 / GLM-5.2-744B), coding-narrow, new/unproven, scoped SOTA claims, runtime-sandboxing burden.
- Distilled from web sources (no canonical source doc) — Type: compiled. Indexed in README ml-and-ai/llm-kb row; bidirectional See Also with local-llm-setup-ollama-continue-vscode.md.

## [2026-06-27] update | ml-and-ai/llm-kb/open-knowledge-format-okf.md | enrichment
- Added explicit "Pros / Cons" section (lock-in/portability/graph-survival/standard vs v0.1-churn/type-only-enforcement/no-retrieval-layer/immature-tooling/manual-curation).

## [2026-06-27] update | ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md | Added "Harness fit" section (web research: Pi harness)
- Added Harness fit section: self-scaffolding implies minimal/freedom-giving harnesses fit best, prescriptive ones can fight the learned scaffold.
- Pi (pi.dev / earendil-works/pi) = near-ideal match (4-tool minimal core, OpenAI-compatible → drives Ollama-served Ornith). Included ready-to-use ~/.pi/agent/models.json config for Ornith-35B-GGUF.
- Captured 48GB M4 Pro cautions (context budget ~28GB w/ 128K, start lower + /compact; <think> block leakage) + use-case list + which sibling model to use instead for non-coding tasks.

## [2026-06-27] ingest | ml-and-ai/llm-kb/ornith-pi-local-setup-m1max.md | Compiled setup guide (Ollama + Pi docs + Ornith release)
- New file: step-by-step install/setup for Ornith-1.0-9B via Ollama + Pi harness on MBP M1 Max / 32 GB.
- Covered: 9B-over-35B rationale for 32GB (Metal ~24GB budget), prereqs (brew/node/ollama), GGUF pull, num_ctx=32K via Modelfile, standalone smoke test, Pi install + ~/.pi/agent/models.json config, first agentic loop test, troubleshooting table.
- Flagged 2 verify-at-install TODOs: exact 9B GGUF repo/quant + Pi npm package name (not fabricated). Noted personal-machine choice vs CP-laptop install-policy concern.
- Cross-ref: bidirectional See Also with ornith-1.0-agentic-coding-model.md + local-llm-setup-ollama-continue-vscode.md. Indexed in README ml-and-ai/llm-kb row.
