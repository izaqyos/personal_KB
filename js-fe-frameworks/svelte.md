# Svelte

> **Source:** Personal notes + Svelte docs (svelte.dev)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [What is Svelte](#what-is-svelte)
- [Mental Model](#mental-model)
- [Core Concepts](#core-concepts)
- [How to Use — Minimal Setup](#how-to-use--minimal-setup)
- [Runes (Svelte 5)](#runes-svelte-5)
- [Major Versions](#major-versions)
- [SvelteKit](#sveltekit)
- [Component Anatomy](#component-anatomy)
- [Stores (Svelte 4 era)](#stores-svelte-4-era)
- [Pitfalls](#pitfalls)
- [Ecosystem](#ecosystem)
- [See Also](#see-also)

---

## What is Svelte

A UI framework that **compiles** components at build time into surgical DOM updates — no virtual DOM at runtime. Created by Rich Harris (2016).

Result: tiny bundles, fast first paint, and code that reads close to plain HTML/JS/CSS.

Tagline: "**framework without the framework**" — the heavy lifting happens in the compiler, so the runtime stays minimal (a few KB).

Companion meta-framework: **SvelteKit** (routing, SSR, edge deployment, file-based API routes).

---

## Mental Model

```
.svelte file ──► compiler ──► tiny imperative JS that updates DOM directly
```

Where React/Vue diff a virtual tree, Svelte's compiler statically tracks every place state is used and emits direct `node.textContent = ...` updates. Reactivity is *language-level*, not runtime.

---

## Core Concepts

### Single-file components

```svelte
<script>
  let count = $state(0);     // Svelte 5 rune
  const inc = () => count++;
</script>

<button on:click={inc}>{count}</button>

<style>
  button { padding: 8px; }   /* scoped automatically */
</style>
```

### Reactivity (Svelte 5 — runes)

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
  $effect(() => console.log('count is', count));
</script>
```

### Reactivity (Svelte 3/4 — implicit)

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;          // reactive declaration
  $: console.log(count);           // reactive statement
</script>
```

The `$:` label re-runs whenever its referenced variables change. Compiler magic.

### Template syntax

```svelte
{#if user}
  <p>Hello, {user.name}</p>
{:else if loading}
  <p>Loading...</p>
{:else}
  <p>No user</p>
{/if}

{#each items as item, i (item.id)}
  <li>{i + 1}: {item.name}</li>
{/each}

{#await promise}
  Loading...
{:then value}
  {value}
{:catch err}
  {err.message}
{/await}

{#key id}
  <Component />   <!-- destroy + recreate when id changes -->
{/key}
```

### Bindings

```svelte
<input bind:value={name}>          <!-- two-way -->
<input type="checkbox" bind:checked={agreed}>
<div bind:clientWidth={width}>     <!-- DOM measurement -->
```

### Events

Svelte 4: `on:click={fn}`. Svelte 5: `onclick={fn}` — plain HTML attribute.

---

## How to Use — Minimal Setup

### SvelteKit (recommended)

```bash
npx sv create my-app
cd my-app && npm install && npm run dev
```

Prompts for TypeScript / Tailwind / Prettier / ESLint / Playwright.

### Vite + Svelte (no SvelteKit)

```bash
npm create vite@latest my-app -- --template svelte-ts
```

### REPL / playground

`svelte.dev/playground` — tiny experiments, no install.

---

## Runes (Svelte 5)

Svelte 5 introduced **runes** — explicit reactivity primitives, replacing the implicit `let`/`$:` magic. Better TS, clearer semantics, work outside `.svelte` files (in `.svelte.ts`).

| Rune | Purpose |
|------|---------|
| `$state(value)` | Reactive variable |
| `$state.raw(value)` | Reactive but no deep proxying — for big arrays/objects |
| `$state.snapshot(s)` | Plain snapshot of reactive state |
| `$derived(expr)` | Computed value, lazy + cached |
| `$derived.by(fn)` | Derived from a function (when expression too complex) |
| `$effect(fn)` | Side effect tracked via reads |
| `$effect.pre(fn)` | Runs before DOM updates |
| `$effect.root(fn)` | Effect outside component tree |
| `$props()` | Read component props |
| `$bindable(default)` | Make a prop two-way bindable |
| `$inspect(value)` | Dev-only console logging on change |
| `$host()` | Custom-element host reference |

```svelte
<script lang="ts">
  let { count = 0, onUpdate }: { count?: number, onUpdate?: (n: number) => void } = $props();
  let doubled = $derived(count * 2);
  $effect(() => onUpdate?.(count));
</script>
```

Runes are **opt-in** in Svelte 5 (legacy mode = old syntax). Mandatory in Svelte 6.

---

## Major Versions

| Version | Year | Highlights |
|---------|------|------------|
| **1** | 2016 | Original — compile-to-vanilla-JS UI |
| **2** | 2017 | Server-side rendering, lifecycle hooks |
| **3** | 2019 | Major rewrite — implicit reactivity (`$:`), stores, `bind:`, animations. The version that put Svelte on the map |
| **4** | 2023 | Smaller (75% lighter), faster, modern targets, TS hardened. Mostly compatible with 3 |
| **5** | 2024 | **Runes**. Fine-grained reactivity, snippets (replace slots), event attributes (`onclick`), better TS, `<svelte:boundary>`. Fully backward compatible (legacy mode) |
| **5.x** | 2025 | Async derived, async components, broader async support |
| **6 (planned)** | 2026 | Drop legacy mode — runes only |

### Svelte 4 → Svelte 5 highlights

- `let count = 0` reactive → `let count = $state(0)`
- `$: doubled = count * 2` → `let doubled = $derived(count * 2)`
- `export let prop` → `let { prop } = $props()`
- `<slot />` → `{@render children()}` snippets
- `on:click` → `onclick`
- `createEventDispatcher` → callback props
- Stores still work — and `$store` auto-subscription still works in templates

Migration tool: `npx sv migrate svelte-5`.

---

## SvelteKit

The full-stack framework built on Svelte (analogous to Next.js for React, Nuxt for Vue).

```
src/
  routes/
    +page.svelte          # / page
    +page.server.ts       # server-only data loader
    +layout.svelte        # nested layout
    api/
      users/+server.ts    # /api/users endpoint (GET/POST/...)
    blog/[slug]/+page.svelte
```

Features:

- **File-based routing** with nested layouts.
- **Load functions** (`+page.ts` runs anywhere, `+page.server.ts` server-only).
- **Form actions** (`+page.server.ts` exports `actions`) — progressive enhancement out of the box.
- **Adapters** — `adapter-node`, `adapter-vercel`, `adapter-cloudflare`, `adapter-static`. Same code, multiple targets.
- **Service worker** support.
- **Hooks** (`hooks.server.ts`) for auth, logging.
- **Streaming SSR** with `Promise` returns.

```ts
// +page.server.ts
export const load = async ({ params, locals }) => {
  const post = await db.post.find(params.slug);
  return { post };
};

export const actions = {
  default: async ({ request }) => {
    const form = await request.formData();
    // ... mutate, return
  }
};
```

---

## Component Anatomy

```svelte
<script lang="ts">
  // imports + props + state
  import Child from './Child.svelte';
  let { name } = $props();
  let count = $state(0);
</script>

<!-- markup -->
<h1>{name}</h1>
<Child {count} />

<!-- snippets (Svelte 5 — replace slots) -->
{#snippet item(text)}
  <li>{text}</li>
{/snippet}

<ul>
  {@render item('a')}
  {@render item('b')}
</ul>

<style>
  /* scoped to this component, hashed at build time */
  h1 { color: orangered; }
  :global(body) { margin: 0; }   /* opt out of scoping */
</style>
```

---

## Stores (Svelte 4 era)

Pre-runes global state. Still supported.

```ts
import { writable, derived, readable } from 'svelte/store';

export const count = writable(0);
export const doubled = derived(count, $c => $c * 2);
```

```svelte
<script>
  import { count } from './stores';
</script>
<button on:click={() => $count++}>{$count}</button>
```

The `$` prefix auto-subscribes/unsubscribes. In Svelte 5+, prefer `$state` in a `.svelte.ts` module:

```ts
// counter.svelte.ts
export const counter = $state({ count: 0 });
```

---

## Pitfalls

| Pitfall | Why it bites |
|---------|--------------|
| Mutating non-reactive structures | Need `$state` (or `$:` in Svelte 4) for reactivity |
| `$state.raw` then mutating | Raw state isn't deep-reactive — wrap or replace whole value |
| Forgetting `$:` was order-dependent (Svelte 4) | Reactive statements run in declaration order |
| `bind:` on derived values | Svelte 4 had quirks; Svelte 5 cleaner with `$bindable` |
| Reactive declarations referencing functions | The function isn't a dep — its captured vars are |
| Heavy computations in `$derived` | Derived runs on every read access — cache or memoize |
| SSR + browser-only APIs | Wrap in `if (browser)` or use `onMount` |
| Import order matters in stores | Circular imports break store init |

---

## Ecosystem

| Need | 2026 default |
|------|--------------|
| Meta-framework | **SvelteKit** |
| State | `$state` runes (in-component) or `.svelte.ts` modules |
| UI library | shadcn-svelte, Skeleton, Flowbite-Svelte, Bits UI |
| Headless components | Bits UI, Melt UI |
| Icons | lucide-svelte |
| Animations | `svelte/transition` (built-in: `fade`, `slide`, `fly`) + `svelte/motion` (`tweened`, `spring`) |
| Forms | Superforms + Zod (game-changer for SvelteKit forms) |
| Data fetching | SvelteKit `load` + `fetch`; TanStack Query for client cache |
| Testing | Vitest + Testing Library + Playwright |
| Charts | LayerChart, Visx-via-D3 |

---

## See Also

- [react.md](react.md) -- React reference
- [vue.md](vue.md) -- Vue reference (similar SFC model)
- [angular.md](angular.md) -- Angular reference
- [ui5.md](ui5.md) -- SAP UI5 reference
- [typescript/](../typescript/) -- TypeScript notes
- [javascript-kb](../javascript-kb) -- JavaScript language reference
