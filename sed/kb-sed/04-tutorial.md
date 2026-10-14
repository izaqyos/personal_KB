---
type: reference
title: Tutorial
description: Section 4 of the legacy KB_sed notes.
tags: [kb-sed]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "sed/KB_sed#4"
---

# Tutorial

[↑ KB_sed](/sed/kb-sed/README.md)

```text
	Example file "list"
	$cat list
John Daggett, 341 King Road, Plymouth MA
Alice Ford, 22 East Broadway, Richmond VA
Orville Thomas, 11345 Oak Bridge Road, Tulsa OK
Terry Kalkas, 402 Lans Road, Beaver Falls PA
Eric Adams, 20 Post Road, Sudbury MA
Hubert Sims, 328A Brook Road, Roanoke VA
Amy Wilde, 334 Bayshore Pkwy, Mountain View CA
Sal Carpenter, 73 6th Street, Boston MA
```

## 4.1 Using sed

### 4.1.1 giving instructions

```text
		There are three ways to specify multiple instructions on the command line:

			-> Separate instructions with a semicolon.
			sed 's/ MA/, Massachusetts/; s/ PA/, Pennsylvania/' list

			-> Precede each instruction by -e.
			sed -e 's/ MA/, Massachusetts/' -e 's/ PA/, Pennsylvania/' list

			-> Use the multiline entry capability of the Bourne shell.[9] Press RETURN after entering a single quote and a secondary prompt (>) will be displayed for multiline input.

          $ sed ' 
          > s/ MA/, Massachusetts/
          > s/ PA/, Pennsylvania/
          > s/ CA/, California/' list
```

### 4.1.2 using scripts

```text
		sed -f [script file] [input file]
```

### 4.1.3 save output

```text
		sed -f [script file] [input file] > [output file]
```

### 4.1.3 suppressing automatic display of input lines

```text
		The default operation of sed is to output every input line. The -n option suppresses the automatic output. When specifying this option, each instruction intended to produce output must contain a print command, p. Look at the following example.

		$ sed -n -e 's/MA/Massachusetts/p' list
```

## 4.2 Combine sed with awk.

### 4.2.1 first example

```text
		$ cat nameState
s/ CA/, California/
s/ MA/, Massachusetts/
s/ OK/, Oklahoma/
s/ PA/, Pennsylvania/
s/ VA/, Virginia/

		the output produced by nameState is piped to an awk program that extracts the name of the state from each record.
		sed -f nameState list | awk -F, '{ print $4 }'

		To also sort and number
		 sed -f nameState  list | awk -F, '{print $4}' | sort | uniq -c
```

### 4.2.2 second example

```text
		  produce a report that sorts the names by state and lists the name of the state followed by the name of each person residing in that state. The following example shows the byState program.

    #! /bin/sh
    awk -F, '{ 
    	print $4 ", " $0 
    	}' $* | 
    sort |
    awk -F, '
    $1 == LastState { 
          print "\t" $2
    }
    $1 != LastState { 
          LastState = $1
          print $1
          print "\t" $2
    }'

This shell script has three parts. The program invokes awk to produce input for the sort program and then invokes awk again to test the sorted input and determine if the name of the state in the current record is the same as in the previous record. 

    $ sed -f nameState list | byState
```

## 4.3 Meta Characters

```text
	Special Characters 	Usage
	. 	Matches any single character except newline. In awk, dot can match newline also.
	* 	Matches any number (including zero) of the single character (including a character specified by a regular expression) that immediately precedes it.
	[...] 	Matches any one of the class of characters enclosed between the brackets. A circumflex (^) as first character inside brackets reverses the match to all characters except newline and those listed in the class. In awk, newline will also match. A hyphen (-) is used to indicate a range of characters. The close bracket (]) as the first character in class is a member of the class. All other metacharacters lose their meaning when specified as members of a class.
	^ 	First character of regular expression, matches the beginning of the line. Matches the beginning of a string in awk, even if the string contains embedded newlines.
	$ 	As last character of regular expression, matches the end of the line. Matches the end of a string in awk, even if the string contains embedded newlines.
	\{n,m\} 	Matches a range of occurrences of the single character (including a character specified by a regular expression) that immediately precedes it. \{n\} will match exactly n occurrences, \{n,\} will match at least n occurrences, and \{n,m\} will match any number of occurrences between n and m. (sed and grep only, may not be in some very old versions.)
	\ 	Escapes the special character that follows.
	
	Extended Metacharacters (egrep and awk)
	Special Characters 	Usage
	+ 	Matches one or more occurrences of the preceding regular expression.
	? 	Matches zero or one occurrences of the preceding regular expression.
	| 	Specifies that either the preceding or following regular expression can be matched (alternation).
	() 	Groups regular expressions.  {n,m} 	
	Matches a range of occurrences of the single character (including a character specified by a regular expression) that immediately precedes it. {n} will match exactly n occurrences, {n,} will match at least n occurrences, and {n,m} will match any number of occurrences between n and m. (POSIX egrep and POSIX awk, not in traditional egrep or awk.)[12]
```

## 4.4 SED and AWK regexp

### 4.4.1 positional ^ $

```text
		You might use this pattern to count the number of blank lines in a file using the count option, -c, to grep:

    $ grep -c '^$' ch04
```

## 4.5 Addressing

```text
		sed commands will apply to every input line. Sed is implicitly global, unlike ed, ex, or vi. The following substitute command will change every "CA" into "California."

    s/CA/California/g

    restrict substitute only to line that match pattern:
    /pattern/s/CA/California/g
```

### 4.5.1 Basic addressing

```text
	To delete all line (global address)
	d

	To delete line 1
	1d

	To delete line 1-3
	1,3d

	Delete last line
	$d

	delete blank lines
	/^$/d

	delete all lines from pattern1 to pattern2
	sed '/pattern1/,/pattern2/d' stam2

	delete from first line to first blank line:
	1,/^$/d

	delete all lines except from pattern1 to pattern2
	sed '/pattern1/,/pattern2/!d' stam2
```

### 4.5.2 Advanced addressing

```text
	Braces ({}) are used in sed to nest one address inside another or to apply multiple commands at the same address. You can nest addresses if you want to specify a range of lines and then, within that range, specify another address. For example, to delete blank lines only inside blocks of tbl input, use the following command:

    /^\.TS/,/^\.TE/{
          /^$/d
    }

The opening curly brace must end a line and the closing curly brace must be on a line by itself. Be sure there are no spaces after the braces.

You can apply multiple commands to the same range of lines by enclosing the editing commands within braces, as shown below.

    /^\.TS/,/^\.TE/{
    	/^$/d
      	s/^\.ps 10/.ps 8/
      	s/^\.vs 12/.vs 10/
    }

This example not only deletes blank lines in tbl input but it also uses the substitute command, s, to change several troff requests. These commands are applied only to lines within the .TS/.TE block.
```

### 4.5.3 Basic sed commands

```text
		syntax, [address]command
		or
		[address] {
			cmd1
			cmd2
			...
		}
```

#### 4.5.3.1 comment, #

#### 4.5.3.2 substitution, s

```text
		syntax [address]s/pattern/replacement/flags

		where the flags that modify the substitution are:
			n, A number (1 to 512) indicating that a replacement should be made for only the nth occurrence of the pattern.
			g, Make changes globally on all occurrences in the pattern space. Normally only the first occurrence is replaced.
			p, Print the contents of the pattern space.
			w file, Write the contents of the pattern space to file.

		Delimeter can be _ & etc instead of /

		The replacment can use either of:
			&, Replaced by the string matched by the regular expression.
			\n, Matches the nth substring (n is a single digit) previously specified in the pattern using "\(" and "\)".
			\, Used to escape the ampersand (&), the backslash (\), and the substitution command's delimiter when they are used literally in the replacement section. In addition, it can be used to escape the newline and create a multiline replacement string.
```

#### 4.5.3.3 delete, d

```text
		The important thing to remember is: if the line matches the address, the entire line is deleted, not just the portion of the line that is matched. To delete a portion of a line, use the substitute command and specify an empty replacement.
		
		example, delete empty lines: /^$/d
			delete first line:			$ sed  '1d' stam1
			delete first line, don't print output	$ sed  -n '1d' stam1
			delete lines 1-3			$ sed   '1,3d' stam1
			delete line 1 and line 3		$ sed   '1d;3d' stam1
			delete all line containing "cow"	$ sed   '/cow/d' stam1
			delete word cow and print deletions	$ sed   's_\(cow\)__p' stam1
			delete word cow				$ sed   's_\(cow\)__' stam1
			delete word cow, only print deletions	$ sed   -n 's_\(cow\)__p' stam1
```

#### 4.5.3.4 Append, Insert, and Change

```text
			The append (a), insert (i), and change (c) commands provide editing functions that are commonly performed with an interactive editor, such as vi. You may find it strange to use these same commands to "enter" text using a noninteractive editor. The syntax of these commands is unusual for sed because they must be specified over multiple lines. The syntax follows:
		
		    append	[line-address]a\
		    	text
		    insert	[line-address]i\
		    	text
		    change	[address]c\
		    	text
		
			The insert command places the supplied text before the current line in the pattern space. The append command places it after the current line. The change command replaces the contents of the pattern space with the supplied text.
			
			Each of these commands requires a backslash following it to escape the first end-of-line. The text must begin on the next line. To input multiple lines of text, each successive line must end with a backslash, with the exception of the very last line.

			examples:
			Change replace one or a range of lines.
			$ sed '1,3c\new text to file :)\' stam1
			new text to file :)

			$ sed '/pig/,/cow/c\new text to range :)\' stam1

			insert new text before line
			$ sed '1i\New line :)' stam1

			insert new text after first line
			$ sed '1a\New line :)' stam1

			insert new text after last line
			sed '$a\New line :)' stam1
```

#### 4.5.3.5 List, l

```text
		The list command (l) displays the contents of the pattern space, showing non-printing characters as two-digit ASCII codes. It is similar in function to the list (:l) command in vi. You can use this command to detect "invisible" characters in the input.

		You cannot match a character by ASCII value (nor can you match octal values) in sed. You can do this in awk, however. Instead, you have to find a key combination in vi to produce it. Use CTRL-V to quote the character. For instance, you can match an ESC character (^[). Look at the following script:

			# list line and replace ^[ with "Escape"
    			l
    			s/^[/Escape/

			print invisible characters in file
			$sed -n 'l' stam1
```

#### 4.5.3.6 Transform, y

```text
		[address]y/abc/xyz/

		replace p,c and h with a.
		sed  '1,2y/pch/aaa/' stam1
```

#### 4.5.3.6 Print, p

```text
		The print command (p) causes the contents of the pattern space to be output. It does not clear the pattern space nor does it change the flow of control in the script. However, it is frequently used before commands (d, N, b) that do change flow control. Unless the default output is suppressed (-n), the print command will cause duplicate copies of a line to be output. It can be used when default output is suppressed or when the flow control through the program avoids reaching the bottom of the script.
```

#### 4.5.3.7 Print Line Number, =

```text
		[line-address]=

		An equal sign (=) following an address prints the line number of the matched line. Unless you suppress the automatic output of lines, both the line number and the line itself will be printed. Its syntax is:

    [line-address]=

This command cannot operate on a range of lines.

	A programmer might use this to print certain lines in a source file. For instance, the following script prints the line number followed by the line itself for each line containing a tab followed by the string "if". Here's the script:

    #n print line number and line with if statement
    /       if/{
    =
    p
    }

		Print line number and line that contains a match:
		sed  -n '/pig/=;p' stam1
		sed  -n '/alias sa/{=;p}' ~/.aliases //print only matched lines numbers and content
```

#### 4.5.3.7 Next, n

```text
		[address]n

		The next command (n) outputs the contents of the pattern space and then reads the next line of input without returning to the top of the script. Its syntax is:

    [address]n

The next command changes the normal flow control, which doesn't output the contents of the pattern space until the bottom of the script is reached and which always begins at the top of the script after reading in a new line. In effect, the next command causes the next line of input to replace the current line in the pattern space. Subsequent commands in the script are applied to the replacement line, not the current line. If the default output has not been suppressed, the current line is printed before the replacement takes place.

Let's look at an example of the next command in which we delete a blank line only when it follows a pattern matched on the previous line. In this case, a writer has inserted a blank line after a section heading macro (.H1). We want to remove that blank line without removing all blank lines in the file. Here's the sample file:

    .H1 "On Egypt"

    Napoleon, pointing to the Pyramids, said to his troops: 
    "Soldiers, forty centuries have their eyes upon you."

The following script removes that blank line:

    /^\.H1/{
    n
    /^$/d
    }

You can read this script as follows: "Match any line beginning with the string `.H1', then print that line and read in the next line. If that line is blank, delete it." The braces are used to apply multiple commands at the same address.
```

#### 4.5.3.8 Reading and Writing Files, r, w

```text
		The read (r) and write (w) commands allow you to work directly with files. Both take a single argument, the name of a file. The syntax follows:

    [line-address]r file
    [address]w file

The read command reads the contents of file into the pattern space after the addressed line. It cannot operate on a range of lines. The write command writes the contents of the pattern space to the file.

You must have a single space between the command and the filename. (Everything after that space and up to the newline is taken to be the filename. Thus, leading or embedded spaces will become part of the filename.) The read command will not complain if the file does not exist. The write command will create a file if it does not exist; if the file already exists, the write command will overwrite it each time the script is invoked. If there are multiple instructions writing to the same file in one script, then each write command appends to the file. Also, be aware that you can only open up to 10 files per script.

The read command can be useful for inserting the contents of one file at a particular place in another file. For instance, let's say that there is a set of files and each file should close with the same one- or two-paragraph statement. A sed script would allow you to maintain the closing separately while inserting it as needed, for instance, when sending the file to the printer.

    sed '$r closing' $* | pr | lp

The $ is an addressing symbol specifying the last line of the file. The contents of the file named closing are placed after the contents of pattern space and output with it. This example does not specify a pathname, assuming the file to be in the same directory as the command. A more general-purpose command should use the full pathname.

		examples:

		append the file to itself
		sed  '$r stam1' stam1

		write all lines containing pig into file pigs
		 sed  '/pig/w pigs' stam1

		 If all we wanted was to extract the names for a particular region, we could easily use grep to do it. The advantage with sed is that we can break up the file into four separate files in a single step. The following four-line script does it:

    /Northeast$/w region.northeast
    /South$/w region.south
    /Midwest$/w region.midwest
    /West$/w region.west

All of the names of salespeople that are assigned to the Northeast region will be placed in a file named region.northeast.

The write command writes out the contents of the pattern space when the command is invoked, not when end of the script is reached. In the previous example, we might want to remove the name of the region before writing it to file. For each case, we could handle it as we show for the Northeast region:

    /Northeast$/{
    	s///
    	w region.northeast
    	}

The substitute command matches the same pattern as the address and removes it.
```

#### 4.5.3.8 Quit, q

```text
		The quit command (q) causes sed to stop reading new input lines (and stop sending them to the output). Its syntax is:

    [line-address]q
```

## 4.6 Advanced sed commands

### 4.6.1 Multiline Pattern Space

```text
		We have emphasized in previous discussions of regular expressions that pattern matching is line-oriented. A program like grep attempts to match a pattern on a single line of input. This makes it difficult to match a phrase, for instance, which can start at the end of one line and finish at the beginning of the next line. Other patterns might be significant only when repeated on multiple lines.

Sed has the ability to look at more than one line in the pattern space. This allows you to match patterns that extend over multiple lines. In this section, we will look at commands that create a multiline pattern space and manipulate its contents. The three multiline commands (N,D,P) all correspond to lowercase basic commands (n,d,p) that were presented in the previous chapter. The Delete (D) command, for instance, is a multiline version of the delete command (d). The difference is that while d deletes the contents of the pattern space, D deletes only the first line of a multiline pattern space.
```

#### 4.6.1.1 Append Next Line, N

```text
			The multiline Next (N) command creates a multiline pattern space by reading a new line of input and appending it to the contents of the pattern space. The original contents of pattern space and the new input line are separated by a newline. The embedded newline character can be matched in patterns by the escape sequence "\n". In a multiline pattern space, the metacharacter "^" matches the very first character of the pattern space, and not the character(s) following any embedded newline(s). Similarly, "$" matches only the final newline in the pattern space, and not any embedded newline(s). After the Next command is executed, control is then passed to subsequent commands in the script.

The Next command differs from the next command, which outputs the contents of the pattern space and then reads a new line of input. The next command does not create a multiline pattern space.

For instance, here are a few lines of sample text:

    Consult Section 3.1 in the Owner and Operator
    Guide for a description of the tape drives
    available on your system.

The following script looks for "Operator" at the end of a line, reads the next line of input and then makes the replacement.

    /Operator$/{
    N
    s/Owner and Operator\nGuide/Installation Guide/
    }

In this example, we know where the two lines split and where to specify the embedded newline. When the script is run on the sample file, it produces the two lines of output, one of which combines the first and second lines and is too long to show here. This happens because the substitute command matches the embedded newline but does not replace it. Unfortunately, you cannot use "\n" to insert a newline in the replacement string. You must use a backslash to escape the newline, as follows:

    s/Owner and Operator\nGuide /Installation Guide\
    /

This command restores the newline after "Installation Guide". It is also necessary to match a space following "Guide" so the new line won't begin with a space. Now we can show the output:

    Consult Section 3.1 in the Installation Guide 
    for a description of the tape drives
    available on your system.

Remember, you don't have to replace the newline but if you don't it can make for some long lines.

What if there are other occurrences of "Owner and Operator Guide" that break over multiple lines in different places? You could modify the regular expression to look for a space or a newline between words, as shown below:

    /Owner/{
    N
    s/Owner *\n*and *\n*Operator *\n*Guide/Installation Guide/
    }

The asterisk indicates that the space or newline is optional. This seems like hard work, though, and indeed there is a more general way. We have also changed the address to match "Owner," the first word in the pattern instead of the last. We can read the newline into the pattern space and then use a substitute command to remove the embedded newline, wherever it is.

    s/Owner and Operator Guide/Installation Guide/
    /Owner/{
    N
    s/ *\n/ /
    s/Owner and Operator Guide */Installation Guide\
    /
    }
The first line matches "Owner and Operator Guide" when it appears on a line by itself. (See the discussion after the example about why this is necessary.) If we match the string "Owner," we read the next line into the pattern space, and replace the embedded newline with a space. Then we attempt to match the whole pattern and make the replacement followed by a newline. This script will match "Owner and Operator Guide" regardless of how it is broken across two lines.
Do you see the two problems? The most obvious problem is that the last line did not print. The last line matches "Owner" and when N is executed, there is not another input line to read, so sed quits (immediately, without even outputting the line). To fix this, the Next command should be used as follows to be safe:

    $!N

It excludes the last line ($) from the Next command. As it is in our script, by matching "Owner and Operator Guide" on the last line, we avoid matching "Owner" and applying the N command. However, if the word "Owner" appeared on the last line we'd have the same problem unless we use the "$!N" syntax.

The second problem is a little less conspicuous. It has to do with the occurrence of "Owner and Operator Guide" in the second paragraph. In the input file, it is found on a line by itself:

    Look in the Owner and Operator Guide shipped with your system.

In the output shown above, the blank line following "shipped with your system." is missing. The reason for this is that this line matches "Owner" and the next line, a blank line, is appended to the pattern space. The substitute command removes the embedded newline and the blank line has in effect vanished. (If the line were not blank, the newline would still be removed but the text would appear on the same line with "shipped with your system.") The best solution seems to be to avoid reading the next line when the pattern can be matched on one line. So, that is why the first instruction attempts to match the case where the string appears all on one line.

			example:
			search for horse at end of one line followed by cow at start of new line and replace with one line ending with horse_cow
			$ sed -f append_example_script stam1
			pig cow horse_cow pig horse
			horse pig cow
			$ cat append_example_script 
			/pig/{
			N
			s/horse\ncow/horse_cow/
			}

			Example bellow will not unite the lines but will keep them seperate using the add \
			sed -f append_example_script stam1
			pig cow horse_cow
			 pig horse
			horse pig cow
			$ cat append_example_script 
			/pig/{
			N
			s/horse\ncow/horse_cow\
			/
			}
```

#### 4.6.1.2 Multiline Delete, D

```text
		The delete command (d) deletes the contents of the pattern space and causes a new line of input to be read with editing resuming at the top of the script. The Delete command (D) works slightly differently: it deletes a portion of the pattern space, up to the first embedded newline. It does not cause a new line of input to be read; instead, it returns to the top of the script, applying these instructions to what remains in the pattern space. We can see the difference by writing a script that looks for a series of blank lines and outputs a single blank line. The version below uses the delete command:

    # reduce multiple blank lines to one; version using d command
    /^$/{
    	N
    	/^\n$/d
    }

When a blank line is encountered, the next line is appended to the pattern space. Then we try to match the embedded newline. Note that the positional metacharacters, ^ and $, match the beginning and the end of the pattern space, respectively. Here's a test file:

    This line is followed by 1 blank line.

    This line is followed by 2 blank lines.


    This line is followed by 3 blank lines.



    This line is followed by 4 blank lines.




    This is the end.

Running the script on the test file produces the following result:

    $ sed -f sed.blank test.blank
    This line is followed by 1 blank line.

    This line is followed by 2 blank lines.
    This line is followed by 3 blank lines.

    This line is followed by 4 blank lines.
    This is the end.

Where there was an even number of blank lines, all the blank lines were removed. Only when there was an odd number was a single blank line preserved. That is because the delete command clears the entire pattern space. Once the first blank line is encountered, the next line is read in, and both are deleted. If a third blank line is encountered, and the next line is not blank, the delete command is not applied, and thus a blank line is output. If we use the multiline Delete command (D rather than d), we get the result we want:

    $ sed -f sed2.blank test.blank
    This line is followed by 1 blank line.

    This line is followed by 2 blank lines.

    This line is followed by 3 blank lines.

    This line is followed by 4 blank lines.

    This is the end.

The reason the multiline Delete command gets the job done is that when we encounter two blank lines, the Delete command removes only the first of the two. The next time through the script, the blank line will cause another line to be read into the pattern space. If that line is not blank, then both lines are output, thus ensuring that a single blank line will be output. In other words, when there are two blank lines in the pattern space, only the first one is deleted. When there is a blank line followed by text, the pattern space is output normally.
```

#### 4.6.1.3 Multiline Print, P

```text
		The multiline Print command differs slightly from its lowercase cousin. This command outputs the first portion of a multiline pattern space, up to the first embedded newline. After the last command in a script is executed, the contents of the pattern space are automatically output. (The -n option or #n suppresses this default action.) Therefore, print commands (P or p) are used when the default output is suppressed or when flow of control in a script changes such that the bottom of the script is not reached. The Print command frequently appears after the Next command and before the Delete command. These three commands can set up an input/output loop that maintains a two-line pattern space yet outputs only one line at a time. The purpose of this loop is to output only the first line in the pattern space, then return to the top of the script to apply all commands to what had been the second line in the pattern space. Without this loop, when the last command in the script was executed, both lines in the pattern space would be output.
```

## 4.7 Hold That Line

```text
		The pattern space is a buffer that contains the current input line. There is also a set-aside buffer called the hold space. The contents of the pattern space can be copied to the hold space and the contents of the hold space can be copied to the pattern space. A group of commands allows you to move data between the hold space and the pattern space. The hold space is used for temporary storage, and that's it. Individual commands can't address the hold space or alter its contents.

The most frequent use of the hold space is to have it retain a duplicate of the current input line while you change the original in the pattern space. The commands that affect the pattern space are:
Command 	Abbreviation 	Function
Hold		h or H		Copy or append contents of pattern space to hold space.
Get		g or G 		Copy or append contents of hold space to pattern space.
Exchange 	x 		Swap contents of hold space and pattern space.

ach of these commands can take an address that specifies a single line or a range of lines. The hold (h,H) commands move data into the hold space and the get (g,G) commands move data from the hold space back into the pattern space. The difference between the lowercase and uppercase versions of the same command is that the lowercase command overwrites the contents of the target buffer, while the uppercase command appends to the buffer's existing contents.

The hold command replaces the contents of the hold space with the contents of the pattern space. The get command replaces the contents of the pattern space with the contents of the hold space.

The Hold command puts a newline followed by the contents of the pattern space after the contents of the hold space. (The newline is appended to the hold space even if the hold space is empty.) The Get command puts a newline followed by the contents of the hold space after the contents of the pattern space.

The exchange command swaps the contents of the two buffers. It has no side effects on either buffer.

Let's use a trivial example to illustrate putting lines into the hold space and retrieving them later. We are going to write a script that reverses pairs of lines. For a sample file, we'll use a list of numbers:

    1
    2
    11
    22
    111
    222

The object is to reverse the order of the lines beginning with 1 and the lines beginning with 2. Here's how we use the hold space: we copy the first line to the hold space--and hold on to it--while we clear the pattern space. Then sed reads the second line into the pattern space and we append the line from the hold space to the end of the pattern space. Look at the script:

    # Reverse flip
    /1/{
    h
    d
    }
    /2/{
    G
    }

Any line matching a "1" is copied to the hold space and deleted from the pattern space. Control passes to the top of the script and the line is not printed. When the next line is read, it matches the pattern "2" and the line that had been copied to the hold space is now appended to the pattern space. Then both lines are printed. In other words, we save the first line of the pair and don't output it until we match the second line.

Here's the result of running the script on the sample file:

    $ sed -f sed.flip test.flip
    2
    1
    22
    11
    222
    111
```

### 4.7.2 Building Blocks of Text

```text
		The hold space can be used to collect a block of lines before outputting them. Some troff requests and macros are block-oriented, in that commands must surround a block of text. Usually a code at the beginning enables the format and one at the end disables the format. HTML-coded documents also contain many block-oriented constructs. For instance, "<p>" begins a paragraph and "</p>" ends it. In the next example, we'll look at placing HTML-style paragraph tags in a plain text file. For this example, the input is a file containing variable-length lines that form paragraphs; each paragraph is separated from the next one by a blank line. Therefore, the script must collect all lines in the hold space until a blank line is encountered. The contents of the hold space are retrieved and surrounded with the paragraph tags.

Here's the script:

    /^$/!{
         H
         d
         }
    /^$/{
    	x
    	s/^\n/<p>/
    	s/$/<\/p>/
    	G
    	}

Running the script on a sample file produces:

    <p>My wife won't let me buy a power saw.  She is afraid of an
    accident if I use one.
    So I rely on a hand saw for a variety of weekend projects like
    building shelves.
    However, if I made my living as a carpenter, I would
    have to use a power
    saw.  The speed and efficiency provided by power tools
    would be essential to being productive.</p>

    <p>For people who create and modify text files,
    sed and awk are power tools for editing.</p>

    <p>Most of the things that you can do with these programs
    can be done interactively with a text editor.  However,
    using these programs can save many hours of repetitive
    work in achieving the same result.</p>

The script has basically two parts, corresponding to each address. Either we do one thing if the input line is not blank or a different thing if it is. If the input line is not blank, it is appended to the hold space (with H), and then deleted from the pattern space. The delete command prevents the line from being output and clears the pattern space. Control passes back to the top of the script and a new line is read. The general idea is that we don't output any line of text; it is collected in the hold space.

If the input line is blank, we process the contents of the hold space. To illustrate what the second procedure does, let's use the second paragraph in the previous sample file and show what happens. After a blank line has been read, the pattern space and the hold space have the following contents:
Pattern Space: 	^$
Hold Space: 	

\nFor people who create and modify text files, \nsed and awk are power tools for editing.

A blank line in the pattern space is represented as "^$", the regular expression that matches it. The embedded newlines are represented in the hold space by "\n". Note that the Hold command puts a newline in the hold space and then appends the current line to the hold space. Even when the hold space is empty, the Hold command places a newline before the contents of the pattern space.

The exchange command (x) swaps the contents of the hold space and the pattern space. The blank line is saved in the hold space so we can retrieve it at the end of the procedure. (We could insert a newline in other ways, also.)
Pattern Space: 	

\nFor people who create and modify text files, \nsed and awk are power tools for editing.
Hold Space: 	^$

Now we make two substitutions: placing "<p>" at the beginning of the pattern space and "</p>" at the end. The first substitute command matches "^\n" because a newline is at the beginning of the line as a consequence of the Hold command. The second substitute command matches the end of the pattern space ("$" does not match any embedded newlines but only the terminal newline.)
Pattern Space: 	

<p>For people who create and modify text files, \nsed and awk are power tools for editing.</p>
Hold Space: 	^$

Note that the embedded newline is preserved in the pattern space. The last command, G, appends the blank line in the hold space to the pattern space. Upon reaching the bottom of the script, sed outputs the paragraph we had collected in the hold space and coded in the pattern space.

This script illustrates the mechanics of collecting input and holding on to it until another pattern is matched. It's important to pay attention to flow control in the script. The first procedure in the script does not reach bottom because we don't want any output yet. The second procedure does reach bottom, clearing the pattern space and the hold space before we begin collecting lines for the next paragraph.

This script also illustrates how to use addressing to set up exclusive addresses, in which a line must match one or the other address. You can also set up addresses to handle various exceptions in the input and thereby improve the reliability of a script. For instance, in the previous script, what happens if the last line in the input file is not blank? All the lines collected since the last blank line will not be output. There are several ways to handle this, but a rather clever one is to manufacture a blank line that the blank-line procedure will match later in the script. In other words, if the last line contains a line of text, we will copy the text to the hold space and clear the contents of the pattern space with the substitute command. We make the current line blank so that it matches the procedure that outputs what has been collected in the hold space. Here's the procedure:

    ${
    /^$/!{
         H
         s/.*//
         }
    }

This procedure must be placed in the script before the two procedures shown earlier. The addressing symbol "$" matches only the last line in the file. Inside this procedure, we test for lines that are not blank. If the line is blank, we don't have to do anything with it. If the current line is not blank, then we append it to the hold space. This is what we do in the other procedure that matches a non-blank line. Then we use the substitute command to create a blank line in the pattern space.

Upon exiting this procedure, there is a blank line in the pattern space. It matches the subsequent procedure for blank lines that adds the HTML paragraph codes and outputs the paragraph.
```

## 4.8 Building Blocks of Text

```text
		You have already seen several examples of changes in sed's normal flow control. In this section, we'll look at two commands that allow you to direct which portions of the script get executed and when. The branch (b) and test (t) commands transfer control in a script to a line containing a specified label. If no label is specified, control passes to the end of the script. The branch command transfers control unconditionally while the test command is a conditional transfer, occurring only if a substitute command has changed the current line.

A label is any sequence of up to seven characters.[37] A label is put on a line by itself that begins with a colon:

    [37]The POSIX standard says that an implementation can allow longer labels if it wishes to. GNU sed allows labels to be of any length.

    :mylabel

There are no spaces permitted between the colon and the label. Spaces at the end of the line will be considered part of the label. When you specify the label in a branch or test command, a space is permitted between the command and the label itself:

    b mylabel

        [address]b[label]

The label is optional, and if not supplied, control is transferred to the end of the script. If a label is supplied, execution resumes at the line following the label.
The test command branches to a label (or the end of the script) if a successful substitution has been made on the currently addressed line. Thus, it implies a conditional branch. Its syntax follows:

    [address]t[label]

If no label is supplied, control falls through to the end of the script. If the label is supplied, then execution resumes at the line following the label.
```

## 4.9 To Join a Phrase

```text
	We have covered all the advanced constructs of sed and are now ready to look at a shell script named phrase that uses nearly all of them. This script is a general-purpose, grep-like program that allows you to look for a series of multiple words that might appear across two lines.

An essential element of this program is that, like grep, it prints out only the lines that match the pattern. You might think we'd use the -n option to suppress the default output of lines. However, what is unusual about this sed script is that it creates an input/output loop, controlling when a line is output or not.

The logic of this script is to first look for the pattern on one line and print the line if it matches. If no match is found, we read another line into the pattern space (as in previous multiline scripts). Then we copy the two-line pattern space to the hold space for safekeeping. Now the new line that was read into the pattern space previously could match the search pattern on its own, so the next match we attempt is on the second line only. Once we've determined that the pattern is not found on either the first or second lines, we remove the newline between the two lines and look for it spanning those lines.

The script is designed to accept arguments from the command line. The first argument is the search pattern. All other command-line arguments will be interpreted as filenames. Let's look at the entire script before analyzing it:

    #! /bin/sh
    # phrase -- search for words across lines
    # $1 = search string; remaining args = filenames
    search=$1
    shift
    for file 
    do
    sed '
    /'"$search"'/b
    N
    h
    s/.*\n//
    /'"$search"'/b
    g
    s/ *\n/ /
    /'"$search"'/{
    g
    b
    }
    g
    D' $file 
    done

A shell variable named search is assigned the first argument on the command line, which should be the search pattern. This script shows another method of passing a shell variable into a script. Here we surround the variable reference with a pair of double quotes and then single quotes. Notice the script itself is enclosed in single quotes, which protect characters that are normally special to the shell from being interpreted. The sequence of a double-quote pair inside a single-quote pair[38] makes sure the enclosed argument is evaluated first by the shell before the sed script is evaluated by sed.[39]

    [38]Actually, this is the concatenation of single-quoted text with double-quoted text with more single-quoted text (and so on, whew!) to produce one large quoted string. Being a shell wizard helps here.

    [39]You can also use shell variables to pass a series of commands into a sed script. This somewhat simulates a procedure call but it makes the script more difficult to read.

The sed script tries to match the search string at three different points, each marked by the address that looks for the search pattern. The first line of the script looks for the search pattern on a line by itself:

    /'"$search"'/b

If the search pattern matches the line, the branch command, without a label, transfers control to the bottom of the script where the line is printed. This makes use of sed's normal control-flow so that the next input line is read into the pattern space and control then returns to the top of the script. The branch command is used in the same way each time we try to match the pattern.

If a single input line does not match the pattern, we begin our next procedure to create a multiline pattern space. It is possible that the new line, by itself, will match the search string. It may not be apparent why this step is necessary--why not just immediately look for the pattern anywhere across two lines? The reason is that if the pattern is actually matched on the second line, we'd still output the pair of lines. In other words, the user would see the line preceding the matched line and might be confused by it. This way we output the second line by itself if that is what matches the pattern.

    N
    h
    s/.*\n//
    /'"$search"'/b

The Next command appends the next input line to the pattern space. The hold command places a copy of the two-line pattern space into the hold space. The next action will change the pattern space and we want to preserve the original intact. Before looking for the pattern, we use the substitute command to remove the previous line, up to and including the embedded newline. There are several reasons for doing it this way and not another way, so let's consider some of the alternatives. You could write a pattern that matches the search pattern only if it occurs after the embedded newline:

    /\n.*'"$search"'/b

However, if a match is found, we don't want to print the entire pattern space, just the second portion of it. Using the above construct would print both lines when only the second line matches.

You might want to use the Delete command to remove the first line in the pattern space before trying to match the pattern. A side effect of the Delete command is a change in flow control that would resume execution at the top of the script. (The Delete command could conceivably be used but not without changing the logic of this script.)

So, we try to match the pattern on the second line, and if that is unsuccessful, then we try to match it across two lines:

    g
    s/ *\n/ /
    /'"$search"'/{
    g
    b
    }

The get command retrieves a copy of the original two-line pair from the hold space, overwriting the line we had worked with in the pattern space. The substitute command replaces the embedded newline and any spaces preceding it with a single space. Then we attempt to match the pattern. If the match is made, we don't want to print the contents of the pattern space, but rather get the duplicate from the hold space (which preserves the newline) and print it. Thus, before branching to the end of the script, the get command retrieves the copy from the hold space.

The last part of the script is executed only if the pattern has not been matched.

    g
    D

The get command retrieves the duplicate, that preserves the newline, from the hold space. The Delete command removes the first line in the pattern space and passes control back to the top of the script. We delete only the first part of the pattern space, instead of clearing it, because after reading another input line, it is possible to match the pattern spanning across both lines.

Here's the result when the program is run on a sample file:

    $ phrase "the procedure is followed" sect3
    If a pattern is followed by a \f(CW!\fP, then the procedure
    is followed for all lines that do not match the pattern.
    so that the procedure is followed only if there is no match.

As we mentioned at the outset, writing sed scripts is a good primer for programming. In the chapters that follow, we will be looking at the awk programming language. You will see many similarities to sed to make you comfortable but you will see a broader range of constructs for writing useful programs. As you begin trying to do more complicated tasks with sed, the scripts get so convoluted as to make them difficult to understand. One of the advantages of awk is that it handles complexity better, and once you learn the basics, awk scripts are easier to write and understand.
```

## 4.10 Quick Reference for sed

### 4.10.1 Command-Line Syntax

```text
The syntax for invoking sed has two forms:

    sed [-n][-e] `command' file(s)
    sed [-n] -f scriptfile file(s)

The first form allows you to specify an editing command on the command line, surrounded by single quotes. The second form allows you to specify a scriptfile, a file containing sed commands. Both forms may be used together, and they may be used multiple times. The resulting editing script is the concatenation of the commands and script files.

The following options are recognized:

-n  Only print lines specified with the p command or the p flag of the s command.

-e cmd Next argument is an editing command. Useful if multiple scripts are specified.

-f file Next argument is a file containing editing commands.

If the first line of the script is "#n", sed behaves as if -n had been specified.
```

### 4.10.2 Syntax of sed Commands

```text
Sed commands have the general form:

    [address[,address]][!]command [arguments]

Sed copies each line of input into a pattern space. Sed instructions consist of addresses and editing commands. If the address of the command matches the line in the pattern space, then the command is applied to that line. If a command has no address, then it is applied to each input line. If a command changes the contents of the space, subsequent command-addresses will be applied to the current line in the pattern space, not the original input line.
```

#### 4.10.2.1 Pattern Addressing

```text
address can be either a line number or a pattern, enclosed in slashes (/pattern/). A pattern is described using a regular expression. Additionally, \n can be used to match any newline in the pattern space (resulting from the N command), but not the newline at the end of the pattern space.

If no pattern is specified, the command will be applied to all lines. If only one address is specified, the command will be applied to all lines matching that address. If two comma-separated addresses are specified, the command will be applied to a range of lines between the first and second addresses, inclusively. Some commands accept only one address: a, i, r, q, and =.

The ! operator following an address causes sed to apply the command to all lines that do not match the address.

Braces ({}) are used in sed to nest one address inside another or to apply multiple commands at the same address.

    [/pattern/[,/pattern/]]{
    command1
    command2
    }

The opening curly brace must end a line, and the closing curly brace must be on a line by itself. Be sure there are no spaces after the braces.
```

#### 4.10.2.2 Regular Expression Metacharacters for sed

```text
			Pattern-Matching Metacharacters
Special Characters 	Usage
. 	Matches any single character except newline.
* 	Matches any number (including zero) of the single character (including a character specified by a regular expression) that immediately precedes it.
[...] 	Matches any one of the class of characters enclosed between the brackets. All other metacharacters lose their meaning when specified as members of a class. A circumflex (^) as the first character inside brackets reverses the match to all characters except newline and those listed in the class. A hyphen (-) is used to indicate a range of characters. The close bracket (]) as the first character in the class is a member of the class.
\{n,m\} 	Matches a range of occurrences of the single character (including a character specified by a regular expression) that immediately precedes it. \{n\} will match exactly n occurrences, \{n,\} will match at least n occurrences, and \{n,m\} will match any number of occurrences between n and m. (sed and grep only).
^ 	Locates regular expression that follows at the beginning of line. The ^ is only special when it occurs at the beginning of the regular expression.
$ 	Locates preceding regular expression at the end of line. The $ is only special when it occurs at the end of the regular expression.
\ 	Escapes the special character that follows.
\( \) 	Saves the pattern enclosed between "\(" and "\)" into a special holding space. Up to nine patterns can be saved in this way on a single line. They can be "replayed" in substitutions by the escape sequences "\1" to "\9".
\n 	Matches the nth pattern previously saved by "\(" and "\)", where n is a number from 1 to 9 and previously saved patterns are counted from the left on the line.
& 	Prints the entire matched text when used in a replacement string.
```

### 4.10.3 Command Summary for sed

```text
:   :label
    Label a line in the script for the transfer of control by b or t. label may contain up to seven characters. (The POSIX standard says that an implementation can allow longer labels if it wishes to. GNU sed allows labels to be of any length.)

= [address]=
    Write to standard output the line number of addressed line.

a [address]a\
    text

    Append text following each line matched by address. If text goes over more than one line, newlines must be "hidden" by preceding them with a backslash. The text will be terminated by the first newline that is not hidden in this way. The text is not available in the pattern space and subsequent commands cannot be applied to it. The results of this command are sent to standard output when the list of editing commands is finished, regardless of what happens to the current line in the pattern space.
b [address1[,address2]]b[label]
    Transfer control unconditionally (branch) to :label elsewhere in script. That is, the command following the label is the next command applied to the current line. If no label is specified, control falls through to the end of the script, so no more commands are applied to the current line.

c [address1[,address2]]c\
    text

    Replace (change) the lines selected by the address with text. When a range of lines is specified, all lines as a group are replaced by a single copy of text. The newline following each line of text must be escaped by a backslash, except the last line. The contents of the pattern space are, in effect, deleted and no subsequent editing commands can be applied to it (or to text).
d [address1[,address2]]d
    Delete line(s) from pattern space. Thus, the line is not passed to standard output. A new line of input is read and editing resumes with first command in script.

D [address1[,address2]]D
    Delete first part (up to embedded newline) of multiline pattern space created by N command and resume editing with first command in script. If this command empties the pattern space, then a new line of input is read, as if the d command had been executed.

g [address1[,address2]]g
    Copy (get) contents of hold space (see h or H command) into the pattern space, wiping out previous contents.

G [address1[,address2]]G
    Append newline followed by contents of hold space (see h or H command) to contents of the pattern space. If hold space is empty, a newline is still appended to the pattern space.

h [address1[,address2]]h
    Copy pattern space into hold space, a special temporary buffer. Previous contents of hold space are wiped out.

H [address1[,address2]]H
    Append newline and contents of pattern space to contents of the hold space. Even if hold space is empty, this command still appends the newline first.

i [address1]i\
    text

    Insert text before each line matched by address. (See a for details on text.)
l [address1[,address2]]l
    List the contents of the pattern space, showing nonprinting characters as ASCII codes. Long lines are wrapped.

n [address1[,address2]]n
    Read next line of input into pattern space. Current line is sent to standard output. New line becomes current line and increments line counter. Control passes to command following n instead of resuming at the top of the script.

N [address1[,address2]]N
    Append next input line to contents of pattern space; the new line is separated from the previous contents of the pattern space by a newline. (This command is designed to allow pattern matches across two lines. Using \n to match the embedded newline, you can match patterns across multiple lines.)

p [address1[,address2]]p
    Print the addressed line(s). Note that this can result in duplicate output unless default output is suppressed by using "#n" or the -n command-line option. Typically used before commands that change flow control (d, n, b) and might prevent the current line from being output.

P [address1[,address2]]P
    Print first part (up to embedded newline) of multiline pattern space created by N command. Same as p if N has not been applied to a line.

q [address]q
    Quit when address is encountered. The addressed line is first written to output (if default output is not suppressed), along with any text appended to it by previous a or r commands.

r [address]r file
    Read contents of file and append after the contents of the pattern space. Exactly one space must be put between r and the filename.

s [address1[,address2]]s/pattern/replacement/[flags]
    Substitute replacement for pattern on each addressed line. If pattern addresses are used, the pattern // represents the last pattern address specified. The following flags can be specified:

    n
        Replace nth instance of /pattern/ on each addressed line. n is any number in the range 1 to 512, and the default is 1.

    g
        Replace all instances of /pattern/ on each addressed line, not just the first instance.

    p
        Print the line if a successful substitution is done. If several successful substitutions are done, multiple copies of the line will be printed.

    w file
        Write the line to file if a replacement was done. A maximum of 10 different files can be opened.

t [address1[,address2]]t [label]
    Test if successful substitutions have been made on addressed lines, and if so, branch to line marked by :label. (See b and :.) If label is not specified, control falls through to bottom of script.

w [address1[,address2]]w file
    Append contents of pattern space to file. This action occurs when the command is encountered rather than when the pattern space is output. Exactly one space must separate the w and the filename. A maximum of 10 different files can be opened in a script. This command will create the file if it does not exist; if the file exists, its contents will be overwritten each time the script is executed. Multiple write commands that direct output to the same file append to the end of the file.

x [address1[,address2]]x
    Exchange contents of the pattern space with the contents of the hold space.

y [address1[,address2]]y/abc/xyz/
    Transform each character by position in string abc to its equivalent in string xyz.
```
