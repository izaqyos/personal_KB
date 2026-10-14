---
type: reference
title: arithmetic
description: Section 1 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#1"
---

# arithmetic

[↑ KB_bash](/bash/kb-bash/README.md)

## 1.1 expansion.

```text
	$ echo $(( 2 + 3 * 5 ))
	returns 17.
```

## 1.2 floating point arithmetic bash

### 1.2.1 via bc

```text
 If we want to add two floating point numbers say 2.5 and 3.75, then simply the string “2.5+3.75″ should be feed into the input of bc and you are done. Check out the example below:

echo "2.5+3.75" | bc
| 6.25

Above the first line shows the input to bash, and the second line is the output.

As now you have understood the basic trick, that is so simply feed in any arithmetic expression into a program’s input, who understands it, to get the answer from it, i will present some more examples.
Examples

Now lets say you want to get a square root of a number (floating point), say 641 . The function of bc which performs square root is sqrt. And as we are performing a math function we need to tell bc to turn on its standard math library. This can be done just by including the -l switch to bc. So the command will be as below:

echo "sqrt(641)" | bc -l
| 25.31797780234432546177

Till now you should have guessed that we can also use the shell variables in the echo with double quotes to enable variable value. For example check the command sequence below:

x=215
echo "sqrt($x)" | bc -l

And yes now the command performs the square root of the variable “x” , which can be assigned whatever.

The below nano shell script performs floating point addition operation using bc.

01	     
02	#!/bin/bash
03	echo "Enter a floating point number: "
04	read a
05	 
06	echo "Enter another floating point number: "
07	read b
08	 
09	echo "Addition: "
10	echo "$a+$b" | bc

Integer powers of a floating point could be calculated with the “^” operator. Below “a” is a floating point and “b” is integer.

echo "$a^$b" | bc -l

So it is simple. Now some trigonometric functions. In bc the s is the sine function, c is the cos function, and the a is the arctangent function (atan). And as normal the angles are to be passed as radians, but we can always do a degree to radian conversion. So we have the basic two. The below shell script demonstrates the calculation of different trigonometric vales.

01	#!/bin/bash
02	echo "Enter angle in degree: "
03	read deg
04	 
05	# Note: Pi calculation
06	# tan(pi/4) = 1
07	# atan(1) = pi/4 and
08	# pi = 4*atan(1)
09	 
10	pi=`echo "4*a(1)" | bc -l`
11	rad=`echo "$deg*($pi/180)" | bc -l`
12	 
13	echo "$deg Degree = $rad Radian"
14	 
15	echo "Sin($deg): "
16	echo "s($rad)" | bc -l
17	 
18	echo "Cos($deg): "
19	echo "c($rad)" | bc -l
20	 
21	echo "Tan($deg): "
22	echo "s($rad)/c($rad)" | bc -l

The natural logarithmic function in bc is l. So to calculate natural logarithm and ten base logarithm we would do the following:

1	#!/bin/bash
2	echo "Enter value: "
3	read x
4	 
5	echo "Natural Log: ln($x) :"
6	echo "l($x)" | bc -l
7	 
8	echo "Ten Base Log: log($x) :"
9	echo "l($x)/l(10)" | bc -l

And similarly the exponential function could be implemented by calling the e function in bc.

You can adjust the precision of the value which the math functions calculate be assigning the decimal point accuracy in the scale variable within bc. For an example if you want square root of a number up to 2 decimal places, you should do as below, where “x” is the variable.

echo "scale=2;sqrt($x)" | bc -l

Note that it simply truncates the decimal places, so the scaled value is not the approximation but only truncated. For example 6.74536878161602073277 in 2 decimal places would be simple truncated to 6.74, and not 6.75
More

And now you can write a function in bc syntax and also make it use. As presented below, a factorial function:

01	#!/bin/bash
02	 
03	echo "Enter an integer: "
04	read n
05	 
06	# Below we define the factorial function in bc syntax
07	fact="define f (x) {
08	i=x
09	fact=1
10	while (i > 1) {
11	fact=fact*i
12	i=i-1
13	}
14	return fact
15	}"
16	 
17	# Below we pass the function defined above, and call it with n as a parameter and pipe it to bc
18	factorial=`echo "$fact;f($n)" | bc -l`
19	 
20	echo "$n! = $factorial"

Clearly any other functions written in bc syntax could be used
Resources

Check out more functions and operators and all the details of bc by visiting the site here: http://www.gnu.org/software/bc/manual/html_mono/bc.html , and also check the man page and info pages by executing:

man bc
info bc

		1.2.2
```

## 1.3 Floating Point Comparison in Shell Script

```text
		1.3.1 Can you please suggest to me the syntax for doing floating point comparison in a Bash script? 
		I would ideally like to use it as part of an if statement. 
		Here is a small code snippet :

key1="12.3"
result="12.2"

if (( $result <= $key1 ))
then
    # some code here
fi


-> bash doesn't do floats, use awk

key1=12.3
result=12.5
var=$(awk 'BEGIN{ print "'$key1'"<"'$result'" }')    
# or var=$(awk -v key=$key1 -v result=$result 'BEGIN{print result<key?1:0}')
# or var=$(awk 'BEGIN{print "'$result'"<"'$key1'"?1:0}')
# or 
if [ "$var" -eq 1 ];then
  echo "do something"
else
  echo "result more than key"
fi

there are other shells that can do floats, like zsh or ksh, you might like to try using them as well

-> 
bc is your friend:

key1="12.3"
result="12.2"
if [ $(bc <<< "$result <= $key1") -eq 1 ]
    then
    # some code here
fi

Note the somewhat obscure here string (<<<) notation, as a nice alternative to echo "$result <= $key1" | bc.

Also, the un-bash-like bc prints 1 for true and 0 for false.
```

### 1.3.2 My example

```text
# if [ $( bc <<< " $(( $(df  /opt | sed -n '3p' | awk '{print $1}') * 1024 ))   > $( echo "$( du -s /opt/CSCOacs/patches/ | awk '{print $1}' )  * 1.1 " | bc ) " ) -eq 1 ]   ; then echo a ; else echo b; fi
a
# if [ $( bc <<< " $(( $(df  /opt | sed -n '3p' | awk '{print $1}') * 1024 ))   > $( echo "$( du -s /opt/CSCOacs/patches/ | awk '{print $1}' )  * 1000 " | bc ) " ) -eq 1 ]   ; then echo a ; else echo b; fi
a
# if [ $( bc <<< " $(( $(df  /opt | sed -n '3p' | awk '{print $1}') * 1024 ))   > $( echo "$( du -s /opt/CSCOacs/patches/ | awk '{print $1}' )  * 10000 " | bc ) " ) -eq 1 ]   ; then echo a ; else echo b; fi
a
# if [ $( bc <<< " $(( $(df  /opt | sed -n '3p' | awk '{print $1}') * 1024 ))   > $( echo "$( du -s /opt/CSCOacs/patches/ | awk '{print $1}' )  * 100000 " | bc ) " ) -eq 1 ]   ; then echo a ; else echo b; fi
b

		1.3.3
```

## 1.4 Arithmetic Expansion

```text
http://tldp.org/LDP/abs/html/arithexp.html
Arithmetic expansion provides a powerful tool for performing (integer) arithmetic operations in scripts. Translating a string into a numerical expression is relatively straightforward using backticks, double parentheses, or let.

Variations

Arithmetic expansion with backticks (often used in conjunction with expr)
z=`expr $z + 3`          # The 'expr' command performs the expansion.

Arithmetic expansion with double parentheses, and using let
The use of backticks (backquotes) in arithmetic expansion has been superseded by double parentheses -- ((...)) and $((...)) -- and also by the very convenient let construction.

z=$(($z+3))
z=$((z+3))                                  #  Also correct.
                                            #  Within double parentheses,
                                            #+ parameter dereferencing
                                            #+ is optional.

# $((EXPRESSION)) is arithmetic expansion.  #  Not to be confused with
                                            #+ command substitution.



# You may also use operations within double parentheses without assignment.

  n=0
  echo "n = $n"                             # n = 0

  (( n += 1 ))                              # Increment.
# (( $n += 1 )) is incorrect!
  echo "n = $n"                             # n = 1


let z=z+3
let "z += 3"  #  Quotes permit the use of spaces in variable assignment.
              #  The 'let' operator actually performs arithmetic evaluation,
              #+ rather than expansion.

	1.5
	id=__bash_prompt_history1
```
