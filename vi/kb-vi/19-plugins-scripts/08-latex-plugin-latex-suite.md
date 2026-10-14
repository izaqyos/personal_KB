---
type: reference
title: Latex plugin (latex suite).
description: "Vim plugin notes: Latex plugin (latex suite). (Help.)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.6"
---

# 19.6 Latex plugin (latex suite).

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		19.6.1.
			Installation.
			extract tarball to .vim 

			Add to .vimrc
			" REQUIRED. This makes vim invoke latex-suite when you open a tex file.
			filetype plugin on

			" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
			" can be called correctly.
			set shellslash

			" IMPORTANT: grep will sometimes skip displaying the file name if you
			" search in a singe file. This will confuse latex-suite. Set your grep
			" program to alway generate a file-name.
			set grepprg=grep\ -nH\ $*

			" OPTIONAL: This enables automatic indentation as you type.
			filetype indent on

			To install the included latex-suit.txt and latexhelp.txt files as vim help files, start vim and do the following:

			helptags ~/.vim/doc    

			"
```

### 19.6.2. Help.

```text
			:help latex-suite.txt
```
