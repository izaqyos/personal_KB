---
type: reference
title: Shell scripting.
description: "Shell scripting: sh variable conditions and examples."
tags: [shell, bash, examples, unix, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#11"
---

# Shell scripting.

[↑ unix-kb](/kb-unix/README.md)

## 11.1 sh

### 11.1.1. sh variable condition example.

```text
		This one checks if variable contains value. if so it prints an error message to stderr.
			if [ -n "${NETOLOGY_INST}" ]
		 then
		   echo "Run with -noinst" >&2
		   exit 1
		fi
```
