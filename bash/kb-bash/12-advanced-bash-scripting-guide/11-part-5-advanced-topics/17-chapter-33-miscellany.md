---
type: reference
title: Chapter 33. Miscellany
description: Subsection 12.12.17 of Part 5. Advanced Topics.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.17"
---

# 12.12.17 Chapter 33. Miscellany

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

#### 12.12.17.1 Interactive and non-interactive shells and scripts

```text
An interactive shell reads commands from user input on a tty. Among other things, such a shell reads startup files on activation, displays a prompt, and enables job control by default. The user can interact with the shell.

A shell running a script is always a non-interactive shell. All the same, the script can still access its tty. It is even possible to emulate an interactive shell in a script.

#!/bin/bash
MY_PROMPT='$ '
while :
do
  echo -n "$MY_PROMPT"
  read line
  eval "$line"
  done

exit 0

#'
# This example script, and much of the above explanation supplied by
# Stéphane Chazelas (thanks again).

Let us consider an interactive script to be one that requires input from the user, usually with read statements (see Example 14-3). "Real life" is actually a bit messier than that. For now, assume an interactive script is bound to a tty, a script that a user has invoked from the console or an xterm.

Init and startup scripts are necessarily non-interactive, since they must run without human intervention. Many administrative and system maintenance scripts are likewise non-interactive. Unvarying repetitive tasks cry out for automation by non-interactive scripts.

Non-interactive scripts can run in the background, but interactive ones hang, waiting for input that never comes. Handle that difficulty by having an expect script or embedded here document feed input to an interactive script running as a background job. In the simplest case, redirect a file to supply input to a read statement (read variable <file). These particular workarounds make possible general purpose scripts that run in either interactive or non-interactive modes.

If a script needs to test whether it is running in an interactive shell, it is simply a matter of finding whether the prompt variable, $PS1 is set. (If the user is being prompted for input, then the script needs to display a prompt.)

if [ -z $PS1 ] # no prompt?
then
  # non-interactive
  ...
else
  # interactive
  ...
fi

Alternatively, the script can test for the presence of option "i" in the $- flag.

case $- in
*i*)    # interactive shell
;;
*)      # non-interactive shell
;;
# (Courtesy of "UNIX F.A.Q.," 1993)

Note	Scripts may be forced to run in interactive mode with the -i option or with a #!/bin/bash -i header. Be aware that this can cause erratic script behavior or show error messages even when no error is present.
```

#### 12.12.17.2 Operator Precedence

```text
 In a script, operations execute in order of precedence: the higher precedence operations execute before the lower precedence ones. [1]

Table 33-1. Operator Precedence
Operator	Meaning	Comments
	 	HIGHEST PRECEDENCE
var++ var--	post-increment, post-decrement	C-style operators
++var --var	pre-increment, pre-decrement	 
 	 	 
! ~	negation	logical / bitwise, inverts sense of following operator
 	 	 
**	exponentiation	arithmetic operation
* / %	multiplication, division, modulo	arithmetic operation
+ -	addition, subtraction	arithmetic operation
 	 	 
<< >>	left, right shift	bitwise
 	 	 
-z -n	unary comparison	string is/is-not null
-e -f -t -x, etc.	unary comparison	file-test
< -lt > -gt <= -le >= -ge	compound comparison	string and integer
-nt -ot -ef	compound comparison	file-test
== -eq != -ne	equality / inequality	test operators, string and integer
 	 	 
&	AND	bitwise
^	XOR	exclusive OR, bitwise
|	OR	bitwise
 	 	 
&& -a	AND	logical, compound comparison
|| -o	OR	logical, compound comparison
 	 	 
?:	trinary operator	C-style
=	assignment	(do not confuse with equality test)
*= /= %= += -= <<= >>= &=	combination assignment	times-equal, divide-equal, mod-equal, etc.
 	 	 
,	comma	links a sequence of operations
	 	LOWEST PRECEDENCE

In practice, all you really need to remember is the following:

    * The "My Dear Aunt Sally" mantra (multiply, divide, add, subtract) for the familiar arithmetic operations.
    * The compound logical operators, &&, ||, -a, and -o have low precedence.
    * The order of evaluation of equal-precedence operators is usually left-to-right.

Now, let's utilize our knowledge of operator precedence to analyze a couple of lines from the /etc/init.d/functions file, as found in the Fedora Core Linux distro.

while [ -n "$remaining" -a "$retry" -gt 0 ]; do

# This looks rather daunting at first glance.


# Separate the conditions:
while [ -n "$remaining" -a "$retry" -gt 0 ]; do
#       --condition 1-- ^^ --condition 2-

#  If variable "$remaining" is not zero length
#+      AND (-a)
#+ variable "$retry" is greater-than zero
#+ then
#+ the [ expresion-within-condition-brackets ] returns success (0)
#+ and the while-loop executes an iteration.
#  ==============================================================
#  Evaluate "condition 1" and "condition 2" ***before***
#+ ANDing them. Why? Because the AND (-a) has a lower precedence
#+ than the -n and -gt operators,
#+ and therefore gets evaluated *last*.

#################################################################

if [ -f /etc/sysconfig/i18n -a -z "${NOLOCALE:-}" ] ; then


# Again, separate the conditions:
if [ -f /etc/sysconfig/i18n -a -z "${NOLOCALE:-}" ] ; then
#    --condition 1--------- ^^ --condition 2-----

#  If file "/etc/sysconfig/i18n" exists
#+      AND (-a)
#+ variable $NOLOCALE is zero length
#+ then
#+ the [ test-expresion-within-condition-brackets ] returns success (0)
#+ and the commands following execute.
#
#  As before, the AND (-a) gets evaluated *last*
#+ because it has the lowest precedence of the operators within
#+ the test brackets.
#  ==============================================================
#  Note:
#  ${NOLOCALE:-} is a parameter expansion that seems redundant.
#  But, if $NOLOCALE has not been declared, it gets set to *null*,
#+ in effect declaring it.
#  This makes a difference in some contexts.

Tip	

To avoid confusion or error in a complex sequence of test operators, break up the sequence into bracketed sections.

if [ "$v1" -gt "$v2"  -o  "$v1" -lt "$v2"  -a  -e "$filename" ]
# Unclear what's going on here...

if [[ "$v1" -gt "$v2" ]] || [[ "$v1" -lt "$v2" ]] && [[ -e "$filename" ]]
# Much better -- the condition tests are grouped in logical sections.

Notes
[1]	Precedence, in this context, has approximately the same meaning as priority
```

#### 12.12.17.3 Shell Wrappers

```text
A wrapper is a shell script that embeds a system command or utility, that saves a set of parameters passed to that command. [1]  Wrapping a script around a complex command line simplifies invoking it. This is expecially useful with sed and awk.

A sed or awk script would normally be invoked from the command line by a sed -e 'commands' or awk 'commands'. Embedding such a script in a Bash script permits calling it more simply, and makes it reusable. This also enables combining the functionality of sed and awk, for example piping the output of a set of sed commands to awk. As a saved executable file, you can then repeatedly invoke it in its original form or modified, without the inconvenience of retyping it on the command line.
```

#### 12.12.17.3.1 Example 33-1. shell wrapper

```text
#!/bin/bash

# This simple script removes blank lines from a file.
# No argument checking.
#
# You might wish to add something like:
#
# E_NOARGS=85
# if [ -z "$1" ]
# then
#  echo "Usage: `basename $0` target-file"
#  exit $E_NOARGS
# fi



sed -e /^$/d "$1"
# Same as
#    sed -e '/^$/d' filename
# invoked from the command line.

#  The '-e' means an "editing" command follows (optional here).
#  '^' indicates the beginning of line, '$' the end.
#  This matches lines with nothing between the beginning and the end --
#+ blank lines.
#  The 'd' is the delete command.

#  Quoting the command-line arg permits
#+ whitespace and special characters in the filename.

#  Note that this script doesn't actually change the target file.
#  If you need to do that, redirect its output.

exit
```

#### 12.12.17.3.2 Example 33-2. A slightly more complex shell wrapper

```text
#!/bin/bash

#  subst.sh: a script that substitutes one pattern for
#+ another in a file,
#+ i.e., "sh subst.sh Smith Jones letter.txt".
#                     Jones replaces Smith.

ARGS=3         # Script requires 3 arguments.
E_BADARGS=85   # Wrong number of arguments passed to script.

if [ $# -ne "$ARGS" ]
# Test number of arguments to script (always a good idea).
then
  echo "Usage: `basename $0` old-pattern new-pattern filename"
  exit $E_BADARGS
fi

old_pattern=$1
new_pattern=$2

if [ -f "$3" ]
then
    file_name=$3
else
    echo "File \"$3\" does not exist."
    exit $E_BADARGS
fi


# -----------------------------------------------
#  Here is where the heavy work gets done.
sed -e "s/$old_pattern/$new_pattern/g" $file_name
# -----------------------------------------------

#  's' is, of course, the substitute command in sed,
#+ and /pattern/ invokes address matching.
#  The 'g,' or global flag causes substitution for EVERY
#+ occurence of $old_pattern on each line, not just the first.
#  Read the 'sed' docs for an in-depth explanation.

exit $?
```

#### 12.12.17.3.3 Example 33-3. A generic shell wrapper that writes to a logfile

```text
#!/bin/bash
#  Generic shell wrapper that performs an operation
#+ and logs it.

# Must set the following two variables.
OPERATION=
#         Can be a complex chain of commands,
#+        for example an awk script or a pipe . . .
LOGFILE=
#         Command-line arguments, if any, for the operation.


OPTIONS="$@"


# Log it.
echo "`date` + `whoami` + $OPERATION "$@"" >> $LOGFILE
# Now, do it.
exec $OPERATION "$@"

# It's necessary to do the logging before the operation.
# Why?
```

#### 12.12.17.3.4 Example 33-4. A shell wrapper around an awk script

```text
#!/bin/bash
# pr-ascii.sh: Prints a table of ASCII characters.

START=33   # Range of printable ASCII characters (decimal).
END=127    # Will not work for unprintable chars. (> 127).

echo " Decimal   Hex     Character"   # Header.
echo " -------   ---     ---------"

for ((i=START; i<=END; i++))
do
  echo $i | awk '{printf("  %3d       %2x         %c\n", $1, $1, $1)}'
# The Bash printf builtin will not work in this context:
#     printf "%c" "$i"
done

exit 0


#  Decimal   Hex     Character
#  -------   ---     ---------
#    33       21         !
#    34       22         "
#    35       23         #
#    36       24         $
#
#    . . .
#
#   122       7a         z
#   123       7b         {
#   124       7c         |
#   125       7d         }


#  Redirect the output of this script to a file
#+ or pipe it to "more":  sh pr-asc.sh | more

"
```

#### 12.12.17.3.5 Example 33-5. A shell wrapper around another awk script

```text
#!/bin/bash

# Adds up a specified column (of numbers) in the target file.

ARGS=2
E_WRONGARGS=65

if [ $# -ne "$ARGS" ] # Check for proper no. of command line args.
then
   echo "Usage: `basename $0` filename column-number"
   exit $E_WRONGARGS
fi

filename=$1
column_number=$2

#  Passing shell variables to the awk part of the script is a bit tricky.
#  One method is to strong-quote the Bash-script variable
#+ within the awk script.
#     $'$BASH_SCRIPT_VAR'
#      ^                ^
#  This is done in the embedded awk script below.
#  See the awk documentation for more details.

# A multi-line awk script is invoked by:  awk ' ..... '


# Begin awk script.
# -----------------------------
awk '

{ total += $'"${column_number}"'
}
END {
     print total
}     

' "$filename"
# -----------------------------
# End awk script.


#   It may not be safe to pass shell variables to an embedded awk script,
#+  so Stephane Chazelas proposes the following alternative:
#   ---------------------------------------
#   awk -v column_number="$column_number" '
#   { total += $column_number
#   }
#   END {
#       print total
#   }' "$filename"
#   ---------------------------------------


exit 0

For those scripts needing a single do-it-all tool, a Swiss army knife, there is Perl. Perl combines the capabilities of sed and awk, and throws in a large subset of C, to boot. It is modular and contains support for everything ranging from object-oriented programming up to and including the kitchen sink. Short Perl scripts lend themselves to embedding in shell scripts, and there may even be some substance to the claim that Perl can totally replace shell scripting (though the author of this document remains skeptical).
```

#### 12.12.17.3.6 Example 33-6. Perl embedded in a Bash script

```text
#!/bin/bash

# Shell commands may precede the Perl script.
echo "This precedes the embedded Perl script within \"$0\"."
echo "==============================================================="

perl -e 'print "This is an embedded Perl script.\n";'
# Like sed, Perl also uses the "-e" option.

echo "==============================================================="
echo "However, the script may also contain shell and system commands."

exit 0

It is even possible to combine a Bash script and Perl script within the same file. Depending on how the script is invoked, either the Bash part or the Perl part will execute.
```

#### 12.12.17.3.7 Example 33-7. Bash and Perl scripts combined

```text
#!/bin/bash
# bashandperl.sh

echo "Greetings from the Bash part of the script."
# More Bash commands may follow here.

exit 0
# End of Bash part of the script.

# =======================================================

#!/usr/bin/perl
# This part of the script must be invoked with
#    perl -x bashandperl.sh

print "Greetings from the Perl part of the script.\n";
# More Perl commands may follow here.

# End of Perl part of the script.

bash$ bash bashandperl.sh
Greetings from the Bash part of the script.


bash$ perl -x bashandperl.sh
Greetings from the Perl part of the script.
	      

One interesting example of a complex shell wrapper is Martin Matusiak's undvd script, which provides an easy-to-use command-line interface to the complex mencoder utility. Another example is Itzchak Rehberg's Ext3Undel, a set of scripts to recover deleted file on an ext3 filesystem.
Notes
[1]	Quite a number of Linux utilities are, in fact, shell wrappers. Some examples are /usr/bin/pdf2ps, /usr/bin/batch, and /usr/X11R6/bin/xmkmf.
```

#### 12.12.17.4 Tests and Comparisons: Alternatives

```text
For tests, the [[ ]]  construct may be more appropriate than [ ]. Likewise, arithmetic comparisons might benefit from the (( )) construct.

a=8

# All of the comparisons below are equivalent.
test "$a" -lt 16 && echo "yes, $a < 16"         # "and list"
/bin/test "$a" -lt 16 && echo "yes, $a < 16" 
[ "$a" -lt 16 ] && echo "yes, $a < 16" 
[[ $a -lt 16 ]] && echo "yes, $a < 16"          # Quoting variables within
(( a < 16 )) && echo "yes, $a < 16"             # [[ ]] and (( )) not necessary.

city="New York"
# Again, all of the comparisons below are equivalent.
test "$city" \< Paris && echo "Yes, Paris is greater than $city"
                                  # Greater ASCII order.
/bin/test "$city" \< Paris && echo "Yes, Paris is greater than $city" 
[ "$city" \< Paris ] && echo "Yes, Paris is greater than $city" 
[[ $city < Paris ]] && echo "Yes, Paris is greater than $city"
                                  # Need not quote $city.

# Thank you, S.C.
```

#### 12.12.17.5 A script calling itself (recursion)

```text
Can a script recursively  call itself? Indeed.

Example 33-8. A (useless) script that recursively calls itself

#!/bin/bash
# recurse.sh

#  Can a script recursively call itself?
#  Yes, but is this of any practical use?
#  (See the following.)

RANGE=10
MAXVAL=9

i=$RANDOM
let "i %= $RANGE"  # Generate a random number between 0 and $RANGE - 1.

if [ "$i" -lt "$MAXVAL" ]
then
  echo "i = $i"
  ./$0             #  Script recursively spawns a new instance of itself.
fi                 #  Each child script does the same, until
                   #+ a generated $i equals $MAXVAL.

#  Using a "while" loop instead of an "if/then" test causes problems.
#  Explain why.

exit 0

# Note:
# ----
# This script must have execute permission for it to work properly.
# This is the case even if it is invoked by an "sh" command.
# Explain why.
```

#### 12.12.17.6 Example 33-9. A (useful) script that recursively calls itself

```text
#!/bin/bash
# pb.sh: phone book

# Written by Rick Boivie, and used with permission.
# Modifications by ABS Guide author.

MINARGS=1     #  Script needs at least one argument.
DATAFILE=./phonebook
              #  A data file in current working directory
              #+ named "phonebook" must exist.
PROGNAME=$0
E_NOARGS=70   #  No arguments error.

if [ $# -lt $MINARGS ]; then
      echo "Usage: "$PROGNAME" data-to-look-up"
      exit $E_NOARGS
fi      


if [ $# -eq $MINARGS ]; then
      grep $1 "$DATAFILE"
      # 'grep' prints an error message if $DATAFILE not present.
else
      ( shift; "$PROGNAME" $* ) | grep $1
      # Script recursively calls itself.
fi

exit 0        #  Script exits here.
              #  Therefore, it's o.k. to put
              #+ non-hashmarked comments and data after this point.

# ------------------------------------------------------------------------
Sample "phonebook" datafile:

John Doe        1555 Main St., Baltimore, MD 21228          (410) 222-3333
Mary Moe        9899 Jones Blvd., Warren, NH 03787          (603) 898-3232
Richard Roe     856 E. 7th St., New York, NY 10009          (212) 333-4567
Sam Roe         956 E. 8th St., New York, NY 10009          (212) 444-5678
Zoe Zenobia     4481 N. Baker St., San Francisco, SF 94338  (415) 501-1631
# ------------------------------------------------------------------------

$bash pb.sh Roe
Richard Roe     856 E. 7th St., New York, NY 10009          (212) 333-4567
Sam Roe         956 E. 8th St., New York, NY 10009          (212) 444-5678

$bash pb.sh Roe Sam
Sam Roe         956 E. 8th St., New York, NY 10009          (212) 444-5678

#  When more than one argument is passed to this script,
#+ it prints *only* the line(s) containing all the arguments.
```

#### 12.12.17.7 Example 33-10. Another (useful) script that recursively calls itself

```text
#!/bin/bash
# usrmnt.sh, written by Anthony Richardson
# Used with permission.

# usage:       usrmnt.sh
# description: mount device, invoking user must be listed in the
#              MNTUSERS group in the /etc/sudoers file.

# ----------------------------------------------------------
#  This is a usermount script that reruns itself using sudo.
#  A user with the proper permissions only has to type

#   usermount /dev/fd0 /mnt/floppy

# instead of

#   sudo usermount /dev/fd0 /mnt/floppy

#  I use this same technique for all of my
#+ sudo scripts, because I find it convenient.
# ----------------------------------------------------------

#  If SUDO_COMMAND variable is not set we are not being run through
#+ sudo, so rerun ourselves. Pass the user's real and group id . . .

if [ -z "$SUDO_COMMAND" ]
then
   mntusr=$(id -u) grpusr=$(id -g) sudo $0 $*
   exit 0
fi

# We will only get here if we are being run by sudo.
/bin/mount $* -o uid=$mntusr,gid=$grpusr

exit 0
```

#### 12.12.17.8 Notes

```text
# Additional notes (from the author of this script): 
# -------------------------------------------------

# 1) Linux allows the "users" option in the /etc/fstab
#    file so that any user can mount removable media.
#    But, on a server, I like to allow only a few
#    individuals access to removable media.
#    I find using sudo gives me more control.

# 2) I also find sudo to be more convenient than
#    accomplishing this task through groups.

# 3) This method gives anyone with proper permissions
#    root access to the mount command, so be careful
#    about who you allow access.
#    You can get finer control over which access can be mounted
#    by using this same technique in separate mntfloppy, mntcdrom,
#    and mntsamba scripts.

Caution	Too many levels of recursion can exhaust the script's stack space, causing a segfault.
```

#### 12.12.17.6 "Colorizing" Scripts

```text
The ANSI [1]  escape sequences set screen attributes, such as bold text, and color of foreground and background. DOS batch files commonly used ANSI escape codes for color output, and so can Bash scripts.
```

#### 12.12.17.6.1 Example 33-11. A "colorized" address database

```text
#!/bin/bash
# ex30a.sh: "Colorized" version of ex30.sh.
#            Crude address database


clear                                   # Clear the screen.

echo -n "          "
echo -e '\E[37;44m'"\033[1mContact List\033[0m"
                                        # White on blue background
echo; echo
echo -e "\033[1mChoose one of the following persons:\033[0m"
                                        # Bold
tput sgr0
echo "(Enter only the first letter of name.)"
echo
echo -en '\E[47;34m'"\033[1mE\033[0m"   # Blue
tput sgr0                               # Reset colors to "normal."
echo "vans, Roland"                     # "[E]vans, Roland"
echo -en '\E[47;35m'"\033[1mJ\033[0m"   # Magenta
tput sgr0
echo "ones, Mildred"
echo -en '\E[47;32m'"\033[1mS\033[0m"   # Green
tput sgr0
echo "mith, Julie"
echo -en '\E[47;31m'"\033[1mZ\033[0m"   # Red
tput sgr0
echo "ane, Morris"
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

  "J" | "j" )
  echo
  echo "Mildred Jones"
  echo "249 E. 7th St., Apt. 19"
  echo "New York, NY 10009"
  echo "(212) 533-2814"
  echo "(212) 533-9972 fax"
  echo "milliej@loisaida.com"
  echo "Girlfriend"
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

tput sgr0                               # Reset colors to "normal."

echo

exit 0
```

#### 12.12.17.6.2 Example 33-12. Drawing a box

```text
#!/bin/bash
# Draw-box.sh: Drawing a box using ASCII characters.

# Script by Stefano Palmeri, with minor editing by document author.
# Minor edits suggested by Jim Angstadt.
# Used in the "ABS Guide" with permission.


######################################################################
###  draw_box function doc  ###

#  The "draw_box" function lets the user
#+ draw a box into a terminal.       
#
#  Usage: draw_box ROW COLUMN HEIGHT WIDTH [COLOR] 
#  ROW and COLUMN represent the position        
#+ of the upper left angle of the box you're going to draw.
#  ROW and COLUMN must be greater than 0
#+ and less than current terminal dimension.
#  HEIGHT is the number of rows of the box, and must be > 0. 
#  HEIGHT + ROW must be <= than current terminal height. 
#  WIDTH is the number of columns of the box and must be > 0.
#  WIDTH + COLUMN must be <= than current terminal width.
#
# E.g.: If your terminal dimension is 20x80,
#  draw_box 2 3 10 45 is good
#  draw_box 2 3 19 45 has bad HEIGHT value (19+2 > 20)
#  draw_box 2 3 18 78 has bad WIDTH value (78+3 > 80)
#
#  COLOR is the color of the box frame.
#  This is the 5th argument and is optional.
#  0=black 1=red 2=green 3=tan 4=blue 5=purple 6=cyan 7=white.
#  If you pass the function bad arguments,
#+ it will just exit with code 65,
#+ and no messages will be printed on stderr.
#
#  Clear the terminal before you start to draw a box.
#  The clear command is not contained within the function.
#  This allows the user to draw multiple boxes, even overlapping ones.

###  end of draw_box function doc  ### 
######################################################################

draw_box(){

#=============#
HORZ="-"
VERT="|"
CORNER_CHAR="+"

MINARGS=4
E_BADARGS=65
#=============#


if [ $# -lt "$MINARGS" ]; then                 # If args are less than 4, exit.
    exit $E_BADARGS
fi

# Looking for non digit chars in arguments.
# Probably it could be done better (exercise for the reader?).
if echo $@ | tr -d [:blank:] | tr -d [:digit:] | grep . &> /dev/null; then
   exit $E_BADARGS
fi

BOX_HEIGHT=`expr $3 - 1`   #  -1 correction needed because angle char "+" is 
BOX_WIDTH=`expr $4 - 1`    #+ a part of both box height and width.
T_ROWS=`tput lines`        #  Define current terminal dimension 
T_COLS=`tput cols`         #+ in rows and columns.
         
if [ $1 -lt 1 ] || [ $1 -gt $T_ROWS ]; then    #  Start checking if arguments
   exit $E_BADARGS                             #+ are correct.
fi
if [ $2 -lt 1 ] || [ $2 -gt $T_COLS ]; then
   exit $E_BADARGS
fi
if [ `expr $1 + $BOX_HEIGHT + 1` -gt $T_ROWS ]; then
   exit $E_BADARGS
fi
if [ `expr $2 + $BOX_WIDTH + 1` -gt $T_COLS ]; then
   exit $E_BADARGS
fi
if [ $3 -lt 1 ] || [ $4 -lt 1 ]; then
   exit $E_BADARGS
fi                                 # End checking arguments.

plot_char(){                       # Function within a function.
   echo -e "\E[${1};${2}H"$3
}

echo -ne "\E[3${5}m"               # Set box frame color, if defined.

# start drawing the box

count=1                                         #  Draw vertical lines using
for (( r=$1; count<=$BOX_HEIGHT; r++)); do      #+ plot_char function.
  plot_char $r $2 $VERT
  let count=count+1
done 

count=1
c=`expr $2 + $BOX_WIDTH`
for (( r=$1; count<=$BOX_HEIGHT; r++)); do
  plot_char $r $c $VERT
  let count=count+1
done 

count=1                                        #  Draw horizontal lines using
for (( c=$2; count<=$BOX_WIDTH; c++)); do      #+ plot_char function.
  plot_char $1 $c $HORZ
  let count=count+1
done 

count=1
r=`expr $1 + $BOX_HEIGHT`
for (( c=$2; count<=$BOX_WIDTH; c++)); do
  plot_char $r $c $HORZ
  let count=count+1
done 

plot_char $1 $2 $CORNER_CHAR                   # Draw box angles.
plot_char $1 `expr $2 + $BOX_WIDTH` $CORNER_CHAR
plot_char `expr $1 + $BOX_HEIGHT` $2 $CORNER_CHAR
plot_char `expr $1 + $BOX_HEIGHT` `expr $2 + $BOX_WIDTH` $CORNER_CHAR

echo -ne "\E[0m"             #  Restore old colors.

P_ROWS=`expr $T_ROWS - 1`    #  Put the prompt at bottom of the terminal.

echo -e "\E[${P_ROWS};1H"
}      


# Now, let's try drawing a box.
clear                       # Clear the terminal.
R=2      # Row
C=3      # Column
H=10     # Height
W=45     # Width 
col=1    # Color (red)
draw_box $R $C $H $W $col   # Draw the box.

exit 0

# Exercise:
# --------
# Add the option of printing text within the drawn box.

The simplest, and perhaps most useful ANSI escape sequence is bold text, \033[1m ... \033[0m. The \033 represents an escape, the "[1" turns on the bold attribute, while the "[0" switches it off. The "m" terminates each term of the escape sequence.

bash$ echo -e "\033[1mThis is bold text.\033[0m"
	      

A similar escape sequence switches on the underline attribute (on an rxvt and an aterm).

bash$ echo -e "\033[4mThis is underlined text.\033[0m"
	      

Note	

With an echo, the -e option enables the escape sequences.

Other escape sequences change the text and/or background color.

bash$ echo -e '\E[34;47mThis prints in blue.'; tput sgr0


bash$ echo -e '\E[33;44m'"yellow text on blue background"; tput sgr0


bash$ echo -e '\E[1;33;44m'"BOLD yellow text on blue background"; tput sgr0
	      

Note	

It's usually advisable to set the bold attribute for light-colored foreground text.

The tput sgr0 restores the terminal settings to normal. Omitting this lets all subsequent output from that particular terminal remain blue.

Note	

Since tput sgr0 fails to restore terminal settings under certain circumstances, echo -ne \E[0m may be a better choice.

Use the following template for writing colored text on a colored background.

echo -e '\E[COLOR1;COLOR2mSome text goes here.'

The "\E[" begins the escape sequence. The semicolon-separated numbers "COLOR1" and "COLOR2" specify a foreground and a background color, according to the table below. (The order of the numbers does not matter, since the foreground and background numbers fall in non-overlapping ranges.) The "m" terminates the escape sequence, and the text begins immediately after that.

Note also that single quotes enclose the remainder of the command sequence following the echo -e.

The numbers in the following table work for an rxvt terminal. Results may vary for other terminal emulators.
```

#### 12.12.17.6.3 Table 33-2. Numbers representing colors in Escape Sequences

```text
Color	Foreground	Background
black	30	40
red	31	41
green	32	42
yellow	33	43
blue	34	44
magenta	35	45
cyan	36	46
white	37	47
```

#### 12.12.17.6.4 Example 33-13. Echoing colored text

```text
#!/bin/bash
# color-echo.sh: Echoing text messages in color.

# Modify this script for your own purposes.
# It's easier than hand-coding color.

black='\E[30;47m'
red='\E[31;47m'
green='\E[32;47m'
yellow='\E[33;47m'
blue='\E[34;47m'
magenta='\E[35;47m'
cyan='\E[36;47m'
white='\E[37;47m'


alias Reset="tput sgr0"      #  Reset text attributes to normal
                             #+ without clearing screen.


cecho ()                     # Color-echo.
                             # Argument $1 = message
                             # Argument $2 = color
{
local default_msg="No message passed."
                             # Doesn't really need to be a local variable.

message=${1:-$default_msg}   # Defaults to default message.
color=${2:-$black}           # Defaults to black, if not specified.

  echo -e "$color"
  echo "$message"
  Reset                      # Reset to normal.

  return
}  


# Now, let's try it out.
# ----------------------------------------------------
cecho "Feeling blue..." $blue
cecho "Magenta looks more like purple." $magenta
cecho "Green with envy." $green
cecho "Seeing red?" $red
cecho "Cyan, more familiarly known as aqua." $cyan
cecho "No color passed (defaults to black)."
       # Missing $color argument.
cecho "\"Empty\" color passed (defaults to black)." ""
       # Empty $color argument.
cecho
       # Missing $message and $color arguments.
cecho "" ""
       # Empty $message and $color arguments.
# ----------------------------------------------------

echo

exit 0

# Exercises:
# ---------
# 1) Add the "bold" attribute to the 'cecho ()' function.
# 2) Add options for colored backgrounds.
```

#### 12.12.17.6.5 Example 33-14. A "horserace" game

```text
#!/bin/bash
# horserace.sh: Very simple horserace simulation.
# Author: Stefano Palmeri
# Used with permission.

################################################################
#  Goals of the script:
#  playing with escape sequences and terminal colors.
#
#  Exercise:
#  Edit the script to make it run less randomly,
#+ set up a fake betting shop . . .     
#  Um . . . um . . . it's starting to remind me of a movie . . .
#
#  The script gives each horse a random handicap.
#  The odds are calculated upon horse handicap
#+ and are expressed in European(?) style.
#  E.g., odds=3.75 means that if you bet $1 and win,
#+ you receive $3.75.
# 
#  The script has been tested with a GNU/Linux OS,
#+ using xterm and rxvt, and konsole.
#  On a machine with an AMD 900 MHz processor,
#+ the average race time is 75 seconds.    
#  On faster computers the race time would be lower.
#  So, if you want more suspense, reset the USLEEP_ARG variable.
#
#  Script by Stefano Palmeri.
################################################################

E_RUNERR=65

# Check if md5sum and bc are installed. 
if ! which bc &> /dev/null; then
   echo bc is not installed.  
   echo "Can\'t run . . . "
   exit $E_RUNERR
fi
if ! which md5sum &> /dev/null; then
   echo md5sum is not installed.  
   echo "Can\'t run . . . "
   exit $E_RUNERR
fi

#  Set the following variable to slow down script execution.
#  It will be passed as the argument for usleep (man usleep)  
#+ and is expressed in microseconds (500000 = half a second).
USLEEP_ARG=0  

#  Clean up the temp directory, restore terminal cursor and 
#+ terminal colors -- if script interrupted by Ctl-C.
trap 'echo -en "\E[?25h"; echo -en "\E[0m"; stty echo;\
tput cup 20 0; rm -fr  $HORSE_RACE_TMP_DIR'  TERM EXIT
#  See the chapter on debugging for an explanation of 'trap.'

# Set a unique (paranoid) name for the temp directory the script needs.
HORSE_RACE_TMP_DIR=$HOME/.horserace-`date +%s`-`head -c10 /dev/urandom \
| md5sum | head -c30`

# Create the temp directory and move right in.
mkdir $HORSE_RACE_TMP_DIR
cd $HORSE_RACE_TMP_DIR


#  This function moves the cursor to line $1 column $2 and then prints $3.
#  E.g.: "move_and_echo 5 10 linux" is equivalent to
#+ "tput cup 4 9; echo linux", but with one command instead of two.
#  Note: "tput cup" defines 0 0 the upper left angle of the terminal,
#+ echo defines 1 1 the upper left angle of the terminal.
move_and_echo() {
          echo -ne "\E[${1};${2}H""$3" 
}

# Function to generate a pseudo-random number between 1 and 9. 
random_1_9 ()
{
    head -c10 /dev/urandom | md5sum | tr -d [a-z] | tr -d 0 | cut -c1 
}

#  Two functions that simulate "movement," when drawing the horses. 
draw_horse_one() {
               echo -n " "//$MOVE_HORSE//
}
draw_horse_two(){
              echo -n " "\\\\$MOVE_HORSE\\\\ 
}   


# Define current terminal dimension.
N_COLS=`tput cols`
N_LINES=`tput lines`

# Need at least a 20-LINES X 80-COLUMNS terminal. Check it.
if [ $N_COLS -lt 80 ] || [ $N_LINES -lt 20 ]; then
   echo "`basename $0` needs a 80-cols X 20-lines terminal."
   echo "Your terminal is ${N_COLS}-cols X ${N_LINES}-lines."
   exit $E_RUNERR
fi


# Start drawing the race field.

# Need a string of 80 chars. See below.
BLANK80=`seq -s "" 100 | head -c80`

clear

# Set foreground and background colors to white.
echo -ne '\E[37;47m'

# Move the cursor on the upper left angle of the terminal.
tput cup 0 0 

# Draw six white lines.
for n in `seq 5`; do
      echo $BLANK80   # Use the 80 chars string to colorize the terminal.
done

# Sets foreground color to black. 
echo -ne '\E[30m'

move_and_echo 3 1 "START  1"            
move_and_echo 3 75 FINISH
move_and_echo 1 5 "|"
move_and_echo 1 80 "|"
move_and_echo 2 5 "|"
move_and_echo 2 80 "|"
move_and_echo 4 5 "|  2"
move_and_echo 4 80 "|"
move_and_echo 5 5 "V  3"
move_and_echo 5 80 "V"

# Set foreground color to red. 
echo -ne '\E[31m'

# Some ASCII art.
move_and_echo 1 8 "..@@@..@@@@@...@@@@@.@...@..@@@@..."
move_and_echo 2 8 ".@...@...@.......@...@...@.@......."
move_and_echo 3 8 ".@@@@@...@.......@...@@@@@.@@@@...."
move_and_echo 4 8 ".@...@...@.......@...@...@.@......."
move_and_echo 5 8 ".@...@...@.......@...@...@..@@@@..."
move_and_echo 1 43 "@@@@...@@@...@@@@..@@@@..@@@@."
move_and_echo 2 43 "@...@.@...@.@.....@.....@....."
move_and_echo 3 43 "@@@@..@@@@@.@.....@@@@...@@@.."
move_and_echo 4 43 "@..@..@...@.@.....@.........@."
move_and_echo 5 43 "@...@.@...@..@@@@..@@@@.@@@@.."


# Set foreground and background colors to green.
echo -ne '\E[32;42m'

# Draw  eleven green lines.
tput cup 5 0
for n in `seq 11`; do
      echo $BLANK80
done

# Set foreground color to black. 
echo -ne '\E[30m'
tput cup 5 0

# Draw the fences. 
echo "++++++++++++++++++++++++++++++++++++++\
++++++++++++++++++++++++++++++++++++++++++"

tput cup 15 0
echo "++++++++++++++++++++++++++++++++++++++\
++++++++++++++++++++++++++++++++++++++++++"

# Set foreground and background colors to white.
echo -ne '\E[37;47m'

# Draw three white lines.
for n in `seq 3`; do
      echo $BLANK80
done

# Set foreground color to black.
echo -ne '\E[30m'

# Create 9 files to stores handicaps.
for n in `seq 10 7 68`; do
      touch $n
done  

# Set the first type of "horse" the script will draw.
HORSE_TYPE=2

#  Create position-file and odds-file for every "horse".
#+ In these files, store the current position of the horse,
#+ the type and the odds.
for HN in `seq 9`; do
      touch horse_${HN}_position
      touch odds_${HN}
      echo \-1 > horse_${HN}_position
      echo $HORSE_TYPE >>  horse_${HN}_position
      # Define a random handicap for horse.
       HANDICAP=`random_1_9`
      # Check if the random_1_9 function returned a good value.
      while ! echo $HANDICAP | grep [1-9] &> /dev/null; do
                HANDICAP=`random_1_9`
      done
      # Define last handicap position for horse. 
      LHP=`expr $HANDICAP \* 7 + 3`
      for FILE in `seq 10 7 $LHP`; do
            echo $HN >> $FILE
      done   
     
      # Calculate odds.
      case $HANDICAP in 
              1) ODDS=`echo $HANDICAP \* 0.25 + 1.25 | bc`
                                 echo $ODDS > odds_${HN}
              ;;
              2 | 3) ODDS=`echo $HANDICAP \* 0.40 + 1.25 | bc`
                                       echo $ODDS > odds_${HN}
              ;;
              4 | 5 | 6) ODDS=`echo $HANDICAP \* 0.55 + 1.25 | bc`
                                             echo $ODDS > odds_${HN}
              ;; 
              7 | 8) ODDS=`echo $HANDICAP \* 0.75 + 1.25 | bc`
                                       echo $ODDS > odds_${HN}
              ;; 
              9) ODDS=`echo $HANDICAP \* 0.90 + 1.25 | bc`
                                  echo $ODDS > odds_${HN}
      esac


done


# Print odds.
print_odds() {
tput cup 6 0
echo -ne '\E[30;42m'
for HN in `seq 9`; do
      echo "#$HN odds->" `cat odds_${HN}`
done
}

# Draw the horses at starting line.
draw_horses() {
tput cup 6 0
echo -ne '\E[30;42m'
for HN in `seq 9`; do
      echo /\\$HN/\\"                               "
done
}

print_odds

echo -ne '\E[47m'
# Wait for a enter key press to start the race.
# The escape sequence '\E[?25l' disables the cursor.
tput cup 17 0
echo -e '\E[?25l'Press [enter] key to start the race...
read -s

#  Disable normal echoing in the terminal.
#  This avoids key presses that might "contaminate" the screen
#+ during the race.  
stty -echo

# --------------------------------------------------------
# Start the race.

draw_horses
echo -ne '\E[37;47m'
move_and_echo 18 1 $BLANK80
echo -ne '\E[30m'
move_and_echo 18 1 Starting...
sleep 1

# Set the column of the finish line.
WINNING_POS=74

# Define the time the race started.
START_TIME=`date +%s`

# COL variable needed by following "while" construct.
COL=0    

while [ $COL -lt $WINNING_POS ]; do
                   
          MOVE_HORSE=0     
          
          # Check if the random_1_9 function has returned a good value.
          while ! echo $MOVE_HORSE | grep [1-9] &> /dev/null; do
                MOVE_HORSE=`random_1_9`
          done
          
          # Define old type and position of the "randomized horse".
          HORSE_TYPE=`cat  horse_${MOVE_HORSE}_position | tail -n 1`
          COL=$(expr `cat  horse_${MOVE_HORSE}_position | head -n 1`)
          
          ADD_POS=1
          # Check if the current position is an handicap position. 
          if seq 10 7 68 | grep -w $COL &> /dev/null; then
                if grep -w $MOVE_HORSE $COL &> /dev/null; then
                      ADD_POS=0
                      grep -v -w  $MOVE_HORSE $COL > ${COL}_new
                      rm -f $COL
                      mv -f ${COL}_new $COL
                      else ADD_POS=1
                fi 
          else ADD_POS=1
          fi
          COL=`expr $COL + $ADD_POS`
          echo $COL >  horse_${MOVE_HORSE}_position  # Store new position.
                            
         # Choose the type of horse to draw.         
          case $HORSE_TYPE in 
                1) HORSE_TYPE=2; DRAW_HORSE=draw_horse_two
                ;;
                2) HORSE_TYPE=1; DRAW_HORSE=draw_horse_one 
          esac       
          echo $HORSE_TYPE >>  horse_${MOVE_HORSE}_position
          # Store current type.
         
          # Set foreground color to black and background to green.
          echo -ne '\E[30;42m'
          
          # Move the cursor to new horse position.
          tput cup `expr $MOVE_HORSE + 5` \
	  `cat  horse_${MOVE_HORSE}_position | head -n 1` 
          
          # Draw the horse.
          $DRAW_HORSE
           usleep $USLEEP_ARG
          
           # When all horses have gone beyond field line 15, reprint odds.
           touch fieldline15
           if [ $COL = 15 ]; then
             echo $MOVE_HORSE >> fieldline15  
           fi
           if [ `wc -l fieldline15 | cut -f1 -d " "` = 9 ]; then
               print_odds
               : > fieldline15
           fi           
          
          # Define the leading horse.
          HIGHEST_POS=`cat *position | sort -n | tail -1`          
          
          # Set background color to white.
          echo -ne '\E[47m'
          tput cup 17 0
          echo -n Current leader: `grep -w $HIGHEST_POS *position | cut -c7`\
	  "                              "

done  

# Define the time the race finished.
FINISH_TIME=`date +%s`

# Set background color to green and enable blinking text.
echo -ne '\E[30;42m'
echo -en '\E[5m'

# Make the winning horse blink.
tput cup `expr $MOVE_HORSE + 5` \
`cat  horse_${MOVE_HORSE}_position | head -n 1`
$DRAW_HORSE

# Disable blinking text.
echo -en '\E[25m'

# Set foreground and background color to white.
echo -ne '\E[37;47m'
move_and_echo 18 1 $BLANK80

# Set foreground color to black.
echo -ne '\E[30m'

# Make winner blink.
tput cup 17 0
echo -e "\E[5mWINNER: $MOVE_HORSE\E[25m""  Odds: `cat odds_${MOVE_HORSE}`"\
"  Race time: `expr $FINISH_TIME - $START_TIME` secs"

# Restore cursor and old colors.
echo -en "\E[?25h"
echo -en "\E[0m"

# Restore echoing.
stty echo

# Remove race temp directory.
rm -rf $HORSE_RACE_TMP_DIR

tput cup 19 0

exit 0


Caution	
There is, however, a major problem with all this. ANSI escape sequences are emphatically non-portable. What works fine on some terminal emulators (or the console) may work differently, or not at all, on others. A "colorized" script that looks stunning on the script author's machine may produce unreadable output on someone else's. This greatly compromises the usefulness of "colorizing" scripts, and possibly relegates this technique to the status of a gimmick or even a "toy".

Moshe Jacobson's color utility (http://runslinux.net/projects.html#color) considerably simplifies using ANSI escape sequences. It substitutes a clean and logical syntax for the clumsy constructs just discussed.

Henry/teikedvl has likewise created a utility (http://scriptechocolor.sourceforge.net/) to simplify creation of colorized scripts.
Notes
[1]	ANSI is, of course, the acronym for the American National Standards Institute. This august body establishes and maintains various technical and industrial standards.
```

#### 12.12.17.7 Optimizations

```text
Most shell scripts are quick n dirty solutions to non-complex problems. As such, optimizing them for speed is not much of an issue. Consider the case, though, where a script carries out an important task, does it well, but runs too slowly. Rewriting it in a compiled language may not be a palatable option. The simplest fix would be to rewrite the parts of the script that slow it down. Is it possible to apply principles of code optimization even to a lowly shell script?

Check the loops in the script. Time consumed by repetitive operations adds up quickly. If at all possible, remove time-consuming operations from within loops.

Use builtin commands in preference to system commands. Builtins execute faster and usually do not launch a subshell when invoked.

Avoid unnecessary commands, particularly in a pipe.

cat "$file" | grep "$word"

grep "$word" "$file"

#  The above command lines have an identical effect,
#+ but the second runs faster since it launches one fewer subprocess.

The cat command seems especially prone to overuse in scripts.

Use the time and times tools to profile computation-intensive commands. Consider rewriting time-critical code sections in C, or even in assembler.

Try to minimize file I/O. Bash is not particularly efficient at handling files, so consider using more appropriate tools for this within the script, such as awk or Perl.

Write your scripts in a modular and coherent form, [1] so they can be reorganized and tightened up as necessary. Some of the optimization techniques applicable to high-level languages may work for scripts, but others, such as loop unrolling, are mostly irrelevant. Above all, use common sense.

For an excellent demonstration of how optimization can dramatically reduce the execution time of a script, see Example 15-47.
Notes
[1]	This usually means liberal use of functions.
```

#### 12.12.17.8 Assorted Tips

#### 12.12.17.8.1. Ideas for more powerful scripts

#### 12.12.17.8.1.1 TOP DOWN approach

```text
# You have a problem that you want to solve by writing a Bash script. Unfortunately, you don't know quite where to start. One method is to plunge right in and code those parts of the script that come easily, and write the hard parts as pseudo-code.

#!/bin/bash

ARGCOUNT=1                     # Need name as argument.
E_WRONGARGS=65

if [ number-of-arguments is-not-equal-to "$ARGCOUNT" ]
#    ^^^^^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^^^
#  Can't figure out how to code this . . .
#+ . . . so write it in pseudo-code.

then
  echo "Usage: name-of-script name"
  #            ^^^^^^^^^^^^^^     More pseudo-code.
  exit $E_WRONGARGS
fi 

. . .

exit 0


# Later on, substitute working code for the pseudo-code.

# Line 6 becomes:
if [ $# -ne "$ARGCOUNT" ]

# Line 12 becomes:
  echo "Usage: `basename $0` name"

For an example of using pseudo-code, see the Square Root exercise.
# To keep a record of which user scripts have run during a particular session or over a number of sessions, add the following lines to each script you want to keep track of. This will keep a continuing file record of the script names and invocation times.
```

#### 12.12.17.8.1.2 Keep track of scripts

```text
# Append (>>) following to end of each script tracked.

whoami>> $SAVE_FILE    # User invoking the script.
echo $0>> $SAVE_FILE   # Script name.
date>> $SAVE_FILE      # Date and time.
echo>> $SAVE_FILE      # Blank line as separator.

#  Of course, SAVE_FILE defined and exported as environmental variable in ~/.bashrc
#+ (something like ~/.scripts-run)

# The >> operator appends lines to a file. What if you wish to prepend a line to an existing file, that is, to paste it in at the beginning?

file=data.txt
title="***This is the title line of data text file***"

echo $title | cat - $file >$file.new
# "cat -" concatenates stdout to $file.
#  End result is
#+ to write a new file with $title appended at *beginning*.

This is a simplified variant of the Example 18-13 script given earlier. And, of course, sed can also do this.
# A shell script may act as an embedded command inside another shell script, a Tcl or wish script, or even a Makefile. It can be invoked as an external shell command in a C program using the system() call, i.e., system("script_name");.
# Setting a variable to the contents of an embedded sed or awk script increases the readability of the surrounding shell wrapper. See Example A-1 and Example 14-20.
```

#### 12.12.17.8.1.3 Create script library

```text
# Put together files containing your favorite and most useful definitions and functions. As necessary, "include" one or more of these "library files" in scripts with either the dot (.) or source command.

# SCRIPT LIBRARY
# ------ -------

# Note:
# No "#!" here.
# No "live code" either.


# Useful variable definitions

ROOT_UID=0             # Root has $UID 0.
E_NOTROOT=101          # Not root user error. 
MAXRETVAL=255          # Maximum (positive) return value of a function.
SUCCESS=0
FAILURE=-1



# Functions

Usage ()               # "Usage:" message.
{
  if [ -z "$1" ]       # No arg passed.
  then
    msg=filename
  else
    msg=$@
  fi

  echo "Usage: `basename $0` "$msg""
}  


Check_if_root ()       # Check if root running script.
{                      # From "ex39.sh" example.
  if [ "$UID" -ne "$ROOT_UID" ]
  then
    echo "Must be root to run this script."
    exit $E_NOTROOT
  fi
}  


CreateTempfileName ()  # Creates a "unique" temp filename.
{                      # From "ex51.sh" example.
  prefix=temp
  suffix=`eval date +%s`
  Tempfilename=$prefix.$suffix
}


isalpha2 ()            # Tests whether *entire string* is alphabetic.
{                      # From "isalpha.sh" example.
  [ $# -eq 1 ] || return $FAILURE

  case $1 in
  *[!a-zA-Z]*|"") return $FAILURE;;
  *) return $SUCCESS;;
  esac                 # Thanks, S.C.
}


abs ()                           # Absolute value.
{                                # Caution: Max return value = 255.
  E_ARGERR=-999999

  if [ -z "$1" ]                 # Need arg passed.
  then
    return $E_ARGERR             # Obvious error value returned.
  fi

  if [ "$1" -ge 0 ]              # If non-negative,
  then                           #
    absval=$1                    # stays as-is.
  else                           # Otherwise,
    let "absval = (( 0 - $1 ))"  # change sign.
  fi  

  return $absval
}


tolower ()             #  Converts string(s) passed as argument(s)
{                      #+ to lowercase.

  if [ -z "$1" ]       #  If no argument(s) passed,
  then                 #+ send error message
    echo "(null)"      #+ (C-style void-pointer error message)
    return             #+ and return from function.
  fi  

  echo "$@" | tr A-Z a-z
  # Translate all passed arguments ($@).

  return
```

#### 12.12.17.8.1.4 Use command substitution to set a variable to function output.

```text
# For example:
#    oldvar="A seT of miXed-caSe LEtTerS"
#    newvar=`tolower "$oldvar"`
#    echo "$newvar"    # a set of mixed-case letters
#
# Exercise: Rewrite this function to change lowercase passed argument(s)
#           to uppercase ... toupper()  [easy].
}

#
```

#### 12.12.17.8.1.5 Use special-purpose comment headers to increase clarity and legibility in scripts.

```text
## Caution.
rm -rf *.zzy   ##  The "-rf" options to "rm" are very dangerous,
               ##+ especially with wild cards.

#+ Line continuation.
#  This is line 1
#+ of a multi-line comment,
#+ and this is the final line.

#* Note.

#o List item.

#> Another point of view.
while [ "$var1" != "end" ]    #> while test "$var1" != "end"

#

Dotan Barak contributes template code for a progress bar in a script.
```

#### 12.12.17.8.1.6 Example 33-15. A Progress Bar

```text
#!/bin/bash
# progress-bar.sh

# Author: Dotan Barak (very minor revisions by ABS Guide author).
# Used in ABS Guide with permission (thanks!).


BAR_WIDTH=50
BAR_CHAR_START="["
BAR_CHAR_END="]"
BAR_CHAR_EMPTY="."
BAR_CHAR_FULL="="
BRACKET_CHARS=2
LIMIT=100

print_progress_bar()
{
        # Calculate how many characters will be full.
        let "full_limit = ((($1 - $BRACKET_CHARS) * $2) / $LIMIT)"

        # Calculate how many characters will be empty.
        let "empty_limit = ($1 - $BRACKET_CHARS) - ${full_limit}"

        # Prepare the bar.
        bar_line="${BAR_CHAR_START}"
        for ((j=0; j<full_limit; j++)); do
                bar_line="${bar_line}${BAR_CHAR_FULL}"
        done

        for ((j=0; j<empty_limit; j++)); do
                bar_line="${bar_line}${BAR_CHAR_EMPTY}"
        done

        bar_line="${bar_line}${BAR_CHAR_END}"

        printf "%3d%% %s" $2 ${bar_line}
}

# Here is a sample of code that uses it.
MAX_PERCENT=100
for ((i=0; i<=MAX_PERCENT; i++)); do
        #
        usleep 10000
        # ... Or run some other commands ...
        #
        print_progress_bar ${BAR_WIDTH} ${i}
        echo -en "\r"
done

echo ""

exit

#

A particularly clever use of if-test constructs is for comment blocks.

#!/bin/bash

COMMENT_BLOCK=
#  Try setting the above variable to some value
#+ for an unpleasant surprise.

if [ $COMMENT_BLOCK ]; then

Comment block --
=================================
This is a comment line.
This is another comment line.
This is yet another comment line.
=================================

echo "This will not echo."

Comment blocks are error-free! Whee!

fi

echo "No more comments, please."

exit 0

Compare this with using here documents to comment out code blocks.
#
```

#### 12.12.17.8.1.7 $? for using exit status to perform tests

```text
Using the $? exit status variable, a script may test if a parameter contains only digits, so it can be treated as an integer.

#!/bin/bash

SUCCESS=0
E_BADINPUT=65

test "$1" -ne 0 -o "$1" -eq 0 2>/dev/null
# An integer is either equal to 0 or not equal to 0.
# 2>/dev/null suppresses error message.

if [ $? -ne "$SUCCESS" ]
then
  echo "Usage: `basename $0` integer-input"
  exit $E_BADINPUT
fi

let "sum = $1 + 25"             # Would give error if $1 not integer.
echo "Sum = $sum"

# Any variable, not just a command line parameter, can be tested this way.

exit 0

#
```

#### 12.12.17.8.1.8 remember the 0-255 range for function return values

```text
The 0 - 255 range for function return values is a severe limitation. Global variables and other workarounds are often problematic. An alternative method for a function to communicate a value back to the main body of the script is to have the function write to stdout (usually with echo) the "return value," and assign this to a variable. This is actually a variant of command substitution.
```

#### 12.12.17.8.1.8.1 Example 33-16. Return value trickery

```text
#!/bin/bash
# multiplication.sh

multiply ()                     # Multiplies params passed.
{                               # Will accept a variable number of args.

  local product=1

  until [ -z "$1" ]             # Until uses up arguments passed...
  do
    let "product *= $1"
    shift
  done

  echo $product                 #  Will not echo to stdout,
}                               #+ since this will be assigned to a variable.

mult1=15383; mult2=25211
val1=`multiply $mult1 $mult2`
echo "$mult1 X $mult2 = $val1"
                                # 387820813

mult1=25; mult2=5; mult3=20
val2=`multiply $mult1 $mult2 $mult3`
echo "$mult1 X $mult2 X $mult3 = $val2"
                                # 2500

mult1=188; mult2=37; mult3=25; mult4=47
val3=`multiply $mult1 $mult2 $mult3 $mult4`
echo "$mult1 X $mult2 X $mult3 X $mult4 = $val3"
                                # 8173300

exit 0
```

#### 12.12.17.8.1.8.2 The same technique also works for alphanumeric strings.

```text
					This means that a function can "return" a non-numeric value.

capitalize_ichar ()          #  Capitalizes initial character
{                            #+ of argument string(s) passed.

  string0="$@"               # Accepts multiple arguments.

  firstchar=${string0:0:1}   # First character.
  string1=${string0:1}       # Rest of string(s).

  FirstChar=`echo "$firstchar" | tr a-z A-Z`
                             # Capitalize first character.

  echo "$FirstChar$string1"  # Output to stdout.

}  

newstring=`capitalize_ichar "every sentence should start with a capital letter."`
echo "$newstring"          # Every sentence should start with a capital letter.

It is even possible for a function to "return" multiple values with this method.
```

#### 12.12.17.8.1.8.3 Example 33-17. Even more return value trickery

```text
#!/bin/bash
# sum-product.sh
# A function may "return" more than one value.

sum_and_product ()   # Calculates both sum and product of passed args.
{
  echo $(( $1 + $2 )) $(( $1 * $2 ))
# Echoes to stdout each calculated value, separated by space.
}

echo
echo "Enter first number "
read first

echo
echo "Enter second number "
read second
echo

retval=`sum_and_product $first $second`      # Assigns output of function.
sum=`echo "$retval" | awk '{print $1}'`      # Assigns first field.
product=`echo "$retval" | awk '{print $2}'`  # Assigns second field.

echo "$first + $second = $sum"
echo "$first * $second = $product"
echo

exit 0

Caution	There can be only one echo statement in the function for this to work. If you alter the previous example:

sum_and_product ()
{
  echo "This is the sum_and_product function." # This messes things up!
  echo $(( $1 + $2 )) $(( $1 * $2 ))
}
...
retval=`sum_and_product $first $second`      # Assigns output of function.
# Now, this will not work correctly.

#

				12.12.17.8.1.9

Next in our bag of tricks are techniques for passing an array to a function, then "returning" an array back to the main body of the script.

Passing an array involves loading the space-separated elements of the array into a variable with command substitution. Getting an array back as the "return value" from a function uses the previously mentioned strategem of echoing the array in the function, then invoking command substitution and the ( ... ) operator to assign it to an array.

Example 33-18. Passing and returning arrays

#!/bin/bash
# array-function.sh: Passing an array to a function and...
#                   "returning" an array from a function


Pass_Array ()
{
  local passed_array   # Local variable.
  passed_array=( `echo "$1"` )
  echo "${passed_array[@]}"
  #  List all the elements of the new array
  #+ declared and set within the function.
}


original_array=( element1 element2 element3 element4 element5 )

echo
echo "original_array = ${original_array[@]}"
#                      List all elements of original array.


# This is the trick that permits passing an array to a function.
# **********************************
argument=`echo ${original_array[@]}`
# **********************************
#  Pack a variable
#+ with all the space-separated elements of the original array.
#
# Note that attempting to just pass the array itself will not work.


# This is the trick that allows grabbing an array as a "return value".
# *****************************************
returned_array=( `Pass_Array "$argument"` )
# *****************************************
# Assign 'echoed' output of function to array variable.

echo "returned_array = ${returned_array[@]}"

echo "============================================================="

#  Now, try it again,
#+ attempting to access (list) the array from outside the function.
Pass_Array "$argument"

# The function itself lists the array, but...
#+ accessing the array from outside the function is forbidden.
echo "Passed array (within function) = ${passed_array[@]}"
# NULL VALUE since this is a variable local to the function.

echo

exit 0

For a more elaborate example of passing arrays to functions, see Example A-10.
#
```

#### 12.12.17.8.1.10 Using the double-parentheses construct

```text
				it is possible to use C-style syntax for setting and incrementing/decrementing variables and in for and while loops. See Example 10-12 and Example 10-17.
#
```

#### 12.12.17.8.1.11 Setting the path and umask at the beginning of a script

```text
				makes it more "portable" -- more likely to run on a "foreign" machine whose user may have bollixed up the $PATH and umask.

#!/bin/bash
PATH=/bin:/usr/bin:/usr/local/bin ; export PATH
umask 022   # Files that the script creates will have 755 permission.

# Thanks to Ian D. Allen, for this tip.

#
```

#### 12.12.17.8.1.12 Repeatdly feed the output of filter

```text
				A useful scripting technique is to repeatedly feed the output of a filter (by piping) back to the same filter, but with a different set of arguments and/or options. Especially suitable for this are tr and grep.

# From "wstrings.sh" example.

wlist=`strings "$1" | tr A-Z a-z | tr '[:space:]' Z | \
tr -cs '[:alpha:]' Z | tr -s '\173-\377' Z | tr Z ' '`
```

#### 12.12.17.8.1.12.1 Example 33-19. Fun with anagrams

```text
#!/bin/bash
# agram.sh: Playing games with anagrams.

# Find anagrams of...
LETTERSET=etaoinshrdlu
FILTER='.......'       # How many letters minimum?
#       1234567

anagram "$LETTERSET" | # Find all anagrams of the letterset...
grep "$FILTER" |       # With at least 7 letters,
grep '^is' |           # starting with 'is'
grep -v 's$' |         # no plurals
grep -v 'ed$'          # no past tense verbs
# Possible to add many combinations of conditions and filters.

#  Uses "anagram" utility
#+ that is part of the author's "yawl" word list package.
#  http://ibiblio.org/pub/Linux/libs/yawl-0.3.2.tar.gz
#  http://personal.riverusers.com/~thegrendel/yawl-0.3.2.tar.gz

exit 0                 # End of code.


bash$ sh agram.sh
islander
isolate
isolead
isotheral



#  Exercises:
#  ---------
#  Modify this script to take the LETTERSET as a command-line parameter.
#  Parameterize the filters in lines 11 - 13 (as with $FILTER),
#+ so that they can be specified by passing arguments to a function.

#  For a slightly different approach to anagramming,
#+ see the agram2.sh script.

See also Example 27-4, Example 15-25, and Example A-9.
#
```

#### 12.12.17.8.1.13 annonymous here documents

```text
Use "anonymous here documents" to comment out blocks of code, to save having to individually comment out each line with a #. See Example 18-11.
#
```

#### 12.12.17.8.1.14 use whatis to check commands availability

```text
Running a script on a machine that relies on a command that might not be installed is dangerous. Use whatis to avoid potential problems with this.

CMD=command1                 # First choice.
PlanB=command2               # Fallback option.

command_test=$(whatis "$CMD" | grep 'nothing appropriate')
#  If 'command1' not found on system , 'whatis' will return
#+ "command1: nothing appropriate."
#
#  A safer alternative is:
#     command_test=$(whereis "$CMD" | grep \/)
#  But then the sense of the following test would have to be reversed,
#+ since the $command_test variable holds content only if
#+ the $CMD exists on the system.
#     (Thanks, bojster.)


if [[ -z "$command_test" ]]  # Check whether command present.
then
  $CMD option1 option2       #  Run command1 with options.
else                         #  Otherwise,
  $PlanB                     #+ run command2. 
fi

#
```

#### 12.12.17.8.1.15 Caution when using if-grep test

```text
An if-grep test may not return expected results in an error case, when text is output to stderr, rather that stdout.

if ls -l nonexistent_filename | grep -q 'No such file or directory'
  then echo "File \"nonexistent_filename\" does not exist."
fi

Redirecting stderr to stdout fixes this.

if ls -l nonexistent_filename 2>&1 | grep -q 'No such file or directory'
#                             ^^^^
  then echo "File \"nonexistent_filename\" does not exist."
fi

# Thanks, Chris Martin, for pointing this out.

#

				12.12.17.8.1.16 If you absolutely must access a subshell variable outside the subshell, here's a way to do it.

TMPFILE=tmpfile                  # Create a temp file to store the variable.

(   # Inside the subshell ...
inner_variable=Inner
echo $inner_variable
echo $inner_variable >>$TMPFILE  # Append to temp file.
)

    # Outside the subshell ...

echo; echo "-----"; echo
echo $inner_variable             # Null, as expected.
echo "-----"; echo

# Now ...
read inner_variable <$TMPFILE    # Read back shell variable.
rm -f "$TMPFILE"                 # Get rid of temp file.
echo "$inner_variable"           # It's an ugly kludge, but it works.

#

The run-parts command is handy for running a set of command scripts in a particular sequence, especially in combination with cron or at.
#

For doing multiple revisions on a complex script, use the rcs Revision Control System package.

Among other benefits of this is automatically updated ID header tags. The co command in rcs does a parameter replacement of certain reserved key words, for example, replacing # $Id$ in a script with something like:

# $Id: hello-world.sh,v 1.1 2004/10/16 02:43:05 bozo Exp $
```

#### 12.12.17.8.2. Widgets

```text
It would be nice to be able to invoke X-Windows widgets from a shell script. There happen to exist several packages that purport to do so, namely Xscript, Xmenu, and widtools. The first two of these no longer seem to be maintained. Fortunately, it is still possible to obtain widtools here.

Caution	The widtools (widget tools) package requires the XForms library to be installed. Additionally, the Makefile needs some judicious editing before the package will build on a typical Linux system. Finally, three of the six widgets offered do not work (and, in fact, segfault).

The dialog family of tools offers a method of calling "dialog" widgets from a shell script. The original dialog utility works in a text console, but its successors, gdialog, Xdialog, and kdialog use X-Windows-based widget sets.

				12.12.17.8.2..1 Example 33-20. Widgets invoked from a shell script

#!/bin/bash
# dialog.sh: Using 'gdialog' widgets.

# Must have 'gdialog' installed on your system to run this script.
# Or, you can replace all instance of 'gdialog' below with 'kdialog' ...
# Version 1.1 (corrected 04/05/05)

# This script was inspired by the following article.
#     "Scripting for X Productivity," by Marco Fioretti,
#      LINUX JOURNAL, Issue 113, September 2003, pp. 86-9.
# Thank you, all you good people at LJ.


# Input error in dialog box.
E_INPUT=65
# Dimensions of display, input widgets.
HEIGHT=50
WIDTH=60

# Output file name (constructed out of script name).
OUTFILE=$0.output

# Display this script in a text widget.
gdialog --title "Displaying: $0" --textbox $0 $HEIGHT $WIDTH



# Now, we'll try saving input in a file.
echo -n "VARIABLE=" > $OUTFILE
gdialog --title "User Input" --inputbox "Enter variable, please:" \
$HEIGHT $WIDTH 2>> $OUTFILE


if [ "$?" -eq 0 ]
# It's good practice to check exit status.
then
  echo "Executed \"dialog box\" without errors."
else
  echo "Error(s) in \"dialog box\" execution."
        # Or, clicked on "Cancel", instead of "OK" button.
  rm $OUTFILE
  exit $E_INPUT
fi



# Now, we'll retrieve and display the saved variable.
. $OUTFILE   # 'Source' the saved file.
echo "The variable input in the \"input box\" was: "$VARIABLE""


rm $OUTFILE  # Clean up by removing the temp file.
             # Some applications may need to retain this file.

exit $?

# Exercise: Rewrite this script using the 'zenity' widget set.

The xmessage command is a simple method of popping up a message/query window. For example:

xmessage Fatal error in script! -button exit

The latest entry in the widget sweepstakes is zenity. This utility pops up GTK+ dialog widgets-and-windows, and it works very nicely within a script.

get_info ()
{
  zenity --entry       #  Pops up query window . . .
                       #+ and prints user entry to stdout.

                       #  Also try the --calendar and --scale options.
}

answer=$( get_info )   #  Capture stdout in $answer variable.

echo "User entered: "$answer""

For other methods of scripting with widgets, try Tk or wish (Tcl derivatives), PerlTk (Perl with Tk extensions), tksh (ksh with Tk extensions), XForms4Perl (Perl with XForms extensions), Gtk-Perl (Perl with Gtk extensions), or PyQt (Python with Qt extensions).
```

#### 12.12.17.9 Security Issues

#### 12.12.17.9.1 Infected Shell Scripts

```text
			    A brief warning about script security is indicated. A shell script may contain a worm, trojan, or even a virus. For that reason, never run as root a script (or permit it to be inserted into the system startup scripts in /etc/rc.d) unless you have obtained said script from a trusted source or you have carefully analyzed it to make certain it does nothing harmful.

Various researchers at Bell Labs and other sites, including M. Douglas McIlroy, Tom Duff, and Fred Cohen have investigated the implications of shell script viruses. They conclude that it is all too easy for even a novice, a "script kiddie," to write one. [1]

Here is yet another reason to learn scripting. Being able to look at and understand scripts may protect your system from being compromised by a rogue script.
```

#### 12.12.17.9.2 Hiding Shell Script Source

```text
For security purposes, it may be necessary to render a script unreadable. If only there were a utility to create a stripped binary executable from a script. Francisco Rosales' shc -- generic shell script compiler does exactly that.

Unfortunately, according to an article in the October, 2005 Linux Journal, the binary can, in at least some cases, be decrypted to recover the original script source. Still, this could be a useful method of keeping scripts secure from all but the most skilled hackers.
```

#### 12.12.17.9.3 Writing Secure Shell Scripts

```text
	Dan Stromberg suggests the following guidelines for writing (relatively) secure shell scripts.

    *

      Don't put secret data in environment variables.
    *

      Don't pass secret data in an external command's arguments (pass them in via a pipe or redirection instead).
    *

      Set your $PATH carefully. Don't just trust whatever path you inherit from the caller if your script is running as root. In fact, whenever you use an environment variable inherited from the caller, think about what could happen if the caller put something misleading in the variable, e.g., if the caller set $HOME to /etc.

Notes
[1]	See Marius van Oers' article, Unix Shell Scripting Malware, and also the Denning reference in the bibliography.		
```

#### 12.12.17.10 Portability Issues

```text
			This book deals specifically with Bash scripting on a GNU/Linux system. All the same, users of sh  and ksh will find much of value here.

As it happens, many of the various shells and scripting languages seem to be converging toward the POSIX 1003.2 standard. Invoking Bash with the --posix option or inserting a set -o posix at the head of a script causes Bash to conform very closely to this standard. Another alternative is to use a #!/bin/sh sha-bang header in the script, rather than #!/bin/bash. [1] Note that /bin/sh is a link to /bin/bash in Linux and certain other flavors of UNIX, and a script invoked this way disables extended Bash functionality.

Most Bash scripts will run as-is under ksh, and vice-versa, since Chet Ramey has been busily porting ksh features to the latest versions of Bash.

On a commercial UNIX machine, scripts using GNU-specific features of standard commands may not work. This has become less of a problem in the last few years, as the GNU utilities have pretty much displaced their proprietary counterparts even on "big-iron" UNIX. Caldera's release of the source to many of the original UNIX utilities has accelerated the trend.

Bash has certain features that the traditional Bourne shell lacks. Among these are:

    * Certain extended invocation options
    * Command substitution using $( ) notation
    * The double brackets extended test construct
    * The double-parentheses arithmetic-evaluation construct
    * Certain string manipulation operations
    * Process substitution
    * A Regular Expression matching operator
    * Bash-specific builtins

See the Bash F.A.Q. for a complete listing.
Notes
[1]	Or, better yet, #!/bin/env sh.
```

#### 12.12.17.11 Shell Scripting Under Windows

```text
			Even users running that other OS can run UNIX-like shell scripts, and therefore benefit from many of the lessons of this book. The  Cygwin package from Cygnus and the MKS utilities from Mortice Kern Associates add shell scripting capabilities to Windows.

There have been intimations that a future release of Windows will contain Bash-like command line scripting capabilities, but that remains to be seen.
```
