---
type: reference
title: "Swapping characters, words and lines"
description: Subsection 33.36 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.36"
---

# 33.36 Swapping characters, words and lines

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

### 33.36.1 Normal-Mode Commands

```text
Swap the current character (the character under the cursor) with the next: xp

Swap the current line with the next: ddp

Swap the current word with the next (see note): 
dawwP
dawelp

Swap the current word with the previous (see note): dawbP

Note: These approaches to swap words don't work around punctuation and will do the wrong thing. For this reason, it is recommended that you use some mappings (see below) that will more intelligently move words around.
```

### 33.36.2 Normal-Mode Mappings

```text
To use gc to swap the current character with the next, without changing the cursor position:

:nnoremap <silent> gc xph

To use gw to swap the current word with the next, without changing cursor position: (See note.)

:nnoremap <silent> gw "_yiw:s/\(\%#\w\+\)\(\W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>
" This version will work across newlines:
:nnoremap <silent> gw "_yiw:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>

To use gl to swap the current word with the previous, keeping cursor on current word: (This feels like "pushing" the word to the left.) (See note.)

:nnoremap <silent> gl "_yiw?\w\+\_W\+\%#<CR>:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>

To use gr to swap the current word with the next, keeping cursor on current word: (This feels like "pushing" the word to the right.) (See note.)

:nnoremap <silent> gr "_yiw:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o>/\w\+\_W\+<CR><c-l>

To use g{ to swap the current paragraph with the next:

:nnoremap g{ {dap}p{

Note: Mappings above which perform a search-and-replace (ones containing :s/) will operate incorrectly on words with accented characters. To adjust the mappings above to work with your locale, replace all \w with [alphabet] and \W with [^alphabet], where alphabet is the set of characters in your alphabet. :help /\w 

"
```

### 33.36.3 Other Solutions

#### 33.36.3.1 Visual-Mode swapping

```text
To use this mapping: first, delete some text (using any normal Vim command, such as daw, dt, in normal mode, x in visual mode). Then, use visual mode to select some other text, and press CTRL-X. The two pieces of text should then be swapped.

:vnoremap <C-X> <Esc>`.``gvP``P
```

#### 33.36.3.2 Scripts

```text
Chip Campbell has written a Visual Mode Based Swapping script similar to the above, available at http://mysite.verizon.net/astronaut/vim/index.html#VISSWAP
```
