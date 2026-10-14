---
type: reference
title: Edit PDF docs with VIM
description: "Vim tip: Edit PDF docs with VIM"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.2"
---

# 33.2 Edit PDF docs with VIM

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
		Get the free Xpdf from (http://www.foolabs.com/xpdf/download.html).  For Win32 specifically, you can get the zip file and just extract pstopedf.exe.

		Now add the following to your .vimrc:

		autocmd BufReadPre *.pdf set ro
		autocmd BufReadPost *.pdf %!pdftotext -nopgbrk "%" -

		And that's it!  And just like for MS-Word files, this allows you to use VIM to diff two pdf files very nicely.
		To Diff to pdf files: vim -d doc.pdf doc2.pdf
```
