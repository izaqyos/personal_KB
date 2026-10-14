---
type: reference
title: My examples and snippets
description: Section 33 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#33"
---

# My examples and snippets

[↑ KB_Linux](/linux/kb-linux/README.md)

## 33.1 use xargs for multiple commands and handle empty results

```text
find -type f -print0 | xargs -0 -I '{}' sh -c 'echo search in {}; sed  -ne '290p' | grep cd' | tee  ~/res

-0 If there are blank spaces or characters (including newlines) many commands will not work. This option take cares of file names with blank space.
-I Replace occurrences of replace-str in the initial-arguments with names read from standard input. Also, unquoted blanks do not terminate input items; instead the separator is the newline character.
- sh -c , run multiple commands in new shell
```

## 33.2 search all files for pattern in specific line only

```text
$ find -type f -print0 | xargs -0 -I '{}' sh -c 'if sed  -ne '290p' {} | grep cd; then echo found match in file {}; fi' | tee  ~/res
- nscd fixes (BZ#4074)
found match in file ./install/isos/ipep/target/isostage/Server/glibc-common-2.5-107.i386.rpm
...
cd ${Adagent_Path}/kerberos/lib64 || log 2 "error, directory ${Adagent_Path}/kerberos/lib64 doesn't exist."
found match in file ./install/rpms/common/src/CSCOcpm-common_postinstall.sh


	33.3
```
