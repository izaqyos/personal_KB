---
type: reference
title: VimCommander
description: "Subsection 19.18 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.18"
---

# 19.18 VimCommander

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
      total-commander-like file manager for vim
      Toggle (start) it with F11
      noremap <silent> <F11> :cal VimCommanderToggle()<CR> 
```

### 19.18.1 List of Features:

```text
    - Two panels side-by-side;
    - File operations work only on unix;
    - File selection;
    - Remembers settings;
    - Directory history.
```

### 19.18.2 VimCommander Keys

```text
    Most of VimCommander's key-bindings are similar to the other
    commanders':

    - TAB     = Go to the other panel;
    - F3      = View file under cursor;
    - F4      = Edit file under cursor;
    - F5      = Copy file;
    - F6      = Move/rename file;
    - F7      = Create directory;
    - F8/DEL  = Remove file;
    - F10     = Quit VimCommander;
    - C-R     = Refresh panels;
    - C-U     = Exchange panels;
    - C-Left  = Put directory under cursor on other panel, or grab
              = other panel's dir;
    - C-Right = Same;
    - C-H     = Toggle show hidden files;
    - INS     = Select file under cursor;
    - "+"     = Select file by pattern;
    - "-"     = De-select file by pattern;
    - S-F4    = Edit new file;
    - C-t     = Previous directory;
    - C-y     = Next directory.

    C-* stands for CTRL+*. S-* stands for SHIFT+*.
    As some terminals do not support SHIFT/CTRL+non-letter-keys, a <leader>
    version has usually been provided.
    So, <leader>Right and C-Right are the same.
    Same for M-keys, including letters.
```
