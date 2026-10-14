---
type: reference
title: "Python Pocket reference, 4th edition"
description: "Legacy Python KB section: Python Pocket reference, 4th edition (Common idioms)"
tags: [cheatsheet, book-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#31"
---

# Python Pocket reference, 4th edition

[↑ KB_python](/python/kb-python/README.md)

## 31.1 Common idioms

```text
This section lists common Python coding tricks and general usage hints. Consult the Python Library Reference and Python Language Reference (http://www.python.org/doc/) for further information on topics mentioned here.
Core Language Hints

    * S[:] makes a top-level (shallow) copy of any sequence; copy.deepcopy(X) makes full copies; list(L) and D.copy() copy lists and dictionaries.
    * L[:0]=[X,Y,Z] inserts items at front of list L, in-place.
    * L[len(L):]=[X,Y,Z], L.extend([X,Y,Z]), and L += [X,Y,Z] all insert multiple items at the end of a list, in-place.
    * L.append(X) and X=L.pop() can be used to implement in-place stack operations, where the end of the list is the top of the stack.
    * Use for key in D.keys(): to iterate through dictionaries, or simply for key in D: in version 2.2 and later. In Python 3.0 these two forms are equivalent, since keys is an iterable view.
    * Use for key in sorted(D): to iterate over dictionary keys in sorted fashion in version 2.4 and later; the form K=D.keys(); K.sort(); for key in K: also works in Python 2.X but not Python 3.0, since keys results are view objects, not lists.
    * X=A or B or None assigns X to the first true object among A and B, or None if both are false (i.e., 0 or empty).
    * X,Y = Y,X swaps the values of X and Y.
    * red, green, blue = range(3) assigns integer series.
    * Use try/finally statements to ensure that arbitrary termination code is run; especially useful around locking calls (acquire before the try, release in the finally).
    * Use with/as statements to guarantee that object-specific termination code is run; for objects that support the context manager protocol (e.g., file auto-close, tread lock auto-release).
    * Wrap iterables in a list() call to view all their results interactively in Python 3; this includes range(), map(), zip(), filter(), dict.keys(), and more.

Environment Hints

    * Use if __name__ == '__main__': to add self-test code or a call to a main function at the bottom of module files; true only when file is run, not when it is imported as a library component.
    * To load file contents in a single expression, use data=open('filename').read().
    * To iterate through text files by lines, use for line in file: in version 2.2 and later (in older versions, use for line in file.readlines():).
    * To retrieve command-line arguments, use sys.argv.
    * To retrieve shell environment settings, use os.environ.
    * The standard streams are: sys.stdin, sys.stdout, and sys.stderror.
    * To return a list of files matching a given pattern, use: glob.glob('pattern').
    * To return a list of files and subdirectories on a path, use: os.listdir('.').
    * To walk an entire tree of directories, use os.walk in Python 3.0 and 2.6 (os.path.walk is also available in Python 2.6 only).
    * To run shell commands within Python scripts, you can use os.system('cmdline'), output=os.popen('cmdline', 'r').read(). The latter form reads the spawned programÂ¿s standard output, and may also be used to read line-by-line.
    * Other streams of a spawned command are available via the subprocess module in Python 3.0, and the os.popen2/3/4 calls in Python 2.X only. The os.fork/os.exec* calls have similar effect on Unix-like platforms.
    * To make a file an executable script on Unix-like platforms, add a line like #!/usr/bin/env python or #!/usr/local/bin/python at the top and give the file executable permissions with a chmod command. On Windows, files can be clicked and run directly due to the registry.
    * The dir([object]) function is useful for inspecting attribute namespaces; print(object.__doc__) often gives documentation.
    * The help([object]) function provides interactive help for modules, functions, types, and more; help(str) gives help on the str type; help("module") gives help on modules even if they have not yet been imported; and help("topic") gives help on keywords and other help topics (use "topics" for a list of help topics).
    * print() and input() (known as print and raw_input() in Python 2.X) use sys.stdout and sys.stdin streams: assign to file-like objects to redirect I/O internally, or use the print(..., file=F) form in Python 3.0 (or the print >> F, ... form in Python 2.X).

Usage Hints

    * Use from __future__ import featurename to enable experimental language features that might break existing code.
    * Intuition about performance in Python programs is usually wrong: always measure before optimizing or migrating to C. Use the profile and time modules (as well as cProfile and timeit).
    * See modules unittest (a.k.a. PyUnit) and doctest for automated testing tools shipped with the Python standard library; unittest is a class framework; doctest scans documentation strings for tests and outputs.
    * See the pydoc library module and script shipped with Python for extraction and display of documentation strings associated with modules, functions, classes, and methods.
    * See the section Section 1.15.4, as well as -W in Section 1.5, for details about turning off future-deprecation warnings emitted by the interpreter.
    * See Distutils, PyInstaller, py2exe, eggs, and other tools for Python program distribution options.
    * See PyInstaller and py2exe for turning Python programs into .exe files for Windows.
    * See NumPy, SciPy, and related packages for extensions that turn Python into a numeric-scientific-programming tool with vector objects, etc.
    * See ZODB and others for full-featured OODB support that allows Python native objects to be stored by key, and SQLObject, SQLAlchemy, and others for object relational mappers that allow classes to be used with relational tables.
    * See SWIG (among others) for a tool that can automatically generate glue code for using C and C++ libraries within Python scripts.
    * See IDLE for a development GUI shipped with Python, with syntax-coloring text editors, object browsers, debugging, etc.; see also PythonWin, Komodo, Eclipse, NetBeans, and others for additional IDE options.
    * See Emacs help for tips on editing/running code in the Emacs text editor. Most other editors support Python as well (e.g., auto-indenting, coloring), including VIM and IDLE; see the editorsÂ¿ page at www.python.org.
    * Porting to Python 3.0: use the Â¿3 command-line option in Python 2.6 to issue incompatibility warnings, and see the 2to3 script which automatically converts much 2.X code to run under 3.X Python.

Assorted Hints

    * Important websites to refer to:


      http://www.python.org

          The Python home page

      http://oreilly.com

          The publisherÂ¿s home page

      http://www.python.org/pypi

          Additional third-party Python tools

      http://www.rmi.net/~lutz

          The authorÂ¿s site

    * Python philosophy: import this.
    * You should say spam and eggs instead of foo and bar in Python examples.
    * Always look on the bright side of life.
```
