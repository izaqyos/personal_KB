# Ornith-1.0 — Self-Scaffolding Open Models for Agentic Coding

> **Source:** [DeepReinforce Ornith-1.0 release](https://deep-reinforce.com/ornith_1_0.html) + [MarkTechPost coverage](https://www.marktechpost.com/2026/06/25/deepreinforce-releases-ornith-1-0-an-open-source-coding-model-family-that-learns-its-own-rl-scaffolds/) (2026-06-25)
> **Author:** Yosi Izaq (compiled)
> **Captured:** 2026-06-27
> **Status:** Active
> **Type:** compiled

---

## TL;DR

**Ornith-1.0** is an open-source (MIT) family of LLMs from **DeepReinforce AI**, released **2026-06-25**, purpose-built for **agentic coding** (multi-file refactors, test-driven patches, tool-using autonomous loops). Its headline idea is **self-scaffolding RL**: the model learns *its own* harness/scaffold (task plan, tool calls, error recovery) jointly with the solution policy during reinforcement learning, instead of relying on a hand-designed agent harness.

At flagship scale it is competitive with — but does not beat — the strongest closed models.

---

## Model family

| Variant | Type | Notes |
|---|---|---|
| Ornith-1.0-9B | Dense | Edge-deployable. ~19 GB in bf16, fits a single 80 GB GPU. |
| Ornith-1.0-31B | Dense | Mid-tier. |
| Ornith-1.0-35B | MoE | ~3B active params/token. GGUF quant available. |
| Ornith-1.0-397B | MoE | Flagship. |

- **Base models:** built on **Gemma 4** and **Qwen 3.5**.
- **Output style:** emits reasoning traces in `<think>` blocks before the final answer.
- **Context length:** up to **262,144 tokens** (via vLLM serving).
- **License:** **MIT**, on Hugging Face under `deepreinforce-ai`, **no regional restrictions**.

## Self-scaffolding RL (the core innovation)

Rather than a fixed human-built agent harness, the model treats the **scaffold as a learnable object** that co-evolves with the policy:

1. Model proposes a refined scaffold (plan + tool sequence + recovery strategy).
2. Uses that scaffold to generate solution rollouts.
3. Rewards flow back to **both** the scaffold-generation and solution stages.

Optimization: **token-level GRPO** with **asynchronous pipeline-RL** and **staleness weighting**.

### Anti-reward-hacking safeguards (3 layers)
1. **Immutable outer trust boundary** — isolates the environment and tools.
2. **Deterministic monitor** — flags banned actions (e.g. zero reward for reading withheld/solution paths).
3. **Frozen LLM judge** — veto layer on top of the verifier so the model can't game scores during RL.

## Benchmarks

| Benchmark | Ornith 397B | Ornith 9B | For reference |
|---|---|---|---|
| Terminal-Bench 2.1 | 77.5 | 43.1 | Opus 4.7 = 70.3; Opus 4.8 = 85 |
| SWE-Bench Verified | 82.4 | 69.4 | Opus 4.8 = 87.6 (best); GLM-5.2-744B also ahead |

- 397B **beats Claude Opus 4.7** on both, but **trails Opus 4.8 and GLM-5.2-744B**.
- 9B is the standout efficiency story: matches/exceeds much larger non-agentic models (e.g. Gemma 4-31B) on these coding tasks.
- SOTA claims are **scoped to open models of comparable size** — read them that way.

---

## Pros / Cons of using Ornith-1.0

### Pros ✅
- **Open weights + MIT license, no regional restrictions** — self-host, fine-tune, ship commercially, no per-token API cost or data-egress to a vendor.
- **Strong open-source coding performance** — best-in-class among comparable-size open models; 397B is in the same conversation as frontier closed models on SWE-Bench.
- **Excellent small-model efficiency** — 9B runs on a single 80 GB GPU (~19 GB bf16) yet posts respectable agentic-coding scores; viable for **on-prem / air-gapped / edge** deployment.
- **Agentic by design** — generates its own plans, calls tools, inspects intermediate results, and rewrites failing steps without a bespoke external harness. Less harness engineering for you.
- **Long context** — 262k tokens supports large multi-file repos in one window.
- **Thought-safety baked into training** — explicit anti-reward-hacking design (trust boundary / monitor / frozen judge) is a maturity signal for an open release.

### Cons / Caveats ⚠️
- **Not frontier-leading** — 397B does **not** beat Claude Opus 4.8 or GLM-5.2-744B; if you need absolute top accuracy, closed frontier models still win.
- **Flagship is heavy** — 397B MoE needs serious GPU infrastructure; the practical open-source value is mostly the 9B/31B/35B tier.
- **Narrow specialization** — tuned for **agentic coding**. Don't assume parity on general chat, reasoning-outside-code, multilingual, or non-coding agentic tasks (not what it was benchmarked on).
- **New & unproven in production** — released 2026-06-25; limited real-world track record, ecosystem tooling, and long-term maintenance signal.
- **SOTA claims are scoped** — "state of the art" = among open models of similar size, **not** across all models. Easy to over-read.
- **Self-scaffolding is a double-edged sword** —  autonomous tool use / self-directed recovery raises the bar for **sandboxing and trust boundaries** on your side; the model's training-time safeguards don't replace runtime isolation in your environment.
- **Benchmark ≠ your codebase** — Terminal-Bench / SWE-Bench scores may not transfer to your stack, languages, or internal conventions; pilot before committing.

### When to pick it
- You want **self-hosted / on-prem** agentic coding with no vendor lock-in or data egress → strong fit (especially 9B–35B).
- You're cost-sensitive or have air-gap/compliance constraints → strong fit.
- You need **absolute best** patch accuracy and can use a hosted API → frontier closed models (Opus 4.8) still edge it out.

---

## Harness fit (how to actually run it)

Ornith only shows its edge inside a **tool-using agent loop** (run → inspect → recover) — as a plain chat model in the Ollama REPL you're testing only raw coding knowledge, which undersells it.

**Key nuance — it's self-scaffolding.** Ornith learned its *own* plan / tool-sequence / error-recovery during RL. So harness choice matters in an unusual way:

- ✅ **Minimal, freedom-giving harnesses fit best** — just expose tools (shell, file read/write/edit, run tests) and let the model drive. This lets Ornith use the scaffold it actually learned.
- ⚠️ **Heavy, prescriptive harnesses can *fight* it** — forced plan-then-act phases, rigid ReAct templates, or sub-agent orchestration partially override the learned scaffold (two planners arguing). Structure that *helps* most models is partly redundant here.

### Pi (`pi.dev` / `earendil-works/pi`) — near-ideal match
Mario Zechner's minimal terminal coding harness: **4-tool core (`read`/`write`/`edit`/`bash`) + a sub-1,000-token system prompt**, aggressively extensible, no baked-in workflow. That minimalism is exactly the "tools + autonomy, no script" profile self-scaffolding wants. Pi speaks OpenAI-compatible, so it drives an Ollama-served Ornith directly.

`~/.pi/agent/models.json`:
```json
{
  "providers": {
    "ollama": {
      "baseUrl": "http://localhost:11434/v1",
      "api": "openai-completions",
      "apiKey": "ollama",
      "models": [{ "id": "hf.co/deepreinforce-ai/Ornith-1.0-35B-GGUF", "input": ["text"] }]
    }
  }
}
```
Then `/model` to switch. Use the exact tag from `ollama list` as the `id`.

**Cautions on a 48 GB box (M4 Pro):**
- **Context budget** — Pi's recommended 128K context adds ~8 GB on top of the ~18–20 GB (35B MoE Q4) model ≈ ~28 GB; fits the ~36 GB Metal budget but near the top. Start at 32–64K, confirm stable, then push up; use Pi's `/compact` for long sessions.
- **`<think>` blocks** — Ornith emits reasoning traces. Watch the first session; if they leak into edits/tool calls, add a Pi extension or stop/parse tweak.

### Where it's *not* the right tool (use the sibling)
General chat/explanation → `qwen3.6:27b` · pure reasoning/math → `deepseek-r1:14b` · inline FIM autocomplete → `qwen2.5-coder:1.5b`. The agentic-coding loop is Ornith's lane.

### Use cases it's built to excel at
Multi-file bug fixing (SWE-Bench-style issue resolution), test-driven patches, terminal/tool-using tasks (Terminal-Bench), multi-step refactors, and **self-recovery from a failed first attempt** — that error-adapt loop is the self-scaffolding payoff.

---

## See Also

- [`ornith-pi-local-setup-m1max.md`](ornith-pi-local-setup-m1max.md) — step-by-step install/setup: Ornith-9B via Ollama + Pi on an M1 Max / 32 GB.
- [`local-llm-setup-ollama-continue-vscode.md`](local-llm-setup-ollama-continue-vscode.md) — running open-weight models locally (relevant for the 9B/35B-GGUF variants).
