---
type: reference
title: "pack, native plugin manager since vim 8"
description: "Vim plugin notes: pack, native plugin manager since vim 8"
tags: [vim, vimscript, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#19.54"
---

# 19.54 pack, native plugin manager since vim 8

[↑ PLUGINS, Scripts](/vi/kb-vi/19-plugins-scripts/README.md)

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
