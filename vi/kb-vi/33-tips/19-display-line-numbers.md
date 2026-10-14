---
type: reference
title: Display line numbers
description: "Vim tip: Display line numbers"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.18"
---

# 33.18 Display line numbers

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	http://vim.wikia.com/wiki/VimTip19
This will display line numbers along the left side of a window:

:set number

You can also define a mapping to toggle the option, for example:

:nmap <C-N><C-N> :set invnumber<CR>

By pressing Ctrl-N twice in normal mode, Vim toggles between showing and hiding line numbers.

If you have Vim version 7 or greater, you can change the width of the "gutter" column used for numbering:

:set numberwidth=3

You can use the number column for the text of wrapped lines:

:set cpoptions+=n

Finally, you can change the color used for the line numbers. For example:

:highlight LineNr term=bold cterm=NONE ctermfg=DarkGrey ctermbg=NONE gui=NONE guifg=DarkGrey guibg=NONE
```
