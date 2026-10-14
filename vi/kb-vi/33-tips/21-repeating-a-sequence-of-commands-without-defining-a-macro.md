---
type: reference
title: Repeating a sequence of commands without defining a macro
description: Subsection 33.20 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.20"
---

# 33.20 Repeating a sequence of commands without defining a macro

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

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
