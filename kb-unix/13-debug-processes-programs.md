---
type: reference
title: "Debug processes, programs"
description: "Debugging processes on Unix: strace/truss for system calls and GDB."
tags: [debugging, gdb, unix, linux, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#12"
---

# Debug processes, programs

[↑ unix-kb](/kb-unix/README.md)

## 12.1. Execution report in terms of syscalls.

```text
		in older solaris 
		$ truss <command>

	truss <process args>
	or truss -pid <pid>

		For linux and current solaris
		#strace <command>
```

## 12.2. GDB

```text
	    12.2.1 tutorial
check icloud notes 

		12.2.2 examine memory
		(gdb) h x
	Examine memory: x/FMT ADDRESS.
	ADDRESS is an expression for the memory address to examine.
	FMT is a repeat count followed by a format letter and a size letter.
	Format letters are o(octal), x(hex), d(decimal), u(unsigned decimal),
	  t(binary), f(float), a(address), i(instruction), c(char) and s(string).
	Size letters are b(byte), h(halfword), w(word), g(giant, 8 bytes).
	The specified number of objects of the specified size are printed
	according to the format.

	Defaults for format and size letters are those previously used.
	Default count is 1.  Default address is following last thing printed
	with this command or "print".
	Example:
	(gdb) x/1g authResponse
	0xbfffe7f0:     0x0000005200000000
```
