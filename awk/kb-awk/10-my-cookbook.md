---
type: reference
title: My Cookbook
description: "Personal awk cookbook, such as printing all columns from the nth to the last."
tags: [awk, examples, legacy, howto, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#9"
---

# My Cookbook

[↑ kb_awk](/awk/kb-awk/README.md)

## 9.1 Using awk to print all columns from the nth to the last

```text
My solution, part of command to get all unique vi edited files (so need to drop first column, command #):
# history | grep vi | awk '{$1=""; print $0}' | uniq

Harder way, loop:
awk '{out=$2; for(i=3;i<=NF;i++){out=out" "$i}; print out}'

	9.2
```
