---
type: reference
title: command history.
description: Section 2 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#2"
---

# command history.

[↑ KB_bash](/bash/kb-bash/README.md)

## 2.1. last command

```text
	$ !!
```

## 2.2 last prefix command

```text
	$ !pref

	example
	$ ping 1.2.3.4
	$ !pin
	repeats the ping command

	If you want to print the command instead of execute it do:
	$ !prefix:p
```

## 2.3 search history

```text
	ctrl+r (^r) 
```

## 2.4 Argument of last command !$

```text
	$ mkdir long/directory/name
	$ cd !$


	id=__bash_prompt_history2
```
