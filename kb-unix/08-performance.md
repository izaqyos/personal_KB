---
type: reference
title: Performance.
description: Section 7 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#7"
---

# Performance.

[↑ unix-kb](/kb-unix/README.md)

## 7.1 use ldd to determine the list of so depen.

```text
	7.2 use nm to view the so (or binary) name and list of symbols.
```

## 7.3 use strings to get the binary strings.

## 7.4. sar.

```text
		7.4.1 to record load system params for 10 hours in a half minute res.
			$ sar -A -o [ file name ] 30 1200
```

### 7.4.2 to read the recorded input.

```text
			$ sar [- optional flags ] -f [file name]  
```

### 7.4.3 sar flags.

```text
			u : user, system, i/o, idle, interrupts
			b : blocks read/write, lread/write ...
			d : disk activity
			a : file access system calls
			c : sys calls
			g/p : paging
			k : KMA
			m : message/semaphore
			q : Q length
			v : process status + file tables
			w : swapp
			y : tty
```
