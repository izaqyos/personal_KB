---
type: reference
title: Tips
description: "Awk tip for counting non-directory files in a directory, compared with ls and grep."
tags: [awk, tips, legacy, one-liners, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#6"
---

# Tips

[↑ kb_awk](/awk/kb-awk/README.md)

## 6.1 Count number of files in directory

```text
		$ ls -l | awk ' !/^d/ {n++} END {print n}'
		$ ls -l | grep -v '^d' | wc -l
```
