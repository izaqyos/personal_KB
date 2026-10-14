---
type: reference
title: "Tip, make a tar file of buffers."
description: "Vim tip: Tip, make a tar file of buffers."
tags: [tips, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.9"
---

# 33.9. Tip, make a tar file of buffers.

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
	make a tar file including path information of all files
	in the current vim buffer.  If you wish to omit paths, leave out the `:p'
		 :silent bufdo !tar -rvf archive.tar %:p

		 The same only commpress result.
		 :silent bufdo !tar -rvfz archive.tarz %:p
		 :silent bufdo !zip proj.zip %:p   : zip all current files
```
