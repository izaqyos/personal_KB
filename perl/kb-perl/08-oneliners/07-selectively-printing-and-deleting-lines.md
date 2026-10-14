---
type: cheatsheet
title: Selectively Printing and Deleting Lines
description: Subsection 8.7 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.7"
---

# 8.7 Selectively Printing and Deleting Lines

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

```text
In this chapter, we’ll examine various one-liners that print and delete certain lines. These one-liners will, for example, print repeated lines, print the shortest line in a file, and print lines that match certain patterns.

But every one-liner that prints certain lines can also be viewed as one that deletes the lines that aren’t printed. For example, a one-liner that prints all unique lines deletes all repeated lines. I’ll discuss only the one-liners that print something, rather than delete something, because one is always the inverse of the other.
```

### 8.7.1 Print the first line of a file (emulate head -1)

```text
perl -ne 'print; exit' file

This one-liner is quite simple. Perl reads the first line into the $_ variable, thanks to the -n option, and then calls print to print the contents of the $_ variable. Then it just exits. That’s it. The first line is printed and that’s what you want.

You might also say that this one-liner deletes all lines except the first one. But don’t worry. This particular one-liner won’t delete the contents of the file unless you also specify the -i command-line argument, like this:

perl -i -ne 'print; exit' file

As I explained in Chapter 1 and in one-liner 6.1 on page 59, the -i argument edits the file in-place. In this case, all the lines in the file would be deleted except for the first. When using -i, always specify a backup extension to it, like this:

perl -i.bak -ne 'print; exit' file

This will create a backup file file.bak before the contents are overwritten.

You can add the -i command-line argument to any of the one-liners to change the file content. If you don’t use the -i argument, the one-liners simply print the new content of the file to screen rather than modifying the file.
```

### 8.7.2 Print the first 10 lines of a file (emulate head -10)

```text
perl -ne 'print if $. <= 10' file

This one-liner uses the $. special variable, which stands for “the current line number.” Each time Perl reads in a line, it increments $. by 1, so clearly this one-liner simply prints the first 10 lines.

This one-liner can also be written without the if statement:

perl -ne '$. <= 10 && print' file

Here, print is called only if the Boolean expression $. <= 10 is true, and this expression is true only if the current line number is less than or equal to 10.

Another, though somewhat trickier, way to do this is with the range operator (..) in the scalar context:

perl -ne 'print if 1..10' file

The range operator in the scalar context returns a Boolean value. The operator is bistable, like a flip-flop, and emulates the line-range (comma) operator in sed, awk, and various text editors. Its value is false as long as its left operand is false. Once the left operand is true, the range operator is true until the right operand is true, after which the range operator becomes false again. As a result, this bistable operator becomes true at the first line, stays true until the tenth line, and then becomes and remains false.

A fourth option is to follow the first example in this chapter:

perl -ne 'print; exit if $. == 10' file

Here, I put a condition on exit, which is that the current line (which I just printed) is number 10.

$ perl -ne 'print if $. <=10' context
02/04
jrules tutorial:
 D:\ILOG\JRules503\doc\html\tutorial\index.html
 
ILOG rule builder fishstore project.

all tutorials:
D:\ILOG\JRules503\examples.html

03/04
```

### 8.7.3 Print the last line of a file (emulate tail -1)

```text
perl -ne '$last = $_; END { print $last }' file

Printing the last line of a file is trickier than printing the first line, because you never know which is the last line. As a result, you always have to keep the line you just read in memory. In this one-liner, you always save the current line held in $_ into the $last variable. When the Perl program ends, it executes the code in the END block, which prints the last line read.

Here’s another way to do this:

perl -ne 'print if eof' file

This one-liner uses the eof (or end-of-file) function, which returns 1 if the next read returns the end-of-file. Because the next read after the last line in the file will return the end-of-file, this one-liner does the job. The next read means that Perl will attempt to read a character from the current file, and if reading the character fails, it will signal that the end-of-file has been reached, meaning the whole file has been read. If the read succeeds, Perl secretly puts the character back in the input stream as if nothing had happened.


$ perl -lne '$l=$_; END {print $l}' context
D:\ILOG\JRules503\doc\html\tutbrlanguage\index.html
```

### 8.7.4 Print the last 10 lines of a file (emulate tail -10)

```text
perl -ne 'push @a, $_; @a = @a[@a-10..$#a] if @a>10; END { print @a }' file

This one-liner is a bit tricky. Here, you push each line to the @a array and then replace @a with a slice of itself if the list contains more than 10 elements. The phrase @a = @a[@a-10..$#a] means “replace @a with the last 10 elements of @a.” The bit @a-10 causes @a to be evaluated in the scalar context, and thus it returns the number of elements in the array minus 10. The expression $#a is the last index in the @a array. And finally, @a[@a-10..$#a] slices (returns) the last 10 elements of the array, with which it overwrites @a itself so it always contains only the last 10 elements.

For example, suppose @a contains (line1, line2, line3, line4), and you want to print the last four lines of the file. When you read the fifth line, the array becomes (line1, line2, line3, line4, line5), and the value of @a-4 is 1 because @a in the scalar context is 5. But the value of $#a is 4 because it’s the last index in the array. Therefore when you take the slice @a[@a-4..$#a], it becomes @a[1..4], which drops the front element from the array, and the @a array becomes (line2, line3, line4, line5).

A simpler way to write this is with shift:

perl -ne 'push @a, $_; shift @a if @a>10; END { print @a }' file

This one-liner doesn’t need to slice @a because you can guarantee that if @a > 10, then @a == 11. shift is an operator that removes the first element of an array. So in this loop, you can simply shift off the first stored line when you have more than 10 lines.


| 
| $ tail -10 !$
| tail -10 context
| D:\ILOG\JRules503\examples.html
| 
| 03/04
| 1. cont. XSD tutorial
| http://www.w3schools.com/schema/schema_complex_text.asp
| 
| 2. Install ACS. talk 2 eitan fux 7290
| 
| 3. cont BRL tutorial:
| D:\ILOG\JRules503\doc\html\tutbrlanguage\index.$ perl -ne 'push @a , $_; shift @a if @a > 10 ; END {print @a}' context
| D:\ILOG\JRules503\examples.html
| 
| 03/04
| 1. cont. XSD tutorial
| http://www.w3schools.com/schema/schema_complex_text.asp
| 
| 2. Install ACS. talk 2 eitan fux 7290
| 
| 3. cont BRL tutorial:
```

### 8.7.5 Print only lines that match a regular expression

```text
perl -ne '/regex/ && print'

This one-liner tests to see whether the current line matches /regex/. If so, the /regex/ match succeeds and print is called.

Instead of using &&, you can also use if to reverse the /regex/ and print statements:

perl -ne 'print if /regex/'

Print only lines that match a regular expression

perl -ne '/regex/ && print'

This one-liner tests to see whether the current line matches /regex/. If so, the /regex/ match succeeds and print is called.

Instead of using &&, you can also use if to reverse the /regex/ and print statements:

perl -ne 'print if /regex/'
```

### 8.7.6 Print only lines that do not match a regular expression

```text
perl -ne '!/regex/ && print'

This one-liner inverts the previous one-liner. Here, I test to see that the line doesn’t match /regex/ by inverting the match via the ! operator. If the line doesn’t match, I call print to print the line.

You can also write this the other way around:

perl -ne 'print if !/regex/'

And you can also use unless instead of if !:

perl -ne 'print unless /regex/'

Another way to write this is to apply De Morgan’s law to !/regex/ && print:

perl -ne '/regex/ || print'
```

### 8.7.7 Print every line preceding a line that matches a regular expression

```text
perl -ne '/regex/ && $last && print $last; $last = $_'

This one-liner prints a line when it is above a line that matches /regex/. Let’s walk through it, beginning at the last statement, $last = $_, which saves each line in the $last variable. Suppose the next line is read and it matches /regex/. Because the previous line is saved in $last, the one-liner simply prints it. The series of && means first that the regular expression must match and second that $last must be a true value. (Blank lines are still printed because they contain the newline character.)

Say you have a file with four lines:

hello world
magic line
bye world
magic line

and you want to print all lines above those that match magic. You can do this:

perl -ne '/magic/ && $last && print $last; $last = $_'

and the one-liner will print:

hello world
bye world

$ perl -ne '/^\d+/ && $last && print $last; $last = $_' context

03/04
```

### 8.7.8 Print every line following a line that matches a regular expression

```text
perl -ne 'if ($p) { print; $p = 0 } $p++ if /regex/'

Here, I set the variable $p to 1 if the current line matches the regular expression. The fact that the variable $p is 1 indicates that the next line should be printed. Now, when the next line is read in and $p is set, that line is printed and $p is reset to 0. Quite simple.

Let’s say you have this four-line file:

science
physics
science
math

and you want to print all lines below those that match science. Do this:

perl -ne 'if ($p) { print; $p = 0 } $p++ if /science/'

The one-liner will print:

physics
math

If you want to write this with && and avoid using if and curly brackets, do this:

perl -ne '$p && print && ($p = 0); $p++ if /science/'

You can also be very smart about this and simplify this one-liner to the following:

perl -ne '$p && print; $p = /science/'

If the current line matches science, then variable $p is set to a true value and the next line gets printed. If the current line doesn’t match science, then $p becomes undefined and the next line doesn’t get printed.  
```

### 8.7.9 Print lines that match regular expressions AAA and BBB in any order

```text
perl -ne '/AAA/ && /BBB/ && print'

This one-liner tests to see whether a line matches two regular expressions. If a line matches /AAA/ and /BBB/, it’s printed. Specifically, this one-liner prints the line foo AAA bar BBB baz because it contains both AAA and BBB, but it won’t print the line foo AAA bar AAA because it doesn’t contain BBB.

			8.7.10  Print lines that match regular expression AAA followed by BBB followed by CCC

perl -ne '/AAA.*BBB.*CCC/ && print'

Here, I simply chain the regular expressions AAA, BBB, and CCC with .*, which means “match anything or nothing at all.” If AAA is followed by BBB, which is followed by CCC, the line prints. For example, this one-liner matches and prints strings like 123AAA880BBB222CCC, xAAAyBBBzCCC, and AAABBBCCC.
```

### 8.7.11 Print lines that are at least 80 characters long

```text
perl -ne 'print if length >= 80'

This one-liner prints all lines that are at least 80 characters long. In Perl, you can sometimes omit the parentheses () for function calls, so here I’ve omitted them for the length function call. In fact, the invocations length, length(), and length($_) are all the same as far as Perl is concerned.

If you don’t want to count line endings, you can turn on automatic handling of line endings with -l:

perl -lne 'print if length >= 80'

This switch ensures that a blank line has zero length, whereas it usually has length 1 or 2, depending on the file format. (UNIX newlines have length 1; Windows newlines have length 2.)
```

### 8.7.12 Print lines that are fewer than 80 characters long

```text
perl -ne 'print if length() < 80'

This one-liner reverses the previous one. It checks to see whether the length of a line is less than 80 characters. Again, you use -l if you don’t want the line endings to be counted.
```

### 8.7.13 Print only line 13

```text
perl -ne '$. == 13 && print && exit'

As I explained in one-liner 7.2 on page 70, the $. special variable stands for “the current line number.” Therefore, if $. has a value of 13, this one-liner prints the line and exits.
```

### 8.7.14 Print all lines except line 27

```text
perl -ne '$. != 27 && print'

As in the previous one-liner, this one checks to see whether the line number of the current line is 27. If a line is not 27, it prints; if it is, it doesn’t print.

You can accomplish the same thing by reversing print and $. != 27 and using the if statement modifier—just like this:

perl -ne 'print if $. != 27'

Or you can use unless:

perl -ne 'print unless $. == 27'
```

### 8.7.15 Print only lines 13, 19, and 67

```text
perl -ne 'print if $. == 13 || $. == 19 || $. == 67'

This one-liner prints only lines 13, 19, and 67. It doesn’t print any other lines. Here’s how it works: It calls print if the current line number, stored in the $. variable, is 13, 19, or 67. You can use any line numbers to print specific lines. For example, to print the lines 13, 19, 88, 290, and 999, you do this:

perl -ne 'print if $. == 13 || $. == 19 || $. == 88 || $. == 290 || $. == 999'

If you want to print more lines, you can put them in a separate array and then test whether $. is in this array:

perl -ne '
  @lines = (13, 19, 88, 290, 999, 1400, 2000);
  print if grep { $_ == $. } @lines
'

This one-liner uses grep to test if the current line $. is in the @lines array. If the current line number is found in the @lines array, the grep function returns a list of one element that contains the current line number and this list evaluates to true. If the current line number is not found in the @lines array, the grep function returns an empty list that evaluates to false.


$ perl -ne '
@lines = (1,3,4,5,7);
print if grep { $_ == $. } @lines  
' stam
{ 
, "TrustedDomains":
[
{"trustee":"<null>", forest":"R1.dom, "domain":"r1.dom",	         "netbiosname":"R1, "sid":"S-1-5-21-1326888423-829440567-4131818482",  "site":"Default-First-Site-Name", "authenticable":"yes"},
{"trustee":"R1.DOM", forest":"R2.dom, "domain":"r2.dom",          "netbiosname":"R2, "sid":"S-1-5-21-971665854-3820453311-4154378001",  "site":"Default-First-Site-Name", "authenticable":"yes"},
$ 
```

### 8.7.16 Print all lines from 17 to 30

```text
perl -ne 'print if $. >= 17 && $. <= 30'

In this one-liner, the $. variable stands for the current line number. As a result, the one-liner checks to see whether the current line number is greater than or equal to 17 and less than or equal to 30.

You can do the same thing using the flip-flop operator, which is explained in one-liner 7.2 on page 70. The flip-flop operator operates on $. when used with integers:

perl -ne 'print if 17..30'
```

### 8.7.17 Print all lines between two regular expressions (including the lines that match)

```text
perl -ne 'print if /regex1/../regex2/'

This one-liner uses the flip-flop operator (explained in one-liner 7.2 on page 70). When used with integers, the operands are tested against the $. variable. When used with regular expressions, the operands are tested against the current line, stored in the $_ variable. Initially the operator returns false. When a line matches regex1, the operator flips and starts returning true until another line matches regex2. At that point, the operator returns true for the last time and then flips to the false state. From now on the operator returns false. This one-liner, therefore, prints all lines between (and including) the lines that match regex1 and regex2.

$ perl -ne ' print if /provider/../R2.dom/ ' stam
"provider":"lsa-activedirectory-provider", "forest":"R1.dom", "domain":"R1.DOM" 
, "TrustedDomains":
[
{"trustee":"<null>", forest":"R1.dom, "domain":"r1.dom",	         "netbiosname":"R1, "sid":"S-1-5-21-1326888423-829440567-4131818482",  "site":"Default-First-Site-Name", "authenticable":"yes"},
{"trustee":"R1.DOM", forest":"R1.dom, "domain":"c1.r1.dom",       "netbiosname":"C1, "sid":"S-1-5-21-744145595-4020540173-647283928",   "site":"<null>", "authenticable":"yes"},
{"trustee":"R1.DOM", forest":"R2.dom, "domain":"r2.dom",          "netbiosname":"R2, "sid":"S-1-5-21-971665854-3820453311-4154378001",  "site":"Default-First-Site-Name", "authenticable":"yes"},
$ 
```

### 8.7.18 Print the longest line

```text
perl -ne '
  $l = $_ if length($_) > length($l);
  END { print $l }
'

This one-liner keeps the longest line seen so far in the $l variable. If the length of the current line $_ exceeds the length of the longest line, the value in $l is replaced with the value of the current line. Before exiting, the END block is executed, and it prints the longest line value that’s held in $l.

Remember to use -l if you want to prevent the newline characters from counting toward the line length.
```

### 8.7.19 Print the shortest line

```text
perl -ne '
  $s = $_ if $. == 1;
  $s = $_ if length($_) < length($s);
  END { print $s }
'

This one-liner is the opposite of the previous one. Because it’s finding the shortest line and $s is not defined for the first line, you have to set its value to the first line explicitly through $s = $_ if $. == 1. Then it simply does the opposite of the previous one-liner. That is, it checks to see whether the current line is the shortest line so far and, if so, assigns it to $s.
```

### 8.7.20 Print all lines containing digits

```text
perl -ne 'print if /\d/'

This one-liner uses the regular expression \d (which stands for “a digit”) to see whether a line contains a digit. If so, the check succeeds, and the line is printed. For example, this line would be printed because it contains digits:

coding is as easy as 123

However, this line wouldn’t be printed because it doesn’t contain digits:

coding is as easy as pie
```

### 8.7.21 Print all lines containing only digits

```text
perl -ne 'print if /^\d+$/'

In this one-liner, the regular expression ^\d+$ means “match a line if it contains only digits from the beginning until the end.” For example, this line would be printed because it contains only digits:

3883737189170238912377

However, this line wouldn’t be printed because it also contains some characters:

8388338 foo bar random data 999

You can also invert the ^\d$ regular expression and use \D:

perl -lne 'print unless /\D/'

This one-liner is great for developing your logical reasoning because it uses logical negation twice. Here, the line prints only if it does not contain a non-numeric character. In other words, it prints only if all the characters are numeric. (Notice that I used the -l command-line argument for this one-liner because of the newline character at the end of the line. If I didn’t use -l, the line would contain the newline character—a non-numeric character—and it wouldn’t be printed.)
```

### 8.7.22 Print all lines containing only alphabetic characters

```text
perl -ne 'print if /^[[:alpha:]]+$/

This one-liner checks to see whether a line contains only alphabetic characters. If so, it prints the line. The [[:alpha:]] stands for “any alphabetic character.” And [[:alpha:]]+ stands for “all alphabetic characters.”
```

### 8.7.23 Print every second line

```text
perl -ne 'print if $. % 2'

This one-liner prints the first, third, fifth, and seventh lines (and so on). It does so because $. % 2 is true when the current line number is odd and false when the current line number is even.
```

### 8.7.24 Print every second line, beginning with the second line

```text
perl -ne 'print if $. % 2 == 0'

This one-liner is like previous one, except it prints the second, fourth, sixth, and eighth lines (and so on) because $. % 2 == 0 is true when the current line number is even.

Alternatively, you can simply invert the test from the previous example:

perl -ne 'print unless $. % 2'
```

### 8.7.25 Print all repeated lines only once

```text
perl -ne 'print if ++$a{$_} == 2'

This one-liner tracks the lines it has seen so far and counts the number of times it has seen the lines previously. If it sees a line a second time, it prints the line because ++$a{$_} == 2 is true. If it sees a line more than two times, it does nothing because the count for this line is greater than 2.

breakdown:
$a{} - hash, key is line content $_, value starts at 1 for each line, ++ when same line encountered
```

### 8.7.26 Print all unique lines

```text
perl -ne 'print unless $a{$_}++'

This one-liner prints a line only if the hash value $a{$_} for that line is false. Every time Perl reads in a line, it increments $a{$_}, which ensures that this one-liner prints only never-before-seen lines.

			8.7.27   Print n line before regexp
ex, n=4
$ ed stam5
stam5: No such file or directory
aaa
?
a
aaaaa
bbb
ccccc
dddddd
eeeee
ffffff
gggggg

-> w/o regex
$ perl -ne 'if (/fff/) {  print @a ; undef @a} ; if (@a<4) {push @a, $_} ;if (@a ==4) {shift @a} ; ' stam5
ccccc
dddddd
eeeee


-> with regex
$ perl -ne 'if (/fff/) {  print @a ; undef @a; print $_} ; if (@a<4) {push @a, $_} ;if (@a ==4) {shift @a} ; ' stam5
ccccc
dddddd
eeeee
ffffff

-> before lines as paeameter
$ perl -ne 'BEGIN {$b=4} ; if (/fff/) {  print @a ; undef @a; print $_} ; if (@a<$b) {push @a, $_} ;if (@a == $b) {shift @a} ; ' stam5
ccccc
dddddd
eeeee
ffffff

			8.7.28  
```
