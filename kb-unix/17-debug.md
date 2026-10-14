---
type: reference
title: Debug
description: Section 16 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#16"
---

# Debug

[↑ unix-kb](/kb-unix/README.md)

## 16.1 create core file.

### 16.1.1 gcore -o <core name> -pid <pid>

### 16.1.2 or kill -7 <pid>

```text
			7 is SIGQUIT
```

## 16.2. list .so an executable uses:

```text
	$ ldd <exec>
	$ ldd -v, verbose info, recursive dependency in libs
```
