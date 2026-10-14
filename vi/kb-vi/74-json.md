---
type: reference
title: JSON
description: "Legacy vim KB section: JSON (pretty format JSON)"
tags: [json, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#73"
---

# JSON

[↑ KB_vi](/vi/kb-vi/README.md)

## 73.1 pretty format JSON

```text
whole file:
:%!python -m json.tool
:%!jq .

one line
:.!python -m json.tool
:.!jq .

    73.2
```
