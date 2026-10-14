---
type: reference
title: "Text searches for multiple files, grep, external, internal"
description: "Legacy vim KB section: Text searches for multiple files, grep, external, internal (:h grep, internal example:)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#32"
---

# Text searches for multiple files, grep, external, internal

[↑ KB_vi](/vi/kb-vi/README.md)

## 32.1 :h grep

```text
		:h cn
```

## 32.2 internal example:

```text
		:vim pattern *.cpp

		use :cn, :cp to go to next/prev match
		:cc[number], jump to match [number]

		:copen open the match list window. use enter to jump to error.
		:ccl close the window
```
