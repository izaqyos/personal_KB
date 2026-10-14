---
type: reference
title: "My examples, recipes"
description: "Legacy Python KB section: My examples, recipes (strings, Translate strings, Extract filename from full path in Python?)"
tags: [examples, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-str-maketrans, resource: "https://docs.python.org/3/library/stdtypes.html#str.maketrans", title: "Python 3 docs: str.maketrans" }
  - { id: py38-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.8.html", title: "What's New In Python 3.8 (time.clock removed)" }
  - { id: py-contextlib, resource: "https://docs.python.org/3/library/contextlib.html#contextlib.redirect_stdout", title: "Python 3 docs: contextlib.redirect_stdout" }
status: stable
capture_type: source
legacy_source: "python/KB_python#36"
---

# My examples, recipes

[↑ KB_python](/python/kb-python/README.md)

## 36.1 strings

### 36.1.1 Translate strings

#### 36.1.1.1 using ord and chr

> Updated 2026-10 to current practice.[^py3-whatsnew]

All letters +2 (a->c, b->d, …, y->a, z->b). Python 3 version: `print()` is a function, and the variable is no longer called `str`, which shadowed the built-in.

```python
#!/usr/bin/env python3
import sys

if len(sys.argv) != 2:
    print("usage: translate <string>")
else:
    text = sys.argv[1]
    print("Translating string", text)

    # my long way :)
    new_str = ""
    for c in text:
        if 'a' <= c <= 'z':
            new_str += chr((ord(c) - ord('a') + 2) % 26 + ord('a'))
        else:
            new_str += c
    print(new_str)
```

#### 36.1.1.2 Using string.maketrans()

> Updated 2026-10 to current practice.[^py-str-maketrans]

In Python 3, `string.maketrans()` is gone. Use the static method **`str.maketrans()`** and pass the result to `str.translate()`. Forms:

- `str.maketrans(x, y)`: two strings of equal length; each character in `x` maps to the character at the same position in `y`.
- `str.maketrans(x, y, z)`: as above, plus every character in `z` maps to `None` (deleted).
- `str.maketrans(d)`: a dict mapping characters (or ordinals) to strings, ordinals or `None`.

Example: replace each vowel with its position.

```python
intab = "aeiou"
outtab = "12345"
trantab = str.maketrans(intab, outtab)

text = "this is string example....wow!!!"
print(text.translate(trantab))
# th3s 3s str3ng 2x1mpl2....w4w!!!
```

The +2 shift from 36.1.1.1 as a one-liner:

```python
import string
lc = string.ascii_lowercase
shift2 = str.maketrans(lc, lc[2:] + lc[:2])
print("xyz abc".translate(shift2))   # zab cde
```

For `bytes`, use `bytes.maketrans()` / `bytes.translate()`.

### 36.1.2 Extract filename from full path in Python?

> Updated 2026-10 to current practice.[^py3-whatsnew]

Use split and take the last token, or more conveniently `os.path.basename` (or `pathlib`):

```python
>>> import os.path
>>> print(os.path.basename("/home/user/workdir/project1"))
project1
>>> from pathlib import Path, PureWindowsPath
>>> Path("/home/user/workdir/report.txt").name
'report.txt'
>>> PureWindowsPath(r"C:\workdir\project1").name   # Windows path on any OS
'project1'
```

`os.path.basename` only splits on the separators of the OS you run on. A Windows path like `C:\workdir\project1` only works with it on Windows; elsewhere use `PureWindowsPath`. Use raw strings (`r"..."`) for backslashes.

### 36.1.3 in python how to remove this \n from string or list

```text
		use strip
data_list = [word.strip() for word in data_list]
```

### 36.1.4 slices

```text
s=[0,5,7,100]

reverse order
s[::-1]

push in middle 
s[2:3] = [1,2,3] #push 1,2,3 instead of 2nd element 
```

### 36.1.5 namedtuple

```text
from collections import namedtuple
>>> Point=namedtuple('point',['x','y'])
>>> Point
<class '__main__.point'>
>>> p1=Point(1,2)
>>> p1
point(x=1, y=2)
```

### 36.1.6 Run code Snipplets from pycharm

```text
Select code, right click, run selected in console

ex:

>>> from  collections import  namedtuple
Version = namedtuple('Version', ['major','minor','patch'])
class Circle(object):
    """ class doc """
    version = Version(1,0,0) #class attr, all instances have it like static in C++
    def __init__(self,radius):
        self.radius = radius #instance attr

>>> c1 = Circle(7)
>>> c1.radius
7
>>> c1.version
Version(major=1, minor=0, patch=0)
>>> c1.__dict__
{'radius': 7}
>>> Circle.__dict__
mappingproxy({'__doc__': ' class doc ', '__dict__': <attribute '__dict__' of 'Circle' objects>, 'version': Version(major=1, minor=0, patch=0), '__weakref__': <attribute '__weakref__' of 'Circle' objects>, '__init__': <function Circle.__init__ at 0x1046e61e0>, '__module__': 'builtins'})

- resolution order, instance, class, inheritance
>>> vars(c1)
{'radius': 7}
>>> 'version' in vars(c1)
False
>>> c1.__class__
<class 'Circle'>
>>> 'version' in vars(c1.__class__)
True
```

## 36.2 directories

### 36.2.1 simple directory related tasks

> Updated 2026-10 to current practice.[^py3-whatsnew]

Python 3 shortcut: `os.makedirs("aaa", exist_ok=True)` (or `Path("aaa").mkdir(parents=True, exist_ok=True)`) creates the directory without failing when it exists.

```text
>>> os.mkdir("aaa")
>>> os.listdir(".")
['.python_history',
 'aaa',
 ...
 'xyz']

-will fail if dir already exists
>>> os.mkdir("aaa")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
OSError: [Errno 17] File exists: 'aaa'
>>> if not os.path.exists("aaa"):
...     os.mkdir("aaa")
... else
  File "<stdin>", line 3
    else
       ^
SyntaxError: invalid syntax
>>> if not os.path.exists("aaa"):
...     os.mkdir("aaa")
... else:
...     print("bbb")
... 
bbb
```

#### 36.2.1.1 File and Directory Access

```text
			http://docs.python.org/library/filesys.html
```

#### 36.2.1.1.1 os.path — Common pathname manipulations

```text
This module implements some useful functions on pathnames. To read or write files see open(), and for accessing the filesystem see the os module.

Note

On Windows, many of these functions do not properly support UNC pathnames. splitunc() and ismount() do handle them correctly.

Note

Since different operating systems have different path name conventions, there are several versions of this module in the standard library. The os.path module is always the path module suitable for the operating system Python is running on, and therefore usable for local paths. However, you can also import and use the individual modules if you want to manipulate a path that is always in one of the different formats. They all have the same interface:

    posixpath for UNIX-style paths
    ntpath for Windows paths
    macpath for old-style MacOS paths
    os2emxpath for OS/2 EMX paths

os.path.abspath(path)

    Return a normalized absolutized version of the pathname path. On most platforms, this is equivalent to normpath(join(os.getcwd(), path)).

    New in version 1.5.2.

os.path.basename(path)

    Return the base name of pathname path. This is the second half of the pair returned by split(path). Note that the result of this function is different from the Unix basename program; where basename for '/foo/bar/' returns 'bar', the basename() function returns an empty string ('').

os.path.commonprefix(list)

    Return the longest path prefix (taken character-by-character) that is a prefix of all paths in list. If list is empty, return the empty string (''). Note that this may return invalid paths because it works a character at a time.

os.path.dirname(path)

    Return the directory name of pathname path. This is the first half of the pair returned by split(path).

os.path.exists(path)

    Return True if path refers to an existing path. Returns False for broken symbolic links. On some platforms, this function may return False if permission is not granted to execute os.stat() on the requested file, even if the path physically exists.

os.path.lexists(path)

    Return True if path refers to an existing path. Returns True for broken symbolic links. Equivalent to exists() on platforms lacking os.lstat().

    New in version 2.4.

os.path.expanduser(path)

    On Unix and Windows, return the argument with an initial component of ~ or ~user replaced by that user‘s home directory.

    On Unix, an initial ~ is replaced by the environment variable HOME if it is set; otherwise the current user’s home directory is looked up in the password directory through the built-in module pwd. An initial ~user is looked up directly in the password directory.

    On Windows, HOME and USERPROFILE will be used if set, otherwise a combination of HOMEPATH and HOMEDRIVE will be used. An initial ~user is handled by stripping the last directory component from the created user path derived above.

    If the expansion fails or if the path does not begin with a tilde, the path is returned unchanged.

os.path.expandvars(path)

    Return the argument with environment variables expanded. Substrings of the form $name or ${name} are replaced by the value of environment variable name. Malformed variable names and references to non-existing variables are left unchanged.

    On Windows, %name% expansions are supported in addition to $name and ${name}.

os.path.getatime(path)

    Return the time of last access of path. The return value is a number giving the number of seconds since the epoch (see the time module). Raise os.error if the file does not exist or is inaccessible.

    New in version 1.5.2.

    Changed in version 2.3: If os.stat_float_times() returns True, the result is a floating point number.

os.path.getmtime(path)

    Return the time of last modification of path. The return value is a number giving the number of seconds since the epoch (see the time module). Raise os.error if the file does not exist or is inaccessible.

    New in version 1.5.2.

    Changed in version 2.3: If os.stat_float_times() returns True, the result is a floating point number.

os.path.getctime(path)

    Return the system’s ctime which, on some systems (like Unix) is the time of the last change, and, on others (like Windows), is the creation time for path. The return value is a number giving the number of seconds since the epoch (see the time module). Raise os.error if the file does not exist or is inaccessible.

    New in version 2.3.

os.path.getsize(path)

    Return the size, in bytes, of path. Raise os.error if the file does not exist or is inaccessible.

    New in version 1.5.2.

os.path.isabs(path)

    Return True if path is an absolute pathname. On Unix, that means it begins with a slash, on Windows that it begins with a (back)slash after chopping off a potential drive letter.

os.path.isfile(path)

    Return True if path is an existing regular file. This follows symbolic links, so both islink() and isfile() can be true for the same path.

os.path.isdir(path)

    Return True if path is an existing directory. This follows symbolic links, so both islink() and isdir() can be true for the same path.

os.path.islink(path)

    Return True if path refers to a directory entry that is a symbolic link. Always False if symbolic links are not supported.

os.path.ismount(path)

    Return True if pathname path is a mount point: a point in a file system where a different file system has been mounted. The function checks whether path‘s parent, path/.., is on a different device than path, or whether path/.. and path point to the same i-node on the same device — this should detect mount points for all Unix and POSIX variants.

os.path.join(path1[, path2[, ...]])

    Join one or more path components intelligently. If any component is an absolute path, all previous components (on Windows, including the previous drive letter, if there was one) are thrown away, and joining continues. The return value is the concatenation of path1, and optionally path2, etc., with exactly one directory separator (os.sep) following each non-empty part except the last. (This means that an empty last part will result in a path that ends with a separator.) Note that on Windows, since there is a current directory for each drive, os.path.join("c:", "foo") represents a path relative to the current directory on drive C: (c:foo), not c:\foo.

os.path.normcase(path)

    Normalize the case of a pathname. On Unix and Mac OS X, this returns the path unchanged; on case-insensitive filesystems, it converts the path to lowercase. On Windows, it also converts forward slashes to backward slashes.

os.path.normpath(path)

    Normalize a pathname. This collapses redundant separators and up-level references so that A//B, A/B/, A/./B and A/foo/../B all become A/B.

    It does not normalize the case (use normcase() for that). On Windows, it converts forward slashes to backward slashes. It should be understood that this may change the meaning of the path if it contains symbolic links!

os.path.realpath(path)

    Return the canonical path of the specified filename, eliminating any symbolic links encountered in the path (if they are supported by the operating system).

    New in version 2.2.

os.path.relpath(path[, start])

    Return a relative filepath to path either from the current directory or from an optional start point.

    start defaults to os.curdir.

    Availability: Windows, Unix.

    New in version 2.6.

os.path.samefile(path1, path2)

    Return True if both pathname arguments refer to the same file or directory (as indicated by device number and i-node number). Raise an exception if a os.stat() call on either pathname fails.

    Availability: Unix.

os.path.sameopenfile(fp1, fp2)

    Return True if the file descriptors fp1 and fp2 refer to the same file.

    Availability: Unix.

os.path.samestat(stat1, stat2)

    Return True if the stat tuples stat1 and stat2 refer to the same file. These structures may have been returned by fstat(), lstat(), or stat(). This function implements the underlying comparison used by samefile() and sameopenfile().

    Availability: Unix.

os.path.split(path)

    Split the pathname path into a pair, (head, tail) where tail is the last pathname component and head is everything leading up to that. The tail part will never contain a slash; if path ends in a slash, tail will be empty. If there is no slash in path, head will be empty. If path is empty, both head and tail are empty. Trailing slashes are stripped from head unless it is the root (one or more slashes only). In all cases, join(head, tail) returns a path to the same location as path (but the strings may differ).

os.path.splitdrive(path)

    Split the pathname path into a pair (drive, tail) where drive is either a drive specification or the empty string. On systems which do not use drive specifications, drive will always be the empty string. In all cases, drive + tail will be the same as path.

    New in version 1.3.

os.path.splitext(path)

    Split the pathname path into a pair (root, ext) such that root + ext == path, and ext is empty or begins with a period and contains at most one period. Leading periods on the basename are ignored; splitext('.cshrc') returns ('.cshrc', '').

    Changed in version 2.6: Earlier versions could produce an empty root when the only period was the first character.

os.path.splitunc(path)

    Split the pathname path into a pair (unc, rest) so that unc is the UNC mount point (such as r'\\host\mount'), if present, and rest the rest of the path (such as r'\path\file.ext'). For paths containing drive letters, unc will always be the empty string.

    Availability: Windows.

os.path.walk(path, visit, arg)

    Calls the function visit with arguments (arg, dirname, names) for each directory in the directory tree rooted at path (including path itself, if it is a directory). The argument dirname specifies the visited directory, the argument names lists the files in the directory (gotten from os.listdir(dirname)). The visit function may modify names to influence the set of directories visited below dirname, e.g. to avoid visiting certain parts of the tree. (The object referred to by names must be modified in place, using del or slice assignment.)

    Note

    Symbolic links to directories are not treated as subdirectories, and that walk() therefore will not visit them. To visit linked directories you must identify them with os.path.islink(file) and os.path.isdir(file), and invoke walk() as necessary.

    Note

    This function is deprecated and has been removed in Python 3 in favor of os.walk().

os.path.supports_unicode_filenames

    True if arbitrary Unicode strings can be used as file names (within limitations imposed by the file system).

    New in version 2.3.
```

#### 36.2.1.1.2 fileinput — Iterate over lines from multiple input streams

```text
Source code: Lib/fileinput.py

This module implements a helper class and functions to quickly write a loop over standard input or a list of files. If you just want to read or write one file see open().

The typical use is:

import fileinput
for line in fileinput.input():
    process(line)

This iterates over the lines of all files listed in sys.argv[1:], defaulting to sys.stdin if the list is empty. If a filename is '-', it is also replaced by sys.stdin. To specify an alternative list of filenames, pass it as the first argument to input(). A single file name is also allowed.

All files are opened in text mode by default, but you can override this by specifying the mode parameter in the call to input() or FileInput(). If an I/O error occurs during opening or reading a file, IOError is raised.

If sys.stdin is used more than once, the second and further use will return no lines, except perhaps for interactive use, or if it has been explicitly reset (e.g. using sys.stdin.seek(0)).

Empty files are opened and immediately closed; the only time their presence in the list of filenames is noticeable at all is when the last file opened is empty.

Lines are returned with any newlines intact, which means that the last line in a file may not have one.

You can control how files are opened by providing an opening hook via the openhook parameter to fileinput.input() or FileInput(). The hook must be a function that takes two arguments, filename and mode, and returns an accordingly opened file-like object. Two useful hooks are already provided by this module.

The following function is the primary interface of this module:

fileinput.input([files[, inplace[, backup[, mode[, openhook]]]]])

    Create an instance of the FileInput class. The instance will be used as global state for the functions of this module, and is also returned to use during iteration. The parameters to this function will be passed along to the constructor of the FileInput class.

    Changed in version 2.5: Added the mode and openhook parameters.

The following functions use the global state created by fileinput.input(); if there is no active state, RuntimeError is raised.

fileinput.filename()

    Return the name of the file currently being read. Before the first line has been read, returns None.

fileinput.fileno()

    Return the integer “file descriptor” for the current file. When no file is opened (before the first line and between files), returns -1.

    New in version 2.5.

fileinput.lineno()

    Return the cumulative line number of the line that has just been read. Before the first line has been read, returns 0. After the last line of the last file has been read, returns the line number of that line.

fileinput.filelineno()

    Return the line number in the current file. Before the first line has been read, returns 0. After the last line of the last file has been read, returns the line number of that line within the file.

fileinput.isfirstline()

    Returns true if the line just read is the first line of its file, otherwise returns false.

fileinput.isstdin()

    Returns true if the last line was read from sys.stdin, otherwise returns false.

fileinput.nextfile()

    Close the current file so that the next iteration will read the first line from the next file (if any); lines not read from the file will not count towards the cumulative line count. The filename is not changed until after the first line of the next file has been read. Before the first line has been read, this function has no effect; it cannot be used to skip the first file. After the last line of the last file has been read, this function has no effect.

fileinput.close()

    Close the sequence.

The class which implements the sequence behavior provided by the module is available for subclassing as well:

class fileinput.FileInput([files[, inplace[, backup[, mode[, openhook]]]]])

    Class FileInput is the implementation; its methods filename(), fileno(), lineno(), filelineno(), isfirstline(), isstdin(), nextfile() and close() correspond to the functions of the same name in the module. In addition it has a readline() method which returns the next input line, and a __getitem__() method which implements the sequence behavior. The sequence must be accessed in strictly sequential order; random access and readline() cannot be mixed.

    With mode you can specify which file mode will be passed to open(). It must be one of 'r', 'rU', 'U' and 'rb'.

    The openhook, when given, must be a function that takes two arguments, filename and mode, and returns an accordingly opened file-like object. You cannot use inplace and openhook together.

    Changed in version 2.5: Added the mode and openhook parameters.

Optional in-place filtering: if the keyword argument inplace=1 is passed to fileinput.input() or to the FileInput constructor, the file is moved to a backup file and standard output is directed to the input file (if a file of the same name as the backup file already exists, it will be replaced silently). This makes it possible to write a filter that rewrites its input file in place. If the backup parameter is given (typically as backup='.<some extension>'), it specifies the extension for the backup file, and the backup file remains around; by default, the extension is '.bak' and it is deleted when the output file is closed. In-place filtering is disabled when standard input is read.

Note

The current implementation does not work for MS-DOS 8+3 filesystems.

The two following opening hooks are provided by this module:

fileinput.hook_compressed(filename, mode)

    Transparently opens files compressed with gzip and bzip2 (recognized by the extensions '.gz' and '.bz2') using the gzip and bz2 modules. If the filename extension is not '.gz' or '.bz2', the file is opened normally (ie, using open() without any decompression).

    Usage example: fi = fileinput.FileInput(openhook=fileinput.hook_compressed)

    New in version 2.5.

fileinput.hook_encoded(encoding)

    Returns a hook which opens each file with codecs.open(), using the given encoding to read the file.

    Usage example: fi = fileinput.FileInput(openhook=fileinput.hook_encoded("iso-8859-1"))

    Note

    With this hook, FileInput might return Unicode strings depending on the specified encoding.

    New in version 2.5.
| 10.3. stat — Interpreting stat() results
| 10.4. statvfs — Constants used with os.statvfs()
| 10.5. filecmp — File and Directory Comparisons
| 
|     10.5.1. The dircmp class
| 
| 10.6. tempfile — Generate temporary files and directories
| 10.7. glob — Unix style pathname pattern expansion
| 10.8. fnmatch — Unix filename pattern matching
| 10.9. linecache — Random access to text lines
| 10.10. shutil — High-level file operations
| 
|     10.10.1. Directory and files operations
|         10.10.1.1. copytree example
|     10.10.2. Archiving operations
|         10.10.2.1. Archiving example
| 
| 10.11. dircache — Cached directory listings
| 10.12. macpath — Mac OS 9 path manipulation functions
```

#### 36.2.1.2 get current working directory

```text
os.getcwd()
  dirname, filename = os.path.split(os.path.abspath(__file__))
			36.2.1.3
		36.2.2
```

## 36.3 Time

### 36.3.1 Simple measure elapsed time

```text
In [1]: import time

In [2]: st = time.time()

In [3]: st
Out[3]: 1619354658.059767

In [4]: et = time.time()

In [5]: et-st
Out[5]: 13.22887897491455

If you just want to measure the elapsed wall-clock time between two points, you could use time.time():

import time

start = time.time()
print("hello")
end = time.time()
print(end - start)
This gives the execution time in seconds.

	    36.3.2
```

> Updated 2026-10 to current practice.[^py38-whatsnew]

For measuring durations use `time.perf_counter()` (monotonic, highest resolution) rather than `time.time()`, which can jump if the system clock changes. Use `time.process_time()` for CPU time only. `time.clock()` was deprecated in 3.3 and **removed in Python 3.8**, so it no longer exists.

```python
import time

start = time.perf_counter()
print("hello")
elapsed = time.perf_counter() - start
print(f"{elapsed:.6f} s")
```

For micro-benchmarks use `timeit` (`python -m timeit "sum(range(1000))"`).

## 36.4 dates

### 36.4.1 pretty print date and time

> Updated 2026-10 to current practice.[^py3-whatsnew] The example below now uses `print()`. In modern code, f-strings also accept format specs directly: `f"{datetime.date.today():%Y-%m-%d}"`, and `datetime.datetime.now().isoformat()` gives an ISO 8601 string.

```text
https://stackoverflow.com/questions/311627/how-to-print-a-date-in-a-regular-format
The date, datetime, and time objects all support a strftime(format) method, to create a string representing the time under the control of an explicit format string.

Here is a list of the format codes with their directive and meaning.

    %a  Locale’s abbreviated weekday name.
    %A  Locale’s full weekday name.      
    %b  Locale’s abbreviated month name.     
    %B  Locale’s full month name.
    %c  Locale’s appropriate date and time representation.   
    %d  Day of the month as a decimal number [01,31].    
    %f  Microsecond as a decimal number [0,999999], zero-padded on the left
    %H  Hour (24-hour clock) as a decimal number [00,23].    
    %I  Hour (12-hour clock) as a decimal number [01,12].    
    %j  Day of the year as a decimal number [001,366].   
    %m  Month as a decimal number [01,12].   
    %M  Minute as a decimal number [00,59].      
    %p  Locale’s equivalent of either AM or PM.
    %S  Second as a decimal number [00,61].
    %U  Week number of the year (Sunday as the first day of the week)
    %w  Weekday as a decimal number [0(Sunday),6].   
    %W  Week number of the year (Monday as the first day of the week)
    %x  Locale’s appropriate date representation.    
    %X  Locale’s appropriate time representation.    
    %y  Year without century as a decimal number [00,99].    
    %Y  Year with century as a decimal number.   
    %z  UTC offset in the form +HHMM or -HHMM.
    %Z  Time zone name (empty string if the object is naive).    
    %%  A literal '%' character.
This is what we can do with the datetime and time modules in Python (Python 3):

    import time
    import datetime

    print("Time in seconds since the epoch: %s" % time.time())
    print("Current date and time: ", datetime.datetime.now())
    print("Or like this: ", datetime.datetime.now().strftime("%y-%m-%d-%H-%M"))


    print("Current year: ", datetime.date.today().strftime("%Y"))
    print("Month of year: ", datetime.date.today().strftime("%B"))
    print("Week number of the year: ", datetime.date.today().strftime("%W"))
    print("Weekday of the week: ", datetime.date.today().strftime("%w"))
    print("Day of year: ", datetime.date.today().strftime("%j"))
    print("Day of the month : ", datetime.date.today().strftime("%d"))
    print("Day of week: ", datetime.date.today().strftime("%A"))
That will print out something like this:

    Time in seconds since the epoch:    1349271346.46
    Current date and time:              2012-10-03 15:35:46.461491
    Or like this:                       12-10-03-15-35
    Current year:                       2012
    Month of year:                      October
    Week number of the year:            40
    Weekday of the week:                3
    Day of year:                        277
    Day of the month :                  03
    Day of week:                        Wednesday
	    36.4.2
```

## 36.5 tips and tricks

### 36.5.1 redirect prints to stdout

> Updated 2026-10 to current practice.[^py-contextlib] Prefer `contextlib.redirect_stdout`, which restores `sys.stdout` automatically even if an exception is raised. Alternatively use `print(..., file=f)`:
>
> ```python
> from contextlib import redirect_stdout
> with open('file', 'w') as f, redirect_stdout(f):
>     print('test')
> ```

```text
on my mac sometime > seems not to work
in this case can do:
import sys
sys.stdout = open('file', 'w')
print('test')
sys.stdout.close()
(from https://stackoverflow.com/questions/4675728/redirect-stdout-to-a-file-in-python)

	36.6
```

[^py3-whatsnew]: What's New In Python 3.0
[^py-str-maketrans]: Python 3 docs: str.maketrans
[^py38-whatsnew]: What's New In Python 3.8 (time.clock removed)
[^py-contextlib]: Python 3 docs: contextlib.redirect_stdout
