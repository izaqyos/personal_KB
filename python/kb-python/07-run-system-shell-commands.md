---
type: reference
title: Run system shell commands.
description: "Legacy Python KB section: Run system shell commands. (du example:)"
tags: [shell, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#7"
---

# Run system shell commands.

[↑ KB_python](/python/kb-python/README.md)

## 7.1 du example:

```text
	To run a command and analyse its output like the backquotes do in other languages, is two things to be done, so it's two functions.

	popen opens a pipe to another command (varients allow you to decide whether you want to access input, output and error channels) then you can readlines (or use another file read function) to go through the output.

	Here's an example that runs a du command ... clearly it will only work on operating systems that support the command.  popen4 allows us to handle both stdout and stderr through the same input stream.

	import os
	import re

	put, get = os.popen4("du -s /Users/*")

	for user in get.readlines():
		       if re.match(r'^\d',user): print user,
```
