---
type: reference
title: "Motion, Movement."
description: Section 28 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#28"
---

# Motion, Movement.

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	:h movement
	:h motion.txt
```

## 28.1 Basics

```text
	- +	line up, down on first non-blank char, accept count, example 3- three lines up.
	B W	space separated word left, right.
	gE E	end of space separated word left, right.
	n_	down n-1 lines on first non-blank char.	 
	^ $	first, last chatacter of screen line
	k, j    up, down lines.
	fc, Fc  next, previous occurence of character c.
	tc, Tc  before next, previous occurence of character c.
	; ,	repeat last fFtT, in opposite direction.
	[[ ]]	start of section backwards, forwards.
	[(, [{, [m. [#, [*, ]), ]}. ]m, ]#, ]* start end of closures, unclosed (), {} or #if, #else, /* */ and java methods.
	[M, ]M start end of Java/C++ method
	:h [M an example of how to get help on any of these motions
	g_ last non-blank character of the line
	[count]G	go to line count, defaults to last line.
	[count]gg	go to line count, defaults to first line.
	{count}%	Go to {count} percentage in the file
```

## 28.2 Advanced

### 28.2.1 Wrapped lines

```text
			g0 first character of the screen line
			g^ first non-blank character of the screen line
			gm Like "g0", but half a screenwidth to the right
			g$  To the last character of the screen line
			| To screen column [count] in the current line
			ex. 5| will go to 5th column, useful for looong lines

			() [count] sentences backward/forward.
			{} [count] paragraphs backward/forward.
			[[]] [count] sections backward/forward.
```

## 28.3 Text objects selection.

```text
			aw "a word" accepts [count]
			iw "inner word" accepts [count]
			aW "a WORD" accepts [count]
			iW "inner WORD" accepts [count]
			as "a sentence" accepts [count]
			is "inner sentence" accepts [count]
			ap "a paragraph" accepts [count]
			ip "inner paragraph" accepts [count]
			a], a[  "a [] block" accepts [count]
			i], i[  "inner [] block" accepts [count]
			same for (), <>,{}
			a", a', a`  " a quated string"
			i", a', a`  " inner quated string"

			Example with delete:

				"dl"	delete character (alias: "x")		|dl|
				"diw"	delete inner word			*diw*
				"daw"	delete a word				*daw*
				"diW"	delete inner WORD (see |WORD|)		*diW*
				"daW"	delete a WORD (see |WORD|)		*daW*
				"dd"	delete one line				|dd|
				"dis"	delete inner sentence			*dis*
				"das"	delete a sentence			*das*
				"dib"	delete inner '(' ')' block		*dib*
				"dab"	delete a '(' ')' block			*dab*
				"dip"	delete inner paragraph			*dip*
				"dap"	delete a paragraph			*dap*
				"diB"	delete inner '{' '}' block		*diB*
				"daB"	delete a '{' '}' block			*daB*
```

## 28.4 Using motion for selection or copying

```text
Some examples
vaw		-		Visualize a word
vas		-		Visualize a sentence
vi{		-		Visualize the inside part of a {} clause
yta		-		yank from current possition until before the next 'a' character
yFa		-		yank from current possition until the previous 'a' character		
```
