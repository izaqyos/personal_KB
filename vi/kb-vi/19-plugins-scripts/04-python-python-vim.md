---
type: reference
title: Python (python.vim)
description: "Subsection 19.3 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.3"
---

# 19.3. Python (python.vim)

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		To install add this line to .vimrc:
		au FileType python source path/python.vim 

		Most common commands:
		"   [[      -- Jump to beginning of block
		"   ]]      -- Jump to end of block
		"   ]v      -- Select (Visual Line Mode) block
		"   ]<      -- Shift block to left
		"   ]>      -- Shift block to right
		"   ]c      -- Select current/previous class
		"   ]f      -- Select current/previous function
		"   ]<up>   -- Jump to previous line with the same/lower indentation
		"   ]<down> -- Jump to next line with the same/lower indentation
```
