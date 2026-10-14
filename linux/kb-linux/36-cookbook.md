---
type: reference
title: Cookbook
description: "Cookbook recipes, such as diffing two text files with grep."
tags: [linux, grep, one-liners, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#36"
---

# Cookbook

[↑ KB_Linux](/linux/kb-linux/README.md)

## 36.1 Diff

### 36.1.1 find difference between two text files with one item per line

```text
a. grep -Fxvf file1 file2
What the flags mean:

-F, --fixed-strings
              Interpret PATTERN as a list of fixed strings, separated by newlines, any of which is to be matched.    
-x, --line-regexp
              Select only those matches that exactly match the whole line.
-v, --invert-match
              Invert the sense of matching, to select non-matching lines.
-f FILE, --file=FILE
              Obtain patterns from FILE, one per line.  The empty file contains zero patter

b. diff "${file1}" "${file2}" | grep "<" | sed 's/^<//g'  > "${diff_file}"

		36.1.2
	36.2
```
