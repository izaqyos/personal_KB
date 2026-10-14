---
type: reference
title: Count number of lines on multiple files
description: Section 2 of the legacy kb_awk notes.
tags: [kb-awk]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#2"
---

# Count number of lines on multiple files

[↑ kb_awk](/awk/kb-awk/README.md)

```text
	example:
	find . -name "*.csv" -exec wc -l '{}' \; | awk '{sum += $1} END {print sum}
```
