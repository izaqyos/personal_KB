---
type: reference
title: "awk, AWK, see kb_awk for full information."
description: "Awk basics: field separators, arithmetic and filtering many files, pointing to the awk KB."
tags: [awk, unix, examples, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#14"
---

# awk, AWK, see kb_awk for full information.

[↑ unix-kb](/kb-unix/README.md)

## 14.1 awk seperator

```text
		example seperator /
		cat ~/temp/merge_cmd | awk -F \/ '{print $5}'
```

## 14.2 Simple arithmetic calculation.

### 14.2.1 Simple example

```text
		Say I want to sum the size of all.obj and .pch files in a visuall c++ project dir. I run the next command from the projects root dir.
$ find . \( -name "*.obj" -o -name "*.pch" \) -exec ls -l '{}' \; | awk ' {size+= $5}  END {print "size: " size "kb" }'
```

### 14.2.2. Advanced example.

```text
		Use awk for simple calculation. For example find all files and directories larger than 100MB. do
	$  du -k . |  awk '{if ($1 > 100000) print $2, " is bigger than 100MB, size: ",$1}'

	or
	$ du -k . > usage_report
	$ awk '{if ($1 > 100000) print $2, " is bigger than 100MB, size: ",$1}' usage_report

	or possible to use find
```

## 14.3 Use awk to filter many files from one file.

```text
	This will split file basic1 to as many files as specified in parameter number 3.
	 awk '{print $0 >> sprintf("aaa%s.log", $3)}' basic1
	 awk '{print $0 >> sprintf("aaa%s.log", $3)}' basic1
```

## 14.4 tee

```text
	tee is a command that writed from standard IO to files. It can be used for example to debug awk scripts that work with pipes.
	If an awk program is part of a pipeline of several programs, even other awk programs, you can use the tee command to redirect output to a file, while also piping the output to the next command. For instance, look at the shell script for running the masterindex program, as shown in Chapter 12, "Full-Featured Applications":

    $INDEXDIR/input.idx $FILES |
    sort -bdf -t:  +0 -1 +1 -2 +3 -4 +2n -3n | uniq |
    $INDEXDIR/pagenums.idx | tee page.tmp |
    $INDEXDIR/combine.idx |
    $INDEXDIR/format.idx

By adding "tee page.tmp", we are able to capture the output of the pagenums.idx program in a file named page.tmp. The same output is also piped to combine.idx.
```
