---
type: reference
title: Gundo
description: "Vim plugin notes: Gundo"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "vi/KB_vi#19.35"
---

# 19.35 Gundo

> **Deprecated (2026-10):** Py2 requirement; plugin superseded. Current: Native persistent undo / undotree. Source: <https://vimhelp.org/repeat.txt.html>

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
Graph your Vim undo tree in style.

gundo
You know that Vim lets you undo changes like any text editor. What you might not know is that it doesn't just keep a list of your changes — it keeps a tree of them.

Say you make a change (call it X), undo that change, and then make another change (call it Y). With most editors, change X is now gone forever. With Vim you can get it back.

The problem is that trying to do this in the real world is painful. Vim gives you an :undolist command that shows you the leaves of the tree. Good luck finding the change you want in that list.

Gundo is a plugin to make browsing this ridiculously powerful undo tree less painful.

Check out this quick screencast if you want to see it in action.

Requirements
Installation
Usage
Configuration
g:gundo_width
g:gundo_preview_height
g:gundo_preview_bottom
g:gundo_right
g:gundo_help
g:gundo_disable
g:gundo_map_move_[older/newer]
g:gundo_close_on_revert
g:gundo_[preview/tree]_statusline
g:gundo_auto_preview
g:gundo_playback_delay
License
Bugs
Contributing
Changelog
Credits
Requirements

Gundo requires Vim 7.3+ compiled with Python support, and Python 2.4+.

Installation

Use Pathogen. Don't use pathogen? Start.

hg clone http://bitbucket.org/sjl/gundo.vim ~/.vim/bundle/gundo
There's a git mirror if you prefer:

git clone http://github.com/sjl/gundo.vim.git ~/.vim/bundle/gundo
Add a mapping to your ~/.vimrc (change the key to suit your taste):

nnoremap <F5> :GundoToggle<CR>
Usage

We'll get to the technical details later, but if you're a human the first thing you need to do is add a mapping to your vimrc file to toggle the undo graph:

nnoremap <F5> :GundoToggle<CR>
Change the mapped key to suit your taste. We'll stick with <F5> because that's what the author uses.

Now you can press <F5> to toggle the undo graph and preview pane, which will look something like this:

  Undo graph                          File
+-----------------------------------+---------------------------+
| " Gundo for something.txt [1]     |one                        |
| " j/k  - move between undo states |two                        |
| " <cr> - revert to that state     |three                      |
|                                   |five                       |
| @  [5] 3 hours ago                |                           |
| |                                 |                           |
| | o  [4] 4 hours ago              |                           |
| | |                               |                           |
| o |  [3] 4 hours ago              |                           |
| | |                               |                           |
| o |  [2] 4 hours ago              |                           |
| |/                                |                           |
| o  [1] 4 hours ago                |                           |
| |                                 |                           |
| o  [0] Original                   |                           |
+-----------------------------------+                           |
| --- 3 2010-10-12 06:27:35 PM      |                           |
| +++ 5 2010-10-12 07:38:37 PM      |                           |
| @@ -1,3 +1,4                      |                           |
|  one                              |                           |
|  two                              |                           |
|  three                            |                           |
| +five                             |                           |
+-----------------------------------+---------------------------+
  Preview pane
Your current position in the undo tree is marked with an @ character. Other nodes are marked with an o character.

When you toggle open the graph Gundo will put your cursor on your current position in the tree. You can move up and down the graph with the j and k keys.

You can move to the top of the graph (the newest state) with gg and to the bottom of the graph (the oldest state) with G.

As you move between undo states the preview pane will show you a unified diff of the change that state made.

Pressing return on a state (or double clicking on it) will revert the contents of the file to match that state.

You can use p on a state to make the preview window show the diff between your current state and the selected state, instead of a preview of what the selected state changed.

Pressing P while on a state will initiate "play to" mode targeted at that state. This will replay all the changes between your current state and the target, with a slight pause after each change. It's mostly useless, but can be fun to watch and see where your editing lags — that might be a good place to define a new mapping to speed up your editing.

Pressing q while in the undo graph will close it. You can also just press your toggle mapping key.

Configuration

You can tweak the behavior of Gundo by setting a few variables in your :vimrc file. For example:

let g:gundo_width = 60
let g:gundo_preview_height = 40
let g:gundo_right = 1
g:gundo_width

Set the horizontal width of the Gundo graph (and preview).

Default: 45

g:gundo_preview_height

Set the vertical height of the Gundo preview.

Default: 15

g:gundo_preview_bottom

Force the preview window below current windows instead of below the graph. This gives the preview window more space to show the unified diff.

Example:

+--------+            +--------+
!g!      !            !      !g!
!g!      !     or     !      !g!
!g!______!            !______!g!
!g!pppppp!            !pppppp!g!
+--------+            +--------+
Default: 0

g:gundo_right

Set this to 1 to make the Gundo graph (and preview) open on the right side instead of the left.

Default: 0 (off, open on the left side)

g:gundo_help

Set this to 0 to disable the help text in the Gundo graph window.

Default: 1 (show the help)

g:gundo_disable

Set this to 1 to disable Gundo entirely.

Useful if you use the same ~/.vim folder on multiple machines, and some of them may not have Python support.

Default: 0 (Gundo is enabled as usual)

g:gundo_map_move_[older/newer]

These options let you change the keys that navigate the undo graph. This is useful if you use a Dvorak keyboard and have changed your movement keys.

Default:
gundo_map_move_older: "j"
gundo_map_move_newer: "k"

g:gundo_close_on_revert

Set this to 1 to automatically close the Gundo windows when reverting.

Default: 0 (windows do not automatically close)

g:gundo_[preview/tree]_statusline

Set this to 0 to disable automatically rendering preview diffs as you move through the undo tree (you can still render a specific diff with r). This can be useful on large files and undo trees to speed up Gundo.

Default: unset (windows use the default statusline)

g:gundo_auto_preview

Set this to 1 to rendering diff automatically with cursor move.

Default: 1 (auto preview diff)

g:gundo_playback_delay

This is the delay in milliseconds between each change when running 'play to' mode. Set this to a higher number for a slower playback or to a lower number for a faster playback.

Default: 60
```
