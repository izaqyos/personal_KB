# LangGraph concepts card

> **Source:** compiled from using LangGraph 1.2 in a prod-grade multi-agent app ([worked example](https://github.com/izaqyos/propco-agent)); LangGraph docs
> **Author:** Yosi Izaq
> **Captured:** 2026-09-08
> **Status:** Active
> **Type:** compiled

one card per primitive: what · where it fits · why · scale/optimisation notes · alternatives · gotchas. langgraph 1.2.x, langchain-core 1.6.

## StateGraph + typed state

- **what:** `StateGraph(State)` w/ `State` a TypedDict (or pydantic). nodes return partial updates (`dict[str, Any]`); scalars overwrite, `Annotated[..., reducer]` keys merge.
- **why:** explicit contract 4 what each node reads/writes; parallel-safe merging.
- **notes:** keep state small + serialisable (checkpointer pickles it). pydantic result models w/ a `kind` discriminator → `Annotated[Union[...], Field(discriminator="kind")]` in state.
- **gotchas:** node names can't contain `:`. node callables must match a Protocol whose param is named `state` → under strict mypy, `Callable[[State], dict]` fails; declare a `Node(Protocol)` w/ `__call__(self, state: State) -> dict[str, Any]`.

## reducers (`operator.add`, `operator.or_`)

- **what:** `results: Annotated[list[X], operator.add]`, `degraded: Annotated[bool, operator.or_]`.
- **why:** parallel branches (Send) append/or instead of colliding; without a reducer two branches writing the same key raise at runtime.
- **rule:** fan-out branches return ONLY reducer-backed keys.

## conditional edges

- **what:** `add_conditional_edges(source, fn, [destinations])`; `fn(state) -> str | list[Send]`.
- **why:** routing lives in pure functions → trivially unit-tested; destinations list keeps the drawn graph honest.
- **alt:** `Command(goto=...)` returned from a node (node decides its successor). prefer edges when routing is a function of state only.

## Send (map-reduce)

- **what:** edge fn returns `[Send("node", payload), ...]`; each payload is that node's input state; all run in the same superstep; next node runs once after all finish.
- **why:** compound questions, per-document processing, per-shard work.
- **notes:** cap N (cost/latency); branches see ONLY their payload (not parent state) — pass what they need; failures in a branch should be reported via a reducer key, not raise.
- **alt:** sequential loop node (simpler, slower) or a subgraph invoked N times in one node.

## subgraphs

- **what:** compile a `StateGraph` and either `add_node("x", subgraph)` (shared/overlapping state keys) or invoke it inside a plain node (`subgraph.invoke(...)`) and return a curated subset.
- **why:** reuse the same pipeline 4 sub-questions w/ different terminal behaviour (fail → report, not clarify).
- **rec:** invoke from a node when u want control over what merges back; add as node when schemas r identical + u want it in the drawn graph.

## interrupt / Command(resume)

- **what:** `interrupt(payload)` inside a node pauses the run; `graph.invoke(...)` returns state w/ `__interrupt__`; `graph.invoke(Command(resume=value), config)` re-runs that node from the top w/ `interrupt()` returning `value`.
- **needs:** a checkpointer + `configurable.thread_id`.
- **why:** human-in-the-loop clarifications/approvals w/o losing thread state.
- **gotchas:** code b4 `interrupt()` re-executes on resume (keep it idempotent); interrupts inside parallel Send branches r messy — fail + report instead; bound the rounds (state counter) or u loop forever w/ a confused user. `graph.get_state(config).tasks[i].interrupts` tells u if a thread is waiting.

## checkpointer (MemorySaver → Postgres)

- **what:** persists state per `thread_id` after each superstep; enables interrupt/resume, multi-turn memory, time-travel (`get_state_history`).
- **scale:** MemorySaver is per-process + unbounded → Postgres/SQLite checkpointer + retention job; replicas share threads.
- **notes:** thread_id = conversation; never reuse across users.

## CachePolicy + cache

- **what:** `add_node(..., cache_policy=CachePolicy(key_func=..., ttl=...))` + `compile(cache=InMemoryCache())`.
- **why:** repeated inputs skip the node (LLM cost!). key on the semantic input (question + policy), NOT the whole state (trace/timestamps make every key unique).
- **gotcha:** caches degraded outputs too → TTL or degraded-aware key. InMemoryCache is per process → Redis-backed at scale.

## RetryPolicy / timeouts / recursion_limit

- **what:** `add_node(..., retry_policy=RetryPolicy(...), timeout=...)`; `invoke(..., config={"recursion_limit": N})`.
- **rec:** provider-level retries (SDK `max_retries` on 429/5xx) + node-level catch-and-degrade beat node RetryPolicy when u have a fallback; RetryPolicy shines 4 idempotent I/O nodes w/o fallback. recursion_limit = hard stop 4 loops (clarifier).

## streaming modes

- **what:** `graph.stream(state, config, stream_mode="updates")` yields `{node: update}` per finished node (incl. `__interrupt__`); `"values"` yields full state; `"messages"` 4 token streams.
- **why:** live trace in the UI ("router · 2.1s · intent=pnl").
- **note:** subgraph internals appear as the parent node's update unless `subgraphs=True`.

## structured output (LangChain side)

- **what:** `model.with_structured_output(schema, include_raw=True)` → `{"raw", "parsed", "parsing_error"}`.
- **why:** pydantic schema = contract; `include_raw` lets u retry w/ the validation error fed back.
- **provider notes:** ollama uses json_schema format (works, small models under-fill optional fields → few-shots + code-side gap filling); gemini/anthropic use native structured output.
- **rec:** wrap in ur own `invoke_structured(model, schema, msgs, max_retries)` that maps ALL transport errors 2 one exception type.

## fake chat model 4 tests

- **what:** subclass `BaseChatModel`; `_generate` pops scripted responses; override `with_structured_output` 2 return a `RunnableLambda` that validates dict/json/pydantic against the schema; support Exceptions (raise) and **keyed** responses (substring of last message → response) 4 parallel branches.
- **why:** 400 deterministic tests in seconds; the empty-script fake exercises ur degradation path end-to-end.

## drawing

- `graph.get_graph().draw_mermaid()` → commit 2 docs; regenerate in CI or a make target. `xray=True` 4 subgraph internals.

## observability

- LangSmith: `LANGSMITH_TRACING=true` + key, zero code. pair w/ structlog + contextvars (thread_id, request_id) so app logs + traces correlate.

## see also

- [[multi-agent-saas-recipe-langgraph]] · [[agentic-learning-curriculum]] · [[working-with-ai-on-prod-grade-projects]]
