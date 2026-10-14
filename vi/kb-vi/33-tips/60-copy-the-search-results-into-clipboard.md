---
type: reference
title: Copy the search results into clipboard
description: Subsection 33.61 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.61"
---

# 33.61 Copy the search results into clipboard

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 478 

Several methods allow you to capture all search hits. Usually, you want to copy each line which contains text matching your search pattern, but you can also copy just the matching text. We'll start with methods to easily list search hits, without copying them.
Contents

    * 1 Search within a file
    * 2 Copying lines containing search hits
    * 3 Copying only the matching text
    * 4 See also
    * 5 Comments

[edit] Search within a file

To search, press / then type what you want to find, or press * to search for the current word.

To list all lines matching your search pattern, use the following. The first command lists lines matching your last search. The second lists lines matching pattern.

:g/
:g/pattern

To view a window of search results, see Find in files within Vim. You can use % for the file path to search only the current file, for example:

" Save file, search it for 'pattern', and open a clickable list.
:w
:vimgrep /pattern/ %
:copen

To view only the parts of a file that match your pattern, see Folding with Regular Expression. You can fold away non-matching lines, and use zr to reveal more context around the search hits.
[edit] Copying lines containing search hits

You can copy matching lines to the clipboard, so they can be pasted into another application.

To copy all lines containing a search pattern, use the following (see Power of g). The first command clears register a (:help q). The second appends all matching lines to that register (:help quotea). The third copies register a to the clipboard (register +) for easy pasting into another application. Replace pattern with what you want to search for.

qaq
:g/pattern/y A
:let @+ = @a

The above procedure captures only the first line of each match. If your pattern matches more than one line, use the following.

" Use /pattern to search for something, then
"   :call CopyMatchingLines()
" to copy all lines containing hits (whole lines).
" The pattern may extend over multiple lines.
" The 'normal! $' attempts to avoid copying the same line more than once.
" FIX: For some patterns, it could miss a second hit?
function! CopyMatchingLines()
  let posinit = getpos(".")
  call cursor(1, 1)
  let cnt = 0
  let hits = []
  let snum = search(@/, 'cW')
  while snum > 0
    let enum = search(@/, 'ceW')
    call extend(hits, getline(snum, enum))
    let cnt += 1
    normal! $
    let snum = search(@/, 'W')
  endwhile
  if cnt > 0
    let @+ = join(hits, "\n") . "\n"
  endif
  call cursor(posinit[1], posinit[2])
  echomsg cnt 'lines (or blocks) were appended to the clipboard.'
endfunction

[edit] Copying only the matching text

A search pattern may use a regular expression. For example, the following finds all words that begin with 'a':

/\<a\w*\>

The following procedures allow you to copy just the text which matches a pattern. Source the CopyMatches command and function, then perform the search above. To copy all matching text to the clipboard, enter the following. The first command clears the clipboard. The second appends matching text to the clipboard (since no pattern is given, the last search is used). The second command is equivalent to :%CopyMatches.

0"+y0
:g//CopyMatches

You can also use the command to copy all matches from a range of lines, and into a register other than the clipboard:

:1,10CopyMatches a

" Copy matches of the last search to a register (default is the clipboard).
" Accepts a range (default is the current line).
" Matches are appended to the register and each match is terminated by \n.
" Usage: [RANGE]CopyMatches [REGISTER]
command! -nargs=0 -range -register CopyMatches call s:CopyMatches(<line1>, <line2>, "<reg>")
function! s:CopyMatches(line1, line2, reg)
  let reg = a:reg != '' ? a:reg : '+'
  for line in range(a:line1, a:line2)
    let txt = getline(line)
    let idx = match(txt, @/)
    while idx > -1
      exec "let @".reg." .= matchstr(txt, @/, idx) . \"\n\""
      let end = matchend(txt, @/, idx)
      let idx = match(txt, @/, end)
    endwhile
  endfor
endfunction

The following alternative is to copy matches which extend over more than one line.

" Use 0"+y0 to clear the clipboard, then
"    :g/pattern/call CopyMultiMatches()
" to copy all multiline hits (just the matching text).
" This is for when the match extends over multiple lines.
" Only the first match from each line is found.
" BUG: When searching for "^function.*\_s*let" the '.*' stops at the end
" of a line, but it greedily skips "\n" in the following (we copy too much).
function! CopyMultiMatches()
  let text = join(getline(".", "$"), "\n") . "\n"
  let @+ .= matchstr(text, @/) . "\n"
endfunction

[edit] See also

    * Redirect g search output to redirect g// output to a new window or a file
    * Filter buffer on a search result to create a scratch buffer with matching lines
    * Find in files within Vim for a clickable list of search hits
    * Folding with Regular Expression to fold away non-matching lines 

"


id=__vim_wo_cream__
```
