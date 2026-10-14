---
type: reference
title: Example
description: Subsection 5.11 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.11"
---

# 5.11 Example

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	One of the more confusing subtleties of programming in awk is passing parameters into a script. A parameter assigns a value to a variable that can be accessed within the awk script. The variable can be set on the command line, after the script and before the filename.

    awk 'script' var=value inputfile

Each parameter must be interpreted as a single argument. Therefore, spaces are not permitted on either side of the equal sign. Multiple parameters can be passed this way. For instance, if you wanted to define the variables high and low from the command line, you could invoke awk as follows:

    $ awk -f scriptfile high=100 low=60 datafile

Inside the script, these two variables are available and can be accessed as any awk variable. If you were to put this script in a shell script wrapper, then you could pass the shell's command-line arguments as values. (The shell makes available command-line arguments in the positional variables--$1 for the first parameter, $2 for the second, and so on.)[52] For instance, look at the shell script version of the previous command:

    [52]Careful! Don't confuse the shell's parameters with awk's field variables.

    awk -f scriptfile "high=$1" "low=$2" datafile

If this shell script were named awket, it could be invoked as:

    $ awket 100 60

"100" would be $1 and passed as the value assigned to the variable high.

In addition, environment variables or the output of a command can be passed as the value of a variable. Here are two examples:

    awk '{ ... }' directory=$cwd file1 ...
    awk '{ ... }' directory=`pwd` file1 ...

"$cwd" returns the value of the variable cwd, the current working directory (csh only). The second example uses backquotes to execute the pwd command and assign its result to the variable directory (this is more portable).

You can also use command-line parameters to define system variables, as in the following example:

#    $ awk '{ print NR, $0 }' OFS='. ' names
#    1. Tom 656-5789
#    2. Dale 653-2133
#    3. Mary 543-1122
#    4. Joe 543-2211

The output field separator is redefined to be a period followed by a space.

An important restriction on command-line parameters is that they are not available in the BEGIN procedure. That is, they are not available until after the first line of input is read. Why? Well, here's the confusing part. A parameter passed from the command line is treated as though it were a filename. The assignment does not occur until the parameter, if it were a filename, is actually evaluated.

Look at the following script that sets a variable n as a command-line parameter.

    awk  'BEGIN { print n }
    {
    if (n == 1) print "Reading the first file"
    if (n == 2) print "Reading the second file"
    }' n=1 test n=2 test2

There are four command-line parameters: "n=1," "test," "n=2," and "test2". Now, if you remember that a BEGIN procedure is "what we do before processing input," you'll understand why the reference to n in the BEGIN procedure returns nothing. So the print statement will print a blank line. If the first parameter were a file and not a variable assignment, the file would not be opened until the BEGIN procedure had been executed.

The variable n is given an initial value of 1 from the first parameter. The second parameter supplies the name of the file. Thus, for each line in test, the conditional "n == 1" will be true. After the input is exhausted from test, the third parameter is evaluated, and it sets n to 2. Finally, the fourth parameter supplies the name of a second file. Now the conditional "n == 2" in the main procedure will be true.

One consequence of the way parameters are evaluated is that you cannot use the BEGIN procedure to test or verify parameters that are supplied on the command line. They are available only after a line of input has been read. You can get around this limitation by composing the rule "NR == 1" and using its procedure to verify the assignment. Another way is to test the command-line parameters in the shell script before invoking awk.

POSIX awk provides a solution to the problem of defining parameters before any input is read. The -v option[53] specifies variable assignments that you want to take place before executing the BEGIN procedure (i.e., before the first line of input is read.) The -v option must be specified before a command-line script. For instance, the following command uses the -v option to set the record separator for multiline records.

    [53]The -v option was not part of the original (1987) version of nawk (still used on SunOS 4.1.x systems and some System V Release 3.x systems). It was added in 1989 after Brian Kernighan of Bell Labs, the GNU awk authors, and the authors of MKS awk agreed on a way to set variables on the command line that would be available inside the BEGIN block. It is now part of the POSIX specification for awk.

    $ awk -F"\n" -v RS="" '{ print }' phones.block

A separate -v option is required for each variable assignment that is passed to the program.

Awk also provides the system variables ARGC and ARGV
```
