---
type: reference
title: Troubleshoot
description: Section 18 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#18"
---

# Troubleshoot

[↑ KB_Linux](/linux/kb-linux/README.md)

## 18.1 login

### 18.1.1 Direct login fails "GDM could not write to your authorization file"

```text
do df -h /
df -h /users/<user>

delete some files and make space (check /tmp!)
Filesystem            Size  Used Avail Use% Mounted on
/dev/sda2             7.9G  5.2G  2.4G  70% /
```

## 18.2 Scripts

### 18.2.1 line 1: ﻿#!/usr/bin/bash: No such file or directory

```text
-problem:
$ ~/work/scripts/work_utils/pushaod.sh ./install/isos/ise/target/ise-2.2.0.245.NOT_FOR_RELEASE.x86_64.iso
/users/<user>/work/scripts/work_utils/pushaod.sh: line 1: ﻿#!/usr/bin/bash: No such file or directory

-fix:
	-- Identify issue:
$ head -n 1 pushaod.sh | LC_ALL=C od -tc
0000000 357 273 277   #   !   /   u   s   r   /   b   i   n   /   b   a
0000020   s   h                                      \n
0000034

If the output starts with 357 273 277 it is an UTF8 byte order mark. In vim you can use set nobomb to remove it.

Neither the kernel (which interprets the she-bang line), nor your system's sh (which is invoked for scripts that don't have a she-bang) recognise that BOM, so what you're seeing here is:

The kernel returns ENOEXEC upon executing that script as it's not a recognised executable (it's not a native binary executable, and it's not a script as it doesn't start with #!).
Your interactive shell, upon that ENOEXEC, calls sh on it.
That sh reads and interprets the file. The first line is not a comment, the # is not preceded by a blank, so it does try to execute <BOM>#/bin/bash, and reports an error message.

- Verify fix
$ head -n 1 pushaod.sh | LC_ALL=C od -tc
0000000   #   !   /   u   s   r   /   b   i   n   /   b   a   s   h    
0000020                                  \n
0000031


	18.3
```
