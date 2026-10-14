---
type: reference
title: Word frequency statistics for a file
description: "Vim tip: Word frequency statistics for a file"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.14"
---

# 33.14 Word frequency statistics for a file

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
From Vim Tips Wiki
Jump to: navigation, search

Proposed new tip

Please do not discuss this tip on this page, and do not edit the talk (discussion) page.
All discussion should take place on the proposed new tips page, where we will decide whether to keep this as a new tip, or whether to merge it into an existing tip.

Created: November 13, 2007 Complexity: basic Author: vale.smth Version: 7.0

To generate a table of the occurrence frequency for every word in a file, just enter these commands.

:%s/\_A\+/\t1\r/g
:sort i
:g/\c\(.\+\)\n\1$/norm $yiwj@"^Akdd

In the above, ^A represents CTRL-A, and should be input directly (press CTRL-V then CTRL-A). On Windows, you would probably need to press CTRL-Q then CTRL-A, and you would probably first have to issue the command :unmap <C-A>.

Note that the above changes the file, so you would want to be working on a copy of your text, or you will need to undo the changes.

An amazing tip, but someone should briefly explain how it works.

The 1st command makes every word per line, and appends "1" at the end of each line.

The 2nd command sort lines.

The 3nd command find every pair of lines that are same, adds the number of the 1st line to the 2nd line's, then deletes the 1st line. 
```
