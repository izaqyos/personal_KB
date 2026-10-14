---
type: reference
title: Chapter 7. Tests
description: Subsection 12.4 of Advanced Bash-Scripting Guide.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.4"
---

# 12.4 Chapter 7. Tests

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

### 12.4.1. Test Constructs

```text
    * An if/then construct tests whether the exit status of a list of commands is 0 (since 0 means "success" by UNIX convention), and if so, executes one or more commands.
    * There exists a dedicated command called [ (left bracket special character). It is a synonym for test, and a builtin for efficiency reasons. This command considers its arguments as comparison expressions or file tests and returns an exit status corresponding to the result of the comparison (0 for true, 1 for false).
    * With version 2.02, Bash introduced the [[ ... ]] extended test command, which performs comparisons in a manner more familiar to programmers from other languages. Note that [[ is a keyword, not a command.

      Bash sees [[ $a -lt $b ]] as a single element, which returns an exit status.

      The (( ... )) and let ... constructs also return an exit status of 0 if the arithmetic expressions they evaluate expand to a non-zero value. These arithmetic expansion constructs may therefore be used to perform arithmetic comparisons.

      let "1<2" returns 0 (as "1<2" expands to "1")
      (( 0 && 1 )) returns 1 (as "0 && 1" expands to "0")

    * An if can test any command, not just conditions enclosed within brackets.

      if cmp a b &> /dev/null  # Suppress output.
      then echo "Files a and b are identical."
      else echo "Files a and b differ."
      fi

      # The very useful "if-grep" construct:
      # ----------------------------------- 
      if grep -q Bash file
      then echo "File contains at least one occurrence of Bash."
      fi

      word=Linux
      letter_sequence=inu
      if echo "$word" | grep -q "$letter_sequence"
      # The "-q" option to grep suppresses output.
      then
        echo "$letter_sequence found in $word"
      else
        echo "$letter_sequence not found in $word"
      fi


      if COMMAND_WHOSE_EXIT_STATUS_IS_0_UNLESS_ERROR_OCCURRED
      then echo "Command succeeded."
      else echo "Command failed."
      fi

    *

      An if/then construct can contain nested comparisons and tests.

      if echo "Next *if* is part of the comparison for the first *if*."

        if [[ $comparison = "integer" ]]
          then (( a < b ))
        else
          [[ $a < $b ]]
        fi

      then
        echo '$a is less than $b'
      fi

      This detailed "if-test" explanation courtesy of Stéphane Chazelas.

Example What is truth?

#!/bin/bash

#  Tip:
#  If you're unsure of how a certain condition would evaluate,
#+ test it in an if-test.

echo

echo "Testing \"0\""
if [ 0 ]      # zero
then
  echo "0 is true."
else
  echo "0 is false."
fi            # 0 is true.

echo

echo "Testing \"1\""
if [ 1 ]      # one
then
  echo "1 is true."
else
  echo "1 is false."
fi            # 1 is true.

echo

echo "Testing \"-1\""
if [ -1 ]     # minus one
then
  echo "-1 is true."
else
  echo "-1 is false."
fi            # -1 is true.

echo

echo "Testing \"NULL\""
if [ ]        # NULL (empty condition)
then
  echo "NULL is true."
else
  echo "NULL is false."
fi            # NULL is false.

echo

echo "Testing \"xyz\""
if [ xyz ]    # string
then
  echo "Random string is true."
else
  echo "Random string is false."
fi            # Random string is true.

echo

echo "Testing \"\$xyz\""
if [ $xyz ]   # Tests if $xyz is null, but...
              # it's only an uninitialized variable.
then
  echo "Uninitialized variable is true."
else
  echo "Uninitialized variable is false."
fi            # Uninitialized variable is false.

echo

echo "Testing \"-n \$xyz\""
if [ -n "$xyz" ]            # More pedantically correct.
then
  echo "Uninitialized variable is true."
else
  echo "Uninitialized variable is false."
fi            # Uninitialized variable is false.

echo


xyz=          # Initialized, but set to null value.

echo "Testing \"-n \$xyz\""
if [ -n "$xyz" ]
then
  echo "Null variable is true."
else
  echo "Null variable is false."
fi            # Null variable is false.


echo


# When is "false" true?

echo "Testing \"false\""
if [ "false" ]              #  It seems that "false" is just a string.
then
  echo "\"false\" is true." #+ and it tests true.
else
  echo "\"false\" is false."
fi            # "false" is true.

echo

echo "Testing \"\$false\""  # Again, uninitialized variable.
if [ "$false" ]
then
  echo "\"\$false\" is true."
else
  echo "\"\$false\" is false."
fi            # "$false" is false.
              # Now, we get the expected result.

#  What would happen if we tested the uninitialized variable "$true"?

echo

exit 0

Exercise. Explain the behavior of Example 7-1, above.

if [ condition-true ]
then
   command 1
   command 2
   ...
else
   # Optional (may be left out if not needed).
   # Adds default code block executing if original condition tests false.
   command 3
   command 4
   ...
fi

Note	

When if and then are on same line in a condition test, a semicolon must terminate the if statement. Both if and then are keywords. Keywords (or commands) begin statements, and before a new statement on the same line begins, the old one must terminate.

if [ -x "$filename" ]; then

Else if and elif

elif

    elif is a contraction for else if. The effect is to nest an inner if/then construct within an outer one.

    if [ condition1 ]
    then
       command1
       command2
       command3
    elif [ condition2 ]
    # Same as else if
    then
       command4
       command5
    else
       default-command
    fi

The if test condition-true construct is the exact equivalent of if [ condition-true ]. As it happens, the left bracket, [ , is a token which invokes the test command. The closing right bracket, ] , in an if/test should not therefore be strictly necessary, however newer versions of Bash require it.

Note	

The test command is a Bash builtin which tests file types and compares strings. Therefore, in a Bash script, test does not call the external /usr/bin/test binary, which is part of the sh-utils package. Likewise, [ does not call /usr/bin/[, which is linked to /usr/bin/test.

bash$ type test
test is a shell builtin
bash$ type '['
[ is a shell builtin
bash$ type '[['
[[ is a shell keyword
bash$ type ']]'
]] is a shell keyword
bash$ type ']'
bash: type: ]: not found
	      

If, for some reason, you wish to use /usr/bin/test in a Bash script, then specify it by full pathname.

Example Equivalence of test, /usr/bin/test, [ ], and /usr/bin/[

#!/bin/bash

echo

if test -z "$1"
then
  echo "No command-line arguments."
else
  echo "First command-line argument is $1."
fi

echo

if /usr/bin/test -z "$1"      # Equivalent to "test" builtin.
#  ^^^^^^^^^^^^^              # Specifying full pathname.
then
  echo "No command-line arguments."
else
  echo "First command-line argument is $1."
fi

echo

if [ -z "$1" ]                # Functionally identical to above code blocks.
#   if [ -z "$1"                should work, but...
#+  Bash responds to a missing close-bracket with an error message.
then
  echo "No command-line arguments."
else
  echo "First command-line argument is $1."
fi

echo


if /usr/bin/[ -z "$1" ]       # Again, functionally identical to above.
# if /usr/bin/[ -z "$1"       # Works, but gives an error message.
#                             # Note:
#                               This has been fixed in Bash, version 3.x.
then
  echo "No command-line arguments."
else
  echo "First command-line argument is $1."
fi

echo

exit 0

The [[ ]] construct is the more versatile Bash version of [ ]. This is the extended test command, adopted from ksh88.

Note	No filename expansion or word splitting takes place between [[ and ]], but there is parameter expansion and command substitution.

file=/etc/passwd

if [[ -e $file ]]
then
  echo "Password file exists."
fi

Tip	Using the [[ ... ]] test construct, rather than [ ... ] can prevent many logic errors in scripts. For example, the &&, ||, <, and > operators work within a [[ ]] test, despite giving an error within a [ ] construct.

Note	Following an if, neither the test command nor the test brackets ( [ ] or [[ ]] ) are strictly necessary.

dir=/home/bozo

if cd "$dir" 2>/dev/null; then   # "2>/dev/null" hides error message.
  echo "Now in $dir."
else
  echo "Can't change to $dir."
fi

The "if COMMAND" construct returns the exit status of COMMAND.

Similarly, a condition within test brackets may stand alone without an if, when used in combination with a list construct.

var1=20
var2=22
[ "$var1" -ne "$var2" ] && echo "$var1 is not equal to $var2"

home=/home/bozo
[ -d "$home" ] || echo "$home directory does not exist."

The (( )) construct expands and evaluates an arithmetic expression. If the expression evaluates as zero, it returns an exit status of 1, or "false". A non-zero expression returns an exit status of 0, or "true". This is in marked contrast to using the test and [ ] constructs previously discussed.

Example Arithmetic Tests using (( ))

#!/bin/bash
# Arithmetic tests.

# The (( ... )) construct evaluates and tests numerical expressions.
# Exit status opposite from [ ... ] construct!

(( 0 ))
echo "Exit status of \"(( 0 ))\" is $?."         # 1

(( 1 ))
echo "Exit status of \"(( 1 ))\" is $?."         # 0

(( 5 > 4 ))                                      # true
echo "Exit status of \"(( 5 > 4 ))\" is $?."     # 0

(( 5 > 9 ))                                      # false
echo "Exit status of \"(( 5 > 9 ))\" is $?."     # 1

(( 5 - 5 ))                                      # 0
echo "Exit status of \"(( 5 - 5 ))\" is $?."     # 1

(( 5 / 4 ))                                      # Division o.k.
echo "Exit status of \"(( 5 / 4 ))\" is $?."     # 0

(( 1 / 2 ))                                      # Division result < 1.
echo "Exit status of \"(( 1 / 2 ))\" is $?."     # Rounded off to 0.
                                                 # 1

(( 1 / 0 )) 2>/dev/null                          # Illegal division by 0.
#           ^^^^^^^^^^^
echo "Exit status of \"(( 1 / 0 ))\" is $?."     # 1

# What effect does the "2>/dev/null" have?
# What would happen if it were removed?
# Try removing it, then rerunning the script.

exit 0
```

### 12.4.2. File test operators

```text
Returns true if...

-e file exists
-a file exists This is identical in effect to -e. It has been "deprecated," [1] and its use is discouraged.
-f file is a regular file (not a directory or device file)
-s file is not zero size
-d file is a directory
-b file is a block device (floppy, cdrom, etc.) 
-c file is a character device (keyboard, modem, sound card, etc.)
-p file is a pipe
-h file is a symbolic link
-L file is a symbolic link
-S file is a socket
-t file (descriptor) is associated with a terminal device This test option may be used to check whether the stdin ([ -t 0 ]) or stdout ([ -t 1 ]) in a given script is a terminal.
-r file has read permission (for the user running the test)
-w file has write permission (for the user running the test)
-x file has execute permission (for the user running the test)
-g set-group-id (sgid) flag set on file or directory
If a directory has the sgid flag set, then a file created within that directory belongs to the group that owns the directory, not necessarily to the group of the user who created the file. This may be useful for a directory shared by a workgroup.
-u set-user-id (suid) flag set on file

    A binary owned by root with set-user-id flag set runs with root privileges, even when an ordinary user invokes it. [2] This is useful for executables (such as pppd and cdrecord) that need to access system hardware. Lacking the suid flag, these binaries could not be invoked by a non-root user.

    	      -rwsr-xr-t    1 root       178236 Oct  2  2000 /usr/sbin/pppd
    	      

    A file with the suid flag set shows an s in its permissions.

-k sticky bit set
Commonly known as the sticky bit, the save-text-mode flag is a special type of file permission. If a file has this flag set, that file will be kept in cache memory, for quicker access. [3] If set on a directory, it restricts write permission. Setting the sticky bit adds a t to the permissions on the file or directory listing.

    	      drwxrwxrwt    7 root         1024 May 19 21:26 tmp/
    	      

    If a user does not own a directory that has the sticky bit set, but has write permission in that directory, she can only delete those files that she owns in it. This keeps users from inadvertently overwriting or deleting each other's files in a publicly accessible directory, such as /tmp. (The owner of the directory or root can, of course, delete or rename files there.)
-O you are owner of file
-G group-id of file same as yours
-N file modified since it was last read
f1 -nt f2 file f1 is newer than f2
f1 -ot f2 file f1 is older than f2
f1 -ef f2 files f1 and f2 are hard links to the same file
!  "not" -- reverses the sense of the tests above (returns true if condition absent).

Example Testing for broken links

#!/bin/bash
# broken-link.sh
# Written by Lee bigelow <ligelowbee@yahoo.com>
# Used in ABS Guide with permission.

#  A pure shell script to find dead symlinks and output them quoted
#+ so they can be fed to xargs and dealt with :)
#+ eg. sh broken-link.sh /somedir /someotherdir|xargs rm
#
#  This, however, is a better method:
#
#  find "somedir" -type l -print0|\
#  xargs -r0 file|\
#  grep "broken symbolic"|
#  sed -e 's/^\|: *broken symbolic.*$/"/g'
#
#+ but that wouldn't be pure Bash, now would it.
#  Caution: beware the /proc file system and any circular links!
################################################################


#  If no args are passed to the script set directories-to-search 
#+ to current directory.  Otherwise set the directories-to-search 
#+ to the args passed.
######################

[ $# -eq 0 ] && directorys=`pwd` || directorys=$@


#  Setup the function linkchk to check the directory it is passed 
#+ for files that are links and don't exist, then print them quoted.
#  If one of the elements in the directory is a subdirectory then 
#+ send that subdirectory to the linkcheck function.
##########

linkchk () {
    for element in $1/*; do
#*/
      [ -h "$element" -a ! -e "$element" ] && echo \"$element\"
      [ -d "$element" ] && linkchk $element
    # Of course, '-h' tests for symbolic link, '-d' for directory.
    done
}

#  Send each arg that was passed to the script to the linkchk() function
#+ if it is a valid directoy.  If not, then print the error message
#+ and usage info.
##################
for directory in $directorys; do
    if [ -d $directory ]
	then linkchk $directory
	else 
	    echo "$directory is not a directory"
	    echo "Usage: $0 dir1 dir2 ..."
    fi
done

exit $?
```

### 12.4.3. Other Comparison Operators

```text
A binary comparison operator compares two variables or quantities. Note that integer and string comparison use a different set of operators.
```

#### 12.4.3.1 integer comparison

```text
-eq is equal to
if [ "$a" -eq "$b" ]

-ne is not equal to
if [ "$a" -ne "$b" ]

-gt is greater than
if [ "$a" -gt "$b" ]

-ge is greater than or equal to
if [ "$a" -ge "$b" ]

-lt is less than
if [ "$a" -lt "$b" ]

-le is less than or equal to
if [ "$a" -le "$b" ]

< is less than (within double parentheses)
(("$a" < "$b"))

<= is less than or equal to (within double parentheses)
(("$a" <= "$b"))

> is greater than (within double parentheses)
(("$a" > "$b"))

>= is greater than or equal to (within double parentheses)
(("$a" >= "$b"))
```

#### 12.4.3.2 string comparison

```text
= is equal to
if [ "$a" = "$b" ]

== is equal to
if [ "$a" == "$b" ]

This is a synonym for =.

    Note	
    The == comparison operator behaves differently within a double-brackets test than within single brackets.

    [[ $a == z* ]]    # True if $a starts with an "z" (pattern matching).
    [[ $a == "z*" ]]  # True if $a is equal to z* (literal matching).

    [ $a == z* ]      # File globbing and word splitting take place.
    [ "$a" == "z*" ]  # True if $a is equal to z* (literal matching).

    # Thanks, Stéphane Chazelas

!= is not equal to
if [ "$a" != "$b" ]
This operator uses pattern matching within a [[ ... ]] construct.

< is less than, in ASCII alphabetical order
if [[ "$a" < "$b" ]]
if [ "$a" \< "$b" ]
Note that the "<" needs to be escaped within a [ ] construct.

> is greater than, in ASCII alphabetical order
if [[ "$a" > "$b" ]]
if [ "$a" \> "$b" ]
Note that the ">" needs to be escaped within a [ ] construct.

-n string is not "null."
Caution	The -n test absolutely requires that the string be quoted within the test brackets. Using an unquoted string with ! -z, or even just the unquoted string alone within test brackets  normally works, however, this is an unsafe practice. Always quote a tested string. [1] 

-z string is "null, " that is, has zero length

Example Arithmetic and string comparisons

#!/bin/bash

a=4
b=5

#  Here "a" and "b" can be treated either as integers or strings.
#  There is some blurring between the arithmetic and string comparisons,
#+ since Bash variables are not strongly typed.

#  Bash permits integer operations and comparisons on variables
#+ whose value consists of all-integer characters.
#  Caution advised, however.

echo

if [ "$a" -ne "$b" ]
then
  echo "$a is not equal to $b"
  echo "(arithmetic comparison)"
fi

echo

if [ "$a" != "$b" ]
then
  echo "$a is not equal to $b."
  echo "(string comparison)"
  #     "4"  != "5"
  # ASCII 52 != ASCII 53
fi

# In this particular instance, both "-ne" and "!=" work.

echo

exit 0

Example 7-6. Testing whether a string is null

#!/bin/bash
#  str-test.sh: Testing null strings and unquoted strings,
#+ but not strings and sealing wax, not to mention cabbages and kings . . .

# Using   if [ ... ]


# If a string has not been initialized, it has no defined value.
# This state is called "null" (not the same as zero).

if [ -n $string1 ]    # $string1 has not been declared or initialized.
then
  echo "String \"string1\" is not null."
else  
  echo "String \"string1\" is null."
fi  
# Wrong result.
# Shows $string1 as not null, although it was not initialized.


echo


# Lets try it again.

if [ -n "$string1" ]  # This time, $string1 is quoted.
then
  echo "String \"string1\" is not null."
else  
  echo "String \"string1\" is null."
fi                    # Quote strings within test brackets!


echo


if [ $string1 ]       # This time, $string1 stands naked.
then
  echo "String \"string1\" is not null."
else  
  echo "String \"string1\" is null."
fi  
# This works fine.
# The [ ] test operator alone detects whether the string is null.
# However it is good practice to quote it ("$string1").
#
# As Stephane Chazelas points out,
#    if [ $string1 ]    has one argument, "]"
#    if [ "$string1" ]  has two arguments, the empty "$string1" and "]" 



echo



string1=initialized

if [ $string1 ]       # Again, $string1 stands naked.
then
  echo "String \"string1\" is not null."
else  
  echo "String \"string1\" is null."
fi  
# Again, gives correct result.
# Still, it is better to quote it ("$string1"), because . . .


string1="a = b"

if [ $string1 ]       # Again, $string1 stands naked.
then
  echo "String \"string1\" is not null."
else  
  echo "String \"string1\" is null."
fi  
# Not quoting "$string1" now gives wrong result!

exit 0
# Thank you, also, Florian Wisser, for the "heads-up".

Example zmore

#!/bin/bash
# zmore

#View gzipped files with 'more'

NOARGS=65
NOTFOUND=66
NOTGZIP=67

if [ $# -eq 0 ] # same effect as:  if [ -z "$1" ]
# $1 can exist, but be empty:  zmore "" arg2 arg3
then
  echo "Usage: `basename $0` filename" >&2
  # Error message to stderr.
  exit $NOARGS
  # Returns 65 as exit status of script (error code).
fi  

filename=$1

if [ ! -f "$filename" ]   # Quoting $filename allows for possible spaces.
then
  echo "File $filename not found!" >&2
  # Error message to stderr.
  exit $NOTFOUND
fi  

if [ ${filename##*.} != "gz" ]
# Using bracket in variable substitution.
then
  echo "File $1 is not a gzipped file!"
  exit $NOTGZIP
fi  

zcat $1 | more

# Uses the filter 'more.'
# May substitute 'less', if desired.


exit $?   # Script returns exit status of pipe.
# Actually "exit $?" is unnecessary, as the script will, in any case,
# return the exit status of the last command executed.

compound comparison

-a logical and
exp1 -a exp2 returns true if both exp1 and exp2 are true.

-o logical or
exp1 -o exp2 returns true if either exp1 or exp2 are true.


These are similar to the Bash comparison operators && and ||, used within double brackets.

[[ condition1 && condition2 ]]

The -o and -a operators work with the test command or occur within single test brackets.

if [ "$exp1" -a "$exp2" ]
```

### 12.4.4. Nested if/then Condition Tests

```text
Condition tests using the if/then  construct may be nested. The net result is equivalent to using the && compound comparison operator above.

if [ condition1 ]
then
  then
    do-something  # But only if both "condition1" and "condition2" valid.
  fi  
fi
```
