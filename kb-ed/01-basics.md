---
type: reference
title: basics
description: "Basics of the ed line editor: opening files and adding text."
tags: [unix, tutorial, one-liners, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-ed#1"
---

# basics

[↑ kb-ed](/kb-ed/README.md)

## 1.1 open a file

```text
	ed [file]
	Will open the file and move to last line.
```

## 1.2 add text.

### 1.2.1 append after current line

```text
	a
	[Text to add]
	.
	w
```

### 1.2.1 insert before current line

```text
	i
	[Text to add]
	.
	w
```

## 1.3 print

```text
	[range]p
	
	example:
```

### 1.3.1 print current line

```text
		p
		.p
```

### 1.3.2 print first line

```text
		1p
```

### 1.3.3 print first line with match

```text
		/regular/p
```

### 1.3.4 print all lines with match and go to line of last match

```text
		g/regular/p
```

### 1.3.5 print last line

```text
		$p
```

### 1.3.6 print range of lines

```text
		1,3p print from first to third line
		1,.p print from first line to current
		.,$p print from current line to end
		1,$p print from first line to end
```

## 1.4 delete

```text
	[range]d
```

## 1.5 quit

```text
	q
```

## 1.6 substitute

```text
	s/from/to
```

### 1.6.1 subtitute 1 word.

```text
		s/from/to
```

### 1.6.2 subtitute many words in 1 line.

```text
		s/from/to/g
```

### 1.6.3 subtitute all words in file

```text
		This requires to use of the global operator (same as in ex and vi):
		g/^/s/from/to/g
		g, global
		/^/ range (all lines, ^ signifies start of line)
		s/from/to/ (substitute)
		g, (multiple substitutes per line)
```
