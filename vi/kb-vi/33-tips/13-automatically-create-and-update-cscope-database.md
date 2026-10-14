---
type: reference
title: Automatically create and update cscope database
description: Subsection 33.12 of Tips..
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#33.12"
---

# 33.12 Automatically create and update cscope database

[↑ Tips.](/vi/kb-vi/33-tips/README.md)

```text
From Vim Tips Wiki

Created: June 21, 2007 Complexity: basic Author: Zhaojun WU Version: 7.0

In order to create or update the cscope database in current directory, the following key mapping would help a bit:

nmap <F11> :!find . -iname '*.c' -o -iname '*.cpp' -o -iname '*.h' -o -iname '*.hpp' > cscope.files ;
  \ cs kill -1<CR>:cs add cscope.out<CR>

In the above mapping, I use "find" to collect the C/C++ source code files and (re)create the cscope database; then "kill -1" to kill all cscope database connections and finally, the newly created "cscope.out" database is added by "cs add cscope.out".

There are two limitations in this key mapping:

|   1. the current directory should be the root path of the project
|   2. I don't know how to get the current cscope data connection number, so that I use "kill -1" to kill "all" cscope database connections, since actually I always only create one connections in one Vim instance. It is not practical if you are using multiple data connections in one vim instance. 
```
