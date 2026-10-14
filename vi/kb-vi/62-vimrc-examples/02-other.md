---
type: reference
title: Other
description: Subsection 61.2 of vimrc examples.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#61.2"
---

# 61.2 Other

[↑ vimrc examples](/vi/kb-vi/62-vimrc-examples/README.md)

### 61.2.1 "The ultimate vimrc"

```text
http://amix.dk/vim/vimrc.html

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Maintainer: amix the lucky stiff
"             http://amix.dk - amix@amix.dk
"
" Version: 3.3 - 21/01/10 01:05:46
"
" Blog_post: 
"       http://amix.dk/blog/post/19486#The-ultimate-vim-configuration-vimrc
" Syntax_highlighted:
"       http://amix.dk/vim/vimrc.html
" Raw_version: 
"       http://amix.dk/vim/vimrc.txt
"
" How_to_Install:
"    $ mkdir ~/.vim_runtime
"    $ svn co svn://orangoo.com/vim ~/.vim_runtime
"    $ cat ~/.vim_runtime/install.sh
"    $ sh ~/.vim_runtime/install.sh <system>
"      <sytem> can be `mac`, `linux` or `windows`
"
" How_to_Upgrade:
"    $ svn update ~/.vim_runtime
"
" Sections:
"    -> General
"    -> VIM user interface
"    -> Colors and Fonts
"    -> Files and backups
"    -> Text, tab and indent related
"    -> Visual mode related
"    -> Command mode related
"    -> Moving around, tabs and buffers
"    -> Statusline
"    -> Parenthesis/bracket expanding
"    -> General Abbrevs
"    -> Editing mappings
"
"    -> Cope
"    -> Minibuffer plugin
"    -> Omni complete functions
"    -> Python section
"    -> JavaScript section
"
" Plugins_Included:
"     > minibufexpl.vim - http://www.vim.org/scripts/script.php?script_id=159
"       Makes it easy to get an overview of buffers:
"           info -> :e ~/.vim_runtime/plugin/minibufexpl.vim
"
"     > bufexplorer - http://www.vim.org/scripts/script.php?script_id=42
"       Makes it easy to switch between buffers:
"           info -> :help bufExplorer
"
"     > yankring.vim - http://www.vim.org/scripts/script.php?script_id=1234
"       Emacs's killring, useful when using the clipboard:
"           info -> :help yankring
"
"     > surround.vim - http://www.vim.org/scripts/script.php?script_id=1697
"       Makes it easy to work with surrounding text:
"           info -> :help surround
"
"     > snipMate.vim - http://www.vim.org/scripts/script.php?script_id=2540
"       Snippets for many languages (similar to TextMate's):
"           info -> :help snipMate
"
"     > fuzzyfinder - http://www.vim.org/scripts/script.php?script_id=1984
"       Find files fast (similar to TextMate's feature):
"           info -> :help fuzzyfinder@en
"
"  Revisions:
"     > 3.3: Added syntax highlighting for Mako mako.vim
"     > 3.2: Turned on python_highlight_all for better syntax
"            highlighting for Python
"     > 3.1: Added revisions ;) and bufexplorer.vim
"
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => General
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Sets how many lines of history VIM has to remember
set history=300

" Enable filetype plugin
filetype plugin on
filetype indent on

" Set to auto read when a file is changed from the outside
set autoread

" With a map leader it's possible to do extra key combinations
" like <leader>w saves the current file
let mapleader = ","
let g:mapleader = ","

" Fast saving
nmap <leader>w :w!<cr>

" Fast editing of the .vimrc
map <leader>e :e! ~/.vim_runtime/vimrc<cr>

" When vimrc is edited, reload it
autocmd! bufwritepost vimrc source ~/.vim_runtime/vimrc


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => VIM user interface
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Set 7 lines to the curors - when moving vertical..
set so=7

set wildmenu "Turn on WiLd menu

set ruler "Always show current position

set cmdheight=2 "The commandbar height

set hid "Change buffer - without saving

" Set backspace config
set backspace=eol,start,indent
set whichwrap+=<,>,h,l

set ignorecase "Ignore case when searching

set hlsearch "Highlight search things

set incsearch "Make search act like search in modern browsers

set magic "Set magic on, for regular expressions

set showmatch "Show matching bracets when text indicator is over them
set mat=2 "How many tenths of a second to blink

" No sound on errors
set noerrorbells
set novisualbell
set t_vb=


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Colors and Fonts
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
syntax enable "Enable syntax hl

" Set font according to system
if MySys() == "mac"
  set gfn=Bitstream\ Vera\ Sans\ Mono:h13
  set shell=/bin/bash
elseif MySys() == "windows"
  set gfn=Bitstream\ Vera\ Sans\ Mono:h10
elseif MySys() == "linux"
  set gfn=Monospace\ 10
  set shell=/bin/bash
endif

if has("gui_running")
  set guioptions-=T
  set background=dark
  set t_Co=256
  set background=dark
  colorscheme peaksea

  set nu
else
  colorscheme zellner
  set background=dark
  
  set nonu
endif

set encoding=utf8
try
    lang en_US
catch
endtry

set ffs=unix,dos,mac "Default file types


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Files and backups
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Turn backup off, since most stuff is in SVN, git anyway...
set nobackup
set nowb
set noswapfile


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Text, tab and indent related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set expandtab
set shiftwidth=4
set tabstop=4
set smarttab

set lbr
set tw=500

set ai "Auto indent
set si "Smart indet
set wrap "Wrap lines

map <leader>t2 :setlocal shiftwidth=2<cr>
map <leader>t4 :setlocal shiftwidth=4<cr>
map <leader>t8 :setlocal shiftwidth=4<cr>


""""""""""""""""""""""""""""""
" => Visual mode related
""""""""""""""""""""""""""""""
" Really useful!
"  In visual mode when you press * or # to search for the current selection
vnoremap <silent> * :call VisualSearch('f')<CR>
vnoremap <silent> # :call VisualSearch('b')<CR>

" When you press gv you vimgrep after the selected text
vnoremap <silent> gv :call VisualSearch('gv')<CR>
map <leader>g :vimgrep // **/*.<left><left><left><left><left><left><left>


function! CmdLine(str)
    exe "menu Foo.Bar :" . a:str
    emenu Foo.Bar
    unmenu Foo
endfunction 

" From an idea by Michael Naumann
function! VisualSearch(direction) range
    let l:saved_reg = @"
    execute "normal! vgvy"

    let l:pattern = escape(@", '\\/.*$^~[]')
    let l:pattern = substitute(l:pattern, "\n$", "", "")

    if a:direction == 'b'
        execute "normal ?" . l:pattern . "^M"
    elseif a:direction == 'gv'
        call CmdLine("vimgrep " . '/'. l:pattern . '/' . ' **/*.')
    elseif a:direction == 'f'
        execute "normal /" . l:pattern . "^M"
    endif

    let @/ = l:pattern
    let @" = l:saved_reg
endfunction



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Command mode related
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Smart mappings on the command line
cno $h e ~/
cno $d e ~/Desktop/
cno $j e ./
cno $c e <C-\>eCurrentFileDir("e")<cr>

" $q is super useful when browsing on the command line
cno $q <C-\>eDeleteTillSlash()<cr>

" Bash like keys for the command line
cnoremap <C-A>      <Home>
cnoremap <C-E>      <End>
cnoremap <C-K>      <C-U>

cnoremap <C-P> <Up>
cnoremap <C-N> <Down>

" Useful on some European keyboards
map ½ $
imap ½ $
vmap ½ $
cmap ½ $


func! Cwd()
  let cwd = getcwd()
  return "e " . cwd
endfunc

func! DeleteTillSlash()
  let g:cmd = getcmdline()
  if MySys() == "linux" || MySys() == "mac"
    let g:cmd_edited = substitute(g:cmd, "\\(.*\[/\]\\).*", "\\1", "")
  else
    let g:cmd_edited = substitute(g:cmd, "\\(.*\[\\\\]\\).*", "\\1", "")
  endif
  if g:cmd == g:cmd_edited
    if MySys() == "linux" || MySys() == "mac"
      let g:cmd_edited = substitute(g:cmd, "\\(.*\[/\]\\).*/", "\\1", "")
    else
      let g:cmd_edited = substitute(g:cmd, "\\(.*\[\\\\\]\\).*\[\\\\\]", "\\1", "")
    endif
  endif  
  return g:cmd_edited
endfunc

func! CurrentFileDir(cmd)
  return a:cmd . " " . expand("%:p:h") . "/"
endfunc


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Moving around, tabs and buffers
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Map space to / (search) and c-space to ? (backgwards search)
map <space> /
map <c-space> ?
map <silent> <leader><cr> :noh<cr>

" Smart way to move btw. windows
map <C-j> <C-W>j
map <C-k> <C-W>k
map <C-h> <C-W>h
map <C-l> <C-W>l

" Close the current buffer
map <leader>bd :Bclose<cr>

" Close all the buffers
map <leader>ba :1,300 bd!<cr>

" Use the arrows to something usefull
map <right> :bn<cr>
map <left> :bp<cr>

" Tab configuration
map <leader>tn :tabnew %<cr>
map <leader>te :tabedit
map <leader>tc :tabclose<cr>
map <leader>tm :tabmove

" When pressing <leader>cd switch to the directory of the open buffer
map <leader>cd :cd %:p:h<cr>


command! Bclose call <SID>BufcloseCloseIt()
function! <SID>BufcloseCloseIt()
   let l:currentBufNum = bufnr("%")
   let l:alternateBufNum = bufnr("#")

   if buflisted(l:alternateBufNum)
     buffer #
   else
     bnext
   endif

   if bufnr("%") == l:currentBufNum
     new
   endif

   if buflisted(l:currentBufNum)
     execute("bdelete! ".l:currentBufNum)
   endif
endfunction

" Specify the behavior when switching between buffers
try
  set switchbuf=usetab
  set stal=2
catch
endtry


""""""""""""""""""""""""""""""
" => Statusline
""""""""""""""""""""""""""""""
" Always hide the statusline
set laststatus=2

" Format the statusline
set statusline=\ %F%m%r%h\ %w\ \ CWD:\ %r%{CurDir()}%h\ \ \ Line:\ %l/%L:%c


function! CurDir()
    let curdir = substitute(getcwd(), '/Users/amir/', "~/", "g")
    return curdir
endfunction


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Parenthesis/bracket expanding
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
vnoremap $1 <esc>`>a)<esc>`<i(<esc>
vnoremap $2 <esc>`>a]<esc>`<i[<esc>
vnoremap $3 <esc>`>a}<esc>`<i{<esc>
vnoremap $$ <esc>`>a"<esc>`<i"<esc>
vnoremap $q <esc>`>a'<esc>`<i'<esc>
vnoremap $e <esc>`>a"<esc>`<i"<esc>

" Map auto complete of (, ", ', [
inoremap $1 ()<esc>i
inoremap $2 []<esc>i
inoremap $3 {}<esc>i
inoremap $4 {<esc>o}<esc>O
inoremap $q ''<esc>i
inoremap $e ""<esc>i


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => General Abbrevs
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
iab xdate <c-r>=strftime("%d/%m/%y %H:%M:%S")<cr>


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Editing mappings
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Remap VIM 0
map 0 ^

"Move a line of text using ALT+[jk] or Comamnd+[jk] on mac
nmap <M-j> mz:m+<cr>`z
nmap <M-k> mz:m-2<cr>`z
vmap <M-j> :m'>+<cr>`<my`>mzgv`yo`z
vmap <M-k> :m'<-2<cr>`>my`<mzgv`yo`z

if MySys() == "mac"
  nmap <D-j> <M-j>
  nmap <D-k> <M-k>
  vmap <D-j> <M-j>
  vmap <D-k> <M-k>
endif

"Delete trailing white space, useful for Python ;)
func! DeleteTrailingWS()
  exe "normal mz"
  %s/\s\+$//ge
  exe "normal `z"
endfunc
autocmd BufWrite *.py :call DeleteTrailingWS()


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Cope
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Do :help cope if you are unsure what cope is. It's super useful!
map <leader>cc :botright cope<cr>
map <leader>n :cn<cr>
map <leader>p :cp<cr>


""""""""""""""""""""""""""""""
" => bufExplorer plugin
""""""""""""""""""""""""""""""
let g:bufExplorerDefaultHelp=0
let g:bufExplorerShowRelativePath=1


""""""""""""""""""""""""""""""
" => Minibuffer plugin
""""""""""""""""""""""""""""""
let g:miniBufExplModSelTarget = 1
let g:miniBufExplorerMoreThanOne = 2
let g:miniBufExplModSelTarget = 0
let g:miniBufExplUseSingleClick = 1
let g:miniBufExplMapWindowNavVim = 1
let g:miniBufExplVSplit = 25
let g:miniBufExplSplitBelow=1

let g:bufExplorerSortBy = "name"

autocmd BufRead,BufNew :call UMiniBufExplorer

map <leader>u :TMiniBufExplorer<cr>:TMiniBufExplorer<cr>


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Omni complete functions
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
autocmd FileType css set omnifunc=csscomplete#CompleteCSS


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Spell checking
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Pressing ,ss will toggle and untoggle spell checking
map <leader>ss :setlocal spell!<cr>

"Shortcuts using <leader>
map <leader>sn ]s
map <leader>sp [s
map <leader>sa zg
map <leader>s? z=


""""""""""""""""""""""""""""""
" => Python section
""""""""""""""""""""""""""""""
au FileType python set nocindent
let python_highlight_all = 1
au FileType python syn keyword pythonDecorator True None False self

au BufNewFile,BufRead *.jinja set syntax=htmljinja
au BufNewFile,BufRead *.mako set ft=mako

au FileType python inoremap <buffer> $r return
au FileType python inoremap <buffer> $i import
au FileType python inoremap <buffer> $p print
au FileType python inoremap <buffer> $f #--- PH ----------------------------------------------<esc>FP2xi
au FileType python map <buffer> <leader>1 /class
au FileType python map <buffer> <leader>2 /def
au FileType python map <buffer> <leader>C ?class
au FileType python map <buffer> <leader>D ?def


""""""""""""""""""""""""""""""
" => JavaScript section
"""""""""""""""""""""""""""""""
au FileType javascript call JavaScriptFold()
au FileType javascript setl fen
au FileType javascript setl nocindent

au FileType javascript imap <c-t> AJS.log();<esc>hi
au FileType javascript imap <c-a> alert();<esc>hi

au FileType javascript inoremap <buffer> $r return
au FileType javascript inoremap <buffer> $f //--- PH ----------------------------------------------<esc>FP2xi

function! JavaScriptFold() 
    setl foldmethod=syntax
    setl foldlevelstart=1
    syn region foldBraces start=/{/ end=/}/ transparent fold keepend extend

    function! FoldText()
    return substitute(getline(v:foldstart), '{.*', '{...}', '')
    endfunction
    setl foldtext=FoldText()
endfunction


""""""""""""""""""""""""""""""
" => Fuzzy finder
""""""""""""""""""""""""""""""
try
    call fuf#defineLaunchCommand('FufCWD', 'file', 'fnamemodify(getcwd(), ''%:p:h'')')
    map <leader>t :FufCWD **/<CR>
catch
endtry


""""""""""""""""""""""""""""""
" => Vim grep
""""""""""""""""""""""""""""""
let Grep_Skip_Dirs = 'RCS CVS SCCS .svn generated'
set grepprg=/bin/grep\ -nH


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => MISC
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Remove the Windows ^M - when the encodings gets messed up
noremap <Leader>m mmHmt:%s/<C-V><cr>//ge<cr>'tzt'm

"Quickly open a buffer for scripbble
map <leader>q :e ~/buffer<cr>
```

### 61.2.2 Tony Mechelnyk's

```text
OK, so here are my vimrc and colorscheme, over which I worked since the times of Vim 6.1 (but of course extensively reworked for 7):
http://users.skynet.be/antoine.mechelynck/other/.vimrc
http://users.skynet.be/antoine.mechelynck/other/almost-default.vim
They work together with the CSApprox plugin (which I added relatively recently), and I use matchit as explained in the Vim help and wiki.

I may have published them already, but of course I make small changes now and then: I don't think I'll ever regard them as "never to be touched again". These are today's versions, which I uploaded anew a few minutes ago. Their sizes (including comments and "unix-style" ends of lines) are: vimrc 18711 bytes, "almost-default" colorscheme 5719.

I'm not saying that my vimrc, or even my vimrc and colorscheme, are "the ultimate" or even "ultimative", whatever that might be, because I deny that there may exist a single "best vimrc" for everyone -- if there were one, why not compile it into Vim and be done with it? Rather, I agree with Bram's decision of making his editor extremely customizable by means of scripts in what is actually a programming language, and one which is easy to understand for whoever is familiar with the editor's commands. This way, different users may customize Vim in different ways, and obtain each what is best for him or her, without being constrained by a single choice of settings, as in Notepad, where "one size fits all", maybe, but fits all equally badly. These scripts suit me, they may or may not suit each of you, and they will probably not suit you all perfectly.
```

#### 61.2.2.1 http://users.skynet.be/antoine.mechelynck/other/.vimrc

```text
" use 'nocompatible' mode even if sourced with -u
set nocompatible

" this script is in Latin1 even when 'encoding' is UTF-8
scriptencoding latin1

" remember where I keep my sources:
" this means the parent of src/ runtime/ etc.
if 1 | let $VIMSRC = '/root/.build/vim/vim' . (version / 100) . (version % 100) | endif

" I think the following two were fixed by patches 6.0.064 and 7.1b.002 (or some such)
" I leave them in in case I happened to run an unfixed Vim
" I don't think they can hurt
if &mm < 256
	set mm=20000000
endif
if &mmt < 256
	set mmt=20000000
endif

" set menus & messages to English even on a multilingual Vim run on a non-English locale
if has("multi_lang")
	if has("unix")
		language messages C
	else
		language messages en
	endif
	language time en_GB
endif

if 1	" expression evaluation compiled-in
	runtime! menu.vim
endif

" use 256 colors in Console mode if we think the terminal supports it
if &term =~? 'mlterm\|xterm'
	let &t_Co = 256
endif

" the example vimrc sets a lot of useful settings
runtime vimrc_example.vim
" ... and a few that we don't want
unmap! <C-U>
" the example vimrc doesn't set syntax highlighting on mono terminals --
" let's correct that
if has('syntax') && !(exists('syntax_on') && syntax_on)
	syntax on
endif

" set my own color scheme
if has('autocmd') && has('syntax')
	color almost-default
	let my_colors_name = "almost-default"
endif

" (try to) detect whether we have clipboard and X
if has('gui_running')
	function TestForX()
		return 1
	endfunction
elseif has('clipboard')
	function TestForX()
		let @+ = " "
		let x = @+
		let @+ = '--' . x
		redir @"
		silent reg
		redir END
		let @+ = x
	"	unlet x
		return (@" =~ '\n"+ ')
	endfunction
else
	function TestForX()
		return 0
	endfunction
endif


if has("autocmd")
	" remove the 'textwidth' setting set by vimrc_example.vim on text files
	au! vimrcEx FileType text

	" define a few additional autocommands
	augroup vimrclocal

	" complete the try-to-detect-Xwindows started earlier
	au VimEnter *
		\   let clipboard_present = TestForX()
		\ | let X_available = has('x11') && clipboard_present

	" this one is unnecessary on recent Vim versions
	au FileType *.* exe substitute(expand('<amatch>'), '^\(.*\)\.\(.*\)$', 'doau Filetype \1 | doau Filetype \2', '')

	" remove filetype-indenting autocommands set by the vimrc_example.vim
	filetype indent off

	" set verbosity to at least 1, except during startup and closedown
	if ! &verbose
		au vimEnter * set verbose=1
		au vimLeave * set verbose=0
	endif

	" close all cscope connections (if any) at closedown
	if has('cscope')
		au vimLeave * cs kill -1
	endif

	" use matchit correctly on C (etc.) sources
	au Filetype c,cpp,css,javascript
	\ let b:match_words = &matchpairs

	" this was fixed by patch 7.1.261 but doesn't hurt,
	" and will make Vim open UTF-16 files with BOM correctly even without that patch
	if has('multi_byte')
		au BufReadPost * if (&fenc == 'ucs-2le') && &bomb | e ++enc=utf-16le | endif
		au BufReadPost * if (&fenc == 'ucs-2')   && &bomb | e ++enc=utf-16   | endif
		set imi=0 ims=-1
	endif
endif

if has("gui_running")
	" set the GUI font, using the correct format for the build we're on
	if has("gui_gtk2")
		set gfn=Bitstream\ Vera\ Sans\ Mono\ 8
		let s:pfn = 'Bitstream\ Vera Sans Mono'
	"	set gfn=Monaco\ 7
	"	let s:pfn='Monaco'
	elseif has("gui_photon")
		set gfn=Bitstream\ Vera\ Sans\ Mono:s8
		let s:pfn = 'Bitstream\ Vera Sans Mono'
	"	set gfn=Monaco=s7
	"	let s:pfn='Monaco'
	elseif has("gui_kde")
		set gfn=Bitstream\ Vera\ Sans\ Mono/8/-1/5/50/0/0/0/1/0
		let s:pfn = 'Bitstream\ Vera Sans Mono'
	"	set gfn=Monaco/7/-1/5/50/0/0/0/1/0
	"	let s:pfn='Monaco'
	elseif has("x11")
		set gfn=-*-lucidatypewriter-medium-r-normal-*-*-90-*-*-m-*-*
		let s:pfn = 'Lucida'
	else
		set gfn=Lucida_Console:h9:cDEFAULT
		let s:pfn = 'Lucida Console'
	endif

	" set GUI cursor shape
	set guicursor=n-v-c:block-Cursor/lCursor,ve:ver35-Cursor,o:hor50-Cursor
	set guicursor+=i-ci:ver25-Cursor/lCursor,r-cr:hor20-Cursor/lCursor
	set guicursor+=sm:block-Cursor,a:blinkwait750-blinkoff750-blinkon750

	" maximize the Vim GUI
	set lines=999 columns=999

	set keywordprg=MANPAGER=more\ man\ -a\  " command to be used for the K command
else
	" print font for Console mode
	let s:pfn = 'Courier'

	if (&term == "pcterm") || (&term == "win32")
		" if exists("+guicursor")
		" Console cursor shape (Windows only)
		set guicursor=n-v-c:block,o:hor50,i-ci:hor15,r-cr:hor30
		set guicursor+=sm:block,a:blinkwait750-blinkoff750-blinkon750

	elseif &term == "linux"
		" don't try running CSApprox on Linux text-only console
		let g:CSApprox_loaded = 1

		" avoid some line-depth screwups
		if &lines > 47
			set lines=47
		endif

	elseif &term == "mlterm"	" the true-bidi terminal
		let &t_kb = "\x7F"	" termcap patch for mlterm backspace key
	endif

	" some more Console-mode-only settings
	set keywordprg=man
	set title titleold= titlestring=%t\ -\ VIM
	" change cursor color for Insert (commented out, doesn't work for me)
	if &term == 'xterm' && 0
		let &t_SI = "\e]12;CursorShape=1\x07"
		let &t_EI = "\e]50;CursorShape=0\x07"
	endif
endif	" has("gui_running") ... else ...

" override previous 'keywordprg' settings if not on Unix
if !has('unix')
	set keywordprg=:help
endif

" printer settings
if has("printer")
	set popt=duplex:off,formfeed:y
	let &pfn = s:pfn
endif

" switch to UTF-8 if possible (and not already done by the OS)
if has("multi_byte")
	let g:locale_encoding = &encoding
	if &encoding !~? '^u'		" ... if not already Unicode ...
		if &termencoding == ""
			let &termencoding = &encoding
		endif
		set encoding=utf-8
	endif
	set fileencodings=ucs-bom,utf-8,latin1
	setg bomb fileencoding=utf-8
"	if has("printer")
"		set penc=utf-8
"	endif
endif

" additional options
set autowriteall			" save (if possible) when |abandon|ing a file
set backup				" back up old versions
if has('writebackup')			" but only if not equipped with the more advanced 'writebackup'
	set nobackup writebackup
endif

" indent settings (we do NOT want filetype-related indent)
set autoindent
if has('smartindent')
	set smartindent
endif

set errorbells visualbell			" use both audio and visual bell
if 1			" has arithmetic evaluation
	let &t_vb = "\x07" . &t_vb		" 07 is the BEL character, rings the terminal bell
endif
if has('autocmd') && has('gui')
	" must set it again for the GUI
	au GUIEnter * let &t_vb = "\<C-G>\e|50f"
	" where 50 is the flash time in milliseconds
endif

if exists("+modelines")
	" the following is required because of SuSE's paranoid /etc/vimrc
	" and to force 'modeline' on even for root in Vim 7.0.237 and later
	set modeline modelines=5
	" the following disables a dangerous modeline in one helpfile
	" shipped with some obsolete versions of Vim
	if has ('autocmd')
		au BufReadPost ada.txt setl nomodeline ft=help
	endif
endif

set report=0		" report # of :substitute changes even if only one
set nojoinspaces	" don't use double spaces (e.g. after periods) when joining
set selection=inclusive keymodel=startsel selectmode=key	" :behave tonymec	;-)
set laststatus=2	" always display bottom status line
set display=lastline	" if the last line (with 'wrap') overshoots the window bottom,
			" display as much of it as possible
set timeout timeoutlen=5000 ttimeoutlen=100	" timeouts: 0.1s on keycodes, 5s on mappings
set scrolloff=3		" display at least 3 lines of context above & below cursor if possible
set nrformats=		" have ^A and ^X increment/decrement only in decimal
set formatoptions-=c	" autowrap comments using textwidth
set tags=tags,./tags	" ignore emacs-style tagfiles by default

" set 'list' and 'listchars' options
set list listchars=eol:$		" $ should work on all 8-byte encodings
if has('multi_byte')
	set listchars=eol:		" on multibyte Vim (where 'encoding' is UTF-8)
					" we can use the prettier Pilcrow mark
endif
set listchars+=tab:\|_			" show tabs as |_______|_______
silent! set listchars+=nbsp:~		" show no-break space as tilde if supported
" silent! set listchars+=precedes:<,extends:>

set ignorecase smartcase	" ignore case when search text is all-lowercase

" case adjust in Insert completion
if exists("+infercase")
	set infercase
endif

" add atsign to 'isfname' characters
set isfname+=@-@

" path search settings
if has('file_in_path')
	set path=.,,
	if has('path_extra')
		set path^=$HOME/**
	else
		set path^=$HOME
	endif
endif

set whichwrap=<,>,[,],~,b,s	" allow line-wrapping on <Left> <Right> <BS> <Space> and tilde
				" beware: we map <Left> to <BS> so < is not really necessary

if has("mouse")
	set mouse=a mousemodel=popup selectmode+=mouse
endif

if exists("+cursorcolumn")
	set cuc cul
endif

if has("diff")
	set diffopt+=context:0
endif

if exists("+imsearch")
	setg ims=-1	" set 'imsearch' to mimic 'iminsert' by default
endif

" set up Rolodex Vim
if has("windows")
    " this one must be set before loading files or running a session script
    " in case we want to open many windows
    set wmh=0
    if has("autocmd")
      augroup rolodex
	au VimEnter * set noea wh=99999 hh=99999 cwh=99999
      augroup vimrclocal
    else
	set noea wmh=0 wh=99999 hh=99999 cwh=99999
    endif
endif

" display up to 4 combining chars merged with a given spacing char
if exists("+maxcombine")
	set mco=4
endif

" allow removing combining chars one-by-one
if exists("+delcombine")
	set deco
endif

" set 'wildmenu' option, to get completion-by-menu (on the status line when hitting Tab)
if has("wildmenu")
	set wildmenu wildmode=longest:full,full
else
	set wildmode=longest,list:longest,full
endif

if has("wildignore")
	set wildoptions=tagfile		" display tag kind if possible
endif

if exists("+clipboard")
	set clipboard=exclude:cons\\\|linux
"	if has('multi_byte') && has('gui_gtk2') && (((version == 702) && has('patch201')) || (version > 702))
"		set clipboard^=html
"	endif
endif

if has('cscope')
	set cst
	if has('quickfix')
		set csqf=s-,c-,d-,i-,t-,e-
	endif
	if version < 700
		cnoreabbrev csf cs find
		cnoreabbrev csk cs kill
		cnoreabbrev css cs show
		cnoreabbrev csh cs help
	else
		cnoreabbrev <expr> csa ((getcmdtype() == ':' && getcmdpos() <= 4)? 'cs add'  : 'csa')
		cnoreabbrev <expr> csf ((getcmdtype() == ':' && getcmdpos() <= 4)? 'cs find' : 'csf')
		cnoreabbrev <expr> csk ((getcmdtype() == ':' && getcmdpos() <= 4)? 'cs kill' : 'csk')
		cnoreabbrev <expr> css ((getcmdtype() == ':' && getcmdpos() <= 4)? 'cs show' : 'css')
		cnoreabbrev <expr> csh ((getcmdtype() == ':' && getcmdpos() <= 4)? 'cs help' : 'csh')
	endif
	command -bar Cscope cs add $VIMSRC/src/cscope.out $VIMSRC/src
	set csverb
endif

if exists("+guioptions")
	set go-=a go-=e go+=tc
	" remove a	no autoselect to * register
	" remove e	always use text-style tabs
	" add    t	include tearoff menu items if possible
	" add    c	avoid popup dialogs for small choices
endif

if exists("+guiheadroom")
	set ghr=0
endif

" define our text-style tabline
" this is adapted (with some enhancements) from the example at :help setting-tabline
if exists("+showtabline")
	function MyTabLine()
		let s = ''
		let t = tabpagenr()
		let i = 1
		while i <= tabpagenr('$')
			let buflist = tabpagebuflist(i)
			let winnr = tabpagewinnr(i)
			let s .= '%' . i . 'T'
			let s .= (i == t ? '%1*' : '%2*')
			let s .= ' '
			let s .= i . ':'
			let s .= winnr . '/' . tabpagewinnr(i,'$')
			let s .= ' %*'
			let s .= (i == t ? '%#TabLineSel#' : '%#TabLine#')
			let file = bufname(buflist[winnr - 1])
			let file = fnamemodify(file, ':p:t')
			if file == ''
				let file = '[No Name]'
			endif
			let s .= file
			let i = i + 1
		endwhile
		let s .= '%T%#TabLineFill#%='
		let s .= (tabpagenr('$') > 1 ? '%999XX' : 'X')
		return s
	endfunction
	set stal=2
	set tabline=%!MyTabLine()
"	map	<F10>	:tabnext<CR>
"	map!	<F10>	<C-O>:tabnext<CR>
"	map	<S-F10>	:tabprev<CR>
"	map!	<S-F10>	<C-O>:tabprev<CR>
endif

" when splitting, put new window after current by default
if exists("+splitbelow")
	set splitbelow
endif
if exists("+splitright")
	set splitright
endif

" avoid too-frequent "more?" prompts
if &cmdheight < 2
	set cmdheight=2
endif

" custom status line, see :help 'statusline' for details
if has("statusline")
	set statusline=%<%f\ %h%m%r%=%k[%{(&fenc\ ==\ \"\"?&enc:&fenc).(&bomb?\",BOM\":\"\")}][U+%04B]\ %-12.(%l,%c%V%)\ %P
endif

" session options
if has('mksession')
	set ssop-=curdir ssop+=sesdir,globals,localoptions
endif

" highlight syntax all the way, even on very long lines
if exists("+synmaxcol")
	set synmaxcol=0
endif

if exists("+completeopt")
	set completeopt=menuone,preview
endif

" history and viminfo options
set history=500
if has('viminfo')
	set vi-=h vi+=!,%
	if has("unix")
		set vi+=r/media/dvdrecorder,r/mnt/floppy
	else
		set vi+=ra:,rb:
	endif
endif

if 1			" only if has arithmetic evaluation
	" netrw settings
	let netrw_alto		= 1
	let netrw_altv		= 1
	let netrw_liststyle	= 1
	" let netrw_keepdir	= 0
	let netrw_longlist	= 1
	let netrw_mousemaps	= 0
	let netrw_noretmap	= 1	" disable going back by double clicking
	let netrw_timefmt	= '%a %d %b %Y %T'

	" syntax settings for shell syntax
	let is_bash		= 1 " our 'sh' Bourne shell is alias to bash
	let sh_fold_enabled	= 7 " enable all kinds of syntax folding
endif

" Mappings and abbreviations

" make Ctrl-arrows move by words not WORDS
" (like they already do in Insert mode).
map	<C-Left>	b
map	<C-Right>	w

if exists('+iminsert')
	" map F8 to toggle keymap (Ctrl-^ not present on keyboard)
	noremap  <F8> :let &l:iminsert = ! &l:iminsert<CR>
	lnoremap <F8> <C-O>:let &l:iminsert = ! &l:iminsert<CR>
	noremap! <F8> <C-O>:let &l:iminsert = ! &l:iminsert<CR>
	cnoremap <F8> <C-^>
endif

" unmap ZZ (exit). We have :qa anyway.
map ZZ <Nop>

set wildcharm=<C-T>		" or any key not needed in Command-line mode
if has('menu')
	" override Ctrl-Z (minimize) by a text-mode menu
	map <C-Z> :emenu <C-T>
	imap <C-Z> <C-O>:emenu <C-T>
endif
" F9		follow help link
map	<F9>	<C-]>
" F9		terminate abbreviation
map!	<F9>	<C-]>
" F11		go to next window
" Shift-F11	go to previous window
" (with count) F11 or Shift-F11 both go to nth window
map	<F11>	<C-W>w
map!	<F11>	<C-O><C-W>w
map	<S-F11>	<C-W>W
map!	<S-F11>	<C-O><C-W>W
" move current window up and down
noremap	<C-W>X	<C-W>W<C-W>x
noremap	<C-W>x	<C-W>x<C-W>w
" F2		go to next quickfix line
" Shift-F2	go to previous quickfix line
map	<F2>	:cnext<CR>zv
map	<S-F2>	:cprev<CR>zv
" F4		paste clipboard after last line
" Shift-F4	paste clipboard before 1st line
" omitted if clipboard is inaccessible or not compiled-in
if has('autocmd')
	au VimEnter *
		\ if clipboard_present
			\ | exe 'map	<F4>	:$put +<CR>'
			\ | exe 'map	<S-F4>	:0put +<CR>'
			\ | exe 'imap	<F4>	<C-O>:$put +<CR>'
			\ | exe 'imap	<S-F4>	<C-O>:0put +<CR>'
		\ | endif
endif
" F3		save our work
map	<F3>	:wa<Bar>wv<CR>
imap	<F3>	<C-O>:wa<Bar>wv<CR>
map	<S-F3>	8<Bar>v/\.<CR>hy/\/<C-R>"\.<CR>
imap	<S-F3>	<Esc>8<Bar>v/\.<CR>hy/\/<C-R>"<CR>a
if 1
	function Fortune()
		" In order to remember them in the viminfo,
		" the first two variables defined below
		" must have names starting with an uppercase letter
		" and containing no lowercase letters.
		if !exists("g:FORTUNE")
			let g:FORTUNE = 0
		endif
		if !exists("g:FORTUNECYCLE")
			let g:FORTUNECYCLE = 5
		endif
		if !exists("s:sysFortunes")
			let s:sysFortunes =
			\ (system("which fortune") != "") && (!v:shell_error)
		endif
		if !exists("s:bramFortunes")
			let s:bramFortunes =
			\ filereadable(expand("~/fortunes.txt"))
		endif
		if s:sysFortunes && (g:FORTUNE || (!s:bramFortunes))
			let @+ = "-- \n" . system("fortune -a")
		elseif s:bramFortunes
			new ~/fortunes.txt
			silent 1;/^-- $/-1d +
			$put +
			wq
		else
			let @+ = ""
		endif
		let g:FORTUNE = g:FORTUNE + 1
		if g:FORTUNE >= g:FORTUNECYCLE
			let g:FORTUNE = 0
		endif
		return @+
	endfunction
map <F5> :echo Fortune()<CR>
endif
"
" Up, Down	move up/down by "screen lines"
" j k 		(default) move down/up by "file lines"
map	<Down>	gj
map	<Up>	gk
" if exists("*pumvisible")
"	inoremap <expr>	<Down>	pumvisible() ? "\<lt>Down>" : "\<lt>C-O>gj"
"	inoremap <expr>	<Up>	pumvisible() ? "\<lt>Up>"   : "\<lt>C-O>gk"
" else
"	inoremap	<Down>	<C-O>gj
"	inoremap	<Up>	<C-O>gk
"endif

" scroll mouse by single lines
if has('mouse')
	noremap		<MouseUp>	<C-E>
	inoremap	<MouseUp>	<C-O><C-E>
	noremap		<MouseDown>	<C-Y>
	inoremap	<MouseDown>	<C-O><C-Y>
endif

" make left-arrow work over indent/eol/start
noremap	<Left>	<BS>
" open help window at bottom unless :help typed in full
if version < 700
	cnoreabbrev	h	bot h
else
	cnoreabbrev	<expr>	h	((getcmdtype() == ':' && getcmdpos() <= 2)? 'bot h' : 'h')
endif
map	<F1>	:bot help<CR>
" map Ctrl-L to invoke :diffupdate when in diff mode (disabled)
" if has("diff")
" 	map	<C-L>	:if &diff <Bar> diffu <Bar> else <Bar> redraw <Bar> endif <CR>
" 	imap	<C-L>	<C-O>:if &diff <Bar> diffu <Bar> else <Bar> redraw <Bar> endif <CR>
" endif

" Make a simple "search" text object.
" With the cursor at the start of the current match, move to the end of the
" same match; then remove the newly added //e from the search history, so that
" n will find the _next_ match
if 1 " has expression evaluation
	vnoremap <silent> s //e<C-R>=&selection == 'exclusive' ? '+1' : ''<CR><CR>
		\:<C-U>call histdel('search',-1)<Bar>let @/ = histget('search',-1)<CR>gv
	omap s :normal vs<CR>
endif

" Ctrl-K comma colon (in Insert mode): UTF-8 single-codepoint ellipsis "..."
" disregard error if (for instance) not in UTF-8
if has("digraphs")
	silent!	dig	,:	8230		" HORIZONTAL ELLIPSIS
	silent!	dig	qi	64259		" LATIN SMALL LIGATURE FFI
	silent!	dig	ql	64260		" LATIN SMALL LIGATURE FFL
endif

if has('insert_expand')
	" mappings for ordinary Insert-mode completion
	inoremap	<F12>		<C-X><C-N>
	inoremap	<S-F12>		<C-X><C-P>
	" mapping for Omni completion
	inoremap	<F6>		<C-X><C-O>
endif

" repeat latest substitute
map		:&&<CR>
" find non-UTF8 in 8-bit files
map		8g8

" the following are to force-break autocomplete on these keys
inoremap	<C-Y>	<Space><BS><C-Y>
inoremap	<C-E>	<Space><BS><C-E>
" Add some undo points in Insert mode
imap	<CR>		<CR><Up><Down>
imap	<Space>		<Space><Left><Right>
imap	<Tab>		<Tab><Left><Right>

if has("user_commands")
	command -nargs=0 -bar WhatSyntax echomsg synIDattr(synID(line("."),col("."),0),"name") synIDattr(synIDtrans(synID(line("."),col("."),0)),"name") synIDattr(synID(line("."),col("."),1),"name") synIDattr(synIDtrans(synID(line("."),col("."),1)),"name")
	command -nargs=0 -bar -bang -range -reg Put exe ((<q-bang> == '!') ? <q-line1> : <q-line2>) . 'put' . <q-bang> <q-reg>
	command -nargs=* -bar -bang -range Iline <line1>,<line2>Put<bang> =<q-args>
endif

if has('autocmd')
	augroup END
endif

if 1
  finish
endif
" the following is only for Vim versions without expression evaluation
runtime! plugin/zzsplash.vim
```

#### 61.2.2.2 http://users.skynet.be/antoine.mechelynck/other/almost-default.vim

```text
" Vim color file
" Maintainer:   Tony Mechelynck <antoine.mechelynck@gmail.com>
" Last Change:  2009 Oct 28
" This is almost the default color scheme.  It doesn't define the Normal
" highlighting, it uses whatever the colors used to be.

" Only the highlight groups named below are defined; the rest
" are left at their compiled-in default settings.

let s:colors_name = "almost-default"
if exists("g:debug") && g:debug
  echomsg s:colors_name "start"
endif

" Set 'background' back to the default.  The value can't always be estimated
" and is then guessed.
hi clear Normal
set bg&

" Remove all existing highlighting and set the defaults.
hi clear

" Load the syntax highlighting defaults, if it's enabled.
if exists("syntax_on")
  syntax reset
endif

" Set our own highlighting settings
hi SpecialKey                   guibg=NONE
" white on red is not always distinct in the GUI: use black on red then
hi Error                        guibg=red           guifg=black
hi clear ErrorMsg
hi link  ErrorMsg       Error
" display matchit messages
hi def link MatchError  WarningMsg
" show cursor line/column (if enabled) in very light grey in the GUI,
" underlined in the console
if has("gui_running")
  hi clear CursorLine
  hi CursorLine                 guibg=#F4F4F4
endif
hi clear CursorColumn
hi link  CursorColumn   CursorLine
" do not make help bars and stars invisible
hi clear helpBar
hi link  helpBar        helpHyperTextJump
hi clear helpStar
hi link  helpStar       helpHyperTextEntry
" the following were forgotten in the syntax/vim.vim (and ended up cleared)
hi clear vimVar
hi link  vimVar         Identifier
hi clear vimGroupName
hi link  vimGroupName   vimGroup
hi clear vimHiClear
hi link  vimHiClear     vimHighlight
" in the GUI only, display the Ignore group as very slightly visible
hi clear Ignore
  exe "hi Ignore term=NONE guibg=white guifg=#999999 ctermbg=NONE ctermfg="
    \ . (&bg == "dark" ? "black" : "white")
" display the status line of the active window in a distinctive color:
" bold black on bright red in the GUI, white on green in the console
" (where the bg is never bright, and dark red is sometimes an ugly sort
" of reddish brown).
hi StatusLine   gui=NONE,bold   guibg=red           guifg=black
        \       cterm=NONE,bold ctermbg=darkgreen   ctermfg=white
hi WildMenu     gui=NONE,bold   guibg=green         guifg=black
        \       cterm=NONE,bold ctermbg=black       ctermfg=white
" make the status line bold-reverse (but B&W) for inactive windows
hi StatusLineNC gui=reverse,bold
        \       cterm=NONE      ctermbg=black       ctermfg=lightgrey
" make the active status line colours alternate between two settings
" to give a visual notice of the CursorHold/CursorHoldI events
if ! exists("s:statuslineflag")
  let s:statuslineflag = 0
endif
"
" The following 'fancy footwork' is needed to have our CursorHold autocommand
" work smoothly with 256-color cterms handled by the 3rd-party csapprox.vim plugin
if exists('g:CSApprox_approximator_function')
    let s:ctbg1 = g:CSApprox_approximator_function(0,   255, 0) " green
    let s:ctbg2 = g:CSApprox_approximator_function(255, 0,   0) " red
    let s:ctfg  = g:CSApprox_approximator_function(0,   0,   0) " black
else
    let s:ctbg1 = 'darkgreen'
    let s:ctbg2 = 'black'
    let s:ctfg  = 'white'
endif

function! ToggleStatusLine()
    if s:statuslineflag
        exe 'hi StatusLine'
          \     'cterm=NONE,bold ctermbg=' . s:ctbg1 'ctermfg=' . s:ctfg
          \     'gui=NONE,bold   guibg=green          guifg=black'
        exe 'hi WildMenu'
          \     'cterm=NONE,bold ctermbg=' . s:ctbg2 'ctermfg=' . s:ctfg
          \     'gui=NONE,bold   guibg=red            guifg=black'
    else
        exe 'hi StatusLine'
          \     'cterm=NONE,bold ctermbg=' . s:ctbg2 'ctermfg=' . s:ctfg
          \     'gui=NONE,bold   guibg=red            guifg=black'
        exe 'hi WildMenu'
          \     'cterm=NONE,bold ctermbg=' . s:ctbg1 'ctermfg=' . s:ctfg
          \     'gui=NONE,bold   guibg=green          guifg=black'
    endif
    let s:statuslineflag = ! s:statuslineflag
endfunction

exe "augroup" s:colors_name
    au! CursorHold,CursorHoldI * call ToggleStatusLine()
    au! ColorScheme *
        \ if g:colors_name != s:colors_name | exe "au!" s:colors_name | endif
augroup END

" define colors for the tab line:
" file name of unselected tab
hi TabLine      gui=NONE        guibg=#EEEEEE       guifg=black
        \       cterm=NONE,bold ctermbg=lightgrey   ctermfg=white
" file name of selected tab (GUI default is bold black on white)
hi TabLineSel   cterm=NONE,bold ctermbg=green       ctermfg=white
" fillup and tab-delete "X" at right
hi TabLineFill  gui=NONE,bold   guibg=#CCCCCC       guifg=#990000
        \       cterm=NONE      ctermbg=lightgrey   ctermfg=red
" tab and file number 1:2/3 (meaning "tab 1: window 2 of 3) for selected tab
hi User1        gui=bold        guibg=white         guifg=magenta
        \                       ctermbg=green       ctermfg=black
" tab and file number 1:2/3 for unselected tab
hi User2                        guibg=#EEEEEE       guifg=magenta
        \                       ctermbg=lightgrey   ctermfg=black
" additional override for manpages  la Dr. Chip
hi manSubSectionStart           guibg=white         guifg=yellow
        \                       ctermbg=black       ctermfg=darkblue

" remember the current colorscheme name
let g:colors_name = s:colors_name
if 0
" the following is required e.g. if we have debug on
if exists("syntax_on")
  syntax on
endif

if exists("g:debug") && g:debug
  echomsg s:colors_name "end"
endif
endif

" vim: sw=2 et

			61.2.2.3
		61.2.3

	61.3
```
