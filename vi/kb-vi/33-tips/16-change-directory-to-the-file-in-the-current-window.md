---
type: reference
title: Change directory to the file in the current window.
description: Subsection 33.15 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.15"
---

# 33.15 Change directory to the file in the current window.

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Use :lcd %:p:h to 

The present working directory can be displayed in Vim with:

:pwd

To change to the directory of the currently opened file:

:cd %:h

 References

:help filename-modifiers


 Comments

Here's a mapping to make this easier:

nmap <silent> <Leader>cd :cd %:p:h<CR>

Note the use of :p first expand the % to a full path -- it takes care of the case where you're already in the correct directory. If that happens, %:h expands to an empty string and the :cd command throws an error. %:p:h is safe as it will never send an empty directory into the :cd command.

Note that 'autochdir' can be turned on to automatically switch to the directory of the current buffer upon entering the buffer. Alternatively, try:

nmap <silent> <Leader>sp :sp <c-r>=expand('%:p:h')<CR>/

(The last / can be changed to a backslash if on Windows.) Then, hitting <Leader>sp will produce a command-line all set to allow editing of a file in the same directory as the current buffer.

Also see VimTip64 (Always set your working directory to the file you're editing)

This is very useful. Personally I have these commands defined:

command! CD cd %:p:h
command! LCD lcd %:p:h
```
