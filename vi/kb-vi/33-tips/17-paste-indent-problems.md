---
type: reference
title: Paste Indent Problems
description: "Vim tip: Paste Indent Problems"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.16"
---

# 33.16 Paste Indent Problems

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Trying to cut a paste from shell running VIM to another shell running VIM, indents are all screwed up -- easy solution!

:set paste

Then, when you are done,

:set nopaste

Turns off autoindenting and stuff like that

I made myself a nice mapping for this. Put the following in your .vimrc, and if you paste and the indentation gets fscked just press C-a.

inoremap <silent> <C-a> <ESC>u:set paste<CR>.:set nopaste<CR>gi

see :h paste
```
