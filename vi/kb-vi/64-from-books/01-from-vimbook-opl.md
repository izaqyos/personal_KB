---
type: reference
title: From vimbook-OPL
description: "Legacy vim KB section: From vimbook-OPL (help, Using a Count to Edit Faster, Moving to the Start or End of a Line)"
tags: [book-notes, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#63.1"
---

# 63.1 From vimbook-OPL

[↑ From books](/vi/kb-vi/64-from-books/README.md)

### 63.1.1 help

```text
Finally, there’s one more important command, the help command.To get help, enter
the following:
:help
:h

If you don’t supply a subject, :help displays the general help window.The creators of Vim did something very clever (or very lazy) with the help system.
They made the help window a normal editing window.You can use all the normal Vim commands to move through the help information.
Therefore h, k, j, and l move left, up, down, right, and so on.
To get out of the help system, use the same command you use to get out of the editor: ZZ. Or ctrl-W q

As you read the help text, you will notice some text enclosed in vertical bars (for example, |:help|).This indicates a hyperlink. If you position the cursor anywhere between the bars and press CTRL+] (jump to tag), the help system takes you to the indicated subject.
(For reasons not discussed here, the Vim terminology for a hyperlink is tag. So CTRL+] jumps to the location of the tag given by the word under the cursor.)
After a few jumps, you might want to go back. CTRL+T (pop tag) takes you back to the preceding screen. Or in Vim terms, it “pops a tag off the tag stack.”
At the top of this screen, there is the notation *help.txt*.This is used by the help system to define a tag (hyperlink destination). Chapter 7, “Commands for Programmers,” explains tags in detail.
To get help on a given subject, use the following command:
:help subject
To get help on the x command, for example, enter the following:
:help x
To find out how to delete text, use this command:
:help deleting
To get a complete index of what is available, use the following command:
:help index
When you need to get help for a control character command (for example, CTRL-A,
you need to spell it with the prefix CTRL-.
:help CTRL-A
The Vim editor has many different modes. By default, the help system displays the normal-mode commands. For example, the following command displays help for
the normal-mode CTRL-H command:
:help CTRL-H

To identify other modes, use a mode prefix.
If you want the help for the insert-mode version of this command, prefix the key
with i_.This gives you the following command:
:help i_CTRL-H
Table 1.1 lists several other mode prefixes.

When you start the Vim editor, you can use several command-line options.These
all begin with a dash (-).To find what the -t command-line option does, for example,
use the command
:help -t
The Vim editor has a number of options that enable you to configure and customize
the editor. If you want help for an option, you need to enclose it in single quotation
marks.To find out what the number option does, for example, use the following
command:
:help ‘number’
The following table summarizes the special prefixes.
Table 1.1 Help Prefixes
What Prefix Example
Normal-mode commands (nothing) :help x
Control character CTRL- :help CTRL-u
Visual-mode commands v :help v_u
Insert-mode commands i :help i_<Esc>
ex-mode commands : :help :quit
Command-line editing c :help c_<Del>
Vim command arguments - :help -r
Options ‘ (both ends) :help ‘textwidth’
Special keys are enclosed in angle brackets.To find help on the up-arrow key, for
instance, use this command:
:help <Up>
Appendix B, “The <> Key Names,” provides a complete list of the key names.
Other Ways to Get Help
You can get to the help screen by pressing the <F1> key.This displays the general
help screen, and you can navigate from there. If your keyboard has a <Help> key, you
can use it as well.
```

### 63.1.2 Using a Count to Edit Faster

```text
Suppose you want to move up nine lines.You can type kkkkkkkkk or you can enter
the command 9k.
In fact, you can precede all the movement commands with a number. Earlier in this
chapter, for instance, you added three exclamation points to the end of a line by typing
a!!!<Esc>. Another way to do this is to use the command 3a!<Esc>.The count of
3 tells the a command to insert what follows (!) three times.
Similarly, to delete three characters, use the command 3x.

ex: 120i*<esc> - insert 120* as below
************************************************************************************************************************

replace 5 chars, 5ra, ex:
5ib:
bbbbb 

b5ra:
aaaaa
```

### 63.1.3 Moving to the Start or End of a Line

```text
The $ command moves the cursor to the end of a line. Actually, a bunch of keys
map to the “end-of-line” command.The Vim names for these keys are $, <End>,
and <kEnd>. (The <kEnd> key is Vim’s name for the keypad End key.)
The $ command takes a numeric argument as well. If present, it causes the editor to
move to the end of the next line. For example, 1$ moves you to the end of the first
line (the one you’re on), 2$ to the end of the next line, and so on. 
The ^ command moves to the first nonblank character of the line.The <Home> or
<kHome> key moves to the first character of the line. (The 0
[zero] command does the same thing.)
Like every other command previously discussed, these three commands can take a
numeric argument.They do not do anything with it, but you can specify it if you
want to.

both $ and ^ can be preceded by [-]N to jump to end/start of N lines [backward]forward
```

### 63.1.4 Scrolling Up and Down

```text
The CTRL-U command scrolls up half a screen of text. (Up in this case is backward in
the file; the text moves down on the screen. Don’t worry if you have a little trouble
remembering which end is up. Most programmers have the same problem.)
The CTRL-D command scrolls you down half a screen.

full screen down/up CTRL-F / CTRL-B 
```

### 63.1.5 f,F,t,T revised

```text
Note that they are useful not only for jumping around. They're also considered as motion so go along with all the commands the expect motion.

Ex. d a <> tag,
<aaa> klklk <\aaa>
go to first < and dype df> then go to next < and press .
```

### 63.1.6 Saving Your Setting

```text
After performing all your :map, :abbreviate, and :set commands, it would be nice if
you could save them and use them again.
The command :mkvimrc writes all your settings to a file.The format of this command
is as follows:
:mkvimrc file
file is the name of the file to which you want to write the settings.
You can read this file by using the following command:
:source file
During startup, the Vim editor looks for an initialization file. If it is found, it is automatically
executed. (Only the first file found is read.)
The initialization files are as follows:
UNIX
$HOME/.vimrc
$HOME/_vimrc
$HOME/.exrc
$HOME/_exrc
MS-DOS
$HOME/_vimrc
$HOME/.vimrc
$VIM/_vimrc
$VIM/.vimrc
$HOME/_exrc
$HOME/.exrc
$VIM/_exrc
$VIM/.exrc
When you are running the GUI version, some other files are also read.The gvimrc
file is found in the same location as the vimrc files mentioned in the list.The
$VIMRUNTIME/menu.vim is read too.
One way you can find out which initialization files are read is to use the :version
command:
:version
In the middle of all the junk it lists out is a list of the initialization files .
----------------------------------------------------------------------------------------------------
:version
VIM - Vi IMproved 7.3 (2010 Aug 15, compiled Aug 16 2010 12:01:47)
Compiled by <user>@<user>-lnx
Huge version with GTK2 GUI.  Features included (+) or not (-):
+arabic +autocmd +balloon_eval +browse ++builtin_terms +byte_offset +cindent +clientserver +clipboard +cmdline_compl
+cmdline_hist +cmdline_info +comments +conceal +cryptv +cscope +cursorbind +cursorshape +dialog_con_gui +diff +digraphs +dnd
-ebcdic +emacs_tags +eval +ex_extra +extra_search +farsi +file_in_path +find_in_path +float +folding -footer +fork() +gettext
-hangul_input +iconv +insert_expand +jumplist +keymap +langmap +libcall +linebreak +lispindent +listcmds +localmap -lua +menu
+mksession +modify_fname +mouse +mouseshape +mouse_dec +mouse_gpm -mouse_jsbterm +mouse_netterm -mouse_sysmouse +mouse_xterm
+multi_byte +multi_lang -mzscheme +netbeans_intg -osfiletype +path_extra +perl +persistent_undo +postscript +printer +profile
+python -python3 +quickfix +reltime +rightleft -ruby +scrollbind +signs +smartindent -sniff +startuptime +statusline
-sun_workshop +syntax +tag_binary +tag_old_static -tag_any_white -tcl +terminfo +termresponse +textobjects +title +toolbar
+user_commands +vertsplit +virtualedit +visual +visualextra +viminfo +vreplace +wildignore +wildmenu +windows +writebackup +X11
 -xfontset +xim +xsmp_interact +xterm_clipboard -xterm_save
   system vimrc file: "$VIM/vimrc"
     user vimrc file: "$HOME/.vimrc"
      user exrc file: "$HOME/.exrc"
  system gvimrc file: "$VIM/gvimrc"
    user gvimrc file: "$HOME/.gvimrc"
    system menu file: "$VIMRUNTIME/menu.vim"
  fall-back for $VIM: "/usr/local/share/vim"
Compilation: gcc -c -I. -Iproto -DHAVE_CONFIG_H -DFEAT_GUI_GTK  -DXTHREADS -D_REENTRANT -DXUSE_MTSAFE_API -I/usr/include/gtk-2.0
 -I/usr/lib/gtk-2.0/include -I/usr/X11R6/include -I/usr/include/atk-1.0 -I/usr/include/pango-1.0 -I/usr/include/freetype2 -I/usr
/include/freetype2/config -I/usr/include/glib-2.0 -I/usr/lib/glib-2.0/include     -g -O2  -I/usr/X11R6/include
Linking: gcc  -L/usr/X11R6/lib   -rdynamic   -L/usr/local/lib -o vim   -Wl,--export-dynamic -lgtk-x11-2.0 -lgdk-x11-2.0 -latk-1.
0 -lgdk_pixbuf-2.0 -lpangoxft-1.0 -lpangox-1.0 -lpango-1.0 -lgobject-2.0 -lgmodule-2.0 -lglib-2.0   -lXt -lncurses -lselinux  -l
acl -lgpm -rdynamic  <internal-path> -L<internal-path>
/perl/perl-5.8.6/lib/5.8.6/i686-linux/CORE -lperl -lcrypt -lutil -lc -L/usr/lib/python2.3/config -lpython2.3 -lpthread -lutil -l
m -Xlinker -export-dynamic
----------------------------------------------------------------------------------------------------
One other initialization file has not yet been discussed: .exrc.The old Vi editor used
this file for initialization.This is only read if Vim cannot find any other initialization
file. Because the old Vi program does not understand many of the Vim commands,
you will probably want to put everything in the .vimrc file.
The :mkexrc command writes the mappings to the .exrc file. If you want to use all
the power of Vim, however, you must use the :mkvimrc command instead.
```

### 63.1.7 The :shell Command

```text
The :shell command takes you to the command prompt.You can return to Vim by
executing the exit command.
For example:
:shell
$ date
Mon Jan 17 18:55:45 PST 2000
$ exit
```

### 63.1.8 Inserting Text

```text
If you type CTRL-A, the editor inserts the text you typed the last time you were in
insert mode.
Assume, for example, that you have a file that begins with the following:
“file.h”
/* Main program begins */
You edit this file by inserting #include at the beginning of the first line:
#include “file.h”
/* Main program begins */
You go down to the beginning of the next line using the command j^.You now start
to insert a new line that contains a new include line. So you type iCTRL-A.The result
is as follows:
#include “file.h”
#include /* Main program begins */
The #include was inserted because CTRL-A inserts the contents of the previous insert.
Now you type “main.c”<Enter> to finish the line:
#include “file.h”
#include “main.h”
/* Main program begins */
The CTRL-@ command does a CTRL-A and then exits insert mode.
The CTRL-V command is used to quote the next character. In other words, any
special meaning the character has, it will be ignored. For example, CTRL-V<Esc> inserts
an escape.You can also use the command CTRL-Vdigits to insert the character
number digits. For example, the character number 64 is @. So CTRL-V64 inserts @.The
CTRL-Vdigits uses “decimal” digits by default, but you can also insert the “hex” digits.
For example,
CTRL-V123
and
CTRL-Vx7b
both insert the { character.
The CTRL-Y command inserts the character above the cursor.This is useful when
you are duplicating a previous line.
One of my favorite tricks is to use ASCII art to explain complex things such as
regular expressions. For example:
[0-9]*[a-z]*
|||||||||||+—— Repeat 0 or more times
||||||+++++——- Any lower case letter
|||||+————— Repeat 0 or more times
+++++—————- Any digit

Take a look at how you can use CTRL-Y to create this file.You start by entering the
first two lines:
[0-9]*[a-z]*
|||||||||||+—— Repeat 0 or more times
Now you type CTRL-Y six times.This copies the | from the previous line down six
times:
[0-9]*[a-z]*
|||||||||||+—— Repeat 0 or more times
||||||
The CTRL-E command acts like CTRL-Y except it inserts the character below the cursor.
```

### 63.1.9 The viminfo File

```text
The problem with global marks is that they disappear when you exit Vim. It would be
nice if they stuck around.
The viminfo file is designed to store information on marks as well as the following:
	-> Command-line history
	-> Search-string history
	-> Input-line history
	-> Registers
	-> Marks
	-> Buffer list
	-> Global variables
The trick is that you have to enable it.This is done through the following command:
:set viminfo=string
The string specifies what to save.
The syntax of this string is an option character followed by an argument.The
option/argument pairs are separated by commas.
Take a look at how you can build up your own viminfo string.
First, the ‘ option is used to specify how many files for which you save local marks
(a–z). Pick a nice even number for this option (1000, for instance).Your viminfo
option now looks like this:
:set viminfo=’1000
The f option controls whether global marks (A–Z 0–9) are stored. If this option is 0,
none are stored. If it is 1 or you do not specify an f option, the marks are stored.You
want this feature, so now you have this:
:set viminfo=’1000,f1
The r option tells Vim about removable media. Marks for files on removable media
are not stored.The idea here is that jump to mark is a difficult command to execute if
the file is on a floppy disk that you have left in your top desk drawer at home.You can
specify the r option multiple times; therefore, if you are on a Microsoft Windows system,
you can tell Vim that floppy disks A and B are removable with the r option:
:set viminfo=’1000,f1,rA:,rB:
UNIX has no standard naming convention for floppy disks. On my system, however,
the floppy disk is named /mnt/floppy; therefore, to exclude it, I use this option:
:set viminfo=’1000,f1,r/mnt/floppy
Note
There is a 50-character limit on the names of the removable media.
The \” option controls how many lines are saved for each of the registers. By default,
all the lines are saved. If 0, nothing is saved.You like the default, so you will not be
adding a \” specification to the viminfo line.
The : option controls the number of lines of : history to save. 100 is enough for us:
:set viminfo=’1000,f1,r/mnt/floppy,:100,
The / option defines the size of the search history. Again 100 is plenty:
:set viminfo=’1000,f1,r/mnt/floppy,:100,/100
Note that Vim will never store more lines than it remembered.This is set with the
'history' option.
Generally, when Vim starts, if you have the 'hlsearch' option set, the editor highlights
the previous search string (left over from the previous editing sessions).To turn
off this feature, put the h flag in your 'viminfo' option list. (Or you can just start Vim,
see the highlighting, and decide you do not like it and execute a :nohlsearch.)
The '@' option controls the number of items to save in the input-line history. (The
input history records anything you type as result of an input function call.) For this
example, let this default to the size of the input-line history.
If the '%' option is present, save and restore the buffer list.The buffer list is restored
only if you do not specify a file to edit on the command line:
:set viminfo=’1000,f1,r/mnt/floppy,:100,/100,%
The '!' option saves and restores global variables. (These are variables whose names
are all uppercase.)
:set viminfo=’1000,f1,r/mnt/floppy,:100,/100,%,!
Finally, the n option specifies the name of the viminfo file. By default, this is
$HOME/.viminfo on UNIX. On Microsoft Windows, the file is as follows:
$HOME\_viminfo if $HOME is set
$VIM\_viminfo if $VIM is set
C:\_viminfo otherwise
The 'n' option must be the last option parameter. Because we like the default filename,
we leave this option off.Therefore, the full viminfo line is this:
:set viminfo=’1000,f1,r/mnt/floppy,:100,/100,%,!

You can put this command and other initializations into a vimrc initialization file.The
viminfo file is automatically written when the editor exits, and read upon initialization.
But you may want to write and read it explicitly.
The following command writes the viminfo file:
:wviminfo[!] [file]
If a file is specified, the information is written to that file.
Similarly, you can read the viminfo file using this command:
:rviminfo [file]
This reads all the settings from file. If any settings conflict with currently existing
settings, however, the file settings will not be used. If you want the information in the
viminfo file to override the current settings, use the following command:
:rviminfo! [file]

Note, my settings:
:set viminfo='1000,f1,<500,:500,/500,%,!

Note, this is :h viminfo & go to section 21.3
*21.3*	Remembering information; viminfo

After editing for a while you will have text in registers, marks in various
files, a command line history filled with carefully crafted commands.  When
you exit Vim all of this is lost.  But you can get it back!

The viminfo file is designed to store status information:

	Command-line and Search pattern history
	Text in registers
	Marks for various files
	The buffer list
	Global variables

Each time you exit Vim it will store this information in a file, the viminfo
file.  When Vim starts again, the viminfo file is read and the information
restored.

The 'viminfo' option is set by default to restore a limited number of items.
You might want to set it to remember more information.  This is done through
the following command: >

	:set viminfo=string

The string specifies what to save.  The syntax of this string is an option
character followed by an argument.  The option/argument pairs are separated by
commas.
   Take a look at how you can build up your own viminfo string.  First, the '
option is used to specify how many files for which you save marks (a-z).  Pick
a nice even number for this option (1000, for instance).  Your command now
looks like this: >

	:set viminfo='1000

The f option controls whether global marks (A-Z and 0-9) are stored.  If this
option is 0, none are stored.  If it is 1 or you do not specify an f option,
the marks are stored.  You want this feature, so now you have this: >

	:set viminfo='1000,f1

The < option controls how many lines are saved for each of the registers.  By
default, all the lines are saved.  If 0, nothing is saved.  To avoid adding
thousands of lines to your viminfo file (which might never get used and makes
starting Vim slower) you use a maximum of 500 lines: >

	:set viminfo='1000,f1,<500
<
Other options you might want to use:
	:	number of lines to save from the command line history
	@	number of lines to save from the input line history
	/	number of lines to save from the search history
	r	removable media, for which no marks will be stored (can be
		used several times)
	!	global variables that start with an uppercase letter and
		don't contain lowercase letters
	h	disable 'hlsearch' highlighting when starting
	%	the buffer list (only restored when starting Vim without file
		arguments)
	c	convert the text using 'encoding'
	n	name used for the viminfo file (must be the last option)

See the 'viminfo' option and |viminfo-file| for more information.

When you run Vim multiple times, the last one exiting will store its
information.  This may cause information that previously exiting Vims stored
to be lost.  Each item can be remembered only once.


GETTING BACK TO WHERE YOU STOPPED VIM

You are halfway editing a file and it's time to leave for holidays.  You exit
Vim and go enjoy yourselves, forgetting all about your work.  After a couple
of weeks you start Vim, and type:
>
	'0

And you are right back where you left Vim.  So you can get on with your work.
   Vim creates a mark each time you exit Vim.  The last one is '0.  The
position that '0 pointed to is made '1.  And '1 is made to '2, and so forth.
Mark '9 is lost.
   The |:marks| command is useful to find out where '0 to '9 will take you.


GETTING BACK TO SOME FILE

If you want to go back to a file that you edited recently, but not when
exiting Vim, there is a slightly more complicated way.  You can see a list of
files by typing the command: >

	:oldfiles
<	1: ~/.viminfo ~
	2: ~/text/resume.txt ~
	3: /tmp/draft ~

Now you would like to edit the second file, which is in the list preceded by
"2:".  You type: >

	:e #<2

Instead of ":e" you can use any command that has a file name argument, the
"#<2" item works in the same place as "%" (current file name) and "#"
(alternate file name).  So you can also split the window to edit the third
file: >

	:split #<3

That #<123 thing is a bit complicated when you just want to edit a file.
Fortunately there is a simpler way: >

	:browse oldfiles
<	1: ~/.viminfo ~
	2: ~/text/resume.txt ~
	3: /tmp/draft ~
	-- More --

You get the same list of files as with |:oldfiles|.  If you want to edit
"resume.txt" first press "q" to stop the listing.  You will get a prompt:

	Type number and <Enter> (empty cancels): ~

Type "2" and press <Enter> to edit the second file.

More info at |:oldfiles|, |v:oldfiles| and |c_#<|.


MOVE INFO FROM ONE VIM TO ANOTHER

You can use the ":wviminfo" and ":rviminfo" commands to save and restore the
information while still running Vim.  This is useful for exchanging register
contents between two instances of Vim, for example.  In the first Vim do: >

	:wviminfo! ~/tmp/viminfo

And in the second Vim do: >

	:rviminfo! ~/tmp/viminfo

Obviously, the "w" stands for "write" and the "r" for "read".
   The ! character is used by ":wviminfo" to forcefully overwrite an existing
file.  When it is omitted, and the file exists, the information is merged into
the file.
   The ! character used for ":rviminfo" means that all the information is
used, this may overwrite existing information.  Without the ! only information
that wasn't set is used.
   These commands can also be used to store info and use it again later.  You
could make a directory full of viminfo files, each containing info for a
different purpose.
```

### 63.1.10 Advacned Visual Mode

```text
You can yank, put, and delete commands with registers.You can do similar things with the visual-mode commands.
To delete a block of text, for instance, highlight in visual mode and then use the d command.To delete the text into a register, use the command “register d.
To yank the text into a register, use the y command.
The D and the Y commands act like their lowercase counterparts, except they work
on entire lines, whereas d and y work on just the highlighted section.
```

#### 63.1.10.1 The $ Command

```text
In block visual mode, the $ command causes the selection to be extended to the end
of all the lines in the selection. Moving the cursor up or down extends the select text
to the end of the line.This extension occurs even if the new lines are longer than the
current ones. 
```

#### 63.1.10.2 Repeating a Visual Selection

```text
The gv command repeats the preceding visual mode selection. If you are already in
visual mode, it selects the preceding selection. Repeated gv commands toggle between
the current and preceding selection. 
The steps are as follows:
| 1. First visual selection.
| 2. Finished with visual.
| 3. gv reselects the old visual.
| 4. Define new visual. 
```

#### 63.1.10.3 Selecting Objects

```text
A number of commands in visual mode are designed to help you highlight the text
you want.
The aw command, for example, highlights the next word. Actually it highlights not
only the word, but also the space after it. At first this may seem a bit useless. After all,
the w command moves you forward one word, so why not just use it?
That is because when you perform a selection, the text selected is from the old
cursor location to the new one inclusive. Now if you use the w command to move, the
result is that the cursor is placed on the first character of the next word.Therefore if
you delete the text, you not only get the words you selected, but the first character of
the next word.
The aw command leaves the cursor positioned just before the first character of
the next word. In other words, it selects the word and the spaces beyond it, but not the
next word.
Another reason to use aw rather than w is that aw selects the whole word, no matter
which part of the word the cursor is on, whereas w just selects from the current location
to the end of the word.
If you want to just select the word, and nothing but the word, use the iw (inner
word) command.

You can use the following commands to select text:
countaw Select a word and the space after it.
countiw Select a word only (inner word).
countaW Select a WORD and the space after it.
countiW Select inner WORD (the word only)
countas Select a sentence (and spaces after it.)
countis Select the sentence only.
countap Select a paragraph and the following space.
countip Select a paragraph only.
counta( From within text enclosed in (), select the text up to and including
the ().
counti( Like ab, except the () characters are not selected.
counta< Select matching <> pair, include the <>.
counti< Select matching <> pair, excluding the <>.
counta[ Select matching [] pair, including the [].
counti[ Select matching [] pair, excluding the [].
counta{ Select matching {} pair, including the {}.
counti{ Select matching {} pair, excluding the {}.
```

#### 63.1.10.4 Moving to the Other End of a Selection

```text
The o command moves the cursor to the other end of a selection.
You can then move back to the other end (where you came from) with another o.
The O command moves the cursor to the other corner of the selection in block visual
mode . In other words, the O command moves to the other end of the
selection on the same line.
```

#### 63.1.10.5 Case Changes

```text
The ~ command inverts the case of the selection.The U command makes the text
uppercase and the u command turns the text into lowercase. 
```

#### 63.1.10.6 Joining Lines

```text
The J command joins all the highlighted lines into one long line. Spaces are used to
separate the lines.
If you want to join the lines without adding spaces, use the gJ command.

q. vim join lines in range using global operator
|  a. To join lines in a specific range using a global operator in Vim, you can utilize the `:normal` command. Here's the process:
|  1. Open the file you want to edit in Vim.
|  2. Press `:` to enter command-line mode.
|  3. Specify the range of lines where you want to join the lines. For example, to join lines 5 to 10, you can enter `:5,10`.
|  4. After specifying the range, enter the `normal` command followed by the keystrokes you want to execute on each line. In this case, you'll use the `J` command to join lines. So, the complete command would be `:5,10normal! J`.
|  5. Press Enter to execute the command.

Vim will apply the `J` command to each line in the specified range, joining them together.

Note that the `:normal` command allows you to execute normal mode commands on multiple lines specified by a range. The `!` after `normal` is used to ensure that any mappings or abbreviations defined for `J` are ignored and the default behavior of the command is used.
```

#### 63.1.10.7 Formatting a Block

```text
The gq command formats the text
```

#### 63.1.10.8 The Encode (g?) Command

```text
The g? command encodes or decodes the highlighted text using the rot13 encoding.
(This primitive encoding scheme is frequently used to obscure potentially offensive
Usenet news postings.)
With rot13, if you encode something twice, you decode it.Therefore if the text is
encoded, g? decodes it. If it is in plain text, g? encodes it. 
```

#### 63.1.10.9 The Colon (:) Commands

```text
The : command starts a command-mode command with a range already specified. If
you want to write a block to a file, for example, select the text using visual mode, and
then execute the following command:
:write block.txt
This writes the text to the file block.txt.
Note:The : command only works on whole lines.
```

#### 63.1.10.10 Pipe (!) Command

```text
The ! command pipes a region of text through an external program. For example, the
!sort pipes the selection through the UNIX sort program.
```

### 63.1.11 Select Mode

```text
Select mode is yet another visual mode that allows for quick deletion or replacement
of the selected text.The way you use select mode is simple.You highlight the text and
then type <BS> to delete it. Or you can highlight the text, and then replace it by just
typing the replacement.
How does select mode compare with visual mode? With visual mode, you highlight
the text and then perform an operation. In other words, you need to end the visual
mode operation with a command.With select mode, the commands are limited to
<BS> (for delete) and printable characters (for replacement).This makes things faster
because you do not need to enter a command, but it is much more limited than visual
mode.
You can choose from three select-mode flavors.The commands to start the various
flavors of the select mode are as follows:
gh Start characterwise selection.
gH Start linewise selection.
gCTRL-H Start block selection.
Moving the cursor in select mode is a little more difficult than moving it in normal
visual mode because if you type any printable character, you delete the selected text
and start inserting.Therefore, to select text, you must use the arrow, CTRL, and
function keys.
You can also use the mouse to select text if you set the 'selectmode' option to
mouse, as follows:
:set selectmode=mouse
(Without this option, the mouse performs a visual selection rather than a select-mode
selection.)
You can also use the 'selectmode' option to let the shifted cursor keys enter select
mode.

-> After selection is made, backspace will delete it
-> After selection is made, start typing to replace
-> Switching Modes
The CTRL-O command switches from selection mode to visual mode for one command.
The CTRL-G command switches to visual mode without returning.To switch
from visual mode to select mode, use the CTRL-G command.
-> Avoiding Automatic Reselection
Usually when you select text, the text remains selected. Even if you execute a command,
	the selection remains.The gV command causes the selection to disappear after
		the command is executed.This proves extremely useful for macros that make a selection,
	do something with it, and then want it to disappear.
```

### 63.1.12 Comparing Two Files, scroll two windows at same time

```text
Suppose you want to compare two files that differ by a just a few edits.To do this, start
by opening two windows, one for each edit. Next, execute the following command in
each window:
:set scrollbind
Now when one window scrolls, so does the other. 
As you scroll through both windows, you might encounter a place where you must
move one window without moving the other.To do so, all you have to do is execute
the following command in the window you want to move and move it:
:set noscrollbind
Then to synchronize scrolling, you execute this command:
:set scrollbind

The ‘scrollopt’ option controls how ‘scrollbind’ works. It is a set of the following
keywords:
ver Vertical scrolling
hor Horizontal scrolling
jump When switching between windows, make sure the offsets are 0.
Finally, the following command synchronizes the two windows:
:syncbind
Suppose, for example, that you have been looking at two versions of a file, moving
both around.To look at some things, you turned off ‘scrollbind’. Now the files
point at two different places.
You want to go back to synchronized scrolling.You could synchronize the windows
by going to each and moving it to the right location; you let Vim do the work. In this
case, you set scrollbind in both windows and then execute the following:
:syncbind
Vim then synchronizes the two files.
```

### 63.1.13 The Preview Window

```text
Suppose you are going through a program and find a function call that you do not
understand.You could do a CTRL-] on the identifier and jump to the location represented
by the tag. But there is a problem with this.The current file disappears because
the file with the function definition replaces it.
A solution to this is to use a special window called the “preview” window. By executing
the following command, you open a preview window and display the function
definition:
:ptag {function}
(If you already have a preview window up, it is switched to the definition of the function.)
Assume that you have just executed the
following command:
:ptag copy_p_date
After you have finished with the preview window, execute the following command:
:pclose
(CTRL-Wz or ZZ accomplishes the same thing.)
A whole set of commands is designed to manipulate the file in the preview
window.The commands are as follows:
:ppop Do a :pop command in the preview window.
:ptselect {identifier} Open a preview window and do a :tselect.
:ptjump {identifier} Open a preview window and do a :tjump.
:[count] ptnext Do a :[count] tnext in the preview window.
:[count] ptprevious Do a :[count] tprevious in the preview window.
:[count] ptrewind Do a :[count] trewind in the preview window.
:ptlast Do a :tlast in the preview window.
CTRL-W} Do a :ptag on the word under the cursor.
CTRL-Wg} Do a :ptjump on the word under the cursor.
```

### 63.1.14 Match Options

```text
The ‘matchpairs’ option controls what characters are matched by the % command.
The default value of this option is as follows:
:set matchpairs = (:),{:},[:]
This tells Vim to match pairs of (), [], and {}.
To match <> (useful if you are editing HTML documents), for example, use the
following command:
:set matchpairs=<:>
This matches just <> pairs. If you want to match <> in addition to the other characters,
you need this command:
:set matchpairs=(:),{:},[:],<:>
This is a little long and awkward to type.The += flavor of the :set command adds characters
to an option.Therefore, to add <> to the match list, use the following command:
:set matchpairs+=<:>
```

### 63.1.15 Showing Matches

```text
If you execute the following command, when you enter any type of bracket ( (, ), [,
], {, }),Vim will cause the cursor to jump to the matching bracket briefly when
entering:
:set showmatch
Generally this jump lasts only for a half second, but you can change it with the
‘matchtime’ option. If you want to make it 1.5 seconds, for instance, use the following
command:
:set matchtime=15
The value of this option is 1/10 second.
```

### 63.1.16 Dealing with Multiple Directories

```text
As programming projects grow larger and larger, you might find it convenient to
organize things in different directories.Take a look at a small project.You have a main
directory that contains main.c and main.h.The other directory is lib and it contains
lib.c and lib.h. (This naming has no imagination, but it does make a good example.)

You start editing in the directory main.The first thing you need to do is tell Vim
about your new directory.You use the :set ^= command to put the directory at the
top of the search path with the following command:
:set path ^= ../lib
Suppose you are editing the file main.c.The file looks like this:
#include “main.h”
#include “lib.h”
int main(int argc, char *argv[])
Now you need to check out a subroutine declaration in lib.h. One way of going to
that file is to execute the following command:
:vi ../lib/lib.h
This assumes you know where lib.h resides. But there is a better way. First, you
position the cursor over the filename in the following line:
#include “lib.h”
Now you execute the command gf.The Vim editor tries to edit the filename which is
under the cursor.The editor searches for the file in each directory in the path variable.
Suppose, however, that you want to edit the file lib.c.This name does not appear
in the text, so you cannot use the gf command. Instead, you execute the following
command:
:find lib.c
This acts just like the :vi command, except the editor searches for the file along the
path.The following command does the same thing, but it splits the window and then
does a :find:
:sfind lib.c
The gf command acts like a :find command but use the word under the cursor as the
name of the file to edit. If there is more than one file along the ‘path’ that matches
the given file name, then you can select which one Vim edits by giving the gf
command a count.
In other words if you position the cursor on the name param.h and execute the
command 2gf, Vim will edit the second param.h file it finds looking through the
directories specified by the ‘path’ option.
The ]f and [f command are older, depreciated versions of the gf command.
```

#### 63.1.16.1 The include Path

```text
The path option is used by Vim to tell it where to look for files that were included in
the current file.The format of this option is as follows:
:set path=directory,directory,... 

Directory is a directory to search. For example:
:set path=/usr/include,/usr/X11R6/include
You can use wildcards (*) in any directory of the path specification:
:set path=/usr/include,/usr/include/*
There are a number of special directories:
** Match an entire tree. For example:
:set path=/usr/include/**
This command searches /usr/include and all its subdirectories.The following
path specification searches the files in any directory that starts with
/home/oualline/progs and ends with include:
:set path=/home/oualline/progs/**/include
“” The empty string indicates the current directory. (For example, the middle
directory of the trio “first,, last”.)
. The directory in which the file being edited resides.
For example, the following command tells Vim to search /usr/include and all it is
subdirectories, the directory in which the file resides (.), and the current directory
(,,).
:set path=/usr/include/**,.,,

**/
```

#### 63.1.16.2 Checking the Path

```text
To make sure that you can find all the #include files, you can execute the following
command:
:checkpath
This command works not only on the #include directives in the file you are editing,
but also on any files that they #include and so on.The result is that all #include files
are checked.
In this case, a number of files include the files stddef.h and stdarg.h. But Vim
cannot find these files. If you want to tell Vim to search the Linux-specific include
directory, you can execute the following command:
:set path+=/usr/include/linux

This command lists only the files that cannot be found. If you want to list all #include
files, use this command:
:checkpath!
```

#### 63.1.16.3 My settings

```text
Note, For working on ACS in clearcase views, assuming that VIM is launched from /view/[view name]<internal-path> ex: <internal-path>

-> Check current settings
:set path?

-> Set to find h files in view
set path=./**,/usr/include,$PWD/**,
Now gf will find the h files, BUT, it will be much slower than cscope or etags
so, three methods to find h file, once cursor is positioned on it:
a. gf (assume path is set correctly)
b. ctrl-] - use tags
c. ctrl-\ f , use cscope mapping

**/
```

### 63.1.17 Complete Regular Expressions

```text
The search logic of Vim uses regular expressions.You saw some simple ones in
Chapter 3,“Searching,” but this chapter goes into them in extreme detail. Regular
expressions enable you to search for more than simple strings. By specifying a regular
expression in your search command, you can search for a character pattern, such as “all
words that begin with t and end in ing” (regular expression = \<t[^ ]*ing\>).
However, the power of regular expressions comes with a price. Regular expressions
are quite cryptic and terse. It may take some time for you to get used to all the ins and
outs of this powerful tool.
While learning regular expressions, you should execute the following command:
:set hlsearch
This causes Vim to highlight the text you matched with your last search.Therefore,
when you search for a regular expression, you can tell what you really matched (as
opposed to what you thought you matched).
A regular expression consists of a series of atoms. An atom is the smallest matching
unit in a regular expression. Atoms can be things like a single character, such as a
(which matches the letter a), or a special character, such as $ (which matches the end
of the line). Other atoms, such as \< (word start, see the following section), consist of
multiple characters.
```

#### 63.1.17.1 Beginning (\<) and End (\>) of a Word

```text
The atom \< matches the beginning of a word.The atom \> matches the end of a
word.
For example, a search for the expression for finds all occurrences of for, even those
in other words, such as Californian and Unfortunately. Figure 19.9 shows the results of
this search.
If you use the regular expression \<for\>, however, you match only the actual word
```

#### 63.1.17.2 Modifiers and Grouping

```text
The modifier * is used to indicate that an atom is to be matched 0 or more times.The
match is “greedy.” In other words, the editor will try to match as much as possible.
Thus, the regular expression te* matches te, tee, teee, and so on.
The expression te* also matches the string t.Why? Because e* can match a zerolength
string of e’s. And t is the letter t followed by zero e’s.
Figure 19.11 shows the results of the search for te*.
Calls and letters to the company failed to correct
this problem. Finally the fellow just gave up and
wrote a check for $0.00 and the bills ceased.
A Californian who loved sailing went down and applied
for a personalized license plate. He filled in his
three choices as 1)SAIL 2)SAILING and 3)NONE. He got
a new plate labeled "NONE."
Unfortunately, when the police write out a ticket
/\<for\>

----------------------------------------------------------------------------------------------------
This is a test.
te tee teee teee
~~
/te*
Figure 19.11 Search for /te*.
----------------------------------------------------------------------------------------------------

The \+ modifier indicates that the atom is to be matched one or more times.
Therefore, te\+ matches te, tee, and teee, but not t. (te\+ is the same as tee*.).
Figure 19.12 illustrates what is matched for the search /te\+.

----------------------------------------------------------------------------------------------------
This is a test.
te tee teee teee
~~
/te\+
Figure 19.12 Search for /te\+.
----------------------------------------------------------------------------------------------------

Finally, there is the \= modifier. It causes the preceding atom to be matched zero or
one time.This means that te\= matches t and te, but not tee. (Although it will match
the first two characters of tee.) Figure 19.13 shows a typical search.
```

#### 63.1.17.3 Special Atoms

```text
A number of special escaped characters match a range of characters. For example, the
\a atom matches any letter, and the \d option matches any digit.The regular expression
\a\a\a matches any three letters.
Now try a search for any four digits. Figure 19.14 displays the results.

----------------------------------------------------------------------------------------------------
1
2 // Read at most 10MB
3 const unsigned int MAX_READ = (10 * 1024 *1024);
4
5 // Size of a buffer
6 const unsigned int BUF_SIZE = (62 * 1024);
7
8 // Buffer to be written
9 static unsigned char buffer[BUF_SIZE];
10
Figure 19.14 Search for /\d\d\d\d.
----------------------------------------------------------------------------------------------------

Now try a search for any three letters followed by an underscore. 
```

#### 63.1.17.4 Character Ranges

```text
The \a atom matches all the letters (uppercase and lowercase). But suppose you want
to match only the vowels.The range operator enables you to match one of a series of
characters. For example, the range [aeiou] matches a single lowercase vowel.The
string t[aeiou]n matches tan, ten, tin, ton and tun.

You can specify a range of characters inside the brackets ([]) by using a dash. For
example, the pattern [0-9], matches the characters 0 through 9. (That is
0,1,2,3,4,5,6,7,8,9.)
You can combine ranges with other characters. For example, [0-9aeiou] matches
any digit or lowercase vowel.
The ^ character indicates a set of characters that match everything except the indicated
characters.To match the constants, for example, you can specify [^aeioAEIOU].
Pattern Matches
one[\-]way one-way, but not one way or one+way
2\^4 2^4
2[\^*]4 2^4, 2*4
```

#### 63.1.17.5 Character Classes

```text
Suppose you want to specify all the uppercase letters. One way to do this is to use the
expression [A-Z]. Another way is to use one of the predefined character classes.The
class [:upper:] matches the uppercase characters.Therefore, you can write [A-Z] as
[[:upper:]].
You can write the entire alphabet, upper- and lowercase, [[:upper:][:lower:]].
There are a large number of different character classes.
Note
To match the ^, you need to escape it. For example, [\^$.] matches any one of the three symbols
^, $, or ..

Note
You cannot use the special atoms like \a and \d in a range. For example, [\a\d] matches the characters
\, a, \, and d. It does not match the letters (\a) and digits (\d).
```

#### 63.1.17.6 Repeat Modifiers

```text
You can specify how many times an atom is to be repeated.The general form of a
repeat is as follows:
\{minimum, maximum}
For example, the regular expression a\{3,5} will match 3 to 5 a’s. (that is, aaa, aaaa, or
aaaaa.) By default, the Vim editor tries to match as much as possible. So a\{3,5} will
match as many a’s as it can (up to 5).
The minimum can be omitted, in which case it defaults to zero.Therefore, a,\{,5}
matches 0–5 repeats of the letter.The maximum can be omitted as well, in which case
it defaults to infinity. So a\{3,} matches at least 3 a’s, but will match as many a’s as
you have got on the line.

If only one number is specified, the atom must match exactly that number of times.
Therefore, a\{5} matches 5 a’s, exactly.
```

#### 63.1.17.6.1 Repeating as Little as Possible

```text
If you put a minus sign (-) before any of the numbers, the Vim editor tries to match as
little as possible.
Therefore, a\{-3,5} will match 3 to 5 a’s, as little as possible. Actually if this expression
is by itself, it will always match just three a’s.That is because even if you have the
word aaaaa, the editor will match as little as possible.
The specification a\{-3,} matches 3 or more a’s, as little as possible.The expression
a\{-,5} matches 0–5 letters.
The expression a\{-} matches 0 to infinity number of characters, as little as possible.
Note that this pattern by itself will always match zero characters. It only makes
sense when there is something after it. For example: [a-z]\{-}x will match cx in cxcx.
Using [a-z]*x would have matched the whole cxcx.
Finally, the specification a\{-5} matches exactly 5 a’s, as little as possible. Because as
little as possible is exactly 5, the expression a\{-5} acts just like a\{5}.
```

#### 63.1.17.7 Grouping ( \(\) )

```text
You can specify a group by enclosing it in a \( and \). For example, the expression
a*b matches b, ab, aab, aaab, and so on.The expression a\(XY\)*b matches ab, aXYb,
aXYXYb, aXYXYXYb, and so on.
When you define a group using \(\), the first enclosed string is assigned to the
atom \1.To match the string the the, for instance, use the regular expression \(the\)
\1.To find repeated words, you can get a bit more general and use the expression

\(\<\a\+\>\) \1. 

Figure 19.16 breaks this into its components.
Put matching text in \1
Match beginning of a word
Match a single letter
Repeat 1 or more times
Ending of a word
Match space
Match what was in the first \ (... \ )
\ ( \ < \ a + \ > \ ) \ 1
Figure 19.16 The repeat (\1) expression.
The first group is assigned to \1, the second \2, and so on.
```

#### 63.1.17.8 The Or Operator (\|)

```text
The \| operator enables you to specify two or more possible matches.The regular
expression foo\|bar matches foo or bar.
For example, the search
/procedure\|function
searches for either procedure or function.
```

#### 63.1.17.9 Putting It All Together

```text
Let’s create a regular expression to match California license plate numbers. A sample
license plate looks like 1MGU103.The pattern is one digit, three uppercase letters,
and three digits.There are several ways of doing this.
Start by specifying the digit as [0-9], now add the uppercase letter: [0-9][A-Z].
There are three of them, so you get [0-9][A-Z]\{3}. Finally, you add the three digits
on the end, resulting in [0-9][A-Z]\{3}[0-9]\{3}.
Another way to do this is to recognize that \d represents any digit and \u any
uppercase character.The result is \d\u\{3}\d\{3}.
The experts tell us that this form is faster than using the [] form. If you are editing
a file where this speed up makes a difference, however, your file might be too big.
You can accomplish this without repeats as well: \d\u\u\u\d\d\d.
Finally, you can use the character classes, yielding
[[:digit:]][[:upper:]]\{3][[:digit:]]\{3}.
All four of these expressions work.Which version should you use? Whichever one
you can remember.You should remember this old adage:The simple way you can
remember is much faster than the fancy way you can’t.
```

#### 63.1.17.10 The magic Option

```text
The expressions discussed so far assume that the 'magic' option is on.When this
option is turned off, many of the symbols used in regular expressions lose their magic
powers.They only get them back when escaped.
Specifically, if you execute the command
:set nomagic
the *, ., [, and ] characters are not treated as special characters. If you want to use the *
for “0 or more repeats,” you need to escape it: \*.
You should keep the 'magic' option on (the default) for portability and macro
files.


			63.1.17.11
```

### 63.1.18 references

#### 63.1.18.1 Offset Specification Reference

```text
[num]
+[num] Down [num] lines. Cursor is placed at the beginning of the line.
-[num] Up [num] lines. Cursor is placed at the beginning of the line.
e End of the match.
e[num] End of the match, the move [num]. If [num] is positive, move right,
negative, move left.
b
s Start of the match.
b[num]
s[num] Start of the match, then move [num]. If [num] is positive, move right;
negative, move left.
```

#### 63.1.18.2 Regular Expressions Reference

```text
The following table assumes that the 'magic' option is on (the default).
```

#### 63.1.18.2.1 Simple Atoms

```text
x The literal character x.
^ Start of line.
$ End of line.
. A single character.
\< Start of a word.
\> End of word.
```

#### 63.1.18.2.2 Range Atoms

```text
[abc] Match either a, b, or c.
[^abc] Match anything except a, b, or c.
[a-z] Match all characters from a through z.
[a-zA-Z] Match all characters from a through z and A through Z.
```

#### 63.1.18.2.3 Character Classes

```text
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
```

#### 63.1.18.2.4 Patterns (Used for Substitutions)

```text
\(pattern\) Mark the pattern for later use.The first set of \(\) marks a
subexpression as \1, the second \2, and so on.
\1 Match the same string that was matched by the first subexpression
in \( and \). For example: \([a-z]\).\1 matches ata,
ehe, tot, and so forth.
\2 Like \1, but uses second subexpression,
\9 Like \1, but uses ninth subexpression.
```

#### 63.1.18.2.5 Special Character Atoms

```text
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
```

#### 63.1.18.2.6 Modifiers

```text
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

				63.1.18.2.7

			63.1.18.3
```

### 63.1.19 Special Registers

```text
Vim has a number of special registers.The first is the unnamed register, whose name is
double quote (“).
Others include the registers 1 through 9. Register 1 contains the last text you
deleted; register 2 the next to last, and so on.
(Back in the bad old days of Vi, these registers were a lifesaver.You see, Vi had only
one level of undo. So if you deleted three lines by executing dd three times, you were
out of luck if you wanted to undo the delete using the u command. Fortunately, the
three lines were stored in registers 1, 2, and 3, so you could put them back with
“1P”2P”3P.You can also use the command “”P.. (“”P and two dots).
Other special registers include the following:
Register Description Writeable
0 The last yanked text Yes
- The last small delete No
. The last inserted text No
% The name of the current file No
# The name of the alternate file No
/ The last search string No
: The last “:” command No
_ The black hole (more on this later) Yes
= An expression (see next page) No
* The text selected with the mouse Yes
```

#### 63.1.19.1 The Black Hole Register (_)

```text
Placing text into the black hole register causes it to disappear.You can also “put” the
black hole register, but this is pretty much useless because the black hole register
always contains nothing.
The black hole register is useful when you want to delete text without having it go
into the 1 through 9 registers. For example, dd deletes a line and stores it in 1.The
command “_dd deletes a line and leaves 1 alone.
```

#### 63.1.19.2 The Expression Register (=)

```text
The expression register (=) is designed so that you can enter expressions into text.
When you enter a command beginning with an expression register specification, the
Vim editor displays the prompt = at the end of the screen.This gives you an opportunity
to type in an expression such as 38*56, and you can then put the result into the
text with the p command. For example “=38*56<Enter>p gives you 2128. Figure 20.5
shows this register in action.

Another usages is while inserting text hit ctrl+r, then =, put expression and press enter
An expression can contain all the usual arithmetic operators (*, +, -, /, and so on) as
well as a ton of specialized Vim functions and operators. If you are doing more than
simple arithmetic, you will want to check the full expression documentation.
You can specify the value of an environment variable, for example, by using the
expression $NAME (for instance, $HOME).You can determine the value of a Vim variable
by just specifying the variable (LineSize, for instance).
```

#### 63.1.19.3 The Clipboard Register (*)

```text
The clipboard register (*) enables you to read and write data to the system clipboard.
This can be the X selection (UNIX) or the Microsoft Windows Clipboard.This
enables you to cut and paste text between the Vim editor and other applications
```

#### 63.1.19.4 How to Edit All the Files That Contain a

```text
Given Word
If you are a UNIX user, you can use a combination of Vim and Grep to edit all the
files that contain a given word.This proves extremely useful if you are working on a
program and want to view or edit all the files that contain a specified variable.
Suppose, for example, that you want to edit all the C program files that contain the
word frame_counter.To do this, you use the following command:
$ vim `grep -l ‘frame_counter’ *.c`
Consider this command in detail.The grep command searches through a set of files
for a given word. Because the -l option is specified, the command will list only the
files containing the word and not print the line itself.The word it is searching for is
frame_counter. Actually, this can be any regular expression. (Note that what Grep uses for
regular expressions is not as complete or complex as what Vim uses.)
The entire command is enclosed in backticks (`).This tells the UNIX shell to run
this command and pretend that the results were typed on the command line. So what
happens is that the grep command is run and produces a list of files; these files are put
on the Vim command line.This results in Vim editing the file list that is the output of
Grep.
You might be asking, “Why show this here?”This is a feature of the UNIX shell
(for example, bash), and is not part of Vim’s repertoire.The way to accomplish something
similar within Vim, and which works on Win32 as well, is as follows:
:arg `grep –l ‘frame_counter’ *.c`
This command sets the argument list (for example, the files “on the command
line,” as it were).
Note
The Vim command :grep can perform a similar function.
```

#### 63.1.19.4.1 Editing a Specific File

```text
To edit a specific file in this list (file 2, for instance), you need the following
command:
:argument 2 


				63.1.19.4.2 This command enables you to specify a file by its position in the argument list.
Suppose, for instance, that you start Vim with this command:
$ gvim one.c two.c three.c four.c five.c six.c seven.c
The following command causes you to be thrown into the file four.c.
:argument 4
Changing the File List
The file list is initially set to the list of files you specify on the command line.You can
change this list by specifying a new list to the :args command. For example:
:args alpha.c beta.c gamma.c
After executing this command, you start editing alpha.c; the next file is beta.c and so
on. (The previous file list is lost.)
Note
The :next file-list command will do the same thing.
```

#### 63.1.19.4.3 The +cmd Argument

```text
Suppose that you want to start editing a file at line 97.You can start Vim and execute a
97G, or you can tell Vim to start editing with the cursor on line 97.You can do this by
using the option +linenumber on the command line. For example:
$ gvim +97 file.c
You can also use the +cmd to search for a string by using +/string on the command
line.To start editing a file with the cursor positioned on the first line containing
#include, for instance, use this command:
$ vim +/#include file.c
Finally, you can put any command-mode command after the plus sign (+).
You can specify the +cmd argument in a number of commands. For example, the
general form of the :vi command is as follows:
:vi [+cmd] {file}
These other commands can take a +cmd:
:next [+cmd]
:wnext [+cmd]
:previous [+cmd]
:wprevious [+cmd]
:Next [+cmd]
:wNext [+cmd]
:rewind [+cmd]
:last [+cmd]


				63.1.19.4.4
```

#### 63.1.19.5 Complete Command-Mode (:) Commands

```text
ALTHOUGH THEVIMEDITOR IS SUPERBwhen it comes to doing things visually,
sometimes you need to use command mode. For example, command-mode commands
are much easier to use in scripts. Also, a number of other specialized commands are
found only in command mode.
Being expert in the command-mode command means that you are a Vim power
user with the ability to execute a number of amazing high-speed editing commands.
```

#### 63.1.19.5.1 Editing Commands

```text
The :delete command deletes a range of lines.To delete lines 1 through 5 (inclusive),
for example, use the following command:
:1,5 delete
The general form of the :delete command is as follows:
: range delete register count
The register parameter specifies the text register in which to place the deleted text.This
is one of the named registers (a–z). If you use the uppercase version of the name
(A–Z), the text is appended to what is already in the register. If this parameter is not
specified, the unnamed register is used.
The count parameter specifies the number of lines to delete (more on this later in
this section).
The range parameter specifies the lines to use. Consider the following example
(spaces added for readability):
:1, 3 delete

You have learned how to use search patterns for line specification. For example, the
following command deletes starting from the first line with hello to the first line that
contains goodbye.
:/hello/,/goodbye/ delete
Note: If goodbye comes before hello, the line range will be backwards, and the command
will not work.
You can refine the search string specification by adding an offset. For example,
/hello/+1 specifies the line one line after the line with the word hello in it.Therefore,
the following command results in the screen shown in Figure 25.2.
:/beach/+1, /seashore/-1 delete

----------------------------------------------------------------------------------------------------
1 A UNIX sales lady, Lenore,
2 Enjoys work, but she likes the beach more.
3 She found a good way
4 To combine work and play:
5 She sells C shells by the seashore.
~
1 To combine work and play:
2 She sells C shells by the seashor
~~~~ 3
fewer lines
1 A UNIX sales lady, Lenore,
2 Enjoys work, but she likes the beach more.
3 She sells C shells by the seashore.
~~~
: /beach/+1, /seashore/–1 delete
Figure 25.2 Results of :/beach/+1, /seashore/-1 delete.
----------------------------------------------------------------------------------------------------

You can also use special shorthand operators for patterns, as follows:
\/ Search forward for the last pattern used.
\? Search backward for the last pattern used.
\& Search forward for the pattern last used as substitute pattern.
You can also chain patterns.The following command, for example, finds the string
first and then searches for the string second.
/first//second/
Figure 25.3 shows the result of this command:
:/found//work/ delete

----------------------------------------------------------------------------------------------------
1 A UNIX sales lady, Lenore,
2 Enjoys work, but she likes the beach more.
3 She found a good way
4 She sells C shells by the seashore.
~~ :/found//work/ delete
Figure 25.3 :/found//word/delete.
----------------------------------------------------------------------------------------------------

You can also specify a line number on which to start.To start the search at line 7, for
instance, use the following command-line specification:
7/first/

				-> Other Ways to Specify Ranges
If you execute a : command with no count (as most users generally do), the Vim
editor puts you into command mode and enables you to specify the range. If you give
the command a count(5:, for example), the range is count lines (including the current
one).The actual specification of this arrangement is that if you include a count, your
line range is as follows:
:.,count - 1
In the example original file, for instance, if you move to the top line and then execute
the following command, you get the results shown in Figure 25.4:

----------------------------------------------------------------------------------------------------
3:delete
1 To combine work and play:
2 She sells C shells by the seashore.
~~~~ 3
fewer lines
Figure 25.4 3:delete.
----------------------------------------------------------------------------------------------------

				-> Deleting with a Count
Another form of the delete command is as follows:
:line delete count
In this case, the :delete command goes to line (default = the current line) and then
deletes count lines.
If you execute the following command on the original example file, for instance,
you get the results shown in Figure 25.5:
----------------------------------------------------------------------------------------------------
:3 delete 2
1 A UNIX sales lady, Lenore,
2 Enjoys work, but she likes the beach more.
3 She sells C shells by the seashore.
~~~ :
3
delete 2
Figure 25.5 :3 delete 2.
----------------------------------------------------------------------------------------------------
```

#### 63.1.19.5.2 Copy and Move

```text
The :copy command copies a set of lines from one point to another.The general form
of the copy command is as follows:
:range copy address
If not specified, range defaults to the current line.This command copies the line in
range to the line specified after address. Consider the following command, for example:
:1,3 copy 4
Executed on the original joke, you get the results shown in Figure 25.6.
Note
You can specify a line range for this type of command, but the first line is ignored and the second one is
used
The :move command is much like the :copy command, except the lines are moved
rather than copied.The following command results in what is shown in Figure 25.7:
:1,3 move 4
```

#### 63.1.19.5.3 Inserting Text

```text
Suppose that you want to insert a bunch of lines and for some reason you want to use
command mode.You need to go to the line above where you want the new text to
appear. In other words, you want the text to be inserted after the current line.
Now start the insert by executing the :append command.Type the lines that you
want to add and finish by typing a line that consists of just a period (.).
The following example illustrates the :append command.
:% print
A UNIX sales lady, Lenore,
Enjoys work, but she likes the beach more.
She found a good way
To combine work and play:
She sells C shells by the seashore.
:1append
This line is appended.
.
:% print
A UNIX sales lady, Lenore,
This line is appended.
Enjoys work, but she likes the beach more.
She found a good way
To combine work and play:
She sells C shells by the seashore.
The general form of the :append command is as follows:
:line append
The line is the line after which to insert the new text.

The :insert command also inserts text. It has a similar form:
:line insert
It works just like :append except that :append inserts after and :insert inserts before
the current line
```

#### 63.1.19.5.4 Printing with Line Numbers

```text
You do not have to turn on the number option to print the text with line numbers.
The :# command accomplishes the same thing as :print but includes line numbers:
:1 print
A UNIX sales lady, Lenore,
:1 #
1 A UNIX sales lady, Lenore,
```

#### 63.1.19.5.5 Printing with list Enabled

```text
The 'list' option causes invisible characters to be visible.The :list command lists
the specified lines, assuming that this option is on:
:1,5 list
```

#### 63.1.19.5.6 Print the Text and Then Some

```text
The :z command prints a range of lines (the current one being the default) and the
lines surrounding them. For example, the following command prints line 100 and then
a screen full of data:
:100 z
The :z command takes a count of the number of extra lines to list. For example, the
following command lists line 100 and three additional lines:
:100 z 3
The :z command can be followed by a code indicating how much to display.The
following table lists the codes:
Code Listing Start Listing End New Current Line
+ Current line One screen forward One screen forward
- One screen back Current line Current line
^ Two screens back One screen back One screen back
. One-half screen back One-half screen forward One-half screen forward
= One-half screen back One-half screen forward Current line
```

#### 63.1.19.6 Substitute

```text
The format of the basic substitute command is as follows:
:range substitute /from/to/flags count
Note
This example uses a slash (/) to separate the patterns. Actually you can use almost any character that
does not appear in the patterns. The following, for example, is perfectly valid:
:substitute +from+to+
This can prove extremely useful when you are dealing with patterns that contain slashes, such as
filenames:
:1,$ substitute +/home/user+/apps/product+
Delimiters can be any character except letters, digits, backslash, double quote, or
vertical bar.
The Vim editor uses a special set of magic characters to represent special things. For
example, star (*) stands for “repeat 0 or more times.”
If you set the 'nomagic' option, however, the magic meanings of some of these
characters are turned off. (For a complete list of the magic characters and how the
'nomagic' option affects them, see Chapter 19, “Advanced Searching Using Regular
Expressions.”)

is set during the command.
For example, start in command mode with a one-line file.You start by printing the
entire file:
:%print
Test aaa* aa* a*
Now set the 'magic' option and perform a substitution.The p flag tells the editor to
print the line it changed:
:set magic
:1 substitute /a*/b/p
bTest aaa* aa* a*
This command made only one change at the beginning of the line. So why did it
change Test to b*Test when there is no a around? The answer is that the magic character
star (*) matches zero or more times. Test begins with zero a’s.
But why did it make only one change? Because the :substitute command
changes only the first occurrence unless the g flag is present. Now undo the change
and try again:
:undo
:1 substitute /a*/b/pg
bTbebsbtb b*b b*b b*b
This time you got what you wanted. Now try it again with the 'nomagic' option set:
:undo
:set nomagic
:1 substitute /a*/b/pg
Test aab ab b
Without 'magic', a star (*) is just a star. It is substituted directly.
The :smagic command forces magic on the star (*) and other characters while the
substitution is being made, resulting in the following:
:undo
:1 smagic /a*/b/pg
bTbebsbtb b*b b*b b*b
The :snomagic forces 'magic' off.
:undo
:set magic
:1 snomagic /a*/b/pg
Test aab ab b
The & command repeats the substitution.This enables you to keep your old from and
to strings, but also to supply a different range or flags. The general form of this command
is as follows:
:range& flags count
For example:
:1 substitute /a\+/b/p
Test b* aa* a*

The command changes the first occurrence of from on the line.You want the entire
line, so you repeat the substitution with the g option:
:&g
Of course, this does not print (because the new flags—in this case g—replaces the flags
and you did not specify p or, more specifically, pg).Take a look at the result:
:1 print
Test b* b* b*
This is what you wanted.
The :& command and the :substitute command with no from or to specified acts
the same.
The normal-mode & command repeats the last :substitute command. If you were
to execute the following command, for instance, you would change the first manager
on line 5 to an idiot:
:5 substitute /manager/idiot/
Now if you enter normal mode (through the :vi command) and execute an & command,
the next manager on this line would change as well. If you were to move down
to another line and execute an & command, you would change that line as well. If you
give & a count, it will work on that many lines.
The :~ command acts just like the &g command, except that it uses as from the last
search pattern (used for a / or ? search) rather than the last :substitute from string.
The general form of this command is as follows:
:range~ flags count

	-> Repeat Substitution
The & command repeats the last substitution.
```

#### 63.1.19.6.1 Making g the Default

```text
Generally the :substitute command changes only the first occurrence of the word
unless you use the 'g' option.To make the 'g' option the default, use the following
command:
:set gdefault
Note:This can break some scripts you may use.
```

#### 63.1.19.6.2 Global Changes

```text
The command-mode commands covered so far have one limitation:They work only
on a contiguous set of lines. Suppose, however, that you want to change just the lines
that contain a certain pattern. In such a case, you need the :global command. The
general form of this command is as follows:
:range global /pattern/ command
This tells Vim to perform the given command on all lines that contain the pattern in
the specified range.To print all the lines within a file that contain the word Professor,
for instance, use the following command:
:% global /Professor/ print
Professor: Yes.
Professor: You mean it’s not supposed to do that?
Professor: Well there was no Computer Center Bulletin
Professors of mathematics will prove the existence of
The :global! command applies the command to all the lines that do not match the
given pattern, as will the :vglobal command.

			63.1.19.7
```

### 63.1.20 Directory Manipulation

```text
To change the current working directory, use the following command:
:cd dir
This command acts just like the system cd command.
On UNIX, it changes the current working directory to the given directory. If no
directory is specified, it goes to the user’s home directory.
On Microsoft Windows, it goes to the indicated directory. If no directory is specified,
it prints the current working directory.
The following command changes the directory to the previous path:
:cd -
In other words, it does a cd to the last directory you used as the current working
directory.
To find out which directory Vim is currently using, use this command:
:pwd
Start deep in the directory tree, for instance:
:pwd
/mnt/sabina/sdo/writing/book/vim/book/11

You are working on a UNIX system, so go to your $home directory:
:cd
:pwd
/home/sdo
Jump into another directory:
:cd tmp
:pwd
/home/sdo/tmp
Return to the previous directory:
:cd -
:pwd
/home/sdo
Return to the previous directory before this one:
:cd -
:pwd
/home/sdo/tmp
```

### 63.1.21 Files

#### 63.1.21.1 Current File

```text
The following command prints out the current file and line information:
:file
Note that ctrl+G does the same

If you want to change the name of what Vim thinks is the filename, use this command:
:file name
Suppose, for example, that you start editing a file called complete.txt.You get this file
just right, so you write it out using the :write command. Now you want shorten the
file and write it out as summary.txt. So now you execute this command:
:file summary.txt
Now when you continue to edit, any changes are saved to summary.txt.
Take a look at how this works.You start by editing the file star.txt.
:file
“star.txt” line 1 of 1 —100%— col 1
The :write command with no arguments writes the file to the current filename (in
this case, star.txt).
:write
“star.txt” 1 line, 18 characters written
Now you want to change the filename to new.txt.The editor tells you that this is a
new filename.
:file new.txt
“new.txt” [Not edited] line 1 of 1 —100%— col 1
The :write command is used to write the file. In this case, the current filename
differs; it is new.txt.
:write
“NEW.TXT” [New File] 1 line, 18 characters written
There is another command similar to :file; the following command prints the current
line number:
:=
For example:
:=
line 1
```

#### 63.1.21.2 Advanced :write Commands

```text
The :write command writes the buffer (or a selected range of lines) to a file. It has
some additional options.The following command, for example, appends the contents
of the file you are editing to the file named collect.txt:
:write >> collect.txt
If the collect.txt file does not exist, this command aborts with an error message. If
you want to “append” to the file even if does not exist, use the force (!) option:
:write! >> collect.txt
The :write command can not only write to a file, but it can also be used to pipe the
file to another program. On Linux or UNIX, for instance, you can send the file to a
printer by using the following command:
:write !lpr
Warning
The following two commands are different; the difference being only the spacing:
:write! lpr
:write !lpr
The first writes to the file named lpr with the force option in place. The second sends the output to the
command lpr.
```

#### 63.1.21.3 Updating Files

```text
The :update command acts just like the :write command, with one exception: If the
buffer is not modified, the command does nothing.
```

#### 63.1.21.4 Reading Files

```text
The :read command reads in a file.The general form of this command is as follows:
:line read file
The preceding command reads the file in and inserts it just after line. If no file is specified,
the current file is used. If no line is supplied, the current line is used.
Like :write, the :read command can use a command rather than a file.To read the
output of a command and insert it after the current line, use the following command:
:line read !command
```

#### 63.1.21.5 Register Execution

```text
Chapter 2, “Editing a Little Faster,” showed you how to record macros in registers. If
you want to use these macros in command mode, you can execute the contents of a
register with the following command:
:line@register
This command moves the cursor to the specified line, and then executes the register.
This means that the following command executes the previous command line:
:@:
To execute the previous :@register command, use this command:
:line@@
```

#### 63.1.21.6 Simple Edits

```text
The following sections describe simple edits.

Shifting
The :> command shifts lines to the right.The :< command shifts lines to the left.
The following command, for example, shifts lines 5 through 10 to the right:
:5, 10 >
```

#### 63.1.21.7 Changing Text

```text
The :change command acts just like the :delete command, except that it performs an
:insert as well.

Entering Insert Mode
The :startinsert command starts insert mode as if you were in normal mode and
were to press i.

Joining Lines
The :join command joins a bunch of lines (specified by the range parameter) together
into one line. Spaces are added to separate the lines.
If you do not want the added spaces, use the :join! command.

Yanking Text
The following command yanks the specified lines into the register:
:range yank register
If no register is specified, the unnamed register is used.

Putting Text
The :put command puts the contents of a register after the indicated line.To dump
the contents of register a after line 5, for example, use the following command:
:5put a
If you want to put the text before the line, use this command:
:5put! a

Undo/Redo
The :undo command undoes a change just like the u command does.The :redo
command redoes a change like CTRL-R does.
To mark the beginning of the line, use the
:mark {register}
command. If a line is specified, that line will be marked.The :k command does the
same thing, with the exception that you don’t have to put a space in front of the register
name.The following two commands are equivalent:
:100 mark x
:100 ka
```

### 63.1.22 Miscellaneous Commands

```text
The following sections describe some miscellaneous commands you can use 
```

#### 63.1.22.1 The :preserve Command

```text
The :preserve command writes out the entire file to the “swap” file.This makes it
possible to recover a crashed editing session without the original file. (If you do not
use this command, you need both the swap file and the original to perform recovery.)
See Chapter 14, “File Recovery and Command Line Arguments,” for information on
recovering crashed sessions.
```

#### 63.1.22.2 The Shell Commands

```text
To execute a single shell command, use the following Vim command (where cmd is the
system command to execute):
:!cmd
To find the current date, for instance, use this command:
:!date
The following command repeats the last shell command you executed:
:!!
Finally, the following command suspends Vim and goes to the command prompt:
:shell
You can now enter as many system commands as you want. After you have finished,
you can return to Vim with the exit command.
```

#### 63.1.22.3 Shell Configuration

```text
The following several options control the actual execution of a command.
shell The name of the shell (command processor).
shellcmdflag Flag that comes after the shell.
shellquote The quote characters around the command.
shellxquote The quote characters for the command and the redirection.
shellpipe String to make a pipe.
shellredir String to redirect the output.
shellslash Use forward slashes in filenames (MS-DOS only). 
```

#### 63.1.22.4 Command History

```text
The :history command prints out the current command-mode command history:
:history
# cmd history
2 1 print
3 5
4 7 print
5 . print
> 6 history
The Vim editor maintains a set of histories for various commands. A code identifies
each of these:
Code History Type
c cmd : Command-line history (command-mode
commands)
s search / Search strings (See Chapter 3, “Searching”)
e expr = Expression register history
i input @ Input line history (data typed in response to
an :input operator)
a all All histories
Therefore, to get a list of all the various history buffers, use the :history all command:
:history all
# cmd history
2 1 print
3 5
4 7 print
5 . print
6 history
> 7 history all
# search history
1 human
2 uni
3 comp
4 Seem
> 5 \<At\>
# expr history
1 55
2 2*88
> 3 5+99
# input history
Press Return or enter command to continue
The general form of the :history command is as follows:
:history code first , last

If no first and last are specified, the whole history is listed.The first parameter defaults
to the first entry in the history, and the last defaults to the last. Negative numbers indicate
an offset from the end of the history. For example, –2 indicates the next-to-last
history entry.
The following command, for example, list history entries 1 through 5 for
command-mode commands:
:history c 1,5
And, this next command lists the last 5 search strings:
:history s –5,
```

#### 63.1.22.5 Setting the Number of Remembered Commands

```text
The 'history' option controls how may commands to remember for commandmode
(: mode) commands.To increase the number of commands to remember (to 50,
for instance), use this command:
:set history=50
```

#### 63.1.22.6 Viewing Previous Error Messages

```text
The Vim editor keeps track of the last few error and information messages displayed on
the last line of the screen.To view the message history, use the following command:
:messages
“../joke.txt” 6092 lines, 174700 characters
Entering Ex mode. Type “visual” to go to Normal mode.
search hit BOTTOM, continuing at TOP
Not an editor command: xxxxx
search hit BOTTOM, continuing at TOP
search hit BOTTOM, continuing at TOP
Pattern not found: badbad
Not an editor command: :^H
Invalid address
```

#### 63.1.22.7 Redirecting the Output

```text
The following command causes all output messages to be copied to the file as well as
to appear on the screen:
:redir > file
To end the copying, execute the following command:
:redir END
This command proves useful for saving debugging information or messages for inclusion
in a book.
```

#### 63.1.22.8 Executing a :normal Command

```text
The :normal command executes a normal-mode command.The following command,
for instance, changes the word where the cursor is located to the word DONE:
:normal cwDONE<Esc>
The group of commands is treated as one for the purposes of undo/redo.
The command should be a complete command. If you leave Vim hanging (suppose
that you executed a command cwDone, for instance), the display will not update until
the command is complete.
If you specify the '!' option, mappings will not be done on the command.
```

### 63.1.23 Getting Out

```text
The following command writes the current file and closes the window:
:exit
When the last window is closed, the editor stops.
If the override flag (!) is given, an attempt will be made to write the file even if it
is marked read-only.
You can also specify a filename on the command line.The data will be written to
this file before exiting.The following command, for example, saves the current file in
save-it-it.txt and exits.
:exit save-it.txt
If you want to save only a portion of the file, you can specify a range of lines to
write.To save only the first 100 lines of a file and exit, for example, use this command:
:1,100 exit save-it.txt

Write and Quit
The following command does the same thing that :exit does, except it always writes
the file:
:range wq! file
The :exit command writes only if the file has been changed.
```

### 63.1.24 Expressions and Functions

```text
THE VIM EDITOR CONTAINS A RICH script language.This command language gives you
tremendous flexibility when it comes to customizing your editor for specialized tasks.
This chapter covers the following:
n Basic variables and expressions
n The :echo statement
n Control statements
n User-defined functions
n A complete list of built-in functions
```

#### 63.1.24.1 Basic Variables and Expressions

```text
The Vim editor enables you to define, set, and use your own variables.To assign a
value to a variable, use the :let command.The general form of this command is as
follows:
:let {variable} = {expression}
The Vim editor uses the same style variable names as most other languages—that is, a
variable begins with a letter or underscore and then consists of a series of letters, digits,
and the underscore.
To define the variable line_size, for example, use this command:
:let line_size = 30
To find out what the variable is, use the :echo command:
:echo “line_size is” line_size
When entered, this command results in Vim displaying the following on the last line:
line_size is 30
Variables can contain numbers (such as 30) or strings (such as “foo”). For example:
:let my_name = “Steve Oualline”
```

#### 63.1.24.2 Special Variable Names

```text
The Vim editor uses special prefixes to denote different types of variables.The prefixes
are as follows:
Name Use
All uppercase, digits, and Variable which can be stored in the viminfo file.
underscore if the ‘viminfo‘ option contains the “!” flag
Initial uppercase letter Variable saved by the make session (:mksession)
command.
Lowercase letter somewhere
inside
:let Save_this_option = 1 “ Options saved in session
:let forget_this = “yes” “ Discarded between sessions
All lowercase, digits, and A variable not stored in any save file.
underscore
$environment Environment variable.
@register Text register.
&option The name of an option.
b:name The variable is local to the buffer. Each buffer can
have a different value of this variable.
w:name A variable local to a window.
g:name A global variable. (Used inside functions to denote
global variables.)
a:name An argument to a function.
v:name A Vim internal variable.

Some examples:
“ The environment variable $PAGER contains the name of the page viewing command
:let $PAGER = “/usr/local/bin/less”
“ Display the value of the last search pattern
:echo “Last search was “@/
“ The following two commands do the same thing
:let &autoindent = 1
:set autoindent
“ Define the syntax for the current buffer
:let b:current_syntax = c
“Note: This doesn’t handle all the side effects associated with “changing the
language of the buffer
The internal variables (v:name) are used by Vim to store a variety of information.The
following table shows the full list of variables.
Variable Functions
v:count The count given for the last normal-mode command.
v:count1 Like v:count, except that it defaults to 1 if no count is
specified.
v:errmsg The last error message.
v:warningmsg The last warning message.
v:statusmsg The last status message.
v:shell_error Result of the last shell command. If 0, the command worked;
if non-0, the command failed.
v:this_session Full filename of the last loaded or saved session file.
v:version Version number of Vim.Version 5.01 is stored as 501.

Constants
The Vim editor uses a variety of constants.There are the normal integers:
123 “ Simple integer
0123 “ Octal integer
0xAC “ Hexadecimal
There are also string constants:
“string” “ A simple string
‘string’ “ A literal string
The difference between a simple string and a literal string is that in a simple string,
characters escaped by backslash are expanded, whereas in a literal string a backslash is
just a backslash. For example:
:echo “>\100<”
>@<
:echo ‘>\100<’
>\100<
Note
The character number octal 100 is @.
```

#### 63.1.24.3 Expressions

```text
You can perform a variety of operations on integers.These include the arithmetic
operators:
int + int Addition
int – int Subtraction
int * int Multiplication
int / int Integer divide (and truncate)
int % int Modulo
– int Negation
Note
Strings are automatically converted to integers when used in conjunction with these operators.
In addition, a number of logical operators work on both strings and integers.These
return a 1 if the comparison succeeds and 0 if it does not.
var == var Check for equality.
var != var Inequality.
var < var Less than.
var <= var Less than or equal to.
var > var Greater than.
var >= var Greater than or equal to.
In addition, the comparison operators compare a string against a regular expression.
For example, the following checks the given string (“word”) against the regular expression
“\w*” and returns a 1 if the string matches the expression:
“word” =~ “\w*”
The two regular expression comparison operators are as follows:
string =~ regexp Regular expression matches.
string !~ regexp Regular expression does not match.
In addition, strings have the following special comparisons:
string ==? string Strings equal, ignore case.
string ==# string Strings equal, case must match.
string !=? string Strings not equal, ignore case.
string !=# string Strings not equal, case must match.
string <? string Strings less than, ignore case.
string <# string Strings less than, case must match.
string <=? string Strings less than or equal, ignore case.
string <=# string Strings less than or equal, case must match.
string >? string Strings greater than, ignore case.
string ># string Strings greater than, case must match.
string >=? string Strings greater than or equal, ignore case.
string >=# string Strings greater than or equal, case must match.
There are three forms of each operator.The bare form (i.e. ==) honors the
‘ignorecase’ option.The “?” form (i.e.==?) always ignores case differences while
the “#” form (i.e.==#) never ignores different case characters.

Deleting a Variable
The following command deletes a variable:
:unlet[!] {name}
Generally, if you try to delete a variable that does not exist, an error result. If the override
(!) character is present, no error message results.
```

#### 63.1.24.4 Entering Filenames

```text
When you are entering a filename, you can use a number of special words and characters,
as follows:
% Current filename
# Alternate filename
<cword> The word under the cursor.
<cWORD> The WORD under the cursor.
<cfile> The filename under the cursor.
<afile> The name of a file being read or written during the execution of a
related autocommand. (See Chapter 13,“Autocommands,” for more
information.)
<abuf> The current buffer number in an autocommand.
<amatch> Like <abuf>, but when used with a FileType or Syntax event it is
not the file name, but the file type or syntax name.
<sfile> The name of the file currently being :sourced.
You can modify each of these words by one or more of the modifiers listed here (for
example, the :p modifier, which turns a filename into a full pathname). If the name of
the file under the cursor is test.c, for instance, <cfile> would be test.c. On the
other hand, <cfile:p> would be /home/oualline/examples/test.c.
You can use the following modifiers:
:p Turn a filename into a full path. Must appear first if multiple
modifiers are used.
:~ Turn an absolute path such as /home/oualline/examples/test.c
into a short version using the ~ notation, such as
~oualline/examples/test.c.
:. Turn the path into one relative to the current directory, if
possible.
:h Head of the filename. For example, ../path/test.c yields
../path.
:t Tail of the filename.Therefore, ../path/test.c yields test.c.
:r Filename without extension.Therefore, ../path/test.c yields
test.
:e Extension.
:s?from?to? Substitution changing the pattern from to the pattern to, first
occurrence.
:gs?from?to? Substitution changing the pattern from to the pattern to, all
occurrences.
```

#### 63.1.24.5 How to Experiment

```text
You can determine how Vim will apply modifiers to a filename. First create a text file
whose content is the filename on which you want to run experiments. Put the cursor
on this filename and then use the following command to test out a modifier:
:echo expand(“<cword>:p”)
(Change :p to whatever modifier you want to check.)
The following sections discuss the :echo statement and expand function in more
detail.
```

#### 63.1.24.6 The :echo Statement

```text
The :echo statement just echoes its arguments. For example:
:echo “Hello world”
Hello world
You can also use it to display the value of a variable:
:let flag=1
:echo flag
1
The :echon command echoes the arguments, but does not output a newline. For
example:
:echo “aa” | echo “bb”
aa
bb
:echon “aa” | echon “bb”
aabb
Note
The bar (|) is used to separate two commands on the same line.
Echoing in Color
You can use the :echohl command to change the color of the output :echo to a
given highlight group. For example:
:echohl ErrorMsg
:echo “A mistake has been made”
:echohl None
Note
Good programming practice dictates that you always reset the highlighting to None after your message.
That way you do not affect other :echo commands.
If you want to see what highlight groups are defined, use this command:
:highlight
```

#### 63.1.24.7 Control Statements

```text
The Vim editor has a variety of control statements that enable you to change the flow
of a macro or function.With these, you can make full use of Vim’s sophisticated script
language.
```

#### 63.1.24.7.1 The :if Statement

```text
The general form of the :if statement is as follows:
:if {condition}
: “ Statement
: “ Statement
:endif
The statements inside the :if statement are executed if the condition is non-zero.The
four-space indent inside the :if is optional, but encouraged because it makes the program
much more readable.
The :if statement can have an else clause:
:if {condition}
: “ Statement
: “ Statement
:else
: “ Statement
: “ Statement
:endif
Finally, the :elseif keyword is a combination of :if and :else. Using it removes the
need for an extra :endif:
:if &term == “xterm”
: “ Do xterm stuff
:elseif &term == “vt100”
: “ Do vt100 stuff
:else
: “ Do non xterm and vt100 stuff
:endif
```

#### 63.1.24.7.2 Looping

```text
The :while command starts a loop.The loop ends with the :endwhile command:
:while counter < 30
: let counter = counter + 1
: “ Do something
:endwhile
The :continue command goes to the top of the loop and continues execution.The
:break command exits the loop:
:while counter <: 30
: if skip_flag
: continue
: endif
: if exit_flag
: break
: endif
: “Do something
:endwhile
```

#### 63.1.24.7.3 The :execute Command

```text
The :execute executes the argument as a normal command-mode command:
:let command = “echo ‘Hello world!’”
:execute command
Hello World
```

#### 63.1.24.8 Defining Your Own Function

```text
The Vim editor enables you to define your own functions.The basic function declaration
begins as follows:
:function {name}({var1}, {var2}, ...)
Note
Function names must begin with a capital letter.
It ends as follows:
:endfunction
Let’s define a short function to return the smaller of two numbers, starting with this
declaration:
:function Min(num1, num2)
This tells Vim that the function is named Min and it takes two arguments (num1 and
num2).
The first thing you need to do is to check to see which number is smaller:
: if a:num1 < a:num2
The special prefix a: tells Vim that the variable is a function argument. Let’s assign the
variable smaller the value of the smallest number:
: if a:num1 < a:num2
: let smaller = a:num1
: else
: let smaller = a:num2
: endif
The variable smaller is a local variable. All variables used inside a function are local
unless prefixed by a g:.
Warning
A variable outside a function declaration is called var; whereas inside if you want to refer to the same
variable, you need to call it g:var. Therefore, one variable has two different names depending on the
context.
You now use the :return statement to return the smallest number to the user. Finally,
you end the function:
: return smaller
:endfunction
The complete function definition is as follows:
:function Min(num1, num2)
: if a:num1 < a:num2
: let smaller = a:num1
: else
: let smaller = a:num2
: endif
: return smaller
:endfunction
Note
I know that this function can be written more efficiently, but it is designed to be a tutorial of features,
not efficiency.
```

#### 63.1.24.8.1 Using a Function

```text
You can now use your function in any Vim expression. For example:
:let tiny = Min(10, 20)
You can also call a function explicitly using the function name with the :call
command:
:[range] call {function}([parameters])
If a [range] is specified, the function is called for each line, unless the function is a special
“range”-type function (as discussed later).
Function Options
If you attempt to define a function that already exists, you will get an error.You can
use the force option (!) to cause the function to silently replace any previous definition
of the function:
:function Max(num1, num2)
: “ Code
:endfunction
:function Max(num1, num2, num3)
— error —
:function! Max(num1, num2, num3)
— no error —

By putting the range keyword after the function definition, the function is considered
a range function. For example:
:function Count_words() range
When run on a range of lines, the variables a:firstline and a:lastline are set to
the first and last line in the range.
If the word abort follows the function definition, the function aborts on the first
error. For example:
:function Do_It() abort
Finally, Vim enables you to define functions that have a variable number of arguments.
The following command, for instance, defines a function that must have 1 argument
(start) and can have up to 20 additional arguments:
:function Show(start, ...)
The variable a:1 contains the first optional argument, a:2 the second, and so on.The
variable a:0 contains the number of extra arguments. For example:
:function Show(start, ...)
: let index = 1 “ Loop index
: echo “Show is” a:start
:
: while (index <= a:0)
: echo “Arg” index “is “ a:index
: let index = index + 1
: endwhile
:endfunction
```

#### 63.1.24.8.2 Listing Functions

```text
The :function command lists all the user-defined functions:
:function
function FTCheck_nroff()
function FTCheck_asm()
To see what is in a single function, execute this command:
:function {name}
For example:
:function Show
function Show
let index = 1 “ Loop index
echo “Show is” a:start
while (index <= a:0)
echo “Arg” index “is “a:.index
let index = index + 1
endwhile
endfunction
```

#### 63.1.24.8.3 Deleting a Function

```text
To delete a function, use this command:
:delfunction name

Note: There's more information re. VIM programming in the OPL book and more Addendum for lists of commands etc.
Plus, there's a handy quick reference that can be printed.

			63.1.24.9

		63.1.25
```
