---
type: reference
title: Recipes
description: "Legacy Python KB section: Recipes (Sorting, Sorting Mini-HOW TO, \"Sort\" Dictionaries)"
tags: [examples, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
status: stable
capture_type: source
legacy_source: "python/KB_python#32"
sources:
  - { id: py-sorting, resource: "https://docs.python.org/3/howto/sorting.html", title: "Python docs: Sorting Techniques" }
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-functools, resource: "https://docs.python.org/3/library/functools.html", title: "Python docs: functools (cmp_to_key, total_ordering)" }
  - { id: py-dict, resource: "https://docs.python.org/3/library/stdtypes.html#mapping-types-dict", title: "Python docs: Mapping Types - dict" }
---

# Recipes

[↑ KB_python](/python/kb-python/README.md)

## 32.1 Sorting

### 32.1.1 Sorting Mini-HOW TO

> Updated 2026-10 to current practice.[^py-sorting][^py3-whatsnew]

Originally Andrew Dalke's Python 2.4-era "Sorting Mini-HOW TO"; the maintained version is the official [Sorting Techniques HOWTO](https://docs.python.org/3/howto/sorting.html). Rewritten here for Python 3. The big change: **Python 3 removed the `cmp` argument of `sort()`/`sorted()`, the builtin `cmp()` function and the `__cmp__` method**. Sort with `key=` and `reverse=`, use rich comparisons (`__lt__`, `__eq__`, ...) in classes, and wrap an old-style comparison function with `functools.cmp_to_key()` if you really need one.[^py3-whatsnew]

#### Sorting basic data types

`sorted()` returns a new sorted list from any iterable; `list.sort()` sorts in place and returns `None` (slightly more efficient if you don't need the original):

```pycon
>>> sorted([5, 2, 3, 1, 4])
[1, 2, 3, 4, 5]
>>> a = [5, 2, 3, 1, 4]
>>> a.sort()
>>> a
[1, 2, 3, 4, 5]
```

Both take keyword-only arguments `key` and `reverse`:

```pycon
>>> sorted([5, 2, 3, 1, 4], reverse=True)
[5, 4, 3, 2, 1]
```

#### Sorting by keys

`key` is a function of one argument that returns the value to sort by. It's called **once per element** (O(n)), unlike an old `cmp` function, which ran on every comparison (O(n log n) calls). Case-insensitive sort:

```pycon
>>> a = "This is a test string from Andrew".split()
>>> sorted(a, key=str.lower)
['a', 'Andrew', 'from', 'is', 'string', 'test', 'This']
```

For case-insensitive comparison of arbitrary Unicode text, `str.casefold` is more thorough than `str.lower`.

The `operator` module has ready-made key functions, `itemgetter()` and `attrgetter()`:

```pycon
>>> from operator import itemgetter
>>> L = [('c', 2), ('d', 1), ('a', 4), ('b', 3)]
>>> [itemgetter(0)(t) for t in L]     # map() returns an iterator in Python 3
['c', 'd', 'a', 'b']
>>> sorted(L, key=itemgetter(1))
[('d', 1), ('c', 2), ('b', 3), ('a', 4)]
```

If `key` returns a tuple, later items act as tie-breakers (`itemgetter(1, 0)` does the same):

```pycon
>>> L = [('d', 2), ('a', 4), ('b', 3), ('c', 2)]
>>> sorted(L, key=lambda x: (x[1], x[0]))
[('c', 2), ('d', 2), ('b', 3), ('a', 4)]
>>> sorted(L, key=itemgetter(1, 0))
[('c', 2), ('d', 2), ('b', 3), ('a', 4)]
```

Sorts are **stable**: items with equal keys keep their original order. So a multi-key sort with mixed directions can be done in passes, least significant key first. Second item descending, ties broken by first item ascending:

```pycon
>>> L = [('a', 2), ('d', 4), ('b', 3), ('c', 2)]
>>> L.sort()                                   # secondary key first
>>> sorted(L, key=itemgetter(1), reverse=True) # then primary key
[('d', 4), ('b', 3), ('a', 2), ('c', 2)]
```

(For numeric keys you can also negate in one pass: `sorted(L, key=lambda t: (-t[1], t[0]))`.)

#### Decorate-Sort-Undecorate

Before `key=` existed, the idiom was Decorate-Sort-Undecorate (the Schwartzian transform, after Randal L. Schwartz): build `(key, index, item)` tuples, sort them, strip the decorations. Tuples compare lexicographically; the index makes the sort stable and means the items themselves are never compared. `key=` does exactly this internally, so you rarely need to write it out:

```pycon
>>> words = "This is a test string from Andrew.".split()
>>> deco = [(word.lower(), i, word) for i, word in enumerate(words)]
>>> deco.sort()
>>> [word for _, _, word in deco]
['a', 'Andrew.', 'from', 'is', 'string', 'test', 'This']
>>> sorted(words, key=str.lower)           # same result
['a', 'Andrew.', 'from', 'is', 'string', 'test', 'This']
```

#### Comparing classes

`__cmp__` is gone. Define rich comparisons; `sort()` only needs `__lt__`, and `functools.total_ordering` fills in the rest from `__eq__` + `__lt__`. A `@dataclass(order=True)` generates them for you, comparing fields in order:

```pycon
>>> from functools import total_ordering
>>> @total_ordering
... class Spam:
...     def __init__(self, spam, eggs):
...         self.spam = spam
...         self.eggs = eggs
...     def __eq__(self, other):
...         return self.spam + self.eggs == other.spam + other.eggs
...     def __lt__(self, other):
...         return self.spam + self.eggs < other.spam + other.eggs
...     def __str__(self):
...         return str(self.spam + self.eggs)
...
>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> a.sort()
>>> for spam in a:
...     print(spam)
5
10
12
```

To sort by different attributes at different times, use a key function rather than the class's ordering:

```pycon
>>> from operator import attrgetter
>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> for spam in sorted(a, key=attrgetter('eggs')):
...     print(spam.eggs, spam)
3 12
4 5
6 10
>>> for spam in sorted(a, key=lambda obj: obj.spam):
...     print(spam.spam, spam.eggs, spam)
1 4 5
4 6 10
9 3 12
```

`attrgetter('a', 'b')` returns a tuple, for multi-attribute sorts.

#### Old comparison functions: `functools.cmp_to_key`

If you have a two-argument comparison function (negative / zero / positive), e.g. from Python 2 code or another language, convert it to a key:

```pycon
>>> from functools import cmp_to_key
>>> def numeric_compare(x, y):
...     return (x > y) - (x < y)     # replacement for the removed cmp(x, y)
...
>>> sorted([5, 2, 3, 1, 4], key=cmp_to_key(numeric_compare))
[1, 2, 3, 4, 5]
>>> sorted([5, 2, 3, 1, 4], key=cmp_to_key(lambda x, y: y - x))
[5, 4, 3, 2, 1]
```

#### Other notes

- **Stability** is guaranteed by the language: if `x == y`, `sorted([x, y])` returns `[x, y]` and `sorted([y, x])` returns `[y, x]`.
- **Mixed types** don't sort in Python 3: `sorted([1, 'a'])` raises `TypeError` (Python 2 imposed an arbitrary order).
- With custom rich comparisons it is possible to create inconsistent orders (e.g. `x < y and x == y`). Keep `__eq__` consistent with `__hash__`, and remember sorting uses `__lt__`.
- **Locale-aware sorting**: use `locale.strxfrm` as the key (the old `cmp=locale.strcoll` no longer works):

```python
import locale
locale.setlocale(locale.LC_ALL, "pl_PL.UTF-8")   # the locale must be installed
sorted(['ą', 'a', 'z'], key=locale.strxfrm)        # ['a', 'ą', 'z']
```

Without a locale-aware key, `sorted(['ą', 'a', 'z'])` gives `['a', 'z', 'ą']` (code-point order). For a full Unicode Collation Algorithm use PyICU.

### 32.1.2 "Sort" Dictionaries

#### 32.1.2.1 Python 2.4

> Updated 2026-10 to current practice.[^py-sorting][^py-dict]

Example from PEP 265 (Sorting Dictionaries By Value), in Python 3. `d.items()` returns a **view**, not a list, so it has no `.sort()`: use `sorted()`.

```pycon
>>> from operator import itemgetter
>>> d = {'a': 2, 'b': 23, 'c': 5, 'd': 17, 'e': 1}   # counting occurrences of letters
>>> sorted(d.items())                         # by key
[('a', 2), ('b', 23), ('c', 5), ('d', 17), ('e', 1)]
>>> sorted(d.items(), reverse=True)           # by key, reverse
[('e', 1), ('d', 17), ('c', 5), ('b', 23), ('a', 2)]
>>> sorted(d.items(), key=itemgetter(1))      # by value
[('e', 1), ('a', 2), ('c', 5), ('d', 17), ('b', 23)]
>>> items = list(d.items())                   # in-place sort needs a real list
>>> items.sort(key=itemgetter(1), reverse=True)
>>> items
[('b', 23), ('d', 17), ('c', 5), ('a', 2), ('e', 1)]
```

For counting, `collections.Counter` does it directly: `Counter("...").most_common()` returns `(item, count)` pairs sorted by count, descending.

#### 32.1.2.2 Values in key order; "sorted" dicts

Since Python 3.7, dicts **preserve insertion order** (a language guarantee).[^py-dict] They still can't be sorted in place, but you can build a new dict in sorted order:

```pycon
>>> d = {'b': 23, 'a': 2, 'c': 5}
>>> dict(sorted(d.items()))                    # ordered by key
{'a': 2, 'b': 23, 'c': 5}
>>> dict(sorted(d.items(), key=itemgetter(1))) # ordered by value
{'a': 2, 'c': 5, 'b': 23}
>>> [d[k] for k in sorted(d)]                  # values in key order (old sortedDictValues)
[2, 23, 5]
```

The old `sortedDictValues1/2/3` recipes relied on `adict.keys()` / `adict.items()` returning lists with a `.sort()` method and on `map()` returning a list; none of that holds in Python 3. The one-liner above (or `list(map(d.get, sorted(d)))`) replaces all three. For a mapping that stays sorted as you insert, use the third-party `sortedcontainers.SortedDict`.

### 32.1.3 Sort lists that contain class objects

#### 32.1.3.1 Override cmp operator

> Updated 2026-10 to current practice.[^py3-whatsnew][^py-functools]

`__cmp__` and `cmp()` no longer exist in Python 3. Define `__eq__` and `__lt__` (plus `functools.total_ordering` for the rest); `sort()` uses `__lt__`. The Vector example, comparing x, then y, then z, with a tolerance on x and y:

```python
from functools import total_ordering

EPSILON = 1e-6

@total_ordering
class Vector:
    def __init__(self, x, y, z):
        self.x, self.y, self.z = x, y, z

    def _key_cmp(self, other):
        """Old __cmp__ logic: returns -1, 0 or 1."""
        if abs(self.x - other.x) >= EPSILON:
            return (self.x > other.x) - (self.x < other.x)
        if abs(self.y - other.y) >= EPSILON:
            return (self.y > other.y) - (self.y < other.y)
        return (self.z > other.z) - (self.z < other.z)

    def __eq__(self, other):
        return self._key_cmp(other) == 0

    def __lt__(self, other):
        return self._key_cmp(other) < 0

    __hash__ = None   # tolerance-based equality is not hash-consistent
```

Without the tolerance, a `@dataclass(order=True)` with fields `x, y, z` gives the same ordering with no hand-written methods.

#### 32.1.3.2 Pass comparison function to sort()

> Updated 2026-10 to current practice.[^py-functools]

`pts.sort(comp)` fails in Python 3 (no `cmp` argument). Pass a key instead; here a tuple key gives x, then y, then z ordering:

```pycon
>>> from collections import namedtuple
>>> Point = namedtuple('Point', 'x y z')
>>> pts = [Point(5.0, 5.0, 5.0), Point(7.0, 10.0, 6.0), Point(1.0, 15.0, 7.0), Point(20.0, 20.0, 20.0)]
>>> pts.sort(key=lambda p: (p.x, p.y, p.z))
>>> pts
[Point(x=1.0, y=15.0, z=7.0), Point(x=5.0, y=5.0, z=5.0), Point(x=7.0, y=10.0, z=6.0), Point(x=20.0, y=20.0, z=20.0)]
```

If you already have a comparison function, wrap it: `pts.sort(key=functools.cmp_to_key(comp))`.

## 32.2 Operator overloading

### 32.2.1 equality operator, ==, comparison

```text
http://www.learningpython.com/2008/06/21/operator-overload-learn-how-to-change-the-behavior-of-equality-operators/

Operator Overload! Learn how to change the behavior of equality operators.

 Share

By: Mark Mruss

Note: This article was first published the November 2007 issue of Python Magazine

While the equality operator works great on numbers and strings the fact the way it treats your custom objects really is not that useful. This article looks into overloading the equality operator so that you can easily compare your custom classes.

|   1. Introduction
|   2. Introducing the terms: operators and operator overloading
|   3. A Quick Example of the Default Equality Operator
|   4. Overloading the Equality Operator
|   5. Telling Python that the Comparison has Not Been Implemented
|   6. The Inequality Operator
|   7. Dangers
|   8. Conclusion

Introduction

In my experience as a professional programmer, testing for the equality between two instances of a class is a fairly common task. In other words, you are comparing the data that each class contains and checking whether the data in one class is identical to the data in the other class.

One of the nice features of Python is that it has a default equality operator defined for any custom objects that you create.
The unfortunate thing about this default equality operator is that it doesnt provide the functionality that you expect.
This is because the equality operator (==) actually performs an identity comparison, rather than an equivalence test.
If you were to run the following code:

if (object_one == object_two):

By default Python actually compares whether or not object_one is object_two (this is the same comparison that can be made using the is keyword) instead of determining whether or not object_one is equivalent to object_two.
Fortunately for us, overloading the default equality operator in Python is a relatively easy task.
There are, however, some gotchas and other interesting features of which one should be aware.
Introducing the terms: operators and operator overloading

An operator can be difficult to define,
and like many programming definitions,
sometimes the definition only serves to confuse the matter further.
In general though,
you can think of operators as being very similar to the operators that you encountered in Math class,
such as: 
the + operator,
the - operator,
and so forth.

In Python the following are operators[1]:

+	-	*		/	//	%	<>>	&
|	^	~	<>	< =	>=	==	!=	<>

In programming languages we generally encounter binary operators. This means that each operator takes two operands. An operand serves as input to an operator. For example, in the statement:

2 + 6

+ is a binary operator that takes two operands, 2 and 6 as inputs. Similarly, in this statement:

my_value - 6

- is an operator that takes two operands, my_value and 6 as inputs.

Operator overloading is a programming term that means taking the default behaviour of an operator and overloading it. That is, changing the default implementation of an operator for a given object. An example of this (although something that you should never do) would be to overload the + operator to actually perform subtraction instead when it is applied to your class.
A Quick Example of the Default Equality Operator

Now that the definitions are out of the way, let's look at an example where one might want to overload the equality operator. For this example I will bring back a favourite example from my Computer Science days: the Student class:

class Student(object):

	def __init__(self, name, student_number):
		self.name = name
		self.student_number = student_number

As you can see the Student class has two data members: 1) the student's name, and, 2) her student number.

If we run the following code:

mark = Student("Mark Mruss", 067213)
guido = Student("Guido van Rossum", 000001)
if (mark == guido):
	print "Equal"
else:
	print "Not Equal"

Not Equal will be printed out as you would expect since the two students are clearly not equivalent. But what about this code:

mark = Student("Mark Mruss", 067213)
mark_two = Student("Mark Mruss", 067213)
if (mark == mark_two):
	print "Equal"
else:
	print "Not Equal"

Here, as in the previous example, Not Equal will be printed out. This is because, as mentioned earlier, the default implementation of the equality operator is to perform an identity comparison. In other words, the default equality operator asks, is mark the same object as mark_two? In Python the equality comparison depends on the type of objects being compared. For custom classes that you or I will create, the equality comparison will perform an identity comparison by comparing the objects internal id. In other words, it will only result in True if the objects being compared actually are each other. For example:

student_one = Student("Mark Mruss", 067213)
student_two = student_one
if (student_one == student_two):
	print "Equal"
else:
	print "Not Equal"

Results in Equal being printed out, as would:


student_one = Student("Mark Mruss", 067213)
student_two = student_one
if (id(student_one) == id(student_two)):
	print "Equal"
else:
	print "Not Equal"

Note: The equality comparison for built-in objects and types like numbers, strings, lists, tuples, and mappings behave differently. Numbers are compared arithmetically. The numerical values of the characters within strings are compared arithmetically. The comparison of lists and tuples is simply a comparison of their inner values, while the comparison of mappings are comparisons of an ordered list of their values.[2]
Overloading the Equality Operator

Hopefully the above example illustrated a case where we might want to overload the equality operator to make it so that the following code:

student_one = Student("Mark Mruss", 067213)
student_two = Student("Mark Mruss", 067213)
if (student_one == student_two):
	print "Equal"
else:
	print "Not Equal"

Would result in Equal being printed out, i.e. a true equality comparison as opposed to an identity comparison. In order to do this we need to change to the default functionality of the equality operator. In other words we need to overload it.

In general, operator overloading in Python means adding a special function to your class that will perform the function of the operator it is meant to represent. There are two ways in which one can overload the equality operator in Python: 1) the first method is to use the __eq__ function, a so-called rich comparison function. Rich comparison functions are functions that overload specific comparison operators (i.e. __eq__ to overload ==). 2) The second is to use the __cmp__ function, which is used to overload all comparison operators if no rich comparison functions are present.

Since __cmp__ is used to override all comparison operators (==, !=, < , <=, >, >=), I would suggest using the rich comparison method unless you are using a version of Python that is earlier then version 2.1, or you are convinced that you know what < = means to our Student class. Lets forget about the __cmp__ operator for now and focus on using the rich comparison functions to overload the equality operator.

Rich comparison functions can return any value, but you should try to return a value that is, or can be, interpreted as a boolean value. This is important because these functions will often be used in situations where the return value will be used in a boolean comparison.

When using the rich comparison functions it is important to know which functions are being called internally. For example, when we run:

student_one == student_two

If __eq__ exists in the Student class, the following is actually being called:

student_one.__eq__(student_two)

When we run:

student_two == student_one

The following is actually called:

student_two.__eq__(student_one)

As you can see it is the operand on the left-hand side whose __eq__ function will be called. It is important to note that if the operand on the left-hand side lacks the __eq__ function while the operand on the right-hand side has one, the right-hand operands __eq__ function will not be called.

Lets start off with a simple, but incorrect, example (the reasons for its incorrectness will be explained below):

def __eq__(self, other):
	return ((self.name == other.name)
		and (self.student_number == other.student_number))

This is very straightforward. In the equality comparison, we simply compare the Student class two data members. This performs as expected when we run:

student_one = Student("Mark Mruss", 067213)
student_two = Student("Guido van Rossum", 000001)
student_three = Student("Mark Mruss", 000001)
print (student_one == student_two)
print (student_one == student_three)

You get:

False
True

But what happens when we introduce the Professor class and try the overloaded equality operator:

class Professor(object):

	def __init__(self, instructor, course):
		self.instructor = instructor
		self.course = course

As you can see, the Professor class lacks the name and student_number data members. What happens when we compare an instance of the Professor class with an instance of the Student class?

guido = Student("Guido van Rossum", 000001)
rob = Professor("Rob Ward", "74-300")
print (guido == rob)

It results in something like this:

File "operators.py", line 10, in __eq__
    return ((self.name == other.name)
AttributeError: 'Professor' object has no attribute 'name'

The way we are overriding the equality operator is not correct because it automatically assumes that the other object has the name and student_number data members. There are a number of methods to get around this problem, including: 1) using the hasattr function, or 2) using the isinstance function. Using the hasattr function determines if other has the attributes we are looking for before actually querying them. hasattr simply tells us if an object has a specific attribute or not. Here is a quick example illustrating how to do this:

def __eq__(self, other):
	if (hasattr(other, "name") and hasattr(other, "student_number")):
		return ((self.name == other.name)
			and (self.student_number == other.student_number))
	else:
		return False

First, we check to see if other has the name and student_number attributes. If it does, we proceed as normal. If it does not, we simply return false. When we compare the professor and the student we get False as expected.

Whats nice about this method is that we dont have to care what type other is. We only care whether or not it contains the attributes we need to compare. However, the drawback to this function is that you have to test for the existence of each attribute. Although this may not always be a big deal, if you are dealing with fifty data members in your classes this can quickly become a pain in the neck.

Another solution to the problem with our first overloading example is to use the isinstance function to make sure that other is an instance of our class type. This has the drawback of forcing other to be the same type as your class. In practice however, I believe this to be more of an advantage than a disadvantage.

def __eq__(self, other):
	if (isinstance(other, Student)):
		return ((self.name == other.name)
			and (self.student_number == other.student_number))
	else:
		return False

The first thing we do is check the variable other to make sure that it is an instance of the Student class. If it is, we then compare all of the data members in the Student class. If object is not an instance of the Student class, we return False.

In my opinion, this is the preferred method since knowing that the class is the correct type is often important. The hasattr method seems more appropriate for simple data containers like a rect or vector class where you are only interested in three or four data members.
Telling Python that the Comparison has Not Been Implemented

Up until this point in time we have been returning False when our __eq__ function does not support the type of object passed in as other. While this is acceptable and correct given the Python documentation, it seems to be proper to actually return NotImplemented.
According to the Python documentation, Numeric methods and rich comparison methods may return this value if they do not implement the operation for the operands provided.
(The interpreter will then try the reflected operation, or some other fallback, depending on the operator.)
	Lets forget abou In other words, if the left operand returns NotImplemented, Python will attempt to use the right hand operands equality operator.
	And if that does not exist, Python will fall back to the default equality operator.

We can return NotImplemted from our Student class if the operand passed in is not an instance of the Student:

def _eq__(self, other):
	if (isinstance(other, Student)):
		return ((self.name == other.name)
			and (self.student_number == other.student_number))
	else:
		return NotImplemented

Now if we perform the following comparison:

guido = Student("Guido van Rossum", 000001)
rob = Professor("Rob Ward", "74-300")
print guido == rob

The first step in the processing will be:

guido.__eq__(rob)

This returns NotImplemented. As a result, the reflected operation is attempted:

rob == guido

Because the Professor class does not have the equality operator overloaded, the default operation is executed and False is printed out just like we wanted.

NotImplemented is useful in because instead of returning False, which means that the two operand are not equivalent, you return a value that says that the comparison between the operands has not been implemented.
The Inequality Operator

Now that we know how to overload the equality operator, it stands to reason that we have the opposite operation, the inequality operator (!=) covered as well.
But not so fast.
In Python the inequality and equality operators are handled separately, meaning that inequality is not simply the opposite of equality.
This means that whenever you overload the equality operator, you have to be sure to overload the inequality operator as well.
If you dont you might get some strange results. For example, when we use the current code (without the inequality operator overloaded), the following:

guido = Student("Guido van Rossum", 000001)
guido_too = Student("Guido van Rossum", 000001)
print guido == guido_too
print guido != guido_too

Results in:

True
True

In the first comparison the overloaded equality operator is used, and results in True being printed. Because the inequality operator is not overloaded in the second comparison, the default inequality operator is used (the identity comparison). True is printed because guido and guido_too are not the same instances.

Thankfully once you have overloaded the equality operator, overloading the inequality operator is very easy.
As a general rule, you have to return the opposite of the equality operator, but because we are working with NotImplemented, we have to do a bit more processing to ensure that we dont return False when we really want to return NotImplemented.
Here is how we can overload the inequality operator in the Student class:

def __ne__(self, other):
	equal_result = self.__eq__(other)
	if (equal_result is not NotImplemented):
		return not equal_result
	return NotImplemented

First, we call self.__eq__ to test whether or not we are equal to other. We then check to make sure that equal_result is not NotImplemented. 
If it is not, we know that the equality test was implemented and we can safely return its opposite. If the result for the equality comparison was NotImplemented, we return NotImplemented for the inequality comparison.

Note: It is safe to use the is check on NotImplemented (rather than an isinstance check) because NotImplemented is a singleton, meaning that there is only ever one instance of NotImplemented at anytime.
Dangers

While it may seem like operator overloading should become part of every class that you write, a word of warning is necessary. There is a large school of thought that views operator overloading as a dangerous programming technique. They argue that overloading operators changes the default way that an operator works, and not always correctly. Moreover, instead of overriding the equality operator, one can simply add an is_equal_to function to perform the equality check.

The logic behind this criticism is that when someone is using a class or reading some code that you wrote, they will be unable to tell what the equality operator is doing. For example, if they see:

value = MyClass(10)
value_two = MyClass(10)
print value == value_two

What gets printed out? True or False? If MyClass overrode the equality operator then True will be printed. However, if the equality operator is not overloaded, the standard Python behaviour of equality will result with False being printed out.
Conclusion

While its true that overloading the equality operator does change the default way the Python functions, I feel that its generally a safe and beneficial addition to your classes. Especially since unless people know the ins and outs of the equality operator they will generally assume that should work the way it does when you overload it. Like all the decisions that you make when working with Python, context is key.

[1] http://docs.python.org/ref/operators.html
[2] http://docs.python.org/ref/comparisons.html
[3] http://docs.python.org/ref/customization.html
[4] http://docs.python.org/ref/types.html

	32.3
```

[^py-sorting]: Python docs: Sorting Techniques
[^py3-whatsnew]: What's New In Python 3.0
[^py-functools]: Python docs: functools (cmp_to_key, total_ordering)
[^py-dict]: Python docs: Mapping Types - dict
