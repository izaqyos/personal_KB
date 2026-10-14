---
type: reference
title: Information Retrieval
description: "Using awk to retrieve information from text-file databases, with a shell wrapper example."
tags: [awk, tutorial, legacy, examples, shell]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "awk/kb_awk#5.12"
---

# 5.12 Information Retrieval

[↑ Awk Tutorials](/awk/kb-awk/06-awk-tutorials/README.md)

### 5.12.1 Basic Example

```text
	An awk program can be used to retrieve information from a database, the database basically being any kind of text file. The more structured the text file, the easier it is to work with, although the structure might be no more than a line consisting of individual words.

The list of acronyms below is a simple database.

    $ cat acronyms
    BASIC	Beginner's All-Purpose Symbolic Instruction Code
    CICS	Customer Information Control System
    COBOL	Common Business Oriented Language
    DBMS	Data Base Management System
    GIGO	Garbage In, Garbage Out
    GIRL 	Generalized Information Retrieval Language

A tab is used as the field separator. We're going to look at a program that takes an acronym as input and displays the appropriate line from the database as output. (In the next chapter, we're going to look at two other programs that use the acronym database. One program reads the list of acronyms and then finds occurrences of these acronyms in another file. The other program locates the first occurrence of these acronyms in a text file and inserts the description of the acronym.)

The shell script that we develop is named acro. It takes the first argument from the command line (the name of the acronym) and passes it to the awk script. The acro script follows:

    $ cat acro
    #! /bin/sh
    # assign shell's $1 to awk search variable
    awk '$1 == search' search=$1 acronyms

The first argument specified on the shell command line ($1) is assigned to the variable named search; this variable is passed as a parameter into the awk program. Parameters passed to an awk program are specified after the script section. (This gets somewhat confusing, because $1 inside the awk program represents the first field of each input line, while $1 in the shell represents the first argument supplied on the command line.)

The example below demonstrates how this program can be used to find a particular acronym on our list.

    $ acro CICS
    CICS Customer Information Control System

Notice that we tested the parameter as a string ($1 == search). We could also have written this as a regular expression match ($1 ~ search).
```

### 5.12.2 Advance example, print a block of text that contains a certain pattern
