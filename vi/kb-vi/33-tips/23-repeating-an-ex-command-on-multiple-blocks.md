---
type: reference
title: Repeating an ex command on multiple blocks
description: "Vim tip: Repeating an ex command on multiple blocks"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.22"
---

# 33.22 Repeating an ex command on multiple blocks

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.wikia.com/wiki/VimTip1118

You can use the g// global command to repeat an Ex command on each block of lines in a file. This technique is useful because you don't need a macro, and the command is retained in history for reuse, possibly after editing.

For example, suppose you want to sort each block of text in a file, and you have a blank line before and after each block (including one before the first block, and one after the last block).

You can sort a single block after the cursor position using the command:

:/^$/;/^$/-1sort

This applies the :sort command to a block of lines defined by a range. The first line in the range is the blank line next after the cursor, and the last line is just before (-1) the blank line after that. You must use ; (not ,). See :help :;.

The following uses the global command to sort each block in the file:

:g/^\s*$/;//-1sort

The pattern /^\s*$/ is used to find blank lines, including those consisting of only whitespace (\s). The second pattern (//) is empty, so the first pattern is repeated (search for next blank line).

For the address part you can use '}. '{ and '} find paragraph boundaries.

It would be nice to have shortcuts for these patterns:

\(\%^\|^\n\)\@<=\(.\)\@= : paragraph start
\(.\)\@<=\(\%$\|\n$\)\@= : pragraph end

In normal mode, you can use "Vip:".

	33.23  Here is how to define and use a calculator, using embedded Python. Calculate, arithmetic.

These two lines go in your vimrc:

:command! -nargs=+ Calc :py print <args>
:py from math import *

Now use it inside Vim:

:Calc 2**10+5,2**16,2**128
|1029 65536 340282366920938463463374607431768211456
:Calc sin(pi/2), log(10)
#1.0 2.302585

Convert hexa to decimal
Calc int('43ed', 16)

You have to have Vim compiled with Python support, and have Python on your machine¿. Use :version to see which features are included in your Vim.

If you don't have Python support in your Vim, but do have a python command, use this instead

command! -nargs=+ Calc :!python -c "from math import *; print <args>"

You also get complex numbers and other goodies. Google for Python and math. Here is an example from complex math:

:py from cmath import *
:Calc exp(pi*1j) , " Euler famous identify e^i.pi = -1"
(-1+1.22460635382e-016j)

:Calc reduce(lambda a,b:a+b,range(1,100+1)), "Gauss' famous identity sum(1,100)"
|5050
```
