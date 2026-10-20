---
type: cheatsheet
title: My Neovim Keymaps
description: "Cheat sheet of the custom keys in my Neovim config: Claude Code, LSP, diagnostics, completion, windows, save/quit and note-taking maps."
tags: [neovim, vim, cheatsheet, configuration-file, productivity]
author: Yosi Izaq
generated: { by: "human:izaqyos", at: "2026-10-20T00:00:00Z" }
status: stable
capture_type: compiled
---

# My Neovim Keymaps

Config: `~/.config/nvim/init.vim` + `~/.config/nvim/vim-plug/plugins.vim` (local git repo; plugins via vim-plug).
**Leader is `\`** (the default). Run `:map <leader>` inside Neovim to list everything live.

Stack (2026-10): Neovim 0.11, built-in LSP with basedpyright + ruff for Python, nvim-cmp, coc.nvim for
JS/TS/CSS/HTML/JSON, nvim-treesitter, coder/claudecode.nvim.

---

## Claude Code (`\a…`)

| Keys | Mode | Action |
|------|------|--------|
| `\ac` | normal | Toggle the Claude Code terminal split |
| `\af` | normal | Focus the Claude split |
| `\ar` | normal | Resume a previous session (picker) |
| `\aC` | normal | Continue the last session |
| `\ab` | normal | Add the current buffer to Claude's context |
| `\as` | visual | Send the selection to Claude |
| `\aa` | normal | Accept Claude's proposed diff |
| `\ad` | normal | Reject Claude's proposed diff |

Claude sees the current file and selection automatically while connected; edits arrive as diffs in Neovim.

## LSP (Python and other non-coc filetypes)

| Keys | Action |
|------|--------|
| `gd` | Go to definition, in a new tab |
| `gD` | Go to declaration |
| `gi` | Go to implementation |
| `gr` | List references |
| `K` | Hover documentation |
| `\t` | Signature help |
| `\rn` | Rename symbol |
| `\lf` | Format the buffer (ruff) |

## Diagnostics

| Keys | Action |
|------|--------|
| `\e` | Show the diagnostics for the current line in a float |
| `[d` / `]d` | Previous / next diagnostic |
| `\xl` | Put all diagnostics in the location list |

## Completion (insert mode, nvim-cmp)

| Keys | Action |
|------|--------|
| `<C-j>` / `<C-k>` | Next / previous item (plain `<C-n>`/`<C-p>` when the menu is closed) |
| `<C-Space>` | Open the completion menu |
| `<CR>` | Confirm the selected item (only if one is selected) |
| `<C-e>` | Close the menu |
| `<Tab>` | Expand an UltiSnips snippet |

In JS/TS/CSS/HTML/JSON buffers coc.nvim handles completion instead.

## Windows

| Keys | Action |
|------|--------|
| `<C-h>` `<C-j>` `<C-k>` `<C-l>` | Move to the window left / down / up / right |
| `-` | Maximize the current window |
| `+` | Equalize all windows |
| `\r` / `\f` | Grow / shrink the window height by 20 lines |

## Save and quit

| Keys | Action |
|------|--------|
| `\w` | Save (force) |
| `\q` | Save and quit (force) |
| `\\q` | Save and quit all (force) |
| `\\w` | Save as UTF-8 |
| `:W` `:Q` `:Wa` `:Qa` | Typo-tolerant versions of `:w` `:q` `:wa` `:qa` |

## Notes, status and time

| Keys | Mode | Action |
|------|------|--------|
| `<C-s><C-e>` | normal | New TOC entry: copy the previous number and increment the last digit |
| `<C-s><C-i>` | normal | New TOC sub-entry: previous number + `.1` |
| `<C-s><C-d>` | normal | Append ` [Done]` to the line |
| `<C-s><C-p>` | normal | Append ` [Pending]` |
| `<C-s><C-o>` | normal | Append ` [Open]` |
| `<C-s><C-w>` | normal | Append ` [Work In Progress]` |
| `t?` | normal | Echo the current time |
| `\d` | normal | Run `date` |
| `<C-t><C-t>` | insert | Insert the current date and time |
| `<C-d>` | insert | Insert the current buffer's directory |

If `<C-s>` freezes the terminal, it's XON/XOFF flow control: add `stty -ixon` to `~/.bashrc`.

## Plugin keys worth remembering

| Keys / command | Plugin | Action |
|----------------|--------|--------|
| `gcc` / `gc` (visual) | vim-commentary | Toggle comment on a line / selection |
| `<C-p>` | ctrlp | Fuzzy-find files |
| `]c` / `[c` | vim-gitgutter | Next / previous changed hunk |
| `:Git` | vim-fugitive | Git status; `:Git blame`, `:Gdiffsplit` |
| `:NERDTreeToggle` | nerdtree | File tree |
| `zi` | built-in | Toggle folding (folds start open; treesitter-based) |

## Abbreviations (insert mode)

`cup` can you please · `lmk` let me know · `idk` I don't know · `ttl` talk to you later · `wip` work in progress ·
`gm` good morning · `ty` thank you · `thxy` / `tyo` sign-offs · `chy` can't hear you · `duk` do you know ·
`fml` five minutes late · `sop` `System.out.println()`

## See Also

- [Neovim Knowledge Base](/neovim.md) — install, configuration and plugin notes
- [CodeCompanion.nvim — Evaluation](/neovim-codecompanion.md) — an AI-assistant plugin that was evaluated and skipped
