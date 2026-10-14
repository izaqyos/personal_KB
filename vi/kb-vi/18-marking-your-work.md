---
type: reference
title: Marking your work
description: Section 18 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#18"
---

# Marking your work

[↑ KB_vi](/vi/kb-vi/README.md)

```text
If you need to jump backwards and forwards between a couple of places you can "mark" them ...
Mark current position as "x", only works in file	mx
Go to position "x"	`x
Lowercase marks can be used in combination with operators.  For example: "d't"
deletes the lines from the cursor position to mark 't'.  Hint: Use mark 't' for
Top, 'b' for Bottom, etc..  Lowercase marks are restored when using undo and
redo.
 
For marks that work across files use mX to mark and `X to jump.
Show list of known marks	:marks

That character before the "x" is a back-quote - on my keyboard on the top-left corner, under the tilde (~) symbol. Marks can be in a different file to the current one. 
```
