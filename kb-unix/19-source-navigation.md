---
type: reference
title: Source navigation.
description: "Source code navigation tools: cscope, source navigator, cflow, Understand and hypersrc."
tags: [unix, ide, reference, tips, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#18"
---

# Source navigation.

[↑ unix-kb](/kb-unix/README.md)

```text
	18.1 cscope is a very good source code navigator based on curse (acsii gui) lib.
	Also possible to use freescope.
	$ cd <my_project_path>/<my_project>
	$  find . \( -name "*.[chCH]" -o -name "*.cpp" -o -name "*.hpp" \) > freescope.files
	$ freescope
```

## 18.2 source navigator

## 18.3 cflow

```text
	$  cflow --main HCAP_InitClient  hcap.cpp

	reverse call graph
	$ cflow --reverse --main HCAP_InitClient  hcap.cpp

	nicer graph
	$ cflow --tree   --brief --main HCAP_InitClient  hcap.cpp
```

## 18.4 Understand.

## 18.5 hypersrc, pypersrc

### 18.5.1 hypersrc installtion for cygwin.

```text
			-> Install the gnome dev libs.
			-> If you get an error of "GNU make" not defined, modify configure.sh line with uname -a check to treat cygwin like linux.
			-> run make all install. you may get path errors if cygwin install path contains spaces. in that cast modify GNUmakefile
			and wrap $INSTALL_DIR with "".
			-> run hypersrc.pl.
				You may get an error something like hypersrc not in path add it gybrish. 
				Just edit hypersrc.pl and make sure there are no paths that contains spaces (or else "protect" them with \)
```

### 18.5.2 pypersrc
