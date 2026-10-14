---
type: reference
title: SSL messages.
description: "SSL record header byte values for change cipher, alert, handshake and application data."
tags: [ssl, tls, networking, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "Network/sslKB#4"
---

# SSL messages.

[↑ sslKB](/Network/kb-ssl/README.md)

## 4.1 SSL headers.

```text
		00 14 03 01 00, change cipher 
		00 15 03 01 00, alert 
		00 16 03 01 00, handshake 
		00 17 03 01 00, application data
```
