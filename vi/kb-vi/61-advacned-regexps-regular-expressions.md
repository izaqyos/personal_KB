---
type: reference
title: Advacned regexps (regular expressions)
description: Section 60 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#60"
---

# Advacned regexps (regular expressions)

[↑ KB_vi](/vi/kb-vi/README.md)

## 60.1 match Some text & more text & (some white space) & ...

```text
Some text & more text & (some white space) & ...
Some text & more text & (some numbers, :, or -) & ...

Some text & more text & (    ) & ...
match with 
^\(\w\+\s*\)\+&\(\s*\w\+\s*\)\+&\s*(\s\+)\s*&

Some text & more text & (1221-3435-12312)  & ...
match with:
^\(\w\+\s*\)\+&\(\s*\w\+\s*\)\+&\s*([[:digit:]:-]\+)\s*&


	60.2
```
