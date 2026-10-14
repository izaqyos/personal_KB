---
type: reference
title: Platform specific
description: Section 69 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#69"
---

# Platform specific

[↑ KB_vi](/vi/kb-vi/README.md)

## 69.1 MAC

### 69.1.1 Transperancy

```text
if has("gui_macvim")
    set transparency=15
    "set guifont=Monaco:h10
    set guifont=Lucida\ Sans\ Typewriter:h11
    set noantialias
endif
These settings are specific to MacVIM. They set the font to size 10 Monaco, non anti aliased, and sets the window to have 85% opacity.
		69.1.2

	69.2
```
