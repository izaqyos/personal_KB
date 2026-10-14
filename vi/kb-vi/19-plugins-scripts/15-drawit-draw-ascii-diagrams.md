---
type: reference
title: "DrawIt, Draw ASCII diagrams."
description: "Vim plugin notes: DrawIt, Draw ASCII diagrams. (First steps, Usage, Commands)"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.13"
---

# 19.13 DrawIt, Draw ASCII diagrams.

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
		distributed as a vimball (see :help vimball)
```

### 19.13.1 First steps

```text
                install
			vim DrawIt.vba.gz
			:so %
			:q
```

### 19.13.2 Usage

```text
			\di to start DrawIt and
			\ds to stop  DrawIt. 

			When DrawIt has been started you may use the number pad to leave a trail of dashes, vertical bars, etc.  The lines will be expanded as needed to accomodate your drawing.  DrawIt can also draw boxes and ellipses on a blank-filled area (DrawIt can produce these) which can be useful for drawing boxes around comments.
```

### 19.13.3. Commands

```text
			Supported Features
			   <left>       move and draw left
			   <right>      move and draw right, inserting lines/space as needed
			   <up>         move and draw up, inserting lines/space as needed
			   <down>       move and draw down, inserting lines/space as needed
			   <s-left>     move left
			   <s-right>    move right, inserting lines/space as needed
			   <s-up>       move up, inserting lines/space as needed
			   <s-down>     move down, inserting lines/space as needed
			   <space>      toggle into and out of erase mode
			   >            draw -> arrow
			   <            draw <- arrow
			   ^            draw ^  arrow
			   v            draw v  arrow
			   <pgdn>       replace with a \, move down and right, and insert a \
			   <end>        replace with a /, move down and left,  and insert a /
			   <pgup>       replace with a /, move up   and right, and insert a /
			   <home>       replace with a \, move up   and left,  and insert a \
			   \>           draw fat -> arrow
			   \<           draw fat <- arrow
			   \^           draw fat ^  arrow
			   \v           draw fat v  arrow
			   \a           draw arrow based on corners of visual-block
			   \b           draw box using visual-block selected region
			   \e           draw an ellipse inside visual-block
			   \f           fill a figure with some character
			   \h           create a canvas for \a \b \e \l
			   \l           draw line based on corners of visual block
			   \s           adds spaces to canvas
			   <leftmouse>  select visual block
			<s-leftmouse>  drag and draw with current brush (register)
			   \ra ... \rz  replace text with given brush/register
			   \pa ...      like \ra ... \rz, except that blanks are considered
					to be transparent 
```
