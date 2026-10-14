---
type: reference
title: "Conditionals, Loops, and Arrays"
description: Subsection 5.13 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.13"
---

# 5.13 Conditionals, Loops, and Arrays

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.13.1 Conditions

```text
		if ( expression )
		   action1
		[else
		   action2]

		   if ( expression ) { 
			statement1
			statement2
		  }

		    if ( expression ) action1
		    [else action2]

		    if ( expression ) action1; [else action2]

		    if ( x == y ) print x

		    if ( x ~ /[yY](es)?/ ) print x

		Multiple conditional statements can be used to test whether one of several possible conditions is true. For example, perhaps the students are given a letter grade instead of a pass-fail mark. Here's a conditional that assigns a letter grade based on a student's average:

		    if (avg >= 90)  grade = "A"
		    else if (avg >= 80) grade = "B"
		    else if (avg >= 70) grade = "C"
		    else if (avg >= 60) grade = "D"
		    else grade = "F"

		The important thing to recognize is that successive conditionals like this are evaluated until one of them returns true; once that occurs, the rest of the conditionals are skipped. If none of the conditional expressions evaluates to true, the last else is accepted, constituting the default action; in this case, it assigns "F" to grade.

			Awk provides a conditional operator that is found in the C programming language. Its form is:

    expr ? action1 : action2

The previous simple if/else condition can be written using a conditional operator:

    grade = (avg >= 65) ? "Pass" : "Fail"

This form has the advantage of brevity and is appropriate for simple conditionals such as the one shown here.
```

### 5.13.2 Loops

```text
		    while (condition) 
			action

			do
				action
			while (condition)

		    for ( set_counter ; test_counter ; increment_counter ) 
			action
```

#### 5.13.2.1 Examples

```text
				Derive factorial
				awk '# factorial: return factorial of user-supplied number
				BEGIN {
					# prompt user; use printf, not print, to avoid the newline
					printf("Enter number: ")
				}

# check that user enters a number
				$1 ~ /^[0-9]+$/ { 
					# assign value of $1 to number & fact
					number = $1
					if (number == 0)
						fact = 1
					else
						fact = number
					# loop to multiply fact*x until x = 1
					for (x = number - 1; x > 1; x--)
						fact *= x
					printf("The factorial of %d is %g\n", number, fact)
					# exit -- saves user from typing CRTL-D.
					exit
				}

# if not a number, prompt again.
				{ printf("\nInvalid entry. Enter a number: ") 
				}' -
		
				This is an interesting example of a main input loop that prompts for input and reads the reply from standard input. The BEGIN rule is used to prompt the user to enter a number. Because we have specified that input is to come not from a file but from standard input, the program will halt after putting out the prompt and then wait for the user to type a number. The first rule checks that a number has been entered. If not, the second rule will be applied, prompting the user again to re-enter a number. We set up an input loop that will continue to read from standard input until a valid entry is found. See the lookup program in the next section for another example of constructing an input loop.
```

### 5.13.3 Other Statements That Affect Flow Control

#### 5.13.3.1 break, continue

```text
			The if, while, for, and do statements allow you to change the normal flow through a procedure. In this section, we look at several other statements that also affect a change in flow control.

There are two statements that affect the flow control of a loop, break and continue. The break statement, as you'd expect, breaks out of the loop, such that no more iterations of the loop are performed. The continue statement stops the current iteration before reaching the bottom of the loop and starts a new iteration at the top
```

#### 5.13.3.2 main input loop. next, exit.

```text
			There are two statements that affect the main input loop, next and exit. The next statement causes the next line of input to be read and then resumes execution at the top of the script. This allows you to avoid applying other procedures on the current input line. A typical use of the next statement is to continue reading input from a file, ignoring the other actions in the script until that file is exhausted. The system variable FILENAME provides the name of the current input file. Thus, a pattern can be written:

			    FILENAME == "acronyms" {
					action
					next
				    }
				    { print }

This causes the action to be performed for each line in the file acronyms. After the action is performed, the next line of input is read. Control does not pass to the print statement until the input is taken from a different source.

The exit statement exits the main input loop and passes control to the END rule, if there is one. If the END rule is not defined, or the exit statement is used in the END rule, then the script terminates. We used the exit statement earlier in the factorial program to exit after reading one line of input.

An exit statement can take an expression as an argument. The value of this expression will be returned as the exit status of awk. If the expression is not supplied, the exit status is 0. If you supply a value to an initial exit statement, and then call exit again from the END rule without a value, the first value is used. For example:

    awk '{
    	...
    	exit 5
    }
    END { exit }'

Here, the exit status from awk will be 5.
```

### 5.13.4 Arrays

```text
	An array is a variable that can be used to store a set of values. Usually the values are related in some way. Individual elements are accessed by their index in the array. Each index is enclosed in square brackets. The following statement assigns a value to an element of an array:

    array[subscript] = value

In awk, you don't have to declare the size of the array; you only have to use the identifier as an array. This is best done by assigning a value to an array element. For instance, the following example assigns the string "cherry" to an element of the array named flavor.

    flavor[1] = "cherry"

The index or subscript of this element of the array is "1". The following statement prints the string "cherry":

    print flavor[1]

Loops can be used to load and extract elements from arrays. For instance, if the array flavor has five elements, you can write a loop to print each element:

    flavor_count = 5
    for (x = 1; x <= flavor_count; ++x)
    	print flavor[x]

One way that arrays are used in awk is to store a value from each record, using the record number as the index to the array. Let's suppose we wanted to keep track of the averages calculated for each student and come up with a class average. Each time a record is read we make the following assignment.

    student_avg[NR] = avg

The system variable NR is used as the subscript for the array because it is incremented for each record. When the first record is read, the value of avg is placed in student_avg[1]; for the second record, the value is placed in student_avg[2], and so on. After we have read all of the records, we have a list of averages in the array student_avg. In an END rule, we can average all of these grades by writing a loop to get the total of the grades and then dividing it by the value of NR. Then we can compare each student average to the class average to collect totals for the number of students at or above average and the number below.

    END {
    	for ( x = 1; x <= NR; x++ ) 
    		class_avg_total += student_avg[x]
    	
    	class_average = class_avg_total / NR
    	
    	for ( x = 1; x <= NR; x++ )
    		if (student_avg[x] >= class_average)
    			++above_average
    		else
    			++below_average
    	
    	print "Class Average: ", class_average
    	print "At or Above Average: ", above_average
    	print "Below Average: ", below_average
    }

There are two for loops for accessing the elements of the array. The first one totals the averages so that it can be divided by the number of student records. The next loop retrieves each student average so that it can be compared to the class average. If it is at or above average, we increment the variable above_average; otherwise, we increment below_average.
```

### 5.13.5 Associative Arrays

```text
In awk, all arrays are associative arrays. What makes an associative array unique is that its index can be a string or a number.

In most programming languages, the indices of arrays are exclusively numeric. In these implementations, an array is a sequence of locations where values are stored. The indices of the array are derived from the order in which the values are stored. There is no need to keep track of indices. For instance, the index of the first element of an array is "1" or the first location in the array.

An associative array makes an "association" between the indices and the elements of an array. For each element of the array, a pair of values is maintained: the index of the element and the value of the element. The elements are not stored in any particular order as in a conventional array. Thus, even though you can use numeric subscripts in awk, the numbers do not have the same meaning that they do in other programming languages--they do not necessarily refer to sequential locations. However, with numeric indices, you can still access all the elements of an array in sequence, as we did in previous examples. You can create a loop to increment a counter that references the elements of the array in order.

Sometimes, the distinction between numeric and string indices is important. For instance, if you use "04" as the index to an element of the array, you cannot reference that element using "4" as its subscript. You'll see how to handle this problem in a sample program date-month, shown later in this chapter.

Associative arrays are a distinctive feature of awk, and a very powerful one that allows you to use a string as an index to another value. For instance, you could use a word as the index to its definition. If you know the word, you can retrieve the definition.

For example, you could use the first field of the input line as the index to the second field with the following assignment:

    array[$1] = $2

Using this technique, we could take our list of acronyms and load it into an array named acro.

    acro[$1] = $2

Each element of the array would be the description of an acronym and the subscript used to retrieve the element would be the acronym itself. The following expression:

    acro["BASIC"]

produces:

    Beginner's All-Purpose Symbolic Instruction Code

There is a special looping syntax for accessing all the elements of an associative array. It is a version of the for loop.

    for ( variable in array )
         do something with array[variable]

The array is the name of an array, as it was defined. The variable is any variable, which you can think of as a temporary variable similar to a counter that is incremented in a conventional for loop. This variable is set to a particular subscript each time through the loop. (Because variable is an arbitrary name, you often see item used, regardless of what variable name was used for the subscript when the array was loaded.) For example, the following for loop prints the name of the acronym item and the definition referenced by that name, acro[item].

    for ( item in acro )
    	print item, acro[item]

In this example, the print statement prints the current subscript ("BASIC," for instance) followed by the element of the acro array referenced by the subscript ("Beginner's All-Purpose Symbolic Instruction Code").

This syntax can be applied to arrays with numeric subscripts. However, the order in which the items are retrieved is somewhat random.[56] The order is very likely to vary among awk implementations; be careful to write your programs so that they don't depend on any one version of awk.

    [56]The technical term used in The AWK Programming Language is "implementation dependent."

It is important to remember that all array indices in awk are strings. Even when you use a number as an index, awk automatically converts it to a string first. You don't have to worry about this when you use integer indices, since they get converted to strings as integers, no matter what the value may be of OFMT (original awk and earlier versions of new awk) or CONVFMT (POSIX awk). But if you use a real number as an index, the number to string conversion might affect you. For instance:

    $ gawk 'BEGIN { data[1.23] = "3.21"; CONVFMT = "%d"
    > printf "<%s>\n", data[1.23] }'
    <>

Here, nothing was printed between the angle brackets, since the second time, 1.23 was converted to just 1, and data["1"] has the empty string as its value.

    NOTE: Not all implementations of awk get the number to string conversion right when CONVFMT has changed between one use of a number and the next. Test the above example with your awk to be sure it works correctly.

Now let's return to our student grade program for an example. Let's say that we wanted to report how many students got an "A," how many got a "B," and so on. Once we determine the grade, we could increment a counter for that grade. We could set up individual variables for each letter grade and then test which one to increment.

    if ( grade == "A" )
    	++gradeA
    else if (grade == "B" )
    	++gradeB
    .
    .
    .

However, an array makes this task much easier. We can define an array called class_grade, and simply use the letter grade (A through F) as the index to the array.

    ++class_grade[grade]

Thus, if the grade is an "A" then the value of class_grade["A"] is incremented by one. At the end of the program, we can print out these values in the END rule using the special for loop:

    for (letter_grade in class_grade)
         print letter_grade ":", class_grade[letter_grade] | "sort"

The variable letter_grade references a single subscript of the array class_grade each time through the loop. The output is piped to sort, to make sure the grades come out in the proper order. (Piping output to programs is discussed in Chapter 10, "The Bottom Drawer".) Since this is the last addition we make to the grades.awk script, we can look at the full listing.

    # grades.awk -- average student grades and determine 
    # letter grade as well as class averages.
    # $1 = student name; $2 - $NF = test scores.

    # set output field separator to tab.
    BEGIN { OFS = "\t" }

    # action applied to all input lines
    { 
      # add up grades
    	total = 0
    	for (i = 2; i <= NF; ++i)
    		total += $i 
      # calculate average
    	avg = total / (NF - 1)
      # assign student's average to element of array
    	student_avg[NR] = avg
      # determine letter grade
    	if (avg >= 90)  grade = "A"
    	else if (avg >= 80) grade = "B"
    	else if (avg >= 70) grade = "C"
    	else if (avg >= 60) grade = "D"
    	else grade = "F"	
      # increment counter for letter grade array
    	++class_grade[grade]
      # print student name, average and letter grade
    	print $1, avg, grade 
    }
    # print out class statistics
    END {
      # calculate class average
    	for (x = 1; x <= NR; x++)
    		class_avg_total += student_avg[x]
    	class_average = class_avg_total / NR
      # determine how many above/below average
    	for (x = 1; x <= NR; x++)
    		if (student_avg[x] >= class_average)
    			++above_average
    		else
    			++below_average
      # print results
    	print ""
    	print "Class Average: ", class_average
    	print "At or Above Average: ", above_average
    	print "Below Average: ", below_average     
      # print number of students per letter grade
    	for (letter_grade in class_grade)
    		print letter_grade ":", class_grade[letter_grade] | "sort"
    }

Here's a sample run:

    $ cat grades.test
    mona 70 77 85 83 70 89
    john 85 92 78 94 88 91
    andrea 89 90 85 94 90 95
    jasper 84 88 80 92 84 82
    dunce 64 80 60 60 61 62
    ellis 90 98 89 96 96 92
    $ awk -f grades.awk grades.test
    mona    79      C
    john    88      B
    andrea  90.5    A
    jasper  85      B
    dunce   64.5    D
    ellis   93.5    A

    Class Average:  83.4167
    At or Above Average:    4
    Below Average:  2
    A:      2
    B:      2
    C:      1
    D:      1
```

### 5.13.6 Testing for Membership in an Array

```text
The keyword in is also an operator that can be used in a conditional expression to test that a subscript is a member of an array. The expression:

    item in array

returns 1 if array[item] exists and 0 if it does not. For example, the following conditional statement is true if the string "BASIC" is a subscript of the array acro.

    if ( "BASIC" in acro )
    	print "Found BASIC"

This is true if "BASIC" is a subscript used to access an element of acro. This syntax cannot tell you whether "BASIC" is the value of an element of acro. This expression is the same as writing a loop to check that such a subscript exists, although the above expression is much easier to write, and much more efficient to execute.
```

### 5.13.7 A Glossary Lookup Script

```text
This program reads a series of glossary entries from a file named glossary and puts them into an array. The user is prompted to enter a glossary term and if it is found, the definition of the term is printed.

Here's the lookup program:

    awk '# lookup -- reads local glossary file and prompts user for query

    #0
    BEGIN { FS = "\t"; OFS = "\t"
    	# prompt user
    	printf("Enter a glossary term: ")
    } 

    #1 read local file named glossary
    FILENAME == "glossary" {
    	# load each glossary entry into an array
    	entry[$1] = $2
    	next
    } 

    #2 scan for command to exit program
    $0 ~ /^(quit|[qQ]|exit|[Xx])$/ { exit }

    #3 process any non-empty line 
    $0 != "" {
    	if ( $0 in entry ) {
    		# it is there, print definition
    		print entry[$0]
    	} else
    		print $0 " not found"
    }

    #4 prompt user again for another term
    {
    	printf("Enter another glossary term (q to quit): ")
    }' glossary -

The pattern-matching rules are numbered to make this discussion easier. As we look at the individual rules, we'll discuss them in the order in which they are encountered in the flow of the script. Rule #0 is the BEGIN rule, which is performed only once before any input is read. It sets FS and OFS to a tab and then prompts the user to enter a glossary item. The response will come from standard input, but that is read after the glossary file.

Rule #1 tests to see if the current filename (the value of FILENAME) is "glossary" and is therefore only applied while reading input from this file. This rule loads the glossary entries into an array:

    entry[term] = definition

where $1 is the term and $2 is the definition. The next statement at the end of rule #1 is used to skip other rules in the script and causes a new line of input to be read. So, until all the entries in the glossary file are read, no other rule is evaluated.

Once input from glossary is exhausted, awk reads from standard input because "-" is specified on the command line. Standard input is where the user's response comes from. Rule #3 tests that the input line ($0) is not empty. This rule should match whatever the user types. The action uses in to see if the input line is an index in the array. If it is, it simply prints out the corresponding value. Otherwise, we tell the user that no valid entry was found.

After rule #3, rule #4 will be evaluated. This rule simply prompts the user for another entry. Note that regardless of whether a valid entry was processed in rule #3, rule #4 is executed. The prompt also tells the user how to quit the program. After this rule, awk looks for the next line of input.

If the user chooses to quit by entering "q" as the next line of input, rule #2 will be matched. The pattern looks for a complete line consisting of alternative words or single letters that the user might enter to quit. The "^" and "$" are important, signifying that the input line contains no other characters but these; otherwise a "q" appearing in a glossary entry would be matched. Note that the placement of this rule in the sequence of rules is significant. It must appear before rules #3 and #4 because these rules will match anything, including the words "quit" and "exit."

Let's look at how the program works. For this example, we will make a copy of the acronyms file and use it as the glossary file.

    $ cp acronyms glossary
    $ lookup
    Enter a glossary term: GIGO
    Garbage in, garbage out
    Enter another glossary term (q to quit): BASIC
    Beginner's All-Purpose Symbolic Instruction Code
    Enter another glossary term (q to quit): q 

As you can see, the program is set up to prompt the user for additional items until the user enters "q".

Note that this program can be easily revised to read a glossary anywhere on the file system, including the user's home directory. The shell script that invokes awk could handle command-line options that allow the user to specify the glossary filename. You could also read a shared glossary file and then read a local one by writing separate rules to process the entries.
```

### 5.13.8 Using split() to Create Arrays

```text
	The built-in function split() can parse any string into elements of an array. This function can be useful to extract "subfields" from a field. The syntax of the split() function is:

    n = split(string, array, separator)

string is the input string to be parsed into elements of the named array. The array's indices start at 1 and go to n, the number of elements in the array. The elements will be split based on the specified separator character. If a separator is not specified, then the field separator (FS) is used. The separator can be a full regular expression, not just a single character. Array splitting behaves identically to field splitting;

For example, if you had a record in which the first field consisted of the person's full name, you could use the split() function to extract the person's first and last names. The following statement breaks up the first field into elements of the array fullname:

    z = split($1, fullname, " ")

A space is specified as the delimiter. The person's first name can be referenced as:

    fullname[1]

and the person's last name can be referenced as:

    fullname[z]

because z contains the number of elements in the array. This works, regardless of whether the person's full name contains a middle name. If z is the value returned by split(), you can write a loop to read all the elements of this array.

    z = split($1, array, " ")
    for (i = 1; i <= z; ++i)
    	print i, array[i]
```

### 5.13.9 Making Conversions

```text
		This shell script takes the first argument from the command line and echoes it as input to the awk program.

    echo $1 | 
    awk '# romanum -- convert number 1-10 to roman numeral

    # define numerals as list of roman numerals 1-10
    BEGIN { 
    	# create array named numerals from list of roman numerals
    	split("I,II,III,IV,V,VI,VII,VIII,IX,X", numerals, ",")
    }

    # look for number between 1 and 10
    $1 > 0 && $1 <= 10 {
    	# print specified element
    	print numerals[$1]
    	exit
    }

    { 	print "invalid number"
      	exit
    }'

This script defines a list of 10 roman numerals, then uses split() to load them into an array named numerals. This is done in the BEGIN action because it only needs to be done once.

The second rule checks that the first field of the input line contains a number between 1 and 10. If it does, this number is used as the index to the numerals array, retrieving the corresponding element. The exit statement terminates the program. The last rule is executed only if there is no valid entry.

Here's an example of how it works:

    $ romanum 4
    IV

ollowing along on the same idea, here's a script that converts dates in the form "mm-dd-yy" or "mm/dd/yy" to "month day, year."

    awk '
    # date-month -- convert mm/dd/yy or mm-dd-yy to month day, year

    # build list of months and put in array. 
    BEGIN { 
    	# the 3-step assignment is done for printing in book
    	listmonths = "January,February,March,April,May,June,"
    	listmonths = listmonths "July,August,September,"
    	listmonths = listmonths "October,November,December" 
    	split(listmonths, month, ",")
    }

    # check that there is input
    $1 != "" {

    # split on "/" the first input field into elements of array
    	sizeOfArray = split($1, date, "/")

    # check that only one field is returned
    	if (sizeOfArray == 1)
    		# try to split on "-"
    		sizeOfArray = split($1, date, "-")

    # must be invalid
    	if (sizeOfArray == 1)
    		exit

    # add 0 to number of month to coerce numeric type 
    	date[1] += 0

    # print month day, year
    	print month[date[1]], (date[2] ", 19" date[3])
    }'

This script reads from standard input. The BEGIN action creates an array named month whose elements are the names of the months of the year. The second rule verifies that we have a non-empty input line. The first statement in the associated action splits the first field of input looking for "/" as the delimiter. sizeOfArray contains the number of elements in the array. If awk was unable to parse the string, it creates the array with only one element. Thus, we can test the value of sizeOfArray to determine if we have several elements. If we do not, we assume that perhaps "-" was used as the delimiter. If that fails to produce an array with multiple elements, we assume the input is invalid, and exit. If we have successfully parsed the input, date[1] contains the number of the month. This value can be used as the index to the array month, nesting one array inside another. However, before using date[1], we coerce the type of date[1] by adding 0 to it. While awk will correctly interpret "11" as a number, leading zeros may cause a number to be treated as a string. Thus, "06" might not be recognized properly without type coercion. The element referenced by date[1] is used as the subscript for month.

Here's a sample run:

    $ echo "5/11/55" | date-month
    May 11, 1955
```

### 5.13.10 Deleting Elements of an Array

```text
Awk provides a statement for deleting an element of an array. The syntax is:

    delete array[subscript]

The brackets are required. This statement removes the element indexed by subscript from array. In particular, the in test for subscript will now return false. This is different than just assigning the empty string to that element; in that case in would still be true. See the lotto script in the next chapter for an example of using the delete statement.
```
