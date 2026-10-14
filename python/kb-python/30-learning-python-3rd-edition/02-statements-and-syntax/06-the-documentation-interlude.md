---
type: reference
title: The Documentation Interlude
description: "Learning Python 3rd ed. notes, The Documentation Interlude"
tags: [python, book-notes, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "python/KB_python#30.2.5"
---

# 30.2.5. The Documentation Interlude

> **Deprecated (2026-10):** Old book edition, Python 2.5. Current: print(square(4)). Source: <https://docs.python.org/3/whatsnew/3.0.html>

[↑ Statements and Syntax](/python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/README.md)

```text
This chapter concludes Part 3  with a look at techniques and tools used for documenting Python code. Although Python code is designed to be readable, a few well-placed human-readable comments can do much to help others understand the workings of your programs. Python includes syntax and tools to make documentation easier.

Although this is something of a tools-related concept, the topic is presented here partly because it involves Python's syntax model, and partly as a resource for readers struggling to understand Python's toolset. For the latter purpose, I'll expand here on documentation pointers first given in Chapter 4. As usual, this chapter ends with some warnings about common pitfalls, a chapter quiz, and a set of exercises for this part of the text.
```

#### 30.2.5.1 Python Documentation Sources

```text
By this point in the book, you're probably starting to realize that Python comes with an amazing amount of prebuilt functionalitybuilt-in functions and exceptions, predefined object attributes and methods, standard library modules, and more. Moreover, we've really only scratched the surface of each of these categories.

One of the first questions that bewildered beginners often ask is: how do I find information on all the built-in tools? This section provides hints on the various documentation sources available in Python. It also presents documentation strings (docstrings), and the PyDoc system that makes use of them. These topics are somewhat peripheral to the core language itself, but they become essential knowledge as soon as your code reaches the level of the examples and exercises in this part of the book.

As summarized in Table 14-1, there are a variety of places to look for information on Python with generally increasing verbosity. Because documentation is such a crucial tool in practical programming, we'll explore each of these categories in the sections that follow.

Table 14-1. Python documentation sources
Form 	Role
# comments 	In-file documentation
The dir function 	Lists of attributes available in objects
Docstrings: __doc__ 	In-file documentation attached to objects
PyDoc: The help function 	Interactive help for objects
PyDoc: HTML reports 	Module documentation in a browser
Standard manual set 	Official language and library descriptions
Web resources 	Online tutorials, examples, and so on
Published books 	Commercially available reference texts
```

#### 30.2.5.1.1 # Comments

```text
Hash-mark comments are the most basic way to document your code. Python simply ignores all the text following a # (as long as it's not inside a string literal), so you can follow this character with words and descriptions meaningful to programmers. Such comments are accessible only in your source files, though; to code comments that are more widely available, use docstrings.

In fact, current best practice generally dictates that docstings are best for larger functional documentation (e.g., "my file does this"), and # comments are best limited to smaller code documentation (e.g., "this strange expression does this"). More on docstrings in a moment.
```

#### 30.2.5.1.2 The dir Function

```text
The built-in dir function is an easy way to grab a list of all the attributes available inside an object (i.e., its methods and simpler data items). It can be called on any object that has attributes. For example, to find out what's available in the standard library's sys module, import it, and pass it to dir:
Code View: Scroll / Show All


>>> import sys 
>>> dir(sys) 
['__displayhook__', '__doc__', '__excepthook__', '__name__',
'__stderr__', '__stdin__', '__stdout__', '_getframe', 'argv',
'builtin_module_names', 'byteorder', 'copyright', 'displayhook',
'dllhandle', 'exc_info', 'exc_type', 'excepthook',
...more names omitted... ]

					    


Only some of the many names are displayed here; run these statements on your machine to see the full list.

To find out what attributes are provided in built-in object types, run dir on a literal of the desired type. For example, to see list and string attributes, you can pass empty objects:


>>> dir([]) 
['__add__', '__class__', ...more... 
'append', 'count', 'extend', 'index', 'insert', 'pop', 'remove',
'reverse', 'sort']

>>> dir('') 
['__add__', '__class__', ...more... 
'capitalize', 'center', 'count', 'decode', 'encode', 'endswith',
'expandtabs', 'find', 'index', 'isalnum', 'isalpha', 'isdigit',
'islower', 'isspace', 'istitle', 'isupper', 'join', 'ljust',
...more names omitted... ]


dir results for any built-in type include a set of attributes that are related to the implementation of that type (technically, operator overloading methods); they all begin and end with double underscores to make them distinct, and you can safely ignore them at this point in the book.

Incidentally, you can achieve the same effect by passing a type name to dir instead of a literal:


>>> dir(str) == dir('')  # Same result as prior example
True
>>> dir(list) == dir([]) 
True


This works because functions like str and list that were once type converters are actually names of types in Python today; calling one of these invokes its constructor to generate an instance of that type. I'll have more to say about constructors and operator overloading methods when we discuss classes in Part 6.

The dir function serves as a sort of memory-joggerit provides a list of attribute names, but it does not tell you anything about what those names mean. For such extra information, we need to move on to the next documentation source.
```

#### 30.2.5.1.3 Docstrings: __doc__

```text
Besides # comments, Python supports documentation that is automatically attached to objects, and retained at runtime for inspection. Syntactically, such comments are coded as strings at the tops of module files and function and class statements, before any other executable code (# comments are OK before them). Python automatically stuffs the string, known as a docstring, into the __doc__ attribute of the corresponding object.
```

#### 30.2.5.1.3.1 User-defined docstrings

```text
For example, consider the following file, docstrings.py. Its docstrings appear at the beginning of the file and at the start of a function and a class within it. Here, I've used triple-quoted block strings for multiline comments in the file and the function, but any sort of string will work. We haven't studied the def or class statements in detail yet, so ignore everything about them except the strings at their tops:


"""
Module documentation
Words Go Here
"""

spam = 40

def square(x):
    """
    function documentation
    can we have your liver then?
    """
    return x **2

class employee:
    "class documentation"
    pass

print square(4)
print square.__doc__


The whole point of this documentation protocol is that your comments are retained for inspection in __doc__ attributes, after the file is imported. Thus, to display the docstrings associated with the module and its objects, we simply import the file and print their __doc__ attributes, where Python has saved the text:


>>> import docstrings
16

    function documentation
    can we have your liver then?

>>> print docstrings.__doc__

Module documentation
Words Go Here

>>> print docstrings.square.__doc__

    function documentation
    can we have your liver then?

>>> print docstrings.employee.__doc__
    class documentation


Note that you will generally want to explicitly say print to docstrings; otherwise, you'll get a single string with embedded newline characters.

You can also attach docstrings to methods of classes (covered later), but because these are just def statements nested in classes, they're not a special case. To fetch the docstring of a method function inside a class within a module, follow the path, and go through the class: module.class.method.__doc__ (see the example of method docstrings in Chapter 25).
```

#### 30.2.5.1.3.2 Docstring standards

```text
There is no broad standard about what should go into the text of a docstring (although some companies have internal standards). There have been various markup language and template proposals (e.g., HTML or XML), but they don't seem to have caught on in the Python world. And, frankly, convincing programmers to document their code using handcoded HTML is probably not going to happen in our lifetimes!

Documentation tends to have a low priority amongst programmers in general. Usually, if you get any comments in a file at all, you count yourself lucky. I strongly encourage you to document your code liberally, thoughit really is an important part of well-written code. The point here is that there is presently no standard on the structure of docstrings; if you want to use them, feel free to do so.
```

#### 14.1.3.3. Built-in docstrings

```text
As it turns out, built-in modules and objects in Python use similar techniques to attach documentation above and beyond the attribute lists returned by dir. For example, to see an actual human-readable description of a built-in module, import it and print its __doc__ string:


>>> import sys 
>>> print sys.__doc__ 
This module provides access to some objects
used or maintained by the interpreter and to
...more text omitted... 

Dynamic objects:

argv -- command line arguments; argv[0] is the script pathname if known
path -- module search path; path[0] is the script directory, else ''
modules -- dictionary of loaded modules
...more text omitted... 


Functions, classes, and methods within built-in modules have attached descriptions in their __doc__ attributes as well:


>>> print sys.getrefcount.__doc__ 
getrefcount(object) -> integer

Return the current reference count for the object.
...more text omitted... 


You can also read about built-in functions via their docstrings:


>>> print int.__doc__ 
int(x[, base]) -> integer

Convert a string or number to an integer, if possible.
...more text omitted... 

>>> print file.__doc__ 
file(name[, mode[, buffering]]) -> file object

Open a file.  The mode can be 'r', 'w' or 'a' for reading
...more text omitted... 


You can get a wealth of information about built-in tools by inspecting their docstrings this way, but you don't have tothe help function, the topic of the next section, does this automatically for you.
```

#### 30.2.5.1.4 PyDoc: The help Function

```text
The docstring technique has proved to be so useful that Python now ships with a tool that makes them even easier to display. The standard PyDoc tool is Python code that knows how to extract docstrings together with automatically extracted structural information, and format them into nicely arranged reports of various types.

There are a variety of ways to launch PyDoc, including command-line script options (see the Python library manual for details). Perhaps the two most prominent PyDoc interfaces are the built-in help function, and the PyDoc GUI/HTML interface. The help function invokes PyDoc to generate a simple textual report (which looks much like a "manpage" on Unix-like systems):


>>> import sys 
>>> help(sys.getrefcount) 
Help on built-in function getrefcount:

getrefcount(...)
    getrefcount(object) -> integer

    Return the current reference count for the object.
    ...more omitted... 


Note that you do not have to import sys in order to call help, but you do have to import sys to get help on sys; it expects an object reference to be passed in. For larger objects such as modules and classes, the help display is broken down into multiple sections, a few of which are shown here. Run this interactively to see the full report:


>>> help(sys) 
Help on built-in module sys:

NAME
    sys

FILE
    (built-in)

DESCRIPTION
    This module provides access to some objects used
    or maintained by the interpreter and to functions
    ...more omitted... 

FUNCTIONS
    __displayhook__ = displayhook(...)
        displayhook(object) -> None

        Print an object to sys.stdout and also save it
    ...more omitted... 
DATA
    __name__ = 'sys'
    __stderr__ = <open file '<stderr>', mode 'w' at 0x0082BEC0>
    ...more omitted... 


Some of the information in this report is docstrings, and some of it (e.g., function call patterns) is structural information that PyDoc gleans automatically by inspecting objects' internals. You can also use help on built-in functions, methods, and types. To get help for a built-in type, use the type name (e.g., dict for dictionary, str for string, list for list). You'll get a large display that describes all the methods available for that type:


>>> help(dict) 
Help on class dict in module __builtin__:

class dict(object)
 |  dict(  ) -> new empty dictionary.
 ...more omitted... 

>>> help(str.replace) 
Help on method_descriptor:

replace(...)
    S.replace (old, new[, maxsplit]) -> string

    Return a copy of string S with all occurrences
    ...more omitted... 

>>> help(ord) 
Help on built-in function ord:

ord(...)
    ord(c) -> integer

    Return the integer ordinal of a one-character string.


Finally, the help function works just as well on your modules as built-ins. Here it is reporting on the docstrings.py file coded earlier; again, some of this is docstrings, and some is information automatically extracted by inspecting objects' structures:
Code View: Scroll / Show All


>>> help(docstrings.square) 
Help on function square in module docstrings:

square(x)
    function documentation
    can we have your liver then?

>>> help(docstrings.employee) ...more omitted... 

>>> help(docstrings) 
Help on module docstrings:

NAME
    docstrings

FILE
    c:\python22\docstrings.py

DESCRIPTION
    Module documentation
    Words Go Here

CLASSES
    employee
    ...more omitted... 
FUNCTIONS
    square(x)
        function documentation
        can we have your liver then?

DATA
    __file__ = 'C:\\PYTHON22\\docstrings.pyc'
    __name__ = 'docstrings'
    spam = 40
```

#### 30.2.5.1.5 PyDoc: HTML Reports

```text
The help function is nice for grabbing documentation when working interactively. For a more grandiose display, however, PyDoc also provides a GUI interface (a simple, but portable, Python/Tkinter script), and can render its report in HTML page format, viewable in any web browser. In this mode, PyDoc can run locally or as a remote server in client/server mode; reports contain automatically created hyperlinks that allow you to click your way through the documentation of related components in your application.

To start PyDoc in this mode, you generally first launch the search engine GUI captured in Figure 14-1. You can start this either by selecting the Module Docs item in Python's Start button menu on Windows, or by launching the pydocgui.pyw script in Python's Tools directory (running pydoc.py with a -g command-line argument works, too). Enter the name of a module you're interested in, and press the Enter key; PyDoc will march down your module import search path (sys.path) looking for references to the requested module.

Figure 14-1. The Pydoc top-level search engine GUI: type a name of a module you want documentation for, press Enter, select the module, and then press "go to selected" (or use no module name, and press "open browser" to see all available modules).


Once you've found a promising entry, select it, and click "go to selected." PyDoc will spawn a web browser on your machine to display the report rendered in HTML format. Figure 14-2 shows the information PyDoc displays for the built-in glob module.

Figure 14-2. When you find a module in the Figure 14-1 GUI and press "go to selected," the module's documentation is rendered in HTML and displayed in a web browser window like this onea built-in standard library module.


Notice the hyperlinks in the Modules section of this pageyou can click these to jump to the PyDoc pages for related (imported) modules. For larger pages, PyDoc also generates hyperlinks to sections within the page.

Like the help function interface, the GUI interface works on user-defined modules as well. Figure 14-3 shows the page generated for our docstrings.py module file.

Figure 14-3. PyDoc can serve up documentation pages for both built-in and user-coded modules. Here is the page for a user-defined module, showing all its documentation strings (docstrings) extracted from the source file.


PyDoc can be customized and launched in various ways we won't cover here; see its entry in Python's standard library manual for more details. The main thing to take away from this section is that PyDoc essentially gives you implementation reports "for free"if you are good about using docstrings in your files, PyDoc does all the work of collecting and formatting them for display. PyDoc only helps for objects like functions and modules, but it provides an easy way to access a middle level of documentation for such toolsits reports are more useful than raw attribute lists, and less exhaustive than the standard manuals.

	

Cool PyDoc trick of the day: if you leave the module name empty in the top input field of the window in Figure 14-1 and press the Open Browser button, PyDoc will produce a web page containing a hyperlink to every module you can possibly import on your computer. This includes Python standard library modules, modules of third-party extensions you may have installed, user-defined modules on your import search path, and even statically or dynamically linked-in C-coded modules. Such information is hard to come by otherwise without writing code that inspects a set of module sources.

PyDoc can also be run to save the HTML documentation for a module in a file for later viewing or printing; see its documentation for pointers. Also, note that PyDoc might not work well if run on scripts that read from standard inputPyDoc imports the target module to inspect its contents, and there may be no connection for standard input text when it is run in GUI mode. Modules that can be imported without immediate input requirements will always work under PyDoc, though.
```

#### 30.2.5.1.6 Standard Manual Set

```text
For the complete and most up-to-date description of the language and its toolset, Python's standard manuals stand ready to serve. Python's manuals ship in HTML and other formats, and are installed with the Python system on Windowsthey are available in your Start button's menu for Python, and they can also be opened from the Help menu within IDLE. You can also fetch the manual set separately from http://www.python.org in a variety of formats, or read them online at that site (follow the Documentation link). On Windows, the manuals are a compiled help file to support searches, and the online versions at Python.org include a web-based search page.

When opened, the Windows format of the manuals displays a root page like that in Figure 14-4. The two most important entries here are most likely the Library Reference (which documents built-in types, functions, exceptions, and standard library modules), and the Language Reference (which provides a formal description of language-level details). The tutorial listed on this page also provides a brief introduction for newcomers.

Figure 14-4. Python's standard manual set, available online at www.python.org, from IDLE's Help menu, and in the Windows Start button menu. It's a searchable help file on Windows, and there is a search engine for the online version. Of these, the Library manual is the one you'll want to use most of the time.
```

#### 30.2.5.1.7 Web Resources

```text
At the official Python programming language web site (http://www.python.org), you'll find links to various Python resources, some of which cover special topics or domains. Click the Documentation link to access an online tutorial and the Beginners Guide to Python. The site also lists non-English Python resources.

You will find numerous Python wikis, blogs, web sites, and a host of other resources on the Web today. To sample the online community, try searching for "Python programming" in Google.
```
