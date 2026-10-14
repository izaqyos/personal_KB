---
type: reference
title: pki_generator_new.sh
description: Script pki_generator_new.sh that generates a full PKI set including CA and client certificates.
tags: [pki, certificates, bash, openssl, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#24"
---

# pki_generator_new.sh

[↑ kb-scripts](/kb-scripts/README.md)

```text
By Alex Atlas,
generate whole PKI set of certs, including CA, Client certs, Machine Certs

usage: $ ./pki_generator_new.sh -Cm CA -Noc 10 -Norc 5 -up user -mp machine -dp cisco.com  -CAexp 365 -policyCaexp 365 -issuingCaexp 365 -SERexp 365 -CLTexp 365 -hash sha2 -keysz 1024 -RndSn
```
