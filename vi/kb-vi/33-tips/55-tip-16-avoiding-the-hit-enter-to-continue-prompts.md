---
type: reference
title: "Tip 16 Avoiding the \"Hit ENTER to continue\" prompts"
description: Subsection 33.56 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.56"
---

# 33.56 Tip 16 Avoiding the "Hit ENTER to continue" prompts

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	The "Hit ENTER to continue" prompt is displayed when Vim is about to redraw the screen, but there's text on the screen that you might need to read. This happens when something is displayed on the status line that is wider than the window, and after executing an external command.

	To reduce how often you see the "Hit ENTER to continue" prompt, you can shorten the messages, increase the space for displaying messages, or even tell Vim not to worry about external command output.

	To decrease message size, use the 'shortmess' option. Add the following line to your vimrc:

	:set shortmess=a

	This will use abbreviations for status messages to make lines shorter. (There are several other flags for 'shortmess' that can shorten messages even more. :help 'shortmess')

	To give more space for displaying messages, you can increase the height of the command line to 2 or greater:

	:set cmdheight=2

	The default command height is 1. Increasing cmdheight will allow more room for commands, although it will take some space away from editing.

	Finally, you can use :silent to keep external commands from triggering the "Hit ENTER" prompt:

	:silent !echo Hello

	If the command generates any output, you may need to manually refresh the screen once you return to Vim (by typing Ctrl-L or entering :redraw!). (If you're running a GUI version of Vim, :silent may keep you from seeing any output from the command at all!)
	See also

	     Execute external programs asynchronously under Windows for the "Hit any key to close this window..." prompt under Windows 
	    
References

* :help hit-enter
* :help 'shortmess'
* :help 'cmdheight'
* :help :!cmd
* :help :silent 

[edit] Comments

* putting the following setting into your .vimrc settings file works good for eliminating the <Press Enter> message when first bringing up a vim editor to a specific file with a large path.
The 't' option chops the beginning portion of file lines, indicating the truncation with a < sign at the point of truncation.

set shortmess=at
```
