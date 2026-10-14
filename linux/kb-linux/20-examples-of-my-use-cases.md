---
type: reference
title: Examples of my use cases
description: Section 20 of the legacy KB_Linux notes.
tags: [kb-linux]
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
