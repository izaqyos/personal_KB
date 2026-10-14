---
type: reference
title: Copy an Entire Buffer to the Clipboard
description: Subsection 33.17 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.17"
---

# 33.17 Copy an Entire Buffer to the Clipboard

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.wikia.com/wiki/%22copy_all_to_clipboard%22_howto

Vim can access two different clipboard registers: * (primary selection) and + (clipboard). On Windows, either one can be used.

There are a number of ways of copying the entire contents of a file to the clipboard. These include:

Normal Mode

gg"*yG
gg"+yG

:set go+=a
ggVG
ggVGy

:set cb+=unnamed
ggyG

Ex Mode

:%y+

:set cb+=unnamed
:%y

Visual Mode (linewise)

ggoG"+y

:set go+=a
ggoG

Visual Mode (characterwise or blockwise)

VggoG"+y

:set go+=a
VggoG


Windows Specific (with Windows key bindings in effect)

ggVG<c-ins>
<C-A><C-C>

Macintosh Specific

<Cmd-A><Cmd-C>

References

    * :help :yank
    * :help registers
    * :help "+
    * :help 'guioptions'
    * :help 'clipboard'
```
