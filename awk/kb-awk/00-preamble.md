---
type: reference
title: Preamble
description: "Preamble of the legacy awk KB: awk as a text-manipulation tool."
tags: [awk, legacy, unix, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#preamble"
---

# Preamble

[↑ kb_awk](/awk/kb-awk/README.md)

```text
Description: 	AWK Knowledge. AWK is an extremelly important unix tool for manipulating text files.
Author:		Yosi Izaq.

1. 

    1.1 print specifires
$0 - full line
$n - nth field
$NF - last field , # of fields

    1.2 pretty print results of awk
	1.1 example:
		$ grep  ismg change_set_12_06  | awk -F"@" '{print $1}' | awk -F"\\" '{print "Lib: " $4 ", File " $5}' |sort | uniq
		ignore the grep and sort and the first awk, note the print command.

	1.3 Awk One-Liners Explained, Part III: Selective Printing and Deleting of Certain Lines
http://www.catonmat.net/blog/awk-one-liners-explained-part-three/

This is the third and final part of a three-part article on the Awk one-liners. This part will explain Awk one-liners for selective printing and deletion of certain lines. See part one for introduction of the series.

If you just came to my website, then you might wonder, "What are these Awk one-liners and why are they famous?" The answer is very simple - they are small and beautiful Awk programs that do one and only text manipulation task very well. They have been circulating around the Internet as awk1line.txt text file and they have been written by Eric Pement.

If you are intrigued by this article series, I suggest that you subscribe to my posts, as I will have a lot more interesting and educational articles this year.

Eric Pement's Awk one-liner collection consists of five sections:

| 1. File spacing (explained in part one).
| 2. Numbering and calculations (explained in part one).
| 3. Text conversion and substitution (explained in part two).
| 4. Selective printing of certain lines (explained in this part).
| 5. Selective deletion of certain lines (explained in this part).
| 6. String creation, array creation and update on selective printing of certain lines (explained in bonus article).
| 7. Release of Awk One-Liners Explained e-book.
Awesome news: I have written an e-book based on this article series. Check it out:


Awk book

Grab my Awk cheat sheet and the local copy of Awk one-liners file awk1line.txt and let's roll.

	    1.3.1 Selective Printing of Certain Lines

	        1.3.1.1 Print the first 10 lines of a file (emulates "head -10").

awk 'NR < 11'
Awk has a special variable called "NR" that stands for "Number of Lines seen so far in the current file". After reading each line, Awk increments this variable by one. So for the first line it's 1, for the second line 2, ..., etc. As I explained in the very first one-liner, every Awk program consists of a sequence of pattern-action statements "pattern { action statements }". The "action statements" part get executed only on those lines that match "pattern" (pattern evaluates to true). In this one-liner the pattern is "NR < 11" and there are no "action statements". The default action in case of missing "action statements" is to print the line as-is (it's equivalent to "{ print $0 }"). The pattern in this one-liner is an expression that tests if the current line number is less than 11. If the line number is less than 11, Awk prints the line. As soon as the line number is 11 or more, the pattern evaluates to false and Awk skips the line.

A much better way to do the same is to quit after seeing the first 10 lines (otherwise we are looping over lines > 10 and doing nothing):

awk '1; NR == 10 { exit }'
The "NR == 10 { exit }" part guarantees that as soon as the line number 10 is reached, Awk quits. For lines smaller than 10, Awk evaluates "1" that is always a true-statement. And as we just learned, true statements without the "action statements" part are equal to "{ print $0 }" that just prints the first ten lines!

	        1.3.1.2 Print the first line of a file (emulates "head -1").

awk 'NR > 1 { exit }; 1'
This one-liner is very similar to previous one. The "NR > 1" is true only for lines greater than one, so it does not get executed on the first line. On the first line only the "1", the true statement, gets executed. It makes Awk print the line and read the next line. Now the "NR" variable is 2, and "NR > 1" is true. At this moment "{ exit }" gets executed and Awk quits. That's it. Awk printed just the first line of the file.

	        1.3.1.3 Print the last 2 lines of a file (emulates "tail -2").

awk '{ y=x "\n" $0; x=$0 }; END { print y }'
Okay, so what does this one do? First of all, notice that "{y=x "\n" $0; x=$0}" action statement group is missing the pattern. When the pattern is missing, Awk executes the statement group for all lines. For the first line, it sets variable "y" to "\nline1" (because x is not yet defined). For the second line it sets variable "y" to "line1\nline2". For the third line it sets variable "y" to "line2\nline3". As you can see, for line N it sets the variable "y" to "lineN-1\nlineN". Finally, when it reaches EOF, variable "y" contains the last two lines and they get printed via "print y" statement.

Thinking about this one-liner for a second one concludes that it is very ineffective - it reads the whole file line by line just to print out the last two lines! Unfortunately there is no seek() statement in Awk, so you can't seek to the end-2 lines in the file (that's what tail does). It's recommended to use "tail -2" to print the last 2 lines of a file.

	        1.3.1.4 Print the last line of a file (emulates "tail -1").

awk 'END { print }'
This one-liner may or may not work. It relies on an assumption that the "$0" variable that contains the entire line does not get reset after the input has been exhausted. The special "END" pattern gets executed after the input has been exhausted (or "exit" called). In this one-liner the "print" statement is supposed to print "$0" at EOF, which may or may not have been reset.

It depends on your awk program's version and implementation, if it will work. Works with GNU Awk for example, but doesn't seem to work with nawk or xpg4/bin/awk.

The most compatible way to print the last line is:

awk '{ rec=$0 } END{ print rec }'
Just like the previous one-liner, it's computationally expensive to print the last line of the file this way, and "tail -1" should be the preferred way.

	        1.3.1.5 Print only the lines that match a regular expression "/regex/" (emulates "grep").

awk '/regex/'
This one-liner uses a regular expression "/regex/" as a pattern. If the current line matches the regex, it evaluates to true, and Awk prints the line (remember that missing action statement is equal to "{ print }" that prints the whole line).

	        1.3.1.6 Print only the lines that do not match a regular expression "/regex/" (emulates "grep -v").

awk '!/regex/'
Pattern matching expressions can be negated by appending "!" in front of them. If they were to evaluate to true, appending "!" in front makes them evaluate to false, and the other way around. This one-liner inverts the regex match of the previous (#49) one-liner and prints all the lines that do not match the regular expression "/regex/".

	        1.3.1.7 Print the line immediately before a line that matches "/regex/" (but not the line that matches itself).

awk '/regex/ { print x }; { x=$0 }'
This one-liner always saves the current line in the variable "x". When it reads in the next line, the previous line is still available in the "x" variable. If that line matches "/regex/", it prints out the variable x, and as a result, the previous line gets printed.

It does not work, if the first line of the file matches "/regex/", in that case, we might want to print "match on line 1", for example:

awk '/regex/ { print (x=="" ? "match on line 1" : x) }; { x=$0 }'
This one-liner tests if variable "x" contains something. The only time that x is empty is at very first line. In that case "match on line 1" gets printed. Otherwise variable "x" gets printed (that as we found out contains the previous line). Notice that this one-liner uses a ternary operator "foo?bar:baz" that is short for "if foo, then bar, else baz".

	        1.3.1.8 Print the line immediately after a line that matches "/regex/" (but not the line that matches itself).

awk '/regex/ { getline; print }'
This one-liner calls the "getline" function on all the lines that match "/regex/". This function sets $0 to the next line (and also updates NF, NR, FNR variables). The "print" statement then prints this next line. As a result, only the line after a line matching "/regex/" gets printed.

If it is the last line that matches "/regex/", then "getline" actually returns error and does not set $0. In this case the last line gets printed itself.

	        1.3.1.9 Print lines that match any of "AAA" or "BBB", or "CCC".

awk '/AAA|BBB|CCC/'
This one-liner uses a feature of extended regular expressions that support the | or alternation meta-character. This meta-character separates "AAA" from "BBB", and from "CCC", and tries to match them separately on each line. Only the lines that contain one (or more) of them get matched and printed.

	        1.3.1.10 Print lines that contain "AAA" and "BBB", and "CCC" in this order.

awk '/AAA.*BBB.*CCC/'
This one-liner uses a regular expression "AAA.*BBB.*CCC" to print lines. This regular expression says, "match lines containing AAA followed by any text, followed by BBB, followed by any text, followed by CCC in this order!" If a line matches, it gets printed.

	        1.3.1.11 Print only the lines that are 65 characters in length or longer.

awk 'length > 64'
This one-liner uses the "length" function. This function is defined as "length([str])" - it returns the length of the string "str". If none is given, it returns the length of the string in variable $0. For historical reasons, parenthesis () at the end of "length" can be omitted. This one-liner tests if the current line is longer than 64 chars, if it is, the "length > 64" evaluates to true and line gets printed.

	        1.3.1.12 Print only the lines that are less than 64 characters in length.

awk 'length < 64'
This one-liner is almost byte-by-byte equivalent to the previous one. Here it tests if the length if line less than 64 characters. If it is, Awk prints it out. Otherwise nothing gets printed.

	        1.3.1.13 Print a section of file from regular expression to end of file.

awk '/regex/,0'
This one-liner uses a pattern match in form 'pattern1, pattern2' that is called "range pattern". The 3rd Awk Tip from article "10 Awk Tips, Tricks and Pitfalls" explains this match very carefully. It matches all the lines starting with a line that matches "pattern1" and continuing until a line matches "pattern2" (inclusive). In this one-liner "pattern1" is a regular expression "/regex/" and "pattern2" is just 0 (false). So this one-liner prints all lines starting from a line that matches "/regex/" continuing to end-of-file (because 0 is always false, and "pattern2" never matches).

	        1.3.1.14 Print lines 8 to 12 (inclusive).

awk 'NR==8,NR==12'
This one-liner also uses a range pattern in format "pattern1, pattern2". The "pattern1" here is "NR==8" and "pattern2" is "NR==12". The first pattern means "the current line is 8th" and the second pattern means "the current line is 12th". This one-liner prints lines between these two patterns.
```
