---
type: reference
title: Nice tips
description: Section 36 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#36"
---

# Nice tips

[↑ KB_vi](/vi/kb-vi/README.md)

## 36.1 edit

```text
		36.1.1   Use % to jump from an open brace to its matching closing brace. Or from a "#if" to the matching "#endif". Actually, % can jump to many different matching items. It is very useful to check if () and {} constructs are balanced properly.
		36.1.2 Use [{ to jump back to the "{" at the start of the current code block.
		36.1.3 Use gd to jump from the use of a variable to its local declaration.
```

### 36.1.4 e, ge, move to end of word, end of previous word.:w!

### 36.1.5 H,M,L, move to top, middle, buttom of seen screen.

## 36.2 count number of matches of a pattern

```text
	replace something for itself using "%s/pattern/&/g".
        %s/pattern//gn
        
in region, say lines 100-200
100,200%s/pattern//gn
```

## 36.3 Perform shell action on current buffer (!, %)

```text
	:! action %
	   ! activates non interactive shell
	% represents the current buffer name

	   Note that its possible to break file names of format name.suffix to get prefix name. For example,
	   current buffer xxx.cpp and want to switch to xxx.h (not using Alternate plugin :A) do
		   :e %<.h
```

## 36.4 Pull words into search or command line

```text
		/<C-R><C-W>         : Pull <cword> onto search/command line
		/<C-R><C-A>         : Pull <CWORD> onto search/command line
```

## 36.5 Search in range (block)

```text
You can limit the search command "/" to a certain range of lines by including
\%>l items.  For example, to match the word "limit" below line 199 and above
line 300: >
	/\%>199l\%<300llimit
Also see |/\%>l|.

Another way is to use the ":substitute" command with the 'c' flag.  Example: >
   :.,300s/Pattern//gc
This command will search from the cursor position until line 300 for
"Pattern".  At the match, you will be asked to type a character.  Type 'q' to
stop at this match, type 'n' to find the next match.

	A flavor of this is using visualization to search a certain block. Example, search inside the body of a C++ function.
	go to function, type vi{  (stands for Visualize Inside { } block)
	Then :s/Pattern//gc
	Type q to quit and n to next match

	On the same vein, its possible to search between marks:
	" To search for string between mark a and mark b:
	:'a,'bg/^/s/pattern/&/igc  

	Using visualization its possible to either visualize range and search "normally" and the search will be limited to the visualized section. Its also posisble to search in the previously visualized block using: /\%Vpattern
```

## 36.6 substitute using a register

```text
:s/fred/<c-r>a/g            : sub "fred" with contents of register "a"
:s/fred/<c-r>asome_text<c-r>s/g  
:s/fred/\=@a/g              : better alternative as register not displayed

"
```
