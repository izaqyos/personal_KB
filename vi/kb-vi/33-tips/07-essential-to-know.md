---
type: reference
title: Essential to know
description: "Vim tip: Essential to know"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.7"
---

# 33.7 Essential to know

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	----------------------------------------
	* # g* g#           : find word under cursor (<cword>) (forwards/backwards)
	%                   : match brackets {}[]()
	.                   : repeat last modification 
	@:                  : repeat last : command (then @@)
	matchit.vim         : % now matches tags <tr><td><script> <?php etc
	<C-N><C-P>          : word completion in insert mode
	<C-X><C-L>          : Line complete SUPER USEFUL
	/<C-R><C-W>         : Pull <cword> onto search/command line
	/<C-R><C-A>         : Pull <CWORD> onto search/command line
	:set ignorecase     : you nearly always want this
	:syntax on          : colour syntax in Perl,HTML,PHP etc
	:h regexp<C-D>      : type control-D and get a list all help topics containing
			      regexp (plus use TAB to Step thru list)
```
