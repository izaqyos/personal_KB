---
type: reference
title: Scalar Data
description: "Learning Perl chapter 2: scalar data, numbers and strings."
tags: [perl, book-notes, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#2.2"
---

# 2.2 Scalar Data

[↑ Learning Perl, 5th Edition](/perl/kb-perl/02-learning-perl-5th-edition/README.md)

```text
	In English, as in many other spoken languages, you're used to distinguishing between singular and plural. As a computer language designed by a human linguist, Perl is similar. As a general rule, when Perl has just one of something, that's a scalar.[*] A scalar is the simplest kind of data that Perl manipulates. Most scalars are either a number (like 255 or 3.25e20) or a string of characters (like hello[dagger] or the Gettysburg Address). Although you may think of numbers and strings as very different things, Perl uses them nearly interchangeably.

    [*] This has little to do with the similar term from mathematics or physics in that a scalar is a single thing; there are no "vectors" in Perl.

    [dagger] If you have been using other programming languages, you may think of hello as a collection of five characters, rather than as a single thing. But in Perl, a string is a single scalar value. Of course, you can access the individual characters when you need to; you'll see how to do that in later chapters.

A scalar value can be acted upon with operators (like addition or concatenation), generally yielding a scalar result. A scalar value can be stored into a scalar variable. Scalars can be read from files and devices, and can be written out as well.
```

### 2.2.1 Numbers

```text
Although a scalar is most often either a number or a string, it's useful to look at numbers and strings separately for the moment. We'll cover numbers first, and then move on to strings.
```

#### 2.2.1.1. All Numbers Have the Same Format Internally

```text
As you'll see in the next few paragraphs, you can specify both integers (whole numbers, like 255 or 2001) and floating-point numbers (real numbers with decimal points, like 3.14159, or 1.35 x 1025). But internally, Perl computes with double-precision floating-point values.[*] This means that there are no integer values internal to Perlan integer constant in the program is treated as the equivalent floating-point value.[dagger] You probably won't notice the conversion (or care much), but you should stop looking for distinct integer operations (as opposed to floating-point operations) because there aren't any. [double dagger]

    [*] A double-precision floating-point value is whatever the C compiler that compiled Perl used for a double declaration. While the size may vary from machine to machine, most modern systems use the IEEE-754 format, which suggests 15 digits of precision and a range of at least 1e-100 to 1e100.

    [dagger] Well, Perl will sometimes use internal integers in ways that are not visible to the programmer. That is, the only difference you should generally be able to see is that your program runs faster. And who could complain about that?

    [double dagger] Okay, there is the integer pragma. But using that is beyond the scope of this book. And yes, some operations compute an integer from a given floating-point number, as you'll see later. But that's not what we're talking about here.
```

#### 2.2.1.2. Floating-Point Literals

```text
A literal is the way a value is represented in the source code of the Perl program. A literal is not the result of a calculation or an I/O operation; it's data written directly into the source code.

Perl's floating-point literals should look familiar to you. Numbers with and without decimal points are allowed (including an optional plus or minus prefix), as well as tacking on a power-of-10 indicator (exponential notation) with E notation. For example:

|1.25
|255.000
|255.0
|7.25e45  # 7.25 times 10 to the 45th power (a big number)
|-6.5e24  # negative 6.5 times 10 to the 24th
|         # (a big negative number)
|-12e-24  # negative 12 times 10 to the -24th
|         # (a very small negative number)
|-1.2E-23 # another way to say that - the E may be uppercase
```

#### 2.2.1.3. Integer Literals

```text
Integer literals are also straightforward, as in:

|0
|2001
|-40
|255
|61298040283768


That last one is a little hard to read. Perl allows underscores for clarity within integer literals, so you can also write that number like this:

|61_298_040_283_768


It's the same value; it merely looks different to us human beings. You might have thought that commas should be used for this purpose, but commas are already used for a more-important purpose in Perl (as you'll see in the next chapter).
```

#### 2.2.1.4. Nondecimal Integer Literals

```text
Like many other programming languages, Perl allows you to specify numbers in other than base 10 (decimal). Octal (base 8) literals start with a leading 0, hexadecimal (base 16) literals start with a leading 0x, and binary (base 2) literals start with a leading 0b.[*] The hex digits A through F (or a through f) represent the conventional digit values of 10 through 15. For example:

    [*] The "leading zero" indicator works only for literalsnot for automatic string-to-number conversions, which you'll see later in this chapter. You can convert a data string that looks like an octal or hex value into a number with oct( ) or hex( ). Although there's no bin function for converting binary values, oct( ) can do that for strings beginning with 0b.

|0377       # 377 octal, same as 255 decimal
|0xff       # FF hex, also 255 decimal
|0b11111111 # also 255 decimal


Although these values look different to us humans, they're all three the same number to Perl. It makes no difference to Perl whether you write 0xFF or 255.000, so choose the representation that makes the most sense to you and your maintenance programmer (by which we mean the poor chap who gets stuck trying to figure out what you meant when you wrote your code; most often, this poor chap is you, and you can't recall why you did what you did three months ago).

When a nondecimal literal is more than about four characters long, it may be hard to read. For this reason, Perl allows underscores for clarity within these literals:

|0x1377_0B77
|0x50_65_72_7C
```

#### 2.2.1.5. Numeric Operators

```text
Perl provides the typical ordinary addition, subtraction, multiplication, and division operators, and so on. For example:

|2 + 3      # 2 plus 3, or 5
|5.1 - 2.4  # 5.1 minus 2.4, or 2.7
|3 * 12     # 3 times 12 = 36
|14 / 2     # 14 divided by 2, or 7
|10.2 / 0.3 # 10.2 divided by 0.3, or 34
|10 / 3     # always floating-point divide, so 3.3333333...


Perl also supports a modulus operator (%). The value of the expression 10 % 3 is the remainder when 10 is divided by 3, which is one. Both values are first reduced to their integer values, so 10.5 % 3.2 is computed as 10 % 3.[37] Additionally, Perl provides the FORTRAN-like exponentiation operator, which many have yearned for in Pascal and C. The operator is represented by the double asterisk, such as 2**3, which is two to the third power, or eight.[38] In addition, there are other numeric operators, which we'll introduce as we need them.

    [37] The result of a modulus operator when a negative number (or two) is involved can vary between Perl implementations. Beware.

    [38] You can't normally raise a negative number to a noninteger exponent. Math geeks know that the result would be a complex number. To make that possible, you'll need the help of the Math::Complex module.
```

### 2.2.2 Strings

```text
Strings are sequences of characters (like hello). Strings may contain any combination of any characters.[39] The shortest possible string has no characters. The longest string fills all of your available memory (although you wouldn't be able to do much with that). This is in accordance with the principle of "no built-in limits" that Perl follows at every opportunity. Typical strings are printable sequences of letters and digits and punctuation in the ASCII 32 to ASCII 126 range. However, the ability to have any character in a string means you can create, scan, and manipulate raw binary data as stringssomething with which many other utilities would have great difficulty. For example, you could update a graphical image or compiled program by reading it into a Perl string, making the change, and writing the result back out.

    [39] Unlike C or C++, there's nothing special about the NUL character in Perl because Perl uses length counting, not a null byte, to determine the end of the string.

Like numbers, strings have a literal representation, which is the way you represent the string in a Perl program. Literal strings come in two different flavors: single-quoted string literals and double-quoted string literals.
```

#### 2.2.2.1. Single-Quoted String Literals

```text
A single-quoted string literal is a sequence of characters enclosed in single quotes. The single quotes are not part of the string itselfthey're just there to let Perl identify the beginning and the ending of the string. Any character other than a single quote or a backslash between the quote marks (including newline characters, if the string continues onto successive lines) stands for itself inside a string. To get a backslash, put two backslashes in a row, and to get a single quote, put a backslash followed by a single quote. In other words:

'fred'    # those four characters: f, r, e, and d
'barney'  # those six characters
''        # the null string (no characters)
'Don\'t let an apostrophe end this string prematurely!'
'the last character of this string is a backslash: \\'
'hello\n' # hello followed by backslash followed by n
'hello
there'    # hello, newline, there (11 characters total)
'\'\\'    # single quote followed by backslash


Note that the \n within a single-quoted string is not interpreted as a newline, but as the two characters backslash and n. Only when the backslash is followed by another backslash or a single quote does it have special meaning.
```

#### 2.2.2.2. Double-Quoted String Literals

```text
A double-quoted string literal is similar to the strings you may have seen in other languages. Once again, it's a sequence of characters, although this time enclosed in double quotes. But now the backslash takes on its full power to specify certain control characters, or even any character at all through octal and hex representations. Here are some double-quoted strings:

"barney"        # just the same as 'barney'
"hello world\n" # hello world, and a newline
"The last character of this string is a quote mark: \""
"coke\tsprite"  # coke, a tab, and sprite


Note that the double-quoted literal string "barney" means the same six-character string to Perl as does the single-quoted literal string 'barney'. It's like what you saw with numeric literals, where you saw that 0377 was another way to write 255.0. Perl lets you write the literal in the way that makes more sense to you. Of course, if you wish to use a backslash escape (like \n to mean a newline character), you'll need to use the double quotes.

The backslash can precede many different characters to mean different things (generally called a backslash escape). The nearly complete[*] list of double-quoted string escapes is given in Table 2-1.

    [*] Recent versions of Perl have introduced "Unicode" escapes, which we aren't going to show you here.

Table 2-1. Double-quoted string backslash escapes
Construct	Meaning
\n	Newline
\r	Return
\t	Tab
\f	Form-feed
\b	Backspace
\a	Bell
\e	Escape (ASCII escape character)
\007	Any octal ASCII value (here, 007 = bell)
\x7f	Any hex ASCII value (here, 7f = delete)
\cC	A "control" character (here, Control-C)
\\	Backslash
\"	Double quote
\l	Lowercase next letter
\L	Lowercase all following letters until \E
\u	Uppercase next letter
\U	Uppercase all following letters until \E
\Q	Quote nonword characters by adding a backslash until \E
\E	End \L, \U, or \Q

Another feature of double-quoted strings is that they are variable interpolated, meaning that some variable names within the string are replaced with their current values when the strings are used. You haven't formally been introduced to what a variable looks like yet, so we'll get back to that later in this chapter.
```

#### 2.2.2.3. String Operators

```text
String values can be concatenated with the . operator. (Yes, that's a single period.) This does not alter either string, any more than 2+3 alters either 2 or 3. The resulting (longer) string is then available for further computation or assignment to a variable. For example:

"hello" . "world"       # same as "helloworld"
"hello" . ' ' . "world" # same as 'hello world'
'hello world' . "\n"    # same as "hello world\n"


Note that the concatenation must be explicitly requested with the . operator, unlike in some other languages where you merely have to stick the two values next to each other.

A special string operator is the string repetition operator, consisting of the single lowercase letter x. This operator takes its left operand (a string) and makes as many concatenated copies of that string as indicated by its right operand (a number). For example:

"fred" x 3       # is "fredfredfred"
"barney" x (4+1) # is "barney" x 5, or "barneybarneybarneybarneybarney"
5 x 4            # is really "5" x 4, which is "5555"


That last example is worth spelling out slowly. The string repetition operator wants a string for a left operand, so the number 5 is converted to the string "5" (using rules described in detail later), giving a one-character string. This new string is then copied four times, yielding the four-character string 5555. Note that if you had reversed the order of the operands, as 4 x 5, you would have made five copies of the string 4, yielding 44444. This shows that string repetition is not commutative.

The copy count (the right operand) is first truncated to an integer value (4.8 becomes 4) before being used. A copy count of less than one results in an empty (zero-length) string.
```

#### 2.2.2.4. Automatic Conversion Between Numbers and Strings

```text
For the most part, Perl automatically converts between numbers and strings as needed. How does it know which is needed? It all depends upon the operator being used on the scalar value. If an operator expects a number (like + does), Perl will see the value as a number. If an operator expects a string (like . does), Perl will see the value as a string. So you don't need to worry about the difference between numbers and strings; just use the proper operators, and Perl will make it all work.

When a string value is used where an operator needs a number (say, for multiplication), Perl automatically converts the string to its equivalent numeric value, as if it had been entered as a decimal floating-point value.[*] So "12" * "3" gives the value 36. Trailing nonnumber stuff and leading whitespace are discarded, so "12fred34" * " 3" will also give 36 without any complaints.[dagger] At the extreme end of this, something that isn't a number at all converts to zero. This would happen if you used the string "fred" as a number.

    [*] The trick of using a leading zero to mean a nondecimal value works for literals, but never for automatic conversion. Use hex( ) or oct( ) to convert those kinds of strings.

    [dagger] Unless you request warnings, which we'll discuss in a moment.

Likewise, if a numeric value is given when a string value is needed (say, for string concatenation), the numeric value is expanded into whatever string would have been printed for that number. For example, if you want to concatenate the string Z followed by the result of 5 multiplied by 7,[double dagger] you can say this simply as:

    [double dagger] You'll see about precedence and parentheses shortly.

"Z" . 5 * 7 # same as "Z" . 35, or "Z35"


In other words, you don't really have to worry about whether you have a number or a string (most of the time). Perl performs all the conversions for you.[||]

    [||] And if you're worried about efficiency, don't be. Perl generally remembers the result of a conversion so that it's done only once.
```

### 2.2.3 Perl's Built-in Warnings

```text
Perl can be told to warn you when it sees something suspicious going on in your program. To run your program with warnings turned on, use the -w option on the command line:

$ perl -w my_program


Or, if you always want warnings, you may request them on the #! line:

#!/usr/bin/perl -w


That works even on non-Unix systems, where it's traditional to write something like this, since the path to Perl doesn't generally matter:

#!perl -w


With Perl 5.6 and later, you can turn on warnings with a pragma (but be careful because it won't work for people with earlier versions of Perl):[*]

    [*] The warnings pragma actually allows lexical warnings, but you'll have to see the perllexwarn manpage to find out about those.

#!/usr/bin/perl
use warnings;


Now, Perl will warn you if you use '12fred34' as if it were a number:

Argument "12fred34" isn't numeric


Of course, warnings are generally meant for programmers, not for end users. If the warning won't be seen by a programmer, it probably won't do any good. And warnings won't change the behavior of your program, except that now it will emit gripes once in a while. If you get a warning message you don't understand, you can get a longer description of the problem with the diagnostics pragma. The perldiag manpage has both the short warning and the longer diagnostic description:

#!/usr/bin/perl
use diagnostics;


When you add the use diagnostics pragma to your program, it may seem to you that your program now pauses for a moment whenever you launch it. That's because your program has to do a lot of work (and a chunk of memory to gobble) just in case you want to read the documentation as soon as Perl notices your mistakes, if any. This leads to a nifty optimization that can speed up your program's launch (and memory footprint) with no adverse impact on users; once you no longer need to read the documentation about the warning messages produced by your program, remove the use diagnostics pragma. (It's even better if you fix your program to avoid causing the warnings. But it's sufficient merely to finish reading the output.)

A further optimization can be had by using one of Perl's command-line options, -M, to load the pragma only when needed instead of editing the source code each time to enable and disable diagnostics:
Code View: Scroll / Show All

$ perl -Mdiagnostics ./my_program
Argument "12fred34" isn't numeric in addition (+) at ./my_program line 17 (#1)
    (W numeric) The indicated string was fed as an argument to
    an operator that expected a numeric value instead.  If you're
    fortunate the message will identify which operator was so unfortunate.

					  


As we run across situations in which Perl will usually be able to warn us about a mistake in your code, we'll point them out. But you shouldn't count on the text or behavior of any warning staying exactly the same in future Perl releases.
```

### 2.2.4 Scalar Variables

```text
A variable is a name for a container that holds one or more values.[*] The name of the variable stays the same throughout the program, but the value or values contained in that variable typically change over and over again throughout the execution of the program.

    [*] As you'll see, a scalar variable can hold only one value. But other types of variables, such as arrays and hashes, may hold many values.

A scalar variable holds a single scalar value, as you'd expect. Scalar variable names begin with a dollar sign followed by what we'll call a Perl identifier: a letter or underscore, and then possibly more letters, or digits, or underscores. Another way to think of it is that it's made up of alphanumerics and underscores, but can't start with a digit. Upper- and lowercase letters are distinct: the variable $Fred is a different variable from $fred. And all of the letters, digits, and underscores are significant, so:

$a_very_long_variable_that_ends_in_1


is different from:

$a_very_long_variable_that_ends_in_2


Scalar variables in Perl are always referenced with the leading $.[dagger] In the shell, you use $ to get the value, but leave the $ off to assign a new value. In awk or C, you leave the $ off entirely. If you bounce back and forth a lot, you'll find yourself typing the wrong things occasionally. This is expected. (Most Perl programmers would recommend that you stop writing shell, awk, and C programs, but that may not work for you.)

    [dagger] This is called a "sigil" in Perlspeak.
```

#### 2.2.4.1. Choosing Good Variable Names

```text
You should generally select variable names that mean something regarding the purpose of the variable. For example, $r is probably not very descriptive but $line_length is. A variable used for only two or three lines close together may be called something simple, like $n, but a variable used throughout a program should probably have a more descriptive name.

Similarly, properly placed underscores can make a name easier to read and understand, especially if your maintenance programmer has a different spoken language background than you have. For example, $super_bowl is a better name than $superbowl, since that last one might look like $superb_owl. Does $stopid mean $sto_pid (storing a process ID of some kind?) or $s_to_pid (converting something to a process ID?) or $stop_id (the ID for some kind of "stop" object?) or is it just a stopid misspelling?

Most variable names in our Perl programs are all lowercase, like most of the ones you'll see in this book. In a few special cases, uppercase letters are used. Using all caps (like $ARGV) generally indicates that there's something special about that variable. When a variable's name has more than one word, some say $underscores_are_cool, while others say $giveMeInitialCaps. Just be consistent.

Of course, choosing good or poor names makes no difference to Perl. You could name your program's three most-important variables $OOO000OOO, $OO00OO00, and $O0O0O0O0O and Perl wouldn't be botheredbut in that case, please, don't ask us to maintain your code.
```

#### 2.2.4.2. Scalar Assignment

```text
The most common operation on a scalar variable is assignment, which is the way to give a value to a variable. The Perl assignment operator is the equals sign (much like other languages), which takes a variable name on the left side, and gives it the value of the expression on the right. For example:
Code View: Scroll / Show All

$fred   = 17;          # give $fred the value of 17
$barney = 'hello';     # give $barney the five-character string 'hello'
$barney = $fred + 3;   # give $barney the current value of $fred plus 3 (20)
$barney = $barney * 2; # $barney is now $barney multiplied by 2 (40)

					  


Notice that last line uses the $barney variable twice: once to get its value (on the right side of the equals sign), and once to define where to put the computed expression (on the left side of the equals sign). This is legal, safe, and rather common. In fact, it's so common that you can write it using a convenient shorthand, as you'll see in the next section.
```

#### 2.2.4.3. Binary Assignment Operators

```text
Expressions like $fred = $fred + 5 (where the same variable appears on both sides of an assignment) occur frequently enough that Perl (like C and Java) has a shorthand for the operation of altering a variablethe binary assignment operator. Nearly all binary operators that compute a value have a corresponding binary assignment form with an appended equals sign. For example, the following two lines are equivalent:

$fred  = $fred + 5; # without the binary assignment operator
$fred += 5;         # with the binary assignment operator


These are also equivalent:

$barney  = $barney * 3;
$barney *= 3;


In each case, the operator alters the existing value of the variable in some way, rather than simply overwriting the value with the result of some new expression.

Another common assignment operator is made with the string concatenate operator ( . ); this gives us an append operator ( .= ):

$str  = $str . " "; # append a space to $str
$str .= " ";        # same thing with assignment operator


Nearly all binary operators are valid this way. For example, a raise to the power of operator is written as **=. So, $fred **= 3 means "raise the number in $fred to the third power, placing the result back in $fred."
```

### 2.2.5 Output with print

```text
It's generally a good idea to have your program produce some output; otherwise, someone may think it didn't do anything. The print( ) operator makes that possible: it takes a scalar argument and puts it out without any embellishment onto standard output. Unless you've done something odd, this will be your terminal display. For example:

print "hello world\n"; # say hello world, followed by a newline

print "The answer is ";
print 6 * 7;
print ".\n";


You can give print a series of values, separated by commas:

print "The answer is ", 6 * 7, ".\n";


This is really a list, but we haven't talked about lists yet, so we'll put that off for later.
```

#### 2.2.5.1. Interpolation of Scalar Variables into Strings

```text
When a string literal is double-quoted, it is subject to variable interpolation[*] (besides being checked for backslash escapes). This means that any scalar variable[dagger] name in the string is replaced with its current value. For example:

    [*] This has nothing to do with mathematical or statistical interpolation.

    [dagger] And some other variable types, but you won't see those until later.

$meal   = "brontosaurus steak";
$barney = "fred ate a $meal";    # $barney is now "fred ate a brontosaurus steak"
$barney = 'fred ate a ' . $meal; # another way to write that

					  


As you see on the last line above, you can get the same results without the double quotes, but the double-quoted string is often the more convenient way to write it.

If the scalar variable has never been given a value,[*] the empty string is used instead:

    [*] This is actually the special undefined value, undef, which you'll see a little later in this chapter. If warnings are turned on, Perl will complain about interpolating the undefined value.

$barney = "fred ate a $meat"; # $barney is now "fred ate a "


Don't bother with interpolating if you have just the one lone variable:

print "$fred"; # unneeded quote marks
print $fred;   # better style


There's nothing really wrong with putting quote marks around a lone variable, but the other programmers will laugh at you behind your back.[dagger] Variable interpolation is also known as double-quote interpolation because it happens when double-quote marks (but not single quotes) are used. It happens for some other strings in Perl, which we'll mention as we get to them.

    [dagger] Well, it may interpret the value as a string, rather than a number. In a few rare cases that may be needed, but nearly always it's just a waste of typing.

To put a real dollar sign into a double-quoted string, precede the dollar sign with a backslash, which turns off the dollar sign's special significance:

$fred = 'hello';
print "The name is \$fred.\n";    # prints a dollar sign
print 'The name is $fred' . "\n"; # so does this


The variable name will be the longest possible variable name that makes sense at that part of the string. This can be a problem if you want to follow the replaced value immediately with some constant text that begins with a letter, digit, or underscore.[double dagger] As Perl scans for variable names, it would consider those characters as additional name characters, which is not what you want. Perl provides a delimiter for the variable name in a manner similar to the shell. Simply enclose the name of the variable in a pair of curly braces. Or, you can end that part of the string and start another part of the string with a concatenation operator:

    [double dagger] There are some other characters that may be a problem as well. If you need a left square bracket or a left curly brace just after a scalar variable's name, precede it with a backslash. You may also do that if the variable's name is followed by an apostrophe or a pair of colons, or you could use the curly-brace method described in the main text.


$what = "brontosaurus steak";
$n = 3;
print "fred ate $n $whats.\n";          # not the steaks, but the value of $whats
print "fred ate $n ${what}s.\n";        # now uses $what
print "fred ate $n $what" . "s.\n";     # another way to do it
print 'fred ate ' . $n . ' ' . $what . "s.\n"; # an especially difficult way
```

#### 2.2.5.2. Operator Precedence and Associativity

```text
Operator precedence determines which operations in a complex group of operations happen first. For example, in the expression 2+3*4, do you perform the addition first or the multiplication first? If you did the addition first, you'd get 5*4, or 20. But if you did the multiplication first (as you were taught in math class), you'd get 2+12, or 14. Fortunately, Perl chooses the common mathematical definition, performing the multiplication first. Because of this, you say multiplication has a higher precedence than addition.

You can override the default precedence order by using parentheses. Anything in parentheses is completely computed before the operator outside of the parentheses is applied (just like you learned in math class). So if you really want the addition before the multiplication, you can say (2+3)*4, yielding 20. Also, if you wanted to demonstrate that multiplication is performed before addition, you could add a decorative but unnecessary set of parentheses, as in 2+(3*4).

While precedence is simple for addition and multiplication, you start running into problems when faced with, say, string concatenation compared with exponentiation. The proper way to resolve this is to consult the official, accept-no-substitutes Perl operator precedence chart, shown in Table 2-2.[*] (Note that some of the operators have not yet been described, and in fact, may not even appear anywhere in this book, but don't let that scare you from reading about them in the perlop manpage.)

    [*] C programmers: Rejoice! The operators that are available in both Perl and C have the same precedence and associativity in both.

Table 2-2. Associativity and precedence of operators (highest to lowest)
Associativity	Operators
left	parentheses and arguments to list operators
left	->
 	++ -- (autoincrement and autodecrement)
right	**
right	\ ! ~ + - (unary operators)
left	=~ !~
left	* / % x
left	+ - . (binary operators)
left	<< >>
 	named unary operators (-X filetests, rand)
 	< <= > >= lt le gt ge (the "unequal" ones)
 	== != <=> eq ne cmp (the "equal" ones)
left	&
left	| ^
left	&&
left	||
 	.. ...
right	?: (ternary)
right	= += -= .= (and similar assignment operators)
left	, =>
 	list operators (rightward)
right	not
left	and
left	or xor

In the chart, any given operator has higher precedence than all of the operators listed below it, and lower precedence than all of the operators listed above it. Operators at the same precedence level resolve according to rules of associativity instead.

Just like precedence, associativity resolves the order of operations when two operators of the same precedence compete for three operands:

4 ** 3 ** 2 # 4 ** (3 ** 2), or 4 ** 9 (right associative)
72 / 12 / 3 # (72 / 12) / 3, or 6/3, or 2 (left associative)
36 / 6 * 3  # (36/6)*3, or 18


In the first case, the ** operator has right associativity, so the parentheses are implied on the right. Comparatively, the * and / operators have left associativity, yielding a set of implied parentheses on the left.

So should you just memorize the precedence chart? No! Nobody actually does that. Instead, just use parentheses when you don't remember the order of operations, or when you're too busy to look in the chart. After all, if you can't remember it without the parentheses, your maintenance programmer is going to have the same trouble. So be nice to your maintenance programmer: you may be that person one day.
```

#### 2.2.5.3. Comparison Operators

```text
For comparing numbers, Perl has the logical comparison operators that remind you of algebra: < <= == >= > !=. Each of these returns a true or false value. You'll find out more about those return values in the next section. Some of these may be different than you'd use in other languages. For example, == is used for equality, not a single = sign because that's used for assignment. And != is used for inequality testing because <> is used for another purpose in Perl. And you'll need >= and not => for "greater than or equal to" because the latter is used for another purpose in Perl. In fact, nearly every sequence of punctuation is used for something in Perl. So, if you get writer's block, just let the cat walk across the keyboard, and debug what results.

For comparing strings, Perl has an equivalent set of string comparison operators, which look like funny little words: lt le eq ge gt ne. These compare two strings character by character to see whether they're the same, or whether one comes first in standard string sorting order. (In ASCII, the capital letters come before the lowercase letters, so beware.)

The comparison operators (for both numbers and strings) are given in Table 2-3.

Table 2-3. Numeric and string comparison operators
Comparison			Numeric	String
Equal				== 	eq
Not equal			!= 	ne
Less than			< 	lt
Greater than			> 	gt
Less than or equal to		<= 	le
Greater than or equal to	>= 	ge

Here are some example expressions using these comparison operators:

35 != 30 + 5         # false
35 == 35.0           # true
'35' eq '35.0'       # false (comparing as strings)
'fred' lt 'barney'   # false
'fred' lt 'free'     # true
'fred' eq "fred"     # true
'fred' eq 'Fred'     # false
' ' gt ''            # true
```

### 2.2.6 The if Control Structure

```text
Once you can compare two values, you'll probably want your program to make decisions based upon that comparison. Like all similar languages, Perl has an if control structure:

if ($name gt 'fred') {
  print "'$name' comes after 'fred' in sorted order.\n";
}


If you need an alternative choice, the else keyword provides that as well:

if ($name gt 'fred') {
  print "'$name' comes after 'fred' in sorted order.\n";
} else {
  print "'$name' does not come after 'fred'.\n";
  print "Maybe it's the same string, in fact.\n";
}


Those block curly braces are required around the conditional code (unlike C, whether you know C or not). It's a good idea to indent the contents of the blocks of code as we show here; that makes it easier to see what's going on. If you're using a programmers' text editor (as discussed in Chapter 1), it'll do most of the work for you.
```

#### 2.2.6.1. Boolean Values

```text
You may actually use any scalar value as the conditional of the if control structure. That's handy if you want to store a true or false value into a variable, like this:

$is_bigger = $name gt 'fred';
if ($is_bigger) { ... }


But how does Perl decide whether a given value is true or false? Perl doesn't have a separate Boolean data type, like some languages have. Instead, it uses a few simple rules:[*]

    [*] These aren't the rules that Perl uses, of course. These are some rules that you can use to get essentially the same result, though.

    * If the value is a number, 0 means false; all other numbers mean true.
    * Otherwise, if the value is a string, the empty string ('') means false; all other strings mean true.
    * Otherwise (that is, if the value is another kind of scalar than a number or a string), convert it to a number or a string and try again.[dagger]

          [dagger] This means that undef (which we'll see soon) means false, while all references (which are covered in the Alpaca book) are true.

There's one trick hidden in those rules. Because the string '0' is the exact same scalar value as the number 0, Perl has to treat them both the same. That means that the string '0' is the only nonempty string that is false.

If you need to get the opposite of any Boolean value, use the unary not operator, !. If what follows it is a true value, it returns false; if what follows is false, it returns true:

if (! $is_bigger) {
  # Do something when $is_bigger is not true
}
```

### 2.2.7 Getting User Input

```text
At this point, you're probably wondering how to get a value from the keyboard into a Perl program. Here's the simplest way: use the line-input operator, <STDIN>.[double dagger]

    [double dagger] This is actually a line-input operator working on the filehandle STDIN, but we can't tell you about that until we get to filehandles (in Chapter 5).

Each time you use <STDIN> in a place where a scalar value is expected, Perl reads the next complete text line from standard input (up to the first newline), and uses that string as the value of <STDIN>. Standard input can mean many things, but unless you do something uncommon, it means the keyboard of the user who invoked your program (probably you). If there's nothing waiting for <STDIN> to read (typically the case, unless you type ahead a complete line), the Perl program will stop and wait for you to enter some characters followed by a newline (return).[*]

    [*] To be honest, it's normally your system that waits for the input; Perl waits for your system. Although the details depend upon your system and its configuration, you can generally correct your mistyping with the backspace key before you press Returnyour system handles that, not Perl itself. If you need more control over the input, get the Term::ReadLine module from CPAN.

The string value of <STDIN> typically has a newline character on the end of it,[dagger] so you could do something like this:

    [dagger] The exception is if the standard input stream somehow runs out in the middle of a line. But that's not a proper text file, of course!

$line = <STDIN>;
if ($line eq "\n") {
  print "That was just a blank line!\n";
} else {
  print "That line of input was: $line";
}


But in practice, you don't often want to keep the newline, so you need the chomp operator.
```

### 2.2.8 The chomp Operator

```text
The first time you read about the chomp operator, it seems terribly overspecialized. It works on a variable. The variable has to hold a string. And if the string ends in a newline character, chomp can get rid of the newline. That's (nearly) all it does. For example:

$text = "a line of text\n"; # Or the same thing from <STDIN>
chomp($text);               # Gets rid of the newline character


But it turns out to be so useful, you'll put it into nearly every program you write. As you see, it's the best way to remove a trailing newline from a string in a variable. In fact, there's an easier way to use chomp because of a simple rule: any time that you need a variable in Perl, you can use an assignment instead. First, Perl does the assignment. Then it uses the variable in whatever way you requested. So the most common use of chomp looks like this:

chomp($text = <STDIN>); # Read the text, without the newline character

$text = <STDIN>;        # Do the same thing...
chomp($text);           # ...but in two steps


At first glance, the combined chomp may not seem to be the easy way, especially if it seems more complex! If you think of it as two operationsread a line, then chomp itthen it's more natural to write it as two statements. But if you think of it as one operationread just the text, not the newlineit's more natural to write the one statement. And since most other Perl programmers are going to write it that way, you may as well get used to it now.

chomp is actually a function. As a function, it has a return value, which is the number of characters removed. This number is hardly ever useful:

$food = <STDIN>;
$betty = chomp $food; # gets the value 1 - but you knew that!


As you see, you may write chomp with or without the parentheses. This is another general rule in Perl: except in cases where it changes the meaning to remove them, parentheses are always optional.

If a line ends with two or more newlines,[*] chomp removes only one. If there's no newline, it does nothing, and returns zero.

    [*] This situation can't arise if you're reading a line at a time, but it certainly can when you have set the input separator ($/) to something other than newline, or used the read function, or perhaps have glued some strings together yourself.
```

### 2.2.9 The while Control Structure

```text
Like most algorithmic programming languages, Perl has a number of looping structures.[dagger] The while loop repeats a block of code as long as a condition is true:

    [dagger] Every programmer eventually creates an infinite loop by accident. If your program keeps running and running, though, you can generally stop it in the same way you'd stop any other program on your system. Often, typing Control-C will stop a runaway program; check with your system's documentation to be sure.

$count = 0;
while ($count < 10) {
  $count += 2;
  print "count is now $count\n"; # Gives values 2 4 6 8 10
}


As always in Perl, the truth value here works like the truth value in the if test. Also like the if control structure, the block curly braces are required. The conditional expression is evaluated before the first iteration, so the loop may be skipped completely if the condition is initially false.
```

### 2.2.10 The undef Value

```text
What happens if you use a scalar variable before you give it a value? Nothing serious, and definitely nothing fatal. Variables have the special undef value before they are first assigned, which is just Perl's way of saying, "Nothing here to look atmove along, move along." If you try to use this "nothing" as a "numeric something," it acts like zero. If you try to use it as a "string something," it acts like the empty string. But undef is neither a number nor a string; it's an entirely separate kind of scalar value.

Because undef automatically acts like zero when used as a number, it's easy to make an numeric accumulator that starts out empty:

# Add up some odd numbers
$n = 1;
while ($n < 10) {
  $sum += $n;
  $n += 2; # On to the next odd number
}
print "The total was $sum.\n";


This works properly when $sum was undef before the loop started. The first time through the loop $n is one, so the first line inside the loop adds one to $sum. That's like adding one to a variable that already holds zero (because you're using undef as if it were a number). So now it has the value 1. After that, since it's been initialized, adding works in the traditional way.

Similarly, you could have a string accumulator that starts out empty:

$string .= "more text\n";


If $string is undef, this will act as if it already held the empty string, putting "more text\n" into that variable. But if it already holds a string, the new text is simply appended.

Perl programmers frequently use a new variable in this way, letting it act as either zero or the empty string as needed.

Many operators return undef when the arguments are out of range or don't make sense. If you don't do anything special, you'll get a zero or a null string without major consequences. In practice, this is hardly a problem. In fact, most programmers will rely upon this behavior. But you should know that when warnings are turned on, Perl will typically warn about unusual uses of the undefined value, since that may indicate a bug. For example, simply copying undef from one variable into another isn't a problem, but trying to print it would generally cause a warning.
```

### 2.2.11 The defined Function

```text
The line-input operator <STDIN>  is one operator that can return undef. Normally, it will return a line of text, but if there is no more input, such as at end-of-file, it returns undef to signal this.[*] To tell whether a value is undef and not the empty string, use the defined function, which returns false for undef, and true for everything else:

    [*] Normally, there's no "end-of-file" when the input comes from the keyboard, but input may have been redirected to come from a file. Or the user may have pressed the key that the system recognizes to indicate end-of-file.

$madonna = <STDIN>;
if ( defined($madonna) ) {
  print "The input was $madonna";
} else {
  print "No input available!\n";
}


If you'd like to make your own undef values, you can use the obscurely named undef operator:

$madonna = undef; # As if it had never been touched
```

### 2.2.12 Exercises

```text
# [5] Write a program that computes the circumference of a circle with a radius of 12.5. Circumference is 2¿ times the radius (approximately 2 times 3.141592654). The answer you get should be about 78.5.
#

[4] Modify the program from the previous exercise to prompt for and accept a radius from the person running the program. So, if the user enters 12.5 for the radius, she should get the same number as in the previous exercise.
#

[4] Modify the program from the previous exercise so that, if the user enters a number less than zero, the reported circumference will be zero, rather than negative.
#

[8] Write a program that prompts for and reads two numbers (on separate lines of input) and prints out the product of the two numbers multiplied together.
#

[8] Write a program that prompts for and reads a string and a number (on separate lines of input) and prints out the string the number of times indicated by the number on separate lines. (Hint: use the x operator.) If the user enters "fred" and "3", the output should be three lines, each saying "fred". If the user enters "fred" and "299792", there may be a lot of output.

My answers at: /cygdrive/c/work/KB/perl/learning_perl_5_edition_examples/basic
ex_2_2_12.pl
```
