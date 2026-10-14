---
type: reference
title: Shell and filter commands
description: "Legacy vim KB section: Shell and filter commands (Use filter commands to process text)"
tags: [shell, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#15"
---

# Shell and filter commands

[↑ KB_vi](/vi/kb-vi/README.md)

```text
List directory	:! ls
See processes	:! ps
Sort lines 20 to 30	:20,30 ! sort
Visualize a section the sort it with :!sort
Grep a section the sort it with :!grep something

Sort entire file	!G sort
or			:1,$!sort
or			:%!sort
Grep entire file	!G grep something

Translate next sentence to upper case	!) tr '[a-z]' '[A-Z]'
Word count file (save first)	:!wc %
				  Look up manual entry for strstr	:!man strstr
				  Insert "ls" command output into window	:r !ls
```

## 15.1 Use filter commands to process text

```text
http://vim.wikia.com/wiki/VimTip374
Created: November 24, 2002 Complexity: basic Author: zzapper

Here are some examples of Vim's filtering commands, showing how to get text into or out of a file.

Redirection to clipboard register + (or use any other register a-z):

:redir @+
:history
:g/fred/
  " any other commands
:redir END

Redirection to a file:

:redir >> out.txt
:registers
  " any other commands
:redir END

Store glob results in register a (must use A to append):

" Append all lines containing 'fred' to register a.
:g/fred/y A
" Append to a file (must use >>).
:'a,'b g/^Error/ . w >> errors.txt

Get output from external commands:

:r!ls     " read in output of ls (run 'ls' on Unix)
:0r!ls    " insert at start of buffer
:-r!ls    " insert before current line
:r!dir    " use 'dir' on Windows

Filter current file using an external command (these examples use sort, but note that Vim has a built-in :help :sort command which should be used to sort lines):

:%!sort -u      " use an external program to sort all lines
:'a,'b!sort -u  " same, for lines from mark a to mark b inclusive

The term "filter" means to replace lines with the result from running a program. The original lines are sent as stdin to the program, and are replaced with stdout from the program. You can also filter using motion commands or visual selection:

!}sort          " sort from cursor to end of paragraph
3!}sort         " same, 3 paragraphs
3!!sort         " sort 3 lines
V               " start visual selection of lines
(move cursor)   " select some lines
!sort           " sort the visually selected lines


Following is a Python program to sort the words on each line of standard input (each line is separately sorted).

# File sortwords.py
from sys import stdin
for line in stdin:
    print ' '.join(sorted(line.split()))

A file you are editing in Vim may include the following text:

this is a line with some words
words on each line will be sorted
fried banana and cream

Use this procedure to filter the text:

    * Press V on the first line, then jj to select three lines.
    * Type !python sortwords.py and press Enter. 

The lines are replaced with the result from running the program:

a is line some this with words
be each line on sorted will words
and banana cream fried


    * :help filter
    * :help :! 
```
