---
type: reference
title: Using the Windows clipboard in Cygwin Vim
description: Subsection 33.50 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.50"
---

# 33.50 Using the Windows clipboard in Cygwin Vim

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1623 created April 10, 2009 · complexity basic · author Ir0nh34d · version 7.0

Using Vim under Cygwin, it is difficult to access the Windows clipboard:

    * Typing "+y does not yank (copy) to the Windows clipboard.
    * Typing "+p does not paste from the Windows clipboard. 

As a result, you cannot easily use the clipboard to copy text between Cygwin Vim and a native Windows application. This tip shows some workarounds.

Contents

    * 1 Copy to Windows clipboard
    * 2 Paste from Windows clipboard
    * 3 See also
```

### 33.50.1 Copy to Windows clipboard

```text
Using this function:

function! Putclip(type, ...) range
  let sel_save = &selection
  let &selection = "inclusive"
  let reg_save = @@
  if a:type == 'n'
    silent exe a:firstline . "," . a:lastline . "y"
  elseif a:type == 'c'
    silent exe a:1 . "," . a:2 . "y"
  else
    silent exe "normal! `<" . a:type . "`>y"
  endif
  call system('putclip', @@)
  let &selection = sel_save
  let @@ = reg_save
endfunction

And simple mappings, such as:

vnoremap <silent> <leader>y :call Putclip(visualmode(), 1)<CR>
nnoremap <silent> <leader>y :call Putclip('n', 1)<CR>

You can visually select some text then yank it to the Windows clipboard, or use the normal yank options (for example, 3\y to yank 3 lines based from the current line, assuming the default backslash leader key).

To allow for usage from the command line, add a command to execute Putclip with a range:

com! -nargs=0 -range=% Putclip call Putclip('c', <line1>, <line2>)
```

### 33.50.2 Paste from Windows clipboard

```text
Using this function:

function! Getclip()
  let reg_save = @@
  let @@ = system('getclip')
  setlocal paste
  exe 'normal p'
  setlocal nopaste
  let @@ = reg_save
endfunction

And a simple mapping, such as:

nnoremap <silent> <leader>p :call Getclip()<CR>

You can use the normal paste options (for example, \p to paste the clipboard contents, assuming the default backslash leader key).
```

### 33.50.3 See also

```text
    * fakeclip plugin allowing use of "*p, "*yy and more on Cygwin 
```
