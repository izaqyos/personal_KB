---
type: reference
title: Uniq - Removing duplicate lines
description: "Vim tip: Uniq - Removing duplicate lines"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.45"
---

# 33.45 Uniq - Removing duplicate lines

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 648 author Michael Geddes 

The following command will sort all lines and remove duplicates (keeping unique lines):

:sort u

If you need more control, here are some alternatives.

There are two versions, the first leaves only the last line, the second leaves only the first line.

g/^\(.*\)$\n\1$/d
g/\%(^\1$\n\)\@<=\(.*\)$/d

Breakdown of the second version:

g//d <-- Delete the lines matching the regexp
\@<= <-- If the bit following matches, make sure the bit preceding this symbol directly precedes the match
\(.*\)$ <-- Match the line into subst register 1
\%( ) <--- Group without placing in a subst register.
^\1$\n <--- Match subst register 1 followed by end of line and the new line between the 2 lines

In this simple format (matching the whole line), it's not going to make much difference, but it will start to matter if you want to do stuff like match the first word only.

This does a uniq on the first word in the line, and deletes all but the first line:

g/\%(^\1\>.*$\n\)\@<=\(\k\+\).*$/d

 See also

    * Unique sorting script to 'sort unique' a List (not text lines)
    * system_utils.vim command to remove duplicate lines in a range (uses g//d method)
    * Sort lines how to sort lines 

 Comments

Here are some more Vim-native ways for removing duplicate lines. This time they don't have to be adjacent. Line order is preserved.

This one can be a bit slow.

:nno \d1 :g/^/m0<CR>:g/^\(.*\)\n\_.*\%(^\1$\)/d<CR>:g/^/m0<CR>

This is faster. Uses mark l.

:nno \d2 :g/^/kl\|if search('^'.escape(getline('.'),'\.*[]^$/').'$','bW')\|'ld<CR>

Following uses a substitute to delete all repeated lines (leaving only the first line, while deleting following duplicate lines). This is a variation on the g//d method.

%s/^\(.*\)\(\n\1\)\+$/\1/
```
