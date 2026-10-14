---
type: reference
title: Pathogen
description: "Subsection 19.34 of PLUGINS, Scripts."
tags: [kb-vi, plugins, scripts, extensions, colorschemes, list, active]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.34"
---

# 19.34 Pathogen

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

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
