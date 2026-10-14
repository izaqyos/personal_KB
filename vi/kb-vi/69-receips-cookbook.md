---
type: reference
title: "receips, cookbook"
description: Section 68 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#68"
---

# receips, cookbook

[↑ KB_vi](/vi/kb-vi/README.md)

## 68.1 g, global operator

### 68.1.1 Join lines between patterns

```text
I have a text file which looks like this:

A.
text
text
text


A.
more text

more text

A.
more text
I want to join all lines between the "markers" A. so that it looks like:

A.texttexttext
A.more textmore text
A.more text
How can I do this in Vim?

Two ways:
-> 
:%s/\n\(\(A\.$\)\@!.*\)/\1/
Substitute a pattern matching:

newline,
a group containing of

not the string A. directly followed by end-of-line, then
any character until end of line
with:

everything matched except the starting newline (i.e. the group above),
and do this globally.

	-> This also works (when the first line starts with A.)
:v/^A/-1j!

		68.1.2
	68.2
```
