---
title: design-for-retrofit — make virt a 1-PR change later
captured: 2026-05-20
status: pattern
tags: [react, performance, patterns, future-proofing]
---

# design-for-retrofit: virt-ready Row components

## what this is

a **10-minute concession** that turns a future "we need virt" project from a 1–2 sprint refactor into a 1-PR drop-in.

ship plain `.map()` today. design the `<Row>` component so that *if* you ever need to add virt, you flip one switch instead of rewriting a dozen call sites.

---

## the rule

> Row components accept an **optional** `style` prop and spread it onto their root element. exactly that — nothing else.

that one habit lets any virt library inject positioning styles later without changing the component contract.

---

## the pattern

### ❌ before — not retrofit-friendly

```jsx
function RuleRow({ rule, onEdit }) {
  return (
    <tr className={rule.enabled ? 'enabled' : 'disabled'}>
      <td>{rule.id}</td>
      <td>{rule.action}</td>
      <td>...</td>
    </tr>
  );
}
```

if you ever virtualize: every caller has to pass `style`, the component has to spread it, you have to find/test every variant. multi-day refactor.

### ✅ after — retrofit-ready

```jsx
/**
 * Row in the firewall rules table.
 *
 * @param style - optional. If provided, spread onto root <tr>.
 *   This exists to support future virtualization (react-virtual, react-window),
 *   which positions rows via inline styles. Today we don't virtualize — the
 *   prop is unused. Keeping it on the contract means we can drop in a virt
 *   library later without changing every call site. See:
 *   /Users/yosii/work/git/personal_KB/FE/react/virtualization/README.md
 */
function RuleRow({ rule, onEdit, style }) {
  return (
    <tr
      style={style}
      className={rule.enabled ? 'enabled' : 'disabled'}
    >
      <td>{rule.id}</td>
      <td>{rule.action}</td>
      <td>...</td>
    </tr>
  );
}
```

**cost today:** ~10 minutes per row component, plus a comment.
**savings later:** the difference between a 1-PR change and a 2-sprint refactor.

---

## TypeScript version

```tsx
import { CSSProperties } from 'react';

interface RuleRowProps {
  rule: FirewallRule;
  onEdit: (rule: FirewallRule) => void;
  /**
   * Optional. Spread onto root <tr>. Reserved for future virtualization —
   * libraries like react-virtual inject positioning styles here. Today it's
   * unused; tomorrow it makes virt a drop-in change.
   */
  style?: CSSProperties;
}

export function RuleRow({ rule, onEdit, style }: RuleRowProps) {
  return (
    <tr style={style} className={rule.enabled ? 'enabled' : 'disabled'}>
      ...
    </tr>
  );
}
```

---

## style merging — get it right once

if the row already has dynamic inline style (severity color, drag-state, etc.), order matters:

```tsx
function RuleRow({ rule, style }: RuleRowProps) {
  // virt-injected style wins for positioning (top, height, transform).
  // our style wins for theming. spread our defaults FIRST, virt LAST.
  const mergedStyle: CSSProperties = {
    backgroundColor: severityBg(rule.severity),
    ...style,  // ← virt overrides positioning if present
  };

  return <tr style={mergedStyle}>...</tr>;
}
```

> rule of thumb: **virt's `style` always last in the spread.** it's positioning the row; if you override it, the row stacks at `top: 0` and everything breaks.

---

## striping — move out of CSS

CSS-based zebra striping breaks under virt (rendered rows aren't sequential in DOM, so `:nth-child(even)` is wrong).

if there's any chance you'll virt later, do striping by **data index**, not DOM index, from day 1:

```tsx
// ❌ breaks under virt
// tbody tr:nth-child(even) { background: #f5f5f5 }

// ✅ retrofit-safe — striping based on data index, in JSX
<tbody>
  {rules.map((rule, i) => (
    <RuleRow
      key={rule.id}
      rule={rule}
      style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f5f5f5' }}
    />
  ))}
</tbody>
```

today this looks redundant. the day you add virt, you don't have to revisit it.

---

## forwardRef — only if you're already wrapping

virt libs sometimes need a ref on each row to measure height (for variable-height virt).

if your row is wrapped in `memo` / HOC / context, you'll need `forwardRef` to thread the ref through. you can add this now too — it's a couple of lines:

```tsx
import { forwardRef, CSSProperties } from 'react';

interface RuleRowProps { rule: FirewallRule; style?: CSSProperties; }

export const RuleRow = forwardRef<HTMLTableRowElement, RuleRowProps>(
  ({ rule, style }, ref) => (
    <tr ref={ref} style={style}>...</tr>
  )
);
RuleRow.displayName = 'RuleRow';
```

**only do this if:** you already have memo/HOC/context wrappers, or you're confident you'd use variable-height virt later. for fixed-height virt, you don't need refs. don't add complexity speculatively.

---

## what NOT to do as "future-proofing"

retrofit-readiness ≠ over-engineering. the line is sharp:

| do                                      | don't                                                |
|----------------------------------------- |-------------------------------------------------------|
| accept `style` on row                    | implement actual virt now                            |
| spread `style` on root element           | introduce a positioning system or `top` calculations |
| stripe in JSX, not CSS                   | abandon `<table>` for `<div role>` preemptively      |
| add a TODO comment linking the KB        | install `@tanstack/react-virtual` "just in case"     |
| keep row contract small + serializable   | add window/viewport state to row props               |

if it costs more than ~15 min total, you've crossed into over-engineering.

---

## the code comment to leave near the table

stick this above the `<tbody>` block so anyone (TL, future you) can see the decision:

```tsx
{/*
  FW rules table — plain .map() rendering.

  Why not virtualized?
    - Dataset capped at 500 rows (PM scope, 2026-05).
    - Measured perf passes budget: mount < 100ms, scroll 60fps.
    - Virt would cost: ctrl+f, a11y plumbing, e2e test flakiness, retrofit cost.

  Retrofit-readiness:
    - <RuleRow> accepts an optional `style` prop, spread onto its root <tr>.
    - Zebra striping done via data index in JSX (not :nth-child).
    - These two choices let us swap to @tanstack/react-virtual in one PR
      if/when row count grows past ~2k.

  See: /personal_KB/FE/react/virtualization/perf-budget.md
*/}
<tbody>
  {filteredRules.map((rule, i) => (
    <RuleRow
      key={rule.id}
      rule={rule}
      onEdit={handleEdit}
      style={{ backgroundColor: i % 2 === 0 ? '#fff' : '#f5f5f5' }}
    />
  ))}
</tbody>
```

this comment is the artifact that ends future debates. it shows the decision was deliberate, measured, and reversible.

---

## checklist — apply to every row component on the FW page

- [ ] component accepts `style?: CSSProperties` prop
- [ ] component spreads `style` onto its root element (last in spread)
- [ ] root element is a single DOM element (no fragment) — virt libs need a single positionable target
- [ ] striping done via data index in JSX, not `:nth-child` CSS
- [ ] no fixed `position`, `top`, `transform` on row in CSS (virt will own those)
- [ ] TODO/why comment near the table explaining the decision
- [ ] (optional) `forwardRef` if row is wrapped or you're confident you'd need variable-height virt

---

## one-line summary

> ship `.map()`. accept a `style` prop. stripe by index. leave a comment. that's the whole retrofit pattern.
