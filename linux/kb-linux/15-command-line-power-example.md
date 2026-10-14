---
type: reference
title: Command line power example
description: Command line power examples with for loops where backticks and xargs are not enough.
tags: [linux, shell, xargs, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#15"
---

# Command line power example

[↑ KB_Linux](/linux/kb-linux/README.md)

## 15.1 The power of the for loop

```text
Example:
$ for file in ` \ls /usr/share/centrifydc/libexec/* | awk -F/ '{print $6}'` ; do  cleartool ci -nc  $file ; done

Let's break it a part.
\ls is used in case ls is aliased to produce color codes and other annoying stuff that interrupts with all the piping.

produce list of files in dir with ls
| awk -F/ '{print $6}'   print only the file name not the full path
` ` backtick quote would be replaced with the result of the inner command as a set of paramaters (shell expansion)
for file in ``; do command $file; done			execute your commands

																		
Update a directory. Using locate for finding newer versions and updating the original files:
$ for file in `ls_file`  ; do echo "updating lib $file" ; cp `locate $file | sed -n '1p' ` $file; echo "comparing sums"; sha1sum $file ; sha1sum  `locate $file | sed -n '1p' ` ; done

This will ask before copying each lib. Use \cp to escape the cp alias and copy w/o prompt.
Breakdown:
sed -n '1p'				print only the first hit of locate
`locate $file | sed -n '1p' `		copy that first hit over
sha1sum $file ; sha1sum  `locate $file | sed -n '1p' ` ;		compare the checksums
for file in `ls_file`			run on all real files (not dirs, not links etc). ls_file is an alias I defined.
																			   */
```

## 15.2 When `` and xargs are not enough

```text
Example:
$ locate `ct ls * | grep -i checkedout | awk -F@ '{print $1}'` | grep -i centrify | grep 'bin/' | xargs -I {} cp {} .
xargs: invalid option -- I

In advanced xarg commands the -I is supported and allows to run the command for each result (instead of on all results at once). So what can we do?
We need a named file, so:
First:
$ locate `ct ls * | grep -i checkedout | awk -F@ '{print $1}'` | grep -i centrify | grep 'bin/'  > ~/temp/cp_bins

Second, add the cp file . to all lines:
$ sed -i 's_^.*$_cp & ._' ~/temp/cp_bins 

Result:
cp /usr/share/centrifydc/bin/adcheck .
cp /usr/share/centrifydc/bin/addebug .
cp /usr/share/centrifydc/bin/adenv .
cp /usr/share/centrifydc/bin/adinfo_extra.sh .
cp /usr/share/centrifydc/bin/cdcexec .
```
