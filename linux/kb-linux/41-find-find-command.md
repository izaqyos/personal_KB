---
type: reference
title: "find, find command"
description: Section 41 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#41"
---

# find, find command,

[↑ KB_Linux](/linux/kb-linux/README.md)

## 41.1 find cheatsheet

```text
|       The Find command cheat sheet
|       
|       The Find Command Cheat Sheet
|       
|       1. Basic find command
|       # find -name "TestFile"
|       
|       2. Find Files Using Name and Ignoring Case
|       # find -iname "TestFile"
|       
|       3. Limit Search To Specific Directory Level Using mindepth and maxdepth
|       # find / -maxdepth 3 -name passwd
|       -maxdepth --> will go 3 directories below -- / 1st; /etc 2nd; /usr/bin 3rd
|       
|       # find / -mindepth 3 -maxdepth 5 -name passwd
|       will go 3 depths first and upto 5 -- so will not disply under /; /usr; /usr/bin
|       
|       4. Executing Commands on the Files Found by the Find Command.
|       user -exec {} /;
|       # find -iname "TestFile" -exec md5sum {} \;
|       
|       5. Inverting the match.
|       To inver the match use the "-not" switch
|       # find / -not -iname "TestFile"
|       
|       6. List inodes of the files
|       # ls -i1 test*
|       16187429 test-file-name
|       16187430 test-file-name
|       
|       # find -inum 16187430 -exec mv {} new-test-file-name \;
|       # ls -i1 *test*
|       16187430 new-test-file-name
|       16187429 test-file-name
|       
|       7. Find file based on the File-Permissions
|       You can :
|           * Find files that match exact permission
|           * Check whether the given permission matches, irrespective of other permission bits
|           * Search by giving octal / symbolic representation
|       
|       # find . -perm -g=r -type f -exec ls -l {} \;
|       Will display all files with group permission read. Not files with readonly group permission
|       
|       # find . -perm g=r -type f -exec ls -l {} \;
|       Will dispay files with 040 permission. i.e files with group read only permisison
|       
|       # find . -perm 040 -type f -exec ls -l {} \;
|       Will dispay files with 040 permission. i.e files with group read only permisison
|       
|       
|       8. Find all empty files (zero byte file) in your home directory and its subdirectory
|       # find ~ -empty
|       
|       Need to check diff
|       # find . -empty -not -name "test" -- name not equal to test
|       # find . -not -empty -name ".*"   -- no empty files
|       
|       9. Finding the Top 5 Big Files
|       # find /var -type f -exec ls -s {} \; | sort -n -r | head -5
|       
|       # find /var -type f -size +10M -exec ls -lh {} \;  
|       
|       10. Finding the Top 5 Small Files
|       # find /var -type f -exec ls -s {} \; | sort -n | head -5
|       This will most probably list zero byte files or empty files!!!  
|       
|       So to list the smaller files other than the ZERO byte files.
|       # find /var -not -empty -type f -exec ls -s {} \; | sort -n | head -5
|       
|       11. Find Files by Size
|       use the -size switch -- + for greater than; - for lesser than
|       Find files bigger than the given size
|       # find / -size +100M
|       
|       Find files smaller than the given size
|       # find / -size -100M
|       
|       Find files that matches the exact given size
|       # find / -size 100M
|       
|       Note: – means less than the give size, + means more than the given size, and no symbol means exact given size.
|       
|       12. Find files based on file types
|       use -type switch
|       
|       Find only the socket files.
|       # find . -type s
|       
|       Find all directories
|       # find . -type d
|       
|       Find only the normal files
|       # find . -type f
|       
|       Find all the hidden files
|       # find . -type f -name ".*"
|       Find all the hidden directories
|       # find -type d -name ".*"
|       
|       13. Creaing aliases:
|       use the alias command
|       # alias lslarge="find /var -type f -size +10M -exec ls -lh {} \;"
|       # lslarge -- will display greater than 10MB files in /var
|       
|       14. Find Files Based on Access / Modification / Change Time
|       
|       You can find files based on following three file time attribute.
|          1. Modification time of the file. Modification time gets updated when the file content modified. 
|          2. Access time of the file. Access time gets updated when the file accessed.
|          3. Change time of the file. Change time gets updated when the inode data changes.
|       
|       # min argument treats its argument as minutes. For example, min 60 = 60 minutes (1 hour).
|       # time argument treats its argument as 24 hours. For example, time 2 = 2*24 hours (2 days)
|       
|           * -mmin n File’s data was last modified n minutes ago.
|           * -mtime n File’s data was last modified n*24 hours ago.
|       
|           * -amin n File was last accessed n minutes ago
|           * -atime n File was last accessed n*24 hours ago
|       
|           * -cmin n File’s status was last changed n minutes ago. inode change
|           * -ctime n File’s status was last changed n*24 hours ago.
|       
|       14. Find files whose content got updated/Modified within last 1 hour/1Day
|       # find . -mmin -60  -- 
|       # find / -mtime -1 -- finds all the files (under root file system /) that got updated within the last 24 hours (1 day)
|       
|       15. Find files which got accessed before 1 hour/1Day
|       # find -amin -60  -- find files in the current directory and sub-directories, which got accessed within last 1 hour (60 minutes)
|       # find / -atime -1 --
|       
|       16. Find files which got changed exactly before 1 hour/1day :: inode change
|       # find . -cmin -60 --
|       # find / -ctime -1 -- finds all the files (under root file system /) that got changed within the last 24 hours (1 day).
|       
|       17. Restricting the search only to unhidden files.
|       # find . -mmin -15 \( ! -regex ".*/\..*" \)
|       Refer the regex statement
|       
|       18. Find files modified/accessed/changed after modifying a refrence file
|       Syntax: # find -newer FILE
|       
|       # find -newer /etc/passwd   -- Modified after 
|       # find -anewer /etc/hosts     -- Accessed after 
|       # find -cnewer /etc/fstab      -- Changed after
|       
|       19. Searching Only in the Current Filesystem
|       use -xdev switch -- Don’t descend directories on other filesystems.
|       
|       # find / -xdev -name "*.log"
|       Will search only /, not other mount points mounted under /.
|       
|       # find / -name "*.log"
|       This will search all FS starting from /.
|       
|       20. Using more than one { } in same command
|       # find -name "*.txt" cp {} {}.bkup \;
|       
|       21. Redirecting errors to /dev/null
|       # find -name "*.txt" 2>>/dev/null
|       
|       22. Substitute space with underscore in the file name.
|       # find . -type f -iname “*.mp3″ -exec mv “s/ /_/g” {} \;
```

## 41.2 My useful find commands

### 41.2.1 find recent files - newer than 1 hour / 1 day

```text
find . -mmin -60 -type f
find . -mtime -1 -type f
```

### 41.2.2 exclude directory

```text
        ignode node_modules dir:
find . -path ./node_modules -prune -o  -type d

        41.2.3
    41.3
```
