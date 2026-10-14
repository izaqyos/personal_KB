---
type: reference
title: Working with VIM Tabs. Tab pages
description: "Legacy vim KB section: Working with VIM Tabs. Tab pages (Basics, open tabs, close tabs)"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#57"
---

# Working with VIM Tabs. Tab pages

[↑ KB_vi](/vi/kb-vi/README.md)

## 57.1 Basics

```text
:h tabs 
```

### 57.1.1 open tabs

```text
vim -p fred.php joe.php             : open files in tabs
:tabe fred.php                      : open fred.php in a new tab
:tab ball                           : tab open files
" vim 7 forcing use of tabs from .vimrc
:nnoremap gf <C-W>gf
:cab      e  tabe
:tabdo %s/foo/bar/		    : replace over multiple tabs

CTRL-W gf	Open a new tab page and edit the file name under the cursor.
		See |CTRL-W_gf|.

CTRL-W gF	Open a new tab page and edit the file name under the cursor
		and jump to the line number following the file name.
		See |CTRL-W_gF|.
```

### 57.1.2 close tabs

```text
:tabc		:close tab page
:tabo		:close all other tab pages
```

### 57.1.3 navigating tabs

```text
:tabn		:go to next tab can accept count. First tab is 1. tabn1 will go to first tab
gt
{count}gt

:tabp[revious] {count}
:tabN[ext] {count}
{count}<C-PageUp>
{count}gT	Go {count} tab pages back.  Wraps around from the first one
		to the last one.

:tabr[ewind]			*:tabfir* *:tabfirst* *:tabr* *:tabrewind*
:tabfir[st]	Go to the first tab page.

							*:tabl* *:tablast*
:tabl[ast]	Go to the last tab page.

:tabs		List the tab pages and the windows they contain.
		Shows a ">" for the current window.
		Shows a "+" for modified buffers.

	    57.1.4
```

## 57.2 Tabs configuration

```text
map <leader>tn :tabnew %<cr>
map <leader>te :tabedit
map <leader>tc :tabclose<cr>
map <leader>tm :tabmove
try
  set switchbuf=usetab
  set stal=2
catch
endtry
```

## 57.3 Reordering tab pages

```text
:tabm[ove] [N]						*:tabm* *:tabmove*
		Move the current tab page to after tab page N.  Use zero to
		make the current tab page the first one.  Without N the tab
		page is made the last one.
```

## 57.4 LOOPING OVER TAB PAGES:

```text
							*:tabd* *:tabdo*
:tabd[o] {cmd}	Execute {cmd} in each tab page.
		It works like doing this: >
			:tabfirst
			:{cmd}
			:tabnext
			:{cmd}
			etc.
<		This only operates in the current window of each tab page.
		When an error is detected on one tab page, further tab pages
		will not be visited.
		The last tab page (or where an error occurred) becomes the
		current tab page.
		{cmd} can contain '|' to concatenate several commands.
		{cmd} must not open or close tab pages or reorder them.
		{not in Vi} {not available when compiled without the
		|+listcmds| feature}
		Also see |:windo|, |:argdo| and |:bufdo|.


		"
```
