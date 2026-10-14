---
type: reference
title: FAQ
description: "Legacy vim KB section: FAQ (How to delete, as in close buffers?, :h filename-modifiers, How to echo or print filename with modifies)"
tags: [faq, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#64"
---

# FAQ

[↑ KB_vi](/vi/kb-vi/README.md)

## 64.1 How to delete, as in close buffers?

```text
:1,nbd
1,n range
bd - buffer delete
```

## 64.2 command line file name modifiers , %: operator

### 64.2.1 :h filename-modifiers

```text
 *filename-modifiers*

	 *:_%:* *::8* *::p* *::.* *::~* *::h* *::t* *::r* *::e* *::s* *::gs*

	        *%:8* *%:p* *%:.* *%:~* *%:h* *%:t* *%:r* *%:e* *%:s* *%:gs*
The file name modifiers can be used after "%", "#", "#n", "<cfile>", "<sfile>",
"<afile>" or "<abuf>".  They are also used with the |fnamemodify()| function.
These are not available when Vim has been compiled without the |+modify_fname|
feature.
These modifiers can be given, in this order:
	:p	Make file name a full path.  Must be the first modifier.  Also
		changes "~/" (and "~user/" for Unix and VMS) to the path for
		the home directory.  If the name is a directory a path
		separator is added at the end.  For a file name that does not
		exist and does not have an absolute path the result is
		unpredictable.
	:8	Converts the path to 8.3 short format (currently only on
		win32).  Will act on as much of a path that is an existing
		path.
	:~	Reduce file name to be relative to the home directory, if
		possible.  File name is unmodified if it is not below the home
		directory.
	:.	Reduce file name to be relative to current directory, if
		possible.  File name is unmodified if it is not below the
		current directory.
		For maximum shortness, use ":~:.".
	:h	Head of the file name (the last component and any separators
		removed).  Cannot be used with :e, :r or :t.
		Can be repeated to remove several components at the end.
		When the file name ends in a path separator, only the path
		separator is removed.  Thus ":p:h" on a directory name results
		on the directory name itself (without trailing slash).
		When the file name is an absolute path (starts with "/" for
		Unix; "x:\" for MS-DOS, WIN32, OS/2; "drive:" for Amiga), that
		part is not removed.  When there is no head (path is relative
		to current directory) the result is empty.
	:t	Tail of the file name (last component of the name).  Must
		precede any :r or :e.
	:r	Root of the file name (the last extension removed).  When
		there is only an extension (file name that starts with '.',
		e.g., ".vimrc"), it is not removed.  Can be repeated to remove
		several extensions (last one first).
	:e	Extension of the file name.  Only makes sense when used alone.
		When there is no extension the result is empty.
		When there is only an extension (file name that starts with
		'.'), the result is empty.  Can be repeated to include more
		extensions.  If there are not enough extensions (but at least
		one) as much as possible are included.
	:s?pat?sub?
		Substitute the first occurrence of "pat" with "sub".  This
		works like the |:s| command.  "pat" is a regular expression.
		Any character can be used for '?', but it must not occur in
		"pat" or "sub".
		After this, the previous modifiers can be used again.  For
		example ":p", to make a full path after the substitution.
	:gs?pat?sub?
		Substitute all occurrences of "pat" with "sub".  Otherwise
		this works like ":s".

Examples, when the file name is "src/version.c", current dir
"/home/mool/vim":
  :p			/home/mool/vim/src/version.c
  :p:.				       src/version.c
  :p:~				 ~/vim/src/version.c
  :h				       src
  :p:h			/home/mool/vim/src
  :p:h:h		/home/mool/vim
  :t					   version.c
  :p:t					   version.c
  :r				       src/version
  :p:r			/home/mool/vim/src/version
  :t:r					   version
  :e						   c
  :s?version?main?		       src/main.c
  :s?version?main?:p	/home/mool/vim/src/main.c
  :p:gs?/?\\?		\home\mool\vim\src\version.c

Examples, when the file name is "src/version.c.gz":
  :p			/home/mool/vim/src/version.c.gz
  :e						     gz
  :e:e						   c.gz
  :e:e:e					   c.gz
  :e:e:r					   c
  :r				       src/version.c
  :r:e						   c
  :r:r				       src/version
  :r:r:r			       src/version
 

					*extension-removal* *:_%<*
If a "<" is appended to "%", "#", "#n" or "CTRL-V p" the extension of the file
name is removed (everything after and including the last '.' in the file
name).  This is included for backwards compatibility with version 3.0, the
":r" form is preferred.  Examples:

	%		current file name
	%<		current file name without extension
	#		alternate file name for current window
	#<		idem, without extension
	#31		alternate file number 31
	#31<		idem, without extension
	<cword>		word under the cursor
	<cWORD>		WORD under the cursor (see |WORD|)
	<cfile>		path name under the cursor
	<cfile><	idem, without extension

Note: Where a file name is expected wildcards expansion is done.  On Unix the
shell is used for this, unless it can be done internally (for speed).
Backticks also work, like in
	:n `echo *.c`
(backtick expansion is not possible in |restricted-mode|)
But expansion is only done if there are any wildcards before expanding the
'%', '#', etc..  This avoids expanding wildcards inside a file name.  If you
want to expand the result of <cfile>, add a wildcard character to it.
Examples: (alternate file name is "?readme?")
	command		expands to  
	:e #		:e ?readme?
	:e `ls #`	:e {files matching "?readme?"}
	:e #.*		:e {files matching "?readme?.*"}
	:cd <cfile>	:cd {file name under cursor}
	:cd <cfile>*	:cd {file name under cursor plus "*" and then expanded}

When the expanded argument contains a "!" and it is used for a shell command
(":!cmd", ":r !cmd" or ":w !cmd"), the "!" is escaped with a backslash to
avoid it being expanded into a previously used command.  When the 'shell'
option contains "sh", this is done twice, to avoid the shell trying to expand
the "!".


							*filename-backslash*
For filesystems that use a backslash as directory separator (MS-DOS, Windows,
OS/2), it's a bit difficult to recognize a backslash that is used to escape
the special meaning of the next character.  The general rule is: If the
backslash is followed by a normal file name character, it does not have a
special meaning.  Therefore "\file\foo" is a valid file name, you don't have
to type the backslash twice.

An exception is the '$' sign.  It is a valid character in a file name.  But
to avoid a file name like "$home" to be interpreted as an environment variable,
it needs to be preceded by a backslash.  Therefore you need to use "/\$home"
for the file "$home" in the root directory.  A few examples:

	FILE NAME	INTERPRETED AS	
	$home		expanded to value of environment var $home
	\$home		file "$home" in current directory
	/\$home		file "$home" in root directory
	\\$home		file "\\", followed by expanded $home
```

### 64.2.2 How to echo or print filename with modifies

```text
Register % contains the name of the current file, and register # contains the name of the alternate file. These registers allow the name of the current or alternate files to be displayed or inserted. The name, or full path, or directory containing the file can be used.

For example, in directory /abc the command vim def/my.txt would edit file /abc/def/my.txt. The following commands could be entered to display the information shown.

:echo @% 	def/my.txt	directory/name of file (relative to the current working directory of /abc)
:echo expand('%:t') 	my.txt	name of file ('tail')
:echo expand('%:p') 	/abc/def/my.txt	full path
:echo expand('%:p:h')	/abc/def	directory containing file ('head')
:echo expand('%:p:h:t')	def	First get the full path with :p (/abc/def/my.txt), then get the head of that with :h (/abc/def), then get the tail of that with :t (def)
For more info run :help expand

If all that is wanted is to display the name of the current file, type Ctrl-G (or press 1 then Ctrl-G for the full path).

When using @%, the name is displayed relative to the current directory.

In insert mode, type Ctrl-R then % to insert the name of the current file.

In command mode (after typing a colon), type Ctrl-R then % to insert the name of the current file. The inserted name can then be edited to create a similar name.

In normal mode, type "%p to put the name of the current file after the cursor (or "%P to insert the name before the cursor).

The following commands insert lines consisting of the full path of the current and alternate files into the buffer:

:put =expand('%:p')
:put =expand('#:p')
		64.2.3
```

## 64.3 Make-compile current buffer

```text
Compile with gccEdit
If you use
set makeprg=gcc\ -o\ %<\ %
in your vimrc, and your actual file is file.c, then :make will compile file.c with the output file. (gcc file.c -o file).
If you use GNU make the above change is not required. Instead, simply use the following command to compile the current file (you need to save it first):

:make %:r
When using other compilers, like Sun cc, you can adapt the tip to suit your compiler.

my example:
amenu &MyMenu.SetAcsMake            :set makeprg=makec\ %< <cr>
amenu &MyMenu.SetSingleFileMake            :set makeprg=g++\ -g\ -O2\ -fPIC\ -o\ %.o\ -c\ % <cr>
amenu &MyMenu.SetDefaultMakeCurrDirFromRoot            :cd %:p:h <CR> :set makeprg=makec  <cr> : cd - <cr>
```

## 64.4 E464: Ambiguous use of user-defined command

```text
> Hello, 
> Using the standard windows _vimrc and typing 
> :V 
> generates the message 
> E464: Ambiguous use of user-defined command 
> 
> Typing 
> :h :V 
> only gives netrw command :Vexplore 
> 
> In the list in index.txt, I found no other command starting with :V 
> 
> Why this E464 error? 

In the command line, type :V followed by a Tab. This lists all commands 
that start with :V 
(You probably also have :VimballList and :Vimuntar) 

You can then use :verbose :com <command-name> to find out, where this 
command was defined. 
```

## 64.5 Setting a Language for vim Syntax Highlighting

```text
One can force the language for vim syntax highlighting with

:setf  language
Examples

For C:

:setf c
For PHP:

:setf php
For XML:

:setf xml
Update: An Alternative

In the comments below, Vladimir wrote:

Another way is :set filetype=language

Simple executing :set filetype will show current language used for syntax highlighting.	
```

## 64.6 Changing case with regular expressions

```text
There are times that you might like to go through a file and change the case of characters that match some arbitrary criteria. If you understand regular expressions well, you can actually do this fairly easily.

It's as simple as placing \U or \L in front of backreferences which you want to change the case of, and \E at the end. Vim will make the text in the backreference uppercase or lowercase (respectively). Use \u and \l (without the \E at the end) to just change the case of the very first character in the backreference.

(A "backreference" is a part of a regular expression that refers to a previous part of a regular expression. The most common backreferences are &, \1, \2, \3, ... , \9).

Some examples that demonstrate the power of this technique:

Lowercase the entire file

:%s/.*/\L&/g
(& is a handy backreference that refers to the complete text of the match.)

Uppercase all words that are preceded by a < (i.e. opening HTML tag names):

:%s/<\(\w*\)/<\U\1/g
ReferencesEdit
:help sub-replace-special
CommentsEdit
Note also the gu<motion> and gU<motion> commands.

For example, ggguG will lowercase the entire file. (gg = go to top, gu = lowercase, G = go to EOF).

By using the \0 general backref instead of the name ones (\1, \2 etc) you can save some typing for on replace stanza of the regex.

This regex upper cases an explicit set of words to uppercase in a file.
:%s/\(select\)\|\(order)\|\(by\)\|\(from\)\|\(where\)/\U\0/g

Not rocket science, but otherwise you'd have to do this:
:%s/\(select\)\|\(order)\|\(by\)\|\(from\)\|\(where\)/\U\1\U\2\U\3\U\4\U\5/g

[edit:  Much easier to just use this, where either 0 or 1 will work:]
:%s/\(select\|order\|by\|from\|where\)/\U\1/g
convert HTML-Tags to uppercase

:%s/<\/\=\(\w\+\)\>/\U&/g
or to lowercase

:%s/<\/\=\(\w\+\)\>/\L&/g
```

## 64.7 Copy the full path of current buffer to clipboard

```text
You can assign to the clipboard with the special + register:

:let @+ = expand('%:p')
If you want to make this easier, you could create a command, so you only have to type :CopyBuffer:

:command! CopyBuffer let @+ = expand('%:p')
and/or map it to a key:

:nnoremap <Leader>c :let @+=expand('%:p')<CR>

	64.8 Why does vim always say 'Already at oldest change' when I try to undo?
```

### 64.8.1 Negative undolevels

```text
This happens when undolevels is negative which is apparently used to keep vim undo from using up memory. For some reason my undolevels was set to -123456.

Set your undolevels to a big positive number like 999999 and everything will return to normal.

You may also want to check your .vim file trees and such, if you're using plugins and states that do this, to persist settings on a per file basis, that they don't have 'setlocal' undolevel settings inside them. I had to clear out several dozen such nefarious configurations.

-> Fix:
set undolevels=9999

-> echo value
set undolevels
```

## 64.9 yank current buffer file name and path

```text
To clipboard:
:let @" = expand("%")
this will copy the file name to the unamed register, then you can use good old 'p' to paste it. and of course you can map this to a key for quicker use.

:nmap cp :let @" = expand("%")
you can also use this for full path

:let @" = expand("%:p")

replace " w/ a-z for named registers.
e.g. 
let @a=@% 
or to guarantee full path
:let @a = expand("%:p")
```

## 64.10 remove new line at the end of file

```text
Run these following commands in VIM:

:set binary
:set noeol
:wq
Please NOTE that the above commands are VIM commands and not shell commands.

Basically, we set the file as a binary file, then we command VIM not to have EOL (End Of Line) and then write and quit the file.

This will change only for the particular file that you open explicitly. If you want to have these changes set for all the file you edit with VIM then you need to add the following lines to your ~/.vimrc file:

set binary
set noeol


Read more https://www.explorelinux.com/vim-removing-new-line-end-file-vimRun these following commands in VIM:

:set binary
:set noeol
:wq
Please NOTE that the above commands are VIM commands and not shell commands.

Basically, we set the file as a binary file, then we command VIM not to have EOL (End Of Line) and then write and quit the file.

This will change only for the particular file that you open explicitly. If you want to have these changes set for all the file you edit with VIM then you need to add the following lines to your ~/.vimrc file:

set binary
set noeol


Read more https://www.explorelinux.com/vim-removing-new-line-end-file-vim//
```

## 64.11 vim buftype option is set (can't save file)

```text
    to fix
    : set bt=
```
