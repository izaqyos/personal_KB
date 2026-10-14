---
type: reference
title: "VimTip 12: Converting tabs to spaces"
description: "Vim tip: VimTip 12: Converting tabs to spaces"
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.3"
---

# 33.3 VimTip 12: Converting tabs to spaces

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.sourceforge.net/tip_view.php?tip_id=


To insert space characters whenever the tab key is pressed, set the
'expandtab' option:

        set expandtab

With this option set, if you want to enter a real tab character use
Ctrl-V<Tab> key sequence.

To control the number of space characters that will be inserted when
the tab key is pressed, set the 'tabstop' option.  For example, to
insert 4 spaces for a tab, use:

        set tabstop=4

After the 'expandtab' option is set, all the new tab characters entered
will be changed to spaces.  This will not affect the existing tab
characters.  To change all the existing tab characters to match the
current tab settings, use

        :retab

To change the number of space characters inserted for indentation, use
the 'shiftwidth' option:

        set shiftwidth=4

For example, to get the following coding style,
        - No tabs in the source file
        - All tab characters are 4 space characters

use the following set of options:

        set tabstop=4
        set shiftwidth=4
        set expandtab

Add the above settings to your .vimrc file.

To get more help on these options, use
:help tabstop
:help shiftwidth
:help expandtab
```
