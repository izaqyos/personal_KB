---
type: reference
title: Determins operating system information.
description: "Commands for determining OS information: kernel, gcc and Red Hat versions."
tags: [linux, one-liners, cheatsheet, gcc, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#3"
---

# Determins operating system information.

[↑ KB_Linux](/linux/kb-linux/README.md)

## 3.1 kernel version, Linux version:

```text
	$ unname -a
Linux <user>-lnx 2.6.9-42.7.ELsmp #1 SMP Tue Sep 5 18:29:39 EDT 2006 i686 i686 i386 GNU/Linux
```

## 3.2 gcc version

```text
	$ gcc --ver
```

## 3.3 Red hat version

```text
$ cat /etc/redhat-release 
Red Hat Enterprise Linux AS release 4 (Nahant Update 4)
```

## 3.4 How to get system information ?

```text
What is the command to get details system information 
about CPU, Memory, Hard Disk etc ? 

try: 
dmesg 
the above will work on ANY UNIX, linux, *bsd :-) 

cat /cpuinfo 
cat / proc/meminfo 
lspci and lspci -vv 
top 


	3.5
```
