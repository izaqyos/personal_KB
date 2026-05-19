# JavaScript Frontend Frameworks

> **Source:** Personal notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

A consolidated reference for the major JavaScript frontend frameworks I've worked with or expect to encounter. Each file follows the same shape: what it is, mental model, core concepts, setup, version history with migration notes, ecosystem, common pitfalls.

---

## Table of Contents

- [Files in This Section](#files-in-this-section)
- [At-a-Glance Comparison](#at-a-glance-comparison)
- [How to Pick One](#how-to-pick-one)
- [Common Concepts Across All](#common-concepts-across-all)
- [See Also](#see-also)

---

## Files in This Section

| File | Topic | Notes |
|------|-------|-------|
| [react.md](react.md) | **React** (Meta) | Library — composes via hooks, RSC + meta-frameworks (Next.js) for full apps |
| [vue.md](vue.md) | **Vue** (Evan You / community) | Progressive framework — SFCs, Composition API, Nuxt for full-stack |
| [angular.md](angular.md) | **Angular** (Google) | Full framework — TS, DI, RxJS, signals, twice-yearly releases |
| [svelte.md](svelte.md) | **Svelte / SvelteKit** (Rich Harris) | Compile-to-vanilla — runes, no virtual DOM, smallest bundles |
| [ui5.md](ui5.md) | **SAP UI5 / OpenUI5** (SAP) | Enterprise — Fiori, OData, MVC, line-of-business apps |

---

## At-a-Glance Comparison

| Aspect | React | Vue | Angular | Svelte | UI5 |
|--------|-------|-----|---------|--------|-----|
| **Type** | Library | Progressive framework | Full framework | Compiler + framework | Enterprise framework |
| **Sponsor** | Meta | Community / Evan You | Google | Vercel / Rich Harris | SAP |
| **First release** | 2013 | 2014 | 2016 (AngularJS 2010) | 2016 | 2010 |
| **Component file** | `.jsx` / `.tsx` | `.vue` SFC | `@Component` class + template | `.svelte` SFC | `.view.xml` + controller |
| **Reactivity** | Explicit `useState`, immutable | Proxy-based, automatic | Zone.js (legacy) → Signals | Compile-time / runes | Two-way data binding |
| **Templates** | JSX | HTML + directives | HTML + directives | HTML + `{...}` | Declarative XML |
| **TypeScript** | Excellent | Excellent | First-class (TS-first) | Excellent (5+) | First-class (1.96+) |
| **Bundle size (hello world)** | ~45 KB | ~35 KB | ~140 KB | ~3 KB | ~500 KB+ (libs) |
| **Learning curve** | Medium | Easy | Steep | Easy | Steep (SAP context) |
| **Meta-framework** | Next.js, Remix | Nuxt | (built-in) | SvelteKit | (built-in) |
| **State management** | Zustand, Redux, TanStack Query | Pinia | Signals, NgRx | `$state`, stores | Models (JSON, OData) |
| **Server-side** | RSC + Server Actions (19+) | Nuxt SSR/SSG/ISR | Angular Universal | SvelteKit + adapters | Server-rendered Fiori |
| **Best fit** | Anything; biggest ecosystem | Approachable, small-to-medium teams | Large enterprise, strong conventions | Performance-critical, small teams | SAP backends, Fiori apps |

---

## How to Pick One

- **Largest ecosystem, hireable, startup default** → React
- **Easiest onboarding, clean SFCs, no tooling fights** → Vue
- **Big team, long-term codebase, strong opinions, OOP/RxJS background** → Angular
- **Smallest bundles, want compile-time magic, allergic to ceremony** → Svelte
- **Building Fiori / SAP integration / OData-driven business apps** → UI5

If unconstrained: React for ecosystem & jobs, Svelte for UX & DX. Vue if you want a middle ground. Angular if you'd otherwise reach for a meta-framework anyway and prefer one box. UI5 only when SAP context dictates it.

---

## Common Concepts Across All

These show up in every framework — vocabulary changes, ideas don't:

| Concept | React | Vue | Angular | Svelte | UI5 |
|---------|-------|-----|---------|--------|-----|
| Component | Function/class | SFC | Class w/ decorator | SFC | Controller + view |
| Props | Args | `defineProps` | `@Input` / `input()` | `$props()` | Bound model values |
| Local state | `useState` | `ref` / `reactive` | Signal / field | `$state` | View model |
| Computed | `useMemo` | `computed` | `computed()` | `$derived` | Expression binding |
| Effect | `useEffect` | `watch` / `watchEffect` | `effect` / lifecycle | `$effect` | `onAfterRendering` |
| Conditional | `{cond && ...}` | `v-if` | `@if` | `{#if}` | `<core:Fragment>` + binding |
| List | `.map()` | `v-for` | `@for track ...` | `{#each}` | `items="{...}"` |
| Two-way binding | (controlled inputs) | `v-model` | `[(ngModel)]` | `bind:value` | `{path: 'x', mode: 'TwoWay'}` |
| Cleanup | Effect return fn | `onUnmounted` | `ngOnDestroy` | `$effect` cleanup return | `onExit` |
| DI | (manual / context) | `inject` / `provide` | `@Injectable` + `inject()` | (none built-in) | Models on view |

When you know any one well, the others compress fast — the patterns recur.

---

## See Also

- [../typescript/](../typescript/) -- TypeScript references (most modern FE work is TS)
- [../javascript-kb](../javascript-kb) -- JavaScript language reference
- [../nodejs-kb](../nodejs-kb) -- Node.js (server side of FE apps)
- [../nestjs-kb](../nestjs-kb) -- NestJS (backend often paired with FE frameworks)
- [../interviews/frameworks.md](../interviews/frameworks.md) -- Frameworks for interviews
- [../typescript/react-sse-hook.md](../typescript/react-sse-hook.md) -- Concrete React+TS hook
