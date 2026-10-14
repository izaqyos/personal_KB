---
type: reference
title: Entering special characters
description: Subsection 33.38 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.38"
---

# 33.38 Entering special characters

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

### 33.38.1 Digraphs

```text
To enter "special" characters such as the euro or copyright symbols, or diacritical marks such as the German umlaut or accent grave, digraphs can be used.

Digraphs work by pressing CTRL-K and a two-letter combination while in insert mode. For example, in insert mode type:

CTRL-K a:
CTRL-K e>
CTRL-K Co
CTRL-K Pd

to give ä and ê, © and £ .

You can also set the digraph option :set digraph (or :set dg).

With the digraph option set you can enter

a <BS> :
e <BS> >

to give the same result.

To list the currently defined digraphs type: :dig[raphs]

Here is a small extract from the :digraphs command:

Ct ¢  162    Pd £  163    Cu ¤  164    Ye ¥  165
e! è  232    e' é  233    e> ê  234    e: ë  235

The first two characters in each column are the characters you have to type to enter the digraph.
In the middle of each column is the resulting character.
The decimal number is the normal Unicode number of the character. 
```

### 33.38.2 By character value

```text
It is also possible to enter any character (which can be displayed in your current 'encoding'), even a character for which no digraph is defined, if you know the character value, as follows (where ^V means "hit Ctrl-V, except if you use Ctrl-V to paste, in which case you should hit Ctrl-Q instead):

    * By decimal value: ^Vnnn (with 000 <= nnn <= 255)
    * By octal value: ^VOnnn or ^Vonnn (with 000 <= nnn <= 377)
    * By hex value: ^VXnn or ^Vxnn (with 00 <= nn <= FF)
    * By hex value for BMP Unicode codepoints: ^Vunnnn (with 0000 <= nnnn <= FFFF)
    * By hex value for any Unicode codepoint: ^VUnnnnnnnn (with 00000000 <= nnnnnnnn <= 7FFFFFFF) 

Notes:

    * In all cases, initial zeros may be omitted if the next character typed is not a digit in the given base (except, of course, that the value zero must be entered as at least one zero).
    * Hex digits A-F, when used, can be typed in upper or lower case, or even in any mixture of them. 

"
```

### 33.38.3 See also

```text
    * :help digraph-table
    * :help digraph.txt
    * :help digraphs-changed Vim 6.0 and later use the RFC1345 mnemonics.
    * :help i_CTRL-V_digit
    * cream-ascii
    * Working with Unicode 
```
