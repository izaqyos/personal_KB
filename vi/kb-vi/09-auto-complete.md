---
type: reference
title: Auto complete
description: Section 9 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#9"
---

# Auto complete

[↑ KB_vi](/vi/kb-vi/README.md)

```text
	9.1 use ctrl+n to auto complete forward words and ctrl+s to auto complete backword.

	9.2 use ctrl+p to visually auto complete backward and ctr+n to visually auto complete forward.

	9.3 use ctrlX^d (hold ctrl, press X then d) to auto complete from syntax defenition.
```

## 9.4 options

```text
	help in  *24.3*  Completion

        CTRL-X CTRL-F           file names
        CTRL-X CTRL-L           whole lines
        CTRL-X CTRL-D           macro definitions (also in included files)
        CTRL-X CTRL-I           current and included files
        CTRL-X CTRL-K           words from a dictionary
        CTRL-X CTRL-T           words from a thesaurus
        CTRL-X CTRL-]           tags
        CTRL-X CTRL-V           Vim command line
```

## 9.5 from dictionary

### 9.5.1 Add dictionary

```text
		Its possible to add any kind dictionary ( a text file that contains many words either in native langauge of
				specific field of science or engineering). The easiest way to get one is to download it from the internet

			Then set in .vimrc
			:set dictionary+=[path to dictionary]

                        mac has built-in dictionary so:
set dictionary+=/usr/share/dict/words
```

### 9.5.2 Complete from dictionary

```text
		ctrl-x ctrl-k
```

### 9.5.3 set Completion options

```text
h 'complete'

Example:
		
if has("win32unix") "Tip will only take effect on cygwin
set complete=.,w,b,u,k
elseif  has("win32") 
set complete=.,w,b,u,k
else "Unix, where my source code is
set complete=.,w,b,u,k,i,]
endif

		9.5.4
```
