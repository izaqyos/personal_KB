---
type: reference
title: Tip 330 How to stop auto indenting
description: "Vim tip: Tip 330 How to stop auto indenting (Disabling auto indent for the current file, Comments)"
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.55"
---

# 33.55 Tip 330 How to stop auto indenting

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

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
