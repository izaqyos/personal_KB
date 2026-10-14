---
type: reference
title: bash versions features
description: "Features introduced in bash versions 1, 2 and later."
tags: [bash, shell, legacy, reference, comparison]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#21"
---

# bash versions features , tags: bash versions features

[↑ KB_bash](/bash/kb-bash/README.md)

## 21.1 bash version 1

## 21.2 bash version 2

```text
https://tldp.org/LDP/abs/html/bash2.html
```

### 21.2.1 String expansion.

```text
# Introduced with version 2 of Bash.

#  Strings of the form $'xxx'
#+ have the standard escaped characters interpreted. 

echo $'Ringing bell 3 times \a \a \a'
     # May only ring once with certain terminals.
     # Or ...
     # May not ring at all, depending on terminal settings.
echo $'Three form feeds \f \f \f'
echo $'10 newlines \n\n\n\n\n\n\n\n\n\n'
echo $'\102\141\163\150'
     #   B   a   s   h
     # Octal equivalent of characters.
```

### 21.2.2 Indirect variable referencing.

```text
# This has a few of the attributes of references in C++.


a=letter_of_alphabet
letter_of_alphabet=z

echo "a = $a"           # Direct reference.

echo "Now a = ${!a}"    # Indirect reference.
#  The ${!variable} notation is more intuitive than the old
#+ eval var1=\$$var2

echo

t=table_cell_3
table_cell_3=24
echo "t = ${!t}"                      # t = 24
table_cell_3=387
echo "Value of t changed to ${!t}"    # 387
# No 'eval' necessary.

#  This is useful for referencing members of an array or table,
#+ or for simulating a multi-dimensional array.
#  An indexing option (analogous

Simple database application, using indirect variable referencing

#!/bin/bash
# resistor-inventory.sh
# Simple database / table-lookup application.

# ============================================================== #
# Data

B1723_value=470                                   # Ohms
B1723_powerdissip=.25                             # Watts
B1723_colorcode="yellow-violet-brown"             # Color bands
B1723_loc=173                                     # Where they are
B1723_inventory=78                                # How many

B1724_value=1000
B1724_powerdissip=.25
B1724_colorcode="brown-black-red"
B1724_loc=24N
B1724_inventory=243

B1725_value=10000
B1725_powerdissip=.125
B1725_colorcode="brown-black-orange"
B1725_loc=24N
B1725_inventory=89

# ============================================================== #


echo

PS3='Enter catalog number: '

echo

select catalog_number in "B1723" "B1724" "B1725"
do
  Inv=${catalog_number}_inventory
  Val=${catalog_number}_value
  Pdissip=${catalog_number}_powerdissip
  Loc=${catalog_number}_loc
  Ccode=${catalog_number}_colorcode

  echo
  echo "Catalog number $catalog_number:"
  # Now, retrieve value, using indirect referencing.
  echo "There are ${!Inv} of  [${!Val} ohm / ${!Pdissip} watt]\
  resistors in stock."  #        ^             ^
  # As of Bash 4.2, you can replace "ohm" with \u2126 (using echo -e).
  echo "These are located in bin # ${!Loc}."
  echo "Their color code is \"${!Ccode}\"."

  break
done

echo; echo

# Exercises:
# ---------
# 1) Rewrite this script to read its data from an external file.
# 2) Rewrite this script to use arrays,
#+   rather than indirect variable referencing.
#    Which method is more straightforward and intuitive?
#    Which method is easier to code?


# Notes:
# -----
#  Shell scripts are inappropriate for anything except the most simple
#+ database applications, and even then it involves workarounds and kludges.
#  Much better is to use a language with native support for data structures,
#+ such as C++ or Java (or even Perl).

Using arrays and other miscellaneous trickery to deal four random hands from a deck of cards

#!/bin/bash
# cards.sh

# Deals four random hands from a deck of cards.

UNPICKED=0
PICKED=1

DUPE_CARD=99

LOWER_LIMIT=0
UPPER_LIMIT=51
CARDS_IN_SUIT=13
CARDS=52

declare -a Deck
declare -a Suits
declare -a Cards
#  It would have been easier to implement and more intuitive
#+ with a single, 3-dimensional array.
#  Perhaps a future version of Bash will support multidimensional arrays.


initialize_Deck ()
{
i=$LOWER_LIMIT
until [ "$i" -gt $UPPER_LIMIT ]
do
  Deck[i]=$UNPICKED   # Set each card of "Deck" as unpicked.
  let "i += 1"
done
echo
}

initialize_Suits ()
{
Suits[0]=C #Clubs
Suits[1]=D #Diamonds
Suits[2]=H #Hearts
Suits[3]=S #Spades
}

initialize_Cards ()
{
Cards=(2 3 4 5 6 7 8 9 10 J Q K A)
# Alternate method of initializing an array.
}

pick_a_card ()
{
card_number=$RANDOM
let "card_number %= $CARDS" # Restrict range to 0 - 51, i.e., 52 cards.
if [ "${Deck[card_number]}" -eq $UNPICKED ]
then
  Deck[card_number]=$PICKED
  return $card_number
else  
  return $DUPE_CARD
fi
}

parse_card ()
{
number=$1
let "suit_number = number / CARDS_IN_SUIT"
suit=${Suits[suit_number]}
echo -n "$suit-"
let "card_no = number % CARDS_IN_SUIT"
Card=${Cards[card_no]}
printf %-4s $Card
# Print cards in neat columns.
}

seed_random ()  # Seed random number generator.
{               # What happens if you don't do this?
seed=`eval date +%s`
let "seed %= 32766"
RANDOM=$seed
} # Consider other methods of seeding the random number generator.

deal_cards ()
{
echo

cards_picked=0
while [ "$cards_picked" -le $UPPER_LIMIT ]
do
  pick_a_card
  t=$?

  if [ "$t" -ne $DUPE_CARD ]
  then
    parse_card $t

    u=$cards_picked+1
    # Change back to 1-based indexing, temporarily. Why?
    let "u %= $CARDS_IN_SUIT"
    if [ "$u" -eq 0 ]   # Nested if/then condition test.
    then
     echo
     echo
    fi                  # Each hand set apart with a blank line.

    let "cards_picked += 1"
  fi  
done  

echo

return 0
}


# Structured programming:
# Entire program logic modularized in functions.

#===============
seed_random
initialize_Deck
initialize_Suits
initialize_Cards
deal_cards
#===============

exit



# Exercise 1:
# Add comments to thoroughly document this script.

# Exercise 2:
# Add a routine (function) to print out each hand sorted in suits.
# You may add other bells and whistles if you like.

# Exercise 3:
# Simplify and streamline the logic of the script.
```

### 21.2.3 forEach in bash

```text
$ select n in 1 2 3 ; do echo $n; break; done
1) 1
2) 2
3) 3
#? ^C
        21.2.4
```

## 21.3 bash version 3

```text
On July 27, 2004, Chet Ramey released version 3 of Bash. This update fixed quite a number of bugs and added new features.

Some of the more important added features:
```

### 21.3.1 A new, more generalized {a..z} brace expansion operator.

#### 21.3.1.1 my examples

```text
$ for i in {1..5}; do echo $i; done
1
2
3
4
5
$ echo {1..10}
1 2 3 4 5 6 7 8 9 10
$ echo {a..z}
a b c d e f g h i j k l m n o p q r s t u v w x y z
$ echo {10..1}
10 9 8 7 6 5 4 3 2 1
$ echo {z..a}
z y x w v u t s r q p o n m l k j i h g f e d c b a
$ echo {Z..a}
Z [  ] ^ _ ` a
$ echo "number #"{1..10}
number #1 number #2 number #3 number #4 number #5 number #6 number #7 number #8 number #9 number #10
```

#### 21.3.1.2 from source

```text
#!/bin/bash

for i in {1..10}
#  Simpler and more straightforward than
#+ for i in $(seq 10)
do
  echo -n "$i "
done

echo

# 1 2 3 4 5 6 7 8 9 10



# Or just . . .

echo {a..z}    #  a b c d e f g h i j k l m n o p q r s t u v w x y z
echo {e..m}    #  e f g h i j k l m
echo {z..a}    #  z y x w v u t s r q p o n m l k j i h g f e d c b a
               #  Works backwards, too.
echo {25..30}  #  25 26 27 28 29 30
echo {3..-2}   #  3 2 1 0 -1 -2
echo {X..d}    #  X Y Z [  ] ^ _ ` a b c d
               #  Shows (some of) the ASCII characters between Z and a,
               #+ but don't rely on this type of behavior because . . .
echo {]..a}    #  {]..a}
               #  Why?


# You can tack on prefixes and suffixes.
echo "Number #"{1..4}, "..."
     # Number #1, Number #2, Number #3, Number #4, ...


# You can concatenate brace-expansion sets.
echo {1..3}{x..z}" +" "..."
     # 1x + 1y + 1z + 2x + 2y + 2z + 3x + 3y + 3z + ...
     # Generates an algebraic expression.
     # This could be used to find permutations.

# You can nest brace-expansion sets.
echo {{a..c},{1..3}}
     # a b c 1 2 3
     # The "comma operator" splices together strings.

# ########## ######### ############ ########### ######### ###############
# Unfortunately, brace expansion does not lend itself to parameterization.
var1=1
var2=5
echo {$var1..$var2}   # {1..5}


# Yet, as Emiliano G. points out, using "eval" overcomes this limitation.

start=0
end=10
for index in $(eval echo {$start..$end})
do
  echo -n "$index "   # 0 1 2 3 4 5 6 7 8 9 10 
done

echo

        21.3.2 The ${!array[@]} operator, which expands to all the indices of a given array. iterate array
my example:
$ arr=(a b c d)
$ echo ${arr[0]}
a
$ for i in {0..3}; do echo ${arr[i]}; done
a
b
c
d
$ for i in ${!arr[@]}; do echo ${arr[i]}; done
a
b
c
d
source:
#!/bin/bash

Array=(element-zero element-one element-two element-three)

echo ${Array[0]}   # element-zero
                   # First element of array.

echo ${!Array[@]}  # 0 1 2 3
                   # All the indices of Array.

for i in ${!Array[@]}
do
  echo ${Array[i]} # element-zero
                   # element-one
                   # element-two
                   # element-three
                   #
                   # All the elements in Array.
done


        21.3.3 The =~ Regular Expression matching operator within a double brackets test expression. (Perl has a similar operator.)
my-example:
$ tstr='a test string'
$ echo $tstr
a test string
$ if [[ "$tstr" =~ ^a.*ring$ ]]; then echo "match found"; fi
match found

source:
#!/bin/bash

variable="This is a fine mess."

echo "$variable"

# Regex matching with =~ operator within [[ double brackets ]].
if [[ "$variable" =~ T.........fin*es* ]]
# NOTE: As of version 3.2 of Bash, expression to match no longer quoted.
then
  echo "match found"
      # match found
fi

Or, more usefully:

#!/bin/bash

input=$1


if [[ "$input" =~ "[0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]" ]]
#                 ^ NOTE: Quoting not necessary, as of version 3.2 of Bash.
# NNN-NN-NNNN (where each N is a digit).
then
  echo "Social Security number."
  # Process SSN.
else
  echo "Not a Social Security number!"
  # Or, ask for corrected input.
fi
```

## 21.4 bash version 4

```text
Chet Ramey announced Version 4 of Bash on the 20th of February, 2009
```

### 21.4.1 Associative arrays.

```text
An associative array can be thought of as a set of two linked arrays -- one holding the data, and the other the keys that index the individual elements of the data array
$ cat !$
cat associative_arrays_demo.sh
declare -A ages

ages["Yosi"]=45
ages["Dana"]=44
ages["Alice"]=15
ages["Bob"]=10
ages["Carol"]=7
ages["Eve"]=6

echo "Yosi's ages is ${ages[yosi]}"
echo "Dana's ages is ${ages[Dana]}"
echo "Alice's ages is ${ages[Alice]}"
echo "Bob's ages is ${ages[Bob]}"
echo "Carol's ages is ${ages[Carol]}"
echo "Eve's ages is ${ages[Eve]}"
```

### 21.4.2 Enhancements to the case construct: the ;;& and ;& terminators.

```text
Example 37-7. Testing characters

#!/bin/bash4

test_char ()
{
  case "$1" in
    [[:print:]] )  echo "$1 is a printable character.";;&       # |
    # The ;;& terminator continues to the next pattern test.      |
    [[:alnum:]] )  echo "$1 is an alpha/numeric character.";;&  # v
    [[:alpha:]] )  echo "$1 is an alphabetic character.";;&     # v
    [[:lower:]] )  echo "$1 is a lowercase alphabetic character.";;&
    [[:digit:]] )  echo "$1 is an numeric character.";&         # |
    # The ;& terminator executes the next statement ...         # |
    %%%@@@@@    )  echo "********************************";;    # v
#   ^^^^^^^^  ... even with a dummy pattern.
  esac
}

echo

test_char 3
# 3 is a printable character.
# 3 is an alpha/numeric character.
# 3 is an numeric character.
# ********************************
echo

test_char m
# m is a printable character.
# m is an alpha/numeric character.
# m is an alphabetic character.
# m is a lowercase alphabetic character.
echo

test_char /
# / is a printable character.

echo

# The ;;& terminator can save complex if/then conditions.
# The ;& is somewhat less useful.
```

### 21.4.3 The new coproc builtin enables two parallel processes to communicate and interact.

```text
        As Chet Ramey states in the Bash FAQ [2] , ver. 4.01:

    There is a new 'coproc' reserved word that specifies a coprocess:
    an asynchronous command run with two pipes connected to the creating
    shell. Coprocs can be named. The input and output file descriptors
    and the PID of the coprocess are available to the calling shell in
    variables with coproc-specific names.

    George Dimitriu explains,
    "... coproc ... is a feature used in Bash process substitution,
    which now is made publicly available."
    This means it can be explicitly invoked in a script, rather than
    just being a behind-the-scenes mechanism used by Bash.

Coprocesses use file descriptors. File descriptors enable processes and pipes to communicate.

#!/bin/bash4
# A coprocess communicates with a while-read loop.


coproc { cat mx_data.txt; sleep 2; }
#                         ^^^^^^^
# Try running this without "sleep 2" and see what happens.

while read -u ${COPROC[0]} line    #  ${COPROC[0]} is the
do                                 #+ file descriptor of the coprocess.
  echo "$line" | sed -e 's/line/NOT-ORIGINAL-TEXT/'
done

kill $COPROC_PID                   #  No longer need the coprocess,
                                   #+ so kill its PID.

But, be careful!

#!/bin/bash4

echo; echo
a=aaa
b=bbb
c=ccc

coproc echo "one two three"
while read -u ${COPROC[0]} a b c;  #  Note that this loop
do                                 #+ runs in a subshell.
  echo "Inside while-read loop: ";
  echo "a = $a"; echo "b = $b"; echo "c = $c"
  echo "coproc file descriptor: ${COPROC[0]}"
done 

# a = one
# b = two
# c = three
# So far, so good, but ...

echo "-----------------"
echo "Outside while-read loop: "
echo "a = $a"  # a =
echo "b = $b"  # b =
echo "c = $c"  # c =
echo "coproc file descriptor: ${COPROC[0]}"
echo
#  The coproc is still running, but ...
#+ it still doesn't enable the parent process
#+ to "inherit" variables from the child process, the while-read loop.

#  Compare this to the "badread.sh" script.

Caution	
The coprocess is asynchronous, and this might cause a problem. It may terminate before another process has finished communicating with it.

#!/bin/bash4

coproc cpname { for i in {0..10}; do echo "index = $i"; done; }
#      ^^^^^^ This is a *named* coprocess.
read -u ${cpname[0]}
echo $REPLY         #  index = 0
echo ${COPROC[0]}   #+ No output ... the coprocess timed out
#  after the first loop iteration.



# However, George Dimitriu has a partial fix.

coproc cpname { for i in {0..10}; do echo "index = $i"; done; sleep 1;
echo hi > myo; cat - >> myo; }
#       ^^^^^ This is a *named* coprocess.

echo "I am main"$'\04' >&${cpname[1]}
myfd=${cpname[0]}
echo myfd=$myfd

### while read -u $myfd
### do
###   echo $REPLY;
### done

echo $cpname_PID

#  Run this with and without the commented-out while-loop, and it is
#+ apparent that each process, the executing shell and the coprocess,
#+ waits for the other to finish writing in its own write-enabled pipe.
```

### 21.4.4 Parameter substitution gets case-modification operators.

```text
#!/bin/bash4

var=veryMixedUpVariable
echo ${var}            # veryMixedUpVariable
echo ${var^}           # VeryMixedUpVariable
#         *              First char --> uppercase.
echo ${var^^}          # VERYMIXEDUPVARIABLE
#         **             All chars  --> uppercase.
echo ${var,}           # veryMixedUpVariable
#         *              First char --> lowercase.
echo ${var,,}          # verymixedupvariable
#         **             All chars  --> lowercase.
```

### 21.4.5 The declare builtin now accepts the -l lowercase and -c capitalize options.

```text
#!/bin/bash4

declare -l var1            # Will change to lowercase
var1=MixedCaseVARIABLE
echo "$var1"               # mixedcasevariable
# Same effect as             echo $var1 | tr A-Z a-z

declare -c var2            # Changes only initial char to uppercase.
var2=originally_lowercase
echo "$var2"               # Originally_lowercase
# NOT the same effect as     echo $var2 | tr a-z A-Z
```

### 21.4.6 Brace expansion has more options.

```text
Increment/decrement, specified in the final term within braces.

#!/bin/bash4

echo {40..60..2}
# 40 42 44 46 48 50 52 54 56 58 60
# All the even numbers, between 40 and 60.

echo {60..40..2}
# 60 58 56 54 52 50 48 46 44 42 40
# All the even numbers, between 40 and 60, counting backwards.
# In effect, a decrement.
echo {60..40..-2}
# The same output. The minus sign is not necessary.

# But, what about letters and symbols?
echo {X..d}
# X Y Z [  ] ^ _ ` a b c d
# Does not echo the \ which escapes a space.

Zero-padding, specified in the first term within braces, prefixes each term in the output with the same number of zeroes.

bash4$ echo {010..15}
010 011 012 013 014 015


bash4$ echo {000..10}
000 001 002 003 004 005 006 007 008 009 010
```

### 21.4.7 Substring extraction on positional parameters now starts with $0 as the zero-index.

```text
#!/bin/bash
# show-params.bash
# Requires version 4+ of Bash.

# Invoke this scripts with at least one positional parameter.

E_BADPARAMS=99

if [ -z "$1" ]
then
  echo "Usage $0 param1 ..."
  exit $E_BADPARAMS
fi

echo ${@:0}

# bash3 show-params.bash4 one two three
# one two three

# bash4 show-params.bash4 one two three
# show-params.bash4 one two three

# $0                $1  $2  $3
```

### 21.4.8 The new ** globbing operator matches filenames and directories recursively.

```text
$ shopt -s globstar
# Must enable globstar, otherwise ** doesn't work.  # The globstar shell option is new to version 4 of Bash.

$ for file in *; do echo $file; done
CODEOWNERS
..
renovate.json
$ for file in **; do echo $file; done
CODEOWNERS
...
src/app/app.controller.ts
```

### 21.4.9 command_not_found_handle

```text
$ command_not_found_handle ()
{ # Accepts implicit parameters.
  echo "The following command is not valid: \""$1\"""
  echo "With the following argument(s): \""$2\"" \""$3\"""   # $4, $5 ...
} 
$ ccc 
The following command is not valid: "ccc"
With the following argument(s): "" ""
$ ddd 111
The following command is not valid: "ddd"
With the following argument(s): "111" ""


        21.4.10 Here documents embedded in $( ... ) command substitution constructs may terminate with a simple ).

#!/bin/bash
# here-commsub.sh
# Requires Bash version -ge 4.1 ...

multi_line_var=$( cat <<ENDxxx
------------------------------
This is line 1 of the variable
This is line 2 of the variable
This is line 3 of the variable
------------------------------
ENDxxx)

#  Rather than what Bash 4.0 requires:
#+ that the terminating limit string and
#+ the terminating close-parenthesis be on separate lines.

# ENDxxx
# )
$ echo $multi_line_var 
------------------------------ This is line 1 of the variable This is line 2 of the variable This is line 3 of the variable ------------------------------
```

### 21.4.11 Negative array indices permit counting backwards from the end of an array.

```text
#!/bin/bash
# neg-array.sh
# Requires Bash, version -ge 4.2.

array=( zero one two three four five )   # Six-element array.
#         0    1   2    3    4    5
#        -6   -5  -4   -3   -2   -1

# Negative array indices now permitted.
echo ${array[-1]}   # five
echo ${array[-2]}   # four
# ...
echo ${array[-6]}   # zero
# Negative array indices count backward from the last element+1.

# But, you cannot index past the beginning of the array.
echo ${array[-7]}   # array: bad array subscript


# So, what is this new feature good for?

echo "The last element in the array is "${array[-1]}""
# Which is quite a bit more straightforward than:
echo "The last element in the array is "${array[${#array[*]}-1]}""
echo

# And ...

index=0
let "neg_element_count = 0 - ${#array[*]}"
# Number of elements, converted to a negative number.

while [ $index -gt $neg_element_count ]; do
  ((index--)); echo -n "${array[index]} "
done  # Lists the elements in the array, backwards.
      # We have just simulated the "tac" command on this array.

echo

# See also neg-offset.sh.
```

### 21.4.12 Negative parameter in string-extraction construct

```text
#!/bin/bash
# Bash, version -ge 4.2
# Negative length-index in substring extraction.
# Important: It changes the interpretation of this construct!

stringZ=abcABC123ABCabc

echo ${stringZ}                              # abcABC123ABCabc
#                   Position within string:    0123456789.....
echo ${stringZ:2:3}                          #   cAB
#  Count 2 chars forward from string beginning, and extract 3 chars.
#  ${string:position:length}

#  So far, nothing new, but now ...

                                             # abcABC123ABCabc
#                   Position within string:    0123....6543210
echo ${stringZ:3:-6}                         #    ABC123
#                ^
#  Index 3 chars forward from beginning and 6 chars backward from end,
#+ and extract everything in between.
#  ${string:offset-from-front:offset-from-end}
#  When the "length" parameter is negative, 
#+ it serves as an offset-from-end parameter.

        21.4.13
```

## 21.5 bash version 5

```text
Source: https://www.shell-tips.com/bash/what-is-new-in-gnu-bash-5/ 
https://lists.gnu.org/archive/html/bug-bash/2019-01/msg00063.html
The most notable new features are several new shell variables: BASH_ARGV0,
EPOCHSECONDS, and EPOCHREALTIME. The `history' builtin can remove ranges of
history entries and understands negative arguments as offsets from the end
of the history list. There is an option to allow local variables to inherit
the value of a variable with the same name at a preceding scope. There is
a new shell option that, when enabled, causes the shell to attempt to
expand associative array subscripts only once (this is an issue when they
are used in arithmetic expressions).  The `globasciiranges' shell option
is now enabled by default; it can be set to off by default at configuration
time.
        21.5.1 
```

## 21.6 bash version 6

```text
    21.7
```
