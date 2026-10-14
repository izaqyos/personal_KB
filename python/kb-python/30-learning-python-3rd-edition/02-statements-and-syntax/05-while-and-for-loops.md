---
type: reference
title: while and for Loops
description: "Learning Python 3rd ed. notes, while and for Loops"
tags: [python, book-notes, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: deprecated
capture_type: source
legacy_source: "python/KB_python#30.2.4"
---

# 30.2.4. while and for Loops

> **Deprecated (2026-10):** Book edition notes (Python 2.x era). Current: Python 3 print(), except as, dict.items(); Py2 EOL 2020. Source: <https://www.python.org/doc/sunset-python-2/>

[↑ Statements and Syntax](/python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/README.md)

```text
In this chapter, we'll meet Python's two main looping constructsÂ¿statements that repeat an action over and over. The first of these, the while statement, provides a way to code general loops; the second, the for  statement, is designed for stepping through the items in a sequence object, and running a block of code for each item.

There are other kinds of looping operations in Python, but the two statements covered here are the primary syntax provided for coding repeated actions. We'll also study a few unusual statements (such as break and continue) here because they are used within loops. Additionally, this chapter will explore the related concept of Python's iteration protocol, and fill in some details on list comprehensions, a close cousin to the for loop.
```

#### 30.2.4.1 while Loops

```text
Python's while statement is the most general iteration construct in the language. In simple terms, it repeatedly executes a block of (normally indented) statements as long as a test at the top keeps evaluating to a true value. It is called a "loop" because control keeps looping back to the start of the statement until the test becomes false. When the test becomes false, control passes to the statement that follows the while block. The net effect is that the loop's body is executed repeatedly while the test at the top is true; if the test is false to begin with, the body never runs.

As I've just stated, the while statement is one of two looping statements available in Python, along with the for. Besides these statements, Python also provides a handful of tools that implicitly loop (iterate): the map, reduce, and filter functions; the in membership test; list comprehensions; and more. We'll explore some of these in Chapter 17 because they are related to functions.
```

#### 30.2.4.1.1 General Format

```text
In its most complex form, the while statement consists of a header line with a test expression, a body of one or more indented statements, and an optional else part that is executed if control exits the loop without a break statement being encountered. Python keeps evaluating the test at the top, and executing the statements nested in the loop body until the test returns a false value:


while <test>:                   # Loop test
    <statements1>               # Loop body
else:                                  # Optional else
    <statements2>               # Run if didn't exit loop with break
```

#### 30.2.4.1.2 Examples

```text
To illustrate, let's look at a few simple while loops in action. The first, which consists of a print statement nested in a while loop, just prints a message forever. Recall that True is just a custom version of the integer 1, and always stands for a Boolean true value; because the test is always true, Python keeps executing the body forever, or until you stop its execution. This sort of behavior is usually called an infinite loop:


>>> while True:
...    print 'Type Ctrl-C to stop me!'


The next example keeps slicing off the first character of a string until the string is empty and hence false. It's typical to test an object directly like this instead of using the more verbose equivalent (while x != '':). Later in this chapter, we'll see other ways to step more directly through the items in a string with a for loop. Notice the trailing comma in the print hereÂ¿as we learned in Chapter 11, this makes all the outputs show up on the same line:


>>> x = 'spam' 
>>> while x:  # While x is not empty
...     print x, 
...     x = x[1:]  # Strip first character off x
...
spam pam am m


The following code counts from the value of a up to, but not including, b. We'll see an easier way to do this with a Python for loop and the built-in range function later:


>>> a=0; b=10 
>>> while a < b:  # One way to code counter loops
...     print a, 
...     a += 1  # Or, a = a + 1
...
0 1 2 3 4 5 6 7 8 9


Finally, notice that Python doesn't have what some languages call a "do until" loop statement. However, we can simulate one with a test and break at the bottom of the loop body:


while True:
    ...loop body...
    if exitTest(  ): break


To fully understand how this structure works, we need to move on to the next section, and learn more about the break statement.
```

#### 30.2.4.2 break, continue, pass, and the Loop else

```text
Now that we've seen a few Python loops in action, it's time to take a look at two simple statements that have a purpose only when nested inside loopsâthe break and continue statements. While we're looking at oddballs, we will also study the loop else clause here because it is intertwined with break, and Python's empty placeholder statement, the pass. In Python:


break

    Jumps out of the closest enclosing loop (past the entire loop statement).

continue

    Jumps to the top of the closest enclosing loop (to the loop's header line).

pass

    Does nothing at all: it's an empty statement placeholder.

Loop else block

    Runs if and only if the loop is exited normally (i.e., without hitting a break).
```

#### 30.2.4.2.1 General Loop Format

```text
Factoring in break and continue statements, the general format of the while loop looks like this:


while <test1>:
    <statements1>
    if <test2>: break              # Exit loop now, skip else
    if <test3>: continue           # Go to top of loop now, to test1
else:
    <statements2>                  # Run if we didn't hit a 'break'


break and continue statements can appear anywhere inside the while (or for) loop's body, but they are usually coded further nested in an if test to take action in response to some condition.
```

#### 30.2.4.2.2 Examples

```text
Let's turn to a few simple examples to see how these statements come together in practice.
```

#### 30.2.4.2.2.1 pass

```text
The pass statement is a no-operation placeholder that is used when the syntax requires a statement, but you have nothing useful to say. It is often used to code an empty body for a compound statement. For instance, if you want to code an infinite loop that does nothing each time through, do it with a pass:

while 1: pass# Type Ctrl-C to stop me!


Because the body is just an empty statement, Python gets stuck in this loop. pass is roughly to statements as None is to objectsâan explicit nothing. Notice that here the while loop's body is on the same line as the header, after the colon; as with if statements, this only works if the body isn't a compound statement.

This example does nothing forever. It probably isn't the most useful Python program ever written (unless you want to warm up your laptop computer on a cold winter's day!); frankly, though, I couldn't think of a better pass example at this point in the book. We'll see other places where it makes sense laterâfor instance, to define empty classes that implement objects that behave like structs and records in other languages. A pass is also sometime coded to mean "to be filled in later," and to stub out the bodies of functions temporarily:


def func1(  ):
    pass                           # Add real code here later

def func2(  ):
    pass
```

#### 30.2.4.2.2.2 continue

```text
The continue statement causes an immediate jump to the top of a loop. It also sometimes lets you avoid statement nesting. The next example uses continue to skip odd numbers. This code prints all even numbers less than 10, and greater than or equal to 0. Remember, 0 means false, and % is the remainder of division operator, so this loop counts down to 0, skipping numbers that aren't multiples of 2 (it prints 8 6 4 2 0):


x = 10
while x:
    x = xâ1                        # Or, x -= 1
    if x % 2 != 0: continue        # Odd? -- skip print
    print x,


Because continue jumps to the top of the loop, you don't need to nest the print statement inside an if test; the print is only reached if the continue is not run. If this sounds similar to a "goto" in other languages, it should. Python has no goto statement, but because continue lets you jump about in a program, many of the warnings about readability and maintainability you may have heard about goto apply. continue should probably be used sparingly, especially when you're first getting started with Python. For instance, the last example might be clearer if the print were nested under the if:


x = 10
while x:
    x = xâ1
    if x % 2 == 0:                 # Even? -- print
        print x,
```

#### 30.2.4.2.2.3 break

```text
The break statement causes an immediate exit from a loop. Because the code that follows it in the loop is not executed if the break is reached, you can also sometimes avoid nesting by including a break. For example, here is a simple interactive loop (a variant of a larger example we studied in Chapter 10) that inputs data with raw_input, and exits when the user enters "stop" for the name request:


>>> while 1:
...     name = raw_input('Enter name:')
...     if name == 'stop': break
...     age  = raw_input('Enter age: ')
...     print 'Hello', name, '=>', int(age) ** 2
...
Enter name:mel
Enter age: 40
Hello mel => 1600
Enter name:bob
Enter age: 30
Hello bob => 900
Enter name:stop


Notice how this code converts the age input to an integer with int before raising it to the second power; as you'll recall, this is necessary because raw_input returns user input as a string. In Chapter 29, you'll see that raw_input also raises an exception at end-of-file (e.g., if the user types Ctrl-Z or Ctrl-D); if this matters, wrap raw_input in try statements.
```

#### 30.2.4.2.2.4 else

```text
When combined with the loop else clause, the break statement can often eliminate the need for the search status flags used in other languages. For instance, the following piece of code determines whether a positive integer y is prime by searching for factors greater than 1:


x = y / 2                                 # For some y > 1
while x > 1:
    if y % x == 0:                        # Remainder
        print y, 'has factor', x
        break                             # Skip else
    x = xâ1
else:                                     # Normal exit
    print y, 'is prime'


Rather than setting a flag to be tested when the loop is exited, insert a break where a factor is found. This way, the loop else clause can assume that it will be executed only if no factor was found; if you don't hit the break, the number is prime.[37]

    [37] * More or less. Numbers less than 2 are not considered prime by the strict mathematical definition. To be really picky, this code also fails for negative and floating-point numbers and will be broken by the future / "true division" change described in Chapter 5. If you want to experiment with this code, be sure to see the exercise at the end of Part 4, which wraps it in a function.

The loop else clause is also run if the body of the loop is never executed, as you don't run a break in that event either; in a while loop, this happens if the test in the header is false to begin with. Thus, in the preceding example, you still get the "is prime" message if x is initially less than or equal to 1 (e.g., if y is 2).
```

#### 30.2.4.2.2.5 More on the loop else clause

```text
Because the loop else clause is unique to Python, it tends to perplex some newcomers. In general terms, the loop else provides explicit syntax for a common coding scenarioâit is a coding structure that lets you catch the "other" way out of a loop, without setting and checking flags or conditions.

Suppose, for instance, that you are writing a loop to search a list for a value, and you need to know whether the value was found after you exit the loop. You might code such a task this way:


found = False
while x and not found:
    if match(x[0]):                  # Value at front?
        print 'Ni'
        found = True
    else:
        x = x[1:]                    # Slice off front and repeat
if not found:
    print 'not found'


Here, we initialize, set, and later test a flag to determine whether the search succeeded or not. This is valid Python code, and it does work; however, this is exactly the sort of structure that the loop else clause is there to handle. Here's an else equivalent:


while x:                             # Exit when x empty
    if match(x[0]):
        print 'Ni'
        break                        # Exit, go around else
    x = x[1:]
else:
    print 'Not found'                # Only here if exhausted x


This version is more concise. The flag is gone, and we've replaced the if test at the loop end with an else (lined up vertically with the word while). Because the break inside the main part of the while exits the loop and goes around the else, this serves as a more structured way to catch the search-failure case.

Some readers might have noticed that the prior example's else clause could be replaced with a test for an empty x after the loop (e.g., if not x:). Although that's true in this example, the else provides explicit syntax for this coding pattern (it's more obviously a search-failure clause here), and such an explicit empty test may not apply in some cases. The loop else becomes even more useful when used in conjunction with the for loopâthe topic of the next sectionâbecause sequence iteration is not under your control.

Why You Will Care: Emulating C while Loops

The section on expression statements in Chapter 11 stated that Python doesn't allow statements such as assignments to appear in places where it expects an expression. That means this common C language coding pattern won't work in Python:


while ((x = next(  )) != NULL) {...process x...}


C assignments return the value assigned, but Python assignments are just statements, not expressions. This eliminates a notorious class of C errors (you can't accidentally type = in Python when you mean ==). But, if you need similar behavior, there are at least three ways to get the same effect in Python while loops without embedding assignments in loop tests. You can move the assignment into the loop body with a break:


while True:
    x = next(  )
    if not x: break
    ...process x...


or move the assignment into the loop with tests:


x = 1
while x:
    x = next(  )
    if x:
        ...process x...


or move the first assignment outside the loop:


x = next(  )
while x:
    ...process x...
    x = next(  )


Of these three coding patterns, the first may be considered by some to be the least structured, but it also seems to be the simplest, and most commonly used. (A simple Python for loop may replace some C loops as well.)
```

#### 30.2.4.2.3 for Loops

```text
The for loop is a generic sequence iterator in Python: it can step through the items in any ordered sequence object. The for  statement works on strings, lists, tuples, other built-in iterables, and new objects that we'll see how to create later with classes.
```

#### 30.2.4.2.4 General Format

```text
The Python for loop begins with a header line that specifies an assignment target (or targets), along with the object you want to step through. The header is followed by a block of (normally indented) statements that you want to repeat:


for <target> in <object>:             # Assign object items to target
    <statements>                      # Repeated loop body: use target
else:
    <statements>                      # If we didn't hit a 'break'


When Python runs a for loop, it assigns the items in the sequence object to the target one by one, and executes the loop body for each. The loop body typically uses the assignment target to refer to the current item in the sequence as though it were a cursor stepping through the sequence.

The name used as the assignment target in a for header line is usually a (possibly new) variable in the scope where the for statement is coded. There's not much special about it; it can even be changed inside the loop's body, but it will automatically be set to the next item in the sequence when control returns to the top of the loop again. After the loop, this variable normally still refers to the last item visited, which is the last item in the sequence, unless the loop exits with a break statement.

The for statement also supports an optional else block, which works exactly as it does in a while loopâit's executed if the loop exits without running into a break statement (i.e., if all items in the sequence have been visited). The break and continue statements introduced earlier also work the same in a for loop as they do in a while. The for loop's complete format can be described this way:


for <target> in <object>:             # Assign object items to target
    <statements>
    if <test>: break                  # Exit loop now, skip else
    if <test>: continue               # Go to top of loop now
else:
    <statements>                      # If we didn't hit a 'break'
```

#### 30.2.4.2.5 Examples

```text
Let's type a few for loops interactively now, so you can see how they are used in practice.
```

#### 30.2.4.2.5.1 Basic usage

```text
As mentioned earlier, a for loop can step across any kind of sequence object. In our first example, for instance, we'll assign the name x to each of the three items in a list in turn, from left to right, and the print statement will be executed for each. Inside the print statement (the loop body), the name x refers to the current item in the list:


>>> for x in ["spam", "eggs", "ham"]:
...     print x,
...
spam eggs ham


As noted in Chapter 11, the trailing comma in the print statement is responsible for making all of these strings show up on the same output line.

The next two examples compute the sum and product of all the items in a list. Later in this chapter and book, we'll meet tools that apply operations such as + and * to items in a list automatically, but it's usually just as easy to use a for:


>>> sum = 0
>>> for x in [1, 2, 3, 4]:
...     sum = sum + x
...
>>> sum
10
>>> prod = 1
>>> for item in [1, 2, 3, 4]: prod *= item
...
>>> prod
24
```

#### 30.2.4.2.5.2 Other data types

```text
Any sequence works in a for, as it's a generic tool. For example, for loops work on strings and tuples:


>>> S = "lumberjack" 
>>> T = ("and", "I'm", "okay") 

>>> for x in S: print x,  # Iterate over a string
...
l u m b e r j a c k

>>> for x in T: print x,  # Iterate over a tuple
...
and I'm okay


In fact, as we'll see in a moment, for loops can even work on some objects that are not sequences at all!
```

#### 30.2.4.2.5.3 Tuple assignment in for

```text
If you're iterating through a sequence of tuples, the loop target itself can actually be a tuple of targets. This is just another case of the tuple-unpacking assignment at work. Remember, the for loop assigns items in the sequence object to the target, and assignment works the same everywhere:


>>> T = [(1, 2), (3, 4), (5, 6)] 
>>> for (a, b) in T:  # Tuple assignment at work
...     print a, b 
...
1 2
3 4
5 6


Here, the first time through the loop is like writing (a,b) = (1,2), the second time is like writing (a,b) = (3,4), and so on. This isn't a special case; any assignment target works syntactically after the word for.
```

#### 30.2.4.2.5.4 Nested for loops

```text
Now, let's look at something a bit more sophisticated. The next example illustrates the loop else clause in a for, and statement nesting. Given a list of objects (items) and a list of keys (tests), this code searches for each key in the objects list, and reports on the search's outcome:


>>> items = ["aaa", 111, (4, 5), 2.01]  # A set of objects
>>> tests = [(4, 5), 3.14]  # Keys to search for
>>>
>>> for key in tests:  # For all keys
...     for item in items:  # For all items
...         if item == key:  # Check for match
...             print key, "was found" 
...             break 
...     else: 
...         print key, "not found!" 
...
(4, 5) was found
|3.14 not found!


Because the nested if runs a break when a match is found, the loop else clause can assume that if it is reached, the search has failed. Notice the nesting here. When this code runs, there are two loops going at the same time: the outer loop scans the keys list, and the inner loop scans the items list for each key. The nesting of the loop else clause is critical; it's indented to the same level as the header line of the inner for loop, so it's associated with the inner loop (not the if or the outer for).

Note that this example is easier to code if we employ the in operator to test membership. Because in implicitly scans a list looking for a match, it replaces the inner loop:


>>> for key in tests:  # For all keys
...     if key in items:  # Let Python
check for a match
...         print key, "was found" 
...     else: 
...         print key, "not found!" 
...
(4, 5) was found
|3.14 not found!


In general, it's a good idea to let Python do as much of the work as possible, as in this solution, for the sake of brevity and performance.

The next example performs a typical data-structure task with a forâcollecting common items in two sequences (strings). It's roughly a simple set intersection routine; after the loop runs, res refers to a list that contains all the items found in seq1 and seq2:


>>> seq1 = "spam" 
>>> seq2 = "scam" 
>>>
>>> res = []  # Start empty
>>> for x in seq1:  # Scan first sequence
...     if x in seq2:  # Common item?
...         res.append(x)  # Add to result end
...
>>> res 
['s', 'a', 'm']


Unfortunately, this code is equipped to work only on two specific variables: seq1 and seq2. It would be nice if this loop could somehow be generalized into a tool you could use more than once. As you'll see, that simple idea leads us to functions, the topic of the next part of the book.

Why You Will Care: File Scanners

In general, loops come in handy anywhere you need to repeat an operation or process something more than once. Because files contain multiple characters and lines, they are one of the more typical use cases for loops. To load a file's contents into a string all at once, you simply call read:


file = open('test.txt', 'r')
print file.read(  )


But to load a file in pieces, it's common to code either a while loop with breaks on end-of-file, or a for loop. To read by characters, either of the following codings will suffice:


file = open('test.txt')
while True:
    char = file.read(1)          # Read by character
    if not char: break
    print char,

for char in open('test.txt').read(  ):
    print char


The for here also processes each character, but it loads the file into memory all at once. To read by lines or blocks with a while loop, use code like this:


file = open('test.txt')
while True:
    line = file.readline(  )       # Read line by line
    if not line: break
    print line,

file = open('test.txt', 'rb')
while True:
    chunk = file.read(10)        # Read byte chunks
    if not chunk: break
    print chunk,


To read text files line by line, though, the for loop tends to be easiest to code and the quickest to run:


for line in open('test.txt').readlines(  ):
    print line

for line in open('test.txt').xreadlines(  ):
    print line

for line in open('test.txt'):
    print line


readlines loads a file all at once into a line-string list, while xreadlines instead loads lines on demand to avoid filling memory for large files; the last example here relies on file iterators to achieve the equivalent of xreadlines (iterators are covered in the next section). The name open in all of the above can also be replaced with file as of Python 2.2. See the library manual for more on the calls used here. As a general rule of thumb, the more data you read on each step, the faster your program will run.
```

#### 30.2.4.2.4 Iterators: A First Look

```text
In the prior section, I mentioned that the for loop can work on any sequence type in Python, including lists, tuples, and strings, like this:


>>> for x in [1, 2, 3, 4]: print x ** 2,
...
1 4 9 16

>>> for x in (1, 2, 3, 4): print x ** 3,
...
1 8 27 64

>>> for x in 'spam': print x * 2,
...
ss pp aa mm


Actually, the for loop turns out to be even more generic than thisâit works on any iterable object. In fact, this is true of all iteration tools that scan objects from left to right in Python, including for loops, list comprehensions, in membership tests, and the map built-in function.

The concept of "iterable objects" is relatively new in Python. It's essentially a generalization of the notion of sequencesâan object is considered iterable if it is either a physically stored sequence, or an object that produces one result at a time in the context of an iteration tool like a for loop. In a sense, iterable objects include both physical sequences and virtual sequences computed on demand.
```

#### 30.2.4.2.4.1 File Iterators

```text
One of the easiest ways to understand what this means is to look at how it works with a built-in type such as the file. Recall that open file objects have a method called readline, which reads one line of text from a file at a timeâeach time we call the readline method, we advance to the next line. At the end of the file, the empty string is returned, which we can detect to break out of the loop:


>>> f = open('script1.py')
>>> f.readline(  )
'import sys\n'
>>> f.readline(  )
'print sys.path\n'
>>> f.readline(  )
'x = 2\n'
>>> f.readline(  )
'print 2 ** 33\n'
>>> f.readline(  )
''


Today, files also have a method named next that has a nearly identical effectâit returns the next line from a file each time it is called. The only noticeable difference is that next raises a built-in StopIteration exception at end-of-file instead of returning an empty string:


>>> f = open('script1.py')
>>> f.next(  )
'import sys\n'
>>> f.next(  )
'print sys.path\n'
>>> f.next(  )
'x = 2\n'
>>> f.next(  )
'print 2 ** 33\n'
>>> f.next(  )
Traceback (most recent call last):
  File "<pyshell#330>", line 1, in <module>
    f.next(  )
StopIteration


This interface is exactly what we call the iteration protocol in Pythonâan object with a next method to advance to a next result, which raises StopIteration at the end of the series of results. Any such object is considered iterable in Python. Any such object may also be stepped through with a for loop or other iteration tool because all iteration tools work internally by calling next on each iteration and catching the StopIteration exception to determine when to exit.

The net effect of this magic is that, as mentioned in Chapter 9, the best way to read a text file line by line today is not to read it at allâinstead, allow the for loop to automatically call next to advance to the next line on each iteration. The following, for example, reads a file line by line (printing the uppercase version of each line along the way) without ever explicitly reading from the file at all:


>>> for line in open('script1.py'):  # Use file iterators
...     print line.upper(  ), 
...
IMPORT SYS
PRINT SYS.PATH
X = 2
PRINT 2 ** 33


This is considered the best way to read text files by lines today, for three reasons: it's the simplest to code, the quickest to run, and the best in terms of memory usage. The older, original way to achieve the same effect with a for loop is to call the file readlines method to load the file's content into memory as a list of line strings:


>>> for line in open('script1.py').readlines(  ):
...     print line.upper(  ),
...
IMPORT SYS
PRINT SYS.PATH
X = 2
PRINT 2 ** 33


This readlines technique still works, but it is not best practice today, and performs poorly in terms of memory usage. In fact, because this version really does load the entire file into memory all at once, it will not even work for files too big to fit into the memory space available on your computer. On the other hand, because it reads one line at a time, the iterator-based version is immune to such memory-explosion issues. Moreover, the iterator version has been greatly optimized by Python, so it should run faster as well.

As mentioned in the earlier sidebar "Why You Will Care: File Scanners," it's also possible to read a file line by line with a while loop:


>>> f = open('script1.py') 
>>> while True: 
...     line = f.readline(  ) 
...     if not line: break 
...     print line.upper(  ), 
...
...same output ...


However, this will likely run slower than the iterator-based for loop version because iterators run at C language speed inside Python, whereas the while loop version runs Python byte code through the Python virtual machine. Any time we trade Python code for C code, speed tends to increase.
```

#### 30.2.4.2.4.2 Other Built-in Type Iterators

```text
Technically, there is one more piece to the iteration protocol. When the for loop begins, it obtains an iterator from the iterable object by passing it to the iter built-in function; the object returned has the required next method. This becomes obvious if we look at how for loops internally process built-in sequence types such as lists:


>>> L = [1, 2, 3] 
>>> I = iter(L)  # Obtain an iterator object
>>> I.next(  )  # Call next to advance to next item
1
>>> I.next(  ) 
2
>>> I.next(  ) 
3
>>> I.next(  ) 
Traceback (most recent call last):
  File "<pyshell#343>", line 1, in <module>
    I.next(  )
StopIteration


Besides files and physical sequences like lists, other types have useful iterators as well. The classic way to step through the keys of a dictionary, for example, is to request its keys list explicitly:


>>> D = {'a':1, 'b':2, 'c':3}
>>> for key in D.keys(  ):
...     print key, D[key]
...
a 1
c 3
b 2


In recent versions of Python, though, we no longer need to call the keys methodâdictionaries have an iterator that automatically returns one key at a time in an iteration context, so they do not require that the keys list be physically created in memory all at once. Again, the effect is to optimize execution speed, memory use, and coding effort:


>>> for key in D:
...     print key, D[key]
...
a 1
c 3
b 2
```

#### 30.2.4.2.4.3 Other Iteration Contexts

```text
So far, I've been demonstrating iterators in the context of the for loop statement, which is one of the main subjects of this chapter. Keep in mind, though, that every tool that scans from left to right across objects uses the iteration protocol. This includes the for loops we've seen:


>>> for line in open('script1.py'):  # Use file iterators
...     print line.upper(  ), 
...
IMPORT SYS
PRINT SYS.PATH
X = 2
PRINT 2 ** 33


However, list comprehensions, the in membership test, the map built-in function, and other built-ins, such as the sorted and sum calls, also leverage the iteration protocol:


>>> uppers = [line.upper(  ) for line in open('script1.py')]
>>> uppers
['IMPORT SYS\n', 'PRINT SYS.PATH\n', 'X = 2\n', 'PRINT 2 ** 33\n']

>>> map(str.upper, open('script1.py'))
['IMPORT SYS\n', 'PRINT SYS.PATH\n', 'X = 2\n', 'PRINT 2 ** 33\n']

>>> 'y = 2\n' in open('script1.py')
False
>>> 'x = 2\n' in open('script1.py')
True

>>> sorted(open('script1.py'))
['import sys\n', 'print 2 ** 33\n', 'print sys.path\n', 'x = 2\n']


The map call used here, which we'll meet in the next part of this book, is a tool that applies a function call to each item in an iterable object; it's similar to list comprehensions, but more limited because it requires a function instead of an arbitrary expression. Because list comprehensions are related to for loops, we'll explore these again later in this chapter, as well as in the next part of the book.

We saw the sorted function used here at work in Chapter 4. sorted is a relatively new built-in that employs the iteration protocolâit's like the original list sort method, but it returns the new sorted list as a result, and runs on any iterable object. Other newer built-in functions support the iteration protocol as well. For example, the sum call computes the sum of all the numbers in any iterable, and the any and all built-ins return True if any or all items in an iterable are True, respectively:


>>> sorted([3, 2, 4, 1, 5, 0])  # More iteration contexts
[0, 1, 2, 3, 4, 5]
>>> sum([3, 2, 4, 1, 5, 0]) 
15
>>> any(['spam', '', 'ni']) 
True
>>> all(['spam', '', 'ni']) 
False


Interestingly, the iteration protocol is even more pervasive in Python today than the examples so far have demonstratedâeverything in Python's built-in toolset that scans an object from left to right is defined to use the iteration protocol on the subject object. This even includes more esoteric tools such as the list and tuple built-in functions (which build new objects from iterables), the string join method (which puts a substring between strings contained in an iterable), and even sequence assignments. Because of that, all of these will also work on an open file, and automatically read one line at a time:


>>> list(open('script1.py'))
['import sys\n', 'print sys.path\n', 'x = 2\n', 'print 2 ** 33\n']

>>> tuple(open('script1.py'))
('import sys\n', 'print sys.path\n', 'x = 2\n', 'print 2 ** 33\n')

>>> '&&'.join(open('script1.py'))
'import sys\n&&print sys.path\n&&x = 2\n&&print 2 ** 33\n'

>>> a, b, c, d = open('script1.py')
>>> a, d
('import sys\n', 'print 2 ** 33\n')
```

#### 30.2.4.2.4.4 User-Defined Iterators

```text
I'll have more to say about iterators in Chapter 17, in conjunction with functions, and in Chapter 24, when we study classes. As you'll see later, it's possible to turn a user-defined function into an iterable object by using yield statements; list comprehensions can also support the protocol today with generator expressions, and user-defined classes can be made iterable with the __iter__ or __getitem__ operator overloading method. User-defined iterators allow arbitrary objects and operations to be used in any of the iteration contexts we've met here.
```

#### 30.2.4.2.5 Loop Coding Techniques

```text
The for loop subsumes most counter-style loops. It's enerally simpler to code and quicker to run than a while, so it's the first tool you should reach for whenever you need to step through a sequence. But there are also situations where you will need to iterate in more specialized ways. For example, what if you need to visit every second or third item in a list, or change the list along the way? How about traversing more than one sequence in parallel, in the same for loop?

You can always code such unique iterations with a while loop and manual indexing, but Python provides two built-ins that allow you to specialize the iteration in a for:

    * The built-in range function returns a list of successively higher integers, which can be used as indexes in a for.[38]

          [38] * Python today also provides a built-in called xrange that generates indexes one at a time instead of storing all of them in a list at once like range does. There's no speed advantage to xrange, but it's useful as a space optimization if you have to generate a huge number of values. At this writing, however, it seems likely that xrange may disappear in Python 3.0 altogether, and that range may become a generator object that supports the iteration protocol to produce one item at a time, instead of all at once in a list; check the 3.0 release notes for future developments on this front.

    * The built-in zip function returns a list of parallel-item tuples, which can be used to traverse multiple sequences in a for.

Because for loops typically run quicker than while-based counter loops, it's to your advantage to use tools that allow you to use for when possible. Let's look at each of these built-ins in turn.
```

#### 30.2.4.2.5.1 Counter Loops: while and range

```text
The range function is really a general tool that can be used in a variety of contexts. Although it's used most often to generate indexes in a for, you can use it anywhere you need a list of integers:


>>> range(5), range(2, 5), range(0, 10, 2)
([0, 1, 2, 3, 4], [2, 3, 4], [0, 2, 4, 6, 8])


With one argument, range generates a list of integers from zero up to but not including the argument's value. If you pass in two arguments, the first is taken as the lower bound. An optional third argument can give a step; if used, Python adds the step to each successive integer in the result (steps default to 1). Ranges can also be nonpositive and nonascending, if you want them to be:


>>> range(â5, 5)
[â5, â4, â3, â2, â1, 0, 1, 2, 3, 4]

>>> range(5, â5, â1)
[5, 4, 3, 2, 1, 0, â1, â2, â3, â4]


Although such range results may be useful all by themselves, they tend to come in most handy within for loops. For one thing, they provide a simple way to repeat an action a specific number of times. To print three lines, for example, use a range to generate the appropriate number of integers:


>>> for i in range(3):
...     print i, 'Pythons'
...
0 Pythons
1 Pythons
2 Pythons


range is also commonly used to iterate over a sequence indirectly. The easiest and fastest way to step through a sequence exhaustively is always with a simple for, as Python handles most of the details for you:


>>> X = 'spam' 
>>> for item in X: print item,  # Simple iteration
...
s p a m


Internally, the for loop handles the details of the iteration automatically when used this way. If you really need to take over the indexing logic explicitly, you can do it with a while loop:


>>> i = 0 
>>> while i < len(X):  # while loop iteration
...     print X[i],; i += 1 
...
s p a m


But, you can also do manual indexing with a for, if you use range to generate a list of indexes to iterate through:


>>> X 
'spam'
>>> len(X)  # Length of string
4
>>> range(len(X))  # All legal offsets into X
[0, 1, 2, 3]
>>>
>>> for i in range(len(X)): print X[i],  # Manual for indexing
...
s p a m


The example here is stepping over a list of offsets into X, not the actual items of X; we need to index back into X within the loop to fetch each item.
```

#### 30.2.4.2.5.2 Nonexhaustive Traversals: range

```text
The last example in the prior section works, but it probably runs more slowly than it has to. It's also more work than we need to do. Unless you have a special indexing requirement, you're always better off using the simple for loop form in Pythonâuse for instead of while whenever possible, and don't resort to range calls in for loops except as a last resort. This simpler solution is better:


>>> for item in X: print item,  # Simple iteration
...


However, the coding pattern used in the prior example does allow us to do more specialized sorts of traversalsâfor instance, to skip items as we go:


>>> S = 'abcdefghijk'
>>> range(0, len(S), 2)
[0, 2, 4, 6, 8, 10]

>>> for i in range(0, len(S), 2): print S[i],
...
a c e g i k


Here, we visit every second item in the string S by stepping over the generated range list. To visit every third item, change the third range argument to be 3, and so on. In effect, using range this way lets you skip items in loops while still retaining the simplicity of the for.

Still, this is probably not the ideal best-practice technique in Python today. If you really want to skip items in a sequence, the extended three-limit form of the slice expression, presented in Chapter 7, provides a simpler route to the same goal. To visit every second character in S, for example, slice with a stride of 2:


>>> for x in S[::2]: print x
...

>>> for i in  range(10)[::3]: print i
... 
0
3
6
9
```

#### 30.2.4.2.5.3 Changing Lists: range

```text
Another common place where you may use the range and for combination is in loops that change a list as it is being traversed. Suppose, for example, that you need to add 1 to every item in a list for some reason. Trying this with a simple for loop does something, but probably not what you want:


>>> L = [1, 2, 3, 4, 5]

>>> for x in L:
...     x += 1
...
>>> L
[1, 2, 3, 4, 5]
>>> x
6


This doesn't quite workâit changes the loop variable x, not the list L. The reason is somewhat subtle. Each time through the loop, x refers to the next integer already pulled out of the list. In the first iteration, for example, x is integer 1. In the next iteration, the loop body sets x to a different object, integer 2, but it does not update the list where 1 originally came from.

To really change the list as we march across it, we need to use indexes so we can assign an updated value to each position as we go. The range/len combination can produce the required indexes for us:


>>> L = [1, 2, 3, 4, 5] 

>>> for i in range(len(L)):  # Add one to each item in L
...     L[i] += 1  # Or L[i] = L[i] + 1
...
>>> L 
[2, 3, 4, 5, 6]


When coded this way, the list is changed as we proceed through the loop. There is no way to do the same with a simple for x in L:-style loop here because such a loop iterates through actual items, not list positions. But what about the equivalent while loop? Such a loop requires a bit more work on our part, and likely runs more slowly:


>>> i = 0
>>> while i < len(L):
...     L[i] += 1
...     i += 1
...
>>> L
[3, 4, 5, 6, 7]


Here again, the range solution may not be ideal. A list comprehension expression of the form [x+1 for x in L] would do similar work, albeit without changing the original list in-place (we could assign the expression's new list object result back to L, but this would not update any other references to the original list). Because this is such a central looping concept, we'll revisit list comprehensions later in this chapter.
```

#### 30.2.4.2.5.4 Parallel Traversals: zip and map

```text
As we've seen, the range built-in allows us to traverse sequences with for in a nonexhaustive fashion. In the same spirit, the built-in zip function allows us to use for loops to visit multiple sequences in parallel. In basic operation, zip takes one or more sequences as arguments, and returns a list of tuples that pair up parallel items taken from those sequences. For example, suppose we're working with two lists:


>>> L1 = [1,2,3,4]
>>> L2 = [5,6,7,8]


To combine the items in these lists, we can use zip to create a list of tuple pairs:


>>> zip(L1,L2)
[(1, 5), (2, 6), (3, 7), (4, 8)]


Such a result may be useful in other contexts as well, but when wedded with the for loop, it supports parallel iterations:


>>> for (x, y) in zip(L1, L2):
...     print x, y, '--', x+y
...
1 5 -- 6
2 6 -- 8
3 7 -- 10
4 8 -- 12


Here, we step over the result of the zip callâthat is, the pairs of items pulled from the two lists. Notice that this for loop uses tuple assignment again to unpack each tuple in the zip result. The first time through, it's as though we ran the assignment statement (x, y) = (1, 5).

The net effect is that we scan both L1 and L2 in our loop. We could achieve a similar effect with a while loop that handles indexing manually, but it would require more typing, and would likely be slower than the for/zip approach.

The zip function is more general than this example suggests. For instance, it accepts any type of sequence (really, any iterable object, including files), and more than two arguments:


>>> T1, T2, T3 = (1,2,3), (4,5,6), (7,8,9)
>>> T3
(7, 8, 9)
>>> zip(T1,T2,T3)
[(1, 4, 7), (2, 5, 8), (3, 6, 9)]


zip truncates result tuples at the length of the shortest sequence when the argument lengths differ:


>>> S1 = 'abc'
>>> S2 = 'xyz123'
>>>
>>> zip(S1, S2)
[('a', 'x'), ('b', 'y'), ('c', 'z')]


The related (and older) built-in map function pairs items from sequences in a similar fashion, but it pads shorter sequences with None if the argument lengths differ:


>>> map(None, S1, S2)
[('a', 'x'), ('b', 'y'), ('c', 'z'), (None, '1'), (None, '2'), (None,'3')]


This example is actually using a degenerate form of the map built-in. Normally, map takes a function, and one or more sequence arguments, and collects the results of calling the function with parallel items taken from the sequences.

When the function argument is None (as here), it simply pairs items, like zip. map and similar function-based tools are covered in Chapter 17.
```

#### 30.2.4.2.5.4.1 Dictionary construction with zip

```text
In Chapter 8, I suggested that the zip call used here can also be handy for generating dictionaries when the sets of keys and values must be computed at runtime. Now that we're becoming proficient with zip, I'll explain how it relates to dictionary construction. As you've learned, you can always create a dictionary by coding a dictionary literal, or by assigning to keys over time:


>>> D1 = {'spam':1, 'eggs':3, 'toast':5}
>>> D1
{'toast': 5, 'eggs': 3, 'spam': 1}

>>> D1 = {}
>>> D1['spam']  = 1
>>> D1['eggs']  = 3
>>> D1['toast'] = 5


What to do, though, if your program obtains dictionary keys and values in lists at runtime, after you've coded your script? For example, say you had the following keys and values lists:


>>> keys = ['spam', 'eggs', 'toast']
>>> vals = [1, 3, 5]


One solution for turning those lists into a dictionary would be to zip the lists and step through them in parallel with a for loop:


>>> zip(keys, vals)
[('spam', 1), ('eggs', 3), ('toast', 5)]

>>> D2 = {}
>>> for (k, v) in zip(keys, vals): D2[k] = v
...
>>> D2
{'toast': 5, 'eggs': 3, 'spam': 1}


It turns out, though, that in Python 2.2 and later, you can skip the for loop altogether and simply pass the zipped keys/values lists to the built-in dict constructor call:


>>> keys = ['spam', 'eggs', 'toast']
>>> vals = [1, 3, 5]

>>> D3 = dict(zip(keys, vals))
>>> D3
{'toast': 5, 'eggs': 3, 'spam': 1}


The built-in name dict is really a type name in Python (you'll learn more about type names, and subclassing them, in Chapter 26). Calling it achieves something like a list-to-dictionary conversion, but it's really an object construction request. Later in this chapter, we'll explore a related but richer concept, the list comprehension, which builds lists in a single expression.
```

#### 30.2.4.2.5.5 Generating Both Offsets and Items: enumerate

```text
Earlier, we discussed using range to generate the offsets of items in a string, rather than the items at those offsets. In some programs, though, we need both: the item to use, plus an offset as we go. Traditionally, this was coded with a simple for loop that also kept a counter of the current offset:


>>> S = 'spam'
>>> offset = 0
>>> for item in S:
...     print item, 'appears at offset', offset
...     offset += 1
...
s appears at offset 0
p appears at offset 1
a appears at offset 2
m appears at offset 3


This works, but in more recent Python releases, a new built-in named enumerate does the job for us:


>>> S = 'spam'
>>> for (offset, item) in enumerate(S):
...     print item, 'appears at offset', offset
...
s appears at offset 0
p appears at offset 1
a appears at offset 2
m appears at offset 3


The enumerate function returns a generator objectâa kind of object that supports the iteration protocol we met earlier in this chapter, and will discuss in more detail in the next part of the book. It has a next method that returns an (index, value) tuple each time through the list, which we can unpack with tuple assignment in the for (much like using zip):


>>> E = enumerate(S)
>>> E.next(  )
(0, 's')
>>> E.next(  )
(1, 'p')


As usual, we don't normally see this machinery because iteration contextsâincluding list comprehensions, the subject of the next sectionârun the iteration protocol automatically:


>>> [c * i for (i, c) in enumerate(S)]
['', 'p', 'aa', 'mmm']
```

#### 30.2.4.2.5.6 List Comprehensions: A First Look

```text
In the prior section, we learned how to use range to change a list as we step across it:


>>> L = [1, 2, 3, 4, 5]

>>> for i in range(len(L)):
...     L[i] += 10
...
>>> L
[11, 12, 13, 14, 15]


This works, but as I mentioned, it may not be the optimal "best-practice" approach in Python. Today, the list comprehension expression makes many such prior use cases obsolete. Here, for example, we can replace the loop with a single expression that produces the desired result list:


>>> L = [x + 10 for x in L]
>>> L
[21, 22, 23, 24, 25]


The net result is the same, but it requires less coding on our part, and probably runs substantially faster. The list comprehension isn't exactly the same as the for loop statement version because it makes a new list object (which might matter if there are multiple references to the original list), but it's close enough for most applications, and is a common and convenient enough approach to merit a closer look here.
```

#### 30.2.4.2.5.6.1 List Comprehension Basics

```text
We first met the list comprehension in Chapter 4. Syntactically, list comprehensions' syntax is derived from a construct in set theory notation that applies an operation to each item in a set, but you don't have to know set theory to use them. In Python, most people find that a list comprehension simply looks like a backward for loop.

Let's look at the prior section's example in more detail. List comprehensions are written in square brackets because they are ultimately a way to construct a new list. They begin with an arbitrary expression that we make up, which uses a loop variable that we make up (x + 10). That is followed by what you should now recognize as the header of a for loop, which names the loop variable, and an iterable object (for x in L).

To run the expression, Python executes an iteration across L inside the interpreter, assigning x to each item in turn, and collects the results of running items through the expression on the left side. The result list we get back is exactly what the list comprehension saysâa new list containing x + 10, for every x in L.

Technically speaking, list comprehensions are never really required because we can always build up a list of expression results manually with for loops that append results as we go:


>>> res = []
>>> for x in L:
...     res.append(x + 10)
...
>>> res
[21, 22, 23, 24, 25]


In fact, this is exactly what the list comprehension does internally.

However, list comprehensions are more concise to write, and because this code pattern of building up result lists is so common in Python work, they turn out to be very handy in many contexts. Moreover, list comprehensions can run much faster than manual for loop statements (in fact, often roughly twice as fast) because their iterations are performed at C language speed inside the interpreter, rather than with manual Python code; especially for larger data sets, there is a major performance advantage to using them.
```

#### 30.2.4.2.5.6.2 Using List Comprehensions on Files

```text
Let's work through another common use case for list comprehensions to explore them in more detail. Recall that the file object has a readlines method that loads the file into a list of line strings all at once:


>>> f = open('script1.py')
>>> lines = f.readlines(  )
>>> lines
['import sys\n', 'print sys.path\n', 'x = 2\n', 'print 2 ** 33\n']


This works, but the lines in the result all include the newline character (\n) at the end. For many programs, the newline character gets in the wayâwe have to be careful to avoid double-spacing when printing, and so on. It would be nice if we could get rid of these newlines all at once, wouldn't it?

Any time we start thinking about performing an operation on each item in a sequence, we're in the realm of list comprehensions. For example, assuming the variable lines is as it was in the prior interaction, the following code does the job by running each line in the list through the string rstrip method to remove whitespace on the right side (a line[:â1] slice would work, too, but only if we can be sure all lines are properly terminated):


>>> lines = [line.rstrip(  ) for line in lines]
>>> lines
['import sys', 'print sys.path', 'x = 2', 'print 2 ** 33']


This works, but because list comprehensions are another iteration context just like simple for loops, we don't even have to open the file ahead of time. If we open it inside the expression, the list comprehension will automatically use the iteration protocol we met earlier in this chapter. That is, it will read one line from the file at a time by calling the file's next method, run the line through the rstrip expression, and add it to the result list. Again, we get what we ask forâthe rstrip result of a line, for every line in the file:


>>> lines = [line.rstrip(  ) for line in open('script1.py')]
>>> lines
['import sys', 'print sys.path', 'x = 2', 'print 2 ** 33']


This expression does a lot implicitly, but we're getting a lot of work for free hereâPython scans the file and builds a list of operation results automatically. It's also an efficient way to code this operation: because most of this work is done inside the Python interpreter, it is likely much faster than an equivalent for statement. Again, especially for large files, the speed advantages of list comprehensions can be significant.
```

#### 30.2.4.2.5.6.3 Extended List Comprehension Syntax

```text
In fact, list comprehensions can be even more advanced in practice. As one useful extension, the for loop nested in the expression can have an associated if clause to filter out of the result items for which the test is not true.

For example, suppose we want to repeat the prior example, but we need to collect only lines that begin with the letter p (perhaps the first character on each line is an action code of some sort). Adding an if filter clause to our expression does the trick:


>>> lines = [line.rstrip(  ) for line in open('script1.py') if line[0] == 'p']
>>> lines
['print sys.path', 'print 2 ** 33']

					  


Here, the if clause checks each line read from the file, to see whether its first character is p; if not, the line is omitted from the result list. This is a fairly big expression, but it's easy to understand if we translate it to its simple for loop statement equivalent (in general, we can always translate a list comprehension to a for statement by appending as we go and further indenting each successive part):


>>> res = []
>>> for line in open('script1.py'):
...     if line[0] == 'p':
...         res.append(line.rstrip(  ))
...
>>> res
['print sys.path', 'print 2 ** 33']


This for statement equivalent works, but it takes up four lines instead of one, and probably runs substantially slower.

List comprehensions can become even more complex if we need them toâfor instance, they may also contain nested loops, coded as a series of for clauses. In fact, their full syntax allows for any number of for clauses, each of which can have an optional associated if clause (we'll be more formal about their syntax in Chapter 17).

For example, the following builds a list of the concatenation of x + y for every x in one string, and every y in another. It effectively collects the permutation of the characters in two strings:


>>> [x + y for x in 'abc' for y in 'lmn']
['al', 'am', 'an', 'bl', 'bm', 'bn', 'cl', 'cm', 'cn']


Again, one way to understand this expression is to convert it to statement form by indenting its parts. The following is an equivalent, but likely slower, alternative way to achieve the same effect:


>>> res = []
>>> for x in 'abc':
...     for y in 'lmn':
...         res.append(x + y)
...
>>> res
['al', 'am', 'an', 'bl', 'bm', 'bn', 'cl', 'cm', 'cn']


Beyond this complexity level, though, list comprehension expressions can become too compact for their own good. In general, they are intended for simple types of iterations; for more involved work, a simpler for statement structure will probably be easier to understand and modify in the future. As usual in programming, if something is difficult for you to understand, it's probably not a good idea.

We'll revisit iterators and list comprehensions in Chapter 17, in the context of functional programming tools; as we'll see, they turn out to be just as related to functions as they are to looping statements.
```

#### 30.2.4.2.7 Chapter Summary

```text
In this chapter, we explored Python's looping statements as well as some concepts related to looping in Python. We looked at the while and for loop statements in depth, and learned about their associated else clauses. We also studied the break and continue statements, which have meaning only inside loops.

Additionally, we took our first substantial look at the iteration protocol in Pythonâa way for nonsequence objects to take part in iteration loopsâand at list comprehensions. As we saw, list comprehensions, which apply expressions to all the items in any iterable object, are similar to for loops.

This wraps up our tour of specific procedural statements. The next chapter closes out this part of the book by discussing documentation options for Python code. Documentation is also part of the general syntax model, and it's an important component of well-written programs. In the next chapter, we'll also dig into a set of exercises for this part of the book before we turn our attention to larger structures such as functions. As always, though, before moving on, first exercise what you've picked up here with a quiz.

BRAIN BUILDER

Chapter Quiz

Q:	When is a loop's else clause executed?
Q:	How can you code a counter-based loop in Python?
Q:	How are for loops and iterators related?
Q:	How are for loops and list comprehensions related?
Q:	Name four iteration contexts in the Python language.
Q:	What is the best way to read line by line from a text file today?
Q:	What sort of weapons would you expect to see employed by the Spanish Inquisition?


Quiz Answers

A:	The else clause in a while or for loop will be run once as the loop is exiting, if the loop exits normally (without running into a break statement). A break exits the loop immediately, skipping the else part on the way out (if there is one).
A:	Counter loops can be coded with a while statement that keeps track of the index manually, or with a for loop that uses the range built-in function to generate successive integer offsets. Neither is the preferred way to work in Python, if you need to simply step across all the items in a sequenceâuse a simple for loop instead, without range or counters, whenever possible. It will be easier to code, and usually quicker to run.
A:	The for loop uses the iteration protocol to step through items in the object across which it is iterating. It calls the object's next method on each iteration, and catches the StopIteration exception to determine when to stop looping.
A:	Both are iteration tools. List comprehensions are a concise and efficient way to perform a common for loop task: collecting the results of applying an expression to all items in an iterable object. It's always possible to translate a list comprehension to a for loop, and part of the list comprehension expression looks like the header of a for loop syntactically.
A:	Iteration contexts in Python include the for loop; list comprehensions; the map built-in function; the in membership test expression; and the built-in functions sorted, sum, any, and all. This category also includes the list and tuple built-ins, string join methods, and sequence assignments, all of which use the iteration protocol (the next method) to step across iterable objects one item at a time.
A:	The best way to read lines from a text file today is to not read it explicitly at all: instead, open the file within an iteration context such as a for loop or list comprehension, and let the iteration tool automatically scan one line at a time by running the file's next method on each iteration. This approach is generally best in terms of coding simplicity, execution speed, and memory space requirements.
A:	I'll accept any of the following as correct answers: fear, intimidation, nice red uniforms, a comfy couch, and soft pillows.
```
