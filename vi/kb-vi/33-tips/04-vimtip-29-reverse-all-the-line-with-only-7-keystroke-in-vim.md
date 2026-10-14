---
type: reference
title: "VimTip 29: reverse all the line with only 7 keystroke in vim"
description: "Vim tip: VimTip 29: reverse all the line with only 7 keystroke in vim"
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.4"
---

# 33.4 VimTip 29: reverse all the line with only 7 keystroke in vim

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.sourceforge.net/tip_view.php?tip_id=

:g/^/m0
well, 
a. : bring you to command-line mode(also known as ex-mode) from normal-mode(also known as command mode).
b. g means you'll take an action through the whole file, generally perform a search, `v' also perform a search but it match the line not match the canonical expression.
c. / begins the regular express
d. ^ is a special character respect the start of a line.
e. the second / ends the regular express and indicate that the remains is action to do.
f. m means move, `t` and `co' for copy, `d' for delete
g. 0 is the destination line.

you can use 
:g/regexp/t$
to filter all lines and pick the match line together and copy them to the end of the buffer or
:g/regexp/y A
to put them into a register(not eax, ebx...)
```
