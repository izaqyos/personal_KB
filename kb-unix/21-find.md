---
type: reference
title: Find
description: Section 20 of the legacy unix-kb notes.
tags: [kb-unix]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#20"
---

# Find

[↑ unix-kb](/kb-unix/README.md)

```text
The find command (taken from http://dmiessler.com/study/find/)

find is one of the most useful Linux/Unix tools around, but most people use only a fraction of its power. Many Linux/Unix questions seen online can be solved using the find command alone; it's simply a matter of becoming familiar with its options.

    The power of find lets you do anything from finding all your .jpg files to seeing "all of Michael's files that have the execute bit set and have been modified since yesterday." When combined with xargs, a properly wielded find command can make many common tasks ten times easier.
```

## 20.1 Find Basics

```text
Let's start simple and get progressively more advanced. To begin with we'll look at finding things by name. Remember that the first argument you give find is where to look.
Find all files with something in their name:
find . -name "*.jpg"

...
./Pictures/iPhoto Library/Data/2006/Roll 20/00697_bluewaters_1440x900.jpg
./Pictures/iPhoto Library/Data/2006/Roll 20/00705_cloudyday_1440x900.jpg
./Pictures/iPhoto Library/Data/2006/Roll 20/00710_fragile_1600x1200.jpg
./Pictures/iPhoto Library/Data/2006/Roll 20/00713_coolemoticon_1440x900.jpg
./Pictures/iPhoto Library/Data/2006/Roll 20/00714_cloudyday_1440x900.jpg
...

Note that by default when you give a location to start from (in our case "."), the find command starts there and drills all the way down during its search. So in this case I started from my home directory and it found the files all the way down in "~/Pictures/iPhoto Library/Data/2006/Roll 20" as well.

[ Placing quotes around the search criteria avoids issues with wildcard characters and is probably a good habit to get into. You can also use -iname instead of -name; it's the same but it's case insensitive ]
Find all files that belong to a certain user:
find . -user daniel

...
./Music/iTunes/iTunes Music/Tool/Undertow/01 Intolerance.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/02 Prison Sex.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/03 Sober.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/04 Bottom.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/05 Crawl Away.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/06 Swamp Song.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/07 Undertow.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/08 4 Degrees.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/09 Flood.m4a
./Music/iTunes/iTunes Music/Tool/Undertow/69 Disgustipated.m4a
...

[ Also works for groups (-group) ]
Find only directories, regular files, links, or sockets:
find . -type d

...
./Development/envelope
./Development/mhp
./Development/mservers
./Development/mservers/fortune100
./Development/mst
./Development/mst/nmap
./Development/mst/services
...

Those are all directories, and to look for the others (files, links, or sockets), just substitute f, l, s for the d in the command above.
Find files that are over a gigabyte in size
find ~/Movies -size +1024M

...
/Movies/Comedy/Funny.mpg
/Movies/Drama/Sad.mpg
...
```

## 20.2 Combining Arguments

```text
You can also combine arguments using and, or, and not. By default if you use two different arguments you're and'ing them. If you want to use or you give the -o option, and if you want to get everything except something, you use the ! option.
Find only regular files, owned by daniel, that are also jpg images
find . -user daniel -type f -name *.jpg

...
./Pictures/iPhoto Library/autumn_woods.jpg
./Pictures/iPhoto Library/blue_forest.jpg
./Pictures/iPhoto Library/brothers.jpg
...

Now do the same, but exclude anything named autumn
find . -user daniel -type f -name *.jpg ! -name autumn*

...
./Pictures/iPhoto Library/blue_forest.jpg
./Pictures/iPhoto Library/brothers.jpg
...
```

## 20.3 Forensics

```text
find also has a number of options that help one answer forensics-oriented questions such as when a file was last changed or what files have had their permissions modified recently.
Find all files in /etc owned by root that have been modified within the last day
find /etc -user root -mtime -1

...
/etc/passwd
...

The checks you can use here are:

    * -atime: when the file was last accessed
    * -ctime: when the file's permissions were last changed
    * -mtime: when the file's data was last modified

These searches are done in 24 hour increments and followed by a number n. If you want to match the exact 24 hour period you use n by itself. More frequently, however, you'll want to say everything since yesterday, or everything "more than 3 days ago." This is accomplished using the -n and +n options respectively.

There are also minute versions of the atime, ctime, and mtime arguments:

    * -amin: when (in minutes) the file was last accessed
    * -cmin: when (in minutes) the file's permissions were last changed
    * -mmin: when (in minutes) the file's data was last modified

Show me all files in /etc owned by root that have been accessed within the last two minutes
find /etc -user root -amin -2

...
/etc/hosts
/etc/resolv.conf
...

A list of a few other forensics-oriented options:

    * -nouser: shows output that's not associated with an existing userid
    * -nogroup: shows output not associated with an existing groupid
    * -links n: file has n links
    * -newer file: file was modified more recently than file.
    * -perm mode: file has mode permissions.

Show me all files in ~ with wide open permissions
find ~ -perm 777

...
~/testfile.txt
~/lab.rtf
...
```

## 20.4 Combining find With xargs

```text
This is the piece that we've been leading up to -- performing an action on the stuff that we find with find. So while it's interesting to say, "Show me this stuff", it's far more useful to say, "Take every text file owned by Jason that's hasn't been accessed in 60 days and move it to the backup folder."

Cookbook Examples Of find in action

[ Be sure to test these on your system before using them for important files ]
Find all files on your system that are world writable. The 0002 denotes a 2 in the "other" field in the file permissions, which is the write bit
find / -perm -0002

Collect files that are not owned by valid users and delete them
find / -nouser -print0 | xargs -0 rm

Clean the images off of your *nix desktop
find ~/Desktop -name "*.jpg" -o -name "*.gif" -o -name "*.png" -print0 | xargs -0 mv --target-directory ~/Pictures

[ The -print0 option terminates results with a null character instead of the default newline, making it cleaner and less likely to balk in many cases ]
Correct the permissions on your web directory
find /your/webdir/ -type d -print0 | xargs -0 chmod 755
find /your/webdir -type f | xargs chmod 644

Show a list of files in /etc that have been modified since last month
find /etc -mtime -30
```

## 20.5 Find reference

### 20.5.1 Find searchable types

```text
       -type c
	      File is of type c:

	      b      block (buffered) special

	      c      character (unbuffered) special

	      d      directory

	      p      named pipe (FIFO)

	      f      regular file

	      l      symbolic link; this is never true if the -L option or the
		     -follow  option is in effect, unless the symbolic link is
		     broken.  If you want to search for symbolic links when -L
		     is in effect, use -xtype.

	      s      socket

	      D      door (Solaris)

		20.5.2
```

## 20.6 A Final Thought

```text
There is a bit of a debate in some circles about using xargs vs. the -exec option that's built into find itself. To me, however, it's not much of a debate; -exec isn't nearly as good as xargs for what I use find for. I tend to use it to do big jobs involving many files. "Move all these files there", "copy all those directories there", "Delete these links.", etc.

    This is where -exec breaks down and xargs stands up. Whe you use -exec you run a seperate instance of the called program for each input. With xargs, you build up the input into bundles and run them through the called command as few times as possible, which is usually just once. When dealing with hundreds or thousands of elements this is a big win for xargs.

Don't believe me? Well, let's run some numbers. Below is a listing of 5,310 .jpg files on my OS X system using both -exec and xargs:
time find . -name "*.jpg" -exec ls {} \;

real    0m23.548s
user    0m3.913s
sys     0m15.167s

Hmm, that's not bad. 23 seconds for over five thousand files, right? Let's try it with xargs.
time find . -name "*.jpg" -print0 | xargs -0 ls

real    0m1.526s
user    0m0.667s
sys     0m0.864s

That's 2 seconds vs 24 seconds. Seriously; find and xargs is the combination you want to use.
```

## 20.7 Combos

### 20.7.1 find + tar + for loop

```text
Ex: create a tarball of all xml files in dirs that are enumarated by find
a. create the archive, empty or with one element
$ tar cvf rt_ut_reports_07_10_10.tar ./runtime/infrastructure/configManager/test/cppunit-reports/test-ConfigManager.xml

b. use the combo to add all the xml files:
$ for dir in `find . -name 'cppunit-reports'` ; do tar rvf rt_ut_reports_07_10_10.tar $dir/*.xml ; done

list content:
$ for dir in `find . -name 'cppunit-reports'` ; do echo "UT report for $dir"; cat  $dir/*.xml ; done > rt_ut_report_xml 
```

## 20.8 Examples

```text
Find all filew newer than 2 days:
$ find -type f -mtime -2
./ACS/kb_acs_5_3
./ACS/kb_acs_5_4
./awk/kb_awk
./iPhoneKB
./linux/KB_Linux
```
