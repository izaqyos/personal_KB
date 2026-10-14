---
type: reference
title: Compile python
description: Section 6 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#6"
---

# Compile python

[↑ KB_python](/python/kb-python/README.md)

## 6.1 for windows

```text
	Creating a Python Executable File Using makeExe.py
This file creates an executable file from a Python file specified by the user and writes the new executable to disk.

	First, create a setup file with this content:
	from distutils.core import setup
	import py2exe
	
	setup(console=['name.py'])

	Copy name.py to python install dir
	Then, run (from a dos shell in python install path):
	python setup.py py2exe

	two dirs are created, build - is workspace and can be deleted, dist - contains the exe and its denpendencies.
```

### 6.1.1 get help on configuration options of py2exe

```text
		>>> import py2exe
		>>> help(py2exe)

		6.1.2
"""
makeExe.py
- Simple Python script to automate the creation
  of Python executables using py2exe.

(c) 2004 Premshree Pillai (24/01/04) http://www.qiksearch.com/
"""
http://www.py2exe.org/
```
