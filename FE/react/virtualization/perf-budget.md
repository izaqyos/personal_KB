---
title: FW rules page — perf budget
captured: 2026-05-20
status: proposed
owner: yosi
tags: [performance, budget, fw, fe]
---

# FW rules page — perf budget

## why this doc exists

agreement between eng + TL on the **numerical bar** below which we don't ship perf optimizations (virt, memoization-mania, etc.).

> perf optimizations are an investment. this doc says when the ROI is positive.

if measurements pass these budgets at the **target dataset size**, we ship plain `.map()`. no further optimization. when measurements fail, we revisit — escalation path defined below.

---

## target dataset

| dimension          | value          | source                |
|--------------------|----------------|------------------------|
| max rows           | 500            | PM scope               |
| typical rows       | 50–200         | observed FW configs    |
| columns per row    | ~7             | current design         |
| row height         | fixed (~40px)  | design system          |
| row content        | text + badge + a few icons | mostly static |
| expansion          | none           | confirmed w/ design    |
| inline edit        | none (modal-based) | confirmed w/ design |

**implication:** uniform fixed-height rows, static content, capped size. ideal `.map()` shape.

---

## budgets

measured on **baseline hardware** (see "measurement protocol" below), **production build**, **cold cache**.

| metric                  | budget    | rationale                                                |
|-------------------------|-----------|----------------------------------------------------------|
| time to interactive (TTI) | < 200 ms | page-level: feels instant                                |
| table mount time        | < 100 ms  | first paint of rows after data arrives                   |
| scroll FPS (sustained)  | ≥ 50      | smooth perception, below 30 feels janky                  |
| input latency (filter)  | < 100 ms  | typing in filter box → table updates                     |
| total DOM nodes (page)  | < 8,000   | rough proxy for memory + layout cost                     |
| JS heap (steady state)  | < 50 MB   | excluding browser baseline                               |
| LCP                     | < 1.5 s   | core web vital                                           |
| INP                     | < 200 ms  | core web vital, interaction responsiveness               |

**if all green at 500 rows → ship plain `.map()`. revisit only when a budget actually fails.**

---

## measurement protocol

repeatable, anyone can run it.

### hardware baseline
- MacBook Pro M1 (or equivalent) **with CPU throttled 4×** via DevTools Performance settings
- this approximates a mid-range customer laptop
- chrome latest, incognito, no extensions

### dataset
- generate 500 rules (use [`demo.html`](./demo.html) as a template, or seed our staging env)
- 50% enabled, 30% disabled, 20% pending — realistic mix
- mix of short and long rule names

### what to record
1. **mount time** — `performance.mark()` before render, `performance.measure()` after first paint. log to console.
2. **scroll FPS** — DevTools Performance → record 5s of continuous scroll → read FPS chart
3. **input latency** — DevTools Performance → record 5s of typing in filter → read interaction delays
4. **DOM nodes** — DevTools Memory → "Heap snapshot" → search "HTMLDivElement" / "HTMLTableRowElement" counts
5. **heap size** — same snapshot, "Total size"
6. **LCP / INP** — Lighthouse run, mobile profile

### where to record
- `perf-budget-results.md` in this dir (gitignored if it leaks customer data; otherwise check in)
- one row per run: date, commit sha, dataset size, hardware, all numbers
- attach DevTools traces for any failure

---

## escalation path

when any budget **fails** at the target size:

1. **identify the bottleneck** — DevTools profiler. don't guess.
2. **try cheapest fix first** (in this order):
   1. memoize the row component (`React.memo`)
   2. memoize the filter result (`useMemo`)
   3. debounce filter input
   4. virtualize columns (if cell count is the issue, not row count)
   5. pagination ("show 100, click for more")
   6. **only then:** full virtualization
3. **re-measure** after each fix. stop at the first one that passes the budget.
4. **document** which fix was applied and why in this file.

virt is step 6, not step 1.

---

## triggers to revisit (without waiting for failure)

even if budgets currently pass, revisit this doc if:

- max row count guidance from PM changes (e.g. > 1000)
- row content changes (added expansion, inline editing, async data)
- design system row height becomes variable
- customer complaint about perf comes in
- benchmark hardware floor drops (we start supporting older devices)

---

## what's explicitly out of scope (today)

- virtualization → only consider if a budget above fails after cheaper fixes
- web workers for filtering → only if filter latency budget fails
- server-side pagination → only if dataset grows past PM's 500
- intersection-observer-based row activation → not solving a measured problem

these are good ideas in other contexts. they are **not** ROI-positive for our current target.

---

## sign-off

- [ ] eng (yosi)
- [ ] TL
- [ ] PM (informational only — they own the dataset size constraint)

once signed, this is the rule. changes require a new measurement showing why.

---

## one-line summary for the meeting

> we agree to ship `.map()` if the table passes these numbers at 500 rows. when (not if) it fails, we apply the cheapest fix that gets us back to green — and virt is the last item on the list, not the first.
