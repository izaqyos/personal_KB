# Local LLM Setup - Ollama + Continue (VSCode)

> **Source:** Personal setup notes
> **Author:** Yosi Izaq
> **Captured:** 2026-04-20
> **Status:** Active
> **Type:** compiled

**Machine:** MacBook Pro M4 Pro, 12 cores, 48GB unified memory
**Date:** 04/2026
**Stack:** Ollama + Continue extension in VSCode

---

## 1. Final Model Lineup

| Model | Size | Role | Use Case |
|-------|------|------|----------|
| `qwen3-coder:latest` | 18 GB | chat / edit / apply | primary coding model - refactors, code review, repo-scale work |
| `deepseek-r1:14b` | ~9 GB | chat | hard bugs, reasoning, algorithm design, tradeoff analysis |
| `gemma4:26b` | 17 GB | chat | general chat, docs, explanations, non-code Qs |
| `qwen2.5-coder:1.5b` | ~1 GB | autocomplete | FIM autocomplete in editor - fast, always-loaded |
| `nomic-embed-text:latest` | 274 MB | embed | embeddings 4 @codebase semantic search |

---

## 2. Model Selection Rules

1. **code task** → Qwen3 Coder
2. **stuck on hard bug / need reasoning** → DeepSeek R1
3. **general chat, docs, emails** → Gemma4
4. **autocomplete runs silently** - no manual selection needed
5. `Cmd+'` toggles between chat models mid-convo

---

## 3. Performance Benchmarks (M4 Pro 48GB)

### qwen3-coder:latest
- eval rate: **53 tok/s**
- prompt eval: 498 tok/s
- load (warm): 64ms
- 100% GPU utilization

### deepseek-r1:14b
- eval rate: **69.5 tok/s**
- load (cold): 22s → subsequent ~50ms
- faster raw gen but thinks b4 answering so net similar

**Verdict:** all models run smoothly w/ headroom. no slowdown concerns on this rig.

---

## 4. Ollama Environment Variables

Add to `~/.zshrc`:

```bash
export OLLAMA_KEEP_ALIVE=1h
export OLLAMA_NUM_PARALLEL=2
export OLLAMA_MAX_LOADED_MODELS=2
```

1. `KEEP_ALIVE=1h` - holds models in memory 1hr, avoids reload penalty
2. `NUM_PARALLEL=2` - allows 2 parallel requests
3. `MAX_LOADED_MODELS=2` - keeps 2 models in memory simultaneously

Apply:

```bash
source ~/.zshrc
killall ollama && ollama serve &
```

---

## 5. Continue Config (~/.continue/config.yaml)

```yaml
name: Local Ollama
version: 1.0.0
schema: v1

models:
  - name: Fast Autocomplete
    provider: ollama
    model: qwen2.5-coder:1.5b
    apiBase: http://localhost:11434
    roles:
      - autocomplete

  - name: Qwen3 Coder
    provider: ollama
    model: qwen3-coder:latest
    apiBase: http://localhost:11434
    roles:
      - chat
      - edit
      - apply

  - name: DeepSeek R1 Reasoning
    provider: ollama
    model: deepseek-r1:14b
    apiBase: http://localhost:11434
    roles:
      - chat

  - name: Gemma4 General
    provider: ollama
    model: gemma4:26b
    apiBase: http://localhost:11434
    roles:
      - chat

  - name: Nomic Embed
    provider: ollama
    model: nomic-embed-text:latest
    apiBase: http://localhost:11434
    roles:
      - embed

context:
  - provider: code
  - provider: docs
  - provider: diff
  - provider: terminal
  - provider: problems
  - provider: folder
  - provider: codebase
```

---

## 6. VSCode Keyboard Shortcuts (Mac)

| Action | Shortcut |
|--------|----------|
| Open chat | `Cmd+L` |
| Inline edit (select code first) | `Cmd+I` |
| Add selection to chat | `Cmd+Shift+L` |
| Command palette | `Cmd+Shift+P` |
| Toggle model (in chat) | `Cmd+'` |
| Accept autocomplete | `Tab` |
| Dismiss autocomplete | `Esc` |
| Word-by-word accept | `Cmd+→` |
| Reload window | `Cmd+Shift+P` → "Developer: Reload Window" |

---

## 7. Useful CLI Commands

### Check whats loaded in memory
```bash
ollama ps
```
shows models currently in VRAM + GPU %. want 100% GPU on apple silicon.

### List all installed models
```bash
ollama list
```

### Pull a new model
```bash
ollama pull <model-name>
```

### Remove a model
```bash
ollama rm <model-name>
```

### Benchmark a model
```bash
ollama run <model-name> --verbose "write a python fn to reverse a linked list"
```
look for `eval rate` in output (tok/s).

### Test ollama API
```bash
curl http://localhost:11434/api/tags
```

### Check hardware
```bash
system_profiler SPHardwareDataType
```

### Memory pressure live
```bash
memory_pressure
```

---

## 8. Troubleshooting

### Autocomplete not working
1. check model pulled: `ollama list | grep qwen2.5-coder`
2. Cmd+Shift+P → "Continue: Enable Tab Autocomplete"
3. check logs: View → Output → "Continue - LLM Prompts/Completions"
4. make sure ur in code file (.py, .js, .ts) not .md
5. wait ~350ms debounce after typing stops
6. test directly: `ollama run qwen2.5-coder:1.5b "hi"`

### Model feels slow
1. `ollama ps` - verify 100% GPU (not CPU)
2. check memory pressure - close chrome tabs
3. first-run slow = cold load. subsequent fast
4. set `OLLAMA_KEEP_ALIVE=1h` to avoid reload

### Config YAML errors
1. yaml is whitespace-sensitive - use spaces NOT tabs
2. `- name:` = 2 spaces indent
3. fields under it = 4 spaces indent
4. list items under roles = 6 spaces indent

### Out of memory / eviction
1. `OLLAMA_MAX_LOADED_MODELS=2` keeps 2 models warm
2. running 3 big models simultaneously = pressure on 48GB
3. small autocomplete model (1.5b) barely counts against budget

---

## 9. Cleanup History

Started with 12 models (~100GB). Cleaned up:

### Removed (obsolete / superseded)
1. `qwen2.5-coder:1.5b-base` - replaced by `:1.5b` for autocomplete
2. `qwen2.5-coder:7b` - superseded by qwen3-coder
3. `qwen2.5-coder:14b` - superseded
4. `qwen2.5:14b` - superseded by qwen3.5
5. `deepseek-coder-v2:latest` - dupe of :16b
6. `deepseek-coder-v2:16b-lite-instruct-q4_K_M` - specific quant, redundant
7. `deepseek-coder-v2:16b` - replaced by qwen2.5-coder:1.5b for autocomplete
8. `llama3.1:8b` - superseded
9. `llava:13b` - gemma4 + qwen3.5 have native vision

### Saved: ~52 GB

---

## 10. Future Optimization Ideas

1. upgrade autocomplete 2 `qwen2.5-coder:3b` if 1.5b feels dumb
2. try `devstral-small:24b` 4 agentic multi-file workflows
3. bump qwen3-coder context to 64k if working w/ large repos
4. consider `qwen3-coder:30b` if current tag is smaller variant - check w/ `ollama show qwen3-coder:latest`

---

## 11. Key Learnings

1. **autocomplete ≠ chat models** - different roles, different model sizes. dont try 2 unify
2. **FIM training matters** - coder models specifically trained 4 fill-in-middle completion
3. **M4 Pro 48GB handles big local models** - no need 4 cloud fallback 4 most tasks
4. **yaml indentation is strict** - 2/4/6 spaces hierarchy
5. **Continue roles** define behavior: `chat`, `edit`, `apply`, `autocomplete`, `embed`
6. **OLLAMA_KEEP_ALIVE** is the single biggest UX win - stops reload penalty

---

## See Also

- [LLM KB Maintenance Guide](llm-knowledge-base-maintenance.md) -- KB hygiene patterns
- [ML/AI root](../) -- broader ML/AI content
