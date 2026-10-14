---
type: reference
title: Clever tricks
description: Section 34 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#34"
---

# Clever tricks

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	(taken from VIM manual chapter 12)
```

## 34.1 Global, tags global operator

```text
	The |:global| command can be combined with the |:move| command to move all the
lines before the first line, resulting in a reversed file.  The command is:

	:global/^/m 0

Abbreviated:

	:g/^/m 0

The "^" regular expression matches the beginning of the line (even if the line
is blank).  The |:move| command moves the matching line to after the mythical
zeroth line, so the current matching line becomes the first line of the file.
As the |:global| command is not confused by the changing line numbering,
|:global| proceeds to match all remaining lines of the file and puts each as
the first.

This also works on a range of lines.  First move to above the first line and
mark it with "mt".  Then move the cursor to the last line in the range and
type:

	:'t+1,.g/^/m 't
```

### 34.1.1 print cerain blocks of text using global

```text
			print three lines, line containing pattern and two above it. 
			. is current line.
			.+/-n offset from current line.
			1 is first line
			$ is last line

			:g/<pattern>/.-2,.p
```

### 34.1.2 Remove unwanted empty lines

```text
http://vim.wikia.com/wiki/VimTip72
Created: June 5, 2001 Complexity: basic Author: Volker Duetsch

Use either of the following commands to delete all empty lines:

:g/^$/d
:v/./d

(v like g on all lines that don't match pattern)

If you want to delete all lines that are empty or that contain only whitespace characters (spaces, tabs), use either of:

:g/^\s*$/d
:v/\S/d

In the second command, v operates on lines that do not match, and \S matches anything that is not a whitespace, and d deletes the flagged lines (all lines that have no characters, or that have only whitespace characters).

You may want to condense multiple blank lines into a single blank line. The following will delete all trailing whitespace from each line, then replace three or more consecutive line endings with two line endings (a single blank line):

:%s/\s\+$//e
:%s/\n\{3,}/\r\r/e

The e substitute flag means that no error is displayed if the pattern is not found. In the second command, \n in the search pattern finds newline, while \r in the replacement inserts a newline.

 Handling IDEOGRAPHIC SPACE

In CJK languages (Chinese, Japanese, Korean), the Unicode character IDEOGRAPHIC SPACE may be used. If you have 'encoding' utf-8 (and do not have the 'l' flag in 'cpoptions'), you can use \u3000 in a search pattern to specify the UTF-16 hex code for IDEOGRAPHIC SPACE. :help /\]

In that case, the following will delete all empty lines, or lines that contain only combinations of space, tab or IDEOGRAPHIC SPACE.

:g/^[ \t\u3000]*$/d

An alternative procedure, which should work in other encodings, would be to enter the CJK space directly into the pattern. That is, you would type the following, but instead of '#' you would enter a CJK space.

:g/^[ \t#]*$/d

If you're not sure how to type the character, position your cursor on an example of the character that you already have in the buffer. Then type yl to yank the character. Then, enter the above :g command, but instead of '#' type Ctrl-R " (Control-R then double-quote, which will insert the contents of the unnamed register containing the yanked character).
```

### 34.1.3 Power of g

```text
http://vim.wikia.com/wiki/VimTip227

The global command :g is very useful. Here are some examples showing the power of :g.
```

#### 34.1.3.1 Brief explanation of :g

```text
:[range]g/<pattern>/cmd

The command works in the specified range (default whole file), by executing the Ex command cmd for each line matching <pattern>. Before executing cmd, "." is set to the particular line. An Ex command is one starting with a colon (':').
```

#### 34.1.3.2 Some examples

#### 34.1.3.2.1 Display context (5 lines) for all occurrences of a pattern.

```text
:g/<pattern>/z#.5
" Same, but with some beautification.
:g/<pattern>/z#.5|echo "=========="
```

#### 34.1.3.2.2 Delete all lines matching a pattern.

```text
:g/<pattern>/d
```

#### 34.1.3.2.3 Delete all blank lines.

```text
:g/^\s*$/d
```

#### 34.1.3.2.4 Double space the file ('^' matches each line).

```text
:g/^/pu =\"\n\"
" Alternative (:put inserts nothing from the blackhole register)
:g/^/pu _
```

#### 34.1.3.2.5 Copy all lines matching a pattern to end of file.

```text
:g/<pattern>/t$
```

#### 34.1.3.2.6 Yank all lines matching a pattern to register 'a'.

```text
0"ay0:g/<pattern>/y A

    Explanation The first 0 moves the cursor to the first character of the line. Then "ay0 yanks into register a the motion 0. Since the cursor is already on the first character, it yanks nothing into register a, clearing it. The y A is an Ex command (:help :y). It yanks the current line into register A (append to register a). 
```

#### 34.1.3.2.7 Increment numbers from current line to end-of-document by one (this assumes the default behavior of Ctrl-A to increment a number; you might need :unmap <C-A> on Windows).

```text
:.,$g/^\d/exe "normal! \<C-A>"
```

#### 34.1.3.2.8 Comment lines containing "DEBUG" statements in a C program.

```text
g/^\s*DEBUG/exe "norm! I/* \<Esc>A */\<Esc>"
```

#### 34.1.3.2.9 Reverse lookup for records (say an address book, with Name at start-of-line and fields after a space).

```text
:g/<pattern>?^\w?p "if only name is interesting
:g/<pattern>/ka|?^\w?p|'ap "if name and the lookup-line is interesting
:g/<pattern>/?^\w?|+,/^[^ ]/-1p "if entire record is interesting
```

#### 34.1.3.2.10 Reverse a file (just to show the power of g).

```text
:g/^/m0
```

#### 34.1.3.2.11 using normal mode editing with global

```text
example prefix hi to pattern
:g/pattern/norm Ihi

				34.1.3.2.12
```

#### 34.1.3.3 Notes Use :v to negate the search pattern.

```text
			Example: Delete all lines not matching pattern:

:v/pattern/d
```

#### 34.1.3.4 Some explanation of commands commonly used with :g

```text
following comes after :g/pattern/

:2,8co15  "copy lines 2 through 8 after line 15
:4,15t$   "copy lines 4 through 15 to end of document (t == co)
:-t$      "copy previous line to end of document
:m0       "move current line to the top of the document
:.,+3m$-1 "move current line through current+3 to the last but one line
```

#### 34.1.3.5 Commands used with :g are Ex commands, so a help search should be

```text
:help :<help-topic>
:help :k   "example

See :help ex-cmd-index for a list of Ex commands.
```

#### 34.1.3.6 Comments

```text
Over a range defined by marks a and b, operate on each line containing pattern. The operation is to replace each pattern2 with string.

:'a,'bg/pattern/s/pattern2/string/gi

Run a macro on matching lines (example assuming a macro recorded as 'q'):

:g/<pattern>/normal @q

To delete (subsequent) duplicate lines from a file:

:g/^\(.*\)\(\r\?\n\1\)\+$/d

To just view the duplicates use:

/^\(.*\)\(\r\?\n\1\)\+$

Compress multiple occurrences of blank lines into a single blank line

:v/./,/./-j

Use :helpgrep '\/,\/' *.txt for an explanation.

I'll break down this incredible collapse-multiple-blank-lines command for everyone, now that I finally figured out how it works.

First, however, I'll rewrite it this way to illustrate that some of those slashes have totally different meaning than others:

:v_._,/./-1join

Note that to delimit expressions like these, just about any symbol can be used in place of the typical slashes... in this case, I used underscores. What we have is an inverse search (:v, same as :g!) for a dot ('.') which means anything except a newline. So this will match empty lines and proceed to execute [command] on each of them.

:v_._[command]

The remaining [command] is this, which is a fancy join command, abbreviated earlier as just 'j'.

,/./-1join

The comma tells it to work with a range of lines:

:help :,

With nothing before the comma, the range begins at the cursor, which is where that first blank line was. The end of the range is specified by a search, which to my knowledge actually does require slashes. The slash and dot mean to search for anything (again), which matches the nearest non-empty line and offsets by {offset} lines.

/./{offset}

The {offset} here is -1, meaning one line above. In the original command we just saw a minus sign, to which vim assumes a count of 1 by default, so it did the same thing as how I've rewritten it, but simply with one character fewer to type.

/./-1

There is a caveat about join that makes this trick possible. If you specify a range of only one line to "join", it will do nothing. For example, this command tells vim to join into one line all lines from 5 to 5, which does nothing:

:5,5join

In this case, any time you have more than one empty line (the case of interest), the join will see a range greater than one and join them together. For all single empty lines, join will leave it alone.

There's no good way use a delete command with :v/./ because you have to delete one line for every empty line you find. Join turned out to be the answer.

This command only merges truly "empty" lines... if any lines contain spaces and/or tabs, they will not be collapsed. To make sure you kill those lines, try this:

:v/^[^ \t]\+$/,/^[^ \t]\+$/-j

Or, to just clean such lines up first,

:%s/^[ \t]\+$//g
```

## 34.2 Count words

```text
	Sometimes you have to write a text with a maximum number of words.  Vim can
count the words for you.
   When the whole file is what you want to count the words in, use this
command:

	g CTRL-G

Do not type a space after the g, this is just used here to make the command
easy to read.
   The output looks like this:

	Col 1 of 0; Line 141 of 157; Word 748 of 774; Byte 4489 of 4976 

You can see on which word you are (748), and the total number of words in the
file (774).

When the text is only part of a file, you could move to the start of the text,
type "g CTRL-G", move to the end of the text, type "g CTRL-G" again, and then
use your brain to compute the difference in the word position.  That's a good
exercise, but there is an easier way.  With Visual mode, select the text you
want to count words in.  Then type g CTRL-G.  The result:

	Selected 5 of 293 Lines; 70 of 1884 Words; 359 of 10928 Bytes 

For other ways to count words, lines and other items, see |count-items|.
```

### 34.2.1 Count patterns, lines, characters, words

```text
Counting words, lines, etc.				*count-items*

To count how often any pattern occurs in the current buffer use the substitute
command and add the 'n' flag to avoid the substitution.  The reported number
of substitutions is the number of items.  Examples: >

	:%s/./&/gn		characters
	:%s/\i\+/&/gn		words
	:%s/^//n		lines
	:%s/the/&/gn		"the" anywhere
	:%s/\<the\>/&/gn	"the" as a word

Example, count how many #define lines are in file
:%s/^#define/n

Note, in my tests the -n flag doesn't work and the replacments takes place, hit 'u' to cancel substitutions
```

### 34.2.2 Some more ways to count lines

```text
:'a,'bs/^// will count the lines between two markers a and b but is there any

add the "n" flag
 :'a,'bs/^//n

do the math (adjust for fenceposting):
 :echo line("'b")-line("'a")
	
yank the lines and look at the "N lines yanked"
message.

'ay'b
```

## 34.3 Enter, add, insert multiple characters

```text
	like for example add a line with 20 *.
```

### 34.3.1 Yank

```text
		From command mode do, i * ctrl[ x 20p
```

### 34.3.2 Macro, record

```text
		From command mode do, qa shift+I * ctrl[ q 20@a
```

## 34.4 Advanced usage of global operator

### 34.4.1 Join all consecutive lines

#### 34.4.1.1 Basic

```text
			The J command joins the current line with the next one. A space is added to the end
of the first line to separate the two pieces that are joined. But suppose you do not
want the spaces.Then you use the gJ command to join lines without spaces . It works just like the J command, except that no space is inserted
between the joined parts.
gJ

			In all file:
			g/^/j  

			In visualy selected text:
			'<,'>g/^/j

			in section between patterns
			/pattern/,/pattern2/g/^/j 
```

#### 34.4.1.2 Advanced

```text
-> I have to print on paper something like this,

111111111
222222222
333333333
444444444
555555555
666666666
777777777
......
(very long list)

To be environmental friendly, I would like to reformat it as

111111111 222222222 333333333
444444444 555555555 666666666
777777777 ............

Command J should be useful, but I want to know how to automate it to
process to whole file.

-> Set column width, Highlight all the text and use gq to reformat the text.
set textwidth=bla

-> 
>>> if you want to have exactly 3 columns in each line you can use
>>>
>>>   :g/^/normal 3J
>> Or you can skip the normal command:
>>
>>    :g/^/j3
>
> Thank you all for help. I learn three different ways :)
>
> I found a caveat when using gp is that needs set formatoptions-=n to
> work so that for my particular case :g is easier to use.

The two join methods ("norm 3J" and "j3") are for literal "I want
to join 3 lines together".  The "gq" method is a generic "join
lines to fill the width I specify" which may be more or less than
3 lines joined together.  Both have their place, depending on
which type of behavior you want.

As a side note, if you don't want Vim to automatically add spaces
to your joined lines, you can either use "norm 3gJ" or "j!3"
```

### 34.4.2 Useful global operator operations from http://www.rayninfo.co.uk/vimtips.html

```text
		" global command display 
:g/gladiolli/#              : display with line numbers (YOU WANT THIS!)
:g/fred.*joe.*dick/         : display all lines fred,joe & dick
:g/\<fred\>/                : display all lines fred but not freddy
:g/^\s*$/d                  : delete all blank lines
:g!/^dd/d                   : delete lines not containing string
:v/^dd/d                    : delete lines not containing string
:g/fred/,/joe/d             : not line based (very powerfull)
:g/fred/,/joe/j             : Join Lines *N*
:g/-------/.-10,.d          : Delete string & 10 previous lines
:g/{/ ,/}/- s/\n\+/\r/g     : Delete empty lines but only between {...}
:v/\S/d                     : Delete empty lines (both types)
:v/./,/./-j                 : compress empty lines
:g/^$/,/./-j                : compress empty lines
:g/<input\|<form/p          : ORing
:g/^/put_                   : double space file (pu = put)
:g/^/m0                     : Reverse file (m = move)
:'a,'bg/^/m'b               : Reverse a section a to b
:g/^/t.                     : duplicate every line
:g/fred/t$                  : copy(transfer) lines matching fred to EOF
:g/stage/t'a                : copy (transfer) lines matching stage to marker a (cannot use .) *C*
:g/\(^I[^^I]*\)\{80}/d      : delete all lines containing at least 80 tabs
" perform a substitute on every other line
:g/^/ if line('.')%2|s/^/zz / 
" match all lines containing "somestr" between markers a & b
" copy after line containing "otherstr"
:'a,'bg/somestr/co/otherstr/ : co(py) or mo(ve)
" as above but also do a substitution
:'a,'bg/str1/s/str1/&&&/|mo/str2/
:%norm jdd                  : delete every other line
" incrementing numbers (type <c-a> as 5 characters)
:.,$g/^\d/exe "norm! \<c-a>": increment numbers
:'a,'bg/\d\+/norm! ^A       : increment numbers
" storing glob results (note must use APPEND) you need to empty reg a first with qaq. 
"save results to a register/paste buffer
:g/fred/y A                 : append all lines fred to register a
:g/fred/y A | :let @*=@a    : put into paste buffer
:let @a=''|g/Barratt/y A |:let @*=@a
" filter lines to a file (file must already exist)
:'a,'bg/^Error/ . w >> errors.txt
"Note, an alternative way is first yanking to a buffer and then pasting it to file. Like:
:g/pattern/y A
:e filename
"AP //paster buffer A

" duplicate every line in a file wrap a print '' around each duplicate
:g/./yank|put|-1s/'/"/g|s/.*/Print '&'/
" replace string with contents of a file, -d deletes the "mark"
:g/^MARK$/r tmp.txt | -d
" display prettily
:g/<pattern>/z#.5           : display with context
:g/<pattern>/z#.5|echo "=========="  : display beautifully
" Combining g// with normal mode commands
:g/|/norm 2f|r*                      : replace 2nd | with a star
"send output of previous global command to a new window
:nmap <F3>  :redir @a<CR>:g//<CR>:redir END<CR>:new<CR>:put! a<CR><CR>
			

"
```

### 34.4.3 Search (Print) all instances of pattern A not containing pattern B

```text
			Print all lines containing patternA exclusive those that also contain patternB
			???

			The following doesn't work since it only brings the first line matching patternA.
			/patternA/g!/patternB/p

			To search use the idle substitute trick
			/patternA/g!/patternB/s/patternA/&/gc
			and answer no
```

### 34.4.4 Print (get) a list of all line numbers that contain a given pattern

```text
			:g/pattern/.=
```

## 34.5 Edit remote file via ssh (scp)

```text
You can do that via scp like this:

vim scp://user@myserver[:port]//path/to/file.txt
Notice the two slashes // between server and path, which is needed to correctly resolve the absolute path. [:port]is optional.

This is handled by vim's netrw.vim standard plugin. Several other protocols are supported.

my example
e scp://${USER_UNX}@${DS_64_1}//home/<user>/st 

    34.6
```
