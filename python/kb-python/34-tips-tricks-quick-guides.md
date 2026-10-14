---
type: reference
title: "Tips, Tricks, Quick guides"
description: "Legacy Python KB section: Tips, Tricks, Quick guides (Python Tips, Tricks, and Hacks, 1 Quick Tricks)"
tags: [tips, python, legacy]
generated: { by: "human:izaqyos", at: "2026-10-14T00:00:00Z" }
stale_after: "2028-10-14T00:00:00Z"
sources:
  - { id: py3-whatsnew, resource: "https://docs.python.org/3/whatsnew/3.0.html", title: "What's New In Python 3.0" }
  - { id: py-math-prod, resource: "https://docs.python.org/3/library/math.html#math.prod", title: "math.prod — Python 3 documentation" }
status: stable
capture_type: source
legacy_source: "python/KB_python#34"
---

# Tips, Tricks, Quick guides

[↑ KB_python](/python/kb-python/README.md)

## 34.1 Python Tips, Tricks, and Hacks

> Updated 2026-10: this article dates from the Python 2 era. The sections marked "Updated 2026-10" have been rewritten for Python 3. In the rest, read `print x` as `print(x)`, `.iteritems()` as `.items()` and `xrange` as `range`.[^py3-whatsnew]

```text
Want to write shorter, cleaner code? Have an unfortunate situation where you need to fit as much as you can in one expression? Prefer a quick dose of hacks to spending the rest of your life reading the docs? You've come to the right place. We start out with some quick tricks that you might have figured out if you've spent some time with Python, but I promise there's more crazy stuff towards the bottom.

I've tried to make all of the code snippets executable on their own. If you want, paste them into your Python shell and try them out. You'll notice that many examples contain a 'true example' and a 'false example', with one commented out. Feel free to switch the comment and see what happens.

You'll also see a few blank comments floating around in the code. These are to improve readability by adding line breaks while still allowing the Python interpreter to parse the code. These would not be necessary in a 'real' (non-pasted) program.

A quick distinction about true vs. True in this article: when I say an object is 'true', I mean that the object, if converted to a boolean in an if statement or elsewhere, would be converted to True and not False. I don't mean that the object necessarily is identical to or equal to True. In the same way, if I say an object is 'false', I mean that the object would be converted to False, not that it necessarily is equal to or identical to False.

If you prefer, there is a Russian translation of the first parts of this article.
```

### 34.1.1 1 Quick Tricks

#### 34.1.1.1 Four Kinds of Quotes

```text
Let's start with something quick that you probably know. If you're coming from a different language, you're probably used to using single quotes for one thing and double quotes for another. Python lets you use both, although not interchangeably (if you start with one, you have to end with the same one). Python also has a two more types of quotes. A triple quote, ''', is created by typing three single quotes. A triple-double quote, """, is created by typing three double quotes. So, you can have several layers of quoting before you need to worry about escaping your quotes. For example, this is valid Python:
# 's

1print """I wish that I'd never heard him say, '''She said, "He said, 'Give me five dollars'"'''"""
```

#### 34.1.1.2 Truthfulness of Various Objects

```text
Unlike some programming languages (cough Javascript cough) Python types are false if empty, and true if not. That means you don't have to check, for example, that the length of a string, tuple, list, or dict is 0 or is equal to an empty one. It is enough to just check the truthfulness of the object.

As you would expect, the number zero is also false, while all other numbers are true.

For example, the following expressions are equivalent. Here, 'my_object' is a string, but it could easily be another Python type (with appropriate modifications to the equality test)
# 's

 1my_object = 'Test' # True example
 2# my_object = '' # False example
 3
 4if len(my_object) > 0:
 5    print 'my_object is not empty'
 6
 7if len(my_object):  # 0 will evaluate to False
 8    print 'my_object is not empty'
 9
10if my_object != '':
11    print 'my_object is not empty'
12
13if my_object: # an empty string will evaluate to False
14    print 'my_object is not empty'

In conclusion, there's really no need to check lengths or equality if you're only interested in if the object is empty or not.


"
```

#### 34.1.1.3 Checking if a String Contains a Substring

```text
Here's a quick hint that might be obvious, but it took me about a year of Python programming to figure it out.

You probably know that you can test if a list, tuple, or dict contains an item by testing the expression 'item in list' or 'item not in list'. I never realized that this would work for strings as well. I was always writing code like:
# 's

1string = 'Hi there' # True example
2# string = 'Good bye' # False example
3if string.find('Hi') != -1:
4    print 'Success!'

That's some ugly code. It is completely equivalent to do 'if substring in string':
# 's

1string = 'Hi there' # True example
2# string = 'Good bye' # False example
3if 'Hi' in string:
4    print 'Success!'

Much cleaner and simpler. Might be obvious to 99% of the population, but I wish I'd known about it sooner.
```

#### 34.1.1.4 Pretty-Printing a List

```text
Lists don't print nicely. It's of course obvious what the list is, but an average user doesn't want to see brackets around everything. There's a trivial solution to this, using a string's 'join' method:
# 's

1recent_presidents = ['George Bush', 'Bill Clinton', 'George W. Bush']
2print 'The three most recent presidents were: %s.' % ', '.join(recent_presidents)
3# prints 'The three most recent presidents were: George Bush, Bill Clinton, George W. Bush.

The join method turns the list into a string by casting each item into a string and connecting them with the string that join was called on. It's even smart enough to not put one after the last element.

As an added advantage, this is pretty fast, running in linear time. Don't ever create a string by '+'ing list items together in a for loop: not only is it ugly, but it takes much longer.
```

#### 34.1.1.5 Integer vs. Float Division

> Updated 2026-10 to current practice.[^py3-whatsnew]

In Python 3, `/` is always true division and `//` is floor division (PEP 238). The original tip, which recommended `from __future__ import division` and `float()` casts, is Python 2 only.

```python
5 / 2          # 2.5
5.0 / 2        # 2.5
5 // 2         # 2   (floor division)
-5 // 2        # -3  (floors toward negative infinity, not toward zero)
divmod(5, 2)   # (2, 1)
```

Use `//` when you want an integer result, and `/` otherwise. No `__future__` import is needed.

#### 34.1.1.6 Lambda Functions

```text
Sometimes you need to pass a function as an argument, or you want to do a short but complex operation multiple times. You could define your function the normal way, or you could make a lambda function, a mini-function that returns the result of a single expression. The two definitions are completely identical:
# 's

1def add(a,b): return a+b
2
3add2 = lambda a,b: a+b

The advantage of the lambda function is that it is in itself an expression, and can be used inside another statement. Here's an example using the map function, which calls a function on every element in a list, and returns a list of the results. (I make a good case below in List Comprehensions that map is pretty useless. It does, however, presents a good one line example.)
# 's

1squares = map(lambda a: a*a, [1,2,3,4,5])
2# squares is now [1,4,9,16,25]

Without a lambda, you'd have to define the function separately. You've just saved a line of code and a variable name (for the function).

Syntax: Lambda Functions

A lambda function has the syntax: lambda variable(s) : expression
variable(s) 	a comma-separated list variable or variables that the function can receive. You can't use keywords, and you don't want these to be in parentheses (a mistake I started making for a couple of months and wondered why my lambdas never worked).
expression 	an inline python expression. Scope includes local scope and variable(s). This is what the function returns.
```

### 34.1.2 Lists

#### 34.1.2.1 List Comprehensions

```text
If you've used Python for very long, you've at least heard of list comprehensions. They're a way to fit a for loop, an if statement, and an assignment all in one line. In other words, you can map and filter a list in one expression.
```

#### 34.1.2.2 Mapping the List

```text
We'll start with something really simple. Say you're trying to square every element in a list. A freshly-initiated Python programmer might write code like this:
# 's

1numbers = [1,2,3,4,5]
2squares = []
3for number in numbers:
4    squares.append(number*number)
5# Now, squares should have [1,4,9,16,25]

You've effectively 'mapped' one list to another list. You could also use the map function, and do something like this:
# 's

1numbers = [1,2,3,4,5]
2squares = map(lambda x: x*x, numbers)
3# Now, squares should have [1,4,9,16,25]

This code is definitely shorter (1 line instead of 3) but it's pretty ugly. It's hard to tell at a glance what the map function does (it accepts a function and a list, and applies the function to every element of that list). Plus, you have to give it a function of some sort which looks kind of messy. If only there were a cleaner way... perhaps a list comprehension:
# 's

1numbers = [1,2,3,4,5]
2squares = [number*number for number in numbers]
3# Now, squares should have [1,4,9,16,25]

This does the exact same thing as the previous two examples, but it's short (unlike the first example) and clean (unlike the second example). No one is going to have any problem determining what it does, even if they don't know Python.
```

#### 34.1.2.3 Filtering the List

```text
What if you're more interested in filtering the list? Say you want to remove every element with a value equal to or greater than 4? (Okay, so the examples aren't very realistic. Whatever...) A Python neophyte might write:
# 's

1numbers = [1,2,3,4,5]
2numbers_under_4 = []
3for number in numbers:
4    if number < 4:
5        numbers_under_4.append(number)
6# Now, numbers_under_4 contains [1,4,9]

Pretty simple, right? But it took 4 lines, two degrees of nesting, and an append to do something completely trivial. You could reduce the size of the code with the filter function:
# 's

1numbers = [1,2,3,4,5]
2numbers_under_4 = filter(lambda x: x < 4, numbers)
3# Now, numbers_under_4 contains [1,2,3]

Similar to the map function we talked about above, this reduces code size but is really ugly. What the hell is going on? Like map, filter accepts a function and a list. It evaluates for every list element and if the function evaluates to true, that list element is included in the final list. Of course, we can do this with a list comprehension as well:
# 's

1numbers = [1,2,3,4,5]
2numbers_under_4 = [number for number in numbers if number < 4]
3# Now, numbers_under_4 contains [1,2,3]

Again, using a list comprehension gives us shorter, cleaner, and easier to understand code.
```

#### 34.1.2.4 Map and Filter at Once

```text
Now we get to the true power of list comprehensions. If I haven't yet convinced you that map and filter are generally a waste of your time, hopefully this will.

Say I want to map and filter a list at the same time. In other words, I'd like to see the square of each element in the list where said element is under 4. Once more, the Python neophyte way:
# 's

1numbers = [1,2,3,4,5]
2squares = []
3for number in numbers:
4    if number < 4:
5        squares.append(number*number)
6# squares is now [1,4,9]

The code is starting to expand in the horizontal direction now! Alas, what could we possibly do to simplify the code? We could try using map and filter, but I don't have a good feeling about this...
# 's

1numbers = [1,2,3,4,5]
2squares = map(lambda x: x*x, filter(lambda x: x < 4, numbers))
3# squares is now [1,4,9]

While map and filter were ugly before, now they're just unreadable. Obviously this isn't a good idea. Once more, list comprehensions save the day:
# 's

1numbers = [1,2,3,4,5]
2squares = [number*number for number in numbers if number < 4]
3# square is now [1,4,9]

This is a bit longer than the earlier list comprehension examples, but in my opinion still very readable. It's definitely better than a for loop or using map and filter.

As you can see, a list comprehension filters then maps. If you absoulutely need to map then filter, things can get more complicated. You might even have to use nested list comprehensions, the map and filter commands, or a regular old for loop, depending on what is cleanest. That discussion, though, is outside the scope of this article.
```

#### 34.1.2.5 Generator Expressions

> Updated 2026-10 to current practice.[^py3-whatsnew]

A list comprehension builds the whole list in memory. A generator expression has the same syntax with parentheses instead of brackets, and it produces items lazily, one at a time. Generator expressions have existed since Python 2.4 and are now standard idiom, not "newish".

```python
numbers = (1, 2, 3, 4, 5)
squares_under_10 = (n * n for n in numbers if n * n < 10)
# a generator object; get the next value with next(squares_under_10)
# (Python 3 has no .next() method)

for square in squares_under_10:
    print(square, end=" ")
# prints '1 4 9 '
```

Use a generator expression when you consume the items once (a `for` loop, or `sum`, `any`, `all`, `max`, `"".join(...)`). Use a list comprehension when you need the whole list, such as for indexing, `len()` or iterating more than once. A generator can be consumed only once.

When a generator expression is the only argument to a call, it needs just one set of parentheses: `sum(n * n for n in numbers)`.

#### 34.1.2.6 Nested 'for' Statements

> Updated 2026-10 to current practice.[^py3-whatsnew]

Comprehensions can nest `for` clauses. They read left to right, just like the equivalent nested loops:

```python
for x in range(4):
    for y in range(4):
        if x < y:
            print((x, y, x * y), end=" ")
# prints (0, 1, 0) (0, 2, 0) (0, 3, 0) (1, 2, 2) (1, 3, 3) (2, 3, 6)

print([(x, y, x * y) for x in range(4) for y in range(4) if x < y])
# prints [(0, 1, 0), (0, 2, 0), (0, 3, 0), (1, 2, 2), (1, 3, 3), (2, 3, 6)]
```

The outer clause (`x`) runs first, and the inner clause (`y`) varies fastest. In Python 3, `range(4)` is lazy and replaces both the tuple `(0,1,2,3)` and Python 2's `xrange(4)`. For pairs drawn from one sequence, `itertools.combinations(range(4), 2)` is clearer still.

#### 34.1.2.7 Conclusion

```text
I hate to say it, but we've only scratched the surface of what list comprehensions and generator expressions can do. You really do have the full power of a for loop and an if statement. You can do anything (I think) that you could do in either of those. You can operate on anything that you want to start as a list (or any other iterable) and end as a list (or a generator), including lists of lists.

Syntax: List Comprehensions and Generator Expressions

A list comprehension has the syntax: [ element for variable(s) in list if condition ]

A generator expression has the syntax: ( element for variable(s) in list if condition )
list 	anything that can be treated as a list or iterator
variable(s) 	variable or variables to assign the current list element to, just like in a regular for loop
condition 	an inline python expression. Scope again includes local scope and variable(s). If this evaluates to true, item will be included in result.
element 	an inline python expression. Scope includes the local scope and variable(s). This is the actual element that will be included in the result.

The for variable(s) in list bit can be repeated indefinitely.
```

#### 34.1.2.8 Reducing a List

> Updated 2026-10 to current practice.[^py3-whatsnew]

There's no comprehension form of reduce (apply a function to the first two elements, then to that result and the next element, and so on). In Python 3, `reduce` is no longer a builtin. Import it from `functools`. Common reductions have dedicated functions such as `sum`, `max`, `min` and `math.prod` (3.8+)[^py-math-prod], so prefer those:

```python
from functools import reduce
import math
import operator

numbers = [1, 2, 3, 4, 5]

result = 1
for n in numbers:
    result *= n                               # 120 (explicit loop, often the most readable)

reduce(lambda a, b: a * b, numbers)           # 120
reduce(operator.mul, numbers, 1)              # 120; the initializer handles an empty list
math.prod(numbers)                            # 120 (Python 3.8+), the idiomatic choice
sum(numbers), max(numbers), min(numbers)      # dedicated builtins for the common cases
```

#### 34.1.2.9 Iterating over a List: range, xrange and enumerate

> Updated 2026-10 to current practice.[^py3-whatsnew]

Python 3 has no `xrange`. `range()` is now the lazy one: it returns a `range` object that computes values on demand, supports `len()`, indexing, slicing and `in`, and uses constant memory. Use `list(range(n))` when you really need a list.

```python
strings = ['a', 'b', 'c', 'd', 'e']

for index in range(len(strings)):
    print(index, end=" ")
# prints '0 1 2 3 4 '
```

Usually you need the elements as well as the indices. `enumerate` gives you both, and `start=` sets the first index:

```python
for index, string in enumerate(strings):
    print(index, string, end=" ")
# prints '0 a 1 b 2 c 3 d 4 e '

for lineno, string in enumerate(strings, start=1):
    ...
```

`enumerate` is cleaner than `range(len(...))`. Reach for `range` when you need a sequence of numbers that doesn't come from an existing list. To walk two lists in parallel, use `zip()` (lazy in Python 3; pass `strict=True` on 3.10+ to require equal lengths).

#### 34.1.2.10 Checking a Condition on Any or Every List Element

```text
Say you want to check to see if any element in a list satisfies a condition (say, it's below 10). Before Python 2.5, you could do something like this:
# 's

1numbers = [1,10,100,1000,10000]
2if [number for number in numbers if number < 10]:
3    print 'At least one element is over 10'
4# Output: 'At least one element is over 10'

If none of the elements satisfy the condition, the list comprehension will create an empty list which evaluates as false. Otherwise, a non-empty list will be created, which evaluates as true. Strictly, you don't need to evaluate every item in the list; you could bail after the first item that satisfies the condition. The method above, then, is less efficient, but might be your only choice if you can't commit to only Python 2.5 and need to squeeze all of this logic in one expression.

With the new built-in any function introduced in Python 2.5, you can do the same thing cleanly and efficiently. any is actually smart enough to bail and return True after the first item that satisfies the condition. Here, I use a generator expression that returns a True or False value for each element, and pass it to any. The generator expression only computes these values as they are needed, and any only requests the values it needs [2]:
# 's

1numbers = [1,10,100,1000,10000]
2if any(number < 10 for number in numbers):
3    print 'Success'
4# Output: 'Success!'

Similarly, you can check if every element satisfies a condition. Without Python 2.5, you'll have to do something like this:
# 's

1numbers = [1,2,3,4,5,6,7,8,9]
2if len(numbers) == len([number for number in numbers if number < 10]):
3    print 'Success!'
4# Output: 'Success!'

Here we filter with a list comprehension and check to see if we still have as many elements. If we do, then all of the elements satisfied the condition. Again, this is less efficient than it could be, because there is no need to keep checking after the first element that doesn't satisfy the condition. Also again, without Python 2.5 it might be your only choice for fitting all the logic in one expression.

With Python 2.5, there's of course an easier way: the built-in all function. As you might expect, it's smart enough to bail after the first element that doesn't match, returning False. This method works just like the any method described above.
# 's

1numbers = [1,2,3,4,5,6,7,8,9]
2if all(number < 10 for number in numbers):
3    print 'Success!'
4# Output: 'Success!'
```

#### 34.1.2.11 Combining Multiple Lists, Item by Item

```text
The built-in zip function can be used, well, to zip lists together. It returns a list of tuples, where the nth tuple contains the nth item from each of the passed in lists. This might be a case where an example is the best explanation:
# 's

1letters = ['a', 'b', 'c']
2numbers = [1, 2, 3]
3squares = [1, 4, 9]
4
5zipped_list = zip(letters, numbers, squares)
6# zipped_list contains [('a', 1, 1), ('b', 2, 4), ('c', 3, 9)]

Often you'll use this sort of thing as the iterator a for loop, pulling out all three values at once ('for letter, number, squares in zipped_list').
```

#### 34.1.2.12 A Few More List Operators

```text
The following are all built-in functions that can be called on any list or iterable.

max
    Returns the largest element in the list
min
    Returns the smallest element in the list
sum
    Returns the sum of all elements in the list. Accepts an optional second argument, the value to start with when summing (defaults to 0).
```

#### 34.1.2.13 Advanced Logic With Sets

```text
Now, I realize a section on sets doesn't really belong in a section on lists. But while I never find myself using sets for much, I occasionally need to do some set logic on a list I have lying around. Sets differ from lists in that they enforce uniqueness (they can't contain more than one of the same item) and are unordered. Sets also support a myriad of different logical operations.

The most common thing I want to do is to make sure my list is unique. This is easy; I just have to convert it to a set and check if the length is the same:
# 's

1numbers = [1,2,3,3,4,1]
2set(numbers)
3# returns set([1,2,3,4])
4
5if len(numbers) == len(set(numbers)):
6    print 'List is unique!'
7# In this case, doesn't print anything

Of course, you can convert the set back into a list, but remember that ordering is not preserved. For more information about the many operations sets support, check out the Python Docs. You'll want to use one or another of these operations on your lists or sets in the future.
```

### 34.1.3 Dictionaries

#### 34.1.3.1 Constructing Dictionaries with Keyword Arguments

```text
When initially learning Python, I completely missed this alternate way to create dictionaries. Any keyword arguments you pass to the dict constructor are added to the newly created dictionary before returning. Of course, you are limited to the keys that can be made into keyword arguments: valid Python variable names. Here's an example:
# 's

1dict(a=1, b=2, c=3)
2# returns {'a': 1, 'b': 2, 'c': 3}

This might be a bit cleaner than a 'regular' dictionary creation depending on your code; there are less quotes floating around. I use it often.
```

#### 34.1.3.2 Dicts to Lists

```text
Turning a dictionary into a list or an iterator is easy. To get a list of keys, you can just cast the dict into a list. It's cleaner, though to call .keys() on the dictionary to get a list of the keys, or .iterkeys() to get an iterator. Similarly, you can call .values() or .itervalues() to get a list or iterator of dictionary values. Remember though, that dicts are inherently unordered and so these values won't be in any meaningful order.

To preserve both keys and values, you can turn a dict into a list or iterator of 2-item tuples by using .items() or .iteritems(). This is something that you'll probably do a lot, and isn't very exciting:
# 's

1dictionary = {'a': 1, 'b': 2, 'c': 3}
2dict_as_list = dictionary.items()
3#dict_as_list now contains [('a', 1), ('b', 2), ('c', 3)]
```

#### 34.1.3.3 Lists to Dicts

```text
You can reverse the process, turning a list of 2-element lists or tuples into a dict:
# 's

1dict_as_list = [['a', 1], ['b', 2], ['c', 3]]
2dictionary = dict(dict_as_list)
3# dictionary now contains {'a': 1, 'b': 2, 'c': 3}

You can also combine this with the 'keyword arguments' method of creating a dictionary discussed above:
# 's

1dict_as_list = [['a', 1], ['b', 2], ['c', 3]]
2dictionary = dict(dict_as_list, d=4, e=5)
3# dictionary now contains {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}

Being able to convert a dict to a list is kind of handy, I guess. But what really makes it awesome is the next trick.
```

#### 34.1.3.4 'Dictionary Comprehensions'

> Updated 2026-10 to current practice.[^py3-whatsnew]

Python has real dictionary comprehensions (since 2.7/3.0, PEP 274), so the original workaround of calling `dict()` on a generator of `.iteritems()` pairs is obsolete. `iteritems()` doesn't exist in Python 3. Use `.items()`.

```python
emails = {'Dick': 'bob@example.com', 'Jane': 'jane@example.com', 'Stou': 'stou@example.net'}

email_at_dotcom = {name: email.endswith('.com') for name, email in emails.items()}
# {'Dick': True, 'Jane': True, 'Stou': False}
```

Set comprehensions work the same way: `{email.split('@')[1] for email in emails.values()}`.

### 34.1.4 Selecting Values

#### 34.1.4.1 The Right Way

```text
While writing this article, I stumbled upon the right way to select values inline, new in Python 2.5 (you'd think there would have been more fanfare!). Python now supports the syntax 'value_if_true if test else value_if_false'. So, you can do simple selection of values in one line, with no weird syntax or major caveats:
# 's

1test = True
2# test = False
3result = 'Test is True' if test else 'Test is False'
4# result is now 'Test is True'

Okay, it's a bit ugly still. Alas. You can also chain multiple tests in one line:
# 's

1test1 = False
2test2 = True
3result = 'Test1 is True' if test1 else 'Test1 is False, test2 is True' if test2 else 'Test1 and Test2 are both False'

The first if/else is evaluated first, and if test1 is false the second if/else is evaluated. You can do more complicated things too, especially if you throw in some parentheses.

Personal Note

This is pretty new on the field, and my reaction is mixed. It really is the Right Way, it's cleaner, and I like it... but it's still ugly especially if you have multiple nested if/else's.

Of course, the syntax for all of the value selection tricks is ugly.

I have soft spot for the and/or trick below, I actually find it very intuitive, now that I understand how it works. Also, it's not any less efficient than doing things the Right Way.

What do you think? Feel free to comment below.

Although the inline if/else is the new, more correct way, you'd better still check out the tricks below. Even if you only plan on programming in Python 2.5, you're still going to run into these in older code. Of course, if you need backwards compatibility or don't have Python 2.5, you'd really better check out the tricks below.
```

#### 34.1.4.2 The and/or Trick

```text
In Python, 'and' and 'or' are complex creatures. and-ing two expressions together doesn't just return True if both are true and False if both are false. Instead, 'and' returns the first false value, or the last value if all are true. In other words, if the first value is false it is returned, otherwise the last value is returned. The result of this is something you would expect: if both are true, the last value is returned, which is true and will evaluate to True in a boolean test (eg, an 'if' statement). If one is false, that one is returned and will evaluate to False in a boolean test.

or-ing two expressions together is similar. 'or' returns the first true value, or the last value if all are false. In other words, if the first value is true it is returned, otherwise the last value is returned. So, if both are false, the last value is returned, which is false and will evaluate to False in a boolean test. If one is true, that one is returned and will evaluate to True in a boolean test.

This doesn't help you much when we're just testing for truthfulness. But you can use 'and' and 'or' for other purposes in Python; my favorite is to select between values in a manner akin to C's ternary conditional assignment operator 'test ? value_if_true : value_if_false':
# 's

1test = True
2# test = False
3result = test and 'Test is True' or 'Test is False'
4# result is now 'Test is True'

How does this work? If test is true, the and statement skips over it and returns its right half, here 'Test is True' or 'Test is False'. As processing continues left to right, the or statement returns the first true value, 'Test is True'.

If test is false, the and statement returns test. As processing continues left to right, the remaining statement is test or 'Test is False'. Since test is false, the or statement skips over it and returns its right half, 'Test is False'.

Warning

Be careful that the middle (if_true) value is never false. If it is, the 'or' statement will always skip over it and always return the rightmost (if_false) value, no matter what the test value is.

Having gotten used to this method, 'The Right Way' (above) actually seems less intuitive to me. If you're not worried about backwards compatibility, I suggest you try both and see which one you like better. It's pretty easy to nest and/or tricks or to throw on extra and's or or's once you understand the logic behind it. If you can't decide or don't feel like learning both, then don't use and/or. Do things the Right Way, and be done with it.

Of course, if you need to support Python versions under 2.5, 'The Right Way' won't work. (I was tempted to say that it 'is The Wrong Way'). In that case the and/or trick is definitely your best bet for most situations.

Hopefully this all makes sense; it's hard to explain. It might seem complicated now, but if you use it a few times and play with 'and' and 'or' it will shortly make sense and you'll be able to come up with more complicated 'and' and 'or' tricks on your own.
```

#### 34.1.4.3 Using True and False as Indexes

```text
Another way to select values is to use True and False as list indexes, taking advantage of the fact that False == 0 and True == 1:
# 's

1test = True
2# test = False
3result = ['Test is False','Test is True'][test]
4# result is now 'Test is True'

This is more straightforward than the and/or trick, and free of the problem where the value_if_true must itself be true.

However, it also suffers from a significant flaw: both list items are evaluated before truthfulness is checked. For strings or other simple items, this is not a big deal. But if each item involves significant computation or I/O, you really don't want to do twice the work that you have to. For this reason I usually prefer the 'Right Way' or the and/or trick.

Also note that the index method only works when you know that test is False or True (or 0 or 1, but not any other integer or an arbitrary object). Otherwise you should write bool(test) instead of test to get the same behavior as the and/or trick expression above.
```

### 34.1.5 Functions

#### 34.1.5.1 Default Argument Values are Only Evaluated Once

```text
Let's start this section with a warning. Here's a problem that has confused many new Python writers, including myself, repeatedly, even after I figured out the problem... It's easy to be stupid about this (note that this isn't the world's best example, but it illustrates the point):
# 's

1def function(item, stuff = []):
2    stuff.append(item)
3    print stuff
4
5function(1)
6# prints '[1]'
7
8function(2)
9# prints '[1,2]' !!!

The default value for a function argument is only evaluated once, when the function is defined. Python simply assigns this value to the correct variable name when the function is called.

Python doesn't check if that value (that location in memory) was changed. It just continues to assign that value to any caller that needs it. So, if the value is changed, the change will persist across function calls. Above, when we appended a value to the list represented by stuff, we actually changed the default value for all eternity. When we called function again looking for a default value, the modified default was given to us.

The solution: don't use mutable objects as function defaults. You might be able to get away with it if you don't modify them, but it's still not a good idea.

A better way to write the above code would be:
# 's

 1def function(item, stuff = None):
 2    if stuff is None:
 3        stuff = []
 4    stuff.append(item)
 5    print stuff
 6
 7function(1)
 8# prints '[1]'
 9
10function(2)
11# prints '[2]', as expected

None is immutable (and we're not trying to change it anyways), so we're safe from accidently changing value of the default.

On the plus side, a clever programmer could probably turn this into a trick, in effect creating C-style 'static variables'.
```

#### 34.1.5.2 Force Default Arguments to be Evaluated Each Time

```text
If you prefer less cluttered functions at the cost of some clarity, you can forcefully re-evaluate the default arguments before each function call. The following decorator stores the original values of the default arguments. It can be used to wrap a function and reset the default arguments before each call. [3]
# 's

1from copy import deepcopy
2
3def resetDefaults(f):
4    defaults = f.func_defaults
5    def resetter(*args, **kwds):
6        f.func_defaults = deepcopy(defaults)
7        return f(*args, **kwds)
8    resetter.__name__ = f.__name__
9    return resetter

Simply apply this decorator to your function to get the expected results.
# 's

 1@resetDefaults # This is how you apply a decorator
 2def function(item, stuff = []):
 3    stuff.append(item)
 4    print stuff
 5
 6function(1)
 7# prints '[1]'
 8
 9function(2)
10# prints '[2]', as expected
```

#### 34.1.5.3 Arbitrary Numbers of Arguments

```text
Python lets you have arbitrary numbers of arguments in your functions. First define any required arguments (if any), then use a variable with a '*' prepended to it. Python will take the rest of the non-keyword arguments, put them in a list or tuple, and assign them to this variable:
# 's

1def do_something(a, b, c, *args):
2    print a, b, c, args
3
4do_something(1,2,3,4,5,6,7,8,9)
5# prints '1, 2, 3, (4, 5, 6, 7, 8, 9)'

Why would you want to do this? A common reason is that your function accepts a number of items and does the same thing with all of them (say, sums them up). You could force the user to pass a list: sum_all([1,2,3]) or you could allow them to use an arbitrary number of arguments, which makes for cleaner code: sum_all(1,2,3).

You can also have arbitrary numbers of keyword arguments. After you've defined all other arguments, use a variable with '**' prepended to it. Python will take the rest of the keyword arguments, put them in a dictionary, and assign them to this variable:
# 's

1def do_something_else(a, b, c, *args, **kwargs):
2    print a, b, c, args, kwargs
3
4do_something_else(1,2,3,4,5,6,7,8,9, timeout=1.5)
5# prints '1, 2, 3, (4, 5, 6, 7, 8, 9), {"timeout": 1.5}'

Why would you want to do this? I think the most common reason is if your function is a wrapper for some other function or functions, any keyword arguments that you use can be popped off the dictionary and the remainder of the keyword arguments can be passed to the other function(s) (see Passing a List or Dictionary as Arguments, below)
```

#### 34.1.5.4 Caveat

```text
Passing both arbitrary non-keyword arguments and named (non-arbitrary) keyword arguments in one function is seemingly impossible. This is because named keyword arguments must be defined before the '*' parameter in the function definition, and are filled before that parameter is filled. For example, imagine a function:
# 's

1def do_something(a, b, c, actually_print = True, *args):
2    if actually_print:
3        print a, b, c, args

We now have a problem: there is no way to specify 'actually_print' as a named keyword argument while simultaneously providing arbitrary non-keyword arguments. Both of the following will error:
# 's

1do_something(1, 2, 3, 4, 5, actually_print = True)
2# actually_print is initially set to 4 (see why?) and then re-set,
3# causing a TypeError ('got multiple values for keyword argument')
4
5do_something(1, 2, 3, actually_print = True, 4, 5, 6)
6# This is not allowed as keyword arguments may not precede non-keyword arguments.  A SyntaxError is raised.

The only way to pass 'actually_print' in this situation is to pass it as a non-keyword argument:
# 's

1do_something(1, 2, 3, True, 4, 5, 6)
2# Result is '1, 2, 3, (4, 5, 6)'
```

#### 34.1.5.5 Passing a List or Dictionary as Arguments

```text
Since you can receive arguments as a list or dictionary, it's not terribly surprising, I suppose, that you can send arguments to a function from a list or dictionary. The syntax is exactly the same as above.

To send a list as non-keyword arguments, just prepend it with a '*':
# 's

1args = [5,2]
2pow(*args)
3# returns pow(5,2), meaning 5^2 which is 25

And, of course, to send a dictionary as keyword arguments (this is probably more common), prepend it with '**':
# 's

 1def do_something(actually_do_something=True, print_a_bunch_of_numbers=False):
 2    if actually_do_something:
 3        print 'Something has been done'
 4        #
 5        if print_a_bunch_of_numbers:
 6            print range(10)
 7
 8kwargs = {'actually_do_something': True, 'print_a_bunch_of_numbers': True}
 9do_something(**kwargs)
10
11# prints 'Something has been done', then '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]'

Historical footnote: In older versions of Python (pre-2.3) you called functions with arbitrary arguments using the built-in apply (function, arg_list, keyword_arg_dict)'.
```

#### 34.1.5.6 Decorators

```text
Function decorators are fairly simple, but if you've never seen them before you'll have no idea what's going on, as unlike most of Python the syntax isn't very clear. A decorator is a function that wraps another function: the main function is called and its return value is passed to the decorator. The decorator then returns a function that replaces the wrapped function as far as the rest of the program is concerned.

Without further delay, here is the syntax:
# 's

 1def decorator1(func):
 2    return lambda: func() + 1
 3
 4def decorator2(func):
 5    def print_func():
 6        print func()
 7    return print_func
 8
 9@decorator2
10@decorator1
11def function():
12    return 41
13
14function()
15# prints '42'

In this example, 'function' is passed to 'decorator1'. 'decorator1' returns a function that calls 'function' and adds 1. This function is then passed to 'decorator2', which returns a function that calls the function returned by 'decorator1' and prints the result. This last function is the function you are actually calling when you call 'function'. Whew.

This example does the exact same thing, but more verbosely and without decorators:
# 's

 1def decorator1(func):
 2    return lambda: func() + 1
 3
 4def decorator2(func):
 5    def print_func():
 6        print func()
 7    return print_func
 8
 9def function():
10    return 41
11
12function = decorator2(decorator1(function))
13
14function()
15# prints '42'

Typically decorators are used to add abilities to your functions (see Creating Class Methods, below). But even more typically, they're not used at all. But it's good to know what you're looking at.

For more information, check out my article Python Decorators Don't Have to be (that) Scary, Python Decorators on Dr. Dobbs or "Function Definitions" in the Python Docs
```

#### 34.1.5.7 'Switch Statements' using Dictionaries of Functions

```text
Ever miss the switch statement? As you probably know, Python doesn't really have a syntactical equivalent, unless you count repeated elif's. What you might not know, though, is that you can replicate the behavior (if not the cleanliness) of the switch statement by creating a dictionary of functions keyed by the value you want to switch on.

For example, say you're handling keystrokes and you need to call a different function for each keystroke. Also say you've already defined these three functions:
# 's

 1def key_1_pressed():
 2    print 'Key 1 Pressed'
 3
 4def key_2_pressed():
 5    print 'Key 2 Pressed'
 6
 7def key_3_pressed():
 8    print 'Key 3 Pressed'
 9
10def unknown_key_pressed():
11    print 'Unknown Key Pressed'

In Python, you would typically use elif's to choose a function:
# 's

 1keycode = 2
 2if keycode == 1:
 3   key_1_pressed()
 4elif keycode == 2:
 5   key_2_pressed()
 6elif number == 3:
 7   key_3_pressed()
 8else:
 9   unknown_key_pressed()
10# prints 'Key 2 Pressed'

But you could also throw all the functions in a dictionary, and key them to the value you're switching on. You could even check see if the key exists and run some code if it doesn't:
# 's

1keycode = 2
2functions = {1: key_1_pressed, 2: key_2_pressed, 3: key_3_pressed}
3functions.get(keycode, unknown_key_pressed)()

You can see that this could be a lot cleaner than the elif example for large numbers of functions.
```

### 34.1.6 Classes

#### 34.1.6.1 Passing 'self' Manually

```text
Methods are just regular functions that when called from an instance are passed that instance as the first argument (usually called 'self'). If for some reason you're not calling the function from an instance, you can always pass the instance manually as the first argument. For example:
# 's

 1class Class:
 2    def a_method(self):
 3        print 'Hey a method'
 4
 5instance = Class()
 6
 7instance.a_method()
 8# prints 'Hey a method', somewhat unsuprisingly.  You can also do:
 9
10Class.a_method(instance)
11# prints 'Hey a method'

Internally, these statements are exactly the same.
```

#### 34.1.6.2 Checking for Property and Method Existence

```text
Need to know if a particular class or instance has a particular property or method? You can use the built-in 'hasattr' function to check; it accepts the object and the attribute (as a string) to check for. You use similarly to the dict 'has_key' method (although it works completely differently):
# 's

1class Class:
2    answer = 42
3
4hasattr(Class, 'answer')
5# returns True
6hasattr(Class, 'question')
7# returns False

You can also check for existence of and access the property in one step using the built-in function 'getattr'. getattr also accepts the object and the attribute, as a string, to check for. It has an optional third argument, giving the default if the attribute is not found. Unlike the dict's 'get' method that you might be more familiar with, if the default is not given and the attribute is not found, an AttributeError is raised:
# 's

1class Class:
2    answer = 42
3
4getattr(Class, 'answer')
5# returns 42
6getattr(Class, 'question', 'What is six times nine?')
7# returns 'What is six times nine?'
8getattr(Class, 'question')
9# raises AttributeError

Don't overuse hasattr and getattr. If you've written your class in manner where you need to keep checking to see if a property exists, you've written it wrong. Just always have the value exist and set it to None (or whatever) if it's not being used. These functions are best used for handling polymorphism, that is, allowing your function/class/whatever to support different kinds of objects.
```

#### 34.1.6.3 Modifying Classes After Creation

```text
You can add, modify, or delete a class property or method long after the class has been created, and even after it has been instantiated. Just access the property or method as Class.attribute. No matter when they were created, instances of the class will respect these changes:
# 's

 1class Class:
 2   def method(self):
 3        print 'Hey a method'
 4
 5instance = Class()
 6instance.method()
 7# prints 'Hey a method'
 8
 9def new_method(self):
10    print 'New method wins!'
11
12Class.method = new_method
13instance.method()
14# prints 'New method wins!'

Pretty awesome. But don't get carried away with modifying preexisting methods, it's bad form and can confuse the crap out of any objects using that class. On the other hand, adding methods is a lot less (but still somewhat) dangerous.
```

#### 34.1.6.4 Creating Class Methods

```text
Occasionally when writing a class you want to include a function that is called from the class, not the instance. Perhaps this method creates new instances, or perhaps it is independent of any properties of any individual instance. Python actually gives you two ways to do this, depending if your method needs to (or should) know about which class called it. Both involve applying decorators to your methods.

A 'class method' receives the class as the first argument, just as a regular instance method receives the instance as the first argument. So, the method is aware if it is being called from its own class or from a subclass.

A 'static method' receives no information about where it is called; it is essentially a regular function, just in a different scope.

Class and static methods can be called straight from the class, as Class.method(), or from an instance as Class().method(). The instance is ignored except for its class. Here's an example of each, along with a regular instance method:
# 's

 1class Class:
 2    @classmethod
 3    def a_class_method(cls):
 4        print 'I was called from class %s' % cls
 5    #
 6    @staticmethod
 7    def a_static_method():
 8        print 'I have no idea where I was called from'
 9    #
10    def an_instance_method(self):
11        print 'I was called from the instance %s' % self
12
13instance = Class()
14
15Class.a_class_method()
16instance.a_class_method()
17# both print 'I was called from class __main__.Class'
18
19Class.a_static_method()
20instance.a_static_method()
21# both print 'I have no idea where I was called from'
22
23Class.an_instance_method()
24
25# raises TypeError
26instance.an_instance_method()
27# prints something like 'I was called from the instance <__main__.Class instance at 0x2e80d0>'
```

[^py3-whatsnew]: What's New In Python 3.0
[^py-math-prod]: math.prod — Python 3 documentation
