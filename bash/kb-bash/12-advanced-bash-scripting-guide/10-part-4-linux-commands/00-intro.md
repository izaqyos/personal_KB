---
type: reference
title: Part 4. Linux Commands — intro
description: ABS Guide part 4 intro on Linux commands for shell scripting.
tags: [bash, shell, legacy, book-notes, linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "bash/KB_bash#12.11/intro"
---

# Intro

> **Deprecated (2026-10):** Book copy. Current: systemctl. Source: <https://man7.org/linux/man-pages/man1/systemctl.1.html>

[↑ Part 4. Linux Commands](/bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/README.md)

```text
Mastering the commands on your Linux machine is an indispensable prelude to writing effective shell scripts.

This section covers the following commands:

    * . (See also source), execute a text file is if all its lines were bash instructions

    * ac Show users' logged in time, as read from /var/log/wtmp. This is one of the GNU accounting utilities.
bash$ ac
        total       68.08

    * adduser
useradd, userdel

    The useradd administrative command adds a user account to the system and creates a home directory for that particular user, if so specified. The corresponding userdel command removes a user account from the system [2] and deletes associated files.

    Note	The adduser command is a synonym for useradd and is usually a symbolic link to it.

    * agetty
    getty, agetty 
    The initialization process for a terminal uses getty or agetty to set it up for login by a user. These commands are not used within user shell scripts. Their scripting counterpart is stty.

    * agrep
agrep (approximate grep) extends the capabilities of grep to approximate matching. The search string may differ by a specified number of characters from the resulting matches. This utility is not part of the core Linux distribution.

Tip	

To search compressed files, use zgrep, zegrep, or zfgrep. These also work on non-compressed files, though slower than plain grep, egrep, fgrep. They are handy for searching through a mixed set of files, some compressed, some not.

To search bzipped files, use bzgrep.

    * ar
    Creation and manipulation utility for archives, mainly used for binary object file libraries.

    * arch
Show system architecture. Equivalent to uname -m. See Example 10-26.

bash$ arch
i686

bash$ uname -m
i686

    * at
The at job control command executes a given set of commands at a specified time. Superficially, it resembles cron, however, at is chiefly useful for one-time execution of a command set.

at 2pm January 15 prompts for a set of commands to execute at that time. These commands should be shell-script compatible, since, for all practical purposes, the user is typing in an executable shell script a line at a time. Input terminates with a Ctl-D.

Using either the -f option or input redirection (<), at reads a command list from a file. This file is an executable shell script, though it should, of course, be non-interactive. Particularly clever is including the run-parts command in the file to execute a different set of scripts.

bash$ at 2:30 am Friday < at-jobs.list
job 2 at 2000-10-27 02:30
	      
$ at 19:37
at> echo "hi Yosi"
at> <EOT>
job 1 at 2008-07-22 19:37

    * autoload
This is a port to Bash of the ksh autoloader. With autoload in place, a function with an autoload declaration will load from an external file at its first invocation.

    * awk (See also Using awk for math operations)
Awk is a full-featured text processing language with a syntax reminiscent of C. While it possesses an extensive set of operators and capabilities, we will cover only a few of these here - the ones most useful in shell scripts.
see kb_awk for full details

    * badblocks
    Checks for bad blocks (physical media flaws) on a storage device. This command finds use when formatting a newly installed hard drive or testing the integrity of backup media. [4]  As an example, badblocks /dev/fd0  tests a floppy disk.

    The badblocks command may be invoked destructively (overwrite all data) or in non-destructive read-only mode. If root user owns the device to be tested, as is generally the case, then root must invoke this command.

    * banner
    Prints arguments as a large vertical banner to stdout, using an ASCII character (default '#'). This may be redirected to a printer for hardcopy.

    Note that banner has been dropped from many Linux distros.

    * basename
Strips the path information from a file name, printing only the file name. The construction basename $0 lets the script know its name, that is, the name it was invoked by. This can be used for "usage" messages if, for example a script is called with missing arguments:

echo "Usage: `basename $0` arg1 arg2 ... argn"

    * batch
    The batch job control command is similar to at, but it runs a command list when the system load drops below .8. Like at, it can read commands from a file with the -f option.

    * bc
    Bash can't handle floating point calculations, and it lacks operators for certain important mathematical functions. Fortunately, bc comes to the rescue.

Not just a versatile, arbitrary precision calculation utility, bc offers many of the facilities of a programming language.

bc has a syntax vaguely resembling C.

Example, as calculator:
$ bc
bc 1.06
Copyright 1991-1994, 1997, 1998, 2000 Free Software Foundation, Inc.
This is free software with ABSOLUTELY NO WARRANTY.
For details type `warranty'. 
time = 20
users = 20000
tps = users/time
print tps
1000

Example, as piped calculator:
$ echo "50+20" | bc
70


    * bg
    The fg command switches a job running in the background into the foreground. The bg command restarts a suspended job, and runs it in the background. If no job number is specified, then the fg or bg  command acts upon the currently running job.

    * bind

    The bind builtin displays or modifies readline key bindings.
Example:
$ bind -v
set bind-tty-special-chars on

    * bison
    The lex lexical analyzer produces programs for pattern matching. This has been replaced by the nonproprietary flex on Linux systems.

The yacc utility creates a parser based on a set of specifications. This has been replaced by the nonproprietary bison on Linux systems.


    * builtin
    Invoking builtin BUILTIN_COMMAND runs the command BUILTIN_COMMAND as a shell builtin, temporarily disabling both functions and external system commands with the same name.

    * bzgrep
    To search bzipped  files, use bzgrep.

    * bzip2
    An alternate compression utility, usually more efficient (but slower) than gzip, especially on large files. The corresponding decompression command is bunzip2.

Note	Newer versions of tar have been patched with bzip2 support.

    * cal
Prints a neatly formatted monthly calendar to stdout. Will do current year or a large range of past and future years.

    * caller
    Putting a caller command inside a function  echoes to stdout information about the caller of that function.

    #!/bin/bash

    function1 ()
    {
      # Inside function1 ().
      caller 0   # Tell me about it.
    }

    function1    # Line 9 of script.

    # 9 main test.sh
    # ^                 Line number that the function was called from.
    #   ^^^^            Invoked from "main" part of script.
    #        ^^^^^^^    Name of calling script.

    caller 0     # Has no effect because it's not inside a function.

    A caller command can also return caller information from a script sourced within another script. Analogous to a function, this is a "subroutine call."

    You may find this command useful in debugging.


    * cat
cat, tac

    cat, an acronym for concatenate, lists a file to stdout. When combined with redirection (> or >>), it is commonly used to concatenate files.

    # Uses of 'cat'
    cat filename                          # Lists the file.

    cat file.1 file.2 file.3 > file.123   # Combines three files into one.

    The -n option to cat inserts consecutive numbers before all lines of the target file(s). The -b option numbers only the non-blank lines. The -v option echoes nonprintable characters, using ^ notation. The -s option squeezes multiple consecutive blank lines into a single blank line.

    See also Example 15-28 and Example 15-24.

    Note	

    In a pipe, it may be more efficient to redirect the stdin to a file, rather than to cat the file.

    cat filename | tr a-z A-Z

    tr a-z A-Z < filename   #  Same effect, but starts one less process,
                            #+ and also dispenses with the pipe.

    tac, is the inverse of cat, listing a file backwards from its end.


    * cd
The familiar cd change directory command finds use in scripts where execution of a command requires being in a specified directory.

(cd /source/directory && tar cf - . ) | (cd /dest/directory && tar xpvf -)

[from the previously cited example by Alan Cox]

The -P (physical) option to cd causes it to ignore symbolic links.

cd - changes to $OLDPWD, the previous working directory.

Caution	

The cd command does not function as expected when presented with two forward slashes.

bash$ cd //
bash$ pwd
//
	      

The output should, of course, be /. This is a problem both from the command line and in a script.


    * chattr
Change file attributes. This is analogous to chmod above, but with different options and a different invocation syntax, and it works only on ext2/ext3 filesystems.

One particularly interesting chattr option is i. A chattr +i filename marks the file as immutable. The file cannot be modified, linked to, or deleted, not even by root. This file attribute can be set or removed only by root. In a similar fashion, the a option marks the file as append only.

root# chattr +i file1.txt


root# rm file1.txt

rm: remove write-protected regular file `file1.txt'? y
 rm: cannot remove `file1.txt': Operation not permitted
	      

If a file has the s (secure) attribute set, then when it is deleted its block is zeroed out on the disk.

If a file has the u (undelete) attribute set, then when it is deleted, its contents can still be retrieved (undeleted).

If a file has the c (compress) attribute set, then it will automatically be compressed on writes to disk, and uncompressed on reads.

Note	The file attributes set with chattr do not show in a file listing (ls -l).

    * chfn
Change information disclosed by the finger command.

id=__chgrp
    * chgrp
The chown command changes the ownership of a file or files. This command is a useful method that root can use to shift file ownership from one user to another. An ordinary user may not change the ownership of files, not even her own files. [1]

root# chown bozo *.txt

	      

The chgrp command changes the group ownership of a file or files. You must be owner of the file(s) as well as a member of the destination group (or root) to use this operation.

chgrp --recursive dunderheads *.data
#  The "dunderheads" group will now own all the "*.data" files
#+ all the way down the $PWD directory tree (that's what "recursive" means).

    * chkconfig
Check network and system configuration. This command lists and manages the network and system services started at bootup in the /etc/rc?.d  directory.

Originally a port from IRIX to Red Hat Linux, chkconfig may not be part of the core installation of some Linux flavors.

bash$ chkconfig --list
atd             0:off   1:off   2:off   3:on    4:on    5:on    6:off
 rwhod           0:off   1:off   2:off   3:off   4:off   5:off   6:off
 ...
	      

    * chmod
Changes the attributes of an existing file or directory (see Example 14-13).

chmod +x filename
# Makes "filename" executable for all users.

chmod u+s filename
# Sets "suid" bit on "filename" permissions.
# An ordinary user may execute "filename" with same privileges as the file's owner.
# (This does not apply to shell scripts.)

chmod 644 filename
# Makes "filename" readable/writable to owner, readable to others
# (octal mode).

chmod 444 filename
#  Makes "filename" read-only for all.
#  Modifying the file (for example, with a text editor)
#+ not allowed for a user who does not own the file (except for root),
#+ and even the file owner must force a file-save
#+ if she modifies the file.
#  Same restrictions apply for deleting the file.

chmod 1777 directory-name
#  Gives everyone read, write, and execute permission in directory,
#+ however also sets the "sticky bit".
#  This means that only the owner of the directory,
#+ owner of the file, and, of course, root
#+  can delete any particular file in that directory.

chmod 111 directory-name
#  Gives everyone execute-only permission in a directory.
#  This means that you can execute and READ the files in that directory
#+ (execute permission necessarily includes read permission
#+ because you can't execute a file without being able to read it).
#  But you can't list the files or search for them with the "find" command.
#  These restrictions do not apply to root.

chmod 000 directory-name
#  No permissions at all for that directory.
#  Can't read, write, or execute files in it.
#  Can't even list files in it or "cd" to it.
#  But, you can rename (mv) the directory
#+ or delete it (rmdir) if it is empty.
#  You can even symlink to files in the directory,
#+ but you can't read, write, or execute the symlinks.
#  These restrictions do not apply to root.

    * chown

<URL:#r=__chgrp>

    * chroot
CHange ROOT directory. Normally commands are fetched from $PATH, relative to /, the default root directory. This changes the root directory to a different one (and also changes the working directory to there). This is useful for security purposes, for instance when the system administrator wishes to restrict certain users, such as those telnetting in, to a secured portion of the filesystem (this is sometimes referred to as confining a guest user to a "chroot jail"). Note that after a chroot, the execution path for system binaries is no longer valid.

A chroot /opt would cause references to /usr/bin to be translated to /opt/usr/bin. Likewise, chroot /aaa/bbb /bin/ls would redirect future instances of ls to /aaa/bbb as the base directory, rather than / as is normally the case. An alias XX 'chroot /aaa/bbb ls' in a user's ~/.bashrc effectively restricts which portion of the filesystem she may run command "XX" on.

The chroot command is also handy when running from an emergency boot floppy (chroot to /dev/fd0), or as an option to lilo when recovering from a system crash. Other uses include installation from a different filesystem (an rpm option) or running a readonly filesystem from a CD ROM. Invoke only as root, and use with care.

Caution	

It might be necessary to copy certain system files to a chrooted directory, since the normal $PATH can no longer be relied upon.


    * cksum
These are utilities for generating checksums. A checksum is a number mathematically calculated from the contents of a file, for the purpose of checking its integrity. A script might refer to a list of checksums for security purposes, such as ensuring that the contents of key system files have not been altered or corrupted. For security applications, use the md5sum (message digest 5  checksum) command, or better yet, the newer sha1sum (Secure Hash Algorithm).

bash$ cksum /boot/vmlinuz
1670054224 804083 /boot/vmlinuz

bash$ echo -n "Top Secret" | cksum
3391003827 10



bash$ md5sum /boot/vmlinuz
0f43eccea8f09e0a0b2b5cf1dcf333ba  /boot/vmlinuz

bash$ echo -n "Top Secret" | md5sum
8babc97a6f62a4649716f4df8d61728f  -
	      

Note	

The cksum command shows the size, in bytes, of its target, whether file or stdout.

The md5sum and sha1sum commands display a dash when they receive their input from stdout.

    * clear
The clear command simply clears the text screen at the console or in an xterm. The prompt and cursor reappear at the upper lefthand corner of the screen or xterm window. This command may be used either at the command line or in a script.

    * clock
    The hwclock command accesses or adjusts the machine's hardware clock. Some options require root privileges. The /etc/rc.d/rc.sysinit startup file uses hwclock to set the system time from the hardware clock at bootup.

    The clock command is a synonym for hwclock.

    * cmp
The cmp command is a simpler version of diff, above. Whereas diff  reports the differences between two files, cmp merely shows at what point they differ.

Note	Like diff, cmp returns an exit status of 0 if the compared files are identical, and 1 if they differ. This permits use in a test construct within a shell script.

Use zcmp on gzipped files.

    * col
    This deceptively named filter removes reverse line feeds from an input stream. It also attempts to replace whitespace with equivalent tabs. The chief use of col is in filtering the output from certain text processing utilities, such as groff and tbl.

    * colrm
Column removal filter. This removes columns (characters) from a file and writes the file, lacking the range of specified columns, back to stdout. colrm 2 4 <filename removes the second through fourth characters from each line of the text file filename.

Caution	

If the file contains tabs or nonprintable characters, this may cause unpredictable behavior. In such cases, consider using expand and unexpand in a pipe preceding colrm.

    * column
    Column formatter. This filter transforms list-type text output into a "pretty-printed" table by inserting tabs at appropriate places.

Example 15-27. Using column to format a directory listing

#!/bin/bash
# colms.sh
# A minor modification of the example file in the "column" man page.


(printf "PERMISSIONS LINKS OWNER GROUP SIZE MONTH DAY HH:MM PROG-NAME\n" \
; ls -l | sed 1d) | column -t
#         ^^^^^^           ^^

#  The "sed 1d" in the pipe deletes the first line of output,
#+ which would be "total        N",
#+ where "N" is the total number of files found by "ls -l".

# The -t option to "column" pretty-prints a table.

exit 0

    * comm
        Versatile file comparison utility. The files must be sorted for this to be useful.

    comm -options first-file second-file

    comm file-1 file-2 outputs three columns:

        *

          column 1 = lines unique to file-1
        *

          column 2 = lines unique to file-2
        *

          column 3 = lines common to both.

    The options allow suppressing output of one or more columns.

        *

          -1 suppresses column 1
        *

          -2 suppresses column 2
        *

          -3 suppresses column 3
        *

          -12 suppresses both columns 1 and 2, etc.

    This command is useful for comparing "dictionaries" or word lists -- sorted text files with one word per line.

    
    * command
    The command directive disables aliases and functions for the command immediately following it.

bash$ command ls
              

Note	This is one of three shell directives that effect script command processing. The others are builtin and enable.

    * compress
    This is an older, proprietary compression utility found in commercial UNIX distributions. The more efficient gzip has largely replaced it. Linux distributions generally include a compress workalike for compatibility, although gunzip can unarchive files treated with compress.

Tip	

The znew command transforms compressed files into gzipped ones.

    * cp
    This is the file copy command. cp file1 file2 copies file1  to file2, overwriting file2 if it already exists (see Example 15-6).

Tip	

Particularly useful are the -a archive flag (for copying an entire directory tree), the -u update flag (which prevents overwriting identically-named newer files), and the -r and -R recursive flags.

cp -u source_dir/* dest_dir
#  "Synchronize" dest_dir to source_dir
#+  by copying over all newer and not previously existing files.

    * cpio
    This specialized archiving copy command (copy input and output) is rarely seen any more, having been supplanted by tar/gzip. It still has its uses, such as moving a directory tree. With an appropriate block size (for copying) specified, it can be appreciably faster than tar.

Example 15-30. Using cpio to move a directory tree

#!/bin/bash

# Copying a directory tree using cpio.

# Advantages of using 'cpio':
#   Speed of copying. It's faster than 'tar' with pipes.
#   Well suited for copying special files (named pipes, etc.)
#+  that 'cp' may choke on.

ARGS=2
E_BADARGS=65

if [ $# -ne "$ARGS" ]
then
  echo "Usage: `basename $0` source destination"
  exit $E_BADARGS
fi  

source="$1"
destination="$2"

###################################################################
find "$source" -depth | cpio -admvp "$destination"
#               ^^^^^         ^^^^^
#  Read the 'find' and 'cpio' info pages to decipher these options.
#  The above works only relative to $PWD (current directory) . . .
#+ full pathnames are specified.
###################################################################


# Exercise:
# --------

#  Add code to check the exit status ($?) of the 'find | cpio' pipe
#+ and output appropriate error messages if anything went wrong.

exit $?


    * cron
    Administrative program scheduler, performing such duties as cleaning up and deleting system log files and updating the slocate database. This is the superuser version of at (although each user may have their own crontab file which can be changed with the crontab command). It runs as a daemon  and executes scheduled entries from /etc/crontab.

Note	

Some flavors of Linux run crond, Matthew Dillon's version of cron.

    * crypt
    At one time, this was the standard UNIX file encryption utility. [3]  Politically motivated government regulations prohibiting the export of encryption software resulted in the disappearance of crypt  from much of the UNIX world, and it is still missing from most Linux distributions. Fortunately, programmers have come up with a number of decent alternatives to it, among them the author's very own cruft

    * csplit
    These are utilities for splitting a file into smaller chunks. Their usual use is for splitting up large files in order to back them up on floppies or preparatory to e-mailing or uploading them.

The csplit command splits a file according to context, the split occuring where patterns are matched.

Example 15-37. A script that copies itself in sections

#!/bin/bash
# splitcopy.sh

#  A script that splits itself into chunks,
#+ then reassembles the chunks into an exact copy
#+ of the original script.

CHUNKSIZE=4    #  Size of first chunk of split files.
OUTPREFIX=xx   #  csplit prefixes, by default,
               #+ files with "xx" ...

csplit "$0" "$CHUNKSIZE"

# Some comment lines for padding . . .
# Line 15
# Line 16
# Line 17
# Line 18
# Line 19
# Line 20

cat "$OUTPREFIX"* > "$0.copy"  # Concatenate the chunks.
rm "$OUTPREFIX"*               # Get rid of the chunks.

exit $?

    * cu
    uucp: UNIX to UNIX copy. This is a communications package for transferring files between UNIX servers. A shell script is an effective way to handle a uucp  command sequence.

    Since the advent of the Internet and e-mail, uucp seems to have faded into obscurity, but it still exists and remains perfectly workable in situations where an Internet connection is not available or appropriate. The advantage of uucp is that it is fault-tolerant, so even if there is a service interruption the copy operation will resume where it left off when the connection is restored.

    ---

    uux: UNIX to UNIX execute. Execute a command on a remote system. This command is part of the uucp package.

    ---

    cu: Call Up a remote system and connect as a simple terminal. It is a sort of dumbed-down version of telnet. This command is part of the uucp package.

    * cut
    A tool for extracting fields from files. It is similar to the print $N command set in awk, but more limited. It may be simpler to use cut in a script than awk. Particularly important are the -d (delimiter) and -f  (field specifier) options.

Using cut to obtain a listing of the mounted filesystems:

cut -d ' ' -f1,2 /etc/mtab

Using cut to list the OS and kernel version:

uname -a | cut -d" " -f1,3,11,12

Using cut to extract message headers from an e-mail folder:

bash$ grep '^Subject:' read-messages | cut -c10-80
Re: Linux suitable for mission-critical apps?
 MAKE MILLIONS WORKING AT HOME!!!
 Spam complaint
 Re: Spam complaint

Using cut to parse a file:

# List all the users in /etc/passwd.

FILENAME=/etc/passwd

for user in $(cut -d: -f1 $FILENAME)
do
  echo $user
done

# Thanks, Oleg Philon for suggesting this.

cut -d ' ' -f2,3 filename is equivalent to awk -F'[ ]' '{ print $2, $3 }' filename

Note	

It is even possible to specify a linefeed as a delimiter. The trick is to actually embed a linefeed (RETURN) in the command sequence.

bash$ cut -d'
 ' -f3,7,19 testfile
This is line 3 of testfile.
 This is line 7 of testfile.
 This is line 19 of testfile.
	      

Thank you, Jaka Kranjc, for pointing this out.

    * date
    Simply invoked, date prints the date and time to stdout. Where this command gets interesting is in its formatting and parsing options.

    * dc
    The dc (desk calculator) utility is stack-oriented and uses RPN ("Reverse Polish Notation"). Like bc, it has much of the power of a programming language.

    * dd
    This is the somewhat obscure and much feared data duplicator command. Originally a utility for exchanging data on magnetic tapes between UNIX minicomputers and IBM mainframes, this command still has its uses. The dd command simply copies a file (or stdin/stdout), but with conversions. Possible conversions are ASCII/EBCDIC, [4]  upper/lower case, swapping of byte pairs between input and output, and skipping and/or truncating the head or tail of the input file.

    * debugfs
    Filesystem check, repair, and debug command set.

fsck: a front end for checking a UNIX filesystem (may invoke other utilities). The actual filesystem type generally defaults to ext2.

e2fsck: ext2 filesystem checker.

debugfs: ext2 filesystem debugger. One of the uses of this versatile, but dangerous command is to (attempt to) recover deleted files. For advanced users only!

Caution	

All of these should be invoked as root, and they can damage or destroy a filesystem if misused.

    * declare
    The declare or typeset builtins, which are exact synonyms, permit modifying the properties of variables.

    * depmod
    Creates module dependency file. Usually invoked from a startup script.

    * df
    Shows filesystem usage in tabular form.

bash$ df
Filesystem           1k-blocks      Used Available Use% Mounted on
 /dev/hda5               273262     92607    166547  36% /
 /dev/hda8               222525    123951     87085  59% /home
 /dev/hda7              1408796   1075744    261488  80% /usr

    * dialog
    The dialog family of tools offers a method of calling "dialog" widgets from a shell script. The original dialog utility works in a text console, but its successors, gdialog, Xdialog, and kdialog  use X-Windows-based widget sets.

    * diff
    diff: flexible file comparison utility. It compares the target files line-by-line sequentially. In some applications, such as comparing word dictionaries, it may be helpful to filter the files through sort  and uniq before piping them to diff. diff file-1 file-2 outputs the lines in the files that differ, with carets showing which file each particular line belongs to.

The --side-by-side option to diff outputs each compared file, line by line, in separate columns, with non-matching lines marked. The -c and -u options likewise make the output of the command easier to interpret.

There are available various fancy frontends for diff, such as sdiff, wdiff, xdiff, and mgdiff.

Tip	

The diff command returns an exit status of 0 if the compared files are identical, and 1 if they differ. This permits use of diff in a test construct within a shell script (see below).

A common use for diff is generating difference files to be used with patch The -e option outputs files suitable for ed or ex scripts.

    * diff3
        An extended version of diff that compares three files at a time. This command returns an exit value of 0 upon successful execution, but unfortunately this gives no information about the results of the comparison.

    bash$ diff3 file-1 file-2 file-3
    ====
     1:1c
       This is line 1 of "file-1".
     2:1c
       This is line 1 of "file-2".
     3:1c
       This is line 1 of "file-3"
    	      

    The merge (3-way file merge) command is an interesting adjunct to diff3. Its syntax is merge Mergefile file1 file2. The result is to output to Mergefile the changes that lead from file1 to file2. Consider this command a stripped-down version of patch.

    * diffstat
    Use diffstat to create a histogram (point-distribution graph) of output from diff.

    * dig
    Domain Information Groper. Similar to nslookup, dig does an Internet name server lookup on a host. May be run from the command line or from within a script.

Some interesting options to dig are +time=N for setting a query timeout to N seconds, +nofail for continuing to query servers until a reply is received, and -x for doing a reverse address lookup.

    * dirname
    Strips the basename from a filename, printing only the path information.

Note	

basename and dirname can operate on any arbitrary string. The argument does not need to refer to an existing file, or even be a filename for that matter

    * dirs
    This command set is a mechanism for bookmarking working directories, a means of moving back and forth through directories in an orderly manner. A pushdown stack is used to keep track of directory names. Options allow various manipulations of the directory stack.

pushd dir-name pushes the path dir-name onto the directory stack and simultaneously changes the current working directory to dir-name

popd removes (pops) the top directory path name off the directory stack and simultaneously changes the current working directory to that directory popped from the stack.

dirs lists the contents of the directory stack (compare this with the $DIRSTACK variable). A successful pushd or popd will automatically invoke dirs.

    * disown
    Remove job(s) from the shell's table of active jobs.

    * dmesg
    Lists all system bootup messages to stdout. Handy for debugging and ascertaining which device drivers were installed and which system interrupts in use. The output of dmesg may, of course, be parsed with grep, sed, or awk from within a script.

bash$ dmesg | grep hda
Kernel command line: ro root=/dev/hda2
 hda: IBM-DLGA-23080, ATA DISK drive
 hda: 6015744 sectors (3080 MB) w/96KiB Cache, CHS=746/128/63
 hda: hda1 hda2 hda3 < hda5 hda6 hda7 > hda4

    * doexec
    The doexec command enables passing an arbitrary list of arguments to a binary executable. In particular, passing argv[0] (which corresponds to $0 in a script) lets the executable be invoked by various names, and it can then carry out different sets of actions, according to the name by which it was called. What this amounts to is roundabout way of passing options to an executable.

For example, the /usr/local/bin directory might contain a binary called "aaa". Invoking doexec /usr/local/bin/aaa list would list all those files in the current working directory beginning with an "a", while invoking (the same executable with) doexec /usr/local/bin/aaa delete would delete those files.

Note	

The various behaviors of the executable must be defined within the code of the executable itself, analogous to something like the following in a shell script:

case `basename $0` in
"name1" ) do_something;;
"name2" ) do_something_else;;
"name3" ) do_yet_another_thing;;
*       ) bail_out;;
esac

    * dos2unix
    This utility, written by Benjamin Lin and collaborators, converts DOS-formatted text files (lines terminated by CR-LF) to UNIX format (lines terminated by LF only), and vice-versa.

    * du
    * dump
    * dumpe2fs
    * e2fsck
    * echo
    * egrep
    * enable
    * enscript
    * env
    * eqn
    * eval
    * exec
    * exit (Related topic: exit status)
    * expand
    * export
    * expr
    * factor
    * false
    * fdformat
    * fdisk
    * fg
    * fgrep
    * file
    * find
    * finger
    * flex
    * flock
    * fmt
    * fold
    * free
    * fsck
    * ftp
    * fuser
    * getopt
    * getopts
    * gettext
    * getty
    * gnome-mount
    * grep
    * groff
    * groupmod
    * groups (Related topic: the $GROUPS variable)
    * gs
    * gzip
    * halt
    * hash
    * hdparm
    * head
    * help
    * hexdump
    * host
    * hostid
    * hostname (Related topic: the $HOSTNAME variable)
    * hwclock
    * iconv
    * id (Related topic: the $UID variable)
    * ifconfig
    * info
    * infocmp
    * init
    * insmod
    * install
    * ip
    * ipcalc
    * iwconfig
    * jobs
    * join
    * jot
    * kill
    * killall
    * last
    * lastcomm
    * lastlog
    * ldd
    * less
    * let
    * lex
    * ln
    * locate
    * lockfile
    * logger
    * logname
    * logout
    * logrotate
    * look
    * losetup
    * lp
    * ls
    * lsdev
    * lsmod
    * lsof
    * lspci
    * lsusb
    * ltrace
    * lynx
    * lzcat
    * lzma
    * m4
    * mail
    * mailstats
    * mailto
    * make
    * MAKEDEV
    * man
    * mcookie
    * md5sum
    * merge
    * mesg
    * mimencode
    * mkbootdisk
    * mkdir
    * mke2fs
    * mkfifo
    * mkisofs
    * mknod
    * mkswap
    * mktemp
    * mmencode
    * modinfo
    * modprobe
    * more
    * mount
    * msgfmt
    * mv
    * nc
    * netconfig
    * netstat
    * newgrp
    * nice
    * nl
    * nm
    * nmap
    * nohup
    * nslookup
    * objdump
    * od
    * passwd
    * paste
    * patch (Related topic: diff)
    * pathchk
    * perl
    * pgrep
    * pidof
    return the process ID of list of process names. pidof process1 process2 ...
    * ping
    * pkill
    * popd
    * pr
    * printenv
    * printf
    * procinfo
    * ps
    * pstree
    * ptx
    * pushd
    * pwd (Related topic: the $PWD variable)
    * python
    * quota
    * rcp
    * rdev
    * rdist
    * read
    * readelf
    * readlink
    * readonly
    * reboot
    * recode
    * renice
    * reset
    * resize
    * restore
    * rev
    * rlogin
    * rm
    * rmdir
    * rmmod
    * route
    * rpm
    * rpm2cpio
    * rsh
    * rsync
    * runlevel
    * run-parts
    * rx
    * rz
    * sar
    * scp
    * script
    * sdiff
    * sed
    * seq
    * service
    * set
    * setquota
    * setserial
    * setterm
    * sha1sum
    * shar
    * shopt
    * shred
    * shutdown
    * size
    * skill
    * sleep
    * slocate
    * snice
    * sort
    * source
    * sox
    * split
    * sq
    * ssh
    * stat
    * strace
    * strings
    * strip
    * stty
    * su
    * sudo
    * sum
    * suspend
    * swapoff
    * swapon
    * sx
    * sync
    * sz
    * tac
    * tail
    * tar
    * tbl
    * tcpdump
    * tee
    * telinit
    * telnet
    * Tex
    * texexec
    * time
    * times
    * tmpwatch
    * top
    * touch
    * tput
    * tr
    * traceroute
    * true
    * tset
    * tsort
    * tty
    * tune2fs
    * type
    * typeset
    * ulimit
    * umask
    * umount
    * uname
    * unarc
    * unarj
    * uncompress
    * unexpand
    * uniq
    * units
    * unlzma
    * unrar
    * unset
    * unsq
    * unzip
    * uptime
    * usbmodules
    * useradd
    * userdel
    * usermod
    * users
    * usleep
    * uucp
    * uudecode
    * uuencode
    * uux
    * vacation
    * vdir
    * vmstat
    * vrfy
    * w
    * wait
    * wall
    * watch
    * wc
    * wget
    * whatis
    * whereis
    * which
    * who
    * whoami
    * whois
    * write
    * xargs
    * yacc
    * yes
    * zcat
    * zdiff
    * zdump
    * zegrep
    * zfgrep
    * zgrep
    * zip
```
