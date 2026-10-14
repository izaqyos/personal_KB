---
type: reference
title: grep
description: "Unix grep usage, including recursive grep over specific file types."
tags: [grep, unix, one-liners, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#1"
---

# grep

[↑ unix-kb](/kb-unix/README.md)

```text
	1. 1. recursive grep on certain type of files. example on all .cc files search for a certain string, also print name of file being searched.
find . -name "*.cc" -print -exec grep imc_cos '{}' \; 
	The same can be aceived with xargs. See xargs section.
	1.2. the same but search in .cc or .h files. put the output in a file.
find . \( -name "*.h" -o -name "*.cc" \) -print -exec grep imc_sm_ind '{}' \; >! ~/temp/out

	1.3 Use grep as shortcut to clearcase operations

		1.3.1 run mkelem command on a list of checked out files 
alias mkelem_all_checkout  "ct mkelem  `ct lsp | grep checked | grep -v dummy | grep code
| nawk '{print $1}'`"


	1.4. list only directories do.
		1.4.1 $ ls -F | grep "/" 

	1.5.5 grep regular expression.
		1.5.5.1 use pearl refular expression syntax. -P
	for example search for cpp class defenition.
	 grep -P "class\s+.*AuditActionBase\s+:\s+[public|protected|private]?" *.h

	 1.5.6 grep with context (print lines before and after)
	$ grep -A a -B b -C c "CiscoACS" exportDicts.reg
	b is number of lines before match and a is # lines after match and c is the number of context lines.

	1.5.7 Create a list of attributes from ACS dictionary attr file.
	$grep -C 1 -P "CiscoACS[\\\]Dictionaries[\\\]000" exportDicts.reg  | grep Name
	Returns the list of attr names of dictionary # 000

[ < ] 	[ > ] 	   	[ << ] 	[ Up ] 	[ >> ] 	   	   	   	   	[Top] 	[Contents] 	[Index] 	[ ? ]
```
