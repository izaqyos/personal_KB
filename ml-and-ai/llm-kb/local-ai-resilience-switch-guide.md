---
type: reference
title: Local AI Resilience — Cloud↔Local Switch Guide (VSCode / Claude Code / Cursor)
description: "Goal: reduce reliance on cloud LLM providers across the 3 daily-driver tools (VSCode, Cursor, Claude Code) by routing to local Ollama models on the M4 Pro (48 GB)."
timestamp: "2026-07-06T00:00:00Z"
author: Yosi Izaq (compiled)
status: Active
capture_type: compiled
---

# Local AI Resilience — Cloud↔Local Switch Guide (VSCode / Claude Code / Cursor)

> **Source:** Compiled from Ollama, Anthropic/Claude Code, and Cursor documentation + community reports (research pass 2026-07-06)
> **Author:** Yosi Izaq (compiled)
> **Captured:** 2026-07-06
> **Status:** Active
> **Type:** compiled

---

## TL;DR

Goal: reduce reliance on cloud LLM providers across the 3 daily-driver tools (VSCode, Cursor, Claude Code) by routing to local Ollama models on the M4 Pro (48 GB).

| Tool | Verdict | Why |
|---|---|---|
| **VSCode + Continue** | ✅ Fully local | Already the default setup — see [Local LLM Setup guide](/ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md). Nothing to "switch." |
| **Claude Code** | ✅ Genuinely local | Ollama (≥v0.14.0) now speaks Anthropic's Messages API natively — point `ANTHROPIC_BASE_URL` at it, no proxy needed. |
| **Cursor** | ⚠️ Not actually local | Every request — even with a custom model override — routes through Cursor's own cloud backend (`api2.cursor.sh`) for "prompt building." Your local Ollama must be tunneled to the public internet for Cursor's servers to reach it. Tab/autocomplete can **never** use a custom model. Documented below for completeness, but **this does not deliver real resilience** — no offline capability, no privacy benefit, chat-only, and still depends on Cursor's own service being up. |

---

## 1. Current local model roster + role assignment (Ollama, M4 Pro 48GB)

Freshness-swept 2026-07-06. Verdict per role:

| Model | Role | Freshness verdict |
|---|---|---|
| `qwen3.6:27b` | Primary coding + general reasoning | ✅ Still best-in-class at this size (beats Gemma 4 31B on coding/GPQA) |
| `hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF` | Agentic / multi-file / tool-using coding | ✅ Still best-in-class for this VRAM tier — see [Ornith-1.0 KB](/ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md) |
| `qwen3:14b` | Hard-bug reasoning (use `/think` mode) | ✅ **Action taken 2026-07-06:** pulled to replace `deepseek-r1:14b` (DeepSeek never shipped a small R2; Qwen3's hybrid think/no-think mode is the current mid-size open-weight reasoning leader) |
| `gemma4:26b-a4b-it-qat` | General chat, docs, non-code Qs | ✅ Still "most practical local model" for its class |
| `qwen3.5:9b` | Lighter/faster general chat | ✅ No clearly superior same-size successor yet |
| `qwen2.5-coder:1.5b` | Autocomplete / FIM | ⚠️ Technically dated but no confirmed smaller successor fits the ~36GB Metal budget (Qwen3-Coder-Next's smallest tier needs ~46-52GB) — keep for now, re-check periodically |
| `nomic-embed-text` | Embeddings | not assessed (stable utility model) |

**Deprecated:** `deepseek-r1:14b` (9.0 GB) — superseded, retained on disk, safe to `ollama rm deepseek-r1:14b` once `qwen3:14b` is confirmed working for you.

**Correction on naming:** there is no separate "Qwen3-Thinking-14B" checkpoint on Ollama/HF — `qwen3:14b` itself is the hybrid model; toggle reasoning via `/think` or `/no_think` in the prompt (or `enable_thinking` param).

---

## 2. VSCode + Continue — already fully local

No switch needed — this is your default local setup. Full model lineup, Continue `config.yaml`, keyboard shortcuts, and troubleshooting: [Local LLM Setup — Ollama + Continue (VSCode)](/ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md) (refreshed 2026-07-06 with the roster above).

**Verify you're in local mode:** `ollama ps` shows the model loaded with GPU% near 100; Continue's chat panel shows your local model name (not a cloud provider name).

---

## 3. Claude Code — switch to local (Ollama's native Anthropic API)

Ollama ≥ v0.14.0 exposes a native Anthropic Messages API endpoint — no translation proxy required for basic chat + tool use. Confirmed: this machine runs **Ollama 0.30.10**, well past the threshold.

### Step by step

1. **Confirm Ollama version** (already done): `ollama --version` → should be ≥ 0.14.0.
2. **Pick a model for the session:**
   - Agentic/tool-heavy work (multi-file edits, running tests) → `hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF` (purpose-built for this — self-scaffolding RL, see its KB entry).
   - General chat/reasoning → `qwen3.6:27b` or `qwen3:14b`.
3. **Point Claude Code at Ollama** (one-off, current shell):
   ```bash
   export ANTHROPIC_BASE_URL=http://localhost:11434
   export ANTHROPIC_AUTH_TOKEN=ollama          # dummy token — Ollama doesn't check it
   export ANTHROPIC_MODEL=hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF
   claude
   ```
4. **Switch back to cloud Claude:** unset the three vars, or just open a fresh shell that doesn't export them:
   ```bash
   unset ANTHROPIC_BASE_URL ANTHROPIC_AUTH_TOKEN ANTHROPIC_MODEL
   claude
   ```

### One-command toggle (recommended)

Add to `~/.zshrc`:
```bash
claude-local() {
  ANTHROPIC_BASE_URL=http://localhost:11434 \
  ANTHROPIC_AUTH_TOKEN=ollama \
  ANTHROPIC_MODEL="${1:-hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF}" \
  claude
}
```
Usage: `claude-local` (defaults to Ornith) or `claude-local qwen3.6:27b` for a different local model. Plain `claude` (no function) still goes to the cloud as normal — the two coexist without conflict.

### Caveats

- **No prompt caching** and **no `tool_choice` support** in Ollama's Anthropic-API mode.
- Context should be generous (32–64K+) — all three candidate models here natively support 262144, so this isn't a constraint.
- **Tool-calling can be flaky with local models not tuned for Claude Code's exact schema** — documented GitHub issues show malformed tool-call JSON and models emitting raw JSON as text instead of a proper `tool_use` stop reason ([ollama/ollama#15390](https://github.com/ollama/ollama/issues/15390), [#15529](https://github.com/ollama/ollama/issues/15529)). This is exactly why **Ornith is the recommended default** here — it was RL-trained specifically for agentic tool-use loops, unlike general chat models pressed into this role.

---

## 4. Cursor — cloud-routed only (documented for completeness)

> ⚠️ **Read this before setting it up:** Cursor's "custom model" feature does **not** run inference locally in any meaningful resilience sense. Per Cursor's own docs: *"Even if you use your API key, your requests will still go through our backend! That's where we do our final prompt building... Cursor's Zero Data Retention policy does not apply when you use your own API keys."* Confirmed by traffic capture hitting `api2.cursor.sh`, not your machine. **Your local Ollama server must be tunneled to the public internet** (ngrok/Cloudflare Tunnel/Tailscale Funnel) for Cursor's cloud to reach it — `localhost` alone never works. This gives you: cheaper/self-hosted inference for Chat only. It does **not** give you: offline capability, privacy, or independence from Cursor's own service uptime.

### Setup (if you still want it, for Chat only)

1. Expose Ollama publicly, e.g.: `ngrok http 11434` → note the `https://…ngrok…` URL (ephemeral on free ngrok — changes every restart, needs re-entry).
2. Cursor → **Settings → Models → Add Custom Model**.
3. **Model name:** any label (avoid special characters — Cursor strips them and can throw "Model Not Found").
4. **Override OpenAI Base URL:** your tunnel URL (e.g. `https://abc123.ngrok.io/v1`).
5. **OpenAI API Key:** any non-empty placeholder (`ollama`, `sk-local-1234` — Cursor just checks it's non-empty).
6. Click **Verify**.

### Hard limitations

- **Tab/autocomplete cannot use a custom model, full stop** — hard-locked to Cursor's own model regardless of this setup.
- **Agent mode is unreliable** with custom endpoints — an open, staff-confirmed bug sends requests without a `model` parameter, causing `"model is required"` errors; Agent mode also uses the Responses API format, which breaks Chat-Completions-only local servers.
- Single **global** base-URL override — can't run different local models for different purposes simultaneously the way Continue/Claude Code can.
- Free-plan Cursor blocks custom/named models entirely, regardless of local compute available.
- Context window silently forced to 1M tokens for unrecognized model names — can crash smaller local models expecting a normal context size.

**Recommendation:** given the tunnel requirement and the "still routes through Cursor's cloud" reality, this doesn't serve the resilience goal well. If Cursor is your primary daily driver, VSCode+Continue and Claude Code (both above) are where the real local-AI resilience lives; treat Cursor's local wiring as, at best, a cost optimization for Chat, not a fallback for outages or connectivity loss.

---

## 5. Quick reference — flipping modes

| Tool | Go local | Go back to cloud |
|---|---|---|
| VSCode + Continue | Default state — nothing to do | Add/select a cloud model in Continue's model picker |
| Claude Code | `claude-local` (see §3) | plain `claude` (fresh shell, or `unset ANTHROPIC_*`) |
| Cursor | Custom Model override + tunnel (see §4) — **still cloud-routed** | Switch back to a Cursor-native model in Settings → Models |

---

## See Also

- [Local LLM Setup — Ollama + Continue (VSCode)](/ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md) — full VSCode/Continue model lineup + config.
- [Ornith-1.0 (agentic-coding model)](/ml-and-ai/llm-kb/ornith-1.0-agentic-coding-model.md) — the recommended model for local Claude Code agentic work.
- [Ornith-9B + Pi local setup (M1 Max)](/ml-and-ai/llm-kb/ornith-pi-local-setup-m1max.md) — a parallel local-harness setup on different hardware.
