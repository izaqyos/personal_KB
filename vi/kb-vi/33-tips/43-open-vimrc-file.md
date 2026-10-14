---
type: reference
title: Open vimrc file
description: Subsection 33.44 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.44"
---

# 33.44 Open vimrc file

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Tip 626 created December 24, 2003 · complexity basic · author Anon · version 6.0
```

### 33.44.1 What is vimrc?

```text
The vimrc file contains optional runtime configuration settings to initialize Vim when it starts. On Unix based systems, the file is named .vimrc, while on Windows systems it is named _vimrc. :help vimrc

You can customize Vim by putting suitable commands in your vimrc. Here is a very simple example:

set shiftwidth=4 softtabstop=4
set incsearch ignorecase hlsearch
" Press space to clear search highlighting and any message already displayed.
nnoremap <silent> <Space> :silent noh<Bar>echo<CR>

Search for file vimrc_example.vim in your Vim files for another example. :help vimrc-intro :help vimrc_example.vim

To customize Vim for editing a specific file, or a specific type of file, you can use modelines, or auto commands, or filetype plugins. :help auto-setting :help filetype

"
```

### 33.44.2 Location of vimrc

```text
In Vim, your home directory is specified with ~ on Unix systems, and $HOME on Windows systems. The following commands are useful to see what directories your Vim is using:

:version
:echo expand('~')
:echo $HOME
:echo $VIM
:echo $VIMRUNTIME

Note the 'system vimrc file' and 'user vimrc file' paths displayed by the :version command. The system vimrc file can be created by an administrator to customize Vim for all users. In addition, each user can have their own user vimrc.

The output from :version includes the paths of the system and user gvimrc files. If these files exist, they are used to configure Vim when the GUI version (gvim) runs (after settings from vimrc are applied).

You don't need a gvimrc file because you can put something like the following in your vimrc:

if has('gui_running')
  set guioptions-=T  " no toolbar
  colorscheme elflord
endif

"
```

### 33.44.3 Opening vimrc

```text
If Vim finds your vimrc file during startup, Vim will set the MYVIMRC environment variable to the full path of the vimrc file. Similarly, if your gvimrc file is found, the MYGVIMRC variable is set. Therefore, you can easily edit these files from within Vim:

:e $MYVIMRC
:e $MYGVIMRC

Using file name completion, you could type :e $M then press Tab until you see the desired variable. If you only want to see the path, type :echo $M then press Tab to see the variable, and press Enter.

In gvim, the Edit menu includes "Startup Settings" which will use $MYVIMRC to edit your vimrc file. If $MYVIMRC does not exist, "Startup Settings" will create a new file using the "user vimrc file" path shown by the :version command.
```

### 33.44.4 Sourcing vimrc

```text
After you have saved changes to your vimrc file, you can see the results by exiting from Vim, then starting Vim again.

If you are making frequent changes, you might want to "source" (execute) the changed vimrc file without exiting:

:so $MYVIMRC
" Alternative that can be used if vimrc is the current file:
:so %

Warning You may need to plan your vimrc so re-sourcing does not cause problems. If you define commands, functions, or autocmds, you must make them remove or override the previous version when sourced, or you will get errors (for commands and functions) or duplicates (for autocmds). Here are some examples that will work correctly when re-sourced:

" Use bang (!) to redefine a command or function, if already defined.
command! Mycommand echo "Hello!"
function! Myfunc()
  echo "Hello!"
endfunction

" Put all autocmds in some augroup and use au! to clear the group.
augroup vimrc_autocmds
  au!
  autocmd BufRead * echo "File read!"
augroup END

"
```

### 33.44.5 Recovering from errors

```text
Some errors in your vimrc may prevent Vim from starting successfully. A reliable way to handle that would be to rename your vimrc file, then edit the renamed file, then give it the correct name. Alternatively, you could start Vim with a command like this (or use "gvim" if that is how you run Vim):

vim -N -u NONE -U NONE

The -N starts in "not compatible" mode (that is, with extra Vim features). The NONE argument (must be uppercase) skips initializations and does not read any vimrc file (-u), and does not read any gvimrc file (-U).

You could now use the :version command to show the vimrc path, then enter a command to edit that file. 
```
