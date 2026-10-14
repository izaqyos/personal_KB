---
type: reference
title: Compare with EMACS commands.
description: Section 35 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#35"
---

# Compare with EMACS commands.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
		Equivalence of VIM and Emacs commands

		Descriptions for VIM commands are quite straightforward, there is not many choice, you have just to type the command. This is not as simple in Emacs, because there is so much possibilities. Here is presented the Emacs commands and their standard key bindings when there are some. But many (like myself) alter the default keybindings to type faster and according to what they do with Emacs.

		This heading includes contributions from David Richfield. Thanks David !
		Conventions

		    * NA
		      Not Applicable, the equivalence doesn't exist.
		    * -
		      I personnaly don't know if there is an equivalence.

		Commands
		Help
		Action	Emacs command	VIM command
		General 	apropos 	:help
		:help <word> then hit CTRL-D to see matching help entries for word
		About commands 	apropos-command : f1 a 	:help <command>
		Describe function 	describe-function : f1 f 	NA
		Describe variable 	describe-variable : f1 v 	:help options
		Describe key briefly 	describe-key-briefly : f1 c 	NA
		Tutorial 	help-with-tutorial : C-h t 	NA
		Open/Close/Save
		Action	Emacs command	VIM command
		Open a file 	find-file : C-x C-f 	:e file-name
		Reload a file from disk 	revert-buffer 	:e
		Close a buffer, a frame 	kill-buffer : C-x k 	:q
		Close all files 	C-x C-c 	:qall
		List all buffers, frame 	C-x C-b 	:files
		Change to next frame 	switch-to-buffer : C-x b 	C-w C-w
		Change to next buffer 	switch-to-buffer : C-x b 	:e#<n>
		Save a buffer, a frame 	save-current-buffer : C-x C-s 	:w
		Save all buffers, frame 	save-some-buffer : C-x s 	:wall or :wa
		Save all files and exit		:xa

		In Emacs, it is better to load all the files in different buffers, but in the same instance of Emacs, if only to load the file faster. Thus, open as many files as you want and then switch from one buffer to another.
		Navigation / Search
		Action	Emacs command	VIM command
		Go to the beginning of a buffer 	beginning-of-buffer : M-< 	1G or gg
		Go to the end of a buffer 	end-of-buffer : M-> 	G
		Search forward 	C-s 	/<string>
		Repeat last search forward 	C-s C-s 	n or /
		Search backward 	C-r 	?<string>
		Repeat last search backward 	C-r C-r 	N or ?
		Find the next brace, bracket, etc. 	Click on the brace, bracket, etc. 	%
		Edition
		Action	Emacs command	VIM command
		Transpose letters 	C-t 	xp
		Transpose words 	M-t 	Go to start of first word, then dwwP. Except at the end of the line, then go to the space in between the words, and type 2dwbhP
		downcase word 	M-l 	With cursor at beginning of word: veu
		Downcase region 	C-x C-l 	Mark region, press u.
		Upcase word 	M-u 	With cursor at beginning of word: veU
		Upcase region 	C-x C-u 	Mark region, press U.
		Syntax highlighting 	M-x toggle-global-lazy-font-lock-mode 	:syntax enable and then :set syntax=>syntax name<
		Region indentation 	M-x indent-according-to-mode 	== (current line)
		<n>== (n, the number of lines)
		=G (till end of file)
		Inserting comments 	indent-for-comment : M-; 	-
		Cut & Paste
		Action	Emacs command	VIM command
		Copy a region, a selection 	copy-region-as-kill 	<n>yy to "yank" or copy n lines, or mark region in visual mode, then press y
		Set mark 	C-Space 	m{a-zA-Z}
		Copy 	M-w 	See above
		Mark the buffer 	C-x h 	ggVG
		String substitution

		To come, work in progress.

		:%s/stringToReplace/newString/gc
		:%s#stringToReplace#newString#gc
		:%s#/home/guest/tmp/comp#/usr/local/#gc
		Undo / Redo
		Action	Emacs command	VIM command
		Undo 	C-_ 	u
		Redo 	Space C-_ 	C-r
		Repeat a command 	M-x z 	.
		Repeat a complex command 	repeat-complex-command : C-x M-: 	.

		More about the undo/redo in Emacs : All the actions are piled up, even the "undo" action. Thus to perform a "redo", one has to undo an "undo". One way to do that is after an "undo" to write a character, like "space", and then perform an "undo".

		Check this out too about macros.
		Spelling check
		Action	Emacs command	VIM command
		Check spelling of a region/file 	ispell-region / ispell-buffer 	

		:w! (hit ENTER):!ispell % (hit ENTER):e! % (hit ENTER)

		Or a bit more complex and powerful, use some macros :
		map <F5> :w!<CR>:!ispell -d francais %<CR>:e! %<CR>
		map <F6> :w!<CR>:!ispell -d american %<CR>:e! %<CR>
		Check spelling of a word 	ispell-word 	NA
```
