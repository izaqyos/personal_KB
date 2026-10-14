---
type: reference
title: Edit word docs with VIM
description: Subsection 33.1 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.1"
---

# 33.1 Edit word docs with VIM

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
		antiword (http://www.winfield.demon.nl/) is written by Adri van Os
		windows version can be found at:
		(http://www.informatik.uni-frankfurt.de/~markus/antiword/)

		download and install it (and put it in your path)

		antiword takes a ms-word filename from the command line and spits it out in text/plain. it does not take input from stdin

		all you gotta do to get vim to view ms-word files is to add lines to your .vimrc similar to:

		autocmd BufReadPre *.doc set ro
		autocmd BufReadPre *.doc set hlsearch!
		autocmd BufReadPost *.doc %!antiword "%"

		now, when you're curious you can do: vim resume.doc to view a text version of your ms-word document (hitting <enter> on .doc file in your .vimprojects list works too)

		but that's not too fun on it's own.

		one thing ms-word can't do (properly), is do a diff on two versions.
		however, if you're on a windows system, in explorer, try -> selecting resume-1.1.doc and resume-1.2.doc -> right click -> "Diff with Vim"

		you could probably also do: vim -d resume-1.1.doc resume-1.2.doc
		to achieve the same effect
```
