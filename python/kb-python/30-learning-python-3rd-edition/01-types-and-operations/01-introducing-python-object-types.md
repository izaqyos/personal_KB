---
type: reference
title: Introducing Python Object Types
description: "Learning Python 3rd ed. notes, Introducing Python Object Types"
tags: [python, book-notes, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#30.1.1"
---

# 30.1.1. Introducing Python Object Types

[↑ Types and Operations](/python/kb-python/30-learning-python-3rd-edition/01-types-and-operations/README.md)

```text
This chapter begins our tour of the Python language. In an informal sense, in Python, we do things with stuff. "Things" take the form of operations like addition and concatenation, and "stuff" refers to the objects on which we perform those operations. In this part of the book, our focus is on that stuff, and the things our programs can do with it.

Somewhat more formally, in Python, data takes the form of objects--either built-in objects that Python provides, or objects we create using Python or external language tools such as C extension libraries. Although we'll firm up this definition later, objects are essentially just pieces of memory, with values and sets of associated operations.

Because objects are the most fundamental notion in Python programming, we'll start this chapter with a survey of Python's built-in object types.

By way of introduction, however, let's first establish a clear picture of how this chapter fits into the overall Python picture. From a more concrete perspective, Python programs can be decomposed into modules, statements, expressions, and objects, as follows:

   |1.  Programs are composed of modules.
   |2.  Modules contain statements.
   |3.  Statements contain expressions.
   |4.  Expressions create and process objects.

The discussion of modules in Chapter 3 introduced the highest level of this hierarchy. This part's chapters begin at the bottom, exploring both built-in objects and the expressions you can code to use them.
```

#### 30.1.1.1 Why Use Built-in Types?

```text
If you've used lower-level languages such as C or C++, you know that much of your work centers on implementing objects--also known as data structuresto represent the components in your application's domain. You need to lay out memory structures, manage memory allocation, implement search and access routines, and so on. These chores are about as tedious (and error prone) as they sound, and they usually distract from your program's real goals.

In typical Python programs, most of this grunt work goes away. Because Python provides powerful object types as an intrinsic part of the language, there's usually no need to code object implementations before you start solving problems. In fact, unless you have a need for special processing that built-in types don't provide, you're almost always better off using a built-in object instead of implementing your own. Here are some reasons why:

    * Built-in objects make programs easy to write. For simple tasks, built-in types are often all you need to represent the structure of problem domains. Because you get powerful tools such as collections (lists) and search tables (dictionaries) for free, you can use them immediately. You can get a lot of work done with Python's built-in object types alone.
    * Built-in objects are components of extensions. For more complex tasks, you still may need to provide your own objects, using Python classes or C language interfaces. But as you'll see in later parts of this book, objects implemented manually are often built on top of built-in types such as lists and dictionaries. For instance, a stack data structure may be implemented as a class that manages or customizes a built-in list.
    * Built-in objects are often more efficient than custom data structures. Python's built-in types employ already optimized data structure algorithms that are implemented in C for speed. Although you can write similar object types on your own, you'll usually be hard-pressed to get the level of performance built-in object types provide.
    * Built-in objects are a standard part of the language. In some ways, Python borrows both from languages that rely on built-in tools (e.g., LISP) and languages that rely on the programmer to provide tool implementations or frameworks of their own (e.g., C++). Although you can implement unique object types in Python, you don't need to do so just to get started. Moreover, because Python's built-ins are standard, they're always the same; proprietary frameworks, on the other hand, tend to differ from site to site.

In other words, not only do built-in object types make programming easier, but they're also more powerful and efficient than most of what can be created from scratch. Regardless of whether you implement new object types, built-in objects form the core of every Python program.
```

#### 30.1.1.1.1 Python's Core Data Types

```text
Table 4-1 previews Python's built-in object types and some of the syntax used to code their literals--that is, the expressions that generate these objects.[11] Some of these types will probably seem familiar if you've used other languages; for instance, numbers and strings represent numeric and textual values, respectively, and files provide an interface for processing files stored on your computer.

    [11] * In this book, the term literal simply means an expression whose syntax generates an objectsometimes also called a constant. Note that the term "constant" does not imply objects or variables that can never be changed (i.e., this term is unrelated to C++'s const or Python's "immutable"a topic explored later in this chapter).

Table 4-1. Built-in objects preview
Object type 	Example literals/creation
Numbers 	1234, 3.1415, 999L, 3+4j, Decimal
Strings 	'spam', "guido's"
Lists 	[1, [2, 'three'], 4]
Dictionaries 	{'food': 'spam', 'taste': 'yum'}
Tuples 	(1,'spam', 4, 'U')
Files 	myfile = open('eggs', 'r')
Other types 	Sets, types, None, Booleans

Table 4-1 isn't really complete, because everything we process in Python programs is a kind of object. For instance, when we perform text pattern matching in Python, we create pattern objects, and when we perform network scripting, we use socket objects. These other kinds of objects are generally created by importing and using modules, and they have behavior all their own.

We call the object types in Table 4-1 core data types because they are effectively built into the Python languagethat is, there is specific syntax for generating most of them. For instance, when you run the following code:


>>> 'spam'


you are, technically speaking, running a literal expression, which generates and returns a new string object. There is specific Python language syntax to make this object. Similarly, an expression wrapped in square brackets makes a list, one in curly braces makes a dictionary, and so on. Even though, as we'll see, there are no type declarations in Python, the syntax of the expressions you run determines the types of objects you create and use. In fact, object-generation expressions like those in Table 4-1 are generally where types originate in the Python language.

Just as importantly, once you create an object, you bind its operation set for all time--you can perform only string operations on a string and list operations on a list. As you'll learn, Python is dynamically typed (it keeps track of types for you automatically instead of requiring declaration code), but it is also strongly typed (you can only perform on an object operations that are valid for its type).

Functionally, the object types in Table 4-1 are more general and powerful than what you may be accustomed to. For instance, you'll find that lists and dictionaries alone are powerful data representation tools that obviate most of the work you do to support collections and searching in lower-level languages. In short, lists provide ordered collections of other objects, while dictionaries store objects by key; both lists and dictionaries may be nested, can grow and shrink on demand, and may contain objects of any type.

We'll study each of the object types in Table 4-1 in detail in upcoming chapters. Before digging into the details, though, let's begin by taking a quick look at Python's core objects in action. The rest of this chapter provides a preview of the operations we'll explore in more depth in the chapters that follow. Don't expect to find the full story herethe goal of this chapter is just to whet your appetite and introduce some key ideas. Still, the best way to get started is to get started, so let's jump right into some real code.
```
