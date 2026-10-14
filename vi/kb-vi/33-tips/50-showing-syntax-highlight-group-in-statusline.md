---
type: reference
title: Showing syntax highlight group in statusline
description: Subsection 33.51 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.51"
---

# 33.51 Showing syntax highlight group in statusline

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1573 created June 22, 2008 · complexity basic · author Dominiko · version 7.0

You can show the syntax highlight group where the cursor is located in your statusbar. This is especially useful when tweaking a color theme.

First define a function which returns the highlight group syntax under the cursor:

function! SyntaxItem()
  return synIDattr(synID(line("."),col("."),1),"name")
endfunction

Then insert into your statusline a call to function SyntaxItem:

set statusline+=%{SyntaxItem()}

Here is a complete example showing the syntax highlight group among other things:

if has('statusline')
  set statusline=%#Question#                   " set highlighting
  set statusline+=%-2.2n\                      " buffer number
  set statusline+=%#WarningMsg#                " set highlighting
  set statusline+=%f\                          " file name
  set statusline+=%#Question#                  " set highlighting
  set statusline+=%h%m%r%w\                    " flags
  set statusline+=%{strlen(&ft)?&ft:'none'},   " file type
  set statusline+=%{(&fenc==\"\"?&enc:&fenc)}, " encoding
  set statusline+=%{((exists(\"+bomb\")\ &&\ &bomb)?\"B,\":\"\")} " BOM
  set statusline+=%{&fileformat},              " file format
  set statusline+=%{&spelllang},               " language of spelling checker
  set statusline+=%{SyntaxItem()}              " syntax highlight group under cursor
  set statusline+=%=                           " ident to the right
  set statusline+=0x%-8B\                      " character code under cursor
  set statusline+=%-7.(%l,%c%V%)\ %<%P         " cursor position/offset
endif

See also

    * Identify the syntax highlighting group used at the cursor 

References

    * :help 'statusline'
    * :help synIDattr 
```
