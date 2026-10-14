---
type: reference
title: Tools
description: "Tools for ASCII diagrams on Mac (asciiflow, ditaa installed via brew)."
tags: [macos, homebrew, reference, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#7"
---

# Tools

[↑ kb-mac](/kb-mac/README.md)

## 7.1 ascii diagrams

```text
http://asciiflow.com
```

## 7.2 beautify ascii diagrams, ditaa

```text
- Install
$ brew update
$ brew install ditaa

- run
$ ditaa !$
ditaa cert_validation.txt

ditaa version 0.9, Copyright (C) 2004--2009  Efstathios (Stathis) Sideris

Running with options:
Reading file: cert_validation.txt
Locale: en_US
Dialog
Rendering to file: cert_validation.png
Done in 2sec
$ ls
COPYING*		HLD.png*		cert_validation.png	ditaa0_9.jar*		pbis_overview.txt
HISTORY*		HLD.txt*		cert_validation.txt	pbis_overview.bmp
```
