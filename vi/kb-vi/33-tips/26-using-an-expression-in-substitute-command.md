---
type: reference
title: Using an expression in substitute command
description: Subsection 33.26 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.26"
---

# 33.26 Using an expression in substitute command

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 755 
Created: June 26, 2004 Complexity: intermediate Author: Raj Kiran Grandhi Minimum version: 5.7 Karma: 66/23 Imported from: Tip#755

You can use an expression as the replacement string in the substitute command (:s). When the replacement string starts with "\=" it is evaluated as an expression. This opens whole new avenue of interesting possiblities. Here are a few examples:

a. Number all the lines in a file:

:%s/^/\=line('.').'^I'/

Note that for ^I you need to press ctrl+I

b. Number a range of lines (from line 10 to line 20):

:10,20s/^/\=line('.').'^I'/

c. Number a range of lines sequentially starting from 1:

:let counter=0|10,20g//let counter=counter+1|s/^/\=counter.'^I'

d. To number all the paragraphs in range starting from 1 (assuming the paragraphs are separated by one or more blank lines):

:let counter=0|1,20g/^$\n^\s*[^\s]/let counter=counter+1|+1s/^/\=counter.'^I'

Note: The above command does not work for the first paragraph in the file if there is no blank line above it.

 References

    * :help sub-replace-special
    * :help sub-replace-expression 

Comments

You can also substitute inside substitute!

:%s/.*/\='cp '.submatch(0).' all/'.substitute(submatch(0),'/','_','g')/

.* is the submatch(0)

The substitute expression will replace any "/" by "_", for example changing line:

sub1/sub2/file1.html

to

cp sub1/sub2/file1.html sub1_sub2_file1.html

See VimTip305 for a few more.

To do incremented columns, check out VimTip150 : incremented, decremented, daynames, dates, etc. 

	33.27 Sorting lines in a file based on the number of words in each line
Here is one use of substitute with an expression (:help sub-replace-expression).

I needed to sort a file according to the number of words in each line. Using the :s command, I inserted the number of words each line contains, at the beginning of the line.

To simplify sorting (using the excellent VisSort, see http://mysite.verizon.net/astronaut/vim/), instead of inserting a number, I put the corresponding character (number plus 64, so a line with one word will start with 'A').

Here is the expression I used:

:%s/^.*/\=nr2char(strlen((substitute(substitute(submatch(0), "\\S\\+", "x", "g"), "\\s","","g")))+64) . "\t" . submatch(0)

Explanation, from the inside out:

Replace all consecutive non space by a single x (each word is now a single x):

part1 = substitute(submatch(0), "\\S\\+", "x", "g")

Remove the spaces between "x":

part2 = substitute(part1,"\\s","","g")

Count the number of "x":

part3 = strlen(part2)

Get the ASCII char representing the number of words + 64:

part4 = nr2char(part3+64)

I replace all lines (^.*) by that ASCII char, followed by a tab and the initial line itself.

I can then sort, then remove all characters between the beginning of lines and the first tab. 
to sort all file
:%!sort

To remove prefix of letter and tab:
%s_^.\t__
```
