---
type: reference
title: Mini Buffer Explorer (minibufexpl.vim)
description: "Vim plugin notes: Mini Buffer Explorer (minibufexpl.vim)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.4"
---

# 19.4 Mini Buffer Explorer (minibufexpl.vim)

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		To install: Copy minibufexpl.vim into your plugin directory. Or :source minibufexpl.vim. That is all you need to get started. 

		Usage:
		You can quickly switch buffers by double-clicking the appropriate "tab" (if you don't want to use the mouse just put the cursor on the "tab" and press enter). As you open and close buffers the tabs get updated. Buffers that are modified get visually marked and buffers that are open in a window get visually marked. The -MiniBufferExplorer- opens automatically when you open more than one eligible buffer (no need to open the explorer if youre only editing one file.) -MiniBufExplorer- doesn't bother showing non-modifiable or hidden buffers. You can delete buffers by selecting them and pressing d on the keyboard.

		When you are in the -MiniBufExplorer- window, Tab and Shift-Tab move forward and backward respectively through the buffer list.

		There are a growing number of optional features in this script that are enabled by letting variables in your .vimrc:

		  control + the vim direction keys [hjkl] can be made to move you between windows.
		    control + arrow keys can be made to do the same thing
		      control + tab & shift + control + tab can be setup to switch through your open windows (like in MS Windows)
		        control + tab & shift + control + tab can alternatively be setup to cycle forwards and backwards through your modifiable buffers in the current window 

 <Leader>mbe - Opens MiniBufExplorer
 <Leader> is usually backslash so type "\mbe" 

 Other keymappings include: <Leader>mbc to close the Explorer
 "               window,  <Leader>mbu to force the Explorer to Update and
 "               <Leader>mbt to toggle the Explorer window; it will open if
 "               closed or close if open. Each of these key bindings can be
 "               overridden (see the notes on <Leader>mbe above.)
 " 
```
