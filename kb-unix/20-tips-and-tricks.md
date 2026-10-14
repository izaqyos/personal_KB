---
type: reference
title: Tips and tricks
description: "Unix tips and tricks, such as finding source files with a given author tag."
tags: [unix, shell, tips, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#19"
---

# Tips and tricks

[↑ unix-kb](/kb-unix/README.md)

## 19.1 Find all source code files that have a certain pattern ("@author")

```text
	$ grep -sR '@author' *  | awk -F":" '{print $1}' | uniq

	Then check them all out:
	 ct co -nc `grep -sR '@author' *  | awk -F":" '{print $1}' | uniq`

	 19.2 Find all function declarion of a given function: supress grep error messages using -s
	 search function
		 find . \( -name *.cpp -o -name *.h \) -print -exec grep -s -C 5 '\<getValueAsString\>[ \t]*('  '{}' \;  > stam
	 search method
		find . \( -name *.cpp -o -name *.h \) -print -exec grep -s -C 5 '\w\+[ \t]*::[ \t]*\<getValueAsString\>[ \t]*('  '{}' \;  > stam

"
```
