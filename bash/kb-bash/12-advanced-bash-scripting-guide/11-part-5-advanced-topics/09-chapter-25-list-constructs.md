---
type: reference
title: Chapter 25. List Constructs
description: Subsection 12.12.9 of Part 5. Advanced Topics.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.9"
---

# 12.12.9 Chapter 25. List Constructs

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

```text
The and list and or list constructs provide a means of processing a number of commands consecutively. These can effectively replace complex nested if/then  or even case statements.

Chaining together commands

and list

    command-1 && command-2 && command-3 && ... command-n

    Each command executes in turn, provided that the previous command has given a return value of true (zero). At the first false (non-zero) return, the command chain terminates (the first command returning false is the last one to execute).
```

#### 12.12.9.1 Example 25-1. Using an and list to test for command-line arguments

```text
    #!/bin/bash
    # and list

    if [ ! -z "$1" ] && echo "Argument #1 = $1" && [ ! -z "$2" ] \
    && echo "Argument #2 = $2"
    then
      echo "At least 2 arguments passed to script."
      # All the chained commands return true.
    else
      echo "Less than 2 arguments passed to script."
      # At least one of the chained commands returns false.
    fi  
    # Note that "if [ ! -z $1 ]" works, but its supposed equivalent,
    #   if [ -n $1 ] does not.
    #     However, quoting fixes this.
    #  if [ -n "$1" ] works.
    #     Careful!
    # It is always best to QUOTE tested variables.


    # This accomplishes the same thing, using "pure" if/then statements.
    if [ ! -z "$1" ]
    then
      echo "Argument #1 = $1"
    fi
    if [ ! -z "$2" ]
    then
      echo "Argument #2 = $2"
      echo "At least 2 arguments passed to script."
    else
      echo "Less than 2 arguments passed to script."
    fi
    # It's longer and less elegant than using an "and list".


    exit 0
```

#### 12.12.9.2 Example 25-2. Another command-line arg test using an and list

```text
    #!/bin/bash

    ARGS=1        # Number of arguments expected.
    E_BADARGS=65  # Exit value if incorrect number of args passed.

    test $# -ne $ARGS && \
    echo "Usage: `basename $0` $ARGS argument(s)" && exit $E_BADARGS
    #  If condition 1 tests true (wrong number of args passed to script),
    #+ then the rest of the line executes, and script terminates.

    # Line below executes only if the above test fails.
    echo "Correct number of arguments passed to this script."

    exit 0

    # To check exit value, do a "echo $?" after script termination.

    Of course, an and list can also set variables to a default value.

    arg1=$@ && [ -z "$arg1" ] && arg1=DEFAULT
    		
                  # Set $arg1 to command line arguments, if any.
                  # But . . . set to DEFAULT if not specified on command line.

or list

    command-1 || command-2 || command-3 || ... command-n

    Each command executes in turn for as long as the previous command returns false. At the first true return, the command chain terminates (the first command returning true is the last one to execute). This is obviously the inverse of the "and list".
```

#### 12.12.9.3 Example 25-3. Using or lists in combination with an and list

```text
    #!/bin/bash

    #  delete.sh, a not-so-cunning file deletion utility.
    #  Usage: delete filename

    E_BADARGS=85

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` filename"
      exit $E_BADARGS  # No arg? Bail out.
    else  
      file=$1          # Set filename.
    fi  


    [ ! -f "$file" ] && echo "File \"$file\" not found. \
    Cowardly refusing to delete a nonexistent file."
    # AND LIST, to give error message if file not present.
    # Note echo message continued on to a second line with an escape.

    [ ! -f "$file" ] || (rm -f $file; echo "File \"$file\" deleted.")
    # OR LIST, to delete file if present.

    # Note logic inversion above.
    # AND LIST executes on true, OR LIST on false.

    exit $?

    Caution	If the first command in an or list returns true, it will execute.

# ==> The following snippets from the /etc/rc.d/init.d/single
#+==> script by Miquel van Smoorenburg
#+==> illustrate use of "and" and "or" lists.
# ==> "Arrowed" comments added by document author.

[ -x /usr/bin/clear ] && /usr/bin/clear
  # ==> If /usr/bin/clear exists, then invoke it.
  # ==> Checking for the existence of a command before calling it
  #+==> avoids error messages and other awkward consequences.

  # ==> . . .

# If they want to run something in single user mode, might as well run it...
for i in /etc/rc1.d/S[0-9][0-9]* ; do
        # Check if the script is there.
        [ -x "$i" ] || continue
  # ==> If corresponding file in $PWD *not* found,
  #+==> then "continue" by jumping to the top of the loop.

        # Reject backup files and files generated by rpm.
        case "$1" in
                *.rpmsave|*.rpmorig|*.rpmnew|*~|*.orig)
                        continue;;
        esac
        [ "$i" = "/etc/rc1.d/S00single" ] && continue
  # ==> Set script name, but don't execute it yet.
        $i start
done

  # ==> . . .

Important	The exit status of an and list or an or list is the exit status of the last command executed.

Clever combinations of and and or lists are possible, but the logic may easily become convoluted and require close attention to operator precedence rules, and possibly extensive debugging.

false && true || echo false         # false

# Same result as
( false && true ) || echo false     # false
# But NOT
false && ( true || echo false )     # (nothing echoed)

#  Note left-to-right grouping and evaluation of statements,
#+ since the logic operators "&&" and "||" have equal precedence.

#  It's usually best to avoid such complexities.

#  Thanks, S.C.
```
