---
type: reference
title: Using AWK
description: "Using awk: invoking it, how it works and basic examples."
tags: [awk, tutorial, legacy, unix, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.1"
---

# 5.1 Using AWK

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.1.1 invoking awk

```text
		    awk 'instructions' files
		    awk -f script files
```

### 5.1.2 how does it work?

```text
		Awk, in the usual case, interprets each input line as a record and each word on that line, delimited by spaces or tabs, as a field. (These defaults can be changed.) One or more consecutive spaces or tabs count as a single delimiter. Awk allows you to reference these fields, in either patterns or procedures. $0 represents the entire input line. $1, $2, ... refer to the individual fields on the input line. Awk splits the input record before the script is applied.
```

### 5.1.3 Basic examples

```text
		a single instruction that prints the first field of each line in the input file.
		awk '{ print $1 }' list

		a pattern "/MA/" is specified but there is no procedure. The default action is to print each line that matches the pattern.
		awk '/MA/' list

		print first field of only lines that match "MA".
		awk '/MA/ { print $1 }' list

		Default awk will seperate words (delimiter is white spaces), this example changes delimiter to ,
		awk -F, '/MA/ { print $1 }' list

		 print each field on its own line. Multiple commands are separated by semicolons.
		$ awk -F, '{ print $1; print $2; print $3 }' list
```
