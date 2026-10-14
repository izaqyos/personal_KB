---
type: reference
title: Find in files within Vim
description: "Vim tip: Find in files within Vim (Basic use, Tips and Tricks, Disabling autocmds for fast searches)"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.59"
---

# 33.59 Find in files within Vim

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

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
