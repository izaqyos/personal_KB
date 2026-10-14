---
type: reference
title: odds and ends
description: Section 15 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#15"
---

# odds and ends

[↑ KB_bash](/bash/kb-bash/README.md)

## 15.1 Block signals

### 15.1.1 SIGTERM, block ctrl+x

```text
one way to do it:
#!/bin/sh

trap "echo 'Trap sprung!'" INT TERM
while 'true'; do sleep 5; done

Or:
#!/usr/bin/bash

trap 'echo "you typed ctrl/c"; ' INT
while true
do
 sleep 20
done
```

### 15.1.2 Catching signals

#### 15.1.2.1 Finding the signal man page

```text
Your system contains a man page listing all the available signals, but depending on your operating system, it might be opened in a different way. On most Linux systems, this will be man 7 signal. When in doubt, locate the exact man page and section using commands like

man -k signal | grep list

or

apropos signal | grep list

Signal names can be found using kill -l.
```

#### 15.1.2.2 Signals to your Bash shell

```text
In the absence of any traps, an interactive Bash shell ignores SIGTERM and SIGQUIT. SIGINT is caught and handled, and if job control is active, SIGTTIN, SIGTTOU and SIGTSTP are also ignored. Commands that are run as the result of a command substitution also ignore these signals, when keyboard generated.

SIGHUP by default exits a shell. An interactive shell will send a SIGHUP to all jobs, running or stopped; see the documentation on the disown built-in if you want to disable this default behavior for a particular process. Use the huponexit option for killing all jobs upon receiving a SIGHUP signal, using the shopt built-in.

Sending signals using the shell

The following signals can be sent using the Bash shell:

Table 12.1. Control signals in Bash

Standard key combination	Meaning
Ctrl+C	The interrupt signal, sends SIGINT to the job running in the foreground.
Ctrl+Y	The delayed suspend character. Causes a running process to be stopped when it attempts to read input from the terminal. Control is returned to the shell, the user can foreground, background or kill the process. Delayed suspend is only available on operating systems supporting this feature.
Ctrl+Z	The suspend signal, sends a SIGTSTP to a running program, thus stopping it and returning control to the shell.

	Terminal settings
Check your stty settings. Suspend and resume of output is usually disabled if you are using “modern” terminal emulations. The standard xterm supports Ctrl+S and Ctrl+Q by default.
```

#### 15.1.2.3 Usage of signals with kill

```text
Most modern shells, Bash included, have a built-in kill function. In Bash, both signal names and numbers are accepted as options, and arguments may be job or process IDs. An exit status can be reported using the -l option: zero when at least one signal was successfully sent, non-zero if an error occurred.

Using the kill command from /usr/bin, your system might enable extra options, such as the ability to kill processes from other than your own user ID and specifying processes by name, like with pgrep and pkill.

Both kill commands send the TERM signal if none is given.

This is a list of the most common signals:

Table 12.2. Common kill signals

Signal name	Signal value	Effect
SIGHUP	1	Hangup
SIGINT	2	Interrupt from keyboard
SIGKILL	9	Kill signal
SIGTERM	15	Termination signal
SIGSTOP	17,19,23	Stop the process

	SIGKILL and SIGSTOP
SIGKILL and SIGSTOP can not be caught, blocked or ignored.

When killing a process or series of processes, it is common sense to start trying with the least dangerous signal, SIGTERM. That way, programs that care about an orderly shutdown get the chance to follow the procedures that they have been designed to execute when getting the SIGTERM signal, such as cleaning up and closing open files. If you send a SIGKILL to a process, you remove any chance for the process to do a tidy cleanup and shutdown, which might have unfortunate consequences.

But if a clean termination does not work, the INT orKILL signals might be the only way. For instance, when a process does not die using Ctrl+C, it is best to use the kill -9 on that process ID:

maud: ~> ps -ef | grep stuck_process
maud    5607   2214  0 20:05 pts/5    00:00:02 stuck_process

maud: ~> kill -9 5607

maud: ~> ps -ef | grep stuck_process
maud    5614    2214 0 20:15 pts/5    00:00:00 grep stuck_process
[1]+ Killed		stuck_process
When a process starts up several instances, killall might be easier. It takes the same option as the kill command, but applies on all instances of a given process. Test this command before using it in a production environment, since it might not work as expected on some of the commercial Unices.

id=__bash_trap_signals__
```

#### 15.1.2.4 Traps

```text
There might be situations when you don't want users of your scripts to exit untimely using keyboard abort sequences, for example because input has to be provided or cleanup has to be done. The trap statement catches these sequences and can be programmed to execute a list of commands upon catching those signals.

The syntax for the trap statement is straightforward:

trap [COMMANDS] [SIGNALS]

This instructs the trap command to catch the listed SIGNALS, which may be signal names with or without the SIG prefix, or signal numbers. If a signal is 0 or EXIT, the COMMANDS are executed when the shell exits. If one of the signals is DEBUG, the list of COMMANDS is executed after every simple command. A signal may also be specified as ERR; in that case COMMANDS are executed each time a simple command exits with a non-zero status. Note that these commands will not be executed when the non-zero exit status comes from part of an if statement, or from a while or until loop. Neither will they be executed if a logical AND (&&) or OR (||) result in a non-zero exit code, or when a command's return status is inverted using the ! operator.

The return status of the trap command itself is zero unless an invalid signal specification is encountered. The trap command takes a couple of options, which are documented in the Bash info pages.

Here is a very simple example, catching Ctrl+C from the user, upon which a message is printed. When you try to kill this program without specifying the KILL signal, nothing will happen:

#!/bin/bash
# traptest.sh

trap "echo Booh!" SIGINT SIGTERM
echo "pid is $$"

while :			# This is the same as "while true".
do
        sleep 60	# This script is not really doing anything.
done


<URL:/cygdrive/c/work/scripts/bash/traptest.sh>
```

#### 15.1.2.5 How Bash interprets traps

```text
When Bash receives a signal for which a trap has been set while waiting for a command to complete, the trap will not be executed until the command completes. When Bash is waiting for an asynchronous command via the wait built-in, the reception of a signal for which a trap has been set will cause the wait built-in to return immediately with an exit status greater than 128, immediately after which the trap is executed.
```

#### 15.1.2.6 More examples

```text
Detecting when a variable is used

When debugging longer scripts, you might want to give a variable the trace attribute and trap DEBUG messages for that variable. Normally you would just declare a variable using an assignment like VARIABLE=value. Replacing the declaration of the variable with the following lines might provide valuable information about what your script is doing:

declare -t VARIABLE=value

trap "echo VARIABLE is being used here." DEBUG

# rest of the script
Removing rubbish upon exit

The whatis command relies on a database which is regularly built using the makewhatis.cron script with cron:

#!/bin/bash

LOCKFILE=/var/lock/makewhatis.lock

# Previous makewhatis should execute successfully:

[ -f $LOCKFILE ] && exit 0

# Upon exit, remove lockfile.

trap "{ rm -f $LOCKFILE ; exit 255; }" EXIT

touch $LOCKFILE
makewhatis -u -w
exit 0
		15.1.3
```

## 15.2 Tutorial: Conditions in bash scripting (if statements)

```text
If you use bash for scripting you will undoubtedly have to use conditions a lot, for example for an if ... then construct or a while loop. The syntax of these conditions can seem a bit daunting to learn and use. This tutorial aims to help the reader understanding conditions in bash, and provides a comprehensive list of the possibilities. A small amount of general shell knowledge is assumed.
```

### 15.2.1 Introduction

```text
Bash features a lot of built-in checks and comparisons, coming in quite handy in many situations. You've probably seen if statements like the following before:

if [ $foo -ge 3 ]; then

The condition in this example is essentially a command. It may sound strange, but surrounding a comparison with square brackets is the same as using the built-in test command, like this:

if test $foo -ge 3; then

If $foo is Greater then or Equal to 3, the block after 'then' will be executed. If you always wondered why bash tends to use -ge or -eq instead of >= or ==, it's because this condition type originates from a command, where -ge and -eq are options.
And that's what if does essentially, checking the exit status of a command. I'll explain that in more detail further in the tutorial.
There also are built-in checks that are more specific to shells. What
about this one?

if [ -f regularfile ]; then

The above condition is true if the file 'regularfile' exists and
is a regular file. A regular file means that it's not a block or
character device, or a directory. This way, you can make sure a usable
file exists before doing something with it. You can even check if a
file is readable!

if [ -r readablefile]; then

The above condition is true if the file 'readablefile' exists and is readable. Easy, isn't it?
```

### 15.2.2 The syntax of an if statement (a short explanation)

```text
The basic syntax of an if ... then statement is like this:

if <condition>; then
<commands>
fi

The condition is, depending on its type, surrounded by certain
brackets, eg. [ ]. You can read about the different types further on
in the tutorial. You can add commands to be executed when the condition is false using the else keyword, and use the elif (elseif) keyword to execute commands on another condition if the primary condition is false. The else keyword always comes last. Example:

if [ -r somefile ]; then
content=$(cat somefile)
elif [ -f somefile ]; then
echo "The file 'somefile' exists but is not readable to the script."
else
echo "The file 'somefile' does not exist."
fi

A short explanation of the example: first we check if the file somefile is readable ("if [ -r somefile ]"). If so, we read it into a variable. If not, we check if it actually exists ("elif [ -f somefile ]"). If that's true, we report that it exists but isn't readable (if it was, we would have read the content). If the file doesn't exist, we report so, too. The condition at elif is only executed if the condition at if was false. The commands belonging to else are only executed if both conditions are false.
```

### 15.2.3 The basic rules of conditions

```text
When you start writing and using your own conditions, there are some rules you should know to prevent getting errors that are hard to trace. Here follow three important ones:

Always keep spaces between the brackets and the actual check/comparison. The following won't work:
if [$foo -ge 3]; then

Bash will complain about a "missing `]'".
Always terminate the line before putting a new keyword like "then". The words if, then, else, elif and fi are shell keywords, meaning that they cannot share the same line. Put a ";" between the previous statement and the keyword or place the keyword on the start of a new line. Bash will throw errors like "syntax error near unexpected token `fi'" if you don't.
It is a good habit to quote string variables if you use them in conditions, because otherwise they are likely to give trouble if they contain
spaces and/or newlines. By quoting I mean:
if [ "$stringvar" == "tux" ]; then

There are a few cases in which you should not
quote, but they are rare. You will see one of them further on in the tutorial.
Also, there are two things that may be useful to know:

You can invert a condition by putting an "!" in front of it. Example:
if [ ! -f regularfile ]; then

Be sure to place the "!" inside the brackets!
You can combine conditions by using certain operators. For the single-bracket syntax that we've been using so far, you can use "-a" for and and "-o" for or. Example:
if [ $foo -ge 3 -a $foo -lt 10 ]; then

The above condition will return true if $foo contains an integer greater than or equal to 3 and Less Than 10. You can read more about these combining expressions at the respective condition syntaxes.
And, one more basic thing: don't forget that conditions can also be used in other statements, like while and until. It is outside the scope of this tutorial to explain those, but you can read about them at the Bash Guide for Beginners.

Anyway, I've only shown you conditions between single brackets so far. There are more syntaxes, however, as you will read in the next section.
```

### 15.2.4 Different condition syntaxes

```text
Bash features different syntaxes for conditions. I will list the three of them:
```

#### 15.2.4.1 Single-bracket syntax

```text
This is the condition syntax you have already seen in the previous paragraphs; it's the oldest supported syntax. It supports three types of conditions:

File-based conditions
Allows different kinds of checks on a file. Example:
if [ -L symboliclink ]; then

The above condition is true if the file 'symboliclink' exists and is a symbolic link. For more file-based conditions see the table below.
String-based conditions
Allows checks on a string and comparing of strings. Example one:
if [ -z "$emptystring" ]; then

The above condition is true if $emptystring is an empty string or an uninitialized variable. Example two:
if [ "$stringvar1" == "cheese" ]; then

The above condition is true if $stringvar1 contains just the string "cheese". For more string-based conditions see the table below.
Arithmetic (number-based) conditions
Allows comparing integer numbers. Example:
if [ $num -lt 1 ]; then

The above condition returns true if $num is less than 1. For more arithmetic conditions see the table below.
```

#### 15.2.4.2 Double-bracket syntax

```text
You may have encountered conditions enclosed in double square brackets already, which look like this:

if [[ "$stringvar" == *string* ]]; then

The double-bracket syntax serves as an enhanced version of the single-bracket syntax; it mainly has the same features, but also some important differences with it. I will list them here:

The first difference can be seen in the above example; when comparing strings, the double-bracket syntax features shell globbing. This means that an asterisk ("*") will expand to literally anything, just as you probably know from normal command-line usage. Therefore, if $stringvar contains the phrase "string" anywhere, the condition will return true. Other forms of shell globbing are allowed, too. If you'd like to match both "String" and "string", you could use the following syntax:
if [[ "$stringvar" == *[sS]tring* ]]; then

Note that only general shell globbing is allowed. Bash-specific things like {1..4} or {foo,bar} will not work. Also note that the globbing will not work if you quote the right string. In this case you should leave it unquoted.
The second difference is that word splitting is prevented. Therefore, you could omit placing quotes around string variables and use a condition like the following without problems:
if [[ $stringvarwithspaces != foo ]]; then

Nevertheless, the quoting string variables remains a good habit, so I recommend just to keep doing it.
The third difference consists of not expanding filenames. I will illustrate this difference using two examples, starting with the old single-bracket situation:
if [ -a *.sh ]; then

The above condition will return true if there is one single file in the working directory that has a .sh extension. If there are none, it will return false. If there are several .sh files, bash will throw an error and stop executing the script. This is because *.sh is expanded to the files in the working directory. Using double brackets prevents this:
if [[ -a *.sh ]]; then

The above condition will return true only if there is a file in the working directory called "*.sh", no matter what other .sh files exist. The asterisk is taken literally, because the double-bracket syntax does not expand filenames.
The fourth difference is the addition of more generally known combining expressions, or, more specific, the operators "&&" and "||". Example:
if [[ $num -eq 3 && "$stringvar" == foo ]]; then

The above condition returns true if $num is equal to 3 and $stringvar is equal to "foo". The -a and -o known from the single-bracket syntax is supported, too.
Note that the and operator has precedence over the or operator, meaning that "&&" or "-a" will be evaluated before "||" or "-o".
The fifth difference is that the double-bracket syntax allows regex pattern matching using the "=~" operator. See the table for more information.
```

#### 15.2.4.3 Double-parenthesis syntax

```text
There also is another syntax for arithmetic (number-based) conditions, most likely adopted from the Korn shell:

if (( $num <= 5 )); then

The above condition is true if $num is less than or equal to 5. This syntax may seem more familiar to programmers. It features all the 'normal' operators, like "==", "<" and ">=". It supports the "&&" and "||" combining expressions (but not the -a and -o ones!). It is equivalent to the built-in let command.
```

### 15.2.5 Table of conditions

```text
The following table list the condition possibilities for both the single- and the double-bracket syntax. Save a single exception, the examples are given in single-bracket syntax, but are always compatible with double brackets.
```

#### 15.2.5.1 File-based conditions:

```text
Condition	True if	Example/explanation
[ -a existingfile ]	file 'existingfile' exists.	if [ -a tmp.tmp ]; then
    rm -f tmp.tmp # Make sure we're not bothered by an old temporary file
fi
[ -b blockspecialfile ]	file 'blockspecialfile' exists and is block special.	Block special files are special kernel files found in /dev, mainly used for ATA devices like hard disks, cd-roms and floppy disks.
if [ -b /dev/fd0 ]; then
    dd if=floppy.img of=/dev/fd0 # Write an image to a floppy
fi
[ -c characterspecialfile ]	file 'characterspecialfile' exists and is character special.	Character special files are special kernel files found in /dev, used for all kinds of purposes (audio hardware, tty's, but also /dev/null).
if [ -c /dev/dsp ]; then
    cat raw.wav > /dev/dsp # This actually works for certain raw wav files
fi
[ -d directory ]	file 'directory' exists and is a directory.	In UNIX-style, directories are a special kind of file.
if [ -d ~/.kde ]; then
    echo "You seem to be a kde user."
fi
[ -e existingfile ]	file 'existingfile' exists.	(same as -a, see that entry for an example)
[ -f regularfile ]	file 'regularfile' exists and is a regular file.	A regular file is neither a block or character special file nor a directory.
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
[ -g sgidfile ]	file 'sgidfile' exists and is set-group-ID.	When the SGID-bit is set on a directory, all files created in that directory will inherit the group of the directory.
if [ -g . ]; then
   echo "Created files are inheriting the group '$(ls -ld . | awk '{ print $4 }')' from the working directory."
fi
[ -G fileownedbyeffectivegroup ]	file 'fileownedbyeffectivegroup' exists and is owned by the effective group ID.	The effective group id is the primary group id of the executing user.
if [ ! -G file ]; then # An exclamation mark inverts the outcome of the condition following it
   chgrp $(id -g) file # Change the group if it's not the effective one
fi
[ -h symboliclink ]	file 'symboliclink' exists and is a symbolic link.	if [ -h $pathtofile ]; then
    pathtofile=$(readlink -e $pathtofile) # Make sure $pathtofile contains the actual file and not a symlink to it
fi
[ -k stickyfile ]	file 'stickyfile' exists and has its sticky bit set.	The sticky bit has got quite a history, but is now used to prevent world-writable directories from having their contents deletable by anyone.
if [ ! -k /tmp ]; then # An exclamation mark inverts the outcome of the condition following it
    echo "Warning! Anyone can delete and/or rename your files in /tmp!"
fi
[ -L symboliclink ]	file 'symboliclink' exists and is a symbolic link.	(same as -h, see that entry for an example)
[ -N modifiedsincelastread ]	file 'modifiedsincelastread' exists and was modified after the last read.	if [ -N /etc/crontab ]; then
    killall -HUP crond # SIGHUP makes crond reread all crontabs
fi
[ -O fileownedbyeffectiveuser ]	file 'fileownedbyeffectiveuser' exists and is owned by the user executing the script.	if [ -O file ]; then
    chmod 600 file # Makes the file private, which is a bad idea if you don't own it
fi
[ -p namedpipe ]	file 'namedpipe' exists and is a named pipe.	A named pipe is a file in /dev/fd/ that can be read just once. See my bash tutorial for a case in which it's used.
if [ -p $file ]; then
    cp $file tmp.tmp # Make sure we'll be able to read
    file="tmp.tmp"    # the file as many times as we like
fi
[ -r readablefile ]	file 'readablefile' exists and is readable to the script.	if [-r file ]; then
    content=$(cat file) # Set $content to the content of the file
fi
[ -s nonemptyfile ]	file 'nonemptyfile' exists and has a size of more than 0 bytes.	if [ -s logfile ]; then
    gzip logfile    # Backup the old logfile
    touch logfile # before creating a fresh one.
fi
[ -S socket ]	file 'socket' exists and is a socket.	A socket file is used for inter-process communication, and features an interface similar to a network connection.
if [ -S /var/lib/mysql/mysql.sock ]; then
    mysql --socket=/var/lib/mysql/mysql.sock # See this MySQL tip
fi
[ -t openterminal ]	file descriptor 'openterminal' exists and refers to an open terminal.	Virtually everything is done using files on Linux/UNIX, and the terminal is no exception.
if [ -t /dev/pts/3 ]; then
    echo -e "\nHello there. Message from terminal $(tty) to you." > /dev/pts/3 # Anyone using that terminal will actually see this message!
fi
[ -u suidfile ]	file 'suidfile' exists and is set-user-ID.	Setting the suid-bit on a file causes execution of that file to be done with the credentials of the owner of the file, not of the executing user.
if [ -u executable ]; then
    echo "Running program executable as user $(ls -l executable | awk '{ print $3 }')."
fi
[ -w writeablefile ]	file 'writeablefile' exists and is writeable to the script.	if [ -w /dev/hda ]; then
    grub-install /dev/hda
fi
[ -x executablefile ]	file 'executablefile' exists and is executable for the script.	Note that the execute permission on a directory means that it's searchable (you can see which files it contains).
if [ -x /root ]; then
    echo "You can view the contents of the /root directory."
fi
[ newerfile -nt olderfile ]	file 'newerfile' was changed more recently than 'olderfile', or if 'newerfile' exists and 'olderfile' doesn't.	if [ story.txt1 -nt story.txt ]; then
    echo "story.txt1 is newer than story.txt; I suggest continuing with the former."
fi
[ olderfile -ot newerfile ]	file 'olderfile' was changed longer ago than 'newerfile', or if 'newerfile' exists and 'olderfile' doesn't.	if [ /mnt/remote/remotefile -ot localfile ]; then
    cp -f localfile /mnt/remote/remotefile # Make sure the remote location has the newest version of the file, too
fi
[ same -ef file ]	file 'same' and file 'file' refer to the same device/inode number.	if [ /dev/cdrom -ef /dev/dvd ]; then
    echo "Your primary cd drive appears to read dvd's, too."
fi
```

#### 15.2.5.2 String-based conditions:

```text
Condition	True if	Example/explanation
[ STRING1 == STRING2 ]	STRING1 is equal to STRING2.	if [ "$1" == "moo" ]; then
    echo $cow # Ever tried executing 'apt-get moo'?
fi
Note: you can also use a single "=" instead of a double one.
[ STRING1 != STRING2 ]	STRING1 is not equal to STRING2.	if [ "$userinput" != "$password" ]; then
    echo "Access denied! Wrong password!"
    exit 1 # Stops script execution right here
fi
[ STRING1 \> STRING2 ]	STRING1 sorts after STRING2 in the current locale (lexographically).	The backslash before the angle bracket is there because the bracket needs to be escaped to be interpreted correctly. As an example we have a basic bubble sort:
(Don't feel ashamed if you don't understand this, it is a more complex example)
 
array=( linux tutorial blog )
swaps=1
while (( swaps > 0 )); do
   
swaps=0
    for (( i=0; i < (( ${#array[@]} - 1 )) ; i++ )); do
        if [ "${array[$i]}" \> "${array[$(( i + 1 ))]}" ]; then # Here is the sorting condition
            tempstring=${array[$i]}
            array[$i]=${array[$(( i + 1 ))]}
            array[$(( i + 1 ))]=$tempstring
            (( swaps=swaps + 1 ))
        fi
    done
done
echo ${array[@]} # Returns "blog linux tutorial"
[ STRING1 \< STRING2 ]	STRING1 sorts before STRING2 in the current locale (lexographically).
[ -n NONEMPTYSTRING ]	NONEMPTYSTRING has a length of more than zero.	This condition only accepts valid strings, so be sure to quote anything you give to it.
if [ -n "$userinput" ]; then
    userinput=parse($userinput) # Only parse if the user actually gave some input.
fi
Note that you can also omit the "-n", as brackets with just a string in it behave the same.
[ -z EMPTYSTRING ]	EMPTYSTRING is an empty string.	This condition also accepts non-string input, like an uninitialized variable:
if [ -z $uninitializedvar ]; then
    uninitializedvar="initialized" # -z returns true on an uninitialized variable, so we initialize it here.
fi
Double-bracket syntax only:
[[ STRING1 =~ REGEXPATTERN ]]	STRING1 matches REGEXPATTERN.	If you are familiar with Regular Expressions, you can use this conditions to perform a regex match.
if [[ "$email" =~ "\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b" ]]; then
    echo "\$email contains a valid e-mail address."
fi
```

#### 15.2.5.3 Arithmetic (number-based) conditions:

```text
Condition	True if	Example/explanation
[ NUM1 -eq NUM2 ]	NUM1 is EQual to NUM2.	These conditions only accept integer numbers. Strings will be converted to integer numbers, if possible. Some random examples:
if [ $? -eq 0 ]; then # $? returns the exit status of the previous command
    echo "Previous command ran succesfully."
fi
if [ $(ps -p $pid -o ni=) -ne $(nice) ]; then
    echo "Process $pid is running with a non-default nice value"
fi
if [ $num -lt 0 ]; then
    echo "Negative numbers not allowed; exiting..."
    exit 1
fi
[ NUM1 -ne NUM2 ]	NUM1 is Not Equal to NUM2.
[ NUM1 -gt NUM2 ]	NUM1 is Greater Than NUM2.
[ NUM1 -ge NUM2 ]	NUM1 is Greater than or Equal to NUM2.
[ NUM1 -lt NUM2 ]	NUM1 is Less Than NUM2.
[ NUM1 -le NUM2 ]	NUM1 is Less than or Equal to NUM2.
```

#### 15.2.5.4 Miscellaneous conditions:

```text
Condition	True if	Example/explanation
[ -o shelloption ]	shell option 'shelloption' is enabled.	Shell options modify the behaviour of bash, except a few unmodifiable ones that indicate the shell status.
if [ ! -o checkwinsize ] # An exclamation mark inverts the outcome of the condition following it
    echo "Shell option checkwinsize is disabled; enabling it so you can resize you terminal window without problems."
    shopt -s checkwinsize # This shell option is modifiable
fi
if [ -o login_shell ]; then
    echo "This a a login shell." # This shell option is not modifiable

fi
With the double-parenthesis syntax, you can use the following conditions:
```

#### 15.2.5.5 Double-parenthesis syntax conditions:

```text
Condition	True if	Example/explanation
(( NUM1 == NUM2 ))	NUM1 is equal to NUM2.	These conditions only accept integer numbers. Strings will be converted to integer numbers, if possible. Some random examples:
if (( $? == 0 )); then # $? returns the exit status of the previous command
    echo "Previous command ran succesfully."
fi
if (( $(ps -p $pid -o ni=) != $(nice) )); then
    echo "Process $pid is running with a non-default nice value"
fi
if (( $num < 0 )); then
    echo "Negative numbers not allowed; exiting..."
    exit 1
fi
(( NUM1 != NUM2 ))	NUM1 is not equal to NUM2.
(( NUM1 > NUM2 ))	NUM1 is greater than NUM2.
(( NUM1 >= NUM2 ))	NUM1 is greater than or equal to NUM2.
(( NUM1 < NUM2 ))	NUM1 is less than NUM2.
(( NUM1 <= NUM2 ))	NUM1 is less than or equal to NUM2.
After this dry information load, here's a bit of explanation for those who want to know more...
```

### 15.2.6 Diving a little deeper

```text
I said I'd tell more about the fact that if essentially checks the exit status of commands. And so I will. The basic rule of bash when it comes to conditions is 0 equals true, >0 equals false.
That's pretty much the opposite of many programming languages where 0 equals false and 1 (or more) equals true. The reason behind this is that shells like bash deal with programs a lot. By UNIX convention, programs use an exit status for indicating whether execution went alright or an error occured. As a succesful execution doesn't require any explanation, it needs only one exit status. If there was a problem, however, it is useful to know what went wrong. Therefore, 0 is used for a succesful execution, and 1-255 to indicate what kind of error occured. The meaning of the numbers 1-255 differs depending on the program returning them.

Anyway, if executes the block after then when the command returns 0. Yes, conditions are commands. The phrase [ $foo -ge 3 ] returns an exit status, and the other two syntaxes as well! Therefore, there's a neat trick you can use to quickly test a condition:

[ $foo -ge 3 ] && echo true

In this example, "echo true" is only executed if "[ $foo -ge 3 ]" returns 0 (true). Why is that, you might ask. It's because bash only evaluates a condition when needed. When using the and combining expression, both conditions need to be true to make the combining expression return true. If the first condition returns false, it doesn't matter what the second one returns; the result will be false. Therefore, bash doesn't evaluate the second condition, and that's the reason why "echo true" is not executed in the example. This is the same for the or operator ("||"), where the second condition is not evaluated if the first one is true.

Well, so much for the diving. If you want to know even more, I'd like to point you to the Advanced Bash-Scripting Guide and maybe the Bash Reference Manual.
```

### 15.2.7 Conclusion

```text
In this tutorial, you've been able to make a start at understanding the many possibilities of conditions in bash scripting. You've been able to read about the basic rules of writing and using conditions, about the three syntaxes and their properties, and maybe you took the opportunity to dive a little deeper. I hope you enjoyed the reading as much as I enjoyed the writing. You can always return here to look up conditions in the table (bookmark that link to see the table directly), or to refresh your knowledge. If you have any suggestions, additions or other feedback, feel free to comment. Thanks for reading and happy scripting!

"
```

## 15.3 The case statement

```text
The case statement is good alternative to multilevel if-then-else-fi statement. It enable you to match several values against one variable. It is easier to read and write.
Contents [hide]
1 Syntax
```

## 1.1 Example

## 1.2 Using Multiple Patterns

## 1.3 Creating a backup script

```text
Syntax

The syntax is as follows:
          case  $variable-name  in
                pattern1)       
     		    command1
                    ...
                    ....
                    commandN
                    ;;
                pattern2)
     		    command1
                    ...
                    ....
                    commandN
                    ;;            
                patternN)       
     		    command1
                    ...
                    ....
                    commandN
                    ;;
                *)              
          esac 
OR
          case  $variable-name  in
                pattern1|pattern2|pattern3)       
     		    command1
                    ...
                    ....
                    commandN
                    ;;
                pattern4|pattern5|pattern6)
     		    command1
                    ...
                    ....
                    commandN
                    ;;            
                pattern7|pattern8|patternN)       
     		    command1
                    ...
                    ....
                    commandN
                    ;;
                *)              
          esac 
The case statement allows you to easily check pattern (conditions) and then process a command-line if that condition evaluates to true.
In other words the $variable-name is compared against the patterns until a match is found.
*) acts as default and it is executed if no match is found.
The pattern can include wildcards.
You must include ;; at the end of each commandN. The shell executes all the statements up to the two semicolons that are next to each other.
The esac is always required to indicate end of case statement.
Example
Create a shell script called rental.sh:
#!/bin/bash
 
# if no command line arg given
# set rental to Unknown
if [ -z $1 ]
then
  rental="*** Unknown vehicle ***"
elif [ -n $1 ]
then
# otherwise make first arg as a rental
  rental=$1
fi
 
# use case statement to make decision for rental
case $rental in
   "car") echo "For $rental rental is Rs.20 per k/m.";;
   "van") echo "For $rental rental is Rs.10 per k/m.";;
   "jeep") echo "For $rental rental is Rs.5 per k/m.";;
   "bicycle") echo "For $rental rental 20 paisa per k/m.";;
   "enfield") echo "For $rental rental Rs.3  per k/m.";;
   "thunderbird") echo "For $rental rental Rs.5 per k/m.";;
   *) echo "Sorry, I can not get a $rental rental  for you!";;
esac
Save and close the file. Run it as follows:
chmod +x rental.sh
./rental.sh 
./rental.sh jeep
./rental.sh enfield
./rental.sh bike
Sample outputs:
Sorry, I can not get a *** Unknown vehicle *** rental  for you!
For jeep rental is Rs.5 per k/m.
For enfield rental Rs.3  per k/m.
Sorry, I can not get a bike rental  for you!
The case statement first checks $rental against each option for a match. If it matches "car", the echo command will display rental for car. If it matches "van", the echo command will display rental for van and so on. If it matches nothing i.e. * (default option), an appropriate warning message is printed.
Using Multiple Patterns
#!/bin/bash
NOW=$(date +"%a")
case $NOW in
	Mon)	
		echo "Full backup";;
	Tue|Wed|Thu|Fri)
		echo "Partial backup";;
	Sat|Sun)	
		echo "No backup";;
	*) ;;
esac
The following shell script demonstrate the concept of command line parameters processing using the case statement (casecmdargs.sh):
#!/bin/bash
OPT=$1   # option
FILE=$2  # filename
 
# test -e and -E command line args matching
case $OPT in
  -e|-E) 
  	echo "Editing $2 file..." 
        # make sure filename is passed else an error displayed   
  	[ -z $FILE ] && { echo "File name missing"; exit 1; } || vi $FILE	
  	;;
  -c|-C) 
  	echo "Displaying $2 file..." 
  	[ -z $FILE ] && { echo "File name missing"; exit 1; } || cat $FILE	
  	;;
  -d|-D) 
  	echo "Today is $(date)" 
  	;;
   *) 
    echo "Bad argument!" 
    echo "Usage: $0 -ecd filename"
    echo "	-e file : Edit file."
    echo "	-c file : Display file."
    echo "	-d      : Display current date and time."	
    ;;
esac
Run it as follows:
chmod +x casecmdargs.sh
./casecmdargs.sh
./casecmdargs.sh -e /tmp/file
./casecmdargs.sh -E /tmp/file
./casecmdargs.sh -e 
./casecmdargs.sh -D
Creating a backup script
Create a backup script called allinonebackup.sh:
#!/bin/bash
# A shell script to backup mysql, webserver and files to tape
opt=$1
case $opt in
        sql)
                echo "Running mysql backup using mysqldump tool..."
                ;;
        sync)
                echo "Running backup using rsync tool..."
                ;;
        tar)
                echo "Running tape backup using tar tool..."
                ;;
        *)
        	    echo "Backup shell script utility"
                echo "Usage: $0 {sql|sync|tar}"
                echo "	sql  : Run mySQL backup utility."
                echo "	sync : Run web server backup utility."	
                echo "	tar  : Run tape backup utility."	;;
esac
Save and close the file. Run it as follows:
chmod +x allinonebackup.sh
# run sql backup
./allinonebackup.sh sql
# Dump file system using tape device
./allinonebackup.sh tar
# however, the following will fail as patterns are case sensitive
# you must use command line argument tar and not TAR, Tar, TaR etc. 
./allinonebackup.sh TAR

	15.4
```
