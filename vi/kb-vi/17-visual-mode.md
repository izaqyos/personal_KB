---
type: reference
title: Visual mode
description: Section 17 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#17"
---

# Visual mode

[↑ KB_vi](/vi/kb-vi/README.md)

```text
Visual mode
```

## 17.1 visual mode intro.

```text
	vi can be a bit difficult to follow when you are trying to do something to a block of lines (for example, do I want line 8843 through to 8903 or 8904?), so vim has a "visual mode" where you can actually see lines highlighted in inverse.


First, "mark" a block of lines (or characters) by going to the start of the block, and then using one of the following:
Character mode				v
Line mode				V
Block mode				Ctrl+V
Re-mark previous block			gv
go to start\end of visual block		o, O
replace selection			r[replacment]

The differences are:

    * Character mode - from somewhere inside one line to somewhere inside another (ie. can be a part line)
	*     * Line mode - will be whole lines
	*         * Block mode - from (say) column 5 at line 10, to column 60 in line 20 (a square block of text) 
	*
	*         Then use the cursor movement commands (search, arrow, go to line, whatever) to mark the other end of the block, and either:
	*         Do some command	(see below)
	*         Cancel visual mode	Esc
	*         Go to other end of block	o
```

## 17.2. Other ways of establishing a visual block

```text
	*         A word (with white space)	vaw
	*         Inner word	viw
	*         A WORD (with white space)	vaW
	*         Inner WORD	viW
	*         A sentence (with white space)		vas
	*         Inner sentence	vis
	*         A paragraph (with white space)	vap
	*         Inner paragraph	vip
	*         A ( ... ) block (includes brackets)	vab
	*         Inner ( ... ) block	vib
	*         A { ... } block (includes braces)	vaB
	*         Inner { ... } block	viB
		  also va> or  va< - entire <> block
		  also vi> or  vi< - inner <> block both work also for (, [ and {
	*
	*         A "word" is a sequence of letters, numbers, underscores. A "WORD" is a sequence that is terminated by spaces. The difference would apply in cases like a(b) - if the cursor is on "a" a "word" is "a" however a "WORD" is "a(b)".
	*

	17.3.  Here is an example, from C source code. Say you have the following code, and you want to select the code inside the inner { ... } characters. Put the cursor in the middle (eg. on CON_EDITING) and type "viB" and the "inner block" (text in bold) will be highlighted.
	*
	*
	*         if ( d->pagepoint )
	*         {
		*           if ( !pager_output(d) )
			*             {
				*                 if ( d->character
						*                     && ( d->connected == CON_PLAYING
							*                         ||   d->connected == CON_EDITING ) )
					*                                 save_char_obj( d->character );
				*                                     d->outtop = 0;
				*                                         close_socket(d, FALSE);
				*                                           }
				*                                           }
				*

				*                                           Here is another method of selecting a visual block of C code. Say we have the following code and we want to highlight everything inside the "while" loop. Put the cursor on the first "{" and type "v%". That will go into visual mode and move to the end of the block. The highlighted code will be in bold.
				*
				*
				*                                           while ( usecDelta >= 1000000 )
	*                                           {
		*                                               usecDelta -= 1000000;
		*                                                   secDelta  += 1;
		*                                                   }
		*
```

## 17.4 Visual mode commands

```text
		*
		*                                                   See below for meanings of notes in brackets.
		*                                                   Switch case		~
		*                                                   Delete	d
		*                                                   Change (4)	c
		*                                                   Yank	y
		*                                                   Shift right (4)	>
		*                                                   Shift left (4)	<
		*                                                   Filter through external command (1)		!
		*                                                   Filter through 'equalprg' option command (1)	=
		*                                                   Format lines to 'textwidth' length (1)	gq
		*
		*                                                   You can also do the following on the selected block:
		*                                                   Start ex command for highlighted lines (1)	:
			*                                                   Change (4)	r
			*                                                   Change	s
			*                                                   Change (2)(4)	C
			*                                                   Change (2)	S
			*                                                   Change (2)	R
			*                                                   Delete	x
			*                                                   Delete (3)	D
			*                                                   Delete (2)	X
			*                                                   Yank (2)	Y
			*                                                   Join (1)	J
			*                                                   Make uppercase	U
			*                                                   Make lowercase	u
			*                                                   Find tag	Ctrl+]
			*                                                   Block insert	I
			*                                                   Block append	A
			*
			*                                                   Notes
			*
			*                                                      1. Always whole lines
			*                                                         2. Whole lines when not using CTRL-V.
			*                                                            3. Whole lines when not using CTRL-V, delete until the end of the line when using CTRL-V.
			*                                                               4. When using CTRL-V operates on the block only. 
			*
			*                                                               An example of visual mode?
			*
			*                                                               OK, let's say we have a visual block highlighted. Try these:
			*                                                               Delete it	d
			*                                                               Copy it		Y
			*                                                               Change "apple" to "orange" in the block		:s/apple/orange/g
		:s/apple/orange/c change with confirmation in block
			*                                                               Turn into C++ comments	:s.^.//.
			*                                                               Turn into C comments	:s-^.*$-/* & */-
```

## 17.5 Visual mode insert mode.

### 17.5.1 I example:

```text
				Do you know the I key in visual-block mode?

				Suppose you have
				let a=2
				let b=3
				let c=4

				You want to make these variables script-wise. Then you move to over a, hit <C-v>, press jj and now press I.
				You will be in insert mode before a
				Now enter s:<Esc>, and when you press <Esc>, b and c will have the s: prefix too.
				See |v_b_I|
```

### 17.5.2 Block select

```text
			There are lots of other neat things you can do with block selects. One of my favorites is adding a string to the end of each line... like so:

			a. Press Ctrl+V and then j (or k) to extend the selection to all the lines you want

			b. Press $. This will create a 'ragged edge' selection that extends to the right end of each line in your selection.

			c. Press A. I inserts text at the beginning of a block selection, A appends text at the end of a block selection.

			d. Type your text and press Esc.

			Presto! You could also do something like this with :.,+10s/$/newtext ... but I've become a big fan of visual selections because they avoid line counting.

			Also, the usual "c," "d," "y," and "r" commands work as you'd expect to change/delete/yank/replace stuff in blocks.
```

## 17.6 Visualize a number of lines forwards or backwards.

```text
			Vn[+,-]		visualize n lines forward, backwards.

			V10+		visualize 10 lines forward.
```
