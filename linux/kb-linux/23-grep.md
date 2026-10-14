---
type: reference
title: grep
description: Section 23 of the legacy KB_Linux notes.
tags: [kb-linux, grep]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#23"
---

# grep , tags: grep

[↑ KB_Linux](/linux/kb-linux/README.md)

## 23.1 Searching Files Using UNIX grep

```text
The grep program is a standard UNIX utility that searches through a set of files for an arbitrary text pattern, specified through a regular expression. Also check the man pages as well for egrep and fgrep. The MPE equivalents are MPEX and Magnet, both third-party products. By default, grep is case-sensitive (use -i to ignore case). By default, grep ignores the context of a string (use -w to match words only). By default, grep shows the lines that match (use -v to show those that don't match).


% grep BOB tmpfile	{search 'tmpfile' for 'BOB' anywhere in a line}
% grep -i -w blkptr * 	{search files in CWD for word blkptr, any case}
% grep run[- ]time *.txt	{find 'run time' or 'run-time' in all txt files}
% who | grep root 	{pipe who to grep, look for root}

Understanding Regular Expressions
Regular Expressions are a feature of UNIX. They describe a pattern to match, a sequence of characters, not words, within a line of text. Here is a quick summary of the special characters used in the grep tool and their meaning:

^ (Caret)	=	match expression at the start of a line, as in ^A.
$ (Question)	=	match expression at the end of a line, as in A$.
\ (Back Slash)	=	turn off the special meaning of the next character, as in \^.
[ ] (Brackets)	=	match any one of the enclosed characters, as in [aeiou]. Use Hyphen "-" for a range, as in [0-9].
[^ ]	=	match any one character except those enclosed in [ ], as in [^0-9].
. (Period)	=	match a single character of any value, except end of line.
* (Asterisk)	=	match zero or more of the preceding character or expression.
\{x,y\}	=	match x to y occurrences of the preceding.
\{x\}	=	match exactly x occurrences of the preceding.
\{x,\}	=	match x or more occurrences of the preceding.

As an MPE user, you may find regular expressions difficult to use at first. Please persevere, because they are used in many UNIX tools, from more to perl. Unfortunately, some tools use simple regular expressions and others use extended regular expressions and some extended features have been merged into simple tools, so that it looks as if every tool has its own syntax. Not only that, regular expressions use the same characters as shell wildcarding, but they are not used in exactly the same way. What do you expect of an operating system built by graduate students?

Since you usually type regular expressions within shell commands, it is good practice to enclose the regular expression in single quotes (') to stop the shell from expanding it before passing the argument to your search tool. Here are some examples using grep:

grep smug files	{search files for lines with 'smug'}
grep '^smug' files	{'smug' at the start of a line}
grep 'smug$' files	{'smug' at the end of a line}
grep '^smug$' files	{lines containing only 'smug'}
grep '\^s' files	{lines starting with '^s', "\" escapes the ^}
grep '[Ss]mug' files	{search for 'Smug' or 'smug'}
grep 'B[oO][bB]' files	{search for BOB, Bob, BOb or BoB }
grep '^$' files	{search for blank lines}
grep '[0-9][0-9]' file	{search for pairs of numeric digits}

Back Slash "\" is used to escape the next symbol, for example, turn off the special meaning that it has. To look for a Caret "^" at the start of a line, the expression is ^\^. Period "." matches any single character. So b.b will match "bob", "bib", "b-b", etc. Asterisk "*" does not mean the same thing in regular expressions as in wildcarding; it is a modifier that applies to the preceding single character, or expression such as [0-9]. An asterisk matches zero or more of what precedes it. Thus [A-Z]* matches any number of upper-case letters, including none, while [A-Z][A-Z]* matches one or more upper-case letters.

The vi editor uses \< \> to match characters at the beginning and/or end of a word boundary. A word boundary is either the edge of the line or any character except a letter, digit or underscore "_". To look for if, but skip stiff, the expression is \<if\>. For the same logic in grep, invoke it with the -w option. And remember that regular expressions are case-sensitive. If you don't care about the case, the expression to match "if" would be [Ii][Ff], where the characters in square brackets define a character set from which the pattern must match one character. Alternatively, you could also invoke grep with the -i option to ignore case.

Here are a few more examples of grep to show you what can be done:

grep '^From: ' /usr/mail/$USER	{list your mail}
grep '[a-zA-Z]'	{any line with at least one letter}
grep '[^a-zA-Z0-9]	{anything not a letter or number}
grep '[0-9]\{3\}-[0-9]\{4\}'	{999-9999, like phone numbers}
grep '^.$'	{lines with exactly one character}
grep '"smug"'	{'smug' within double quotes}
grep '"*smug"*'	{'smug', with or without quotes}
grep '^\.'	{any line that starts with a Period "."}
grep '^\.[a-z][a-z]'	{line start with "." and 2 lc letters}
```

## 23.2 grep for whole word (like vim /\<word\>

```text
grep -w "word" file

	23.3 egrep, tags egrep, extended regular expression

Basic Usage
egrep or grep -E
Run grep with extended regular expressions.
-i Ignore case (ie uppercase, lowercase letters).
-v Return all lines which don't match the pattern.
-w Select only matches that form whole words.
-c Print a count of matching lines.
Can be combined with the -v option to print a count of non matchine lines.
-l Print the name of each file which contains a match.
Normally used when grep is invoked with wildcards for the file argument.
-n Print the line number before each line that matches.
-r Recursive, read all files in given directory and subdirectories.

Regular Expressions
.  A single character
[abc] Range. ie any one of these characters
[^abc] Not range. A character that is not one of those enclosed.
(abc) Group these characters and remember for later.
\n Replace n with a number. Recall the charactes matched in that set of brackets.
May also be used to rename files or directories.
| The logical 'or' operation.
\ In front of a character, removes it's special meaning.

RE Multipliers
?  The preceding item is optional, it is matched zero or one times.
* The preceding item will be matched zero or more times.
+ The preceding item will be matched one or more times.
{n} The preceding item will be matched exactly n times.
{n,} The preceding item will be matched n or more times.
{n,m} The preceding item will be matched between n and m times.

RE Anchors
^ From the beginning of the line.
$ To the end of the line.
\< At the beginning of a word.
\> At the end of a word.
\b Match either the beginning or end of a word.

Some Examples
egrep 'mellon' myfile.txt
Print every line in myfile.txt containing the string 'mellon'.
egrep -n 'mellon' myfile.txt
Same as above but print a line number before each line.
egrep '(.)bb\1' myfile.txt
Find every line with 2 b's and the same character both before and after those b's.
egrep -l '[0-9]{8,}' /files/projectx/*
Print each file in the directory projectx which contains a number of 8 digits or more.
egrep '\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\b' myfile.txt
Print every line of myfiles.txt containing an email address.
Note: this is just a simple email matching pattern. There is a miniscule number of email addresses it will not match.
```

## 23.4 Grep examples

```text
First create the following demo_file that will be used in the examples below to demonstrate grep command.

$ cat demo_file
THIS LINE IS THE 1ST UPPER CASE LINE IN THIS FILE.
this line is the 1st lower case line in this file.
This Line Has All Its First Character Of The Word With Upper Case.

Two lines above this line is empty.
And this is the last line.
```

#### 23.4.1.1. Search for the given string in a single file

```text
The basic usage of grep command is to search for a specific string in the specified file as shown below.

Syntax:
grep "literal_string" filename

$ grep "this" demo_file
this line is the 1st lower case line in this file.
Two lines above this line is empty.
And this is the last line.
```

#### 23.4.1.1.2. Checking for the given string in multiple files.

```text
Syntax:
grep "string" FILE_PATTERN

This is also a basic usage of grep command. For this example, let us copy the demo_file to demo_file1. The grep output will also include the file name in front of the line that matched the specific pattern as shown below. When the Linux shell sees the meta character, it does the expansion and gives all the files as input to grep.

$ cp demo_file demo_file1

$ grep "this" demo_*
demo_file:this line is the 1st lower case line in this file.
demo_file:Two lines above this line is empty.
demo_file:And this is the last line.
demo_file1:this line is the 1st lower case line in this file.
demo_file1:Two lines above this line is empty.
demo_file1:And this is the last line.
```

#### 23.4.1.1.3. Case insensitive search using grep -i

```text
Syntax:
grep -i "string" FILE

This is also a basic usage of the grep. This searches for the given string/pattern case insensitively. So it matches all the words such as “the”, “THE” and “The” case insensitively as shown below.


 
$ grep -i "the" demo_file
THIS LINE IS THE 1ST UPPER CASE LINE IN THIS FILE.
this line is the 1st lower case line in this file.
This Line Has All Its First Character Of The Word With Upper Case.
And this is the last line.
```

#### 23.4.1.1.4. Match regular expression in files

```text
Syntax:
grep "REGEX" filename

This is a very powerful feature, if you can use use regular expression effectively. In the following example, it searches for all the pattern that starts with “lines” and ends with “empty” with anything in-between. i.e To search “lines[anything in-between]empty” in the demo_file.

$ grep "lines.*empty" demo_file
Two lines above this line is empty.
From documentation of grep: A regular expression may be followed by one of several repetition operators:

? The preceding item is optional and matched at most once.
* The preceding item will be matched zero or more times.
+ The preceding item will be matched one or more times.
{n} The preceding item is matched exactly n times.
{n,} The preceding item is matched n or more times.
{,m} The preceding item is matched at most m times.
{n,m} The preceding item is matched at least n times, but not more than m times.
```

#### 23.4.1.1.5. Checking for full words, not for sub-strings using grep -w

```text
If you want to search for a word, and to avoid it to match the substrings use -w option. Just doing out a normal search will show out all the lines.

The following example is the regular grep where it is searching for “is”. When you search for “is”, without any option it will show out “is”, “his”, “this” and everything which has the substring “is”.

$ grep -i "is" demo_file
THIS LINE IS THE 1ST UPPER CASE LINE IN THIS FILE.
this line is the 1st lower case line in this file.
This Line Has All Its First Character Of The Word With Upper Case.
Two lines above this line is empty.
And this is the last line.

The following example is the WORD grep where it is searching only for the word “is”. Please note that this output does not contain the line “This Line Has All Its First Character Of The Word With Upper Case”, even though “is” is there in the “This”, as the following is looking only for the word “is” and not for “this”.

$ grep -iw "is" demo_file
THIS LINE IS THE 1ST UPPER CASE LINE IN THIS FILE.
this line is the 1st lower case line in this file.
Two lines above this line is empty.
And this is the last line.
```

#### 23.4.1.1.6. Displaying lines before/after/around the match using grep -A, -B and -C

```text
When doing a grep on a huge file, it may be useful to see some lines after the match. You might feel handy if grep can show you not only the matching lines but also the lines after/before/around the match.


Please create the following demo_text file for this example.

$ cat demo_text
|4. Vim Word Navigation

You may want to do several navigation in relation to the words, such as:

 * e - go to the end of the current word.
 * E - go to the end of the current WORD.
 * b - go to the previous (before) word.
 * B - go to the previous (before) WORD.
 * w - go to the next word.
 * W - go to the next WORD.

WORD - WORD consists of a sequence of non-blank characters, separated with white space.
word - word consists of a sequence of letters, digits and underscores.

Example to show the difference between WORD and word

 * 192.168.1.1 - single WORD
 * 192.168.1.1 - seven words.
```

#### 23.4.1.1.6.1 Display N lines after match

```text
-A is the option which prints the specified N lines after the match as shown below.

Syntax:
grep -A <N> "string" FILENAME

The following example prints the matched line, along with the 3 lines after it.

$ grep -A 3 -i "example" demo_text
Example to show the difference between WORD and word

* 192.168.1.1 - single WORD
* 192.168.1.1 - seven words.
```

#### 23.4.1.1.6.2 Display N lines before match

```text
-B is the option which prints the specified N lines before the match.

Syntax:
grep -B <N> "string" FILENAME

When you had option to show the N lines after match, you have the -B option for the opposite.

$ grep -B 2 "single WORD" demo_text
Example to show the difference between WORD and word

* 192.168.1.1 - single WORD
```

#### 23.4.1.1.6.3 Display N lines around match

```text
-C is the option which prints the specified N lines before the match. In some occasion you might want the match to be appeared with the lines from both the side. This options shows N lines in both the side(before & after) of match.

$ grep -C 2 "Example" demo_text
word - word consists of a sequence of letters, digits and underscores.

Example to show the difference between WORD and word

* 192.168.1.1 - single WORD
```

#### 23.4.1.1.7. Highlighting the search using GREP_OPTIONS

```text
As grep prints out lines from the file by the pattern / string you had given, if you wanted it to highlight which part matches the line, then you need to follow the following way.

When you do the following export you will get the highlighting of the matched searches. In the following example, it will highlight all the this when you set the GREP_OPTIONS environment variable as shown below.

$ export GREP_OPTIONS='--color=auto' GREP_COLOR='100;8'

$ grep this demo_file
this line is the 1st lower case line in this file.
Two lines above this line is empty.
And this is the last line.
```

#### 23.4.1.1.8. Searching in all files recursively using grep -r

```text
When you want to search in all the files under the current directory and its sub directory. -r option is the one which you need to use. The following example will look for the string “ramesh” in all the files in the current directory and all it’s subdirectory.

$ grep -r "ramesh" *
```

#### 23.4.1.1.9. Invert match using grep -v

```text
You had different options to show the lines matched, to show the lines before match, and to show the lines after match, and to highlight match. So definitely You’d also want the option -v to do invert match.

When you want to display the lines which does not matches the given string/pattern, use the option -v as shown below. This example will display all the lines that did not match the word “go”.

$ grep -v "go" demo_text
|4. Vim Word Navigation

You may want to do several navigation in relation to the words, such as:

WORD - WORD consists of a sequence of non-blank characters, separated with white space.
word - word consists of a sequence of letters, digits and underscores.

Example to show the difference between WORD and word

* 192.168.1.1 - single WORD
* 192.168.1.1 - seven words.
```

#### 23.4.1.1.10. display the lines which does not matches all the given pattern.

```text
Syntax:
grep -v -e "pattern" -e "pattern"

$ cat test-file.txt
a
b
c
d

$ grep -v -e "a" -e "b" -e "c" test-file.txt
d
```

#### 23.4.1.1.11. Counting the number of matches using grep -c

```text
When you want to count that how many lines matches the given pattern/string, then use the option -c.

Syntax:
grep -c "pattern" filename

$ grep -c "go" demo_text
6

When you want do find out how many lines matches the pattern

$ grep -c this demo_file
3

When you want do find out how many lines that does not match the pattern

$ grep -v -c this demo_file
4
            23.4.1.1.12. Display only the file names which matches the given pattern using grep -l

If you want the grep to show out only the file names which matched the given pattern, use the -l (lower-case L) option.

When you give multiple files to the grep as input, it displays the names of file which contains the text that matches the pattern, will be very handy when you try to find some notes in your whole directory structure.

$ grep -l this demo_*
demo_file
demo_file1
```

#### 23.4.1.1.13. Show only the matched string

```text
By default grep will show the line which matches the given pattern/string, but if you want the grep to show out only the matched string of the pattern then use the -o option.

It might not be that much useful when you give the string straight forward. But it becomes very useful when you give a regex pattern and trying to see what it matches as

$ grep -o "is.*line" demo_file
is line is the 1st lower case line
is line
is is the last line
```

#### 23.4.1.1.14. Show the position of match in the line

```text
When you want grep to show the position where it matches the pattern in the file, use the following options as

Syntax:
grep -o -b "pattern" file

$ cat temp-file.txt
12345
12345

$ grep -o -b "3" temp-file.txt
2:3
8:3

Note: The output of the grep command above is not the position in the line, it is byte offset of the whole file.
```

#### 23.4.1.1.15. Show line number while displaying the output using grep -n

```text
To show the line number of file with the line matched. It does 1-based line numbering for each file. Use -n option to utilize this feature.

$ grep -n "go" demo_text
5: * e - go to the end of the current word.
6: * E - go to the end of the current WORD.
7: * b - go to the previous (before) word.
8: * B - go to the previous (before) WORD.
9: * w - go to the next word.
10: * W - go to the next WORD.

	23.5
```
