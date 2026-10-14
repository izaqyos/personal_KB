---
type: reference
title: "CCtree C Call-Tree Explorer - Source-code analysis, real-time display of code flow"
description: "Subsection 19.22 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.22"
---

# 19.22 CCtree C Call-Tree Explorer - Source-code analysis, real-time display of code flow

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
http://www.vim.org/scripts/script.php?script_id=2368
```

### 19.22.1 Install

```text
Install details
Installation:
Copy this file to ~/.vim/plugins/
or to /vimfiles/plugins/  (on Win32 platforms)

It might also be possible to load it as a filetype plugin
~/.vim/ftplugin/c/

Need to set :filetype plugin on 
```

### 19.22.2 Help

```text
http://sites.google.com/site/vimcctree/help

CCTree generates call-trees for any function or macro in real-time inside Vim.
Requires Cscope and operation is currently limited to C code.
```

### 19.22.3 Options

```text
You can customize behavior by changing the following variable settings
```

#### 19.22.3.1. Cscope Symbol Database~

```text
                                                *CCTreeCscopeDb*

Cscope database file, g:CCTreeCscopeDb = "cscope.out"
```

#### 19.22.3.2. Call-tree Depth~

```text
                                                *CCTreeRecursiveDepth* 
Maximum call levels,   g:CCTreeRecursiveDepth = 3
```

#### 19.22.3.3. Call-tree Minimum Visible Depth~

```text
                                                *CCTreeMinVisibleDepth*
Maximum visible(unfolded) level, g:CCTreeMinVisibleDepth = 3
```

#### 19.22.3.4. Call-tree window display~

#### 19.22.3.4.1 Orientation~

```text
                                                *CCTreeOrientation*
Orientation of window,  g:CCTreeOrientation = "leftabove"
 (standard vim options for split: [right|left][above|below])
```

#### 19.22.3.5 Direction~

```text
                                                *CCTreeWindowVertical* 
Use Vertical window, g:CCTreeWindowVertical = 1
```

#### 19.22.3.5.1 Dimensions~

```text
These settings determine the layout of the CCTree preview window.
```

#### 19.22.3.5.2 Horizontal Window Settings~

```text
                                                *CCTreeWindowHeight* 
 Horizontal window, g:CCTreeWindowHeight, default is -1.
```

#### 19.22.3.5.2 Vertical Window Settings~

```text
                                                *CCTreeWindowMinWidth* 
                                                *CCTreeWindowWidth* 
 Minimum width for window, g:CCTreeWindowMinWidth = 40.
 g:CCTreeWindowWidth = -1, auto-select best width to fit.
```

#### 19.22.3.6 Call-tree display format~

```text
                                                *CCTreeDisplayMode*
Display format, g:CCTreeDisplayMode, default: 1

Values: 1 -- Ultra-compact (takes minimum screen width)
        2 -- Compact       (Takes little more space)
        3 -- Wide          (Takes copious amounts of space)

For vertical splits, 1 and 2 are good, while 3 is good for horizontal
displays.
```

#### 19.22.3.7. Dynamic Call-tree highlighting~

```text
                                                *CCTreeHilightCallTree*

Enable/disable dynamic call-tree highlighting, default: 1
```

#### 19.22.3.7.1 Syntax items~

```text
                                               *CCTreeSymbol* *CCTreeHiSymbol*
CCTreeSymbol is the symbol name.
CCTreeHiSymbol is the highlighted call tree functions.

                                               *CCTreeMarkers* *CCTreeHiMarkers*
CCTreeMarkers include  "|","+--->".
CCTreeHiMarkers is the same as CCTreeMarkers except these denote the
highlighted call-tree.
```

### 19.22.4 Usage

#### 19.22.4.1. Symbol database~

```text
Build cscope database, for example:
run my cscope generating alias gen_scope
( find . \( -name "*.[chCH]" -o -name "*.cpp" -o -name "*.hpp" \) > my_cscope.files; cscope -ibkq my_cscope.files -b)
mv my_cscope.files cscope.files
> cscope -b -i cscope.files
 [Tip: add -c option to build uncompressed databases for faster
    load speeds]

Load database with command ":CCTreeLoadDB"
(Please note that it might take a while depending on the
       	138 database size)

A database name, i.e., my_cscope.out, can be specified with the command. If
not provided, a prompt will ask for the filename; default is cscope.out.

To unload database, use command ":CCTreeUnLoadDB"
```

#### 19.22.4.2. Exploring source-code~

```text
Get reverse call tree for symbol  <C-\><
:CCTreeTraceReverse <symbolname>    
That is ctrl and \ and <

Get forward call tree for symbol  <C-\>>
:CCTreeTraceForward <symbolname>

Increase depth of tree and update <C-\>=
:CCTreeRecurseDepthPlus    

Decrease depth of tree and update <C-\>-
:CCTreeRecurseDepthMinus    

Open symbol in other window       <CR>
Preview symbol in other window    <Ctrl-P>
```

#### 19.22.4.4. Syntax Coloring~

```text
CCTreeHiXXXX allows dynamic highlighting of the call-tree.  To observe the
effect, move the cursor to the function to highlight the current call-tree.
This option can be turned off using the setting, *CCTreeHilightCallTree* .

For faster highlighting, the value of 'updatetime' can be changed.
```
