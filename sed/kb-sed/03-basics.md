---
type: reference
title: Basics
description: "Legacy sed KB section: Basics (Delete lines that contain a certain pattern)"
tags: [sed, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "sed/KB_sed#3"
---

# Basics

[↑ KB_sed](/sed/kb-sed/README.md)

## 3.1 Delete lines that contain a certain pattern

```text
	The following will delete all lines that contain the word "cygdrive" from file .bashrc 
	sed -e '/cygdrive/d' .bashrc 
```
