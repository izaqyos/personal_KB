---
type: reference
title: Add line after line specific line number
description: Section 4 of the legacy kb_awk notes.
tags: [kb-awk]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#4"
---

# Add line after line specific line number

[↑ kb_awk](/awk/kb-awk/README.md)

## 4.1 example add after first line the line "bbb"

```text
	awk ' {print} NR==1 {print "bbb"} ' stam 
```

## 4.2 Using sed for similar tast, add comment in line 137-139.

```text
	sed -i~ -e '137/*' -e '139i*/' test.cpp
```
