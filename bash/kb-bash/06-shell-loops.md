---
type: reference
title: shell loops
description: Section 6 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#6"
---

# shell loops

[↑ KB_bash](/bash/kb-bash/README.md)

## 6.1 do something on a list

```text
	for file in KB_cpp kb_tools kb_cisco kb_acs; do tocify.pl $file; done
```

## 6.2 C like loop

```text
		output in one line
		LIMIT=31; for (i=1; i <= LIMIT ; i++); do echo -n "$i"; done

		output in multiple lines
		LIMIT=31; for ((i=1; i <= LIMIT ; i++)) ;  do echo  "$i"; done
```
