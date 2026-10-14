---
type: reference
title: Disable built-in command
description: "Vim tip: Disable built-in command"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.25"
---

# 33.25 Disable built-in command

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
From Vim Tips Wiki Tip 643 
Created: January 26, 2004 Complexity: intermediate Author: Alfvaen Minimum version: 5.7 Karma: 13/6 Imported from: Tip#643

If there's a built-in key command in Vim that you find annoying, or that you often hit by accident, then you can disable the key by mapping it to nothing. For example:

:map K <Nop>

For "<Nop>", type the five characters as they appear (less-than N o p greater-than).

Of course, you can always

:unmap K

if you start doing C programming and want to instantly "man" things under the cursor again. 
```
