---
type: reference
title: The super star
description: "Vim tip: The super star (Using the mouse, More searching, Highlight matches without moving)"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.31"
---

# 33.31 The super star

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Created: February 24, 2001 Complexity: basic Author: Scott+Yegappan

In normal mode, move the cursor to any word. How do you search for the next occurrence of that word?

Press the * key to search forwards for the current word, or press # to search backwards.

Using * or # searches for the exact word at the cursor (searching for rain would not find rainbow).

Use g* or g# if you don't want to search for the exact word.
```

### 33.31.1 Using the mouse

```text
With the proper settings, you can search for an exact word using the mouse.

Shift-LeftClick a word to search forwards, or Shift-RightClick to search backwards.

This needs a GUI version of Vim (gvim), or a console Vim that accepts a mouse. You may need the following line in your vimrc to enable mouse searches:

:set mousemodel=extend

In gvim, click the Edit menu, then Global Settings, then the "tear off" bar at the top. That will show a floating Global Settings menu with useful Toggle Pattern Highlight and Toggle Ignore-case commands.
```

### 33.31.2 More searching

```text
After searching, press n for the next match, or N to search in the reverse direction.

Vim maintains a search history. Type / or ? and use the arrow up/down keys to recall previous search patterns. You can edit a pattern, and press Enter to search for something different.

Suppose the cursor is on a word, and you want to search for a similar word.

Press / then <C-r><C-w> to copy the current word to the command line. You can now edit the search pattern and press Enter. Use <C-r><C-w> for a <cword>, or <C-r><C-a> for a <cWORD>.

<C-r><C-w> is Control-R then Control-W (hold down Ctrl and press r then w).

After searching, use <C-o> to jump back to your previous position (then <C-i> will jump forwards).

After searching, an empty search pattern will repeat the last search. This works with /, :s and :g.

So, after searching for a word, use :%s//new/g to change all occurrences to 'new', or :g/ to list all lines containing the word. See Substitute last search.

You can enter a count before a search. For example 3/pattern will search for the third occurrence of pattern, and 3* will search for the third occurrence of the current word.
```

### 33.31.3 Highlight matches without moving

```text
It can be useful to highlight the word under the cursor like *, but without jumping to the next match. Then you can see the search highlights on the current screen, without any scrolling. Move to the first (ggn), last (GN), next (n) or previous (N) match as usual.

The basic command is (type Ctrl-r then Ctrl-w to insert the current word):

:let @/="<C-r><C-w>"<CR>

The following map uses F10 to highlight all occurrences of the current word, and F11 to unhighlight (put in your vimrc):

nnoremap <F10> :set hls<CR>:let @/="<C-r><C-w>"<CR>
nnoremap <F11> :nohls<CR>

Here is another version that uses F10 to toggle search highlighting (F11 is not used).

nnoremap <F10> :set invhls<CR>:let @/="<C-r><C-w>"<CR>/<BS>

The 'inv' prefix on a boolean setting toggles it. The trailing /<BS> clears the command line.

Position the cursor on an interesting word, then press F10 to highlight all occurrences of that word. Use commands like n and N to search up and down. When you're done, press F10 again to toggle highlighting off.
```

### 33.31.4 Show the next match while entering a search

```text
To move the cursor to the matched string, while typing the search pattern, set the following option in your vimrc:

:set incsearch
```

### 33.31.5 While searching complete current matching word

```text
(Add letters, chars to current search while searching) 

Complete the search by pressing Enter, or cancel the search by pressing Escape. When typing the search pattern, press Ctrl-L (:help c_CTRL-L) to insert the next character from the match or press Ctrl-R Ctrl-W (:help c_CTRL-R_CTRL-F) to complete the current matching word.
```
