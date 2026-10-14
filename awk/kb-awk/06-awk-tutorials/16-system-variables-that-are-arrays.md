---
type: reference
title: System Variables That Are Arrays
description: Subsection 5.15 of Awk Tutorials.
tags: [kb-awk, awk, tutorials, tutorialspoint]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.15"
---

# 5.15 System Variables That Are Arrays

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

```text
	Awk provides two system variables that are arrays:

ARGV
    An array of command-line arguments, excluding the script itself and any options specified with the invocation of awk. The number of elements in this array is available in ARGC. The index of the first element of the array is 0 (unlike all other arrays in awk but consistent with C) and the last is ARGC - 1.

ENVIRON
    An array of environment variables. Each element of the array is the value in the current environment and the index is the name of the environment variable.
```

### 5.15.1 An Array of Command-Line Parameters

```text
		You can write a loop to reference all the elements of the ARGV array.

    # argv.awk - print command-line parameters
    BEGIN { for (x = 0; x < ARGC; ++x)
    	    print ARGV[x]
    	print ARGC
    }

This example also prints out the value of ARGC, the number of command-line arguments. Here's an example of how it works on a sample command line:

    $ awk -f argv.awk 1234 "John Wayne" Westerns n=44 -
    awk
    1234
    John Wayne
    Westerns
    n=44
    - 
    6

    As you can see, there are six elements in the array. The first element is the name of the command that invoked the script. The last argument, in this case, is the filename, "-", for standard input. Note the "-f argv.awk" does not appear in the parameter list.

Generally, the value of ARGC will be at least 2. If you don't want to refer to the program name or the filename, you can initialize the counter to 1 and then test against ARGC - 1 to avoid referencing the last parameter (assuming that there is only one filename).

Remember that if you invoke awk from a shell script, the command-line parameters are passed to the shell script and not to awk. You have to pass the shell script's command-line parameters to the awk program inside the shell script. For instance, you can pass all command-line parameters from the shell script to awk, using "$*". Look at the following shell script:

    awk '
    # argv.sh - print command-line parameters
    BEGIN {
    	for (x = 0; x < ARGC; ++x)
    		print ARGV[x]
    	print ARGC
    }' $*

This shell script works the same as the first example of invoking awk.

	This shell script works the same as the first example of invoking awk.

One practical use is to test the command-line parameters in the BEGIN rule using a regular expression. The following example tests that all the parameters, except the first, are integers.

    # number.awk - test command-line parameters
    BEGIN {
    	for (x = 1; x < ARGC; ++x)
    		if ( ARGV[x] !~ /^[0-9]+$/ ) {
    			print ARGV[x], "is not an integer."
    			exit 1
    		}
    }

If the parameters contain any character that is not a digit, the program will print the message and quit.
	If the parameters contain any character that is not a digit, the program will print the message and quit.

After testing the value, you can, of course, assign it to a variable. For instance, we could write a BEGIN procedure of a script that checks the command-line parameters before prompting the user. Let's look at the following shell script that uses the phone and address database from the previous chapter:

    awk '# phone - find phone number for person 
    # supply name of person on command line or at prompt.
    BEGIN { FS = "," 
    	# look for parameter
    	if ( ARGC > 2 ){ 
    		name = ARGV[1]
    		delete ARGV[1]
    	} else { 

    		# loop until we get a name
    		while (! name) { 
    			printf("Enter a name? ")
    			getline name < "-"
    		}
    	}
    }
    $1 ~ name {
    	print $1, $NF 
    }' $* phones.data

We test the ARGC variable to see if there are more than two parameters. By specifying "$*", we can pass all the parameters from the shell command line inside to the awk command line. If this parameter has been supplied, we assume the second parameter, ARGV[1], is the one we want and it is assigned to the variable name. Then that parameter is deleted from the array. This is very important if the parameter that is supplied on the command line is not of the form "var=value"; otherwise, it will later be interpreted as a filename. If additional parameters are supplied, they will be interpreted as filenames of alternative phone databases. If there are not more than two parameters, then we prompt for the name. The getline function is discussed in Chapter 10, "The Bottom Drawer"; using this syntax, it reads the next line from standard input.

Here is an example of this script in action:
$ phone  Yosi
Yosi 0500000001

Because you can add to and delete from the ARGV array, there is the potential for doing a lot of interesting manipulation. You can place a filename at the end of the ARGV array, for instance, and it will be opened as though it were specified on the command line. Similarly, you can delete a filename from the array and it will never be opened. Note that if you add new elements to ARGV, you should also increment ARGC; awk uses the value of ARGC to know how many elements in ARGV it should process. Thus, simply decrementing ARGC will keep awk from examining the final element in ARGV.

As a special case, if the value of an ARGV element is the empty string (""), awk will skip over it and continue on to the next element.
```

### 5.15.2 An Array of Environment Variables

```text
		The ENVIRON array was added independently to both gawk and MKS awk. It was then added to the System V Release 4 nawk, and is now included in the POSIX standard for awk. It allows you to access variables in the environment. The following script loops through the elements of the ENVIRON array and prints them.

    # environ.awk - print environment variable
    BEGIN {
    	for (env in ENVIRON)
    		print env "=" ENVIRON[env]
    }

The index of the array is the variable name. The script generates the same output produced by the env command (printenv on some systems).

    $ awk -f environ.awk
    DISPLAY=scribe:0.0
    FRAME=Shell 3
    LOGNAME=dale
    MAIL=/usr/mail/dale
    PATH=:/bin:/usr/bin:/usr/ucb:/work/bin:/mac/bin:.
    TERM=mac2cs
    HOME=/work/dale
    SHELL=/bin/csh
    TZ=PST8PDT
    EDITOR=/usr/bin/vi

    You can reference any element, using the variable name as the index of the array:

    ENVIRON["LOGNAME"]

You can also change any element of the ENVIRON array.

    ENVIRON["LOGNAME"] = "Tom"

However, this change does not affect the user's actual environment (i.e., when awk is done, the value of LOGNAME will not be changed) nor does it affect the environment inherited by programs that are invoked from awk via the getline or system() functions
```
