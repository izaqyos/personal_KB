---
type: reference
title: Folds. Folding
description: Section 48 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#48"
---

# Folds. Folding

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	48.1 folds are useful for providing readable and easy navigable view of the file.
	decides the criteria for creating folds.
foldmethod can be set to
manual manually created
indent based on indentation. Useful for python or other indented codes
marker based on foldmarker
Folding Commands
zf create fold
zo/zO open fold
zc/zC close fold
zM close all folds
zR open all folds
	:set foldmethod=manual/indent/marker
	:set foldmarker=, or <,>
	see :help Folding
```

## 48.2 Manual

```text
	Try  :set foldmethod=manual
	Then in a paragrap print zfap this will fold the paragrapgh.
	use zo to open the fold and zc to close.

	zf{motion}, try zfG to fold from current line to EOF or zf0 to start of file.
	{Visual}zf fold the visually selected text.
	zf{number} fold number lines. zf10 will fold the next 10 lines.
	:{range}fo fold the range :.,+10fo will do the same

	To save the folds do :mkview , to restore them do :loadview
	To save a specific fold :mkview n , to restore it :loadview n
```

## 48.3 syntax

### 48.3.1 CPP, C++

```text
		To enable folds do
		: set foldmethod=syntax
		To fold all file
		:%fc

		or
		zM

		To unfold all file
		:%foldo

		or 
		zR
```

### 48.3.2 Use folds in your program

```text
Tip 108 (old #1093) created December 30, 2005 · author brailsmt 


		Instead of keeping zc and zo in your head, just use za to toggle a fold open or closed.

		If you open a file or change a fold method, and everything in your file is folded, use zR to "reveal" all of it by opening all folds.

		Try setting foldmethod=syntax. Many syntax files define folding based on the language syntax, although you may need to enable it by setting syntax file options. If a specific syntax file doesn't define folding, you can define your own or see below.

		Map [{V%zf (or even zfa{ which is easier) to some key sequence (I use <Leader><Leader>) to fold the current code block (in languages which use {,} as block delimiters).

			Use folds liberally. If you fold every function, when you open the file, you will be presented with a quick reference of what functions are defined in the file.

				Don't nest too many folds, it grows to be a pain if you use more than two levels of nested folds.

				If you think you need more than two levels of folds, you probably need to refactor your code. 
```
