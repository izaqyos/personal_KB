---
type: reference
title: Installation from sources.
description: "Installing software from sources: unpack, configure, make and install."
tags: [linux, build, make, howto, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#11"
---

# Installation from sources.

[↑ KB_Linux](/linux/kb-linux/README.md)

## 11.1 General procedure.

### 11.1.1 open archive

```text
		bzip2 -d, gunzip and then tar xvf to /tmp/pkg_name
```

### 11.1.2 configure and make

```text
		./configure

		make
```

### 11.1.3 Install

```text
		change to root: either su or sudo su (in systems with sudo like RH developer servers).
		then: make install
```
