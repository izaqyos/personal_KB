---
type: reference
title: Advanced substitution.
description: Section 31 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#31"
---

# Advanced substitution.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
		:h substitution
```

## 31.2 useful examples:

### 31.2.1 substitution

```text
		  :s/a\|b/xxx\0xxx/g		 modifies "a b"	     to "xxxaxxx xxxbxxx"
		  :s/\([abc]\)\([efg]\)/\2\1/g	 modifies "af fa bg" to "fa fa gb"
		  :s/abcde/abc^Mde/		 modifies "abcde"    to "abc", "de" (two lines)
		  :s/$/\^M/			 modifies "abcde"    to "abcde^M"
		  :%s/\r//g			 delete DOS returns ^M
		  :s/\w\+/\u\0/g		 modifies "bla bla"  to "Bla Bla"
```

### 31.2.2 substitution in visual

```text
		:'<,'>s/\d\+/8.1.\0/gc		in a visually selected text, change add prefic 0f 8.1 to all numbers.
		'<,'>s/\(0x\w\+\)\s\+\(\w\+.*$\)/\2\t\1/g    put first word that starts with 0x at the end of the line.
		'<,'>s/\(^.*Pos\)\(.*$\)/Pos\2/g	     remove prefix of line up until the word that starts with Pos.
```

### 31.2.3 complex substitution

```text
		  :s/^\s*\(\w\+\)/def set_\1(self, in_\1):/  take a list of words and make from them a list of empty python setter methods.
		:%s/\(\t\+\)print/\1if dbg_lvl == 10:\r\1\tprint/gc  replace all print directives with a condition on debug level, while
								     keeping the correct indentation. This is for windows files, for unix replace the
								     \r with a \n (carriage return with new line)
		:s/$/\r/  add new lines, ( unix, replace \r with \n)

		 :'<,'>s/^\(\s\+\w\+\)/\1,/  add , at the end of the first word in each line (good for adding , for c++ enums)
		%s$\(EAPLog\s*(\s*DZLOG\w\+\s*,\)$& __LINE__, $gc  add parameter to function, change from 
								EAPLog ( DZLOG_ALWAYS, "message") to:
								EAPLog ( DZLOG_ALWAYS, __LINE__, "message")
```

### 31.2.4 Increment and decrement numbers by substitution

#### 31.2.4.1 Increment and decrement numbers by substitution in global scope

```text
			%" decrement numbers by 3
			%:%s/\d\+/\=(submatch(0)-3)/
			%" increment, add 18 to all numbers in file
			%:%s/\d\+/\=(submatch(0)+18)/g
			%" increment numbers by 6 on certain lines only
			%:g/loc\|function/s/\d/\=submatch(0)+6/

			%s_\(\w\+\s\+\)\{2}(\(\w\+\));_\2_gc
			Change a list of user names and emails in that format (exclude all but the words in () ):
			Nira Amit (nleibman); Christopher Murray (chmurray); Yehoshua Hershberg (yhershbe); Oleg Pekar (olpekar); Dror Koren (dror); Noam Singer (nsinger); Ori Burstein (oburstei); Vicki Inbar (vinbar); Salomon Mshesha (smashash); Amir Naftali (amirn); Itai Stern (istern)

			to that format (strip everything but user name)
			 nleibman chmurray yhershbe olpekar dror nsinger oburstei vinbar smashash amirn istern
```

#### 31.2.4.2 Increment and decrement numbers by substitution in selection from visual mode

```text
On Monday, October 7, 2013 8:00:38 AM UTC-5, Yosi Izaq wrote:
> Hi,
>
> I want to selectively increment numbers in substitute.
> I'm familiar w/ submatch for increment all numbers in substitute, like in vis. mode range:
> '<,'>s/\d\+/\=submatch(0)+1/gc
>
> But what if I want to increment numbers only of lines containing a preceding pattern, say "Number".
> For instance:
> "
> 1
> Number: 2
> "
>
> Should change to:
> "
> 1
> Number: 3
> "
>
> TIA,
> Thanks!
> Yosi

This is a perfect use for the :g command, for example using your substitute:

:'<,'>g#^Number#s/\d\+/\=submatch(0)+1/gc
				31.2.4.3
```

### 31.2.5 Replacing a pattern match with the character preceding it

```text
substitute every "abcde:fgh" with "abcdeefgh" in a file.
%s/\(.\):/\1\1/g	
	
			31.2.6
		31.3
```
