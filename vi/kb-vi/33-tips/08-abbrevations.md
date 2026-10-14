---
type: reference
title: Abbrevations
description: "Vim tip: Abbrevations"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.7"
---

# 33.7 Abbrevations

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
VimTip 43: Using abbreviations
http://vim.sourceforge.net/tip_view.php?tip_id=
To define abbreviations, use the ab[breviate] command.
Examples:
:ab rtfm read the fine manual  -  Whenever you type 'rtfm' followed by a <space> (or <esc> or <cr>) vim
                                  will expand this to 'read the fine manual'.
:ab                            -  list all defined abbreviations
:una[bbreviate] rtfm           -  remove 'rtfm' from the list of abbreviations
:abc[lear]                     -  remove all abbreviations
NB: To avoid expansion in insert mode, type CTRL-V after the last character of the abbreviation. 
For a detailed description of the ab[breviate] command and some more examples refer to
:help abbreviations
```
