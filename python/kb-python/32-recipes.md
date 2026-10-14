---
type: reference
title: Recipes
description: "Legacy Python KB section: Recipes (Sorting, Sorting Mini-HOW TO, \"Sort\" Dictionaries)"
tags: [examples, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#32"
---

# Recipes

[↑ KB_python](/python/kb-python/README.md)

## 32.1 Sorting

### 32.1.1 Sorting Mini-HOW TO

```text
Original version by Andrew Dalke

Contents

|   1. Sorting Mini-HOW TO
|         1. Backward compatibility note
|         2. Sorting basic data types
|         3. Sorting by keys
|         4. Comparing classes
|         5. Topics to be covered
|         6. See Also

Python lists have a built-in sort() method that modifies the list in-place and a sorted() built-in function that builds a new sorted list from an iterable.

There are many ways to use them to sort data and there doesn't appear to be a single, central place in the various manuals describing them, so I'll do so here.

Backward compatibility note

Many constructs given in the HOWTO assume Python 2.4. Before that, there was no sorted() builtin and list.sort() took no keyword arguments.

Sorting basic data types

A simple ascending sort is very easy: just call the sorted() function. It returns a new sorted list:

>>> print sorted([5, 2, 3, 1, 4])
[1, 2, 3, 4, 5]

You can also use the sort() method of a list. It modifies the list in-place (and returns None to avoid confusion). Usually it's less convenient than sorted() - but if you don't need the original list, it's slightly more efficient.

>>> a = [5, 2, 3, 1, 4]
>>> a.sort()
>>> print a
[1, 2, 3, 4, 5]

Sort takes an optional function which can be called for doing the comparisons. The default sort routine is equivalent to using cmp:

>>> print sorted([5, 2, 3, 1, 4], cmp)
[1, 2, 3, 4, 5]

where cmp() is the built-in function that compares two objects, x and y, and returns a negative number, 0 or a positive number depending on whether x<y, x==y, or x>y. During the course of the sort the relationships must stay the same for the final list to make sense.

If you want, you can define your own function for the comparison. For integers we can do:

>>> def numeric_compare(x, y):
>>>    return x - y
>>>

Note that this does not work for numbers in general, as the comparison function must return integers.

For numbers in general, but a little more understandably:

>>> def numeric_compare(x, y):
>>>    if x > y:
>>>       return 1
>>>    elif x == y:
>>>       return 0
>>>    else:  #x < y
>>>       return -1
>>>
>>> a = [5, 2, 3, 1, 4]
>>> a.sort(numeric_compare)
>>> print a
[1, 2, 3, 4, 5]

By the way, the sort() function won't work if the result of the subtraction is out of range, as in sys.maxint - (-1).

Or, if you don't want to define a new named function you can create an anonymous one using lambda, as in:

>>> a = [5, 2, 3, 1, 4]
>>> a.sort(lambda x, y: x - y)
>>> print a
[1, 2, 3, 4, 5]

Python 2.4 adds three keyword arguments to sort() that simplify many common usages: cmp, key, and reverse. The cmp keyword is for providing a sorting function; the previous examples could be written as:

>>> a.sort(cmp=numeric_compare)
>>> a.sort(cmp=lambda x, y: x - y)

The reverse parameter is a Boolean value; if it's true, the list is sorted into reverse order.

>>> a = [5, 2, 3, 1, 4]
>>> a.sort(reverse=True)
>>> a
[5, 4, 3, 2, 1]

For Python versions before 2.4, you can reverse the sense of the comparison function:

>>> a = [5, 2, 3, 1, 4]
>>> def reverse_numeric(x, y):
>>>     return y - x
>>>
>>> a.sort(reverse_numeric)
>>> a
[5, 4, 3, 2, 1]

(a more general implementation could return cmp(y,x) or -cmp(x,y)).

However, it's faster if Python doesn't have to call a function for every comparison, so the most efficient solution is to do the forward sort first, then use the reverse() method.

>>> a = [5, 2, 3, 1, 4]
>>> a.sort()
>>> a.reverse()
>>> a
[5, 4, 3, 2, 1]

Sorting by keys

Python 2.4's key parameter lets you derive a sorting key for each element of the list, and then sort using the key.

For example, here's a case-insensitive string comparison:

>>> a = "This is a test string from Andrew".split()
>>> a.sort(key=str.lower)
>>> a
['a', 'Andrew', 'from', 'is', 'string', 'test', 'This']

The value of the key parameter should be a function that takes a single argument and returns a key to use for sorting purposes.

Often there's a built-in that will match your needs, such as str.lower(). The operator module contains a number of functions useful for this purpose. For example, you can sort tuples based on their second element using operator.itemgetter():

>>> import operator
>>> L = [('c', 2), ('d', 1), ('a', 4), ('b', 3)]
>>> map(operator.itemgetter(0), L)
['c', 'd', 'a', 'b']
>>> map(operator.itemgetter(1), L)
[2, 1, 4, 3]
>>> sorted(L, key=operator.itemgetter(1))
[('d', 1), ('c', 2), ('b', 3), ('a', 4)]

If the invocation of key returns a tuple, second and subsequent items in the tuple will be treated as sub-keys in the same way that Python generally sorts tuples:

>>> L = [('d', 2), ('a', 4), ('b', 3), ('c', 2)]
>>> sorted(L, key=lambda x:(x[1], x[0]))
[('c', 2), ('d', 2), ('b', 3), ('a', 4)]

To reverse sort based on the second item in each tuple, but forward sort based on the first item when a tie is met, then forward sort first and then reverse sort based on 2nd item:

>>> L = [('a', 2), ('d', 4), ('b', 3), ('c', 2)]
>>> L.sort(); L
[('a', 2), ('b', 3), ('c', 2), ('d', 4)]
>>> sorted(L, key=operator.itemgetter(1), reverse=True)
[('d', 4), ('b', 3), ('a', 2), ('c', 2)]

Versions of Python before 2.4 don't have the convenient key parameter of sort(), so you have to write a comparison function that embodies the key-generating logic:

>>> a = "This is a test string from Andrew".split()
>>> a.sort(lambda x, y: cmp(x.lower(), y.lower()))
>>> print a
['a', 'Andrew', 'from', 'is', 'string', 'test', 'This']

This goes through the overhead of converting a word to lower case every time it must be compared, roughly O(n lg n) times. Python 2.4's key parameter is called once for each item in the list, which is O(n) and therefore more efficient. You can manually perform the same optimization by computing the keys once and using those values to control the sort order:

>>> words = "This is a test string from Andrew.".split()
>>> deco = [ (word.lower(), i, word) for i, word in enumerate(words) ]
>>> deco.sort()
>>> new_words = [ word for _, _, word in deco ]
>>> print new_words
['a', 'Andrew.', 'from', 'is', 'string', 'test', 'This']

This idiom is called Decorate-Sort-Undecorate after its three steps:

    * First, the initial list is decorated with new values that control the sort order.
    * Second, the decorated list is sorted.
    * Finally, the decorations are removed, creating a list that contains only the initial values in the new order. 

This idiom works because tuples are compared lexicographically; the first items are compared; if they are the same then the second items are compared, and so on.

It is not strictly necessary in all cases to include the index i in the decorated list. Including it gives two benefits:

    * The sort is stable - if two items have the same key, their order will be preserved in the sorted list.
    *

      The original items do not have to be comparable because the ordering of the decorated tuples will be determined by at most the first two items. So for example the original list could contain complex numbers which cannot be sorted directly. 

Another name for this idiom is Schwartzian transform, after Randal L. Schwartz, who popularized it among Perl programmers.

For large lists and lists where the comparison information is expensive to calculate, and Python versions < 2.4, DSU is likely to be the fastest way to sort the list.

Comparing classes

The comparison for two basic data types, like ints to ints or string to string, is built into Python and makes sense. There is a default way to compare class instances, but the default manner isn't usually very useful. You can define your own comparison with the __cmp__ method, as in:

>>> class Spam:
>>>     def __init__(self, spam, eggs):
>>>         self.spam = spam
>>>         self.eggs = eggs
>>>     def __cmp__(self, other):
>>>         return cmp(self.spam+self.eggs, other.spam+other.eggs)
>>>     def __str__(self):
>>>         return str(self.spam + self.eggs)
>>>
>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> a.sort()
>>> for spam in a:
>>>     print spam
5
10
12

Sometimes you may want to sort by a specific attribute of a class. If appropriate you should just define the __cmp__ method to compare those values, but you cannot do this if you want to compare between different attributes at different times.

Python 2.4 has an operator.attrgetter() function that makes this easy:

>>> import operator
>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> a.sort(key=operator.attrgetter('eggs'))
>>> for spam in a:
>>>   print spam.eggs, spam
3 12
4 5
6 10

In Python 2.4 if you don't want to import the operator module you can:

>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> a.sort(key=lambda obj: obj.eggs)
>>> for spam in a:
>>>   print spam.eggs, spam
3 12
4 5
6 10

Again, earlier Python version require you to go back to passing a comparison function to sort, as in:

>>> a = [Spam(1, 4), Spam(9, 3), Spam(4, 6)]
>>> a.sort(lambda x, y: cmp(x.eggs, y.eggs))
>>> for spam in a:
>>>   print spam.eggs, spam
3 12
4 5
6 10

If you want to compare two arbitrary attributes (and aren't overly concerned about performance) you can even define your own comparison function object. This uses the ability of a class instance to emulate a function by defining the __call__ method, as in:

>>> class CmpAttr:
>>>     def __init__(self, attr):
>>>         self.attr = attr
>>>     def __call__(self, x, y):
>>>         return cmp(getattr(x, self.attr), getattr(y, self.attr))
>>>
>>> a = [Spam(1, 4), Spam(9, 3), Spam(4,6)]
>>> a.sort(CmpAttr("spam"))  # sort by the "spam" attribute
>>> for spam in a:
>>>    print spam.spam(), spam.eggs(), spam
1 4 5
4 6 10
9 3 12

>>> a.sort(CmpAttr("eggs"))   # re-sort by the "eggs" attribute
>>> for spam in a:
>>>    print spam.spam(), spam.eggs(), spam
9 3 12
1 4 5
4 6 10

Of course, if you want a faster sort you can extract the attributes into an intermediate list and sort that list.

So, there you have it; about a half-dozen different ways to define how to sort a list:

|   1. sort using the default method
|   2. sort using a comparison function
|   3. reverse sort not using a comparison function
|   4. sort on an intermediate list (two forms)
|   5.
|
|      sort using class defined cmp method
|   6. sort using a sort function object 

Topics to be covered

    * Rich comparisons
          o With custom comparisons, it is possible to create

            insane combinations, such as ((x < y) and (x == y)) or ((x < y) and not (x <= y)).
          o

            The most important comparisons are eq (but be sure to update hash as well), and lt (which is used by the sorting algorithms in practice). 
    * Sorting stability
          o Python sorts are stable. Guido has indicated that this is a promise of the language. Therefore, if x == y, sorted ([x, y]) returns [x, y] but sorted([y, x]) returns [y, x]. 
    * The sorted() function
          o It takes any iterable, and returns a sorted version. If the items in the iterable are not sensibly compared, it will still return a canonical ordering, unless someone went out of their way to prevent one. 
    * Small info about locale aware sorting, eg:
          o

            >>> l = [u'\xc4\x85', u'a', u'z']
            >>> sorted(l, reverse=False)
            ['a', 'z', '\xc4\x85']
            >>> import locale
            >>> locale.setlocale(locale.LC_ALL, "pl_PL.UTF-8")
            >>> sorted(l, cmp=locale.strcoll, reverse=False)
            ['a', '\xc4\x85', 'z']

See Also

    *

      SortingListsOfDictionaries
```

### 32.1.2 "Sort" Dictionaries

#### 32.1.2.1 Python 2.4

```text
			# Example from PEP 265 - Sorting Dictionaries By Value
#    Counting occurences of letters

d = {'a':2, 'b':23, 'c':5, 'd':17, 'e':1}

# operator.itemgetter is new in Python 2.4
#  `itemgetter(index)(container)` is equivalent to `container[index]`
from operator import itemgetter

# Items sorted by key
#   The new builtin `sorted()` will return a sorted copy of the input iterable.
print sorted(d.items())

# Items sorted by key, in reverse order
#   The keyword argument `reverse` operates as one might expect
print sorted(d.items(), reverse=True)

# Items sorted by value
#    The keyword argument `key` allows easy selection of sorting criteria
print sorted(d.items(), key=itemgetter(1))

# In-place sort still works, and also has the same new features as sorted
items = d.items()
items.sort(key = itemgetter(1), reverse=True)
print items
 
			 
			 
			32.1.2.2
Dictionaries can't be sorted -- a mapping has no ordering! -- so, when you feel the need to sort one, you no doubt want to sort its keys (in a separate list). Sorting (key,value) pairs (items) is simplest, but not fastest. 

 (IMHO) the simplest approach:
def sortedDictValues1(adict):
    items = adict.items()
    items.sort()
    return [value for key, value in items]

# an alternative implementation, which
# happens to run a bit faster for large
# dictionaries on my machine:
def sortedDictValues2(adict):
    keys = adict.keys()
    keys.sort()
    return [dict[key] for key in keys]

# a further slight speed-up on my box
# is to map a bound-method:
def sortedDictValues3(adict):
    keys = adict.keys()
    keys.sort()
    return map(adict.get, keys)
			 
			 
The concept of 'sort' applies only to a collection which has _order_ -- a sequence; a mapping (e.g. a dictionary) has NO order, thus it cannot be sorted. Still, its keys can be extracted as a list, which can then be sorted. The example functions return the values in order of sorted key, which just happens to be the single most frequent actual need corresponding to user questions such as "how do I sort a dictionary":-)

The implementation choices are interesting. Since we are sorting key-value pairs by the key field, then returning the list of value fields, it seems clearest (conceptually simplest) to architect the solution as in the first example: .items, .sort, then a list comprehension to pick the value fields.

However (at least on my machine) this turns out not to be fastest: extracting just the keys, sorting them, then accessing the dictionary for each key in the resulting list comprehension, as in the second example, appears to be speedier.

Furthermore, it is subject to a further, obvious optimization: from the dictionary we can extract just once the bound-method adict.get, which will map each key to the corresponding value, then use builtin function map to build the list obtained by applying this callable to each item in the sorted list of keys. This does indeed provide a further speed-up (again, on my machine).

Simplicity is a great virtue, but the second and third examples aren't really more complicated (or complex) than the first -- just, perhaps, a little bit subtler. They're probably worth using to 'sort' any dictionary, even though their performance advantages are really only measurable for large ones -- because uniformity of idiom is also an important programming virtue!
```

### 32.1.3 Sort lists that contain class objects

#### 32.1.3.1 Override cmp operator

```text
By adding a __cmp__ method to class Movie, you can sort instance objects in list m1  with list method sort(). Following is an example of a __cmp__ overload in a Vector class that sorts on the x, y and z attributes:


    def __cmp__(self, other, epsilon=0.000001):
        x = abs(self.x-other.x)
        if x < epsilon:
            y = abs(self.y-other.y)
            if y < epsilon:
                return cmp(self.z, other.z)
            return cmp(self.y, other.y)
        return cmp(self.x, other.x)
```

#### 32.1.3.2 Pass comparison function to sort()

```text
You can also define your own comparison function and pass it to list method sort(). Example using Point objects: 
pts = [p1,p2,p3,p4]
>>> pts
[Point(5.000000, 5.000000, 5.000000), Point(7.000000, 10.000000, 6.000000), Point(1.000000, 15.000000, 7.000000), Point(20.000000, 20.000000, 20.000000)]
>>> def comp(a, b):
... 	if a.x == b.x:
... 		if a.y == b.y:
... 			return cmp(a.z, b.z)
... 		return cmp(a.y, b.y)
... 	return cmp(a.x, b.x)
... 
>>> pts.sort(comp)
>>> pts
[Point(1.000000, 15.000000, 7.000000), Point(5.000000, 5.000000, 5.000000), Point(7.000000, 10.000000, 6.000000), Point(20.000000, 20.000000, 20.000000)]
>>>
		32.1.4
```

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
