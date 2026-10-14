---
type: reference
title: tar
description: "tar command tutorial: creating, extracting and listing archives."
tags: [unix, linux, tutorial, cheatsheet, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#27"
---

# tar

[↑ unix-kb](/kb-unix/README.md)

## 27.1 The Ultimate Tar Command Tutorial with 10 Practical Examples

```text
On Unix platform, tar command is the primary archiving utility. Understanding various tar command options will help you master the archive file manipulation.

In this article, let us review various tar examples including how to create tar archives (with gzip and bzip compression), extract a single file or directory, view tar archive contents, validate the integrity of tar archives, finding out the difference between tar archive and file system, estimate the size of the tar archives before creating it etc.,
```

### 27.1.1 Creating an archive using tar command

```text
Creating an uncompressed tar archive using option cvf

This is the basic command to create a tar archive.

$ tar cvf archive_name.tar dirname/

In the above command:

    c â create a new archive
    v â verbosely list files which are processed.
    f â following is the archive file name

Creating a tar gzipped archive using option cvzf

The above tar cvf option, does not provide any compression. To use a gzip compression on the tar archive, use the z option as shown below.

$ tar cvzf archive_name.tar.gz dirname/

    z â filter the archive through gzip

Note: .tgz is same as .tar.gz

Note: I like to keep the âcvfâ (or tvf, or xvf) option unchanged for all archive creation (or view, or extract) and add additional option at the end, which is easier to remember. i.e cvf for archive creation, cvfz for compressed gzip archive creation, cvfj for compressed bzip2 archive creation etc., For this method to work properly, donât give â in front of the options.
Creating a bzipped tar archive using option cvjf

Create a bzip2 tar archive as shown below:

$ tar cvfj archive_name.tar.bz2 dirname/

    j â filter the archive through bzip2

gzip vs bzip2: bzip2 takes more time to compress and decompress than gzip. bzip2 archival size is less than gzip.

Note: .tbz and .tb2 is same as .tar.bz2
```

### 27.1.2 Extracting (untar) an archive using tar command

```text
Extract a *.tar file using option xvf

Extract a tar file using option x as shown below:

$ tar xvf archive_name.tar

    x â extract files from archive

Extract a gzipped tar archive ( *.tar.gz ) using option xvzf

Use the option z for uncompressing a gzip tar archive.

$ tar xvfz archive_name.tar.gz

Extracting a bzipped tar archive ( *.tar.bz2 ) using option xvjf

Use the option j for uncompressing a bzip2 tar archive.

$ tar xvfj archive_name.tar.bz2

Note: In all the above commands v is optional, which lists the file being processed.
```

### 27.1.3 Listing an archive using tar command

```text
View the tar archive file content without extracting using option tvf

You can view the *.tar file content before extracting as shown below.

$ tar tvf archive_name.tar

View the *.tar.gz file content without extracting using option tvzf

You can view the *.tar.gz file content before extracting as shown below.

$ tar tvfz archive_name.tar.gz

View the *.tar.bz2 file content without extracting using option tvjf

You can view the *.tar.bz2 file content before extracting as shown below.

$ tar tvfj archive_name.tar.bz2
```

### 27.1.4 Listing out the tar file content with less command

```text
When the number of files in an archive is more, you may pipe the output of tar to less. But, you can also use less command directly to view the tar archive output, as explained in one of our previous article Open & View 10 Different File Types with Linux Less Command â The Ultimate Power of Less.
```

### 27.1.5 Extract a single file from tar, tar.gz, tar.bz2 file

```text
To extract a specific file from a tar archive, specify the file name at the end of the tar xvf command as shown below. The following command extracts only a specific file from a large tar file.

$ tar xvf archive_file.tar /path/to/file

Use the relevant option z or j according to the compression method gzip or bzip2 respectively as shown below.

$ tar xvfz archive_file.tar.gz /path/to/file

$ tar xvfj archive_file.tar.bz2 /path/to/file
```

### 27.1.6 Extract a single directory from tar, tar.gz, tar.bz2 file

```text
To extract a single directory (along with itâs subdirectory and files) from a tar archive, specify the directory name at the end of the tar xvf command as shown below. The following extracts only a specific directory from a large tar file.

$ tar xvf archive_file.tar /path/to/dir/

To extract multiple directories from a tar archive, specify those individual directory names at the end of the tar xvf command as shown below.

$ tar xvf archive_file.tar /path/to/dir1/ /path/to/dir2/

Use the relevant option z or j according to the compression method gzip or bzip2 respectively as shown below.

$ tar xvfz archive_file.tar.gz /path/to/dir/

$ tar xvfj archive_file.tar.bz2 /path/to/dir/
```

### 27.1.7 Extract group of files from tar, tar.gz, tar.bz2 archives using regular expression

```text
You can specify a regex, to extract files matching a specified pattern. For example, following tar command extracts all the files with pl extension.

$ tar xvf archive_file.tar --wildcards '*.pl'

Options explanation:

    âwildcards *.pl â files with pl extension
```

### 27.1.8 Adding a file or directory to an existing archive using option -r

```text
You can add additional files to an existing tar archive as shown below. For example, to append a file to *.tar file do the following:

$ tar rvf archive_name.tar newfile

This newfile will be added to the existing archive_name.tar. Adding a directory to the tar is also similar,

$ tar rvf archive_name.tar newdir/

Note: You cannot add file or directory to a compressed archive. If you try to do so, you will get âtar: Cannot update compressed archivesâ error as shown below.

$ tar rvfz archive_name.tgz newfile
tar: Cannot update compressed archives
Try `tar --help' or `tar --usage' for more information.
```

### 27.1.9 Verify files available in tar using option -W

```text
As part of creating a tar file, you can verify the archive file that got created using the option W as shown below.

$ tar cvfW file_name.tar dir/

If you are planning to remove a directory/file from an archive file or from the file system, you might want to verify the archive file before doing it as shown below.

$ tar tvfW file_name.tar
Verify 1/file1
1/file1: Mod time differs
1/file1: Size differs
Verify 1/file2
Verify 1/file3

If an output line starts with Verify, and there is no differs line then the file/directory is Ok. If not, you should investigate the issue.

Note: for a compressed archive file ( *.tar.gz, *.tar.bz2 ) you cannot do the verification.

Finding the difference between an archive and file system can be done even for a compressed archive. It also shows the same output as above excluding the lines with Verify.

Finding the difference between gzip archive file and file system

$ tar dfz file_name.tgz

Finding the difference between bzip2 archive file and file system

$ tar dfj file_name.tar.bz2
```

### 27.1.10 Estimate the tar archive size

```text
The following command, estimates the tar file size ( in KB ) before you create the tar file.

$ tar -cf - /directory/to/archive/ | wc -c
20480

The following command, estimates the compressed tar file size ( in KB ) before you create the tar.gz, tar.bz2 files.

$ tar -czf - /directory/to/archive/ | wc -c
508

$ tar -cjf - /directory/to/archive/ | wc -c
428
```

## 27.2 Check the total content size of a tar gz file

```text
$ gzip -l compressed.tar.gz
     compressed        uncompressed  ratio uncompressed_name
            132               10240  99.1% compressed.tar
```

## 27.3 List files of bzip2 compressed tar

```text
 tar -tjvf  /cygdrive/c/TEMP/backups/yosi_backup_06_1117.tar.bz2 

	27.4
```
