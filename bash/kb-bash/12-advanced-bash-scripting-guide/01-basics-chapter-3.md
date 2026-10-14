---
type: reference
title: Basics (chapter 3)
description: Subsection 12.1 of Advanced Bash-Scripting Guide.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.1"
---

# 12.1 Basics (chapter 3)

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

### 12.1.1 Special Characters

```text
    Comments. Lines beginning with a #  (with the exception of #!) are comments and will not be executed.

    # This line is a comment.

    Comments may also occur following the end of a command.

    echo "A comment will follow." # Comment here.
    #                            ^ Note whitespace before #

    Comments may also follow whitespace at the beginning of a line.

    	# A tab precedes this comment.

    Caution: A command may not follow a comment on the same line. There is no method of terminating the comment, in order for "live code" to begin on the same line. Use a new line for the next command.

    Note	Of course, an escaped # in an echo statement does not begin a comment. Likewise, a # appears in certain parameter substitution constructs and in numerical constant expressions.

    echo "The # here does not begin a comment."
    echo 'The # here does not begin a comment.'
    echo The \# here does not begin a comment.
    echo The # here begins a comment.

    echo ${PATH#*:}       # Parameter substitution, not a comment.
    echo $(( 2#101011 ))  # Base conversion, not a comment.

    # Thanks, S.C.

    The standard quoting and escape characters (" ' \) escape the #.

    Certain pattern matching operations also use the #.
; Command separator [semicolon]. Permits putting two or more commands on the same line.

    echo hello; echo there


    if [ -x "$filename" ]; then    # Note that "if" and "then" need separation.
                                   # Why?
      echo "File $filename exists."; cp $filename $filename.bak
    else
      echo "File $filename not found."; touch $filename
    fi; echo "File test complete."

    Note that the ";" sometimes needs to be escaped.
;; Terminator in a case option [double semicolon].

    case "$variable" in
      abc)  echo "\$variable = abc" ;;
      xyz)  echo "\$variable = xyz" ;;
    esac

.  "dot" command [period]. Equivalent to source (see Example 14-22). This is a bash builtin.
.  "dot", as a component of a filename. When working with filenames, a dot is the prefix of a "hidden" file, a file that an ls will not normally show.

    bash$ touch .hidden-file
    bash$ ls -l	      
    total 10
     -rw-r--r--    1 bozo      4034 Jul 18 22:04 data1.addressbook
     -rw-r--r--    1 bozo      4602 May 25 13:58 data1.addressbook.bak
     -rw-r--r--    1 bozo       877 Dec 17  2000 employment.addressbook


    bash$ ls -al	      
    total 14
     drwxrwxr-x    2 bozo  bozo      1024 Aug 29 20:54 ./
     drwx------   52 bozo  bozo      3072 Aug 29 20:51 ../
     -rw-r--r--    1 bozo  bozo      4034 Jul 18 22:04 data1.addressbook
     -rw-r--r--    1 bozo  bozo      4602 May 25 13:58 data1.addressbook.bak
     -rw-r--r--    1 bozo  bozo       877 Dec 17  2000 employment.addressbook
     -rw-rw-r--    1 bozo  bozo         0 Aug 29 20:54 .hidden-file
    	        

    When considering directory names, a single dot represents the current working directory, and two dots denote the parent directory.

    bash$ pwd
    /home/bozo/projects

    bash$ cd .
    bash$ pwd
    /home/bozo/projects

    bash$ cd ..
    bash$ pwd
    /home/bozo/
    	        

    The dot often appears as the destination (directory) of a file movement command.

    bash$ cp /home/bozo/current_work/junk/* .
    	        

.  "dot" character match. When matching characters, as part of a regular expression, a "dot" matches a single character.
" partial quoting [double quote]. "STRING" preserves (from interpretation) most of the special characters within STRING. See also Chapter 5.
' full quoting [single quote]. 'STRING' preserves all special characters within STRING. This is a stronger form of quoting than using ". See also Chapter 5.
, comma operator. The comma operator [1] links together a series of arithmetic operations. All are evaluated, but only the last one is returned.

    let "t2 = ((a = 9, 15 / 3))"  # Set "a =
    	       9" and "t2 = 15 / 3"

\ escape [backslash]. A quoting mechanism for single characters.

\X "escapes" the character X. This has the effect of "quoting" X, equivalent to 'X'. The \ may be used to quote " and ', so they are expressed literally.

    See Chapter 5 for an in-depth explanation of escaped characters.
/ Filename path separator [forward slash]. Separates the components of a filename (as in /home/bozo/projects/Makefile).

    This is also the division arithmetic operator.
` command substitution. The `command` construct makes available the output of command for assignment to a variable. This is also known as backquotes or backticks.
: null command [colon]. This is the shell equivalent of a "NOP" (no op, a do-nothing operation). It may be considered a synonym for the shell builtin true. The ":" command is itself a Bash builtin, and its exit status is "true" (0).

    :
    echo $?   # 0

    Endless loop:

    while :
    do
       operation-1
       operation-2
       ...
       operation-n
    done

    # Same as:
    #    while true
    #    do
    #      ...
    #    done

    Placeholder in if/then test:

    if condition
    then :   # Do nothing and branch ahead
    else
       take-some-action
    fi

    Provide a placeholder where a binary operation is expected, see Example 8-2 and default parameters.

    : ${username=`whoami`}
    # ${username=`whoami`}   Gives an error without the leading :
    #                        unless "username" is a command or builtin...

    Provide a placeholder where a command is expected in a here document. See Example 18-10.

    Evaluate string of variables using parameter substitution (as in Example 9-16).

    : ${HOSTNAME?} ${USER?} ${MAIL?}
    #  Prints error message
    #+ if one or more of essential environmental variables not set.

    Variable expansion / substring replacement.

    In combination with the > redirection operator, truncates a file to zero length, without changing its permissions. If the file did not previously exist, creates it.

    : > data.xxx   # File "data.xxx" now empty.	      

    # Same effect as   cat /dev/null >data.xxx
    # However, this does not fork a new process, since ":" is a builtin.

    See also Example 15-14.

    In combination with the >> redirection operator, has no effect on a pre-existing target file (: >> target_file). If the file did not previously exist, creates it.

    Note	

    This applies to regular files, not pipes, symlinks, and certain special files.

    May be used to begin a comment line, although this is not recommended. Using # for a comment turns off error checking for the remainder of that line, so almost anything may appear in a comment. However, this is not the case with :.

    : This is a comment that generates an error, ( if [ $x -eq 3] ).

    The ":" also serves as a field separator, in /etc/passwd, and in the $PATH variable.

    bash$ echo $PATH
    /usr/local/bin:/bin:/usr/bin:/usr/X11R6/bin:/sbin:/usr/sbin:/usr/games

!  reverse (or negate) the sense of a test or exit status [bang]. The ! operator inverts the exit status of the command to which it is applied (see Example 6-2). It also inverts the meaning of a test operator. This can, for example, change the sense of "equal" ( = ) to "not-equal" ( != ). The ! operator is a Bash keyword.

    In a different context, the ! also appears in indirect variable references.

    In yet another context, from the command line, the ! invokes the Bash history mechanism (see Appendix J). Note that within a script, the history mechanism is disabled.
* wild card [asterisk]. The * character serves as a "wild card" for filename expansion in globbing. By itself, it matches every filename in a given directory.

    bash$ echo *
    abs-book.sgml add-drive.sh agram.sh alias.sh
    	      

    The * also represents any number (or zero) characters in a regular expression.
* arithmetic operator. In the context of arithmetic operations, the * denotes multiplication.
A double asterisk, **, is the exponentiation operator.
?  test operator. Within certain expressions, the ? indicates a test for a condition.

    In a double parentheses construct, the ? can serve as an element of a C-style trinary operator, ?:.

    (( var0 = var1<98?9:21 ))
    #                ^ ^

    # if [ "$var1" -lt 98 ]
    # then
    #   var0=9
    # else
    #   var0=21
    # fi

    In a parameter substitution expression, the ? tests whether a variable has been set.
?  wild card. The ? character serves as a single-character "wild card" for filename expansion in globbing, as well as representing one character in an extended regular expression.
$ Variable substitution (contents of a variable).

    var1=5
    var2=23skidoo

    echo $var1     # 5
    echo $var2     # 23skidoo

    A $ prefixing a variable name indicates the value the variable holds.
$ end-of-line. In a regular expression, a "$" addresses the end of a line of text.
${} Parameter substitution. 
$*, $@ positional parameters. 
$?  exit status variable. The $? variable holds the exit status of a command, a function, or of the script itself.
$$ process ID variable. The $$ variable holds the process ID [2] of the script in which it appears.
() command group.

    (a=hello; echo $a)

    Important	A listing of commands within parentheses starts a subshell.

    Variables inside parentheses, within the subshell, are not visible to the rest of the script. The parent process, the script, cannot read variables created in the child process, the subshell.

    a=123
    ( a=321; )	      

    echo "a = $a"   # a = 123
    # "a" within parentheses acts like a local variable.

    array initialization.

    Array=(element1 element2 element3)

{xxx,yyy,zzz,...}

    Brace expansion.

    cat {file1,file2,file3} > combined_file
    # Concatenates the files file1, file2, and file3 into combined_file.


    cp file22.{txt,backup}
    # Copies "file22.txt" to "file22.backup"

    A command may act upon a comma-separated list of file specs within braces. [3] Filename expansion (globbing) applies to the file specs between the braces.

    Caution	No spaces allowed within the braces unless the spaces are quoted or escaped.

    echo {file1,file2}\ :{\ A," B",' C'}

    file1 : A file1 : B file1 : C file2 : A file2 : B file2 : C
{a..z} Extended Brace expansion.

    echo {a..z} # a b c d e f g h i j k l m n o p q r s t u v w x y z
    # Echoes characters between a and z.

    echo {0..3} # 0 1 2 3
    # Echoes characters between 0 and 3.

    The {a..z} extended brace expansion construction is a feature introduced in version 3 of Bash.
{} Block of code [curly brackets]. Also referred to as an inline group, this construct, in effect, creates an anonymous function (a function without a name). However, unlike in a "standard" function, the variables inside a code block remain visible to the remainder of the script.

    bash$ { local a;
    	      a=123; }
    bash: local: can only be used in a
    function
    	      

    a=123
    { a=321; }
    echo "a = $a"   # a = 321   (value inside code block)

    # Thanks, S.C.

    The code block enclosed in braces may have I/O redirected to and from it.

    Example 3-1. Code blocks and I/O redirection

    #!/bin/bash
    # Reading lines in /etc/fstab.

    File=/etc/fstab

    {
    read line1
    read line2
    } < $File

    echo "First line in $File is:"
    echo "$line1"
    echo
    echo "Second line in $File is:"
    echo "$line2"

    exit 0

    # Now, how do you parse the separate fields of each line?
    # Hint: use awk, or . . .
    # . . . Hans-Joerg Diers suggests using the "set" Bash builtin.

    Example 3-2. Saving the output of a code block to a file

    #!/bin/bash
    # rpm-check.sh

    #  Queries an rpm file for description, listing,
    #+ and whether it can be installed.
    #  Saves output to a file.
    # 
    #  This script illustrates using a code block.

    SUCCESS=0
    E_NOARGS=65

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` rpm-file"
      exit $E_NOARGS
    fi  

    { # Begin code block.
      echo
      echo "Archive Description:"
      rpm -qpi $1       # Query description.
      echo
      echo "Archive Listing:"
      rpm -qpl $1       # Query listing.
      echo
      rpm -i --test $1  # Query whether rpm file can be installed.
      if [ "$?" -eq $SUCCESS ]
      then
        echo "$1 can be installed."
      else
        echo "$1 cannot be installed."
      fi  
      echo              # End code block.
    } > "$1.test"       # Redirects output of everything in block to file.

    echo "Results of rpm test in file $1.test"

    # See rpm man page for explanation of options.

    exit 0

    Note	

    Unlike a command group within (parentheses), as above, a code block enclosed by {braces} will not normally launch a subshell. [4] 
{} placeholder for text. Used after xargs -i (replace strings option). The {} double curly brackets are a placeholder for output text.

    ls . | xargs -i -t cp ./{} $1
    #            ^^         ^^

    # From "ex42.sh" (copydir.sh) example.

{} \; pathname. Mostly used in find constructs. This is not a shell builtin.

    Note	The ";" ends the -exec option of a find command sequence. It needs to be escaped to protect it from interpretation by the shell.
[ ] test.
Test expression between [ ]. Note that [ is part of the shell builtin test (and a synonym for it), not a link to the external command /usr/bin/test.
[[ ]] test.

    Test expression between [[ ]]. This is a shell keyword.

    See the discussion on the [[ ... ]] construct.
[ ] array element.

    In the context of an array, brackets set off the numbering of each element of that array.

    Array[1]=slot_1
    echo ${Array[1]}

[ ] range of characters.

    As part of a regular expression, brackets delineate a range of characters to match.
(( )) integer expansion.

    Expand and evaluate integer expression between (( )).

    See the discussion on the (( ... )) construct.
> &> >& >> < <> redirection.

    scriptname >filename redirects the output of scriptname to file filename. Overwrite filename if it already exists.

    command &>filename redirects both the stdout and the stderr of command to filename.

    command >&2 redirects stdout of command to stderr.

    scriptname >>filename appends the output of scriptname to file filename. If filename does not already exist, it is created.

    [i]<>filename opens file filename for reading and writing, and assigns file descriptor i to it. If filename does not exist, it is created.

    process substitution.

    (command)>

    <(command)

    In a different context, the "<" and ">" characters act as string comparison operators.

    In yet another context, the "<" and ">" characters act as integer comparison operators. See also Example 15-9.
<< redirection used in a here document. 
<<< redirection used in a here string. 
<, > ASCII comparison.

    veg1=carrots
    veg2=tomatoes

    if [[ "$veg1" < "$veg2" ]]
    then
      echo "Although $veg1 precede $veg2 in the dictionary,"
      echo -n "this does not necessarily imply anything "
      echo "about my culinary preferences."
    else
      echo "What kind of dictionary are you using, anyhow?"
    fi

\<, \> word boundary in a regular expression.

    bash$ grep '\<the\>' textfile
| pipe. Passes the output (stdout of a previous command to the input (stdin) of the next one, or to the shell. This is a method of chaining commands together.

    echo ls -l | sh
    #  Passes the output of "echo ls -l" to the shell,
    #+ with the same result as a simple "ls -l".


    cat *.lst | sort | uniq
    # Merges and sorts all ".lst" files, then deletes duplicate lines.

    A pipe, as a classic method of interprocess communication, sends the stdout of one process to the stdin of another. In a typical case, a command, such as cat or echo, pipes a stream of data to a filter (a command that transforms its input) for processing.

    cat $filename1 $filename2 | grep $search_word

    For an interesting note on the complexity of using UNIX pipes, see the UNIX FAQ, Part 3.

    The output of a command or commands may be piped to a script.

    #!/bin/bash
    # uppercase.sh : Changes input to uppercase.

    tr 'a-z' 'A-Z'
    #  Letter ranges must be quoted
    #+ to prevent filename generation from single-letter filenames.

    exit 0

    Now, let us pipe the output of ls -l to this script.

    bash$ ls -l | ./uppercase.sh
    -RW-RW-R--    1 BOZO  BOZO       109 APR  7 19:49 1.TXT
     -RW-RW-R--    1 BOZO  BOZO       109 APR 14 16:48 2.TXT
     -RW-R--R--    1 BOZO  BOZO       725 APR 20 20:56 DATA-FILE
    	      

    Note	

    The stdout of each process in a pipe must be read as the stdin of the next. If this is not the case, the data stream will block, and the pipe will not behave as expected.

    cat file1 file2 | ls -l | sort
    # The output from "cat file1 file2" disappears.

    A pipe runs as a child process, and therefore cannot alter script variables.

    variable="initial_value"
    echo "new_value" | read variable
    echo "variable = $variable"     # variable = initial_value

    If one of the commands in the pipe aborts, this prematurely terminates execution of the pipe. Called a broken pipe, this condition sends a SIGPIPE signal.
>| force redirection (even if the noclobber option is set). This will forcibly overwrite an existing file.
|| OR logical operator. In a test construct, the || operator causes a return of 0 (success) if either of the linked test conditions is true.
& Run job in background. A command followed by an & will run in the background.

    bash$ sleep 10 &
    [1] 850
    [1]+  Done                    sleep 10
    	      

    Within a script, commands and even loops may run in the background.

    Example 3-3. Running a loop in the background

    #!/bin/bash
    # background-loop.sh

    for i in 1 2 3 4 5 6 7 8 9 10            # First loop.
    do
      echo -n "$i "
    done & # Run this loop in background.
           # Will sometimes execute after second loop.

    echo   # This 'echo' sometimes will not display.

    for i in 11 12 13 14 15 16 17 18 19 20   # Second loop.
    do
      echo -n "$i "
    done  

    echo   # This 'echo' sometimes will not display.

    # ======================================================

    # The expected output from the script:
    # 1 2 3 4 5 6 7 8 9 10 
    # 11 12 13 14 15 16 17 18 19 20 

    # Sometimes, though, you get:
    # 11 12 13 14 15 16 17 18 19 20 
    # 1 2 3 4 5 6 7 8 9 10 bozo $
    # (The second 'echo' doesn't execute. Why?)

    # Occasionally also:
    # 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20
    # (The first 'echo' doesn't execute. Why?)

    # Very rarely something like:
    # 11 12 13 1 2 3 4 5 6 7 8 9 10 14 15 16 17 18 19 20 
    # The foreground loop preempts the background one.

    exit 0

    #  Nasimuddin Ansari suggests adding    sleep 1
    #+ after the   echo -n "$i"   in lines 6 and 14,
    #+ for some real fun.

    Caution	

    A command run in the background within a script may cause the script to hang, waiting for a keystroke. Fortunately, there is a remedy for this.
&& AND logical operator. In a test construct, the && operator causes a return of 0 (success) only if both the linked test conditions are true.
- option, prefix. Option flag for a command or filter. Prefix for an operator. Prefix for a default parameter in parameter substitution.

    COMMAND -[Option1][Option2][...]

    ls -al

    sort -dfu $filename

    if [ $file1 -ot $file2 ]
    then #      ^
      echo "File $file1 is older than $file2."
    fi

    if [ "$a" -eq "$b" ]
    then      ^
      echo "$a is equal to $b."
    fi

    if [ "$c" -eq 24 -a "$d" -eq 47 ]
    then      ^              ^
      echo "$c equals 24 and $d equals 47."
    fi


    param2=${param1:-$DEFAULTVAL}
    #               ^

    --

    The double-dash -- prefixes long (verbatim) options to commands.

    sort --ignore-leading-blanks

    Used with a Bash builtin, it means the end of options to that particular command.

    It is also used in conjunction with set.

    set -- $variable (as in Example 14-18)
- redirection from/to stdin or stdout [dash].

    (cd /source/directory && tar cf - . ) | (cd /dest/directory && tar xpvf -)
    # Move entire file tree from one directory to another
    # [courtesy Alan Cox <a.cox@swansea.ac.uk>, with a minor change]

    # 1) cd /source/directory
    #    Source directory, where the files to be moved are.
    # 2) &&
    #   "And-list": if the 'cd' operation successful,
    #    then execute the next command.
    # 3) tar cf - .
    #    The 'c' option 'tar' archiving command creates a new archive,
    #    the 'f' (file) option, followed by '-' designates the target file
    #    as stdout, and do it in current directory tree ('.').
    # 4) |
    #    Piped to ...
    # 5) ( ... )
    #    a subshell
    # 6) cd /dest/directory
    #    Change to the destination directory.
    # 7) &&
    #   "And-list", as above
    # 8) tar xpvf -
    #    Unarchive ('x'), preserve ownership and file permissions ('p'),
    #    and send verbose messages to stdout ('v'),
    #    reading data from stdin ('f' followed by '-').
    #
    #    Note that 'x' is a command, and 'p', 'v', 'f' are options.
    #
    # Whew!



    # More elegant than, but equivalent to:
    #   cd source/directory
    #   tar cf - . | (cd ../dest/directory; tar xpvf -)
    #
    #     Also having same effect:
    # cp -a /source/directory/* /dest/directory */
    #     Or:
    # cp -a /source/directory/* /source/directory/.[^.]* /dest/directory */
    #     If there are hidden files in /source/directory.

    bunzip2 -c linux-2.6.16.tar.bz2 | tar xvf -
    #  --uncompress tar file--    | --then pass it to "tar"--
    #  If "tar" has not been patched to handle "bunzip2",
    #+ this needs to be done in two discrete steps, using a pipe.
    #  The purpose of the exercise is to unarchive "bzipped" kernel source.

    Note that in this context the "-" is not itself a Bash operator, but rather an option recognized by certain UNIX utilities that write to stdout, such as tar, cat, etc.

    bash$ echo "whatever" | cat -
    whatever 

    Where a filename is expected, - redirects output to stdout (sometimes seen with tar cf), or accepts input from stdin, rather than from a file. This is a method of using a file-oriented utility as a filter in a pipe.

    bash$ file
    Usage: file [-bciknvzL] [-f namefile] [-m magicfiles] file...
    	      

    By itself on the command line, file fails with an error message.

    Add a "-" for a more useful result. This causes the shell to await user input.

    bash$ file -
    abc
    standard input:              ASCII text



    bash$ file -
    #!/bin/bash
    standard input:              Bourne-Again shell script text executable
    	      

    Now the command accepts input from stdin and analyzes it.

    The "-" can be used to pipe stdout to other commands. This permits such stunts as prepending lines to a file.

    Using diff to compare a file with a section of another:

    grep Linux file1 | diff file2 -

    Finally, a real-world example using - with tar.

    Example 3-4. Backup of all files changed in last day

    #!/bin/bash

    #  Backs up all files in current directory modified within last 24 hours
    #+ in a "tarball" (tarred and gzipped file).

    BACKUPFILE=backup-$(date +%m-%d-%Y)
    #                 Embeds date in backup filename.
    #                 Thanks, Joshua Tschida, for the idea.
    archive=${1:-$BACKUPFILE}
    #  If no backup-archive filename specified on command line,
    #+ it will default to "backup-MM-DD-YYYY.tar.gz."

    tar cvf - `find . -mtime -1 -type f -print` > $archive.tar
    gzip $archive.tar
    echo "Directory $PWD backed up in archive file \"$archive.tar.gz\"."


    #  Stephane Chazelas points out that the above code will fail
    #+ if there are too many files found
    #+ or if any filenames contain blank characters.

    # He suggests the following alternatives:
    # -------------------------------------------------------------------
    #   find . -mtime -1 -type f -print0 | xargs -0 tar rvf "$archive.tar"
    #      using the GNU version of "find".


    #   find . -mtime -1 -type f -exec tar rvf "$archive.tar" '{}' \;
    #         portable to other UNIX flavors, but much slower.
    # -------------------------------------------------------------------


    exit 0

    Caution	

    Filenames beginning with "-" may cause problems when coupled with the "-" redirection operator. A script should check for this and add an appropriate prefix to such filenames, for example ./-FILENAME, $PWD/-FILENAME, or $PATHNAME/-FILENAME.

    If the value of a variable begins with a -, this may likewise create problems.

    var="-n"
    echo $var		
    # Has the effect of "echo -n", and outputs nothing.

- previous working directory. A cd - command changes to the previous working directory. This uses the $OLDPWD environmental variable.

    Caution	Do not confuse the "-" used in this sense with the "-" redirection operator just discussed. The interpretation of the "-" depends on the context in which it appears.
- Minus. Minus sign in an arithmetic operation.
= Equals. Assignment operator

    a=28
    echo $a   # 28

    In a different context, the "=" is a string comparison operator.
+ Plus. Addition arithmetic operator.

    In a different context, the + is a Regular Expression operator.
+ Option. Option flag for a command or filter.

    Certain commands and builtins use the + to enable certain options and the - to disable them. In parameter substitution, the + prefixes an alternate value that a variable expands to.
% modulo. Modulo (remainder of a division) arithmetic operation.

    In a different context, the % is a pattern matching operator.
~ home directory [tilde]. This corresponds to the $HOME internal variable. ~bozo is bozo's home directory, and ls ~bozo lists the contents of it. ~/ is the current user's home directory, and ls ~/ lists the contents of it.

    bash$ echo ~bozo
    /home/bozo

    bash$ echo ~
    /home/bozo

    bash$ echo ~/
    /home/bozo/

    bash$ echo ~:
    /home/bozo:

    bash$ echo ~nonexistent-user
    ~nonexistent-user
    	      

~+ current working directory. This corresponds to the $PWD internal variable.
~- previous working directory. This corresponds to the $OLDPWD internal variable.
=~ regular expression match. This operator was introduced with version 3 of Bash.
^ beginning-of-line. In a regular expression, a "^" addresses the beginning of a line of text.
Control Characters

    change the behavior of the terminal or text display. A control character is a CONTROL + key combination (pressed simultaneously). A control character may also be written in octal or hexadecimal notation, following an escape.

    Control characters are not normally useful inside a script.

        * Ctl-B Backspace (nondestructive).
        * Ctl-C Break. Terminate a foreground job.
        * Ctl-D Log out from a shell (similar to exit).

          "EOF" (end of file). This also terminates input from stdin.

          When typing text on the console or in an xterm window, Ctl-D erases the character under the cursor. When there are no characters present, Ctl-D logs out of the session, as expected. In an xterm window, this has the effect of closing the window.
        * Ctl-G "BEL" (beep). On some old-time teletype terminals, this would actually ring a bell.
        * Ctl-H "Rubout" (destructive backspace). Erases characters the cursor backs over while backspacing.

          #!/bin/bash
          # Embedding Ctl-H in a string.

          a="^H^H"                  # Two Ctl-H's -- backspaces
                                    # ctl-V ctl-H, using vi/vim
          echo "abcdef"             # abcdef
          echo
          echo -n "abcdef$a "       # abcd f
          #  Space at end  ^              ^  Backspaces twice.
          echo
          echo -n "abcdef$a"        # abcdef
          #  No space at end               ^ Doesn't backspace (why?).
                                    # Results may not be quite as expected.
          echo; echo

          # Constantin Hagemeier suggests trying:
          # a=$'\010\010'
          # a=$'\b\b'
          # a=$'\x08\x08'
          # But, this does not change the results.

        * Ctl-I Horizontal tab.
        * Ctl-J Newline (line feed). In a script, may also be expressed in octal notation -- '\012' or in hexadecimal -- '\x0a'.
        * Ctl-K Vertical tab.

          When typing text on the console or in an xterm window, Ctl-K erases from the character under the cursor to end of line. Within a script, Ctl-K may behave differently, as in Lee Lee Maschmeyer's example, below.
        * Ctl-L Formfeed (clear the terminal screen). In a terminal, this has the same effect as the clear command. When sent to a printer, a Ctl-L causes an advance to end of the paper sheet.
        * Ctl-M Carriage return.

          #!/bin/bash
          # Thank you, Lee Maschmeyer, for this example.

          read -n 1 -s -p \
          $'Control-M leaves cursor at beginning of this line. Press Enter. \x0d'
                     # Of course, '0d' is the hex equivalent of Control-M.
          echo >&2   #  The '-s' makes anything typed silent,
                     #+ so it is necessary to go to new line explicitly.

          read -n 1 -s -p $'Control-J leaves cursor on next line. \x0a'
                     #  '0a' is the hex equivalent of Control-J, linefeed.
          echo >&2

          ###

          read -n 1 -s -p $'And Control-K\x0bgoes straight down.'
          echo >&2   #  Control-K is vertical tab.

          # A better example of the effect of a vertical tab is:

          var=$'\x0aThis is the bottom line\x0bThis is the top line\x0a'
          echo "$var"
          #  This works the same way as the above example. However:
          echo "$var" | col
          #  This causes the right end of the line to be higher than the left end.
          #  It also explains why we started and ended with a line feed --
          #+ to avoid a garbled screen.

          # As Lee Maschmeyer explains:
          # --------------------------
          #  In the [first vertical tab example] . . . the vertical tab
          #+ makes the printing go straight down without a carriage return.
          #  This is true only on devices, such as the Linux console,
          #+ that can't go "backward."
          #  The real purpose of VT is to go straight UP, not down.
          #  It can be used to print superscripts on a printer.
          #  The col utility can be used to emulate the proper behavior of VT.

          exit 0

        * Ctl-Q Resume (XON).

          This resumes stdin in a terminal.
        * Ctl-S Suspend (XOFF).

          This freezes stdin in a terminal. (Use Ctl-Q to restore input.)
        * Ctl-U Erase a line of input, from the cursor backward to beginning of line. In some settings, Ctl-U erases the entire line of input, regardless of cursor position.
        * Ctl-V When inputting text, Ctl-V permits inserting control characters. For example, the following two are equivalent:

          echo -e '\x0a'
          echo <Ctl-V><Ctl-J>

          Ctl-V is primarily useful from within a text editor.
        * Ctl-W When typing text on the console or in an xterm window, Ctl-W erases from the character under the cursor backwards to the first instance of whitespace. In some settings, Ctl-W erases backwards to first non-alphanumeric character.
        * Ctl-Y Pastes back text previously erased (with Ctl-K or Ctl-U).
        * Ctl-Z Pause a foreground job.

Whitespace

    functions as a separator, separating commands or variables. Whitespace consists of either spaces, tabs, blank lines, or any combination thereof. [5] In some contexts, such as variable assignment, whitespace is not permitted, and results in a syntax error.

    Blank lines have no effect on the action of a script, and are therefore useful for visually separating functional sections.

    $IFS, the special variable separating fields of input to certain commands, defaults to whitespace.

    To preserve whitespace within a string or in a variable, use quoting.
```

### 12.1.2 Introduction to Variables and Parameters (Chapter 4)

#### 12.1.2.1 Variable Substitution

```text
			The name of a variable is a placeholder for its value, the data it holds. Referencing its value is called variable substitution.

$ Let us carefully distinguish between the name of a variable and its value. If variable1 is the name of a variable, then $variable1 is a reference to its value, the data item it contains. [1]

    bash$ variable=23


    bash$ echo variable
    variable

    bash$ echo $variable
    23

    The only time a variable appears "naked" -- without the $ prefix -- is when declared or assigned, when unset, when exported, or in the special case of a variable representing a signal (see Example 29-5). Assignment may be with an = (as in var1=27), in a read statement, and at the head of a loop (for var2 in 1 2 3).

    Enclosing a referenced value in double quotes (" ") does not interfere with variable substitution. This is called partial quoting, sometimes referred to as "weak quoting." Using single quotes (' ') causes the variable name to be used literally, and no substitution will take place. This is full quoting, sometimes referred to as "strong quoting." See Chapter 5 for a detailed discussion.
//'

    Note that $variable is actually a simplified alternate form of ${variable}. In contexts where the $variable syntax causes an error, the longer form may work.

    Example Variable assignment and substitution

    #!/bin/bash
    # ex9.sh

    # Variables: assignment and substitution

    a=375
    hello=$a

    #-------------------------------------------------------------------------
    # No space permitted on either side of = sign when initializing variables.
    # What happens if there is a space?

    #  "VARIABLE =value"
    #           ^
    #% Script tries to run "VARIABLE" command with one argument, "=value".

    #  "VARIABLE= value"
    #            ^
    #% Script tries to run "value" command with
    #+ the environmental variable "VARIABLE" set to "".
    #-------------------------------------------------------------------------


    echo hello    # hello
    # Not a variable reference, just the string "hello" . . .

    echo $hello   # 375
    #    ^          This *is* a variable reference.
    echo ${hello} # 375
    # Also a variable reference, as above.

    # Quoting . . .
    echo "$hello"    # 375
    echo "${hello}"  # 375

    echo

    hello="A B  C   D"
    echo $hello   # A B C D
    echo "$hello" # A B  C   D
    # As you see, echo $hello   and   echo "$hello"   give different results.
    # Why?
    # =======================================
    # Quoting a variable preserves whitespace.
    # =======================================

    echo

    echo '$hello'  # $hello
    #    ^      ^
    #  Variable referencing disabled (escaped) by single quotes,
    #+ which causes the "$" to be interpreted literally.

    # Notice the effect of different types of quoting.


    hello=    # Setting it to a null value.
    echo "\$hello (null value) = $hello"
    #  Note that setting a variable to a null value is not the same as
    #+ unsetting it, although the end result is the same (see below).

    # --------------------------------------------------------------

    #  It is permissible to set multiple variables on the same line,
    #+ if separated by white space.
    #  Caution, this may reduce legibility, and may not be portable.

    var1=21  var2=22  var3=$V3
    echo
    echo "var1=$var1   var2=$var2   var3=$var3"

    # May cause problems with older versions of "sh" . . .

    # --------------------------------------------------------------

    echo; echo

    numbers="one two three"
    #           ^   ^
    other_numbers="1 2 3"
    #               ^ ^
    #  If there is whitespace embedded within a variable,
    #+ then quotes are necessary.
    #  other_numbers=1 2 3                  # Gives an error message.
    echo "numbers = $numbers"
    echo "other_numbers = $other_numbers"   # other_numbers = 1 2 3
    #  Escaping the whitespace also works.
    mixed_bag=2\ ---\ Whatever
    #           ^    ^ Space after escape (\).

    echo "$mixed_bag"         # 2 --- Whatever

    echo; echo

    echo "uninitialized_variable = $uninitialized_variable"
    # Uninitialized variable has null value (no value at all!).
    uninitialized_variable=   #  Declaring, but not initializing it --
                              #+ same as setting it to a null value, as above.
    echo "uninitialized_variable = $uninitialized_variable"
                              # It still has a null value.

    uninitialized_variable=23       # Set it.
    unset uninitialized_variable    # Unset it.
    echo "uninitialized_variable = $uninitialized_variable"
                                    # It still has a null value.
    echo

    exit 0

    Caution	

    An uninitialized variable has a "null" value - no assigned value at all (not zero!). Using a variable before assigning a value to it will usually cause problems.

    It is nevertheless possible to perform arithmetic operations on an uninitialized variable.

    echo "$uninitialized"                                # (blank line)
    let "uninitialized += 5"                             # Add 5 to it.
    echo "$uninitialized"                                # 5

    #  Conclusion:
    #  An uninitialized variable has no value,
    #+ however it acts as if it were 0 in an arithmetic operation.
    #  This is undocumented (and probably non-portable) behavior.
```

#### 12.1.2.2 Variable assignment

```text
= the assignment operator (no space before and after)

    Caution	Do not confuse this with = and -eq, which test, rather than assign!

    Note that = can be either an assignment or a test operator, depending on context.

    Example Plain Variable Assignment
    #!/bin/bash
    # Naked variables

    echo

    # When is a variable "naked", i.e., lacking the '$' in front?
    # When it is being assigned, rather than referenced.

    # Assignment
    a=879
    echo "The value of \"a\" is $a."

    # Assignment using 'let'
    let a=16+5
    echo "The value of \"a\" is now $a."

    echo

    # In a 'for' loop (really, a type of disguised assignment):
    echo -n "Values of \"a\" in the loop are: "
    for a in 7 8 9 11
    do
      echo -n "$a "
    done

    echo
    echo

    # In a 'read' statement (also a type of assignment):
    echo -n "Enter \"a\" "
    read a
    echo "The value of \"a\" is now $a."

    echo
    exit 0

    Example Variable Assignment, plain and fancy
    #!/bin/bash

    a=23              # Simple case
    echo $a
    b=$a
    echo $b

    # Now, getting a little bit fancier (command substitution).

    a=`echo Hello!`   # Assigns result of 'echo' command to 'a'
    echo $a
    #  Note that including an exclamation mark (!) within a
    #+ command substitution construct #+ will not work from the command line,
    #+ since this triggers the Bash "history mechanism."
    #  Inside a script, however, the history functions are disabled.

    a=`ls -l`         # Assigns result of 'ls -l' command to 'a'
    echo $a           # Unquoted, however, removes tabs and newlines.
    echo
    echo "$a"         # The quoted variable preserves whitespace.
                      # (See the chapter on "Quoting.")

    exit 0

    Variable assignment using the $(...) mechanism (a newer method than backquotes). This is actually a form of command substitution.

    # From /etc/rc.d/rc.local
    R=$(cat /etc/redhat-release)
    arch=$(uname -m)
    echo "$R"
    echo "$arch"
```

#### 12.1.2.3 Bash Variables Are Untyped

```text
Unlike many other programming languages, Bash does not segregate its variables by "type". Essentially, Bash variables are character strings, but, depending on context, Bash permits integer operations and comparisons on variables. The determining factor is whether the value of a variable contains only digits.

Example Integer or string?

#!/bin/bash
# int-or-string.sh: Integer or string?

a=2334                   # Integer.
let "a += 1"
echo "a = $a "           # a = 2335
echo                     # Integer, still.


b=${a/23/BB}             # Substitute "BB" for "23".
                         # This transforms $b into a string.
echo "b = $b"            # b = BB35
declare -i b             # Declaring it an integer doesn't help.
echo "b = $b"            # b = BB35

let "b += 1"             # BB35 + 1 =
echo "b = $b"            # b = 1
echo

c=BB34
echo "c = $c"            # c = BB34
d=${c/BB/23}             # Substitute "23" for "BB".
                         # This makes $d an integer.
echo "d = $d"            # d = 2334
let "d += 1"             # 2334 + 1 =
echo "d = $d"            # d = 2335
echo

# What about null variables?
e=""
echo "e = $e"            # e =
let "e += 1"             # Arithmetic operations allowed on a null variable?
echo "e = $e"            # e = 1
echo                     # Null variable transformed into an integer.

# What about undeclared variables?
echo "f = $f"            # f =
let "f += 1"             # Arithmetic operations allowed?
echo "f = $f"            # f = 1
echo                     # Undeclared variable transformed into an integer.



# Variables in Bash are essentially untyped.

exit 0

Untyped variables are both a blessing and a curse. They permit more flexibility in scripting (enough rope to hang yourself!) and make it easier to grind out lines of code. However, they permit errors to creep in and encourage sloppy programming habits.

The burden is on the programmer to keep track of what type the script variables are. Bash will not do it for you.
```

#### 12.1.2.4 Special variable types

```text
local variables: variables visible only within a code block or function (see also local variables in functions)
environmental variables: variables that affect the behavior of the shell and user interface

    Note	In a more general context, each process has an "environment", that is, a group of variables that hold information that the process may reference. In this sense, the shell behaves like any other process.

    Every time a shell starts, it creates shell variables that correspond to its own environmental variables. Updating or adding new environmental variables causes the shell to update its environment, and all the shell's child processes (the commands it executes) inherit this environment.

    Caution	The space allotted to the environment is limited. Creating too many environmental variables or ones that use up excessive space may cause problems.

    bash$ eval "`seq 10000 | sed -e 's/.*/export var&=ZZZZZZZZZZZZZZ/'`"
    bash$ du
    bash: /usr/bin/du: Argument list too long

    (Thank you, Stéphane Chazelas for the clarification, and for providing the above example.)

    If a script sets environmental variables, they need to be "exported", that is, reported to the environment local to the script. This is the function of the export command.

    Note	A script can export variables only to child processes, that is, only to commands or processes which that particular script initiates. A script invoked from the command line cannot export variables back to the command line environment. Child processes cannot export variables back to the parent processes that spawned them.

    Definition: A child process is a subprocess launched by another process, its parent.

    ---
positional parameters

    arguments passed to the script from the command line: $0, $1, $2, $3 . . .

    $0 is the name of the script itself, $1 is the first argument, $2 the second, $3 the third, and so forth. [1] After $9, the arguments must be enclosed in brackets, for example, ${10}, ${11}, ${12}.

    The special variables $* and $@ denote all the positional parameters.

    Example Positional Parameters

    #!/bin/bash

    # Call this script with at least 10 parameters, for example
    # ./scriptname 1 2 3 4 5 6 7 8 9 10
    MINPARAMS=10

    echo

    echo "The name of this script is \"$0\"."
    # Adds ./ for current directory
    echo "The name of this script is \"`basename $0`\"."
    # Strips out path name info (see 'basename')

    echo

    if [ -n "$1" ]              # Tested variable is quoted.
    then
     echo "Parameter #1 is $1"  # Need quotes to escape #
    fi 

    if [ -n "$2" ]
    then
     echo "Parameter #2 is $2"
    fi 

    if [ -n "$3" ]
    then
     echo "Parameter #3 is $3"
    fi 

    # ...


    if [ -n "${10}" ]  # Parameters > $9 must be enclosed in {brackets}.
    then
     echo "Parameter #10 is ${10}"
    fi 

    echo "-----------------------------------"
    echo "All the command-line parameters are: "$*""

    if [ $# -lt "$MINPARAMS" ]
    then
      echo
      echo "This script needs at least $MINPARAMS command-line arguments!"
    fi  

    echo

    exit 0

    Bracket notation for positional parameters leads to a fairly simple way of referencing the last argument passed to a script on the command line. This also requires indirect referencing.

    args=$#           # Number of args passed.
    lastarg=${!args}
    # Or:       lastarg=${!#}
    #           (Thanks, Chris Monson.)
    # Note that lastarg=${!$#} doesn't work.

    Some scripts can perform different operations, depending on which name they are invoked with. For this to work, the script needs to check $0, the name it was invoked by. There must also exist symbolic links to all the alternate names of the script. See Example 15-2.

    Tip	If a script expects a command line parameter but is invoked without one, this may cause a null variable assignment, generally an undesirable result. One way to prevent this is to append an extra character to both sides of the assignment statement using the expected positional parameter.

    variable1_=$1_  # Rather than variable1=$1
    # This will prevent an error, even if positional parameter is absent.

    critical_argument01=$variable1_

    # The extra character can be stripped off later, like so.
    variable1=${variable1_/_/}
    # Side effects only if $variable1_ begins with an underscore.
    # This uses one of the parameter substitution templates discussed later.
    # (Leaving out the replacement pattern results in a deletion.)

    #  A more straightforward way of dealing with this is
    #+ to simply test whether expected positional parameters have been passed.
    if [ -z $1 ]
    then
      exit $E_MISSING_POS_PARAM
    fi


    #  However, as Fabian Kreutz points out,
    #+ the above method may have unexpected side-effects.
    #  A better method is parameter substitution:
    #         ${1:-$DefaultVal}
    #  See the "Parameter Substition" section
    #+ in the "Variables Revisited" chapter.

    ---

    Example wh, whois domain name lookup

    #!/bin/bash
    # ex18.sh

    # Does a 'whois domain-name' lookup on any of 3 alternate servers:
    #                    ripe.net, cw.net, radb.net

    # Place this script -- renamed 'wh' -- in /usr/local/bin

    # Requires symbolic links:
    # ln -s /usr/local/bin/wh /usr/local/bin/wh-ripe
    # ln -s /usr/local/bin/wh /usr/local/bin/wh-cw
    # ln -s /usr/local/bin/wh /usr/local/bin/wh-radb

    E_NOARGS=65


    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` [domain-name]"
      exit $E_NOARGS
    fi

    # Check script name and call proper server.
    case `basename $0` in    # Or:    case ${0##*/} in
        "wh"     ) whois $1@whois.ripe.net;;
        "wh-ripe") whois $1@whois.ripe.net;;
        "wh-radb") whois $1@whois.radb.net;;
        "wh-cw"  ) whois $1@whois.cw.net;;
        *        ) echo "Usage: `basename $0` [domain-name]";;
    esac 

    exit $?

    ---

    The shift command reassigns the positional parameters, in effect shifting them to the left one notch.

    $1 <--- $2, $2 <--- $3, $3 <--- $4, etc.

    The old $1 disappears, but $0 (the script name) does not change. If you use a large number of positional parameters to a script, shift lets you access those past 10, although {bracket} notation also permits this.

    Example Using shift

    #!/bin/bash
    # shft.sh: Using 'shift' to step through all the positional parameters

    #  Name this script something like shft.sh,
    #+ and invoke it with some parameters.
    #+ For example:
    #             sh shft.sh a b c def 23 skidoo

    until [ -z "$1" ]  # Until all parameters used up . . .
    do
      echo -n "$1 "
      shift
    done

    echo               # Extra line feed.

    exit 0

    #  See also the echo-params.sh script for a "shiftless"
    #+ alternative method of stepping through the positional params.

    The shift command can take a numerical parameter indicating how many positions to shift.

    #!/bin/bash
    # shift-past.sh

    shift 3    # Shift 3 positions.
    #  n=3; shift $n
    #  Has the same effect.

    echo "$1"

    exit 0


    $ sh shift-past.sh 1 2 3 4 5
    4

    Note	

    The shift command works in a similar fashion on parameters passed to a function. 
```
