# Dynamic DNS (DDNS)

> **Source:** Web research — dnspython docs, RFC 2136, provider API docs (2026-06-07)
> **Author:** Yosi Izaq
> **Captured:** 2026-06-07
> **Status:** Active
> **Type:** compiled

Programmer-oriented notes on Dynamic DNS: what it is, the RFC 2136 protocol, and Python client examples for both the standard protocol (`dnspython` + TSIG) and consumer/cloud provider HTTP APIs (`requests`).

## Table of Contents

- [What DDNS Is](#what-ddns-is)
- [Two Worlds](#two-worlds)
- [RFC 2136 Message Anatomy](#rfc-2136-message-anatomy)
- [Python — RFC 2136 + TSIG (dnspython)](#python--rfc-2136--tsig-dnspython)
- [Python — Provider HTTP API (requests)](#python--provider-http-api-requests)
- [The Update-on-Change Client Loop](#the-update-on-change-client-loop)
- [TTL, Security, and Gotchas](#ttl-security-and-gotchas)
- [See Also](#see-also)
- [Sources](#sources)

## What DDNS Is

Dynamic DNS automatically updates a DNS record (typically an `A`/`AAAA`) when the
host behind a name changes IP. Classic cases:

- A home server / lab box on a dynamic-IP ISP connection.
- An ephemeral cloud instance whose public IP isn't reserved.
- Any agent that must stay reachable by name without a static IP.

The endpoint runs a small client that detects its current IP and pushes the new
value into DNS, so `host.example.com` keeps resolving to the right address.

## Two Worlds

| | RFC 2136 dynamic update | Provider HTTP API |
|---|---|---|
| What | Standard DNS `UPDATE` protocol message | Vendor REST/GET endpoint |
| Talks to | Your authoritative server (BIND, PowerDNS, Windows DNS) | No-IP, DynDNS, Duck DNS, Cloudflare, Dynu |
| Auth | TSIG shared-secret key (HMAC-SHA256) | Token / bearer / basic auth over HTTPS |
| CLI | `nsupdate` | `curl` |
| Python | `dnspython` (`dns.update`, `dns.query`, `dns.tsigkeyring`) | `requests` / `httpx` |
| Use when | You run your own zone | You use a managed DDNS service |

## RFC 2136 Message Anatomy

A DNS `UPDATE` (RFC 2136) carries four sections — same wire format as a normal
DNS message (RFC 1035), reinterpreted:

1. **Zone** — the single zone being updated (one per message).
2. **Prerequisite** — optional preconditions (e.g. "RRset exists", "name is in
   use / not in use"). The server rejects the whole update if a prerequisite
   fails — this gives you conditional / atomic updates.
3. **Update** — the actual edits: add, delete, or replace RRs.
4. **Additional** — extra data (e.g. the TSIG signature lands here).

Transport: UDP if it fits, otherwise TCP. Authenticated updates use **TSIG**
(RFC 8945, formerly RFC 2845) — an HMAC over the message keyed by a shared
secret. HMAC-SHA256 is the current default; HMAC-MD5 is legacy.

## Python — RFC 2136 + TSIG (dnspython)

`pip install dnspython`

```python
import os
import sys
import dns.tsigkeyring
import dns.update
import dns.query

# Key material from the env / secret store — never hardcode (org policy).
# TSIG_KEY_NAME e.g. "host-example."   TSIG_SECRET = base64 secret from the key file.
keyring = dns.tsigkeyring.from_text({
    os.environ["TSIG_KEY_NAME"]: os.environ["TSIG_SECRET"],
})

ZONE = "dyn.test.example"
NAME = "host"          # -> host.dyn.test.example
TTL = 60               # low TTL so changes propagate fast
SERVER = os.environ["DNS_SERVER"]  # authoritative server IP

new_ip = sys.argv[1]

# algorithm must match the key the server expects
update = dns.update.UpdateMessage(
    ZONE,
    keyring=keyring,
    keyalgorithm=dns.tsig.HMAC_SHA256,
)

# Optional prerequisite: only proceed if the name already exists.
# update.present(NAME)

# replace() = delete any existing A then add the new one (idempotent set).
update.replace(NAME, TTL, "A", new_ip)

response = dns.query.tcp(update, SERVER, timeout=10)
print(dns.rcode.to_text(response.rcode()))  # "NOERROR" on success
```

Other edit verbs on `UpdateMessage`:

- `update.add(NAME, TTL, "A", ip)` — append an RR (multiple A records possible).
- `update.delete(NAME, "A")` — delete all A records for the name.
- `update.delete(NAME, "A", ip)` — delete one specific RR.
- `update.replace(NAME, TTL, "A", ip)` — atomic "set to exactly this".

Prerequisite helpers: `update.present(name[, rdtype])`, `update.absent(name[, rdtype])`.

## Python — Provider HTTP API (requests)

`pip install requests`

**Duck DNS** — dead-simple GET; empty `ip` lets the server auto-detect from the
request source address:

```python
import os
import requests

resp = requests.get(
    "https://www.duckdns.org/update",
    params={
        "domains": "myhost",                  # the subdomain you registered
        "token": os.environ["DUCKDNS_TOKEN"],
        "ip": "",                             # blank = server uses caller's IP
    },
    timeout=10,
)
resp.raise_for_status()
print(resp.text)  # "OK" or "KO"
```

**Cloudflare** — token-auth REST; you PATCH a known record by id:

```python
import os
import requests

zone_id = os.environ["CF_ZONE_ID"]
record_id = os.environ["CF_RECORD_ID"]
token = os.environ["CF_API_TOKEN"]

resp = requests.patch(
    f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records/{record_id}",
    headers={"Authorization": f"Bearer {token}"},
    json={"content": os.environ["NEW_IP"]},   # new A-record value
    timeout=10,
)
resp.raise_for_status()
print(resp.json()["success"])
```

## The Update-on-Change Client Loop

The canonical DDNS client only writes when the IP actually changed — avoids
needless updates and rate-limit hits:

```python
import requests

def current_public_ip() -> str:
    # Any trusted "what's my IP" endpoint that returns the raw address.
    return requests.get("https://api.ipify.org", timeout=10).text.strip()

def run_once(last_ip: str | None) -> str:
    ip = current_public_ip()
    if ip != last_ip:
        push_update(ip)   # one of the two methods above
        print(f"updated -> {ip}")
    return ip
```

Run it from `cron` (e.g. every 5 min) or a `systemd` timer, persisting `last_ip`
to a small state file between runs. Behind NAT, prefer the provider-side
auto-detect (Duck DNS blank `ip`) over reading a local interface address.

## TTL, Security, and Gotchas

- **Keep TTL low** (60–300s) on DDNS records so resolvers pick up changes fast;
  raise it only for records that rarely move.
- **Never hardcode** TSIG secrets or API tokens — read from env / secret manager.
  TSIG keys and provider tokens are credentials.
- **Always HTTPS** for provider APIs; **TSIG** (not unauthenticated UPDATE) for
  RFC 2136 — an open dynamic zone is a hijack vector.
- **Match the TSIG algorithm** the server expects, or you get `BADKEY`/`BADSIG`.
- **Update only on change** to respect provider rate limits (many ban abusive
  clients) and to keep DNS change logs meaningful.
- **IPv6:** same flow with `AAAA` records; a dual-stack host updates both.
- **Propagation ≠ instant:** even with low TTL, caches already holding the old
  value wait out their remaining TTL.

## See Also

- [network/](.) — broader networking KB (NetworkKB, SSL, Ports, RFC1180).
- [python/](../python/) — Python references.

## Sources

- [RFC 2136 — Dynamic Updates in the DNS](https://www.rfc-editor.org/rfc/rfc2136)
- [dnspython examples](https://www.dnspython.org/examples/)
- [dnspython documentation](https://dnspython.readthedocs.io/en/latest/)
- [PowerDNS — Dynamic DNS Update (RFC 2136)](https://doc.powerdns.com/authoritative/dnsupdate.html)
- [pfSense — RFC 2136 Dynamic DNS](https://docs.netgate.com/pfsense/en/latest/services/dyndns/rfc2136.html)
