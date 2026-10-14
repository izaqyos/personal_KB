---
type: reference
title: More search and replace
description: "Legacy vim KB section: More search and replace"
tags: [regex, vim, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "vi/KB_vi#14"
---

# More search and replace

[↑ KB_vi](/vi/kb-vi/README.md)

```text
Search and replace
Change "nick" to "fred" on current line		:s/nick/fred/
Change "nick" to "fred" on the next 5 lines	:.,+4 s/nick/fred/
Change "nick" to "fred" on lines 100 to 200, all occurrences	:100,200 s/nick/fred/g
Capitalise every word in the entire file	:% s/\<./\u&/g
Capitalise first letter of first word in line		 :s/\(\w\)\+/\u&/
Insert ">" at the start of every line	:% s/^/>/
Insert "// nick" at the end of every line	:% s;$;// nick;

Special characters for line sequences:

    * . is the current line
    *     * $ is the last line
    *         * % is every line
    *             * +5 means 5 lines from current line
    *                 * -5 means 5 lines before current line 

Find lines containing "fruit" and change "apple" to "orange" on them	:g/fruit/s/apple/orange/g
Delete all blank lines	:g/^$/d
Find lines NOT containing "nick", append "oops" to them		:g! /nick/normal A oops
```
