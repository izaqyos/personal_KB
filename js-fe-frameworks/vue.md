# Vue

> **Source:** Personal notes + Vue docs (vuejs.org)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [What is Vue](#what-is-vue)
- [Mental Model](#mental-model)
- [Core Concepts](#core-concepts)
- [How to Use — Minimal Setup](#how-to-use--minimal-setup)
- [Composition API vs Options API](#composition-api-vs-options-api)
- [Reactivity System](#reactivity-system)
- [Major Versions](#major-versions)
- [Single-File Components](#single-file-components)
- [State Management](#state-management)
- [Ecosystem](#ecosystem)
- [Pitfalls](#pitfalls)
- [See Also](#see-also)

---

## What is Vue

A progressive JavaScript framework for building UIs. Created by Evan You (2014). Sits between React (a library) and Angular (a full framework) — adoptable incrementally as a `<script>` tag, scalable to full SPAs via Vue CLI / Vite + Pinia + Vue Router.

Three pillars:

1. **Declarative rendering** — template syntax bound to reactive data.
2. **Reactivity** — change data, the view updates automatically (proxy-based since v3).
3. **Component-based** — build with single-file components (`.vue`).

Independent of any single corporation — community-funded.

---

## Mental Model

```
data (reactive proxy) ──► template ──► render fn ──► virtual DOM ──► patch
       ▲                                                                │
       └────────── methods / events / watchers ◄────────────────────────┘
```

Same idea as React, but **reactivity is automatic** — Vue tracks which components depend on which data and re-renders only those.

---

## Core Concepts

### Template syntax

HTML-based with mustaches and directives.

```vue
<template>
  <div :class="{ active: isActive }" @click="handleClick">
    {{ message }}
  </div>
</template>
```

| Directive | Purpose |
|-----------|---------|
| `v-bind:foo` / `:foo` | Bind attribute |
| `v-on:click` / `@click` | Event listener |
| `v-model` | Two-way binding (form input ↔ data) |
| `v-if` / `v-else-if` / `v-else` | Conditional rendering |
| `v-for` | List rendering |
| `v-show` | Toggle CSS `display` (vs unmounting) |
| `v-html` | Raw HTML (XSS-prone — sanitize) |
| `v-pre`, `v-once`, `v-memo` | Skip / freeze updates |

### Reactive primitives

```js
import { ref, reactive, computed, watch } from 'vue';

const count = ref(0);                   // primitive — access via .value
const user = reactive({ name: 'Yosi' }); // object — access directly
const doubled = computed(() => count.value * 2);
watch(count, (n, old) => console.log(n, old));
```

### Lifecycle hooks (Composition API)

`onMounted`, `onUpdated`, `onUnmounted`, `onBeforeMount`, `onBeforeUpdate`, `onBeforeUnmount`, `onErrorCaptured`, `onActivated`, `onDeactivated` (keep-alive).

---

## How to Use — Minimal Setup

### Vite (default in 2026)

```bash
npm create vue@latest my-app
cd my-app && npm install && npm run dev
```

Prompts for TypeScript / Pinia / Router / ESLint / Prettier / Vitest / Playwright.

### Nuxt (full-stack / SSR / SSG)

```bash
npx nuxi@latest init my-app
```

### CDN (no build)

```html
<script src="https://unpkg.com/vue@3"></script>
<div id="app">{{ msg }}</div>
<script>
  Vue.createApp({ data: () => ({ msg: 'Hello' }) }).mount('#app');
</script>
```

---

## Composition API vs Options API

Vue 3 supports both. New code → Composition API + `<script setup>`.

### Options API (Vue 2 era, still supported)

```vue
<script>
export default {
  data() { return { count: 0 }; },
  computed: { doubled() { return this.count * 2; } },
  methods: { inc() { this.count++; } },
  mounted() { console.log('mounted'); }
};
</script>
```

### Composition API + `<script setup>` (modern)

```vue
<script setup>
import { ref, computed, onMounted } from 'vue';

const count = ref(0);
const doubled = computed(() => count.value * 2);
function inc() { count.value++; }
onMounted(() => console.log('mounted'));
</script>
```

| Aspect | Options API | Composition API |
|--------|------------|-----------------|
| Learning curve | Easier for beginners | More flexibility, less magic |
| Logic reuse | Mixins (problematic) | Composables (functions) — clean |
| TypeScript | OK | Excellent — native inference |
| Code organization | Grouped by *type* (data/methods/...) | Grouped by *concern* |
| Bundle size | Slightly more | Slightly less (tree-shakable) |

**Composables** = the Vue equivalent of React custom hooks. Plain functions starting with `use` that wrap reactive logic.

```js
// useCounter.ts
export function useCounter(initial = 0) {
  const count = ref(initial);
  const inc = () => count.value++;
  return { count, inc };
}
```

---

## Reactivity System

Vue 3 uses **ES Proxies** to intercept property access (Vue 2 used `Object.defineProperty`, which had limitations: no array index reactivity, no new-property detection).

- `ref(value)` — wraps any value in a reactive container; access with `.value`.
- `reactive(obj)` — proxies an object; access fields directly.
- `computed(fn)` — derived ref with caching, recomputed only when deps change.
- `watch(source, cb)` — explicit side-effect on change. `watchEffect(fn)` auto-tracks.

**Reactivity boundaries:**
- Destructuring a `reactive` object **breaks** reactivity (you get plain values). Use `toRefs(obj)`.
- Refs auto-unwrap in templates (no `.value`) but **not** in JS code.

---

## Major Versions

| Version | Year | Highlights |
|---------|------|------------|
| **0.x** | 2013–2014 | Initial release by Evan You |
| **1.0** "Evangelion" | 2015 | First stable, single-file components |
| **2.0** "Ghost in the Shell" | 2016 | Virtual DOM rewrite, server-side rendering, JSX support |
| **2.6** | 2019 | Slot syntax cleanup (`v-slot`), async error handling |
| **2.7** "Naruto" | 2022 | Backport of `<script setup>` and Composition API. Final 2.x line — EOL Dec 2023 |
| **3.0** "One Piece" | 2020 | Full rewrite in TypeScript. Proxy reactivity, Composition API, fragments, teleport, Suspense, multiple root nodes, custom renderer API |
| **3.2** | 2021 | `<script setup>` stable, CSS `v-bind`, `defineProps`/`defineEmits` |
| **3.3** "Rurouni Kenshin" | 2023 | Generic components, defineModel, defineSlots |
| **3.4** "Slam Dunk" | 2023 | Faster parser (2x), reactive system perf |
| **3.5** "Tengen Toppa Gurren Lagann" | 2024 | Reactive props destructure, useId, useTemplateRef, lazy hydration |
| **Vapor Mode** | 2024–2026 | Compile-time mode that skips the virtual DOM entirely (Solid-like). Opt-in per component |

### Vue 2 → Vue 3 migration gotchas

- Mounting: `new Vue(...)` → `createApp(...)`
- Filters removed — use computed/methods
- Event bus pattern (`new Vue()`) removed — use mitt or props/emit
- `v-model` arg syntax changed (`v-model:title="..."`)
- Functional components: now plain functions, not the old `functional: true`
- `$listeners` merged into `$attrs`
- IE11 support dropped

The `vue-demi` package and `@vue/compat` build help incremental migration.

---

## Single-File Components

`.vue` files combine three blocks:

```vue
<template>
  <button @click="inc">{{ count }}</button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
const inc = () => count.value++;
</script>

<style scoped>
button { color: hotpink; }
</style>
```

`<style scoped>` rewrites selectors with a per-component attribute — no global leaks. `<style module>` exposes class names as a `$style` object.

---

## State Management

| Library | Status | Use |
|---------|--------|-----|
| **Pinia** | Official since 2022 | Default global store. Composition-API native, TS-first |
| Vuex | Legacy (Vue 2 / early 3) | Maintenance mode. Migrate to Pinia |
| Provide / Inject | Built-in | Lightweight DI through component tree |

```ts
// stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);
  function inc() { count.value++; }
  return { count, double, inc };
});
```

---

## Ecosystem

| Need | 2026 default |
|------|--------------|
| Build | Vite |
| Meta-framework (SSR/SSG) | **Nuxt 3** |
| Router | Vue Router 4 |
| State | **Pinia** |
| Forms / validation | VeeValidate, Zod |
| UI library | **PrimeVue**, Naive UI, Element Plus, Vuetify, Quasar |
| Headless components | Radix Vue, Headless UI |
| Animation | `@vueuse/motion`, GSAP |
| Utilities | **VueUse** (300+ composables — indispensable) |
| Testing | Vitest + Vue Test Utils + Playwright |
| Mobile | NativeScript-Vue, Quasar (hybrid), Ionic Vue |

---

## Pitfalls

| Pitfall | Why it bites |
|---------|--------------|
| Destructuring `reactive` | Loses reactivity. Use `toRefs()` |
| Forgetting `.value` on refs | Reading the wrapper, not the value, in JS |
| Mutating props | Vue warns; props are one-way. Use a local ref + emit |
| `v-for` + `v-if` on same element | Removed in Vue 3 — separate them |
| `v-html` with user input | XSS — sanitize first |
| Watchers vs computed | Computed for *derived values*, watchers for *side effects*. Don't mix |
| Memory leaks in event listeners | Add in `onMounted`, remove in `onUnmounted` |
| Ref unwrapping confusion | Refs auto-unwrap in templates and reactive objects but not in raw arrays/objects |

---

## See Also

- [react.md](react.md) -- React reference (sister framework)
- [angular.md](angular.md) -- Angular reference
- [svelte.md](svelte.md) -- Svelte reference
- [ui5.md](ui5.md) -- SAP UI5 reference
- [typescript/](../typescript/) -- TypeScript notes
- [javascript-kb](../javascript-kb) -- JavaScript language reference
