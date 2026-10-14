---
type: reference
title: "Yanking (and deleting, replace 'y' with 'd')"
description: Section 13 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#13"
---

# Yanking (and deleting, replace 'y' with 'd')

[↑ KB_vi](/vi/kb-vi/README.md)

```text
Yank to end of line	y$
Yank to start of line	y0
Yank to word "swordfish"	y/swordfish
Yank to letter "g"	yfg
Yank entire line	Y
Yank lines 5 to 10	5,10y
Yank lines next 4 lines into register a		"a4Y
See the content of Yank registers		:registers

" appending to registers (use CAPITAL), copy to regiter, add to register.
" yank 5 lines into "a" then add a further 5 
"a5yy
10j
"A5yy
```
