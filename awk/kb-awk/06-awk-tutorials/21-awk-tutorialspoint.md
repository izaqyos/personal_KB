---
type: reference
title: awk tutorialspoint
description: "Tutorialspoint awk practice: basics with a marks.txt sample file."
tags: [awk, tutorial, legacy, examples, unix]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.20"
---

# 5.20 awk tutorialspoint , tags: awk tutorialspoint

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.20.1 practice

#### 5.20.1.1 basics

#### 5.20.1.1.1 add header

```text
$ cat marks.txt 
1)  Amit    Physics  80
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
$ awk 'BEGIN{printf "Sr  Name    Course\tGrade\n"} {print}' marks.txt 
Sr  Name    Course	Grade
1)  Amit    Physics  80
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
```

#### 5.20.1.1.2 provide command file

```text
$ cat cmd.awk 
{print $1 $2}
$ awk -f cmd.awk marks.txt 
1)Amit
2)Rahul
3)Shyam
4)Kedar
5)Hari
```

#### 5.20.1.1.3 awk options

#### 5.20.1.1.3.1 The -v option

```text
This option assigns a value to a variable. It allows assignment before the program execution. The following example describes the usage of the -v option.
$ awk -v name=yosi 'BEGIN {printf "my name is %s\n", name}'
my name is yosi
```

#### 5.20.1.1.3.2 The --dump-variables[=file] option

```text
It prints a sorted list of global variables and their final values to file. The default file is awkvars.out.
```

#### 5.20.1.1.4 print columns

```text
$0 - whole line
$n - nth column
$NF - last column
/patter/ print only lines matching pattern

$ awk '{print $2 "\t" $4}' marks.txt 
Amit	80
Rahul	90
Shyam	87
Kedar	85
Hari	89
$ awk '/8/ {print $2 "\t" $4}' marks.txt 
Amit	80
Shyam	87
Kedar	85
Hari	89
$ awk '/8/ {print $0}' marks.txt 
1)  Amit    Physics  80
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
```

#### 5.20.1.1.5 count matches

```text
$ awk '/8/ {counter++} END{print "match 8 count ", counter}' marks.txt 
match 8 count  4
```

#### 5.20.1.1.6 print lines longer than X characters

```text
$ awk 'length($0) > 20' marks.txt 
1)  Amit    Physics  80
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89
$ awk 'length($0) > 30' marks.txt 
$ 
```

#### 5.20.1.1.7 ARGV and ARGC

```text
$ awk 'BEGIN {
> for (i=0;i<ARGC; ++i) {
> printf "ARGV[%d] = %s\n", i, ARGV[i]
> }
> }' aaa bbb ccc
ARGV[0] = awk
ARGV[1] = aaa
ARGV[2] = bbb
ARGV[3] = ccc
```

#### 5.20.1.1.8 built in variables CONVFMT, ENVIRON, FILENAME, FS, NF, NR etc

```text
CONVFMT represents the conversion format for numbers. Its default value is %.6g.

Example
[jerry]$ awk 'BEGIN { print "Conversion Format =", CONVFMT }'

Output
Conversion Format = %.6g

ENVIRON - associative array of all env vars
$ awk 'BEGIN {print ENVIRON["SHELL"]}'
/bin/bash

$ awk 'END {print FILENAME}' marks.txt 
marks.txt

FS
It represents the (input) field separator and its default value is space. You can also change this by using -F command line option.

Example

[jerry]$ awk 'BEGIN {print "FS = " FS}' | cat -vte

Output

FS =  $
NF
It represents the number of fields in the current record. For instance, the following example prints only those lines that contain more than two fields.

Example

[jerry]$ echo -e "One Two\nOne Two Three\nOne Two Three Four" | awk 'NF > 2'

Output

One Two Three
One Two Three Four
NR
It represents the number of the current record. For instance, the following example prints the record if the current record number is less than three.

Example

[jerry]$ echo -e "One Two\nOne Two Three\nOne Two Three Four" | awk 'NR < 3'

Output

One Two
One Two Three
FNR
It is similar to NR, but relative to the current file. It is useful when AWK is operating on multiple files. Value of FNR resets with new file.

OFMT
It represents the output format number and its default value is %.6g.

Example

[jerry]$ awk 'BEGIN {print "OFMT = " OFMT}'

Output

OFMT = %.6g
OFS
It represents the output field separator and its default value is space.

Example

[jerry]$ awk 'BEGIN {print "OFS = " OFS}' | cat -vte

Output

OFS =  $
ORS
It represents the output record separator and its default value is newline.

Example

[jerry]$ awk 'BEGIN {print "ORS = " ORS}' | cat -vte

Output

ORS = $
$
RLENGTH
It represents the length of the string matched by match function. AWK's match function searches for a given string in the input-string.

Example

[jerry]$ awk 'BEGIN { if (match("One Two Three", "re")) { print RLENGTH } }'

Output

2
RS
It represents (input) record separator and its default value is newline.

Example

[jerry]$ awk 'BEGIN {print "RS = " RS}' | cat -vte

Output

RS = $
$
RSTART
It represents the first position in the string matched by match function.

Example

[jerry]$ awk 'BEGIN { if (match("One Two Three", "Thre")) { print RSTART } }'

Output

9
SUBSEP
It represents the separator character for array subscripts and its default value is \034.

Example

[jerry]$ awk 'BEGIN { print "SUBSEP = " SUBSEP }' | cat -vte

Output

SUBSEP = ^\$
$0
It represents the entire input record.

Example

[jerry]$ awk '{print $0}' marks.txt

Output

1) Amit     Physics   80
2) Rahul    Maths     90
3) Shyam    Biology   87
4) Kedar    English   85
5) Hari     History   89
$n
It represents the nth field in the current record where the fields are separated by FS.

Example

[jerry]$ awk '{print $3 "\t" $4}' marks.txt

Output

Physics   80
Maths     90
Biology   87
English   85
History   89

                5.20.1.1.9
```

### 5.20.2 operators

#### 5.20.2.1 arithmetic

```text
Addition
It is represented by plus (+) symbol which adds two or more numbers. The following example demonstrates this

Example
[jerry]$ awk 'BEGIN { a = 50; b = 20; print "(a + b) = ", (a + b) }'

Output
(a + b) = 70
Subtraction
It is represented by minus (-) symbol which subtracts two or more numbers. The following example demonstrates this

Example
[jerry]$ awk 'BEGIN { a = 50; b = 20; print "(a - b) = ", (a - b) }'

Output
(a - b) = 30
Multiplication
It is represented by asterisk (*) symbol which multiplies two or more numbers. The following example demonstrates this

Example
[jerry]$ awk 'BEGIN { a = 50; b = 20; print "(a * b) = ", (a * b) }'

Output
(a * b) = 1000
Division
It is represented by slash (/) symbol which divides two or more numbers. The following example illustrates this

Example
[jerry]$ awk 'BEGIN { a = 50; b = 20; print "(a / b) = ", (a / b) }'

Output
(a / b) = 2.5
Modulus
It is represented by percent (%) symbol which finds the Modulus division of two or more numbers. The following example illustrates this

Example
[jerry]$ awk 'BEGIN { a = 50; b = 20; print "(a % b) = ", (a % b) }'
On executing this code, you get the following result

Output
(a % b) = 10
```

#### 5.20.2.2 increment decrement

```text
pre/post inc/decrement ++a, --a, a++, a-- difference is return value. pre first modified then returns. post vice versa
```

#### 5.20.2.3 assignment

```text
= , += -= /= %= ^= **=
```

#### 5.20.2.4 relational

```text
like in C++
== , != , <, <=, >, >=
```

#### 5.20.2.5 logical

```text
like in C++
&&, || , !
and or not
```

#### 5.20.2.6 ternary

```text
expr? statement1: statement2
```

#### 5.20.2.7 unary

```text
            +, -
            multiply by +1 , -1
```

#### 5.20.2.8 exponential

```text
^, **
```

#### 5.20.2.9 string concat

```text
strange one. space.
example:
$ awk 'BEGIN{s1="aaa"; s2="bbb"; s3=s1 s2; print s3}'
aaabbb
```

#### 5.20.2.10 array membership and iteration over array

```text
$ awk 'BEGIN{a[1]="aaa"; a[2]="bbb"; s3=s1 s2; for (idx in a) printf "a[%d]=%s\n", idx,a[idx]}'
a[2]=bbb
a[1]=aaa

unlike python x in arr is index, not element
```

#### 5.20.2.11 regular expression

```text
!~, ~
not match and match
$ awk '$0 ~ "A[a-z]"' marks.txt 
1)  Amit    Physics  80

$ awk '$0 !~ "A[a-z]"' marks.txt 
2)  Rahul   Maths    90
3)  Shyam   Biology  87
4)  Kedar   English  85
5)  Hari    History  89


            5.20.2.12
```

### 5.20.3 regular expressions

```text
run of the mill...
. - any char
^, $ - begin end of line
[], [^] - char set inclusive / exclusive
| - or
? - 0 or 1 occurrences
+ - 1 or more occurrences 
() - grouping
ex:
$ echo -e "Good morning" | awk '/^[^GO]../'
$ echo -e "Good morning" | awk '/^[GO]../'
Good morning
```

### 5.20.4 arrays

```text
AWK has associative arrays and one of the best thing about it is the indexes need not to be continuous set of number; you can use either string or number as an array index. Also, there is no need to declare the size of an array in advance arrays can expand/shrink at runtime

Its syntax is as follows

Syntax
array_name[index] = value
Where array_name is the name of array, index is the array index, and value is any value assigning to the element of the array.

create array
$ awk 'BEGIN{ a["yosi"]="izaq";a["guy"]="hanan"; print a["yosi"] "\n" a["guy"]}'
izaq
hanan


delete array elements:
delete arr[index]

arrays support is for 1 dimension only.
to "use" multi dim array like MxN use arithmetic to access i,j element stored in 1 dim array. e.g. m*i+j 
```

### 5.20.5 control flows

```text
if (cond) 
    action 
or {} for multiple actions
if (cond) {
    action1;
    action2;
    ...
}

also if else and if else if else are supported
e.x.
 awk 'BEGIN {
   a = 30;
   
   if (a==10)
   print "a = 10";
   else if (a == 20)
   print "a = 20";
   else if (a == 30)
   print "a = 30";
}'
```

### 5.20.6 loops

```text
like in C

for (init; cond; inc/decr) {
}
alse while (cond) {} and do {} while (cond)

break and continue are supported

exit(code) - exists with status code
```

### 5.20.7 builtin functions

#### 5.20.7.1 arithmetic

```text
atan(y,x) - arctangent of y/x
cos, exp, log, int (truncates), rand (random num x 0<=x<1), sin, sqrt, srand(seed) (random with seed, defaults to current time)
```

#### 5.20.7.2 string

```text
asort - typographically sort array
ex:
[jerry]$ awk 'BEGIN {
   arr[0] = "Three"
   arr[1] = "One"
   arr[2] = "Two"
   print "Array elements before sorting:"
   
   for (i in arr) {
      print arr[i]
   }
   asort(arr)
   print "Array elements after sorting:"
   
   for (i in arr) {
      print arr[i]
   }
}'

aorti - sort by index
gsub(regex, sub, string)
gsub stands for global substitution. It replaces every occurrence of regex with the given string (sub). The third parameter is optional. If it is omitted, then $0 is used.
ex:
[jerry]$ awk 'BEGIN {
   str = "Hello, World"
   print "String before replacement = " str
   
   gsub("World", "Jerry", str)
   print "String after replacement = " str
}'

index(str, sub)
It checks whether sub is a substring of str or not. On success, it returns the position where sub starts; otherwise it returns 0. The first character of str is at position 1.

[jerry]$ awk 'BEGIN {
   str = "One Two Three"
   subs = "Two"
   ret = index(str, subs)
   
   printf "Substring \"%s\" found at %d location.\n", subs, ret
}'

length(str) - str length

match(str, regex)
It returns the index of the first longest match of regex in string str. It returns 0 if no match found
ex:
 awk 'BEGIN {
   str = "One Two Three"
   subs = "Two"
   ret = match(str, subs)
  
   printf "Substring \"%s\" found at %d location.\n", subs, ret
}'

split(str, arr, regex)
This function splits the string str into fields by regular expression regex and the fields are loaded into the array arr. If regex is omitted, then FS is used.

awk 'BEGIN {
   str = "One,Two,Three,Four"
   split(str, arr, ",")
   print "Array contains following values"
   
   for (i in arr) {
      print arr[i]
   }
}'

printf(format, expr-list)
This function returns a string constructed from expr-list according to format.
awk 'BEGIN {
   param = 1024.0
   result = sqrt(param)
   
   printf "sqrt(%f) = %f\n", param, result
}'

strtonum(str)
This function examines str and return its numeric value. If str begins with a leading 0, it is treated as an octal number. If str begins with a leading 0x or 0X, it is taken as a hexadecimal number. Otherwise, assume it is a decimal number.

sub(regex, sub, string)
This function performs a single substitution. It replaces the first occurrence of the regex pattern with the given string (sub). The third parameter is optional. If it is omitted, $0 is used.


substr(str, start, l)
This function returns the substring of string str, starting at index start of length l. If length is omitted, the suffix of str starting at index start is returned.

tolower(str)
This function returns a copy of string str with all upper-case characters converted to lower-case.

toupper(str)
This function returns a copy of string str with all lower-case characters converted to upper case.
```

#### 5.20.7.3 time functions

```text
systime This function returns the current time of the day as the number of seconds since the Epoch (1970-01-01 00:00:00 UTC on POSIX systems).
[jerry]$ awk 'BEGIN {
   print "Number of seconds since the Epoch = " systime()
}'

mktime(datespec)
awk 'BEGIN {
   print "Number of seconds since the Epoch = " mktime("2014 12 14 30 20 10")
}'

strftime([format [, timestamp[, utc-flag]]])
awk 'BEGIN {
   print strftime("Time = %m/%d/%Y %H:%M:%S", systime())
}'
```

#### 5.20.7.4 bit manipulation

```text
AND, OR, XOR compl, lshift, rshift , equivalent in C++ to &&, ||, ^, ~, <<, >>
```

#### 5.20.7.5 miscellaneous

```text
close(expr)
This function closes file of pipe..

Example
[jerry]$ awk 'BEGIN {
   cmd = "tr [a-z] [A-Z]"
   print "hello, world !!!" |& cmd
   
   close(cmd, "to")
   cmd |& getline out
   print out;
   
   close(cmd);
}'
On executing this code, you get the following result

Output
HELLO, WORLD !!!
Does the script look cryptic? Let us demystify it.

The first statement, cmd = "tr [a-z] [A-Z]" - is the command to which we establish the two way communication from AWK.

The next statement, i.e., the print command, provides input to the tr command. Here &| indicates two-way communication.

The third statement, i.e., close(cmd, "to"), closes the to process after competing its execution.

The next statement cmd |& getline out stores the output into out variable with the aid of getline function.

The next print statement prints the output and finally the close function closes the command.
```

### 5.20.8 functions syntax

```text
# Returns minimum number
function find_min(num1, num2){
   if (num1 < num2)
   return num1
   return num2
}
# Returns maximum number
function find_max(num1, num2){
   if (num1 > num2)
   return num1
   return num2
}
# Main function
function main(num1, num2){
   # Find minimum number
   result = find_min(10, 20)
   print "Minimum =", result
  
   # Find maximum number
   result = find_max(10, 20)
   print "Maximum =", result
}
# Script execution starts here
BEGIN {
   main(10, 20)
}
```

### 5.20.9 redirection operators

````text
>, writes to file 
>>, appends to file
| - pipe one cmd output to another cmd input
|& - 2 way pipe
see explanation by GPT:
The `|&` operator in Linux is used for two-way communication between two processes. It combines the standard output (`stdout`) and standard error (`stderr`) of a command, allowing them to be sent to another command or process. This can be useful when you want to capture both standard output and standard error in a single stream.

Here are a couple of examples demonstrating the usage of the `|&` operator:

### Example 1: Redirecting both stdout and stderr to a file

```bash
# Run a command and redirect both stdout and stderr to a file
command1 |& tee output.txt
```

In this example, the `tee` command is used to redirect both standard output and standard error to a file named `output.txt`. The `tee` command will also display the output on the terminal.

### Example 2: Piping stdout and stderr to another command

```bash
# Run a command and pipe both stdout and stderr to another command
command1 |& grep "error"
```

In this example, the output (both stdout and stderr) of `command1` is piped to the `grep` command, which searches for lines containing the word "error."

### Example 3: Redirecting both stdout and stderr separately

```bash
# Run a command and redirect stdout to file1 and stderr to file2
command1 > file1 2> file2
```

In this example, stdout is redirected to `file1`, and stderr is redirected to `file2`. This is the traditional way of redirecting stdout and stderr separately.

### Note:
- The `|&` operator is available in certain shells like Bash. If your shell does not support it, you can use `2>&1` to achieve similar functionality.
- The `2>&1` notation is an alternative for redirecting stderr to the same location as stdout. It combines stderr (file descriptor 2) with stdout (file descriptor 1).

```bash
command1 2>&1 | grep "error"
```

These examples illustrate different ways to use the `|&` operator for two-way process communication and redirection of both standard output and standard error in Linux command-line environments.
````

### 5.20.10 pretty printing

```text
https://www.tutorialspoint.com/awk/awk_pretty_printing.htm

        5.20.11
    5.21
```
