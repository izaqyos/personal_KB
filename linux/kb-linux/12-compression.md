---
type: reference
title: Compression
description: Section 12 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#12"
---

# Compression

[↑ KB_Linux](/linux/kb-linux/README.md)

## 12.1 TAR

### 12.1.1 Basics

```text
		To create a GNU Tar file
```

#### 12.1.1.1 Creates a GZIP-compressed Tar file

```text
			named eglinux.tar.gz of all files with a .txt suffix:

tar -czvf eglinux.tar.gz *.txt

c for create
z for gzip compression
v is for verbose messages
f for adding all files
```

#### 12.1.1.2 To list files in a compressed Tar file

```text
tar -tzf eglinux.tar.gz
```

#### 12.1.1.3 To extract files from a Tar file

```text
Extracts all files from a compressed Tar file named eglinux.tar.gz.

tar -xvf eglinux.tar.gz

Extracts to a specific folder:

tar -xvf eglinux.tar.gz -C ~/des

Other versions of Tar may require the -z option to specify the compression type.
```

#### 12.1.1.4 Use bzip2 compression

```text
Create archive:
$ tar cjf foo.tar.bz2 foo/

Extract archive:
$ tar xjf foo.tar.bz2
```

### 12.1.2 Exclude or Include files

#### 12.1.2.1 How to exclude/include

```text
On some systems, make creates filenames starting with a comma (,) to keep track of dependencies. Various editors create backup files whose names end with a percent sign (%) or a tilde (~). I often keep the original copy of a program with the .orig extension and old versions with a .old extension.
Click Here

I often don't want to save these files on my backups. There may be some binary files that I don't want to archive, but don't want to delete either.

A solution is to use the X flag to tar. [Check your tar manual page for the F and FF options, too. - JIK ] This flag specifies that the matching argument to tar is the name of a file that lists files to exclude from the archive. Here is an example:


% find project ! -type d -print | \
egrep '/,|%$|~$|\.old$|SCCS|/core$|\.o$|\.orig$' > Exclude
% tar cvfX project.tar Exclude project

In this example, find lists all files in the directories, but does not print the directory names explicitly. If you have a directory name in an excluded list, it will also exclude all the files inside the directory. egrep is then used as a filter to exclude certain files from the archive. Here, egrep is given several regular expressions to match certain files. This expression seems complex but is simple once you understand a few special characters:

A breakdown of the patterns and examples of the files that match these patterns is given here:

Instead of specifying which files are to be excluded, you can specify which files to archive using the - I option. As with the exclude flag, specifying a directory tells tar to include (or exclude) the entire directory. You should also note that the syntax of the - I option is different from the typical tar flag. The next example archives all C files and makefiles. It uses egrep's () grouping operators to make the $ anchor character apply to all patterns inside the parentheses:


% find project -type f -print | \
egrep '(\.[ch]|[Mm]akefile)$' > Include
% tar cvf project.tar -I Include

I suggest using find to create the include or exclude file. You can edit it afterward, if you wish. One caution: extra spaces at the end of any line will cause that file to be ignored.

One way to debug the output of the find command is to use /dev/null as the output file:


% tar cvfX /dev/null Exclude project

Including Other Directories

There are times when you want to make an archive of several directories. You may want to archive a source directory and another directory like /usr/local. The natural, but wrong, way to do this is to use the command:


% tar cvf /dev/rmt8 project /usr/local
```

#### 12.1.2.2 Example, create a backup of ACS project, exclude non source code files

```text
find acs ! -type d -print |  egrep '/\.so.*$|\.a$|\.jar$|\.o$|\.d|lib' > Exclude

And

$  tar cvfzX acs.tar.bz2 Exclude acs/

Or a simpler way, create a read only view (no objects and lib files) and compress it:
$cd /cygdrive/c/views/snapshot/<internal-path>/<internal-path>
$ tar cjf acs_5_0_FCS.tar.bz2 acs
```
