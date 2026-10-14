---
type: reference
title: "PLUGINS, Scripts"
description: Section 19 of the legacy KB_vi notes.
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19"
---

# PLUGINS, Scripts, tags: plugins, scripts, extensions, colorschemes

[↑ KB_vi](/vi/kb-vi/README.md)

## 19.0 list active plugins , tags: list active plugins

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

## 19.1 bufexplorer

```text
		\be - open explorer
		\bs - open explorer in split horizontal window
		\bv - open in split vertival window
		Once the explorer is open you can perform various operations on the buffers. You can sort (by MRU (default), buffer number, buffer name, or full file path) in forward or reverse order. You can delete buffers. You as see toggle the full directory paths on your buffers. You can select a buffer to open by using the keyboard to select the buffer or by double-clicking the mouse on the selected buffer. You can even open the selected buffer in a new window is you would like. If you need help while in the explorer press the '?' key. And finally to quit the explorer, press the <esc> key...

		If you would like more detailed information, please take a look at the supplied documentation. 
```

## 19.2 csupport (C/CPP plugin)

### 19.2.1 To get help

```text
			:h csupport
			:h csupport-usage-vim
```

### 19.2.2 Shortcuts

#### 19.2.2.1 Comments

```text
  -- Comments -----------------------------------------------------------

  \cl       end-of-line comment                 (n,v,i)
  \cj       adjust end-of-line comment(s)       (n,v,i)
  \cs       set end-of-line comment column      (n)
  \c*       code -> comment /* */               (n,v)
  \c/       code -> comment //                  (n,v)
  \co       comment -> code                     (n,v)
  \cfr      frame comment                       (n,i)
  \cfu      function comment                    (n,i)
  \cme      method description                  (n,i)
  \cca      class description                   (n,i)
  \cd       date                                (n,i)
  \ct       date \& time                        (n,i)
```

#### 19.2.2.2 Statements

```text
  -- Statements ---------------------------------------------------------

  \sd       do { } while                        (n,v,i)
  \sf       for                                 (n,i)
  \sfo      for { }                             (n,v,i)
  \si       if                                  (n,i)
  \sif      if { }                              (n,v,i)
  \sie      if else                             (n,v,i)
  \sife     if { } else { }                     (n,v,i)
  \sw       while                               (n,i)
  \swh      while { }                           (n,v,i)
  \ss       switch                              (n,v,i)
  \sc       case                                (n,i)
  \s{       { }                                 (n,v,i)
```

#### 19.2.2.3 Preprocessor

```text
  -- Preprocessor -------------------------------------------------------

  \p<      $#include <>$                        (n,i)
  \p"      $#include ""$                        (n,i)
  \pd      $#define$                            (n,i)
  \pu      $#undef$                             (n,i)
  \pie     $#if$$#else #endif$                  (n,v,i)
  \pid     $#ifdef #else #endif$                (n,v,i)
  \pin     $#ifndef #else #endif$               (n,v,i)
  \pind    $#ifndef #def #endif$                (n,v,i)
  \pi0     $#if 0 #endif$                       (n,v,i)
  \pr0      remove$#if 0 #endif$                (n) 
```

#### 19.2.2.4 Idioms

```text
  -- Idioms -------------------------------------------------------------

  \if       function                            (n,v,i)
  \isf      static function                     (n,v,i)
  \im       main()                              (n,v,i)
  \i0       for( x=0; x<n; x+=1 )               (n,v,i)
  \in       for( x=n-1; x>=0; x-=1 )            (n,v,i)
  \ie       enum   + typedef                    (n,i)
  \is       struct + typedef                    (n,i)
  \iu       union  + typedef                    (n,i)
  \ip       printf()                            (n,i)
  \isc      scanf()                             (n,i)
  \ica      p=calloc()                          (n,i)
  \ima      p=malloc()                          (n,i)
  \isi      sizeof()                            (n,v,i)
  \ias      assert()                            (n,v,i)
  \ii       open input file                     (n,i)
  \io       open output file                    (n,i)
```

#### 19.2.2.5 Snippets

```text
  -- Snippets -----------------------------------------------------------

  \nr       read code snippet                   (n)
  \nw       write code snippet                  (n,v)
  \ne       edit code snippet                   (n)
  \np       pick up prototype                   (n,v)
  \ni       insert prototype(s)                 (n)
  \nc       clear  prototype(s)                 (n)
  \ns       show   prototype(s)                 (n)
```

#### 19.2.2.6 C++

```text
  -- C++ ----------------------------------------------------------------

  \+m       method implementation               (n,i)
  \+c       class                               (n,i)
  \+cn      class (using new)                   (n,i)
  \+tm      template method implementation      (n,i)
  \+tc      template class                      (n,i)
  \+tcn     template class (using new)          (n,i)
  \+tf      template function                   (n,i)
  \+ec      error class                         (n,i)
  \+tr      try ... catch                       (n,v,i)
  \+ca      catch                               (n,v,i)
  \+c.      catch(...)                          (n,v,i)
```

#### 19.2.2.7 Run

```text
  -- Run ----------------------------------------------------------------

  \rc       save and compile                    (n)
  \rl       link                                (n)
  \rr       run                                 (n)
  \ra       set comand line arguments           (n)
  \rm       run make                            (n)
  \rg       cmd. line arg. for make             (n)
  \rp       run splint                          (n)
  \ri       cmd. line arg. for splint           (n)
  \rk       run CodeCheck (TM)                  (n)
  \re       cmd. line arg. for CodeCheck (TM)   (n)
  \rd       run indent                          (n,v)
  \rh       hardcopy buffer                     (n,v)
  \rs       show plugin settings                (n)
  \rx       set xterm size                      (n, only Linux/UNIX & GUI)
  \ro       change output destination           (n)
  \rt       rebuild templates                   (n)
```

## 19.3. Python (python.vim)

```text
		To install add this line to .vimrc:
		au FileType python source path/python.vim 

		Most common commands:
		"   [[      -- Jump to beginning of block
		"   ]]      -- Jump to end of block
		"   ]v      -- Select (Visual Line Mode) block
		"   ]<      -- Shift block to left
		"   ]>      -- Shift block to right
		"   ]c      -- Select current/previous class
		"   ]f      -- Select current/previous function
		"   ]<up>   -- Jump to previous line with the same/lower indentation
		"   ]<down> -- Jump to next line with the same/lower indentation
```

## 19.4 Mini Buffer Explorer (minibufexpl.vim)

```text
		To install: Copy minibufexpl.vim into your plugin directory. Or :source minibufexpl.vim. That is all you need to get started. 

		Usage:
		You can quickly switch buffers by double-clicking the appropriate "tab" (if you don't want to use the mouse just put the cursor on the "tab" and press enter). As you open and close buffers the tabs get updated. Buffers that are modified get visually marked and buffers that are open in a window get visually marked. The -MiniBufferExplorer- opens automatically when you open more than one eligible buffer (no need to open the explorer if youre only editing one file.) -MiniBufExplorer- doesn't bother showing non-modifiable or hidden buffers. You can delete buffers by selecting them and pressing d on the keyboard.

		When you are in the -MiniBufExplorer- window, Tab and Shift-Tab move forward and backward respectively through the buffer list.

		There are a growing number of optional features in this script that are enabled by letting variables in your .vimrc:

		  control + the vim direction keys [hjkl] can be made to move you between windows.
		    control + arrow keys can be made to do the same thing
		      control + tab & shift + control + tab can be setup to switch through your open windows (like in MS Windows)
		        control + tab & shift + control + tab can alternatively be setup to cycle forwards and backwards through your modifiable buffers in the current window 

 <Leader>mbe - Opens MiniBufExplorer
 <Leader> is usually backslash so type "\mbe" 

 Other keymappings include: <Leader>mbc to close the Explorer
 "               window,  <Leader>mbu to force the Explorer to Update and
 "               <Leader>mbt to toggle the Explorer window; it will open if
 "               closed or close if open. Each of these key bindings can be
 "               overridden (see the notes on <Leader>mbe above.)
 " 
```

## 19.5 C reference (CRefVim)

### 19.5.1. Usage

```text
	<Leader>cr normal mode:  get help for word under cursor
	Memory aid cr: (c)-(r)eference
	<Leader>cr visual mode:  get help for visually selected text
	Memory aid cr: (c)-(r)eference
	<Leader>cw:              prompt for word CRefVim should search for
	Memory aid cw: (c)-reference (w)hat
	<Leader>cc:              jump to table of contents of the C-reference manual
	Memory aid cc: (c)-reference (c)ontents
	Note: by default <Leader> is \, e.g. press \cr to invoke C-reference

	Note: The best way to search for an operator (++, --, %, ...) is to visually select it and press <Leader>cr.

	To get help do :help crefvimdoc
	To show the C-reference manual do :help crefvim
```

## 19.5 perl plugin ( perlsupport)

### 19.5.1 h perlsupport

### 19.5.2 Usefull shortcuts

```text
			  \cl     Line End Comment
			  \cf     Frame Comment
			  \cu     Function Description
			  \ch     File Header (*.pl)
			  \ce     File Header (*.pm)
			  \ca     File Header (*.t)
			  \cc     code to comment
			  \co     comment to code
			  \cd     Date
			  \ct     Date & Time

			  -- Statements ----------------------------

			  \af     for { }
			  \ao     foreach { }
			  \ai     if { }
			  \ae     if { } else { }
			  \aw     while { }
			  \a{     { }

			  -- Idioms --------------------------------

			  \dm     my $;
			  \dy     my $ = ;
			  \d,     my ( $, $ );
			  \d1     my @;
			  \d2     my @ = (,,);
			  \d3     my %;
			  \d4     my % = (=>,=>,);
			  \d5     my $regex_ = '';
			  \d6     my $regex_ = qr//;
			  \d7     $ =~ m//
			  \d8     $ =~ s///
			  \d9     $ =~ tr///
			  \dp     print "...\n";
			  \df     printf ("...\n");
			  \ds     subroutine
			  \di     open input file
			  \do     open output file
			  \de     open pipe
```

## 19.6 Latex plugin (latex suite).

```text
		19.6.1.
			Installation.
			extract tarball to .vim 

			Add to .vimrc
			" REQUIRED. This makes vim invoke latex-suite when you open a tex file.
			filetype plugin on

			" IMPORTANT: win32 users will need to have 'shellslash' set so that latex
			" can be called correctly.
			set shellslash

			" IMPORTANT: grep will sometimes skip displaying the file name if you
			" search in a singe file. This will confuse latex-suite. Set your grep
			" program to alway generate a file-name.
			set grepprg=grep\ -nH\ $*

			" OPTIONAL: This enables automatic indentation as you type.
			filetype indent on

			To install the included latex-suit.txt and latexhelp.txt files as vim help files, start vim and do the following:

			helptags ~/.vim/doc    

			"
```

### 19.6.2. Help.

```text
			:help latex-suite.txt
```

## 19.7 TagExplorer

```text
		To activate it:
		:TagExplorer
```

## 19.8 SpellChecker

### 19.8.1 help

```text
			:h spell
```

### 19.8.2 basics

```text
		Tip. save your file first. Also sometimes this only works after doing :h spell.
			:SPCheck		<Leader>sc	Turn spell checking on/off
			:SPInteract		<Leader>si	Interactively step through errors
			:SPHarvest		<Leader>sh	Harvest all errors to user dictionary
```

## 19.9 cppomnicomplete plugin.

### 19.9.1 First steps

```text
                Installation.
			Build exuberent CTAGS db with:
			$ ctags -R --c++-kinds=+p --fields=+iaS --extra=+q  --languages=c++  -f tags .
			in case of error in sorting do:
			sort -u -o tags tags 

			Or you can add a map in your |.vimrc| file, eg: >

			        map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q
```

### 19.9.2 Usage

```text
			$ :tselect MyClass
			$ myObject. wait and select tag from if list.
			$ myObject.<C-X><C-O>
```

## 19.10 Bash plugin

```text
	for help :h bashsupport 

		usage w/o GUI
			
			The frequently used constructs can be inserted with key mappings.  The
			mappings are also described in the document bash-hot-keys.pdf (reference card,
			part of this package).
			Hint: Typing speed matters. The combination of a leader ('\') and the
			following character(s) will only be recognized for a short time.


			  -- Load / Unload bash Support -------------------------

			  \lbs    Load Bash Support    (normal)
			  \ubs    Unload Bash Support  (normal)

			  -- Comments -------------------------------------------

			  \cl     Line End Comment                (normal)
			  \cf     Frame Comment                   (normal)
			  \cu     Function Description            (normal)
			  \ch     File Header                     (normal)
			  \ckb    Keyword comment BUG             (normal)
			  \ckt    Keyword comment TODO            (normal)
			  \ckr    Keyword comment TRICKY          (normal)
			  \ckw    Keyword comment WARNING         (normal)
			  \ckn    Keyword comment New_Keyword     (normal)
			  \cc     code to comment                 (normal, visual)
			  \co     comment to code                 (normal, visual)
			  \cd     Date                            (normal)
			  \ct     Date & Time                     (normal)
			  \ce     echo "..."                      (normal)
			  \cr     remove echo "..."               (normal)
			  \cv     vim modeline                    (normal)
							     
			  -- Statements ------------------------------------------

			  \ac     case in ... esac                (normal)
			  \al     elif then                       (normal)
			  \af     for in do done                  (normal, visual)
			  \ai     if then fi                      (normal, visual)
			  \ae     if then else fi                 (normal, visual)
			  \as     select in do done               (normal, visual)
			  \at     until do done                   (normal, visual)
			  \aw     while do done                   (normal, visual)
			  \ao     echo -e "..."                   (normal, visual)

			  -- Run ------------------------------------------------

			  \rr     update file, run script         (normal)
			  \rc     update file, check syntax       (normal)
			  \ra     set command line arguments      (normal)
			  \rd     start debugger                  (normal)
			  \re     make script executable          (normal)
			  \rh     hardcopy buffer to FILENAME.ps  (normal)
			  \rs     settings and hot keys           (normal)
			  \rt     set xterm size                  (normal)
			  \ro     change output destination       (normal)

			  -- bash help ------------------------------------------

			  \h      display help for the builtin    (normal)
				  under the cursor


			File bash-hot-keys.pdf contains a reference card for these key mappings.
			Multiline inserts and code snippets will be indented after insertion.

			The hot keys are defined in the file type plugin sh.vim (part of this
			bash-support plugin package).
```

## 19.11 show Marks plugin:

```text
			Visibly show marks in vi.

			By default the following keymappings are defined:
			\mt : Toggles ShowMarks on and off.
			\mh : Hides an individual mark.
			\ma : Hides all marks in the current buffer.
			\mm : Places the next available mark. 
```

## 19.12 UTL, URL-based hyperlinking

```text
		Type :help utl-start
		To find help <URL:#r=help>
		To find the examples, <URL:#tn=EXAMPLES>
		To jump to unix KB, <URL:../knowledge_base_unix>
		To jump to unix KB crontab section, <URL:../knowledge_base_unix#tn=crontab>
		To go to web URL, <URL:http://www.vim.org/>
```

### 19.12.1. Ver2.0 and below

```text
		id=help Type :help utl-start
```

### 19.12.2. Hit \gu on the live examples given there

```text
				Hit ctrl+o to come back.

			  As a reader of texts containing URLs that's all! As an author you have to
			  know how to write URLs. But utl.vim gives you a training. And what you
			  will learn is 90% general knowlegde about URLs that you can use elsewhere.

			* Utl.vim is friendly:
			  No side effects, fits seamlessly into your Vim Session, well documented.


			EXAMPLES

			Here are some simplistic examples. Assume you have the following stuff in a file and
			execute the URL under the cursor with command \gu (all URLs can be with or without
			<URL:...> embedding):

			* Call your web browser (setup with a smart utility) and display www.vim.org

					    URL with embedding (and syntax highlighting)...
			    <URL:http://www.vim.org>;
					    ...or without embedding...
			    http://www.vim.org
					    ...or rudimentary URL
			    www.vim.org

			* Call your mailer

			    mailto:stb@bf-consulting.de
			    stb@bf-consulting.de
			    stb@bf-consulting.de?Subject=UTL&Cc=bram@moolenaar.net

			* Link to a local file to be displayed in a Vim window...
			  (This is a bit like Vim's gf command, but portable and indepent of 'path' setting
			  and cwd)

			    ///file:/home/stb/.vimrc    or
			    /home/stb/.vimrc

					    foo.txt in same directory as file containing this link
			    foo.txt   or            
			    ./foo.txt
					    bar.txt in sibbling directory of file containing this link
			    ../sib/bar.txt  

			* ...with fragment
			  (This is a bit like tags, but theres is no tags file)

					    jump to specific position in target file foo.txt by searching
					    searchString (use this to turn phrases like "see in file foo.txt
					    and search for searchString" into hotlinks) ...
			    foo.txt#searchString
					    ...or direct addressing of a line...
			    foo.txt#line=123
					    ...or refer to the anchor `id=myIdentifier'
			    foo.txt#r=myIdentifier  
					    ...or without a file, i.e. refers to current document (use this
					    to turn phrases like "see below" into hotlinks)
			    #searchString        

			* Link to a local file displayed by a handler application

					    hand over to MS Word (or Open Office, depending on the media type
					    handler you setup in UTL)
			    foo.doc
					    typically call Acrobat Reader
			    foo.pdf                
					    typically call IrfanView or XnView
			    foo.jpg                

			* Link to a directory

					    call Vim-Explorer or call Windows Explorer or DOS box or Unix shell
					    (with directory properly set)
			    dir/  or                
			    dir

			* Embed Vim commands in text

					    switch colorscheme (perhaps maintain an annotated file with all Vim
					    schemes available?)
			    <URL:vimscript:colors peachpuff>
					    open all folds (perhaps into your plugin for users who don't know
					    how to use folds)
			    <URL:vimscript:normal zR>

					    reference the Vim help (perhaps into the source code of your own
					    plugins to explain certain constructs)...
			    <URL:vimhelp:expr-==>  
					    ...again combined with a fragment to precisely address the exact
					    position
			    <URL:vimhelp:expr-==#^since a string>

			* Command line command :Gu to execute URLs:

					    same as first example ( or may I already speak UTL to you:
					    `same as #tp=browser ' :-)
			    :Gu www.vim.org        
					    Open Windows Explorer (or whatever) displaying the directory where
					    the current file is in (on Windows very convenient in your daily
					    click click struggle)
			    :Gu .                  

			The UTL documentation contains lots of practical examples and usage patterns.

			[keywords: hypertext, hyperlink]
```

### 19.12.3 More examples

```text
			    #tn=text	    Same as #text
			    #tp=text	    Stand for `t'ext `p'revious, i.e. define position by
					    searching first occurance of `text' in backward direction.
			    #line=123	    Position defined by line number. Most useful for documents
					    which won't change
			    #r=identifier   Position defined by the id `identifier'


			    file:	# Protocol for accessing local files.
					# If machine is given works like `ftp:'
			    ftp:	# Delegates to http, assuming that the browser handles this.
			    http:	# Delegates call to your web browser
			    https:	# Delegates call to your web browser
			    mailto:	# Delegates call to your mail client
			    man:	# Unix Man Pages scheme (see |utl-usesourcecode| for usage)
			    scp:	# If you have a scp command
			    vimscript:	# Vim specific. A scheme for executing vim commands. See
					# |utl-exvs| for usage.
			    vimhelp:	# Vim specific. About the same as vimscript:help.  See
					# |utl-exvimhelp| for usage.
			    config:	# Protocol for accessing Utl's setup file
```

### 19.12.4 Ver 3.x

#### 19.12.4.1 aaa

#### 19.12.4.2 Suggested mappings

```text
"--- Suggested mappings for most frequent commands  [id=suggested_mappings] [
"
" nmap <unique> <Leader>ge :Utl openLink underCursor edit<CR>
" nmap <unique> <Leader>gu :Utl openLink underCursor edit<CR>
" nmap <unique> <Leader>gE :Utl openLink underCursor split<CR>
" nmap <unique> <Leader>gS :Utl openLink underCursor vsplit<CR>
" nmap <unique> <Leader>gt :Utl openLink underCursor tabedit<CR>
" nmap <unique> <Leader>gv :Utl openLink underCursor view<CR>
" nmap <unique> <Leader>gr :Utl openLink underCursor read<CR>
"
"					[id=suggested_mappings_visual]
" vmap <unique> <Leader>ge "*y:Utl openLink visual edit<CR>
" vmap <unique> <Leader>gu "*y:Utl openLink visual edit<CR>
" vmap <unique> <Leader>gE "*y:Utl openLink visual split<CR>
" vmap <unique> <Leader>gS "*y:Utl openLink visual vsplit<CR>
" vmap <unique> <Leader>gt "*y:Utl openLink visual tabedit<CR>
" vmap <unique> <Leader>gv "*y:Utl openLink visual view<CR>
" vmap <unique> <Leader>gr "*y:Utl openLink visual read<CR>
"
"
" nmap <unique> <Leader>cfn :Utl copyFileName underCursor native<CR>
" nmap <unique> <Leader>cfs :Utl copyFileName underCursor slash<CR>
" nmap <unique> <Leader>cfb :Utl copyFileName underCursor backSlash<CR>
"
" vmap <unique> <Leader>cfn "*y:Utl copyFileName visual native<CR>
" vmap <unique> <Leader>cfs "*y:Utl copyFileName visual slash<CR>
" vmap <unique> <Leader>cfb "*y:Utl copyFileName visual backSlash<CR>
"
"
" nmap <unique> <Leader>cl :Utl copyLink underCursor<CR>
"
" vmap <unique> <Leader>cl "*y:Utl copyLink visual<CR>
"
"]



"
```

## 19.13 DrawIt, Draw ASCII diagrams.

```text
		distributed as a vimball (see :help vimball)
```

### 19.13.1 First steps

```text
                install
			vim DrawIt.vba.gz
			:so %
			:q
```

### 19.13.2 Usage

```text
			\di to start DrawIt and
			\ds to stop  DrawIt. 

			When DrawIt has been started you may use the number pad to leave a trail of dashes, vertical bars, etc.  The lines will be expanded as needed to accomodate your drawing.  DrawIt can also draw boxes and ellipses on a blank-filled area (DrawIt can produce these) which can be useful for drawing boxes around comments.
```

### 19.13.3. Commands

```text
			Supported Features
			   <left>       move and draw left
			   <right>      move and draw right, inserting lines/space as needed
			   <up>         move and draw up, inserting lines/space as needed
			   <down>       move and draw down, inserting lines/space as needed
			   <s-left>     move left
			   <s-right>    move right, inserting lines/space as needed
			   <s-up>       move up, inserting lines/space as needed
			   <s-down>     move down, inserting lines/space as needed
			   <space>      toggle into and out of erase mode
			   >            draw -> arrow
			   <            draw <- arrow
			   ^            draw ^  arrow
			   v            draw v  arrow
			   <pgdn>       replace with a \, move down and right, and insert a \
			   <end>        replace with a /, move down and left,  and insert a /
			   <pgup>       replace with a /, move up   and right, and insert a /
			   <home>       replace with a \, move up   and left,  and insert a \
			   \>           draw fat -> arrow
			   \<           draw fat <- arrow
			   \^           draw fat ^  arrow
			   \v           draw fat v  arrow
			   \a           draw arrow based on corners of visual-block
			   \b           draw box using visual-block selected region
			   \e           draw an ellipse inside visual-block
			   \f           fill a figure with some character
			   \h           create a canvas for \a \b \e \l
			   \l           draw line based on corners of visual block
			   \s           adds spaces to canvas
			   <leftmouse>  select visual block
			<s-leftmouse>  drag and draw with current brush (register)
			   \ra ... \rz  replace text with given brush/register
			   \pa ...      like \ra ... \rz, except that blanks are considered
					to be transparent 
```

## 19.14 VisIncr, create columns of increasing numbers, dates, etc.

```text
:he visincr-examples

|	LEFT JUSTIFIED INCREMENTING EXAMPLES
|	:I                              :I 2            *ex-visincr-I*
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :I          Original    Select, :I 2
|	   8            8                  8            8
|	   8            9                  8            10
|	   8            10                 8            12
|	   8            11                 8            14
|	   8            12                 8            16
|
|	:I -1                           :I -2
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :I -1       Original    Select, :I -3
|	   8            8                  8            8
|	   8            7                  8            5
|	   8            6                  8            2
|	   8            5                  8            -1
|	   8            4                  8            -4
|
|	RIGHT JUSTIFIED INCREMENTING EXAMPLES
|	:II                             :II 2           *ex-visincr-II*
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :II         Original    Select, :II 2
|	   8             8                 8             8
|	   8             9                 8            10
|	   8            10                 8            12
|	   8            11                 8            14
|	   8            12                 8            16
|
|	:II -1                          :II -2
|	            Use ctrl-V to                   Use ctrl-V to
|	Original    Select, :II -1      Original    Select, :II -3
|	   8            8                  8             8
|	   8            7                  8             5
|	   8            6                  8             2
|	   8            5                  8            -1
|	   8            4                  8            -4
|
|	DATE INCREMENTING EXAMPLES
|	:IMDY                                   *ex-visincr-IMDY*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IMDY         Original  Select, :IMDY 7
|	06/10/03     6/10/03            06/10/03     6/10/03
|	06/10/03     6/11/03            06/10/03     6/11/03
|	06/10/03     6/12/03            06/10/03     6/12/03
|	06/10/03     6/13/03            06/10/03     6/13/03
|	06/10/03     6/14/03            06/10/03     6/14/03
|
|
|	:IYMD                                   *ex-visincr-IYMD*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IYMD         Original  Select, :IYMD 7
|	03/06/10    03/06/10            03/06/10    03/06/10
|	03/06/10    03/06/11            03/06/10    03/06/17
|	03/06/10    03/06/12            03/06/10    03/06/24
|	03/06/10    03/06/13            03/06/10    03/07/ 1
|	03/06/10    03/06/14            03/06/10    03/07/ 8
|
|
|	:IDMY                                   *ex-visincr-IDMY*
|	          Use ctrl-V to                   Use ctrl-V to
|	Original  Select, :IDMY         Original  Select, :IDMY 7
|	10/06/03    10/06/03            10/06/03    10/06/03
|	10/06/03    11/06/03            10/06/03    17/06/03
|	10/06/03    12/06/03            10/06/03    24/06/03
|	10/06/03    13/06/03            10/06/03     1/07/03
|	10/06/03    14/06/03            10/06/03     8/07/03
|
|
|	ALPHABETIC INCREMENTING EXAMPLES
|	:IA                                     *ex-visincr-IA*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IA         Original  Select, :IA 2
|	   a)          a)                A)           A)
|	   a)          b)                A)           C)
|	   a)          c)                A)           E)
|	   a)          d)                A)           G)
|
|	DAYNAME INCREMENTING EXAMPLES
|	:ID                                     *ex-visincr-ID*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :ID         Original  Select, :ID 2
|	  Sun       Sun                 Sun         Sun
|	  Sun       Mon                 Sun         Tue
|	  Sun       Tue                 Sun         Thu
|	  Sun       Wed                 Sun         Sat
|	  Sun       Thu                 Sun         Mon
|
|
|	:ID
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :ID         Original  Select, :ID 2
|	 Sunday     Sunday             Sunday     Sunday
|	 Sunday     Monday             Sunday     Monday
|	 Sunday     Tuesday            Sunday     Tuesday
|	 Sunday     Wednesday          Sunday     Wednesday
|	 Sunday     Thursday           Sunday     Thursday
|
|	MONTHNAME INCREMENTING EXAMPLES
|	:IM                                     *ex-visincr-IM*
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IM         Original  Select, :IM 2
|	  Jan       Jan                 Jan       Jan
|	  Jan       Feb                 Jan       Mar
|	  Jan       Mar                 Jan       May
|	  Jan       Apr                 Jan       Jul
|	  Jan       May                 Jan       Sep
|
|	:IM
|	          Use ctrl-V to                 Use ctrl-V to
|	Original  Select, :IM         Original  Select, :IM 2
|	 January    January            January    January
|	 January    February           January    March
|	 January    March              January    May
|	 January    April              January    July
|	 January    May                January    September
```

## 19.15 a.vim : Alternate Files quickly

```text
		:A switches to the header file corresponding to the current file being edited (or vise versa)
		(note, same as :e %<.h )
		:AS splits and switches
		:AV vertical splits and switches
		:AT new tab and switches
		:AN cycles through matches
		:IH switches to file under cursor
		:IHS splits and switches
		:IHV vertical splits and switches
		:IHT new tab and switches
		:IHN cycles through matches
		<Leader>ih switches to file under cursor
		<Leader>is switches to the alternate file of file under cursor (e.g. on  <foo.h> switches to foo.cpp)
		<Leader>ihn cycles through matches 
```

## 19.16 dbext.vim : Provides database access to 10 dbms (Oracle, Sybase, SQL Server, MySQL, DBI,...)

### 19.16.1 First steps

```text
                Install
		Copy the plugin/dbext.vim script to your $HOME/.vim/plugin (or $VIM/vimfiles/plugin for windows) directory.  Copy the autoload/dbext.vim script to your $HOME/.vim/autoload (or $VIM/vimfiles/autoload for windows) directory.  Copy the autoload/dbext_dbi.vim script to your $HOME/.vim/autoload (or $VIM/vimfiles/autoload for windows) directory.  Copy dbext.txt to your $HOME/.vim/doc (or $VIM/vimfiles/doc for windows) directory.
To update the Vim Help, run:
:helptags $HOME/.vim/doc  (Unix)
:helptags $VIM/vimfiles/doc  (Windows)
```

### 19.16.2 Tutorial

```text
		A tutorial has been added to help you become familiar with the features of the plugin, :h dbext-tutorial.
```

### 19.16.3 Connection Profiles

```text
You can create as many profiles as you like in your vimrc.  Each profile specifies various connection information.  Each buffer can be connected to a different database.   The plugin will automatically prompt the user for connection information.  If you have defined profiles in your vimrc, for ease of use,  you can choose from a numbered list.
```

### 19.16.4 Object Completion

```text
dbext ties into Vim dictionary feature.  You can complete table names, procedure names and view names using the i_CTRL-X_CTRL-K feature. 
```

### 19.16.5 FileType Support

```text
SQL can be used from a variety of languages.  Each development language (PHP, Perl, Java, ...) language has different syntax for creating SQL statements that are sent to the database.  dbext has support for several
different filetypes, so that it can understand and correctly parse a SQL statement.

The current supported languages are:
        PHP, Java, JSP, JavaScript, JProperties, Perl, SQL, Vim

For example assume you had the following Java code:
String mySQL =
    "SELECT s.script, ts.event, t.name                  " +
    "     , s.script_language, sv.name                  " +
    "  FROM ml_script s, ml_table_script ts, ml_table t " +
                "     , ml_script_version sv                        " +
    " WHERE s.script_id   = " + script_version +
    "   AND ts.version_id = "+obj.method() +
    "   AND ts.table_id   = t.table_id                  ";

If you visually select from the "SELECT ... to the "; and ran
:'<,'>DBExecSQL    (or used the default map <Leader>se)

The Java filetype support would concatenate each individual string into one
single string.  In this case it removed the " + " and concatenated  the
lines to result in the following (assuming this is on one line):
       SELECT s.script, ts.event, t.name , s.script_language, sv.name
       FROM ml_script s, ml_table_script ts, ml_table t
                  , ml_script_version sv
      WHERE s.script_id   = " + script_version + "
        AND ts.version_id = "+obj.method() +"
        AND ts.table_id   = t.table_id

Next, it will prompt you for replacement values for the various variables or  objects you used in the string.
Assuming you had the default behaviour turned on, you would be prompted  to supply a value for:
                " + script_version + "
                "+obj.method() +"

So assuming you entered:
                100
                'Project_Yahoo'

Then the resulting string sent to your database would be (again, this would technically be on one line):
       SELECT s.script, ts.event, t.name , s.script_language, sv.name
       FROM ml_script s, ml_table_script ts, ml_table t
                  , ml_script_version sv
      WHERE s.script_id   = 100
        AND ts.version_id = 'Project_Yahoo'
        AND ts.table_id   = t.table_id

Benefit:  
You did not have to test your SQL by cutting and pasting it into a separate tool and replacing all the object and host variables yourself.  Just by visually selecting the string and running the command DBExecSQL (or the default mapping <Leader>se) the SQL statement was executed against the database and allowed to you enter host variables.
```

### 19.16.5 Additional Commands

```text
DBExecSQL - Enter any command you want sent to the database
DBExecRangeSQL - Enter any range of statements you want executed
Select  - Enter the remainder of a select (ie :Select * from customer)
Call  - Call a stored procedure
Update  - Enter the remainder of an update
Insert  - Enter the remainder of an insert
Delete  - Enter the remainder of an delete
Drop    - Enter the remainder of a drop
Alter   - Enter the remainder of an alter
Create  - Enter the remainder of a create
```

## 19.16 VJDE, java plugin

### 19.16.1 description:

```text
		:h vjde
```

## 19.17 surround.vim : Delete/change/add parentheses/quotes/XML-tags/much more with ease

```text
http://www.vim.org/scripts/script.php?script_id=1697
```

### 19.17.1 Description

```text
Surround.vim is all about "surroundings": parentheses, brackets, quotes, XML tags, and more.  The plugin provides mappings to easily delete, change and add such surroundings in pairs.  While it works under Vim 6, much of the functionality requires Vim 7.

Examples follow.  It is difficult to provide good examples in the variable width font of this site; check the documentation for more.

Press cs"' (that's c, s, double quote, single quote) inside

"Hello world!"

to change it to

'Hello world!'

Now press cs'<q> to change it to

<q>Hello world!</q>

To go full circle, press cst" to get

"Hello world!"

To remove the delimiters entirely, press ds" .

Hello world!

Now with the cursor on "Hello", press ysiw] (iw is a text object).

[Hello] world!

Let's make that braces and add some space (use "}" instead of "{" for no space): cs]{

{ Hello } world!

Now wrap the entire line in parentheses with yssb or yss) .

({ Hello } world!)

Revert to the original text: ds{ds)

Hello world!

Emphasize hello: ysiw<em>

<em>Hello</em> world!

Finally, let's try out visual mode. Press a capital V (for linewise visual mode)
followed by S<p class="important">.

<p class="important">
  <em>Hello</em> world!
</p>

This plugin is very powerful for HTML and XML editing, a niche which currently seems underfilled in Vim land.  (As opposed to HTML/XML *inserting*, for which many plugins are available).  Adding, changing, and removing pairs of tags simultaneously is a breeze.

The "." command will work with ds, cs, and yss if you install repeat.vim, vimscript #2136.

All feedback appreciated.  I am particularly interested to hear back on the following topics:

How exactly should indenting be handled?  Is the current s/S distinction useful, or should we just always reindent with =?

Is the s mapping annoying in visual mode? While you can just use c to get the original s function, does it still interfere with motor memory?  This can be disabled if you provide your own map instead, but would this be a good default?

Is the open/closing brace == add/don't add whitespace worth maintaining, or would it be better to just type an extra space before the brace to get said whitespace?
```

### 19.17.2 Install

```text
Extract to ~/.vim, or ~\vimfiles (Windows).  You'll need to regenerate helptags (fill in the install path below)

:helptags ~/.vim/doc
```

## 19.18 DirDiff

```text
https://github.com/will133/vim-dirdiff
http://www.vim.org/scripts/script.php?script_id=102
```

### 19.18.1 Description

```text
		description
This is a utility that performs a recursive diff on two directories and generate a diff "window".  Based on that window you can perform various diff operations such as opening two files in Vim's diff mode, copy the file or directory recursively to the other, or remove the directory tree from the source directory.
```

### 19.18.2 Install

```text
With pathogen.vim:

cd ~/.vim/bundle
git clone git://github.com/will133/vim-dirdiff

With Vim 8+'s default packaging system:
mkdir -p ~/.vim/pack/bundle/start
cd ~/.vim/pack/bundle/start
git clone git://github.com/will133/vim-dirdiff

(I got connection refused for git: so ran $ git clone https://github.com/will133/vim-dirdiff.git )
```

### 19.18.3 Usage

```text
Doing the following will generate a diff window.

      :DirDiff <A:Src Directory> <B:Src Directory>
  e.g.
      :DirDiff ../something/dir1 /usr/bin/somethingelse/dir2

  The following commands can be used inside the diff window:
  'Enter','o' - Diff open: open the diff file(s) where your cursor is at
  's' - Synchronize the current diff.  You can also select
        a range (through visual) and press 's' to synchronize differences
        across a range.

|        - There are 6 Options you can choose when you hit 's':
|          1. A -> B
|             Copy A to overwrite B
|             If A's file actually points to a directory, it'll copy it to B
|             recursively.
|          2. B -> A
|             Copy B to overwrite A
|             If B's file actually points to a directory, it'll copy it to A
|             recursively.
|          3. Always A
|             For the rest of the items that you've selected,
|             synchronize like (1).
|          4. Always B
|             For the rest of the items that you've selected,
|             synchronize like (2).
|          5. Skip
|             Skip this diff entry.
|          6. Cancel
|             Quit the loop and exit.
|
  'u' - Diff update: update the diff window
  'x' - Sets the exclude pattern, separated by ','
  'i' - Sets the ignore pattern, separated by ','
  'a' - Sets additional arguments for diff, eg. -w to ignore white space,
        etc.
  'q' - Quit DirDiff
  
  The following comamnds can be used in the Vim diff mode
  \dg - Diff get: maps to :diffget<CR>
  \dp - Diff put: maps to :diffput<CR>
  \dj - Diff next: (think j for down)
  \dk - Diff previous: (think k for up)

  You can set the following DirDiff variables.  You can add the following
  "let" lines in your .vimrc file.

  Sets default exclude pattern:
      let g:DirDiffExcludes = "CVS,*.class,*.exe,.*.swp"

  Sets default ignore pattern:
      let g:DirDiffIgnore = "Id:,Revision:,Date:"

  If DirDiffSort is set to 1, sorts the diff lines.
      let g:DirDiffSort = 1

  Sets the diff window (bottom window) height (rows)
      let g:DirDiffWindowSize = 14

  Ignore case during diff
      let g:DirDiffIgnoreCase = 0

  Dynamically figure out the diff text.  If you are using and i18n version
  of diff, this will try to get the specific diff text during runtime.  It's
  turned off by default.  If you are always targetting a specific version of
  diff, you can turn this off and set the DirDiffText* variables
  accordingly.
      let g:DirDiffDynamicDiffText = 0

  String used for the English equivalent "Files "
      let g:DirDiffTextFiles = "Files "

  String used for the English equivalent " and "
      let g:DirDiffTextAnd = " and "

  String used for the English equivalent " differ")
      let g:DirDiffTextDiffer = " differ"

  String used for the English equivalent "Only in ")
      let g:DirDiffTextOnlyIn = "Only in "

      "
```

### 19.18.4 demo

```text
cd ~/temp/
$ mkdir b
$ cd b
$ touch {a..z}{a..z}
$ cd ..
$ mkdir c
$ cd c
$ touch {a..y}{a..y}
$ cd ..
$ ls b c
b:
aa		bx		du		fr		ho		jl		li		nf		pc		qz		sw		ut		wq		yn
ab		by		dv		fs		hp		jm		lj		ng		pd		ra		sx		uu		wr		yo
ac		bz		dw		ft		hq		jn		lk		nh		pe		rb		sy		uv		ws		yp
ad		ca		dx		fu		hr		jo		ll		ni		pf		rc		sz		uw		wt		yq
ae		cb		dy		fv		hs		jp		lm		nj		pg		rd		ta		ux		wu		yr
af		cc		dz		fw		ht		jq		ln		nk		ph		re		tb		uy		wv		ys
ag		cd		ea		fx		hu		jr		lo		nl		pi		rf		tc		uz		ww		yt
ah		ce		eb		fy		hv		js		lp		nm		pj		rg		td		va		wx		yu
ai		cf		ec		fz		hw		jt		lq		nn		pk		rh		te		vb		wy		yv
aj		cg		ed		ga		hx		ju		lr		no		pl		ri		tf		vc		wz		yw
ak		ch		ee		gb		hy		jv		ls		np		pm		rj		tg		vd		xa		yx
al		ci		ef		gc		hz		jw		lt		nq		pn		rk		th		ve		xb		yy
am		cj		eg		gd		ia		jx		lu		nr		po		rl		ti		vf		xc		yz
an		ck		eh		ge		ib		jy		lv		ns		pp		rm		tj		vg		xd		za
ao		cl		ei		gf		ic		jz		lw		nt		pq		rn		tk		vh		xe		zb
ap		cm		ej		gg		id		ka		lx		nu		pr		ro		tl		vi		xf		zc
aq		cn		ek		gh		ie		kb		ly		nv		ps		rp		tm		vj		xg		zd
ar		co		el		gi		if		kc		lz		nw		pt		rq		tn		vk		xh		ze
as		cp		em		gj		ig		kd		ma		nx		pu		rr		to		vl		xi		zf
at		cq		en		gk		ih		ke		mb		ny		pv		rs		tp		vm		xj		zg
au		cr		eo		gl		ii		kf		mc		nz		pw		rt		tq		vn		xk		zh
av		cs		ep		gm		ij		kg		md		oa		px		ru		tr		vo		xl		zi
aw		ct		eq		gn		ik		kh		me		ob		py		rv		ts		vp		xm		zj
ax		cu		er		go		il		ki		mf		oc		pz		rw		tt		vq		xn		zk
ay		cv		es		gp		im		kj		mg		od		qa		rx		tu		vr		xo		zl
az		cw		et		gq		in		kk		mh		oe		qb		ry		tv		vs		xp		zm
ba		cx		eu		gr		io		kl		mi		of		qc		rz		tw		vt		xq		zn
bb		cy		ev		gs		ip		km		mj		og		qd		sa		tx		vu		xr		zo
bc		cz		ew		gt		iq		kn		mk		oh		qe		sb		ty		vv		xs		zp
bd		da		ex		gu		ir		ko		ml		oi		qf		sc		tz		vw		xt		zq
be		db		ey		gv		is		kp		mm		oj		qg		sd		ua		vx		xu		zr
bf		dc		ez		gw		it		kq		mn		ok		qh		se		ub		vy		xv		zs
bg		dd		fa		gx		iu		kr		mo		ol		qi		sf		uc		vz		xw		zt
bh		de		fb		gy		iv		ks		mp		om		qj		sg		ud		wa		xx		zu
bi		df		fc		gz		iw		kt		mq		on		qk		sh		ue		wb		xy		zv
bj		dg		fd		ha		ix		ku		mr		oo		ql		si		uf		wc		xz		zw
bk		dh		fe		hb		iy		kv		ms		op		qm		sj		ug		wd		ya		zx
bl		di		ff		hc		iz		kw		mt		oq		qn		sk		uh		we		yb		zy
bm		dj		fg		hd		ja		kx		mu		or		qo		sl		ui		wf		yc		zz
bn		dk		fh		he		jb		ky		mv		os		qp		sm		uj		wg		yd		{a-z}{a-z}
bo		dl		fi		hf		jc		kz		mw		ot		qq		sn		uk		wh		ye
bp		dm		fj		hg		jd		la		mx		ou		qr		so		ul		wi		yf
bq		dn		fk		hh		je		lb		my		ov		qs		sp		um		wj		yg
br		do		fl		hi		jf		lc		mz		ow		qt		sq		un		wk		yh
bs		dp		fm		hj		jg		ld		na		ox		qu		sr		uo		wl		yi
bt		dq		fn		hk		jh		le		nb		oy		qv		ss		up		wm		yj
bu		dr		fo		hl		ji		lf		nc		oz		qw		st		uq		wn		yk
bv		ds		fp		hm		jj		lg		nd		pa		qx		su		ur		wo		yl
bw		dt		fq		hn		jk		lh		ne		pb		qy		sv		us		wp		ym

c:
aa	aw	bt	cq	dn	ek	fh	ge	hb	hx	iu	jr	ko	ll	mi	nf	oc	oy	pv	qs	rp	sm	tj	ug	vd	wa	ww	xt	yq
ab	ax	bu	cr	do	el	fi	gf	hc	hy	iv	js	kp	lm	mj	ng	od	pa	pw	qt	rq	sn	tk	uh	ve	wb	wx	xu	yr
ac	ay	bv	cs	dp	em	fj	gg	hd	ia	iw	jt	kq	ln	mk	nh	oe	pb	px	qu	rr	so	tl	ui	vf	wc	wy	xv	ys
ad	ba	bw	ct	dq	en	fk	gh	he	ib	ix	ju	kr	lo	ml	ni	of	pc	py	qv	rs	sp	tm	uj	vg	wd	xa	xw	yt
ae	bb	bx	cu	dr	eo	fl	gi	hf	ic	iy	jv	ks	lp	mm	nj	og	pd	qa	qw	rt	sq	tn	uk	vh	we	xb	xx	yu
af	bc	by	cv	ds	ep	fm	gj	hg	id	ja	jw	kt	lq	mn	nk	oh	pe	qb	qx	ru	sr	to	ul	vi	wf	xc	xy	yv
ag	bd	ca	cw	dt	eq	fn	gk	hh	ie	jb	jx	ku	lr	mo	nl	oi	pf	qc	qy	rv	ss	tp	um	vj	wg	xd	ya	yw
ah	be	cb	cx	du	er	fo	gl	hi	if	jc	jy	kv	ls	mp	nm	oj	pg	qd	ra	rw	st	tq	un	vk	wh	xe	yb	yx
ai	bf	cc	cy	dv	es	fp	gm	hj	ig	jd	ka	kw	lt	mq	nn	ok	ph	qe	rb	rx	su	tr	uo	vl	wi	xf	yc	yy
aj	bg	cd	da	dw	et	fq	gn	hk	ih	je	kb	kx	lu	mr	no	ol	pi	qf	rc	ry	sv	ts	up	vm	wj	xg	yd
ak	bh	ce	db	dx	eu	fr	go	hl	ii	jf	kc	ky	lv	ms	np	om	pj	qg	rd	sa	sw	tt	uq	vn	wk	xh	ye
al	bi	cf	dc	dy	ev	fs	gp	hm	ij	jg	kd	la	lw	mt	nq	on	pk	qh	re	sb	sx	tu	ur	vo	wl	xi	yf
am	bj	cg	dd	ea	ew	ft	gq	hn	ik	jh	ke	lb	lx	mu	nr	oo	pl	qi	rf	sc	sy	tv	us	vp	wm	xj	yg
an	bk	ch	de	eb	ex	fu	gr	ho	il	ji	kf	lc	ly	mv	ns	op	pm	qj	rg	sd	ta	tw	ut	vq	wn	xk	yh
ao	bl	ci	df	ec	ey	fv	gs	hp	im	jj	kg	ld	ma	mw	nt	oq	pn	qk	rh	se	tb	tx	uu	vr	wo	xl	yi
ap	bm	cj	dg	ed	fa	fw	gt	hq	in	jk	kh	le	mb	mx	nu	or	po	ql	ri	sf	tc	ty	uv	vs	wp	xm	yj
aq	bn	ck	dh	ee	fb	fx	gu	hr	io	jl	ki	lf	mc	my	nv	os	pp	qm	rj	sg	td	ua	uw	vt	wq	xn	yk
ar	bo	cl	di	ef	fc	fy	gv	hs	ip	jm	kj	lg	md	na	nw	ot	pq	qn	rk	sh	te	ub	ux	vu	wr	xo	yl
as	bp	cm	dj	eg	fd	ga	gw	ht	iq	jn	kk	lh	me	nb	nx	ou	pr	qo	rl	si	tf	uc	uy	vv	ws	xp	ym
at	bq	cn	dk	eh	fe	gb	gx	hu	ir	jo	kl	li	mf	nc	ny	ov	ps	qp	rm	sj	tg	ud	va	vw	wt	xq	yn
au	br	co	dl	ei	ff	gc	gy	hv	is	jp	km	lj	mg	nd	oa	ow	pt	qq	rn	sk	th	ue	vb	vx	wu	xr	yo
av	bs	cp	dm	ej	fg	gd	ha	hw	it	jq	kn	lk	mh	ne	ob	ox	pu	qr	ro	sl	ti	uf	vc	vy	wv	xs	yp

vi 
:DirDiff b c 
		19.18.5
```

## 19.18 VimCommander

```text
      total-commander-like file manager for vim
      Toggle (start) it with F11
      noremap <silent> <F11> :cal VimCommanderToggle()<CR> 
```

### 19.18.1 List of Features:

```text
    - Two panels side-by-side;
    - File operations work only on unix;
    - File selection;
    - Remembers settings;
    - Directory history.
```

### 19.18.2 VimCommander Keys

```text
    Most of VimCommander's key-bindings are similar to the other
    commanders':

    - TAB     = Go to the other panel;
    - F3      = View file under cursor;
    - F4      = Edit file under cursor;
    - F5      = Copy file;
    - F6      = Move/rename file;
    - F7      = Create directory;
    - F8/DEL  = Remove file;
    - F10     = Quit VimCommander;
    - C-R     = Refresh panels;
    - C-U     = Exchange panels;
    - C-Left  = Put directory under cursor on other panel, or grab
              = other panel's dir;
    - C-Right = Same;
    - C-H     = Toggle show hidden files;
    - INS     = Select file under cursor;
    - "+"     = Select file by pattern;
    - "-"     = De-select file by pattern;
    - S-F4    = Edit new file;
    - C-t     = Previous directory;
    - C-y     = Next directory.

    C-* stands for CTRL+*. S-* stands for SHIFT+*.
    As some terminals do not support SHIFT/CTRL+non-letter-keys, a <leader>
    version has usually been provided.
    So, <leader>Right and C-Right are the same.
    Same for M-keys, including letters.
```

## 19.19 Source explorer

```text
	http://www.vim.org/scripts/script.php?script_id=2179
	a source code explorer for (G)Vim and provides an overview of the function and type definitions.It has such a mechannism that works like the context window component of "Source Insight" software

	If you have used Source Insight for browse your C/C++ project before, you may find that you can browse the definitions as well as the context window of "Source Insight".

For example, you put the cursor on a function name in Normal mode, its definition will show on the Source Explorer window a moment later. And then you can do the 'double-click' operation using your mouse onto the Source Explorer window which had appeared on the bottom of (G)Vim. The definition and its context will be show on the edit window.(Just like Source Insight does). In srcexpl v1.2 and above, the function key which users mapped will play a important role that you can not only use mouse but also use keyboard in order to exploring source code in both GUI and cterm VIM.

The Source Explorer can work with Taglist very well. Both of them make (G)Vim looks like the "Source Insight" in Unix/Windows enviorment.

Features:
|1\ Go insight the definitions of functions and various types of C/C++ language project.
|2\ Double click and click <ENTER> key onto the  Source Explorer Window can edit the definition and context.
|3\ Your own map key (such as <SPACE>) can force to refresh the Source Explorer directly.
|4\ Popup menu and Your own map key (such as <A-,> in Source Insight) to go back from the definition.
|5\ You can explore C/C++/ASM/ souce code only using your mouse but without keyboard.
```

### 19.19.1 Installation

```text
|
|		1\ Add the srcexpl.vim script to the plugin directory of Vimfiles, such as ~/.vim/plugin/
|
|2\ Add the following in your .vimrc or _vimrc
|    " Set the refreshing time interval, such as 2 seconds
|    let g:SrcExpl_RefreshTime   = 2
|    " Initialize the height of the Source Explorer window
|    let g:SrcExpl_WinHeight     = 9
|    " Make your own map key to force to do a refreshing
|    let g:SrcExpl_RefreshMapKey = "<Space>"
|    " Make your own map key for 'SrcExplGoBack' operation
|    let g:SrcExpl_GoBackMapKey  = "<C-b>"
|    " Toggles the Source Explorer on and off
|    nmap <F8> :SrcExplToggle<CR>
|
|3\ Enjoy vimming:)
|
|Tips:
|
|1\ You must make sure that there is a 'tags' file in your project PATH.
|2\ You have to compile your (G)VIM using 'quickfix' option.

"
```

## 19.20 Doxygen support

```text
	http://www.vim.org/scripts/script.php?script_id=1955

	This plugin generates Ex commands and a menu (or a menu tree) from a template
file containing user defined comment templates to be used for source code
documentation with Doxygen. The template file can have user defined macros.

Example and screen shots :   http://lug.fh-swf.de/vim/vim-doxygen/index.html

The help file online :   http://lug.fh-swf.de/vim/vim-doc/doxygensupport.html

"
```

### 19.20.1 Documentation

```text
		h doxygensupport

"
```

### 19.20.2 Install

```text
(1) Copy the zip archive  doxygen-support.zip to $HOME/.vim/ or $VIM/vimfiles
    (on the Windows platforms) and run

      unzip doxygen-support.zip

    If you have already an older version of doxygen-support and you have modified
    the template files you may want to save your templates first or copy the
    files from the archive by hand.

(2) Loading of plugin files must be enabled. If not use
      :filetype plugin on
    This is the minimal content of the file '$HOME/.vimrc'. Create one if there
    is none.

(3) Set at least some personal details in the main file
    'doxygen-support/templates/doxygen.templates'.

(4) Restart gVim/Vim generate the help tags

      :helptags ~/.vim/doc

    and look at the doxygensupport help with

      :h doxygensupport
```

### 19.20.3 Usage

#### 19.20.3.1 GUI

```text
The Doxygen menu will be generated when the editor starts (GUI only) or on
demand (see|doxygensupport-rebuild|).

The template names from the template definition file become menu items linked
with the template body. The template body will be inserted below the cursor.

The delimiter '.' has a special meaning: it separates a submenu name from its
submenu items. The template names

 ==block.short==
 ==block.long==
 ==block.special==

will generate a submenu entry 'block'  with the items 'short', 'long', and
'special' :

 block --+--> long
         |
         +--> short
         |
         +--> special

This feature can be used to arrange the templates into groups. The template
names

 ==C.block-short==
 ==C.block-long==
 ==C.block-special==
 ==Cpp.block-short==
 ==Cpp.block-long==
 ==Cpp.block-special==

result in menus in which the templates are arranged according to C/C++
commenting styles:

 C   --+--> block-short
       +--> block-long
       +--> block-special
 Cpp --+--> block-short
       +--> block-long
       +--> block-special
```

#### 19.20.3.2 Non GUI (xterm, eterm etc)

```text
This plugin generates an Ex command for each Doxygen template.  These commands
will be generated when the editor starts or on demand (see|doxygensupport-rebuild|).

Vim Ex command names have to start always with an uppercase letter followed by
letters or digits. Delimiters are not allowed.  The user defined template
names are therefore transformed into camel case notation.  The parts separated
by the delimiters are joined together now. The first letter of each part will
be transformed to uppercase. The new word will be prefixed by 'Doxy'. Some
examples:

 template name           Ex command
 ----------------------------------------
 ==block.long==          DoxyBlockLong
 ==block.short==         DoxyBlockShort
 ==block.special==       DoxyBlockSpecial
 ==file-header==         DoxyFileHeader
 ==function==            DoxyFunction

 ***  You do not need to remember the names of these Ex commands. Just type
 ***  'Doxy' on the command line and use the tab expansion to show the names
 ***  and to choose from.

NAMING CONFLICTS. The template names

 ==block-special==       DoxyBlockSpecial
 ==block+special==       DoxyBlockSpecial

will generate two different menu items but obviously the same Ex command name.
Avoiding these conflicts is up to you.
```

## 19.21 LargeFile

```text
Sets up an autocmd to make editing large files work with celerity 
```

## 19.22 CCtree C Call-Tree Explorer - Source-code analysis, real-time display of code flow

```text
http://www.vim.org/scripts/script.php?script_id=2368
```

### 19.22.1 Install

```text
Install details
Installation:
Copy this file to ~/.vim/plugins/
or to /vimfiles/plugins/  (on Win32 platforms)

It might also be possible to load it as a filetype plugin
~/.vim/ftplugin/c/

Need to set :filetype plugin on 
```

### 19.22.2 Help

```text
http://sites.google.com/site/vimcctree/help

CCTree generates call-trees for any function or macro in real-time inside Vim.
Requires Cscope and operation is currently limited to C code.
```

### 19.22.3 Options

```text
You can customize behavior by changing the following variable settings
```

#### 19.22.3.1. Cscope Symbol Database~

```text
                                                *CCTreeCscopeDb*

Cscope database file, g:CCTreeCscopeDb = "cscope.out"
```

#### 19.22.3.2. Call-tree Depth~

```text
                                                *CCTreeRecursiveDepth* 
Maximum call levels,   g:CCTreeRecursiveDepth = 3
```

#### 19.22.3.3. Call-tree Minimum Visible Depth~

```text
                                                *CCTreeMinVisibleDepth*
Maximum visible(unfolded) level, g:CCTreeMinVisibleDepth = 3
```

#### 19.22.3.4. Call-tree window display~

#### 19.22.3.4.1 Orientation~

```text
                                                *CCTreeOrientation*
Orientation of window,  g:CCTreeOrientation = "leftabove"
 (standard vim options for split: [right|left][above|below])
```

#### 19.22.3.5 Direction~

```text
                                                *CCTreeWindowVertical* 
Use Vertical window, g:CCTreeWindowVertical = 1
```

#### 19.22.3.5.1 Dimensions~

```text
These settings determine the layout of the CCTree preview window.
```

#### 19.22.3.5.2 Horizontal Window Settings~

```text
                                                *CCTreeWindowHeight* 
 Horizontal window, g:CCTreeWindowHeight, default is -1.
```

#### 19.22.3.5.2 Vertical Window Settings~

```text
                                                *CCTreeWindowMinWidth* 
                                                *CCTreeWindowWidth* 
 Minimum width for window, g:CCTreeWindowMinWidth = 40.
 g:CCTreeWindowWidth = -1, auto-select best width to fit.
```

#### 19.22.3.6 Call-tree display format~

```text
                                                *CCTreeDisplayMode*
Display format, g:CCTreeDisplayMode, default: 1

Values: 1 -- Ultra-compact (takes minimum screen width)
        2 -- Compact       (Takes little more space)
        3 -- Wide          (Takes copious amounts of space)

For vertical splits, 1 and 2 are good, while 3 is good for horizontal
displays.
```

#### 19.22.3.7. Dynamic Call-tree highlighting~

```text
                                                *CCTreeHilightCallTree*

Enable/disable dynamic call-tree highlighting, default: 1
```

#### 19.22.3.7.1 Syntax items~

```text
                                               *CCTreeSymbol* *CCTreeHiSymbol*
CCTreeSymbol is the symbol name.
CCTreeHiSymbol is the highlighted call tree functions.

                                               *CCTreeMarkers* *CCTreeHiMarkers*
CCTreeMarkers include  "|","+--->".
CCTreeHiMarkers is the same as CCTreeMarkers except these denote the
highlighted call-tree.
```

### 19.22.4 Usage

#### 19.22.4.1. Symbol database~

```text
Build cscope database, for example:
run my cscope generating alias gen_scope
( find . \( -name "*.[chCH]" -o -name "*.cpp" -o -name "*.hpp" \) > my_cscope.files; cscope -ibkq my_cscope.files -b)
mv my_cscope.files cscope.files
> cscope -b -i cscope.files
 [Tip: add -c option to build uncompressed databases for faster
    load speeds]

Load database with command ":CCTreeLoadDB"
(Please note that it might take a while depending on the
       	138 database size)

A database name, i.e., my_cscope.out, can be specified with the command. If
not provided, a prompt will ask for the filename; default is cscope.out.

To unload database, use command ":CCTreeUnLoadDB"
```

#### 19.22.4.2. Exploring source-code~

```text
Get reverse call tree for symbol  <C-\><
:CCTreeTraceReverse <symbolname>    
That is ctrl and \ and <

Get forward call tree for symbol  <C-\>>
:CCTreeTraceForward <symbolname>

Increase depth of tree and update <C-\>=
:CCTreeRecurseDepthPlus    

Decrease depth of tree and update <C-\>-
:CCTreeRecurseDepthMinus    

Open symbol in other window       <CR>
Preview symbol in other window    <Ctrl-P>
```

#### 19.22.4.4. Syntax Coloring~

```text
CCTreeHiXXXX allows dynamic highlighting of the call-tree.  To observe the
effect, move the cursor to the function to highlight the current call-tree.
This option can be turned off using the setting, *CCTreeHilightCallTree* .

For faster highlighting, the value of 'updatetime' can be changed.
```

## 19.23 project.vim

```text
				By Aric Blumer
		      aricvim email-at-sign charter.net

	Contents:

		Commands...................|project-invoking|
		Inheritance.............|project-inheritance|
		Mappings...................|project-mappings|
		Adding Mappings.....|project-adding-mappings|
		Settings...................|project-settings|
		Example File................|project-example|
		Tips...........................|project-tips|


You can use this plugin's basic functionality to set up a list of
frequently-accessed files for easy navigation. The list of files will be
displayed in a window on the left side of the Vim window, and you can press
<Return> or double-click on filenames in the list to open the files. I find
this easier to use than having to navigate a directory hierarchy with the
|file-explorer|.

You can also instruct the Plugin to change to a directory and to run Vim
scripts when you select a file. These scripts can, for example, modify the
environment to include compilers in $PATH. This makes it very easy to use
quickfix with multiple projects that use different environments.

Other features include:
	o Loading/Unloading all the files in a Project (\l, \L, \w, and \W)
	o Grepping all the files in a Project (\g and \G)
	o Running a user-specified script on a file (can be used to launch an
	  external program on the file) (\1 through \9)
	o Running a user-specified script on all the files in a Project
	  (\f1-\f9 and \F1-\F9)
	o High degree of user-configurability
	o Also works with |netrw| using the XXXX://... notation where XXXX is
	  ftp, rcp, scp, or http.

All of this is specified within a simple text file and a few global variables
in your vimrc file.

You must set 'nocompatible' in your |vimrc| file to use this plugin. You can
stop the plugin from being loaded by setting the "loaded_project" variable: >
	:let loaded_project = 1


==============================================================================
```

### 19.23.1 COMMANDS *project-invoking*

```text
You can use the plugin by placing it in your plugin directory (e.g.,
~/.vim/plugin). See |add-global-plugin|. When you start vim the next time, you
then enter the command >
    :Project
or >
    :Project {file}

If you do not specify the filename, $HOME/.vimprojects is used.

To have Vim come up with the Project Window enabled automatically (say, from a
GUI launcher), run Vim like this:  [g]vim +Project

Note that you can invoke :Project on only one file at a time.  If you wish to
change the Project File, do a :bwipe in the Project Buffer, then re-invoke the
Plugin as described above.

Several Projects can be kept and displayed in the same file, each in a fold
delimited by { and } (see |fold.txt|).  There can be any number of nested
folds to provide you with a Project hierarchy.  Any line without a { or a } in
the file is considered to be a filename.  Blank lines are ignored, and any
text after a # is ignored.

Because the plugin uses standard Vim folds, you can use any of the
|fold-commands|. You can double-click on the first line of a fold to open and
close it. You can select a file to open by putting the cursor on its name and
pressing <Return> or by double-clicking on it.  The plugin will create a new
window to the right or use the |CTRL-W_p| equivalent if it exists.

							      *project-syntax*
Each Project Entry has this form:

project_entry ::=
    <Description>={projpath} [{options}] {
	[ filename ]
	[ project_entry ]
    }

{options} is one or more of the following (on the same line):
    CD={path}
    in={filename}
    out={filename}
    filter="{pat}"
    flags={flag}

Note that a project_entry can reside within a project_entry. This allows you
to set up a hierarchy within your Project.

The <Description> will be displayed in the foldtext and cannot contain "=".
There can be no space character directly on either side of the =.

The {projpath} is the path in which the files listed in the Project's fold
will be found, and it may contain environment variables.  If the path is a
relative path, then the plugin constructs the whole path from the Project's
parent, grandparent, etc., all the way up the hierarchy. An outermost
project_entry must have an absolute path.  See the |project-inheritance|
example below.  {projpath} may contain spaces, but they must be escaped like
normal Vim escapes. Here are two examples of the same directory:
>
	Example=/my/directory/with\ spaces {
	}
	Example="/my/directory/with spaces" {
	}

I recommend this for Windows®: >

	Example="c:\My Documents" {
	}

But Vim is smart enough to do this, too: >

	Example=c:\My\ Documents {
	}

CD= provides the directory that Vim will change to when you select a file in
that fold (using |:cd|). This allows you, for example, to enter |:make| to use
the local Makefile.  A CD=. means that Vim will make {projpath} or its
inherited equivalent the current working directory.  When CD is omitted, the
directory is not changed.  There can be no space on either side of the =.  The
value of CD can also be a relative path from a parent's CD.  See the
|project-inheritance| example below.  This directive is ignored for |netrw|
projects. Spaces are allowed in the path as for {projpath}.

in= and out= provide the means to run arbitrary Vim scripts whenever you enter
or leave a file's buffer (see the |BufEnter| and |BufLeave| autocommand
events).  The idea is to have a Vim script that sets up or tears down the
environment for the Project like this:

in.vim: >
	let $PROJECT_HOME='~/my_project'
	" Put the compiler in $PATH
	if $PATH !~ '/path/to/my/compiler'
		let $PATH=$PATH.':/path/to/my/compiler'
	endif

out.vim: >
	" Remove compiler from $PATH
	if $PATH =~ '/path/to/my/compiler'
		let $PATH=substitute($PATH, ':/path/to/my/compiler', '', 'g')
	endif

Then you can use :make with the proper environment depending on what file you
are currently editing.  If the path to the script is relative, then it is
relative from {projpath}.  These directives are inherited by Subprojects
unless the Subproject specifies its own. For use with |netrw| projects, the
paths specified for in= and out= must be absolute and local.

filter= specifies a |glob()| file pattern. It is used to regenerate the list
of files in a Project fold when using the \r (<LocalLeader>r) map in the
Project Window.  The filter value must be in quotes because it can contain
multiple file patterns.  If filter is omitted, then the * pattern is used.
There can be no space on either side of the =.  A Subproject will inherit the
filter of its parent unless it specifies its own filter.

flags= provides the means to enable/disable features for a particular fold.
The general mnemonic scheme is for lower case to turn something off and upper
case to turn something on.  {flag} can contain any of the following
characters:

      flag      Description ~

	l	Turn off recursion for this fold for \L.  Subfolds are also
	        blocked from the recursion.

	r	Turn off refresh. When present, do not refresh this fold when
		\r or \R is used.  This does not affect subfold recursion.

	S	Turn on sorting for refresh and create.

	s	Turn off sorting for refresh and create.

	T	Turn on top gravity.  Forces folds to the top of the current
		fold when refreshing. It has the same affect as the 'T' flag
		in g:proj_flags, but controls the feature on a per-fold basis.

	t	Turn off top gravity.  Forces folds to the bottom of the
	        current fold when refreshing.

	w	Turn off recursion for this fold for \W.  Subfolds are also
	        blocked from the recursion.


Flags are not inherited by Subprojects.

Any text outside a fold is ignored.


==============================================================================
```

### 19.23.2 INHERITANCE *project-inheritance*

```text
It's best to show inheritance by comparing these two Project Files:
>
	Parent=~/my_project CD=. filter="Make* *.mk" flags=r {
	 Child1=c_code {
	 }
	 Child2=include CD=. filter="*.h" {
	 }
	}

Child1's path is "~/my_project/c_code" because ~/my_project is inherited.  It
also inherits the CD from Parent.  Since Parent has CD=., the Parent's cwd is
"~/my_project".  Child1 therefore inherits a CD of "~/my_project".  Finally,
Child1 inherits the filter from Parent. The flags are not inherited.

Child2 only inherits the "~/my_project" from Parent.

Thus, the example above is exactly equivalent to this:
>
	Parent=~/my_project CD=. filter="Make* *.mk" flags=r {
	 Child1=~/my_project/c_code CD=~/my_project filter="Make* *.mk" {
	 }
	 Child2=~/my_project/include CD=~/my_project/include filter="*.h" {
	 }
	}

(For a real Project, Child1 would not want to inherit its parent's filter, but
this example shows the concept.)  You can always enter \i to display what the
cursor's project inherits.


==============================================================================
```

### 19.23.3 MAPPINGS *project-mappings*

```text
Map	Action ~

\r	Refreshes the Project fold that the cursor is in by placing in the
	fold all the files that match the filter. The Project is refreshed
	using an indent of one space for every foldlevel in the hierarchy.

	You may place a "# pragma keep" (without the quotes) at the end of a
	line, and the file entry on that line will not be removed when you
	refresh.  This is useful, for example, when you have . as an entry so
	you can easily browse the directory.
	
	Note that this mapping is actually <LocalLeader>r, and the default of
	|<LocalLeader>| is \.

	This does not work for Projects using |netrw|.

\R	Executes \r recursively in the current fold and all folds below.
	This does not work for Projects using |netrw|.

\c	Creates a Project fold entry.  It asks for the description, the path
	to the files, the CD parameter, and the filename |glob()| pattern.
	From this information, it will create the Project Entry below the
	cursor.

	This does not work for Projects using |netrw|.

\C	Creates a Project fold entry like \c, but recursively includes all the
	subdirectories.

<Return>
	Select a file to open in the |CTRL-W_p| window or in a new window.  If
	the cursor is on a fold, open or close it.

<S-Return>
\s
	Same as <Return> but horizontally split the target window.
	<LocalLeader>s is provided for those terminals that don't recognize
	<S-Return>.

\S
	Load all files in a project by doing horizontal splits.

<C-Return>
\o
	Same as <Return> but ensure that the opened file is the only other
	window. <LocalLeader>o is provided for those terminals that don't
	recognize <C-Return>.

<M-Return>
\v
	Same as <Return> but only display the file--the cursor stays in the
	Project Window.

<2-LeftMouse>
	(Double-click) If on a closed fold, open it. If on an open fold
	boundary, close it. If on a filename, open the file in the |CTRL-W_p|
	window or in a new window.

<S-2-LeftMouse>
	Same as <S-Return>.

<C-2-LeftMouse>
	Same as <C-Return>.

<RightMouse>
	Increase the width of the Project Window by g:proj_window_increment or
	toggle between a width of
		g:proj_window_width + g:proj_window_increment
	and
		g:proj_window_width.

	Whether you toggle or monotonically increase the width is determined
	by the 't' flag of the g:proj_flags variable (see |project-flags|).

	Note that a Right Mouse click will not automatically place the cursor
	in the Project Window if it is in a different window.  The window will
	go back to the g:proj_window_width width when you leave the window.

<space> Same as <RightMouse>

<CTRL-Up>
\<Up>
	Move the text or fold under the cursor up one row. This may not work
	in a terminal because the terminal is unaware of this key combination.
	<LocalLeader><Up> is provided for those terminals that don't recognize
	<C-Up>.


<CTRL-Down>
\<Down>
	Move the text or fold under the cursor down one row. This may not work
	in a terminal because the terminal is unaware of this key combination.
	<LocalLeader><Down> is provided for those terminals that don't
	recognize <C-Down>.

\i	Show in the status line the completely resolved and inherited
	parameters for the fold the cursor is in.  This is intended for
	debugging your relative path and inherited parameters for manually
	entered Projects.

\I	Show in the status line the completely resolved filename.  Uses the
        Project_GetFname(line('.')) function.

\1 - \9
	Run the command specified in g:proj_run{x} where {x} is the number
	of the key.  See the documentation of g:proj_run1 below.

\f1-\f9
	Run the command specified in g:proj_run_fold{x} where {x} is the
	number of the key.  The command is run on the files at the current
	Project level. See the |project-settings| below.

\F1-\F9
	Run the command specified in g:proj_run_fold{x} where {x} is the
	number of the key.  The command is run on the files at the current
	Project level and all Subprojects. See the |project-settings| below.

\0	Display the commands that are defined for \1 through \9.

\f0	Display the commands that are defined for \f1 through \f9 and \F1
	through \F0.  Same as \F0.

\l	Load all the files in the current Project level into Vim.  While files
	are being loaded, you may press any key to stop.

\L	Load all the files in the current Project and all Subprojects into
	Vim.  Use this mapping with caution--I wouldn't suggest using \L to
	load a Project with thousands of files. (BTW, my Project file has more
	than 5,300 files in it!)  While files are being loaded, you may press
	any key to stop.

\w	Wipe all the files in the current Project level from Vim. (If files
	are modified, they will be saved first.)  While files are being wiped,
	you may press any key to stop.

\W	Wipe all the files in the current Project and all Subprojects from
	Vim. (If files are modified, they will be saved first.)  While files
	are being wiped, you may press any key to stop.

\g	Grep all the files in the current Project level.

\G	Grep all the files in the current Project level and all Subprojects.

\e	Set up the Environment for the Project File as though you had selected
	it with <Return>.  This allows you to do a \e and a :make without
	having to open any files in the project.

\E	Explore (using |file-explorer|) the directory of the project the
	cursor is in.  Does not work with netrw.

<F12>	When the 'g' flag is present in g:proj_flags (see |project-flags|)
	this key toggles the Project Window open and closed. You may remap
	this toggle function by putting the following in your vimrc and
	replacing <Leader>P with whatever key combination you wish:

		nmap <silent> <Leader>P <Plug>ToggleProject

Note that the Project Plugin remaps :help because the Help Window and the
Project Window get into a fight over placement. The mapping avoids the
problem.

==============================================================================

		19.23.4
ADDING MAPPINGS 				     *project-adding-mappings*

You can add your own mappings or change the mappings of the plugin by placing
them in the file $HOME/.vimproject_mappings.  This file, if it exists, will be
sourced when the plugin in loaded.  Here is an example that will count the
number of entries in a project when you press \K (Kount, C is taken :-): >

    function! s:Wc()
        let b:loadcount=0
        function! SpawnExec(infoline, fname, lineno, data)
	    let b:loadcount = b:loadcount + 1
	    if getchar(0) != 0 | let b:stop_everything=1 | endif
        endfunction
        call Project_ForEach(1, line('.'), "*SpawnExec", 0, '')
        delfunction SpawnExec
        echon b:loadcount." Files\r"
        unlet b:loadcount
        if exists("b:stop_everything")
	    unlet b:stop_everything
	    echon "Aborted.\r"
	endif
    endfunction

    nnoremap <buffer> <silent> <LocalLeader>K :call <SID>Wc()<CR>

Here's another example of how I integrated the use of perforce with the plugin
in my $HOME/.vimproject_mappings:
>
	function! s:DoP4(cmd)
	   let name=Project_GetFname(line('.'))
	   let dir=substitute(name, '\(.*\)/.*', '\1', 'g')
	   exec 'cd '.dir
	   exec "!".a:cmd.' '.Project_GetFname(line('.'))
	   cd -
	endfunction

	nmap <buffer> <silent> \pa :call <SID>DoP4("p4add")<CR>
	nmap <buffer> <silent> \pe :call <SID>DoP4("p4edit")<CR>
<
(Note that I CD to the directory the file is in so I can pick of the $P4CONFIG
file. See the perforce documentation.)

This creates the mappings \pe to check out the file for edit and \pa to add
the file to the depot.

Here is another example where I remap the <Return> mapping to use an external
program to launch a special kind of file (in this case, it launches ee to view
a jpg file).  It is a bit contrived, but it works.
>
	let s:sid = substitute(maparg('<Return>', 'n'), '.*\(<SNR>.\{-}\)_.*', '\1', '')
	function! s:LaunchOrWhat()
	    let fname=Project_GetFname(line('.'))
	    if fname =~ '\.jpg$'
		exec 'silent! !ee "'.fname.'"&'
	    else
		call {s:sid}_DoFoldOrOpenEntry('', 'e')
	    endif
	endfunction
	nnoremap <buffer> <silent> <Return>   \|:call <SID>LaunchOrWhat()<CR>
<
If the file ends in .jpg, the external program is launched, otherwise the
original mapping of <Return> is run.

==============================================================================
```

### 19.23.5 ADDING MAPPINGS *project-adding-mappings*

```text
You can add your own mappings or change the mappings of the plugin by placing
them in the file $HOME/.vimproject_mappings.  This file, if it exists, will be
sourced when the plugin in loaded.  Here is an example that will count the
number of entries in a project when you press \K (Kount, C is taken :-): >

    function! s:Wc()
        let b:loadcount=0
        function! SpawnExec(infoline, fname, lineno, data)
	    let b:loadcount = b:loadcount + 1
	    if getchar(0) != 0
SETTINGS						    *project-settings*

You can set these variables in your vimrc file before the plugin is loaded to
change its default behavior

g:proj_window_width
	The width of the Project Window that the plugin attempts to maintain.
	Default: 24

	The Project Plugin is not always successful in keeping the window
	where I want it with the size specified here, but it does a decent
	job.

g:proj_window_increment
	The increment by which to increase the width of the Project Window
	when pressing <space> or clicking the <LeftMouse>. Default: 100
	(See |project-mappings|.)

							       *project-flags*
g:proj_flags
	Default: "imst"
	Various flags to control the behavior of the Project Plugin.  This
	variable can contain any of the following character flags.

       flag	Description ~

	b	When present, use the |browse()| when selecting directories
		for \c and \C.  This is off by default for Windows, because
		the windows browser does not allow you to select directories.

	c	When present, the Project Window will automatically close when
		you select a file.

	F	Float the Project Window.  That is, turn off automatic
		resizing and placement.  This allows placement between other
		windows that wish to share similar placement at the side of
		the screen.  It is also particularly helpful for external
		window managers.

	g	When present, the mapping for <F12> will be created to toggle
		the Project Window open and closed.

	i	When present, display the filename and the current working
		directory in the command line when a file is selected for
		opening.

	l	When present, the Project Plugin will use the |:lcd| command
		rather than |:cd| to change directories when you select a file
		to open.  This flag is really obsolete and not of much use
		because of L below.

	L	Similar to l, but install a BufEnter/Leave |:autocommand| to
		ensure that the current working directory is changed to the
		one specified in the fold CD specification whenever that
		buffer is active.  (|:lcd| only changes the CWD for a window,
		not a buffer.)

	m	Turn on mapping of the |CTRL-W_o| and |CTRL-W_CTRL_O| normal
	        mode commands to make the current buffer the only visible
		buffer, but keep the Project Window visible, too.

	n	When present, numbers will be turned on for the project
	        window.

	s	When present, the Project Plugin will use syntax highlighting
		in the Project Window.

	S	Turn on sorting for refresh and create.

	t	When present, toggle the size of the window rather than just
		increase the size when pressing <space> or right-clicking.
		See the entry for <RightMouse> in |project-mappings|.

	T	When present, put Subproject folds at the top of the fold when
		refreshing.

	v	When present, use :vimgrep rather than :grep when using \G.

g:proj_run1 ...  g:proj_run9
		Contains a Vim command to execute on the file.  See the
		mappings of \1 to \9 above.
		
		  %f is replaced with the full path and filename
		  %F is replaced with the full path and filename with spaces
		     quoted
		  %n is replaced with the filename alone
		  %N is replaced with the filename alone with spaces quoted
		  %h is replaced with the home directory
		  %H is replaced with the home directory with spaces quoted
		  %r is replaced with the directory relative to the CD path
		  %R is replaced with the directory relative to the CD path
		     with spaces quoted
		  %d is replaced with the CD directory.
		  %D is replaced with the CD directory.with spaces quoted
		  %% is replaced with a single % that is not used in
		     expansion.

		(Deprecated: %s is also replaced with the full path and
		filename for backward compatibility.)

		For example, gvim will be launched on the file under the
		cursor when you enter \3 if the following is in your vimrc
		file: >
		 let g:proj_run3='silent !gvim %f'
<		Here are a few other examples: >
		 let g:proj_run1='!p4 edit %f'
		 let g:proj_run2='!p4 add %f'
		 let g:proj_run4="echo 'Viewing %f'|sil !xterm -e less %f &"
<
		On Windows systems you will want to put the %f, %h, and %d in
		single quotes to avoid \ escaping.

g:proj_run_fold1 ...  g:proj_run_fold9
		Contains a Vim command to execute on the files in a fold.  See
		the mappings of \f1 to \f9  and \F1 to \F9 above.
		
		%f is the filename, %h is replaced with the project home
		directory, and %d is replaced with the CD directory.  Multiple
		filenames can be handled in two ways:

		The first (default) way is to have %f replaced with all the
		absolute filenames, and the command is run once.  The second
		is to have the command run for each of the non-absolute
		filenames (%f is replaced with one filename at a time).  To
		select the second behavior, put an '*' character at the
		beginning of the g:proj_run_fold{x} variable.  (The '*' is
		stripped before the command is run.)

		For example, note the difference between the following: >
		 let g:proj_run_fold3="*echo '%h/%f'"
		 let g:proj_run_fold4="echo '%f'"
<
		Note that on Windows systems, you will want the %f, %h, and %c
		within single quotes, or the \ in the paths will cause
		problems.  The alternative is to put them in |escape()|.


==============================================================================
```

### 19.23.6 PROJECT EXAMPLE FILE *project-example*

```text
Here is an example ~/.vimprojects file: >

|  1	My Project=~/c/project CD=. in=in.vim out=out.vim flags=r {
|  2	 Makefile
|  3      in.vim
|  4      out.vim
|  5	 GUI Files=. filter="gui*.c gui*.h" {
|  6	  gui_window.c
|  7	  gui_dialog.c
|  8	  gui_list.c
|  9	  gui.h	       # Header file
| 10	 }
| 11	 Database Files=. filter="data*.c data*.h" {
| 12	  data_read.c
| 13	  data_write.c
| 14	  data.h
| 15	 }
| 16	 OS-Specific Files {
| 17	  Win32=. filter="os_win32*.c os_win32*.h" {
| 18	   os_win32_gui.c
| 19	   os_win32_io.c
| 20	  }
| 21	  Unix=. filter="os_unix*.c os_unix*.h" {
| 22	   os_unix_gui.c
| 23	   os_unix_io.c
| 24	  }
| 25	 }
| 26	}

(Don't type in the line numbers, of course.)


==============================================================================
```

### 19.23.7 TIPS ON USING PROJECT PLUGIN *project-tips*

```text
|1.  You can create a Project Entry by entering this: >
|
|	Label=~/wherever CD=. filter="*.c *.h" {
|	}
|<
|    Then you can put the cursor in the fold and press \r. The script will fill
|    in the files (C files in this case) from this directory for you.  This is
|    equivalent to \c without any dialogs.
|
|2.  You can edit the Project File at any time to add, remove, or reorder files
|    in the Project list.
|
|3.  If the Project Window ever gets closed, you can just enter >
|	:Project
|<   to bring it back again. (You don't need to give it the filename; the
|    plugin remembers.)
|
|    If you have the 'm' flag set in g:proj_flags, then you get the Project
|    Window to show up again by pressing |CTRL-W_o|. This, of course, will
|    close any other windows that may be open that the cursor is not in.
|
|4.  Adding files to a Project is very easy.  To add, for example, the 'more.c'
|    file to the Project, just insert the filename in the Project Entry then
|    hit <Return> on it.
|
|5.  When |quickfix| loads files, it is not equivalent to pressing <Return> on
|    a filename, so the directory will not be changed and the scripts will not
|    be run. (If I could make this otherwise, I would.)  The solution is to use
|    the \L key to load all of the files in the Project before running
|    quickfix.
|
|6.  If the Project window gets a bit cluttered with folds partially
|    open/closed, you can press |zM| to close everything and tidy it up.
|
|7.  For advanced users, I am exporting the function Project_GetAllFnames()
|    which returns all the filenames within a fold and optionally all its
|    Subprojects.  Also, I export Project_ForEach() for running a function for
|    each filename in the project. See the code for examples on how to use
|    these. Finally, I export Project_GetFname(line_number) so that you can
|    write your own mappings and get the filename for it.
|
|8.  Some people have asked how to do a global mapping to take the cursor to
|    the Project window. One of my goals for the plugin is for it to be as
|    self-contained as possible, so I'm not going to add it by default. But you
|    can put this in your vimrc:
|>
|    	nmap <silent> <Leader>P :Project<CR>
|
|<
|9.  You can put the . entry in a project, and it will launch the
    |file-explorer| plugin on the directory.  To avoid removal when you
    refresh, make the entry look like this:
>
 	. # pragma keep
```

## 19.24 surround.vim

```text
INTRODUCTION                                    *surround*

This plugin is a tool for dealing with pairs of "surroundings."  Examples
of surroundings include parentheses, quotes, and HTML tags.  They are
closely related to what Vim refers to as |text-objects|.  Provided
are mappings to allow for removing, changing, and adding surroundings.

Details follow on the exact semantics, but first, consider the following
examples.  An asterisk (*) is used to denote the cursor position.

  Old text                  Command     New text ~
  "Hello *world!"           ds"         Hello world!
  [123+4*56]/2              cs])        (123+456)/2
  "Look ma, I'm *HTML!"     cs"<q>      <q>Look ma, I'm HTML!</q>
  if *x>3 {                 ysW(        if ( x>3 ) {
  my $str = *whee!;         vlllls'     my $str = 'whee!';

While a few features of this plugin will work in older versions of Vim,
Vim 7 is recommended for full functionality.

MAPPINGS                                        *surround-mappings*

Delete surroundings is *ds* .  The next character given determines the target
to delete.  The exact nature of the target are explained in |surround-targets|
but essentially it is the last character of a |text-object|.  This mapping
deletes the difference between the "inner" object and "an" object.  This is
easiest to understand with some examples:

  Old text                  Command     New text ~
  "Hello *world!"           ds"         Hello world!
  (123+4*56)/2              ds)         123+456/2
  <div>Yo!*</div>           dst         Yo!

Change surroundings is *cs* .  It takes two arguments, a target like with
|ds|, and a replacement.  Details about the second argument can be found
below in |surround-replacements|.  Once again, examples are in order.

  Old text                  Command     New text ~
  "Hello *world!"           cs"'        'Hello world!'
  "Hello *world!"           cs"<q>      <q>Hello world!</q>
  (123+4*56)/2              cs)]        [123+456]/2
  (123+4*56)/2              cs)[        [ 123+456 ]/2
  <div>Yo!*</div>           cst<p>      <p>Yo!</p>

*ys* takes an valid Vim motion or text object as the first object, and wraps
it using the second argument as with |cs|.  (Unfortunately there's no good
mnemonic for "ys".)

  Old text                  Command     New text ~
  Hello w*orld!             ysiw)       Hello (world)!

As a special case, *yss* operates on the current line, ignoring leading
whitespace.

  Old text                  Command     New text ~
      Hello w*orld!         yssB            {Hello world!}

There is also *yS* and *ySS* which indent the surrounded text and place it
on a line of its own.

In visual mode, a simple "s" with an argument wraps the selection.  This is
referred to as the *vs* mapping, although ordinarily there will be
additional keystrokes between the v and s.  In linewise visual mode, the
surroundings are placed on separate lines.  In blockwise visual mode, each
line is surrounded.

An "S" in visual mode (*vS*) behaves similarly but always places the
surroundings on separate lines.  Additionally, the surrounded text is
indented.  In blockwise visual mode, using "S" instead of "s" instead skips
trailing whitespace.

Note that "s" and "S" already have valid meaning in visual mode, but it is
identical to "c".  If you have muscle memory for "s" and would like to use a
different key, add your own mapping and the existing one will be disabled.
>
  vmap <Leader>s <Plug>Vsurround
  vmap <Leader>S <Plug>VSurround
<
                                                *i_CTRL-G_s* *i_CTRL-G_S*
Finally, there is an experimental insert mode mapping on <C-G>s and <C-S>.
Beware that the latter won't work on terminals with flow control (if you
accidentally freeze your terminal, use <C-Q> to unfreeze it).  The mapping
inserts the specified surroundings and puts the cursor between them.  If,
immediately after the mapping and before the replacement, a second <C-S> or
carriage return is pressed, the prefix, cursor, and suffix will be placed on
three separate lines.  <C-G>S (not <C-G>s) also exhibits this behavior.

TARGETS                                         *surround-targets*

The |ds| and |cs| commands both take a target as their first argument.  The
possible targets are based closely on the |text-objects| provided by Vim.
In order for a target to work, the corresponding text object must be
supported in the version of Vim used (Vim 7 adds several text objects, and
thus is highly recommended).  All targets are currently just one character.

Eight punctuation marks, (, ), {, }, [, ], <, and >, represent themselves
and their counterpart.  If the opening mark is used, contained whitespace is
also trimmed.  The targets b, B, r, and a are aliases for ), }, ], and >
(the first two mirror Vim; the second two are completely arbitrary and
subject to change).

Three quote marks, ', ", `, represent themselves, in pairs.  They are only
searched for on the current line.

A t is a pair of HTML or XML tags.  See |tag-blocks| for details.  Remember
that you can specify a numerical argument if you want to get to a tag other
than the innermost one.

The letters w, W, and s correspond to a |word|, a |WORD|, and a |sentence|,
respectively.  These are special in that they have nothing to delete, and
used with |ds| they are a no-op.  With |cs|, one could consider them a
slight shortcut for ysi (cswb == ysiwb, more or less).

A p represents a |paragraph|.  This behaves similarly to w, W, and s above;
however, newlines are sometimes added and/or removed.

'
```

## 19.25 NERD tree

```text
What is this "NERD tree"??

The NERD tree allows you to explore your filesystem and to open files and
directories. It presents the filesystem to you in the form of a tree which you
manipulate with the keyboard and/or mouse. It also allows you to perform
simple filesystem operations.

The following features and functionality are provided by the NERD tree:
    * Files and directories are displayed in a hierarchical tree structure
    * Different highlighting is provided for the following types of nodes:
        * files
        * directories
        * sym-links
        * windows .lnk files
        * read-only files
        * executable files
    * Many (customisable) mappings are provided to manipulate the tree:
        * Mappings to open/close/explore directory nodes
        * Mappings to open files in new/existing windows/tabs
        * Mappings to change the current root of the tree
        * Mappings to navigate around the tree
        * ...
    * Directories and files can be bookmarked.
    * Most NERD tree navigation can also be done with the mouse
    * Filtering of tree content (can be toggled at runtime)
        * custom file filters to prevent e.g. vim backup files being displayed
        * optional displaying of hidden files (. files)
        * files can be "turned off" so that only directories are displayed
    * The position and size of the NERD tree window can be customised
    * The order in which the nodes in the tree are listed can be customised.
    * A model of your filesystem is created/maintained as you explore it. This
      has several advantages:
        * All filesystem information is cached and is only re-read on demand
        * If you revisit a part of the tree that you left earlier in your
          session, the directory nodes will be opened/closed as you left them
    * The script remembers the cursor position and window position in the NERD
      tree so you can toggle it off (or just close the tree window) and then
      reopen it (with NERDTreeToggle) the NERD tree window will appear exactly
      as you left it
    * You can have a separate NERD tree for each tab, share trees across tabs,
      or a mix of both.
    * By default the script overrides the default file browser (netw), so if
      you :edit a directory a (slighly modified) NERD tree will appear in the
      current window
    * A programmable menu system is provided (simulates right clicking on a
      node)
        * one default menu plugin is provided to perform basic filesytem
          operations (create/delete/move/copy files/directories)
    * There's an API for adding your own keymappings
```

### 19.25.1 Install

```text
install details
Unzip the archive into your ~/.vim directory.
That should put NERD_tree.vim in ~/.vim/plugin and NERD_tree.txt in ~/.vim/doc.
Run :helptags.
```

### 19.25.2 Get help

```text
h NERD_tree.txt
```

### 19.25.3 Commands

```text
:NERDTree [<start-directory> | <bookmark>]                         *:NERDTree*
    Opens a fresh NERD tree. The root of the tree depends on the argument
    given. There are 3 cases: If no argument is given, the current directory
    will be used.  If a directory is given, that will be used. If a bookmark
    name is given, the corresponding directory will be used.  For example: >
        :NERDTree /home/marty/vim7/src
        :NERDTree foo   (foo is the name of a bookmark)
<
:NERDTreeFromBookmark <bookmark>                       *:NERDTreeFromBookmark*
    Opens a fresh NERD tree with the root initialized to the dir for
    <bookmark>.  This only reason to use this command over :NERDTree is for
    the completion (which is for bookmarks rather than directories).

:NERDTreeToggle [<start-directory> | <bookmark>]             *:NERDTreeToggle*
    If a NERD tree already exists for this tab, it is reopened and rendered
    again.  If no NERD tree exists for this tab then this command acts the
    same as the |:NERDTree| command.

:NERDTreeMirror                                              *:NERDTreeMirror*
    Shares an existing NERD tree, from another tab, in the current tab.
    Changes made to one tree are reflected in both as they are actually the
    same buffer.

    If only one other NERD tree exists, that tree is automatically mirrored. If
    more than one exists, the script will ask which tree to mirror.

:NERDTreeClose                                                *:NERDTreeClose*
    Close the NERD tree in this tab.

:NERDTreeFind                                                  *:NERDTreeFind*
    Find the current file in the tree. If no tree exists for the current tab,
    or the file is not under the current root, then initialize a new tree where
    the root is the directory of the current file.
```

### 19.25.4 Bookmarks

```text
Bookmarks in the NERD tree are a way to tag files or directories of interest.
For example, you could use bookmarks to tag all of your project directories.

------------------------------------------------------------------------------
```

#### 19.25.4.1 The Bookmark Table *NERDTreeBookmarkTable*

```text
If the bookmark table is active (see |NERDTree-B| and
|'NERDTreeShowBookmarks'|), it will be rendered above the tree. You can double
click bookmarks or use the |NERDTree-o| mapping to activate them. See also,
|NERDTree-t| and |NERDTree-T|

------------------------------------------------------------------------------
```

#### 19.25.4.2 Bookmark commands *NERDTreeBookmarkCommands*

```text
Note that the following commands are only available in the NERD tree buffer.

:Bookmark <name>
    Bookmark the current node as <name>. If there is already a <name>
    bookmark, it is overwritten. <name> must not contain spaces.

:BookmarkToRoot <bookmark>
    Make the directory corresponding to <bookmark> the new root. If a treenode
    corresponding to <bookmark> is already cached somewhere in the tree then
    the current tree will be used, otherwise a fresh tree will be opened.
    Note that if <bookmark> points to a file then its parent will be used
    instead.

:RevealBookmark <bookmark>
    If the node is cached under the current root then it will be revealed
    (i.e. directory nodes above it will be opened) and the cursor will be
    placed on it.

:OpenBookmark <bookmark>
    <bookmark> must point to a file. The file is opened as though |NERDTree-o|
    was applied. If the node is cached under the current root then it will be
    revealed and the cursor will be placed on it.

:ClearBookmarks [<bookmarks>]
    Remove all the given bookmarks. If no bookmarks are given then remove all
    bookmarks on the current node.

:ClearAllBookmarks
    Remove all bookmarks.

:ReadBookmarks
    Re-read the bookmarks in the |'NERDTreeBookmarksFile'|.

See also |:NERDTree| and |:NERDTreeFromBookmark|.

------------------------------------------------------------------------------
```

#### 19.25.4.3 Invalid Bookmarks *NERDTreeInvalidBookmarks*

```text
If invalid bookmarks are detected, the script will issue an error message and
the invalid bookmarks will become unavailable for use.

These bookmarks will still be stored in the bookmarks file (see
|'NERDTreeBookmarksFile'|), down the bottom. There will always be a blank line
after the valid bookmarks but before the invalid ones.

Each line in the bookmarks file represents one bookmark. The proper format is:
<bookmark name><space><full path to the bookmark location>

After you have corrected any invalid bookmarks, either restart vim, or go
:ReadBookmarks from the NERD tree window.
```

### 19.25.5 NERD tree Mappings *NERDTreeMappings*

```text
Default  Description~                                             help-tag~
Key~

o.......Open files, directories and bookmarks....................|NERDTree-o|
go......Open selected file, but leave cursor in the NERDTree.....|NERDTree-go|
t.......Open selected node/bookmark in a new tab.................|NERDTree-t|
T.......Same as 't' but keep the focus on the current tab........|NERDTree-T|
i.......Open selected file in a split window.....................|NERDTree-i|
gi......Same as i, but leave the cursor on the NERDTree..........|NERDTree-gi|
s.......Open selected file in a new vsplit.......................|NERDTree-s|
gs......Same as s, but leave the cursor on the NERDTree..........|NERDTree-gs|
O.......Recursively open the selected directory..................|NERDTree-O|
x.......Close the current nodes parent...........................|NERDTree-x|
X.......Recursively close all children of the current node.......|NERDTree-X|
e.......Edit the current dif.....................................|NERDTree-e|

<CR>...............same as |NERDTree-o|.
double-click.......same as the |NERDTree-o| map.
middle-click.......same as |NERDTree-i| for files, same as
                   |NERDTree-e| for dirs.

D.......Delete the current bookmark .............................|NERDTree-D|

P.......Jump to the root node....................................|NERDTree-P|
p.......Jump to current nodes parent.............................|NERDTree-p|
K.......Jump up inside directories at the current tree depth.....|NERDTree-K|
J.......Jump down inside directories at the current tree depth...|NERDTree-J|
<C-J>...Jump down to the next sibling of the current directory...|NERDTree-C-J|
<C-K>...Jump up to the previous sibling of the current directory.|NERDTree-C-K|

C.......Change the tree root to the selected dir.................|NERDTree-C|
u.......Move the tree root up one directory......................|NERDTree-u|
U.......Same as 'u' except the old root node is left open........|NERDTree-U|
r.......Recursively refresh the current directory................|NERDTree-r|
R.......Recursively refresh the current root.....................|NERDTree-R|
m.......Display the NERD tree menu...............................|NERDTree-m|
cd......Change the CWD to the dir of the selected node...........|NERDTree-cd|

I.......Toggle whether hidden files displayed....................|NERDTree-I|
f.......Toggle whether the file filters are used.................|NERDTree-f|
F.......Toggle whether files are displayed.......................|NERDTree-F|
B.......Toggle whether the bookmark table is displayed...........|NERDTree-B|

q.......Close the NERDTree window................................|NERDTree-q|
A.......Zoom (maximize/minimize) the NERDTree window.............|NERDTree-A|
?.......Toggle the display of the quick help.....................|NERDTree-?|

------------------------------------------------------------------------------
                                                                  *NERDTree-o*
Default key: o
Map option: NERDTreeMapActivateNode
Applies to: files and directories.

If a file node is selected, it is opened in the previous window.

If a directory is selected it is opened or closed depending on its current
state.

If a bookmark that links to a directory is selected then that directory
becomes the new root.

If a bookmark that links to a file is selected then that file is opened in the
previous window.

------------------------------------------------------------------------------
                                                                 *NERDTree-go*
Default key: go
Map option: None
Applies to: files.

If a file node is selected, it is opened in the previous window, but the
cursor does not move.

The key combo for this mapping is always "g" + NERDTreeMapActivateNode (see
|NERDTree-o|).

------------------------------------------------------------------------------
                                                                  *NERDTree-t*
Default key: t
Map option: NERDTreeMapOpenInTab
Applies to: files and directories.

Opens the selected file in a new tab. If a directory is selected, a fresh
NERD Tree for that directory is opened in a new tab.

If a bookmark which points to a directory is selected, open a NERD tree for
that directory in a new tab. If the bookmark points to a file, open that file
in a new tab.

------------------------------------------------------------------------------
                                                                  *NERDTree-T*
Default key: T
Map option: NERDTreeMapOpenInTabSilent
Applies to: files and directories.

The same as |NERDTree-t| except that the focus is kept in the current tab.

------------------------------------------------------------------------------
                                                                  *NERDTree-i*
Default key: i
Map option: NERDTreeMapOpenSplit
Applies to: files.

Opens the selected file in a new split window and puts the cursor in the new
window.

------------------------------------------------------------------------------
                                                                 *NERDTree-gi*
Default key: gi
Map option: None
Applies to: files.

The same as |NERDTree-i| except that the cursor is not moved.

The key combo for this mapping is always "g" + NERDTreeMapOpenSplit (see
|NERDTree-i|).

------------------------------------------------------------------------------
                                                                  *NERDTree-s*
Default key: s
Map option: NERDTreeMapOpenVSplit
Applies to: files.

Opens the selected file in a new vertically split window and puts the cursor in
the new window.

------------------------------------------------------------------------------
                                                                 *NERDTree-gs*
Default key: gs
Map option: None
Applies to: files.

The same as |NERDTree-s| except that the cursor is not moved.

The key combo for this mapping is always "g" + NERDTreeMapOpenVSplit (see
|NERDTree-s|).

------------------------------------------------------------------------------
                                                                  *NERDTree-O*
Default key: O
Map option: NERDTreeMapOpenRecursively
Applies to: directories.

Recursively opens the selelected directory.

All files and directories are cached, but if a directory would not be
displayed due to file filters (see |'NERDTreeIgnore'| |NERDTree-f|) or the
hidden file filter (see |'NERDTreeShowHidden'|) then its contents are not
cached. This is handy, especially if you have .svn directories.

------------------------------------------------------------------------------
                                                                  *NERDTree-x*
Default key: x
Map option: NERDTreeMapCloseDir
Applies to: files and directories.

Closes the parent of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-X*
Default key: X
Map option: NERDTreeMapCloseChildren
Applies to: directories.

Recursively closes all children of the selected directory.

Tip: To quickly "reset" the tree, use |NERDTree-P| with this mapping.

------------------------------------------------------------------------------
                                                                  *NERDTree-e*
Default key: e
Map option: NERDTreeMapOpenExpl
Applies to: files and directories.

|:edit|s the selected directory, or the selected file's directory. This could
result in a NERD tree or a netrw being opened, depending on
|'NERDTreeHijackNetrw'|.

------------------------------------------------------------------------------
                                                                  *NERDTree-D*
Default key: D
Map option: NERDTreeMapDeleteBookmark
Applies to: lines in the bookmarks table

Deletes the currently selected bookmark.

------------------------------------------------------------------------------
                                                                  *NERDTree-P*
Default key: P
Map option: NERDTreeMapJumpRoot
Applies to: no restrictions.

Jump to the tree root.

------------------------------------------------------------------------------
                                                                  *NERDTree-p*
Default key: p
Map option: NERDTreeMapJumpParent
Applies to: files and directories.

Jump to the parent node of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-K*
Default key: K
Map option: NERDTreeMapJumpFirstChild
Applies to: files and directories.

Jump to the first child of the current nodes parent.

If the cursor is already on the first node then do the following:
    * loop back thru the siblings of the current nodes parent until we find an
      open dir with children
    * go to the first child of that node

------------------------------------------------------------------------------
                                                                  *NERDTree-J*
Default key: J
Map option: NERDTreeMapJumpLastChild
Applies to: files and directories.

Jump to the last child of the current nodes parent.

If the cursor is already on the last node then do the following:
    * loop forward thru the siblings of the current nodes parent until we find
      an open dir with children
    * go to the last child of that node

------------------------------------------------------------------------------
                                                                *NERDTree-C-J*
Default key: <C-J>
Map option: NERDTreeMapJumpNextSibling
Applies to: files and directories.

Jump to the next sibling of the selected node.

------------------------------------------------------------------------------
                                                                *NERDTree-C-K*
Default key: <C-K>
Map option: NERDTreeMapJumpPrevSibling
Applies to: files and directories.

Jump to the previous sibling of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-C*
Default key: C
Map option: NERDTreeMapChdir
Applies to: directories.

Make the selected directory node the new tree root. If a file is selected, its
parent is used.

------------------------------------------------------------------------------
                                                                  *NERDTree-u*
Default key: u
Map option: NERDTreeMapUpdir
Applies to: no restrictions.

Move the tree root up a dir (like doing a "cd ..").

------------------------------------------------------------------------------
                                                                  *NERDTree-U*
Default key: U
Map option: NERDTreeMapUpdirKeepOpen
Applies to: no restrictions.

Like |NERDTree-u| except that the old tree root is kept open.

------------------------------------------------------------------------------
                                                                  *NERDTree-r*
Default key: r
Map option: NERDTreeMapRefresh
Applies to: files and directories.

If a dir is selected, recursively refresh that dir, i.e. scan the filesystem
for changes and represent them in the tree.

If a file node is selected then the above is done on it's parent.

------------------------------------------------------------------------------
                                                                  *NERDTree-R*
Default key: R
Map option: NERDTreeMapRefreshRoot
Applies to: no restrictions.

Recursively refresh the tree root.

------------------------------------------------------------------------------
                                                                  *NERDTree-m*
Default key: m
Map option: NERDTreeMapMenu
Applies to: files and directories.

Display the NERD tree menu. See |NERDTreeMenu| for details.

------------------------------------------------------------------------------
                                                                 *NERDTree-cd*
Default key: cd
Map option: NERDTreeMapChdir
Applies to: files and directories.

Change vims current working directory to that of the selected node.

------------------------------------------------------------------------------
                                                                  *NERDTree-I*
Default key: I
Map option: NERDTreeMapToggleHidden
Applies to: no restrictions.

Toggles whether hidden files (i.e. "dot files") are displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-f*
Default key: f
Map option: NERDTreeMapToggleFilters
Applies to: no restrictions.

Toggles whether file filters are used. See |'NERDTreeIgnore'| for details.

------------------------------------------------------------------------------
                                                                  *NERDTree-F*
Default key: F
Map option: NERDTreeMapToggleFiles
Applies to: no restrictions.

Toggles whether file nodes are displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-B*
Default key: B
Map option: NERDTreeMapToggleBookmarks
Applies to: no restrictions.

Toggles whether the bookmarks table is displayed.

------------------------------------------------------------------------------
                                                                  *NERDTree-q*
Default key: q
Map option: NERDTreeMapQuit
Applies to: no restrictions.

Closes the NERDtree window.

------------------------------------------------------------------------------
                                                                  *NERDTree-A*
Default key: A
Map option: NERDTreeMapToggleZoom
Applies to: no restrictions.

Maximize (zoom) and minimize the NERDtree window.

------------------------------------------------------------------------------
                                                                  *NERDTree-?*
Default key: ?
Map option: NERDTreeMapHelp
Applies to: no restrictions.

Toggles whether the quickhelp is displayed.



		19.25.6
```

## 19.26 ANN: Vim for Outlook

### 19.26.1 Issues on my env

```text
I have released a new plugin for those Microsoft Windows Outlook users.

It simply adds a button in Outlook which will spawn Vim, allow you to
edit the body of the currently open email and when you :w, it will
update Outlook with the results.

There are more details, you can read about them here:
http://www.vim.org/scripts/script.php?script_id=3087

As usual, with all my plugins, feedback good and bad is always welcome.

Enjoy.
Dave

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
Gareth Oakes	
Very cool! I have installed and tested on my Outlook 2007 instance here. Work...
	
May 7 (3 days ago)
Gareth OakesLoading...	
May 7 (3 days ago)
Gareth Oakes
 to vim_use
	
show details May 7 (3 days ago)
	
> I have released a new plugin for those Microsoft Windows Outlook users.
>
> It simply adds a button in Outlook which will spawn Vim, allow you to
> edit the body of the currently open email and when you :w, it will
> update Outlook with the results.
>
> There are more details, you can read about them here:http://www.vim.org/scripts/script.php?script_id=3087
>
> As usual, with all my plugins, feedback good and bad is always welcome.

Very cool! I have installed and tested on my Outlook 2007 instance
here. Works as advertised. I have two ideas for improvements:

| 1. Allow launching new Vim for each email, instead of reusing an
existing Vim. This is mainly because I always have a TODO list open in
Vim on my 2nd monitor and actually I would like to edit my email in
it's own Vim window on the primary screen :)

| 2. Auto-quote an email for response. All the Outlook formatting is
obviously lost in translation to text, but it would be nice to
automatically quote the email when writing a response. Not sure how
that would exactly work, but it would save me having to run a command
to add > before each line of the file in Vim :)

Thanks again for your script David, it's awesome.

Cheers,
Gareth
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite Gareth Oakes to chat
		
Reply
|
yosi izaq	
This plugin sounds very useful. I have outlook 2k7 and have followed the inst...
	
May 9 (1 day ago)
yosi izaqLoading...	
May 9 (1 day ago)
yosi izaq
 to vim_use
	
show details May 9 (1 day ago)
	
This plugin sounds very useful.

I have outlook 2k7 and have followed the install instructions. I have
added the vim macro and quick access button. Clicking it opens a vim
session for editing the email. However saving the changes (:w) doesn't
update the email.

Any idea what's wrong?

thx,
Yosi
Reply
		
Forward
		
		
Reply
|
David Fishburn	
On Fri, May 7, 2010 at 2:46 AM, Gareth Oakes <juicejuice@gmail.com> wrote: ...
	
6:06 AM (12 hours ago)
David FishburnLoading...	
6:06 AM (12 hours ago)
David Fishburn
 to vim_use
	
show details 6:06 AM (12 hours ago)
	
On Fri, May 7, 2010 at 2:46 AM, Gareth Oakes <juicejuice@gmail.com> wrote:
...
>> There are more details, you can read about them here:http://www.vim.org/scripts/script.php?script_id=3087
...
> Very cool! I have installed and tested on my Outlook 2007 instance
> here. Works as advertised. I have two ideas for improvements:
>
> 1. Allow launching new Vim for each email, instead of reusing an
> existing Vim. This is mainly because I always have a TODO list open in
> Vim on my 2nd monitor and actually I would like to edit my email in
> it's own Vim window on the primary screen :)

Version 3.0 just uploaded addresses this.
Please give it a try.


> 2. Auto-quote an email for response. All the Outlook formatting is
> obviously lost in translation to text, but it would be nice to
> automatically quote the email when writing a response. Not sure how
> that would exactly work, but it would save me having to run a command
> to add > before each line of the file in Vim :)

When the new file is opened in Vim the autocmds created by OutlookVim
set the filetype to be "mail".

There are several existing ftplugins available at vim.org which will
allow you to do all sorts of fancy quoting and such.
Perhaps current Vim users of these plugins can voice some opinions on
particularily effective ones.

Dave
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn	
Please update to OutlookVim 3.0. Two things: 1. After opening the email in Vi...
	
6:12 AM (12 hours ago)
David FishburnLoading...	
6:12 AM (12 hours ago)
David Fishburn
 to vim_use
	
show details 6:12 AM (12 hours ago)
	
On Sun, May 9, 2010 at 4:54 AM, yosi izaq <izaqyos@gmail.com> wrote:
> This plugin sounds very useful.
>
> I have outlook 2k7 and have followed the install instructions. I have
> added the vim macro and quick access button. Clicking it opens a vim
> session for editing the email. However saving the changes (:w) doesn't
> update the email.

Please update to OutlookVim 3.0.

Two things:

| 1.  After opening the email in Vim, please provide the output from:
:au outlook

You can select this with your mouse and hit CTRL-Y, then paste it into
this email.  It should look something like this:
****
:au outlook
--- Auto-Commands ---
outlook  BufEnter
   *.outlook setlocal filetype=mail
outlook  BufUnload
   *.outlook if expand('%:e') == 'outlook' | call
delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
outlook  BufWritePost
   *.outlook setlocal autoread | let g:outlook_cscript_output =
system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
"'.expand("%").'"  ')| bdelete | if g:outloo
k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
) | endif
****


| 2.  After typing :w, please provide the output from:
:echo g:outlook_cscript_output

It should say something like this:
****
Microsoft (R) Windows Script Host Version 5.8
Copyright (C) Microsoft Corporation. All rights reserved.

Successfully updated Outlook, message
ID:0000000026A082186274D011808F00805FF466B524ACAB01
****


Dave
- Show quoted text -

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
yosi izaq	
inline, 10x, Yosi done Doesn't look good. I get: E216: No such group or event...
	
11:03 AM (7 hours ago)
yosi izaqLoading...	
11:03 AM (7 hours ago)
yosi izaq
 to vim_use
	
show details 11:03 AM (7 hours ago)
	
inline,

10x,

Yosi
>
> Please update to OutlookVim 3.0.
>
done

> Two things:
>
> 1.  After opening the email in Vim, please provide the output from:
> :au outlook
>
> You can select this with your mouse and hit CTRL-Y, then paste it into
> this email.  It should look something like this:
> ****
> :au outlook
> --- Auto-Commands ---
> outlook  BufEnter
>    *.outlook setlocal filetype=mail
> outlook  BufUnload
>    *.outlook if expand('%:e') == 'outlook' | call
> delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
> outlook  BufWritePost
>    *.outlook setlocal autoread | let g:outlook_cscript_output =
> system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
> "'.expand("%").'"  ')| bdelete | if g:outloo
> k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
> substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
> ) | endif
> ****
>
Doesn't look good. I get:
E216: No such group or event: outlook

>
> 2.  After typing :w, please provide the output from:
> :echo g:outlook_cscript_output
>
> It should say something like this:
> ****
> Microsoft (R) Windows Script Host Version 5.8
> Copyright (C) Microsoft Corporation. All rights reserved.
>
> Successfully updated Outlook, message
> ID:0000000026A082186274D011808F00805FF466B524ACAB01
> ****
>
E121: undefined variable: g:outlook_cscript_output
E15: invalid expression: g:outlook_cscript_output

I checked a bit and I think the reason this fails is:
| 1. Fail to load the javascript b/c
| 2. $VIM contains a space (i.e c:/Program file/vim)
| 3. So this snippet is failing:
" Default location for the outlookvim.js file.
" This can be overridden in your vimrc via
" g:outlook_javascript
let s:outlook_javascript_default = expand('$VIM/vimfiles/plugin/outlookvim.js')

so outlook.vim gives error that it can't load the js file.
How can I fix this?
Reply
		
Forward
		
		
Reply
|
David Fishburn	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote: Yosi I ...
	
3:29 PM (3 hours ago)
David FishburnLoading...	
3:29 PM (3 hours ago)
David Fishburn
 to vim_use
	
show details 3:29 PM (3 hours ago)
	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote:

 Yosi

I will respond directly to you and take this offline until we resolve it.

I will post back the final solution.
I have tested with spaces in the name, so it must be something else.
- Show quoted text -

Dave

--
You received this message from the "vim_use" maillist.
Do not top-post! Type your reply below the text you are replying to.
For more information, visit http://www.vim.org/maillist.php
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote: ... Oka...
	
4:10 PM (2 hours ago)
David FishburnLoading...	
4:10 PM (2 hours ago)
David Fishburn
 to me
	
show details 4:10 PM (2 hours ago)
	
On Mon, May 10, 2010 at 4:03 AM, yosi izaq <izaqyos@gmail.com> wrote:
...
>> Two things:
>>
>> 1.  After opening the email in Vim, please provide the output from:
>> :au outlook
>>
>> You can select this with your mouse and hit CTRL-Y, then paste it into
>> this email.  It should look something like this:
>> ****
>> :au outlook
>> --- Auto-Commands ---
>> outlook  BufEnter
>>    *.outlook setlocal filetype=mail
>> outlook  BufUnload
>>    *.outlook if expand('%:e') == 'outlook' | call
>> delete(expand('%:p').'.ctl') | call delete(expand('%:p')) | endif
>> outlook  BufWritePost
>>    *.outlook setlocal autoread | let g:outlook_cscript_output =
>> system('cscript "C:\Vim\vimfiles\plugin\outlookvim.js"
>> "'.expand("%").'"  ')| bdelete | if g:outloo
>> k_cscript_output =~ 'outlookvim:' | call Outlook_WarningMsg(
>> substitute(g:outlook_cscript_output, '^.*\(outlookvim:.*\)', '\1', '')
>> ) | endif
>> ****
>>
> Doesn't look good. I get:
> E216: No such group or event: outlook

Okay, that is the key to the trouble.

Are you overriding any values from within your .vimrc?

Have you edited the outlook.vim file in anyway?

Now, can you run each of the commands below and tell me what the
result is for each one.

   let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')

:echo strlen(globpath(substitute($PATH, '\\\?;', ',', 'g'), 'cscript.exe'))

:echo exists('g:outlook_javascript')

:echo filereadable(expand(g:outlook_javascript))

:echo has('autocmd')

:echo exists("g:loaded_outlook")

Thanks,
Dave
Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
yosi izaq	
inline 10x, Yosi I've made no changes to my .vimrc after installing your plugin.
	
5:08 PM (1 hour ago)
yosi izaqLoading...	
5:08 PM (1 hour ago)
yosi izaq
 to David
	
show details 5:08 PM (1 hour ago)
	
inline

10x,
Yosi
>> Doesn't look good. I get:
>> E216: No such group or event: outlook
>
> Okay, that is the key to the trouble.
>
> Are you overriding any values from within your .vimrc?
I've made no changes to my .vimrc after installing your plugin.

>
> Have you edited the outlook.vim file in anyway?
No

>
> Now, can you run each of the commands below and tell me what the
> result is for each one.
>
>    let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')
I don't see any result. It looks like it's doing something but I get no message.

>
> :echo strlen(globpath(substitute($PATH, '\\\?;', ',', 'g'), 'cscript.exe'))
31

>
> :echo exists('g:outlook_javascript')
1

>
> :echo filereadable(expand(g:outlook_javascript))
0

>
> :echo has('autocmd')
1

>
> :echo exists("g:loaded_outlook")
0

>
> Thanks,
> Dave
>
Reply
		
Forward
		
		
Reply
|
David Fishburn
 to me
	
show details 5:45 PM (1 hour ago)
	

:echo filereadable(expand(g:outlook_javascript))

    0
     


Okay, so we have found the reason the plugin is not creating the autocmds.

One thing that should have happened, is after you started Vim, if you did:
:messages

It should have shown an error indicating it could not find that file.

Let's try to figure out why though.

If you can execute these commands again:
:let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')


And provide the output from each of these:

:echo g:outlook_javascript

:echo filereadable(expand(g:outlook_javascript))
:exec '!dir "'.  g:outlook_javascript . '"'
:exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') . '\out*"'


Thanks,
Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
[It's All Text!]
Reply
|
yosi izaq
 to David
	
show details 5:52 PM (57 minutes ago)
	
inline

thx,
Yosi

On Mon, May 10, 2010 at 5:45 PM, David Fishburn <dfishburn.vim@gmail.com> wrote:
>
> :echo filereadable(expand(g:outlook_javascript))
>
>> 0
>>
>
> Okay, so we have found the reason the plugin is not creating the autocmds.
>
> One thing that should have happened, is after you started Vim, if you did:
> :messages
>
> It should have shown an error indicating it could not find that file.
yeap.

>
> Let's try to figure out why though.
>
> If you can execute these commands again:
> :let g:outlook_javascript = expand('$VIM/vimfiles/plugin/outlookvim.js')

>
>
> And provide the output from each of these:
>
> :echo g:outlook_javascript
c:\Program Files\Vim\vim72\plugin\outlookvim.js

> :echo filereadable(expand(g:outlook_javascript))
0
> :exec '!dir "'.  g:outlook_javascript . '"'
!dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js"
C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin/outlook
vim.js"
 Volume in drive C is System
 Volume Serial Number is 34C6-75D2

 Directory of C:\Program Files\Vim\vimfiles\plugin

File Not Found
shell returned 1
Hit any key to close this window...

> :exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') .
> '\out*"'
!dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js\out*"
C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin\out*"
 Volume in drive C is System
 Volume Serial Number is 34C6-75D2

 Directory of C:\Program Files\Vim\vimfiles\plugin

File Not Found
shell returned 1
Hit any key to close this window...


>
>
> Thanks,
> Dave
>
>
Reply
		
Forward
		
		
[It's All Text!]
Reply
|
David Fishburn
 to me
	
show details 6:24 PM (24 minutes ago)
	
On 1


:exec '!dir "'.  g:outlook_javascript . '"'

    !dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js"
    C:\WINDOWS\system32\cmd.exe /c dir "C:/Program Files/Vim/vimfiles/plugin/outlook
    vim.js"
     Volume in drive C is System
     Volume Serial Number is 34C6-75D2

     Directory of C:\Program Files\Vim\vimfiles\plugin

    File Not Found
    shell returned 1
     


If you unzipped the file correctly, that file should have been there.
Can you open up the ZIP file and see what files are included.
Could it be your anti-virus software preventing .js files from being installed?



        :exec '!dir "'.  fnamemodify(expand(g:outlook_javascript), ':p:h') .
        '\out*"'
           

    !dir "c:\Program Files\Vim\vim72\plugin\outlookvim.js\out*"
     

What I was really looking for was this:

dir "c:\Program Files\Vim\vim72\plugin\out*"


So, it is up to you to figure out why all the files from OutlookVim_v3.zip are not on your hard drive.

There should be 4 files:
vimfiles\
doc\outlook.txt
plugin\outlook.vim
plugin\OutlookVim.bas
plugin\outlookvim.js

Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
Reply
|
David Fishburn
 to me
	
show details 6:26 PM (23 minutes ago)
	
Okay, so we have found the reason the plugin is not creating the autocmds.

        One thing that should have happened, is after you started Vim, if you did:
        :messages

        It should have shown an error indicating it could not find that file.
           

    yeap.
     


By the way, when you upgraded to OutlookVim 3.0, make sure you also update the Macro in Outlook with the new code.

Dave

Reply
		
Forward
		
Invite David Fishburn to chat
		
[It's All Text!]
Reply
|
yosi izaq
 to David
	
show details 6:37 PM (11 minutes ago)
	
Thanks for the tip.
The files are there however:
$ ls -lrt Program\
Files/Vim/vim72/plugin/ | tail
-rwx------+ 1 <user> ????????   8332 2010-02-02 10:19 vcshg.vim
-rwx------+ 1 <user> ????????   8036 2010-02-02 10:19 vcsgit.vim
-rwx------+ 1 <user> ????????  13728 2010-02-02 10:19 vcscvs.vim
-rwx------+ 1 <user> ????????  48965 2010-02-02 10:19 vcscommand.vim
-rwx------+ 1 <user> ????????   8040 2010-02-02 10:19 vcsbzr.vim
-rwx------+ 1 <user> ????????  34637 2010-02-02 13:04 bufexplorer.vim
-rwx------+ 1 <user> ???????? 164515 2010-02-02 14:24 c.vim
-rwxrwx---+ 1 <user> mkpasswd   4287 2010-05-09 21:58 outlookvim.js
-rwxrwx---+ 1 <user> mkpasswd   7919 2010-05-09 22:51 OutlookVim.bas
-rwxrwx---+ 1 <user> mkpasswd   6397 2010-05-10 10:59 outlook.vim
$ ls -lrt Program\
Files/Vim/vim72/doc/ | tail
-rwx------+ 1 <user> ????????  15414 2009-12-01 14:02 uganda.nsis.txt
-rwx------+ 1 <user> ????????  50021 2009-12-01 22:20 NERD_tree.txt
-rwx------+ 1 <user> ????????  48949 2009-12-17 22:36 rails.txt
-rwx------+ 1 <user> ???????? 108911 2009-12-28 13:47 perlsupport.txt
-rwx------+ 1 <user> ????????  62901 2010-01-31 12:05 bashsupport.txt
-rwx------+ 1 <user> ????????  30724 2010-02-02 10:19 vcscommand.txt
-rwx------+ 1 <user> ????????  93544 2010-02-05 14:27 csupport.txt
-rwx------+ 1 <user> ????????  26709 2010-02-10 11:12 bufexplorer.txt
-rwx------+ 1 <user> ???????? 424680 2010-05-09 11:33 tags
-rwxrwx---+ 1 <user> mkpasswd  10845 2010-05-09 22:22 outlook.txt

And just in case I manually created outlook dir and copied the files to there.
$ ls -lrt Program\
Files/Vim/vim72/plugin/outlook | tail
total 24
-rwxrwx---+ 1 <user> mkpasswd 4287 2010-05-09 21:58 outlookvim.js
-rwxrwx---+ 1 <user> mkpasswd 6397 2010-05-09 22:44 outlook.vim
-rwxrwx---+ 1 <user> mkpasswd 7919 2010-05-09 22:51 OutlookVim.bas
Reply
		
Forward
		
		
[It's All Text!]
Your message has been sent.
Reply
|
yosi izaq
 to David
	
show details 6:48 PM (1 minute ago)
	
ok, I found the root cause and fixed it.

I have GVIM for windows. It has this dir struct:
vim\
   vim72\ (all VIM regular dirs and files)
   vimfiles

I put the script in vim/vim72/plugin but it looks for the js in
vimfiles. Once I copied it 2 there it started working :)

10x,
Yosi
```

### 19.26.2 Install

```text
|3. Installing the plugin				*outlook-install*

 You can use this script as a plugin by copying it to your plugin directory. 
 See |add-global-plugin| for instructions.
 
 You can also |:source| it from your |.vimrc|.

 To install this help file |add-local-help| inside Vim.
 	:help add-local-help
	:helptags $VIM/vimfiles/doc (Windows)

 Files used by the plugin:
    outlook.vim
        - Sets up autocmds which are activated when editing a file
          which ends in .outlook
    outlookVim.bas
        - Visual Basic code used by Outlook to create some temporary files
          and launch Vim.
    outlookVim.js
        - A Javascript file called by the Vim autocmds when the file is saved.
          It uses Outlook APIs to update the email within Outlook.
    outlook.txt
        - This document

 NOTE:
     Vim must be in nocompatible mode for the plugin to operate correctly.
     This implies you have this line in your |.vimrc|: >
        set nocompatible 
<


==============================================================================
|4. Installing the Outlook macro				*outlook-macro*

 The macro is used to add a button in Outlook to lauch Vim.  It is used to
 create the files which Vim will edit.  It will also add a shortcut key
 (Alt-d) to fire up Vim instead of having to use a mouse.

 To install the Outlook macro flip over to Outlook.

|  1.  From the Outlook menu Tools->Macro->Security 
        Outlook 2003
             - Make sure this is set to Medium, or the macro will not be enabled 
        Outlook 2007
             - Make sure this is set to Warnings for all macros
|  2.  From the menu Tools->Macro->Visual Basic Editor (or Alt-F11)
|  3.  From the menu File->Import File (or Ctrl-M)
|  4.  Choose the file ...\vimfiles\plugin\OutlookVim.bas (where ever you
      installed the plugin).
|  5.  Expand the Modules folder in the Project pane
|  6.  Right click on Module1 and choose Project Properties
|  7.  Change the project name to "Vim"
|  8.  Change the project description to "Edit emails with Vim"
|  9.  From the menu File->Save (or Ctrl-S)
| 10.  Close the Visual Basic Editor 
| 11.  Double click on an email 
| 12.  Adding toolbar buttons
        Outlook 2003
             - Right click on the toolbar (of the email message) and choose
               "Customize"
             - Choose the Commands tab 
             - Click on the Macros category
             - Drag and drop the Vim.Edit macro onto the end of the Standard 
               toolbar displayed in the currently open email 
             - Click on the Rearrange Commands button 
             - Change the radio button to Toolbar: Standard 
             - Scroll to the bottom where the Vim.Edit button is and highlight it
             - Click on the Modify Selection button
             - On the dropdown which appears, click on Name
             - Change the name from "Vim.Edit" to "Vim.E&dit" 
                - Now you can press Alt-d as a shortcut to launch Vim to edit 
                  the email without having to use the mouse to click on the 
                  button (after all, that is the Vim way)
             - Hit Enter, Close and Close to return back to the open email
             - Click on the Vim.Edit button, or hit Ctrl-d to edit the email using Vim
        Outlook 2007
             - Toolbars are not editable in Outlook 2007
             - A new Quick Access Toolbar has been introduced in the titlebar
               of the open email
             - Click on the far right and choose "Customize Quick Access
               Toolbar" 
             - Click on "More Commands..."
             - Change the "Choose commands from" to "Macros"
             - Vim.Edit should be displayed, add it using the "Add >>" button
             - Click the Vim.Edit button in the right pane and click the
               "Modify" button below
             - Here you can assign some icon to it that will be easily 
               recognisable
             - Click on the new button in the Quick Access Toolbar
| 13.  Make a minor change to the email (in Vim) and :w
| 14.  Verify the Outlook email has the same change 
| 15.  Hit Escape to close the Outlook email, you will be prompted to Save 
      the changes you have just made.  So you always have an option of 
      cancelling the changes you made in Vim, in Outlook.


 If you changed the Macro Security settings you must restart Outlook 
 for these changes to be active.
  

==============================================================================
|5. Configuration					*outlook-configuration*

 The behavior of outlook.vim is governed by several variables. These variables
 are used by the autocmds which are created by the plugin.  These variables can
 be assigned global defaults which can be set in your |.vimrc|. 

 You can override many of the features of this script by creating various
 variables within your vimrc.
                                                                          
 The outlookvim.js (javascript) file tells Outlook to re-read the message from
 the temporary file.  This allows you to rename it, or place it in any
 location you want.  Here are some examples: >
     let g:outlook_javascript = '$VIM\vimfiles\plugin\outlookvim.js'  (default)
     let g:outlook_javascript = 'C:\Documents and Settings\Username\My Documents\outlookvim.js'
     let g:outlook_javascript = expand('$APPDATA\Microsoft\outlookvim.js')
     let g:outlook_javascript = expand('$USERPROFILE\Application Data\Microsoft\outlookvim.js')
<
 This setting (default = '') will force all emails to be edited in a particular
 Vim instance.  If the instance has not be started, a message is displayed
 with an example command line to start an appropriate Vim. >
     let g:outlook_servername = ''
<
 This setting (default = 1) overrides the default textwidth the mail ftplugin sets.  This
 allows you to automatically format text using gq by setting the following: >
     let g:outlook_textwidth = 76
<
 When you save a file, by default, Outlook will be updated and the temporary
 file you are editing will be deleted.  Autoread was added so that the Vim
 buffer is automatically cleared instead of displaying a warning message
 indicating the file has changed outside of Vim (in fact it was deleted).  If
 you wish to see the warning, you can set (default = 1) the following: >
     let g:outlook_noautoread = 1
<                                                                    
 When you save a file, by default, Outlook will be updated and the temporary
 file you are editing will be deleted.  Since the file has been deleted, you
 are left editing a file that no longer exists.  By default, the Vim buffer
 will be deleted automatically, unless this option (default = 1) is set. >
     let g:outlook_nobdelete = 1
<
 If you do not save the temporary file and instead decide to throw away your
 changes, the temporary files will be cleaned up.  This option (default = 1)
 will leave the files in the temporary directory instead of removing them. >
     let g:outlook_nodelete_unload = 1
<
 This setting (default = 1) will prevent the script from automatically turning
 on Vim's autoindent feature.  It will use your default setting instead. >
     let g:outlook_noautoindent = 1
<
 This setting (default = 1) will capture the output when attempting to update
 Outlook. >
     let g:outlook_save_cscript_output = 1
<
 This setting (default = 1) will show any errors reported when attempting
 to update Outlook.  This debugging output should help identify where
 any problems may lie. >
     let g:outlook_view_cscript_error = 1
<
                                                               
  vim:tw=78:fo=tcq2:ts=8:ft=help:norl:
```

### 19.26.3 usage

## 19.27 cscope.maps

```text
   """"""""""""" My cscope/vim key mappings
    "
    " The following maps all invoke one of the following cscope search types:
    "
    "   's'   symbol: find all references to the token under cursor
    "   'g'   global: find global definition(s) of the token under cursor
    "   'c'   calls:  find all calls to the function name under cursor
    "   't'   text:   find all instances of the text under cursor
    "   'e'   egrep:  egrep search for the word under cursor
    "   'f'   file:   open the filename under cursor
    "   'i'   includes: find files that include the filename under cursor
    "   'd'   called: find functions that function under cursor calls
    "
    " Below are three sets of the maps: one set that just jumps to your
    " search result, one that splits the existing vim window horizontally and
    " diplays your search result in the new window, and one that does the same
    " thing, but does a vertical split instead (vim 6 only).
    "
    " I've used CTRL-\ and CTRL-@ as the starting keys for these maps, as it's
    " unlikely that you need their default mappings (CTRL-\'s default use is
    " as part of CTRL-\ CTRL-N typemap, which basically just does the same
    " thing as hitting 'escape': CTRL-@ doesn't seem to have any default use).
    " If you don't like using 'CTRL-@' or CTRL-\, , you can change some or all
    " of these maps to use other keys.  One likely candidate is 'CTRL-_'
    " (which also maps to CTRL-/, which is easier to type).  By default it is
    " used to switch between Hebrew and English keyboard mode.
    "


    " To do the first type of search, hit 'CTRL-\', followed by one of the
    " cscope search types above (s,g,c,t,e,f,i,d).  The result of your cscope
    " search will be displayed in the current window.  You can use CTRL-T to
    " go back to where you were before the search.  
    "

    nmap <C-\>s :cs find s <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-\>g :cs find g <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-\>c :cs find c <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-\>t :cs find t <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-\>e :cs find e <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-\>f :cs find f <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-\>i :cs find i <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-\>d :cs find d <C-R>=expand("<cword>")<CR><CR>	


    " Using 'CTRL-spacebar' (intepreted as CTRL-@ by vim) then a search type
    " makes the vim window split horizontally, with search result displayed in
    " the new window.
    "
    " (Note: earlier versions of vim may not have the :scs command, but it
    " can be simulated roughly via:
    "    nmap <C-@>s <C-W><C-S> :cs find s <C-R>=expand("<cword>")<CR><CR>	

    nmap <C-@>s :scs find s <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@>g :scs find g <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@>c :scs find c <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@>t :scs find t <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@>e :scs find e <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@>f :scs find f <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-@>i :scs find i <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-@>d :scs find d <C-R>=expand("<cword>")<CR><CR>	


    " Hitting CTRL-space *twice* before the search type does a vertical 
    " split instead of a horizontal one (vim 6 and up only)

    nmap <C-@><C-@>s :vert scs find s <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@><C-@>g :vert scs find g <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@><C-@>c :vert scs find c <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@><C-@>t :vert scs find t <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@><C-@>e :vert scs find e <C-R>=expand("<cword>")<CR><CR>	
    nmap <C-@><C-@>f :vert scs find f <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-@><C-@>i :vert scs find i <C-R>=expand("<cfile>")<CR><CR>	
    nmap <C-@><C-@>d :vert scs find d <C-R>=expand("<cword>")<CR><CR>	

    "
```

### 19.27.1 related - ‘egrep’ regular expression syntax

```text
The character ‘.’ matches any single character except newline.

‘+’
indicates that the regular expression should match one or more occurrences of the previous atom or regexp. 
‘?’
indicates that the regular expression should match zero or one occurrence of the previous atom or regexp. 
‘\+’
matches a ‘+’ 
‘\?’
matches a ‘?’.
Bracket expressions are used to match ranges of characters. Bracket expressions where the range is backward, for example ‘[z-a]’, are ignored. Within square brackets, ‘\’ is taken literally. Character classes are supported; for example ‘[[:digit:]]’ will match a single decimal digit. Non-matching lists ‘[^...]’ do not ever match newline.

GNU extensions are supported:

‘\w’ matches a character within a word
‘\W’ matches a character which is not within a word
‘\<’ matches the beginning of a word
‘\>’ matches the end of a word
‘\b’ matches a word boundary
‘\B’ matches characters which are not a word boundary
‘\`’ matches the beginning of the whole input
‘\'’ matches the end of the whole input
Grouping is performed with parentheses ‘()’. A backslash followed by a digit acts as a back-reference and matches the same thing as the previous grouped expression indicated by that number. For example ‘\2’ matches the second group expression. The order of group expressions is determined by the position of their opening parenthesis ‘(’.

The alternation operator is ‘|’.

The characters ‘^’ and ‘$’ always represent the beginning and end of a string respectively, except within square brackets. Within brackets, ‘^’ can be used to invert the membership of the character class being specified.

The characters ‘*’, ‘+’ and ‘?’ are special anywhere in a regular expression.

The longest possible match is returned; this applies to the regular expression as a whole and (subject to this constraint) to subexpressions within groups.
```

## 19.28 Vim Intellisense

```text
Needless to say intellisense is very helpful while developing the programs. While developing Java or in .NET (C#) it is not possible to remember all the interfaces and its methods, APIs etc. The IDE or editor should help in a way to build programs. Vim helps in so many ways, and especially the auto-completion is provided by Vim, by default. But it does not give the intellisense which is beyond auto-completion. I think most of us know what is intellisense, which is provided by Visual Studio. It is also called CodeInsight. Intellisense in a broad sense means more. It can be listing methods, attributes, classes, interfaces, member variables, local variables, etc, provide online help and may be inline compilation. But we are not looking into building inline compilation.

Supported Languages

Intellisense is provided for the following languages:

Java
C++
C#
JSP
XML
HTML
SQL
```

### 19.28.1 install

```text
Installing Vim Intellisense should be simple. Intellisense is packaged in self-extracting executable. To start the installation download the Windows binaries and double click it. This will extract the files and start the installation. Intellisense can be installed manually if you build it from the source.

Follow the steps to install.

| 1. The figure below shows the Welcome screen of the installation. Press Next to Continue.
| 
| 2. Read the license and choose "I Agree" if you want to proceed.
| 
| 3. Choose the plugins you want to install. For JSP to work you need both HTML and Java plugins to be installed.
| 
| 4. In the dialog shown below, enter the Vim folder. Typically Vim folder will be C:\Vim.  DO NOT Vim Rumtime directory, which is usually C:\Vim\vim63.
| 
|  
| 
| 5. Enter the Java docs directory if you have selected Java plugin. If not, you will not get this screen.
| 
| 6. Make sure you set JAVA_HOME environment variable pointing to java installation directory. If not you will get this warning; setup will not set the JAVA_HOME directory. You need to set it manually.
| 
| 7. Choose Finish to end the installation. Read the Finish page for some important information.

Now setting up intellisense is finished. Happy Vimming.
Manual Installation

Vim Intellisense can be installed manually, if you downloaded the sources and built all by yourself. Manual installation is given the intellisense.txt which is present in the $VIM\vimfiles\docs\intellisense.txt.

Read the release notes for some last minute information and some work arounds.

If your intellisense still didn't work, then see the Trouble Shoot.

		19.28.2
```

## 19.29 supertab

```text
==============================================================================
Supertab                                    *supertab*

|1. Introduction                             |supertab-intro|
|2. Supertab Usage                           |supertab-usage|
|3. Supertab Options                         |supertab-options|
    Default completion type                 |supertab-defaultcompletion|
    Secondary default completion type       |supertab-contextdefault|
    Completion contexts                     |supertab-completioncontexts|
        Context text                        |supertab-contexttext|
        Context Discover                    |supertab-contextdiscover|
        Example                             |supertab-contextexample|
    Completion Duration                     |supertab-duration|
    Preventing Completion After/Before...   |supertab-preventcomplete|
    Changing default mapping                |supertab-forwardbackward|
    Inserting true tabs                     |supertab-mappingtabliteral|
    Enhanced longest match support          |supertab-longestenhanced|
    Preselecting the first entry            |supertab-longesthighlight|

==============================================================================
|1. Introduction                             *supertab-intro*

Supertab is a plugin which allows you to perform all your insert completion
(|ins-completion|) using the tab key.

Supertab requires Vim version 7.0 or above.

==============================================================================
|2. Supertab usage                           *supertab-usage*

Using Supertab is as easy as hitting <Tab> or <S-Tab> (shift+tab) while in
insert mode, with at least one non whitespace character before the cursor, to
start the completion and then <Tab> or <S-Tab> again to cycle forwards or
backwards through the available completions.

Example ('|' denotes the cursor location):

bar
baz
b|<Tab>    Hitting <Tab> here will start the completion, allowing you to
           then cycle through the suggested words ('bar' and 'baz').

==============================================================================
|3. Supertab Options                         *supertab-options*

Supertab is configured via several global variables that you can set in your
|vimrc| file according to your needs. Below is a comprehensive list of
the variables available.


Default Completion Type             *supertab-defaultcompletion*
                                    *g:SuperTabDefaultCompletionType*

g:SuperTabDefaultCompletionType (default value: "<c-p>")

Used to set the default completion type. There is no need to escape this
value as that will be done for you when the type is set.

  Example: setting the default completion to 'user' completion:

    let g:SuperTabDefaultCompletionType = "<c-x><c-u>"

Note: a special value of 'context' is supported which will result in
super tab attempting to use the text preceding the cursor to decide which
type of completion to attempt.  Currently super tab can recognize method
calls or attribute references via '.', '::' or '->', and file path
references containing '/'.

    let g:SuperTabDefaultCompletionType = "context"

    /usr/l<tab>     # will use filename completion
    myvar.t<tab>    # will use user completion if completefunc set,
                    # or omni completion if omnifunc set.
    myvar-><tab>    # same as above

When using context completion, super tab will fall back to a secondary default
completion type set by |g:SuperTabContextDefaultCompletionType|.

Note: once the buffer has been initialized, changing the value of this setting
will not change the default complete type used.  If you want to change the
default completion type for the current buffer after it has been set, perhaps
in an ftplugin, you'll need to call SuperTabSetDefaultCompletionType like so,
supplying the completion type you wish to switch to:

    call SuperTabSetDefaultCompletionType("<c-x><c-u>")


Secondary default completion type   *supertab-contextdefault*
                                    *g:SuperTabContextDefaultCompletionType*

g:SuperTabContextDefaultCompletionType (default value: "<c-p>")

Sets the default completion type used when g:SuperTabDefaultCompletionType is
set to 'context' and no completion type is returned by any of the configured
contexts.


Completion contexts                 *supertab-completioncontexts*
                                    *g:SuperTabCompletionContexts*

g:SuperTabCompletionContexts (default value: ['s:ContextText'])

Sets the list of contexts used for context completion.  This value should
be a list of function names which provide the context implementation.

When supertab starts the default completion, each of these contexts will be
consulted, in the order they were supplied, to determine the completion type
to use.  If a context returns a completion type, that type will be used,
otherwise the next context in the list will be consulted.  If after executing
all the context functions, no completion type has been determined, then the
value of g:SuperTabContextDefaultCompletionType will be used.

Built in completion contexts:

  s:ContextText                     *supertab-contexttext*

  The text context will examine the text near the cursor to decide which type
  of completion to attempt.  Currently the text context can recognize method
  calls or attribute references via '.', '::' or '->', and file path
  references containing '/'.

      /usr/l<tab>  # will use filename completion
      myvar.t<tab> # will use user completion if completefunc set, or
                   # omni completion if omnifunc set.
      myvar-><tab> # same as above

  Supported configuration attributes:

    g:SuperTabContextTextFileTypeExclusions
    List of file types for which the text context will be skipped.

    g:SuperTabContextTextOmniPrecedence
    List of omni completion option names in the order of precedence that they
    should be used if available. By default, user completion will be given
    precedence over omni completion, but you can use this variable to give
    omni completion higher precedence by placing it first in the list.

  s:ContextDiscover                 *supertab-contextdiscover*

  This context will use the 'g:SuperTabContextDiscoverDiscovery' variable to
  determine the completion type to use.  It will evaluate each value, in the
  order they were defined, until a variable evaluates to a non-zero or
  non-empty value, then the associated completion type is used.

  Supported configuration properties:

    g:SuperTabContextDiscoverDiscovery
    List of variable:completionType mappings.

  Example context configuration:    *supertab-contextexample*

    let g:SuperTabCompletionContexts = ['s:ContextText', 's:ContextDiscover']
    let g:SuperTabContextTextOmniPrecedence = ['&omnifunc', '&completefunc']
    let g:SuperTabContextDiscoverDiscovery =
        \ ["&completefunc:<c-x><c-u>", "&omnifunc:<c-x><c-o>"]

  In addition to the default completion contexts, you can plug in your own
  implementation by creating a globally accessible function that returns
  the completion type to use (eg. "\<c-x>\<c-u>").

    function MyTagContext()
      if filereadable(expand('%:p:h') . '/tags')
        return "\<c-x>\<c-]>"
      endif
      " no return will result in the evaluation of the next
      " configured context
    endfunction
    let g:SuperTabCompletionContexts =
        \ ['MyTagContext', 's:ContextText', 's:ContextDiscover']

  Note: supertab also supports the b:SuperTabCompletionContexts variable
  allowing you to set the list of contexts separately for the current buffer,
  like from an ftplugin for example.


Completion Duration                 *supertab-duration*
                                    *g:SuperTabRetainCompletionDuration*

g:SuperTabRetainCompletionDuration (default value: 'insert')

Determines if, and for how long, the current completion type is retained.
The possible values include:
'completion' - The current completion type is only retained for the
               current completion.  Once you have chosen a completion
               result or exited the completion mode, the default
               completion type is restored.
'insert'     - The current completion type is saved until you exit insert
               mode (via ESC).  Once you exit insert mode the default
               completion type is restored. (supertab default)
'session'    - The current completion type is saved for the duration of
               your vim session or until you enter a different completion
               mode.


Preventing completion after...      *supertab-preventcomplete*
                                    *g:SuperTabNoCompleteBefore*
                                    *g:SuperTabNoCompleteAfter*

g:SuperTabNoCompleteBefore (default value: [])
g:SuperTabNoCompleteAfter (default value: ['\s'])

These two variables are used to control when supertab will attempt completion
or instead fall back to inserting a literal <tab>, by specifying a list of
patterns which are tested against the text before and after the current cursor
position that when matched, prevent completion. So if you don't want supertab
to start completion after a comma or space, you can set
g:SuperTabNoCompleteAfter to [',', '\s'].

Note: That a buffer local version of these variables
(b:SuperTabNoCompleteBefore, b:SuperTabNoCompleteAfter) is also supported
should you wish to have different values depending on the file type for
instance.

Changing the default mapping        *supertab-forwardbackward*
                                    *g:SuperTabMappingForward*
                                    *g:SuperTabMappingBackward*

g:SuperTabMappingForward  (default value: '<tab>')
g:SuperTabMappingBackward (default value: '<s-tab>')

These two variables allow you to set the keys used to kick off the current
completion.  By default this is <tab> and <s-tab>.  To change to something
like <c-space> and <s-c-space>, you can add the following to your |vimrc|.

        let g:SuperTabMappingForward = '<c-space>'
        let g:SuperTabMappingBackward = '<s-c-space>'

Note: if the above does not have the desired effect (which may happen in
console version of vim), you can try the following mappings.  Although the
backwards mapping still doesn't seem to work in the console for me, your
milage may vary.

        let g:SuperTabMappingForward = '<nul>'
        let g:SuperTabMappingBackward = '<s-nul>'


Inserting true tabs                 *supertab-mappingtabliteral*
                                    *g:SuperTabMappingTabLiteral*

g:SuperTabMappingTabLiteral (default value: '<c-tab>')

Sets the key mapping used to insert a literal tab where supertab would
otherwise attempt to kick off insert completion. The default is '<c-tab>'
(ctrl-tab) which unfortunately might not work at the console. So if you are
using a console vim and want this functionality, you may have to change it to
something that is supported.  Alternatively, you can escape the <tab> with
<c-v> (see |i_CTRL-V| for more infos).


Enhanced longest match support      *supertab-longestenhanced*
                                    *g:SuperTabLongestEnhanced*

g:SuperTabLongestEnhanced (default value: 0)

When enabled and 'longest' is in your |completeopt| setting, supertab will
provide an enhanced longest match support where typing one or more letters and
hitting tab again while in a completion mode will complete the longest common
match using the new text in the buffer.

For example, say you have a buffer with the following contents:
  FooBarFoo
  FooBar
  Foo
  FooBarBaz
And you then type F<tab>.  Vim's builtin longest support will complete the
longest common text 'Foo' and offer 'FooBarFoo', 'FooBar', 'Foo', and
'FooBarBaz' as possible completions.  With supertab's longest match
enhancement disabled, typing B<tab> while still in the completion mode will
end up completing 'FooBarBaz' or 'FooBarFoo' depending your settings, instead
of the next longest common match of 'FooBar'.  With supertab's enhanced
longest match feature enabled, the typing of B<tab> will result in the next
longest text being completed.


Preselecting the first entry        *supertab-longesthighlight*
                                    *g:SuperTabLongestHighlight*

g:SuperTabLongestHighlight (default value: 0)

Sets whether or not to pre-highlight the first match when completeopt has the
popup menu enabled and the 'longest' option as well. When enabled, <tab> will
kick off completion and pre-select the first entry in the popup menu, allowing
you to simply hit <enter> to use it.


Mapping <cr> to end completion      *supertab-crmapping*
                                    *g:SuperTabCrMapping*

g:SuperTabCrMapping (default value: 1)

When enabled, <cr> will cancel completion mode preserving the current text.
```

## 19.30 session.vim : Extended session management for Vim

### 19.30.1 short description

```text
		http://www.vim.org/scripts/script.php?script_id=3150


created by
Peter Odding
 
script type
utility
 
description
The session.vim plug-in improves upon Vim's built-in :mksession command by enabling you to easily and (if you want) automatically persist and restore your Vim editing sessions. It works by generating a Vim script that restores your current settings and the arrangement of tab pages and/or split windows and the files they contain. For more information about the plug-in please refer to its homepage or the project page on GitHub: 

• http://peterodding.com/code/vim/session/ 
• http://github.com/xolox/vim-session 

If you have questions, bug reports, suggestions, etc. the author can be contacted at peter@peterodding.com. If you like this plug-in please vote for it below!
 
install details
Unzip the most recent ZIP archive file (see below) inside your Vim profile directory (usually this is "~/.vim" on UNIX and "%USERPROFILE%\vimfiles" on Windows), restart Vim and execute the command ":helptags ~/.vim/doc" (use ":helptags ~\vimfiles\doc" instead on Windows). Now try it out: Open some tab pages and/or split windows, change your color scheme, etc. then save your session using the ":SaveSession my-first-session" command. You can now restore this session at any time by executing the ":OpenSession my-first-session" command.
```

### 19.30.2 Long description

```text
peterodding.com / code / vim / session

session.vim Extended session management for Vim

GitHub project: Watched by 46 people, most recent update was 37 hours ago
Vim Online page: Rated 39, downloaded 1370 times
The session.vim plug-in improves upon Vim’s built-in :mksession command by enabling you to easily and (if you want) automatically persist and restore your Vim editing sessions. It works by generating a Vim script that restores your current settings and the arrangement of tab pages and/or split windows and the files they contain.

To persist your current editing session you can execute the :SaveSession command. If you don’t provide a name for the session ‘default’ is used. You’re free to use whatever characters you like in session names. When you want to restore your session simply execute :OpenSession. Again the name ‘default’ is used if you don’t provide one. When a session is active, has been changed and you quit Vim you’ll be prompted whether you want to save the open session before quitting Vim:



When you start Vim without editing any files and the ‘default’ session exists, you’ll be prompted whether you want to restore the default session:



When you start Vim with a custom server name that matches one of the existing session names then the matching session will be automatically restored. For example I use several sessions to quickly edit my Vim plug-ins:

$ gvim --servername easytags-plugin
$ gvim --servername session-plugin
$ # etc.
The session scripts created by this plug-in are stored in the directory ~/.vim/sessions (on UNIX) or ~\vimfiles\sessions (on Windows) but you can change the location by setting g:session_directory. If you’re curious what the session scripts generated by session.vim look like see the sample below.

# Installation
Unzip the most recent ZIP archive file inside your Vim profile directory (usually this is ~/.vim on UNIX and %USERPROFILE%\vimfiles on Windows), restart Vim and execute the command :helptags ~/.vim/doc (use :helptags ~\vimfiles\doc instead on Windows). After you restart Vim the following commands will be available to you:

# Commands
# The :SaveSession command
This command saves your current editing session just like Vim’s built-in :mksession command does. The difference is that you don’t pass a full pathname as argument but just a name, any name really. Press <Tab> to get completion of existing session names. If you don’t provide an argument the name ‘default’ is used, unless an existing session is open in which case the name of that session will be used.

If the session you’re trying to save is already active in another Vim instance you’ll get a warning and nothing happens. You can use a bang (!) as in :SaveSession! ... to ignore the warning and save the session anyway.

As mentioned earlier your session script will be saved in the directory pointed to by g:session_directory.

# The :OpenSession command
This command is basically :source in disguise, but it supports tab completion of session names and it executes :CloseSession before opening the session. When you don’t provide a session name and only a single session exists then that session is opened, otherwise the plug-in will ask you to select one from a list:

Please select the session to restore:

| 1. vim-profile
| 2. session-plugin
| 3. etc.

Type number and <Enter> or click with mouse (empty cancels):
If the session you’re trying to open is already active in another Vim instance you’ll get a warning and nothing happens. You can use a bang (!) as in :OpenSession! ... to ignore the warning and open the session anyway.

Note also that when you use a bang (!) right after the command name existing tab pages and windows are closed, discarding any changes in the files you were editing!

# The :RestartVim command
This command saves your current editing session, restarts Vim and restores your editing session. This can come in handy when you’re debugging Vim scripts which can’t be easily/safely reloaded using a more lightweight approach. It should work fine on Windows and UNIX alike but because of technical limitations it only works in graphical Vim.

Any commands following the :RestartVim command are intercepted and executed after Vim is restarted and your session has been restored. This makes it easy to perform manual tests which involve restarting Vim, e.g. :RestartVim | edit /path/to/file | call MyTest().

# The :CloseSession command
This command closes all but the current tab page and window and then edits a new, empty buffer. If a session is loaded when you execute this command the plug-in will first ask you whether you want to save that session.

Note that when you use a bang (!) right after the command name existing tab pages and windows are closed, discarding any changes in the files you were editing!

# The :DeleteSession command
Using this command you can delete any of the sessions created by this plug-in. If the session you are trying to delete is currently active in another Vim instance you’ll get a warning and nothing happens. You can use a bang (!) as in :DeleteSession! ... to ignore the warning and delete the session anyway.

Note that this command only deletes the session script, it leaves your open tab pages and windows exactly as they were.

# The :ViewSession command
Execute this command to view the Vim script generated for a session. This command is useful when you need to review the generated Vim script repeatedly, for example while debugging or modifying the session.vim plug-in.

# Options
# The sessionoptions setting
Because the session.vim plug-in uses Vim’s :mksession command you can change how it works by setting ‘sessionoptions’ in your vimrc script, for example:

" If you only want to save the current tab page:
set sessionoptions-=tabpages
 
" If you don't want help windows to be restored:
set sessionoptions-=help
# The g:session_directory option
This option controls the location of your session scripts. Its default value is ~/.vim/sessions (on UNIX) or ~\vimfiles\sessions (on Windows). If you don’t mind the default you don’t have to do anything; the directory will be created for you. Note that a leading ~ is expanded to your current home directory ($HOME on UNIX, %USERPROFILE% on Windows).

# The g:session_autoload option
By default this option is set to 'prompt'. This means that when you start Vim without opening any files and the default session script exists, the session plug-in will ask whether you want to restore your default session. When you set this option to 'yes' and you start Vim without opening any files the default session will be restored without a prompt. To completely disable automatic loading you can set this option to 'no'.

# The g:session_autosave option
By default this option is set to 'prompt'. When you’ve opened a session and you quit Vim, the session plug-in will ask whether you want to save the changes to your session. Set this option to 'yes' to always automatically save open sessions when you quit Vim. To completely disable automatic saving you can set this option to 'no'.

# The g:session_default_to_last option
By default this option is set to false (0). When you set this option to true (1) and you start Vim, the session plug-in will open your last used session instead of the default session. Note that the session plug-in will still show you the dialog asking whether you want to restore the last used session. To get rid of the dialog you have to set g:session_autoload to 'yes'.

# The g:loaded_session option
This variable isn’t really an option but if you want to avoid loading the session.vim plug-in you can set this variable to any value in your vimrc script:

:let g:loaded_session = 1
# Compatibility with other plug-ins
Vim’s :mksession command isn’t fully compatible with plug-ins that create buffers with generated content and because of this session.vim includes specific workarounds for such plug-ins:

NERD tree and Project windows are supported;
When shell.vim is installed Vim’s full-screen state is persisted;
The netrw and taglist.vim plug-ins support sessions out of the box.
If your favorite plug-in doesn’t work with session.vim drop me a mail and I’ll see what I can do. Please include a link to the plug-in in your e-mail so that I can install and test the plug-in.

# Known issues
Recently this plug-in switched from reimplementing :mksession to actually using it because this was the only way to support complex split window layouts. Only after making this change did I realize :mksession doesn’t support quickfix and location list windows and of course it turns out that bolting on support for these after the fact is going to complicate the plug-in significantly (in other words, I’m working on it but it might take a while…)

# Contact
If you have questions, bug reports, suggestions, etc. the author can be contacted at peter@peterodding.com. The latest version is available at http://peterodding.com/code/vim/session/ and http://github.com/xolox/vim-session. If you like the script please vote for it on Vim Online.

# License
This software is licensed under the MIT license.
© 2011 Peter Odding <peter@peterodding.com>.

# Sample session script
Here’s an example session script generated by the session.vim plug-in while I was editing the plug-in itself in Vim:

" ~/.vim/sessions/example.vim: Vim session script.
" Created by session.vim on 30 August 2010 at 05:26:28.
" Open this file in Vim and run :source % to restore your session.
 
set guioptions=aegit
set guifont=Monaco\ 13
if exists('g:syntax_on') != 1 | syntax on | endif
if exists('g:did_load_filetypes') != 1 | filetype on | endif
if exists('g:did_load_ftplugin') != 1 | filetype plugin on | endif
if exists('g:did_indent_on') != 1 | filetype indent on | endif
if !exists('g:colors_name') || g:colors_name != 'slate' | colorscheme slate | endif
call setqflist([])
let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Development/Vim/vim-session
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +473 ~/Development/Vim/vim-session/autoload.vim
badd +1 ~/Development/Vim/vim-session/README.md
badd +1 ~/Development/Vim/vim-session/session.vim
badd +1 ~/Development/Vim/vim-session/TODO.md
set lines=43 columns=167
edit ~/Development/Vim/vim-session/README.md
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
let s:l = 28 - ((27 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
28
normal! 0
tabedit ~/Development/Vim/vim-session/TODO.md
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
let s:l = 6 - ((5 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
6
normal! 0
tabedit ~/Development/Vim/vim-session/session.vim
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
let s:l = 17 - ((16 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
17
normal! 014l
tabedit ~/Development/Vim/vim-session/autoload.vim
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winheight=1 winwidth=1
argglobal
let s:l = 473 - ((41 * winheight(0) + 21) / 42)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
473
normal! 018l
tabnext 4
if exists('s:wipebuf')
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=1 shortmess=filnxtToO
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad

		19.30.3

"
```

## 19.31 vim-addon-manager : manage and update plugins easily

```text
created by
Marc Weber
 
script type
utility
 
description
NEW: Windows users can use this download form now: http://mawercer.de/~marc/vam/index.php to get plugins. 

Note: 
There is also  http://packages.debian.org/sid/vim-addon-manager 
which servers a similar purpose but is Debian specific. 
I chose the same name by accident. See doc/* 

usage example: 

set runtimepath+=~/path-to/vim-plugin-manager 
call scriptmanager#Activate(["vim-haxe","The_NERD_tree","vim-latex"]) 

On startup you'll have to confirm installing plugins. 
For reviewing plugins before usage try :InstallAddon command which downloads only 

Note: I setup a cron job which updates the 
vim-plugin-manager-known-repositories every couple of days. 

Detailed description can be found in the doc directory of this distribution. 

TROUBLE ? Contact me or create a ticket (github page).
 
install details
brief: unzip and add to your runtimepath. 

Details: http://github.com/MarcWeber/vim-addon-manager/blob/master/doc/vim-addon-manager.txt


*/
```

## 19.32 snipMate

```text
http://www.catonmat.net/blog/vim-plugins-snipmate-vim/

Snipmate.vim is probably the best snippets plugin for vim. A snippet is a piece of often-typed text or programming construct that you can insert into your document by using a trigger followed by a <tab>. It was written by Michael Sanders. He says he modeled this plugin after TextMate's snippets.

Here is an example usage of snipmate.vim. If you are a C programmer, then one of the most often used forms of a loop is "for (i=0; i<n; i++) { ... }". Without snippets you'd have to type this out every time. Even though it takes just another second, these seconds can add to minutes throughout the day and minutes can add to hours over longer periods of time. Why waste your time this way? With snippets you can type just "for<tab>" and snipmate will insert this whole construct in your source code automatically! If "i" or "n" weren't the variable you wanted to use, you can now use <tab> and <shift-tab> to jump to next/previous item in the loop and rename them!

    |1. Download snipmate.zip.
    |2. Extract snipmate.zip to ~/.vim (on Unix/Linux) or ~\vimfiles (on Windows).
    |3. Run :helptags ~/.vim/doc (on Unix/Linux) or :helptags ~/vimfiles/doc (on Windows) to rebuild the tags file (so that you can read :help snipmate.)
    |4. Restart Vim.

The plugin comes with predefined snippets for more than a dozen languages (C, C++, HTML, Java, JavaScript, Objective C, Perl, PHP, Python, Ruby, Tcl, Shell, HTML, Mako templates, LaTeX, VimScript). Be sure to check out the snippet files in the "snippets" directory under your ~/.vim or ~\vimfiles directory.

If you need to define your own snippets (which you most likely will need), create a new file named "language-foo.snippets" in the "snippets" directory. For example, to define your own snippets for C language, you'd create a file called "c-foo.snippets" and place snippets in it.

To learn about snipmate snippet syntax, type ":help snipmate" and locate the syntax section in the help file.
```

### 19.32.1 :h snipMate

```text
==============================================================================
DESCRIPTION                                             *snipMate-description*

snipMate.vim implements some of TextMate's snippets features in Vim. A
snippet is a piece of often-typed text that you can insert into your
document using a trigger word followed by a <tab>.

For instance, in a C file using the default installation of snipMate.vim, if
you type "for<tab>" in insert mode, it will expand a typical for loop in C: >

 for (i = 0; i < count; i++) {

 }


To go to the next item in the loop, simply <tab> over to it; if there is
repeated code, such as the "i" variable in this example, you can simply
start typing once it's highlighted and all the matches specified in the
snippet will be updated. To go in reverse, use <shift-tab>.

==============================================================================
SYNTAX                                                        *snippet-syntax*

Snippets can be defined in two ways. They can be in their own file, named
after their trigger in 'snippets/<filetype>/<trigger>.snippet', or they can be
defined together in a 'snippets/<filetype>.snippets' file. Note that dotted
'filetype' syntax is supported -- e.g., you can use >

	:set ft=html.eruby

to activate snippets for both HTML and eRuby for the current file.

The syntax for snippets in *.snippets files is the following: >

 snippet trigger
 	expanded text
	more expanded text

Note that the first hard tab after the snippet trigger is required, and not
expanded in the actual snippet. The syntax for *.snippet files is the same,
only without the trigger declaration and starting indentation.

Also note that snippets must be defined using hard tabs. They can be expanded
to spaces later if desired (see |snipMate-indenting|).

"#" is used as a line-comment character in *.snippets files; however, they can
only be used outside of a snippet declaration. E.g.: >

 # this is a correct comment
 snippet trigger
 	expanded text
 snippet another_trigger
 	# this isn't a comment!
	expanded text
<
This should hopefully be obvious with the included syntax highlighting.
```

### 19.32.2 C snip

```text
# main()
snippet main
	int main(int argc, const char *argv[])
	{
		${1}
		return 0;
	}
# #include <...>
snippet inc
	#include <${1:stdio}.h>${2}
# #include "..."
snippet Inc
	#include "${1:`Filename("$1.h")`}"${2}
# #ifndef ... #define ... #endif
snippet Def
	#ifndef $1
	#define ${1:SYMBOL} ${2:value}
	#endif${3}
snippet def
	#define 
snippet ifdef
	#ifdef ${1:FOO}
		${2:#define }
	#endif
snippet #if
	#if ${1:FOO}
		${2}
	#endif
# Header Include-Guard
# (the randomizer code is taken directly from TextMate; it could probably be
# cleaner, I don't know how to do it in vim script)
snippet once
	#ifndef ${1:`toupper(Filename('', 'UNTITLED').'_'.system("/usr/bin/ruby -e 'print (rand * 2821109907455).round.to_s(36)'"))`}

	#define $1

	${2}

	#endif /* end of include guard: $1 */
# If Condition
snippet if
	if (${1:/* condition */}) {
		${2:/* code */}
	}
snippet el
	else {
		${1}
	}
# Tertiary conditional
snippet t
	${1:/* condition */} ? ${2:a} : ${3:b}
# Do While Loop
snippet do
	do {
		${2:/* code */}
	} while (${1:/* condition */});
# While Loop
snippet wh
	while (${1:/* condition */}) {
		${2:/* code */}
	}
# For Loop
snippet for
	for (${2:i} = 0; $2 < ${1:count}; $2${3:++}) {
		${4:/* code */}
	}
# Custom For Loop
snippet forr
	for (${1:i} = ${2:0}; ${3:$1 < 10}; $1${4:++}) {
		${5:/* code */}
	}
# Function
snippet fun
	${1:void} ${2:function_name}(${3})
	{
		${4:/* code */}
	}
# Function Declaration
snippet fund
	${1:void} ${2:function_name}(${3});${4}
# Typedef
snippet td
	typedef ${1:int} ${2:MyCustomType};${3}
# Struct
snippet st
	struct ${1:`Filename('$1_t', 'name')`} {
		${2:/* data */}
	}${3: /* optional variable list */};${4}
# Typedef struct
snippet tds
	typedef struct ${2:_$1 }{
		${3:/* data */}
	} ${1:`Filename('$1_t', 'name')`};
# Typdef enum
snippet tde
	typedef enum {
		${1:/* data */}
	} ${2:foo};
# printf
# unfortunately version this isn't as nice as TextMates's, given the lack of a
# dynamic `...`
snippet pr
	printf("${1:%s}\n"${2});${3}
# fprintf (again, this isn't as nice as TextMate's version, but it works)
snippet fpr
	fprintf(${1:stderr}, "${2:%s}\n"${3});${4}
snippet .
	[${1}]${2}
snippet un
	unsigned
```

### 19.32.3 c++ snip

```text
# Read File Into Vector
snippet readfile
	std::vector<char> v;
	if (FILE *${2:fp} = fopen(${1:"filename"}, "r")) {
		char buf[1024];
		while (size_t len = fread(buf, 1, sizeof(buf), $2))
			v.insert(v.end(), buf, buf + len);
		fclose($2);
	}${3}
# std::map
snippet map
	std::map<${1:key}, ${2:value}> map${3};
# std::vector
snippet vector
	std::vector<${1:char}> v${2};
# Namespace
snippet ns
	namespace ${1:`Filename('', 'my')`} {
		${2}
	} /* $1 */
# Class
snippet cl
	class ${1:`Filename('$1_t', 'name')`} {
	public:
		$1 (${2:arguments});
		virtual ~$1 ();
	
	private:
		${3:/* data */}
	};
```

### 19.32.4 Java snips

```text
snippet main
	public static void main (String [] args)
	{
		${1:/* code */}
	}
snippet pu
	public
snippet po
	protected
snippet pr
	private
snippet st
	static
snippet fi
	final
snippet ab
	abstract
snippet re
	return
snippet br
	break;
snippet de
	default:
		${1}
snippet ca
	catch(${1:Exception} ${2:e}) ${3}
snippet th
	throw 
snippet sy
	synchronized
snippet im
	import
snippet j.u
	java.util
snippet j.i
	java.io.
snippet j.b
	java.beans.
snippet j.n
	java.net.
snippet j.m
	java.math.
snippet if
	if (${1}) ${2}
snippet el
	else 
snippet elif
	else if (${1}) ${2}
snippet wh
	while (${1}) ${2}
snippet for
	for (${1}; ${2}; ${3}) ${4}
snippet fore
	for (${1} : ${2}) ${3}
snippet sw
	switch (${1}) ${2}
snippet cs
	case ${1}:
		${2}
	${3}
snippet tc
	public class ${1:`Filename()`} extends ${2:TestCase}
snippet t
	public void test${1:Name}() throws Exception ${2}
snippet cl
	class ${1:`Filename("", "untitled")`} ${2}
snippet in
	interface ${1:`Filename("", "untitled")`} ${2:extends Parent}${3}
snippet m
	${1:void} ${2:method}(${3}) ${4:throws }${5}
snippet v
	${1:String} ${2:var}${3: = null}${4};${5}
snippet co
	static public final ${1:String} ${2:var} = ${3};${4}
snippet cos
	static public final String ${1:var} = "${2}";${3}
snippet as
	assert ${1:test} : "${2:Failure message}";${3}
```

### 19.32.5 perl snip

```text
# #!/usr/bin/perl
snippet #!
	#!/usr/bin/perl
	
# Hash Pointer
snippet .
	 =>
# Function
snippet sub
	sub ${1:function_name} {
		${2:#body ...}
	}
# Conditional
snippet if
	if (${1}) {
		${2:# body...}
	}
# Conditional if..else
snippet ife
	if (${1}) {
		${2:# body...}
	} else {
		${3:# else...}
	}
# Conditional if..elsif..else
snippet ifee
	if (${1}) {
		${2:# body...}
	} elsif (${3}) {
		${4:# elsif...}
	} else {
		${5:# else...}
	}
# Conditional One-line
snippet xif
	${1:expression} if ${2:condition};${3}
# Unless conditional
snippet unless
	unless (${1}) {
		${2:# body...}
	}
# Unless conditional One-line
snippet xunless
	${1:expression} unless ${2:condition};${3}
# Try/Except
snippet eval
	eval {
		${1:# do something risky...}
	};
	if ($@) {
		${2:# handle failure...}
	}
# While Loop
snippet wh
	while (${1}) {
		${2:# body...}
	}
# While Loop One-line
snippet xwh
	${1:expression} while ${2:condition};${3}
# For Loop
snippet for
	for (my $${2:var} = 0; $$2 < ${1:count}; $$2${3:++}) {
		${4:# body...}
	}
# Foreach Loop
snippet fore
	foreach my $${1:x} (@${2:array}) {
		${3:# body...}
	}
# Foreach Loop One-line
snippet xfore
	${1:expression} foreach @${2:array};${3}
# Package
snippet cl
	package ${1:ClassName};
	
	use base qw(${2:ParentClass});
	
	sub new {
		my $class = shift;
		$class = ref $class if ref $class;
		my $self = bless {}, $class;
		$self;
	}
	
	1;${3}
# Read File
snippet slurp
	my $${1:var};
	{ local $/ = undef; local *FILE; open FILE, "<${2:file}"; $$1 = <FILE>; close FILE }${3}
```

### 19.32.6 python snip

```text
snippet #!
	#!/usr/bin/python

snippet imp
	import ${1:module}
# Module Docstring
snippet docs
	'''
	File: ${1:`Filename('$1.py', 'foo.py')`}
	Author: ${2:`g:snips_author`}
	Description: ${3}
	'''
snippet wh
	while ${1:condition}:
		${2:# code...}
snippet for
	for ${1:needle} in ${2:haystack}:
		${3:# code...}
# New Class
snippet cl
	class ${1:ClassName}(${2:object}):
		"""${3:docstring for $1}"""
		def __init__(self, ${4:arg}):
			${5:super($1, self).__init__()}
			self.$4 = $4
			${6}
# New Function
snippet def
	def ${1:fname}(${2:`indent('.') ? 'self' : ''`}):
		"""${3:docstring for $1}"""
		${4:pass}
snippet deff
	def ${1:fname}(${2:`indent('.') ? 'self' : ''`}):
		${3}
# New Method
snippet defs
	def ${1:mname}(self, ${2:arg}):
		${3:pass}
# New Property
snippet property
	def ${1:foo}():
		doc = "${2:The $1 property.}"
		def fget(self):
			${3:return self._$1}
		def fset(self, value):
			${4:self._$1 = value}
# Lambda
snippet ld
	${1:var} = lambda ${2:vars} : ${3:action}
snippet .
	self.
snippet try Try/Except
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
snippet try Try/Except/Else
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	else:
		${5:pass}
snippet try Try/Except/Finally
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	finally:
		${5:pass}
snippet try Try/Except/Else/Finally
	try:
		${1:pass}
	except ${2:Exception}, ${3:e}:
		${4:raise $3}
	else:
		${5:pass}
	finally:
		${6:pass}
# if __name__ == '__main__':
snippet ifmain
	if __name__ == '__main__':
		${1:main()}
# __magic__
snippet _
	__${1:init}__${2}
```

### 19.32.7 bash snip

```text
# #!/bin/bash
snippet #!
	#!/bin/bash
	
snippet if
	if [[ ${1:condition} ]]; then
		${2:#statements}
	fi
snippet elif
	elif [[ ${1:condition} ]]; then
		${2:#statements}
snippet for
	for (( ${2:i} = 0; $2 < ${1:count}; $2++ )); do
		${3:#statements}
	done
snippet wh
	while [[ ${1:condition} ]]; do
		${2:#statements}
	done
snippet until
	until [[ ${1:condition} ]]; do
		${2:#statements}
	done
snippet case
	case ${1:word} in
		${2:pattern})
			${3};;
	esac
```

### 19.32.8 html snip

```text
# Some useful Unicode entities
# Non-Breaking Space
snippet nbs
	&nbsp;
# ←
snippet left
	&#x2190;
# →
snippet right
	&#x2192;
# ↑
snippet up
	&#x2191;
# ↓
snippet down
	&#x2193;
# ↩
snippet return
	&#x21A9;
# ⇤
snippet backtab
	&#x21E4;
# ⇥
snippet tab
	&#x21E5;
# ⇧
snippet shift
	&#x21E7;
# ⌃
snippet control
	&#x2303;
# ⌅
snippet enter
	&#x2305;
# ⌘
snippet command
	&#x2318;
# ⌥
snippet option
	&#x2325;
# ⌦
snippet delete
	&#x2326;
# ⌫
snippet backspace
	&#x232B;
# ⎋
snippet escape
	&#x238B;
# Generic Doctype
snippet doctype HTML 4.01 Strict
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""
	"http://www.w3.org/TR/html4/strict.dtd">
snippet doctype HTML 4.01 Transitional
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""
	"http://www.w3.org/TR/html4/loose.dtd">
snippet doctype HTML 5
	<!DOCTYPE HTML>
snippet doctype XHTML 1.0 Frameset
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Strict
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Transitional
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
snippet doctype XHTML 1.1
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
# HTML Doctype 4.01 Strict
snippet docts
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""
	"http://www.w3.org/TR/html4/strict.dtd">
# HTML Doctype 4.01 Transitional
snippet doct
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN""
	"http://www.w3.org/TR/html4/loose.dtd">
# HTML Doctype 5
snippet doct5
	<!DOCTYPE HTML>
# XHTML Doctype 1.0 Frameset
snippet docxf
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
# XHTML Doctype 1.0 Strict
snippet docxs
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
# XHTML Doctype 1.0 Transitional
snippet docxt
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
# XHTML Doctype 1.1
snippet docx
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
snippet html
	<html>
	${1}
	</html>
snippet xhtml
	<html xmlns="http://www.w3.org/1999/xhtml">
	${1}
	</html>
snippet body
	<body>
		${1}
	</body>
snippet head
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8"`Close()`>

		<title>${1:`substitute(Filename('', 'Page Title'), '^.', '\u&', '')`}</title>
		${2}
	</head>
snippet title
	<title>${1:`substitute(Filename('', 'Page Title'), '^.', '\u&', '')`}</title>${2}
snippet script
	<script type="text/javascript" charset="utf-8">
		${1}
	</script>${2}
snippet scriptsrc
	<script src="${1}.js" type="text/javascript" charset="utf-8"></script>${2}
snippet style
	<style type="text/css" media="${1:screen}">
		${2}
	</style>${3}
snippet base
	<base href="${1}" target="${2}"`Close()`>
snippet r
	<br`Close()[1:]`>
snippet div
	<div id="${1:name}">
		${2}
	</div>
# Embed QT Movie
snippet movie
	<object width="$2" height="$3" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
	 codebase="http://www.apple.com/qtactivex/qtplugin.cab">
		<param name="src" value="$1"`Close()`>
		<param name="controller" value="$4"`Close()`>
		<param name="autoplay" value="$5"`Close()`>
		<embed src="${1:movie.mov}"
			width="${2:320}" height="${3:240}"
			controller="${4:true}" autoplay="${5:true}"
			scale="tofit" cache="true"
			pluginspage="http://www.apple.com/quicktime/download/"
		`Close()[1:]`>
	</object>${6}
snippet fieldset
	<fieldset id="$1">
		<legend>${1:name}</legend>

		${3}
	</fieldset>
snippet form
	<form action="${1:`Filename('$1_submit')`}" method="${2:get}" accept-charset="utf-8">
		${3}


	<p><input type="submit" value="Continue &rarr;"`Close()`></p>
	</form>
snippet h1
	<h1 id="${1:heading}">${2:$1}</h1>
snippet input
	<input type="${1:text/submit/hidden/button}" name="${2:some_name}" value="${3}"`Close()`>${4}
snippet label
	<label for="${2:$1}">${1:name}</label><input type="${3:text/submit/hidden/button}" name="${4:$2}" value="${5}" id="${6:$2}"`Close()`>${7}
snippet link
	<link rel="${1:stylesheet}" href="${2:/css/master.css}" type="text/css" media="${3:screen}" charset="utf-8"`Close()`>${4}
snippet mailto
	<a href="mailto:${1:joe@example.com}?subject=${2:feedback}">${3:email me}</a>
snippet meta
	<meta name="${1:name}" content="${2:content}"`Close()`>${3}
snippet opt
	<option value="${1:option}">${2:$1}</option>${3}
snippet optt
	<option>${1:option}</option>${2}
snippet select
	<select name="${1:some_name}" id="${2:$1}">
		<option value="${3:option}">${4:$3}</option>
	</select>${5}
snippet table
	<table border="${1:0}">
		<tr><th>${2:Header}</th></tr>
		<tr><th>${3:Data}</th></tr>
	</table>${4}
snippet textarea
	<textarea name="${1:Name}" rows="${2:8}" cols="${3:40}">${4}</textarea>${5}

		19.32.9
```

## 19.33 stlrefvim : A C++ Standard Template Library reference manual

```text
http://www.vim.org/scripts/script.php?script_id=2353

description
This plugin aims to provide a reference manual for the C++ standard template library (STL).  Based heavily off of the well-regarded SGI-STL documentation, this script puts the power of this documentation into your vim workflow.  Lookups can easily be done with user-configurable key mappings. 

For example, in the expression: 
    std::for_each(start, end, PrintFunc) 
place the cursor over for_each and type <Leader>tr to go to documentation for this function.  Type <Leader>te to go to an example that uses this function. 

Many thanks must go to Christian Habermann's for his crefvim plugin (http://www.vim.org/scripts/script.php?script_id=614) that formed the basis of and was the inspiration for this plugin.
 
install details
stlrefvim consists of two files: the script 'stlrefvim.vim' and its documentation 'stlrefvim.txt'. 

To use the script copy it into your local plugin-directory 
  Unix:    ~/.vim/plugin 
  Windows: c:\vimfiles\plugin 

You have to add this documentation and the STL-reference to Vim's help system. To do this, copy 'stlrefvim.txt' to your local doc-directory: 
  Unix:    ~/.vim/doc 
  Windows: c:\vimfiles\doc 

Then start Vim and do: 
  :helptags ~/.vim/doc   (or :helptags c:\vimfiles\doc for Windows)

  \tr - manual
  \te - example
  \tw - search
  \tc - ToC
```

## 19.34 Pathogen

```text
update all bundles from git
$ for d in */;do echo $d; cd $d; gitfp; cd -; done

Also after clone remember to run submodule init/update:
$ git submodule init
$ git submodule update
```

### 19.34.1 http://www.vim.org/scripts/script.php?script_id=2332

```text
created by
Tim Pope
 
script type
utility
 
description
Manage your 'runtimepath' with ease.  In practical terms, pathogen.vim makes it super easy to install plugins and runtime files in their own private directories. 

Add this to your vimrc: 

    call pathogen#infect() 

Now any plugins you wish to install can be extracted to a subdirectory under ~/.vim/bundle, and they will be added to the 'runtimepath'. 

Use :Helptags to run :helptags on every doc/ directory in your 'runtimepath'. 

For more detailed, better formatted documentation, see the README on GitHub: 

http://github.com/tpope/vim-pathogen
 
install details
Install in ~/.vim/autoload (~\vimfiles\autoload on Windows). Or copy and paste: 

mkdir -p ~/.vim/autoload ~/.vim/bundle 
curl 'www.vim.org/scripts/download_script.php?src_id=19375' \ 
  > ~/.vim/autoload/pathogen.vim
```

### 19.34.2 Using Vim with Pathogen

```text
July 18, 2011 § 5 Comments

Vim is my editor of choice. Vim is everywhere and has hundreds of plugins to allow you to do pretty much anything a text editor can possibly do.

The problem is, setting up Vim to use plugins is not the simplest thing to do. Enter Pathogen.

Pathogen is written by Vim plugin guru Tim Pope, it lets you isolate plugin scripts under their own directories. This means easy installs, uninistalls and upgrades.

Here’s a walk through about how to get this up and running:


I always like to start things from a clean slate, so firstly backup anything you already have:

mv ~/.vimrc ~/.vimrc.bak
mv ~/.vim/ ~/.vimbak/
Next create a brand new .vim directory and download pathogen:

mkdir -p ~/.vim/autoload
mkdir -p ~/.vim/bundle
cd ~/.vim/autoload
curl https://github.com/tpope/vim-pathogen/raw/master/autoload/pathogen.vim > pathogen.vim
Now create a new ~/.vimrc and put the following lines at the top:

" Pathogen
filetype off " Pathogen needs to run before plugin indent on
call pathogen#runtime_append_all_bundles()
call pathogen#helptags() " generate helptags for everything in 'runtimepath'
filetype plugin indent on

That’s pretty much it.

Now for the payoff – git powered plugin management. As seems to be the case with most code these days, many vim plugins are hosted on Github

Let’s walk through installing the popular NERDTree plugin. This plugin gives Vim a Textmate style project drawer:

cd ~/.vim/bundle
git clone git://github.com/scrooloose/nerdtree.git
restart vim, and boom NerdTree is installed, do a :NERDTreeToggle to hide and show the project drawer. To uninstall just delete the cloned repo:

rm -Rf ~/.vim/bundle/nerdtree
Simples.

Here are some of the plugins I like:

rails.vim Essential if you’re a Rails developer, allows switching between files, autocompletion, refactoring, and lots more.
git clone git://github.com/tpope/vim-rails.git
Command-T Leader t (usually \t) for quickly finding files.
git clone git://git.wincent.com/command-t.git
snipmate.vim TextMate-style snippets in Vim: type def and a Ruby method block gets created.
git clone git://github.com/msanders/snipmate.vim.git
vividchalk.vim A colorscheme strangely reminiscent of Vibrant Ink for a certain OS X editor.
git clone git://github.com/tpope/vim-vividchalk.git
```

### 19.34.3 git repo

#### 19.34.3.1 https://github.com/lambacck/vimconfig/blob/master/.gitmodules

#### 19.34.3.2 https://github.com/vim-scripts

### 19.34.4 My examples

#### 19.34.4.1 Linux

```text
$ git clone git://github.com/lambacck/VisIncr.git
```

#### 19.34.4.2 Windows

```text
			 git clone git://github.com/Shougo/neocomplcache.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/taglist.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/Colour-Sampler-Pack

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/a.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/bash-support.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/bufexplorer.zip

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/c.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/cscope.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/DrawIt

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/LargeFile

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/matchit.zip

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/minibufexpl.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/perl-support.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/The-NERD-tree

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/ShowMarks

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/SuperTab

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/surround.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/tagexplorer.vim

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/VisIncr

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/netrw.vim
c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/snipMate

c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/TaskList.vim
c:\Program Files (x86)\Vim\vim74\bundle>git clone git://github.com/vim-scripts/Gundo
```

#### 19.34.4.3 Cygwin

```text
git clone git://github.com/vim-scripts/taglist.vim
git clone git://github.com/vim-scripts/Colour-Sampler-Pack
git clone git://github.com/vim-scripts/a.vim
git clone git://github.com/vim-scripts/bash-support.vim
git clone git://github.com/vim-scripts/bufexplorer.zip
git clone git://github.com/vim-scripts/c.vim
git clone git://github.com/vim-scripts/cscope.vim
git clone git://github.com/vim-scripts/DrawIt
git clone git://github.com/vim-scripts/LargeFile
git clone git://github.com/vim-scripts/matchit.zip
git clone git://github.com/vim-scripts/minibufexpl.vim
git clone git://github.com/vim-scripts/perl-support.vim
git clone git://github.com/vim-scripts/The-NERD-tree
git clone git://github.com/vim-scripts/ShowMarks
git clone git://github.com/vim-scripts/SuperTab
git clone git://github.com/vim-scripts/surround.vim
git clone git://github.com/vim-scripts/tagexplorer.vim
git clone git://github.com/vim-scripts/VisIncr
git clone git://github.com/vim-scripts/netrw.vim
git clone git://github.com/vim-scripts/snipMate
git clone git://github.com/vim-scripts/TaskList.vim
git clone git://github.com/vim-scripts/Gundo
```

#### 19.34.4.4 Mac

```text
$ cd ~/.vim/bundle/
$ ls
Colour-Sampler-Pack	LargeFile		TaskList.vim		a.vim			c.vim			highlights		netrw.vim		surround.vim		utl.vim
DrawIt			ShowMarks		The-NERD-tree		bash-support.vim	cscope.vim		matchit.zip		perl-support.vim	tagexplorer.vim		vim-easymotion
Gundo			SuperTab		VisIncr			bufexplorer.zip		ctrlp.vim		minibufexpl.vim		snipMate		taglist.vim

git clone git://github.com/vim-scripts/vim-easymotion
$ git clone git://github.com/valloric/YouCompleteMe/
$ git clone git://github.com/Shougo/neocomplete.vim

			19.34.4.5
		19.34.5
```

## 19.35 Gundo

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

## 19.36 neocomplcach, obsolete use neocomplete instead

```text
 git clone git://github.com/Shougo/neocomplcache.vim
git clone git://github.com/Shougo/neocomplete.vim

Follow the instructions for install.
To use: just start typing. 
To Choose, either arrows and enter, or ctrl+i , or in my mappings ctrl+n descending , ctrl+l acsending
For manual completion from buffer/file etc use ctrl-x + P/F/L etc 

For RH 6 -  sudo yum install lua-devel.x86_64 
Note, for Linux RHEL 5.5 need to Install lua manually , ex:
a. Download sources 
b. build and Install 
# pwd
/tmp/lua-5.3.2
# ls
doc  Makefile  README  src
 make -C src clean all SYSCFLAGS="-DLUA_USE_LINUX" SYSLIBS="-Wl,-E -ldl -lreadline -lncurses"
 make linux test
# cp src/liblua.a  /usr/lib/
# cp ../../../lua-5.3.2/src/*.h /usr/include/

If you get this error:
error: #error "Compiler does not support 'long long'. Use option '-DLUA_32BITS'   or '-DLUA_C89_NUMBERS' (see file 'luaconf.h' for details)"
Manually edit
# pwd
/tmp/vim/vim/src
# vi Makefile 
...
So that:
# grep LUA_3 Makefile 
CFLAGS = -DLUA_32BITS

c. Build vim with lua 
# ./configure --with-features=huge             --enable-multibyte             --enable-pythoninterp             --enable-perlinterp             --enable-luainterp             --enable-gui=gtk2 --enable-cscope --prefix=/usr | grep lua
checking --enable-luainterp argument... yes
checking --with-lua-prefix argument... no
checking --with-luajit... no
checking for lua... no
checking if lua.h can be found in /usr/include... yes
checking if link with -L/usr/lib -llua is sane... yes
```

## 19.37 Ctrl-P

```text
If Vim made finding files as easy as it makes makes manipulating them, life would be sweet. A few plugins have been written to try to address this (FuzzyFinder and Command-T being the obvious ones). Of them, Ctrl-P currently leads the field (in BestOfVim's opinion).

Ctrl-P is a file-finder on overdrive. Once installed, you hit <Ctrl-P> and type in a few characters from your file/path. Ctrl-P quickly finds anything that matches, and sorts by best-guess. This speeds up simple stuff like typing <Ctrl-P>user to find & choose from all the files in your project with user in the name.

But it goes further. Any text you type is considered a partial match. Want to find any user files in the widget subsystem? You can type <Ctrl-P>widgetuser and it will figure out what you meant. You can even type <Ctrl-P>widusr for the same result.

This becomes particularly handy when you don't quite remember what you're looking for. Know you're looking for an HTML file somewhere under one of the template directories? Type <Ctrl-P>tmplhtm and Ctrl-P will do the legwork for you, presenting a list of best-matches.

That's the core of Ctrl-P, but it has lots of polish to its main feature that make it really nice to work with:

It will intelligently try to guess your project's root directory, by looking for hints from your version-control system.
It makes good use of syntax highlighting to show why it's suggesting the files it's picked.
It lets you select and open multiple matches in one go, in split windows or new tabs.
It tracks most recently-used files, so you can hunt by recency as well as name.
Ctrl-P's really worth giving a test-drive. It's easy to get started with, and sits happily alongside NerdTree and BufExplorer in your arsenal of filesystem-hunting.

Full path fuzzy file, buffer, mru, tag, ... finder for Vim.
Written in pure Vimscript for MacVim, gVim and Vim 7.0+.
Full support for Vim's regexp as search patterns.
Built-in Most Recently Used (MRU) files monitoring and search.
Built-in project's root finder.
Open multiple files at once.
Create new files and directories.
Execute Ex commands on an opening file (jump to a line, to a string or do anything).
Optional cross-sessions caching and history allow for fast initialization.
Mappings and usage conform to Vim's conventions.
Screenshot: CtrlP in regex and full path mode with 3 files selected to open.
screenshot
```

### 19.37.1 Basic Usage:

```text
Run :CtrlP or :CtrlP [starting-directory] to invoke CtrlP in find file mode.
Run :CtrlPBuffer or :CtrlPMRU to start CtrlP in find buffer or find MRU file mode.
Run :CtrlPMixed to search in Files, Buffers and MRU files at the same time.
Check :help ctrlp-commands and :help ctrlp-extensions for other commands.
```

### 19.37.2 Once CtrlP is open:

```text
Press <F5> to purge the cache for the current directory to get new files, remove deleted files and apply new ignore options.
Press <c-f> and <c-b> to cycle between modes.
Press <c-d> to switch to filename search instead of full path.
Press <c-r> to switch to regexp mode.
Use <c-j>, <c-k> or the arrow keys to navigate the result list.
Use <c-t> or <c-v>, <c-x> to open the selected entry in a new tab or in a new split.
Use <c-n>, <c-p> to select the next/previous string in the prompt's history.
Use <c-y> to create a new file and its parent directories.
Use <c-z> to mark/unmark multiple files and <c-o> to open them.
Run :help ctrlp-mappings or submit ? in CtrlP for more mapping help.

Submit two or more dots .. to go up the directory tree by one or multiple levels.
End the input with a colon : followed by a command to execute it after opening the file:
Use :25 to jump to line 25.
Use :/any\:\ string to jump to the first instance of any: string.
Use :+setfiletype\ myfiletype|25 to set the filetype to myfiletype then jump to line 25.
Use :diffthis when opening files marked by <c-z> to run :diffthis on the first 4 files.
```

### 19.37.3 Basic Options:

```text
Change the default mapping and the default command to invoke CtrlP:
let g:ctrlp_map = '<c-p>'
let g:ctrlp_cmd = 'CtrlP'
When invoked, unless a starting directory is specified, CtrlP will set its local working directory according to this variable:
let g:ctrlp_working_path_mode = 'ra'
'c' - the directory of the current file.
'r' - the nearest ancestor that contains one of these directories or files: .git .hg .svn .bzr _darcs, and your own root markers defined with the g:ctrlp_root_markers option.
'a' - like 'c', but only applies when the current working directory outside of CtrlP isn't a direct ancestor of the directory of the current file.
0 or '' (empty string) - disable this feature.
Exclude files or directories using Vim's wildignore:
set wildignore+=*/tmp/*,*.so,*.swp,*.zip     " Linux/MacOSX
set wildignore+=*\\tmp\\*,*.swp,*.zip,*.exe  " Windows
And/Or CtrlP's own g:ctrlp_custom_ignore:
let g:ctrlp_custom_ignore = '\v[\/]\.(git|hg|svn)$'
let g:ctrlp_custom_ignore = {
	\ 'dir':  '\v[\/]\.(git|hg|svn)$',
	\ 'file': '\v\.(exe|so|dll)$',
	\ 'link': 'SOME_BAD_SYMBOLIC_LINKS',
	\ }
Specify an external tool to use for listing files instead of using Vim's globpath(). Use %s in place of the target directory:
let g:ctrlp_user_command = 'find %s -type f'        " MacOSX/Linux
let g:ctrlp_user_command = 'dir %s /-n /b /s /a-d'  " Windows
Single VCS listing command:
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files']
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files . -co --exclude-standard', 'find %s -type f']
let g:ctrlp_user_command = ['.hg', 'hg --cwd %s locate -I .']
Multiple VCS listing commands:
let g:ctrlp_user_command = {
	\ 'types': {
		\ 1: ['.git', 'cd %s && git ls-files'],
		\ 2: ['.hg', 'hg --cwd %s locate -I .'],
		\ },
	\ 'fallback': 'find %s -type f'
	\ }
Check :help ctrlp-options for other options.
```

### 19.37.4 Get ctrlp.vim:

```text
Clone the plugin into a separate directory:
$ cd ~/.vim
$ git clone https://github.com/kien/ctrlp.vim.git bundle/ctrlp.vim
Or if you prefer Mercurial:
$ hg clone https://bitbucket.org/kien/ctrlp.vim bundle/ctrlp.vim
Add to your ~/.vimrc:
set runtimepath^=~/.vim/bundle/ctrlp.vim
Run at Vim's command line:
:helptags ~/.vim/bundle/ctrlp.vim/doc
Restart Vim and check :help ctrlp.txt for usage instructions and configuration details.
```

### 19.37.5 Issues

#### 19.37.5.1 Can't find my file

```text
- Try Clearing the cache - :CtrlPClearAllCaches
- Also increased the max_file limit - let g:ctrlp_max_files=0 
- For large project, we should also set 
let g:ctrlp_max_depth=40 .
-
			19.37.5.2

		19.37.6
```

## 19.38 EasyMotion

### 19.38.1 Introduction

```text
EasyMotion provides a much simpler way to use some motions in vim. It takes the <number> out of <number>w or <number>f{char} by highlighting all possible choices and allowing you to press one key to jump directly to the target.

When one of the available motions is triggered, all visible text preceding or following the cursor is faded, and motion targets are highlighted.

EasyMotion is triggered by one of the provided mappings.

Important notes about the default bindings
The default leader has been changed to <Leader><Leader> to avoid conflicts with other plugins you may have installed. This can easily be changed back to pre-1.3 behavior by rebinding the leader in your vimrc:

let g:EasyMotion_leader_key = '<Leader>'
All motions are now triggered with <Leader><Leader> by default, e.g. <Leader><Leader>t, <Leader><Leader>gE.

Usage example

Type <Leader><Leader>w to trigger the word motion w. When the motion is triggered, the text is updated (no braces are actually added, the text is highlighted in red by default):

<cursor>Lorem {a}psum {b}olor {c}it {d}met.
Press c to jump to the beginning of the word "sit":

Lorem ipsum dolor <cursor>sit amet.
Similarly, if you're looking for an "o", you can use the f motion. Type <Leader><Leader>fo, and all "o" characters are highlighted:

<cursor>L{a}rem ipsum d{b}l{c}r sit amet.
Press b to jump to the second "o":

Lorem ipsum d<cursor>olor sit amet.
```

### 19.38.2 Install

```text
$ git clone https://github.com/Lokaltog/vim-easymotion
Cloning into 'vim-easymotion'...
remote: Reusing existing pack: 602, done.
remote: Total 602 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (602/602), 116.74 KiB | 0 bytes/s, done.
Resolving deltas: 100% (160/160), done.
Checking connectivity... done

		19.38.3
```

## 19.39 https://github.com/Valloric/YouCompleteMe, YCM

### 19.39.1 Install

```text
https://valloric.github.io/YouCompleteMe/

$ git clone git://github.com/valloric/YouCompleteMe/
$ cd YouCompleteMe/
	$ git submodule update --init --recursive

-> On linux: $ ./install.sh --clang-completer
-> On Mac: 
$ brew install cmake
$ ./install.py --clang-completer

----->> On linux this has issue w/ validating server cert. fix:
$ ./install.sh --clang-completer
File /users/<user>/.vim/bundle/YouCompleteMe/third_party/ycmd/build.sh doesn't exist; you probably forgot to run:

        git submodule update --init --recursive

$  git submodule update --init --recursive
Cloning into 'third_party/requests'...
fatal: unable to access 'https://github.com/kennethreitz/requests/': SSL certificate problem, verify that the CA cert is OK. Details:
error:14090086:SSL routines:SSL3_GET_SERVER_CERTIFICATE:certificate verify failed
Clone of 'https://github.com/kennethreitz/requests' into submodule path 'third_party/requests' failed
$ git --version
git version 1.9.2
$ git config --global http.sslVerify false
$ ./install.sh --clang-completer
File /users/<user>/.vim/bundle/YouCompleteMe/third_party/ycmd/build.sh doesn't exist; you probably forgot to run:

        git submodule update --init --recursive

$ git submodule update --init --recursive
Cloning into 'third_party/requests'...

----->> On linux this has issue w/ validating server cert. fix:
- 
```

### 19.39.2 languages support

```text
The following additional language support options are available:

    C# support: install Mono with Homebrew or by downloading the Mono Mac package and add --cs-completer when calling install.py.
    Go support: install Go and add --go-completer when calling install.py.
    JavaScript and TypeScript support: install Node.js and npm then install the TypeScript SDK with npm install -g typescript.
    Rust support: install Rust and add --rust-completer when calling install.py.
    Java support: install JDK8 (version 8 required) and add --java-completer when calling install.py.

To simply compile with everything enabled, there's a --all flag. So, to install with all language features, ensure xbuild, go, tsserver, node, npm, rustc, and cargo tools are installed and in your PATH, then simply run:

cd ~/.vim/bundle/YouCompleteMe
./install.py --all

		19.39.3
```

## 19.40 https://github.com/Lokaltog/powerline

```text
Powerline is a statusline plugin for vim, and provides statuslines and prompts for several other applications, including zsh, bash, tmux, IPython, Awesome and Qtile. 


$ git clone git://github.com/powerline
```

## 19.41 https://github.com/pthrasher/conqueterm-vim

```text
Terminal emulator in VIM

$  git clone git://github.com/pthrasher/conqueterm-vim

:ConqueTermSplit bash
```

## 19.42 tagbar

```text
 git clone https://github.com/majutsushi/tagbar.git
:TagbarToggle
```

## 19.43 airling

```text
git clone https://github.com/vim-airline/vim-airline ~/.vim/bundle/vim-airline
```

## 19.44 fugitive

```text
http://vimawesome.com/plugin/fugitive-vim

install:
mkdir -p ~/.vim/pack/tpope/start
cd ~/.vim/pack/tpope/start
git clone https://tpope.io/vim/fugitive.git
vim -u NONE -c "helptags fugitive/doc" -c q

I'm not going to lie to you; fugitive.vim may very well be the best Git wrapper of all time. Check out these features:

View any blob, tree, commit, or tag in the repository with :Gedit (and :Gsplit, :Gvsplit, :Gtabedit, ...). Edit a file in the index and write to it to stage the changes. Use :Gdiff to bring up the staged version of the file side by side with the working tree version and use Vim's diff handling capabilities to stage a subset of the file's changes.

Bring up the output of git status with :Gstatus. Press - to add/reset a file's changes, or p to add/reset --patch. And guess what :Gcommit does!

:Gblame brings up an interactive vertical split with git blame output. Press enter on a line to edit the commit where the line changed, or o to open it in a split. When you're done, use :Gedit in the historic buffer to go back to the work tree version.

:Gmove does a git mv on a file and simultaneously renames the buffer. :Gdelete does a git rm on a file and simultaneously deletes the buffer.

Use :Ggrep to search the work tree (or any arbitrary commit) with git grep, skipping over that which is not tracked in the repository. :Glog loads all previous revisions of a file into the quickfix list so you can iterate over them and watch the file evolve!

:Gread is a variant of git checkout -- filename that operates on the buffer rather than the filename. This means you can use u to undo it and you never get any warnings about the file changing outside Vim. :Gwrite writes to both the work tree and index versions of a file, making it like git add when called from a work tree file and like git checkout when called from the index or a blob in history.

Use :Gbrowse to open the current file on the web front-end of your favorite hosting provider, with optional line range (try it in visual mode!). Built-in support is provided for git instaweb, and plugins are available for popular providers such as GitHub, GitLab, and Bitbucket.

Add %{fugitive#statusline()} to 'statusline' to get an indicator with the current branch in (surprise!) your statusline.

Last but not least, there's :Git for running any arbitrary command, and Git! to open the output of a command in a temp file.

Screencasts

A complement to command line git
Working with the git index
Resolving merge conflicts with vimdiff
Browsing the git object database
Exploring the history of a git repository
Installation

If you don't have a preferred installation method, one option is to install pathogen.vim, and then copy and paste:

cd ~/.vim/bundle
git clone git://github.com/tpope/vim-fugitive.git
vim -u NONE -c "helptags vim-fugitive/doc" -c q
If your Vim version is below 7.2, I recommend also installing vim-git for syntax highlighting and other Git niceties.

FAQ

I installed the plugin and started Vim. Why don't any of the commands exist?

Fugitive cares about the current file, not the current working directory. Edit a file from the repository.

I opened a new tab. Why don't any of the commands exist?

Fugitive cares about the current file, not the current working directory. Edit a file from the repository.

Why is :Gbrowse not using the right browser?

:Gbrowse delegates to git web--browse, which is less than perfect when it comes to finding the right browser. You can tell it the correct browser to use with git config --global web.browser .... On OS X, for example, you might want to set this to open. See git web--browse --help for details.

Here's a patch that automatically opens the quickfix window after :Ggrep.

This is a great example of why I recommend asking before patching. There are valid arguments to be made both for and against automatically opening the quickfix window. Whenever I have to make an arbitrary decision like this, I ask what Vim would do. And Vim does not open a quickfix window after :grep.

Luckily, it's easy to implement the desired behavior without changing fugitive.vim. The following autocommand will cause the quickfix window to open after any grep invocation:

autocmd QuickFixCmdPost *grep* cwindow
Self-Promotion

Like fugitive.vim? Follow the repository on GitHub and vote for it on vim.org. And if you're feeling especially charitable, follow tpope on Twitter and GitHub.

License

Copyright (c) Tim Pope. Distributed under the same terms as Vim itself. See :help license.

Installation

Extract in ~/.vim (~\vimfiles on Windows). I highly recommend grabbing directly from http://github.com/tpope/vim-fugitive as this version tends to fall out of date.
```

## 19.45 fzf, faster ctrlp

```text
fuzzy finder

<URL:/Users/<user>/work/KB/linux/KB_Linux#__fzf__linux__>

from terminal find + edit file:
vim $(fzf)
or vimf (alias)

from vim:
:fzf
```

## 19.46 ag, quick recursive grep

```text
https://robots.thoughtbot.com/faster-grepping-in-vim

install ag
brew install ag

add to .vimrc:
"ag
" The Silver Searcher
if executable('ag')
  " Use ag over grep
  set grepprg=ag\ --nogroup\ --nocolor

  " Use ag in CtrlP for listing files. Lightning fast and respects .gitignore
  let g:ctrlp_user_command = 'ag %s -l --nocolor -g ""'

  " ag is fast enough that CtrlP doesn't need to cache
  let g:ctrlp_use_caching = 0
endif

" bind K to grep word under cursor
nnoremap K :grep! "\b<C-R><C-W>\b"<CR>:cw<CR>
$ ag --help

Usage: ag [FILE-TYPE] [OPTIONS] PATTERN [PATH]

  Recursively search for PATTERN in PATH.
  Like grep or ack, but faster.

Example:
  ag -i foo /bar/

Output Options:
     --ackmate            Print results in AckMate-parseable format
  -A --after [LINES]      Print lines after match (Default: 2)
  -B --before [LINES]     Print lines before match (Default: 2)
     --[no]break          Print newlines between matches in different files
                          (Enabled by default)
  -c --count              Only print the number of matches in each file.
                          (This often differs from the number of matching lines)
     --[no]color          Print color codes in results (Enabled by default)
     --color-line-number  Color codes for line numbers (Default: 1;33)
     --color-match        Color codes for result match numbers (Default: 30;43)
     --color-path         Color codes for path names (Default: 1;32)
     --column             Print column numbers in results
     --[no]filename       Print file names (Enabled unless searching a single file)
  -H --[no]heading        Print file names before each file's matches
                          (Enabled by default)
  -C --context [LINES]    Print lines before and after matches (Default: 2)
     --[no]group          Same as --[no]break --[no]heading
  -g --filename-pattern PATTERN
                          Print filenames matching PATTERN
  -l --files-with-matches Only print filenames that contain matches
                          (don't print the matching lines)
  -L --files-without-matches
                          Only print filenames that don't contain matches
     --print-all-files    Print headings for all files searched, even those that
                          don't contain matches
     --[no]numbers        Print line numbers. Default is to omit line numbers
                          when searching streams
  -o --only-matching      Prints only the matching part of the lines
     --print-long-lines   Print matches on very long lines (Default: >2k characters)
     --passthrough        When searching a stream, print all lines even if they
                          don't match
     --silent             Suppress all log messages, including errors
     --stats              Print stats (files scanned, time taken, etc.)
     --stats-only         Print stats and nothing else.
                          (Same as --count when searching a single file)
     --vimgrep            Print results like vim's :vimgrep /pattern/g would
                          (it reports every match on the line)
  -0 --null --print0      Separate filenames with null (for 'xargs -0')

Search Options:
  -a --all-types          Search all files (doesn't include hidden files
                          or patterns from ignore files)
  -D --debug              Ridiculous debugging (probably not useful)
     --depth NUM          Search up to NUM directories deep (Default: 25)
  -f --follow             Follow symlinks
  -F --fixed-strings      Alias for --literal for compatibility with grep
  -G --file-search-regex  PATTERN Limit search to filenames matching PATTERN
     --hidden             Search hidden files (obeys .*ignore files)
  -i --ignore-case        Match case insensitively
     --ignore PATTERN     Ignore files/directories matching PATTERN
                          (literal file/directory names also allowed)
     --ignore-dir NAME    Alias for --ignore for compatibility with ack.
  -m --max-count NUM      Skip the rest of a file after NUM matches (Default: 10,000)
     --one-device         Don't follow links to other devices.
  -p --path-to-ignore STRING
                          Use .ignore file at STRING
  -Q --literal            Don't parse PATTERN as a regular expression
  -s --case-sensitive     Match case sensitively
  -S --smart-case         Match case insensitively unless PATTERN contains
                          uppercase characters (Enabled by default)
     --search-binary      Search binary files for matches
  -t --all-text           Search all text files (doesn't include hidden files)
  -u --unrestricted       Search all files (ignore .ignore, .gitignore, etc.;
                          searches binary and hidden files as well)
  -U --skip-vcs-ignores   Ignore VCS ignore files
                          (.gitignore, .hgignore; still obey .ignore)
  -v --invert-match
  -w --word-regexp        Only match whole words
  -W --width NUM          Truncate match lines after NUM characters
  -z --search-zip         Search contents of compressed (e.g., gzip) files

File Types:
The search can be restricted to certain types of files. Example:
  ag --html needle
  - Searches for 'needle' in files with suffix .htm, .html, .shtml or .xhtml.

For a list of supported file types run:
  ag --list-file-types
```

## 19.47 syntastic , on the fly syntax check for all languages

```text
$ git clone --depth=1 https://github.com/vim-syntastic/syntastic.git
```

## 19.48 jsonpath

```text
~/.vim/bundle:$ git clone https://github.com/mogelbrod/vim-jsonpath.git
:JsonPath: Echoes the path to the identifier under the cursor.
:JsonPath path.to.prop: Searches the active buffer for the given path, placing the cursor on it if found.
```

## 19.49 Table mode

```text
https://github.com/dhruvasagar/vim-table-mode

VIM Table Mode v4.6.7 Build Status
An awesome automatic table creator & formatter allowing one to create neat tables as you type.

Getting Started
Installation
There are several ways to do this

I recommend installing NeoBundle and then just add NeoBundle 'dhruvasagar/vim-table-mode' to your ~/.vimrc

If you are using pathogen.vim, then add a git submodule for your plugin:

$ cd ~/.vim
$ git submodule add git@github.com:dhruvasagar/vim-table-mode.git bundle/table-mode
Copy all files under autoload/, plugin/, doc/ to respective ~/.vim/autoload/, ~/.vim/plugin and ~/.vim/doc under UNIX or vimfiles/autoload/, vimfiles/plugin/ and vimfiles/doc under WINDOWS and restart VIM
Creating table on-the-fly
To start using the plugin in the on-the-fly mode use :TableModeToggle mapped to <Leader>tm by default (which means \ t m if you didn't override the by :let mapleader = ',' to have , t m).

Tip : You can use the following to quickly enable / disable table mode in insert mode by using || or __ :

function! s:isAtStartOfLine(mapping)
  let text_before_cursor = getline('.')[0 : col('.')-1]
  let mapping_pattern = '\V' . escape(a:mapping, '\')
  let comment_pattern = '\V' . escape(substitute(&l:commentstring, '%s.*$', '', ''), '\')
  return (text_before_cursor =~? '^' . ('\v(' . comment_pattern . '\v)?') . '\s*\v' . mapping_pattern . '\v$')
endfunction

inoreabbrev <expr> <bar><bar>
          \ <SID>isAtStartOfLine('\|\|') ?
          \ '<c-o>:TableModeEnable<cr><bar><space><bar><left><left>' : '<bar><bar>'
inoreabbrev <expr> __
          \ <SID>isAtStartOfLine('__') ?
          \ '<c-o>:silent! TableModeDisable<cr>' : '__'
Enter the first line, delimiting columns by the | symbol. The plugin reacts by inserting spaces between the text and the separator if you omit them:

| name | address | phone |
In the second line (without leaving Insert mode), enter | twice. The plugin will write a properly formatted horizontal line:

| name | address | phone |
|------+---------+-------|
When you enter the subsequent lines, the plugin will automatically adjust the formatting to match the text you’re entering every time you press |:

| name       | address | phone |
|------------+---------+-------|
| John Adams |
Go on until the table is ready:

| name            | address                  | phone      |
|-----------------+--------------------------+------------|
| John Adams      | 1600 Pennsylvania Avenue | 0123456789 |
|-----------------+--------------------------+------------|
| Sherlock Holmes | 221B Baker Street        | 0987654321 |
|-----------------+--------------------------+------------|
Then you can return to the first line and above it enter ||:

|-----------------+--------------------------+------------|
| name            | address                  | phone      |
|-----------------+--------------------------+------------|
| John Adams      | 1600 Pennsylvania Avenue | 0123456789 |
|-----------------+--------------------------+------------|
| Sherlock Holmes | 221B Baker Street        | 0987654321 |
|-----------------+--------------------------+------------|
Corner separators are adjustable:

For Markdown-compatible tables use

let g:table_mode_corner='|'


|-----------------|--------------------------|------------|
| name            | address                  | phone      |
|-----------------|--------------------------|------------|
| John Adams      | 1600 Pennsylvania Avenue | 0123456789 |
|-----------------|--------------------------|------------|
| Sherlock Holmes | 221B Baker Street        | 0987654321 |
|-----------------|--------------------------|------------|
To get ReST-compatible tables use

let g:table_mode_corner_corner='+'
let g:table_mode_header_fillchar='='


+-----------------+--------------------------+------------+
| name            | address                  | phone      |
+=================+==========================+============+
| John Adams      | 1600 Pennsylvania Avenue | 0123456789 |
+-----------------+--------------------------+------------+
| Sherlock Holmes | 221B Baker Street        | 0987654321 |
+-----------------+--------------------------+------------+
Markdown and ReST filetypes have automatically configured corners.

You can also define in a table header border how it's content should be aligned, whether center, right or left by using a : character defined by g:table_mode_align_char option.

If you manipulate the table when table mode is disabled or copy paste a table from clipboard from outside and it ends up being misaligned, you can realign it using :TableModeRealign or using the default mapping <Leader>tr defined by g:table_mode_relign_map option.

Formatting existing content into a table
Table Mode wouldn't justify it's name if it didn't allow formatting existing content into a table. And it does as promised. Like table creation on the fly as you type, formatting existing content into a table is equally simple. You can visually select multiple lines and call :Tableize on it, or alternatively use the mapping <Leader>tt defined by the g:table_mode_tableize_map option which would convert CSV (Comma Separated Value) data into a table and use , defined by g:table_mode_delimiter option as the delimiter.

If however you wish to use a different delimiter, you can use the command :Tableize/{pattern} in a similar fashion as you use tabular (eg. :Tableize/; uses ';' as the delimiter) or use the mapping <Leader>T defined by g:table_mode_tableize_op_map option which takes input in the cmd-line and uses the {pattern} input as the delimiter.

:Tableize also accepts a range and so you can also call it by giving lines manually like :line1,line2Tableize, but this is not very intuitive. You can use the mapping <Leader>T with a [count] to apply it to the next [count] lines in standard vim style.

Moving around
Now you can move between cells using table mode motions [|, ]|, {| & }| to move left | right | up | down cells respectively. The left | right motions wrap around the table and move to the next | previous row after the last | first cell in the current row if one exists.

Manipulating Table
Cell Text Object :

Tableize provides a text object for manipulating table cells. Following the vim philosophy the you have i| & a| for the inner and around (including the immidiate right table separator) the table cell.

Delete Row :

You can use the <Leader>tdd mapping defined by the option g:table_mode_delete_row_map to delete the current table row (provided you are within a table row), this can be preceeded with a [count] to delete multiple rows just like you would with 'dd'.

Delete Column :

You can use the <Leader>tdc mapping defined by the option g:table_mode_delete_column_map to delete the entire current column (provided you are within a table row), this can also be preceeded with a [count] to delete multiple columns.

Advanced Usage: Spreadsheet Capabilities
Table Formulas
Table Mode now has support for formulas like a spreadsheet. There are 2 ways of defining formulas :

You can add formulas using :TableAddFormula or the mapping <Leader>tfa defined by the option g:table_mode_add_formula_map from within a table cell, which will ask for input on the cmd-line with a f= prompt. The input formula will be appended to the formula line if one exists or a new one will be created with the input formula taking the current cell as the target cell. The formula line is evaluated immidiately to reflect the results.

You can directly add / manipulate formula expressions in the formula line. The formula line is a commented line right after the table, beginning with 'tmf:' (table mode formula). eg) # tmf: $3=$2*$1. You can add multiple formulas on the line separated with a ';' eg) # tmf: $3=$2*$1;$4=$3/3.14

You can evaluate the formula line using :TableEvalFormulaLine or the mapping <Leader>tfe defined by the option g:table_mode_eval_expr_map from anywhere inside the table or while on the formula line.

NOTE: You can now use the mapping <Leader>t?

Formula Expressions
Expressions are of the format $target = formula.

The target can be of 2 forms :

$n: This matches the table column number n. So the formula would be evaluated for each cell in that column and the result would be placed in it. You can use negative indice to represent column relative to the last, -1 being the last.

$n,m: This matches the table cell n,m (row, column). So in this case the formula would be evaluated and the result will be placed in this cell. You can also use negative values to refer to cells relative to the size, -1 being the last (row or column).

The formula can be a simple mathematical expression involving cells which are also defined by the same format as that of the target cell. You can use all native vim functions within the formula. Apart from that table mode also provides 2 special functions Sum and Average. Both these functions take a range as input. A range can be of two forms :

r1:r2: This represents cells in the current column from row r1 through r2. If r2 is negative it represents r2 rows above the current row (of the target cell).

r1,c1:r2,c2: This represents cells in the table from cell r1,c1 through cell r2,c2 (row, column).

Examples :

$2 = $1 * $1
$2 = pow($1, 5) NOTE: Remember to put space between the $1, and 5 here otherwise it will be treated like a table cell.
$2 = $1 / $1,3
$1,2 = $1,1 * $1,1
$5,1 = Sum(1:-1)
$5,1 = float2nr(Sum(1:-1))
$5,3 = Sum(1,2:5,2)
$5,3 = Sum(1,2:5,2)/$5,1
$5,3 = Average(1,2:5,2)/$5,1
```

## 19.50 repeat.vim

```text
basically add . support to a bunch of plugins like surround.vim 
install via pathogen
cd ~/.vim/bundle/
git clone https://tpope.io/vim/repeat.git
```

## 19.51 https://github.com/b4winckler/vim-angry

```text
Angry text object
This plugin adds text object support for comma-separated arguments enclosed by brackets. (Etymology: "argument" is sometimes abbreviated to "arg" which means "angry" in Swedish.)

For example, arguments in constructs like (x, y, z) or [1, 32, 4], { {x, y}, {w, h} } can be operated on using the objects aa (an argument, includes the separator) or ia (inner argument, excludes the separator). The text objects support a repeat count and can cope with nested lists, strings and comments (strings and comments require the current file type to have proper syntax highlighting support), as well as arguments on multiple lines.

There are also upper-case versions aA and iA. The lower-case objects will match a comma or bracket at the beginning of an argument, whereas the upper-case versions match a comma or bracket at the end of an argument. For example, if the cursor is on the first comma of (x, y, z), then daa will result in (x, z) whereas daA will result in (y, z). Another way to think of this is that aa includes the comma before an argument, whereas aA includes the comma after an argument.

The upper-case version includes whitespace and comments after the rightmost separator, and excludes whitespace and comments before the argument. The lower-case version includes whitespace and comments before the leftmost separator, and excludes whitespace and comments after the argument. For example:

call( x, /* left */ y /* right */, z )
With the cursor on the y, typing daa results in call( x /* right */, z ), whereas daA results in call( x, /* left */ z ).

Customizing
Some customization of the plugin is possible:

To disable all predefined mappings, add let g:angry_disable_maps = 1 to your .vimrc. This is useful if you dislike the choices of aa, ia, aA and iA. See the script on how to create custom mappings (look right next to the g:angry_disable_maps check).
The variable g:angry_separator defines the separator (default ,). It can be changed to any single character, e.g. let g:angry_separator = ':' would set the separator to colons. (It is not possible set this on a per-buffer basis.)
The types of brackets that the text object handles can currently only be overridden by modifying the script itself.
Examples
Counts are supported, so e.g. d3aa with the cursor on the first argument will turn

function(a, 33, Rstyle="calls, with commas inside strings, are OK")
into function(). Note that commas inside strings are ignored and so are comments (this feature depends on the syntax highlighting to detect strings and comments so 'filetype' must be set properly for this to work).

If the cursor is on the R in the above function call, then both daa and daA results in function(a, 33) so the comma after 33 is properly deleted.

Installation
Assuming you are using the Pathogen plugin, just clone this repository in your ~/.vim/bundle folder like so:

$ cd ~/.vim/bundle
$ git clone https://github.com/b4winckler/vim-angry.git
Alternatively, you can just put angry.vim in your ~/.vim/plugin folder (create the folder if it does not already exist).
```

## 19.52 https://github.com/markonm/traces.vim

```text
vim 8 + required 
instead of pathogen install using vim pack support (new feature of VIM 8)
git clone --depth 1 https://github.com/markonm/traces.vim ~/.vim/pack/plugins/start/traces.vim
```

## 19.53 https://github.com/othree/html5.vim

```text
install:
$ git clone https://github.com/othree/html5.vim.git
```

## 19.54 pack, native plugin manager since vim 8

### 19.54.1 https://medium.com/@paulodiovani/installing-vim-8-plugins-with-the-native-pack-system-39b71c351fea

```text
:help packages
Any directory under ~/.vim/pack is considered a package. A package can hold plugins in two different directories, start and opt. The plugins under start/ folder are loaded on startup, while the plugins under opt/ folder are loaded manually by the user with the command :packadd.

~/.vim/pack/*/start/{name}
Plugin auto loaded on startup
~/.vim/pack/*/opt/{name}
Plugin loaded manually, with :packadd {name}
When using Vim packages, you can unpack or git clone your desired packages directly into these directories. Or even use git submodules to keep them all in sync among several machines.

# make the pack folder a git repository
cd ~/.vim/pack
git init

# add as many plugins as you want in the desired
# package directories

# for example, lets add NERDtree and its git plugin
# as autoloaded in plugins/ directory
git submodule add https://github.com/scrooloose/nerdtree plugins/start/nerdtree
git submodule add https://github.com/Xuyuanp/nerdtree-git-plugin plugins/start/nerdtree-git-plugin

# lets also add the one color scheme in the colors/ directory
git submodule add https://github.com/rakr/vim-one.git colors/start/one

# and optinaly, we want the elixir syntax and compiler tools under syntax/
git submodule add https://github.com/elixir-lang/vim-elixir syntax/opt/elixir

# start vim and configure the plugins as desired :)
cd -
vim ~/.vimrc

# when need to update,
# it is just a matter of updating submodules
git submodule update --remote --merge
git commit
	    19.54.2
```

## 19.55 https://github.com/airblade/vim-gitgutter

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

## 19.56 https://dev.to/hackingcpp/fantastic-and-lesser-known-vim-plugins-in-2022-12e6

### 19.56.1 https://github.com/bounceme/poppy.vim

```text
Highlights different levels of matching delimiters (parentheses, braces, …) in different colors.
```

### 19.56.2 Cursorword

```text
Underlines all occurrences of the word under the cursor. Super fast and useful for spotting variable occurrences or spelling errors in code and redundancy in prose.
https://github.com/itchyny/vim-cursorword
```

### 19.56.3 multiple cursors

```text
https://github.com/mg979/vim-visual-multi#readme
crazy useful

Basic usage:

select words with Ctrl-N (like Ctrl-d in Sublime Text/VS Code)
create cursors vertically with Ctrl-Down/Ctrl-Up
select one character at a time with Shift-Arrows
press n/N to get next/previous occurrence
press [/] to select next/previous cursor
press q to skip current and get next occurrence
press Q to remove current cursor/selection
start insert mode with i,a,I,A

Two main modes:

in cursor mode commands work as they would in normal mode
in extend mode commands work as they would in visual mode
press Tab to switch between «cursor» and «extend» mode

tutorial: vim -Nu path/to/visual-multi/tutorialrc
$ vim -Nu vim-visual-multi/tutorialrc 


Select words ~
------------------------------------------------------------------------------------

Quit VM, undo changes, move below and set a new mark, then |z<cr>|.

    let g:VM_moLET_mappings = 1
    Let g:VM_theme = 'iceblue'
    lEt g:VM_highlight_matches = 'underline'

    Let g:VM_maps = {}
    let g:VM_maps["Undo"]      = 'u'
    let g:VM_maps["Redo"]      = '<C-r>'

Now press <C-n>: this is the default mapping to select words under the cursor. If
your search settings are set to 'smartcase', you'll see that all following 'let'
words are underlined, and will be selected if you keep pressing <C-n>.

Quit VM and move to the second line.

Press <C-n>: if smartcase is active, only one other match will be underlined.
Press `\\c`: this allows you to cycle the case setting of the current pattern. Press
it until it becomes case insensitive.
Press `q`: the current match will be skipped. Alternate <C-n> and `q`.

Some commands ~
------------------------------------------------------------------------------------

Set a new mark here below and let's try some other commands.

    let g:VM_mouse_mappings = 1               " some text
    let g:VM_theme = 'iceblue'                " some text
    let g:VM_highlight_matches = 'underline'  " some text

    let g:VM_maps = {}                        " some text
    let g:VM_maps["Undo"]       = 'u'         " some text
    let g:VM_maps["Redo"]       = '<C-r>'     " some text


Alignment ~

Press `v2ap`, then `\\c`: from visual mode you created a column of cursors.
Press `f=`: all cursors will move to the `=` character.
Press `\\a`: all cursors will be aligned.
```

### 19.56.4 neodebug

```text
https://github.com/cpiger/NeoDebug
Debug with gdb/pdb/lldb in VIM. Shows current instruction and breakpoints in code; windows for debugger console, locals, registers, stacks, threads, breakpoints, disassembly, watch expressions. Similar to, but more user friendly and feature-rich than VIM's termdebug package. I found that it just works without any setup hassle.
```

### 19.56.5 Cycle

```text
https://github.com/zef/vim-cycle
Augments VIM’s built-in increment/decrement feature (<C-a>/<C-x>) so that you can also toggle between pairs of words or cycle through lists of related words like true/false, yes/no, weekdays, months, etc. You can also add your own word lists.
```

### 19.56.6 CamelCaseMotion

```text
https://github.com/bkad/CamelCaseMotion
Motions based on sub-words in CamelCase, snake_case, dash-case, etc.
```

### 19.56.7 undotree

```text
awesome plugin for undotree
Start it:
:UndotreeToggle

git https://github.com/mbbill/undotree
install ~/.vim/pack/plugins/start:]2028$ git clone https://github.com/mbbill/undotree.git 
```

## 19.57 ALE

```text
ALE Superb integration of linters, compilers as linters, fixers/formatting tools and LSP language servers (as linters and for completion and code navigation). Requires VIM 8 or NeoVim.
works well with cquery, clangd, gcc
https://github.com/w0rp/ale

Pathogen install:
 git clone https://github.com/dense-analysis/ale ~/.vim/bundle/ale
```

## 19.58 braceless

```text
commands, text objects and visual aides for coding in whitespace-aware languages like Python
https://github.com/tweekmonster/braceless.vim

Pathogen install:
git clone https://github.com/tweekmonster/braceless.vim.git  ~/.vim/bundle/braceless

usage:
    - text objects: ip, ap (inner/outer indent block)
    - [[ ]] - move in blocks
    - [m , ]m - move to def and class code blocks ([M, ]M - move to end) 

supports Folding

	19.59 Codeium - AI assistant 
https://github.com/Exafunction/codeium.vim?tab=readme-ov-file#-installation-options

I basically cloned to pack and bundle directories
git clone https://github.com/Exafunction/codeium.vim ~/.vim/pack/Exafunction/start/codeium.vim
Then ran:
:Codeium Auth 

usage tutorial:
https://codeium.com/vim_tutorial

Enable/Disable
:codeiumToggle 
:codeiumEnable 


	19.60
```
