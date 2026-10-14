---
type: reference
title: Files
description: "Legacy Python KB section: Files (delete lines from file, Get list of files in dir, os way)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#17"
---

# Files

[↑ KB_python](/python/kb-python/README.md)

## 17.1 delete lines from file

```text
      import os
      def CutOut(filename, start, end):
          """ Cut out lines from start to end from file filename """
       
          # check it's worth even reading the file (sanity check)
          if start >= end:
              return
       
          # read the entire file in as separate lines
          filelines = file(filename).readlines()
       
          # make sure start is a sane value
          if start > len(filelines):
             return
       
          # make sure end is a sane value
          if end > len(filelines):
             end = len(filelines)
       
          # chop out the bit we don't want
          filelines = filelines[:start] + filelines[end:]
       
          # could do this instead (not sure which is quicker):
          # del filelines[start:end]
       
          # write out the new set of lines
          file(filename,"w").writelines(filelines)
```

## 17.2 Get list of files in dir

### 17.2.1 os way

```text
>>> import os
>>> dirList = os.listdir(os.curdir)
	>>> for file in dirList:
	...     print file
	... 
```

### 17.2.2 Using glob ( > 2.6)

```text
From http://docs.python.org/library/glob.html

The glob module finds all the pathnames matching a specified pattern according to the rules used by the Unix shell. No tilde expansion is done, but *, ?, and character ranges expressed with [] will be correctly matched. This is done by using the os.listdir() and fnmatch.fnmatch() functions in concert, and not by actually invoking a subshell. (For tilde and shell variable expansion, use os.path.expanduser() and os.path.expandvars().)

glob.glob(pathname)Â¶
    Return a possibly-empty list of path names that match pathname, which must be a string containing a path specification. pathname can be either absolute (like /usr/src/Python-1.5/Makefile) or relative (like ../../Tools/*/*.gif), and can contain shell-style wildcards. Broken symlinks are included in the results (as in the shell).

glob.iglob(pathname)Â¶

    Return an iterator which yields the same values as glob() without actually storing them all simultaneously.

    New in version 2.5.

For example, consider a directory containing only the following files: 1.gif, 2.txt, and card.gif. glob() will produce the following results. Notice how any leading components of the path are preserved.

>>> import glob
>>> glob.glob('./[0-9].*')
['./1.gif', './2.txt']
>>> glob.glob('*.gif')
['1.gif', 'card.gif']
>>> glob.glob('?.gif')
['1.gif']

See also

Module fnmatch
    Shell-style filename (not path) expansion
```

## 17.3 Read files

### 17.3.1 read file character by character

```text
Use open(file, mode) with a filename as file and "r" as mode to open the file. Use a for-loop to iterate through each line of the file. Use a nested for-loop to iterate through each character of each line. Use file.close() with the filename as file to close the file.

file = open("sample.txt", "r")

for line in file:
    for character in line:
        print(character)
OUTPUT
a
b
c
d
file.close()

my example:
$ cat st
hand
In [1]: with open('st', 'r') as f:
   ...:     for l in f:
   ...:         for c in l:
   ...:             print(c)
   ...: 
h
a
n
d
```

### 17.3.2 read file byte by byte

```text
my example, read byte by byte until eof
with open('st', 'r') as f:
    while True:
        c = f.read(1)
        if not c: #eof
            break
        print(c)


h
a
n
d

Use file.read(size) with 1 as size to read the next character in file.

file = open("sample.txt", "r")

first_character = file.read(1)
print(first_character)
OUTPUT
a

second_character = file.read(1)
print(second_character)
OUTPUT
b
file.close()


To read in chunks.
In [2]: with open('st', 'r') as f:
   ...:     while True:
   ...:         c = f.read(3)
   ...:         if not c: #eof
   ...:             break
   ...:         print(c) #last chunk size can be <3 when size%3!=0
   ...: 
han
d
```

### 17.3.3 3 Ways to Read A Text File Line by Line in Python

```text
https://cmdlinetips.com/2011/08/three-ways-to-read-a-text-file-line-by-line-in-python/

Opening a file and reading the content of a file is pretty easy in Python. One easy way to read a text file and parse each line is to use the python statement “readlines” on a file object.
readlines(): Read all lines in a file at once
There are at least two ways read all lines in a file. First, we can use readlines function. Python’s readlines function reads everything in the text file and has them in a list of lines. Here is how to use Python’s readlines after the opening file.
	# Open the file with read only permit
f = open('my_text_file.txt', "r")
# use readlines to read all lines in the file
# The variable "lines" is a list containing all lines in the file
lines = f.readlines()
# close the file after reading the lines.
f.close()
Another way to read lines at once is to simply use

	# read all lines at once
lines = list(f)
Note that the last character of each line is newline character.
Then you can go over the list of “lines” to parse each line. As you can immediately notice, “readlines” or “list(f) works great for a small text file. However, it is not memory efficient to use if your text files are really big. A better way to read a text file that is memory-friendly is to read the file line by line, that is one line at a time.


Read a Text File Line by Line Using While Statement in Python
Here is the way to read text file one line at a time using “While” statement and python’s readline function. Since we read one line at a time with readline, we can easily handle big files without worrying about memory problems.
	# Open the file with read only permit
f = open('my_text_file.txt')
# use readline() to read the first line 
line = f.readline()
# use the read line to read further.
# If the file is not empty keep reading one line
# at a time, till the file is empty
while line:
    # in python 2+
    # print line
    # in python 3 print is a builtin function, so
    print(line)
    # use realine() to read next line
    line = f.readline()
f.close()
Another variation of reading a file with while statement and readline statement is as follows. Here the while tests for boolean and read line by line until we reach the end of file and line will be empty.
1
2
3
4
5
6
7
8
9
10
11
12	# file handle fh
fh = open('my_text_file.txt')
while True:
    # read line
    line = fh.readline()
    # in python 2, print line
    # in python 3
    print(line)
    # check if line is not empty
    if not line:
        break
fh.close()

Read a Text File Line by Line Using an Iterator in Python
One can also use an iterator to read a text file one line at time. Here is how to do it.
1
2
3
4
5
6
7	fh = open('my_text_file.txt')
for line in fh:
    # in python 2
    # print line
    # in python 3
    print(line)
fh.close()
Remembering to close the file handler (“fh”) with the statement “fh.close()” can be difficult initially. One can check if a file handler is closed with
1
2
3
4	# check if the file file handler is closed or not
>fh.closed
# true if the file handler is closed 
True

	    17.3.3

	17.4
```
