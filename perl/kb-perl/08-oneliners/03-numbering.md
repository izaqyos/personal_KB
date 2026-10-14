---
type: cheatsheet
title: Numbering
description: Subsection 8.3 of Oneliners.
tags: [kb-perl]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "perl/KB_perl#8.3"
---

# 8.3 Numbering

[↑ Oneliners](/perl/kb-perl/08-oneliners/README.md)

### 8.3.1 Number all lines in a file

```text
perl -pe '$_ = "$. $_"'

As I explained in one-liner 2.1 (page 7), -p tells Perl to assume a loop around the program (specified by -e) that reads each line of input into the $_ variable, executes the program, and then prints the contents of the $_ variable.

This one-liner simply modifies $_ by prepending the $. variable to it. The special variable $. contains the current line number of the input. The result is that each line has its line number prepended.

Similarly, you can also use the -n argument and print the string "$. $_", which is the current line number followed by the line:

perl -ne 'print "$. $_"'

Say a file contains three lines:

foo
bar
baz

Running this one-liner numbers them:

1 foo
2 bar
3 baz

$ perl -pe '$_ = "$. $_";' stam
1 ﻿ct diff -pred -g <internal-path>
2 ct diff -pred -g <internal-path>
3 ct diff -pred -g <internal-path>
4 
```

### 8.3.2 Number only non-empty lines in a file

```text
perl -pe '$_ = ++$x." $_" if /./'

Here you employ an “action if condition” statement that executes an action only if the condition is true. In this case, the condition is the regular expression /./, which matches all characters other than newline (that is, it matches a non-empty line). The action $_ = ++$x." $_" prepends the variable $x incremented by one to the current line. Because you’re not using the strict pragma, $x is created automatically the first time it’s incremented.

The result is that at each non-empty line $x is incremented by one and prepended to that line. Nothing is modified at the empty lines, and they are printed as is.

One-liner 2.2 (page 11) shows another way to match non-empty lines through the \S regular expression:

perl -pe '$_ = ++$x." $_" if /\S/'

Say a file contains four lines, two of which are empty:

line1
line4

Running this one-liner numbers only lines one and four:

1 line1
2 line4

$ perl -pe '$_ = ++$y . " $_" if /./;' stam
1 ﻿ct diff -pred -g <internal-path>
2 ct diff -pred -g <internal-path>
3 ct diff -pred -g <internal-path>
```

### 8.3.3 Number and print only non-empty lines in a file (drop empty lines)

```text
perl -ne 'print ++$x." $_" if /./'

This one-liner uses the -n program argument, which places the line in the $_ variable and then executes the program specified by -e. Unlike -p, -n does not print the line after executing the code in -e, so you have to call print explicitly to print the contents of the $_ variable.

The one-liner calls print only on lines with at least one character, and as in the previous one-liner, it increments the line number in the variable $x by one for each non-empty line. The empty lines are ignored and never printed.

Say a file contains the same four lines as in one-liner 3.2:

line1
line4

Running this one-liner drops the empty lines and numbers lines one and four:

1 line1
2 line4
```

### 8.3.4 Number all lines but print line numbers only for non-empty lines

```text
perl -pe '$_ = "$. $_" if /./'

This one-liner is similar to one-liner 3.2. Here, you modify the $_ variable that holds the entire line only if the line has at least one character. All other empty lines are printed as is, without line numbers.

Say a file contains four lines:

line1

line4

Running this one-liner numbers all the lines but prints the line numbers only for lines one and four:

1 line1

4 line4


example:
$ perl -pe '$_ = "$. $_" if /./' Gundo/README 
1 This is a mirror of http://www.vim.org/scripts/script.php?script_id=3304

3 Gundo is a Vim plugin for visualizing your undo tree to make it usable.

5 Go to the site for more information: http://sjl.bitbucket.org/gundo.vim/

7 Requirements: Vim 7.3+ with Python 2.4+ support.
$ cat !$
cat Gundo/README
This is a mirror of http://www.vim.org/scripts/script.php?script_id=3304

Gundo is a Vim plugin for visualizing your undo tree to make it usable.

Go to the site for more information: http://sjl.bitbucket.org/gundo.vim/

Requirements: Vim 7.3+ with Python 2.4+ support.
```

### 8.3.5 Number only lines that match a pattern; print others unmodified

```text
perl -pe '$_ = ++$x." $_" if /regex/'

Here, again, you use an “action if condition” statement, and again the condition is a pattern (a regular expression): /regex/. The action is the same as in one-liner 3.2.

Say a file contains these lines:

record foo
bar baz
record qux

and you want to number the lines that contain the word record. You can replace /regex/ in the one-liner with /record/:

perl -pe '$_ = ++$x." $_" if /record/'

When you run this one-liner, it gives you the following output:

1 record foo
bar baz
2 record qux
```

### 8.3.6 Number and print only lines that match a pattern

```text
perl -ne 'print ++$x." $_" if /regex/'

This one-liner is almost exactly like one-liner 3.3, except it only numbers and prints lines that match /regex/. It doesn’t print nonmatching lines.

For example, a file contains the same lines as in one-liner 3.5:

record foo
bar baz
record qux

And let’s say you want to number and print only the lines that contain the word record. In this case, changing /regex/ to /record/ and running the one-liner gives you this result:

1 record foo
2 record qux
```

### 8.3.7 Number all lines in a file using a custom format

```text
perl -ne 'printf "%-5d %s", $., $_'

This one-liner uses printf to print the line number together with the line contents. printf does formatted printing. You specify the format and send it the data to print, and it formats and prints the data accordingly. Here, the format for the line numbers is %-5d, which aligns the line numbers five positions to the left.

Here’s an example. Say the input to this one-liner is

hello world
bye world

Then the output is

1     hello world
2     bye world

Other format strings include %5d, which aligns the line numbers five positions to the right, and %05d, which zero-fills and right-justifies the line numbers. Here’s the output you get with the %5d format string for line numbers:

    1 hello world
    2 bye world

And this is what you get with the %05d format string:

00001 hello world
00002 bye world

To learn more about the various formats that are available, run perldoc -f sprintf at the command line.
```

### 8.3.8 Print the total number of lines in a file (emulate wc -l)

```text
perl -lne 'END { print $. }'

This one-liner uses the END block that Perl took as a feature from the Awk language. The END block is executed once the Perl program has executed. Here, the Perl program is the hidden loop over the input created by the -n argument. Once it loops over the input, the special variable $. contains the number of lines in the input, and the END block prints this variable. The -l parameter sets the output record separator for print to a newline, so you don’t have to print the newline yourself, like this: print "$.\n".

You can do the same thing with this one-liner:

perl -le 'print $n = () = <>'

This one-liner is easy to grasp if you understand Perl contexts well. The () = <> part tells Perl to evaluate the <> operator (the diamond operator) in the list context, which makes the diamond operator read the whole file as a list of lines. Next, you assign this list to $n. Because $n is scalar, this list assignment is evaluated in the scalar context.

What’s really happening here is the = operator is right-associative, meaning the = on the right is done first and the = on the left is done second:

perl -le 'print $n = (() = <>)'

Evaluating a list assignment in the scalar context returns the number of elements in the list; thus, the $n = () = <> construction is equal to the number of lines in the input, that is, the number of lines in the file. The print statement prints this number. The -l argument ensures a newline is added after printing this number.

You can also drop the variable $n from this one-liner and force the scalar context through the scalar operator:

perl -le 'print scalar(() = <>)'

Here, instead of evaluating a list assignment in the scalar context by assigning it again to another scalar, you simply evaluate the list assignment in the scalar context using the scalar operator.

And now for a more obvious version:

perl -le 'print scalar(@foo = <>)'

Here, instead of using an empty list () to force the list context on <>, you use the variable @foo to achieve the same effect.

And here’s another way to do it:

perl -ne '}{print $.'

This one-liner uses the so-called eskimo operator }{ (actually a clever construct) in conjunction with the -n command-line argument. As I explained earlier, the -n argument forces Perl to assume a while(<>) { } loop around the program. The eskimo operator forces Perl to escape the loop, and the one-liner expands to

while (<>) {
}{               # eskimo operator here
    print $.;
}

As you can see, this program just loops over all the input, and once it’s finished, it prints the $., which is the number of lines in the input. It becomes even more obvious if you change the formatting a little:

while (<>) {}
{
    print $.;
}

As you can see, this is just an empty loop that loops over all the input, followed by the print statement wrapped in curly brackets.
--------------------------------------------------------------------------------------------------------------------------------------------
my example:
$ perl -lne 'END {print $. ;}' brew.rb 
177
$ perl -le 'END {print $n = () = <>  ;}' brew.rb 
177
--------------------------------------------------------------------------------------------------------------------------------------------
```

### 8.3.9 3.10 Print the number of non-empty lines in a file

```text
perl -le 'print scalar(grep { /./ } <>)'

This one-liner uses Perl’s grep function, which is similar to the grep UNIX command. Given a list of values, grep { condition } list returns only those values in the list that make the condition true. In this case, the condition is a regular expression that matches at least one character, so the input is filtered and grep{ /./ } returns all non-empty lines. To get the number of lines, you evaluate grep in the scalar context and print the result.

Some Perl programmers like to create the shortest Perl program that does some particular task—an exercise called Perl golfing. A golfer’s version of this one-liner would replace scalar() with ~~ (double bitwise negate) and drop the spaces, shortening it like this:

perl -le 'print ~~grep{/./}<>'

This double bitwise negate trick is effectively a synonym for scalar because the bitwise negation works on scalar values, so grep is evaluated in the scalar context.

You can make this even shorter by dropping the space after print and getting rid of the curly brackets:

perl -le 'print~~grep/./,<>'

If you have Perl 5.10 or later, you can also use the -E command-line switch and the say operator:

perl -lE 'say~~grep/./,<>'

A true golfer’s masterpiece!

--------------------------------------------------------------------------------------------------------------------------------------------
my example:
non empty lines:
$ perl -le 'print scalar (grep {/./}  <>) ; ' brew.rb 
154
empty lines:
$ perl -le 'print scalar (grep {/^$/}  <>) ; ' brew.rb 
23
--------------------------------------------------------------------------------------------------------------------------------------------
```

### 8.3.10 Print the number of empty lines in a file

```text
perl -lne '$x++ if /^$/; END { print $x+0 }'

Here, you use the variable $x to count the number of empty lines encountered. Once you’ve looped over all the lines, you print the value of $x in the END block. You use the $x+0 construction to ensure that 0 is output if no lines are empty. (Otherwise $x is never created and is undefined. Adding +0 to the undefined value produces 0.) An alternative to $x+0 is the int operator:

perl -lne '$x++ if /^$/; END { print int $x }'

You could also modify the previous one-liner by doing this:

perl -le 'print scalar(grep { /^$/ } <>)'

Or write it with ~~:

perl -le 'print ~~grep{ /^$/ } <>'

The ~~ does bitwise negation twice, which makes grep execute in the scalar context and return the number of empty lines.

These last two versions are not as effective as the one-liner with the END block because they read the whole file into memory, whereas the one-liner with the END block does it line by line and, therefore, keeps only one line of input in memory.

			8.3.11 
Print the number of lines in a file that match a pattern (emulate grep -c)

perl -lne '$x++ if /regex/; END { print $x+0 }'

This one-liner is basically the same as 3.11, except it increments the line counter $x by one when a line matches the regular expression /regex/. The $x+0 trick makes sure 0 is printed when no lines match /regex/. (See one-liner 3.11 for a more detailed explanation of the $x+0 trick.)
```

### 8.3.12 Number words across all lines

```text
perl -pe 's/(\w+)/++$i.".$1"/ge'

This one-liner uses the /e flag, which makes Perl evaluate the replace part of the s/regex/replace/ expression as code!

The code here is ++$i.".$1", which means “increment variable $i by one and then add it in front of the string ".$1" (that is, a dot followed by the contents of the matched group $1).” The matched group here is each word: (\w+).

In one sentence, this one-liner matches a word (\w+), puts it in $1, and then executes the ++$i.".$1" code that numbers the word globally (/g flag). There—all words are numbered.

For example, if you have a file with the following three lines:

just another
perl hacker
hacking perl code

running this one-liner numbers each word in the file and produces the following output:

|  1.just 2.another
|  3.perl 4.hacker
|  5.hacking 6.perl 7.code

$ perl -pe 's/(\w+)/++$i.": $1"/ge' brew.rb  | head
#!/1: System/2: Library/3: Frameworks/4: Ruby.5: framework/6: Versions/7: Current/8: usr/9: bin/10: ruby -11: W0

12: std_trap = 13: trap("14: INT") { 15: exit! 16: 130 } # 17: no 18: backtrace 19: thanks

20: HOMEBREW_BREW_FILE = 21: ENV['22: HOMEBREW_BREW_FILE']

23: if 24: ARGV == %25: w{--26: prefix}
  27: puts 28: File.29: dirname(30: File.31: dirname(32: HOMEBREW_BREW_FILE))
  33: exit 34: 0
35: end
```

### 8.3.13 Number words on each individual line

```text
perl -pe '$i=0; s/(\w+)/++$i.".$1"/ge'

This is similar to one-liner 3.13, except that you reset the $i variable to 0 on each line. Here’s the result of running this one-liner on the example from one-liner 3.13:

| 1.just 2.another
| 1.perl 2.hacker
| 1.hacking 2.perl 3.code

As you can see, in each line the words are numbered independently of other lines.

$ perl -pe '$i=0; s/(\w+)/"(".++$i.")$1"/ge ' context_Apr_2014  | head
(1)This (2)file (3)contains (4)work (5)related (6)notes (7)for (8)Yosi (9)Izaq, (10)<email>
(1)File (2)name: /(3)Users/(4)<user>/(5)Desktop/(6)Work/(7)context_Apr_2014

     -> <(1)URL:~/(2)Desktop/(3)Work/(4)context_Jan_2014>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)context_Feb_2014>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)context_Jan_2014>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)ISE/(5)PBIS/(6)PBIS_notes>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)acs/(5)5.(6)0/(7)AD/(8)ADClientPlan>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)acs/(5)5.(6)0/(7)AD/(8)MAR_Plan>
     -> <(1)URL:~/(2)Desktop/(3)Work/(4)acs/(5)5.(6)1/(7)CoA/(8)CoA_Plan>
```

### 8.3.14 Replace all words with their numeric positions

```text
			perl -pe 's/(\w+)/++$i/ge'

			This one-liner is almost the same as one-liner 3.13. Here, you simply replace each word with its numeric position, which is kept in the variable $i. For example, if you run this one-liner on the file from one-liners 3.13 and 3.14, it replaces the words in the file with their numeric positions to produce this output:

			1 2
			3 4
			5 6 7


			8.3.15  

			8.3.16 
```
