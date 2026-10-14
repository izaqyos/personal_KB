---
type: reference
title: Pattern Matching
description: Subsection 5.2 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.2"
---

# 5.2 Pattern Matching

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	When awk reads an input line, it attempts to match each pattern-matching rule in a script. Only the lines matching the particular pattern are the object of an action. If no action is specified, the line that matches the pattern is printed (executing the print statement is the default action). 
```

### 5.2.1 print all empty lines:

```text
		/^$/ { print "This is a blank line." }
```

### 5.2.2 Classify acording to content

```text
		# test for integer, string or empty line.
		/[0-9]+/    { print "That is an integer" }
		/[A-Za-z]+/ { print "This is a string" }
		/^$/        { print "This is a blank line." }

		See running with std input example:
		$ awk -f classifyContent.awk  
		4 yosi
		That is an integer
		This is a string
		4
		That is an integer
		
		This is a blank line.
```
