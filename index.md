---
okf_version: "0.1"
---
# (root)

* [Cross-Site Scripting (XSS) — Attacks & Defenses](/xss-cross-site-scripting.md) - XSS lets an attacker run their JavaScript in your user's browser, in your origin's security context — bypassing the same-origin policy. With that foothold they can steal session cookies/tokens, key-log credentials, perform any action the user can, exfiltrate page data, and deface or trojan the app.
* [Insecure Deserialization — When Data Parsing Becomes Code Execution](/insecure-deserialization.md) - Deserialization turns bytes back into objects. If attacker-controlled bytes reach a *native/object* deserializer (or a polymorphic type binder), the runtime can execute code during parsing — through constructors, magic hooks, and gadget chains of existing library classes — *before any of your validation runs*. Outcome: remote code execution (RCE), often unauthenticated and with full process privileges.
* [Neovim Knowledge Base](/neovim.md)
