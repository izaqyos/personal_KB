---
type: reference
title: Sed
description: "Sed recipes: replacing strings across files, command files and removing blank lines."
tags: [sed, unix, one-liners, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#3"
---

# Sed

[↑ unix-kb](/kb-unix/README.md)

## 3.1 use sed to replace every occurence of : with a space.

```text
		3.1.1 $ ps -ef | grep <user> | awk '{print $8}' | sed 's/\:/ /g'
```

### 3.1.2 to run a sed command file do

```text
			$ sed -f <sed_commands_file_name>
		3.1.3 to append a text to every line that contains string "mapped" create a command file:
			/mapped/i\
			hello
		3.1.4 to change a configuration param from yes to no create a command file:
			/scheduler.memory_mapped_file = yes/c\
			scheduler.memory_mapped_file = no
```

### 3.1.5 All the files the contain String include change to nystring include

```text
		grep "infra/comp/String" *.cc | sed 's/infra\/comp\/String.h/infra\/comp\/nystring.h/g' `nawk -F\: '{print $1}'` > ! ~/out
```

### 3.1.6 make a comand file that contains command <file name> lines. example:

```text
	find . -name "*.h" -exec echo /users/<user>/scripts/change_includes/change_includes_for_kern_split_to_addr '{}' \; | sed -e 's/\.\// /'

		This will remove the ./ prefix that find attaches to the file name.
```

### 3.1.7 use sed to remove all blank lines in file

```text
			cat file | sed \/\^\$\/d >> file
```
