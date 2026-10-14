---
type: reference
title: make-how-to
description: Notes on the project make schema and how builds are organized.
tags: [make, build, reference, tips]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: make-how-to
---

# make-how-to

```text
Description: 	Usefull information regarding the project make schema.
Author:		Yosi Izaq.
	
1. Compile lib to include update in file.
	make INCLUDE_DEP=0 -W std_file_interface.cc
	Sometimes this command won't update the dependency files resulting in compilation error.
	At this case remove the .d files manually. example.
	$ rm  <internal-path>
	or issue
	$  make INCLUDE_DEP=0 clean_dep; make clean

2. compile all libs of project to include update in file.
	make BUILD_DEP=0 -W <internal-path>

3. usefull commands.
	3.1 ar tv . view symbols time stamps.
	3.2 nm . view object names.

4. When linking the main, get undefined symbol errors for methods that are static and are inline. How to fix?
 Put method defenition at .cc file.
```

## See Also

- [Compile and build code](/kb-unix/10-compile-and-build-code.md) — Make and gmake flags, dry-run
- [Installation from sources.](/linux/kb-linux/11-installation-from-sources.md) — Typical configure, make, install flow
