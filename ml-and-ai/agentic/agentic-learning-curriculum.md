# Agentic systems — learning curriculum

> **Source:** compiled after shipping a LangGraph multi-agent app; gaps observed while building + what interviewers probe
> **Author:** Yosi Izaq
> **Captured:** 2026-09-08
> **Status:** Active
> **Type:** compiled

ordered by payoff. each item: why · resource type · est. hours · "done when". prefer papers/official docs + building over courses (u already build from scratch).

## tier 1 — cements what u just used (≈12h)

1. **LangGraph deep-dive** — read the docs 4 Send, interrupt, checkpointers, streaming, CachePolicy, Command; then read `langgraph/pregel` source 4 the superstep model. *done when:* u can explain why parallel branches need reducers + how resume re-executes a node. 3h.
2. **structured output reliability** — compare json_schema / tool-calling / json-mode across gemini, anthropic, openai, ollama; measure fill-rate on ur extractor schema w/ + w/o few-shots. *done when:* a 1-page table of provider behaviours. 3h.
3. **evals 4 LLM apps** — read: Hamel Husain "Your AI product needs evals"; LangSmith eval docs; OpenAI evals cookbook. build: grow ur golden set 2 50-100 Qs w/ paraphrases + adversarial; track intent accuracy, grounding rate, p50/p95. *done when:* eval report per (model, prompt version). 4h.
4. **prompt injection defence** — OWASP LLM Top 10; Simon Willison's writing; know: delimiters, closed action spaces, allow-lists, output validation, why filters fail. *done when:* u can defend ur design w/ the taxonomy. 2h.

## tier 2 — the expert-round topics (≈20h)

5. **agentic patterns** — Anthropic "Building effective agents"; LangGraph agent architectures page; ReAct paper; planner-executor; supervisor. *done when:* u can pick a pattern 4 3 given problems + say the cost. 3h.
6. **RAG properly** — chunking, hybrid retrieval (BM25 + dense), reranking, metadata filters, faithfulness eval (RAGAS ideas), when NOT 2 RAG (structured data). build a tiny one over ur KB w/ `nomic-embed-text` + rerank. *done when:* recall@k numbers on 20 questions. 6h.
7. **embeddings + vector search** — cosine vs dot, HNSW basics, quantisation tradeoffs, when sparse beats dense. 2h.
8. **cost/latency engineering** — semantic caching, batching, speculative/streaming UX, model tiering, token budgets, provider rate-limit design. write a cost model 4 ur app at 10k Q/day. 2h.
9. **observability 4 LLM apps** — LangSmith/OTel traces, request ids, sampling, PII redaction in logs. wire OTel exporter 2 a local collector once. 3h.
10. **fine-tuning vs prompting vs RAG** — LoRA/QLoRA shape, when a small tuned model beats a prompted big one; know the vocabulary (RLHF, DPO). reading only. 2h.
11. **multi-agent failure modes** — paper: "Why Do Multi-Agent LLM Systems Fail?" (Berkeley 2025) — taxonomy u can quote. 2h.

## tier 3 — ML depth (ongoing, from ur PILLARS plan)

12. finish naive bayes → logistic regression → small MLP from scratch (numpy); u already have attention/transformer + TF-IDF.
13. decoding: temperature/top-p/top-k, repetition penalty, constrained decoding — read one good post, then play w/ ollama params on ur extractor.
14. quantisation (Q4_K_M etc.), context length vs quality, KV cache — enough 2 reason about local models.

## domain (real-estate finance vocab, 2h)

NOI, cap rate, yield, IRR, DSCR, occupancy/vacancy, service charges, indexation, gross vs net rent, contribution vs net P&L, accruals vs cash, reversals/corrections in ledgers, why "duplicates" in a GL r not always duplicates. *done when:* u can explain each in one sentence + how it'd show up in a ledger.

## practice loop (weekly, 2h)

- pick one Q from ur eval set that failed/was slow → root-cause → fix prompt OR code → re-run eval → log the delta. that loop IS the job.

## see also

- [[multi-agent-saas-recipe-langgraph]] · [[langgraph-concepts-card]] · [[working-with-ai-on-prod-grade-projects]]
