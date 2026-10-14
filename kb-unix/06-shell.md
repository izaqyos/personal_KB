---
type: reference
title: Shell
description: Section 5 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#5"
---

# Shell

[↑ unix-kb](/kb-unix/README.md)

## 5.1. sh stream redirection

### 5.1.1 man sh. search redirect

```text
	Here is an excerpt from the manual:
	 Redirecting Standard Output and Standard Error
	       Bash allows both the standard output (file descriptor 1) and the standard error output (file descriptor 2) to be redirected to the file whose name is the expansion of word with this construct.

	       There are two formats for redirecting standard output and standard error:

		      &>word
	       and
		      >&word

	       Of the two forms, the first is preferred.  This is semantically equivalent to

		      >word 2>&1

		5.1.2 example. command that prints to stderr. stderr is redirected to sdtout (2>&1) stdout is appended to $FILE
		$ smsc -nobanner -inst 1 print_db -subs -count 1>>$FILE 2>&1
		another example (ACS express RPM):
		$ ln -s $BASEDIR /cisco-ar >> $INSTALL_LOG 2>&1
```

## 5.2 sh command status:

```text
	0 success, else error
	$ echo $?
    last command
	$ !#
    command number n.
	$ ![n]
last argument, !$
```

## 5.3 Shell rex exp expansion.

### 5.3.1 example. Create 10 files.

```text
		$ touch {a,b}{1,2,3,4,5} 
```
