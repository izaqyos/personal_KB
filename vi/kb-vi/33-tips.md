---
type: reference
title: Tips.
description: Section 33 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33"
---

# Tips.

[↑ KB_vi](/vi/kb-vi/README.md)

## 33.1 Edit word docs with VIM

```text
		antiword (http://www.winfield.demon.nl/) is written by Adri van Os
		windows version can be found at:
		(http://www.informatik.uni-frankfurt.de/~markus/antiword/)

		download and install it (and put it in your path)

		antiword takes a ms-word filename from the command line and spits it out in text/plain. it does not take input from stdin

		all you gotta do to get vim to view ms-word files is to add lines to your .vimrc similar to:

		autocmd BufReadPre *.doc set ro
		autocmd BufReadPre *.doc set hlsearch!
		autocmd BufReadPost *.doc %!antiword "%"

		now, when you're curious you can do: vim resume.doc to view a text version of your ms-word document (hitting <enter> on .doc file in your .vimprojects list works too)

		but that's not too fun on it's own.

		one thing ms-word can't do (properly), is do a diff on two versions.
		however, if you're on a windows system, in explorer, try -> selecting resume-1.1.doc and resume-1.2.doc -> right click -> "Diff with Vim"

		you could probably also do: vim -d resume-1.1.doc resume-1.2.doc
		to achieve the same effect
```

## 33.2 Edit PDF docs with VIM

```text
		Get the free Xpdf from (http://www.foolabs.com/xpdf/download.html).  For Win32 specifically, you can get the zip file and just extract pstopedf.exe.

		Now add the following to your .vimrc:

		autocmd BufReadPre *.pdf set ro
		autocmd BufReadPost *.pdf %!pdftotext -nopgbrk "%" -

		And that's it!  And just like for MS-Word files, this allows you to use VIM to diff two pdf files very nicely.
		To Diff to pdf files: vim -d doc.pdf doc2.pdf
```

## 33.3 VimTip 12: Converting tabs to spaces

```text
http://vim.sourceforge.net/tip_view.php?tip_id=


To insert space characters whenever the tab key is pressed, set the
'expandtab' option:

        set expandtab

With this option set, if you want to enter a real tab character use
Ctrl-V<Tab> key sequence.

To control the number of space characters that will be inserted when
the tab key is pressed, set the 'tabstop' option.  For example, to
insert 4 spaces for a tab, use:

        set tabstop=4

After the 'expandtab' option is set, all the new tab characters entered
will be changed to spaces.  This will not affect the existing tab
characters.  To change all the existing tab characters to match the
current tab settings, use

        :retab

To change the number of space characters inserted for indentation, use
the 'shiftwidth' option:

        set shiftwidth=4

For example, to get the following coding style,
        - No tabs in the source file
        - All tab characters are 4 space characters

use the following set of options:

        set tabstop=4
        set shiftwidth=4
        set expandtab

Add the above settings to your .vimrc file.

To get more help on these options, use
:help tabstop
:help shiftwidth
:help expandtab
```

## 33.4 VimTip 29: reverse all the line with only 7 keystroke in vim

```text
http://vim.sourceforge.net/tip_view.php?tip_id=

:g/^/m0
well, 
a. : bring you to command-line mode(also known as ex-mode) from normal-mode(also known as command mode).
b. g means you'll take an action through the whole file, generally perform a search, `v' also perform a search but it match the line not match the canonical expression.
c. / begins the regular express
d. ^ is a special character respect the start of a line.
e. the second / ends the regular express and indicate that the remains is action to do.
f. m means move, `t` and `co' for copy, `d' for delete
g. 0 is the destination line.

you can use 
:g/regexp/t$
to filter all lines and pick the match line together and copy them to the end of the buffer or
:g/regexp/y A
to put them into a register(not eax, ebx...)
```

## 33.5 Filter out lines with pattern

```text
		To delete the lines:
		:g/pattern/d

		To print the lines:
		:g/pattern/p
```

## 33.6 delete all lines in file

### 33.6.1 ggdG

```text
			gg- go to start of file and d - delete until G- end of file
```

### 33.6.2 :1,$d

```text
			same as in ed from delete from first line in file to last line
```

### 33.6.3 Yank all lines instead of delete, :1,$y

### 33.6.4 yank all lines bettween markers :'a,'by

## 33.7 Essential to know

```text
	----------------------------------------
	* # g* g#           : find word under cursor (<cword>) (forwards/backwards)
	%                   : match brackets {}[]()
	.                   : repeat last modification 
	@:                  : repeat last : command (then @@)
	matchit.vim         : % now matches tags <tr><td><script> <?php etc
	<C-N><C-P>          : word completion in insert mode
	<C-X><C-L>          : Line complete SUPER USEFUL
	/<C-R><C-W>         : Pull <cword> onto search/command line
	/<C-R><C-A>         : Pull <CWORD> onto search/command line
	:set ignorecase     : you nearly always want this
	:syntax on          : colour syntax in Perl,HTML,PHP etc
	:h regexp<C-D>      : type control-D and get a list all help topics containing
			      regexp (plus use TAB to Step thru list)
```

## 33.7 Abbrevations

```text
VimTip 43: Using abbreviations
http://vim.sourceforge.net/tip_view.php?tip_id=
To define abbreviations, use the ab[breviate] command.
Examples:
:ab rtfm read the fine manual  -  Whenever you type 'rtfm' followed by a <space> (or <esc> or <cr>) vim
                                  will expand this to 'read the fine manual'.
:ab                            -  list all defined abbreviations
:una[bbreviate] rtfm           -  remove 'rtfm' from the list of abbreviations
:abc[lear]                     -  remove all abbreviations
NB: To avoid expansion in insert mode, type CTRL-V after the last character of the abbreviation. 
For a detailed description of the ab[breviate] command and some more examples refer to
:help abbreviations
```

## 33.8 Windows

### 33.8.1 Tip: #886 - Add Vim to Windows Send To menu

```text
Easily open any file(s) in Vim with any options you like by adding a shortcut to Vim to your SendTo directory, located at "C:\Documents and Settings\<YOUR USER NAME>\SendTo". This will add vim.exe (or gvim.exe) to the "Send To" context menu.

You can specify any options you like with this shortcut by editing the "target" field under the shortcut properties. For example:

    * You can add a "diff in Vim" shortuct with "C:\Program Files\Vim\vim71\gvim.exe" -d
    * You can make Vim launch the selected files in tabs 

If you do not like using the "Send To" context menu, you can automatically launch files in Vim with file associations (even unknown file types or files with no extension).
```

## 33.9. Tip, make a tar file of buffers.

```text
	make a tar file including path information of all files
	in the current vim buffer.  If you wish to omit paths, leave out the `:p'
		 :silent bufdo !tar -rvf archive.tar %:p

		 The same only commpress result.
		 :silent bufdo !tar -rvfz archive.tarz %:p
		 :silent bufdo !zip proj.zip %:p   : zip all current files
```

## 33.10. Select your favourite font for gvim.

```text
	$ gvim -font courier\ Bold\ 13 <file> 
```

## 33.11 Generate accessor and setter methods from variable names

```text
Courtesy of http://vim.wikia.com/wiki/
Created: January 12th 2008 Complexity: basic Author: gmonfort Version:


If everytime you start writing a class need to declare a lot of private instance variables and their corresponding accessor and setter public methods, you might find this mappings usefull.

" Public Accessors
map <F3> :s/\(\(\w\)\(\w\+\)\).*/public function get\u\2\3(){\r\treturn \$this->\1;\r}/<CR>
" Public Setters
map <S-F3> :s/\(\(\w\)\(\w\+\)\).*/public function set\u\2\3(\$\1){\r\t\$this->\1 = \$\1;\r}/<CR>

Which will transform this:

variable1
variable2
variable3

Into this (using first mapping):

public function getVariable1(){
  return $this->variable1;
}
public function getVariable2(){
  return $this->variable2;
}
public function getVariable3(){
  return $this->variable3;
}

Or this (using second mapping):

public function setVariable1($variable1){
  $this->variable1 = $variable1;
}
public function setVariable2($variable2){
  $this->variable2 = $variable2;
}
public function setVariable3($variable3){
  $this->variable3 = $variable3;
}
```

## 33.12 Automatically create and update cscope database

```text
From Vim Tips Wiki

Created: June 21, 2007 Complexity: basic Author: Zhaojun WU Version: 7.0

In order to create or update the cscope database in current directory, the following key mapping would help a bit:

nmap <F11> :!find . -iname '*.c' -o -iname '*.cpp' -o -iname '*.h' -o -iname '*.hpp' > cscope.files ;
  \ cs kill -1<CR>:cs add cscope.out<CR>

In the above mapping, I use "find" to collect the C/C++ source code files and (re)create the cscope database; then "kill -1" to kill all cscope database connections and finally, the newly created "cscope.out" database is added by "cs add cscope.out".

There are two limitations in this key mapping:

|   1. the current directory should be the root path of the project
|   2. I don't know how to get the current cscope data connection number, so that I use "kill -1" to kill "all" cscope database connections, since actually I always only create one connections in one Vim instance. It is not practical if you are using multiple data connections in one vim instance. 
```

## 33.13 To switch back to normal mode automatically after inaction

```text
Created: December 9, 2007 Complexity: basic Author: Anon Version: 7.0

Looking for a way to exit insert mode automatically when you haven't typed anything for a few seconds?

Try:

au! CursorHoldI * stopinsert
```

## 33.14 Word frequency statistics for a file

```text
From Vim Tips Wiki
Jump to: navigation, search

Proposed new tip

Please do not discuss this tip on this page, and do not edit the talk (discussion) page.
All discussion should take place on the proposed new tips page, where we will decide whether to keep this as a new tip, or whether to merge it into an existing tip.

Created: November 13, 2007 Complexity: basic Author: vale.smth Version: 7.0

To generate a table of the occurrence frequency for every word in a file, just enter these commands.

:%s/\_A\+/\t1\r/g
:sort i
:g/\c\(.\+\)\n\1$/norm $yiwj@"^Akdd

In the above, ^A represents CTRL-A, and should be input directly (press CTRL-V then CTRL-A). On Windows, you would probably need to press CTRL-Q then CTRL-A, and you would probably first have to issue the command :unmap <C-A>.

Note that the above changes the file, so you would want to be working on a copy of your text, or you will need to undo the changes.

An amazing tip, but someone should briefly explain how it works.

The 1st command makes every word per line, and appends "1" at the end of each line.

The 2nd command sort lines.

The 3nd command find every pair of lines that are same, adds the number of the 1st line to the 2nd line's, then deletes the 1st line. 
```

## 33.15 Change directory to the file in the current window.

```text
Use :lcd %:p:h to 

The present working directory can be displayed in Vim with:

:pwd

To change to the directory of the currently opened file:

:cd %:h

 References

:help filename-modifiers


 Comments

Here's a mapping to make this easier:

nmap <silent> <Leader>cd :cd %:p:h<CR>

Note the use of :p first expand the % to a full path -- it takes care of the case where you're already in the correct directory. If that happens, %:h expands to an empty string and the :cd command throws an error. %:p:h is safe as it will never send an empty directory into the :cd command.

Note that 'autochdir' can be turned on to automatically switch to the directory of the current buffer upon entering the buffer. Alternatively, try:

nmap <silent> <Leader>sp :sp <c-r>=expand('%:p:h')<CR>/

(The last / can be changed to a backslash if on Windows.) Then, hitting <Leader>sp will produce a command-line all set to allow editing of a file in the same directory as the current buffer.

Also see VimTip64 (Always set your working directory to the file you're editing)

This is very useful. Personally I have these commands defined:

command! CD cd %:p:h
command! LCD lcd %:p:h
```

## 33.16 Paste Indent Problems

```text
Trying to cut a paste from shell running VIM to another shell running VIM, indents are all screwed up -- easy solution!

:set paste

Then, when you are done,

:set nopaste

Turns off autoindenting and stuff like that

I made myself a nice mapping for this. Put the following in your .vimrc, and if you paste and the indentation gets fscked just press C-a.

inoremap <silent> <C-a> <ESC>u:set paste<CR>.:set nopaste<CR>gi

see :h paste
```

## 33.17 Copy an Entire Buffer to the Clipboard

```text
http://vim.wikia.com/wiki/%22copy_all_to_clipboard%22_howto

Vim can access two different clipboard registers: * (primary selection) and + (clipboard). On Windows, either one can be used.

There are a number of ways of copying the entire contents of a file to the clipboard. These include:

Normal Mode

gg"*yG
gg"+yG

:set go+=a
ggVG
ggVGy

:set cb+=unnamed
ggyG

Ex Mode

:%y+

:set cb+=unnamed
:%y

Visual Mode (linewise)

ggoG"+y

:set go+=a
ggoG

Visual Mode (characterwise or blockwise)

VggoG"+y

:set go+=a
VggoG


Windows Specific (with Windows key bindings in effect)

ggVG<c-ins>
<C-A><C-C>

Macintosh Specific

<Cmd-A><Cmd-C>

References

    * :help :yank
    * :help registers
    * :help "+
    * :help 'guioptions'
    * :help 'clipboard'
```

## 33.18 Display line numbers

```text
	http://vim.wikia.com/wiki/VimTip19
This will display line numbers along the left side of a window:

:set number

You can also define a mapping to toggle the option, for example:

:nmap <C-N><C-N> :set invnumber<CR>

By pressing Ctrl-N twice in normal mode, Vim toggles between showing and hiding line numbers.

If you have Vim version 7 or greater, you can change the width of the "gutter" column used for numbering:

:set numberwidth=3

You can use the number column for the text of wrapped lines:

:set cpoptions+=n

Finally, you can change the color used for the line numbers. For example:

:highlight LineNr term=bold cterm=NONE ctermfg=DarkGrey ctermbg=NONE gui=NONE guifg=DarkGrey guibg=NONE
```

## 33.19 Switching case of characters

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

## 33.20 Repeating a sequence of commands without defining a macro

```text
http://vim.wikia.com/wiki/VimTip170
Imagine.

You have just finished a complicated modification of a file, involving numerous replace commands :%s/xxx/yyyy/g, and other ex commands.

Then you realize, you have done it a little bit wrong, and you have to begin all the operation again, just to change one replace string, or do one more operation "somewhere 10 commands ago".

Or you realize, you will have to do the same stuff tomorrow with another file.

Or you realize, you want to perform the same sequence of commands, you have typed a few days ago.

You should have made it a macro (normal command q), but you haven't.

Nothing is lost yet.

You go to the command line (by typing :) and press Ctrl+F. (Ctrl+F in other modes scrolls the screen)

You get a temporary window, listing the history of command line.

It is possible to yank appropriate lines here, make a new file called $VIMRUNTIME/macros/something.vim put those lines here, edit them and save

Then you can call the macro using

:source something.vim

You might want to set variable 'history' to a higher number then default in your vimrc file like

:set history=300

 References

    * :help 'cedit'
    * :help history
    * :help vimrc 

 Comments

You can also bring up the command line history while in Normal mode by typing:

q:

which is just a touch faster than :<Ctrl-F>. (-: (Actually, I didn't even know about Ctrl-F in : mode until I read this tip. Neat!)

Once you execute a command line or search command you can retrieve the text thus:

i<C-R>: - for pasting the recent command line command
i<C-R>/ - for pasting the recent search command
```

## 33.21 Repeat last colon command

```text
http://vim.wikia.com/wiki/VimTip990
The last command entered with ':' can be repeated with @: and further repeats can be done with @@

This is useful for commands like :bnext or :cNext.
 Comments

I scrol through the previous commands with cursor up/down after pressing ':'.

You still can edit the command or just press Enter.

This Tip becomes super useful with something like the following:

:%s/\<pig\>/cow/gie|:update|:next

This facilitates the modification of a series of files.

Note you need the 'e' of the gie

    * g=do as many times as occurs in line
    * i=ignore case
    * e=don't break command if no search string found
```

## 33.22 Repeating an ex command on multiple blocks

```text
http://vim.wikia.com/wiki/VimTip1118

You can use the g// global command to repeat an Ex command on each block of lines in a file. This technique is useful because you don't need a macro, and the command is retained in history for reuse, possibly after editing.

For example, suppose you want to sort each block of text in a file, and you have a blank line before and after each block (including one before the first block, and one after the last block).

You can sort a single block after the cursor position using the command:

:/^$/;/^$/-1sort

This applies the :sort command to a block of lines defined by a range. The first line in the range is the blank line next after the cursor, and the last line is just before (-1) the blank line after that. You must use ; (not ,). See :help :;.

The following uses the global command to sort each block in the file:

:g/^\s*$/;//-1sort

The pattern /^\s*$/ is used to find blank lines, including those consisting of only whitespace (\s). The second pattern (//) is empty, so the first pattern is repeated (search for next blank line).

For the address part you can use '}. '{ and '} find paragraph boundaries.

It would be nice to have shortcuts for these patterns:

\(\%^\|^\n\)\@<=\(.\)\@= : paragraph start
\(.\)\@<=\(\%$\|\n$\)\@= : pragraph end

In normal mode, you can use "Vip:".
```

## 33.23 Here is how to define and use a calculator, using embedded Python. Calculate, arithmetic.

```text
These two lines go in your vimrc:

:command! -nargs=+ Calc :py print <args>
:py from math import *

Now use it inside Vim:

:Calc 2**10+5,2**16,2**128
|1029 65536 340282366920938463463374607431768211456
:Calc sin(pi/2), log(10)
#1.0 2.302585

Convert hexa to decimal
Calc int('43ed', 16)

You have to have Vim compiled with Python support, and have Python on your machine¿. Use :version to see which features are included in your Vim.

If you don't have Python support in your Vim, but do have a python command, use this instead

command! -nargs=+ Calc :!python -c "from math import *; print <args>"

You also get complex numbers and other goodies. Google for Python and math. Here is an example from complex math:

:py from cmath import *
:Calc exp(pi*1j) , " Euler famous identify e^i.pi = -1"
(-1+1.22460635382e-016j)

:Calc reduce(lambda a,b:a+b,range(1,100+1)), "Gauss' famous identity sum(1,100)"
|5050
```

## 33.24 Alternate delimiters for the replace command

```text
From Vim Tips Wiki Tip 406 
Created: January 17, 2003 Complexity: basic Author: Raj Kiran Minimum version: 5.7 Karma: 56/20 Imported from: Tip#406

You don't need to use the slash character as the expression delimiter. Whatever character follows the :s is defined to be the delimiter character. You can use most non-alphanumeric characters (but not \, " or |). This is very handy when working with Unix filenames, as in the following example:

:s#/usr/local/#/opt/#

If you insist on using the normal slash, you have to escape each slash in the pattern with a backslash:

:s/\/usr\/local\//\/opt\//

As you can see, the escaping method is much less readable, so consider carefully your choice of delimiter character!

If I need to replace a '/' character, I use a period '.' ie

 :s.///.fff.

to replace /// with fff

The description alludes to this, but another example seemed to be in order. 
```

## 33.25 Disable built-in command

```text
From Vim Tips Wiki Tip 643 
Created: January 26, 2004 Complexity: intermediate Author: Alfvaen Minimum version: 5.7 Karma: 13/6 Imported from: Tip#643

If there's a built-in key command in Vim that you find annoying, or that you often hit by accident, then you can disable the key by mapping it to nothing. For example:

:map K <Nop>

For "<Nop>", type the five characters as they appear (less-than N o p greater-than).

Of course, you can always

:unmap K

if you start doing C programming and want to instantly "man" things under the cursor again. 
```

## 33.26 Using an expression in substitute command

```text
Tip 755 
Created: June 26, 2004 Complexity: intermediate Author: Raj Kiran Grandhi Minimum version: 5.7 Karma: 66/23 Imported from: Tip#755

You can use an expression as the replacement string in the substitute command (:s). When the replacement string starts with "\=" it is evaluated as an expression. This opens whole new avenue of interesting possiblities. Here are a few examples:

a. Number all the lines in a file:

:%s/^/\=line('.').'^I'/

Note that for ^I you need to press ctrl+I

b. Number a range of lines (from line 10 to line 20):

:10,20s/^/\=line('.').'^I'/

c. Number a range of lines sequentially starting from 1:

:let counter=0|10,20g//let counter=counter+1|s/^/\=counter.'^I'

d. To number all the paragraphs in range starting from 1 (assuming the paragraphs are separated by one or more blank lines):

:let counter=0|1,20g/^$\n^\s*[^\s]/let counter=counter+1|+1s/^/\=counter.'^I'

Note: The above command does not work for the first paragraph in the file if there is no blank line above it.

 References

    * :help sub-replace-special
    * :help sub-replace-expression 

Comments

You can also substitute inside substitute!

:%s/.*/\='cp '.submatch(0).' all/'.substitute(submatch(0),'/','_','g')/

.* is the submatch(0)

The substitute expression will replace any "/" by "_", for example changing line:

sub1/sub2/file1.html

to

cp sub1/sub2/file1.html sub1_sub2_file1.html

See VimTip305 for a few more.

To do incremented columns, check out VimTip150 : incremented, decremented, daynames, dates, etc. 
```

## 33.27 Sorting lines in a file based on the number of words in each line

```text
Here is one use of substitute with an expression (:help sub-replace-expression).

I needed to sort a file according to the number of words in each line. Using the :s command, I inserted the number of words each line contains, at the beginning of the line.

To simplify sorting (using the excellent VisSort, see http://mysite.verizon.net/astronaut/vim/), instead of inserting a number, I put the corresponding character (number plus 64, so a line with one word will start with 'A').

Here is the expression I used:

:%s/^.*/\=nr2char(strlen((substitute(substitute(submatch(0), "\\S\\+", "x", "g"), "\\s","","g")))+64) . "\t" . submatch(0)

Explanation, from the inside out:

Replace all consecutive non space by a single x (each word is now a single x):

part1 = substitute(submatch(0), "\\S\\+", "x", "g")

Remove the spaces between "x":

part2 = substitute(part1,"\\s","","g")

Count the number of "x":

part3 = strlen(part2)

Get the ASCII char representing the number of words + 64:

part4 = nr2char(part3+64)

I replace all lines (^.*) by that ASCII char, followed by a tab and the initial line itself.

I can then sort, then remove all characters between the beginning of lines and the first tab. 
to sort all file
:%!sort

To remove prefix of letter and tab:
%s_^.\t__
```

## 33.28 Save each line in separate numbered files

```text
Tip 1059 


Create this function

function! SaveLines()
  execute line(".") . "w " . line(".") . ".xml"
endf

And call it

%call SaveLines()

The generated files are:

|1.xml
|2.xml
...

each containing a single line.

No need for a function. You can just use

:g/^/exe ".w ".line(".").".txt"

to get the same sort of effect.

Explanation:

:g/^/ # for very line
exe # Execute the following string as an ex command ie :

.w # . means current line so .w means write current line
line(".") # returns current line number

The string generated (for first line is) is
:g/^/exe ".w 1.txt"
```

## 33.29 Send output of g search to a new window

```text
Tip 1063 

Suppose you are using g/pattern/ to display all lines containing some pattern in your file. When you are satisfied with the regex you are using for the pattern, you can press F3 to output the g/pattern/ results to a new window.

To achieve this, you need the following map (place in your vimrc):

nmap <F3> :redir @a<CR>:g//<CR>:redir END<CR>:new<CR>:put! a<CR><CR>

Explanation:

:redir @a         redirect output to register a
:g//              repeat last global command
:redir END        end redirection
:new              create new window
:put! a           paste register a into new window


Send output of last g// to a named file (and open):

:nmap <F4> :redir! >/aaa/xz<CR>:g//<CR>:redir END<CR>:new /aaa/xz<CR><CR>

To not get line numbers printed if line numbers are turned on:

" before g//, store line number state and turn off line numbers; after g//, restore the previous state
:nmap <F3> :let @b=&number<CR>:set nonumber<CR>:redir @a<CR>:g//<CR>:redir END<CR>:let &number=@b<CR>:new<CR>:put! a<CR><CR>
```

## 33.30 Removing automatic comment leaders

```text
http://vim.wikia.com/wiki/VimTip129
Created: October 7, 2001 Complexity: basic Author: Benji Fisher

If you include the "r" or "o" flag in the 'formatoptions' option (:help 'fo', :help fo-table) then the comment leader is inserted automatically when you start a new line in a comment. For example, in TeX the "%" character is the comment leader, and you might type

% This is a tex file.
% The comment leaders on all lines but the first were generated automatically.
% This is the last line of the comment, but Vim will insert the comment leader on the next line.
%

You can get rid of the comment leader (along with anything you may already have typed on the line) without affecting the indent, if any, by typing <C-U> while in Insert mode (in case you do this by accident, there are ways to undo it).

( Recover from accidental Ctrl-U
  You can accidentally lose text that you're typing in  text that you can't recover with undo. This tip allows you to recover your lost text, and to avoid future problems with a mapping.

In insert mode, pressing Ctrl-u deletes text you've typed in the current line, and Ctrl-w deletes the word before the cursor. You can't undo these deletions. However, what you've typed is still in the . register. You can confirm that (after pressing Esc to return to normal mode) with the command :reg which will list all registers (or just :reg . to display the . register). You may be able to copy the missing text from the register display, for example, with the mouse.

Unfortunately, simply pasting the . register won't help because it will repeat the Ctrl-u or Ctrl-w and will delete the text again. However, you can use another register (register a in the following):

:let @a = @.
"aP

The above will paste all the text you last inserted, including what was accidentally deleted.

To avoid the problem in the future, put the following in your vimrc:

inoremap <c-u> <c-g>u<c-u>
inoremap <c-w> <c-g>u<c-w>

Now Ctrl-u and Ctrl-w will work as before, but they first use Ctrl-g u to start a new change, as far as undo is concerned. For example, in insert mode, you might type several lines then accidentally press Ctrl-u which deletes the last line. If you have used the above mapping, you can press Esc to return to normal mode, then u to undo, which will recover the last line.

Generally, when you insert text (after an i or o or other similar command) you make a single modification to the file that forms one undo block. Pressing Ctrl-u or Ctrl-w while in insert mode is just part of that single modification. After pressing Esc to return to Normal mode, if you press u you will undo all your typing. Therefore, you have lost text deleted with Ctrl-u or Ctrl-w.

However, some insert-mode commands break the undo block so the insertion consists of more than a single modification. One of those commands is Ctrl-g u.

    * :help i_CTRL-U Insert mode: <c-u> deletes text entered in the current line.
    * :help i_CTRL-W Insert mode: <c-w> deletes word before cursor.
    * :help i_CTRL-G_u Insert mode: <c-g> u starts a new change.
    * :help ins-special-special Insert mode: Commands which start a new change. 


The following allows you to paste all of "., while using backspace to delete the Ctrl-u at the end (assuming you accidentally typed Ctrl-u):

:put ='<C-R><C-R>.<BS>'

The above command puts the '...' string following the expression register =. Using Ctrl-r twice inserts text from the following register literally.

    * :help c_CTRL-R_CTRL-R
    * :help "=

)'"

Related point: If you want to adjust the indent while in insert mode, you can use <C-D> (to decrease the indent) or <C-T> (to increase it)
```

## 33.31 The super star

```text
Created: February 24, 2001 Complexity: basic Author: Scott+Yegappan

In normal mode, move the cursor to any word. How do you search for the next occurrence of that word?

Press the * key to search forwards for the current word, or press # to search backwards.

Using * or # searches for the exact word at the cursor (searching for rain would not find rainbow).

Use g* or g# if you don't want to search for the exact word.
```

### 33.31.1 Using the mouse

```text
With the proper settings, you can search for an exact word using the mouse.

Shift-LeftClick a word to search forwards, or Shift-RightClick to search backwards.

This needs a GUI version of Vim (gvim), or a console Vim that accepts a mouse. You may need the following line in your vimrc to enable mouse searches:

:set mousemodel=extend

In gvim, click the Edit menu, then Global Settings, then the "tear off" bar at the top. That will show a floating Global Settings menu with useful Toggle Pattern Highlight and Toggle Ignore-case commands.
```

### 33.31.2 More searching

```text
After searching, press n for the next match, or N to search in the reverse direction.

Vim maintains a search history. Type / or ? and use the arrow up/down keys to recall previous search patterns. You can edit a pattern, and press Enter to search for something different.

Suppose the cursor is on a word, and you want to search for a similar word.

Press / then <C-r><C-w> to copy the current word to the command line. You can now edit the search pattern and press Enter. Use <C-r><C-w> for a <cword>, or <C-r><C-a> for a <cWORD>.

<C-r><C-w> is Control-R then Control-W (hold down Ctrl and press r then w).

After searching, use <C-o> to jump back to your previous position (then <C-i> will jump forwards).

After searching, an empty search pattern will repeat the last search. This works with /, :s and :g.

So, after searching for a word, use :%s//new/g to change all occurrences to 'new', or :g/ to list all lines containing the word. See Substitute last search.

You can enter a count before a search. For example 3/pattern will search for the third occurrence of pattern, and 3* will search for the third occurrence of the current word.
```

### 33.31.3 Highlight matches without moving

```text
It can be useful to highlight the word under the cursor like *, but without jumping to the next match. Then you can see the search highlights on the current screen, without any scrolling. Move to the first (ggn), last (GN), next (n) or previous (N) match as usual.

The basic command is (type Ctrl-r then Ctrl-w to insert the current word):

:let @/="<C-r><C-w>"<CR>

The following map uses F10 to highlight all occurrences of the current word, and F11 to unhighlight (put in your vimrc):

nnoremap <F10> :set hls<CR>:let @/="<C-r><C-w>"<CR>
nnoremap <F11> :nohls<CR>

Here is another version that uses F10 to toggle search highlighting (F11 is not used).

nnoremap <F10> :set invhls<CR>:let @/="<C-r><C-w>"<CR>/<BS>

The 'inv' prefix on a boolean setting toggles it. The trailing /<BS> clears the command line.

Position the cursor on an interesting word, then press F10 to highlight all occurrences of that word. Use commands like n and N to search up and down. When you're done, press F10 again to toggle highlighting off.
```

### 33.31.4 Show the next match while entering a search

```text
To move the cursor to the matched string, while typing the search pattern, set the following option in your vimrc:

:set incsearch
```

### 33.31.5 While searching complete current matching word

```text
(Add letters, chars to current search while searching) 

Complete the search by pressing Enter, or cancel the search by pressing Escape. When typing the search pattern, press Ctrl-L (:help c_CTRL-L) to insert the next character from the match or press Ctrl-R Ctrl-W (:help c_CTRL-R_CTRL-F) to complete the current matching word.
```

## 33.32 Open file under cursor

```text
The following commands open the file name under the cursor:

    * gf    open in the same window ("goto file")
    * <c-w>f    open in a new window
    * <c-w>gf    open in a new tab 

When writing a program, it is helpful to set the 'path' option to list the directories with your include files. Then you can easily open an include file.

If there are several files in your 'path' that match the name under the cursor, gf opens the first, while 2gf opens the second, and 3gf opens the third, etc.

You can return to the previous buffer using Ctrl-^ or Ctrl-o.
 References

    * :help gf
    * :help CTRL-W_F
    * :help CTRL-W_gf
    * :help CTRL-^
    * :help CTRL-O
    * :help 'path' directory names used to look for the file 

 Comments

You could list files in 'path' that match the name under under the cursor with:

:echo globpath(&path, expand('<cfile>'))

The plugin searchInRuntime overrides gf and CTRL-W_f to ask which file must be opened if several match. Alternatives for :sp and :vsp are also provided. 
```

## 33.33 Paste registers in search or colon commands instead of using the clipboard

```text
Created: June 20, 2003 Complexity: intermediate Author: rainbrot 

You can type Ctrl-R to insert a register when in insert mode, or when typing in the command or search line. When you press Ctrl-R you will see " (quote) to prompt you to finish the command by entering a register. For example, press Ctrl-R then a to insert the contents of the a register, or Ctrl-R then " to insert the contents of the unnamed register.

You can press v then move the cursor to visually select some text (say the text is "hello world"). If you press y the selected text is yanked (copied) into the unnamed register. You can now type :%s/ then <C-r>" (Ctrl-R quote), which would show the following in the command line:

:%s/hello world

You could complete the substitute command, to read, for example:

:%s/hello world/goodbye everyone/gc

Type <C-r><C-w> to paste the word under the cursor into the command line, or <C-r><C-a> to paste the WORD. 

"
```

## 33.34 Easy edit of files in the same directory, expand, %: operator

```text
To print out the current vim filename:

:help expand
:echo expand("%:p:h")  " absolute path
:echo expand("%:p:h")  " absolute path dirname
:echo expand("%:p:h:h")" absolute path dirname dirname
:echo expand("%.")     " relative path
:echo expand("%.:h")   " relative path dirname
:echo expand("%.:h:h") " relative path dirname dirname

:echo expand("<sfile>:p")  " absolute path to [this] vimscript

:help filename-modifiers
```

### 33.34.1 Tip 2 Update content

```text
While editing a file, you may want to open another file in the same directory. However, navigating to the file can be frustrating if it is not in the current directory.

Using one of the following snippets in your vimrc will help open files while deep in the directory tree. An alternative would be to set the working directory to the current file.
Contents

    * 1 Using a command line abbreviation
    * 2 Using a mapping
    * 3 References
    * 4 Comments
```

#### 33.34.1.1 Using a command line abbreviation

```text
This method uses a command line abbreviation so %% expands to the full path of the directory that contains the current file.

cabbr <expr> %% expand('%:p:h')

For example, while editing file /some/path/myfile.txt, typing :e %%/ on the command line will expand to :e /some/path/. Then you can use completion (press Tab after typing the first few letters of a file name), or press Enter to browse the directory listing. Of course, this abbreviation works anywhere on the command line, so you can use it with :cd, :grep etc.

If your Vim does not support <expr> mappings, try using the expression register to extract the path instead:

cabbr %% <C-R>=expand('%:p:h')<CR>

Note that you have to type a non-keyword character after %% in order to expand the abbreviation. For example, after typing :e %%, you could expand the abbreviation by typing / or by pressing Enter or Ctrl-].
```

#### 33.34.1.2 Using a mapping

```text
While editing file /some/path/myfile.txt, this method allows you to type \e (assuming the default backslash leader) to enter :e /some/path/ on the command line. Again, you can use completion to enter a file name, or press Enter to browse the directory.

nnoremap <Leader>e :e <C-R>=expand('%:p:h') . '/'<CR>

This method is less versatile than the command line abbreviation above.
```

#### 33.34.1.3 References

```text
    * :help cmdline-special % on command line is replaced with current file name
    * :help expand()
    * :help filename-modifiers explanation of '%:p:h' 
```

### 33.34.2 Old tip content, use %/ to expand current file path

```text
Created: February 24, 2001 Complexity: intermediate Author: scott Version: 5.7 
It was often frustrating when I would open a file deep in the code tree and then realize I wanted to open another file in that same directory. Douglas Potts taught me a nice way to do this. Add the following snippet to your vimrc:

" Edit another file in the same directory as the current file
" uses expression to extract path from current file's path
" (thanks Douglas Potts)
if has("unix")
  map ,e :e <C-R>=expand("%:p:h") . '/'<CR>
else
  map ,e :e <C-R>=expand("%:p:h") . '\'<CR>
endif

-> Note, I like this mapping :) map %/ to expand current path
Then when you type ,e in normal mode you can use tab to complete to the file. You can also expand this to allow for splitting, etc.

An alternative is to expand the current file directory while you're on the command line with something like:

if has("unix")
  cmap %/ <C-R>=expand("%:p:h") . '/'<CR>
else
  cmap %/ <C-R>=expand("%:p:h") . '\'<CR>
endif

This has the advantage that you can use it with any command, such as :e, :w, :cd etc. For example, typing:

:cd %/

Would become something like:

:cd /home/username/foo/


"
```

## 33.35 Managing boolean (set) options

```text
Tip 37 Author: slimzhao Version: 6.0

The options that configure Vim are of three types:

    * boolean : on or off (example :help 'autochdir')
    * number : an integer value (example :help 'textwidth')
    * string : a string value (example :help 'backspace') 

Options can be global, or may apply only to a particular buffer or window. :help :setlocal
```

### 33.35.1 Boolean options

```text
The many ways to set a boolean option are best illustrated by a simple example. In the following, the 'number' option is used. Any boolean option, such as wrap, linebreak, diff, etc can be set in these ways.
:set number 	Turn line numbers on
:set nonumber 	Turn line numbers off
:set invnumber
:set number! 	Toggle line numbers
:set number& 	Set option to default value
:set number? 	Show value of option

Replace number with any boolean option.

For nonboolean options, :set option& also sets the option to its default value, and :set option? will display the current value. 
```

### 33.35.2 Toggling an option

```text
If you often need to change an option, you could use a mapping and script as in the following example (which could be placed in your vimrc). In this example, the F12 key is mapped to either enable or disable the mouse.

nnoremap <F12> :call ToggleMouse()<CR>
function! ToggleMouse()
  if &mouse == 'a'
    set mouse=
    echo "Mouse usage disabled"
  else
    set mouse=a
    echo "Mouse usage enabled"
  endif
endfunction

It's easier to toggle a boolean option, for example:

nnoremap <F12> :set number!
```

### 33.35.3 References

```text
    * :help set-option 
```

## 33.36 Swapping characters, words and lines

### 33.36.1 Normal-Mode Commands

```text
Swap the current character (the character under the cursor) with the next: xp

Swap the current line with the next: ddp

Swap the current word with the next (see note): 
dawwP
dawelp

Swap the current word with the previous (see note): dawbP

Note: These approaches to swap words don't work around punctuation and will do the wrong thing. For this reason, it is recommended that you use some mappings (see below) that will more intelligently move words around.
```

### 33.36.2 Normal-Mode Mappings

```text
To use gc to swap the current character with the next, without changing the cursor position:

:nnoremap <silent> gc xph

To use gw to swap the current word with the next, without changing cursor position: (See note.)

:nnoremap <silent> gw "_yiw:s/\(\%#\w\+\)\(\W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>
" This version will work across newlines:
:nnoremap <silent> gw "_yiw:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>

To use gl to swap the current word with the previous, keeping cursor on current word: (This feels like "pushing" the word to the left.) (See note.)

:nnoremap <silent> gl "_yiw?\w\+\_W\+\%#<CR>:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o><c-l>

To use gr to swap the current word with the next, keeping cursor on current word: (This feels like "pushing" the word to the right.) (See note.)

:nnoremap <silent> gr "_yiw:s/\(\%#\w\+\)\(\_W\+\)\(\w\+\)/\3\2\1/<CR><c-o>/\w\+\_W\+<CR><c-l>

To use g{ to swap the current paragraph with the next:

:nnoremap g{ {dap}p{

Note: Mappings above which perform a search-and-replace (ones containing :s/) will operate incorrectly on words with accented characters. To adjust the mappings above to work with your locale, replace all \w with [alphabet] and \W with [^alphabet], where alphabet is the set of characters in your alphabet. :help /\w 

"
```

### 33.36.3 Other Solutions

#### 33.36.3.1 Visual-Mode swapping

```text
To use this mapping: first, delete some text (using any normal Vim command, such as daw, dt, in normal mode, x in visual mode). Then, use visual mode to select some other text, and press CTRL-X. The two pieces of text should then be swapped.

:vnoremap <C-X> <Esc>`.``gvP``P
```

#### 33.36.3.2 Scripts

```text
Chip Campbell has written a Visual Mode Based Swapping script similar to the above, available at http://mysite.verizon.net/astronaut/vim/index.html#VISSWAP
```

## 33.37 Improved Hex editing

```text
Tip 1518 created October 3, 2007 · author Fritzophrenic 

Many advanced text editors allow the editing of files in a "hex mode," especially useful for editing binary files. Vim provides this capability through the external program xxd, which is included by default in standard distributions of Vim. Unfortunately, using an external program for this task is non-intuitive and error-prone. A user must remember how to run the filter (:%!xxd to convert to hex, :%!xxd -r to convert back), must remember to convert back from hex before saving, cannot convert read-only files without warnings, and more. This tip improves the use of xxd to edit hex files by adding a mapping and command to easily toggle back and forth between hex and non-hex mode, and automating tasks like converting back from the hex-filtered form before saving a file.
```

### 33.37.1 Easily enter and leave hex mode

```text
Placing the following code in your vimrc will provide a :Hexmode ex command to toggle xxd hex mode on or off. It will keep track of what mode you are in, so you don't have to. This ex command is easy to map like this:

nnoremap <C-H> :Hexmode<CR>
inoremap <C-H> <Esc>:Hexmode<CR>
vnoremap <C-H> :<C-U>Hexmode<CR>

Note that <C-H> is already a defined command, so override it with care (or use a different left hand side to the mapping). See :help CTRL-H, :help i_CTRL-H, :help v_CTRL-H. Also, you may need to use gvim to distinguish between <C-H> and <BS>.

Note, I use  leader (\) hx for this as follows:
nnoremap <LEADER>hx :Hexmode<CR>
inoremap <LEADER>hx <Esc>:Hexmode<CR>
vnoremap <LEADER>hx :<C-U>Hexmode<CR>


" ex command for toggling hex mode - define mapping if desired
command -bar Hexmode call ToggleHex()

" helper function to toggle hex mode
function ToggleHex()
  " hex mode should be considered a read-only operation
  " save values for modified and read-only for restoration later,
  " and clear the read-only flag for now
  let l:modified=&mod
  let l:oldreadonly=&readonly
  let &readonly=0
  let l:oldmodifiable=&modifiable
  let &modifiable=1
  if !exists("b:editHex") || !b:editHex
    " save old options
    let b:oldft=&ft
    let b:oldbin=&bin
    " set new options
    setlocal binary " make sure it overrides any textwidth, etc.
    let &ft="xxd"
    " set status
    let b:editHex=1
    " switch to hex editor
    %!xxd
  else
    " restore old options
    let &ft=b:oldft
    if !b:oldbin
      setlocal nobinary
    endif
    " set status
    let b:editHex=0
    " return to normal editing
    %!xxd -r
  endif
  " restore values for modified and read only state
  let &mod=l:modified
  let &readonly=l:oldreadonly
  let &modifiable=l:oldmodifiable
endfunction
```

### 33.37.2 Automatically handle hex mode

```text
It would be nice if the user did not need to remember to convert back from hex before saving changes to a binary file. Also, certain files are almost always binary; it would be nice if Vim would pick up on this and automatically enter an appropriate editing mode. The help files for Vim include the following advice for automating the xxd-style hex editing capabilities for Vim, in order to automate the conversion and automatically enter hex mode for binary files:

" vim -b : edit binary using xxd-format!
augroup Binary
  au!
  au BufReadPre  *.bin let &bin=1
  au BufReadPost *.bin if &bin | %!xxd
  au BufReadPost *.bin set ft=xxd | endif
  au BufWritePre *.bin if &bin | %!xxd -r
  au BufWritePre *.bin endif
  au BufWritePost *.bin if &bin | %!xxd
  au BufWritePost *.bin set nomod | endif
augroup END

There are a few problems with this approach:

|   1. Only files with a .bin extension are opened this way, even if editing a file in binary mode (e.g. with ++bin)
|   2. This sets the binary option for any future documents opened as well. If you use tabe, for example, or if you have Vim set up to open new files in tabs, then any new files opened will open in binary mode.
|   3. If you decide to edit a binary file without the xxd, the BufWrite autocommands will try to convert it with xxd -r anyway.
|   4. Viewing a file in "xxd mode" requires you to modify the file, so read-only files will warn you if you try to do so, even if you make no changes. Buffers with 'nomodifiable' will cause errors.
|   5. If you go back into non-xxd editing, the filetype will still be xxd. 

These problems can be fixed as follows:

|   1. Trigger on all files if they are being edited with the binary option. Modify the extension-specific autocmd to set the binary option.
|   2. Use setlocal rather than using the global binary option.
|   3. Maintain a variable for each buffer that tracks whether the file is in "xxd mode". Only restore to non-xxd before writing if this variable says we are in the appropriate mode.
|   4. Temporarily clear the read-only flag whenever you transition between xxd and non-xxd mode, resetting it afterward.
|   5. Store the filetype when entering xxd mode and restore it when leaving. 

Below is some code for your vimrc that does all of this, making use of the command we define above:

" autocmds to automatically enter hex mode and handle file writes properly
if has("autocmd")
  " vim -b : edit binary using xxd-format!
  augroup Binary
    au!
    au BufReadPre *.bin,*.hex setlocal binary
    au BufReadPost *
          \ if &binary | Hexmode | endif
    au BufWritePre *
          \ if exists("b:editHex") && b:editHex && &binary |
          \  let oldro=&ro | let &ro=0 |
          \  let oldma=&ma | let &ma=1 |
          \  exe "%!xxd -r" |
          \  let &ma=oldma | let &ro=oldro |
          \  unlet oldma | unlet oldro |
          \ endif
    au BufWritePost *
          \ if exists("b:editHex") && b:editHex && &binary |
          \  let oldro=&ro | let &ro=0 |
          \  let oldma=&ma | let &ma=1 |
          \  exe "%!xxd" |
          \  exe "set nomod" |
          \  let &ma=oldma | let &ro=oldro |
          \  unlet oldma | unlet oldro |
          \ endif
  augroup END
endif


"
This will make Vim automatically invoke hex mode using the command defined earlier whenever a file is opened in binary mode, and will automatically (locally) set binary mode for .bin and .hex files (so .bin and .hex files will automatically open in hex mode always). 
```

### 33.37.3 Other enhancements

```text
You may need to take steps to avoid the "Hit ENTER to continue prompt if you use this tip.

Here are commands to use to launch any file(s) in hex mode in a separate "hex editor" Vim server. Under Windows, you can easily add these commands to your "Send To" menu if you use the full path for gvim.exe in place of "vim". Remove the "-p" and "--remote-tab-silent" option if you do not want the tabbed interface. The -c "set binary" ensures that any tabwidth, wrap, etc. settings are overwritten after the file finishes loading.

    * Launch in tabs in a new dedicated Vim hex editor: vim -p -b -c "set binary" --servername HEXVIM <files>
    * Launch in tabs in an existing dedicated Vim hex editor: vim -b -c "set binary" --servername HEXVIM --remote-tab-silent <files> 

"
```

### 33.37.4 References

```text
    * :help hex-editing
    * :help :autocmd
    * :help internal-variables
    * :help edit-binary
    * Set_options_or_named_registers_with_let 
```

## 33.38 Entering special characters

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

## 33.39 Easily switch between two styles of color scheme

```text
Tip 955 created June 28, 2005 · author Georg Dahn
Updated and merged to: Tip 341 
```

### 33.39.1 Old version

```text
Pan Shizhu's color scheme ps_color script#760 supports two styles, a cool (dark) and a warm (light) style. If you want to switch between these styles by just a single key stroke, you may define the following function in your vimrc file:

function! <SID>SwitchPSCStyle()
  if exists("g:psc_style")
    if g:psc_style == 'cool'
      let g:psc_style = 'warm'
    elseif g:psc_style == 'warm'
      let g:psc_style = 'cool'
    endif
  else
    let g:psc_style = 'warm'
  endif
  colorscheme ps_color
endfunction

In order to map this function to a key (for example to <F6>), just add the following mapping:

map <silent> <F6> :call <SID>SwitchPSCStyle()<CR>

This function cycles between the default colorscheme, peachpuff and desert.

function! <SID>SwitchColorSchemes()
  if exists("g:colors_name")
    if g:colors_name == 'default'
      colorscheme peachpuff
    elseif g:colors_name == 'peachpuff'
      colorscheme desert
    elseif g:colors_name == 'desert'
      colorscheme default
    endif
  endif
endfunction


This function cycles between the default colorscheme, and all my favorite colorschemes. I mapped to F7.

map <silent> <F7> :call <SID>SwitchColorSchemes()<CR>
function! <SID>SwitchColorSchemes()
	echo g:colors_name
  if exists("g:colors_name")
    if g:colors_name == 'default'
      colorscheme peachpuff
    elseif g:colors_name == 'peachpuff'
      colorscheme desert256
    elseif g:colors_name == 'desert256'
      colorscheme breeze
	elseif g:colors_name == "breeze"
	colorscheme morning 
	elseif g:colors_name == "morning"
	colorscheme darkblue 
	elseif g:colors_name == "darkblue"
	colorscheme gothic 
	elseif g:colors_name == "gothic"
	colorscheme aqua 
	elseif g:colors_name == "aqua"
	colorscheme earth 
	elseif g:colors_name == "earth"
	colorscheme black_angus 
	elseif g:colors_name == "black_angus"
	colorscheme relaxedgreen 
	elseif g:colors_name == "relaxedgreen"
	colorscheme darkblack  
	elseif g:colors_name == "darkblack"
	colorscheme freya  
	elseif g:colors_name == "freya"
	colorscheme motus  
	elseif g:colors_name == "motus"
	colorscheme impact  
	elseif g:colors_name == "impact"
	colorscheme less  
	elseif g:colors_name == "less"
	colorscheme chocolateliquor   
	elseif g:colors_name == "chocolateliquor"
	colorscheme default   
    endif
  endif
endfunction
```

### 33.39.2 Newer Version

```text
" Set next or previous colorscheme from a list.
function! SetNextColor(forward)
  if exists('g:colors_name')
    let colstr = 'default elflord peachpuff desert256 breeze morning'
    let colstr .= ' darkblue gothic aqua earth black_angus relaxedgreen'
    let colstr .= ' darkblack freya motus impact less chocolateliquor'
    let missing = []
    let colors = split(colstr)
    let current = index(colors, g:colors_name)
    for i in range(len(colors))
      let current += (a:forward ? 1 : -1)
      if !(0 <= current && current < len(colors))
        let current = (a:forward ? 0 : len(colors)-1)
      endif
      try
        execute 'colorscheme '.colors[current]
        break
      catch /E185:/
        call add(missing, colors[current])
      endtry
    endfor
    redraw
    if len(missing) > 0
      echo 'Error: colorscheme not found:' join(missing)
    endif
    echo g:colors_name
  endif
endfunction
nnoremap <F8> :call SetNextColor(1)<CR>
nnoremap <S-F8> :call SetNextColor(0)<CR>



"
```

### 33.39.3 Updated version

```text
You can easily change your color scheme, but it can be hard to compare several schemes to decide what's best for you. It may help to view a one-page summary of many color schemes.

Alternatively, the script presented below allows you to quickly change colors by pressing a key. If you like variety, you can start Vim with a different scheme depending upon the time of day.
Contents

    * 1 One page summary of color schemes
    * 2 Script features
    * 3 Script usage
    * 4 Scrolling the color schemes
    * 5 References
    * 6 Comments
```

#### 33.39.3.1 One page summary of color schemes

```text
Maverick Woo has created a one-page summary showing sample C code in many different color schemes. Other pages at the same site show similar information for html, Java, LaTeX and Perl.

Some of the color schemes are provided with Vim. For example, the following command should show the elflord scheme:

:colorscheme elflord

Many samples show color schemes downloaded from Vim scripts (use its search facility to find a particular scheme).
```

#### 33.39.3.2 Script features

```text
The script defines these key mappings:

    * Press F8 to use the next color scheme.
    * Press Shift-F8 to use the previous color scheme.
    * Press Alt-F8 to use a random color scheme. 

    (Note I prefer F7 tp F8)

The next/previous/random color scheme selection uses a list of scheme names maintained by the script. The list can be controlled with these commands (the default is all):

:SetColors all
    To use all installed color schemes ($VIMRUNTIME/colors/*.vim). 
:SetColors my
    To use names built into the script (define these names by editing the script to change the variables c1, c2 and c3). 
:SetColors blue slate ron
    To use the schemes specified (scheme names, separated with a space, for example, blue slate ron). 
:SetColors
    To display the current list of scheme names. 

After using :SetColors to list the scheme names (and while the list is still displayed), you could type :colors d then press Tab to expand 'd' to a color scheme name starting with 'd'. Then press Enter to invoke the color scheme (:colors is an abbreviation for :colorscheme).

Enter :SetColors now to set the current color scheme based on the time of day. Change the colors used by editing the nowcolors variable in the script, for example:

let nowcolors = 'breeze earth less aqua gothic'
```

#### 33.39.3.3 Script usage

```text
    * Create and save file setcolors.vim containing the script below.
    * In Vim, use the command :source setcolors.vim to execute the script so you can experiment with its features.
    * Alternatively, if you save the script in file ~/.vim/plugin/setcolors.vim (Unix) or $HOME/vimfiles/plugin/setcolors.vim (Windows), it will be available whenever you start Vim. 

" Change the color scheme from a list of color scheme names.
" Version 2008-11-02 from http://vim.wikia.com/wiki/VimTip341
" Press key:
"   F7                next scheme
"   Shift-F7          previous scheme
"   Alt-F7            random scheme
" Set the list of color schemes used by the above (default is 'all'):
"   :SetColors all              (all $VIMRUNTIME/colors/*.vim)
"   :SetColors my               (names built into script)
"   :SetColors blue slate ron   (these schemes)
"   :SetColors                  (display current scheme names)
" Set the current color scheme based on time of day:
"   :SetColors now
if v:version < 700 || exists('loaded_setcolors') || &cp
  finish
endif
let loaded_setcolors = 1
let s:mycolors = []  " colorscheme names that we use to set color

" Set list of color scheme names that we will use, except
" argument 'now' actually changes the current color scheme.
function! s:SetColors(args)
  if len(a:args) == 0
    echo 'Current color scheme names:'
    let i = 0
    while i < len(s:mycolors)
      echo '  '.join(map(s:mycolors[i : i+4], 'printf("%-14s", v:val)'))
      let i += 5
    endwhile
  elseif a:args == 'all'
    let paths = split(globpath(&runtimepath, 'colors/*.vim'), "\n")
    let s:mycolors = map(paths, 'fnamemodify(v:val, ":t:r")')
    echo 'List of colors set from all installed color schemes'
  elseif a:args == 'my'
    let c1 = 'default elflord peachpuff desert256 breeze morning'
    let c2 = 'darkblue gothic aqua earth black_angus relaxedgreen'
    let c3 = 'darkblack freya motus impact less chocolateliquor'
    let c4 = 'novula midnight revolutions camo lilac moria'
    let c5 = 'fog taqua buttercream olive revolutions autumn2'
    let s:mycolors = split(c1.' '.c2.' '.c3.' '.c4.' '.c5)
    echo 'List of colors set from built-in names'
  elseif a:args == 'now'
    call s:HourColor()
  else
    let s:mycolors = split(a:args)
    echo 'List of colors set from argument (space-separated names)'
  endif
endfunction
command! -nargs=* SetColors call <SID>SetColors('<args>')

" Set next/previous/random (how = 1/-1/0) color from our list of colors.
" The 'random' index is actually set from the current time in seconds.
" Global (no 's:') so can easily call from command line.
function! NextColor(how)
  if len(s:mycolors) == 0
    call s:SetColors('all')
  endif
  if exists('g:colors_name')
    let current = index(s:mycolors, g:colors_name)
  else
    let current = -1
  endif
  let missing = []
  let how = a:how
  for i in range(len(s:mycolors))
    if how == 0
      let current = localtime() % len(s:mycolors)
      let how = 1  " in case random color does not exist
    else
      let current += how
      if !(0 <= current && current < len(s:mycolors))
        let current = (how>0 ? 0 : len(s:mycolors)-1)
      endif
    endif
    try
      execute 'colorscheme '.s:mycolors[current]
      break
    catch /E185:/
      call add(missing, s:mycolors[current])
    endtry
  endfor
  redraw
  if len(missing) > 0
    echo 'Error: colorscheme not found:' join(missing)
  endif
  echo g:colors_name
endfunction
nnoremap <F7> :call NextColor(1)<CR>
nnoremap <S-F7> :call NextColor(-1)<CR>
nnoremap <A-F7> :call NextColor(0)<CR>

" Set color scheme according to current time of day.
function! s:HourColor()
  let hr = str2nr(strftime('%H'))
  if hr <= 3
    let i = 0
  elseif hr <= 7
    let i = 1
  elseif hr <= 14
    let i = 2
  elseif hr <= 18
    let i = 3
  else
    let i = 4
  endif
  let nowcolors = 'elflord morning desert evening pablo'
  execute 'colorscheme '.split(nowcolors)[i]
  redraw
  echo g:colors_name
endfunction




"
```

#### 33.39.3.4 Scrolling the color schemes

```text
You may want to impress your colleagues by having Vim change the color scheme periodically. The following might be your first attempt:

:autocmd CursorHold * call NextColor(1)

However, this fails because there is no timer event in Vim. The CursorHold event will fire only once when the user has been idle for the time specified with the 'updatetime' option (so if you stop typing, the color scheme will change once only).

If you want the color scheme to change every 10 seconds, execute the following command (press Ctrl-C to finish).

:while 1|sleep 10|call NextColor(1)|endwhile
```

#### 33.39.3.5 References

```text
    * :help :colorscheme
    * :help g:colors_name 
    	

		33.39.4
```

## 33.40 Highlight long lines

```text
	Tip 810 - author Nitin Raut · version 6.0 
There are a number of situations where it can be helpful to know when you are near or have exceeded a certain column width (say 80 columns). Vim's highlighting features can be used to easily identify when this occurs. Unlike some editors, Vim cannot show a line at this width.
 Searching

A quick method to find long lines is a search like the following. If you use search highlighting (:set hlsearch), this will highlight all text after virtual column 80 (after tabs are expanded).

/\%>80v.\+
```

### 33.40.1 Matching

```text
A simple command will highlight any text after virtual column 80:

:match ErrorMsg '\%>80v.\+'

Of course, you can define your own highlight groups if ErrorMsg is not to your taste. Enter :match to clear matching.
```

### 33.40.2 Automatic

```text
If you want to be warned whenever text exceeds 80 columns you can use matching. In Vim 7.2 this is easy to achieve with the following commands (the -1 means any search highlighting will override the match highlighting):

:let w:m1=matchadd('Search', '\%<81v.\%>77v', -1)
:let w:m2=matchadd('ErrorMsg', '\%>80v.\+', -1)

You can apply this highlighting automatically for all files with something like this in your vimrc:

:au BufWinEnter * let w:m1=matchadd('Search', '\%<81v.\%>77v', -1)
:au BufWinEnter * let w:m2=matchadd('ErrorMsg', '\%>80v.\+', -1)

You can change the * to a different pattern, or a comma-separated list, to make it work only for certain file types like *.c,*.h for example.

Since matches are local to a window and are not inherited when a new window is created, this method will not necessarily apply to all new windows you create. It will be pretty close, but if you really want to highlight in all windows, you will need to apply the highlighting whenever you detect a window creation.

Clear the highlighting with:

:call matchdelete(w:m1)
:call matchdelete(w:m2)

Alternatively, the following command will clear all matches that have been defined for this window:

:call clearmatches()

 Automatic (for Vim before version 7.1.40)

For earlier versions of Vim, the following is a close approximation:

:syntax match Search /\%<81v.\%>77v/
:syntax match ErrorMsg /\%>80v.\+/

:au BufRead,BufNewFile * syntax match Search /\%<81v.\%>77v/
:au BufRead,BufNewFile * syntax match ErrorMsg /\%>80v.\+/

Note the use of BufRead and BufNewFile instead of BufWinEnter. Unlike matches, syntax is local to the buffer instead of the window.

Clear the highlighting (after saving any changes) with:

:e

This assumes you are editing a file using syntax rules contained in a syntax file (which usually do a syntax clear before applying their rules). If you are editing a file with no pre-existing syntax rules, you can get rid of all syntax highlighting with:

:syntax clear
```

### 33.40.3 Manual

```text
If you don't like to always highlight long lines, but you want a fast way to check your line length, you can define a mapping to toggle highlighting on/off. This also allows you to easily define the highlight in terms of the 'textwidth' option. The mapping could look like this:

nnoremap <silent> <Leader>l
      \ :if exists('w:long_line_match') <Bar>
      \   silent! call matchdelete(w:long_line_match) <Bar>
      \   unlet w:long_line_match <Bar>
      \ elseif &textwidth > 0 <Bar>
      \   let w:long_line_match = matchadd('ErrorMsg', '\%>'.&tw.'v.\+', -1) <Bar>
      \ else <Bar>
      \   let w:long_line_match = matchadd('ErrorMsg', '\%>80v.\+', -1) <Bar>
      \ endif<CR>

 Explanation

The search pattern \%>80v.\+ checks for a match at each position. If the position being tested is at a virtual column above 80, the text at that position is checked to see if it matches what follows (.\+). That matches one or more characters, up to but not including the end-of-line.

A simpler pattern such as \%81v.* fails to highlight text past the limit if there is no character in virtual column 81, for example if a tab starts just before that column. Furthermore, \%81v.* can give an erroneous highlight of column 81 on lines of exactly 80 characters.

The pattern \%<81v.\%>77v matches any character at virtual column 77 to 80 inclusive. The pattern checks for a match at each position: \%<81v. matches any character at a virtual column below 81; \%>77v causes the match to fail unless the virtual column of the next character is above 77.
```

### 33.40.4 References

```text
    * :help matchadd()
    * :help :match
    * :help /\%v 
```

## 33.41 Using command-line history

```text
Tip 45 created March 12, 2001 author Anon 

When you press : to enter a command, or / to start a search, you often want to edit a previous command or search. That can be done using the up and down arrow keys to scroll through the history. Then you can edit a previous line. :help :

For example, type :s and then press the up arrow key. The last command that starts with exactly what you typed will be displayed. Scroll through the history by pressing up or down. There is a history for commands, and another for searches (and more :help history). You can list the entire history using the :history command (:help :history). The command :his lists the command history, and :his / lists the search history.

In many situations, a better solution is the command-line window which you can open in two ways:

    * Type q: for commands, or q/ for searches; or
    * Type : or / to start entering a command or search, then press the 'cedit' key (default is Ctrl-f :help 'cedit'). 

The advantage of the command-line window is that you can use all Vim's editing power, including searching for previously-entered commands. After editing a command, you can:

    * Press Enter to execute the current line (and close the command-line window); or
    * Press Ctrl-c twice to close the command-line window (cancel). 

 Details

Suppose you search for "horse", then for "Hello", then for "helium", then for "habit".

If you type /h and repeatedly press up arrow, you will see /habit, then /helium, then /horse ("Hello" is skipped because it does not start with "h").

Register @: holds the last command, and @/ holds the last search. Therefore ":p will paste the last command, and "/p will paste the last search.

Type @: to repeat the last command.

You may have used several commands (for example, :%s/old/new/g) on the current buffer, and now find you would like to repeat those commands on another buffer. Type q: to enter the command window, then select and yank the commands you want. Press Ctrl-c twice to close the command window. If wanted, you can paste the commands into a buffer, then edit and save them. Later, you can source the file containing the commands, or you can yank the commands, then type :@"<CR> to execute the yanked commands on the current buffer.

If you always want to use the command editing window, try these mappings:

nnoremap : q:i
nnoremap / q/i
nnoremap ? q?i

 References

    * :help history
    * :help Cmdline
    * :help cmdwin
    * :help 'cmdwinheight' option controls initial height of command-line window
    * :help 'history' option controls number of history items stored in viminfo 



    "

id=Highlight_multiple_words
```

## 33.42 Highlight multiple words

```text
Vim provides a simple way to highlight all occurrences matching your last search, but it doesn't provide an easy way to highlight more than one search. This tip provides a script to make it easy to highlight multiple words in different colors. In addition, you can search for the next highlighted word.
```

### 33.42.1 Requirements

```text
The script uses matchadd() which requires Vim 7.2 (actually version 7.1.040 or later). You will probably need gvim to display the colors specified in the script. In addition, the script assumes you have a numeric keypad and a system that allows you to map keys on that keypad (for example, the command :map <k0> :echo 'Hello'<CR> would display Hello when you press 0 on the numeric keypad).

You need the script (highlights.vim) and the file that defines the highlight groups (highlights.csv); these are given below.
```

### 33.42.2 Usage

```text
Sample highlighting of words

The script defines highlight groups named hl1, hl2, ... hl9 (and more). Once enabled, pressing one of the keys 1, 2, ... 9 on the numeric keypad will highlight the word under the cursor with the colors defined in the corresponding highlight group (for example, press 4 on the keypad to highlight the current word with the hl4 group).

Type \m (assuming the default backslash leader key) to toggle mapping of the keypad on/off. At startup, the numeric keypad operates normally because only \m is mapped.

After typing \m to enable the mappings, you could use the keypad to:

    * Press 1 to highlight the current visually selected text, or the current word (if nothing is selected). Highlight group hl1 is used.
    * Press 2 for highlight hl2, 3 for highlight hl3, etc.
    * Press 0 to remove all highlights from the current visually selected text, or the current word. 

For example, if you place the cursor on the word "rain" and press 4 on the keypad, all occurrences of "rain" will be highlighted (use :hi hl4 to show the colors). No highlighting will occur in words like "rainbow".

Alternatively, place the cursor on "rain" and press viw to select the word, then 4. All occurrences of the visually selected text will be highlighted, including the "rain" in "rainbow".

Each window has its own set of highlights: if you use :split to show two windows, you can have one set of highlights in the top window, and a different set in the other window.

With the mappings enabled, you could use the keypad to:

    * Press - to remove all highlights in the current window.
    * Press + to restore the highlighting when - was last used in the current window.
    * Press * to restore the highlighting when - was last used in any window. 

For example, suppose you are displaying two windows and you want the same highlighting in each window. In the first window, apply the wanted highlighting. Then (using the numeric keypad keys):

    * Press - to remove all highlights in the first window.
    * Press + to restore them.
    * Switch to the other window and press * to apply the highlights from the first window. 
```

#### 33.42.2.1 Searching

```text
After using \m to enable mappings, you can search for the next or previous occurrence of highlighted text. Patterns highlighted with the :match or :2match commands are also found.

Type \f to find the next match, or \F to find backwards. This has no effect on search highlighting or history.

Alternatively, type \n or \N to search forwards or backwards. Now you can press the normal search keys n or N to find the next or previous occurrence.
```

#### 33.42.2.2 Highlight command

```text
The script defines a :Highlight n pattern command where n is a number (1..99) and pattern is the text you want highlighted. Depending on your system, you may be able to use the abbreviation :Hi rather than :Highlight.

The following examples use different colors to highlight various patterns:

:Highlight 4 hello
:Highlight 5 \<hello\>
:Highlight 6 Hello World
:Highlight 7 \c\<th

The second example is the same as placing the cursor on "hello" then pressing 5 on the numeric keypad. The last example highlights th occurring at the beginning of a word, not case sensitive.

The following command will list all active highlights (group names and patterns):

:Highlight
```

#### 33.42.2.3 Other commands

```text
After using \m to enable the keypad mappings, you can press 1..9 on the keypad to highlight the visual selection (if any), or the current word. For example, pressing 4 on the keypad will highlight using the hl4 group.

In addition, you can press a digit 1..9 on the main keyboard before pressing 1..9 on the keypad. For example, if you press 2 on the main keyboard before 4 on the keypad, the hl24 highlight group will be used.

The :Hclear command can clear highlights. After typing :Hclear, you can enter an argument, or you can press Space then Tab for command completion (highlighted patterns). Examples:

" Remove highlight for visual selection (if any), or current word.
:Hclear
" Remove highlight 24.
:Hclear 24
" Remove all highlights for pattern '\c\<th'.
:Hclear \c\<th
" Remove all highlights.
:Hclear *

The following command will create a scratch buffer showing all the defined highlights:

:Hsample

The following commands can be used to save or restore the current highlights:

:Hsave anyname
:Hrestore anyname

Replace anyname with any name you would like to use. These commands use uppercase global variables (anyname is converted to uppercase), which Vim will save providing you have the ! flag in the 'viminfo' option (:set viminfo^=!).

After typing :Hsave or :Hrestore, you can press Space then Tab for command completion.
```

#### 33.42.2.4 Example

```text
Copy this text into Vim to test word highlighting:

777  888  999   111 222 333 444 555 666 777 888 999
444  555  666   999 111 222 333 444 555 666 777 888
111  222  333   888 999 111 222 333 444 555 666 777
111222 333444 555666 777888999 111222 333444 555666

Use :sp to split the window and view the above text in both windows. Use \m to enable mappings, then apply some matches in the top window. Switch to the bottom window and apply some different matches: each window maintains a separate list of highlight matches.

In the next step, you must use the -+* keys on the numeric keypad. While in the bottom window, press - to clear highlighting in that window. If wanted, press + to restore highlighting. In the top window, press * to apply the highlighting from the bottom window.
```

### 33.42.3 Script

```text
Create file ~/.vim/plugin/highlights.vim (Unix) or $HOME/vimfiles/plugin/highlights.vim (Windows) containing the script below, then restart Vim.

" Plugin to highlight multiple words in different colors.
" Version 2008-11-19 from http://vim.wikia.com/wiki/VimTip1572
" File highlights.csv (in same directory as script) defines the highlights.
"
" Type '\m' to toggle mapping of keypad on/off (assuming \ leader).
" Type '\f' to find the next match; '\F' to find backwards.
" Can also type '\n' or '\N' for search; then n or N will find next.
" On the numeric keypad, press:
"   1 to highlight visually selected text or current word
"     using highlight group hl1 (defined below)
"   2 for highlight hl2, 3 for highlight hl3, etc
"     (can press 1 to 9 on keypad for highlights hl1 to hl9)
"   0 to remove highlight from current word
"   - to remove all highlights in current window
"   + to restore highlights cleared with '-' in current window
"   * to restore highlights (possibly from another window)
" Can press 1 or 2 on main keyboard before keypad 1..9 for more highlights.
" Commands:
"   ':Highlight' list all highlights.
"   ':Highlight [n [pattern]]' set highlight.
"   ':Hsample' display all highlights in a scratch buffer.
"   ':Hclear [hlnum|pattern|*]' clear highlights.
"   ':Hsave x', ':Hrestore x' save/restore highlights (x any name).
" Saving current highlights requires '!' in 'viminfo' option.
if v:version < 702 || exists('loaded_highlightmultiple') || &cp
  finish
endif
let loaded_highlightmultiple = 1

" On first call, read file highlights.csv in same directory as script.
" For example, line "5,white,blue,black,green" executes:
" highlight hl5 ctermfg=white ctermbg=blue guifg=black guibg=green
let s:data_file = expand('<sfile>:p:r').'.csv'
let s:loaded_data = 0
function! LoadHighlights()
  if !s:loaded_data
    if filereadable(s:data_file)
      let names = ['hl', 'ctermfg=', 'ctermbg=', 'guifg=', 'guibg=']
      for line in readfile(s:data_file)
        let fields = split(line, ',', 1)
        if len(fields) == 5 && fields[0] =~ '^\d\+$'
          let cmd = range(5)
          call map(cmd, 'names[v:val].fields[v:val]')
          call filter(cmd, 'v:val!~''=$''')
          execute 'silent highlight '.join(cmd)
        endif
      endfor
      let s:loaded_data = 1
    endif
    if !s:loaded_data
      echo 'Error: Could not read highlight data from '.s:data_file
    endif
  endif
endfunction

" Return last visually selected text or '\<cword\>'.
" what = 1 (selection), or 2 (cword), or 0 (guess if 1 or 2 is wanted).
function! s:Pattern(what)
  if a:what == 2 || (a:what == 0 && histget(':', -1) =~# '^H')
    let result = expand("<cword>")
    if !empty(result)
      let result = '\<'.result.'\>'
    endif
  else
    let old_reg = getreg('"')
    let old_regtype = getregtype('"')
    normal! gvy
    let result = substitute(escape(@@, '\.*$^~['), '\_s\+', '\\_s\\+', 'g')
    normal! gV
    call setreg('"', old_reg, old_regtype)
  endif
  return result
endfunction

" Remove any highlighting for hlnum then highlight pattern (if not empty).
" If pat is numeric, use current word or visual selection and
" increase hlnum by count*10 (if count [1..9] is given).
function! s:DoHighlight(hlnum, pat, decade)
  call LoadHighlights()
  let hltotal = a:hlnum
  if 0 < a:decade && a:decade < 10
    let hltotal += a:decade * 10
  endif
  if type(a:pat) == type(0)
    let pattern = s:Pattern(a:pat)
  else
    let pattern = a:pat
  endif
  let id = hltotal + 100
  silent! call matchdelete(id)
  if !empty(pattern)
    try
      call matchadd('hl'.hltotal, pattern, -1, id)
    catch /E28:/
      echo 'Highlight hl'.hltotal.' is not defined'
    endtry
  endif
endfunction

" Remove all matches for pattern.
function! s:UndoHighlight(pat)
  if type(a:pat) == type(0)
    let pattern = s:Pattern(a:pat)
  else
    let pattern = a:pat
  endif
  for m in getmatches()
    if m.pattern ==# pattern
      call matchdelete(m.id)
    endif
  endfor
endfunction

" Return pattern to search for next match, and do search.
function! s:Search(backward)
  let patterns = []
  for m in getmatches()
    call add(patterns, m.pattern)
  endfor
  if empty(patterns)
    let pat = ''
  else
    let pat = join(patterns, '\|')
    call search(pat, a:backward ? 'b' : '')
  endif
  return pat
endfunction

" Enable or disable mappings and any current matches.
function! s:MatchToggle()
  if exists('g:match_maps') && g:match_maps
    let g:match_maps = 0
    for i in range(0, 9)
      execute 'unmap <k'.i.'>'
    endfor
    nunmap <kMinus>
    nunmap <kPlus>
    nunmap <kMultiply>
    nunmap <Leader>f
    nunmap <Leader>F
    nunmap <Leader>n
    nunmap <Leader>N
  else
    let g:match_maps = 1
    for i in range(1, 9)
      execute 'vnoremap <silent> <k'.i.'> :<C-U>call <SID>DoHighlight('.i.', 1, v:count)<CR>'
      execute 'nnoremap <silent> <k'.i.'> :<C-U>call <SID>DoHighlight('.i.', 2, v:count)<CR>'
    endfor
    vnoremap <silent> <k0> :<C-U>call <SID>UndoHighlight(1)<CR>
    nnoremap <silent> <k0> :<C-U>call <SID>UndoHighlight(2)<CR>
    nnoremap <silent> <kMinus> :call <SID>WindowMatches(0)<CR>
    nnoremap <silent> <kPlus> :call <SID>WindowMatches(1)<CR>
    nnoremap <silent> <kMultiply> :call <SID>WindowMatches(2)<CR>
    nnoremap <silent> <Leader>f :call <SID>Search(0)<CR>
    nnoremap <silent> <Leader>F :call <SID>Search(1)<CR>
    nnoremap <silent> <Leader>n :let @/=<SID>Search(0)<CR>
    nnoremap <silent> <Leader>N :let @/=<SID>Search(1)<CR>
  endif
  call s:WindowMatches(g:match_maps)
  echo 'Mappings for matching:' g:match_maps ? 'ON' : 'off'
endfunction
nnoremap <silent> <Leader>m :call <SID>MatchToggle()<CR>

" Remove and save current matches, or restore them.
function! s:WindowMatches(action)
  call LoadHighlights()
  if a:action == 1
    if exists('w:last_matches')
      call setmatches(w:last_matches)
    endif
  elseif a:action == 2
    if exists('g:last_matches')
      call setmatches(g:last_matches)
    else
      call s:Hrestore('')
    endif
  else
    let m = getmatches()
    if !empty(m)
      let w:last_matches = m
      let g:last_matches = m
      call s:Hsave('')
      call clearmatches()
    endif
  endif
endfunction

" Return name of global variable to save value ('' if invalid).
function! s:NameForSave(name)
  if a:name =~# '^\w*$'
    return 'HI_SAVE_'.toupper(a:name)
  endif
  echo 'Error: Invalid name "'.a:name.'"'
  return ''
endfunction

" Return custom completion string (match patterns).
function! s:MatchPatterns(A, L, P)
  return join(sort(map(getmatches(), 'v:val.pattern')), "\n")
endfunction

" Return custom completion string (saved highlight names).
function! s:SavedNames(A, L, P)
  let l = filter(keys(g:), 'v:val =~# ''^HI_SAVE_\w''')
  return tolower(join(sort(map(l, 'strpart(v:val, 8)')), "\n"))
endfunction

" Save current highlighting in a global variable.
function! s:Hsave(name)
  let sname = s:NameForSave(a:name)
  if !empty(sname)
    let l = getmatches()
    call map(l, 'join([v:val.group, v:val.pattern, v:val.priority, v:val.id], "\t")')
    let g:{sname} = join(l, "\n")
  endif
endfunction
command! -nargs=? -complete=custom,s:SavedNames Hsave call <SID>Hsave('<args>')

" Restore current highlighting from a global variable.
function! s:Hrestore(name)
  call LoadHighlights()
  let sname = s:NameForSave(a:name)
  if !empty(sname)
    if exists('g:{sname}')
      let matches = []
      for l in split(g:{sname}, "\n")
        let f = split(l, "\t", 1)
        call add(matches, {'group':f[0], 'pattern':f[1], 'priority':f[2], 'id':f[3]})
      endfor
      call setmatches(matches)
    else
      echo 'No such global variable: '.sname
    endif
  endif
endfunction
command! -nargs=? -complete=custom,s:SavedNames Hrestore call <SID>Hrestore('<args>')

" Clear a match, or clear all current matches. Example args:
"   '14' = hl14, '*' = all, '' = visual selection or cword,
"   'pattern' = all matches for pattern
function! s:Hclear(pattern) range
  if empty(a:pattern)
    call s:UndoHighlight(0)
  elseif a:pattern == '*'
    call s:WindowMatches(0)
  elseif a:pattern =~ '^[1-9][0-9]\?$'
    call s:DoHighlight(str2nr(a:pattern), '', 0)
  else
    call s:UndoHighlight(a:pattern)
  endif
endfunction
command! -nargs=* -complete=custom,s:MatchPatterns -range Hclear call <SID>Hclear('<args>')

" Create a scratch buffer with sample text, and apply all highlighting.
function! s:Hsample()
  call LoadHighlights()
  new
  setlocal buftype=nofile bufhidden=hide noswapfile
  let lines = []
  let items = []
  for hl in filter(range(1, 99), 'v:val % 10 > 0')
    if hlexists('hl'.hl)
      let sample = printf('Sample%2d', hl)
      call s:DoHighlight(hl, sample, 0)
    else
      let sample = '        '
    endif
    call add(items, sample)
    if len(items) >= 3
      call insert(lines, substitute(join(items), '\s\+$', '', ''))
      let items = []
    endif
  endfor
  call append(0, filter(lines, 'len(v:val) > 0'))
  $d
  %s/\d3$/&\r/e
endfunction
command! Hsample call <SID>Hsample()

" Set a match, or display all current matches. Example args:
"   '14' = set hl14 for visual selection or cword,
"   '14 pattern' = set hl14 for pattern, '' = display all
function! s:Highlight(args) range
  if empty(a:args)
    echo 'Highlight groups and patterns:'
    for m in getmatches()
      echo m.group m.pattern
    endfor
    return
  endif
  let l = matchlist(a:args, '^\s*\([1-9][0-9]\?\)\%($\|\s\+\(.*\)\)')
  if len(l) >= 3
    let hlnum = str2nr(l[1])
    let pattern = l[2]
    if empty(pattern)
      let pattern = s:Pattern(0)
    endif
    call s:DoHighlight(hlnum, pattern, 0)
    return
  endif
  echo 'Error: First argument must be highlight number 1..99'
endfunction
command! -nargs=* -range Highlight call <SID>Highlight('<args>')
```

### 33.42.4 Defining highlight groups

```text
The script reads a CSV file with the same directory/name as the script, but with .csv extension. Each line should consist of five comma-separated fields, where the first field is a number from 1 to 99 inclusive (any other lines are ignored).

For example, the line "5,white,blue,black,green" would define a highlight group named hl5 which color terminals would display as white on blue, and gvim would display as black on green.

Create file ~/.vim/plugin/highlights.csv (Unix) or $HOME/vimfiles/plugin/highlights.csv (Windows) containing the sample below, then restart Vim.

hlnum,ctermfg,ctermbg,guifg,guibg
1,red,,red,
2,green,,green,
3,blue,,blue,
4,black,magenta,black,IndianRed
5,black,green,black,chartreuse
6,black,cyan,black,DeepSkyBlue
7,white,DarkRed,white,firebrick
8,white,DarkGreen,white,DarkGreen
9,white,DarkBlue,white,DarkSlateBlue
11,,,black,thistle
12,,,black,burlywood
13,,,black,PowderBlue
14,,,black,peru
15,,,black,DarkSeaGreen
16,,,black,SteelBlue
17,,,black,DarkOrange
18,,,black,DarkOliveGreen
19,,,black,SlateGray
21,,,red,grey20
22,,,green,grey20
23,,,CornflowerBlue,grey20
24,,,red,grey40
25,,,green,grey40
26,,,blue,grey40
27,,,red,grey70
28,,,DarkGreen,grey70
29,,,blue,grey70
```

### 33.42.5 See also

```text
    * Discussion page for alternative methods
    * View all named colors to show the colors for the standard color names
    * Highlighting information want to fix this to list relevant tips
    * MultipleSearch highlight multiple searches, each with a different color
    * Mark highlight several words in different colors 
```

### 33.42.6 References

```text
    * :help matchadd()
    * :help matchdelete()
    * :help clearmatches()
    * :help gui-colors 
```

## 33.43 Jump to a file to a certain line number

```text
Tip 487 created June 16, 2003 · complexity basic · author yijun · version 5.7

Often when editing a file in Vim, you may have a filename/line number pair such as "vim.h:1506" indicating a file you wish to open at the line number listed.

The gF command will do this for you, although ':' is included in 'isfname' under Windows, so you'll need to get rid of it first with set isfname-=:

    * :help gF
    * :help CTRL-W_F (same thing, but split the window for the new file)
    * :help CTRL-W_gF (same thing, but open a new tab for the new file) 

When such file-name/line number pairs are the result of compiling code, the following commands are also useful:

    * :help :cn
    * :help :cl
    * :help :cfile 

so go to line that has say, file.cpp:12 and press gF to go there.
```

## 33.44 Open vimrc file

```text
Tip 626 created December 24, 2003 · complexity basic · author Anon · version 6.0
```

### 33.44.1 What is vimrc?

```text
The vimrc file contains optional runtime configuration settings to initialize Vim when it starts. On Unix based systems, the file is named .vimrc, while on Windows systems it is named _vimrc. :help vimrc

You can customize Vim by putting suitable commands in your vimrc. Here is a very simple example:

set shiftwidth=4 softtabstop=4
set incsearch ignorecase hlsearch
" Press space to clear search highlighting and any message already displayed.
nnoremap <silent> <Space> :silent noh<Bar>echo<CR>

Search for file vimrc_example.vim in your Vim files for another example. :help vimrc-intro :help vimrc_example.vim

To customize Vim for editing a specific file, or a specific type of file, you can use modelines, or auto commands, or filetype plugins. :help auto-setting :help filetype

"
```

### 33.44.2 Location of vimrc

```text
In Vim, your home directory is specified with ~ on Unix systems, and $HOME on Windows systems. The following commands are useful to see what directories your Vim is using:

:version
:echo expand('~')
:echo $HOME
:echo $VIM
:echo $VIMRUNTIME

Note the 'system vimrc file' and 'user vimrc file' paths displayed by the :version command. The system vimrc file can be created by an administrator to customize Vim for all users. In addition, each user can have their own user vimrc.

The output from :version includes the paths of the system and user gvimrc files. If these files exist, they are used to configure Vim when the GUI version (gvim) runs (after settings from vimrc are applied).

You don't need a gvimrc file because you can put something like the following in your vimrc:

if has('gui_running')
  set guioptions-=T  " no toolbar
  colorscheme elflord
endif

"
```

### 33.44.3 Opening vimrc

```text
If Vim finds your vimrc file during startup, Vim will set the MYVIMRC environment variable to the full path of the vimrc file. Similarly, if your gvimrc file is found, the MYGVIMRC variable is set. Therefore, you can easily edit these files from within Vim:

:e $MYVIMRC
:e $MYGVIMRC

Using file name completion, you could type :e $M then press Tab until you see the desired variable. If you only want to see the path, type :echo $M then press Tab to see the variable, and press Enter.

In gvim, the Edit menu includes "Startup Settings" which will use $MYVIMRC to edit your vimrc file. If $MYVIMRC does not exist, "Startup Settings" will create a new file using the "user vimrc file" path shown by the :version command.
```

### 33.44.4 Sourcing vimrc

```text
After you have saved changes to your vimrc file, you can see the results by exiting from Vim, then starting Vim again.

If you are making frequent changes, you might want to "source" (execute) the changed vimrc file without exiting:

:so $MYVIMRC
" Alternative that can be used if vimrc is the current file:
:so %

Warning You may need to plan your vimrc so re-sourcing does not cause problems. If you define commands, functions, or autocmds, you must make them remove or override the previous version when sourced, or you will get errors (for commands and functions) or duplicates (for autocmds). Here are some examples that will work correctly when re-sourced:

" Use bang (!) to redefine a command or function, if already defined.
command! Mycommand echo "Hello!"
function! Myfunc()
  echo "Hello!"
endfunction

" Put all autocmds in some augroup and use au! to clear the group.
augroup vimrc_autocmds
  au!
  autocmd BufRead * echo "File read!"
augroup END

"
```

### 33.44.5 Recovering from errors

```text
Some errors in your vimrc may prevent Vim from starting successfully. A reliable way to handle that would be to rename your vimrc file, then edit the renamed file, then give it the correct name. Alternatively, you could start Vim with a command like this (or use "gvim" if that is how you run Vim):

vim -N -u NONE -U NONE

The -N starts in "not compatible" mode (that is, with extra Vim features). The NONE argument (must be uppercase) skips initializations and does not read any vimrc file (-u), and does not read any gvimrc file (-U).

You could now use the :version command to show the vimrc path, then enter a command to edit that file. 
```

## 33.45 Uniq - Removing duplicate lines

```text
Tip 648 author Michael Geddes 

The following command will sort all lines and remove duplicates (keeping unique lines):

:sort u

If you need more control, here are some alternatives.

There are two versions, the first leaves only the last line, the second leaves only the first line.

g/^\(.*\)$\n\1$/d
g/\%(^\1$\n\)\@<=\(.*\)$/d

Breakdown of the second version:

g//d <-- Delete the lines matching the regexp
\@<= <-- If the bit following matches, make sure the bit preceding this symbol directly precedes the match
\(.*\)$ <-- Match the line into subst register 1
\%( ) <--- Group without placing in a subst register.
^\1$\n <--- Match subst register 1 followed by end of line and the new line between the 2 lines

In this simple format (matching the whole line), it's not going to make much difference, but it will start to matter if you want to do stuff like match the first word only.

This does a uniq on the first word in the line, and deletes all but the first line:

g/\%(^\1\>.*$\n\)\@<=\(\k\+\).*$/d

 See also

    * Unique sorting script to 'sort unique' a List (not text lines)
    * system_utils.vim command to remove duplicate lines in a range (uses g//d method)
    * Sort lines how to sort lines 

 Comments

Here are some more Vim-native ways for removing duplicate lines. This time they don't have to be adjacent. Line order is preserved.

This one can be a bit slow.

:nno \d1 :g/^/m0<CR>:g/^\(.*\)\n\_.*\%(^\1$\)/d<CR>:g/^/m0<CR>

This is faster. Uses mark l.

:nno \d2 :g/^/kl\|if search('^'.escape(getline('.'),'\.*[]^$/').'$','bW')\|'ld<CR>

Following uses a substitute to delete all repeated lines (leaving only the first line, while deleting following duplicate lines). This is a variation on the g//d method.

%s/^\(.*\)\(\n\1\)\+$/\1/
```

## 33.46 Ranges tutorial

```text
Tip 1611 

A range permits a command to be applied to a group of lines in the current buffer. For most commands, the default range is the current line. For example:

    * :s/old/new/g   changes all old to new in the current line
    * :11,15s/old/new/g   changes lines 11 to 15 inclusive
    * :%s/old/new/g   changes all lines 
```

### 33.46.1 Examples

```text
A range can be specified using line numbers or special characters, as in these examples:
|Range 	|Description					|Example
-------------------------------------------------------------------------------
|21 	|line 21 					|:21s/old/new/g
|1 	|first line 					|:1s/old/new/g
|$ 	|last line 					|:$s/old/new/g
|. 	|current line 					|:.w single.txt
|% 	|all lines (same as 1,$) 			|:%s/old/new/g
|21,25 	|lines 21 to 25 inclusive 			|:21,25s/old/new/g
|21,$ 	|lines 21 to end				|:21,$s/old/new/g
|.,$ 	|current line to end 				|:.,$s/old/new/g
|.+1,$ 	|line after current line to end			|:.+1,$s/old/new/g
|.,.+5 	|six lines (current to current+5 inclusive) 	|:.,.+5s/old/new/g
|.,.5 	|same (.5 is interpreted as .+5)		|:.,.5s/old/new/g

The :s/// command substitutes in the specified lines. The :w command writes a file. On its own, :w writes all lines from the current buffer to the file name for the buffer. Given a range and a file name, :w writes only the specified lines to the specified file. The example above creates file single.txt containing the current line.

If you know you want to substitute in six lines, starting from the current line, you can use either of the ranges shown above. An easier method is to enter a count value (type 6), then enter the colon command with no range (type :s/old/new/g). Because you entered a count, Vim displays the command:

:.,.+5s/old/new/g
```

### 33.46.2 Default Range

```text
For most commands, the default range is . (the current line, for example, :s/// substitutes in the current line). However, for :g// and :w the default is % (all lines).
Example 	Equivalent 	Description
:s/old/new/g 	:.s/old/new/g 	substitute in current line
:g/old/ 	:%g/old/ 	list all lines matching old
:w my.txt 	:%w my.txt 	write all lines to file my.txt
```

### 33.46.3 Selections

```text
A command like :123,145s/old/new/g substitutes in lines 123 to 145 inclusive, but what if you're not sure what the line numbers are? One method is to use marks: Type ma in the first line, then type mb in the last line (to set marks a and b). Then enter command :'a,'bs/old/new/g to substitute in lines from mark a to b, inclusive.

Another method is to visually select lines, then enter a colon command (for example, :s/old/new/g). Note that you do not enter a range. However, because the command was entered while lines were selected, Vim displays the command as:

:'<,'>s/old/new/g

The range '<,'> is entered automatically to identify the lines that were last visually selected (they do not need to be visually selected now).

For example, you might type vip to visually select "inner paragraph" (the paragraph holding the cursor). Then type :s/old/new/g to substitute in all lines in the selected paragraph. 
```

### 33.46.4 Deleting, copying and moving

```text
Ranges work with Ex commands (those typed after a colon, for example, :w). As well as the commands we've seen so far, it's handy to know how to use :d (delete lines), :t or :co (copy lines), and :m (move lines).
Command 	Description
:21,25d 	delete lines 21 to 25 inclusive
:$d		delete the last line
:1,.-1d 	delete all lines before the current line
:.+1,$d 	delete all lines after the current line
:21,25t 30 	copy lines 21 to 25 inclusive to just after line 30
:$t 0		copy the last line to before the first line
:21,25m 30 	move lines 21 to 25 inclusive to just after line 30
:$m 0		move the last line to before the first line

The line numbers in a command are those before the command executes. In the earlier example which moved lines 21..25 to after 30, the "30" refers to the line number before the move occurred. 
```

### 33.46.5 Ranges with marks and searches

```text
In a range, a line number can be given as:

    * A mark (for example, 'x is the line containing mark x).
    * A search (for example, /pattern/ is the next line matching pattern). 

When using a mark, it must exist in the current buffer.
Command 	Description
:'a,'bd 	delete lines from mark a to mark b, inclusive
:.,'bd		delete lines from the current line to mark b, inclusive
:'a,'bm 0 	move lines from mark a to b inclusive, to the beginning

Here are some examples using searches:

:.,/green/co $
    copy the lines from the current line to the next line containing 'green' (inclusive), to the end of the buffer 
:/apples/,/apples/+1s/old/new/g
    replace all "old" in the next line in which the "apples" occurs, and the line following it 
:/apples/;.1s/old/new/g
    same (.1 is .+1, and because ; was used, the cursor position is set to the line matching "apples" before interpreting the .+1) 
:/apples/,.100s/old/new/g
    replace all "old" in the next line in which "apples" occurs, and all lines up to and including 100 lines after the current line (where the command was entered) 

Even more tricks are available; see :help cmdline-ranges. Summary:
Item		Description
/pattern/ 	next line where pattern matches
?pattern? 	previous line where pattern matches
\/		next line where the previously used search pattern matches
\? 		previous line where the previously used search pattern matches
\& 		next line where the previously used substitute pattern matches
0;/that 	first line containing "that" (also matches in the first line)
1;/that 	first line after line 1 containing "that" 
```

## 33.47 C++ code completion

```text
Tip 1608 author Knue · version 7.0 

This tip describes how to use C++ code completion in Vim (omni completion).

When editing a C++ file, enter the command :set omnifunc? to see what completion function is currently used. If the result is omnifunc=ccomplete#Complete, it means you are using the C completion provided with Vim (not C++). The following procedure provides C++ completion.
Contents
[hide]

    * 1 Required setup
    * 2 Using omni completion
    * 3 Additional information
    * 4 Comments

edit Required setup

|1. Install OmniCppComplete. See its doc/omnicppcomplete.txt file for information.
|
|2. Make a directory, for example ~/.vim/tags that will hold your ctags.
|
|3. Create stdc++ tags: Download and unpack the modified libstdc++ headers to ~/.vim/tags/cpp_src
(get it at http://www.vim.org/scripts/script.php?script_id=2358, intructions:
|1. unpack
|
|2. run
|$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ cpp_src
|$ mv tags cpp # or whatever
|
|3. In Vim:
set tags+=/my/path/to/tags/cpp 
 )
|
|4. Run ctags:

$ cd ~/.vim/tags
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ cpp_src
$ mv tags cpp

|5. Add additional tags (change to your system/likings):

$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/GL/ && mv tags gl # for OpenGL
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/SDL/ && mv tags sdl # for SDL
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++ /usr/include/qt4/ && mv tags qt4 # for QT4

For example, to add tags of ACS 5.1 project (enter clearcase view first then)
$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q --language-force=C++  && mv tags ~/.vim/tags/acs_5_1/

|6. Edit your ~/.vimrc and change to your system/likings:

" configure tags - add additional tags here or comment out not-used ones
set tags+=~/.vim/tags/cpp
set tags+=~/.vim/tags/gl
set tags+=~/.vim/tags/sdl
set tags+=~/.vim/tags/qt4
"For ACS 5_1
set tags+=~/.vim/tags/acs_5_1
#Note, on my linux dev env I need to run manualy the set tags commands from ex prompt to make it work
" build tags of your own project with CTRL+F12
map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

" OmniCppComplete
let OmniCpp_NamespaceSearch = 1
let OmniCpp_GlobalScopeSearch = 1
let OmniCpp_ShowAccess = 1
let OmniCpp_MayCompleteDot = 1
let OmniCpp_MayCompleteArrow = 1
let OmniCpp_MayCompleteScope = 1
let OmniCpp_DefaultNamespaces = ["std", "_GLIBCXX_STD"]
" automatically open and close the popup menu / preview window
au CursorMovedI,InsertLeave * if pumvisible() == 0|silent! pclose|endif
set completeopt=menuone,menu,longest,preview

edit Using omni completion

When everything is set up properly you can use the code completion. Make sure the file-type of your file is set to cpp. Perhaps you must set it manually with

:setfiletype cpp

Now start typing:

std::

A box opens with suggestions. You can use C-n and C-p to navigate. C-x C-o opens the omnicompletion manually. A preview window should also appear on the top which shows the signature of functions and the like. Choose vector and continue:

std::vector<int> vi;
vi.

Another box opens with suggestions. Choose "push_back(" and continue.

As you can see this is a really nice feature which is especially nice when you use an external library which you don't know that good. Simply create the tags as described above and browse through the suggestions.
edit Additional information

It is nice to have the headers of the used libs really on your system so the preview window has something to show. So don't delete the headers after creating the tag files.
edit Comments

Notes paraphrased from a vim_use post by Brett Stahlman (to be merged into tip):

With standard Vim, when you edit a C++ file (*.cpp or *.cc), 'omnifunc' is set to ccomplete#Complete which uses the distributed omnicomplete function for C, defined in file: $VIMRUNTIME/autoload/ccomplete.vim

The C version can display class members, but it won't do so unless you declare the class variable with "class MyClass" (as opposed to simply "MyClass").

Solution: Use the omnicppcomplete plugin mentioned in the tip. It is C++ aware, and may also be used for C. It understands inheritance, "this" pointers, namespaces, etc.

Limitations: It's not fully functional with templates (supposedly because of limitations in exuberant ctags). So far, the only template limitation I've encountered is that "this" pointers aren't completed properly within method implementations.

How-it-works: The omnicppcomplete plugin, which consists of a number of Vim script files, implements an 'omnifunc' function (using the autoload mechanism) that handles completion for <C-X><C-O>, and also defines insert mode mappings for '.', '->', and '::', to ensure that completion is performed automatically when those characters are typed, without the need for the user to hit <C-X><C-O>.

    * :help i_CTRL-X_CTRL-O
    * :help 'omnifunc'
    * :help complete-functions 

The omnicppcomplete plugin's 'omnifunc' function first attempts to determine what sort of lookup needs to be performed, based upon the surrounding context, then performs the lookup in the tags file(s) specified in the 'tags' option. For C++ completion to work properly, you must use the ctags options shown in the tip, for example:

ctags --c++-kinds=+p --fields=+iaS --extra=+q test1.cpp

"
```

## 33.48 Handle common command typos

```text
Use cabbrev to correct command typos that you commonly make.

For example, if you tend to hold the shift key too long:

cabbrev Q quit
cabbrev W write

or, if you tend to miss the "!" and hit the "@" as well:

cabbrev q!@ q!
cabbrev wq!@ wq!

If you ever find that you actually need to type one of the typos you make, you'll need to disable cabbrev temporarily. 
 
Some related examples from my .vimrc file:
" Frequently when I go to save with :w I am flying to fast and I type :W
" which gives me an obvious error.
"
" How can I map :W to :w ???
" How can I map :Q to :q ???
"
" I know there is :ZZ but I like the :w more.
"
:command! -bang W w<bang>
:command! -bang Q q<bang>
:command! -bang Wa wa<bang>
:command! -bang Qa qa<bang>
" often make the mistake of typing w1 instead of w!.
" Can you please suggest how to map w1 to w!?
if version<  700
	        cnoreabbrev w1 w!
else
	        cnoreabbrev  <expr>  w1  ((getcmdtype() == ':'  &&  getcmdpos()  <= 2)?   'w!' : 'w1')
endif
```

## 33.49 Environment variables

```text
Tip 1589 complexity basic · author Metacosm · version 7.0

Vim can read and write environment variables within your current shell session. Use a $ prefix to identify an environment variable, as in the following examples.

Display the contents of the PATH environment variable:

:echo $PATH

Assign the PATH environment variable to a Vim variable:

:let myvar = $PATH

Change the PATH environment variable for the current session:

:let $PATH = '/foo:/bar'

Insert the contents of the PATH environment variable into the buffer:
Press i to enter insert mode, press Ctrl-r then =$PATH and press Enter.

References:

    * :help expr-env
    * :help expression-syntax
    * :help {{{id}}} 
```

## 33.50 Using the Windows clipboard in Cygwin Vim

```text
Tip 1623 created April 10, 2009 · complexity basic · author Ir0nh34d · version 7.0

Using Vim under Cygwin, it is difficult to access the Windows clipboard:

    * Typing "+y does not yank (copy) to the Windows clipboard.
    * Typing "+p does not paste from the Windows clipboard. 

As a result, you cannot easily use the clipboard to copy text between Cygwin Vim and a native Windows application. This tip shows some workarounds.

Contents

    * 1 Copy to Windows clipboard
    * 2 Paste from Windows clipboard
    * 3 See also
```

### 33.50.1 Copy to Windows clipboard

```text
Using this function:

function! Putclip(type, ...) range
  let sel_save = &selection
  let &selection = "inclusive"
  let reg_save = @@
  if a:type == 'n'
    silent exe a:firstline . "," . a:lastline . "y"
  elseif a:type == 'c'
    silent exe a:1 . "," . a:2 . "y"
  else
    silent exe "normal! `<" . a:type . "`>y"
  endif
  call system('putclip', @@)
  let &selection = sel_save
  let @@ = reg_save
endfunction

And simple mappings, such as:

vnoremap <silent> <leader>y :call Putclip(visualmode(), 1)<CR>
nnoremap <silent> <leader>y :call Putclip('n', 1)<CR>

You can visually select some text then yank it to the Windows clipboard, or use the normal yank options (for example, 3\y to yank 3 lines based from the current line, assuming the default backslash leader key).

To allow for usage from the command line, add a command to execute Putclip with a range:

com! -nargs=0 -range=% Putclip call Putclip('c', <line1>, <line2>)
```

### 33.50.2 Paste from Windows clipboard

```text
Using this function:

function! Getclip()
  let reg_save = @@
  let @@ = system('getclip')
  setlocal paste
  exe 'normal p'
  setlocal nopaste
  let @@ = reg_save
endfunction

And a simple mapping, such as:

nnoremap <silent> <leader>p :call Getclip()<CR>

You can use the normal paste options (for example, \p to paste the clipboard contents, assuming the default backslash leader key).
```

### 33.50.3 See also

```text
    * fakeclip plugin allowing use of "*p, "*yy and more on Cygwin 
```

## 33.51 Showing syntax highlight group in statusline

```text
Tip 1573 created June 22, 2008 · complexity basic · author Dominiko · version 7.0

You can show the syntax highlight group where the cursor is located in your statusbar. This is especially useful when tweaking a color theme.

First define a function which returns the highlight group syntax under the cursor:

function! SyntaxItem()
  return synIDattr(synID(line("."),col("."),1),"name")
endfunction

Then insert into your statusline a call to function SyntaxItem:

set statusline+=%{SyntaxItem()}

Here is a complete example showing the syntax highlight group among other things:

if has('statusline')
  set statusline=%#Question#                   " set highlighting
  set statusline+=%-2.2n\                      " buffer number
  set statusline+=%#WarningMsg#                " set highlighting
  set statusline+=%f\                          " file name
  set statusline+=%#Question#                  " set highlighting
  set statusline+=%h%m%r%w\                    " flags
  set statusline+=%{strlen(&ft)?&ft:'none'},   " file type
  set statusline+=%{(&fenc==\"\"?&enc:&fenc)}, " encoding
  set statusline+=%{((exists(\"+bomb\")\ &&\ &bomb)?\"B,\":\"\")} " BOM
  set statusline+=%{&fileformat},              " file format
  set statusline+=%{&spelllang},               " language of spelling checker
  set statusline+=%{SyntaxItem()}              " syntax highlight group under cursor
  set statusline+=%=                           " ident to the right
  set statusline+=0x%-8B\                      " character code under cursor
  set statusline+=%-7.(%l,%c%V%)\ %<%P         " cursor position/offset
endif

See also

    * Identify the syntax highlighting group used at the cursor 

References

    * :help 'statusline'
    * :help synIDattr 
```

## 33.52 Tip 278 The principles of effective text editing

```text
	is moving around very efficiently.

	Following are some pointers which may help you do that.

	h   move one character left
	j   move one row down
	k   move one row up
	l   move one character right
	w   move to beginning of next word
	b   move to beginning of previous word
	e   move to end of word
	W   move to beginning of next word after a whitespace
	B   move to beginning of previous word before a whitespace
	E   move to end of word before a whitespace

	All the above movements can be preceded by a count; e.g. 4j will move down 4 lines.

	0   move to beginning of line
	$   move to end of line
	^   move to first non-blank char of the line
	_   same as above, but can take a count to go to a different line
	g_  move to last non-blank char of the line (can also take a count as above)

	gg  move to first line
	G   move to last line
	nG  move to n'th line of file (where n is a number)

	H   move to top of screen
	M   move to middle of screen
	L   move to bottom of screen

	Ctrl-D  move half-page down
	Ctrl-U  move half-page up
	Ctrl-B  page up
	Ctrl-F  page down
	Ctrl-o  jump to last cursor position
	Ctrl-i  jump to previous cursor position

	n   next matching search pattern
	N   previous matching search pattern
	*   next word under cursor
	#   previous word under cursor
	g*  next matching search pattern under cursor
	g#  previous matching search pattern under cursor
	
	%   jump to matching bracket { } [ ] ( )
	
	See :help {command} (for example, :help g_) for all of the above if you want more details. 
```

## 33.53 Tip 396 Highlight unwanted spaces

```text
It can be hard to maintain consistent use of whitespace characters (space and tab). You may not want spaces before tabs, or trailing whitespace at the end of a line. Sometimes you may want to avoid tabs, or just see where tabs occur.

This tip shows several ways to highlight unwanted whitespace. In addition, the tip explains how to use the listchars option (abbreviated to lcs) to indicate when characters are not displayed on long lines.
Contents
[hide]

    * 1 Highlighting with a search
    * 2 Highlighting with the match command
    * 3 Highlighting with the syntax command
    * 4 Using the list and listchars options
    * 5 Using syntax space errors
    * 6 Showing long lines
    * 7 See also
    * 8 Comments
```

### 33.53.1 Highlighting with a search

```text
For occasional use, you can simply search using a suitable pattern to highlight what you want. The following examples assume you use search highlighting (:set hlsearch).

" Show all tabs:
/\t

" Show trailing whitespace:
/\s\+$

" Show spaces before a tab:
/ \+\ze\t
```

### 33.53.2 Highlighting with the match command

```text
The :match command specifies the name of a highlight group and a pattern. Any text matching the pattern will be displayed in the foreground and background colors defined by the highlight group. :help :match :help :2match

Some examples follow. These use a highlight group named ExtraWhitespace which could be defined with one of the following in your vimrc. :help :highlight

:highlight ExtraWhitespace ctermbg=red guibg=red
" The following alternative may be less obtrusive.
:highlight ExtraWhitespace ctermbg=darkgreen guibg=lightgreen
" Try the following if your GUI uses a dark background.
:highlight ExtraWhitespace ctermbg=darkgreen guibg=darkgreen

However, be aware that future colorscheme commands may clear all user-defined highlight groups. Using,

:autocmd ColorScheme * highlight ExtraWhitespace ctermbg=red guibg=red

before the first colorscheme command will ensure that the highlight group gets created and is not cleared by future colorscheme commands. :help :colorscheme

Once this highlight group is created, it can be associated with matching text as in the following examples.

" Show trailing whitespace:
:match ExtraWhitespace /\s\+$/

" Show trailing whitepace and spaces before a tab:
:match ExtraWhitespace /\s\+$\| \+\ze\t/

" Show tabs that are not at the start of a line:
:match ExtraWhitespace /[^\t]\zs\t\+/

" Show spaces used for indenting (so you use only tabs for indenting).
:match ExtraWhitespace /^\t*\zs \+/

" Switch off :match highlighting.
:match

Alternatively, the following pattern will match trailing whitespace, except when typing at the end of a line.

:match ExtraWhitespace /\s\+\%#\@<!$/

If you use this alternate pattern, you may want to consider using the following autocmd to let the highlighting show up as soon as you leave insert mode after entering trailing whitespace:

:autocmd InsertLeave * redraw!

Or alternatively, the following can be used:

:au InsertEnter * match ExtraWhiteSpace /\s\+\%#\@<!$/
:au InsertLeave * match ExtraWhiteSpace /\s\+$/

which does not "flash" the screen.

Any :match highlighting applies only to the current window. With the following in your vimrc, the command will be applied to the first window, and to any subsequent windows. The pattern * applies the highlight to all files.

" Show leading whitespace that includes spaces, and trailing whitespace.
:autocmd BufWinEnter * match ExtraWhitespace /^\s* \s*\|\s\+$/

Rather than an autocmd, you may prefer a mapping. With the following, and the default backslash Leader key, you can type \wn to switch highlighting on, and \wf to switch it off.

:nnoremap <Leader>wn :match ExtraWhitespace /^\s* \s*\<Bar>\s\+$/<CR>
:nnoremap <Leader>wf :match<CR>

With Vim 7.1.40 and later, you can use the matchadd() function to define matches (making the :match command available for other purposes). See Highlight long lines for examples.
```

### 33.53.3 Highlighting with the syntax command

```text
Using the :match command is easy, but you may want to keep it for another purpose. An alternative is to use syntax highlighting. :help syntax

Here is an example using one of the patterns shown earlier. Put this in your vimrc, after the command :syntax on (which you may already have). Of course you would also need to define ExtraWhitespace with a :highlight command, as shown earlier.

" Show trailing whitepace and spaces before a tab:
:autocmd Syntax * syn match ExtraWhitespace /\s\+$\| \+\ze\t/

If you want the above command to also work if the match is nested in some other syntax group, append containedin=ALL to the end.
```

### 33.53.4 Using the list and listchars options

```text
In Vim, 'list' is a boolean option that defaults to off. If 'list' is on, whitespace characters are made visible. The 'listchars' option can be used to customize the way whitespace characters are shown. The default displays "^I" for each tab, and "$" at each EOL (end of line, so trailing whitespace can be seen). :help 'list'

The command :set list displays whitespace, while :set nolist displays normally. It is convenient to use :set list! to toggle the option on, so that you can later press : followed by the up arrow to repeat the previous command, to toggle 'list' off.

The following example toggles list, then sets listchars to not display an end-of-line character, and to display > for the first character occupied by a tab, and - for any subsequent characters that the tab may occupy.

:set list!
:set listchars=tab:>-

Here are some alternatives that you can try (each sets list and listchars in one command):

:set list listchars=tab:>-,trail:.,extends:>
" Enter the middle-dot by pressing Ctrl-k then .M
:set list listchars=tab:\|_,trail:·
" Enter the right-angle-quote by pressing Ctrl-k then >>
:set list listchars=tab:»·,trail:·
" Enter the Pilcrow mark by pressing Ctrl-k then PI
:set list listchars=tab:>-,eol:¶
" The command :dig displays other digraphs you can use.

The listchars option uses the "NonText" highlighting group for "eol", "extends" and "precedes", and the "SpecialKey" highlighting group for "nbsp", "tab" and "trail". :help 'listchars'
```

### 33.53.5 Using syntax space errors

```text
Vim has several syntax files that support the display of "space errors". For example, for the C programming language (:set filetype=c), you could put the following in your vimrc:

let c_space_errors = 1

Supported languages are: ada, c, chill, csc, forth, groovy, icon, java, lpc, mel, nqc, nroff, ora, pascal, plm, plsql, python and ruby. The c settings also apply to cpp.

To highlight space errors in java files, you would use:

let java_space_errors = 1

For C, if you don't want to see trailing space errors at end-of-line set:

let c_no_trail_space_error = 1

If you only use spaces to indent, and don't want to see space errors in front of tabs:

let c_no_tab_space_error = 1

If you are interested in learning more, open the syntax file for C (in Vim, put the cursor on the path $VIMRUNTIME/syntax/c.vim and type gf). Then look for the definition of the highlight group cSpaceError (near the end of the file). That group specifies the color used to display space errors in C files. The command :hi cSpaceError will show "xxx" in that color.
```

### 33.53.6 Showing long lines

```text
By default, lines longer than the screen width are not wrapped, and you can horizontally scroll the text, for example by moving the cursor to the end of a long line. Therefore there may be characters preceding the visible text (non-displayed characters on the left), and there may be characters that extend after the visible text (non-displayed characters on the right). The listchars option can be used to show a highlighted symbol when characters are not displayed, for example:

" Show < or > when characters are not displayed on the left or right.
:set list listchars=precedes:<,extends:>
" Same, but also show tabs and trailing spaces.
:set list listchars=tab:>-,trail:.,precedes:<,extends:>

"
```

### 33.53.7 See also

```text
    * Highlight some whitespace characters a script to toggle specified highlighting
    * Converting tabs to spaces to convert tabs to spaces or vice versa
    * Remove unwanted spaces to display or remove unwanted spaces
    * Remove unwanted empty lines to delete blank lines
    * cream-showinvisibles plugin for attractive display of tabs, returns and trailing spaces 
```

## 33.54 Tip 438 Search and replace in a visual selection

```text
Contents

    * 1 Visual selection basics
    * 2 Ex commands
    * 3 Substituting in a visual selection
    * 4 Searching with / and ?
    * 5 References
    * 6 Comments
```

### 33.54.1 Visual selection basics

```text
You can visually select text, then operate on the selection.

Press v to select a range of text, or V to select whole lines, or Ctrl-V (Ctrl-Q if you use Ctrl-V to paste) to select a block.

After starting the selection, move the cursor with any normal-mode movement commands (such as j to move down, or w to move by a word, or / to search).

Marks for the beginning and end of the visual selection are automatically defined:

'<  start line
`<  start character
'>  end line
`>  end character

You can press gv to reselect the last visual selection, but the '< and '> marks defining the beginning and end of the block persist even when the selection highlight has been removed, so gv is not necessary to repeat a command.
```

### 33.54.2 Ex commands

```text
When text is visually selected, press : to enter a command. The command line will automatically enter the range:

:'<,'>

You can enter a command such as s/red/green/g to replace each red with green in all lines of the last visual selection. The command will appear as:

:'<,'>s/red/green/g

To repeat an Ex command over a previously selected block, use the : history. That is, press : then <Up>, then edit a previous command.
```

### 33.54.3 Substituting in a visual selection

```text
The substitute command (:s) applies to whole lines, however the \%V atom will restrict a pattern so that it matches only inside the visual selection. This works with characterwise and blockwise selection (and is not needed with linewise selection).

For example, put the cursor on this line:

music amuse fuse refuse

In normal mode, type ^wvee to visually select "amuse fuse" (^ goes to first nonblank character, w moves forward a word, v enters visual mode, e moves forward to end of next word). Then press Escape and enter the following command to change all "us" to "az" in the last-selected area within the current line:

:s/\%Vus/az/g

The result is:

music amaze faze refuse

For another example, copy the following text into a buffer:

Before block with old and sold.
First told abc old sold gold.
Another is old, gold but not cold.
Last is older, fold not bold.
After block with fold and older and bold.

Perform a block selection:

    * Type /abc and press Enter to search for 'abc'.
    * Press Ctrl-V to start a block selection (press Ctrl-Q if you use Ctrl-V for paste).
    * Type eee to select to the end of "sold".
    * Type jj to extend the block selection over three lines.
    * Press Escape to clear the selection. 

Now we will use a substitute command to replace each "old" with "NEW". The replacement will check each line in the buffer, but will only match within the last visual selection:

:%s/\%Vold/NEW/g

The result is:

Before block with old and sold.
First told abc NEW sNEW gold.
Another is NEW, gNEW but not cold.
Last is older, fNEW not bold.
After block with fold and older and bold.

The vis.vim plugin is another approach to apply substitutes to a selected region.
```

### 33.54.4 Searching with / and ?

```text
In visual mode, / and ? will update the visual selection just like any other cursor-movement command (that is, when in visual mode, searching will extend the selection).

In order to actually search within the visual selection, you will need to use the \%V atom, or use the markers defined by the visual selection with the \%>'< and \%<'> atoms. This is best done by leaving the visual selection with <Esc> before entering your search. You may want to consider a mapping to automatically leave visual selection and enter the appropriate atoms. For example:

:vnoremap <M-/> <Esc>/\%V

Using this mapping, you can press Alt-/ in order to automatically fill in a "range" for your search just like using an Ex command with :. To use this, move to the first line of interest and press V to start line-wise visual selection. Move down (press j for a line or } for a paragraph, etc). When you have selected the area you want to search, press Alt-/. The visual selection will be removed, and a search command will start. You will see:

/\%V

Add what you want to find, then press Enter. For example, you may enter green and see:

/\%Vgreen

When you press Enter, each occurrence of "green" will be highlighted, but only in the area that you had previously selected.

Here are two further examples that do not use a visual selection. The first command searches only in lines 10 to 20 inclusive. The second searches only between marks a and b.

/\%>9l\%<21lgreen
/\%>'a\%<'bgreen

See Search keywords in C function which uses this technique to search within a function in a C program.
```

### 33.54.5 References

```text
    * :help :'
    * :help history
    * :help /\%V
    * :help /\%>'m
    * :help /\%<'m 
```

## 33.55 Tip 330 How to stop auto indenting

```text
This tip discusses automatic indenting of text that may occur while you are typing, and explains how to disable such automatic indentation.

For a general discussion of indenting, see Indenting source code.

If you use Vim in a terminal, you may find that pasting from another application changes the indents in the pasted text. See Toggle auto-indenting for code paste to deal with that problem.
Contents

    * 1 Disabling file type based indentation for a specific file type
    * 2 Disabling file type based indentation for all file types
    * 3 Disabling auto indent for the current file
    * 4 Comments
```

### 33.55.1 Disabling file type based indentation for a specific file type

```text
You may like auto indenting in C programs, but dislike it when editing html files. You can disable auto indentation for particular files types; the following example shows how to do this for html files.

Create the file ~/.vim/indent/html.vim on Unix-based systems, or $HOME/vimfiles/indent/html.vim on Windows systems, containing the single line:

let b:did_indent = 1

This creates a user-specific indent script which will be loaded before the file type indent script. Auto indenting for the particular file type is disabled because well-behaved indent scripts do nothing if the buffer-local variable b:did_indent is defined (that variable indicates that the current buffer already has script-based indenting enabled).

You need to use the correct name for the file type (html in the above). If you are not sure what that name is, edit a file where you want to remove auto indentation (for example, my.htm), then enter the following command to display the value of the ft (filetype) option for the current buffer:

:set ft?
```

### 33.55.2 Disabling file type based indentation for all file types

```text
The auto indentation provided for most languages is very helpful, and you should consider trying it. However, it's easy to disable all auto indents if wanted.

Actually, auto indentation is off by default, and if it is enabled on your system, that is because something has enabled it. For example, your vimrc may contain:

filetype indent plugin on

or

filetype indent on

If you remove the indent keyword, none of your files will have file type based indentation rules applied.

However, the filetype indent plugin on command may be included in a system-wide vimrc (:help system-vimrc), or in the file vimrc_example.vim sourced from your vimrc. For either of these cases, put the following near the bottom of your vimrc to disable filetype based indentation:

filetype indent off
```

### 33.55.3 Disabling auto indent for the current file

```text
To see the current indenting settings, and where they were set, enter:

:verbose set ai? cin? cink? cino? si? inde? indk?

If you are editing a particular file and you want to prevent auto indenting within that file, enter:

:setlocal noautoindent
:setlocal nocindent
:setlocal nosmartindent
:setlocal indentexpr=

The following is equivalent (it uses the abbreviated names in a single command):

:setl noai nocin nosi inde=

Here is a mapping so you can press F8 to disable auto indenting:

:nnoremap <F8> :setl noai nocin nosi inde=<CR>
```

### 33.55.4 Comments

```text
You may have disabled auto indenting in HTML files, but you would like auto indenting of your embedded PHP code. When wanted, enter the following to toggle the smartindent option, and show its current value:

:setl si! si?

    Note that while 'smartindent' works decently for PHP, filetype indentation usually works better, even in this case. I think that -- and correct me if I'm wrong -- setting ft=php should offer indentation for PHP while leaving the HTML alone. See :help 'filetype', and also VimTip1213. (Spiiph 23:10, 2 August 2009 (UTC)) 
```

## 33.56 Tip 16 Avoiding the "Hit ENTER to continue" prompts

```text
	The "Hit ENTER to continue" prompt is displayed when Vim is about to redraw the screen, but there's text on the screen that you might need to read. This happens when something is displayed on the status line that is wider than the window, and after executing an external command.

	To reduce how often you see the "Hit ENTER to continue" prompt, you can shorten the messages, increase the space for displaying messages, or even tell Vim not to worry about external command output.

	To decrease message size, use the 'shortmess' option. Add the following line to your vimrc:

	:set shortmess=a

	This will use abbreviations for status messages to make lines shorter. (There are several other flags for 'shortmess' that can shorten messages even more. :help 'shortmess')

	To give more space for displaying messages, you can increase the height of the command line to 2 or greater:

	:set cmdheight=2

	The default command height is 1. Increasing cmdheight will allow more room for commands, although it will take some space away from editing.

	Finally, you can use :silent to keep external commands from triggering the "Hit ENTER" prompt:

	:silent !echo Hello

	If the command generates any output, you may need to manually refresh the screen once you return to Vim (by typing Ctrl-L or entering :redraw!). (If you're running a GUI version of Vim, :silent may keep you from seeing any output from the command at all!)
	See also

	     Execute external programs asynchronously under Windows for the "Hit any key to close this window..." prompt under Windows 
	    
References

* :help hit-enter
* :help 'shortmess'
* :help 'cmdheight'
* :help :!cmd
* :help :silent 

[edit] Comments

* putting the following setting into your .vimrc settings file works good for eliminating the <Press Enter> message when first bringing up a vim editor to a specific file with a large path.
The 't' option chops the beginning portion of file lines, indicating the truncation with a < sign at the point of truncation.

set shortmess=at
```

## 33.57 Tip 1577 Record a recursive macro

```text
	Often, when dealing with a data file in text format (e.g. csv), we need to massage the data to modify, filter or rearrange it. Using a clever trick to recursively use Vim's complex repeats (i.e. "macro recording"), such tasks can be done easily without having to be a REGEXpert.

	Let's say we have a text file with the following contents:

	dr-------- 20906
	drwx------ 20913
	drwxr-x--- 20704
	drwxr-xr-x 21104
	lrwxrwxrwx 20606
	-------r-- 21004
	-rw-r----- 20716
	-rwxrwx--- 21102

	For some reason, we want to move the 5-digit number at the end of the line to after the last "r" character on the same line, and we want to repeat it for the whole file. Notice that all these numbers begin with "2" and there can be multiple "r" per line.

	Here's the end-result that we want:

	dr20906--------
	dr20913wx------
	drwxr20704-x---
	drwxr-xr21104-x
	lrwxrwxr20606wx
	-------r21004--
	-rw-r20716-----
	-rwxr21102wx---

	Yes, this can be done via :substitute with back references (Try: %s/\v(.+r)(.+)\s(\d{5})/\1\3\2/), but that can be intimidating for some. An easier, more flexible and often quicker method to accomplish the same task is to use "complex repeats", which really aren't too complex.

	Here's how:

	   a. Place the cursor on the first character of the first line of the file.
	   b. Hit the following keys to record the repeat-sequence:
qqq : Start and immediately end recording for register q -- this essentially empties register q
* qq : Start recording actions into register q
* f2 : Find the "2" character to the right on this line (cursor will jump there)
* D : Delete and yank the 5-digit number into memory (rest of line)
* Fr : Find the "r" character to the left on this line (cursor will jump to the last "r")
* p : Paste the number that was yanked earlier after the "r" character
* Enter : Move the cursor to the next line
* @q : Execute the contents of register q (itself!), which is for now, empty, so nothing will happen. The trick here is that when we run it again with "@q" after you have ended the recording, it will call itself after processing each line! This recursive loop will process all the subsequent lines in that file, until it hits the end-of-file. This is the essence that makes complex repeats so flexible and powerful.
* q : End the recording 
c. Hit @q to apply the same manipulation to the rest of the file from the 2nd line onwards. Enjoy the art of flying cursor and automatic text manipulation on your screen. 

With this knowledge, you can now quickly perform complex editing of any structured text with relative ease.

This works much the same way as typing 9999@q to execute the 'q' register as many times as the count you pass, except that you do not need to think about the size of your file before doing so to make sure enough 9s are added.
Normally, a macro recorded in this way will repeat until it reaches the end of the file. But, you can easily take advantage of the fact that a macro will stop running if it encounters an error to end the recursion when you want. For example, suppose you have a list of file names (perhaps you obtained it with :r !ls *.c), and you want to verify that every one of these file names occurs in another buffer (a makefile, for instance). You could do this quickly and easily as follows:

* Format the file list to one file name per line, with each file name starting at beginning of the line
* Split a new window with the file you wish to contain all the file names (for a total of two windows)
* Position the cursor on the first line of the file list
* Record a recursive macro as follows: 

qfq
qf
0y$
<c-w>w
/\V<c-r>"<cr>
			<c-w>w
			j@f
			q

			The result is that register 'f' contains a macro that will search for every line of the list of file names, until it reaches the end of the list of file names or until it encounters an error such as "pattern not found: {filename}". If you run this macro on the file list, you will either see each file name highlighted in turn until the end of the list, or you will see a pattern not found error and (if 'hlsearch' is on) the missing file will be highlighted in the list.

			If you don't wan't to rely on an error in this way to end the recursion, you could also do :if cond | exe 'normal @q' | endif instead of @q while recording the macro to provide a base case to end the recursion.

			-> Adding recursion to an existing macro

			Forget to add the recursion as a final step, or want to debug first before running the macro on every line in the file? An easy solution is, after you have the macro doing everything but the recursive call, just append it to the register. Assuming that you've recorded the macro into the 'q' register, just do this:

			qQ
			@q
			q
```

## 33.58 Multiple commands at once

```text
	Tip 767 author pim · version 6.0

	You can execute more then one command by placing a | between two commands.

	For example:

	%s/htm/html/c | %s/JPEG/jpg/c | %s/GIF/gif/c
	
	This example substitutes for htm, then moves on to JPEG, then GIF.
	
	The second command (and subsequent commands) are only executed if the prior command succeeds.
	
	This works for most commands, but some commands like :argdo or :autocmd see the '|' as one of their arguments. This allows commands such as :argdo, which execute a different Vim command, to execute a series of commands. See :help :\bar for the full list of such commands.
	
	For example:
	
	argdo %s/foo/bar/gc | w
	
	Normally, Vim will complain if you haven't saved changes to a buffer before abandoning it, but by adding | w in the above example, you can actually write out each buffer after processing. Note that this command will, for each item in the arg list, do a :substitute and a :write. If :argdo didn't take '|' as an argument, it would instead run the :substitute on each item, then write the last item.  
	If you want to make a command chain including one of the commands listed at :help :\bar, you can still do so using the :execute command. For example, in order to chain a :normal command, you would need to do something like this:
	
	:execute 'normal "ayiw' | echo @a
	
	edit References
	
	    * :help :\bar
	        * :help :execute 
```

## 33.59 Find in files within Vim

```text
Tip 1543 author Fritzophrenic · version 7.0
Contents

    * 1 Basic use
    * 2 Tips and Tricks
          o 2.1 Old search results
          o 2.2 Recursive search
          o 2.3 Path separators
          o 2.4 Mappings
    * 3 Disabling autocmds for fast searches
    * 4 Using external programs for fast searches
    * 5 Related Plugins
    * 6 See also
    * 7 References
    * 8 Comments
```

### 33.59.1 Basic use

```text
A useful feature in many text editors is the ability to search for regular expressions in multiple files. Vim has this feature, but it is a little hard to find.

Vim provides these commands for searching files:

    * :grep
    * :lgrep
    * :vimgrep
    * :lvimgrep 

All of these commands can be used to search for a regular expression in whatever files you specify. "grep" and "lgrep" use an external application to perform the search, and are great if you are running Vim on a system with a good file searching utility, if you are accustomed to using an external application for your searches, or if your search is not a complicated one. "vimgrep" and "lvimgrep" are part of Vim, and therefore are good for using on any system, especially if you want to use Vim-style regular expressions in your search. Keep in mind though, that vimgrep can often be slower than grep, which will call an external program to do the dirty work.

These commands all fill a list with the results of their search. "grep" and "vimgrep" fill the "quickfix list", which can be opened with :cw or :copen, and is a list shared between ALL windows. "lgrep" and "lvimgrep" fill the "location list," which is local to the current window, and can be opened with :lw or :lopen. Both of these lists can be used to instantly jump to the matching line in whatever file it occurs in.

Use of grep and lgrep depend on the external application they point to, but use of vimgrep and lvimgrep is as follows:

:vim[grep][!] /{pattern}/[g][j] {file} ...

The 'g' option specifies that all matches for a search will be returned instead of just one per line, and the 'j' option specifies that Vim will not jump to the first match automatically.

For example, to search for the words "house" or "home" in all .txt files in the current directory, use:

:lvim /\<\(house\|home\)\>/gj *.txt
:lw
```

### 33.59.2 Tips and Tricks

#### 33.59.2.1 Old search results

```text
If you would like to view the results of a previous search, the :colder (or :lolder) and :cnewer (or :lnewer) commands will allow you to do this without typing the search again.

    * :help :colder
    * :help :cnewer
    * :help :lolder
    * :help :lnewer 
```

#### 33.59.2.2 Recursive search

```text
You can use ** in the file pattern to search recursively. For example, to search for all lines containing "dostuff()" in all .c files in the parent directory and all its subdirectories, use:

:vimgrep /dostuff()/j ../**/*.c

Be careful! On Windows, either escape the backslash with another backslash, or use a forward slash (see next section). The above will work on Windows, but this will not, for example:

:vimgrep /dostuff()/j ..\**\*.c
```

#### 33.59.2.3 Path separators

```text
In the Windows version of Vim, backslash ('\') characters can be used as path separators, but forward slashes also work, and using '/' allows file paths in these searches to work in Vim under any operating system. This is especially useful if your vimrc file is used on multiple platforms, and you want to write mappings for common searches as below.
```

#### 33.59.2.4 Mappings

```text
You can use a mapping, command, or abbreviation for common searches, like a search for a word under the cursor in all files of the same type in the current directory. This can be especially useful if you have it automatically open the results list as well.

This mapping uses <cword> to get the word under the cursor, and searches for it in the current directory and all subdirectories, opening the quickfix window when done:

map <F4> :execute "vimgrep /" . expand("<cword>") . "/j **" <Bar> cw<CR>

This command based on VimTip483 uses <cword> to get the word under the cursor, but also uses % to limit the search to the current file only:

command GREP :execute 'vimgrep /'.expand('<cword>').'/gj '.expand('%') | copen

Finally, this cabbrev uses CTRL-R CTRL-W to get the word under the cursor, limiting the search to files of the same type using expand("%:e"), and moving the cursor on the command-line to be just before the file list using <C-Left>, so that you can easily specify a different search location. This method is nice because you can either type :lvim<Enter> to perform the default search, or :lvim<Space> to enter the default search into the command line, but leave it there for editing.

cabbrev lvim
      \ lvim /\<lt><C-R><C-W>\>/gj
      \ *<C-R>=(expand("%:e")=="" ? "" : ".".expand("%:e"))<CR>
      \ <Bar> lw
      \ <C-Left><C-Left><C-Left>

Note: Using a cabbrev and a mapping together may not work very well, because the mapping will trigger the cabbrev. Also, be careful not to use common text in your cabbrev, such as making one for the "vim" command, because then whenever you try to edit a .vim file for example, the cabbrev will be expanded when you press Enter. You could avoid this by moving the cursor to somewhere else in the line before pressing enter.
```

### 33.59.3 Disabling autocmds for fast searches

```text
Using vimgrep to search hundreds of files can be slow. A search taking only a few seconds using an external grep program might take nearly a minute with vimgrep. One reason for this is that vimgrep uses Vim's procedures to read files, which can involve execution of several autocommands.

You can make use of the :noautocmd command modifier to drastically increase search speed by temporarily disabling all autocmds during the execution of the :vimgrep. It may also solve other issues you may have, such as unwanted interaction with plugins that trigger off BufRead events. Use it as follows:

:noautocmd vimgrep /{pattern}/[flags] {file(s)}

See :help :noautocmd

This simple addition should work in any of the examples given in this tip, including mappings and abbreviations.

An unfortunate side effect of disabling autocmds in this way is that you may find syntax highlighting is off when Vim displays the result. One workaround is to type :e and press Enter to reload the file. Another is to use the j flag in the search, to prevent jumping to the first match automatically. You will then need to enter a command such as :cw to open the quickfix window, then press Enter to see it. Or, use :cnext.

Note that autocmds must be enabled in order for vimgrep to work for remote or archived files, since Vim's editing of such files depends on plugins using autocmds.
```

### 33.59.4 Using external programs for fast searches

```text
If you want to speed up searching in files, and you don't need the power of Vim's regular expressions or its ability to detect file encodings, you can use an external program (traditionally grep) for searching. But, remember to do it within Vim using :grep, so that you have the output available in Vim to view and navigate by!

Depending on your system, you may find that a command like the following will quickly search files:

:grep pattern *.c

See :help :grep, :help 'grepprg', and Search using quickfix to list occurrences for ways to customize this, either to make it work on your system or to do something else entirely! The above example will work on many Unix-based systems (which have grep in the path), and on many Windows systems (where Vim will try to use findstr).

In addition there are plugins to integrate these utilities with Vim:

    * grep.vim : Grep search tools integration with Vim
    * findstr.vim : Using MS-Windows findstr utility to search for text with Vim 
```

### 33.59.5 Related Plugins

```text
    * trag.vim: A wrapper for vimgrep that facilitates regexp building and project handling
    * EasyGrep: Makes vimgrep easier with mappings and configurable options, and provides "replace in files" capability 
```

### 33.59.6 See also

```text
    * Tip 1234: Find files in subdirectories, for when the contents of a file are not known, but the file name or part of the file name is.
    * Tip 1008: Toggle to open or close the quickfix window, for a quick way to toggle on or off the quickfix window which contains the results of your vimgrep searches. 
```

### 33.59.7 References

```text
    * :help :grep
    * :help :vimgrep
    * :help quickfix
    * :help starstar
    * :help :<cword>
    * :help c_<C-R>_<C-W>
    * :help :cabbrev
    * :help abbreviations 
```

## 33.60 Copy or change search hit

```text
	Tip 1597 

	While searching, you may want to operate on the text found by a search. Typically, you want to copy a search hit, or change it (delete the hit, and enter insert mode so you can type in new text). Often one of the standard commands can be used (for example, if you searched for a complete word, the command cw may be sufficient to change it).

	A more general approach comes from the fact that //e can be used to repeat the last search (because no new search pattern was entered), with the e search offset to move the cursor to the end of the search hit. :help search-offset

	For example, after searching, you may want to change the hit. Without implementing this tip, you could type c//e and press Enter. Then enter the replacement text and press Escape.

*1 A search text object
*2 Explanation
*3 Limitations
*4 See also
*5 References
*6 Comments
```

### 33.60.1 A search text object

```text
With this tip, after searching you can:

* Type ys to copy the search hit.
* Type "+ys to copy the hit to the clipboard.
* Type cs to change the hit.
* Type gUs to convert the hit to uppercase.
* Type vs to visually select the hit. If you type another s you will extend the selection to the end of the next hit. 

For example, search for 'File' and change it to 'Data' (cs = change search):
		    
/File
csData<Esc>
" Sample to search: GetFileDir GetFileId GetFilePos MyFile BackupFile

Then press n to find the next occurrence and press . to repeat the change.

Put the following in your vimrc:

" Make a simple "search" text object.
vnoremap <silent> s //e<C-r>=&selection=='exclusive'?'+1':''<CR><CR>
\:<C-u>call histdel('search',-1)<Bar>let @/=histget('search',-1)<CR>gv
omap s :normal vs<CR>
```

### 33.60.2 Explanation

```text
This tip implements a simple search text object identified as "s". When in visual mode, s is mapped to find the end of the last search pattern (//e). When in operator-pending mode (for example, after pressing y in normal mode), s is mapped to normal-mode vs which starts visual mode (assuming v has not been mapped) and invokes the s visual-mode mapping.

The <C-r>= evaluates the following expression which tests the 'selection' option. If exclusive selection is used, the result is '+1', otherwise the result is an empty string. Accordingly, the visual-mode map becomes //e+1 or //e. :help search-offset

The visual-mode mapping continues with :<C-u> to enter the command line while removing the visual range automatically inserted by Vim. The histdel function removes the last (-1) item from the search history ('//e+1' or '//e'). The let statement assigns the previous search item to @/ (the search register) so pressing n or N will search for the next or previous instance.

In :help todo we see a plan for a future version of Vim:

Add text object for current search pattern: "a/" and "i/". Makes it possible to turn text highlighted for 'hlsearch' into a Visual area. 

This tip prefers the simple "s" for a search hit, with no attempt to implement "a" and "i" text objects. Instead, "s" selects from the current position to the end of the next search hit.

The default for visual mode in Vim is that you can press c or s to change a selected area. Using the mapping suggested in this tip, you would no longer be able to press s to change a visual area (use c instead).
```

### 33.60.3 Limitations

```text
The tip can be helpful to reduce distractions while editing because you can always press ys to yank the hit, or cs to change it (you don't have to think about an alternative method). However, the tip has several limitations:

Pressing . to repeat a change will change the same number of characters that were previously changed (so you can only repeat a change when the search hit is a fixed length).
 The text object fails when the search hit is a single character, and when search wraps around the end of the buffer.
 Suppose you use :set selection=exclusive and search for 'abc'. If you find 'abc' at the end of a line, operations such as ys or cs will include the line break. 
```

### 33.60.4 See also

```text
 Copy the search results into clipboard 
```

### 33.60.5 References

```text
 :help text-objects
 :help :map-modes 
```

## 33.61 Copy the search results into clipboard

```text
Tip 478 

Several methods allow you to capture all search hits. Usually, you want to copy each line which contains text matching your search pattern, but you can also copy just the matching text. We'll start with methods to easily list search hits, without copying them.
Contents

    * 1 Search within a file
    * 2 Copying lines containing search hits
    * 3 Copying only the matching text
    * 4 See also
    * 5 Comments

[edit] Search within a file

To search, press / then type what you want to find, or press * to search for the current word.

To list all lines matching your search pattern, use the following. The first command lists lines matching your last search. The second lists lines matching pattern.

:g/
:g/pattern

To view a window of search results, see Find in files within Vim. You can use % for the file path to search only the current file, for example:

" Save file, search it for 'pattern', and open a clickable list.
:w
:vimgrep /pattern/ %
:copen

To view only the parts of a file that match your pattern, see Folding with Regular Expression. You can fold away non-matching lines, and use zr to reveal more context around the search hits.
[edit] Copying lines containing search hits

You can copy matching lines to the clipboard, so they can be pasted into another application.

To copy all lines containing a search pattern, use the following (see Power of g). The first command clears register a (:help q). The second appends all matching lines to that register (:help quotea). The third copies register a to the clipboard (register +) for easy pasting into another application. Replace pattern with what you want to search for.

qaq
:g/pattern/y A
:let @+ = @a

The above procedure captures only the first line of each match. If your pattern matches more than one line, use the following.

" Use /pattern to search for something, then
"   :call CopyMatchingLines()
" to copy all lines containing hits (whole lines).
" The pattern may extend over multiple lines.
" The 'normal! $' attempts to avoid copying the same line more than once.
" FIX: For some patterns, it could miss a second hit?
function! CopyMatchingLines()
  let posinit = getpos(".")
  call cursor(1, 1)
  let cnt = 0
  let hits = []
  let snum = search(@/, 'cW')
  while snum > 0
    let enum = search(@/, 'ceW')
    call extend(hits, getline(snum, enum))
    let cnt += 1
    normal! $
    let snum = search(@/, 'W')
  endwhile
  if cnt > 0
    let @+ = join(hits, "\n") . "\n"
  endif
  call cursor(posinit[1], posinit[2])
  echomsg cnt 'lines (or blocks) were appended to the clipboard.'
endfunction

[edit] Copying only the matching text

A search pattern may use a regular expression. For example, the following finds all words that begin with 'a':

/\<a\w*\>

The following procedures allow you to copy just the text which matches a pattern. Source the CopyMatches command and function, then perform the search above. To copy all matching text to the clipboard, enter the following. The first command clears the clipboard. The second appends matching text to the clipboard (since no pattern is given, the last search is used). The second command is equivalent to :%CopyMatches.

0"+y0
:g//CopyMatches

You can also use the command to copy all matches from a range of lines, and into a register other than the clipboard:

:1,10CopyMatches a

" Copy matches of the last search to a register (default is the clipboard).
" Accepts a range (default is the current line).
" Matches are appended to the register and each match is terminated by \n.
" Usage: [RANGE]CopyMatches [REGISTER]
command! -nargs=0 -range -register CopyMatches call s:CopyMatches(<line1>, <line2>, "<reg>")
function! s:CopyMatches(line1, line2, reg)
  let reg = a:reg != '' ? a:reg : '+'
  for line in range(a:line1, a:line2)
    let txt = getline(line)
    let idx = match(txt, @/)
    while idx > -1
      exec "let @".reg." .= matchstr(txt, @/, idx) . \"\n\""
      let end = matchend(txt, @/, idx)
      let idx = match(txt, @/, end)
    endwhile
  endfor
endfunction

The following alternative is to copy matches which extend over more than one line.

" Use 0"+y0 to clear the clipboard, then
"    :g/pattern/call CopyMultiMatches()
" to copy all multiline hits (just the matching text).
" This is for when the match extends over multiple lines.
" Only the first match from each line is found.
" BUG: When searching for "^function.*\_s*let" the '.*' stops at the end
" of a line, but it greedily skips "\n" in the following (we copy too much).
function! CopyMultiMatches()
  let text = join(getline(".", "$"), "\n") . "\n"
  let @+ .= matchstr(text, @/) . "\n"
endfunction

[edit] See also

    * Redirect g search output to redirect g// output to a new window or a file
    * Filter buffer on a search result to create a scratch buffer with matching lines
    * Find in files within Vim for a clickable list of search hits
    * Folding with Regular Expression to fold away non-matching lines 

"


id=__vim_wo_cream__
```

## 33.62 Cream,

```text
        Where to download Vim for Windows, install VIM for windows, find most recent build for windows, latest most recent vim version 
Tip 1578 

Which version of Vim should I use?

    * I want a fully patched standard Vim for Windows, without compiling it myself. 

        See "Vim without Cream problems" below. 

    The easiest and best solution for Windows users on 32-bit systems is to use the standard Vim (Vim without Cream) at http://sourceforge.net/projects/cream/files/ 
    Enable scripting in your browser. 
    Near the bottom, click "+" next to "Vim" to expand the list of files. 
    The first file listed under Vim should have a name like gvim-7-2-234.exe (Vim without Cream, version 7.2.234 = 7.2 with patches 1234). 
    You can click the icon in the "Notes/Subscribe" column to see the output of the :version command (which shows what features are in the build). 
    Click the most recent gvim-7-2-xxx.exe to download; run the download to install. 
    It installs a patched standard gvim.exe (GUI) and vim.exe (console), with all help and runtime files. 
    Includes Perl, Python, Ruby, Tcl and MzScheme interfaces. 

    * I'm using 64-bit Windows. 

    See information and download. 

    * I want standard Vim (source code to compile for all platforms, or unpatched Windows executables). 

    Available at http://www.vim.org/download.php 

    * I want an easy-to-use configuration for Windows with common menus and standard keyboard shortcuts. 

    Cream for BSD, Linux and Windows is available at http://cream.sourceforge.net/download.html 
    Click "Windows One-click installer, includes both Vim and Cream". 
    You will download a file with a name like cream-0-41-gvim-7-1-293.exe (Cream version 0.41 with gvim version 7.1.293 = 7.1 with patches 1293). 
    Note: This package may include an obsolete version of Vim. After you download it, you may want to upgrade the "Vim" part of it from (let's say) 7.1.293 to (let's say) 7.2.234, see above "I want a fully patched Vim for Windows". 

    * I want to put Vim on a keydrive and use it on a bunch of Windows machines, but standard versions of Vim choke when the keydrive is mounted as a different drive letter. 

    Check out GVim Portable http://portablegvim.sourceforge.net/ 

    * I want Vim on a Macintosh. 

    See the versions at http://www.vim.org/download.php#mac 
```

## 33.63 Example vimrc

```text
Tip 1628 

This is a sample vimrc file that offers an alternative to the vimrc_example.vim delivered with Vim. It was created in discussion with the ops and regulars of the #vim community.
Contents

    * 1 Requirements and caveats
    * 2 Usage recommendations
    * 3 Example vimrc
    * 4 Comments
```

### 33.63.1 Requirements and caveats

```text
The code in this example .vimrc requires a full featured Vim. While it is possible to insert checks to omit some settings for Vim binaries with less features, that would make the file more complex and hard to understand.

If your Vim does not support some of the options and features suggested here, you will have to install a Vim package with a larger feature set, or upgrade to a newer version of Vim.
```

### 33.63.2 Usage recommendations

```text
This is a minimal, but feature rich, .vimrc that aims to satisfy the majority of new and intermediate Vim users. While you may use this example as your .vimrc out-of-the-box, it is important to understand what the options and features do. It contains features and options that almost all Vim users should have at least basic knowledge about.
```

### 33.63.3 Example vimrc

```text
" URL: http://vim.wikia.com/wiki/Example_vimrc
" Authors: http://vim.wikia.com/wiki/Vim_on_Freenode
" Description: A minimal, but feature rich, example .vimrc. If you are a
"              newbie, basing your first .vimrc on this file is a good choice.
"              If you're a more advanced user, building your own .vimrc based
"              on this file is still a good idea.

"------------------------------------------------------------
" Features {{{1
"
" These options and commands enable some very useful features in Vim, that
" no user should have to live without.

" Set 'nocompatible' to ward off unexpected things that your distro might
" have made, as well as sanely reset options when re-sourcing .vimrc
set nocompatible

" Attempt to determine the type of a file based on its name and possibly its
" contents.  Use this to allow intelligent auto-indenting for each filetype,
" and for plugins that are filetype specific.
filetype indent plugin on

" Enable syntax highlighting
syntax on


"------------------------------------------------------------
" Must have options {{{1
"
" These are highly recommended options.

" One of the most important options to activate. Allows you to switch from an
" unsaved buffer without saving it first. Also allows you to keep an undo
" history for multiple files. Vim will complain if you try to quit without
" saving, and swap files will keep you safe if your computer crashes.
set hidden

" Better command-line completion
set wildmenu

" Show partial commands in the last line of the screen
set showcmd

" Highlight searches (use <C-L> to temporarily turn off highlighting; see the
" mapping of <C-L> below)
set hlsearch

" Modelines have historically been a source of security vulnerabilities.  As
" such, it may be a good idea to disable them and use the securemodelines
" script, <http://www.vim.org/scripts/script.php?script_id=1876>.
" set nomodeline


"------------------------------------------------------------
" Usability options {{{1
"
" These are options that users frequently set in their .vimrc. Some of them
" change Vim's behaviour in ways which deviate from the true Vi way, but
" which are considered to add usability. Which, if any, of these options to
" use is very much a personal preference, but they are harmless.

" Use case insensitive search, except when using capital letters
set ignorecase
set smartcase

" Allow backspacing over autoindent, line breaks and start of insert action
set backspace=indent,eol,start

" When opening a new line and no filetype-specific indenting is enabled, keep
" the same indent as the line you're currently on. Useful for READMEs, etc.
set autoindent

" Stop certain movements from always going to the first character of a line.
" While this behaviour deviates from that of Vi, it does what most users
" coming from other editors would expect.
set nostartofline

" Display the cursor position on the last line of the screen or in the status
" line of a window
set ruler

" Always display the status line, even if only one window is displayed
set laststatus=2

" Instead of failing a command because of unsaved changes, instead raise a
" dialogue asking if you wish to save changed files.
set confirm

" Use visual bell instead of beeping when doing something wrong
set visualbell

" And reset the terminal code for the visual bell.  If visualbell is set, and
" this line is also included, vim will neither flash nor beep.  If visualbell
" is unset, this does nothing.
set t_vb=

" Enable use of the mouse for all modes
set mouse=a

" Set the command window height to 2 lines, to avoid many cases of having to
" "press <Enter> to continue"
set cmdheight=2

" Display line numbers on the left
set number

" Quickly time out on keycodes, but never time out on mappings
set notimeout ttimeout ttimeoutlen=200

" Use <F11> to toggle between 'paste' and 'nopaste'
set pastetoggle=<F11>


"------------------------------------------------------------
" Indentation options {{{1
"
" Indentation settings according to personal preference.

" Indentation settings for using 2 spaces instead of tabs.
" Do not change 'tabstop' from its default value of 8 with this setup.
set shiftwidth=2
set softtabstop=2
set expandtab

" Indentation settings for using hard tabs for indent. Display tabs as
" two characters wide.
"set shiftwidth=2
"set tabstop=2


"------------------------------------------------------------
" Mappings {{{1
"
" Useful mappings

" Map Y to act like D and C, i.e. to yank until EOL, rather than act as yy,
" which is the default
map Y y$

" Map <C-L> (redraw screen) to also turn off search highlighting until the
" next search
nnoremap <C-L> :nohl<CR><C-L>


"------------------------------------------------------------"
```

## 33.64 Increasing or decreasing numbers

```text
You can increment or decrement a number by pressing Ctrl-A or Ctrl-X when in Normal mode. The number can be at the cursor, or after the cursor.

The number can be decimal, hexadecimal or octal. You can also increment or decrement a single letter ("a...", "b...", "c..."). This is controlled with the 'nrformats' option.

Ctrl-A is very useful in a macro. As an example, suppose you type the line:

101 This is an item.

In Normal mode, enter the following to record a macro into the a register. This macro yanks the current line, then pastes it below, then increments the number.

qa
Y
p
Ctrl-A
q

Now type 15@a to perform the macro 15 times. You will see:

101 This is an item.
102 This is an item.
103 This is an item.
104 This is an item.
and so on

On Windows, your _vimrc file may source mswin.vim. That script sets Ctrl-A to Select All. If you want to use Ctrl-A in Normal mode to increment a number, you need:

:nunmap <C-A>

Making a list

It's easy to insert a list of ascending numbers, for example:

:0put =range(11,15)

Executing this command (or the equivalent :call append(0,range(11,15))) inserts the following after line 0 (that is, at the start of the buffer):

11
12
13
14
15

Here is a more elaborate example:

:for i in range(1,10) | put ='192.168.0.'.i | endfor

Executing this command inserts the following after the current line:

| 192.168.0.1
| 192.168.0.2
| 192.168.0.3
| 192.168.0.4
| 192.168.0.5
| 192.168.0.6
| 192.168.0.7
| 192.168.0.8
| 192.168.0.9
| 192.168.0.10

References

    * :help CTRL-A
    * :help 'nrformats' 
```

## 33.65 Working with Unicode

```text
    *  One thing you should always do first is check the help. 

    * The following is an example. Modify it to suit your work environment. 

if has("multi_byte")
  if &termencoding == ""
    let &termencoding = &encoding
  endif
  set encoding=utf-8
  setglobal fileencoding=utf-8 bomb
  set fileencodings=ucs-bom,utf-8,latin1
endif

What the above does

    * has("multi_byte") checks if you have the right options compiled-in. If you haven't got what it takes, it's no use trying to use Unicode. 

    * 'termencoding' defines how your keyboard encodes what you type. Here we save the value corresponding to your locale before changing 'encoding' (see below). 

    * 'encoding' sets how vim shall represent characters internally. Utf-8 is necessary for most flavors of Unicode. 

    * 'fileencoding' sets the encoding for a particular file (local to buffer); :setglobal sets the default value. An empty value can also be used: it defaults to same as 'encoding'. Or you may want to set one of the ucs encodings, It might make the same disk file bigger or smaller depending on your particular mix of characters. Also, IIUC, utf-8 is always big-endian (high bit first) while ucs can be big-endian or little-endian, so if you use it, you will probably need to set 'bomb" (see below). 

    * 'bomb' (boolean): if set, vim will put a "byte order mark" (or BOM for short) at the start of Unicode files. This option is irrelevant for non-Unicode files (iso-8859, etc.). This BOM is the codepoint U+FEFF, which is represented on disk as follows:
          o UTF-8: EF BB BF
          o UTF-16be: FE FF
          o UTF-16le: FF FE
          o UTF-32be: 00 00 FE FF
          o UTF-32le: FF FE 00 00 

    That is, the BOM allows an easy determination of which Unicode encoding and which endianness are being used (assuming that a file in UTF-16le won't start with a NULL). 

    * 'fileencodings' defines the heuristic to set 'fileencoding' (local to buffer) when reading an existing file. The first one that matches will be used. Ucs-bom is "ucs with byte-order-mark"; it must not come after utf-8 if you want it to be used. 

Additional remarks

    * In "replace" mode, one utf character (one or more data bytes) replaces one utf character (which need not use the same number of bytes). 

    * In "normal" mode, ga shows the character under the cursor as text, decimal, octal and hex; g8 shows which byte or bytes are used to represent it. 

    * In "insert" or "replace" mode,
          o any character defined on your keyboard can be entered the usual way (even with dead keys if you have them, e.g. French circumflex, German umlaut, etc.);
          o any character which has a "digraph" (there are a huge lot of them, see :dig after setting enc=utf-8) can be entered with a Ctrl-K prefix;
          o any utf character at all can be entered with a Ctrl-V prefix, either <Ctrl-V> u aaaa or <Ctrl-V> U bbbbbbbb, with 0 <= aaaa <= FFFF, or 0 <= bbbbbbbb <= 7FFFFFFF.
          o If you have sourced mswin.vim (which I don't recommend) then <Ctrl-V> has been remapped to the "paste" operation; in this case you need to use <Ctrl-Q> instead. 

    * Gvim will display it properly if you have the fonts for it, provided that you set 'guifont' to some fixed-width font which has the glyphs you want to use (Courier New is OK for French, German, Greek, Russian and more, but I'm not sure about Hebrew or Arabic; its glyphs are of a more "fixed" width than those of, e.g. Lucida Console: the latter can be awkward if you need bold Cyrillic writing). 

    * Until recently, gvim displayed any Unicode codepoint above U+FFFF as a question mark (double-width for CJK). This was fixed by patch 7.1.116 dated 2007 Sep 17 20:39. If you still have an older version, it is strongly recommended that you upgrade to the current release (and a recent patchlevel). 

See also

    * Switching to Unicode in an orderly manner
    * Forcing file encoding at load time
    * Entering special characters
    * :help utf8
    * :help encoding-values
    * :help 'encoding'
    * :help 'fileencoding'
    * :help 'fileencodings'
    * :help 'termencoding'
    * :help 'bomb'
    * :help 'guifont'
    * :help ga
    * :help g8
    * :help digraphs
    * :help i_CTRL-V_digit
```

## 33.66 Search for lines not containing pattern and other helpful searches

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

## 33.67 Tip 1585, file formats

```text
Vim recognizes three file formats (unix, dos, mac) that determine what line ending characters (line terminators) are removed from each line when a file is read, or are added to each line when a file is written. A file format problem can display ^M characters, or can prevent scripts from running correctly. This tip explains how to avoid problems, and how to convert from one file format to another. Use of the 'fileformat' and 'fileformats' options is also explained. See below if all you want to know is how to remove ^M characters, or how to fix the line endings in the file you are working on.
The line terminator expected for each file format is:

unix	 LF only (each line ends with an LF character).
dos	 CRLF (each line ends with two characters, CR then LF).
mac	 CR only (each line ends with a CR character).
CR is carriage return (return cursor to left margin), which is Ctrl-M or ^M or hex 0D.
LF is linefeed (move cursor down), which is Ctrl-J or ^J or hex 0A. Sometimes, LF is written as NL (newline).

Mac OS version 9 and earlier use mac line endings, while Mac OS X and later use unix line endings.

| Contents 
| 1 File format options
| 2 File format detection
| 3 Converting the current file
| 4 Converting clean files
| 5 Converting mixed files
| 6 Removing unwanted CR or LF characters
| 7 Terminator after last line
| 8 How file format conversion works
| 9 Results of incorrect file format detection
| 10 Vim script problems
| 11 Pitfalls
| 12 Other approaches
| 13 Tools
| 14 See also
| 15 Comments
```

### 33.67.1 File format options Edit

```text
The 'fileformat' option is local to each buffer. It is set by Vim when a file is read, or can be specified in a command telling Vim how to read a file. In addition, the 'fileformat' option can be changed to specify the line endings that will be added to each line when the buffer is written to a file.
The 'fileformats' option is global and specifies which file formats will be tried when Vim reads a file (unless otherwise specified, Vim attempts to automatically detect which file format should be used to read a file). The first file format in 'fileformats' is also used as the default for a new buffer.

The following command displays the fileformat option (abbreviated as ff) for the current buffer, and the fileformats global option (abbreviated as ffs) which determines how Vim reads and writes files: :help 'ff' :help 'ffs'

:set ff? ffs?
This command also shows where each option was last set:
:verbose set ff? ffs?
The fileformats option is often not explicitly set (the defaults are usually adequate). However, the above command may indicate that the option was set in your vimrc because that file probably contains set nocompatible which sets many options.
```

### 33.67.2 File format detection

```text
The 'fileformats' option ('ffs') has these defaults:
ffs=unix,dos	 Unix based systems
ffs=dos,unix	 Windows and DOS systems
ffs=mac,unix,dos	 Mac OS 9 systems
When a file is read, the order of the items specified in 'ffs' has no effect (for example, ffs=unix,dos has the same effect as ffs=dos,unix when reading). The order is only important when a new buffer is created (if not empty, the first item in 'ffs' is used as the file format for a new buffer; this determines which line endings will be added when the buffer is saved).
Suppose your system has ffs=dos,unix and you open an existing file. Vim will look for both dos and unix line endings, but Vim has a built-in preference for the unix format.

If all lines in the file end with CRLF, the dos file format will be applied, meaning that each CRLF is removed when reading the lines into a buffer, and the buffer 'ff' option will be dos.
If one or more lines end with LF only, the unix file format will be applied, meaning that each LF is removed (but each CR will be present in the buffer, and will display as ^M), and the buffer 'ff' option will be unix.
```

### 33.67.3 Converting the current file

```text
A common problem is that you open a file and see ^M at the end of many lines. Entering :set ff? will probably show that the file was read as unix: the problem is that some lines actually end with CRLF. To fix this, you need to tell Vim to read the file again using dos file format. When reading as dos, all CRLF line endings, and all LF-only line endings, are removed. Then you need to change the file format for the buffer and save the file. The following procedures will easily handle this situation, but they only work reliably on reasonably recent versions of Vim (7.2.40 or higher).
Convert from dos/unix to unix
To convert the current file from any mixture of CRLF/LF-only line endings, so all lines end with LF only:
:update	 Save any changes.
:e ++ff=dos	 Edit file again, using dos file format ('fileformats' is ignored).[A 1]
:setlocal ff=unix	 This buffer will use LF-only line endings when written.[A 2]
:w	 Write buffer using unix (LF-only) line endings.
In the above, replacing :set ff=unix with :set ff=mac would write the file with mac (CR-only) line endings. Or, if it was a mac file to start with, you would use :e ++ff=mac to read the file correctly, so you could convert the line endings to unix or dos.
Convert from dos/unix to dos
To convert the current file from any mixture of CRLF/LF-only line endings, so all lines end with CRLF only:
:update	 Save any changes.
:e ++ff=dos	 Edit file again, using dos file format ('fileformats' is ignored).[A 1]
:w	 Write buffer using dos (CRLF) line endings.
Notes A
^ a b The :e command reads the current file again, using the ++ff=dos option so the read will omit all CRLF and LF-only line terminators (dos file format). Each ^M at the end of a line should disappear. Some older versions of Vim do not perform this step correctly and the ^M endings are not removed; upgrade Vim to fix. :help :e
^ Use :setlocal (or :setl) to avoid changing the global default.
```

### 33.67.4 Converting clean files

```text
When working with "clean" files (where every line has the same line ending), Vim's default settings provide reliable file format detection, and conversion is easy.
Suppose you have a collection of files where some are dos (every line ends with CRLF), and others are unix (every line ends with LF only). To convert all the dos files to unix (while not modifying the unix files):[B 1]

:args *.c *.h	 Specify the files to convert.[B 2]
:argdo set ff=unix|update	 For each argument, set unix file format for the buffer, and save the file if needed.[B 3]
Suppose you have a collection of files where some are dos (every line ends with CRLF), and others are unix (every line ends with LF only). To convert all the unix files to dos (while not modifying the dos files):[B 1]
:args *.c *.h	 Specify the files to convert.
:argdo set ff=dos|update	 For each argument, set dos file format for the buffer, and save the file if needed.
If you have opened several files where some are dos and some are unix, you can convert the dos files to unix:[B 1]
:bufdo! set ff=unix|w	 For each buffer, set unix file format, and write the file.
If you have opened several files where some are dos and some are unix, you can convert the unix files to dos:[B 1]
:bufdo! set ff=dos|w	 For each buffer, set dos file format, and write the file.
Notes B
^ a b c d This procedure will fail if a file has a mixture of dos and unix line endings because such files are detected as unix, and the CR characters are retained in the buffer.
^ This example processes all *.c and *.h files in the current directory by setting the argument list to the wanted names. :help :args
^ The :argdo command operates on each file in the argument list. For each file, it sets the buffer to use unix file format. That sets the modified flag for buffers that were detected as dos. The :update command writes the buffer if its modified flag is set.
```

### 33.67.5 Converting mixed files

```text
When working with "mixed" files (where some lines have one kind of terminator, while other lines have a different terminator), reliable conversion requires more effort. Some methods do not work reliably with older Vim 7.2 versions. The procedures here should work in Vim 7.2 and later.
Convert from dos/unix to unix
To convert from any mixture of CRLF endings and LF-only endings, to LF-only endings:[C 1]
:set hidden	 Allow modified buffers to be hidden.
:set ffs=dos	 Assume dos line endings (CRLF or LF-only) when reading files.
:args *.c *.h	 Specify the files to convert.
:argdo set ff=unix|w	 For each argument, set unix file format for the buffer, and write the file.[C 2]
Convert from dos/unix to dos
To convert from any mixture of CRLF endings and LF-only endings, to CRLF endings:[C 1]
:set ffs=dos	 Assume dos line endings (CRLF or LF-only) when reading files.
:args *.c *.h	 Specify the files to convert.
:argdo w	 Write each file with CRLF line endings.
Notes C
^ a b A defect with this procedure is that all files are modified, even if no change was required. That is, a file is written even if it originally had all lines in the wanted format.
^ The :argdo command operates on each file in the argument list. For each file, it sets the buffer to use unix file format, and writes the file (even if the file has not been marked as modified). An alternative would be to use :argdo w ++ff=unix which will write each file as unix, with the potential problem that the buffer will still be marked as using dos format (so if you later make a change and save it, the file will be written in dos format).
```

### 33.67.6 Removing unwanted CR or LF characters

```text
First ensure you have read the file with the appropriate file format. For example, use :e ++ff=dos to remove all CRLF and LF-only line terminators, or use :e ++ff=mac if the file uses CR as a line terminator,.
After reading with the correct file format, the buffer may still contain unwanted CR characters. You can search for these with /\r (slash starts a search; backslash r represents CR when searching; press Enter to search).

To delete ^M at line endings, and replace it with a space everywhere else (the c flag will prompt to confirm that you want each replacement, and the e flag prevents an error message if the string is not found):

:%s/\r\+$//e
:%s/\r/ /gce
To process, say, all *.txt files in the current directory:
vim *.txt
:set hidden
:bufdo %s/\r\+$//e
:bufdo %s/\r/ /ge
:xa
To delete every ^M, regardless of where they occur in a line (this is not a good idea if two lines were separated only by a CR because the command joins the lines together):
:%s/\r//g
To replace every CR with LF (when searching, \r matches CR, but when replacing, \r inserts LF; this is not a good idea if LF occurs at the end of a line, because an extra blank line will be created):
:%s/\r/\r/g
If a file uses CR line terminators, it should be read as mac (using :e ++ff=mac). After doing that, you may see unwanted ^J (LF) characters. In a mac buffer, all CR characters will have been removed because CR is the line terminator, and searching for \r will find unwanted LF characters. Use these commands to remove ^J from the start of all lines, and to replace all other ^J with a line break:
%s/^\r//e
%s/\r/\r/ge
```

### 33.67.7 Terminator after last line

```text
Every line in a text file should have a terminator (for example, a dos file should end with CRLF). When reading a file, Vim accepts the last line as a normal line, even if it has no terminator. Normally, Vim writes a terminator after every line, including the last. For rare occasions, it is possible to save a file with no terminator after the last line:
:set noendofline binary
:w
Some obsolete dos files use Ctrl-Z as an end-of-file character. When reading a dos file, Vim accepts any Ctrl-Z bytes within the file as normal characters (these will appear in the buffer as ^Z), however if Ctrl-Z is the last byte in the file, it is omitted.
```

### 33.67.8 How file format conversion works

```text
Understanding the principles involved in converting file formats can help avoid mistakes.
Suppose you have some files that use a mixture of CRLF and LF-only line endings (all line terminators use CRLF, or all use LF-only, or there are some of each). These steps are required when converting each file:

Read the file as dos so any text ending with CRLF or LF-only is regarded as a line. These line endings (CRLF and LF) are removed and are not present in the buffer.
If you want to force all line endings to CRLF, write as dos. The :w command is required (not :update or :wa because these only write if the buffer has not been modified, and no modification has occurred).
If you want to force all line endings to LF-only, write as unix.
If you want to force all line endings to CR-only, write as mac.
If all lines in a file end with LF-only, the file can be converted to use CRLF endings by reading as unix and writing as dos. However, if some lines end with CRLF, reading a file as unix will keep each CR in the buffer, and writing the file using any format will write each CR to the file, as if it were a normal character. When writing, line endings are added, so any CR characters that were in the original file, will be written in addition to line endings.
An LF-only file can also be converted to CRLF by reading as dos and writing as dos.

When reading a file as dos, if a CR followed by LF is encountered (CRLF), those two bytes are removed, and the preceding text is regarded as a line. Similarly, if LF is encountered, it is removed, and the preceding text is regarded as a line. However, if a CR is encountered (without a following LF), the CR will be regarded as a normal character and will be copied into the buffer where it will be displayed as ^M (Ctrl-M, the code for CR).
```

### 33.67.9 Results of incorrect file format detection

```text
Suppose a file contains two lines:
Line 1
Line 2
When reading the file, if Vim does not correctly detect the file format, here is what you will see in the buffer (^J is Ctrl-J or LF; ^M is Ctrl-M or CR).
File has unix line endings; file read with ff=dos:

Line 1
Line 2
File has unix line endings; file read with ff=mac:
Line 1^JLine 2^J
File has dos line endings; file read with ff=unix:
Line 1^M
Line 2^M
File has dos line endings; file read with ff=mac:
Line 1
^JLine 2
^J
File has mac line endings; file read with ff=unix or ff=dos:
Line 1^MLine 2^M
```

### 33.67.10 Vim script problems

```text
Under Unix, you may find that a Vim script does not work because you have downloaded a script that contains CR characters. Each CR displays as ^M and will cause some scripts to fail.
If you put, say, script.vim in your plugin directory, you may not see any useful error messages about CR characters when using Vim. You can source the script after starting Vim (for example, :source ~/.vim/plugin/script.vim) to see if errors including ^M are shown. To fix, you need to convert the file to unix format.
```

### 33.67.11 Pitfalls

```text
Some suggestions for working with file formats suffer from pitfalls that are described here.
You are editing a file which you expect to be in unix format, yet you see many ^M characters. The following attempt to convert the file to unix format does not work:

:setlocal ff=unix	 Set unix file format for current buffer.
:w	 Write buffer to file.
The file was probably already detected as unix format, so the :set ff=unix command will do nothing (the problem is that the file uses dos format, but Vim read it as unix because at least one line had an LF-only ending). Furthermore, each ^M represents a CR character that is in the current buffer, and writing the buffer will write that CR to the file (not what you want).
You are editing a file which you expect to be in unix format, yet you see many ^M characters. You perform the following to convert it to unix format, then perform further edits:

:e ++ff=dos	 Read file again in dos format, to accept both CRLF and LF-only line endings.
:w ++ff=unix	 Write buffer to file using LF-only line endings.
...	 Do some edits.
:w	 Save the edits.
The first two steps above are correct, and the file will initially be written in unix format. However, the buffer is still marked as dos format, so the :w will overwrite the file using CRLF line endings. The :e ++ff=dos command tells Vim to read the file again, forcing dos file format. Vim will remove CRLF and LF-only line endings, leaving only the text of each line in the buffer. However, if you are going to edit the file, you need to use these commands:
:e ++ff=dos	 Read file again in dos format.
:setlocal ff=unix	 Mark buffer so LF-only line endings will be used when buffer is written.
...	 Do some edits.
:w	 Save the edits (will use LF-only line endings).
Here is a mistaken attempt to convert certain files from dos to unix format by starting Vim with commands to convert all *.c and *.h files in the current directory:
vim +"argdo setlocal ff=unix" +wqa *.c *.h
This will work if 'fileformats' includes dos and if the files have only CRLF line endings. However, if 'fileformats' includes both dos and unix, and if a file has at least one LF-only line ending, that file will be detected as unix, and any CR in the file will be shown in the buffer as ^M. The :setlocal ff=unix will not flag a unix file as modified, so the +wqa command (same as :xa) will not save that file. If :w is used to write the buffer, nothing useful will be achieved because the CR characters will be written to the file.
```

### 33.67.12 Other approaches

```text
You may find a discussion of other techniques for handling line endings elsewhere. Some drawbacks of other procedures are mentioned here.
You can specify a file format for a particular file by inserting a modeline in that file. For example, in file my.c, you may put the following comment near the top or bottom of the file in an attempt to maintain dos line endings, regardless of what system is used to edit the file:

/* vim: set ff=dos: */
In general, using a modeline is useless in this context, although it may help if the file format is correctly detected when the file is read, because the next write will save the file in the preferred format specified in the modeline. However, the modeline does not avoid problems, and may make problems worse. For example, if file my.c has one or more lines that end with LF only, and the file is edited on a default Windows system, the file will be detected as having unix format, and the modeline will then change the format to dos, which will set the buffer modified flag. The buffer will display each CR as ^M. If you now save the file, each line will be written with a CRLF ending. However, the ^M characters that were visible in the buffer will be written to the file, so some lines will now end with CRCRLF (two CR characters).
Another unhelpful approach is to hide ^M characters which occur at the end of a line by highlighting them with the Ignore highlight group:

:match Ignore /\r$/
While this may be helpful as a quick workaround when viewing a file, in general, it is a misguided approach because the characters are hidden, but present, which will inevitably cause trouble when editing. In addition, it is much better to correctly handle the problem rather than temporarily hide it.
```

### 33.67.13 Tools

```text
Several tools are available to convert files from one type of line ending to another. These need to be run at the command line, and are not related to Vim.
On Unix-based systems, the file utility can display what kind of line endings are present in a file. For example, file *.c will report what line terminators (CRLF, CR, LF) are present in each *.c file. The dos2unix utility can convert from dos or mac format to unix, and the unix2dos utility can convert from unix to dos format, optionally while preserving file timestamps.

Many other conversion tools are available. For example, flip can convert files between dos/mac/unix formats, and versions for each platform are available.




	33.68
```
