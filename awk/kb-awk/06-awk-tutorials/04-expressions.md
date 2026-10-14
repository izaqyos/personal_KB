---
type: reference
title: Expressions
description: Subsection 5.4 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.4"
---

# 5.4 Expressions

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.4.1 Escape sequences

```text
	Sequence 	Description
	\a		Alert character, usually ASCII BEL character
	\b 		Backspace
	\f 		Formfeed
	\n 		Newline
	\r 		Carriage return
	\t 		Horizontal tab
	\v 		Vertical tab
	\ddd 		Character represented as 1 to 3 digit octal value
	\xhex 		Character represented as hexadecimal value
	\c 		Any literal character c (e.g., \" for ")
```

### 5.4.2 Variables

```text
			Numeric example, x = 1
			String example, x = "aa"
			String concatenation operator is space, example: z = "Hello" "World"
			The dollar sign ($) operator is used to reference fields. The following expression assigns the value of the first field of the current input record to the variable w: w = $1
```

### 5.4.3 Arithmetic Operators

```text
	Operator 	Description
	+		Addition
	- 		Subtraction
	* 		Multiplication
	/ 		Division
	% 		Modulo
	^ 		Exponentiation
	** 		Exponentiation
```

### 5.4.4 Variable assignment

```text
		Once a variable has been assigned a value, that value can be referenced using the name of the variable. The following expression adds 1 to the value of x and assigns it to the variable y: y = x + 1
So, evaluate x, add 1 to it, and put the result into the variable y. The statement: print y
prints the value of y.
```

### 5.4.5 Assignment Operators

```text
	Operator 	Description
	++		Add 1 to variable.
	-- 		Subtract 1 from variable.
	+= 		Assign result of addition.
	-= 		Assign result of subtraction.
	*= 		Assign result of multiplication.
	/= 		Assign result of division.
	%= 		Assign result of modulo.
	^= 		Assign result of exponentiation.
	**= 		Assign result of exponentiation.

	The following example counts blank lines:
	# blankLines2.awk, count blank lines
/^$/ {
        x += 1
}
 END {print "number of blank lines is: " x }
```

### 5.4.5 Calculate average

```text
		 input file looks like:
    john 85 92 78 94 88
    andrea 89 90 75 90 86
    jasper 84 88 80 92 84

	Awk script:
	# average five grades 
{ total = $2 + $3 + $4 + $5 + $6
  avg = total / 5
  print $1, avg }

  This script adds together fields 2 through 6 to get the sum total of the five grades. The value of total is divided by 5 and assigned to the variable avg. ("/" is the operator for division.) The print statement outputs the student's name and average. Note that we could have skipped the assignment of avg and instead calculated the average as part of the print statement, as follows:

    print $1, total / 5
```
