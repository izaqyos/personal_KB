# SAP UI5 / OpenUI5

> **Source:** Personal notes + SAPUI5 docs (sapui5.hana.ondemand.com), OpenUI5
> **Author:** Yosi Izaq
> **Captured:** 2026-04-30
> **Status:** Active
> **Type:** compiled

---

## Table of Contents

- [What is UI5](#what-is-ui5)
- [SAPUI5 vs OpenUI5](#sapui5-vs-openui5)
- [Mental Model](#mental-model)
- [Core Concepts](#core-concepts)
- [How to Use — Minimal Setup](#how-to-use--minimal-setup)
- [Models and Data Binding](#models-and-data-binding)
- [MVC Anatomy](#mvc-anatomy)
- [Fiori and Fiori Elements](#fiori-and-fiori-elements)
- [Major Versions](#major-versions)
- [UI5 Tooling and TypeScript](#ui5-tooling-and-typescript)
- [Pitfalls](#pitfalls)
- [Ecosystem](#ecosystem)
- [See Also](#see-also)

---

## What is UI5

SAP's enterprise web framework for building business applications, particularly **SAP Fiori** apps. Backed by SAP since 2010, ships with SAP S/4HANA, SAP BTP, and the SAP ecosystem.

Three pillars:

1. **MVC architecture** — controllers, declarative XML views, models.
2. **Two-way data binding** — model ↔ view, deeply integrated with SAP OData services.
3. **Enterprise control library** — 200+ pre-built, accessibility-compliant, themeable controls (sap.m, sap.ui.table, sap.ui.unified, sap.suite, sap.viz).

Not a hipster choice — it exists to ship line-of-business apps that integrate with SAP backends. If you're not in the SAP ecosystem, you'd pick React/Vue/Angular instead.

---

## SAPUI5 vs OpenUI5

| | SAPUI5 | OpenUI5 |
|---|--------|---------|
| License | Proprietary (free runtime via CDN) | Apache 2.0 |
| Source | Closed core, redistributed via CDN | github.com/SAP/openui5 |
| Controls | Full set incl. sap.suite, sap.ushell, sap.viz, smart controls | Subset — no smart controls, no SAP-licensed bits |
| Integration | OData v2/v4, SAP Gateway, Fiori Launchpad | OData support, but minus SAP-specific extensions |
| Use it for | Fiori apps for SAP customers | Non-SAP projects, OSS, commercial without SAP licensing |

Both share the same APIs. Most code written against OpenUI5 runs unchanged on SAPUI5.

---

## Mental Model

```
XML View ──► declarative bindings ──► Model (JSON / OData)
   ▲                                       ▲
   │                                       │
Controller (JS/TS) ◄── lifecycle ──► HTTP / OData service
```

UI5 is a **classical MVC** framework. Views are typically **XML** (also possible: JS, JSON, HTML). Logic lives in controllers. Models hold data; bindings sync them to controls.

---

## Core Concepts

| Concept | Description |
|---------|-------------|
| **Component** | App-level container (`Component.js`). Defines manifest, root view, routing |
| **View** | UI declared in XML (`MyView.view.xml`) |
| **Controller** | TS/JS class (`MyView.controller.js`) handling events, lifecycle |
| **Model** | Data layer — `JSONModel`, `ODataModel` (v2/v4), `ResourceModel` (i18n), `XMLModel` |
| **Binding** | Connects control property to model path. Modes: One-way, Two-way, One-time |
| **Formatter** | Pure function applied to bound value before display |
| **Fragment** | Reusable view snippet (dialogs, popovers) |
| **Routing** | Hash-based, declared in `manifest.json` |
| **i18n** | Resource bundles via `ResourceModel` |
| **Manifest** (`manifest.json`) | Descriptor — config, dependencies, models, routes |

---

## How to Use — Minimal Setup

### Easy UI5 (modern starter)

```bash
npm init easy-ui5@latest
# choose: project type (basic/freestyle), TS/JS, OData version, etc.
cd my-app && npm install && npm start
```

### UI5 CLI (official)

```bash
npm install -g @ui5/cli
ui5 init
ui5 add sap.m sap.ui.core themelib_sap_horizon
ui5 serve
```

### CDN bootstrap (legacy / quick demo)

```html
<script
  id="sap-ui-bootstrap"
  src="https://sdk.openui5.org/resources/sap-ui-core.js"
  data-sap-ui-theme="sap_horizon"
  data-sap-ui-libs="sap.m"
  data-sap-ui-async="true"
  data-sap-ui-onInit="module:sap/ui/core/ComponentSupport"
  data-sap-ui-resourceroots='{"my.app": "./"}'>
</script>
<div data-sap-ui-component data-name="my.app" data-id="container"></div>
```

### Build / deploy

```bash
ui5 build --all          # produces dist/
# Deploy dist/ to ABAP repo, BTP, Cloud Foundry, or any static host
```

---

## Models and Data Binding

### JSON model

```js
const oModel = new sap.ui.model.json.JSONModel({
  user: { name: 'Yosi', orders: [...] }
});
this.getView().setModel(oModel);
```

```xml
<Text text="{/user/name}" />
<List items="{/user/orders}">
  <StandardListItem title="{title}" description="{count}" />
</List>
```

### OData v2 / v4 model (the real reason UI5 exists)

```js
const oModel = new sap.ui.model.odata.v4.ODataModel({
  serviceUrl: '/sap/opu/odata/sap/ZMY_SRV/',
  synchronizationMode: 'None'
});
```

OData binding is automatic — UI5 handles `$expand`, `$filter`, `$select`, batching, paging, optimistic concurrency. Smart controls (smart table, smart filter bar) auto-build forms from OData metadata.

### Binding modes

- `OneWay` — model → view only
- `TwoWay` — model ↔ view (default for inputs)
- `OneTime` — bind once, no updates

### Expression binding

```xml
<Text text="{= ${price} * 1.17 }" />
<Button enabled="{= ${quantity} > 0}" />
```

### Formatter

```xml
<Text text="{path: 'date', formatter: '.formatter.formatDate'}" />
```

---

## MVC Anatomy

### View (XML)

```xml
<mvc:View
  controllerName="my.app.controller.Main"
  xmlns="sap.m"
  xmlns:mvc="sap.ui.core.mvc">
  <Page title="{i18n>title}">
    <Button text="Go" press=".onPress" />
  </Page>
</mvc:View>
```

### Controller (TypeScript)

```ts
import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";

export default class Main extends Controller {
  onInit(): void {
    // bootstrap-time setup
  }
  onPress(): void {
    MessageToast.show("Hello");
  }
}
```

Lifecycle: `onInit`, `onBeforeRendering`, `onAfterRendering`, `onExit`.

### manifest.json (excerpt)

```json
{
  "sap.app": { "id": "my.app", "type": "application" },
  "sap.ui5": {
    "rootView": { "viewName": "my.app.view.Main", "type": "XML" },
    "models": {
      "i18n": { "type": "sap.ui.model.resource.ResourceModel", "settings": { "bundleName": "my.app.i18n.i18n" } }
    },
    "routing": {
      "config": { "routerClass": "sap.m.routing.Router", "viewType": "XML", "viewPath": "my.app.view", "controlId": "app", "controlAggregation": "pages" },
      "routes": [{ "name": "main", "pattern": "", "target": "main" }],
      "targets": { "main": { "viewName": "Main" } }
    }
  }
}
```

---

## Fiori and Fiori Elements

**SAP Fiori** is the design system. UI5 is the implementation. Fiori apps follow a few floorplans:

- List Report / Object Page
- Worklist
- Overview Page
- Analytical List Page

**Fiori Elements** generates the entire UI from OData metadata + annotations — no custom code for the floorplan. You write the OData service + UI annotations, you get the app. Customize via "extension points" or "flexible programming model" (FPM) for component overrides.

```
OData service + annotations  ──►  Fiori Elements template  ──►  full app
```

This is UI5's strongest differentiator vs React/Vue/Angular: huge productivity for line-of-business CRUD on SAP backends.

---

## Major Versions

UI5 ships maintenance versions every quarter. Long-term maintenance for some.

| Version | Year | Highlights |
|---------|------|------------|
| **1.0** | 2010 | Initial release (called SAPUI5) |
| **1.16** | 2014 | OpenUI5 (Apache 2.0) released |
| **1.30** | 2015 | sap.m unified for desktop+mobile, MVVM patterns mature |
| **1.38 LTS** | 2016 | Long-term maintenance, IE11 era |
| **1.44** | 2017 | Smart controls maturity |
| **1.60** | 2018 | OData v4 model, manifest-first apps |
| **1.71 LTS** | 2019 | Long-term-support release; backbone for SAP S/4HANA |
| **1.84 LTS** | 2021 | TypeScript-friendly internals |
| **1.96 LTS** | 2022 | Native TypeScript support, ES classes for controllers |
| **1.108 LTS** | 2023 | "Horizon" theme default. Fiori 3 → Horizon |
| **1.120 LTS** | 2024 | Final 1.x LTS for many SAP systems. ECMAScript module support cleaner |
| **1.130+** | 2024–2025 | Continued 1.x stream — async loading, smaller bundles, removal of deprecated APIs |
| **2.x** | 2024+ | Tree-shakable bundle, drops jQuery internals, ES modules first, Reactivity API rework, drops legacy syntax. Major breaking-change line — apps gradually migrate |

### Key migrations

- **OData v2 → v4** — model APIs differ; v4 supports server-driven paging, deep create, parameterized requests. Most new Fiori uses v4.
- **JSON view / JS view → XML view** — XML is the convention; JS views are deprecated for app dev.
- **Sync loading → async** — `data-sap-ui-async="true"` and `sap.ui.require([...], cb)` instead of `sap.ui.requireSync(...)`.
- **AMD-style `sap.ui.define` → ES modules** (1.120+) — TS code uses `import`.
- **Component preload / Component.js → manifest-first**.
- **1.x → 2.x** — drops jQuery globals, drops some deprecated controls, requires modern browsers, async-only.

---

## UI5 Tooling and TypeScript

The official toolchain (replacing the old Grunt/Gulp era):

- **`@ui5/cli`** — `ui5 init`, `serve`, `build`, `add`, `use`. Resolves UI5 dependencies, generates Component-preload.
- **`ui5-tooling-modules`** — bring in npm packages.
- **`@ui5/ts-interface-generator`** — TS type defs from UI5 metadata.
- **`ui5-middleware-livereload`** — dev experience.

### TypeScript with UI5

```ts
import Controller from "sap/ui/core/mvc/Controller";
import Event from "sap/ui/base/Event";
import Input from "sap/m/Input";

export default class Main extends Controller {
  onChange(oEvent: Event): void {
    const input = oEvent.getSource() as Input;
    console.log(input.getValue());
  }
}
```

Generate types: `npx @ui5/ts-interface-generator`. Works with VS Code IntelliSense for full UI5 API.

### Easy UI5 generators

`generator-ui5-project`, `generator-easy-ui5` produce conventional projects: TS, ESLint, Prettier, Karma, Cypress.

---

## Pitfalls

| Pitfall | Why it bites |
|---------|--------------|
| **Sync XHR / sync UI5 require** | Browsers warn/block; legacy code uses `requireSync`. Migrate to async |
| Forgetting `$expand` in OData | Cascading round-trips. Plan binding paths up front |
| Two-way binding with computed values | Pushing back into a model that doesn't accept writes — silently fails |
| Mixing JSONModel and ODataModel paths | `/users/0/name` (JSON) vs `/Users(1)/Name` (OData) — different syntaxes |
| Memory leaks from controls created in code | Manually call `.destroy()` in `onExit` |
| Theming hardcoded colors | Use theme parameters: `sap.ui.core.theming.Parameters` or LESS variables |
| Mixing `sap.m` (responsive) and `sap.ui.commons` (legacy) | `sap.ui.commons` removed long ago — use `sap.m` and `sap.f` |
| Routing target without aggregation | Target needs `controlId`+`controlAggregation` to render somewhere |
| `oEvent.getSource()` in async callbacks | Source may be destroyed by the time callback runs — capture early |
| Bundle size in 1.x | Whole-library imports. 2.x's tree-shaking helps; until then, manage `data-sap-ui-libs` carefully |

---

## Ecosystem

| Need | Default |
|------|---------|
| App generator | Easy UI5, `@ui5/cli`, BTP Business Application Studio |
| IDE | VS Code + UI5 Language Assistant + UI5 ts plugin; or BTP BAS |
| Theming | Theme Designer (SAP), or LESS overrides |
| Testing | OPA5 (UI integration), QUnit (unit), wdi5 (Webdriver wrapper), Karma (legacy) |
| Linting | UI5-linter (SAP), ESLint UI5 plugin |
| Deployment targets | SAP BTP (Cloud Foundry / Kyma), ABAP repository (Fiori on-premise), HTML5 repository |
| Backends | SAP Gateway (OData v2), CAP (OData v4 via Node/Java), S/4HANA, RAP |
| Charts | sap.viz, MicroCharts, sap.suite.ui.commons charts |
| Mobile | UI5 itself is responsive; SAP Mobile Start for native shell |
| Fiori Elements | List Report, Object Page, Worklist, OVP, ALP — generated from annotations |

---

## See Also

- [react.md](react.md) -- React reference
- [vue.md](vue.md) -- Vue reference
- [angular.md](angular.md) -- Angular reference
- [svelte.md](svelte.md) -- Svelte reference
- [sap-cf-kb-v2](../sap-cf-kb-v2) -- SAP Cloud Foundry notes (UI5 deployment target)
- [sap-cf-kb](../sap-cf-kb) -- SAP CF (legacy, larger)
- [typescript/](../typescript/) -- TypeScript notes
- [javascript-kb](../javascript-kb) -- JavaScript language reference
