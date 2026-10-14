---
type: reference
title: Nuts and bolts
description: Section 58 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#58"
---

# Nuts and bolts

[↑ KB_vi](/vi/kb-vi/README.md)

## 58.1 Change VIM session title

```text
Example:
set titlestring=Yosi_Izaq_KB

More info:
h titlestring

Default title:
:set titlestring=%t%(\ %M%)%(\ (%{expand(\"%:~:.:h\")})%)%(\ %a%)
```

## 58.2 File format, unix vs. dos question

```text
Q:
think I have messed up one too many settings in my .vimrc :)
I have noticed lately very strange errors in bash scripts I wrote
under linux.
It took me some time to realize that bash refuses to run my scripts b/
c it sees all kinda dos thingies in there (mainly or maybe only
		carriage returns at end of line).
Strangely the replacement %s/\r//g found 0 matches yet the errors
persisted.
Even stranger, after running dos2unix the errors went away.

I think this has to do with the format shown in the status line, I
have noticed that my old scripts and C sources show format=unix while
my new scripts that don't work show format=dos.
Last, I noticed that after I run dos2unix on a new script (one that
		showed format=dos) that script now shows format=unix.

How can I get to help section re. this?
Are there any insights as to what is going on or what in .vimrc can
lead to that?
Last, how do I fix this so that new files I edit in Linux are set to
unix and not dos format?

A:
For recent version of vim, it is suffice to type
 :set ff=unix
 and save the file to convert from dos to unix format.
 ... and check the 'fileformats' option
 :h 'ffs

	58.3
```
