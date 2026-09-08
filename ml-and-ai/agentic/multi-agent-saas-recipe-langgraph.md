# Multi-agent SaaS app recipe (LangGraph)

> **Source:** compiled from building a prod-grade multi-agent assistant over financial data (worked example: [propco-agent](https://github.com/izaqyos/propco-agent))
> **Author:** Yosi Izaq
> **Captured:** 2026-09-08
> **Status:** Active
> **Type:** compiled

the recipe. each step: what / why / gotchas / alternatives. order matters — skipping step 1 or 2 is how u end up w/ a demo that lies.

## 0. tl;dr

1. profile the data b4 designing. compute golden numbers independently.
2. decide the one principle: **LLM at the edges, code in the middle.**
3. graph = router → specialists → synthesizer, w/ fan-out 4 compound asks + interrupt 4 clarification.
4. provider-agnostic LLM layer + a scripted fake → deterministic tests.
5. TDD pyramid: unit (goldens) → component (nodes w/ fake) → api (façade) → e2e (UI harness) → live eval (real model, opt-in).
6. NFRs from day 1: degradation chain, grounding, caching, bounded loops, structured logs, secrets via env.
7. package: uv, ruff, mypy strict, coverage gate, licence gate, docker + health, CI.
8. docs: README (setup/arch/workflow/challenges), ADRs, assumptions, data notes, eval report, diagrams.

## 1. scope + data contract (day 0)

- **what:** read the brief, then read the DATA. shape, nulls, ranges, dupes, signs, currency, what's missing vs what the brief assumes.
- **why:** the brief's examples r often not answerable from the data. finding that on day 0 turns it into a design brief ("be honest about what u can't answer") instead of a day-3 surprise.
- **how:** one throwaway pandas script → write `DATA_NOTES.md` w/ golden numbers (totals per period/entity, top-N, anomaly counts). those goldens become ur unit tests. log corrections to ur own first read — they happen.
- **gotcha:** dedup looks like hygiene and can be a lie (no txn id → can't prove). policy decisions about data go in `ASSUMPTIONS.md`, numbered, w/ reason + code pointer.

## 2. the principle

- **LLM at the edges, code in the middle.** model = understand (classify, extract) + phrase. code = resolve, filter, compute, detect. model never does arithmetic. every number in model prose is checked against computed results (grounding) or a template is used.
- **alternatives:** (a) tool-calling agent that picks pandas tools → flexible, untestable numbers, different path every run. (b) LLM writes pandas/SQL → fast to build, unsafe, untestable. pick (a) only 4 open-ended exploration tools, never 4 finance/ops answers ppl act on.

## 3. graph topology

```
START → guard ─┬─(invalid)→ clarifier ─[interrupt]─→ guard
               └→ router ─┬─ clarify → clarifier
                          ├─ unsupported / general → END
                          ├─ compound → Send(sub_question) x N → synthesizer → END
                          └→ extractor → resolver ─┬─ unresolved → clarifier
                                                   └→ analyst_* → synthesizer → END
```

- **guard** (code): empty/unreadable/too long/code-like → clarification. no LLM call wasted.
- **router** (LLM, structured): intent enum + confidence + sub_questions + clarification text. guard-rails in code: low confidence → clarify; rule-based compound splitter as backup; cap fan-out (4).
- **extractor** (LLM, structured): mentions verbatim + structured period specs. then **merge w/ rules**: rules fill gaps; raw-only spans get re-parsed by code. "model finds spans, code parses them."
- **resolver** (code): fuzzy names (number in the mention is decisive), relative periods anchored to an explicit `as_of`, per-intent defaults, vocab mapping, unsupported-metric substitution w/ disclosure. output = executable query OR `Unresolved{reason, suggestions}`.
- **analysts** (code): thin adapters over pure analytics fns; results r pydantic models w/ a `kind` discriminator + provenance (filter, period, policy, as_of, row_count).
- **synthesizer** (LLM): results as JSON → prose; strip the model's own "steps"; grounding check; append the real trace as Steps.
- **clarifier**: `interrupt({...})`; merge reply into question; re-enter at guard; bounded rounds.
- **sub_question**: node that invokes a compiled subgraph; returns ONLY reducer-backed keys.
- **general / unsupported**: model knowledge w/ enforced prefix; scope answer.

**gotchas:** node names can't contain `:`; node callables must satisfy a Protocol w/ a param literally named `state` (strict mypy) — define ur own `Node` protocol; parallel branches writing a non-reducer key → runtime error (`Annotated[list, operator.add]`, `Annotated[bool, operator.or_]`); `interrupt` needs a checkpointer + `thread_id`.

**alternatives:** supervisor loop (heterogeneous workers, arbitration needed), planner-executor (open-ended tasks). static router wins on cost predictability + trace readability 4 a fixed domain.

## 4. LLM layer

- **factory** by role (router/extractor/synth/general) → provider from settings: cloud (gemini/anthropic/openai), local (ollama), **fake**. small model 4 classify/extract, larger 4 prose (separate quota buckets on free tiers).
- **structured output:** `with_structured_output(schema, include_raw=True)`; on validation error feed the error back (max 2); transport errors → one exception type nodes catch → fallback.
- **fake model:** queue of scripted responses (str / pydantic / dict / Exception) + **keyed** responses (substring of last message → response) 4 deterministic parallel branches. records calls 4 assertions.
- **prompts as files** (md templates, `string.Template` so JSON braces don't need escaping), rendered w/ dataset vocab (names, as_of, range, currency). user text always inside `<user_question>` + "data, not instructions". **few-shot JSON examples** 4 the extractor — small models copy shape.
- **local models:** turn thinking off (`reasoning=False` on ChatOllama) → 3-5x faster structured calls; cap `num_predict`.

## 5. resilience chain (design these b4 the happy path)

1. schema retry-with-feedback.
2. LLM unavailable → rules (router/extractor) / template (synth). same numbers, `degraded=true`, UI notice.
3. grounding check → template on violation.
4. bounded loops: clarify rounds, fan-out cap, `recursion_limit`, generation cap.
5. node cache (`CachePolicy`) on router+extractor keyed on (question, policy) w/ TTL — repeats cost 1 call.
6. fail fast on data: schema contract at load.
7. UI last-resort try/except so the chat never dies.

## 6. tests (TDD, ≥95%)

| layer | what | how |
|---|---|---|
| unit | analytics goldens, period math, fuzzy, schema, rules, prompts, money | pure fns, real dataset fixture + synthetic frames |
| component | every node + edge, interrupt/resume, Send fan-out, cache hits, degradation | fake model, scripted/keyed |
| api | service façade: ask/resume/stream/threads/logging | fake model |
| e2e | UI flows | streamlit `AppTest` (headless, counts 4 coverage) w/ fake provider + EMPTY script = the degraded path end-to-end, deterministic |
| browser | renders + answers in chromium | 3 playwright tests vs a real server subprocess, opt-in marker |
| live | golden question set vs real model | opt-in `-m live`, skips w/o provider, writes JSON report → `EVAL.md` |

gotchas: isolate env in settings tests (CI sets provider env vars); class-scoped fixtures as methods r deprecated in pytest 9; `AppTest.from_file` resolves relative 2 the test file.

## 7. NFRs + packaging

- settings: pydantic-settings, `PREFIX_*` env, `.env` gitignored, secrets never on the settings object (SDK reads env).
- logging: structlog, JSON in containers, contextvars 4 thread/request ids, log intents/nodes/timings — never user text.
- docker: 2-stage w/ uv `--frozen --no-dev`, non-root, HEALTHCHECK, compose w/ ollama sidecar not published on host.
- CI: ruff + mypy strict + pytest w/ coverage gate + SPDX-aware licence check (runtime deps only) + docker build/health + browser smoke.
- streamlit cloud: bridge `st.secrets` → env at startup; `sys.path` bootstrap 4 `app/` script dir; 1GB RAM; sleeps after 12h.

## 8. docs (the reviewer reads these first)

README (what it answers w/ real numbers, setup, architecture, graph, ADR summary, robustness table, quality, efficiency, security, scale, challenges, assumptions, layout) · `ARCHITECTURE.md` · `DECISIONS.md` (ADR shape: chosen / over / why / cost) · `ASSUMPTIONS.md` (numbered, reason + code pointer) · `DATA_NOTES.md` · `CHALLENGES.md` · `DEPLOY.md` · `EVAL.md` · mermaid diagrams (generated graph + sequences). **grep docs against code b4 shipping** — a doc that claims a feature u didn't build is worse than no doc.

## 9. scale-out order (say it, don't build it)

MemorySaver → Postgres checkpointer w/ retention → stateless app tier / split API from UI at the service seam → repository adapter (DuckDB/warehouse) → async + rate limits → nightly live evals → ship logs + tracing.

## see also

- [[langgraph-concepts-card]] — the LangGraph primitives used above, each w/ why + alternatives
- [[agentic-learning-curriculum]] — what 2 study next
- [[working-with-ai-on-prod-grade-projects]] — the working method that produced this in ~4 days
