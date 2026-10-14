---
type: reference
title: Chapter 23. Functions
description: Subsection 12.12.7 of Part 5. Advanced Topics.
tags: [kb-bash, xargs, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.7"
---

# 12.12.7 Chapter 23. Functions

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

```text
Like "real" programming languages, Bash has functions, though in a somewhat limited implementation. A function is a subroutine, a code block that implements a set of operations, a "black box" that performs a specified task. Wherever there is repetitive code, when a task repeats with only slight variations in procedure, then consider using a function.

function function_name {
command...
}
or

function_name () {
command...
}

This second form will cheer the hearts of C programmers (and is more portable).

As in C, the function's opening bracket may optionally appear on the second line.

function_name ()
{
command...
}

Note	A function may be "compacted" into a single line.

fun () { echo "This is a function"; echo; }
#                                 ^     ^

In this case, however, a semicolon must follow the final command in the function.

fun () { echo "This is a function"; echo } # Error!
#                                       ^

Functions are called, triggered, simply by invoking their names. A function call is equivalent to a command.
```

#### 12.12.7.1 Example 23-1. Simple functions

```text
#!/bin/bash

JUST_A_SECOND=1

funky ()
{ # This is about as simple as functions get.
  echo "This is a funky function."
  echo "Now exiting funky function."
} # Function declaration must precede call.


fun ()
{ # A somewhat more complex function.
  i=0
  REPEATS=30

  echo
  echo "And now the fun really begins."
  echo

  sleep $JUST_A_SECOND    # Hey, wait a second!
  while [ $i -lt $REPEATS ]
  do
    echo "----------FUNCTIONS---------->"
    echo "<------------ARE-------------"
    echo "<------------FUN------------>"
    echo
    let "i+=1"
  done
}

  # Now, call the functions.

funky
fun

exit 0
```

#### 12.12.7.2 The function definition must precede the first call to it

```text
			There is no method of "declaring" the function, as, for example, in C.

f1
# Will give an error message, since function "f1" not yet defined.

declare -f f1      # This doesn't help either.
f1                 # Still an error message.

# However...

	  
f1 ()
{
  echo "Calling function \"f2\" from within function \"f1\"."
  f2
}

f2 ()
{
  echo "Function \"f2\"."
}

f1  #  Function "f2" is not actually called until this point,
    #+ although it is referenced before its definition.
    #  This is permissible.
    
    # Thanks, S.C.

It is even possible to nest a function within another function, although this is not very useful.

f1 ()
{

  f2 () # nested
  {
    echo "Function \"f2\", inside \"f1\"."
  }

}  

f2  #  Gives an error message.
    #  Even a preceding "declare -f f2" wouldn't help.

echo    

f1  #  Does nothing, since calling "f1" does not automatically call "f2".
f2  #  Now, it's all right to call "f2",
    #+ since its definition has been made visible by calling "f1".

    # Thanks, S.C.
```

#### 12.12.7.3 Function declarations can appear in unlikely places

```text
			 even where a command would otherwise go.

ls -l | foo() { echo "foo"; }  # Permissible, but useless.



if [ "$USER" = bozo ]
then
  bozo_greet ()   # Function definition embedded in an if/then construct.
  {
    echo "Hello, Bozo."
  }
fi  

bozo_greet        # Works only for Bozo, and other users get an error.



# Something like this might be useful in some contexts.
NO_EXIT=1   # Will enable function definition below.

[[ $NO_EXIT -eq 1 ]] && exit() { true; }     # Function definition in an "and-list".
# If $NO_EXIT is 1, declares "exit ()".
# This disables the "exit" builtin by aliasing it to "true".

exit  # Invokes "exit ()" function, not "exit" builtin.



# Or, similarly:
filename=file1

[ -f "$filename" ] &&
foo () { rm -f "$filename"; echo "File "$filename" deleted."; } ||
foo () { echo "File "$filename" not found."; touch bar; }

foo

# Thanks, S.C. and Christopher Head

Note	What happens when different versions of the same function appear in a script?

#  As Yan Chen points out,
#  when a function is defined multiple times,
#  the final version is what is invoked.
#  This is not, however, particularly useful.

func ()
{
  echo "First version of func ()."
}

func ()
{
  echo "Second version of func ()."
}

func   # Second version of func ().

exit $?

#  It is even possible to use functions to override
#+ or preempt system commands.
#  Of course, this is *not* advisable.
```

#### 12.12.7.1. Complex Functions and Function Complexities

```text
Functions may process arguments passed to them and return an exit status to the script for further processing.

function_name $arg1 $arg2

The function refers to the passed arguments by position (as if they were positional parameters), that is, $1, $2, and so forth.

				12.12.7.1..1 Example 23-2. Function Taking Parameters

#!/bin/bash
# Functions and parameters

DEFAULT=default                             # Default param value.

func2 () {
   if [ -z "$1" ]                           # Is parameter #1 zero length?
   then
     echo "-Parameter #1 is zero length.-"  # Or no parameter passed.
   else
     echo "-Param #1 is \"$1\".-"
   fi

   variable=${1-$DEFAULT}                   #  What does
   echo "variable = $variable"              #+ parameter substitution show?
                                            #  ---------------------------
                                            #  It distinguishes between
                                            #+ no param and a null param.

   if [ "$2" ]
   then
     echo "-Parameter #2 is \"$2\".-"
   fi

   return 0
}

echo
   
echo "Nothing passed."   
func2                          # Called with no params
echo


echo "Zero-length parameter passed."
func2 ""                       # Called with zero-length param
echo

echo "Null parameter passed."
func2 "$uninitialized_param"   # Called with uninitialized param
echo

echo "One parameter passed."   
func2 first           # Called with one param
echo

echo "Two parameters passed."   
func2 first second    # Called with two params
echo

echo "\"\" \"second\" passed."
func2 "" second       # Called with zero-length first parameter
echo                  # and ASCII string as a second one.

exit 0

Important	The shift command works on arguments passed to functions (see Example 33-16).

But, what about command-line arguments passed to the script? Does a function see them? Well, let's clear up the confusion.
```

#### 12.12.7.1.2 Example 23-3 Functions and command-line args passed to the script

```text
#!/bin/bash
# func-cmdlinearg.sh
#  Call this script with a command-line argument,
#+ something like $0 arg1.


func ()

{
echo "$1"
}

echo "First call to function: no arg passed."
echo "See if command-line arg is seen."
func
# No! Command-line arg not seen.

echo "============================================================"
echo
echo "Second call to function: command-line arg passed explicitly."
func $1
# Now it's seen!

exit 0
```

#### 12.12.7.1.3 Example 23-4 Passing an indirect reference to a function

```text
In contrast to certain other programming languages, shell scripts normally pass only value parameters to functions. Variable names (which are actually pointers), if passed as parameters to functions, will be treated as string literals. Functions interpret their arguments literally.

Indirect variable references (see Example 34-2) provide a clumsy sort of mechanism for passing variable pointers to functions.


#!/bin/bash
# ind-func.sh: Passing an indirect reference to a function.

echo_var ()
{
echo "$1"
}

message=Hello
Hello=Goodbye

echo_var "$message"        # Hello
# Now, let's pass an indirect reference to the function.
echo_var "${!message}"     # Goodbye

echo "-------------"

# What happens if we change the contents of "hello" variable?
Hello="Hello, again!"
echo_var "$message"        # Hello
echo_var "${!message}"     # Hello, again!

exit 0

The next logical question is whether parameters can be dereferenced after being passed to a function.
```

#### 12.12.7.1.4 Example 23-5 Dereferencing a parameter passed to a function

```text
#!/bin/bash
# dereference.sh
# Dereferencing parameter passed to a function.
# Script by Bruce W. Clare.

dereference ()
{
     y=\$"$1"   # Name of variable.
     echo $y    # $Junk

     x=`eval "expr \"$y\" "`
     echo $1=$x
     eval "$1=\"Some Different Text \""  # Assign new value.
}

Junk="Some Text"
echo $Junk "before"    # Some Text before

dereference Junk
echo $Junk "after"     # Some Different Text after

exit 0
```

#### 12.12.7.1.5 Example 23-6 Again, dereferencing a parameter passed to a function

```text
#!/bin/bash
# ref-params.sh: Dereferencing a parameter passed to a function.
#                (Complex Example)

ITERATIONS=3  # How many times to get input.
icount=1

my_read () {
  #  Called with my_read varname,
  #+ outputs the previous value between brackets as the default value,
  #+ then asks for a new value.

  local local_var

  echo -n "Enter a value "
  eval 'echo -n "[$'$1'] "'  #  Previous value.
# eval echo -n "[\$$1] "     #  Easier to understand,
                             #+ but loses trailing space in user prompt.
  read local_var
  [ -n "$local_var" ] && eval $1=\$local_var

  # "And-list": if "local_var" then set "$1" to its value.
}

echo

while [ "$icount" -le "$ITERATIONS" ]
do
  my_read var
  echo "Entry #$icount = $var"
  let "icount += 1"
  echo
done  


# Thanks to Stephane Chazelas for providing this instructive example.

exit 0
```

#### 12.12.7.1.6 Exit and Return

```text
exit status

    Functions return a value, called an exit status. The exit status may be explicitly specified by a return statement, otherwise it is the exit status of the last command in the function (0 if successful, and a non-zero error code if not). This exit status may be used in the script by referencing it as $?. This mechanism effectively permits script functions to have a "return value" similar to C functions.

return

    Terminates a function. A return command [1] optionally takes an integer argument, which is returned to the calling script as the "exit status" of the function, and this exit status is assigned to the variable $?.
```

#### 12.12.7.1.6.1 Example 23-7. Maximum of two numbers

```text
    #!/bin/bash
    # max.sh: Maximum of two integers.

    E_PARAM_ERR=250    # If less than 2 params passed to function.
    EQUAL=251          # Return value if both params equal.
    #  Error values out of range of any
    #+ params that might be fed to the function.

    max2 ()             # Returns larger of two numbers.
    {                   # Note: numbers compared must be less than 257.
    if [ -z "$2" ]
    then
      return $E_PARAM_ERR
    fi

    if [ "$1" -eq "$2" ]
    then
      return $EQUAL
    else
      if [ "$1" -gt "$2" ]
      then
        return $1
      else
        return $2
      fi
    fi
    }

    max2 33 34
    return_val=$?

    if [ "$return_val" -eq $E_PARAM_ERR ]
    then
      echo "Need to pass two parameters to the function."
    elif [ "$return_val" -eq $EQUAL ]
      then
        echo "The two numbers are equal."
    else
        echo "The larger of the two numbers is $return_val."
    fi  

      
    exit 0

    #  Exercise (easy):
    #  ---------------
    #  Convert this to an interactive script,
    #+ that is, have the script ask for input (two numbers).

    Tip	For a function to return a string or array, use a dedicated variable.

    count_lines_in_etc_passwd()
    {
      [[ -r /etc/passwd ]] && REPLY=$(echo $(wc -l < /etc/passwd))
      #  If /etc/passwd is readable, set REPLY to line count.
      #  Returns both a parameter value and status information.
      #  The 'echo' seems unnecessary, but . . .
      #+ it removes excess whitespace from the output.
    }

    if count_lines_in_etc_passwd
    then
      echo "There are $REPLY lines in /etc/passwd."
    else
      echo "Cannot count lines in /etc/passwd."
    fi  

    # Thanks, S.C.
```

#### 12.12.7.1.6.2 Example 23-8. Converting numbers to Roman numerals

```text
    #!/bin/bash

    # Arabic number to Roman numeral conversion
    # Range: 0 - 200
    # It's crude, but it works.

    # Extending the range and otherwise improving the script is left as an exercise.

    # Usage: roman number-to-convert

    LIMIT=200
    E_ARG_ERR=65
    E_OUT_OF_RANGE=66

    if [ -z "$1" ]
    then
      echo "Usage: `basename $0` number-to-convert"
      exit $E_ARG_ERR
    fi  

    num=$1
    if [ "$num" -gt $LIMIT ]
    then
      echo "Out of range!"
      exit $E_OUT_OF_RANGE
    fi  

    to_roman ()   # Must declare function before first call to it.
    {
    number=$1
    factor=$2
    rchar=$3
    let "remainder = number - factor"
    while [ "$remainder" -ge 0 ]
    do
      echo -n $rchar
      let "number -= factor"
      let "remainder = number - factor"
    done  

    return $number
           # Exercises:
           # ---------
           # 1) Explain how this function works.
           #    Hint: division by successive subtraction.
           # 2) Extend to range of the function.
           #    Hint: use "echo" and command-substitution capture.
    }
       

    to_roman $num 100 C
    num=$?
    to_roman $num 90 LXXXX
    num=$?
    to_roman $num 50 L
    num=$?
    to_roman $num 40 XL
    num=$?
    to_roman $num 10 X
    num=$?
    to_roman $num 9 IX
    num=$?
    to_roman $num 5 V
    num=$?
    to_roman $num 4 IV
    num=$?
    to_roman $num 1 I
    # Successive calls to conversion function!
    # Is this really necessary??? Can it be simplified?

    echo

    exit


    Important	The largest positive integer a function can return is 255. The return command is closely tied to the concept of exit status, which accounts for this particular limitation. Fortunately, there are various workarounds for those situations requiring a large integer return value from a function.
```

#### 12.12.7.1.6.3 Example 23-9. Testing large return values in a function

```text
    #!/bin/bash
    # return-test.sh

    # The largest positive value a function can return is 255.

    return_test ()         # Returns whatever passed to it.
    {
      return $1
    }

    return_test 27         # o.k.
    echo $?                # Returns 27.
      
    return_test 255        # Still o.k.
    echo $?                # Returns 255.

    return_test 257        # Error!
    echo $?                # Returns 1 (return code for miscellaneous error).

    # ======================================================
    return_test -151896    # Do large negative numbers work?
    echo $?                # Will this return -151896?
                           # No! It returns 168.
    #  Version of Bash before 2.05b permitted
    #+ large negative integer return values.
    #  Newer versions of Bash plug this loophole.
    #  This may break older scripts.
    #  Caution!
    # ======================================================

    exit 0

    A workaround for obtaining large integer "return values" is to simply assign the "return value" to a global variable.

    Return_Val=   # Global variable to hold oversize return value of function.

    alt_return_test ()
    {
      fvar=$1
      Return_Val=$fvar
      return   # Returns 0 (success).
    }

    alt_return_test 1
    echo $?                              # 0
    echo "return value = $Return_Val"    # 1

    alt_return_test 256
    echo "return value = $Return_Val"    # 256

    alt_return_test 257
    echo "return value = $Return_Val"    # 257

    alt_return_test 25701
    echo "return value = $Return_Val"    #25701

    A more elegant method is to have the function echo its "return value to stdout," and then capture it by command substitution. 
```

#### 12.12.7.1.6.4 Example 23-10. Comparing two large integers

```text
    #!/bin/bash
    # max2.sh: Maximum of two LARGE integers.

    #  This is the previous "max.sh" example,
    #+ modified to permit comparing large integers.

    EQUAL=0             # Return value if both params equal.
    E_PARAM_ERR=-99999  # Not enough params passed to function.
    #           ^^^^^^    Out of range of any params that might be passed.

    max2 ()             # "Returns" larger of two numbers.
    {
    if [ -z "$2" ]
    then
      echo $E_PARAM_ERR
      return
    fi

    if [ "$1" -eq "$2" ]
    then
      echo $EQUAL
      return
    else
      if [ "$1" -gt "$2" ]
      then
        retval=$1
      else
        retval=$2
      fi
    fi

    echo $retval        # Echoes (to stdout), rather than returning value.
                        # Why?
    }


    return_val=$(max2 33001 33997)
    #            ^^^^             Function name
    #                 ^^^^^ ^^^^^ Params passed
    #  This is actually a form of command substitution:
    #+ treating a function as if it were a command,
    #+ and assigning the stdout of the function to the variable "return_val."


    # ========================= OUTPUT ========================
    if [ "$return_val" -eq "$E_PARAM_ERR" ]
      then
      echo "Error in parameters passed to comparison function!"
    elif [ "$return_val" -eq "$EQUAL" ]
      then
        echo "The two numbers are equal."
    else
        echo "The larger of the two numbers is $return_val."
    fi
    # =========================================================
      
    exit 0

    #  Exercises:
    #  ---------
    #  1) Find a more elegant way of testing
    #+    the parameters passed to the function.
    #  2) Simplify the if/then structure at "OUTPUT."
    #  3) Rewrite the script to take input from command-line parameters.

    Here is another example of capturing a function "return value." Understanding it requires some knowledge of awk.
```

#### 12.12.7.1.6.5 Example: Month length

```text
    month_length ()  # Takes month number as an argument.
    {                # Returns number of days in month.
    monthD="31 28 31 30 31 30 31 31 30 31 30 31"  # Declare as local?
    echo "$monthD" | awk '{ print $'"${1}"' }'    # Tricky.
    #                             ^^^^^^^^^
    # Parameter passed to function  ($1 -- month number), then to awk.
    # Awk sees this as "print $1 . . . print $12" (depending on month number)
    # Template for passing a parameter to embedded awk script:
    #                                 $'"${script_parameter}"'

    #  Needs error checking for correct parameter range (1-12)
    #+ and for February in leap year.
    }

    # ----------------------------------------------
    # Usage example:
    month=4        # April, for example (4th month).
    days_in=$(month_length $month)
    echo $days_in  # 30
    # ----------------------------------------------

    See also Example A-7 and Example A-39.

    Exercise: Using what we have just learned, extend the previous Roman numerals example to accept arbitrarily large input.
```

#### 12.12.7.1.7 Redirection

```text
Redirecting the stdin of a function

    A function is essentially a code block, which means its stdin can be redirected (as in Example 3-1).
```

#### 12.12.7.1.7.1 Example 23-11. Real name from username

```text
    #!/bin/bash
    # realname.sh
    #
    # From username, gets "real name" from /etc/passwd.


    ARGCOUNT=1       # Expect one arg.
    E_WRONGARGS=65

    file=/etc/passwd
    pattern=$1

    if [ $# -ne "$ARGCOUNT" ]
    then
      echo "Usage: `basename $0` USERNAME"
      exit $E_WRONGARGS
    fi  

    file_excerpt ()    #  Scan file for pattern,
    {                  #+ then print relevant portion of line.
      while read line  # "while" does not necessarily need [ condition ]
      do
        echo "$line" | grep $1 | awk -F":" '{ print $5 }'
        # Have awk use ":" delimiter.
      done
    } <$file  # Redirect into function's stdin.

    file_excerpt $pattern

    # Yes, this entire script could be reduced to
    #       grep PATTERN /etc/passwd | awk -F":" '{ print $5 }'
    # or
    #       awk -F: '/PATTERN/ {print $5}'
    # or
    #       awk -F: '($1 == "username") { print $5 }' # real name from username
    # However, it might not be as instructive.

    exit 0

    There is an alternate, and perhaps less confusing method of redirecting a function's stdin. This involves redirecting the stdin to an embedded bracketed code block within the function.

    # Instead of:
    Function ()
    {
     ...
     } < file

    # Try this:
    Function ()
    {
      {
        ...
       } < file
    }

    # Similarly,

    Function ()  # This works.
    {
      {
       echo $*
      } | tr a b
    }

    Function ()  # This doesn't work.
    {
      echo $*
    } | tr a b   # A nested code block is mandatory here.


    # Thanks, S.C.
```

#### 12.12.7.2 Local Variables

```text
What makes a variable local?

local variables

    A variable declared as local is one that is visible only within the block of code in which it appears. It has local "scope." In a function, a local variable has meaning only within that function block.
```

#### 12.12.7.2.1 Example 23-12. Local variable visibility

```text
    #!/bin/bash
    # Global and local variables inside a function.

    func ()
    {
      local loc_var=23       # Declared as local variable.
      echo                   # Uses the 'local' builtin.
      echo "\"loc_var\" in function = $loc_var"
      global_var=999         # Not declared as local.
                             # Defaults to global. 
      echo "\"global_var\" in function = $global_var"
    }  

    func

    # Now, to see if local variable "loc_var" exists outside function.

    echo
    echo "\"loc_var\" outside function = $loc_var"
                                          # $loc_var outside function = 
                                          # No, $loc_var not visible globally.
    echo "\"global_var\" outside function = $global_var"
                                          # $global_var outside function = 999
                                          # $global_var is visible globally.
    echo				      

    exit 0
    #  In contrast to C, a Bash variable declared inside a function
    #+ is local *only* if declared as such.

    Caution	Before a function is called, all variables declared within the function are invisible outside the body of the function, not just those explicitly declared as local.

    #!/bin/bash

    func ()
    {
    global_var=37    #  Visible only within the function block
                     #+ before the function has been called. 
    }                #  END OF FUNCTION

    echo "global_var = $global_var"  # global_var =
                                     #  Function "func" has not yet been called,
                                     #+ so $global_var is not visible here.

    func
    echo "global_var = $global_var"  # global_var = 37
                                     # Has been set by function call.
```

#### 12.12.7.2.2 Local variables and recursion.

```text
Recursion is an interesting and sometimes useful form of self-reference. Herbert Mayer defines it as ". . . expressing an algorithm by using a simpler version of that same algorithm . . ."

Consider a definition defined in terms of itself, [1] an expression implicit in its own expression, [2] a snake swallowing its own tail, [3] or . . . a function that calls itself. [4]
```

#### 12.12.7.2.2.1 Example 23-13. Demonstration of a simple recursive function

```text
#!/bin/bash
# recursion-demo.sh
# Demonstration of recursion.

RECURSIONS=9   # How many times to recurse.
r_count=0      # Must be global. Why?

recurse ()
{
  var="$1"

  while [ "$var" -ge 0 ]
  do
    echo "Recursion count = "$r_count"  +-+  \$var = "$var""
    (( var-- )); (( r_count++ ))
    recurse "$var"  #  Function calls itself (recurses)
  done              #+ until what condition is met?
}

recurse $RECURSIONS

exit $?

Local variables are a useful tool for writing recursive code, but this practice generally involves a great deal of computational overhead and is definitely not recommended in a shell script. [5]
```

#### 12.12.7.2.2.2 Example 23-14. Recursion, using a local variable

```text
#!/bin/bash

#               factorial
#               ---------


# Does bash permit recursion?
# Well, yes, but...
# It's so slow that you gotta have rocks in your head to try it.


MAX_ARG=5
E_WRONG_ARGS=65
E_RANGE_ERR=66


if [ -z "$1" ]
then
  echo "Usage: `basename $0` number"
  exit $E_WRONG_ARGS
fi

if [ "$1" -gt $MAX_ARG ]
then
  echo "Out of range (5 is maximum)."
  #  Let's get real now.
  #  If you want greater range than this,
  #+ rewrite it in a Real Programming Language.
  exit $E_RANGE_ERR
fi  

fact ()
{
  local number=$1
  #  Variable "number" must be declared as local,
  #+ otherwise this doesn't work.
  if [ "$number" -eq 0 ]
  then
    factorial=1    # Factorial of 0 = 1.
  else
    let "decrnum = number - 1"
    fact $decrnum  # Recursive function call (the function calls itself).
    let "factorial = $number * $?"
  fi

  return $factorial
}

fact $1
echo "Factorial of $1 is $?."

exit 0

Also see Example A-16 for an example of recursion in a script. Be aware that recursion is resource-intensive and executes slowly, and is therefore generally not appropriate in a script.
Notes
[1]	Otherwise known as redundancy.
[2]	Otherwise known as tautology.
[3]	Otherwise known as a metaphor.
[4]	Otherwise known as a recursive function.
[5]	Too many levels of recursion may crash a script with a segfault.

#!/bin/bash

#  Warning: Running this script could possibly lock up your system!
#  If you're lucky, it will segfault before using up all available memory.
```

#### 12.12.7.2.2.3 Example: Recursion limits

```text
recursive_function ()		   
{
echo "$1"     # Makes the function do something, and hastens the segfault.
(( $1 < $2 )) && recursive_function $(( $1 + 1 )) $2;
#  As long as 1st parameter is less than 2nd,
#+ increment 1st and recurse.
}

recursive_function 1 50000  # Recurse 50,000 levels!
#  Most likely segfaults (depending on stack size, set by ulimit -m).

#  Recursion this deep might cause even a C program to segfault,
#+ by using up all the memory allotted to the stack.


echo "This will probably not print."
exit 0  # This script will not exit normally.

#  Thanks, Stéphane Chazelas.
```

#### 12.12.7.3 Recursion Without Local Variables

```text
A function may recursively call itself even without use of local variables.
```

#### 12.12.7.3.1 Example 23-15. The Fibonacci Sequence

```text
#!/bin/bash
# fibo.sh : Fibonacci sequence (recursive)
# Author: M. Cooper
# License: GPL3

# ---------------------------------
# Fibo(0) = 0
# Fibo(1) = 1
# else
#   Fibo(j) = Fibo(j-1) + Fibo(j-2)
# ---------------------------------

MAXTERM=15       # Number of terms (+1) to generate.
MINIDX=2         # If idx is less than 2, then Fibo(idx) = idx.

Fibonacci ()
{
  idx=$1   # Doesn't need to be local. Why not?
  if [ "$idx" -lt "$MINIDX" ]
  then
    echo "$idx"  # First two terms are 0 1 ... see above.
  else
    (( --idx ))  # j-1
    term1=$( Fibonacci $idx )   #  Fibo(j-1)

    (( --idx ))  # j-2
    term2=$( Fibonacci $idx )   #  Fibo(j-2)

    echo $(( term1 + term2 ))
  fi
  #  An ugly, ugly kludge.
  #  The more elegant implementation of recursive fibo in C
  #+ is a straightforward translation of the algorithm in lines 7 - 10.
}

for i in $(seq 0 $MAXTERM)
do  # Calculate $MAXTERM+1 terms.
  FIBO=$(Fibonacci $i)
  echo -n "$FIBO "
done
# 0 1 1 2 3 5 8 13 21 34 55 89 144 233 377 610
# Takes a while, doesn't it? Recursion in a script is slow.

echo

exit 0
```

#### 12.12.7.3.2 Example 23-16. The Towers of Hanoi

```text
#! /bin/bash
#
# The Towers Of Hanoi
# Bash script
# Copyright (C) 2000 Amit Singh. All Rights Reserved.
# http://hanoi.kernelthread.com
#
# Tested under Bash version 2.05b.0(13)-release.
# Also works under Bash version 3.x.
#
#  Used in "Advanced Bash Scripting Guide"
#+ with permission of script author.
#  Slightly modified and commented by ABS author.

#=================================================================#
#  The Tower of Hanoi is a mathematical puzzle attributed to
#+ Edouard Lucas, a nineteenth-century French mathematician.
#
#  There are three vertical posts set in a base.
#  The first post has a set of annular rings stacked on it.
#  These rings are disks with a hole drilled out of the center,
#+ so they can slip over the posts and rest flat.
#  The rings have different diameters, and they stack in ascending
#+ order, according to size.
#  The smallest ring is on top, and the largest on the bottom.
#
#  The task is to transfer the stack of rings
#+ to one of the other posts.
#  You can move only one ring at a time to another post.
#  You are permitted to move rings back to the original post.
#  You may place a smaller ring atop a larger one,
#+ but *not* vice versa.
#  Again, it is forbidden to place a larger ring atop a smaller one.
#
#  For a small number of rings, only a few moves are required.
#+ For each additional ring,
#+ the required number of moves approximately doubles,
#+ and the "strategy" becomes increasingly complicated.
#
#  For more information, see http://hanoi.kernelthread.com
#+ or pp. 186-92 of _The Armchair Universe_ by A.K. Dewdney.
#
#
#         ...                   ...                    ...
#         | |                   | |                    | |
#        _|_|_                  | |                    | |
#       |_____|                 | |                    | |
#      |_______|                | |                    | |
#     |_________|               | |                    | |
#    |___________|              | |                    | |
#   |             |             | |                    | |
# .--------------------------------------------------------------.
# |**************************************************************|
#          #1                   #2                      #3
#
#=================================================================#


E_NOPARAM=66  # No parameter passed to script.
E_BADPARAM=67 # Illegal number of disks passed to script.
Moves=        # Global variable holding number of moves.
              # Modification to original script.

dohanoi() {   # Recursive function.
    case $1 in
    0)
        ;;
    *)
        dohanoi "$(($1-1))" $2 $4 $3
        echo move $2 "-->" $3
        ((Moves++))          # Modification to original script.
        dohanoi "$(($1-1))" $4 $3 $2
        ;;
    esac
}

case $# in
    1) case $(($1>0)) in     # Must have at least one disk.
       1)  # Nested case statement.
           dohanoi $1 1 3 2
           echo "Total moves = $Moves"   # 2^n - 1, where n = # of disks.
           exit 0;
           ;;
       *)
           echo "$0: illegal value for number of disks";
           exit $E_BADPARAM;
           ;;
       esac
    ;;
    *)
       echo "usage: $0 N"
       echo "       Where \"N\" is the number of disks."
       exit $E_NOPARAM;
       ;;
esac

# Exercises:
# ---------
# 1) Would commands beyond this point ever be executed?
#    Why not? (Easy)
# 2) Explain the workings of the workings of the "dohanoi" function.
#    (Difficult -- see the Dewdney reference, above.)
```
