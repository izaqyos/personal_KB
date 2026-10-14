---
type: reference
title: "Chapter 34. Bash, versions 2 and 3"
description: "ABS Guide chapter 34: features added in bash versions 2 and 3."
tags: [bash, shell, legacy, book-notes, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.12.18"
---

# 12.12.18 Chapter 34. Bash, versions 2 and 3

[↑ Part 5. Advanced Topics](/bash/kb-bash/12-advanced-bash-scripting-guide/11-part-5-advanced-topics/README.md)

#### 12.12.18.1 Bash, version 2

```text
 The current version of Bash, the one you have running on your machine, is most likely version 2.xx.yy or 3.xx.yy.

bash$ echo $BASH_VERSION
3.2.25(1)-release
	      

The version 2 update of the classic Bash scripting language added array variables, [1] string and parameter expansion, and a better method of indirect variable references, among other features.

Example 34-1. String expansion

#!/bin/bash

# String expansion.
# Introduced with version 2 of Bash.

#  Strings of the form $'xxx'
#+ have the standard escaped characters interpreted. 

echo $'Ringing bell 3 times \a \a \a'
     # May only ring once with certain terminals.
     # Or ...
     # May not ring at all, depending on terminal settings.
echo $'Three form feeds \f \f \f'
echo $'10 newlines \n\n\n\n\n\n\n\n\n\n'
echo $'\102\141\163\150'   # Bash
     # Octal equivalent of characters.

exit

Example 34-2. Indirect variable references - the new way

#!/bin/bash

# Indirect variable referencing.
# This has a few of the attributes of references in C++.


a=letter_of_alphabet
letter_of_alphabet=z

echo "a = $a"           # Direct reference.

echo "Now a = ${!a}"    # Indirect reference.
# The ${!variable} notation is greatly superior to the old "eval var1=\$$var2"

echo

t=table_cell_3
table_cell_3=24
echo "t = ${!t}"                      # t = 24
table_cell_3=387
echo "Value of t changed to ${!t}"    # 387

#  This is useful for referencing members of an array or table,
#+ or for simulating a multi-dimensional array.
#  An indexing option (analogous to pointer arithmetic)
#+ would have been nice. Sigh.

exit 0

# See also, ind-ref.sh example.

Example 34-3. Simple database application, using indirect variable referencing

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

exit 0

Example 34-4. Using arrays and other miscellaneous trickery to deal four random hands from a deck of cards

#!/bin/bash

# Cards:
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
let "card_number %= $CARDS"
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
#  What are some other methods
#+ of seeding the random number generator?
}

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
    # Change back to 1-based indexing (temporarily). Why?
    let "u %= $CARDS_IN_SUIT"
    if [ "$u" -eq 0 ]   # Nested if/then condition test.
    then
     echo
     echo
    fi
    # Separate hands.

    let "cards_picked += 1"
  fi  
done  

echo

return 0
}


# Structured programming:
# Entire program logic modularized in functions.

#================
seed_random
initialize_Deck
initialize_Suits
initialize_Cards
deal_cards
#================

exit 0



# Exercise 1:
# Add comments to thoroughly document this script.

# Exercise 2:
# Add a routine (function) to print out each hand sorted in suits.
# You may add other bells and whistles if you like.

# Exercise 3:
# Simplify and streamline the logic of the script.

Notes
[1]	

Chet Ramey has promised associative arrays (a nifty Perl feature) in a future Bash release. As of version 3.2, this has not yet happened.
```

#### 12.12.18.2 Bash, version 3

```text
			On July 27, 2004, Chet Ramey released version 3 of Bash. This update fixed quite a number of bugs and added new features.

Some of the more important added features:

    *

      A new, more generalized {a..z} brace expansion operator.

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
      echo {z..a}    #  z y x w v u t s r q p o n m l k j i h g f e d c b a
                     #  Works backwards, too.
      echo {3..-2}   #  3 2 1 0 -1 -2
      echo {X..d}    #  X Y Z [  ] ^ _ ` a b c d
                     #  Shows (some of) the ASCII characters between Z and a,
                     #+ but don't rely on this type of behavior because . . .
      echo {]..a}    #  {]..a}
                     #  Why?

    *

      The ${!array[@]} operator, which expands to all the indices of a given array.

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

    *

      The =~ Regular Expression matching operator within a double brackets test expression. (Perl has a similar operator.)

      #!/bin/bash

      variable="This is a fine mess."

      echo "$variable"

      # Regex matching with =~ operator within [[ double brackets ]].
      if [[ "$variable" =~ "T.........fin*es*" ]]
      #                    ^                 ^
      # NOTE: Quoting not necessary, as of version 3.2 of Bash.
      then
        echo "match found"
            # match found
      fi

      Or, more usefully:

      #!/bin/bash

      input=$1


      if [[ "$input" =~ "[1-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9][0-9][0-9]" ]]
      #                 ^ NOTE: Quoting not necessary, as of version 3.2 of Bash.
      # NNN-NN-NNNN (where each N is a digit). Initial digit must not be 0.
      then
        echo "Social Security number."
        # Process SSN.
      else
        echo "Not a Social Security number!"
        # Or, ask for corrected input.
      fi

      For additional examples of using the =~ operator, see Example A-31, Example 18-14, Example A-37, and Example A-26.
    *

      The new set -o pipefail option is useful for debugging pipes. If this option is set, then the exit status of a pipe is the exit status of the last command in the pipe to fail (return a non-zero value), rather than the actual final command in the pipe.

      See Example 15-43.

Caution	

The update to version 3 of Bash breaks a few scripts that worked under earlier versions. Test critical legacy scripts to make sure they still work!

As it happens, a couple of the scripts in the Advanced Bash Scripting Guide had to be fixed up (see Example A-21 and Example 9-4, for instance).
			
"
```

#### 12.12.18.2.1 Bash, version 3.1

```text
The version 3.1 update of Bash introduces a number of bugfixes and a few minor changes.

    *

      The += operator is now permitted in in places where previously only the = assignment operator was recognized.

      a=1
      echo $a        # 1

      a+=5           # Won't work under versions of Bash earlier than 3.1.
      echo $a        # 15

      a+=Hello
      echo $a        # 15Hello

      Here, += functions as a string concatenation operator. Note that its behavior in this particular context is different than within a let construct.

      a=1
      echo $a        # 1

      let a+=5       # Integer arithmetic, rather than string concatenation.
      echo $a        # 6

      let a+=Hello   # Doesn't "add" anything to a.
      echo $a        # 6
```

#### 12.12.18.2.2 Bash, version 3.2

```text
This is pretty much a bugfix update.

    *

      In global parameter substitutions, the pattern no longer anchors at the start of the string.
    *

      The --wordexp option disables process substitution.
    *

      The =~ Regular Expression match operator no longer requires quoting of the pattern within [[ ... ]].

      Caution	

      In fact, quoting in this context is not advisable as it may cause regex evaluation to fail. See the Ubuntu Bug List and Wikinerds on Bash syntax.

      With Bash version 3.2.25(1), running on Fedora Core, quoting works, but do not assume this will be the case on your machine.
```
