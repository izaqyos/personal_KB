---
type: reference
title: "rm, delete files"
description: Section 42 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#42"
---

# rm, delete files

[↑ KB_Linux](/linux/kb-linux/README.md)

## 42.1 rm -fr

```text
-f force delete
-r recursive

    42.2 Delete All Files in a Directory Except One or Few Files with Extensions
```

### 42.2.1 background

```text
https://www.tecmint.com/delete-all-files-in-directory-except-one-few-file-extensions/
first, wildcards
* – matches zero or more characters
? – matches any single character
[seq] – matches any character in seq
[!seq] – matches any character not in seq

extended pattern matching operators are listed below, where pattern-list is a list containing one or more filenames, separated using the | character:

*(pattern-list) – matches zero or more occurrences of the specified patterns
?(pattern-list) – matches zero or one occurrence of the specified patterns
+(pattern-list) – matches one or more occurrences of the specified patterns
@(pattern-list) – matches one of the specified patterns
!(pattern-list) – matches anything except one of the given patterns

To use:
shopt -s extglob

add to .profile/.bashrc etc

        42.2.2 To delete all files in a directory except filename, type the command below:
$ rm -v !("filename")
```

### 42.2.3 To delete all files with the exception of filename1 and filename2:

```text
$ rm -v !("filename1"|"filename2") 

        42.2.4 The example below shows how to remove all files other than all .zip files interactively:
$ rm -i !(*.zip)

        42.2.5 delete all files in a directory apart from all .zip and .odt files as follows, while displaying what is being done:
$ rm -v !(*.zip|*.odt)
```

### 42.2.6 Delete Files Using Linux find Command

```text
Under this method, we can use find command exclusively with appropriate options or in conjunction with xargs command by employing a pipeline as in the forms below:

Under this method, we can use find command exclusively with appropriate options or in conjunction with xargs command by employing a pipeline as in the forms below:

$ find /directory/ -type f -not -name 'PATTERN' -delete
$ find /directory/ -type f -not -name 'PATTERN' -print0 | xargs -0 -I {} rm {}
$ find /directory/ -type f -not -name 'PATTERN' -print0 | xargs -0 -I {} rm [options] {}

            42.2.6.1 The following command will delete all files apart from .gz files in the current directory:
$ find . -type f -not -name '*.gz'-delete

            42.2.6.2 Using a pipeline and xargs, you can modify the case above as follows:
$ find . -type f -not -name '*gz' -print0 | xargs -0  -I {} rm -v {}

            42.2.6.3 wipe out all files excluding .gz, .odt, and .jpg files in the current directory:
$ find . -type f -not \(-name '*gz' -or -name '*odt' -or -name '*.jpg' \) -delete

            42.2.6.4
```

### 42.2.7 Delete Files Using Bash GLOBIGNORE Variable

```text
To employ this method, move into the directory that you wish to clean up, then set the GLOBIGNORE variable as follows:

$ cd test
$ GLOBIGNORE=*.odt:*.iso:*.txt
In this instance, all files other than .odt, .iso, and .txt files with be removed from the current directory.

Now run the command to clean up the directory:

$ rm -v *
Afterwards, turn off GLOBIGNORE variable:

$ unset GLOBIGNORE

        42.2.8
    42.3
```
