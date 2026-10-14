---
type: reference
title: The Bottom Drawer
description: "Awk advanced features: the getline function and next, with examples."
tags: [awk, tutorial, legacy, reference, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.18"
---

# 5.18 The Bottom Drawer

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.18.1 The getline function

```text
		is similar to awk's next statement. While both cause the next input line to be read, the next statement passes control back to the top of the script. The getline function gets the next line without changing control in the script. Possible return values are:
1 	

If it was able to read a line.
0 	

If it encounters the end-of-file.
-1 	

If it encounters an error.

    NOTE: Although getline is called a function and it does return a value, its syntax resembles a statement. Do not write getline(); its syntax does not permit parentheses.

In the previous chapter, we used a manual page source file as an example. The -man macros typically place the text argument on the next line. Although the macro is the pattern that you use to find the line, it is actually the next line that you process. For instance, to extract the name of the command from the manpage, the following example matches the heading "Name," reads the next line, and prints the first field of it:

    # getline.awk -- test getline function
    /^\.SH "?Name"?/ { 
    	getline # get next line
    	print $1 # print $1 of new line.
    }

The pattern matches any line with ".SH" followed by "Name," which might be enclosed in quotes. Once this line is matched, we use getline to read the next input line. When the new line is read, getline assigns it $0 and parses it into fields. The system variables NF, NR, and FNR are also set. Thus, the new line becomes the current line, and we are able to refer to "$1" and retrieve the first field. Note that the previous line is no longer available as $0. However, if necessary, you can assign the line read by getline to a variable and avoid changing $0, as we'll see shortly.

Here's an example that shows how the previous script works, printing out the first field of the line following ".SH Name."

    $ awk -f getline.awk test
    XSubImage

The sorter.awk program that we demonstrated at the end of Chapter 9, "Functions", could have used getline to read all the lines after the heading "Related Commands." We can test the return value of getline in a while loop to read a number of lines from the input. The following procedure replaces the first two procedures in the sorter program:

    # Match "Related Commands" and collect them
    /^\.SH "?Related Commands"?/ {
    	print
    	while (getline > 0)
    		commandList = commandList $0
    }

The expression "getline > 0" will be true as long as getline successfully reads an input line. When it gets to the end-of-file, getline returns 0 and the loop is exited
```

#### 5.18.1.1 Assigning the Input to a Variable

```text
The getline function allows you to assign the input record to a variable. The name of the variable is supplied as an argument. Thus, the following statement reads the next line of input into the variable input:

    getline input

Assigning the input to a variable does not affect the current input line; that is, $0 is not affected. The new input line is not split into fields, and thus the variable NF is also unaffected. It does increment the record counters, NR and FNR.

The previous example demonstrated how to prompt the user. That example could be written as follows, assigning the user's response to the variable name.

    BEGIN { printf "Enter your name: "
    	getline name < "-"
    	print name
    }

Study the syntax for assigning the input data to a variable because it is a common mistake to instead write:

    name = getline     # wrong

which assigns the return value of getline to the variable name.
```

#### 5.18.1.2 Reading Input from a Pipe

```text
You can execute a command and pipe the output into getline. For example, look at the following expression:
    "who am i" | getline

That expression sets "$0" to the output of the who am i command.
    dale       ttyC3        Jul 18 13:37

The line is parsed into fields and the system variable NF is set. Similarly, you can assign the result to a variable:
    "who am i" | getline me

By assigning the output to a variable, you avoid setting $0 and NF, but the line is not split into fields.

The following script is a fairly simple example of piping the output of a command to getline. It uses the output from the who am i command to get the user's name. It then looks up the name in /etc/passwd, printing out the fifth field of that file, the user's full name:
    awk '# getname - print users fullname from /etc/passwd
    BEGIN { "who am i" | getline 
    	name = $1
    	FS = ":"
    }
    name ~ $1 { print $5 }
    ' /etc/passwd

The command is executed from the BEGIN procedure, and it provides us with the name of the user that will be used to find the user's entry in /etc/passwd. As explained above, who am i outputs a single line, which getline assigns to $0. $1, the first field of that output, is then assigned to name.

The field separator is set to a colon (:) to allow us to access individual fields in entries in the /etc/passwd file. Notice that FS is set after getline or else the parsing of the command's output would be affected.

Finally, the main procedure is designed to test that the first field matches name. If it does, the fifth field of the entry is printed. For instance, when Dale runs this script, it prints "Dale Dougherty."

When the output of a command is piped to getline and it contains multiple lines, getline reads a line at a time. The first time getline is called it reads the first line of output. If you call it again, it reads the second line. To read all the lines of output, you must set up a loop that executes getline until there is no more output. For instance, the following example uses a while loop to read each line of output and assign it to the next element of the array, who_out:

    while ("who" | getline)
    	who_out[++i] = $0

Each time the getline function is called, it reads the next line of output. The who command, however, is executed only once.

The next example looks for "@date" in a document and replaces it with today's date:
    # subdate.awk -- replace @date with todays date
    /@date/ {
    	"date +'%a., %h %d, %Y'" | getline today
    	gsub(/@date/, today)
    }
    { print }

The date command, using its formatting options,[67] provides the date and getline assigns it to the variable today. The gsub() function replaces each instance of "@date" with today's date.

This script might be used to insert the date in a form letter:

    To: Peabody
    From: Sherman 
    Date: @date

    I am writing you on @date to 
    remind you about our special offer.

All lines of the input file would be passed through as is, except the lines containing "@date", which are replaced with today's date:

    $ awk -f subdate.awk subdate.test
    To: Peabody
    From: Sherman
    Date: Sun., May 05, 1996

    I am writing you on Sun., May 05, 1996 to
    remind you about our special offer.
```

### 5.18.2 The close() Function

```text
The close function allows you to close open files and pipes. There are a number of reasons you should use it.

    * You can only have so many pipes open at a time. (See Section 10.8 below, which describes how such limitations can differ from system to system.) In order to open as many pipes in a program as you wish, you must use the close function to close a pipe when you are done with it (ordinarily, when getline returns 0 or -1). It takes a single argument, the same expression used to create the pipe. Here's an example:

          close("who")

    * Closing a pipe allows you to run the same command twice. For example, you can use date twice to time a command.
    * Using close may be necessary in order to get an output pipe to finish its work. For example:

          { some processing of $0 | "sort > tmpfile" }
          END {
          	close("sort > tmpfile")
          	while ((getline < "tmpfile") > 0) {
          		do more work
          	}
          }

    * Closing open files is necessary to keep you from exceeding your system's limit on simultaneously open files.
```

### 5.18.3 The system() Function

```text
The system() function executes a command supplied as an expression.[68] It does not, however, make the output of the command available within the program for processing. It returns the exit status of the command that was executed. The script waits for the command to finish before continuing execution. The following example executes the mkdir command:

    [68]The system() function is modeled after the standard C library function of the same name.

    BEGIN { if (system("mkdir dale") != 0) 
    		print "Command Failed" }

The system() function is called from an if statement that tests for a non-zero exit status. Running the program twice produces one success and one failure:

    $ awk -f system.awk
    $ ls dale
    $ awk -f system.awk
    mkdir: dale: File exists
    Command Failed

The first run creates the new directory and system() returns an exit status of 0 (success). The second time the command is executed, the directory already exists, so mkdir fails and produces an error message. The "Command Failed" message is produced by awk.

The Berkeley UNIX command set has a small but useful command for troff users named soelim, named because it "eliminates" ".so" lines from a troff input file. (.so is a request to include or "source" the contents of the named file.) If you have an older System V system that does not have soelim, you can use the following awk script to create it:

    /^\.so/ { gsub(/"/, "", $2)
    		system("cat " $2)
    		next
    		}
    { print }

This script looks for ".so" at the beginning of a line, removes any quotation marks, and then uses system() to execute the cat command and output the contents of the file. This output merges with the rest of the lines in the file, which are simply printed to standard output, as in the following example.

    $ cat soelim.test
    This is a test
    .so test1
    This is a test
    .so test2
    This is a test.
    $ awk -f soelim.awk soelim.test
    This is a test
    first:second
    one:two
    This is a test
    three:four
    five:six
    This is a test.

We don't explicitly test the exit status of the command. Thus, if the file does not exist, the error messages merge with the output:

    $ awk -f soelim.awk soelim.test
    This is a test
    first:second
    one:two
    This is a test
    cat: cannot open test2
    This is a test.

We might want to test the return value of the system() function and generate an error message for the user. This program is also very simplistic: it does not handle instances of ".so" nested in the included file. Think about how you might implement a version of this program that did handle nested ".so" requests.

This example is a function prompting you to enter a filename. It uses the system() function to execute the test command to verify the file exists and is readable:

    # getFilename function -- prompts user for filename,
    #   verifies that file exists and returns absolute pathname. 
    function getFilename(	file) { 
        while (! file) {
    	printf "Enter a filename: "
    	getline < "-" # get response
    	file = $0
    	# check that file exists and is readable
    	# test returns 1 if file does not exist.
    	if (system("test -r " file)) {
    		print file " not found"
    		file = ""
    	}
        }
        if (file !~ /^\//) {
    	"pwd" | getline # get current directory 
     	close("pwd")
    	file = $0 "/" file
        }
        return file
    }

This function returns the absolute pathname of the file specified by the user. It places the prompting and verification sequence inside a while loop in order to allow the user to make a different entry if the previous one is invalid.

The test -r command returns 0 if the file exists and is readable, and 1 if not. Once it is determined that the filename is valid, then we test the filename to see if it begins with a "/", which would indicate that the user supplied an absolute pathname. If that test fails, we use the getline function to get the output of the pwd command and prepend it to the filename. (Admittedly, the script makes no attempt to deal with "./" or "../" entries, although tests can be easily devised to match them.) Note the two uses of the getline function: the first gets the user's response and the second executes the pwd command.
```

### 5.18.4 A Menu-Based Command Generator

```text
In this section, we look at a general use of the system() and getline functions to implement a menu-based command generator. The object of this program is to give unsophisticated users a simple way to execute long or complex UNIX commands. A menu is used to prompt the user with a description of the task to be performed, allowing the user to choose by number any selection of the menu to execute.

This program is designed as a kind of interpreter that reads from a file the descriptions that appear in the menu and the actual command lines that are executed. That way, multiple menu-command files can be used, and they can be easily modified by awk-less users without changing the program.

The format of a menu-command file contains the menu title as the first line in the file. Subsequent lines contain two fields: the first is the description of the action to be performed and the second is the command line that performs it. An example is shown below:

    $ cat uucp_commands
    UUCP Status Menu
    Look at files in PUBDIR:find /var/spool/uucppublic -print
    Look at recent status in LOGFILE:tail /var/spool/uucp/LOGFILE
    Look for lock files:ls /var/spool/uucp/*.LCK

The first step in implementing the menu-based command generator is to read the menu-command file. We read the first line of this file and assign it to a variable named title. The rest of the lines contain two fields and are read into two arrays, one for the menu items and one for the commands to be executed. A while loop is used, along with getline, to read one line at a time from the file.

    BEGIN { FS = ":"
    if ((getline < CMDFILE) > 0)
    	title = $1
    else
    	exit 1
    while ((getline < CMDFILE) > 0) {
    	# load array
    	++sizeOfArray
    	# array of menu items
    	menu[sizeOfArray] = $1
    	# array of commands associated with items
    	command[sizeOfArray] = $2
    	} 
    ...
    }

Look carefully at the syntax of the expression tested by the if statement and the while loop.

    (getline < CMDFILE) > 0

The variable CMDFILE is the name of the menu-command file, which is passed as a command-line parameter. The two angle-bracket symbols have completely different functions. The "<" symbol is interpreted by getline as the input redirection operator. Then the value returned by getline is tested to see if it is greater than (">") 0. It is parenthesized on purpose, in order to make this clear. In other words, "getline < CMDFILE" is evaluated first and then its return value is compared to 0.

This procedure is placed in the BEGIN pattern. However, there is one catch. Because we intended to pass the name of the menu file as a command-line parameter, the variable CMDFILE would not normally be defined and available in the BEGIN pattern. In other words, the following command will not work:

    awk script CMDFILE="uucp_commands"  -

because CMDFILE variable won't be defined until the first line of input is read.

Fortunately, awk provides the -v option to handle just such a case. Using the -v option makes sure that the variable is set immediately and thus available in the BEGIN pattern.

    awk -v CMDFILE="uucp_commands"  script -

If your version of awk doesn't have the -v option, you can pass the value of CMDFILE as a shell variable. Create a shell script to execute awk and in it define CMDFILE. Then change the line that reads CMDFILE in the invoke script (see below) as follows:

    while ((getline < '"$CMDFILE"') > 0 ) {

Once the menu-command file is loaded, the program must display the menu and prompt the user. This is implemented as a function because we need to call it in two places: from the BEGIN pattern to prompt the user initially, and after we have processed the user's response so that another choice can be made. Here's the display_menu() function:

    function display_menu() {
    	# clear screen -- comment out if clear does not work
    	system("clear")
    	# print title, list of items, exit item, and prompt
    	print "\t" title
    	for (i = 1; i <= sizeOfArray; ++i)
    		printf "\t%d. %s\n", i, menu[i]
    	printf "\t%d. Exit\n", i
    	printf("Choose one: ")
    }

The first thing we do is use the system() function to call a command to clear the screen. (On my system, clear does this; on others it may be cls or some other command. Comment out the line if you cannot find such a command.) Then we print the title and each of the items in a numbered list. The last item is always "Exit." Finally, we prompt the user for a choice.

The program will take standard input so that the user's answer to the prompt will be the first line of input. Our reading of the menu-command file was done within the program and not as part of the input stream. Thus, the main procedure of the program is to respond to the user's choice and execute a command. Here's that part of the program:

    # Applies the user response to prompt
    {
       # test value of user response
       if ($1 > 0 && $1 <= sizeOfArray) {
    	# print command that is executed
    	printf("Executing ... %s\n", command[$1]) 
    	# then execute it. 
    	system(command[$1])
    	printf("<Press RETURN to continue>")
     	# wait for input before displaying menu again
    	getline
       }
       else 
    	exit	
       # re-display menu 
       display_menu()
    }

First, we test the range of the user's response. If the response falls outside the range, we simply exit the program. If it is a valid response, then we retrieve the command from the array command, display it, and then execute it using the system() function. The user sees the result of the command on the screen followed by the message "<Press RETURN to continue>." The purpose of this message is to wait for the user to finish before clearing the screen and redisplaying the menu. The getline function causes the program to wait for a response. Note that we don't do anything with the response. The display_menu() function is called at the end of this procedure to redisplay the menu and prompt for another line of input.

Here's the invoke program in full:

    awk -v CMDFILE="uucp_commands"  '# invoke -- menu-based
                                      # command generator
    # first line in CMDFILE is the title of the menu
    # subsequent lines contain: $1 - Description;
    # $2 Command to execute
    BEGIN { FS = ":" 
    # process CMDFILE, reading items into menu array 
      if ((getline < CMDFILE) > 0)
    	title = $1
      else
    	exit 1
      while ((getline < CMDFILE) > 0) {
    	# load array
    	++sizeOfArray
    	# array of menu items
    	menu[sizeOfArray] = $1
    	# array of commands associated with items
    	command[sizeOfArray] = $2
      } 
      # call function to display menu items and prompt
      display_menu()
    }
    # Applies the user response to prompt
    {
       # test value of user response
       if ($1 > 0 && $1 <= sizeOfArray) {
    	# print command that is executed
    	printf("Executing ... %s\n", command[$1]) 
    	# then execute it. 
    	system(command[$1])
    	printf("<Press RETURN to continue>")
     	# wait for input before displaying menu again
    	getline
       }
       else 
    	exit	
       # re-display menu 
       display_menu()
    }

    function display_menu() {
    	# clear screen -- if clear does not work, try "cls"
    	system("clear")
    	# print title, list of items, exit item, and prompt
    	print "\t" title
    	for (i = 1; i <= sizeOfArray; ++i)
    		printf "\t%d. %s\n", i, menu[i]
    	printf "\t%d. Exit\n", i
    	printf("Choose one: ")
    }' -

When a user runs the program, the following output is displayed:

    UUCP Status Menu
            a. Look at files in PUBDIR
            b. Look at recent status in LOGFILE
            c. Look for lock files
            d. Exit
    Choose one:

The user is prompted to enter the number of a menu selection. Anything other than a number between 1 and 3 exits the menu. For instance, if the user enters "1" to see a list of files in uucp's public directory, then the following result is displayed on the screen:

    Executing ...find /var/spool/uucppublic -print
    /var/spool/uucppublic
    /var/spool/uucppublic/dale
    /var/spool/uucppublic/HyperBugs
    <Press RETURN to continue>

When the user presses the RETURN key, the menu is redisplayed on the screen. The user can quit from the program by choosing "4".

This program is really a shell for executing commands. Any sequence of commands (even other awk programs) can be executed by modifying the menu-command file. In other words, the part of the program that might change the most is extracted from the program itself and maintained in a separate file. This allows the menu list to be changed and extended very easily by a nontechnical user.
```

### 5.18.5 Directing Output to Files and Pipes

```text
The output of any print or printf statement can be directed to a file, using the output redirection operators ">" or ">>". For example, the following statement writes the current record to the file data.out:

    print > "data.out"

The filename can be any expression that evaluates to a valid filename. A file is opened by the first use of the redirection operator, and subsequent uses append data to the file. The difference between ">" and ">>" is the same as between the shell redirection operators. A right-angle bracket (">") truncates the file when opening it while ">>" preserves whatever the file contains and appends data to it.

Because the redirection operator ">" is the same as the relational operator, there is the potential for confusion when you specify an expression as an argument to the print command. The rule is that ">" will be interpreted as a redirection operator when it appears in an argument list for any of the print statements. To use ">" as a relational operator in an expression that appears in the argument list, put either the expression or the argument list in parentheses. For example, the following example uses parentheses around the conditional expression to make sure that the relational expression is evaluated properly:

    print "a =", a, "b =", b, "max =", (a > b ? a : b) > "data.out"

The conditional expression evaluates whether a is greater than b; if it is, then the value of a is printed as the maximum value; otherwise, b's value is used.
```

#### 5.18.5.1 Directing Output to a Pipe

```text
You can also direct output to a pipe. The command

    print | command

opens a pipe the first time it is executed and sends the current record as input to that command. In other words, the command is only invoked once, but each execution of the print command supplies another line of input.

The following script strips troff macros and requests from the current input line and then sends the line as input to wc to determine how many words are in the file:

    {# words.awk - strip macros then get word count
    sub(/^\.../,"")
    print | "wc -w" 
    }

By removing formatting codes, we get a truer word count.

In most cases, we prefer to use a shell script to pipe the output of the awk command to another command rather than do it inside the awk script. For instance, we'd write the previous example as a shell script invoking awk and piping its output to wc:

    awk '{ # words -- strip macros 
    sub(/^\.../,"")
    print 
    }' $* | 
    # get word count
    wc -w

This method seems simpler and easier to understand. Nonetheless, the other method has the advantage of accomplishing the same thing without creating a shell script.

Remember that you can only have so many pipes open at a time. Use the close() function to close the pipe when you are done with it.
```

#### 5.18.5.2 Working with Multiple Files

```text
A file is opened whenever you read from or write to a file. Every operating system has some limit on the number of files a running program may have open. Furthermore, each implementation of awk may have an internal limit on the number of open files; this number could be smaller than the system's limit.[69] So that you don't run out of open files, awk provides a close() function that allows you to close an open file. Closing files that you have finished processing allows your program to open more files later on.

    [69] Gawk will attempt to appear to have more files open than the system limit by closing and reopening files as needed. Even though gawk is "smart," it is still more efficient to close your files when you're done with them.

A common use for directing output to files is to split up a large file into a number of smaller files. Although UNIX provides utilities, split and csplit, that do a similar job, they do not have the ability to give the new file a useful filename.

Similarly, sed can be used to write to a file, but you must specify a fixed filename. With awk, you can use a variable to specify the filename and pick up the value from a pattern in the file. For instance, if $1 provided a string that could be used as a filename, you could write a script to output each record to its own file:

    print $0 > $1

You should perhaps test the filename, either to determine its length or to look for characters that cannot be used in a filename.

If you don't close your files, such a program would eventually run out of available open files, and have to give up. The example we are going to look at works because it uses the close() function so that you will not run into any open-file limitations.

The following script was used to split up a large file containing dozens of manpages. Each manual page began by setting a number register and ended with a blank line:

    .nr X 0

(Although they used the -man macros for the most part, the beginning of a manpage was strangely coded, making things a little harder.) The line that provides the filename looks like this:

    .if \nX=0 .ds x}  XDrawLine "" "Xlib - Drawing Primitives"

The fifth field on this line, "XDrawLine," contains the filename. Perhaps the only difficulty in writing the script is that the first line is not the one that provides the filename. Therefore, we collect the lines in an array until we get a filename. Once we get the filename, we output the array, and from that point on we simply write each input line to the new file. Here's the man.split script:

    # man.split -- split up a file containing X manpages. 
    BEGIN { file = 0; i = 0; filename = "" }

    # First line of new manpage is ".nr X 0"
    # Last line is blank
    /^\.nr X 0/,/^$/ {
    	# this conditional collects lines until we get a filename.
    	if (file == 0)
    		line[++i] = $0
    	else
    		print $0 > filename

    	# this matches the line that gives us the filename
    	if ($4 == "x}") {
    		# now we have a filename
    		filename = $5 
    		file = 1
    		# output name to screen 
    		print filename 
    		# print any lines collected
    		for (x = 1; x <= i; ++x){
    			print line[x] > filename
    		}
    		i = 0
    	}

    	# close up and clean up for next one
    	if ($0 ~ /^$/) {
    		close(filename)
    		filename = ""
    		file = 0
    		i = 0
    	}
    }

As you can see, we use the variable file as a flag to convey whether or not we have a valid filename and can write to the file. Initially, file is 0, and the current input line is stored in an array. The variable i is a counter used to index the array. When we encounter the line that sets the filename, then we set file to 1. The name of the new file is printed to the screen so that the user can get some feedback on the progress of the script. Then we loop through the array and output it to the new file. When the next input line is read, file will be set to 1 and the print statement will output it to the named file.
```

### 5.18.6 Generating Columnar Reports

```text
This section describes a small-scale business application that produces reports with dollar amounts. While this application doesn't introduce any new material, it does emphasize the data processing and reporting capabilities of awk. (Surprisingly, some people do use awk to write small business applications.)

It is presumed that a script exists for data entry. The data-entry script has two jobs: the first is to enter the customer's name and mailing address for later use in building a mailing list; the second is to record the customer's order of any of seven items, the number of items ordered, and the price per item. The data collected for the mailing list and the customer order were written to separate files.

Here are two sample customer records from the customer order file:

    Charlotte Webb 
    P.O  N61331 97 Y 045 	Date: 03/14/97
    #1 3  7.50
    #2 3  7.50
    #3 1  7.50
    #4 1  7.50
    #7 1  7.50 

    Martin S. Rossi 
    P.O  NONE 	Date: 03/14/97
    #1 2  7.50
    #2 5  6.75

Each order covers multiple lines, and a blank line separates one order from another. The first two lines supply the customer's name, purchase order number and the date of the order. Each subsequent line identifies an item by number, the number ordered, and the price of the item.

Let's write a simple program that multiplies the number of items by the price. The script can ignore the first two lines of each record. We only want to read the lines where an item is specified, as in the following example.

    awk '/^#/ {
    		amount = $2 * $3
    		printf "%s %6.2f\n", $0, amount
    		next
    	 }
    { print }' $*

The main procedure only affects lines that match the pattern. It multiplies the second field by the third field, assigning the value to the variable amount. The printf conversion %f is used to print a floating-point number; "6.2" specifies a minimum field width of six and a precision of two. Precision is the number of digits to the right of the decimal point; the default for %f is six. We print the current record along with the value of the variable amount. If a line is printed within this procedure, the next line is read from standard input. Lines not matching the pattern are simply passed through. Let's look at how addem works:

    $ addem orders
    Charlotte Webb 
    P.O  N61331 97 Y 045 	Date: 03/14/97
    #1 3  7.50  22.50
    #2 3  7.50  22.50
    #3 1  7.50   7.50
    #4 1  7.50   7.50
    #7 1  7.50   7.50

    Martin S. Rossi 
    P.O  NONE 	Date: 03/14/97
    #1 2  7.50  15.00
    #2 5  6.75  33.75

This program did not need to access the customer record as a whole; it simply acted on the individual item lines. Now, let's design a program that reads multiline records and accumulates order information for display in a report. This report should display for each item the total number of copies and the total amount. We also want totals reflecting all copies ordered and the sum of all orders.

Our new script will begin by setting the field and record separators:

    BEGIN { FS = "\n"; RS = "" }

Each record has a variable number of fields, depending upon how many items have been ordered. First, we check that the input record has at least three fields. Then a for loop is built to read all of the fields beginning with the third field.

    NF >= 3 {
    for (i = 3; i <= NF; ++i) {

In database terms, each field has a value and each value can be further broken up as subvalues. That is, if the value of a field in a multiline record is a single line, subvalues are the words that are on that line. We can use the split() function to divide a field into subvalues.

The following part of the script splits each field into subvalues. $i will supply the value of the current field that will be divided into elements of the array order:

    sv = split($i, order, " ")
    if (sv == 3) {
           procedure
    } else
           print "Incomplete Record"
    } # end for loop

The number of elements returned by the function is saved in a variable sv. This allows us to test that there are three subvalues. If there are not, the else statement is executed, printing the error message to the screen.

Next we assign each individual element of the array to a specific variable. This is mainly to make it easier to remember what each element represents:

    title = order[1] 
    copies = order[2] 
    price = order[3]

Then we perform a group of arithmetic operations on these values:

    amount = copies * price  
    total_vol += copies
    total_amt += amount
    vol[title] += copies
    amt[title] += amount

We accumulate these values until the last input record is read. The END procedure prints the report.

Here's the complete program:

    $ cat addemup
    #! /bin/sh
    # addemup -- total customer orders 
    awk 'BEGIN { FS = "\n"; RS = "" }
    NF >= 3 {
    	for (i = 3; i <= NF; ++i) { 	
    		sv = split($i, order, " ")
    		if (sv == 3) {
    			title = order[1] 
    			copies = order[2] 
    			price = order[3]
    			amount = copies * price  
    			total_vol += copies
    			total_amt += amount
    			vol[title] += copies
    			amt[title] += amount
    		} else
    			print "Incomplete Record"
    	}
    }

    END { 
       printf "%5s\t%10s\t%6s\n\n", "TITLE", "COPIES SOLD", "TOTAL"
       for (title in vol)
           printf "%5s\t%10d\t$%7.2f\n", title, vol[title], amt[title] 
       printf "%s\n", "-------------"
       printf "\t%s%4d\t$%7.2f\n", "Total ", total_vol, total_amt
    }' $*

We have defined two arrays that have the same subscript. We only need to have one for loop to read both arrays.

addemup, an order report generator, produces the following output:

    $ addemup orders
    TITLE     COPIES SOLD      TOTAL

       #1              5     $  37.50
       #2              8     $  56.25
       #3              1     $   7.50
       #4              1     $   7.50
       #7              1     $   7.50
    -------------
         Total        16     $ 116.25
```

### 5.18.7 Debugging

```text
No aspect of programming is more frustrating or more essential than debugging. In this section, we'll look at ways to debug awk scripts and offer advice on how to correct an awk program that fails to do what it is supposed to do.

Modern versions of awk do a pretty good job of reporting syntax errors. But even with good error detection, it is often difficult to isolate the problem. The techniques for discovering the source of the problem are a modest few and are fairly obvious. Unfortunately, most awk implementations come with no debugging tools or extensions.

There are two classes of problems with a program. The first is really a bug in the program's logic. The program runs--that is, it finishes without reporting any error messages, but it does not produce the result you wanted. For instance, perhaps it does not create any output. This bug could be caused by failing to use a print statement to output the result of a calculation. Program errors are mental errors, if you will.

The second class of error is one in which the program fails to execute or complete execution. This could result from a syntax error and cause awk to spit code at you that it is unable to interpret. Many syntax errors are the result of a typo or a missing brace or parenthesis. Syntax errors usually generate error messages that help direct you to the problem. Sometimes, however, a program may cause awk to fail (or "core dump") without producing any reasonable error message.[70] This may also be caused by a syntax error, but there could be problems specific to the machine. We have had a few larger scripts that dumped core on one machine while they ran without a problem on another. You could, for instance, be running up against limitations set for awk for that particular implementation. See Section 10.8, later in this chapter.

    [70]This indicates that the awk implementation is poor. Core dumps are very rare in modern versions of awk.

You should be clear in your mind which type of program bug you are trying to find: an error in the script's logic or an error in its syntax.
```

#### 5.18.7.1 Make a Copy

```text
Before you begin debugging a program, make a copy of it. This is extremely important. To debug an awk script, you have to change it. These modifications may point you to the error but many changes will have no effect or may introduce new problems. It's good to be able to restore changes that you make. However, it is bothersome to restore each change that you make, so I like to continue making changes until I have found the problem. When I know what it is, I go back to the original and make the change. In effect, that restores all the other inconsequential changes that were made in the copy.

It is also helpful to view the process of creating a program as a series of stages. Look at a core set of features as a single stage. Once you have implemented these features and tested them, make a copy of the program before going to the next stage to develop new features. That way, you can always return to the previous stage if you have problems with the code that you add.

We would recommend that you formalize this process, and go so far as to use a source code management system, such as SCCS (Source Code Control System), RCS (Revision Control System), or CVS (Concurrent Versioning System, which is compatible with RCS). The latter two are freely available from any GNU FTP mirror site.-
```

#### 5.18.7.2 Before and After Photos

```text
What is difficult in debugging awk is that you don't always know what is happening during the course of the program. You can inspect the input and the output, but there is no way to stop the program in mid-course and examine its state. Thus, it is difficult to know which part of the program is causing a problem.

A common problem is determining when or where in the program the assignment of a variable takes place. The first method of attack is to use the print statement to print the value of the variable at various points in the program. For instance, it is common to use a variable as a flag to determine that a certain condition has occurred. At the beginning of the program, the flag might be set to 0. At one or more points in the program, the value of this flag might be set to 1. The problem is to find where the change actually occurs. If you want to check the flag at a particular part of the program, use print statements before and after the assignment. For instance:

    print flag, "before"
    if (! $1) {
    	.
    	.
    	.
    	flag = 1
    }
    print flag, "after"

If you are unsure about the result of a substitution command or any function, print the string before and after the function is called:

    print $2
    sub(/ *\(/, "(", $2)
    print $2

The value of printing the value before the substitution command is to make sure that the command sees the value that you think should be there. A previous command might have changed that variable. The problem may turn out to be that the format of the input record is not as you thought. Checking the input carefully is a very important step in debugging. In particular, use print statements to verify that the sequence of fields is as you expect. When you find that input is causing the problem, you can either fix the input or write new code to accommodate it.
```

#### 5.18.7.3 Finding Out Where the Problem Is

```text
The more modular a script is--that is, the more it can be broken down into separate parts--the easier it is to test and debug the program. One of the advantages of writing functions is that you can isolate what is going on inside the function and test it without affecting other parts of the program. You can omit an entire action and see what happens.

If a program has a number of branching constructs, you might find that an input line falls through one of branches. Test that the input reaches part of a program. For instance, when debugging the masterindex program, described in Chapter 12, "Full-Featured Applications", we wanted to know if an entry containing the word "retrieving" was being handled in a particular part of the program. We inserted the following line in the part of the program where we thought it should be encountered:

    if ($0 ~ /retrieving/) print ">> retrieving" > "/dev/tty"

When the program runs, if it encounters the string "retrieving," it will print the message. (">>" is used as a pair of characters that will instantly call attention to the output; "!!" is also a good one.)

Sometimes you might not be sure which of several print statements are causing a problem. Insert identifiers into the print statement that will alert you to the print statement being executed. In the following example, we simply use the variable name to identify what is printed with a label:

    if (PRIMARY)
    	print (">>PRIMARY:", PRIMARY)
    else
    	if (SECONDARY)
    		print (">>SECONDARY:", SECONDARY)
    	else
    		print (">>TERTIARY:", TERTIARY)

This technique is also useful for investigating whether or not parts of the program are executed at all. Some programs get to be like remodeled homes: a room is added here, a wall is taken down there. Trying to understand the basic structure can be difficult. You might wonder if each of the parts is truly needed or indeed if it is ever executed at all.

If an awk program is part of a pipeline of several programs, even other awk programs, you can use the tee command to redirect output to a file, while also piping the output to the next command. For instance, look at the shell script for running the masterindex program, as shown in Chapter 12, "Full-Featured Applications":

    $INDEXDIR/input.idx $FILES |
    sort -bdf -t:  +0 -1 +1 -2 +3 -4 +2n -3n | uniq |
    $INDEXDIR/pagenums.idx | tee page.tmp |
    $INDEXDIR/combine.idx |
    $INDEXDIR/format.idx

By adding "tee page.tmp", we are able to capture the output of the pagenums.idx program in a file named page.tmp. The same output is also piped to combine.idx.
```

#### 5.18.7.4 Commenting Out Loud

```text
Another technique is simply commenting out a series of lines that may be causing problems to see whether they really are. We recommend developing a consistent two-character symbol such as "#%" to comment out lines temporarily. Then you will notice them on subsequent editing and remember to deal with them. It also becomes easier to remove the symbols and restore the lines with a single editing command that does not affect program comments:

    #% if ( thisFails )
    	print "I give up"

Using the comment here eliminates the conditional, so the print statement is executed unconditionally.
```

#### 5.18.7.5 Slash and Burn

```text
When all else fails, arm yourself with your editor's delete command and begin deleting portions of the program until the error disappears. Of course, make a copy of the program and delete lines from the temporary copy. This is a very crude technique, but an effective one to use before giving up altogether or starting over from scratch. It is sometimes the only way to discover what is wrong when the only result you get is that the program dumps core. The idea is the same as above, to isolate the problem code. Remove a function, for instance, or a for loop to see if it is the cause of the problem. Be sure to cut out complete units: for instance, all the statements within braces and the matching braces. If the problem persists--the program continues to break--then cut out another large section of the program. Sooner or later, you will find the part that is causing the problem.

You can use "slash and burn" to learn how a program works. First, run the original program on sample input, saving the output. Begin by removing a part of the program that you don't understand. Then run the modified program on sample input and compare the output to the original. Look to see what changed.
```

#### 5.18.7.5 Getting Defensive About Your Script

```text
There are all types of input errors and inconsistencies that will turn up bugs in your script. You probably didn't consider that user errors will be pointed to as problems with your program. Therefore, it is a good idea to surround your core program with "defensive" procedures designed to trap inconsistent input records and prevent the program from failing unexpectedly. For instance, you might want to verify each input record before processing it, making sure that the proper number of fields exist or that the kind of data that you expect is found in a particular field.

Another aspect of incorporating defensive techniques is error handling. In other words, what do you want to have happen once the program detects an error? While in some cases you can have the program continue, in other cases it may be preferable that the program print an error message and/or halt.

It is also appropriate to recognize that awk scripts are typically confined to the realm of quick fixes, programs that solve a particular problem rather than solving a class of problems encountered by many different users. Because of the nature of these programs, it is not really necessary that they be professional quality. Thus, it is not necessary to write 100% user-proof programs. For one thing, defensive programming is quite time-consuming and frequently tedious. Secondly, as amateurs, we are at liberty to write programs that perform the way we expect them to; a professional has to write for an audience and must account for their expectations. In brief, if you are writing the script for others to use, consider how it may be used and what problems its users may encounter before considering the program complete. If not, maybe the fact that the script works--even for a very narrow set of circumstances--is good enough and all there is time for.
```

### 5.18.8 Limitations

```text
There are fixed limits within any awk implementation. The only trouble is that the documentation seldom reports them. Table 10.1 lists the limitations as described in The AWK Programming Language. These limitations are implementation-specific but they are good ballpark figures for most systems.

Table 10.1. Limitations
Item 	Limit
Number of fields per record 	100
Characters per input record 	3000
Characters per output record 	3000
Characters per field 	1024
Characters per printf string 	3000
Characters in literal string 	400
Characters in character class 	400
Files open 	15
Pipes open 	1

    NOTE: Despite the number in Table 10.1, experience has shown that most awks allow you to have more than one open pipe.
In terms of numeric values, awk uses double-precision, floating-point numbers that are limited in size by the machine's architecture
Running into these limits can cause unanticipated problems with scripts. In developing examples for the first edition of this book, Dale thought he'd write a search program that could look for a word or sequence of words in a single paragraph. The idea was to read a document as a series of multiline records and if any of the fields contained the search term, print the record, which was a paragraph. It could be used to search through mail files where blank lines delimit paragraphs. The resulting program worked for small test files. However, when tried on larger files, the program dumped core because it encountered a paragraph that was longer than the maximum input record size, which is 3000 characters. (Actually, the file contained an included mail message where blank lines within the message were prefixed by ">".) Thus, when reading multiple lines as a single record, you better be sure that you don't anticipate records longer than 3000 characters. By the way, there is no particular error message that alerts you to the fact that the problem is the size of the current record.

Fortunately, gawk and mawk (see Chapter 11, "A Flock of awks") don't have such small limits; for example, the number of fields in a record is limited in gawk to the maximum value that can be held in a C long, and certainly records can be longer than 3000 characters. These versions allow you to have more open files and pipes.

Recent versions of the Bell Labs awk have two options, -mf N and -mr N, that allow you to set the maximum number of fields and the maximum record size on the command line, as an emergency way to get around the default limits.
```

### 5.18.9 Invoking awk Using the #!

```text
The "#!" syntax is an alternative syntax for invoking awk from a shell script. It has the advantage of allowing you to specify awk parameters and filenames on the shell-script command line. The "#!" syntax is recognized on modern UNIX systems, but is not typically found in older System V systems. The best way to use this syntax is to put the following line as the first line[71] of the shell script
    [71]Note that the pathname to use is system-specific.

    #!/bin/awk -f

"#!" is followed by the pathname that locates your version of awk and then the -f option. After this line, you specify the awk script:

    #!/bin/awk -f
    { print $1 }

Note that no quotes are necessary around the script. All lines in the file after the first one will be executed as though they were specified in a separate script file

A few years ago, there was an interesting discussion on the Net about the use of the "#!" syntax that clarified how it works. The discussion was prompted by a 4.2BSD user's observation that the shell script below fails:

    #!/bin/awk
    { print $1 }

while the one below works:

    #!/bin/sh
    /bin/awk '{ print $1 }'

The two responses that we saw were by Chris Torek and Guy Harris and we will try to summarize their explanation. The first script fails because it passes the filename of the script as the first parameter (argv[1] in C) and awk interprets it as the input file and not the script file. Because no script has been supplied, awk produces a syntax error message. In other words, if the name of the shell script is "myscript," then the first script executes as:


If the script was changed to add the -f option, it looks like this:

    #!/bin/awk -f
    { print $1 }

Then you enter the following command:

    $ myscript myfile

It then executes as though you had typed:

    /bin/awk -f myscript myfile

    NOTE: You can put only one parameter on the "#!" line. This line is processed directly by the UNIX kernel; it is not processed by the shell and thus cannot contain arbitrary shell constructs.

The "#!" syntax allows you to create shell scripts that pass command-line parameters transparently to awk. In other words, you can pass awk parameters from the command line that invokes the shell script.

For instance, we demonstrate passing parameters by changing our sample awk script to expect a parameter n:

    { print $1*n }

Assuming that we have a test file in which the first field contains a number that can be multiplied by n, we can invoke the program, as follows:

This spares us from having to pass "$1" as a shell variable and assigning it to n as an awk parameter inside the shell script.

The masterindex, described in Chapter 12, "Full-Featured Applications", uses the "#!" syntax to invoke awk. If your system does not support this syntax, you can change the script by removing the "#!", placing single quotes around the entire script, and ending the script with "$*", which expands to all shell command-line parameters.
```

### 5.18.10 Full-Featured Applications

#### 5.18.10.1 An Interactive Spelling Checker

```text
The UNIX spell program does an adequate job of catching spelling errors in a document. For most people, however, it only does half the job. It doesn't help you correct the misspelled words. First-time users of spell find themselves jotting down the misspelled words and then using the text editor to change the document. More skilled users build a sed script to make the changes automatically.

The spellcheck program offers another way--it shows you each word that spell has found and asks if you want to correct the word. You can change each occurrence of the word after seeing the line on which it occurs, or you can correct the spelling error globally. You can also choose to add any word that spell turns up to a local dictionary file.

Before describing the program, let's have a demonstration of how it works. The user enters spellcheck, a shell script that invokes awk, and the name of the document file.

    $ spellcheck ch00
    Use local dict file? (y/n)y

If a dictionary file is not specified on the command line, and a file named dict exists in the current directory, then the user is asked if the local dictionary should be used. spellcheck then runs spell using the local dictionary.

    Running spell checker ...

Using the list of "misspelled" words turned up by spell, spellcheck prompts the user to correct them. Before the first word is displayed, a list of responses is shown that describes what actions are possible.

    Responses: 
    	Change each occurrence, 
    	Global change, 
    	Add to Dict, 
    	Help, 
    	Quit 
    	CR to ignore: 
    1 - Found SparcStation (C/G/A/H/Q/):a

The first word found by spell is "SparcStation." A response of "a" (followed by a carriage return) adds this word to a list that will be used to update the dictionary. The second word is clearly a misspelling and a response of "g" is entered to make the change globally:

    2 - Found languauge (C/G/A/H/Q/):g
    Globally change to:language
    Globally change languauge to language? (y/n):y
    > and a full description of its scripting language. 
    1 lines changed. Save changes? (y/n)y

After prompting the user to enter the correct spelling and confirming the entry, the change is made and each line affected is displayed, preceded by a ">". The user is then asked to approve these changes before they are saved. The third word is also added to the dictionary:

    3 - Found nawk (C/G/A/H/Q/):a

The fourth word is a misspelling of "utilities."

    4 - Found utlitities (C/G/A/H/Q/):c
    These utlitities have many things in common, including
          ^^^^^^^^^^
    Change to:utilities
    Change utlitities to utilities? (y/n):y
    Two other utlitities that are found on the UNIX system
              ^^^^^^^^^^
    Change utlitities to utilities? (y/n):y
    >These utilities have many things in common, including
    >Two other utilities that are found on the UNIX system
    2 lines changed. Save changes? (y/n)y

The user enters "c" to change each occurrence. This response allows the user to see the line containing the misspelling and then make the change. After the user has made each change, the changed lines are displayed and the user is asked to confirm saving the changes.

It is unclear whether the fifth word is a misspelling or not, so the user enters "c" to view the line.

    5 - Found xvf (C/G/A/H/Q/):c
    tar xvf filename
        ^^^
    Change to:RETURN

After determining that it is not a misspelling, the user enters a carriage return to ignore the word. Generally, spell turns up a lot of words that are not misspellings so a carriage return means to ignore the word.

After all the words in the list have been processed, or if the user quits before then, the user is prompted to save the changes made to the document and the dictionary.

    Save corrections in ch00 (y/n)? y
    Make changes to dictionary (y/n)? y

If the user answers "n," the original file and the dictionary are left unchanged.

Now let's look at the spellcheck.awk script, which can be divided into four sections:

    * The BEGIN procedure, that processes the command-line arguments and executes the spell command to create a word list.
    * The main procedure, that reads one word at a time from the list and prompts the user to make a correction.
    * The END procedure, that saves the working copy of the file, overwriting the original. It also appends words from the exception list to the current dictionary.
    * Supporting functions, that are called to make changes in the file.

We will look at each of these sections of the program.
```

#### 5.18.10.1.1 BEGIN Procedure

```text
The BEGIN procedure for spellcheck.awk is large. It is also somewhat unusual.

    # spellcheck.awk -- interactive spell checker
    #
    # AUTHOR: Dale Dougherty
    #
    # Usage: nawk -f spellcheck.awk [+dict] file 
    # (Use spellcheck as name of shell program) 
    # SPELLDICT = "dict" 
    # SPELLFILE = "file"

    # BEGIN actions perform the following tasks: 
    #	1) process command-line arguments
    #	2) create temporary filenames
    #	3) execute spell program to create wordlist file
    #	4) display list of user responses

    BEGIN { 
    # Process command-line arguments
    # Must be at least two args -- nawk and filename
    	if (ARGC > 1) {
    	# if more than two args, second arg is dict 
    		if (ARGC > 2) {
    		# test to see if dict is specified with "+"  
    		# and assign ARGV[1] to SPELLDICT
    			if (ARGV[1] ~ /^\+.*/) 
    				SPELLDICT = ARGV[1]
    			else 
    				SPELLDICT = "+" ARGV[1]
    		# assign file ARGV[2] to SPELLFILE 
    			SPELLFILE = ARGV[2]
    		# delete args so awk does not open them as files
    			delete ARGV[1]
    			delete ARGV[2]
    		}
    	# not more than two args
    		else {
    		# assign file ARGV[1] to SPELLFILE 
    			SPELLFILE = ARGV[1]
    		# test to see if local dict file exists
    			if (! system ("test -r dict")) {
    			# if it does, ask if we should use it
    				printf ("Use local dict file? (y/n)")	
    				getline reply < "-"
    			# if reply is yes, use "dict" 
    				if (reply ~ /[yY](es)?/){
    					SPELLDICT = "+dict"
    				}
    			}
    		}
    	} # end of processing args > 1 
    	# if args not > 1, then print shell-command usage 
    	else {
    		print "Usage: spellcheck [+dict] file"
    		exit 1
    	}
    # end of processing command line arguments

    # create temporary file names, each begin with sp_
    	wordlist = "sp_wordlist"
    	spellsource = "sp_input"
    	spellout = "sp_out"

    # copy SPELLFILE to temporary input file
    	system("cp " SPELLFILE " " spellsource)

    # now run spell program; output sent to wordlist
    	print "Running spell checker ..."
    	if (SPELLDICT)
    		SPELLCMD = "spell " SPELLDICT " "
    	else
    		SPELLCMD = "spell "
    	system(SPELLCMD spellsource " > " wordlist )

    # test wordlist to see if misspelled words turned up
    	if ( system("test -s " wordlist ) ) {
    	# if wordlist is empty (or spell command failed), exit
    		print "No misspelled words found."
    		system("rm " spellsource " " wordlist)
    		exit
    	}	

    # assign wordlist file to ARGV[1] so that awk will read it.	
    	ARGV[1] = wordlist

    # display list of user responses 
    	responseList = "Responses: \n\tChange each occurrence," 
    	responseList = responseList "\n\tGlobal change," 
    	responseList = responseList "\n\tAdd to Dict,"  
    	responseList = responseList "\n\tHelp," 
    	responseList = responseList "\n\tQuit" 
    	responseList = responseList "\n\tCR to ignore: "
    	printf("%s", responseList)

    } # end of BEGIN procedure

The first part of the BEGIN procedure processes the command-line arguments. It checks that ARGC is greater than one for the program to continue. That is, in addition to "nawk," a filename must be specified. This file specifies the document that spell will analyze. An optional dictionary filename can be specified as the second argument. The spellcheck script follows the command-line interface of spell, although none of the obscure spell options can be invoked from the spellcheck command line. If a dictionary is not specified, then the script executes a test command to see if the file dict exists. If it does, the prompt asks the user to approve using it as the dictionary file.

Once we've processed the arguments, we delete them from the ARGV array. This is to prevent their being interpreted as filename arguments.

The second part of the BEGIN procedure sets up some temporary files, because we do not want to work directly with the original file. At the end of the program, the user will have the option of saving or discarding the work done in the temporary files. The temporary files all begin with "sp_" and are removed before exiting the program.

The third part of the procedure executes spell and creates a word list. We test to see that this file exists and that there is something in it before proceeding. If for some reason the spell program fails, or there are no misspelled words found, the wordlist file will be empty. If this file does exist, then we assign the filename as the second element in the ARGV array. This is an unusual but valid way of supplying the name of the input file that awk will process. Note that this file did not exist when awk was invoked! The name of the document file, which was specified on the command line, is no longer in the ARGV array. We will not read the document file using awk's main input loop. Instead, a while loop reads the file to find and correct misspelled words.

The last task in the BEGIN procedure is to define and display a list of responses that the user can enter when a misspelled word is displayed. This list is displayed once at the beginning of the program as well as when the user enters "Help" at the main prompt. Putting this list in a variable allows us to access it from different points in the program, if necessary, without maintaining duplicates. The assignment of responseList could be done more simply, but the long string would not be printable in this book. (You can't break a string over two lines.)
```

#### 5.18.10.1.2 Main Procedure

```text
The main procedure is rather small, merely displaying a misspelled word and prompting the user to enter an appropriate response. This procedure is executed for each misspelled word.

One reason this procedure is short is because the central action--correcting a misspelled word--is handled by two larger user-defined functions, which we'll see in the last section.

    # main procedure, executed for each line in wordlist.
    #	Purpose is to show misspelled word and prompt user
    #	for appropriate action.

    {
    # assign word to misspelling
    	misspelling = $1 
    	response = 1
    	++word

    # print misspelling and prompt for response
    	while (response !~ /(^[cCgGaAhHqQ])|^$/ ) {
    		printf("\n%d - Found %s (C/G/A/H/Q/):", word, misspelling)
    		getline response < "-"
    	}
    # now process the user's response
    # CR - carriage return ignores current word 
    # Help
    	if (response ~ /[Hh](elp)?/) {
    	# Display list of responses and prompt again.
    		printf("%s", responseList)
    		printf("\n%d - Found %s (C/G/A/Q/):", word, misspelling)
    		getline response < "-"
    	}
    # Quit
    	if (response ~ /[Qq](uit)?/) exit
    # Add to dictionary
    	if ( response ~ /[Aa](dd)?/) { 
    		dict[++dictEntry] = misspelling
    	}
    # Change each occurrence
    	if ( response ~ /[cC](hange)?/) {
    	# read each line of the file we are correcting
    		newspelling = ""; changes = ""
    		while( (getline < spellsource) > 0){
    		# call function to show line with misspelled word
    		# and prompt user to make each correction 
    			make_change($0)
    		# all lines go to temp output file
    			print > spellout
    		}	
    	# all lines have been read 
    	# close temp input and temp output file
    		close(spellout)
    		close(spellsource)
    	# if change was made
    		if (changes){ 
    		# show changed lines
    			for (j = 1; j <= changes; ++j)
    				print changedLines[j]
    			printf ("%d lines changed. ", changes) 
    		# function to confirm before saving changes
    			confirm_changes()
    		}
    	}
    # Globally change
    	if ( response ~ /[gG](lobal)?/) {
    	# call function to prompt for correction
    	# and display each line that is changed.
    	# Ask user to approve all changes before saving.
    		make_global_change()
    	}	
    } # end of Main procedure

The first field of each input line from wordlist contains the misspelled word and it is assigned to misspelling. We construct a while loop inside which we display the misspelled word to the user and prompt for a response. Look closely at the regular expression that tests the value of response:

    while (response !~ /(^[cCgGaAhHqQ])|^$/)

The user can only get out of this loop by entering any of the specified letters or by entering a carriage return--an empty line. The use of regular expressions for testing user input helps tremendously in writing a simple but flexible program. The user can enter a single letter "c" in lower- or uppercase or a word beginning with "c" such as "Change."

The rest of the main procedure consists of conditional statements that test for a specific response and perform a corresponding action. The first response is "help," which displays the list of responses again and then redisplays the prompt.

The next response is "quit." The action associated with quit is exit, which drops out of the main procedure and goes to the END procedure.

If the user enters "add," the misspelled word is put in the array dict and will be added as an exception in a local dictionary.

The "Change" and "Global" responses cause the program's real work to begin. It's important to understand how they differ. When the user enters "c" or "change," the first occurrence of the misspelled word in the document is displayed. Then the user is prompted to make the change. This happens for each occurrence in the document. When the user enters "g" or "global," the user is prompted to make the change right away, and all the changes are made at once without prompting the user to confirm each one. This work is largely handled by two functions, make_change() and make_global_change(), which we'll look at in the last section. These are all the valid responses, except one. A carriage return means to ignore the misspelled word and get the next word in the list. This is the default action of the main input loop, so no conditional need be set up for it.
```

#### 5.18.10.1.3 END Procedure

```text
The END procedure, of course, is reached in one of the following circumstances:

    *

      The spell command failed or did not turn up any misspellings.
    *

      The list of misspelled words is exhausted.
    *

      The user has entered "quit" at a prompt.

The purpose of the END procedure is to allow the user to confirm any permanent change to the document or the dictionary.

    # END procedure makes changes permanent.
    # It overwrites the original file, and adds words
    # to the dictionary.
    # It also removes the temporary files.

    END {
    # if we got here after reading only one record, 
    # no changes were made, so exit.
    	if (NR <= 1) exit
    # user must confirm saving corrections to file
    	while (saveAnswer !~ /([yY](es)?)|([nN]o?)/ ) {
    		printf "Save corrections in %s (y/n)? ", SPELLFILE
    		getline saveAnswer < "-"
    	}
    # if answer is yes then mv temporary input file to SPELLFILE
    # save old SPELLFILE, just in case
    	if (saveAnswer ~ /^[yY]/) {
    		system("cp " SPELLFILE " " SPELLFILE ".orig")
    		system("mv " spellsource " " SPELLFILE)
    	}
    # if answer is no then rm temporary input file
    	if (saveAnswer ~ /^[nN]/)
    		system("rm " spellsource) 

    # if words have been added to dictionary array, then prompt
    # to confirm saving in current dictionary. 
    	if (dictEntry) {
    		printf "Make changes to dictionary (y/n)? "
    		getline response < "-"
    		if (response ~ /^[yY]/){
    		# if no dictionary defined, then use "dict"
    			if (! SPELLDICT) SPELLDICT = "dict"
    		
    		# loop through array and append words to dictionary
    			sub(/^\+/, "", SPELLDICT)
    			for ( item in dict )
    				print dict[item] >> SPELLDICT
    			close(SPELLDICT)
    		# sort dictionary file 
    			system("sort " SPELLDICT "> tmp_dict")
    			system("mv " "tmp_dict " SPELLDICT)
    		}
    	}
    # remove word list
    	system("rm sp_wordlist")
    } # end of END procedure

The END procedure begins with a conditional statement that tests that the number of records is less than or equal to 1. This occurs when the spell program does not generate a word list or when the user enters "quit" after seeing just the first record. If so, the END procedure is exited as there is no work to save.

Next, we create a while loop to ask the user about saving the changes made to the document. It requires the user to respond "y" or "n" to the prompt. If the answer is "y," the temporary input file replaces the original document file. If the answer is "n," the temporary file is removed. No other responses are accepted.

Next, we test to see if the dict array has something in it. Its elements are the words to be added to the dictionary. If the user approves adding them to the dictionary, these words are appended to the current dictionary, as defined above, or if not, to a local dict file. Because the dictionary must be sorted to be read by spell, a sort command is executed with the output sent to a temporary file that is afterwards copied over the original file.
```

### 12.1.4. Supporting Functions

```text
There are three supporting functions, two of which are large and do the bulk of the work of making changes in the document. The third function supports that work by confirming that the user wants to save the changes that were made.

When the user wants to "Change each occurrence" in the document, the main procedure has a while loop that reads the document one line at a time. (This line becomes $0.) It calls the make_change() function to see if the line contains the misspelled word. If it does, the line is displayed and the user is prompted to enter the correct spelling of the word.

    # make_change -- prompt user to correct misspelling 
    #		 for current input line.  Calls itself
    # 		 to find other occurrences in string.
    # 	stringToChange -- initially $0; then unmatched substring of $0
    # 	len -- length from beginning of $0 to end of matched string 
    # Assumes that misspelling is defined. 

    function make_change (stringToChange, len,	# parameters
    	line, OKmakechange, printstring, carets)	# locals
    {
    # match misspelling in stringToChange; otherwise do nothing 
      if ( match(stringToChange, misspelling) ) {
      # Display matched line 
    	printstring = $0
    	gsub(/\t/, " ", printstring)
    	print printstring
    	carets = "^"
    	for (i = 1; i < RLENGTH; ++i)
    		carets = carets "^"
    	if (len)
    		FMT = "%" len+RSTART+RLENGTH-2 "s\n"
    	else
    		FMT = "%" RSTART+RLENGTH-1 "s\n"
    	printf(FMT, carets)

      # Prompt user for correction, if not already defined
    	if (! newspelling) {
    		printf "Change to:"
    		getline newspelling < "-"
    	}
      # A carriage return falls through
      # If user enters correction, confirm  
    	while (newspelling && ! OKmakechange) {
    		printf ("Change %s to %s? (y/n):", misspelling, newspelling)
    		getline OKmakechange < "-"
    		madechg = ""
    	# test response
    		if (OKmakechange ~ /[yY](es)?/ ) {
    		# make change (first occurrence only)
    			madechg = sub(misspelling, newspelling, stringToChange)
    		}
    		else if ( OKmakechange ~ /[nN]o?/ ) {
    			# offer chance to re-enter correction 
    			printf "Change to:"
    			getline newspelling < "-"
    			OKmakechange = ""
    		}
    	} # end of while loop

       # if len, we are working with substring of $0
    	if (len) {
    	# assemble it
    		line = substr($0,1,len-1)
    		$0 = line stringToChange
    	}
    	else {
    		$0 = stringToChange
    		if (madechg) ++changes
    	}

       # put changed line in array for display
    	if (madechg) 
    		changedLines[changes] = ">" $0

       # create substring so we can try to match other occurrences
    	len += RSTART + RLENGTH
    	part1 = substr($0, 1, len-1)
    	part2 = substr($0, len)
       # calls itself to see if misspelling is found in remaining part 
    	make_change(part2, len) 

      } # end of if

    } # end of make_change()

If the misspelled word is not found in the current input line, nothing is done. If it is found, this function shows the line containing the misspelling and asks the user if it should be corrected. Underneath the display of the current line is a row of carets that indicates the misspelled word.

    Two other utlitities that are found on the UNIX system
              ^^^^^^^^^^

The current input line is copied to printstring because it is necessary to change the line for display purposes. If the line contains any tabs, each tab in this copy of the line is temporarily replaced by a single space. This solves a problem of aligning the carets when tabs were present. (A tab counts as a single character when determining the length of a line but actually occupies greater space when displayed, usually five to eight characters long.)

After displaying the line, the function prompts the user to enter a correction. It then follows up by displaying what the user has entered and asks for confirmation. If the correction is approved, the sub() function is called to make the change. If not approved, the user is given another chance to enter the correct word.

Remember that the sub() function only changes the first occurrence on a line. The gsub() function changes all occurrences on a line, but we want to allow the user to confirm each change. Therefore, we have to try to match the misspelled word against the remaining part of the line. And we have to be able to match the next occurrence regardless of whether or not the first occurrence was changed.

To do this, make_change() is designed as a recursive function; it calls itself to look for additional occurrences on the same line. In other words, the first time make_change() is called, it looks at all of $0 and matches the first misspelled word on that line. Then it splits the line into two parts--the first part contains the characters up to the end of the first occurrence and the second part contains the characters that immediately follow up to the end of the line. Then it calls itself to try and match the misspelled word in the second part. When called recursively, the function takes two arguments.

    make_change(part2, len)

The first is the string to be changed, which is initially $0 when called from the main procedure but each time thereafter is the remaining part of $0. The second argument is len or the length of the first part, which we use to extract the substring and reassemble the two parts at the end.

The make_change() function also collects an array of lines that were changed.

    # put changed line in array for display
            if (madechg)
                    changedLines[changes] = ">" $0

The variable madechg will have a value if the sub() function was successful. $0 (the two parts have been rejoined) is assigned to an element of the array. When all of the lines of the document have been read, the main procedure loops through this array to display all the changed lines. Then it calls the confirm_changes() function to ask if these changes should be saved. It copies the temporary output file over the temporary input file, keeping intact the corrections made for the current misspelled word.

If a user decides to make a "Global change," the make_global_change() function is called to do it. This function is similar to the make_change() function, but is simpler because we can make the change globally on each line.

    # make_global_change --
    #		prompt user to correct misspelling 
    #		for all lines globally.  
    #		Has no arguments
    # Assumes that misspelling is defined. 

    function make_global_change(    newspelling, OKmakechange, changes)
    {
    # prompt user to correct misspelled word
       printf "Globally change to:"
       getline newspelling < "-"

    # carriage return falls through
    # if there is an answer, confirm 
       while (newspelling && ! OKmakechange) {
    		printf ("Globally change %s to %s? (y/n):", misspelling,
    				newspelling)
    		getline OKmakechange < "-"
    	# test response and make change
    		if (OKmakechange ~ /[yY](es)?/ ) {
    		# open file, read all lines 
    			while( (getline < spellsource) > 0){
    			# if match is found, make change using gsub
    			# and print each changed line.
    				if ($0 ~ misspelling) {
    					madechg = gsub(misspelling, newspelling)
    					print ">", $0
    					changes += 1  # counter for line changes
    				}
    			# write all lines to temp output file
    				print > spellout
    			} # end of while loop for reading file

    		# close temporary files
    			close(spellout)
    			close(spellsource)
    		# report the number of changes	
    			printf ("%d lines changed. ", changes) 

    		# function to confirm before saving changes
    			confirm_changes()
    		} # end of if (OKmakechange ~ y) 

    	# if correction not confirmed,  prompt for new word
    		else if ( OKmakechange ~ /[nN]o?/ ){
    			printf "Globally change to:"
    			getline newspelling < "-"
    			OKmakechange = ""
    		}

      } # end of while loop for prompting user for correction

    } # end of make_global_change()

This function prompts the user to enter a correction. A while loop is set up to read all the lines of the document and apply the gsub() function to make the changes. The main difference is that all the changes are made at once--the user is not prompted to confirm them. When all lines have been read, the function displays the lines that were changed and calls confirm_changes() to get the user to approve this batch of changes before saving them.

The confirm_changes() function is a routine called to get approval of the changes made when the make_change() or make_global_change() function is called.

    # confirm_changes --  
    #		confirm before saving changes

    function confirm_changes(  savechanges) {
    # prompt to confirm saving changes
    	while (! savechanges ) {
    		printf ("Save changes? (y/n)")
    		getline savechanges < "-"
    	}
    # if confirmed, mv output to input
    	if (savechanges ~ /[yY](es)?/)
    		system("mv " spellout " " spellsource) 
    }

The reason for creating this function is to prevent the duplication of code. Its purpose is simply to require the user to acknowledge the changes before replacing the old version of the document file (spellsource) with the new version (spellout).
```

#### 5.18.10.1.4 he spellcheck Shell Script

```text
To make it easy to invoke this awk script, we create the spellcheck shell script (say that three times fast). It contains the following lines:

    AWKLIB=/usr/local/awklib
    nawk -f $AWKLIB/spellcheck.awk $*

This script sets up a shell variable AWKLIB that specifies the location of the spellcheck.awk script. The symbol "$*" expands to all command-line parameters following the name of the script. These parameters are then available to awk.

One of the interesting things about this spell checker is how little is done in the shell script.[85] All of the work is done in the awk programming language, including executing 10 UNIX commands. We're using a consistent syntax and the same constructs by doing it all in awk. When you have to do some of your work in the shell and some in awk, it can get confusing. For instance, you have to remember the differences in the syntax of if conditionals and how to reference variables. Modern versions of awk provide a true alternative to the shell for executing commands and interacting with a user.

			This is the full script:
			Full Listing of spellcheck.awk

    # spellcheck.awk -- interactive spell checker
    #
    # AUTHOR: Dale Dougherty
    #
    # Usage: nawk -f spellcheck.awk [+dict] file 
    # (Use spellcheck as name of shell program) 
    # SPELLDICT = "dict" 
    # SPELLFILE = "file"

    # BEGIN actions perform the following tasks: 
    #      1) process command line arguments
    #      2) create temporary filenames
    #      3) execute spell program to create wordlist file
    #      4) display list of user responses

    BEGIN { 
    # Process command line arguments
    # Must be at least two args -- nawk and filename
          if (ARGC > 1) {
          # if more than two args, second arg is dict 
                if (ARGC > 2) {
                # test to see if dict is specified with "+"  
                # and assign ARGV[1] to SPELLDICT
                      if (ARGV[1] ~ /^\+.*/) 
                            SPELLDICT = ARGV[1]

                      else 
                            SPELLDICT = "+" ARGV[1]
                # assign file ARGV[2] to SPELLFILE 
                      SPELLFILE = ARGV[2]
                # delete args so awk does not open them as files
                      delete ARGV[1]
                      delete ARGV[2]
                }
          # not more than two args
                else {
                # assign file ARGV[1] to SPELLFILE 
                      SPELLFILE = ARGV[1]
                # test to see if local dict file exists
                      if (! system ("test -r dict")) {
                      # if it does, ask if we should use it
                            printf ("Use local dict file? (y/n)")   
                            getline reply < "-"
                      # if reply is yes, use "dict" 
                            if (reply ~ /[yY](es)?/){
                                  SPELLDICT = "+dict"
                            }
                      }
                }
          } # end of processing args > 1 
          # if args not > 1, then print shell-command usage 
          else {
                print "Usage: spellcheck [+dict] file"
                exit 1
          }
    # end of processing command line arguments

    # create temporary file names, each begin with sp_
          wordlist = "sp_wordlist"
          spellsource = "sp_input"
          spellout = "sp_out"

    # copy SPELLFILE to temporary input file
          system("cp " SPELLFILE " " spellsource)

    # now run spell program; output sent to wordlist
          print "Running spell checker ..."
          if (SPELLDICT)
                SPELLCMD = "spell " SPELLDICT " "
          else
                SPELLCMD = "spell "
          system(SPELLCMD spellsource " > " wordlist )

    # test wordlist to see if misspelled words turned up
          if ( system("test -s " wordlist ) ) {
          # if wordlist is empty, (or spell command failed), exit
                print "No misspelled words found."
                system("rm " spellsource " " wordlist)
                exit
          }   

    # assign wordlist file to ARGV[1] so that awk will read it.   
          ARGV[1] = wordlist

    # display list of user responses 
          responseList = "Responses: \n\tChange each occurrence," 
          responseList = responseList "\n\tGlobal change," 
          responseList = responseList "\n\tAdd to Dict,"  
          responseList = responseList "\n\tHelp," 
          responseList = responseList "\n\tQuit" 
          responseList = responseList "\n\tCR to ignore: "
          printf("%s", responseList)

    } # end of BEGIN procedure

    # main procedure, executed for each line in wordlist.
    #     Purpose is to show misspelled word and prompt user
    #     for appropriate action.

    {
    # assign word to misspelling
          misspelling = $1 
          response = 1
          ++word
    # print misspelling and prompt for response
          while (response !~ /(^[cCgGaAhHqQ])|^$/ ) {
                printf("\n%d - Found %s (C/G/A/H/Q/):", word, misspelling)
                getline response < "-"
          }
    # now process the user's response
    # CR - carriage return ignores current word 
    # Help
          if (response ~ /[Hh](elp)?/) {
          # Display list of responses and prompt again.
                printf("%s", responseList)
                printf("\n%d - Found %s (C/G/A/Q/):", word, misspelling)
                getline response < "-"
          }
    # Quit
          if (response ~ /[Qq](uit)?/) exit
    # Add to dictionary
          if ( response ~ /[Aa](dd)?/) { 
                dict[++dictEntry] = misspelling
          }
    # Change each occurrence
          if ( response ~ /[cC](hange)?/) {
          # read each line of the file we are correcting
                newspelling = ""; changes = ""
                while( (getline < spellsource) > 0){
                # call function to show line with misspelled word
                # and prompt user to make each correction 
                      make_change($0)
                # all lines go to temp output file
                      print > spellout
                }   
          # all lines have been read 
          # close temp input and temp output file
                close(spellout)
                close(spellsource)
          # if change was made
                if (changes){ 
                # show changed lines
                      for (j = 1; j <= changes; ++j)
                            print changedLines[j]
                      printf ("%d lines changed. ", changes) 
                # function to confirm before saving changes
                      confirm_changes()
                }
          }
    # Globally change
          if ( response ~ /[gG](lobal)?/) {
          # call function to prompt for correction
          # and display each line that is changed.
          # Ask user to approve all changes before saving.
                make_global_change()
          }   
    } # end of Main procedure

    # END procedure makes changes permanent.
    # It overwrites the original file, and adds words
    # to the dictionary.
    # It also removes the temporary files.

    END {
    # if we got here after reading only one record, 
    # no changes were made, so exit.
          if (NR <= 1) exit
    # user must confirm saving corrections to file
          while (saveAnswer !~ /([yY](es)?)|([nN]o?)/ ) {
                printf "Save corrections in %s (y/n)? ", SPELLFILE
                getline saveAnswer < "-"
          }
    # if answer is yes then mv temporary input file to SPELLFILE
    # save old SPELLFILE, just in case
          if (saveAnswer ~ /^[yY]/) {
                system("cp " SPELLFILE " " SPELLFILE ".orig")
                system("mv " spellsource " " SPELLFILE)
          }
    # if answer is no then rm temporary input file
          if (saveAnswer ~ /^[nN]/)
                system("rm " spellsource) 

    # if words have been added to dictionary array, then prompt
    # to confirm saving in current dictionary. 
          if (dictEntry) {
                printf "Make changes to dictionary (y/n)? "
                getline response < "-"
                if (response ~ /^[yY]/){
                # if no dictionary defined, then use "dict"
                      if (! SPELLDICT) SPELLDICT = "dict"
          
                # loop through array and append words to dictionary
                      sub(/^\+/, "", SPELLDICT)
                      for ( item in dict )
                            print dict[item] >> SPELLDICT
                      close(SPELLDICT)
                # sort dictionary file 
                      system("sort " SPELLDICT "> tmp_dict")
                      system("mv " "tmp_dict " SPELLDICT)
                }
          }
    # remove word list
          system("rm sp_wordlist")
    } # end of END procedure

    # function definitions

    # make_change -- prompt user to correct misspelling 
    #                for current input line.  Calls itself
    #                to find other occurrences in string.
    #     stringToChange -- initially $0; then unmatched substring of $0
    #     len -- length from beginning of $0 to end of matched string 
    # Assumes that misspelling is defined. 

    function make_change (stringToChange, len,   # parameters
          line, OKmakechange, printstring, carets)   # locals
    {
    # match misspelling in stringToChange; otherwise do nothing 
       if ( match(stringToChange, misspelling) ) {
       # Display matched line 
             printstring = $0
             gsub(/\t/, " ", printstring)
             print printstring
             carets = "^"
             for (i = 1; i < RLENGTH; ++i)
                   carets = carets "^"
             if (len)
                   FMT = "%" len+RSTART+RLENGTH-2 "s\n"
             else
                   FMT = "%" RSTART+RLENGTH-1 "s\n"
             printf(FMT, carets)
       # Prompt user for correction, if not already defined
             if (! newspelling) {
                   printf "Change to:"
                   getline newspelling < "-"
             }
       # A carriage return falls through
       # If user enters correction, confirm  
             while (newspelling && ! OKmakechange) {
                   printf ("Change %s to %s? (y/n):", misspelling, newspelling)
                   getline OKmakechange < "-"
                   madechg = ""
             # test response
                   if (OKmakechange ~ /[yY](es)?/ ) {
                   # make change (first occurrence only)
                         madechg = sub(misspelling, newspelling, stringToChange)
                   }
                   else if ( OKmakechange ~ /[nN]o?/ ) {
                         # offer chance to re-enter correction 
                         printf "Change to:"
                         getline newspelling < "-"
                         OKmakechange = ""
                   }
             } # end of while loop

       # if len, we are working with substring of $0
             if (len) {
             # assemble it
                   line = substr($0,1,len-1)
                   $0 = line stringToChange
             }
             else {
                   $0 = stringToChange
                   if (madechg) ++changes
             }

       # put changed line in array for display
             if (madechg) 
                   changedLines[changes] = ">" $0


       # create substring so we can try to match other occurrences
             len += RSTART + RLENGTH
             part1 = substr($0, 1, len-1)
             part2 = substr($0, len)
       # calls itself to see if misspelling is found in remaining part 
             make_change(part2, len) 

       } # end of if

    } # end of make_change()

    # make_global_change --
    #        prompt user to correct misspelling 
    #        for all lines globally.  
    #        Has no arguments
    # Assumes that misspelling is defined. 

    function make_global_change(    newspelling, OKmakechange, changes)
    {
    # prompt user to correct misspelled word
       printf "Globally change to:"
       getline newspelling < "-"

    # carriage return falls through
    # if there is an answer, confirm 
       while (newspelling && ! OKmakechange) {
                   printf ("Globally change %s to %s? (y/n):", misspelling,
                         newspelling)
                   getline OKmakechange < "-"
             # test response and make change
                   if (OKmakechange ~ /[yY](es)?/ ) {
                   # open file, read all lines 
                         while( (getline < spellsource) > 0){
                         # if match is found, make change using gsub
                         # and print each changed line.
                               if ($0 ~ misspelling) {
                                        madechg = gsub(misspelling, newspelling)
                                        print ">", $0
                                        changes += 1  # counter for line changes
                               }
                         # write all lines to temp output file
                               print > spellout
                         } # end of while loop for reading file

                   # close temporary files
                         close(spellout)
                         close(spellsource)
                   # report the number of changes   
                         printf ("%d lines changed. ", changes) 
                   # function to confirm before saving changes
                         confirm_changes()
                   } # end of if (OKmakechange ~ y) 

       # if correction not confirmed,  prompt for new word
                   else if ( OKmakechange ~ /[nN]o?/ ){
                         printf "Globally change to:"
                         getline newspelling < "-"
                         OKmakechange = ""
                   }

       } # end of while loop for prompting user for correction

    } # end of make_global_change()

    # confirm_changes --  
    #        confirm before saving changes

    function confirm_changes(  savechanges) {
    # prompt to confirm saving changes
          while (! savechanges ) {
                printf ("Save changes? (y/n)")
                getline savechanges < "-"
          }
    # if confirmed, mv output to input
          if (savechanges ~ /[yY](es)?/)
                system("mv " spellout " " spellsource) 
          }
```

#### 5.18.10.2 A Miscellany of Scripts

#### 5.18.10.2.1 uutot.awk--Report UUCP Statistics

```text
Contributed by Roger A. Cornelius

Here's something I wrote in nawk in response to all the C versions of the same thing which were posted to alt.sources awhile back. Basically, it summarizes statistics of uucp connections (connect time, throughput, files transmitted, etc.). It only supports HDB-style log files, but will show statistics on a site-by-site, or on an overall (all sites), basis. [It also works with /usr/spool/uucp/SYSLOG.]

I use a shell wrapper which calls "awk -f" to run this, but it's not necessary. Usage information is in the header. (Sorry about the lack of comments.)

    # @(#) uutot.awk - display uucp statistics - requires new awk
    # @(#) Usage:awk -f uutot.awk [site ...] /usr/spool/uucp/.Admin/xferstats
    # Author: Roger A. Cornelius (rac@sherpa.uucp)

    #       dosome[];               # site names to work for - all if not set
    #       remote[];               # array of site names
    #       bytes[];                # bytes xmitted by site
    #       time[];	               # time spent by site
    #       files[];                # files xmitted by site
    BEGIN {
    	doall = 1;
    	if (ARGC > 2) {
    		doall = 0;
    		for (i = 1; i < ARGC-1; i++) {
    			dosome[ ARGV[i] ];
    			ARGV[i] = "";
    		}
    	}

    	kbyte = 1024	# 1000 if you're not picky
    	bang = "!";
    	sending = "->";
    	xmitting = "->" "|" "<-";

    	hdr1 = "Remote     K-Bytes   K-Bytes   K-Bytes " \
    		"Hr:Mn:Sc Hr:Mn:Sc AvCPS AvCPS    #    #\n";
    	hdr2 = "SiteName      Recv      Xmit     Total     " \
    		"Recv     Xmit  Recv  Xmit Recv Xmit\n";

    	hdr3 = "-------- --------- --------- --------- -------- " \
    		"-------- ----- ----- ---- ----";
    	fmt1 = "%-8.8s %9.3f %9.3f %9.3f %2d:%02d:%02.0f " \
    		"%2d:%02d:%02.0f %5.0f %5.0f %4d %4d\n";
    	fmt2 = "Totals   %9.3f %9.3f %9.3f %2d:%02d:%02.0f " \
    		"%2d:%02d:%02.0f %5.0f %5.0f %4d %4d\n";
    }
    {
    	if ($6 !~ xmitting)		# should never be
    		next;
    	direction = ($6 == sending ? 1 : 2)

    	site = substr($1,1,index($1,bang)-1);
    	if (site in dosome || doall) {
    		remote[site];
    		bytes[site,direction] += $7;
    		time[site,direction] += $9;
    		files[site,direction]++;
    	}
    }
    END {
    	print hdr1 hdr2 hdr3;
    	for (k in remote) {
    		rbyte += bytes[k,2];	sbyte += bytes[k,1];
    		rtime += time[k,2];	stime += time[k,1];
    		rfiles += files[k,2];	sfiles += files[k,1];
    		printf(fmt1, k, bytes[k,2]/kbyte, bytes[k,1]/kbyte,
    			(bytes[k,2]+bytes[k,1])/kbyte,
    			time[k,2]/3600, (time[k,2]%3600)/60, time[k,2]%60,
    			time[k,1]/3600, (time[k,1]%3600)/60, time[k,1]%60,
    			bytes[k,2] && time[k,2] ? bytes[k,2]/time[k,2] : 0,
    			bytes[k,1] && time[k,1] ? bytes[k,1]/time[k,1] : 0,
    			files[k,2], files[k,1]);
    	}

    	print hdr3
    	printf(fmt2, rbyte/kbyte, sbyte/kbyte, (rbyte+sbyte)/kbyte,
    		rtime/3600, (rtime%3600)/60, rtime%60,
    		stime/3600, (stime%3600)/60, stime%60,
    		rbyte && rtime ? rbyte/rtime : 0,
    		sbyte && stime ? sbyte/stime : 0,
    		rfiles, sfiles);
    }

A test file was generated to test Cornelius' program. Here are a few lines extracted from /usr/spool/uucp/.Admin/xferstats (because each line in this file is too long to print on a page, we have broken the line following the directional arrow for display purposes only):

    isla!nuucp S (8/3-16:10:17) (C,126,25) [ttyi1j] ->
                         1131/4.880 secs, 231 bytes/sec
    isla!nuucp S (8/3-16:10:20) (C,126,26) [ttyi1j] ->
                         149/0.500 secs, 298 bytes/sec

    isla!sue S (8/3-16:10:49) (C,126,27) [ttyi1j] ->
                         646/25.230 secs, 25 bytes/sec
    isla!sue S (8/3-16:10:52) (C,126,28) [ttyi1j] ->
                         145/0.510 secs, 284 bytes/sec
    uunet!uisla M (8/3-16:15:50) (C,951,1) [cui1a] ->
                         1191/0.660 secs, 1804 bytes/sec
    uunet!uisla M (8/3-16:15:53) (C,951,2) [cui1a] ->
                         148/0.080 secs, 1850 bytes/sec
    uunet!uisla M (8/3-16:15:57) (C,951,3) [cui1a] ->
                         1018/0.550 secs, 1850 bytes/sec
    uunet!uisla M (8/3-16:16:00) (C,951,4) [cui1a] ->
                         160/0.070 secs, 2285 bytes/sec
    uunet!daemon M (8/3-16:16:06) (C,951,5) [cui1a] <-
                         552/2.740 secs, 201 bytes/sec
    uunet!daemon M (8/3-16:16:09) (C,951,6) [cui1a] <-
                         102/1.390 secs, 73 bytes/sec

Note that there are 12 fields; however, the program really only uses fields 1, 6, 7, and 9. Running the program on the sample input produces the following results:

    $ nawk -f uutot.awk uutot.test
    Remote     K-Bytes   K-Bytes   K-Bytes Hr:Mn:Sc Hr:Mn:Sc AvCPS AvCPS    #    #
    SiteName      Recv      Xmit     Total     Recv     Xmit  Recv  Xmit Recv Xmit
    -------- --------- --------- --------- -------- -------- ----- ----- ---- ----
    uunet        0.639     2.458     3.097  0:04:34  2:09:49     2     0    2    4
    isla         0.000     2.022     2.022  0:00:00  0:13:58     0     2    0    4
    -------- --------- --------- --------- -------- -------- ----- ----- ---- ----
    Totals       0.639     4.480     5.119  0:04:34  2:23:47     2     1    2    8

    This nawk application is an excellent example of a clearly written awk program. It is also a typical example of using awk to change a rather obscure UNIX log into a useful report.

Although Cornelius apologizes for the lack of comments that explain the logic of the program, the usage of the program is clear from the initial comments. Also, he uses variables to define search patterns and the report's layout. This helps to simplify conditional and print statements in the body of the program. It also helps that the variables have names which aid in immediately recognizing their purpose.
```

#### 5.18.10.2.2 phonebill--Track Phone Usage

```text
Contributed by Nick Holloway

The problem is to calculate the cost of phone calls made. In the United Kingdom, charges are made for the number of "units" used during the duration of the call (no free local calls). The length of time a "unit" lasts depends on the charge band (linked to distance) and the charge rate (linked to time of day). You get charged a whole unit as soon as the time period begins.

The input to the program is four fields. The first field is the date (not used). The second field is "band/rate" and is used to look up the length a unit will last. The third field is the length of the call. This can either be "ss," "mm:ss," or "hh:mm:ss". The fourth field is the name of the caller. We keep a stopwatch (old cheap digital), a book, and a pen. Come bill time this is fed through my awk script. This only deals with the cost of the calls, not the standing charge.

The aim of the program was to enable the minimum amount of information to be entered by the callers, and the program could be used to collect together the call costs for each user in one report. It is also written so that if British Telecom changes its costs, these can be done easily in the top of the source (this has been done once already). If more charge bands or rates are added, the table can be simply expanded (wonders of associative arrays). There are no real sanity checks done on the input data. The usage is:

    phonebill [ file ... ]

Here is a (short) sample of input and output.

Input:

    29/05   b/p      5:35   Nick
    29/05   L/c   1:00:00   Dale
    01/06   L/c     30:50   Nick

Output:

    Summary for Dale:
    	29/05   L/c  1:00:00  11 units
    Total: 11 units @ 5.06 pence per unit = $0.56
    Summary for Nick:
    	29/05   b/p     5:35  19 units
    	01/06   L/c    30:50   6 units
    Total: 25 units @ 5.06 pence per unit = $1.26

The listing for phonebill follows:

    #!/bin/awk -f
    #------------------------------------------------------------------
    #   Awk script to take in phone usage - and calculate cost for each
    #   person
    #------------------------------------------------------------------
    #   Author: N.Holloway (alfie@cs.warwick.ac.uk)
    #   Date  : 27 January 1989
    #   Place : University of Warwick
    #------------------------------------------------------------------
    #   Entries are made in the form
    #	Date   Type/Rate   Length  Name
    #
    #   Format:
    #	Date		: "dd/mm"		- one word
    #	Type/Rate	: "bb/rr"  (e.g. L/c)
    #	Length		: "hh:mm:ss", "mm:ss", "ss"
    #	Name		: "Fred"		- one word (unique)
    #------------------------------------------------------------------
    #   Charge information kept in array 'c', indexed by "type/rate",
    #   and the cost of a unit is kept in the variable 'pence_per_unit'
    #   The info is stored in two arrays, both indexed by the name. The
    #   first 'summary' has the lines that hold input data, and number 
    #   of units, and 'units' has the cumulative total number of units
    #   used by name.
    #------------------------------------------------------------------

    BEGIN \
        {	
    	# --- Cost per unit
    	pence_per_unit  = 4.40		# cost is 4.4 pence per unit
    	pence_per_unit *= 1.15		# VAT is 15%

    	# --- Table of seconds per unit for different bands/rates
    	#     [ not applicable have 0 entered as value ]
    	c ["L/c"] = 330 ;  c ["L/s"] = 85.0;  c ["L/p"] = 60.0;
    	c ["a/c"] =  96 ;  c ["a/s"] = 34.3;  c ["a/p"] = 25.7;
    	c ["b1/c"]= 60.0;  c ["b1/s"]= 30.0;  c ["b1/p"]= 22.5;
    	c ["b/c"] = 45.0;  c ["b/s"] = 24.0;  c ["b/p"] = 18.0;
    	c ["m/c"] = 12.0;  c ["m/s"] = 8.00;  c ["m/p"] = 8.00;
    	c ["A/c"] = 9.00;  c ["A/s"] = 7.20;  c ["A/p"] = 0   ;
    	c ["A2/c"]= 7.60;  c ["A2/s"]= 6.20;  c ["A2/p"]= 0   ;
    	c ["B/c"] = 6.65;  c ["B/s"] = 5.45;  c ["B/p"] = 0   ;
    	c ["C/c"] = 5.15;  c ["C/s"] = 4.35;  c ["C/p"] = 3.95;
    	c ["D/c"] = 3.55;  c ["D/s"] = 2.90;  c ["D/p"] = 0   ;
    	c ["E/c"] = 3.80;  c ["E/s"] = 3.05;  c ["E/p"] = 0   ;
    	c ["F/c"] = 2.65;  c ["F/s"] = 2.25;  c ["F/p"] = 0   ;
    	c ["G/c"] = 2.15;  c ["G/s"] = 2.15;  c ["G/p"] = 2.15;
        }

        {
    	spu = c [ $2 ]				# look up charge band
    	if ( spu == "" || spu == 0 ) {
    	    summary [ $4 ] = summary [ $4 ] "\n\t" \
    			    sprintf ( "%4s  %4s  %7s   ? units",\
    	                          $1, $2, $3 ) \
    			    " - Bad/Unknown Chargeband"
    	} else {
    	    n = split ( $3, t, ":" )  # calculate length in seconds
    	    seconds = 0
    	    for ( i = 1; i <= n; i++ )
    		seconds = seconds*60 + t[i]
    	    u = seconds / spu   # calculate number of seconds
    	    if ( int( u ) == u )   # round up to next whole unit
    		u = int( u )
    	    else
    		u = int( u ) + 1
    	    units [ $4 ] += u   # store info to output at end
    	    summary [ $4 ] = summary [ $4 ] "\n\t" \
    			    sprintf ( "%4s  %4s  %7s %3d units",\
    	                         $1, $2, $3, u )
    	}
        }

    END \
        {
    	for ( i in units ) {		# for each person
    	    printf ( "Summary for %s:", i ) # newline at start
                                                # of summary
    	    print summary [ i ]			# print summary details
    	    # calc cost
    	    total = int ( units[i] * pence_per_unit + 0.5 )
    	    printf ( \
    		"Total: %d units @ %.2f pence per unit = $%d.%02d\n\n", \
    			    units [i], pence_per_unit, total/100, \
                                                   total%100 )
    	}
        }

    This program is another example of generating a report that consolidates information from a simple record structure.

This program also follows the three-part structure. The BEGIN procedure defines variables that are used throughout the program. This makes it easy to change the program, as phone companies are known to "upwardly revise" their rates. One of the variables is a large array named c in which each element is the number of seconds per unit, using the band over the rate as the index to the array.

The main procedure reads each line of the user log. It uses the second field, which identifies the band/rate, to get a value from the array c. It checks that a positive value was returned and then processes that value by the time specified in $3. The number of units for that call is then stored in an array named units, indexed by the name of the caller ($4). This value accumulates for each caller.

Finally, the END routine prints out the values in the units array, producing the report of units used per caller and the total cost of the calls.
```

#### 5.18.10.2.3 combine--Extract Multipart uuencoded Binaries

```text
Contributed by Rahul Dhesi

Of all the scripts I have ever written, the one I am most proud of is the "combine" script.

While I was moderating comp.binaries.ibm.pc, I wanted to provide users a simple way of extracting multipart uuencoded binaries. I added BEGIN and END headers to each part to enclose the uuencoded part and provided users with the following script:

    cat $* | sed '/^END/,/^BEGIN/d' | uudecode

This script will accept a list of filenames (in order) provided as command-line arguments. It will also accept concatenated articles as standard input.

This script invokes cat in a very useful way that is well known to expert shell script users but not enough used by most others. This allows the user the choice of either providing command-line arguments or standard input.

The script invokes sed to strip out superfluous headers and trailers, except for headers in the first input file and trailers in the last input file. The final result is that the uuencoded part of the multiple input files is extracted and uudecoded. Each input file (see postings in comp.binaries.ibm.pc) has the following form:

    headers
    BEGIN
    uuencoded text
    END

I have lots of other shell stuff, but the above is simplest and has proved useful to several thousand comp.binaries.ibm.pc readers.

This one is pretty obvious but accomplishes a lot. For those who might not understand the use of this command, here is the explanation. A Usenet newsgroup such as comp.binaries.ibm.pc distributes public-domain programs and such. Binaries, the object code created by the compiler, cannot be distributed as news articles unless they are "encoded." A program named uuencode converts the binary to an ASCII representation that can be easily distributed. Furthermore, there are limits on the size of news articles and large binaries are broken up into a series of articles (1 of 3, 2 of 3, 3 of 3, for example). Dhesi would break up the encoded binary into manageable chunks, and then add the BEGIN and END lines to delimit the text that contained encoded binary.

A reader of these articles might save each article in a file. Dhesi's script automates the process of combining these articles and removing extraneous information such as the article header as well as the extra BEGIN and END headers. His script removes lines from the first END up to and including the next BEGIN pattern. It combines all the separate encoded parcels and directs them to uudecode, which converts the ASCII representation to binary.

One has to appreciate the amount of manual editing work avoided by a simple one-line script.
```

#### 5.18.10.2.4 mailavg--Check Size of Mailboxes

```text
Contributed by Wes Morgan

While tuning our mail system, we needed to take a "snapshot" of the users' mailboxes at regular intervals over a 30-day period. This script simply calculates the average size and prints the arithmetic distribution of user mailboxes.

    #! /bin/sh
    #
    # mailavg - average size of files in /usr/mail
    #
    # Written by Wes Morgan, morgan@engr.uky.edu, 2 Feb 90
    ls -Fs /usr/mail | awk '
       { if(NR != 1) {
           total += $1; 
           count += 1;
           size = $1 + 0; 
           if(size == 0) zercount+=1;
           if(size > 0 && size <= 10) tencount+=1;
           if(size > 10 && size <= 19) teencount+=1;
           if(size > 20 && size <= 50) uptofiftycount+=1;
           if(size > 50) overfiftycount+=1;
           }
       }
       END { printf("/usr/mail has %d mailboxes using %d blocks,",
                count,total) 
             printf("average is %6.2f blocks\n", total/count)
             printf("\nDistribution:\n")
             printf("Size      Count\n")
             printf(" O           %d\n",zercount)
             printf("1-10         %d\n",tencount)
             printf("11-20        %d\n",teencount)
             printf("21-50        %d\n",uptofiftycount)
             printf("Over 50      %d\n",overfiftycount)
           }'
    exit 0

Here's a sample output from mailavg:

    $ mailavg
    /usr/mail has 47 mailboxes using 5116 blocks,
    average is 108.85 blocks
    Distribution:
    Size      Count
     O           1
    1-10         13
    11-20        1
    21-50        5
    Over 50      27

    This administrative program is similar to the filesum program
    The conditional expression "NR != 1" could have been put outside the main procedure as a pattern. While the logic is the same, using the expression as a pattern clarifies how the procedure is accessed, making the program easier to understand.

In that procedure, Morgan uses a series of conditionals that allow him to collect distribution statistics on the size of each user's mailbox.
```

#### 5.18.10.2.5 adj--Adjust Lines for Text Files

```text
Contributed by Norman Joseph

[Because the author used his program to format his mail message before sending it, we're preserving the linebreaks and indented paragraphs in presenting it here as the program's example. This program is similar to the BSD fmt program.]

            Well, I decided to take you up on your offer.  I'm sure there are
    more sophisticated gurus out there than me, but I do have a nawk script
    that I'm kind of fond of, so I'm sending it in.

            Ok, here's the low down.  When I'm writing e-mail, I often make a
    lot of changes to the text (especially if I'm going to post on the net).
    So what starts out as a nicely adjusted letter or posting usually ends up
    looking pretty sloppy by the time I'm done adding and deleting lines.  So
    I end up spending a lot of time joining and breaking lines all through my
    document so as to get a nice right-hand margin.  So I say to myself,
    "This is just the kind of tedious work a program would be good for."

            Now, I know I can use nroff to filter my document through and
    adjust the lines, but it has lousy defaults (IMHO) for simple text like
    this.  So, with a view to sharpening my nawk skills I wrote adj.nawk
    and the accompanying shell script wrapper adj.  

    Here's the syntax for the nawk filter adj:


    adj [-l|c|r|b] [-w n] [-i n] [files ...]


    The options are:

-l
    Lines are left adjusted, right ragged (default).

-c
    Lines are centered.

-r
    Lines are right adjusted, left ragged.

-b
    Lines are left and right adjusted.

-w n
    Sets line width to n characters (default is 70).

-i n
    Sets initial indent to n characters (default is 0).

            So, whenever I'm finished with this letter (I'm using vi) I will
    give the command :%!adj -w73 (I like my lines a little longer) and
    all the breaking and joining will be done by a program (the way the Good
    Lord intended :-).  Indents and blank lines are preserved, and two spaces
    are given after any end-of-sentence punctuation.

            The program is naive about tabs, and when computing line lengths,
    it considers a tab character to be one space wide.

            The program is notable for its use of command-line parameter
    assignment, and some of the newer features of awk (nawk), such as the
    match and split built-in functions, and for its use of support functions.

    #! /bin/sh
    #
    # adj - adjust text lines
    #
    # usage: adj [-l|c|r|b] [-w n] [-i n] [files ...]
    #
    # options:
    #    -l    - lines are left adjusted, right ragged (default)
    #    -c    - lines are centered
    #    -r    - lines are right adjusted, left ragged
    #    -b    - lines are left and right adjusted
    #    -w n  - sets line width to <n> characters (default: 70)
    #    -i n  - sets initial indent to <n> characters (default: 0)
    #
    # note:
    #    output line width is -w setting plus -i setting
    #
    # author:
    #    Norman Joseph (amanue!oglvee!norm)

    adj=l
    wid=70
    ind=0

    set -- `getopt lcrbw:i: $*`
    if test $? != 0
    then
        printf 'usage: %s [-l|c|r|b] [-w n] [-i n] [files ...]' $0
        exit 1
    fi

    for arg in $*
    do
        case $arg in
        -l) adj=l;  shift;;
        -c) adj=c;  shift;;
        -r) adj=r;  shift;;
        -b) adj=b;  shift;;
        -w) wid=$2;  shift 2;;
        -i) ind=$2;  shift 2;;
        --) shift;  break;;
        esac
    done

    exec nawk -f adj.nawk type=$adj linelen=$wid indent=$ind $*

Here's the adj.nawk script that's called by the shell script adj.

    # adj.nawk -- adjust lines of text per options
    #
    # NOTE:  this nawk program is called from the shell script "adj"
    #    see that script for usage & calling conventions
    #
    # author:
    #    Norman Joseph (amanue!oglvee!norm)

    BEGIN  {
        FS = "\n"
        blankline  = "^[ \t]*$"
        startblank = "^[ \t]+[^ \t]+"
        startwords = "^[^ \t]+"
    }

    $0 ~ blankline {
        if ( type == "b" )
            putline( outline "\n" )
        else
            putline( adjust( outline, type ) "\n" )
        putline( "\n" )
        outline = ""
    }

    $0 ~ startblank {
        if ( outline != "" ) {
            if ( type == "b" )
                putline( outline "\n" )
            else
                putline( adjust( outline, type ) "\n" )
        }

        firstword = ""
        i = 1
        while ( substr( $0, i, 1 ) ~ "[ \t]" ) {
            firstword = firstword substr( $0, i, 1 )
            i++
        }
        inline = substr( $0, i )
        outline = firstword

        nf = split( inline, word, "[ \t]+" )

        for ( i = 1;  i <= nf;  i++ ) {
            if ( i == 1 ) {
                testlen = length( outline word[i] )
            } else {
                testlen = length( outline " " word[i] )
                if ( match( ".!?:;", "\\" substr( outline,
                        length( outline ), 1 )) )
                    testlen++
            }

            if ( testlen > linelen ) {
                putline( adjust( outline, type ) "\n" )
                outline = ""
            }

            if ( outline == "" )
                outline = word[i]
            else if ( i == 1 )
                outline = outline word[i]
            else {
                if ( match( ".!?:;", "\\" substr( outline,
                       length( outline ), 1 )) )
                    outline = outline "  " word[i]     # 2 spaces
                else
                    outline = outline " " word[i]      # 1 space
            }
        }
    }

    $0 ~ startwords  {
        nf = split( $0, word, "[ \t]+" )

        for ( i = 1;  i <= nf;  i++ ) {
            if ( outline == "" )
                testlen = length( word[i] )
            else {
                testlen = length( outline " " word[i] )
                if ( match( ".!?:;", "\\" substr( outline,
                       length( outline ), 1 )) )
                    testlen++
            }

            if ( testlen > linelen ) {
                putline( adjust( outline, type ) "\n" )
                outline = ""
            }

            if ( outline == "" )
                outline = word[i]
            else {
                if ( match( ".!?:;", "\\" substr( outline,
                       length( outline ), 1 )) )
                    outline = outline "  " word[i]     # 2 spaces
                else
                    outline = outline " " word[i]      # 1 space
            }
        }
    }

    END  {
        if ( type == "b" )
            putline( outline "\n" )
        else
            putline( adjust( outline, type ) "\n" )
    }


    #
    # -- support functions --
    #

    function putline( line,    fmt )
    {
        if ( indent ) {
            fmt = "%" indent "s%s"
            printf( fmt, " ", line )
        } else
            printf( "%s", line )
    }


    function adjust( line, type,    fill, fmt )
    {
        if ( type != "l" )
            fill = linelen - length( line )

        if ( fill > 0 ) {
            if        ( type == "c" ) {
                fmt = "%" (fill+1)/2 "s%s"
                line = sprintf( fmt, " ", line )
            } else if ( type == "r" ) {
                fmt = "%" fill "s%s"
                line = sprintf( fmt, " ", line )
            } else if ( type == "b" ) {
                line = fillout( line, fill )
            }
        }

        return line
    }


    function fillout( line, need,    i, newline, nextchar, blankseen )
    {
        while ( need ) {
            newline = ""
            blankseen = 0

            if ( dir == 0 ) {
                for ( i = 1;  i <= length( line );  i++ ) {
                    nextchar = substr( line, i, 1 )
                    if ( need ) {
                        if ( nextchar == " " ) {
                            if ( ! blankseen ) {
                                newline = newline " "
                                need--
                                blankseen = 1
                            }
                        } else {
                            blankseen = 0
                        }
                    }
                    newline = newline nextchar
                }

            } else if ( dir == 1 ) {
                for ( i = length( line );  i >= 1;  i-- ) {
                    nextchar = substr( line, i, 1 )
                    if ( need ) {
                        if ( nextchar == " " ) {
                            if ( ! blankseen ) {
                                newline = " " newline
                                need--
                                blankseen = 1
                            }
                        } else {
                            blankseen = 0
                        }
                    }
                    newline = nextchar newline
                }
            }

            line = newline

            dir = 1 - dir
        }

        return line
    }

    This small text formatter is a nifty program for those of us who use text editors. It allows you to set the maximum line width and justify paragraphs and thus can be used to format mail messages or simple letters.

The adj shell script does all the option setting, although it could have been done by reading ARGV in the BEGIN action. Using the shell to establish command-line parameters is probably easier for those who are already familiar with the shell.

The lack of comments in the adj.awk script makes this script more difficult to read than some of the others. The BEGIN procedure assigns three regular expressions to variables: blankline, startblank, startwords. This is a good technique (one that you'll see used in lex specifications) because regular expressions can be difficult to read and the name of the variable makes it clear what it matches. Remember that modern awks lets you supply a regular expression as a string, in a variable.

There are three main procedures, which can be named by the variable they match. The first is blankline, a procedure which handles collected text once a blank line is encountered. The second is startblank, which handles lines that begin with whitespace (spaces or tabs). The third is startwords, which handles a line of text. The basic procedure is to read a line of text and determine how many of the words in that line will fit, given the line width, outputting those that will fit and saving those that will not in the variable outline. When the next input line is read, the contents of outline must be output before that line is output.

The adjust() function does the work of justifying the text based on a command-line option specifying the format type. All types except "l" (left-adjusted, right-ragged) need to be filled. Therefore, the first thing this function does is figure out how much "fill" is needed by subtracting the length of the current line from the specified line length. It makes excellent use of the sprintf() function to actually do the positioning of the text. For instance, to center text, the value of fill (plus 1) is divided by 2 to determine the amount of padding needed on each side of the line. This amount is passed through the fmt variable as the argument to sprintf():

    fmt = "%" (fill+1)/2 "s%s"
                line = sprintf( fmt, " ", line )

Thus, the space will be used to pad a field that is the length of half the amount of fill needed.

If text is right-justified, the value of fill itself is used to pad the field. Finally, if the format type is "b" (block), then the function fillout is called to determine where to add spaces that will fill out the line.

In looking over the design of the program, you can see, once again, how the use of functions helps to clarify what a program is doing. It helps to think of the main procedure as controlling the flow of input through the program while procedures handle the operations performed on the input. Separating the "operations" from the flow control makes the program readable and more easily maintained.

In passing, we're not sure why FS, the field separator, is set to newline in the BEGIN procedure. This means that the field and record separators are the same (i.e., $0 and $1 are the same). The split() function is called to break the line into fields using tabs or spaces as the delimiter.

    nf = split( $0, word, "[ \t]+" )

It would seem that the field separator could have been set to the same regular expression, as follows:

    FS = "[ \t]+"

It would be more efficient to use the default field parsing.

Finally, using the match() function to find punctuation is inefficient; it would have been better to use index().
```

#### 5.18.10.2.6 lpr--lpr Preprocessor

```text
Contributed by Tom Van Raalte

I thought you might want to use the following script around the office. It is a preprocessor for lpr that sends output to the "best" printer. [This shell script is written for a BSD or Linux system and you would use this command in place of lpr. It reads the output of the lpq command to determine if a specific printer is available. If not, it tries a list of printers to see which one is available or which is the least busy. Then it invokes lpr to send the job to that printer.]

    #!/bin/sh
    #
    #set up temp file
    TMP=/tmp/printsum.$$
    LASERWRITER=${LASERWRITER-ps6}
    #Check to see if the default printer is free?
    #
    #
    FREE=`lpq -P$LASERWRITER | awk '
    { if ($0 == "no entries") 
      {
    	val=1
    	print val
    	exit 0
      }
      else
      {
    	val=0
    	print val
    	exit 0
      }
    }'`
    #echo Free is $FREE
    #
    #If the default is free then $FREE is set, and we print and exit.
    #
    if [ $FREE -eq 1 ] 
    then
    	SELECT=$LASERWRITER
    #echo selected $SELECT
    	lpr -P$SELECT $*
    	exit 0
    fi
    #echo Past the exit
    #
    #Now we go on to see if any of the printers in bank are free.  
    #
    BANK=${BANK-$LASERWRITER}
    #echo bank is $BANK
    #
    #If BANK is the same as LASERWRITER, then we have no choice.
    #otherwise, we print on the one that is free, if any are free.
    #
    if [ "$BANK" =  "$LASERWRITER" ] 
    then
    	SELECT=$LASERWRITER
    	lpr -P$SELECT $*
    	exit 0
    fi
    #echo past the check bank=laserprinter
    #
    #Now we check for a free printer.
    #Note that $LASERWRITER is checked again in case it becomes free
    #during the check.
    #
    #echo now we check the other for a free one
    for i in $BANK $LASERWRITER
    do
    FREE=`lpq -P$i | awk '
    { if ($0 == "no entries") 
      {
    	val=1
    	print val
    	exit 0
      }
      else
      {
    	val=0
    	print val
    	exit 0
      }
    }'`
    if [ $FREE -eq 1 ]
    then
    #   echo in loop for $i
    	SELECT=$i
    #   echo select is $SELECT
    #   if [ "$FREE" != "$LASERWRITER" ]
    #   then
    #          echo "Output redirected to printer $i"
    #   fi
    	lpr -P$SELECT $*
    	exit 0
    fi
    done
    #echo done checking for a free one
    # 
    #If we make it here then no printers are free.  So we 
    #print on the printer with the least bytes queued.
    #
    #
    for i in $BANK $LASERWRITER
    do
    val=`lpq -P$i | awk ' BEGIN {
    	start=0;
    }
    /^Time/ {
    	start=1; 
    	next;
    }
    (start == 1){
    	test=substr($0,62,20);
    	print test;
    } ' | awk '
    BEGIN {
    	summ=0;
    }
    {
    	summ=summ+$1;
    }
    END {
    	print summ;
    }'`
    echo "$i $val" >> $TMP
    done

    SELECT=`awk '(NR==1) {
    	select=$1;
    	best=$2
    }
    ($2 < best) {
    	select=$1; 
    	best=$2} 
    END {
    	print select
    }
    ' $TMP `
    #echo $SELECT
    #
    rm $TMP
    #Now print on the selected printer
    #if [ $SELECT != $LASERWRITER ]
    #then
    #   echo "Output redirected to printer $i"
    #fi
    lpr -P$SELECT $*
    trap 'rm -f $TMP; exit 99' 2 3 15

    For the most part, we've avoided scripts like these in which most of the logic is coded in the shell script. However, such a minimalist approach is representative of a wide variety of uses of awk. Here, awk is called to do only those things that the shell script can't do (or do as easily). Manipulating the output of a command and performing numeric comparisons is an example of such a task.

As a side note, the trap statement at the end should be at the top of the script, not at the bottom.
```

#### 5.18.10.2.7 transpose--Perform a Matrix Transposition

```text
Contributed by Geoff Clare

transpose performs a matrix transposition on its input. I wrote this when I saw a script to do this job posted to the Net and thought it was horribly inefficient. I posted mine as an alternative with timing comparisons. If I remember rightly, the original one stored all the elements individually and used a nested loop with a printf for each element. It was immediately obvious to me that it would be much faster to construct the rows of the transposed matrix "on the fly."

My script uses ${1+"$@"} to supply file names on the awk command line so that if no files are specified awk will read its standard input. This is much better than plain $* which can't handle filenames containing whitexspace.

    #! /bin/sh
    # Transpose a matrix: assumes all lines have same number
    # of fields

    exec awk '
    NR == 1 {
    	n = NF
    	for (i = 1; i <= NF; i++)
    		row[i] = $i
    	next
    }
    {
    	if (NF > n)
    		n = NF
    	for (i = 1; i <= NF; i++)
    		row[i] = row[i] " " $i
    }
    END {
    	for (i = 1; i <= n; i++)
    		print row[i]
    }' ${1+"$@"}

Here's a test file:

    1 2 3 4
    5 6 7 8
    9 10 11 12

Now we run transpose on the file.

    $ transpose test
    1 5 9
    2 6 10
    3 7 11
    4 8 12

    This is a very simple but interesting script. It creates an array named row and appends each field into an element of the array. The END procedure outputs the array.
```

#### 5.18.10.2.8 m1--Simple Macro Processor

```text
Contributed by Jon Bentley

The m1 program is a "little brother" to the m4 macro processor found on UNIX systems. It was originally published in the article m1: A Mini Macro Processor, in Computer Language, June 1990, Volume 7, Number 6, pages 47-61. This program was brought to my attention by Ozan Yigit. Jon Bentley kindly sent me his current version of the program, as well as an early draft of his article (I was having trouble getting a copy of the published one). A PostScript version of this paper is included with the example programs, available from O'Reilly's FTP server (see the Preface). I wrote these introductory notes, and the program notes below. [A.R.]

A macro processor copies its input to its output, while performing several jobs. The tasks are:

   a.  Define and expand macros. Macros have two parts, a name and a body. All occurrences of a macro's name are replaced with the macro's body.
   b.  Include files. Special include directives in a data file are replaced with the contents of the named file. Includes can usually be nested, with one included file including another. Included files are processed for macros.
   c.  Conditional text inclusion and exclusion. Different parts of the text can be included in the final output, often based upon whether a macro is or isn't defined.
   d.  Depending on the macro processor, comment lines can appear that will be removed from the final output.

If you're a C or C++ programmer, you're already familiar with the built-in preprocessor in those languages. UNIX systems have a general-purpose macro processor called m4. This is a powerful program, but somewhat difficult to master, since macro definitions are processed for expansion at definition time, instead of at expansion time. m1 is considerably simpler than m4, making it much easier to learn and to use.

Here is Jon's first cut at a very simple macro processor. All it does is define and expand macros. We can call it m0a. In this and the following programs, the "at" symbol (@) distinguishes lines that are directives, and also indicates the presence of macros that should be expanded.

    /^@define[ \t]/ {
    	name = $2
    	$1 = $2 = ""; sub(/^[ \t]+/, "")
    	symtab[name] = $0
    	next
    }
    {
    	for (i in symtab)
    		gsub("@" i "@", symtab[i])
    	print
    }

This version looks for lines beginning with "@define." This keyword is $1 and the macro name is taken to be $2. The rest of the line becomes the body of the macro. The next input line is then fetched using next. The second rule simply loops through all the defined macros, performing a global substitution of each macro with its body in the input line, and then printing the line. Think about the tradeoffs in this version of simplicity versus program execution time.

The next version (m0b) adds file inclusion:

    function dofile(fname) {
    	while (getline <fname > 0) {
    		if (/^@define[ \t]/) {		# @define name value
    			name = $2
    			$1 = $2 = ""; sub(/^[ \t]+/, "")
    			symtab[name] = $0
    		} else if (/^@include[ \t]/)	# @include filename
    			dofile($2)
    		else {				# Anywhere in line @name@
    			for (i in symtab)
    				gsub("@" i "@", symtab[i])
    			print
    		}
    	}
    	close(fname)
    }
    BEGIN {
    	if (ARGC == 2)
    		dofile(ARGV[1])
    	else
    		dofile("/dev/stdin")
    }

Note the way dofile() is called recursively to handle nested include files.

With all of that introduction out of the way, here is the full-blown m1 program.

    #! /bin/awk -f
    # NAME
    #
    # m1
    #
    # USAGE
    #
    # awk -f m1.awk [file...]
    #
    # DESCRIPTION
    #
    # M1 copies its input file(s) to its output unchanged except as modified by
    # certain "macro expressions."  The following lines define macros for
    # subsequent processing:
    #
    #     @comment Any text
    #     @@                     same as @comment
    #     @define name value
    #     @default name value    set if name undefined
    #     @include filename
    #     @if varname            include subsequent text if varname != 0
    #     @unless varname        include subsequent text if varname == 0
    #     @fi                    terminate @if or @unless
    #     @ignore DELIM          ignore input until line that begins with DELIM
    #     @stderr stuff          send diagnostics to standard error
    #
    # A definition may extend across many lines by ending each line with
    # a backslash, thus quoting the following newline.
    #
    # Any occurrence of @name@ in the input is replaced in the output by
    # the corresponding value.
    #
    # @name at beginning of line is treated the same as @name@.
    #
    # BUGS
    #
    # M1 is three steps lower than m4.  You'll probably miss something
    # you have learned to expect.
    #
    # AUTHOR
    #
    # Jon L. Bentley, jlb@research.bell-labs.com
    #

    function error(s) {
    	print "m1 error: " s | "cat 1>&2"; exit 1
    }

    function dofile(fname,  savefile, savebuffer, newstring) {
    	if (fname in activefiles)
    		error("recursively reading file: " fname)
    	activefiles[fname] = 1
    	savefile = file; file = fname
    	savebuffer = buffer; buffer = ""
    	while (readline() != EOF) {
    		if (index($0, "@") == 0) {
    			print $0
    		} else if (/^@define[ \t]/) {
    			dodef()
    		} else if (/^@default[ \t]/) {
    			if (!($2 in symtab))
    				dodef()
    		} else if (/^@include[ \t]/) {
    			if (NF != 2) error("bad include line")
    			dofile(dosubs($2))
    		} else if (/^@if[ \t]/) {
    			if (NF != 2) error("bad if line")
    			if (!($2 in symtab) || symtab[$2] == 0)
    				gobble()
    		} else if (/^@unless[ \t]/) {
    			if (NF != 2) error("bad unless line")
    			if (($2 in symtab) && symtab[$2] != 0)
    				gobble()
    		} else if (/^@fi([ \t]?|$)/) { # Could do error checking here
    		} else if (/^@stderr[ \t]?/) { 
    			print substr($0, 9) | "cat 1>&2"
    		} else if (/^@(comment|@)[ \t]?/) {
    		} else if (/^@ignore[ \t]/) { # Dump input until $2
    			delim = $2
    			l = length(delim)
    			while (readline() != EOF)
    				if (substr($0, 1, l) == delim)
    					break
    		} else {
    			newstring = dosubs($0)
    			if ($0 == newstring || index(newstring, "@") == 0)
    				print newstring
    			else
    				buffer = newstring "\n" buffer
    		}
    	}
    	close(fname)
    	delete activefiles[fname]
    	file = savefile
    	buffer = savebuffer
    }

    # Put next input line into global string "buffer"
    # Return "EOF" or "" (null string)

    function readline(  i, status) {
    	status = ""
    	if (buffer != "") {
    		i = index(buffer, "\n")
    		$0 = substr(buffer, 1, i-1)
    		buffer = substr(buffer, i+1)
    	} else {
    		# Hume: special case for non v10: if (file == "/dev/stdin")
    		if (getline <file <= 0)
    			status = EOF
    	}
    	# Hack: allow @Mname at start of line w/o closing @
    	if ($0 ~ /^@[A-Z][a-zA-Z0-9]*[ \t]*$/)
    		sub(/[ \t]*$/, "@")
    	return status
    }

    function gobble(  ifdepth) {
    	ifdepth = 1
    	while (readline() != EOF) {
    		if (/^@(if|unless)[ \t]/)
    			ifdepth++
    		if (/^@fi[ \t]?/ && --ifdepth <= 0)
    			break
    	}
    }

    function dosubs(s,  l, r, i, m) {
    	if (index(s, "@") == 0)
    		return s
    	l = ""	# Left of current pos; ready for output
    	r = s	# Right of current; unexamined at this time
    	while ((i = index(r, "@")) != 0) {
    		l = l substr(r, 1, i-1)
    		r = substr(r, i+1)	# Currently scanning @
    		i = index(r, "@")
    		if (i == 0) {
    			l = l "@"
    			break
    		}
    		m = substr(r, 1, i-1)
    		r = substr(r, i+1)
    		if (m in symtab) {
    			r = symtab[m] r
    		} else {
    			l = l "@" m
    			r = "@" r
    		}
    	}
    	return l r
    }

    function dodef(fname,  str, x) {
    	name = $2
    	sub(/^[ \t]*[^ \t]+[ \t]+[^ \t]+[ \t]*/, "")  # OLD BUG: last * was +
    	str = $0
    	while (str ~ /\\$/) {
    		if (readline() == EOF)
    			error("EOF inside definition")
    		x = $0
    		sub(/^[ \t]+/, "", x)
    		str = substr(str, 1, length(str)-1) "\n" x
    	}
    	symtab[name] = str
    }

    BEGIN {	EOF = "EOF"
    	if (ARGC == 1)
    		dofile("/dev/stdin")
    	else if (ARGC >= 2) {
    		for (i = 1; i < ARGC; i++)
    			dofile(ARGV[i])
    	} else
    		error("usage: m1 [fname...]")
    }
The program is nicely modular, with an error() function similar to the one presented in Chapter 11, "A Flock of awks", and each task cleanly divided into separate functions.

The main program occurs in the BEGIN procedure at the bottom. It simply processes either standard input, if there are no arguments, or all of the files named on the command line.

The high-level processing happens in the dofile() function, which reads one line at a time, and decides what to do with each line. The activefiles array keeps track of open files. The variable fname indicates the current file to read data from. When an "@include" directive is seen, dofile() simply calls itself recursively on the new file, as in m0b. Interestingly, the included filename is first processed for macros. Read this function carefully--there are some nice tricks here.

The readline() function manages the "pushback." After expanding a macro, macro processors examine the newly created text for any additional macro names. Only after all expanded text has been processed and sent to the output does the program get a fresh line of input.

The dosubs() function actually performs the macro substitution. It processes the line left-to-right, replacing macro names with their bodies. The rescanning of the new line is left to the higher-level logic that is jointly managed by readline() and dofile(). This version is considerably more efficient than the brute-force approach used in the m0 programs.

Finally, the dodef() function handles the defining of macros. It saves the macro name from $2, and then uses sub() to remove the first two fields. The new value of $0 now contains just (the first line of) the macro body. The Computer Language article explains that sub() is used on purpose, in order to preserve whitespace in the macro body. Simply assigning the empty string to $1 and $2 would rebuild the record, but with all occurrences of whitespace collapsed into single occurrences of the value of OFS (a single blank). The function then proceeds to gather the rest of the macro body, indicated by lines that end with a "\". This is an additional improvement over m0: macro bodies can be more than one line long.

The rest of the program is concerned with conditional inclusion or exclusion of text; this part is straightforward. What's nice is that these conditionals can be nested inside each other.

m1 is a very nice start at a macro processor. You might want to think about how you could expand upon it; for instance, by allowing conditionals to have an "@else" clause; processing the command line for macro definitions; "undefining" macros, and the other sorts of things that macro processors usually do.
```
