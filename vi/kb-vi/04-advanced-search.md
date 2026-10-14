---
type: reference
title: Advanced search.
description: Section 4 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#4"
---

# Advanced search.

[↑ KB_vi](/vi/kb-vi/README.md)

## 4.1 search multiple buffers.

```text
	:bufdo /searchstr/                : use :rewind to recommence search
	" multiple file search better but cheating
	:bufdo %s/searchstr/&/gic   : say n and then a to stop, case insensitive
	:bufdo %s/searchstr/&/gc   : say n and then a to stop, case sensitive
```

## 4.2 Print a list of lines that match a pattern in current open buffers:

```text
	:bufdo %g_searchstr_p
```

## 4.3 ignore case mode (useful for searches and replacements)

```text
	:set ic
	
	to turn off:
	:set noic

	# Double spacing:

	    * :%s/$/{ctrl-V}{CR}/g
	          This command applies an extra carriage return at the end of all lines 

	# Strip blanks at end of line:

		      * :%s/{TAB}*$// 

	# Strip DOS ctrl-M's:

		          * :1,$ s/{ctrl-V}{ctrl-M}// 


	Note: In order to enter a control character, one must first enter ctrl-v. This is true throughout vi. For example, if searching for a control character (i.e. ctrl-m): /ctrl-v ctrl-M If generating a macro and you need to enter esc without exiting the vi command line the esc must be prefixed with a ctrl-v: ctrl-v esc.
```

## 4.4 search for non-ascii chars.

### 4.4.1 Basic

```text
Tip 791 author zzapper

Occasionally when you've pasted into Vim from some other application, you get a pesky visible non-ascii character. You can do a ga command to see what it is, but you might want to search for it or substitute it.

Here's a technique. Place the cursor on the character, then:

yl # yank one character into unnamed buffer
/<C-R>" # pull unnamed buffer contents onto search (that's Control-R)

edit References

    * :help ga
    * :help c_CTRL-R 
```

### 4.4.2 Advanced

```text
	/[<C-V>128-<C-V>255<C-V>01-<C-V>31]
	where <C-V> is ctrl+V.

	To clean a file from control chatacters run:
	for ^I press ctrl+v, tab
	%s_^I__g  

	for ^[ press ctrl+v, esc
	%s_^[__g

	for ^M press ctrl+v, enter
	%s_^M__g

	for ^H press ctrl+v, backspace
	%s_^H__g
```

## 4.5 Search in range (block)

```text
You can limit the search command "/" to a certain range of lines by including
\%>l items.  For example, to match the word "limit" below line 199 and above
line 300: >
	/\%>199l\%<300llimit
Also see |/\%>l|.

Another way is to use the ":substitute" command with the 'c' flag.  Example: >
   :.,300s/Pattern//gc
This command will search from the cursor position until line 300 for
"Pattern".  At the match, you will be asked to type a character.  Type 'q' to
stop at this match, type 'n' to find the next match.

	A flavor of this is using visualization to search a certain block. Example, search inside the body of a C++ function.
	go to function, type vi{  (stands for Visualize Inside { } block)
	Then :s/Pattern//gc
	Type q to quit and n to next match

	On the same vein, its possible to search between marks:
	" To search for string between mark a and mark b:
	:'a,'bg/^/s/pattern/&/igc  

	Using visualization its possible to either visualize range and search "normally" and the search will be limited to the visualized section. Its also posisble to search in the previously visualized block using: /\%Vpattern
```

## 4.6 Search across multiple lines

### 4.6.1 http://vim.wikia.com/wiki/VimTip242

```text
Created: May 6, 2002 Complexity: intermediate Author: vim_power

One of the most uncelebrated features of Vim is the ability to span a search across multiple lines.

\_^  matches start-of-line anywhere in search pattern
\_$  matches end-of-line anywhere in search pattern
\_s  matches a space anywhere in search pattern

e.g /{\_s will match all white spaces and new-line chars after a "{"

The \_ can be appended to other objects as well. such as \_U, \_L, \_. (this one's risky).
 References

    * :help pattern 

 Comments

To seek out HTML comments over multiple lines, for example:

<!-- foobar does
 not exist -->

Use the search:

/<!--\_p\{-}-->

We used \{-} the "few as possible" operator rather than * which is too greedy when there are many such comments in the file.

The key is of course \_p which is printable characters including EOL end-of-lines.

However, the highlighting is very erratic when the span over number of lines exceeds, say, 30. And highlighting is rather spotty when there are shifts in screen views. This is due to the default that improves highlighting performance.

If you want to ensure the most accurate highlighting, try:

:syntax sync fromstart

This can slow things down on large files with complex highlighting :help :syn-sync

For some reason <!--\_p\{-}--> doesn't work if your comments are indented (with opening and closing comment tag indented).

Here's another way to highlight HTML comments using conventional regex:

/<\!--\(.\|\n\)*-->

However, this one will spill over to the next comment if there's more than one so it's not too useful.

The TAB character is among the control chars, thus not matched with \p per default. 
```

#### 4.6.1.1 Example

```text
To search for start_pattern.*end_pattern over possible multiple lines do:
/start_pattern\_p\{-}end_pattern
```

### 4.6.2 Update version 12/01/2010

```text
Vim can search for text that spans multiple lines. For example, the search /hello\_sworld finds "hello world" in a single line, and also finds "hello" ending one line, with "world" starting the next line.

This tip shows how to search over multiple lines, and presents a useful command so entering :S hello world finds "hello" followed by "world" separated by spaces or tabs or newlines, and :S! hello world allows any non-word characters, including newlines, between the words.
Contents

    * 1 Patterns including end-of-line
    * 2 Searching for multiline HTML comments
    * 3 Searching for words over multiple lines
    * 4 See also
    * 5 References
    * 6 Comments
```

#### 4.6.2.1 Patterns including end-of-line

```text
The search /^abc finds abc at the beginning of a line, and /abc$ find abc at the end of a line. However, in /abc^def and /abc$def the ^ and $ are just ordinary characters with no special meaning. By contrast, each of the following has a special meaning anywhere in a search pattern.
\n 	a newline character
\_s 	a whitespace (space or tab) or newline character
\_^ 	the beginning of a line (zero width)
\_$ 	the end of a line (zero width)
\_. 	any character including a newline

Example searches:

/abc\n*def
    Finds abc followed by zero or more newlines then def. 
    Finds abcdef or abc followed by blank lines and def. 
    The blank lines have to be empty (no space or tab characters). 

/abc\_s*def
    Finds abc followed by any whitespace or newlines then def. 
    Finds abcdef or abc followed by blank lines and def. 
    The blank lines can contain any number of space or tab characters. 
    There may be whitespace after abc or before def. 

/abc\_$\_s*def
    Finds abc at end-of-line followed by any whitespace or newlines then def. 
    There must be no characters (other than a newline) following abc. 
    There can be any number of space, tab or newline characters before def. 

/abc\_s*\_^def
    Finds abc followed by any whitespace or newlines then def where def begins a line. 
    There must be no characters (other than a newline) before def. 
    There can be any number of space, tab or newline characters after abc. 

/abc\_$def
    Finds nothing because \_$ is "zero width" so the search is looking for abcdef where abc is also at end-of-line (which cannot occur). 

/abc\_^def
    Finds nothing because \_^ is "zero width" so the search is looking for abcdef where def is also at beginning-of-line (which cannot occur). 

/abc\_.\{-}def
    Finds abc followed by any characters or newlines (as few as possible) then def. 
    Finds abcdef or abc followed by any characters then def. 
```

#### 4.6.2.2 Searching for multiline HTML comments

```text
It is common for comments in HTML documents to span several lines:

<!-- This comment
 covers two lines. -->

The following search finds any HTML comment:

/<!--\_.\{-}-->

The atom \_. finds any character including end-of-line. The multi \{-} matches as few as possible (stopping at the first "-->"; the multi * is too greedy and would stop at the last occurrence).

Syntax highlighting may be not be accurate, particularly with long comments. The following command will improve the accuracy when jumping in the file, but may be slower (:help :syn-sync):

:syntax sync fromstart
```

#### 4.6.2.3 Searching for words over multiple lines

```text
The script below defines command :S that will search for a phrase, even when the words are on different lines. Examples:

:S hello world
    Searches for "hello" followed by "world", separated by whitespace including newlines. 
:S! hello world
    Searches for "hello" followed by "world", separated by any non-word characters (whitespace, newlines, punctuation). 
    Finds, for example, "hello, world" and "hello+world" and "hello ... world". The two words can be on different lines. 

After entering the command, press n or N to search for the next or previous occurrence.

Put the following in your vimrc (or in file searchmultiline.vim in your plugin directory):

" Search for the ... arguments separated with whitespace (if no '!'),
" or with non-word characters (if '!' added to command).
function! SearchMultiLine(bang, ...)
  if a:0 > 0
    let sep = (a:bang) ? '\_W\+' : '\_s\+'
    let @/ = join(a:000, sep)
  endif
endfunction
command! -bang -nargs=* -complete=tag S call SearchMultiLine(<bang>0, <f-args>)|normal! /<C-R>/<CR>
```

#### 4.6.2.4 See also

```text
    * Search for visually selected text to search for selected text; finds targets on multiple lines 
```

#### 4.6.2.5 References

```text
    * :help pattern 
```

#### 4.6.2.6 Comments

```text
	4.6.3
```
