---
type: reference
title: Chapter 11. Command Substitution
description: "ABS Guide chapter 11: command substitution."
tags: [bash, shell, legacy, book-notes, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.8"
---

# 12.8 Chapter 11. Command Substitution

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

```text
Command substitution reassigns the output of a command [1]  or even multiple commands; it literally plugs the command output into another context. [2]

The classic form of command substitution uses backquotes (`...`). Commands within backquotes (backticks) generate command line text.
```

### 12.8.1 Basic usages

```text
script_name=`basename $0`
echo "The name of this script is $script_name."

The output of commands can be used as arguments to another command, to set a variable, and even for generating the argument list in a for loop.

rm `cat filename`   # "filename" contains a list of files to delete.
#
# S. C. points out that "arg list too long" error might result.
# Better is              xargs rm -- < filename 
# ( -- covers those cases where "filename" begins with a "-" )

textfile_listing=`ls *.txt`
# Variable contains names of all *.txt files in current working directory.
echo $textfile_listing

textfile_listing2=$(ls *.txt)   # The alternative form of command substitution.
echo $textfile_listing2
# Same result.

# A possible problem with putting a list of files into a single string
# is that a newline may creep in.
#
# A safer way to assign a list of files to a parameter is with an array.
#      shopt -s nullglob    # If no match, filename expands to nothing.
#      textfile_listing=( *.txt )
#
# Thanks, S.C.
```

### 12.8.2 Precaustions and limitations

```text
Note	

Command substitution invokes a subshell.

Caution	

Command substitution may result in word splitting.

COMMAND `echo a b`     # 2 args: a and b

COMMAND "`echo a b`"   # 1 arg: "a b"

COMMAND `echo`         # no arg

COMMAND "`echo`"       # one empty arg


# Thanks, S.C.

Even when there is no word splitting, command substitution can remove trailing newlines.

# cd "`pwd`"  # This should always work.
# However...

mkdir 'dir with trailing newline
'

cd 'dir with trailing newline
'

cd "`pwd`"  # Error message:
# bash: cd: /tmp/file with trailing newline: No such file or directory

cd "$PWD"   # Works fine.





old_tty_setting=$(stty -g)   # Save old terminal setting.
echo "Hit a key "
stty -icanon -echo           # Disable "canonical" mode for terminal.
                             # Also, disable *local* echo.
key=$(dd bs=1 count=1 2> /dev/null)   # Using 'dd' to get a keypress.
stty "$old_tty_setting"      # Restore old setting. 
echo "You hit ${#key} key."  # ${#variable} = number of characters in $variable
#
# Hit any key except RETURN, and the output is "You hit 1 key."
# Hit RETURN, and it's "You hit 0 key."
# The newline gets eaten in the command substitution.

Thanks, S.C.

Caution	Using echo to output an unquoted variable set with command substitution removes trailing newlines characters from the output of the reassigned command(s). This can cause unpleasant surprises.

dir_listing=`ls -l`
echo $dir_listing     # unquoted

# Expecting a nicely ordered directory listing.

# However, what you get is:
# total 3 -rw-rw-r-- 1 bozo bozo 30 May 13 17:15 1.txt -rw-rw-r-- 1 bozo
# bozo 51 May 15 20:57 t2.sh -rwxr-xr-x 1 bozo bozo 217 Mar 5 21:13 wi.sh

# The newlines disappeared.


echo "$dir_listing"   # quoted
# -rw-rw-r--    1 bozo       30 May 13 17:15 1.txt
# -rw-rw-r--    1 bozo       51 May 15 20:57 t2.sh
# -rwxr-xr-x    1 bozo      217 Mar  5 21:13 wi.sh

Command substitution even permits setting a variable to the contents of a file, using either redirection or the cat command.

variable1=`<file1`      #  Set "variable1" to contents of "file1".
variable2=`cat file2`   #  Set "variable2" to contents of "file2".
                        #  This, however, forks a new process,
                        #+ so the line of code executes slower than the above version.

#  Note:
#  The variables may contain embedded whitespace,
#+ or even (horrors), control characters.

#  Excerpts from system file, /etc/rc.d/rc.sysinit
#+ (on a Red Hat Linux installation)


if [ -f /fsckoptions ]; then
        fsckoptions=`cat /fsckoptions`
...
fi
#
#
if [ -e "/proc/ide/${disk[$device]}/media" ] ; then
             hdmedia=`cat /proc/ide/${disk[$device]}/media`
...
fi
#
#
if [ ! -n "`uname -r | grep -- "-"`" ]; then
       ktag="`cat /proc/version`"
...
fi
#
#
if [ $usb = "1" ]; then
    sleep 5
    mouseoutput=`cat /proc/bus/usb/devices 2>/dev/null|grep -E "^I.*Cls=03.*Prot=02"`
    kbdoutput=`cat /proc/bus/usb/devices 2>/dev/null|grep -E "^I.*Cls=03.*Prot=01"`
...
fi

Caution	Do not set a variable to the contents of a long text file unless you have a very good reason for doing so. Do not set a variable to the contents of a binary file, even as a joke.
```

### 12.8.3 Example 11-1. Stupid script tricks

```text
#!/bin/bash
# stupid-script-tricks.sh: Don't try this at home, folks.
# From "Stupid Script Tricks," Volume I.


dangerous_variable=`cat /boot/vmlinuz`   # The compressed Linux kernel itself.

echo "string-length of \$dangerous_variable = ${#dangerous_variable}"
# string-length of $dangerous_variable = 794151
# (Does not give same count as 'wc -c /boot/vmlinuz'.)

# echo "$dangerous_variable"
# Don't try this! It would hang the script.


#  The document author is aware of no useful applications for
#+ setting a variable to the contents of a binary file.

exit 0

Notice that a buffer overrun does not occur. This is one instance where an interpreted language, such as Bash, provides more protection from programmer mistakes than a compiled language.

Command substitution permits setting a variable to the output of a loop. The key to this is grabbing the output of an echo command within the loop.
```

### 12.8.4 Example 11-2. Generating a variable from a loop

```text
#!/bin/bash
# csubloop.sh: Setting a variable to the output of a loop.

variable1=`for i in 1 2 3 4 5
do
  echo -n "$i"                 #  The 'echo' command is critical
done`                          #+ to command substitution here.

echo "variable1 = $variable1"  # variable1 = 12345


i=0
variable2=`while [ "$i" -lt 10 ]
do
  echo -n "$i"                 # Again, the necessary 'echo'.
  let "i += 1"                 # Increment.
done`

echo "variable2 = $variable2"  # variable2 = 0123456789

#  Demonstrates that it's possible to embed a loop
#+ within a variable declaration.

exit 0
```

### 12.8.5 Possibilities of using command substitution

```text
Command substitution makes it possible to extend the toolset available to Bash. It is simply a matter of writing a program or script that outputs to stdout (like a well-behaved UNIX tool should) and assigning that output to a variable.

#include <stdio.h>

/*  "Hello, world." C program  */		

int main()
{
  printf( "Hello, world." );
  return (0);
}

bash$ gcc -o hello hello.c
	      

#!/bin/bash
# hello.sh		

greeting=`./hello`
echo $greeting

bash$ sh hello.sh
Hello, world.
```

### 12.8.6 Note, `` form replaced by $()

```text
The $(...) form has superseded backticks for command substitution.

output=$(sed -n /"$1"/p $file)   # From "grp.sh"	example.
	      
# Setting a variable to the contents of a text file.
File_contents1=$(cat $file1)      
File_contents2=$(<$file2)        # Bash permits this also.

The $(...) form of command substitution treats a double backslash in a different way than `...`.

bash$ echo `echo \\`


bash$ echo $(echo \\)
\
	      

The $(...) form of command substitution permits nesting. [3]

word_count=$( wc -w $(ls -l | awk '{print $9}') )

Or, for something a bit more elaborate . . .
```

### 12.8.7 $() form, Example 11-3. Finding anagrams

```text
#!/bin/bash
# agram2.sh
# Example of nested command substitution.

#  Uses "anagram" utility
#+ that is part of the author's "yawl" word list package.
#  http://ibiblio.org/pub/Linux/libs/yawl-0.3.2.tar.gz
#  http://personal.riverusers.com/~thegrendel/yawl-0.3.2.tar.gz

E_NOARGS=66
E_BADARG=67
MINLEN=7

if [ -z "$1" ]
then
  echo "Usage $0 LETTERSET"
  exit $E_NOARGS         # Script needs a command-line argument.
elif [ ${#1} -lt $MINLEN ]
then
  echo "Argument must have at least $MINLEN letters."
  exit $E_BADARG
fi



FILTER='.......'         # Must have at least 7 letters.
#       1234567
Anagrams=( $(echo $(anagram $1 | grep $FILTER) ) )
#          $(     $(  nested command sub.    ) )
#        (              array assignment         )

echo
echo "${#Anagrams[*]}  7+ letter anagrams found"
echo
echo ${Anagrams[0]}      # First anagram.
echo ${Anagrams[1]}      # Second anagram.
                         # Etc.

# echo "${Anagrams[*]}"  # To list all the anagrams in a single line . . .

#  Look ahead to the "Arrays" chapter for enlightenment on
#+ what's going on here.

# See also the agram.sh script for an example of anagram finding.

exit $?

[1]	For purposes of command substitution, a command may be an external system command, an internal scripting builtin, or even a script function.
[2]	In a more technically correct sense, command substitution extracts the stdout of a command, then assigns it to a variable using the = operator.
[3]	In fact, nesting with backticks is also possible, but only by escaping the inner backticks, as John Default points out.

word_count=` wc -w \`ls -l | awk '{print $9}'\` `
```
