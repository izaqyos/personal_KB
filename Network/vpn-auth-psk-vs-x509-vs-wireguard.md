---
name: vpn-auth-psk-vs-x509-vs-wireguard
description: VPN authentication methods compared — IPsec (PSK / IKE phases / x509 certs + EAP), OpenVPN (static PSK vs TLS mode), WireGuard (static keypairs + optional PQ preshared key). Why PSK trades security for convenience, when x509/PKI is worth it.
metadata:
  type: compiled
---
# VPN Authentication: PSK vs x509 vs WireGuard Keypairs

> **Source:** Distilled from technical Q&A session (general networking) — 2026-06-15
> **Author:** Yosi Izaq
> **Captured:** 2026-06-15
> **Status:** Active
> **Type:** compiled

## TL;DR

Three ways VPN peers prove who they are:

- **PSK (pre-shared key)** — one shared secret both sides know. Simple, no PKI, but weak and doesn't scale.
- **x509 certificates** — per-peer keypair signed by a CA. Stronger, scalable, but needs a PKI.
- **WireGuard static keypairs** — SSH-style public keys; the pubkey *is* the identity. No PSK, no certs, no CA.

Maturity path: **PSK for a quick/small tunnel → x509 (+ EAP for clients) for production / many peers → WireGuard when you want no-cert simplicity with modern crypto** (but you build your own key distribution).

---

## IPsec

Suite of protocols that encrypt/authenticate IP traffic at **layer 3** — everything above it is secured transparently.

**Key pieces:**
- **IKE** (Internet Key Exchange) — negotiates the Security Association (SA); does auth + key agreement. IKEv1 (older: main/aggressive mode) vs IKEv2 (cleaner, faster reconnect via MOBIKE).
- **Two phases** — phase 1 sets up a secure channel between peers (auth happens here); phase 2 negotiates the actual data SAs.
- **ESP** — encrypts + authenticates payload (most common). **AH** — auth only, no encryption, breaks NAT, rarely used.
- **Modes** — tunnel (whole packet wrapped; site-to-site / gateways) vs transport (payload only; host-to-host).

### IPsec — PSK auth

Shared secret authenticates IKE phase 1 instead of certs.
- Simple, no PKI.
- Weaker: same secret both sides, hard to rotate, vulnerable to **offline dictionary attacks** (especially IKEv1 aggressive mode, which exposes a hash of the PSK). Use a long random PSK.
- Doesn't scale — every peer pair needs a key.

### IPsec — x509 cert auth

Per-peer cert + private key, signed by a CA both sides trust. Happens in IKE phase 1, replacing the PSK.
- Peers exchange certs and sign the handshake with their private key; the other side verifies against the CA.
- **Asymmetric** — no shared secret; compromising one peer doesn't expose the other's identity.
- IKEv2 auth methods: **RSA / ECDSA signatures** (classic), or **EAP** layered on top for remote-access (gateway uses a cert, clients use username/password or EAP-TLS with their own cert).
- Cost: needs a **PKI** — CA, issuance, distribution, revocation (CRL/OCSP). Clock sync matters (cert validity windows).

---

## OpenVPN

TLS-based, runs in **userspace** over UDP/TCP (not real IPsec). Two auth models:

- **Static key / PSK mode** — a single symmetric key file (`openvpn --genkey`) shared by both ends. Point-to-point only, **no PFS**, no key renegotiation. Simple but effectively deprecated for anything beyond a quick tunnel.
- **TLS mode (normal)** — certs + an optional `tls-auth` / `tls-crypt` PSK file as an *extra* HMAC layer on the control channel (hardens against DoS / scanning) — not the primary auth.

---

## WireGuard

Different philosophy — uses neither PSK nor x509 as primary auth.

- Each peer has a **curve25519 keypair** (like SSH keys). You exchange **public keys** out-of-band and list each allowed peer's pubkey + allowed-IPs in config.
- Identity = the pubkey itself. No CA, no cert, no IKE-style negotiation.
- Handshake uses the **Noise protocol** (Noise_IK) — modern, fast, always PFS via ephemeral per-session keys.
- **Optional `PresharedKey`** per peer — *not* the primary auth. An extra symmetric layer mixed into the handshake for **post-quantum hardening** (protects against record-now-decrypt-later if curve25519 is broken). Belt-and-suspenders.
- **Catch:** no built-in PKI/identity story. Distributing + rotating peer pubkeys at scale is a manual problem you solve yourself (config mgmt, or a control plane like Tailscale / NetBird).

---

## Comparison

| | IPsec PSK | IPsec x509 | OpenVPN static PSK | OpenVPN TLS | WireGuard |
|---|---|---|---|---|---|
| Layer | L3 (kernel) | L3 (kernel) | L3/L2 (userspace) | L3/L2 (userspace) | L3 (kernel) |
| Auth | shared secret | per-peer cert | shared key file | certs + tls-auth | static pubkeys |
| PKI / CA | none | required | none | optional | none |
| PFS | yes (DH) | yes (DH) | no | yes | always |
| Rotation | manual, painful | reissue/revoke via CA | manual | reissue via CA | swap pubkeys (manual) |
| Offline dict attack | yes (weak PSK) | no | n/a | no | no |
| Scaling | poor | good | poor | good | poor without control plane |
| Crypto agility | negotiable | negotiable | negotiable | negotiable | none (fixed suite) |
| Config | complex | complex | simple | medium | dead simple |

## Bottom line

PSK = convenience over security. For anything production or multi-peer, use **x509 (IKEv2 + EAP)** or **OpenVPN TLS mode**. **WireGuard** sidesteps the PSK-vs-cert debate entirely with stronger crypto and a tiny codebase — at the price of building your own key-distribution/identity layer.

## See Also

- [network/sslKB.txt](sslKB.txt) — TLS/SSL reference (underpins OpenVPN TLS mode + IKE cert auth)
- [xss-cross-site-scripting.md](../xss-cross-site-scripting.md) — security code-review lens (sibling security topic)
