---
type: reference
title: Send output of g search to a new window
description: Subsection 33.29 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.29"
---

# 33.29 Send output of g search to a new window

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1063 

Suppose you are using g/pattern/ to display all lines containing some pattern in your file. When you are satisfied with the regex you are using for the pattern, you can press F3 to output the g/pattern/ results to a new window.

To achieve this, you need the following map (place in your vimrc):

nmap <F3> :redir @a<CR>:g//<CR>:redir END<CR>:new<CR>:put! a<CR><CR>

Explanation:

:redir @a         redirect output to register a
:g//              repeat last global command
:redir END        end redirection
:new              create new window
:put! a           paste register a into new window


Send output of last g// to a named file (and open):

:nmap <F4> :redir! >/aaa/xz<CR>:g//<CR>:redir END<CR>:new /aaa/xz<CR><CR>

To not get line numbers printed if line numbers are turned on:

" before g//, store line number state and turn off line numbers; after g//, restore the previous state
:nmap <F3> :let @b=&number<CR>:set nonumber<CR>:redir @a<CR>:g//<CR>:redir END<CR>:let &number=@b<CR>:new<CR>:put! a<CR><CR>
```
