---
type: reference
title: "rwordsAssignment, Expressions, and print"
description: "Learning Python 3rd ed. notes, rwordsAssignment, Expressions, and print"
tags: [python, book-notes, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "python/KB_python#30.2.2"
---

# 30.2.2. rwordsAssignment, Expressions, and print

> **Deprecated (2026-10):** Book edition notes (Python 2.x era). Current: Python 3 print(), except as, dict.items(); Py2 EOL 2020. Source: <https://www.python.org/doc/sunset-python-2/>

[↑ Statements and Syntax](/python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/README.md)

```text
Now that we've had a quick introduction to Python statement syntax, this chapter begins our in-depth tour of specific Python statements. We'll begin with the basics-assignments, expression statements, and printing. We've already seen all these in action, but here, we'll fill in important details we've skipped so far. Although they're fairly simple, as you'll see, there are optional variations for each of these statement types that will come in handy once you begin writing real Python programs.
```

#### 30.2.2.1 Assignment Statements

```text
We've been using the Python assignment statement for a while to assign objects to names. In its basic form, you write the target of an assignment on the left of an equals sign, and the object to be assigned on the right. The target on the left may be a name or object component, and the object on the right can be an arbitrary expression that computes an object. For the most part, assignments are straightforward, but here are a few properties to keep in mind:

    * Assignments create object references. As discussed in Chapter 6, Python assignments store references to objects in names or data structure components. They always create references to objects instead of copying the objects. Because of that, Python variables are more like pointers than data storage areas.
    * Names are created when first assigned. Python creates variable names the first time you assign them a value (i.e., an object reference), so there's no need to predeclare names ahead of time. Some (but not all) data structure slots are created when assigned, too (e.g., dictionary entries, some object attributes). Once assigned, a name is replaced with the value it references whenever it appears in an expression.
    * Names must be assigned before being referenced. It's an error to use a name to which you haven't yet assigned a value. Python raises an exception if you try, rather than returning some sort of ambiguous default value; if it returned a default instead, it would be more difficult for you to spot typos in your code.
    * Implicit assignments:import, from, def, class, for, function arguments. In this section, we're concerned with the = statement, but assignment occurs in many contexts in Python. For instance, we'll see later that module imports, function and class definitions, for loop variables, and function arguments are all implicit assignments. Because assignment works the same everywhere it pops up, all these contexts simply bind names to object references at runtime.
```

#### 30.2.2.1.1 Assignment Statement Forms

```text
Although assignment is a general and pervasive concept in Python, we are primarily interested in assignment statements in this chapter. Table 11-1 illustrates the different assignment statement forms in Python.

Table 11-1. Assignment statement forms
Operation 	Interpretation
spam = 'Spam' 	Basic form
spam, ham = 'yum', 'YUM' 	Tuple assignment (positional)
[spam, ham] = ['yum', 'YUM'] 	List assignment (positional)
a, b, c, d = 'spam' 	Sequence assignment, generalized
spam = ham = 'lunch' 	Multiple-target assignment
spams += 42 	Augmented assignment (equivalent to spams = spams + 42)

The first form in Table 11-1 is by far the most common: binding a name (or data structure component) to a single object. The other table entries represent special and optional forms that programmers often find convenient:


Tuple- and list-unpacking assignments

    The second and third forms in the table are related. When you code tuples or lists on the left side of the =, Python pairs objects on the right side with targets on the left by position, and assigns them from left to right. For example, in the second line of the table, the name spam is assigned the string 'yum', and the name ham is bound to the string 'YUM'. Internally, Python makes a tuple of the items on the right first, so this is often called a tuple-unpacking assignment.

Sequence assignments

    In recent versions of Python, tuple and list assignments have been generalized into instances of what we now call sequence assignment-any sequence of names can be assigned to any sequence of values, and Python assigns the items one at a time by position. In fact, we can mix and match the types of the sequences involved. The fourth line in Table 11-1, for example, pairs a tuple of names with a string of characters: a is assigned 's', b is assigned 'p', and so on.

Multiple-target assignments

    The fifth line in Table 11-1 shows the multiple-target form of assignment. In this form, Python assigns a reference to the same object (the object farthest to the right) to all the targets on the left. In the table, the names spam and ham are both assigned references to the same string object, 'lunch'. The effect is the same as if we coded ham = 'lunch' followed by spam = ham, as ham evaluates to the original string object (i.e., not a separate copy of that object).

Augmented assignments

    The last line in Table 11-1 is an example of augmented assignment-a shorthand that combines an expression and an assignment in a concise way. Saying spam += 42, for example, has the same effect as spam = spam + 42, but the augmented form requires less typing, and is generally quicker to run. There's one augmented assignment statement for every binary expression operator in Python.
```

#### 30.2.2.1.2 Sequence Assignments

```text
We've already used basic assignments in this book. Here are a few simple examples of sequence-unpacking assignments in action:


% python 
>>> nudge = 1 
>>> wink  = 2 
>>> A, B = nudge, wink  # Tuple assignment
>>> A, B  # Like A = nudge; B = wink
(1, 2)
>>> [C, D] = [nudge, wink]  # List assignment
>>> C, D 
(1, 2)


Notice that we really are coding two tuples in the third line in this interaction-we've just omitted their enclosing parentheses. Python pairs the values in the tuple on the right side of the assignment operator with the variables in the tuple on the left side, and assigns the values one at a time.

Tuple assignment leads to a common coding trick in Python that was introduced in a solution to the exercises from Part 2. Because Python creates a temporary tuple that saves the original values of the variables on the right while the statement runs, unpacking assignments are also a way to swap two variables' values without creating a temporary variable of your own-the tuple on the right remembers the prior values of the variables automatically:


>>> nudge = 1 
>>> wink  = 2 
>>> nudge, wink = wink, nudge  # Tuples: swaps values
>>> nudge, wink  # Like T = nudge; nudge = wink; wink = T
(2, 1)


In fact, the original tuple and list assignment forms in Python were eventually generalized to accept any type of sequence on the right as long as it is of the same length. You can assign a tuple of values to a list of variables, a string of characters to a tuple of variables, and so on. In all cases, Python assigns items in the sequence on the right to variables in the sequence on the left by position, from left to right:


>>> [a, b, c] = (1, 2, 3)  # Assign tuple of values to list of names
>>> a, c 
(1, 3)
>>> (a, b, c) = "ABC"  # Assign string of characters to tuple
>>> a, c 
('A', 'C')


Technically speaking, sequence assignment actually supports any iterable object on the right, not just any sequence. This is a more general concept that we will explore in Chapter 13 and Chapter 17.
```

#### 30.2.2.1.2.1 Advanced sequence assignment patterns

```text
One note here-although we can mix and match sequence types around the = symbol, we still must have the same number of items on the right as we have variables on the left, or we'll get an error:


>>> string = 'SPAM' 
>>> a, b, c, d = string  # Same number on both sides
>>> a, d 
('S', 'M')

>>> a, b, c = string  # Error if not...error text omitted... 
ValueError: too many values to unpack


To be more general, we need to slice. There are a variety of ways to employ slicing to make this last case work:


>>> a, b, c = string[0], string[1], string[2:]  # Index and slice
>>> a, b, c 
('S', 'P', 'AM')

>>> a, b, c = list(string[:2]) + [string[2:]]  # Slice and concatenate
>>> a, b, c 
('S', 'P', 'AM')

>>> a, b = string[:2]  # Same, but simpler
>>> c = string[2:] 
>>> a, b, c 
('S', 'P', 'AM')

>>> (a, b), c = string[:2], string[2:]  # Nested sequences
>>> a, b, c 
('S', 'P', 'AM')


As the last example in this interaction demonstrates, we can even assign nested sequences, and Python unpacks their parts according to their shape, as expected. In this case, we are assigning a tuple of two items, where the first item is a nested sequence (a string) exactly as though we had coded it this way:


>>> ((a, b), c) = ('SP', 'AM')  # Paired up by shape and position
>>> a, b, c 
('S', 'P', 'AM')


Python pairs the first string on the right ('SP') with the first tuple on the left ((a, b)), and assigns one character at a time, before assigning the entire second string ('AM') to the variable c all at once. In this event, the sequence-nesting shape of the object on the left must match that of the object on the right. Nested sequence assignment like this is somewhat advanced, and rare to see, but it can be convenient for picking out the parts of data structures with known shapes. For example, this technique also works in function argument lists because function arguments are passed by assignment (as we'll see in the next part of the book).

Sequence-unpacking assignments also give rise to another common coding idiom in Python-assigning an integer series to a set of variables:


>>> red, green, blue = range(3)
>>> red, blue
(0, 2)


This initializes the three names to the integer codes 0, 1, and 2, respectively (it's Python's equivalent of the enumerated data types you may have seen in other languages). To make sense of this, you need to know that the range built-in function generates a list of successive integers:


>>> range(3)  # Try list(range(3)) in Python 3.0
[0, 1, 2]


Because range is commonly used in for loops, we'll say more about it in Chapter 13. Another place you may see a tuple assignment at work is for splitting a sequence into its front and the rest in loops like this:


>>> L = [1, 2, 3, 4]
>>> while L:
...     front, L = L[0], L[1:]
...     print front, L
...
1 [2, 3, 4]
2 [3, 4]
3 [4]
4 []


The tuple assignment in the loop here could be coded as the following two lines instead, but it's often more convenient to string them together:


...     front = L[0]
...     L = L[1:]


Notice that this code is using the list as a sort of stack data structure-something we can often also achieve with the append and pop methods of list objects; here, front = L.pop(0) would have much the same effect as the tuple assignment statement, but it would be an in-place change. We'll learn more about while loops, and other (and often better) ways to step through a sequence with for loops, in Chapter 13.
```

#### 30.2.2.1.3 Multiple-Target Assignments

```text
A multiple-target assignment simply assigns all the given names to the object all the way to the right. The following, for example, assigns the three variables a, b, and c to the string 'spam':


>>> a = b = c = 'spam'
>>> a, b, c
('spam', 'spam', 'spam')


This form is equivalent to (but easier to code) than these three assignments:


>>> c = 'spam'
>>> b = c
>>> a = b
```

#### 30.2.2.1.3.1 Multiple-target assignment and shared references

```text
Keep in mind that there is just one object here, shared by all three variables (they all wind up pointing to the same object in memory). This behavior is fine for immutable types-initializing a set of counters to zero, for example (recall that variables must be assigned before they can be used in Python, so you must initialize counters to zero before you can start adding to them):


>>> a = b = 0
>>> b = b + 1
>>> a, b
(0, 1)


Here, changing b only changes b because numbers do not support in-place changes. As long as the object assigned is immutable, it's irrelevant if more than one name references it.

As usual, though, we have to be more cautious when initializing variables to an empty mutable object such as a list or dictionary:


>>> a = b = []
>>> b.append(42)
>>> a, b
([42], [42])


This time, because a and b reference the same object, appending to it in-place through b will impact what we see through a as well. This is really just another example of the shared reference phenomenon we first met in Chapter 6. To avoid the issue, initialize mutable objects in separate statements instead, so that each creates a distinct empty object by running a distinct literal expression:


>>> a = []
>>> b = []
>>> b.append(42)
>>> a, b
([], [42])
```

#### 30.2.2.1.4 Augmented Assignments

```text
Beginning with Python 2.0, the set of additional assignment statement formats listed in Table 11-2 became available. Known as augmented assignments, and borrowed from the C language, these formats are mostly just shorthand. They imply the combination of a binary expression, and an assignment. For instance, the following two formats are now roughly equivalent:


X = X + Y                  # Traditional form
X += Y                     # Newer augmented form


Table 11-2. Augmented assignment statements
X += Y 	X &= Y 	X -= Y 	X |= Y
X *= Y 	X ^= Y 	X /= Y 	X >>= Y
X %= Y 	X <<= Y 	X **= Y 	X //= Y

Augmented assignment works on any type that supports the implied binary expression. For example, here are two ways to add 1 to a name:


>>> x = 1 
>>> x = x + 1  # Traditional
>>> x 
2
>>> x += 1  # Augmented
>>> x 
3


When applied to a string, the augmented form performs concatenation instead. Thus, the second line here is equivalent to typing the longer S = S + "SPAM":


>>> S = "spam" 
>>> S += "SPAM"  # Implied concatenation
>>> S 
'spamSPAM'


As shown in Table 11-2, there are analogous augmented assignment forms for every Python binary expression operator (i.e., each operator with values on the left and right side). For instance, X *= Y multiplies and assigns, X >>= Y shifts right and assigns, and so on. X //= Y (for floor division) was added in version 2.2.

Augmented assignments have three advantages:[31]

    [31] * C/C++ programmers take note: although Python now supports statements like X += Y, it still does not have C's auto-increment/decrement operators (e.g., X++, --X). These don't quite map to the Python object model because Python has no notion of in-place changes to immutable objects like numbers.

    * There's less for you to type. Need I say more?
    * The left side only has to be evaluated once. In X += Y, X may be a complicated object expression. In the augmented form, it need only be evaluated once. However, in the long form, X = X + Y, X appears twice, and must be run twice. Because of this, augmented assignments usually run faster.
    * The optimal technique is automatically chosen. For objects that support in-place changes, the augmented forms automatically perform in-place change operations instead of slower copies.

The last point here requires a bit more explanation. For augmented assignments, in-place operations may be applied for mutable objects as an optimization. Recall that lists can be extended in a variety of ways. To add a single item to the end of a list, we can concatenate or call append:


>>> L = [1, 2] 
>>> L = L + [3]  # Concatenate: slower
>>> L 
[1, 2, 3]
>>> L.append(4)  # Faster, but in-place
>>> L 
[1, 2, 3, 4]


And to add a set of items to the end, we can either concatenate again, or call the list extend method:[32]

    [32] dagger As suggested in Chapter 6, we can also use slice assignment (e.g., L[len(L):] = [11,12,13]), but this works roughly the same as the simpler list extend method.


>>> L = L + [5, 6]  # Concatenate: slower
>>> L 
[1, 2, 3, 4, 5, 6]
>>> L.extend([7, 8])  # Faster, but in-place
>>> L 
[1, 2, 3, 4, 5, 6, 7, 8]


In both cases, concatenation is less prone to the side effects of shared object references, but will generally run slower than the in-place equivalent. Concatenation operations must create a new object, copy in the list on the left, and then copy in the list on the right. By contrast, in-place method calls simply add items at the end of a memory block.

When we use augmented assignment to extend a list, we can forget these details-for example, Python automatically calls the quicker extend method instead of using the slower concatenation operation implied by +:


>>> L += [9, 10]  # Mapped to L.extend([9, 10])
>>> L 
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

#### 30.2.2.1.4.1 Augmented assignment and shared references

```text
This behavior is usually what we want, but notice that it implies the += is an in-place change for lists; thus, it is not exactly like + concatenation, which always makes a new object. As for all shared reference cases, the difference might matter if other names reference the object being changed:


>>> L = [1, 2] 
>>> M = L  # L and M reference the same object
>>> L = L + [3, 4]  # Concatenation makes a new object
>>> L, M  # Changes L but not M
([1, 2, 3, 4], [1, 2])

>>> L = [1, 2] 
>>> M = L 
>>> L += [3, 4]  # But += really means extend
>>> L, M  # M sees the in-place change too!
([1, 2, 3, 4], [1, 2, 3, 4])


This only matters for mutables like lists and dictionaries, and it is a fairly obscure case (at least, until it impacts your code!). As always, make copies of your mutable objects if you need to break the shared reference structure.
O
```

#### 30.2.2.1.5 Variable Name Rules

```text
Now that we've explored assignment statements, it's time to get more formal about the use of variable names. In Python, names come into existence when you assign values to them, but there are a few rules to follow when picking names for things in your programs:


Syntax: (underscore or letter) + (any number of letters, digits, or underscores)

    Variable names must start with an underscore or letter, which can be followed by any number of letters, digits, or underscores. _spam, spam, and Spam_1 are legal names, but 1_Spam, spam$, and @#! are not.

Case matters: SPAM is not the same as spam

    Python always pays attention to case in programs, both in names you create, and in reserved words. For instance, the names X and x refer to two different variables. For portability, case also matters in the names of imported module files, even on platforms where the filesystems are case insensitive.

Reserved words are off-limits

    Names you define cannot be the same as words that mean special things in the Python language. For instance, if you try to use a variable name like class, Python will raise a syntax error, but klass and Class work fine. Table 11-3 lists the words that are currently reserved (and hence off-limits) in Python.

Table 11-3. Python reserved words
and 	elif 	if 	pass
as (in 2.6 and later) 	else 	import 	print
assert 	except 	in 	raise
break 	exec 	is 	return
class 	finally 	lambda 	try
continue 	for 	nonlocal (in 3.0) 	while
def 	from 	not 	with (in 2.6 and later)
del 	global 	or 	yield

	

yield was an optional extension in Python 2.2, but is a standard keyword as of 2.3. It is used in conjunction with generator functions, a newer feature discussed in Chapter 17. This was one of a small handful of instances where Python broke with backward compatibility. Still, yield was phased in over time-it began generating warnings in 2.2, and was not enabled until 2.3.

Similarly, in Python 2.6, the words with and as are scheduled to become new reserved words for use in context managers (a new form of exception handling). These two words are not reserved in 2.5, unless the context manager feature is turned on manually (see Chapter 27 for details). When used in 2.5, with and as generate warnings about the upcoming change-except in the version of IDLE in Python 2.5, which appears to have enabled this feature for you (that is, using these words as variable names does generate errors in 2.5, but only in its version of the IDLE GUI).

Python's reserved words are always all lowercase, and they are truly reserved; unlike names in the built-in scope that you will meet in the next part of this book, you cannot redefine reserved words by assignment (e.g., and = 1 results in a syntax error).[33]

    [33] * In the Jython Java-based implementation of Python, though, user-defined variable names can sometimes be the same as Python reserved words.

Furthermore, because module names in import statements become variables in your script, this constraint extends to your module filenames-you can code files called and.py and my-code.py, but you cannot import them because their names without the ".py" extension become variables in your code, and so must follow all the variable rules just outlined (reserved words are off-limits, and dashes won't work, though underscores will). We'll revisit this idea in Part 5.
```

#### 30.2.2.1.5.1 Naming conventions

```text
Besides these rules, there is also a set of naming conventions-rules that are not required, but are followed in normal practice. For instance, because names with two leading and trailing underscores (e.g., __name__) generally have special meaning to the Python interpreter, you should avoid this pattern for your own names. Here is a list of the conventions Python follows:

    * Names that begin with a single underscore (_X) are not imported by a from module import * statement (described in Chapter 19).
    * Names that have two leading and trailing underscores (__X__) are system-defined names that have special meaning to the interpreter.
    * Names that begin with two underscores, and do not end with two more (__X) are localized ("mangled") to enclosing classes (described in Chapter 26).
    * The name that is just a single underscore (_) retains the result of the last expression when working interactively.

In addition to these Python interpreter conventions, there are various other conventions that Python programmers usually follow as well. For instance, later in the book, we'll see that class names commonly start with an uppercase letter, and module names with a lowercase letter, and that the name self, though not reserved, usually has a special role in classes. In Part 4, we'll also study another, larger category of names known as the built-ins, which are predefined, but not reserved (and so can be reassigned: open = 42 works, though sometimes you might wish it didn't!).
```

#### 30.2.2.1.5.2 Names have no type, but objects do

```text
This is mostly review, but remember that it's crucial to keep Python's distinction between names and objects clear. As described in "Chapter 6" in Chapter 6, objects have a type (e.g., integer, list), and may be mutable or not. Names (a.k.a. variables), on the other hand, are always just references to objects; they have no notion of mutability, and have no associated type information, apart from the type of the object they happen to reference at a given point in time.

It's OK to assign the same name to different kinds of objects at different times:


>>> x = 0  # x bound to an integer object
>>> x = "Hello"  # Now it's a string
>>> x = [1, 2, 3]  # And now it's a list


In later examples, you'll see that this generic nature of names can be a decided advantage in Python programming.[34] In Part 4, you'll learn that names also live in something called a scope, which defines where they can be used; the place where you assign a name determines where it is visible.

    [34] * If you've used C++, you may be interested to know that there is no notion of C++'s const declaration in Python; certain objects may be immutable, but names can always be assigned. Python also has ways to hide names in classes and modules, but they're not the same as C++'s declarations.
```

#### 30.2.2.2 Expression Statements

```text
In Python, you can use an expression as a statement, too (that is, on a line by itself). But because the result of the expression won't be saved, it makes sense to do so only if the expression does something useful as a side effect. Expressions are commonly used as statements in two situations:


For calls to functions and methods

    Some functions and methods do lots of work without returning a value. Such functions are sometimes called procedures in other languages. Because they don't return values that you might be interested in retaining, you can call these functions with expression statements.

For printing values at the interactive prompt

    Python echoes back the results of expressions typed at the interactive command line. Technically, these are expression statements, too; they serve as a shorthand for typing print statements.

Table 11-4 lists some common expression statement forms in Python. Calls to functions and methods are coded with zero or more argument objects (really, expressions that evaluate to objects) in parentheses, after the function/method name.

Table 11-4. Common Python expression statements
Operation 	Interpretation
spam(eggs, ham) 	Function calls
spam.ham(eggs) 	Method calls
spam 	Printing variables in the interactive interpreter
spam < ham and ham != eggs 	Compound expressions
spam < ham < eggs 	Range tests

The last line in the table is a special form: Python lets us string together magnitude comparison tests, to code chained comparisons such as range tests. For instance, the expression (A < B < C) tests whether B is between A and C; it's equivalent to the Boolean test (A < B and B < C), but is easier on the eyes (and the keyboard). Compound expressions aren't normally written as statements, but doing so is syntactically legal, and can even be useful at the interactive prompt if you're not sure of an expression's result.

Beware that although expressions can appear as statements in Python, statements can't be used as expressions. For instance, Python doesn't allow you to embed assignment statements (=) in other expressions. The rationale for this is that it avoids common coding mistakes; you can't accidentally change a variable by typing = when you really mean to use the == equality test. You'll see how to code around this when you meet the Python while loop in Chapter 13.
```

#### 30.2.2.2.1 Expression Statements and In-Place Changes

```text
This brings up a mistake that is common in Python work. Expression statements are often used to run list methods that change a list in-place:


>>> L = [1, 2] 
>>> L.append(3)  # Append is an in-place change
>>> L 
[1, 2, 3]


However, it's not unusual for Python newcomers to code such an operation as an assignment statement instead, intending to assign L to the larger list:


>>> L = L.append(4)  # But append returns None, not L
>>> print L  # So we lose our list!
None


This doesn't quite work, though-calling an in-place change operation such as append, sort, or reverse on a list always changes the list in-place, but these methods do not return the list they have changed.

In fact, they return the None object. If you assign such an operation's result back to the variable name, you effectively lose the list (and it is probably garbage collected in the process!).

So, don't do this. We'll revisit this phenomenon in the "Section 14.2" warnings section at the end of this part of the book because it can also appear in the context of some looping statements we'll meet in later chapters.
```

#### 30.2.2.3 print Statements

```text
	The print statement prints things-it's simply a programmer-friendly interface to the standard output stream. Technically, it converts an object to its textual representation, and sends this to standard output.

The standard output stream is the same as the C language's stdout; it is usually mapped to the window where you started your Python program (unless redirected to a file or pipe in your system's shell).

In Chapter 9, we looked at some file methods that write text. The print statement is similar, but more focused: print writes objects to the stdout stream (with some default formatting), but file write methods write strings to arbitrary files. Because the standard output stream is available in Python as the stdout object in the built-in sys module (i.e., sys.stdout), it's possible to emulate print with file writes, but print is easier to use.

Table 11-5 lists the print statement's forms.

Table 11-5. print statement forms
Operation 	Interpretation
print spam, ham 	Print objects to sys.stdout; add a space between the items and a linefeed at the end
print spam, ham, 	Same, but don't add linefeed at end of text
print >> myfile, spam, ham 	Send text to myfile.write, not to sys.stdout.write

We've seen the basic print statement in action already. By default, it adds a space between the items separated by commas, and adds a linefeed at the end of the current output line:


>>> x = 'a'
>>> y = 'b'
>>> print x, y
a b


This formatting is just a default; you can choose to use it or not. To suppress the linefeed (so you can add more text to the current line later), end your print statement with a comma, as shown in the second line of Table 11-5. To suppress the space between items, don't print this way-instead, build up an output string yourself using the string concatenation and formatting tools covered in Chapter 7, and print the string all at once:


>>> print x + y
ab
>>> print '%s...%s' % (x, y)
a...b
```

#### 30.2.2.3.1 The Python "Hello World" Program

```text
To print a "hello world" message, simply print the string:


>>> print 'hello world'  # Print a string object
hello world


Because expression results are echoed on the interactive command line, you often don't even need to use a print statement there; simply type expressions you'd like to have printed, and their results are echoed back:


>>> 'hello world'  # Interactive echoes
'hello world'


Really, the print statement is just an ergonomic feature of Python-it provides a simple interface to the sys.stdout object, with a bit of default formatting. In fact, if you like to work harder than you must, you can also code print operations this way:


>>> import sys  # Printing the hard way
>>> sys.stdout.write('hello world\n') 
hello world


This code explicitly calls the write method of sys.stdout-an attribute preset when Python starts up to an open file object connected to the output stream. The print statement hides most of those details, providing a simple tool for simple printing tasks.
```

#### 30.2.2.3.2 Redirecting the Output Stream

```text
So, why did I just show you the hard way to print? The sys.stdout print equivalent turns out to be the basis of a common technique in Python. In general, print and sys.stdout are related as follows. This statement:


print X


is equivalent to the longer:

import sys
sys.stdout.write(str(X) + '\n')


which manually performs a string conversion with str, adds a newline with +, and calls the output stream's write method. The long form isn't all that useful for printing by itself. However, it is useful to know that this is exactly what print statements do because it is possible to reassign sys.stdout to something different from the standard output stream. In other words, this equivalence provides a way for making your print statements send their text to other places. For example:


import sys
sys.stdout = open('log.txt', 'a')       # Redirects prints to file
...
print x, y, x                           # Shows up in log.txt


Here, we reset sys.stdout to a manually opened output file object opened in append mode. After the reset, every print statement anywhere in the program will write its text to the end of the file log.txt instead of to the original output stream. The print statements are happy to keep calling sys.stdout's write method, no matter what sys.stdout happens to refer to. Because there is just one sys module in your process, assigning sys.stdout this way will redirect every print anywhere in your program.

In fact, as this chapter's upcoming sidebar on print and stdout will explain, you can even reset sys.stdout to a nonfile object, as long as it has the expected protocol (a write method); when that object is a class, printed text can be routed and processed arbitrarily.

This trick of resetting the output stream is primarily useful for programs originally coded with print statements. If you know that output should go to a file to begin with, you can always call file write methods instead. To redirect the output of a print-based program, though, resetting sys.stdout provides a convenient alternative to changing every print statement, or using system-shell-based redirection syntax.
```

#### 30.2.2.3.3 The print >> file Extension

```text
This trick of redirecting printed text by assigning sys.stdout is very commonly used in practice. But one potential problem with the last section's code is that there is no direct way to restore the original output stream should you need to switch back after printing to a file. Because sys.stdout is just a normal file object, you can always save it and restore it if needed:[35]

    [35] * You can also use the relatively new __stdout__ attribute in the sys module, which refers to the original value sys.stdout had at program startup time. You still need to restore sys.stdout to sys.__stdout__ to go back to this original stream value, though. See the sys module in the library manual for more details.


>>> import sys 
>>> temp = sys.stdout  # Save for restoring later
>>> sys.stdout = open('log.txt', 'a')  # Redirect prints to a file
>>> print 'spam'  # Prints go to file, not here
>>> print 1, 2, 3 
>>> sys.stdout.close(  )  # Flush output to disk
>>> sys.stdout = temp  # Restore original stream

>>> print 'back here'  # Prints show up here again
back here
>>> print open('log.txt').read(  )  # Result of earlier prints
spam
1 2 3


This need crops up fairly regularly, and this manual saving and restoring of the original output stream is just complicated enough that a print extension was added to make it unnecessary. When a print statement begins with a >> followed by an output file (or other) object, that single print statement sends its text to the object's write method, but it does not reset sys.stdout. Because the redirection is temporary, normal print statements keep printing to the original output stream:


log =  open('log.txt', 'a')
print >> log, x, y, z                   # Print to a file-like object
print a, b, c                           # Print to original stdout


The >> form of print is handy if you need to print to both files and the standard output stream in the same program. If you use this form, however, be sure to give it a file object (or an object that has the same write method as a file object), not a file's name string:


>>> log = open('log.txt', 'w')
>>> print >> log, 1, 2, 3
>>> print >> log, 4, 5, 6
>>> log.close(  )
>>> print 7, 8, 9
7 8 9
>>> print open('log.txt').read(  )
1 2 3
4 5 6


This extended form of print is also commonly used to print error messages to the standard error stream, sys.stderr. You can either use its file write methods and format the output manually, or print with redirection syntax:


>>> import sys
>>> sys.stderr.write(('Bad!' * 8) + '\n')
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!

>>> print >> sys.stderr, 'Bad!' * 8
Bad!Bad!Bad!Bad!Bad!Bad!Bad!Bad!


Why You Will Care: print and stdout

The equivalence between the print statement and writing to sys.stdout is important. It makes it possible to reassign sys.stdout to a user-defined object that provides the same methods as files (e.g., write). Because the print statement just sends text to the sys.stdout.write method, you can capture printed text in your programs by assigning sys.stdout to an object whose write method processes the text in arbitrary ways.

For instance, you can send printed text to a GUI window, or tee it off to multiple destinations by defining an object with a write method that does the required routing. You'll see an example of this trick when we study classes later in the book, but abstractly, it looks like this:


class FileFaker:
    def write(self, string):
        # Do something with the string
import sys
sys.stdout = FileFaker(  )
print someObjects             # Sends to class write method


This works because print is what we will call a polymorphic operation in the next part of this book-it doesn't care what SYS.STDOUT is, only that it has a method (i.e., interface) called write. In recent versions of Python, this redirection to objects is made even simpler with the >> extended form of print because we don't need to reset sys.stdout explicitly:


myobj = FileFaker(  )           # Redirect to an object for one print
print >> myobj, someObjects    # Does not reset sys.stdout


Python's built-in raw_input( ) function reads from the sys.stdin file, so you can intercept read requests in a similar way, using classes that implement file-like read methods. See the raw_input and while loop example in Chapter 10 for more background on this.

Notice that because printed text goes to the stdout stream, it's the way to print HTML in CGI scripts. It also enables you to redirect Python script input and output at the operating system's command line, as usual:


python script.py < inputfile > outputfile
python script.py | filterProgram



	

In Python 3.0, the print statement is scheduled to become a built-in function, with equivalent utility, but slightly different syntax. The target file and end-of-line behavior are to be specified with keyword arguments. For instance, the statement print x, y will become the call print(x, y), and print >> f, x will become print(x, file=f, end=' ').

All of this is still in the future, so consult the 3.0 release notes for more details. Current 3.0 plans also call for including a converter script (tentatively named "2to3") that will, among a handful of other things, automatically convert print statements in your existing code to print calls. It should help, if you find yourself torn between 2.x and 3.x (like this book!).		

'
```

#### 30.2.2.4 Chapter Summary

```text
In this chapter, we began our in-depth look at Python statements by exploring assignments, expressions, and prints. Although these are generally simple to use, they have some alternative forms that are optional, but often convenient in practice. Augmented assignment statements and the redirection form of print statements, for example, allow us to avoid some manual coding work. Along the way, we also studied the syntax of variable names, stream redirection techniques, and a variety of common mistakes to avoid, such as assigning the result of an append method call back to a variable.

In the next chapter, we continue our statement tour by filling in details about the if statement, Python's main selection tool; there, we'll also revisit Python's syntax model in more depth, and look at the behavior of Boolean expressions. Before we move on, though, the end-of-chapter quiz will test your knowledge of what you've learned here.

BRAIN BUILDER
Chapter Quiz

Q:	Name three ways that you can assign three variables to the same value.
Q:	Why might you need to care when assigning three variables to a mutable object?
Q:	What's wrong with saying L = L.sort( )?
Q:	How might you use the print statement to send text to an external file?


Quiz Answers

A:	You can use multiple-target assignments (A = B = C = 0), sequence assignment (A, B, C = 0, 0, 0), or multiple assignment statements on separate lines (A = 0, B = 0, C = 0). With the latter technique, as introduced in Chapter 10, you can also string the three separate statements together on the same line by separating them with semicolons (A = 0; B = 0; C = 0).
A:	If you assign them this way:


    A = B = C = []


    all three names reference the same object, so changing it in-place from one (e.g., A.append(99)) will affect the others. This is true only for in-place changes to mutable objects like lists and dictionaries; for immutable objects, such as numbers and strings, this issue is irrelevant.
    A:	The list sort method is like append in that is an in-place change to the subject listÂ¿it returns None, not the list it changes. The assignment back to L sets L to None, not the sorted list. As we'll see later in this part of the book, a newer built-in function, sorted, sorts any sequence, and returns a new list with the sorting result; because it is not an in-place change, its result can be meaningfully assigned to a name.
    A:	You can assign sys.stdout to a manually opened file before the print, or use the extended print >> file statement form to print to a file for a single print statement. You can also redirect all of a program's printed text to a file with special syntax in the system shell, but this is outside Python's scope.
```
