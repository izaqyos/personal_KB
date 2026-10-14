---
type: reference
title: "Chapter 15. External Filters, Programs and Commands"
description: Subsection 12.11.2 of Part 4. Linux Commands.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.11.2"
---

# 12.11.2 Chapter 15. External Filters, Programs and Commands

[↑ Part 4. Linux Commands](/bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/README.md)

#### 12.11.2.1 Basic Commands

```text
The first commands a novice learns
```

#### 12.11.2.1.1 ls, tags, ls, list files directories

```text
    The basic file "list" command. It is all too easy to underestimate the power of this humble command. For example, using the -R, recursive option, ls provides a tree-like listing of a directory structure. Other useful options are -S, sort listing by file size, -t, sort by file modification time, -b, show escape characters, and -i, show file inodes (see Example 15-4).

    Tip	The ls command returns a non-zero exit status when attempting to list a non-existent file.

    bash$ ls abc
    ls: abc: No such file or directory


    bash$ echo $?
    2

    Example 15-1. Using ls to create a table of contents for burning a CDR disk

    #!/bin/bash
    # ex40.sh (burn-cd.sh)
    # Script to automate burning a CDR.


    SPEED=2          # May use higher speed if your hardware supports it.
    IMAGEFILE=cdimage.iso
    CONTENTSFILE=contents
    DEVICE=cdrom
    # DEVICE="0,0"     For older versions of cdrecord
    DEFAULTDIR=/opt  # This is the directory containing the data to be burned.
                     # Make sure it exists.
                     # Exercise: Add a test for this.

    # Uses Joerg Schilling's "cdrecord" package:
    # http://www.fokus.fhg.de/usr/schilling/cdrecord.html

    #  If this script invoked as an ordinary user, may need to suid cdrecord
    #+ chmod u+s /usr/bin/cdrecord, as root.
    #  Of course, this creates a security hole, though a relatively minor one.

    if [ -z "$1" ]
    then
      IMAGE_DIRECTORY=$DEFAULTDIR
      # Default directory, if not specified on command line.
    else
        IMAGE_DIRECTORY=$1
    fi

    # Create a "table of contents" file.
    ls -lRF $IMAGE_DIRECTORY > $IMAGE_DIRECTORY/$CONTENTSFILE
    # The "l" option gives a "long" file listing.
    # The "R" option makes the listing recursive.
    # The "F" option marks the file types (directories get a trailing /).
    echo "Creating table of contents."

    # Create an image file preparatory to burning it onto the CDR.
    mkisofs -r -o $IMAGEFILE $IMAGE_DIRECTORY
    echo "Creating ISO9660 file system image ($IMAGEFILE)."

    # Burn the CDR.
    echo "Burning the disk."
    echo "Please be patient, this will take a while."
    cdrecord -v -isosize speed=$SPEED dev=$DEVICE $IMAGEFILE

    exit $?
```

#### 12.11.2.1.1.1 list only hidden files

```text
$ ls -ad .*

explanation: -a list all (also hidden), -d list directories w/o recursing into their contents, .* pattern (starts w/ .)
				    12.11.2.1.1.2
```

#### 12.11.2.1.2 cat, tac

```text
    cat, an acronym for concatenate, lists a file to stdout. When combined with redirection (> or >>), it is commonly used to concatenate files.

    # Uses of 'cat'
    cat filename                          # Lists the file.

    cat file.1 file.2 file.3 > file.123   # Combines three files into one.

    The -n option to cat inserts consecutive numbers before all lines of the target file(s). The -b option numbers only the non-blank lines. The -v option echoes nonprintable characters, using ^ notation. The -s option squeezes multiple consecutive blank lines into a single blank line.

    See also Example 15-28 and Example 15-24.

    Note	In a pipe, it may be more efficient to redirect the stdin to a file, rather than to cat the file.

    cat filename | tr a-z A-Z

    tr a-z A-Z < filename   #  Same effect, but starts one less process,
                            #+ and also dispenses with the pipe.

    tac, is the inverse of cat, listing a file backwards from its end.
```

#### 12.11.2.1.3 rev

```text
    reverses each line of a file, and outputs to stdout. This does not have the same effect as tac, as it preserves the order of the lines, but flips each one around (mirror image).

    bash$ cat file1.txt
    This is line 1.
     This is line 2.


    bash$ tac file1.txt
    This is line 2.
     This is line 1.


    bash$ rev file1.txt
    .1 enil si sihT
     .2 enil si sihT
```

#### 12.11.2.1.4 cp

```text
    This is the file copy command. cp file1 file2 copies file1 to file2, overwriting file2 if it already exists (see Example 15-6).

    Tip	Particularly useful are the -a archive flag (for copying an entire directory tree), the -u update flag (which prevents overwriting identically-named newer files), and the -r and -R recursive flags.

    cp -u source_dir/* dest_dir
    #  "Synchronize" dest_dir to source_dir
    #+  by copying over all newer and not previously existing files.
```

#### 12.11.2.1.5 mv

```text
    This is the file move command. It is equivalent to a combination of cp and rm. It may be used to move multiple files to a directory, or even to rename a directory. For some examples of using mv in a script, see Example 9-20 and Example A-2.

    Note	When used in a non-interactive script, mv takes the -f (force) option to bypass user input.

    When a directory is moved to a preexisting directory, it becomes a subdirectory of the destination directory.

    bash$ mv source_directory target_directory

    bash$ ls -lF target_directory
    total 1
     drwxrwxr-x    2 bozo  bozo      1024 May 28 19:20 source_directory/
```

#### 12.11.2.1.6 rm

```text
    Delete (remove) a file or files. The -f option forces removal of even readonly files, and is useful for bypassing user input in a script.

    Note	The rm command will, by itself, fail to remove filenames beginning with a dash. Why? Because rm sees a dash-prefixed filename as an option.

    bash$ rm -badname
    rm: invalid option -- b
     Try `rm --help' for more information.

    One clever workaround is to precede the filename with a " -- " (the end-of-options flag).

    bash$ rm -- -badname

    Another method to is to preface the filename to be removed with a dot-slash .

    bash$ rm ./-badname

    Warning	When used with the recursive flag -r, this command removes files all the way down the directory tree from the current directory. A careless rm -rf * can wipe out a big chunk of a directory structure.
```

#### 12.11.2.1.7 rmdir

```text
    Remove directory. The directory must be empty of all files -- including "invisible" dotfiles [1] -- for this command to succeed.
```

#### 12.11.2.1.8 mkdir

```text
    Make directory, creates a new directory. For example, mkdir -p project/programs/December creates the named directory. The -p option automatically creates any necessary parent directories.
```

#### 12.11.2.1.9 chmod

```text
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
```

#### 12.11.2.1.10 chattr

```text
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
```

#### 12.11.2.1.11 ln

```text
    Creates links to pre-existings files. A "link" is a reference to a file, an alternate name for it. The ln command permits referencing the linked file by more than one name and is a superior alternative to aliasing (see Example 4-6).

    The ln creates only a reference, a pointer to the file only a few bytes in size.

    The ln command is most often used with the -s, symbolic or "soft" link flag. Advantages of using the -s flag are that it permits linking across file systems or to directories.

    The syntax of the command is a bit tricky. For example: ln -s oldfile newfile links the previously existing oldfile to the newly created link, newfile.

    Caution	If a file named newfile has previously existed, an error message will result.

    Which type of link to use?

    As John Macdonald explains it:

    Both of these [types of links] provide a certain measure of dual reference -- if you edit the contents of the file using any name, your changes will affect both the original name and either a hard or soft new name. The differences between them occurs when you work at a higher level. The advantage of a hard link is that the new name is totally independent of the old name -- if you remove or rename the old name, that does not affect the hard link, which continues to point to the data while it would leave a soft link hanging pointing to the old name which is no longer there. The advantage of a soft link is that it can refer to a different file system (since it is just a reference to a file name, not to actual data). And, unlike a hard link, a symbolic link can refer to a directory.

    Links give the ability to invoke a script (or any other type of executable) with multiple names, and having that script behave according to how it was invoked.

    Example 15-2. Hello or Good-bye

    #!/bin/bash
    # hello.sh: Saying "hello" or "goodbye"
    #+          depending on how script is invoked.

    # Make a link in current working directory ($PWD) to this script:
    #    ln -s hello.sh goodbye
    # Now, try invoking this script both ways:
    # ./hello.sh
    # ./goodbye


    HELLO_CALL=65
    GOODBYE_CALL=66

    if [ $0 = "./goodbye" ]
    then
      echo "Good-bye!"
      # Some other goodbye-type commands, as appropriate.
      exit $GOODBYE_CALL
    fi

    echo "Hello!"
    # Some other hello-type commands, as appropriate.
    exit $HELLO_CALL
```

#### 12.11.2.1.12 man, info

```text
    These commands access the manual and information pages on system commands and installed utilities. When available, the info pages usually contain more detailed descriptions than do the man pages.

    There have been various attempts at "automating" the writing of man pages. For a script that makes a tentative first step in that direction, 
```

#### 12.11.2.2 Complex Commands

```text
Commands for more advanced users
```

#### 12.11.2.2.1 find

```text
    -exec COMMAND \;

    Carries out COMMAND on each file that find matches. The command sequence terminates with ; (the ";" is escaped to make certain the shell passes it to find literally, without interpreting it as a special character).

    bash$ find ~/ -name '*.txt'
    /home/bozo/.kde/share/apps/karm/karmdata.txt
     /home/bozo/misc/irmeyc.txt
     /home/bozo/test-scripts/1.txt
    	      

    If COMMAND contains {}, then find substitutes the full path name of the selected file for "{}".

    find ~/ -name 'core*' -exec rm {} \;
    # Removes all core dump files from user's home directory.

    find /home/bozo/projects -mtime 1
    #  Lists all files in /home/bozo/projects directory tree
    #+ that were modified within the last day.
    #
    #  mtime = last modification time of the target file
    #  ctime = last status change time (via 'chmod' or otherwise)
    #  atime = last access time

    DIR=/home/bozo/junk_files
    find "$DIR" -type f -atime +5 -exec rm {} \;
    #                                      ^^
    #  Curly brackets are placeholder for the path name output by "find."
    #
    #  Deletes all files in "/home/bozo/junk_files"
    #+ that have not been accessed in at least 5 days.
    #
    #  "-type filetype", where
    #  f = regular file
    #  d = directory
    #  l = symbolic link, etc.
    #  (The 'find' manpage and info page have complete listings.)

    find /etc -exec grep '[0-9][0-9]*[.][0-9][0-9]*[.][0-9][0-9]*[.][0-9][0-9]*' {} \;

    # Finds all IP addresses (xxx.xxx.xxx.xxx) in /etc directory files.
    # There a few extraneous hits. Can they be filtered out?

    # Possibly by:

    find /etc -type f -exec cat '{}' \; | tr -c '.[:digit:]' '\n' \
    | grep '^[^.][^.]*\.[^.][^.]*\.[^.][^.]*\.[^.][^.]*$'
    #
    #  [:digit:] is one of the character classes
    #+ introduced with the POSIX 1003.2 standard. 

    # Thanks, Stéphane Chazelas. 

    Note	The -exec option to find should not be confused with the exec shell builtin.

				12.11.2.2.2 Example 15-3. Badname, eliminate file names in current directory containing bad characters and whitespace.

    #!/bin/bash
    # badname.sh
    # Delete filenames in current directory containing bad characters.

    for filename in *
    do
      badname=`echo "$filename" | sed -n /[\+\{\;\"\\\=\?~\(\)\<\>\&\*\|\$]/p`
    # badname=`echo "$filename" | sed -n '/[+{;"\=?~()<>&*|$]/p'`  also works.
    # Deletes files containing these nasties:     + { ; " \ = ? ~ ( ) < > & * | $
    #
      rm $badname 2>/dev/null
    #             ^^^^^^^^^^^ Error messages deep-sixed.
    done

    # Now, take care of files containing all manner of whitespace.
    find . -name "* *" -exec rm -f {} \;
    # The path name of the file that _find_ finds replaces the "{}".
    # The '\' ensures that the ';' is interpreted literally, as end of command.

    exit 0

    #---------------------------------------------------------------------
    # Commands below this line will not execute because of _exit_ command.

    # An alternative to the above script:
    find . -name '*[+{;"\\=?~()<>&*|$ ]*' -maxdepth 0 \
    -exec rm -f '{}' \;
    #  The "-maxdepth 0" option ensures that _find_ will not search
    #+ subdirectories below $PWD.

    # (Thanks, S.C.)
```

#### 12.11.2.2.3 Example 15-4. Deleting a file by its inode number

```text
    #!/bin/bash
    # idelete.sh: Deleting a file by its inode number.

    #  This is useful when a filename starts with an illegal character,
    #+ such as ? or -.

    ARGCOUNT=1                      # Filename arg must be passed to script.
    E_WRONGARGS=70
    E_FILE_NOT_EXIST=71
    E_CHANGED_MIND=72

    if [ $# -ne "$ARGCOUNT" ]
    then
      echo "Usage: `basename $0` filename"
      exit $E_WRONGARGS
    fi  

    if [ ! -e "$1" ]
    then
      echo "File \""$1"\" does not exist."
      exit $E_FILE_NOT_EXIST
    fi  

    inum=`ls -i | grep "$1" | awk '{print $1}'`
    # inum = inode (index node) number of file
    # -----------------------------------------------------------------------
    # Every file has an inode, a record that holds its physical address info.
    # -----------------------------------------------------------------------

    echo; echo -n "Are you absolutely sure you want to delete \"$1\" (y/n)? "
    # The '-v' option to 'rm' also asks this.
    read answer
    case "$answer" in
    [nN]) echo "Changed your mind, huh?"
          exit $E_CHANGED_MIND
          ;;
    *)    echo "Deleting file \"$1\".";;
    esac

    find . -inum $inum -exec rm {} \;
    #                           ^^
    #        Curly brackets are placeholder
    #+       for text output by "find."
    echo "File "\"$1"\" deleted!"

    exit 0

    The find command also works without the -exec option.

    #!/bin/bash
    #  Find suid root files.
    #  A strange suid file might indicate a security hole,
    #+ or even a system intrusion.

    directory="/usr/sbin"
    # Might also try /sbin, /bin, /usr/bin, /usr/local/bin, etc.
    permissions="+4000"  # suid root (dangerous!)


    for file in $( find "$directory" -perm "$permissions" )
    do
      ls -ltF --author "$file"
    done
```

#### 12.11.2.2.4 xargs

#### 12.11.2.2.4.1 xargs examples, tags: xargs examples

```text
    A filter for feeding arguments to a command, and also a tool for assembling the commands themselves. It breaks a data stream into small enough chunks for filters and commands to process. Consider it as a powerful replacement for backquotes. In situations where command substitution fails with a too many arguments error, substituting xargs often works. [1] Normally, xargs reads from stdin or from a pipe, but it can also be given the output of a file.

    The default command for xargs is echo. This means that input piped to xargs may have linefeeds and other whitespace characters stripped out.

    bash$ ls -l
    total 0
     -rw-rw-r--    1 bozo  bozo         0 Jan 29 23:58 file1
     -rw-rw-r--    1 bozo  bozo         0 Jan 29 23:58 file2



    bash$ ls -l | xargs
    total 0 -rw-rw-r-- 1 bozo bozo 0 Jan 29 23:58 file1 -rw-rw-r-- 1 bozo bozo 0 Jan...



    bash$ find ~/mail -type f | xargs grep "Linux"
    ./misc:User-Agent: slrn/0.9.8.1 (Linux)
     ./sent-mail-jul-2005: hosted by the Linux Documentation Project.
     ./sent-mail-jul-2005: (Linux Documentation Project Site, rtf version)
     ./sent-mail-jul-2005: Subject: Criticism of Bozo's Windows/Linux article
     ./sent-mail-jul-2005: while mentioning that the Linux ext2/ext3 filesystem
     . . .
    	      

    ls | xargs -p -l gzip gzips every file in current directory, one at a time, prompting before each operation.


    Note that xargs processes the arguments passed to it sequentially, one at a time.

    bash$ find /usr/bin | xargs file
    /usr/bin:          directory
     /usr/bin/foomatic-ppd-options:          perl script text executable
     . . .
    	      

    Tip	An interesting xargs option is -n NN, which limits to NN the number of arguments passed.

    ls | xargs -n 8 echo lists the files in the current directory in 8 columns.

    Tip	Another useful option is -0, in combination with find -print0 or grep -lZ. This allows handling arguments containing whitespace or quotes.

    find / -type f -print0 | xargs -0 grep -liwZ GUI | xargs -0 rm -f

    grep -rliwZ GUI / | xargs -0 rm -f

    Either of the above will remove any file containing "GUI". (Thanks, S.C.)

    Or:

    cat /proc/"$pid"/"$OPTION" | xargs -0 echo
    #  Formats output:         ^^^^^^^^^^^^^^^
    #  From Han Holl's fixup of "get-commandline.sh"
    #+ script in "/dev and /proc" chapter.
```

#### 12.11.2.2.5 Example 15-5. Logfile: Using xargs to monitor system log

```text
    #!/bin/bash

    # Generates a log file in current directory
    # from the tail end of /var/log/messages.

    # Note: /var/log/messages must be world readable
    # if this script invoked by an ordinary user.
    #         #root chmod 644 /var/log/messages

    LINES=5

    ( date; uname -a ) >>logfile
    # Time and machine name
    echo ---------------------------------------------------------- >>logfile
    tail -n $LINES /var/log/messages | xargs | fmt -s >>logfile
    echo >>logfile
    echo >>logfile

    exit 0

    #  Note:
    #  ----
    #  As Frank Wang points out,
    #+ unmatched quotes (either single or double quotes) in the source file
    #+ may give xargs indigestion.
    #
    #  He suggests the following substitution for line 15:
    #  tail -n $LINES /var/log/messages | tr -d "\"'" | xargs | fmt -s >>logfile



    #  Exercise:
    #  --------
    #  Modify this script to track changes in /var/log/messages at intervals
    #+ of 20 minutes.
    #  Hint: Use the "watch" command. 

    As in find, a curly bracket pair serves as a placeholder for replacement text.
```

#### 12.11.2.2.6 Example 15-6. Copying files in current directory to another

```text
    #!/bin/bash
    # copydir.sh

    #  Copy (verbose) all files in current directory ($PWD)
    #+ to directory specified on command line.

    E_NOARGS=65

    if [ -z "$1" ]   # Exit if no argument given.
    then
      echo "Usage: `basename $0` directory-to-copy-to"
      exit $E_NOARGS
    fi  

    ls . | xargs -i -t cp ./{} $1
    #            ^^ ^^      ^^
    #  -t is "verbose" (output command line to stderr) option.
    #  -i is "replace strings" option.
    #  {} is a placeholder for output text.
    #  This is similar to the use of a curly bracket pair in "find."
    #
    #  List the files in current directory (ls .),
    #+ pass the output of "ls" as arguments to "xargs" (-i -t options),
    #+ then copy (cp) these arguments ({}) to new directory ($1).  
    #
    #  The net result is the exact equivalent of
    #+   cp * $1
    #+ unless any of the filenames has embedded "whitespace" characters.

    exit 0
```

#### 12.11.2.2.7 Example 15-7. Killing processes by name

```text
    #!/bin/bash
    # kill-byname.sh: Killing processes by name.
    # Compare this script with kill-process.sh.

    #  For instance,
    #+ try "./kill-byname.sh xterm" --
    #+ and watch all the xterms on your desktop disappear.

    #  Warning:
    #  -------
    #  This is a fairly dangerous script.
    #  Running it carelessly (especially as root)
    #+ can cause data loss and other undesirable effects.

    E_BADARGS=66

    if test -z "$1"  # No command line arg supplied?
    then
      echo "Usage: `basename $0` Process(es)_to_kill"
      exit $E_BADARGS
    fi


    PROCESS_NAME="$1"
    ps ax | grep "$PROCESS_NAME" | awk '{print $1}' | xargs -i kill {} 2&>/dev/null
    #                                                       ^^      ^^

    # ---------------------------------------------------------------
    # Notes:
    # -i is the "replace strings" option to xargs.
    # The curly brackets are the placeholder for the replacement.
    # 2&>/dev/null suppresses unwanted error messages.
    #
    # Can  grep "$PROCESS_NAME" be replaced by pidof "$PROCESS_NAME"?
    # ---------------------------------------------------------------

    exit $?

    #  The "killall" command has the same effect as this script,
    #+ but using it is not quite as educational.
```

#### 12.11.2.2.8 Example 15-8. Word frequency analysis using xargs

```text
    #!/bin/bash
    # wf2.sh: Crude word frequency analysis on a text file.

    # Uses 'xargs' to decompose lines of text into single words.
    # Compare this example to the "wf.sh" script later on.


    # Check for input file on command line.
    ARGS=1
    E_BADARGS=65
    E_NOFILE=66

    if [ $# -ne "$ARGS" ]
    # Correct number of arguments passed to script?
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS
    fi

    if [ ! -f "$1" ]       # Check if file exists.
    then
      echo "File \"$1\" does not exist."
      exit $E_NOFILE
    fi



    ########################################################
    cat "$1" | xargs -n1 | \
    #  List the file, one word per line. 
    tr A-Z a-z | \
    #  Shift characters to lowercase.
    sed -e 's/\.//g'  -e 's/\,//g' -e 's/ /\
    /g' | \
    #  Filter out periods and commas, and
    #+ change space between words to linefeed,
    sort | uniq -c | sort -nr
    #  Finally prefix occurrence count and sort numerically.
    ########################################################

    #  This does the same job as the "wf.sh" example,
    #+ but a bit more ponderously, and it runs more slowly (why?).

    exit 0
```

#### 12.11.2.2.9 expr

```text
    All-purpose expression evaluator: Concatenates and evaluates the arguments according to the operation given (arguments must be separated by spaces). Operations may be arithmetic, comparison, string, or logical.

    expr 3 + 5

        returns 8
    expr 5 % 3

        returns 2
    expr 1 / 0

        returns the error message, expr: division by zero

        Illegal arithmetic operations not allowed.
    expr 5 \* 3

        returns 15

        The multiplication operator must be escaped when used in an arithmetic expression with expr.
    y=`expr $y + 1`

        Increment a variable, with the same effect as let y=y+1 and y=$(($y+1)). This is an example of arithmetic expansion.
    z=`expr substr $string $position $length`

        Extract substring of $length characters, starting at $position.
```

#### 12.11.2.2.10 Example 15-9. Using expr

```text
    #!/bin/bash

    # Demonstrating some of the uses of 'expr'
    # =======================================

    echo

    # Arithmetic Operators
    # ---------- ---------

    echo "Arithmetic Operators"
    echo
    a=`expr 5 + 3`
    echo "5 + 3 = $a"

    a=`expr $a + 1`
    echo
    echo "a + 1 = $a"
    echo "(incrementing a variable)"

    a=`expr 5 % 3`
    # modulo
    echo
    echo "5 mod 3 = $a"

    echo
    echo

    # Logical Operators
    # ------- ---------

    #  Returns 1 if true, 0 if false,
    #+ opposite of normal Bash convention.

    echo "Logical Operators"
    echo

    x=24
    y=25
    b=`expr $x = $y`         # Test equality.
    echo "b = $b"            # 0  ( $x -ne $y )
    echo

    a=3
    b=`expr $a \> 10`
    echo 'b=`expr $a \> 10`, therefore...'
    echo "If a > 10, b = 0 (false)"
    echo "b = $b"            # 0  ( 3 ! -gt 10 )
    echo

    b=`expr $a \< 10`
    echo "If a < 10, b = 1 (true)"
    echo "b = $b"            # 1  ( 3 -lt 10 )
    echo
    # Note escaping of operators.

    b=`expr $a \<= 3`
    echo "If a <= 3, b = 1 (true)"
    echo "b = $b"            # 1  ( 3 -le 3 )
    # There is also a "\>=" operator (greater than or equal to).


    echo
    echo



    # String Operators
    # ------ ---------

    echo "String Operators"
    echo

    a=1234zipper43231
    echo "The string being operated upon is \"$a\"."

    # length: length of string
    b=`expr length $a`
    echo "Length of \"$a\" is $b."

    # index: position of first character in substring
    #        that matches a character in string
    b=`expr index $a 23`
    echo "Numerical position of first \"2\" in \"$a\" is \"$b\"."

    # substr: extract substring, starting position & length specified
    b=`expr substr $a 2 6`
    echo "Substring of \"$a\", starting at position 2,\
    and 6 chars long is \"$b\"."


    #  The default behavior of the 'match' operations is to
    #+ search for the specified match at the ***beginning*** of the string.
    #
    #        uses Regular Expressions
    b=`expr match "$a" '[0-9]*'`               #  Numerical count.
    echo Number of digits at the beginning of \"$a\" is $b.
    b=`expr match "$a" '\([0-9]*\)'`           #  Note that escaped parentheses
    #                   ==      ==              + trigger substring match.
    echo "The digits at the beginning of \"$a\" are \"$b\"."

    echo

    exit 0

    Important	

    The : operator can substitute for match. For example, b=`expr $a : [0-9]*` is the exact equivalent of b=`expr match $a [0-9]*` in the above listing.

    #!/bin/bash

    echo
    echo "String operations using \"expr \$string : \" construct"
    echo "==================================================="
    echo

    a=1234zipper5FLIPPER43231

    echo "The string being operated upon is \"`expr "$a" : '\(.*\)'`\"."
    #     Escaped parentheses grouping operator.            ==  ==

    #       ***************************
    #+          Escaped parentheses
    #+           match a substring
    #       ***************************


    #  If no escaped parentheses...
    #+ then 'expr' converts the string operand to an integer.

    echo "Length of \"$a\" is `expr "$a" : '.*'`."   # Length of string

    echo "Number of digits at the beginning of \"$a\" is `expr "$a" : '[0-9]*'`."

    # ------------------------------------------------------------------------- #

    echo

    echo "The digits at the beginning of \"$a\" are `expr "$a" : '\([0-9]*\)'`."
    #                                                             ==      ==
    echo "The first 7 characters of \"$a\" are `expr "$a" : '\(.......\)'`."
    #         =====                                          ==       ==
    # Again, escaped parentheses force a substring match.
    #
    echo "The last 7 characters of \"$a\" are `expr "$a" : '.*\(.......\)'`."
    #         ====                  end of string operator  ^^
    #  (actually means skip over one or more of any characters until specified
    #+  substring)

    echo

    exit 0

The above script illustrates how expr uses the escaped parentheses -- \( ... \) -- grouping operator in tandem with regular expression parsing to match a substring. Here is a another example, this time from "real life."

# Strip the whitespace from the beginning and end.
LRFDATE=`expr "$LRFDATE" : '[[:space:]]*\(.*\)[[:space:]]*$'`

#  From Peter Knowles' "booklistgen.sh" script
#+ for converting files to Sony Librie/PRS-50X format.
#  (http://booklistgensh.peterknowles.com)

Perl, sed, and awk have far superior string parsing facilities. A short sed or awk "subroutine" within a script (see Section 33.3) is an attractive alternative to expr.
```

#### 12.11.2.3 Time / Date Commands

```text
Time/date and timing
```

#### 12.11.2.3.1 date

```text
    Simply invoked, date prints the date and time to stdout. Where this command gets interesting is in its formatting and parsing options.

    Example 15-10. Using date

    #!/bin/bash
    # Exercising the 'date' command

    echo "The number of days since the year's beginning is `date +%j`."
    # Needs a leading '+' to invoke formatting.
    # %j gives day of year.

    echo "The number of seconds elapsed since 01/01/1970 is `date +%s`."
    #  %s yields number of seconds since "UNIX epoch" began,
    #+ but how is this useful?

    prefix=temp
    suffix=$(date +%s)  # The "+%s" option to 'date' is GNU-specific.
    filename=$prefix.$suffix
    echo $filename
    #  It's great for creating "unique" temp filenames,
    #+ even better than using $$.

    # Read the 'date' man page for more formatting options.

    exit 0

    The -u option gives the UTC (Universal Coordinated Time).

    bash$ date
    Fri Mar 29 21:07:39 MST 2002



    bash$ date -u
    Sat Mar 30 04:07:42 UTC 2002
    	      

    This option facilitates calculating the time between different dates.
```

#### 12.11.2.3.2 Example 15-11. Date calculations

```text
    #!/bin/bash
    # date-calc.sh
    # Author: Nathan Coulter
    # Used in ABS Guide with permission (thanks!).

    MPHR=60    # Minutes per hour.
    HPD=24     # Hours per day.

    diff () {
            printf '%s' $(( $(date -u -d"$TARGET" +%s) -
                            $(date -u -d"$CURRENT" +%s)))
    #                       %d = day of month.
    }


    CURRENT=$(date -u -d '2007-09-01 17:30:24' '+%F %T.%N %Z')
    TARGET=$(date -u -d'2007-12-25 12:30:00' '+%F %T.%N %Z')
    # %F = full date, %T = %H:%M:%S, %N = nanoseconds, %Z = time zone.

    printf '\nIn 2007, %s ' \
           "$(date -d"$CURRENT +
            $(( $(diff) /$MPHR /$MPHR /$HPD / 2 )) days" '+%d %B')" 
    #       %B = name of month                ^ halfway
    printf 'was halfway between %s ' "$(date -d"$CURRENT" '+%d %B')"
    printf 'and %s\n' "$(date -d"$TARGET" '+%d %B')"

    printf '\nOn %s at %s, there were\n' \
            $(date -u -d"$CURRENT" +%F) $(date -u -d"$CURRENT" +%T)
    DAYS=$(( $(diff) / $MPHR / $MPHR / $HPD ))
    CURRENT=$(date -d"$CURRENT +$DAYS days" '+%F %T.%N %Z')
    HOURS=$(( $(diff) / $MPHR / $MPHR ))
    CURRENT=$(date -d"$CURRENT +$HOURS hours" '+%F %T.%N %Z')
    MINUTES=$(( $(diff) / $MPHR ))
    CURRENT=$(date -d"$CURRENT +$MINUTES minutes" '+%F %T.%N %Z')
    printf '%s days, %s hours, ' "$DAYS" "$HOURS"
    printf '%s minutes, and %s seconds ' "$MINUTES" "$(diff)"
    printf 'until Christmas Dinner!\n\n'

    #  Exercise:
    #  --------
    #  Rewrite the diff () function to accept passed parameters,
    #+ rather than using global variables.

    The date command has quite a number of output options. For example %N gives the nanosecond portion of the current time. One interesting use for this is to generate random integers.

    date +%N | sed -e 's/000$//' -e 's/^0//'
               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    #  Strip off leading and trailing zeroes, if present.
    #  Length of generated integer depends on
    #+ how many zeroes stripped off.

    # 115281032
    # 63408725
    # 394504284

    There are many more options (try man date).

    date +%j
    # Echoes day of the year (days elapsed since January 1).

    date +%k%M
    # Echoes hour and minute in 24-hour format, as a single digit string.



    # The 'TZ' parameter permits overriding the default time zone.
    date                 # Mon Mar 28 21:42:16 MST 2005
    TZ=EST date          # Mon Mar 28 23:42:16 EST 2005
    # Thanks, Frank Kannemann and Pete Sjoberg, for the tip.


    SixDaysAgo=$(date --date='6 days ago')
    OneMonthAgo=$(date --date='1 month ago')  # Four weeks back (not a month).
    OneYearAgo=$(date --date='1 year ago')
```

#### 12.11.2.3.3 zdump

```text
    Time zone dump: echoes the time in a specified time zone.

    bash$ zdump EST
    EST  Tue Sep 18 22:09:22 2001 EST
```

#### 12.11.2.3.4 time

```text
    Outputs very verbose timing statistics for executing a command.

    time ls -l / gives something like this:

    |0.00user 0.01system 0:00.05elapsed 16%CPU (0avgtext+0avgdata 0maxresident)k
     |0inputs+0outputs (149major+27minor)pagefaults 0swaps

    See also the very similar times command in the previous section.

    Note	As of version 2.0 of Bash, time became a shell reserved word, with slightly altered behavior in a pipeline.
```

#### 12.11.2.3.5 touch

```text
    Utility for updating access/modification times of a file to current system time or other specified time, but also useful for creating a new file. The command touch zzz will create a new file of zero length, named zzz, assuming that zzz did not previously exist. Time-stamping empty files in this way is useful for storing date information, for example in keeping track of modification times on a project.

    Note	The touch command is equivalent to : >> newfile or >> newfile (for ordinary files).

    Tip	Before doing a cp -u (copy/update), use touch to update the time stamp of files you don't wish overwritten.

    As an example, if the directory /home/bozo/tax_audit contains the files spreadsheet-051606.data, spreadsheet-051706.data, and spreadsheet-051806.data, then doing a touch spreadsheet*.data will protect these files from being overwritten by files with the same names during a cp -u /home/bozo/financial_info/spreadsheet*data /home/bozo/tax_audit.
```

#### 12.11.2.3.6 at

```text
    The at job control command executes a given set of commands at a specified time. Superficially, it resembles cron, however, at is chiefly useful for one-time execution of a command set.

    at 2pm January 15 prompts for a set of commands to execute at that time. These commands should be shell-script compatible, since, for all practical purposes, the user is typing in an executable shell script a line at a time. Input terminates with a Ctl-D.

    Using either the -f option or input redirection (<), at reads a command list from a file. This file is an executable shell script, though it should, of course, be non-interactive. Particularly clever is including the run-parts command in the file to execute a different set of scripts.

    bash$ at 2:30 am Friday < at-jobs.list
    job 2 at 2000-10-27 02:30
```

#### 12.11.2.3.7 batch

```text
    The batch job control command is similar to at, but it runs a command list when the system load drops below .8. Like at, it can read commands from a file with the -f option.

    The concept of batch processing dates back to the era of mainframe computers. It means running a set of commands without user intervention.
```

#### 12.11.2.3.8 cal

```text
    Prints a neatly formatted monthly calendar to stdout. Will do current year or a large range of past and future years.
```

#### 12.11.2.3.9 sleep

```text
    This is the shell equivalent of a wait loop. It pauses for a specified number of seconds, doing nothing. It can be useful for timing or in processes running in the background, checking for a specific event every so often (polling), as in Example 29-6.

    sleep 3     # Pauses 3 seconds.

    Note	The sleep command defaults to seconds, but minute, hours, or days may also be specified.

    sleep 3 h   # Pauses 3 hours!

    Note	The watch command may be a better choice than sleep for running commands at timed intervals.
```

#### 12.11.2.3.10 usleep

```text
    Microsleep (the u may be read as the Greek mu, or micro- prefix). This is the same as sleep, above, but "sleeps" in microsecond intervals. It can be used for fine-grained timing, or for polling an ongoing process at very frequent intervals.

    usleep 30     # Pauses 30 microseconds.

    This command is part of the Red Hat initscripts / rc-scripts package.

    Caution	The usleep command does not provide particularly accurate timing, and is therefore unsuitable for critical timing loops.
```

#### 12.11.2.3.11 hwclock, clock

```text
    The hwclock command accesses or adjusts the machine's hardware clock. Some options require root privileges. The /etc/rc.d/rc.sysinit startup file uses hwclock to set the system time from the hardware clock at bootup.

    The clock command is a synonym for hwclock.
```

#### 12.11.2.4 Text Processing Commands

```text
Commands affecting text and text files
```

#### 12.11.2.4.1 sort

```text
    File sort utility, often used as a filter in a pipe. This command sorts a text stream or file forwards or backwards, or according to various keys or character positions. Using the -m option, it merges presorted input files. The info page lists its many capabilities and options. See Example 10-9, Example 10-10, and Example A-8.
```

#### 12.11.2.4.2 tsort

```text
    Topological sort, reading in pairs of whitespace-separated strings and sorting according to input patterns. The original purpose of tsort was to sort a list of dependencies for an obsolete version of the ld linker in an "ancient" version of UNIX.

    The results of a tsort will usually differ markedly from those of the standard sort command, above.
```

#### 12.11.2.4.3 uniq

```text
    This filter removes duplicate lines from a sorted file. It is often seen in a pipe coupled with sort.

    cat list-1 list-2 list-3 | sort | uniq > final.list
    # Concatenates the list files,
    # sorts them,
    # removes duplicate lines,
    # and finally writes the result to an output file.

    The useful -c option prefixes each line of the input file with its number of occurrences.

    bash$ cat testfile
    This line occurs only once.
     This line occurs twice.
     This line occurs twice.
     This line occurs three times.
     This line occurs three times.
     This line occurs three times.


    bash$ uniq -c testfile
          1 This line occurs only once.
           2 This line occurs twice.
           3 This line occurs three times.


    bash$ sort testfile | uniq -c | sort -nr
          3 This line occurs three times.
           2 This line occurs twice.
           1 This line occurs only once.
    	      

    The sort INPUTFILE | uniq -c | sort -nr command string produces a frequency of occurrence listing on the INPUTFILE file (the -nr options to sort cause a reverse numerical sort). This template finds use in analysis of log files and dictionary lists, and wherever the lexical structure of a document needs to be examined.
```

#### 12.11.2.4.4 Example 15-12. Word Frequency Analysis

```text
    #!/bin/bash
    # wf.sh: Crude word frequency analysis on a text file.
    # This is a more efficient version of the "wf2.sh" script.


    # Check for input file on command line.
    ARGS=1
    E_BADARGS=65
    E_NOFILE=66

    if [ $# -ne "$ARGS" ]  # Correct number of arguments passed to script?
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS
    fi

    if [ ! -f "$1" ]       # Check if file exists.
    then
      echo "File \"$1\" does not exist."
      exit $E_NOFILE
    fi



    ########################################################
    # main ()
    sed -e 's/\.//g'  -e 's/\,//g' -e 's/ /\
    /g' "$1" | tr 'A-Z' 'a-z' | sort | uniq -c | sort -nr
    #                           =========================
    #                            Frequency of occurrence

    #  Filter out periods and commas, and
    #+ change space between words to linefeed,
    #+ then shift characters to lowercase, and
    #+ finally prefix occurrence count and sort numerically.

    #  Arun Giridhar suggests modifying the above to:
    #  . . . | sort | uniq -c | sort +1 [-f] | sort +0 -nr
    #  This adds a secondary sort key, so instances of
    #+ equal occurrence are sorted alphabetically.
    #  As he explains it:
    #  "This is effectively a radix sort, first on the
    #+ least significant column
    #+ (word or string, optionally case-insensitive)
    #+ and last on the most significant column (frequency)."
    #
    #  As Frank Wang explains, the above is equivalent to
    #+       . . . | sort | uniq -c | sort +0 -nr
    #+ and the following also works:
    #+       . . . | sort | uniq -c | sort -k1nr -k
    ########################################################

    exit 0

    # Exercises:
    # ---------
    # 1) Add 'sed' commands to filter out other punctuation,
    #+   such as semicolons.
    # 2) Modify the script to also filter out multiple spaces and
    #+   other whitespace.

    bash$ cat testfile
    This line occurs only once.
     This line occurs twice.
     This line occurs twice.
     This line occurs three times.
     This line occurs three times.
     This line occurs three times.


    bash$ ./wf.sh testfile
          6 this
           6 occurs
           6 line
           3 times
           3 three
           2 twice
           1 only
           1 once
```

#### 12.11.2.4.5 expand, unexpand

```text
    The expand filter converts tabs to spaces. It is often used in a pipe.

    The unexpand filter converts spaces to tabs. This reverses the effect of expand.
```

#### 12.11.2.4.6 cut

```text
    A tool for extracting fields from files. It is similar to the print $N command set in awk, but more limited. It may be simpler to use cut in a script than awk. Particularly important are the -d (delimiter) and -f (field specifier) options.

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

    Note	It is even possible to specify a linefeed as a delimiter. The trick is to actually embed a linefeed (RETURN) in the command sequence.

    bash$ cut -d'
     ' -f3,7,19 testfile
    This is line 3 of testfile.
     This is line 7 of testfile.
     This is line 19 of testfile.
    	      

    Thank you, Jaka Kranjc, for pointing this out.
```

#### 12.11.2.4.7 paste

```text
    Tool for merging together different files into a single, multi-column file. In combination with cut, useful for creating system log files. 
```

#### 12.11.2.4.8 join

```text
    Consider this a special-purpose cousin of paste. This powerful utility allows merging two files in a meaningful fashion, which essentially creates a simple version of a relational database.

    The join command operates on exactly two files, but pastes together only those lines with a common tagged field (usually a numerical label), and writes the result to stdout. The files to be joined should be sorted according to the tagged field for the matchups to work properly.

    File: 1.data

    100 Shoes
    200 Laces
    300 Socks

    File: 2.data

    100 $40.00
    200 $1.00
    300 $2.00

    bash$ join 1.data 2.data
    File: 1.data 2.data

     100 Shoes $40.00
     200 Laces $1.00
     300 Socks $2.00
    	      

    Note	The tagged field appears only once in the output.
```

#### 12.11.2.4.9 head

```text
    lists the beginning of a file to stdout. The default is 10 lines, but a different number can be specified. The command has a number of interesting options.

    Example 15-13. Which files are scripts?

    #!/bin/bash
    # script-detector.sh: Detects scripts within a directory.

    TESTCHARS=2    # Test first 2 characters.
    SHABANG='#!'   # Scripts begin with a "sha-bang."

    for file in *  # Traverse all the files in current directory.
    do
      if [[ `head -c$TESTCHARS "$file"` = "$SHABANG" ]]
      #      head -c2                      #!
      #  The '-c' option to "head" outputs a specified
      #+ number of characters, rather than lines (the default).
      then
        echo "File \"$file\" is a script."
      else
        echo "File \"$file\" is *not* a script."
      fi
    done
      
    exit 0

    #  Exercises:
    #  ---------
    #  1) Modify this script to take as an optional argument
    #+    the directory to scan for scripts
    #+    (rather than just the current working directory).
    #
    #  2) As it stands, this script gives "false positives" for
    #+    Perl, awk, and other scripting language scripts.
    #     Correct this.
```

#### 12.11.2.4.10 Example 15-14. Generating 10-digit random numbers

```text
    #!/bin/bash
    # rnd.sh: Outputs a 10-digit random number

    # Script by Stephane Chazelas.

    head -c4 /dev/urandom | od -N4 -tu4 | sed -ne '1s/.* //p'


    # =================================================================== #

    # Analysis
    # --------

    # head:
    # -c4 option takes first 4 bytes.

    # od:
    # -N4 option limits output to 4 bytes.
    # -tu4 option selects unsigned decimal format for output.

    # sed: 
    # -n option, in combination with "p" flag to the "s" command,
    # outputs only matched lines.



    # The author of this script explains the action of 'sed', as follows.

    # head -c4 /dev/urandom | od -N4 -tu4 | sed -ne '1s/.* //p'
    # ----------------------------------> |

    # Assume output up to "sed" --------> |
    # is 0000000 1198195154\n

    #  sed begins reading characters: 0000000 1198195154\n.
    #  Here it finds a newline character,
    #+ so it is ready to process the first line (0000000 1198195154).
    #  It looks at its <range><action>s. The first and only one is

    #   range     action
    #   1         s/.* //p

    #  The line number is in the range, so it executes the action:
    #+ tries to substitute the longest string ending with a space in the line
    #  ("0000000 ") with nothing (//), and if it succeeds, prints the result
    #  ("p" is a flag to the "s" command here, this is different
    #+ from the "p" command).

    #  sed is now ready to continue reading its input. (Note that before
    #+ continuing, if -n option had not been passed, sed would have printed
    #+ the line once again).

    #  Now, sed reads the remainder of the characters, and finds the
    #+ end of the file.
    #  It is now ready to process its 2nd line (which is also numbered '$' as
    #+ it's the last one).
    #  It sees it is not matched by any <range>, so its job is done.

    #  In few word this sed commmand means:
    #  "On the first line only, remove any character up to the right-most space,
    #+ then print it."

    # A better way to do this would have been:
    #           sed -e 's/.* //;q'

    # Here, two <range><action>s (could have been written
    #           sed -e 's/.* //' -e q):

    #   range                    action
    #   nothing (matches line)   s/.* //
    #   nothing (matches line)   q (quit)

    #  Here, sed only reads its first line of input.
    #  It performs both actions, and prints the line (substituted) before
    #+ quitting (because of the "q" action) since the "-n" option is not passed.

    # =================================================================== #

    # An even simpler altenative to the above one-line script would be:
    #           head -c4 /dev/urandom| od -An -tu4

    exit 0

    See also Example 15-39.
```

#### 12.11.2.4.11 tail

```text
    lists the (tail) end of a file to stdout. The default is 10 lines, but this can be changed with the -n option. Commonly used to keep track of changes to a system logfile, using the -f option, which outputs lines appended to the file.

    Example 15-15. Using tail to monitor the system log

    #!/bin/bash

    filename=sys.log

    cat /dev/null > $filename; echo "Creating / cleaning out file."
    #  Creates file if it does not already exist,
    #+ and truncates it to zero length if it does.
    #  : > filename   and   > filename also work.

    tail /var/log/messages > $filename  
    # /var/log/messages must have world read permission for this to work.

    echo "$filename contains tail end of system log."

    exit 0

    Tip	To list a specific line of a text file, pipe the output of head to tail -n 1. For example head -n 8 database.txt | tail -n 1 lists the 8th line of the file database.txt.

    To set a variable to a given block of a text file:

    var=$(head -n $m $filename | tail -n $n)

    # filename = name of file
    # m = from beginning of file, number of lines to end of block
    # n = number of lines to set variable to (trim from end of block)

    Note	Newer implementations of tail deprecate the older tail -$LINES filename usage. The standard tail -n $LINES filename is correct.
```

#### 12.11.2.4.12 grep

```text
    A multi-purpose file search tool that uses Regular Expressions. It was originally a command/filter in the venerable ed line editor: g/re/p -- global - regular expression - print.

    grep pattern [file...]
    Search the target file(s) for occurrences of pattern, where pattern may be literal text or a Regular Expression.

    bash$ grep '[rst]ystem.$' osinfo.txt
    The GPL governs the distribution of the Linux operating system.
    	      

    If no target file(s) specified, grep works as a filter on stdout, as in a pipe.

    bash$ ps ax | grep clock
    765 tty1     S      0:00 xclock
     901 pts/1    S      0:00 grep clock
    	      

    The -i option causes a case-insensitive search.

    The -w option matches only whole words.

    The -l option lists only the files in which matches were found, but not the matching lines.

    The -r (recursive) option searches files in the current working directory and all subdirectories below it.

    The -n option lists the matching lines, together with line numbers.

    bash$ grep -n Linux osinfo.txt
    2:This is a file containing information about Linux.
     6:The GPL governs the distribution of the Linux operating system.
    	      

    The -v (or --invert-match) option filters out matches.

    grep pattern1 *.txt | grep -v pattern2

    # Matches all lines in "*.txt" files containing "pattern1",
    # but ***not*** "pattern2".	      

    The -c (--count) option gives a numerical count of matches, rather than actually listing the matches.

    grep -c txt *.sgml   # (number of occurrences of "txt" in "*.sgml" files)


    #   grep -cz .
    #            ^ dot
    # means count (-c) zero-separated (-z) items matching "."
    # that is, non-empty ones (containing at least 1 character).
    # 
    printf 'a b\nc  d\n\n\n\n\n\000\n\000e\000\000\nf' | grep -cz .     # 3
    printf 'a b\nc  d\n\n\n\n\n\000\n\000e\000\000\nf' | grep -cz '$'   # 5
    printf 'a b\nc  d\n\n\n\n\n\000\n\000e\000\000\nf' | grep -cz '^'   # 5
    #
    printf 'a b\nc  d\n\n\n\n\n\000\n\000e\000\000\nf' | grep -c '$'    # 9
    # By default, newline chars (\n) separate items to match. 

    # Note that the -z option is GNU "grep" specific.


    # Thanks, S.C.

    The --color (or --colour) option marks the matching string in color (on the console or in an xterm window). Since grep prints out each entire line containing the matching pattern, this lets you see exactly what is being matched. See also the -o option, which shows only the matching portion of the line(s).

    Example 15-16. Printing out the From lines in stored e-mail messages

    #!/bin/bash
    # from.sh

    #  Emulates the useful "from" utility in Solaris, BSD, etc.
    #  Echoes the "From" header line in all messages
    #+ in your e-mail directory.


    MAILDIR=~/mail/*               #  No quoting of variable. Why?
    GREP_OPTS="-H -A 5 --color"    #  Show file, plus extra context lines
                                   #+ and display "From" in color.
    TARGETSTR="^From"              # "From" at beginning of line.

    for file in $MAILDIR           #  No quoting of variable.
    do
      grep $GREP_OPTS "$TARGETSTR" "$file"
      #    ^^^^^^^^^^              #  Again, do not quote this variable.
      echo
    done

    exit $?

    #  Might wish to pipe the output of this script to 'more' or
    #+ redirect it to a file . . .

    When invoked with more than one target file given, grep specifies which file contains matches.

    bash$ grep Linux osinfo.txt misc.txt
    osinfo.txt:This is a file containing information about Linux.
     osinfo.txt:The GPL governs the distribution of the Linux operating system.
     misc.txt:The Linux operating system is steadily gaining in popularity.
    	      

    Tip	To force grep to show the filename when searching only one target file, simply give /dev/null as the second file.

    bash$ grep Linux osinfo.txt /dev/null
    osinfo.txt:This is a file containing information about Linux.
     osinfo.txt:The GPL governs the distribution of the Linux operating system.
```

#### 12.11.2.4.13 Use grep for conditions

```text
    If there is a successful match, grep returns an exit status of 0, which makes it useful in a condition test in a script, especially in combination with the -q option to suppress output.

    SUCCESS=0                      # if grep lookup succeeds
    word=Linux
    filename=data.file

    grep -q "$word" "$filename"    #  The "-q" option
                                   #+ causes nothing to echo to stdout.
    if [ $? -eq $SUCCESS ]
    # if grep -q "$word" "$filename"   can replace lines 5 - 7.
    then
      echo "$word found in $filename"
    else
      echo "$word not found in $filename"
    fi

    Example 29-6 demonstrates how to use grep to search for a word pattern in a system logfile.

    Example 15-17. Emulating grep in a script

    #!/bin/bash
    # grp.sh: Rudimentary reimplementation of grep.

    E_BADARGS=85

    if [ -z "$1" ]    # Check for argument to script.
    then
      echo "Usage: `basename $0` pattern"
      exit $E_BADARGS
    fi  

    echo

    for file in *     # Traverse all files in $PWD.
    do
      output=$(sed -n /"$1"/p $file)  # Command substitution.

      if [ ! -z "$output" ]           # What happens if "$output" is not quoted?
      then
        echo -n "$file: "
        echo "$output"
      fi              #  sed -ne "/$1/s|^|${file}: |p"  is equivalent to above.

      echo
    done  

    echo

    exit 0

    # Exercises:
    # ---------
    # 1) Add newlines to output, if more than one match in any given file.
    # 2) Add features.

    How can grep search for two (or more) separate patterns? What if you want grep to display all lines in a file or files that contain both "pattern1" and "pattern2"?

    One method is to pipe the result of grep pattern1 to grep pattern2.

    For example, given the following file:

    # Filename: tstfile

    This is a sample file.
    This is an ordinary text file.
    This file does not contain any unusual text.
    This file is not unusual.
    Here is some text.

    Now, let's search this file for lines containing both "file" and "text" . . .

    bash$ grep file tstfile
    # Filename: tstfile
     This is a sample file.
     This is an ordinary text file.
     This file does not contain any unusual text.
     This file is not unusual.

    bash$ grep file tstfile | grep text
    This is an ordinary text file.
     This file does not contain any unusual text.

    Now, for an interesting recreational use of grep . . .
```

#### 12.11.2.4.14 Example 15-18. Crossword puzzle solver

```text
    #!/bin/bash
    # cw-solver.sh
    # This is actually a wrapper around a one-liner (line 46).

    #  Crossword puzzle and anagramming word game solver.
    #  You know *some* of the letters in the word you're looking for,
    #+ so you need a list of all valid words
    #+ with the known letters in given positions.
    #  For example: w...i....n
    #               1???5????10
    # w in position 1, 3 unknowns, i in the 5th, 4 unknowns, n at the end.
    # (See comments at end of script.)


    E_NOPATT=71
    DICT=/usr/share/dict/word.lst
    #                    ^^^^^^^^   Looks for word list here.
    #  ASCII word list, one word per line.
    #  If you happen to need an appropriate list,
    #+ download the author's "yawl" word list package.
    #  http://ibiblio.org/pub/Linux/libs/yawl-0.3.2.tar.gz
    #  or
    #  http://personal.riverusers.com/~thegrendel/yawl-0.3.2.tar.gz


    if [ -z "$1" ]   #  If no word pattern specified
    then             #+ as a command-line argument . . .
      echo           #+ . . . then . . .
      echo "Usage:"  #+ Usage message.
      echo
      echo ""$0" \"pattern,\""
      echo "where \"pattern\" is in the form"
      echo "xxx..x.x..."
      echo
      echo "The x's represent known letters,"
      echo "and the periods are unknown letters (blanks)."
      echo "Letters and periods can be in any position."
      echo "For example, try:   sh cw-solver.sh w...i....n"
      echo
      exit $E_NOPATT
    fi

    echo
    # ===============================================
    # This is where all the work gets done.
    grep ^"$1"$ "$DICT"   # Yes, only one line!
    #    |    |
    # ^ is start-of-word regex anchor.
    # $ is end-of-word regex anchor.

    #  From _Stupid Grep Tricks_, vol. 1,
    #+ a book the ABS Guide author may yet get around
    #+ to writing . . . one of these days . . .
    # ===============================================
    echo


    exit $?  # Script terminates here.
    #  If there are too many words generated,
    #+ redirect the output to a file.

    $ sh cw-solver.sh w...i....n

    wellington
    workingman
    workingmen
```

#### 12.11.2.4.15 egrep

```text
				-- extended grep -- is the same as grep -E. This uses a somewhat different, extended set of Regular Expressions, which can make the search a bit more flexible. It also allows the boolean | (or) operator.

    bash $ egrep 'matches|Matches' file.txt
    Line 1 matches.
     Line 3 Matches.
     Line 4 contains matches, but also Matches
```

#### 12.11.2.4.16 fgrep

```text
				-- fast grep -- is the same as grep -F. It does a literal string search (no Regular Expressions), which generally speeds things up a bit.

    Note	On some Linux distros, egrep and fgrep are symbolic links to, or aliases for grep, but invoked with the -E and -F options, respectively.

    Example 15-19. Looking up definitions in Webster's 1913 Dictionary

    #!/bin/bash
    # dict-lookup.sh

    #  This script looks up definitions in the 1913 Webster's Dictionary.
    #  This Public Domain dictionary is available for download
    #+ from various sites, including
    #+ Project Gutenberg (http://www.gutenberg.org/etext/247).
    #
    #  Convert it from DOS to UNIX format (only LF at end of line)
    #+ before using it with this script.
    #  Store the file in plain, uncompressed ASCII.
    #  Set DEFAULT_DICTFILE variable below to path/filename.


    E_BADARGS=65
    MAXCONTEXTLINES=50                        # Maximum number of lines to show.
    DEFAULT_DICTFILE="/usr/share/dict/webster1913-dict.txt"
                                              # Default dictionary file pathname.
                                              # Change this as necessary.
    #  Note:
    #  ----
    #  This particular edition of the 1913 Webster's
    #+ begins each entry with an uppercase letter
    #+ (lowercase for the remaining characters).
    #  Only the *very first line* of an entry begins this way,
    #+ and that's why the search algorithm below works.



    if [[ -z $(echo "$1" | sed -n '/^[A-Z]/p') ]]
    #  Must at least specify word to look up, and
    #+ it must start with an uppercase letter.
    then
      echo "Usage: `basename $0` Word-to-define [dictionary-file]"
      echo
      echo "Note: Word to look up must start with capital letter,"
      echo "with the rest of the word in lowercase."
      echo "--------------------------------------------"
      echo "Examples: Abandon, Dictionary, Marking, etc."
      exit $E_BADARGS
    fi


    if [ -z "$2" ]                            #  May specify different dictionary
                                              #+ as an argument to this script.
    then
      dictfile=$DEFAULT_DICTFILE
    else
      dictfile="$2"
    fi

    # ---------------------------------------------------------
    Definition=$(fgrep -A $MAXCONTEXTLINES "$1 \\" "$dictfile")
    #                  Definitions in form "Word \..."
    #
    #  And, yes, "fgrep" is fast enough
    #+ to search even a very large text file.


    # Now, snip out just the definition block.

    echo "$Definition" |
    sed -n '1,/^[A-Z]/p' |
    #  Print from first line of output
    #+ to the first line of the next entry.
    sed '$d' | sed '$d'
    #  Delete last two lines of output
    #+ (blank line and first line of next entry).
    # ---------------------------------------------------------

    exit 0

    # Exercises:
    # ---------
    # 1)  Modify the script to accept any type of alphabetic input
    #   + (uppercase, lowercase, mixed case), and convert it
    #   + to an acceptable format for processing.
    #
    # 2)  Convert the script to a GUI application,
    #   + using something like 'gdialog' or 'zenity' . . .
    #     The script will then no longer take its argument(s)
    #   + from the command line.
    #
    # 3)  Modify the script to parse one of the other available
    #   + Public Domain Dictionaries, such as the U.S. Census Bureau Gazetteer.

    Note	See also Example A-43 for an example of speedy fgrep lookup on a large text file.
```

#### 12.11.2.4.17 agrep

```text
				(approximate grep) extends the capabilities of grep to approximate matching. The search string may differ by a specified number of characters from the resulting matches. This utility is not part of the core Linux distribution.

    Tip	To search compressed files, use zgrep, zegrep, or zfgrep. These also work on non-compressed files, though slower than plain grep, egrep, fgrep. They are handy for searching through a mixed set of files, some compressed, some not.

    To search bzipped files, use bzgrep.
```

#### 12.11.2.4.18 look

```text
    The command look works like grep, but does a lookup on a "dictionary," a sorted word list. By default, look searches for a match in /usr/dict/words, but a different dictionary file may be specified.

    Example 15-20. Checking words in a list for validity

    #!/bin/bash
    # lookup: Does a dictionary lookup on each word in a data file.

    file=words.data  # Data file from which to read words to test.

    echo

    while [ "$word" != end ]  # Last word in data file.
    do               # ^^^
      read word      # From data file, because of redirection at end of loop.
      look $word > /dev/null  # Don't want to display lines in dictionary file.
      lookup=$?      # Exit status of 'look' command.

      if [ "$lookup" -eq 0 ]
      then
        echo "\"$word\" is valid."
      else
        echo "\"$word\" is invalid."
      fi  

    done <"$file"    # Redirects stdin to $file, so "reads" come from there.

    echo

    exit 0

    # ----------------------------------------------------------------
    # Code below line will not execute because of "exit" command above.


    # Stephane Chazelas proposes the following, more concise alternative:

    while read word && [[ $word != end ]]
    do if look "$word" > /dev/null
       then echo "\"$word\" is valid."
       else echo "\"$word\" is invalid."
       fi
    done <"$file"

    exit 0
```

#### 12.11.2.4.19 sed, awk

```text
    Scripting languages especially suited for parsing text files and command output. May be embedded singly or in combination in pipes and shell scripts.
sed Non-interactive "stream editor", permits using many ex commands in batch mode. It finds many uses in shell scripts.
awk Programmable file extractor and formatter, good for manipulating and/or extracting fields (columns) in structured text files. Its syntax is similar to C.
```

#### 12.11.2.4.20 wc

```text
    wc gives a "word count" on a file or I/O stream:

    bash $ wc /usr/share/doc/sed-4.1.2/README
    13  70  447 README
    [13 lines  70 words  447 characters]

    wc -w gives only the word count.

    wc -l gives only the line count.

    wc -c gives only the byte count.

    wc -m gives only the character count.

    wc -L gives only the length of the longest line.

    Using wc to count how many .txt files are in current working directory:

    $ ls *.txt | wc -l
    #  Will work as long as none of the "*.txt" files
    #+ have a linefeed embedded in their name.

    #  Alternative ways of doing this are:
    #      find . -maxdepth 1 -name \*.txt -print0 | grep -cz .
    #      (shopt -s nullglob; set -- *.txt; echo $#)

    #  Thanks, S.C.

    Using wc to total up the size of all the files whose names begin with letters in the range d - h

    bash$ wc [d-h]* | grep total | awk '{print $3}'
    71832
    	      

    Using wc to count the instances of the word "Linux" in the main source file for this book.

    bash$ grep Linux abs-book.sgml | wc -l
    50
    	      


    Certain commands include some of the functionality of wc as options.

    ... | grep foo | wc -l
    # This frequently used construct can be more concisely rendered.

    ... | grep -c foo
    # Just use the "-c" (or "--count") option of grep.

    # Thanks, S.C.
```

#### 12.11.2.4.21 tr

```text
    character translation filter.

    Caution	Must use quoting and/or brackets, as appropriate. Quotes prevent the shell from reinterpreting the special characters in tr command sequences. Brackets should be quoted to prevent expansion by the shell.

    Either tr "A-Z" "*" <filename or tr A-Z \* <filename changes all the uppercase letters in filename to asterisks (writes to stdout). On some systems this may not work, but tr A-Z '[**]' will.

    The -d option deletes a range of characters.

    echo "abcdef"                 # abcdef
    echo "abcdef" | tr -d b-d     # aef


    tr -d 0-9 <filename
    # Deletes all digits from the file "filename".

    The --squeeze-repeats (or -s) option deletes all but the first instance of a string of consecutive characters. This option is useful for removing excess whitespace.

    bash$ echo "XXXXX" | tr --squeeze-repeats 'X'
    X

    The -c "complement" option inverts the character set to match. With this option, tr acts only upon those characters not matching the specified set.

    bash$ echo "acfdeb123" | tr -c b-d +
    +c+d+b++++

    Note that tr recognizes POSIX character classes. [1]

    bash$ echo "abcd2ef1" | tr '[:alpha:]' -
    ----2--1
```

#### 12.11.2.4.22 Example 15-21. toupper: Transforms a file to all uppercase.

```text
    #!/bin/bash
    # Changes a file to all uppercase.

    E_BADARGS=65

    if [ -z "$1" ]  # Standard check for command line arg.
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS
    fi  

    tr a-z A-Z <"$1"

    # Same effect as above, but using POSIX character set notation:
    #        tr '[:lower:]' '[:upper:]' <"$1"
    # Thanks, S.C.

    exit 0

    #  Exercise:
    #  Rewrite this script to give the option of changing a file
    #+ to *either* upper or lowercase.
```

#### 12.11.2.4.23 Example 15-22. lowercase: Changes all filenames in working directory to lowercase.

```text
    #!/bin/bash
    #
    #  Changes every filename in working directory to all lowercase.
    #
    #  Inspired by a script of John Dubois,
    #+ which was translated into Bash by Chet Ramey,
    #+ and considerably simplified by the author of the ABS Guide.


    for filename in *                # Traverse all files in directory.
    do
       fname=`basename $filename`
       n=`echo $fname | tr A-Z a-z`  # Change name to lowercase.
       if [ "$fname" != "$n" ]       # Rename only files not already lowercase.
       then
         mv $fname $n
       fi  
    done   

    exit $?


    # Code below this line will not execute because of "exit".
    #--------------------------------------------------------#
    # To run it, delete script above line.

    # The above script will not work on filenames containing blanks or newlines.
    # Stephane Chazelas therefore suggests the following alternative:


    for filename in *    # Not necessary to use basename,
                         # since "*" won't return any file containing "/".
    do n=`echo "$filename/" | tr '[:upper:]' '[:lower:]'`
    #                             POSIX char set notation.
    #                    Slash added so that trailing newlines are not
    #                    removed by command substitution.
       # Variable substitution:
       n=${n%/}          # Removes trailing slash, added above, from filename.
       [[ $filename == $n ]] || mv "$filename" "$n"
                         # Checks if filename already lowercase.
    done

    exit $?
```

#### 12.11.2.4.24 Example 15-23. du: DOS to UNIX text file conversion.

```text
    #!/bin/bash
    # Du.sh: DOS to UNIX text file converter.

    E_WRONGARGS=65

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` filename-to-convert"
      exit $E_WRONGARGS
    fi

    NEWFILENAME=$1.unx

    CR='\015'  # Carriage return.
               # 015 is octal ASCII code for CR.
               # Lines in a DOS text file end in CR-LF.
               # Lines in a UNIX text file end in LF only.

    tr -d $CR < $1 > $NEWFILENAME
    # Delete CR's and write to new file.

    echo "Original DOS text file is \"$1\"."
    echo "Converted UNIX text file is \"$NEWFILENAME\"."

    exit 0

    # Exercise:
    # --------
    # Change the above script to convert from UNIX to DOS.
```

#### 12.11.2.4.25 Example 15-24. rot13: ultra-weak encryption.

```text
    #!/bin/bash
    # rot13.sh: Classic rot13 algorithm,
    #           encryption that might fool a 3-year old.

    # Usage: ./rot13.sh filename
    # or     ./rot13.sh <filename
    # or     ./rot13.sh and supply keyboard input (stdin)

    cat "$@" | tr 'a-zA-Z' 'n-za-mN-ZA-M'   # "a" goes to "n", "b" to "o", etc.
    #  The 'cat "$@"' construction
    #+ permits getting input either from stdin or from files.

    exit 0
```

#### 12.11.2.4.26 Example 15-25. Generating "Crypto-Quote" Puzzles

```text
    #!/bin/bash
    # crypto-quote.sh: Encrypt quotes

    #  Will encrypt famous quotes in a simple monoalphabetic substitution.
    #  The result is similar to the "Crypto Quote" puzzles
    #+ seen in the Op Ed pages of the Sunday paper.


    key=ETAOINSHRDLUBCFGJMQPVWZYXK
    # The "key" is nothing more than a scrambled alphabet.
    # Changing the "key" changes the encryption.

    # The 'cat "$@"' construction gets input either from stdin or from files.
    # If using stdin, terminate input with a Control-D.
    # Otherwise, specify filename as command-line parameter.

    cat "$@" | tr "a-z" "A-Z" | tr "A-Z" "$key"
    #        |  to uppercase  |     encrypt       
    # Will work on lowercase, uppercase, or mixed-case quotes.
    # Passes non-alphabetic characters through unchanged.


    # Try this script with something like:
    # "Nothing so needs reforming as other people's habits."
    # --Mark Twain
    #
    # Output is:
    # "CFPHRCS QF CIIOQ MINFMBRCS EQ FPHIM GIFGUI'Q HETRPQ."
    # --BEML PZERC

    # To reverse the encryption:
    # cat "$@" | tr "$key" "A-Z"


    #  This simple-minded cipher can be broken by an average 12-year old
    #+ using only pencil and paper.

    exit 0

    #  Exercise:
    #  --------
    #  Modify the script so that it will either encrypt or decrypt,
    #+ depending on command-line argument(s).

    tr variants

    The tr utility has two historic variants. The BSD version does not use brackets (tr a-z A-Z), but the SysV one does (tr '[a-z]' '[A-Z]'). The GNU version of tr resembles the BSD one. 
```

#### 12.11.2.4.27 fold

```text
    A filter that wraps lines of input to a specified width. This is especially useful with the -s option, which breaks lines at word spaces.
```

#### 12.11.2.4.28 fmt

```text
    Simple-minded file formatter, used as a filter in a pipe to "wrap" long lines of text output.

    Example 15-26. Formatted file listing.

    #!/bin/bash

    WIDTH=40                    # 40 columns wide.

    b=`ls /usr/local/bin`       # Get a file listing...

    echo $b | fmt -w $WIDTH

    # Could also have been done by
    #    echo $b | fold - -s -w $WIDTH
     
    exit 0

    See also Example 15-5.

    Tip	A powerful alternative to fmt is Kamil Toman's par utility, available from http://www.cs.berkeley.edu/~amc/Par/. 
```

#### 12.11.2.4.29 col

```text
    This deceptively named filter removes reverse line feeds from an input stream. It also attempts to replace whitespace with equivalent tabs. The chief use of col is in filtering the output from certain text processing utilities, such as groff and tbl.
column

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
```

#### 12.11.2.4.30 colrm

```text
    Column removal filter. This removes columns (characters) from a file and writes the file, lacking the range of specified columns, back to stdout. colrm 2 4 <filename removes the second through fourth characters from each line of the text file filename.

    Caution	If the file contains tabs or nonprintable characters, this may cause unpredictable behavior. In such cases, consider using expand and unexpand in a pipe preceding colrm.
```

#### 12.11.2.4.31 nl

```text
    Line numbering filter: nl filename lists filename to stdout, but inserts consecutive numbers at the beginning of each non-blank line. If filename omitted, operates on stdin.

    The output of nl is very similar to cat -b, since, by default nl does not list blank lines.

    Example 15-28. nl: A self-numbering script.

    #!/bin/bash
    # line-number.sh

    # This script echoes itself twice to stdout with its lines numbered.

    # 'nl' sees this as line 4 since it does not number blank lines.
    # 'cat -n' sees the above line as number 6.

    nl `basename $0`

    echo; echo  # Now, let's try it with 'cat -n'

    cat -n `basename $0`
    # The difference is that 'cat -n' numbers the blank lines.
    # Note that 'nl -ba' will also do so.

    exit 0
    # -----------------------------------------------------------------
```

#### 12.11.2.4.32 pr

```text
    Print formatting filter. This will paginate files (or stdout) into sections suitable for hard copy printing or viewing on screen. Various options permit row and column manipulation, joining lines, setting margins, numbering lines, adding page headers, and merging files, among other things. The pr command combines much of the functionality of nl, paste, fold, column, and expand.

    pr -o 5 --width=65 fileZZZ | more gives a nice paginated listing to screen of fileZZZ with margins set at 5 and 65.

    A particularly useful option is -d, forcing double-spacing (same effect as sed -G).
```

#### 12.11.2.4.33 gettext

```text
    The GNU gettext package is a set of utilities for localizing and translating the text output of programs into foreign languages. While originally intended for C programs, it now supports quite a number of programming and scripting languages.

    The gettext program works on shell scripts. See the info page.
```

#### 12.11.2.4.34 msgfmt

```text
    A program for generating binary message catalogs. It is used for localization.
```

#### 12.11.2.4.35 iconv

```text
    A utility for converting file(s) to a different encoding (character set). Its chief use is for localization.

    # Convert a string from UTF-8 to UTF-16 and print to the BookList
    function write_utf8_string {
        STRING=$1
        BOOKLIST=$2
        echo -n "$STRING" | iconv -f UTF8 -t UTF16 | \
        cut -b 3- | tr -d \\n >> "$BOOKLIST"
    }

    #  From Peter Knowles' "booklistgen.sh" script
    #+ for converting files to Sony Librie/PRS-50X format.
    #  (http://booklistgensh.peterknowles.com)
```

#### 12.11.2.4.36 recode

```text
    Consider this a fancier version of iconv, above. This very versatile utility for converting a file to a different encoding scheme. Note that recode is not part of the standard Linux installation.
```

#### 12.11.2.4.37 TeX, gs

```text
    TeX and Postscript are text markup languages used for preparing copy for printing or formatted video display.

    TeX is Donald Knuth's elaborate typsetting system. It is often convenient to write a shell script encapsulating all the options and arguments passed to one of these markup languages.

    Ghostscript (gs) is a GPL-ed Postscript interpreter.
```

#### 12.11.2.4.38 texexec

```text
    Utility for processing TeX and pdf files. Found in /usr/bin on many Linux distros, it is actually a shell wrapper that calls Perl to invoke Tex.

    texexec --pdfarrange --result=Concatenated.pdf *pdf

    #  Concatenates all the pdf files in the current working directory
    #+ into the merged file, Concatenated.pdf . . .
    #  (The --pdfarrange option repaginates a pdf file. See also --pdfcombine.)
    #  The above command line could be parameterized and put into a shell script.
```

#### 12.11.2.4.39 enscript

```text
    Utility for converting plain text file to PostScript

    For example, enscript filename.txt -p filename.ps produces the PostScript output file filename.ps.
```

#### 12.11.2.4.40 groff, tbl, eqn

```text
    Yet another text markup and display formatting language is groff. This is the enhanced GNU version of the venerable UNIX roff/troff display and typesetting package. Manpages use groff.

    The tbl table processing utility is considered part of groff, as its function is to convert table markup into groff commands.

    The eqn equation processing utility is likewise part of groff, and its function is to convert equation markup into groff commands.

    Example 15-29. manview: Viewing formatted manpages

    #!/bin/bash
    # manview.sh: Formats the source of a man page for viewing.

    #  This script is useful when writing man page source.
    #  It lets you look at the intermediate results on the fly
    #+ while working on it.

    E_WRONGARGS=85

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` filename"
      exit $E_WRONGARGS
    fi

    # ---------------------------
    groff -Tascii -man $1 | less
    # From the man page for groff.
    # ---------------------------

    #  If the man page includes tables and/or equations,
    #+ then the above code will barf.
    #  The following line can handle such cases.
    #
    #   gtbl < "$1" | geqn -Tlatin1 | groff -Tlatin1 -mtty-char -man
    #
    #   Thanks, S.C.

    exit 0

    See also Example A-41.
```

#### 12.11.2.4.41 lex, yacc

```text
    The lex lexical analyzer produces programs for pattern matching. This has been replaced by the nonproprietary flex on Linux systems.

    The yacc utility creates a parser based on a set of specifications. This has been replaced by the nonproprietary bison on Linux systems.
```

#### 12.11.2.5 File and Archiving Commands

```text
Archiving
```

#### 12.11.2.5.1 tar

```text
    The standard UNIX archiving utility. [1] Originally a Tape ARchiving program, it has developed into a general purpose package that can handle all manner of archiving with all types of destination devices, ranging from tape drives to regular files to even stdout (see Example 3-4). GNU tar has been patched to accept various compression filters, for example: tar czvf archive_name.tar.gz *, which recursively archives and gzips all files in a directory tree except dotfiles in the current working directory ($PWD). [2]

    Some useful tar options:

|       1.  -c create (a new archive)
|       2.  -x extract (files from existing archive)
|       3.  --delete delete (files from existing archive)
|
|          Caution	This option will not work on magnetic tape devices.
|       4.  -r append (files to existing archive)
|       5.  -A append (tar files to existing archive)
|       6.  -t list (contents of existing archive)
|       7.  -u update archive
|       8.  -d compare archive with specified filesystem
|       9.  --after-date only process files with a date stamp after specified date
|      10.  -z gzip the archive
|(compress or uncompress, depending on whether combined with the -c or -x) option
|      11.  -j bzip2 the archive

    Caution	It may be difficult to recover data from a corrupted gzipped tar archive. When archiving important files, make multiple backups.
```

#### 12.11.2.5.2 shar

```text
    Shell archiving utility. The files in a shell archive are concatenated without compression, and the resultant archive is essentially a shell script, complete with #!/bin/sh header, and containing all the necessary unarchiving commands. Shar archives still show up in Usenet newsgroups, but otherwise shar has been pretty well replaced by tar/gzip. The unshar command unpacks shar archives.
```

#### 12.11.2.5.3 ar

```text
    Creation and manipulation utility for archives, mainly used for binary object file libraries.
```

#### 12.11.2.5.4 rpm

```text
    The Red Hat Package Manager, or rpm utility provides a wrapper for source or binary archives. It includes commands for installing and checking the integrity of packages, among other things.

    A simple rpm -i package_name.rpm usually suffices to install a package, though there are many more options available.

    Tip	rpm -qf identifies which package a file originates from.

    bash$ rpm -qf /bin/ls
    coreutils-5.2.1-31
    	      

    Tip	rpm -qa gives a complete list of all installed rpm packages on a given system. An rpm -qa package_name lists only the package(s) corresponding to package_name.

    bash$ rpm -qa
    redhat-logos-1.1.3-1
     glibc-2.2.4-13
     cracklib-2.7-12
     dosfstools-2.7-1
     gdbm-1.8.0-10
     ksymoops-2.4.1-1
     mktemp-1.5-11
     perl-5.6.0-17
     reiserfs-utils-3.x.0j-2
     ...


    bash$ rpm -qa docbook-utils
    docbook-utils-0.6.9-2


    bash$ rpm -qa docbook | grep docbook
    docbook-dtd31-sgml-1.0-10
     docbook-style-dsssl-1.64-3
     docbook-dtd30-sgml-1.0-10
     docbook-dtd40-sgml-1.0-11
     docbook-utils-pdf-0.6.9-2
     docbook-dtd41-sgml-1.0-10
     docbook-utils-0.6.9-2
```

#### 12.11.2.5.5 cpio

```text
    This specialized archiving copy command (copy input and output) is rarely seen any more, having been supplanted by tar/gzip. It still has its uses, such as moving a directory tree. With an appropriate block size (for copying) specified, it can be appreciably faster than tar.
```

#### 12.11.2.5.6 Example 15-30. Using cpio to move a directory tree

```text
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
```

#### 12.11.2.5.7 rpm2cpio

```text
    This command extracts a cpio archive from an rpm one.

    Example 15-31. Unpacking an rpm archive

    #!/bin/bash
    # de-rpm.sh: Unpack an 'rpm' archive

    : ${1?"Usage: `basename $0` target-file"}
    # Must specify 'rpm' archive name as an argument.


    TEMPFILE=$$.cpio                         #  Tempfile with "unique" name.
                                             #  $$ is process ID of script.

    rpm2cpio < $1 > $TEMPFILE                #  Converts rpm archive into
                                             #+ cpio archive.
    cpio --make-directories -F $TEMPFILE -i  #  Unpacks cpio archive.
    rm -f $TEMPFILE                          #  Deletes cpio archive.

    exit 0

    #  Exercise:
    #  Add check for whether 1) "target-file" exists and
    #+                       2) it is an rpm archive.
    #  Hint:                    Parse output of 'file' command.

Compression
```

#### 12.11.2.5.8 gzip

```text
    The standard GNU/UNIX compression utility, replacing the inferior and proprietary compress. The corresponding decompression command is gunzip, which is the equivalent of gzip -d.

    Note	The -c option sends the output of gzip to stdout. This is useful when piping to other commands.

    The zcat filter decompresses a gzipped file to stdout, as possible input to a pipe or redirection. This is, in effect, a cat command that works on compressed files (including files processed with the older compress utility). The zcat command is equivalent to gzip -dc.

    Caution	On some commercial UNIX systems, zcat is a synonym for uncompress -c, and will not work on gzipped files.
```

#### 12.11.2.5.9 bzip2

```text
    An alternate compression utility, usually more efficient (but slower) than gzip, especially on large files. The corresponding decompression command is bunzip2.

    Note	Newer versions of tar have been patched with bzip2 support.
```

#### 12.11.2.5.10 compress, uncompress

```text
    This is an older, proprietary compression utility found in commercial UNIX distributions. The more efficient gzip has largely replaced it. Linux distributions generally include a compress workalike for compatibility, although gunzip can unarchive files treated with compress.

    Tip	The znew command transforms compressed files into gzipped ones.
```

#### 12.11.2.5.11 sq

```text
    Yet another compression (squeeze) utility, a filter that works only on sorted ASCII word lists. It uses the standard invocation syntax for a filter, sq < input-file > output-file. Fast, but not nearly as efficient as gzip. The corresponding uncompression filter is unsq, invoked like sq.

    Tip	The output of sq may be piped to gzip for further compression.
```

#### 12.11.2.5.12 zip, unzip

```text
    Cross-platform file archiving and compression utility compatible with DOS pkzip.exe. "Zipped" archives seem to be a more common medium of file exchange on the Internet than "tarballs."
unarc, unarj, unrar

    These Linux utilities permit unpacking archives compressed with the DOS arc.exe, arj.exe, and rar.exe programs.
lzma, unlzma, lzcat

    Highly efficient Lempel-Ziv-Markov compression. The syntax of lzma is similar to that of gzip. The 7-zip Website has more information.

File Information
```

#### 12.11.2.5.13 file

```text
    A utility for identifying file types. The command file file-name will return a file specification for file-name, such as ascii text or data. It references the magic numbers found in /usr/share/magic, /etc/magic, or /usr/lib/magic, depending on the Linux/UNIX distribution.

    The -f option causes file to run in batch mode, to read from a designated file a list of filenames to analyze. The -z option, when used on a compressed target file, forces an attempt to analyze the uncompressed file type.

    bash$ file test.tar.gz
    test.tar.gz: gzip compressed data, deflated,
     last modified: Sun Sep 16 13:34:51 2001, os: Unix

    bash file -z test.tar.gz
    test.tar.gz: GNU tar archive (gzip compressed data, deflated,
     last modified: Sun Sep 16 13:34:51 2001, os: Unix)
    	      

    # Find sh and Bash scripts in a given directory:

    DIRECTORY=/usr/local/bin
    KEYWORD=Bourne
    # Bourne and Bourne-Again shell scripts

    file $DIRECTORY/* | fgrep $KEYWORD

    # Output:

    # /usr/local/bin/burn-cd:          Bourne-Again shell script text executable
    # /usr/local/bin/burnit:           Bourne-Again shell script text executable
    # /usr/local/bin/cassette.sh:      Bourne shell script text executable
    # /usr/local/bin/copy-cd:          Bourne-Again shell script text executable
    # . . .

    Example 15-32. Stripping comments from C program files

    #!/bin/bash
    # strip-comment.sh: Strips out the comments (/* COMMENT */) in a C program.

    E_NOARGS=0
    E_ARGERROR=66
    E_WRONG_FILE_TYPE=67

    if [ $# -eq "$E_NOARGS" ]
    then
      echo "Usage: `basename $0` C-program-file" >&2 # Error message to stderr.
      exit $E_ARGERROR
    fi  

    # Test for correct file type.
    type=`file $1 | awk '{ print $2, $3, $4, $5 }'`
    # "file $1" echoes file type . . .
    # Then awk removes the first field, the filename . . .
    # Then the result is fed into the variable "type."
    correct_type="ASCII C program text"

    if [ "$type" != "$correct_type" ]
    then
      echo
      echo "This script works on C program files only."
      echo
      exit $E_WRONG_FILE_TYPE
    fi  


    # Rather cryptic sed script:
    #--------
    sed '
    /^\/\*/d
    /.*\*\//d
    ' $1
    #--------
    # Easy to understand if you take several hours to learn sed fundamentals.


    #  Need to add one more line to the sed script to deal with
    #+ case where line of code has a comment following it on same line.
    #  This is left as a non-trivial exercise.

    #  Also, the above code deletes non-comment lines with a "*/" . . .
    #+ not a desirable result.

    exit 0


    # ----------------------------------------------------------------
    # Code below this line will not execute because of 'exit 0' above.

    # Stephane Chazelas suggests the following alternative:

    usage() {
      echo "Usage: `basename $0` C-program-file" >&2
      exit 1
    }

    WEIRD=`echo -n -e '\377'`   # or WEIRD=$'\377'
    [[ $# -eq 1 ]] || usage
    case `file "$1"` in
      *"C program text"*) sed -e "s%/\*%${WEIRD}%g;s%\*/%${WEIRD}%g" "$1" \
         | tr '\377\n' '\n\377' \
         | sed -ne 'p;n' \
         | tr -d '\n' | tr '\377' '\n';;
      *) usage;;
    esac

    #  This is still fooled by things like:
    #  printf("/*");
    #  or
    #  /*  /* buggy embedded comment */
    #
    #  To handle all special cases (comments in strings, comments in string
    #+ where there is a \", \\" ...),
    #+ the only way is to write a C parser (using lex or yacc perhaps?).

    exit 0
```

#### 12.11.2.5.14 which

```text
    which command gives the full path to "command." This is useful for finding out whether a particular command or utility is installed on the system.

    $bash which rm

    /usr/bin/rm
```

#### 12.11.2.5.15 whereis

```text
    Similar to which, above, whereis command gives the full path to "command," but also to its manpage.

    $bash whereis rm

    rm: /bin/rm /usr/share/man/man1/rm.1.bz2
```

#### 12.11.2.5.16 whatis

```text
    whatis command looks up "command" in the whatis database. This is useful for identifying system commands and important configuration files. Consider it a simplified man command.

    $bash whatis whatis

    whatis               (1)  - search the whatis database for complete words

    Example 15-33. Exploring /usr/X11R6/bin

    #!/bin/bash

    # What are all those mysterious binaries in /usr/X11R6/bin?

    DIRECTORY="/usr/X11R6/bin"
    # Try also "/bin", "/usr/bin", "/usr/local/bin", etc.

    for file in $DIRECTORY/*
    do
      whatis `basename $file`   # Echoes info about the binary.
    done

    exit 0

    # You may wish to redirect output of this script, like so:
    # ./what.sh >>whatis.db
    # or view it a page at a time on stdout,
    # ./what.sh | less

    See also Example 10-3.
```

#### 12.11.2.5.17 vdir

```text
    Show a detailed directory listing. The effect is similar to ls -lb.

    This is one of the GNU fileutils.

    bash$ vdir
    total 10
     -rw-r--r--    1 bozo  bozo      4034 Jul 18 22:04 data1.xrolo
     -rw-r--r--    1 bozo  bozo      4602 May 25 13:58 data1.xrolo.bak
     -rw-r--r--    1 bozo  bozo       877 Dec 17  2000 employment.xrolo

    bash ls -l
    total 10
     -rw-r--r--    1 bozo  bozo      4034 Jul 18 22:04 data1.xrolo
     -rw-r--r--    1 bozo  bozo      4602 May 25 13:58 data1.xrolo.bak
     -rw-r--r--    1 bozo  bozo       877 Dec 17  2000 employment.xrolo
```

#### 12.11.2.5.18 locate, slocate

```text
    The locate command searches for files using a database stored for just that purpose. The slocate command is the secure version of locate (which may be aliased to slocate).

    $bash locate hickson

    /usr/lib/xephem/catalogs/hickson.edb
```

#### 12.11.2.5.19 readlink

```text
    Disclose the file that a symbolic link points to.

    bash$ readlink /usr/bin/awk
    ../../bin/gawk
```

#### 12.11.2.5.20 strings

```text
    Use the strings command to find printable strings in a binary or data file. It will list sequences of printable characters found in the target file. This might be handy for a quick 'n dirty examination of a core dump or for looking at an unknown graphic image file (strings image-file | more might show something like JFIF, which would identify the file as a jpeg graphic). In a script, you would probably parse the output of strings with grep or sed. See Example 10-7 and Example 10-9.

    Example 15-34. An "improved" strings command

    #!/bin/bash
    # wstrings.sh: "word-strings" (enhanced "strings" command)
    #
    #  This script filters the output of "strings" by checking it
    #+ against a standard word list file.
    #  This effectively eliminates gibberish and noise,
    #+ and outputs only recognized words.

    # ===========================================================
    #                 Standard Check for Script Argument(s)
    ARGS=1
    E_BADARGS=65
    E_NOFILE=66

    if [ $# -ne $ARGS ]
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS
    fi

    if [ ! -f "$1" ]                      # Check if file exists.
    then
        echo "File \"$1\" does not exist."
        exit $E_NOFILE
    fi
    # ===========================================================


    MINSTRLEN=3                           #  Minimum string length.
    WORDFILE=/usr/share/dict/linux.words  #  Dictionary file.
    #  May specify a different word list file
    #+ of one-word-per-line format.
    #  For example, the "yawl" word-list package,
    #  http://personal.riverusers.com/~thegrendel/yawl-0.3.2.tar.gz


    wlist=`strings "$1" | tr A-Z a-z | tr '[:space:]' Z | \
    tr -cs '[:alpha:]' Z | tr -s '\173-\377' Z | tr Z ' '`

    # Translate output of 'strings' command with multiple passes of 'tr'.
    #  "tr A-Z a-z"  converts to lowercase.
    #  "tr '[:space:]'"  converts whitespace characters to Z's.
    #  "tr -cs '[:alpha:]' Z"  converts non-alphabetic characters to Z's,
    #+ and squeezes multiple consecutive Z's.
    #  "tr -s '\173-\377' Z"  converts all characters past 'z' to Z's
    #+ and squeezes multiple consecutive Z's,
    #+ which gets rid of all the weird characters that the previous
    #+ translation failed to deal with.
    #  Finally, "tr Z ' '" converts all those Z's to whitespace,
    #+ which will be seen as word separators in the loop below.

    #  ****************************************************************
    #  Note the technique of feeding the output of 'tr' back to itself,
    #+ but with different arguments and/or options on each pass.
    #  ****************************************************************


    for word in $wlist                    # Important:
                                          # $wlist must not be quoted here.
                                          # "$wlist" does not work.
                                          # Why not?
    do

      strlen=${#word}                     # String length.
      if [ "$strlen" -lt "$MINSTRLEN" ]   # Skip over short strings.
      then
        continue
      fi

      grep -Fw $word "$WORDFILE"          #  Match whole words only.
    #      ^^^                            #  "Fixed strings" and
                                          #+ "whole words" options. 

    done  


    exit $?

Comparison
```

#### 12.11.2.5.21 diff, patch

```text
    diff: flexible file comparison utility. It compares the target files line-by-line sequentially. In some applications, such as comparing word dictionaries, it may be helpful to filter the files through sort and uniq before piping them to diff. diff file-1 file-2 outputs the lines in the files that differ, with carets showing which file each particular line belongs to.

    The --side-by-side option to diff outputs each compared file, line by line, in separate columns, with non-matching lines marked. The -c and -u options likewise make the output of the command easier to interpret.

    There are available various fancy frontends for diff, such as sdiff, wdiff, xdiff, and mgdiff.

    Tip	The diff command returns an exit status of 0 if the compared files are identical, and 1 if they differ. This permits use of diff in a test construct within a shell script (see below).

    A common use for diff is generating difference files to be used with patch The -e option outputs files suitable for ed or ex scripts.

    patch: flexible versioning utility. Given a difference file generated by diff, patch can upgrade a previous version of a package to a newer version. It is much more convenient to distribute a relatively small "diff" file than the entire body of a newly revised package. Kernel "patches" have become the preferred method of distributing the frequent releases of the Linux kernel.

    patch -p1 <patch-file
    # Takes all the changes listed in 'patch-file'
    # and applies them to the files referenced therein.
    # This upgrades to a newer version of the package.

    Patching the kernel:

    cd /usr/src
    gzip -cd patchXX.gz | patch -p0
    # Upgrading kernel source using 'patch'.
    # From the Linux kernel docs "README",
    # by anonymous author (Alan Cox?).

    Note	The diff command can also recursively compare directories (for the filenames present).

    bash$ diff -r ~/notes1 ~/notes2
    Only in /home/bozo/notes1: file02
     Only in /home/bozo/notes1: file03
     Only in /home/bozo/notes2: file04
    	      

    Tip	Use zdiff to compare gzipped files.

    Tip	Use diffstat to create a histogram (point-distribution graph) of output from diff.
```

#### 12.11.2.5.22 diff3, merge

```text
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
```

#### 12.11.2.5.23 sdiff

```text
    Compare and/or edit two files in order to merge them into an output file. Because of its interactive nature, this command would find little use in a script.
```

#### 12.11.2.5.24 cmp

```text
    The cmp command is a simpler version of diff, above. Whereas diff reports the differences between two files, cmp merely shows at what point they differ.

    Note	Like diff, cmp returns an exit status of 0 if the compared files are identical, and 1 if they differ. This permits use in a test construct within a shell script.

    Example 15-35. Using cmp to compare two files within a script.

    #!/bin/bash

    ARGS=2  # Two args to script expected.
    E_BADARGS=65
    E_UNREADABLE=66

    if [ $# -ne "$ARGS" ]
    then
      echo "Usage: `basename $0` file1 file2"
      exit $E_BADARGS
    fi

    if [[ ! -r "$1" || ! -r "$2" ]]
    then
      echo "Both files to be compared must exist and be readable."
      exit $E_UNREADABLE
    fi

    cmp $1 $2 &> /dev/null  # /dev/null buries the output of the "cmp" command.
    #   cmp -s $1 $2  has same result ("-s" silent flag to "cmp")
    #   Thank you  Anders Gustavsson for pointing this out.
    #
    # Also works with 'diff', i.e.,   diff $1 $2 &> /dev/null

    if [ $? -eq 0 ]         # Test exit status of "cmp" command.
    then
      echo "File \"$1\" is identical to file \"$2\"."
    else  
      echo "File \"$1\" differs from file \"$2\"."
    fi

    exit 0

    Tip	Use zcmp on gzipped files.
```

#### 12.11.2.5.25 comm

```text
    Versatile file comparison utility. The files must be sorted for this to be useful.

    comm -options first-file second-file

    comm file-1 file-2 outputs three columns:

        * column 1 = lines unique to file-1
        * column 2 = lines unique to file-2
        * column 3 = lines common to both.

    The options allow suppressing output of one or more columns.

        * -1 suppresses column 1
        * -2 suppresses column 2
        * -3 suppresses column 3
        * -12 suppresses both columns 1 and 2, etc.

    This command is useful for comparing "dictionaries" or word lists -- sorted text files with one word per line.

Utilities
```

#### 12.11.2.5.26 basename

```text
    Strips the path information from a file name, printing only the file name. The construction basename $0 lets the script know its name, that is, the name it was invoked by. This can be used for "usage" messages if, for example a script is called with missing arguments:

    echo "Usage: `basename $0` arg1 arg2 ... argn"
```

#### 12.11.2.5.27 dirname

```text
    Strips the basename from a filename, printing only the path information.

    Note	basename and dirname can operate on any arbitrary string. The argument does not need to refer to an existing file, or even be a filename for that matter (see Example A-7).

    Example 15-36. basename and dirname

    #!/bin/bash

    a=/home/bozo/daily-journal.txt

    echo "Basename of /home/bozo/daily-journal.txt = `basename $a`"
    echo "Dirname of /home/bozo/daily-journal.txt = `dirname $a`"
    echo
    echo "My own home is `basename ~/`."         # `basename ~` also works.
    echo "The home of my home is `dirname ~/`."  # `dirname ~`  also works.

    exit 0
```

#### 12.11.2.5.28 split, csplit

```text
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

Encoding and Encryption
```

#### 12.11.2.5.29 sum, cksum, md5sum, sha1sum

```text
    These are utilities for generating checksums. A checksum is a number mathematically calculated from the contents of a file, for the purpose of checking its integrity. A script might refer to a list of checksums for security purposes, such as ensuring that the contents of key system files have not been altered or corrupted. For security applications, use the md5sum (message digest 5 checksum) command, or better yet, the newer sha1sum (Secure Hash Algorithm).

    bash$ cksum /boot/vmlinuz
    1670054224 804083 /boot/vmlinuz

    bash$ echo -n "Top Secret" | cksum
    3391003827 10



    bash$ md5sum /boot/vmlinuz
    0f43eccea8f09e0a0b2b5cf1dcf333ba  /boot/vmlinuz

    bash$ echo -n "Top Secret" | md5sum
    8babc97a6f62a4649716f4df8d61728f  -
    	      

    Note	The cksum command shows the size, in bytes, of its target, whether file or stdout.

    The md5sum and sha1sum commands display a dash when they receive their input from stdout.

    Example 15-38. Checking file integrity

    #!/bin/bash
    # file-integrity.sh: Checking whether files in a given directory
    #                    have been tampered with.

    E_DIR_NOMATCH=70
    E_BAD_DBFILE=71

    dbfile=File_record.md5
    # Filename for storing records (database file).


    set_up_database ()
    {
      echo ""$directory"" > "$dbfile"
      # Write directory name to first line of file.
      md5sum "$directory"/* >> "$dbfile"
      # Append md5 checksums and filenames.
    }

    check_database ()
    {
      local n=0
      local filename
      local checksum

      # ------------------------------------------- #
      #  This file check should be unnecessary,
      #+ but better safe than sorry.

      if [ ! -r "$dbfile" ]
      then
        echo "Unable to read checksum database file!"
        exit $E_BAD_DBFILE
      fi
      # ------------------------------------------- #

      while read record[n]
      do

        directory_checked="${record[0]}"
        if [ "$directory_checked" != "$directory" ]
        then
          echo "Directories do not match up!"
          # Tried to use file for a different directory.
          exit $E_DIR_NOMATCH
        fi

        if [ "$n" -gt 0 ]   # Not directory name.
        then
          filename[n]=$( echo ${record[$n]} | awk '{ print $2 }' )
          #  md5sum writes records backwards,
          #+ checksum first, then filename.
          checksum[n]=$( md5sum "${filename[n]}" )


          if [ "${record[n]}" = "${checksum[n]}" ]
          then
            echo "${filename[n]} unchanged."

          elif [ "`basename ${filename[n]}`" != "$dbfile" ]
                 #  Skip over checksum database file,
                 #+ as it will change with each invocation of script.
    	     #  ---
    	     #  This unfortunately means that when running
    	     #+ this script on $PWD, tampering with the
    	     #+ checksum database file will not be detected.
    	     #  Exercise: Fix this.
    	then
              echo "${filename[n]} : CHECKSUM ERROR!"
            # File has been changed since last checked.
          fi

          fi



        let "n+=1"
      done <"$dbfile"       # Read from checksum database file. 

    }  

    # =================================================== #
    # main ()

    if [ -z  "$1" ]
    then
      directory="$PWD"      #  If not specified,
    else                    #+ use current working directory.
      directory="$1"
    fi  

    clear                   # Clear screen.
    echo " Running file integrity check on $directory"
    echo

    # ------------------------------------------------------------------ #
      if [ ! -r "$dbfile" ] # Need to create database file?
      then
        echo "Setting up database file, \""$directory"/"$dbfile"\"."; echo
        set_up_database
      fi  
    # ------------------------------------------------------------------ #

    check_database          # Do the actual work.

    echo 

    #  You may wish to redirect the stdout of this script to a file,
    #+ especially if the directory checked has many files in it.

    exit 0

    #  For a much more thorough file integrity check,
    #+ consider the "Tripwire" package,
    #+ http://sourceforge.net/projects/tripwire/.

    Also see Example A-20, Example 33-14, and Example 9-11 for creative uses of the md5sum command.

    Note	There have been reports that the 128-bit md5sum can be cracked, so the more secure 160-bit sha1sum is a welcome new addition to the checksum toolkit.

    bash$ md5sum testfile
    e181e2c8720c60522c4c4c981108e367  testfile


    bash$ sha1sum testfile
    5d7425a9c08a66c3177f1e31286fa40986ffc996  testfile
    	      

    Security consultants have demonstrated that even sha1sum can be compromised. Fortunately, newer Linux distros include longer bit-length sha224sum, sha256sum, sha384sum, and sha512sum commands.
```

#### 12.11.2.5.30 shred

```text
    Securely erase a file by overwriting it multiple times with random bit patterns before deleting it. This command has the same effect as Example 15-60, but does it in a more thorough and elegant manner.

    This is one of the GNU fileutils.

    Caution	Advanced forensic technology may still be able to recover the contents of a file, even after application of shred.
```

#### 12.11.2.5.31 uuencode

```text
    This utility encodes binary files (images, sound files, compressed files, etc.) into ASCII characters, making them suitable for transmission in the body of an e-mail message or in a newsgroup posting. This is especially useful where MIME (multimedia) encoding is not available.
```

#### 12.11.2.5.32 uudecode

```text
    This reverses the encoding, decoding uuencoded files back into the original binaries.

    Example 15-39. Uudecoding encoded files

    #!/bin/bash
    # Uudecodes all uuencoded files in current working directory.

    lines=35        # Allow 35 lines for the header (very generous).

    for File in *   # Test all the files in $PWD.
    do
      search1=`head -n $lines $File | grep begin | wc -w`
      search2=`tail -n $lines $File | grep end | wc -w`
      #  Uuencoded files have a "begin" near the beginning,
      #+ and an "end" near the end.
      if [ "$search1" -gt 0 ]
      then
        if [ "$search2" -gt 0 ]
        then
          echo "uudecoding - $File -"
          uudecode $File
        fi  
      fi
    done  

    #  Note that running this script upon itself fools it
    #+ into thinking it is a uuencoded file,
    #+ because it contains both "begin" and "end".

    #  Exercise:
    #  --------
    #  Modify this script to check each file for a newsgroup header,
    #+ and skip to next if not found.

    exit 0

    Tip	The fold -s command may be useful (possibly in a pipe) to process long uudecoded text messages downloaded from Usenet newsgroups.
```

#### 12.11.2.5.33 mimencode, mmencode

```text
    The mimencode and mmencode commands process multimedia-encoded e-mail attachments. Although mail user agents (such as pine or kmail) normally handle this automatically, these particular utilities permit manipulating such attachments manually from the command line or in batch processing mode by means of a shell script.
```

#### 12.11.2.5.34 crypt

```text
    At one time, this was the standard UNIX file encryption utility. [3] Politically motivated government regulations prohibiting the export of encryption software resulted in the disappearance of crypt from much of the UNIX world, and it is still missing from most Linux distributions. Fortunately, programmers have come up with a number of decent alternatives to it, among them the author's very own cruft (see Example A-4). 

    ccrypt is also a great utility available under cygwin.

Miscellaneous
```

#### 12.11.2.5.35 mktemp

```text
    Create a temporary file [4] with a "unique" filename. When invoked from the command line without additional arguments, it creates a zero-length file in the /tmp directory.

    bash$ mktemp
    /tmp/tmp.zzsvql3154
    	      

    PREFIX=filename
    tempfile=`mktemp $PREFIX.XXXXXX`
    #                        ^^^^^^ Need at least 6 placeholders
    #+                              in the filename template.
    #   If no filename template supplied,
    #+ "tmp.XXXXXXXXXX" is the default.

    echo "tempfile name = $tempfile"
    # tempfile name = filename.QA2ZpY
    #                 or something similar...

    #  Creates a file of that name in the current working directory
    #+ with 600 file permissions.
    #  A "umask 177" is therefore unnecessary,
    #+ but it's good programming practice anyhow.
```

#### 12.11.2.5.36 make

```text
    Utility for building and compiling binary packages. This can also be used for any set of operations that is triggered by incremental changes in source files.

    The make command checks a Makefile, a list of file dependencies and operations to be carried out.

    The make utility is, in effect, a powerful scripting language similar in many ways to Bash, but with the capability of recognizing dependencies. For in-depth coverage of this useful tool set, see the GNU software documentation site.
```

#### 12.11.2.5.37 install

```text
    Special purpose file copying command, similar to cp, but capable of setting permissions and attributes of the copied files. This command seems tailormade for installing software packages, and as such it shows up frequently in Makefiles (in the make install : section). It could likewise find use in installation scripts.
```

#### 12.11.2.5.38 dos2unix

```text
    This utility, written by Benjamin Lin and collaborators, converts DOS-formatted text files (lines terminated by CR-LF) to UNIX format (lines terminated by LF only), and vice-versa.
```

#### 12.11.2.5.39 ptx

```text
    The ptx [targetfile] command outputs a permuted index (cross-reference list) of the targetfile. This may be further filtered and formatted in a pipe, if necessary.
```

#### 12.11.2.5.40 more, less

```text
    Pagers that display a text file or stream to stdout, one screenful at a time. These may be used to filter the output of stdout . . . or of a script.

    An interesting application of more is to "test drive" a command sequence, to forestall potentially unpleasant consequences.

    ls /home/bozo | awk '{print "rm -rf " $1}' | more
    #                                            ^^^^
    		 
    # Testing the effect of the following (disastrous) command line:
    #      ls /home/bozo | awk '{print "rm -rf " $1}' | sh
    #      Hand off to the shell to execute . . .       ^^

    The less pager has the interesting property of doing a formatted display of man page source. See Example A-41.
```

#### 12.11.2.6 Communications Commands

```text
Certain of the following commands find use in network data transfer and analysis, as well as in chasing spammers.

Information and Statistics
```

#### 12.11.2.6.1 host

```text
    Searches for information about an Internet host by name or IP address, using DNS.

    bash$ host surfacemail.com
    surfacemail.com. has address 202.92.42.236
```

#### 12.11.2.6.2 ipcalc

```text
    Displays IP information for a host. With the -h option, ipcalc does a reverse DNS lookup, finding the name of the host (server) from the IP address.

    bash$ ipcalc -h 202.92.42.236
    HOSTNAME=surfacemail.com
```

#### 12.11.2.6.3 nslookup

```text
    Do an Internet "name server lookup" on a host by IP address. This is essentially equivalent to ipcalc -h or dig -x . The command may be run either interactively or noninteractively, i.e., from within a script.

    The nslookup command has allegedly been "deprecated," but it is still useful.

    bash$ nslookup -sil 66.97.104.180
    nslookup kuhleersparnis.ch
     Server:         135.116.137.2
     Address:        135.116.137.2#53

     Non-authoritative answer:
     Name:   kuhleersparnis.ch
```

#### 12.11.2.6.4 dig

```text
    Domain Information Groper. Similar to nslookup, dig does an Internet name server lookup on a host. May be run from the command line or from within a script.

    Some interesting options to dig are +time=N for setting a query timeout to N seconds, +nofail for continuing to query servers until a reply is received, and -x for doing a reverse address lookup.

    Compare the output of dig -x with ipcalc -h and nslookup.

    bash$ dig -x 81.9.6.2
    ;; Got answer:
     ;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 11649
     ;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 1, ADDITIONAL: 0

     ;; QUESTION SECTION:
     ;2.6.9.81.in-addr.arpa.         IN      PTR

     ;; AUTHORITY SECTION:
     |     6.9.81.in-addr.arpa.    3600    IN      SOA     ns.eltel.net. noc.eltel.net.
     |     2002031705 900 600 86400 3600

     ;; Query time: 537 msec
     ;; SERVER: 135.116.137.2#53(135.116.137.2)
     ;; WHEN: Wed Jun 26 08:35:24 2002
     ;; MSG SIZE  rcvd: 91
```

#### 12.11.2.6.5 Example 15-40. Finding out where to report a spammer

```text
    #!/bin/bash
    # spam-lookup.sh: Look up abuse contact to report a spammer.
    # Thanks, Michael Zick.

    # Check for command-line arg.
    ARGCOUNT=1
    E_WRONGARGS=65
    if [ $# -ne "$ARGCOUNT" ]
    then
      echo "Usage: `basename $0` domain-name"
      exit $E_WRONGARGS
    fi


    dig +short $1.contacts.abuse.net -c in -t txt
    # Also try:
    #     dig +nssearch $1
    #     Tries to find "authoritative name servers" and display SOA records.

    # The following also works:
    #     whois -h whois.abuse.net $1
    #           ^^ ^^^^^^^^^^^^^^^  Specify host.  
    #     Can even lookup multiple spammers with this, i.e."
    #     whois -h whois.abuse.net $spamdomain1 $spamdomain2 . . .


    #  Exercise:
    #  --------
    #  Expand the functionality of this script
    #+ so that it automatically e-mails a notification
    #+ to the responsible ISP's contact address(es).
    #  Hint: use the "mail" command.

    exit $?

    # spam-lookup.sh chinatietong.com
    #                A known spam domain.

    # "crnet_mgr@chinatietong.com"
    # "crnet_tec@chinatietong.com"
    # "postmaster@chinatietong.com"


    #  For a more elaborate version of this script,
    #+ see the SpamViz home page, http://www.spamviz.net/index.html.
```

#### 12.11.2.6.6 Example 15-41. Analyzing a spam domain

```text
    #! /bin/bash
    # is-spammer.sh: Identifying spam domains

    # $Id: is-spammer, v 1.4 2004/09/01 19:37:52 mszick Exp $
    # Above line is RCS ID info.
    #
    #  This is a simplified version of the "is_spammer.bash
    #+ script in the Contributed Scripts appendix.

    # is-spammer <domain.name>

    # Uses an external program: 'dig'
    # Tested with version: 9.2.4rc5

    # Uses functions.
    # Uses IFS to parse strings by assignment into arrays.
    # And even does something useful: checks e-mail blacklists.

    # Use the domain.name(s) from the text body:
    # http://www.good_stuff.spammer.biz/just_ignore_everything_else
    #                       ^^^^^^^^^^^
    # Or the domain.name(s) from any e-mail address:
    # Really_Good_Offer@spammer.biz
    #
    # as the only argument to this script.
    #(PS: have your Inet connection running)
    #
    # So, to invoke this script in the above two instances:
    #       is-spammer.sh spammer.biz


    # Whitespace == :Space:Tab:Line Feed:Carriage Return:
    WSP_IFS=$'\x20'$'\x09'$'\x0A'$'\x0D'

    # No Whitespace == Line Feed:Carriage Return
    No_WSP=$'\x0A'$'\x0D'

    # Field separator for dotted decimal ip addresses
    ADR_IFS=${No_WSP}'.'

    # Get the dns text resource record.
    # get_txt <error_code> <list_query>
    get_txt() {

        # Parse $1 by assignment at the dots.
        local -a dns
        IFS=$ADR_IFS
        dns=( $1 )
        IFS=$WSP_IFS
        if [ "${dns[0]}" == '127' ]
        then
            # See if there is a reason.
            echo $(dig +short $2 -t txt)
        fi
    }

    # Get the dns address resource record.
    # chk_adr <rev_dns> <list_server>
    chk_adr() {
        local reply
        local server
        local reason

        server=${1}${2}
        reply=$( dig +short ${server} )

        # If reply might be an error code . . .
        if [ ${#reply} -gt 6 ]
        then
            reason=$(get_txt ${reply} ${server} )
            reason=${reason:-${reply}}
        fi
        echo ${reason:-' not blacklisted.'}
    }

    # Need to get the IP address from the name.
    echo 'Get address of: '$1
    ip_adr=$(dig +short $1)
    dns_reply=${ip_adr:-' no answer '}
    echo ' Found address: '${dns_reply}

    # A valid reply is at least 4 digits plus 3 dots.
    if [ ${#ip_adr} -gt 6 ]
    then
        echo
        declare query

        # Parse by assignment at the dots.
        declare -a dns
        IFS=$ADR_IFS
        dns=( ${ip_adr} )
        IFS=$WSP_IFS

        # Reorder octets into dns query order.
        rev_dns="${dns[3]}"'.'"${dns[2]}"'.'"${dns[1]}"'.'"${dns[0]}"'.'

    # See: http://www.spamhaus.org (Conservative, well maintained)
        echo -n 'spamhaus.org says: '
        echo $(chk_adr ${rev_dns} 'sbl-xbl.spamhaus.org')

    # See: http://ordb.org (Open mail relays)
        echo -n '   ordb.org  says: '
        echo $(chk_adr ${rev_dns} 'relays.ordb.org')

    # See: http://www.spamcop.net/ (You can report spammers here)
        echo -n ' spamcop.net says: '
        echo $(chk_adr ${rev_dns} 'bl.spamcop.net')

    # # # other blacklist operations # # #

    # See: http://cbl.abuseat.org.
        echo -n ' abuseat.org says: '
        echo $(chk_adr ${rev_dns} 'cbl.abuseat.org')

    # See: http://dsbl.org/usage (Various mail relays)
        echo
        echo 'Distributed Server Listings'
        echo -n '       list.dsbl.org says: '
        echo $(chk_adr ${rev_dns} 'list.dsbl.org')

        echo -n '   multihop.dsbl.org says: '
        echo $(chk_adr ${rev_dns} 'multihop.dsbl.org')

        echo -n 'unconfirmed.dsbl.org says: '
        echo $(chk_adr ${rev_dns} 'unconfirmed.dsbl.org')

    else
        echo
        echo 'Could not use that address.'
    fi

    exit 0

    # Exercises:
    # --------

    # 1) Check arguments to script,
    #    and exit with appropriate error message if necessary.

    # 2) Check if on-line at invocation of script,
    #    and exit with appropriate error message if necessary.

    # 3) Substitute generic variables for "hard-coded" BHL domains.

    # 4) Set a time-out for the script using the "+time=" option
         to the 'dig' command.

    For a much more elaborate version of the above script, see Example A-30.
```

#### 12.11.2.6.7 traceroute

```text
    Trace the route taken by packets sent to a remote host. This command works within a LAN, WAN, or over the Internet. The remote host may be specified by an IP address. The output of this command may be filtered by grep or sed in a pipe.

    bash$ traceroute 81.9.6.2
    traceroute to 81.9.6.2 (81.9.6.2), 30 hops max, 38 byte packets
     1  tc43.xjbnnbrb.com (136.30.178.8)  191.303 ms  179.400 ms  179.767 ms
     2  or0.xjbnnbrb.com (136.30.178.1)  179.536 ms  179.534 ms  169.685 ms
     3  192.168.11.101 (192.168.11.101)  189.471 ms  189.556 ms *
     ...
```

#### 12.11.2.6.8 ping

```text
    Broadcast an ICMP ECHO_REQUEST packet to another machine, either on a local or remote network. This is a diagnostic tool for testing network connections, and it should be used with caution.

    bash$ ping localhost
    PING localhost.localdomain (127.0.0.1) from 127.0.0.1 : 56(84) bytes of data.
     64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=0 ttl=255 time=709 usec
     64 bytes from localhost.localdomain (127.0.0.1): icmp_seq=1 ttl=255 time=286 usec

     --- localhost.localdomain ping statistics ---
     2 packets transmitted, 2 packets received, 0% packet loss
     round-trip min/avg/max/mdev = 0.286/0.497/0.709/0.212 ms
    	      

    A successful ping returns an exit status of 0. This can be tested for in a script.

      HNAME=nastyspammer.com
    # HNAME=$HOST     # Debug: test for localhost.
      count=2  # Send only two pings.

    if [[ `ping -c $count "$HNAME"` ]]
    then
      echo ""$HNAME" still up and broadcasting spam your way."
    else
      echo ""$HNAME" seems to be down. Pity."
    fi
```

#### 12.11.2.6.9 whois

```text
    Perform a DNS (Domain Name System) lookup. The -h option permits specifying which particular whois server to query. 
```

#### 12.11.2.6.10 finger

```text
    Retrieve information about users on a network. Optionally, this command can display a user's ~/.plan, ~/.project, and ~/.forward files, if present.

    bash$ finger
    Login  Name           Tty      Idle  Login Time   Office     Office Phone
     bozo   Bozo Bozeman   tty1        8  Jun 25 16:59                (:0)
     bozo   Bozo Bozeman   ttyp0          Jun 25 16:59                (:0.0)
     bozo   Bozo Bozeman   ttyp1          Jun 25 17:07                (:0.0)



    bash$ finger bozo
    Login: bozo                             Name: Bozo Bozeman
     Directory: /home/bozo                   Shell: /bin/bash
     Office: 2355 Clown St., 543-1234
     On since Fri Aug 31 20:13 (MST) on tty1    1 hour 38 minutes idle
     On since Fri Aug 31 20:13 (MST) on pts/0   12 seconds idle
     On since Fri Aug 31 20:13 (MST) on pts/1
     On since Fri Aug 31 20:31 (MST) on pts/2   1 hour 16 minutes idle
     Mail last read Tue Jul  3 10:08 2007 (MST) 
     No Plan.
    	      

    Out of security considerations, many networks disable finger and its associated daemon. [1] 
```

#### 12.11.2.6.11 chfn

```text
    Change information disclosed by the finger command.
```

#### 12.11.2.6.12 vrfy

```text
    Verify an Internet e-mail address.

    This command seems to be missing from newer Linux distros.

Remote Host Access
```

#### 12.11.2.6.13 sx, rx

```text
    The sx and rx command set serves to transfer files to and from a remote host using the xmodem protocol. These are generally part of a communications package, such as minicom.
```

#### 12.11.2.6.14 sz, rz

```text
    The sz and rz command set serves to transfer files to and from a remote host using the zmodem protocol. Zmodem has certain advantages over xmodem, such as faster transmission rate and resumption of interrupted file transfers. Like sx and rx, these are generally part of a communications package.
ftp

    Utility and protocol for uploading / downloading files to or from a remote host. An ftp session can be automated in a script (see Example 18-6, Example A-4, and Example A-13).
```

#### 12.11.2.6.15 uucp, uux, cu

```text
    uucp: UNIX to UNIX copy. This is a communications package for transferring files between UNIX servers. A shell script is an effective way to handle a uucp command sequence.

    Since the advent of the Internet and e-mail, uucp seems to have faded into obscurity, but it still exists and remains perfectly workable in situations where an Internet connection is not available or appropriate. The advantage of uucp is that it is fault-tolerant, so even if there is a service interruption the copy operation will resume where it left off when the connection is restored.

    ---

    uux: UNIX to UNIX execute. Execute a command on a remote system. This command is part of the uucp package.

    ---

    cu: Call Up a remote system and connect as a simple terminal. It is a sort of dumbed-down version of telnet. This command is part of the uucp package.
telnet

    Utility and protocol for connecting to a remote host.

    Caution	The telnet protocol contains security holes and should therefore probably be avoided. Its use within a shell script is not recommended.
```

#### 12.11.2.6.16 wget

```text
    The wget utility noninteractively retrieves or downloads files from a Web or ftp site. It works well in a script.

    wget -p http://www.xyz23.com/file01.html
    #  The -p or --page-requisite option causes wget to fetch all files
    #+ required to display the specified page.

    wget -r ftp://ftp.xyz24.net/~bozo/project_files/ -O $SAVEFILE
    #  The -r option recursively follows and retrieves all links
    #+ on the specified site.

    wget -c ftp://ftp.xyz25.net/bozofiles/filename.tar.bz2
    #  The -c option lets wget resume an interrupted download.
    #  This works with ftp servers and many HTTP sites.
```

#### 12.11.2.6.17 Example 15-42. Getting a stock quote

```text
    #!/bin/bash
    # quote-fetch.sh: Download a stock quote.


    E_NOPARAMS=66

    if [ -z "$1" ]  # Must specify a stock (symbol) to fetch.
      then echo "Usage: `basename $0` stock-symbol"
      exit $E_NOPARAMS
    fi

    stock_symbol=$1

    file_suffix=.html
    # Fetches an HTML file, so name it appropriately.
    URL='http://finance.yahoo.com/q?s='
    # Yahoo finance board, with stock query suffix.

    # -----------------------------------------------------------
    wget -O ${stock_symbol}${file_suffix} "${URL}${stock_symbol}"
    # -----------------------------------------------------------


    # To look up stuff on http://search.yahoo.com:
    # -----------------------------------------------------------
    # URL="http://search.yahoo.com/search?fr=ush-news&p=${query}"
    # wget -O "$savefilename" "${URL}"
    # -----------------------------------------------------------
    # Saves a list of relevant URLs.

    exit $?

    # Exercises:
    # ---------
    #
    # 1) Add a test to ensure the user running the script is on-line.
    #    (Hint: parse the output of 'ps -ax' for "ppp" or "connect."
    #
    # 2) Modify this script to fetch the local weather report,
    #+   taking the user's zip code as an argument.

    See also Example A-32 and Example A-33.
```

#### 12.11.2.6.18 lynx

```text
    The lynx Web and file browser can be used inside a script (with the -dump option) to retrieve a file from a Web or ftp site noninteractively.

    lynx -dump http://www.xyz23.com/file01.html >$SAVEFILE

    With the -traversal option, lynx starts at the HTTP URL specified as an argument, then "crawls" through all links located on that particular server. Used together with the -crawl option, outputs page text to a log file.
```

#### 12.11.2.6.19 rlogin

```text
    Remote login, initates a session on a remote host. This command has security issues, so use ssh instead.
```

#### 12.11.2.6.20 rsh

```text
    Remote shell, executes command(s) on a remote host. This has security issues, so use ssh instead.
```

#### 12.11.2.6.21 rcp

```text
    Remote copy, copies files between two different networked machines.
```

#### 12.11.2.6.22 rsync

```text
    Remote synchronize, updates (synchronizes) files between two different networked machines.

    bash$ rsync -a ~/sourcedir/*txt /node1/subdirectory/
```

#### 12.11.2.6.23 Example 15-43. Updating FC4

```text
    #!/bin/bash
    # fc4upd.sh

    # Script author: Frank Wang.
    # Slight stylistic modifications by ABS Guide author.
    # Used in ABS Guide with permission.


    #  Download Fedora Core 4 update from mirror site using rsync. 
    #  Should also work for newer Fedora Cores -- 5, 6, . . .
    #  Only download latest package if multiple versions exist,
    #+ to save space.

    URL=rsync://distro.ibiblio.org/fedora-linux-core/updates/
    # URL=rsync://ftp.kddilabs.jp/fedora/core/updates/
    # URL=rsync://rsync.planetmirror.com/fedora-linux-core/updates/

    DEST=${1:-/var/www/html/fedora/updates/}
    LOG=/tmp/repo-update-$(/bin/date +%Y-%m-%d).txt
    PID_FILE=/var/run/${0##*/}.pid

    E_RETURN=65        # Something unexpected happened.


    # General rsync options
    # -r: recursive download
    # -t: reserve time
    # -v: verbose

    OPTS="-rtv --delete-excluded --delete-after --partial"

    # rsync include pattern
    # Leading slash causes absolute path name match.
    INCLUDE=(
        "/4/i386/kde-i18n-Chinese*" 
    #   ^                         ^
    # Quoting is necessary to prevent globbing.
    ) 


    # rsync exclude pattern
    # Temporarily comment out unwanted pkgs using "#" . . .
    EXCLUDE=(
        /1
        /2
        /3
        /testing
        /4/SRPMS
        /4/ppc
        /4/x86_64
        /4/i386/debug
       "/4/i386/kde-i18n-*"
       "/4/i386/openoffice.org-langpack-*"
       "/4/i386/*i586.rpm"
       "/4/i386/GFS-*"
       "/4/i386/cman-*"
       "/4/i386/dlm-*"
       "/4/i386/gnbd-*"
       "/4/i386/kernel-smp*"
    #  "/4/i386/kernel-xen*" 
    #  "/4/i386/xen-*" 
    )


    init () {
        # Let pipe command return possible rsync error, e.g., stalled network.
        set -o pipefail                  # Newly introduced in Bash, version 3.

        TMP=${TMPDIR:-/tmp}/${0##*/}.$$  # Store refined download list.
        trap "{
            rm -f $TMP 2>/dev/null
        }" EXIT                          # Clear temporary file on exit.
    }


    check_pid () {
    # Check if process exists.
        if [ -s "$PID_FILE" ]; then
            echo "PID file exists. Checking ..."
            PID=$(/bin/egrep -o "^[[:digit:]]+" $PID_FILE)
            if /bin/ps --pid $PID &>/dev/null; then
                echo "Process $PID found. ${0##*/} seems to be running!"
               /usr/bin/logger -t ${0##*/} \
                     "Process $PID found. ${0##*/} seems to be running!"
                exit $E_RETURN
            fi
            echo "Process $PID not found. Start new process . . ."
        fi
    }


    #  Set overall file update range starting from root or $URL,
    #+ according to above patterns.
    set_range () {
        include=
        exclude=
        for p in "${INCLUDE[@]}"; do
            include="$include --include \"$p\""
        done

        for p in "${EXCLUDE[@]}"; do
            exclude="$exclude --exclude \"$p\""
        done
    }


    # Retrieve and refine rsync update list.
    get_list () {
        echo $$ > $PID_FILE || {
            echo "Can't write to pid file $PID_FILE"
            exit $E_RETURN
        }

        echo -n "Retrieving and refining update list . . ."

        # Retrieve list -- 'eval' is needed to run rsync as a single command.
        # $3 and $4 is the date and time of file creation.
        # $5 is the full package name.
        previous=
        pre_file=
        pre_date=0
        eval /bin/nice /usr/bin/rsync \
            -r $include $exclude $URL | \
            egrep '^dr.x|^-r' | \
            awk '{print $3, $4, $5}' | \
            sort -k3 | \
            { while read line; do
                # Get seconds since epoch, to filter out obsolete pkgs.
                cur_date=$(date -d "$(echo $line | awk '{print $1, $2}')" +%s)
                #  echo $cur_date

                # Get file name.
                cur_file=$(echo $line | awk '{print $3}')
                #  echo $cur_file

                # Get rpm pkg name from file name, if possible.
                if [[ $cur_file == *rpm ]]; then
                    pkg_name=$(echo $cur_file | sed -r -e \
                        's/(^([^_-]+[_-])+)[[:digit:]]+\..*[_-].*$/\1/')
                else
                    pkg_name=
                fi
                # echo $pkg_name

                if [ -z "$pkg_name" ]; then   #  If not a rpm file,
                    echo $cur_file >> $TMP    #+ then append to download list.
                elif [ "$pkg_name" != "$previous" ]; then   # A new pkg found.
                    echo $pre_file >> $TMP                  # Output latest file.
                    previous=$pkg_name                      # Save current.
                    pre_date=$cur_date
                    pre_file=$cur_file
                elif [ "$cur_date" -gt "$pre_date" ]; then
                                                    #  If same pkg, but newer,
                    pre_date=$cur_date              #+ then update latest pointer.
                    pre_file=$cur_file
                fi
                done
                echo $pre_file >> $TMP              #  TMP contains ALL
                                                    #+ of refined list now.
                # echo "subshell=$BASH_SUBSHELL"

        }       # Bracket required here to let final "echo $pre_file >> $TMP" 
                # Remained in the same subshell ( 1 ) with the entire loop.

        RET=$?  # Get return code of the pipe command.

        [ "$RET" -ne 0 ] && {
            echo "List retrieving failed with code $RET"
            exit $E_RETURN
        }

        echo "done"; echo
    }

    # Real rsync download part.
    get_file () {

        echo "Downloading..."
        /bin/nice /usr/bin/rsync \
            $OPTS \
            --filter "merge,+/ $TMP" \
            --exclude '*'  \
            $URL $DEST     \
            | /usr/bin/tee $LOG

        RET=$?

       #  --filter merge,+/ is crucial for the intention. 
       #  + modifier means include and / means absolute path.
       #  Then sorted list in $TMP will contain ascending dir name and 
       #+ prevent the following --exclude '*' from "shortcutting the circuit." 

        echo "Done"

        rm -f $PID_FILE 2>/dev/null

        return $RET
    }

    # -------
    # Main
    init
    check_pid
    set_range
    get_list
    get_file
    RET=$?
    # -------

    if [ "$RET" -eq 0 ]; then
        /usr/bin/logger -t ${0##*/} "Fedora update mirrored successfully."
    else
        /usr/bin/logger -t ${0##*/} \
        "Fedora update mirrored with failure code: $RET"
    fi

    exit $RET


    Note	Using rcp, rsync, and similar utilities with security implications in a shell script may not be advisable. Consider, instead, using ssh, scp, or an expect script.
```

#### 12.11.2.6.24 ssh

```text
    Secure shell, logs onto a remote host and executes commands there. This secure replacement for telnet, rlogin, rcp, and rsh uses identity authentication and encryption. See its manpage for details.

    Example 15-44. Using ssh

    #!/bin/bash
    # remote.bash: Using ssh.

    # This example by Michael Zick.
    # Used with permission.


    #   Presumptions:
    #   ------------
    #   fd-2 isn't being captured ( '2>/dev/null' ).
    #   ssh/sshd presumes stderr ('2') will display to user.
    #
    #   sshd is running on your machine.
    #   For any 'standard' distribution, it probably is,
    #+  and without any funky ssh-keygen having been done.

    # Try ssh to your machine from the command line:
    #
    # $ ssh $HOSTNAME
    # Without extra set-up you'll be asked for your password.
    #   enter password
    #   when done,  $ exit
    #
    # Did that work? If so, you're ready for more fun.

    # Try ssh to your machine as 'root':
    #
    #   $  ssh -l root $HOSTNAME
    #   When asked for password, enter root's, not yours.
    #          Last login: Tue Aug 10 20:25:49 2004 from localhost.localdomain
    #   Enter 'exit' when done.

    #  The above gives you an interactive shell.
    #  It is possible for sshd to be set up in a 'single command' mode,
    #+ but that is beyond the scope of this example.
    #  The only thing to note is that the following will work in
    #+ 'single command' mode.


    # A basic, write stdout (local) command.

    ls -l

    # Now the same basic command on a remote machine.
    # Pass a different 'USERNAME' 'HOSTNAME' if desired:
    USER=${USERNAME:-$(whoami)}
    HOST=${HOSTNAME:-$(hostname)}

    #  Now excute the above command line on the remote host,
    #+ with all transmissions encrypted.

    ssh -l ${USER} ${HOST} " ls -l "

    #  The expected result is a listing of your username's home
    #+ directory on the remote machine.
    #  To see any difference, run this script from somewhere
    #+ other than your home directory.

    #  In other words, the Bash command is passed as a quoted line
    #+ to the remote shell, which executes it on the remote machine.
    #  In this case, sshd does  ' bash -c "ls -l" '   on your behalf.

    #  For information on topics such as not having to enter a
    #+ password/passphrase for every command line, see
    #+    man ssh
    #+    man ssh-keygen
    #+    man sshd_config.

    exit 0

    Caution	

    Within a loop, ssh may cause unexpected behavior. According to a Usenet post in the comp.unix shell archives, ssh inherits the loop's stdin. To remedy this, pass ssh either the -n or -f option.

    Thanks, Jason Bechtel, for pointing this out.
```

#### 12.11.2.6.25 scp

```text
    Secure copy, similar in function to rcp, copies files between two different networked machines, but does so using authentication, and with a security level similar to ssh.

Local Network
```

#### 12.11.2.6.26 write

```text
    This is a utility for terminal-to-terminal communication. It allows sending lines from your terminal (console or xterm) to that of another user. The mesg command may, of course, be used to disable write access to a terminal

    Since write is interactive, it would not normally find use in a script.
```

#### 12.11.2.6.27 netconfig

```text
    A command-line utility for configuring a network adapter (using DHCP). This command is native to Red Hat centric Linux distros.

Mail
```

#### 12.11.2.6.28 mail

```text
    Send or read e-mail messages.

    This stripped-down command-line mail client works fine as a command embedded in a script.
```

#### 12.11.2.6.29 Example 15-45. A script that mails itself

```text
    #!/bin/sh
    # self-mailer.sh: Self-mailing script

    adr=${1:-`whoami`}     # Default to current user, if not specified.
    #  Typing 'self-mailer.sh wiseguy@superdupergenius.com'
    #+ sends this script to that addressee.
    #  Just 'self-mailer.sh' (no argument) sends the script
    #+ to the person invoking it, for example, bozo@localhost.localdomain.
    #
    #  For more on the ${parameter:-default} construct,
    #+ see the "Parameter Substitution" section
    #+ of the "Variables Revisited" chapter.

    # ============================================================================
      cat $0 | mail -s "Script \"`basename $0`\" has mailed itself to you." "$adr"
    # ============================================================================

    # --------------------------------------------
    #  Greetings from the self-mailing script.
    #  A mischievous person has run this script,
    #+ which has caused it to mail itself to you.
    #  Apparently, some people have nothing better
    #+ to do with their time.
    # --------------------------------------------

    echo "At `date`, script \"`basename $0`\" mailed to "$adr"."

    exit 0

    #  Note that the "mailx" command (in "send" mode) may be substituted
    #+ for "mail" ... but with somewhat different options.
```

#### 12.11.2.6.30 mailto

```text
    Similar to the mail command, mailto sends e-mail messages from the command line or in a script. However, mailto also permits sending MIME (multimedia) messages.
```

#### 12.11.2.6.31 mailstats

```text
    Show mail statistics. This command may be invoked only by root.

    root# mailstats
    Statistics from Tue Jan  1 20:32:08 2008
      M   msgsfr  bytes_from   msgsto    bytes_to  msgsrej msgsdis msgsqur  Mailer
      |4     1682      24118K        0          0K        0       0       0  esmtp
      |9      212        640K     1894      25131K        0       0       0  local
     =====================================================================
      T     1894      24758K     1894      25131K        0       0       0
      C      414                    0
```

#### 12.11.2.6.32 vacation

```text
    This utility automatically replies to e-mails that the intended recipient is on vacation and temporarily unavailable. It runs on a network, in conjunction with sendmail, and is not applicable to a dial-up POPmail account.
```

#### 12.11.2.7 Terminal Control Commands

```text
Command affecting the console or terminal
```

#### 12.11.2.7.1 tput

```text
    Initialize terminal and/or fetch information about it from terminfo data. Various options permit certain terminal operations: tput clear is the equivalent of clear; tput reset is the equivalent of reset.

    bash$ tput longname
    xterm terminal emulator (X Window System)
    	      

    Issuing a tput cup X Y moves the cursor to the (X,Y) coordinates in the current terminal. A clear to erase the terminal screen would normally precede this.

    Some interesting options to tput are:

        * bold, for high-intensity text
        * smul, to underline text in the terminal
        * smso, to render text in reverse
        * sgr0, to reset the terminal parameters (to normal), without clearing the screen

    Note that stty offers a more powerful command set for controlling a terminal.
```

#### 12.11.2.7.2 infocmp

```text
    This command prints out extensive information about the current terminal. It references the terminfo database.

    bash$ infocmp
    #       Reconstructed via infocmp from file:
     /usr/share/terminfo/r/rxvt
     rxvt|rxvt terminal emulator (X Window System), 
             am, bce, eo, km, mir, msgr, xenl, xon, 
             colors#8, cols#80, it#8, lines#24, pairs#64, 
             acsc=``aaffggjjkkllmmnnooppqqrrssttuuvvwwxxyyzz{{||}}~~, 
             bel=^G, blink=\E[5m, bold=\E[1m,
             civis=\E[?25l, 
             clear=\E[H\E[2J, cnorm=\E[?25h, cr=^M, 
             ...
```

#### 12.11.2.7.3 reset

```text
    Reset terminal parameters and clear text screen. As with clear, the cursor and prompt reappear in the upper lefthand corner of the terminal.
```

#### 12.11.2.7.4 clear

```text
    The clear command simply clears the text screen at the console or in an xterm. The prompt and cursor reappear at the upper lefthand corner of the screen or xterm window. This command may be used either at the command line or in a script. See Example 10-25.
```

#### 12.11.2.7.5 resize

```text
    Echoes commands necessary to set $TERM and $TERMCAP to duplicate the size (dimensions) of the current terminal.

    bash$ resize
    set noglob;
     setenv COLUMNS '80';
     setenv LINES '24';
     unset noglob;
```

#### 12.11.2.7.6 script

```text
    This utility records (saves to a file) all the user keystrokes at the command line in a console or an xterm window. This, in effect, creates a record of a session.
```

#### 12.11.2.8 Math Commands

```text
"Doing the numbers"
```

#### 12.11.2.8.1 factor

```text
    Decompose an integer into prime factors.

    bash$ factor 27417
    27417: 3 13 19 37
```

#### 12.11.2.8.2 Example 15-46. Generating prime numbers

```text
    #!/bin/bash
    # primes2.sh

    #  Generating prime numbers the quick-and-easy way,
    #+ without resorting to fancy algorithms.

    CEILING=10000   # 1 to 10000
    PRIME=0
    E_NOTPRIME=

    is_prime ()
    {
      local factors
      factors=( $(factor $1) )  # Load output of `factor` into array.

    if [ -z "${factors[2]}" ]
    #  Third element of "factors" array:
    #+ ${factors[2]} is 2nd factor of argument.
    #  If it is blank, then there is no 2nd factor,
    #+ and the argument is therefore prime.
    then
      return $PRIME             # 0
    else
      return $E_NOTPRIME        # null
    fi
    }

    echo
    for n in $(seq $CEILING)
    do
      if is_prime $n
      then
        printf %5d $n
      fi   #    ^  Five positions per number suffices.
    done   #       For a higher $CEILING, adjust upward, as necessary.

    echo

    exit
```

#### 12.11.2.8.3 bc

```text
    Bash can't handle floating point calculations, and it lacks operators for certain important mathematical functions. Fortunately, bc comes to the rescue.

    Not just a versatile, arbitrary precision calculation utility, bc offers many of the facilities of a programming language.

    bc has a syntax vaguely resembling C.

    Since it is a fairly well-behaved UNIX utility, and may therefore be used in a pipe, bc comes in handy in scripts.

    Here is a simple template for using bc to calculate a script variable. This uses command substitution.

    	      variable=$(echo "OPTIONS; OPERATIONS" | bc)
```

#### 12.11.2.8.4 Example 15-47. Monthly Payment on a Mortgage

```text
    #!/bin/bash
    # monthlypmt.sh: Calculates monthly payment on a mortgage.


    #  This is a modification of code in the
    #+ "mcalc" (mortgage calculator) package,
    #+ by Jeff Schmidt
    #+ and
    #+ Mendel Cooper (yours truly, the author of the ABS Guide).
    #   http://www.ibiblio.org/pub/Linux/apps/financial/mcalc-1.6.tar.gz  [15k]

    echo
    echo "Given the principal, interest rate, and term of a mortgage,"
    echo "calculate the monthly payment."

    bottom=1.0

    echo
    echo -n "Enter principal (no commas) "
    read principal
    echo -n "Enter interest rate (percent) "  # If 12%, enter "12", not ".12".
    read interest_r
    echo -n "Enter term (months) "
    read term


     interest_r=$(echo "scale=9; $interest_r/100.0" | bc) # Convert to decimal.
                     #           ^^^^^^^^^^^^^^^^^  Divide by 100. 
                     # "scale" determines how many decimal places.

     interest_rate=$(echo "scale=9; $interest_r/12 + 1.0" | bc)
     

     top=$(echo "scale=9; $principal*$interest_rate^$term" | bc)
              #           ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
              #           Standard formula for figuring interest.

     echo; echo "Please be patient. This may take a while."

     let "months = $term - 1"
    # ==================================================================== 
     for ((x=$months; x > 0; x--))
     do
       bot=$(echo "scale=9; $interest_rate^$x" | bc)
       bottom=$(echo "scale=9; $bottom+$bot" | bc)
    #  bottom = $(($bottom + $bot"))
     done
    # ==================================================================== 

    # -------------------------------------------------------------------- 
    #  Rick Boivie pointed out a more efficient implementation
    #+ of the above loop, which decreases computation time by 2/3.

    # for ((x=1; x <= $months; x++))
    # do
    #   bottom=$(echo "scale=9; $bottom * $interest_rate + 1" | bc)
    # done


    #  And then he came up with an even more efficient alternative,
    #+ one that cuts down the run time by about 95%!

    # bottom=`{
    #     echo "scale=9; bottom=$bottom; interest_rate=$interest_rate"
    #     for ((x=1; x <= $months; x++))
    #     do
    #          echo 'bottom = bottom * interest_rate + 1'
    #     done
    #     echo 'bottom'
    #     } | bc`       # Embeds a 'for loop' within command substitution.
    # --------------------------------------------------------------------------
    #  On the other hand, Frank Wang suggests:
    #  bottom=$(echo "scale=9; ($interest_rate^$term-1)/($interest_rate-1)" | bc)

    #  Because . . .
    #  The algorithm behind the loop
    #+ is actually a sum of geometric proportion series.
    #  The sum formula is e0(1-q^n)/(1-q),
    #+ where e0 is the first element and q=e(n+1)/e(n)
    #+ and n is the number of elements.
    # --------------------------------------------------------------------------


     # let "payment = $top/$bottom"
     payment=$(echo "scale=2; $top/$bottom" | bc)
     # Use two decimal places for dollars and cents.
     
     echo
     echo "monthly payment = \$$payment"  # Echo a dollar sign in front of amount.
     echo


     exit 0


     # Exercises:
     #   1) Filter input to permit commas in principal amount.
     #   2) Filter input to permit interest to be entered as percent or decimal.
     #   3) If you are really ambitious,
     #+     expand this script to print complete amortization tables.
```

#### 12.11.2.8.5 Example 15-48. Base Conversion

```text
    #!/bin/bash
    ###########################################################################
    # Shellscript:	base.sh - print number to different bases (Bourne Shell)
    # Author     :	Heiner Steven (heiner.steven@odn.de)
    # Date       :	07-03-95
    # Category   :	Desktop
    # $Id: base.sh,v 1.2 2000/02/06 19:55:35 heiner Exp $
    # ==> Above line is RCS ID info.
    ###########################################################################
    # Description
    #
    # Changes
    # 21-03-95 stv	fixed error occuring with 0xb as input (0.2)
    ###########################################################################

    # ==> Used in ABS Guide with the script author's permission.
    # ==> Comments added by ABS Guide author.

    NOARGS=65
    PN=`basename "$0"`			       # Program name
    VER=`echo '$Revision: 1.2 $' | cut -d' ' -f2`  # ==> VER=1.2

    Usage () {
        echo "$PN - print number to different bases, $VER (stv '95)
    usage: $PN [number ...]

    If no number is given, the numbers are read from standard input.
    A number may be
        binary (base 2)		starting with 0b (i.e. 0b1100)
        octal (base 8)		starting with 0  (i.e. 014)
        hexadecimal (base 16)	starting with 0x (i.e. 0xc)
        decimal			otherwise (i.e. 12)" >&2
        exit $NOARGS 
    }   # ==> Function to print usage message.

    Msg () {
        for i   # ==> in [list] missing.
        do echo "$PN: $i" >&2
        done
    }

    Fatal () { Msg "$@"; exit 66; }

    PrintBases () {
        # Determine base of the number
        for i      # ==> in [list] missing...
        do         # ==> so operates on command line arg(s).
    	case "$i" in
    	    0b*)		ibase=2;;	# binary
    	    0x*|[a-f]*|[A-F]*)	ibase=16;;	# hexadecimal
    	    0*)			ibase=8;;	# octal
    	    [1-9]*)		ibase=10;;	# decimal
    	    *)
    		Msg "illegal number $i - ignored"
    		continue;;
    	esac

    	# Remove prefix, convert hex digits to uppercase (bc needs this)
    	number=`echo "$i" | sed -e 's:^0[bBxX]::' | tr '[a-f]' '[A-F]'`
    	# ==> Uses ":" as sed separator, rather than "/".

    	# Convert number to decimal
    	dec=`echo "ibase=$ibase; $number" | bc`  # ==> 'bc' is calculator utility.
    	case "$dec" in
    	    [0-9]*)	;;			 # number ok
    	    *)		continue;;		 # error: ignore
    	esac

    	# Print all conversions in one line.
    	# ==> 'here document' feeds command list to 'bc'.
    	echo `bc <<!
    	    obase=16; "hex="; $dec
    	    obase=10; "dec="; $dec
    	    obase=8;  "oct="; $dec
    	    obase=2;  "bin="; $dec
    !
        ` | sed -e 's: :	:g'

        done
    }

    while [ $# -gt 0 ]
    # ==>  Is a "while loop" really necessary here,
    # ==>+ since all the cases either break out of the loop
    # ==>+ or terminate the script.
    # ==> (Above comment by Paulo Marcel Coelho Aragao.)
    do
        case "$1" in
    	--)     shift; break;;
    	-h)     Usage;;                 # ==> Help message.
    	-*)     Usage;;
             *)     break;;                 # first number
        esac   # ==> More error checking for illegal input might be useful.
        shift
    done

    if [ $# -gt 0 ]
    then
        PrintBases "$@"
    else					# read from stdin
        while read line
        do
    	PrintBases $line
        done
    fi


    exit 0

    An alternate method of invoking bc involves using a here document embedded within a command substitution block. This is especially appropriate when a script needs to pass a list of options and commands to bc.

    variable=`bc << LIMIT_STRING
    options
    statements
    operations
    LIMIT_STRING
    `

    ...or...


    variable=$(bc << LIMIT_STRING
    options
    statements
    operations
    LIMIT_STRING
    )
```

#### 12.11.2.8.6 Example 15-49. Invoking bc using a here document

```text
    #!/bin/bash
    # Invoking 'bc' using command substitution
    # in combination with a 'here document'.


    var1=`bc << EOF
    |18.33 * 19.78
    EOF
    `
    echo $var1       # 362.56


    #  $( ... ) notation also works.
    v1=23.53
    v2=17.881
    v3=83.501
    v4=171.63

    var2=$(bc << EOF
    scale = 4
    a = ( $v1 + $v2 )
    b = ( $v3 * $v4 )
    a * b + 15.35
    EOF
    )
    echo $var2       # 593487.8452


    var3=$(bc -l << EOF
    scale = 9
    s ( 1.7 )
    EOF
    )
    # Returns the sine of 1.7 radians.
    # The "-l" option calls the 'bc' math library.
    echo $var3       # .991664810


    # Now, try it in a function...
    hypotenuse ()    # Calculate hypotenuse of a right triangle.
    {                # c = sqrt( a^2 + b^2 )
    hyp=$(bc -l << EOF
    scale = 9
    sqrt ( $1 * $1 + $2 * $2 )
    EOF
    )
    # Can't directly return floating point values from a Bash function.
    # But, can echo-and-capture:
    echo "$hyp"
    }

    hyp=$(hypotenuse 3.68 7.31)
    echo "hypotenuse = $hyp"    # 8.184039344


    exit 0
```

#### 12.11.2.8.7 Example 15-50. Calculating PI

```text
    #!/bin/bash
    # cannon.sh: Approximating PI by firing cannonballs.

    # This is a very simple instance of a "Monte Carlo" simulation:
    #+ a mathematical model of a real-life event,
    #+ using pseudorandom numbers to emulate random chance.

    #  Consider a perfectly square plot of land, 10000 units on a side.
    #  This land has a perfectly circular lake in its center,
    #+ with a diameter of 10000 units.
    #  The plot is actually mostly water, except for land in the four corners.
    #  (Think of it as a square with an inscribed circle.)
    #
    #  We will fire iron cannonballs from an old-style cannon
    #+ at the square.
    #  All the shots impact somewhere on the square,
    #+ either in the lake or on the dry corners.
    #  Since the lake takes up most of the area,
    #+ most of the shots will SPLASH! into the water.
    #  Just a few shots will THUD! into solid ground
    #+ in the four corners of the square.
    #
    #  If we take enough random, unaimed shots at the square,
    #+ Then the ratio of SPLASHES to total shots will approximate
    #+ the value of PI/4.
    #
    #  The reason for this is that the cannon is actually shooting
    #+ only at the upper right-hand quadrant of the square,
    #+ i.e., Quadrant I of the Cartesian coordinate plane.
    #  (The previous explanation was a simplification.)
    #
    #  Theoretically, the more shots taken, the better the fit.
    #  However, a shell script, as opposed to a compiled language
    #+ with floating-point math built in, requires a few compromises.
    #  This tends to lower the accuracy of the simulation.


    DIMENSION=10000  # Length of each side of the plot.
                     # Also sets ceiling for random integers generated.

    MAXSHOTS=1000    # Fire this many shots.
                     # 10000 or more would be better, but would take too long.
    PMULTIPLIER=4.0  # Scaling factor to approximate PI.

    M_PI=3.141592654 # Actual value of PI, for comparison purposes.

    get_random ()
    {
    SEED=$(head -n 1 /dev/urandom | od -N 1 | awk '{ print $2 }')
    RANDOM=$SEED                                  #  From "seeding-random.sh"
                                                  #+ example script.
    let "rnum = $RANDOM % $DIMENSION"             #  Range less than 10000.
    echo $rnum
    }

    distance=        # Declare global variable.
    hypotenuse ()    # Calculate hypotenuse of a right triangle.
    {                # From "alt-bc.sh" example.
    distance=$(bc -l << EOF
    scale = 0
    sqrt ( $1 * $1 + $2 * $2 )
    EOF
    )
    #  Setting "scale" to zero rounds down result to integer value,
    #+ a necessary compromise in this script.
    #  This diminshes the accuracy of the simulation.
    }


    # main() {

    # Initialize variables.
    shots=0
    splashes=0
    thuds=0
    Pi=0
    error=0

    while [ "$shots" -lt  "$MAXSHOTS" ]           # Main loop.
    do

      xCoord=$(get_random)                        # Get random X and Y coords.
      yCoord=$(get_random)
      hypotenuse $xCoord $yCoord                  #  Hypotenuse of right-triangle =
                                                  #+ distance.
      ((shots++))

      printf "#%4d   " $shots
      printf "Xc = %4d  " $xCoord
      printf "Yc = %4d  " $yCoord
      printf "Distance = %5d  " $distance         #  Distance from 
                                                  #+ center of lake --
                                                  #  the "origin" --
                                                  #+ coordinate (0,0).

      if [ "$distance" -le "$DIMENSION" ]
      then
        echo -n "SPLASH!  "
        ((splashes++))
      else
        echo -n "THUD!    "
        ((thuds++))
      fi

      Pi=$(echo "scale=9; $PMULTIPLIER*$splashes/$shots" | bc)
      # Multiply ratio by 4.0.
      echo -n "PI ~ $Pi"
      echo

    done

    echo
    echo "After $shots shots, PI looks like approximately $Pi"
    # Tends to run a bit high . . . 
    # Probably due to round-off error and imperfect randomness of $RANDOM.
    error=$(echo "scale=9; $Pi - $M_PI" | bc)
    echo "Deviation from mathematical value of PI =      $error"
    echo

    # }

    exit 0

    #  One might well wonder whether a shell script is appropriate for
    #+ an application as complex and computation-intensive as a simulation.
    #
    #  There are at least two justifications.
    #  1) As a proof of concept: to show it can be done.
    #  2) To prototype and test the algorithms before rewriting
    #+    it in a compiled high-level language.
```

#### 12.11.2.8.8 dc

```text
    The dc (desk calculator) utility is stack-oriented and uses RPN ("Reverse Polish Notation"). Like bc, it has much of the power of a programming language.

    Most persons avoid dc, since it requires non-intuitive input. Yet, it has its uses.
```

#### 12.11.2.8.9 Example 15-51. Converting a decimal number to hexadecimal

```text
    #!/bin/bash
    # hexconvert.sh: Convert a decimal number to hexadecimal.

    E_NOARGS=85 # Command-line arg missing.
    BASE=16     # Hexadecimal.

    if [ -z "$1" ]
    then        # Need a command line argument.
      echo "Usage: $0 number"
      exit $E_NOARGS
    fi          # Exercise: add argument validity checking.


    hexcvt ()
    {
    if [ -z "$1" ]
    then
      echo 0
      return    # "Return" 0 if no arg passed to function.
    fi

    echo ""$1" "$BASE" o p" | dc
    #                  o    sets radix (numerical base) of output.
    #                    p  prints the top of stack.
    # For other options: 'man dc' ...
    return
    }

    hexcvt "$1"

    exit

    Studying the info page for dc is a painful path to understanding its intricacies. There seems to be a small, select group of dc wizards who delight in showing off their mastery of this powerful, but arcane utility.

    bash$ echo "16i[q]sa[ln0=aln100%Pln100/snlbx]sbA0D68736142snlbxq" | dc"
    Bash
```

#### 12.11.2.8.10 Example 15-52. Factoring

```text
    #!/bin/bash
    # factr.sh: Factor a number

    MIN=2       # Will not work for number smaller than this.
    E_NOARGS=65
    E_TOOSMALL=66

    if [ -z $1 ]
    then
      echo "Usage: $0 number"
      exit $E_NOARGS
    fi

    if [ "$1" -lt "$MIN" ]
    then
      echo "Number to factor must be $MIN or greater."
      exit $E_TOOSMALL
    fi  

    # Exercise: Add type checking (to reject non-integer arg).

    echo "Factors of $1:"
    # -------------------------------------------------------------------------------
    echo "$1[p]s2[lip/dli%0=1dvsr]s12sid2%0=13sidvsr[dli%0=1lrli2+dsi!>.]ds.xd1<2"|dc
    # -------------------------------------------------------------------------------
    # Above line of code written by Michel Charpentier <charpov@cs.unh.edu>.
    # Used in ABS Guide with permission (thanks!).

     exit 0
```

#### 12.11.2.8.11 awk

```text
    Yet another way of doing floating point math in a script is using awk's built-in math functions in a shell wrapper.
```

#### 12.11.2.8.12 Example 15-53. Calculating the hypotenuse of a triangle

```text
    #!/bin/bash
    # hypotenuse.sh: Returns the "hypotenuse" of a right triangle.
    #                (square root of sum of squares of the "legs")

    ARGS=2                # Script needs sides of triangle passed.
    E_BADARGS=65          # Wrong number of arguments.

    if [ $# -ne "$ARGS" ] # Test number of arguments to script.
    then
      echo "Usage: `basename $0` side_1 side_2"
      exit $E_BADARGS
    fi


    AWKSCRIPT=' { printf( "%3.7f\n", sqrt($1*$1 + $2*$2) ) } '
    #             command(s) / parameters passed to awk


    # Now, pipe the parameters to awk.
        echo -n "Hypotenuse of $1 and $2 = "
        echo $1 $2 | awk "$AWKSCRIPT"
    #   ^^^^^^^^^^^^
    # An echo-and-pipe is an easy way of passing shell parameters to awk.

    exit 0

    # Exercise: Rewrite this script using 'bc' rather than awk.
    #           Which method is more intuitive?
```

#### 12.11.2.9 Miscellaneous Commands

```text
Command that fit in no special category
```

#### 12.11.2.9.1 jot, seq

```text
    These utilities emit a sequence of integers, with a user-selectable increment.

    The default separator character between each integer is a newline, but this can be changed with the -s option.

    bash$ seq 5
    1
     2
     3
     4
     5



    bash$ seq -s : 5
    1:2:3:4:5
    	      

    Both jot and seq come in handy in a for loop.
```

#### 12.11.2.9.1.1 Generate list with preceding zeros, ex: 001 - 099

```text
seq -f "%03g" 99
```

#### 12.11.2.9.1.2 range for loop, like python for i in range

```text
$ for i in $(seq 5); do echo $i; done
1
2
3
4
5

					12.11.2.9.1.3
```

#### 12.11.2.9.2 Example 15-54. Using seq to generate loop arguments

```text
    #!/bin/bash
    # Using "seq"

    echo

    for a in `seq 80`  # or   for a in $( seq 80 )
    # Same as   for a in 1 2 3 4 5 ... 80   (saves much typing!).
    # May also use 'jot' (if present on system).
    do
      echo -n "$a "
    done      # 1 2 3 4 5 ... 80
    # Example of using the output of a command to generate 
    # the [list] in a "for" loop.

    echo; echo


    COUNT=80  # Yes, 'seq' also accepts a replaceable parameter.

    for a in `seq $COUNT`  # or   for a in $( seq $COUNT )
    do
      echo -n "$a "
    done      # 1 2 3 4 5 ... 80

    echo; echo

    BEGIN=75
    END=80

    for a in `seq $BEGIN $END`
    #  Giving "seq" two arguments starts the count at the first one,
    #+ and continues until it reaches the second.
    do
      echo -n "$a "
    done      # 75 76 77 78 79 80

    echo; echo

    BEGIN=45
    INTERVAL=5
    END=80

    for a in `seq $BEGIN $INTERVAL $END`
    #  Giving "seq" three arguments starts the count at the first one,
    #+ uses the second for a step interval,
    #+ and continues until it reaches the third.
    do
      echo -n "$a "
    done      # 45 50 55 60 65 70 75 80

    echo; echo

    exit 0

    A simpler example:

    #  Create a set of 10 files,
    #+ named file.1, file.2 . . . file.10.
    COUNT=10
    PREFIX=file

    for filename in `seq $COUNT`
    do
      touch $PREFIX.$filename
      #  Or, can do other operations,
      #+ such as rm, grep, etc.
    done
```

#### 12.11.2.9.3 Example 15-55. Letter Count"

```text
    #!/bin/bash
    # letter-count.sh: Counting letter occurrences in a text file.
    # Written by Stefano Palmeri.
    # Used in ABS Guide with permission.
    # Slightly modified by document author.

    MINARGS=2          # Script requires at least two arguments.
    E_BADARGS=65
    FILE=$1

    let LETTERS=$#-1   # How many letters specified (as command-line args).
                       # (Subtract 1 from number of command line args.)


    show_help(){
    	   echo
               echo Usage: `basename $0` file letters  
               echo Note: `basename $0` arguments are case sensitive.
               echo Example: `basename $0` foobar.txt G n U L i N U x.
    	   echo
    }

    # Checks number of arguments.
    if [ $# -lt $MINARGS ]; then
       echo
       echo "Not enough arguments."
       echo
       show_help
       exit $E_BADARGS
    fi  


    # Checks if file exists.
    if [ ! -f $FILE ]; then
        echo "File \"$FILE\" does not exist."
        exit $E_BADARGS
    fi



    # Counts letter occurrences .
    for n in `seq $LETTERS`; do
          shift
          if [[ `echo -n "$1" | wc -c` -eq 1 ]]; then             #  Checks arg.
                 echo "$1" -\> `cat $FILE | tr -cd  "$1" | wc -c` #  Counting.
          else
                 echo "$1 is not a  single char."
          fi  
    done

    exit $?

    #  This script has exactly the same functionality as letter-count2.sh,
    #+ but executes faster.
    #  Why?

    Note	Somewhat more capable than seq, jot is a classic UNIX utility that is not normally included in a standard Linux distro. However, the source rpm is available for download from the MIT repository.

    Unlike seq, jot can generate a sequence of random numbers, using the -r option.

    bash$ jot -r 3 999
    1069
     1272
     1428
```

#### 12.11.2.9.4 getopt

```text
    The getopt command parses command-line options preceded by a dash. This external command corresponds to the getopts Bash builtin. Using getopt permits handling long options by means of the -l flag, and this also allows parameter reshuffling.
```

#### 12.11.2.9.5 Example 15-56. Using getopt to parse command-line options

```text
    #!/bin/bash
    # Using getopt

    # Try the following when invoking this script:
    #   sh ex33a.sh -a
    #   sh ex33a.sh -abc
    #   sh ex33a.sh -a -b -c
    #   sh ex33a.sh -d
    #   sh ex33a.sh -dXYZ
    #   sh ex33a.sh -d XYZ
    #   sh ex33a.sh -abcd
    #   sh ex33a.sh -abcdZ
    #   sh ex33a.sh -z
    #   sh ex33a.sh a
    # Explain the results of each of the above.

    E_OPTERR=65

    if [ "$#" -eq 0 ]
    then   # Script needs at least one command-line argument.
      echo "Usage $0 -[options a,b,c]"
      exit $E_OPTERR
    fi  

    set -- `getopt "abcd:" "$@"`
    # Sets positional parameters to command-line arguments.
    # What happens if you use "$*" instead of "$@"?

    while [ ! -z "$1" ]
    do
      case "$1" in
        -a) echo "Option \"a\"";;
        -b) echo "Option \"b\"";;
        -c) echo "Option \"c\"";;
        -d) echo "Option \"d\" $2";;
         *) break;;
      esac

      shift
    done

    #  It is usually better to use the 'getopts' builtin in a script.
    #  See "ex33.sh."

    exit 0

    Note	

    As Peggy Russell points out:

    It is often necessary to include an eval to correctly process whitespace and quotes.

    args=$(getopt -o a:bc:d -- "$@")
    eval set -- "$args"
```

#### 12.11.2.9.6 run-parts

```text
    The run-parts command [1] executes all the scripts in a target directory, sequentially in ASCII-sorted filename order. Of course, the scripts need to have execute permission.

    The cron daemon invokes run-parts to run the scripts in the /etc/cron.* directories.
```

#### 12.11.2.9.7 yes

```text
    In its default behavior the yes command feeds a continuous string of the character y followed by a line feed to stdout. A control-C terminates the run. A different output string may be specified, as in yes different string, which would continually output different string to stdout.

    One might well ask the purpose of this. From the command line or in a script, the output of yes can be redirected or piped into a program expecting user input. In effect, this becomes a sort of poor man's version of expect.

    yes | fsck /dev/hda1 runs fsck non-interactively (careful!).

    yes | rm -r dirname has same effect as rm -rf dirname (careful!).

    Warning	Caution advised when piping yes to a potentially dangerous system command, such as fsck or fdisk. It might have unintended consequences.

    Note	The yes command parses variables, or more accurately, it echoes parsed variables. For example:

    bash$ yes $BASH_VERSION
|    3.1.17(1)-release
|     3.1.17(1)-release
|     3.1.17(1)-release
|     3.1.17(1)-release
|     3.1.17(1)-release
     . . .
    	      

    This particular "feature" may be used to create a very large ASCII file on the fly:

    bash$ yes $PATH > huge_file.txt
    Ctl-C	      
    	      

    Hit Ctl-C very quickly, or you just might get more than you bargained for. . . .

    Example, use for cleartool uncheckout to answer yes to creating keep file:
    yes | ct unco *
    "
Save private copy of "ldap_utf8.h"?  [yes] Private version of "ldap_utf8.h" saved in "ldap_utf8.h.keep".
Checkout cancelled for "ldap_utf8.h".
"
    The yes command may be emulated in a very simple script function.

    yes ()
    { # Trivial emulation of "yes" ...
      local DEFAULT_TEXT="yes"
      while [ true ]   # Endless loop.
      do
        if [ -z "$1" ]
        then
          echo "$DEFAULT_TEXT"
        else           # If argument ...
          echo "$1"    # ... expand and echo it.
        fi
      done             #  The only things missing are the
    }                  #+ --help and --version options.
```

#### 12.11.2.9.8 banner

```text
    Prints arguments as a large vertical banner to stdout, using an ASCII character (default '#'). This may be redirected to a printer for hardcopy.

    Note that banner has been dropped from many Linux distros.
```

#### 12.11.2.9.9 printenv

```text
    Show all the environmental variables set for a particular user.

    bash$ printenv | grep HOME
    HOME=/home/bozo
```

#### 12.11.2.9.10 lp

```text
    The lp and lpr commands send file(s) to the print queue, to be printed as hard copy. [2] These commands trace the origin of their names to the line printers of another era.

    bash$ lp file1.txt or bash lp <file1.txt

    It is often useful to pipe the formatted output from pr to lp.

    bash$ pr -options file1.txt | lp

    Formatting packages, such as groff and Ghostscript may send their output directly to lp.

    bash$ groff -Tascii file.tr | lp

    bash$ gs -options | lp file.ps

    Related commands are lpq, for viewing the print queue, and lprm, for removing jobs from the print queue.
```

#### 12.11.2.9.11 tee

```text
    [UNIX borrows an idea from the plumbing trade.]

    This is a redirection operator, but with a difference. Like the plumber's tee, it permits "siphoning off" to a file the output of a command or commands within a pipe, but without affecting the result. This is useful for printing an ongoing process to a file or paper, perhaps to keep track of it for debugging purposes.

                                 (redirection)
                                |----> to file
                                |
      ==========================|====================
      command ---> command ---> |tee ---> command ---> ---> output of pipe
      ===============================================
    	      

    cat listfile* | sort | tee check.file | uniq > result.file
    #                      ^^^^^^^^^^^^^^   ^^^^    

    #  The file "check.file" contains the concatenated sorted "listfiles,"
    #+ before the duplicate lines are removed by 'uniq.'
```

#### 12.11.2.9.12 mkfifo

```text
    This obscure command creates a named pipe, a temporary first-in-first-out buffer for transferring data between processes. [3] Typically, one process writes to the FIFO, and the other reads from it. See Example A-15.

    #!/bin/bash
    # This short script by Omair Eshkenazi.
    # Used in ABS Guide with permission (thanks!).

    mkfifo pipe1   # Yes, pipes can be given names.
    mkfifo pipe2   # Hence the designation "named pipe."

    (cut -d' ' -f1 | tr "a-z" "A-Z") >pipe2 <pipe1 &
    ls -l | tr -s ' ' | cut -d' ' -f3,9- | tee pipe1 |
    cut -d' ' -f2 | paste - pipe2

    rm -f pipe1
    rm -f pipe2

    # No need to kill background processes when script terminates (why not?).

    exit $?

    Now, invoke the script and explain the output:
    sh mkfifo-example.sh

    |4830.tar.gz          BOZO
    pipe1   BOZO
    pipe2   BOZO
    mkfifo-example.sh    BOZO
    Mixed.msg BOZO
```

#### 12.11.2.9.13 pathchk

```text
    This command checks the validity of a filename. If the filename exceeds the maximum allowable length (255 characters) or one or more of the directories in its path is not searchable, then an error message results.

    Unfortunately, pathchk does not return a recognizable error code, and it is therefore pretty much useless in a script. Consider instead the file test operators.
```

#### 12.11.2.9.14 dd

```text
    This is the somewhat obscure and much feared data duplicator command. Originally a utility for exchanging data on magnetic tapes between UNIX minicomputers and IBM mainframes, this command still has its uses. The dd command simply copies a file (or stdin/stdout), but with conversions. Possible conversions are ASCII/EBCDIC, [4] upper/lower case, swapping of byte pairs between input and output, and skipping and/or truncating the head or tail of the input file.

    # Converting a file to all uppercase:

    dd if=$filename conv=ucase > $filename.uppercase
    #                    lcase   # For lower case conversion

    Some basic options to dd are:

        * if=INFILE

          INFILE is the source file.
        * of=OUTFILE

          OUTFILE is the target file, the file that will have the data written to it.
        * bs=BLOCKSIZE

          This is the size of each block of data being read and written, usually a power of 2.
        * skip=BLOCKS

          How many blocks of data to skip in INFILE before starting to copy. This is useful when the INFILE has "garbage" or garbled data in its header or when it is desirable to copy only a portion of the INFILE.
        * seek=BLOCKS

          How many blocks of data to skip in OUTFILE before starting to copy, leaving blank data at beginning of OUTFILE.
        * count=BLOCKS

          Copy only this many blocks of data, rather than the entire INFILE.
        * conv=CONVERSION

          Type of conversion to be applied to INFILE data before copying operation.

    A dd --help lists all the options this powerful utility takes.
```

#### 12.11.2.9.15 Example 15-57. A script that copies itself

```text
    #!/bin/bash
    # self-copy.sh

    # This script copies itself.

    file_subscript=copy

    dd if=$0 of=$0.$file_subscript 2>/dev/null
    # Suppress messages from dd:   ^^^^^^^^^^^

    exit $?

    #  A program whose only output is its own source code
    #+ is called a "quine" per Willard Quine.
    #  Does this script qualify as a quine?
```

#### 12.11.2.9.16 Example 15-58. Exercising dd

```text
    #!/bin/bash
    # exercising-dd.sh

    # Script by Stephane Chazelas.
    # Somewhat modified by ABS Guide author.

    infile=$0       # This script.
    outfile=log.txt # This output file left behind.
    n=3
    p=5

    dd if=$infile of=$outfile bs=1 skip=$((n-1)) count=$((p-n+1)) 2> /dev/null
    # Extracts characters n to p (3 to 5) from this script.

    # --------------------------------------------------------

    echo -n "hello world" | dd cbs=1 conv=unblock 2> /dev/null
    # Echoes "hello world" vertically.
    # Why? Newline after each character dd emits.

    exit 0

    To demonstrate just how versatile dd is, let's use it to capture keystrokes.
```

#### 12.11.2.9.17 Example 15-59. Capturing Keystrokes

```text
    #!/bin/bash
    # dd-keypress.sh: Capture keystrokes without needing to press ENTER.


    keypresses=4                      # Number of keypresses to capture.


    old_tty_setting=$(stty -g)        # Save old terminal settings.

    echo "Press $keypresses keys."
    stty -icanon -echo                # Disable canonical mode.
                                      # Disable local echo.
    keys=$(dd bs=1 count=$keypresses 2> /dev/null)
    # 'dd' uses stdin, if "if" (input file) not specified.

    stty "$old_tty_setting"           # Restore old terminal settings.

    echo "You pressed the \"$keys\" keys."

    # Thanks, Stephane Chazelas, for showing the way.
    exit 0

    The dd command can do random access on a data stream.

    echo -n . | dd bs=1 seek=4 of=file conv=notrunc
    #  The "conv=notrunc" option means that the output file
    #+ will not be truncated.

    # Thanks, S.C.

    The dd command can copy raw data and disk images to and from devices, such as floppies and tape drives (Example A-5). A common use is creating boot floppies.

    dd if=kernel-image of=/dev/fd0H1440

    Similarly, dd can copy the entire contents of a floppy, even one formatted with a "foreign" OS, to the hard drive as an image file.

    dd if=/dev/fd0 of=/home/bozo/projects/floppy.img

    Other applications of dd include initializing temporary swap files (Example 28-2) and ramdisks (Example 28-3). It can even do a low-level copy of an entire hard drive partition, although this is not necessarily recommended.

    People (with presumably nothing better to do with their time) are constantly thinking of interesting applications of dd.
```

#### 12.11.2.9.18 Example 15-60. Securely deleting a file

```text
    #!/bin/bash
    # blot-out.sh: Erase "all" traces of a file.

    #  This script overwrites a target file alternately
    #+ with random bytes, then zeros before finally deleting it.
    #  After that, even examining the raw disk sectors by conventional methods
    #+ will not reveal the original file data.

    PASSES=7         #  Number of file-shredding passes.
                     #  Increasing this slows script execution,
                     #+ especially on large target files.
    BLOCKSIZE=1      #  I/O with /dev/urandom requires unit block size,
                     #+ otherwise you get weird results.
    E_BADARGS=70     #  Various error exit codes.
    E_NOT_FOUND=71
    E_CHANGED_MIND=72

    if [ -z "$1" ]   # No filename specified.
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS
    fi

    file=$1

    if [ ! -e "$file" ]
    then
      echo "File \"$file\" not found."
      exit $E_NOT_FOUND
    fi  

    echo; echo -n "Are you absolutely sure you want to blot out \"$file\" (y/n)? "
    read answer
    case "$answer" in
    [nN]) echo "Changed your mind, huh?"
          exit $E_CHANGED_MIND
          ;;
    *)    echo "Blotting out file \"$file\".";;
    esac


    flength=$(ls -l "$file" | awk '{print $5}')  # Field 5 is file length.
    pass_count=1

    chmod u+w "$file"   # Allow overwriting/deleting the file.

    echo

    while [ "$pass_count" -le "$PASSES" ]
    do
      echo "Pass #$pass_count"
      sync         # Flush buffers.
      dd if=/dev/urandom of=$file bs=$BLOCKSIZE count=$flength
                   # Fill with random bytes.
      sync         # Flush buffers again.
      dd if=/dev/zero of=$file bs=$BLOCKSIZE count=$flength
                   # Fill with zeros.
      sync         # Flush buffers yet again.
      let "pass_count += 1"
      echo
    done  


    rm -f $file    # Finally, delete scrambled and shredded file.
    sync           # Flush buffers a final time.

    echo "File \"$file\" blotted out and deleted."; echo


    exit 0

    #  This is a fairly secure, if inefficient and slow method
    #+ of thoroughly "shredding" a file.
    #  The "shred" command, part of the GNU "fileutils" package,
    #+ does the same thing, although more efficiently.

    #  The file cannot not be "undeleted" or retrieved by normal methods.
    #  However . . .
    #+ this simple method would *not* likely withstand
    #+ sophisticated forensic analysis.

    #  This script may not play well with a journaled file system.
    #  Exercise (difficult): Fix it so it does.



    #  Tom Vier's "wipe" file-deletion package does a much more thorough job
    #+ of file shredding than this simple script.
    #     http://www.ibiblio.org/pub/Linux/utils/file/wipe-2.0.0.tar.bz2

    #  For an in-depth analysis on the topic of file deletion and security,
    #+ see Peter Gutmann's paper,
    #+     "Secure Deletion of Data From Magnetic and Solid-State Memory".
    #       http://www.cs.auckland.ac.nz/~pgut001/pubs/secure_del.html

    See also the dd thread entry in the bibliography.
```

#### 12.11.2.9.19 od

```text
    The od, or octal dump filter converts input (or files) to octal (base-8) or other bases. This is useful for viewing or processing binary data files or otherwise unreadable system device files, such as /dev/urandom, and as a filter for binary data.

    head -c4 /dev/urandom | od -N4 -tu4 | sed -ne '1s/.* //p'
    # Sample output: 1324725719, 3918166450, 2989231420, etc.

    # From rnd.sh example script, by Stéphane Chazelas

    See also Example 9-31 and Example A-38.
```

#### 12.11.2.9.20 hexdump

```text
    Performs a hexadecimal, octal, decimal, or ASCII dump of a binary file. This command is the rough equivalent of od, above, but not nearly as useful. May be used to view the contents of a binary file, in combination with dd and less.

    dd if=/bin/ls | hexdump -C | less
    # The -C option nicely formats the output in tabular form.
```

#### 12.11.2.9.21 objdump

```text
    Displays information about an object file or binary executable in either hexadecimal form or as a disassembled listing (with the -d option).

    bash$ objdump -d /bin/ls
    /bin/ls:     file format elf32-i386

     Disassembly of section .init:

     080490bc <.init>:
      80490bc:       55                      push   %ebp
      80490bd:       89 e5                   mov    %esp,%ebp
      . . .
```

#### 12.11.2.9.22 mcookie

```text
    This command generates a "magic cookie," a 128-bit (32-character) pseudorandom hexadecimal number, normally used as an authorization "signature" by the X server. This also available for use in a script as a "quick 'n dirty" random number.

    random000=$(mcookie)

    Of course, a script could use md5sum for the same purpose.

    # Generate md5 checksum on the script itself.
    random001=`md5sum $0 | awk '{print $1}'`
    # Uses 'awk' to strip off the filename.

    The mcookie command gives yet another way to generate a "unique" filename.
```

#### 12.11.2.9.23 Example 15-61. Filename generator

```text
    #!/bin/bash
    # tempfile-name.sh:  temp filename generator

    BASE_STR=`mcookie`   # 32-character magic cookie.
    POS=11               # Arbitrary position in magic cookie string.
    LEN=5                # Get $LEN consecutive characters.

    prefix=temp          #  This is, after all, a "temp" file.
                         #  For more "uniqueness," generate the
                         #+ filename prefix using the same method
                         #+ as the suffix, below.

    suffix=${BASE_STR:POS:LEN}
                         #  Extract a 5-character string,
                         #+ starting at position 11.

    temp_filename=$prefix.$suffix
                         # Construct the filename.

    echo "Temp filename = "$temp_filename""

    # sh tempfile-name.sh
    # Temp filename = temp.e19ea

    #  Compare this method of generating "unique" filenames
    #+ with the 'date' method in ex51.sh.

    exit 0
```

#### 12.11.2.9.24 units

```text
    This utility converts between different units of measure. While normally invoked in interactive mode, units may find use in a script.
```

#### 12.11.2.9.25 Example 15-62. Converting meters to miles

```text
    #!/bin/bash
    # unit-conversion.sh


    convert_units ()  # Takes as arguments the units to convert.
    {
      cf=$(units "$1" "$2" | sed --silent -e '1p' | awk '{print $2}')
      # Strip off everything except the actual conversion factor.
      echo "$cf"
    }  

    Unit1=miles
    Unit2=meters
    cfactor=`convert_units $Unit1 $Unit2`
    quantity=3.73

    result=$(echo $quantity*$cfactor | bc)

    echo "There are $result $Unit2 in $quantity $Unit1."

    #  What happens if you pass incompatible units,
    #+ such as "acres" and "miles" to the function?

    exit 0
```

#### 12.11.2.9.26 m4

```text
    A hidden treasure, m4 is a powerful macro [5] processing filter, virtually a complete language. Although originally written as a pre-processor for RatFor, m4 turned out to be useful as a stand-alone utility. In fact, m4 combines some of the functionality of eval, tr, and awk, in addition to its extensive macro expansion facilities.

    The April, 2002 issue of Linux Journal has a very nice article on m4 and its uses.
```

#### 12.11.2.9.27 Example 15-63. Using m4

```text
    #!/bin/bash
    # m4.sh: Using the m4 macro processor

    # Strings
    string=abcdA01
    echo "len($string)" | m4                            #   7
    echo "substr($string,4)" | m4                       # A01
    echo "regexp($string,[0-1][0-1],\&Z)" | m4          # 01Z

    # Arithmetic
    echo "incr(22)" | m4                                #  23
    echo "eval(99 / 3)" | m4                            #  33

    exit 0
```

#### 12.11.2.9.28 xmessage

```text
    This X-based variant of echo pops up a message/query window on the desktop.

    xmessage Left click to continue -button okay
```

#### 12.11.2.9.29 zenity

```text
    The zenity utility is adept at displaying GTK+ dialog widgets and very suitable for scripting purposes.
```

#### 12.11.2.9.30 doexec

```text
    The doexec command enables passing an arbitrary list of arguments to a binary executable. In particular, passing argv[0] (which corresponds to $0 in a script) lets the executable be invoked by various names, and it can then carry out different sets of actions, according to the name by which it was called. What this amounts to is roundabout way of passing options to an executable.

    For example, the /usr/local/bin directory might contain a binary called "aaa". Invoking doexec /usr/local/bin/aaa list would list all those files in the current working directory beginning with an "a", while invoking (the same executable with) doexec /usr/local/bin/aaa delete would delete those files.

    Note	The various behaviors of the executable must be defined within the code of the executable itself, analogous to something like the following in a shell script:

    case `basename $0` in
    "name1" ) do_something;;
    "name2" ) do_something_else;;
    "name3" ) do_yet_another_thing;;
    *       ) bail_out;;
    esac
```

#### 12.11.2.9.31 dialog

```text
    The dialog family of tools provide a method of calling interactive "dialog" boxes from a script. The more elaborate variations of dialog -- gdialog, Xdialog, and kdialog -- actually invoke X-Windows widgets.
```

#### 12.11.2.9.32 sox

```text
    The sox, or "sound exchange" command plays and performs transformations on sound files. In fact, the /usr/bin/play executable (now deprecated) is nothing but a shell wrapper for sox.

    For example, sox soundfile.wav soundfile.au changes a WAV sound file into a (Sun audio format) AU sound file.

    Shell scripts are ideally suited for batch-processing sox operations on sound files. For examples, see the Linux Radio Timeshift HOWTO and the MP3do Project.
```
