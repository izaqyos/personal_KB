---
type: reference
title: RegExp
description: "Legacy sed KB section: RegExp"
tags: [regex, sed, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "sed/KB_sed#2"
---

# RegExp

[↑ KB_sed](/sed/kb-sed/README.md)

```text
	2.1 
		The sed regular expressions are essentially the same as the grep regular expressions. They are summarized below.
		^ 	matches the beginning of the line
		$ 	matches the end of the line
		. 	Matches any single character
		(character)* 	match arbitrarily many occurences of (character)
		(character)? 	Match 0 or 1 instance of (character)
		[abcdef] 	Match any character enclosed in [] (in this instance, a b c d e or f) ranges of characters such as [a-z] are permitted. The behaviour of this deserves more description. See the page on grep for more details about the syntax of lists.
		[^abcdef] 	Match any character NOT enclosed in [] (in this instance, any character other than a b c d e or f)
		(character)\{m,n\} 	Match m-n repetitions of (character)
		(character)\{m,\} 	Match m or more repetitions of (character)
		(character)\{,n\} 	Match n or less (possibly 0) repetitions of (character)
		(character)\{n\} 	Match exactly n repetitions of (character)
		\(expression\) 	Group operator.
		\n 	Backreference - matches nth group
		expression1\|expression2 	Matches expression1 or expression 2. Works with GNU sed, but this feature might not work with other forms of sed.
```
