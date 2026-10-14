---
type: reference
title: Work area modifications
description: Section 41 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#41"
---

# Work area modifications

[↑ KB_vi](/vi/kb-vi/README.md)

## 41.1 Mark current line

```text
	The first one is the cursorline command, which basically marks the entire line with,
for example, another background color, without breaking the syntax coloring. To
turn it on, use the following command (highlight horizontaly):
:set cursorline
The color it uses is the one defined in the color group CursorLine. You can change this
to any color or styling you like, for example:
:highlight CursorLine guibg=lightblue ctermbg=lightgray

If you are working with a lot of aligned file content (like tab-separated data), the next
solution for cursor tracking comes in handy (highlight vertically):
:set cursorcolumn
This command marks the current column the cursor is in by, for example, coloring
the entire column in the file.
```

## 41.2 Remove marks

```text
	:set no[cursorLine/cursorcolumn]
```
