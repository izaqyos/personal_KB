---
type: reference
title: Quick Reference for awk
description: Subsection 5.19 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.19"
---

# 5.19 Quick Reference for awk

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.19.1 Command-Line Syntax

```text
The syntax for invoking awk has two basic forms:

    awk [-v var=value] [-Fre] [--] 'pattern { action }' var=value datafile(s)
    awk [-v var=value] [-Fre] -f scriptfile [--] var=value datafile(s)

An awk command line consists of the command, the script and the input filename. Input is read from the file specified on the command line. If there is no input file or "-" is specified, then standard input is read. The -F option sets the field separator (FS) to re.

The -v option sets the variable var to value before the script is executed. This happens even before the BEGIN procedure is run. (See the discussion below on command-line parameters.)

Following POSIX argument parsing conventions, the "--" option marks the end of command-line options. Using this option, for instance, you could specify a datafile that begins with "-", which would otherwise be confused with a command-line option.

You can specify a script consisting of pattern and action on the command line, surrounded by single quotes. Alternatively, you can place the script in a separate file and specify the name of the scriptfile on the command line with the -f option.

Parameters can be passed into awk by specifying them on the command line after the script. This includes setting system variables such as FS, OFS, and RS. The value can be a literal, a shell variable ($var) or the result of a command (`cmd`); it must be quoted if it contains spaces or tabs. Any number of parameters can be specified.

Command-line parameters are not available until the first line of input is read, and thus cannot be accessed in the BEGIN procedure. (Older implementations of awk and nawk would process leading command-line assignments before running the BEGIN procedure. This was contrary to how things were documented in The AWK Programming Language, which says that they are processed when awk would go to open them as filenames, i.e., after the BEGIN procedure. The Bell Labs awk was changed to correct this, and the -v option was added at the same time, in early 1989. It is now part of POSIX awk.) Parameters are evaluated in the order in which they appear on the command line up until a filename is recognized. Parameters appearing after that filename will be available when the next filename is recognized.
```

#### 5.19.1.1 Shell Wrapper for Invoking awk

```text
Typing a script at the system prompt is only practical for simple, one-line scripts. Any script that you might invoke as a command and reuse can be put inside a shell script. Using a shell script to invoke awk makes the script easy for others to use.

You can put the command line that invokes awk in a file, giving it a name that identifies what the script does. Make that file executable (using the chmod command) and put it in a directory where local commands are kept. The name of the shell script can be typed on the command line to execute the awk script. This is preferred for easily used and reused scripts.

On modern UNIX systems, including Linux, you can use the #! syntax to create self-contained awk scripts:

    #! /usr/bin/awk -f
    script

Awk parameters and the input filename can be specified on the command line that invokes the shell script. Note that the pathname to use is system-dependent.
```

### 5.19.2 Language Summary for awk

```text
		This section summarizes how awk processes input records and describes the various syntactic elements that make up an awk program.
```

#### 5.19.2.1. Records and Fields

```text
Each line of input is split into fields. By default, the field delimiter is one or more spaces and/or tabs. You can change the field separator by using the -F command-line option. Doing so also sets the value of FS. The following command-line changes the field separator to a colon:

    awk -F: -f awkscr /etc/passwd

You can also assign the delimiter to the system variable FS. This is typically done in the BEGIN procedure, but can also be passed as a parameter on the command line.

    awk -f awkscr FS=: /etc/passwd

Each input line forms a record containing any number of fields. Each field can be referenced by its position in the record. "$1" refers to the value of the first field; "$2" to the second field, and so on. "$0" refers to the entire record. The following action prints the first field of each input line:

    { print $1 }

The default record separator is a newline. The following procedure sets FS and RS so that awk interprets an input record as any number of lines up to a blank line, with each line being a separate field.

    BEGIN { FS = "\n"; RS = "" }

It is important to know that when RS is set to the empty string, newline always separates fields, in addition to whatever value FS may have. This is discussed in more detail in both The AWK Programming Language and Effective AWK Programming.
```

#### 5.19.2.2. Format of a Script

```text
An awk script is a set of pattern-matching rules and actions:

    pattern { action }

An action is one or more statements that will be performed on those input lines that match the pattern. If no pattern is specified, the action is performed for every input line. The following example uses the print statement to print each line in the input file:

    { print }

If only a pattern is specified, then the default action consists of the print statement, as shown above.

Function definitions can also appear:

    function name (parameter list) { statements }

This syntax defines the function name, making available the list of parameters for processing in the body of the function. Variables specified in the parameter-list are treated as local variables within the function. All other variables are global and can be accessed outside the function. When calling a user-defined function, no space is permitted between the name of the function and the opening parenthesis. Spaces are allowed in the function's definition. User-defined functions are described in Chapter 9, "Functions".
```

#### 5.19.2.2.1. Line termination

```text
A line in an awk script is terminated by a newline or a semicolon. Using semicolons to put multiple statements on a line, while permitted, reduces the readability of most programs. Blank lines are permitted between statements.

Program control statements (do, if, for, or while) continue on the next line, where a dependent statement is listed. If multiple dependent statements are specified, they must be enclosed within braces.

    if (NF > 1) {
    	name = $1
    	total += $2
    }

You cannot use a semicolon to avoid using braces for multiple statements.

You can type a single statement over multiple lines by escaping the newline with a backslash (\). You can also break lines following any of the following characters:

    , { && ||

Gawk also allows you to continue a line after either a "?" or a ":". Strings cannot be broken across a line (except in gawk, using "\" followed by a newline).
```

#### 5.19.2.2.2. Comments

```text
A comment begins with a "#" and ends with a newline. It can appear on a line by itself or at the end of a line. Comments are descriptive remarks that explain the operation of the script. Comments cannot be continued across lines by ending them with a backslash.
```

#### 5.19.2.3. Patterns

```text
A pattern can be any of the following:

    /regular expression/
    relational expression
    BEGIN
    END
    pattern, pattern

   a.

      Regular expressions use the extended set of metacharacters and must be enclosed in slashes. For a full discussion of regular expressions, see Chapter 3, "Understanding Regular Expression Syntax".
   b.

      Relational expressions use the relational operators listed under "Expressions" later in this chapter.
   c.

      The BEGIN pattern is applied before the first line of input is read and the END pattern is applied after the last line of input is read.
   d.

      Use ! to negate the match; i.e., to handle lines not matching the pattern.
   e.

      You can address a range of lines, just as in sed:

          pattern, pattern

      Patterns, except BEGIN and END, can be expressed in compound forms using the following operators:
      && 	Logical And
      || 	Logical Or
      Sun's version of nawk (SunOS 4.1.x) does not support treating regular expressions as parts of a larger Boolean expression. E.g., "/cute/ && /sweet/" or "/fast/ || /quick/" do not work.

      In addition the C conditional operator ?: (pattern ? pattern : pattern) may be used in a pattern.
   f.

      Patterns can be placed in parentheses to ensure proper evaluation.
   g.

      BEGIN and END patterns must be associated with actions. If multiple BEGIN and END rules are written, they are merged into a single rule before being applied.
```

#### 5.19.2.4. Regular Expressions

```text
Table B.1 summarizes the regular expressions as described in Chapter 3, "Understanding Regular Expression Syntax". The metacharacters are listed in order of precedence.
Table B.1. Regular Expression Metacharacters
Special 	
Characters 	Usage
c 	Matches any literal character c that is not a metacharacter.
\ 	Escapes any metacharacter that follows, including itself.
^ 	Anchors following regular expression to the beginning of string.
$ 	Anchors preceding regular expression to the end of string.
. 	Matches any single character, including newline.
[...] 	Matches any one of the class of characters enclosed between the brackets. A circumflex (^) as the first character inside brackets reverses the match to all characters except those listed in the class. A hyphen (-) is used to indicate a range of characters. The close bracket (]) as the first character in a class is a member of the class. All other metacharacters lose their meaning when specified as members of a class, except \, which can be used to escape ], even if it is not first.
r1|r2 	Between two regular expressions, r1 and r2, it allows either of the regular expressions to be matched.
(r1)(r2) 	Used for concatenating regular expressions.
r* 	Matches any number (including zero) of the regular expression that immediately precedes it.
r+ 	Matches one or more occurrences of the preceding regular expression.
r? 	Matches 0 or 1 occurrences of the preceding regular expression.
(r) 	Used for grouping regular expressions.

Regular expressions can also make use of the escape sequences for accessing special characters, as defined in Section 			5.19.2.5.2 later in this appendix.

Note that ^ and $ work on strings; they do not match against newlines embedded in a record or string.

Within a pair of brackets, POSIX allows special notations for matching non-English characters. They are described in Table 			5.19.2.
Table 			5.19.2. POSIX Character List Facilities
Notation 	Facility
[.symbol.] 	Collating symbols. A collating symbol is a multi-character sequence that should be treated as a unit.
[=equiv=] 	Equivalence classes. An equivalence class lists a set of characters that should be considered equivalent, such as "e" and "è".
[:class:] 	Character classes. Character class keywords describe different classes of characters such as alphabetic characters, control characters, and so on.
[:alnum:] 	Alphanumeric characters
[:alpha:] 	Alphabetic characters
[:blank:] 	Space and tab characters
[:cntrl:] 	Control characters
[:digit:] 	Numeric characters
[:graph:] 	Printable and visible (non-space) characters
[:lower:] 	Lowercase characters
[:print:] 	Printable characters
[:punct:] 	Punctuation characters
[:space:] 	Whitespace characters
[:upper:] 	Uppercase characters
[:xdigit:] 	Hexadecimal digits

Note that these facilities (as of this writing) are still not widely implemented.
```

#### 5.19.2.5. Expressions

```text
An expression can be made up of constants, variables, operators and functions. A constant is a string (any sequence of characters) or a numeric value. A variable is a symbol that references a value. You can think of it as a piece of information that retrieves a particular numeric or string value.
```

#### 5.19.2.5.1. Constants

```text
There are two types of constants, string and numeric. A string constant must be quoted while a numeric constant is not.
```

#### 5.19.2.5.2. Escape sequences

```text
The escape sequences described in Table B.3 can be used in strings and regular expressions.
Table B.3. Escape Sequences
Sequence 	Description
\a 	Alert character, usually ASCII BEL character
\b 	Backspace
\f 	Formfeed
\n 	Newline
\r 	Carriage return
\t 	Horizontal tab
\v 	Vertical tab
\ddd 	Character represented as 1 to 3 digit octal value
\xhex 	Character represented as hexadecimal value[91]
\c 	

Any literal character c (e.g., \" for ")[92]

[91]POSIX does not provide "\x", but it is commonly available.

    [92]Like ANSI C, POSIX leaves it purposely undefined what you get when you put a backslash before any character not listed in the table. In most awks, you just get that character.
```

#### 5.19.2.5.3. Variables

```text
There are three kinds of variables: user-defined, built-in, and fields. By convention, the names of built-in or system variables consist of all capital letters.

The name of a variable cannot start with a digit. Otherwise, it consists of letters, digits, and underscores. Case is significant in variable names.

A variable does not need to be declared or initialized. A variable can contain either a string or numeric value. An uninitialized variable has the empty string ("") as its string value and 0 as its numeric value. Awk attempts to decide whether a value should be processed as a string or a number depending upon the operation.

The assignment of a variable has the form:

    var = expr

It assigns the value of the expression to var. The following expression assigns a value of 1 to the variable x.

    x = 1

The name of the variable is used to reference the value:

    { print x }

prints the value of the variable x. In this case, it would be 1.

See the later Section 2.2.5.5 for information on built-in variables. A field variable is referenced using $n, where n is any number 0 to NF, that references the field by position. It can be supplied by a variable, such as $NF meaning the last field, or constant, such as $1 meaning the first field.
```

#### 5.19.2.5.4. Arrays

```text
An array is a variable that can be used to store a set of values. The following statement assigns a value to an element of an array:

    array[index] = value

In awk, all arrays are associative arrays. What makes an associative array unique is that its index can be a string or a number.

An associative array makes an "association" between the indices and the elements of an array. For each element of the array, a pair of values is maintained: the index of the element and the value of the element. The elements are not stored in any particular order as in a conventional array.

You can use the special for loop to read all the elements of an associative array.

    for (item in array)

The index of the array is available as item, while the value of an element of the array can be referenced as array[item].

You can use the operator in to test that an element exists by testing to see if its index exists.

    if (index in array)

tests that array[index] exists, but you cannot use it to test the value of the element referenced by array[index].

You can also delete individual elements of the array using the delete statement.
```

#### 5.19.2.5.5. System variables

```text
Awk defines a number of special variables that can be referenced or reset inside a program, as shown in Table B.4 (defaults are listed in parentheses).
Table B.4. Awk System Variables
Variable 	Description
ARGC 	Number of arguments on command line
ARGV 	An array containing the command-line arguments
CONVFMT 	String conversion format for numbers (%.6g). (POSIX)
ENVIRON 	An associative array of environment variables
FILENAME 	Current filename
FNR 	Like NR, but relative to the current file
FS 	Field separator (a blank)
NF 	Number of fields in current record
NR 	Number of the current record
OFMT 	Output format for numbers (%.6g)
OFS 	Output field separator (a blank)
ORS 	Output record separator (a newline)
RLENGTH 	Length of the string matched by match() function
RS 	Record separator (a newline)
RSTART 	First position in the string matched by match() function
SUBSEP 	Separator character for array subscripts (\034)
```

#### 5.19.2.5.6. Operators

```text
Table B.5 lists the operators in the order of precedence (low to high) that are available in awk.
Table B.5. Operators
Operators 	Description
= += -= *= /= %= ^= **= 	Assignment
?: 	C conditional expression
|| 	Logical OR
&& 	Logical AND
~ !~ 	Match regular expression and negation
< <= > >= != == 	Relational operators
(blank) 	Concatenation
+ - 	Addition, subtraction
* / % 	Multiplication, division, and modulus
+ - ! 	Unary plus and minus, and logical negation
^ ** 	Exponentiation
++ -- 	Increment and decrement, either prefix or postfix
$ 	Field reference

    NOTE: While "**" and "**=" are common extensions, they are not part of POSIX awk.
```

#### 5.19.2.6. Statements and Functions

```text
An action is enclosed in braces and consists of one or more statements and/or expressions. The difference between a statement and a function is that a function returns a value, and its argument list is specified within parentheses. (The formal syntactical difference does not always hold true: printf is considered a statement, but its argument list can be put in parentheses; getline is a function that does not use parentheses.)

Awk has a number of predefined arithmetic and string functions. A function is typically called as follows:

    return = function(arg1,arg2)

where return is a variable created to hold what the function returns. (In fact, the return value of a function can be used anywhere in an expression, not just on the right-hand side of an assignment.) Arguments to a function are specified as a comma-separated list. The left parenthesis follows after the name of the function. (With built-in functions, a space is permitted between the function name and the parentheses.)
```

### 5.19.3 Command Summary for awk

```text
The following alphabetical list of statements and functions includes all that are available in POSIX awk, nawk, or gawk. See Chapter 11, "A Flock of awks", for extensions available in different implementations.

atan2()
    atan2(y, x)

    Returns the arctangent of y/x in radians.
break
    Exit from a while, for, or do loop.

close()
    close(filename-expr)

    close(command-expr)

    In most implementations of awk, you can only have a limited number of files and/or pipes open simultaneously. Therefore, awk provides a close() function that allows you to close a file or a pipe. It takes as an argument the same expression that opened the pipe or file. This expression must be identical, character by character, to the one that opened the file or pipe--even whitespace is significant.
continue
    Begin next iteration of while, for, or do loop.

cos()
    cos(x)

    Return cosine of x in radians.
delete
    delete array[element]

    Delete element of an array.
do
    do

     body

    while (expr)

    Looping statement. Execute statements in body then evaluate expr and if true, execute body again.
exit
    exit [expr]

    Exit from script, reading no new input. The END rule, if it exists, will be executed. An optional expr becomes awk's return value.
exp()
    exp(x)

    Return exponential of x (e ^ x).
for
    for (init-expr; test-expr; incr-expr) statement

    C-style looping construct. init-expr assigns the initial value of the counter variable. test-expr is a relational expression that is evaluated each time before executing the statement. When test-expr is false, the loop is exited. incr-expr is used to increment the counter variable after each pass.

    for (item in array) statement

    Special loop designed for reading associative arrays. For each element of the array, the statement is executed; the element can be referenced by array[item].
getline
    Read next line of input.

    getline [var] [<file]

    command | getline [var]

    The first form reads input from file and the second form reads the output of command. Both forms read one line at a time, and each time the statement is executed it gets the next line of input. The line of input is assigned to $0 and it is parsed into fields, setting NF, NR, and FNR. If var is specified, the result is assigned to var and the $0 is not changed. Thus, if the result is assigned to a variable, the current line does not change. getline is actually a function and it returns 1 if it reads a record successfully, 0 if end-of-line is encountered, and -1 if for some reason it is otherwise unsuccessful.
gsub()
    gsub(r, s, t)

    Globally substitute s for each match of the regular expression r in the string t. Return the number of substitutions. If t is not supplied, defaults to $0.
if
    if (expr) statement1

    [ else statement2 ]

    Conditional statement. Evaluate expr and, if true, execute statement1; if else clause is supplied, execute statement2 if expr is false.
index()
    index(str, substr)

    Return position (starting at 1) of substring in string.
int()
    int(x)

    Return integer value of x by truncating any digits following a decimal point.
length()
    length(str)

    Return length of string, or the length of $0 if no argument.
log()
    log(x)

    Return natural logarithm (base e) of x.
match()
    match(s, r)

    Function that matches the pattern, specified by the regular expression r, in the string s and returns either the position in s where the match begins, or 0 if no occurrences are found. Sets the values of RSTART and RLENGTH to the start and length of the match, respectively.
next
    Read next input line and begin executing script at first rule.

print
    print [ output-expr ] [ dest-expr ]

    Evaluate the output-expr and direct it to standard output followed by the value of ORS. Each output-expr is separated by the value of OFS. dest-expr is an optional expression that directs the output to a file or pipe. "> file" directs the output to a file, overwriting its previous contents. ">> file" appends the output to a file, preserving its previous contents. In both of these cases, the file will be created if it does not already exist. "| command" directs the output as the input to a system command.
printf
    printf (format-expr [, expr-list ]) [ dest-expr ]

    An alternative output statement borrowed from the C language. It has the ability to produce formatted output. It can also be used to output data without automatically producing a newline. format-expr is a string of format specifications and constants; see next section for a list of format specifiers. expr-list is a list of arguments corresponding to format specifiers. See the print statement for a description of dest-expr.
rand()
    rand()

    Generate a random number between 0 and 1. This function returns the same series of numbers each time the script is executed, unless the random number generator is seeded using the srand() function.
return
    return [expr]

    Used at end of user-defined functions to exit function, returning value of expression.
sin()
    sin(x)

    Return sine of x in radians.
split()
    split(str, array, sep)

    Function that parses string into elements of array using field separator, returning number of elements in array. Value of FS is used if no field separator is specified. Array splitting works the same as field splitting.
sprintf()
    sprintf (format-expr [, expr-list ] )

    Function that returns string formatted according to printf format specification. It formats data but does not output it. format-expr is a string of format specifications and constants; see the next section for a list of format specifiers. expr-list is a list of arguments corresponding to format specifiers.
sqrt()
    sqrt(x)

    Return square root of x.
srand()
    srand(expr)

    Use expr to set a new seed for random number generator. Default is time of day. Return value is the old seed.
sub()
    sub(r, s, t)

    Substitute s for first match of the regular expression r in the string t. Return 1 if successful; 0 otherwise. If t is not supplied, defaults to $0.
substr()
    substr(str, beg, len)

    Return substring of string str at beginning position beg, and the characters that follow to maximum specified length len. If no length is given, use the rest of the string.
system()
    system(command)

    Function that executes the specified command and returns its status. The status of the executed command typically indicates success or failure. A value of 0 means that the command executed successfully. A non-zero value, whether positive or negative, indicates a failure of some sort. The documentation for the command you're running will give you the details. The output of the command is not available for processing within the awk script. Use "command | getline" to read the output of a command into the script.
tolower()
    tolower(str)

    Translate all uppercase characters in str to lowercase and return the new string.[93]

        [93]Very early versions of nawk, such as that in SunOS 4.1.x, don't support tolower() and toupper(). However, they are now part of the POSIX specification for awk.

toupper()
    toupper(str)

    Translate all lowercase characters in str to uppercase and return the new string.
while
    while (expr) statement

    Looping construct. While expr is true, execute statement.
```

#### 5.19.3.1. Format Expressions Used in printf and sprintf

```text
A format expression can take three optional modifiers following "%" and preceding the format specifier:

    %-width.precision format-specifier

The width of the output field is a numeric value. When you specify a field width, the contents of the field will be right-justified by default. You must specify "-" to get left-justification. Thus, "%-20s" outputs a string left-justified in a field 20 characters wide. If the string is less than 20 characters, the field will be padded with spaces to fill.

The precision modifier, used for decimal or floating-point values, controls the number of digits that appear to the right of the decimal point. For string formats, it controls the number of characters from the string to print.

You can specify both the width and precision dynamically, via values in the printf or sprintf argument list. You do this by specifying asterisks, instead of specifying literal values.

    printf("%*.*g\n", 5, 3, myvar);

In this example, the width is 5, the precision is 3, and the value to print will come from myvar. Older versions of nawk may not support this.

Note that the default precision for the output of numeric values is "%.6g." The default can be changed by setting the system variable OFMT. This affects the precision used by the print statement when outputting numbers. For instance, if you are using awk to write reports that contain dollar values, you might prefer to change OFMT to "%.2f."

The format specifiers, shown in Table B.6, are used with printf and sprintf statements.
Table B.6. Format Specifiers Used in printf
Character 	Description
c 	ASCII character.
d 	Decimal integer.
i 	Decimal integer. Added in POSIX.
e 	Floating-point format ([-]d.precisione[+-]dd).
E 	Floating-point format ([-]d.precisionE[+-]dd).
f 	Floating-point format ([-]ddd.precision).
g 	e or f conversion, whichever is shortest, with trailing zeros removed.
G 	E or f conversion, whichever is shortest, with trailing zeros removed.
o 	Unsigned octal value.
s 	String.
x 	Unsigned hexadecimal number. Uses a-f for 10 to 15.
X 	Unsigned hexadecimal number. Uses A-F for 10 to 15.
% 	Literal %.

Often, whatever format specifiers are available in the system's sprintf(3) subroutine are available in awk.

The way printf and sprintf() do rounding will often depend upon the system's C sprintf(3) subroutine. On many machines, sprintf rounding is "unbiased," which means it doesn't always round a trailing ".5" up, contrary to naive expectations. In unbiased rounding, ".5" rounds to even, rather than always up, so 1.5 rounds to 2 but 4.5 rounds to 4. The result is that if you are using a format that does rounding (e.g., "%.0f") you should check what your system does. The following function does traditional rounding; it might be useful if your awk's printf does unbiased rounding.

    # round --- do normal rounding
    #	Arnold Robbins, arnold@gnu.ai.mit.edu
    #	Public Domain
    function round(x,       ival, aval, fraction)
    {
            ival = int(x)	# integer part, int() truncates
    	# see if fractional part
    	if (ival == x)	# no fraction
    		return x
    	if (x < 0) {
    		aval = -x	# absolute value
    		ival = int(aval)
    		fraction = aval - ival
    		if (fraction >= .5)
    			return int(x) - 1		# -2.5 --> -3
    		else
    			return int(x)		# -2.3 --> -2
    	} else {
    		fraction = x - ival
    		if (fraction >= .5)
    			return ival + 1
    		else
    			return ival
    	}
    }
```
