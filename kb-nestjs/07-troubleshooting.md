---
type: reference
title: troubleshooting
description: "NestJS troubleshooting, including npm peer dependency errors."
tags: [nestjs, npm, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#7"
---

# troubleshooting

[↑ nestjs-kb](/kb-nestjs/README.md)

## 7.1 npm

```text
        7.1.1  A requires a peer of B but none is installed. You must install peer dependencies yourself
        @nestjs/graphql@7.5.5 requires a peer of @nestjs/common@^7.0.0 but none is installed. You must install peer dependencies yourself


"A requires a peer of B but none was installed". Consider it as "A requires one of B's peers but that peer was not installed and we're not telling you which of B's peers you need."
The automatic installation of peer dependencies was explicitly removed with npm 3.

NPM Blog

Release notes of v3

So you cannot install peer dependencies automatically with npm 3 and upwards.

Updated Solution:

Use following for each peer dependency to install that and remove the error

npm install --save-dev xxxxx
Deprecated Solution:

You can use npm-install-peers to find and install required peer dependencies.

npm install -g npm-install-peers

npm-install-peers
If you are getting this error after updating any package's version then remove node_modules directory and reinstall packages by npm install or npm cache clean and npm install.

So update manually

        7.1.2
    7.2
```
