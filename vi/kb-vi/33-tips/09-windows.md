---
type: reference
title: Windows
description: "Vim tip: Windows (Tip: #886 - Add Vim to Windows Send To menu)"
tags: [windows, vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.8"
---

# 33.8 Windows

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

### 33.8.1 Tip: #886 - Add Vim to Windows Send To menu

```text
Easily open any file(s) in Vim with any options you like by adding a shortcut to Vim to your SendTo directory, located at "C:\Documents and Settings\<YOUR USER NAME>\SendTo". This will add vim.exe (or gvim.exe) to the "Send To" context menu.

You can specify any options you like with this shortcut by editing the "target" field under the shortcut properties. For example:

    * You can add a "diff in Vim" shortuct with "C:\Program Files\Vim\vim71\gvim.exe" -d
    * You can make Vim launch the selected files in tabs 

If you do not like using the "Send To" context menu, you can automatically launch files in Vim with file associations (even unknown file types or files with no extension).
```
