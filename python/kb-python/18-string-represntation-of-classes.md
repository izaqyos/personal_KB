---
type: reference
title: String represntation of classes
description: "Legacy Python KB section: String represntation of classes (use or override built in method __str__)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#18"
---

# String represntation of classes

[↑ KB_python](/python/kb-python/README.md)

## 18.1 use or override built in method __str__

```text
	__str__(self)

Called by the str built-in function and by the print statement to compute the informal string representation of an object. This differs from __repr__ in that it does not have to be a valid Python expression: a more convenient or concise representation may be used instead. The return value must be a string object.
```
