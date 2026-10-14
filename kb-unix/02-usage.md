---
type: reference
title: Usage
description: "Grep usage FAQ: listing file names, recursive search, leading dash patterns and context output."
tags: [grep, unix, faq, howto, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "unix-kb#6"
---

# Usage

[↑ unix-kb](/kb-unix/README.md)

```text
Here is an example shell command that invokes GNU grep:

 	

grep -i 'hello.*world' menu.h main.c

This lists all lines in the files `menu.h' and `main.c' that contain the string `hello' followed by the string `world'; this is because `.*' matches zero or more characters within a line. See section 5. Regular Expressions. The `-i' option causes grep to ignore case, causing it to match the line `Hello, world!', which it would not otherwise match. See section 2. Invoking grep, for more details about how to invoke grep.

Here are some common questions and answers about grep usage.
```

### 1.5.8. How can I list just the names of matching files?

```text
	      grep -l 'main' *.c

	      lists the names of all C files in the current directory whose contents mention `main'.
```

### 1.5.9. How do I search directories recursively?

```text
	      grep -r 'hello' /home/gigi

	      searches for `hello' in all files under the directory `/home/gigi'. For more control of which files are searched, use find, grep and xargs. For example, the following command searches only C files:

		

	      find /home/gigi -name '*.c' -print | xargs grep 'hello' /dev/null

	      This differs from the command:

		

	      grep -r 'hello' *.c

	      which merely looks for `hello' in all files in the current directory whose names end in `.c'. Here the `-r' is probably unnecessary, as recursion occurs only in the unlikely event that one of `.c' files is a directory.
```

### 1.5.10. What if a pattern has a leading `-'?

```text
	      grep -e '--cut here--' *

	      searches for all lines matching `--cut here--'. Without `-e', grep would attempt to parse `--cut here--' as a list of options.

	   1.5.11. Word boundary, Suppose I want to search for a whole word, not a part of a word?

		

	      grep -w 'hello' *

	      searches only for instances of `hello' that are entire words; it does not match `Othello'. For more control, use `\<' and `\>' to match the start and end of words. For example:

		

	      grep 'hello\>' *

	      searches only for words ending in `hello', so it matches the word `Othello'.
```

### 1.5.12. How do I output context around the matching lines?

```text
	      grep -C 2 'hello' *

	      prints two lines of context around each matching line.
```

### 1.5.13. How do I force grep to print the name of the file?

```text
	      Append `/dev/null':

		

	      grep 'eli' /etc/passwd /dev/null

	      gets you:

		

	      /etc/passwd:eli:DNGUTF58.IMe.:98:11:Eli Smith:/home/do/eli:/bin/bash
```

### 1.5.14. Why do people use strange regular expressions on ps output?

```text
	      ps -ef | grep '[c]ron'

	      If the pattern had been written without the square brackets, it would have matched not only the ps output line for cron, but also the ps output line for grep. Note that some platforms ps limit the ouput to the width of the screen, grep does not have any limit on the length of a line except the available memory.
```

### 1.5.15. Why does grep report "Binary file matches"?

```text
	      If grep listed all matching "lines" from a binary file, it would probably generate output that is not useful, and it might even muck up your display. So GNU grep suppresses output from files that appear to be binary files. To force GNU grep to output lines even from files that appear to be binary, use the `-a' or `--binary-files=text' option. To eliminate the "Binary file matches" messages, use the `-I' or `--binary-files=without-match' option.
```

### 1.5.16. Why doesn't `grep -lv' print nonmatching file names?

```text
	      `grep -lv' lists the names of all files containing one or more lines that do not match. To list the names of all files that contain no matching lines, use the `-L' or `--files-without-match' option.
```

### 1.5.17. I can do OR with `|', but what about AND?

```text
	      grep 'paul' /etc/motd | grep 'franc,ois'

	      finds all lines that contain both `paul' and `franc,ois'.
```

### 1.5.18. How can I search in both standard input and in files?

```text
	      Use the special file name `-':

		

	      cat /etc/passwd | grep 'alain' - /etc/motd
```

### 1.5.19. How to express palindromes in a regular expression?

```text
	      It can be done by using the back referecences, for example a palindrome of 4 chararcters can be written in BRE.

		

	      grep -w -e '\(.\)\(.\).\2\1' file

	      It matches the word "radar" or "civic".

	      Guglielmo Bondioni proposed a single RE that finds all the palindromes up to 19 characters long.

		

	      egrep -e '^(.?)(.?)(.?)(.?)(.?)(.?)(.?)(.?)(.?).?\9\8\7\6\5\4\3\2\1$' file

	      Note this is done by using GNU ERE extensions, it might not be portable on other greps.
```

### 1.5.20. Why are my expressions whith the vertical bar fail?

```text
	      /bin/echo "ba" | egrep '(a)\1|(b)\1'

	      The first alternate branch fails then the first group was not in the match this will make the second alternate branch fails. For example, "aaba" will match, the first group participate in the match and can be reuse in the second branch.

	  1.5..17. What do grep, fgrep, egrep stand for ?

	      grep comes from the way line editing was done on Unix. For example, ed uses this syntax to print a list of matching lines on the screen.

	      global/regular expression/print
	      g/re/p

	      fgrep stands for Fixed grep, egrep Extended grep.
```

## 1.6 grep or operator

### 1.6.1 Use the OR operator in grep to search for words and phrases

```text
grep is a very powerful command-line search program in the Linux world. In this article, I will cover how to use OR in the grep command to search for words and phrases in a text file.

Suppose you want to find all occurrences of the words "apples" and "oranges" in the text file named fruits.txt.


$ cat fruits.txt
yellow bananas
green apples
red oranges
red apples


$ grep 'apples\|oranges' fruits.txt
green apples
red oranges
red apples


Note that you must use the backslash \ to escape the OR operator (|).

Using the OR operator, you can also search for phrases like "green apples" and "red oranges". You must escape all spaces in a phrase in addition to the OR operator.
$ grep 'green\ apples\|red\ oranges' fruits.txt
green apples
red oranges


You can get away with not escaping the spaces or the | operator if you use the extended regular expression notation. 
$ grep -E 'green apples|red oranges' fruits.txt
green apples
red oranges


egrep is a variant of grep that is equivalent to grep -E. 
$ egrep 'green apples|red oranges' fruits.txt
green apples
red oranges



		1.6.2
	1.7
```
