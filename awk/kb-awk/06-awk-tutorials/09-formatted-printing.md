---
type: reference
title: Formatted Printing
description: Subsection 5.9 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.9"
---

# 5.9 Formatted Printing

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	Awk offers an alternative to the print statement, printf, which is borrowed from the C programming language. The printf statement can output a simple string just like the print statement.

    awk 'BEGIN { printf ("Hello, world\n") }'

The main difference that you will notice at the outset is that, unlike print, printf does not automatically supply a newline. You must specify it explicitly as "\n".

The full syntax of the printf statement has two parts:

    printf ( format-expression [, arguments] )

The parentheses are optional. The first part is an expression that describes the format specifications; usually this is supplied as a string constant in quotes. The second part is an argument list, such as a list of variable names, that correspond to the format specifications. A format specification is preceded by a percent sign (%) and the specifier is one of the characters shown in the next table. The two main format specifiers are s for strings and d for decimal integers.

	character 	Description
	c		ASCII character
	d 		Decimal integer
	i 		Decimal integer. (Added in POSIX)
	e 		Floating-point format ([-]d.precisione[+-]dd)
	E 		Floating-point format ([-]d.precisionE[+-]dd)
	f 		Floating-point format ([-]ddd.precision)
	g 		e or f conversion, whichever is shortest, with trailing zeros removed
	G 		E or f conversion, whichever is shortest, with trailing zeros removed
	o 		Unsigned octal value
	s 		String
	x 		Unsigned hexadecimal number. Uses a-f for 10 to 15
	X 		Unsigned hexadecimal number. Uses A-F for 10 to 15
	% 		Literal %

	output a string and a decimal value found in two different fields:
	printf("%d\t%s\n", $5, $9)
	The value of $5 is to be output, followed by a tab (\t) and $9 and then a newline (\n)

	his printf statement can be used to specify the width and alignment of output fields. A format expression can take three optional modifiers following "%" and preceding the format specifier:

    %-width.precision format-specifier

The width of the output field is a numeric value. When you specify a field width, the contents of the field will be right-justified by default. You must specify "-" to get left-justification. Thus, "%-20s" outputs a string left-justified in a field 20 characters wide. If the string is less than 20 characters, the field will be padded with whitespace to fill. In the following examples, a "|" is output to indicate the actual width of the field. The first example right-justifies the text:

    printf("|%10s|\n", "hello")

It produces:

    |     hello|

The next example left-justifies the text:

    printf("|%-10s|\n", "hello")

It produces:

    |hello     |

The precision modifier, used for decimal or floating-point values, controls the number of digits that appear to the right of the decimal point. For string values, it controls the maximum number of characters from the string that will be printed. Note that the default precision for the output of numeric values is "%.6g".

You can specify both the width and precision dynamically, via values in the printf or sprintf argument list. You do this by specifying asterisks, instead of literal values.

    printf("%*.*g\n", 5, 3, myvar);

In this example, the width is 5, the precision is 3, and the value to print will come from myvar.

The default precision used by the print statement when outputting numbers can be changed by setting the system variable OFMT. For instance, if you are using awk to write reports that contain dollar values, you might prefer to change OFMT to "%.2f".

Using the full syntax of the format expression can solve the problem with filesum of getting fields and headings properly aligned. One reason we output the file size before the filename was that the fields had a greater chance of aligning themselves if they were output in that order. The solution that printf offers us is the ability to fix the width of output fields; therefore, each field begins in the same column.
```
