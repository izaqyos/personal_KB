# React

> **Source:** Personal notes + React docs (react.dev)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [What is React](#what-is-react)
- [Mental Model](#mental-model)
- [Core Concepts](#core-concepts)
- [How to Use — Minimal Setup](#how-to-use--minimal-setup)
- [Hooks Reference](#hooks-reference)
- [Component Patterns](#component-patterns)
- [Major Versions](#major-versions)
- [React 19 Patterns](#react-19-patterns)
- [Rendering Internals](#rendering-internals)
- [Server Components & Frameworks](#server-components--frameworks)
- [State Management](#state-management)
- [Performance](#performance)
- [Pitfalls and Gotchas](#pitfalls-and-gotchas)
- [Ecosystem Cheat Sheet](#ecosystem-cheat-sheet)
- [See Also](#see-also)

---

## What is React

A JavaScript library for building user interfaces by **composing components**. Created at Facebook (2013), now maintained as **react.dev**. Two key ideas:

1. **Declarative** — describe UI as a function of state; React figures out the DOM mutations.
2. **Component-based** — build UIs from reusable, encapsulated pieces.

Not a framework — it's a view layer. Routing, data fetching, and SSR come from sibling libraries (React Router, TanStack Query) or meta-frameworks (Next.js, Remix).

**`react`** is renderer-agnostic. Pair it with a renderer:
- `react-dom` — browser DOM
- `react-native` — mobile
- `react-three-fiber` — WebGL via three.js
- `ink` — terminal UIs

---

## Mental Model

```
state ──► render(state) ──► virtual DOM ──► reconcile ──► real DOM
   ▲                                                         │
   └─────────── event handler / effect ◄─────────────────────┘
```

- **UI = f(state)** — given state, the rendered tree is deterministic.
- You don't mutate the DOM. You **set state**. React re-renders.
- Re-rendering is *cheap* — React diffs against the previous virtual tree (reconciliation) and only patches what changed.

---

## Core Concepts

### Components

Plain JavaScript functions that return JSX (or `null`). PascalCase by convention.

```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

### JSX

XML-like syntax that compiles to `React.createElement(...)` calls. Curly braces embed expressions.

```jsx
const el = <div className="box">{count + 1}</div>;
// compiles to: React.createElement('div', {className: 'box'}, count + 1)
```

JSX is *expressions*, not statements — so use ternaries / `&&` for conditional rendering, not `if` blocks inline.

### Props

Read-only inputs to a component. Flow **down** the tree.

```jsx
<UserCard user={user} onEdit={handleEdit} />
```

### State

Local, mutable data tied to a component instance. Updating state triggers a re-render.

```jsx
const [count, setCount] = useState(0);
setCount(c => c + 1); // functional update, safe under batching
```

### Effects

Code that synchronizes with **outside** the React tree (network, subscriptions, timers, browser APIs). Run *after* render.

```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id); // cleanup on unmount or dep change
}, []);
```

### Keys

Stable identity for list children. **Never use array index as key** for reorderable lists — React mismatches state on items.

---

## How to Use — Minimal Setup

### Vite (recommended for SPAs in 2026)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app && npm install && npm run dev
```

### Next.js (full-stack / SSR / RSC)

```bash
npx create-next-app@latest my-app --typescript --app
```

### Plain CDN (zero build, for prototypes)

```html
<script type="module">
  import React from 'https://esm.sh/react@19';
  import { createRoot } from 'https://esm.sh/react-dom@19/client';
  createRoot(document.getElementById('root')).render(
    React.createElement('h1', null, 'Hello')
  );
</script>
```

> Create-React-App is **deprecated** as of 2023. Use Vite or a meta-framework.

---

## Hooks Reference

Hooks (added in 16.8) let function components have state and side effects. **Rules:**

1. Only call at the top level — no loops, conditions, or nested functions.
2. Only call from React functions — components or other hooks.

| Hook | Purpose |
|------|---------|
| `useState(init)` | Local state |
| `useReducer(reducer, init)` | Complex state transitions; preferred when next state depends on multiple actions |
| `useEffect(fn, deps)` | Side effects after commit (subscriptions, fetch, manual DOM) |
| `useLayoutEffect(fn, deps)` | Like `useEffect` but synchronous before browser paint — measure DOM |
| `useRef(init)` | Mutable container that survives renders; or DOM node ref |
| `useMemo(compute, deps)` | Memoize expensive computation |
| `useCallback(fn, deps)` | Memoize a function reference (stable identity for child memo) |
| `useContext(Ctx)` | Read context value |
| `useId()` | Stable unique IDs (SSR-safe) |
| `useTransition()` | Mark updates as non-urgent (concurrent rendering) |
| `useDeferredValue(value)` | Defer a value to a lower priority |
| `useSyncExternalStore(...)` | Subscribe to an external store (Redux/Zustand internals) |
| `useImperativeHandle(ref, fn)` | Customize what a `ref` exposes |
| `use(promise|context)` | **React 19** — unwrap a promise or read context conditionally |
| `useOptimistic(state, reducer)` | **React 19** — optimistic UI for actions |
| `useActionState(action, init)` | **React 19** — form-action state pairing |
| `useFormStatus()` | **React 19** — pending state of nearest `<form action>` |

Custom hooks: any function starting with `use` that calls other hooks. Reusable stateful logic without inheritance.

---

## Component Patterns

### Composition over inheritance

React deliberately has no class inheritance for components. Compose via children, render props, or hooks.

```jsx
<Card>
  <Card.Header>...</Card.Header>
  <Card.Body>...</Card.Body>
</Card>
```

### Container vs Presentational *(largely obsolete with hooks)*

Old pattern — separate data-fetching from rendering. Hooks fold this into one component cleanly; useful only when the same view has multiple data sources.

### Render props / function-as-children

```jsx
<Tooltip>{({ visible }) => visible && <Popup />}</Tooltip>
```

Mostly replaced by hooks. Still useful for passing rendering control across libraries.

### Compound components

Parent owns shared state via context; children are dumb consumers (`Tabs.List`, `Tabs.Tab`, `Tabs.Panel`). Used by Radix UI, Headless UI.

### Higher-Order Components (HOCs)

`withRouter(Component)`, `withAuth(Component)`. Pre-hooks pattern. Avoid in new code — hooks compose more cleanly.

### Controlled vs uncontrolled inputs

- **Controlled** — value lives in React state; `onChange` updates it. Most form libs.
- **Uncontrolled** — DOM owns the value; read via `ref` on submit. Faster for huge forms.

---

## Major Versions

| Version | Year | Highlights |
|---------|------|------------|
| **0.x – 0.14** | 2013–2015 | `React.createClass`, mixins, separate `react-dom` split (0.14) |
| **15** | 2016 | Stable rewrite of internals, removed deprecated APIs |
| **16 (Fiber)** | 2017 | Complete reimplementation. Error boundaries, fragments, portals, `componentDidCatch`, return arrays from render |
| **16.3** | 2018 | New context API (`createContext`), `forwardRef`, lifecycle deprecations |
| **16.8** | 2019 | **Hooks** — `useState`, `useEffect`, etc. Function components reach feature parity with classes |
| **17** | 2020 | "No new features." Gradual upgrade story — multiple React versions on one page. Removed event pooling. New JSX transform (no `import React` needed) |
| **18** | 2022 | **Concurrent renderer**. Automatic batching, `useTransition`, `useDeferredValue`, `Suspense` for data, streaming SSR (`renderToPipeableStream`), `useId`, strict-mode double-invoke, new root API (`createRoot`) |
| **19** | 2024 | **Actions** (form actions w/ pending state), `useActionState`, `useOptimistic`, `useFormStatus`, the `use(promise)` hook, ref as a regular prop (no more `forwardRef`), document metadata hoisting (`<title>`, `<meta>` anywhere), full **Server Components** support, asset preloading APIs, improved hydration errors |

### Class → hooks migration cheat sheet

| Class API | Hook equivalent |
|-----------|-----------------|
| `this.state` / `setState` | `useState`, `useReducer` |
| `componentDidMount` | `useEffect(fn, [])` |
| `componentDidUpdate` | `useEffect(fn, [deps])` |
| `componentWillUnmount` | cleanup fn returned from `useEffect` |
| `getDerivedStateFromProps` | derive during render — usually a code smell |
| `shouldComponentUpdate` | `React.memo` + `useMemo` / `useCallback` |
| `componentDidCatch` | (no hook yet) — keep one class **error boundary** |

### Common upgrade gotchas

- **17 → 18**: `ReactDOM.render` removed → use `createRoot`. StrictMode now double-invokes effects in dev (mount, cleanup, mount). Automatic batching changes timing in event handlers. Some libraries break on concurrent rendering (especially old Redux + sync effects).
- **18 → 19**: `forwardRef` becomes optional — `ref` is a regular prop. `propTypes` and default props for function components removed. `react-test-renderer` deprecated → use Testing Library.

---

## React 19 Patterns

Annotated code for the headline 19 features. Theme: **make async UI work feel synchronous**.

### Actions + `useActionState` + `useFormStatus`

The classic "submit a form, show pending, show error" — pre-19 took ~30 lines of `useState`/`try`/`finally`.

```tsx
'use client';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// (1) An "action" is just an async function.
//     1st arg: previous state. 2nd arg: FormData (or anything you pass).
async function updateName(prevState: string | null, formData: FormData) {
  const name = formData.get('name') as string;

  if (name.length < 2) return 'Name too short';        // (2) returned value becomes new state

  await fetch('/api/user', { method: 'PUT', body: JSON.stringify({ name }) });
  return null;                                          // (2) success
}

function SubmitButton() {
  // (3) useFormStatus reads the *nearest enclosing <form>*'s pending state.
  //     No prop drilling — works because React tracks the form context.
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Saving…' : 'Save'}
    </button>
  );
}

export function NameForm() {
  // (4) useActionState wraps the action.
  //     Returns: [currentState, wrappedAction, isPending]
  const [error, formAction, isPending] = useActionState(updateName, null);

  // (5) Pass `formAction` directly to <form action={...}>.
  //     React handles: preventDefault, FormData collection, pending tracking,
  //     error boundaries, and even works with JS disabled (progressive enhancement).
  return (
    <form action={formAction}>
      <input name="name" disabled={isPending} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <SubmitButton />
    </form>
  );
}
```

**What 19 saved you:** no `useState` for pending, no `useState` for error, no manual `e.preventDefault()`, no `try/catch/finally`, no prop drilling of `pending`.

### `useOptimistic` — instant UI, real network later

```tsx
'use client';
import { useOptimistic, useState, startTransition } from 'react';

type Todo = { id: string; text: string; sending?: boolean };

export function TodoList({ initial }: { initial: Todo[] }) {
  const [todos, setTodos] = useState(initial);

  // (1) useOptimistic forks state for the duration of an action.
  //     Inside the action, reads return the optimistic value.
  //     If the action throws or finishes, React reverts to the real state.
  const [optimisticTodos, addOptimistic] = useOptimistic(
    todos,
    (state, newText: string) => [
      ...state,
      { id: 'temp-' + Date.now(), text: newText, sending: true },  // (2) tagged sending
    ]
  );

  async function add(formData: FormData) {
    const text = formData.get('text') as string;

    // (3) Show it instantly — UI reflects optimisticTodos.
    addOptimistic(text);

    // (4) Real call. If this throws, React unwinds the optimistic state.
    const saved = await fetch('/api/todos', { method: 'POST', body: text }).then(r => r.json());

    // (5) Commit the real state. Optimistic fork is discarded.
    startTransition(() => setTodos(t => [...t, saved]));
  }

  return (
    <>
      <form action={add}>
        <input name="text" /><button>Add</button>
      </form>
      <ul>
        {optimisticTodos.map(t => (
          <li key={t.id} style={{ opacity: t.sending ? 0.5 : 1 }}>{t.text}</li>
        ))}
      </ul>
    </>
  );
}
```

**Mental model:** `useOptimistic` is a "what if" view of state. The base state never lies — but the user sees the predicted result immediately.

### `use(promise)` — unwrap promises in render

```tsx
import { use, Suspense } from 'react';

// (1) A normal async function returning a promise.
//     IMPORTANT: create the promise *outside* render (or memoize it),
//     otherwise every render makes a new promise → infinite loop.
const userPromise = fetch('/api/user/42').then(r => r.json());

function UserProfile() {
  // (2) `use` suspends the component until the promise resolves.
  //     Throws on rejection → caught by ErrorBoundary.
  //     Unlike useState/useEffect, `use` CAN be called conditionally.
  const user = use(userPromise);

  return <h1>{user.name}</h1>;
}

export default function Page() {
  // (3) Suspense boundary catches the suspension and renders fallback.
  return (
    <Suspense fallback={<p>Loading…</p>}>
      <UserProfile />
    </Suspense>
  );
}
```

**Why this matters:** before 19 you needed a library (Relay, TanStack Query) or `useEffect + useState` plumbing. `use` makes data-fetching feel synchronous.

`use` also reads context conditionally — `useContext` couldn't:

```tsx
function Maybe({ show }: { show: boolean }) {
  if (!show) return null;
  const theme = use(ThemeContext);  // legal — useContext would have errored at rules-of-hooks lint
  return <div className={theme}>…</div>;
}
```

### `ref` as a regular prop — no more `forwardRef`

**Before (React 18):**

```tsx
import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, { label: string }>(
  ({ label }, ref) => <input ref={ref} aria-label={label} />
);
```

**After (React 19):**

```tsx
// (1) `ref` is just a prop now. Type it on the props.
function Input({ ref, label }: { ref?: React.Ref<HTMLInputElement>; label: string }) {
  return <input ref={ref} aria-label={label} />;
}

// (2) Use it the same way:
<Input ref={myRef} label="Email" />
```

`forwardRef` still works for backward compat but is **no longer needed**. Codemod: `npx codemod@latest react/19/replace-forward-ref`.

### Document metadata anywhere

```tsx
// (1) Pre-19: needed react-helmet or Next.js `<Head>`.
// (2) In 19: render <title>/<meta>/<link> anywhere — React hoists into <head>.
function ArticlePage({ article }) {
  return (
    <>
      <title>{article.title} — My Blog</title>
      <meta name="description" content={article.excerpt} />
      <link rel="canonical" href={`/posts/${article.slug}`} />

      <article>
        <h1>{article.title}</h1>
        <p>{article.body}</p>
      </article>
    </>
  );
}
```

React deduplicates: render the same `<title>` from two components, only one ends up in `<head>`.

### Server Components + Server Actions (App Router style)

```tsx
// app/users/page.tsx — runs ONLY on the server. No 'use client'.
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// (1) A server action. The 'use server' directive marks it as
//     callable from the client over an RPC the framework wires up.
async function deleteUser(formData: FormData) {
  'use server';
  const id = formData.get('id') as string;
  await db.user.delete({ where: { id } });
  revalidatePath('/users');                              // (2) tell framework to re-fetch
}

// (3) Async component — only legal in Server Components.
//     `db.user.findMany()` runs on the server; client never sees the DB call
//     or the credentials. Only the rendered HTML/RSC payload ships.
export default async function UsersPage() {
  const users = await db.user.findMany();

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>
          {u.name}
          {/* (4) Form posts to the server action — no client JS for this button.
                  Works with JS disabled. */}
          <form action={deleteUser}>
            <input type="hidden" name="id" value={u.id} />
            <button>Delete</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
```

**The pattern:** server queries data → renders → client receives HTML + RSC payload. Mutations go through server actions (no manual `/api/...` route, no fetch wiring).

### When to reach for what

| Goal | API |
|------|-----|
| Submit a form with pending/error state | `useActionState` + `<form action>` |
| Show pending state in a child without props | `useFormStatus` |
| Predicted UI before server confirms | `useOptimistic` |
| Read a promise/context in render (conditionally) | `use(...)` |
| Pass a ref to your component | Just a prop — no `forwardRef` |
| Set page `<title>`/`<meta>` | Render them inline |
| Fetch data on the server with no client bundle cost | Server Component (async function) |
| Mutate from the client without an API route | Server Action (`'use server'`) |

---

## Rendering Internals

### Virtual DOM

A lightweight JS object tree that mirrors the real DOM. Cheap to create and diff.

### Reconciliation

When state changes, React re-renders to a new virtual tree, diffs against the previous, and computes a minimal patch.

Diffing assumptions:
- Different element types → throw away the subtree and rebuild.
- Same type → keep the DOM node, update props/children.
- Lists matched by **key**.

### Fiber (since 16)

The internal data structure for the work tree. Each fiber represents a unit of work and supports:
- **Interruption** — long renders can yield to the browser.
- **Prioritization** — urgent updates (input) jump ahead of non-urgent ones (data).
- **Resumption** — partial work can be paused and resumed.

Fiber is what makes **concurrent rendering** possible.

### Concurrent rendering (18+)

Renders are no longer "all or nothing." React can:
- Start, pause, abandon, or restart a render.
- Show a fallback (Suspense) while a subtree is preparing.
- Render in the background and commit only when ready.

Activated by APIs like `useTransition`, `Suspense`, `startTransition`. Not automatic for all updates.

### Commit phases

1. **Render phase** — pure, can be paused. Builds the work-in-progress tree.
2. **Commit phase** — synchronous DOM mutations + `useLayoutEffect`.
3. **Passive effects** — `useEffect` runs asynchronously after paint.

---

## Server Components & Frameworks

### Server Components (RSC, stable in 19)

Components that **only run on the server**. They:

- Can read databases, the filesystem, secrets — directly.
- Cannot use state, effects, or browser APIs.
- Send a serialized "RSC payload" (not HTML and not JSON) to the client.
- Reduce client bundle size — server-only deps never ship.

```jsx
// app/page.tsx — runs only on server
async function Page() {
  const posts = await db.posts.findMany();
  return <PostList posts={posts} />;
}
```

`'use client'` directive marks a module as client-side. `'use server'` marks a function as a server action callable from the client.

### Meta-frameworks

| Framework | Strength |
|-----------|----------|
| **Next.js** | Most common. App Router uses RSC + Server Actions. Vercel-tied but self-hostable |
| **Remix** | Web-standards focus, nested routes, loaders/actions. Now part of React Router 7 |
| **TanStack Start** | New, type-safe, file-based routing, RSC-aware |
| **Astro** | Islands architecture — React only where needed; static elsewhere |
| **Expo Router** | RSC for React Native |

---

## State Management

| Approach | When to use |
|----------|-------------|
| `useState` / `useReducer` | Local component state. Always start here |
| **Context** | Theme, auth user, locale — values that rarely change. **Not** a state store |
| **Zustand** | Tiny global store, hooks-native, no provider |
| **Jotai** | Atomic state (like Recoil but simpler) |
| **Redux Toolkit** | Large apps with complex action flows; time-travel debugging |
| **TanStack Query** | Server state (fetch + cache). Pairs with anything above for client state |
| **Valtio** | Proxy-based; mutate freely |
| **MobX** | Observable-based OOP style; common in older enterprise apps |

**Rule of thumb:** server data → TanStack Query; UI state → useState; rarely-changing globals → Context; cross-cutting client state → Zustand/Jotai. Reach for Redux only if you need its middleware/devtools story.

---

## Performance

### Render cost

- Re-renders are cheap **if** subtrees are small.
- Default behavior: a parent re-render re-renders all children.
- Optimize only after measuring with React DevTools Profiler.

### Memoization tools

- `React.memo(Component)` — skip re-render if props are shallow-equal.
- `useMemo` — cache a computed value.
- `useCallback` — cache a function identity.

These are not free. They cost memory and comparison work. **React Compiler** (stable in 19) auto-memoizes correctly-written components, often removing the need.

### Big lists

- Virtualize: `react-window`, `react-virtual` (TanStack Virtual). Render only visible rows.
- Stable keys — never index for dynamic lists.
- **Deep dive:** [react-virtualization.md](./react-virtualization.md) — step-by-step guide (when to use, lib decision tree, fixed vs variable heights, infinite scroll, gotchas).

### Suspense + transitions

```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setQuery(newQuery)); // mark as non-urgent
```

Combine with Suspense boundaries to keep the UI responsive while data loads.

### Bundle size

- Code-split with `React.lazy` + `Suspense` fallback.
- Tree-shake. Check with `vite-bundle-visualizer` / `source-map-explorer`.
- Prefer headless component libraries (Radix) over heavy kitchen-sink libs.

---

## Pitfalls and Gotchas

| Pitfall | Why it bites |
|---------|--------------|
| **Stale closures in effects** | Effect captures a stale value. Add deps, or use functional updates / refs |
| **Missing effect deps** | ESLint `react-hooks/exhaustive-deps` is right ~95% of the time. Disable it knowingly |
| **Index as key** | Items reorder → wrong state attaches to wrong item |
| **Setting state during render** | Infinite loop. Move to event handler or `useEffect` |
| **Mutating state in place** | Don't `arr.push` then `setArr(arr)`. Use `setArr([...arr, x])` |
| **Effect dependencies on objects/arrays created in render** | New identity every render → effect re-runs forever. Memoize or move outside |
| **`useEffect` for derived data** | Compute during render instead. Effects are for sync with the outside world |
| **Context for fast-changing state** | Every consumer re-renders on any change. Use Zustand/Jotai for hot state |
| **Mixing controlled/uncontrolled** | A `value` prop without `onChange` — React warns. Pick one mode |
| **Missing `key` on Fragment lists** | Use `<React.Fragment key={...}>` instead of shorthand `<>` |

---

## Ecosystem Cheat Sheet

| Need | 2026 default |
|------|--------------|
| Build tool | **Vite** (SPA) or Next.js (full-stack) |
| Routing (SPA) | TanStack Router or React Router 7 |
| Server data | **TanStack Query** |
| Forms | React Hook Form + Zod |
| Styling | Tailwind, CSS Modules, or vanilla-extract |
| Component lib | shadcn/ui (copy-in) or Radix primitives |
| Animation | Framer Motion / motion |
| Tables | TanStack Table |
| Drag-drop | dnd-kit |
| Testing | Vitest + Testing Library + Playwright |
| Charts | Recharts, Visx, or D3 directly |
| Icons | lucide-react |
| State (client) | Zustand or Jotai |

---

## See Also

- [typescript/react-sse-hook.md](../typescript/react-sse-hook.md) -- SSE hook implementation in React+TypeScript
- [typescript/](../typescript/) -- TypeScript references (React apps are typically TS in 2026)
- [nodejs-kb](../nodejs-kb) -- Node.js reference (server side of React apps)
- [nestjs-kb](../nestjs-kb) -- NestJS (common Node backend pairing)
- [javascript-kb](../javascript-kb) -- JavaScript language reference
- [interviews/frameworks.md](../interviews/frameworks.md) -- Framework patterns for interviews
