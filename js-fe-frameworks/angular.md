# Angular

> **Source:** Personal notes + Angular docs (angular.dev)
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [What is Angular](#what-is-angular)
- [Mental Model](#mental-model)
- [Core Concepts](#core-concepts)
- [How to Use — Minimal Setup](#how-to-use--minimal-setup)
- [Components and Templates](#components-and-templates)
- [Dependency Injection](#dependency-injection)
- [RxJS in Angular](#rxjs-in-angular)
- [Signals](#signals)
- [Major Versions](#major-versions)
- [Routing](#routing)
- [State Management](#state-management)
- [Pitfalls](#pitfalls)
- [Ecosystem](#ecosystem)
- [See Also](#see-also)

---

## What is Angular

A **full-featured TypeScript framework** for building SPAs. Maintained by Google. Opinionated: routing, forms, HTTP, DI, testing, i18n all ship in-box.

Two distinct things share the name:

- **AngularJS (1.x)** — original framework, 2010, two-way binding via dirty-checking. **EOL Dec 2021. Don't use.**
- **Angular (2+)** — complete TypeScript rewrite, 2016. Component-based, RxJS-first, hierarchical DI. This is what people mean today.

Best fit: large enterprise apps, teams that value strong conventions, codebases that survive turnover.

---

## Mental Model

```
@Component template ──► change detection ──► DOM update
       ▲                       ▲
       │                       │
       └── @Input / Signal ────┘
       └── service via DI ─────┘
       └── Observable subscription
```

Every component has:
- **Template** (HTML with Angular syntax)
- **Class** (TypeScript, decorated with `@Component`)
- **Styles** (scoped via emulated Shadow DOM)
- An **injector** in a hierarchy

---

## Core Concepts

| Concept | What it is |
|---------|-----------|
| **Component** | Reusable UI building block — class + template + styles |
| **Template** | HTML with bindings, directives, control flow |
| **Directive** | Class that augments DOM behavior (`*ngIf`, `*ngFor` historically; built-in flow now) |
| **Pipe** | Pure function for template formatting (`{{ date \| date:'short' }}`) |
| **Service** | Injectable singleton (or scoped) holding logic / data |
| **Module** | Grouping mechanism (legacy) — superseded by **standalone components** in 17+ |
| **Dependency Injection** | Hierarchical injector resolves services for components |
| **Change Detection** | Mechanism that compares state→view; default Zone.js, modern path uses signals |

---

## How to Use — Minimal Setup

```bash
npm install -g @angular/cli
ng new my-app --standalone --routing --style=scss --strict
cd my-app && ng serve
```

`--standalone` (default in 17+) skips NgModules. `--ssr` adds Angular Universal.

```bash
ng generate component foo        # alias: ng g c foo
ng generate service api          # alias: ng g s api
ng test                          # Karma + Jasmine (or Vitest in 19+)
ng build --configuration=production
```

---

## Components and Templates

### Standalone component (17+)

```ts
import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="inc()">{{ count() }}</button>
    <p>Doubled: {{ doubled() }}</p>
    @if (count() > 5) { <span>High</span> }
    @for (item of items; track item.id) { <li>{{ item.name }}</li> }
  `,
  styles: [`button { padding: 8px; }`]
})
export class CounterComponent {
  count = signal(0);
  doubled = computed(() => this.count() * 2);
  items = [{ id: 1, name: 'a' }];
  inc() { this.count.update(n => n + 1); }
}
```

### Template syntax

| Binding | Example |
|---------|---------|
| Interpolation | `{{ value }}` |
| Property | `[disabled]="isDisabled"` |
| Event | `(click)="handle($event)"` |
| Two-way | `[(ngModel)]="name"` (requires FormsModule) |
| Attribute | `[attr.aria-label]="label"` |
| Class | `[class.active]="isActive"` |
| Style | `[style.color]="color"` |

### Built-in control flow (17+)

```html
@if (condition) { ... } @else { ... }
@for (item of items; track item.id) { ... } @empty { ... }
@switch (kind) { @case ('a') { ... } @default { ... } }
@defer { <heavy/> } @placeholder { Loading... }
```

Replaces `*ngIf`, `*ngFor`, `*ngSwitch`. Faster, smaller bundles, type-safe.

---

## Dependency Injection

A core feature, more central than in React/Vue.

```ts
@Injectable({ providedIn: 'root' })  // app-wide singleton
export class ApiService {
  constructor(private http: HttpClient) {}
  getUsers() { return this.http.get<User[]>('/api/users'); }
}

@Component({ ... })
export class UserListComponent {
  // modern: inject() function
  private api = inject(ApiService);
}
```

Injection scopes:
- `'root'` — singleton across the app
- `'platform'` — across multiple Angular apps on a page
- `'any'` — per lazy-loaded module
- Component-level `providers: [...]` — new instance per component subtree

---

## RxJS in Angular

Historically central — `HttpClient`, `Router`, `Forms` all return Observables.

```ts
this.api.getUsers()
  .pipe(
    filter(users => users.length > 0),
    map(users => users.slice(0, 10)),
    takeUntilDestroyed()  // 16+ — auto-unsubscribe on component destroy
  )
  .subscribe(users => this.users = users);
```

Common operators: `map`, `filter`, `switchMap`, `mergeMap`, `concatMap`, `debounceTime`, `distinctUntilChanged`, `catchError`, `tap`, `combineLatest`, `forkJoin`.

The `async` pipe in templates auto-subscribes/unsubscribes:

```html
<div *ngIf="user$ | async as user">{{ user.name }}</div>
```

Modern Angular is **shifting away** from RxJS as the primary primitive toward signals — but RxJS still owns async streams.

---

## Signals

Introduced in Angular 16, stable in 17. A simpler, synchronous reactive primitive.

```ts
const count = signal(0);
const double = computed(() => count() * 2);

count.set(5);
count.update(n => n + 1);

effect(() => console.log('count is', count()));

// interop
const sig = toSignal(observable$, { initialValue: 0 });
const obs$ = toObservable(sig);
```

Signal-based components (preview in 19, stable in 20) replace Zone.js change detection — only re-render where signals changed. Massive perf win, smaller bundles.

`input()`, `output()`, `model()`, `viewChild()`, `contentChild()` — signal-based equivalents of `@Input`/`@Output`/`@ViewChild`.

---

## Major Versions

Angular ships **two major releases per year** (May, November). 6-month features, 12-month LTS.

| Version | Year | Highlights |
|---------|------|------------|
| **2** | 2016 | Complete rewrite from AngularJS. TypeScript, components, RxJS, DI |
| **4** | 2017 | Skipped 3 (router was at v3). `*ngIf` else, smaller bundle |
| **5** | 2017 | Build optimizer, HttpClient |
| **6** | 2018 | Angular CLI workspaces, ng update, RxJS 6 |
| **7** | 2018 | Drag-drop CDK, virtual scroll |
| **8** | 2019 | Ivy (preview), differential loading, dynamic imports |
| **9** | 2020 | **Ivy renderer** default. Smaller bundles, better tree-shaking |
| **10–13** | 2020–2021 | Stricter mode, webpack 5, View Engine removed (13) |
| **14** | 2022 | Standalone components (preview), typed forms, page title strategy |
| **15** | 2022 | Standalone APIs stable, image directive, MDC-based Material |
| **16** | 2023 | **Signals** (preview), `takeUntilDestroyed`, `inject()` everywhere, hydration (preview), required inputs |
| **17** | 2023 | New site (angular.dev), built-in `@if`/`@for`/`@switch`, `@defer`, signals stable, esbuild default, faster builds |
| **18** | 2024 | Material 3, signal-based forms (experimental), `@let`, zoneless preview, event replay |
| **19** | 2024 | Standalone-by-default, signal-based components (preview), incremental hydration |
| **20** | 2025 | **Zoneless** stable, signal components stable, resource API |

### AngularJS (1.x) → Angular (2+) — *not a migration, a rewrite*

Different framework. Use `ngUpgrade` only for hybrid apps during gradual replacement. New projects: skip AngularJS entirely.

### View Engine → Ivy (v9)

Compiler/runtime swap. Mostly transparent — but library authors had to recompile. View Engine removed in v13.

### NgModules → Standalone (v14–17)

Old:

```ts
@NgModule({ declarations: [FooComponent], imports: [CommonModule] })
export class FooModule {}
```

New:

```ts
@Component({ standalone: true, imports: [CommonModule], ... })
export class FooComponent {}
```

`bootstrapApplication(AppComponent, { providers: [...] })` replaces `platformBrowserDynamic().bootstrapModule()`.

### Zone.js → Zoneless (v20)

Zone.js patched all async APIs to trigger change detection. Heavyweight (~100KB), perf cost. Zoneless mode uses signals + scheduler for surgical updates.

---

## Routing

```ts
// app.routes.ts
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'users/:id', component: UserComponent, canActivate: [authGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.routes) },
  { path: '**', redirectTo: '' }
];
```

- **Guards**: `canActivate`, `canDeactivate`, `canMatch`, `canLoad`, `resolve`. Modern style: functions with `inject()`.
- **Lazy loading**: `loadComponent`, `loadChildren`.
- **Route data**: static `data: { ... }` or `resolve: { ... }`.

---

## State Management

| Library | Style |
|---------|-------|
| **Signals** (built-in) | Default for component & service state in 17+ |
| **NgRx** | Redux pattern with effects. Heavy but powerful for big apps |
| **NgRx Signals Store** | Modern signal-based store — much lighter than classic NgRx |
| **NGXS** | Class-based, decorator-driven |
| **Akita** | Entity-focused, simpler than NgRx (now in maintenance) |
| **Service + BehaviorSubject** | Simplest pattern — service holds state, components subscribe |

For most apps: services + signals. NgRx only when you genuinely need its devtools, time-travel, or effects orchestration.

---

## Pitfalls

| Pitfall | Why it bites |
|---------|--------------|
| Confusing AngularJS with Angular | Different frameworks; 1.x examples don't apply |
| Forgetting to unsubscribe | Memory leaks. Use `async` pipe or `takeUntilDestroyed` |
| Calling functions in templates | Re-evaluated on every change detection. Use computed signals or pipes |
| `OnPush` + mutation | `OnPush` checks references. Mutating arrays/objects won't trigger change detection |
| Provider scope mistakes | `providedIn: 'root'` vs component `providers` — wrong scope = unintended new instances |
| `ng-template` vs `ng-container` | `ng-template` is dormant until rendered; `ng-container` is a logical group |
| Reactive Forms vs Template Forms | Don't mix in one form. Reactive is preferred for complex forms |
| Hydration mismatches | SSR with non-deterministic client code (`Math.random`, `Date.now`) |

---

## Ecosystem

| Need | 2026 default |
|------|--------------|
| Build | Angular CLI (esbuild) |
| SSR | Angular Universal / `@angular/ssr` |
| State | Signals + service, or NgRx Signals Store |
| HTTP | `HttpClient` (built-in) + `httpResource` (signal-based) |
| Forms | Reactive Forms (`@angular/forms`) |
| Component lib | **Angular Material**, PrimeNG, NG-ZORRO, Spartan/ui (shadcn-like) |
| Charts | ngx-charts, Highcharts-Angular |
| Testing | Karma+Jasmine (legacy), **Vitest+Web Test Runner** (modern), Cypress, Playwright |
| Monorepo | **Nx** |
| Icons | Material Icons, Lucide-Angular |

---

## See Also

- [react.md](react.md) -- React reference
- [vue.md](vue.md) -- Vue reference
- [svelte.md](svelte.md) -- Svelte reference
- [ui5.md](ui5.md) -- SAP UI5 (built atop similar patterns)
- [typescript/](../typescript/) -- TypeScript notes (Angular is TS-first)
- [interviews/frameworks.md](../interviews/frameworks.md) -- Framework interview prep
- [nestjs-kb](../nestjs-kb) -- NestJS (Angular-inspired Node backend)
