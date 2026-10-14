---
type: reference
title: Save each line in separate numbered files
description: Subsection 33.28 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.28"
---

# 33.28 Save each line in separate numbered files

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 1059 


Create this function

function! SaveLines()
  execute line(".") . "w " . line(".") . ".xml"
endf

And call it

%call SaveLines()

The generated files are:

|1.xml
|2.xml
...

each containing a single line.

No need for a function. You can just use

:g/^/exe ".w ".line(".").".txt"

to get the same sort of effect.

Explanation:

:g/^/ # for very line
exe # Execute the following string as an ex command ie :

.w # . means current line so .w means write current line
line(".") # returns current line number

The string generated (for first line is) is
:g/^/exe ".w 1.txt"
```
