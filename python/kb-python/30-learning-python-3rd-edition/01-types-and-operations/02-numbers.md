---
type: reference
title: Numbers
description: Subsection 30.1.2 of Types and Operations.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#30.1.2"
---

# 30.1.2. Numbers

[↑ Types and Operations](/python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/README.md)

```text
This chapter begins our in-depth tour of the Python language. In Python, data takes the form of objects--either built-in objects that Python provides, or objects we create using Python tools and other languages, such as C. In fact, objects are the basis of every Python program you will ever write. Because they are the most fundamental notion in Python programming, objects are also our first focus in this book.

In the preceding chapter, we took a quick pass over Python's core object types. Although essential terms were introduced in that chapter, we avoided too many specifics in the interest of space. Here, we'll begin a more careful second look at data type concepts to fill in some of the details we glossed over earlier. We'll also explore some types related to numbers, such as sets and Booleans. Let's get started by exploring our first data type category: the Python number.
```

#### 30.1.2.1 Python Numeric Types

```text
Python's number types are fairly typical and will probably seem familiar if you've used almost any other programming language in the past. They can be used to keep track of your bank balance, the distance to Mars, the number of visitors to your web site, and just about any other numeric quantity.

In Python, numbers are not really a single object type, but a category of similar types. Python supports the usual numeric types (integers and floating points), as well as literals for creating numbers and expressions for processing them. In addition, Python provides more advanced numeric programming support, including a complex number type, an unlimited-precision integer type, a fixed-precision decimal type, sets and Booleans, and a variety of numeric tool libraries. The next few sections give an overview of the numeric support in Python.
```

#### 30.1.2.1.1 Numeric Literals

```text
Among its basic types, Python provides the usual numeric types: it supports integer and floating-point numbers (with a fractional part), and all their associated syntax and operations. Like the C language, Python also allows you to write integers using hexadecimal and octal literals. But, unlike C, Python additionally offers a complex number type, as well as a long integer type with unlimited precision (it can grow to have as many digits as your memory space allows). Table 5-1 shows what Python's numeric types look like when written out in a program (that is, as literals).

|Table 5-1. Numeric literals
|Literal 	Interpretation
|1234, -24, 0 	Normal integers (C longs)
|9999999999999999999L 	Long integers (unlimited size)
|1.23, 3.14e-10, 4E210, 4.0e+210 	Floating-point numbers (C doubles)
|0177, 0x9ff, 0XFF 	Octal and hex literals for integers
|3+4j, 3.0+4.0j, 3J 	Complex number literals

In general, Python's numeric types are straightforward, but a few coding concepts are worth highlighting here:


Integer and floating-point literals

    Integers are written as strings of decimal digits. Floating-point numbers have an embedded decimal point, and/or an optional signed exponent introduced by an e or E. If you write a number with a decimal point or exponent, Python makes it a floating-point object, and uses floating-point (not integer) math when the object is used in an expression. The rules for writing floating-point numbers are the same in Python as in the C language.

Numeric precision and long integers

    Plain Python integers (row 1 of Table 5-1) are implemented as C "longs" internally (i.e., at least 32 bits), and Python floating-point numbers are implemented as C "doubles"; Python numbers therefore get as much precision as the C compiler used to build the Python interpreter gives to longs and doubles.[14]

        [14] * That is, the standard CPython implementation. In the Jython Java-based implementation, Python types are really Java classes.


Long integer literals

    If, however, an integer literal ends with an l or L, it becomes a Python long integer (not to be confused with a C long) and can grow as large as needed. In Python 2.2 and later, because integers are automatically converted to long integers when their values overflow 32 bits, you don't need to type the letter L yourself--Python automatically converts up to long integer when extra precision is needed.

Hexadecimal and octal literals

    The rules for writing hexadecimal (base 16) and octal (base 8) integers are the same in Python as in C. Octal literals start with a leading zero (0) followed by a string of digits 0-7. Hexadecimals start with a leading 0x or 0X, followed by hexadecimal digits 0-9 and A-F. In hexadecimal literals, hex digits may be coded in lower- or uppercase. Both octal and hexadecimal literals produce integer objects; they are just alternative syntaxes for specifying values.

Complex numbers

    Python complex literals are written as realpart+imaginarypart, where the imaginarypart is terminated with a j or J. The realpart is technically optional, so the imaginarypart may appear on its own. Internally, complex numbers are implemented as pairs of floating-point numbers, but all numeric operations perform complex math when applied to complex numbers.
```

#### 30.1.2.1.2 Built-in Numeric Tools and Extensions

```text
Besides the built-in number literals shown in Table 5-1, Python provides a set of tools for processing number objects:


Expression operators

    +, *, >>, **, etc.

Built-in mathematical functions

    pow, abs, etc.

Utility modules

    random, math, etc.

We'll meet all of these as we go along.

Finally, if you need to do serious number crunching, an optional extension for Python called NumPy (Numeric Python) provides advanced numeric programming tools, such as a matrix data type, vector processing, and sophisticated computation libraries. Hardcore scientific programming groups at places like Lawrence Livermore and NASA use Python with NumPy to implement the sorts of tasks they previously coded in C++, FORTRAN, or Matlab.

Because it's so advanced, we won't talk further about NumPy in this book. You can find additional support for advanced numeric programming in Python at the Vaults of Parnassus site, or by searching the Web. Also note that NumPy is currently an optional extension; it doesn't come with Python, and must be installed separately.

	

In Python 3.0, the current integer and long integer types will be unified, such that there will be only one integer type, int. It will support arbitrary precision, like the current long integer type. Most programmers will see little or no change as a result of this. See the Python 3.0 release notes for more details.
```

#### 30.1.2.2 Python Expression Operators

```text
Perhaps the most fundamental tool that processes numbers is the expression: a combination of numbers (or other objects) and operators that computes a value when executed by Python. In Python, expressions are written using the usual mathematical notation and operator symbols. For instance, to add two numbers X and Y, say X + Y, which tells Python to apply the + operator to the values named by X and Y. The result of the expression is the sum of X and Y, another number object.

Table 5-2 lists all the operator expressions available in Python. Many are self-explanatory; for instance, the usual mathematical operators (+, -, *, /, and so on) are supported. A few will be familiar if you've used C in the past: % computes a division remainder, << performs a bitwise left-shift, & computes a bitwise AND result, etc. Others are more Python-specific, and not all are numeric in nature. For example, the is operator tests object identity (i.e., address, a strict form of equality), lambda creates unnamed functions, and so on. More on most of these later.

Table 5-2. Python expression operators and precedence
Operators 	Description
yield x 	Generator function send protocol (new in Release 2.5)
lambda args: expression 	Anonymous function generation
x if y else z 	Ternary selection expression (new in Release 2.5)
x or y 	Logical OR (y is evaluated only if x is false)
x and y 	Logical AND (y is evaluated only if x is true)
not x 	Logical negation
x < y, x <= y, x > y, x >= y, x == y, x <> y, x != y, x is y, x is not y, x in y, x not in y 	Comparison operators, value equality operators,[15] object identity tests, sequence membership
x | y 	Bitwise OR
x ^ y 	Bitwise eXclusive OR
x & y 	Bitwise AND
x << y, x >> y 	Shift x left or right by y bits
-x + y, x - y 	Addition/concatenation, subtraction
x * y, x % y, x / y, x // y 	Multiplication/repetition, remainder/format, division[16]
-x, +x, tildex, x ** y 	Unary negation, identity, bitwise complement, binary power
x[i], x[i:j], x.attr, x(...) 	Indexing, slicing, qualification, function calls
(...), [...], {...}, '...' 	Tuple, list,[17] dictionary, conversion to string[18]

    [15] a In Python 2.5, value inequality can be written as either X != Y or X <> Y. In Python 3.0, the latter of these options will be removed because it is redundant; use X != Y for value inequality tests.

    [16] b Floor division (X // Y), new in Release 2.2, always truncates fractional remainders. This is further described in "Section 5.3.3."

    [17] c Beginning with Python 2.0, the list syntax ([...]) can represent either a list literal or a list comprehension expression. The latter of these performs an implied loop and collects expression results in a new list.

    [18] d Conversion of objects to their print strings can also be accomplished with the more readable str and repr built-in functions, which are described in "Section 5.3.2" later in this chapter. Due to its obscurity, the backticks expression 'X' is scheduled to be removed in Python 3.0; use repr(X) instead.
```

#### 30.1.2.2.1 Mixed Operators Follow Operator Precedence

```text
As in most languages, in Python, more complex expressions are coded by stringing together the operator expressions in Table 5-2. For instance, the sum of two multiplications might be written as a mix of variables and operators:


A * B + C * D


So, how does Python know which operation to perform first? The answer to this question lies in operator precedence. When you write an expression with more than one operator, Python groups its parts according to what are called precedence rules, and this grouping determines the order in which the expression's parts are computed. In Table 5-2, operators lower in the table have higher precedence, and so bind more tightly in mixed expressions.

For example, if you write X + Y * Z, Python evaluates the multiplication first (Y * Z), then adds that result to X because * has higher precedence (is lower in the table) than +. Similarly, in this section's original example, both multiplications (A * B and C * D) will happen before their results are added.
```

#### 30.1.2.2.2 Parentheses Group Subexpressions

```text
You can forget about precedence completely if you're careful to group parts of expressions with parentheses. When you enclose subexpressions in parentheses, you override Python's precedence rules; Python always evaluates expressions in parentheses first before using their results in the enclosing expressions.

For instance, instead of coding X + Y * Z, you could write one of the following to force Python to evaluate the expression in the desired order:


(X + Y) * Z
X + (Y * Z)


In the first case, + is applied to X and Y first, because this subexpression is wrapped in parentheses. In the second case, the * is performed first (just as if there were no parentheses at all). Generally speaking, adding parentheses in big expressions is a great idea; it not only forces the evaluation order you want, but also aids readability.
```

#### 30.1.2.2.3 Mixed Types Are Converted Up

```text
Besides mixing operators in expressions, you can also mix numeric types. For instance, you can add an integer to a floating-point number: 40 + 3.14

But this leads to another question: what type is the result--integer or floating-point? The answer is simple, especially if you've used almost any other language before: in mixed-type expressions, Python first converts operands up to the type of the most complicated operand, and then performs the math on same-type operands. If you've used C, you'll find this behavior similar to type conversions in that language.

Python ranks the complexity of numeric types like so: integers are simpler than long integers, which are simpler than floating-point numbers, which are simpler than complex numbers. So, when an integer is mixed with a floating point, as in the preceding example, the integer is converted up to a floating-point value first, and floating-point math yields the floating-point result. Similarly, any mixed-type expression, where one operand is a complex number, results in the other operand being converted up to a complex number, and the expression yields a complex result. As you'll see later in this section, as of Release 2.2, Python also automatically converts normal integers to long integers whenever their values are too large to fit in a normal integer.

You can force the issue by calling built-in functions to convert types manually:


|>>> int(3.1415)
|3
|>>> float(3)
|3.0
|>>> long(4)
|4L


However, you won't usually need to do this: because Python automatically converts up to the more complex type within an expression, the results are normally what you want.

Also, keep in mind that all these mixed-type conversions only apply when mixing numeric types (e.g., an integer and a floating-point number) around an operator or comparison. In general, Python does not convert across other type boundaries. Adding a string to an integer, for example, results in an error, unless you manually convert one or the other; watch for an example when we meet strings in Chapter 7.
```

#### 30.1.2.2.4 Preview: Operator Overloading

```text
Although we're focusing on built-in numbers right now, keep in mind that all Python operators may be overloaded (i.e., implemented) by Python classes and C extension types to work on objects you create. For instance, you'll see later that objects coded with classes may be added with + expressions, indexed with [i] expressions, and so on.

Furthermore, Python itself automatically overloads some operators, such that they perform different actions depending on the type of built-in objects being processed. For example, the + operator performs addition when applied to numbers, but performs concatenation when applied to sequence objects such as strings and lists. In fact, + can mean anything at all when applied to objects you define with classes.

As we saw in the prior chapter, this property is usually called polymorphism--a term indicating that the meaning of an operation depends on the type of objects being operated on. We'll revisit this concept when we explore functions in Chapter 15 because it becomes a much more obvious feature in that context.
```

#### 30.1.2.3 Numbers in Action

```text
	Probably the best way to understand numeric objects and expressions is to see them in action. So, let's start up the interactive command line, and try some basic but illustrative operations (see Chapter 3 for pointers if you need help starting an interactive session).
```

#### 30.1.2.3.1 Variables and Basic Expressions

```text
First of all, let's exercise some basic math. In the following interaction, we first assign two variables (a and b) to integers so we can use them later in a larger expression. Variables are simply names, created by you or Python, that are used to keep track of information in your program. We'll say more about this in the next chapter, but in Python:

    * Variables are created when they are first assigned values.
    * Variables are replaced with their values when used in expressions.
    * Variables must be assigned before they can be used in expressions.
    * Variables refer to objects and are never declared ahead of time.

In other words, these assignments cause the variables a and b to spring into existence automatically:


% python 
>>> a = 3  # Name created
>>> b = 4 


I've also used a comment here. Recall that in Python code, text after a # mark and continuing to the end of the line is considered to be a comment and is ignored. Comments are a way to write human-readable documentation for your code. Because code you type interactively is temporary, you won't normally write comments in this context, but I've added them to some of this book's examples to help explain the code.[19] In the next part of the book, we'll meet a related featuredocumentation stringsthat attaches the text of your comments to objects.

    [19] * If you're working along, you don't need to type any of the comment text from the # through the end of the line; comments are simply ignored by Python, and not required parts of the statements we're running.

Now, let's use our new integer objects in expressions. At this point, the values of a and b are still 3 and 4, respectively. Variables like these are replaced with their values whenever they're used inside an expression, and the expression results are echoed back immediately when working interactively:


>>> a + 1, a - 1  # Addition (3 + 1), subtraction (3 - 1)
(4, 2)
>>> b * 3, b / 2  # Multiplication (4 * 3), division (4 / 2)
(12, 2)
>>> a % 2, b ** 2  # Modulus (remainder), power
(1, 16)
>>> 2 + 4.0, 2.0 ** b  # Mixed-type conversions
(6.0, 16.0)


Technically, the results being echoed back here are tuples of two values because the lines typed at the prompt contain two expressions separated by commas; that's why the results are displayed in parentheses (more on tuples later). Note that the expressions work because the variables a and b within them have been assigned values. If you use a different variable that has never been assigned, Python reports an error rather than filling in some default value:


>>> c * 2
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
NameError: name 'c' is not defined


You don't need to predeclare variables in Python, but they must have been assigned at least once before you can use them at all. In practice, this means you have to initialize counters to zero before you can add to them, initialize lists to an empty list before you can append to them, and so on.

Here are two slightly larger expressions to illustrate operator grouping and more about conversions:


|>>> b / 2 + a  # Same as ((4 / 2) + 3)
|5
|>>> print b / (2.0 + a)  # Same as (4 / (2.0 + 3))
|0.8


In the first expression, there are no parentheses, so Python automatically groups the components according to its precedence rulesbecause / is lower in Table 5-2 than +, it binds more tightly, and so is evaluated first. The result is as if the expression had parentheses as shown in the comment to the right of the code. Also, notice that all the numbers are integers in the first expression; because of that, Python performs integer division and addition.

In the second expression, parentheses are added around the + part to force Python to evaluate it first (i.e., before the /). We also made one of the operands floating-point by adding a decimal point: 2.0. Because of the mixed types, Python converts the integer referenced by a to a floating-point value (3.0) before performing the +. It also converts b to a floating-point value (4.0), and performs floating-point division; (4.0 / 5.0) yields a floating-point result of 0.8. If all the numbers in this expression were integers, it would instead invoke integer division (4 / 5), and the result would be the truncated integer 0 (in Python 2.5, at leastsee the discussion of true division ahead).
```

#### 30.1.2.3.2 Numeric Display Formats

```text
Notice that we used a print statement in the last of the preceding examples. Without the print, you'll see something that may look a bit odd at first glance:


|>>> b / (2.0 + a)  # Auto echo output: more digits
|0.80000000000000004
|
|>>> print b / (2.0 + a)  # Print rounds off digits
|0.8


The full story behind this odd result has to do with the limitations of floating-point hardware, and its inability to exactly represent some values. Because computer architecture is well beyond this book's scope, though, we'll finesse this by saying that all of the digits in the first output are really there, in your computer's floating-point hardwareit's just that you're not normally accustomed to seeing them. I've used this example to demonstrate the difference in output formattingthe interactive prompt's automatic result echo shows more digits than the print statement. If you don't want to see all the digits, include the print.

Note, however, that not all values have so many digits to display:


|>>> 1 / 2.0
|0.5


and that there are more ways to display the bits of a number inside your computer than prints and automatic echoes:


|>>> num = 1 / 3.0 
|>>> num  # Echoes
|0.33333333333333331
|>>> print num  # Print rounds
|0.333333333333
|
|>>> "%e" % num  # String formatting
|'3.333333e-001'
|>>> "%2.2f" % num  # String formatting
|'0.33'


The last two of these employ string formatting, an expression that allows for format flexibility, which we will explore in the upcoming chapter on strings (Chapter 7).

str and repr Display Formats

Technically, the difference between default interactive echoes and prints corresponds to the difference between the built-in repr and str functions:


|>>> repr(num)  # Used by echoes: as-code form
|'0.33333333333333331'
|>>> str(num)  # Used by print: user-friendly form
|'0.333333333333'


Both of these convert arbitrary objects to their string representations: repr (and the default interactive echo) produces results that look as though they were code; str (and the print statement) converts to a typically more user-friendly format. This notion will resurface when we study strings, and you'll find more on these built-ins in general later in the book.
```

#### 30.1.2.3.3 Division: Classic, Floor, and True

```text
Now that you've seen how division works, you should know that it is scheduled for a slight change in a future Python release (currently, 3.0, scheduled to appear some time after this edition is released). In Python 2.5, things work as just described, but there are actually two different division operators (one of which will change):


X / Y

    Classic division. In Python 2.5 and earlier, this operator truncates results for integers, and keeps remainders for floating-point numbers, as described here. This operator will be changed to true divisionalways keeping remainders regardless of typesin a future Python release (3.0).

X // Y

    Floor division. Added in Python 2.2, this operator always truncates fractional remainders down to their floor, regardless of types.

Floor division was added to address the fact that the results of the current classic division model are dependent on operand types, and so can be difficult to anticipate in a dynamically typed language like Python.

Due to possible backward-compatibility issues, division in Python is in a state of flux today. To recap, in version 2.5, / division works as described by default, and // floor division can be used to truncate result remainders to their floor regardless of their types:


>>> (5 / 2), (5 / 2.0), (5 / -2.0), (5 / -2)
(2, 2.5, -2.5, -3)

>>> (5 // 2), (5 // 2.0), (5 // -2.0), (5 // -2)
(2, 2.0, -3.0, -3)

>>> (9 / 3), (9.0 / 3), (9 // 3), (9 // 3.0)
(3, 3.0, 3, 3.0)


In a future Python release, / division is slated to be changed to return a true division result that always retains remainders, even for integersfor example, 1 / 2 will be 0.5, not 0, while 1 // 2 will still be 0.

Until this change is incorporated completely, you can see the way that the / operator will likely work in the future by using a special import of the form: from __future__ import division. This turns the / operator into a true division operator (keeping remainders), but leaves // as is. Here's how / will eventually behave:


>>> from __future__ import division

>>> (5 / 2), (5 / 2.0), (5 / -2.0), (5 / -2)
(2.5, 2.5, -2.5, -2.5)

>>> (5 // 2), (5 // 2.0), (5 // -2.0), (5 // -2)
(2, 2.0, -3.0, -3)

>>> (9 / 3), (9.0 / 3), (9 // 3), (9 // 3.0)
(3.0, 3.0, 3, 3.0)


Watch for a simple prime number while loop example in Chapter 13, and a corresponding exercise at the end of Part 4 that illustrates the sort of code that may be impacted by this / change. In general, any code that depends on / truncating an integer result may be affected (use the new // instead). As I write this, this change is scheduled to occur in Python 3.0, but be sure to try these expressions in your version to see which behavior applies. Also stay tuned for more on the special from command used here; it's discussed further in Chapter 21.
```

#### 30.1.2.3.4 Bitwise Operations

```text
Besides the normal numeric operations (addition, subtraction, and so on), Python supports most of the numeric expressions available in the C language. For instance, here it's at work performing bitwise shift and Boolean operations:


|>>> x = 1  # 0001
|>>> x << 2  # Shift left 2 bits: 0100
|4
|>>> x | 2  # bitwise OR: 0011
|3
|>>> x & 1  # bitwise AND: 0001
|1


In the first expression, a binary 1 (in base 2, 0001) is shifted left two slots to create a binary 4 (0100). The last two operations perform a binary OR (0001|0010 = 0011), and a binary AND (0001&0001 = 0001). Such bit-masking operations allow us to encode multiple flags and other values within a single integer.

We won't go into much more detail on "bit-twiddling" here. It's supported if you need it, and it comes in handy if your Python code must deal with things like network packets, or packed binary data produced by a C program. Be aware, though, that bitwise operations are often not as important in a high-level language such as Python as they are in a low-level language such as C. As a rule of thumb, if you find yourself wanting to flip bits in Python, you should think about which language you're really coding. In general, there are often better ways to encode information in Python than bit strings.
```

#### 30.1.2.3.5 Long Integers

```text
Now for something more exotic: here's a look at long integers in action. When an integer literal ends with a letter L (or lowercase l), Python creates a long integer. In Python, a long integer can be arbitrarily big. That is, it can have as many digits as you have room for in memory:


|>>> 9999999999999999999999999999999999999L + 1
|10000000000000000000000000000000000000L


The L at the end of the digit string tells Python to create a long integer object with unlimited precision. In fact, as of Python 2.2, even the letter L is optionalPython automatically converts a normal integer up to a long integer whenever its value is too large to fit in a normal integer (technically, when it overflows normal integer precision, which is usually 32 bits). That is, you don't need to code the L yourself, as Python will provide the extra precision if your program needs it:


|>>> 9999999999999999999999999999999999999 + 1
|10000000000000000000000000000000000000L


Long integers are a convenient built-in tool. For instance, you can use them to count the national debt in pennies in Python directly (if you are so inclined, and have enough memory on your computer). They are also why we were able to raise 2 to such large powers in the examples in Chapter 3:


|>>> 2L ** 200
|1606938044258990275541962092341162602522202993782792835301376L
|>>>
|>>> 2 ** 200
|1606938044258990275541962092341162602522202993782792835301376L


Because Python must do extra work to support their extended precision, long integer math is usually substantially slower than normal integer math (which usually maps directly to the hardware). However, if you need the precision, the fact that it's built-in for you to use will likely outweigh its performance penalty.
```

#### 30.1.2.3.6 Complex Numbers

```text
Complex numbers are a distinct core object type in Python. If you know what they are, you know why they are useful; if not, consider this section optional reading. Complex numbers are represented as two floating-point numbersthe real and imaginary partsand are coded by adding a j or J suffix to the imaginary part. We can also write complex numbers with a nonzero real part by adding the two parts with a +. For example, the complex number with a real part of 2 and an imaginary part of -3 is written 2 + -3j. Here are some examples of complex math at work:


>>> 1j * 1J
(-1+0j)
>>> 2 + 1j * 3
(2+3j)
>>> (2 + 1j) * 3
(6+3j)


Complex numbers also allow us to extract their parts as attributes, support all the usual mathematical expressions, and may be processed with tools in the standard cmath module (the complex version of the standard math module). Complex numbers typically find roles in engineering-oriented programs. Because they are advanced tools, check Python's language reference manual for additional details.
```

#### 30.1.2.3.7 Hexadecimal and Octal Notation

```text
As mentioned earlier in this chapter, Python integers can be coded in hexadecimal (base 16) and octal (base 8) notation, in addition to the normal base 10 decimal coding:

    * Octal literals have a leading 0, followed by a string of octal digits 0-7, each of which represents three bits.
    * Hexadecimal literals have a leading 0x or 0X, followed by a string of hex digits 0-9 and upper- or lowercase A-F, each of which stands for four bits.

Keep in mind that this is simply an alternative syntax for specifying the value of an integer object. For example, the following octal and hexadecimal literals produce normal integers with the specified values:


>>> 01, 010, 0100  # Octal literals
(1, 8, 64)
>>> 0x01, 0x10, 0xFF  # Hex literals
(1, 16, 255)


Here, the octal value 0100 is decimal 64, and hex 0xFF is decimal 255. Python prints in decimal (base 10) by default but provides built-in functions that allow you to convert integers to their octal and hexadecimal digit strings:


>>> oct(64), hex(64), hex(255)
('0100', '0x40', '0xff')


The oct function converts decimal to octal, and hex converts to hexadecimal. To go the other way, the built-in int function converts a string of digits to an integer, and an optional second argument lets you specify the numeric base:


>>> int('0100'), int('0100', 8), int('0x40', 16)
(100, 64, 64)


The eval function, which you'll meet later in this book, treats strings as though they were Python code. Therefore, it has a similar effect (but usually runs more slowlyit actually compiles and runs the string as a piece of a program, and it assumes you can trust the source of the string being run; a clever user might be able to submit a string that deletes files on your machine!):


>>> eval('100'), eval('0100'), eval('0x40')
(100, 64, 64)


Finally, you can also convert integers to octal and hexadecimal strings with a string formatting expression:


>>> "%o %x %X" % (64, 64, 255)
'100 40 FF'


Again, string formatting is covered in Chapter 7.

One warning before moving on: be careful not to begin a string of digits with a leading zero in Python, unless you really mean to code an octal value. Python will treat it as base 8, which may not work as you'd expect010 is always decimal 8, not decimal 10 (despite what you may or may not think!).
```

#### 30.1.2.3.8 Other Built-in Numeric Tools

```text
In addition to its core object types, Python also provides both built-in functions and built-in modules for numeric processing. The int and round built-in functions, for instance, truncate and round floating-point numbers, respectively. Here are examples of the built-in math module (which contains most of the tools in the C language's math library) and a few built-in functions at work:


|>>> import math 
|>>> math.pi, math.e  # Common constants
|(3.1415926535897931, 2.7182818284590451)
|
|>>> math.sin(2 * math.pi / 180)  # Sine, tangent, cosine
|0.034899496702500969
|
|>>> math.sqrt(144), math.sqrt(2)  # Square root
|(12.0, 1.4142135623730951)
|
|>>> abs(-42), 2**4, pow(2, 4) 
|(42, 16, 16)
|
|>>> int(2.567), round(2.567), round(2.567, 2)  # Truncate, round
|(2, 3.0, 2.5699999999999998)


As described earlier, the last output here will be (2, 3.0, 2.57) if we include print.

Notice that built-in modules such as math must be imported, but built-in functions such as abs are always available without imports. In other words, modules are external components, but built-in functions live in an implied namespace that Python automatically searches to find names used in your program. This namespace corresponds to the module called __builtin__. There is much more about name resolution in Part 4; for now, when you hear "module," think "import."

The standard library random module must be imported as well. This module provides tools for picking a random floating-point number between 0 and 1, selecting a random integer between two numbers, choosing an item at random from a sequence, and more:


|>>> import random
|>>> random.random(  )
|0.49741978338014803
|>>> random.random(  )
|0.49354866439625611
|
|>>> random.randint(1, 10)
|5
|>>> random.randint(1, 10)
|4

>>> random.choice(['Life of Brian', 'Holy Grail', 'Meaning of Life'])
'Life of Brian'
>>> random.choice(['Life of Brian', 'Holy Grail', 'Meaning of Life'])
'Holy Grail'


The random module can be useful for shuffling cards in games, picking images at random in a slideshow GUI, performing statistical simulations, and much more. For more details, see Python's library manual.
```

#### 30.1.2.4 Other Numeric Types

```text
	In this chapter, we've been using Python's core numeric typesinteger, long integer, floating point, and complex. These will suffice for most of the number crunching that most programmers will ever need to do. Python comes with a handful of more exotic numeric types, though, that merit a quick look here.
```

#### 30.1.2.4.1 Decimal Numbers

```text
Python 2.4 introduced a new core numeric type: the decimal object. Syntactically, decimals are created by calling a function within an imported module, rather than running a literal expression. Functionally, decimals are like floating-point numbers, with a fixed number of decimal points, and hence, a fixed precision. For example, with decimals, we can have a floating-point value that always retains just two decimal digits. Furthermore, we can specify how to round or truncate the extra decimal digits beyond the object's cutoff. Although it incurs a small performance penalty compared to the normal floating-point type, the decimal type is ideal for representing fixed-precision quantities like sums of money, and for achieving better numeric accuracy.

Floating-point object math is less than exact. For example, the following should yield zero, but it does not. The result is close to zero, but there are not enough bits to be precise here:


|>>> 0.1 + 0.1 + 0.1 - 0.3
|5.5511151231257827e-017


Printing the result to produce the user-friendly display format doesn't completely help, either because the hardware related to floating-point math is inherently limited in terms of accuracy:


| >>> print 0.1 + 0.1 + 0.1 - 0.3
| 5.55111512313e-017


However, with decimals, the result can be dead-on:


>>> from decimal import Decimal
>>> Decimal('0.1') + Decimal('0.1') + Decimal('0.1') - Decimal('0.3')
Decimal("0.0")


As shown here, we can make decimal objects by calling the Decimal constructor function in the decimal module, and passing in strings that have the desired number of decimal digits for the resulting object. When decimals of different precision are mixed in expressions, Python converts up to the largest number of decimal digits automatically:


>>> Decimal('0.1') + Decimal('0.10') + Decimal('0.10') - Decimal('0.30')
Decimal("0.00")


Other tools in the decimal module can be used to set the precision of all decimal numbers, and more. For instance, a context object in this module allows for specifying precision (number of decimal digits), and rounding modes (down, ceiling, etc.):


>>> input decimal
>>> decimal.Decimal(1) / decimal.Decimal(7)
Decimal("0.1428571428571428571428571429")

>>> decimal.getcontext(  ).prec = 4
>>> decimal.Decimal(1) / decimal.Decimal(7)
Decimal("0.1429")


Because use of the decimal type is still somewhat rare in practice, I'll defer to Python's standard library manuals and interactive help for more details.
```

#### 30.1.2.4.2 Sets

```text
Python 2.4 also introduced a new collection type, the set. Because they are collections of other objects, sets are arguably outside the scope of this chapter. But because they support mathematical set operations, we'll take a look at their basic utility here. To make a set object, pass in a sequence or other iterable object to the built-in set function (similar utility is available in a module prior to Python 2.4, but no import is required as of 2.4):


>>> x = set('abcde')
>>> y = set('bdxyz')


You get back a set object, which contains all the items in the object passed in (notice that sets do not have a positional ordering, and so are not sequences):


>>> x
set(['a', 'c', 'b', 'e', 'd'])


Sets made this way support the common mathematical set operations with expression operators. Note that we can't perform these operations on plain sequenceswe must create sets from them in order to apply these tools:


>>> 'e' in x  # Set membership
True

>>> x - y  # Set difference
set(['a', 'c', 'e'])

>>> x | y  # Set union
set(['a', 'c', 'b', 'e', 'd', 'y', 'x', 'z'])

>>> x & y  # Set intersection
set(['b', 'd'])


Such operations are convenient when dealing with large data sets; the intersection of two sets contains objects in common to both, for example, and the union contains all items in either set. Here's a more realistic example of set operations at work, applied to lists of people in a hypothetical company:


>>> engineers = set(['bob', 'sue', 'ann', 'vic']) 
>>> managers  = set(['tom', 'sue']) 
>>>
>>> engineers & managers  # Who is both engineer and manager?
set(['sue'])
>>>
>>> engineers | managers  # All people in either category
set(['vic', 'sue', 'tom', 'bob', 'ann'])
>>>
>>> engineers - managers  # Engineers who are not managers
set(['vic', 'bob', 'ann'])


In addition, the set object provides method calls that implement more exotic set operations. Although set operations can be coded manually in Python (and often were in the past), Python's built-in sets use efficient algorithms and implementation techniques to provide quick and standard operation.

For more details on sets, see Python's library reference manual.

	

In Python 3.0, the literal notation {1, 2, 3} is proposed to have the same effect as the current call set([1, 2, 3]), and will thus be another way to create a set object. This is a future extension, so see the 3.0 release notes for details.
```

#### 30.1.2.4.3 Booleans

```text
Some argue that the Python Boolean type, bool, is numeric in nature because its two values, True and False, are just customized versions of the integers 1 and 0 that print themselves differently. Although that's all most programmers need to know, let's explore this type in a bit more detail.

Python 2.3 introduced a new explicit Boolean data type called bool, with the values True and False available as new preassigned built-in names. Internally, the new names True and False are instances of bool, which is in turn just a subclass (in the object-oriented sense) of the built-in integer type int. True and False behave exactly like the integers 1 and 0, except that they have customized printing logicthey print themselves as the words True and False, instead of the digits 1 and 0 (technically, bool redefines its str and repr string formats).

Because of this customization, as of Python 2.3, the output of Boolean expressions typed at the interactive prompt prints as the words True and False instead of the older 1 and 0. In addition, Booleans make truth values more explicit. For instance, an infinite loop can now be coded as while True: instead of the less intuitive while 1:. Similarly, flags can be initialized more clearly with flag = False.

Again, though, for all other practical purposes, you can treat True and False as though they are predefined variables set to integer 1 and 0. Most programmers were preassigning True and False to 1 and 0 anyway, so the new type simply makes this a standard technique. Its implementation can lead to curious results, thoughbecause True is just the integer 1 with a custom display format, True + 3 yields 4 in Python!

We'll revisit Booleans in Chapter 9 (to define Python's notion of truth) and again in Chapter 12 (to see how Boolean operators like and and or work).
```

#### 30.1.2.4.4 Third-Party Extensions

```text
Beyond Python's own numeric types, you'll find various third-party open source add-ons that provide even more exotic numeric tools. Types such as rational numbers, vectors, and matrixes can be obtained on the Web; do a search for more details.
```

#### 30.1.2.5 Chapter Summary

```text
This chapter has taken a tour of Python's numeric object types and the operations we can apply to them. Along the way, we met the standard integer and floating-point types, as well as some more exotic and less commonly used types such as complex numbers and the decimal type. We also explored Python's expression syntax, type conversions, bitwise operations, and various literal forms for coding numbers in scripts.

Later in this part of the book, I'll fill in some details about the next object type, the string. In the next chapter, however, we'll take some time to explore the mechanics of variable assignment in more detail than we have here. This turns out to be perhaps the most fundamental idea in Python, so you should read through the next chapter before moving on. First, though, take the usual chapter quiz.

BRAIN BUILDER

Chapter Quiz

Q:	What is the value of the expression 2 * (3 + 4) in Python?
Q:	What is the value of the expression 2 * 3 + 4 in Python?
Q:	What is the value of the expression 2 + 3 * 4 in Python?
Q:	What tools can you use to find a number's square root, as well as its square?
Q:	What is the type of the result of the expression 1 + 2.0 + 3?
Q:	How could you truncate and round a floating-point number?
Q:	How can you convert an integer to a floating-point number?
Q:	How would you display an integer in octal or hexadecimal notation?
Q:	How might you convert an octal or hexadecimal string to a plain integer?


Quiz Answers

A:	The result value will be 14, the result of 2 * 7, because the parentheses force the addition to happen before the multiplication.
A:	Here, the result will be 10, the result of 6 + 4. Python's operator precedence rules are applied in the absence of parentheses, and multiplication has higher precedence than (i.e., happens before) addition, per Table 5-2.
A:	This expression yields 14, the result of 2 + 12, for the same precedence reasons as in the prior question.
A:	Functions for obtaining the square root, as well as pi, tangents, and more, are available in the imported math module. To find a number's square root, import math and call math.sqrt(N). To get a number's square, use either the exponent expression X ** 2, or the built-in function pow(X, 2).
A:	The result will be a floating-point number: the integers are converted up to floating point, the most complex type in the expression, and floating-point math is used to evaluate it.
A:	The int(N) function truncates, and the round(N, digits?) function rounds.
A:	The float(I) function converts an integer to a floating point; mixing an integer with a floating point within an expression will result in a conversion as well.
A:	The oct(I) and hex(I) built-in functions return the octal and hexadecimal string forms for an integer. The % string formatting expression also provides targets for doing this.
A:	The int(S, base?) function can be used to convert from octal and hexadecimal strings to normal integers (pass in 8 or 16 for the base). The eval(S) function can be used for this purpose too, but it's more expensive to run and can have security issues. Note that integers are always stored in binary in computer memory; these are just display string format conversions.
```
