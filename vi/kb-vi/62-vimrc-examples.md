---
type: reference
title: vimrc examples
description: Section 61 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#61"
---

# vimrc examples

[↑ KB_vi](/vi/kb-vi/README.md)

## 61.1 My own

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

## 61.2 Other

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
