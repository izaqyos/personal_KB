---
type: reference
title: Calculate average for a column of numbers
description: Section 3 of the legacy kb_awk notes.
tags: [kb-awk]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#3"
---

# Calculate average for a column of numbers

[↑ kb_awk](/awk/kb-awk/README.md)

```text
	example, calulate MSC average:
	cat Yosi_Izaq_MSc_Grades.strip  | awk '{sum += $5; courses+=1} END {print sum " " courses-1 " " sum/(courses-1)}'
```
