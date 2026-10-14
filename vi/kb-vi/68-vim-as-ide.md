---
type: reference
title: VIM as IDE
description: "Legacy vim KB section: VIM as IDE (C++, CLANG, eclim)"
tags: [ide, vim, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: vim-packages, resource: "https://vimhelp.org/repeat.txt.html#packages", title: "Vim help: packages (repeat.txt)" }
  - { id: vim-helptags, resource: "https://vimhelp.org/helphelp.txt.html#%3Ahelptags", title: "Vim help: :helptags (helphelp.txt)" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#67"
---

# VIM as IDE

[↑ KB_vi](/vi/kb-vi/README.md)

## 67.1 C++

### 67.1.1 CLANG

```text
			67.1.1.1 clang complete : Use of Clang for completing C, C++, Objective-C and Objective-C++  
http://www.vim.org/scripts/script.php?script_id=3302

clang is required for many C++ related plugins like youCompleteMe

To install CLANG on MAC:
Apple's development tools are all built on LLVM, and clang is part of Xcode (Apple's development tools). The easiest way to install them is to simply install the Xcode command line tools:

Open a Terminal window.
Type xcode-select --install
A dialog will appear telling you that it requires the command line developer tools, and asks if you would like to install them. Click on the "Install" button.
When the installation is complete, it will have installed LLVM, the standard compilers (including clang), git, svn, and all the usually C/C++/Objective-C/Swift command-line development tools. You can test with:

clang --version

				67.1.1.1.1 This plugin use clang for accurately completing C, C++, Objective-C and Objective-C++ code. 

You don't need any ctags for it to work! Only clang is needed. Clang version 2.8 or higher is recommended for c++ completion. After a . , -> and :: it is automatically trying to complete the code. If you want to "force" the completion, use <C-X><C-U> which is the mapping for user defined completion. Because clang is parsing your source file, it can detect errors inside your code, and highlight them! Plus it can open the quickfix window automatically. 

Since version 1.4, snippets can be used to complete function arguments. It is triggered after a completion, and you can go to the next argument with the <Tab> key in normal mode. 

If you've got special flags for a project (especially -I and -D ones), clang may be unable to complete your code. To overcome this limitation put the flags inside the file .clang_complete at the root of your project. 

Latest version will always be on github: http://github.com/Rip-Rip/clang_complete 

Do not hesitate to report bugs or ask for features. 

For more information about the configuration, look at the help (:h clang_complete)
 
install details
If you have installed vimscript #1520, please remove it, as it is confliting with this one. 
To install: vim clang_complete.vmb -c 'so %' -c 'q'
```

#### 67.1.1.1.2 Completion kinds *clang_complete-compl_kinds*

```text
Because libclang provides a lot of information about completion, there are
some additional kinds of completion along with standard ones (see
|complete-items| for details):
 '+' - constructor
 '~' - destructor
 'e' - enumerator constant
 'a' - parameter ('a' from "argument") of a function, method or template
 'u' - unknown or buildin type (int, float, ...)
 'n' - namespace or its alias
 'p' - template ('p' from "pattern")
```

### 67.1.2 eclim

```text
		67.1.3
```

## 67.2 Java

## 67.3 Python

### 67.3.1 http://sontek.net/blog/detail/turning-vim-into-a-modern-python-ide

> Updated 2026-10 to current practice.[^vim-packages] The 2011 article relies on the Pathogen plugin to load plugins from `~/.vim/bundle`; since Vim 8.0 Vim loads plugins natively from `pack/*/start`, so Pathogen is no longer needed. The setup steps were rewritten below; the rest of the article is kept as written (several of its plugins are no longer maintained).

```text
Turning Vim into a modern Python IDE

Posted by sontek on 2011-05-07 04:37:55

Contents

Intro
Basic Editing and Debugging
Code Folding
Window Splits
Snippets
Task lists
Revision History
Syntax Highlighting and Validation
Pep8
Tab Completion and Documentation
Code Navigation
Buffers
Fuzzy Text File Search
File Browser
Refactoring and Go to definition
Searching
Integration with Git
Test Integration
django nose
py.test
Virtualenv
Django
Random Tips
TL;DR:

$ git clone https://github.com/sontek/dotfiles.git
$ cd dotfiles
$ ./install.sh vim
Download PDF Version

Intro

Back in 2008, I wrote the article Python with a modular IDE (Vim). Years later, I have people e-mailing me and commenting daily asking for more information, even though most of the information in it is outdated. Here is the modern way to work with Python and Vim to achieve the perfect environment.

```

Keep the Vim configuration in git so it is reproducible across machines, and use Vim's built-in package support (Vim 8.0+) instead of Pathogen. Everything under `~/.vim/pack/<name>/start/` is loaded automatically at startup; anything under `~/.vim/pack/<name>/opt/` is loaded only on `:packadd <plugin>`.[^vim-packages]

```bash
mkdir -p ~/.vim/pack/plugins/{start,opt}
cd ~/.vim
git init

# Add each plugin as a submodule under pack/plugins/start (examples)
git submodule add https://github.com/tpope/vim-fugitive.git pack/plugins/start/fugitive
git submodule add https://github.com/tpope/vim-surround.git pack/plugins/start/surround
git submodule add https://github.com/preservim/nerdtree.git  pack/plugins/start/nerdtree
# ...same pattern for the other plugins from the article's list

# Fresh clone on another machine
git clone --recurse-submodules <your-dotfiles-repo> ~/.vim
# Update all plugins later
git submodule update --remote --merge
```

No `pathogen#...` calls are needed in `~/.vimrc`; just enable filetype detection as usual:

```vim
filetype plugin indent on
syntax on
```

Generate help tags for the installed plugins (re-run after adding or updating plugins):[^vim-helptags]

```vim
:helptags ALL
```

A plugin manager such as vim-plug is an alternative if you prefer declaring plugins in `~/.vimrc` over managing submodules.

```text
Now lets look at how to use each of these plugins to improve the power of vim:

Basic Editing and Debugging

Code Folding

Lets first enable code folding. This makes it a lot easier to organize your code and hide portions that you aren't interested in working on. This is quite easy for Python, since whitespace is required.

In your ~/.vimrc just add:

set foldmethod=indent
set foldlevel=99
Then you will be able to be inside a method and type 'za' to open and close a fold.

Window Splits

Sometimes code folding isn't enough; you may need to start opening up multiple windows and working on multiple files at once or different locations within the same file. To do this in vim, you can use these shortcuts:

Vertical Split : Ctrl+w + v
Horizontal Split: Ctrl+w + s
Close current windows: Ctrl+w + q
I also like to bind Ctrl+<movement> keys to move around the windows, instead of using Ctrl+w + <movement>:

map <c-j> <c-w>j
map <c-k> <c-w>k
map <c-l> <c-w>l
map <c-h> <c-w>h
 http://i.imgur.com/krj0l.png
Snippets

The next tweak that really speeds up development is using snipmate. We've already included it in our bundle/ folder so its already enabled. Try opening up a python file and typing 'def<tab>'. It should stub out a method definition for you and allow you to tab through and fill out the arguments, doc string, etc.

I also like to create my own snippets folder to put in some custom snippets:

$ mkdir ~/.vim/snippets
$ vim ~/.vim/snippets/python.snippets
Put this in the file:

snippet pdb
    import pdb; pdb.set_trace()
Now you can type pdb<tab> and it'll insert your breakpoint!

Task lists

Another really useful thing is to mark some of your code as TODO or FIXME! I know we all like to think we write perfect code, but sometimes you just have to settle and leave a note for yourself to come back later. One of the plugins we included was the tasklist plugin that will allow us to search all open buffers for things to fix. Just add a mapping to open it in ~/.vimrc:

map <leader>td <Plug>TaskList
Now you can hit <leader>td to open your task list and hit 'q' to close it. You can also hit enter on the task to jump to the buffer and line that it is placed on.

Revision History

The final basic editing tweak I suggest everyone start utilizing is the Gundo plugin. It'll allow you to view diff's of every save on a file you've made and allow you to quickly revert back and forth:

http://i.imgur.com/2NrPS.png
Just bind a key in your .vimrc to toggle the Gundo window:

map <leader>g :GundoToggle<CR>
Syntax Highlighting and Validation

Simply enable syntax highlighting in your ~/.vimrc:

syntax on                           " syntax highlighing
filetype on                          " try to detect filetypes
filetype plugin indent on    " enable loading indent file for filetype
Because we enabled pyflakes when we added it as a submodule in ~/.vim/bundle, it will notify you about unused imports and invalid syntax. It will save you a lot of time saving and running just to find out you missed a colon. I like to tell it not use the quickfix window:

let g:pyflakes_use_quickfix = 0
 http://i.imgur.com/ZfjFe.png
Pep8

The final plugin that really helps validate your code is the pep8 plugin, it'll make sure your code is consistent across all projects. Add a key mapping to your ~/.vimrc and then you'll be able to jump to each of the pep8 violations in the quickfix window:

let g:pep8_map='<leader>8'
 http://i.imgur.com/VU9AB.png
Tab Completion and Documentation

Vim has many different code completion options. We are going to use the SuperTab plugin to check the context of the code you are working on and choose the best for the situation. We've already enabled the SuperTab plugin in the bundle/ folder, so we just have to configure it to be context sensitive and to enable omni code completion in your ~/.vimrc:

au FileType python set omnifunc=pythoncomplete#Complete
let g:SuperTabDefaultCompletionType = "context"
Now we just enable the menu and pydoc preview to get the most useful information out of the code completion:

set completeopt=menuone,longest,preview
 http://i.imgur.com/g4lxP.png
We also enabled the pydoc plugin at the beginning with all the submodules; that gives us the ability to hit <leader>pw when our cursor is on a module and have a new window open with the whole documentation page for it.

Code Navigation

Buffers

The most important part about navigating code within vim, is to completely understand how to use buffers. There is no reason to use tabs. Open files with :e <filename> to place in a buffer. We already installed the minibufexpl plugin, so you will already visually see every buffer opened. You can also get a list of them doing :buffers.

You can switch between the buffers using b<number>, such as :b1 for the first buffer. You can also use its name to match, so you can type :b mod<tab> to autocomplete opening the models.py buffer. You need to make sure you are using the minibufexpl from my github since it has patches that make it much better to work with.

To close a buffer you use :bd or :bw.

Fuzzy Text File Search

To make finding and opening files within your project even easier, we are going to use the command-t plugin. It does have some parts that need to be compiled, so its not already installed by adding it as a submodule. Go to your ~/.vim/bundle/command-t folder and run 'rake make'. Yes you need ruby installed. By default, command-t is bound to <leader>t. This will use fuzzy text matching to find any file in your project.

It also supports searching only through opened buffers, instead of files using <leader>b.

http://i.imgur.com/hUcSl.png
File Browser

NERD Tree is a project file browser. I must admit I used this heavily back when I was migrating from Visual Studio and used to the Solution Explorer, but I rarely use it anymore. Command-T is usually all you'll need. It is useful when you are getting to know a new codebase for the first time though. Lets bind a shortcut key for opening it:

map <leader>n :NERDTreeToggle<CR>
 http://i.imgur.com/R4ZzQ.png
Refactoring and Go to definition

Ropevim is also a great tool that will allow you to navigate around your code. It supports automatically inserting import statements, goto definition, refactoring, and code completion. You'll really want to read up on everything it does, but the two big things I use it for is to jump to function or class definitions quickly and to rename things (including all their references).

For instance, if you are using django and you place your cursor over the class models.Model you reference and then called :RopeGotoDefintion, it would jump you straight to the django library to that class definition. We already have it installed in our bundles, so we bind it to a key to use it:

map <leader>j :RopeGotoDefinition<CR>
map <leader>r :RopeRename<CR>
Searching

The final tool that really speeds up navigating your code is the Ack plugin. Ack is similar to grep, but much better in my opinion. You can fuzzy text search for anything in your code (variable name, class, method, etc) and it'll give you a list of files and line numbers where they are defined so you can quickly cycle through them. Just bind the searching to a key:

nmap <leader>a <Esc>:Ack!
We use ! at the end of it so it doesn't open the first result automatically.

Integration with Git

We installed 2 plugins, git.vim and fugitive, that give us all the integration we need. Git.vim will provide us syntax highlighting for git configuration files; fugitive provides a great interface for interacting with git including getting diffs, status updates, committing, and moving files.

Fugitive also allows you to view what branch you are working in directly from vim. Add this to your statusline in ~/.vimrc:

%{fugitive#statusline()}
The big commands you need to know:

Gblame: This allows you to view a line by line comparison of who the last person to touch that line of code is.
Gwrite: This will stage your file for commit, basically doing git add <filename>
Gread: This will basically run a git checkout <filename>
Gcommit: This will just run git commit. Since its in a vim buffer, you can use keyword completion (Ctrl-N), like test_all<Ctrl-N> to find the method name in your buffer and complete it for the commit message. You can also use + and - on the filenames in the message to stage/unstage them for the commit.
http://i.imgur.com/NuRRj.png
Test Integration

django nose

Test runner integration really depends on the testing library you are using and what type of tests you are running but we included a great generic plugin called MakeGreen that executes off of vim's makeprg variable. So for instance, if you are using django with django-nose you could define a shortcut key in your ~/.vimrc like this:

map <leader>dt :set makeprg=python\ manage.py\ test\|:call MakeGreen()<CR>
This will just give you a green bar at the bottom of vim if your test passed or a red bar with the message of the failed test if it doesn't. Very simple.

py.test

I also included the py.test vim plugin for those who prefer it. This plugin has a lot more functionality including executing individual tests by class, file, or method. You can also cycle through the individual assertion errors. I have the following bindings:

" Execute the tests
nmap <silent><Leader>tf <Esc>:Pytest file<CR>
nmap <silent><Leader>tc <Esc>:Pytest class<CR>
nmap <silent><Leader>tm <Esc>:Pytest method<CR>
" cycle through test errors
nmap <silent><Leader>tn <Esc>:Pytest next<CR>
nmap <silent><Leader>tp <Esc>:Pytest previous<CR>
nmap <silent><Leader>te <Esc>:Pytest error<CR>
 http://i.imgur.com/RAE7v.png
Virtualenv

Vim doesn't realize that you are in a virtualenv so it wont give you code completion for libraries only installed there. Add the following script to your ~/.vimrc to fix it:

" Add the virtualenv's site-packages to vim path
py << EOF
import os.path
import sys
import vim
if 'VIRTUAL_ENV' in os.environ:
    project_base_dir = os.environ['VIRTUAL_ENV']
    sys.path.insert(0, project_base_dir)
    activate_this = os.path.join(project_base_dir, 'bin/activate_this.py')
    execfile(activate_this, dict(__file__=activate_this))
EOF
Django

The only true django tweak I make is before I open vim I'll export the DJANGO_SETTINGS_MODULE environment so that I get code completion for django modules as well:

export DJANGO_SETTINGS_MODULE=project.settings
Random Tips

If you want to find a new color scheme just go to http://code.google.com/p/vimcolorschemetest/ to preview a large selection.

© John Anderson <sontek@gmail.com> 2011

		67.3.2
	67.4
```

[^vim-packages]: Vim help: packages (repeat.txt)
[^vim-helptags]: Vim help: :helptags (helphelp.txt)
