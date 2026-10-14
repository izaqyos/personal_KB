---
type: reference
title: Chapter 10. Loops and Branches
description: Subsection 12.7 of Advanced Bash-Scripting Guide.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.7"
---

# 12.7 Chapter 10. Loops and Branches

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

### 12.7.1 Loops

#### 12.7.1.1 For Loops

```text
for arg in [list]

    This is the basic looping construct. It differs significantly from its C counterpart.

    for arg in [list]
    do
     command(s)...
    done

    Note	During each pass through the loop, arg takes on the value of each successive variable in the list.

    for arg in "$var1" "$var2" "$var3" ... "$varN"  
    # In pass 1 of the loop, arg = $var1	    
    # In pass 2 of the loop, arg = $var2	    
    # In pass 3 of the loop, arg = $var3	    
    # ...
    # In pass N of the loop, arg = $varN

    # Arguments in [list] quoted to prevent possible word splitting.

    The argument list may contain wild cards.

    If do is on same line as for, there needs to be a semicolon after list.

    for arg in [list] ; do

    Note, use seq to generate a list of numbers from a range for the loop, like:
$ for n in $( seq 10 ) ; do echo $n; done
1
2
3
4
5
6
7
8
9
10
$ for n in $( seq 10 ) ; do echo -n $n; done
12345678910$ 

$ for n in $( seq 10 5 30 ) ; do echo  $n; done
10
15
20
25
30
```

#### 12.7.1.1.1 Example 10-1. Simple for loops

```text
    #!/bin/bash
    # Listing the planets.

    for planet in Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto
    do
      echo $planet  # Each planet on a separate line.
    done

    echo

    for planet in "Mercury Venus Earth Mars Jupiter Saturn Uranus Neptune Pluto"
        # All planets on same line.
        # Entire 'list' enclosed in quotes creates a single variable.
        # Why? Whitespace incorporated into the variable.
    do
      echo $planet
    done

    exit 0

    Each [list] element may contain multiple parameters. This is useful when processing parameters in groups. In such cases, use the set command (see Example 14-16) to force parsing of each [list] element and assignment of each component to the positional parameters.
```

#### 12.7.1.1.2 Example 10-2. for loop with two parameters in each [list] element

```text
    #!/bin/bash
    # Planets revisited.

    # Associate the name of each planet with its distance from the sun.

    for planet in "Mercury 36" "Venus 67" "Earth 93"  "Mars 142" "Jupiter 483"
    do
      set -- $planet  #  Parses variable "planet"
                      #+ and sets positional parameters.
      #  The "--" prevents nasty surprises if $planet is null or
      #+ begins with a dash.

      #  May need to save original positional parameters,
      #+ since they get overwritten.
      #  One way of doing this is to use an array,
      #         original_params=("$@")

      echo "$1		$2,000,000 miles from the sun"
      #-------two  tabs---concatenate zeroes onto parameter $2
    done

    # (Thanks, S.C., for additional clarification.)

    exit 0

    A variable may supply the [list] in a for loop.
```

#### 12.7.1.1.3 Example 10-3. Fileinfo: operating on a file list contained in a variable

```text
    #!/bin/bash
    # fileinfo.sh

    FILES="/usr/sbin/accept
    /usr/sbin/pwck
    /usr/sbin/chroot
    /usr/bin/fakefile
    /sbin/badblocks
    /sbin/ypbind"     # List of files you are curious about.
                      # Threw in a dummy file, /usr/bin/fakefile.

    echo

    for file in $FILES
    do

      if [ ! -e "$file" ]       # Check if file exists.
      then
        echo "$file does not exist."; echo
        continue                # On to next.
       fi

      ls -l $file | awk '{ print $9 "         file size: " $5 }'  # Print 2 fields.
      whatis `basename $file`   # File info.
      # Note that the whatis database needs to have been set up for this to work.
      # To do this, as root run /usr/bin/makewhatis.
      echo
    done  

    exit 0

    If the [list] in a for loop contains wild cards (* and ?) used in filename expansion, then globbing takes place.
```

#### 12.7.1.1.4 Example 10-4. Operating on files with a for loop

```text
    #!/bin/bash
    # list-glob.sh: Generating [list] in a for-loop, using "globbing"

    echo

    for file in *
    #           ^  Bash performs filename expansion
    #+             on expressions that globbing recognizes.
    do
      ls -l "$file"  # Lists all files in $PWD (current directory).
      #  Recall that the wild card character "*" matches every filename,
      #+ however, in "globbing," it doesn't match dot-files.

      #  If the pattern matches no file, it is expanded to itself.
      #  To prevent this, set the nullglob option
      #+   (shopt -s nullglob).
      #  Thanks, S.C.
    done

    echo; echo

    for file in [jx]*
    do
      rm -f $file    # Removes only files beginning with "j" or "x" in $PWD.
      echo "Removed file \"$file\"".
    done

    echo

    exit 0

    Omitting the in [list] part of a for loop causes the loop to operate on $@ -- the positional parameters. A particularly clever illustration of this is Example A-16. See also Example 14-17.
```

#### 12.7.1.1.5 Example 10-5. Missing in [list] in a for loop

```text
    #!/bin/bash

    #  Invoke this script both with and without arguments,
    #+ and see what happens.

    for a
    do
     echo -n "$a "
    done

    #  The 'in list' missing, therefore the loop operates on '$@'
    #+ (command-line argument list, including whitespace).

    echo

    exit 0

    It is possible to use command substitution to generate the [list] in a for loop. See also Example 15-53, Example 10-10 and Example 15-47.
```

#### 12.7.1.1.6 Example 10-6. Generating the [list] in a for loop with command substitution

```text
    #!/bin/bash
    #  for-loopcmd.sh: for-loop with [list]
    #+ generated by command substitution.

    NUMBERS="9 7 3 8 37.53"

    for number in `echo $NUMBERS`  # for number in 9 7 3 8 37.53
    do
      echo -n "$number "
    done

    echo 
    exit 0

    Here is a somewhat more complex example of using command substitution to create the [list].
```

#### 12.7.1.1.7 Example 10-7. A grep replacement for binary files

```text
    #!/bin/bash
    # bin-grep.sh: Locates matching strings in a binary file.

    # A "grep" replacement for binary files.
    # Similar effect to "grep -a"

    E_BADARGS=65
    E_NOFILE=66

    if [ $# -ne 2 ]
    then
      echo "Usage: `basename $0` search_string filename"
      exit $E_BADARGS
    fi

    if [ ! -f "$2" ]
    then
      echo "File \"$2\" does not exist."
      exit $E_NOFILE
    fi  


    IFS=$'\012'       # Per suggestion of Anton Filippov.
                      # was:  IFS="\n"
    for word in $( strings "$2" | grep "$1" )
    # The "strings" command lists strings in binary files.
    # Output then piped to "grep", which tests for desired string.
    do
      echo $word
    done

    # As S.C. points out, lines 23 - 30 could be replaced with the simpler
    #    strings "$2" | grep "$1" | tr -s "$IFS" '[\n*]'


    #  Try something like  "./bin-grep.sh mem /bin/ls"
    #+ to exercise this script.

    exit 0

    More of the same.
```

#### 12.7.1.1.8 Example 10-8. Listing all users on the system

```text
    #!/bin/bash
    # userlist.sh

    PASSWORD_FILE=/etc/passwd
    n=1           # User number

    for name in $(awk 'BEGIN{FS=":"}{print $1}' < "$PASSWORD_FILE" )
    # Field separator = :    ^^^^^^
    # Print first field              ^^^^^^^^
    # Get input from password file               ^^^^^^^^^^^^^^^^^
    do
      echo "USER #$n = $name"
      let "n += 1"
    done  


    # USER #1 = root
    # USER #2 = bin
    # USER #3 = daemon
    # ...
    # USER #30 = bozo

    exit 0

    #  Exercise:
    #  --------
    #  How is it that an ordinary user (or a script run by same)
    #+ can read /etc/passwd?
    #  Isn't this a security hole? Why or why not?

    A final example of the [list] resulting from command substitution.
```

#### 12.7.1.1.9 Example 10-9. Checking all the binaries in a directory for authorship

```text
    #!/bin/bash
    # findstring.sh:
    # Find a particular string in the binaries in a specified directory.

    directory=/usr/bin/
    fstring="Free Software Foundation"  # See which files come from the FSF.

    for file in $( find $directory -type f -name '*' | sort )
    do
      strings -f $file | grep "$fstring" | sed -e "s%$directory%%"
      #  In the "sed" expression,
      #+ it is necessary to substitute for the normal "/" delimiter
      #+ because "/" happens to be one of the characters filtered out.
      #  Failure to do so gives an error message (try it).
    done  

    exit 0

    #  Exercise (easy):
    #  ---------------
    #  Convert this script to take command-line parameters
    #+ for $directory and $fstring.

    The output of a for loop may be piped to a command or commands.
```

#### 12.7.1.1.10 Example 10-10. Listing the symbolic links in a directory

```text
    #!/bin/bash
    # symlinks.sh: Lists symbolic links in a directory.


    directory=${1-`pwd`}
    #  Defaults to current working directory,
    #+ if not otherwise specified.
    #  Equivalent to code block below.
    # ----------------------------------------------------------
    # ARGS=1                 # Expect one command-line argument.
    #
    # if [ $# -ne "$ARGS" ]  # If not 1 arg...
    # then
    #   directory=`pwd`      # current working directory
    # else
    #   directory=$1
    # fi
    # ----------------------------------------------------------

    echo "symbolic links in directory \"$directory\""

    for file in "$( find $directory -type l )"   # -type l = symbolic links
    do
      echo "$file"
    done | sort                                  # Otherwise file list is unsorted.
    #  Strictly speaking, a loop isn't really necessary here,
    #+ since the output of the "find" command is expanded into a single word.
    #  However, it's easy to understand and illustrative this way.

    #  As Dominik 'Aeneas' Schnitzer points out,
    #+ failing to quote  $( find $directory -type l )
    #+ will choke on filenames with embedded whitespace.
    #  Even this will only pick up the first field of each argument.

    exit 0


    # --------------------------------------------------------
    # Jean Helou proposes the following alternative:

    echo "symbolic links in directory \"$directory\""
    # Backup of the current IFS. One can never be too cautious.
    OLDIFS=$IFS
    IFS=:

    for file in $(find $directory -type l -printf "%p$IFS")
    do     #                              ^^^^^^^^^^^^^^^^
           echo "$file"
           done|sort

    # And, James "Mike" Conley suggests modifying Helou's code thusly:

    OLDIFS=$IFS
    IFS='' # Null IFS means no word breaks
    for file in $( find $directory -type l )
    do
      echo $file
      done | sort

    #  This works in the "pathological" case of a directory name having
    #+ an embedded colon.
    #  "This also fixes the pathological case of the directory name having
    #+  a colon (or space in earlier example) as well."

    The stdout of a loop may be redirected to a file, as this slight modification to the previous example shows.
```

#### 12.7.1.1.11 Example 10-11. Symbolic links in a directory, saved to a file

```text
    #!/bin/bash
    # symlinks.sh: Lists symbolic links in a directory.

    OUTFILE=symlinks.list                         # save file

    directory=${1-`pwd`}
    #  Defaults to current working directory,
    #+ if not otherwise specified.


    echo "symbolic links in directory \"$directory\"" > "$OUTFILE"
    echo "---------------------------" >> "$OUTFILE"

    for file in "$( find $directory -type l )"    # -type l = symbolic links
    do
      echo "$file"
    done | sort >> "$OUTFILE"                     # stdout of loop
    #           ^^^^^^^^^^^^^                       redirected to save file.

    exit 0

    There is an alternative syntax to a for loop that will look very familiar to C programmers. This requires double parentheses.
```

#### 12.7.1.1.12 Example 10-12. A C-style for loop

```text
    #!/bin/bash
    # Two ways to count up to 10.

    echo

    # Standard syntax.
    for a in 1 2 3 4 5 6 7 8 9 10
    do
      echo -n "$a "
    done  

    echo; echo

    # +==========================================+

    # Now, let's do the same, using C-like syntax.

    LIMIT=10

    for ((a=1; a <= LIMIT ; a++))  # Double parentheses, and "LIMIT" with no "$".
    do
      echo -n "$a "
    done                           # A construct borrowed from 'ksh93'.

    echo; echo

    # +=========================================================================+

    # Let's use the C "comma operator" to increment two variables simultaneously.

    for ((a=1, b=1; a <= LIMIT ; a++, b++))  # The comma chains together operations.
    do
      echo -n "$a-$b "
    done

    echo; echo

    exit 0

    See also Example 26-16, Example 26-17, and Example A-6.

    ---

    Now, a for loop used in a "real-life" context.
```

#### 12.7.1.1.13 Example 10-13. Using efax in batch mode

```text
    #!/bin/bash
    # Faxing (must have 'efax' package installed).

    EXPECTED_ARGS=2
    E_BADARGS=65
    MODEM_PORT="/dev/ttyS2"   # May be different on your machine.
    #                ^^^^^      PCMCIA modem card default port.

    if [ $# -ne $EXPECTED_ARGS ]
    # Check for proper number of command line args.
    then
       echo "Usage: `basename $0` phone# text-file"
       exit $E_BADARGS
    fi


    if [ ! -f "$2" ]
    then
      echo "File $2 is not a text file."
      #     File is not a regular file, or does not exist.
      exit $E_BADARGS
    fi
      

    fax make $2              #  Create fax-formatted files from text files.

    for file in $(ls $2.0*)  #  Concatenate the converted files.
                             #  Uses wild card (filename "globbing")
    			 #+ in variable list.
    do
      fil="$fil $file"
    done  

    efax -d "$MODEM_PORT"  -t "T$1" $fil   # Finally, do the work.
    # Trying adding  -o1  if above line fails.


    #  As S.C. points out, the for-loop can be eliminated with
    #     efax -d /dev/ttyS2 -o1 -t "T$1" $2.0*
    #+ but it's not quite as instructive [grin].

    exit $?   # Also, efax sends diagnostic messages to stdout.
```

#### 12.7.1.2 While Loops

```text
This construct tests for a condition at the top of a loop, and keeps looping as long as that condition is true (returns a 0 exit status). In contrast to a for loop, a while loop finds use in situations where the number of loop repetitions is not known beforehand.

while [ condition ]
do
 command(s)...
done

The bracket construct in a while loop is nothing more than our old friend, the test brackets used in an if/then test. In fact, a while loop can legally use the more versatile double brackets construct (while [[ condition ]]).

As is the case with for loops, placing the do on the same line as the condition test requires a semicolon.

while [ condition ] ; do

Note that the test brackets are not mandatory in a while loop. See, for example, the getopts construct.
```

#### 12.7.1.2.1 Example 10-14. Simple while loop

```text
#!/bin/bash

var0=0
LIMIT=10

while [ "$var0" -lt "$LIMIT" ]
#      ^                    ^
# Spaces, because these are "test-brackets" . . .
do
  echo -n "$var0 "        # -n suppresses newline.
  #             ^           Space, to separate printed out numbers.

  var0=`expr $var0 + 1`   # var0=$(($var0+1))  also works.
                          # var0=$((var0 + 1)) also works.
                          # let "var0 += 1"    also works.
done                      # Various other methods also work.

echo

exit 0
```

#### 12.7.1.2.2 Example 10-15. Another while loop

```text
#!/bin/bash

echo
                               # Equivalent to:
while [ "$var1" != "end" ]     # while test "$var1" != "end"
do
  echo "Input variable #1 (end to exit) "
  read var1                    # Not 'read $var1' (why?).
  echo "variable #1 = $var1"   # Need quotes because of "#" . . .
  # If input is 'end', echoes it here.
  # Does not test for termination condition until top of loop.
  echo
done  

exit 0

A while loop may have multiple conditions. Only the final condition determines when the loop terminates. This necessitates a slightly different loop syntax, however.
```

#### 12.7.1.2.3 Example 10-16. while loop with multiple conditions

```text
#!/bin/bash

var1=unset
previous=$var1

while echo "previous-variable = $previous"
      echo
      previous=$var1
      [ "$var1" != end ] # Keeps track of what $var1 was previously.
      # Four conditions on "while", but only last one controls loop.
      # The *last* exit status is the one that counts.
do
echo "Input variable #1 (end to exit) "
  read var1
  echo "variable #1 = $var1"
done  

# Try to figure out how this all works.
# It's a wee bit tricky.

exit 0

As with a for loop, a while loop may employ C-style syntax by using the double parentheses construct (see also Example 9-33).
```

#### 12.7.1.2.4 Example 10-17. C-style syntax in a while loop

```text
#!/bin/bash
# wh-loopc.sh: Count to 10 in a "while" loop.

LIMIT=10
a=1

while [ "$a" -le $LIMIT ]
do
  echo -n "$a "
  let "a+=1"
done           # No surprises, so far.

echo; echo

# +=================================================================+

# Now, repeat with C-like syntax.

((a = 1))      # a=1
# Double parentheses permit space when setting a variable, as in C.

while (( a <= LIMIT ))   # Double parentheses, and no "$" preceding variables.
do
  echo -n "$a "
  ((a += 1))   # let "a+=1"
  # Yes, indeed.
  # Double parentheses permit incrementing a variable with C-like syntax.
done

echo

# C programmers can feel right at home in Bash.

exit 0

Inside its test brackets, a while loop can call a function.

t=0

condition ()
{
  ((t++))

  if [ $t -lt 5 ]
  then
    return 0  # true
  else
    return 1  # false
  fi
}

while condition
#     ^^^^^^^^^
#     Function call -- four loop iterations.
do
  echo "Still going: t = $t"
done

# Still going: t = 1
# Still going: t = 2
# Still going: t = 3
# Still going: t = 4

Similar to the if-test construct, a while loop can omit the test brackets.

while condition
do
   ...
done

By coupling the power of the read command with a while loop, we get the handy while read construct, useful for reading and parsing files.

cat $filename |   # Supply input from a file.
while read line   # As long as there is another line to read ...
do
  ...
done

Note	

A while loop may have its stdin redirected to a file by a < at its end.

A while loop may have its stdin supplied by a pipe.
```

#### 12.7.1.3 Until Loops

```text
    This construct tests for a condition at the top of a loop, and keeps looping as long as that condition is false (opposite of while loop).

    until [ condition-is-true ]
    do
     command(s)...
    done

    Note that an until loop tests for the terminating condition at the top of the loop, differing from a similar construct in some programming languages.

    As is the case with for loops, placing the do on the same line as the condition test requires a semicolon.

    until [ condition-is-true ] ; do
```

#### 12.7.1.3.1 Example 10-18. until loop

```text
    #!/bin/bash

    END_CONDITION=end

    until [ "$var1" = "$END_CONDITION" ]
    # Tests condition here, at top of loop.
    do
      echo "Input variable #1 "
      echo "($END_CONDITION to exit)"
      read var1
      echo "variable #1 = $var1"
      echo
    done  

    exit 0

How to choose between a for loop or a while loop or until loop? In C, you would typically use a for loop when the number of loop iterations is known beforehand. With Bash, however, the situation is fuzzier. The Bash for loop is more loosely structured and more flexible than its equivalent in other languages. Therefore, feel free to use whatever type of loop gets the job done in the simplest way.
```

### 12.7.2 Nested Loops

```text
A nested loop is a loop within a loop, an inner loop within the body of an outer one. How this works is that the first pass of the outer loop triggers the inner loop, which executes to completion. Then the second pass of the outer loop triggers the inner loop again. This repeats until the outer loop finishes. Of course, a break within either the inner or outer loop would interrupt this process.

Example 10-19. Nested Loop

#!/bin/bash
# nested-loop.sh: Nested "for" loops.

outer=1             # Set outer loop counter.

# Beginning of outer loop.
for a in 1 2 3 4 5
do
  echo "Pass $outer in outer loop."
  echo "---------------------"
  inner=1           # Reset inner loop counter.

  # ===============================================
  # Beginning of inner loop.
  for b in 1 2 3 4 5
  do
    echo "Pass $inner in inner loop."
    let "inner+=1"  # Increment inner loop counter.
  done
  # End of inner loop.
  # ===============================================

  let "outer+=1"    # Increment outer loop counter. 
  echo              # Space between output blocks in pass of outer loop.
done               
# End of outer loop.

exit 0
```

### 12.7.3 Loop Control

```text
Commands Affecting Loop Behavior

break, continue 
    The break and continue loop control commands [1] correspond exactly to their counterparts in other programming languages. The break command terminates the loop (breaks out of it), while continue causes a jump to the next iteration (repetition) of the loop, skipping all the remaining commands in that particular loop cycle.
```

#### 12.7.3.1 Example 10-20. Effects of break and continue in a loop

```text
    #!/bin/bash

    LIMIT=19  # Upper limit

    echo
    echo "Printing Numbers 1 through 20 (but not 3 and 11)."

    a=0

    while [ $a -le "$LIMIT" ]
    do
     a=$(($a+1))

     if [ "$a" -eq 3 ] || [ "$a" -eq 11 ]  # Excludes 3 and 11.
     then
       continue      # Skip rest of this particular loop iteration.
     fi

     echo -n "$a "   # This will not execute for 3 and 11.
    done 

    # Exercise:
    # Why does loop print up to 20?

    echo; echo

    echo Printing Numbers 1 through 20, but something happens after 2.

    ##################################################################

    # Same loop, but substituting 'break' for 'continue'.

    a=0

    while [ "$a" -le "$LIMIT" ]
    do
     a=$(($a+1))

     if [ "$a" -gt 2 ]
     then
       break  # Skip entire rest of loop.
     fi

     echo -n "$a "
    done

    echo; echo; echo

    exit 0

    The break command may optionally take a parameter. A plain break terminates only the innermost loop in which it is embedded, but a break N breaks out of N levels of loop.
```

#### 12.7.3.2 Example 10-21. Breaking out of multiple loop levels

```text
    #!/bin/bash
    # break-levels.sh: Breaking out of loops.

    # "break N" breaks out of N level loops.

    for outerloop in 1 2 3 4 5
    do
      echo -n "Group $outerloop:   "

      # --------------------------------------------------------
      for innerloop in 1 2 3 4 5
      do
        echo -n "$innerloop "

        if [ "$innerloop" -eq 3 ]
        then
          break  # Try   break 2   to see what happens.
                 # ("Breaks" out of both inner and outer loops.)
        fi
      done
      # --------------------------------------------------------

      echo
    done  

    echo

    exit 0

    The continue command, similar to break, optionally takes a parameter. A plain continue cuts short the current iteration within its loop and begins the next. A continue N terminates all remaining iterations at its loop level and continues with the next iteration at the loop, N levels above.
```

#### 12.7.3.3 Example 10-22. Continuing at a higher loop level

```text
    #!/bin/bash
    # The "continue N" command, continuing at the Nth level loop.

    for outer in I II III IV V           # outer loop
    do
      echo; echo -n "Group $outer: "

      # --------------------------------------------------------------------
      for inner in 1 2 3 4 5 6 7 8 9 10  # inner loop
      do

        if [ "$inner" -eq 7 ]
        then
          continue 2  # Continue at loop on 2nd level, that is "outer loop".
                      # Replace above line with a simple "continue"
                      # to see normal loop behavior.
        fi  

        echo -n "$inner "  # 7 8 9 10 will never echo.
      done  
      # --------------------------------------------------------------------

    done

    echo; echo

    # Exercise:
    # Come up with a meaningful use for "continue N" in a script.

    exit 0
```

#### 12.7.3.4 Example 10-23. Using continue N in an actual task

```text
    # Albert Reiner gives an example of how to use "continue N":
    # ---------------------------------------------------------

    #  Suppose I have a large number of jobs that need to be run, with
    #+ any data that is to be treated in files of a given name pattern in a
    #+ directory. There are several machines that access this directory, and
    #+ I want to distribute the work over these different boxen. Then I
    #+ usually nohup something like the following on every box:

    while true
    do
      for n in .iso.*
      do
        [ "$n" = ".iso.opts" ] && continue
        beta=${n#.iso.}
        [ -r .Iso.$beta ] && continue
        [ -r .lock.$beta ] && sleep 10 && continue
        lockfile -r0 .lock.$beta || continue
        echo -n "$beta: " `date`
        run-isotherm $beta
        date
        ls -alF .Iso.$beta
        [ -r .Iso.$beta ] && rm -f .lock.$beta
        continue 2
      done
      break
    done

    #  The details, in particular the sleep N, are particular to my
    #+ application, but the general pattern is:

    while true
    do
      for job in {pattern}
      do
        {job already done or running} && continue
        {mark job as running, do job, mark job as done}
        continue 2
      done
      break        # Or something like `sleep 600' to avoid termination.
    done

    #  This way the script will stop only when there are no more jobs to do
    #+ (including jobs that were added during runtime). Through the use
    #+ of appropriate lockfiles it can be run on several machines
    #+ concurrently without duplication of calculations [which run a couple
    #+ of hours in my case, so I really want to avoid this]. Also, as search
    #+ always starts again from the beginning, one can encode priorities in
    #+ the file names. Of course, one could also do this without `continue 2',
    #+ but then one would have to actually check whether or not some job
    #+ was done (so that we should immediately look for the next job) or not
    #+ (in which case we terminate or sleep for a long time before checking
    #+ for a new job).

    Caution	

    The continue N construct is difficult to understand and tricky to use in any meaningful context. It is probably best avoided.
```

### 12.7.4 Testing and Branching

```text
The case and select  constructs are technically not loops, since they do not iterate the execution of a code block. Like loops, however, they direct program flow according to conditions at the top or bottom of the block.

Controlling program flow in a code block
```

#### 12.7.4.1 case (in) / esac

```text
    The case construct is the shell scripting analog to switch in C/C++. It permits branching to one of a number of code blocks, depending on condition tests. It serves as a kind of shorthand for multiple if/then/else statements and is an appropriate tool for creating menus.

    case "$variable" in

     "$condition1" )
     command...
     ;;

     "$condition2" )
     command...
     ;;

    esac

    Note	

        * Quoting the variables is not mandatory, since word splitting does not take place.
        * Each test line ends with a right paren ).
        * Each condition block ends with a double semicolon ;;.
        * The entire case block terminates with an esac (case spelled backwards).
```

#### 12.7.4.1.1 Example 10-24. Using case

```text
    #!/bin/bash
    # Testing ranges of characters.

    echo; echo "Hit a key, then hit return."
    read Keypress

    case "$Keypress" in
      [[:lower:]]   ) echo "Lowercase letter";;
      [[:upper:]]   ) echo "Uppercase letter";;
      [[:digit:]]         ) echo "Digit";;
#      [0-9]         ) echo "Digit";;
      *             ) echo "Punctuation, whitespace, or other";;
    esac      #  Allows ranges of characters in [square brackets],
              #+ or POSIX ranges in [[double square brackets.

    #  In the first version of this example,
    #+ the tests for lowercase and uppercase characters were
    #+ [a-z] and [A-Z].
    #  This no longer works in certain locales and/or Linux distros.
    #  POSIX is more portable.
    #  Thanks to Frank Wang for pointing this out.

    #  Exercise:
    #  --------
    #  As the script stands, it accepts a single keystroke, then terminates.
    #  Change the script so it accepts repeated input,
    #+ reports on each keystroke, and terminates only when "X" is hit.
    #  Hint: enclose everything in a "while" loop.

    exit 0
```

#### 12.7.4.1.2 Example 10-25. Creating menus using case

```text
    #!/bin/bash

    # Crude address database

    clear # Clear the screen.

    echo "          Contact List"
    echo "          ------- ----"
    echo "Choose one of the following persons:" 
    echo
    echo "[E]vans, Roland"
    echo "[J]ones, Mildred"
    echo "[S]mith, Julie"
    echo "[Z]ane, Morris"
    echo

    read person

    case "$person" in
    # Note variable is quoted.

      "E" | "e" )
      # Accept upper or lowercase input.
      echo
      echo "Roland Evans"
      echo "4321 Floppy Dr."
      echo "Hardscrabble, CO 80753"
      echo "(303) 734-9874"
      echo "(303) 734-9892 fax"
      echo "revans@zzy.net"
      echo "Business partner & old friend"
      ;;
    # Note double semicolon to terminate each option.

      "J" | "j" )
      echo
      echo "Mildred Jones"
      echo "249 E. 7th St., Apt. 19"
      echo "New York, NY 10009"
      echo "(212) 533-2814"
      echo "(212) 533-9972 fax"
      echo "milliej@loisaida.com"
      echo "Ex-girlfriend"
      echo "Birthday: Feb. 11"
      ;;

    # Add info for Smith & Zane later.

              * )
       # Default option.	  
       # Empty input (hitting RETURN) fits here, too.
       echo
       echo "Not yet in database."
      ;;

    esac

    echo

    #  Exercise:
    #  --------
    #  Change the script so it accepts multiple inputs,
    #+ instead of terminating after displaying just one address.

    exit 0

    An exceptionally clever use of case involves testing for command-line parameters.

    #! /bin/bash

    case "$1" in
      "") echo "Usage: ${0##*/} <filename>"; exit $E_PARAM;;
                          # No command-line parameters,
                          # or first parameter empty.
    # Note that ${0##*/} is ${var##pattern} param substitution.
                          # Net result is $0.

      -*) FILENAME=./$1;;   #  If filename passed as argument ($1)
                          #+ starts with a dash,
                          #+ replace it with ./$1
                          #+ so further commands don't interpret it
                          #+ as an option.

      * ) FILENAME=$1;;     # Otherwise, $1.
    esac

    Here is an more straightforward example of command-line parameter handling:

    #! /bin/bash


    while [ $# -gt 0 ]; do    # Until you run out of parameters . . .
      case "$1" in
        -d|--debug)
                  # "-d" or "--debug" parameter?
                  DEBUG=1
                  ;;
        -c|--conf)
                  CONFFILE="$2"
                  shift
                  if [ ! -f $CONFFILE ]; then
                    echo "Error: Supplied file doesn't exist!"
                    exit $E_CONFFILE     # File not found error.
                  fi
                  ;;
      esac
      shift       # Check next set of parameters.
    done

    #  From Stefano Falsetto's "Log2Rot" script,
    #+ part of his "rottlog" package.
    #  Used with permission.
```

#### 12.7.4.1.3 Example 10-26. Using command substitution to generate the case variable

```text
    #!/bin/bash
    # case-cmd.sh: Using command substitution to generate a "case" variable.

    case $( arch ) in   # "arch" returns machine architecture.
                        # Equivalent to 'uname -m' ...
      i386 ) echo "80386-based machine";;
      i486 ) echo "80486-based machine";;
      i586 ) echo "Pentium-based machine";;
      i686 ) echo "Pentium2+-based machine";;
      *    ) echo "Other type of machine";;
    esac

    exit 0

    A case construct can filter strings for globbing patterns.
```

#### 12.7.4.1.4 Example 10-27. Simple string matching

```text
    #!/bin/bash
    # match-string.sh: simple string matching

    match_string ()
    {
      MATCH=0
      NOMATCH=90
      PARAMS=2     # Function requires 2 arguments.
      BAD_PARAMS=91

      [ $# -eq $PARAMS ] || return $BAD_PARAMS

      case "$1" in
      "$2") return $MATCH;;
      *   ) return $NOMATCH;;
      esac

    }  


    a=one
    b=two
    c=three
    d=two


    match_string $a     # wrong number of parameters
    echo $?             # 91

    match_string $a $b  # no match
    echo $?             # 90

    match_string $b $d  # match
    echo $?             # 0


    exit 0		    
```

#### 12.7.4.1.5 Example 10-28. Checking for alphabetic input

```text
    #!/bin/bash
    # isalpha.sh: Using a "case" structure to filter a string.

    SUCCESS=0
    FAILURE=-1

    isalpha ()  # Tests whether *first character* of input string is alphabetic.
    {
    if [ -z "$1" ]                # No argument passed?
    then
      return $FAILURE
    fi

    case "$1" in
      [a-zA-Z]*) return $SUCCESS;;  # Begins with a letter?
      *        ) return $FAILURE;;
    esac
    }             # Compare this with "isalpha ()" function in C.


    isalpha2 ()   # Tests whether *entire string* is alphabetic.
    {
      [ $# -eq 1 ] || return $FAILURE

      case $1 in
      *[!a-zA-Z]*|"") return $FAILURE;;
                   *) return $SUCCESS;;
      esac
    }

    isdigit ()    # Tests whether *entire string* is numerical.
    {             # In other words, tests for integer variable.
      [ $# -eq 1 ] || return $FAILURE

      case $1 in
        *[!0-9]*|"") return $FAILURE;;
                  *) return $SUCCESS;;
      esac
    }



    check_var ()  # Front-end to isalpha ().
    {
    if isalpha "$@"
    then
      echo "\"$*\" begins with an alpha character."
      if isalpha2 "$@"
      then        # No point in testing if first char is non-alpha.
        echo "\"$*\" contains only alpha characters."
      else
        echo "\"$*\" contains at least one non-alpha character."
      fi  
    else
      echo "\"$*\" begins with a non-alpha character."
                  # Also "non-alpha" if no argument passed.
    fi

    echo

    }

    digit_check ()  # Front-end to isdigit ().
    {
    if isdigit "$@"
    then
      echo "\"$*\" contains only digits [0 - 9]."
    else
      echo "\"$*\" has at least one non-digit character."
    fi

    echo

    }

    a=23skidoo
    b=H3llo
    c=-What?
    d=What?
    e=`echo $b`   # Command substitution.
    f=AbcDef
    g=27234
    h=27a34
    i=27.34

    check_var $a
    check_var $b
    check_var $c
    check_var $d
    check_var $e
    check_var $f
    check_var     # No argument passed, so what happens?
    #
    digit_check $g
    digit_check $h
    digit_check $i


    exit 0        # Script improved by S.C.

    # Exercise:
    # --------
    #  Write an 'isfloat ()' function that tests for floating point numbers.
    #  Hint: The function duplicates 'isdigit ()',
    #+ but adds a test for a mandatory decimal point.

select

    The select construct, adopted from the Korn Shell, is yet another tool for building menus.

    select variable [in list]
    do
     command...
     break
    done

    This prompts the user to enter one of the choices presented in the variable list. Note that select uses the PS3 prompt (#? ) by default, but that this may be changed.

    Example 10-29. Creating menus using select

    #!/bin/bash

    PS3='Choose your favorite vegetable: ' # Sets the prompt string.

    echo

    select vegetable in "beans" "carrots" "potatoes" "onions" "rutabagas"
    do
      echo
      echo "Your favorite veggie is $vegetable."
      echo "Yuck!"
      echo
      break  # What happens if there is no 'break' here?
    done

    exit 0

    If in list is omitted, then select uses the list of command line arguments ($@) passed to the script or to the function in which the select construct is embedded.

    Compare this to the behavior of a

    for variable [in list]
    construct with the in list omitted.

    Example 10-30. Creating menus using select in a function

    #!/bin/bash

    PS3='Choose your favorite vegetable: '

    echo

    choice_of()
    {
    select vegetable
    # [in list] omitted, so 'select' uses arguments passed to function.
    do
      echo
      echo "Your favorite veggie is $vegetable."
      echo "Yuck!"
      echo
      break
    done
    }

    choice_of beans rice carrots radishes tomatoes spinach
    #         $1    $2   $3      $4       $5       $6
    #         passed to choice_of() function

    exit 0
```
