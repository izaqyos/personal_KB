---
type: reference
title: Search for lines not containing pattern and other helpful searches
description: "Vim tip: Search for lines not containing pattern and other helpful searches"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.66"
---

# 33.66 Search for lines not containing pattern and other helpful searches

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 802 created October 5, 2004  complexity intermediate  author Eric Boucher  version 6.0

It can be useful to specify in a search or a substitution what you do not want to have. Here is how to do that:

/^\(\(The_Regular_Expression\)\@!.\)*$

This will find everything but the regular expression you have specified. For example, if we want to find all the lines not containing the word 'foo', simply do:

/^\(\(.*foo.*\)\@!.\)*$

If we want to find a more complex regular expression on multiple lines, like all the lines which do not begin with 'foo' with 'bar' somewhere else and the word 'magic' at the end of the next line, do:

/^\(\(^foo.*bar.*\n.*magic$\)\@!.\)*$

Another thing useful in searches and substitutions is to omit some information. For example, suppose we want to find every 'foo' with 'bar' somewhere else on the line, but we do not want to take the 'bar' part in the search (let's say not highlight it if the hlsearch is set), we can do:

/foo\(.*bar\)\@=
/foo.*\(bar\)\@=
/foo.\{-}\(bar\)\@=

The first one will highlight only 'foo' in lines containing both 'foo' and 'bar'. The second one will highlight 'foo' and everything up to the longest match where 'bar' appears on the line. The third one, will do the same thing, but with the shortest match (non-greedy). So, if there is more than one 'bar' on the same line, the search will stop right before the first occurrence of 'bar'.

We can also do the opposite. Let's say for example finding all the 'foo' with 'bar' some place else without highlighting the 'foo', we can do:

/\(foo.*\)\@<=bar
/\(foo\)\@<=.*bar
/\(foo\)\@<=.\{-}bar

The first one will highlight only 'bar' in lines containing both 'foo' and 'bar'. The second one will highlight everything right after 'foo' up to the last 'bar' on the line. The third one will highlight everything right after 'foo' and up to the first 'bar' (non-greedy).

There is also a way to specify that a part of the regular expression should not be there. As an example, if we want to search for all the lines where there is no word 'foo' preceding the word 'bar', we can do:

/\(foo.*\)\@<!bar

Or, on the other hand, find all the word 'foo' where there is no 'bar' following, we can do:

/foo\(.*bar\)\@!

Now, let's see another kind of search. Imagine we want to find every 'bar' where there is no 'foo' before it. TODO Fix missing text

There is a way with Vim to specify where the beginning of the search pattern should start. As an example, suppose we want to find the lines beginning with 'foo', with the word 'bar' somewhere else and then 'magic', but that we only want to highlight 'magic' and everything up to the end to the line. We can use 'zs' for that like this:

/^foo.*bar.*\zsmagic.*

We can also do the opposite, specify where the search should end. For example, if we want to highlight every 'foo' with 'bar' with 'magic', but not highlight 'magic', we can do:

/foo.*bar.*\zemagic
/foo.*bar.\{-}\zemagic

The last example was non-greedy, that is, matches up to the first occurrence of 'magic' in a line.

Other interesting searches are the beginning of a file. For example to find the first word of a file, we can do (this one needs the +syntax feature when compiled):

/\%^\_.\{-}\<.\{-}\>

Or the first occurrence of a word in a file:

/\%^\_.\{-}\zsVIM

We can also search for something at the end of a file. For example, the last occurrence of 'VIM' in a file (this one is tricky):

/VIM\ze\(\(VIM\)\@!\_.\)*\%$

It finds the word 'VIM' where there is no word 'VIM' after it until the end of the file!
edit References

    * :help /\@=
    * :help /\@!
    * :help /\@<=
    * :help /\@<!
    * :help /\@>
    * :help /\zs
    * :help /\ze
    * :help /\%^
    * :help /\%$ 
```
