---
type: reference
title: "eslint, for static analysis"
description: "ESLint static analysis for Node.js: flat-config (eslint.config.js) setup, replacing the old Grunt + .eslintrc setup."
tags: [nodejs, javascript, coding-standards, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "nodejs-kb#4"
sources:
  - { id: eslint-cli, resource: "https://eslint.org/docs/latest/use/command-line-interface", title: "ESLint: Command Line Interface Reference" }
  - { id: eslint-getting-started, resource: "https://eslint.org/docs/latest/use/getting-started", title: "ESLint: Getting Started" }
  - { id: eslint-config-files, resource: "https://eslint.org/docs/latest/use/configure/configuration-files", title: "ESLint: Configuration Files" }
  - { id: eslint-migrate-10, resource: "https://eslint.org/docs/latest/use/migrate-to-10.0.0", title: "ESLint: Migrate to v10.x" }
---

# eslint, for static analysis

[↑ nodejs-kb](/kb-nodejs/README.md)

> Updated 2026-10 to current practice.[^eslint-cli]

CLI reference: <https://eslint.org/docs/latest/use/command-line-interface>

generate report

```bash
npx eslint .
```

## 4.1 grunt setup eslint

> Updated 2026-10 to current practice.[^eslint-getting-started]

The original note (2018) wired ESLint 5 into a Grunt build via `grunt-eslint` + `load-grunt-tasks`, configured with a legacy `.eslintrc` file. That setup is obsolete: since ESLint v9 the default is the **flat config** file `eslint.config.js` (also `.mjs` / `.cjs`, or `.ts` with extra setup),[^eslint-config-files] and **ESLint v10 removed `.eslintrc` support entirely** (in v9 it could still be re-enabled with `ESLINT_USE_FLAT_CONFIG=false`; in v10 it can't).[^eslint-migrate-10] No task runner is needed: run ESLint directly via `npx` or an npm script.

ESLint v10 requires Node.js `^20.19.0`, `^22.13.0` or `>=24`.[^eslint-getting-started]

Set up interactively (installs `eslint`, `@eslint/js`, `globals`, and writes `eslint.config.js`):

```bash
npm init @eslint/config@latest
```

Or by hand:

```bash
npm install --save-dev eslint @eslint/js globals
```

`eslint.config.js` (ESM; use `eslint.config.mjs` if your `package.json` has no `"type": "module"`):

```js
import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";

export default defineConfig([
  { ignores: ["dist/", "coverage/"] },
  {
    files: ["**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.node },
  },
]);
```

Run it from `package.json` instead of a Grunt task:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

```bash
npm run lint
```

[^eslint-cli]: ESLint: Command Line Interface Reference
[^eslint-getting-started]: ESLint: Getting Started
[^eslint-config-files]: ESLint: Configuration Files
[^eslint-migrate-10]: ESLint: Migrate to v10.x
