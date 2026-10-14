---
type: reference
title: tutorial
description: "Legacy Python KB section: tutorial (My tutorial, basic, memory model)"
tags: [tutorial, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#4"
---

# tutorial

[↑ KB_python](/python/kb-python/README.md)

## 4.1 My tutorial

### 4.1.1 basic

```text
interpreter. python, python3
REPL, IDLE,
$python
#truncate, convert to float, floor, mod and exp:
>>> 5/4
1
>>> 5/4.0
1.25
>>> 5//4
1
>>> 5%4
1
>>> 2**3
8

#last result, _
>>> _
8
>>> _+1
9
>>> print('python supports int, float, Decimal, Fraction and complex numbers')
python supports int, float, Decimal, Fraction and complex numbers
>>> 2+5j
(2+5j)

#escaping
>>> 'quo'te literaly'
  File "<stdin>", line 1
    'quo'te literaly'
          ^
SyntaxError: invalid syntax
>>> 'quo\te literaly'
'quo\te literaly'
>>> 'quo\'te literaly'
"quo'te literaly"
>>> r'a raw string\\/"'
'a raw string\\\\/"'
>>> """
... a multi line
... string
... """
'\na multi line\nstring\n'
>>> 'hel' + 'lo world'
'hello world'
>>> 'hel' 'lo world'
'hello world'

#indexing
>>> st='abc'
>>> st[0]
'a'
>>> st[-1]
'c'
>>> st[:]
'abc'
>>> st[:-1]
'ab'
>>> st[1:]
'bc'
>>> st='aaabbbccc'
>>> st[1::3]
'abc'
>>> st[1:-1:3]
'abc'
>>> st[1:-4:2]
'ab'
>>> st[1::2]
'abbc'
>>> st[1]='f'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'str' object does not support item assignment
>>> len(st)
9

#lists, list comprehension
>>> range(len(st))
[0, 1, 2, 3, 4, 5, 6, 7, 8]
>>> [x**2 for x in range(len(st))]
[0, 1, 4, 9, 16, 25, 36, 49, 64]
>>> sq = [x**2 for x in range(len(st))]
>>> sq
[0, 1, 4, 9, 16, 25, 36, 49, 64]
>>> sq_shallowCP = sq[:]
>>> sq[0]=-1
>>> sq
[-1, 1, 4, 9, 16, 25, 36, 49, 64]
>>> sq_shallowCP
[0, 1, 4, 9, 16, 25, 36, 49, 64]
>>> sq_shallowCP+sq
[0, 1, 4, 9, 16, 25, 36, 49, 64, -1, 1, 4, 9, 16, 25, 36, 49, 64]
>>> sq[1:3]=[1,2,3]
>>> sq
[-1, 1, 2, 3, 9, 16, 25, 36, 49, 64]
>>> sq[1:3]=[]
>>> sq
[-1, 3, 9, 16, 25, 36, 49, 64]
```

### 4.1.2 memory model

```text
https://cdn.oreillystatic.com/en/assets/1/event/95/Python%20103_%20Memory%20Model%20_%20Best%20Practices%20Presentation.pdf

Python has several implementations. The oldest one CPython uses reference-count for memory management. All objects are actually references (aliases) to realy memory
Allocation happens on assignment
Object is GCd when RC(Reference Count) hits 0

>>> foo=[]
>>> import sys
>>> print(sys.getrefcount(foo))
2
>>> print('ref count 2. foo in scope and call sys.getrefcount')
ref count 2. foo in scope and call sys.getrefcount
>>> def bar(f):
...     print(sys.getrefcount(foo)) #4, foo var sys.getrefcount, bar argument and function stack
... 
>>> bar(foo)
4

ref-count GC fails to clean circular dependencies. e.g.
o={}
o['reflexive_ref']=o

or
o1={}
o2={}
o1['o2'] = o2
o2['o1'] = o1

For this python has generational GC
import gc

# We are using ctypes to access our unreachable objects by memory address.
class PyObject(ctypes.Structure):
    _fields_ = [("refcnt", ctypes.c_long)]


gc.disable()  # Disable generational gc

lst = []
lst.append(lst)

# Store address of the list
lst_address = id(lst)

# Destroy the lst reference
del lst

object_1 = {}
object_2 = {}
object_1['obj2'] = object_2
object_2['obj1'] = object_1

obj_address = id(object_1)

# Destroy references
del object_1, object_2

# Uncomment if you want to manually run garbage collection process 
# gc.collect()

# Check the reference count
print(PyObject.from_address(obj_address).refcnt)
print(PyObject.from_address(lst_address).refcnt)

        Performance tips
Cycles can easily happen in real life. Typically you encounter them in graphs, linked lists or in structures, in which you need to keep track of relations between objects. If your program has an intensive workload and requires low latency, you should avoid reference cycles as possible.

To avoid circular references in your code, you need to use weak references, which are implemented in the weakref module. Unlike the usual references, the weakref.ref doesn't increase the reference count and returns None if an object was destroyed.

In some cases, it is useful to disable GC and use it manually. The automatic collection can be disabled by calling gc.disable(). To manually run collection process you need to use gc.collect().

arguments are passed by value (can't be changed)
e.g.
>>> def add1(a):
...     a = a+1
...     return a
... 
>>> a=1
>>> a
1
>>> print(add1(a))
2
>>> a
1

        4.1.3

        with as
```

## 4.2 https://wiki.python.org/moin/BeginnersGuide

```text
    https://docs.python.org/3/tutorial/

    4.3

id=__python_cli__
```
