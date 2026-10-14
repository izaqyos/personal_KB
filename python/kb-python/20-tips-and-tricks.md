---
type: reference
title: Tips and Tricks
description: "Legacy Python KB section: Tips and Tricks (Print with colors, bold etc, Print with colors, bold etc, My example)"
tags: [tips, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-print, resource: "https://docs.python.org/3/library/functions.html#print", title: "Python 3 docs: Built-in functions — print()" }
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

> Updated 2026-10 to current practice.[^py3-whatsnew][^py-print]

This was a Python 2 question. In Python 2, `print 'a',` (a print statement with a trailing comma) suppressed the newline but added a space. Python 3 removed both the `print` statement and `xrange`. `print()` is a function, and `range()` is the lazy replacement for `xrange()`.[^py3-whatsnew] Use the `end` and `sep` keyword arguments of `print()`:[^py-print]

```python
import sys

for i in range(20):
    print('a', end='')       # no newline, no space
print()                      # finish the line
# aaaaaaaaaaaaaaaaaaaa

print('a' * 20)                          # same string repeated
print(''.join('a' for _ in range(20)))  # build once, print once (general case)
print(*['a'] * 20, sep='')               # several args, no separator

for i in range(20):
    sys.stdout.write('a')    # raw write, no formatting, no newline

print('working...', end='', flush=True)  # flush=True shows partial lines immediately
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

[^py3-whatsnew]: What's New In Python 3.0
[^py-print]: Python 3 docs: Built-in functions — print()
