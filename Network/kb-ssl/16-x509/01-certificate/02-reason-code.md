---
type: reference
title: Reason Code
description: RFC 5280 CRL entry extension Reason Code identifying why a certificate was revoked.
tags: [x509, pki, certificates, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#5.3.1"
---

# 5.3.1. Reason Code

[↑ Certificate](/Network/kb-ssl/16-x509/01-certificate/README.md)

```text
   The reasonCode is a non-critical CRL entry extension that identifies
   the reason for the certificate revocation.  CRL issuers are strongly
   encouraged to include meaningful reason codes in CRL entries;
   however, the reason code CRL entry extension SHOULD be absent instead
   of using the unspecified (0) reasonCode value.

   The removeFromCRL (8) reasonCode value may only appear in delta CRLs
   and indicates that a certificate is to be removed from a CRL because
   either the certificate expired or was removed from hold.  All other
   reason codes may appear in any CRL and indicate that the specified
   certificate should be considered revoked.














Cooper, et al.              Standards Track                    [Page 69]

RFC 5280            PKIX Certificate and CRL Profile            May 2008


   id-ce-cRLReasons OBJECT IDENTIFIER ::= { id-ce 21 }

   -- reasonCode ::= { CRLReason }

   CRLReason ::= ENUMERATED {
        unspecified             (0),
        keyCompromise           (1),
        cACompromise            (2),
        affiliationChanged      (3),
        superseded              (4),
        cessationOfOperation    (5),
        certificateHold         (6),
             -- value 7 is not used
        removeFromCRL           (8),
        privilegeWithdrawn      (9),
        aACompromise           (10) }
```
