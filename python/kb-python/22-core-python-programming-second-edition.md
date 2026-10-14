---
type: reference
title: "Core Python Programming, Second Edition"
description: "Legacy Python KB section: Core Python Programming, Second Edition (Getting Started, Comments, Operators)"
tags: [book-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "python/KB_python#22"
---

# Core Python Programming, Second Edition

> **Deprecated (2026-10):** Core Python 2nd ed notes; print statement era. Current: Python 3 print(), except as, dict.items(); Py2 EOL 2020. Source: <https://www.python.org/doc/sunset-python-2/>

[↑ KB_python](/python/kb-python/README.md)

## 22.1 Getting Started

```text
This "quick start" section is intended to "flash" Python to you so that any constructs recognized from previous programming experience can be used for your immediate needs. The details will be spelled out in succeeding chapters, but a high-level tour is one fast and easy way to get you into Python and show you what it has to offer. The best way to follow along is to bring up the Python interpreter in front of you and try some of these examples, and at the same time you can experiment on your own.

We introduced how to start up the Python interpreter in Chapter 1 as well as in the exercises (Problems 1-4). In all interactive examples, you will see the Python primary ( >>> ) and secondary ( ... ) prompts. The primary prompt is a way for the interpreter to let you know that it is expecting the next Python statement, while the secondary prompt indicates that the interpreter is waiting for additional input to complete the current statement.

You will notice two primary ways that Python "does things" for you: statements and expressions (functions, equations, etc.). Most of you already know the difference between the two, but in case you need to review, a statement is a body of control which involves using keywords. It is similar to issuing a command to the interpreter. You ask Python to do something for you, and it will do it. Statements may or may not lead to a result or output. Let us use the print statement for the programmer's perennial first example, Hello World:

   >>> print 'Hello World!'
   Hello World!


Expressions, on the other hand, do not use keywords. They can be simple equations that you use with mathematical operators, or can be functions which are called with parentheses. They may or may not take input, and they may or may not return a (meaningful) value. (Functions that do not explicitly return a value by the programmer automatically return None, Python's equivalent to NULL.) An example of a function that takes input and has a return value is the abs() function, which takes a number and returns its absolute value is:

  >>> abs(4)
  4
  >>> abs(-4)
  4


We will introduce both statements and expressions in this chapter. Let us continue with more about the print statement.
```

### 22.1.1 Program Output, the print Statement, and "Hello World!"

```text
Python's print statement (2.x) or function (3.x) is the tool for displaying program output to your users, similar to C's printf() and echo for shell scripts. In fact, it even supports printf()-style string substitution (using the % string format operator):

>>> print "%s is number %d!" % ("Python", 1)
Python is number 1!


Core Note: Dumping variable contents in interactive interpreter

	

Usually when you want to see the contents of a variable, you use the print statement in your code. However, from within the interactive interpreter, you can use the print statement to give you the string representation of a variable, or just dump the variable raw-this is accomplished by simply giving the name of the variable.

In the following example, we assign a string variable, then use print to display its contents. Following that, we issue just the variable name.

>>> myString = 'Hello World!'
>>> print myString
Hello World!
>>> myString
'Hello World!'


Notice how just giving only the name reveals quotation marks around the string. The reason for this is to allow objects other than strings to be displayed in the same manner as this string-being able to display a printable string representation of any object, not just strings. The quotes are there to indicate that the object whose value you just dumped to the display is a string. Once you become more familiar with Python, you will recognize that str() is used for print statements, while repr() is what the interactive interpreter calls to display your objects.

The underscore (_) also has special meaning in the interactive interpreter: the last evaluated expression. So after the code above has executed, _ will contain the string:

 >>> _
 'Hello World!'



%s means to substitute a string while %d indicates an integer should be substituted. See Section 6.4.1 for more information on the string format operator. Also see the str.format() method added in 2.6.

The print statement can also redirect output to a file. Debugging in 2.0, the >> symbols precede a valid file, such as these 2 examples, one to standard error and the other to a log file:

import sys
print >> sys.stderr, 'Fatal error: invalid input!'

logfile = open('/tmp/mylog.txt', 'a')
print >> logfile, 'Fatal error: invalid input!'
logfile.close()


print is changing to a function [print()] in Python 3.0-also see Python Enhancement Proposal (PEP) 3105 (more in PEPs coming up in the Core Note on p. 54). This is a significant change, so starting in Python 2.6, you can start coding against the new function by adding this special import statement:

from __future__ import print_function


The syntax of the new function is:

print(*args, sep=' ', end='\n', file=None)


For example:

print('Fatal error: invalid input!', file=sys.stderr)
```

### 22.1.2 Program Input and the raw_input()Built-in Function

```text
>>> str=""
>>> while str != 'stop':
...     str=raw_input("\nPlz enter stop to stop\n")
... 

Plz enter stop to stop
stop
```

### 22.1.3 Comments

### 22.1.4 Operators

### 22.1.5 Variables and Assignment

### 22.1.6 Numbers

### 22.1.7 Strings

### 22.1.8 Lists and Tuples

### 22.1.9 Dictionaries

### 22.1.10 Code Blocks Use Indentation

### 22.1.11 if Statement

### 22.1.12 while Loop

### 22.1.13 for Loop and the range() Built-in Function

### 22.1.14 List Comprehensions

### 22.1.15 Files and the open() and file() Built-in Functions

### 22.1.16 Errors and Exceptions

### 22.1.17 Functions

### 22.1.18 Classes

### 22.1.19 Modules

### 22.1.20 Useful Functions

### 22.1.21 Exercises
