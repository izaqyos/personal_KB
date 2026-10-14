---
type: reference
title: Platform specific tips
description: "Legacy vim KB section: Platform specific tips (Windows, ctrl-v now working, ctrl-a not working)"
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#1"
---

# Platform specific tips

[↑ KB_vi](/vi/kb-vi/README.md)

## 1.1 Windows

### 1.1.1 ctrl-v now working

```text
        use ctrl-q instead
```

### 1.1.2 ctrl-a not working

```text
You can make CtrlA to increment in windows by opening up the 'mswin.vim' file in your vim directory and finding the section that looks like:

" CTRL-A is Select all
noremap <C-A> gggH<C-O>G
inoremap <C-A> <C-O>gg<C-O>gH<C-O>G
cnoremap <C-A> <C-C>gggH<C-O>G
onoremap <C-A> <C-C>gggH<C-O>G
snoremap <C-A> <C-C>gggH<C-O>G
xnoremap <C-A> <C-C>ggVG
Comment out all of these lines as follows:

" CTRL-A is Select all
"noremap <C-A> gggH<C-O>G
"inoremap <C-A> <C-O>gg<C-O>gH<C-O>G
"cnoremap <C-A> <C-C>gggH<C-O>G
"onoremap <C-A> <C-C>gggH<C-O>G
"snoremap <C-A> <C-C>gggH<C-O>G
"xnoremap <C-A> <C-C>ggVG
and the CtrlA keystroke will increment.

This is a pretty nice option when your keyboard doesn't have a real number pad.

for instance C:\Vim\vim80\mswin.vim
        1.1.3
```

## 1.2 Linux

## 1.3 Mac

### 1.3.1 SAP MBP 2018

#### 1.3.1.1 install mvim

```text
install xcode. open and accept license

sudo xcode-select -s /Applications/Xcode.app/Contents/Developer

brew install --HEAD macvim-dev/macvim/macvim
```

#### 1.3.1.2 enable gui vim

```text
https://stackoverflow.com/questions/25978668/vim-mac-os-x-install-with-gui-support

A:
Building Vim with GUI on macOS using Homebrew:

brew edit vim.
Add a new line with option for GUI:

option "enable-gui", "Enable GUI mode"
Change from no to yes in the following line:

opts << "--enable-gui=no"
Install or re-install vim:

brew reinstall vim --enable-gui
Troubleshooting:

If you've errors related to Python 3, see: vim's GH-2754.
Checkout new Homebrew PR at GH-25785 with above patch.

ex:
    option "enable-gui", "Enable GUI mode"
    # We specify HOMEBREW_PREFIX as the prefix to make vim look in the
    # the right place (HOMEBREW_PREFIX/share/vim/{vimrc,vimfiles}) for
    # system vimscript files. We specify the normal installation prefix
    # when calling "make install".
    # Homebrew will use the first suitable Perl & Ruby in your PATH if you
    # build from source. Please don't attempt to hardcode either.
    system "./configure", "--prefix=#{HOMEBREW_PREFIX}",
                          "--mandir=#{man}",
                          "--enable-multibyte",
                          "--with-tlib=ncurses",
                          "--with-compiledby=Homebrew",
                          "--enable-cscope",
                          "--enable-terminal",
                          "--enable-perlinterp",
                          "--enable-rubyinterp",
                          "--enable-python3interp",
                          "--enable-gui=yes",
                          "--without-x",
                          "--enable-luainterp",
                          "--with-lua-prefix=#{Formula["lua"].opt_prefix}"

            1.3.1.3
```

### 1.3.2 common mac VIM issues

#### 1.3.2.1 ugly colors in terminal

```text
https://vi.stackexchange.com/questions/19021/colorscheme-not-display-correctly-for-vim-on-mac-terminal
t is very common for a fancy colorscheme (such as solarized, base16-*, you name it) to require palette changes in a terminal. Without it you will face ugly colors.

I generally avoid such colorschemes in terminals and use them only in GUI vim.

To solve it -- goto the place you have obtained colorscheme, find description on how to properly use it. Usually it is smth about changing first 16 terminal colors. Solarized example: https://github.com/altercation/solarized . There you can find how to redefine your colors for different stuff including osx terminal.

PS

There are also colorshemes that are not made with terminals in mind -- they define only gui colors.
Look for colorschemes that are compatible with the terminal and the mac OS terminal colors. Here is a list of them (search for the word "solarized"): https://github.com/rafi/awesome-vim-colorschemes

install to pathogen:
cd ~/.vim/bundle/ && git clone https://github.com/rafi/awesome-vim-colorschemes.git 
Scheme	Description	Terminal	GUI
256noir	Dark minimal colors, to avoid distraction	✓	✓
abstract	Dark theme based on Abstract app	✓	✓
afterglow	Adaptation from Sublime Text	✓	✓
alduin	Dark rustic colors	✓	✓
anderson	Dark vim colorscheme based on colors from Wes Anderson films	✓	✓
angr	Pleasant, mild, dark theme	✓	✓
ayu-vim	Simple, bright and elegant theme		✓
Apprentice	Dark, low-contrast colorscheme	✓	✓
Archery	Vim colorscheme inspired by Arch Linux colors	✓	✓
Atom	Designed to be very readable in both light and dark environments		✓
carbonized	Inspired by the Carbon keycap set	✓ (16)	✓
challenger-deep	FlatColor colorscheme	✓	✓
deep-space	Intergalactic friendly color scheme based off Hybrid	✓	✓
deus	For the late night coder	✓	✓
dogrun	Dark purple	✓	✓
flattened	Solarized, without the bullshit	✓ (16)	✓
focuspoint	Maintain color coordination and important keyword focus		✓
fogbell	Minimal grey monotone with 3 variants	✓	✓
github	Based on Github's syntax highlighting	✓	✓
gotham	Very dark vim colorscheme	✓	✓
gruvbox	Retro groove color scheme	✓	✓
happy hacking	Fairly small set of colors instead of throwing rainbows at your face	✓	✓
Iceberg	Dark blue color scheme	✓	✓
papercolor	Light and Dark color schemes inspired by Google's Material Design	✓	✓
parsec	Color scheme for people tired of solarized	✓ (16)	✓
scheakur	A light/dark colorscheme	✓	✓
hybrid	A dark colour scheme for Vim and gVim	✓	✓
hybrid-material	Material color scheme based on w0ng/vim-hybrid	✓	✓
jellybeans	Colorful, dark color scheme	✓	✓
lightning	Light vim colorscheme based on Apprentice	✓	✓
lucid	Vivid highlights and friendly, clear colors		✓
lucius	Lucius color scheme	✓	✓
materialbox	Light and dark material palette inspired based on Gruvbox		✓
meta5	Dark colorscheme, inspired by Tron	✓	✓
minimalist	Darker version of material theme inspired by Sublime Text	✓	✓
molokai	Molokai color scheme	✓	✓
molokayo	Very tweaked molokai based theme	✓	✓
mountaineer	A dark and adventurous theme	✓	✓
nord	An arctic, north-bluish clean and elegant theme	✓ (16)	✓
oceanicnext	Oceanic Next theme	✓	✓
oceanic-material	Material dark colorscheme	✓	✓
one	Adaptation of one-light and one-dark	✓	✓
onedark	Inspired by Atom's One Dark syntax theme	✓	✓
onehalf	Clean, vibrant and pleasing color scheme	✓	✓
orbital	Dark blue base16 theme	✓	✓
paramount	Minimal colorscheme that only puts emphasis on the paramount	✓	✓
pink-moon	Dark pastel theme	✓	✓
purify	Clean & vibrant color schemes for Vim, Terminals...	✓	✓
pyte	Clean, light (nearly white) theme		✓
rakr	Flat colorscheme light and dark variant	✓	✓
rdark-terminal2	Modified rdark-terminal to enhance visibility	✓	
seoul256	Low-contrast color scheme based on Seoul Colors	✓	✓
sierra	Dark vintage colors	✓	✓
solarized8	Optimized Solarized colorschemes	✓ (16)	✓
sonokai	Vivid and high contrast based on Monokai Pro	✓	✓
space-vim-dark	Dark magenta colors	✓	✓
spacecamp	Colors for the final frontier	✓	✓
sunbather	Minimal pink colorscheme	✓	✓
tender	24bit colorscheme for Vim	✓	✓
termschool	Based on the "codeschool" theme, with lots of tweaks	✓	✓
twilight256	Imitates the Twilight theme for TextMate	✓	✓
two-firewatch	A blend between duotone light and firewatch (for atom)	✓	✓
wombat256	Wombat for 256 color xterms	✓	✓

            1.3.2.2

        1.3.3
    1.4
```
