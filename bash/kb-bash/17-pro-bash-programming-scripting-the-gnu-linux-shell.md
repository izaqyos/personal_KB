---
type: reference
title: "Pro Bash Programming: Scripting the GNU/Linux Shell"
description: Section 17 of the legacy KB_bash notes.
tags: [kb-bash]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "bash/KB_bash#17"
---

# Pro Bash Programming: Scripting the GNU/Linux Shell

[↑ KB_bash](/bash/kb-bash/README.md)

```text
By: Chris F.A. Johnson

Publisher: Apress

Pub. Date: October 18, 2009

Print ISBN-13: 978-1-4302-1997-2

Web ISBN-10: 1-4302-1997-1
Chapter 1. Hello, World! Your First Shell Program

Section 1.1. The Code

Section 1.2. The File

Section 1.3. Choosing and Using a Text Editor

Section 1.4. Building a Better "Hello, World!"

Section 1.5. Summary

Section 1.6. Exercises
Download ChapterDownload Chapter
1 TokenChapter 2. Input, Output, and Throughput

Section 2.1. Parameter and Variables

Section 2.2. Arguments and Options

Section 2.3. echo, and Why You Should Avoid It

Section 2.4. printf: Formatting and Printing Data

Section 2.5. Line Continuation

Section 2.6. Standard Input/Output Streams and Redirection

Section 2.7. Reading Input

Section 2.8. Pipelines

Section 2.9. Command Substitution

Section 2.10. Summary

Section 2.11. Exercises
Download ChapterDownload Chapter
1 TokenChapter 3. Looping and Branching

Section 3.1. Exit Status

Section 3.2. Testing an Expression

Section 3.3. Lists

Section 3.4. Conditional execution

Section 3.5. Looping

Section 3.6. Summary

Section 3.7. Exercises
Download ChapterDownload Chapter
1 TokenChapter 4. Command-Line Parsing and Expansion

Section 4.1. Quoting

Section 4.2. Brace Expansion

Section 4.3. Tilde Expansion

Section 4.4. Parameter and Variable Expansion

Section 4.5. Arithmetic Expansion

Section 4.6. Command Substitution

Section 4.7. Word Splitting

Section 4.8. Pathname Expansion

Section 4.9. Process Substitution

Section 4.10. Parsing Options

Section 4.11. Summary

Section 4.12. Exercises
Download ChapterDownload Chapter
1 TokenChapter 5. Parameters and Variables

Section 5.1. The Scope of a Variable: Can You See It from Here?

Section 5.2. Shell Variables

Section 5.3. The Naming of Variables

Section 5.4. Parameter Expansion

Section 5.5. Positional Parameters

Section 5.6. Arrays

Section 5.7. Summary

Section 5.8. Exercises
Download ChapterDownload Chapter
1 TokenChapter 6. Shell Functions

Section 6.1. Definition Syntax

Section 6.2. Compound Commands

Section 6.3. Getting Results

Section 6.4. Function Libraries

Section 6.5. Sample Script

Section 6.6. Summary

Section 6.7. Exercises
Download ChapterDownload Chapter
1 TokenChapter 7. String Manipulation

Section 7.1. Concatenation

Section 7.2. Processing Character by Character

Section 7.3. Case Conversion

Section 7.4. Comparing Contents Without Regard to Case

Section 7.5. Check for Valid Variable Name

Section 7.6. Insert One String into Another

Section 7.7. Overlay

Section 7.8. Trim Unwanted Characters

Section 7.9. Index

Section 7.10. Summary

Section 7.11. Exercises
```

## 17.8. File Operations and Commands

```text
Because the shell is an interpreted language, it is comparatively slow. Many operations on files are best done with external commands that implicitly loop over the lines of a file. At other times, the shell itself is more efficient. This chapter looks at how the shell works with files—both shell options that modify and extend file name expansion and shell options that read and modify the contents of files. Several external commands that work on files are explained, often accompanied by examples of when not to use them.

Some of the scripts in this chapter use an especially prepared file containing the King James version of the Bible. The file can be downloaded from http://cfaj.freeshell.org/kjv/kjv.txt. Download it to your home directory with wget:

wget http://cfaj.freeshell.org/kjv/kjv.txt


In this file, each verse of the bible is on a single line preceded by the name of the book and the chapter and verse numbers, all delimited with colons:

Genesis:001:001:In the beginning God created the heaven and the earth.
Exodus:020:013:Thou shalt not kill.
Exodus:022:018:Thou shalt not suffer a witch to live.
John:011:035:Jesus wept.


The path to the file will be kept in the variable kjv, which will be used whenever the file is needed.

export kjv=$HOME/kjv.txt
```

### 17.8.1 Section 8.1. Reading a File

```text
The most basic method of reading the contents of a file is a while loop with its input redirected:

while read ## no name supplied so the variable REPLY is used
do
  : do something with "$REPLY" here
done < "$kjv"


The file will be stored, one line at a time, in the variable REPLY. More commonly, one or more variable names will be supplied as arguments to read:

while read name phone
do
  printf "Name: %−10s\tPhone: %s\n" "$name" "$phone"
done < "$file"


The lines are split using the characters in IFS as word delimiters. If the file contained in $file contains these two lines:

John 555-1234
Jane 555-7531


the output of the previous snippet will be as follows:

Name: John     Phone: 555-1234
Name: Jane     Phone: 555-7531


By changing the value of IFS before the read command, other characters can be used for word splitting. The same script, using only a hyphen in IFS instead of the default space, tab, and newline, would produce this:

$ while IFS=- read name phone
> do
> printf "Name: %−10s\tPhone: %s\n" "$name" "$phone"
> done < "$file"
Name: John 555 Phone: 1234
Name: Jane 555 Phone: 7531


Placing an assignment in front of a command causes it to be local to that command and does not change its value elsewhere in the script.

To read the King James version of the Bible (henceforth referred to as KJV), the field separator IFS should be set to a colon so that lines can be split into book, chapter, verse, and text, each being assigned to a separate variable (Listing 8-1).
Listing 8.1. kjvfirsts, Print Book, Chapter, Verse, and First Words from KJV

while IFS=: read book chapter verse text
do
  firstword=${text%% *}
  printf "%s %s:%s %s\n" "$book" "$chapter" "$verse" "$firstword"
done < "$kjv"


The output (with more than 31,000 lines replaced by a single ellipsis) looks like this:

Genesis 001:001 In
Genesis 001:002 And
Genesis 001:003 And
...
Revelation 022:019 And
Revelation 022:020 He
Revelation 022:021 The


On my computer, a 1.6GHz Pentium 4 with many applications running, this script takes more than half a minute to run. The same task written in awk takes about a quarter of the time. See the section on awk later in this chapter for the script.

The awk programming language is often used in shell scripts when the shell itself is too slow (as in this case) or when features not present in the shell are required (for example, arithmetic using decimal fractions). The language is explained in somewhat more detail in the following section.
```

### 17.8.2 Section 8.2. External Commands

### 17.8.3 Section 8.3. Regular Expressions

### 17.8.4 Section 8.4. File Name Expansion Options

### 17.8.5 Section 8.5. Summary

### 17.8.6 Section 8.6. Exercises

```text
1 TokenChapter 9. Reserved Words and Builtin Commands

Section 9.1. help, Display Information About Builtin Commands

Section 9.2. time, Print Time Taken for Execution of a Command

Section 9.3. read, Read a Line from an Input Stream

Section 9.4. type, Display Information About Commands

Section 9.5. builtin, Execute a Builtin Command

Section 9.6. command, Execute a Command or Display Information About Commands

Section 9.7. pwd, Print the Current Working Directory

Section 9.8. Deprecated Builtins

Section 9.9. Dynamically Loadable Builtins

Section 9.10. Summary

Section 9.11. Exercises
Download ChapterDownload Chapter
1 TokenChapter 10. Writing Bug-Free Scripts and Debugging the Rest

Section 10.1. Prevention Is Better Than Cure

Section 10.2. Debugging a Script

Section 10.3. Summary

Section 10.4. Exercises
Download ChapterDownload Chapter
1 TokenChapter 11. Programming for the Command Line

Section 11.1. Manipulating the Directory Stack

Section 11.2. Filesystem Functions

Section 11.3. Miscellaneous Functions

Section 11.4. Managing Man Pages

Section 11.5. Games

Section 11.6. Summary

Section 11.7. Exercises
Download ChapterDownload Chapter
1 TokenChapter 12. Runtime Configuration

Section 12.1. Defining Variables

Section 12.2. Command-Line Options and Arguments

Section 12.3. Menus

Section 12.4. Q&A Dialogue

Section 12.5. Configuration Files

Section 12.6. Scripts with Several Names

Section 12.7. Environment Variables

Section 12.8. All Together Now

Section 12.9. Summary

Section 12.10. Exercises
Download ChapterDownload Chapter
1 TokenChapter 13. Data Processing

Section 13.1. Arrays

Section 13.2. Data File Formats

Section 13.3. Summary

Section 13.4. Exercises
Download ChapterDownload Chapter
1 TokenChapter 14. Scripting the Screen

Section 14.1. Teletypewriter vs. Canvas

Section 14.2. Stretching the Canvas

Section 14.3. Priming the Canvas

Section 14.4. Moving the Cursor

Section 14.5. Changing Rendition Modes and Colors

Section 14.6. Placing a Block of Text on the Screen

Section 14.7. Scrolling Text

Section 14.8. Rolling Dice

Section 14.9. Summary

Section 14.10. Exercises
Download ChapterDownload Chapter
1 TokenChapter 15. Entry-Level Programming

Section 15.1. Single-Key Entry

Section 15.2. History in Scripts

Section 15.3. Sanity Checking

Section 15.4. Form Entry

Section 15.5. Reading the Mouse

Section 15.6. Summary

Section 15.7. Exercises
Appendix A. Shell Variables

Section A.1. BASH

Section A.2. BASHPID

Section A.3. BASH_ALIASES

Section A.4. BASH_ARGC

Section A.5. BASH_ARGV

Section A.6. BASH_CMDS

Section A.7. BASH_COMMAND

Section A.8. BASH_EXECUTION_STRING

Section A.9. BASH_LINENO

Section A.10. BASH_REMATCH

Section A.11. BASH_SOURCE

Section A.12. BASH_SUBSHELL

Section A.13. BASH_VERSINFO

Section A.14. BASH_VERSION

Section A.15. COMP_CWORD

Section A.16. COMP_KEY

Section A.17. COMP_LINE

Section A.18. COMP_POINT

Section A.19. COMP_TYPE

Section A.20. COMP_WORDBREAKS

Section A.21. COMP_WORDS

Section A.22. DIRSTACK

Section A.23. EUID

Section A.24. FUNCNAME

Section A.25. GROUPS

Section A.26. HISTCMD

Section A.27. HOSTNAME

Section A.28. HOSTTYPE

Section A.29. LINENO

Section A.30. MACHTYPE

Section A.31. OLDPWD

Section A.32. OPTARG

Section A.33. OPTIND

Section A.34. OSTYPE

Section A.35. PIPESTATUS

Section A.36. PPID

Section A.37. PWD

Section A.38. RANDOM

Section A.39. REPLY

Section A.40. SECONDS

Section A.41. SHELLOPTS

Section A.42. SHLVL

Section A.43. UID

Section A.44. BASH_ENV

Section A.45. CDPATH

Section A.46. COLUMNS

Section A.47. COMPREPLY

Section A.48. EMACS

Section A.49. FCEDIT

Section A.50. FIGNORE

Section A.51. GLOBIGNORE

Section A.52. HISTCONTROL

Section A.53. HISTFILE

Section A.54. HISTFILESIZE

Section A.55. HISTIGNORE

Section A.56. HISTSIZE

Section A.57. HISTTIMEFORMAT

Section A.58. HOME

Section A.59. HOSTFILE

Section A.60. IFS

Section A.61. IGNOREEOF

Section A.62. INPUTRC

Section A.63. LANG

Section A.64. LC_ALL

Section A.65. LC_COLLATE

Section A.66. LC_CTYPE

Section A.67. LC_MESSAGES

Section A.68. LC_NUMERIC

Section A.69. LINES

Section A.70. MAIL

Section A.71. MAILCHECK

Section A.72. MAILPATH

Section A.73. OPTERR

Section A.74. PATH

Section A.75. POSIXLY_CORRECT

Section A.76. PROMPT_COMMAND

Section A.77. PROMPT_DIRTRIM

Section A.78. PS1

Section A.79. PS2

Section A.80. PS3

Section A.81. PS4

Section A.82. SHELL

Section A.83. TIMEFORMAT

Section A.84. TMOUT

Section A.85. TMPDIR

Section A.86. auto_resume

Section A.87. histchars
```
