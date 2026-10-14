---
type: reference
title: Functions
description: Subsection 5.16 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.16"
---

# 5.16 Functions

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.16.1 Arithmetic Functions

```text
		awk's Built-In Arithmetic Functions
		Awk Function 	Description
		cos(x)		Returns cosine of x (x is in radians).
		exp(x) 		Returns e to the power x.
		int(x) 		Returns truncated value of x.
		log(x) 		Returns natural logarithm (base-e) of x.
		sin(x) 		Returns sine of x (x is in radians).
		sqrt(x) 	Returns square root of x.
		atan2(y,x) 	Returns arctangent of y/x in the range -Figure to Figure .
		rand()		Returns pseudo-random number r, where 0 <= r < 1.
		srand(x) 	Establishes new seed for rand(). If no seed is specified, uses time of day. Returns the old seed
```

#### 5.16.1.1 Trigonometric Functions

```text
The trigonometric functions cos() and sin() work the same way, taking a single argument that is the size of an angle in radians and returning the cosine or sine for that angle. (To convert from degrees to radians, multiply the number by Figure /180.) The trigonometric function atan2() takes two arguments and returns the arctangent of their quotient. The expression

    atan2(0, -1)

produces Figure .

The function exp() uses the natural exponential, which is also known as base-e exponentiation. The expression

    exp(1)

returns the natural number 2.71828, the base of the natural logarithms, referred to as e. Thus, exp(x) is e to the x-th power.

The log() function gives the inverse of the exp() function, the natural logarithm of x. The sqrt() function takes a single argument and returns the (positive) square root of that argument.
```

#### 5.16.1.2 Integer Function

```text
The int() function truncates a numeric value by removing digits to the right of the decimal point. Look at the following two statements:

    print 100/3
    print int(100/3)

The output from these statements is shown below:

$    33.3333
    33

The int() function simply truncates; it does not round up or down. (Use the printf format "%.0f" to perform rounding.)
```

#### 5.16.1.3 Random Number Generation

```text
The rand() function generates a pseudo-random floating-point number between 0 and 1. The srand() function sets the seed or starting point for random number generation. If srand() is called without an argument, it uses the time of day to generate the seed. With an argument x, srand() uses x as the seed.

If you don't call srand() at all, awk acts as if srand() had been called with a constant argument before your program started, causing you to get the same starting point every time you run your program. This is useful if you want reproducible behavior for testing, but inappropriate if you really do want your program to behave differently every time. Look at the following script:

    # rand.awk -- test random number generation
    BEGIN {
    	print rand()
    	print rand()
    	srand()
    	print rand()
    	print rand()
    }

We print the result of the rand() function twice, and then call the srand() function before printing the result of the rand() function two more times. Let's run the script.

    $ awk -f rand.awk
$    0.513871
$    0.175726
$    0.760277
$    0.263863

Four random numbers are generated. Now look what happens when we run the program again:

    $ awk -f rand.awk
$    0.513871
$    0.175726
$    0.787988
$    0.305033

The first two "random" numbers are identical to the numbers generated in the previous run of the program while the last two numbers are different. The last two numbers are different because we provided the rand() function with a new seed.

The return value of the srand() function is the seed it was using. This can be used to keep track of sequences of random numbers, and re-run them if needed.
```

#### 5.16.1.4 Pick 'em

```text
To show how to use rand(), we'll look at a script that implements a "quick-pick" for a lottery game. This script, named lotto, picks x numbers from a series of numbers 1 to y. Two arguments can be supplied on the command line: how many numbers to pick (the default is 6) and the highest number in the series (the default is 30). Using the default values for x and y, the script generates six unique random numbers between 1 and 30. The numbers are sorted for readability from lowest to highest and output. Before looking at the script itself, let's run the program:

    $ lotto
    Pick 6 of 30
    9 13 25 28 29 30
    $ lotto 7 35
    Pick 7 of 35
    1 6 9 16 20 22 27

The first example uses the default values to print six random numbers from 1 to 30. The second example prints seven random numbers out of 35.

The full lotto script is fairly complicated, so before looking at the entire script, let's look at a smaller script that generates a single random number in a series:

    awk -v TOPNUM=$1 '
    # pick1 - pick one random number out of y 
    # main routine
    BEGIN {
    # seed random number using time of day 
    	srand() 
    # get a random number
    	select = 1 + int(rand() * TOPNUM)
    # print pick
    	print select
    }'

The shell script expects a single argument from the command line and this is passed into the program as "TOPNUM=$1," using the -v option. All the action happens in the BEGIN procedure. Since there are no other statements in the program, awk exits when the BEGIN procedure is done.

The main routine first calls the srand() function to seed the random number generator. Then we get a random number by calling the rand() function:

    select = 1 + int(rand() * TOPNUM)

It might be helpful to see this expression broken up so each part of it is obvious.
Statement			Result
print r = rand() 		0.467315
print r * TOPNUM 		14.0195
print int(r * TOPNUM) 		14
print 1 + int(r * TOPNUM) 	15

Because the rand() function returns a number between 0 and 1, we multiply it by TOPNUM to get a number between 0 and TOPNUM. We then truncate the number to remove the fractional values and then add 1 to the number. The latter is necessary because rand() could return 0. In this example, the random number that is generated is 15. You could use this program to print any single number, such as picking a number between 1 and 100.

    $ pick1 100
    83

The lotto script must "pick one" multiple times. Basically, we need to set up a for loop to execute the rand() function as many times as needed. One of the reasons this is difficult is that we have to worry about duplicates. In other words, it is possible for a number to be picked again; therefore we have to keep track of the numbers already picked.

Here's the lotto script:

    awk -v NUM=$1 -v TOPNUM=$2 '
    # lotto - pick x random numbers out of y 
    # main routine
    BEGIN {
    # test command line args; NUM = $1, how many numbers to pick 
    # 	              TOPNUM = $2, last number in series
    	if (NUM <= 0) 
    		NUM = 6
    	if (TOPNUM <= 0) 
    		TOPNUM = 30
    # print "Pick x of y"
    	printf("Pick %d of %d\n", NUM, TOPNUM) 
    # seed random number using time and date; do this once
    	srand() 
    # loop until we have NUM selections
    	for (j = 1; j <= NUM; ++j) {
    		# loop to find a not-yet-seen selection
    		do {
    			select = 1 + int(rand() * TOPNUM)
    		} while (select in pick)
    		pick[select] = select
    	}
    # loop through array and print picks.
    	for (j in pick) 
    		printf("%s ", pick[j])
    	printf("\n")
    }'

Unlike the previous program, this one looks for two command-line arguments, indicating x numbers out of y. The main routine looks to see if these numbers were supplied and if not, assigns default values.

There is only one array, pick, for holding the random numbers that are selected. Each number is guaranteed to be in the desired range, because the result of rand() (a value between 0 and 1) is multiplied by TOPNUM and then truncated. The heart of the script is a loop that occurs NUM times to assign NUM elements to the pick array.

To get a new non-duplicate random number, we use an inner loop that generates selections and tests to see if they are in the pick array. (Using the in operator is much faster than looping through the array comparing subscripts.) While (select in pick), the corresponding element has been found already, so the selection is a duplicate and we reject the selection. If it is not true that select in pick, then we assign select to an element of the pick array. This will make future in tests return true, causing the do loop to continue.

Finally, the program loops through the pick array and prints the elements. This version of the lotto script leaves one thing out. See if you can tell what it is if we run it again:

    $ lotto 7 35
    Pick 7 of 35
    5 21 9 30 29 20 2

That's right, the numbers are not sorted. We'll defer showing the code for the sort routine until we discuss user-defined functions. While it's not necessary to have written the sorting code as a function, it makes a lot of sense. One reason is that you can tackle a more generalized problem and retain the solution for use in other programs. Later on, we will write a function that sorts the elements of an array.

Note that the pick array isn't ready for sorting, since its indices are the same as its values, not numbers in order. We would have to set up a separate array for sorting by our sort function:

    # create a numerically indexed array for sorting
    i = 1
    for (j in pick)
    	sortedpick[i++] = pick[j]

The lotto program is set up to do everything in the BEGIN block. No input is processed. You could, however, revise this script to read a list of names from a file and for each name generate a "quick-pick."
```

### 5.16.2 String Functions

```text
		Awk Function 	Description
gsub(r,s,t) 	Globally substitutes s for each match of the regular expression r in the string t. Returns the number of substitutions. If t is not supplied, defaults to $0.
index(s,t) 	Returns position of substring t in string s or zero if not present.
length(s) 	Returns length of string s or length of $0 if no string is supplied.
match(s,r) 	Returns either the position in s where the regular expression r begins, or 0 if no occurrences are found. Sets the values of RSTART and RLENGTH.
split(s,a,sep) 	Parses string s into elements of array a using field separator sep; returns number of elements. If sep is not supplied, FS is used. Array splitting works the same way as field splitting.
sprintf("fmt",expr) 	Uses printf format specification for expr.
sub(r,s,t) 	Substitutes s for first match of the regular expression r in the string t. Returns 1 if successful; 0 otherwise. If t is not supplied, defaults to $0.
substr(s,p,n) 	Returns substring of string s at beginning position p up to a maximum length of n. If n is not supplied, the rest of the string from p is used.
tolower(s) 	Translates all uppercase characters in string s to lowercase and returns the new string.
toupper(s) 	Translates all lowercase characters in string s to uppercase and returns the new string.

The sprintf() function uses the same format specifications as printf(), which is discussed in Chapter 7, "Writing Scripts for awk". It allows you to apply the format specifications on a string. Instead of printing the result, sprintf() returns a string that can be assigned to a variable. It can do specialized processing of input records or fields, such as performing character conversions. For instance, the following example uses the sprintf() function to convert a number into an ASCII character.

    for (i = 97; i <= 122; ++i) {
    	nextletter = sprintf("%c", i)
    	...
    }
A loop supplies numbers from 97 to 122, which produce ASCII characters from a to z.
That leaves us with three basic built-in string functions to discuss: index(), substr(), and length().
```

### 5.16.3 Substrings

```text
		The index() and substr() functions both deal with substrings. Given a string s, index(s,t) returns the leftmost position where string t is found in s. The beginning of the string is position 1 (which is different from the C language, where the first character in a string is at position 0). Look at the following example:
    pos = index("Mississippi", "is")
The value of pos is 2. If the substring is not found, the index() function returns 0.
Given a string s, substr(s,p) returns the characters beginning at position p. The following example creates a phone number without an area code.
    phone = substr("707-555-1111", 5)
You can also supply a third argument which is the number of characters to return. The next example returns just the area code:
    area_code = substr("707-555-1111", 1, 3)
The two functions can be and often are used together, as in the next example. This example capitalizes the first letter of the first word for each input record.
(Note, Much easier with python. See:
 echo "astring"  | python -c "print raw_input().capitalize()"
Astring
)
Note, to capitalize words or strings use toupper() function
    awk '# caps - capitalize 1st letter of 1st word
    # initialize strings
    BEGIN { upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            lower = "abcdefghijklmnopqrstuvwxyz" 
    }
    # for each input line
    {
    # get first character of first word
    	FIRSTCHAR = substr($1, 1, 1)
    # get position of FIRSTCHAR in lowercase array; if 0, ignore
    	if (CHAR = index(lower, FIRSTCHAR)) 
    		# change $1, using position to retrieve
    		# uppercase character 
    		$1 = substr(upper, CHAR, 1) substr($1, 2)
    # print record
    	print $0
    }'
This script creates two variables, upper and lower, consisting of uppercase and lowercase letters. Any character that we find in lower can be found at the same position in upper. The first statement of the main procedure extracts a single character, the first one, from the first field. The conditional statement tests to see if that character can be found in lower using the index() function. If CHAR is not 0, then CHAR can be used to extract the uppercase character from upper. There are two substr() function calls: the first one retrieves the capitalized letter and the second call gets the rest of the first field, extracting all characters, beginning with the second character. The values returned by both substr() functions are concatenated and assigned to $1. Making an assignment to a field as we do here is a new twist, but it has the added benefit that the record can be output normally. (If the assignment was made to a variable, you'd have to output the variable and then output the record's remaining fields.) The print statement prints the changed record. Let's see it in action:
    $ caps
    root user
    Root user
    dale
    Dale
    Tom
    Tom
In a little bit, we'll see how to revise this program to change all characters in a string from lower- to uppercase or vice versa.
```

### 5.16.4 String Length

```text
		When presenting the awkro program in the previous chapter, we noted that the program was likely to produce lines that exceed 80 characters. After all, the descriptions are quite long. We can find out how many characters are in a string using the built-in function length(). For instance, to evaluate the length of the current input record, we specify length($0). (As it happens, if length() is called without an argument, it returns the length of $0.)
The length() function is often used to find the length of the current input record, in order to determine if we need to break the line.
One way to handle the line break, perhaps more efficiently, is to use the length() function to get the length of each field. By accumulating those lengths, we could specify a line break when a new field causes the total to exceed a certain number.
```

### 5.16.6 Substitution Functions

```text
Awk provides two substitution functions: sub() and gsub(). The difference between them is that gsub() performs its substitution globally on the input string whereas sub() makes only the first possible substitution. This makes gsub() equivalent to the sed substitution command with the g (global) flag.
Both functions take at least two arguments. The first is a regular expression (surrounded by slashes) that matches a pattern and the second argument is a string that replaces what the pattern matches. The regular expression can be supplied by a variable, in which case the slashes are omitted. An optional third argument specifies the string that is the target of the substitution. If there is no third argument, the substitution is made for the current input record ($0).
The substitution functions change the specified string directly. You might expect, given the way functions work, that the function returns the new string created when the substitution is made. The substitution functions actually return the number of substitutions made. sub() will always return 1 if successful; both return 0 if not successful. Thus, you can test the result to see if a substitution was made.
For example, the following example uses gsub() to replace all occurrences of "UNIX" with "POSIX".
    if (gsub(/UNIX/, "POSIX"))
    	print
The conditional statement tests the return value of gsub() such that the current input line is printed only if a change is made.
As with sed, if an "&" appears in the substitution string, it will be replaced by the string matched by the regular expression. Use "\&" to output an ampersand. (Remember that to get a literal "\" into a string, you have to type two of them.) Also, note that awk does not "remember" the previous regular expression, as does sed, so you cannot use the syntax "//" to refer to the last regular expression.
The following example surrounds any occurrence of "UNIX" with the troff font-change escape sequences.
    gsub(/UNIX/, "\\fB&\\fR")
If the input is "the UNIX operating system", the output is "the \fBUNIX\fR operating system".
In Chapter 4, "Writing sed Scripts", we presented the following sed script named do.outline:
    sed -n '
    s/"//g
    s/^\.Se /Chapter /p
    s/^\.Ah /A. /p
    s/^\.Bh /B.  /p' $*
Now here's that script rewritten using the substitution functions:
    awk '
    {
    gsub(/"/, "")
    if (sub(/^\.Se /, "Chapter ")) print
    if (sub(/^\.Ah /, "\tA. ")) print
    if (sub(/^\.Bh /, "\t\tB.  ")) print
    }' $*
The two scripts are exactly equivalent, printing out only those lines that are changed. For the first edition of this book, Dale compared the run-time of both scripts and, as he expected, the awk script was slower. For the second edition, new timings showed that performance varies by implementation, and in fact, all tested versions of new awk were faster than sed! This is nice, since we have the capabilities in awk to make the script do more things. For instance, instead of using letters of the alphabet, we could number the headings. Here's the revised awk script:
    awk '# do.outline -- number headings in chapter.
    {
    gsub(/"/, "")
    }
    /^\.Se/ {
    	sub(/^\.Se /, "Chapter ") 
    	ch = $2
    	ah = 0
    	bh = 0
    	print
    	next
    }
    /^\.Ah/ {
    	sub(/^\.Ah /, "\t " ch "." ++ah " ") 
    	bh = 0
    	print
    	next
    }
    /^\.Bh/ {
    	sub(/^\.Bh /, "\t\t " ch "."  ah "." ++bh " ")
    	print
    }' $*
In this version, we break out each heading into its own pattern-matching rule. This is not necessary but seems more efficient since we know that once a rule is applied, we don't need to look at the others. Note the use of the next statement to bypass further examination of a line that has already been identified.
The chapter number is read as the first argument to the ".Se" macro and is thus the second field on that line. The numbering scheme is done by incrementing a variable each time the substitution is made. The action associated with the chapter-level heading initializes the section-heading counters to zero. The action associated with the top-level heading ".Ah" zeroes the second-level heading counter. Obviously, you can create as many levels of heading as you need. Note how we can specify a concatenation of strings and variables as a single argument to the sub() function.
    $ do.outline ch02
If you wanted the option of choosing either numbers or letters, you could maintain both programs and construct a shell wrapper that uses some flag to determine which program should be invoked.
```

### 5.16.7 Converting Case

```text
		POSIX awk provides two functions for converting the case of characters within a string. The functions are tolower() and toupper(). Each takes a single string argument, and returns a copy of that string, with all the characters of one case converted to the other (upper to lower and lower to upper, respectively). Their use is straightforward:
    $ cat test
    Hello, World!
    Good-bye CRUEL world!
    1, 2, 3, and away we GO!
    $ awk '{ printf("<%s>, <%s>\n", tolower($0), toupper($0)) }' test
    <hello, world!>, <HELLO, WORLD!>
    <good-bye cruel world!>, <GOOD-BYE CRUEL WORLD!>
    <1, 2, 3, and away we go!>, <1, 2, 3, AND AWAY WE GO!>
Note that nonalphabetic characters are left unchanged.
```

### 5.16.8 The match() Function

```text
		The match() function allows you to determine if a regular expression matches a specified string. It takes two arguments, the string and the regular expression. (This function is confusing because the regular expression is in the second position, whereas it is in the first position for the substitution functions.)

The match() function returns the starting position of the substring that was matched by the regular expression. You might consider it a close relation to the index() function. In the following example, the regular expression matches any sequence of capital letters in the string "the UNIX operating system".

    match("the UNIX operating system", /[A-Z]+/)

The value returned by this function is 5, the character position of "U," the first capital letter in the string.

The match() function also sets two system variables: RSTART and RLENGTH. RSTART contains the same value returned by the function, the starting position of the substring. RLENGTH contains the length of the string in characters (not the ending position of the substring). When the pattern does not match, RSTART is set to 0 and RLENGTH is set to -1. In the previous example, RSTART is equal to 5 and RLENGTH is equal to 4. (Adding them together gives you the position of the first character after the match.)

Let's look at a rather simple example that prints out a string matched by a specified regular expression, demonstrating the "extent of the match," as discussed in Chapter 3, "Understanding Regular Expression Syntax". The following shell script takes two command-line arguments: the regular expression, which should be specified in quotes, and the name of the file to search.

    awk '# match -- print string that matches line
    # for lines match pattern 
    match($0, pattern) {
    	# extract string matching pattern using
    	# starting position and length of string in $0 
    	# print string
    	print substr($0, RSTART, RLENGTH)
    }' pattern="$1" $2

The first command-line parameter is passed as the value of pattern. Note that $1 is surrounded by quotes, necessary to protect any spaces that might appear in the regular expression. The match() function appears in a conditional expression that controls execution of the only procedure in this awk script. The match() function returns 0 if the pattern is not found, and a non-zero value (RSTART) if it is found, allowing the return value to be used as a condition. If the current record matches the pattern, then the string is extracted from $0, using the values of RSTART and RLENGTH in the substr() function to specify the starting position of the substring to be extracted and its length. The substring is printed. This procedure only matches the first occurrence in $0.

Here's a trial run, given a regular expression that matches "emp" and any number of characters up to a blank space:

    $ match "emp[^ ]*" personnel.txt
    employees
    employee
    employee.
    employment,
    employer
    employment
    employee's
    employee

The match script could be a useful tool in improving your understanding of regular expressions.

The next script uses the match() function to locate any sequence of uppercase letters so that they can be converted to lowercase. Compare it to the caps program shown earlier in the chapter.

    awk '# lower - change upper case to lower case 
    # initialize strings
    BEGIN { upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            lower = "abcdefghijklmnopqrstuvwxyz" 
    }

    # for each input line
    {
    # see if there is a match for all caps 
    	 while (match($0, /[A-Z]+/))  
    		# get each cap letter
    		for (x = RSTART; x < RSTART+RLENGTH; ++x) { 
    			CAP = substr($0, x, 1)
    			CHAR = index(upper, CAP)
    			# substitute lowercase for upper 
    			gsub(CAP, substr(lower, CHAR, 1))
    		}
    		
    # print record
           print $0
    }' $*

In this script, the match() function appears in a conditional expression that determines whether a while loop will be executed. By placing this function in a loop, we apply the body of the loop as many times as the pattern occurs in the current input record.

The regular expression matches any sequence of uppercase letters in $0. If a match is made, a for loop does the lookup of each character in the substring that was matched, similar to what we did in the caps sample program, shown earlier in this chapter. What's different here is how we use the system variables RSTART and RLENGTH. RSTART initializes the counter variable x. It is used in the substr() function to extract one character at a time from $0, beginning with the first character that matched the pattern. By adding RLENGTH to RSTART, we get the position of the first character after the ones that matched the pattern. That is why the loop uses "<" instead of "<=". At the end, we use gsub() to replace the uppercase letter with the corresponding lowercase letter.[58] Notice that we use gsub() instead of sub() because it offers us the advantage of making several substitutions if there are multiple instances of the same letter on the line.

    [58]You may be wondering, "why not just use tolower()?" Good question. Some early versions of nawk, including the one on SunOS 4.1.x systems, don't have tolower() and toupper(); thus it's useful to know how to do it yourself.

    $ cat test
    Every NOW and then, a WORD I type appears in CAPS.
    $ lower test
    every now and then, a word i type appears in caps.

Note that you could change the regular expression to avoid matching individual capital letters by matching a sequence of two or more uppercase characters, by using: "/[A-Z][A-Z]+/." This would also require revising the way the lowercase conversion was made using gsub(), since it matches a single character on the line.

In our discussion of the sed substitution command, you saw how to save and recall a portion of a string matched by a pattern, using \( and \) to surround the pattern to be saved and \n to recall the saved string in the replacement pattern. Unfortunately, awk's standard substitution functions offer no equivalent syntax. The match() function can solve many such problems, though.

For instance, if you match a string using the match() function, you can single out characters or a substring at the head or tail of the string. Given the values of RSTART and RLENGTH, you can use the substr() function to extract the characters. In the following example, we replace the second of two colons with a semicolon. We can't use gsub() to make the replacement because "/:/" matches the first colon and "/:[^:]*:/" matches the whole string of characters. We can use match() to match the string of characters and to extract the last character of the string.

    # replace 2nd colon with semicolon using match, substr
    if (match($1, /:[^:]*:/)) {
    	before = substr($1, 1, (RSTART + RLENGTH - 2))
    	after = substr($1, (RSTART + RLENGTH))
    	$1 = before ";" after
    }

The match() function is placed within a conditional statement that tests that a match was found. If there is a match, we use the substr() function to extract the substring before the second colon as well as the substring after it. Then we concatenate before, the literal ";", and after, assigning it to $1.
```
