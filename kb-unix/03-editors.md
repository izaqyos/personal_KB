---
type: reference
title: Editors
description: "Unix editors: emacs key shortcuts and vi highlights."
tags: [emacs, vim, unix, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#2"
---

# Editors

[↑ unix-kb](/kb-unix/README.md)

## 2.1 emacs:

### 2.1.1 Key shortcuts

```text
ctrl-<space>  start mark buffer
alt-W or ctrl+insrt - copy
ctrl-W - cut
ctrl-Y or shift+insrt - paste

atl-/ - text completion
ctrl+tab - rotate working windows.
meta(ctrl+x)+b - open file from buffer list.

		2.1.2.Emacs tips
			a. meta = esc+x
			b. parse code, meta + fontify-lock-fontify-buffer (tab to complete)
			c. activate cpp templates, meta+c++-mode
			d. activate clear case menu, meta + clearcase-menu , clearcase-mode
			e. open file ctrl-x-f
			f. save ctrl-x-s
			g. see line numbers. meta+set-line-number-mode.
```

## 2.2 VI, for more information see KB_vi

### 2.2.1. vi highlights.

#### 2.2.1.1 :set list will show hidden chars.

### 2.2.2. Tip. Resume work with VI buffers.

```text
	do the following.
	in VI :ls
	copy paste buffer list into file, say 'stam'.
	then $cat stam  | awk -F\" '{print $2}' > work_files
	and use alias $resume_edit work_files

	Also to check CC status:
	for line in `cat work_files`; do ct ls $line; done

	To code review using the modified file list.
	$for line in `cat work_files`; do ct diff -gra -pred $line; done
	Use the diff window to review, when it's closed a new one will open.

	To checkin files:
	for line in `cat work_files`; do echo cheking in file $line ; ct ci $line ; done
```

## 2.3 VIM

## 2.4 Latex.

### 2.4.1 To produce a dvi file

```text
			$ latex file.tex
```

### 2.4.2 To produce a PDF

```text
			$ pdflatex file.tex
```

### 2.4.3 To view a dvi file

#### 2.4.3.1 use ghost view

```text
				$ gv file.dvi
```

#### 2.4.3.2 use yap

```text
				$ yap file.dvi
				
				and 4 cygwin, first install miktex, then: $ yap.exe file.dvi 
```
