---
type: reference
title: Information from Learning Python book (3rd edition).
description: "Legacy Python KB section: Information from Learning Python book (3rd edition). (System Programming, overview, Python System Modules)"
tags: [book-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "python/KB_python#21"
---

# Information from Learning Python book (3rd edition).

> **Deprecated (2026-10):** Book edition notes (Python 2.x era). Current: Python 3 print(), except as, dict.items(); Py2 EOL 2020. Source: <https://www.python.org/doc/sunset-python-2/>

[↑ KB_python](/python/kb-python/README.md)

```text
Note, This information is extracted here for my personal usage only as a quick reference after having read the book on safari.
```

## 21.1 System Programming

### 21.1.1 overview

```text
		-> Learn the number of attributes in system related packages. 
>>> import sys, os
>>> len(dir(sys))          # 56 attributes
56
>>> len(dir(os))           # 118 on Windows, more on Unix
118
>>> len(dir(os.path))      # a nested module within os
43

		Its possible to use dir to learn what API the package exposes.
```

### 21.1.2 Python System Modules

```text
Most system-level interfaces in Python are shipped in just two modules: sys and os. That's somewhat oversimplified; other standard modules belong to this domain too. Among them are the following:

			In principle at least, sys exports components related to the Python interpreter itself (e.g., the module search path), and os contains variables and functions that map to the operating system on which Python is run. In practice, this distinction may not always seem clear-cut (e.g., the standard input and output streams show up in sys, but they are arguably tied to operating system paradigms). The good news is that you'll soon use the tools in these modules so often that their locations will be permanently stamped on your memory.

The os module also attempts to provide a portable programming interface to the underlying operating system; its functions may be implemented differently on different platforms, but to Python scripts, they look the same everywhere. In addition, the os module exports a nested submodule, os.path, which provides a portable interface to file and directory processing tools.

glob For filename expansion

socket For network connections and Inter-Process Communication (IPC)

thread and queue For concurrent threads

time For accessing system time details

fcntl For low-level file control
```

#### 21.1.2.1 Module Documentation Sources

```text
As you can probably deduce from the preceding paragraphs, learning to write system scripts in Python is mostly a matter of learning about Python's system modules. Luckily, there are a variety of information sources to make this task easierfrom module attributes to published references and books.

For instance, if you want to know everything that a built-in module exports, you can read its library manual entry, study its source code (Python is open source software, after all), or fetch its attribute list and documentation string interactively. Let's import sys and see what it has:

C:\...\PP3E\System> python
>>> import sys
>>> dir(sys)
['__displayhook__', '__doc__', '__excepthook__', '__name__', '__stderr__',
'__stdin__', '__stdout__', '_getframe', 'api_version', 'argv',
'builtin_module_names', 'byteorder', 'call_tracing', 'callstats', 'copyright',
'displayhook', 'dllhandle', 'exc_clear', 'exc_info', 'exc_traceback', 'exc_type',
'exc_value', 'excepthook', 'exec_prefix', 'executable', 'exit', 'exitfunc',
'getcheckinterval', 'getdefaultencoding', 'getfilesystemencoding',
'getrecursionlimit', 'getrefcount', 'getwindowsversion', 'hexversion', 'maxint',
'maxunicode', 'meta_path', 'modules', 'path', 'path_hooks', 'path_importer_cache',
'platform', 'prefix', 'ps1', 'ps2', 'setcheckinterval', 'setprofile',
'setrecursionlimit', 'settrace', 'stderr', 'stdin', 'stdout', 'version',
'version_info', 'warnoptions', 'winver']


					  


The dir function simply returns a list containing the string names of all the attributes in any object with attributes; it's a handy memory jogger for modules at the interactive prompt. For example, we know there is something called sys.version, because the name version came back in the dir result. If that's not enough, we can always consult the __doc__ string of built-in modules:

>>> sys.__doc__ 
"This module provides access to some objects used or maintained by the\ninterpreter
and to functions that interact strongly with the interpreter.\n\nDynamic
objects:\n\nargv -- command line arguments; argv[0] is the script pathname if
 known\npath -- module
search path; path[0] is the script directory, else ''\nmodules
...
 ...lots of text deleted here...
...
"
```

#### 21.1.2.2 Paging Documentation Strings

```text
The __doc__ built-in attribute usually contains a string of documentation, but it may look a bit weird when displayed this wayit's one long string with embedded end-line characters that print as \n, not as a nice list of lines. To format these strings for a more humane display, you can simply use a print statement:

>>> print sys.__doc__ 
This module provides access to some objects used or maintained by the
interpreter and to functions that interact strongly with the interpreter.

Dynamic objects:

argv -- command line arguments; argv[0] is the script pathname if known
...
 ...lots of lines deleted here...
...


The print statement, unlike interactive displays, interprets end-line characters correctly. Unfortunately, print doesn't, by itself, do anything about scrolling or paging and so can still be unwieldy on some platforms. Tools such as the built-in help function can do better:

>>> help(sys) 
Help on built-in module sys:

NAME
    sys

FILE
    (built-in)

MODULE DOCS
    http://www.python.org/doc/current/lib/module-sys.html

DESCRIPTION
    This module provides access to some objects used or maintained by the
    interpreter and to functions that interact strongly with the interpreter.

    Dynamic objects:

    argv -- command line arguments; argv[0] is the script pathname if known
...
 ...lots of lines deleted here...
...


					  


The help function is one interface provided by the PyDoc systemcode that ships with Python and renders documentation (documentation strings, as well as structural details) related to an object in a formatted way. The format is either like a Unix manpage, which we get for help, or an HTML page, which is more grandiose. It's a handy way to get basic information when working interactively, and it's a last resort before falling back on manuals and books. It is also fairly fixed in the way it displays information; although it attempts to page the display in some contexts, its page size isn't quite right on some of the machines I use. When I want more control over the way help text is printed, I usually use a utility script of my own, like the one in more.py
more.py
#########################################################
# split and interactively page a string or file of text;
#########################################################

def more(text, numlines=15):
    lines = text.split('\n')
    while lines:
        chunk = lines[:numlines]
        lines = lines[numlines:]
        for line in chunk: print line
        if lines and raw_input('More?') not in ['y', 'Y']: break

if __name__ == '__main__':
    import sys                              # when run, not imported
    more(open(sys.argv[1]).read( ), 10)     # page contents of file on cmdline


					  


The meat of this file is its more function, and if you know any Python at all, it should be fairly straightforward. It simply splits up a string around end-line characters, and then slices off and displays a few lines at a time (15 by default) to avoid scrolling off the screen. A slice expression, lines[:15], gets the first 15 items in a list, and lines[15:] gets the rest; to show a different number of lines each time, pass a number to the numlines argument (e.g., the last line in Example 3-1 passes 10 to the numlines argument of the more function).

The split string object method call that this script employs returns a list of substrings (e.g., ["line", "line",...]). In recent Python releases, a new splitlines method does similar work:

>>> line = 'aaa\nbbb\nccc\n'
>>> line.split('\n')
['aaa', 'bbb', 'ccc', '']
>>> line.splitlines( )
['aaa', 'bbb', 'ccc']

As we'll see in the next chapter, the end-of-line character is always \n (which stands for a byte having a binary value of 10) within a Python script, no matter what platform it is run upon. (If you don't already know why this matters, DOS \r characters are dropped when read.)
```

#### 21.1.2.3 Introducing String Methods

```text
Now, this is a simple Python program, but it already brings up three important topics that merit quick detours here: it uses string methods, reads from a file, and is set up to be run or imported. Python string methods are not a system-related tool per se, but they see action in most Python programs. In fact, they are going to show up throughout this chapter as well as those that follow, so here is a quick review of some of the more useful tools in this set. String methods include calls for searching and replacing:

>>> str = 'xxxSPAMxxx'
>>> str.find('SPAM')                             # return first offset
3
>>> str = 'xxaaxxaa'
>>> str.replace('aa', 'SPAM')                    # global replacement
'xxSPAMxxSPAM'

>>> str = '\t  Ni\n'
>>> str.strip( )                                  # remove whitespace
'Ni'


The find call returns the offset of the first occurrence of a substring, and replace does global search and replacement. Like all string operations, replace returns a new string instead of changing its subject in-place (recall that strings are immutable). With these methods, substrings are just strings; in Chapter 21, we'll also meet a module called re that allows regular expression patterns to show up in searches and replacements.

String methods also provide functions that are useful for things such as case conversions, and a standard library module named string defines some useful preset variables, among other things:

>>> str = 'SHRUBBERY'
>>> str.lower( )                            # case converters
'shrubbery'

>>> str.isalpha( )                          # content tests
True
>>> str.isdigit( )
False

>>> import string                          # case constants
>>> string.lowercase
'abcdefghijklmnopqrstuvwxyz'


There are also methods for splitting up strings around a substring delimiter and putting them back together with a substring in between. We'll explore these tools later in this book, but as an introduction, here they are at work:

>>> str = 'aaa,bbb,ccc'
>>> str.split(',')                          # split into substrings list
['aaa', 'bbb', 'ccc']

>>> str = 'a  b\nc\nd'
>>> str.split( )                             # default delimiter: whitespace
['a', 'b', 'c', 'd']

>>> delim = 'NI'
>>> delim.join(['aaa', 'bbb', 'ccc'])       # join substrings list
'aaaNIbbbNIccc'

>>> ' '.join(['A', 'dead', 'parrot'])       # add a space between
'A dead parrot'

>>> chars = list('Lorreta')                 # covert to characters list
>>> chars
['L', 'o', 'r', 'r', 'e', 't', 'a']
>>> chars.append('!')
>>> ''.join(chars)                          # to string: empty delimiter
'Lorreta!'


These calls turn out to be surprisingly powerful. For example, a line of data columns separated by tabs can be parsed into its columns with a single split call; the more.py script uses it to split a string into a list of line strings. In fact, we can emulate the replace call we saw earlier in this section with a split/join combination:

>>> str = 'xxaaxxaa'
>>> 'SPAM'.join(str.split('aa'))            # replace, the hard way
'xxSPAMxxSPAM'


For future reference, also keep in mind that Python doesn't automatically convert strings to numbers, or vice versa; if you want to use one as you would use the other, you must say so with manual conversions:

>>> int("42"), eval("42")                   # string to int conversions
(42, 42)

>>> str(42), repr(42), ("%d" % 42)          # int to string conversions
('42', '42', '42')

>>> "42" + str(1), int("42") + 1            # concatenation, addition
('421', 43)


In the last command here, the first expression triggers string concatenation (since both sides are strings), and the second invokes integer addition (because both objects are numbers). Python doesn't assume you meant one or the other and convert automatically; as a rule of thumb, Python tries to avoid magic whenever possible. String tools will be covered in more detail later in this book (in fact, they get a full chapter in Part V), but be sure to also see the library manual for additional string method tools.
```

#### 21.1.2.4 File Operation Basics

```text
The more.py script also opens the external file whose name is listed on the command line using the built-in open function, and reads that file's text into memory all at once with the file object read method. Since file objects returned by open are part of the core Python language itself, I assume that you have at least a passing familiarity with them at this point in the text. But just in case you've flipped to this chapter early on in your Pythonhood, the calls:

open('file').read( )            # read entire file into string
open('file').read(N)           # read next N bytes into string
open('file').readlines( )       # read entire file into line strings list
open('file').readline( )        # read next line, through '\n'


load a file's contents into a string, load a fixed-size set of bytes into a string, load a file's contents into a list of line strings, and load the next line in the file into a string, respectively. As we'll see in a moment, these calls can also be applied to shell commands in Python to read their output. File objects also have write methods for sending strings to the associated file. File-related topics are covered in depth in the next chapter, but making an output file and reading it back is easy in Python:

>>> file = open('spam.txt', 'w')        # create file spam.txt
>>> file.write(('spam' * 5) + '\n')
>>> file.close( )

>>> file = open('spam.txt')             # or open('spam.txt').read( )
>>> text = file.read( )
>>> text
'spamspamspamspamspam\n'
```

#### 21.1.2.5 Using Programs in Two Ways

```text
The last few lines in the more.py file also introduce one of the first big concepts in shell tool programming. They instrument the file to be used in either of two ways: as a script or as a library. Every Python module has a built-in __name__ variable that Python sets to the __main__ string only when the file is run as a program, not when it's imported as a library. Because of that, the more function in this file is executed automatically by the last line in the file when this script is run as a top-level program, not when it is imported elsewhere. This simple trick turns out to be one key to writing reusable script code: by coding program logic as functions rather than as top-level code, you can also import and reuse it in other scripts.

The upshot is that we can run more.py by itself or import and call its more function elsewhere. When running the file as a top-level program, we list on the command line the name of a file to be read and paged: as I'll describe in depth later in this chapter, words typed in the command that is used to start a program show up in the built-in sys.argv list in Python. For example, here is the script file in action, paging itself (be sure to type this command line in your PP3E\System directory, or it won't find the input file; more on command lines later):

C:\...\PP3E\System>python more.py more.py
#########################################################
# split and interactively page a string or file of text;
#########################################################

def more(text, numlines=15):
    lines = text.split('\n')
    while lines:
        chunk = lines[:numlines]
        lines = lines[numlines:]
        for line in chunk: print line
More?y
        if lines and raw_input('More?') not in ['y', 'Y']: break

if __name__ == '__main__':
    import sys                             # when run, not imported
    more(open(sys.argv[1]).read( ), 10)     # page contents of file on cmdline


When the more.py file is imported, we pass an explicit string to its more function, and this is exactly the sort of utility we need for documentation text. Running this utility on the sys module's documentation string gives us a bit more information in human-readable form about what's available to scripts:

C:\...\PP3E\System> python
>>> from more import more
>>> import sys
>>> more(sys.__doc__)
This module provides access to some objects used or maintained by the
interpreter and to functions that interact strongly with the interpreter.

Dynamic objects:

argv -- command line arguments; argv[0] is the script pathname if known
path -- module search path; path[0] is the script directory, else ''
modules -- dictionary of loaded modules

displayhook -- called to show results in an interactive session
excepthook -- called to handle any uncaught exception other than SystemExit
  To customize printing in an interactive session or to install a custom
  top-level exception handler, assign other functions to replace these.

exitfunc -- if sys.exitfunc exists, this routine is called when Python exits
More?

Pressing "y" or "Y" here makes the function display the next few lines of documentation, and then prompt again, unless you've run past the end of the lines list. Try this on your own machine to see what the rest of the module's documentation string looks like.
```

#### 21.1.2.6 Python Library Manuals

```text
If that still isn't enough detail, your next step is to read the Python library manual's entry for sys to get the full story. All of Python's standard manuals ship as HTML pages, so you should be able to read them in any web browser you have on your computer. They are installed with Python on Windows, but here are a few simple pointers:

    *

      On Windows, click the Start button, pick Programs, select the Python entry there, and then choose the manuals item. The manuals should magically appear on your display within a browser like Internet Explorer. As of Python 2.4, the manuals are provided as a Windows help file and so support searching and navigation.
    *

      On Linux, you may be able to click on the manuals' entries in a file explorer, or start your browser from a shell command line and navigate to the library manual's HTML files on your machine.
    *

      If you can't find the manuals on your computer, you can always read them online. Go to Python's web site at http://www.python.org and follow the documentation links.

However you get started, be sure to pick the Library manual for things such as sys; Python's standard manual set also includes a short tutorial, language reference, extending references, and more.
```

#### 21.1.2.2 sys module

#### 21.1.2.2.1 Platforms and Versions

```text
Like most modules, sys includes both informational names and functions that take action. For instance, its attributes give us the name of the underlying operating system on which the platform code is running, the largest possible integer on this machine, and the version number of the Python interpreter running our code:

C:\...\PP3E\System>python
>>> import sys
>>> sys.platform, sys.maxint, sys.version
('win32', 2147483647, '2.4 (#60, Nov 30 2004, 11:49:19) [MSC v.1310 32 bit (Intel)]')
>>>
>>> if sys.platform[:3] == 'win': print 'hello windows'
...
hello windows

If you have code that must act differently on different machines, simply test the sys.platform string as done here; although most of Python is cross-platform, nonportable tools are usually wrapped in if tests like the one here. For instance, we'll see later that today's program launch and low-level console interaction tools vary per platformsimply test sys.platform to pick the right tool for the machine on which your script is running.
```

#### 21.1.2.2.2 The Module Search Path

```text
The sys module also lets us inspect the module search path both interactively and within a Python program. sys.path is a list of strings representing the true search path in a running Python interpreter. When a module is imported, Python scans this list from left to right, searching for the module's file on each directory named in the list. Because of that, this is the place to look to verify that your search path is really set as intended.[*]

    [*] It's not impossible that Python sees PYTHONPATH differently than you do. A syntax error in your system shell configuration files may botch the setting of PYTHONPATH, even if it looks fine to you. On Windows, for example, if a space appears around the = of a DOS set command in your autoexec.bat file (e.g., set NAME = VALUE), you will actually set NAME to an empty string, not to VALUE!

The sys.path list is simply initialized from your PYTHONPATH settingthe content of any .pth path files located in Python's directories on your machine plus system defaultswhen the interpreter is first started up. In fact, if you inspect sys.path interactively, you'll notice quite a few directories that are not on your PYTHONPATHsys.path also includes an indicator for the script's home directory (an empty stringsomething I'll explain in more detail after we meet os.getcwd) and a set of standard library directories that may vary per installation:

>>> sys.path 
['', 'C:\\PP3rdEd\\Examples',  ...plus standard paths deleted... ]


Surprisingly, sys.path can actually be changed by a program, too. A script can use list operations such as append, del, and the like to configure the search path at runtime to include all the source directories to which it needs access. Python always uses the current sys.path setting to import, no matter what you've changed it to:

>>> sys.path.append(r'C:\mydir') 
>>> sys.path 
['', 'C:\\PP3rdEd\\Examples',  ...more deleted..., 'C:\\mydir']


Changing sys.path directly like this is an alternative to setting your PYTHONPATH shell variable, but not a very good one. Changes to sys.path are retained only until the Python process ends, and they must be remade every time you start a new Python program or session. However, some types of programs (e.g., scripts that run on a web server) may not be able to depend on PYTHONPATH settings; such scripts can instead configure sys.path on startup to include all the directories from which they will need to import modules.

Note on Windows Directory Paths

Because backslashes normally introduce escape code sequences in Python strings, Windows users should be sure to either double up on backslashes when using them in DOS directory path strings (e.g., in "C:\\dir", \\ is an escape sequence that really means \), or use raw string constants to retain backslashes literally (e.g., r"C:\dir").

If you inspect directory paths on Windows (as in the sys.path interaction listing), Python prints double \\ to mean a single \. Technically, you can get away with a single \ in a string if it is followed by a character Python does not recognize as the rest of an escape sequence, but doubles and raw strings are usually easier than memorizing escape code tables.

Also note that most Python library calls accept either forward (/) or backward (\) slashes as directory path separators, regardless of the underlying platform. That is, / usually works on Windows too and aids in making scripts portable to Unix. Tools in the os and os.path modules, described later in this chapter, further aid in script path portability.
```

#### 21.1.2.2.3 The Loaded Modules Table

```text
The sys module also contains hooks into the interpreter; sys.modules, for example, is a dictionary containing one name:module entry for every module imported in your Python session or program (really, in the calling Python process):

>>> sys.modules
{'os.path': <module 'ntpath' from 'C:\Program Files\Python\Lib\ntpath.pyc'>,...

>>> sys.modules.keys( )
['os.path', 'os', 'exceptions', '__main__', 'ntpath', 'strop', 'nt', 'sys',
'__builtin__', 'site', 'signal', 'UserDict', 'string', 'stat']

>>> sys
<module 'sys' (built-in)>
>>> sys.modules['sys']
<module 'sys' (built-in)>

We might use such a hook to write programs that display or otherwise process all the modules loaded by a program (just iterate over the keys list of sys.modules). sys also exports tools for getting an object's reference count used by Python's garbage collector (getrefcount), checking which modules are built into this Python (builtin_module_names), and more.
```

#### 21.1.2.2.4 Exception Details

```text
Some of the sys module's attributes allow us to fetch all the information related to the most recently raised Python exception. This is handy if we want to process exceptions in a more generic fashion. For instance, the sys.exc_info function returns the latest exception's type, value, and traceback object:

>>> try:
...     raise IndexError
... except:
...     print sys.exc_info( )
...
(<class exceptions.IndexError at 7698d0>, <exceptions.IndexError instance at
797140>, <traceback object at 7971a0>)

We might use such information to format our own error message to display in a GUI pop-up window or HTML web page (recall that by default, uncaught exceptions terminate programs with a Python error display). The first two items returned by this call have reasonable string displays when printed directly, and the third is a traceback object that can be processed with the standard traceback module:

>>> import traceback, sys
>>> def grail(x):
...     raise TypeError, 'already got one'
...
>>> try:
...     grail('arthur')
... except:
...     exc_info = sys.exc_info( )
...     print exc_info[0]
...     print exc_info[1]
...     traceback.print_tb(exc_info[2])
...
exceptions.TypeError
already got one
  File "<stdin>", line 2, in ?
  File "<stdin>", line 2, in grail

The traceback module can also format messages as strings and route them to specific file objects; see the Python library manual for more details.


I should make two portability notes. First, the most recent exception type, value, and traceback objects are also available via other names:

>>> try:
...     raise TypeError, "Bad Thing"
... except:
...     print sys.exc_type, sys.exc_value
...
exceptions.TypeError Bad Thing


But these names represent a single, global exception, and they are not specific to a particular thread (threads are covered in Chapter 5). If you mean to raise and catch exceptions in multiple threads, exc_info provides thread-specific exception details. In fact, you are better off using exc_info in all cases today, as the older tools are now documented as deprecated and may be removed in a future version of Python.

It has also been suggested (in the 2.4 library reference manual and the Python 3.0 PEP document) that string-based exceptions may be removed in a future Python release. This seems more radical and less certain. But if you want to avoid potential future work, use class-based exceptions instead. Because they allow you to define categories of exceptions, they are better than strings in terms of code maintenance anyhow; by listing categories, your exception handlers are immune to future changes. Built-in exceptions have been classes since Python 1.5.
```

#### 21.1.2.2.5 Other sys Module Exports

```text
The sys module exports additional tools that we will meet in the context of larger topics and examples introduced later in this chapter and book. For instance:

    * Command-line arguments show up as a list of strings called sys.argv.
    * Standard streams are available as sys.stdin, sys.stdout, and sys.stderr.
    * Program exit can be forced with sys.exit calls.

Since all of these lead us to bigger topics, though, we will cover them in sections of their own.
```

#### 21.1.2.3 os module

```text
			As mentioned, os is the larger of the two core system modules. It contains all of the usual operating-system calls you may have used in your C programs and shell scripts. Its calls deal with directories, processes, shell variables, and the like. Technically, this module provides POSIX toolsa portable standard for operating-system callsalong with platform-independent directory processing tools as the nested module os.path. Operationally, os serves as a largely portable interface to your computer's system calls: scripts written with os and os.path can usually be run unchanged on any platform.

In fact, if you read the os module's source code, you'll notice that it really just imports whatever platform-specific system module you have on your computer (e.g., nt, mac, posix). See the os.py file in the Python source library directoryit simply runs a from* statement to copy all names out of a platform-specific module. By always importing os rather than platform-specific modules, though, your scripts are mostly immune to platform implementation differences. On some platforms, os includes extra tools available just for that platform (e.g., low-level process calls on Unix); by and large, though, it is as cross-platform as it is technically feasible.

				In fact, if you read the os module's source code, you'll notice that it really just imports whatever platform-specific system module you have on your computer (e.g., nt, mac, posix). See the os.py file in the Python source library directoryit simply runs a from* statement to copy all names out of a platform-specific module. By always importing os rather than platform-specific modules, though, your scripts are mostly immune to platform implementation differences. On some platforms, os includes extra tools available just for that platform (e.g., low-level process calls on Unix); by and large, though, it is as cross-platform as it is technically feasible.
```

#### 21.1.2.3.1 The Big os Lists

```text
Let's take a quick look at the basic interfaces in os. As a preview, the following table summarizes some of the most commonly used tools in the os module organized by functional area.

Commonly used os module tools
Tasks	Tools
Shell variables	os.environ
Running programs	os.system, os.popen, os.popen2/3/4, os.startfile
Spawning processes	os.fork, os.pipe, os.exec, os.waitpid, os.kill
Descriptor files, locks	os.open, os.read, os.write
File processing	os.remove, os.rename, os.mkfifo, os.mkdir, os.rmdir
Administrative tools	os.getcwd, os.chdir, os.chmod, os.getpid, os.listdir
Portability tools	os.sep, os.pathsep, os.curdir, os.path.split, os.path.join
Pathname tools	os.path.exists('path'), os.path.isdir('path'), os.path.getsize('path')

If you inspect this module's attributes interactively, you get a huge list of names that will vary per Python release, will likely vary per platform, and isn't incredibly useful until you've learned what each name means (I've removed most of this list to save spacerun the command on your own):

>>> import os 
>>> dir(os) 
['F_OK', 'O_APPEND', 'O_BINARY', 'O_CREAT', 'O_EXCL', 'O_NOINHERIT',
'O_RANDOM', 'O_RDONLY', 'O_RDWR', 'O_SEQUENTIAL', 'O_SHORT_LIVED',
'O_TEMPORARY', 'O_TEXT', 'O_TRUNC', 'O_WRONLY', 'P_DETACH', 'P_NOWAIT',
...
 ...10 lines removed here...
...
'popen4', 'putenv', 'read', 'remove', 'removedirs', 'rename', 'renames', 'rmdir',
'sep', 'spawnl', 'spawnle', 'spawnv', 'spawnve', 'startfile', 'stat',
'stat_float_times', 'stat_result', 'statvfs_result', 'strerror', 'sys', 'system',
'tempnam', 'times', 'tmpfile', 'tmpnam', 'umask', 'unlink', 'unsetenv', 'urandom',
'utime', 'waitpid', 'walk', 'write']


					  


Besides all of these, the nested os.path module exports even more tools, most of which are related to processing file and directory names portably:

>>> dir(os.path)
['__all__', '__builtins__', '__doc__', '__file__', '__name__', 'abspath',
'altsep', 'basename', 'commonprefix', 'curdir', 'defpath', 'devnull', 'dirname',
'exists', 'expanduser', 'expandvars', 'extsep', 'getatime', 'getctime', 'getmtime',
'getsize', 'isabs', 'isdir', 'isfile', 'islink', 'ismount', 'join', 'lexists',
'normcase', 'normpath', 'os', 'pardir', 'pathsep', 'realpath', 'sep', 'split',
'splitdrive', 'splitext', 'splitunc', 'stat', 'supports_unicode_filenames', 'sys',
'walk']
```

#### 21.1.2.3.2 Administrative Tools

```text
Just in case those massive listings aren't quite enough to go on, let's experiment interactively with some of the simpler os tools. Like sys, the os module comes with a collection of informational and administrative tools:

>>> os.getpid( )
-510737
>>> os.getcwd( )
'C:\\PP3rdEd\\Examples\\PP3E\\System'

>>> os.chdir(r'c:\temp')
>>> os.getcwd( )
'c:\\temp'


As shown here, the os.getpid function gives the calling process's process ID (a unique system-defined identifier for a running program), and os.getcwd returns the current working directory. The current working directory is where files opened by your script are assumed to live, unless their names include explicit directory paths. That's why earlier I told you to run the following command in the directory where more.py lives:

C:\...\PP3E\System>python more.py more.py


The input filename argument here is given without an explicit directory path (though you could add one to page files in another directory). If you need to run in a different working directory, call the os.chdir function to change to a new directory; your code will run relative to the new directory for the rest of the program (or until the next os.chdir call). This chapter will have more to say about the notion of a current working directory, and its relation to module imports when it explores script execution context.
```

#### 21.1.2.3.3 Portability Constants

```text
The os module also exports a set of names designed to make cross-platform programming simpler. The set includes platform-specific settings for path and directory separator characters, parent and current directory indicators, and the characters used to terminate lines on the underlying computer:[*]

    [*] os.linesep comes back as \r\n herethe symbolic escape code equivalent of \015\012, which reflect the carriage-return + line-feed line terminator convention on Windows. In older versions of Python, you may still see these displayed in their octal or hexadecimal escape forms. See the discussion of end-of-line translations in the next chapter.

>>> os.pathsep, os.sep, os.pardir, os.curdir, os.linesep
(';', '\\', '..', '.', '\r\n')


os.sep is whatever character is used to separate directory components on the platform on which Python is running; it is automatically preset to \ on Windows, / for POSIX machines, and : on the Mac. Similarly, os.pathsep provides the character that separates directories on directory lists: for POSIX and ; for DOS and Windows.

By using such attributes when composing and decomposing system-related strings in our scripts, the scripts become fully portable. For instance, a call of the form os.sep.split(dirpath) will correctly split platform-specific directory names into components, even though dirpath may look like dir\dir on Windows, dir/dir on Linux, and dir:dir on Macintosh. As previously mentioned, on Windows you can usually use forward slashes rather than backward slashes when giving filenames to be opened; but these portability constants allow scripts to be platform neutral in directory processing code.
```

#### 21.1.2.3.4 Basic os.path Tools

```text
The nested module os.path provides a large set of directory-related tools of its own. For example, it includes portable functions for tasks such as checking a file's type (isdir, isfile, and others), testing file existence (exists), and fetching the size of a file by name (getsize):

- check is file or dir exists

>>> os.path.isdir(r'C:\temp'),        os.path.isfile(r'C:\temp')
(True, False)
>>> os.path.isdir(r'C:\config.sys'),  os.path.isfile(r'C:\config.sys')
(False, Tuue)
>>> os.path.isdir('nonesuch'),        os.path.isfile('nonesuch')
(False, False)

>>> os.path.exists(r'c:\temp\data.txt')
0
>>> os.path.getsize(r'C:\autoexec.bat')
260


The os.path.isdir and os.path.isfile calls tell us whether a filename is a directory or a simple file; both return False if the named file does not exist. We also get calls for splitting and joining directory path strings, which automatically use the directory name conventions on the platform on which Python is running:
Code View: Scroll / Show All

>>> os.path.split(r'C:\temp\data.txt')
('C:\\temp', 'data.txt')
>>> os.path.join(r'C:\temp', 'output.txt')
'C:\\temp\\output.txt'

>>> name = r'C:\temp\data.txt'                            # Windows paths
>>> os.path.basename(name), os.path.dirname(name)
('data.txt', 'C:\\temp')

>>> name = '/home/lutz/temp/data.txt'                     # Unix-style paths
>>> os.path.basename(name), os.path.dirname(name)
('data.txt', '/home/lutz/temp')

>>> os.path.splitext(r'C:\PP3rdEd\Examples\PP3E\PyDemos.pyw')
('C:\\PP3rdEd\\Examples\\PP3E\\PyDemos', '.pyw')


					  


os.path.split separates a filename from its directory path, and os.path.join puts them back togetherall in entirely portable fashion using the path conventions of the machine on which they are called. The basename and dirname calls here return the second and first items returned by a split simply as a convenience, and splitext strips the file extension (after the last .). The normpath call comes in handy if your paths become a jumble of Unix and Windows separators:

>>> mixed
'C:\\temp\\public/files/index.html'
>>> os.path.normpath(mixed)
'C:\\temp\\public\\files\\index.html'
>>> print os.path.normpath(r'C:\temp\\sub\.\file.ext')
C:\temp\sub\file.ext


This module also has an abspath call that portably returns the full directory pathname of a file; it accounts for adding the current directory, .. parents, and more:

>>> os.getcwd( )
'C:\\PP3rdEd\\cdrom\\WindowsExt'
>>> os.path.abspath('temp')                    # expand to full pathname
'C:\\PP3rdEd\\cdrom\\WindowsExt\\temp'
>>> os.path.abspath(r'..\examples')            # relative paths expanded
'C:\\PP3rdEd\\examples'
>>> os.path.abspath(r'C:\PP3rdEd\chapters')    # absolute paths unchanged
'C:\\PP3rdEd\\chapters'
>>> os.path.abspath(r'C:\temp\spam.txt')       # ditto for filenames
'C:\\temp\\spam.txt'
>>> os.path.abspath('')                        # empty string means the cwd
'C:\\PP3rdEd\\cdrom\\WindowsExt'


Because filenames are relative to the current working directory when they aren't fully specified paths, the os.path.abspath function helps if you want to show users what directory is truly being used to store a file. On Windows, for example, when GUI-based programs are launched by clicking on file explorer icons and desktop shortcuts, the execution directory of the program is the clicked file's home directory, but that is not always obvious to the person doing the clicking; printing a file's abspath can help.
```

#### 21.1.2.3.5 Running Shell Commands from Scripts

```text
The os module is also the place where we run shell commands from within Python scripts. This concept is intertwined with others we won't cover until later in this chapter, but since this is a key concept employed throughout this part of the book, let's take a quick first look at the basics here. Two os functions allow scripts to run any command line that you can type in a console window:


os.system

    Runs a shell command from a Python script

os.popen

    Runs a shell command and connect to its input or output streams
```

#### 21.1.2.3.5.1 What's a shell command?

```text
To understand the scope of these calls, we first need to define a few terms. In this text, the term shell means the system that reads and runs command-line strings on your computer, and shell command means a command-line string that you would normally enter at your computer's shell prompt.

For example, on Windows, you can start an MS-DOS console window and type DOS commands therecommands such as dir to get a directory listing, and type to view a file, names of programs you wish to start, and so on. DOS is the system shell, and commands such as dir and type are shell commands. On Linux, you can start a new shell session by opening an xterm window and typing shell commands there tools to list directories, cat to view files, and so on. A variety of shells are available on Unix (e.g., csh, ksh), but they all read and run command lines. Here are two shell commands typed and run in an MS-DOS console box on Windows:

C:\temp>dir /B                    ...type a shell command line
about-pp.html                     ...its output shows up here
python1.5.tar.gz                  ...DOS is the shell on Windows
about-pp2e.html
about-ppr2e.html
newdir

C:\temp>type helloshell.py
# a Python program
print 'The Meaning of Life'
```

#### 21.1.2.3.5.2 Running shell commands

```text
None of this is directly related to Python, of course (despite the fact that Python command-line scripts are sometimes confusingly called "shell tools"). But because the os module's system and popen calls let Python scripts run any sort of command that the underlying system shell understands, our scripts can make use of every command-line tool available on the computer, whether it's coded in Python or not. For example, here is some Python code that runs the two DOS shell commands typed at the shell prompt shown previously:

C:\temp>python
>>> import os
>>> os.system('dir /B')
about-pp.html
python1.5.tar.gz
about-pp2e.html
about-ppr2e.html
newdir
0

>>> os.system('type helloshell.py')
# a Python program
print 'The Meaning of Life'
0


The 0s at the end here are just the return values of the system call itself. The system call can be used to run any command line that we could type at the shell's prompt (here, C:\temp>). The command's output normally shows up in the Python session's or program's standard output stream.
```

#### 21.1.2.3.5.3 Communicating with shell commands

```text
But what if we want to grab a command's output within a script? The os.system call simply runs a shell command line, but os.popen also connects to the standard input or output streams of the command; we get back a file-like object connected to the command's output by default (if we pass a w mode flag to popen, we connect to the command's input stream instead). By using this object to read the output of a command spawned with popen, we can intercept the text that would normally appear in the console window where a command line is typed:

>>> open('helloshell.py').read( )
"# a Python program\nprint 'The Meaning of Life'\n"

>>> text = os.popen('type helloshell.py').read( )
>>> text
"# a Python program\nprint 'The Meaning of Life'\n"

>>> listing = os.popen('dir /B').readlines( )
>>> listing
['about-pp.html\n', 'python1.5.tar.gz\n', 'helloshell.py\n',
'about-pp2e.html\n', 'about-ppr2e.html\n', 'newdir\n']


Here, we first fetch a file's content the usual way (using Python files), then as the output of a shell type command. Reading the output of a dir command lets us get a listing of files in a directory that we can then process in a loop (we'll learn other ways to obtain such a list in the next chapter[*]). So far, we've run basic DOS commands; because these calls can run any command line that we can type at a shell prompt, they can also be used to launch other Python scripts:

    [*] In the next chapter, after we've learned about file iterators, we'll also learn that the popen objects have an iterator that reads one line at a time, often making the readlines method call superfluous.

>>> os.system('python helloshell.py')       # run a Python program
The Meaning of Life
0
>>> output = os.popen('python helloshell.py').read( )
>>> output
'The Meaning of Life\n'


In all of these examples, the command-line strings sent to system and popen are hardcoded, but there's no reason Python programs could not construct such strings at runtime using normal string operations (+, %, etc.). Given that commands can be dynamically built and run this way, system and popen turn Python scripts into flexible and portable tools for launching and orchestrating other programs. For example, a Python test "driver" script can be used to run programs coded in any language (e.g., C++, Java, Python) and analyze their output. 
```

#### 21.1.2.3.5.4 Shell command limitations

```text
You should keep in mind two limitations of system and popen. First, although these two functions themselves are fairly portable, their use is really only as portable as the commands that they run. The preceding examples that run DOS dir and type shell commands, for instance, work only on Windows, and would have to be changed in order to run ls and cat commands on Unix-like platforms.

Second, it is important to remember that running Python files as programs this way is very different and generally much slower than importing program files and calling functions they define. When os.system and os.popen are called, they must start a brand-new, independent program running on your operating system (they generally run the command in a newly forked process). When importing a program file as a module, the Python interpreter simply loads and runs the file's code in the same process in order to generate a module object. No other program is spawned along the way.[dagger]

    [dagger] The Python execfile built-in function also runs a program file's code, but within the same process that called it. It's similar to an import in that regard, but it works more as if the file's text had been pasted into the calling program at the place where the execfile call appears (unless explicit global or local namespace dictionaries are passed). Unlike imports, execfile unconditionally reads and executes a file's code (it may be run more than once per process), no module object is generated by the file's execution, and unless optional namespace dictionaries are passed in, assignments in the file's code may overwrite variables in the scope where the execfile appears; see the Python library manual for more details.

There are good reasons to build systems as separate programs too, and we'll later explore things such as command-line arguments and streams that allow programs to pass information back and forth. But for most purposes, imported modules are a faster and more direct way to compose systems.

If you plan to use these calls in earnest, you should also know that the os.system call normally blocksthat is, pausesits caller until the spawned command line exits. On Linux and Unix-like platforms, the spawned command can generally be made to run independently and in parallel with the caller by adding an & shell background operator at the end of the command line:

os.system("python program.py arg arg &")


On Windows, spawning with a DOS start command will usually launch the command in parallel too:

os.system("start program.py arg arg")


In fact, this is so useful that an os.startfile call was added in recent Python releases. This call opens a file with whatever program is listed in the Windows registry for the file's typeas though its icon has been clicked with the mouse cursor:

os.startfile("webpage.html")    # open file in your web browser
os.startfile("document.doc")    # open file in Microsoft Word
os.startfile("myscript.py")     # run file with Python


The os.popen call does not generally block its caller (by definition, the caller must be able to read or write the file object returned) but callers may still occasionally become blocked under both Windows and Linux if the pipe object is closede.g., when garbage is collectedbefore the spawned program exits or the pipe is read exhaustively (e.g., with its read( ) method). As we will see in the next chapter, the Unix os.fork/exec and Windows os.spawnv calls can also be used to run parallel programs without blocking.

Because the os module's system and popen calls also fall under the category of program launchers, stream redirectors, and cross-process communication devices, they will show up again in later parts of this chapter and in the following chapters, so we'll defer further details for the time being. If you're looking for more details right away, see the stream redirection section in this chapter and the directory listings section in the next. 
```

#### 21.1.2.3.6 Other os Module Exports

```text
Since most other os module tools are even more difficult to appreciate outside the context of larger application topics, we'll postpone a deeper look at them until later sections. But to let you sample the flavor of this module, here is a quick preview for reference. Among the os module's other weapons are these:


os.environ Fetches and sets shell environment variables

os.fork Spawns a new child process on Unix

os.pipe Communicates between programs

os.execlp Starts new programs

os.spawnv Starts new programs with lower-level control

os.open Opens a low-level descriptor-based file

os.mkdir Creates a new directory

os.mkfifo Creates a new named pipe

os.stat Fetches low-level file information

os.remove Deletes a file by its pathname

os.path.walk, os.walk Applies a function or loop body to all parts of an entire directory tree

And so on. One caution up front: the os module provides a set of file open, read, and write calls, but all of these deal with low-level file access and are entirely distinct from Python's built-in stdio file objects that we create with the built-in open function. You should normally use the built-in open function (not the os module) for all but very special file-processing needs (e.g., opening with exclusive access file locking).

Throughout this chapter, we will apply sys and os tools such as these to implement common system-level tasks, but this book doesn't have space to provide an exhaustive list of the contents of modules we will meet along the way. If you have not already done so, you should become acquainted with the contents of modules such as os and sys by consulting the Python library manual. For now, let's move on to explore additional system tools in the context of broader system programming concepts.
```

#### 21.1.2.4 Script Execution Context

```text
			Python scripts don't run in a vacuum. Depending on platforms and startup procedures, Python programs may have all sorts of enclosing context; information automatically passed in to the program by the operating system when the program starts up. For instance, scripts have access to the following sorts of system-level inputs and interfaces:


Current working directory 
    os.getcwd gives access to the directory from which a script is started, and many file tools use its value implicitly.

Command-line arguments 
    sys.argv gives access to words typed on the command line that are used to start the program and that serve as script inputs.

Shell variables 
    os.environ provides an interface to names assigned in the enclosing shell (or a parent program) and passed in to the script.

Standard streams 
    sys.stdin, stdout, and stderr export the three input/output streams that are at the heart of command-line shell tools.

Such tools can serve as inputs to scripts, configuration parameters, and so on. In the next few sections, we will explore these context toolsboth their Python interfaces and their typical roles.
```

#### 21.1.2.5 Current Working Directory

```text
The notion of the current working directory (CWD) turns out to be a key concept in some scripts' execution: it's always the implicit place where files processed by the script are assumed to reside unless their names have absolute directory paths. As we saw earlier, os.getcwd lets a script fetch the CWD name explicitly, and os.chdir allows a script to move to a new CWD.

Keep in mind, though, that filenames without full pathnames map to the CWD and have nothing to do with your PYTHONPATH setting. Technically, a script is always launched from the CWD, not the directory containing the script file. Conversely, imports always first search the directory containing the script, not the CWD (unless the script happens to also be located in the CWD). Since this distinction is subtle and tends to trip up beginners, let's explore it in more detail.
```

#### 21.1.2.5.1 CWD, Files, and Import Paths

```text
				When you run a Python script by typing a shell command line such as python dir1\dir2\file.py, the CWD is the directory you were in when you typed this command, not dir1\dir2. On the other hand, Python automatically adds the identity of the script's home directory to the front of the module search path such that file.py can always import other files in dir1\dir2 no matter where it is run from. To illustrate, let's write a simple script to echo both its CWD and its module search path:

C:\PP3rdEd\Examples\PP3E\System>type whereami.py
import os, sys
print 'my os.getcwd =>', os.getcwd( )            # show my cwd execution dir
print 'my sys.path  =>', sys.path[:6]            # show first 6 import paths
raw_input( )                                     # wait for keypress if clicked

Now, running this script in the directory in which it resides sets the CWD as expected and adds an empty string ('') to the front of the module search path in order to designate the CWD (we met the sys.path module search path earlier).
But if we run this script from other places, the CWD moves with us (it's the directory where we type commands), and Python adds a directory to the front of the module search path that allows the script to still see files in its own home directory. For instance, when running from one level up (..), the System name added to the front of sys.path will be the first directory that Python searches for imports within whereami.py; it points imports back to the directory containing the script that was run. Filenames without complete paths, though, will be mapped to the CWD (C:\PP3rdEd\Examples\PP3E), not the System subdirectory nested there.

The net effect is that filenames without directory paths in a script will be mapped to the place where the command was typed (os.getcwd), but imports still have access to the directory of the script being run (via the front of sys.path). Finally, when a file is launched by clicking its icon, the CWD is just the directory that contains the clicked file. The following output, for example, appears in a new DOS console box when whereami.py is double-clicked in Windows Explorer:
Code View: Scroll / Show All

my os.getcwd => C:\PP3rdEd\Examples\PP3E\System
my sys.path  => ['C:\\PP3RDED\\EXAMPLES\\PP3E\\SYSTEM', 'C:\\PP3rdEd\\Examples',
'C:\\Program Files\\Python\\Lib\\plat-win', 'C:\\Program Files\\Python\\Lib',
'C:\\Program Files\\Python\\DLLs']


In this case, both the CWD used for filenames and the first import search directory are the directory containing the script file. This all usually works out just as you expect, but there are two pitfalls to avoid:

    * Filenames might need to include complete directory paths if scripts cannot be sure from where they will be run.
    * Command-line scripts cannot use the CWD to gain import visibility to files that are not in their own directories; instead, use PYTHONPATH settings and package import paths to access modules in other directories.

For example, files in this book, regardless of how they are run (import filehere), can always import other files in their own home directories without package path imports but must go through the PP3E package root to find files anywhere else in the examples tree (from PP3E.dir1.dir2 import filethere), even if they are run from the directory containing the desired external module. As usual for modules, the PP3E\dir1\dir2 directory name could also be added to PYTHONPATH to make files there visible everywhere without package path imports (though adding more directories to PYTHONPATH increases the likelihood of name clashes). In either case, though, imports are always resolved to the script's home directory or other Python search path settings, not to the CWD.
```

#### 21.1.2.5.2 CWD and Command Lines

```text
This distinction between the CWD and import search paths explains why many scripts in this book designed to operate in the current working directory (instead of one whose name is passed in) are run with command lines such as this one:

C:\temp>python %X%\PyTools\cleanpyc-py.py                 process cwd


In this example, the Python script file itself lives in the directory C:\PP3rdEd\Examples\PP3E\PyTools, but because it is run from C:\temp, it processes the files located in C:\temp (i.e., in the CWD, not in the script's home directory). To process files elsewhere with such a script, simply cd to the directory to be processed to change the CWD:

C:\temp>cd C:\PP2nEd\examples
C:\PP3rdEd\examples>python %X%\PyTools\cleanpyc-py.py     process cwd


Because the CWD is always implied, a cd command tells the script which directory to process in no less certain terms than passing a directory name to the script explicitly, like this:

C:\...\PP3E\PyTools>python find.py *.py C:\temp          process named dir

In this command line, the CWD is the directory containing the script to be run (notice that the script filename has no directory path prefix); but since this script processes a directory named explicitly on the command line (C:\temp), the CWD is irrelevant. Finally, if we want to run such a script located in some other directory in order to process files located in yet another directory, we can simply give directory paths to both:

C:\temp>python %X%\PyTools\find.py *.cxx C:\PP3rdEd\Examples\PP3E


Here, the script has import visibility to files in its PP3E\PyTools home directory and processes files in the PP3E root, but the CWD is something else entirely (C:\temp). This last form is more to type, of course, but watch for a variety of CWD and explicit script-path command lines like these in this book.

	

Note, Whenever you see a %X% in command lines such as those in the preceding examples, it refers to the value of the shell environment variable named X. It's just shorthand for the full directory pathname of the PP3E book examples package root directory, which I use to point to scripts' files. On my machines, it is preset in my PP3E\Config setup-pp* files like this:

set X=C:\PP3rdEd\Examples\PP3E             --DOS
setenv X /home/mark/PP3rdEd/Examples/PP3E  --Unix/csh


That is, it is assigned and expanded to the directory where PP3E lives on the system. See the next section in this chapter for more on shell variables. You can instead type full example root paths everywhere you see %X% in this book, but both your fingers and your keyboard are probably better off if you don't.
```

#### 21.1.2.6 Command-Line Arguments

```text
The sys module is also where Python makes available the words typed on the command that is used to start a Python script. These words are usually referred to as command-line arguments and show up in sys.argv, a built-in list of strings. C programmers may notice its similarity to the C argv array (an array of C strings). It's not much to look at interactively, because no command-line arguments are passed to start up Python in this mode:

>>> sys.argv
['']


To really see what arguments are about, we need to run a script from the shell command line. Example 3-2 shows an unreasonably simple one that just prints the argv list for inspection.
Example 3-2. PP3E\System\testargv.py

import sys
print sys.argv


Running this script prints the command-line arguments list; note that the first item is always the name of the executed Python script file itself, no matter how the script was started (see the sidebar titled "Executable Scripts on Unix," later in this chapter).

C:\...\PP3E\System>python testargv.py
['testargv.py']

C:\...\PP3E\System>python testargv.py spam eggs cheese
['testargv.py', 'spam', 'eggs', 'cheese']

C:\...\PP3E\System>python testargv.py -i data.txt -o results.txt
['testargv.py', '-i', 'data.txt', '-o', 'results.txt']

The last command here illustrates a common convention. Much like function arguments, command-line options are sometimes passed by position and sometimes by name using a "-name value" word pair. For instance, the pair -i data.txt means the -i option's value is data.txt (e.g., an input filename). Any words can be listed, but programs usually impose some sort of structure on them.

Command-line arguments play the same role in programs that function arguments do in functions: they are simply a way to pass information to a program that can vary per program run. Because they don't have to be hardcoded, they allow scripts to be more generally useful. For example, a file-processing script can use a command-line argument as the name of the file it should process; see the more.py script we met in Example 3-1 for a prime example. Other scripts might accept processing mode flags, Internet addresses, and so on.

Once you start using command-line arguments regularly, though, you'll probably find it inconvenient to keep writing code that fishes through the list looking for words. More typically, programs translate the arguments list on startup into structures that are more conveniently processed. Here's one way to do it: the script in Example 3-3 scans the argv list looking for -optionname optionvalue word pairs and stuffs them into a dictionary by option name for easy retrieval.

estargv2.py

# collect command-line options in a dictionary

def getopts(argv):
    opts = {}
    while argv:
        if argv[0][0] == '-':                  # find "-name value" pairs
            opts[argv[0]] = argv[1]            # dict key is "-name" arg
            argv = argv[2:]
        else:
            argv = argv[1:]
    return opts

if __name__ == '__main__':
    from sys import argv                       # example client code
    myargs = getopts(argv)
    if myargs.has_key('-i'):
        print myargs['-i']
    print myargs


You might import and use such a function in all your command-line tools. When run by itself, this file just prints the formatted argument dictionary:
C:\...\PP3E\System>python testargv2.py
{}

C:\...\PP3E\System>python testargv2.py -i data.txt -o results.txt
data.txt
{'-o': 'results.txt', '-i': 'data.txt'}


Naturally, we could get much more sophisticated here in terms of argument patterns, error checking, and the like. We could also use standard and more advanced command-line processing tools in the Python library to parse arguments; see the standard getopt library module and the newer optparse in the library manual for other options. In general, the more configurable your scripts, the more you must invest in command-line processing logic complexity.

Executable Scripts on Unix

Unix and Linux users: you can also make text files of Python source code directly executable by adding a special line at the top with the path to the Python interpreter and giving the file executable permission. For instance, type this code into a text file called myscript:

#!/usr/bin/python
print 'And nice red uniforms'


The first line is normally taken as a comment by Python (it starts with a #); but when this file is run, the operating system sends lines in this file to the interpreter listed after #! on line 1. If this file is made directly executable with a shell command of the form chmod +x myscript, it can be run directly without typing python in the command, as though it were a binary executable program:

% myscript a b c
And nice red uniforms


When run this way, sys.argv will still have the script's name as the first word in the list: ["myscript", "a", "b", "c"], exactly as if the script had been run with the more explicit and portable command form python myscript a b c. Making scripts directly executable is actually a Unix trick, not a Python feature, but it's worth pointing out that it can be made a bit less machine dependent by listing the Unix env command at the top instead of a hardcoded path to the Python executable:

#!/usr/bin/env python
print 'Wait for it...'


When coded this way, the operating system will employ your environment variable settings to locate your Python interpreter (your PATH variable, on most platforms). If you run the same script on many machines, you need only change your environment settings on each machine (you don't need to edit Python script code). Of course, you can always run Python files with a more explicit command line:

% python myscript a b c


This assumes that the python interpreter program is on your system's search path setting (otherwise, you need to type its full path), but it works on any Python platform with a command line. Since this is more portable, I generally use this convention in the book's examples, but consult your Unix manpages for more details on any of the topics mentioned here. Even so, these special #! lines will show up in many examples in this book just in case readers want to run them as executables on Unix or Linux; on other platforms, they are simply ignored as Python comments.

Note that on recent flavors of Windows, you can usually also type a script's filename directly (without the word python) to make it go, and you don't have to add a #! line at the top. Python uses the Windows registry on this platform to declare itself as the program that opens files with Python extensions (.py and others). This is also why you can launch files on Windows by clicking on them.
```

#### 21.1.2.7 Shell Environment Variables

```text
Shell variables, sometimes known as environment variables, are made available to Python scripts as os.environ, a Python dictionary-like object with one entry per variable setting in the shell. Shell variables live outside the Python system; they are often set at your system prompt or within startup files and typically serve as system-wide configuration inputs to programs.

In fact, by now you should be familiar with a prime example: the PYTHONPATH module search path setting is a shell variable used by Python to import modules. By setting it once in your system startup files, its value is available every time a Python program is run. Shell variables can also be set by programs to serve as inputs to other programs in an application; because their values are normally inherited by spawned programs, they can be used as a simple form of interprocess communication.
```

#### 21.1.2.7.1 Fetching Shell Variables

```text
In Python, the surrounding shell environment becomes a simple preset object, not special syntax. Indexing os.environ by the desired shell variable's name string (e.g., os.environ['USER']) is the moral equivalent of adding a dollar sign before a variable name in most Unix shells (e.g., $USER), using surrounding percent signs on DOS (%USER%), and calling getenv("USER") in a C program. Let's start up an interactive session to experiment:

>>> import os
>>> os.environ.keys( )
['WINBOOTDIR', 'PATH', 'USER', 'PP2HOME', 'CMDLINE', 'PYTHONPATH', 'BL*ER',
'X', 'TEMP', 'COMSPEC', 'PROMPT', 'WINDIR', 'TMP']
>>> os.environ['TEMP']
'C:\\windows\\TEMP'


Here, the keys method returns a list of set variables, and indexing fetches the value of the shell variable TEMP on Windows. This works the same way on Linux, but other variables are generally preset when Python starts up. Since we know about PYTHONPATH, let's peek at its setting within Python to verify its content (as I wrote this, mine was set to the roots of the book examples trees for the third and second editions):

>>> os.environ['PYTHONPATH']
'C:\\Mark\\PP3E-cd\\Examples;C:\\Mark\\PP2E-cd\\Examples'
>>>
>>> for dir in os.environ['PYTHONPATH'].split(os.pathsep):
...     print dir
...
C:\Mark\PP3E-cd\Examples
C:\Mark\PP2E-cd\Examples


PYTHONPATH is a string of directory paths separated by whatever character is used to separate items in such paths on your platform (e.g., ; on DOS/Window, : on Unix and Linux). To split it into its components, we pass to the split string method an os.pathsep delimitera portable setting that gives the proper separator for the underlying machine.
```

#### 21.1.2.7.2 Changing Shell Variables

```text
Like normal dictionaries, the os.environ object supports both key indexing and assignment. As usual, assignments change the value of the key:

>>> os.environ['TEMP'] = r'c:\temp'
>>> os.environ['TEMP']
'c:\\temp'


But something extra happens here. In recent Python releases, values assigned to os.environ keys in this fashion are automatically exported to other parts of the application. That is, key assignments change both the os.environ object in the Python program as well as the associated variable in the enclosing shell environment of the running program's process. Its new value becomes visible to the Python program, all linked-in C modules, and any programs spawned by the Python process.

Internally, key assignments to os.environ call os.putenva function that changes the shell variable outside the boundaries of the Python interpreter. To demonstrate how this works, we need a couple of scripts that set and fetch shell variables; the first is shown in Example 3-4.
setenv.py
import os
print 'setenv...',
print os.environ['USER']                 # show current shell variable value

os.environ['USER'] = 'Brian'             # runs os.putenv behind the scenes
os.system('python echoenv.py')

os.environ['USER'] = 'Arthur'            # changes passed to spawned programs
os.system('python echoenv.py')           # and linked-in C library modules

os.environ['USER'] = raw_input('?')
print os.popen('python echoenv.py').read( )

This setenv.py script simply changes a shell variable, USER, and spawns another script that echoes this variable's value.

echoenv.py

import os
print 'echoenv...',
print 'Hello,', os.environ['USER']


No matter how we run echoenv.py, it displays the value of USER in the enclosing shell; when run from the command line, this value comes from whatever we've set the variable to in the shell itself:

C:\...\PP3E\System\Environment>set USER=Bob

C:\...\PP3E\System\Environment>python echoenv.py
echoenv... Hello, Bob


When spawned by another script such as setenv.py, though, echoenv.py gets whatever USER settings its parent program has made:

C:\...\PP3E\System\Environment>python setenv.py
setenv... Bob
echoenv... Hello, Brian
echoenv... Hello, Arthur
?Gumby
echoenv... Hello, Gumby

C:\...\PP3E\System\Environment>echo %USER%
Bob


This works the same way on Linux. In general terms, a spawned program always inherits environment settings from its parents. Spawned programs are programs started with Python tools such as os.spawnv on Windows, the os.fork/exec combination on Unix and Linux, and os.popen and os.system on a variety of platforms. All programs thus launched get the environment variable settings that exist in the parent at launch time.[*]

    [*] This is by default. Some program-launching tools also let scripts pass environment settings that are different from their own to child programs. For instance, the os.spawnve call is like os.spawnv, but it accepts a dictionary argument representing the shell environment to be passed to the started program. Some os.exec* variants (ones with an "e" at the end of their names) similarly accept explicit environments; see the os.exec call formats for more details.

From a larger perspective, setting shell variables like this before starting a new program is one way to pass information into the new program. For instance, a Python configuration script might tailor the PYTHONPATH variable to include custom directories just before launching another Python script; the launched script will have the custom search path because shell variables are passed down to children.
```

#### 21.1.2.7.3 Shell Variable Details

```text
Notice the last command in the preceding examplethe USER variable is back to its original value after the top-level Python program exits. Assignments to os.environ keys are passed outside the interpreter and down the spawned programs chain, but never back up to parent program processes (including the system shell). This is also true in C programs that use the putenv library call, and it isn't a Python limitation per se.

It's also likely to be a nonissue if a Python script is at the top of your application. But keep in mind that shell settings made within a program usually endure only for that program's run and for the run of its spawned children. If you need to export a shell variable setting so that it lives on after Python exits, you may be able to find platform-specific extensions that do this; search http://www.python.org or the Web at large.

Another subtlety: currently, changes to os.environ automatically call os.putenv, which runs the putenv call in the C library if the later is available on your platform; this exports the setting outside Python to any linked-in C code too. However, direct calls to os.putenv do not update os.environ to reflect the change, so os.environ changes are preferred.

Also note that environment settings are loaded into os.environ on startup and not on each fetch; hence, changes made by linked-in C code after startup may not be reflected in os.environ. Python does have an os.getenv call today, but it is translated into an os.environ fetch on most platforms, not into a call to getenv in the C library. Most applications won't need to care, especially if they are pure Python code. On platforms without a putenv call, os.environ can be passed as a parameter to program startup tools to set the spawned program's environment. 
```

#### 21.1.2.8 Standard Streams

```text
The sys module is also the place where the standard input, output, and error streams  of your Python programs live:

>>> for f in (sys.stdin, sys.stdout, sys.stderr): print f
...
<open file '<stdin>', mode 'r' at 762210>
<open file '<stdout>', mode 'w' at 762270>
<open file '<stderr>', mode 'w' at 7622d0>


The standard streams are simply preopened Python file objects that are automatically connected to your program's standard streams when Python starts up. By default, all of them are tied to the console window where Python (or a Python program) was started. Because the print statement and raw_input functions are really nothing more than user-friendly interfaces to the standard output and input streams, they are similar to using stdout and stdin in sys directly:

>>> print 'hello stdout world'
hello stdout world

>>> sys.stdout.write('hello stdout world' + '\n')
hello stdout world

>>> raw_input('hello stdin world>')
hello stdin world>spam
'spam'

>>> print 'hello stdin world>',; sys.stdin.readline( )[:-1]
hello stdin world>eggs

'eggs'

Note Standard Streams on Windows

Windows users: if you click a .py Python program's filename in a Windows file explorer to start it (or launch it with os.system), a DOS console box automatically pops up to serve as the program's standard stream. If your program makes windows of its own, you can avoid this console pop-up window by naming your program's source-code file with a .pyw extension, not with a .py extension. The .pyw extension simply means a .py source file without a DOS pop up on Windows (it uses Windows registry settings to run a custom version of Python).

One historical note: in the Python 1.5.2 release and earlier, .pyw files could only be run, not importedthe .pyw was not recognized as a module name. If you wanted a program to be run without a DOS console pop up and be importable elsewhere, you needed both .py and .pyw files; the .pyw simply served as top-level script logic that imported and called the core logic in the .py file. This is no longer required today: .pyw files may be imported as usual.

Also note that because printed output goes to this DOS pop up when a program is clicked, scripts that simply print text and exit will generate an odd "flash"the DOS console box pops up, output is printed into it, and the pop up goes away immediately (not the most user-friendly of features!). To keep the DOS pop-up box around so that you can read printed output, simply add a raw_input( ) call at the bottom of your script to pause for an Enter key press before exiting.
```

#### 21.1.2.8.1 Redirecting Streams to Files and Programs

```text
Technically, standard output (and print) text appears in the console window where a program was started, standard input (and raw_input) text comes from the keyboard, and standard error text is used to print Python error messages to the console window. At least that's the default. It's also possible to redirect these streams both to files and to other programs at the system shell, as well as to arbitrary objects within a Python script. On most systems, such redirections make it easy to reuse and combine general-purpose command-line utilities. 
```

#### 21.1.2.8.1.1 Redirecting streams to files

```text
Redirection is useful for things like canned (precoded) test inputs: we can apply a single test script to any set of inputs by simply redirecting the standard input stream to a different file each time the script is run. Similarly, redirecting the standard output stream lets us save and later analyze a program's output; for example, testing systems might compare the saved standard output of a script with a file of expected output to detect failures.

Although it's a powerful paradigm, redirection turns out to be straightforward to use. For instance, consider the simple read-evaluate-print loop program in Example.
teststreams.py
# read numbers till eof and show squares

def interact( ):
    print 'Hello stream world'                      # print sends to sys.stdout
    while 1:
        try:
            reply  = raw_input('Enter a number>')   # raw_input reads sys.stdin
        except EOFError:
            break                                   # raises an except on eof
        else:                                       # input given as a string
            num = int(reply)
            print "%d squared is %d" % (num, num ** 2)
    print 'Bye'

if __name__ == '__main__':
    interact( )                                      # when run, not imported


As usual, the interact function here is automatically executed when this file is run, not when it is imported. By default, running this file from a system command line makes that standard stream appear where you typed the Python command. The script simply reads numbers until it reaches end-of-file in the standard input stream (on Windows, end-of-file is usually the two-key combination Ctrl-Z; on Unix, type Ctrl-D instead[*]):

    [*] Notice that raw_input raises an exception to signal end-of-file, but file read methods simply return an empty string for this condition. Because raw_input also strips the end-of-line character at the end of lines, an empty string result means an empty line, so an exception is necessary to specify the end-of-file condition. File read methods retain the end-of-line character and denote an empty line as \n instead of "". This is one way in which reading sys.stdin directly differs from raw_input. The latter also accepts a prompt string that is automatically printed before input is accepted.

C:\...\PP3E\System\Streams>python teststreams.py
Hello stream world
Enter a number>12
12 squared is 144
Enter a number>10
10 squared is 100
Enter a number>
Bye


But on both Windows and Unix-like platforms, we can redirect the standard input stream to come from a file with the < filename shell syntax. Here is a command session in a DOS console box on Windows that forces the script to read its input from a text file, input.txt. It's the same on Linux, but replace the DOS type command with a Unix cat command:

C:\...\PP3E\System\Streams>type input.txt
8
6

C:\...\PP3E\System\Streams>python teststreams.py < input.txt
Hello stream world
Enter a number>8 squared is 64
Enter a number>6 squared is 36
Enter a number>Bye


Here, the input.txt file automates the input we would normally type interactivelythe script reads from this file rather than from the keyboard. Standard output can be similarly redirected to go to a file with the > filename shell syntax. In fact, we can combine input and output redirection in a single command:

C:\...\PP3E\System\Streams>python teststreams.py < input.txt > output.txt

C:\...\PP3E\System\Streams>type output.txt
Hello stream world
Enter a number>8 squared is 64
Enter a number>6 squared is 36
Enter a number>Bye


This time, the Python script's input and output are both mapped to text files, not to the interactive console session.
```

#### 21.1.2.8.1.2 Chaining programs with pipes

```text
On Windows and Unix-like platforms, it's also possible to send the standard output of one program to the standard input of another using the | shell character between two commands. This is usually called a "pipe" operation because the shell creates a pipeline that connects the output and input of two commands. Let's send the output of the Python script to the standard more command-line program's input to see how this works:

C:\...\PP3E\System\Streams>python teststreams.py < input.txt | more

Hello stream world
Enter a number>8 squared is 64
Enter a number>6 squared is 36
Enter a number>Bye


Here, teststreams's standard input comes from a file again, but its output (written by print statements) is sent to another program, not to a file or window. The receiving program is more, a standard command-line paging program available on Windows and Unix-like platforms. Because Python ties scripts into the standard stream model, though, Python scripts can be used on both ends. One Python script's output can always be piped into another Python script's input:

C:\...\PP3E\System\Streams>type writer.py
print "Help! Help! I'm being repressed!"
print 42

C:\...\PP3E\System\Streams>type reader.py
print 'Got this" "%s"' % raw_input( )
import sys
data = sys.stdin.readline( )[:-1]
print 'The meaning of life is', data, int(data) * 2

C:\...\PP3E\System\Streams>python writer.py | python reader.py
Got this" "Help! Help! I'm being repressed!"
The meaning of life is 42 84

This time, two Python programs are connected. Script reader gets input from script writer; both scripts simply read and write, oblivious to stream mechanics. In practice, such chaining of programs is a simple form of cross-program communications. It makes it easy to reuse utilities written to communicate via stdin and stdout in ways we never anticipated. For instance, a Python program that sorts stdin text could be applied to any data source we like, including the output of other scripts. Consider the Python command-line utility scripts in Examples below that sort and sum lines in the standard input stream.

sorter.py
import sys                                    # or sorted(sys.stdin)
lines = sys.stdin.readlines( )               # sort stdin input lines,
lines.sort( )                                # send result to stdout
for line in lines: print line,               # for further processing

adder.py
import sys
sum = 0
while True:
    try:
        line = raw_input()                 # or call sys.stdin.readlines( )
    except EOFError:                       # or for line in sys.stdin:
        break                              # raw_input strips \n at end
    else:
        sum += int(line)                   # was sting.atoi( ) in 2nd ed
print sum

We can apply such general-purpose tools in a variety of ways at the shell command line to sort and sum arbitrary files and program outputs (Windows note: on my XP machine, I have to type "python file.py" here, not just "file.py"; otherwise, the input redirection fails):
	-> Input file
$ cat data.txt             
123
000
999
042
	-> sort
$ python sorter.py < data.txt 
000
042
123
999
	-> Sum
$ python adder.py < data.txt 
1164
	-> Sum cat output
$ cat data.txt | python adder.py
1164
$ cat writer2.py 
for data in (123, 0, 999, 42):
    print '%03d' % data
	-> sort py output
$ python writer2.py | python sorter.py
000
042
123
999
$ python writer2.py | python sorter.py | python adder.py 
1164

The last command here connects three Python scripts by standard streamsthe output of each prior script is fed to the input of the next via pipeline shell syntax.
```

#### 21.1.2.8.1.3 Coding alternatives

```text
A few coding pointers here: if you look closely, you'll notice that sorter reads all of stdin at once with the readlines method, but adder reads one line at a time. If the input source is another program, some platforms run programs connected by pipes in parallel. On such systems, reading line by line works better if the data streams being passed about are large because readers don't have to wait until writers are completely finished to get busy processing data. Because raw_input just reads stdin, the line-by-line scheme used by adder can always be coded with sys.stdin too:

C:\...\PP3E\System\Streams>type adder2.py
import sys
sum = 0
while True:
    line = sys.stdin.readline( )
    if not line: break
    sum += int(line)
print sum


This version utilizes the fact that the int allows the digits to be surrounded by whitespace (readline returns a line including its \n, but we don't have to use [:-1] or rstrip( ) to remove it for int). In fact, we can use Python's more recent file iterators to achieve the same effectthe for loop, for example, automatically grabs one line each time through when we iterate over a file object directly (more on file iterators in the next section):

C:\...\PP3E\System\Streams>type adder3.py
import sys
sum = 0
for line in sys.stdin: sum += int(line)
print sum


Changing sorter to read line by line this way may not be a big performance boost, though, because the list sort method requires that the list already be complete. As we'll see in Chapter 20, manually coded sort algorithms are likely to be much slower than the Python list sorting method.

Interestingly, these two scripts can also be coded in a much more compact fashion in Python 2.4 by using the new sorted function, list comprehensions, and file iterators. The following work the same way as the originals:

C:\...\PP3E\System\Streams>type sorter24.py
import sys
for line in sorted(sys.stdin): print line,

C:\...\PP3E\System\Streams>type adder24.py
import sys
print sum(int(line) for line in sys.stdin)


The latter of these employs a generator expression, which is much like a list comprehension, but results are returned one at a time, not in a physical list. The net effect is space optimization.
```

#### 21.1.2.8.1.4 Redirected streams and user interaction

```text
At the start of the last section, we piped teststreams.py output into the standard more command-line program with a command similar to this one:

C:\...\PP3E\System\Streams>python teststreams.py < input.txt | more


But since we already wrote our own "more" paging utility in Python near the start of this chapter, why not set it up to accept input from stdin too? For example, if we change the last three lines of the more.py file listed earlier in this chapter to this...

if __name__ == '__main__':                       # when run, not when imported
    if len(sys.argv) == 1:                         # page stdin if no cmd args
        more(sys.stdin.read( ))
    else:
        more(open(sys.argv[1]).read( ))

...it almost seems as if we should be able to redirect the standard output of teststreams.py into the standard input of more.py: 
$ python teststreams.py < input.txt | python more2.py
```

#### 21.1.2.8.1.5 Reading keyboard input

```text
But there's a subtle problem lurking in the preceding more.py command. Really, chaining worked there only by sheer luck: if the first script's output is long enough that more has to ask the user if it should continue, the script will utterly fail. The problem is that the augmented more.py uses stdin for two disjointed purposes. It reads a reply from an interactive user on stdin by calling raw_input, but now it also accepts the main input text on stdin. When the stdin stream is really redirected to an input file or pipe, we can't use it to input a reply from an interactive user; it contains only the text of the input source. Moreover, because stdin is redirected before the program even starts up, there is no way to know what it meant prior to being redirected in the command line.

If we intend to accept input on stdin and use the console for user interaction, we have to do a bit more. The example below shows a modified version of the more script that pages the standard input stream if called with no arguments but also makes use of lower-level and platform-specific tools to converse with a user at a keyboard if needed.
moreplus.py


#############################################################
# split and interactively page a string, file, or stream of
# text to stdout; when run as a script, page stdin or file
# whose name is passed on cmdline; if input is stdin, can't
# use it for user reply--use platform-specific tools or GUI;
#############################################################

import sys

def getreply( ):
    """
    read a reply key from an interactive user
    even if stdin redirected to a file or pipe
    """
    if sys.stdin.isatty( ):                       # if stdin is console
        return raw_input('?')                     # read reply line from stdin
    else:
        if sys.platform[:3] == 'win':            # if stdin was redirected
            import msvcrt                        # can't use to ask a user
            msvcrt.putch('?')
            key = msvcrt.getche( )                # use windows console tools
            msvcrt.putch('\n')                     # getch( ) does not echo key
            return key
	elif (sys.platform[:5] == 'linux' or sys.platform[:6] == 'cygwin'):        # use linux console device
            print '?',                           # strip eoln at line end
            console = open('/dev/tty')
            line = console.readline( )[:-1]
            return line
        else:
            print '[pause]'                      # else just pause--improve me
            import time                          # see also modules curses, tty
            time.sleep(5)                        # or copy to temp file, rerun
            return 'y'                           # or GUI pop up, tk key bind

def more(text, numlines=10):
    """
    split multiline string to stdout
    """
    lines = text.split('\n')
    while lines:
        chunk = lines[:numlines]
        lines = lines[numlines:]
        for line in chunk: print line
        if lines and getreply( ) not in ['y', 'Y']: break

if __name__ == '__main__':                     # when run, not when imported
    if len(sys.argv) == 1:                        # if no command-line arguments
        more(sys.stdin.read( ))                  # page stdin, no raw_inputs
    else:
        more(open(sys.argv[1]).read( ))          # else page filename argument


					  


Most of the new code in this version shows up in its getreply function. The file's isatty method tells us whether stdin is connected to the console; if it is, we simply read replies on stdin as before. Unfortunately, there is no portable way to input a string from a console user independent of stdin, so we must wrap the non-stdin input logic of this script in a sys.platform test:

    * On Windows, the built-in msvcrt module supplies low-level console input and output calls (e.g., msvcrt.getch( ) reads a single key press).
    * On Linux, the system device file named /dev/tty gives access to keyboard input (we can read it as though it were a simple file).
    * On other platforms, we simply run a built-in time.sleep call to pause for five seconds between displays (this is not at all ideal, but it is better than not stopping at all and it serves until a better nonportable solution can be found).

Of course, we have to add such extra logic only to scripts that intend to interact with console users and take input on stdin. In a GUI application, for example, we could instead pop up dialogs, bind keyboard-press events to run callbacks, and so on.

Armed with the reusable getreply function, though, we can safely run our moreplus utility in a variety of ways. As before, we can import and call this module's function directly, passing in whatever string we wish to page:

>>> from moreplus import more
>>> more(open('System.txt').read( ))
This directory contains operating system interface examples.

Many of the examples in this unit appear elsewhere in the examples
distribution tree, because they are actually used to manage other
programs. See the README.txt files in the subdirectories here
for pointers.


Also as before, when run with a command-line argument, this script interactively pages through the named file's text:

C:\...\PP3E\System>python moreplus.py System.txt
This directory contains operating system interface examples.

Many of the examples in this unit appear elsewhere in the examples
distribution tree, because they are actually used to manage other
programs. See the README.txt files in the subdirectories here
for pointers.

C:\...\PP3E\System>python moreplus.py moreplus.py
#############################################################
# split and interactively page a string, file, or stream of
# text to stdout; when run as a script, page stdin or file
# whose name is passed on cmdline; if input is stdin, can't
# use it for user reply--use platform-specific tools or GUI;
#############################################################

import sys, string

def getreply( ):
?n


But now the script also correctly pages text redirected into stdin from either a file or a command pipe, even if that text is too long to fit in a single display chunk. On most shells, we send such input via redirection or pipe operators like these:

C:\...\PP3E\System>python moreplus.py < moreplus.py
#############################################################
# split and interactively page a string, file, or stream of
# text to stdout; when run as a script, page stdin or file
# whose name is passed on cmdline; if input is stdin, can't
# use it for user reply--use platform-specific tools or GUI;
#############################################################

import sys, string

def getreply( ):
?n

C:\...\PP3E\System>type moreplus.py | python moreplus.py
#############################################################
# split and interactively page a string, file, or stream of
# text to stdout; when run as a script, page stdin or file
# whose name is passed on cmdline; if input is stdin, can't
# use it for user reply--use platform-specific tools or GUI;
#############################################################

import sys, string

def getreply( ):
?n


This works the same way on Linux, but, again, use the cat command rather than type. Finally, piping one Python script's output into this script's input now works as expected, without botching user interaction (and not just because we got lucky):
Code View: Scroll / Show All

......\System\Streams>python teststreams.py < input.txt | python ..\moreplus.py
Hello stream world
Enter a number>8 squared is 64
Enter a number>6 squared is 36
Enter a number>Bye


					  


Here, the standard output of one Python script is fed to the standard input of another Python script located in the parent directory: moreplus.py reads the output of teststreams.py.

All of the redirections in such command lines work only because scripts don't care what standard input and output really areinteractive users, files, or pipes between programs. For example, when run as a script, moreplus.py simply reads stream sys.stdin; the command-line shell (e.g., DOS on Windows, csh on Linux) attaches such streams to the source implied by the command line before the script is started. Scripts use the preopened stdin and stdout file objects to access those sources, regardless of their true nature.

And for readers keeping count, we have run this single more pager script in four different ways: by importing and calling its function, by passing a filename command-line argument, by redirecting stdin to a file, and by piping a command's output to stdin. By supporting importable functions, command-line arguments, and standard streams, Python system tools code can be reused in a wide variety of modes.
```

#### 21.1.2.8.2 Redirecting Streams to Python Objects

```text
All of the previous standard stream redirections work for programs written in any language that hooks into the standard streams and rely more on the shell's command-line processor than on Python itself. Command-line redirection syntax like < filename and | program is evaluated by the shell, not by Python. A more Pythonesque form of redirection can be done within scripts themselves by resetting sys.stdin and sys.stdout to file-like objects.

The main trick behind this mode is that anything that looks like a file in terms of methods will work as a standard stream in Python. The object's interface (sometimes called its protocol), and not the object's specific datatype, is all that matters. That is:

    * Any object that provides file-like read methods can be assigned to sys.stdin to make input come from that object's read methods.
    * Any object that defines file-like write methods can be assigned to sys.stdout; all standard output will be sent to that object's methods.

Because print and raw_input simply call the write and readline methods of whatever objects sys.stdout and sys.stdin happen to reference, we can use this technique to both provide and intercept standard stream text with objects implemented as classes.

Such plug-and-play compatibility is usually called polymorphismi.e., it doesn't matter what an object is, and it doesn't matter what its interface does, as long as it provides the expected interface. This liberal approach to datatypes accounts for much of the conciseness and flexibility of Python code. Here, it provides a way for scripts to reset their own streams. The example below shows a utility module that demonstrates this concept.

redirect.py
#############################################################################
# file-like objects that save standard output text in a string and provide
# standard input text from a string; redirect runs a passed-in function
# with its output and input streams reset to these file-like class objects;
#############################################################################

import sys                                      # get built-in modules

class Output:                                   # simulated output file
    def __init__(self):
        self.text = ''                          # empty string when created
    def write(self, string):                    # add a string of bytes
        self.text = self.text + string
    def writelines(self, lines):                # add each line in a list
        for line in lines: self.write(line)

class Input:                                    # simulated input file
    def __init__(self, input=''):                # default argument
        self.text = input                       # save string when created
    def read(self, *size):                      # optional argument
        if not size:                            # read N bytes, or all
            res, self.text = self.text, ''
        else:
            res, self.text = self.text[:size[0]], self.text[size[0]:]
        return res
    def readline(self):
        eoln = self.text.find('\n')             # find offset of next eoln
        if eoln == -1:                          # slice off through eoln
            res, self.text = self.text, ''
        else:
            res, self.text = self.text[:eoln+1], self.text[eoln+1:]
        return res

def redirect(function, args, input):            # redirect stdin/out
    savestreams = sys.stdin, sys.stdout         # run a function object
    sys.stdin   = Input(input)                  # return stdout text
    sys.stdout  = Output( )
    try:
        function(*args)                         # was apply(function, args)
    except:
        sys.stderr.write('error in function! ')
        sys.stderr.write("%s, %s\n" % tuple(sys.exc_info( )[:2]))
    result = sys.stdout.text
    sys.stdin, sys.stdout = savestreams
    return result

This module defines two classes that masquerade as real files:


Output

    Provides the write method interface (a.k.a. protocol) expected of output files but saves all output in an in-memory string as it is written.

Input

    Provides the interface expected of input files, but provides input on demand from an in-memory string passed in at object construction time.

The redirect function at the bottom of this file combines these two objects to run a single function with input and output redirected entirely to Python class objects. The passed-in function to run need not know or care that its print statements, raw_input calls and stdin and stdout method calls, are talking to a class rather than to a real file, pipe, or user.

To demonstrate, import and run the interact function at the heart of the teststreams script that we've been running from the shell (to use the redirection utility function, we need to deal in terms of functions, not files). When run directly, the function reads from the keyboard and writes to the screen, just as if it were run as a program without redirection:

C:\...\PP3E\System\Streams>python
>>> from teststreams import interact
>>> interact( )
Hello stream world
Enter a number>2
2 squared is 4
Enter a number>3
3 squared is 9
Enter a number
>>>

Now, let's run this function under the control of the redirection function in redirect.py and pass in some canned input text. In this mode, the interact function takes its input from the string we pass in ('4\n5\n6\n'three lines with explicit end-of-line characters), and the result of running the function is a string containing all the text written to the standard output stream:

>>> from redirect import redirect
>>> output = redirect(interact, ( ), '4\n5\n6\n')
>>> output
'Hello stream world\nEnter a number>4 squared is 16\nEnter a number>
5 squared is 25\nEnter a number>6 squared is 36\nEnter a number>Bye\n'

The result is a single, long string containing the concatenation of all text written to standard output. To make this look better, we can split it up with the string object's split method:

>>> for line in output.split('\n'): print line
...
Hello stream world
Enter a number>4 squared is 16
Enter a number>5 squared is 25
Enter a number>6 squared is 36
Enter a number>Bye


Better still, we can reuse the more.py module we saw earlier in this chapter; it's less to type and remember, and it's already known to work well:

>>> from PP3E.System.more import more
>>> more(output)
Hello stream world
Enter a number>4 squared is 16
Enter a number>5 squared is 25
Enter a number>6 squared is 36
Enter a number>Bye


This is an artificial example, of course, but the techniques illustrated are widely applicable. For example, it's straightforward to add a GUI interface to a program written to interact with a command-line user. Simply intercept standard output with an object such as the Output class shown earlier and throw the text string up in a window. Similarly, standard input can be reset to an object that fetches text from a graphical interface (e.g., a popped-up dialog box). Because classes are plug-and-play compatible with real files, we can use them in any tool that expects a file. Watch for a GUI stream-redirection module named guiStreams.

Notice the function(*args) syntax in the redirect function of Example 3-10. In the prior edition of this book, this was a built-in function call, apply(function, args), but the apply built-in has been marked as deprecated since that edition (in fact, it's not even listed in the functions section of the library manual). It's unclear whether apply will ever be removed completely, but the new call syntax is more general and concise, and it should be preferred today. The following equivalent calls, for instance, are more complex with apply; the new syntax allows normal arguments to be mixed with argument collection objects, but apply must merge manually:

>>> def m(self, a, b, c): print self, a, b, c

>>> m(1, *(2, 3, 4))
1 2 3 4

>>> apply(m, (1,) + (2, 3, 4))
1 2 3 4


This becomes more useful as call signatures grow more complex:

>>> a=1; b=2; c=3; d=4; e=5
>>> def func(a, *ps, **ks): print a, ps, ks

>>> func(a, b, c=1, *(d, e), **{'f':2})
1 (2, 4, 5) {'c': 1, 'f': 2}

>>> kargs = {'f':2}
>>> kargs.update({'c':1})
>>> apply(func, (a, b) + (d, e), kargs)
1 (2, 4, 5) {'c': 1, 'f': 2}
```

#### 21.1.2.8.3 The StringIO Module

```text
The prior section's technique of redirecting streams to objects proved so handy that now a standard library automates the task. It provides an object that maps a file object interface to and from in-memory strings. For example:

>>> from StringIO import StringIO
>>> buff = StringIO( )                   # save written text to a string
>>> buff.write('spam\n')
>>> buff.write('eggs\n')
>>> buff.getvalue( )
'spam\neggs\n'

>>> buff = StringIO('ham\nspam\n')      # provide input from a string
>>> buff.readline( )
'ham\n'
>>> buff.readline( )
'spam\n'
>>> buff.readline( )
''

As in the prior section, instances of StringIO objects can be assigned to sys.stdin and sys.stdout to redirect streams for raw_input and print and can be passed to any code that was written to expect a real file object. Again, in Python, the object interface, not the concrete datatype, is the name of the game:

>>> from StringIO import StringIO
>>> import sys
>>> buff = StringIO( )

>>> temp = sys.stdout
>>> sys.stdout = buff
>>> print 42, 'spam', 3.141               # or print >> buff, ...

>>> sys.stdout = temp                     # restore original stream
>>> buff.getvalue( )
'42 spam 3.141\n'
```

#### 21.1.2.8.4 Capturing the stderr Stream

```text
We've been focusing on stdin and stdout redirection, but stderr can be similarly reset to files, pipes, and objects. This is straightforward within a Python script. For instance, assigning sys.stderr to another instance of a class such as Output or a StringIO object in the preceding section's example allows your script to intercept text written to standard error too.

Python itself uses standard error for error message text (and the IDLE GUI interface intercepts it and colors it red by default). However, no higher-level tools for standard error do what print and raw_input( ) do for the output and input streams. If you wish to print to the error stream, you'll want to call sys.stderr.write( ) explicitly or read the next section for a print statement trick that makes this a bit simpler.

Redirecting standard errors from a shell command line is a bit more complex and less portable. On most Unix-like systems, we can usually capture stderr output by using shell-redirection syntax of the form command > output 2>&1. This may not work on some flavors of Windows platforms, though, and can even vary per Unix shell; see your shell's manpages for more details.
```

#### 21.1.2.8.5 Redirection Syntax in Print Statements

```text
Because resetting the stream attributes to new objects was so popular, as of Python 2.0 the print statement is also extended to include an explicit file to which output is to be sent. A statement of the form:

print >> file, stuff          # file is an object, not a string name


prints stuff to file instead of to stdout. The net effect is similar to simply assigning sys.stdout to an object, but there is no need to save and restore in order to return to the original output stream (as shown in the section on redirecting streams to objects). For example:

import sys
print >> sys.stderr, 'spam' * 2


will send text the standard error stream object rather than sys.stdout for the duration of this single print statement only. The next normal print statement (without >>) prints to standard output as usual.
```

#### 21.1.2.8.6 Other Redirection Options

```text
Earlier in this chapter, we studied the built-in os.popen function, which provides a way to redirect another command's streams from within a Python program. As we saw, this function runs a shell command line (e.g., a string we would normally type at a DOS or csh prompt) but returns a Python file-like object connected to the command's input or output stream.

Because of that, the os.popen tool is another way to redirect streams of spawned programs, and it is a cousin to the techniques we just met: its effect is much like the shell | command-line pipe syntax for redirecting streams to programs (in fact, its name means "pipe open"), but it is run within a script and provides a file-like interface to piped streams. It's similar in spirit to the redirect function, but it's based on running programs (not calling functions), and the command's streams are processed in the spawning script as files (not tied to class objects). That is, os.popen redirects the streams of a program that a script starts instead of redirecting the streams of the script itself.

By passing in the desired mode flag, we redirect a spawned program's input or output streams to a file in the calling scripts:

C:\...\PP3E\System\Streams>type hello-out.py
print 'Hello shell world'

C:\...\PP3E\System\Streams>type hello-in.py
input = raw_input( )
open('hello-in.txt', 'w').write('Hello ' + input + '\n')

C:\...\PP3E\System\Streams>python
>>> import os
>>> pipe = os.popen('python hello-out.py')         # 'r' is default--read stdout
>>> pipe.read( )
'Hello shell world\n'

>>> pipe = os.popen('python hello-in.py', 'w')
>>> pipe.write('Gumby\n')                            # 'w'--write to program stdin
>>> pipe.close( )                                   # \n at end is optional
>>> open('hello-in.txt').read( )
'Hello Gumby\n'


					  


The popen call is also smart enough to run the command string as an independent process on platforms that support such a notion. It accepts an optional third argument that can be used to control buffering of written text.

Additional popen-like tools in the Python library allow scripts to connect to more than one of the commands' streams. For instance, the os.open2 call includes functions for hooking into both a command's input and output streams:

childStdIn, childStdout = os.popen2('python hello-in-out.py')
childStdin.write(input)
output = childStdout.read( )


os.popen3 is similar, but it returns a third pipe for connecting to standard error as well. A related call, os.popen4, returns two pipe file objects; it's like os.popen3, but the output and error streams are tied together into a single pipe:

childStdin, childStdout, childStderr = os.popen3('python hello-in-out.py')
childStdin, childStdout_and_err =      os.popen4('python hello-in-out.py')


The os.popen2/3/4 variants work much like os.popen, but they connect additional streams and accept an optional second argument that specifies text or binary-mode data (t or bmore on the distinction in the next chapter).

The os.popen calls are also Python's portable equivalent of Unix-like shell syntax for redirecting the streams of spawned programs. The Python versions also work on Windows, though, and are the most platform-neutral way to launch another program from a Python script. The command-line strings you pass to them may vary per platform (e.g., a directory listing requires an ls on Unix but a dir on Windows), but the call itself works on all major Python platforms.

On Unix-like platforms, the combination of the calls os.fork, os.pipe, os.dup, and some os.exec variants can be used to start a new independent program with streams connected to the parent program's streams. As such, it's another way to redirect streams and a low-level equivalent to tools such as os.popen.

As of this writing, the os.fork call does not work on the standard version of Python for Windows, however, because it is too much at odds with that system's process model. See Chapter 5 for more on all of these calls, especially its section on pipes, as well its sidebar on Cygwin, a third-party package that includes a library for use on Windows that adds Unix calls such as fork and a version of Python that contains such tools.[*]

    [*] More historical anecdotes for users of older releases: as of Python 2.0, the popen2 and popen3 calls are made available in the os module, and this subsumes the older popen2 module. For example, os.popen2 is the same as the older popen2.popen2 except that the order of stdin and stdout in the call's result tuple is swapped.

In the next chapter, we'll continue our survey of Python system interfaces by exploring the tools available for processing files and directories. Although we'll be shifting focus somewhat, we'll find that some of what we've learned here will already begin to come in handy as general system-related tools. Spawning shell commands, for instance, provides ways to inspect directories, and the file interface we will expand on in the next chapter is at the heart of the stream processing techniques we have studied here.
```

### 21.1.3 File and Directory Tools

```text
		21.1.4 

		21.1.5 

		21.1.6 


	21.2
```
