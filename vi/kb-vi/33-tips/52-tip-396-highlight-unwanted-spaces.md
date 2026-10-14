---
type: reference
title: Tip 396 Highlight unwanted spaces
description: Subsection 33.53 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.53"
---

# 33.53 Tip 396 Highlight unwanted spaces

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

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
