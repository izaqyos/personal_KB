---
type: reference
title: Networking
description: Section 9 of the legacy kb-windows notes.
tags: [kb-windows]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "windows/kb-windows#9"
---

# Networking

[↑ kb-windows](/windows/kb-windows/README.md)

## 9.1 Ports

### 9.1.1 Block specific incoming port

```text
Example, block UDP port 464.
control panel -> Windows firewall -> Advanced -> Choose NIC, double click -> Add... -> 
Fill the IP adress of incoming machines (or range if you want).
Fill settings,
To block port set it in field: Internal - 464
```
