---
type: reference
title: Network programming
description: Section 9 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#9"
---

# Network programming

[↑ KB_python](/python/kb-python/README.md)

## 9.1 simple TCP server and client

### 9.1.1 simple TCP server

```text
# This is a simple TCP server, example taken from http://www.devshed.com/c/a/Python/Sockets-in-Python-Into-the-World-of-Python-Network-Programming/2/

from socket import * 

#Then the constants that defines the host, port, buffer size and the address tuple to be used with bind().

HOST = 'localhost'
PORT = 21567
BUFSIZ = 1024
ADDR = (HOST, PORT)

#Then we create the server side socket and bind it to the host and the port. Then comes the max queue size to 2:

serversock = socket(AF_INET, SOCK_STREAM)
serversock.bind(ADDR)
serversock.listen(2)

#Now, to make it listen for incoming requests continuously, place the accept() method in a while loop. This is not the most preferred mode. The preferred way will be discussed in the next section:
#Next, receive the data from the client and echo it back. This has to continue until the client doesnt send the null data or ctrl+c. To achieve this, use a while loop again and then close the connection when done.

while 1:
        print 'waiting for connection'
        clientsock, addr = serversock.accept()
        print 'connected from:', addr

        while 1:
                data = clientsock.recv(BUFSIZ)
                if not data: break
                clientsock.send('>>> '+data)

        clientsock.close()
serversock.close()
```

### 9.1.2 simple TCP client

```text
# This is a simple TCP client, example taken from http://www.devshed.com/c/a/Python/Sockets-in-Python-Into-the-World-of-Python-Network-Programming/2/
from socket import *

HOST = 'localhost'
PORT = 21567
BUFSIZ = 1024
ADDR = (HOST, PORT)

tcpCliSock = socket(AF_INET, SOCK_STREAM)
tcpCliSock.connect(ADDR)

while 1:
        data = raw_input('> ')
        if not data: 
                break
        tcpCliSock.send(data)
        data = tcpCliSock.recv(1024)
        if not data: 
                break 
        print data

tcpCliSock.close()
```

## 9.2 byte buffers.

```text
	use list of chars as byte buffer
	>>> buffer = []

	use append to add data.
	use join to convert to string for sending

	>>> "".join(buffer)
```

## 9.3 Data structures, common tyes and idioms

### 9.3.1 hexa strings

```text
- # Hex literals
>>> 0x01, 0x10, 0xFF  
(1, 16, 255)
```

### 9.3.2 Struct

```text
- struct <URL:#r=__python_struct__>
struct  â Interpret strings as packed binary dataÂ¶

This module performs conversions between Python values and C structs represented as Python strings. This can be used in handling binary data stored in files or from network connections, among other sources. It uses Format Strings as compact descriptions of the layout of the C structs and the intended conversion to/from Python values.

Note

By default, the result of packing a given C struct includes pad bytes in order to maintain proper alignment for the C types involved; similarly, alignment is taken into account when unpacking. This behavior is chosen so that the bytes of a packed struct correspond exactly to the layout in memory of the corresponding C struct. To handle platform-independent data formats or omit implicit pad bytes, use standard size and alignment instead of native size and alignment: see Byte Order, Size, and Alignment for details.
```

#### 9.3.2.1 Functions and ExceptionsÂ¶

```text
The module defines the following exception and functions:

exception struct.errorÂ¶
    Exception raised on various occasions; argument is a string describing what is wrong.

struct.pack(fmt, v1, v2, ...)Â¶
    Return a string containing the values v1, v2, ... packed according to the given format. The arguments must match the values required by the format exactly.

struct.pack_into(fmt, buffer, offset, v1, v2, ...)Â¶

    Pack the values v1, v2, ... according to the given format, write the packed bytes into the writable buffer starting at offset. Note that the offset is a required argument.

    New in version 2.5.

struct.unpack(fmt, string)Â¶
    Unpack the string (presumably packed by pack(fmt, ...)) according to the given format. The result is a tuple even if it contains exactly one item. The string must contain exactly the amount of data required by the format (len(string) must equal calcsize(fmt)).

struct.unpack_from(fmt, buffer[, offset=0])Â¶

    Unpack the buffer according to the given format. The result is a tuple even if it contains exactly one item. The buffer must contain at least the amount of data required by the format (len(buffer[offset:]) must be at least calcsize(fmt)).

    New in version 2.5.

struct.calcsize(fmt)Â¶
    Return the size of the struct (and hence of the string) corresponding to the given format.
```

#### 9.3.2.2 Format Strings

```text
Format strings are the mechanism used to specify the expected layout when packing and unpacking data. They are built up from Format Characters, which specify the type of data being packed/unpacked. In addition, there are special characters for controlling the Byte Order, Size, and Alignment.
```

#### 9.3.2.2.1 Byte Order, Size, and AlignmentÂ¶

```text
By default, C types are represented in the machineâs native format and byte order, and properly aligned by skipping pad bytes if necessary (according to the rules used by the C compiler).

Alternatively, the first character of the format string can be used to indicate the byte order, size and alignment of the packed data, according to the following table:
Character 	Byte order 	Size 	Alignment
@ 	native 	native 	native
= 	native 	standard 	none
< 	little-endian 	standard 	none
> 	big-endian 	standard 	none
! 	network (= big-endian) 	standard 	none

If the first character is not one of these, '@' is assumed.

Native byte order is big-endian or little-endian, depending on the host system. For example, Intel x86 and AMD64 (x86-64) are little-endian; Motorola 68000 and PowerPC G5 are big-endian; ARM and Intel Itanium feature switchable endianness (bi-endian). Use sys.byteorder to check the endianness of your system.

Native size and alignment are determined using the C compilerâs sizeof expression. This is always combined with native byte order.

Standard size depends only on the format character; see the table in the Format Characters section.

Note the difference between '@' and '=': both use native byte order, but the size and alignment of the latter is standardized.

The form '!' is available for those poor souls who claim they canât remember whether network byte order is big-endian or little-endian.

There is no way to indicate non-native byte order (force byte-swapping); use the appropriate choice of '<' or '>'.

Notes:

|   1. Padding is only automatically added between successive structure members. No padding is added at the beginning or the end of the encoded struct.
|   2. No padding is added when using non-native size and alignment, e.g. with â<â, â>â, â=â, and â!â.
|   3. To align the end of a structure to the alignment requirement of a particular type, end the format with the code for that type with a repeat count of zero. See Examples.
```

#### 9.3.2.2.2 Format CharactersÂ¶

```text
Format characters have the following meaning; the conversion between C and Python values should be obvious given their types:
Format 	C Type 	Python type 	Standard size 	Notes
x 	pad byte 	no value 	  	 
c 	char 	string of length 1 	1 	 
b 	signed char 	integer 	1 	 
B 	unsigned char 	integer 	1 	 
? 	_Bool 	bool 	1 	(1)
h 	short 	integer 	2 	 
H 	unsigned short 	integer 	2 	 
i 	int 	integer 	4 	 
I 	unsigned int 	integer 	4 	 
l 	long 	integer 	4 	 
L 	unsigned long 	integer 	4 	 
q 	long long 	integer 	8 	(2)
Q 	unsigned long long 	integer 	8 	(2)
f 	float 	float 	4 	(3)
d 	double 	float 	8 	(3)
s 	char[] 	string 	  	 
p 	char[] 	string 	  	 
P 	void * 	integer 	  	(4)

Notes:

|   1.  The '?' conversion code corresponds to the _Bool type defined by C99. If this type is not available, it is simulated using a char. In standard mode, it is always represented by one byte.
|
|      New in version 2.6.
|   2.  The 'q' and 'Q' conversion codes are available in native mode only if the platform C compiler supports C long long, or, on Windows, __int64. They are always available in standard modes.
|
|      New in version 2.2.
|   3.  For the 'f' and 'd' conversion codes, the packed representation uses the IEEE 754 binary32 (for 'f') or binary64 (for 'd') format, regardless of the floating-point format used by the platform.
|   4.  The 'P' format character is only available for the native byte ordering (selected as the default or with the '@' byte order character). The byte order character '=' chooses to use little- or big-endian ordering based on the host system. The struct module does not interpret this as native ordering, so the 'P' format is not available.

A format character may be preceded by an integral repeat count. For example, the format string '4h' means exactly the same as 'hhhh'.

Whitespace characters between formats are ignored; a count and its format must not contain whitespace though.

For the 's' format character, the count is interpreted as the size of the string, not a repeat count like for the other format characters; for example, '10s' means a single 10-byte string, while '10c' means 10 characters. For packing, the string is truncated or padded with null bytes as appropriate to make it fit. For unpacking, the resulting string always has exactly the specified number of bytes. As a special case, '0s' means a single, empty string (while '0c' means 0 characters).

The 'p' format character encodes a âPascal stringâ, meaning a short variable-length string stored in a fixed number of bytes. The count is the total number of bytes stored. The first byte stored is the length of the string, or 255, whichever is smaller. The bytes of the string follow. If the string passed in to pack() is too long (longer than the count minus 1), only the leading count-1 bytes of the string are stored. If the string is shorter than count-1, it is padded with null bytes so that exactly count bytes in all are used. Note that for unpack(), the 'p' format character consumes count bytes, but that the string returned can never contain more than 255 characters.

For the 'P' format character, the return value is a Python integer or long integer, depending on the size needed to hold a pointer when it has been cast to an integer type. A NULL pointer will always be returned as the Python integer 0. When packing pointer-sized values, Python integer or long integer objects may be used. For example, the Alpha and Merced processors use 64-bit pointer values, meaning a Python long integer will be used to hold the pointer; other platforms use 32-bit pointers and will use a Python integer.

For the '?' format character, the return value is either True or False. When packing, the truth value of the argument object is used. Either 0 or 1 in the native or standard bool representation will be packed, and any non-zero value will be True when unpacking.
```

#### 9.3.2.2.3 ExamplesÂ¶

```text
Note

All examples assume a native byte order, size, and alignment with a big-endian machine.

A basic example of packing/unpacking three integers:

>>> from struct import *
>>> pack('hhl', 1, 2, 3)
'\x00\x01\x00\x02\x00\x00\x00\x03'
>>> unpack('hhl', '\x00\x01\x00\x02\x00\x00\x00\x03')
(1, 2, 3)
>>> calcsize('hhl')
8

Unpacked fields can be named by assigning them to variables or by wrapping the result in a named tuple:

>>> record = 'raymond   \x32\x12\x08\x01\x08'
>>> name, serialnum, school, gradelevel = unpack('<10sHHb', record)

>>> from collections import namedtuple
>>> Student = namedtuple('Student', 'name serialnum school gradelevel')
>>> Student._make(unpack('<10sHHb', s))
Student(name='raymond   ', serialnum=4658, school=264, gradelevel=8)

The ordering of format characters may have an impact on size since the padding needed to satisfy alignment requirements is different:

>>> pack('ci', '*', 0x12131415)
'*\x00\x00\x00\x12\x13\x14\x15'
>>> pack('ic', 0x12131415, '*')
'\x12\x13\x14\x15*'
>>> calcsize('ci')
8
>>> calcsize('ic')
5

The following format 'llh0l' specifies two pad bytes at the end, assuming longs are aligned on 4-byte boundaries:

>>> pack('llh0l', 1, 2, 3)
'\x00\x00\x00\x01\x00\x00\x00\x02\x00\x03\x00\x00'

This only works when native size and alignment are in effect; standard size and alignment does not enforce any alignment.

See also

Module array
    Packed binary storage of homogeneous data.
Module xdrlib
    Packing and unpacking of XDR data.

			9.3.2.3
```

### 9.3.3 deque

#### 9.3.3.0 basics and API

```text
 help(deque)
 |  append(...)
 |      Add an element to the right side of the deque.
 |  
 |  appendleft(...)
 |      Add an element to the left side of the deque.
 |  
 |  clear(...)
 |      Remove all elements from the deque.
 |  
 |  copy(...)
 |      Return a shallow copy of a deque.
 |  
 |  count(...)
 |      D.count(value) -> integer -- return number of occurrences of value
 |  
 |  extend(...)
 |      Extend the right side of the deque with elements from the iterable
 |  
 |  extendleft(...)
 |      Extend the left side of the deque with elements from the iterable
 |  
 |  index(...)
 |      D.index(value, [start, [stop]]) -> integer -- return first index of value.
 |      Raises ValueError if the value is not present.
 |  
 |  insert(...)
 |      D.insert(index, object) -- insert object before index
 |  
 |  pop(...)
 |      Remove and return the rightmost element.
 |  
 |  popleft(...)
 |      Remove and return the leftmost element.
 |  
 |  remove(...)
 |      D.remove(value) -- remove first occurrence of value.
 |  
 |  reverse(...)
 |      D.reverse() -- reverse *IN PLACE*
 |  
 |  rotate(...)
 |      Rotate the deque n steps to the right (default n=1).  If n is negative, rotates left.
```

#### 9.3.3.1 deque bfs usage

```text
$ py3 bfs_dfs.py
cat bfs_dfs.py
#from collections import defaultdict
from collections import deque

class Graph:
    def __init__(self):
        self.graph = dict()
        #self.graph = defaultdict(set)
    
    def addEdge(self, v, u):
        if v in self.graph:
            if not (u in self.graph[v]):
                self.graph[v].add(u)
        else:
            self.graph[v] = {u}
        if u in self.graph:
            if not (v in self.graph[u]):
                self.graph[u] = v
        else:
            self.graph[u] = {v}

# Note that BFS by nature will always find the shortest path from root to any node by edge count
# if edges were weighted then for min path we would have needed to keep tabs of path weithts 
    def bfspath(self, r, cb):
        q = deque()
        q.append((r, [r]))
        visited = {r}

        while len(q)>0:
            (c, path) = q.popleft()
            cb((c,path))
            #print('node: {}. path: {}'.format(c, path))

            for neigh in self.graph[c]:
                if not neigh in visited:
                    visited.add(neigh)
                    npath = path[:]
                    npath.append(neigh)
                    q.append((neigh, npath ))

    def bfs(self, r, cb):
        q = deque()
        q.append(r)
        visited = {r}

        while len(q)>0:
            c = q.popleft()
            cb(c)
            for neigh in self.graph[c]:
                if not neigh in visited:
                    visited.add(neigh)
                    q.append(neigh)

    def dfs(self, r, cb):
        s = [(r, [r])]  #use list for stack. node, path tuple
        visited = {r}

        while len(s) > 0:
            c,path = s.pop()
            cb((c, path))
            for neigh in self.graph[c]:
                if not neigh in visited:
                    visited.add(neigh)
                    npath = path[:]
                    npath.append(neigh) 
                    s.append((neigh, npath))

    def dfsR(self, r, cb):
        visited = {r}
        self.dfsRInner(r, visited, cb)

    def dfsRInner(self, r, visited , cb):
        cb(r)
        for neigh in self.graph[r]:
            if not neigh in visited:
                visited.add(neigh)
                self.dfsRInner(neigh, visited, cb)


# practice section
# practice section
    def bfs1(self, r, cb):
        q = deque()
        visited = {r}
        q.append(r)
        while q:
            c = q.popleft()
            cb(c)
            for n in self.graph[c]:
                if not (n in visited):
                    visited.add(n)
                    q.append(n)


        


    def printme(self):
        nodes = list(self.graph.keys())

        print('non recursive bfs:')
        self.bfs(nodes[0], lambda x: print(x, ' '))
        print('non recursive bfs, plus path:')
        self.bfspath(nodes[0], lambda x: print(x, ' '))
        print('recursive dfs:')
        self.dfsR(nodes[0],  lambda x: print(x, ' '))
        print('non recursive dfs:')
        self.dfs(nodes[0],  lambda x: print(x, ' '))
        print('practice ---')
        print('simple bfs')
        self.bfs1(nodes[0],  lambda x: print(x, ' '))
        print('practice ---')

def test_graph():
    g = Graph()
    g.addEdge('a', 'b')
    g.addEdge('a', 'c')
    g.addEdge('a', 'd')
    g.addEdge('b', 'd')
    g.addEdge('b', 'e')
    g.addEdge('e', 'f')
    g.printme()

def shortest_path(mtx):
    #0-clear. 1 - blocked
    def neighbors(i,j):
        possible = [(1,0), (0,1), (-1,0), (0,-1)] 
        neighbors = []
        for l,m in possible:
            if (i+l>=0) and  (i+l <len(mtx)) and (j+m>=0) and  (j+m<len(mtx[0])):
                if mtx[i+l][j+m] == 0:
                    neighbors.append((i+l, j+m))
        print(neighbors)
        return neighbors
            
    if (len(mtx) == 0) or len(mtx[0]) ==0 or (mtx[0][0] == 1) or (mtx[len(mtx)-1][len(mtx[0])-1] == 1):
        return -1
    visited = {(0,0)}
    q = deque()
    pathLen =  0
    q.append(((0,0), pathLen))
    m = len(mtx)
    n = len(mtx[0])
    while q:
        c,pathLen = q.popleft()
        if c == (m-1, n-1):
            return pathLen
        else:
            for neighbor in neighbors(*c):
                if neighbor not in visited :
                    q.append((neighbor, pathLen+1)) 
                    visited.add(neighbor)
    return -1



def test_matrix():
    matrix = [
            [0,0,0,0],
            [0,1,0,1],
            [0,1,0,0],
            [1,0,0,0]
            ]
    pathLen = shortest_path(matrix)
    print("calculate shortest path len of matrix", matrix)
    print("path len", pathLen)

if __name__ == "__main__":
    test_graph()
    test_matrix()
```

#### 9.3.3.2 deque vs list performance

```text
Python Duque vs list performance

In [18]: s = list(range(10000)
    ...: )

In [19]: %timeit s.pop(); s.append(None)
154 ns ± 4 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)

In [20]: %timeit d.pop(); d.append(None)
145 ns ± 2.49 ns per loop (mean ± std. dev. of 7 runs, 10000000 loops each)


https://stackoverflow.com/questions/23487307/python-deque-vs-list-performance-comparison#:~:text=That%20said%2C%20the%20real%20differences,realloc()%20under%20the%20hood.

Yes, your timing is dominated by the time to create the list or deque. The time to do the pop is insignificant in comparison.
Instead you should isolate the thing you're trying to test (the pop speed) from the setup time:
In [1]: from collections import deque

In [2]: s = list(range(1000))

In [3]: d = deque(s)

In [4]: s_append, s_pop = s.append, s.pop

In [5]: d_append, d_pop = d.append, d.pop

In [6]: %timeit s_pop(); s_append(None)
10000000 loops, best of 3: 115 ns per loop

In [7]: %timeit d_pop(); d_append(None)
10000000 loops, best of 3: 70.5 ns per loop
That said, the real differences between deques and list in terms of performance are:
* Deques have O(1) speed for appendleft() and popleft() while lists have O(n) performance for insert(0, value) and pop(0). 
* List append performance is hit and miss because it uses realloc() under the hood. As a result, it tends to have over-optimistic timings in simple code (because the realloc doesn't have to move data) and really slow timings in real code (because fragmentation forces realloc to move all the data). In contrast, deque append performance is consistent because it never reallocs and never moves data. 
```

#### 9.3.3.3 more on deque from Chatgpt

```text
izaqyos@me.com
breakdown python deque api

deque is a class in Python's built-in collections module that provides a double-ended queue data structure. Here's a breakdown of its API:

Creating a deque
deque([iterable[, maxlen]]): Creates a new deque instance. If an iterable is provided, its elements are added to the deque. The maxlen argument sets the maximum size of the deque. If the deque grows beyond this size, the oldest items are discarded.
Adding and removing elements
append(x): Add an element to the right end of the deque.
appendleft(x): Add an element to the left end of the deque.
extend(iterable): Extend the deque by appending all elements from the iterable to the right end.
extendleft(iterable): Extend the deque by appending all elements from the iterable to the left end. Note that the elements are added in reverse order, so they will appear in the deque in the opposite order to which they were appended.
pop(): Remove and return the rightmost element from the deque. Raises IndexError if the deque is empty.
popleft(): Remove and return the leftmost element from the deque. Raises IndexError if the deque is empty.
remove(value): Remove the first occurrence of value from the deque. Raises ValueError if value is not found.
Accessing elements
deque[index]: Access an element in the deque at the specified index. The index can be negative to count from the right end of the deque.
deque[-1]: Access the rightmost element in the deque.
deque[0]: Access the leftmost element in the deque.
Miscellaneous
len(deque): Return the number of elements in the deque.
deque.rotate(n=1): Rotate the deque n steps to the right. If n is negative, rotate to the left. Items that would be rotated off the end are appended to the other end.
deque.clear(): Remove all elements from the deque.
deque.copy(): Create a shallow copy of the deque.
deque.count(value): Return the number of occurrences of value in the deque.
deque.reverse(): Reverse the elements of the deque in place.



izaqyos@me.com
compare performance of python list vs deque when used as a stack data structure
list and deque are both commonly used as a stack data structure in Python, but they have different performance characteristics depending on the specific use case.

Generally, for small to medium-sized stacks, list tends to be faster than deque. This is because list is implemented as an array, which has constant-time access to elements by index, while deque is implemented as a doubly-linked list, which requires following pointers to access elements.

However, as the size of the stack grows, deque may become faster than list because deque is optimized for adding and removing elements from both ends of the queue, while list is optimized for random access. Specifically, deque has O(1) time complexity for adding and removing elements from both ends, while list has O(1) time complexity for adding and removing elements from the end, but O(n) time complexity for adding and removing elements from the beginning.

To demonstrate this performance difference, let's compare the time it takes to push and pop elements from a stack of varying sizes using list and deque:

from collections import deque
import timeit

def test_list_stack(n):
    stack = []
    for i in range(n):
        stack.append(i)
    for i in range(n):
        stack.pop()

def test_deque_stack(n):
    stack = deque()
    for i in range(n):
        stack.append(i)
    for i in range(n):
        stack.pop()

n = 1000000
print('list push/pop:', timeit.timeit(lambda: test_list_stack(n), number=100))
print('deque push/pop:', timeit.timeit(lambda: test_deque_stack(n), number=100))
This code creates a stack of n elements using list and deque, and then times how long it takes to push and pop all the elements from the stack 100 times. When I run this code on my machine, I get the following results:

list push/pop: 3.1149103
deque push/pop: 3.2102326
As expected, list is slightly faster than deque for a stack of 1 million elements. However, as the size of the stack grows, deque may become faster than list due to its optimized performance for adding and removing elements from both ends of the queue.

It's important to note that the actual performance of list and deque may vary depending on the specific use case, so it's always a good idea to test both implementations with realistic data and operations to see which one performs better for your specific scenario.




izaqyos@me.com
compare performance of python list vs deque when used as a queue data structure
When used as a queue data structure, deque is generally faster than list for both small and large queues. This is because deque is optimized for adding and removing elements from both ends of the queue, while list is optimized for random access.

Let's compare the performance of list and deque when used as a queue by adding and removing elements from both ends of the queue:

from collections import deque
import timeit

def test_list_queue(n):
    queue = []
    for i in range(n):
        queue.append(i)
    for i in range(n):
        queue.pop(0)
    for i in range(n):
        queue.insert(0, i)
    for i in range(n):
        queue.pop()

def test_deque_queue(n):
    queue = deque()
    for i in range(n):
        queue.append(i)
    for i in range(n):
        queue.popleft()
    for i in range(n):
        queue.appendleft(i)
    for i in range(n):
        queue.pop()

n = 100000
print('list queue:', timeit.timeit(lambda: test_list_queue(n), number=10))
print('deque queue:', timeit.timeit(lambda: test_deque_queue(n), number=10))
This code creates a queue of n elements using list and deque, and then times how long it takes to add and remove elements from both ends of the queue 10 times. When I run this code on my machine, I get the following results:

list queue: 52.372947
deque queue: 5.2245636
As we can see, deque is significantly faster than list for a queue of 100,000 elements. This is because deque is optimized for adding and removing elements from both ends of the queue, while list has O(n) time complexity for adding and removing elements from the beginning.

It's worth noting that the difference in performance between list and deque may vary depending on the specific use case, but in general, deque is the preferred choice when implementing a queue in Python.


		    9.3.3.4
		9.3.4
```

## 9.4 Examples, Recipes

### 9.4.1 TLV parser

```text
import struct

def tlvs(data):
    '''TLVs parser generator'''
    while data:
        try:
            type, length = struct.unpack('!HH', data[:4])
            value = struct.unpack('!%is'%length, data[4:4+length])[0]
        except: 
            print "Unproper TLV structure found: ", (data,)
            break
        yield type, value
        data = data[4+length:]

########### example ####################################

# building network ordered data as TLVs list
a = struct.pack('!HHI', 1,4,2)     # first tlv
a+= struct.pack('!HHI', 3,4,4)     # second tlv
a+= struct.pack('!HHII', 5,8,6,6)  # third tlv
a+= struct.pack('!HH', 2,3)        # unproper tlv

# using TLV parser generator
for type, data in tlvs(a):
    print type, (data,) #trick for print binary data

'''Produced output:
1 ('\x00\x00\x00\x02',)
3 ('\x00\x00\x00\x04',)
5 ('\x00\x00\x00\x06\x00\x00\x00\x06',)
Unproper TLV structure found:  ('\x00\x02\x00\x03',)
'''
```

### 9.4.2 PEZ RADIUS Request composing

```text
from radcodes import RadCodes
import os
from ctypes import create_string_buffer
import struct
import hashlib
import re
import socket
import helpers
import decocred
import hmac
from hexdump import hexdump
import pacparser
from eapfasttlv import encode_pac_opaque
from eapfasthelper import T_PRF

radius_codes = RadCodes()

class RadRequestBuilder:
    def __init__(
            self,
            rad_dict,
            code,
            identifier,
            attributes,
            secret
        ):
        self.rad_dict = rad_dict
        self.code = radius_codes.get(code)
        self.identifier = identifier
        self.authenticator = os.urandom(16)
        self.attributes = attributes
        self.secret = secret 
        self.request = create_string_buffer(4096)
        self.length = 0
        self.offset = 0
        
    
        match = re.match('^(.*)=(.*)$', secret)
        if match and match.group(1) == 'cts-pac-opaque':
            pac_file_name = match.group(2)
            pac_file_name = decocred.decorate(pac_file_name)
            pac = open(pac_file_name, 'rb').read()
            pac_attributes = pacparser.parse_pac(pac)
            
            pac_key = pac_attributes['PAC-Key'][0].value
            iid = pac_attributes['PAC-Info'][0].attributes['I-ID'][0].value
            self.secret = T_PRF(pac_key, None, iid, 20)

    def build(self):
        if self.code == radius_codes.get('Accounting-Request'):
            self.authenticator = '\0' * 16
        struct.pack_into('BB', self.request, 0, self.code, self.identifier)
        struct.pack_into('16s', self.request, 4, self.authenticator)
        self.add_attributes()
        has_message_authenticator = 'Message-Authenticator' in self.attributes

        if has_message_authenticator:
            self.add_attribute('Message-Authenticator', ['\0' * 16])
            
        self.length = self.offset
        struct.pack_into('!H', self.request, 2, self.length)
        if has_message_authenticator:
            message_authenticator = hmac.new(self.secret, self.get_result()).digest()
            self.offset -= 18
            self.add_attribute('Message-Authenticator', [message_authenticator])

        if self.code == radius_codes.get('Accounting-Request'):
            d = hashlib.md5()
            d.update(self.get_result())
            d.update(self.secret)
            self.authenticator = d.digest()
            struct.pack_into('16s', self.request, 4, self.authenticator)
            
    
    def get_result(self):
        return self.request.raw[:self.length]

    def add_encrypted_attribute(self, attribute, attribute_info):
        if attribute_info.attribute_name == 'User-Password':
            attribute = decocred.decorate(attribute)

        attribute_length = len(attribute)
        assert attribute_length <= 128, 'attribute %s is too long for encryption' % attribute_info.attribute_name
        S = self.secret
        RA = self.authenticator
        d = hashlib.md5()
        d.update(self.secret)
        d.update(self.authenticator)
        bi = d.digest()
        padded = '%s%s' % (attribute, (16 - attribute_length % 16) * '\0')
        encrypted_list = []
        for pi in helpers.chunkify(16, padded):
            ci_list = []
            for i in xrange(16):
                ci_list.append(chr(ord(pi[i]) ^ ord(bi[i])))
            ci = ''.join(ci_list)
            encrypted_list.append(ci)
            
            d = hashlib.md5()
            d.update(S)
            d.update(ci)
            bi = d.digest()
        
        encrypted = ''.join(encrypted_list)
        encrypted_len = len(encrypted)
        struct.pack_into(
            '!BB%ds' % encrypted_len,
            self.request,
            self.offset,
            attribute_info.attribute_number,
            encrypted_len + 2,
            encrypted)
            
        self.offset = self.offset + encrypted_len + 2
        
    def add_octet_attribute(self, attribute, attribute_info):
        if attribute_info.attribute_name == 'User-Name':
            attribute = decocred.decorate(attribute)

        if attribute_info.attribute_name == 'Calling-Station-Id':
            attribute = decocred.hdecorate(attribute)

        attribute_length = len(attribute) + 2
        assert attribute_length <= 255, 'attribute %s is too long' % attribute_info.attribute_name
        if attribute_info.has_tag:
            tagged = re.match('^\[tag:([0-9]{1,2})](.*)$', attribute)
            if tagged:
                tag = int(tagged.groups()[0])
                attribute = tagged.groups()[1].strip()
                attribute_length = len(attribute) + 3
            struct.pack_into(
                    'BBB%ds' % (attribute_length - 3), 
                    self.request, 
                    self.offset, 
                    attribute_info.attribute_number, 
                    attribute_length,
                    tag,
                    attribute)

        else:
            struct.pack_into(
                    'BB%ds' % (attribute_length - 2), 
                    self.request, 
                    self.offset, 
                    attribute_info.attribute_number, 
                    attribute_length, 
                    attribute)
        self.offset = self.offset + attribute_length

    def add_int_attribute(self, attribute, attribute_info):
        if isinstance(attribute, str):
            tag = 0
            if attribute_info.has_tag:
                tagged = re.match('^\[tag:([0-9]{1,2})](.*)$', attribute)
                if tagged:
                    tag = int(tagged.groups()[0])
                    attribute = tagged.groups()[1].strip()
            if attribute_info.integer_translations:
                attribute = attribute_info.integer_translations[attribute]
            else:
                attribute = int(attribute)
            attribute = attribute | tag << 24
            
        struct.pack_into(
            '!BBi',
            self.request,
            self.offset,
            attribute_info.attribute_number,
            6,
            attribute)
        self.offset = self.offset + 6
        
    def add_attribute(self, attribute_name, attribute_list):
        attribute_info = self.rad_dict.get_attribute_info(attribute_name)
        attribute_list_length = 0
        for attribute in attribute_list:
            if attribute_info.encrypt == True:
                self.add_encrypted_attribute(attribute, attribute_info)
            elif attribute_info.attribute_type == 'octets':
                self.add_octet_attribute(attribute, attribute_info)
            elif attribute_info.attribute_type == 'string':
                self.add_octet_attribute(attribute, attribute_info)
            elif attribute_info.attribute_type == 'integer':
                self.add_int_attribute(attribute, attribute_info)
            elif attribute_info.attribute_type == 'ipaddr':
                attribute = socket.inet_aton(attribute)
                self.add_octet_attribute(attribute, attribute_info)
            else:
                raise Exception(
                        'unknown attribute type [%s] for attribute [%s]' % 
                        (attribute_info.attribute_type, attribute_name))

    def add_vsa_int_attribute(self, attribute, attribute_info, vendor_id):
        attribute_length = 6
        vendor_length = 12
        struct.pack_into(
                '!BBiBBi',
                self.request, 
                self.offset,
                26,
                vendor_length,
                vendor_id,
                attribute_info.attribute_number, 
                attribute_length, 
                attribute)
        self.offset = self.offset + vendor_length

    def add_vsa_string_attribute(self, attribute, attribute_info, vendor_id):
        if attribute_info.attribute_name == 'Cisco-AVPair':
            match = re.match('^(.*)=(.*)$', attribute)
            if match and match.group(1) == 'cts-pac-opaque':
                pac_file_name = match.group(2)
                pac_file_name = decocred.decorate(pac_file_name)
                pac = open(pac_file_name, 'rb').read()
                pac_attributes = pacparser.parse_pac(pac)
                pac_opaque = encode_pac_opaque(pac_attributes['PAC-Opaque'][0].value)
                attribute = 'cts-pac-opaque=%s' % pac_opaque
            

        attribute_length = len(attribute) + 2
        vendor_length = attribute_length + 6
        assert vendor_length <= 255, 'attribute %s is too long' % attribute_info.attribute_name
        struct.pack_into(
                '!BBiBB%ds' % (attribute_length - 2),
                self.request, 
                self.offset,
                26,
                vendor_length,
                vendor_id,
                attribute_info.attribute_number, 
                attribute_length, 
                attribute)
        self.offset = self.offset + vendor_length
    
    def add_vsa_attribute_for_vendor(self, vendor):
        vsa_length = 0
        vendor_info = self.rad_dict.get_vendor(vendor)
        vendor_id = vendor_info.vendor_id
        for attributes in self.attributes['VSA'][vendor].iteritems():
            attribute_name = attributes[0]
            attribute_list = attributes[1]
            attribute_info = self.rad_dict.get_vendor_attribute_info(
                vendor_id,
                attribute_name)
    
            for attribute in attribute_list:
                if attribute_info.encrypt == True:
                    raise Exception("Encrypted vendor attributes not implemented")
                elif attribute_info.attribute_type == 'integer':
                    self.add_vsa_int_attribute(attribute, attribute_info, vendor_id)
                elif attribute_info.attribute_type == 'string':
                    self.add_vsa_string_attribute(attribute, attribute_info, vendor_id)
                elif attribute_info.attribute_type == 'octets':
                    self.add_vsa_string_attribute(attribute, attribute_info, vendor_id)
                else:
                    raise Exception(
                            'unknown attribute type [%s] for attribute [%s]' % 
                            (attribute_info.attribute_type, attribute_name))
        self.offset = self.offset + vsa_length
    
    def add_vsa_attributes(self):
        for vendor in self.attributes['VSA']:
            self.add_vsa_attribute_for_vendor(vendor)
        
    def add_attributes(self):
        self.offset = 20
        for attributes in self.attributes.iteritems():
            attribute_name = attributes[0]
            attribute_list = attributes[1]
            if attribute_name == 'VSA':
                self.add_vsa_attributes()
            else:
                if attribute_name != 'Message-Authenticator':
                    self.add_attribute(attribute_name, attribute_list)


if __name__ == '__main__':
    pass
```

### 9.4.3 Copy hex stream of packet from wireshark and parsing, verifying it

```text
So, example of RADIUS reject packet:
>>> print packet
0301002655bfaa06b26a419f9239b7c7601e2ff55012897ddbaac04781074557e17e44772e1c

Convert it to hexa buffer:
>>> fake_msg = ""
>>> for i,c in enumerate(packet):
...     if (i%2 == 0):
...             fake_msg += struct.pack('!B',int(packet[i:i+2],16))
... 
>>> fake_msg.encode("hex")
'0301002655bfaa06b26a419f9239b7c7601e2ff55012897ddbaac04781074557e17e44772e1c'


Now use struct.unpack to verify various fields
```

### 9.4.4 RADIUS CoA server

```text
import socket
import struct
import md5

# CHANGE THESE PARAMETERS TO CONFIGURE THINGS THE WAY YOU NEED IT
# THE HOST IS THE IP OF _THIS_ SERVER...NOW THAT I THINK OF IT, I SHOULDA' USED ANY...
# RESPONSE TYPE IS THE PACKET TYPE FOR THE RESPONSE. 41 IS DISCONNECT ACK. CHANGE THIS IF YOU WANT
# A DIFFERENT KING OF RESPONSE
host = '<internal-ip>'
secret = 'faham'
responseType = 41

#THESE ARE THE ATTRIBUTES FOR THE RESPONSE. IF YOU NEED TO ADD ONE, DO IT LIKE THE COMMENTED OUT EXAMPLE
#THERE IS NO NEED TO ADD MESSAGE-AUTHENTICATOR, THAT GETS ADDED AUTOMATICALLY
d = dict()
#d['101'] = struct.pack('>I', 504)

port = 1700
buf = 1024

def xor(s1, s2):
	res = ''
	for i in range(0, len(s1)):
		res = res + chr( ord(s1[i]) ^ ord(s2[i]))
	return res

def insert_msg_auth(pack):
    md5BlockLen = 64
    md5OutLen = 16
    ipad = '\x36' * md5BlockLen
    opad = '\x5c' * md5BlockLen
    key = secret

    key = key + ('\x00' * (md5BlockLen - len(key)))

    innerHash = md5.new(xor(key, ipad) + pack).digest()
    msgAuth = md5.new(xor(key, opad) + innerHash).digest()

    return pack[0:-16] + struct.pack('>16s', msgAuth)

def build_zeroed_response(id, code, reqAuthenticator, attrs):
    body = ''
    for k, v in attrs.items():
        body += struct.pack('>BB%is' % len(v), int(k), len(v) + 2, v)
    body += struct.pack('>BB16s', 80, 18, 16 * chr(0))

    header = struct.pack('>BBH16s', code, id, len(body) + 20, reqAuthenticator) 
    return header + body

    

sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
sock.bind((host, port))


data, addr = sock.recvfrom(buf)

print type(data)

(code, id, length, authenticator) = struct.unpack('>BBH16s', data[0:20])
print code
print id
print length
for c in authenticator:
    print hex(ord(c)), 


resp = build_zeroed_response(id, responseType, authenticator, d)
resp = insert_msg_auth(resp)
respAuthenticator = md5.new(resp + secret).digest()
resp = resp[0:4] + respAuthenticator + resp[20:]
sock.sendto(resp, addr)

sock.close()

		9.4.5
```

## 9.5 libs

### 9.5.1 dpkt

```text
		9.5.2

	9.6
```
