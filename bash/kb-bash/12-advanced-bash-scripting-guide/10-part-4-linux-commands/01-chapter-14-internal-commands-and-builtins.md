---
type: reference
title: Chapter 14. Internal Commands and Builtins
description: Subsection 12.11.1 of Part 4. Linux Commands.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.11.1"
---

# 12.11.1 Chapter 14. Internal Commands and Builtins

[↑ Part 4. Linux Commands](/bash/kb-bash/12-advanced-bash-scripting-guide/10-part-4-linux-commands/README.md)

```text
A builtin is a command contained within the Bash tool set, literally built in. This is either for performance reasons -- builtins execute faster than external commands, which usually require forking off a separate process -- or because a particular builtin needs direct access to the shell internals.

When a command or the shell itself initiates (or spawns) a new subprocess to carry out a task, this is called forking. This new process is the child, and the process that forked it off is the parent. While the child process is doing its work, the parent process is still executing.

Note that while a parent process gets the process ID of the child process, and can thus pass arguments to it, the reverse is not true. This can create problems that are subtle and hard to track down.
```

#### 12.11.1.1 Example 14-1. A script that forks off multiple instances of itself

```text
#!/bin/bash
# spawn.sh


PIDS=$(pidof sh $0)  # Process IDs of the various instances of this script. 
P_array=( $PIDS )    # Put them in an array (why?).
echo $PIDS           # Show process IDs of parent and child processes.
let "instances = ${#P_array[*]} - 1"  # Count elements, less 1.
                                      # Why subtract 1?
echo "$instances instance(s) of this script running."
echo "[Hit Ctl-C to exit.]"; echo


sleep 1              # Wait.
sh $0                # Play it again, Sam.

exit 0               # Not necessary; script will never get to here.
                     # Why not?

#  After exiting with a Ctl-C,
#+ do all the spawned instances of the script die?
#  If so, why?

# Note:
# ----
# Be careful not to run this script too long.
# It will eventually eat up too many system resources.

#  Is having a script spawn multiple instances of itself
#+ an advisable scripting technique.
#  Why or why not?

Generally, a Bash builtin does not fork a subprocess when it executes within a script. An external system command or filter in a script usually will fork a subprocess.

A builtin may be a synonym to a system command of the same name, but Bash reimplements it internally. For example, the Bash echo command is not the same as /bin/echo, although their behavior is almost identical.

#!/bin/bash

echo "This line uses the \"echo\" builtin."
/bin/echo "This line uses the /bin/echo system command."

A keyword is a reserved word, token or operator. Keywords have a special meaning to the shell, and indeed are the building blocks of the shell's syntax. As examples, for, while, do, and ! are keywords. Similar to a builtin, a keyword is hard-coded into Bash, but unlike a builtin, a keyword is not in itself a command, but a subunit of a command construct. [1]
```

#### 12.11.1.2 I/O

#### 12.11.1.2.1 echo

```text
    prints (to stdout) an expression or variable (see Example 4-1).

    echo Hello
    echo $a

    An echo requires the -e option to print escaped characters. See Example 5-2.

    Normally, each echo command prints a terminal newline, but the -n option suppresses this.

    Note	An echo can be used to feed a sequence of commands down a pipe.

    if echo "$VAR" | grep -q txt   # if [[ $VAR = *txt* ]]
    then
      echo "$VAR contains the substring sequence \"txt\""
    fi

    Note	An echo, in combination with command substitution can set a variable.

    a=`echo "HELLO" | tr A-Z a-z`


    Be aware that echo `command` deletes any linefeeds that the output of command generates.

    The $IFS (internal field separator) variable normally contains \n (linefeed) as one of its set of whitespace characters. Bash therefore splits the output of command at linefeeds into arguments to echo. Then echo outputs these arguments, separated by spaces.

    bash$ ls -l /usr/share/apps/kjezz/sounds
    -rw-r--r--    1 root     root         1407 Nov  7  2000 reflect.au
     -rw-r--r--    1 root     root          362 Nov  7  2000 seconds.au




    bash$ echo `ls -l /usr/share/apps/kjezz/sounds`
    total 40 -rw-r--r-- 1 root root 716 Nov 7 2000 reflect.au -rw-r--r-- 1 root root ...
    	      

    So, how can we embed a linefeed within an echoed character string?

    # Embedding a linefeed?
    echo "Why doesn't this string \n split on two lines?"
    # Doesn't split.

    # Let's try something else.

    echo
    	     
    echo $"A line of text containing
    a linefeed."
    # Prints as two distinct lines (embedded linefeed).
    # But, is the "$" variable prefix really necessary?

    echo

    echo "This string splits
    on two lines."
    # No, the "$" is not needed.

    echo
    echo "---------------"
    echo

    echo -n $"Another line of text containing
    a linefeed."
    # Prints as two distinct lines (embedded linefeed).
    # Even the -n option fails to suppress the linefeed here.

    echo
    echo
    echo "---------------"
    echo
    echo

    # However, the following doesn't work as expected.
    # Why not? Hint: Assignment to a variable.
    string1=$"Yet another line of text containing
    a linefeed (maybe)."

    echo $string1
    # Yet another line of text containing a linefeed (maybe).
    #                                    ^
    # Linefeed becomes a space.

    # Thanks, Steve Parker, for pointing this out.

    Note	This command is a shell builtin, and not the same as /bin/echo, although its behavior is similar.

    bash$ type -a echo
    echo is a shell builtin
     echo is /bin/echo
```

#### 12.11.1.2.2 printf, formatted print, formatting output

```text
    The printf, formatted print, command is an enhanced echo. It is a limited variant of the C language printf() library function, and its syntax is somewhat different.

    printf format-string... parameter...

    This is the Bash builtin version of the /bin/printf or /usr/bin/printf command. See the printf manpage (of the system command) for in-depth coverage.

    Caution	Older versions of Bash may not support printf.

    Example 14-2. printf in action

    #!/bin/bash
    # printf demo

    PI=3.14159265358979
    DecimalConstant=31373
    Message1="Greetings,"
    Message2="Earthling."

    echo

    printf "Pi to 2 decimal places = %1.2f" $PI
    echo
    printf "Pi to 9 decimal places = %1.9f" $PI  # It even rounds off correctly.

    printf "\n"                                  # Prints a line feed,
                                                 # Equivalent to 'echo' . . .

    printf "Constant = \t%d\n" $DecimalConstant  # Inserts tab (\t).

    printf "%s %s \n" $Message1 $Message2

    echo

    # ==========================================#
    # Simulation of C function, sprintf().
    # Loading a variable with a formatted string.

    echo 

    Pi12=$(printf "%1.12f" $PI)
    echo "Pi to 12 decimal places = $Pi12"      # Roundoff error!

    Msg=`printf "%s %s \n" $Message1 $Message2`
    echo $Msg; echo $Msg

    #  As it happens, the 'sprintf' function can now be accessed
    #+ as a loadable module to Bash,
    #+ but this is not portable.

    exit 0

    Formatting error messages is a useful application of printf

    E_BADDIR=65

    var=nonexistent_directory

    error()
    {
      printf "$@" >&2
      # Formats positional params passed, and sends them to stderr.
      echo
      exit $E_BADDIR
    }

    cd $var || error $"Can't cd to %s." "$var"

    # Thanks, S.C.
```

#### 12.11.1.2.2.1 The printf command

```text
Unlike other documentations, I don't want to redirect you to the manual page for the printf() C function family. However, if you're more experienced, that should be the most detailed description for the format strings and modifiers.

Due to mutual exclusive historical implementations of the echo command, POSIX® recommends to use printf rather than echo.
General

The printf command provides a method to print preformatted text similar to the printf() system interface (C function). It's meant as successor for echo and has far more features and possibilities.

Beside other reasons, POSIX® has a very good argument to recommend it: Both historical main flavours of the echo command are mutual exclusive, they collide. A "new" command had to be invented to solve the issue.
Syntax

printf <FORMAT> <ARGUMENTS...>

The text format is given in <FORMAT>, while all arguments the formatstring may point to are given after that, here, indicated by <ARGUMENTS...>.

Thus, a typical printf-call looks like:

printf "Surname: %s\nName: %s\n" "$SURNAME" "$LASTNAME"

where "Surname: %s\nName: %s\n" is the format specification, and the two variables are passed as arguments, the %s in the formatstring points to (for every format specifier you give, printf awaits one argument!).
Options
-v VAR	If given, the output is assigned to the variable VAR instead of printed to stdout (comparable to sprintf() in some way)

The -v Option can't assign directly to array indexes in Bash versions older than Bash 4.1
Arguments

Of course in shell-meaning the arguments are just strings, however, the common C-notations plus some additions for number-constants are recognized to give a number-argument to printf:
Number-Format	Description
N	A normal decimal number
0N	An octal number
0xN	A hexadecimal number
0XN	A hexadecimal number
"X	(a literal double-quote infront of a character): interpreted as number (underlying codeset) don't forget escaping
'X	(a literal single-quote infront of a character): interpreted as number (underlying codeset) don't forget escaping

If more arguments than format specifiers are present, then the format string is re-used until the last argument is interpreted. If less format specifiers than arguments are present, then number-formats are set to zero, while string-formats are set to null (empty).

Also, to minimize surprises, when printf expects an argument, give it one, not more. I'm talking about shell word splitting, please read this article if you don't know what I mean.

Again, attention: When a numerical format expects a number, the internal printf-command will use the common Bash arithmetic rules regarding the base. A command like the following example will throw an error, since 08 is not a valid octal number (00 to 07!):

printf "%d\n" 08

Format strings

FIXME incomplete

The format string interpretion is derived from the C printf() function family. Only format specifiers that end in one of the letters diouxXfeEgGcs are recognized.

To print a literal % (percent-sign), use %% in the format string.

Again: Every format specifier expects an associated argument provided!
Format	Description
%b	Print the associated argument while interpreting backslash escapes in there
%q	Print the associated argument shell-quoted, reusable as input
%d	Print the associated argument as signed decimal number
%i	Same as %d
%o	Print the associated argument as unsigned octal number
%u	Print the associated argument as unsigned decimal number
%x	Print the associated argument as unsigned hexadecimal number with lower-case hex-digits (a-f)
%X	Same as %x, but with upper-case hex-digits (A-F)
%f	Interpret and print the associated argument as floating point number
%e	Interpret the associated argument as double, and print it in <N>±e<N> format
%E	Same as %e, but with an upper-case E in the printed format
%g	Interprets the associated argument as double, but prints it like %f or %e
%G	Same as %g, but print it like %E
%c	Interprets the associated argument as character: only the first character of a given argument is printed
%s	Interprets the associated argument literally as string
%b	Interprets the associated argument as a string and interpreting escape sequences in it
%q	Prints the associated argument in a format, that it can be re-used as shell-input (escaped spaces etc..)
%n	No conversion or printing is done. Assigns the number of so far printed characters to the variable named in the corresponding argument (similat to C's printf)
%%	No conversion is done. Produces a % (percent sign)

Some of the mentioned format specifiers can modify their behaviour by getting a format modifier:
Modifiers

To be more flexible in the output of numbers and strings, the printf command allows format modifiers. These are specified between the introducting % and the character that specifies the format:

printf "%50s\n" "This field is 50 characters wide..."

Field and printing modifiers
Field output format
<N>	Any number: Specifies a minimum field width, if the text to print is smaller, it's padded with spaces, if the text is bigger, the field is expanded
.	The dot: Together with a field width, the field is not expanded when the text is bigger, the text is cutted instead. "%.s" is an undocumented equivalent for "%.0s", which will force a field width of zero, effectively hiding the field from output
*	The asterisk: the width is given as argument before the string or number. Usage (the "*" corresponds to the "20"): printf "%*s\n" 20 "test string"
#	"Alternative format" for numbers: see table below
-	Left-bound text printing in the field (standard is right-bound)
0	Pads numbers with zeros, not spaces
<space>	Pad a positive number with a space, where a minus (-) is for negative numbers
+	Prints all numbers signed (+ for positive, - for negative)

The "alternative format" modifier #:
Alternative Format
%#o	The octal number is printed with a leading zero, unless it's zero itself
%#x, %#X	The hex number is printed with a leading "0x"/"0X", unless it's zero
%#g, %#G	The float number is printed with trailing zeros until the number of digits for the current precision is reached (usually trailing zeros are not printed)
all number formats except %d, %o, %x, %X	Always print a decimal point in the output, even if no digits follow it
Precision

The precision for a floating- or double-number can be specified by using .<DIGITS>, where <DIGITS> is the number of digits for precision. If <DIGITS> is an asterisk (*), the precision is read from the argument that precedes the number to print, like (prints 4,3000000000):

printf "%.*f\n" 10 4,3

The format .*N to specify the N'th argument for precision does not work in Bash.

For strings, the precision specifies the maximum number of characters to print (i.e. the maximum field width). For integers, it specifies the number of digits to print (zero-padding!).
Escape codes
Code	Description
\\	Prints the character \ (backslash)
\a	Prints the alert character (ASCII code 7 decimal)
\b	Prints a backspace
\f	Prints a form-feed
\n	Prints a newline
\r	Prints a carriage-return
\t	Prints a horizontal tabulator
\v	Prints a vertical tabulator
\"	Prints a '
\?	Prints a ?
\<NNN>	Interprets <NNN> as octal number and prints the corresponding character from the character set
\0<NNN>	same as \<NNN>
\x<NNN>	Interprets <NNN> as hexadecimal number and prints the corresponding character from the character set (3 digits)
\u<NNNN>	same as \x<NNN>, but 4 digits
\U<NNNNNNNN>	same as \x<NNN>, but 8 digits
Examples
Snipplets

    *
      print the decimal representation of a hexadecimal number (preserve the sign)
          o
            printf "%d\n" 0x41
          o
            printf "%d\n" -0x41
          o
            printf "%+d\n" 0x41
    *
      print the octal representation of a decimal number
          o
            printf "%o\n" 65
          o
            printf "%05o\n" 65 (5 characters width, padded with zeros)
    *
      this prints a 0, since no argument is specified
          o
            printf "%d\n"
    *
      print the code number of the character A
          o
            printf "%d\n" \'A
          o
            printf "%d\n" "'A"
    *
      Generate a greeting banner and assign it to the variable GREETER
          o
            printf -v GREETER "Hello %s" "$LOGNAME"
    *
      Print a text at the end of the line, using tput to get the current line width
          o
            printf "%*s\n" $(tput cols) "Hello world!"

Small code table

This small loop prints all numbers from 0 to 127 in

    *
      decimal
    *
      octal
    *
      hex

for ((x=0; x <= 127; x++)); do
  printf '%3d | %04o | 0x%02x\n' "$x" "$x" "$x"
done

Ensure well-formatted MAC address

This code here will take a common MAC address and rewrite it into a well-known format (regarding leading zeros or upper/lowercase of the hex digits, ...):

the_mac="0:13:ce:7:7a:ad"

# lowercase hex digits
the_mac="$(printf "%02x:%02x:%02x:%02x:%02x:%02x" 0x${the_mac//:/ 0x})"

# or the uppercase-digits variant
the_mac="$(printf "%02X:%02X:%02X:%02X:%02X:%02X" 0x${the_mac//:/ 0x})"

Replacement echo

This code was found in Solaris manpage for echo(1).

Solaris version of /usr/bin/echo is equivalent to:

printf "%b\n" "$*"

Solaris /usr/ucb/echo is equivalent to:

if [ "X$1" = "X-n" ]
then
     shift
     printf "%s" "$*"
else
     printf "%s\n" "$*"
fi

prargs Implementation

Working off the replacement echo, here is a terse implementation of prargs:

printf '"%b"\n' "$0" "$@" | nl -v0 -s": "

repeating a character (for example to print a line)

A small trick: Combining printf and parameter expansion to draw a line

length=40
printf -v line '%*s' "$length"
echo ${line// /-}

or:

length=40
eval printf -v line '%.0s-' {1..$length}

See also

    *
      Internal: Code snip: Print a horizontal line uses some printf examples
    *
      External: Greg's BashFAQ 18: How can I use numbers with leading zeros in a loop, e.g. 01, 02?
```

#### 12.11.1.2.3 read

```text
    "Reads" the value of a variable from stdin, that is, interactively fetches input from the keyboard. The -a option lets read get array variables .
```

#### 12.11.1.2.3.1 Example 14-3. Variable assignment, using read

```text
    #!/bin/bash
    # "Reading" variables.

    echo -n "Enter the value of variable 'var1': "
    # The -n option to echo suppresses newline.

    read var1
    # Note no '$' in front of var1, since it is being set.

    echo "var1 = $var1"


    echo

    # A single 'read' statement can set multiple variables.
    echo -n "Enter the values of variables 'var2' and 'var3' "
    echo =n "(separated by a space or tab): "
    read var2 var3
    echo "var2 = $var2      var3 = $var3"
    #  If you input only one value,
    #+ the other variable(s) will remain unset (null).

    exit 0

    A read without an associated variable assigns its input to the dedicated variable $REPLY.
```

#### 12.11.1.2.3.2 Example 14-4. What happens when read has no variable

```text
    #!/bin/bash
    # read-novar.sh

    echo

    # -------------------------- #
    echo -n "Enter a value: "
    read var
    echo "\"var\" = "$var""
    # Everything as expected here.
    # -------------------------- #

    echo

    # ------------------------------------------------------------------- #
    echo -n "Enter another value: "
    read           #  No variable supplied for 'read', therefore...
                   #+ Input to 'read' assigned to default variable, $REPLY.
    var="$REPLY"
    echo "\"var\" = "$var""
    # This is equivalent to the first code block.
    # ------------------------------------------------------------------- #

    echo
    echo "========================="
    echo


    #  This example is similar to the "reply.sh" script.
    #  However, this one shows that $REPLY is available
    #+ even after a 'read' to a variable in the conventional way.


    # ================================================================= #

    #  In some instances, you might wish to discard the first value read.
    #  In such cases, simply ignore the $REPLY variable.

    { # Code block.
    read            # Line 1, to be discarded.
    read line2      # Line 2, saved in variable.
      } <$0
    echo "Line 2 of this script is:"
    echo "$line2"   #   # read-novar.sh
    echo            #   #!/bin/bash  line discarded.

    # See also the soundcard-on.sh script.

    exit 0

    Normally, inputting a \ suppresses a newline during input to a read. The -r option causes an inputted \ to be interpreted literally.
```

#### 12.11.1.2.3.3 Example 14-5. Multi-line input to read

```text
    #!/bin/bash

    echo

    echo "Enter a string terminated by a \\, then press <ENTER>."
    echo "Then, enter a second string (no \\ this time), and again press <ENTER>."

    read var1     # The "\" suppresses the newline, when reading $var1.
                  #     first line \
                  #     second line

    echo "var1 = $var1"
    #     var1 = first line second line

    #  For each line terminated by a "\"
    #+ you get a prompt on the next line to continue feeding characters into var1.

    echo; echo

    echo "Enter another string terminated by a \\ , then press <ENTER>."
    read -r var2  # The -r option causes the "\" to be read literally.
                  #     first line \

    echo "var2 = $var2"
    #     var2 = first line \

    # Data entry terminates with the first <ENTER>.

    echo 

    exit 0

    The read command has some interesting options that permit echoing a prompt and even reading keystrokes without hitting ENTER.
```

#### 12.11.1.2.3.4 #Read a keypress without hitting ENTER.

```text
    read -s -n1 -p "Hit a key " keypress
    echo; echo "Keypress was "\"$keypress\""."

    # -s option means do not echo input.
    # -n N option means accept only N characters of input.
    # -p option means echo the following prompt before reading input.

    # Using these options is tricky, since they need to be in the correct order.

    The -n option to read also allows detection of the arrow keys and certain of the other unusual keys.
```

#### 12.11.1.2.3.5 Example 14-6. Detecting the arrow keys

```text
    #!/bin/bash
    # arrow-detect.sh: Detects the arrow keys, and a few more.
    # Thank you, Sandro Magi, for showing me how.

    # --------------------------------------------
    # Character codes generated by the keypresses.
    arrowup='\[A'
    arrowdown='\[B'
    arrowrt='\[C'
    arrowleft='\[D'
    insert='\[2'
    delete='\[3'
    # --------------------------------------------

    SUCCESS=0
    OTHER=65

    echo -n "Press a key...  "
    # May need to also press ENTER if a key not listed above pressed.
    read -n3 key                      # Read 3 characters.

    echo -n "$key" | grep "$arrowup"  #Check if character code detected.
    if [ "$?" -eq $SUCCESS ]
    then
      echo "Up-arrow key pressed."
      exit $SUCCESS
    fi

    echo -n "$key" | grep "$arrowdown"
    if [ "$?" -eq $SUCCESS ]
    then
      echo "Down-arrow key pressed."
      exit $SUCCESS
    fi

    echo -n "$key" | grep "$arrowrt"
    if [ "$?" -eq $SUCCESS ]
    then
      echo "Right-arrow key pressed."
      exit $SUCCESS
    fi

    echo -n "$key" | grep "$arrowleft"
    if [ "$?" -eq $SUCCESS ]
    then
      echo "Left-arrow key pressed."
      exit $SUCCESS
    fi

    echo -n "$key" | grep "$insert"
    if [ "$?" -eq $SUCCESS ]
    then
      echo "\"Insert\" key pressed."
      exit $SUCCESS
    fi

    echo -n "$key" | grep "$delete"
    if [ "$?" -eq $SUCCESS ]
    then
      echo "\"Delete\" key pressed."
      exit $SUCCESS
    fi


    echo " Some other key pressed."

    exit $OTHER

    # ========================================= #

    #  Mark Alexander came up with a simplified
    #+ version of the above script (Thank you!).
    #  It eliminates the need for grep.

    #!/bin/bash

      uparrow=$'\x1b[A'
      downarrow=$'\x1b[B'
      leftarrow=$'\x1b[D'
      rightarrow=$'\x1b[C'

      read -s -n3 -p "Hit an arrow key: " x

      case "$x" in
      $uparrow)
         echo "You pressed up-arrow"
         ;;
      $downarrow)
         echo "You pressed down-arrow"
         ;;
      $leftarrow)
         echo "You pressed left-arrow"
         ;;
      $rightarrow)
         echo "You pressed right-arrow"
         ;;
      esac

    exit $?

    # ========================================= #

    # Antonio Macchi has a simpler alternative.

    #!/bin/bash

    while true
    do
      read -sn1 a
      test "$a" == `echo -en "\e"` || continue
      read -sn1 a
      test "$a" == "[" || continue
      read -sn1 a
      case "$a" in
        A)  echo "up";;
        B)  echo "down";;
        C)  echo "right";;
        D)  echo "left";;
      esac
    done

    # ========================================= #

    #  Exercise:
    #  --------
    #  1) Add detection of the "Home," "End," "PgUp," and "PgDn" keys.

    Note	

    The -n option to read will not detect the ENTER (newline) key.

    The -t option to read permits timed input (see Example 9-4 and Example A-43).

    The read command may also "read" its variable value from a file redirected to stdin. If the file contains more than one line, only the first line is assigned to the variable. If read has more than one parameter, then each of these variables gets assigned a successive whitespace-delineated string. Caution!
```

#### 12.11.1.2.3.6 Example 14-7. Using read with file redirection, read lines and seperate fields

```text
(bash simple way to read lines of N fields file)

    #!/bin/bash

    read var1 <data-file
    echo "var1 = $var1"
    # var1 set to the entire first line of the input file "data-file"

    read var2 var3 <data-file
    echo "var2 = $var2   var3 = $var3"
    # Note non-intuitive behavior of "read" here.
    # 1) Rewinds back to the beginning of input file.
    # 2) Each variable is now set to a corresponding string,
    #    separated by whitespace, rather than to an entire line of text.
    # 3) The final variable gets the remainder of the line.
    # 4) If there are more variables to be set than whitespace-terminated strings
    #    on the first line of the file, then the excess variables remain empty.

    echo "------------------------------------------------"

    # How to resolve the above problem with a loop:
    while read line
    do
      echo "$line"
    done <data-file
    # Thanks, Heiner Steven for pointing this out.

    echo "------------------------------------------------"

    # Use $IFS (Internal Field Separator variable) to split a line of input to
    # "read", if you do not want the default to be whitespace.

    echo "List of all users:"
    OIFS=$IFS; IFS=:       # /etc/passwd uses ":" for field separator.
    while read name passwd uid gid fullname ignore
    do
      echo "$name ($fullname)"
    done </etc/passwd   # I/O redirection.
    IFS=$OIFS              # Restore original $IFS.
    # This code snippet also by Heiner Steven.



    #  Setting the $IFS variable within the loop itself
    #+ eliminates the need for storing the original $IFS
    #+ in a temporary variable.
    #  Thanks, Dim Segebart, for pointing this out.
    echo "------------------------------------------------"
    echo "List of all users:"

    while IFS=: read name passwd uid gid fullname ignore
    do
      echo "$name ($fullname)"
    done </etc/passwd   # I/O redirection.

    echo
    echo "\$IFS still $IFS"

    exit 0

    Note	

    Piping output to a read, using echo to set variables will fail.

    Yet, piping the output of cat seems to work.

    cat file1 file2 |
    while read line
    do
    echo $line
    done

    However, as Bjön Eriksson shows:
```

#### 12.11.1.2.3.7 Example 14-8. Problems reading from a pipe

```text
    #!/bin/sh
    # readpipe.sh
    # This example contributed by Bjon Eriksson.

    last="(null)"
    cat $0 |
    while read line
    do
        echo "{$line}"
        last=$line
    done
    printf "\nAll done, last:$last\n"

    exit 0  # End of code.
            # (Partial) output of script follows.
            # The 'echo' supplies extra brackets.

    #############################################

    ./readpipe.sh 

    {#!/bin/sh}
    {last="(null)"}
    {cat $0 |}
    {while read line}
    {do}
    {echo "{$line}"}
    {last=$line}
    {done}
    {printf "nAll done, last:$lastn"}


    All done, last:(null)

    The variable (last) is set within the subshell but unset outside.

    The gendiff script, usually found in /usr/bin on many Linux distros, pipes the output of find to a while read construct.

    find $1 \( -name "*$2" -o -name ".*$2" \) -print |
    while read f; do
    . . .

    Tip	

    It is possible to paste text into the input field of a read (but not multiple lines!). See Example A-40.
```

#### 12.11.1.3 Filesystem

#### 12.11.1.3.1 cd

```text
    The familiar cd change directory command finds use in scripts where execution of a command requires being in a specified directory.

    (cd /source/directory && tar cf - . ) | (cd /dest/directory && tar xpvf -)

    [from the previously cited example by Alan Cox]

    The -P (physical) option to cd causes it to ignore symbolic links.

    cd - changes to $OLDPWD, the previous working directory.

    Caution	The cd command does not function as expected when presented with two forward slashes.

    bash$ cd //
    bash$ pwd
    //
    	      

    The output should, of course, be /. This is a problem both from the command line and in a script.
```

#### 12.11.1.3.2 pwd

```text
				Print Working Directory. This gives the user's (or script's) current directory (see Example 14-9). The effect is identical to reading the value of the builtin variable $PWD.
pushd, popd, dirs

    This command set is a mechanism for bookmarking working directories, a means of moving back and forth through directories in an orderly manner. A pushdown stack is used to keep track of directory names. Options allow various manipulations of the directory stack.
```

#### 12.11.1.3.3 Dir stack commands

```text
    pushd dir-name pushes the path dir-name onto the directory stack and simultaneously changes the current working directory to dir-name

    popd removes (pops) the top directory path name off the directory stack and simultaneously changes the current working directory to that directory popped from the stack.

    dirs lists the contents of the directory stack (compare this with the $DIRSTACK variable). A successful pushd or popd will automatically invoke dirs.

    Scripts that require various changes to the current working directory without hard-coding the directory name changes can make good use of these commands. Note that the implicit $DIRSTACK array variable, accessible from within a script, holds the contents of the directory stack.
```

#### 12.11.1.3.4 Example 14-9. Changing the current working directory

```text
    #!/bin/bash

    dir1=/usr/local
    dir2=/var/spool

    pushd $dir1
    # Will do an automatic 'dirs' (list directory stack to stdout).
    echo "Now in directory `pwd`." # Uses back-quoted 'pwd'.

    # Now, do some stuff in directory 'dir1'.
    pushd $dir2
    echo "Now in directory `pwd`."

    # Now, do some stuff in directory 'dir2'.
    echo "The top entry in the DIRSTACK array is $DIRSTACK."
    popd
    echo "Now back in directory `pwd`."

    # Now, do some more stuff in directory 'dir1'.
    popd
    echo "Now back in original working directory `pwd`."

    exit 0

    # What happens if you don't 'popd' -- then exit the script?
    # Which directory do you end up in? Why?
```

#### 12.11.1.4 Variables

#### 12.11.1.4.1 let

```text
    The let command carries out arithmetic operations on variables. In many cases, it functions as a less complex version of expr.
```

#### 12.11.1.4.2 Example 14-10. Letting let do arithmetic.

```text
    #!/bin/bash

    echo

    let a=11            # Same as 'a=11'
    let a=a+5           # Equivalent to  let "a = a + 5"
                        # (Double quotes and spaces make it more readable.)
    echo "11 + 5 = $a"  # 16

    let "a <<= 3"       # Equivalent to  let "a = a << 3"
    echo "\"\$a\" (=16) left-shifted 3 places = $a"
                        # 128

    let "a /= 4"        # Equivalent to  let "a = a / 4"
    echo "128 / 4 = $a" # 32

    let "a -= 5"        # Equivalent to  let "a = a - 5"
    echo "32 - 5 = $a"  # 27

    let "a *=  10"      # Equivalent to  let "a = a * 10"
    echo "27 * 10 = $a" # 270

    let "a %= 8"        # Equivalent to  let "a = a % 8"
    echo "270 modulo 8 = $a  (270 / 8 = 33, remainder $a)"
                        # 6


    # Does "let" permit C-style operators?
    # Yes, just as the (( ... )) double-parentheses construct does.

    let a++             # C-style (post) increment.
    echo "6++ = $a"     # 6++ = 7
    let a--             # C-style decrement.
    echo "7-- = $a"     # 7-- = 6
    # Of course, ++a, etc., also allowed . . .
    echo


    # Trinary operator.

    # Note that $a is 6, see above.
    let "t = a<7?7:11"   # True
    echo $t  # 7

    let a++
    let "t = a<7?7:11"   # False
    echo $t  #     11

    exit

    "
```

#### 12.11.1.4.3 eval

```text
    eval arg1 [arg2] ... [argN]

    Combines the arguments in an expression or list of expressions and evaluates them. Any variables contained within the expression are expanded. The result translates into a command. This can be useful for code generation from the command line or within a script.

    bash$ process=xterm
    bash$ show_process="eval ps ax | grep $process"
    bash$ $show_process
    1867 tty1     S      0:02 xterm
     2779 tty1     S      0:00 xterm
     2886 pts/1    S      0:00 grep xterm
    	      

    Each invocation of eval forces a re-evaluation of its arguments.

    a='$b'
    b='$c'
    c=d

    echo $a             # $b
                        # First level.
    eval echo $a        # $c
                        # Second level.
    eval eval echo $a   # d
                        # Third level.

    # Thank you, E. Choroba.
```

#### 12.11.1.4.4 Example 14-11. Showing the effect of eval

```text
    #!/bin/bash
    # Exercising "eval" ...

    y=`eval ls -l`  #  Similar to y=`ls -l`
    echo $y         #+ but linefeeds removed because "echoed" variable is unquoted.
    echo
    echo "$y"       #  Linefeeds preserved when variable is quoted.

    echo; echo

    y=`eval df`     #  Similar to y=`df`
    echo $y         #+ but linefeeds removed.

    #  When LF's not preserved, it may make it easier to parse output,
    #+ using utilities such as "awk".

    echo
    echo "==========================================================="
    echo


    # Now, showing how to do something useful with "eval" . . .
    # (Thank you, E. Choroba!)

    version=3.4     #  Can we split the version into major and minor
                    #+ part in one command?
    echo "version = $version"
    eval major=${version/./;minor=}     #  Replaces '.' in version by ';minor='
                                        #  The substitution yields '3; minor=4'
                                        #+ so eval does minor=4, major=3
    echo Major: $major, minor: $minor   #  Major: 3, minor: 4
```

#### 12.11.1.4.5 Example 14-12. Echoing the command-line parameters

```text
    #!/bin/bash
    # echo-params.sh

    # Call this script with a few command line parameters.
    # For example:
    #     sh echo-params.sh first second third fourth fifth

    params=$#              # Number of command-line parameters.
    param=1                # Start at first command-line param.

    while [ "$param" -le "$params" ]
    do
      echo -n "Command line parameter "
      echo -n \$$param     #  Gives only the *name* of variable.
    #         ^^^          #  $1, $2, $3, etc.
                           #  Why?
                           #  \$ escapes the first "$"
                           #+ so it echoes literally,
                           #+ and $param dereferences "$param" . . .
                           #+ . . . as expected.
      echo -n " = "
      eval echo \$$param   #  Gives the *value* of variable.
    # ^^^^      ^^^        #  The "eval" forces the *evaluation*
                           #+ of \$$
                           #+ as an indirect variable reference.

    (( param ++ ))         # On to the next.
    done

    exit $?

    # =================================================

    $ sh echo-params.sh first second third fourth fifth
    Command line parameter $1 = first
    Command line parameter $2 = second
    Command line parameter $3 = third
    Command line parameter $4 = fourth
    Command line parameter $5 = fifth
```

#### 12.11.1.4.6 Example 14-13. Forcing a log-off

```text
    #!/bin/bash
    # Killing ppp to force a log-off.

    # Script should be run as root user.

    killppp="eval kill -9 `ps ax | awk '/ppp/ { print $1 }'`"
    #                     -------- process ID of ppp -------  

    $killppp                  # This variable is now a command.


    # The following operations must be done as root user.

    chmod 666 /dev/ttyS3      # Restore read+write permissions, or else what?
    #  Since doing a SIGKILL on ppp changed the permissions on the serial port,
    #+ we restore permissions to previous state.

    rm /var/lock/LCK..ttyS3   # Remove the serial port lock file. Why?

    #  Note:
    #  Depending on the hardware and even the kernel version,
    #+ the modem port on your machine may be different --
    #+ /dev/ttyS1 or /dev/ttyS2.

    exit 0

    # Exercises:
    # ---------
    # 1) Have script check whether root user is invoking it.
    # 2) Do a check on whether the process to be killed
    #+   is actually running before attempting to kill it.   
    # 3) Write an alternate version of this script based on 'fuser':
    #+      if [ fuser -s /dev/modem ]; then . . .
```

#### 12.11.1.4.7 Example 14-14. A version of rot13

```text
    #!/bin/bash
    # A version of "rot13" using 'eval'.
    # Compare to "rot13.sh" example.

    setvar_rot_13()              # "rot13" scrambling
    {
      local varname=$1 varvalue=$2
      eval $varname='$(echo "$varvalue" | tr a-z n-za-m)'
    }


    setvar_rot_13 var "foobar"   # Run "foobar" through rot13.
    echo $var                    # sbbone

    setvar_rot_13 var "$var"     # Run "sbbone" through rot13.
                                 # Back to original variable.
    echo $var                    # foobar

    # This example by Stephane Chazelas.
    # Modified by document author.

    exit 0

    Rory Winston contributed the following instance of how useful eval can be.
```

#### 12.11.1.4.8 Example 14-15. Using eval to force variable substitution in a Perl script

```text
    In the Perl script "test.pl":
            ...		
            my $WEBROOT = <WEBROOT_PATH>;
            ...

    To force variable substitution try:
            $export WEBROOT_PATH=/usr/local/webroot
            $sed 's/<WEBROOT_PATH>/$WEBROOT_PATH/' < test.pl > out

    But this just gives:
            my $WEBROOT = $WEBROOT_PATH;

    However:
            $export WEBROOT_PATH=/usr/local/webroot
            $eval sed 's%\<WEBROOT_PATH\>%$WEBROOT_PATH%' < test.pl > out
    #        ====

    That works fine, and gives the expected substitution:
            my $WEBROOT = /usr/local/webroot;


    ### Correction applied to original example by Paulo Marcel Coelho Aragao.

    The eval command occurs in the older version of indirect referencing.

    eval var=\$$var

    Caution	The eval command can be risky, and normally should be avoided when there exists a reasonable alternative. An eval $COMMANDS executes the contents of COMMANDS, which may contain such unpleasant surprises as rm -rf *. Running an eval on unfamiliar code written by persons unknown is living dangerously.
```

#### 12.11.1.4.9 set

```text
    The set command changes the value of internal script variables/options. One use for this is to toggle option flags which help determine the behavior of the script. Another application for it is to reset the positional parameters that a script sees as the result of a command (set `command`). The script can then parse the fields of the command output.
```

#### 12.11.1.4.10 Example 14-16. Using set with positional parameters

```text
    #!/bin/bash

    # script "set-test"

    # Invoke this script with three command line parameters,
    # for example, "./set-test one two three".

    echo
    echo "Positional parameters before  set \`uname -a\` :"
    echo "Command-line argument #1 = $1"
    echo "Command-line argument #2 = $2"
    echo "Command-line argument #3 = $3"


    set `uname -a` # Sets the positional parameters to the output
                   # of the command `uname -a`

    echo $_        # unknown
    # Flags set in script.

    echo "Positional parameters after  set \`uname -a\` :"
    # $1, $2, $3, etc. reinitialized to result of `uname -a`
    echo "Field #1 of 'uname -a' = $1"
    echo "Field #2 of 'uname -a' = $2"
    echo "Field #3 of 'uname -a' = $3"
    echo ---
    echo $_        # ---
    echo

    exit 0

    More fun with positional parameters.
```

#### 12.11.1.4.11 Example 14-17. Reversing the positional parameters

```text
    #!/bin/bash
    # revposparams.sh: Reverse positional parameters.
    # Script by Dan Jacobson, with stylistic revisions by document author.


    set a\ b c d\ e;
    #     ^      ^     Spaces escaped 
    #       ^ ^        Spaces not escaped
    OIFS=$IFS; IFS=:;
    #              ^   Saving old IFS and setting new one.

    echo

    until [ $# -eq 0 ]
    do          #      Step through positional parameters.
      echo "### k0 = "$k""     # Before
      k=$1:$k;  #      Append each pos param to loop variable.
    #     ^
      echo "### k = "$k""      # After
      echo
      shift;
    done

    set $k  #  Set new positional parameters.
    echo -
    echo $# #  Count of positional parameters.
    echo -
    echo

    for i   #  Omitting the "in list" sets the variable -- i --
            #+ to the positional parameters.
    do
      echo $i  # Display new positional parameters.
    done

    IFS=$OIFS  # Restore IFS.

    #  Question:
    #  Is it necessary to set an new IFS, internal field separator,
    #+ in order for this script to work properly?
    #  What happens if you don't? Try it.
    #  And, why use the new IFS -- a colon -- in line 17,
    #+ to append to the loop variable?
    #  What is the purpose of this?

    exit 0

    $ ./revposparams.sh

    ### k0 = 
    ### k = a b

    ### k0 = a b
    ### k = c a b

    ### k0 = c a b
    ### k = d e c a b

    -
    3
    -

    d e
    c
    a b

    Invoking set without any options or arguments simply lists all the environmental and other variables that have been initialized.

    bash$ set
    AUTHORCOPY=/home/bozo/posts
     BASH=/bin/bash
     BASH_VERSION=$'2.05.8(1)-release'
     ...
     XAUTHORITY=/home/bozo/.Xauthority
     _=/etc/bashrc
     variable22=abc
     variable23=xzy
    	      

    Using set with the -- option explicitly assigns the contents of a variable to the positional parameters. If no variable follows the -- it unsets the positional parameters.
```

#### 12.11.1.4.12 Example 14-18. Reassigning the positional parameters

```text
    #!/bin/bash

    variable="one two three four five"

    set -- $variable
    # Sets positional parameters to the contents of "$variable".

    first_param=$1
    second_param=$2
    shift; shift        # Shift past first two positional params.
    # shift 2             also works.
    remaining_params="$*"

    echo
    echo "first parameter = $first_param"             # one
    echo "second parameter = $second_param"           # two
    echo "remaining parameters = $remaining_params"   # three four five

    echo; echo

    # Again.
    set -- $variable
    first_param=$1
    second_param=$2
    echo "first parameter = $first_param"             # one
    echo "second parameter = $second_param"           # two

    # ======================================================

    set --
    # Unsets positional parameters if no variable specified.

    first_param=$1
    second_param=$2
    echo "first parameter = $first_param"             # (null value)
    echo "second parameter = $second_param"           # (null value)

    exit 0

    See also Example 10-2 and Example 15-56.
```

#### 12.11.1.4.13 unset

```text
    The unset command deletes a shell variable, effectively setting it to null. Note that this command does not affect positional parameters.

    bash$ unset PATH

    bash$ echo $PATH


    bash$ 
```

#### 12.11.1.4.14 Example 14-19. "Unsetting" a variable

```text
    #!/bin/bash
    # unset.sh: Unsetting a variable.

    variable=hello                       # Initialized.
    echo "variable = $variable"

    unset variable                       # Unset.
                                         # Same effect as:  variable=
    echo "(unset) variable = $variable"  # $variable is null.

    if [ -z "$variable" ]                # Try a string-length test.
    then
      echo "\$variable has zero length."
    fi

    exit 0
```

#### 12.11.1.4.15 export

```text
    The export [2] command makes available variables to all child processes of the running script or shell. One important use of the export command is in startup files, to initialize and make accessible environmental variables to subsequent user processes.

    Caution	Unfortunately, there is no way to export variables back to the parent process, to the process that called or invoked the script or shell.

				12.11.1.4.16 Example 14-20. Using export to pass a variable to an embedded awk script

    #!/bin/bash

    #  Yet another version of the "column totaler" script (col-totaler.sh)
    #+ that adds up a specified column (of numbers) in the target file.
    #  This uses the environment to pass a script variable to 'awk' . . .
    #+ and places the awk script in a variable.


    ARGS=2
    E_WRONGARGS=65

    if [ $# -ne "$ARGS" ] # Check for proper no. of command line args.
    then
       echo "Usage: `basename $0` filename column-number"
       exit $E_WRONGARGS
    fi

    filename=$1
    column_number=$2

    #===== Same as original script, up to this point =====#

    export column_number
    # Export column number to environment, so it's available for retrieval.


    # -----------------------------------------------
    awkscript='{ total += $ENVIRON["column_number"] }
    END { print total }'
    # Yes, a variable can hold an awk script.
    # -----------------------------------------------

    # Now, run the awk script.
    awk "$awkscript" "$filename"

    # Thanks, Stephane Chazelas.

    exit 0

    Tip	It is possible to initialize and export variables in the same operation, as in export var1=xxx.

    However, as Greg Keraunen points out, in certain situations this may have a different effect than setting a variable, then exporting it.

    bash$ export var=(a b); echo ${var[0]}
    (a b)



    bash$ var=(a b); export var; echo ${var[0]}
    a
```

#### 12.11.1.4.17 declare, typeset

```text
    The declare and typeset commands specify and/or restrict properties of variables.
readonly

    Same as declare -r, sets a variable as read-only, or, in effect, as a constant. Attempts to change the variable fail with an error message. This is the shell analog of the C language const type qualifier.
getopts

    This powerful tool parses command-line arguments passed to the script. This is the Bash analog of the getopt external command and the getopt library function familiar to C programmers. It permits passing and concatenating multiple options [3] and associated arguments to a script (for example scriptname -abc -e /usr/local).

    The getopts construct uses two implicit variables. $OPTIND is the argument pointer (OPTion INDex) and $OPTARG (OPTion ARGument) the (optional) argument attached to an option. A colon following the option name in the declaration tags that option as having an associated argument.

    A getopts construct usually comes packaged in a while loop, which processes the options and arguments one at a time, then increments the implicit $OPTIND variable to step to the next.

    Note	

       a.

          The arguments passed from the command line to the script must be preceded by a minus (-). It is the prefixed - that lets getopts recognize command-line arguments as options. In fact, getopts will not process arguments without the prefixed -, and will terminate option processing at the first argument encountered lacking them.
       b.

          The getopts template differs slightly from the standard while loop, in that it lacks condition brackets.
       c.

          The getopts construct is a highly functional replacement for the traditional getopt external command.

    while getopts ":abcde:fg" Option
    # Initial declaration.
    # a, b, c, d, e, f, and g are the options (flags) expected.
    # The : after option 'e' shows it will have an argument passed with it.
    do
      case $Option in
        a ) # Do something with variable 'a'.
        b ) # Do something with variable 'b'.
        ...
        e)  # Do something with 'e', and also with $OPTARG,
            # which is the associated argument passed with option 'e'.
        ...
        g ) # Do something with variable 'g'.
      esac
    done
    shift $(($OPTIND - 1))
    # Move argument pointer to next.

    # All this is not nearly as complicated as it looks <grin>.
```

#### 12.11.1.4.18 Example 14-21. Using getopts to read the options/arguments passed to a script

```text
    #!/bin/bash
    # Exercising getopts and OPTIND
    # Script modified 10/09/03 at the suggestion of Bill Gradwohl.


    # Here we observe how 'getopts' processes command line arguments to script.
    # The arguments are parsed as "options" (flags) and associated arguments.

    # Try invoking this script with
    # 'scriptname -mn'
    # 'scriptname -oq qOption' (qOption can be some arbitrary string.)
    # 'scriptname -qXXX -r'
    #
    # 'scriptname -qr'    - Unexpected result, takes "r" as the argument to option "q"
    # 'scriptname -q -r'  - Unexpected result, same as above
    # 'scriptname -mnop -mnop'  - Unexpected result
    # (OPTIND is unreliable at stating where an option came from).
    #
    #  If an option expects an argument ("flag:"), then it will grab
    #+ whatever is next on the command line.

    NO_ARGS=0 
    E_OPTERROR=65

    if [ $# -eq "$NO_ARGS" ]  # Script invoked with no command-line args?
    then
      echo "Usage: `basename $0` options (-mnopqrs)"
      exit $E_OPTERROR        # Exit and explain usage, if no argument(s) given.
    fi  
    # Usage: scriptname -options
    # Note: dash (-) necessary


    while getopts ":mnopq:rs" Option
    do
      case $Option in
        m     ) echo "Scenario #1: option -m-   [OPTIND=${OPTIND}]";;
        n | o ) echo "Scenario #2: option -$Option-   [OPTIND=${OPTIND}]";;
        p     ) echo "Scenario #3: option -p-   [OPTIND=${OPTIND}]";;
        q     ) echo "Scenario #4: option -q-\
     with argument \"$OPTARG\"   [OPTIND=${OPTIND}]";;
        #  Note that option 'q' must have an associated argument,
        #+ otherwise it falls through to the default.
        r | s ) echo "Scenario #5: option -$Option-";;
        *     ) echo "Unimplemented option chosen.";;   # DEFAULT
      esac
    done

    shift $(($OPTIND - 1))
    #  Decrements the argument pointer so it points to next argument.
    #  $1 now references the first non option item supplied on the command line
    #+ if one exists.

    exit 0

    #   As Bill Gradwohl states,
    #  "The getopts mechanism allows one to specify:  scriptname -mnop -mnop
    #+  but there is no reliable way to differentiate what came from where
    #+  by using OPTIND."
```

#### 12.11.1.4.19 Script Behavior

#### 12.11.1.4.19.1 source, . (dot command)

```text
    This command, when invoked from the command line, executes a script. Within a script, a source file-name loads the file file-name. Sourcing a file (dot-command) imports code into the script, appending to the script (same effect as the #include directive in a C program). The net result is the same as if the "sourced" lines of code were physically present in the body of the script. This is useful in situations when multiple scripts use a common data file or function library.

    Example 14-22. "Including" a data file

    #!/bin/bash

    . data-file    # Load a data file.
    # Same effect as "source data-file", but more portable.

    #  The file "data-file" must be present in current working directory,
    #+ since it is referred to by its 'basename'.

    # Now, reference some data from that file.

    echo "variable1 (from data-file) = $variable1"
    echo "variable3 (from data-file) = $variable3"

    let "sum = $variable2 + $variable4"
    echo "Sum of variable2 + variable4 (from data-file) = $sum"
    echo "message1 (from data-file) is \"$message1\""
    # Note:                            escaped quotes

    print_message This is the message-print function in the data-file.


    exit 0

    File data-file for Example 14-22, above. Must be present in same directory.

    # This is a data file loaded by a script.
    # Files of this type may contain variables, functions, etc.
    # It may be loaded with a 'source' or '.' command by a shell script.

    # Let's initialize some variables.

    variable1=22
    variable2=474
    variable3=5
    variable4=97

    message1="Hello, how are you?"
    message2="Enough for now. Goodbye."

    print_message ()
    {
    # Echoes any message passed to it.

      if [ -z "$1" ]
      then
        return 1
        # Error, if argument missing.
      fi

      echo

      until [ -z "$1" ]
      do
        # Step through arguments passed to function.
        echo -n "$1"
        # Echo args one at a time, suppressing line feeds.
        echo -n " "
        # Insert spaces between words.
        shift
        # Next one.
      done  

      echo

      return 0
    }  

    If the sourced file is itself an executable script, then it will run, then return control to the script that called it. A sourced executable script may use a return for this purpose.

    Arguments may be (optionally) passed to the sourced file as positional parameters.

    source $filename $arg1 arg2

    It is even possible for a script to source itself, though this does not seem to have any practical applications.

    Example 14-23. A (useless) script that sources itself

    #!/bin/bash
    # self-source.sh: a script sourcing itself "recursively."
    # From "Stupid Script Tricks," Volume II.

    MAXPASSCNT=100    # Maximum number of execution passes.

    echo -n  "$pass_count  "
    #  At first execution pass, this just echoes two blank spaces,
    #+ since $pass_count still uninitialized.

    let "pass_count += 1"
    #  Assumes the uninitialized variable $pass_count
    #+ can be incremented the first time around.
    #  This works with Bash and pdksh, but
    #+ it relies on non-portable (and possibly dangerous) behavior.
    #  Better would be to initialize $pass_count to 0 before incrementing.

    while [ "$pass_count" -le $MAXPASSCNT ]
    do
      . $0   # Script "sources" itself, rather than calling itself.
             # ./$0 (which would be true recursion) doesn't work here. Why?
    done  

    #  What occurs here is not actually recursion,
    #+ since the script effectively "expands" itself, i.e.,
    #+ generates a new section of code
    #+ with each pass through the 'while' loop',
    #  with each 'source' in line 20.
    #
    #  Of course, the script interprets each newly 'sourced' "#!" line
    #+ as a comment, and not as the start of a new script.

    echo

    exit 0   # The net effect is counting from 1 to 100.
             # Very impressive.

    # Exercise:
    # --------
    # Write a script that uses this trick to actually do something useful.

exit

    Unconditionally terminates a script. [4] The exit command may optionally take an integer argument, which is returned to the shell as the exit status of the script. It is good practice to end all but the simplest scripts with an exit 0, indicating a successful run.

    Note	If a script terminates with an exit lacking an argument, the exit status of the script is the exit status of the last command executed in the script, not counting the exit. This is equivalent to an exit $?.

    Note	An exit command may also be used to terminate a subshell.
```

#### 12.11.1.4.19.2 exec

```text
    This shell builtin replaces the current process with a specified command. Normally, when the shell encounters a command, it forks off a child process to actually execute the command. Using the exec builtin, the shell does not fork, and the command exec'ed replaces the shell. When used in a script, therefore, it forces an exit from the script when the exec'ed command terminates. [5]

    Example 14-24. Effects of exec

    #!/bin/bash

    exec echo "Exiting \"$0\"."   # Exit from script here.

    # ----------------------------------
    # The following lines never execute.

    echo "This echo will never echo."

    exit 99                       #  This script will not exit here.
                                  #  Check exit value after script terminates
                                  #+ with an 'echo $?'.
                                  #  It will *not* be 99.

    Example 14-25. A script that exec's itself

    #!/bin/bash
    # self-exec.sh

    echo

    echo "This line appears ONCE in the script, yet it keeps echoing."
    echo "The PID of this instance of the script is still $$."
    #     Demonstrates that a subshell is not forked off.

    echo "==================== Hit Ctl-C to exit ===================="

    sleep 1

    exec $0   #  Spawns another instance of this same script
              #+ that replaces the previous one.

    echo "This line will never echo!"  # Why not?

    exit 99                            # Will not exit here!
                                       # Exit code will not be 99!

    An exec also serves to reassign file descriptors. For example, exec <zzz-file replaces stdin with the file zzz-file.

    Note	

    The -exec option to find is not the same as the exec shell builtin.
shopt

    This command permits changing shell options on the fly (see Example 24-1 and Example 24-2). It often appears in the Bash startup files, but also has its uses in scripts. Needs version 2 or later of Bash.
```

#### 12.11.1.4.19.3 shopt -s cdspell

```text
    # Allows minor misspelling of directory names with 'cd'

    cd /hpme  # Oops! Mistyped '/home'.
    pwd       # /home
              # The shell corrected the misspelling.
```

#### 12.11.1.4.19.4 caller

```text
    Putting a caller command inside a function echoes to stdout information about the caller of that function.

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

Commands

true

    A command that returns a successful (zero) exit status, but does nothing else.

    bash$ true
    bash$ echo $?
    0
    	      

    # Endless loop
    while true   # alias for ":"
    do
       operation-1
       operation-2
       ...
       operation-n
       # Need a way to break out of loop or script will hang.
    done

false

    A command that returns an unsuccessful exit status, but does nothing else.

    bash$ false
    bash$ echo $?
    1
    	      

    # Testing "false" 
    if false
    then
      echo "false evaluates \"true\""
    else
      echo "false evaluates \"false\""
    fi
    # false evaluates "false"


    # Looping while "false" (null loop)
    while false
    do
       # The following code will not execute.
       operation-1
       operation-2
       ...
       operation-n
       # Nothing happens!
    done   
```

#### 12.11.1.4.19.5 type [cmd]

```text
    Similar to the which external command, type cmd identifies "cmd." Unlike which, type is a Bash builtin. The useful -a option to type identifies keywords and builtins, and also locates system commands with identical names.

    bash$ type '['
    [ is a shell builtin
    bash$ type -a '['
    [ is a shell builtin
     [ is /usr/bin/[


    bash$ type type
    type is a shell builtin
```

#### 12.11.1.4.19.6 hash [cmds]

```text
    Record the path name of specified commands -- in the shell hash table [6] -- so the shell or script will not need to search the $PATH on subsequent calls to those commands. When hash is called with no arguments, it simply lists the commands that have been hashed. The -r option resets the hash table.
bind

    The bind builtin displays or modifies readline [7] key bindings.
```

#### 12.11.1.4.19.7 help

```text
    Gets a short usage summary of a shell builtin. This is the counterpart to whatis, but for builtins.

    bash$ help exit
    exit: exit [n]
        Exit the shell with a status of N.  If N is omitted, the exit status
        is that of the last command executed.
```

#### 12.11.1.5 Job Control Commands

```text
Certain of the following job control commands take a job identifier as an argument. See the table at end of the chapter.
```

#### 12.11.1.5.1 jobs

```text
    Lists the jobs running in the background, giving the job number. Not as useful as ps.

    Note	It is all too easy to confuse jobs and processes. Certain builtins, such as kill, disown, and wait accept either a job number or a process number as an argument. The fg, bg and jobs commands accept only a job number.

    bash$ sleep 100 &
    [1] 1384

    bash $ jobs
    [1]+  Running                 sleep 100 &

    "1" is the job number (jobs are maintained by the current shell). "1384" is the PID or process ID number (processes are maintained by the system). To kill this job/process, either a kill %1 or a kill 1384 works.

    Thanks, S.C.
```

#### 12.11.1.5.2 disown

```text
    Remove job(s) from the shell's table of active jobs.
```

#### 12.11.1.5.3 fg, bg

```text
    The fg command switches a job running in the background into the foreground. The bg command restarts a suspended job, and runs it in the background. If no job number is specified, then the fg or bg command acts upon the currently running job.
wait

    Suspend script execution until all jobs running in background have terminated, or until the job number or process ID specified as an option terminates. Returns the exit status of waited-for command.

    You may use the wait command to prevent a script from exiting before a background job finishes executing (this would create a dreaded orphan process).
```

#### 12.11.1.5.4 Example 14-26. Waiting for a process to finish before proceeding

```text
    #!/bin/bash

    ROOT_UID=0   # Only users with $UID 0 have root privileges.
    E_NOTROOT=65
    E_NOPARAMS=66

    if [ "$UID" -ne "$ROOT_UID" ]
    then
      echo "Must be root to run this script."
      # "Run along kid, it's past your bedtime."
      exit $E_NOTROOT
    fi  

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` find-string"
      exit $E_NOPARAMS
    fi


    echo "Updating 'locate' database..."
    echo "This may take a while."
    updatedb /usr &     # Must be run as root.

    wait
    # Don't run the rest of the script until 'updatedb' finished.
    # You want the the database updated before looking up the file name.

    locate $1

    #  Without the 'wait' command, in the worse case scenario,
    #+ the script would exit while 'updatedb' was still running,
    #+ leaving it as an orphan process.

    exit 0

    Optionally, wait can take a job identifier as an argument, for example, wait%1 or wait $PPID. See the job id table.

    Tip	Within a script, running a command in the background with an ampersand (&) may cause the script to hang until ENTER is hit. This seems to occur with commands that write to stdout. It can be a major annoyance.

    #!/bin/bash
    # test.sh		  

    ls -l &
    echo "Done."

    bash$ ./test.sh
    Done.
     [bozo@localhost test-scripts]$ total 1
     -rwxr-xr-x    1 bozo     bozo           34 Oct 11 15:09 test.sh
     _
                   

            As Walter Brameld IV explains it:

            As far as I can tell, such scripts don't actually hang. It just
            seems that they do because the background command writes text to
            the console after the prompt. The user gets the impression that
            the prompt was never displayed. Here's the sequence of events:

|            1. Script launches background command.
|            2. Script exits.
|            3. Shell displays the prompt.
|            4. Background command continues running and writing text to the
|               console.
|            5. Background command finishes.
|            6. User doesn't see a prompt at the bottom of the output, thinks script
               is hanging.

    Placing a wait after the background command seems to remedy this.

    #!/bin/bash
    # test.sh		  

    ls -l &
    echo "Done."
    wait

    bash$ ./test.sh
    Done.
     [bozo@localhost test-scripts]$ total 1
     -rwxr-xr-x    1 bozo     bozo           34 Oct 11 15:09 test.sh
                   

    Redirecting the output of the command to a file or even to /dev/null also takes care of this problem. 
suspend

    This has a similar effect to Control-Z, but it suspends the shell (the shell's parent process should resume it at an appropriate time).
logout
```

#### 12.11.1.5.5 Exit

```text
				a login shell, optionally specifying an exit status.
```

#### 12.11.1.5.6 times

```text
    Gives statistics on the system time elapsed when executing commands, in the following form:

    0m0.020s 0m0.020s

    This capability is of relatively limited value, since it is not common to profile and benchmark shell scripts.
```

#### 12.11.1.5.7 kill

```text
    Forcibly terminate a process by sending it an appropriate terminate signal (see Example 16-6).

    Example 14-27. A script that kills itself

    #!/bin/bash
    # self-destruct.sh

    kill $$  # Script kills its own process here.
             # Recall that "$$" is the script's PID.

    echo "This line will not echo."
    # Instead, the shell sends a "Terminated" message to stdout.

    exit 0   # Normal exit? No!

    #  After this script terminates prematurely,
    #+ what exit status does it return?
    #
    # sh self-destruct.sh
    # echo $?
    # 143
    #
    # 143 = 128 + 15
    #             TERM signal

    Note	kill -l lists all the signals (as does the file /usr/include/asm/signal.h). A kill -9 is a sure kill, which will usually terminate a process that stubbornly refuses to die with a plain kill. Sometimes, a kill -15 works. A zombie process, that is, a child process that has terminated, but that the parent process has not (yet) killed, cannot be killed by a logged-on user -- you can't kill something that is already dead -- but init will generally clean it up sooner or later.
```

#### 12.11.1.5.8 killall

```text
    The killall command kills a running process by name, rather than by process ID. If there are multiple instances of a particular command running, then doing a killall on that command will terminate them all.

    Note	This refers to the killall command in /usr/bin, not the killall script in /etc/rc.d/init.d.
```

#### 12.11.1.5.9 command

```text
    The command directive disables aliases and functions for the command immediately following it.

    bash$ command ls
                  

    Note	This is one of three shell directives that effect script command processing. The others are builtin and enable.
```

#### 12.11.1.5.10 builtin

```text
    Invoking builtin BUILTIN_COMMAND runs the command BUILTIN_COMMAND as a shell builtin, temporarily disabling both functions and external system commands with the same name.
```

#### 12.11.1.5.11 enable

```text
    This either enables or disables a shell builtin command. As an example, enable -n kill disables the shell builtin kill, so that when Bash subsequently encounters kill, it invokes the external command /bin/kill.

    The -a option to enable lists all the shell builtins, indicating whether or not they are enabled. The -f filename option lets enable load a builtin as a shared library (DLL) module from a properly compiled object file. [1]. 
```

#### 12.11.1.5.12 autoload

```text
    This is a port to Bash of the ksh autoloader. With autoload in place, a function with an autoload declaration will load from an external file at its first invocation. [2] This saves system resources.

    Note that autoload is not a part of the core Bash installation. It needs to be loaded in with enable -f (see above).

Table 14-1. Job identifiers
Notation	Meaning
%N	Job number [N]
%S	Invocation (command line) of job begins with string S
%?S	Invocation (command line) of job contains within it string S
%%	"current" job (last job stopped in foreground or started in background)
%+	"current" job (last job stopped in foreground or started in background)
%-	Last job
$!	Last background process
```
