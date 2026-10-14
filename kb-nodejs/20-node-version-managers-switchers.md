---
type: reference
title: "Node version managers, switchers"
description: "Node version managers, mainly nvm: install and use specific versions."
tags: [nodejs, npm, howto, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#20"
---

# Node version managers, switchers, tags:Node version managers, switchers, toggle

[↑ nodejs-kb](/kb-nodejs/README.md)

## 20.1 https://github.com/nvm-sh/nvm

### 20.1.1 introduction

```text
nvm allows you to quickly install and use different versions of node via the command line.
$ nvm use 16
Now using node v16.9.1 (npm v7.21.1)
$ node -v
v16.9.1
$ nvm use 14
Now using node v14.18.0 (npm v6.14.15)
$ node -v
v14.18.0
$ nvm install 12
Now using node v12.22.6 (npm v6.14.5)
$ node -v
v12.22.6
```

### 20.1.2 install

```text
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```

### 20.1.3 install and use a specific node version

```text
$ nvm install 18.12.0 #LTS version
Downloading and installing node v18.12.0...
Downloading https://nodejs.org/dist/v18.12.0/node-v18.12.0-darwin-arm64.tar.xz...
############################################################################################################################################################################################################# 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v18.12.0 (npm v8.19.2)
Creating default alias: default -> 18.12.0 (-> v18.12.0)
$ nvm use 18.12.0
Now using node v18.12.0 (npm v8.19.2)

        20.1.4 
```

## 20.2 n install and switch between different Node

````text
`n` is a popular Node.js version management tool that allows you to install and switch between different Node.js versions on your system. Here's how you can install and use `n`:

| 1. Install `n` using npm by running the following command in your terminal:
| 
| ```
| npm install -g n
| ```
| 
| Note: You may need to use `sudo` to install `n` globally, depending on your system configuration.
| 
| 2. Once `n` is installed, you can use it to install and manage different Node.js versions. To install the latest version of Node.js, simply run the following command:
| 
| ```
| n latest
| ```
| 
| This will download and install the latest version of Node.js on your system.
| 
| 3. To switch between different Node.js versions, use the `n` command followed by the version number you want to switch to. For example, if you want to switch to version 14.17.0, run the following command:
| 
| ```
| n 14.17.0
| ```
| 
| This will switch your system to use Node.js version 14.17.0.
| 
| 4. You can also list all installed Node.js versions by running the following command:
| 
| ```
| n ls
| ```
| 
| This will display a list of all the installed Node.js versions on your system.
| 
| 5. If you want to remove a specific Node.js version, use the `n rm` command followed by the version number. For example, to remove version 14.17.0, run the following command:

```
n rm 14.17.0
```

Note that removing a Node.js version will also remove all the globally installed packages associated with that version.

That's it! You should now be able to install and switch between different Node.js versions on your system using the `n` module.

    20.3
````
