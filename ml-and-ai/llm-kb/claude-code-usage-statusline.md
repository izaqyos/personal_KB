---
type: guide
title: Claude Code — Live Plan-Usage Statusline (5h/weekly %, Fable %, budget warnings)
timestamp: "2026-07-06T00:00:00Z"
author: Yosi Izaq
status: Active
capture_type: compiled
---

# Claude Code — Live Plan-Usage Statusline

> **Source:** Live wiring session 2026-07-06 (CC 2.1.201, native install, macOS — verified working)
> **Author:** Yosi Izaq
> **Captured:** 2026-07-06
> **Status:** Active
> **Type:** compiled

Wire the `/usage` panel's plan-limit data (session 5h %, weekly all-models %, **Fable/premium-tier weekly %**, reset times) into the Claude Code statusline, with color warnings at **≤20%** (⚠️ yellow) and **≤10%** (🔴 red) budget remaining.

Result line:

```
Fable 5 · ctx 62% · 5h 9%→20:00 · wk 21%→Fri 21:00 · fable 25%
```

## Table of Contents
- [Architecture — 3 data sources](#architecture--3-data-sources)
- [How to make it work](#how-to-make-it-work)
- [The OAuth usage endpoint (the key trick)](#the-oauth-usage-endpoint-the-key-trick)
- [Statusline stdin schema (relevant fields)](#statusline-stdin-schema-relevant-fields)
- [The script](#the-script)
- [Testing](#testing)
- [Caveats & troubleshooting](#caveats--troubleshooting)
- [See Also](#see-also)

## Architecture — 3 data sources

| Source | Gives | Latency | Status | Use for |
|---|---|---|---|---|
| **statusline stdin JSON `rate_limits`** | 5h % + weekly-all % + epoch reset times | 0 (pushed per response) | official | primary, per-render |
| **OAuth usage endpoint** | everything `/usage` shows incl. **`weekly_scoped` = Fable-tier %** | ~200ms | undocumented (works) | enrichment, cached 60s |
| **`claude -p "/usage"` subshell** | full panel text + behavioral breakdown (top skills/MCP/context profile) | ~3.7s | works | manual deep-dive only — too slow per-render |

Design: render from stdin every time; refresh the endpoint via a 60s-TTL cache file; fall back to cached endpoint values when stdin `rate_limits` is absent (before the first response in a session).

## How to make it work

1. Save the script (below) as `~/.claude/statusline-usage.py`, `chmod +x` it.
2. Wire `~/.claude/settings.json`:
   ```json
   "statusLine": {
     "type": "command",
     "command": "/Users/yosii/.claude/statusline-usage.py",
     "padding": 0
   }
   ```
3. Restart / next session — statusline appears after the first response.

## The OAuth usage endpoint (the key trick)

The statusline stdin only carries plan-wide 5h + 7d. The **model-scoped weekly (Fable)** comes from the same endpoint the `/usage` panel uses:

```bash
TOK=$(security find-generic-password -s "Claude Code-credentials" -w \
      | python3 -c "import sys,json; print(json.load(sys.stdin)['claudeAiOauth']['accessToken'])")
curl -s "https://api.anthropic.com/api/oauth/usage" \
     -H "Authorization: Bearer $TOK" \
     -H "anthropic-beta: oauth-2025-04-20"
```

Response shape (the useful part is `limits[]`):

```json
{ "limits": [
    {"kind": "session",       "percent": 9,  "resets_at": "2026-07-06T17:00:00+00:00", ...},
    {"kind": "weekly_all",    "percent": 21, "resets_at": "2026-07-06T18:00:00+00:00", ...},
    {"kind": "weekly_scoped", "percent": 25, ...}   // ← the Fable/premium-tier weekly
] }
```

Token lives in macOS Keychain item **"Claude Code-credentials"** (JSON → `claudeAiOauth.accessToken`). Read it per call; never write it anywhere (incl. the cache — cache stores percentages only).

## Statusline stdin schema (relevant fields)

```json
{
  "model": {"display_name": "Fable 5"},
  "context_window": {"used_percentage": 62},
  "rate_limits": {
    "five_hour": {"used_percentage": 9,  "resets_at": 1783702800},
    "seven_day": {"used_percentage": 21, "resets_at": 1783706400}
  }
}
```

- `rate_limits` = Pro/Max only, appears **after the first API response** of the session (fallback needed before that).
- `resets_at` is **epoch seconds** on stdin but **ISO string** from the endpoint — handle both.
- Statusline re-runs event-driven (each assistant message, debounced 300ms); optional `refreshInterval` (seconds) for idle re-runs — only needed for live countdowns; absolute reset times avoid it.

## The script

Live copy: `~/.claude/statusline-usage.py` (v1.2.0). Core logic:

- parse stdin → model, ctx %, 5h/7d rate limits
- `cached_endpoint()`: cache-file mtime TTL 60s → on miss, Keychain token + curl endpoint → keep stale cache on fetch failure (grace)
- per window prefer stdin (fresher), fall back to endpoint cache; `weekly_scoped` only exists endpoint-side
- color per window by **remaining** budget: `>20%` green · `≤20%` yellow + ⚠️ · `≤10%` red + 🔴
- ctx % keeps separate thresholds (50/75) — absorbed from the previous inline statusline
- always print *something* (`usage n/a` worst case) — a statusline that throws renders nothing

Perf: ~33ms on cache-hit (python startup dominates). Keep it fast — it runs on every render.

## Testing

```bash
# endpoint path (no rate_limits on stdin):
echo '{"model":{"display_name":"Fable 5"}}' | ~/.claude/statusline-usage.py
# warn thresholds:
echo '{"model":{"display_name":"Fable 5"},"rate_limits":{"five_hour":{"used_percentage":93,"resets_at":1783537200},"seven_day":{"used_percentage":82,"resets_at":1783623600}}}' | ~/.claude/statusline-usage.py
# speed (must stay well under ~1s):
time (echo '{}' | ~/.claude/statusline-usage.py >/dev/null)
# settings validity:
jq -e '.statusLine' ~/.claude/settings.json
```

## Caveats & troubleshooting

- **`fable %` segment rides an undocumented endpoint** — if Anthropic changes it, that segment silently disappears; the rest keeps working. Check with the curl above.
- **Nothing renders?** Script must exit 0 and print one line even on bad input. Test with `echo '{}' |`.
- **Old statusline still showing** — settings load at session start; restart or reload config.
- **`claude usage` subcommand doesn't exist**; `claude -p "/usage"` works (built-in slash commands run in print mode) but costs ~3.7s.
- **Existing statusLine?** Only one can be configured — merge its segments into the script instead of losing them (that's where the ctx % segment here came from).
- Don't hammer the endpoint — 60s cache is plenty; percentages move slowly.

## See Also

- [local-llm-setup-ollama-continue-vscode.md](/ml-and-ai/llm-kb/local-llm-setup-ollama-continue-vscode.md) — the local-LLM side of the tooling stack.
- [local-ai-resilience-switch-guide.md](/ml-and-ai/llm-kb/local-ai-resilience-switch-guide.md) — fallback when cloud budget runs out (what these warnings give you lead time for).
