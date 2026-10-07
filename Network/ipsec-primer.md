---
type: primer
name: ipsec-primer
description: IPsec primer — IKE/ESP/SA building blocks, IKEv2 exchanges, tunnel vs transport, policy- vs route-based VPN, crypto proposals + PFS, rekey/DPD/NAT-T, auth (PSK/certs/EAP), PQC (ML-KEM via RFC 9370), BGP over IPsec, HA, MTU/MSS, troubleshooting checklist.
metadata:
  type: compiled
---
# IPsec Primer

> **Source:** Compiled from general networking knowledge (RFC 4301 / 7296 / 4303 / 3948 / 9370) — 2026-10-07
> **Author:** Yosi Izaq
> **Captured:** 2026-10-07
> **Status:** Active
> **Type:** compiled

## Table of Contents

- [TL;DR](#tldr)
- [Building blocks](#building-blocks)
- [IKEv2 — how a tunnel comes up](#ikev2--how-a-tunnel-comes-up)
- [IKEv1 terms you'll still hear](#ikev1-terms-youll-still-hear)
- [Tunnel vs transport mode](#tunnel-vs-transport-mode)
- [Policy-based vs route-based VPN](#policy-based-vs-route-based-vpn)
- [Crypto proposals](#crypto-proposals)
- [Lifetimes, rekey, DPD](#lifetimes-rekey-dpd)
- [NAT traversal](#nat-traversal)
- [Authentication](#authentication)
- [Post-quantum IPsec](#post-quantum-ipsec)
- [Dynamic routing — BGP over IPsec](#dynamic-routing--bgp-over-ipsec)
- [High availability](#high-availability)
- [MTU and MSS](#mtu-and-mss)
- [Initiator vs responder](#initiator-vs-responder)
- [Troubleshooting checklist](#troubleshooting-checklist)
- [Glossary](#glossary)
- [See Also](#see-also)

## TL;DR

IPsec secures IP packets at **layer 3**, so everything above it is protected without the app knowing.

- **IKE** (UDP 500 / 4500) is the control plane: it authenticates the peers and negotiates keys.
- **ESP** (IP protocol 50) is the data plane: it encrypts and authenticates each packet.
- The negotiated agreement is a **Security Association (SA)** — one-directional, identified by an **SPI**.
- Site-to-site VPNs use **tunnel mode** + **IKEv2**, usually **route-based** (a virtual tunnel interface) with **BGP** on top.
- Most "tunnel won't come up" problems are a **mismatch**: proposals, IDs, PSK, traffic selectors, or NAT/firewall on UDP 500/4500.

## Building blocks

| Piece | What it does |
|---|---|
| **IKE** (Internet Key Exchange) | Authenticates peers, runs Diffie-Hellman, derives keys, manages SAs. IKEv2 = RFC 7296 |
| **ESP** (Encapsulating Security Payload) | Encrypts + integrity-protects the payload. RFC 4303. Used by virtually all modern VPNs |
| **AH** (Authentication Header) | Integrity only, no encryption; breaks with NAT. Rarely used |
| **SA** (Security Association) | One direction of one negotiated agreement: keys, algorithms, lifetime. A tunnel = 1 IKE SA + ≥1 pair of Child (ESP) SAs |
| **SPI** (Security Parameter Index) | 32-bit ID in every ESP packet that tells the receiver which SA to use |
| **SPD** (Security Policy Database) | Which traffic must be protected / bypassed / dropped |
| **SAD** (Security Association Database) | Active SAs and their keys |
| **Traffic selectors** | The src/dst subnets (and ports/protocols) a Child SA covers |

## IKEv2 — how a tunnel comes up

```
Initiator                                   Responder
   | IKE_SA_INIT: proposals, DH public, nonce  |
   |------------------------------------------>|
   |<------------------------------------------|  proposals chosen, DH public, nonce
   |   (both now derive SKEYSEED → IKE SA keys; the rest is encrypted)
   | IKE_AUTH: ID, AUTH (PSK/cert), TSi/TSr, SA |
   |------------------------------------------>|
   |<------------------------------------------|  ID, AUTH, TS, SA → first Child SA up
   | CREATE_CHILD_SA (later): extra/rekeyed SAs |
   | INFORMATIONAL: delete, DPD, notify         |
```

- 2 round trips (4 messages) to a working tunnel.
- The first Child SA is negotiated inside IKE_AUTH; more Child SAs or rekeys use CREATE_CHILD_SA.

## IKEv1 terms you'll still hear

- **Phase 1** = the IKE SA (main mode, 6 messages; or aggressive mode, 3 messages — avoid, it leaks a PSK-crackable hash).
- **Phase 2 / Quick Mode** = the IPsec (Child) SAs.
- Vendor UIs still say "Phase 1 / Phase 2" for IKEv2 proposals: Phase 1 = IKE SA proposal, Phase 2 = Child SA proposal.
- Prefer **IKEv2**: fewer messages, built-in NAT-T, DPD, EAP, MOBIKE, more robust.

## Tunnel vs transport mode

| | Tunnel mode | Transport mode |
|---|---|---|
| What's protected | The whole original IP packet, wrapped in a new outer IP header | Only the payload; original IP header kept |
| Use | Site-to-site, gateway-to-gateway | Host-to-host, often with GRE/L2TP on top |

## Policy-based vs route-based VPN

- **Policy-based:** the SPD/traffic selectors decide what goes into the tunnel (subnet A ↔ subnet B). One Child SA per subnet pair. Hard to scale, no dynamic routing.
- **Route-based:** a virtual tunnel interface (VTI / XFRM interface) with wide-open selectors (0.0.0.0/0 ↔ 0.0.0.0/0). The routing table decides what goes in. Enables **BGP**, ECMP, and failover. Standard for cloud and SASE.

## Crypto proposals

A proposal = encryption + integrity (or AEAD) + PRF + DH group. Both sides must share at least one.

| Role | Recommended | Avoid (legacy / weak) |
|---|---|---|
| Encryption | **AES-256-GCM** (AEAD, no separate integrity) · AES-256-CBC + HMAC | 3DES, DES |
| Integrity / PRF | **SHA-256 / SHA-384 / SHA-512** | MD5, SHA-1 |
| DH group | 19/20 (ECP-256/384), 21 (ECP-521), 31 (Curve25519), 14+ (MODP-2048+) | 1, 2, 5 |

- **PFS (Perfect Forward Secrecy):** a fresh DH on each Child SA rekey, so leaking one key doesn't expose past/future traffic. Turn it on.

## Lifetimes, rekey, DPD

- **IKE SA lifetime** (e.g. 8–24h) and **Child SA lifetime** (e.g. 1h, or by bytes). Rekey happens before expiry, so traffic shouldn't drop.
- Lifetimes don't have to match exactly in IKEv2 (each side rekeys on its own timer), but mismatched expectations show up as flaps on some vendors.
- **DPD (Dead Peer Detection):** liveness probes over IKE. Interval + timeout → declare the peer dead, tear down, and either re-initiate or fail over.

## NAT traversal

- ESP has no ports, so NAT breaks it. **NAT-T** (RFC 3948) detects NAT during IKE_SA_INIT and moves IKE + ESP into **UDP 4500**.
- Keepalives (~20s) keep the NAT binding open.
- Firewall must allow **UDP 500, UDP 4500**, and **IP protocol 50** (when no NAT).

## Authentication

| Method | How | Trade-off |
|---|---|---|
| **PSK** | Same shared secret on both sides proves identity in IKE_AUTH | Simple, no PKI; weak if short; hard to rotate; doesn't scale. Use long random PSKs (≥20 chars) |
| **Certificates (x509)** | Each peer signs with its private key; peer verifies against a CA | Stronger, scales, needs a PKI (issue / renew / revoke) |
| **EAP** | Gateway cert + client EAP (username/password, EAP-TLS) | Remote-access clients, not site-to-site |

- **IDs matter:** the IKE identity (IP, FQDN, email, DN) must match what the peer expects. "Peer ID mismatch" is a classic failure.

## Post-quantum IPsec

- Threat: "harvest now, decrypt later" against classic DH.
- **RFC 9370 (Multiple Key Exchanges in IKEv2):** up to 7 additional key exchanges on top of the classic DH, negotiated via `IKE_INTERMEDIATE`.
- Typical hybrid: ECDH (e.g. group 19/31) **+ ML-KEM-768** (FIPS 203, a.k.a. Kyber). Key strength comes from both, so it stays safe if either holds.
- ML-KEM sizes: **512** (~AES-128 level) · **768** (~AES-192, common default) · **1024** (~AES-256).
- Both peers must support it. Older devices simply fail to negotiate the extra exchange.

## Dynamic routing — BGP over IPsec

- Run **eBGP** over the tunnel interface. Each side gets a **link-local inside IP** (commonly from `169.254.0.0/16`, a /30 per tunnel) and an **ASN** (private ranges: 64512–65534, or 4200000000–4294967294 for 32-bit).
- Each side advertises its prefixes; learned routes are installed via the tunnel.
- Pros: automatic failover, no static route upkeep, multi-tunnel ECMP. Watch BGP timers vs DPD timers, and filter what you accept.

## High availability

- **Active-standby:** 2 tunnels, one preferred (BGP local-pref / AS-path prepend, or DPD failover).
- **Active-active:** both tunnels carry traffic (ECMP over BGP). Typical for cloud gateways: one VPN endpoint → 2 public IPs → 2 tunnels.
- Redundancy can be per-AZ, per-region, or per-device. Each tunnel is its own IKE SA.

## MTU and MSS

- ESP + new IP header (+ UDP for NAT-T) adds ~50–80 bytes. A 1500 path MTU leaves ~1400–1440 for the inner packet.
- Symptoms of getting it wrong: ping works, small requests work, big transfers/TLS handshakes hang.
- Fix: set the tunnel MTU (often 1360–1400) and **clamp TCP MSS** (~1350–1360). Don't rely on PMTUD through firewalls.

## Initiator vs responder

- The **initiator** sends IKE_SA_INIT; the **responder** waits.
- A responder-only gateway needs the customer side to initiate (and to keep the tunnel up with DPD/keepalives). The customer's peer IP must be reachable / static unless it's a dynamic-peer setup.

## Troubleshooting checklist

1. **Reachability:** UDP 500/4500 open both ways? NAT in the path? Right peer IP?
2. **IKE_SA_INIT fails** → proposal mismatch (enc/integrity/DH/PQC) or nothing listening.
3. **IKE_AUTH fails** → PSK mismatch, ID mismatch, cert/CA problem.
4. **IKE up, Child SA fails** → traffic-selector mismatch (policy-based), Child proposal / PFS group mismatch.
5. **Tunnel up, no traffic** → routing (missing route / BGP not established / prefixes filtered), firewall policy, asymmetric routing.
6. **Flapping** → DPD too aggressive, lifetime/rekey collisions, duplicate SAs from both sides initiating.
7. **Slow / large transfers hang** → MTU / MSS.
8. Logs to read: IKE negotiation logs (e.g. strongSwan `charon`), SA list (`swanctl --list-sas`), counters per SPI.

## Glossary

| Term | Meaning |
|---|---|
| Child SA | ESP SA pair carrying data (IKEv2 term) |
| DH / KE | Diffie-Hellman key exchange |
| DPD | Dead Peer Detection |
| ESP | Encapsulating Security Payload |
| IKE | Internet Key Exchange |
| ML-KEM | NIST post-quantum key encapsulation (FIPS 203) |
| NAT-T | NAT traversal (ESP in UDP 4500) |
| PFS | Perfect Forward Secrecy |
| PSK | Pre-shared key |
| SA / SPI | Security Association / its index |
| TS | Traffic selector |
| VTI | Virtual Tunnel Interface (route-based VPN) |

## See Also

- [ipsec-primer-slides.html](ipsec-primer-slides.html) — slide version (React, keyboard nav, self-check quiz)
- [vpn-auth-psk-vs-x509-vs-wireguard.md](vpn-auth-psk-vs-x509-vs-wireguard.md) — auth methods compared (IPsec / OpenVPN / WireGuard)
