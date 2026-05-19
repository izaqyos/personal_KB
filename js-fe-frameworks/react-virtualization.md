# React Virtualization — Step-by-Step Guide

> **Source:** Personal notes + library docs (react-window, @tanstack/react-virtual, react-virtuoso) — distilled from 101-summary, 2026-05-19
> **Author:** Yosi Izaq
> **Captured:** 2026-05-19
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [TL;DR](#tldr)
- [Step 1 — Understand the problem](#step-1--understand-the-problem)
- [Step 2 — Understand the trick (windowing)](#step-2--understand-the-trick-windowing)
- [Step 3 — Decide: do you actually need it?](#step-3--decide-do-you-actually-need-it)
- [Step 4 — Pick a library](#step-4--pick-a-library)
- [Step 5 — Hello world: fixed-height list (react-window)](#step-5--hello-world-fixed-height-list-react-window)
- [Step 6 — Variable-height rows](#step-6--variable-height-rows)
- [Step 7 — Overscan, scrollToIndex, sticky headers](#step-7--overscan-scrolltoindex-sticky-headers)
- [Step 8 — Virtualized grids (both axes)](#step-8--virtualized-grids-both-axes)
- [Step 9 — Integrate with infinite scroll](#step-9--integrate-with-infinite-scroll)
- [Step 10 — Gotchas you WILL hit](#step-10--gotchas-you-will-hit)
- [Step 11 — Headless flavor: @tanstack/react-virtual](#step-11--headless-flavor-tanstackreact-virtual)
- [Step 12 — What virtualization is NOT](#step-12--what-virtualization-is-not)
- [Cheat sheet](#cheat-sheet)
- [See Also](#see-also)

---

## TL;DR

> Render only the rows the user can see (~20), not the whole list (~10k). The scrollbar lies (fake total height); each visible row is absolutely positioned at its real offset. Library does the math on every `scroll` event.
>
> **Default lib pick (2026):** `@tanstack/react-virtual` (headless hooks) for new code. `react-window` (the OG) if you want a batteries-light components API. `react-virtuoso` if you have variable heights + sticky headers + want it to "just work."

If you're going to skim, read **Step 3 (decide first)** + **Step 10 (gotchas)**. Everything else is mechanism.

---

## Step 1 — Understand the problem

Render a list of 10,000 rows in React the naive way:

```jsx
{rows.map((row) => <Row key={row.id} data={row} />)}
```

What happens:
- **10,000 DOM nodes** created on mount
- **10,000 reconciliations** on first render
- **Browser layout/paint** scales w/ DOM size — full-list layout can take hundreds of ms
- **Memory** holds 10,000 fibers + components + props references
- **Scroll** triggers re-layout on any height change → janky

The user is staring at maybe **20 rows**. Rendering the other 9,980 is pure waste.

---

## Step 2 — Understand the trick (windowing)

At any moment, the user sees ~20 rows in the viewport. So:

1. Make a **fixed-height container** w/ `overflow: auto`.
2. Inside, drop a **spacer div** with the full virtual height (e.g. `10000 × 40px = 400000px`). This is what the scrollbar measures against.
3. Render **only the visible rows**, absolutely positioned at their real offset (or via `transform: translateY(offset)`).
4. On every `scroll` event, recompute which rows are visible and swap them in/out.

```
┌─────────────┐  ← container (fixed height, overflow:auto, position:relative)
│             │
│   visible   │  ← only 20 rows in DOM
│   window    │
│             │
└─────────────┘
   ↕ scrolling

inside the container:
  - a single spacer div w/ height = totalRows * rowHeight (so scrollbar feels right)
  - rendered rows w/ position:absolute, top = idx * rowHeight
```

### What the lib does per scroll event

```js
function onScroll() {
  const scrollTop = container.scrollTop;
  const startIdx = Math.floor(scrollTop / rowHeight);
  const endIdx   = startIdx + visibleCount + overscan;
  setRange({ startIdx, endIdx });   // triggers re-render w/ items[startIdx..endIdx]
}
```

That's the whole core algorithm. Everything else is library polish.

**Overscan** = render N extra rows above and below the viewport so fast scrolling doesn't show blank space before the next paint catches up. Typical default: 2–5.

---

## Step 3 — Decide: do you actually need it?

Don't reach for virtualization reflexively. Decision tree:

| Row count | Action |
|---|---|
| < 100 | Plain `.map()`. Don't bother. |
| 100–500 | Profile first. Plain map is probably fine unless rows are heavy components (charts, editors). |
| 500–2,000 | Consider it. Especially if you see scroll jank. |
| 2,000+ | **Yes, virtualize.** |
| Infinite feed (chat, logs, news) | **Yes, virtualize + infinite-scroll combo.** |

**Other "yes" signals** (regardless of count):
- Each row is expensive to mount (animation, editor, video player)
- Mobile devices (CPU/memory weaker than your dev machine)
- Mount time > 100ms when measured w/ React Profiler

**"No" signals:**
- Find-in-page (Ctrl+F) is a core UX requirement → virtualization breaks it
- Screen-reader users navigate row-by-row → a11y is harder (still possible — see Step 10)
- The list is naturally bounded (top 10, top 50) → just render it

---

## Step 4 — Pick a library

| Library | When | Strengths | Weaknesses |
|---|---|---|---|
| **@tanstack/react-virtual** | New code, any framework | Headless hooks; framework-agnostic core; flexible; modern API | You build your own DOM/layout — more code than a components lib |
| **react-window** | Simple lists + grids | Small (~3KB), simple API, mature | Limited customization; sticky/groupings need workarounds |
| **react-virtuoso** | Variable heights, chats, grouped lists | Batteries included, handles measure-on-mount well, sticky headers built-in | Larger; opinionated; styling needs more care |
| **react-virtualized** | Legacy code | Most features, oldest | Big, dated API, not actively recommended for new code |

**Default 2026 pick:** `@tanstack/react-virtual` if you control the layout. `react-window` if you want components and small bundle. `react-virtuoso` if rows have unknown variable heights and you want it to just work.

---

## Step 5 — Hello world: fixed-height list (react-window)

Smallest possible working example.

### Install

```bash
npm i react-window
```

### Code

```jsx
import { FixedSizeList } from 'react-window';

function MyList({ items }) {
  return (
    <FixedSizeList
      height={600}        // viewport height in px
      width="100%"
      itemCount={items.length}
      itemSize={40}       // each row is 40px tall
    >
      {({ index, style }) => (
        <div style={style}>          {/* style = the absolute positioning the lib computes */}
          {items[index].name}
        </div>
      )}
    </FixedSizeList>
  );
}
```

### What you get

- `FixedSizeList` creates the container w/ `overflow: auto`.
- The `{style}` prop carries `position: absolute; top: <idx>*40px; height: 40px; width: 100%`.
- Only ~20 rows in DOM at a time (600 ÷ 40 + overscan).
- Scrollbar feels normal — the lib renders an internal spacer.

### Things to add quickly

```jsx
// Stable key per row (NOT array index — see gotchas Step 10)
<div style={style} key={items[index].id}>...</div>

// Memoize the row to avoid re-renders on parent state change
const Row = React.memo(({ index, style, data }) => (
  <div style={style}>{data[index].name}</div>
));

// Pass items down via itemData so memo can compare references
<FixedSizeList
  height={600} width="100%" itemCount={items.length}
  itemSize={40} itemData={items}
>
  {Row}
</FixedSizeList>
```

---

## Step 6 — Variable-height rows

Real lists rarely have uniform heights — comments, chat messages, log lines, file trees w/ expanders.

### The problem

You don't know a row's height until it renders. But the lib needs to know to:
- Compute the total virtual height (for the spacer)
- Position each row correctly

### The solution: measure-and-cache

1. Provide an `estimateSize` — your best guess at average row height. Lib uses this for the initial layout.
2. Render each row inside a "measurer" wrapper that uses `ResizeObserver` to read actual rendered height.
3. Lib caches measured heights in a Map keyed by index.
4. On subsequent scrolls / re-renders, use cached measurements; correct positions where needed.

### `react-window`'s `VariableSizeList`

```jsx
import { VariableSizeList } from 'react-window';

const getItemSize = (index) => rows[index].estimatedHeight ?? 40;

<VariableSizeList
  height={600} width="100%"
  itemCount={rows.length}
  itemSize={getItemSize}   // function!
>
  {({ index, style }) => <Row style={style} data={rows[index]} />}
</VariableSizeList>
```

**Limitation:** you have to know (or guess) the size per index. If you don't, use TanStack or Virtuoso.

### `@tanstack/react-virtual`'s `measureElement` pattern

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

function MyList({ items }) {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,    // best guess
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: rowVirtualizer.getTotalSize(), position: 'relative' }}>
        {rowVirtualizer.getVirtualItems().map((vRow) => (
          <div
            key={vRow.key}
            ref={rowVirtualizer.measureElement}    // ← measures rendered height
            data-index={vRow.index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              transform: `translateY(${vRow.start}px)`,
            }}
          >
            {items[vRow.index].text}
          </div>
        ))}
      </div>
    </div>
  );
}
```

`measureElement` callback registers a `ResizeObserver` on the row's DOM node and reports back. The lib re-positions rows whose actual size differed from the estimate.

### `react-virtuoso` — no measurement code needed

```jsx
import { Virtuoso } from 'react-virtuoso';

<Virtuoso
  style={{ height: 600 }}
  data={items}
  itemContent={(index, item) => <Row data={item} />}
/>
```

Virtuoso handles measurement internally w/ a render-then-measure-then-position loop. Lowest-code option for variable heights.

---

## Step 7 — Overscan, scrollToIndex, sticky headers

### Overscan

How many extra rows above/below the viewport to render. Higher = smoother fast scroll, more DOM work. Default 2–5 is usually right.

```jsx
<FixedSizeList overscanCount={5} ... />
useVirtualizer({ overscan: 5, ... });
```

Tune based on row-mount cost. Heavy rows (charts) → overscan 1–2. Cheap rows → 5–10 is fine.

### `scrollToIndex` — programmatic scroll

When you need to scroll to a specific row (search-jump, "go to today" in a chat, restore last position):

```jsx
// react-window
const listRef = useRef(null);
listRef.current.scrollToItem(42, 'smart'); // 'auto' | 'smart' | 'center' | 'end' | 'start'

// @tanstack/react-virtual
rowVirtualizer.scrollToIndex(42, { align: 'center' });

// react-virtuoso
virtuosoRef.current.scrollToIndex({ index: 42, align: 'center', behavior: 'smooth' });
```

This is what makes search-highlighting, deep-linking to a row, and "jump to today" work.

### Sticky headers / grouped lists

- `react-virtuoso` has `<GroupedVirtuoso>` with built-in sticky group headers.
- `@tanstack/react-virtual` — you implement w/ `position: sticky` + conditional render based on the visible range.
- `react-window` — possible but requires manual work (community pattern: `react-window-stickytree`).

---

## Step 8 — Virtualized grids (both axes)

When you have a giant 2D grid (spreadsheet, CCTV camera grid, image gallery):

- Virtualize **rows AND columns** — only render cells in the visible 2D window.
- Total cells in DOM = `visibleRows × visibleCols` (e.g. 20 × 10 = 200 instead of 1M).

```jsx
import { FixedSizeGrid } from 'react-window';

<FixedSizeGrid
  columnCount={1000}
  columnWidth={100}
  rowCount={10000}
  rowHeight={40}
  height={600}
  width={1000}
>
  {({ columnIndex, rowIndex, style }) => (
    <div style={style}>{rowIndex},{columnIndex}</div>
  )}
</FixedSizeGrid>
```

`@tanstack/react-virtual` exposes `useVirtualizer` for both — call it twice and compose the result.

---

## Step 9 — Integrate with infinite scroll

Common combo: virtualize the rendered window AND load more pages from the server as the user scrolls down.

### Pattern

1. Detect "user scrolled near the bottom" — last visible index ≥ `items.length - N`.
2. Trigger `fetchNextPage()`.
3. Append new items to the list.
4. Lib's virtualizer picks them up automatically (count increases → spacer grows).

### `@tanstack/react-virtual` + `useInfiniteQuery`

```jsx
const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({...});
const items = data?.pages.flatMap((p) => p.items) ?? [];

const rowVirtualizer = useVirtualizer({
  count: hasNextPage ? items.length + 1 : items.length,  // +1 sentinel for "loading"
  ...
});

useEffect(() => {
  const last = rowVirtualizer.getVirtualItems().at(-1);
  if (last && last.index >= items.length - 1 && hasNextPage) {
    fetchNextPage();
  }
}, [rowVirtualizer.getVirtualItems(), items.length, hasNextPage]);
```

### `react-virtuoso` builtin

```jsx
<Virtuoso
  data={items}
  endReached={fetchNextPage}    // ← fired when user nears the bottom
  itemContent={(idx, item) => <Row data={item} />}
/>
```

Virtuoso wins on ergonomics here — `endReached` does the detection for you.

---

## Step 10 — Gotchas you WILL hit

| Gotcha | Fix |
|---|---|
| **Container has no bounded height** (`<div>...VirtualList...</div>` w/ no height) | Container needs explicit height OR `flex: 1` inside a flex parent. No bounded height = lib can't compute visible count. |
| **Array index as key** | Re-renders thrash when items reorder/filter. Use stable item.id. |
| **Find-in-page (Ctrl+F) doesn't work** | Browser only searches DOM. Off-screen rows aren't there. Mitigation: provide an in-app search UI w/ `scrollToIndex` jump. |
| **Screen reader sees only rendered rows** | Add `role="rowgroup"`, `aria-rowcount={total}` on container, `aria-rowindex={idx+1}` per row. Some libs do this. |
| **Anchored URL scroll** (`#row-42`) doesn't work | Implement manually — read hash, call `scrollToIndex`. |
| **Measure-on-mount jank** (variable heights) | Provide a good `estimateSize`. Even rough is better than nothing. Virtuoso handles the easiest. |
| **Nested scrollable containers** | Painful. Pick ONE scroll container. If you need outer page scroll + virtualized list, use `windowScroller` patterns or Virtuoso's `useWindowScroll`. |
| **Re-renders on parent state change** | Memoize the row component (`React.memo`) and pass items via `itemData` (react-window) / closure stable refs. |
| **Forms inside rows lose focus on scroll** | Unmounting the row blurs the input. Use a stable scrollable container + don't let the row leave the overscan window while focused. Or lift the input state up so re-mount preserves value. |
| **CSS `transform` on parent breaks `position: sticky`** | Don't apply transforms to ancestors. |
| **Resize doesn't update viewport count** | Most libs use `ResizeObserver` on the scroll element. Confirm yours does; otherwise wire one. |
| **`overflow: hidden` on root** | Breaks scrolling. Container needs `overflow: auto`. |

---

## Step 11 — Headless flavor: @tanstack/react-virtual

If you want maximum flexibility (or you have a non-standard layout — e.g. masonry, calendar), TanStack Virtual gives you the math + range and lets you render whatever DOM you want.

### Minimum hook usage

```jsx
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const parentRef = useRef(null);
  const v = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 40,
    overscan: 5,
  });

  return (
    <div ref={parentRef} style={{ height: 600, overflow: 'auto' }}>
      <div style={{ height: v.getTotalSize(), position: 'relative' }}>
        {v.getVirtualItems().map((vi) => (
          <div
            key={items[vi.index].id}
            ref={v.measureElement}     // for variable heights
            data-index={vi.index}
            style={{
              position: 'absolute',
              top: 0, left: 0, width: '100%',
              transform: `translateY(${vi.start}px)`,
            }}
          >
            {items[vi.index].label}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### What `useVirtualizer` gives you

| API | Use |
|---|---|
| `getTotalSize()` | Inner spacer height |
| `getVirtualItems()` | `[{ key, index, start, size }]` for currently-visible (+ overscan) |
| `scrollToIndex(idx, { align })` | Programmatic scroll |
| `scrollToOffset(px)` | Pixel-level scroll |
| `measureElement` | Ref callback for variable-height measurement |
| `range` | `{ startIndex, endIndex }` raw range |

You assemble the DOM — that's it.

---

## Step 12 — What virtualization is NOT

These show up next to virtualization in perf discussions but solve different problems:

- **Pagination** — server-side "virtualization." Load page N when the user asks. Stateless on client. Use when data is too large to fit on the client at all.
- **Intersection Observer** — fire a callback when an element enters/exits the viewport. Good for lazy-loading images, triggering ads, lazy-mounting heavy components. **Doesn't help with too-many-rows** — element still has to exist in DOM to be observed.
- **`useDeferredValue` / `startTransition`** (React concurrent) — defers expensive renders to make typing/UI responsive. **Doesn't reduce DOM size.** Complementary, not a substitute.
- **`React.memo` / `useMemo`** — skip re-renders, doesn't reduce mount count. Use INSIDE the virtualized row to avoid re-rendering on parent change.
- **CSS `content-visibility: auto`** — browser native lazy-render. Useful in some cases (long doc pages), but no programmatic scroll-to API + still creates DOM nodes.

**Virtualization is specifically "render fewer DOM nodes" for "many-similar-rows" problem.** That's it.

---

## Cheat sheet

```
Need to render > 500 rows
  └─ Fixed heights known?
     ├─ Yes ── react-window FixedSizeList                 (fastest dev)
     └─ No ─── Variable heights?
              ├─ Predictable per index ── react-window VariableSizeList
              ├─ Truly dynamic       ── react-virtuoso or @tanstack/react-virtual
              └─ Custom layout       ── @tanstack/react-virtual (headless)
```

Defaults:
- Overscan: 5
- Estimated row height: average from a sample of 10 rows
- `key`: item.id, never array index
- Memoize the row component

---

## See Also

- [react.md](./react.md) — React library overview; this guide expands the `## Performance` section
- [angular.md](./angular.md) / [vue.md](./vue.md) / [svelte.md](./svelte.md) — sibling framework deep-dives
- External:
  - `@tanstack/react-virtual` docs — https://tanstack.com/virtual/latest
  - `react-window` — https://github.com/bvaughn/react-window
  - `react-virtuoso` — https://virtuoso.dev
  - WAI-ARIA Authoring Practices — virtual scrolling + table semantics
