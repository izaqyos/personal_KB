# Ornith-1.0-9B + Pi — Local Setup on M1 Max (32 GB)

> **Source:** Compiled from Ollama + Pi (earendil-works/pi) docs + DeepReinforce Ornith-1.0 release
> **Author:** Yosi Izaq (compiled)
> **Captured:** 2026-06-27
> **Status:** Active
> **Type:** compiled

---

## Goal & hardware fit

Run **Ornith-1.0-9B** (agentic-coding model) locally via **Ollama**, driven by the **Pi** coding-agent harness, on a **MacBook Pro M1 Max / 32 GB unified memory**.

**Why 9B (not 35B) on 32 GB:** Metal can use ~24 GB of the 32 GB. Ornith-9B (Q4) ≈ ~6 GB + KV cache → comfortable, leaves OS headroom. The 35B MoE (~18–20 GB) only runs at small context and leaves almost no headroom — not worth it on this box. See [`ornith-1.0-agentic-coding-model.md`](ornith-1.0-agentic-coding-model.md) for the full model family + per-size hardware notes.

> Personal machine — chosen deliberately over the CP-issued laptop, where installing unapproved npm tooling (Pi + its self-extension packages) is a policy/IT concern. Keep work source/customer data off this setup unless that's separately cleared.

## ⚠️ Two things to verify at install time (not fabricated here)
1. **Exact 9B GGUF repo/quant** — Ollama needs a GGUF. Confirmed on HF: `deepreinforce-ai/Ornith-1.0-9B` (full weights) and `deepreinforce-ai/Ornith-1.0-35B-GGUF`. The precise **9B-GGUF** tag was **not** confirmed — check [huggingface.co/deepreinforce-ai](https://huggingface.co/deepreinforce-ai) (or a community GGUF quant) before pulling.
2. **Pi npm package name** — search showed `@mariozechner/pi-coding-agent`; confirm on [github.com/earendil-works/pi](https://github.com/earendil-works/pi) before installing.

---

## 0. Prerequisites
```bash
# Homebrew (skip if present)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install node       # Pi is an npm CLI
brew install ollama
```

## 1. Start Ollama
```bash
brew services start ollama
ollama --version
curl -s http://localhost:11434/api/version
```

## 2. Pull Ornith-9B (GGUF) — verify path first (see ⚠️ above)
```bash
ollama pull hf.co/deepreinforce-ai/Ornith-1.0-9B-GGUF:Q4_K_M   # substitute real repo/quant
ollama list   # note the exact registered NAME
```
Quant: **Q4_K_M** (size/quality balance) or **Q5_K_M** for a bit more quality.

## 3. Give it a real context window
Ollama defaults to a tiny context. Bake 32K into a Modelfile (survives restarts):
```bash
cat > ./Modelfile <<'EOF'
FROM hf.co/deepreinforce-ai/Ornith-1.0-9B-GGUF:Q4_K_M
PARAMETER num_ctx 32768
EOF
ollama create ornith-9b -f ./Modelfile
```
(Global alternative: `OLLAMA_CONTEXT_LENGTH=32768 ollama serve`.) Start at 32K; bump to 64K later if memory pressure looks fine.

## 4. Smoke-test standalone (before Pi)
```bash
ollama run ornith-9b "Write a Python function to merge two sorted lists. Think step by step."
```
Expect `<think>…</think>` reasoning before the answer. Confirm it loads and memory holds (Activity Monitor → Memory).

## 5. Install Pi (verify package name — see ⚠️ above)
```bash
npm install -g @mariozechner/pi-coding-agent
pi --version
```

## 6. Point Pi at local Ornith
`~/.pi/agent/models.json`:
```bash
mkdir -p ~/.pi/agent
cat > ~/.pi/agent/models.json <<'EOF'
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "api": "openai-completions",
      "apiKey": "ollama",
      "models": [
        { "id": "ornith-9b", "input": ["text"] }
      ]
    }
  }
}
EOF
```
`id` must equal the `ollama list` NAME exactly (`ornith-9b` if you used the Modelfile, else the long `hf.co/...` tag).

## 7. Run
```bash
cd ~/your-project
pi
# inside Pi:
/model      # select ollama → ornith-9b
```

## 8. First agentic test (where Ornith earns its keep)
Give it a **loop** task, not a one-shot snippet:
> "There's a failing test in `tests/`. Run it, find the cause, fix the code, and re-run until it passes."

Watch the run→inspect→recover loop — that's the self-scaffolding payoff. Pi's minimal 4-tool core (`read`/`write`/`edit`/`bash`) gives the model the freedom that fits how Ornith was RL-trained.

---

## Troubleshooting / tuning
| Symptom | Fix |
|---|---|
| `<think>` text leaking into edits/commits | Check Pi's reasoning handling; may need an extension or stop-token tweak. Watch first session. |
| Slow / beachball / memory pressure | Drop `num_ctx` to 16K–24K; close heavy apps. 9B+32K should be fine on 32 GB. |
| Pi can't reach model | `curl http://localhost:11434/v1/models` should list it; `apiKey` just needs any non-empty string. |
| Model name mismatch | `id` in models.json must equal `ollama list` NAME exactly. |
| Want more quality | Re-pull Q5_K_M; 31B-dense only if you free memory (tight at 32 GB). |

---

## See Also

- [`ornith-1.0-agentic-coding-model.md`](ornith-1.0-agentic-coding-model.md) — model overview, pros/cons, benchmarks, harness-fit rationale.
- [`local-llm-setup-ollama-continue-vscode.md`](local-llm-setup-ollama-continue-vscode.md) — alternative harness (Continue in VSCode) for local models.
