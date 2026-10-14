---
type: reference
title: Increasing or decreasing numbers
description: Subsection 33.64 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.64"
---

# 33.64 Increasing or decreasing numbers

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
You can increment or decrement a number by pressing Ctrl-A or Ctrl-X when in Normal mode. The number can be at the cursor, or after the cursor.

The number can be decimal, hexadecimal or octal. You can also increment or decrement a single letter ("a...", "b...", "c..."). This is controlled with the 'nrformats' option.

Ctrl-A is very useful in a macro. As an example, suppose you type the line:

101 This is an item.

In Normal mode, enter the following to record a macro into the a register. This macro yanks the current line, then pastes it below, then increments the number.

qa
Y
p
Ctrl-A
q

Now type 15@a to perform the macro 15 times. You will see:

101 This is an item.
102 This is an item.
103 This is an item.
104 This is an item.
and so on

On Windows, your _vimrc file may source mswin.vim. That script sets Ctrl-A to Select All. If you want to use Ctrl-A in Normal mode to increment a number, you need:

:nunmap <C-A>

Making a list

It's easy to insert a list of ascending numbers, for example:

:0put =range(11,15)

Executing this command (or the equivalent :call append(0,range(11,15))) inserts the following after line 0 (that is, at the start of the buffer):

11
12
13
14
15

Here is a more elaborate example:

:for i in range(1,10) | put ='192.168.0.'.i | endfor

Executing this command inserts the following after the current line:

| 192.168.0.1
| 192.168.0.2
| 192.168.0.3
| 192.168.0.4
| 192.168.0.5
| 192.168.0.6
| 192.168.0.7
| 192.168.0.8
| 192.168.0.9
| 192.168.0.10

References

    * :help CTRL-A
    * :help 'nrformats' 
```
