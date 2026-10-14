---
type: reference
title: Switching case of characters
description: "Vim tip: Switching case of characters"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.19"
---

# 33.19 Switching case of characters

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.wikia.com/wiki/VimTip49
You can change the case of text:

    Toggle case "HellO" to "hELLo" with g~ then a movement. 
    Uppercase "HellO" to "HELLO" with gU then a movement. 
    Lowercase "HellO" to "hello" with gu then a movement. 

Alternatively, you can visually select text then press ~ to toggle case, or U to convert to uppercase, or u to convert to lowercase.

|Contents
|    * 1 Examples
|    * 2 Title case
|    * 3 Twiddle case
|    * 4 References
|    * 5 Comments

 Examples

~
    Toggle case of the character under the cursor, or all visually-selected characters. 

|   3~ Toggle case of the next three characters. 

g~3w
    Toggle case of the next three words. 

g~iw
    Toggle case of the current word (inner word  cursor anywhere in word). 

g~$
    Toggle case of all characters to end of line. 

g~~
    Toggle case of the current line (same as V~). 

The above uses ~ to toggle case. In each example, you can replace ~ with u to convert to lowercase, or with U to convert to uppercase. For example:

U
    Uppercase the visually-selected text. 
    First press v or V then move to select text. 
    If you don't select text, pressing U will undo all changes to the current line. 

gUU
    Change the current line to uppercase (same as VU). 

gUiw
    Change current word to uppercase. 

u
    Lowercase the visually-selected text. 
    If you don't select text, pressing u will undo the last change. 

guu
    Change the current line to lowercase (same as Vu). 

 Title case

The :s substitute command can change case (see :help s/\u).

The following converts the current line to Title Case (all lowercase, except for initial uppercase letters):

:s/\<\(\w\)\(\w*\)\>/\u\1\L\2/g

Explanation The search pattern is \<\(\w\)\(\w*\)\> which searches for \< (beginning of word), then \w (a word character), then \w* (zero or more word characters), then \> (end of word). The \(...\) create subexpressions to be recalled with \1 and \2 in the replacement. The replacement is \u\1\L\2 which substitutes the two subexpressions transformed: The \u converts the first character of what follows to uppercase, while \L converts all of what follows to lowercase.
 Twiddle case

With the following (for example, in vimrc), you can visually select text then press ~ to convert the text to UPPER CASE, then to lower case, then to Title Case. Keep pressing ~ until you get the case you want.

function! TwiddleCase(str)
  if a:str ==# toupper(a:str)
    let result = tolower(a:str)
  elseif a:str ==# tolower(a:str)
    let result = substitute(a:str,'\(\<\w\+\>\)', '\u\1', 'g')
  else
    let result = toupper(a:str)
  endif
  return result
endfunction
vnoremap ~ ygv"=TwiddleCase(@")<CR>Pgv

 References

    * :help case
```
