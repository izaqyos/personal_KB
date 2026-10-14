---
type: reference
title: Copy or change search hit
description: Subsection 33.60 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.60"
---

# 33.60 Copy or change search hit

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	Tip 1597 

	While searching, you may want to operate on the text found by a search. Typically, you want to copy a search hit, or change it (delete the hit, and enter insert mode so you can type in new text). Often one of the standard commands can be used (for example, if you searched for a complete word, the command cw may be sufficient to change it).

	A more general approach comes from the fact that //e can be used to repeat the last search (because no new search pattern was entered), with the e search offset to move the cursor to the end of the search hit. :help search-offset

	For example, after searching, you may want to change the hit. Without implementing this tip, you could type c//e and press Enter. Then enter the replacement text and press Escape.

*1 A search text object
*2 Explanation
*3 Limitations
*4 See also
*5 References
*6 Comments
```

### 33.60.1 A search text object

```text
With this tip, after searching you can:

* Type ys to copy the search hit.
* Type "+ys to copy the hit to the clipboard.
* Type cs to change the hit.
* Type gUs to convert the hit to uppercase.
* Type vs to visually select the hit. If you type another s you will extend the selection to the end of the next hit. 

For example, search for 'File' and change it to 'Data' (cs = change search):
		    
/File
csData<Esc>
" Sample to search: GetFileDir GetFileId GetFilePos MyFile BackupFile

Then press n to find the next occurrence and press . to repeat the change.

Put the following in your vimrc:

" Make a simple "search" text object.
vnoremap <silent> s //e<C-r>=&selection=='exclusive'?'+1':''<CR><CR>
\:<C-u>call histdel('search',-1)<Bar>let @/=histget('search',-1)<CR>gv
omap s :normal vs<CR>
```

### 33.60.2 Explanation

```text
This tip implements a simple search text object identified as "s". When in visual mode, s is mapped to find the end of the last search pattern (//e). When in operator-pending mode (for example, after pressing y in normal mode), s is mapped to normal-mode vs which starts visual mode (assuming v has not been mapped) and invokes the s visual-mode mapping.

The <C-r>= evaluates the following expression which tests the 'selection' option. If exclusive selection is used, the result is '+1', otherwise the result is an empty string. Accordingly, the visual-mode map becomes //e+1 or //e. :help search-offset

The visual-mode mapping continues with :<C-u> to enter the command line while removing the visual range automatically inserted by Vim. The histdel function removes the last (-1) item from the search history ('//e+1' or '//e'). The let statement assigns the previous search item to @/ (the search register) so pressing n or N will search for the next or previous instance.

In :help todo we see a plan for a future version of Vim:

Add text object for current search pattern: "a/" and "i/". Makes it possible to turn text highlighted for 'hlsearch' into a Visual area. 

This tip prefers the simple "s" for a search hit, with no attempt to implement "a" and "i" text objects. Instead, "s" selects from the current position to the end of the next search hit.

The default for visual mode in Vim is that you can press c or s to change a selected area. Using the mapping suggested in this tip, you would no longer be able to press s to change a visual area (use c instead).
```

### 33.60.3 Limitations

```text
The tip can be helpful to reduce distractions while editing because you can always press ys to yank the hit, or cs to change it (you don't have to think about an alternative method). However, the tip has several limitations:

Pressing . to repeat a change will change the same number of characters that were previously changed (so you can only repeat a change when the search hit is a fixed length).
 The text object fails when the search hit is a single character, and when search wraps around the end of the buffer.
 Suppose you use :set selection=exclusive and search for 'abc'. If you find 'abc' at the end of a line, operations such as ys or cs will include the line break. 
```

### 33.60.4 See also

```text
 Copy the search results into clipboard 
```

### 33.60.5 References

```text
 :help text-objects
 :help :map-modes 
```
