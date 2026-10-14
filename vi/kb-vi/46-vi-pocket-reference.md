---
type: reference
title: VI pocket reference
description: Section 45 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#45"
---

# VI pocket reference

[↑ KB_vi](/vi/kb-vi/README.md)

## 45.1 Command line options

```text
	Command				Action
	vi file				Invoke vi on file
	vi file1 file2			Invoke vi on files sequentially
	view file			Invoke vi on file in read-only mode
	vi -R file			Invoke vi on file in read-only mode
	vi -r file			Recover file and recent edits after a crash
	vi -t tag			Look up tag and start editing at its definition
	vi -w n				Set the window size to n ; useful over a slow connection
	vi + file			Open file at last line
	vi +n file			Open file directly at line number n
	vi -c command file		Open file, execute command, which is usually a search command or line number (POSIX)
	vi +/pattern file		Open file directly at pattern
					Example: vi +/change.*password stam 
					will open file in first occurence of pattern change.*password
	ex file				Invoke ex on file
	ex - file < script		Invoke ex on file, taking commands from script ; suppress informative messages and prompts
	ex -s file < script		Invoke ex on file, taking commands from script ; suppress informative messages and prompts (POSIX)
```

## 45.2 vi Commands

```text
Most vi commands follow a general pattern:

[command][number]text object

or the equivalent form:

[number][command]text object
```

### 45.2.1 Movement Commands

```text
Command			Meaning
Character	 
h, j, k, l		Left, down, up, right (, , , )
Text	 
w, W, b, B		Forward, backward by word
e, E			End of word
), (			Beginning of next, previous sentence
}, {			Beginning of next, previous paragraph
] ], [ [		Beginning of next, previous section
Lines	 
RETURN			First nonblank character of next line
0, $			First, last position of current line
^			First nonblank character of current line
+, -			First nonblank character of next, previous line
n |			Column n of current line
H			Top line of screen
M			Middle line of screen
L			Last line of screen
nH			n (number) of lines after top line
nL			n (number) of lines before last line
Scrolling	 
CTRL-F, CTRL-B		Scroll forward, backward one screen
CTRL-D, CTRL-U		Scroll down, up one-half screen
CTRL-E, CTRL-Y		Show one more line at bottom, top of window
z RETURN		Reposition line with cursor: to top of screen
z .			Reposition line with cursor: to middle of screen
z - 			Reposition line with cursor: to bottom of screen
CTRL-L			Redraw screen (without scrolling)
Searches	 
/pattern		Search forward for pattern
?pattern		Search backward for pattern
n, N			Repeat last search in same, opposite direction
/, ?			Repeat previous search forward, backward
fx			Search forward for character x in current line
Fx			Search backward for character x in current line
tx			Search forward to character before x in current line
Tx			Search backward to character after x in current line
;			Repeat previous current-line search
,			Repeat previous current-line search in opposite direction
Line number	 
CTRL-G			Display current line number
nG			Move to line number n
G			Move to last line in file
:n			Move to line n in file
Marking position	 
mx			Mark current position as x
'x			Move cursor to mark x
''			Return to previous mark or context
'x			Move to beginning of line containing mark x
' '			Return to beginning of line containing previous mark
```

### 45.2.2 Editing Commands

```text
Command			Action
Insert	 
i, a			Insert text before, after cursor
I, A			Insert text before beginning, after end of line
o, O			Open new line for text below, above cursor
Change	 
r			Replace character
cw			Change word
cc			Change current line
cmotion			Change text between the cursor and the target of motion
C			Change to end of line
R			Type over (overwrite) characters
s			Substitute: delete character and insert new text
S			Substitute: delete current line and insert new text
Delete, move	 
x			Delete character under cursor
X			Delete character before cursor
dw			Delete word
dd			Delete current line
dmotion			Delete text between the cursor and the target of motion
D			Delete to end of line
d0			Delete to start of line
p, P			Put deleted text after, before cursor
"np			Put text from delete buffer number n after cursor (for last nine deletions)
Yank	 
yw			Yank (copy) word
yy,Y			Yank current line
"ayy			Yank current line into named buffer a (az). Uppercase names append text
ymotion			Yank text between the cursor and the target of motion
p, P			Put yanked text after, before cursor
"aP			Put text from buffer a before cursor (az)
Other commands	 
.			Repeat last edit command
u, U			Undo last edit; restore current line
J			Join two lines
ex edit commands	 
:d			Delete lines
:m			Move lines
:co or :t		Copy lines
:.,$d			Delete from current line to end of file
:%d			% is a shortcut to 1,$ so equivalent to :1,$d which is delete all file. replace d with y for yank.
:30,60m0		Move lines 30 through 60 to top of file
:.,/pattern/co$	Copy	from current line through line containing pattern to end of file
```

### 45.2.3 Exit Commands

```text
Command			Meaning
ZZ			Write (save) and quit file
:x			Write (save) and quit file
:wq			Write (save) and quit file
:w			Write (save) file
:w!			Write (save) file, overriding protection
:30,60w newfile		Write from line 30 through line 60 as newfile
:30,60w>> file		Write from line 30 through line 60 and append to file
:w %.new		Write current buffer named file as file.new
:q			Quit file
:q!			Quit file, overriding protection
Q			Quit vi and invoke ex
:e file2		Edit file2 without leaving vi
:n			Edit next file
:e!			Return to version of current file at time of last write (save)
:e #			Edit alternate file
:vi			Invoke vi editor from ex
:			Invoke one ex command from vi editor
%			Current filename (substitutes into ex command line)
#			Alternate filename (substitutes into ex command line)
```

### 45.2.4 vi Command-Mode Tag Commands

```text
Command			Action
^]			Look up the location of the identifier under the cursor in the tags file and move to that location; if tag stacking is enabled, the current location is automatically pushed onto the tag stack
^T			Return to the previous location in the tag stack, i.e., pop off one element
:pop
```

### 45.2.5 Buffer Names

```text
Buffer Names		Buffer Use
19			The last nine deletions, from most to least recent
az			Named buffers to use as needed; uppercase letters append to the buffer
```

### 45.2.6 Buffer and Marking Commands

```text
Command			Meaning
"b command		Do command with buffer b
mx			Mark current position with x
'x			Move cursor to first character of line marked by x
`x			Move cursor to character marked by x
` `			Return to exact position of previous mark or context
' '			Return to beginning of the line of previous mark or context
```

## 45.3 Input Mode Shortcuts

### 45.3.1 Word Abbreviation

```text
:ab abbr phrase
    Define abbr as an abbreviation for phrase.

:unab abbr
    Remove definition of abbr.

Be careful with abbreviation texts that either end with the abbreviation name or contain the abbreviation name in the middle.
```

### 45.3.2 Command and Input Mode Maps

#### 45.3.2.1 Syntax

```text
:map  x sequence
    Define character(s) x as a sequence of editing commands.

:unmap  x
    Disable the sequence defined for x.

:map
    List the characters that are currently mapped.

:map!  x sequence
    Define character(s) x as a sequence of editing commands or text that will be recognized in input mode.

:unmap!  x
    Disable the sequence defined for the input mode map x.

:map!
    List the characters that are currently mapped for interpretation in insert mode.

For both command and input mode maps, the map name x can take several forms:


One character
    When you type the character, vi executes the associated sequence of commands.

Multiple characters
    All the characters must be typed within one second. The value of notimeout changes the behavior.

# n
    Function key notation: a # followed by a digit n represents the sequence of characters sent by the terminal's function key number n.

To enter characters such as Escape (^[) or carriage return (^M), first type a CTRL-V (^V).
```

#### 45.3.2.1 Tutorial

```text
Command mapping
You define your own new command by mapping a sequence of commands to a single or several key stroke(s).

    :map new_command command_sequence 

Here both the new_command and command_sequence can be a sequence of characters.

To input a special character such as Esc, or Ctrlf you will need to push Ctrlv first, then hit the special key. For the Space key, you'll need two Ctrlvs. For example, using this map

    :map CtrlvCtrlvSpace CtrlvCtrlf 

when you press the Space key, the cursor is moved forward by a screen.

An alternative way to input special keys is using the special names defined by vim. Here is some examples:
Ctrlk		<c-k>
Ctrlw		<c-w>
Space		<space>
Enter		<enter>
Esc		<esc>
You can find out other key names by typing :help. Using this instead of the Ctrlv way in map definition is more convenient and reliable.
Examples

    * Press gi to insert a character

          :map gi iSpaceCtrlvEscr 

      or

          :map gi i<space><esc>r 

    * Press # to get a current date stamp

          :map # :r!dateCtrlvEnter 

      or

          :map # :r!date<enter> 

    * Press Space to move cursor forward by a screen

          :map CtrlvCtrlvSpace CtrlvCtrlf 

    * Press @, to produce a block of text
      map command on one line in the command mode of vi:

          :map @ oif X CtrlvEnter Tab then aCtrlvEnter Tab else b CtrlvEsc 

      when you push @ in command mode, you will get

             if X
                  then a
                  else b

      The o command opens a new line below and enters insert mode. Everything from the o until the Esc character is entered in the insert mode. The Ctrlv allows you to enter keys like Enter and Esc into the command sequence. 

Ctrlq or Ctrlv ?
Again, in newer versions of Windows gvim you may find Ctrlv not working. That is because it is mapped to do pasting. In this case, to enter the visual block mode, or input a special key in defining mapping, you may use Ctrlq instead. And if you find that inconvenient and inconsistent, you either remove the line in your _vimrc file which contains the word mswin, or you can unmap the Ctrlv by

    :unmap <c-v> 


		45.3.3 Named buffers provide yet another way to create "macros"complex command sequences you can repeat with a few keystrokes. Here's how it's done:

   a.  Type a vi command sequence or an ex command preceded by a colon ; return to command mode.
   b.  Delete the text into a named buffer.
   c.  Execute the buffer with the @ command followed by the buffer letter.

The ex command :@buf-name works similarly.

Some versions treat * identically to @ when used from the ex command line. In addition, if the buffer character supplied after the @ or * commands is *, the command is taken from the default (unnamed) buffer.
```

### 45.3.4 Automatic Indentation

```text
You enable automatic indentation with the command:

:set autoindent 
Four special input sequences affect automatic indentation:


^T Add one level of indentation; typed in insert mode

^D Remove one level of indentation; typed in insert mode

^ ^D Shift the cursor back to the beginning of the line, but only for the current line[1]

0 ^D Shift the cursor back to the beginning of the line and reset the current auto-indent level to zero[2]

Two commands can be used for shifting source code:

<< Shift a line left eight spaces

>> Shift a line right eight spaces

The default shift is the value of shiftwidth, usually eight spaces.
```

## 45.4 Substitution and Regular Expressions

### 45.4.1 The Substitute Command

```text
The general form of the substitute command is:

:[addr1[,addr2]]s/old/new/[flags]

Omitting the search pattern (:s//replacement/) uses the last search or substitution regular expression.

An empty replacement part (:s/pattern//) "replaces" the matched text with nothing, effectively deleting it from the line.

Substitution flags
Flag	Meaning
c	Confirm each substitution
g	Change all occurrences of old to new on each line (globally)
p	Print the line after the change is made

It's often useful to combine the substitute command with the ex global command, :g:

:g/Object Oriented/s//Buzzword compliant/g
```

### 45.4.2 vi Regular Expressions

```text
.  Matches any single character except a newline. Remember that spaces are treated as characters.

* Matches zero or more (as many as there are) of the single character that immediately precedes it.

    The * can follow a metacharacter, such as . or a range in brackets.

^ When used at the start of a regular expression, ^ requires that the following regular expression be found at the beginning of the line. When not at the beginning of a regular expression, ^ stands for itself.

$ When used at the end of a regular expression, $ requires that the preceding regular expression be found at the end of the line. When not at the end of a regular expression, $ stands for itself.

\ Treats the following special character as an ordinary character. (Use \ \ to get a literal backslash.)

[ ] Matches any one of the characters enclosed between the brackets. A range of consecutive characters can be specified by separating the first and last characters in the range with a hyphen.

    You can include more than one range inside brackets and specify a mix of ranges and separate characters.

    Most metacharacters lose their special meaning inside brackets, so you don't need to escape them if you want to use them as ordinary characters. Within brackets, the three metacharacters you still need to escape are \ - ]. (The hyphen (-) acquires meaning as a range specifier; to use an actual hyphen, you can also place it as the first character inside the brackets.)

    A caret (^) has special meaning only when it's the first character inside the brackets, but in this case, the meaning differs from that of the normal ^ metacharacter. As the first character within brackets, a ^ reverses their sense: the brackets match any one character not in the list. For example, [^a-z] matches any character that's not a lowercase letter.

\(  \) Saves the pattern enclosed between \ ( and \ ) into a special holding space or "hold buffer." Up to nine patterns can be saved in this way on a single line.

    You can also use the \n notation within a search or substitute string:

    :s/\(abcd\)\1/alphabet-soup/

    changes abcdabcd into alphabet-soup.

\<  \> Matches characters at the beginning (\<) or end (\>) of a word. The end or beginning of a word is determined either by a punctuation mark or by a space. Unlike \(¿\), these don't have to be used in matched pairs.

~ Matches whatever regular expression was used in the last search.
```

### 45.4.3 POSIX character classes

```text
Class		Matching Characters
[:alnum:]	Alphanumeric characters
[:alpha:]	Alphabetic characters
[:blank:]	Space and tab characters
[:cntrl:]	Control characters
[:digit:]	Numeric characters
[:graph:]	Printable and visible (nonspace) characters
[:lower:]	Lowercase characters
[:print:]	Printable characters (includes whitespace)
[:punct:]	Punctuation characters
[:space:]	Whitespace characters
[:upper:]	Uppercase characters
[:xdigit:]	Hexadecimal digits

Note that in normal mode you'll need double brackets, for example:
/[[:digit:]]
will search for digits
```

### 45.4.4 Metacharacters Used in Replacement Strings

```text
\ n Is replaced with the text matched by the n th pattern previously saved by \( and \), where n is a number from 1 to 9, and previously saved patterns (kept in hold buffers) are counted from the left on the line.

\ Treats the following special character as an ordinary character. To specify a real backslash, type two in a row ( \ \ ).

& Is replaced with the entire text matched by the search pattern when used in a replacement string. This is useful when you want to avoid retyping text.

~ The string found is replaced with the replacement text specified in the last substitute command. This is useful for repeating an edit.

\u or \l Changes the next character in the replacement string to upper- or lowercase, respectively.

\U or \L and \e or \E 
    \U and \L are similar to \u or \l, but all following characters are converted to upper- or lowercase until the end of the replacement string or until \e or \E is reached. If there is no \e or \E, all characters of the replacement text are affected by the \U or \L.
```

### 45.4.5 More Substitution Tricks

```text
    * You can instruct vi to ignore case by typing :set ic.
    *
A simple :s is the same as :s//~/.  *

      :& is the same as :s. You can follow the & with a g to make the substitution globally on the line, and even use it with a line range.  * 
      The & key can be used as a vi command to perform the :& command, i.e., to repeat the last substitution.
    * The :~ command is similar to the :& command, but with a subtle difference. The search pattern used is the last regular expression used in any command, not necessarily the one used in the last substitute command.
    * Besides the / character, you may use any nonalphanumeric, nonwhitespace character as your delimiter, except backslash, double-quote, and the vertical bar (\, ", and |).
    * When the edcompatible option is enabled, vi remembers the flags (g for global and c for confirmation) used on the last substitute and applies them to the next one.  
```

## 45.5 ex Commands

### 45.5.1 Command Syntax

```text
:[address] command [options]
```

### 45.5.2 Address Symbols

```text
Address			Includes
1,$			All lines in the file
x,y			Lines x through y
x;y			Lines x through y, with current line reset to x
0			Top of file
.			Current line
n			Absolute line number n
$			Last line
%			All lines; same as 1,$
x-n			n lines before x
x+n			n lines after x
-[n]			One or n lines previous
+[n]			One or n lines ahead
'x			Line marked with x
'' 			Previous mark
/pat/ or ?pat?		Ahead or back to line where pat matches 
```

### 45.5.3 Command Option Symbols

```text
Symbol			Meaning
!			A variant form of the command
count			Repeat the command count times
file			Filename: % is current file, # is previous file
```

### 45.5.4 Alphabetical List of Commands

```text
Full Name		Command
Abbrev			ab [string text]
Append			[address]a[!]			to use, first type :[address]a and then enter. Then enter text and end by . enter.
			text		
			.
Args			ar
Change			[address] c[!] 
			text
			.
Copy			[address] co destination
Delete			[address] d [buffer]
Edit			e [!][+n] [filename]
File			f [filename]
Global			[address]g[!]/pattern/[commands]
Insert			[address]i[!]
			text
			.
Join			[address]j[!][count]
K (mark)		[address] k char
List			[address] l [count]
Map			map char commands
Mark			[address] ma char
Move			[address] m destination
Next			n[!] [[+command] filelist]
Number			[address] nu [count]
Open			[address] o [/pattern/]
Preserve		pre
Print			[address] p [count] [address] P [count]
Put			[address] pu [char]
Quit			q[!]
Read			[address] r filename
Read			[address] r ! command
Recover			rec [filename]
Rewind			rew[!]
Set	
			set
			set option
			set nooption
			6set option=value
			set option?
Shell			sh
Source			so filename
Substitute		[addr] s [/pat/repl/][opts]
T (to)			[address]t destination
Tag			[address] ta tag
Unabbreviate		una word
Undo			u
Unmap			unm char
V (global exclude)	[address] v/pattern/[commands]
Version			ve
Visual			[address] vi [type] [count]
Visual			vi [+n] [filename]
Write			[address] w[!] [[>>]filename]
Write			[address] w !command
Wq (write + quit)	wq[!]
Xit			x
Yank			[address] y [char] [count]
Z (position line)	[address] z[type] [count]

type can be one of: 
			+ Place line at the top of the window (default)
			- Place line at bottom of the window
			.  Place line in the center of the window
			^ Print the previous window
			= Place line in the center of the window and leave the current line at this line

!			[address] !command
=			(line number)	[address] =
< > (shift)		[address] < [count]
			[address] > [count]
Address			address
Return (next line)	RETURN
&			[address] & [options] [count] repeat substitute
~			[address]~[count] Like &, but with last used regular expression; for details, see Chapter 6 of Learning the vi Editor
```

## 45.6 vi Options

```text
Option			Default
autoinden(ai)		noai
autoprint(ap)		ap
autowrite(aw)		noaw
beautify (bf)		nobf
directory(dir)		/tmp
edcompatible		noedcompatible
errorbells (eb)		errorbells
exrc (ex)		noexrc
hardtabs (ht)		8
ignorecase (ic)		noic
lisp			nolisp
list			nolist
magic			magic
mesg			mesg
novice			nonovice
number (nu)		nonu
open			open
optimize (opt)		noopt
paragraphs (para)	IPLPPPQP LIpplpipbp
prompt			prompt
readonly (ro)		noro
redraw (re)	 
remap			remap
report			5
scroll			half window
sections (sect)		SHNHH HU
shell (sh)		/bin/sh
shiftwidth (sw)		8
showmatch (sm)		nosm
showmode		noshowmode
slowopen (slow)		 
tabstop (ts)		8
taglength (tl)		0
tags	tags		/usr/lib/tags
tagstack		tagstack
term			(from $TERM)
terse			noterse
timeout 		(to)	timeout
ttytype			(from $TERM)
warn			warn
window (w)	 
wrapscan (ws)		ws
wrapmargin (wm)		ws0
writeany (wa)		wsnowa
```

## 45.7 VIM

### 45.7.1 Important Command-Line Arguments, flags, parameters

```text
		For help on all flags do :h -font (or any other flag)
c command 
    Execute command at startup. (POSIX version of the historic +command )

R Start in read-only mode, setting the readonly option.

s Enter batch (script) mode. This is only for ex and intended for running editing scripts (POSIX version of the historic "" argument).

b Start in binary mode.

f For the GUI version, stay in the foreground.

g 
    Start the GUI version of vim, if it has been compiled in.

o [N] 
    Open N windows, if given; otherwise open one window per file.

i viminfo 
    Read the given viminfo file for initialization, instead of the default viminfo file.

n Don't create a swap file: recovery won't be possible.

q filename 
    Treat filename as the "quick fix" file.

u vimrc 
    Read the given .vimrc file for initialization and skip all other normal initialization steps.

U gvimrc 
    Read the given .gvimrc file for GUI initialization and skip all other normal GUI initialization steps.

Z Enter restricted mode (same as having a leading r in the name).

w
-w {scriptout}	All the characters that you type are recorded in the file
		"scriptout", until you exit Vim.  This is useful if you want
		to create a script file to be used with "vim -s" or
		":source!".  When the "scriptout" file already exists, new
		characters are appended.  See also |complex-repeat|.
		{scriptout} cannot start with a digit.
		{not in Vi}
```

### 45.7.2 vim Window Management Commands

```text
Command				Function
[N]sp[lit] [position] [file]	Split the current window in half
[N]new [position] [file]	Create a new window, editing an empty buffer
[N]sv[iew] [position] [file]	Same as :split, but set the readonly option for the buffer
q[uit][!]			Quit the current window (exit if given in the last window)
clo[se][!]			Close the current window; behavior affected by the hidden option
hid[e]				Close the current window, if it's not the last one on the screen
on[ly]				Make this window the only one on the screen
res[ize] [±n]			Increase or decrease the current window height by n
res[ize] [n]			Set the current window height to n if supplied, otherwise, set it to the largest size possible without hiding the other windows
qa[ll][!]			Exit vim
wqa[ll][!]			Write all changed buffers and exit
xa[ll][!]
wa[ll][!]			Write all modified buffers that have filenames
[N]sn[ext]			Split the window and move to the next file in the argument list, or to the N th file if a count is supplied
sta[g] [tagname]		Split the window and run the :tag command as appropriate in the new window
```

#### 45.7.2.1 Window commands from vi mode

```text
Command			Function
^W s			Same as :split without a file argument; ^W ^S may not work on all terminals
^W S
^W ^S			 
^W n			Same as :new without a file argument
^W ^N			 
^W ^			Perform :split #, split the window, and edit the alternate file
^W ^^
^W q			Same as the :quit command; ^W ^Q may not work on all terminals
^W ^Q
^W c			Same as the :close command
^W o			Like the :only command
^W ^O	 
^W <DOWN>		Move cursor to n th window below the current one
^W j
^W ^J	 
^W <UP>			Move cursor to n th window above the current one
^W k
^W ^K			 
^W w			With count, go to n th window; otherwise, move to the window below the current one; if in the bottom window, move to the top one
^W ^W
^W W			With count, go to n th window; otherwise, move to window above the current one; if in the top window, move to the bottom one
^W t			Move the cursor to the top window
^W ^T			 
^W b			Move the cursor to the bottom window
^W ^B			 
^W p			Go to the most recently accessed (previous) window
^W ^P			 
^W r			Rotate all the windows downwards; the cursor stays in the same window
^W ^R
^W R			Rotate all the windows upwards; the cursor stays in the same window
^W x			Without count, exchange the current window with the next one; if there is no next window, exchange with the previous window. With count, exchange the current window with the n th window (first window is 1; the cursor is put in the other window)
^W ^X
^W =			Make all windows the same height.
^W -			Decrease current window height
^W +			Increase current window height
^W _			Set the current window size to the value given in a preceding count
^W ^_
zNRETURN		Set the current window height to N
^W ]			Split the current window; in the new upper window, use the identifier under the cursor as a tag and go to it
^W ^]
^W f			Split the current window and edit the filename under the cursor in the new window
^W ^F
^W i			Open a new window; move the cursor to the first line that matches the keyword under the cursor
^W ^I
^W d			Open a new window, with the cursor on the first macro definition line that contains the keyword under the cursor
^W ^D
```

### 45.7.3 Extended Regular Expressions

```text
\| 
    Indicates alternation.

\+ 
    Matches one or more of the preceding regular expressions.

\= 
    Matches zero or one of the preceding regular expression.

\{ n, m} 
    Matches n to m of the preceding regular expression, as much as possible. n and m are numbers between 0 and 32,000; vim only requires the left brace to be preceded by a backslash, but not the right brace.

\{ n} 
    Matches n of the preceding regular expression.

\{ n,} 
    Matches at least n of the preceding regular expression, as much as possible.

\{, m} 
    Matches 0 to m of the preceding regular expression, as much as possible.

\{} 
    Matches 0 or more of the preceding regular expressions, as much as possible (same as *).

\{- n, m} 
    Matches n to m of the preceding regular expression, as few as possible.

\{- n} 
    Matches n of the preceding regular expression.

\{- n,} 
    Matches at least n of the preceding regular expression, as few as possible.

\{-, m} 
    Matches 0 to m of the preceding regular expression, as few as possible.

\i 
    Matches any identifier character, as defined by the isident option.

\I 
    Like \i, excluding digits.

\k 
    Matches any keyword character, as defined by the iskeyword option.

\K 
    Like \k, excluding digits.

\f 
    Matches any filename character, as defined by the is-fname option.

\F 
    Like \f, excluding digits.

\p 
    Matches any printable character, as defined by the isprint option.

\P 
    Like \p, excluding digits.

\s 
    Matches a whitespace character (exactly space or tab).

\S 
    Matches anything that isn't a space or a tab.

\b 
    Backspace.

\e 
    Escape.

\r 
    Carriage return.

\t 
    Tab.

\n 
    Reserved for future use.

~ 
    Matches the last given substitute (i.e., replacement) string.

\(...\) 
    Provides grouping for *, \+, and \=, as well as making matched subtexts available in the replacement part of a substitute command (\1, \2, etc.).

\1 
    Matches the same string that was matched by the first subexpression in \( and \). \2, \3 and so on may be used to represent the second, third, and so forth subexpressions.

The isident, iskeyword, isfname, and isprint options define the characters that appear in identifiers, keywords, and filenames, and that are printable, respectively.
```

### 45.7.4 Command-Line History and Completion

#### 45.7.4.1 History commands

```text
Key			Meaning
 ^ |			Move up (previous), down (more recent) in the history
 | V
<- -> 			Move left, right on the recalled line
INS			Toggle insert/overstrike mode; default is insert mode
BACKSPACE		Delete characters
SHIFT or CONTROL	combined with or 	Move left or right one word at a time
^B or HOME		Move to the beginning of the command line
^E or END		Move to the end of the command line

If vim is in vi compatibility mode, ESC acts likes RETURN and executes the command. When vi compatibility is turned off, ESC exits the command line without executing anything.

The wildchar option contains the character you type when you want vim to do a completion. The default value is the tab character. You can use completion for the following:


Command names 
    Available at the start of the command line

Tag values 
    After you've typed :tag

Filenames 
    When typing a command that takes a filename argument (see :help suffixes for details)

Option values 
    When entering a :set command, for both option names and their values
```

#### 45.7.4.2 Completion commands

```text
Command			Function
^D			List the names that match the pattern; for filenames, directories are highlighted
Value of wildchar	(Default: tab) Performs a match, inserting the generated text; hitting TAB successively cycles among all the matches
^N			Go to next of multiple wildchar matches, if any; otherwise recall more recent history line
^P			Go to previous of multiple wildchar matches, if any; otherwise recall older history line
^A			Insert all names that match the pattern
^L			If there is exactly one match, insert it; otherwise, expand to the longest common prefix of the multiple matches
```

### 45.7.5 Tag Stacks

#### 45.7.5.1 Tag commands

```text
Command				Function
ta[g][!] [tagstring]		Edit the file containing tagstring as defined in the tags file
[count]ta[g][!]			Jump to the count th newer entry in the tag stack
[count]po[p][!]			Pop a cursor position off the stack, restoring the cursor to its previous position
tags				Display the contents of the tag stack
ts[elect][!] [tagstring]	List the tags that match tagstring, using the information in the tags file(s)
sts[elect][!] [tagstring]	Like :tselect, but splits the window for the selected tag
[count]tn[ext][!]		Jump to the count th next matching tag (default 1)
[count]tp[revious][!]		Jump to the count th previous matching tag (default 1)
[count]tN[ext][!]
[count]tr[ewind][!]		Jump to the first matching tag; with count, jump to the count th matching tag
tl[ast][!]			Jump to the last matching tag
```

#### 45.7.5.2 Command-mode tag commands

```text
Command				Function
^]				Look up the location of the identifier under the cursor in the tags file and move to that location; the current location is automatically pushed to the tag stack
g <LeftMouse>
CTRL-<LeftMouse>
^T				Return to the previous location in the tag stack, i.e., pop off one element
```

### 45.7.6 Edit-Compile Speedup

#### 45.7.6.1 Program development commands

```text
Command				Function
mak[e] [arguments]		Run make, based on the settings of several options as described in the next table, then go to the location of the first error
cf[ile][!] [errorfile]		Read the error file and jump to the first error
cl[ist][!]			List the errors that include a filename
[count]cn[ext][!]		Display the count th next error that includes a filename
[count]cN[ext][!]		Display the count th previous error that includes a filename

[count]cp[revious][!]
clast[!] [n]			Display error n if supplied; otherwise, display the last error
crewind[!] [n]			Display error n if supplied
cc[!] [n]			Displays error n if supplied, otherwise redisplays the current error
cq[uit]				Quit with an error code, so that the compiler won't compile the same file again; intended primarily for the Amiga compiler
```

#### 45.7.6.2 Program development options

```text
Option			Value			Function
shell			/bin/sh			The shell to execute the command for rebuilding your program
makeprg			make			The program that actually handles the recompilation
shellpipe		2>&1| tee		Whatever is needed to cause the shell to save both standard output and standard error from the compilation in the error file
makeef			/tmp/vim##.err		The name of a file that will contain the compiler output; the ## causes vim to create unique filenames
errorformat		%f:%l:\ %m	A description of what error messages from the compiler look like; this example value is for GCC, the GNU C compiler
```

### 45.7.7 Programming Assistance

#### 45.7.7.1 Indentation and formatting options

```text
Option				Function
autoindent			Simple-minded indentation; uses that of the previous line
smartindent			Similar to autoindent, but knows a little about C syntax; deprecated in favor of cindent
cindent	Enables 		automatic indenting for C programs and is quite smart; C formatting is affected by the rest of the options in this table
cinkeys				Input keys that trigger indentation options
cinoptions			Tailor your preferred indentation style
cinwords			Keywords that start an extra indentation on the following line
formatoptions			A number of single-letter flags that control several behaviors, notably how comments are formatted as you type them
comments			Describes different formatting options for different kinds of comments, both those with starting and ending delimiters, as in C, and those that start with a single symbol and go to the end of the line, such as in a Makefile or shell program
```

#### 45.7.7.2 Identifier search commands

```text
Command				Function
[i				Display the first line that contains the keyword under the cursor
]i				Display the first line that contains the keyword under the cursor, but starts the search at the current position in the file; this command is most effective when given a count
[I				Display all lines that contain the keyword under the cursor; filenames and line numbers are displayed
]I				Display all lines that contain the keyword under the cursor, but start from the current position in the file
[ ^I				Jump to the first occurrence of the keyword under the cursor
] ^I				Jump to the first occurrence of the keyword under the cursor, but start the search from the current position
^W i				Open a new window showing the location of the first (or count th) occurrence of the identifier under the cursor
^W ^I
[d				Display the first macro definition for the identifier under the cursor
]d				Display the first macro definition for the identifier under the cursor, but start the search from the current position
[D				Display all macro definitions for the identifier under the cursor; filenames and line numbers are displayed
]D				Display all macro definitions for the identifier under the cursor, but start the search from the current position
[ ^D				Jump to the first macro definition for the identifier under the cursor
] ^D				Jump to the first macro definition for the identifier under the cursor, but start the search from the current position
^W d				Open a new window showing the location of the first (or count th) macro definition of the identifier under the cursor
^W ^D
```

#### 45.7.7.3 Identifier search commands from ex mode

```text
Command						Function
[range]is[earch][!] [count] [/]pattern[/]	Like [i and ]i but searches in range lines (the default is the whole file). Without the slashes, a word search is done; with slashes, a regular expression search is done
[range]il[ist][!] [/]pattern[/]			Like [I and ]I but searches in range lines; the default is the whole file
[range]ij[ump][!] [count] [/]pattern[/]		Like [ ^I and ] ^I but searches in range lines; the default is the whole file
[range]isp[lit][!] [count] [/]pattern[/]	Like ^W i and ^W ^I but searches in range lines; the default is the whole file
[range]ds[earch][!] [count] [/]pattern[/]	Like [d and ]d but searches in range lines; the default is the whole file
[range]dl[ist][!] [/]pattern[/]			Like [D and ]D but searches in range lines; the default is the whole file
[range]dj[ump][!] [count] [/]pattern[/]		Like [ ^D and ] ^D but searches in range lines. The default is the whole file.
[range]dsp[lit][!] [count] [/]pattern[/]	Like ^W d and ^W ^D but searches in range lines; the default is the whole file
che[ckpath][!]					List all the included files that couldn't be found; with the !, list all the included files
```

#### 45.7.7.4 Extended matching commands

```text
Command			Function
%			Extended to match the /* and */ of C comments, and also the C preprocessor conditionals, (#if, #endif, etc.)
[(			Move to the count th previous unmatched (
[)			Move to the count th next unmatched )
[{			Move to the count th previous unmatched {
[}			Move to the count th next unmatched }
[#			Move to the count th previous unmatched #if or #else
]#			Move to the count th next unmatched #else or #endif
[*, [/			Move to the count th previous unmatched start of a C comment, /*
]*, ]/			Move to the count th next unmatched end of a C comment, */ 
```

### 45.7.8 Vim 5.1 Set Options

```text
Option			Default
background (bg)		dark or light
backspace (bs)		0
backup (bk)		nobackup
backupdir (bdir)		.,~/tmp/,~/
backupext (bex)		~
binary (bin)		nobinary
cindent (cin)		nocindent
cinkeys (cink)		0{,0},:,0#,!^F,o,O,e
cinoptions (cino)	 
cinwords (cinw)		if,else,while,do,for,switch
comments (com)	 
compatible (cp)		cp, nocp when a .vimrc file is found
cpoptions (cpo)		aABceFs
define (def)		^#\s*define
directory (dir)		.,~/tmp,/tmp
equalprg (ep)		 
errorfile (ef)		errors.err
errorformat (efm)	(Too long to print)
expandtab (et)		noexpandtab
fileformat (ff)		unix
fileformats (ffs)	dos,unix
formatoptions (fo)	vim default: tcq; vi default: vt
gdefault (gd)		nogdefault
guifont (gfn)	 
hidden (hid)		nohidden
hlsearch (hls)		hidnohlsearch, set on or off for highlithing last search pattern
history (hi)		hidvim default: 20; vi default: 0
icon	noicon
iconstring		hid 
include (inc)		hid^#\s*include
incsearch (is)		hidnoincsearch
isfname (isf)		hid@,48-57,/,.,-,_,+,,,$,:,~
isident (isi)		hid@,48-57,_,192-255
iskeyword (isk)		hid@,48-57,_,192-255
isprint (isp)		hid@,161-255
makeef (mef)		hid/tmp/vim##.err
makeprg (mp)		hidmake
mouse	 
mousehide (mh)		hidnomousehide
paste			nopaste
ruler (ru)		hidnoruler
secure			nosecure
shellpipe (sp)	 
shellredir (srr)	 
showmode (smd)		vim default: smd; vi default: nosmd
sidescroll (ss)		0
smartcase (scs)		nosmartcase
suffixes		*.bak,~,.o,.h,.info,.swp
taglength (tl)		0
tagrelative (tr)	vim default: tr; vi default: notr
tags (tag)		./tags,tags
tildeop (top)		notildeop
undolevels (ul)		1000
viminfo (vi)	 
writebackup (wb)	writebackup
```
