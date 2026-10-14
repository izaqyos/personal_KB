---
type: reference
title: Advanced issues
description: Section 26 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#26"
---

# Advanced issues

[↑ unix-kb](/kb-unix/README.md)

## 26.1 Strange result of reading from shell

```text
I'm using gvim launched from an linux xterm.

I want to work with all the files in the current directory so I do :r!
ls
the result is full of strange characters that get in the way of
editing the file.
I get something like (ignore the line numbers):
 2 ^[[00mtotal 184
   3 ^[[00m^[[00mcentrifydc.conf^[[00m
   4 ^[[00mdefaults.conf^[[00m
   5 ^[[00mdiff_cfg^[[00m
   6 ^[[00mgid.ignore^[[00m
   7 ^[[00mgroup.ignore^[[00m
   8 ^[[00mgroup.ovr.sample^[[00m
   9 ^[[00;34mold^[[00m/
  10 ^[[00;34mopenldap^[[00m/
  11 ^[[00mpasswd.ovr.sample^[[00m
  12 ^[[00muid.ignore^[[00m
  13 ^[[00mupgradeconf.conf^[[00m
  14 ^[[00muser.ignore^[[00m

Any idea why this happens?- More importantly how to make this go away?

Found away around this outside of VIM by performing:
for file in *; do echo $file; done > list_of_files

Yes.  Those are ANSI escape codes
http://en.wikipedia.org/wiki/Ansi_escape_codes

Your version of ls uses them to visually enhance the output on a xterm.
Usually this means you are using an alias for ls.  Try:

:!r
/bin/ls
```
