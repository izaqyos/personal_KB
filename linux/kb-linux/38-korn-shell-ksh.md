---
type: reference
title: korn shell ksh
description: "Korn shell tutorial: introduction, variables and basics."
tags: [shell, unix, tutorial, examples, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#38"
---

# korn shell ksh

[↑ KB_Linux](/linux/kb-linux/README.md)

## 38.1 Tutorial

### 38.1.1 intro

```text
Step 2. Understand variables.

Hopefully, you already understand the concept of a variable. It is a place you can store a value to, and then do operations on "whatever is in this place",vs the value directly.
In shellscripts, a variable can contain a collection of letters and/or numbers [aka a 'string'] , as well as pure numbers.

You set a variable by using

variablename="some string here"
  OR
variablename=1234
You access what is IN a variable, by putting a dollar-sign in front of it.
echo $variablename
  OR
echo ${variablename}
If you have JUST a number in a variable, you can do math operations on it. But that comes later on in this tutorial.
Step 3. Put everything in appropriate variables

Well, okay, not EVERYTHING :-) But properly named variables make the script more easily readable. There isn't really a 'simple' example for this, since it is only "obvious" in large scripts. So either just take my word for it, or stop reading and go somewhere else now!
An example of "proper" variable naming practice:


#Okay, this script doesnt do anything useful, it is just for demo purposes.
# and normally, I would put in more safety checks, but this is a quickie.
INPUTFILE="$1"
USERLIST="$2"
OUTPUTFILE="$3"

count=0

while read username ; do
	grep $username $USERLIST >>$OUTPUTFILE
	count=$(($count+1))
done < $INPUTFILE
echo user count is $count	

While the script may not be totally readable to you yet, I think you'll agree it is a LOT clearer than the following;


i=0
while read line ; do
	grep $line $2 >> $3
	i=$(($i+1))
done <$1
echo $i

Note that '$1' means the first argument to your script.
'$*' means "all the arguments together
'$#' means "how many arguments are there?"

Step 4. Know your quotes

It is very important to know when, and what type, of quotes to use.
Quotes are generally used to group things together into a single entity.
Single-quotes are literal quotes.
Double-quotes can have their contents expanded
 echo "$PWD"
prints out your current directory
 echo '$PWD'
prints out the string $PWD
 echo $PWDplusthis
prints out NOTHING. There is no such variable "PWDplusthis
 echo "$PWD"plusthis
prints out your current directory, and the string "plusthis" immediately following it. You could also accomplish this with the alternate form of using variables,
 echo ${PWD}plusthis
There is also what is sometimes called the `back quote`, or ` backtick`: This is not used to quote things, but actually to evaluate and run commands.
```

### 38.1.2 Ksh basics

```text
This is a quickie page to run through basic "program flow control" commands, if you are completely new to shell programming. The basic ways to shape a program, are loops, and conditionals. Conditionals say "run this command, IF some condition is true". Loops say "repeat these commands" (usually, until some condition is met, and then you stop repeating).
Conditionals

IF

The basic type of condition is "if".
if [ $? -eq 0 ] ; then
	print we are okay
else
	print something failed
fi
IF the variable $? is equal to 0, THEN print out a message. Otherwise (else), print out a different message. FYI, "$?" checks the exit status of the last command run.
The final 'fi' is required. This is to allow you to group multiple things together. You can have multiple things between if and else, or between else and fi, or both.
You can even skip the 'else' altogether, if you dont need an alternate case.

if [ $? -eq 0 ] ; then
	print we are okay
	print We can do as much as we like here
fi
CASE

The case statement functions like 'switch' in some other languages. Given a particular variable, jump to a particular set of commands, based on the value of that variable.
While the syntax is similar to C on the surface, there are some major differences;

The variable being checked can be a string, not just a number
There is no "fall through" with ;;. You hit only one set of commands.. UNLESS you use ";&" instead of ";;'
To make up for no 'fall through', you can 'share' variable states
You can use WILDCARDS to match strings
echo input yes or no
read  answer
case $answer in
	yes|Yes|y)
		echo got a positive answer
		# the following ';;' is mandatory for every set
		# of comparative xxx)  that you do
		;;
	no)
		echo got a 'no'
		;;
	q*|Q*)
		#assume the user wants to quit
		exit
		;;
		
	*)
		echo This is the default clause. we are not sure why or
		echo what someone would be typing, but we could take
		echo action on it here
		;;
esac
Loops

WHILE

The basic loop is the 'while' loop; "while" something is true, keep looping.
There are two ways to stop the loop. The obvious way is when the 'something' is no longer true. The other way is with a 'break' command.

keeplooping=1;
while [[ $keeplooping -eq 1 ]] ; do
	read quitnow
	if [[ "$quitnow" = "yes" ]] ; then
		keeplooping=0
	fi
	if [[ "$quitnow" = "q" ]] ; then
		break;
	fi
done
UNTIL

The other kind of loop in ksh, is 'until'. The difference between them is that 'while' implies looping while something remains true.
'until', implies looping until something false, becomes true
until [[ $stopnow -eq 1 ]] ; do
	echo just run this once
	stopnow=1;
	echo we should not be here again.
done
FOR

A "for loop", is a "limited loop". It loops a specific number of times, to match a specific number of items. Once you start the loop, the number of times you will repeat is fixed.
The basic syntax is

for var in one two three ; do
	echo $var
done
Whatever name you put in place of 'var', will be updated by each value following "in". So the above loop will print out
one
two
three
But you can also have variables defining the item list. They will be checked ONLY ONCE, when you start the loop.
list="one two three"
for var in $list ; do
	echo $var
	# Note: Changing this does NOT affect the loop items
	list="nolist"
done
The two things to note are:
It stills prints out "one" "two" "three"
Do NOT quote "$list", if you want the 'for' command to use multiple items
If you used "$list" in the 'for' line, it would print out a SINGLE LINE, "one two three"
```

### 38.1.3 Advanced variable usage

```text
Braces

Sometimes, you want to immediately follow a variable with a string. This can cause issues if you use the typical grammar of "echo $a" to use a variable, since ksh by default, attempts to do "intelligent" parsing of variable names, but it cannot read your mind.
Compare the difference in output in the following lines:
two=2
print one$twothree
print one${two}three
There is no variable named "twothree", so ksh defaults it to an empty value, for the first print line. However, when you use braces to explicitly show ksh {this is the variable name}, it understands that you want the variable named "two", to be expanded in the middle of those other letters.
Arrays

Yes, you CAN have arrays in ksh, unlike old bourne shell. The syntax is as follows:

# This is an OPTIONAL way to quickly null out prior values
set -A array
#
array[1]="one"
array[2]="two"
array[3]="three"
three=3

print ${array[1]}
print ${array[2]}
print ${array[3]}
print ${array[three]}  #This is interpreted as array[3]

Note that ksh automatically dereferences names inbetween [], to be variable values. Unfortunately, ksh does not seem to handle associative arrays. (storing values indexed by a string 'abcd', rather than a number index)
Special variables

There are some "special" variables that ksh itself gives values to. Here are the ones I find interesting
PWD - always the current directory
RANDOM - a different number every time you access it
$$ - the current process id (of the script, not the user's shell)
PPID - the "parent process"s ID. (BUT NOT ALWAYS, FOR FUNCTIONS)
$? - exit status of last command run by the script
PS1 - your "prompt". "PS1='$PWD:> '" is interesting.
$1 to $9 - arguments 1 to 9 passed to your script or function (you can actually have higher, but you need to use braces for those)
Tweaks with variables

Both bourne shell and KSH have lots of strange little tweaks you can do with the ${} operator. 
The ones I like are below.
To give a default value if and ONLY if a variable is not already set, use this construct:


APP_DIR=${APP_DIR:-/usr/local/bin}

(KSH only)
You can also get funky, by running an actual command to generate the value. For example


DATESTRING=${DATESTRING:-$(date)}

(KSH only)
To count the number of characters contained in a variable string, use ${#varname}.


  echo num of chars in stringvar is ${#stringvar}

(KSH only)
To strip off characters from a variable's value, using shell wildcard matching: 
(note that using the doubled-char, means "greedy match": match the longest you can. Whereas the single char default is to just snip off the first match)

$ PATHNAME=/path/to/file

$ print ${PATHNAME#*/}
path/to/file
$ print ${PATHNAME##*/}
file

$ print ${PATHNAME%/*}
/path/to
$ print ${PATHNAME%%/*}
(nothing! It stripped away the entire path! :)

The above is useful for shell-internal replacements for "dirname" and "basename" commands; however, the operators have other uses as well.
```

### 38.1.4 Ksh Functions

```text
Functions are the key to writing just about ANY program that is longer than a page or so of text. Other languages may call functions something else. But essentially, its all a matter of breaking up a large program, into smaller, managable chunks. Ideally, functions are sort of like 'objects' for program flow. You pick a part of your program that is pretty much self-contained, and make it into its own 'function'

Why are functions critical?

Properly written functions can exist by themselves, and affect only small things external to themselves. You should DOCUMENT what things it changes external to itself. Then you can look very carefully just at the function, and determine whether it actually does what you think it does :-)

When your program isn't working properly(WHEN, not if), you can then put in little debug notes to yourself in the approximate section you think is broken. If you suspect a function is not working, then all you have to verify is

Is the INPUT to the function correct?
Is the OUTPUT from the function correct?
Once you have done that, you then know the entire function is correct, for that particular set of input(s), and you can look for errors elsewhere.

A trivial function


printmessage() {
	echo "Hello, this is the printmessage function"
}

printmessage

The first part, from the first "printmessage()" all the way through the final '}', is the function definition. It only defines what the function does, when you decide to call it. It does not DO anything, until you actually say "I want to call this function now".

You call a function in ksh, by pretending it is a regular command, as shown above. Just have the function name as the first part of your line. Or any other place commands go. For example,


echo The message is: `printmessage`

Remember: Just like its own separate shellscript. Which means if you access "$1" in a function, it is the first argument passed in to the function, not the shellscript.

Debugging your functions

If you are really really having difficulties, it should be easy to copy the entire function into another file, and test it separately from the main program.

This same type of modularity can be achived by making separate script files, instead of functions. In some ways, that is almost preferable, because it is then easier to test each part by itself. But functions run much faster than separate shellscripts.

A nice way to start a large project is to start with multiple, separate shellscripts, but then encapsulate them into functions in your main script, once you are happy with how they work.

CRITICAL ISSUE: exit vs return

THE main difference when changing between shellscripts and functions, is the use of "exit".

'exit' will exit the entire script, whether it is in a function or not.
'return' will just quit the function. Like 'exit', however, it can return the default "sucess" value of 0, or any number from 1-255 that you specify. You can then check the return value of a function, just in the same way you can check the return value of an external program, with the $? variable.

# This is just a dummy script. It does not DO anything

fatal(){
	echo FATAL ERROR
	# This will quit the 'fatal' function, and the entire script that
	# it is in!
	exit
}

lessthanfour(){
	if [[ "$1" = "" ]] ; then echo "hey, give me an argument" ; return 1; fi

	# we should use 'else' here, but this is just a demonstration
	if [[ $1 -lt 4 ]] ; then
		echo Argument is less than 4
		# We are DONE with this function. Dont do anything else in
		# here. But the shellscript will continue at the caller
		return
	fi

	echo Argument is equal to or GREATER than 4
	echo We could do other stuff if we wanted to now
}

echo note that the above functions are not even called. They are just
echo defined

A bare "return" in a shellscript is an error. It can only be used inside a function.

CRITICAL ISSUE: "scope" for function variables!

Be warned: Functions act almost just like external scripts... except that by default, all variables are SHARED between the same ksh process! If you change a variable name inside a function.... that variable's value will still be changed after you have left the function!! Run this script to see what I mean.
#!/bin/sh
# Acts the same with /bin/sh, or /bin/ksh, or /bin/bash
subfunc(){
        echo sub: var starts as $var
        var=2
        echo sub: var is now $var
}
var=1
echo var starts as $var, before calling function '"subfunc"'
subfunc  # calls the function
echo var after function is now $var
To avoid this behaviour, and give what is known as "local scope" to a variable, you can use the typeset command, to define a variable as local to the function.
#!/bin/ksh
# You must use a modern sh like /bin/ksh, or /bin/bash for this
subfunc(){
	typeset var
        echo sub: var starts as $var '(empty)'
        var=2
        echo sub: var is now $var
}
var=1
echo var starts as $var, before calling function '"subfunc"'
subfunc  # calls the function
echo var after function is now $var
Another exception to this is if you call a function in the 'background', or as part of a pipe (like echo val | function )
This makes the function be called in a separate ksh process, which cannot dynamically share variables back to the parent shell. Another way that this happens, is if you use backticks to call the function. This treats the function like an external call, and forks a new shell. This means the variable from the parent will not be updated. Eg:

func() {
        newval=$(($1 + 1))
        echo $newval
        echo in func: newval ends as $newval
}
newval=1
echo newval in main is $newval
output=`func $newval`
func $newval
echo output is : $output
echo newval finishes in main as $newval
CRITICAL ISSUE: performance

It is important to note that many sh-derivative shells (including bash!), actually call fork() to call a function routine.
KSH93 (or later) is optimized to not fork a new process for functions. Sadly, earlier versions do call fork().
So, if you are writing particularly resource-sensitive largescale shellscripts, be sure to use ksh93 or newer.
```

### 38.1.5 Ksh built-in functions

```text
Calling the many UNIX programs in /bin and elsewhere can be very useful. The one drawback is speed. Every time you call a separate program, there is a lot of overhead in starting it up. So the conciencious programmer always tries to use built-in functions over external ones. In particular, ksh programmers should always try use '[[ ]]' over '[ ]', except where [] is neccessary
The more useful functions in ksh I find are:

built-in 'typeset'
'read' and 'set' functions
built-in 'test': [[ ]] 
(But this is apparently NOT a part of POSIX!!)
Built-in fast math routines, via $(( ))
An overview for each of the above is given below
typeset

The man page for it gives full details on typeset; however, I find it useful simply to provide function-local variables.
val=1
func(){
	typeset val=2
	echo val in func is $val
}
func
echo after func, top level val is still $val
Read and Set

 read varname
will set the variable varname to have the value of the next line read in from standard input.
What often comes next, is

 set $varname
This sets the argument variables $1, $2, etc to be set as if the program were called with $varname as the argument string to the shellscript. So, if the value of varname is "first second third", then $1="first", $2="second", and $3="third".
Note that if you want to access "double-digit" arguments, you cannot use "$10". it will get interpreted as "$1,""0". To access argument #10 and higher you must explicitly define the limits of the variable string, with braces:

echo ${10}
This is also good to know, if you wish to follow a variable immediately followed by a string. Compare the output from the following lines:
a="A "
echo $astring
echo ${a}string

The test function

In brief, 'test' can let you check the status of files OR string values.
Here are the most common uses for it.
if [[ $? -ne 0 ]] ; then echo status is bad ; fi
if [[ "$var" != "good" ]] ; then echo var is not good ; fi
if [[ ! -f /file/name ]] ; then echo /file/name is not there ; fi
if [[ ! -d /dir/name ]] ; then echo /dir/name is not a directory ; fi
wildcards in test

Please note that [[]] is a special built-in version of test, that is almost, but not 100%, like the standard [].
One large difference is that filename wildcard expansion will be done with the standard test. In contrast, filename wildcard expansion does not work within [[]]. It does string wildcarding instead, and only on the right side. Additionally, it must not be quoted in any way (unlike case statements)

Examples:

if [[ a* == "astring" ]] ; then echo this does not work ; fi
if [[ "astring" == "a*" ]] ; then echo this does not work ; fi
if [[ "astring" == 'a*' ]] ; then echo this does not work ; fi
if [[ "astring" == a* ]] ; then echo this works ; fi
if [[ "astring" = a* ]] ; then echo this works ; fi
Built-in math

The math evaluator is very useful. Everything inside the double-parens gets evaluated with basic math functions. For example;

four=$((2 + 2))
eight=$(($four + 4))
print $(($four * $eight))
# Inside (()), the $ is optional, so the following works...
# but you might want to keep them for assorted reasons..
print $((four * eight))

# even hex to decimal conversions
print $((0xff))
This next example isnt exactly a math routine, but it is a very handy and fast builtin method to go the other way, from decimal to hex (since 'printf' is a ksh builtin function):

printf "%x\n" 255    #this prints out "ff"
printf "%.4x\n" 255  #or if you need a fixed field width number use this
Warning #1: Some versions of ksh allow you to use floating point with $(()). Most do NOT. Warning #2: ksh is very strict about what goes inside the (( )). Every variable you use must have a value, and it must be a numeric value. Otherwise, ksh will most likely treat that line in your script as a failed function call.
Limitations of built-in functions

Be wary of assumptions. Being "built in" is not always faster than an external progam, if an operation is complex. For example, it is trivial to write a shell-only equivalent of the trivial awk usage, "awk '{print $2}'", to print the second column. However, compare them on a long file:

# function to emulate awk '{print $2}'
sh_awk(){
	while read one two three ; do
	print $two
	done
}

# and now, compare the speed of the two methods

time sh_awk </usr/dict/words >/dev/null
time awk '{print $2}' </usr/dict/words >/dev/null

The awk version will be much much faster. This is because ksh scripts are interpreted, each and every time it executes a line. AWK, however, loads up its programming in one go, and figures out what it is doing ONE TIME. Once that overhead has been put aside, it then can repeat its instructions very fast.
```

### 38.1.6 Redirection and Pipes

```text
There are lots of strange and interesting ways to connect utilities together. Most of these you have probably already seen.
The standard redirect to file;


ls > /tmp/listing

and piping output from one command to another

ls | wc -l

But bourne-shell derivatives give you even more power than that.
Most properly written programs output in one of two ways.

Progress messages go to stdout, error messages go to stderr
Data goes to stdout, error AND progress messsages go to stderr
If you know which of the categories your utilities fall into, you can do interesting things.
Redirection

An uncommon program to use for this example is the "fuser" program under solaris. it gives you a long listing of what processes are using a particular file. For example:


$ fuser /bin/sh
/bin/sh:    13067tm   21262tm

If you wanted to see just the processes using that file, you might initially groan and wonder how best to parse it with awk or something. However, fuser actually splits up the data for you already. It puts the stuff you may not care about on stderr, and the meaty 'data' on stdout. So if you throw away stderr, with the '2>' special redirect, you get

$ fuser /bin/sh  2>/dev/null
    13067   21262

which is then trivially usable.
Unfortunately, not all programs are that straightforward :-) However, it is good to be aware of these things, and also of status returns. The 'grep' command actually returns a status based on whether it found a line. The status of the last command is stored in the '$?' variable. So if all you care about is, "is 'biggles' in /etc/hosts?" you can do the following:


grep biggles /etc/hosts >/dev/null
if [[ $? -eq 0 ]] ; then
	echo YES
else
	echo NO
fi
As usual, there are lots of other ways to accomplish this task, even using the same 'grep' command. However, this method has the advantage that it does not waste OS cycles with a temp file, nor does it waste memory with a potentially very long variable.
(If you were looking for something that could potentially match hundreds of lines, then var=`grep something /file/name` could get very long)
Inline redirection

You have seen redirection TO a file. But you can also redirect input, from a file. For programs that can take data in stdin, this is useful. The 'wc' can take a filename as an argument, or use stdin. So all the following are roughly equivalent in result, although internally, different things happen:
wc -l /etc/hosts
wc -l < /etc/hosts
cat /etc/hosts | wc -l
Additionally, if there are a some fixed lines you want to use, and you do not want to bother making a temporary file, you can pretend part of your script is a separate file!. This is done with the special '<<' redirect operator.

command << EOF
means, "run 'command', but make its stdin come from this file right here, until you see the string 'EOF'"
EOF is the traditional string. But you can actually use any unique string you want. Additionally, you can use variable expansion in this section!

DATE=`date`
HOST=`uname -n`
mailx -s 'long warning' root << EOF
Something went horribly wrong with system $HOST
at $DATE
EOF
if you do NOT want to use variable expansion, then use "EOF" rather than EOF.
Pipes

In case you missed it before, pipes take the output of one command, and put it on the input of another command. You can actually string these together, as seen here;
grep hostspec /etc/hosts| awk '{print $1}' | fgrep '^10.1.' | wc -l

This is a fairly easy way to find what entries in /etc/hosts both match a particular pattern in their name, AND have a particular IP address ranage.
The "disadvantage" to this, is that it is very wasteful. Whenever you use more than one pipe at a time, you should wonder if there is a better way to do it. And indeed for this case, there most certainly IS a better way:


grep '^10\.1\..*hostspec' /etc/hosts | wc -l

There is actually a way to do this with a single awk command. But this is not a lesson on how to use AWK!
Combining pipes and redirection

An interesting example of pipes with stdin/err and redirection is the "tar" command. If you use "tar cvf file.tar dirname", it will create a tar file, and print out all the names of the files in dirname it is putting in the tarfile. It is also possible to take the same 'tar' data, and dump it to stdout. This is useful if you want to compress at the same time you are archiving:
tar cf - dirname | compress > file.tar.Z
But it is important to note that pipes by default only take the data on stdout! So it is possible to get an interactive view of the process, by using
tar cvf - dirname | compress > file.tar.Z
stdout has been redirected to the pipe, but stderr is still being displayed to your terminal, so you will get a file-by-file progress report. Or of course, you could redirect it somewhere else, with
tar cvf - dirname 2>/tmp/tarfile.list | compress > file.tar.Z 
Indirect redirection (Inline files)

Additionally, there is a special type of pipes+redirection. This only works on systems with /dev/fd/X support. You can automatically generate a "fake" file as the result of a command that does not normally generate a file. The name of the fake files will be /dev/fd/{somenumberhere}
Here's an example that doesnt do anything useful

wc -l <(echo one line) <(echo another line)
wc will report that it saw two files, "/dev/fd/4", and "/dev/fd/5", and each "file" had 1 line each. From its own perspective, wc was called simply as
wc -l /dev/fd/4 /dev/fd/5
There are two useful components to this:

You can handle MULTIPLE commands' output at once
It's a quick-n-dirty way to create a pipeline out of a command that "requires" a filename (as long as it only processes its input in a single continuous stream).
```

### 38.1.7 Other Stuff

```text
And here's stuff that I cant fit anywhere else :-)
eval
Backticks
Text positioning/color/curses stuff
Number-based menus
Raw TCP access
Using arrow keys
Graphics and ksh
eval

The eval command is a way to pretend you type something directly. This is a very dangerous command. Think carefully before using it.
One way of using eval, is to use an external command to set variables that you do not know the name of beforehand. Or a GROUP of variables. A common use of this, is to set terminal-size variables on login:

eval `resize`
Backticks

There are ways to put the output of one command as the command line of another one. There are two methods of doing this that are basically equivalent:
echo This is the uptime: `uptime`
echo This is the uptime: $(uptime)
Technically, the second one is the POSIX-preferred one.
In addition to creating dynamic output, this is also very useful for setting variables:

datestring=`date`
echo "The current date is: $datestring"
Text positioning/color games

This is actually a huge topic, and almost deserves its own tutorial. But I'm just going to mention it briefly.
Some people may be familiar with the "curses" library. It is a way to manipulate and move around text on a screen, reguardless of what kind of "terminal" the user is using.

As mentioned, this is a potentially huge topic. So, I'm just going to give you a trivial example, and say "Go read the man-page on tput". Well, okay, actually, you have to read the "tput" manpage, AND either the "terminfo" or "termcap" manpage to figure out what magical 3-5 letter name to use. For example, it should tell you that "cup" is short for the "cursor_address" command. But you must use "cup", NOT "cursor_address", with tput.


tput init
tput clear
tput cup 3 2
print -n "Here is a clean screen, with these words near the top"
endline=`tput cols`
tput cup $(($endline - 2)) 
print "and now, back to you"
sleep 2


The above example clear the screen, prints the given line at a SPECIFIC place on the screen, then puts the cursor back down near the bottom of the screen for you.
PS: If you've been doing a lot of funky things with the screen, you might want to do a

tput reset
as the last thing before your shellscript exits.

Number-based menus

You dont have to build your own "choose a number" function: ksh has one already! But note that it returns the value of the line, not the number of the line.
 select word in one two three exit; do
	echo word is $word
	echo reply is $REPLY
	if [[ "$word" = "exit" ]] ; then
		break;
	fi
 done

This will print out a mini-menu like the following:
1) one
2) two
3) three
4) exit
#?
Note that this will loop between "do ... done" until you trigger a break somehow! (or until the user control-c's or whatever). So dont forget an exit condition!


Raw TCP access

Ksh88 has a built in virtual filesystem that looks like it is under /dev/tcp. You can use it to create connections to specific ports, if you know the IP address.
Here is a trivial example that just opens up a connection to an SMTP server. Note that the connection is half-duplex: You do NOT see data that you send to the other side.

#!/bin/ksh -p

MAILHOST=127.0.0.1
exec 3<>/dev/tcp/$MAILHOST/25 || exit 1

read -r BANNER <&3
echo BANNER is $BANNER
print -u3 HELO myhost.com
read -r REPLY <&3
echo REPLY is $REPLY
The output will look something like the following:

BANNER is 220 yourhost.domain.com ESMTP Sendmail 8.11.6+Sun/8.11.6; Tue, 3 Dec 2002 17:30:01 -0800 (PST)
REPLY is 250 yourhost.domain.com Hello localhost [127.0.0.1], pleased to meet you
Note that we use the "-r" flag to read. In this particular example, it is not neccessary. But in the general case, it will give you the data "raw". Be warned that if the shell cannot open the port, it will kill your entire script, with status 1, automatically

You can also dump the rest of the data waiting on the socket, to whereever you like, by doing

cat <&3 >somefile

Using arrow keys with ksh

For some reason,(older) ksh does not come with arrow key usage on the command line enabled. That being said, it is relatively easy to enable them, since it has some special hooks for the purpose.
You can cut-n-paste this into your .kshrc (if you have set ENV=$HOME/.kshrc), or directly to your prompt. Please note, however, that it presumes you have "emacs mode" enabled, otherwise it may not work properly:

set -o emacs
alias __A=`echo "\020"`     # up arrow == ^p == back a command
alias __B=`echo "\016"`     # dn arrow == ^n == down a command
alias __C=`echo "\006"`     # rt arrow == ^f == forward a character
alias __D=`echo "\002"`     # lft arrow == ^b == back a character
alias __H=`echo "\001"`     # home  == ^a == start of line
Sadly, for ksh93, the process is a bit messier, involving 'keybind' commands:
#ksh93 and later...
# put this in your kshrc
set -o emacs
typeset -A Keytable
trap 'eval "${Keytable[${.sh.edchar}]}"' KEYBD

function keybind # key action
{
	typeset key=$(print -f "%q" "$2")
	case $# in
	2)      Keytable[$1]=' .sh.edchar=${.sh.edmode}'"$key"
	;;
	1)      unset Keytable[$1]
	;;
	*)      print -u2 "Usage: $0 key [action]"
	;;
	esac
}
keybind $'\E[D' $'\002'
keybind $'\E[C' $'\006'
keybind $'\E[B' $'\016'
keybind $'\E[A' $'\020'
keybind $'\t'   $'\E\E'
Graphics and ksh

Not many people are aware of this, but there is actually a graphical version of ksh, called "dtksh". It was created as part of "CDE". Any of the modern UNIX(tm)es should come with it, in /usr/dt/bin/dtksh. If you are interested, take a look at some dtksh demos that someone else has written. And/or, you might see if you have a /usr/dt/share/examples/dtksh/ directory present on your machine.
```

## 38.2 command history

### 38.2.1 run last command

```text
fc -s
```

### 38.2.2 run cmd by number

```text
        38.2.3
```

## 38.3 kshrc

### 38.3.1 GE linux example

```text
<user>@<internal-host>:<internal-path> cat /home/<user>/.kshrc                     
<user>@<internal-host>:/home/<user>/temp/tmux> cat /home/<user>/.kshrc
echo "Loading <user> KSHRC for GE  Linux environment"
# Default to human readable figures
 alias df='df -h'
 alias du='du -h'

# Misc :)
# alias less='less -r'                          # raw control characters
 alias whence='type -a'                        # where, of a sort
 alias grep='grep --color'                     # show differences in colour

# Some shortcuts for different directory listings
 alias ls='ls -hF '
 alias dir='ls '
 alias ll='ls -l'                              # long list
 alias la='ls -A'                              # all but . and ..
 alias l='ls -CF'                              #


# Functions
# #########

# Some example functions
# function settitle() { echo -ne "\e]2;$@\a\e]1;$@\a"; }

## editor for crontab, cvs
EDITOR=vi
export EDITOR

alias ct=/usr/atria/bin/cleartool

HISTSIZE=5000  
export VIM=~

alias h="fc -l 0 5000"
alias vksh="vi ~/.kshrc"
alias hrl="fc -s"
FCEDIT=vi

alias cdpetacq="cd <internal-path>"
alias cdpetacqT="cd <internal-path>"
alias cdpetraw="cd <internal-path>"
alias cdpetplat="cd <internal-path>"
alias sview="ct setview yosi1_pac_col_ddg_4dev"


#screen
function scrn
{
        print "creating new screen session name $1"
         #screen -S $1
}
alias scrls="screen -ls"
alias scrr="screen -r"
alias scrdr="screen -d -r"
export PATH="$HOME/bin:$PATH"
export VIMRUNTIME=/home/<user>/.local/usr/share/vim/vim80/                  
alias vi=vim
alias resume_pack_main="vim /home/<user>/work/vim_sessions/pet_ack_main"
alias cmake="clearmake -C gnu "
alias gremake='clearmake -C gnu -I <internal-path>'
```

## 38.4 The fc Command

```text
fc is a shell built-in command that provides a superset of the C shell history mechanism. You can use it to examine the most recent commands you entered, to edit one or more commands with your favorite "real" editor, and to run old commands with changes without having to type the entire command in again. We'll look at each of these uses.

The -l option to fc lists previous commands. It takes arguments that refer to commands in the history file. Arguments can be numbers or alphanumeric strings; numbers refer to the commands in the history file, while strings refer to the most recent command beginning with the string. fc treats arguments in a rather complex way:

If you give two arguments, they serve as the first and last commands to be shown.

If you specify one number argument, only the command with that number is shown.

With a single string argument, it searches for the most recent command starting with that string and shows you everything from that command to the most recent command.

If you specify no arguments, you will see the last 16 commands you entered. Thus, fc -l by itself is equivalent to the C shell history command, and indeed the Korn shell defines a built-in alias history as:

alias history=fc -l
As you will find out in Chapter 3 , this means that you can type history and the Korn shell will run the command fc -l .

A few examples should make these options clearer. Let's say you logged in and entered these commands:

ls -l
more myfile
vi myfile
wc -l myfile
pr myfile | lp -h
If you type fc -l (or history ) with no arguments, you will see the above list with command numbers, as in:

1	ls -l
2	more myfile
3	vi myfile
4	wc -l myfile
5	pr myfile | lp -h
The option -n suppresses the line numbers. If you want to see only commands 2 through 4, type fc -l 2 4 . If you want to see only the vi command, type fc -l 3 . To see everything from the vi command up to the present, type fc -l v . Finally, if you want to see commands between more and wc , you can type fc -l m w , fc -l m 4 , fc -l 2 4 , etc.

The -l option to fc is not particularly useful, except as a quick way of remembering what commands you typed recently. Use the history alias if you are an experienced C shell user.

The other important option to fc is -e for "edit." This is useful as an "escape hatch" from vi- and emacs-modes if you aren't used to either of those editors. You can specify the pathname of your favorite editor and edit commands from your history file; then when you have made the changes, the shell will actually execute the new lines.

Let's say your favorite editor is a little home-brew gem called zed . You could edit your commands by typing:

$ 
fc -e /usr/local/bin/zed
This seems like a lot of work just to fix a typo in your previous command; fortunately, there is a better way. You can set the environment variable FCEDIT to the pathname of the editor you want fc to use. If you put a line in your .profile or environment file saying:

FCEDIT=/usr/local/bin/zed
you will get zed when you invoke fc . FCEDIT defaults to the old line editor ed , so that the overall default is also ed .

fc is usually used to fix a recent command. Therefore it handles arguments a bit differently than it does for the fc -l variation above:

With no arguments, fc loads the editor with the most recent command.

With a numeric argument, fc loads the editor with the command with that number.

With a string argument, fc loads the most recent command starting with that string.

With two arguments to fc , the arguments specify the beginning and end of a range of commands, as above.

Remember that fc actually runs the command(s) after you edit them. Therefore the last-named choice can be dangerous. The Korn shell will attempt to execute all commands in the range you specify when you exit your editor. If you have typed in any multiline constructs (like those we will cover in Chapter 5, Flow Control ) the results could be even more dangerous. Although these might seem like valid ways of generating "instant shell programs," a far better strategy would be to direct the output of fc -l with the same arguments to a file; then edit that file and execute the commands when you're satisfied with them:

$ 
fc -l cp > lastcommands

$ 
vi lastcommands

$ 
. lastcommands
In this case, the shell will not try to execute the file when you leave the editor!

There is one final use for fc . If you specify the editor - (i.e., type fc -e - ), the Korn shell will skip the editing part and just run the command(s) specified by the argument(s). Why is this useful? For one thing, just typing fc -e - causes the previous command to repeat, just like the C shell !! command. The Korn shell provides the built-in alias r for this, so that if you type r and hit RETURN , you will repeat the last command.

This form of fc allows yet another type of argument, of the form old = new , meaning "change occurrences of old in the specified previous command to new and then run it." For example, if you wanted to run a complex command like the following on two sets of files:

$ 
tbl ch2.tbl | nroff -mS -Tepson > ch2.out
you can enter the command and then type fc -e - 2=3 . (You could also use the alias, r 2=3 .) This command would then run:
```
