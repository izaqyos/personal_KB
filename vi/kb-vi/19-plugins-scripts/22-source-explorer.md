---
type: reference
title: Source explorer
description: "Subsection 19.19 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.19"
---

# 19.19 Source explorer

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
	http://www.vim.org/scripts/script.php?script_id=2179
	a source code explorer for (G)Vim and provides an overview of the function and type definitions.It has such a mechannism that works like the context window component of "Source Insight" software

	If you have used Source Insight for browse your C/C++ project before, you may find that you can browse the definitions as well as the context window of "Source Insight".

For example, you put the cursor on a function name in Normal mode, its definition will show on the Source Explorer window a moment later. And then you can do the 'double-click' operation using your mouse onto the Source Explorer window which had appeared on the bottom of (G)Vim. The definition and its context will be show on the edit window.(Just like Source Insight does). In srcexpl v1.2 and above, the function key which users mapped will play a important role that you can not only use mouse but also use keyboard in order to exploring source code in both GUI and cterm VIM.

The Source Explorer can work with Taglist very well. Both of them make (G)Vim looks like the "Source Insight" in Unix/Windows enviorment.

Features:
|1\ Go insight the definitions of functions and various types of C/C++ language project.
|2\ Double click and click <ENTER> key onto the  Source Explorer Window can edit the definition and context.
|3\ Your own map key (such as <SPACE>) can force to refresh the Source Explorer directly.
|4\ Popup menu and Your own map key (such as <A-,> in Source Insight) to go back from the definition.
|5\ You can explore C/C++/ASM/ souce code only using your mouse but without keyboard.
```

### 19.19.1 Installation

```text
|
|		1\ Add the srcexpl.vim script to the plugin directory of Vimfiles, such as ~/.vim/plugin/
|
|2\ Add the following in your .vimrc or _vimrc
|    " Set the refreshing time interval, such as 2 seconds
|    let g:SrcExpl_RefreshTime   = 2
|    " Initialize the height of the Source Explorer window
|    let g:SrcExpl_WinHeight     = 9
|    " Make your own map key to force to do a refreshing
|    let g:SrcExpl_RefreshMapKey = "<Space>"
|    " Make your own map key for 'SrcExplGoBack' operation
|    let g:SrcExpl_GoBackMapKey  = "<C-b>"
|    " Toggles the Source Explorer on and off
|    nmap <F8> :SrcExplToggle<CR>
|
|3\ Enjoy vimming:)
|
|Tips:
|
|1\ You must make sure that there is a 'tags' file in your project PATH.
|2\ You have to compile your (G)VIM using 'quickfix' option.

"
```
