---
type: reference
title: troubleshooting
description: Section 11 of the legacy nodejs-kb notes.
tags: [kb-nodejs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#11"
---

# troubleshooting

[↑ nodejs-kb](/kb-nodejs/README.md)

## 11.1 Error: Cannot find module '../lib/utils/unsupported.js'

```text
$ npm
internal/modules/cjs/loader.js:605
    throw err;
    ^

Error: Cannot find module '../lib/utils/unsupported.js'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:603:15)
    at Function.Module._load (internal/modules/cjs/loader.js:529:25)
    at Module.require (internal/modules/cjs/loader.js:657:17)
    at require (internal/modules/cjs/helpers.js:22:18)
    at /usr/local/lib/node_modules/npm/bin/npm-cli.js:19:21
    at Object.<anonymous> (/usr/local/lib/node_modules/npm/bin/npm-cli.js:153:3)
    at Module._compile (internal/modules/cjs/loader.js:721:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:732:10)
    at Module.load (internal/modules/cjs/loader.js:620:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:560:12)

Fix:
Try to remove /usr/local/lib/node_modules/npm and reinstall node again. This should work.

On MacOS with Homebrew:

sudo rm -rf /usr/local/lib/node_modules/npm && brew reinstall node

brew update && brew uninstall node && brew install node && brew postinstall 

My fix (that actually worked)
 1385  brew postinstall node
 1386  sudo chown -R $USER /usr/local
 1387  brew update
 1388  brew doctor
 1389  brew link node
 1390  brew cleanup
 1391  brew link node
 1392  brew uninstall node
 1393  brew install node
 1394  brew link --overwrite node

    11.2
```
