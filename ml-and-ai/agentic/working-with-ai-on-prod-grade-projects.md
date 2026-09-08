# Working with AI on prod-grade projects — principles

> **Source:** distilled from a ~4-day human+AI build of a tested, documented, deployed multi-agent app ([worked example](https://github.com/izaqyos/propco-agent)); my 30y of building systems applied 2 AI collaboration
> **Author:** Yosi Izaq
> **Captured:** 2026-09-08
> **Status:** Active
> **Type:** compiled

how I get a top-tier AI 2 produce a *large* production-grade project — not a demo — and stay in control. principles, then the concrete protocol.

## principles

1. **plan first, execute autonomously.** state objectives AND meta-objectives up front (what 2 build, what I want 2 learn, what I need 4 the review). one plan review, then let it run. re-planning mid-flight is where ppl burn tokens + attention.
2. **the expensive model writes the plan; cheaper ones (or fresh sessions) execute it.** the plan carries **binding interfaces + acceptance criteria** (signatures, models, golden numbers), and only just-in-time step detail. interfaces r the contract; steps r cheap 2 regenerate. this is exactly how I'd brief a senior → mid engineer.
3. **one live tracker = resilience 2 interruptions.** a single `PLAN.md` w/ checkboxes, a RESUME HERE marker, a progress log, and a memory pointer 2 it. every stop leaves the next step written down; resume = read tracker, continue. sessions die, laptops sleep, ctx windows fill — the tracker doesn't care.
4. **decisions as multiple choice w/ a recommendation.** the AI asks 3-4 targeted Qs, recommends one option each, I answer in seconds; everything not blocked on the answer proceeds meanwhile. never open-ended "what do u want?".
5. **profile the data b4 designing.** goldens computed independently of the code under test. the brief lied (unanswerable examples); the data told the truth (44% dup rows, no prices, wrong currency). corrections 2 the first read get logged, not hidden.
6. **TDD w/ hard gates per task.** ruff, mypy strict, pytest, coverage ≥95, licence, docker health — on every commit, in CI. the AI is fast; gates r what make fast safe. red CI → root cause, never a workaround.
7. **LLM at the edges, code in the middle** (in the product AND in the process). the model understands + phrases; code decides + computes; every number is grounded or templated. same 4 my workflow: the AI drafts, deterministic gates decide.
8. **design 4 swaps.** provider-agnostic layers, repository protocols, config over code. the interviewer's "use gemini" was a config change bc the layer already existed.
9. **smoke against reality early.** run the real model on 10-15 questions on day 1-2; let evidence drive prompt changes (thinking off → 5x faster; few-shots → fields filled). record fixtures b4/after.
10. **overnight autonomy protocol.** pre-grant permissions, name the outbound gates (repo create, deploy, KB push, anything public), define the morning report location. then sleep. humans need sleep; the tracker + gates keep the AI honest w/o me.
11. **hygiene by design.** public repo w/ my identity + no tooling traces; public/private knowledge split (generic learnings → KB, tactical/company-specific → private); secrets only via env; never paste confidential stuff into anything.
12. **fix tooling friction locally + write it down.** multi-account gh, credential helpers, script-dir imports — 10 min each, documented in the tracker so the next session doesn't rediscover them.
13. **meta-learning is a deliverable.** recipe, concepts card, curriculum, interview prep, this doc. the project is temporary; the compressed knowledge compounds.
14. **own mistakes as facts.** what happened, impact, correction, what changes. no apologies, no drama — in commit messages, docs, and the tracker. (the AI's first data read was wrong 3 times; the log says so; the tests prove the fix.)
15. **docs r claims — grep them against the code.** one doc claimed a feature that didn't exist; caught in self-review. a reviewer who finds that trusts nothing else.

## the protocol (what I actually do)

```
1. write objectives + meta-objectives (10 lines).           me
2. plan mode: explore, profile data, ask 3-4 MCQs, plan.    AI (top model)
3. review plan once; lock decisions.                        me
4. execute phase by phase, TDD, gate, commit, push.         AI (any model)
   tracker updated at every task; memory pointer kept.
5. smoke vs real model; log findings; adjust prompts.       AI
6. self-review w/ an expert lens → fixes + open list.       AI
7. docs: README, ADRs, assumptions, data notes, eval.       AI, my register
8. meta docs: recipe, concepts, curriculum, prep.           AI → my KB
9. outbound steps only on my explicit go.                   me
10. morning report at the top of the tracker.               AI
```

## what 30 years add that the AI doesn't have by default

- knowing which corner cases matter (partial periods, sign conventions, dup semantics in a GL, quota as a design input).
- insisting on gates + evidence over vibes.
- the scale-out order (checkpointer → stateless tier → data adapter → async → evals → observability) from having done it.
- taste 4 what NOT 2 build (allocation view, auth, multi-entity) and saying so in writing.
- the register: docs a reviewer reads as a senior engineer's, not a model's.

## anti-patterns I avoid

- letting the AI "just start coding" w/o a plan or data profile.
- open-ended questions 2 me mid-build.
- huge single sessions w/ no tracker → context loss = rework.
- accepting "tests pass" w/o coverage/gates in CI.
- docs written b4 the smoke run (they'd describe a fantasy).

## see also

- [[multi-agent-saas-recipe-langgraph]] · [[langgraph-concepts-card]] · [[agentic-learning-curriculum]]
