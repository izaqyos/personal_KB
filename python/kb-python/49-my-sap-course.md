---
type: reference
title: My sap Course
description: "Legacy Python KB section: My sap Course (getting started, Run python, SAP intro)"
tags: [course-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#43"
---

# My sap Course

[↑ KB_python](/python/kb-python/README.md)

```text
TOC:
 getting started
        how to run python
        python types
        strings
        lists
        tuples, namedtuple
        dictionaries
        files
        store/read objects pickle
        
    syntax
        indentation syntax,
        : for nesting
        EoL instead of ;
        assignment, tuple assignment 
        conditions
        loops
        range

        read input
        convert string to int, decimal to hexa and vice versa
        print, format

        scopes, LEGB

    list comprehensions

    iterators 

    genrators

    exceptions, with as
```

## 43.1 getting started

### 43.1.1 Run python

#### 43.1.1.1 python REPL

```text
$ alias py3
alias py3='python3'

$ py3
Python 3.7.3 (default, Mar 27 2019, 09:23:15) 
[Clang 10.0.1 (clang-1001.0.46.3)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
history file:  /Users/<user>/.python_history
Welcome <user>, time is 18:11:39 06/10/19 IDT,  Have a good session :-) 
>>> 
```

#### 43.1.1.2 Run as script

```text
example:
$ cat numSecsKids.py 
#!/usr/bin/python
# -*- coding: utf-8 -*-
import datetime as dt

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

Bdays = {'Alice': dt.datetime(2008, 1, 15, 10, 0, 0), 'Bob': dt.datetime(2011, 5, 20, 9, 30, 0)}
#aliceBday = dt.datetime(2008, 1, 15, 10, 0, 0)
now = dt.datetime.now()
#secs = (now - Bdays['Alice']).total_seconds()
#print("May: seconds {0}, minutes {1}, hours {2}, days {3}".format(secs, secs/60, secs/3600, secs/(3600*24)))
for name,date in Bdays.iteritems():
    secs = (now - date).total_seconds()
    print("{4} is alive for seconds {0}, minutes {1}, hours {2}, days {3}".format(secs, secs/60, secs/3600, secs/(3600*24), name))

$ py numSecsKids.py 
<name> is alive for seconds N, minutes N, hours N, days N
<name> is alive for seconds N, minutes N, hours N, days N
<name> is alive for seconds N, minutes N, hours N, days N
<name> is alive for seconds N, minutes N, hours N, days N
<name> is alive for seconds N, minutes N, hours N, days N
<name> is alive for seconds N, minutes N, hours N, days N

$ ll numSecsKids.py 
-rwxr-xr-x  1 <user>  staff   819B Feb 10 11:51 numSecsKids.py*
$ ./numSecsKids.py 
...
```

#### 43.1.1.3 IDLE

```text
$ py3 -m idlelib.idle
```

#### 43.1.1.4 pycharm, vscode

#### 43.1.1.5 ipython

```text
            43.1.1.6

        43.1.2
```

## 43.2 SAP intro

### 43.2.1 Python strong features

```text
a. "easy" to code. subjective yet backed by popularity and surveys. see: https://adtmag.com/articles/2019/01/08/tiobe-jan-2019.aspx
b. readable. indentation, lack of types lead to more readable code.
c. free and open source with huge amount of libraries and frameworks
d. hardware and platform "agnostic"
e. interpreted
f. Extensible and Embedeble. meaning for example can call native code (C++) and be called from native. Same for java, javascript and NodeJS.
g. OOP. Everything is Object.    

-> example:
class example:
    classVar="like static member"
    def __init__(self, msg):
        self.instanceVar = msg

ex1 = example()
ex1.classVar                                                                                                                                
'like static member'

ex1.instanceVar                                                                                                                             
'hello instance'


-> inheritance:
class mathExample(example): 
    def __init__(self, msg): 
        super().__init__(msg) 
        print('mathExample CTOR called') 
    def aVirtMethod(self): 
        print('custom impl of aVirtMethod') 
                                                                                                                                            

mathEx = mathExample('an example of inheritance')                                                                                           
mathExample CTOR called

mathEx.aVirtMethod()                                                                                                                        
custom impl of aVirtMethod

-> reflection 
    --> type
In [55]: type(mathExample)                                                                                                                           
Out[55]: type

In [56]: type(2)                                                                                                                                     
Out[56]: int

In [57]: type('2')                                                                                                                                   
Out[57]: str

    --> isinstance
In [60]: isinstance(mathEx, mathExample)                                                                                                             
Out[60]: True

    --> callable 
    In [65]: callable(lambda x: print(x) )                                                                                                               
Out[65]: True

In [66]: callable('a')                                                                                                                               
Out[66]: False

    --> dir
In [67]: dir(mathEx)                                                                                                                                 
Out[67]: 
['__class__',
        ...
 'aVirtMethod',
 'classVar',
 'instanceVar']

    --> getattr
    In [68]: getattr(mathEx, 'instanceVar')                                                                                                              
Out[68]: 'an example of inheritance'

h. functional
In [35]: nums = list(range(10))  

    --> map
In [39]: list(map(lambda x: x**3, nums))                                                                                                             
Out[39]: [0, 1, 8, 27, 64, 125, 216, 343, 512, 729]

    --> filter
In [77]: list(filter(lambda x: x%2 == 0, nums))                                                                                                      
Out[77]: [0, 2, 4, 6, 8]

In [78]: list(filter(lambda x: x%2, nums))                                                                                                           
Out[78]: [1, 3, 5, 7, 9]

    --> enumerate
In [79]: for i,e in enumerate(nums): 
    ...:     print('index: {}, elem: {}'.format(i,e)) 
    ...:                                                                                                                                             
index: 0, elem: 0
...
index: 9, elem: 9

    --> sorted
In [80]: sorted([("a", 2), ("c", 1), ("d", 4)])                                                                                                      
Out[80]: [('a', 2), ('c', 1), ('d', 4)]

In [81]: sorted([("a", 2), ("c", 1), ("d", 4)], key=lambda x: x[1])                                                                                  
Out[81]: [('c', 1), ('a', 2), ('d', 4)]

In [83]: sorted([("a", 2), ("c", 1), ("d", 4)], key=lambda x: x[1], reverse=True)                                                                    
Out[83]: [('d', 4), ('a', 2), ('c', 1)]

    --> any, all
In [84]: any(map(lambda x: x==7, nums))                                                                                                              
Out[84]: True

In [85]: all(map(lambda x: x<10, nums))                                                                                                              
Out[85]: True

In [86]: all(map(lambda x: x<5, nums))                                                                                                               
Out[86]: False

    --> zip
In [87]: strs=[ 'zip', 'is', 'great', 'for', 'combining', 'sequences']                                                                               

In [88]: list(zip(strs, map(len, strs)))                                                                                                             
Out[88]: 
[('zip', 3),
 ('is', 2),
 ('great', 5),
 ('for', 3),
 ('combining', 9),
 ('sequences', 9)]

In [89]: dict(zip(strs, map(len, strs)))                                                                                                             
Out[89]: {'zip': 3, 'is': 2, 'great': 5, 'for': 3, 'combining': 9, 'sequences': 9}

In [90]: list(zip(nums,strs))                                                                                                                        
Out[90]: 
[(0, 'zip'),
 (1, 'is'),
 (2, 'great'),
 (3, 'for'),
 (4, 'combining'),
 (5, 'sequences')]

In [91]: for n,s in list(zip(nums,strs)): 
    ...:     print(n,s) 
    ...:                                                                                                                                             
0 zip
1 is
2 great
3 for
4 combining
5 sequences


    --> reduce
In [92]: import functools                                                                                                                            

In [93]: functools.reduce(lambda a,b: a+b, nums)                                                                                                     
Out[93]: 45

In [94]: functools.reduce(lambda a,b: a*b, nums)                                                                                                     
Out[94]: 0

In [95]: functools.reduce(lambda a,b: a*b, nums[1:])                                                                                                 
Out[95]: 362880

    -->

i. Supports closures. Scopeso
    -> closures
A Closure is a function object that remembers values in enclosing scopes even if they are not present in memory.

It is a record that stores a function together with an environment: a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or reference to which the name was bound when the closure was created.
A closure—unlike a plain function—allows the function to access those captured variables through the closure’s copies of their values or references, even when the function is invoked outside their scope.

Ex:
In [96]: def outer(msg): 
    ...:     msg=msg 
    ...:     def innerClosure(): 
    ...:         print(msg) 
    ...:     return innerClosure  
    ...:                                                                                                                                             

In [97]: myFunc = outer("Closure example")                                                                                                           

In [98]: myFunc()                                                                                                                                    
Closure example

    -> scopes
Scope resolution via LEGB rule :
In Python, the LEGB rule is used to decide the order in which the namespaces are to be searched for scope resolution.
The scopes are listed below in terms of hierarchy(highest to lowest/narrowest to broadest):

Local(L): Defined inside function/class
Enclosed(E): Defined inside enclosing functions(Nested function concept)
Global(G): Defined at the uppermost level
Built-in(B): Reserved names in Python builtin modules


j. List, dictionary and set comprehensions

    -> syntax
A list comprehension generally consist of these parts :
   Output expression, 
   input sequence, 
   a variable representing member of input sequence and
   an optional predicate part. 

For example :

lst  =  [x ** 2  for x in range (1, 11)   if  x % 2 == 1] 

here, x ** 2 is output expression, 
      range (1, 11)  is input sequence, 
      x is variable and   
      if x % 2 == 1 is predicate part.
    -> example 
In [99]: notprimes = [ j for i in range(2,8) for j in range(i*2, 50, i)]                                                                             

In [100]: notprimes                                                                                                                                  
Out[100]: 
[4,
 6,
 8,
 ...
 35,
 42,
 49]

In [101]: primes= [x for x in range(2,50) if x not in notprimes]                                                                                     

In [102]: primes                                                                                                                                     
Out[102]: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    ->

iterators, Generators expressions and generator functions (lazy iteration)
        -> iterators
        __iter__ method that is called on initialization of an iterator. This should return an object that has a next or __next__ (in Python 3) method.
next ( __next__ in Python 3) The iterator next method should return the next value for the iterable. When an iterator is used with a ‘for in’ loop, the for loop implicitly calls next() on the iterator object. This method should raise a StopIteration to signal the end of the iteration.

class Test: 
  
    # Cosntructor 
    def __init__(self, limit): 
        self.limit = limit 
  
    # Called when iteration is initialized 
    def __iter__(self): 
        self.x = 10
        return self
  
    # To move to next element. In Python 3, 
    # we should replace next with __next__ 
    def next(self): 
  
        # Store current value ofx 
        x = self.x 
  
        # Stop iteration if limit is reached 
        if x > self.limit: 
            raise StopIteration 
  
        # Else increment and return old value 
        self.x = x + 1; 
        return x 
  
# Prints numbers from 10 to 15 
for i in Test(15): 
    print(i) 
  
# Prints nothing 
for i in Test(5): 
    print(i) 

    -> generators
        --> Generator-Function : A generator-function is defined like a normal function, but whenever it needs to generate a value, it does so with the yield keyword rather than return. If the body of a def contains yield, the function automatically becomes a generator function.
In [103]: def myGen(): 
     ...:     yield 4 
     ...:     yield 5 
     ...:     yield 6 
     ...:                                                                                                                                            

In [104]: for n in myGen(): 
     ...:     print(n) 
     ...:                                                                                                                                            
4
5
6


        --> Generator-Object : Generator functions return a generator object. Generator objects are used either by calling the next method on the generator object or using the generator object in a “for in” loop (as shown in the above program).
In [105]: def fib(lim): 
     ...:     a,b = 0,1 
     ...:     while a<lim: 
     ...:         yield a 
     ...:         a,b= b, a+b                                                                                                                        

In [106]: Fibo=fib(20)                                                                                                                               

In [107]: for n in Fibo: 
     ...:     print(n) 
     ...:                                                                                                                                            
g. OOP. Everything is Object.    

-> example:
class example:
    classVar="like static member"
    def __init__(self, msg):
        self.instanceVar = msg

ex1 = example()
ex1.classVar                                                                                                                                
'like static member'

ex1.instanceVar                                                                                                                             
'hello instance'


-> inheritance:
class mathExample(example): 
    def __init__(self, msg): 
        super().__init__(msg) 
        print('mathExample CTOR called') 
    def aVirtMethod(self): 
        print('custom impl of aVirtMethod') 
                                                                                                                                            

mathEx = mathExample('an example of inheritance')                                                                                           
mathExample CTOR called

mathEx.aVirtMethod()                                                                                                                        
custom impl of aVirtMethod

-> reflection 
    --> type
In [55]: type(mathExample)                                                                                                                           
Out[55]: type

In [56]: type(2)                                                                                                                                     
Out[56]: int

In [57]: type('2')                                                                                                                                   
Out[57]: str

    --> isinstance
In [60]: isinstance(mathEx, mathExample)                                                                                                             
Out[60]: True

    --> callable 
    In [65]: callable(lambda x: print(x) )                                                                                                               
Out[65]: True

In [66]: callable('a')                                                                                                                               
Out[66]: False

    --> dir
In [67]: dir(mathEx)                                                                                                                                 
Out[67]: 
['__class__',
        ...
 'aVirtMethod',
 'classVar',
 'instanceVar']

    --> getattr
    In [68]: getattr(mathEx, 'instanceVar')                                                                                                              
Out[68]: 'an example of inheritance'

h. functional
In [35]: nums = list(range(10))  

    --> map
In [39]: list(map(lambda x: x**3, nums))                                                                                                             
Out[39]: [0, 1, 8, 27, 64, 125, 216, 343, 512, 729]

    --> filter
In [77]: list(filter(lambda x: x%2 == 0, nums))                                                                                                      
Out[77]: [0, 2, 4, 6, 8]

In [78]: list(filter(lambda x: x%2, nums))                                                                                                           
Out[78]: [1, 3, 5, 7, 9]

    --> enumerate
In [79]: for i,e in enumerate(nums): 
    ...:     print('index: {}, elem: {}'.format(i,e)) 
    ...:                                                                                                                                             
index: 0, elem: 0
...
index: 9, elem: 9

    --> sorted
In [80]: sorted([("a", 2), ("c", 1), ("d", 4)])                                                                                                      
Out[80]: [('a', 2), ('c', 1), ('d', 4)]

In [81]: sorted([("a", 2), ("c", 1), ("d", 4)], key=lambda x: x[1])                                                                                  
Out[81]: [('c', 1), ('a', 2), ('d', 4)]

In [83]: sorted([("a", 2), ("c", 1), ("d", 4)], key=lambda x: x[1], reverse=True)                                                                    
Out[83]: [('d', 4), ('a', 2), ('c', 1)]

    --> any, all
In [84]: any(map(lambda x: x==7, nums))                                                                                                              
Out[84]: True

In [85]: all(map(lambda x: x<10, nums))                                                                                                              
Out[85]: True

In [86]: all(map(lambda x: x<5, nums))                                                                                                               
Out[86]: False

    --> zip
In [87]: strs=[ 'zip', 'is', 'great', 'for', 'combining', 'sequences']                                                                               

In [88]: list(zip(strs, map(len, strs)))                                                                                                             
Out[88]: 
[('zip', 3),
 ('is', 2),
 ('great', 5),
 ('for', 3),
 ('combining', 9),
 ('sequences', 9)]

In [89]: dict(zip(strs, map(len, strs)))                                                                                                             
Out[89]: {'zip': 3, 'is': 2, 'great': 5, 'for': 3, 'combining': 9, 'sequences': 9}

In [90]: list(zip(nums,strs))                                                                                                                        
Out[90]: 
[(0, 'zip'),
 (1, 'is'),
 (2, 'great'),
 (3, 'for'),
 (4, 'combining'),
 (5, 'sequences')]

In [91]: for n,s in list(zip(nums,strs)): 
    ...:     print(n,s) 
    ...:                                                                                                                                             
0 zip
1 is
2 great
3 for
4 combining
5 sequences


    --> reduce
In [92]: import functools                                                                                                                            

In [93]: functools.reduce(lambda a,b: a+b, nums)                                                                                                     
Out[93]: 45

In [94]: functools.reduce(lambda a,b: a*b, nums)                                                                                                     
Out[94]: 0

In [95]: functools.reduce(lambda a,b: a*b, nums[1:])                                                                                                 
Out[95]: 362880

    -->

i. Supports closures. Scopeso
    -> closures
A Closure is a function object that remembers values in enclosing scopes even if they are not present in memory.

It is a record that stores a function together with an environment: a mapping associating each free variable of the function (variables that are used locally, but defined in an enclosing scope) with the value or reference to which the name was bound when the closure was created.
A closure—unlike a plain function—allows the function to access those captured variables through the closure’s copies of their values or references, even when the function is invoked outside their scope.

Ex:
In [96]: def outer(msg): 
    ...:     msg=msg 
    ...:     def innerClosure(): 
    ...:         print(msg) 
    ...:     return innerClosure  
    ...:                                                                                                                                             

In [97]: myFunc = outer("Closure example")                                                                                                           

In [98]: myFunc()                                                                                                                                    
Closure example

    -> scopes
Scope resolution via LEGB rule :
In Python, the LEGB rule is used to decide the order in which the namespaces are to be searched for scope resolution.
The scopes are listed below in terms of hierarchy(highest to lowest/narrowest to broadest):

Local(L): Defined inside function/class
Enclosed(E): Defined inside enclosing functions(Nested function concept)
Global(G): Defined at the uppermost level
Built-in(B): Reserved names in Python builtin modules


j. List, dictionary and set comprehensions

    -> syntax
A list comprehension generally consist of these parts :
   Output expression, 
   input sequence, 
   a variable representing member of input sequence and
   an optional predicate part. 

For example :

lst  =  [x ** 2  for x in range (1, 11)   if  x % 2 == 1] 

here, x ** 2 is output expression, 
      range (1, 11)  is input sequence, 
      x is variable and   
      if x % 2 == 1 is predicate part.
    -> example 
In [99]: notprimes = [ j for i in range(2,8) for j in range(i*2, 50, i)]                                                                             

In [100]: notprimes                                                                                                                                  
Out[100]: 
[4,
 6,
 8,
 ...
 35,
 42,
 49]

In [101]: primes= [x for x in range(2,50) if x not in notprimes]                                                                                     

In [102]: primes                                                                                                                                     
Out[102]: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
    ->

iterators, Generators expressions and generator functions (lazy iteration)
        -> iterators
        __iter__ method that is called on initialization of an iterator. This should return an object that has a next or __next__ (in Python 3) method.
next ( __next__ in Python 3) The iterator next method should return the next value for the iterable. When an iterator is used with a ‘for in’ loop, the for loop implicitly calls next() on the iterator object. This method should raise a StopIteration to signal the end of the iteration.

class Test: 
  
    # Cosntructor 
    def __init__(self, limit): 
        self.limit = limit 
  
    # Called when iteration is initialized 
    def __iter__(self): 
        self.x = 10
        return self
  
    # To move to next element. In Python 3, 
    # we should replace next with __next__ 
    def next(self): 
  
        # Store current value ofx 
        x = self.x 
  
        # Stop iteration if limit is reached 
        if x > self.limit: 
            raise StopIteration 
  
        # Else increment and return old value 
        self.x = x + 1; 
        return x 
  
# Prints numbers from 10 to 15 
for i in Test(15): 
    print(i) 
  
# Prints nothing 
for i in Test(5): 
    print(i) 

    -> generators
        --> Generator-Function : A generator-function is defined like a normal function, but whenever it needs to generate a value, it does so with the yield keyword rather than return. If the body of a def contains yield, the function automatically becomes a generator function.
In [103]: def myGen(): 
     ...:     yield 4 
     ...:     yield 5 
     ...:     yield 6 
     ...:                                                                                                                                            

In [104]: for n in myGen(): 
     ...:     print(n) 
     ...:                                                                                                                                            
4
5
6


        --> Generator-Object : Generator functions return a generator object. Generator objects are used either by calling the next method on the generator object or using the generator object in a “for in” loop (as shown in the above program).
In [105]: def fib(lim): 
     ...:     a,b = 0,1 
     ...:     while a<lim: 
     ...:         yield a 
     ...:         a,b= b, a+b                                                                                                                        

In [106]: Fibo=fib(20)                                                                                                                               

In [107]: for n in Fibo: 
     ...:     print(n) 
     ...:                                                                                                                                            
0
1
1
2
3
5
8
13

        -->
    ->
k. Asynchronous functions and co-routines
l. Standard library support of queues, fixed precisions decimals, rational numbers.
m. Wide ranging standard library including OS access, Internet access, cryptography and much more.
n. Strong dynamic typing
o. Strict nested scoping rules
p. Support for modules and packages

python threadin
https://realpython.com/intro-to-python-threading/
```

### 43.2.2 Python weak features

```text
    43.3
```
