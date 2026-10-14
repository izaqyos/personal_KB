---
type: reference
title: IO redirection
description: "I/O redirection with tee, including stdout and stderr handling."
tags: [linux, shell, reference, tips, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#17"
---

# IO redirection

[↑ KB_Linux](/linux/kb-linux/README.md)

## 17.1 tee , tags: tee

```text
tee is normally used to split the output of a program so that it can be seen on the display and also be saved in a file. The command can also be used to capture intermediate output before the data is altered by another command or program. The tee command reads standard input, then writes its content to standard output and simultaneously copies it into the specified file(s) or variables. The syntax differs depending on the command's implementation:

Unix-like

tee [ -a ] [ -i ] [ File ... ]

Arguments:

    * File One or more files that will receive the "tee-d" output.

Flags:

    * -a Appends the output to the end of File instead of writing over it.
    * -i Ignores interrupts.

The command returns the following exit values (exit status):

    * 0 The standard input was successfully copied to all output files.
    * >0 An error occurred.

Note: If a write to any successfully opened File operand is not successful, writes to other successfully opened File operands and standard output will continue, but the exit value will be >0.

4DOS and 4NT

TEE [/A] file...

Arguments:

    * file One or more files that will receive the "tee-d" output.

Flags:

    * /A Append the pipeline content to the output file(s) rather than overwriting them.

Note: When tee is used with a pipe, the output of the previous command is written to a temporary file. When that command finishes, tee reads the temporary file, displays the output, and writes it to the file(s) given as command-line argument.

Windows PowerShell

tee [-FilePath] <String> [-InputObject <PSObject>]
tee -Variable <String> [-InputObject <PSObject>]

Arguments:

    * -InputObject <PSObject> Specifies the object input to the cmdlet. The parameter accepts variables that contain the objects and commands or expression that return the objects.
    * -FilePath <String> Specifies the file where the cmdlet stores the object. The parameter accepts wildcard characters that resolve to a single file.
    * -Variable <String> A reference to the input objects will be assigned to the specified variable.

Note: tee is implemented as a ReadOnly command alias. The internal cmdlet name is Microsoft.PowerShell.Utility\Tee-Object.

Examples

Unix-like

    * To view and save the output from a command (lint) at the same time:

lint program.c | tee program.lint

This displays the standard output of the command lint program.c at the workstation, and at the same time saves a copy of it in the file program.lint. If a file named program.lint already exists, it is deleted and replaced.

    * To view and save the output from a command to an existing file:

lint program.c | tee -a program.lint

This displays the standard output of the lint program.c command at the workstation and at the same time appends a copy of it to the end of the program.lint file. If the program.lint file does not exist, it is created.

    * To allow escalation of permissions:

echo "Body of file..." | sudo tee root_owned_file > /dev/null

This example shows tee being used to bypass an inherent limitation in the sudo command. sudo is unable to pipe the standard output to a file. By dumping its stdout stream into /dev/null, we also suppress the mirrored output in the console.

4DOS and 4NT

This example searches the file wikipedia.txt for any lines containing the string "4DOS", makes a copy of the matching lines in 4DOS.txt, sorts the lines, and writes them to the output file 4DOSsorted.txt:

c:\> find "4DOS" wikipedia.txt | tee 4DOS.txt | sort > 4DOSsorted.txt

Windows PowerShell

    * To view and save the output from a command at the same time:

ipconfig | tee OutputFile.txt

This displays the standard output of the command ipconfig at the console window, and simultaneously saves a copy of it in the file OutputFile.txt.

    * To display and save all running processes, filtered so that only programs starting with svc and owning more than 1000 handles are outputted:

gps | where { $_.Name -like "svc*" } | tee ABC.txt | where { $_.Handles -gt 1000 }

This example shows that the piped input for tee can be filtered and that tee is used to display that output, which is filtered again so that only processes owning more than 1000 handles are displayed, and writes the unfiltered output to the file ABC.txt.
```

## 17.2 Manual

```text
tee(1) - Linux man page

Name

tee - read from standard input and write to standard output and files
Synopsis

tee [OPTION]... [FILE]...
Description


 
Copy standard input to each FILE, and also to standard output.

-a, --append
append to the given FILEs, do not overwrite
-i, --ignore-interrupts
ignore interrupt signals
--help
display this help and exit
--version
output version information and exit
If a FILE is -, copy again to standard output.

Author

Written by Mike Parker, Richard M. Stallman, and David MacKenzie.
Reporting Bugs

Report bugs to <bug-coreutils@gnu.org>.
Copyright

Copyright � 2006 Free Software Foundation, Inc.
This is free software. You may redistribute copies of it under the terms of the GNU General Public License <http://www.gnu.org/licenses/gpl.html>. There is NO WARRANTY, to the extent permitted by law.
See Also

The full documentation for tee is maintained as a Texinfo manual. If the info and tee programs are properly installed at your site, the command
info tee
should give you access to the complete manual.

Referenced By

auto-build(1), pee(1), tee(2), tpipe(1)
```

## 17.3 How to use tee with stdout and stderr?

```text
cmd  2>&1 | tee xyz.log

	17.4
```
