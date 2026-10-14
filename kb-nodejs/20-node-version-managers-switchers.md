---
type: reference
title: "Node version managers, switchers"
description: "Node version managers, mainly nvm: install and use specific versions."
tags: [nodejs, npm, howto, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "nodejs-kb#20"
sources:
  - { id: node-releases, resource: "https://nodejs.org/en/about/previous-releases", title: "Node.js Releases (release status)" }
  - { id: nvm-readme, resource: "https://github.com/nvm-sh/nvm/blob/master/README.md", title: "nvm README" }
  - { id: n-readme, resource: "https://github.com/tj/n/blob/master/README.md", title: "n README" }
---

# Node version managers, switchers, tags:Node version managers, switchers, toggle

[↑ nodejs-kb](/kb-nodejs/README.md)

## 20.1 https://github.com/nvm-sh/nvm

### 20.1.1 introduction

> Updated 2026-10 to current practice.[^node-releases]

nvm allows you to quickly install and use different versions of node via the command line. Pick an LTS line: as of 2026-10, Node.js 24 ("Krypton") and 22 ("Jod") are the supported LTS releases, 26 is the "Current" line, and 16, 18 and 20 are end-of-life. Production apps should only run on Active or Maintenance LTS.[^node-releases]

```console
$ nvm install --lts        # latest LTS
$ nvm install 22           # latest 22.x
$ nvm use 24
$ node -v                  # prints the active v24.x.y
$ nvm ls                   # installed versions + aliases
$ nvm ls-remote --lts      # available LTS versions
```

Note: from Node.js 27 on, the release cycle changes to one major per year, and every major becomes LTS after its Current phase (no more odd = short-lived / even = LTS split).[^node-releases]

### 20.1.2 install

> Updated 2026-10 to current practice.[^nvm-readme]

Use the version the README currently pins (v0.40.8 as of 2026-10); check the README for the latest tag before installing:[^nvm-readme]

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.8/install.sh | bash
```

### 20.1.3 install and use a specific node version

> Updated 2026-10 to current practice.[^nvm-readme]

```bash
nvm install 24                 # downloads, verifies the checksum, and switches to it
nvm use 24
nvm alias default 24           # new shells start on 24.x
nvm alias default lts/*        # ...or always the latest installed LTS
```

Per project, pin the version in an `.nvmrc` file; `nvm use` / `nvm install` (no argument) search upward from the current directory for it:[^nvm-readme]

```bash
echo "lts/*" > .nvmrc          # or an exact line such as "24"
nvm install && nvm use
```

## 20.2 n install and switch between different Node

> Updated 2026-10 to current practice.[^n-readme]

`n` is another popular Node.js version manager. It installs Node versions into one prefix (default `/usr/local`) and switches between them, rather than per-shell like nvm.[^n-readme]

1. Install `n`, either with npm (when you already have a Node), with Homebrew on macOS, or by bootstrapping straight from GitHub (this also installs the LTS Node):

   ```bash
   npm install -g n
   # or
   brew install n
   # or
   curl -fsSL https://raw.githubusercontent.com/tj/n/master/bin/n | bash -s install lts
   ```

   Note: you may need `sudo`, or set `N_PREFIX` to a directory you own, depending on your system configuration.

2. Install and switch to a version:

   ```bash
   n lts        # latest LTS
   n latest     # newest release (may be a "Current", non-LTS line)
   n 24         # latest 24.x.y
   n            # interactive picker of downloaded versions
   ```

3. List downloaded (cached) versions:

   ```bash
   n ls
   ```

4. Remove cached versions:

   ```bash
   n rm 22.12.0     # remove a specific cached version
   n prune          # remove all cached versions except the active one
   ```

Note: unlike nvm (which keeps a separate global `node_modules` per Node version), `n` does not touch your global npm packages when you switch or remove versions; only `npm` itself changes with the Node install.[^n-readme]

[^node-releases]: Node.js Releases (release status)
[^nvm-readme]: nvm README
[^n-readme]: n README
