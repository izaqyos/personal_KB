---
type: reference
title: "VIM diff :h vimdiff"
description: Section 39 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#39"
---

# VIM diff :h vimdiff

[↑ KB_vi](/vi/kb-vi/README.md)

## 39.1 start diff:

### 39.1.1 Start diff from command line

```text
	vimdiff file1 file2 [file3 [file4]]
	vim -d file1 file2 [file3 [file4]]
You may also use "gvimdiff" or "vim -d -g".  The GUI is started then.
You may also use "viewdiff" or "gviewdiff".  Vim starts in readonly mode then.
"r" may be prepended for restricted mode (see |-Z|).

What happens is that Vim opens a window for each of the files.  This is like
using the |-O| argument.  This uses vertical splits.  If you prefer horizontal
splits add the |-o| argument: >

	vimdiff -o file1 file2 [file3]
```

### 39.1.2 Start diff from within VIM session

```text
		:diffsplit filename
		Horizontal diff

		:vert diffsplit filename
		Vertical diff

		 :diffs file2  or :vert diffs

		:diffthis
		Add current window to the existing set of diff-enabled windows. could be used to later diff the file to its earlier state.
```

## 39.2 Diff Navigation,

### 41.2.1 Scrolling

```text
		scrolling will move in both windows (same as :set scrollbind)
		to cancel this use :set noscrollbind
```

### 41.2.2 Updating the diffs

```text
		Editing the files in the diff window should also update the diff colors. If not exectute:
		:diffupdate
```

### 39.2.3 Jump to diffs

```text
Two commands can be used to jump to diffs:
								*[c*
	[c		Jump backwards to the previous start of a change.
			When a count is used, do it that many times.
								*]c*
	]c		Jump forwards to the next start of a change.
			When a count is used, do it that many times.
```

## 39.3 Diff copy

```text
							*:diffg* *:diffget*
:[range]diffg[et] [bufspec]
		Modify the current buffer to undo difference with another
		buffer.  If [bufspec] is given, that buffer is used.
		Otherwise this only works if there is one other buffer in diff
		mode.
		See below for [range].

						*:diffpu* *:diffput* *E793*
:[range]diffpu[t] [bufspec]
		Modify another buffer to undo difference with the current
		buffer.  Just like ":diffget" but the other buffer is modified
		instead of the current one.
		When [bufspec] is omitted and there is more than one other
		buffer in diff mode where 'modifiable' is set this fails.
		See below for [range].

							*do*
do		Same as ":diffget" without argument or range.  The "o" stands
		for "obtain" ("dg" can't be used, it could be the start of
		"dgg"!).

							*dp*
dp		Same as ":diffput" without argument or range.

When no [range] is given, the diff at the cursor position or just above it is
affected.  When [range] is used, Vim tries to only put or get the specified
lines.  When there are deleted lines, this may not always be possible.
```
