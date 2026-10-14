---
type: reference
title: Relational and Boolean Operators
description: Subsection 5.8 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.8"
---

# 5.8 Relational and Boolean Operators

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	A relational expression can be used in place of a pattern to control a particular action. For instance, if we wanted to limit the records selected for processing to those that have five fields, we could use the following expression:

    NF == 5

This relational expression compares the value of NF (the number of fields for each input record) to five. If it is true, the action will be executed; otherwise, it will not.

We can use a relational expression to validate the phonelist database before attempting to print out the record.

    NF == 6 { print $1, $6 }

Then only lines with six fields will be printed.

The opposite of "==" is "!=" ("is not equal to"). Similarly, you can compare one expression to another to see if it is greater than (>) or less than (<) or greater than or equal to (>=) or less than or equal to (<=). The expression

    NR > 1

tests whether the number of the current record is greater than 1. As we'll see in the next chapter, relational expressions are typically used in conditional (if) statements and are evaluated to determine whether or not a particular statement should be executed.

Regular expressions are usually written enclosed in slashes. These can be thought of as regular expression constants, much as "hello" is a string constant. We've seen many examples so far:

    /^$/ { print "This is a blank line." }

However, you are not limited to regular expression constants. When used with the relational operators ~ ("match") and !~ ("no match"), the right-hand side of the expression can be any awk expression; awk treats it as a string that specifies a regular expression.[48] We've already seen an example of the ~ operator used in a pattern-matching rule for the phone database:

    You may also use strings instead of regular expression constants when calling the match(), split(), sub(), and gsub() functions.

    $5 ~ /MA/   { print $1 ", " $6 }

Since any expression can be used with ~ and !~, regular expressions can be supplied through variables. For instance, in the phonelist script, we could replace "/MA/" with state and have a procedure that defines the value of state.

    $5 ~ state  { print $1 ", " $6 }

This makes the script much more general to use because a pattern can change dynamically during execution of the script. For instance, it allows us to get the value of state from a command-line parameter.
```

### 5.8.1 Relational Operators

```text
		Operator 	Description
		<		Less than
		> 		Greater than
		<= 		Less than or equal to
		>= 		Greater than or equal to
		== 		Equal to
		!= 		Not equal to
		~ 		Matches
		!~ 		Does not match
```

### 5.8.2 Boolean Operators

```text
		Operator 	Description
		||		Logical OR
		&&		Logical AND
		!		Logical NOT

		Given two or more expressions, || specifies that one of them must evaluate to true (non-zero or non-empty) for the whole expression to be true. && specifies that both of the expressions must be true to return true.

The following expression:

    NF == 6 && NR > 1

states that the number of fields must be equal to 6 and that the number of the record must be greater than 1.

&& has higher precedence than ||. Can you tell how the following expression will be evaluated?

    NR > 1 && NF >= 2 || $1 ~ /\t/

The parentheses in the next example show which expression would be evaluated first based on the rules of precedence.

    (NR > 1 && NF >= 2) || $1 ~ /\t/

In other words, both of the expressions in parentheses must be true or the right hand side must be true. You can use parentheses to override the rules of precedence, as in the following example which specifies that two conditions must be true.

    NR > 1 && (NF >= 2 || $1 ~ /\t/)

The first condition must be true and either of two other conditions must be true.

Given an expression that is either true or false, the ! operator inverts the sense of the expression.

    ! (NR > 1 && NF > 3)

This expression is true if the parenthesized expression is false. This operator is most useful with awk's in operator to see if an index is not in an array (as we shall see later), although it has other uses as well.
```

### 5.8.3 Getting Information About Files

```text
		First example, pipe the output of ls to an awk script that prints selected fields.

    ls -l $* | awk 'script'

The $* variable is used by the shell and expands to all arguments passed from the command line. (We could use $1 here, which would pass the first argument, but passing all the arguments provides greater flexibility.) These arguments can be the names of files or directories or additional options to the ls command. If no arguments are specified, the "$*" will be empty and the current directory will be listed. Thus, the output of the ls command will be directed to awk, which will automatically read standard input, since no filenames have been given.

We'd like our awk script to print the size and name of the file. That is, print field 5 ($5) and field 9 ($9).

    ls -l $* | awk '{ 
    	print $5, "\t", $9
    }'

	usage:
	$fls
	$fls -rt
	$fls com*

	So what our program does is take the long listing and reduce it to two fields. Now, let's add new functionality to our report by producing some information that the ls -l listing does not provide. We add each file's size to a running total, to produce the total number of bytes used by all files in the listing. We can also keep track of the number of files and produce that total. There are two parts to adding this functionality. The first is to accumulate the totals for each input line. We create the variable sum to accumulate the size of files and the variable filenum to accumulate the number of files in the listing.

	    {
    	sum += $5
    	++filenum
    	print $5, "\t", $9 
    }

The first expression uses the assignment operator +=. It adds the value of field 5 to the present value of the variable sum. The second expression increments the present value of the variable filenum. This variable is used as a counter, and each time the expression is evaluated, 1 is added to the count.

The action we've written will be applied to all input lines. The totals that are accumulated in this action must be printed after awk has read all the input lines. Therefore, we write an action that is controlled by the END rule.

    END { print "Total: ", sum, "bytes (" filenum " files)" }

We can also use the BEGIN rule to add column headings to the report.

    BEGIN { print "BYTES", "\t", "FILE" }

Now we can put this script in an executable file named filesum and execute it as a single-word command.

    $ filesum c*

    While the basic mechanism works, there are a few problems to be taken care of. The first problem occurs when you list the entire directory using the ls -l command. The listing contains a line that specifies the total number of blocks in the directory. The partial listing (all files beginning with "c") in the previous example does not have this line. But the following line would be included in the output if the full directory was listed:

    total 555

The block total does not interest us because the program displays the total file size in bytes. Currently, filesum does not print this line; however, it does read this line and cause the filenum counter to be incremented.

There is also a problem with this script in how it handles subdirectories. Look at the following line from an ls -l:

    drwxrwxrwx   3 dale     project         960 Feb  1 15:47 sed

A "d" as the first character in column 1 (file permissions) indicates that the file is a subdirectory. The size of this file (960 bytes) does not indicate the size of files in that subdirectory and therefore, it is slightly misleading to add it to the file size totals. Also, it might be helpful to indicate that it is a directory.

If you want to list the files in subdirectories, supply the -R (recursive) option on the command line. It will be passed to the ls command. However, the listing is slightly different as it identifies each directory. For instance, to identify the subdirectory old, the ls -lR listing produces a blank line followed by:

    ./old:

Our script ignores that line and a blank line preceding it but nonetheless they increment the file counter. Fortunately, we can devise rules to handle these cases. Let's look at the revised, commented script:

    ls -l $* | awk '
    # filesum: list files and total size in bytes
    # input: long listing produced by "ls -l"

    #1 output column headers
    BEGIN { print "BYTES", "\t", "FILE" }

    #2 test for 9 fields; files begin with "-"
    NF == 9 && /^-/ {
            sum += $5       # accumulate size of file
            ++filenum       # count number of files
            print $5, "\t", $9       # print size and filename
    }

    #3 test for 9 fields; directory begins with "d"
    NF == 9 && /^d/ {
            print "<dir>", "\t", $9  # print <dir> and name
    }

    #4 test for ls -lR line ./dir:
    $1 ~ /^\..*:$/ {
            print "\t" $0 # print that line preceded by tab
    }

    #5 once all is done,
    END {
    	# print total file size and number of files
    	print "Total: ", sum, "bytes (" filenum " files)"
    }'

    The rules and their associated actions have been numbered to make it easier to discuss them. The listing produced by ls -l contains nine fields for a file. Awk supplies the number of fields for a record in the system variable NF. Therefore, rules 2 and 3 test that NF is equal to 9. This helps us avoid matching odd blank lines or the line stating the block total. Because we want to handle directories and files differently, we use another pattern to match the first character of the line. In rule 2 we test for "-" in the first position on the line, which indicates a file. The associated action increments the file counter and adds the file size to the previous total. In rule 3, we test for a directory, indicated by "d" as the first character. The associated action prints "<dir>" in place of the file size. Rules 2 and 3 are compound expressions, specifying two patterns that are combined using the && operator. Both patterns must be matched for the expression to be true.

Rule 4 tests for the special case produced by the ls -lR listing ("./old:"). There are a number of patterns that we can write to match that line, using regular expressions or relational expressions:

    NF == 1			If the number of fields equals 1 ...
    /^\..*:$/		If the line begins with a period followed by any number of
                                                       characters and ends in a colon...
    $1 ~ /^\..*:$/		If field 1 matches the regular expression...

We used the latter expression because it seems to be the most specific. It employs the match operator (~) to test the first field against a regular expression. The associated action consists of only a print statement.

Rule 5 is the END pattern and its action is only executed once, printing the sum of file sizes as well as the number of files.

The filesum program demonstrates many of the basic constructs used in awk. What's more, it gives you a pretty good idea of the process of developing a program (although syntax errors produced by typos and hasty thinking have been gracefully omitted). If you wish to tinker with this program, you might add a counter for a directories, or a rule that handles symbolic links.
```
