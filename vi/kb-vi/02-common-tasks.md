---
type: reference
title: common tasks
description: Section 2 of the legacy KB_vi notes.
tags: [kb-vi]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#2"
---

# common tasks

[↑ KB_vi](/vi/kb-vi/README.md)

## 2.1. set line numbers

```text
	:set nu

	turn off 
	:set nonu 

	toggle
	:set nu!
```

## 2.2 edit source code and setting to see syntax

```text
	:syntax on

	turn it off
	:syntax off
```

## 2.3 file operations

### 2.3.1 save a copy of current file

```text
:w ~/temp/%:t
```

### 2.3.2 rename current file

```text
- simple rename
!mv % new_name

- edit rename
:NERDTreeFind
m
rename

can also copy

    2.4
```
