---
type: reference
title: Update Conflict
description: Section 1 of the legacy kb-db notes.
tags: [kb-db]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#1"
---

# Update Conflict:

[↑ kb-db](/kb-db/README.md)

```text
   An update conflict occurs when two or more transactions attempt to modify the same data simultaneously. Suppose Transaction A and Transaction B both read the same data, and both intend to update it. If Transaction A commits its changes before Transaction B, there is no conflict. However, if Transaction B tries to commit its changes after Transaction A, it will detect that the data it read has been modified by another transaction, indicating an update conflict. This conflict needs to be resolved to ensure data consistency.
```
