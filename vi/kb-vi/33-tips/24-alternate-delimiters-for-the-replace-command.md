---
type: reference
title: Alternate delimiters for the replace command
description: "Vim tip: Alternate delimiters for the replace command"
tags: [vim, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.24"
---

# 33.24 Alternate delimiters for the replace command

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
From Vim Tips Wiki Tip 406 
Created: January 17, 2003 Complexity: basic Author: Raj Kiran Minimum version: 5.7 Karma: 56/20 Imported from: Tip#406

You don't need to use the slash character as the expression delimiter. Whatever character follows the :s is defined to be the delimiter character. You can use most non-alphanumeric characters (but not \, " or |). This is very handy when working with Unix filenames, as in the following example:

:s#/usr/local/#/opt/#

If you insist on using the normal slash, you have to escape each slash in the pattern with a backslash:

:s/\/usr\/local\//\/opt\//

As you can see, the escaping method is much less readable, so consider carefully your choice of delimiter character!

If I need to replace a '/' character, I use a period '.' ie

 :s.///.fff.

to replace /// with fff

The description alludes to this, but another example seemed to be in order. 
```
