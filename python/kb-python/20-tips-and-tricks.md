---
type: reference
title: Tips and Tricks
description: "Legacy Python KB section: Tips and Tricks (Print with colors, bold etc, Print with colors, bold etc, My example)"
tags: [tips, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#20"
---

# Tips and Tricks

[↑ KB_python](/python/kb-python/README.md)

## 20.1 Running in background instead of swapning thread

```text
	There is an issue with running os.system inside a thread so on linux systems add "&" to os.system call (e.g. os.system("ls&") to run in bg.
			in windows add "start", e.g. os.system("start calc")
			example:
>>> if os.name == 'nt':
...     os.system("start calc")
```

## 20.2 Printing without newline (print 'a',) prints a space, how to remove?

```text
 33 down vote favorite
4
	

I have this code:

>>> for i in xrange(20):
...     print 'a',
... 
a a a a a a a a a a a a a a a a a a a a

I want to output 'a', without ' ' like this:

aaaaaaaaaaaaaaaaaaaa

Is it possible?



I'm surprised that no-one's yet mentioned "".join("a" for i in xrange(20)). (It's much more flexible than just doing "a" * 20, as I assume it's a simplfied example). 


There are a number of ways of achieving your result. If you're just wanting a solution for your case, use string multiplication as @Ant mentions. This is only going to work if each of your print statements prints the same string. Note that it works for multiplication of any length string (e.g. 'foo' * 20 works).

>>> print 'a' * 20
aaaaaaaaaaaaaaaaaaaa

If you want to do this in general, build up a string and then print it once. This will consume a bit of memory for the string, but only make a single call to print. Note that string concatenation using += is now linear in the size of the string you're concatenating so this will be fast.

>>> for i in xrange(20):
...     s += 'a'
... 
>>> print s
aaaaaaaaaaaaaaaaaaaa

Or you can do it more directly using sys.stdout.write(), which print is a wrapper around. This will write only the raw string you give it, without any formatting. Note that no newline is printed even at the end of the 20 as.

>>> for i in xrange(20):
...     sys.stdout.write('a')
... 
aaaaaaaaaaaaaaaaaaaa>>> 

Python 3 changes the print statement into a print() function, which allows you to set an end parameter. You can use it in >=2.6 by importing from __future__. I'd avoid this in any serious 2.x code though, as it will be a little confusing for those who have never used 3.x. However, it should give you a taste of some of the goodness 3.x brings.

>>> from __future__ import print_function
>>> for i in xrange(20):
...     print('a', end='')
... 
aaaaaaaaaaaaaaaaaaaa>>> 
```

## 20.3 Print with colors, bold etc

## 20.3 Print with colors, bold etc

### 20.3.1 My example

```text
$ ipython
In [1]: class color:
   ...:    PURPLE = '\033[95m'
   ...:    CYAN = '\033[96m'
   ...:    DARKCYAN = '\033[36m'
   ...:    BLUE = '\033[94m'
   ...:    GREEN = '\033[92m'
   ...:    YELLOW = '\033[93m'
   ...:    RED = '\033[91m'
   ...:    BOLD = '\033[1m'
   ...:    UNDERLINE = '\033[4m'
   ...:    END = '\033[0m'
   ...: 

In [2]: print(color.BOLD+'aaa'+color.END)
aaa

In [3]: print(color.PURPLE+'aaa'+color.END)
aaa

In [4]: print(color.DARKCYAN+'aaa'+color.END)
aaa

In [5]: print(color.UNDERLINE+color.BOLD+color.PURPLE+'aaa'+color.END)
aaa

Just run to see it take effect

	        20.3.2

	20.4 
```
