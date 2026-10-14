---
type: reference
title: Developer commands.
description: Section 12 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#12"
---

# Developer commands.

[↑ KB_vi](/vi/kb-vi/README.md)

## 12.1 Go to definition of word under cursor gd

```text
Go to global definition		gD
```

## 12.2 Find matching bracket, brace, #if, #endif %

## 12.3 Do a grep :grep foo *.c

```text
After grep, go to next occurrence	:cn

	12.4 Get a file (eg. an #include file) whose name is under cursor	gf
```

## 12.5 Auto complete (in insert mode) - match forwards Ctrl+X Ctrl+N

```text
Auto complete (in insert mode) - match previous		Ctrl+X Ctrl+P
```

### 12.5.1 Select an item in vim autocomplete list without inserting line break

```text
Is there a way to select an item out of the autocomplete list without getting an additional unwanted newline?
---------------------------------------------------------------------------------------------------- 
It depends on which popup menu state you are in (see :help popupmenu-completion). I understand from your question that you're in state 2 (since you've pressed arrow keys to find a completion). However, the default behavior for Enter in state 2 is to insert the completion without newline; what you describe is normally the behavior of state 1 (which is when you use Ctrl+N/Ctrl+P.)

A way that works consistently in all states is to use Ctrl+Y. I like to remember the Y as standing for "yes, accept that word." It's also possible to just start typing the text that should come after the completed word, unless you've remapped things as in geedoubleya's answer.

In the same context, you can press Ctrl+E to cancel the menu and leave your text as it was before you invoked it. If you're used to the pairings of Ctrl+E and Ctrl+Y in other contexts (e.g. to scroll up or down in normal mode, or to insert the character below or above the cursor in insert mode), that's one way to remember it here. I guess you could also think of it as "exiting" the menu or similar.

---------------------------------------------------------------------------------------------------- 
As an alternative to using your arrow keys, enable your j & k keys to scroll through the autocomplete list.

Doing this changes the current line to match the selected word as you scroll.

Therefore you do not have to press enter as the cursor is still in insert mode at the end of the substituted word.

To enable this add this to your .vimrc (Thanks to others at stackoverflow):

inoremap <expr> j ((pumvisible())?("\<C-n>"):("j"))
inoremap <expr> k ((pumvisible())?("\<C-p>"):("k"))
Separately, instead of using the arrow keys, you could just repeat the Ctrl-n which will curse through the options (Ctrl-p to go backwards) and substitute on the current line as it moves, no need for Enter or vim key mappings.

		12.5.2


	12.6
Make an abbreviation (eg. cca = "const char *")		:ab cca const char *
Turn syntax coloring on	:syntax on
Turn syntax coloring off	:syntax off
Execute any shell command	:! command
indent selected lines with C-style indenting	=
```
