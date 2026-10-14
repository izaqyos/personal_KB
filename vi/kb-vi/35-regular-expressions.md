---
type: reference
title: Regular expressions
description: Section 35 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#35"
---

# Regular expressions

[↑ KB_vi](/vi/kb-vi/README.md)

## 35.1 magic

```text
Some characters in the pattern are taken literally.  They match with the same
character in the text.  When preceded with a backslash however, these
characters get a special meaning.

Other characters have a special meaning without a backslash.  They need to be
preceded with a backslash to match literally.

If a character is taken literally or not depends on the 'magic' option and the
items mentioned next.
							*/\m* */\M*
Use of "\m" makes the pattern after it be interpreted as if 'magic' is set,
ignoring the actual value of the 'magic' option.
Use of "\M" makes the pattern after it be interpreted as if 'nomagic' is used.
							*/\v* */\V*
Use of "\v" means that in the pattern after it all ASCII characters except
'0'-'9', 'a'-'z', 'A'-'Z' and '_' have a special meaning.  "very magic"

Use of "\V" means that in the pattern after it only the backslash has a
special meaning.  "very nomagic"

Examples:
after:	  \v	   \m	    \M	     \V		matches ~
		'magic' 'nomagic'
	  $	   $	    $	     \$		matches end-of-line
	  .	   .	    \.	     \.		matches any character
	  *	   *	    \*	     \*		any number of the previous atom
	  ()	   \(\)     \(\)     \(\)	grouping into an atom
	  |	   \|	    \|	     \|		separating alternatives
	  \a	   \a	    \a	     \a		alphabetic character
	  \\	   \\	    \\	     \\		literal backslash
	  \.	   \.	    .	     .		literal dot
	  \{	   {	    {	     {		literal '{'
	  a	   a	    a	     a		literal 'a'
```

## 35.2 Patterns

```text
	  multi ~
     'magic' 'nomagic'	matches of the preceding atom ~
|/star|	*	\*	0 or more	as many as possible
|/\+|	\+	\+	1 or more	as many as possible (*)
|/\=|	\=	\=	0 or 1		as many as possible (*)
|/\?|	\?	\?	0 or 1		as many as possible (*)

|/\{|	\{n,m}	\{n,m}	n to m		as many as possible (*)
	\{n}	\{n}	n		exactly (*)
	\{n,}	\{n,}	at least n	as many as possible (*)
	\{,m}	\{,m}	0 to m		as many as possible (*)
	\{}	\{}	0 or more	as many as possible (same as *) (*)

|/\{-|	\{-n,m}	\{-n,m}	n to m		as few as possible (*)
	\{-n}	\{-n}	n		exactly (*)
	\{-n,}	\{-n,}	at least n	as few as possible (*)
	\{-,m}	\{-,m}	0 to m		as few as possible (*)
	\{-}	\{-}	0 or more	as few as possible (*)

							*E59*
|/\@>|	\@>	\@>	1, like matching a whole pattern (*)
|/\@=|	\@=	\@=	nothing, requires a match |/zero-width| (*)
|/\@!|	\@!	\@!	nothing, requires NO match |/zero-width| (*)
|/\@<=|	\@<=	\@<=	nothing, requires a match behind |/zero-width| (*)
|/\@<!|	\@<!	\@<!	nothing, requires NO match behind |/zero-width| (*)

(*) {not in Vi}


Overview of ordinary atoms.				*/ordinary-atom*
More explanation and examples below, follow the links.

      ordinary atom ~
      magic   nomagic	matches ~
|/^|	^	^	start-of-line (at start of pattern) |/zero-width|
|/\^|	\^	\^	literal '^'
|/\_^|	\_^	\_^	start-of-line (used anywhere) |/zero-width|
|/$|	$	$	end-of-line (at end of pattern) |/zero-width|
|/\$|	\$	\$	literal '$'
|/\_$|	\_$	\_$	end-of-line (used anywhere) |/zero-width|
|/.|	.	\.	any single character (not an end-of-line)
|/\_.|	\_.	\_.	any single character or end-of-line
|/\<|	\<	\<	beginning of a word |/zero-width|
|/\>|	\>	\>	end of a word |/zero-width|
|/\zs|	\zs	\zs	anything, sets start of match
|/\ze|	\ze	\ze	anything, sets end of match
|/\%^|	\%^	\%^	beginning of file |/zero-width|		*E71*
|/\%$|	\%$	\%$	end of file |/zero-width|
|/\%V|	\%V	\%V	inside Visual area |/zero-width|
|/\%#|	\%#	\%#	cursor position |/zero-width|
|/\%'m|	\%'m	\%'m	mark m position |/zero-width|
|/\%l|	\%23l	\%23l	in line 23 |/zero-width|
|/\%c|	\%23c	\%23c	in column 23 |/zero-width|
|/\%v|	\%23v	\%23v	in virtual column 23 |/zero-width|

Character classes {not in Vi}:				*/character-classes*
|/\i|	\i	\i	identifier character (see 'isident' option)
|/\I|	\I	\I	like "\i", but excluding digits
|/\k|	\k	\k	keyword character (see 'iskeyword' option)
|/\K|	\K	\K	like "\k", but excluding digits
|/\f|	\f	\f	file name character (see 'isfname' option)
|/\F|	\F	\F	like "\f", but excluding digits
|/\p|	\p	\p	printable character (see 'isprint' option)
|/\P|	\P	\P	like "\p", but excluding digits
|/\s|	\s	\s	whitespace character: <Space> and <Tab>
|/\S|	\S	\S	non-whitespace character; opposite of \s
|/\d|	\d	\d	digit:				[0-9]
|/\D|	\D	\D	non-digit:			[^0-9]
|/\x|	\x	\x	hex digit:			[0-9A-Fa-f]
|/\X|	\X	\X	non-hex digit:			[^0-9A-Fa-f]
|/\o|	\o	\o	octal digit:			[0-7]
|/\O|	\O	\O	non-octal digit:		[^0-7]
|/\w|	\w	\w	word character:			[0-9A-Za-z_]
|/\W|	\W	\W	non-word character:		[^0-9A-Za-z_]
|/\h|	\h	\h	head of word character:		[A-Za-z_]
|/\H|	\H	\H	non-head of word character:	[^A-Za-z_]
|/\a|	\a	\a	alphabetic character:		[A-Za-z]
|/\A|	\A	\A	non-alphabetic character:	[^A-Za-z]
|/\l|	\l	\l	lowercase character:		[a-z]
|/\L|	\L	\L	non-lowercase character:	[^a-z]
|/\u|	\u	\u	uppercase character:		[A-Z]
|/\U|	\U	\U	non-uppercase character		[^A-Z]
|/\_|	\_x	\_x	where x is any of the characters above: character
			class with end-of-line included
(end of character classes)

|/\e|	\e	\e	<Esc>
|/\t|	\t	\t	<Tab>
|/\r|	\r	\r	<CR>
|/\b|	\b	\b	<BS>
|/\n|	\n	\n	end-of-line
|/~|	~	\~	last given substitute string
|/\1|	\1	\1	same string as matched by first \(\) {not in Vi}
|/\2|	\2	\2	Like "\1", but uses second \(\)
	   ...
|/\9|	\9	\9	Like "\1", but uses ninth \(\)
								*E68*
|/\z1|	\z1	\z1	only for syntax highlighting, see |:syn-ext-match|
	   ...
|/\z1|	\z9	\z9	only for syntax highlighting, see |:syn-ext-match|

	x	x	a character with no special meaning matches itself

|/[]|	[]	\[]	any character specified inside the []
|/\%[]| \%[]	\%[]	a sequence of optionally matched atoms

|/\c|	\c	\c	ignore case
|/\C|	\C	\C	match case
|/\m|	\m	\m	'magic' on for the following chars in the pattern
|/\M|	\M	\M	'magic' off for the following chars in the pattern
|/\v|	\v	\v	the following chars in the pattern are "very magic"
|/\V|	\V	\V	the following chars in the pattern are "very nomagic"
|/\Z|	\Z	\Z	ignore differences in Unicode "combining characters".
			Useful when searching voweled Hebrew or Arabic text.

|/\%d|	\%d	\%d	match specified decimal character (eg \%d123
|/\%x|	\%x	\%x	match specified hex character (eg \%x2a)
|/\%o|	\%o	\%o	match specified octal character (eg \%o040)
|/\%u|	\%u	\%u	match specified multibyte character (eg \%u20ac)
|/\%U|	\%U	\%U	match specified large multibyte character (eg
			\%U12345678)

Example			matches ~
\<\I\i*		or
\<\h\w*
\<[a-zA-Z_][a-zA-Z0-9_]*
			An identifier (e.g., in a C program).

\(\.$\|\. \)		A period followed by <EOL> or a space.

[.!?][])"']*\($\|[ ]\)	A search pattern that finds the end of a sentence,
			with almost the same definition as the ")" command.

"


cat\Z			Both "cat" and "caÌt" ("a" followed by 0x0300)
			Does not match "cÃ t" (character 0x00e0), even
			though it may look the same.
```

## 35.3 Filter lines according to pattern.

```text
		:g/pattern/
```

## 35.4 Manual

```text
		h regexp
```

## 35.5 substitution memory anchors

```text
		& the whole matched pattern 	
			example, put all log print code in comment:
			s_^\s\+dzlog_//&_gc
		\L the following characters are made lowercase
		\0 the whole matched pattern 	
		\U the following characters are made uppercase
		\1 the matched pattern in the first pair of \(\) 	
		\E end of \U and \L
		\2 the matched pattern in the second pair of \(\) 	
		\e end of \U and \L
		...  ... 	
		\r split line in two at this point
		\9 the matched pattern in the ninth pair of \(\) 	
		\l next character made lowercase
		~ the previous substitute string 	
		\u next character made uppercase
```

## 35.6 example

```text
	:'<,'>s/.*DZLOG.*,\s\+"/&[acsProcessEapResponse]: /gc  Add to all log prints a prefix with the function name.
```

## 37.7 Greedy vs. Nongreedy

```text
We used \{-} the "few as possible" operator rather than * which is too greedy when there are many such comments in the file.
Some examples:
Greedy search for between 3-5 words with the spaces between them (5 words matched): \(\w\+\s*\)\{3,5}
Non-Greedy search for between 3-5 words with the spaces between them (3 words matched)\(\w\+\s*\)\{-3,5}
Non-Greedy search for any character (match one character): .\{-}
Greedy search for any character (match all characters until newline): .*


"
```

## 37.8 Regular Expressions Reference

```text
The following table assumes that the 'magic' option is on (the default).
Simple Atoms
x The literal character x.
^ Start of line.
$ End of line.
. A single character.
\< Start of a word.
\> End of word.
Range Atoms
[abc] Match either a, b, or c.
[^abc] Match anything except a, b, or c.
[a-z] Match all characters from a through z.
[a-zA-Z] Match all characters from a through z and A through Z.
Character Classes
[:alnum:] Match all letters and digits.
[:alpha:] Match letters.
[:ascii:] Match all ASCII characters.
[:backspace:] Match the backspace character (<BS>).
[:blank:] Match the space and tab characters.
[:cntrl:] Match all control characters.
[:digit:] Match digits.
[:escape:] Matches the escape character (<Esc>).
[:graph:] Match the printable characters, excluding space.
[:lower:] Match lowercase letters.
[:print:] Match printable characters, including space.
[:punct:] Match the punctuation characters.
[:return:] Matches the end-of-line (carriage return, <Enter>, <CR>, <NL>).
[:space:] Match all whitespace characters.
[:tab:] Match the tab character (<Tab>).
[:upper:] Match the uppercase letters.
[:xdigit:] Match hexadecimal digits.
Patterns (Used for Substitutions)
\(pattern\) Mark the pattern for later use.The first set of \(\) marks a
subexpression as \1, the second \2, and so on.
\1 Match the same string that was matched by the first subexpression
in \( and \). For example: \([a-z]\).\1 matches ata,
ehe, tot, and so forth.
\2 Like \1, but uses second subexpression,
\9 Like \1, but uses ninth subexpression.
Special Character Atoms
\a Alphabetic character (A-Za-z).
\A Non-alphabetic character (any character except A-Za-z).
\b <BS>.
\d Digit.
\D Non-digit.
\e <Esc>.
\f Any filename character as defined by the isfname option.
\F Any filename character, but does not include the digits.
\h Head of word character (A-Za-z_).
\H Non-head of word character (any character except A-Za-z_).
\i Any identifier character as defined by the isident option.
\I Any identifier character, but does not include the digits.
\k Any keyword character as defined by the iskeyword option.
\K Any keyword character, but does not include the digits.
\l Lowercase character (a-z).
\L Non-lowercase character (any character except a-z).
\o Octal digit (0-7).
\O Non-octal digit.
\p Any printable character as defined by the isprint option.
\P Any printable character, but does not include the digits.
\r <CR>.
\s Whitespace (<Space> and <Tab>).
\S Non-whitespace character. (Any character except <Space> and
<Tab>).
\t <Tab>.
\u Uppercase character (A-Z).
\U Non-uppercase character (any character except A-Z).
\w Word character (0-9A-Za-z_).
\W Non-word character (any character except 0-9A-Za-z_).
\x Hexadecimal digit (0-9 a-f A-F).
\X Non-hexadecimal digit.
\~ Matches the last given substitute string.
Modifiers
* Match the previous atom 0 or more times.As much as possible.
\+ Match the previous atom 1 or more times.As much as possible.
\= Match the previous atom 0 or 1 times.
\{} Match the previous atom 0 or more times. (Same as the *
modifier.)
\{n}
\{-n} Match the previous atom n times.
\{n,m} Match the previous atom n to m times.
\{n,} Match the previous atom n or more times.
\{,m} Match the previous atom from 0 to m times.
\{-n,m} Match the previous atom n to m times. Match as little as
possible.
\{-n,} Match the previous atom at least n times. Match as little as
possible.
\{-,m} Match the previous atom up to m times. Match as little as
possible.
\{-} Match the previous atom 0 or more times. Match as little as
possible.
str1\|str2 Match str1 or str2.
```
