---
type: reference
title: "FAQ, troubleshooting"
description: Section 9 of the legacy KB_perl notes.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#9"
---

# FAQ, troubleshooting

[↑ KB_perl](/perl/kb-perl/README.md)

## 9.1 system

### 9.1.1 sh: line 1: ... Permission denied

```text
ex:
Executing: cleartool lsact -long <user>_CSCum97393Found file     <internal-path> version 10, run diff vs. 0 
cleartool diff -diff <internal-path>
sh: line 1: <internal-path>: Permission denied

code: system  "cleartool diff -diff $curr_ver $base_ver \n";
reason: rouge \n in $curr_ver -> 2 lines are passed to sh -c instead of just one.
fix: chomp $curr_ver 
also use system(cmd, arg1, arg2...); safer format.
```

## 9.2 Files

### 9.2.1 Get file last modification time

```text
You can use the built-in module File::stat (included as of Perl 5.004).

Calling stat($fh) returns an array with the following information about the file handle passed in (from the perlfunc man page for stat):

  0 dev      device number of filesystem
  1 ino      inode number
  2 mode     file mode  (type and permissions)
  3 nlink    number of (hard) links to the file
  4 uid      numeric user ID of file's owner
  5 gid      numeric group ID of file's owner
  6 rdev     the device identifier (special files only)
  7 size     total size of file, in bytes
  8 atime    last access time since the epoch
  9 mtime    last modify time since the epoch
 10 ctime    inode change time (NOT creation time!) since the epoch
 11 blksize  preferred block size for file system I/O
 12 blocks   actual number of blocks allocated

The 9th element in this array will give you the last modified time since the epoch (00:00 January 1, 1970 GMT). From that you can determine the local time:

my $epoch_timestamp = (stat($fh))[9];
my $timestamp       = localtime($epoch_timestamp);

To avoid the magic number 9 needed in the previous example, additionally use Time::localtime, another built-in module (also included as of Perl 5.004). This requires some (arguably) more legible code:

use File::stat;
use Time::localtime;
my $timestamp = ctime(stat($fh)->mtime);


		9.2.2

	9.3
```
