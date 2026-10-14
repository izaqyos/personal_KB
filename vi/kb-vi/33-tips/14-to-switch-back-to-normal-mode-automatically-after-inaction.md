---
type: reference
title: To switch back to normal mode automatically after inaction
description: "Vim tip: To switch back to normal mode automatically after inaction"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.13"
---

# 33.13 To switch back to normal mode automatically after inaction

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
Created: December 9, 2007 Complexity: basic Author: Anon Version: 7.0

Looking for a way to exit insert mode automatically when you haven't typed anything for a few seconds?

Try:

au! CursorHoldI * stopinsert
```
