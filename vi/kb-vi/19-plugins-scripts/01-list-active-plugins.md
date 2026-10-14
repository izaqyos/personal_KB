---
type: reference
title: list active plugins
description: "Vim plugin notes: list active plugins (list active plugins chatgpt)"
tags: [data-structures, vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.0"
---

# 19.0 list active plugins , tags: list active plugins

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

### 19.0.1 list active plugins chatgpt

```text
To list active plugins in Vim, you can use the following command within Vim:

:scriptnames
This command will display a list of all the scripts and plugins that are currently active in your Vim session. The output will show the path to each script or plugin file loaded by Vim, and you can identify the active plugins based on their filenames or paths.

Additionally, if you're using a plugin manager like Vundle, Pathogen, or Vim-Plug, you can refer to their specific documentation or configuration files to see a list of installed and active plugins.

Here are a few examples of popular plugin managers and their respective commands to list active plugins:

Vundle:

Open your .vimrc or .vim/vimrc file.
Look for lines starting with Plugin or Bundle.
Each line represents an active plugin.
Pathogen:

Navigate to the ~/.vim/bundle directory (or your custom bundle directory).
Each subdirectory represents an active plugin.
Vim-Plug:

Open your .vimrc or .vim/vimrc file.
Look for lines starting with Plug.
Each line represents an active plugin.
Remember to save your configuration file after making any changes and restart Vim to ensure the plugins are loaded correctly.
```

#### 19.0.1.1 03/07/23 17:31:09 plugins list

````text
To save the output of a Vim command to a file, you can use the `:redir` command in combination with the `:w` command. Here's an example:

| 1. Open the file in Vim.
| 2. Run the command and redirect the output to a file using `:redir`.
| 3. Specify the file path where you want to save the output using `:w`.
| 4. Exit the `:redir` mode using `:redir END`.

Here's an example that demonstrates how to save the output of the `:scriptnames` command to a file named "plugin_list.txt":

```
:redir > plugin_list.txt
:scriptnames
:w
:redir END
```

After running these commands, Vim will create a file named "plugin_list.txt" in the current directory (or overwrite an existing file with the same name). The file will contain the output of the `:scriptnames` command.

You can modify the file path and name as per your preference.

|  1: /Applications/MacVim.app/Contents/Resources/vim/vimrc
|  2: ~/.vimrc
|  3: ~/.vim/autoload/pathogen.vim - plugin manager
|  4: /Applications/MacVim.app/Contents/Resources/vim/runtime/filetype.vim
|  5: ~/.vim/bundle/tern_for_vim/ftdetect/tern.vim - https://github.com/ternjs/tern_for_vim
|  6: ~/.vim/bundle/ultisnips/ftdetect/snippets.vim - https://github.com/SirVer/ultisnips
|  7: ~/.vim/bundle/vim-javascript/ftdetect/flow.vim
|  8: ~/.vim/bundle/vim-javascript/ftdetect/javascript.vim - https://vimawesome.com/plugin/vim-javascript, last updated 2 years ago
|  9: /Applications/MacVim.app/Contents/Resources/vim/runtime/ftplugin.vim
| 10: /Applications/MacVim.app/Contents/Resources/vim/runtime/indent.vim
| 11: /Applications/MacVim.app/Contents/Resources/vim/runtime/syntax/syntax.vim
| 12: /Applications/MacVim.app/Contents/Resources/vim/runtime/syntax/synload.vim
| 13: /Applications/MacVim.app/Contents/Resources/vim/runtime/syntax/syncolor.vim
| 14: /Applications/MacVim.app/Contents/Resources/vim/runtime/colors/lists/default.vim
| 15: ~/.vim/colors/eva01.vim
| 16: ~/.vim/bundle/airline/plugin/airline.vim -https://github.com/vim-airline/vim-airline, better status line
| 17: ~/.vim/bundle/airline/autoload/airline/init.vim
| 18: ~/.vim/bundle/airline/autoload/airline/parts.vim
| 19: ~/.vim/bundle/ale/plugin/ale.vim - https://github.com/dense-analysis/ale , syntax checker
| 20: ~/.vim/bundle/ale/autoload/ale/events.vim
| 21: ~/.vim/bundle/AutoComplPop/plugin/acp.vim - removed
| 22: ~/.vim/bundle/AutoComplPop/autoload/acp.vim
| 23: ~/.vim/bundle/braceless/plugin/braceless.vim - text objects for python, https://github.com/tweekmonster/braceless.vim
| 24: ~/.vim/bundle/conque-term/plugin/conque_term.vim
| 25: ~/.vim/bundle/ctrlp/plugin/ctrlp.vim
| 26: ~/.vim/bundle/ctrlp/autoload/ctrlp/mrufiles.vim
| 27: ~/.vim/bundle/exvisincr/plugin/visincrPlugin.vim
| 28: ~/.vim/bundle/fzf/plugin/fzf.vim
| 29: ~/.vim/bundle/gv.vim/plugin/gv.vim
| 30: ~/.vim/bundle/largeFile/plugin/LargeFile.vim
| 31: ~/.vim/bundle/matchit/plugin/matchit.vim
| 32: ~/.vim/bundle/minibufexpl/plugin/minibufexpl.vim
| 33: ~/.vim/bundle/neodebug/plugin/NeoDebug.vim
| 34: ~/.vim/bundle/nerdtree/plugin/NERD_tree.vim
| 35: ~/.vim/pack/plugins/start/nerdtree/autoload/nerdtree.vim
| 36: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/path.vim
| 37: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/menu_controller.vim
| 38: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/menu_item.vim
| 39: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/key_map.vim
| 40: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/bookmark.vim
| 41: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/tree_file_node.vim
| 42: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/tree_dir_node.vim
| 43: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/opener.vim
| 44: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/creator.vim
| 45: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/flag_set.vim
| 46: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/nerdtree.vim
| 47: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/ui.vim
| 48: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/event.vim
| 49: ~/.vim/pack/plugins/start/nerdtree/lib/nerdtree/notifier.vim
| 50: ~/.vim/pack/plugins/start/nerdtree/autoload/nerdtree/ui_glue.vim
| 51: ~/.vim/pack/plugins/start/nerdtree-git-plugin/nerdtree_plugin/git_status.vim
| 52: ~/.vim/pack/plugins/start/nerdtree-git-plugin/autoload/gitstatus.vim
| 53: ~/.vim/pack/plugins/start/nerdtree-git-plugin/autoload/gitstatus/log.vim
| 54: ~/.vim/pack/plugins/start/nerdtree-git-plugin/autoload/gitstatus/listener.vim
| 55: ~/.vim/pack/plugins/start/nerdtree/nerdtree_plugin/exec_menuitem.vim
| 56: ~/.vim/pack/plugins/start/nerdtree/nerdtree_plugin/fs_menu.vim
| 57: ~/.vim/pack/plugins/start/nerdtree/nerdtree_plugin/vcs.vim
| 58: ~/.vim/bundle/nerdtree/nerdtree_plugin/exec_menuitem.vim
| 59: ~/.vim/bundle/nerdtree/nerdtree_plugin/fs_menu.vim
| 60: ~/.vim/bundle/nerdtree/nerdtree_plugin/vcs.vim
| 61: ~/.vim/bundle/poppy.vim/plugin/poppy.vim
| 62: ~/.vim/bundle/supertab/plugin/supertab.vim
| 63: ~/.vim/bundle/surround/plugin/surround.vim
| 64: ~/.vim/bundle/syntastic/plugin/syntastic/autoloclist.vim
| 65: ~/.vim/bundle/syntastic/plugin/syntastic/balloons.vim
| 66: ~/.vim/bundle/syntastic/plugin/syntastic/checker.vim
| 67: ~/.vim/bundle/syntastic/plugin/syntastic/cursor.vim
| 68: ~/.vim/bundle/syntastic/plugin/syntastic/highlighting.vim
| 69: ~/.vim/bundle/syntastic/plugin/syntastic/loclist.vim
| 70: ~/.vim/bundle/syntastic/plugin/syntastic/modemap.vim
| 71: ~/.vim/bundle/syntastic/plugin/syntastic/notifiers.vim
| 72: ~/.vim/bundle/syntastic/plugin/syntastic/registry.vim
| 73: ~/.vim/bundle/syntastic/plugin/syntastic/signs.vim
| 74: ~/.vim/bundle/syntastic/plugin/syntastic.vim
| 75: ~/.vim/bundle/syntastic/autoload/syntastic/util.vim
| 76: ~/.vim/bundle/tagbar/plugin/tagbar.vim
| 77: ~/.vim/bundle/ultisnips/plugin/UltiSnips.vim
| 78: ~/.vim/bundle/ultisnips/autoload/UltiSnips/map_keys.vim
| 79: ~/.vim/bundle/utl/plugin/utl.vim
| 80: ~/.vim/bundle/utl/plugin/utl_rc.vim
| 81: ~/.vim/bundle/utl/plugin/utl_scm.vim
| 82: ~/.vim/bundle/utl/plugin/utl_uri.vim
| 83: ~/.vim/bundle/vim-angry/plugin/angry.vim
| 84: ~/.vim/bundle/vim-cursorword/plugin/cursorword.vim
| 85: ~/.vim/bundle/vim-easymotion/plugin/EasyMotion.vim
| 86: ~/.vim/bundle/vim-jsonpath/plugin/jsonpath.vim
| 87: ~/.vim/bundle/vim-multiple-cursors/plugin/multiple_cursors.vim
| 88: ~/.vim/bundle/vim-obsession/plugin/obsession.vim
| 89: ~/.vim/bundle/vim-signature/plugin/signature.vim
| 90: ~/.vim/bundle/vim-signature/autoload/signature/utils.vim
| 91: ~/.vim/bundle/vim-snippets/plugin/vimsnippets.vim
| 92: ~/.vim/bundle/vim-startify/plugin/startify.vim
| 93: ~/.vim/bundle/vim-table-mode/plugin/table-mode.vim
| 94: ~/.vim/bundle/vimspector/plugin/vimspector.vim
| 95: ~/.vim/bundle/working-set.vim/plugin/working-set-vim8.vim
| 96: ~/.vim/bundle/working-set.vim/plugin/working-set.vim
| 97: ~/.vim/bundle/YouCompleteMe/plugin/youcompleteme.vim
| 98: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/getscriptPlugin.vim
| 99: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/gzip.vim
|100: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/logiPat.vim
|101: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/manpager.vim
|102: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/matchparen.vim
|103: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/netrwPlugin.vim
|104: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/rrhelper.vim
|105: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/spellfile.vim
|106: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/tarPlugin.vim
|107: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/tohtml.vim
|108: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/vimballPlugin.vim
|109: /Applications/MacVim.app/Contents/Resources/vim/runtime/plugin/zipPlugin.vim
|110: ~/.vim/pack/airblade/start/vim-gitgutter/plugin/gitgutter.vim
|111: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter/utility.vim
|112: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter/highlight.vim
|113: ~/.vim/pack/bundle/start/vim-dirdiff/plugin/dirdiff.vim
|114: ~/.vim/pack/plugins/start/nerdtree/plugin/NERD_tree.vim
|115: ~/.vim/pack/plugins/start/supertab/plugin/supertab.vim
|116: ~/.vim/pack/plugins/start/traces.vim/plugin/traces.vim
|117: ~/.vim/pack/plugins/start/undotree/plugin/undotree.vim
|118: ~/.vim/pack/plugins/start/vim-visual-multi/plugin/visual-multi.vim
|119: ~/.vim/pack/plugins/start/vim-visual-multi/autoload/vm/plugs.vim
|120: ~/.vim/pack/plugins/start/vim-visual-multi/autoload/vm/maps.vim
|121: ~/.vim/pack/plugins/start/vim-visual-multi/autoload/vm/maps/all.vim
|122: ~/.vim/bundle/vim-signature/after/plugin/signature.vim
|123: ~/.vim/bundle/ultisnips/after/plugin/UltiSnips_after.vim
|124: /Applications/MacVim.app/Contents/Resources/vim/runtime/ftplugin/python.vim
|125: /Applications/MacVim.app/Contents/Resources/vim/runtime/indent/python.vim
|126: /Applications/MacVim.app/Contents/Resources/vim/runtime/syntax/python.vim
|127: ~/.vim/bundle/airline/autoload/airline/extensions.vim
|128: ~/.vim/bundle/airline/autoload/airline/extensions/quickfix.vim
|129: ~/.vim/bundle/airline/autoload/airline.vim
|130: ~/.vim/bundle/airline/autoload/airline/extensions/netrw.vim
|131: ~/.vim/bundle/airline/autoload/airline/extensions/term.vim
|132: ~/.vim/bundle/airline/autoload/airline/extensions/ctrlp.vim
|133: ~/.vim/bundle/airline/autoload/airline/extensions/undotree.vim
|134: ~/.vim/bundle/airline/autoload/airline/extensions/hunks.vim
|135: ~/.vim/bundle/airline/autoload/airline/extensions/tagbar.vim
|136: ~/.vim/bundle/airline/autoload/airline/extensions/csv.vim
|137: ~/.vim/bundle/airline/autoload/airline/extensions/syntastic.vim
|138: ~/.vim/bundle/airline/autoload/airline/extensions/ale.vim
|139: ~/.vim/bundle/airline/autoload/airline/extensions/whitespace.vim
|140: ~/.vim/bundle/airline/autoload/airline/extensions/po.vim
|141: ~/.vim/bundle/airline/autoload/airline/extensions/wordcount.vim
|142: ~/.vim/bundle/airline/autoload/airline/extensions/keymap.vim
|143: ~/.vim/bundle/airline/autoload/airline/extensions/obsession.vim
|144: ~/.vim/bundle/airline/autoload/airline/section.vim
|145: ~/.vim/bundle/airline/autoload/airline/highlighter.vim
|146: ~/.vim/bundle/airline/autoload/airline/themes/dark.vim
|147: ~/.vim/bundle/airline/autoload/airline/themes.vim
|148: ~/.vim/bundle/airline/autoload/airline/util.vim
|149: ~/.vim/bundle/airline/autoload/airline/builder.vim
|150: ~/.vim/bundle/airline/autoload/airline/extensions/default.vim
|151: ~/.vim/bundle/syntastic/autoload/syntastic/log.vim
|152: ~/.vim/bundle/ale/autoload/ale.vim
|153: ~/.vim/bundle/ale/autoload/ale/util.vim
|154: ~/.vim/bundle/ale/autoload/ale/linter.vim
|155: ~/.vim/bundle/ale/ale_linters/python/bandit.vim
|156: ~/.vim/bundle/ale/ale_linters/python/cspell.vim
|157: ~/.vim/bundle/ale/autoload/ale/handlers/cspell.vim
|158: ~/.vim/bundle/ale/ale_linters/python/flake8.vim
|159: ~/.vim/bundle/ale/ale_linters/python/flakehell.vim
|160: ~/.vim/bundle/ale/ale_linters/python/jedils.vim
|161: ~/.vim/bundle/ale/ale_linters/python/mypy.vim
|162: ~/.vim/bundle/ale/ale_linters/python/prospector.vim
|163: ~/.vim/bundle/ale/ale_linters/python/pycln.vim
|164: ~/.vim/bundle/ale/ale_linters/python/pycodestyle.vim
|165: ~/.vim/bundle/ale/ale_linters/python/pydocstyle.vim
|166: ~/.vim/bundle/ale/ale_linters/python/pyflakes.vim
|167: ~/.vim/bundle/ale/ale_linters/python/pylama.vim
|168: ~/.vim/bundle/ale/ale_linters/python/pylint.vim
|169: ~/.vim/bundle/ale/ale_linters/python/pylsp.vim
|170: ~/.vim/bundle/ale/ale_linters/python/pyre.vim
|171: ~/.vim/bundle/ale/ale_linters/python/pyright.vim
|172: ~/.vim/bundle/ale/ale_linters/python/refurb.vim
|173: ~/.vim/bundle/ale/ale_linters/python/ruff.vim
|174: ~/.vim/bundle/ale/autoload/ale/fix/registry.vim
|175: ~/.vim/bundle/ale/ale_linters/python/unimport.vim
|176: ~/.vim/bundle/ale/ale_linters/python/vulture.vim
|177: ~/.vim/bundle/ale/autoload/ale/engine.vim
|178: ~/.vim/bundle/ale/autoload/ale/semver.vim
|179: ~/.vim/bundle/ale/autoload/ale/command.vim
|180: ~/.vim/bundle/ale/autoload/ale/job.vim
|181: ~/.vim/bundle/ale/autoload/ale/history.vim
|182: ~/.vim/bundle/ctrlp/autoload/ctrlp/utils.vim
|183: ~/.vim/bundle/vim-signature/autoload/signature/sign.vim
|184: ~/.vim/bundle/vim-signature/autoload/signature/mark.vim
|185: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter.vim
|186: ~/.vim/bundle/syntastic/syntax_checkers/python/bandit.vim
|187: ~/.vim/bundle/syntastic/syntax_checkers/python/flake8.vim
|188: ~/.vim/bundle/syntastic/syntax_checkers/python/pyflakes.vim
|189: ~/.vim/bundle/syntastic/syntax_checkers/python/frosted.vim
|190: ~/.vim/bundle/syntastic/syntax_checkers/python/mypy.vim
|191: ~/.vim/bundle/syntastic/syntax_checkers/python/pep257.vim
|192: ~/.vim/bundle/syntastic/syntax_checkers/python/pep8.vim
|193: ~/.vim/bundle/syntastic/syntax_checkers/python/prospector.vim
|194: ~/.vim/bundle/syntastic/syntax_checkers/python/py3kwarn.vim
|195: ~/.vim/bundle/syntastic/syntax_checkers/python/pycodestyle.vim
|196: ~/.vim/bundle/syntastic/syntax_checkers/python/pydocstyle.vim
|197: ~/.vim/bundle/syntastic/syntax_checkers/python/pylama.vim
|198: ~/.vim/bundle/syntastic/syntax_checkers/python/pylint.vim
|199: ~/.vim/bundle/syntastic/syntax_checkers/python/python.vim
|200: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter/async.vim
|201: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter/debug.vim
|202: ~/.vim/bundle/vim-cursorword/autoload/cursorword.vim
|203: ~/.vim/bundle/YouCompleteMe/autoload/youcompleteme.vim
|204: ~/.vim/bundle/ale/autoload/ale/cursor.vim
|205: ~/.vim/bundle/YouCompleteMe/autoload/youcompleteme/filetypes.vim
|206: ~/.vim/pack/airblade/start/vim-gitgutter/autoload/gitgutter/hunk.vim
|207: ~/.vim/bundle/tagbar/autoload/tagbar.vim
|208: ~/.vim/bundle/tagbar/autoload/tagbar/debug.vim
|209: ~/.vim/bundle/ale/autoload/ale/statusline.vim
|210: ~/.vim/bundle/ale/autoload/ale/python.vim
|211: ~/.vim/bundle/ale/autoload/ale/path.vim
|212: ~/.vim/bundle/ale/autoload/ale/lsp_linter.vim
|213: ~/.vim/bundle/ale/autoload/ale/sign.vim
|214: ~/.vim/bundle/ale/autoload/ale/list.vim
|215: ~/.vim/bundle/ale/autoload/ale/highlight.vim
|216: ~/.vim/bundle/ale/autoload/ale/virtualtext.vim
|217: ~/.vim/bundle/ultisnips/autoload/UltiSnips.vim
|218: ~/.vim/pack/plugins/start/traces.vim/autoload/traces.vim
|219: ~/.vim/bundle/vimspector/autoload/vimspector.vim
|220: /Applications/MacVim.app/Contents/Resources/vim/runtime/scripts.vim
|221: /Applications/MacVim.app/Contents/Resources/vim/runtime/autoload/dist/script.vim
|222: ~/.vim/pack/plugins/start/nerdtree/syntax/nerdtree.vim
|223: ~/.vim/bundle/nerdtree/syntax/nerdtree.vim
|224: ~/.vim/pack/plugins/start/nerdtree-git-plugin/after/syntax/nerdtree.vim
|225: ~/.vim/pack/plugins/start/nerdtree-git-plugin/autoload/gitstatus/util.vim
|226: ~/.vim/pack/plugins/start/nerdtree-git-plugin/autoload/gitstatus/job.vim
|227: /Applications/MacVim.app/Contents/Resources/vim/runtime/ftplugin/qf.vim
|228: /Applications/MacVim.app/Contents/Resources/vim/runtime/syntax/qf.vim
|229: /Applications/MacVim.app/Contents/Resources/vim/runtime/autoload/python.vim

            19.0.1.2

        19.0.2
````
