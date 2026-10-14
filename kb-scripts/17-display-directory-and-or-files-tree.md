---
type: reference
title: Display directory and/or files tree
description: Shell alias for displaying a directory and file tree.
tags: [shell, unix, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-scripts#17"
---

# Display directory and/or files tree

[↑ kb-scripts](/kb-scripts/README.md)

```text
	This one is actually an alias, but quite a useful one so I put it here.
	#Directory display tree
alias tree="ls -R |  sed -e '/:$/s/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'"
alias dir_tree="ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'"
```
