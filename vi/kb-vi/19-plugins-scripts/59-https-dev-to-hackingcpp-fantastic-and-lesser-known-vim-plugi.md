---
type: reference
title: "https://dev.to/hackingcpp/fantastic-and-lesser-known-vim-plugins-in-2022-12e6"
description: "Subsection 19.56 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.56"
---

# 19.56 https://dev.to/hackingcpp/fantastic-and-lesser-known-vim-plugins-in-2022-12e6

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.56.1 https://github.com/bounceme/poppy.vim

```text
Highlights different levels of matching delimiters (parentheses, braces, …) in different colors.
```

### 19.56.2 Cursorword

```text
Underlines all occurrences of the word under the cursor. Super fast and useful for spotting variable occurrences or spelling errors in code and redundancy in prose.
https://github.com/itchyny/vim-cursorword
```

### 19.56.3 multiple cursors

```text
https://github.com/mg979/vim-visual-multi#readme
crazy useful

Basic usage:

select words with Ctrl-N (like Ctrl-d in Sublime Text/VS Code)
create cursors vertically with Ctrl-Down/Ctrl-Up
select one character at a time with Shift-Arrows
press n/N to get next/previous occurrence
press [/] to select next/previous cursor
press q to skip current and get next occurrence
press Q to remove current cursor/selection
start insert mode with i,a,I,A

Two main modes:

in cursor mode commands work as they would in normal mode
in extend mode commands work as they would in visual mode
press Tab to switch between «cursor» and «extend» mode

tutorial: vim -Nu path/to/visual-multi/tutorialrc
$ vim -Nu vim-visual-multi/tutorialrc 


Select words ~
------------------------------------------------------------------------------------

Quit VM, undo changes, move below and set a new mark, then |z<cr>|.

    let g:VM_moLET_mappings = 1
    Let g:VM_theme = 'iceblue'
    lEt g:VM_highlight_matches = 'underline'

    Let g:VM_maps = {}
    let g:VM_maps["Undo"]      = 'u'
    let g:VM_maps["Redo"]      = '<C-r>'

Now press <C-n>: this is the default mapping to select words under the cursor. If
your search settings are set to 'smartcase', you'll see that all following 'let'
words are underlined, and will be selected if you keep pressing <C-n>.

Quit VM and move to the second line.

Press <C-n>: if smartcase is active, only one other match will be underlined.
Press `\\c`: this allows you to cycle the case setting of the current pattern. Press
it until it becomes case insensitive.
Press `q`: the current match will be skipped. Alternate <C-n> and `q`.

Some commands ~
------------------------------------------------------------------------------------

Set a new mark here below and let's try some other commands.

    let g:VM_mouse_mappings = 1               " some text
    let g:VM_theme = 'iceblue'                " some text
    let g:VM_highlight_matches = 'underline'  " some text

    let g:VM_maps = {}                        " some text
    let g:VM_maps["Undo"]       = 'u'         " some text
    let g:VM_maps["Redo"]       = '<C-r>'     " some text


Alignment ~

Press `v2ap`, then `\\c`: from visual mode you created a column of cursors.
Press `f=`: all cursors will move to the `=` character.
Press `\\a`: all cursors will be aligned.
```

### 19.56.4 neodebug

```text
https://github.com/cpiger/NeoDebug
Debug with gdb/pdb/lldb in VIM. Shows current instruction and breakpoints in code; windows for debugger console, locals, registers, stacks, threads, breakpoints, disassembly, watch expressions. Similar to, but more user friendly and feature-rich than VIM's termdebug package. I found that it just works without any setup hassle.
```

### 19.56.5 Cycle

```text
https://github.com/zef/vim-cycle
Augments VIM’s built-in increment/decrement feature (<C-a>/<C-x>) so that you can also toggle between pairs of words or cycle through lists of related words like true/false, yes/no, weekdays, months, etc. You can also add your own word lists.
```

### 19.56.6 CamelCaseMotion

```text
https://github.com/bkad/CamelCaseMotion
Motions based on sub-words in CamelCase, snake_case, dash-case, etc.
```

### 19.56.7 undotree

```text
awesome plugin for undotree
Start it:
:UndotreeToggle

git https://github.com/mbbill/undotree
install ~/.vim/pack/plugins/start:]2028$ git clone https://github.com/mbbill/undotree.git 
```
