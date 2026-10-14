---
type: reference
title: "Tips from vim_use@googlegroups.com"
description: Section 52 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#52"
---

# Tips from vim_use@googlegroups.com

[↑ KB_vi](/vi/kb-vi/README.md)

## 52.1 Fast Buffer Switching

```text
> 2008/11/3, Dean <dean.keough@lac-bac.gc.ca>:
> > A nice way to jump between 3 buffers is to set uppercase marks. Go to
> > each file in turn and set the marks: mA, mB, mC. Then 'A or 'B or 'C
> > to jump between the files instantly.
> >
> > Of course you can set marks for as many files as you like and you can
> > use any uppercase letter or a digit in the mark. Something mnemonic
> > would be helpful. (Lowercase marks don't jump between files.)
> >
> > :help marks
>
> Yes, but the problem with marks is that you are forced always to
> redefine marks a bit - otherwise you are dropped to the exact place in
> the file, where do you made the mark.
>
> So it isn't what you can IMO use for quick switches between files
> (since your area of interests will be moved in those files, but marks
		> will alway drop you at the same place).
>
> Or are there some '<letter>, `<letter> analog to jump to the line of
> buffer, which you are in this buffer if you use :buffer
> <bufNameOrNumber> command ?

the fastest, easiest buffer switching I know is to map:

nmap <silent> <F6> :silent bnext<CR>
nmap <silent> <S-F6> :silent bprev<CR>

then use F6 or S-F6 to move around.  I use these so much they are a
permanent feature of my .vimrc



'
```

## 52.2 quickfix list and location-list

```text
:h quickfix.txt
:h location-list
```

### 52.2.1 What generates a quickfix?

```text
Commands such as compilation or grep.
For example:
:vim[grep][!] /{pattern}/[g][j] {file} ...
vimgrep /logs/ %

or
:make

(For make costumization see :h makeprg
 Also refer to my costumization for ACS 5.0 source code structure:
"Compile and build command for systems that use GNU make
set makeprg=makec\ %<

and 
$ cat `which makec`
#!/usr/bin/bash
CUR_PATH=`echo $1 |  sed -e 's_/src.*__'`
shift
echo "Changing dir to ${CUR_PATH}"
cd ${CUR_PATH}

make $@

)

"
```

### 52.2.2 How to open the quickfix?

```text
:copen
```

### 52.2.3 How to navigate to next/previous match?

```text
:cc, first match
:cn, next match
:cp, previous match

Note that count is acceptes so :3cn with go the third next match
```

### 52.2.4 Location-list

```text
A location list is similar to a quickfix list and contains a list of positions
in files.  A location list is associated with a window and each window can
have a separate location list.  A location list can be associated with only
one window.  The location list is independent of the quickfix list.

When a window with a location list is split, the new window gets a copy of the
location list.  When there are no references to a location list, the location
list is destroyed.

The following quickfix commands can be used.  The location list commands are
similar to the quickfix commands, replacing the 'c' prefix in the quickfix
command with 'l'.

Example:
lvimgrep /logs/ %
:lopen
:lc, first match
:ln, next match
:lp, previous match
```

### 52.2.5 How to jump to error or message from quickfix or location list

```text
press enter when on appropriate line
```

### 52.2.6 How to add/append to quickfix

```text
for grep there is grepadd
see :h grepadd
```

### 52.2.7 Store CTAGS matches into location list

```text
:h ltag

ltag <tag name>
then
Basically the quickfix commands all start with :c and are global; the
location list commands all start with :l and are local to a window
(well, 'connected' to a certain window anyway). So you have :lnext,
	:lprev, :lopen, etc.
```

## 52.3 colorscheme dependent on filetype

```text
Example:
autocmd WinEnter,FileType  vim,tex,*    colorscheme wombat
autocmd WinEnter,FileType  perl,sh      colorscheme desert
```

## 52.4 rediraction of output, redir

```text
:h redir

Examples:
-> redirect cscope output
:redir > result.txt
:cs find s cout
:redir END

-> redirect VIM settings report
:redir > result.txt
:set all
:redir END
```

## 52.5 sorting words

### 52.5.1 description

```text
suppose I have a few line that goes like this:
str_list="foo bar   man act"

how can I sort all the words within the quote ¿ ... " so that it
becomes "act bar foo man"? It is okay to eliminate extra whitespace so
that it ends up with only one space behind each word.
```

### 52.5.2 Solution using visualize

```text
This is a common pattern of "decorate, sort, undecorate".  In
this case the decoration is putting each word on its own line.
If it's long, you can readily do this with

a) issue

  :s/\(\<\w\+\)\s*/\1\r/g

this should yield

  str_list
  ="foo
  bar
  man
  act
  "

which you can hand-tweak to add one extra newline before "foo",
yielding

  str_list
  ="
  foo
  bar
  man
  act
  "

The aim in the first step is just to get each word on its own
line.  If your string is short, it may be faster to do it by
hand.  But if it's 20+ words in the string, using the regexp can
be faster.

b) highlight the range of words in the string and use

  :'<,'>sort

to sort them

c) highlight the whole shebang and press J to rejoin them.

d) Clean up the extra space at the beginning and end of your
string (and optionally around the "=")

---------------

After typing the above, an alternative method (assuming you have
Vim7.0+) occurred to me, so you might also try

before sort: "ccc aaa bbb eee "
before sort: "aaa bbb ccc eee"

  vi"       visualize-inner-quotation
  c         change
  ^R=       control+r = (expression register)
  join(sort(split(@")), ' ')
            the expression to split the deleted content
            on whitespace, sort it, and join it back
            together with a single space
  <enter>   accept the expression
  <esc>     leave insert-mode

If it's something you do frequently, it's easily mappable:

  :nnoremap <f4> vi"c<c-r>=join(sort(split(@")), ' ')<cr><esc>
  :vnoremap <f4> c<c-r>=join(sort(split(@")), ' ')<cr><esc>


Just a couple ideas -- use whichever works better for your needs
(or whichever you remember).
```

### 52.5.3 Using global

```text
How about:

:g/str_list/let items = sort(copy(split(matchlist(getline('.'),
'"\([^"]*\)"')[1], ' \+'))) | s/"\zs[^"]*\ze"/\=join(items, ' ')

The above should be one line

:g/str_list/     " for all lines containing str_list
let items =      " Assign to variable 'items'
sort(            " Sort the list
copy(            " Work on a copy of the list (:help sort())
split(           " Split a string into parts (using delimiter ' \+')
matchlist(       " Get a list of matches of a regular expression
getline('.')     " Use the current line as the search fodder
'"\([^"]*\)"'    " Search for a string of non-" characters inside double quotes
)[1]             " Take the first match (everything inside the " ")
, ' \+')         " See the split comment above
))               " End of sort/copy
|                " THEN:
s/               " Substitute on the current line
"\zs[^"]\ze"     " Match everything between the double quotes
\=               " Expression replace
join(items, ' ') " Replace with a string comprising the sorted items
```

### 52.5.4 Sort operator

```text
To sort words within double quoted texts, try:

:%s/"\zs[^"]*\ze"/\=join(sort(split(submatch(0))))/g
```

## 52.6 Search for visually selected text

```text
a. Select the text using characterwise or linewise VISUAL (v or V), not
SELECT (i.e. not shift-cursor).
b. Yank it to the unnamed register using y
Or yank to clipboard using "+y
or yank to a named register using "ay (to copy to register a for example)
c. Start your command-line
       /
d. Insert the unnamed register
       Ctrl-R " (control-R then double-quote with no intervening space) -- see
":help c_CTRL-R"
Or from clipboard using Ctrl-R "+
Or from named register using Ctrl-R "a

e. If there are "special" characters in the just-pasted text (backslash,
forward slash, period, circumflex, dollar, opening bracket, asterisk),
backslash-escape them by editing the command-line -- see ":help
pattern-overview".
f. You may or may not want to insert \< (start word) and/or \> (end
word) at the ends of your search pattern. If you do, do it now, by
command-line editing.
g. Check your search command-line, then hit Enter. Voilà!
```

## 52.7 How to list all occurrence of a identifier

```text
Q:
I am using vim writing C/C++ and I want to (as one usually can in
		other IDE) have vim listed all occurrence of identifier.  For example,
there is a method foo() in a class C, I want to get know where the
	foo() is called in the whole project (current directory and its
			subdirectories).  It seems, in this case, a ctag tags file does not
	help since it can only list where the identifier is defined/declared.
```

### 52.7.1 Using vimgrep

```text
       :vimgrep /\<foo\>/g ./**/*.[ch] ./**/*.cpp

or much faster
       :noautocmd vimgrep /\<foo\>/g ./**/*.[ch] ./**/*.cpp

search in context files
noautocmd vimgrep /090831-013608/g ./**/context* 

will find every occurrence of foo (as a word) in files *.c *.h and *.cpp
in the current directory or below up to 30 levels down. The results
appear as a quickfix list, so the usual commands apply:

- to see the matches (editing the files they're in)
       :cfirst
       :cnext
       :cprev
       :clast
       :cnfile
       :cpfile
- to see one line per match in the quickfix window
       :copen
       :cclose

Of course you can map those you use most to keys, for instance my vimrc
includes

       map     <F2>    :cnext<CR>
       map     <S-F2>  :cprev<CR>

Note: Since :vimgrep does a "dumb" search using a Vim search pattern, it
will list _all_ occurrences of the word, also as part of a string or
comment.
```

### 52.7.2 Using cscope, find where function/method is called

```text
cscope can be useful for this.  Install cscope, then build a cscope DB
(cscope.out) from your source files. Connect to the cscope DB in Vim
with  :cs add cscope.out  (you can put it in your ~/.vimrc) then you can
start using cscope in Vim. For example, to find all locations where foo()
is called, you can do:

 :cs find c foo

Then use quickfix commands to navigates through all matches
(:cn  or :copen for example)  assuming you have set up cscopequickfix
as in my ~/.vimrc.  Here is a snippet from my ~/.vimrc
(http://dominique.pelle.free.fr/.vimrc):

==================================
if has('cscope')
 if filereadable(expand("$HOME/cscope.out"))
   cs kill -1
   cs add ~/cscope.out
 endif
 set cscopeverbose
 set cscopequickfix=s-,c-,d-,i-,t-,e-,g-
endif

set tags=tags,~/tags,~/stl-tags
==================================

Note: 
If your cscope.out is in the directory from which VIM is opened then change the test to:

filereadable("cscope.out")

If really you want the directory of the current buffer, perhaps

filereadable(expand("%:p:h/cscope.out"))

cscope answers those questions:

      c: Find functions calling this function
      d: Find functions called by this function
      e: Find this egrep pattern
      f: Find this file
      g: Find this definition
      i: Find files #including this file
      s: Find this C symbol
      t: Find assignments to

Here is a sh script which I use to produce the cscope DB
and ctags (exuberant ctags) file for example:

==================================
#!/bin/sh

TMP_FILE=/tmp/build-tags.$$

find ~/sb/vim7/src \
    \( -name '*.l'   -o \
       -name '*.y'   -o \
       -name '*.c'   -o \
       -name '*.cpp' -o \
       -name '*.h' \)   \
    -print > $TMP_FILE

echo "=== Building ctags..."
ctags -L $TMP_FILE --language-force=c++ \
                  --c++-kinds=+p       \
                  --fields=+iaS        \
                  --extra=+f+q -f ~/tags

echo "=== Building cscope database..."
rm -f cscope.*
cscope -i $TMP_FILE -b -q -f ~/cscope.out

rm -f $TMP_FILE
==================================

It's not perfect, since it can't distinguish between
overloaded c++ functions for example, but still helps
a lot.
```

### 52.7.3 Using GNU ID utils

```text
The fastest way to search across a large number of C files is to use
GNU id-utils.

http://www.gnu.org/software/idutils/idutils.html

With GNU id-utils, it takes few seconds to search across several
thousand source files.

You can use the following Vim plugin with GNU id-utils:

http://vim.sourceforge.net/scripts/script.php?script_id=251
```

#### 52.7.3.1 Basic commands

```text
Tutorial: http://www.delorie.com/gnu/docs/id-utils/id-utils_toc.html
An ID database is a binary file containing a list of file names, a list of tokens, and a sparse matrix indicating which tokens appear in which files.

With this database and some tools to query it (described in this manual), many text-searching tasks become simpler and faster. For example, you can list all files that reference a particular #include file throughout a huge source hierarchy, search for all the memos containing references to a project, or automatically invoke an editor on all files containing references to some function or variable. Anyone with a large software project to maintain, or a large set of text files to organize, can benefit from the ID utilities.

Although the name `ID' is short for `identifier', the ID utilities handle more than just identifiers; they also treat other kinds of tokens, most notably numeric constants, and the contents of certain character strings. Thus, this manual will use the word token as a term that is inclusive of identifiers, numbers and strings.

There are several programs in the ID utilities family:

`mkid'
    scans files for tokens and builds the ID database file.

`lid'
    queries the ID database for tokens, then reports matching file names or matching lines.

`fid'
    lists all tokens recorded in the database for given files, or tokens common to two files.

`fnid'
    matches the file names in the database, rather than the tokens.

`xtokid'
    extracts raw tokens--helps with testing of new `mkid' scanners.

In addition, the ID utilities have historically provided several query programs which are specializations of `lid':

`gid'
    (alias for `lid -R grep') lists all lines containing the requested pattern.

`eid'
    (alias for `lid -R edit') invokes an editor on all files containing the requested pattern, and if possible, initiates a text search for that pattern.

`aid'
    (alias for `lid -ils') treats the requested pattern as a case-insensitive literal substring. 
```

## 52.8 How to determine current font in use

```text
-> :set guifont?

-> In GVim, just type :set guifont
In Vim, I don't think there's a way to determine it, since it's
defined by the terminal itself.
```

## 52.9 Go to nth character (byte) from current position

```text
For example, go to 1000 character from start:
:1000go
```

## 52.10 VIM and bash

```text
You can explicitly set the 'shell' option to /bin/bash or another path as needed.  Vim gets it's
default from the $SHELL environment variable.  Some vim init script
might be overwriting the default with a bad value.  You can use
":verbose set shell" to find out where that might be happening.

> So how do I explicitly set the VIM shell variable?

Technically, it's an option in Vim, not a variable.

:set shell=/bin/bash

(put it in your .vimrc or something).

To set the $SHELL environment variable from which Vim automatically sets
its shell option when it starts up, you have to do something like

export SHELL=/bin/bash

or

setenv SHELL /bin/bash

in your shell login/initialisation scripts (~/.profile or ~/.login
probably). See your shell man page for the gory details.

It is odd for these values to be wrong, though, if your logins are
actually working. If something is not working, it is more likely that
some rogue Vim script is changing the option or shell script is setting
environment variable, when it shouldn't.


Q:     s it possible for VIM to "recognize" my aliases, such as I have
     in my .aliases for example?- (in bash I simply source them of course)

A:  Vim doesn't know anything about how a shell invokes a command,
    including whether that command is a built-in, an alias, a function
    or a file.  What you really want to know is whether aliases can be
    used by a shell invoked from vim.

    Bash "normally" sources ~/.bashrc only if it is run as an
    interactive shell.  This improves the performance of the shell when
    it is run in non-interactive mode, where aliases are usually not
    used.  If you want the shell invoked from vim to see your aliases,
    you can either tell vim to always invoke the shell in interactive
    mode or tell the shell to always source ~/.bashrc even when not in
    interactive mode.

    For the former, I think (untested) that adding "-i" to
    'shellcmdflag' will work, e.g.,

      set shcf=-i\ -c

Note,	Above won't work, do this instead:
  set shellcmdflag=-ic



Q: I tried that, and then invoked !ls and got the following errors:
/bin/bash: - : invalid option
Usage:  /bin/bash [GNU long option] [option] ...
        /bin/bash [GNU long option] [option] script-file ...

A: Hmm.  I just tried it with ksh and got the same results.  A command
like this one,

  ksh -i -c 'ct ls'

works fine from the command line, so those options are OK.  (ct is
an alias for cleartool.)  I don't know what it is that causes

  set shellcmdflag=-i\ -c

to fail.  However, this variation does work:

  set shellcmdflag=-ic
```

## 52.11 command to select multiple line & move it backward/forward

```text
INDENTING/DEDENTING
====================
You can use the >/< commands to indent/dedent a line, range,
motion, or as an Ex target.  You can also use control+[t/d] to
indent/exdent while in insert mode

:help >
:help :>
:help i_CTRL-T

Thus if you have a visually highlighted range (":help V"), you
can just use

>

to indent the lines.  Or you can use

>ip

to indent the "inner paragraph" (using the "ip" text object,
":help text-objects").  Or, if you want to indent select lines:

:g/foo/>

will indent all lines matching the pattern "foo" (with an
annoying stream of messages that I usually suppress with a
well-placed "sil!" in the command).

Incidentally, indentation behavior is controlled by your
'shiftwidth' and 'expandtabs' settings.



MOVING LINES UP/DOWN
=====================
To move lines up/down in a file, you can copy (yank) and paste
them.  Or you can use the Ex ":m"ove command:

:help :move

For example

:.,+3m'a

will move 4 lines (the current line and the 3 below it) to the
location you've marked with the "a" mark.  Any line-reference
(":help :range") will do, so you can do things like

:-3,/foo/m1/bar

(take the range from "3 lines above the cursor, through the next
occurance of 'foo'" and move them to the line after the first
instance of 'bar' after line #1)  Or even
 
:g/foo/m$

will find all lines containing "foo" and move them to the bottom
of the file.

A side-benefit of the ":m"ove method is that it doesn't tromp
your scratch yank/delete register.  I frequently use

:m+
to move the current line below the next one without disturbing my
registers.
```

## 52.12 Another method of converting dos 2 unix

```text
Using global substitute: 
:%s/\r//g                   : Delete DOS returns ^M

Using vim 7.2 options:
You can either use the special-purpose dos2unix utility or do the following:

|1. Load Vim (don't yet specify an editfile).
|
|2. Read the file, accepting either CR+LF or LF alone (or any mixture of
|them) as an end-of-line marker
|       :e ++ff=dos filename.txt
|
|3. Write the file, outputting only LF (without CR) at the end of each line
|       :setlocal ff=unix
|       :w
|
|4. (Optional, if you don't need Vim any longer)
       :q

The above assumes Vim 7.2.040 or later. With earlier versions it's
possible but not as simple.
```

## 52.13 Advanced pattern matching discussions

### 52.13.1 match abcd not "abcd"

```text
-> how can i did this? i want match abcd which is not in quote. e.g:
abcd  //match
"abcd" //mismatch
"\"abcd" //mismatch
"\"ab" abcd //match

how can i did this?
		
	
-> 
[^"]abcd[^"]

which of course would also match abcde, so perhaps:

[^"]\<abcd\>[^"]

Depends what exactly you want, really.

-> 
> how can i did this? i want match abcd which is not in quote. e.g:
> abcd  //match
> "abcd" //mismatch
> "\"abcd" //mismatch
> "\"ab" abcd //match
>
> how can i did this?

/\v%(^[^"]*%(%("%(\\.|[^\\"])*")[^"]*)*)@<=abcd

makes sure that 0 or more fully quoted parts do match from the start of
the line up to the "actual" match for "abcd" in the same line.
basically an even number of quotes is required left from "abcd", but
within a quoted part, escaped quotes (and other escaped chars) are
skipped.
   :h pattern
   :h /\v
   ...
-> 

use negative look-ahead and look-behind, something like:

\("\)\@<!abcd\("\)\@!

should work. [^"]abcd[^"] will not work if abcd stand at the beginning or end
of a line.

-> 
> > how can i did this?
>
> [^"]abcd[^"]
>

> which of course would also match abcde, so perhaps:
>
> [^"]\<abcd\>[^"]
>

this will match "i'm abcd in quote". witch is mustn't matched. so i
can't use this...


>
> /\v%(^[^"]*%(%("%(\\.|[^\\"])*")[^"]*)*)@<=abcd
>
> makes sure that 0 or more fully quoted parts do match from the start of
> the line up to the "actual" match for "abcd" in the same line.
> basically an even number of quotes is required left from "abcd", but
> within a quoted part, escaped quotes (and other escaped chars) are
> skipped.
>     :h pattern
>     :h /\v
>     ...
>

this is even match "aaa abcd " abcd....(two of this...) so i can't use
this.


-> 

> use negative look-ahead and look-behind, something like:
>
> \("\)\@<!abcd\("\)\@!
>
> should work. [^"]abcd[^"] will not work if abcd stand at the beginning or end
> of a line.

okay, if you insist, it must be /\v(^.*".*)@<!abcd(.*")@!. this is
very good, but, it always match:

" trick string ... " . this is should matched abcd . "trick string ...
"

so... didn't prefect, isn't it?

i have thought a while, i think i need the pattern that can describe
the idea "match pattern one, and except pattern two, even if pattern
one is matched". Does Vim has this way?
- Show quoted text -

-> 
> /\v%(^[^"]*%(%("%(\\.|[^\\"])*")[^"]*)*)@<=abcd

> makes sure that 0 or more fully quoted parts do match from the start of
> the line up to the "actual" match for "abcd" in the same line.
> basically an even number of quotes is required left from "abcd", but
> within a quoted part, escaped quotes (and other escaped chars) are
> skipped.
>     :h pattern
>     :h /\v
>     ...
```

## 52.14 Strange result of reading from shell

```text
Hi,

I'm using gvim launched from an linux xterm.

I want to work with all the files in the current directory so I do :r!
ls
the result is full of strange characters that get in the way of
editing the file.
I get something like (ignore the line numbers):
| 2 ^[[00mtotal 184
|   3 ^[[00m^[[00mcentrifydc.conf^[[00m
|   4 ^[[00mdefaults.conf^[[00m
|   5 ^[[00mdiff_cfg^[[00m
|   6 ^[[00mgid.ignore^[[00m
|   7 ^[[00mgroup.ignore^[[00m
|   8 ^[[00mgroup.ovr.sample^[[00m
|   9 ^[[00;34mold^[[00m/
|  10 ^[[00;34mopenldap^[[00m/
|  11 ^[[00mpasswd.ovr.sample^[[00m
|  12 ^[[00muid.ignore^[[00m
|  13 ^[[00mupgradeconf.conf^[[00m
|  14 ^[[00muser.ignore^[[00m

-> 
Found away around this outside of VIM by performing:
for file in *; do echo $file; done > list_of_files

Still, would love to be able to make it work from VIM.


-> 
Yes.  Those are ANSI escape codes
http://en.wikipedia.org/wiki/Ansi_escape_codes

Your version of ls uses them to visually enhance the output on a xterm.
Usually this means you are using an alias for ls.  Try:

:!r
/bin/ls


-> 
I suspect they are escape sequence for color codes. Does it help if
you pipe the output. eg,  ls | cat


-> 

r! /bin/ls works well
r! ls | cat doesn't

-> What about :r  !ls --color=no 
?

[works well]

->
>
> To verify that you are using an alias, you can execute (at a shell
> prompt):
>
>    alias ls
>
> I think you'll see something like this:
>
>    ls='ls --color=always'
>
> If you can find where that alias is defined--probably in your
> ~/.bashrc or the rc file for whatever shell you're using--change it
> to this instead:
>
>    alias ls='ls --color=auto'
>
> Then you will continue to see directory listings in color when ls is
> executed at a shell prompt, but not have the escape sequences
> included when ls is piped into something else, such as a vim buffer.
>

$ alias ls
alias ls='ls -F --color '

Changed to
alias ls='ls -F --color=auto '

Now :r !ls works as expected w/o ANSI codes. 
'

-> 
> To verify that you are using an alias, you can execute (at a shell
> prompt):
>
>     alias ls
>
> I think you'll see something like this:
>
>     ls='ls --color=always'
>
> If you can find where that alias is defined--probably in your
> ~/.bashrc or the rc file for whatever shell you're using--change it
> to this instead:
>
>     alias ls='ls --color=auto'
>
> Then you will continue to see directory listings in color when ls is
> executed at a shell prompt, but not have the escape sequences
> included when ls is piped into something else, such as a vim buffer.
>

If those fail, see if these give any results:

:!typeset -f ls

:!which ls

The last one should be /bin/ls or /usr/bin/ls

If the above don't give anything interesting:

:!env|grep LS|sort

Here you are looking for LSOPTIONS, LSRC, anything starting with LS_ or
ending with _LS

BTW, the interesting thing about the escape codes if that they all are
switching to normal black-on-white text.

-> Another possibility is the environment variable $LS_OPTIONS. If it is
set, find out where (probably by one or more of your startup scripts --
the manpage for your shell will tell you wwhich scripts it runs at
startup) and replace (in that environment variable) --color=yes,
--color=always or --color without an equal sign and a value, by
--color=auto.
```

## 52.15 delete between patterns

```text
->
I couldn't find a way to do this and would like a help. I'm editing a svn
dump, but would like to know how to delete blocks between
       /Node-path: .*LCK/
to the Next
       /Node-path:/-1

============
Node-path: edit-1.gif
...

Node-path: edit.gif.LCK         | I want to delete this block.
....                            |
                               |
Node-path: edit.gif
============

       :/Node-path:.*LCK/,/Node-path:/-1d

gives me backward range warning and I cannot seem to tell vim to look for
the Node-path: after the first Node-path in Node-path:.*LCK.

-> >       :/Node-path:.*LCK/,/Node-path:/-1d

Close.  You might try changing your "," to a ";"

  :/Node-path:.*LCK/;/Node-path:/-1d

which is detailed (but easily overlooked) at

  :help :;

Yours only does one instance (and may be context-sensitive
regarding where your cursor is relative to both bits; thus your
backward-range warning).  If you want to do all of them in the
file, you should be able to use:

  :g/^Node-path:.*LCK/,/^Node-path:/-1d

If for some reason the very last LCK line doesn't have a
Node-path after it, it may try to wrap around, and you'll get the
backward-range warning again.  If you turn off the 'wrapscan'
option, this will transform into a E385 ("search hit bottom
without match for ^Node-path"), so you might have to treat the
last one specially.

And as an aside, the "-1" can be lazily shortened to just "-"
(because the "1" is defaulted):

  :/Node-path:.*LCK/;/Node-path:/-d
  :g/^Node-path:.*LCK/,/^Node-path:/-d

as detailed under the table at

  :help :range

-> >>   :g/^Node-path:.*LCK/,/^Node-path:/-1d
>
> So quick and helpful. Thanks a lot. It'd help me so much dealing with the
> svn dumps.
>
> I guess you meant ; here? (Just in case...)
>
> :g/^Node-path:.*LCK/,/^Node-path:/-1d
> :g/^Node-path:.*LCK/,/^Node-path:/-d

nope...really did mean "," here :)

In your original/first (problematic) case, the reason for the
weirdness was that the searches were both started from your
current cursor position.  Therefore, it would search forward,
find the LCK line, and then for the end-point, search forward for
the next Node-path line (which would happen to be the same line)
and go back one row.  Thus your inversion problem:  it was
getting the LCK line as the start, and the line before it as the end.

With the :g command, each Ex command that follows it has the
cursor already on the line in question, so the
implict-made-explicit becomes

  :g/^Node-path:.*LCK/.,/^Node-path:/-1d

The Ex command-portion being

  .,/^Node../-1

which means "from the current line", rather than your original
non-:g command which searched forward from the current line for
the starting location.

If your start location was relative to the :g command, you'd have
to use the ";" instead -- something like

  :g/^Chapter \d\+//Subsection/+1;/SubsectionEnd/-1d

which would look for each "^Chapter", search forward to
"Subsection", and then *relative to the "Subsection"* search
forward to find "SubsectionEnd".  If it was a comma instead of a
semicolon, it would search for "SubsectionEnd" relative to the
"Chapter" line instead.

-> Summary, to delete a block between two patterns (but not the lines with the patterns):
:/3rdPar/+1,/daemons/-1d
or
g/3rdPar/+1,/daemons/-d 
```

## 52.16 cscope and ctags generation and configuration tips

```text
To find files, you can use ":ts filename".  But you need to pass
the command line option --extra=+f  when you build your tags
with exuberant ctags.

This is how I build tags and the cscope DB for vim sources for
example:

=========================================
#!/bin/sh
TMP_FILE=/tmp/build-tags.$$

find ~/sb/vim7/src -name '*.[ch]' -print > $TMP_FILE
ctags -e -L $TMP_FILE --language-force=c --fields=+S --extra=+f+q -f ~/tags

rm -f cscope.*
cscope -i $TMP_FILE -b -q -f ~/cscope.out

rm -f $TMP_FILE
=========================================

in my ~/.vimrc, I have:

set tags=~/tags

if has('cscope')
 if filereadable(expand("$HOME/cscope.out"))
   cs kill -1
   cs add ~/cscope.out
 endif
 set cscopeverbose
 set cscopequickfix=s-,c-,d-,i-,t-,e-,g-
endif


Then I can jump to a file with...

:ts screen.c

Or using cscope, I can also do:

:cs find f screen.c
```

## 52.17 VIM for editing emails

### 52.17.1 Firefox, Gmail, its all text firefox plugin

```text
--> Small Issue:
- Hide quoted text -
> Hi,
	>
		> I've followed up on the it's all text addon to firefox. It works well for me.
		> One thing I'd like to improve though. My VIM is heavily configured
		> towards source code editing so it takes a lot of time to load. Is
		> there a quick way to force VIM to load with a minimal feature set with
		> the aim of getting fast load time?
		> [...]

		You can specify a .vimrc with the -u command line option and a .gvimrc
		with the -U command line option. Read :help -u and :help -U


		52.17.2
```

## 52.18 remove an empty line if the previous line matches 'foo'.

```text
 :g/^foo\n$/+1d

removes every empty line after a line with a single foo.

	52.19 Where are my marks stored? How to carry a file between two computers to preserve marks?
:help viminfo-file
:help 'viminfo'
```

## 52.20 running shell command in the directory of the file

```text
 :!cd %:p:h ; somecommand arg1 arg2
```

## 52.21 vimgrep: how to get rid of E303

```text
-> Hi,

	I'm not sure what has changed in my environment/settings but now every
		time I run a recursive vimgrep on my project's source files I get this
		endless list of errors saying:
		E303: Unable to open swap file for "[filename]" recovery impossible

		The message slows down the search considerably. Also, it was annoying
		to use enter/space just to get the search going - that is until I
		found that G gets you the the end of the search/error list.

		My question is how to eliminate this error when grepping.

		TIA,
	Yosi

-> 
> I'm not sure what has changed in my environment/settings but now every
> time I run a recursive vimgrep on my project's source files I get this
> endless list of errors saying:
> E303: Unable to open swap file for "[filename]" recovery impossible
>

:help E303 says "you may want to change the 'directory' option to
avoid this error." What does ":verbose set directory?" tell you?

Check ":help 'directory' for the format of this option and a list of
potential gotchas, and make sure you have write privileges in the
directories listed.

-> 
>
> :help E303 says "you may want to change the 'directory' option to
> avoid this error." What does ":verbose set directory?" tell you?
>
> Check ":help 'directory' for the format of this option and a list of
> potential gotchas, and make sure you have write privileges in the
> directories listed.

:verbose set directory
 directory=$VIMvimfilestemp
        Last set from ~/.vimrc

	$VIM is /usr/local/share/vim and I don't have permissions there.

	I found the following in .vimrc:
	set backupdir=$VIM\vimfiles\backup " where to put backup file
	set directory=$VIM\vimfiles\temp " directory is the directory for temp file

	And changed to
	set backupdir=/tmp/vimbackup " where to put backup file
	set directory=/tmp/vimtemp " directory is the directory for temp file

	Then double checked setting:
	verbose set directory
	directory=/tmp/vimtemp

	I do have permission to /tmp. I tried touching, reading writing and
	deleting files. All work.
	The E303 error persists though (after I restarted vim to make sure the
			changed .vimrc applies).
	Last, I tried removing the settings from my .vimrc and just settle for
	VIM's default. This eliminated the error :)

	Thanks for the help!
	Yosi
```

## 52.22 :set nu -> how to copy lines with line numbers?

```text
-> when I mark in visual mode, only the text itself (what do we need
		normally) is marked.

sometimes I would like to select the interesting lines with the line
numbers from the left margin.

how to copy them along with the text?

-> One possibility: use :print (see :help :print)

Select lines you want to copy, say ':print' and select the lines with your
mouse, along with the line numbers.

-> You have several alternatives. First you could use the TOhtml command
to let vim generate a html file, which includes the line numbers, if I
am not mistaken. You could then copy and paste from that html file.

Another possibility would be to replace each line by its line number
plus it's content, so you could copy it with the line number included.
This can be done using the following substitute command:
:s/^/\=printf("%2d ", line('.'))/
You obviously want to undo this replace after copying using e.g. undo
or :s/^\d\+ //

Or you create your own command to take care of copying the desired
text together with the line numbers. Something like this should work:

fu! YankNu(first, last)
       let start=a:first
       let l=[]
       while start <= a:last
               let l = add(l,printf("%".len(a:last) . "d %s",start , " " . getline(start)))
               let start+=1
       endwhile
       return join(l,"\n") . "\n"
endfu

com! -nargs=0 -range Yank :let @+=YankNu(<line1>,<line2>)

Now select your text and enter :Yank
The function then copies the range into your +-register (which should
correspond to your System's clipboard, if your vim was compiled with
clipboard functionality [:help should output +clipboard, instead of
-clipboard] and can access it)

-> Open the file with console vim in a terminal, :set nu, and use the mouse.

-> You can use

  :redir @a
  :sil! '<,'>#
  :redir END

to pull the numbered lines into register "a".  This can be
wrapped into a mapping:

 :vnoremap <f4> :<home>redir @a<bar>sil! <end>#<bar>redir END<cr>

assuming you always want to tromp the same register.  If you use
it frequently, you might designate a preferred register such as
"n" for "(n)umbered" and then only use it for that purpose.
Alternatively, :redir allows you to redirect to other sinks if
you prefer.
```

## 52.23 bring two buff into diff mode

```text
Supposing I have two files opened in two separated buffers b1 and b2,
and now I decide to compare b1 and b2 as if I open these file by 'vim
-d f1 f2', how can vim help me accomplish this?  

Usually I have exactly two windows open when I want to do this,
and the following command starts diff:
 :windo diffthis

After making some changes, you might want:
 :windo diffupdate
[Small correction: the latter :windo should be omitted:
   :diffu 
]

When finished, turn off:
 :diffoff!

It's also handy to know that you can move the windows around:
 Ctrl-W K  (move current window up)
 Ctrl-W L  (move current window to right)
```

## 52.24 How to save recordings in vimrc

```text
Q: Is there a way to save recordings, as I often need to retype all the
useful recordings(e.g commenting a line) whenever I open a vim
session.

A:
-> there may be other ways, but one thing i like to do is to create
modules for specific purposes

let's say for example i am going to be working on some html -- i
will

   :source ~/.vim/html_lets

   which looks like

   <html_lets>
   echo 'html_lets being applied'
   echo 'insert mode <C-R>register inserts them'

   let @a = '<a href=""></a>'
   let @b = '<br>'
   let @c = '<!-- -->'
   let @g = '&gt;'
   let @l = '&lt;'
   let @p = '<pre>
   </pre>'
   let @q = '&quot;'

   "  vim:ft=vim
   </html_lets>

   what these "lets" do is populate various registers with things i
   find useful in an html edit session, which i use with the insert
   mode <C-R>

   if you want, you can save your recording(s) in a similar module

	   to access them, read up on "redir" -- save the output of

		      :reg

		      using redir, then make a module to be sourced that contains "let"s
		      for the recordings you find most useful -- this is a handy way of
			      editing your recordings after you've made them too

-> Well, let's see if I understand you, which isn't certaion since you
aren't using established Vim terminology. I think tht you are talking
about (register) _macros_, i.e., series of keystrokes recorded "by doing
them" by means of the Normal-mode commands qa to qz, but that (key)
_mappings_ might be more useful to you.

Mappings are sequences of keystrokes assigned to one key or to a
sequence of keys by means of one of the variations on the |:map|
command, see |map-overview|. For instance, I have the following in my
vimrc so that hitting F11 will always move to the next (split) window in
sequence, and Shift-F11 will go to the previous one:

       :noremap        <F11>   <C-W>w
       :noremap        <S-F11> <C-W>W
       :inoremap       <F11>   <C-O><C-W>w
       :inoremap       <S-F11> <C-O><C-W>W

The difference between mappings and registers is that mappings are
defined by the ":map" (and family) ex-command, and are often written in
the vimrc, while qa to qz macros are saved in a register at the moment
you record them, and registers can be saved from one session to the next
in the |viminfo| file.

See
       :help map.txt
       :help viminfo
       :help 'viminfo'
       :help complex-repeat
       :help registers
```

## 52.25 how to perform action on all modified buffers

### 52.25.1 Question

```text
Hi,

Possibly a trivial question, yet I searched some, read help some and
couldn't find a quick answer.
I actually have two sub questions:

|1. say I want to perform an action on all modified buffers. Like
performing compress or just echo their name. how is it done?
I read about bufdo and assume the answer lies in that direction.

|2. More complex. Say I want to execute a shell (bash) command on all
buffers. For the buffers that the shell command succeeds (i.e. returns 0) perform some action. This can be useful for example to compress all
files larger than a given size, checking in all checked-out source
files  at the end of editing session etc.
what I had in mind is something along the lines of:
:silent bufdo !if test_cmd % > /dev/null ; then execute_desired_cmd
% ; fi

Haven't tried it yet and I have to go offline but I'm guessing it
won't work.

TIA,
Yosi
```

### 52.25.2 Answers

```text
-> Christian Brabandt

Hi WL!

On Do, 04 Jun 2009, WL wrote:

> 1. say I want to perform an action on all modified buffers. Like
> performing compress or just echo their name. how is it done?
> I read about bufdo and assume the answer lies in that direction.

This echoes the name of all modified buffers:
set hidden
:bufdo if &modified | echo bufname("%") 'modified!' |sleep 1 | endif

> 2. More complex. Say I want to execute a shell (bash) command on all
> buffers. For the buffers that the shell command succeeds (i.e. returns
> 0) perform some action. This can be useful for example to compress all
> files larger than a given size, checking in all checked-out source
> files  at the end of editing session etc.
> what I had in mind is something along the lines of:
> :silent bufdo !if test_cmd % > /dev/null ; then execute_desired_cmd
> % ; fi

Not sure. Probably depends on what exactly you are trying to achieve.
		
-> Tim Chase
> 1. say I want to perform an action on all modified buffers. Like
> performing compress or just echo their name. how is it done?
> I read about bufdo and assume the answer lies in that direction.

You're right -- though the command you want to execute may have
to be wrapped in an exec() call/statement.  It may also need to
have 'hidden' set to allow you to leave the modified buffers:

  :set hidden
  :bufdo if &modified | some_ex_command | endif

where some_ex_command may require using exec as described at

  :help :bar

which lists the "problem" commands (those that eat following
bars/pipes), as well as the example of using :execute

> 2. More complex. Say I want to execute a shell (bash) command on all
> buffers. For the buffers that the shell command succeeds (i.e. returns
> 0) perform some action. This can be useful for example to compress all
> files larger than a given size, checking in all checked-out source
> files  at the end of editing session etc.
> what I had in mind is something along the lines of:
> :silent bufdo !if test_cmd % > /dev/null ; then execute_desired_cmd
> % ; fi

Not sure on this one, but it looks fairly kosher.

-> Tony Mechelynck
>
> Hi,
>
> Possibly a trivial question, yet I searched some, read help some and
> couldn't find a quick answer.
> I actually have two sub questions:
>
> 1. say I want to perform an action on all modified buffers. Like
> performing compress or just echo their name. how is it done?
> I read about bufdo and assume the answer lies in that direction.

yes, see other replies

>
> 2. More complex. Say I want to execute a shell (bash) command on all
> buffers. For the buffers that the shell command succeeds (i.e. returns
> 0) perform some action. This can be useful for example to compress all
> files larger than a given size, checking in all checked-out source
> files  at the end of editing session etc.
> what I had in mind is something along the lines of:
> :silent bufdo !if test_cmd %>  /dev/null ; then execute_desired_cmd
> % ; fi
>
> Haven't tried it yet and I have to go offline but I'm guessing it
> won't work.
>
> TIA,
> Yosi

       silent bufdo exe '!some_shell_command > /dev/null'
                       \ | if !v:shell_error
                               \ | call SomeUserFunc()
                       \ | endif

The :exe wrapper (with single quotes for literal quoting) is necessary
to allow other ex-commands after it on the same line.
See
       :help :bar
       :help v:shell_error

On Dos/Windows, replace >/dev/null by >NUL -- the rest should work,
except of course that you may need to call an external command with a
different name.

-> WL
> This echoes the name of all modified buffers:
> set hidden
> :bufdo if &modified | echo bufname("%") 'modified!' |sleep 1 | endif
>
This seems to work well thank you!
How do I perform shell commands on the modified buffers, like for
example compressing them?
Would the following work?
:bufdo if &modified | tar -rvf archive.tar %  |sleep 1 | endif
I tried it and it did not seem to work. In-fact it seemed to mess up
VIM input and output streams.


> > what I had in mind is something along the lines of:
> > :silent bufdo !if test_cmd % > /dev/null ; then execute_desired_cmd
> > % ; fi
>
> Not sure. Probably depends on what exactly you are trying to achieve.
>
I tried the following:
:silent budfo !if ls % | grep desired_pattern > /dev/null; then echo
%; fi
and got this error: E492: Not an editor command: silent budfo !if ls % | grep Flow > /dev

On Jun 7, 9:02 am, Tony Mechelynck  wrote:
>         silent bufdo exe '!some_shell_command > /dev/null'
>                         \ | if !v:shell_error
>                                 \ | call SomeUserFunc()
>                         \ | endif
>
> The :exe wrapper (with single quotes for literal quoting) is necessary
> to allow other ex-commands after it on the same line.
> See
>         :help :bar
>         :help v:shell_error
>
> On Dos/Windows, replace >/dev/null by >NUL -- the rest should work,
> except of course that you may need to call an external command with a
> different name.
>

I copied the suggestion to the letter. I got an error when executing
it from : prompt.
So I executed:
:silent budfo exe 'if ls % | grep desired_pattern > /dev/null' | if !
v:shell_error | !echo % | endif
and got error:
E492: Not an editor command: silent budfo exe 'if ls % | grep
desired_pattern >

Seeing as this is not trivial (well at least not for me) I'd like to
ask specific related questions.
|1. How do I put all modified buffers to archive?- Ultimately I'd like
to either map the command or add to a GUI menu.
|2. How do check in all buffers that pass a shell test (meaning $test
buffer returns $? value of 0)?
Specifically. All files that pass cleartool ct ls buffer | grep
CHECKEDOUT (i.e. they are checked out) will have the check in command
executed on them: cleartool ci -nc buffer.

->
Hi yosi!

On Di, 09 Jun 2009, yosi izaq wrote:

>
> On Sun, Jun 7, 2009 at 3:28 PM, WL wrote:
> > ...
> > Seeing as this is not trivial (well at least not for me) I'd like to
> > ask specific related questions.
> > 1. How do I put all modified buffers to archive?- Ultimately I'd like
> > to either map the command or add to a GUI menu.

Here we go:

set hidden
let archive=[]
bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif

if len(archive) > 0
   exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
endif

> > 2. How do check in all buffers that pass a shell test (meaning
> > $test
> > buffer returns $? value of 0)?
> > Specifically. All files that pass cleartool ct ls buffer | grep
> > CHECKEDOUT (i.e. they are checked out) will have the check in command
> > executed on them: cleartool ci -nc buffer.

As Tony said, something like this should work:

bufdo exe "!test -f " . expand("%") ."  > /dev/null"
    \ | if !v:shell_error
    \ | echo "passed"
    \ | endif


-> 
On Wed, Jun 10, 2009 at 12:20 AM, Christian Brabandt wrote:

>> > 1. How do I put all modified buffers to archive?- Ultimately I'd like
>> > to either map the command or add to a GUI menu.
>
> Here we go:
>
> set hidden
> let archive=[]
> bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif
>
> if len(archive) > 0
>    exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
> endif
>
First I'd like to clarify why I asked again. I asked how to perform
said things from ex prompt. I have tried and tested the answers I got
from ex prompt. Re. this question the first answer I got worked well -
alas I didn't/don't have sufficient knowledge to modify it to do what
I wanted (archive).
Now, I guess you mean by your answer that I should add a function to
.vimrc. I did that and added:
function! Archive_all_modified_buffers()
   set hidden
   let archive=[]
   bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif

   if len(archive) > 0
      exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
   endif
endfunction

Then I called it (call Archive_all...). It seemed to work on all the
(modified?) buffers but I didn't see the archive.tar.bz2 file being
created. Nor could I find it in my account.


>> > 2. How do check in all buffers that pass a shell test (meaning
>> > $test
>> > buffer returns $? value of 0)?
>> > Specifically. All files that pass cleartool ct ls buffer | grep
>> > CHECKEDOUT (i.e. they are checked out) will have the check in command
>> > executed on them: cleartool ci -nc buffer.
>
> As Tony said, something like this should work:
>
> bufdo exe "!test -f " . expand("%") ."  > /dev/null"
>     \ | if !v:shell_error
>     \ | echo "passed"
>     \ | endif
>
>
Yes. I tried Tony's suggestion from ex prompt and got an error
(reported it earlier in thread).
This time I added his suggestion as a function and it works perfectly well :)
I added:
function! Perform_Shell_Test_all__buffers()
bufdo exe "!test -f " . expand("%") ."  > /dev/null"
   \ | if !v:shell_error
   \ | echo "passed"
   \ | endif
endfunction

function! CheckIn_all__buffers()
bufdo exe "!ct ls  " . expand("%") ." | grep -i checkedout > /dev/null"
   \ | if !v:shell_error
   \ | echo "file is checked out"
   \ | exe "!ci " . expand("%")
   \ | endif
endfunction

They both work well. (ci is aliased the cleartool ci -nc).

Thanks,
Yosi

		52.25.3 Excertp from .vimrc of adding menu actions to archive all modified buffers and checkin all checkout buffers:

" My personal menu
amenu MyMenu.HighlighCtxt       :match ToDo /^\s\+-\+>.*$/<cr>
amenu MyMenu.KBEntries          :match StatusLine /^\s*\d\+\..*$/<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveBuffers     :silent bufdo !tar -rvf ~/temp/vim_archive.tar %:p<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.highlight          :set cursorline<cr>
amenu MyMenu.highlightV         :set cursorcolumn<cr>
amenu MyMenu.-SEP-      :   
vmenu MyMenu.makeArrowList              :call ArrowList()<cr>
vmenu MyMenu.makeNumberList             :call NumberList()<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.InsertFileLink             :s/^.*$/&\r<URL:[File Path]><cr>
amenu MyMenu.InsertLocalLink            :s/^.*$/&\r<URL:#tn=[pattern in file]><cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveModifiedBuffers            :call Archive_all_modified_buffers()<cr>

" My ACS 5, linux develoment environment clearcase menu
amenu MyCCMenu.checkout       :! co % <cr>
amenu MyCCMenu.checkin       :! ci % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.version_tree       :! ct lsvtree -g % <cr>
amenu MyCCMenu.diff_pred       :! ct diff -pred -graph % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.checkin_all       :call CheckIn_all__buffers()<cr>

"Custom functions
function! Archive_all_modified_buffers()
    set hidden
    let archive=[]
    bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif
    
    if len(archive) > 0
       exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
    endif
endfunction

function! Perform_Shell_Test_all__buffers()
bufdo exe "!test -f " . expand("%") ."  > /dev/null"
    \ | if !v:shell_error
    \ | echo "passed"
    \ | endif
endfunction

function! CheckIn_all__buffers()
bufdo exe "!ct ls  " . expand("%") ." | grep -i checkedout > /dev/null"
    \ | if !v:shell_error
    \ | echo "file is checked out"
    \ | exe "!ci " . expand("%")
    \ | endif
endfunction
```

## 52.26 Tags paths problem: "E429: File "/users/<user>/.vim/tags/long/path/to/file.h" does not exist "

### 52.26.1 question

```text
Hi,

Up until a month ago I used tags by generating a tags file and placing
it in the root directory of my project. Then I would open vim from
this directory and searching for tags (ctrl+[) was working well.
I changed that when I installed the omni complete plugin. The
instructions for installing it suggests putting the tags file in a
fixed location so I put my tags file in ~/.vim/tags.
Now when I open VIM and try to get to a tag (ctrl+[) I get an error
that the file was not found as follows:
 "E429: File "/users/<user>/.vim/tags/long/path/to/file.h" does not
exist"
The thing is that the path to get to this file, given that I fired up
VIM from the projects root dir is /long/path/to/file.h
the added prefix of the tags location is evidently causing this error.

My question is whether it is possible to change that via configuration/
settings?- I can always just keep a local copy of the tags file in the
root dir of the project and choose this match as a workaround but I'd
like to better understand and handle this.
```

### 52.26.2 Answers

```text
-> Alessandro Antonello	
I am not sure if this is your problem, but...

You can create your tags file with the following command to ctags tool:

 ctags -f out_put/path/file %--c++-kinds=+p --fields=+iaS --extra=+q
 --tag-relative=yes sources/path/*

This is the way  I use it in a Windows XP  SP2 environment and GVim.  Usually I
enter this  command line in a  directory above the directory  where the sources
are (I have a common directory structure for all my projects).  But this is not
really relevant if you set the correct target and source directories and path.

If you set the  'tags'  option  correctly  Vim  (of  GVim)  will know where the
sources are.  See:

:help tag-commands


Sorry! The command line to the ctags tool is:

  ctags -f out_put/path/file --c++-kinds=+p --fields=+iaS --extra=+q
  --tag-relative=yes sources/path/*

I left a '%' sign in the preceding message in the middle of the command line.

Alessandro Antonello


*/

-> yosi izaq
>

> Sorry! The command line to the ctags tool is:
>
>   ctags -f out_put/path/file --c++-kinds=+p --fields=+iaS --extra=+q
>   --tag-relative=yes sources/path/*
>
> I left a '%' sign in the preceding message in the middle of the command line.
>

Since I launch VIM from my projects root dir I figured I need to set
the relative paths of the tags to that so I create the tags using this
command:
$ ctags -R
--c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags .
--tag-relative=yes ./

I then moved the tags to .vim/tags/my_proj/

However the tags still have wrong path, see example:
 # pri kind tag               file
 1 F   f    ParsedRequest     /users/<user>/.vim/tags/proj/path/to/file.h
              class:ParsedRequest::ParsedRequest access:public signature:()
              ParsedRequest::ParsedRequest()
 2 F   s    ParsedRequest     /users/<user>/.vim/tags/proj/path/to/file.h
              struct ParsedRequest
Choice number (<Enter> cancels): 2
E429: File "/users/<user>/.vim/tags/proj/path/to/file" does not exist

Clearly, the path is wrong since it should be only proj/path/to/file.h

I'm probably missing something here. I read in the help that:
"
If the 'tagrelative' option is on (which is the default) and using a tag file
in another directory, file names in that tag file are relative to the
directory where the tag file is.
"
If that is the case then perhaps I should turn that option off. I
tried that but it didn't change the tag paths.
I created the tags using:
ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c+
+  -f tags . --tag-relative=no

Then moved to the .vim/tags/proj but when searching the tag I get the
same result as above.

I confirm with just creating a symbolic link to the tags file from my
project's root dir (from where I launch VIM). since I set ./ to be
searched first for the tags file the symbolic link is chosen and so
the paths are relative to my project's root dir which is what I need.

For example:
$ ln -s ~/.vim/tags/acs_5_2/tags tags


*/
```

## 52.27 how to match the space Not begin from the start-of-line

```text
 I want to know how to match the space that is not in the start of the line.

for example
   sss sss
^^^^   ^
I just match the second part of the sample.
Can anyone help me?

-> How about:

/^\s\+\S\+\zs\s

/    - Search
^    - Start of the line
\s\+ - One or more spaces (replace \+ with * if you don't mind whether
there are spaces)
\S\+ - One or more non-space characters
\zs  - Start the match from here (so ignore everything before)
\s   - A space

-> You want the "\@<!" modifier:

  \%(^\s*\)\@<!\s

which "Matches with zero width if the preceding atom does NOT
match just before what follows." as detailed at

  :help /\@<!

In this case, the preceding atom is

  \%(^\s*\)

or "whitespace at the beginning of the line".

-> Thank for quick reply,  you pattern work for this case.
I think I do not say clear, the other example
   sss  sss   ss
^^^^   ^^   ^^  ^^

just match the second part. I want to match the 2,3,4 part

thanks Tim , I think your atom work well. I know the \@<! , but I use
the   \%(^\s\+\)\@<!\s ,
can you tell me, why the \s\+ not work well, but the \s* work well

-> 
They should be nearly equiv., with the only difference being the
"\+" version *requires* that the line start with whitespace (one
or more whitespace characters) whereas the "*" version allows the
line to start without -whitespace.  This also finds *all* the
non-leading whitespace on the line.  If you want just the first
space, A.S. Budden posed a good solution.

-> Ah, sorry, I misunderstood.  I think Tim has posted a good solution,
but another option would be:

/\S\@<=\s

\S - Non space
\@<= - Match with zero width if the \S is present
\s\+ - The spaces (or tabs) that you're looking for.

This will match any space characters that are preceded by something
that isn't a space character.  You can probably also do:

\S\zs\s\+
```

## 52.28 Exit message

```text
" bye bye message
 au VimLeave * :call PrintAtExit()
   function! PrintAtExit()
       echo "Hope you had a good VIM session :) "
   endfun
```

## 52.29 Folding question of a ToDo list file

```text
Hi,

I keep a monthly ToDo list file in the format of:

date:
-> item1
 --> subitem11
 --> subitem21
    --->subsubitem211
...

example:
08/09:
-> Post to vim_use
 --> Fold question

-> Read 200 lines of debug logs of recent application crash:
[200 lines of logs]

-> Do something else

09/09
...

I would like to apply the most simple directive to fold all the file
so that each item (->) would be closed.
I tried to play a bit with foldmarker but the results were not what I
expected. For example I tried:
set foldmethod=marker foldmarker=->,->

I would appreciate any tips you may have.

-> Answer, using syntax:
None of the lines start with `contains'. The lines were broken
automatically. The simplest way to test would be to paste it into a
file (e.g., /tmp/todo_syntax.vim) and source the file from within the
file containing your TODO items. E.g.,

	:so /tmp/todo_syntax.vim

		Here's the same script with backslashes continuing the long lines to
		prevent their being broken:

		syn region Lvl1 start=/^\s*-\{1}>/ end=/^\s*-\{1}>/me=s-1
		\ contains=Lvl2,Lvl3,Lvl4 fold
		syn region Lvl2 start=/^\s*-\{2}>/ end=/^\s*-\{1,2}>/me=s-1 contained
		\ contains=Lvl3,Lvl4 fold
		syn region Lvl3 start=/^\s*-\{3}>/ end=/^\s*-\{1,3}>/me=s-1 contained
		\ contains=Lvl4 fold
		syn region Lvl4 start=/^\s*-\{4}>/ end=/^\s*-\{1,4}>/me=s-1 contained
		\ fold
		set foldmethod=syntax

-> created syntax file for my context files "my_ctxt_syn.vim"

syn region Lvl1 start=/^\s*-\{1}>/ end=/^\s*-\{1}>/me=s-1 contains=Lvl2,Lvl3,Lvl4 fold
syn region Lvl2 start=/^\s*-\{2}>/ end=/^\s*-\{1,2}>/me=s-1 contained contains=Lvl3,Lvl4 fold
syn region Lvl3 start=/^\s*-\{3}>/ end=/^\s*-\{1,3}>/me=s-1 contained contains=Lvl4 fold
syn region Lvl4 start=/^\s*-\{4}>/ end=/^\s*-\{1,4}>/me=s-1 contained fold
```

## 52.30 How to force windows vim to load appropriate vimrc?

```text
-> Hi,

	I have two gvim 7.2 installs on my machine. One for cygwin and another
	for windows. I recently noticed that the windows gvim is actually
	loading the cygwin ~/.vimrc file instead of the Program file/vim/
	_vimrc file.
	How come? and how can I fix that?

	TIA,
	Yosi

->    :help _vimrc
One way would be to put this at the top of your ~/.vimrc:

   if has("win32")
       source $VIM/_vimrc
       finish
   endif

HTH,
Gary

-> Fritz:
> I have two gvim 7.2 installs on my machine. One for cygwin and another
> for windows. I recently noticed that the windows gvim is actually
> loading the cygwin ~/.vimrc file instead of the Program file/vim/
> _vimrc file.
> How come?

Vim will always source the .vimrc (or _vimrc) that is in your HOME
directory. Apparently you either have an environment variable HOME
set, or you placed your .vimrc in the same place that Windows looks
for HOME. You can determine the setting of HOME by doing ":echo $HOME"
from within Vim.

> and how can I fix that?
>

As Gary suggests, make sure your .vimrc works on both Windows and
cygwin, possibly by sourcing the Windows-only vimrc or a Cygwin-only
vimrc depending on platform.

I find it nicer to use the SAME configuration for both platforms, and
just separate out stuff that shouldn't be common within the vimrc
itself.

-> My preference: put it all in ~/.vimrc file and use has("unix")/"win32"/"win32unix" for unix/windows/cygwin specific settings
```

## 52.31 listing total number of buffers in the statusline

```text
let @b=bufnr('$')
reg b
```

## 52.32 generate lines with increasing numbers

```text
I have questions about getting vi to add numbers in sequence within a file.

Example:

dummy01
dummy02
dummy03
dummy
dummy
....

etc.

So If I have 1000 dummy's and instead of hand typing all this in a file. I wonder if there was
an easy to accomplish this using vim.

->
I think, the easiest solution would facilitate a macro. Assuming you
have written dummy01 and the cursor is on the word dummy, record the
macro into register a like this:
qayyp$^Aq

(where ^A ist a literal Ctrl-A key press not the 2 keys ^ and A).

And then execute 100@a which executes the macro stored in register a.

Note, that you can also fill the register explicitly, if you know
exactly what to execute (^A ist inserted as Ctrl-V Ctrl-A):
:let @a="yyp$^A"
100@a

Another solution, which would only work with vim 7.2 with patch 295
included uses a little bit scripting:

:let list=repeat(["dummy"], 100)
:call map(list, 'v:val.printf("%02d",v:key+1)')
:call append("$", list)

-> :call append('$', map(range(100), 'printf("dummy%02d", v:val)'))
```

## 52.33 VIM and web pages, how to read web pages (URL) in VIM

```text
e http://www.cnn.com
will retreive the html

:r !lynx -dump http://www.somewebsite.com
will format the text as well (remove html tags)
w3m and links can be used instead of lynx
```

## 52.34 Can't save file due to "CONVERSION ERROR in line..."

```text
- My way
w! ++enc=utf8

-
Yosi Izaq
 to vim_use
Hi,

This happens to me when I copy paste text from my browser. It's
driving me crazy :)
How can I turn this off?

TIA,
Yosi
----------------------------------------------------------------------------------------------------
Charles Campbell	
I can't precisely answer this, but I'll give you some guesses: I'll guess tha...
	
Mar 25 (3 days ago)
Charles CampbellLoading...	
Mar 25 (3 days ago)
Charles Campbell
 to vim_use
	
show details Mar 25 (3 days ago)
	
- Show quoted text -
Yosi Izaq wrote:

    This happens to me when I copy paste text from my browser. It's
    driving me crazy :)
    How can I turn this off?
     


I can't precisely answer this, but I'll give you some guesses:  I'll guess that the browser is using one encoding and you have gvim/vim using a different, incompatible encoding.  I'm not sure how to determine what encoding your browser is using, but the encoding for vim can be checked with

 set enc
 set fenc

If you can live with utf-8, try using that.

Regards,
Chip Campbell

----------------------------------------------------------------------------------------------------
Tony Mechelynck
 to vim_use
	
show details Mar 25 (3 days ago)
	
On 25/03/10 19:33, Charles Campbell wrote:

    Yosi Izaq wrote:

        This happens to me when I copy paste text from my browser. It's
        driving me crazy :)
        How can I turn this off?


    I can't precisely answer this, but I'll give you some guesses: I'll
    guess that the browser is using one encoding and you have gvim/vim using
    a different, incompatible encoding. I'm not sure how to determine what
    encoding your browser is using, but the encoding for vim can be checked
    with

    set enc
    set fenc

    If you can live with utf-8, try using that.

    Regards,
    Chip Campbell


Yes indeed.

Conversion error when saving the file means that the file in the buffer (in the 'encoding' charset) contains one or more characters which cannot be represented in the 'fileencoding' charset which you're trying to save the file in. For instance, the file contains an œ character (French oe digraph) and you're trying to save it in Latin1.

If the conversion error happens when reading or pasting into Vim memory, then your 'encoding' is not compatible with the data; IOW, Vim cannot represent the data in memory with the present choice of 'encoding'.

I recommend to use UTF-8 for the data in Vim memory ('encoding'), because Unicode (including UTF-8) can represent any possible computer charset. Conversion between Unicode and Latin1 is trivial and Vim (if compiled with +multi_byte of course, i.e. if has('multi_byte') is nonzero) can do it without external help; conversion to or from some other non-Unicode charset (or to or from GB18030, which technically is a Unicode charset but requires large conversion tables) usually requires the iconv library, either compiled-in or available for dynamic load at runtime (to check it, make sure that has('iconv') has a nonzero value).

See also http://vim.wikia.com/wiki/Working_with_Unicode and the help pages mentioned there.

See also :help 8g8


Best regards,
Tony.
----------------------------------------------------------------------------------------------------
yosi izaq
 to vim_use
	
show details 11:10 AM (0 minutes ago)
	
- Show quoted text -
>> I can't precisely answer this, but I'll give you some guesses: I'll
>> guess that the browser is using one encoding and you have gvim/vim using
>> a different, incompatible encoding. I'm not sure how to determine what
>> encoding your browser is using, but the encoding for vim can be checked
>> with
>>
>> set enc
>> set fenc
>>
>> If you can live with utf-8, try using that.
>>
>> Regards,
>> Chip Campbell
>>
>
> Yes indeed.
>
> Conversion error when saving the file means that the file in the buffer (in
> the 'encoding' charset) contains one or more characters which cannot be
> represented in the 'fileencoding' charset which you're trying to save the
> file in. For instance, the file contains an œ character (French oe digraph)
> and you're trying to save it in Latin1.
>
> If the conversion error happens when reading or pasting into Vim memory,
> then your 'encoding' is not compatible with the data; IOW, Vim cannot
> represent the data in memory with the present choice of 'encoding'.
>
> I recommend to use UTF-8 for the data in Vim memory ('encoding'), because
> Unicode (including UTF-8) can represent any possible computer charset.
> Conversion between Unicode and Latin1 is trivial and Vim (if compiled with
> +multi_byte of course, i.e. if has('multi_byte') is nonzero) can do it
> without external help; conversion to or from some other non-Unicode charset
> (or to or from GB18030, which technically is a Unicode charset but requires
> large conversion tables) usually requires the iconv library, either
> compiled-in or available for dynamic load at runtime (to check it, make sure
> that has('iconv') has a nonzero value).
>
> See also http://vim.wikia.com/wiki/Working_with_Unicode and the help pages
> mentioned there.
>
> See also :help 8g8
>
>
> Best regards,
> Tony.

Hi,

Thanks for the tips. Following two of them didn't really solve the issue.
set enc returns
 encoding=utf-8

 and set fenc returns
file encoding=latin1

How can I know which of them actually applies?- the utf-8 or the
latin1?- And how can I make sure utf-8, assuming this will resolve the
error, applies?

the 8g8 is nice but it's not robust enough to help me cope with 2k
line choke full of encoding wise illegal chars.
The tip though had an example of encoding settings. I added it to my
vimrc and it resolved the problem. For the record, end and fenc
remains the same after I apply the tip. The problem is gone though and
I can copy paste the problematic text to vim and save w/o error.

Thanks!
Yosi

Note: set fenc=utf-8 if you have further errors
----------------------------------------------------------------------------------------------------
```

## 52.35 List known filetypes?

```text
How can I get a list of known file types?
Preferably with info which criteria they are recognized by
(file suffix, interpreter directive...)

(I suspect this is a faq, but none of help helpgrep or
Google returns anything useful, or I can't come up with
the right search term. :-? )

----------------------------------------------------------------------------------------------------
>
> How can I get a list of known file types?

 :echo glob($VIMRUNTIME . '/ftplugin/*.vim')

or

 :echo glob($VIMRUNTIME . '/syntax/*.vim')

(I find the latter a better exhaustive list, the former are often
shared by multiple languages.)


> Preferably with info which criteria they are recognized by
> (file suffix, interpreter directive...)

Much tougher, each syntax/filetype is detected in a different way.
Often by extension, but sometimes by internal file structure or
format.
```

## 52.35 how to count # of paragraphs

```text
-> Hi,

I'm familiar with the %s/patt//n "trick" to count the # of patterns in
the file. I would like to ask how to count the # of paragraphs in a
file.
My question has 2 flavors:
a. Count free text paragraphs separated by empty lines
b. Count structured paragraphs that have a prefix and suffix
delimiters, such as
[
l1
l2
l3
]

[
l4
l5
]

I tried search as follows: /[\_p\{-}\]
and it matches well, however the search I tried didn't match: %s/[\_p\
{-}\]/n

I'm obviously doing something wrong and would appreciate pointers how
to do it right.

TIA,
Yosi

-> 	I tested against this text:

======= text starts here =======
[
l1
l2
l3
]
[
l4
l5
]

l1
l2
l3
l4

l1
l2
l3
l4
l5



====== text ends here ========

The following command finds four matches on the previous text:

:%s/\(\[\_p\{-}]\)\|\(\%^\|^\n\)\@<=\(\p\+\n\)\{-1,}\ze\(^\n\|\%$\)//n

Explanation:

:%s
 /           start pattern
   \(        start group
     \[      literal [
     \_p     any printable + \n
     \{-}    0 or more, as few as posible
     \]      literal ]
   \)        end group
 \|          or
   \(        start group
     \%^     start of file
   \|        or
     ^\n     an empty line
   \)        end group
   \@<=      match starts after previous group
   \(        start group
     \p\+\n  a non-empty line
   \)        end group
   \{-1,}    1 or more, as few as posible
   \ze       match ends before the next group
   \(        start group
     ^\n     empty line
   \|        or
     \%$     end of file
   \)        end group
 //n

It was fun writing that, but I suppose that somebody else can find a shorter alternative.

Cheers!
Israel

-> >>
>> :%s/\(\[\_p\{-}]\)\|\(\%^\|^\n\)\@<=\(\p\+\n\)\{-1,}\ze\(^\n\|\%$\)//n
>>

BTW, I tested both 
:%s/\(\[\_p\{-}]\)\|\(\%^\|^\n\)\@<=\(\p\+\n\)\{-1,}\ze\(^\n\|\%$\)//n
and
:%s/\(\[\_p\{-}]\)//n

Both worked well for my file and returned the same number. Why do you need all the or part, match start and end of file and look behind for the actual match?

Also for paragraphs that are separated by one empty line the following counted # of paragraphs:
%s/^\n\{1}//n
%s/^\n//n
%s/\(^\s*$\)//n

It works simply b/c there's one empty line per paragraph. I still didn't figure how to match: possible empty line followed by one or more lines of text followed by an empty line.

Cheers,
Yosi

-> 
```

## 52.34 search for output of shell command

```text
Hi,

For example, search for line starting with current day (^17).
How can it be done?- The following doesn't work: /^r!date | awk
'{print $3}'
I tried a few permutations but didn't figure out how to make it one
liner (in two commands it's simple, read to register and use it's
content in search pattern).

TIA,
Yosi
	
On 06/20/2010 06:38 AM, Yosi Izaq wrote:

    For example, search for line starting with current day (^17).
    How can it be done?- The following doesn't work: /^r!date | awk
    '{print $3}'


For your particular use-case, I'd use vim's internal strftime() function:

 :nnoremap <f4> /^<c-r>=strftime('%d')<cr><bslash>><cr>
 :cnoremap <f4> <c-r>=strftime('%d')<cr>

You don't mention what single-digit dates look like in your file (whether they are left-justified, or padded with spaces or a leading zero).  So you might have to use "%e" (pad with spaces) instead of "%d" (pad with a zero) or strip the unwanted stuff:

:nnoremap <f4> /^<c-r>=substitute(strftime('%d'), '^0*', '', '')<cr><bslash>><cr>

:cnoremap <f4><c-r>=substitute(strftime('%d'), '^0*', '', '')<cr>

==========================

For your more general case, I'd use vim's system() function to call an external program or chain and return the output such as:

  system("date | awk '{print $3}'")

however, that returns the trailing newline, so you'd have to clean that out:

substitute(system("date | awk '{print $3}'"), '\D', '', 'g')


To get this into your search, you can either assign to the search register:

 :let @/ = substitute(system(...)...)

and then use n/N to navigate next/previous matches, or you can use expression register (as I do above with control+R followed by the "=" to allow you to enter an expression that gets evaluated and returned in your context).  You can read more at

 :help @/
 :h c_CTRL-R_=
 :h substitute()
 :h system()
 :h strftime()

Hope this helps,

-tim

-> 
```

## 52.35 how to display registers 0-9?- concise way & enhanced #,*

```text
Q:
Hi,

As per subject. Yes :reg 0123456789 will do but aside from map is
there a more concise way?

like:
:reg seq(0,9)

I know it doesn't work, is there an equivalent that does?
note, :regi could do but it's overkill and takes more time...

Oh, and is there a WORD search equivalent to #,* (that search word) w/
o mapping?- if not, is there a commonly used map?

TIA,
yosi

A: 
execute 'registers '.join(range(0, 9))
? ``execute'' may be truncated to ``exe'', ``registers'' to ``reg',' other part
cannot by truncated, but ``j<tab>'' gives ``join('' and ``r<tab>'' gives
``range(''.

:execute 'registers'.join(range(0,9))

Q:
Hi ZyX,

Your answer to first part if helpful, though I didn't understand
what's probably Russian.
Thanks!

Any idea re. how to search for WORD with */# shortcuts?- Can I make a
map like \* \# for that?- Or is there already a common mapping that
does the same?

Thanks,
Yosi

A:
There are two ways:
a. Somewhat destructive, but the most simple: yank the word and search for it:
      noremap <special> \* yiW/<C-r>=escape(@", '^$*~[]\')<CR>
b. Custom function, like I use in my transliteration plugin to transliterate
current word:
           let s:tWregs=[['\(\S*\)', '\(\S\+\|\%$\)'],
                        \['\(\s*\)', '\(\s*\)'      ],]
           function s:LRmatch(patlist)
               let line=getline('.')
               let column=col('.')
               let match=[]
               let i=0
               let lpatlist=len(a:patlist)
               while i<lpatlist && (match==[] || match[0]=='')
                   let pattern=a:patlist[i][0].'\%'.column.'c'.a:patlist[i][1]
                   let match=matchlist(line, pattern)
                   let i+=1
               endwhile
               let lmatch=match[1]
               let rmatch=match[2]
               return escape(lmatch.rmatch, '^$*~[]\')."\n"
           endfunction
           " You cannot use script global variables in mappings, but you can
           " define a wrapper function
           function s:Eval(str)
               return eval(a:str)
           endfunction
           noremap <expr> \* "/".<SID>LRmatch(<SID>Eval('s:tWregs'))
           noremap <expr> \# "?".<SID>LRmatch(<SID>Eval('s:tWregs'))

This is a bit complicated, but it does not do anything with registers content
(except current search register @/, of course)

A:
Thanks for the answers. 

I chose the first option and tweaked it a bit to work with more spec. chars and add \# (duh), ending up with:
noremap <special> \* yiW/<C-r>=escape(@", '^$*~[]\</>')<CR>
noremap <special> \# yiW?<C-r>=escape(@", '^$*~[]\</>')<CR>

I think it's useful enough to perhaps post as a tip.

Thanks again,
Yosi
```

## 52.36 how to read long shell output

```text
Q:
Hi,

	Say I'm executing a shell command with long output and want to read
	the results. Just running the cmd will only show the last lines of
	output. The question is how to make VIM present it in a scrollable
	window (w/o writing to explicit file...)?- Alternately, how to direct
	the output to quickfix or location list?

	Ex:
	! cd %:h && nm `find .. -name *.so ` <cr>

	output all the symbols in the shared object artifacts.

	Note, I read :h quickfix, didn't find the answer there.

	TIA,
	Yosi

A:
should work with standard unix command `less` and pipe , did you try
with it ?

! cd %:h && nm `find .. -name *.so ` | less <cr>

--
Best Regards,
Aaron Lewis - PGP: 0x4A6D32A0

A:
How about :r! nm `find %:h -name *.so ...` to redirect the output into a
scratch buffer?

regards,
	Christian

Q:
Aaron Lewis:
"
should work with standard unix command `less` and pipe , did you try
with it ?

! cd %:h && nm `find .. -name *.so ` | less <cr>
"

Doesn't work. See:
Error detected while processing /users/<user>/.vimrc:
line  534:
E492: Not an editor command:  less <cr>

Christian Brabandt:
"
How about :r! nm `find %:h -name *.so ...` to redirect the output into a
scratch buffer?
"

I did
:r! cd %:h && nm `find .. -name *.so ` <cr>

but output goes to current buffer, not scratch. I'm probably doing
something wrong, could you please point out what?

Thanks,
	Yosi

A:
Check out RunView (http://mysite.verizon.net/astronaut/vim/index.html#RUNVIEW)

Regards,
	Chip Campbell

A:
Hi yosi!

On So, 22 Aug 2010, yosi izaq wrote:

> I did
> :r! cd %:h && nm `find .. -name *.so ` <cr>
>
> but output goes to current buffer, not scratch. I'm probably doing
> something wrong, could you please point out what?

Well open a new buffer first ;)
:h :enew

regards,
Christian

A:
On Sun, Aug 22, 2010 at 6:16 PM, Charles E Campbell Jr wrote:
>
> Check out RunView
> (http://mysite.verizon.net/astronaut/vim/index.html#RUNVIEW)
>
> Regards,
> Chip Campbell
Looks cool but probably an overkill. That page seems to have a
treasure of useful scripts though.


On Sun, Aug 22, 2010 at 8:59 PM, Christian Brabandt wrote:
> Hi yosi!
>
...
> Well open a new buffer first ;)
> :h :enew
>
> regards,
> Christian
That would work but I'd prefer to avoid the inconvenience of opening a
new window


On Mon, Aug 23, 2010 at 3:23 AM, Aaron Lewis wrote:
>
> Escape '|' then , like
>
> map <S-P> :! cd %:h && nm `find .. -name *.so ` \| less <cr>
>
> Best Regards,
> Aaron Lewis - PGP: 0x4A6D32A0
> FingerPrint EA63 26B2 6C52 72EA A4A5 EB6B BDFE 35B0 4A6D 32A0
> irc: A4R0NL3WI5 on freenode

duh *slap on head*. Naturally, works like a charm. Thanks.

Thank you all for the prompt and helpfull answers. I give 10/10 points
to this awesome mailing list!
Yosi
```

## 52.37 How to emphesize or color a few key words on the fly?

```text
> I'm referring to something like syntax files do - color keywords of
> language.
> However, instead of static definition I'm looking for a convenient way to
> color, say in yellow, the last two or three searched patters. This could be
> useful when analyzing dense source code and I saw at least one IDE that
> supports this.

Probably this helps you

http://vim.wikia.com/wiki/Highlight_multiple_words

<URL:#r=Highlight_multiple_words>
> Short Q. plz. It so turns out that my two main keyboards are, albeit
> fancy and expensive, devoid of a keypad, My rudimentary understanding
> of VIM script language is not sufficient to circumvent that. I'd
> greatly appreciate any suggestion how to adapt to no-keypad keyboards.
>

Yikes, that is hard to find!

I think you'll need to modify this code:

   for i in range(1, 9)
     execute 'vnoremap <silent> <k'.i.'> :<C-U>call
<SID>DoHighlight('.i.', 1, v:count)<CR>'
     execute 'nnoremap <silent> <k'.i.'> :<C-U>call
<SID>DoHighlight('.i.', 2, v:count)<CR>'
   endfor

Change "<k'.i.'>" in these to "<Leader>'.i.'" or "<F10>'.i.'" or
whatever prefix you want to press before a normal numeric key to
trigger the desired highlight mapping.

--------------------------------------------------------------------------------
Note that for keyboards w/o keypad the mapping won't work so you could highlight manually for example, search a pattern then do
:Highlight 1 CTRL-R/ 
To use H11 color for the / register (last search)

	52.38
```
