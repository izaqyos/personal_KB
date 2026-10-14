---
type: reference
title: Paste registers in search or colon commands instead of using the clipboard
description: "Vim tip: Paste registers in search or colon commands instead of using the clipboard"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.33"
---

# 33.33 Paste registers in search or colon commands instead of using the clipboard

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Created: June 20, 2003 Complexity: intermediate Author: rainbrot 

You can type Ctrl-R to insert a register when in insert mode, or when typing in the command or search line. When you press Ctrl-R you will see " (quote) to prompt you to finish the command by entering a register. For example, press Ctrl-R then a to insert the contents of the a register, or Ctrl-R then " to insert the contents of the unnamed register.

You can press v then move the cursor to visually select some text (say the text is "hello world"). If you press y the selected text is yanked (copied) into the unnamed register. You can now type :%s/ then <C-r>" (Ctrl-R quote), which would show the following in the command line:

:%s/hello world

You could complete the substitute command, to read, for example:

:%s/hello world/goodbye everyone/gc

Type <C-r><C-w> to paste the word under the cursor into the command line, or <C-r><C-a> to paste the WORD. 

"
```
