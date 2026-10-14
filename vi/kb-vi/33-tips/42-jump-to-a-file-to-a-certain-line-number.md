---
type: reference
title: Jump to a file to a certain line number
description: Subsection 33.43 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.43"
---

# 33.43 Jump to a file to a certain line number

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 487 created June 16, 2003 · complexity basic · author yijun · version 5.7

Often when editing a file in Vim, you may have a filename/line number pair such as "vim.h:1506" indicating a file you wish to open at the line number listed.

The gF command will do this for you, although ':' is included in 'isfname' under Windows, so you'll need to get rid of it first with set isfname-=:

    * :help gF
    * :help CTRL-W_F (same thing, but split the window for the new file)
    * :help CTRL-W_gF (same thing, but open a new tab for the new file) 

When such file-name/line number pairs are the result of compiling code, the following commands are also useful:

    * :help :cn
    * :help :cl
    * :help :cfile 

so go to line that has say, file.cpp:12 and press gF to go there.
```
