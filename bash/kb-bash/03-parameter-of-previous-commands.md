---
type: reference
title: parameter of previous commands.
description: "Reusing parameters of previous commands in bash: !$ and all arguments."
tags: [bash, legacy, shell, tips, examples]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#3"
---

# parameter of previous commands.

[↑ KB_bash](/bash/kb-bash/README.md)

## 3.1 last parameter of previous command !$

```text
	example:
	$ ls some_long_path
	$ vi !$ 
	vi will open the file with long path
```

## 3.2 all paramters of previous command !*

```text
	vi cd /stuff
	oops!
	[exit vi, twice]
	!*
	Which bash expands to: cd /stuff
```

## 3.4 replace typos in previous command. the ^old^new...

```text
 	example:
	vi /etc/X11/XF86config
	oops!
	^6c^6C
	Which bash turns into:
	vi /etc/X11/XF86Config
```

## 3.5 substitute cont.

### 3.5.1 1 time substitute

```text
	!!:s/old/new/

	example:
	$ vi /etc/X11/XF86config
	$ !!:s/config/Config-4/
```

### 3.5.2 global substitute (of last command - !!)

```text
	$ mroe file1 ; mroe file2
	$ !!:gs/mroe/more
```

## 3.6 More bash prompt tips

```text
# BASH HISTORY SEARCH AND REPLACE
      ^string1^string2^ Quick substitution. Repeat the last command, replacing string1 with
      string2. Equivalent to ``!!:s/string1/string2/''

# MORE BASH COMMAND LINE TRICKERY (messing with the history)
make a directory then move into it:
mkdir cgi-bin; cd !#$ 
!#$ is shorthand for "the first word of this command". If I wanted to pick the third word
out of the previous command, that would be: !!:3 (don't forget there is a zeroth word).

# execute the most recent command the contains the following string: 
!?string

# globally search replace on the previous line:
!!:gs/old/new/

# HEADS AND TAILS
ever wanted to copy a few files in the same directory, all of which have same 
long prefix, like: cp /usr/local/etc/apache/file1.txt /usr/local/etc/apache/file2.txt
you can grap and reuse that prefix. It's named !#:1:h like:
cp /usr/local/etc/apache/file1.txt !#:1:h/file2.txt !#:1:h/file3.txt


# SAVING A COMMAND WITHOUT EXECUTING
While using bash, if you have typed a long command, and then realize you don't want to execute it yet, don't delete it. Simply
append a # to the beginning of the line, and then hit enter. Bash will not execute the command, but will store it in history so later
you can go back, remove the # from the front, and execute it. 

# GOING FORWARD A BACK A WORD
META-F goes forward a word
META-B goes backward a word

# COMPARE A FILE WITH IT'S VARIOUS VERSIONS IN THE SAME DIRECTORY
diff file.*

# EXAMPLE of a basic command line script
for f in `ls | grep -v "\.sh$"`; { mv ${f} ${f}.sh; }

# searching the history
Cntrl-R starts a reverse incremental search 

# Keyboard shortcuts: 
CTRL-k: delete ('kill') from cursor position to the end of the line
*	CTRL-u: delete from cursor position to the beginning of the line
*	ALT-d: delete from cursor position to the end of the current 'word'
*	CTRL-w: delete from cursor position to the beginning of the current 'word'
*	CTRL-a: move cursor to the first character of the line
*	CTRL-e: move cursor beyond the last character of the line
*	ALT-a: move cursor to the first character of the current 'word'
*	ALT-e: move cursor to the last character of the current 'word'
*	CTRL-y: insert latest deleted 'word'
*	ESC-_ or !$: repeats the last argument of the previous command.
Example: You created a directory with mkdir /usr/local/bin/peter/pan. Now you want to change into that directory with cd. Instead of typing the path again, you type cd ESC-_ or

# Diff 2 files with a common base:
diff {alpha,beta}site/config/Config.pl
```

## 3.7 The Definitive Guide to Bash Command Line History

```text
Let me teach you how to work efficiently with command line history in bash.

This tutorial comes with a downloadable cheat sheet that summarizes (and expands on) topics covered here (scroll to the end for a download link).

In case you are a first time reader, this is the 3rd part of the article series on working efficiently in bourne again shell. Previously I have written on how to work efficiently in vi and emacs command editing modes by using predefined keyboard shortcuts (both articles come with cheat sheets of predefined shortcuts).

First, lets review some basic keyboard shortcuts for navigating around previously typed commands.

As you remember, bash offers two modes for command editing - emacs mode and vi mode. In each of these editing modes the shortcuts for retrieving history are different.

Suppose you had executed the following commands:

$ echo foo bar baz
$ iptables -L -n -v -t nat
$ ... lots and lots more commands
$ echo foo foo foo
$ perl -wle 'print q/hello world/'
$ awk -F: '{print$1}' /etc/passwd
$
and you wanted to execute the last command (awk -F ...).

You could certainly hit the up arrow and live happily along, but do you really want to move your hand that far away?

If you are in emacs mode just try CTRL-p which fetches the previous command from history list (CTRL-n for the next command).

In vi mode try CTRL-[ (or ESC) (to switch to command mode) and 'h' ('j' for the next command).

There is another, equally quick, way to do that by using bash's history expansion mechanism - event designators. Typing '!!' will execute the previous command (more about event designators later).

Now, suppose that you wanted to execute 'iptables -L -n -v -t nat' command again without retyping it.

A naive user would, again, just keep hitting up-arrow key until he/she finds the command. But that's not the way hackers work. Hackers love to work quickly and efficiently. Forget about arrow keys and page-up, page-down, home and end keys. They are completely useless and, as I said, they are too far off from the main part of the keyboard anyway.

In emacs mode try CTRL-r and type a few first letters of 'iptables', like 'ipt'. That will display the last iptables command you executed. In case you had more than one iptables commands executed in between, hitting CTRL-r again will display older entries. In case you miss the right command and move too deep into history list, you can reverse the search direction by hitting CTRL-s (don't forget that by default CTRL-s stops the output to the terminal and you'll get an effect of "frozen" terminal (hit CTRL-q to "unfreeze"), see stty command to change this behavior).

In vi mode the same CTRL-r and CTRL-s still work but there is another way more specific to vi mode.
Switch to command mode by hitting CTRL-[ or ESC and hit '/', then type a first few characters of 'iptables' command, like 'ipt' and hit return. Bash will display the most recent match found in history. To navigate around use 'n' or just plain '/' to repeat the search in the same direction, and 'N' or '?' to repeat the search in opposite direction!

With event designators you may execute only the most recently executed command matching (or starting with) 'string'.

Try '!iptables' history expansion command which refers to the most recent command starting with 'iptables'.

Another way is to use bash's built in 'history' command then grep for a string of interest and finally use an event designator in form '!N', where N is an integer which refers to N-th command in command history list.

For example,

$ history | grep 'ipt'
  2    iptables -L -n -v -t nat
$ !2     # will execute the iptables command
I remembered another way to execute N-th command in history list in vi editing mode. Type 'N' (command number) and then 'G', in this example '2G'

Listing and Erasing Command History

Bash provides a built-in command 'history' for viewing and erasing command history.

Suppose that we are still working with the same example:

$ echo foo bar baz
$ iptables -L -n -v -t nat
$ ... lots and lots more commands
$ echo foo foo foo
$ perl -wle 'print q/hello world/'
$ awk -F: '{print$1}' /etc/passwd
$
Typing 'history' will display all the commands in bash history alongside with line numbers:

  1    echo foo bar baz
  2    iptables -L -n -v -t nat
  ...  lots and lots more commands
  568  echo foo foo foo
  569  perl -wle 'print q/hello world/'
  570  awk -F: '{print$1}' /etc/passwd
Typing 'history N', where N is an integer, will display the last N commands in the history.
For example, 'history 3' will display:

  568  echo foo foo foo
  569  perl -wle 'print q/hello world/'
  570  awk -F: '{print$1}' /etc/passwd
history -c will clear the history list and history -d N will delete a history entry N.

By default, the history list is kept in user's home directory in a file '.bash_history'.

History Expansion

History expansion is done via so-called event designators and word designators. Event designators can be used to recall previously executed commands (events) and word designators can be used to extract command line arguments from the events. Optionally, various modifiers can be applied to the extracted arguments.

Event designators are special commands that begin with a '!' (there is also one that begins with a '^'), they may follow a word designator and one or more modifiers. Event designators, word designators and modifiers are separated by a colon ':'.

Event Designators

Lets look at a couple of examples to see how the event designators work.

Event designator '!!' can be used to refer to the previous command, for example,

$ echo foo bar baz
foo bar baz
$ !!
foo bar baz
Here the '!!' executed the previous 'echo foo bar baz' command.

Event designator '!N' can be used to refer to the N-th command.
Suppose you listed the history and got the following output:

  1    echo foo foo foo
  2    iptables -L -n -v -t nat
  ...  lots and lots more commands
  568  echo bar bar bar
  569  perl -wle 'print q/hello world/'
  570  awk -F: '{print$1}' /etc/passwd
Then the event designator '!569' will execute 'perl ...' command, and '!1' will execute 'echo foo foo foo' command!

Event designator '!-N' refers to current command line minus N. For example,

$ echo foo bar baz
foo bar baz
$ echo a b c d e
a b c d e
$ !-2
foo bar baz
Here the event designator '!-2' executed a one before the previous command, or current command line minus 2.

Event designator '!string' refers to the most recent command starting with 'string'. For example,

$ awk --help
$ perl --help
Then the event designator '!p' or '!perl' or '!per' will execute the 'perl --help' command. Similarly, '!a' will execute the awk command.

An event designator '!?string?' refers to a command line containing (not necessarily starting with) 'string'.

Perhaps the most interesting event designator is the one in form '^string1^string2^' which takes the last command, replaces string1 with string2 and executes it. For example,

$ ehco foo bar baz
bash: ehco: command not found
$ ^ehco^echo^
foo bar baz
Here the '^ehco^echo^' designator replaced the incorrectly typed 'ehco' command with the correct 'echo' command and executed it.

Word Designators and Modifiers

Word designators follow event designators separated by a colon. They are used to refer to some or all of the parameters on the command referenced by event designator.

For example,

$ echo a b c d e
a b c d e
$ echo !!:2
b
This is the simplest form of a word designator. ':2' refers to the 2nd argument of the command (3rd word). In general ':N' refers to Nth argument of the command ((N+1)-th word).

Word designators also accept ranges, for example,

$ echo a b c d e
a b c d e
$ echo !!:3-4
c d
There are various shortcuts, such as, ':$' to refer to the last argument, ':^' to refer to the first argument, ':*' to refer to all the arguments (synonym to ':1-$'), and others. See the cheat sheet for a complete list.

Modifiers can be used to modify the behavior of a word designators. For example:

$ tar -xvzf software-1.0.tgz
software-1.0/file
...
$ cd !!:$:r
software-1.0$
Here the 'r' modifier was applied to a word designator which picked the last argument from the previous command line. The 'r' modifier removed the trailing suffix '.tgz'.

The 'h' modifier removes the trailing pathname component, leaving the head:

$ echo /usr/local/apache
/usr/local/apache
$ echo !!:$:h
/usr/local
The 'e' modifier removes all but the trailing suffix:

$ ls -la /usr/src/software-4.2.messy-Extension
...
$ echo /usr/src/*!!:$:e
/usr/src/*.messy-Extension    # ls could have been used instead of echo
Another interesting modifier is the substitute ':s/old/new/' modifier which substitutes new for old. It can be used in conjunction with 'g' modifier to do global substitution. For example,

$ ls /urs/local/software-4.2 /urs/local/software-4.3
/usr/bin/ls: /urs/local/software-4.2: No such file or directory
/usr/bin/ls: /urs/local/software-4.3: No such file or directory
$ !!:gs/urs/usr/
...
This example replaces all occurances of 'urs' to 'usr' and makes the command correct.

There are a few other modifiers, such as 'p' modifier which prints the resulting command after history expansion but does not execute it. See the cheat sheet for all of the modifiers.

Modifying History Behavior

Bash allows you to modify which commands get stored in the history list, the file where they get stored, the number of commands that get stored, and a few other options.

These options are controlled by setting HISTFILE, HISTFILESIZE, HISTIGNORE and HISTSIZE environment variables.

HISTFILE, as the name suggests, controls where the history file gets saved. 
For example,

$ export HISTFILE=/home/pkrumins/todays_history
will save the commands to a file /home/pkrumins/todays_history

Set it to /dev/null or unset it to avoid getting your history list saved.

HISTFILESIZE controls how many history commands to keep in HISTFILE.
For example,

$ export HISTFILESIZE=1000
will keep the last 1000 history commands.

HISTSIZE controls how many history commands to keep in the history list of current session.
For example,

$ export HISTSIZE=42
will keep 42 last commands in the history of current session.

If this number is less than HISTFILESIZE, only that many commands will get written to HISTFILE.

HISTIGNORE controls the items which get ignored and do not get saved. This variable takes a list of colon separated patterns. Pattern '&' (ampersand) is special in a sense that it matches the previous history command.

There is a trick to make history ignore the commands which begin with a space. The pattern for that is "[ ]*"

For example,

$ export HISTIGNORE="&:[ ]*:exit"
will make bash ignore duplicate commands, commands that begin with a space, and the 'exit' command.

There are several other options of interest controlled by the built-in 'shopt' command.

The options may be set by specifying '-s' parameter to the 'shopt' command, and may be unset by specifying '-u' parameter.

Option 'histappend' controls how the history list gets written to HISTFILE, setting the option will append history list of current session to HISTFILE, unsetting it (default) will make HISTFILE get overwritten each time.

For example, to set this option, type:

$ shopt -s histappend
And to unset it, type:

$ shopt -u histappend
Option 'histreedit' allows users to re-edit a failed history substitution.

For example, suppose you had typed:

$ echo foo bar baz
and wanted to substitute 'baz' for 'test' with the ^baz^test^ event designator , but you made a mistake and typed ^boo^test^. This would lead to a substitution failure because the previous command does not contain string 'boo'.

If you had this option turned on, bash would put the erroneous ^baz^test^ event designator back on the command line as if you had typed it again.

Finally, option 'histverify' allows users to verify a substituted history expansion.

Based on the previous example, suppose you wanted to execute that 'echo' command again by using the '!!' event designator. If you had this option on, bash would not execute the 'echo' command immediately but would first put it on command line so that you could see if it had made the correct substitution.

Tuning the Command Prompt

Here is how my command prompt looks:

Wed Jan 30@07:07:03
pkrumins@catonmat:1002:2:~$
The first line displays the date and time the command prompt was displayed so I could keep track of commands back in time.
The second line displays username, hostname, global history number and current command number.

The global history number allows me to quickly use event designators.

My PS1, primary prompt display variable looks like this:

PS1='\d@\t\n\u@\h:\!:\#:\w$ '
```

## 3.8 My examples

```text
- Use part of current command:
$ echo aaa/bbb/c.x !#
echo aaa/bbb/c.x echo aaa/bbb/c.x 
aaa/bbb/c.x echo aaa/bbb/c.x
$ echo aaa/bbb/c.x !#:0
echo aaa/bbb/c.x echo
aaa/bbb/c.x echo
$ echo aaa/bbb/c.x !#:1
echo aaa/bbb/c.x aaa/bbb/c.x


- And with more manipulations:
$ echo aaa/bbb/c.x !#:1:h
echo aaa/bbb/c.x aaa/bbb
aaa/bbb/c.x aaa/bbb
$ echo aaa/bbb/c.x !#:1:p
echo aaa/bbb/c.x aaa/bbb/c.x
$ echo aaa/bbb/c.x !#:t
echo aaa/bbb/c.x c.x 
aaa/bbb/c.x c.x
$ echo aaa/bbb/c.x !#:r
echo aaa/bbb/c.x echo aaa/bbb/c
aaa/bbb/c.x echo aaa/bbb/c
$ echo aaa/bbb/c.x !#:e
echo aaa/bbb/c.x .x 
aaa/bbb/c.x .x
$ echo aaa/bbb/c.x !#:1:q
echo aaa/bbb/c.x 'aaa/bbb/c.x'
aaa/bbb/c.x aaa/bbb/c.x
```

## 3.9 Bash History Cheat Sheet

```text
.---------------------------------------------------------------------------.
|                                                                           |
|                          Bash History Cheat Sheet                         |
|                                                                           |
'---------------------------------------------------------------------------'
| Peteris Krumins (peter@catonmat.net), 2008.02.15                          |
| http://www.catonmat.net  -  good coders code, great reuse                 |
|                                                                           |
| Released under the GNU Free Document License                              |
'---------------------------------------------------------------------------'

 ===================== Emacs Keyboard Shortcut Summary =====================

.--------------.------------------------------------------------------------.
|              |                                                            |
| Shortcut     | Description                                                |
|              |                                                            |
'--------------+------------------------------------------------------------'
| C-p          | Fetch the previous command from the history list.          |
'--------------+------------------------------------------------------------'
| C-n          | Fetch the next command from the history list.              |
'--------------+------------------------------------------------------------'
| M-<          | Move to the first line in the history.                     | 
'--------------+------------------------------------------------------------'
| M->          | Move to the end of the input history.                      |
'--------------+------------------------------------------------------------'
| C-r          | Search backward starting at the current line (incremental) |
'--------------+------------------------------------------------------------'
| C-s          | Search forward starting at the current line (incremental). |
'--------------+------------------------------------------------------------'
| M-p          | Search backward using non-incremental search.              |
'--------------+------------------------------------------------------------'
| M-n          | Search forward using non-incremental search                |
'--------------'------------------------------------------------------------'

 ======================= Vi Keyboard Shortcut Summary ======================

.--------------.------------------------------------------------------------.
|              |                                                            |
| Shortcut     | Description                                                |
|              |                                                            |
'--------------+------------------------------------------------------------'
| k            | Fetch the previous command from the history list.          |
'--------------+------------------------------------------------------------'
| j            | Fetch the next command from the history list.              |
'--------------+------------------------------------------------------------'
| /string or   | Search history backward for a command matching string.     |
| CTRL-r       |                                                            |
'--------------+------------------------------------------------------------'
| ?string or   | Search history forward for a command matching string.      |
| CTRL-s       | (Note that on most machines Ctrl-s STOPS the terminal      |
|              | output, change it with `stty' (Ctrl-q to resume)).         |
'--------------+------------------------------------------------------------'
| n            | Repeat search in the same direction as previous.           |
'--------------+------------------------------------------------------------'
| N            | Repeat search in the opposite direction as previous.       |
'--------------+------------------------------------------------------------'
| G            | Move to history line N (for example, 15G).                 |
'--------------'------------------------------------------------------------'

 ======================== History Expansion Summary ========================
 
 Event Designators:

.--------------.------------------------------------------------------------.
|              |                                                            |
| Designator   | Description                                                |
|              |                                                            |
'--------------+------------------------------------------------------------'
| !            | Start a history substitution.                              |
'--------------+------------------------------------------------------------'
| !!           | Refer to the last command.                                 |
'--------------+------------------------------------------------------------'
| !n           | Refer to the n-th command line (try `history' command).    |
'--------------+------------------------------------------------------------'
| !-n          | Refer to the current command line minus n.                 |
'--------------+------------------------------------------------------------'
| !string      | Refer to the most recent command starting with 'string'.   |
'--------------+------------------------------------------------------------'
| !?string?    | Refer to the most recent command containing 'string'.      |
'--------------+------------------------------------------------------------'
| ^str1^str2^  | Quick substitution. Repeat the last command, replacing     |
|              | 'str1' with 'str2'.                                        |
'--------------+------------------------------------------------------------'
| !#           | Refer to the entire command line typed so far.             |
'--------------'------------------------------------------------------------'

 Word Designators:
 (Word designators follow the event designators, separated by a collon ':')

.--------------.------------------------------------------------------------.
|              |                                                            |
| Designator   | Description                                                |
|              |                                                            |
'--------------+------------------------------------------------------------'
| 0            | The zeroth (first) word in a line (usually command name).  |
'--------------+------------------------------------------------------------'
| n            | The n-th word in a line.                                   |
'--------------+------------------------------------------------------------'
| ^            | The first argument (the second word) in a line.            |
'--------------+------------------------------------------------------------'
| $            | The last argument in a line.                               |
'--------------+------------------------------------------------------------'
| %            | The word matched by the most recent string search.         |
'--------------+------------------------------------------------------------'
| x-y          | A range of words from x to y (-y is synonymous with 0-y).  |
'--------------+------------------------------------------------------------'
| *            | All words but the zeroth (synonymous with 1-$).            |
'--------------+------------------------------------------------------------'
| x*           | Synonymous with x-$                                        |
'--------------+------------------------------------------------------------'
| x-           | The words from x to the second to last word.               |
'--------------'------------------------------------------------------------'

 Modifiers (modifiers follow word designators, separated by a colon):

.--------------.------------------------------------------------------------.
|              |                                                            |
| Modifier     | Description                                                |
|              |                                                            |
'--------------+------------------------------------------------------------'
| h            | Remove a trailing pathname component, leaving the head.    |
'--------------+------------------------------------------------------------'
| t            | Remove all leading pathname component, leaving the tail.   |
'--------------+------------------------------------------------------------'
| r            | Remove a trailing suffix of the form .xxx, leaving the     |
|              | basename.                                                  |
'--------------+------------------------------------------------------------'
| e            | Remove all but the trailing suffix.                        |
'--------------+------------------------------------------------------------'
| p            | Print the resulting command but do not execute it.         |
'--------------+------------------------------------------------------------'
| q            | Quotes the substituted words, escaping further             |
|              | substitutions.                                             |
'--------------+------------------------------------------------------------'
| x            | Quotes the substituted words, breaking them into words at  |
|              | blanks and newlines.                                       |
'--------------+------------------------------------------------------------'
| s/old/new/   | Substitutes 'new' for 'old'.                               |
'--------------+------------------------------------------------------------'
| &            | Repeats the previous substitution.                         |
'--------------+------------------------------------------------------------'
| g            | Causes s/old/new/ or & to be applied over the entire       |
|              | event line.                                                |
'--------------'------------------------------------------------------------'

 ============ History Behavior Modification via Shell Variables ============

.----------------.----------------------------------------------------------.
|                |                                                          |
| Shell Variable | Description                                              |
|                |                                                          |
'----------------+----------------------------------------------------------'
| HISTFILE       | Controls where the history file gets saved.              |
|                | Set to /dev/null not to save the history.                |
|                | Default: ~/.bash_history                                 |
'----------------+----------------------------------------------------------'
| HISTFILESIZE   | Controls how many history commands to keep in HISTFILE   |
|                | Default: 500                                             |
'----------------+----------------------------------------------------------'
| HISTSIZE       | Controls how many history commands to keep in the        |
|                | history list of current session.                         |
|                | Default: 500                                             |
'----------------+----------------------------------------------------------'
| HISTIGNORE     | Controls which commands to ignore and not save to the    |
|                | history list. The variable takes a list of               |
|                | colon separated values. Pattern & matches the previous   |
|                | history command.                                         |
'----------------'----------------------------------------------------------'

 ============ History Behavior Modification via `shopt' Command ============

.----------------.----------------------------------------------------------.
|                |                                                          |
| shopt Option   | Description                                              |
|                |                                                          |
'----------------+----------------------------------------------------------'
| histappend     | Setting the variable appends current session history to  |
|                | HISTFILE. Unsetting overwrites the file each time.       |
'----------------+----------------------------------------------------------'
| histreedit     | If set, puts a failed history substitution back on the   |
|                | command line for re-editing.                             |
'----------------+----------------------------------------------------------'
| histverify     | If set, puts the command to be executed after a          |
|                | substitution on command line as if you had typed it.     |
'----------------'----------------------------------------------------------'

 shopt options can be set by a `shopt -s option' and
 can be unset by             a `shopt -u option'.

 =============================== Examples ==================================

 $ echo a b c d e    (executes `echo ab c d e`)
 a b c d e

 $ echo !!:3-$       (executes `echo c d e`)
 c d e

 $ echo !-2:*:q      (executes `echo 'a b c d e'`)
 a b c d e

 $ echo !-3:1:2:4:x  (executes `echo 'a' 'b' 'd'`)
 a b d

 $ echo !-4:1-3:s/a/foo/:s/b/bar/:s/c/baz/ (executes `echo foo bar baz`)
 foo bar baz

 $ tar -xzf package-x.y.z.tgz
 ...
 $ cd !-1:$:r        (executes `cd package-x.y.z`)
 package-x.y.z $
 
 $ ls -a /tmp
 file1  file2  file3 ...

 $ ^-a^-l^           (executes `ls -l /tmp`)
 -rw-------  1  user  user  file1
 ...

 ===========================================================================

.---------------------------------------------------------------------------.
| Peteris Krumins (peter@catonmat.net), 2008.02.15                          |
| http://www.catonmat.net  -  good coders code, great reuse                 | 
|                                                                           |
| Released under the GNU Free Document License                              |
'---------------------------------------------------------------------------'
```

## 3.10 $ man -P 'less -p ^HISTORY\ EXPANSION' bash

```text
<...>
Word Designators

Word designators are used to select desired words from the event.
A : separates the event specification from the word designator.
It may be omitted if the word designator begins with a ^, $, *, -,
or %.  Words are numbered from the beginning of the line, with the
first word being denoted by 0 (zero).  Words are inserted into the
current line separated by single spaces.

   0 (zero)
          The zeroth word.  For the shell, this is the command word.
   n      The nth word.
   ^      The first argument.  That is, word 1.
   $      The last argument.
   %      The word matched by the most recent ‘?string?’ search.
   x-y    A range of words; ‘-y’ abbreviates ‘0-y’.
   *      All of the words but the zeroth.
          This is a synonym for ‘1-$’.  
          It is not an error to use * if there is just one word in
          the event; the empty string is returned in that case.
   x*     Abbreviates x-$.
   x-     Abbreviates x-$ like x*, but omits the last word.

   If a word designator is supplied without an event
   specification, the previous command is used as the event.
```
