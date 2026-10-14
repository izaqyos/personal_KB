---
type: reference
title: View symbols in DLL file.
description: "Legacy Windows KB section: View symbols in DLL file."
tags: [windows, legacy, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "windows/kb-windows#3"
---

# View symbols in DLL file.

[↑ kb-windows](/windows/kb-windows/README.md)

```text
	$dumpbin 
	To get list of possible filters

	$dumpbin [filters] [dll file]
	to get symbols.

	example:
	$ dumpbin /exports PDE.dll | grep Context

	The exe comes with VC.
```
