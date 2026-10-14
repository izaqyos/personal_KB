---
type: reference
title: "https://github.com/airblade/vim-gitgutter"
description: "Vim plugin notes: https://github.com/airblade/vim-gitgutter"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.55"
---

# 19.55 https://github.com/airblade/vim-gitgutter

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

```text
install:
mkdir -p ~/.vim/pack/airblade/start
cd ~/.vim/pack/airblade/start
git clone https://github.com/airblade/vim-gitgutter.git
vim -u NONE -c "helptags vim-gitgutter/doc" -c q

Getting started
When you make a change to a file tracked by git, the diff markers should appear automatically. The delay is governed by vim's updatetime option; the default value is 4000, i.e. 4 seconds, but I suggest reducing it to around 100ms (add set updatetime=100 to your vimrc). Note updatetime also controls the delay before vim writes its swap file (see :help updatetime).

You can jump between hunks with [c and ]c. You can preview, stage, and undo hunks with <leader>hp, <leader>hs, and <leader>hu respectively.

You cannot unstage a staged hunk.

After updating the signs, the plugin fires the GitGutter User autocommand.

After staging a hunk or part of a hunk, the plugin fires the GitGutterStage User autocommand.

Activation
You can explicitly turn vim-gitgutter off and on (defaults to on):

turn off with :GitGutterDisable
turn on with :GitGutterEnable
toggle with :GitGutterToggle.
To toggle vim-gitgutter per buffer:

turn off with :GitGutterBufferDisable
turn on with :GitGutterBufferEnable
toggle with :GitGutterBufferToggle
You can turn the signs on and off (defaults to on):

turn on with :GitGutterSignsEnable
turn off with :GitGutterSignsDisable
toggle with :GitGutterSignsToggle.
And you can turn line highlighting on and off (defaults to off):

turn on with :GitGutterLineHighlightsEnable
turn off with :GitGutterLineHighlightsDisable
toggle with :GitGutterLineHighlightsToggle.
Note that if you have line highlighting on and signs off, you will have an empty sign column – more accurately, a sign column with invisible signs. This is because line highlighting requires signs and Vim/NeoVim always shows the sign column when there are signs even if the signs are invisible.

With Neovim 0.3.2 or higher, you can turn line number highlighting on and off (defaults to off):

turn on with :GitGutterLineNrHighlightsEnable
turn off with :GitGutterLineNrHighlightsDisable
toggle with :GitGutterLineNrHighlightsToggle.
The same caveat applies to line number highlighting as to line highlighting just above.

If you switch off both line highlighting and signs, you won't see the sign column.

In older Vims (pre 8.1.0614 / Neovim 0.4.0) vim-gitgutter will suppress the signs when a file has more than 500 changes, to avoid slowing down the UI. As soon as the number of changes falls below the limit vim-gitgutter will show the signs again. You can configure the threshold with:

let g:gitgutter_max_signs = 500  " default value (Vim < 8.1.0614, Neovim < 0.4.0)
let g:gitgutter_max_signs = -1   " default value (otherwise)
You can also remove the limit by setting g:gitgutter_max_signs = -1.

Hunks
You can jump between hunks:

jump to next hunk (change): ]c
jump to previous hunk (change): [c.
Both of those take a preceding count.

To set your own mappings for these, for example ]h and [h:

nmap ]h <Plug>(GitGutterNextHunk)
nmap [h <Plug>(GitGutterPrevHunk)
When you jump between hunks, a message like Hunk 4 of 11 is shown on the command line. If you want to turn the message off, you can use:

let g:gitgutter_show_msg_on_hunk_jumping = 0
You can load all your hunks into the quickfix list with :GitGutterQuickFix. Note this ignores any unsaved changes in your buffers. If the option g:gitgutter_use_location_list is set, this command will load hunks into the current window's location list instead. Use :copen (or :lopen) to open the quickfix / location list or add a custom command like this:

command! Gqf GitGutterQuickFix | copen
You can stage or undo an individual hunk when your cursor is in it:

stage the hunk with <Leader>hs or
undo it with <Leader>hu.
To stage part of an additions-only hunk by:

either visually selecting the part you want and staging with your mapping, e.g. <Leader>hs;
or using a range with the GitGutterStageHunk command, e.g. :42,45GitGutterStageHunk.
To stage part of any hunk:

preview the hunk, e.g. <Leader>hp;
move to the preview window, e.g. :wincmd P;
delete the lines you do not want to stage;
stage the remaining lines: either write (:w) the window or stage via <Leader>hs or :GitGutterStageHunk.
Note the above workflow is not possible if you have opted in to preview hunks with Vim's popup windows.

See the FAQ if you want to unstage staged changes.

The . command will work with both these if you install repeat.vim.

To set your own mappings for these, for example if you prefer g-based maps:

nmap ghs <Plug>(GitGutterStageHunk)
nmap ghu <Plug>(GitGutterUndoHunk)
And you can preview a hunk's changes with <Leader>hp. The location of the preview window is configured with g:gitgutter_preview_win_location (default 'bo'). You can of course change this mapping, e.g:

nmap ghp <Plug>(GitGutterPreviewHunk)
A hunk text object is provided which works in visual and operator-pending modes.

ic operates on all lines in the current hunk.
ac operates on all lines in the current hunk and any trailing empty lines.
To re-map these, for example to ih and ah:

omap ih <Plug>(GitGutterTextObjectInnerPending)
omap ah <Plug>(GitGutterTextObjectOuterPending)
xmap ih <Plug>(GitGutterTextObjectInnerVisual)
xmap ah <Plug>(GitGutterTextObjectOuterVisual)
If you don't want vim-gitgutter to set up any mappings at all, use this:

let g:gitgutter_map_keys = 0
Finally, you can force vim-gitgutter to update its signs across all visible buffers with :GitGutterAll.

See the customisation section below for how to change the defaults.

Vimdiff
Use the GitGutterDiffOrig command to open a vimdiff view of the current buffer, respecting g:gitgutter_diff_relative_to and :gitgutter_diff_base.

Folding
Use the GitGutterFold command to fold all unchanged lines, leaving just the hunks visible. Use zr to unfold 3 lines of context above and below a hunk.

Execute GitGutterFold a second time to restore the previous view.

Use gitgutter#fold#foldtext() to augment the default foldtext() with an indicator of whether the folded lines have been changed.

set foldtext=gitgutter#fold#foldtext()
For a closed fold with changed lines:

Default foldtext():         +-- 45 lines: abcdef
gitgutter#fold#foldtext():  +-- 45 lines (*): abcdef
You can use gitgutter#fold#is_changed() in your own foldtext expression to find out whether the folded lines have been changed.

Status line
Call the GitGutterGetHunkSummary() function from your status line to get a list of counts of added, modified, and removed lines in the current buffer. For example:

" Your vimrc
function! GitStatus()
  let [a,m,r] = GitGutterGetHunkSummary()
  return printf('+%d ~%d -%d', a, m, r)
endfunction
set statusline+=%{GitStatus()}
```
