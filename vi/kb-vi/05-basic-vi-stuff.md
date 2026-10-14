---
type: reference
title: Basic VI stuff
description: "Legacy vim KB section: Basic VI stuff (repeat last change., buffers, history)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#5"
---

# Basic VI stuff

[↑ KB_vi](/vi/kb-vi/README.md)

## 5.1. repeat last change.

```text
	Using the "." key will repeat last change
```

## 5.2 buffers

```text
	Reload buffer, :e

	File and line number
	:f

	Buffers
	There is a general purpose buffer, and 36 named buffers. Whenever a block of text is deleted (or yanked), it is placed in the general purpose buffer. Prefixing a delete or yank action with an apostrope followed by a letter or number places the text into the buffered with that letter or number as its name. For example, the following command yanks 3 words into buffer m:

	'm3yw

	VI Paradigm
	Vi combines an action with a movement -- the action is performed on all lines or characters between the current cursor position and the destination cursor position. The general syntax is:

	number   verb   target 

	where number defaults to one, verb defaults to move, and target is implied for some verbs.
	The .vimrc file
	Each time vi starts to run, it looks for a file in your home directory called .vimrc. If it finds this file, it will execute the instructions containined within it. Thus, you can place vi commands in this file to set preferences that you want to start with in each of your vi sessions. The following is the contents of a .vimrc file that I use.

	:set ts=3
	:fixdel

	The first line sets tab spacing (ts) to 3. This causes vi to display tabs as 3 spaces rather than the common default 8 spaces. Remember, the contents of the file are not changed; only the manner in which a tab character is displayed is changed.

	The second line allows the DEL key to work as expected on PC keyboards.

	Some other settings that may be useful include the following:

	:set noautoindent
	:set nocindent
	:hi Search NONE

	The last line turns off color highlighting of strings located in searches. (Searches are done with the slash (/) character.
	VIM Commands
	Miscellaneous

	DEL     cancel operation
	ESC     leave insert mode
	^G      display file statistics in bottom line
	.       repeat last change
	:r f    read file f, place after current line
	~     -     switch case of character under cursor
	(in visual-mode: switch case of highlighted text)

	3~    -     switch case of next three characters

	g~~   -     switch case of current line

	U     -     in visual-mode: make highlighted text uppercase

	gUU   -     make current line uppercase

	u     -     in visual-mode: make highlighted text lowercase

	guu   -     make current line lowercase

	gUaw  -     make current word uppercase

	guaw  -     make current word lowercase 

	J       join current line with next

	^Vk     used in insert mode to enter keystroke k
		into the edit buffer 

	Commands inside insert mode

	^U      erase to start of insert line

	Searching

	/abc    search forward for abc
	/^abc   search for occurrances of abc 
		only at the beginning of lines
	/abc$   search for occurrances of abc 
		only at end of lines
	?abc    search backward for abc
	/A\w\+Extension  search for a pattern begins with A, one or more word letters and end with Extension.
	n       go to next occurrance in same direction
	/       same as n, but for foward searching
	N       go to next occurrance in opposite direction
	5G      go to line 5
	G       go to eof

	Substitute

	s/abc/abcd/      substitue abc with abcd
	%s/abc/abcd/g    substitute abc with abcd 
			 globally between 1,$
	s/\.doc/\.txt/   substitue .doc with .txt
			 (you must escape special characters 
			 used for regular expressions, such as ".") 

	File Commands

	:w             write file
	:w filename    write over filename
	:wq            write and quite
	ZZ             same as :wq
	:q!            quit without writing

	Delete (always places text in general buffer)

	dw     del word (from current pos to end of word)
	db     del backwards (del previous word)
	d4w    del 4 words
	dd     del current line
	3dd    del 3 lines
	'b3dd  del 3 lines into buffer b
	d^     del from current pos to beginning of line
	d$     del from current pos to end of line
	x      del char
	3x     del 3 chars
	cc     del line and enter insert mode
	dL     del lines from current pos to end of file
	d3L    del lines from current pos to 3rd line from bottom
	dG	delete until end of file
	dgg	delete until start of file

	Copy (Yank)

	y     same as d, but copies rahter than cuts

	Paste (Note: paste is from general buffer unless otherwise specified)

	p     paste after current pos
	P     paste before current pos 
	3p    paste 3 copies
	'kp   paste from buffer k
	'k3p  paste 3 copies from buffer k

	Insert

	i  enter insert mode before cursor
	a  enter insert mode after cursor
	A  enter insert mode after end of current line
	3i inserted text is replicated 3 times
	o  create new line below current line, 
	   and enter insert mode
	O  create new line above current line, 
	   and enter insert mode

	Navigate

	:5   go to line 5
	5G   go to line 5
	G    go to last line in document
	L    go to last line in screen
	5L   go to line 5 from bottom of screen
	h    left 1 char
	3h   left 3 chars
	j    down
	k    up
	l    right
	^    beginning of line
	$    end of line
	%    press % over an openning or closing bracket or 
	     parenthesis in order to jump to its closing or 
	     openning partner
	^D   scroll down one screen
	^U   scroll up one screen
	^F   go forward, like ^D, but overlap a few lines
	^B   go backward, like ^U, but overlap a few lines
	``   return to previous pos in file
	+    go to first non-white space of next line
	-    go to first non-white space of previous line
	w    beginning of next word
	e    end of word (if at end, then end of next word)
	b    back (go to beginning of previous word)

	Replace

	r  c  replace current char with c
	3r c  replace current char with 3 c's

	Undo

	u   undo previous change
	ctrl+R redo
	3u  undo last 3 changes
	U   undo changes made to current line
	:e! undo all changes since last save

	Indenting

	>>            indent line one shift width
	3>>           indent 3 lines one shift width
	:set sw=4     set shift width to 4
	:syntax off   turn off syntax recognition (and coloring)
	:syntax on    turn on syntax recognition
	:color <color scheme name> change color scheme.

	Settings

	:set ai        set autoindent
	:set noai      unset autoindent
	:set nu        show line numbers

	Customization
	Place a list of vi commands -- such as the following -- into a file called .vimrc in your home directory. These commands will be run by vi when it starts.

	:fixdel
	:set ts=3
	:set noautoindent
	:set nocindent
	:hi Search NONE
	:filetype indent off
	:filetype off
```

## 5.4 history

```text
		:hist prints command history
		: arrow up and down traverse history

		@: execute last command

		p: paste last command
```
