---
type: reference
title: My FAQ
description: Personal FAQ on splitting and joining binary files.
tags: [unix, faq, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#32"
---

# My FAQ

[↑ unix-kb](/kb-unix/README.md)

## 32.1 split and join binary files

```text
split to 2 parts:

$ split -n2 -e yosi_backup_07_11_17.tar.bz2 

join:
$ cat x* > test.tarz

    32.2


33.
```
