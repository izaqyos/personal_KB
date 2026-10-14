---
type: reference
title: "Formatting, Aligning and creating lists"
description: "Legacy vim KB section: Formatting, Aligning and creating lists (Formatting 101, basics, turn off automatic line breaking)"
tags: [data-structures, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#27"
---

# Formatting, Aligning and creating lists

[↑ KB_vi](/vi/kb-vi/README.md)

## 27.1 Formatting 101

### 27.1.1 basics

```text
		:[range]ce[nter] [width] - center
		:[range]ri[ght] [width]  - right
		:[range]le[ft] [width]   - left
		gq{motion} - format
		gw{motion} - format same as above but leave cursor at start of formatting instead of end

		for example, gqap will format a paragraph.
			   5jqap will format the current paragraph and also the next four.
			   1gqG will format the whole file.

		The formatting rule is simple, lines can't exceed textwidth size (80 by default).
		Of course, its possible to change that using
		:set textwidth=N

		So, for Turning off splitting lines in vim do: 
		set formatoptions-=tc

		See :help fo-table for more info.

		Wim's suggestion of set textwidth=0 should have the same effect, though a lot of annoying filetype plugins will undo that for you. (Ugh.)
		So check with :set textwidth? and set to 0 if needed
```

### 27.1.2 turn off automatic line breaking

```text
check current setting:
verbose set formatoptions

if tc are listed run:
set formatoptions-=tc
```

## 27.2 The formatter function

```text
		There is a simple formatter for text files. However for other types of files, such as source code
		you can specifically specify a matching formater function.
		for example, for C files do:
		:set formatexpr=c#Formatter()
```

## 27.3 Alignment, aligning text

### 27.3.1 Basics

```text
			:[range] center WIDTH
			range, is the range of line to align and width is the maximum number of characters for each line.

			Its possible to visualize the lines first (shift+V) and then type the command w/o range.

			:[range] left WIDTH
			left align.

			:[range] right WIDTH
			left align.
```

## 27.4 Creating headers

```text
		An example of headers could be placing a line below the header such as:
		Level 1
		=======
		
		Level 2
		--------
		
		-Level 3-
		
		macro for creating the first two headlines is yypVr=o
		yy - yank line
		p - paste line
		V - select line
		r - replace characters with =
		o - add new line below in insert mode

		for the 3rd level :s/\(.*\)/-\1-/

		Its possible to macro those commands as follows:
			:map h1 yypVr=o
			:map h2 yypVr-o
			:map h3 :s/\(.*\)/-\1-/
```

## 27.5 Creating lists

```text
		A simple function to create to arrowed bullets I use in context files:
		-> entry 1
		-> entry 2
		-> entry 3

	Add to .vimrc:
	function! ArrowList()
		let lineno = line(".")
		call setline(lineno, "    -> " . getline(lineno))
	endfunction

	To invoke it on current line use:
	call ArrowList

	Its possible to specify a range, for example to exectute on entire file:
	:1,$call ArrowList

	Or visualize a range and then do :call ArrowList()

	For numbered lists add this function to .vimrc:
function! NumberList() range "range keyword tells VIM that this function only works for a range of lines
	"Set line numbers in front of lines
	let begining=line("'<") "The beginning of a visualized range
	let ending=line("'>")   "The ending of a visualized range
	let difsize = ending -begining +1 "The number of lines in range, also the biggest number in the list
	let pre = ' '
	while (begining <= ending)
		if match(difsize, '^9*$') == 0 "Whenever a number that contains only 9 (9, 99, 999 etc) 
						" is encountered it means that there's one less character
						" in the number so append one space to next numbers 
						" This is done in order to keep the numbers right aligned.

			let pre = pre . ' '
		endif
		call setline(ending, pre . difsize . "\t" . getline(ending))
		let ending = ending-1
		let difsize = difsize-1
	endwhile
endfunction

	Call it by visualizing the line and then :call NumberList()

"
```
