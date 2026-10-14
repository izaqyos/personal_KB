---
type: reference
title: C reference (CRefVim)
description: "Subsection 19.5 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.5"
---

# 19.5 C reference (CRefVim)

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.5.1. Usage

```text
	<Leader>cr normal mode:  get help for word under cursor
	Memory aid cr: (c)-(r)eference
	<Leader>cr visual mode:  get help for visually selected text
	Memory aid cr: (c)-(r)eference
	<Leader>cw:              prompt for word CRefVim should search for
	Memory aid cw: (c)-reference (w)hat
	<Leader>cc:              jump to table of contents of the C-reference manual
	Memory aid cc: (c)-reference (c)ontents
	Note: by default <Leader> is \, e.g. press \cr to invoke C-reference

	Note: The best way to search for an operator (++, --, %, ...) is to visually select it and press <Leader>cr.

	To get help do :help crefvimdoc
	To show the C-reference manual do :help crefvim
```
