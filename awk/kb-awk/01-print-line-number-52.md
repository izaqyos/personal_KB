---
type: reference
title: Print line number 52.
description: Section 59 of the legacy kb_awk notes.
tags: [kb-awk]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#59"
---

# Print line number 52.

[↑ kb_awk](/awk/kb-awk/README.md)

```text
awk 'NR==52'
This one-liner tests to see if current line is number 52. If it is, "NR==52" evaluates to true and the line gets implicitly printed out (patterns without statements print the line unmodified).

The correct way, though, is to quit after line 52:

awk 'NR==52 { print; exit }'
This one-liner forces Awk to quit after line number 52 is printed. It is the correct way to print line 52 because there is nothing else to be done, so why loop over the whole doing nothing.
```
