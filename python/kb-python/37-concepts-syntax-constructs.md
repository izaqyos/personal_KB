---
type: reference
title: "Concepts, syntax constructs"
description: "Legacy Python KB section: Concepts, syntax constructs (List comprehension, With as statement, Understanding Python's \"with\" statement)"
tags: [python, legacy, reference]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#37"
---

# Concepts, syntax constructs

[↑ KB_python](/python/kb-python/README.md)

## 37.1 List comprehension

```text
List comprehensions provide a concise way to create lists. Common applications are to make new lists where each element is the result of some operations applied to each member of another sequence or iterable, or to create a subsequence of those elements that satisfy a certain condition.

For example, assume we want to create a list of squares, like:
>>>

>>> squares = []
>>> for x in range(10):
...     squares.append(x**2)
...
>>> squares
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

We can obtain the same result with:

squares = [x**2 for x in range(10)]

This is also equivalent to squares = map(lambda x: x**2, range(10)), but it’s more concise and readable.

A list comprehension consists of brackets containing an expression followed by a for clause, then zero or more for or if clauses. The result will be a new list resulting from evaluating the expression in the context of the for and if clauses which follow it. For example, this listcomp combines the elements of two lists if they are not equal:
>>>

>>> [(x, y) for x in [1,2,3] for y in [3,1,4] if x != y]
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

and it’s equivalent to:
>>>

>>> combs = []
>>> for x in [1,2,3]:
...     for y in [3,1,4]:
...         if x != y:
...             combs.append((x, y))
...
>>> combs
[(1, 3), (1, 4), (2, 3), (2, 1), (2, 4), (3, 1), (3, 4)]

Note how the order of the for and if statements is the same in both these snippets.

If the expression is a tuple (e.g. the (x, y) in the previous example), it must be parenthesized.
>>>

>>> vec = [-4, -2, 0, 2, 4]
>>> # create a new list with the values doubled
>>> [x*2 for x in vec]
[-8, -4, 0, 4, 8]
>>> # filter the list to exclude negative numbers
>>> [x for x in vec if x >= 0]
[0, 2, 4]
>>> # apply a function to all the elements
>>> [abs(x) for x in vec]
[4, 2, 0, 2, 4]
>>> # call a method on each element
>>> freshfruit = ['  banana', '  loganberry ', 'passion fruit  ']
>>> [weapon.strip() for weapon in freshfruit]
['banana', 'loganberry', 'passion fruit']
>>> # create a list of 2-tuples like (number, square)
>>> [(x, x**2) for x in range(6)]
[(0, 0), (1, 1), (2, 4), (3, 9), (4, 16), (5, 25)]
>>> # the tuple must be parenthesized, otherwise an error is raised
>>> [x, x**2 for x in range(6)]
  File "<stdin>", line 1
    [x, x**2 for x in range(6)]
               ^
SyntaxError: invalid syntax
>>> # flatten a list using a listcomp with two 'for'
>>> vec = [[1,2,3], [4,5,6], [7,8,9]]
>>> [num for elem in vec for num in elem]
[1, 2, 3, 4, 5, 6, 7, 8, 9]

List comprehensions can contain complex expressions and nested functions:
>>>

>>> from math import pi
>>> [str(round(pi, i)) for i in range(1, 6)]
['3.1', '3.14', '3.142', '3.1416', '3.14159']
```

## 37.2 With as statement

### 37.2.1 Understanding Python's "with" statement

```text
Fredrik Lundh | October 2006 | Originally posted to online.effbot.org

Judging from comp.lang.python and other forums, Python 2.5’s new with statement seems to be a bit confusing even for experienced Python programmers.

As most other things in Python, the with statement is actually very simple, once you understand the problem it’s trying to solve. Consider this piece of code:

    set things up
    try:
        do something
    finally:
        tear things down

Here, “set things up” could be opening a file, or acquiring some sort of external resource, and “tear things down” would then be closing the file, or releasing or removing the resource. The try-finally construct guarantees that the “tear things down” part is always executed, even if the code that does the work doesn’t finish.

If you do this a lot, it would be quite convenient if you could put the “set things up” and “tear things down” code in a library function, to make it easy to reuse. You can of course do something like

    def controlled_execution(callback):
        set things up
        try:
            callback(thing)
        finally:
            tear things down

    def my_function(thing):
        do something

    controlled_execution(my_function)

But that’s a bit verbose, especially if you need to modify local variables. Another approach is to use a one-shot generator, and use the for-in statement to “wrap” the code:

    def controlled_execution():
        set things up
        try:
            yield thing
        finally:
            tear things down

    for thing in controlled_execution():
        do something with thing

But yield isn’t even allowed inside a try-finally in 2.4 and earlier. And while that could be fixed (and it has been fixed in 2.5), it’s still a bit weird to use a loop construct when you know that you only want to execute something once.

So after contemplating a number of alternatives, GvR and the python-dev team finally came up with a generalization of the latter, using an object instead of a generator to control the behaviour of an external piece of code:

    class controlled_execution:
        def __enter__(self):
            set things up
            return thing
        def __exit__(self, type, value, traceback):
            tear things down

    with controlled_execution() as thing:
         some code

Now, when the “with” statement is executed, Python evaluates the expression, calls the __enter__ method on the resulting value (which is called a “context guard”), and assigns whatever __enter__ returns to the variable given by as. Python will then execute the code body, and no matter what happens in that code, call the guard object’s __exit__ method.

As an extra bonus, the __exit__ method can look at the exception, if any, and suppress it or act on it as necessary. To suppress the exception, just return a true value. For example, the following __exit__ method swallows any TypeError, but lets all other exceptions through:

    def __exit__(self, type, value, traceback):
        return isinstance(value, TypeError)

In Python 2.5, the file object has been equipped with __enter__ and __exit__ methods; the former simply returns the file object itself, and the latter closes the file:

    >>> f = open("x.txt")
    >>> f
    <open file 'x.txt', mode 'r' at 0x00AE82F0>
    >>> f.__enter__()
    <open file 'x.txt', mode 'r' at 0x00AE82F0>
    >>> f.read(1)
    'X'
    >>> f.__exit__(None, None, None)
    >>> f.read(1)
    Traceback (most recent call last):
      File "<stdin>", line 1, in <module>
    ValueError: I/O operation on closed file

so to open a file, process its contents, and make sure to close it, you can simply do:

with open("x.txt") as f:
    data = f.read()
    do something with data

This wasn’t very difficult, was it?
```

### 37.2.2 The with statement

```text
New in version 2.5.

The with statement is used to wrap the execution of a block with methods defined by a context manager (see section With Statement Context Managers). This allows common try...except...finally usage patterns to be encapsulated for convenient reuse.

with_stmt ::=  "with" with_item ("," with_item)* ":" suite
with_item ::=  expression ["as" target]

The execution of the with statement with one “item” proceeds as follows:

    The context expression (the expression given in the with_item) is evaluated to obtain a context manager.

    The context manager’s __exit__() is loaded for later use.

    The context manager’s __enter__() method is invoked.

    If a target was included in the with statement, the return value from __enter__() is assigned to it.

    Note

    The with statement guarantees that if the __enter__() method returns without an error, then __exit__() will always be called. Thus, if an error occurs during the assignment to the target list, it will be treated the same as an error occurring within the suite would be. See step 6
The with statement

New in version 2.5.

The with statement is used to wrap the execution of a block with methods defined by a context manager (see section With Statement Context Managers). This allows common try...except...finally usage patterns to be encapsulated for convenient reuse.

with_stmt ::=  "with" with_item ("," with_item)* ":" suite
with_item ::=  expression ["as" target]

The execution of the with statement with one “item” proceeds as follows:

    The context expression (the expression given in the with_item) is evaluated to obtain a context manager.

    The context manager’s __exit__() is loaded for later use.

    The context manager’s __enter__() method is invoked.

    If a target was included in the with statement, the return value from __enter__() is assigned to it.

    Note

    The with statement guarantees that if the __enter__() method returns without an error, then __exit__() will always be called. Thus, if an error occurs during the assignment to the target list, it will be treated the same as an error occurring within the suite would be. See step 6 below.

    The suite is executed.

    The context manager’s __exit__() method is invoked. If an exception caused the suite to be exited, its type, value, and traceback are passed as arguments to __exit__(). Otherwise, three None arguments are supplied.

    If the suite was exited due to an exception, and the return value from the __exit__() method was false, the exception is reraised. If the return value was true, the exception is suppressed, and execution continues with the statement following the with statement.

    If the suite was exited for any reason other than an exception, the return value from __exit__() is ignored, and execution proceeds at the normal location for the kind of exit that was taken.

With more than one item, the context managers are processed as if multiple with statements were nested:

with A() as a, B() as b:
    suite

is equivalent to

with A() as a:
    with B() as b:
        suite

Note

In Python 2.5, the with statement is only allowed when the with_statement feature has been enabled. It is always enabled in Python 2.6.

Changed in version 2.7: Support for multiple context expressions.


		37.2.3
	37.3
```
