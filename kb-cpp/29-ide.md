---
type: reference
title: IDE
description: "C++ IDE notes: Eclipse CDT setup and troubleshooting, such as workspace in use errors."
tags: [ide, eclipse, cpp, troubleshooting, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#30"
---

# IDE

[↑ kb-cpp](/kb-cpp/README.md)

## 30.1 Eclipse CDT

### 30.1.1 Troubleshoot

```text
			30.1.1.1  Eclipse says: “Workspace in use or cannot be created, chose a different one.” How do I unlock a workspace?
've seen 3 other fixes so far:

in .metadata/, rm .lock file
ex: $ rm /users/<user>/workspace1box/.metadata/.lock 
rm: remove regular empty file `/users/<user>/workspace1box/.metadata/.lock'? y

if 1) doesn't work, try end process javaw.exe etc. then rm .lock file
if 1)&2) doesn't work, try rm .log file in .metadata/, and double check .plugin/.
This always worked for me: relocate .metadata/, open and close eclipse, then overwrite .metadata back
			30.1.1.2
		30.1.2

	30.2
```
