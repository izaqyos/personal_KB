---
type: reference
title: Removing automatic comment leaders
description: Subsection 33.30 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.30"
---

# 33.30 Removing automatic comment leaders

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
http://vim.wikia.com/wiki/VimTip129
Created: October 7, 2001 Complexity: basic Author: Benji Fisher

If you include the "r" or "o" flag in the 'formatoptions' option (:help 'fo', :help fo-table) then the comment leader is inserted automatically when you start a new line in a comment. For example, in TeX the "%" character is the comment leader, and you might type

% This is a tex file.
% The comment leaders on all lines but the first were generated automatically.
% This is the last line of the comment, but Vim will insert the comment leader on the next line.
%

You can get rid of the comment leader (along with anything you may already have typed on the line) without affecting the indent, if any, by typing <C-U> while in Insert mode (in case you do this by accident, there are ways to undo it).

( Recover from accidental Ctrl-U
  You can accidentally lose text that you're typing in  text that you can't recover with undo. This tip allows you to recover your lost text, and to avoid future problems with a mapping.

In insert mode, pressing Ctrl-u deletes text you've typed in the current line, and Ctrl-w deletes the word before the cursor. You can't undo these deletions. However, what you've typed is still in the . register. You can confirm that (after pressing Esc to return to normal mode) with the command :reg which will list all registers (or just :reg . to display the . register). You may be able to copy the missing text from the register display, for example, with the mouse.

Unfortunately, simply pasting the . register won't help because it will repeat the Ctrl-u or Ctrl-w and will delete the text again. However, you can use another register (register a in the following):

:let @a = @.
"aP

The above will paste all the text you last inserted, including what was accidentally deleted.

To avoid the problem in the future, put the following in your vimrc:

inoremap <c-u> <c-g>u<c-u>
inoremap <c-w> <c-g>u<c-w>

Now Ctrl-u and Ctrl-w will work as before, but they first use Ctrl-g u to start a new change, as far as undo is concerned. For example, in insert mode, you might type several lines then accidentally press Ctrl-u which deletes the last line. If you have used the above mapping, you can press Esc to return to normal mode, then u to undo, which will recover the last line.

Generally, when you insert text (after an i or o or other similar command) you make a single modification to the file that forms one undo block. Pressing Ctrl-u or Ctrl-w while in insert mode is just part of that single modification. After pressing Esc to return to Normal mode, if you press u you will undo all your typing. Therefore, you have lost text deleted with Ctrl-u or Ctrl-w.

However, some insert-mode commands break the undo block so the insertion consists of more than a single modification. One of those commands is Ctrl-g u.

    * :help i_CTRL-U Insert mode: <c-u> deletes text entered in the current line.
    * :help i_CTRL-W Insert mode: <c-w> deletes word before cursor.
    * :help i_CTRL-G_u Insert mode: <c-g> u starts a new change.
    * :help ins-special-special Insert mode: Commands which start a new change. 


The following allows you to paste all of "., while using backspace to delete the Ctrl-u at the end (assuming you accidentally typed Ctrl-u):

:put ='<C-R><C-R>.<BS>'

The above command puts the '...' string following the expression register =. Using Ctrl-r twice inserts text from the following register literally.

    * :help c_CTRL-R_CTRL-R
    * :help "=

)'"

Related point: If you want to adjust the indent while in insert mode, you can use <C-D> (to decrease the indent) or <C-T> (to increase it)
```
