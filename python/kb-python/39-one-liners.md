---
type: cheatsheet
title: One-liners
description: Section 39 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#39"
---

# One-liners

[↑ KB_python](/python/kb-python/README.md)

## 39.1 Powerful Python One-Liners

```text
https://wiki.python.org/moin/Powerful%20Python%20One-Liners

		39.1.1 Want to know many bytes a terabyte is? If you know further abbreviations, you can extend the list.
import pprint;pprint.pprint(zip(('Byte', 'KByte', 'MByte', 'GByte', 'TByte'), (1 << 10*i for i in xrange(5))))
[('Byte', 1),
 ('KByte', 1024),
 ('MByte', 1048576),
 ('GByte', 1073741824),
 ('TByte', 1099511627776)]
```

### 39.1.2 Convert decimal to hexadecimal

```text
>>> print "%x"%31
1f
>>> print (hex(31))
0x1f
```

### 39.1.3 Convert decimal to binary

```text
>>> print bin(31)
0b11111
>>> print bin(32)
0b100000
```

### 39.1.4 And what's the largest number that can be represented by 8 Byte?

```text
>>> print '\n'.join("%i Byte = %i Bit = largest number: %i" % (j, j*8, 256**j-1) for j in (1 << i for i in xrange(8)))
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

```text
The following example is one way to compute prime numbers in Python (not the most efficient one, though):

>>> nums = range(2, 50) 
>>> for i in range(2, 8): 
...     nums = filter(lambda x: x == i or x % i, nums)
... 
>>> print nums
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
How does it work? First, we put all numbers from 2 to 49 into a list called "nums". Then we have a "for" loop that iterates over all possible divisors, i.e. the value of "i" goes from 2 to 7. Naturally, all numbers that are multiples of those divisors cannot be prime numbers, so we use a filter function to remove them from the list. (This algorithm is called "the sieve of Eratosthenes".)

In the above case, the filter function simply says: "Leave the element in the list if it is equal to i, or if it leaves a non-zero remainder when divided by i. Otherwise remove it from the list." After the filtering loop finishes, only prime numbers are left, of course. I am not aware of a language in which you can do the same thing with built-in features as compact and as readable as in Python (except for functional programming languages).

each iteration leaves one divisor and removes all numbers that divide by it. ex. 1st pass sim:
>>> nums = range(2, 50)
>>> print nums
[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
>>> num2 = filter( lambda x: x==2 or x%2, nums)
>>> print num2
[2, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49]

next pass would leave 3 and remove 9,15 etc 
```

### 39.1.6 find length of each word in sentence

```text
>>> print map(lambda x: len(x) , "my name is yosi izaq".split() ) 
[2, 4, 2, 4, 4]

long version
>>> sentence = 'It is raining cats and dogs'
>>> words = sentence.split()
>>> print words
['It', 'is', 'raining', 'cats', 'and', 'dogs']
>>> 
>>> lengths = map(lambda word: len(word), words)
>>> print lengths
[2, 2, 7, 4, 3, 4]
```

### 39.1.7 Get list of mounts

```text
Here's an example from the UNIX scripting world: We want to find all mount points in our file system. To do that, we execute the external "mount" command and parse the output.

>>> import commands
>>> 
>>> mount = commands.getoutput('mount -v')
>>> lines = mount.splitlines()
>>> points = map(lambda line: line.split()[2], lines)
>>> 
>>> print points
['/', '/var', '/usr', '/usr/local', '/tmp', '/proc']
The getoutput function from the commands module (which is part of the Python standard library) runs the given command and returns its output as a single string. Therefore, we split it up into separate lines first. Finally we use "map" with a lambda function that splits each line (on whitespace, which is the default) and returns just the third element of the result, which is the mountpoint.

Again, we could write all of that in one single statement, which increases compactness but reduces readability:

print map(lambda x: x.split()[2], commands.getoutput('mount -v').splitlines())
['/', '/var', '/usr', '/usr/local', '/tmp', '/proc']
When writing "real-world" scripts, it is recommended to split up complex statements so that it is easier to see what it does. Also, it is easier to make changes.

However, the task of splitting up the output of a command into a list of lines is very common. You need it all the time when parsing the output of external commands. Therefore, it is common practice to include the split operation on the getoutput line, but do the rest separately. This is a good trade-off between compactness and readability:

>>> lines = commands.getoutput('mount -v').splitlines()
>>> 
>>> points = map(lambda line: line.split()[2], lines)
>>> print points
['/', '/var', '/usr', '/usr/local', '/tmp', '/proc']
An even better idea is probably to write a small function for that task, which encapsulates the job of running the command and splitting the output.

On a related note, you can also use so-called list comprehensions to construct lists from other lists. Sometimes this is preferable because of efficiency or readability. The previous example could very well be rewritten using a list comprehension:

>>> lines = commands.getoutput('mount -v').splitlines()
>>> 
>>> points = [line.split()[2] for line in lines]
>>> print points
['/', '/var', '/usr', '/usr/local', '/tmp', '/proc']
In many cases, you can use list comprehensions instead of map() or filter(). It depends on the situation which one should be preferred.

Note: The commands module is deprecated in newer versions of Python (though it still works in all 2.x versions). Instead, the subprocess module should be used which is available since Python 2.4. The commands.getoutput() function can be replaced by subprocess.check_output(). Please refer to the documentation for details.
------------------------------------------------------------------------------------------------------------------------
My example on MAC:
>>> commands.getoutput('mount -v').splitlines()
['/dev/disk1 on / (hfs, local, journaled)', 'devfs on /dev (devfs, local, nobrowse)', 'map -hosts on /net (autofs, nosuid, automounted, nobrowse)', 'map auto_home on /home (autofs, automounted, nobrowse)', 'localhost:/yEoLxzuyz2wXPaBjb-5qyL on /Volumes/MobileBackups (mtmfs, nosuid, read-only, nobrowse)', '/dev/disk2s2 on /Volumes/My Passport (hfs, local, nodev, nosuid, journaled)']
>>> print map(lambda x: x.split()[2], commands.getoutput('mount -v').splitlines())
['/', '/dev', 'on', 'on', '/Volumes/MobileBackups', '/Volumes/My']

Note it doesnt work perfectly since some mounts are 4th element. 
my fix, filter out not starting with /
>>> print map(lambda x: filter(lambda w: w[0] == '/' , x.split()) , commands.getoutput('mount -v').splitlines())
[['/dev/disk1', '/'], ['/dev'], ['/net'], ['/home'], ['/Volumes/MobileBackups'], ['/dev/disk2s2', '/Volumes/My']]

------------------------------------------------------------------------------------------------------------------------
```

### 39.1.8 Decode a base64 encoded file

```text
import base64, sys; base64.decode(open(sys.argv[1], "rb"), open(sys.argv[2], "wb"))
```

### 39.1.9 Editing a list of files in place

```text
- print all files
>>> for i in os.walk('.'):
...     print i[2]

-
I came up with this one-liner in response to an article that said it couldn't be done as an one-liner in Python.

What this does is replace the substring "at" by "op" on all lines of all files (in place) under the path specified (here, the current path).

Caution: Don't run this on your home directory or you're going to get all your text files edited.

Toggle line numbers
   1 import sys,os,re,fileinput;a=[i[2] for i in os.walk('.') if i[2]] [0];[sys.stdout.write(re.sub('at','op',j)) for j in fileinput.input(a,inplace=1)]
Clearer is: import os.path; a=[f for f in os.listdir('.') if not os.path.isdir(f)]
```

### 39.1.10 Reimplementing cut

```text
Print every line from an input file but remove the first two fields.  
python -c "import sys;[sys.stdout.write(' '.join(line.split(' ')[2:])) for line in sys.stdin]" < input.txt
```

### 39.1.11 Set of all subsets

```text
Function that returns the set of all subsets of its argument

f = lambda x: [[y for j, y in enumerate(set(x)) if (i >> j) & 1] for i in range(2**len(set(x)))]

breakdown:
- for i in range(2**len(set(x))) , run 0  - 2^len(set) -1 (number of sets in power set)
-  [y for j, y in enumerate(set(x)) if (i >> j) & 1]  , add element to set if the bit corresponding to its place (j) is 1 in current i
- 

>>>

>>>f([10,9,1,10,9,1,1,1,10,9,7])
[[], [9], [10], [9, 10], [7], [9, 7], [10, 7], [9, 10, 7], [1], [9, 1], [10, 1], [9, 10, 1], [7, 1], [9, 7, 1], [10, 7, 1], [9, 10, 7, 1]]
-RJW

Alternately (shorter, more functional version):


f = lambda l: reduce(lambda z, x: z + [y + [x] for y in z], l, [[]])
```

### 39.1.12 Apply regular expression to lines from stdin

```text
$ cat ~/stam    | python -c "import sys,re;[sys.stdout.write(re.sub('PATTERN', 'SUBSTITUTION', line)) for line in sys.stdin]"
Radius,2015-12-07 12:01:14,793,DEBUG,0x7f13f2777700,cntx=0012382022,Received data from 192.0.2.10:58317 : 
0000: 01 5f 00 5f 61 be 76 b7  d5 f8 29 e4 e1 7e 91 f9  ._._a.v...)..~.. 
0010: 98 bd 53 37 01 0a 46 35  5f 50 52 4f 42 45 02 22  ..S7..F5_PROBE." 
0020: f4 68 26 89 09 5b af d8  17 8f 97 29 11 8e 7a cd  .h&..[.....)..z. 
0030: 0c 69 cf 20 a8 37 d5 b9  4f 0f 8b a6 03 dd 1e 9e  .i. .7..O....... 
0040: 20 1f xx xx xx xx xx xx  xx xx xx xx xx xx xx xx   .<host>. 
0050: xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx     <host> ,RADIUSHandler.cpp:371
$ cat ~/stam    | python -c "import sys,re;[sys.stdout.write(re.sub('PROBE', 'YOSI', line)) for line in sys.stdin]"
Radius,2015-12-07 12:01:14,793,DEBUG,0x7f13f2777700,cntx=0012382022,Received data from 192.0.2.10:58317 : 
0000: 01 5f 00 5f 61 be 76 b7  d5 f8 29 e4 e1 7e 91 f9  ._._a.v...)..~.. 
0010: 98 bd 53 37 01 0a 46 35  5f 50 52 4f 42 45 02 22  ..S7..F5_YOSI." 
0020: f4 68 26 89 09 5b af d8  17 8f 97 29 11 8e 7a cd  .h&..[.....)..z. 
0030: 0c 69 cf 20 a8 37 d5 b9  4f 0f 8b a6 03 dd 1e 9e  .i. .7..O....... 
0040: 20 1f xx xx xx xx xx xx  xx xx xx xx xx xx xx xx   .<host>. 
0050: xx xx xx xx xx xx xx xx  xx xx xx xx xx xx xx     <host> ,RADIUSHandler.cpp:371
```

### 39.1.13 More one-liners

```text
Modify lines from stdin using map


python -c "import sys; tmp = lambda x: sys.stdout.write(x.split()[0]+'\t'+str(int(x.split()[1])+1)+'\n'); map(tmp, sys.stdin);"
Display List of all users on Unix-like systems


print '\n'.join(line.split(":",1)[0] for line in open("/etc/passwd"))
CSV file to json


python -c "import csv,json;print json.dumps(list(csv.reader(open('csv_file.csv'))))"
Compress CSS file


python -c 'import re,sys;print re.sub("\s*([{};,:])\s*", "\\1", re.sub("/\*.*?\*/", "", re.sub("\s+", " ", sys.stdin.read())))'
Decode string written in Hex


python -c "print ''.join(chr(int(''.join(i), 16)) for i in zip(*[iter('474e552773204e6f7420556e6978')]*2))"
Retrieve content text from HTTP data


python -c "import sys; print sys.stdin.read().replace('\r','').split('\n\n',2)[1]";
Prints file extension


print '~/python/one-liners.py'.split('.')[-1]
Escapes content from stdin

This can be used to convert a string into a "url safe" string


python -c "import urllib, sys ; print urllib.quote_plus(sys.stdin.read())";
Reverse lines in stdin


python -c "import sys; print '\n'.join(reversed(sys.stdin.read().split('\n')))"
Print top 10 lines of stdin


python -c "import sys; sys.stdout.write(''.join(sys.stdin.readlines()[:10]))" < /path/to/your/file

		39.1.14
	39.2
```
