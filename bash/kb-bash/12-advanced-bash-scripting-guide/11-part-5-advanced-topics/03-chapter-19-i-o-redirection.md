---
type: reference
title: Chapter 19. I/O Redirection
description: Subsection 12.12.3 of Part 5. Advanced Topics.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.3"
---

# 12.12.3 Chapter 19. I/O Redirection

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

```text
There are always three default "files"  open, stdin (the keyboard), stdout (the screen), and stderr (error messages output to the screen). These, and any other open files, can be redirected. Redirection simply means capturing output from a file, command, program, script, or even code block within a script and sending it as input to another file, command, program, or script.

Each open file gets assigned a file descriptor. [1] The file descriptors for stdin, stdout, and stderr are 0, 1, and 2, respectively. For opening additional files, there remain descriptors 3 to 9. It is sometimes useful to assign one of these additional file descriptors to stdin, stdout, or stderr as a temporary duplicate link. [2] This simplifies restoration to normal after complex redirection and reshuffling (see Example 19-1).

   COMMAND_OUTPUT >
      # Redirect stdout to a file.
      # Creates the file if not present, otherwise overwrites it.

      ls -lR > dir-tree.list
      # Creates a file containing a listing of the directory tree.

   : > filename
      # The > truncates file "filename" to zero length.
      # If file not present, creates zero-length file (same effect as 'touch').
      # The : serves as a dummy placeholder, producing no output.

   > filename    
      # The > truncates file "filename" to zero length.
      # If file not present, creates zero-length file (same effect as 'touch').
      # (Same result as ": >", above, but this does not work with some shells.)

   COMMAND_OUTPUT >>
      # Redirect stdout to a file.
      # Creates the file if not present, otherwise appends to it.


      # Single-line redirection commands (affect only the line they are on):
      # --------------------------------------------------------------------

|   1>filename
      # Redirect stdout to file "filename."
Example:
$ 1>stam  echo aaa bbb
$ cat stam
aaa bbb
$

|   1>>filename
      # Redirect and append stdout to file "filename."
|   2>filename
      # Redirect stderr to file "filename."
|   2>>filename
      # Redirect and append stderr to file "filename."
   &>filename
      # Redirect both stdout and stderr to file "filename."
      #
      #  Note that   &>>filename
      #+ -- attempting to redirect and *append*
      #+ stdout and stderr to file "filename" --
      #+ fails with the error message,
      #+ syntax error near unexpected token `>'.
#Note that for this to work (append both stdout and stderr to file you'll need:
#  COMMAND > stam 2>&1

   M>N
     # "M" is a file descriptor, which defaults to 1, if not explicitly set.
     # "N" is a filename.
     # File descriptor "M" is redirect to file "N."
   M>&N
     # "M" is a file descriptor, which defaults to 1, if not set.
     # "N" is another file descriptor.

      #==============================================================================

      # Redirecting stdout, one line at a time.
      LOGFILE=script.log

      echo "This statement is sent to the log file, \"$LOGFILE\"." 1>$LOGFILE
      echo "This statement is appended to \"$LOGFILE\"." 1>>$LOGFILE
      echo "This statement is also appended to \"$LOGFILE\"." 1>>$LOGFILE
      echo "This statement is echoed to stdout, and will not appear in \"$LOGFILE\"."
      # These redirection commands automatically "reset" after each line.



      # Redirecting stderr, one line at a time.
      ERRORFILE=script.errors

      bad_command1 2>$ERRORFILE       #  Error message sent to $ERRORFILE.
      bad_command2 2>>$ERRORFILE      #  Error message appended to $ERRORFILE.
      bad_command3                    #  Error message echoed to stderr,
                                      #+ and does not appear in $ERRORFILE.
      # These redirection commands also automatically "reset" after each line.
      #=======================================================================

|   2>&1
      # Redirects stderr to stdout.
      # Error messages get sent to same place as standard output.

   i>&j
      # Redirects file descriptor i to j.
      # All output of file pointed to by i gets sent to file pointed to by j.

   >&j
      # Redirects, by default, file descriptor 1 (stdout) to j.
      # All stdout gets sent to file pointed to by j.

|   0< FILENAME
    < FILENAME
      # Accept input from a file.
      # Companion command to ">", and often used in combination with it.
      #
      # grep search-word <filename


   [j]<>filename
      #  Open file "filename" for reading and writing,
      #+ and assign file descriptor "j" to it.
      #  If "filename" does not exist, create it.
      #  If file descriptor "j" is not specified, default to fd 0, stdin.
      #
      #  An application of this is writing at a specified place in a file. 
      echo 1234567890 > File    # Write string to "File".
      exec 3<> File             # Open "File" and assign fd 3 to it.
      read -n 4 <&3             # Read only 4 characters.
      echo -n . >&3             # Write a decimal point there.
      exec 3>&-                 # Close fd 3.
      cat File                  # ==> 1234.67890
      #  Random access, by golly.



   |
      # Pipe.
      # General purpose process and command chaining tool.
      # Similar to ">", but more general in effect.
      # Useful for chaining commands, scripts, files, and programs together.
      cat *.txt | sort | uniq > result-file
      # Sorts the output of all the .txt files and deletes duplicate lines,
      # finally saves results to "result-file".

Multiple instances of input and output redirection and/or pipes can be combined in a single command line.

command < input-file > output-file

command1 | command2 | command3 > output-file


Multiple output streams may be redirected to one file.

ls -yz >> command.log 2>&1
#  Capture result of illegal options "yz" in file "command.log."
#  Because stderr is redirected to the file,
#+ any error messages will also be there.

#  Note, however, that the following does *not* give the same result.
ls -yz 2>&1 >> command.log
#  Outputs an error message and does not write to file.

#  If redirecting both stdout and stderr,
#+ the order of the commands makes a difference.

Closing File Descriptors n<&-

    Close input file descriptor n.  0<&-, <&-

    Close stdin.  n>&-

    Close output file descriptor n.  1>&-, >&-

    Close stdout.

Child processes inherit open file descriptors. This is why pipes work. To prevent an fd from being inherited, close it.

# Redirecting only stderr to a pipe.

exec 3>&1                              # Save current "value" of stdout.
ls -l 2>&1 >&3 3>&- | grep bad 3>&-    # Close fd 3 for 'grep' (but not 'ls').
#              ^^^^   ^^^^
exec 3>&-                              # Now close it for the remainder of the script.

# Thanks, S.C.
```

#### 12.12.3.1 Using exec

```text
An exec <filename command redirects stdin to a file. From that point on, all stdin comes from that file, rather than its normal source (usually keyboard input). This provides a method of reading a file line by line and possibly parsing each line of input using sed  and/or awk.
```

#### 12.12.3.1.1 Example 19-1 Redirecting stdin using exec

```text
#!/bin/bash
# Redirecting stdin using 'exec'.


exec 6<&0          # Link file descriptor #6 with stdin.
                   # Saves stdin.

exec < data-file   # stdin replaced by file "data-file"

read a1            # Reads first line of file "data-file".
read a2            # Reads second line of file "data-file."

echo
echo "Following lines read from file."
echo "-------------------------------"
echo $a1
echo $a2

echo; echo; echo

exec 0<&6 6<&-
#  Now restore stdin from fd #6, where it had been saved,
#+ and close fd #6 ( 6<&- ) to free it for other processes to use.
#
# <&6 6<&-    also works.

echo -n "Enter data  "
read b1  # Now "read" functions as expected, reading from normal stdin.
echo "Input read from stdin."
echo "----------------------"
echo "b1 = $b1"

echo

exit 0

Similarly, an exec >filename command redirects stdout to a designated file. This sends all command output that would normally go to stdout to that file.

Important	

exec N > filename affects the entire script or current shell. Redirection in the PID of the script or shell from that point on has changed. However . . .

N > filename affects only the newly-forked process, not the entire script or shell.

Thank you, Ahmed Darwish, for pointing this out.
```

#### 12.12.3.1.2 Example 19-2. Redirecting stdout using exec

```text
#!/bin/bash
# reassign-stdout.sh

LOGFILE=logfile.txt

exec 6>&1           # Link file descriptor #6 with stdout.
                    # Saves stdout.

exec > $LOGFILE     # stdout replaced with file "logfile.txt".

# ----------------------------------------------------------- #
# All output from commands in this block sent to file $LOGFILE.

echo -n "Logfile: "
date
echo "-------------------------------------"
echo

echo "Output of \"ls -al\" command"
echo
ls -al
echo; echo
echo "Output of \"df\" command"
echo
df

# ----------------------------------------------------------- #

exec 1>&6 6>&-      # Restore stdout and close file descriptor #6.

echo
echo "== stdout now restored to default == "
echo
ls -al
echo

exit 0

				12.12.3.1.3 Example 19-3. Redirecting both stdin and stdout in the same script with exec

#!/bin/bash
# upperconv.sh
# Converts a specified input file to uppercase.

E_FILE_ACCESS=70
E_WRONG_ARGS=71

if [ ! -r "$1" ]     # Is specified input file readable?
then
  echo "Can't read from input file!"
  echo "Usage: $0 input-file output-file"
  exit $E_FILE_ACCESS
fi                   #  Will exit with same error
                     #+ even if input file ($1) not specified (why?).

if [ -z "$2" ]
then
  echo "Need to specify output file."
  echo "Usage: $0 input-file output-file"
  exit $E_WRONG_ARGS
fi


exec 4<&0
exec < $1            # Will read from input file.

exec 7>&1
exec > $2            # Will write to output file.
                     # Assumes output file writable (add check?).

# -----------------------------------------------
    cat - | tr a-z A-Z   # Uppercase conversion.
#   ^^^^^                # Reads from stdin.
#           ^^^^^^^^^^   # Writes to stdout.
# However, both stdin and stdout were redirected.
# Note that the 'cat' can be omitted.
# -----------------------------------------------

exec 1>&7 7>&-       # Restore stout.
exec 0<&4 4<&-       # Restore stdin.

# After restoration, the following line prints to stdout as expected.
echo "File \"$1\" written to \"$2\" as uppercase conversion."

exit 0

I/O redirection is a clever way of avoiding the dreaded inaccessible variables within a subshell problem.
```

#### 12.12.3.1.4 Example 19-4. Avoiding a subshell

```text
#!/bin/bash
# avoid-subshell.sh
# Suggested by Matthew Walker.

Lines=0

echo

cat myfile.txt | while read line;
                 do {
                   echo $line
                   (( Lines++ ));  #  Incremented values of this variable
                                   #+ inaccessible outside loop.
                                   #  Subshell problem.
                 }
                 done

echo "Number of lines read = $Lines"     # 0
                                         # Wrong!

echo "------------------------"


exec 3<> myfile.txt
while read line <&3
do {
  echo "$line"
  (( Lines++ ));                   #  Incremented values of this variable
                                   #+ accessible outside loop.
                                   #  No subshell, no problem.
}
done
exec 3>&-

echo "Number of lines read = $Lines"     # 8

echo

exit 0

# Lines below not seen by script.

$ cat myfile.txt

Line 1.
Line 2.
Line 3.
Line 4.
Line 5.
Line 6.
Line 7.
Line 8.
```

#### 12.12.3.2 Redirecting Code Blocks

```text
Blocks of code, such as while, until, and for loops, even if/then test blocks can also incorporate redirection of stdin. Even a function may use this form of redirection (see Example 23-11). The < operator at the end of the code block accomplishes this.
```

#### 12.12.3.2.1 Example 19-5. Redirected while loop

```text
#!/bin/bash
# redir2.sh

if [ -z "$1" ]
then
  Filename=names.data       # Default, if no filename specified.
else
  Filename=$1
fi  
#+ Filename=${1:-names.data}
#  can replace the above test (parameter substitution).

count=0

echo

while [ "$name" != Smith ]  # Why is variable $name in quotes?
do
  read name                 # Reads from $Filename, rather than stdin.
  echo $name
  let "count += 1"
done <"$Filename"           # Redirects stdin to file $Filename. 
#    ^^^^^^^^^^^^

echo; echo "$count names read"; echo

exit 0

#  Note that in some older shell scripting languages,
#+ the redirected loop would run as a subshell.
#  Therefore, $count would return 0, the initialized value outside the loop.
#  Bash and ksh avoid starting a subshell *whenever possible*,
#+ so that this script, for example, runs correctly.
#  (Thanks to Heiner Steven for pointing this out.)

#  However . . .
#  Bash *can* sometimes start a subshell in a PIPED "while-read" loop,
#+ as distinct from a REDIRECTED "while" loop.

abc=hi
echo -e "1\n2\n3" | while read l
     do abc="$l"
        echo $abc
     done
echo $abc

#  Thanks, Bruno de Oliveira Schneider, for demonstrating this
#+ with the above snippet of code.
#  And, thanks, Brian Onn, for correcting an annotation error.
```

#### 12.12.3.2.2 Example 19-6. Alternate form of redirected while loop

```text
#!/bin/bash

# This is an alternate form of the preceding script.

#  Suggested by Heiner Steven
#+ as a workaround in those situations when a redirect loop
#+ runs as a subshell, and therefore variables inside the loop
# +do not keep their values upon loop termination.


if [ -z "$1" ]
then
  Filename=names.data     # Default, if no filename specified.
else
  Filename=$1
fi  


exec 3<&0                 # Save stdin to file descriptor 3.
exec 0<"$Filename"        # Redirect standard input.

count=0
echo


while [ "$name" != Smith ]
do
  read name               # Reads from redirected stdin ($Filename).
  echo $name
  let "count += 1"
done                      #  Loop reads from file $Filename
                          #+ because of line 20.

#  The original version of this script terminated the "while" loop with
#+      done <"$Filename" 
#  Exercise:
#  Why is this unnecessary?


exec 0<&3                 # Restore old stdin.
exec 3<&-                 # Close temporary fd 3.

echo; echo "$count names read"; echo

exit 0
```

#### 12.12.3.2.3 Example 19-7. Redirected until loop

```text
#!/bin/bash
# Same as previous example, but with "until" loop.

if [ -z "$1" ]
then
  Filename=names.data         # Default, if no filename specified.
else
  Filename=$1
fi  

# while [ "$name" != Smith ]
until [ "$name" = Smith ]     # Change  !=  to =.
do
  read name                   # Reads from $Filename, rather than stdin.
  echo $name
done <"$Filename"             # Redirects stdin to file $Filename. 
#    ^^^^^^^^^^^^

# Same results as with "while" loop in previous example.

exit 0
```

#### 12.12.3.2.4 Example 19-8. Redirected for loop

```text
#!/bin/bash

if [ -z "$1" ]
then
  Filename=names.data          # Default, if no filename specified.
else
  Filename=$1
fi  

line_count=`wc $Filename | awk '{ print $1 }'`
#           Number of lines in target file.
#
#  Very contrived and kludgy, nevertheless shows that
#+ it's possible to redirect stdin within a "for" loop...
#+ if you're clever enough.
#
# More concise is     line_count=$(wc -l < "$Filename")


for name in `seq $line_count`  # Recall that "seq" prints sequence of numbers.
# while [ "$name" != Smith ]   --   more complicated than a "while" loop   --
do
  read name                    # Reads from $Filename, rather than stdin.
  echo $name
  if [ "$name" = Smith ]       # Need all this extra baggage here.
  then
    break
  fi  
done <"$Filename"              # Redirects stdin to file $Filename. 
#    ^^^^^^^^^^^^

exit 0

We can modify the previous example to also redirect the output of the loop.
```

#### 12.12.3.2.5 Example 19-9. Redirected for loop (both stdin and stdout redirected)

```text
#!/bin/bash

if [ -z "$1" ]
then
  Filename=names.data          # Default, if no filename specified.
else
  Filename=$1
fi  

Savefile=$Filename.new         # Filename to save results in.
FinalName=Jonah                # Name to terminate "read" on.

line_count=`wc $Filename | awk '{ print $1 }'`  # Number of lines in target file.


for name in `seq $line_count`
do
  read name
  echo "$name"
  if [ "$name" = "$FinalName" ]
  then
    break
  fi  
done < "$Filename" > "$Savefile"     # Redirects stdin to file $Filename,
#    ^^^^^^^^^^^^^^^^^^^^^^^^^^^       and saves it to backup file.

exit 0
```

#### 12.12.3.2.6 Example 19-10. Redirected if/then test

```text
#!/bin/bash

if [ -z "$1" ]
then
  Filename=names.data   # Default, if no filename specified.
else
  Filename=$1
fi  

TRUE=1

if [ "$TRUE" ]          # if true    and   if :   also work.
then
 read name
 echo $name
fi <"$Filename"
#  ^^^^^^^^^^^^

# Reads only first line of file.
# An "if/then" test has no way of iterating unless embedded in a loop.

exit 0

Example 19-11. Data file names.data for above examples

Aristotle
Belisarius
Capablanca
Euler
Goethe
Hamurabi
Jonah
Laplace
Maroczy
Purcell
Schmidt
Semmelweiss
Smith
Turing
Venn
Wilkinson
Znosko-Borowski

#  This is a data file for
#+ "redir2.sh", "redir3.sh", "redir4.sh", "redir4a.sh", "redir5.sh".

Redirecting the stdout of a code block has the effect of saving its output to a file. See Example 3-2.
```

#### 12.12.3.2.7 Here documents and IO redirection

```text
Here documents are a special case of redirected code blocks. That being the case, it should be possible to feed the output of a here document into the stdin for a while loop.

# This example by Albert Siersema
# Used with permission (thanks!).

function doesOutput()
 # Could be an external command too, of course.
 # Here we show you can use a function as well.
{
  ls -al *.jpg | awk '{print $5,$9}'
}


nr=0          #  We want the while loop to be able to manipulate these and
totalSize=0   #+ to be able to see the changes after the while finished.

while read fileSize fileName ; do
  echo "$fileName is $fileSize bytes"
  let nr++
  totalSize=$((totalSize+fileSize))   # Or: "let totalSize+=fileSize"
done<<EOF
$(doesOutput)
EOF

echo "$nr files totaling $totalSize bytes"
```

#### 12.12.3.3 Applications

```text
Clever use of I/O redirection permits parsing and stitching together snippets of command output (see Example 14-7). This permits generating report and log files.

Example 19-12. Logging events

#!/bin/bash
# logevents.sh
# Author: Stephane Chazelas.
# Used in ABS Guide with permission.

# Event logging to a file.
# Must be run as root (for write access in /var/log).

ROOT_UID=0     # Only users with $UID 0 have root privileges.
E_NOTROOT=67   # Non-root exit error.


if [ "$UID" -ne "$ROOT_UID" ]
then
  echo "Must be root to run this script."
  exit $E_NOTROOT
fi  


FD_DEBUG1=3
FD_DEBUG2=4
FD_DEBUG3=5

# === Uncomment one of the two lines below to activate script. ===
# LOG_EVENTS=1
# LOG_VARS=1


log()  # Writes time and date to log file.
{
echo "$(date)  $*" >&7     # This *appends* the date to the file.
#     ^^^^^^^  command substitution
                           # See below.
}



case $LOG_LEVEL in
 1) exec 3>&2         4> /dev/null 5> /dev/null;;
 2) exec 3>&2         4>&2         5> /dev/null;;
 3) exec 3>&2         4>&2         5>&2;;
 *) exec 3> /dev/null 4> /dev/null 5> /dev/null;;
esac

FD_LOGVARS=6
if [[ $LOG_VARS ]]
then exec 6>> /var/log/vars.log
else exec 6> /dev/null                     # Bury output.
fi

FD_LOGEVENTS=7
if [[ $LOG_EVENTS ]]
then
  # exec 7 >(exec gawk '{print strftime(), $0}' >> /var/log/event.log)
  # Above line fails in versions of Bash more recent than 2.04. Why?
  exec 7>> /var/log/event.log              # Append to "event.log".
  log                                      # Write time and date.
else exec 7> /dev/null                     # Bury output.
fi

echo "DEBUG3: beginning" >&${FD_DEBUG3}

ls -l >&5 2>&4                             # command1 >&5 2>&4

echo "Done"                                # command2 

echo "sending mail" >&${FD_LOGEVENTS}
# Writes "sending mail" to file descriptor #7.


exit 0
```
