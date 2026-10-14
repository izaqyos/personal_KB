---
type: reference
title: Using command-line history
description: Subsection 33.41 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.41"
---

# 33.41 Using command-line history

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

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
