---
type: reference
title: Terminal
description: Mac terminal tips on the built-in dictionary file and grep over it.
tags: [macos, shell, grep, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-mac#10"
---

# Terminal

[↑ kb-mac](/kb-mac/README.md)

## 10.1 built in dictionary

```text
$ wc -l  /usr/share/dict/words 
  235886 /usr/share/dict/words

grep  <pattern>  /usr/share/dict/words
/usr/bin/look will also work. 

NAME 
look - display lines beginning with a given string 

SYNOPSIS 
look [-df] [-t termchar] string [file] 
Try using dict at the command prompt to get the same result - like this

ner % dict banil
No definitions found for "banil", perhaps you mean:
web1913: Anil Bail Ganil Basil Banal
wn: anil bail basil banal
easton: Bani
    10.2
```
