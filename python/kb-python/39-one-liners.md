---
type: cheatsheet
title: One-liners
description: "Legacy Python KB section: One-liners (Powerful Python One-Liners, Convert decimal to hexadecimal, Convert decimal to binary)"
tags: [one-liners, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "python/KB_python#39"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-subprocess, resource: "https://docs.python.org/3/library/subprocess.html", title: "Python docs: subprocess (run, check_output, getoutput)" }
---

# One-liners

[↑ KB_python](/python/kb-python/README.md)

## 39.1 Powerful Python One-Liners

> Updated 2026-10 to current practice.[^py3-whatsnew]

Source: <https://wiki.python.org/moin/Powerful%20Python%20One-Liners>. All examples below are Python 3 (`print()` is a function, `xrange` is now `range`, and `map`/`filter`/`zip` return lazy iterators, so wrap them in `list()` when you want to see the values).[^py3-whatsnew]

### 39.1.1 Want to know many bytes a terabyte is? If you know further abbreviations, you can extend the list.

```python
>>> import pprint; pprint.pprint(list(zip(('Byte', 'KByte', 'MByte', 'GByte', 'TByte'), (1 << 10*i for i in range(5)))))
[('Byte', 1),
 ('KByte', 1024),
 ('MByte', 1048576),
 ('GByte', 1073741824),
 ('TByte', 1099511627776)]
```

### 39.1.2 Convert decimal to hexadecimal

> Updated 2026-10 to current practice.[^py3-whatsnew]

```python
>>> print(f"{31:x}")
1f
>>> print(hex(31))
0x1f
```

### 39.1.3 Convert decimal to binary

> Updated 2026-10 to current practice.[^py3-whatsnew]

```python
>>> print(bin(31))
0b11111
>>> print(f"{32:b}")
100000
```

### 39.1.4 And what's the largest number that can be represented by 8 Byte?

> Updated 2026-10 to current practice.[^py3-whatsnew]

```python
>>> print('\n'.join(f"{j} Byte = {j*8} Bit = largest number: {256**j-1}" for j in (1 << i for i in range(8))))
1 Byte = 8 Bit = largest number: 255
2 Byte = 16 Bit = largest number: 65535
4 Byte = 32 Bit = largest number: 4294967295
8 Byte = 64 Bit = largest number: 18446744073709551615
16 Byte = 128 Bit = largest number: 340282366920938463463374607431768211455
32 Byte = 256 Bit = largest number: 115792089237316195423570985008687907853269984665640564039457584007913129639935
64 Byte = 512 Bit = largest number: 13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084095
128 Byte = 1024 Bit = largest number: 179769313486231590772930519078902473361797697894230657273430081157732675805500963132708477322407536021120113879871393357658789768814416622492847430639474124377767893424865485276302219601246094119453082952085005768838150682342462881473913110540827237163350510684586298239947245938479716304835356329624224137215
```

### 39.1.5 Find prime numbers

> Updated 2026-10 to current practice.[^py3-whatsnew]

One way to compute prime numbers (not the most efficient one). In Python 3 `filter()` returns an iterator, so materialise it with `list()` on each pass:

```python
>>> nums = range(2, 50)
>>> for i in range(2, 8):
...     nums = list(filter(lambda x: x == i or x % i, nums))
...
>>> print(nums)
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

How does it work? Put all numbers from 2 to 49 into `nums`, then iterate over the possible divisors 2..7. Multiples of a divisor cannot be prime, so the filter keeps an element only if it equals `i` or leaves a non-zero remainder when divided by `i` (a sieve of Eratosthenes, of sorts). Each pass keeps one divisor and removes its multiples, e.g. the first pass:

```python
>>> print(list(filter(lambda x: x == 2 or x % 2, range(2, 50))))
[2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49]
```

The next pass keeps 3 and removes 9, 15, etc. A list comprehension reads more naturally today:

```python
>>> [n for n in range(2, 50) if all(n % d for d in range(2, int(n**0.5) + 1))]
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
```

### 39.1.6 find length of each word in sentence

> Updated 2026-10 to current practice.[^py3-whatsnew]

```python
>>> print([len(w) for w in "my name is yosi izaq".split()])
[2, 4, 2, 4, 4]

# long version, with map() (returns an iterator in Python 3)
>>> words = 'It is raining cats and dogs'.split()
>>> print(words)
['It', 'is', 'raining', 'cats', 'and', 'dogs']
>>> print(list(map(len, words)))
[2, 2, 7, 4, 3, 4]
```

### 39.1.7 Get list of mounts

> Updated 2026-10 to current practice.[^py-subprocess]

The original example used `commands.getoutput()`; the `commands` module does not exist in Python 3. Use `subprocess`: `subprocess.run(..., capture_output=True, text=True, check=True)` (3.7+) or `subprocess.check_output(..., text=True)`. `subprocess.getoutput()` still exists as a drop-in for the old function, but it runs through the shell and ignores the exit status, so prefer `run()` with an argument list.[^py-subprocess]

```python
>>> import subprocess
>>> out = subprocess.run(["mount"], capture_output=True, text=True, check=True).stdout
>>> points = [line.split()[2] for line in out.splitlines()]   # naive: 3rd field
```

My example on Mac: the naive "third field" approach breaks, because some lines have more words before ` on ` (`map auto_home on /home ...`) and mount points can contain spaces (`/Volumes/My Passport`). Splitting on the ` on ` separator and the trailing options works on both macOS (`/dev/disk1 on / (apfs, ...)`) and Linux (`/dev/sda1 on / type ext4 (rw,...)`) output:

```python
>>> import re, subprocess
>>> pat = re.compile(r".+? on (.+?) (?:type \S+ )?\(")
>>> out = subprocess.run(["mount"], capture_output=True, text=True, check=True).stdout
>>> [m.group(1) for line in out.splitlines() if (m := pat.match(line))]
['/', '/dev', '/System/Volumes/VM', '/System/Volumes/Preboot', ...]
```

On Linux you can skip parsing `mount` entirely: read `/proc/self/mounts` (field 2 is the mount point, spaces encoded as `\040`) or use `findmnt -rn -o TARGET`.

As a general rule when parsing command output: split the output into lines on the command line, then do the rest in readable steps (or a small function); a list comprehension is usually clearer than `map(lambda ...)`.

### 39.1.8 Decode a base64 encoded file

```text
import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))
```

### 39.1.9 Editing a list of files in place

> Updated 2026-10 to current practice.[^py3-whatsnew]

```python
# print all files, per directory
>>> import os
>>> for _dirpath, _dirnames, filenames in os.walk('.'):
...     print(filenames)
```

What this one-liner does is replace the substring "at" by "op" on all lines of the regular files in the current directory (in place). It came from a response to an article that said it couldn't be done as a one-liner in Python. With `fileinput.input(..., inplace=True)`, whatever you write to stdout replaces the file's contents.

Caution: don't run this on your home directory or you're going to get all your text files edited.

```bash
python3 -c "import sys,os,re,fileinput; a=[f for f in os.listdir('.') if os.path.isfile(f)]; [sys.stdout.write(re.sub('at','op',l)) for l in fileinput.input(a, inplace=True)]"
```

### 39.1.10 Reimplementing cut

```text
Print every line from an input file but remove the first two fields.  
python -c "import sys;[sys.stdout.write(' '.join(line.split(' ')[2:])) for line in sys.stdin]" < input.txt
```

### 39.1.11 Set of all subsets

> Updated 2026-10 to current practice.[^py3-whatsnew]

Function that returns the set of all subsets of its argument:

```python
f = lambda x: [[y for j, y in enumerate(set(x)) if (i >> j) & 1] for i in range(2**len(set(x)))]
```

Breakdown:

- `for i in range(2**len(set(x)))` runs 0 .. 2^n - 1 (the number of sets in the power set).
- `[y for j, y in enumerate(set(x)) if (i >> j) & 1]` adds an element to the subset if the bit corresponding to its position `j` is 1 in the current `i`.

```python
>>> f([10, 9, 1, 10, 9, 1, 1, 1, 10, 9, 7])
[[], [9], [10], [9, 10], [1], [9, 1], [10, 1], [9, 10, 1], [7], [9, 7], [10, 7], [9, 10, 7], [1, 7], [9, 1, 7], [10, 1, 7], [9, 10, 1, 7]]
```

(Element order follows `set` iteration order, which is an implementation detail; the output above is from CPython 3 and differs from the original Python 2 run.)

Alternately (shorter, more functional version) - `reduce` lives in `functools` in Python 3:

```python
from functools import reduce
f = lambda l: reduce(lambda z, x: z + [y + [x] for y in z], l, [[]])
```

Or use the `itertools` "powerset" recipe:

```python
from itertools import chain, combinations
powerset = lambda s: list(chain.from_iterable(combinations(s, r) for r in range(len(s) + 1)))
```

### 39.1.12 Apply regular expression to lines from stdin

```text
$ cat sample.log | python3 -c "import sys,re;[sys.stdout.write(re.sub('PATTERN', 'SUBSTITUTION', line)) for line in sys.stdin]"
Radius,DEBUG,Received data from 192.0.2.10:58317 : ..F5_PROBE..
$ cat sample.log | python3 -c "import sys,re;[sys.stdout.write(re.sub('PROBE', 'YOSI', line)) for line in sys.stdin]"
Radius,DEBUG,Received data from 192.0.2.10:58317 : ..F5_YOSI..
```

(Sample log line simplified in 2026-10; the original was a full RADIUS debug hex dump from a real system.)

### 39.1.13 More one-liners

> Updated 2026-10 to current practice.[^py3-whatsnew]

```bash
# Modify lines from stdin (increment the 2nd column)
python3 -c "import sys; [print(x.split()[0], int(x.split()[1]) + 1, sep='\t') for x in sys.stdin]"

# List all users on Unix-like systems
python3 -c "print('\n'.join(line.split(':', 1)[0] for line in open('/etc/passwd') if not line.startswith('#')))"

# CSV file to JSON
python3 -c "import csv,json; print(json.dumps(list(csv.reader(open('csv_file.csv')))))"

# Compress (minify) a CSS file
python3 -c 'import re,sys; print(re.sub(r"\s*([{};,:])\s*", r"\1", re.sub(r"/\*.*?\*/", "", re.sub(r"\s+", " ", sys.stdin.read()))))'

# Decode a string written in hex
python3 -c "print(bytes.fromhex('474e552773204e6f7420556e6978').decode())"

# Retrieve the body text from raw HTTP data
python3 -c "import sys; print(sys.stdin.read().replace('\r','').split('\n\n',2)[1])"

# Print a file extension
python3 -c "import pathlib; print(pathlib.Path('~/python/one-liners.py').suffix)"

# Escape stdin into a "URL safe" string (urllib.quote_plus moved to urllib.parse)
python3 -c "import sys, urllib.parse; print(urllib.parse.quote_plus(sys.stdin.read()))"

# Reverse lines in stdin
python3 -c "import sys; print('\n'.join(reversed(sys.stdin.read().split('\n'))))"

# Print the top 10 lines of stdin
python3 -c "import sys; sys.stdout.write(''.join(sys.stdin.readlines()[:10]))" < /path/to/your/file
```

[^py3-whatsnew]: What's New In Python 3.0
[^py-subprocess]: Python docs: subprocess (run, check_output, getoutput)
