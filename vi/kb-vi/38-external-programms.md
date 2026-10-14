---
type: reference
title: External programms
description: Section 38 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#38"
---

# External programms

[↑ KB_vi](/vi/kb-vi/README.md)

## 38.1 Make

```text
		39.1.1 set makeprg to work for maven and allow vim working directory to be base of project yet make only current files module
		makeprg=mvnc\ %<
		meaning pass to mvnc the current file name (so that mvnc will compile to corresponding directory in the source code tree)

When mvnc is:
$ which mvnc
/users/<user>/work/scripts/util/mvnc
$ cat `which mvnc`
#!/usr/bin/bash
CUR_PATH=`echo $1 |  sed -e 's_/src.*__'` #Extract the directory containing the current file
shift
echo "Changing dir to ${CUR_PATH}"
cd ${CUR_PATH}

mvn $@ #Run with any further parameters such as, compile, install, clean etc


		39.1.2 set makeprg to work for clearmake and allow vim working directory to be base of project yet make only current files module

		: set makeprg=my_cmake_t\ %<
$ cat my_*
my_cmake_t

#!/bin/bash

file=$1
fpath=$(readlink -f "$file")
fdir=${fpath%/*}
echo "Executing cmake for file $file, path $fpath,  at dir $fdir"

cd $fdir
clearmake -C gnu test 
cd -


my_cmake
#!/bin/bash

file=$1
fpath=$(readlink -f "$file")
fdir=${fpath%/*}
echo "Executing cmake for file $file, path $fpath,  at dir $fdir"

cd $fdir
clearmake -C gnu test 
cd -

		39.1.3
```

### 38.1.2 :comp[iler][!] {name}

## 38.2 Insert date

### 38.2.1 Unix

```text
		(only works for Linux/Unix systems)
		:r!date
```

### 38.2.2 Windows, MAC etc

```text
Tip 97 

There are a variety of ways to insert a date/time stamp. You can even have Vim automatically update an existing 'last modified' date/time when writing the file.
Contents

    * 1 Using strftime()
          o 1.1 Some strftime() format string examples
    * 2 Using external tools
    * 3 Automatically update timestamps
    * 4 Updating a DNS SOA serial number
    * 5 See also
    * 6 Comments
```

#### 38.2.2.1 edit Using strftime()

```text
Vim's internal strftime() function (:help strftime()) returns a date/time string formatted in a way you specify with a format string. Most systems support strftime(), but some don't. To store the return value of the function, the "= register (:help "=) is used. Here's a bunch of examples:

Press F5 in normal mode or in insert mode to insert the current datestamp: :help i_CTRL-R

:nnoremap <F5> "=strftime("%c")<CR>P
:inoremap <F5> <C-R>=strftime("%c")<CR>

In the example above, the uppercase P at the end inserts before the current character, which allows datestamps inserted at the beginning of an existing line. Other 'put' commands may be more useful for you: :help p :help P :help gp :help gP

Type dts in insert mode to expand to a datestamp: :help abbreviations

:iab dts <C-R>=strftime("%c")<CR>

To replace text with the current date in a substitute command:

:s/text to replace/\=strftime("%c")/

Vary the format string (the "%c" argument), to change how the time and/or date are displayed. For some formats, the result may depend on your locale. :help :language

The specification for the format string itself depends on the implementation of strftime() on your platform. For details, Unix users may refer to the strftime(3) man page, by running 'man 3 strftime'.

"
```

#### 38.2.2.1.1 Some strftime() format string examples

```text
Format String              Example output
-------------              --------------
%c                         Thu 27 Sep 2007 07:37:42 AM EDT (depends on locale)
%a %d %b %Y                Thu 27 Sep 2007
%b %d, %Y                  Sep 27, 2007
%d/%m/%y %H:%M:%S          27/09/07 07:36:32
%H:%M:%S                   07:36:44
%T                         07:38:09
%m/%d/%y                   09/27/07
%y%m%d                     070927
%x %X (%Z)                 09/27/2007 08:00:59 AM (EDT)

RFC822 format:
%a, %d %b %Y %H:%M:%S %z   Wed, 29 Aug 2007 02:37:15 -0400

ISO8601/W3C format (http://www.w3.org/TR/NOTE-datetime):
%FT%T%z                    2007-08-29T02:37:13-0400

"
```

#### 38.2.2.2 edit Using external tools

```text
On Unix-based systems, enter the following in Vim to read the output from running the date utility, inserting the result after the current line:

:r!date

Under Windows, use:

:r!date /t

"
```

#### 38.2.2.3 edit Automatically update timestamps

```text
You might want to automatically update existing time stamps when writing a file.

This is a solution for html implemented as an autocmd which fires when the file is written:

:au BufWritePre *.html exe "norm mz"|exe '%s/\(<!-- DATE -->\).\{-}\d\d:\d\d:\d\d/\1'.strftime("%b %d, %Y %X")."/e"|norm `z

That way a string of the form Aug 13, 2001 14:19:50 is embedded in the text, and it will be updated to the current date and time automatically, every time the file is saved (the ...DATE... stuff is an HTML comment which won't appear in an HTML document).

This is a general solution:

" If buffer modified, update any 'Last modified: ' in the first 20 lines.
" 'Last modified: ' can have up to 10 characters before (they are retained).
" Restores position using s mark.
function! LastModified()
  if &modified
    normal ms
    let n = min([20, line("$")])
    exe '1,' . n . 's#^\(.\{,10}Last modified: \).*#\1' .
          \ strftime('%a %b %d, %Y  %I:%M%p') . '#e'
    normal `s
  endif
endfun
autocmd BufWritePre * call LastModified()

	"
```

#### 38.2.2.4 Updating a DNS SOA serial number

```text
When manually editing a zone file for a DNS name server, the serial number in the SOA record needs to be updated. Often a ten-digit number is used, consisting of a timestamp of the form "YYYYMMDD" and a two-digit version number. For example, "2009042101" might represent update number 01 on 21 April 2009.

The following mapping finds the next 10-digit number, and replaces it with a timestamp + "00", and shows the original number in the message line (so you can see what change occurred):

:nnoremap <F8> /\<\d\{10}\><CR>ce<C-r>=strftime("%Y%m%d00")<CR><Esc>:echo @"<CR>

For example, if the date today is 21 April 2009 and the next ten-digit number after the cursor is "2008123002", pressing the F8 key would change the number to "2009042100", and would display "2008123002" in the message line at the bottom of the window.

The command searches for \< (beginning word), followed by 10 digits, followed by \> (end word). The ce changes to the end of the word (deleting the number to the unnamed register), then inserts (Ctrl-r) the value of register = (which evaluates the following expression). 


"

	38.3
```
