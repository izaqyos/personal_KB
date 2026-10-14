---
type: reference
title: Examples of my use cases
description: "Personal use-case examples, such as sort -k and monitoring loops."
tags: [linux, shell, one-liners, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#20"
---

# Examples of my use cases

[↑ KB_Linux](/linux/kb-linux/README.md)

## 20.1 sort -k example

```text
use for monitoring command, ex:
while 1 ; do ls -lrth acs_5_1* | tail | sort -k 9 ; echo "------------------";  sleep 60; done
```
