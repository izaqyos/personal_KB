---
type: decision
title: CodeCompanion.nvim — Evaluation (skip for current stack)
timestamp: "2026-08-30T00:00:00Z"
author: Yosi Izaq
status: Active
capture_type: compiled
---

# CodeCompanion.nvim — Evaluation (skip for current stack)

> **Source:** [olimorris/codecompanion.nvim](https://github.com/olimorris/codecompanion.nvim) + [docs](https://codecompanion.olimorris.dev/) + [avante vs CodeCompanion (2026)](https://samuellawrentz.com/blog/neovim-ai-plugins-avante-codecompanion/) + eval against `~/.config/nvim/init.lua`
> **Author:** Yosi Izaq
> **Captured:** 2026-08-30
> **Status:** Active
> **Type:** compiled

**Verdict (2026-08-30):** good plugin. Do not install. Cursor + custom nvim Claude CLI wrapper + Codeium already cover the same jobs.

## Table of Contents
- [Repo facts](#repo-facts)
- [What it actually is](#what-it-actually-is)
- [vs avante.nvim](#vs-avantenvim)
- [Current stack (why skip)](#current-stack-why-skip)
- [When to revisit](#when-to-revisit)
- [Install gotchas if that day comes](#install-gotchas-if-that-day-comes)
- [See Also](#see-also)

## Repo facts

Checked 2026-08-30 via GitHub + docs.

| | |
|---|---|
| Repo | [olimorris/codecompanion.nvim](https://github.com/olimorris/codecompanion.nvim) |
| Stars / forks | 6,825 / 449 |
| License | Apache-2.0 |
| Created | 2023-12-27 |
| Last push | 2026-08-29 |
| Latest release | **v19.23.0** (2026-08-24) |
| Open issues | 11 (healthy ratio for this size) |
| Docs | [codecompanion.olimorris.dev](https://codecompanion.olimorris.dev/) |

Quality is not the question. Maintenance is real (rapid v19.x line, real docs site, ACP support).

## What it actually is

Neovim-native AI layer. Five **interactions**:

| Interaction | Command | Job |
|---|---|---|
| Chat | `:CodeCompanionChat` | Buffer chat with `#{buffer}`, slash commands, `@tools` |
| Inline | `:CodeCompanion` | Write/refactor into the current buffer |
| CLI | `:CodeCompanionCLI` | Terminal wrapper around agent CLIs (Claude Code, OpenCode, …) |
| Cmd | `:CodeCompanionCmd` | Generate Neovim commands |
| Background | (opt-in) | Titles, compacting |

Adapters: **HTTP** (Anthropic, OpenAI, Gemini, Copilot, Ollama, …) and **ACP** (Claude Code, Codex, Gemini CLI, Goose, Cursor CLI, …). Also MCP, prompt library (`/explain`, `/fix`, `/lsp`, `/tests`, `/commit`), and rules files (`CLAUDE.md`, `.cursor/rules`).

**Default adapter is GitHub Copilot.** Out of the box it expects `copilot.vim` / `copilot.lua`.

## vs avante.nvim

| | CodeCompanion | avante.nvim |
|---|---|---|
| Philosophy | Neovim (splits, `#buffer`, `/lsp`) | Cursor-in-nvim (sidebar + diff) |
| Stars (2026) | ~7k | ~17k |
| Fit here | Better of the two nvim plugins | Worse — we already have Cursor |

If only one nvim AI plugin: CodeCompanion. Avante clones a product we already run.

## Current stack (why skip)

| Surface | Job | Overlap with CodeCompanion |
|---|---|---|
| **Cursor** | Agent, MCP, rules, refactors | Chat + MCP + rules + agent |
| **Custom Claude wrapper** in `~/.config/nvim/init.lua` (`<leader>cc`, visual explain/fix, git review, commit msg) | Claude CLI in a split | `:CodeCompanionCLI` + `claude` is a nicer version of this |
| **Codeium** | Ghost-text completions | None (CodeCompanion is not a completion engine) |

Installing it adds a **fourth** AI surface, adapter/API-key config, and keymap collisions with existing `<leader>c*` maps. `:CodeCompanionCLI` does not replace Cursor. Inline/chat does not replace Codeium.

The custom wrapper's gap vs CodeCompanion: no proper inline **diff** review (it dumps text back into the buffer). That gap is not worth a whole plugin while Cursor is the agent surface.

## When to revisit

Install only if nvim becomes the place we **edit with an agent**, not just open files and poke Claude in a terminal:

1. Inline edits with a real diff (accept/reject) inside nvim
2. `#{buffer}` / LSP diagnostics as prompt context without copy-paste
3. Claude Code **inside** nvim via ACP, not a terminal split

Until then: keep Cursor for agent work, Codeium for completions, the Claude maps for the nvim CLI.

## Install gotchas if that day comes

- Set the chat/inline adapter explicitly. Default is Copilot; this config uses **Codeium**, not Copilot.
- Prefer Anthropic HTTP or `claude_code` ACP — match the existing Claude CLI, don't add Copilot.
- Do **not** also install avante.nvim.
- Rebind away from `<leader>c*` or retire the custom `Claude.*` wrapper first so maps don't collide.
- lazy.nvim snippet (from docs; adapters/config keys drift — re-read getting-started at install time):

```lua
{
  "olimorris/codecompanion.nvim",
  dependencies = { "nvim-lua/plenary.nvim" },
  opts = {
    interactions = {
      chat = { adapter = { name = "anthropic" } },
      inline = { adapter = "anthropic" },
      cli = {
        agent = "claude_code",
        agents = {
          claude_code = {
            cmd = "claude",
            args = {},
            description = "Claude Code CLI",
            provider = "terminal",
          },
        },
      },
    },
  },
},
```

Env: built-in Anthropic adapter looks for `ANTHROPIC_API_KEY`. ACP/CLI path uses the existing `claude` binary (no extra key if Claude Code is already logged in).

## See Also

- [neovim.md](/neovim.md) — Neovim setup dump (treesitter, lsp, cmp); this decision lives beside it, not inside it.
- [Local AI Resilience — Cloud↔Local Switch Guide](/ml-and-ai/llm-kb/local-ai-resilience-switch-guide.md) — the other daily-driver AI surfaces (VSCode / Claude Code / Cursor).
- [Claude Code — Live Plan-Usage Statusline](/ml-and-ai/llm-kb/claude-code-usage-statusline.md) — Claude Code CLI wiring (the thing the nvim wrapper already shells out to).
