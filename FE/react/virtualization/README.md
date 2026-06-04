---
title: react virtualization
captured: 2026-05-20
source: claude chat
tags: [react, fe, performance, lists, tables]
---

# react virtualization

knowledge dump from a learning session — what it is, when to use it, what it costs.

contents:
- [the 101](#the-101)
- [interactive demo](#interactive-demo)
- [downsides](#downsides)
- [variable row heights](#variable-row-heights--measurement-cache-pain)
- [the `style` prop retrofit problem](#the-style-prop-retrofit-problem)
- [alternatives to `.map()`](#alternatives-to-map)
- [a11y note](#a11y)
- [tldr / decision guide](#tldr--decision-guide)

---

## the 101

**the problem:** render a list of 10k rows → 10k DOM nodes → slow mount, slow scroll, big memory. browser chokes on layout/paint.

**the trick:** at any moment user only sees ~20 rows. so only render those 20. as they scroll, swap in new ones, drop old ones. aka "windowing".

### how it works

```
┌─────────────┐  ← container w/ fixed height + overflow:auto
│             │
│   visible   │  ← only these rows actually in DOM
│   window    │
│             │
└─────────────┘
   ↕ scrolling

internal "spacer" div has the full virtual height (e.g. 10k * 40px = 400k px)
so the scrollbar feels right.

rendered rows are absolutely positioned at their "real" offset
(or translated via transform: translateY(offset)).
```

steps on every scroll:
1. read `scrollTop` from container
2. compute `startIdx = floor(scrollTop / rowHeight)`, `endIdx = startIdx + visibleCount + overscan`
3. slice `items[startIdx..endIdx]`, render those, position each at `top = idx * rowHeight`

**overscan** = render a few extra rows above/below the viewport so fast scrolling doesn't show blank space.

### fixed vs variable heights

- **fixed:** trivial. `offset = idx * rowHeight`. cheap.
- **variable:** measure each row, cache, reposition. layout shift on first render. harder.

### libraries (2026)

- **@tanstack/react-virtual** — headless, hooks-based, most flexible. default pick now.
- **react-window** — small, simple, fixed/variable lists + grids. legacy but still solid.
- **react-virtuoso** — batteries included, handles dynamic heights well, sticky headers, grouped lists.
- **react-virtualized** — the OG. bigger, older API. avoid for new code.

### minimal example (react-window)

```jsx
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={10000}
  itemSize={40}
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>row {index}</div>
  )}
</FixedSizeList>
```

### gotchas

- container needs bounded height
- use stable item ids as keys (not array index)
- a11y: add `aria-rowcount`, `aria-rowindex`, role attrs
- ctrl+f breaks
- nested scroll containers are painful

### when to reach for it

- list/table with > ~200 rows
- infinite scroll feeds
- chat history, logs, file trees
- grids (yes, both axes can be virtualized)

under ~100 rows? don't bother. plain `.map()` is fine and simpler.

### related ideas (not the same thing)

- **pagination** = server-side "virtualization". load page N on demand.
- **intersection observer** = lazy-load when entering viewport. different mechanism.
- **react concurrent rendering** (`useDeferredValue`, `startTransition`) defers work, doesn't reduce DOM size.

---

## interactive demo

see [`demo.html`](./demo.html) — open in browser.

- 1000-row employee table (toggleable to 100 / 10k / 50k)
- two modes via toggle: **no virt** vs **virt**
- live perf panel: mount time, DOM rows, total DOM nodes, scroll FPS, JS heap
- both render the same visual table — only the strategy differs

### code diff between the two modes

both share the same `<Row>` and `<Head>` components. only the container differs.

**no-virt:**
```jsx
function PlainTable({ rows }) {
  return (
    <div className="table-container">
      <table>
        <Head />
        <tbody>
          {rows.map(r => <Row key={r.id} row={r} />)}   {/* ← all 1000 */}
        </tbody>
      </table>
    </div>
  );
}
```

**virt (hand-rolled):**
```jsx
function VirtualTable({ rows, rowHeight = 41, overscan = 5 }) {
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [viewportH, setViewportH] = useState(600);

  useLayoutEffect(() => {
    setViewportH(containerRef.current.clientHeight);
  }, []);

  // ── the entire virtualization algorithm in 4 lines ──
  const startIdx = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const visibleCount = Math.ceil(viewportH / rowHeight) + overscan * 2;
  const endIdx = Math.min(rows.length, startIdx + visibleCount);
  const visibleRows = rows.slice(startIdx, endIdx);

  const topPad    = startIdx * rowHeight;
  const bottomPad = (rows.length - endIdx) * rowHeight;

  return (
    <div className="table-container"
         ref={containerRef}
         onScroll={e => setScrollTop(e.currentTarget.scrollTop)}>
      <table>
        <Head />
        <tbody>
          <tr style={{ height: topPad }}><td colSpan={7} /></tr>
          {visibleRows.map(r => <Row key={r.id} row={r} />)}
          <tr style={{ height: bottomPad }}><td colSpan={7} /></tr>
        </tbody>
      </table>
    </div>
  );
}
```

~15 lines of logic. the lib does this exact thing with bells on (binary search for variable heights, RAF batching, smarter overscan).

### perf observed (m-series mac, chrome)

| metric          | no-virt (1k) | virt (1k) | no-virt (10k) | virt (10k) |
|-----------------|--------------|-----------|---------------|------------|
| mount time      | ~80 ms       | ~3 ms     | ~800 ms       | ~3 ms      |
| DOM rows        | 1,000        | ~20       | 10,000        | ~20        |
| total DOM nodes | ~7,000       | ~150      | ~70,000       | ~150       |
| scroll FPS      | ~25–40       | 60        | ~5–10         | 60         |
| heap            | ~25 MB       | ~10 MB    | ~80 MB        | ~10 MB     |

bump to **50k rows** in no-virt mode → tab hangs for several seconds on mount. virt → instant.

---

## downsides

virt is a perf optimization with real UX costs. not free.

### 1. browser features break

- **ctrl+f / find-in-page** — only searches DOM. rows not rendered = invisible to search.
- **print** — only prints what's in DOM.
- **screenshot / save-as-PDF** — same.
- **screen readers** — see only visible rows. need `aria-rowcount`, `aria-rowindex`, role attrs to fake the full structure.
- **copy-paste a range** — can't select rows that aren't rendered.

### 2. layout constraints

- container needs a fixed height
- nested scrolling is painful
- CSS that depends on siblings breaks (`:nth-child`, `:last-child`, css-counters)
- sticky headers inside tables get weird

### 3. variable / unknown row heights

- need to measure each row after render → cache → reposition. layout shift on first scroll.
- scrollbar position lies until measurements come in.
- "scroll to item N" requires knowing offsets for all preceding rows.
- images/async content that change size mid-scroll → jumpy scroll.

### 4. scroll behaviors break

- anchor links (`#section-5`) — target not in DOM.
- back-button scroll restoration — flash of blank.
- smooth scroll-to-item — needs lib API.
- scroll-into-view on focus — focused element disappears → focus lost.

### 5. dev complexity

- debugging — "is row in data or just out of window?"
- react devtools — only shows mounted rows.
- e2e tests get flaky — playwright/cypress can't click row #500 without scrolling.
- visual regression tools see partial table.

### 6. interaction edge cases

- multi-select w/ shift+click across unrendered rows
- drag-and-drop reorder — drop target scrolls out → unmounts → drag dies
- hover tooltips detach mid-interaction
- inline editing — scroll away → unmount → lost input
- enter/exit animations confused with mount/unmount

### 7. dataset still in memory

virt reduces **DOM nodes**, not **JS heap**. 10k row objects still live in state. for huge datasets you also need pagination, server-side filtering, or incremental fetch.

### 8. SEO / SSR

- SSR rendering includes only initial window. crawlers see ~20 rows.
- for content tables (products, docs), this matters. for admin UIs, it doesn't.

### 9. forced reflow risk

every scroll where heights change → read `offsetHeight` → triggers layout. libs handle this; hand-rolled often doesn't.

### 10. "i'll just add virt later" is a lie

retrofitting touches:
- layout (container height)
- product (ctrl+f gone)
- tests (flaky)
- row component contract (must accept `style`)

rarely a 1-line change.

---

## variable row heights = measurement cache pain

### the problem

with fixed height, `offset(N) = N * height`. O(1). no measurement.

with variable heights, you don't know row N's height until you render it and measure it. but you need its offset *before* rendering it to know if it's in the viewport. chicken-and-egg.

### what libs do

1. **estimate** — caller provides `estimateSize(idx) => 50`
2. render rows using estimates → position at estimated offsets
3. after paint, **measure** real heights via `ResizeObserver` / `offsetHeight`
4. **cache** real heights
5. **recompute** offsets, **re-render** with corrected positions
6. on scroll, use cached where known, estimates where not

### why it's painful

- **layout shift on first scroll** — rows further down haven't been measured → estimates → reality differs → rows jump
- **scrollbar inaccuracy** — total height is sum of cached + estimated. thumb position lies.
- **scroll-to-index expensive** — sum of heights 0..N-1, partly estimated
- **async content breaks cache** — `<img>` loads → row grows → cache stale → everything shifts. mitigate with `ResizeObserver` on every row (more cost)
- **forced reflow risk** — synchronous `offsetHeight` reads in scroll handler = layout thrash. must batch via RAF.
- **cache invalidation** — window resize, font load, CSS change, "compact mode" toggle → blow away cache → re-measure everything → layout shift
- **anchored scrolling** — keep user's row at top while loading above → measure new rows + adjust scrollTop before paint → miss timing = visible jump

```
user scrolls
     ↓
lib computes startIdx from cached offsets (may be wrong)
     ↓
renders rows with estimated positions
     ↓
paint
     ↓
ResizeObserver fires → real heights → update cache
     ↓
if cache changed materially → re-layout → re-paint  ← jump
```

### escape hatch

force uniform row height (truncate text, single-line, no expansions). all this pain disappears. that's why virt-friendly designs tend to be flat fixed-height tables.

---

## the `style` prop retrofit problem

virt libs position rows by injecting inline styles. they don't know your CSS.

**react-window** row signature:
```jsx
({ index, style }) => <div style={style}>row {index}</div>
//                          ^^^^^^^^^^^^
//          { position: 'absolute', top: 1234, left: 0, width: '100%', height: 40 }
```

you must spread `style` onto the root element, or every row stacks at `top: 0`.

### why this breaks existing components

before:
```jsx
function RuleRow({ rule }) {
  return (
    <tr className={rule.enabled ? 'enabled' : 'disabled'}>
      <td>{rule.id}</td>
      ...
    </tr>
  );
}
```

after:
```jsx
function RuleRow({ rule, style }) {        // new prop
  return (
    <tr style={style}                       // must spread
        className={rule.enabled ? 'enabled' : 'disabled'}>
      ...
    </tr>
  );
}
```

sounds trivial. but:

1. **every caller updated** — if RuleRow is reused in 4 places, only virtualized one wants style. conditional.
2. **style merging hairy** — what if row already has inline style? order matters; lib must win for positioning.
3. **className theming breaks** — `:nth-child(even)` zebra striping no longer works (rendered rows aren't sequential). move striping to JS.
4. **`<tr>` doesn't accept `position: absolute`** — tables are special. virt often means abandoning `<table>` for `<div role="row">`. accessibility, CSS, consumers all rework.
5. **nested expand/collapse** — variable-height problem.
6. **drag handles, drop indicators, selection rectangles** — relative to row DOM. rows unmount → overlays detach. need separate layer.
7. **forwardRef plumbing** — libs need refs for measurement. every wrapper (memo, HOC, context) needs forwardRef.
8. **tests break** — snapshots include `style={...}` noise. unit tests fail without default.

### retrofit reality

- touch every row component + caller
- migrate `<table>` → `<div role>`
- move CSS-based striping to JS
- thread refs through wrappers
- rewrite expand/collapse for height cache
- relocate overlays
- update tests, storybook, snapshots
- audit a11y

design row components to accept `style` from day 1 if there's any chance you'll virt later. one decision saves a week of refactor.

---

## alternatives to `.map()`

between "render everything with `.map()`" and "full virtualization" there's a middle ground:

### 1. pagination

```jsx
const PAGE = 50;
const [page, setPage] = useState(0);
const visible = rows.slice(page * PAGE, (page + 1) * PAGE);
```

simple, ctrl+f works, SEO-friendly. fits admin tables.

### 2. "show more" / progressive disclosure

```jsx
const [shown, setShown] = useState(50);
{shown < rows.length && (
  <button onClick={() => setShown(s => s + 50)}>show more</button>
)}
```

simple, scroll works, ctrl+f works on shown. fits feeds, comments.

### 3. infinite scroll (intersection observer)

```jsx
useEffect(() => {
  const obs = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) setShown(s => s + 50);
  });
  obs.observe(sentinelRef.current);
  return () => obs.disconnect();
}, []);
```

modern feel. DOM grows unbounded. fits social feeds, chat.

### 4. server-side pagination

real answer for big data — don't ship 10k rows to client at all.

### 5. filter first, render less

force search/filter before rendering.

```jsx
{q.length < 2
  ? <Empty msg="type to search" />
  : filtered.map(r => <Row row={r} />)}
```

turns a big-list problem into a small-list problem. fits lookups, pickers.

### 6. chunked render (rarely needed)

split `.map` across frames via `requestIdleCallback`. fast first paint, all rows eventually in DOM. narrow use case.

### picking one

| dataset size | answer                                 |
|--------------|----------------------------------------|
| < 200        | plain `.map()`                         |
| 200 – 2k     | `.map()` + good filter/sort + memoize  |
| 2k – 10k     | pagination or "show more"              |
| > 10k        | server pagination + (maybe) virt       |
| feed-shaped  | infinite scroll                        |
| huge + scrolly UX needed | virt                       |

---

## a11y

**a11y** = "accessibility" — **a**, then 11 letters, then **y**. like i18n, k8s, l10n.

means: UI works for people not using it the default way.

- screen readers (JAWS, NVDA, VoiceOver) — walk the DOM, read it aloud
- keyboard-only nav — tab, enter, arrows
- high contrast / zoom
- reduced motion
- voice control (dragon)

### virt impact

screen readers walk the DOM. virt only renders ~20 rows → SR announces "table with 20 rows", lies, there are 10k. focus jumps out at window edges. arrow nav breaks.

fix = ARIA describing the full structure even though it's not in DOM:

```jsx
<table role="grid" aria-rowcount={10000}>
  <tbody>
    {visibleRows.map((r, i) => (
      <tr role="row" aria-rowindex={startIdx + i + 1}>
        ...
      </tr>
    ))}
  </tbody>
</table>
```

now SR says "row 487 of 10000". easy to forget; many devs do.

plain `.map()` gets this for free — DOM is the truth.

---

## tldr / decision guide

- **< 200 rows:** plain `.map()`. move on.
- **200 – 2k rows:** `.map()` + filter/search box. memoize the heavy parts.
- **2k – 10k rows:** pagination or "show more". keep ctrl+f working.
- **> 10k rows OR scrolly UX required:** virtualization — but accept the a11y / test / retrofit cost.

### for the FW rules page (≤ 500 rows)

`.map()` + filter is the right call. mount ~30ms, scroll stays 60fps. virt is overkill — we'd pay ctrl+f / a11y / test cost for no real win.

if it grows past ~1k or rows get heavy (nested controls, expanded detail) → revisit.

### design for retrofit

if there's any chance you'll need virt later: make row components accept (and spread) a `style` prop from day 1. cheapest insurance you'll buy.

---

## See Also

- [`../../../js-fe-frameworks/react-virtualization.md`](../../../js-fe-frameworks/react-virtualization.md) — the *how*: step-by-step implementation guide (libs, fixed/variable heights, infinite scroll, grids, gotchas). this dir is the *whether*.
- [`perf-budget.md`](./perf-budget.md) — numerical budget template
- [`tl-debate.md`](./tl-debate.md) — 10-round playbook for pushing back on premature virt
- [`design-for-retrofit.md`](./design-for-retrofit.md) — `style` prop pattern that keeps the door open
- [`demo.html`](./demo.html) — measured perf across 100 / 1k / 10k / 50k rows
