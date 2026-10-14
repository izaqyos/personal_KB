---
type: reference
title: Open file under cursor
description: Subsection 33.32 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.32"
---

# 33.32 Open file under cursor

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
The following commands open the file name under the cursor:

    * gf    open in the same window ("goto file")
    * <c-w>f    open in a new window
    * <c-w>gf    open in a new tab 

When writing a program, it is helpful to set the 'path' option to list the directories with your include files. Then you can easily open an include file.

If there are several files in your 'path' that match the name under the cursor, gf opens the first, while 2gf opens the second, and 3gf opens the third, etc.

You can return to the previous buffer using Ctrl-^ or Ctrl-o.
 References

    * :help gf
    * :help CTRL-W_F
    * :help CTRL-W_gf
    * :help CTRL-^
    * :help CTRL-O
    * :help 'path' directory names used to look for the file 

 Comments

You could list files in 'path' that match the name under under the cursor with:

:echo globpath(&path, expand('<cfile>'))

The plugin searchInRuntime overrides gf and CTRL-W_f to ask which file must be opened if several match. Alternatives for :sp and :vsp are also provided. 
```
