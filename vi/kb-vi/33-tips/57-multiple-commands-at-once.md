---
type: reference
title: Multiple commands at once
description: Subsection 33.58 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.58"
---

# 33.58 Multiple commands at once

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	Tip 767 author pim · version 6.0

	You can execute more then one command by placing a | between two commands.

	For example:

	%s/htm/html/c | %s/JPEG/jpg/c | %s/GIF/gif/c
	
	This example substitutes for htm, then moves on to JPEG, then GIF.
	
	The second command (and subsequent commands) are only executed if the prior command succeeds.
	
	This works for most commands, but some commands like :argdo or :autocmd see the '|' as one of their arguments. This allows commands such as :argdo, which execute a different Vim command, to execute a series of commands. See :help :\bar for the full list of such commands.
	
	For example:
	
	argdo %s/foo/bar/gc | w
	
	Normally, Vim will complain if you haven't saved changes to a buffer before abandoning it, but by adding | w in the above example, you can actually write out each buffer after processing. Note that this command will, for each item in the arg list, do a :substitute and a :write. If :argdo didn't take '|' as an argument, it would instead run the :substitute on each item, then write the last item.  
	If you want to make a command chain including one of the commands listed at :help :\bar, you can still do so using the :execute command. For example, in order to chain a :normal command, you would need to do something like this:
	
	:execute 'normal "ayiw' | echo @a
	
	edit References
	
	    * :help :\bar
	        * :help :execute 
```
