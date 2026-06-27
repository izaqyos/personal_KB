# Relational Design, Postgres Capabilities & Postgres vs Mongo

> **Source:** Learning session w/ Claude — 2026-06-24 (general DB knowledge)
> **Author:** Yosi Izaq
> **Captured:** 2026-06-24
> **Status:** Active
> **Type:** compiled

A self-contained reference on normalization (1NF→5NF), foreign-key referential
actions, what a mature RDBMS (Postgres) actually gives you, how it compares to a
document store (Mongo), and how to reason about Postgres as the system-of-record
for a **control-plane / network-config store**.

---

## Table of Contents

1. [Normalization 1NF → 5NF](#normalization-1nf--5nf)
2. [Foreign-Key Referential Actions (ON DELETE / ON UPDATE)](#foreign-key-referential-actions)
3. [Postgres / SQL Capability Tour](#postgres--sql-capability-tour)
4. [Postgres vs MongoDB](#postgres-vs-mongodb)
5. [Choosing Postgres for a Control-Plane / Config Store](#choosing-postgres-for-a-control-plane--config-store)
6. [SQL Command Sub-Languages (DDL / DML / DCL / TCL)](#sql-command-sub-languages)
7. [TypeScript + Postgres Tooling](#typescript--postgres-tooling)
8. [SQLite — When and Where](#sqlite--when-and-where)
9. [See Also](#see-also)

---

## Normalization 1NF → 5NF

**Frame:** normalization removes redundancy that arises from *dependencies* in the
data, so you can't get **update / insert / delete anomalies**. Each form forbids a
progressively subtler kind of dependency.

The three anomalies (the "why"):
- **Update anomaly** — same fact in N rows; update some, miss one → contradiction.
- **Insert anomaly** — can't record fact A without unrelated fact B.
- **Delete anomaly** — deleting the last row of A silently destroys fact B.

| Form | Forbids | Needs |
|---|---|---|
| 1NF | repeating groups / non-atomic cells | — |
| 2NF | partial dependency on a composite key | composite key |
| 3NF | transitive dependency (non-key → non-key) | — |
| BCNF | any determinant that isn't a candidate key | overlapping keys |
| 4NF | independent multi-valued dependency (MVD) | — |
| 5NF | join dependency not implied by candidate keys | (rare) |

### 1NF — atomic values, no repeating groups
Every cell holds a single atomic value; no arrays-in-a-cell (`"gw1,gw2,gw3"`), no
repeating columns (`gateway1, gateway2, …`). A row must be uniquely identifiable.
Fix a multi-valued cell by moving to one row per value (or a child table).

> Slip-catch: 1NF is **not** "has a primary key" — it's atomicity + no repeating groups.

### 2NF — no partial dependency
**Only relevant with a composite key.** Every non-key attribute must depend on the
*whole* key, not part of it.

```
OrderItems(order_id, product_id, qty, product_name, product_price)
  PK = (order_id, product_id)
```
`product_name/price` depend on `product_id` alone (half the key) → violation. Fix:
```
OrderItems(order_id, product_id, qty)
Products(product_id, product_name, product_price)
```

### 3NF — no transitive dependency
Non-key attributes depend on the key *and nothing but the key* — not on another
non-key attribute.
```
Subscriptions(tenant_id, plan_id, plan_name, plan_price)   -- tenant_id → plan_id → plan_price
```
`plan_price` depends on `plan_id` (a non-key) → transitive. Fix: split `Plans` out.

**Mnemonic (1–3NF):** every non-key attribute depends on *"the key, the whole key,
and nothing but the key."*

### BCNF — the "3.5" before 4NF
For **every** functional dependency `X → Y`, `X` must be a **candidate key**. Bites
when candidate keys overlap.
```
Teaches(student, course, instructor)
  candidate keys: (student,course), (student,instructor)
  FD: instructor → course        -- instructor is NOT a candidate key
```
This is 3NF but **not** BCNF (insert anomaly: can't record "instructor→course"
until a student enrolls). Fix: `Instructs(instructor, course)` + `Enrolls(student, instructor)`.

> Slip-catch: 3NF and BCNF differ **only** with overlapping composite candidate
> keys and a prime attribute on the RHS of an FD. Most 3NF schemas are already BCNF.

### 4NF — no independent multi-valued dependency (MVD)
No table should hold *two independent one-to-many facts* about the same key — it
forces a cartesian product.
```
EmpFacts(employee, skill, language)    -- skills & languages independent
```
3 skills × 2 languages = 6 rows. Fix: `EmpSkills(employee, skill)` +
`EmpLanguages(employee, language)`. (If the two were *related*, it'd be a real
ternary fact — keep them.)

### 5NF (PJ/NF) — no non-implied join dependency
The table can't be losslessly decomposed further unless implied by candidate keys.
Canonical `Supplies(supplier, part, project)` with a cyclic business rule
("if S supplies P, P used in J, S supplies J → S supplies P for J") → split into
three binary tables. **Mostly theoretical/interview**; in practice stop at BCNF and
reach for 4NF when you spot an independent-multivalue blowup.

---

## Foreign-Key Referential Actions

`ON DELETE` / `ON UPDATE` define what happens to **child** rows when the **parent**
(referenced) row is deleted or its key changes.

```sql
CREATE TABLE Subscriptions (
  tenant_id int PRIMARY KEY,
  plan_id   int REFERENCES Plans(plan_id) ON DELETE RESTRICT
);
```

| Action | On parent delete, the child… | Use when |
|---|---|---|
| `NO ACTION` (default) | blocks — error if children exist; checked **end of statement** (deferrable) | default, safe |
| `RESTRICT` | blocks — same error, checked **immediately**, not deferrable | want immediate fail |
| `CASCADE` | deleted too, automatically (chains!) | true ownership |
| `SET NULL` | row kept, FK set `NULL` (column must be nullable) | optional relationship |
| `SET DEFAULT` | row kept, FK set to column default (must exist in parent) | rare; has a fallback |

**RESTRICT vs NO ACTION** — both block; the *only* difference is timing. `RESTRICT`
checks immediately; `NO ACTION` at end-of-statement and can be `DEFERRABLE INITIALLY
DEFERRED` (lets you do a parent-swap within one txn). Default to `NO ACTION`.

**CASCADE is a footgun** — cascades **chain** (plan → subs → invoices), so one
`DELETE` can erase a subtree. Use it only for genuine ownership (order-line→order),
not for reference/lookup relationships. Default to blocking; opt into cascade.

**Two things people miss:**
1. `ON UPDATE` mirrors the same five actions for key-value changes — mostly moot if
   you use immutable surrogate PKs (you should).
2. **Index your FK columns.** Postgres auto-indexes the parent PK but **not** the
   child FK column → parent deletes do a full child-table scan without
   `CREATE INDEX ON Subscriptions(plan_id);`.

---

## Postgres / SQL Capability Tour

**Integrity (the point of relational):**
- Constraints: `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`,
  **`EXCLUSION`** (e.g. "no overlapping bookings" via ranges + GiST).
- **ACID transactions** incl. **transactional DDL** (`BEGIN; ALTER…; ROLLBACK;`
  rolls back schema changes — most DBs can't).
- Isolation: Read Committed (default), Repeatable Read, **Serializable (SSI)** —
  true serializable without coarse locking.
- **MVCC** — readers don't block writers, writers don't block readers.

**Query power:** joins, correlated subqueries, set ops, **CTEs incl.
`WITH RECURSIVE`** (tree/graph traversal), **window functions**,
`GROUPING SETS`/`ROLLUP`/`CUBE`, aggregates with `FILTER`.

**Indexes (beyond B-tree):** Hash, **GiN** (jsonb/FTS/arrays), **GiST** (ranges,
geo, fuzzy), **BRIN** (huge append-only, tiny index), **partial**, **expression**,
**covering** (`INCLUDE`).

**Types & extensibility (where PG pulls ahead):**
- `jsonb` (indexable documents), arrays, ranges, `uuid`, `enum`, composite types,
  **domains** (type + CHECK), **generated columns**.
- Extensions: **PostGIS** (geo), `pg_trgm` (fuzzy text), built-in full-text search,
  **`pgvector`** (embeddings / similarity search — RAG inside Postgres).
- PL/pgSQL + PL/Python procedures, custom types/operators.
- Views, **materialized views**, triggers, **partitioning**, logical & physical
  **replication**, **foreign data wrappers**, cost-based planner (`EXPLAIN ANALYZE`).

Mental model: **a relational core + a type/extension system rich enough to absorb
document, geo, search, and vector workloads.**

---

## Postgres vs MongoDB

| Dimension | Postgres | MongoDB |
|---|---|---|
| Data model | Relational; normalize + join | Document (BSON); embed or reference |
| Schema | Enforced (+ `jsonb` flex) | Schema-on-read (+ optional JSON-schema validation) |
| Philosophy | **Normalize** — one fact, one place | **Denormalize/embed** — shape to the read |
| Joins | Native, planner-optimized | `$lookup` (weaker; designed to avoid) |
| Transactions | ACID, multi-statement, first-class | Single-doc atomic always; multi-doc ACID since 4.0 but against the grain |
| Consistency | Strong | Tunable (read/write concerns); strong on primary by default |
| Scaling | Vertical + read replicas + partitioning; **Citus** sharding | **Native horizontal sharding** (headline strength) |
| Query | SQL (declarative, mature) | Aggregation pipeline |
| Documents | `jsonb` + GIN + jsonpath | Native — the whole model |

**Tie-back to normalization:** Mongo doesn't make normalization obsolete — it makes
it a *deliberate trade*. Embedding (e.g. plan name+price inside each subscription
doc) is a **conscious 3NF violation** for read speed; the price is the **update
anomaly**, now managed in *application code* because the DB won't enforce it. The
normalization forms remain your map of *what redundancy you're signing up for*.

**When to pick which:**
- **Postgres** — relational integrity, complex/ad-hoc queries, real transactions,
  mixed workloads. Can still do JSON/search/geo/vectors. Sensible default.
- **Mongo** — fluid/evolving schema, document-shaped aggregates read as a unit,
  very high write throughput, sharding as a first-class, low-ops feature.

Rule of thumb: *normalize in Postgres by default; denormalize only when a measured
read path demands it, and own the anomaly consciously.*

---

## Choosing Postgres for a Control-Plane / Config Store

A control plane whose first-class entities are **networks, site-to-site tunnels,
gateways, routes, regions** is a *relational integrity* problem, not a
*high-volume-document* problem. Why an RDBMS fits:

- **Entities are densely interrelated** (network ↔ tunnel ↔ gateway ↔ route ↔
  region) — FKs + joins model and *enforce* those edges; a document store pushes
  that integrity into app code.
- **Config correctness is the product** — `CHECK`, `UNIQUE`, `EXCLUSION` (no
  overlapping CIDRs / tunnel endpoints) and FK actions keep invalid topology out of
  the DB. Referential actions prevent dangling tunnels when a gateway is removed.
- **Multi-entity changes are transactional** — "create network + 2 tunnels + routes"
  must be all-or-nothing; ACID gives it natively.
- **Reads are relational/graph-shaped** — "all tunnels for region X with gateway
  health" = joins + `WITH RECURSIVE` for topology, not N document fetches.
- **Hybrid where useful** — `jsonb` columns hold provider-specific / fluid config on
  an otherwise-strict row (schema where it matters, flexibility where it doesn't).
- **Scale path exists** — control-plane data is modest vs data-plane traffic; read
  replicas + partitioning, and Citus if sharding is ever needed.
- **Operational maturity** — backups, PITR, logical replication, mature tooling.

Net: model the core entities **normalized (≥3NF/BCNF)**, enforce edges with FKs +
referential actions, use `jsonb` for the genuinely-variable bits, and denormalize
only a measured hot read path (e.g. a materialized view) — consciously.

---

## SQL Command Sub-Languages

| Acronym | Name | Purpose | Commands |
|---|---|---|---|
| **DDL** | Data Definition | structure / schema | `CREATE`, `ALTER`, `DROP`, `TRUNCATE`, `RENAME` |
| **DML** | Data Manipulation | the data in tables | `INSERT`, `UPDATE`, `DELETE`, `MERGE` |
| **DQL** | Data Query | reads | `SELECT` |
| **DCL** | Data Control | permissions | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control | txn boundaries | `BEGIN`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

DQL is often folded into DML. (There's no "EDL".) **DDL = the shape, DML = the contents.**

**Gotchas:**
- **`DELETE` (DML) vs `TRUNCATE` (DDL):** DELETE removes rows one-by-one, logged, fires triggers, `WHERE`-able, rollback-able; TRUNCATE resets storage for *all* rows — faster, resets identity sequences, is DDL (can't filter; txn behavior varies by engine).
- **`DROP`** removes the object itself, not just its rows.

**Postgres superpower — transactional DDL:** PG wraps DDL in a transaction and rolls it back cleanly:
```sql
BEGIN;
  ALTER TABLE tunnels ADD COLUMN mtu int;
  CREATE INDEX ON tunnels(gateway_id);
ROLLBACK;   -- schema change undone
```
MySQL/Oracle do an implicit COMMIT on DDL → no mid-migration rollback. This is exactly why PG migration tools (Atlas, drizzle-kit, node-pg-migrate) can run a multi-statement migration atomically and abort cleanly. (See also [Capability Tour](#postgres--sql-capability-tour).)

---

## TypeScript + Postgres Tooling

Three layers: **driver** → **query/modeling** → **migrations**. Pick by how much you value SQL control vs DX/velocity.

### Query / modeling
| Tool | Type | Strengths | Watch-outs |
|---|---|---|---|
| **Drizzle** | TS-first ORM-lite | schema in TS, SQL-like, great types, tiny runtime, relational queries | younger ecosystem; very advanced DDL still needs raw SQL |
| **Kysely** | type-safe query builder (no ORM) | closest to raw SQL w/ full types; great for complex/topology reads | no modeling/migration layer — BYO |
| **Prisma** | full ORM + schema DSL | best DX/onboarding, strong migrate tooling, TypedSQL escape hatch | own DSL (not TS); weak on advanced PG (exclusion/cidr/partial idx → raw SQL); runtime overhead |
| **MikroORM** | Data-Mapper ORM | unit-of-work, identity map, solid PG | heavier, steeper |
| **TypeORM** | decorator ORM | mature/familiar | aging — not for greenfield |
| **postgres.js / node-postgres** | drivers | foundation; postgres.js fast + modern | raw |

### Migrations (decoupled — mix & match)
| Tool | Model | Best for |
|---|---|---|
| **drizzle-kit** | generates SQL from TS schema, hand-editable | default w/ Drizzle |
| **Atlas** | **declarative** — desired-state diff/plan | advanced constraints (exclusion, partial idx, custom types) |
| **node-pg-migrate** | imperative JS/SQL up/down | full manual control, any query layer |
| **Prisma Migrate** | tied to Prisma schema | default w/ Prisma |
| Flyway / Liquibase | JVM, language-agnostic | enterprise/polyglot — heavier |

**The control-plane gotcha:** the PG features you most want for a network/config store — `EXCLUSION` (no overlapping CIDRs), `CHECK`, partial/expression indexes, `inet`/range types, jsonb indexes — are exactly what ORM schema-DSLs often *can't* express. **Whatever you pick, keep a clean raw-SQL escape hatch for DDL.** Prisma costs the most friction here; Drizzle/Kysely/Atlas the least.

**Recommended (correctness-first, e.g. a control plane):** **Drizzle** (modeling/reads/mutations) + **Atlas** (declarative migrations incl. advanced constraints) + **zod** (boundary validation; `drizzle-zod` derives it) + **postgres.js** driver.
- *Velocity/onboarding priority* → **Prisma** (TypedSQL for the raw bits). Narrows a document-DB's "faster to move" edge while keeping PG integrity.
- *Max SQL control for topology reads* → **Kysely** + node-pg-migrate/Atlas + zod.

**Concern → tool:** modeling = Drizzle schema · migrations = Atlas/drizzle-kit (keep advanced DDL in reviewed SQL) · reads = Drizzle relational; drop to `sql`/Kysely for recursive-CTE topology · mutations/txns = Drizzle/Prisma interactive transactions for atomic multi-entity writes.

---

## SQLite — When and Where

**Not a source-of-truth control-plane DB.** It lacks exactly what PG wins on: no `EXCLUSION` constraints, no `inet`/`cidr`/range types, no GiST/GIN, weaker DDL/`ALTER`, dynamic typing (even `STRICT` is thinner), and it's a single-writer in-process **library** (no client-server) — multiple services can't share it as an SoT. Choosing it for a control plane re-introduces the "integrity enforced in app code" problem.

**Where it's genuinely good (relevant to a network product):**
- **Edge / per-node local config replica** — each gateway/data-plane node holds a local read-only replica of the config it needs: microsecond reads, zero-ops, no round-trip to the global control plane. PG stays the writer/SoT; SQLite is the *distribution endpoint*. Clean architecture, not a compromise.
- **Tests / CI** — fast, ephemeral (but test PG-specific logic against *real* PG — dialect drift).
- **Local tooling / CLIs / fixtures.**

**Distributed-SQLite ecosystem (2026):** Turso/libSQL, Cloudflare D1, LiteFS, rqlite — embedded replicas distributed globally with one primary. Excellent for read-heavy global *read-locality*; but writes still funnel to a primary and the constraint/type model is still SQLite's → wrong trade for a correctness-first SoT, right trade for the edge-replica role.

**TS tooling:** `better-sqlite3` (sync, fast), Node built-in `node:sqlite`, `@libsql/client` (Turso). **Bonus:** Drizzle and Kysely both support the SQLite dialect — so a PG-server + SQLite/libSQL-edge split can share one modeling/query toolchain. Another point for Drizzle/Kysely over Prisma.

**Bottom line:** SQLite is a **complement** to PG (PG = global writer/SoT, SQLite/libSQL = per-edge read replica), not a competitor for the main DB.

---

## See Also

- [interviews/database-patterns.md](../interviews/database-patterns.md) — ACID,
  isolation-level anomaly table, indexing, sharding/partitioning, Prisma txns
  (interview-prep angle; complements this design-focused doc).
- Legacy quick-refs: [kb-sql](../kb-sql) (MySQL CLI cheatsheet), [kb-db](../kb-db) (older DB notes dump).
