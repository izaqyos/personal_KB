---
type: reference
title: Calculate average for a column of numbers
description: Calculating the average of a numeric column with awk sum and counter.
tags: [awk, one-liners, legacy, examples, unix]
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
