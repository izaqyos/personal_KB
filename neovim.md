---
type: reference
title: Neovim Knowledge Base
description: "Neovim knowledge base: install, configuration and migrated legacy notes."
tags: [neovim, vim, configuration-file, reference]
author: Yosi Izaq
status: stable
capture_type: compiled
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2027-04-14T00:00:00Z"
sources:
  - { id: nvim-releases, resource: "https://github.com/neovim/neovim/releases", title: "Neovim releases (GitHub)" }
  - { id: nvim-pack, resource: "https://neovim.io/doc/user/pack.html", title: "Neovim docs: vim.pack plugin manager" }
  - { id: lazy-nvim, resource: "https://lazy.folke.io/installation", title: "lazy.nvim: Installation" }
  - { id: nvim-treesitter, resource: "https://github.com/nvim-treesitter/nvim-treesitter", title: "nvim-treesitter README (main branch)" }
  - { id: nvim-lsp, resource: "https://neovim.io/doc/user/lsp.html", title: "Neovim docs: LSP (lsp.txt)" }
  - { id: nvim-lspconfig, resource: "https://github.com/neovim/nvim-lspconfig", title: "nvim-lspconfig README" }
  - { id: nvim-deprecated, resource: "https://neovim.io/doc/user/deprecated.html", title: "Neovim docs: Deprecated features" }
  - { id: nvim-cmp, resource: "https://github.com/hrsh7th/nvim-cmp", title: "nvim-cmp README" }
  - { id: blink-cmp, resource: "https://github.com/saghen/blink.cmp", title: "blink.cmp README" }
---

# Neovim Knowledge Base

> **Source:** Personal notes
> **Author:** Yosi Izaq
> **Captured:** Unknown
> **Status:** Active
> **Type:** compiled

---

  - [install](#install)
  - [configuration](#configuration)
    - [initial configuration](#initial-configuration)


## install ##
	$ brew install nvim 

## configuration <a name=configuration> <\a> ##

### initial configuration  ###
		On first launch the ~/.local/share/nvim/{shada,swap} directories are auto-generated.

Manually create a new ~/.config/nvim directory and a init.vim configuration file ...

$ mkdir ~/.config/nvim
$ touch ~/.config/nvim/init.vim
Options I set in my init.vim ...

set nocompatible            " disable compatibility to old-time vi
set showmatch               " show matching brackets.
set ignorecase              " case insensitive matching
set mouse=v                 " middle-click paste with mouse
set hlsearch                " highlight search results
set autoindent              " indent a new line the same amount as the line just typed
set number                  " add line numbers
set wildmode=longest,list   " get bash-like tab completions
set cc=80                   " set an 80 column border for good coding style
filetype plugin indent on   " allows auto-indenting depending on file type
set tabstop=4               " number of columns occupied by a tab character
set expandtab               " converts tabs to white space
set shiftwidth=4            " width for autoindents
set softtabstop=4           " see multiple spaces as tabstops so <BS> does the right thing

#### 1.2.2 vim plugin manager

> Updated 2026-10 to current practice.[^nvim-releases]

My original setup used **vim-plug**. It still works, but most Lua-era configs now use either:

- **`vim.pack`** — the plugin manager built into Neovim 0.12+ (its docs still call it experimental, "yet should be stable enough for daily use"), or
- **lazy.nvim** — the most common third-party manager (also used in [the CodeCompanion note](/neovim-codecompanion.md)).

Built-in `vim.pack` (Neovim 0.12+), in `~/.config/nvim/init.lua`:[^nvim-pack]

```lua
vim.pack.add({
  'https://github.com/neovim/nvim-lspconfig',
  { src = 'https://github.com/nvim-treesitter/nvim-treesitter', version = 'main' },
})
-- update later with :packupdate
```

lazy.nvim single-file bootstrap (from its install docs):[^lazy-nvim]

```lua
local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
if not (vim.uv or vim.loop).fs_stat(lazypath) then
  local lazyrepo = "https://github.com/folke/lazy.nvim.git"
  local out = vim.fn.system({ "git", "clone", "--filter=blob:none", "--branch=stable", lazyrepo, lazypath })
  if vim.v.shell_error ~= 0 then
    vim.api.nvim_echo({ { "Failed to clone lazy.nvim:\n", "ErrorMsg" }, { out, "WarningMsg" } }, true, {})
    os.exit(1)
  end
end
vim.opt.rtp:prepend(lazypath)

require("lazy").setup({
  spec = {
    { "neovim/nvim-lspconfig" },
    { "nvim-treesitter/nvim-treesitter", lazy = false, build = ":TSUpdate" },
  },
})
```

The original vim-plug notes, kept for reference (still valid if you stay on vim-plug):

##### 1.2.2.1 install vim-plug

```sh
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

Setup a directory to hold plugins, install plugins (example: nord-vim color scheme), and initialize ...

##### 1.2.2.2 My setup

All plugins code go to `/Users/<user>/.config/nvim/vim-plug/plugins.vim`, sourced from `init.vim`. Check status with `:PlugStatus`; install with `:PlugInstall`.

##### 1.2.2.3 other setups

```vim
" specify directory for plugins
call plug#begin('~/.config/nvim/plugged')
Plug 'arcticicestudio/nord-vim'
" initialize plugin system
call plug#end()
```

More advanced and portable configuration (https://numbersmithy.com/migrating-from-vim-to-neovim-at-the-beginning-of-2022/): Neovim uses two separate locations — the config folder `stdpath('config')` (default `~/.config/nvim/`) and the data folder `stdpath('data')` (default `~/.local/share/nvim/`). The snippet below auto-downloads vim-plug into the config folder (if missing) and installs the plugins:

```vim
" auto install vim-plug and plugins:
let plug_install = 0
let autoload_plug_path = stdpath('config') . '/autoload/plug.vim'
if !filereadable(autoload_plug_path)
    execute '!curl -fL --create-dirs -o ' . autoload_plug_path .
        \ ' https://raw.github.com/junegunn/vim-plug/master/plug.vim'
    execute 'source ' . fnameescape(autoload_plug_path)
    let plug_install = 1
endif
unlet autoload_plug_path
call plug#begin(stdpath('config') . '/plugged')
" plugins here ...
Plug 'scrooloose/nerdtree'
call plug#end()
call plug#helptags()
" auto install vim-plug and plugins:
if plug_install
    PlugInstall --sync
endif
unlet plug_install
```

After populating the plugin list between `plug#begin()` and `plug#end()`, run `:PlugInstall`.

#### 1.2.3 syntax highlighting nvim-treesitter

> Updated 2026-10 to current practice.[^nvim-treesitter]

Tree-sitter is an incremental parser; Neovim uses it (instead of regex-based `:syntax`) for more accurate highlighting, folding and text objects. The highlighting engine itself is **built into Neovim** (`:h treesitter-highlight`); the **nvim-treesitter** plugin now mainly installs/updates parsers and ships queries.

**Breaking change:** nvim-treesitter's `main` branch is "a full, incompatible, rewrite". The old `require'nvim-treesitter.configs'.setup{ ensure_installed=…, highlight={enable=true} }` API no longer exists there. Choose one:

- **`main` branch (current)** — requires Neovim 0.12.0+, `tar`, `curl`, a C compiler, and `tree-sitter-cli` 0.26.1+ installed via your OS package manager (e.g. `brew install tree-sitter-cli`), not npm. It does not support lazy-loading.
- **`master` branch** — locked/frozen, kept for backward compatibility with Neovim 0.11. Pin it explicitly if you can't upgrade; the old config below still applies there.

Install (lazy.nvim spec; with vim-plug: `Plug 'nvim-treesitter/nvim-treesitter', { 'branch': 'main', 'do': ':TSUpdate' }`):

```lua
{ 'nvim-treesitter/nvim-treesitter', lazy = false, build = ':TSUpdate' }
```

Config on the `main` branch:

```lua
-- optional; defaults are fine
require('nvim-treesitter').setup {
  install_dir = vim.fn.stdpath('data') .. '/site',
}

-- install parsers (async; no-op for already-installed ones)
require('nvim-treesitter').install { 'python', 'fortran', 'bash', 'c', 'cpp', 'bibtex', 'latex' }

-- highlighting, folding and indent are enabled per filetype
vim.api.nvim_create_autocmd('FileType', {
  pattern = { 'python', 'fortran', 'sh', 'c', 'cpp', 'bib', 'tex' },
  callback = function()
    vim.treesitter.start()                                   -- highlighting
    vim.wo[0][0].foldexpr = 'v:lua.vim.treesitter.foldexpr()'
    vim.wo[0][0].foldmethod = 'expr'
    -- indent is experimental; I keep it off for python (it messed up indentation before)
    -- vim.bo.indentexpr = "v:lua.require'nvim-treesitter'.indentexpr()"
  end,
})
```

Notes:

- For scripted/bootstrap installs, wait for completion: `require('nvim-treesitter').install({ 'python' }):wait(300000)`.
- After upgrading the plugin, run `:TSUpdate` so all installed parsers match.
- The old fold setting `set foldexpr=nvim_treesitter#foldexpr()` is replaced by Neovim's built-in `vim.treesitter.foldexpr()` (above).

Original config (only valid on the frozen `master` branch with Neovim 0.11):

```vim
lua <<EOF
require'nvim-treesitter.configs'.setup {
  ensure_installed = { "python", "fortran", "bash", "c", "cpp", "bibtex", "latex" },
  sync_install = false,
  ignore_install = { "haskell" },
  highlight = { enable = true, additional_vim_regex_highlighting = false },
  indent = { enable = false },  -- dont enable this, messes up python indentation
}
EOF
```

#### 1.2.4 LSP

> Updated 2026-10 to current practice.[^nvim-lsp]

Language Server Protocol (LSP) is a standard (created by Microsoft) that lets n editors talk to m language servers through one protocol, reducing n × m integrations to n + m. Neovim has a built-in LSP client; since **Neovim 0.11** servers are configured natively with `vim.lsp.config()` and activated with `vim.lsp.enable()`. Current stable is Neovim 0.12.x (0.12.6, 2026-10-09).[^nvim-releases]

The key components:

- **LSP**: the standard.
- **Neovim's built-in client** (`vim.lsp`): talks to the servers.
- **nvim-lspconfig**: now just a collection of ready-made server configs (`lsp/<name>.lua`: `cmd`, `filetypes`, `root_markers`, …) that `vim.lsp.enable()` picks up. It requires Nvim 0.11.3+. Its old `require('lspconfig').<server>.setup{}` framework is deprecated — calls to `require('lspconfig')` warn and will later error.[^nvim-lspconfig]
- **The language server**: e.g. pyright or pylsp for Python, clangd for C; installed in the OS, outside Neovim.
- **A completion UI**: optional — Neovim 0.11+ has built-in LSP completion (`vim.lsp.completion`), or use a plugin (see 1.2.5).

Steps to set up LSP for Python:

1. Install a server outside Neovim, e.g. `npm install -g pyright`, `pip install 'python-lsp-server[all]'` (pylsp), or `pip install jedi-language-server`.
2. Install nvim-lspconfig (optional but convenient — otherwise define `cmd`/`filetypes`/`root_markers` yourself).
3. Optionally override settings with `vim.lsp.config('<name>', {...})`, then call `vim.lsp.enable('<name>')`.
4. Open a Python file; `:checkhealth vim.lsp` shows attached clients.

```lua
-- init.lua  (Neovim 0.11+)
-- pylsp with my plugin settings (merged on top of nvim-lspconfig's lsp/pylsp.lua)
vim.lsp.config('pylsp', {
  settings = {
    pylsp = {
      plugins = {
        pylint = { enabled = true, executable = 'pylint' },
        pyflakes = { enabled = true },
        pycodestyle = { enabled = false },
        jedi_completion = { fuzzy = true },
        pyls_isort = { enabled = true },
        pylsp_mypy = { enabled = true },
      },
    },
  },
  flags = { debounce_text_changes = 200 },
})
vim.lsp.enable('pylsp')
-- or: vim.lsp.enable('pyright')  -- I keep just one Python server enabled at a time

-- If you use nvim-cmp, advertise its extra capabilities to every server:
-- vim.lsp.config('*', { capabilities = require('cmp_nvim_lsp').default_capabilities() })

-- Buffer-local setup when a server attaches (replaces the old on_attach + nvim_buf_set_keymap)
vim.api.nvim_create_autocmd('LspAttach', {
  callback = function(ev)
    local client = vim.lsp.get_client_by_id(ev.data.client_id)
    local map = function(lhs, rhs) vim.keymap.set('n', lhs, rhs, { buffer = ev.buf }) end

    map('gD', vim.lsp.buf.declaration)
    map('gd', function() vim.cmd('tab split'); vim.lsp.buf.definition() end)
    map('<leader>t', vim.lsp.buf.signature_help)
    map('<leader>rn', vim.lsp.buf.rename)
    map('<leader>e', function() vim.diagnostic.open_float({ scope = 'line', border = 'rounded' }) end)
    map('[d', function() vim.diagnostic.jump({ count = -1, float = true }) end)
    map(']d', function() vim.diagnostic.jump({ count = 1, float = true }) end)
    map('<leader>q', function() vim.diagnostic.setloclist({ open = true }) end)

    -- client.resolved_capabilities was removed; ask the client instead
    if client and client:supports_method('textDocument/formatting') then
      map('<leader>lf', function() vim.lsp.buf.format({ bufnr = ev.buf }) end)
    end

    -- built-in completion (skip this if you use nvim-cmp / blink.cmp)
    -- if client and client:supports_method('textDocument/completion') then
    --   vim.lsp.completion.enable(true, client.id, ev.buf, { autotrigger = true })
    -- end
  end,
})

-- Diagnostics: signs are configured in vim.diagnostic.config (sign_define is deprecated)
vim.diagnostic.config({
  underline = false,
  virtual_text = true,
  severity_sort = true,
  float = { border = 'rounded', source = true },
  signs = {
    text = {
      [vim.diagnostic.severity.ERROR] = '✗',
      [vim.diagnostic.severity.WARN] = '!',
    },
  },
})
```

Defaults you no longer need to map yourself: when a server attaches Neovim sets `omnifunc`, `tagfunc` (`CTRL-]`) and `formatexpr` (`gq`), and provides global keymaps `K` (hover), `grn` (rename), `gra` (code action), `grr` (references), `gri` (implementation), `grt` (type definition, 0.12+), `gO` (document symbols) and insert-mode `CTRL-S` (signature help). Rounded borders for all floats can be set once with `vim.o.winborder = 'rounded'` instead of overriding `vim.lsp.handlers` (the old `vim.lsp.with(...)` hover override is deprecated).

Removed/renamed APIs from my original config[^nvim-deprecated]: `require('lspconfig').X.setup{}` → `vim.lsp.config`/`vim.lsp.enable`; `client.resolved_capabilities` → `client:supports_method()`; `vim.lsp.buf.formatting()` → `vim.lsp.buf.format()`; `vim.diagnostic.goto_prev/next` → `vim.diagnostic.jump()`; `cmp_nvim_lsp.update_capabilities` → `default_capabilities`. Much of my original config came from jdhao's and eduardoarandah's configs.

#### 1.2.5 nvim-cmp

> Updated 2026-10 to current practice.[^nvim-cmp]

nvim-cmp is an auto-completion engine for Neovim. When I wrote this it was the go-to choice (nvim-compe and completion-nvim are long dead). Today the options are:

- **Built-in** `vim.lsp.completion.enable()` (Neovim 0.11+, see 1.2.4) — enough for LSP-only completion.
- **nvim-cmp** — still works and is what the config below uses; its author describes it as a hobby project ("don't expect a fix unless you provide minimal configuration and steps to reproduce").
- **blink.cmp** — a popular "performant, batteries-included" alternative with LSP, cmdline, signature help and snippet support built in.[^blink-cmp] Its v2 is under active development with breaking changes; pin `version = "1.*"` (or `branch = 'v1'`) for stability. Verify before migrating.

Concepts (nvim-cmp terminology):

- **nvim-cmp**: the engine — collects candidates for the context and drives the pop-up menu and selection/abort/scroll keys.
- **completion sources**, each a separate plugin: buffer words (`hrsh7th/cmp-buffer`), file paths (`hrsh7th/cmp-path`), command line (`hrsh7th/cmp-cmdline`), LSP (`hrsh7th/cmp-nvim-lsp`), snippets (`hrsh7th/cmp-vsnip` for vim-vsnip, `saadparwaiz1/cmp_luasnip` for LuaSnip, `quangnguyen30192/cmp-nvim-ultisnips` + `honza/vim-snippets` for UltiSnips).

The engine and sources form a client–server relationship — a modular, if slightly complicated, design.

Original vim-plug plugin list:

```vim
" nvim-cmp {
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'
" nvim-cmp }

" snippet engine
Plug 'SirVer/ultisnips'
" default snippets
Plug 'honza/vim-snippets', {'rtp': '.'}
Plug 'quangnguyen30192/cmp-nvim-ultisnips', {'rtp': '.'}
```

config:

```lua
local cmp = require('cmp')
local ultisnips_mappings = require("cmp_nvim_ultisnips.mappings")

cmp.setup({
    snippet = {
      -- REQUIRED - you must specify a snippet engine
      expand = function(args)
        -- vim.fn["vsnip#anonymous"](args.body) -- For `vsnip` users.
        -- require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
        -- vim.snippet.expand(args.body) -- Neovim 0.10+ built-in snippets
        vim.fn["UltiSnips#Anon"](args.body) -- For `ultisnips` users.
      end,
    },

    mapping = {
      ["<Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
              cmp.select_next_item()
          else
              ultisnips_mappings.expand_or_jump_forwards(fallback)
          end
        end),

      ["<S-Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
              cmp.select_prev_item()
          else
              ultisnips_mappings.expand_or_jump_backwards(fallback)
          end
        end),

      ["<C-j>"] = cmp.mapping(function(fallback)
          ultisnips_mappings.expand_or_jump_forwards(fallback)
        end),

      ['<C-b>'] = cmp.mapping(cmp.mapping.scroll_docs(-4), { 'i', 'c' }),
      ['<C-f>'] = cmp.mapping(cmp.mapping.scroll_docs(4), { 'i', 'c' }),
      ['<C-g>'] = cmp.mapping({i = cmp.mapping.abort(), c = cmp.mapping.close()}),
      ['<CR>'] = cmp.mapping.confirm({ select = false }), -- only confirm explicitly selected items
    },

    sources = cmp.config.sources({
      { name = 'nvim_lsp' },
      { name = 'ultisnips' },
      }, {
      { name = 'path' },
      { name = 'buffer', keyword_length = 2,
        option = {
            -- include all buffers
            get_bufnrs = function()
             return vim.api.nvim_list_bufs()
            end
      }},
    }),

    completion = {
        keyword_length = 2,
        completeopt = "menu,noselect"
  },
})

-- Use buffer source for `/`
cmp.setup.cmdline('/', {
    sources = {
      { name = 'buffer' },
    },
})

-- Use cmdline & path source for ':'
cmp.setup.cmdline(':', {
    sources = cmp.config.sources({
      { name = 'path' }
    }, {
      { name = 'cmdline' },
    }),
})
```

	1.2.6 util-snips 

	    1.2.6.1 E319: No "python3" provider found. Run ":checkhealth provider"
to fix:
a. add to init.vim 
add let g:python3_host_prog = 'location of python3' to your init.vim
or
add vim.g.python3_host_prog = 'location of python3' to your init.lua
b. run: $ python3 -m pip install --user --upgrade pynvim

	    1.2.6.2

	1.2.7 Old vim config 
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\ [HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
"Map ctrl+s,e to add new entry to TOC based on following logic, take the previous entry and add 1 to the last digit
map <C-s><C-e> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o<ESC>p0E<C-A>a<ESC>
"Map ctrl+s,i to add new entry to TOC based on following logic, take the previous entry and add .1 after the last digit
map <C-s><C-i> <ESC>ms?^\s*\(\d\+\.\)\+\d*<CR>Y<CR>`so<ESC>PI<TAB><ESC>Ea.1<ESC>WDo<ESC>

"Map ctrl-s+d to add [done] to end of line, this usefull for filling done status for
" p -> pending, o -> open, w - work in progress
map <C-s><C-d> A [Done]<esc>
map <C-s><C-p> A [Pending]<esc>
map <C-s><C-o> A [Open]<esc>
map <C-s><C-w> A [Work In Progress]<esc>
map <C-s><C-b> B [Blocked]<esc>

"Maps for getting current time. t? in normal mode and ctrl+t in insert mode
map t? :echo 'Current time is ' . strftime('%c')<CR>
map! <C-t><C-t>	<C-R>=strftime('%c')<CR><Esc>
" The following command maps ctrl+d to insert the directory name of the current buffer:
inoremap <C-d> <C-R>=expand('%:p:h')<CR>

" Move up and down in autocomplete with <c-j> and <c-k> instead of default
" ctrl+n ctrl+p
inoremap <expr> <c-j> ("\<C-n>")
inoremap <expr> <c-k> ("\<C-p>")

" Java abbreviations
iab sop System.out.println()
"
" general abbreviations
iab cup can you please
iab lmk let me know
iab idk I don't know
iab ttl talk to you later
iab wip work in progress
iab gm good morning
iab thxy Thanks!<CR>Yosi
iab ty thank you
iab tyo thx!<CR>Yosi
iab izq izaqyos@gmail.com
iab izs <email>
iab chy can't hear you
iab duk do you know
iab fml five minutes late

iab TY Thank You

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Useful abbrevs
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


" Fast saving
nmap <leader>w :w!<cr>
" Fast save and quit current file
nmap <leader>q :wq!<cr>
" Fast save and quit all
nmap <leader><leader>q :wqa!<cr>
" Fast saving as utf8 to avoid conversion error
nmap <leader><leader>w :w! ++enc=utf8<cr>
" Fast increase/decrease window
nmap <leader>r :res+20<cr>
nmap <leader>f :res-20<cr>

"print date
nmap <leader>d :!date<cr>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" maximize current window by typing - in command mode. to restore previos
" windows layout press ctrl+w+=
nmap - :res<CR>:vertical res<CR>$
nmap +  <C-W><C-=>

	1.2.8 Neovim MAC GUI 

	    1.2.8.1 vimr


https://github.com/qvacua/vimr#how-to-build
git clone https://github.com/qvacua/vimr.git
cd vimr 
git submodule init
git submodule update

xcode-select --install # install the Xcode command line tools, if you haven't already
brew bundle

clean=true notarize=false use_carthage_cache=false ./bin/build_vimr.sh
# VimR.app will be placed in ./build/Build/Products/Release/

	    1.2.8.2 vv
$ brew install vv

	    1.2.8.3
    1.2.9 note taking 

        1.2.9.1 mkdnflow.nvim
install:
" Vim-Plug
Plug 'jakewvincent/mkdnflow.nvim'

        1.2.9.2 vim-wiki 

            1.2.9.2.1 install
https://sudoedit.com/install-vimwiki-neovim/

basically:
Plug 'vimwiki/vimwiki'

            1.2.9.2.2 usage 
https://github.com/vimwiki/vimwiki#introduction
To do a quick start, press <Leader>ww (default is \ww) to go to your index wiki file. By default, it is located in ~/vimwiki/index.wiki. See :h vimwiki_list for registering a different path/wiki.

One or more wikis can be registered using the |g:vimwiki_list| variable.

Each item in |g:vimwiki_list| is a |Dictionary| that holds all customizations
available for a distinct wiki. The options dictionary has the form: >
  {'option1': 'value1', 'option2': 'value2', ...}

Consider the following: >
  let g:vimwiki_list = [{'path': '~/my_site/', 'path_html': '~/public_html/'}]

This defines one wiki located at ~/my_site/. When converted to HTML, the
produced HTML files go to ~/public_html/ .

Another example: >
  let g:vimwiki_list = [{'path': '~/my_site/', 'path_html': '~/public_html/'},
            \ {'path': '~/my_docs/', 'ext': '.mdox'}]

defines two wikis: the first as before, and the second one located in
~/my_docs/, with files that have the .mdox extension.

An empty |Dictionary| in g:vimwiki_list is the wiki with default options: >
  let g:vimwiki_list = [{},
            \ {'path': '~/my_docs/', 'ext': '.mdox'}]

To do a quick start, press <Leader>ww (default is \ww) to go to your index wiki file. By default, it is located in ~/vimwiki/index.wiki. See :h vimwiki_list for registering a different path/wiki.

Feed it with the following example:

= My knowledge base =
    * Tasks -- things to be done _yesterday_!!!
    * Project Gutenberg -- good books are power.
    * Scratchpad -- various temporary stuff.
Place your cursor on Tasks and press Enter to create a link. Once pressed, Tasks will become [[Tasks]] -- a VimWiki link. Press Enter again to open it. Edit the file, save it, and then press Backspace to jump back to your index.

A VimWiki link can be constructed from more than one word. Just visually select the words to be linked and press Enter. Try it, with Project Gutenberg. The result should look something like:

= My knowledge base =
    * [[Tasks]] -- things to be done _yesterday_!!!
    * [[Project Gutenberg]] -- good books are power.
    * Scratchpad -- various temporary stuff.

            1.2.9.2.3 basic markdown syntax
= Header1 =
== Header2 ==
=== Header3 ===


*bold* -- bold text
_italic_ -- italic text

[[wiki link]] -- wiki link
[[wiki link|description]] -- wiki link with description
Lists
* bullet list item 1
    - bullet list item 2
    - bullet list item 3
        * bullet list item 4
        * bullet list item 5
* bullet list item 6
* bullet list item 7
    - bullet list item 8
    - bullet list item 9

1. numbered list item 1
2. numbered list item 2
    a) numbered list item 3
    b) numbered list item 4

            1.2.9.2.4
        1.2.9.3
    1.2.10

	1.3
2


---

## Legacy Notes (migrated from neovim-kb)

> Note (2026-10): the plugin-manager, nvim-treesitter, LSP and nvim-cmp parts of this legacy copy (1.2.2–1.2.5) use APIs that are now deprecated or removed. Use the updated sections 1.2.2–1.2.5 above instead.

.........................................Table Of Contents...............................................................
1. getting started <URL:#tn=1. getting started>
	1.1 install <URL:#tn=	1.1 install>
	1.2 configuration <URL:#tn=	1.2 configuration>
		1.2.1 initial configuration <URL:#tn=		1.2.1 initial configuration>
        1.2.2 vim plugin manager <URL:#tn=        1.2.2 vim plugin manager>
            1.2.2.1 install vim-plug <URL:#tn=            1.2.2.1 install vim-plug>
            1.2.2.2 My setup <URL:#tn=            1.2.2.2 My setup>
            1.2.2.3 other setups <URL:#tn=            1.2.2.3 other setups>
        1.2.3 syntax highlighting nvim-treesitter <URL:#tn=        1.2.3 syntax highlighting nvim-treesitter>
	1.2.4 LSP <URL:#tn=	1.2.4 LSP>
	1.2.5 nvim-cmp <URL:#tn=	1.2.5 nvim-cmp>
	1.2.6 util-snips <URL:#tn=	1.2.6 util-snips>
	    1.2.6.1 E319: No "python3" provider found. Run ":checkhealth provider" <URL:#tn=	    1.2.6.1 E319: No "python3" provider found. Run ":checkhealth provider">
	    1.2.6.2 <URL:#tn=	    1.2.6.2>
	1.2.7 Old vim config <URL:#tn=	1.2.7 Old vim config>
	1.2.8 Neovim MAC GUI <URL:#tn=	1.2.8 Neovim MAC GUI>
	    1.2.8.1 vimr <URL:#tn=	    1.2.8.1 vimr>
	    1.2.8.2 vv <URL:#tn=	    1.2.8.2 vv>
	    1.2.8.3 <URL:#tn=	    1.2.8.3>
    1.2.9 note taking <URL:#tn=    1.2.9 note taking>
        1.2.9.1 mkdnflow.nvim <URL:#tn=        1.2.9.1 mkdnflow.nvim>
        1.2.9.2 <URL:#tn=        1.2.9.2>
    1.2.10 <URL:#tn=    1.2.10>
	1.3 <URL:#tn=	1.3>
2. <URL:#tn=2.>
.................................................END TOC..............................................
1. getting started

	1.1 install
	$ brew install nvim 

	1.2 configuration

		1.2.1 initial configuration 
		On first launch the ~/.local/share/nvim/{shada,swap} directories are auto-generated.

Manually create a new ~/.config/nvim directory and a init.vim configuration file ...

$ mkdir ~/.config/nvim
$ touch ~/.config/nvim/init.vim
Options I set in my init.vim ...

set nocompatible            " disable compatibility to old-time vi
set showmatch               " show matching brackets.
set ignorecase              " case insensitive matching
set mouse=v                 " middle-click paste with mouse
set hlsearch                " highlight search results
set autoindent              " indent a new line the same amount as the line just typed
set number                  " add line numbers
set wildmode=longest,list   " get bash-like tab completions
set cc=80                   " set an 80 column border for good coding style
filetype plugin indent on   " allows auto-indenting depending on file type
set tabstop=4               " number of columns occupied by a tab character
set expandtab               " converts tabs to white space
set shiftwidth=4            " width for autoindents
set softtabstop=4           " see multiple spaces as tabstops so <BS> does the right thing

        1.2.2 vim plugin manager

            1.2.2.1 install vim-plug
sh -c 'curl -fLo "${XDG_DATA_HOME:-$HOME/.local/share}"/nvim/site/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
Setup a directory to hold plugins, install plugins (example: nord-vim color scheme), and initialize ...

            1.2.2.2 My setup
all plugins code go to /Users/<user>/.config/nvim/vim-plug/plugins.vim
source it from init.vim

Check status:
:PlugStatus

install:
:PlugInstall

            1.2.2.3 other setups
" specify directory for plugins
call plug#begin('~/.config/nvim/plugged')

Plug 'arcticicestudio/nord-vim'

" initialize plugin system
call plug#end()

- more advanced and portable configuration  (https://numbersmithy.com/migrating-from-vim-to-neovim-at-the-beginning-of-2022/)
This is one of many things that confused me a bit at the beginning: Now, Neovim uses 2 separate saving locations:

config folder, accessible via the variable stdpath('config'), default to ~/.config/nvim/.
data folder, accessible via stdpath('data'), default to ~/.local/share/nvim/.
I feel that this is a bit scattered, so I decided to put everything within the config folder instead.

I’d also like to make the config more portable and easier to setup in a new machine, therefore I used this following snippet (obtained from this Github issue post that automatically downloads vim-plug (if not already existing) when the init.vim file is opened, and installs the required plugins:

" auto install vim-plug and plugins:
let plug_install = 0
let autoload_plug_path = stdpath('config') . '/autoload/plug.vim'
if !filereadable(autoload_plug_path)
    execute '!curl -fL --create-dirs -o ' . autoload_plug_path .
        \ ' https://raw.github.com/junegunn/vim-plug/master/plug.vim'
    execute 'source ' . fnameescape(autoload_plug_path)
    let plug_install = 1
endif
unlet autoload_plug_path
call plug#begin(stdpath('config') . '/plugged')
" plugins here ...
Plug 'scrooloose/nerdtree'
call plug#end()
call plug#helptags()
" auto install vim-plug and plugins:
if plug_install
    PlugInstall --sync
endif
unlet plug_install
Note that I use stdpath('config') instead of stdpath('data') at line 3 and line 12 so everything goes into the ~/.config/nvim/ folder.

After populating the plugin list inside the lines of call plug#begin() and call plug#end(), one needs to run :PlugInstall to install them. Figure 1 below shows the side-pane of vim-plug on the left and the list of plugins installed.

        1.2.3 syntax highlighting nvim-treesitter 
As far as I understand, tree-sitter is another method (I don’t know exactly what) of parsing the codes of a programming language, in a different way from the old method which is based on regular expressions (Regex). And nvim-treesitter, native to Neovim since version 0.5, is an interfacing layer for Neovim to communicate with tree-sitter.

What benefits does tree-sitter provide?

I think the most notable and intuitive improvement is better syntax highlighting.

The README of nvim-treesitter provides some comparisons. And Figure 2 below is another comparison I made. Aside from the different color choices, the tree-sitter powered syntax highlighting indeed picks up more syntactic elements from the Python codes. And this is largely true for other languages as well.

To install nvim-treesitter, put this line to the vim-plug plugin list:
Plug 'nvim-treesitter/nvim-treesitter', {'do': ':TSUpdate'}

config:
lua <<EOF
require'nvim-treesitter.configs'.setup {
  ensure_installed = {
    "python",
    "fortran",
    "bash",
    "c",
    "cpp",
    "bibtex",
    "latex",
  },

  -- Install languages synchronously (only applied to `ensure_installed`)
  sync_install = false,

  -- List of parsers to ignore installing
  ignore_install = { "haskell" },

  highlight = {
    -- `false` will disable the whole extension
    enable = true,
    -- list of language that will be disabled
    disable = { "" },

    -- Setting this to true will run `:h syntax` and tree-sitter at the same time.
    -- Set this to `true` if you depend on 'syntax' being enabled (like for indentation).
    -- Using this option may slow down your editor, and you may see some duplicate highlights.
    -- Instead of true it can also be a list of languages
    additional_vim_regex_highlighting = false,
  },

  indent = {
    -- dont enable this, messes up python indentation
    enable = false,
    disable = {},
  },
}
EOF

" Folding
set foldmethod=expr
set foldexpr=nvim_treesitter#foldexpr()

	1.2.4 LSP
Language Server Protocol (LSP) is supported nativity by Neovim since version 0.5 (at the time of writing, it is further requiring v0.6.1). As far as I understand, it is a standard created by Microsoft to provide a unified framework for text editors or IDEs to support different programming languages. Thanks to this standard, the number of interfaces/data-flows between n number of editors/IDEs and m number of different languages can be reduced from n * m to n + m. This blog by Jake Wiesler gives some more explanation regarding LSP.

Neovim supports LSP via the nvim-lspconfig plugin, which acts as a LSP client with sane default configs for a whole range of languages.

To install nvim-lspconfig:

Plug 'neovim/nvim-lspconfig'

lsp config 
lua <<EOF
local nvim_lsp = require('lspconfig')

local on_attach = function(client, bufnr)

  local function buf_set_keymap(...)
      vim.api.nvim_buf_set_keymap(bufnr, ...)
  end
  local function buf_set_option(...)
      vim.api.nvim_buf_set_option(bufnr, ...)
  end

  buf_set_option('omnifunc', 'v:lua.vim.lsp.omnifunc')

  -- Mappings
  local opts = { noremap=true, silent=false }
  local opts2 = { focusable = false,
           close_events = { "BufLeave", "CursorMoved", "InsertEnter", "FocusLost" },
           border = 'rounded',
           source = 'always',  -- show source in diagnostic popup window
           prefix = ' '}

  buf_set_keymap('n', 'gD', '<Cmd>lua vim.lsp.buf.declaration()<CR>', opts)
  buf_set_keymap('n', 'gd', '<Cmd>tab split | lua vim.lsp.buf.definition()<CR>', opts)
  buf_set_keymap('n', 'K', '<Cmd>lua vim.lsp.buf.hover()<CR>', opts)
  buf_set_keymap('n', 'gi', '<cmd>lua vim.lsp.buf.implementation()<CR>', opts)
  buf_set_keymap('n', '<leader>t', '<cmd>lua vim.lsp.buf.signature_help()<CR>', opts)
  buf_set_keymap('n', '<leader>rn', '<cmd>lua vim.lsp.buf.rename()<CR>', opts)
  buf_set_keymap('n', 'gr', '<cmd>lua vim.lsp.buf.references()<CR>', opts)
  buf_set_keymap('n', '<leader>e', '<cmd>lua vim.diagnostic.open_float(0, {{opts2}, scope="line", border="rounded"})<CR>', opts)
  buf_set_keymap('n', '[d', '<cmd>lua vim.diagnostic.goto_prev({ float = { border = "rounded" }})<CR>', opts)
  buf_set_keymap('n', ']d', '<cmd>lua vim.diagnostic.goto_next({ float = { border = "rounded" }})<CR>', opts)
  buf_set_keymap("n", "<leader>q", "<cmd>lua vim.diagnostic.setloclist({open = true})<CR>", opts)

  -- Set some keybinds conditional on server capabilities
  if client.resolved_capabilities.document_formatting then
      buf_set_keymap("n", "<leader>lf", "<cmd>lua vim.lsp.buf.formatting()<CR>", opts)
  end
  if client.resolved_capabilities.document_range_formatting then
      buf_set_keymap("n", "<leader>lf", "<cmd>lua vim.lsp.buf.formatting()<CR>", opts)
  end
end

-- NOTE: Don't use more than 1 servers otherwise nvim is unstable
local capabilities = vim.lsp.protocol.make_client_capabilities()
capabilities = require('cmp_nvim_lsp').update_capabilities(capabilities)
capabilities.textDocument.completion.completionItem.snippetSupport = true

-- Use pylsp
nvim_lsp.pylsp.setup({
    on_attach = on_attach,
    settings = {
      pylsp = {
        plugins = {
          pylint = { enabled = true, executable = "pylint" },
          pyflakes = { enabled = true },
          pycodestyle = { enabled = false },
          jedi_completion = { fuzzy = true },
          pyls_isort = { enabled = true },
          pylsp_mypy = { enabled = true },
        },
    }, },
    flags = {
      debounce_text_changes = 200,
    },
    capabilities = capabilities,
})

-- Use pyright or jedi_language_server
--local servers = {'jedi_language_server'}
--local servers = {'pyright'}
--for _, lsp in ipairs(servers) do
--nvim_lsp[lsp].setup({
--  on_attach = on_attach,
--  capabilities = capabilities
--})
--end

-- Change diagnostic signs.
vim.fn.sign_define("DiagnosticSignError", { text = "✗", texthl = "DiagnosticSignError" })
vim.fn.sign_define("DiagnosticSignWarn", { text = "!", texthl = "DiagnosticSignWarn" })
vim.fn.sign_define("DiagnosticSignInformation", { text = "", texthl = "DiagnosticSignInfo" })
vim.fn.sign_define("DiagnosticSignHint", { text = "", texthl = "DiagnosticSignHint" })

-- global config for diagnostic
vim.diagnostic.config({
  underline = false,
  virtual_text = true,
  signs = true,
  severity_sort = true,
})

-- Change border of documentation hover window, See https://github.com/neovim/neovim/pull/13998.
vim.lsp.handlers["textDocument/hover"] = vim.lsp.with(vim.lsp.handlers.hover, {
  border = "rounded",
})

This one is a big lengthy, and I took many parts from jdhao’s config, and eduardoarandah’s config with some of my own tweaks. Not every part is necessary, many lines are actually appearance tweaks that you can safely discard.

It took me a while to get my head around what’s really going on with the LSP business. Here are the key components and what each one does:

LSP: the standard.
nvim-lspconfig: the Neovim LSP client that communicates with a server of a language, conforming with the LSP standard.
The language server: e.g. pyright for Python, or clangd for c, the server engine that parses the codes and provides the functionalities such as linting and searching. One language may have multiple different servers, e.g. pyslp and jedi-language-server are both Python servers, besides pyright.
The auto-completion engine: this is yet another independent component in the entire tool chain, but it’s so often used with all the above I mistook it as part of nvim-lspconfig initially. Again, there are more than one auto-completion engines, such as nvim-cmp (talked in later section), nvim-compe (now deprecated), completion-nvim (no longer maintained), and coq_nvim.
So, the essential steps one needs to do to setup LSP for Python:

Pick one language server and install in the OS, outside of Neovim. E.g. npm install -g pyright for pyright, pip install 'python-lsp-server[all]' for pyslp, or pip install jedi-language-server for jedi-language-server.
Install the nvim-lspconfig plugin in Neovim.
Add the language server in Step 1 to Neovim’s config: e.g. require'lspconfig'.pyright.setup{}.
Optionally add additional configs inside the setup{} brackets as above shown.
Open and edit a Python script file and watch the LSP tools function, e.g. Figure 3 below demonstrates the hover function (bound to Shift-K hotkey) in action, and Figure 4 shows the diagnostics from pylsp on one of my Python scripts (I consider myself a free-form programmer).

	1.2.5 nvim-cmp
As alluded to above, nvim-cmp is one auto-completion engine for Vim/Neovim, among many other alternatives (e.g. nvim-compe, completion-nvim (both deprecated) and coq_nvim). It seems to be the go-to choice nowadays, so I picked this one.

Again, I found it helpful to first get some concepts/terminologies straight (this is one of the obstacles I noticed that may hinder a smooth transition into Neovim).

nvim-cmp: the auto-completion engine, which collects potential completion strings depending on the context, and interacts with the user with a pop-up menu populated with completions, as well as responses to user inputs like completion selection/abortion/scrolling key strokes.
completion source: where to look for all those potential completions. Here are a few common sources:
buffer: literal words appeared in the current (default) or all opened Vim/Neovim buffers (needs config). This is provided by the 'hrsh7th/cmp-buffer' plugin.
path: file name completion, provided by the 'hrsh7th/cmp-path' plugin.
cmdline: Vim/Neovim command completion, when you type in the command mode. This is provided by the 'hrsh7th/cmp-cmdline' plugin.
nvim_lsp: keywords completion provided by the language server in the LSP framework we talked about above. This is supported by the 'hrsh7th/cmp-nvim-lsp' plugin.
snippets: again, multiple choices are available. For vim-vsnip one needs the 'hrsh7th/cmp-vsnip' plugin (aside from vim-vsnip itself). For luasnip one needs additionally the 'saadparwaiz1/cmp_luasnip' plugin. For Ultisnips, one may choose to install a collection of default snippets from the 'honza/vim-snippets' and/or 'quangnguyen30192/cmp-nvim-ultisnips' plugins.
So, the auto-completion engine itself, and those different sources form a kind of client-server relationship, and each source is handled by a separate plugin. This is a bit complicated design choice but I guess it serves modular development better. 

plugins:
" nvim-cmp {
Plug 'hrsh7th/cmp-nvim-lsp'
Plug 'hrsh7th/cmp-buffer'
Plug 'hrsh7th/cmp-path'
Plug 'hrsh7th/cmp-cmdline'
Plug 'hrsh7th/nvim-cmp'
" nvim-cmp }

" snippet engine
Plug 'SirVer/ultisnips'
" default snippets
Plug 'honza/vim-snippets', {'rtp': '.'}
Plug 'quangnguyen30192/cmp-nvim-ultisnips', {'rtp': '.'}

config:
   lua <<EOF
local cmp = require('cmp')
local ultisnips_mappings = require("cmp_nvim_ultisnips.mappings")

cmp.setup({
    snippet = {
      -- REQUIRED - you must specify a snippet engine
      expand = function(args)
        -- vim.fn["vsnip#anonymous"](args.body) -- For `vsnip` users.
        -- require('luasnip').lsp_expand(args.body) -- For `luasnip` users.
        -- require('snippy').expand_snippet(args.body) -- For `snippy` users.
        vim.fn["UltiSnips#Anon"](args.body) -- For `ultisnips` users.
      end,
    },

    mapping = {
      ["<Tab>"] = cmp.mapping(function(fallback)
          if cmp.visible() then
              cmp.select_next_item()
          else
              ultisnips_mappings.expand_or_jump_forwards(fallback)
          end
        end),

      ["<S-Tab>"] = function(fallback)
          if cmp.visible() then
              cmp.select_prev_item()
          else
              ultisnips_mappings.expand_or_jump_backwards(fallback)
          end
        end,

      ["<C-j>"] = cmp.mapping(function(fallback)
          ultisnips_mappings.expand_or_jump_forwards(fallback)
        end),

      ['<C-b>'] = cmp.mapping(cmp.mapping.scroll_docs(-4), { 'i', 'c' }),
      ['<C-f>'] = cmp.mapping(cmp.mapping.scroll_docs(4), { 'i', 'c' }),
      ['<C-g>'] = cmp.mapping({i = cmp.mapping.abort(), c = cmp.mapping.close()}),
      ['<CR>'] = cmp.mapping.confirm({ select = false }), -- Accept currently selected item. Set `select` to `false` to only confirm explicitly selected items.
    },

    sources = cmp.config.sources({
      { name = 'nvim_lsp' },
      { name = 'ultisnips' }, -- For ultisnips users.
      }, {
      { name = 'path' },
      { name = 'buffer', keyword_length = 2,
        option = {
            -- include all buffers
            get_bufnrs = function()
             return vim.api.nvim_list_bufs()
            end

            -- include all buffers, avoid indexing big files
            -- get_bufnrs = function()
              -- local buf = vim.api.nvim_get_current_buf()
              -- local byte_size = vim.api.nvim_buf_get_offset(buf, vim.api.nvim_buf_line_count(buf))
              -- if byte_size > 1024 * 1024 then -- 1 Megabyte max
                -- return {}
              -- end
              -- return { buf }
            -- end
      }},  -- end of buffer
    }),

    completion = {
        keyword_length = 2,
        completeopt = "menu,noselect"
  },
})

-- Use buffer source for `/` (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline('/', {
    sources = {
      { name = 'buffer' },
    },
})

-- Use cmdline & path source for ':' (if you enabled `native_menu`, this won't work anymore).
cmp.setup.cmdline(':', {
    sources = cmp.config.sources({
      { name = 'path' }
    }, {
      { name = 'cmdline' },
    }),
})
EOF 

	1.2.6 util-snips 

	    1.2.6.1 E319: No "python3" provider found. Run ":checkhealth provider"
to fix:
a. add to init.vim 
add let g:python3_host_prog = 'location of python3' to your init.vim
or
add vim.g.python3_host_prog = 'location of python3' to your init.lua
b. run: $ python3 -m pip install --user --upgrade pynvim

	    1.2.6.2

	1.2.7 Old vim config 
set statusline=%F%m%r%h%w\ [FORMAT=%{&ff}]\ [TYPE=%Y]\ [ASCII=\%03.3b]\ [HEX=\%02.2B]\ [POS=%04l,%04v][%p%%]\ [LEN=%L]
"Map ctrl+s,e to add new entry to TOC based on following logic, take the previous entry and add 1 to the last digit
map <C-s><C-e> ?^\s*\(\d\+\.\)\+\d*<CR>0y/\d\+\.\?\zs\s<CR>``o<ESC>p0E<C-A>a<ESC>
"Map ctrl+s,i to add new entry to TOC based on following logic, take the previous entry and add .1 after the last digit
map <C-s><C-i> <ESC>ms?^\s*\(\d\+\.\)\+\d*<CR>Y<CR>`so<ESC>PI<TAB><ESC>Ea.1<ESC>WDo<ESC>

"Map ctrl-s+d to add [done] to end of line, this usefull for filling done status for
" p -> pending, o -> open, w - work in progress
map <C-s><C-d> A [Done]<esc>
map <C-s><C-p> A [Pending]<esc>
map <C-s><C-o> A [Open]<esc>
map <C-s><C-w> A [Work In Progress]<esc>
map <C-s><C-b> B [Blocked]<esc>

"Maps for getting current time. t? in normal mode and ctrl+t in insert mode
map t? :echo 'Current time is ' . strftime('%c')<CR>
map! <C-t><C-t>	<C-R>=strftime('%c')<CR><Esc>
" The following command maps ctrl+d to insert the directory name of the current buffer:
inoremap <C-d> <C-R>=expand('%:p:h')<CR>

" Move up and down in autocomplete with <c-j> and <c-k> instead of default
" ctrl+n ctrl+p
inoremap <expr> <c-j> ("\<C-n>")
inoremap <expr> <c-k> ("\<C-p>")

" Java abbreviations
iab sop System.out.println()
"
" general abbreviations
iab cup can you please
iab lmk let me know
iab idk I don't know
iab ttl talk to you later
iab wip work in progress
iab gm good morning
iab thxy Thanks!<CR>Yosi
iab ty thank you
iab tyo thx!<CR>Yosi
iab izq izaqyos@gmail.com
iab izs <email>
iab chy can't hear you
iab duk do you know
iab fml five minutes late

iab TY Thank You

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" Useful abbrevs
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


" Fast saving
nmap <leader>w :w!<cr>
" Fast save and quit current file
nmap <leader>q :wq!<cr>
" Fast save and quit all
nmap <leader><leader>q :wqa!<cr>
" Fast saving as utf8 to avoid conversion error
nmap <leader><leader>w :w! ++enc=utf8<cr>
" Fast increase/decrease window
nmap <leader>r :res+20<cr>
nmap <leader>f :res-20<cr>

"print date
nmap <leader>d :!date<cr>
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" maximize current window by typing - in command mode. to restore previos
" windows layout press ctrl+w+=
nmap - :res<CR>:vertical res<CR>$
nmap +  <C-W><C-=>

	1.2.8 Neovim MAC GUI 

	    1.2.8.1 vimr


https://github.com/qvacua/vimr#how-to-build
git clone https://github.com/qvacua/vimr.git
cd vimr 
git submodule init
git submodule update

xcode-select --install # install the Xcode command line tools, if you haven't already
brew bundle

clean=true notarize=false use_carthage_cache=false ./bin/build_vimr.sh
# VimR.app will be placed in ./build/Build/Products/Release/

	    1.2.8.2 vv
$ brew install vv

	    1.2.8.3
    1.2.9 note taking 

        1.2.9.1 mkdnflow.nvim
install:
" Vim-Plug
Plug 'jakewvincent/mkdnflow.nvim'

        1.2.9.2 vim-wiki 

            1.2.9.2.1 install
https://sudoedit.com/install-vimwiki-neovim/

basically:
Plug 'vimwiki/vimwiki'

            1.2.9.2.2 usage 
https://github.com/vimwiki/vimwiki#introduction
To do a quick start, press <Leader>ww (default is \ww) to go to your index wiki file. By default, it is located in ~/vimwiki/index.wiki. See :h vimwiki_list for registering a different path/wiki.

One or more wikis can be registered using the |g:vimwiki_list| variable.

Each item in |g:vimwiki_list| is a |Dictionary| that holds all customizations
available for a distinct wiki. The options dictionary has the form: >
  {'option1': 'value1', 'option2': 'value2', ...}

Consider the following: >
  let g:vimwiki_list = [{'path': '~/my_site/', 'path_html': '~/public_html/'}]

This defines one wiki located at ~/my_site/. When converted to HTML, the
produced HTML files go to ~/public_html/ .

Another example: >
  let g:vimwiki_list = [{'path': '~/my_site/', 'path_html': '~/public_html/'},
            \ {'path': '~/my_docs/', 'ext': '.mdox'}]

defines two wikis: the first as before, and the second one located in
~/my_docs/, with files that have the .mdox extension.

An empty |Dictionary| in g:vimwiki_list is the wiki with default options: >
  let g:vimwiki_list = [{},
            \ {'path': '~/my_docs/', 'ext': '.mdox'}]

To do a quick start, press <Leader>ww (default is \ww) to go to your index wiki file. By default, it is located in ~/vimwiki/index.wiki. See :h vimwiki_list for registering a different path/wiki.

Feed it with the following example:

= My knowledge base =
    * Tasks -- things to be done _yesterday_!!!
    * Project Gutenberg -- good books are power.
    * Scratchpad -- various temporary stuff.
Place your cursor on Tasks and press Enter to create a link. Once pressed, Tasks will become [[Tasks]] -- a VimWiki link. Press Enter again to open it. Edit the file, save it, and then press Backspace to jump back to your index.

A VimWiki link can be constructed from more than one word. Just visually select the words to be linked and press Enter. Try it, with Project Gutenberg. The result should look something like:

= My knowledge base =
    * [[Tasks]] -- things to be done _yesterday_!!!
    * [[Project Gutenberg]] -- good books are power.
    * Scratchpad -- various temporary stuff.

            1.2.9.2.3 basic vim-wiki markdown syntax
= Header1 =
== Header2 ==
=== Header3 ===


*bold* -- bold text
_italic_ -- italic text

[[wiki link]] -- wiki link
[[wiki link|description]] -- wiki link with description
Lists
* bullet list item 1
    - bullet list item 2
    - bullet list item 3
        * bullet list item 4
        * bullet list item 5
* bullet list item 6
* bullet list item 7
    - bullet list item 8
    - bullet list item 9

1. numbered list item 1
2. numbered list item 2
    a) numbered list item 3
    b) numbered list item 4

            1.2.9.2.4 configure for .md 
"vim wiki 
 let g:vimwiki_list = [{'path': '~/work/KB/', 'path_html': '~/work/KB/public_html/',
			\ 'syntax': 'markdown', 'ext': '.md'},
            "\ {'path': '~/my_docs/', 'ext': '.mdox'}
			\ ]

            1.2.9.2.5 view md from terminal 
Installing Pandoc and Lynx
On OS X I would recommend installing these using homebrew.

brew install pandoc

brew install lynx

If you are running Linux, your package manager of choice should have them.

Setting up the script
Once you have these installed the helper function we need to join them together is very simple.

Open up ~/.profile or whatever text file you like using for your terminal preferences and paste the following;

rmd () {
  pandoc $1 | lynx -stdin
}
What this does is defines a function called rmd (Read Markdown) and in the body of the function it tells Pandoc to read in whatever file you have specified and pass this to lynx which will be listening for standard input.

Once you have this in and have saved your file you will need to run source ~/.profile (or whatever file you edited).

Usage
To use this just call rmd path/to/markdowndown/file.md and it will open up as a webpage in Lynx.

To quit out of Lynx just press q and you will be back to your terminal.


            1.2.9.2.6 generate ToC 
https://stackoverflow.com/questions/11948245/markdown-to-create-pages-and-table-of-contents#:~:text=Press%20CTRL%20%2B%20SHIFT%20%2B%20P,Markdown%3A%20Create%20Table%20of%20Contents

For the Visual Studio Code users the best option to use today (2020) is the Markdown All in One plugin.

To install it, launch the VS Code Quick Open (Control/⌘+P), paste the following command, and press enter.

ext install yzhang.markdown-all-in-one
And to generate the TOC, open the command palette (Control/⌘+Shift+P) and select the Select Markdown: Create Table of Contentsoption.

Another option is the Markdown TOC plugin.

To install it, launch the VS Code Quick Open (Control/⌘+P), paste the following command, and press enter.

ext install markdown-toc
And to generate the TOC, open the command palette (Control/⌘+Shift+P) and select the Markdown TOC:Insert/Update option or use Control/⌘+MT.
            1.2.9.2.7 Advanced usage 
https://mkaz.blog/working-with-vim/vimwiki/

            1.2.9.2.8
        1.2.9.3
    1.2.10

	1.3
2. 

[^nvim-releases]: Neovim releases (GitHub)
[^nvim-pack]: Neovim docs: vim.pack plugin manager
[^lazy-nvim]: lazy.nvim: Installation
[^nvim-treesitter]: nvim-treesitter README (main branch)
[^nvim-lsp]: Neovim docs: LSP (lsp.txt)
[^nvim-lspconfig]: nvim-lspconfig README
[^nvim-deprecated]: Neovim docs: Deprecated features
[^nvim-cmp]: nvim-cmp README
[^blink-cmp]: blink.cmp README

## See Also

- [Neo vim, NVIM, neovim](/vi/kb-vi/75-neo-vim-nvim-neovim.md) — Legacy Neovim notes: getting started, common issues
