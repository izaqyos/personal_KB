---
type: reference
title: Print section of a file between two regular expressions (inclusive).
description: "Awk range pattern to print a section of a file between two regular expressions, inclusive."
tags: [awk, one-liners, legacy, regex, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#60"
---

# Print section of a file between two regular expressions (inclusive).

[↑ kb_awk](/awk/kb-awk/README.md)

```text
awk '/Iowa/,/Montana/'
I explained what a range pattern such as "pattern1,pattern2" does in general in one-liner #57. In this one-liner "pattern1" is "/Iowa/" and "pattern2" is "/Montana/". Both of these patterns are regular expressions. This one-liner prints all the lines starting with a line that matches "Iowa" and ending with a line that matches "Montana" (inclusive).
```

### 1.3.2 Selective Deletion of Certain Lines

```text
There is just one one-liner in this section.
```

#### 1.3.2.1 Delete all blank lines from a file.

```text
awk NF
This one-liner uses the special NF variable that contains number of fields on the line. For empty lines, NF is 0, that evaluates to false, and false statements do not get the line printed.

Another way to do the same is:

awk '/./'
This one-liner uses a regular-expression match "." that matches any character. Empty lines do not have any characters, so it does not match.

	        1.3.2.2
	    1.3.3

	1.4
```
