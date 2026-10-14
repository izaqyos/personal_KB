---
type: reference
title: Movement
description: Section 20 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#20"
---

# Movement

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	fm forward to character m
	Fm backward to character m
	tm forward to character before m
	Tm backward to character after m
	w move to next word (stops at puncuation)
	W move to next word (skips punctuation)
	b move to previous word (stops at punctuation)
	B move to previous word (skips punctuation)
	e end of word (puncuation not part of word)
	E end of word (punctuation part of word)
	), ( next, previous sentence
	]], [[ next, previous section
	}, { next, previous paragraph
	% goto matching parenthesis () {} []
	`` jump to last edit
```
