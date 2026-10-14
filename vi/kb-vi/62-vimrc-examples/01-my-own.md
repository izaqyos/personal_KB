---
type: reference
title: My own
description: "Legacy vim KB section: My own"
tags: [vim, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#61.1"
---

# 61.1 My own

[↑ vimrc examples](/vi/kb-vi/62-vimrc-examples/README.md)

### 61.1.1 Work Laptop updated Mon Jan 25 18:16:46 JST 2010

```text
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Author	Yosi Izaq
" <employer> R&D
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"set ignorecase -- turns out, I like case sensitivity 
"set list " turns out, I don't like listchars -- show chars on end of line, whitespace, etc
"autocmd GUIEnter * :simalt ~x -- having it auto maximize the screen is annoying
"autocmd BufEnter * :lcd %:p:h -- switch to current dir (breaks some scripts)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" General
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

"------------------------------------------------------------
" Must have options {{{1
"
" These are highly recommended options.

" One of the most important options to activate. Allows you to switch from an
" unsaved buffer without saving it first. Also allows you to keep an undo
" history for multiple files. Vim will complain if you try to quit without
" saving, and swap files will keep you safe if your computer crashes.
set hidden

" Better command-line completion
set wildmenu

" Show partial commands in the last line of the screen
" set showcmd

" Highlight searches (use <C-L> to temporarily turn off highlighting; see the
" mapping of <C-L> below)
set hlsearch

" Modelines have historically been a source of security vulnerabilities.  As
" such, it may be a good idea to disable them and use the securemodelines
" script, <http://www.vim.org/scripts/script.php?script_id=1876>.
" set nomodeline
"------------------------------------------------------------
"------------------------------------------------------------
" Usability options {{{1
"
" These are options that users frequently set in their .vimrc. Some of them
" change Vim's behaviour in ways which deviate from the true Vi way, but
" which are considered to add usability. Which, if any, of these options to
" use is very much a personal preference, but they are harmless.

" Use case insensitive search, except when using capital letters
set ignorecase
set smartcase

" Allow backspacing over autoindent, line breaks and start of insert action
set backspace=indent,eol,start

" When opening a new line and no filetype-specific indenting is enabled, keep
" the same indent as the line you're currently on. Useful for READMEs, etc.
set autoindent

" Stop certain movements from always going to the first character of a line.
" While this behaviour deviates from that of Vi, it does what most users
" coming from other editors would expect.
"set nostartofline

" Display the cursor position on the last line of the screen or in the status
" line of a window
"set ruler

" Always display the status line, even if only one window is displayed
"set laststatus=2

" Instead of failing a command because of unsaved changes, instead raise a
" dialogue asking if you wish to save changed files.
set confirm

" Use visual bell instead of beeping when doing something wrong
set visualbell

" And reset the terminal code for the visual bell.  If visualbell is set, and
" this line is also included, vim will neither flash nor beep.  If visualbell
" is unset, this does nothing.
set t_vb=

" Enable use of the mouse for all modes
"set mouse=a

" Set the command window height to 2 lines, to avoid many cases of having to
" "press <Enter> to continue"
set cmdheight=2

" Display line numbers on the left
"set number

" Quickly time out on keycodes, but never time out on mappings
set notimeout ttimeout ttimeoutlen=200

" Use <F11> to toggle between 'paste' and 'nopaste'
"set pastetoggle=<F11>
"------------------------------------------------------------

" When started as "evim", evim.vim will already have done these settings.
if v:progname =~? "evim"
  finish
endif

set nocompatible " get out of horrible vi-compatible mode

filetype on " detect the type of file
set history=1000 " How many lines of history to remember
set cf " enable error files and error jumping
set clipboard+=unnamed " turns out I do like is sharing windows clipboard
set ffs=dos,unix,mac " support all three, in this order
filetype plugin on " load filetype plugins
set viminfo+=! " make sure it can save viminfo
set isk+=_,$,@,%,#,- " none of these should be word dividers, so make them not be

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Theme/Colors
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"set background=dark " we are using a dark background
set t_Co=256
"syntax on " syntax highlighting on
" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
if &t_Co > 2 || has("gui_running")
  syntax on
  set hlsearch
endif

"colorscheme breeze " my theme
"colorscheme morning " my theme
"colorscheme darkblue " my theme
"colorscheme gothic " my theme
"colorscheme aqua " my theme
"colorscheme earth " my theme
"colorscheme black_angus " my theme
"colorscheme relaxedgreen " my theme
"colorscheme darkblack  " my theme
"colorscheme freya  " my theme
"colorscheme fog  " my theme
"colorscheme motus  " my theme
"colorscheme impact  " my theme
"colorscheme less  " my theme
colorscheme desert256  " my theme

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Files/Backups
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
if has("vms")
  set nobackup		" do not keep a backup file, use versions instead
else
  set backup		" keep a backup file
endif
"set backup " make backup file
"set backupdir=$VIM\vimfiles\backup " where to put backup file
"set directory=$VIM\vimfiles\temp " directory is the directory for temp file
set backupdir=~/vim_backup_files/ " where to put backup file
set directory=~/vim_swap_files/ " directory is the directory for temp file
set makeef=error.err " When using make, where should it dump the file
set showcmd		" display incomplete commands

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Vim UI
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set lsp=0 " space it out a little more (easier to read)
set wildmenu " turn on wild menu
set ruler " Always show current positions along the bottom 
set cmdheight=2 " the command bar is 2 high
set number " turn on line numbers
set lz " do not redraw while running macros (much faster) (LazyRedraw)
set hid " you can change buffer without saving
"set backspace=2 " make backspace work normal
" allow backspacing over everything in insert mode
"if has("win32")
"set backspace=indent,eol,start
"endif
""set backspace=indent,eol,start
set whichwrap+=<,>,h,l  " backspace and cursor keys wrap to

"set mouse=a " use mouse everywhere
" In many terminal emulators the mouse works just fine, thus enable it.
if has('mouse')
  set mouse=a
endif

set shortmess=atI " shortens messages to avoid 'press a key' prompt 
set report=0 " tell us when anything is changed via :...
set noerrorbells " don't make noise
" make the splitters between windows be blank
set fillchars=vert:\ ,stl:\ ,stlnc:\ 

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Visual Cues
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set showmatch " show matching brackets
set mat=5 " how many tenths of a second to blink matching brackets for
set nohlsearch " do not highlight searched for phrases
set incsearch " BUT do highlight as you type you search phrase
"set ignorecase "set ic, ignore case in searches
"set hlsearch "highlight searched patterns
set listchars=tab:\|\ ,trail:.,extends:>,precedes:<,eol:$ " what to show when I hit :set list
"set lines=80 " 80 lines tall
"set columns=160 " 160 cols wide
set so=10 " Keep 10 lines (top/bottom) for scope
set novisualbell " don't blink
set noerrorbells " no noises
"Conventional status line:
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\ [HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
"
""Detailed stats line, including current function:
"
"function! SyntaxItem()
"  return synIDattr(synID(line("."),col("."),1),"name")
"endfunction
"
"
"if has('statusline')
"  set statusline=%#Question#                   " set highlighting
"  set statusline+=%-2.2n\                      " buffer number
"  set statusline+=%#WarningMsg#                " set highlighting
"  set statusline+=%f\                          " file name
"  set statusline+=%#Question#                  " set highlighting
"  set statusline+=%h%m%r%w\                    " flags
"  set statusline+=%{strlen(&ft)?&ft:'none'},   " file type
"  set statusline+=%{(&fenc==\"\"?&enc:&fenc)}, " encoding
"  set statusline+=%{((exists(\"+bomb\")\ &&\ &bomb)?\"B,\":\"\")} " BOM
"  set statusline+=%{&fileformat},              " file format
"  set statusline+=%{&spelllang},               " language of spelling checker
"  set statusline+=%{SyntaxItem()}              " syntax highlight group under cursor
"  set statusline+=%=                           " ident to the right
"  set statusline+=[LEN=%L]\                    " File length in lines
"  set statusline+=[ASCII=\%03.3b]\	       " ASCII code for character under cursor
"  set statusline+=0x%-8B\                      " character hexadecimal code 
"  set statusline+=%-7.(%l,%c%V%)\ %<%P         " cursor position/offset
"endif
"
""end of 
""Detailed stats line, including current function:

set laststatus=2 " always show the status line

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Text Formatting/Layout
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set fo=tcrqn " See Help (complex)
set ai " autoindent
set si " smartindent 
set cindent " do c-style indenting
set tabstop=8 " tab spacing (settings below are just to unify it)
set softtabstop=8 " unify
set shiftwidth=8 " unify 
set noexpandtab " real tabs please!
"Settings for ACS code conventions no tabs, instead four spaces.
"set tabstop=4
"set expandtab
"set nowrap " do not wrap lines  
set smarttab " use tabs at the start of a line, spaces elsewhere

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Folding
"    Enable folding, but by default make it act like folding is off, because folding is annoying in anything but a few rare cases
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set foldenable " Turn on folding
set foldmethod=indent " Make folding indent sensitive
set foldlevel=100 " Don't autofold anything (but I can still fold manually)
set foldopen-=search " don't open folds when you search into them
set foldopen-=undo " don't open folds when you undo stuff

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" File Explorer
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:explVertical=1 " should I split verticially
let g:explWinSize=35 " width of 35 pixels

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Win Manager
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:winManagerWidth=35 " How wide should it be( pixels)
let g:winManagerWindowLayout = 'FileExplorer,TagsExplorer|BufExplorer' " What windows should it

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" CTags
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" only set Tlist_Ctags_Cmd if its not in path. 
"let Tlist_Ctags_Cmd = '/usr/local/bin/'.'\ctags.exe' " Location of ctags
let Tlist_Sort_Type = "name" " order by 
let Tlist_Use_Right_Window = 1 " split to the right side of the screen
let Tlist_Compart_Format = 1 " show small meny
let Tlist_Exist_OnlyWindow = 1 " if you are the last, kill yourself
let Tlist_File_Fold_Auto_Close = 0 " Do not close tags for other files
let Tlist_Enable_Fold_Column = 0 " Do not show folding tree

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Minibuf
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:miniBufExplTabWrap = 1 " make tabs show complete (no broken on two lines)
let g:miniBufExplModSelTarget = 1

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Matchit
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let b:match_ignorecase = 1

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Perl
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let perl_extended_vars=1 " highlight advanced perl vars inside strings

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Custom Functions
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Select range, then hit :SuperRetab($width) - by p0g and FallingCow
function! SuperRetab(width) range
	silent! exe a:firstline . ',' . a:lastline . 's/\v%(^ *)@<= {'. a:width .'}/\t/g'
endfunction

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Mappings, maps, my maps
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"map <right> <ESC>:MBEbn<RETURN> " right arrow (normal mode) switches buffers  (excluding minibuf)
"map <left> <ESC>:MBEbp<RETURN> " left arrow (normal mode) switches buffers (excluding minibuf) 
"map <up> <ESC>:Sex<RETURN><ESC><C-W><C-W> " up arrow (normal mode) brings up a file list
"map <down> <ESC>:Tlist<RETURN> " down arrow  (normal mode) brings up the tag list
"map <A-i> i <ESC>r " alt-i (normal mode) inserts a single char, and then switches back to normal
"map <F2> <ESC>ggVG:call SuperRetab()<left>
"map <F12> ggVGg? " encypt the file (toggle)

"Send output of the last g/patter/ search to a new window
nmap <F3> :redir @a<CR>:g//<CR>:redir END<CR>:new<CR>:put! a<CR><CR>

"Map F5 to add new entry to TOC based on following logic, take the previous entry and add 1 to the last digit
map <F5> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o<ESC>p0E<C-A>a<ESC>
"Map F6 to add new entry to TOC based on following logic, take the previous entry and add .1 after the last digit
"map <F6> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o    <ESC>p0Ea.1 
map <F6> <ESC>ms?^\s*\(\d\+\.\)\+\d*<CR>Y<CR>`so<ESC>PI<TAB><ESC>Ea.1<ESC>WDo<ESC>

"Map ctrl-s+d to add [done] to end of line, this usefull for filling done status for
" p -> pending, o -> open, w - work in progress
map <C-s><C-d> A [Done]<esc>
map <C-s><C-p> A [Pending]<esc>
map <C-s><C-o> A [Open]<esc>
map <C-s><C-w> A [Work In Progress]<esc>

"Maps for quoting a visuall selected text with ',", (), [] and {} 
vnoremap qq <Esc>`>a'<Esc>`<i'<Esc>
vnoremap q" <Esc>`>a"<Esc>`<i"<Esc>
vnoremap q( <Esc>`>a)<Esc>`<i(<Esc>
vnoremap q[ <Esc>`>a]<Esc>`<i[<Esc>
vnoremap q{ <Esc>`>a}<Esc>`<i{<Esc>

"Maps for getting current time. t? in normal mode and ctrl+t in insert mode
map t? :echo 'Current time is ' . strftime('%c')<CR>
map! <C-t><C-t>		<C-R>=strftime('%c')<CR><Esc>
" The following command maps ctrl+d to insert the directory name of the current buffer:
inoremap <C-d> <C-R>=expand('%:p:h')<CR>

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Autocommands
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
autocmd BufEnter * :syntax sync fromstart " ensure every file does syntax highlighting (full)
au BufNewFile,BufRead *.asp :set ft=aspjscript " all my .asp files ARE jscript
au BufNewFile,BufRead *.tpl :set ft=html " all my .tpl files ARE html
au BufNewFile,BufRead *.hta :set ft=html " all my .tpl files ARE html

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Useful abbrevs
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
iab xasp <%@language=jscript%><CR><%<CR><TAB><CR><BS>%><ESC><<O<TAB>
iab xdate <c-r>=strftime("%d/%m/%y %H:%M:%S")<cr> 

"csuppot plugin.
let g:C_AuthorName      = 'Yosi Izaq'    
let g:C_AuthorRef       = 'Y.I.'                         
let g:C_Email           = '<email>'                    
let g:C_Company         = '<employer>'     
let g:C_Template_Directory  =  $HOME."/.vim/plugin/templates/"

"Python support
"au FileType python /cygdrive/d/Documents\ and\ Settings/<user>/.vim/plugin/python.vim 
au FileType python $HOME."plugin/python.vim"

"perl support plugin
let g:Perl_AuthorName      = 'Yosi Izaq'     
let g:Perl_AuthorRef       = 'YI'                         
let g:Perl_Email           = '<email>'            
let g:Perl_Company         = '<employer>'    

"Latex suite plugin
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

" For recording
:nnoremap <space> @q

" Auto save and load working session
" function! MakeSession()
"     let b:sessiondir = $HOME . "/.vim/sessions" . getcwd()
"     if (filewritable(b:sessiondir) != 2)
"         exe 'silent !mkdir -p ' b:sessiondir
"         redraw!
"     endif
"     let b:filename = b:sessiondir . '/session.vim'
"     exe "mksession! " . b:filename
" endfunction
" 
" function! LoadSession()
"     let b:sessiondir  = $HOME . "/.vim/sessions" . getcwd()
"     let b:sessionfile = b:sessiondir . "/session.vim"
"     if (filereadable(b:sessionfile))
"         exe 'source ' b:sessionfile
"     else
"         echo "No session loaded."
"     endif
" endfunction
" 
" au VimEnter * :call LoadSession()
" au VimLeave * :call MakeSession()
"

" For cppomnicomplete
"set nocp
"filetype plugin on
"map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q
" settings based on tip 1608
" configure tags - add additional tags here or comment out not-used ones
set tags+=~/.vim/tags/cpp/tags
set tags+=~/.vim/tags/acs_5_1/tags
" build tags of your own project with CTRL+F12
map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

" OmniCppComplete
let OmniCpp_NamespaceSearch = 1
let OmniCpp_GlobalScopeSearch = 1
let OmniCpp_ShowAccess = 1
let OmniCpp_MayCompleteDot = 1
let OmniCpp_MayCompleteArrow = 1
let OmniCpp_MayCompleteScope = 1
let OmniCpp_DefaultNamespaces = ["std", "_GLIBCXX_STD"]
" automatically open and close the popup menu / preview window
au CursorMovedI,InsertLeave * if pumvisible() == 0|silent! pclose|endif
set completeopt=menuone,menu,longest,preview

" To view word docs with vim, uses antiword
autocmd BufReadPre *.doc set ro
autocmd BufReadPre *.doc set hlsearch!
autocmd BufReadPost *.doc %!antiword "%"

" To view and diff PDF files using xpdf
autocmd BufReadPre *.pdf set ro
autocmd BufReadPost *.pdf %!pdftotext -nopgbrk "%" -

" grep mappings
map <leader>n :cn<cr>
map <leader>p :cp<cr>
map <leader>c :botright cw 10<cr>

"text.vim plugin
au BufRead,BufNewFile *  setfiletype txt

" XMLFolding plugin
au BufNewFile,BufRead *.xml,*.htm,*.html so XMLFolding

"Compile and build command for systems that use maven
"set makeprg=mvnc\ %<
"
"Compile and build command for systems that use GNU make
set makeprg=makec\ %<

"for dbext
let g:dbext_default_profile_usual = 'type=SYBASE:user=DBA:passwd=sql'


" My personal menu
amenu MyMenu.HighlighCtxt       :match ToDo /^\s\+-\+>.*$/<cr>
amenu MyMenu.KBEntries          :match StatusLine /^\s*\d\+\..*$/<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveBuffers     :silent bufdo !tar -rvf ~/temp/vim_archive.tar %:p<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.highlight          :set cursorline<cr>
amenu MyMenu.highlightV         :set cursorcolumn<cr>
amenu MyMenu.-SEP-      :   
vmenu MyMenu.makeArrowList              :call ArrowList()<cr>
vmenu MyMenu.makeNumberList             :call NumberList()<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.InsertFileLink             :s/^.*$/&\r<URL:[File Path]><cr>
amenu MyMenu.InsertLocalLink            :s/^.*$/&\r<URL:#tn=[pattern in file]><cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveModifiedBuffers            :call Archive_all_modified_buffers()<cr>

" My ACS 5, linux develoment environment clearcase menu
amenu MyCCMenu.checkout       :! co % <cr>
amenu MyCCMenu.checkin       :! ci % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.version_tree       :! ct lsvtree -g % <cr>
amenu MyCCMenu.diff_pred       :! ct diff -pred -graph % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.checkin_all       :call CheckIn_all__buffers()<cr>
amenu MyCCMenu.manually_set_tags_for_auto_complete       :set tags+=~/.vim/tags/acs_5_1/tags<cr>:set tags+=~/.vim/tags/cpp/tags<cr>

"Custom functions
function! Archive_all_modified_buffers()
    set hidden
    let archive=[]
    bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif
    
    if len(archive) > 0
       exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
    endif
endfunction

function! Perform_Shell_Test_all__buffers()
bufdo exe "!test -f " . expand("%") ."  > /dev/null"
    \ | if !v:shell_error
    \ | echo "passed"
    \ | endif
endfunction

function! CheckIn_all__buffers()
bufdo exe "!ct ls  " . expand("%") ." | grep -i checkedout > /dev/null"
    \ | if !v:shell_error
    \ | echo "file is checked out"
    \ | exe "!ci " . expand("%")
    \ | endif
endfunction

if has("win32")
	set dictionary-=c:\work\dictionary\brit-a-z.txt dictionary+=c:\work\dictionary\brit-a-z.txt 
else
	set dictionary-=/cygdrive/c/work/dictionary/brit-a-z.txt dictionary+=/cygdrive/c/work/dictionary/brit-a-z.txt
endif
set complete-=k complete+=k

if has("win32unix") "Tip will only take effect on cygwin
set complete=.,w,b,u,k
elseif  has("win32") 
set complete=.,w,b,u,k
else "Unix, where my source code is
set complete=.,w,b,u,k,i,]
endif

set viewdir=$HOME/.vim/views

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Creating lists
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! ArrowList()
        let lineno = line(".")
        call setline(lineno, "    -> " . getline(lineno))
endfunction

function! NumberList() range
        "Set line numbers in front of lines
        let begining=line("'<")
        let ending=line("'>")
        let difsize = ending -begining +1
        let pre = ' ' 
        while (begining <= ending)
                if match(difsize, '^9*$') == 0
                        let pre = pre . ' ' 
                endif
                call setline(ending, pre . difsize . "\t" . getline(ending))
                let ending = ending-1
                let difsize = difsize-1
        endwhile
endfunction

""" VIM commander map
noremap <silent> <F11> :cal VimCommanderToggle()<CR>
let b:vimcommander_install_doc=0

""" C support turn off annoying messages
let s:C_TemplateOverwrittenMsg='no'

"Functions
"" Commenting of #endifs etc
"" Author: Ben Schmidt, minor modifications by A. S. Budden.
"command SmartPreProcCommenter call SmartPreProcCommenter()
"
"function! SmartPreProcCommenter()
"  mark y
"  let saved_wrapscan=&wrapscan
"  set nowrapscan
"  let elsecomment=""
"  let endcomment=""
"  try
"    " Find the last #if in the buffer
"    $?^\s*#if
"    while 1
"      " Build the comments for later use, based on current line
"      let content=getline('.')
"      let elsecomment=BuildElseComment(content,elsecomment)
"      let endcomment=BuildEndComment(content,endcomment)
"      " Change # into ## so we know we've already processed this one
"      " and don't find it again
"      s/^\s*\zs#/##
"      " Find the next #else, #elif, #endif which must belong to this #if
"      /^\s*#\(elif\|else\|endif\)
"      let content=getline('.')
"      if match(content,'^\s*#elif') != -1
"        " For #elif, treat the same as #if, i.e. build new comments
"        continue
"      elseif match(content,'^\s*#else') != -1
"        " For #else, add/replace the comment
"        call setline('.',ReplaceComment(content,elsecomment))
"        s/^\s*\zs#/##
"        " Find the #endif
"        /^\s*#endif
"      endif
"      " We should be at the #endif now; add/replace the comment
"      call setline('.',ReplaceComment(getline('.'),endcomment))
"      s/^\s*\zs#/##
"      " Find the previous #if
"      ?^\s*#if
"    endwhile
"  catch /search hit TOP/
"    " Once we have an error (pattern not found, i.e. no more left)
"    " Change all our ## markers back to #
"    silent! %s/^\s*\zs##/#
"  endtry
"  let &wrapscan=saved_wrapscan
"  normal `y
"endfunc
"
"let s:PreProcCommentMatcher = '#\a\+\s\+\zs.\{-}\ze\(\s*\/\*.\{-}\*\/\)\?\s*$'
"
"function! BuildElseComment(content,previous)
"  let expression=escape(matchstr(a:content,s:PreProcCommentMatcher), '\~&')
"  if match(a:content,'#ifdef') != -1
"    return "/* NOT def ".expression." */"
"  elseif match(a:content,'#ifndef') != -1
"    return "/* def ".expression." */"
"  elseif match(a:content,'#if') != -1
"    return "/* NOT ".expression." */"
"  elseif match(a:content,'#elif') != -1
"    return substitute(a:previous,' \*/',', '.expression.' */','')
"  else
"    return ""
"  endif
"endfunc
"
"function! BuildEndComment(content,previous)
"  let expression=escape(matchstr(a:content,s:PreProcCommentMatcher), '\~&')
"  if match(a:content,'#ifdef') != -1
"    return "/* def ".expression." */"
"  elseif match(a:content,'#ifndef') != -1
"    return "/* NOT def ".expression." */"
"  elseif match(a:content,'#if') != -1
"    return "/* ".expression." */"
"  elseif match(a:content,'#elif') != -1
"    return substitute(a:previous,' \*/',', '.expression.' */','')
"  else
"    return ""
"  endif
"endfunc
"
"function! ReplaceComment(content,comment)
"  let existing=escape(matchstr(a:content,'#\a\+\s\+\zs.\{-}\s*$'), '\~&')
"  if existing == ""
"    return substitute(a:content,'^\s*#\a\+\zs.*'," ".a:comment,'')
"  elseif existing != a:comment && match(existing,'XXX') == -1
"    return a:content." /* XXX */"
"  else
"    return a:content
"  endif
"endfunc
"
"

"Cscope auto mapping
nmap <F12> :!find . -iname '*.c' -o -iname '*.cpp' -o -iname '*.h' -o -iname '*.hpp' > cscope.files ;
  \ cs kill -1<CR>:cs add cscope.out<CR>

"Cscope qury results go to quickfix
if has('cscope')
" In case cscope.out is in home dir
 "if filereadable(expand("$HOME/cscope.out"))
" In case cscope.out is in dir from which VIM is opned
 if filereadable(expand("cscope.out"))
   cs kill -1
   cs add ~/cscope.out
 endif
 set cscopeverbose
 set cscopequickfix=s-,c-,d-,i-,t-,e-,g-
endif

set tags+=tags,~/tags,~/stl-tags

"switch back to normal mode automatically after inaction
"au! CursorHoldI * stopinsert

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Source explorer http://www.vim.org/scripts/script.php?script_id=2179 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" // The switch of the Source Explorer
nmap <F8> :SrcExplToggle<CR>

" // Set the window height of Source Explorer
  let g:SrcExpl_winHeight = 8

" // Set 100 ms for refreshing the Source Explorer
let g:SrcExpl_refreshTime = 100

" // Let the Source Explorer update the tags file when opening
let g:SrcExpl_updateTags = 1

" // Set "Enter" key to jump into the exact definition context
let g:SrcExpl_jumpKey = "<ENTER>"

" // Set "Space" key for back from the definition context
let g:SrcExpl_gobackKey = "<SPACE>"

" // In order to Avoid conflicts, the Source Explorer should know what plugins
" // are using buffers. And you need add their bufname into the list below
" // according to the command ":buffers!"
let g:SrcExpl_pluginList = [
          \ "__Tag_List__",
          \ "_NERD_tree_",
          \ "Source_Explorer"
      \ ]

" // Enable or disable local definition searching, and note that this is not
" // guaranteed to work, the Source Explorer does not check the syntax for now,
" // it only searches for a match with the keyword according to command 'gd'.
let g:SrcExpl_searchLocalDef = 1 

"Use python math module as calculator
command! -nargs=+ Calc :!python -c "from math import *; print <args>"


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" TIPS Section
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Edit another file in the same directory as the current file 
" type %/ in command prompt (:) and it will be expanded to path of current
" open buffer
if has("unix")
  cmap %/ <C-R>=expand("%:p:h") . '/'<CR>
else
  cmap %/ <C-R>=expand("%:p:h") . '\'<CR>
endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Improved Hex editing, Tip 1518 created October 3, 2007 · author Fritzophrenic 
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <LEADER>hx :Hexmode<CR>
inoremap <LEADER>hx <Esc>:Hexmode<CR>
vnoremap <LEADER>hx :<C-U>Hexmode<CR>

" ex command for toggling hex mode - define mapping if desired
command -bar Hexmode call ToggleHex()

" helper function to toggle hex mode
function ToggleHex()
  " hex mode should be considered a read-only operation
  " save values for modified and read-only for restoration later,
  " and clear the read-only flag for now
  let l:modified=&mod
  let l:oldreadonly=&readonly
  let &readonly=0
  let l:oldmodifiable=&modifiable
  let &modifiable=1
  if !exists("b:editHex") || !b:editHex
    " save old options
    let b:oldft=&ft
    let b:oldbin=&bin
    " set new options
    setlocal binary " make sure it overrides any textwidth, etc.
    let &ft="xxd"
    " set status
    let b:editHex=1
    " switch to hex editor
    %!xxd
  else
    " restore old options
    let &ft=b:oldft
    if !b:oldbin
      setlocal nobinary
    endif
    " set status
    let b:editHex=0
    " return to normal editing
    %!xxd -r
  endif
  " restore values for modified and read only state
  let &mod=l:modified
  let &readonly=l:oldreadonly
  let &modifiable=l:oldmodifiable
endfunction
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Easily switch between two styles of color scheme Tip 955 and 341
" The setcolors.vim should be put in plugin/ dir and then its auto loaded. The
" manually load it uncomment the next line:
":source setcolors.vim

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Frequently when I go to save with :w I am flying to fast and I type :W
" which gives me an obvious error.
"
" How can I map :W to :w ???
" How can I map :Q to :q ???
"
" I know there is :ZZ but I like the :w more.
"
:command! -bang W w<bang>
:command! -bang Q q<bang>
:command! -bang Wa wa<bang>
:command! -bang Qa qa<bang>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" often make the mistake of typing w1 instead of w!.
" Can you please suggest how to map w1 to w!?
if version<  700
        cnoreabbrev w1 w!
else
        cnoreabbrev  <expr>  w1  ((getcmdtype() == ':'  &&  getcmdpos()  <= 2)?   'w!' : 'w1')
endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" How can I detect my current platform in Vim? I share my configuration across platforms, and I need to set the font selectively
" Well, the key here is the has() function.
"For a quick and dirty test, use
"
"       if has('unix')
"               " unix-like platform (including Cygwin)
"       else
"               " probably Windows
"       endif
"
"For the 'guifont' option, however, you need to take care of the five
"different incompatible formats used by various versions of Vim:
    if has('gui')
        " we use has('gui') rather than has('gui_running') here
        " so it will work even if we start Console Vim first
        " then run :gui manually (which is only possible on Unix)
        if has('gui_gtk2')
            "set gfn=DejaVu\ Sans\ Mono\ 11
            "set gfn=Courier_New:h11:cDEFAULT
            set gfn=Courier_New:b:h12:cDEFAULT
        elseif has('gui_photon')
            set gfn=DejaVu\ Sans\ Mono:s11
        elseif has('gui_kde')
            " the obsolete kvim
            " just make sure it works correctly if it hits our vimrc
            set gfn=DejaVu\ Sans\ Mono/11/-1/5/50/0/0/0/1/0
        elseif has('x11')
            " I'm guessing the following (other-X11 including GTK1)
            " please check, and correct if necessary.
            " On GTK1 (and maybe some others) you can use :set gfn=*
            " Replace by asterisks like here
            " to make it a little more general:
            set gfn=-*-dejavu-medium-r-normal-*-*-110-*-*-m-*-*
            " add another elseif here
            " if you want DejaVu on mac-without-x11
       else
            " not x11 (probably Windows)
            set gfn=Courier_New:b:h12:cDEFAULT
        endif
    endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM and BASH compatability
" Tell VIM to run shell in interactive mode thus allowing for aliases to be
" loaded
"set shellcmdflag=-ic
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" For UTL 3.x 
"--- Suggested mappings for most frequent commands  [id=suggested_mappings] [
"
nmap <unique> <Leader>ge :Utl openLink underCursor edit<CR>
nmap <unique> <Leader>gu :Utl openLink underCursor edit<CR>
nmap <unique> <Leader>gE :Utl openLink underCursor split<CR>
nmap <unique> <Leader>gS :Utl openLink underCursor vsplit<CR>
nmap <unique> <Leader>gt :Utl openLink underCursor tabedit<CR>
nmap <unique> <Leader>gv :Utl openLink underCursor view<CR>
nmap <unique> <Leader>gr :Utl openLink underCursor read<CR>

vmap <unique> <Leader>ge "*y:Utl openLink visual edit<CR>
vmap <unique> <Leader>gu "*y:Utl openLink visual edit<CR>
vmap <unique> <Leader>gE "*y:Utl openLink visual split<CR>
vmap <unique> <Leader>gS "*y:Utl openLink visual vsplit<CR>
vmap <unique> <Leader>gt "*y:Utl openLink visual tabedit<CR>
vmap <unique> <Leader>gv "*y:Utl openLink visual view<CR>
vmap <unique> <Leader>gr "*y:Utl openLink visual read<CR>


nmap <unique> <Leader>cfn :Utl copyFileName underCursor native<CR>
nmap <unique> <Leader>cfs :Utl copyFileName underCursor slash<CR>
nmap <unique> <Leader>cfb :Utl copyFileName underCursor backSlash<CR>

vmap <unique> <Leader>cfn "*y:Utl copyFileName visual native<CR>
vmap <unique> <Leader>cfs "*y:Utl copyFileName visual slash<CR>
vmap <unique> <Leader>cfb "*y:Utl copyFileName visual backSlash<CR>


nmap <unique> <Leader>cl :Utl copyLink underCursor<CR>

vmap <unique> <Leader>cl "*y:Utl copyLink visual<CR>

"]
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


" Only do this part when compiled with support for autocommands.
if has("autocmd")

  " Enable file type detection.
  " Use the default filetype settings, so that mail gets 'tw' set to 72,
  " 'cindent' is on in C files, etc.
  " Also load indent files, to automatically do language-dependent indenting.
  filetype plugin indent on

  " Put these in an autocmd group, so that we can delete them easily.
  augroup vimrcEx
  au!

  " For all text files set 'textwidth' to 78 characters.
  autocmd FileType text setlocal textwidth=78

  " When editing a file, always jump to the last known cursor position.
  " Don't do it when the position is invalid or when inside an event handler
  " (happens when dropping a file on gvim).
  " Also don't do it when the mark is in the first line, that is the default
  " position when opening a file.
  autocmd BufReadPost *
    \ if line("'\"") > 1 && line("'\"") <= line("$") |
    \   exe "normal! g`\"" |
    \ endif

  augroup END

else
  set autoindent		" always set autoindenting on
endif " has("autocmd")

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.

if !exists(":DiffOrig")
  command DiffOrig vert new | set bt=nofile | r # | 0d_ | diffthis
		  \ | wincmd p | diffthis
endif

" Tip 1623 Previous Next created April 10, 2009 · complexity basic · author Ir0nh34d · version 7.0 
" Using the Windows clipboard in Cygwin Vim
if has("win32unix") "Tip will only take effect on cygwin
function! Putclip(type, ...) range
  let sel_save = &selection
  let &selection = "inclusive"
  let reg_save = @@
  if a:type == 'n'
    silent exe a:firstline . "," . a:lastline . "y"
  elseif a:type == 'c'
    silent exe a:1 . "," . a:2 . "y"
  else
    silent exe "normal! `<" . a:type . "`>y"
  endif
  call system('putclip', @@)
  let &selection = sel_save
  let @@ = reg_save
endfunction

vnoremap <silent> <leader>y :call Putclip(visualmode(), 1)<CR>
nnoremap <silent> <leader>y :call Putclip('n', 1)<CR>

com! -nargs=0 -range=% Putclip call Putclip('c', <line1>, <line2>)

function! Getclip()
  let reg_save = @@
  let @@ = system('getclip')
  setlocal paste
  exe 'normal p'
  setlocal nopaste
  let @@ = reg_save
endfunction

nnoremap <silent> <leader>p :call Getclip()<CR>
endif "if has("win32unix")

" End Tip 1623

" bye bye message
 au VimLeave * :call PrintAtExit()
   function! PrintAtExit()
       echo "Hope you had a good VIM session :) "
   endfun
```

### 61.1.2 Linux development enviorment update: Mon Jan 25 18:16:18 JST 2010

```text
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Author	Yosi Izaq
" <employer> R&D
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"set ignorecase -- turns out, I like case sensitivity 
"set list " turns out, I don't like listchars -- show chars on end of line, whitespace, etc
"autocmd GUIEnter * :simalt ~x -- having it auto maximize the screen is annoying
"autocmd BufEnter * :lcd %:p:h -- switch to current dir (breaks some scripts)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" General
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"------------------------------------------------------------
" Must have options {{{1
"
" These are highly recommended options.

" One of the most important options to activate. Allows you to switch from an
" unsaved buffer without saving it first. Also allows you to keep an undo
" history for multiple files. Vim will complain if you try to quit without
" saving, and swap files will keep you safe if your computer crashes.
set hidden

" Better command-line completion
set wildmenu

" Show partial commands in the last line of the screen
" set showcmd

" Highlight searches (use <C-L> to temporarily turn off highlighting; see the
" mapping of <C-L> below)
set hlsearch

" Modelines have historically been a source of security vulnerabilities.  As
" such, it may be a good idea to disable them and use the securemodelines
" script, <http://www.vim.org/scripts/script.php?script_id=1876>.
" set nomodeline
"------------------------------------------------------------
"------------------------------------------------------------
" Usability options {{{1
"
" These are options that users frequently set in their .vimrc. Some of them
" change Vim's behaviour in ways which deviate from the true Vi way, but
" which are considered to add usability. Which, if any, of these options to
" use is very much a personal preference, but they are harmless.

" Use case insensitive search, except when using capital letters
set ignorecase
set smartcase

" Allow backspacing over autoindent, line breaks and start of insert action
set backspace=indent,eol,start

" When opening a new line and no filetype-specific indenting is enabled, keep
" the same indent as the line you're currently on. Useful for READMEs, etc.
set autoindent

" Stop certain movements from always going to the first character of a line.
" While this behaviour deviates from that of Vi, it does what most users
" coming from other editors would expect.
"set nostartofline

" Display the cursor position on the last line of the screen or in the status
" line of a window
"set ruler

" Always display the status line, even if only one window is displayed
"set laststatus=2

" Instead of failing a command because of unsaved changes, instead raise a
" dialogue asking if you wish to save changed files.
set confirm

" Use visual bell instead of beeping when doing something wrong
set visualbell

" And reset the terminal code for the visual bell.  If visualbell is set, and
" this line is also included, vim will neither flash nor beep.  If visualbell
" is unset, this does nothing.
set t_vb=

" Enable use of the mouse for all modes
"set mouse=a

" Set the command window height to 2 lines, to avoid many cases of having to
" "press <Enter> to continue"
set cmdheight=2

" Display line numbers on the left
"set number

" Quickly time out on keycodes, but never time out on mappings
set notimeout ttimeout ttimeoutlen=200

" Use <F11> to toggle between 'paste' and 'nopaste'
"set pastetoggle=<F11>
"------------------------------------------------------------

" When started as "evim", evim.vim will already have done these settings.
if v:progname =~? "evim"
  finish
endif

set nocompatible " get out of horrible vi-compatible mode

filetype on " detect the type of file
set history=1000 " How many lines of history to remember
set cf " enable error files and error jumping
set clipboard+=unnamed " turns out I do like is sharing windows clipboard
set ffs=dos,unix,mac " support all three, in this order
filetype plugin on " load filetype plugins
set viminfo+=! " make sure it can save viminfo
set isk+=_,$,@,%,#,- " none of these should be word dividers, so make them not be

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Theme/Colors
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"set background=dark " we are using a dark background
set t_Co=256
"syntax on " syntax highlighting on
" Switch syntax highlighting on, when the terminal has colors
" Also switch on highlighting the last used search pattern.
if &t_Co > 2 || has("gui_running")
  syntax on
  set hlsearch
endif

"colorscheme breeze " my theme
"colorscheme morning " my theme
"colorscheme darkblue " my theme
"colorscheme gothic " my theme
"colorscheme aqua " my theme
"colorscheme earth " my theme
"colorscheme black_angus " my theme
"colorscheme relaxedgreen " my theme
"colorscheme darkblack  " my theme
"colorscheme freya  " my theme
"colorscheme fog  " my theme
"colorscheme motus  " my theme
"colorscheme impact  " my theme
"colorscheme less  " my theme
colorscheme desert256  " my theme

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Files/Backups
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
if has("vms")
  set nobackup		" do not keep a backup file, use versions instead
else
  set backup		" keep a backup file
endif
"set backup " make backup file
"set backupdir=$VIM\vimfiles\backup " where to put backup file
"set backupdir=/tmp/vimbackup " where to put backup file
"set directory=$VIM\vimfiles\temp " directory is the directory for temp file
set backupdir=~/vim_backup_files/ " where to put backup file
set directory=~/vim_swap_files/ " directory is the directory for temp file
"set directory=/tmp/vimtemp " directory is the directory for temp file
set makeef=error.err " When using make, where should it dump the file
set showcmd		" display incomplete commands

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Vim UI
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set lsp=0 " space it out a little more (easier to read)
set wildmenu " turn on wild menu
set ruler " Always show current positions along the bottom 
set cmdheight=2 " the command bar is 2 high
set number " turn on line numbers
set lz " do not redraw while running macros (much faster) (LazyRedraw)
set hid " you can change buffer without saving
"set backspace=2 " make backspace work normal
" allow backspacing over everything in insert mode
set backspace=indent,eol,start
set whichwrap+=<,>,h,l  " backspace and cursor keys wrap to

"set mouse=a " use mouse everywhere
" In many terminal emulators the mouse works just fine, thus enable it.
if has('mouse')
  set mouse=a
endif

set shortmess=atI " shortens messages to avoid 'press a key' prompt 
set report=0 " tell us when anything is changed via :...
set noerrorbells " don't make noise
" make the splitters between windows be blank
set fillchars=vert:\ ,stl:\ ,stlnc:\ 

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Visual Cues
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set showmatch " show matching brackets
set mat=5 " how many tenths of a second to blink matching brackets for
set nohlsearch " do not highlight searched for phrases
set incsearch " BUT do highlight as you type you search phrase
set ignorecase "set ic, ignore case in searches
"set hlsearch "highlight searched patterns
set listchars=tab:\|\ ,trail:.,extends:>,precedes:<,eol:$ " what to show when I hit :set list
"set lines=80 " 80 lines tall
"set columns=160 " 160 cols wide
set so=10 " Keep 10 lines (top/bottom) for scope
set novisualbell " don't blink
set noerrorbells " no noises
"Conventional status line:
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\ [HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
"
""Detailed stats line, including current function:
"
"function! SyntaxItem()
"  return synIDattr(synID(line("."),col("."),1),"name")
"endfunction
"
"
"if has('statusline')
"  set statusline=%#Question#                   " set highlighting
"  set statusline+=%-2.2n\                      " buffer number
"  set statusline+=%#WarningMsg#                " set highlighting
"  set statusline+=%f\                          " file name
"  set statusline+=%#Question#                  " set highlighting
"  set statusline+=%h%m%r%w\                    " flags
"  set statusline+=%{strlen(&ft)?&ft:'none'},   " file type
"  set statusline+=%{(&fenc==\"\"?&enc:&fenc)}, " encoding
"  set statusline+=%{((exists(\"+bomb\")\ &&\ &bomb)?\"B,\":\"\")} " BOM
"  set statusline+=%{&fileformat},              " file format
"  set statusline+=%{&spelllang},               " language of spelling checker
"  set statusline+=%{SyntaxItem()}              " syntax highlight group under cursor
"  set statusline+=%=                           " ident to the right
"  set statusline+=[LEN=%L]\                    " File length in lines
"  set statusline+=[ASCII=\%03.3b]\	       " ASCII code for character under cursor
"  set statusline+=0x%-8B\                      " character hexadecimal code 
"  set statusline+=%-7.(%l,%c%V%)\ %<%P         " cursor position/offset
"endif
"
""end of 
""Detailed stats line, including current function:

set laststatus=2 " always show the status line

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Text Formatting/Layout
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set fo=tcrqn " See Help (complex)
set ai " autoindent
set si " smartindent 
set cindent " do c-style indenting
set tabstop=8 " tab spacing (settings below are just to unify it)
set softtabstop=8 " unify
set shiftwidth=8 " unify 
"Settings for ACS code conventions no tabs, instead four spaces.
"set noexpandtab " real tabs please!
set tabstop=4
set expandtab
"set nowrap " do not wrap lines  
set smarttab " use tabs at the start of a line, spaces elsewhere

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Folding
"    Enable folding, but by default make it act like folding is off, because folding is annoying in anything but a few rare cases
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
set foldenable " Turn on folding
set foldmethod=indent " Make folding indent sensitive
set foldlevel=100 " Don't autofold anything (but I can still fold manually)
set foldopen-=search " don't open folds when you search into them
set foldopen-=undo " don't open folds when you undo stuff

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" File Explorer
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:explVertical=1 " should I split verticially
let g:explWinSize=35 " width of 35 pixels

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Win Manager
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:winManagerWidth=35 " How wide should it be( pixels)
let g:winManagerWindowLayout = 'FileExplorer,TagsExplorer|BufExplorer' " What windows should it

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" CTags
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" only set Tlist_Ctags_Cmd if its not in path. 
"let Tlist_Ctags_Cmd = '/usr/local/bin/'.'\ctags.exe' " Location of ctags
let Tlist_Sort_Type = "name" " order by 
let Tlist_Use_Right_Window = 1 " split to the right side of the screen
let Tlist_Compart_Format = 1 " show small meny
let Tlist_Exist_OnlyWindow = 1 " if you are the last, kill yourself
let Tlist_File_Fold_Auto_Close = 0 " Do not close tags for other files
let Tlist_Enable_Fold_Column = 0 " Do not show folding tree

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Minibuf
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let g:miniBufExplTabWrap = 1 " make tabs show complete (no broken on two lines)
let g:miniBufExplModSelTarget = 1

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Matchit
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let b:match_ignorecase = 1

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Perl
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
let perl_extended_vars=1 " highlight advanced perl vars inside strings

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Custom Functions
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Select range, then hit :SuperRetab($width) - by p0g and FallingCow
function! SuperRetab(width) range
	silent! exe a:firstline . ',' . a:lastline . 's/\v%(^ *)@<= {'. a:width .'}/\t/g'
endfunction

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Mappings, maps, my maps
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"map <right> <ESC>:MBEbn<RETURN> " right arrow (normal mode) switches buffers  (excluding minibuf)
"map <left> <ESC>:MBEbp<RETURN> " left arrow (normal mode) switches buffers (excluding minibuf) 
"map <up> <ESC>:Sex<RETURN><ESC><C-W><C-W> " up arrow (normal mode) brings up a file list
"map <down> <ESC>:Tlist<RETURN> " down arrow  (normal mode) brings up the tag list
"map <A-i> i <ESC>r " alt-i (normal mode) inserts a single char, and then switches back to normal
"map <F2> <ESC>ggVG:call SuperRetab()<left>
"map <F12> ggVGg? " encypt the file (toggle)
"
"Send output of the last g/patter/ search to a new window
nmap <F3> :redir @a<CR>:g//<CR>:redir END<CR>:new<CR>:put! a<CR><CR>

"Map F5 to add new entry to TOC based on following logic, take the previous entry and add 1 to the last digit
map <F5> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o<ESC>p0E<C-A>a<ESC>
"Map F6 to add new entry to TOC based on following logic, take the previous entry and add .1 after the last digit
"map <F6> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o    <ESC>p0Ea.1 
map <F6> <ESC>ms?^\s*\(\d\+\.\)\+\d*<CR>Y<CR>`so<ESC>PI<TAB><ESC>Ea.1<ESC>WDo<ESC>

"Map ctrl-s+d to add [done] to end of line, this usefull for filling done status for
" p -> pending, o -> open, w - work in progress
map <C-s><C-d> A [Done]<esc>
map <C-s><C-p> A [Pending]<esc>
map <C-s><C-o> A [Open]<esc>
map <C-s><C-w> A [Work In Progress]<esc>

"Maps for quoting a visuall selected text with ',", (), [] and {} 
vnoremap qq <Esc>`>a'<Esc>`<i'<Esc>
vnoremap q" <Esc>`>a"<Esc>`<i"<Esc>
vnoremap q( <Esc>`>a)<Esc>`<i(<Esc>
vnoremap q[ <Esc>`>a]<Esc>`<i[<Esc>
vnoremap q{ <Esc>`>a}<Esc>`<i{<Esc>

"Maps for getting current time. t? in normal mode and ctrl+t in insert mode
map t? :echo 'Current time is ' . strftime('%c')<CR>
map! <C-t><C-t>		<C-R>=strftime('%c')<CR><Esc>
" The following command maps ctrl+d to insert the directory name of the current buffer:
inoremap <C-d> <C-R>=expand('%:p:h')<CR>

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Autocommands
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
autocmd BufEnter * :syntax sync fromstart " ensure every file does syntax highlighting (full)
au BufNewFile,BufRead *.asp :set ft=aspjscript " all my .asp files ARE jscript
au BufNewFile,BufRead *.tpl :set ft=html " all my .tpl files ARE html
au BufNewFile,BufRead *.hta :set ft=html " all my .tpl files ARE html

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Useful abbrevs
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
iab xasp <%@language=jscript%><CR><%<CR><TAB><CR><BS>%><ESC><<O<TAB>
iab xdate <c-r>=strftime("%d/%m/%y %H:%M:%S")<cr> 

"csuppot plugin.
let g:C_AuthorName      = 'Yosi Izaq'    
let g:C_AuthorRef       = 'Y.I.'                         
let g:C_Email           = '<email>'                    
let g:C_Company         = '<employer>'     
let g:C_Template_Directory  =  $HOME."/.vim/plugin/templates/"

"Python support
"au FileType python /cygdrive/d/Documents\ and\ Settings/<user>/.vim/plugin/python.vim 
au FileType python $HOME."plugin/python.vim"

"perl support plugin
let g:Perl_AuthorName      = 'Yosi Izaq'     
let g:Perl_AuthorRef       = 'YI'                         
let g:Perl_Email           = '<email>'            
let g:Perl_Company         = '<employer>'    

"Latex suite plugin
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

" For recording
:nnoremap <space> @q

" Auto save and load working session
" function! MakeSession()
"     let b:sessiondir = $HOME . "/.vim/sessions" . getcwd()
"     if (filewritable(b:sessiondir) != 2)
"         exe 'silent !mkdir -p ' b:sessiondir
"         redraw!
"     endif
"     let b:filename = b:sessiondir . '/session.vim'
"     exe "mksession! " . b:filename
" endfunction
" 
" function! LoadSession()
"     let b:sessiondir  = $HOME . "/.vim/sessions" . getcwd()
"     let b:sessionfile = b:sessiondir . "/session.vim"
"     if (filereadable(b:sessionfile))
"         exe 'source ' b:sessionfile
"     else
"         echo "No session loaded."
"     endif
" endfunction
" 
" au VimEnter * :call LoadSession()
" au VimLeave * :call MakeSession()
"

" For cppomnicomplete
"set nocp
"filetype plugin on
"map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q
" settings based on tip 1608
" configure tags - add additional tags here or comment out not-used ones
set tags+=~/.vim/tags/cpp/tags
set tags+=~/.vim/tags/acs_5_1/tags
" build tags of your own project with CTRL+F12
map <C-F12> :!ctags -R --c++-kinds=+p --fields=+iaS --extra=+q .<CR>

" OmniCppComplete
let OmniCpp_NamespaceSearch = 1
let OmniCpp_GlobalScopeSearch = 1
let OmniCpp_ShowAccess = 1
let OmniCpp_MayCompleteDot = 1
let OmniCpp_MayCompleteArrow = 1
let OmniCpp_MayCompleteScope = 1
let OmniCpp_DefaultNamespaces = ["std", "_GLIBCXX_STD"]
" automatically open and close the popup menu / preview window
au CursorMovedI,InsertLeave * if pumvisible() == 0|silent! pclose|endif
set completeopt=menuone,menu,longest,preview

" To view word docs with vim, uses antiword
autocmd BufReadPre *.doc set ro
autocmd BufReadPre *.doc set hlsearch!
autocmd BufReadPost *.doc %!antiword "%"

" To view and diff PDF files using xpdf
autocmd BufReadPre *.pdf set ro
autocmd BufReadPost *.pdf %!pdftotext -nopgbrk "%" -

" grep mappings
map <leader>n :cn<cr>
map <leader>p :cp<cr>
map <leader>c :botright cw 10<cr>

"text.vim plugin
au BufRead,BufNewFile *  setfiletype txt

" XMLFolding plugin
au BufNewFile,BufRead *.xml,*.htm,*.html so XMLFolding

"Compile and build command for systems that use maven
"set makeprg=mvnc\ %<
"
"Compile and build command for systems that use GNU make
set makeprg=makec\ %<

"for dbext
let g:dbext_default_profile_usual = 'type=SYBASE:user=DBA:passwd=sql'


" My personal menu
amenu MyMenu.HighlighCtxt       :match ToDo /^\s\+-\+>.*$/<cr>
amenu MyMenu.KBEntries          :match StatusLine /^\s*\d\+\..*$/<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveBuffers     :silent bufdo !tar -rvf ~/temp/vim_archive.tar %:p<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.highlight          :set cursorline<cr>
amenu MyMenu.highlightV         :set cursorcolumn<cr>
amenu MyMenu.-SEP-      :   
vmenu MyMenu.makeArrowList              :call ArrowList()<cr>
vmenu MyMenu.makeNumberList             :call NumberList()<cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.InsertFileLink             :s/^.*$/&\r<URL:[File Path]><cr>
amenu MyMenu.InsertLocalLink            :s/^.*$/&\r<URL:#tn=[pattern in file]><cr>
amenu MyMenu.-SEP-      :   
amenu MyMenu.ArchiveModifiedBuffers            :call Archive_all_modified_buffers()<cr>

" My ACS 5, linux develoment environment clearcase menu
amenu MyCCMenu.checkout       :! co % <cr>
amenu MyCCMenu.checkin       :! ci % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.version_tree       :! ct lsvtree -g % <cr>
amenu MyCCMenu.diff_pred       :! ct diff -pred -graph % <cr>
amenu MyCCMenu.-SEP-      :   
amenu MyCCMenu.checkin_all       :call CheckIn_all__buffers()<cr>
amenu MyCCMenu.manually_set_tags_for_auto_complete       :set tags+=~/.vim/tags/acs_5_1/tags<cr>:set tags+=~/.vim/tags/cpp/tags<cr>

"Custom functions
function! Archive_all_modified_buffers()
    set hidden
    let archive=[]
    bufdo if &modified |  call add(archive, shellescape(expand("%"),1))| endif
    
    if len(archive) > 0
       exe "!tar -cvjf archive.tar.bz2 " . join(archive, " ")
    endif
endfunction

function! Perform_Shell_Test_all__buffers()
bufdo exe "!test -f " . expand("%") ."  > /dev/null"
    \ | if !v:shell_error
    \ | echo "passed"
    \ | endif
endfunction

function! CheckIn_all__buffers()
bufdo exe "!ct ls  " . expand("%") ." | grep -i checkedout > /dev/null"
    \ | if !v:shell_error
    \ | echo "file is checked out"
    \ | exe "!ci " . expand("%")
    \ | endif
endfunction

set dictionary-=/cygdrive/z/work/dictionary/brit-a-z.txt dictionary+=/cygdrive/z/work/dictionary/brit-a-z.txt
set complete-=k complete+=k

if has("win32unix") "Tip will only take effect on cygwin
set complete=.,w,b,u,k
elseif  has("win32") 
set complete=.,w,b,u,k
else "Unix, where my source code is
set complete=.,w,b,u,k,i,]
endif

set viewdir=$HOME/.vim/views

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Creating lists
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
function! ArrowList()
        let lineno = line(".")
        call setline(lineno, "    -> " . getline(lineno))
endfunction

function! NumberList() range
        "Set line numbers in front of lines
        let begining=line("'<")
        let ending=line("'>")
        let difsize = ending -begining +1
        let pre = ' ' 
        while (begining <= ending)
                if match(difsize, '^9*$') == 0
                        let pre = pre . ' ' 
                endif
                call setline(ending, pre . difsize . "\t" . getline(ending))
                let ending = ending-1
                let difsize = difsize-1
        endwhile
endfunction

""" VIM commander map
noremap <silent> <F11> :cal VimCommanderToggle()<CR>
let b:vimcommander_install_doc=0

""" C support turn off annoying messages
let s:C_TemplateOverwrittenMsg='no'

"Functions
"" Commenting of #endifs etc
"" Author: Ben Schmidt, minor modifications by A. S. Budden.
"command SmartPreProcCommenter call SmartPreProcCommenter()
"
"function! SmartPreProcCommenter()
"  mark y
"  let saved_wrapscan=&wrapscan
"  set nowrapscan
"  let elsecomment=""
"  let endcomment=""
"  try
"    " Find the last #if in the buffer
"    $?^\s*#if
"    while 1
"      " Build the comments for later use, based on current line
"      let content=getline('.')
"      let elsecomment=BuildElseComment(content,elsecomment)
"      let endcomment=BuildEndComment(content,endcomment)
"      " Change # into ## so we know we've already processed this one
"      " and don't find it again
"      s/^\s*\zs#/##
"      " Find the next #else, #elif, #endif which must belong to this #if
"      /^\s*#\(elif\|else\|endif\)
"      let content=getline('.')
"      if match(content,'^\s*#elif') != -1
"        " For #elif, treat the same as #if, i.e. build new comments
"        continue
"      elseif match(content,'^\s*#else') != -1
"        " For #else, add/replace the comment
"        call setline('.',ReplaceComment(content,elsecomment))
"        s/^\s*\zs#/##
"        " Find the #endif
"        /^\s*#endif
"      endif
"      " We should be at the #endif now; add/replace the comment
"      call setline('.',ReplaceComment(getline('.'),endcomment))
"      s/^\s*\zs#/##
"      " Find the previous #if
"      ?^\s*#if
"    endwhile
"  catch /search hit TOP/
"    " Once we have an error (pattern not found, i.e. no more left)
"    " Change all our ## markers back to #
"    silent! %s/^\s*\zs##/#
"  endtry
"  let &wrapscan=saved_wrapscan
"  normal `y
"endfunc
"
"let s:PreProcCommentMatcher = '#\a\+\s\+\zs.\{-}\ze\(\s*\/\*.\{-}\*\/\)\?\s*$'
"
"function! BuildElseComment(content,previous)
"  let expression=escape(matchstr(a:content,s:PreProcCommentMatcher), '\~&')
"  if match(a:content,'#ifdef') != -1
"    return "/* NOT def ".expression." */"
"  elseif match(a:content,'#ifndef') != -1
"    return "/* def ".expression." */"
"  elseif match(a:content,'#if') != -1
"    return "/* NOT ".expression." */"
"  elseif match(a:content,'#elif') != -1
"    return substitute(a:previous,' \*/',', '.expression.' */','')
"  else
"    return ""
"  endif
"endfunc
"
"function! BuildEndComment(content,previous)
"  let expression=escape(matchstr(a:content,s:PreProcCommentMatcher), '\~&')
"  if match(a:content,'#ifdef') != -1
"    return "/* def ".expression." */"
"  elseif match(a:content,'#ifndef') != -1
"    return "/* NOT def ".expression." */"
"  elseif match(a:content,'#if') != -1
"    return "/* ".expression." */"
"  elseif match(a:content,'#elif') != -1
"    return substitute(a:previous,' \*/',', '.expression.' */','')
"  else
"    return ""
"  endif
"endfunc
"
"function! ReplaceComment(content,comment)
"  let existing=escape(matchstr(a:content,'#\a\+\s\+\zs.\{-}\s*$'), '\~&')
"  if existing == ""
"    return substitute(a:content,'^\s*#\a\+\zs.*'," ".a:comment,'')
"  elseif existing != a:comment && match(existing,'XXX') == -1
"    return a:content." /* XXX */"
"  else
"    return a:content
"  endif
"endfunc
"
"

"Cscope auto mapping
nmap <F12> :!find . -iname '*.c' -o -iname '*.cpp' -o -iname '*.h' -o -iname '*.hpp' > cscope.files ;
  \ cs kill -1<CR>:cs add cscope.out<CR>

"Cscope qury results go to quickfix
if has('cscope')
" In case cscope.out is in home dir
 "if filereadable(expand("$HOME/cscope.out"))
" In case cscope.out is in dir from which VIM is opned
 if filereadable(expand("cscope.out"))
   cs kill -1
   cs add ~/cscope.out
 endif
 set cscopeverbose
 set cscopequickfix=s-,c-,d-,i-,t-,e-,g-
endif

set tags+=tags,~/tags,~/stl-tags

"switch back to normal mode automatically after inaction
"au! CursorHoldI * stopinsert

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Source explorer http://www.vim.org/scripts/script.php?script_id=2179 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" // The switch of the Source Explorer
nmap <F8> :SrcExplToggle<CR>

" // Set the window height of Source Explorer
  let g:SrcExpl_winHeight = 8

" // Set 100 ms for refreshing the Source Explorer
let g:SrcExpl_refreshTime = 100

" // Let the Source Explorer update the tags file when opening
let g:SrcExpl_updateTags = 1

" // Set "Enter" key to jump into the exact definition context
let g:SrcExpl_jumpKey = "<ENTER>"

" // Set "Space" key for back from the definition context
let g:SrcExpl_gobackKey = "<SPACE>"

" // In order to Avoid conflicts, the Source Explorer should know what plugins
" // are using buffers. And you need add their bufname into the list below
" // according to the command ":buffers!"
let g:SrcExpl_pluginList = [
          \ "__Tag_List__",
          \ "_NERD_tree_",
          \ "Source_Explorer"
      \ ]

" // Enable or disable local definition searching, and note that this is not
" // guaranteed to work, the Source Explorer does not check the syntax for now,
" // it only searches for a match with the keyword according to command 'gd'.
let g:SrcExpl_searchLocalDef = 1 

"Use python math module as calculator
command! -nargs=+ Calc :!python -c "from math import *; print <args>"


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" TIPS Section
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"Edit another file in the same directory as the current file 
" type %/ in command prompt (:) and it will be expanded to path of current
" open buffer
if has("unix")
  cmap %/ <C-R>=expand("%:p:h") . '/'<CR>
else
  cmap %/ <C-R>=expand("%:p:h") . '\'<CR>
endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Improved Hex editing, Tip 1518 created October 3, 2007 · author Fritzophrenic 
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
nnoremap <LEADER>hx :Hexmode<CR>
inoremap <LEADER>hx <Esc>:Hexmode<CR>
vnoremap <LEADER>hx :<C-U>Hexmode<CR>

" ex command for toggling hex mode - define mapping if desired
command -bar Hexmode call ToggleHex()

" helper function to toggle hex mode
function ToggleHex()
  " hex mode should be considered a read-only operation
  " save values for modified and read-only for restoration later,
  " and clear the read-only flag for now
  let l:modified=&mod
  let l:oldreadonly=&readonly
  let &readonly=0
  let l:oldmodifiable=&modifiable
  let &modifiable=1
  if !exists("b:editHex") || !b:editHex
    " save old options
    let b:oldft=&ft
    let b:oldbin=&bin
    " set new options
    setlocal binary " make sure it overrides any textwidth, etc.
    let &ft="xxd"
    " set status
    let b:editHex=1
    " switch to hex editor
    %!xxd
  else
    " restore old options
    let &ft=b:oldft
    if !b:oldbin
      setlocal nobinary
    endif
    " set status
    let b:editHex=0
    " return to normal editing
    %!xxd -r
  endif
  " restore values for modified and read only state
  let &mod=l:modified
  let &readonly=l:oldreadonly
  let &modifiable=l:oldmodifiable
endfunction
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Easily switch between two styles of color scheme Tip 955 and 341
" The setcolors.vim should be put in plugin/ dir and then its auto loaded. The
" manually load it uncomment the next line:
":source setcolors.vim

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Frequently when I go to save with :w I am flying to fast and I type :W
" which gives me an obvious error.
"
" How can I map :W to :w ???
" How can I map :Q to :q ???
"
" I know there is :ZZ but I like the :w more.
"
:command! -bang W w<bang>
:command! -bang Q q<bang>
:command! -bang Wa wa<bang>
:command! -bang Qa qa<bang>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" often make the mistake of typing w1 instead of w!.
" Can you please suggest how to map w1 to w!?
if version<  700
        cnoreabbrev w1 w!
else
        cnoreabbrev  <expr>  w1  ((getcmdtype() == ':'  &&  getcmdpos()  <= 2)?   'w!' : 'w1')
endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" How can I detect my current platform in Vim? I share my configuration across platforms, and I need to set the font selectively
" Well, the key here is the has() function.
"For a quick and dirty test, use
"
"       if has('unix')
"               " unix-like platform (including Cygwin)
"       else
"               " probably Windows
"       endif
"
"For the 'guifont' option, however, you need to take care of the five
"different incompatible formats used by various versions of Vim:
"    if has('gui')
"        " we use has('gui') rather than has('gui_running') here
"        " so it will work even if we start Console Vim first
"        " then run :gui manually (which is only possible on Unix)
"        if has('gui_gtk2')
"            set gfn=DejaVu\ Sans\ Mono\ 11
"        elseif has('gui_photon')
"            set gfn=DejaVu\ Sans\ Mono:s11
"        elseif has('gui_kde')
"            " the obsolete kvim
"            " just make sure it works correctly if it hits our vimrc
"            set gfn=DejaVu\ Sans\ Mono/11/-1/5/50/0/0/0/1/0
"        elseif has('x11')
"            " I'm guessing the following (other-X11 including GTK1)
"            " please check, and correct if necessary.
"            " On GTK1 (and maybe some others) you can use :set gfn=*
"            " Replace by asterisks like here
"            " to make it a little more general:
"            set gfn=-*-dejavu-medium-r-normal-*-*-110-*-*-m-*-*
"            " add another elseif here
"            " if you want DejaVu on mac-without-x11
"       else
"            " not x11 (probably Windows)
"            set gfn=Courier_New:h11:cDEFAULT
"        endif
"    endif
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" VIM and BASH compatability
" Tell VIM to run shell in interactive mode thus allowing for aliases to be
" loaded
set shellcmdflag=-ic
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" For UTL 3.x 
"--- Suggested mappings for most frequent commands  [id=suggested_mappings] [
"
nmap <unique> <Leader>ge :Utl openLink underCursor edit<CR>
nmap <unique> <Leader>gu :Utl openLink underCursor edit<CR>
nmap <unique> <Leader>gE :Utl openLink underCursor split<CR>
nmap <unique> <Leader>gS :Utl openLink underCursor vsplit<CR>
nmap <unique> <Leader>gt :Utl openLink underCursor tabedit<CR>
nmap <unique> <Leader>gv :Utl openLink underCursor view<CR>
nmap <unique> <Leader>gr :Utl openLink underCursor read<CR>

vmap <unique> <Leader>ge "*y:Utl openLink visual edit<CR>
vmap <unique> <Leader>gu "*y:Utl openLink visual edit<CR>
vmap <unique> <Leader>gE "*y:Utl openLink visual split<CR>
vmap <unique> <Leader>gS "*y:Utl openLink visual vsplit<CR>
vmap <unique> <Leader>gt "*y:Utl openLink visual tabedit<CR>
vmap <unique> <Leader>gv "*y:Utl openLink visual view<CR>
vmap <unique> <Leader>gr "*y:Utl openLink visual read<CR>


nmap <unique> <Leader>cfn :Utl copyFileName underCursor native<CR>
nmap <unique> <Leader>cfs :Utl copyFileName underCursor slash<CR>
nmap <unique> <Leader>cfb :Utl copyFileName underCursor backSlash<CR>

vmap <unique> <Leader>cfn "*y:Utl copyFileName visual native<CR>
vmap <unique> <Leader>cfs "*y:Utl copyFileName visual slash<CR>
vmap <unique> <Leader>cfb "*y:Utl copyFileName visual backSlash<CR>


nmap <unique> <Leader>cl :Utl copyLink underCursor<CR>

vmap <unique> <Leader>cl "*y:Utl copyLink visual<CR>

"]
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Enter Tip
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""


" Only do this part when compiled with support for autocommands.
if has("autocmd")

  " Enable file type detection.
  " Use the default filetype settings, so that mail gets 'tw' set to 72,
  " 'cindent' is on in C files, etc.
  " Also load indent files, to automatically do language-dependent indenting.
  filetype plugin indent on

  " Put these in an autocmd group, so that we can delete them easily.
  augroup vimrcEx
  au!

  " For all text files set 'textwidth' to 78 characters.
  autocmd FileType text setlocal textwidth=78

  " When editing a file, always jump to the last known cursor position.
  " Don't do it when the position is invalid or when inside an event handler
  " (happens when dropping a file on gvim).
  " Also don't do it when the mark is in the first line, that is the default
  " position when opening a file.
  autocmd BufReadPost *
    \ if line("'\"") > 1 && line("'\"") <= line("$") |
    \   exe "normal! g`\"" |
    \ endif

  augroup END

else

  set autoindent		" always set autoindenting on

endif " has("autocmd")

" Convenient command to see the difference between the current buffer and the
" file it was loaded from, thus the changes you made.
" Only define it when not defined already.
if !exists(":DiffOrig")
  command DiffOrig vert new | set bt=nofile | r # | 0d_ | diffthis
		  \ | wincmd p | diffthis
endif

" bye bye message
 au VimLeave * :call PrintAtExit()
   function! PrintAtExit()
       echo "Hope you had a good VIM session :) "
   endfun


		61.1.3
```
