---
type: reference
title: Chapter 6. Exit and Exit Status
description: "ABS Guide chapter 6: exit command and exit status of scripts and commands."
tags: [bash, shell, legacy, book-notes, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#12.3"
---

# 12.3 Chapter 6. Exit and Exit Status

[↑ Advanced Bash-Scripting Guide](/bash/kb-bash/12-advanced-bash-scripting-guide/README.md)

```text
The  exit  command may be used to terminate a script, just as in a C program. It can also return a value, which is available to the script's parent process.

Every command returns an exit status (sometimes referred to as a return status or exit code). A successful command returns a 0, while an unsuccessful one returns a non-zero value that usually may be interpreted as an error code. Well-behaved UNIX commands, programs, and utilities return a 0 exit code upon successful completion, though there are some exceptions.

Likewise, functions within a script and the script itself return an exit status. The last command executed in the function or script determines the exit status. Within a script, an exit nnn command may be used to deliver an nnn exit status to the shell (nnn must be a decimal number in the 0 - 255 range).

Note	When a script ends with an exit that has no parameter, the exit status of the script is the exit status of the last command executed in the script (previous to the exit).

#!/bin/bash

COMMAND_1

. . .

# Will exit with status of last command.
COMMAND_LAST

exit

The equivalent of a bare exit is exit $? or even just omitting the exit.

#!/bin/bash

COMMAND_1

. . .

# Will exit with status of last command.
COMMAND_LAST

exit $?

#!/bin/bash

COMMAND1

. . . 

# Will exit with status of last command.
COMMAND_LAST

$? reads the exit status of the last command executed. After a function returns, $? gives the exit status of the last command executed in the function. This is Bash's way of giving functions a "return value." After a script terminates, a $? from the command line gives the exit status of the script, that is, the last command executed in the script, which is, by convention, 0 on success or an integer in the range 1 - 255 on error.

Example exit / exit status

#!/bin/bash

echo hello
echo $?    # Exit status 0 returned because command executed successfully.

lskdf      # Unrecognized command.
echo $?    # Non-zero exit status returned because command failed to execute.

echo

exit 113   # Will return 113 to shell.
           # To verify this, type "echo $?" after script terminates.

#  By convention, an 'exit 0' indicates success,
#+ while a non-zero exit value means an error or anomalous condition.

$? is especially useful for testing the result of a command in a script (see Example 15-33 and Example 15-18).

Note	The !, the logical not qualifier, reverses the outcome of a test or command, and this affects its exit status.

Example Negating a condition using !

true    # The "true" builtin.
echo "exit status of \"true\" = $?"     # 0

! true
echo "exit status of \"! true\" = $?"   # 1
# Note that the "!" needs a space between it and the command.
#    !true   leads to a "command not found" error
#
# The '!' operator prefixing a command invokes the Bash history mechanism.

true
!true
# No error this time, but no negation either.
# It just repeats the previous command (true).

# Thanks, Stéphane Chazelas and Kristopher Newsome.

Caution	

Certain exit status codes have reserved meanings and should not be user-specified in a script. 
```
