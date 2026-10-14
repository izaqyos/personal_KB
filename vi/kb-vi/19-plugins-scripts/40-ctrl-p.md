---
type: reference
title: Ctrl-P
description: "Subsection 19.37 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.37"
---

# 19.37 Ctrl-P

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

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
