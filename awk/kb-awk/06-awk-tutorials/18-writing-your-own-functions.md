---
type: reference
title: Writing Your Own Functions
description: Subsection 5.17 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.17"
---

# 5.17 Writing Your Own Functions

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	A function definition can be placed anywhere in a script that a pattern-action rule can appear. Typically, we put the function definitions at the top of the script before the pattern-action rules. A function is defined using the following syntax:

    function name (parameter-list) {
    	statements
    }

The newlines after the left brace and before the right brace are optional. You can also have a newline after the close-parenthesis of the parameter list and before the left brace.

The parameter-list is a comma-separated list of variables that are passed as arguments into the function when it is called. The body of the function consists of one or more statements. The function typically contains a return statement that returns control to that point in the script where the function was called; it often has an expression that returns a value as well.

    return expression

The following example shows the definition for an insert() function:

    function insert(STRING, POS, INS) {
            before_tmp = substr(STRING, 1, POS)
            after_tmp = substr(STRING, POS + 1)
            return before_tmp INS after_tmp
    }

This function takes three arguments, inserting one string INS in another string STRING after the character at position POS.[60] The body of this function uses the substr() function to divide the value of STRING into two parts. The return statement returns a string that is the result of concatenating the first part of STRING, the INS string, and the last part of STRING. A function call can appear anywhere that an expression can. Thus, the following statement:

	    print insert($1, 4, "XX")

If the value of $1 is "Hello," then this functions returns "HellXXo." Note that when calling a user-defined function, there can be no spaces between the function name and the left parenthesis. This is not true of built-in functions.

It is important to understand the notion of local and global variables. A local variable is a variable that is local to a function and cannot be accessed outside of it. A global variable, on the other hand, can be accessed or changed anywhere in the script. There can be potentially damaging side effects of global variables if a function changes a variable that is used elsewhere in the script. Therefore, it is usually a good idea to eliminate global variables in a function.

When we call the insert() function, and specify $1 as the first argument, then a copy of that variable is passed to the function, where it is manipulated as a local variable named STRING. All the variables in the function definition's parameter list are local variables and their values are not accessible outside the function. Similarly, the arguments in the function call are not changed by the function itself. When the insert() function returns, the value of $1 is not changed.

However, the variables defined in the body of the function are global variables, by default. Given the above definition of the insert() function, the temporary variables before_tmp and after_tmp are visible outside the function. Awk provides what its developers call an "inelegant" means of declaring variables local to a function, and that is by specifying those variables in the parameter list.

The local temporary variables are put at the end of the parameter list. This is essential; parameters in the parameter list receive their values, in order, from the values passed in the function call. Any extra parameters, like normal awk variables, are initialized to the empty string. By convention, the local variables are separated from the "real" parameters by several spaces. For instance, the following example shows how to define the insert() function with two local variables.

    function insert(STRING, POS, INS,   before_tmp, after_tmp) {
    		body
    }

    function insert(STRING, POS, INS,   before_tmp) {
    	before_tmp = substr(STRING, 1, POS)
    	after_tmp = substr(STRING, POS + 1)
    	return before_tmp INS after_tmp
    }

    # main routine
    {
    print "Function returns", insert($1, 4, "XX")
    print "The value of $1 after is:", $1
    print "The value of STRING is:", STRING
    print "The value of before_tmp:", before_tmp
    print "The value of after_tmp:", after_tmp
    }

Notice that we specify before_tmp in the parameter list. In the main routine, we call the insert() function and print its result. Then we print different variables to see what their value is, if any. Now let's run the above script and look at the output:

    $ echo "Hello" | awk -f insert.awk -
    Function returns HellXXo
    The value of $1 after is: Hello
    The value of STRING is:
    The value of before_tmp:
    The value of after_tmp: o

The insert() function returns "HellXXo," as expected. The value of $1 is the same after the function was called as it was before. The variable STRING is local to the function and it does not have a value when called from the main routine. The same is true for before_tmp because its name was placed in the parameter list for the function definition. The variable after_tmp which was not specified in the parameter list does have a value, the letter "o."

As this example shows, $1 is passed "by value" into the function. This means that a copy is made of the value when the function is called and the function manipulates the copy, not the original. Arrays, however, are passed "by reference." That is, the function does not work with a copy of the array but is passed the array itself. Thus, any changes that the function makes to the array are visible outside of the function. (This distinction between "scalar" variables and arrays also holds true for functions written in the C language.) The next section presents an example of a function that operates on an array.
```

### 5.17.1 Writing a Sort Function

```text
Earlier in this chapter we presented the lotto script for picking x random numbers out of a series of y numbers. That script did not sort the list of numbers that were selected. In this section, we develop a sort function for elements of an array.

We define a function that takes two arguments, the name of the array and the number of elements in the array. This function can be called this way:

    sort(sortedpick, NUM)

The function definition lists the two arguments and three local variables used in the function.

    # sort numbers in ascending order
    function sort(ARRAY, ELEMENTS,   temp, i, j) {
            for (i = 2; i <= ELEMENTS; ++i) {
                    for (j = i; (j-1) in ARRAY && ARRAY[j-1] > ARRAY[j]; --j) {
                            temp = ARRAY[j]
                            ARRAY[j] = ARRAY[j-1]
                            ARRAY[j-1] = temp
                    }
            }
            return
    }

The body of the function implements an insertion sort. This sorting algorithm is very simple. We loop through each element of the array and compare it to the value preceding it. If the first element is greater than the second, the first and second elements are swapped.[62] To actually swap the values, we use a temporary variable to hold a copy of the value while we overwrite the original. The loop continues swapping adjacent elements until all are in order. At the end of the function, we use the return statement to simply return control.[63] The function does not need to pass the array back to the main routine because the array itself is changed and it can be accessed directly.

	Here's proof positive:

    $ lotto 7 35
    Pick 7 of 35
    6 7 17 19 24 29 35

In fact, many of the scripts that we developed in this chapter could be turned into functions. For instance, if we only had the original, 1987, version of nawk, we might want to write our own tolower() and toupper() functions.

The value of writing the sort() function in a general fashion is that you can easily reuse it. To demonstrate this, we'll take the above sort function and use it to sort student grades. In the following script, we read all of the student grades into an array and then call sort() to put the grades in ascending order.

    # grade.sort.awk -- script for sorting student grades
    # input: student name followed by a series of grades

    # sort function -- sort numbers in ascending order
    function sort(ARRAY, ELEMENTS, 	temp, i, j) {
    	for (i = 2; i <= ELEMENTS; ++i) 
    		for (j = i; ARRAY[j-1] > ARRAY[j]; --j) { 
    			temp = ARRAY[j]
    			ARRAY[j] = ARRAY[j-1]
    			ARRAY[j-1] = temp
    	}
    	return 
    }

    # main routine
    { 
    # loop through fields 2 through NF and assign values to
    # array named grades
    for (i = 2; i <= NF; ++i)
    	grades[i-1] = $i 

    # call sort function to sort elements

    sort(grades, NF-1)

    # print student name
    printf("%s: ", $1)

    # output loop
    for (j = 1; j <= NF-1; ++j)
    	printf("%d ", grades[j])
    printf("\n")
    }

Note that the sort routine is identical to the previous version. In this example, once we've sorted the grades we simply output them:

    $ awk -f grade.sort.awk grades.test
    mona: 70 70 77 83 85 89
    john: 78 85 88 91 92 94
    andrea: 85 89 90 90 94 95
    jasper: 80 82 84 84 88 92
    dunce: 60 60 61 62 64 80
    ellis: 89 90 92 96 96 98

However, you could, for instance, delete the first element of the sort array if you wanted to average the student grades after dropping the lowest grade.

As another exercise, you could write a version of the sort function that takes a third argument indicating an ascending or descending sort.
```

### 5.17.2 Maintaining a Function Library

```text
		You might want to put a useful function in its own file and store it in a central directory. Awk permits multiple uses of the -f option to specify more than one program file.[64] For instance, we could have written the previous example such that the sort function was placed in a separate file from the main program grade.awk. The following command specifies both program files:

		    $ awk -f grade.awk -f /usr/local/share/awk/sort.awk grades.test

This command assumes that grade.awk is in the working directory and that the sort function is defined in sort.awk in the directory /usr/local/share/awk.
```

### 5.17.3 Another Sorted Example

```text
Lenny, our production editor, is back with another request.

    Dale:

    The last section of each Xlib manpage is called "Related Commands"
    (that is the argument of a .SH) and it's followed by a list of commands
    (often 10 or 20) that are now in random order.  It'd be more
    useful and professional if they were alphabetized.  Currently, commands
    are separated by a comma after each one except the last, which has a
    period.

    The question is: could awk alphabetize these lists?  We're talking
    about a couple of hundred manpages.  Again, don't bother if this is a
    bigger job than it seems to someone who doesn't know what's involved.

    Best to you and yours, 

    Lenny

To see what he is talking about, a simplified version of an Xlib manpage is shown below:

    .SH "Name"
    XSubImage -- create a subimage from part of an image.
    .
    .
    .
    .SH "Related Commands"
    XDestroyImage, XPutImage, XGetImage, 
    XCreateImage, XGetSubImage, XAddPixel, 
    XPutPixel, XGetPixel, ImageByteOrder.

You can see that the names of related commands appear on several lines following the heading. You can also see that they are in no particular order.

To sort the list of related commands is actually fairly simple, given that we've already covered sorting. The structure of the program is somewhat interesting, as we must read several lines after matching the "Related Commands" heading.

Looking at the input, it is obvious that the list of related commands is the last section in the file. All other lines except these we want to print as is. The key is to match all lines from the heading "Related Commands" to the end of the file. Our script can consist of four rules, that match:

   a.

      The "Related Commands" heading
   b.

      The lines following that heading
   c.

      All other lines
   d.

      After all lines have been read (END)

Most of the "action" takes place in the END procedure. That's where we sort and output the list of commands. Here's the script:

    # sorter.awk -- sort list of related commands
    # requires sort.awk as function in separate file
    BEGIN { relcmds = 0 } 

    #1 Match related commands; enable flag x 
    /\.SH "Related Commands"/ {
    	print
    	relcmds = 1
    	next
    }

    #2 Apply to lines following "Related Commands" 
    (relcmds == 1) {
    	commandList = commandList $0
    }


    #3 Print all other lines, as is.
    (relcmds == 0) { print }

    #4 now sort and output list of commands 
    END {
    # remove leading spaces and final period.
    	gsub(/, */, ",", commandList)
    	gsub(/\. *$/, "", commandList)
    # split list into array
    	sizeOfArray = split(commandList, comArray, ",")
    # sort
    	sort(comArray, sizeOfArray)
    # output elements
    	for (i = 1; i < sizeOfArray; i++)
    		printf("%s,\n", comArray[i])  
    	printf("%s.\n", comArray[i])
    }

Once the "Related Commands" heading is matched, we print that line and then set a flag, the variable relcmds, which indicates that subsequent input lines are to be collected.[65] The second procedure actually collects each line into the variable commandList. The third procedure is executed for all other lines, simply printing them.

    [65]The getline function introduced in the next chapter provides a simpler way to control reading input lines.

When all lines of input have been read, the END procedure is executed, and we know that our list of commands is complete. Before splitting up the commands into fields, we remove any number of spaces following a comma. Next we remove the final period and any trailing spaces. Finally, we create the array comArray using the split() function. We pass this array as an argument to the sort() function, and then we print the sorted values.

This program generates the following output:

    $ awk -f sorter.awk test
    .SH "Name"
    XSubImage -- create a subimage from part of an image.
    .SH "Related Commands"
    ImageByteOrder,
    XAddPixel,
    XCreateImage,
    XDestroyImage,
    XGetImage,
    XGetPixel,
    XGetSubImage,
    XPutImage,
    XPutPixel.

Once again, the virtue of calling a function to do the sort versus writing or copying the code to do the same task is that the function is a module that's been tested previously and has a standard interface. That is, you know that it works and you know how it works. When you come upon the same sort code in the awk version, which uses different variable names, you have to scan it to verify that it works the same way as other versions. Even if you were to copy the lines into another program, you would have to make changes to accommodate the new circumstances. With a function, all you need to know is what kind of arguments it expects and their calling sequence. Using a function reduces the chance for error by reducing the complexity of the problem that you are solving.

Because this script presumes that the sort() function exists in a separate file, it must be invoked using the multiple -f options:

    $ awk -f sort.awk -f sorter.awk test

where the sort() function is defined in the file sort.awk.
```
