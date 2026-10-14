---
type: reference
title: Published Books
description: "Learning Python 3rd ed. notes, Published Books"
tags: [book-notes, python, legacy]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#14.1.8"
---

# 14.1.8. Published Books

[↑ Statements and Syntax](/python/kb-python/30-learning-python-3rd-edition/02-statements-and-syntax/README.md)

```text
As a final resource, you can choose from a large collection of reference books for Python. Bear in mind that books tend to lag behind the cutting edge of Python changes, partly because of the work involved in writing, and partly because of the natural delays built into the publishing cycle. Usually, by the time a book comes out, it's three or more months behind the current Python state. Unlike standard manuals, books are also generally not free.

Still, for many, the convenience and quality of a professionally published text is worth the cost. Moreover, Python changes so slowly that books are usually still relevant years after they are published, especially if their authors post updates on the Web. See the Preface for pointers to other Python books.
```

#### 30.2.5.2 Common Coding Gotchas

```text
Before the programming exercises for this part of the book, let's run through some of the most common mistakes beginners make when coding Python statements and programs. Many of these are warnings I've thrown out earlier in this part of the book, collected here for ease of reference. You'll learn to avoid these pitfalls once you've gained a bit of Python coding experience, but a few words now might help you avoid falling into some of these traps initially:

    * Don't forget the colons. Always remember to type a : at the end of compound statement headers (the first line of an if, while, for, etc.). You'll probably forget at first (I did, and so have most of my 3,000 Python students over the years), but you can take some comfort from the fact that it will soon become an unconscious habit.
    * Start in column 1. Be sure to start top-level (unnested) code in column 1. That includes unnested code typed into module files, as well as unnested code typed at the interactive prompt.
    * Blank lines matter at the interactive prompt. Blank lines in compound statements are always ignored in module files, but when you're typing code at the interactive prompt, they end the statement. In other words, blank lines tell the interactive command line that you've finished a compound statement; if you want to continue, don't hit the Enter key at the ... prompt (or in IDLE) until you're really done.
    * Indent consistently. Avoid mixing tabs and spaces in the indentation of a block, unless you know what your text editor does with tabs. Otherwise, what you see in your editor may not be what Python sees when it counts tabs as a number of spaces. This is true in any block-structured language, not just Pythonif the next programmer has her tabs set differently, she will not understand the structure of your code. It's safer to use all tabs or all spaces for each block.
    * Don't code C in Python. A reminder for C/C++ programmers: you don't need to type parentheses around tests in if and while headers (e.g., if (X==1):). You can, if you like (any expression can be enclosed in parentheses), but they are fully superfluous in this context. Also, do not terminate all your statements with semicolons; it's technically legal to do this in Python as well, but it's totally useless unless you're placing more than one statement on a single line (the end of a line normally terminates a statement). And remember, don't embed assignment statements in while loop tests, and don't use {} around blocks (indent your nested code blocks consistently instead).
    * Use simpleforloops instead ofwhileorrange. Another reminder: a simple for loop (e.g., for x in seq:) is almost always simpler to code and quicker to run than a while- or range-based counter loop. Because Python handles indexing internally for a simple for, it can sometimes be twice as fast as the equivalent while. Avoid the temptation to count things in Python!
    * Beware of mutables in assignments. I mentioned this in Chapter 11: you need to be careful about using mutables in a multiple-target assignment (a = b = []), as well as in an augmented assignment (a += [1, 2]). In both cases, in-place changes may impact other variables. See Chapter 11 for details.
    * Don't expect results from functions that change objects in-place. We encountered this one earlier, too: in-place change operations like the list.append and list.sort methods introduced in Chapter 8 do not return values (other than None), so you should call them without assigning the result. It's not uncommon for beginners to say something like mylist = mylist.append(X) to try to get the result of an append, but what this actually does is assign mylist to None, not to the modified list (in fact, you'll lose your reference to the list altogether).

      A more devious example of this pops up when trying to step through dictionary items in a sorted fashion. It's fairly common to see code like for k in D.keys( ).sort( ):. This almost worksthe keys method builds a keys list, and the sort method orders itbut because the sort method returns None, the loop fails because it is ultimately a loop over None (a nonsequence). To code this correctly, either use the newer sorted built-in function, which returns the sorted list, or split the method calls out to statements: Ks = D.keys( ), then Ks.sort( ), and, finally, for k in Ks:. This, by the way, is one case where you'll still want to call the keys method explicitly for looping, instead of relying on the dictionary iteratorsiterators do not sort.
    * Always use parentheses to call a function. You must add parentheses after a function name to call it, whether it takes arguments or not (e.g., use function( ), not function). In Part 4, we'll see that functions are simply objects that have a special operationa call that you trigger with the parentheses.

      In classes, this problem seems to occur most often with files; it's common to see beginners type file.close to close a file, rather than file.close( ). Because it's legal to reference a function without calling it, the first version with no parentheses succeeds silently, but it does not close the file!
    * Don't use extensions or paths in imports and reloads. Omit directory paths and file suffixes in import statements (e.g., say import mod, not import mod.py). (We discussed module basics in Chapter 3, and will continue studying modules in Part 5.) Because modules may have other suffixes besides .py (.pyc, for instance), hardcoding a particular suffix is not only illegal syntax, but doesn't make sense. Any platform-specific directory path syntax comes from module search path settings, not the import statement.
```

#### 30.2.5.3 Chapter Summary

```text
This chapter took us on a tour of program documentation conceptsboth documentation we write ourselves for our own programs, and documentation available for built-in tools. We met doctrings, explored the online and manual resources for Python reference, and learned how PyDoc's help function and web page interface provide extra sources of documentation. Because this is the last chapter in this part of the book, we also reviewed common coding mistakes to help you avoid them.

In the next part of this book, we'll start applying what we already know to larger program constructs: functions. Before moving on, however, be sure to work through the set of lab exercises for this part of the book that appear at the end of this chapter. And even before that, let's run through this chapter's quiz.
```

#### 30.2.5.4 BRAIN BUILDER

```text
BRAIN BUILDER

Chapter Quiz

Q:	When should you use documentation strings instead of hash-mark comments?
Q:	Name three ways you can view documentation strings.
Q:	How can you obtain a list of the available attributes in an object?
Q:	How can you get a list of all available modules on your computer?
Q:	Which Python book should you purchase after this one?


Quiz Answers

A:	Documentation strings (docstrings) are considered best for larger, functional documentation, describing the use of modules, functions, classes, and methods in your code. Hash-mark comments are today best limited to micro-documentation about arcane expressions or statements. This is partly because docstrings are easier to find in a source file, but also because they can be extracted and displayed by the PyDoc system.
A:	You can see docstrings by printing an object's __doc__ attribute, by passing it to PyDoc's help function, and by selecting modules in PyDoc's GUI search engine in client/server mode. Additionally, PyDoc can be run to save a module's documentation in an HTML file for later viewing or printing.
A:	The built-in dir(X) function returns a list of all the attributes attached to any object.
A:	Run the PyDoc GUI interface, leave the module name blank, and select Open Browser; this opens a web page containing a link to every module available to your programs.
A:	Mine, of course. (Seriously, the Preface lists a few recommended follow-up books, both for reference and for application tuto

Now that you know how to code basic program logic, the following exercises will ask you to implement some simple tasks with statements. Most of the work is in exercise 4, which lets you explore coding alternatives. There are always many ways to arrange statements, and part of learning Python is learning which arrangements work better than others.

See "Section B.3" in Appendix B for the solutions.

1.
      Coding basic loops.
|         1.  Write a for loop that prints the ASCII code of each character in a string named S. Use the built-in function ord(character) to convert each character to an ASCII integer. (Test it interactively to see how it works.)
|         2.  Next, change your loop to compute the sum of the ASCII codes of all characters in a string.
|         3.  Finally, modify your code again to return a new list that contains the ASCII codes of each character in the string. Does the expression map(ord, S) have a similar effect? (Hint: see Part 4.)
|   2.  Backslash characters. What happens on your machine when you type the following code interactively?


          for i in range(50):
              print 'hello %d\n\a' % i


      Beware that if run outside of the IDLE interface, this example may beep at you, so you may not want to run it in a crowded lab. IDLE prints odd characters instead (see the backslash escape characters in Table 7-2).
|   3.

      Sorting dictionaries. In Chapter 8, we saw that dictionaries are unordered collections. Write a for loop that prints a dictionary's items in sorted (ascending) order. Hint: use the dictionary keys and list sort methods, or the newer sorted built-in function.
|   4.

      Program logic alternatives. Consider the following code, which uses a while loop and found flag to search a list of powers of 2 for the value of 2 raised to the 5th power (32). It's stored in a module file called power.py.


          L = [1, 2, 4, 8, 16, 32, 64]
          X = 5

          found = i = 0
          while not found and i < len(L):
              if 2 ** X == L[i]:
                  found = 1
              else:
                  i = i+1

          if found:
              print 'at index', i
          else:
              print X, 'not found'

          C:\book\tests> python power.py
          at index 5


      As is, the example doesn't follow normal Python coding techniques. Follow the steps outlined here to improve it (for all the transformations, you may type your code interactively, or store it in a script file run from the system command lineusing a file makes this exercise much easier):
|         1.  First, rewrite this code with a while loop else clause to eliminate the found flag and final if statement.
|         2.  Next, rewrite the example to use a for loop with an else clause, to eliminate the explicit list-indexing logic. Hint: to get the index of an item, use the list index method (L.index(X) returns the offset of the first X in list L).
|         3.  Next, remove the loop completely by rewriting the example with a simple in operator membership expression. (See Chapter 8 for more details, or type this to test: 2 in [1,2,3].)
|         4.  Finally, use a for loop and the list append method to generate the powers-of-2 list (L) instead of hardcoding a list literal.

      Deeper thoughts:
|         1.  Do you think it would improve performance to move the 2 ** X expression outside the loops? How would you code that?
|         2.  As we saw in exercise 1, Python includes a map(function, list) tool that can generate the powers-of-2 list, too: map(lambda x: 2 ** x, range(7)). Try typing this code interactively; we'll meet lambda more formally in Chapter 17.

	30.3. Functions

 	 	30.3.1. Function Basics
In Part 3, we looked at basic procedural statements in Python. Here, we'll move on to explore a set of additional statements that we can use to create functions of our own.

In simple terms, a function is a device that groups a set of statements so they can be run more than once in a program. Functions also can compute a result value and let us specify parameters that serve as function inputs, which may differ each time the code is run. Coding an operation as a function makes it a generally useful tool, which we can use in a variety of contexts.

More fundamentally, functions are the alternative to programming by cutting and pastingrather than having multiple redundant copies of an operation's code, we can factor it into a single function. In so doing, we reduce our future work radically: if the operation must be changed later, we only have one copy to update, not many.

Functions are the most basic program structure Python provides for maximizing code reuse and minimizing code redundancy. As we'll see, functions are also a design tool that lets us split complex systems into manageable parts. Table 15-1 summarizes the primary function-related tools we'll study in this part of the book.

Table 15-1. Function-related statements and expressions
Statement 	Examples
Calls 	myfunc("spam", "eggs", meat=ham)


def, return, yield 	def adder(a, b=1, *c): return a+b+c[0]


global 	def changer(  ): global x; x = 'new'


lambda 	Funcs = [lambda x: x**2, lambda x: x*3]


			30.3.1.1 Why Use Functions?

Before we get into the details, let's establish a clear picture of what functions are all about. Functions are a nearly universal program-structuring device. You may have come across them before in other languages, where they may have been called subroutines or procedures. As a brief introduction, functions serve two primary development roles:


Maximizing code reuse and minimizing redundancy

    As in most programming languages, Python functions are the simplest way to package logic you may wish to use in more than one place and more than one time. Up until now, all the code we've been writing has run immediately. Functions allow us to group and generalize code to be used arbitrarily many times later. Because they allow us to code an operation in a single place, and use it in many places, Python functions are the most basic factoring tool in the language: they allow us to reduce code redundancy in our programs, and thereby reduce maintenance effort.

Procedural decomposition

    Functions also provide a tool for splitting systems into pieces that have well-defined roles. For instance, to make a pizza from scratch, you would start by mixing the dough, rolling it out, adding toppings, baking it, and so on. If you were programming a pizza-making robot, functions would help you divide the overall "make pizza" task into chunksone function for each subtask in the process. It's easier to implement the smaller tasks in isolation than it is to implement the entire process at once. In general, functions are about procedurehow to do something, rather than what you're doing it to. We'll see why this distinction matters in Part 6.

In this part of the book, we'll explore the tools used to code functions in Python: function basics, scope rules, and argument passing, along with a few related concepts such as generators and functional tools. Because its importance begins to become more apparent at this level of coding, we'll also revisit the notion of polymorphism introduced earlier in the book. As you'll see, functions don't imply much new syntax, but they do lead us to some bigger programming ideas.

				30.3.1.1.1 Coding Functions

Although it wasn't made very formal, we've already used some functions in earlier chapters. For instance, to make a file object, we called the built-in open function; similarly, we used the len built-in function to ask for the number of items in a collection object.

In this chapter, we will explore how to write new functions in Python. Functions we write behave the same way as the built-ins we've already seen: they are called in expressions, are passed values, and return results. But writing new functions requires the application of a few additional ideas that haven't yet been introduced. Moreover, functions behave very differently in Python than they do in compiled languages like C. Here is a brief introduction to the main concepts behind Python functions, all of which we will study in this part of the book:

    * defis executable code. Python functions are written with a new statement, the def. Unlike functions in compiled languages such as C, def is an executable statementyour function does not exist until Python reaches and runs the def. In fact, it's legal (and even occasionally useful) to nest def statements inside if statements, while loops, and even other defs. In typical operation, def statements are coded in module files, and are naturally run to generate functions when a module file is first imported.
    * defcreates an object and assigns it to a name. When Python reaches and runs a def statement, it generates a new function object, and assigns it to the function's name. As with all assignments, the function name becomes a reference to the function object. There's nothing magic about the name of a functionas you'll see, the function object can be assigned to other names, stored in a list, and so on. Functions may also be created with the lambda expression (a more advanced concept deferred until a later chapter).
    * returnsends a result object back to the caller. When a function is called, the caller stops until the function finishes its work, and returns control to the caller. Functions that compute a value send it back to the caller with a return statement; the returned value becomes the result of the function call. Functions known as generators may also use the yield statement to send back a value and suspend their state such that they may be resumed later; this is another advanced topic covered later in this part of the book.
    * Arguments are passed by assignment (object reference). In Python, arguments are passed to functions by assignment (which, as we've learned, means by object reference). As you'll see, Python's model isn't really equivalent to C's passing rules or C++'s reference parametersthe caller and function share objects by references, but there is no name aliasing. Changing an argument name does not also change a name in the caller, but changing passed-in mutable objects can change objects shared by the caller.
    * globaldeclares module-level variables that are to be assigned. By default, all names assigned in a function, are local to that function and exist only while the function runs. To assign a name in the enclosing module, functions need to list it in a global statement. More generally, names are always looked up in scopesplaces where variables are storedand assignments bind names to scopes.
    * Arguments, return values, and variables are not declared. As with everything in Python, there are no type constraints on functions. In fact, nothing about a function needs to be declared ahead of time: you can pass in arguments of any type, return any kind of object, and so on. As one consequence, a single function can often be applied to a variety of object typesany objects that sport a compatible interface (methods and expressions) will do, regardless of their specific type.

If some of the preceding words didn't sink in, don't worrywe'll explore all of these concepts with real code in this part of the book. Let's get started by expanding on some of these ideas and looking at a few examples.

				30.3.1.1.2 def Statements

The def statement creates a function object and assigns it to a name. Its general format is as follows:


def <name>(arg1, arg2,... argN):
    <statements>


As with all compound Python statements, def consists of a header line followed by a block of statements, usually indented (or a simple statement after the colon). The statement block becomes the function's bodythat is, the code Python executes each time the function is called.

The def header line specifies a function name that is assigned the function object, along with a list of zero or more arguments (sometimes called parameters) in parentheses. The argument names in the header are assigned to the objects passed in parentheses at the point of call.

Function bodies often contain a return statement:


def <name>(arg1, arg2,... argN):
    ...
    return <value>


The Python return statement can show up anywhere in a function body; it ends the function call, and sends a result back to the caller. The return statement consists of an object expression that gives the function's result. The return statement is optional; if it's not present, the function exits when the control flow falls off the end of the function body. Technically, a function without a return statement returns the None object automatically, but this return value is usually ignored.

Functions may also contain yield statements, which are designed to produce a series of values over time, but we'll defer discussion of these until we survey advanced function topics in Chapter 17.

				30.3.1.1.3 def Executes at Runtime

The Python def is a true executable statement: when it runs, it creates and assigns a new function object to a name. (Remember, all we have in Python is runtime; there is no such thing as a separate compile time.) Because it's a statement, a def can appear anywhere a statement caneven nested in other statements. For instance, although defs normally are run when the module enclosing them is imported, it's also completely legal to nest a function def inside an if statement to select between alternative definitions:


if test:
    def func(  ):          # Define func this way
        ...
else:
    def func(  ):          # Or else this way
        ...
...
func(  )                   # Call the version selected and built


One way to understand this code is to realize that the def is much like an = statement: it simply assigns a name at runtime. Unlike in compiled languages such as C, Python functions do not need to be fully defined before the program runs. More generally, defs are not evaluated until they are reached and run, and the code inside defs is not evaluated until the functions are later called.

Because function definition happens at runtime, there's nothing special about the function name. What's important is the object to which it refers:


othername = func           # Assign function object
othername(  )              # Call func again


Here, the function was assigned to a different name and called through the new name. Like everything else in Python, functions are just objects; they are recorded explicitly in memory at program execution time.

			30.3.1.2 A First Example: Definitions and Calls

Apart from such runtime concepts (which tend to seem most unique to programmers with backgrounds in traditional compiled languages), Python functions are straightforward to use. Let's code a first real example to demonstrate the basics. As you'll see, there are two sides to the function picture: a definition (the def that creates a function), and a call (an expression that tells Python to run the function's body).

				30.3.1.2.1 Definition

Here's a definition typed interactively that defines a function called times, which returns the product of its two arguments:


>>> def times(x, y):  # Create and assign function
...     return x * y  # Body executed when called
...


When Python reaches and runs this def, it creates a new function object that packages the function's code and assigns the object to the name times. Typically, such a statement is coded in a module file, and runs when the enclosing file is imported; for something this small, though, the interactive prompt suffices.

				30.3.1.2.2 Calls

After the def has run, you can call (run) the function in your program by adding parentheses after the function's name. The parentheses may optionally contain one or more object arguments, to be passed (assigned) to the names in the function's header:


>>> times(2, 4)  # Arguments in parentheses
8


This expression passes two arguments to times. As mentioned previously, arguments are passed by assignment, so, in this case, the name x in the function header is assigned the value 2, y is assigned the value 4, and the function's body is run. For this function, the body is just a return statement that sends back the result as the value of the call expression. The returned object was printed here interactively (as in most languages, 2 * 4 is 8 in Python), but, if we needed to use it later, we could instead assign it to a variable. For example:


| >>> x = times(3.14, 4)  # Save the result object
| >>> x 
| 12.56


Now, watch what happens when the function is called a third time, with very different kinds of objects passed in:


>>> times('Ni', 4)  # Functions are "typeless"
'NiNiNiNi'


This time, our function means something completely different (Monty Python reference again intended). In this third call, a string and an integer are passed to x and y, instead of two numbers. Recall that * works on both numbers and sequences; because we never declare the types of variables, arguments, or return values in Python, we can use times to either multiply numbers or repeat sequences.

In other words, what our times function means and does depends on what we pass into it. This is a core idea in Python (and perhaps the key to using the language well), which we'll explore in the next section.

				30.3.1.2.3 Polymorphism in Python

As we just saw, the very meaning of the expression x * y in our simple times function depends completely upon the kinds of objects that x and y arethus, the same function can perform multiplication in one instance, and repetition in another. Python leaves it up to the objects to do something reasonable for the syntax. Really, * is just a dispatch to the objects being processed.

This sort of type-dependent behavior is known as polymorphism, a term we first met in Chapter 4 that essentially means that the meaning of an operation depends on the objects being operated upon. Because it's a dynamically typed language, polymorphism runs rampant in Python. In fact, every operation is a polymorphic operation in Python: printing, indexing, the * operator, and much more.

This is deliberate, and it accounts for much of the language's conciseness and flexibility. A single function, for instance, can generally be applied to a whole category of object types automatically. As long as those objects support the expected interface (a.k.a. protocol), the function can process them. That is, if the objects passed into a function have the expected methods and expression operators, they are plug-and-play compatible with the function's logic.

Even in our simple times function, this means that any two objects that support a * will work, no matter what they may be, and no matter when they are coded. This function will work on two numbers (performing multiplication), or a string and a number (performing repetition), or any other combination of objects supporting the expected interfaceeven class-based objects we have not even coded yet.

Moreover, if the objects passed in do not support this expected interface, Python will detect the error when the * expression is run, and raise an exception automatically. It's therefore pointless to code error checking ourselves. In fact, doing so would limit our function's utility, as it would be restricted to work only on objects whose types we test for.

This turns out to be a crucial philosophical difference between Python and statically typed languages like C++ and Java: in Python, your code is not supposed to care about specific data types. If it does, it will be limited to working on just the types you anticipated when you wrote it, and it will not support other compatible object types that may be coded in the future. Although it is possible to test for types with tools like the type built-in function, doing so breaks your code's flexibility. By and large, we code to object interfaces in Python, not data types.

Of course, this polymorphic model of programming means we have to test our code to detect errors, rather than providing type declarations a compiler can use to detect some types of errors for us ahead of time. In exchange for an initial bit of testing, though, we radically reduce the amount of code we have to write, and radically increase our code's flexibility. As you'll learn, it's a net win in practice.

			30.3.1.3 A Second Example: Intersecting Sequences

Let's look at a second function example that does something a bit more useful than multiplying arguments and further illustrates function basics.

In Chapter 13, we coded a for loop that collected items held in common in two strings. We noted there that the code wasn't as useful as it could be because it was set up to work only on specific variables and could not be rerun later. Of course, we could copy the code and paste it into each place where it needs to be run, but this solution is neither good nor general¿we'd still have to edit each copy to support different sequence names, and changing the algorithm would then require changing multiple copies.

				30.3.1.3.1 Definition

By now, you can probably guess that the solution to this dilemma is to package the for loop inside a function. Doing so offers a number of advantages:

    * Putting the code in a function makes it a tool that you can run as many times as you like.
    * Because callers can pass in arbitrary arguments, functions are general enough to work on any two sequences (or other iterables) you wish to intersect.
    * When the logic is packaged in a function, you only have to change code in one place if you ever need to change the way the intersection works.
    * Coding the function in a module file means it can be imported and reused by any program run on your machine.

In effect, wrapping the code in a function makes it a general intersection utility:


def intersect(seq1, seq2):
    res = []                     # Start empty
    for x in seq1:               # Scan seq1
        if x in seq2:            # Common item?
            res.append(x)        # Add to end
    return res


The transformation from the simple code of Chapter 13 to this function is straightforward; we've just nested the original logic under a def header, and made the objects on which it operates passed-in parameter names. Because this function computes a result, we've also added a return statement to send a result object back to the caller.

				30.3.1.3.2 Calls

Before you can call a function, you have to make it. To do this, run its def statement, either by typing it interactively, or by coding it in a module file and importing the file. Once you've run the def, you can call the function by passing any two sequence objects in parentheses:


>>> s1 = "SPAM" 
>>> s2 = "SCAM" 
>>> intersect(s1, s2)  # Strings
['S', 'A', 'M']


Here, we've passed in two strings, and we get back a list containing the characters in common. The algorithm the function uses is simple: "for every item in the first argument, if that item is also in the second argument, append the item to the result." It's a little shorter to say that in Python than in English, but it works out the same.

				30.3.1.3.3 Polymorphism Revisited

Like all functions in Python, intersect is polymorphic. That is, it works on arbitrary types, as long as they support the expected object interface:


>>> x = intersect([1, 2, 3], (1, 4))  # Mixed types
>>> x  # Saved result object
[1]


This time, we passed in different types of objects to our function¿a list and a tuple (mixed types)¿and it still picked out the common items. Because you don't have to specify the types of arguments ahead of time, the intersect function happily iterates through any kind of sequence objects you send it, as long as they support the expected interfaces.

For intersect, this means that the first argument has to support the for loop, and the second has to support the in membership test. Any two such objects will work, regardless of their specific types¿that includes physically stored sequences like strings and lists; all the iterable objects we met in Chapter 13, including files and dictionaries; and even any class-based objects we code that apply operator overloading techniques (we'll discuss these later, in Part 6 of this text).[39]

    [39] * Two fine points here. One, technically a file will work as the first argument to the intersect function, but not the second, because the file will have been scanned to end-of-file after the first in membership test has been run. For instance, a call such as intersect(open('data1.txt'), ['line1\n', 'line2\n', 'line3\n']) would work, but a call like intersect(open('data1.txt), open('data2.txt')) would not, unless the first file contained only one line¿for real sequences, the call to iter made by iteration contexts to obtain an iterator always restarts from the beginning, but once a file has been opened and read, its iterator is effectively exhausted. Two, note that for classes, we would probably use the newer __iter__ or older __getitem__ operator overloading methods covered in Chapter 24 to support the expected iteration protocol. If we do this, we can define and control what iteration means for our data.

Here again, if we pass in objects that do not support these interfaces (e.g., numbers), Python will automatically detect the mismatch, and raise an exception for us¿which is exactly what we want, and the best we could do on our own if we coded explicit type tests. By not coding type tests, and allowing Python to detect the mismatches for us, we both reduce the amount of code we need to write, and increase our code's flexibility.

				30.3.1.3.4 Local Variables

The variable res inside intersect is what in Python is called a local variable¿a name that is visible only to code inside the function def, and exists only while the function runs. In fact, because all names assigned in any way inside a function are classified as local variables by default, nearly all the names in intersect are local variables:

    * res is obviously assigned, so it is a local variable.
    * Arguments are passed by assignment, so seq1 and seq2 are, too.
    * The for loop assigns items to a variable, so the name x is also local.

All these local variables appear when the function is called, and disappear when the function exits¿the return statement at the end of intersect sends back the result object, but the name res goes away. To fully explore the notion of locals, though, we need to move on to Chapter 16.

			30.3.1.4 Chapter Summary

This chapter introduced the core ideas behind function definition¿the syntax and operation of the def and return statements, the behavior of function call expressions, and the notion and benefits of polymorphism in Python functions. As we saw, a def statement is executable code that creates a function object at runtime; when the function is later called, objects are passed into it by assignment (recall that assignment means object reference in Python, which, as we learned in Chapter 6, really means pointer internally), and computed values are sent back by return. We also began exploring the concepts of local variables and scopes in this chapter, but we'll save all the details on those topics for Chapter 16. First, though, a quick quiz.

BRAIN BUILDER

Chapter Quiz

Q:	What is the point of coding functions?
Q:	At what time does Python create a function?
Q:	What does a function return if it has no return statement in it?
Q:	When does the code nested inside the function definition statement run?
Q:	What's wrong with checking the types of objects passed into a function?


Quiz Answers

A:	Functions are the most basic way of avoiding code redundancy in Python¿factoring code into functions means that we have only one copy of an operation's code to update in the future. Functions are also the basic unit of code reuse in Python¿wrapping code in functions makes it a reusable tool, callable in a variety of programs. Finally, functions allow us to divide a complex system into manageable parts, each of which may be developed individually.
A:	A function is created when Python reaches and runs the def statement; this statement creates a function object, and assigns it the function's name. This normally happens when the enclosing module file is imported by another module (recall that imports run the code in a file from top to bottom, including any defs), but it can also occur when a def is typed interactively or nested in other statements, such as ifs.
A:	A function returns the None object by default if the control flow falls off the end of the function body without running into a return statement. Such functions are usually called with expression statements, as assigning their None results to variables is generally pointless.
A:	The function body (the code nested inside the function definition statement) is run when the function is later called with a call expression. The body runs anew each time the function is called.
A:	Checking the types of objects passed into a function effectively breaks the function's flexibility, constraining the function to work on specific types only. Without such checks, the function would likely be able to process an entire range of object types¿any objects that support the interface expected by the function will work. (The term interface means the set of methods and expression operators the function runs.)

			30.3.1.5

 	 	30.3.2. Scopes and Arguments

Chapter 15 introduced basic function definitions and calls. As we saw, Python's basic function model is simple to use. This chapter presents the details behind Python's scopesthe places where variables are defined and looked upand behind argument passingthe way that objects are sent to functions as inputs.

			30.3.2.1 Scope Rules

Now that you're ready to start writing your own functions, we need to get more formal about what names mean in Python. When you use a name in a program, Python creates, changes, or looks up the name in what is known as a namespacea place where names live. When we talk about the search for a name's value in relation to code, the term scope refers to a namespace: that is, the location of a name's assignment in your code determines the scope of the name's visibility to your code.

Just about everything related to names, including scope classification, happens at assignment time in Python. As we've seen, names in Python spring into existence when they are first assigned values, and they must be assigned before they are used. Because names are not declared ahead of time, Python uses the location of the assignment of a name to associate it with (i.e., bind it to) a particular namespace. In other words, the place where you assign a name in your source code determines the namespace it will live in, and hence its scope of visibility.

Besides packaging code, functions add an extra namespace layer to your programsby default, all names assigned inside a function are associated with that function's namespace, and no other. This means that:

    * Names defined inside a def can only be seen by the code within that def. You cannot even refer to such names from outside the function.
    * Names defined inside a def do not clash with variables outside the def, even if the same names are used elsewhere. A name X assigned outside a given def (i.e., in a different def or at the top level of a module file) is a completely different variable from a name X assigned inside that def.

In all cases, the scope of a variable (where it can be used) is always determined by where it is assigned in your source code, and has nothing to do with which functions call which. If a variable is assigned inside a def, it is local to that function; if assigned outside a def, it is global to the entire file. We call this lexical scoping because variable scopes are determined entirely by the locations of the variables in the source code of your program files, not by function calls.

For example, in the following module file, the X = 99 assignment creates a global variable named X (visible everywhere in this file), but the X = 88 assignment creates a local variable X (visible only within the def statement):


X = 99

def func(  ):
    X = 88


Even though both variables are named X, their scopes make them different. The net effect is that function scopes help to avoid name clashes in your programs, and help to make functions more self-contained program units.

				30.3.2.1.1 Python Scope Basics

Before we started writing functions, all the code we wrote was at the top level of a module (i.e., not nested in a def), so the names we used either lived in the module itself, or were built-ins predefined by Python (e.g., open).[40] Functions provide nested namespaces (scopes) that localize the names they use, such that names inside a function won't clash with those outside it (in a module or another function). Again, functions define a local scope, and modules define a global scope. The two scopes are related as follows:

    [40] * Code typed at the interactive command prompt is really entered into a built-in module called __main__, so interactively created names live in a module, too, and thus follow the normal scope rules. You'll learn more about modules in Part 5.

    * The enclosing module is a global scope. Each module is a global scopethat is, a namespace in which variables created (assigned) at the top level of the module file live. Global variables become attributes of a module object to the outside world, but can be used as simple variables within a module file.
    * The global scope spans a single file only. Don't be fooled by the word "global" herenames at the top level of a file are only global to code within that single file. There is really no notion of a single, all-encompassing global file-based scope in Python. Instead, names are partitioned into modules, and you must always import a module explicitly if you want to be able to use the names its file defines. When you hear "global" in Python, think "module."
    * Each call to a function creates a new local scope. Every time you call a function, you create a new local scopethat is, a namespace in which the names created inside that function will usually live. You can think of each def statement (and lambda expression) as defining a new local scope, but because Python allows functions to call themselves to loop (an advanced technique known as recursion), the local scope in fact technically corresponds to a function callin other words, each call creates a new local namespace. Recursion is useful when processing structures whose shape can't be predicted ahead of time.
    * Assigned names are local unless declared global. By default, all the names assigned inside a function definition are put in the local scope (the namespace associated with the function call). If you need to assign a name that lives at the top level of the module enclosing the function, you can do so by declaring it in a global statement inside the function.
    * All other names are enclosing locals, globals, or built-ins. Names not assigned a value in the function definition are assumed to be enclosing scope locals (in an enclosing def), globals (in the enclosing module's namespace), or built-ins (in the predefined __builtin__ module Python provides).

Note that any type of assignment within a function classifies a name as local: = statements, imports, defs, argument passing, and so on. Also, notice that in-place changes to objects do not classify names as locals; only actual name assignments do. For instance, if the name L is assigned to a list at the top level of a module, a statement like L.append(X) within a function will not classify L as a local, whereas L = X will. In the former case, L will be found in the global scope as usual, and the statement will change the global list.

				30.3.2.1.2 Name Resolution: The LEGB Rule

If the prior section sounds confusing, it really boils down to three simple rules. With a def statement:

    * Name references search at most four scopes: local, then enclosing functions (if any), then global, then built-in.
    * Name assignments create or change local names by default.
    * Global declarations map assigned names to an enclosing module's scope.

In other words, all names assigned inside a function def statement (or a lambda, an expression we'll meet later) are locals by default; functions can use names in lexically (i.e., physically) enclosing functions and in the global scope, but they must declare globals to change them. Python's name resolution scheme is sometimes called the LEGB rule, after the scope names:

    * When you use an unqualified name inside a function, Python searches up to four scopesthe local (L) scope, then the local scopes of any enclosing (E) defs and lambdas, then the global (G) scope, and then the built-in (B) scopeand stops at the first place the name is found. If the name is not found during this search, Python reports an error. As we learned in Chapter 6, names must be assigned before they can be used.
    * When you assign a name in a function (instead of just referring to it in an expression), Python always creates or changes the name in the local scope, unless it's declared to be global in that function.
    * When you assign a name outside a function (i.e., at the top level of a module file, or at the interactive prompt), the local scope is the same as the global scopethe module's namespace.

Figure 16-1 illustrates Python's four scopes. Note that the second E scope lookup layerthe scopes of enclosing defs or lambdascan technically correspond to more than one lookup layer. It only comes into play when you nest functions within functions.[41]

    [41] * The scope lookup rule was called the "LGB rule" in the first edition of this book. The enclosing def layer was added later in Python to obviate the task of passing in enclosing scope names explicitlya topic usually of marginal interest to Python beginners that we'll defer until later in this chapter.

Figure 16-1. The LEGB scope lookup rule. When a variable is referenced, Python searches for it in this order: in the local scope, in any enclosing functions' local scopes, in the global scope, and, finally, in the built-in scope. The first occurrence wins. The place in your code where a variable is assigned usually determines its scope.


Also, keep in mind that these rules only apply to simple variable names (such as spam). In Parts V and VI, we'll see that qualified attribute names (such as object.spam) live in particular objects and follow a completely different set of lookup rules than the scope ideas covered here. Attribute references (names following periods) search one or more objects, not scopes, and may invoke something called "inheritance" (discussed in Part 6).

				30.3.2.1.3 Scope Example

Let's look at a larger example that demonstrates scope ideas. Suppose we write the following code in a module file:


# Global scope
X = 99                # X and func assigned in module: global

def func(Y):          # Y and Z assigned in function: locals
    # Local scope
    Z = X + Y         # X is a global
    return Z

func(1)               # func in module: result=100


This module and the function it contains use a number of names to do their business. Using Python's scope rules, we can classify the names as follows:


Global names:X, func

    X is global because it's assigned at the top level of the module file; it can be referenced inside the function without being declared global. func is global for the same reason; the def statement assigns a function object to the name func at the top level of the module.

Local names:Y, Z

    Y and Z are local to the function (and exist only while the function runs) because they are both assigned values in the function definition: Z by virtue of the = statement, and Y because arguments are always passed by assignment.

The whole point behind this name segregation scheme is that local variables serve as temporary names that you need only while a function is running. For instance, in the preceding example, the argument Y and the addition result Z exist only inside the function; these names don't interfere with the enclosing module's namespace (or any other function, for that matter).

The local/global distinction also makes functions easier to understand, as most of the names a function uses appear in the function itself, not at some arbitrary place in a module. Also, because you can be sure that local names will not be changed by some remote function in your program, they tend to make programs easier to debug.

				30.3.2.1.4 The Built-in Scope

We've been talking about the built-in scope in the abstract, but it's a bit simpler than you may think. Really, the built-in scope is just a built-in module called __builtin__, but you have to import __builtin__ to use built-in because the name builtin is not itself built-in.

No, I'm serious! The built-in scope is implemented as a standard library module named __builtin__, but that name itself is not placed in the built-in scope, so you have to import it in order to inspect it. Once you do, you can run a dir call to see which names are predefined:


>>> import __builtin__ 
>>> dir(__builtin__) 
['ArithmeticError', 'AssertionError', 'AttributeError',
'DeprecationWarning', 'EOFError', 'Ellipsis',
    ...many more names omitted... 
'str', 'super', 'tuple', 'type', 'unichr', 'unicode',
'vars', 'xrange', 'zip']


The names in this list constitute the built-in scope in Python; roughly the first half are built-in exceptions, and the second half are built-in functions. Because Python automatically searches this module last in its LEGB lookup rule, you get all the names in this list for free; that is, you can use them without importing any modules. Thus, there are two ways to refer to a built-in functionby taking advantage of the LEGB rule, or by manually importing the __builtin__ module:


>>> zip  # The normal way
<built-in function zip>

>>> import __builtin__  # The hard way
>>> __builtin__.zip 
<built-in function zip>


The second of these approaches is sometimes useful in advanced work. The careful reader might also notice that because the LEGB lookup procedure takes the first occurrence of a name that it finds, names in the local scope may override variables of the same name in both the global and built-in scopes, and global names may override built-ins. A function can, for instance, create a local variable called open by assigning to it:


def hider(  ):
    open = 'spam'              # Local variable, hides built-in
    ...
    open('data.txt')           # This won't open a file now in this scope!


However, this will hide the built-in function called open that lives in the built-in (outer) scope. It's also usually a bug, and a nasty one at that, because Python will not issue a warning message about it (there are times in advanced programming where you may really want to replace a built-in name by redefining it in your code).[42]

    [42] * Here's another thing you can do in Python that you probably shouldn'tbecause the names True and False are just variables in the built-in scope, it's possible to reassign them with a statement like True = False. You won't break the logical consistency of the universe in so doing! This statement merely redefines the word True for the single scope in which it appears. For more fun, though, you could say __builtin__.True = False, to reset True to False for the entire Python process! This may be disallowed in the future (and it sends IDLE into a strange panic state that resets the user code process). This technique is, however, useful for tool writers who must change built-ins such as open to customized functions. Also, note that third-party tools such as PyChecker will warn about common programming mistakes, including accidental assignment to built-in names (this is known as "shadowing" a built-in in PyChecker).

Functions can similarly hide global variables of the same name with locals:


X = 88                         # Global X

def func(  ):
    X = 99                     # Local X: hides global

func(  )
print X                        # Prints 88: unchanged


Here, the assignment within the function creates a local X that is a completely different variable from the global X in the module outside the function. Because of this, there is no way to change a name outside a function without adding a global declaration to the def (as described in the next section).

			30.3.2.2 The global Statement

The global statement is the only thing that's remotely like a declaration statement in Python. It's not a type or size declaration, though; it's a namespace declaration. It tells Python that a function plans to change one or more global names¿i.e., names that live in the enclosing module's scope (namespace). We've talked about global in passing already. Here's a summary:

    * Global names are names at the top level of the enclosing module file.
    * Global names must be declared only if they are assigned in a function.
    * Global names may be referenced in a function without being declared.

The global statement consists of the keyword global, followed by one or more names separated by commas. All the listed names will be mapped to the enclosing module's scope when assigned or referenced within the function body. For instance:


X = 88                         # Global X

def func(  ):
    global X
    X = 99                     # Global X: outside def

func(  )
print X                        # Prints 99


We've added a global declaration to the example here, such that the X inside the def now refers to the X outside the def; they are the same variable this time. Here is a slightly more involved example of global at work:


y, z = 1, 2                    # Global variables in module
def all_global(  ):
    global x                   # Declare globals assigned
    x = y + z                  # No need to declare y, z: LEGB rule


Here, x, y, and z are all globals inside the function all_global. y and z are global because they aren't assigned in the function; x is global because it was listed in a global statement to map it to the module's scope explicitly. Without the global here, x would be considered local by virtue of the assignment.

Notice that y and z are not declared global; Python's LEGB lookup rule finds them in the module automatically. Also, notice that x might not exist in the enclosing module before the function runs; if not, the assignment in the function creates x in the module.

				30.3.2.2.1 Minimize Global Variables

By default, names assigned in functions are locals, so if you want to change names outside functions, you have to write extra code (global statements). This is by design¿as is common in Python, you have to say more to do the "wrong" thing. Although there are times when globals are useful, variables assigned in a def are local by default because that is normally the best policy. Changing globals can lead to well-known software engineering problems: because the variables' values are dependent on the order of calls to arbitrarily distant functions, programs can become difficult to debug.

Consider this module file, for example:


X = 99
def func1(  ):
    global X
    X = 88

def func2(  ):
    global X
    X = 77


Now, imagine that it is your job to modify or reuse this module file. What will the value of X be here? Really, that question has no meaning unless qualified with a point of reference in time¿the value of X is timing-dependent, as it depends on which function was called last (something we can't tell from this file alone).

The net effect is that to understand this code, you have to trace the flow of control through the entire program. And, if you need to reuse or modify the code, you have to keep the entire program in your head all at once. In this case, you can't really use one of these functions without bringing along the other. They are dependent (that is, coupled) on the global variable. This is the problem with globals¿they generally make code more difficult to understand and use than code consisting of self-contained functions that rely on locals.

On the other hand, short of using object-oriented programming and classes, global variables are probably the most straightforward way to retain state information (information that a function needs to remember for use the next time it is called) in Python¿local variables disappear when the function returns, but globals do not. Other techniques, such as default mutable arguments and enclosing function scopes, can achieve this, too, but they are more complex than pushing values out to the global scope for retention.

Some programs designate a single module to collect globals; as long as this is expected, it is not as harmful. Also, programs that use multithreading to do parallel processing in Python essentially depend on global variables¿they become shared memory between functions running in parallel threads, and so act as a communication device (threading is beyond this book's scope; see the follow-up texts mentioned in the Preface for more details).

For now, though, especially if you are relatively new to programming, avoid the temptation to use globals whenever you can (try to communicate with passed-in arguments and return values instead). Six months from now, both you and your coworkers will be happy you did.

				30.3.2.2.2 Minimize Cross-File Changes

Here's another scope-related issue: although we can change variables in another file directly, we usually shouldn't. Consider these two module files:


# first.py
X = 99

# second.py
import first
first.X = 88


The first defines a variable X, which the second changes by assignment. Notice that we must import the first module into the second file to get to its variable¿as we've learned, each module is a self-contained namespace (package of variables), and we must import one module to see inside it from another. Really, in terms of this chapter's topic, the global scope of a module file becomes the attribute namespace of the module object once it is imported¿importers automatically have access to all of the file's global variables, so a file's global scope essentially morphs into an object's attribute namespace when it is imported.

After importing the first module, the second module assigns its variable a new value. The problem with the assignment, however, is that it is too implicit: whoever's charged with maintaining or reusing the first module probably has no clue that some arbitrarily far-removed module on the import chain can change X out from under him. In fact, the second module may be in a completely different directory, and so difficult to find. Again, this sets up too strong a coupling between the two files¿because they are both dependent on the value of the variable X, it's difficult to understand or reuse one file without the other.

Here again, the best prescription is generally not to do this¿the best way to communicate across file boundaries is to call functions, passing in arguments, and getting back return values. In this specific case, we would probably be better off coding an accessor function to manage the change:


# first.py
X = 99

def setX(new):
    global X
    X = new

# second.py
import first
first.setX(88)


This requires more code, but it makes a huge difference in terms of readability and maintainability¿when a person reading the first module by itself sees a function, he will know that it is a point of interface, and will expect the change to the variable X. Although we cannot prevent cross-file changes from happening, common sense dictates that they should be minimized unless widely accepted across the program.

				30.3.2.2.3 Other Ways to Access Globals

Interestingly, because global-scope variables morph into the attributes of a loaded module object, we can emulate the global statement by importing the enclosing module and assigning to its attributes, as in the following example module file. Code in this file imports the enclosing module by name, and then by indexing sys.modules, the loaded modules table (more on this table in Chapter 21):
Code View: Scroll / Show All


# thismod.py

var = 99                              # Global variable == module attribute

def local(  ):
    var = 0                           # Change local var

def glob1(  ):
    global var                        # Declare global (normal)
    var += 1                          # Change global var

def glob2(  ):
    var = 0                           # Change local var
    import thismod                    # Import myself
    thismod.var += 1                  # Change global var

def glob3(  ):
    var = 0                           # Change local var
    import sys                        # Import system table
    glob = sys.modules['thismod']     # Get module object (or use __name__)
    glob.var += 1                     # Change global var

def test(  ):
    print var
    local(); glob1(); glob2(  ); glob3(  )
    print var

					    


When run, this adds 3 to the global variable (only the first function does not impact it):


>>> import thismod
>>> thismod.test(  )
99
102
>>> thismod.var
102


This works, and it illustrates the equivalence of globals to module attributes, but it's much more work than using the global statement to make your intentions explicit.

			30.3.2.3 Scopes and Nested Functions

So far, I've omitted one part of Python's scope rules (on purpose, because it's relatively rarely encountered in practice). However, it's time to take a deeper look at the letter E in the LEGB lookup rule. The E layer is fairly new (it was added in Python 2.2); it takes the form of the local scopes of any and all enclosing function defs. Enclosing scopes are sometimes also called statically nested scopes. Really, the nesting is a lexical one¿nested scopes correspond to physically nested code structures in your program's source code.

	

In Python 3.0, a proposed nonlocal statement is planned that will allow write access to variables in enclosing function scopes, much like the global statement does today for variables in the enclosing module scope. This statement will look like the global statement syntactically, but will use the word nonlocal instead. This is still a futurism, so see the 3.0 release notes for details.

				30.3.2.3.1 Nested Scope Details

With the addition of nested function scopes, variable lookup rules become slightly more complex. Within a function:

    * An assignment (X = value) creates or changes the name X in the current local scope, by default. If X is declared global within the function, it creates or changes the name X in the enclosing module's scope instead.
    * A reference (X) looks for the name X first in the current local scope (function); then in the local scopes of any lexically enclosing functions in your source code, from inner to outer; then in the current global scope (the module file); and finally in the built-in scope (the module __builtin__). global declarations make the search begin in the global (module file) scope instead.

Notice that the global declaration still maps variables to the enclosing module. When nested functions are present, variables in enclosing functions may only be referenced, not changed. To clarify these points, let's illustrate with some real code.

				30.3.2.3.2 Nested Scope Examples

Here is an example of a nested scope:


def f1(  ):
    x = 88
    def f2(  ):
        print x
    f2(  )

f1(  )                                     # Prints 88


First off, this is legal Python code: the def is simply an executable statement that can appear anywhere any other statement can¿including nested in another def. Here, the nested def runs while a call to the function f1 is running; it generates a function, and assigns it to the name f2, a local variable within f1's local scope. In a sense, f2 is a temporary function that only lives during the execution of (and is only visible to code in) the enclosing f1.

But, notice what happens inside f2: when it prints the variable x, it refers to the x that lives in the enclosing f1 function's local scope. Because functions can access names in all physically enclosing def statements, the x in f2 is automatically mapped to the x in f1, by the LEGB lookup rule.

This enclosing scope lookup works even if the enclosing function has already returned. For example, the following code defines a function that makes and returns another function:


def f1(  ):
    x = 88
    def f2(  ):
        print x
    return f2

action = f1(  )                            # Make, return function
action(  )                                 # Call it now: prints 88


In this code, the call to action is really running the function we named f2 when f1 ran. f2 remembers the enclosing scope's x in f1, even though f1 is no longer active.

					30.3.2.3.2.1 Factory functions

Depending on whom you ask, this sort of behavior is also sometimes called a closure, or factory function¿a function object that remembers values in enclosing scopes, even though those scopes may not be around any more. Although classes (described in Part 6) are usually best at remembering state because they make it explicit with attribute assignments, such functions provide another alternative.

For instance, factory functions are sometimes used by programs that need to generate event handlers on the fly in response to conditions at runtime (e.g., user inputs that cannot be anticipated). Look at the following function, for example:


>>> def maker(N):
...     def action(X):
...         return X ** N
...     return action
...


This defines an outer function that simply generates and returns a nested function, without calling it. If we call the outer function:


>>> f = maker(2)  # Pass 2 to N
>>> f 
<function action at 0x014720B0>


what we get back is a reference to the generated nested function¿the one created by running the nested def. If we now call what we got back from the outer function:


>>> f(3)  # Pass 3 to X, N remembers 2
9
>>> f(4)  # 4 ** 2
16


it invokes the nested function¿the one called action within maker. The most unusual part of this, though, is that the nested function remembers integer 2, the value of the variable N in maker, even though maker has returned and exited by the time we call action. In effect, N from the enclosing local scope is retained as state information attached to action, and we get back its argument squared.

Now, if we call the outer function again, we get back a new nested function with different state information attached¿we get the argument cubed instead of squared, but the original still squares as before:


>>> g = maker(3) 
>>> g(3)  # 3 ** 3
27
>>> f(3)  # 3 ** 2
9


This is a fairly advanced technique that you're unlikely to see very often in practice, except among programmers with backgrounds in functional programming languages (and sometimes in lambdas, as discussed ahead). In general, classes, which we'll discuss later in the book, are better at "memory" like this because they make the state retention explicit. Short of using classes, though, globals, enclosing scope references like these, and default arguments are the main ways that Python functions can retain state information. Coincidentally, defaults are the topic of the next section.

					30.3.2.3.2.2 Retaining enclosing scopes' state with defaults

In earlier versions of Python, the sort of code in the prior section failed because nested defs did not do anything about scopes¿a reference to a variable within f2 would search only the local (f2), then global (the code outside f1), and then built-in scopes. Because it skipped the scopes of enclosing functions, an error would result. To work around this, programmers typically used default argument values to pass in (remember) the objects in an enclosing scope:


def f1(  ):
    x = 88
    def f2(x=x):
        print x
    f2(  )

f1(  )                                     # Prints 88


This code works in all Python releases, and you'll still see this pattern in some existing Python code. We'll discuss defaults in more detail later in this chapter. In short, the syntax arg = val in a def header means that the argument arg will default to the value val if no real value is passed to arg in a call.

In the modified f2, the x=x means that the argument x will default to the value of x in the enclosing scope¿because the second x is evaluated before Python steps into the nested def, it still refers to the x in f1. In effect, the default remembers what x was in f1 (i.e., the object 88).

All that's fairly complex, and it depends entirely on the timing of default value evaluations. In fact, the nested scope lookup rule was added to Python to make defaults unnecessary for this role¿today, Python automatically remembers any values required in the enclosing scope, for use in nested defs.

Of course, the best prescription is simply to avoid nesting defs within defs, as it will make your programs much simpler. The following is an equivalent of the prior example that banishes the notion of nesting. Notice that it's okay to call a function defined after the one that contains the call, like this, as long as the second def runs before the call of the first function¿code inside a def is never evaluated until the function is actually called:


>>> def f1(  ):
...     x = 88
...     f2(x)
...
>>> def f2(x):
...     print x
...
>>> f1(  )
88


If you avoid nesting this way, you can almost forget about the nested scopes concept in Python, unless you need to code in the factory function style discussed earlier¿at least for def statements. lambdas, which almost naturally appear nested in defs, often rely on nested scopes, as the next section explains.

				30.3.2.3.3 Nested scopes and lambdas

While they're rarely used in practice for defs themselves, you are more likely to care about nested function scopes when you start coding lambda expressions. We won't cover lambda in depth until Chapter 17, but, in short, it's an expression that generates a new function to be called later, much like a def statement. Because it's an expression, though, it can be used in places that def cannot, such as within list and dictionary literals.

Like a def, a lambda expression introduces a new local scope. Thanks to the enclosing scopes lookup layer, lambdas can see all the variables that live in the functions in which they are coded. Thus, the following code works today, but only because the nested scope rules are now applied:


def func(  ):
    x = 4
    action = (lambda n: x ** n)          # x remembered from enclosing def
    return action

x = func(  )
print x(2)                               # Prints 16, 4 ** 2


Prior to the introduction of nested function scopes, programmers used defaults to pass values from an enclosing scope into lambdas, as for defs. For instance, the following works on all Python releases:


def func(  ):
    x = 4
    action = (lambda n, x=x: x ** n)     # Pass x in manually


Because lambdas are expressions, they naturally (and even normally) nest inside enclosing defs. Hence, they are perhaps the biggest beneficiaries of the addition of enclosing function scopes in the lookup rules; in most cases, it is no longer necessary to pass values into lambdas with defaults.

				30.3.2.3.4 Scopes versus defaults with loop variables

There is one notable exception to the rule I just gave: if a lambda or def defined within a function is nested inside a loop, and the nested function references an enclosing scope variable that is changed by the loop, all functions generated within that loop will have the same value¿the value the referenced variable had in the last loop iteration.

For instance, the following attempts to build up a list of functions that each remember the current variable i from the enclosing scope:


>>> def makeActions(  ): 
...     acts = [] 
...     for i in range(5):  # Tries to remember each i
...         acts.append(lambda x: i ** x )     # All remember same last i!
...     return acts 
...
>>> acts = makeActions(  ) 
>>> acts[0] 
<function <lambda> at 0x012B16B0>


This doesn't quite work, though¿because the enclosing variable is looked up when the nested functions are later called, they all effectively remember the same value (the value the loop variable had on the last loop iteration). That is, we get back 4 to the power of 2 for each function in the list because i is the same in all of them:


>>> acts[0](2)  # All are 4 ** 2, value of last i
16
>>> acts[2](2)  # This should be 2 ** 2
16
>>> acts[4](2)  # This should be 4 ** 2
16


This is the one case where we still have to explicitly retain enclosing scope values with default arguments, rather than enclosing scope references. That is, to make this sort of code work, we must pass in the current value of the enclosing scope's variable with a default. Because defaults are evaluated when the nested function is created (not when it's later called), each remembers its own value for i:


>>> def makeActions(  ): 
...     acts = [] 
...     for i in range(5):  # Use defaults instead
...         acts.append(lambda x, i=i: i ** x)  # Remember current i
...     return acts 
...
>>> acts = makeActions(  ) 
>>> acts[0](2)  # 0 ** 2
0
>>> acts[2](2)  # 2 ** 2
4
>>> acts[4](2)  # 4 ** 2
16


This is a fairly obscure case, but it can come up in practice, especially in code that generates callback handler functions for a number of widgets in a GUI (e.g., button press handlers). We'll talk more about both defaults and lambdas in the next chapter, so you may want to return and review this section later.[43]

    [43] * In the "Section 17.9" section for this part at the end of the next chapter, we'll also see that there is an issue with using mutable objects like lists and dictionaries for default arguments (e.g., def f(a=[]))¿because defaults are implemented as single objects, mutable defaults retain state from call to call, rather then being initialized anew on each call. Depending on whom you ask, this is either considered a feature that supports state retention, or a strange wart on the language. More on this in the next chapter.

				30.3.2.3.5 Arbitrary scope nesting

Before ending this discussion, I should note that scopes nest arbitrarily, but only enclosing functions (not classes, described in Part 6) are searched:


>>> def f1(  ): 
...     x = 99 
...     def f2(  ): 
...         def f3(  ): 
...             print x  # Found in f1's local scope!
...         f3(  ) 
...     f2(  ) 
...
>>> f1(  ) 
99


Python will search the local scopes of all enclosing defs, from inner to outer, after the referencing function's local scope, and before the module's global scope. However, this sort of code is unlikely to pop up in practice. In Python, we say flat is better than nested¿your life, and the lives of your coworkers, will generally be better if you minimize nested function definitions.

			30.3.2.4 Passing Arguments

Earlier, I noted that arguments are passed by assignment. This has a few ramifications that aren't always obvious to beginners, which I'll expand on in this section. Here is a rundown of the key points in passing arguments to functions:

    * Arguments are passed by automatically assigning objects to local names. Function arguments¿references to (possibly) shared objects referenced by the caller¿are just another instance of Python assignment at work. Because references are implemented as pointers, all arguments are, in effect, passed by pointer. Objects passed as arguments are never automatically copied.
    * Assigning to argument names inside a function doesn't affect the caller. Argument names in the function header become new, local names when the function runs, in the scope of the function. There is no aliasing between function argument names and names in the caller.
    * Changing a mutable object argument in a function may impact the caller. On the other hand, as arguments are simply assigned to passed-in objects, functions can change passed-in mutable objects, and the results may affect the caller. Mutable arguments can be input and output for functions.

For more details on references, see Chapter 6; everything we learned there also applies to function arguments, though the assignment to argument names is automatic and implicit.

Python's pass-by-assignment scheme isn't quite the same as C++'s reference parameters option, but it turns out to be very similar to the C language's argument-passing model in practice:

    * Immutable arguments are passed "by value." Objects such as integers and strings are passed by object reference instead of by copying, but because you can't change immutable objects in-place anyhow, the effect is much like making a copy.
    * Mutable arguments are passed "by pointer." Objects such as lists and dictionaries are also passed by object reference, which is similar to the way C passes arrays as pointers¿mutable objects can be changed in-place in the function, much like C arrays.

Of course, if you've never used C, Python's argument-passing mode will seem simpler still¿it just involves the assignment of objects to names, and it works the same whether the objects are mutable or not.

				30.3.2.4.1 Arguments and Shared References

Here's an example that illustrates some of these properties at work:


>>> def changer(a, b):  # Function
...    a = 2  # Changes local name's value only
...    b[0] = 'spam'  # Changes shared object in-place
...
>>> X = 1 
>>> L = [1, 2]  # Caller
>>> changer(X, L)  # Pass immutable and mutable objects
>>> X, L  # X is unchanged, L is different
(1, ['spam', 2])


In this code, the changer function assigns values to argument a, and to a component in the object referenced by argument b. The two assignments within the function are only slightly different in syntax, but have radically different results:

    * Because a is a local name in the function's scope, the first assignment has no effect on the caller¿it simply changes the local variable a, and does not change the binding of the name X in the caller.
    * b is a local name, too, but it is passed a mutable object (the list called L in the caller). As the second assignment is an in-place object change, the result of the assignment to b[0] in the function impacts the value of L after the function returns. Really, we aren't changing b, we are changing part of the object that b currently references, and this change impacts the caller.

Figure 16-2 illustrates the name/object bindings that exist immediately after the function has been called, and before its code has run.

Figure 16-2. References: arguments. Because arguments are passed by assignment, argument names may share objects with variables at the call. Hence, in-place changes to mutable arguments in a function can impact the caller. Here, a and b in the function initially reference the objects referenced by variables X and L when the function is first called. Changing the list through variable b makes L appear different after the call returns.


If this example is still confusing, it may help to notice that the effect of the automatic assignments of the passed-in arguments is the same as running a series of simple assignment statements. In terms of the first argument, the assignment has no effect on the caller:


>>> X = 1 
>>> a = X  # They share the same object
>>> a = 2  # Resets 'a' only, 'X' is still 1
>>> print X 
1


But, the assignment through the second argument does affect a variable at the call because it is an in-place object change:


>>> L = [1, 2] 
>>> b = L  # They share the same object
>>> b[0] = 'spam'  # In-place change: 'L' sees the change too
>>> print L 
['spam', 2]


If you recall our discussions about shared mutable objects in Chapter 6 and Chapter 9, you'll recognize the phenomenon at work: changing a mutable object in-place can impact other references to that object. Here, the effect is to make one of the arguments work like an output of the function.

				30.3.2.4.2 Avoiding Mutable Argument Changes

Arguments are passed to functions by reference (a.k.a. pointer) by default in Python because that is what we normally want¿it means we can pass large objects around our programs without making multiple copies along the way, and we can easily update these objects as we go. If we don't want in-place changes within functions to impact objects we pass to them, though, we can simply make explicit copies of mutable objects, as we learned in Chapter 6. For function arguments, we can always copy the list at the point of call:


L = [1, 2]
changer(X, L[:] )            # Pass a copy, so our 'L' does not change


We can also copy within the function itself, if we never want to change passed-in objects, regardless of how the function is called:


def changer(a, b):
   b = b[:]  # Copy input list so we don't impact caller
   a = 2
   b[0] = 'spam'            # Changes our list copy only


Both of these copying schemes don't stop the function from changing the object¿they just prevent those changes from impacting the caller. To really prevent changes, we can always convert to immutable objects to force the issue. Tuples, for example, throw an exception when changes are attempted:


L = [1, 2]
changer(X, tuple(L) )        # Pass a tuple, so changes are errors


This scheme uses the built-in tuple function, which builds a new tuple out of all the items in a sequence (really, any iterable). It's also something of an extreme¿because it forces the function to be written to never change passed-in arguments, this solution might impose more limitations on the function than it should, and so should generally be avoided. You never know when changing arguments might come in handy for other calls in the future. Using this technique will also make the function lose the ability to call any list-specific methods on the argument, including methods that do not change the object in-place.

The main point to remember here is that functions might update mutable objects passed into them (e.g., lists and dictionaries). This isn't necessarily a problem, and it often serves useful purposes. But, you do have to be aware of this property¿if objects change out from under you unexpectedly, check whether a called function might be responsible, and make copies when objects are passed if needed.

				30.3.2.4.3 Simulating Output Parameters

We've already discussed the return statement and used it in a few examples. Here's a neat trick: because return can send back any sort of object, it can return multiple values by packaging them in a tuple or other collection type. In fact, although Python doesn't support what some languages label "call-by-reference" argument passing, we can usually simulate it by returning tuples and assigning the results back to the original argument names in the caller:


>>> def multiple(x, y): 
...     x = 2  # Changes local names only
...     y = [3, 4] 
...     return x, y  # Return new values in a tuple
...
>>> X = 1 
>>> L = [1, 2] 
>>> X, L = multiple(X, L)  # Assign results to caller's names
>>> X, L 
(2, [3, 4])


It looks like the code is returning two values here, but it's really just one¿a two-item tuple with the optional surrounding parentheses omitted. After the call returns, we can use tuple assignment to unpack the parts of the returned tuple. (If you've forgotten why this works, flip back to "Section 4.6" in Chapter 4, and "Section 11.1" in Chapter 11.) The net effect of this coding pattern is to simulate the output parameters of other languages by explicit assignments. X and L change after the call, but only because the code said so.

			30.3.2.5 Special Argument-Matching Modes

As we've just seen, arguments are always passed by assignment in Python; names in the def header are assigned to passed-in objects. On top of this model, though, Python provides additional tools that alter the way the argument objects in a call are matched with argument names in the header prior to assignment. These tools are all optional, but they allow you to write functions that support more flexible calling patterns.

By default, arguments are matched by position, from left to right, and you must pass exactly as many arguments as there are argument names in the function header. You can also specify matching by name, default values, and collectors for extra arguments.

Some of this section gets complicated, and before we go into the syntactic details, I'd like to stress that these special modes are optional, and only have to do with matching objects to names; the underlying passing mechanism after the matching takes place is still assignment. In fact, some of these tools are intended more for people writing libraries than for application developers. But because you may stumble across these modes even if you don't code them yourself, here's a synopsis of the available matching modes:


Positionals: matched from left to right

    The normal case, which we've been using so far, is to match arguments by position.

Keywords: matched by argument name

    Callers can specify which argument in the function is to receive a value by using the argument's name in the call, with the name=value syntax.

Defaults: specify values for arguments that aren't passed

    Functions can specify default values for arguments to receive if the call passes too few values, again using the name=value syntax.

Varargs: collect arbitrarily many positional or keyword arguments

    Functions can use special arguments preceded with * characters to collect an arbitrary number of extra arguments (this feature is often referred to as varargs, after the varargs feature in the C language, which also supports variable-length argument lists).

Varargs: pass arbitrarily many positional or keyword arguments

    Callers can also use the * syntax to unpack argument collections into discrete, separate arguments. This is the inverse of a * in a function header—in the header it means collect arbitrarily many arguments, while in the call it means pass arbitrarily many arguments.

Table 16-1 summarizes the syntax that invokes the special matching modes.

Table 16-1. Function argument-matching forms
Syntax 	Location 	Interpretation
func(value) 	Caller 	Normal argument: matched by position
func(name=value) 	Caller 	Keyword argument: matched by name
func(*name) 	Caller 	Pass all objects in name as individual positional arguments
func(**name) 	Caller 	Pass all key/value pairs in name as individual keyword arguments
def func(name) 	Function 	Normal argument: matches any by position or name
def func(name=value) 	Function 	Default argument value, if not passed in the call
def func(*name) 	Function 	Matches and collects remaining positional arguments (in a tuple)
def func(**name) 	Function 	Matches and collects remaining keyword arguments (in a dictionary)

In a call (the first four rows of the table), simple names are matched by position, but using the name=value form tells Python to match by name instead; these are called keyword arguments. Using a * or ** in a call allows us to package up arbitrarily many positional or keyword objects in sequences and dictionaries, respectively.

In a function header, a simple name is matched by position or name (depending on how the caller passes it), but the name=value form specifies a default value. The *name form collects any extra unmatched positional arguments in a tuple, and the **name form collects extra keyword arguments in a dictionary.

Of these, keyword arguments and defaults are probably the most commonly used in Python code. Keywords allow us to label arguments with their names to make calls more meaningful. We met defaults earlier, as a way to pass in values from the enclosing function's scope, but they actually are more general than that—they allow us to make any argument optional, and provide its default value in a function definition.

Special matching modes let you be fairly liberal about how many arguments must be passed to a function. If a function specifies defaults, they are used if you pass too few arguments. If a function uses the * variable argument list forms, you can pass too many arguments; the * names collect the extra arguments in a data structure.

				30.3.2.5.1 Keyword and Default Examples

This is all simpler in code than the preceding descriptions may imply. Python matches names by position by default like most other languages. For instance, if you define a function that requires three arguments, you must call it with three arguments:


>>> def f(a, b, c): print a, b, c
...


Here, we pass them by position—a is matched to 1, b is matched to 2, and so on:


>>> f(1, 2, 3)
1 2 3


					30.3.2.5.1.1 Keywords

In Python, though, you can be more specific about what goes where when you call a function. Keyword arguments allow us to match by name, instead of by position:


>>> f(c=3, b=2, a=1)
1 2 3


The c=3 in this call, for example, means send 3 to the argument named c. More formally, Python matches the name c in the call to the argument named c in the function definition's header, and then passes the value 3 to that argument. The net effect of this call is the same as that of the prior call, but notice that the left-to-right order of the arguments no longer matters when keywords are used because arguments are matched by name, not by position. It's even possible to combine positional and keyword arguments in a single call. In this case, all positionals are matched first from left to right in the header, before keywords are matched by name:


>>> f(1, c=3, b=2)
1 2 3


When most people see this the first time, they wonder why one would use such a tool. Keywords typically have two roles in Python. First, they make your calls a bit more self-documenting (assuming that you use better argument names than a, b, and c). For example, a call of this form:


func(name='Bob', age=40, job='dev')


is much more meaningful than a call with three naked values separated by commas—the keywords serve as labels for the data in the call. The second major use of keywords occurs in conjunction with defaults, which we'll look at next.

					30.3.2.5.1.2 Defaults

We talked a little about defaults earlier, when discussing nested function scopes. In short, defaults allow us to make selected function arguments optional; if not passed a value, the argument is assigned its default before the function runs. For example, here is a function that requires one argument, and defaults two:


>>> def f(a, b=2, c=3): print a, b, c
...


When we call this function, we must provide a value for a, either by position or by keyword; however, providing values for b and c is optional. If we don't pass values to b and c, they default to 2 and 3, respectively:


>>> f(1)
1 2 3
>>> f(a=1)
1 2 3


If we pass two values, only c gets its default, and with three values, no defaults are used:


>>> f(1, 4)
1 4 3
>>> f(1, 4, 5)
1 4 5


Finally, here is how the keyword and default features interact. Because they subvert the normal left-to-right positional mapping, keywords allow us to essentially skip over arguments with defaults:


>>> f(1, c=6)
1 2 6


Here, a gets 1 by position, c gets 6 by keyword, and b, in between, defaults to 2.

Be careful not to confuse the special name=value syntax in a function header and a function call; in the call, it means a match-by-name keyword argument, and in the header, it specifies a default for an optional argument. In both cases, this is not an assignment statement; it is special syntax for these two contexts, which modifies the default argument-matching mechanics.

				30.3.2.5.2 Arbitrary Arguments Examples

The last two matching extensions, * and **, are designed to support functions that take any number of arguments. Both can appear in either the function definition, or a function call, and they have related purposes in the two locations.

					30.3.2.5.2.1 Collecting arguments

The first use, in the function definition, collects unmatched positional arguments into a tuple:


>>> def f(*args): print args
...


When this function is called, Python collects all the positional arguments into a new tuple, and assigns the variable args to that tuple. Because it is a normal tuple object, it can be indexed, stepped through with a for loop, and so on:


>>> f(  )
(  )
>>> f(1)
(1,)
>>> f(1,2,3,4)
(1, 2, 3, 4)


The ** feature is similar, but it only works for keyword arguments—it collects them into a new dictionary, which can then be processed with normal dictionary tools. In a sense, the ** form allows you to convert from keywords to dictionaries, which you can then step through with keys calls, dictionary iterators, and the like:


>>> def f(**args): print args
...
>>> f(  )
{  }
>>> f(a=1, b=2)
{'a': 1, 'b': 2}


Finally, function headers can combine normal arguments, the *, and the ** to implement wildly flexible call signatures:


>>> def f(a, *pargs, **kargs): print a, pargs, kargs
...
>>> f(1, 2, 3, x=1, y=2)
1 (2, 3) {'y': 2, 'x': 1}


In fact, these features can be combined in even more complex ways that may seem ambiguous at first glance—an idea we will revisit later in this chapter. First, though, let's see what happens when * and ** are coded in function calls instead of definitions.

					30.3.2.5.2.2 Unpacking arguments

In recent Python releases, we can use the * syntax when we call a function, too. In this context, its meaning is the inverse of its meaning in the function definition—it unpacks a collection of arguments, rather than building a collection of arguments. For example, we can pass four arguments to a function in a tuple, and let Python unpack them into individual arguments:


>>> def func(a, b, c, d): print a, b, c, d
...
>>> args = (1, 2)
>>> args += (3, 4)
>>> func(*args)
1 2 3 4


Similarly, the ** syntax in a function call unpacks a dictionary of key/value pairs into separate keyword arguments:


>>> args = {'a': 1, 'b': 2, 'c': 3}
>>> args['d'] = 4
>>> func(**args)
1 2 3 4


Again, we can combine normal, positional, and keyword arguments in the call in very flexible ways:


>>> func(*(1, 2), **{'d': 4, 'c': 4})
1 2 4 4

>>> func(1, *(2, 3), **{'d': 4})
1 2 3 4

>>> func(1, c=3, *(2,), **{'d': 4})
1 2 3 4


This sort of code is convenient when you cannot predict the number of arguments to be passed to a function when you write your script; you can build up a collection of arguments at runtime instead, and call the function generically this way. Again, don't confuse the */** syntax in the function header and the function call—in the header, it collects any number of arguments, and in the call, it unpacks any number of arguments.

We'll revisit this form in the next chapter, when we meet the apply built-in function (a tool that this special call syntax is largely intended to subsume and replace).


																																	     */

				30.3.2.5.3 Combining Keywords and Defaults

Here is a slightly larger example that demonstrates keywords and defaults in action. In the following, the caller must always pass at least two arguments (to match spam and eggs), but the other two are optional. If they are omitted, Python assigns toast and ham to the defaults specified in the header:


def func(spam, eggs, toast=0, ham=0):   # First 2 required
    print (spam, eggs, toast, ham)

func(1, 2)                              # Output: (1, 2, 0, 0)
func(1, ham=1, eggs=0)                  # Output: (1, 0, 0, 1)
func(spam=1, eggs=0)                    # Output: (1, 0, 0, 0)
func(toast=1, eggs=2, spam=3)           # Output: (3, 2, 1, 0)
func(1, 2, 3, 4)                        # Output: (1, 2, 3, 4)


Notice again that when keyword arguments are used in the call, the order in which the arguments are listed doesn't matter; Python matches by name, not by position. The caller must supply values for spam and eggs, but they can be matched by position or by name. Also, notice that the form name=value means different things in the call and the def (a keyword in the call and a default in the header).

				30.3.2.5.4 The min Wakeup Call

To make this more concrete, let's work through an exercise that demonstrates a practical application of argument-matching tools. Suppose you want to code a function that is able to compute the minimum value from an arbitrary set of arguments and an arbitrary set of object data types. That is, the function should accept zero or more arguments—as many as you wish to pass. Moreover, the function should work for all kinds of Python object types: numbers, strings, lists, lists of dictionaries, files, and even None.

The first requirement provides a natural example of how the * feature can be put to good use—we can collect arguments into a tuple, and step over each in turn with a simple for loop. The second part of the problem definition is easy: because every object type supports comparisons, we don't have to specialize the function per type (an application of polymorphism); we can simply compare objects blindly, and let Python perform the correct sort of comparison.

					30.3.2.5.4.1 Full credit

The following file shows three ways to code this operation, at least one of which was suggested by a student at some point along the way:

    * The first function fetches the first argument (args is a tuple), and traverses the rest by slicing off the first (there's no point in comparing an object to itself, especially if it might be a large structure).
    * The second version lets Python pick off the first and rest of the arguments automatically, and so avoids an index and a slice.
    * The third converts from a tuple to a list with the built-in list call, and employs the list sort method.

The sort method is coded in C, so it can be quicker than the others at times, but the linear scans of the first two techniques will make them faster most of the time.[44] The file mins.py contains the code for all three solutions:

    [44] * Actually, this is fairly complicated. The Python sort routine is coded in C, and uses a highly optimized algorithm that attempts to take advantage of partial ordering in the items to be sorted. It's named "timsort" after Tim Peters, its creator, and in its documentation it claims to have "supernatural performance" at times (pretty good, for a sort!). Still, sorting is an inherently exponential operation (it must chop up the sequence, and put it back together many times), and the other versions simply perform one linear, left to right scan. The net effect is that sorting is quicker if the arguments are partially ordered, but likely slower otherwise. Even so, Python performance can change over time, and the fact that sorting is implemented in the C language can help greatly; for an exact analysis, you should time the alternatives with the time or timeit modules we'll meet in the next chapter.


def min1(*args):
    res = args[0]
    for arg in args[1:]:
        if arg < res:
            res = arg
    return res

def min2(first, *rest):
    for arg in rest:
        if arg < first:
            first = arg
    return first

def min3(*args):
    tmp = list(args)            # Or, in Python 2.4+: return sorted(args)[0]
    tmp.sort(  )
    return tmp[0]

print min1(3,4,1,2)
print min2("bb", "aa")
print min3([2,2], [1,1], [3,3])

					    


All three solutions produce the same result when the file is run. Try typing a few calls interactively to experiment with these on your own:


% python mins.py
1
aa
[1, 1]


Notice that none of these three variants tests for the case where no arguments are passed in. They could, but there's no point in doing so here—in all three solutions, Python will automatically raise an exception if no arguments are passed in. The first raises an exception when we try to fetch item 0; the second, when Python detects an argument list mismatch; and the third, when we try to return item 0 at the end.

This is exactly what we want to happen—because these functions support any data type, there is no valid sentinel value that we could pass back to designate an error. There are exceptions to this rule (e.g., if you have to run expensive actions before you reach the error), but, in general, it's better to assume that arguments will work in your functions' code, and let Python raise errors for you when they do not.

					30.3.2.5.4.2 Bonus points

Students and readers can get bonus points here for changing these functions to compute the maximum, rather than minimum, values. This one's easy: the first two versions only require changing < to >, and the third simply requires that we return tmp[−1] instead of tmp[0]. For extra points, be sure to set the function name to "max" as well (though this part is strictly optional).

It's also possible to generalize a single function to compute either a minimum or a maximum value, by evaluating comparison expression strings with a tool like the eval built-in function (see the library manual), or passing in an arbitrary comparison function. The file minmax.py shows how to implement the latter scheme:


def minmax(test, *args):
    res = args[0]
    for arg in args[1:]:
        if test(arg, res):
            res = arg
    return res

def lessthan(x, y): return x < y                 # See also: lambda
def grtrthan(x, y): return x > y

print minmax(lessthan, 4, 2, 1, 5, 6, 3)         # Self-test code
print minmax(grtrthan, 4, 2, 1, 5, 6, 3)

% python minmax.py 
1
6


Functions are another kind of object that can be passed into a function like this one. To make this a max (or other) function, for example, we could simply pass in the right sort of test function. This may seem like extra work, but the main point of generalizing functions this way (instead of cutting and pasting to change just a single character) means we'll only have one version to change in the future, not two.

					30.3.2.5.4.3 The punch line

Of course, all this was just a coding exercise. There's really no reason to code min or max functions because both are built-ins in Python! The built-in versions work almost exactly like ours, but they're coded in C for optimal speed.

				30.3.2.5.5 A More Useful Example: General Set Functions

Now, let's look at a more useful example of special argument-matching modes at work. At the end of the prior chapter, we wrote a function that returned the intersection of two sequences (it picked out items that appeared in both). Here is a version that intersects an arbitrary number of sequences (one or more), by using the varargs matching form *args to collect all the passed-in arguments. Because the arguments come in as a tuple, we can process them in a simple for loop. Just for fun, we'll code a union function that also accepts an arbitrary number of arguments to collect items that appear in any of the operands:


def intersect(*args):
    res = []
    for x in args[0]:                  # Scan first sequence
        for other in args[1:]:         # For all other args
            if x not in other: break   # Item in each one?
        else:                          # No: break out of loop
            res.append(x)              # Yes: add items to end
    return res

def union(*args):
    res = []
    for seq in args:                   # For all args
        for x in seq:                  # For all nodes
            if not x in res:
                res.append(x)          # Add new items to result
    return res


Because these are tools worth reusing (and they're too big to retype interactively), we'll store the functions in a module file called inter2.py (more on modules in Part 5). In both functions, the arguments passed in at the call come in as the args tuple. As in the original intersect, both work on any kind of sequence. Here, they are processing strings, mixed types, and more than two sequences:


% python 
>>> from inter2 import intersect, union 
>>> s1, s2, s3 = "SPAM", "SCAM", "SLAM" 

>>> intersect(s1, s2), union(s1, s2)  # Two operands
(['S', 'A', 'M'], ['S', 'P', 'A', 'M', 'C'])

>>> intersect([1,2,3], (1,4))  # Mixed types
[1]

>>> intersect(s1, s2, s3)  # Three operands
['S', 'A', 'M']

>>> union(s1, s2, s3) 
['S', 'P', 'A', 'M', 'C', 'L']


	

I should note that because Python has a new set object type (described in Chapter 5), none of the set processing examples in this book are strictly required anymore; they are included only as demonstrations of coding functions. (Because it is constantly improving, Python has an uncanny way of conspiring to make my book examples obsolete over time!)

				30.3.2.5.6 Argument Matching: The Gritty Details

If you choose to use and combine the special argument-matching modes, Python will ask you to follow these ordering rules:

    * In a function call, all nonkeyword arguments (name) must appear first, followed by all keyword arguments (name=value), followed by the *name form, and, finally, the **name form, if used.
    * In a function header, arguments must appear in the same order: normal arguments (name), followed by any default arguments (name=value), followed by the *name form if present, followed by **name, if used.

If you mix arguments in any other order, you will get a syntax error because the combinations can be ambiguous. Python internally carries out the following steps to match arguments before assignment:

|   1.  Assign nonkeyword arguments by position.
|   2.  Assign keyword arguments by matching names.
|   3.  Assign extra nonkeyword arguments to *name tuple.
|   4.  Assign extra keyword arguments to **name dictionary.
|   5.  Assign default values to unassigned arguments in header.

After this, Python checks to make sure each argument is passed just one value; if not, an error is raised. This is as complicated as it looks, but tracing Python's matching algorithm will help you to understand some convoluted cases, especially when modes are mixed. We'll postpone looking at additional examples of these special matching modes until the exercises at the end of Part 4.

As you can see, advanced argument-matching modes can be complex. They are also entirely optional; you can get by with just simple positional matching, and it's probably a good idea to do so when you're starting out. However, because some Python tools make use of them, some general knowledge of these modes is important.

Why You Will Care: Keyword Arguments

Keyword arguments play an important role in Tkinter, the de facto standard GUI API for Python. We'll meet Tkinter later in this book, but as a preview, keyword arguments set configuration options when GUI components are built. For instance, a call of the form:


from Tkinter import *
widget = Button(text="Press me", command=someFunction)


creates a new button and specifies its text and callback function, using the text and command keyword arguments. Since the number of configuration options for a widget can be large, keyword arguments let you pick and choose. Without them, you might have to either list all the possible options by position or hope for a judicious positional argument defaults protocol that would handle every possible option arrangement.

			30.3.2.6 Chapter Summary

In this chapter, we studied two key concepts related to functions: scopes (how variables are looked up when used), and arguments (how objects are passed into a function). As we learned, variables are considered local to the function definitions in which they are assigned, unless they are specifically declared global. As we also saw, arguments are passed into a function by assignment, which means by object reference, which really means by pointer.

For both scopes and arguments, we also studied some more advanced extensions—nested function scopes, and default and keyword arguments, for example. Finally, we looked at some general design ideas (avoiding globals and cross-file changes), and saw how mutable arguments can exhibit the same behavior as other shared references to objects—unless the object is explicitly copied when it's sent in, changing a passed-in mutable in a function can impact the caller.

The next chapter concludes our look at functions by exploring some more advanced function-related ideas: lambdas, generators, iterators, functional tools, such as map, and so on. Many of these concepts stem from the fact that functions are normal objects in Python, and so support some advanced and very flexible processing modes. Before diving into those topics, however, take this chapter's quiz to review what we've studied here.

BRAIN BUILDER

Chapter Quiz

Q:	What is the output of the following code, and why?


>>> X = 'Spam'
>>> def func(  ):
...     print X
...
>>> func(  )


Q:	What is the output of this code, and why?


>>> X = 'Spam'
>>> def func(  ):
...     X = 'NI!'
...
>>> func(  )
>>> print X


Q:	What does this code print, and why?


>>> X = 'Spam'
>>> def func(  ):
...     X = 'NI'
...     print X
...
>>> func(  )
>>> print X


Q:	What output does this code produce; again, why?


>>> X = 'Spam'
>>> def func(  ):
...     global X
...     X = 'NI'
...
>>> func(  )
>>> print X


Q:	What about this code—what's the output, and why?


>>> X = 'Spam'
>>> def func(  ):
...     X = 'NI'
...     def nested(  ):
...         print X
...     nested(  )
...
>>> func(  )
>>> X


Q:	One last time: what is the output of this, and why?


>>> def func(a, b, c=3, d=4): print a, b, c, d
...
>>> func(1, *(5,6))


Q:	Name three or four ways to retain state information in a Python function.
Q:	Name three ways that functions can communicate results to a caller.


Quiz Answers

A:	The output here is 'Spam', because the function references a global variable in the enclosing module (because it is not assigned in the function, it is considered global).
A:	The output here is 'Spam' again because assigning the variable inside the function makes it a local and effectively hides the global of the same name. The print statement finds the variable unchanged in the global (module) scope.
A:	It prints 'NI' on one line, and 'Spam' on another because the reference to the variable within the function finds the assigned local, and the reference in the print finds the global.
A:	This time it just prints 'NI' because the global declaration forces the variable assigned inside the function to refer to the variable in the enclosing global scope.
A:	The output in this case is again 'NI' on one line, and 'Spam' on another because the print statement in the nested function finds the name in the enclosing function's local scope, and the print at the end finds the variable in the global scope.
A:	The output here is "1 5 6 4": 1 matches a by position, 5 and 6 match b and c by *name positionals (6 overrides c's default), and d defaults to 4 because it was not passed a value.
A:	Although the values of local variables go away when a function returns, state information can be retained by a Python function by using global variables, enclosing function scope references in nested functions, or default argument values. Another alternative, using OOP with classes, supports state retention better than any of the prior three techniques because it makes it explicit with attribute assignments.
A:	Functions can send back results with return statements, by changing passed-in mutable arguments, and by setting global variables. Globals are generally frowned upon (except for very special cases, like multithreaded programs) because they can make code harder to understand and use. return statements are usually best, but changing mutables is fine, if expected. Functions may also communicate with system devices such as files and sockets, but these are beyond our scope here.

 	 	30.3.3. Advanced Function Topics
This chapter introduces a collection of more advanced function-related topics: the lambda expression, functional programming tools such as map and list comprehensions, generator functions and expressions, and more. Part of the art of using functions lies in the interfaces between them, so we will also explore some general function design principles here. Because this is the last chapter in Part 4, we'll close with the usual sets of gotchas and exercises to help you start coding the ideas you've read about.

			30.3.3.1  Anonymous Functions: lambda

You've seen what it takes to write your own basic functions in Python. The next sections deal with a few more advanced function-related ideas. Most of these are optional features, but they can simplify your coding tasks when used well.

Besides the def statement, Python also provides an expression form that generates function objects. Because of its similarity to a tool in the LISP language, it's called lambda.[45] Like def, this expression creates a function to be called later, but it returns the function instead of assigning it to a name. This is why lambdas are sometimes known as anonymous (i.e., unnamed) functions. In practice, they are often used as a way to inline a function definition, or to defer execution of a piece of code.

    [45] * The name "lambda" seems to scare people more than it should. It comes from LISP, which got it from lambda calculus, which is a form of symbolic logic. In Python, though, it's really just a keyword that introduces the expression syntactically.

				30.3.3.1.1  lambda Expressions

The lambda's general form is the keyword lambda, followed by one or more arguments (exactly like the arguments list you enclose in parentheses in a def header), followed by an expression after a colon:


lambda argument1, argument2,... argumentN : expression using arguments


Function objects returned by running lambda expressions work exactly the same as those created and assigned by def, but there are a few differences that make lambdas useful in specialized roles:

    * lambda is an expression, not a statement. Because of this, a lambda can appear in places a def is not allowed by Python's syntax—inside a list literal, or function call, for example. Also, as an expression, lambda returns a value (a new function) that can optionally be assigned a name; in contrast, the def statement always assigns the new function to the name in the header, instead of returning it as a result.
    * lambda's body is a single expression, not a block of statements. The lambda's body is similar to what you'd put in a def body's return statement; you simply type the result as a naked expression, instead of explicitly returning it. Because it is limited to an expression, a lambda is less general than a def—you can only squeeze so much logic into a lambda body without using statements such as if. This is by design—it limits program nesting: lambda is designed for coding simple functions, and def handles larger tasks.

Apart from those distinctions, defs and lambdas do the same sort of work. For instance, we've seen how to make a function with a def statement:


>>> def func(x, y, z): return x + y + z
...
>>> func(2, 3, 4)
9


But, you can achieve the same effect with a lambda expression by explicitly assigning its result to a name through which you can later call the function:


>>> f = lambda x, y, z: x + y + z
>>> f(2, 3, 4)
9


Here, f is assigned the function object the lambda expression creates; this is how def works, too, but its assignment is automatic.

Defaults work on lambda arguments, just like in a def:


>>> x = (lambda a="fee", b="fie", c="foe": a + b + c)
>>> x("wee")
'weefiefoe'


The code in a lambda body also follows the same scope lookup rules as code inside a def. lambda expressions introduce a local scope much like a nested def, which automatically sees names in enclosing functions, the module, and the built-in scope (via the LEGB rule):


>>> def knights(  ): 
...     title = 'Sir' 
...     action = (lambda x: title + ' ' + x)  # Title in enclosing def
...     return action  # Return a function
...
>>> act = knights(  ) 
>>> act('robin') 
'Sir robin'


In this example, prior to Release 2.2, the value for the name title would typically have been passed in as a default argument value instead; flip back to the scopes coverage in Chapter 16 if you've forgotten why.

				30.3.3.1.2 Why Use lambda?

Generally speaking, lambdas come in handy as a sort of function shorthand that allows you to embed a function's definition within the code that uses it. They are entirely optional (you can always use defs instead), but they tend to be simpler coding constructs in scenarios where you just need to embed small bits of executable code.

For instance, we'll see later that callback handlers are frequently coded as inline lambda expressions embedded directly in a registration call's arguments list, instead of being defined with a def elsewhere in a file, and referenced by name (see the sidebar "Why You Will Care: Callbacks" later in this chapter for an example).

lambdas are also commonly used to code jump tables, which are lists or dictionaries of actions to be performed on demand. For example:


L = [(lambda x: x**2), (lambda x: x**3), (lambda x: x**4)]
for f in L:
    print f(2)                       # Prints 4, 8, 16

print L[0](3)                        # Prints 9


The lambda expression is most useful as a shorthand for def, when you need to stuff small pieces of executable code into places where statements are illegal syntactically. This code snippet, for example, builds up a list of three functions by embedding lambda expressions inside a list literal; a def won't work inside a list literal like this because it is a statement, not an expression.

You can do the same sort of thing with dictionaries and other data structures in Python to build up action tables:


>>> key = 'got'
>>> {'already': (lambda: 2 + 2),
...  'got':     (lambda: 2 * 4),
...  'one':     (lambda: 2 ** 6)
... }[key](  )
8


Here, when Python makes the dictionary, each of the nested lambdas generates and leaves behind a function to be called later; indexing by key fetches one of those functions, and parentheses force the fetched function to be called. When coded this way, a dictionary becomes a more general multiway branching tool than what I could show you in Chapter 12's coverage of if statements.

To make this work without lambda, you'd need to instead code three def statements somewhere else in your file, outside the dictionary in which the functions are to be used:


def f1(  ): return 2 + 2
def f2(  ): return 2 * 4
def f3(  ): return 2 ** 6
...

key = 'one'
{'already': f1, 'got': f2, 'one': f3}[key](  )


This works, too, but your defs may be arbitrarily far away in your file, even if they are just little bits of code. The code proximity that lambdas provide is especially useful for functions that will only be used in a single context—if the three functions here are not useful anywhere else, it makes sense to embed their definitions within the dictionary as lambdas. Moreover, the def form requires you to make up names for these little functions that may clash with other names in this file.

lambdas also come in handy in function argument lists as a way to inline temporary function definitions not used anywhere else in your program; we'll see some examples of such other uses later in this chapter, when we study map.

				30.3.3.1.3 How (Not) to Obfuscate Your Python Code

The fact that the body of a lambda has to be a single expression (not a series of statements) would seem to place severe limits on how much logic you can pack into a lambda. If you know what you're doing, though, you can code most statements in Python as expression-based equivalents.

For example, if you want to print from the body of a lambda function, simply say sys.stdout.write(str(x)+'\n'), instead of print x (recall from Chapter 11 that this is what print really does). Similarly, to nest logic in a lambda, you can use the if/else ternary expression introduced in Chapter 13, or the equivalent but trickier and/or combination also described there. As you learned earlier, the following statement:


if a:
    b
else:
    c


can be emulated by either of these roughly equivalent expressions:


b if a else c
((a and b) or c)


Because expressions like these can be placed inside a lambda, they may be used to implement selection logic within a lambda function:


>>> lower = (lambda x, y: x if x < y else y)
>>> lower('bb', 'aa')
'aa'
>>> lower('aa', 'bb')
'aa'


Furthermore, if you need to perform loops within a lambda, you can also embed things like map calls and list comprehension expressions (tools we met earlier, in Chapter 13, and will revisit later in this chapter):


>>> import sys
>>> showall = (lambda x: map(sys.stdout.write, x))

>>> t = showall(['spam\n', 'toast\n', 'eggs\n'])
spam
toast
eggs

>>> showall = lambda x: [sys.stdout.write(line) for line in x]

>>> t = showall(('bright\n', 'side\n', 'of\n', 'life\n'))
bright
side
of
life


Now that I've shown you these tricks, I am required by law to ask you to please only use them as a last resort. Without due care, they can lead to unreadable (a.k.a. obfuscated) Python code. In general, simple is better than complex, explicit is better than implicit, and full statements are better than arcane expressions. On the other hand, you may find these techniques useful in moderation.

				30.3.3.1.4 Nested lambdas and Scopes

lambdas are the main beneficiaries of nested function scope lookup (the E in the LEGB rule we met in Chapter 16). In the following, for example, the lambda appears inside a def—the typical case—and so can access the value that the name x had in the enclosing function's scope at the time that the enclosing function was called:


>>> def action(x): 
...     return (lambda y: x + y)  # Make and return function, remember x
...
>>> act = action(99) 
>>> act 
<function <lambda> at 0x00A16A88>
>>> act(2) 
101


What wasn't illustrated in the prior chapter's discussion of nested function scopes is that a lambda also has access to the names in any enclosing lambda. This case is somewhat obscure, but imagine if we recoded the prior def with a lambda:


>>> action = (lambda x: (lambda y: x + y))
>>> act = action(99)
>>> act(3)
102
>>> ((lambda x: (lambda y: x + y))(99))(4)
103


Here, the nested lambda structure makes a function that makes a function when called. In both cases, the nested lambda's code has access to the variable x in the enclosing lambda. This works, but it's fairly convoluted code; in the interest of readability, nested lambdas are generally best avoided.

Why You Will Care: Callbacks

Another very common application of lambda is to define inline callback functions for Python's Tkinter GUI API. For example, the following creates a button that prints a message on the console when pressed:


import sys
x = Button(
    text ='Press me',
    command=(lambda:sys.stdout.write('Spam\n')))


Here, the callback handler is registered by passing a function generated with a lambda to the command keyword argument. The advantage of lambda over def here is that the code that handles a button press is right here, embedded in the button creation call.

In effect, the lambda defers execution of the handler until the event occurs: the write call happens on button presses, not when the button is created.

Because the nested function scope rules apply to lambdas as well, they are also easier to use as callback handlers, as of Python 2.2—they automatically see names in the functions in which they are coded, and no longer require passed-in defaults in most cases. This is especially handy for accessing the special self instance argument that is a local variable in enclosing class method functions (more on classes in Part 6):


class MyGui:
    def makewidgets(self):
        Button(command=(lambda: self.display("spam")))
    def display(self, message):
        ...use message...


In prior releases, even self had to be passed in with defaults.

			30.3.3.2  Applying Functions to Arguments
Some programs need to call arbitrary functions in a generic fashion, without knowing their names or arguments ahead of time (we'll see examples of where this can be useful later). Both the apply built-in function, and some special call syntax available in Python, can do the job.

	

At this writing, both apply and the special call syntax described in this section can be used freely in Python 2.5, but it seems likely that apply may go away in Python 3.0. If you wish to future-proof your code, use the equivalent special call syntax, not apply.

				30.3.3.2.1  The apply Built-in

When you need to be dynamic, you can call a generated function by passing it as an argument to apply, along with a tuple of arguments to pass to that function:


>>> def func(x, y, z): return x + y + z
...
>>> apply(func, (2, 3, 4))
9
>>> f = lambda x, y, z: x + y + z
>>> apply(f, (2, 3, 4))
9


The apply function simply calls the passed-in function in the first argument, matching the passed-in arguments tuple to the function's expected arguments. Because the arguments list is passed in as a tuple (i.e., a data structure), a program can build it at runtime.[46]

    [46] * Be careful not to confuse apply with map, the topic of the next section. apply runs a single function call, passing arguments to the function object just once. map calls a function many times instead for each item in a sequence.

The real power of apply is that it doesn't need to know how many arguments a function is being called with. For example, you can use if logic to select from a set of functions and argument lists, and use apply to call any of them:


if <test>:
    action, args = func1, (1,)
else:
    action, args = func2, (1, 2, 3)
...
apply(action, args)


More generally, apply is useful any time you cannot predict the arguments list ahead of time. If your user selects an arbitrary function via a user interface, for instance, you may be unable to hardcode a function call when writing your script. To work around this, simply build up the arguments list with tuple operations, and call the function indirectly through apply:


>>> args = (2,3) + (4,)
>>> args
(2, 3, 4)
>>> apply(func, args)
9


					30.3.3.2.1.1  Passing keyword arguments

The apply call also supports an optional third argument, where you can pass in a dictionary that represents keyword arguments to be passed to the function:


>>> def echo(*args, **kwargs): print args, kwargs
...
>>> echo(1, 2, a=3, b=4)
(1, 2) {'a': 3, 'b': 4}


This allows you to construct both positional and keyword arguments at runtime:


>>> pargs = (1, 2)
>>> kargs = {'a':3, 'b':4}
>>> apply(echo, pargs, kargs)
(1, 2) {'a': 3, 'b': 4}

				30.3.3.2.2 apply-Like Call Syntax

Python also allows you to accomplish the same effect as an apply call with special syntax in the call. This syntax mirrors the arbitrary arguments syntax in def headers that we met in Chapter 16. For example, assuming the names in this example are still as assigned earlier:


>>> apply(func, args)  # Traditional: tuple
9
>>> func(*args)  # New apply-like syntax
9
>>> echo(*pargs, **kargs)  # Keyword dictionaries too
(1, 2) {'a': 3, 'b': 4}


This special call syntax is newer than the apply function, and is generally preferred today. It doesn't have any obvious advantages over an explicit apply call, apart from its symmetry with def headers, and requiring a few less keystrokes. However, the new call syntax alternative also allows us to pass along real additional arguments, and so is more general:


>>> echo(0, *pargs, **kargs)  # Normal, *tuple, **dictionary
(0, 1, 2) {'a': 3, 'b': 4}

			30.3.3.3  Mapping Functions over Sequences: map

One of the more common things programs do with lists and other sequences is apply an operation to each item and collect the results. For instance, updating all the counters in a list can be done easily with a for loop:


>>> counters = [1, 2, 3, 4] 
>>>
>>> updated = [] 
>>> for x in counters: 
...     updated.append(x + 10)  # Add 10 to each item
...
>>> updated 
[11, 12, 13, 14]


But because this is such a common operation, Python actually provides a built-in that does most of the work for you. The map function applies a passed-in function to each item in a sequence object, and returns a list containing all the function call results. For example:


>>> def inc(x): return x + 10  # Function to be run
...
>>> map(inc, counters)  # Collect results
[11, 12, 13, 14]


map was introduced as a parallel loop-traversal tool in Chapter 13. As you may recall, we passed in None for the function argument to pair up items. Here, we make better use of it by passing in a real function to be applied to each item in the list—map calls inc on each list item, and collects all the return values into a list.

Because map expects a function to be passed in, it also happens to be one of the places where lambdas commonly appear:


>>> map((lambda x: x + 3), counters)  # Function expression
[4, 5, 6, 7]


Here, the function adds 3 to each item in the counters list; as this function isn't needed elsewhere, it was written inline as a lambda. Because such uses of map are equivalent to for loops, with a little extra code, you can always code a general mapping utility yourself:


>>> def mymap(func, seq):
...     res = []
...     for x in seq: res.append(func(x))
...     return res
...
>>> map(inc, [1, 2, 3])
[11, 12, 13]
>>> mymap(inc, [1, 2, 3])
[11, 12, 13]


However, as map is a built-in, it's always available, always works the same way, and has some performance benefits (in short, it's faster than a manually coded for loop). Moreover, map can be used in more advanced ways than shown here. For instance, given multiple sequence arguments, it sends items taken from sequences in parallel as distinct arguments to the function:


>>> pow(3, 4) 
81
>>> map(pow, [1, 2, 3], [2, 3, 4])  # 1**2, 2**3, 3**4
[1, 8, 81]


Here, the pow function takes two arguments on each call—one from each sequence passed to map. Although we could simulate this generality, too, there is no obvious point in doing so when a speedy built-in is provided.

	

The map call is similar to the list comprehension expressions we studied in Chapter 13, and will meet again later in this chapter, but map applies a function call to each item instead of an arbitrary expression. Because of this limitation, it is a somewhat less general tool. However, in some cases, map is currently faster to run than a list comprehension (e.g., when mapping a built-in function), and it may require less coding. Because of that, it seems likely that map will still be available in Python 3.0. However, a recent Python 3.0 document did propose removing this call, along with the reduce and filter calls discussed in the next section, from the built-in namespace (they may show up in modules instead).

While map may stick around, it's likely that reduce and filter will be removed in 3.0, partly because they are redundant with list comprehensions (filter is subsumed by list comprehension if clauses), and partly because of their complexity (reduce is one of the most complex tools in the language and is not intuitive). I cannot predict the future on this issue, though, so be sure to watch the Python 3.0 release notes for more on these possible changes. These tools are all still included in this edition of the book because they are part of the current version of Python, and will likely be present in Python code you're likely to see for some time to come.

			30.3.3.4  Functional Programming Tools: filter and reduce
The map function is the simplest representative of a class of Python built-ins used for functional programming—which mostly just means tools that apply functions to sequences. Its relatives filter out items based on a test function (filter), and apply functions to pairs of items and running results (reduce). For example, the following filter call picks out items in a sequence that are greater than zero:


>>> range(−5, 5)
[−5, −4, −3, −2, −1, 0, 1, 2, 3, 4]

>>> filter((lambda x: x > 0), range(−5, 5))
[1, 2, 3, 4]


Items in the sequence for which the function returns true are added to the result list. Like map, this function is roughly equivalent to a for loop, but is built-in, and fast:


>>> res = [  ]
>>> for x in range(−5, 5):
...     if x > 0:
...         res.append(x)
...
>>> res
[1, 2, 3, 4]


reduce is more complex. Here are two reduce calls computing the sum and product of items in a list:
note in python3 reduce is in functools so import functools


>>> reduce((lambda x, y: x + y), [1, 2, 3, 4])
10
>>> reduce((lambda x, y: x * y), [1, 2, 3, 4])
24


At each step, reduce passes the current sum or product, along with the next item from the list, to the passed-in lambda function. By default, the first item in the sequence initializes the starting value. Here's the for loop equivalent to the first of these calls, with the addition hardcoded inside the loop:


>>> L = [1,2,3,4]
>>> res = L[0]
>>> for x in L[1:]:
...     res = res + x
...
>>> res
10


Coding your own version of reduce (for instance, if it is indeed removed in Python 3.0) is actually fairly straightforward:


>>> def myreduce(function, sequence):
...     tally = sequence[0]
...     for next in sequence[1:]:
...         tally = function(tally, next)
...     return tally
...
>>> myreduce((lambda x, y: x + y), [1, 2, 3, 4, 5])
15
>>> myreduce((lambda x, y: x * y), [1, 2, 3, 4, 5])
120


If this has sparked your interest, also see the built-in operator module, which provides functions that correspond to built-in expressions, and so comes in handy for some uses of functional tools:


>>> import operator 
>>> reduce(operator.add, [2, 4, 6])  # Function-based +
12
>>> reduce((lambda x, y: x + y), [2, 4, 6]) 
12


Together with map, filter and reduce support powerful functional programming techniques. Some observers might also extend the functional programming toolset in Python to include lambda and apply, and list comprehensions, which are discussed in the next section.

			30.3.3.5  List Comprehensions Revisited: Mappings

Because mapping operations over sequences and collecting results is such a common task in Python coding, Python 2.0 sprouted a new feature—the list comprehension expression—that makes it even simpler than using the tools we just studied. We met list comprehensions in Chapter 13, but because they're related to functional programming tools like the map and filter calls, we'll resurrect the topic here for one last look. Technically, this feature is not tied to functions—as we'll see, list comprehensions can be a more general tool than map and filter—but it is sometimes best understood by analogy to function-based alternatives.

				30.3.3.5.1  List Comprehension Basics

Let's work through an example that demonstrates the basics. As we saw in Chapter 7, Python's built-in ord function returns the ASCII integer code of a single character (the chr built-in is the converse—it returns the character for an ASCII integer code):


>>> ord('s')
115


Now, suppose we wish to collect the ASCII codes of all characters in an entire string. Perhaps the most straightforward approach is to use a simple for loop, and append the results to a list:


>>> res = []
>>> for x in 'spam':
...     res.append(ord(x))
...
>>> res
[115, 112, 97, 109]


Now that we know about map, though, we can achieve similar results with a single function call without having to manage list construction in the code:


>>> res = map(ord, 'spam')  # Apply function to sequence
>>> res 
[115, 112, 97, 109]


As of Python 2.0, however, we can get the same results from a list comprehension expression:


>>> res = [ord(x) for x in 'spam']  # Apply expression to sequence
>>> res 
[115, 112, 97, 109]


List comprehensions collect the results of applying an arbitrary expression to a sequence of values and return them in a new list. Syntactically, list comprehensions are enclosed in square brackets (to remind you that they construct lists). In their simple form, within the brackets you code an expression that names a variable followed by what looks like a for loop header that names the same variable. Python then collects the expression's results for each iteration of the implied loop.

The effect of the preceding example is similar to that of the manual for loop and the map call. List comprehensions become more convenient, though, when we wish to apply an arbitrary expression to a sequence:


>>> [x ** 2 for x in range(10)]
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]


Here, we've collected the squares of the numbers 0 through 9 (we're just letting the interactive prompt print the resulting list; assign it to a variable if you need to retain it). To do similar work with a map call, we would probably invent a little function to implement the square operation. Because we won't need this function elsewhere, we'd typically (but not necessarily) code it inline, with a lambda, instead of using a def statement elsewhere:


>>> map((lambda x: x ** 2), range(10))
[0, 1, 4, 9, 16, 25, 36, 49, 64, 81]


This does the same job, and it's only a few keystrokes longer than the equivalent list comprehension. It's also only marginally more complex (at least, once you understand the lambda). For more advanced kinds of expressions, though, list comprehensions will often require considerably less typing. The next section shows why.

				30.3.3.5.2 Adding Tests and Nested Loops, tags: double for nested list comprehension 

List comprehensions are even more general than shown so far. For instance, you can code an if clause after the for, to add selection logic. List comprehensions with if clauses can be thought of as analogous to the filter built-in discussed in the prior section—they skip sequence items for which the if clause is not true. Here are examples of both schemes picking up even numbers from 0 to 4; like the map list comprehension alternative we just looked at, the filter version here invents a little lambda function for the test expression. For comparison, the equivalent for loop is shown here as well:


>>> [x for x in range(5) if x % 2 == 0]
[0, 2, 4]

>>> filter((lambda x: x % 2 == 0), range(5))
[0, 2, 4]

>>> res = [  ]
>>> for x in range(5):
...     if x % 2 == 0:
...         res.append(x)
...
>>> res
[0, 2, 4]


All of these use the modulus (remainder of division) operator, %, to detect even numbers: if there is no remainder after dividing a number by two, it must be even. The filter call is not much longer than the list comprehension here either. However, we can combine an if clause, and an arbitrary expression in our list comprehension, to give it the effect of a filter and a map, in a single expression:


>>> [x ** 2 for x in range(10) if x % 2 == 0]
[0, 4, 16, 36, 64]


This time, we collect the squares of the even numbers from 0 through 9: the for loop skips numbers for which the attached if clause on the right is false, and the expression on the left computes the squares. The equivalent map call would require a lot more work on our part—we would have to combine filter selections with map iteration, making for a noticeably more complex expression:


>>> map((lambda x: x**2), filter((lambda x: x % 2 == 0), range(10)))
[0, 4, 16, 36, 64]


In fact, list comprehensions are more general still. You can code any number of nested for loops in a list comprehension, and each may have an optional associated if test. The general structure of list comprehensions looks like this:


[ expression for target1 in sequence1 [if condition]
             for target2 in sequence2 [if condition] ...
             for targetN in sequenceN [if condition] ]


When for clauses are nested within a list comprehension, they work like equivalent nested for loop statements. For example, the following:


>>> res = [x + y for x in [0, 1, 2] for y in [100, 200, 300]]
>>> res
[100, 200, 300, 101, 201, 301, 102, 202, 302]


has the same effect as this substantially more verbose equivalent:


>>> res = []
>>> for x in [0, 1, 2]:
...     for y in [100, 200, 300]:
...         res.append(x + y)
...
>>> res
[100, 200, 300, 101, 201, 301, 102, 202, 302]


Although list comprehensions construct lists, remember that they can iterate over any sequence or other iterable type. Here's a similar bit of code that traverses strings instead of lists of numbers, and so collects concatenation results:


>>> [x + y for x in 'spam' for y in 'SPAM']
['sS', 'sP', 'sA', 'sM', 'pS', 'pP', 'pA', 'pM',
'aS', 'aP', 'aA', 'aM', 'mS', 'mP', 'mA', 'mM']


Finally, here is a much more complex list comprehension that illustrates the effect of attached if selections on nested for clauses:

>>> [(x, y) for x in range(5) if x % 2 == 0 for y in range(5) if y % 2 == 1]
[(0, 1), (0, 3), (2, 1), (2, 3), (4, 1), (4, 3)]

					  


This expression permutes even numbers from 0 through 4 with odd numbers from 0 through 4. The if clauses filter out items in each sequence iteration. Here's the equivalent statement-based code:


>>> res = []
>>> for x in range(5):
...     if x % 2 == 0:
...         for y in range(5):
...             if y % 2 == 1:
...                 res.append((x, y))
...
>>> res
[(0, 1), (0, 3), (2, 1), (2, 3), (4, 1), (4, 3)]


Recall that if you're confused about what a complex list comprehension does, you can always nest the list comprehension's for and if clauses inside each other (indenting successively further to the right) to derive the equivalent statements. The result is longer, but perhaps clearer.

The map and filter equivalent would be wildly complex and deeply nested, so I won't even try showing it here. I'll leave its coding as an exercise for Zen masters, ex-LISP programmers, and the criminally insane.

				30.3.3.5.3 List Comprehensions and Matrixes

Let's look at one more advanced application of list comprehensions to stretch a few synapses. One basic way to code matrixes (a.k.a. multidimensional arrays) in Python is with nested list structures. The following, for example, defines two 3 × 3 matrixes as lists of nested lists:


>>> M = [[1, 2, 3],
...      [4, 5, 6],
...      [7, 8, 9]]

>>> N = [[2, 2, 2],
...      [3, 3, 3],
...      [4, 4, 4]]


Given this structure, we can always index rows, and columns within rows, using normal index operations:


>>> M[1]
[4, 5, 6]

>>> M[1][2]
6


List comprehensions are powerful tools for processing such structures, though, because they automatically scan rows and columns for us. For instance, although this structure stores the matrix by rows, to collect the second column, we can simply iterate across the rows and pull out the desired column, or iterate through positions in the rows and index as we go:


>>> [row[1] for row in M]
[2, 5, 8]

>>> [M[row][1] for row in (0, 1, 2)]
[2, 5, 8]


Given positions, we can also easily perform tasks such as pulling out a diagonal. The following expression uses range to generate the list of offsets, and then indexes with the row and column the same, picking out M[0][0], then M[1][1], and so on (we assume the matrix has the same number of rows and columns):


>>> [M[i][i] for i in range(len(M))]
[1, 5, 9]


Finally, with a bit of creativity, we can also use list comprehensions to combine multiple matrixes. The following first builds a flat list that contains the result of multiplying the matrixes pairwise, and then builds a nested list structure having the same values by nesting list comprehensions:


>>> [M[row][col] * N[row][col] for row in range(3) for col in range(3)]
[2, 4, 6, 12, 15, 18, 28, 32, 36]

>>> [[M[row][col] * N[row][col] for col in range(3)] for row in range(3)]
[[2, 4, 6], [12, 15, 18], [28, 32, 36]]


This last expression works because the row iteration is an outer loop: for each row, it runs the nested column iteration to build up one row of the result matrix. It's equivalent to this statement-based code:


>>> res = []
>>> for row in range(3):
...     tmp = []
...     for col in range(3):
...         tmp.append(M[row][col] * N[row][col])
...     res.append(tmp)
...
>>> res
[[2, 4, 6], [12, 15, 18], [28, 32, 36]]


Compared to these statements, the list comprehension version requires only one line of code, will probably run substantially faster for large matrixes, and just might make your head explode! Which brings us to the next section.

				30.3.3.5.4 Comprehending List Comprehensions

With such generality, list comprehensions can quickly become, well, incomprehensible, especially when nested. Consequently, my advice is typically to use simple for loops when getting started with Python, and map calls in most other cases (unless they get too complex). The "keep it simple" rule applies here, as always: code conciseness is a much less important goal than code readability.

However, in this case, there is currently a substantial performance advantage to the extra complexity: based on tests run under Python today, map calls are roughly twice as fast as equivalent for loops, and list comprehensions are usually slightly faster than map calls.[47] This speed difference is down to the fact that map and list comprehensions run at C language speed inside the interpreter, which is much faster than stepping through Python for loop code within the PVM.

    [47] * These performance generalizations can depend on call patterns, as well as changes and optimizations in Python itself. Recent Python releases have sped up the simple for loop statement, for example. Usually, though, list comprehensions are still substantially faster than for loops and even faster than map (though map can still win for built-in functions). To time these alternatives yourself, see the standard library's time module's time.clock and time.time calls, the newer timeit module added in Release 2.4, or this chapter's upcoming section "Section 17.7."

Because for loops make logic more explicit, I recommend them in general on the grounds of simplicity. However, map and list comprehensions are worth knowing and using for simpler kinds of iterations, and if your application's speed is an important consideration. In addition, because map and list comprehensions are both expressions, they can show up syntactically in places that for loop statements cannot, such as in the bodies of lambda functions, within list and dictionary literals, and more. Still, you should try to keep your map calls and list comprehensions simple; for more complex tasks, use full statements instead.

Why You Will Care: List Comprehensions and map

Here's a more realistic example of list comprehensions and map in action (we solved this problem with list comprehensions in Chapter 13, but we'll revive it here to add map-based alternatives). Recall that the file readlines method returns lines with \n end-of-line characters at the ends:


>>> open('myfile').readlines(  )
['aaa\n', 'bbb\n', 'ccc\n']


If you don't want the end-of-line characters, you can slice them off all the lines in a single step with a list comprehension or a map call:


>>> [line.rstrip(  ) for line in open('myfile').readlines(  )]
['aaa', 'bbb', 'ccc']

>>> [line.rstrip(  ) for line in open('myfile')]
['aaa', 'bbb', 'ccc']

>>> map((lambda line: line.rstrip(  )), open('myfile'))
['aaa', 'bbb', 'ccc']


The last two of these make use of file iterators (which essentially means that you don't need a method call to grab all the lines in iteration contexts such as these). The map call is just slightly longer than the list comprehension, but neither has to manage result list construction explicitly.

A list comprehension can also be used as a sort of column projection operation. Python's standard SQL database API returns query results as a list of tuples much like the following—the list is the table, tuples are rows, and items in tuples are column values:


listoftuple = [('bob', 35, 'mgr'), ('mel', 40, 'dev')]


A for loop could pick up all the values from a selected column manually, but map and list comprehensions can do it in a single step, and faster:


>>> [age for (name, age, job) in listoftuple]
[35, 40]

>>> map((lambda (name, age, job): age), listoftuple)
[35, 40]


Both of these make use of tuple assignment to unpack row tuples in the list.

See other books and resources for more on Python's database API.

			30.3.3.6  Iterators Revisited: Generators

In this part of the book, we've learned about coding normal functions that receive input parameters and send back a single result immediately. It is also possible, however, to write functions that may send back a value and later be resumed, picking up where they left off. Such functions are known as generators because they generate a sequence of values over time.

Generator functions are like normal functions in most respects, but in Python, they are automatically made to implement the iteration protocol so that they can appear in iteration contexts. We studied iterators in Chapter 13; here, we'll revise them to see how they relate to generators.

Unlike normal functions that return a value and exit, generator functions automatically suspend and resume their execution and state around the point of value generation. Because of that, they are often a useful alternative to both computing an entire series of values up front, and manually saving and restoring state in classes. Generator functions automatically retain their state when they are suspended—because this includes their entire local scope, their local variables keep state information, which is available when the functions are resumed.

The chief code difference between generator and normal functions is that a generator yields a value, rather than returning one—the yield statement suspends the function, and sends a value back to the caller, but retains enough state to enable the function to resume from where it left off. This allows these functions to produce a series of values over time, rather than computing them all at once, and sending them back in something like a list.

Generator functions are bound up with the notion of iterator protocols in Python. In short, functions containing a yield statement are compiled specially as generators; when called, they return a generator object that supports the iterator object interface. Generator functions may also have a return statement, which simply terminates the generation of values.

Iterator objects, in turn, define a next method, which either returns the next item in the iteration, or raises a special exception (StopIteration) to end the iteration. Iterators are fetched with the iter built-in function. Python for loops use this iteration interface protocol to step through a sequence (or sequence generator), if the protocol is supported; if not, for falls back on repeatedly indexing sequences instead.

				30.3.3.6.1  Generator Function Example

Generators and iterators are advanced language features, so please see the Python library manuals for the full story. To illustrate the basics, though, the following code defines a generator function that can be used to generate the squares of a series of numbers over time:[48]

    [48] * Generators are available in Python releases after 2.2; in 2.2, they must be enabled with a special import statement of the form from __future__ import generators (see Chapter 18 for more on this statement form). Iterators were already available in 2.2, largely because the underlying protocol did not require the new, nonbackward-compatible keyword yield.


>>> def gensquares(N): 
...     for i in range(N): 
...         yield i ** 2  # Resume here later
...


This function yields a value, and so returns to its caller, each time through the loop; when it is resumed, its prior state is restored, and control picks up again immediately after the yield statement. For example, when used in the body of a for loop, control returns to the function after its yield statement each time through the loop:


>>> for i in gensquares(5):  # Resume the function
...     print i, ':',  # Print last yielded value
...
0 : 1 : 4 : 9 : 16 :
>>>


To end the generation of values, functions either use a return statement with no value, or simply allow control to fall off the end of the function body.

If you want to see what is going on inside the for, call the generator function directly:


>>> x = gensquares(4)
>>> x
<generator object at 0x0086C378>


You get back a generator object that supports the iterator protocol (i.e., has a next method that starts the function, or resumes it from where it last yielded a value, and raises a StopIteration exception when the end of the series of values is reached):


>>> x.next(  )
0
>>> x.next(  )
1
>>> x.next(  )
4
>>> x.next(  )
9
>>> x.next(  )

Traceback (most recent call last):
  File "<pyshell#453>", line 1, in <module>
    x.next(  )
StopIteration


for loops work with generators in the same way—by calling the next method repeatedly, until an exception is caught. If the object to be iterated over does not support this protocol, for loops instead use the indexing protocol to iterate.

Note that in this example, we could also simply build the list of yielded values all at once:


>>> def buildsquares(n):
...     res = []
...     for i in range(n): res.append(i**2)
...     return res
...
>>> for x in buildsquares(5): print x, ':',
...
0 : 1 : 4 : 9 : 16 :


For that matter, we could use any of the for loop, map, or list comprehension techniques:


>>> for x in [n**2 for n in range(5)]:
...     print x, ':',
...
0 : 1 : 4 : 9 : 16 :

>>> for x in map((lambda x:x**2), range(5)):
...     print x, ':',
...
0 : 1 : 4 : 9 : 16 :


However, generators allow functions to avoid doing all the work up front, which is especially useful when the result lists are large, or when it takes a lot of computation to produce each value. Generators distribute the time required to produce the series of values among loop iterations. Moreover, for more advanced uses, they provide a simpler alternative to manually saving the state between iterations in class objects (more on classes later in Part 6); with generators, function variables are saved and restored automatically.

				30.3.3.6.2 Extended Generator Function Protocol: send Versus next

In Python 2.5, a send method was added to the generator function protocol. The send method advances to the next item in the series of results, just like the next method, but also provides a way for the caller to communicate with the generator, to affect its operation.

Technically, yield is now an expression form that returns the item passed to send, not a statement (though it can be called either way—as yield X, or A = (yield X)). Values are sent into a generator by calling its send(value) method. The generator's code is then resumed, and the yield expression returns the value passed to send. If the regular next( ) method is called, the yield returns None.

The send method can be used, for example, to code a generator that can be terminated by its caller. In addition, generators in 2.5 also support a throw(type) method to raise an exception inside the generator at the latest yield, and a close( ) method that raises a new GeneratorExit exception inside the generator to terminate the iteration. These are advanced features that we won't delve into in more detail here; see Python's standard manuals for more details.

				30.3.3.6.3 Iterators and Built-in Types

As we saw in Chapter 13, built-in data types are designed to produce iterator objects in response to the iter built-in function. Dictionary iterators, for instance, produce key list items on each iteration:


>>> D = {'a':1, 'b':2, 'c':3}
>>> x = iter(D)
>>> x.next(  )
'a'
>>> x.next(  )
'c'


In addition, all iteration contexts (including for loops, map calls, list comprehensions, and the many other contexts we met in Chapter 13) are in turn designed to automatically call the iter function to see whether the protocol is supported. That's why you can loop through a dictionary's keys without calling its keys method, step through lines in a file without calling readlines or xreadlines, and so on:


>>> for key in D:
...     print key, D[key]
...
a 1
c 3
b 2


As we've also seen, for file iterators, Python simply loads lines from the file on demand:


>>> for line in open('temp.txt'):
...     print line,
...
Tis but
a flesh wound.


It is also possible to implement arbitrary generator objects with classes that conform to the iterator protocol, and so may be used in for loops and other iteration contexts. Such classes define a special __iter__ method that returns an iterator object (preferred over the __getitem__ indexing method). However, this is well beyond the scope of this chapter; see Part 6 for more on classes in general, and Chapter 24 for an example of a class that implements the iterator protocol.


				30.3.3.6.4 Generator Expressions: Iterators Meet List Comprehensions

In recent versions of Python, the notions of iterators and list comprehensions are combined in a new feature of the language, generator expressions. Syntactically, generator expressions are just like normal list comprehensions, but they are enclosed in parentheses instead of square brackets:


>>> [x ** 2 for x in range(4)]  # List comprehension: build a list
[0, 1, 4, 9]

>>> (x ** 2 for x in range(4))  # Generator expression: make an iterable
<generator object at 0x011DC648>


Operationally, however, generator expressions are very different—instead of building the result list in memory, they return a generator object, which in turn supports the iteration protocol to yield one piece of the result list at a time in any iteration context:


>>> G = (x ** 2 for x in range(4))
>>> G.next(  )
0
>>> G.next(  )
1
>>> G.next(  )
4
>>> G.next(  )
9
>>> G.next(  )

Traceback (most recent call last):
  File "<pyshell#410>", line 1, in <module>
    G.next(  )
StopIteration


We don't typically see the next iterator machinery under the hood of a generator expression like this because for loops trigger it for us automatically:


>>> for num in (x ** 2 for x in range(4)):
...     print '%s, %s' % (num, num / 2.0)
...
0, 0.0
1, 0.5
4, 2.0
9, 4.5


In fact, every iteration context does this, including the sum, map, and sorted built-in functions, and the other iteration contexts we learned about in Chapter 13, such as the any, all, and list built-in functions.

Notice that the parentheses are not required around a generator expression if they are the sole item enclosed in other parentheses, like those of a function call. Extra parentheses are required, however, in the second call to sorted:


>>> sum(x ** 2 for x in range(4))
14

>>> sorted(x ** 2 for x in range(4))
[0, 1, 4, 9]

>>> sorted((x ** 2 for x in range(4)), reverse=True)
[9, 4, 1, 0]

>>> import math
>>> map(math.sqrt, (x ** 2 for x in range(4)))
[0.0, 1.0, 2.0, 3.0]


Generator expressions are primarily a memory space optimization—they do not require the entire result list to be constructed all at once, as the square-bracketed list comprehension does. They may also run slightly slower in practice, so they are probably best used only for very large result sets—which provides a natural segue to the next section.

			30.3.3.7  Timing Iteration Alternatives
We've met a few iteration alternatives in this book. To summarize, let's take a brief look at a case study that pulls together some of the things we've learned about iteration and functions.

I've mentioned a few times that list comprehensions have a speed performance advantage over for loop statements, and that map performance can be better or worse depending on call patterns. The generator expressions of the prior section tend to be slightly slower than list comprehensions, though they minimize memory requirements.

All that's true today, but relative performance can vary over time (Python is constantly being optimized). If you want to test this for yourself, try running the following script on your own computer, and your version of Python:

# file timerseqs.py
import time, sys
reps = 1000
size = 10000

def tester(func, *args):
    startTime = time.time(  )
    for i in range(reps):
        func(*args)
    elapsed = time.time(  ) - startTime
    return elapsed

def forStatement(  ):
    res = []
    for x in range(size):
        res.append(abs(x))

def listComprehension(  ):
    res = [abs(x) for x in range(size)]

def mapFunction(  ):
    res = map(abs, range(size))

def generatorExpression(  ):
    res = list(abs(x) for x in range(size))

print sys.version
tests = (forStatement, listComprehension, mapFunction, generatorExpression)
for testfunc in tests:
    print testfunc.__name__.ljust(20), '=>', tester(testfunc)

					  

running on my 64bit 4 dual core CPU win7 machine:
:!python /cygdrive/c/work/scripts/python/learn/learning_python/timerseqs.py
2.6.5 (r265:79063, Jun 12 2010, 17:07:01)
[GCC 4.3.4 20090804 (release) 1]
forStatement         => 3.58200001717
listComprehension    => 2.23300004005
mapFunction          => 1.28999996185
generatorExpression  => 2.36800003052   


This script tests all the alternative ways to build lists of results and, as shown, executes on the order of 10 million steps for each—that is, each of the four tests builds a list of 10,000 items 1,000 times.

Notice how we have to run the generator expression though the built-in list call to force it to yield all of its values; if we did not, we would just produce a generator that never does any real work. Also, notice how the code at the bottom steps through a tuple of four function objects, and prints the __name__ of each: this is a built-in attribute that gives a function's name.

When I ran this in IDLE on Windows XP with Python 2.5, here is what I found—list comprehensions were roughly twice as fast as equivalent for loop statements, and map was slightly quicker than list comprehensions when mapping a built-in function such as abs (absolute value):


2.5 (r25:51908, Sep 19 2006, 09:52:17) [MSC v.1310 32 bit (Intel)]
forStatement         => 6.10899996758
listComprehension    => 3.51499986649
mapFunction          => 2.73399996758
generatorExpression  => 4.11600017548


But watch what happens if we change this script to perform a real operation on each iteration, such as addition:


...
...
def forStatement(  ):
    res = []
    for x in range(size):
        res.append(x + 10)

def listComprehension(  ):
    res = [x + 10 for x in range(size)]

def mapFunction(  ):
    res = map((lambda x: x + 10), range(size))

def generatorExpression(  ):
    res = list(x + 10 for x in range(size))
...
...


The function-call requirement of the map call then makes it just as slow as the for loop statements, despite the fact the looping statements version is larger in terms of code:


2.5 (r25:51908, Sep 19 2006, 09:52:17) [MSC v.1310 32 bit (Intel)]
forStatement         => 5.25699996948
listComprehension    => 2.68400001526
mapFunction          => 5.96900010109
generatorExpression  => 3.37400007248


Because the interpreter optimizes so much internally, performance analysis of Python code like this is a very tricky affair. It's virtually impossible to guess which method will perform the best—the best you can do is time your own code, on your computer, with your version of Python. In this case, all we can say for certain is that on this Python, using a user-defined function in map calls can slow it down by at least a factor of 2, and that list comprehensions run quickest for this test.

As I've mentioned before, however, performance should not be your primary concern when writing Python code—write for readability and simplicity first, then optimize later, if and only if needed. It could very well be that any of the four alternatives is quick enough for the data sets the program needs to process; if so, program clarity should be the chief goal.

For more insight, try modifying the repetition counts at the top of this script, or see the newer timeit module, which automates timing of code, and finesses some platform-specific issues (on some platforms, for instance, time.time is preferred over time.clock). Also, see the profile standard library module for a complete source code profiler tool.

			30.3.3.8  Function Design Concepts
When you start using functions, you're faced with choices about how to glue components together—for instance, how to decompose a task into purposeful functions (resulting in cohesion), how your functions should communicate (coupling), and so on. You need to take into account concepts such as cohesion, coupling, and the size of the functions—some of this falls into the category of structured analysis and design. We introduced some ideas related to function and module coupling in the prior chapter, but here is a review of a few general guidelines for Python beginners:

    * Coupling: use arguments for inputs andreturnfor outputs. Generally, you should strive to make a function independent of things outside of it. Arguments and return statements are often the best ways to isolate external dependencies to a small number of well-known places in your code.
    * Coupling: use global variables only when truly necessary. Global variables (i.e., names in the enclosing module) are usually a poor way for functions to communicate. They can create dependencies and timing issues that make programs difficult to debug and change.
    * Coupling: don't change mutable arguments unless the caller expects it. Functions can change parts of passed-in mutable objects, but as with global variables, this implies lots of coupling between the caller and callee, which can make a function too specific and brittle.
    * Cohesion: each function should have a single, unified purpose. When designed well, each of your functions should do one thing—something you can summarize in a simple declarative sentence. If that sentence is very broad (e.g., "this function implements my whole program"), or contains lots of conjunctions (e.g., "this function gives employee raises and submits a pizza order"), you might want to think about splitting it into separate and simpler functions. Otherwise, there is no way to reuse the code behind the steps mixed together in the function.
    * Size: each function should be relatively small. This naturally follows from the preceding goal, but if your functions start spanning multiple pages on your display, it's probably time to split them. Especially given that Python code is so concise to begin with, a long or deeply nested function is often a symptom of design problems. Keep it simple, and keep it short.
    * Coupling: avoid changing variables in another module file directly. We introduced this concept in the prior chapter, and we'll revisit it in the next part of the book when we focus on modules. For reference, though, remember that changing variables across file boundaries sets up a coupling between modules similar to how global variables couple functions—the modules become difficult to understand and reuse. Use accessor functions whenever possible, instead of direct assignment statements.

Figure 17-1 summarizes the ways functions can talk to the outside world; inputs may come from items on the left side, and results may be sent out in any of the forms on the right. Many function designers prefer to use only arguments for inputs, and return statements for outputs.

Figure 17-1. Function execution environment. Functions may obtain input and produce output in a variety of ways, though functions are usually easier to understand and maintain if you use arguments for input, and return statements and anticipated mutable argument changes for output.


Of course, there are plenty of exceptions to the preceding design rules, including some related to Python's OOP support. As you'll see in Part 6, Python classes depend on changing a passed-in mutable object—class functions set attributes of an automatically passed-in argument called self to change per-object state information (e.g., self.name='bob'). Moreover, if classes are not used, global variables are often the best way for functions in modules to retain state between calls. The side effects aren't dangerous if they're expected.

				30.3.3.8.1  Functions Are Objects: Indirect Calls

Because Python functions are objects at runtime, you can write programs that process them generically. Function objects can be assigned, passed to other functions, stored in data structures, and so on, as if they were simple numbers or strings. We've seen some of these uses in earlier examples. Function objects also happen to support a special operation: they can be called by listing arguments in parentheses after a function expression. Still, functions belong to the same general category as other objects.

For instance, there's really nothing special about the name used in a def statement: it's just a variable assigned in the current scope, as if it had appeared on the left of an = sign. After a def runs, the function name is simply a reference to an object, and you can reassign that object to other names, and call it through any reference (not just the original name):


>>> def echo(message):  # echo assigned to a function object
...     print message 
...
>>> x = echo  # Now x references it too
>>> x('Hello world!')  # Call the object by adding (  )
Hello world!


Because arguments are passed by assigning objects, it's just as easy to pass functions to other functions as arguments. The callee may then call the passed-in function just by adding arguments in parentheses:


>>> def indirect(func, arg): 
...     func(arg)  # Call the object by adding (  )
...
>>> indirect(echo, 'Hello jello!')  # Pass the function to a function
Hello jello!


You can even stuff function objects into data structures, as though they were integers or strings. Because Python compound types can contain any sort of object, there's no special case here either:


>>> schedule = [ (echo, 'Spam!'), (echo, 'Ham!') ]
>>> for (func, arg) in schedule:
...     func(arg)
...
Spam!
Ham!


This code simply steps through the schedule list, calling the echo function with one argument each time through (notice the tuple-unpacking assignment in the for loop header, introduced in Chapter 13). Python's lack of type declarations makes for an incredibly flexible programming language.


			30.3.3.9  Function Gotchas
Functions have some jagged edges that you might not expect. They're all obscure, and a few have started to fall away from the language completely in recent releases, but most have been known to trip up new users.

				30.3.3.9.1  Local Names Are Detected Statically

As you know, Python classifies names assigned in a function as locals by default; they live in the function's scope and exist only while the function is running. What I didn't tell you is that Python detects locals statically, when it compiles the def's code, rather than by noticing assignments as they happen at runtime. This leads to one of the most common oddities posted on the Python newsgroup by beginners.

Normally, a name that isn't assigned in a function is looked up in the enclosing module:


>>> X = 99 
>>> def selector(  ):  # X used but not assigned
...     print X  # X found in global scope
...
>>> selector(  ) 
99


Here, the X in the function resolves to the X in the module. But watch what happens if you add an assignment to X after the reference:
>>> def selector(  ): 
...     print X  # Does not yet exist!
...     X = 88  # X classified as a local name (everywhere)
...                           # Can also happen if "import X", "def X" . . .
>>> selector(  ) 
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
  File "<stdin>", line 2, in selector
UnboundLocalError: local variable 'X' referenced before assignment

					  


You get an undefined name error, but the reason is subtle. Python reads and compiles this code when it's typed interactively or imported from a module. While compiling, Python sees the assignment to X, and decides that X will be a local name everywhere in the function. But, when the function is actually run, because the assignment hasn't yet happened when the print executes, Python says you're using an undefined name. According to its name rules, it should say this; the local X is used before being assigned. In fact, any assignment in a function body makes a name local. Imports, =, nested defs, nested classes, and so on, are all susceptible to this behavior.

The problem occurs because assigned names are treated as locals everywhere in a function, not just after the statements where they are assigned. Really, the previous example is ambiguous at best: was the intention to print the global X and then create a local X, or is this a genuine programming error? Because Python treats X as a local everywhere, it is an error; if you really mean to print the global X, you need to declare it in a global statement:


>>> def selector(  ): 
...     global X  # Force X to be global (everywhere)
...     print X 
...     X = 88 
...
>>> selector(  ) 
99


Remember, though, that this means the assignment also changes the global X, not a local X. Within a function, you can't use both local and global versions of the same simple name. If you really meant to print the global, and then set a local of the same name, import the enclosing module, and use module attribute notation to get to the global version:


>>> X = 99 
>>> def selector(  ): 
...     import __main__  # Import enclosing module
...     print __main__.X  # Qualify to get to global version of name
...     X = 88  # Unqualified X classified as local
...     print X  # Prints local version of name
...
>>> selector(  ) 
99
88


Qualification (the .X part) fetches a value from a namespace object. The interactive namespace is a module called __main__, so __main__.X reaches the global version of X. If that isn't clear, check out Part 5.[49]

    [49] * Python has improved on this story somewhat by issuing for this case the more specific "unbound local" error message shown in the example listing (it used to simply raise a generic name error); this gotcha is still present in general, though.

				30.3.3.9.2 Defaults and Mutable Objects

Default argument values are evaluated and saved when a def statement is run, not when the resulting function is called. Internally, Python saves one object per default argument attached to the function itself.

That's usually what you want—because defaults are evaluated at def time, it lets you save values from the enclosing scope, if needed. But because a default retains an object between calls, you have to be careful about changing mutable defaults. For instance, the following function uses an empty list as a default value, and then changes it in-place each time the function is called:


>>> def saver(x=[]):  # Saves away a list object
...     x.append(1)  # Changes same object each time!
...     print x 
...
>>> saver([2])  # Default not used
[2, 1]
>>> saver(  )  # Default used
[1]
>>> saver(  )  # Grows on each call!
[1, 1]
>>> saver(  ) 
[1, 1, 1]


Some see this behavior as a feature—because mutable default arguments retain their state between function calls, they can serve some of the same roles as static local function variables in the C language. In a sense, they work sort of like global variables, but their names are local to the functions, and so will not clash with names elsewhere in a program.

To most observers, though, this seems like a gotcha, especially the first time they run into it. There are better ways to retain state between calls in Python (e.g., using classes, which will be discussed in Part 6).

Moreover, mutable defaults are tricky to remember (and to understand at all). They depend upon the timing of default object construction. In the prior example, there is just one list object for the default value—the one created when the def is executed. You don't get a new list every time the function is called, so the list grows with each new append; it is not reset to empty on each call.

If that's not the behavior you want, simply make a copy of the default at the start of the function body, or move the default value expression into the function body. As long as the value resides in code that's actually executed each time the function runs, you'll get a new object each time through:


>>> def saver(x=None): 
...     if x is None:  # No argument passed?
...         x = []  # Run code to make a new list
...     x.append(1)  # Changes new list object
...     print x 
...
>>> saver([2]) 
[2, 1]
>>> saver(  )  # Doesn't grow here
[1]
>>> saver(  ) 
[1]


By the way, the if statement in this example could almost be replaced by the assignment x = x or [], which takes advantage of the fact that Python's or returns one of its operand objects: if no argument was passed, x would default to None, so the or would return the new empty list on the right.

However, this isn't exactly the same. If an empty list were passed in, the or expression would cause the function to extend and return a newly created list, rather than extending and returning the passed-in list like the if version. (The expression becomes [] or [], which evaluates to the new empty list on the right; see "Section 12.3" in Chapter 12, if you don't recall why). Real program requirements may call for either behavior.

				30.3.3.9.3 Functions Without returns

In Python functions, return (and yield) statements are optional. When a function doesn't return a value explicitly, the function exits when control falls off the end of the function body. Technically, all functions return a value; if you don't provide a return statement, your function returns the None object automatically:


>>> def proc(x): 
...     print x  # No return is a None return
...
>>> x = proc('testing 123...') 
testing 123...
>>> print x 
None


Functions such as this without a return are Python's equivalent of what are called "procedures" in some languages. They're usually invoked as statements, and the None results are ignored, as they do their business without computing a useful result.

This is worth knowing because Python won't tell you if you try to use the result of a function that doesn't return one. For instance, assigning the result of a list append method won't raise an error, but you'll get back None, not the modified list:


>>> list = [1, 2, 3] 
>>> list = list.append(4)  # append is a "procedure"
>>> print list  # append changes list in-place
None


As mentioned in "Section 14.2" in Chapter 14, such functions do their business as a side effect, and are usually designed to be run as statements, not expressions.

				30.3.3.9.4 Enclosing Scope Loop Variables

We described this gotcha in Chapter 16's discussion of enclosing function scopes, but, as a reminder, be careful about relying on enclosing function scope lookup for variables that are changed by enclosing loops—all such references will remember the value of the last loop iteration. Use defaults to save loop variable values instead (see Chapter 16 for more details on this topic).

			30.3.3.10 Chapter Summary
This chapter took us on a tour of advanced function-related concepts—lambda expression functions; generator functions with yield statements; generator expressions; apply-like call syntax; functional tools such as map, filter, and reduce; and general function design ideas. We also revisited iterators and list comprehensions here because they are just as related to functional programming as to looping statements. As a wrap-up for iteration concepts, we also measured the performance of iteration alternatives. Finally, we reviewed common function-related mistakes to help you sidestep potential pitfalls.

This concludes the functions part of this book. In the next part, we will study modules, the topmost organizational structure in Python, and the structure in which our functions always live. After that, we will explore classes, tools that are largely packages of functions with special first arguments. As we'll see, everything we have learned here will apply when functions pop up later in the book.

Before you move on, though, make sure you've mastered function basics by working through this chapter's quiz and the exercises for this part.

BRAIN BUILDER

Chapter Quiz

Q:	What is the difference between enclosing a list comprehension in square brackets and parentheses?
Q:	How are generators and iterators related?
Q:	How can you tell if a function is a generator function?
Q:	What does a yield statement do?
Q:	Given a function object, and a tuple of arguments, how might you call the function?
Q:	How are map calls and list comprehensions related? Compare and contrast the two.
Q:	How are lambda expressions and def statements related? Compare and contrast the two.


Quiz Answers

A:	List comprehensions in square brackets produce the result list all at once in memory. When they are enclosed in parentheses instead, they are actually generator expressions—they have a similar meaning, but do not produce the result list all at once. Instead, generator expressions return a generator object, which yields one item in the result at a time when used in an iteration context.
A:	Generators are objects that support the iteration protocol—they have a next method that repeatedly advances to the next item in a series of results, and raises an exception at the end of the series. In Python, we can code generator functions with def, generator expressions with parenthesized list comprehensions, and generator objects with classes that define a special method named __iter__ (discussed later in the book).
A:	A generator function has a yield statement somewhere in its code. Generator functions are otherwise identical to normal functions.
A:	When present, this statement makes Python compile the function specially as a generator; when called, it returns a generator object that supports the iteration protocol. When the yield statement is run, it sends a result back to the caller, and suspends the function's state; the function can then be resumed in response to a next method call at the caller continuing after the last yield statement. Generator functions may also have a return statement, which terminates the generator.
A:	You can call the function generically with the apply-like call syntax: function(*argstuple). You can also use the built-in function apply(function, args), but this built-in will likely be removed in a future Python release, and is not as general.
A:	The map call is similar to a list comprehension—both build a new list by collecting the results of applying an operation to each item in a sequence or other iterable, one item at a time. The main difference is that map applies a function call to each item, and list comprehensions apply arbitrary expressions. Because of this, list comprehensions are more general; they can apply a function call expression like map, but map requires a function to apply other kinds of expressions. List comprehensions also support extended syntax such as nested for loops and if clauses that subsume the filter built-in.
A:	Both lambda and def create function objects to be called later. Because lambda is an expression, though, it can be used to nest a function definition in places where a def will not work syntactically. Using a lambda is never required—you can always code a def instead, and reference the function by name. lambdas come in handy, though, to embed small pieces of deferred code that are unlikely to be used elsewhere in a program. Syntactically, a lambda only allows for a single return value expression; because it does not support a block of statements, it is not ideal for larger functions.

			30.3.3.11 BRAIN BUILDER
In these exercises, you're going to start coding more sophisticated programs. Be sure to check the solutions in "Section B.4" in Appendix B, and be sure to start writing your code in module files. You won't want to retype these exercises from scratch if you make a mistake.

   |1.  The basics. At the Python interactive prompt, write a function that prints its single argument to the screen and call it interactively, passing a variety of object types: string, integer, list, dictionary. Then, try calling it without passing any argument. What happens? What happens when you pass two arguments?

My solution:
>>> def parg(arg):
...     print arg
... 
>>> parg("a")
a
>>> parg(3)
3
>>> parg({1:5,"a":"b"})
{'a': 'b', 1: 5}
>>> parg()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: parg() takes exactly 1 argument (0 given)
>>> parg(1,2)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: parg() takes exactly 1 argument (2 given)

   |2.  Arguments. Write a function called adder in a Python module file. The function should accept two arguments, and return the sum (or concatenation) of the two. Then, add code at the bottom of the file to call the adder function with a variety of object types (two strings, two lists, two floating points), and run this file as a script from the system command line. Do you have to print the call statement results to see results on your screen?

My solution:
#adder.py

def adder(a,b): return a+b

print adder('a','b')
print adder(range(4),['a','b'])
print adder(5.87,6.04)

:!python /cygdrive/c/work/scripts/python/learn/learning_python/adder.py
ab
[0, 1, 2, 3, 'a', 'b']
11.91
        
   |3.  varargs. Generalize the adder function you wrote in the last exercise to compute the sum of an arbitrary number of arguments, and change the calls to pass more or less than two arguments. What type is the return value sum? (Hints: a slice such as S[:0] returns an empty sequence of the same type as S, and the type built-in function can test types; but see the min examples in Chapter 16 for a simpler approach.) What happens if you pass in arguments of different types? What about passing in dictionaries?

My solution:
#adder.py

def adder(a,b): return a+b

def adder2(*args): 
	sum = args[0]
	for arg in args[1:]:
		sum = sum + arg
	return sum

print adder('a','b')
print adder(range(4),['a','b'])
print adder(5.87,6.04)

print adder2('a','b', 'c')
print adder2(range(4))

:!python /cygdrive/c/work/scripts/python/learn/learning_python/adder.py
ab
[0, 1, 2, 3, 'a', 'b']
11.91
abc
[0, 1, 2, 3]  

Textbook solution:
varargs. Two alternative adder functions are shown in the following file, adders.py. The hard part here is figuring out how to initialize an accumulator to an empty value of whatever type is passed in. The first solution uses manual type testing to look for an integer, and an empty slice of the first argument (assumed to be a sequence) if the argument is determined not to be an integer. The second solution uses the first argument to initialize and scan items 2 and beyond, much like one of the min function variants shown in Chapter 16.

The second solution is better. Both of these assume all arguments are of the same type, and neither works on dictionaries (as we saw in Part 2, + doesn't work on mixed types or dictionaries). You could add a type test and special code to allow dictionaries, too, but that's extra credit:

def adder1(*args):
    print 'adder1',
    if type(args[0]) == type(0):               # Integer?
         sum = 0                               # Init to zero
    else:                                      # else sequence:
         sum = args[0][:0]                     # Use empty slice of arg1
    for arg in args:
        sum = sum + arg
    return sum

def adder2(*args):
    print 'adder2',
    sum = args[0]                              # Init to arg1
    for next in args[1:]:
        sum += next                            # Add items 2..N
    return sum

for func in (adder1, adder2):
    print func(2, 3, 4)
    print func('spam', 'eggs', 'toast')
    print func(['a', 'b'], ['c', 'd'], ['e', 'f'])

% python adders.py 
adder1 9
adder1 spameggstoast
adder1 ['a', 'b', 'c', 'd', 'e', 'f']
adder2 9
adder2 spameggstoast
adder2 ['a', 'b', 'c', 'd', 'e', 'f']

					  
   |4.  Keywords. Change the adder function from exercise 2 to accept and sum/concatenate three arguments: def adder(good, bad, ugly). Now, provide default values for each argument, and experiment with calling the function interactively. Try passing one, two, three, and four arguments. Then, try passing keyword arguments. Does the call adder(ugly=1, good=2) work? Why? Finally, generalize the new adder to accept and sum/concatenate an arbitrary number of keyword arguments. This is similar to what you did in exercise 3, but you'll need to iterate over a dictionary, not a tuple. (Hint: the dict.keys( ) method returns a list you can step through with a for or while.)

#adder.py

def adder(a,b): return a+b

def adder2(*args): 
	print 'adder2'
	sum = args[0]
	for arg in args[1:]:
		sum = sum + arg
	return sum

def adder3(a=1,b=2,c=3): 
	print 'adder3'
	return a+b+c

def adder4(**args): 
	if type(args[args.keys()[0]]) == type(0):               # Integer?
	     sum = 0                               # Init to zero
	elif type(args[args.keys()[0]]) == type('0'):               # String
		sum=''
	else:                                      # else sequence:
	     sum = []                              # Use empty slice of arg1
	print 'adder4'
	for k in args.keys():
		sum = sum + args[k]
	return sum

print adder('a','b')
print adder(range(4),['a','b'])
print adder(5.87,6.04)

print adder2('a','b', 'c')
print adder2(range(4))

print adder3(4,5,6)
#print adder3('a')
#print adder3(range(4))

print adder4(a=1, b=100, c=37651)
print adder4(a='1', b='100', c='37651')
print adder4(a=[1,2,3], b=range(10))

:!python /cygdrive/c/work/scripts/python/learn/learning_python/adder.py
ab
[0, 1, 2, 3, 'a', 'b']
11.91
adder2
abc
adder2
[0, 1, 2, 3]
adder3
15
adder4
37752
adder4
137651100
adder4
[1, 2, 3, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  


   |5.  Write a function called copyDict(dict) that copies its dictionary argument. It should return a new dictionary containing all the items in its argument. Use the dictionary keys method to iterate (or, in Python 2.2, step over a dictionary's keys without calling keys). Copying sequences is easy (X[:] makes a top-level copy); does this work for dictionaries too?

My solution:
def dict_cp(dict):
	return dict.copy()

Textbook solution:
(and 6.) Here are my solutions to exercises 5 and 6 (file dicts.py). These are just coding exercises, though, because Python 1.5 added the dictionary methods D.copy( ) and D1.update(D2) to handle things like copying and adding (merging) dictionaries. (See Python's library manual or O'Reilly's Python Pocket Reference for more details.) X[:] doesn't work for dictionaries, as they're not sequences (see Chapter 8 for details). Also, remember that if you assign (e = d) rather than copying, you generate a reference to a shared dictionary object; changing d changes e, too:
Code View: Scroll / Show All


def copyDict(old):
    new = {}
    for key in old.keys(  ):
        new[key] = old[key]
    return new

def addDict(d1, d2):
    new = {}
    for key in d1.keys(  ):
        new[key] = d1[key]
    for key in d2.keys(  ):
        new[key] = d2[key]
    return new

% python
>>> from dicts import *
>>> d = {1: 1, 2: 2}
>>> e = copyDict(d)
>>> d[2] = '?'
>>> d
{1: 1, 2: '?'}
>>> e
{1: 1, 2: 2}

>>> x = {1: 1}
>>> y = {2: 2}
>>> z = addDict(x, y)
>>> z
{1: 1, 2: 2}

					  
   |6.  Write a function called addDict(dict1, dict2) that computes the union of two dictionaries. It should return a new dictionary containing all the items in both its arguments (which are assumed to be dictionaries). If the same key appears in both arguments, feel free to pick a value from either. Test your function by writing it in a file and running the file as a script. What happens if you pass lists instead of dictionaries? How could you generalize your function to handle this case, too? (Hint: see the type built-in function used earlier.) Does the order of the arguments passed in matter?

   |7.  More argument-matching examples. First, define the following six functions (either interactively or in a module file that can be imported):


          def f1(a, b): print a, b             # Normal args
          def f2(a, *b): print a, b            # Positional varargs

          def f3(a, **b): print a, b           # Keyword varargs

          def f4(a, *b, **c): print a, b, c    # Mixed modes

          def f5(a, b=2, c=3): print a, b, c   # Defaults

          def f6(a, b=2, *c): print a, b, c    # Defaults and positional varargs


      Now, test the following calls interactively, and try to explain each result; in some cases, you'll probably need to fall back on the matching algorithm shown in Chapter 16. Do you think mixing matching modes is a good idea in general? Can you think of cases where it would be useful?


          >>> f1(1, 2)
	1 2

          >>> f1(b=2, a=1)
	1 2

          >>> f2(1, 2, 3)
	1 (2, 3)

          >>> f3(1, x=2, y=3)
	1 {'y': 3, 'x': 2}

          >>> f4(1, 2, 3, x=2, y=3)
1 (2, 3) {'y': 3, 'x': 2}

          >>> f5(1)
1 2 3

          >>> f5(1, 4)
1 4 3

          >>> f6(1)
1 2 ()

          >>> f6(1, 3, 4)
1 3 (4,)

Textbook solution:
% python 
>>> f1(1, 2)  # Matched by position (order matters)
1 2
>>> f1(b=2, a=1)  # Matched by name (order doesn't matter)
1 2

>>> f2(1, 2, 3)  # Extra positionals collected in a tuple
1 (2, 3)

>>> f3(1, x=2, y=3)  # Extra keywords collected in a dictionary
1 {'x': 2, 'y': 3}

>>> f4(1, 2, 3, x=2, y=3)  # Extra of both kinds
1 (2, 3) {'x': 2, 'y': 3}

>>> f5(1)  # Both defaults kick in
1 2 3
>>> f5(1, 4)  # Only one default used
1 4 3

>>> f6(1)  # One argument: matches "a"
1 2 (  )
>>> f6(1, 3, 4)  # Extra positional collected
1 3 (4,)


   |8.  Primes revisited. Recall the following code snippet from Chapter 13, which simplistically determines whether a positive integer is prime:


          x = y / 2                            # For some y > 1
          while x > 1:
              if y % x == 0:                   # Remainder
                  print y, 'has factor', x
                  break                        # Skip else
              x = x−1
          else:                                # Normal exit
              print y, 'is prime'


      Package this code as a reusable function in a module file, and add some calls to the function at the bottom of your file. While you're at it, replace the first line's / operator with //, so it can handle floating-point numbers, too, and is immune to the true division change planned for the / operator in Python 3.0 (described in Chapter 5). What can you do about negatives, and the values 0 and 1? How about speeding this up? Your outputs should look something like this:


          13 is prime
          13.0 is prime
          15 has factor 5
          15.0 has factor 5.0

Textbook solution:
#from __future__ import division

def prime(y):
    if y <= 1:                                       # For some y > 1
        print y, 'not prime'
    else:
        x = y // 2                                   # Future / fails
        while x > 1:
            if y % x == 0:                           # No remainder?
                print y, 'has factor', x
                break                                # Skip else
            x -= 1
        else:
            print y, 'is prime'

prime(13); prime(13.0)
prime(15); prime(15.0)
prime(3);  prime(2)
prime(1);  prime(-3)


Here is the module in action; the // operator allows it to works for floating-point numbers too, even though it perhaps should not.


% python primes.py
13 is prime
13.0 is prime
15 has factor 5
15.0 has factor 5.0
3 is prime
2 is prime
1 not prime
-3 not prime


This function still isn't very reusable, yet—it could return values, instead of printing—but it's enough to run experiments. It's also not a strict mathematical prime (floating-points work), and is still inefficient. Improvements are left as exercises for more mathematically minded readers. Hint: a for loop over range(y, 1, −1) may be a bit quicker than the while (in fact, it's roughly twice as fast in 2.2), but the algorithm is the real bottleneck here. To time alternatives, use the built-in time module and coding patterns like those used in this general function-call timer (see the library manual for details):


def timer(reps, func, *args):
    import time
    start = time.clock(  )
    for i in xrange(reps):
        apply(func, args)
    return time.clock(  ) - start

   |9.  List comprehensions. Write code to build a new list containing the square roots of all the numbers in this list: [2, 4, 9, 16, 25]. Code this as a for loop first, then as a map call, and finally as a list comprehension. Use the sqrt function in the built-in math module to do the calculation (i.e., import math and say math.sqrt(x)). Of the three, which approach do you like best?

l=[2, 4, 9, 16, 25]
r=[]

-- As for loop
for e in l:
	r.append(e^2)
print r
>>> l=[2, 4, 9, 16, 25]
>>> r=[]
>>> for e in l:
...     r.append(e**2)
... 
>>> print r

-- as map
r = map(lambda x: x**2, l)
>>> r=[]
>>> print r
[]
>>> r = map(lambda x: x**2, l)
>>> print r

-- as list comprehension
r = [x**2 for x in l]
>>> print r
[4, 16, 81, 256, 625]

-- As generator
>>> r = (x**2 for x in l)
>>> print r
<generator object <genexpr> at 0x7ef4452c>
>>> r.next()
4
>>> r.next()
16
>>> r.next()
81
>>> r.next()
256
>>> r.next()
625
>>> r.next()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration

	Textbook solution:
>>> values = [2, 4, 9, 16, 25]
>>> import math

>>> res = []
>>> for x in values: res.append(math.sqrt(x))
...
>>> res
[1.4142135623730951, 2.0, 3.0, 4.0, 5.0]

>>> map(math.sqrt, values)
[1.4142135623730951, 2.0, 3.0, 4.0, 5.0]

>>> [math.sqrt(x) for x in values]
[1.4142135623730951, 2.0, 3.0, 4.0, 5.0]


	30.4. Modules


 	 	30.4.1. Modules: The Big Picture
This chapter begins our in-depth look at the Python module, the highest-level program organization unit, which packages program code and data for reuse. In concrete terms, modules usually correspond to Python program files (or extensions coded in external languages such as C, Java, or C#). Each file is a module, and modules import other modules to use the names they define. Modules are processed with two statements, and one important built-in function:


import 
    Lets a client (importer) fetch a module as a whole

from 
    Allows clients to fetch particular names from a module

reload 
    Provides a way to reload a module's code without stopping Python

Chapter 3 introduced module fundamentals, and we've been using them ever since. Part 5 begins by expanding on core module concepts, then moves on to explore more advanced module usage. This first chapter offers a general look at the role of modules in overall program structure. In the next and following chapters, we'll dig into the coding details behind the theory.

Along the way, we'll flesh out module details omitted so far: you'll learn about reloads, the __name__ and __all__ attributes, package imports, and so on. Because modules and classes are really just glorified namespaces, we'll formalize namespace concepts here as well.

			30.4.1.1 Why Use Modules?

In short, modules provide an easy way to organize components into a system by serving as self-contained packages of variables known as namespaces. All the names defined at the top level of a module file become attributes of the imported module object. As we saw in the last part of this book, imports give access to names in a module's global scope. That is, the module file's global scope morphs into the module object's attribute namespace when it is imported. Ultimately, Python's modules allow us to link individual files into a larger program system.

More specifically, from an abstract perspective, modules have at least three roles:


Code reuse

    As discussed in Chapter 3, modules let you save code in files permanently. Unlike code you type at the Python interactive prompt, which goes away when you exit Python, code in module files is persistent—it can be reloaded and rerun as many times as needed. More to the point, modules are a place to define names, known as attributes, that may be referenced by multiple external clients.

System namespace partitioning

    Modules are also the highest-level program organization unit in Python. Fundamentally, they are just packages of names. Modules seal up names into self-contained packages, which helps avoid name clashes—you can never see a name in another file, unless you explicitly import that file. In fact, everything "lives" in a module—code you execute and objects you create—are always implicitly enclosed in modules. Because of that, modules are natural tools for grouping system components.

Implementing shared services or data

    From an operational perspective, modules also come in handy for implementing components that are shared across a system, and hence require only a single copy. For instance, if you need to provide a global object that's used by more than one function or file, you can code it in a module that can then be imported by many clients.

For you to truly understand the role of modules in a Python system, though, we need to digress for a moment, and explore the general structure of a Python program.

			30.4.1.2 Python Program Architecture

So far in this book, I've sugarcoated some of the complexity in my descriptions of Python programs. In practice, programs usually involve more than just one file; for all but the simplest scripts, your programs will take the form of multifile systems. And even if you can get by with coding a single file yourself, you will almost certainly wind up using external files that someone else has already written.

This section introduces the general architecture of Python programs—the way you divide a program into a collection of source files (a.k.a. modules) and link the parts into a whole. Along the way, we'll also explore the central concepts of Python modules, imports, and object attributes.


				30.4.1.2.1 How to Structure a Program

Generally, a Python program consists of multiple text files containing Python statements. The program is structured as one main, top-level file, along with zero or more supplemental files known as modules in Python.

In Python, the top-level file contains the main flow of control of your program—this is the file you run to launch your application. The module files are libraries of tools used to collect components used by the top-level file (and possibly elsewhere). Top-level files use tools defined in module files, and modules use tools defined in other modules.

Module files generally don't do anything when run directly; rather, they define tools intended for use in other files. In Python, a file imports a module to gain access to the tools it defines, which are known as its attributes (i.e., variable names attached to objects such as functions). Ultimately, we import modules and access their attributes to use their tools.

				30.4.1.2.2 Imports and Attributes

Let's make this a bit more concrete. Figure 18-1 sketches the structure of a Python program composed of three files: a.py, b.py, and c.py. The file a.py is chosen to be the top-level file; it will be a simple text file of statements, which is executed from top to bottom when launched. The files b.py and c.py are modules; they are simple text files of statements as well, but they are not usually launched directly. Instead, as explained previously, modules are normally imported by other files that wish to use the tools they define.

Figure 18-1. Program architecture in Python. A program is a system of modules. It has one top-level script file (launched to run the program), and multiple module files (imported libraries of tools). Scripts and modules are both text files containing Python statements, though the statements in modules usually just create objects to be used later. Python's standard library provides a collection of precoded modules.


For instance, suppose the file b.py in Figure 18-1 defines a function called spam, for external use. As we learned in Part 4, b.py will contain a Python def statement to generate the function, which can later be run by passing zero or more values in parentheses after the function's name:


def spam(text):
    print text, 'spam'


Now, suppose a.py wants to use spam. To this end, it might contain Python statements such as the following:


import b
b.spam('gumby')


The first of these, a Python import statement, gives the file a.py access to everything defined by top-level code in the file b.py. It roughly means "load the file b.py (unless it's already loaded), and give me access to all its attributes through the name b." import (and, as you'll see later, from) statements execute and load other files at runtime.

In Python, cross-file module linking is not resolved until such import statements are executed at runtime; their net effect is to assign module names—simple variables—to loaded module objects. In fact, the module name used in an import statement serves two purposes: it identifies the external file to be loaded, but it also becomes a variable assigned to the loaded module. Objects defined by a module are also created at runtime, as the import is executing: import literally runs statements in the target file one at a time to create its contents.

The second of the statements in a.py calls the function spam defined in the module b, using object attribute notation. The code b.spam means "fetch the value of the name spam that lives within the object b." This happens to be a callable function in our example, so we pass a string in parentheses ('gumby'). If you actually type these files, save them, and run a.py, the words "gumby spam" will be printed.

You'll see the object.attribute notation used throughout Python scripts—most objects have useful attributes that are fetched with the "." operator. Some are callable things like functions, and others are simple data values that give object properties (e.g., a person's name).

The notion of importing is also completely general throughout Python. Any file can import tools from any other file. For instance, the file a.py may import b.py to call its function, but b.py might also import c.py to leverage different tools defined there. Import chains can go as deep as you like: in this example, the module a can import b, which can import c, which can import b again, and so on.

Besides serving as the highest organizational structure, modules (and module packages, described in Chapter 20) are also the highest level of code reuse in Python. Coding components in module files makes them useful in your original program, and in any other programs you may write. For instance, if after coding the program in Figure 18-1 we discover that the function b.spam is a general-purpose tool, we can reuse it in a completely different program; all we have to do is import the file b.py again from the other program's files.


				30.4.1.2.3 Standard Library Modules

Notice the rightmost portion of Figure 18-1. Some of the modules that your programs will import are provided by Python itself, and are not files you will code.

Python automatically comes with a large collection of utility modules known as the standard library. This collection, roughly 200 modules large at last count, contains platform-independent support for common programming tasks: operating system interfaces, object persistence, text pattern matching, network and Internet scripting, GUI construction, and much more. None of these tools are part of the Python language itself, but you can use them by importing the appropriate modules on any standard Python installation. Because they are standard library modules, you can also be reasonably sure that they will be available, and will work portably on most platforms on which you will run Python.

You will see a few of the standard library modules in action in this book's examples, but for a complete look, you should browse the standard Python library reference manual, available either with your Python installation (via IDLE or the Python Start button menu on Windows), or online at http://www.python.org.

Because there are so many modules, this is really the only way to get a feel for what tools are available. You can also find tutorials on Python library tools in commercial books that cover application-level programming, such as Programming Python, but the manuals are free, viewable in any web browser (they ship in HTML format), and updated each time Python is rereleased.

			30.4.1.3 How Imports Work

The prior section talked about importing modules without really explaining what happens when you do so. Because imports are at the heart of program structure in Python, this section goes into more detail on the import operation to make this process less abstract.

Some C programmers like to compare the Python module import operation to a C #include, but they really shouldn't—in Python, imports are not just textual insertions of one file into another. They are really runtime operations that perform three distinct steps the first time a program imports a given file:

   |1.  Find the module's file.
   |2.  Compile it to byte code (if needed).
   |3.  Run the module's code to build the objects it defines.


To better understand module imports, we'll explore these steps in turn. Bear in mind that all three of these steps are carried out only the first time a module is imported during a program's execution; later imports of the same module bypass all of these steps, and simply fetch the already loaded module object in memory.

				30.4.1.3.1 1. Find It

First off, Python must locate the module file referenced by an import statement. Notice that the import statement in the prior section's example names the file without a .py suffix and without its directory path: it just says import b, instead of something like import c:\dir1\b.py. In fact, you can only list a simple name; path and suffix details are omitted on purpose, as Python uses a standard module search path to locate the module file corresponding to an import statement.[50] Because this is the main part of the import operation that programmers must know about, let's study this step in more detail.

    [50] * It's actually syntactically illegal to include path and suffix details in a standard import. Package imports, which we'll discuss in Chapter 20, allow import statements to include part of the directory path leading to a file as a set of period-separated names; however, package imports still rely on the normal module search path to locate the leftmost directory in a package path (i.e., they are relative to a directory in the search path). They also cannot make use of any platform-specific directory syntax in the import statements; such syntax only works on the search path. Also, note that module file search path issues are not as relevant when you run frozen executables (discussed in Chapter 2); they typically embed byte code in the binary image.

					30.4.1.3.1.1 The module search path

In many cases, you can rely on the automatic nature of the module import search path, and need not configure this path at all. If you want to be able to import files across user-defined directory boundaries, though, you will need to know how the search path works in order to customize it. Roughly, Python's module search path is composed of the concatenation of these major components, some of which are preset for you, and some of which you can tailor to tell Python where to look:

   |1.  The home directory of the program.
   |2.  PYTHONPATH directories (if set).
   |3.  Standard library directories.
   |4.  The contents of any .pth files (if present).


Ultimately, the concatenation of these four components becomes sys.path, a list of directory name strings that I'll expand upon in the next section. The first and third elements of the search path are defined automatically, but because Python searches the concatenation of these components from first to last, the second and fourth elements can be used to extend the path to include your own source code directories. Here is how Python uses each of these path components:


Home directory

    Python first looks for the imported file in the home directory. Depending on how you are launching code, this is either the directory containing your program's top-level file, or the directory in which you are working interactively. Because this directory is always searched first, if a program is located entirely in a single directory, all of its imports will work automatically with no path configuration required.

PYTHONPATH directories

    Next, Python searches all directories listed in your PYTHONPATH environment variable setting, from left to right (assuming you have set this at all). In brief, PYTHONPATH is simply set to a list of user-defined and platform-specific names of directories that contain Python code files. You can add all the directories from which you wish to be able to import, and Python will use your setting to extend the module search path.

    Because Python searches the home directory first, this setting is only important when importing files across directory boundaries—that is, if you need to import a file that is stored in a different directory from the file that imports it. You'll probably want to set your PYTHONPATH variable once you start writing substantial programs, but when you're first starting out, as long as you save all your module files in the directory in which you're working (i.e., the home directory), your imports will work without you needing to worry about this setting at all.

Standard library directories

    Next, Python automatically searches the directories where the standard library modules are installed on your machine. Because these are always searched, they normally do not need to be added to your PYTHONPATH.

.pth file directories

    Finally, a relatively new feature of Python allows users to add valid directories to the module search path by simply listing them, one per line, in a text file whose name ends with a .pth suffix (for "path"). These path configuration files are a somewhat advanced installation-related feature, and we will not discuss them fully here.

    In short, a text file of directory names dropped in an appropriate directory can serve roughly the same role as the PYTHONPATH environment variable setting. For instance, a file named myconfig.pth may be placed at the top level of the Python install directory on Windows (e.g., in C:\Python25 or C:\Python25\Lib\site-packages) to extend the module search path. Python will add the directories listed on each line of the file, from first to last, near the end of the module search path list. Because they are files rather than shell settings, path files can apply to all users of an installation, instead of just one user or shell.

    This feature is more sophisticated than I've described here. For more details, see the Python library manual (especially its documentation for the standard library module site). I recommend that beginners use PYTHONPATH or a single .pth file, and then only if you must import across directories. See also Appendix A for examples of common ways to extend your module search path with PYTHONPATH or .pth files on various platforms.

This description of the module search path is accurate, but generic; the exact configuration of the search path is prone to changing across platforms and Python releases. Depending on your platform, additional directories may automatically be added to the module search path as well.

For instance, Python may add an entry for the current working directory—the directory from which you launched your program—in the search path after the PYTHONPATH directories, and before the standard library entries. When launching from a command line, the current working directory may not be the same as the home directory of your top-level file (i.e., the directory where your program file resides).[51] Because the current working directory can vary each time your program runs, you normally shouldn't depend on its value for import purposes.[52]

    [51] * See Chapter 3 for more on launching programs from command lines.

    [52] † See also Chapter 21's discussion of the new relative import syntax in Python 2.5; this modifies the search path for from statements when "." characters are used (e.g., from . import string).

					30.4.1.3.1.2 The sys.path list

If you want to see how the module search path is truly configured on your machine, you can always inspect the path as Python knows it by printing the built-in sys.path list (that is, the path attribute of the standard library module sys). This list of directory name strings is the actual search path within Python; on imports, Python searches each directory in this list from left to right.

Really, sys.path is the module search path. Python configures it at program startup, automatically merging any PYTHONPATH and .pth file path settings you've made into the list, and setting the first entry to identify the home directory of the top-level file (possibly as an empty string).

Python exposes this list for two good reasons. First, it provides a way to verify the search path settings you've made—if you don't see your settings somewhere in this list, you need to recheck your work. Second, if you know what you're doing, this list also provides a way for scripts to tailor their search paths manually. As you'll see later in this part of the book, by modifying the sys.path list, you can modify the search path for all future imports. Such changes only last for the duration of the script, however; PYTHONPATH and .pth files offer more permanent ways to modify the path.[53]

    [53] ‡ Some programs really need to change sys.path, though. Scripts that run on web servers, for example, usually run as the user "nobody" to limit machine access. Because such scripts cannot usually depend on "nobody" to have set PYTHONPATH in any particular way, they often set sys.path manually to include required source directories, prior to running any import statements. A sys.path.append(dirname) will often suffice.

>>> import sys
>>> print sys.path
['', '/usr/lib/python26.zip', '/usr/lib/python2.6', '/usr/lib/python2.6/plat-cygwin', '/usr/lib/python2.6/lib-tk', '/usr/lib/python2.6/lib-old', '/usr/lib/python2.6/lib-dynload', '/usr/lib/python2.6/site-packages', '/usr/lib/python2.6/site-packages/gtk-2.0']

					30.4.1.3.1.3 Module file selection

Keep in mind that filename suffixes (e.g., .py) are intentionally omitted from import statements. Python chooses the first file it can find on the search path that matches the imported name. For example, an import statement of the form import b might load:

    * A source code file named b.py.
    * A byte code file named b.pyc.
    * A directory named b, for package imports (described in Chapter 20).
    * A compiled extension module, usually coded in C or C++, and dynamically linked when imported (e.g., b.so on Linux, or b.dll or b.pyd on Cygwin and Windows).
    * A compiled built-in module coded in C and statically linked into Python.
    * A ZIP file component that is automatically extracted when imported.
    * An in-memory image, for frozen executables.
    * A Java class, in the Jython version of Python.
    * A .NET component, in the IronPython version of Python.

C extensions, Jython, and package imports all extend imports beyond simple files. To importers, though, differences in the loaded file type are completely transparent, both when importing and when fetching module attributes. Saying import b gets whatever module b is, according to your module search path, and b.attr fetches an item in the module, be it a Python variable or a linked-in C function. Some standard modules we will use in this book are actually coded in C, not Python; because of this transparency, their clients don't have to care.

If you have both a b.py and a b.so in different directories, Python will always load the one found in the first (leftmost) directory of your module search path during the left-to-right search of sys.path. But what happens if it finds both a b.py and a b.so in the same directory? In this case, Python follows a standard picking order, though this order is not guaranteed to stay the same over time. In general, you should not depend on which type of file Python will choose within a given directory—make your module names distinct, or configure your module search path to make your module selection preferences more obvious.

					30.4.1.3.1.4 Advanced module selection concepts

Normally, imports work as described in this section—they find and load files on your machine. However, it is possible to redefine much of what an import operation does in Python, using what are known as import hooks. These hooks can be used to make imports do various useful things, such as loading files from archives, performing decryption, and so on. In fact, Python itself uses these hooks to enable files to be directly imported from ZIP archives—the archived files are automatically extracted at import time when a .zip file is selected in the import search path. For more details, see the Python standard library manual's description of the built-in __import__ function, the customizable tool that import statements actually run.

Python also supports the notion of .pyo optimized byte code files, created and run with the -O Python command-line flag; because these run only slightly faster than normal .pyc files (typically 5 percent faster), however, they are infrequently used. The Psyco system (see Chapter 2) provides more substantial speedups.

				30.4.1.3.2 2. Compile It (Maybe)

After finding a source code file that matches an import statement by traversing the module search path, Python next compiles it to byte code, if necessary. (We discussed byte code in Chapter 2.)

Python checks the file timestamps and skips the source-to-byte-code compile step if it finds a .pyc byte code file that is not older than the corresponding .py source file. In addition, if Python finds only a byte code file on the search path and no source, it simply loads the byte code directly. In other words, the compile step is bypassed if possible to speed program startup. If you change the source code, Python will automatically regenerate the byte code the next time your program is run. Moreover, you can ship a program as just byte code files, and avoid sending source.

Notice that compilation happens when a file is being imported. Because of this, you will not usually see a .pyc byte code file for the top-level file of your program, unless it is also imported elsewhere—only imported files leave behind a .pyc on your machine. The byte code of top-level files is used internally and discarded; byte code of imported files is saved in files to speed future imports.

Top-level files are often designed to be executed directly and not imported at all. Later, we'll see that it is possible to design a file that serves both as the top-level code of a program, and as a module of tools to be imported. Such a file may be both executed and imported, and thus does generate a .pyc. To learn how this works, watch for the discussion of the special __name__ attribute and __main__ in Chapter 21.

				30.4.1.3.3 3. Run It

The final step of an import operation executes the byte code of the module. All statements in the file are executed in turn, from top to bottom, and any assignments made to names during this step generate attributes of the resulting module object. This execution step therefore generates all the tools that the module's code defines. For instance, def statements in a file are run at import time to create functions and assign attributes within the module to those functions. The functions can then be called later in the program by the file's importers.

Because this last import step actually runs the file's code, if any top-level code in a module file does real work, you'll see its results at import time. For example, top-level print statements in a module show output when the file is imported. Function def statements simply define objects for later use.

As you can see, import operations involve quite a bit of work—they search for files, possibly run a compiler, and run Python code. Because of this, any given module is imported only once per process by default. Future imports skip all three import steps and reuse the already loaded module in memory.[54] If you need to import a file again after it has already been loaded (for example, to support end-user customization), you have to force the issue with a reload call—a tool we'll meet in the next chapter.

    [54] * Technically, Python keeps already loaded modules in the built-in sys.modules dictionary, which it checks at the start of an import operation to determine whether the referenced module is already loaded. If you want to see which modules are loaded, import sys and print sys.modules.keys( ). More on this internal table in Chapter 21.

Third-Party Software: distutils

This chapter's description of module search path settings is targeted mainly at user-defined source code that you write on your own. Third-party extensions for Python typically use the distutils tools in the standard library to automatically install themselves, so no path configuration is required to use their code.

Systems that use distutils generally come with a setup.py script, which is run to install them; this script imports and uses distutils modules to place such systems in a directory that is automatically part of the module search path (usually in the Lib\site-packages subdirectory of the Python install tree, wherever that resides on the target machine).

For more details on distributing and installing with distutils, see the Python standard manual set; its use is beyond the scope of this book (for instance, it also provides ways to automatically compile C-coded extensions on the target machine). Also, see the emerging third-party open source eggs system, which adds dependency checking for installed Python software.

			30.4.1.4 Summary 
			In this chapter, we covered the basics of modules, attributes, and imports, and explored the operation of import statements. We learned that imports find the designated file on the module search path, compile it to byte code, and execute all of its statements to generate its contents. We also learned how to configure the search path to be able to import from other directories than the home directory and the standard library directories, primarily with PYTHONPATH settings.

As this chapter demonstrated, the import operation and modules are at the heart of program architecture in Python. Larger programs are divided into multiple files, which are linked together at runtime by imports. Imports in turn use the module search path to locate files, and modules define attributes for external use.

Of course, the whole point of imports and modules is to provide a structure to your program, which divides its logic into self-contained software components. Code in one module is isolated from code in another; in fact, no file can ever see the names defined in another, unless explicit import statements are run. Because of this, modules minimize name collisions between different parts of your program.

You'll see what this all means in terms of actual code in the next chapter. Before we move on, though, let's run through the chapter quiz.

BRAIN BUILDER

Chapter Quiz

Q:	How does a module source code file become a module object?
Q:	Why might you have to set your PYTHONPATH environment variable?
Q:	Name the four major components of the module import search path.
Q:	Name four file types that Python might load in response to an import operation.
Q:	What is a namespace, and what does a module's namespace contain?


Quiz Answers

A:	A module's source code file automatically becomes a module object when that module is imported. Technically, the module's source code is run during the import, one statement at a time, and all the names assigned in the process become attributes of the module object.
A:	You only need to set PYTHONPATH to import from directories other than the one in which you are working (i.e., the current directory when working interactively, or the directory containing your top-level file).
A:	The four major components of the module import search path are the top-level script's home directory (the directory containing it), all directories listed in the PYTHONPATH environment variable, standard library directories, and all directories in .pth path files located in standard places. Of these, programmers can customize PYTHONPATH and .pth files.
A:	Python might load a source code (.py) file, a byte code (.pyc) file, a C extension module (e.g., a .so file on Linux or a .dll or .pyd file on Windows), or a directory of the same name for package imports. Imports may also load more exotic things such as ZIP file components, Java classes under the Jython version of Python, .NET components under IronPython, and statically linked C extensions that have no files present at all. With import hooks, imports can load anything.
A:	A namespace is a self-contained package of variables, which are known as the attributes of the namespace object. A module's namespace contains all the names assigned by code at the top level of the module file (i.e., not nested in def or class statements). Technically, a module's global scope morphs into the module object's attributes namespace. A module's namespace may also be altered by assignments from other files that import it, though this is frowned upon (see Chapter 16 for more on this).

 	 	30.4.2. Module Coding Basics

			Now that we've looked at the larger ideas behind modules, let's turn to a simple example of modules in action. Python modules are easy to create; they're just files of Python program code created with a text editor. You don't need to write special syntax to tell Python you're making a module; almost any text file will do. Because Python handles all the details of finding and loading modules, modules are also easy to use; clients simply import a module, or specific names a module defines, and use the objects they reference.
			30.4.2.1 Module Creation

To define a module, simply use your text editor to type some Python code into a text file, and save it with a ".py" extension; any such file is automatically considered a Python module. All the names assigned at the top level of the module become its attributes (names associated with the module object), and are exported for clients to use.

For instance, if you type the following def into a file called module1.py and import it, you create a module object with one attribute—the name printer, which happens to be a reference to a function object:


def printer(x):                   # Module attribute
    print x


Before we go on, I should say a few more words about module filenames. You can call modules just about anything you like, but module filenames should end in a .py suffix if you plan to import them. The .py is technically optional for top-level files that will be run but not imported, but adding it in all cases makes your files' types more obvious and allows you to import any of your files in the future.

Because module names become variable names inside a Python program (without the .py), they should also follow the normal variable name rules outlined in Chapter 11. For instance, you can create a module file named if.py, but you cannot import it because if is a reserved word—when you try to run import if, you'll get a syntax error. In fact, both the names of module files and the names of directories used in package imports (discussed in the next chapter) must conform to the rules for variable names presented in Chapter 11; they may, for instance, contain only letters, digits, and underscores. Package directories also cannot contain platform-specific syntax such as spaces in their names.

When a module is imported, Python maps the internal module name to an external filename by adding directory paths in the module search path to the front, and a .py or other extension at the end. For instance, a module named M ultimately maps to some external file <directory>\M.<extension> that contains the module's code.

As mentioned in the preceding chapter, it is also possible to create a Python module by writing code in an external language such as C or C++ (or Java, in the Jython implementation of the language). Such modules are called extension modules, and they are generally used to wrap up external libraries for use in Python scripts. When imported by Python code, extension modules look and feel the same as modules coded as Python source code files—they are accessed with import statements, and provide functions and objects as module attributes. Extension modules are beyond the scope of this book; see Python's standard manuals, or advanced texts such as Programming Python for more details.

			30.4.2.2 Module Usage

Clients can use the simple module file we just wrote by running import or from statements. Both statements find, compile, and run a module file's code, if it hasn't yet been loaded. The chief difference is that import fetches the module as a whole, so you must qualify to fetch its names; in contrast, from fetches (or copies) specific names out of the module.

Let's see what this means in terms of code. All of the following examples wind up calling the printer function defined in the external module file module1.py, but in different ways.

				30.4.2.2.1 The import Statement

In the first example, the name module1 serves two different purposes—it identifies an external file to be loaded, and it becomes a variable in the script, which references the module object after the file is loaded:


>>> import module1  # Get module as a whole
>>> module1.printer('Hello world!')  # Qualify to get names
Hello world!


Because import gives a name that refers to the whole module object, we must go through the module name to fetch its attributes (e.g., module1.printer).

				30.4.2.2.2 The from statement

By contrast, because from also copies names from one file over to another scope, it allows us to use the copied names directly in the script without going through the module (e.g., printer):


>>> from module1 import printer  # Copy out one variable
>>> printer('Hello world!')  # No need to qualify name
Hello world!


This has the same effect as the prior example, but because the imported name is copied into the scope where the from statement appears, using that name in the script requires less typing: we can use it directly instead of naming the enclosing module.

As you'll see in more detail later, the from statement is really just a minor extension to the import statement—it imports the module file as usual, but adds an extra step that copies one or more names out of the file.

				30.4.2.2.3 The from * Statement

Finally, the next example uses a special form of from: when we use a *, we get copies of all the names assigned at the top level of the referenced module. Here again, we can then use the copied name printer in our script without going through the module name:


>>> from module1 import *  # Copy out all variables
>>> printer('Hello world!') 
Hello world!


Technically, both import and from statements invoke the same import operation; the from * form simply adds an extra step that copies all the names in the module into the importing scope. It essentially collapses one module's namespace into another; again, the net effect is less typing for us.

And that's it—modules really are simple to use. To give you a better understanding of what really happens when you define and use modules, though, let's move on to look at some of their properties in more detail.


				30.4.2.2.4 Imports Happen Only Once

One of the most common questions beginners seem to ask when using modules is, "Why won't my imports keep working?" They often report that the first import works fine, but later imports during an interactive session (or program run) seem to have no effect. In fact, they're not supposed to, and here's why.

Modules are loaded and run on the first import or from, and only the first. This is on purpose—because this is an expensive operation, by default, Python does it just once per file, per process. Later import operations simply fetch the already loaded module object.

As one consequence, because top-level code in a module file is usually executed only once, you can use it to initialize variables. Consider the file simple.py, for example:


print 'hello'
spam = 1                   # Initialize variable


In this example, the print and = statements run the first time the module is imported, and the variable spam is initialized at import time:


% python 
>>> import simple  # First import: loads and runs file's code
hello
>>> simple.spam  # Assignment makes an attribute
1


Second and later imports don't rerun the module's code; they just fetch the already created module object from Python's internal modules table. Thus, the variable spam is not reinitialized:


>>> simple.spam = 2  # Change attribute in module
>>> import simple  # Just fetches already loaded module
>>> simple.spam  # Code wasn't rerun: attribute unchanged
2


Of course, sometimes you really want a module's code to be rerun on a subsequent import. We'll see how to do this with the reload built-in function later in this chapter.

				30.4.2.2.5 import and from Are Assignments

Just like def, import and from are executable statements, not compile-time declarations. They may be nested in if tests, appear in function defs, and so on, and they are not resolved or run until Python reaches them while executing your program. In other words, imported modules and names are not available until their associated import or from statements run. Also, like def, import and from are implicit assignments:

    * import assigns an entire module object to a single name.
    * from assigns one or more names to objects of the same names in another module.

All the things we've already discussed about assignment apply to module access, too. For instance, names copied with a from become references to shared objects; as with function arguments, reassigning a fetched name has no effect on the module from which it was copied, but changing a fetched mutable object can change it in the module from which it was imported. To illustrate, consider the following file, small.py:


x = 1
y = [1, 2]

% python 
>>> from small import x, y  # Copy two names out
>>> x = 42  # Changes local x only
>>> y[0] = 42  # Changes shared mutable in-place


Here, x is not a shared mutable object, but y is. The name y in the importer and the importee reference the same list object, so changing it from one place changes it in the other:


>>> import small  # Get module name (from doesn't)
>>> small.x  # Small's x is not my x
1
>>> small.y  # But we share a changed mutable
[42, 2]


For a graphical picture of what from assignments do with references, flip back to Figure 16-2 (function argument passing), and mentally replace "caller" and "function" with "imported" and "importer." The effect is the same, except that here we're dealing with names in modules, not functions. Assignment works the same everywhere in Python.

				30.4.2.2.6 Cross-File Name Changes

Recall from the prior example that the assignment to x in the interactive session changed the name x in that scope only, not the x in the file—there is no link from a name copied with from back to the file it came from. To really change a global name in another file, you must use import:


% python 
>>> from small import x, y  # Copy two names out
>>> x = 42  # Changes my x only

>>> import small  # Get module name
>>> small.x = 42  # Changes x in other module


This phenomenon was introduced in Chapter 16. Because changing variables in other modules like this is a common source of confusion (and often a bad design choice), we'll revisit this technique again later in this part of the book. Note that the change to y[0] in the prior session is different; it changes an object, not a name.

				30.4.2.2.7 import and from Equivalence

Notice in the prior example that we have to execute an import statement after the from to access the small module name at all; from only copies names from one module to another, and does not assign the module name itself. At least conceptually, a from statement like this one:


from module import name1, name2     # Copy these two names out (only)


is equivalent to this statement sequence:


import module                       # Fetch the module object
name1 = module.name1                # Copy names out by assignment
name2 = module.name2
del module                          # Get rid of the module name


Like all assignments, the from statement creates new variables in the importer, which initially refer to objects of the same names in the imported file. Only the names are copied out, though, not the module itself. When we use the from * form of this statement (from module import *), the equivalence is the same, but all the top-level names in the module are copied over to the importing scope this way.

Notice that the first step of the from runs a normal import operation. Because of this, the from always imports the entire module into memory if it has not yet been imported, regardless of how many names it copies out of the file. There is no way to load just part of a module file (e.g., just one function), but because modules are byte code in Python instead of machine code, the performance implications are generally negligible.

				30.4.2.2.8 Potential Pitfalls of the from Statement

Because the from statement makes the location of a variable more implicit and obscure (name is less meaningful to the reader than module.name), some Python users recommend using import instead of from most of the time. I'm not sure this advice is warranted, though; from is commonly and widely used, without too many dire consequences. In practice, in realistic programs, it's often convenient not to have to type a module's name every time you wish to use one of its tools. This is especially true for large modules that provide many attributes—the standard library's Tkinter GUI module, for example.

It is true that the from statement has the potential to corrupt namespaces, at least in principle—if you use it to import variables that happen to have the same names as existing variables in your scope, your variables will be silently overwritten. This problem doesn't occur with the simple import statement because you must always go through a module's name to get to its contents (module.attr will not clash with a variable named attr in your scope). As long as you understand and expect that this can happen when using from, though, this isn't a major concern in practice, especially if you list the imported names explicitly (e.g., from module import x, y, z).

On the other hand, the from statement has more serious issues when used in conjunction with the reload call, as imported names might reference prior versions of objects. Moreover, the from module import * form really can corrupt namespaces and make names difficult to understand, especially when applied to more than one file—in this case, there is no way to tell which module a name came from, short of searching the external source files. In effect, the from * form collapses one namespace into another, and so defeats the namespace partitioning feature of modules. We will explore these issues in more detail in the "Section 21.8" section at the end of this part of the book (see Chapter 21).

Probably the best real-world advice here is to generally prefer import to from for simple modules, to explicitly list the variables you want in most from statements, and to limit the from * form to just one import per file. That way, any undefined names can be assumed to live in the module referenced with the from *. Some care is required when using the from statement, but armed with a little knowledge, most programmers find it to be a convenient way to access modules.

					30.4.2.2.8.1 When import is required

The only time you really must use import instead of from is when you must use the same name defined in two different modules. For example, if two files define the same name differently:


# M.py

def func(  ):
    ...do something...

# N.py

def func(  ):
    ...do something else...


and you must use both versions of the name in your program, the from statement will fail—you can only have one assignment to the name in your scope:


# O.py

from M import func
from N import func        # This overwites the one we got from M
func(  )                  # Calls N.func only


An import will work here, though, because including the name of the enclosing module makes the two names unique:


# O.py

import M, N                # Get the whole modules, not their names
M.func(  )                 # We can call both names now
N.func(  )                 # The module names make them unique


This case is unusual enough that you're unlikely to encounter it very often in practice.

			30.4.2.3 Module Namespaces

Modules are probably best understood as simply packages of names—i.e., places to define names you want to make visible to the rest of a system. Technically, modules usually correspond to files, and Python creates a module object to contain all the names assigned in a module file. But, in simple terms, modules are just namespaces (places where names are created), and the names that live in a module are called its attributes. We'll explore how all this works in this section.

				30.4.2.3.1 Files Generate Namespaces

So, how do files morph into namespaces? The short story is that every name that is assigned a value at the top level of a module file (i.e., not nested in a function or class body) becomes an attribute of that module.

For instance, given an assignment statement such as X = 1 at the top level of a module file M.py, the name X becomes an attribute of M, which we can refer to from outside the module as M.X. The name X also becomes a global variable to other code inside M.py, but we need to explain the notion of module loading and scopes a bit more formally to understand why:

    * Module statements run on the first import. The first time a module is imported anywhere in a system, Python creates an empty module object, and executes the statements in the module file one after another, from the top of the file to the bottom.
    * Top-level assignments create module attributes. During an import, statements at the top level of the file not nested in a def or class that assign names (e.g., =, def) create attributes of the module object; assigned names are stored in the module's namespace.
    * Module namespaces can be accessed via the attribute __dict__ or dir(M). Module namespaces created by imports are dictionaries; they may be accessed through the built-in __dict__ attribute associated with module objects and may be inspected with the dir function. The dir function is roughly equivalent to the sorted keys list of an object's __dict__ attribute, but it includes inherited names for classes, may not be complete, and is prone to changing from release to release.
    * Modules are a single scope (local is global). As we saw in Chapter 16, names at the top level of a module follow the same reference/assignment rules as names in a function, but the local and global scopes are the same (more formally, they follow the LEGB scope rule we met in Chapter 16, but without the L and E lookup layers). But, in modules, the module scope becomes an attribute dictionary of a module object after the module has been loaded. Unlike with functions (where the local namespace exists only while the function runs), a module file's scope becomes a module object's attribute namespace and lives on after the import.

Here's a demonstration of these ideas. Suppose we create the following module file in a text editor and call it module2.py:


print 'starting to load...'
import sys
name = 42

def func(  ): pass

class klass: pass

print 'done loading.'


The first time this module is imported (or run as a program), Python executes its statements from top to bottom. Some statements create names in the module's namespace as a side effect, but others may do actual work while the import is going on. For instance, the two print statements in this file execute at import time:


>>> import module2
starting to load...
done loading.


But once the module is loaded, its scope becomes an attribute namespace in the module object we get back from import. We can then access attributes in this namespace by qualifying them with the name of the enclosing module:


>>> module2.sys
<module 'sys' (built-in)>

>>> module2.name
42

>>> module2.func
<function func at 0x012B1830>

>>> module2.klass
<class module2.klass at 0x011C0BA0>


Here, sys, name, func, and klass were all assigned while the module's statements were being run, so they are attributes after the import. We'll talk about classes in Part 6, but notice the sys attribute—import statements really assign module objects to names, and any type of assignment to a name at the top level of a file generates a module attribute.

Internally, module namespaces are stored as dictionary objects. These are just normal dictionary objects with the usual methods. We can access a module's namespace dictionary through the module's __dict__ attribute:


>>> module2.__dict__.keys(  )
['__file__', 'name', '__name__', 'sys', '__doc__', '__builtins__',
'klass', 'func']


The names we assigned in the module file become dictionary keys internally, so most of the names here reflect top-level assignments in our file. However, Python also adds some names in the module's namespace for us; for instance, __file__ gives the name of the file the module was loaded from, and __name__ gives its name as known to importers (without the .py extension and directory path).

				30.4.2.3.2 Attribute Name Qualification

Now that you're becoming more familiar with modules, we should look at the notion of name qualification in more depth. In Python, you can access the attributes of any object that has attributes using the qualification syntax object.attribute.

Qualification is really an expression that returns the value assigned to an attribute name associated with an object. For example, the expression module2.sys in the previous example fetches the value assigned to sys in module2. Similarly, if we have a built-in list object L, L.append returns the append method object associated with that list.

So, what does attribute qualification do to the scope rules we studied in Chapter 16? Nothing, really: it's an independent concept. When you use qualification to access names, you give Python an explicit object from which to fetch the specified names. The LEGB rule applies only to bare, unqualified names. Here are the rules:


Simple variables 
    X means search for the name X in the current scopes (following the LEGB rule).

Qualification 
    X.Y means find X in the current scopes, then search for the attribute Y in the object X (not in scopes).

Qualification paths 
    X.Y.Z means look up the name Y in the object X, then look up Z in the object X.Y.

Generality 
    Qualification works on all objects with attributes: modules, classes, C extension types, etc.

In Part 6, we'll see that qualification means a bit more for classes (it's also the place where something called inheritance happens), but, in general, the rules outlined here apply to all names in Python.

				30.4.2.3.3 Imports Versus Scopes

As we've learned, it is never possible to access names defined in another module file without first importing that file. That is, you never automatically get to see names in another file, regardless of the structure of imports or function calls in your program. A variable's meaning is always determined by the locations of assignments in your source code, and attributes are always requested of an object explicitly.

For example, consider the following two simple modules. The first, moda.py, defines a variable X global to code in its file only, along with a function that changes the global X in this file:


X = 88                        # My X: global to this file only
def f(  ):
    global X                  # Change this file's X
    X = 99                    # Cannot see names in other modules


The second module, modb.py, defines its own global variable X, and imports and calls the function in the first module:


X = 11                         # My X: global to this file only
import moda                   # Gain access to names in moda
moda.f(  )                         # Sets moda.X, not this file's X
print X, moda.X


When run, moda.f changes the X in moda, not the X in modb. The global scope for moda.f is always the file enclosing it, regardless of which module it is ultimately called from:


% python modb.py
11 99


In other words, import operations never give upward visibility to code in imported files—an imported file cannot see names in the importing file. More formally:

    * Functions can never see names in other functions, unless they are physically enclosing.
    * Module code can never see names in other modules, unless they are explicitly imported.

Such behavior is part of the lexical scoping notion—in Python, the scopes surrounding a piece of code are completely determined by the code's physical position in your file. Scopes are never influenced by function calls or module imports.[55]

    [55] * Some languages act differently and provide for dynamic scoping, where scopes really may depend on runtime calls. This tends to make code trickier, though, because the meaning of a variable can differ over time.

				30.4.2.3.4 Namespace Nesting

In some sense, although imports do not nest namespaces upward, they do nest downward. Using attribute qualification paths, it's possible to descend into arbitrarily nested modules and access their attributes. For example, consider the next three files. mod3.py defines a single global name and attribute by assignment:


X = 3


mod2.py in turn defines its own X, then imports mod3 and uses qualification to access the imported module's attribute:


X = 2
import mod3

print X,                      # My global X
print mod3.X                  # mod3's X


mod1.py also defines its own X, then imports mod2, and fetches attributes in both the first and second files:


X = 1
import mod2

print X,                      # My global X
print mod2.X,                 # mod2's X
print mod2.mod3.X             # Nested mod3's X


Really, when mod1 imports mod2 here, it sets up a two-level namespace nesting. By using the path of names mod2.mod3.X, it can descend into mod3, which is nested in the imported mod2. The net effect is that mod1 can see the Xs in all three files, and hence has access to all three global scopes:


% python mod1.py
2 3
1 2 3


The reverse, however, is not true: mod3 cannot see names in mod2, and mod2 cannot see names in mod1. This example may be easier to grasp if you don't think in terms of namespaces and scopes, but instead focus on the objects involved. Within mod1, mod2 is just a name that refers to an object with attributes, some of which may refer to other objects with attributes (import is an assignment). For paths like mod2.mod3.X, Python simply evaluates from left to right, fetching attributes from objects along the way.

Note that mod1 can say import mod2, and then mod2.mod3.X, but it cannot say import mod2.mod3—this syntax invokes something called package (directory) imports, described in the next chapter. Package imports also create module namespace nesting, but their import statements are taken to reflect directory trees, not simple import chains.

			30.4.2.4 Reloading Modules
As we’ve seen, a module’s code is run only once per process by default. To force a
module’s code to be reloaded and rerun, you need to ask Python to do so explicitly
by calling the reload built-in function. In this section, we’ll explore how to use
reloads to make your systems more dynamic. In a nutshell:
• Imports (via both import and from statements) load and run a module’s code
only the first time the module is imported in a process.
• Later imports use the already loaded module object without reloading or rerunning the file’s code.
• The reload function forces an already loaded module’s code to be reloaded
and rerun. Assignments in the file’s new code change the existing module
object in-place.
Why all the fuss about reloading modules? The reload function allows parts of a program to be changed without stopping the whole program. With reload, therefore,
the effects of changes in components can be observed immediately. Reloadingdoesn't help in every situation, but where it does, it makes for a much shorter development cycle. For instance, imagine a database program that must connect to a server on startup; because program changes or customizations can be tested immediately after reloads, you need to connect only once while debugging.

Because Python is interpreted (more or less), it already gets rid of the compile/link steps you need to go through to get a C program to run: modules are loaded dynamically when imported by a running program. Reloading offers a further performance advantage by allowing you to also change parts of running programs without stopping. Note that reload currently only works on modules written in Python; compiled extension modules coded in a language such as C can be dynamically loaded at runtime, too, but they can't be reloaded. 
				30.4.2.4.1 reload Basics

Unlike import and from:

    * reload is a built-in function in Python, not a statement.
    * reload is passed an existing module object, not a name.

Because reload expects an object, a module must have been previously imported successfully before you can reload it (if the import was unsuccessful, due to a syntax or other error, you may need to repeat it before you can reload the module). Furthermore, the syntax of import statements and reload calls differs: reloads require parentheses, but imports do not. Reloading looks like this:


import module                     # Initial import
...use module.attributes...
...                               # Now, go change the module file
...
reload(module)                    # Get updated exports
...use module.attributes...


The typical usage pattern is that you import a module, then change its source code in a text editor, and then reload it. When you call reload, Python rereads the module file's source code, and reruns its top-level statements. Perhaps the most important thing to know about reload is that it changes a module object in-place; it does not delete and re-create the module object. Because of that, every reference to a module object anywhere in your program is automatically affected by a reload. Here are the details:

    * reloadruns a module file's new code in the module's current namespace. Rerunning a module file's code overwrites its existing namespace, rather than deleting and re-creating it.
    * Top-level assignments in the file replace names with new values. For instance, rerunning a def statement replaces the prior version of the function in the module's namespace by reassigning the function name.
    * Reloads impact all clients that useimportto fetch modules. Because clients that use import qualify to fetch attributes, they'll find new values in the module object after a reload.
    * Reloads impact futurefromclients only. Clients that used from to fetch attributes in the past won't be affected by a reload; they'll still have references to the old objects fetched before the reload.

				30.4.2.4.2 reload Example

Here's a more concrete example of reload in action. In the following example, we'll change and reload a module file without stopping the interactive Python session. Reloads are used in many other scenarios, too (see the sidebar "Why You Will Care: Module Reloads"), but we'll keep things simple for illustration here. First, in the text editor of your choice, write a module file named changer.py with the following contents:


message = "First version"
def printer(  ):
    print message


This module creates and exports two names—one bound to a string, and another to a function. Now, start the Python interpreter, import the module, and call the function it exports. The function will print the value of the global message variable:


% python
>>> import changer
>>> changer.printer(  )
First version


Keeping the interpreter active, now edit the module file in another window:

...modify changer.py without stopping Python... 
% vi changer.py 


Change the global message variable, as well as the printer function body:


message = "After editing"
def printer(  ):
    print 'reloaded:', message


Then, return to the Python window, and reload the module to fetch the new code. Notice in the following interaction that importing the module again has no effect; we get the original message, even though the file's been changed. We have to call reload in order to get the new version:

...back to the Python interpreter/program... 
>>> import changer 
>>> changer.printer(  )  # No effect: uses loaded module
First version
>>> reload(changer)  # Forces new code to load/run
<module 'changer'>
>>> changer.printer(  )  # Runs the new version now
reloaded: After editing


Notice that reload actually returns the module object for us—its result is usually ignored, but because expression results are printed at the interactive prompt, Python shows a default <module 'name'> representation.

Why You Will Care: Module Reloads

Besides allowing you to reload (and hence rerun) modules at the interactive prompt, module reloads are also useful in larger systems, especially when the cost of restarting the entire application is prohibitive. For instance, systems that must connect to servers over a network on startup are prime candidates for dynamic reloads.

They're also useful in GUI work (a widget's callback action can be changed while the GUI remains active), and when Python is used as an embedded language in a C or C++ program (the enclosing program can request a reload of the Python code it runs, without having to stop). See Programming Python for more on reloading GUI callbacks and embedded Python code.

More generally, reloads allow programs to provide highly dynamic interfaces. For instance, Python is often used as a customization language for larger systems—users can customize products by coding bits of Python code on-site, without having to recompile the entire product (or even having its source code at all). In such worlds, the Python code already adds a dynamic flavor by itself.

To be even more dynamic, though, such systems can automatically reload the Python customization code periodically at runtime. That way, users' changes are picked up while the system is running; there is no need to stop and restart each time the Python code is modified. Not all systems require such a dynamic approach, but for those that do, module reloads provide an easy-to-use dynamic customization tool.

			30.4.2.5 Chapter Summary

This chapter delved into the basics of module coding tools—the import and from statements, and the reload call. We learned how the from statement simply adds an extra step that copies names out of a file after it has been imported, and how reload forces a file to be imported again without stopping and restarting Python. We also surveyed namespace concepts, saw what happens when imports are nested, explored the way files become module namespaces, and learned about some potential pitfalls of the from statement.

Although we've already seen enough to handle module files in our programs, the next chapter extends our coverage of the import model by presenting package imports—a way for our import statements to specify part of the directory path leading to the desired module. As we'll see, package imports give us a hierarchy that is useful in larger systems, and allow us to break conflicts between same-named modules. Before we move on, though, here's a quick quiz on the concepts presented here.

BRAIN BUILDER

Chapter Quiz

Q:	How do you make a module?
Q:	How is the from statement related to the import statement?
Q:	How is the reload function related to imports?
Q:	When must you use import instead of from?
Q:	Name three potential pitfalls of the from statement.
Q:	What is the airspeed velocity of an unladen swallow?


Quiz Answers

A:	To create a module, you just write a text file containing Python statements; every source code file is automatically a module, and there is no syntax for declaring one. Import operations load module files into module objects in memory. You can also make a module by writing code in an external language like C or Java, but such extension modules are beyond the scope of this book.
A:	The from statement imports an entire module, like the import statement, but as an extra step, it also copies one or more variables from the imported module into the scope where the from appears. This enables you to use the imported names directly (name) instead of having to go through the module (module.name).
A:	By default, a module is imported only once per process. The reload function forces a module to be imported again. It is mostly used to pick up new versions of a module's source code during development, and in dynamic customization scenarios.
A:	You must use import instead of from only when you need to access the same name in two different modules; because you'll have to specify the names of the enclosing modules, the two names will be unique.
A:	The from statement can obscure the meaning of a variable (which module it is defined in), can have problems with the reload call (names may reference prior versions of objects), and can corrupt namespaces (it might silently overwrite names you are using in your scope). The from * form is worse in most regards—it can seriously corrupt namespaces, and obscure the meaning of variables; it is probably best used sparingly.
A:	What do you mean? An African or European swallow?


 	 	30.4.3. Module Packages
So far, when we’ve imported modules, we’ve been loading files. This represents typical module usage, and is probably the technique you’ll use for most imports you’ll code early on in your Python career. However, the module import story is a bit richer than I have thus far implied.
In addition to a module name, an import can name a directory path. A directory of Python code is said to be a package, so such imports are known as package imports.
In effect, a package import turns a directory on your computer into another Python namespace, with attributes corresponding to the subdirectories and module files that the directory contains.
This is a somewhat advanced feature, but the hierarchy it provides turns out to be handy for organizing the files in a large system, and tends to simplify module search path settings. As we’ll see, package imports are also sometimes required to resolve import ambiguities when multiple program files of the same name are installed on a single machine.

			30.4.3.1 Package Import Basics
So, how do package imports work? In the place where you have been naming a simple file in your import statements, you can instead list a path of names separated by periods:


import dir1.dir2.mod


The same goes for from statements:


from dir1.dir2.mod import x


The "dotted" path in these statements is assumed to correspond to a path through the directory hierarchy on your machine, leading to the file mod.py (or similar; the extension may vary). That is, the preceding statements indicate that on your machine there is a directory dir1, which has a subdirectory dir2, which contains a module file mod.py (or similar).

Furthermore, these imports imply that dir1 resides within some container directory dir0, which is accessible on the Python module search path. In other words, the two import statements imply a directory structure that looks something like this (shown with DOS backslash separators):


dir0\dir1\dir2\mod.py             # Or mod.pyc, mod.so, etc.


The container directory dir0 needs to be added to your module search path (unless it's the home directory of the top-level file), exactly as if dir1 were a module file. From there down, the import statements in your script give the directory paths leading to the modules explicitly.

				30.4.3.1.1 Packages and Search Path Settings

If you use this feature, keep in mind that the directory paths in your import statements can only be variables separated by periods. You cannot use any platform-specific path syntax in your import statements, such as C:\dir1, My Documents.dir2, or ../dir1—these do not work syntactically. Instead, use platform-specific syntax in your module search path settings to name the container directories.

For instance, in the prior example, dir0—the directory name you add to your module search path—can be an arbitrarily long and platform-specific directory path leading up to dir1. Instead of using an invalid statement like this:


import C:\mycode\dir1\dir2\mod      # Error: illegal syntax


add C:\mycode to your PYTHONPATH variable or a .pth file (assuming it is not the program's home directory, in which case this step is not necessary), and say this:


import dir1.dir2.mod


In effect, entries on the module search path provide platform-specific directory path prefixes, which lead to the leftmost names in import statements. Import statements provide directory path tails in a platform-neutral fashion.[56]

    [56] * The dot path syntax was chosen partly for platform neutrality, but also because paths in import statements become real nested object paths. This syntax also means that you get odd error messages if you forget to omit the .py in your import statements. For example, import mod.py is assumed to be a directory path import—it loads mod.py, then tries to load a mod\py.py, and ultimately issues a potentially confusing error message.

				30.4.3.1.2 Package __init__.py Files

If you choose to use package imports, there is one more constraint you must follow: each directory named within the path of a package import statement must contain a file named __init__.py, or your package imports will fail. That is, in the example we've been using, both dir1 and dir2 must contain a file called __init__.py; the container directory dir0 does not require such a file because it's not listed in the import statement itself. More formally, for a directory structure such as this:


dir0\dir1\dir2\mod.py


and an import statement of the form:


import dir1.dir2.mod


the following rules apply:

    * dir1 and dir2 both must contain an __init__.py file.
    * dir0, the container, does not require an __init__.py file; this file will simply be ignored if present.
    * dir0, not dir0\dir1, must be listed on the module search path (i.e., it must be the home directory, or be listed in your PYTHONPATH, etc.).

The net effect is that this example's directory structure should be as follows, with indentation designating directory nesting:

dir0 \                        # Container on module search path
    dir1\
        __init__.py
        dir2\
            __init__.py
            mod.py


The __init__.py files can contain Python code, just like normal module files. They are partly present as a declaration to Python, however, and can be completely empty. As declarations, these files serve to prevent directories with common names from unintentionally hiding true modules that appear later on the module search path. Without this safeguard, Python might pick a directory that has nothing to do with your code, just because it appears in an earlier directory on the search path.

More generally, the __init__.py file serves as a hook for package initialization-time actions, generates a module namespace for a directory, and implements the behavior of from * (i.e., from .. import *) statements when used with directory imports:


Package initialization

    The first time Python imports through a directory, it automatically runs all the code in the directory's __init__.py file. Because of that, these files are a natural place to put code to initialize the state required by files in the package. For instance, a package might use its initialization file to create required data files, open connections to databases, and so on. Typically, __init__.py files are not meant to be useful if executed directly; they are run automatically when a package is first accessed.

Module namespace initialization

    In the package import model, the directory paths in your script become real nested object paths after an import. For instance, in the preceding example, after the import, the expression dir1.dir2 works and returns a module object whose namespace contains all the names assigned by dir2's __init__.py file. Such files provide a namespace for module objects created for directories, which have no real associated module files.

from * statement behavior

    As an advanced feature, you can use __all__ lists in __init__.py files to define what is exported when a directory is imported with the from * statement form. (We'll meet __all__ in Chapter 21.) In an __init__.py file, the __all__ list is taken to be the list of submodule names that should be imported when from * is used on the package (directory) name. If __all__ is not set, the from * statement does not automatically load submodules nested in the directory; instead, it loads just names defined by assignments in the directory's __init__.py file, including any submodules explicitly imported by code in this file. For instance, the statement from submodule import X in a directory's __init__.py makes the name X available in that directory's namespace.

You can also simply leave these files empty, if their roles are beyond your needs. They must exist, though, for your directory imports to work at all.

			30.4.3.2 Package Import Example
Let's actually code the example we've been talking about to show how initialization files and paths come into play. The following three files are coded in a directory dir1, and its subdirectory dir2:


# File: dir1\__init__.py
print 'dir1 init'
x = 1

# File: dir1\dir2\__init__.py
print 'dir2 init'
y = 2

# File: dir1\dir2\mod.py
print 'in mod.py'
z = 3


Here, dir1 will either be a subdirectory of the one we're working in (i.e., the home directory), or a subdirectory of a directory that is listed on the module search path (technically, on sys.path). Either way, dir1's container does not need an __init__.py file.

import statements run each directory's initialization file the first time that directory is traversed, as Python descends the path; print statements are included here to trace their execution. Also, as with module files, an already imported directory may be passed to reload to force re-execution of that single item. As shown here, reload accepts a dotted path name to reload nested directories and files:


% python 
>>> import dir1.dir2.mod  # First imports run init files
dir1 init
dir2 init
in mod.py
>>>
>>> import dir1.dir2.mod  # Later imports do not
>>>
>>> reload(dir1) 
dir1 init
<module 'dir1' from 'dir1\__init__.pyc'>
>>>
>>> reload(dir1.dir2) 
dir2 init
<module 'dir1.dir2' from 'dir1\dir2\__init__.pyc'>


Once imported, the path in your import statement becomes a nested object path in your script. Here, mod is an object nested in the object dir2, which in turn is nested in the object dir1:


>>> dir1
<module 'dir1' from 'dir1\__init__.pyc'>
>>> dir1.dir2
<module 'dir1.dir2' from 'dir1\dir2\__init__.pyc'>
>>> dir1.dir2.mod
<module 'dir1.dir2.mod' from 'dir1\dir2\mod.pyc'>


In fact, each directory name in the path becomes a variable assigned to a module object whose namespace is initialized by all the assignments in that directory's __init__.py file. dir1.x refers to the variable x assigned in dir1\__init__.py, much as mod.z refers to the variable z assigned in mod.py:


>>> dir1.x
1
>>> dir1.dir2.y
2
>>> dir1.dir2.mod.z
3

				30.4.3.2.1 from Versus import with Packages

import statements can be somewhat inconvenient to use with packages because you may have to retype the paths frequently in your program. In the prior section's example, for instance, you must retype and rerun the full path from dir1 each time you want to reach z. If you try to access dir2 or mod directly, you'll get an error:


>>> dir2.mod
NameError: name 'dir2' is not defined
>>> mod.z
NameError: name 'mod' is not defined


It's often more convenient, therefore, to use the from statement with packages to avoid retyping the paths at each access. Perhaps more importantly, if you ever restructure your directory tree, the from statement requires just one path update in your code, whereas the import may require many. The import as extension, discussed in the next chapter, can also help here by providing a shorter synonym for the full path:


% python 
>>> from dir1.dir2 import mod  # Code path here only
dir1 init
dir2 init
in mod.py
>>> mod.z  # Don't repeat path
3
>>> from dir1.dir2.mod import z 
>>> z 
3
>>> import dir1.dir2.mod as mod  # Use shorter name
>>> mod.z 
3
			30.4.3.3 Why Use Package Imports?
If you're new to Python, make sure that you've mastered simple modules before stepping up to packages, as they are a somewhat advanced feature. They do serve useful roles, though, especially in larger programs: they make imports more informative, serve as an organizational tool, simplify your module search path, and can resolve ambiguities.

First of all, because package imports give some directory information in program files, they both make it easier to locate your files and serve as an organizational tool. Without package paths, you must often resort to consulting the module search path to find files. Moreover, if you organize your files into subdirectories for functional areas, package imports make it more obvious what role a module plays, and so make your code more readable. For example, a normal import of a file in a directory somewhere on the module search path, like this:


import utilities


offers much less information than an import that includes the path:


import database.client.utilities


Package imports can also greatly simplify your PYTHONPATH and .pth file search path settings. In fact, if you use package imports for all your cross-directory imports, and you make those package imports relative to a common root directory, where all your Python code is stored, you really only need a single entry on your search path: the common root. Finally, package imports serve to resolve ambiguities by making explicit exactly which files you want to import. The next section explores this role in more detail.

				30.4.3.3.1 A Tale of Three Systems

The only time package imports are actually required is to resolve ambiguities that may arise when multiple programs with same-named files are installed on a single machine. This is something of an install issue, but it can also become a concern in general practice. Let's turn to a hypothetical scenario to illustrate.

Suppose that a programmer develops a Python program that contains a file called utilities.py for common utility code, and a top-level file named main.py that users launch to start the program. All over this program, its files say import utilities to load and use the common code. When the program is shipped, it arrives as a single .tar or .zip file containing all the program's files, and when it is installed, it unpacks all its files into a single directory named system1 on the target machine:


system1\
    utilities.py        # Common utility functions, classes
    main.py             # Launch this to start the program
    other.py            # Import utilities to load my tools


Now, suppose that a second programmer develops a different program with files also called utilities.py and main.py, and again uses import utilities throughout the program to load the common code file. When this second system is fetched and installed on the same computer as the first system, its files will unpack into a new directory called system2 somewhere on the receiving machine so that they do not overwrite same-named files from the first system:


system2\
    utilities.py        # Common utilities
    main.py             # Launch this to run
    other.py            # Imports utilities


So far, there's no problem: both systems can coexist and run on the same machine. In fact, you won't even need to configure the module search path to use these programs on your computer—because Python always searches the home directory first (that is, the directory containing the top-level file), imports in either system's files will automatically see all the files in that system's directory. For instance, if you click on system1\main.py, all imports will search system1 first. Similarly, if you launch system2\main.py, system2 will be searched first instead. Remember, module search path settings are only needed to import across directory boundaries.

However, suppose that after you've installed these two programs on your machine, you decide that you'd like to use some of the code in each of the utilities.py files in a system of your own. It's common utility code, after all, and Python code by nature wants to be reused. In this case, you want to be able to say the following from code that you're writing in a third directory to load one of the two files:


import utilities
utilities.func('spam')


Now the problem starts to materialize. To make this work at all, you'll have to set the module search path to include the directories containing the utilities.py files. But which directory do you put first in the path—system1 or system2?

The problem is the linear nature of the search path. It is always scanned from left to right, so no matter how long you ponder this dilemma, you will always get utilities.py from the directory listed first (leftmost) on the search path. As is, you'll never be able to import it from the other directory at all. You could try changing sys.path within your script before each import operation, but that's both extra work, and highly error-prone. By default, you're stuck.

This is the issue that packages actually fix. Rather than installing programs as flat lists of files in standalone directories, you can package and install them as subdirectories under a common root. For instance, you might organize all the code in this example as an install hierarchy that looks like this:


root\
    system1\
        __init__.py
        utilities.py
        main.py
        other.py
    system2\
        __init__.py
        utilities.py
        main.py
        other.py
    system3\                    # Here or elsewhere
        __init__.py          # Your new code here
        myfile.py


Now, add just the common root directory to your search path. If your code's imports are all relative to this common root, you can import either system's utility file with a package import—the enclosing directory name makes the path (and hence, the module reference) unique. In fact, you can import both utility files in the same module, as long as you use an import statement, and repeat the full path each time you reference the utility modules:


import system1.utilities
import system2.utilities
system1.utilities.function('spam')
system2.utilities.function('eggs')


The name of the enclosing directory here makes the module references unique.

Note that you have to use import instead of from with packages only if you need to access the same attribute in two or more paths. If the name of the called function here was different in each path, from statements could be used to avoid repeating the full package path whenever you call one of the functions, as described earlier.

Also, notice in the install hierarchy shown earlier that __init__.py files were added to the system1 and system2 directories to make this work, but not to the root directory. Only directories listed within import statements in your code require these files; as you'll recall, they are run automatically the first time the Python process imports through a package directory.

Technically, in this case, the system3 directory doesn't have to be under root—just the packages of code from which you will import. However, because you never know when your own modules might be useful in other programs, you might as well place them under the common root directory to avoid similar name-collision problems in the future.

Finally, notice that both of the two original systems' imports will keep working unchanged. Because their home directories are searched first, the addition of the common root on the search path is irrelevant to code in system1 and system2; they can keep saying just import utilities, and expect to find their own files. Moreover, if you're careful to unpack all your Python systems under a common root like this, path configuration becomes simple: you'll only need to add the common root directory, once.

Why You Will Care: Module Packages

Now that packages are a standard part of Python, it's common to see larger third-party extensions shipped as a set of package directories, rather than a flat list of modules. The win32all Windows extensions package for Python, for instance, was one of the first to jump on the package bandwagon. Many of its utility modules reside in packages imported with paths. For instance, to load client-side COM tools, you use a statement like this:


from win32com.client import constants, Dispatch


This line fetches names from the client module of the win32com package (an install subdirectory).

Package imports are also pervasive in code run under the Jython Java-based implementation of Python because Java libraries are organized into hierarchies as well. In recent Python releases, the email and XML tools are likewise organized into packaged subdirectories in the standard library. Whether you create package directories, you will probably import from them eventually.

			30.4.3.4 Chapter Summary
This chapter introduced Python's package import model—an optional but useful way to explicitly list part of the directory path leading up to your modules. Package imports are still relative to a directory on your module import search path, but rather than relying on Python to traverse the search path manually, your script gives the rest of the path to the module explicitly.

As we've seen, packages not only make imports more meaningful in larger systems, but also simplify import search path settings (if all cross-directory imports are relative to a common root directory), and resolve ambiguities when there is more than one module of the same name (including the name of the enclosing directory in a package import helps distinguish between them).

In the next chapter, we will survey a handful of more advanced module-related topics, such as relative import syntax, and the __name__ usage mode variable. As usual, though, we'll close out this chapter with a short quiz to test what you've learned here.

BRAIN BUILDER

Chapter Quiz

Q:	What is the purpose of an __init__.py file in a module package directory?
Q:	How can you avoid repeating the full package path every time you reference a package's content?
Q:	Which directories require __init__.py files?
Q:	When must you use import instead of from with packages?


Quiz Answers

A:	The __init__.py file serves to declare and initialize a module package; Python automatically runs its code the first time you import through a directory in a process. Its assigned variables become the attributes of the module object created in memory to correspond to that directory. It is also not optional—you can't import through a directory with package syntax, unless it contains this file.
A:	Use the from statement with a package to copy names out of the package directly, or use the as extension with the import statement to rename the path to a shorter synonym. In both cases, the path is listed in only one place, in the from or import statement.
A:	Each directory listed in an import or from statement must contain an __init__.py file. Other directories, including the directory containing the leftmost component of a package path, do not need to include this file.
A:	You must use import instead of from with packages only if you need to access the same name defined in more than one path. With import, the path makes the references unique, but from allows only one version of any given name.

 	 	30.4.4. Advanced Module Topics

This chapter concludes Part 5 with a collection of more advanced module-related topics—relative import syntax, data hiding, the __future__ module, the __name__ variable, sys.path changes, and so on—along with the standard set of gotchas and exercises related to what we've covered in this part of the book. Like functions, modules are more effective when their interfaces are well defined, so this chapter also briefly reviews module design concepts, some of which we have explored in prior chapters.

Despite the word "advanced" in this chapter's title, some of the topics discussed here (such as the __name__ trick) are widely used, so be sure you take a look before moving on to classes in the next part of the book.

			30.4.4.1 . Data Hiding in Modules

As we've seen, a Python module exports all the names assigned at the top level of its file. There is no notion of declaring which names should and shouldn't be visible outside the module. In fact, there's no way to prevent a client from changing names inside a module if it wants to.

In Python, data hiding in modules is a convention, not a syntactical constraint. If you want to break a module by trashing its names, you can, but fortunately, I've yet to meet a programmer who would. Some purists object to this liberal attitude toward data hiding, and claim that it means Python can't implement encapsulation. However, encapsulation in Python is more about packaging than about restricting.

				30.4.4.1.1 Minimizing from * Damage: _X and __all__

As a special case, you can prefix names with a single underscore (e.g., _X) to prevent them from being copied out when a client imports a module's names with a from * statement. This really is intended only to minimize namespace pollution; because from * copies out all names, the importer may get more than it's bargained for (including names that overwrite names in the importer). Underscores aren't "private" declarations: you can still see and change such names with other import forms, such as the import statement.

Alternatively, you can achieve a hiding effect similar to the _X naming convention by assigning a list of variable name strings to the variable __all__ at the top level of the module. For example:


__all__ = ["Error", "encode", "decode"]     # Export these only


When this feature is used, the from * statement will copy out only those names listed in the __all__ list. In effect, this is the converse of the _X convention: __all__ identifies names to be copied, while _X identifies names not to be copied. Python looks for an __all__ list in the module first; if one is not defined, from * copies all names without a single leading underscore.

Like the _X convention, the __all__ list has meaning only to the from * statement form, and does not amount to a privacy declaration. Module writers can use either trick to implement modules that are well behaved when used with from *. (See also the discussion of __all__ lists in package __init__.py files in Chapter 20; there, these lists declare submodules to be loaded for a from *.)

			30.4.4.2 . Enabling Future Language Features
Changes to the language that may potentially break existing code are introduced gradually. Initially, they appear as optional extensions, which are disabled by default. To turn on such extensions, use a special import statement of this form:


from __future__ import featurename


This statement should generally appear at the top of a module file (possibly after a docstring) because it enables special compilation of code on a per-module basis. It's also possible to submit this statement at the interactive prompt to experiment with upcoming language changes; the feature will then be available for the rest of the interactive session.

For example, in prior editions of this book, we had to use this statement form to demonstrate generator functions, which required a keyword that was not yet enabled by default (they use a featurename of generators). We also used this statement to activate true division for numbers in Chapter 5, and we'll use it again in this chapter to turn on absolute imports and again later in Part 7 to demonstrate context managers.

All of these changes have the potential to break existing code, and so are being phased in gradually as optional features presently enabled with this special import.

			30.4.4.3 . Mixed Usage Modes: __name__ and __main__
Here's a special module-related trick that lets you import a file as a module, and run it as a standalone program. Each module has a built-in attribute called __name__, which Python sets automatically as follows:

    * If the file is being run as a top-level program file, __name__ is set to the string "__main__" when it starts.
    * If the file is being imported, __name__ is instead set to the module's name as known by its clients.

The upshot is that a module can test its own __name__ to determine whether it's being run or imported. For example, suppose we create the following module file, named runme.py, to export a single function called tester:


def tester(  ):
    print "It's Christmas in Heaven..."

if __name__ == '__main__':         # Only when run
    tester(  )                        # Not when imported


This module defines a function for clients to import and use as usual:


% python
>>> import runme
>>> runme.tester(  )
It's Christmas in Heaven...


But, the module also includes code at the bottom that is set up to call the function when this file is run as a program:


% python runme.py
It's Christmas in Heaven...


Perhaps the most common place you'll see the __name__ test applied is for self-test code. In short, you can package code that tests a module's exports in the module itself by wrapping it in a __name__ test at the bottom of the file. This way, you can use the file in clients by importing it, and test its logic by running it from the system shell, or via another launching scheme. In practice, self-test code at the bottom of a file under the __name__ test is probably the most common and simplest unit-testing protocol in Python. (Chapter 29 will discuss other commonly used options for testing Python code—as you'll see, the unittest and doctest standard library modules provide more advanced testing tools.)

The __name__ trick is also commonly used when writing files that can be used both as command-line utilities, and as tool libraries. For instance, suppose you write a file finder script in Python. You can get more mileage out of your code if you package it in functions, and add a __name__ test in the file to automatically call those functions when the file is run standalone. That way, the script's code becomes reusable in other programs.

				30.4.4.3.1 Unit Tests with __name__

In fact, we've already seen a prime example in this book of an instance where the __name__ check could be useful. In the section on arguments in Chapter 16, we coded a script that computed the minimum value from the set of arguments sent in:


def minmax(test, *args):
    res = args[0]
    for arg in args[1:]:
        if test(arg, res):
            res = arg
    return res

def lessthan(x, y): return x < y
def grtrthan(x, y): return x > y

print minmax(lessthan, 4, 2, 1, 5, 6, 3)         # Self-test code
print minmax(grtrthan, 4, 2, 1, 5, 6, 3)


This script includes self-test code at the bottom, so we can test it without having to retype everything at the interactive command line each time we run it. The problem with the way it is currently coded, however, is that the output of the self-test call will appear every time this file is imported from another file to be used as a tool—not exactly a user-friendly feature! To improve it, we can wrap up the self-test call in a __name__ check, so that it will be launched only when the file is run as a top-level script, not when it is imported:


print 'I am:', __name__

def minmax(test, *args):
    res = args[0]
    for arg in args[1:]:
        if test(arg, res):
            res = arg
    return res

def lessthan(x, y): return x < y
def grtrthan(x, y): return x > y

if __name__ == '__main__':
    print minmax(lessthan, 4, 2, 1, 5, 6, 3)     # Self-test code
    print minmax(grtrthan, 4, 2, 1, 5, 6, 3)


We're also printing the value of __name__ at the top here to trace its value. Python creates and assigns this usage-mode variable as soon as it starts loading a file. When we run this file as a top-level script, its name is set to __main__, so its self-test code kicks in automatically:


% python min.py
I am: __main__
1
6


But, if we import the file, its name is not __main__, so we must explicitly call the function to make it run:


>>> import min
I am: min
>>> min.minmax(min.lessthan, 's', 'p', 'a', 'm')
'a'


Again, regardless of whether this is used for testing, the net effect is that we get to use our code in two different roles—as a library module of tools, or as an executable program.

			30.4.4.4 . Changing the Module Search Path
In Chapter 18, we learned that the module search path is a list of directories that can be customized via the environment variable PYTHONPATH, and possibly .pth path files. What I haven't shown you until now is how a Python program itself can actually change the search path by changing a built-in list called sys.path (the path attribute in the built-in sys module). sys.path is initialized on startup, but thereafter, you can delete, append, and reset its components however you like:


>>> import sys 
>>> sys.path 
['', 'D:\\PP3ECD-Partial\\Examples', 'C:\\Python25', ...more deleted... ]

>>> sys.path.append('C:\\sourcedir')  # Extend module search path
>>> import string  # All imports search the new dir


Once you've made such a change, it will impact future imports anywhere in the Python program, as all imports and all files share the single sys.path list. In fact, this list may be changed arbitrarily:


>>> sys.path = [r'd:\temp']  # Change module search path
>>> sys.path.append('c:\\lp3e\\examples')  # For this process only
>>> sys.path 
['d:\\temp', 'c:\\lp3e\\examples']

>>> import string 
Traceback (most recent call last):
  File "<stdin>", line 1, in ?
ImportError: No module named string


Thus, you can use this technique to dynamically configure a search path inside a Python program. Be careful, though: if you delete a critical directory from the path, you may lose access to critical utilities. In the prior example, for instance, we no longer have access to the string module because we deleted the Python source library's directory from the path.

Also, remember that such sys.path settings only endure for the Python session or program (technically, process) that made them; they are not retained after Python exits. PYTHONPATH and .pth file path configurations live in the operating system instead of a running Python program, and so are more global: they are picked up by every program on your machine, and live on after a program completes.

			30.4.4.5 . The import as Extension
Both the import and from statements have been extended to allow a module to be given a different name in your script. The following import statement:


import longmodulename as name


is equivalent to:


import longmodulename
name = longmodulename
del longmodulename                           # Don't keep original name


After such an import, you can (and in fact must) use the name listed after the as to refer to the module. This works in a from statement, too, to assign a name imported from a file to a different name in your script:


from module import longname as name


This extension is commonly used to provide short synonyms for longer names, and to avoid name clashes when you are already using a name in your script that would otherwise be overwritten by a normal import statement. It also comes in handy for providing a short, simple name for an entire directory path when using the package import feature described in Chapter 20.

			30.4.4.6 . Relative Import Syntax
Python 2.5 modifies the import search path semantics of some from statements when they are applied to the module packages we studied in the previous chapter. Some aspects of this change will not become apparent until a later Python release (currently this is planned for version 2.7 and version 3.0), though some are already present today.

In short, from statements can now use dots (".") to specify that they prefer modules located within the same package (known as package-relative imports) to modules located elsewhere on the module import search path (called absolute imports). That is:

    * Today, you can use dots to indicate that imports should be relative to the containing package—such imports will prefer modules located inside the package to same-named modules located elsewhere on the import search path, sys.path.
    * Normal imports in a package's code (without dots) currently default to a relative-then-absolute search path order. However, in the future, Python will make imports absolute by default—in the absence of any special dot syntax, imports will skip the containing package itself and look elsewhere on the sys.path search path.

For example, presently, a statement of the form:
from .spam import name


means "from a module named spam located in the same package that this statement is contained in, import the variable name." A similar statement without the leading dot will still default to the current relative-then-absolute search path order, unless a statement of the following form is included in the importing file:
from __future__ import  absolute_import   # Required until 2.7?


If present, this statement enables the future absolute default path change. It causes all imports without extra dots to skip the relative components of the module import search path, and look instead in the absolute directories that sys.path contains. For instance, when absolute imports are thus enabled, a statement of the following form will always find the standard library's string module, instead of a module of the same name in the package:
import string                             # Always finds standard lib's version

Without the from __future__ statement, if there's a string module in the package, it will be imported instead. To get the same behavior when the future absolute import change is enabled, run a statement of the following form (which also works in Python today) to force a relative import:


from . import string                      # Searches this package first


Note that leading dots can only be used with the from statement, not the import statement. The import modname statement form still performs relative imports today, but these will become absolute in Python 2.7.

Other dot-based relative reference patterns are possible, too. Given a package named mypkg, the following alternative import forms used by code within the package work as described:

from .string import name1, name2             # Imports names from mypkg.string
from . import string                        # Imports mypkg.string
from .. import string                         # Imports string from parent directory

To understand these latter forms better, we need to understand the rationale behind this change.

				30.4.4.6.1 Why Relative Imports?

This feature is designed to allow scripts to resolve ambiguities that can arise when a same-named file appears in multiple places on the module search path. Consider the following package directory:


mypkg\
    __init__.py
    main.py
    string.py


This defines a package named mypkg containing modules named mypkg.main and mypkg.string. Now, suppose that the main module tries to import a module named string. In Python 2.4 and earlier, Python will first look in the mypkg directory to perform a relative import. It will find and import the string.py file located there, assigning it to the name string in the mypkg.main module's namespace.

It could be, though, that the intent of this import was to load the Python standard library's string module instead. Unfortunately, in these versions of Python, there's no straightforward way to ignore mypkg.string and look for the standard library's string module located further to the right on the module search path. We cannot depend on any extra package directory structure above the standard library being present on every machine.

In other words, imports in packages can be ambiguous—within a package, it's not clear whether an import spam statement refers to a module within or outside the package. More accurately, a local module or package can hide another hanging directly off of sys.path, whether intentionally or not.

In practice, Python users can avoid reusing the names of standard library modules they need for modules of their own (if you need the standard string, don't name a new module string). But this doesn't help if a package accidentally hides a standard module; moreover, Python might add a new standard library module in the future that has the same name as a module of your own. Code that relies on relative imports is also less easy to understand because the reader may be confused about which module is intended to be used. It's better if the resolution can be made explicit in code.

In Python 2.5, we can control the behavior of imports, forcing them to be absolute by using the from __future__ import directive listed earlier. Again, bear in mind that this absolute-import behavior will become the default in a future version (planned currently for Python 2.7). When absolute imports are enabled, a statement of the following form in our example file mypkg/main.py will always find the standard library's version of string, via an absolute import search:


import string                          # Imports standard lib string


You should get used to using absolute imports now, so you're prepared when the change takes effect. That is, if you really want to import a module from your package, to make this explicit and absolute, you should begin writing statements like this in your code (mypkg will be found in an absolute directory on sys.path):


from mypkg import string               # Imports mypkg.string (absolute)


Relative imports are still possible by using the dot pattern in the from statement:


from . import string                   # Imports mypkg.string (relative)


This form imports the string module relative to the current package, and is the relative equivalent to the prior example's absolute form (the package's directory is automatically searched first).

We can also copy specific names from a module with relative syntax:


from .string import name1, name2       # Imports names from mypkg.string


This statement again refers to the string module relative to the current package. If this code appears in our mypkg.main module, for example, it will import name1 and name2 from mypkg.string. An additional leading dot performs the relative import starting from the parent of the current package. For example:


from .. import spam                    # Imports a sibling of mypkg


will load a sibling of mypkg—i.e., the spam module located in the parent directory, next to mypkg. More generally, code located in some module A.B.C can do any of these:


from . import D                        # Imports A.B.D
from .. import E                       # Imports A.E
from ..F import G                      # Imports A.F.G


Relative import syntax and the proposed absolute-by-default imports change are advanced concepts, and these features are still only partially present in Python 2.5. Because of that, we'll omit further details here; see Python's standard manual set for more information.

			30.4.4.7 . Module Design Concepts
Like functions, modules present design tradeoffs: you have to think about which functions go in which modules, module communication mechanisms, and so on. All of this will become clearer when you start writing bigger Python systems, but here are a few general ideas to keep in mind:

    * You're always in a module in Python. There's no way to write code that doesn't live in some module. In fact, code typed at the interactive prompt really goes in a built-in module called __main__; the only unique things about the interactive prompt are that code runs and is discarded immediately, and expression results are printed automatically.
    * Minimize module coupling: global variables. Like functions, modules work best if they're written to be closed boxes. As a rule of thumb, they should be as independent of global names in other modules as possible.
    * Maximize module cohesion: unified purpose. You can minimize a module's couplings by maximizing its cohesion; if all the components of a module share a general purpose, you're less likely to depend on external names.
    * Modules should rarely change other modules' variables. We illustrated this with code in Chapter 16, but it's worth repeating here: it's perfectly OK to use globals defined in another module (that's how clients import services, after all), but changing globals in another module is often a symptom of a design problem. There are exceptions, of course, but you should try to communicate results through devices such as function argument return values, not cross-module changes. Otherwise, your globals' values become dependent on the order of arbitrarily remote assignments in other files, and your modules become harder to understand and reuse.

As a summary, Figure 21-1 sketches the environment in which modules operate. Modules contain variables, functions, classes, and other modules (if imported). Functions have local variables of their own. You'll meet classes—other objects that live within modules—in Chapter 22.

Figure 21-1. Module execution environment. Modules are imported, but modules also import and use other modules, which may be coded in Python or another language such as C. Modules in turn contain variables, functions, and classes to do their work, and their functions and classes may contain variables and other items of their own. At the top, though, programs are just a set of modules.

				30.4.4.7.1 Modules Are Objects: Metaprograms

Because modules expose most of their interesting properties as built-in attributes, it's easy to write programs that manage other programs. We usually call such manager programs metaprograms because they work on top of other systems. This is also referred to as introspection because programs can see and process object internals. Introspection is an advanced feature, but it can be useful for building programming tools.

For instance, to get to an attribute called name in a module called M, we can use qualification, or index the module's attribute dictionary (exposed in the built-in __dict__ attribute). Python also exports the list of all loaded modules as the sys.modules dictionary (that is, the modules attribute of the sys module) and provides a built-in called getattr that lets us fetch attributes from their string names (it's like saying object.attr, but attr is a runtime string). Because of that, all the following expressions reach the same attribute and object:


M.name                            # Qualify object
M.__dict__['name']                 # Index namespace dictionary manually
sys.modules['M'].name            # Index loaded-modules table manually
getattr(M, 'name')               # Call built-in fetch function


By exposing module internals like this, Python helps you build programs about programs.[57] For example, here is a module named mydir.py that puts these ideas to work to implement a customized version of the built-in dir function. It defines and exports a function called listing, which takes a module object as an argument, and prints a formatted listing of the module's namespace:

    [57] * As we saw in Chapter 16, because a function can access its enclosing module by going through the sys.modules table like this, it's possible to emulate the effect of the global statement. For instance, the effect of global X; X=0 can be simulated (albeit with much more typing!) by saying this inside a function: import sys; glob=sys.modules[__name__]; glob.X=0. Remember, each module gets a __name__ attribute for free; it's visible as a global name inside the functions within the module. This trick provides another way to change both local and global variables of the same name inside a function.

# A module that lists the namespaces of other modules

verbose = 1

def listing(module):
    if verbose:
        print "-"*30
        print "name:", module.__name__, "file:", module.__file__
        print "-"*30

    count = 0
    for attr in module.__dict__.keys(  ):       # Scan namespace
        print "%02d) %s" % (count, attr),
        if attr[0:2] == "__":
            print "<built-in name>"           # Skip __file__, etc.
        else:
            print getattr(module, attr)       # Same as .__dict__[attr]
        count = count+1

    if verbose:
        print "-"*30
        print module.__name__, "has %d names" % count
        print "-"*30

if __name__ == "__main__":
    import mydir
    listing(mydir)                            # Self-test code: list myself

					  


We've also provided self-test logic at the bottom of this module, which narcissistically imports and lists itself. Here's the sort of output produced:


C:\python> python mydir.py
------------------------------
name: mydir file: mydir.py
------------------------------
00) __file__ <built-in name>
01) __name__ <built-in name>
02) listing <function listing at 885450>
03) __doc__ <built-in name>
04) __builtins__ <built-in name>
05) verbose 1
------------------------------
mydir has 6 names
------------------------------


We'll meet getattr and its relatives again later. The point to notice here is that mydir is a program that lets you browse other programs. Because Python exposes its internals, you can process objects generically.[58]

    [58] * Tools such as mydir.listing can be preloaded into the interactive namespace by importing them in the file referenced by the PYTHONSTARTUP environment variable. Because code in the startup file runs in the interactive namespace (module __main__), importing common tools in the startup file can save you some typing. See Appendix A for more details.

			30.4.4.8 . Module Gotchas
In this section, we'll take a look at the usual collection of boundary cases that make life interesting for Python beginners. Some are so obscure that it was hard to come up with examples, but most illustrate something important about the language.

				30.4.4.8.1 Statement Order Matters in Top-Level Code

When a module is first imported (or reloaded), Python executes its statements one by one, from the top of the file to the bottom. This has a few subtle implications regarding forward references that are worth underscoring here:

    * Code at the top level of a module file (not nested in a function) runs as soon as Python reaches it during an import; because of that, it can't reference names assigned lower in the file.
    * Code inside a function body doesn't run until the function is called; because names in a function aren't resolved until the function actually runs, they can usually reference names anywhere in the file.

Generally, forward references are only a concern in top-level module code that executes immediately; functions can reference names arbitrarily. Here's an example that illustrates forward reference:


func1(  )                           # Error: "func1" not yet assigned

def func1(  ):
    print func2(  )                  # OK:  "func2" looked up later

func1(  )                           # Error: "func2" not yet assigned

def func2(  ):
    return "Hello"

func1(  )                           # Okay:  "func1" and "func2" assigned


When this file is imported (or run as a standalone program), Python executes its statements from top to bottom. The first call to func1 fails because the func1 def hasn't run yet. The call to func2 inside func1 works as long as func2's def has been reached by the time func1 is called (it hasn't when the second top-level func1 call is run). The last call to func1 at the bottom of the file works because func1 and func2 have both been assigned.

Mixing defs with top-level code is not only hard to read, it's dependent on statement ordering. As a rule of thumb, if you need to mix immediate code with defs, put your defs at the top of the file, and top-level code at the bottom. That way, your functions are guaranteed to be defined and assigned by the time code that uses them runs.

				30.4.4.8.2 Importing Modules by Name String

The module name in an import or from statement is a hardcoded variable name. Sometimes, though, your program will get the name of a module to be imported as a string at runtime (e.g., if a user selects a module name from within a GUI). Unfortunately, you can't use import statements directly to load a module given its name as a string—Python expects a variable name here, not a string. For instance:


>>> import "string"
  File "<stdin>", line 1
    import "string"
                  ^
SyntaxError: invalid syntax


It also won't work to simply assign the string to a variable name:


x = "string"
import x


Here, Python will try to import a file x.py, not the string module.

To get around this, you need to use special tools to load a module dynamically from a string that is generated at runtime. The most general approach is to construct an import statement as a string of Python code, and pass it to the exec statement to run:


>>> modname = "string" 
>>> exec "import " + modname  # Run a string of code
>>> string  # Imported in this namespace
<module 'string'>


The exec statement (and its cousin for expressions, the eval function) compiles a string of code, and passes it to the Python interpreter to be executed. In Python, the byte code compiler is available at runtime, so you can write programs that construct and run other programs like this. By default, exec runs the code in the current scope, but you can get more specific by passing in optional namespace dictionaries.

The only real drawback to exec is that it must compile the import statement each time it runs; if it runs many times, your code may run quicker if it uses the built-in __import__ function to load from a name string instead. The effect is similar, but __import__ returns the module object, so assign it to a name here to keep it:


>>> modname = "string"
>>> string = __import__(modname)
>>> string
<module 'string'>

				30.4.4.8.3 from Copies Names but Doesn't Link

Although it's commonly used, the from statement is the source of a variety of potential gotchas in Python. The from statement is really an assignment to names in the importer's scope—a name-copy operation, not a name aliasing. The implications of this are the same as for all assignments in Python, but subtle, especially given that the code that shares the objects lives in different files. For instance, suppose we define the following module (nested1.py):


X = 99
def printer(  ): print X


If we import its two names using from in another module (nested2.py), we get copies of those names, not links to them. Changing a name in the importer resets only the binding of the local version of that name, not the name in nested1.py:


from nested1 import X, printer     # Copy names out
X = 88                             # Changes my "X" only!
printer(  )                              # nested1's X is still 99
% python nested2.py 
99


If we use import to get the whole module, and then assign to a qualified name, however, we change the name in nested1.py. Qualification directs Python to a name in the module object, rather than a name in the importer (nested3.py):


import nested1                     # Get module as a whole
nested1.X = 88                     # OK: change nested1's X
nested1.printer(  )

% python nested3.py 
88


				30.4.4.8.4 from * Can Obscure the Meaning of Variables

I mentioned this in Chapter 19, but saved the details for here. Because you don't list the variables you want when using the from module import * statement form, it can accidentally overwrite names you're already using in your scope. Worse, it can make it difficult to determine where a variable comes from. This is especially true if the from * form is used on more than one imported file.

For example, if you use from * on three modules, you'll have no way of knowing what a raw function call really means, short of searching all three external module files (all of which may be in other directories):


>>> from module1 import *  # Bad: may overwrite my names silently
>>> from module2 import *  # Worse: no way to tell what we get!
>>> from module3 import * 
>>> . . .

>>> func(  )  # Huh???


The solution again is not to do this: try to explicitly list the attributes you want in your from statements, and restrict the from * form to at most one imported module per file. That way, any undefined names must by deduction be in the module named in the single from *. You can avoid the issue altogether if you always use import instead of from, but that advice is too harsh; like much else in programming, from is a convenient tool if used wisely.

				30.4.4.8.5 reload May Not Impact from Imports

Here's another from-related gotcha: as discussed previously, because from copies (assigns) names when run, there's no link back to the module where the names came from. Names imported with from simply become references to objects, which happen to have been referenced by the same names in the importee when the from ran.

Because of this behavior, reloading the importee has no effect on clients that import its names using from. That is, the client's names will still reference the original objects fetched with from, even if the names in the original module are later reset:


from module import X          # X may not reflect any module reloads!
 . . .
reload(module)                # Changes module, but not my names
X                             # Still references old object


To make reloads more effective, use import and name qualification instead of from. Because qualifications always go back to the module, they will find the new bindings of module names after reloading:


import module                 # Get module, not names
 . . .
reload(module)                # Changes module in-place
module.X                      # Get current X: reflects module reloads

				30.4.4.8.6 reload, from, and Interactive Testing

Chapter 3 warned that it's usually better not to launch programs with imports and reloads because of the complexities involved. Things get even worse when from is brought into the mix. Python beginners often encounter the gotcha described here. After opening a module file in a text edit window, say you launch an interactive session to load and test your module with from:


from module import function
function(1, 2, 3)


Finding a bug, you jump back to the edit window, make a change, and try to reload the module this way:


reload(module)


But this doesn't work—the from statement assigned the name function, not module. To refer to the module in a reload, you have to first load it with an import statement at least once:


import module
reload(module)
function(1, 2, 3)


However, this doesn't quite work either—reload updates the module object, but as discussed in the preceding section, names like function that were copied out of the module in the past still refer to the old objects (in this instance, the original version of the function). To really get the new function, you must call it module.function after the reload, or rerun the from:


import module
reload(module)
from module import function
function(1, 2, 3)


Now, the new version of the function will finally run.

As you can see, there are problems inherent in using reload with from: not only do you have to remember to reload after imports, but you also have to remember to rerun your from statements after reloads. This is complex enough to trip up even an expert once in a while.

You should not expect reload and from to play together nicely. The best policy is not to combine them at all—use reload with import, or launch your programs other ways, as suggested in Chapter 3 (e.g., using the Run → Run Module menu option in IDLE, file icon clicks, or system command lines).

				30.4.4.8.7 reload Isn't Applied Transitively

When you reload a module, Python only reloads that particular module's file; it doesn't automatically reload modules that the file being reloaded happens to import. For example, if you reload some module A, and A imports modules B and C, the reload applies only to A, not to B and C. The statements inside A that import B and C are rerun during the reload, but they just fetch the already loaded B and C module objects (assuming they've been imported before). In actual code, here's the file A.py:


import B                    # Not reloaded when A is
import C                    # Just an import of an already loaded module

% python 
>>> . . .
>>> reload(A) 


Don't depend on transitive module reloads—instead, use multiple reload calls to update subcomponents independently. If desired, you can design your systems to reload their subcomponents automatically by adding reload calls in parent modules like A.

Better still, you could write a general tool to do transitive reloads automatically by scanning modules' __dict__ attributes (see "Section 21.7.1" earlier in this chapter) and checking each item's type (see Chapter 9) to find nested modules to reload recursively. Such a utility function could call itself recursively to navigate arbitrarily shaped import dependency chains.

For example, the module reloadall.py listed below has a reload_all function that automatically reloads a module, every module that the module imports, and so on, all the way to the bottom of each import chain. It uses a dictionary to keep track of already reloaded modules; recursion to walk the import chains; and the standard library's types module (introduced at the end of Chapter 9), which simply predefines type results for built-in types.

To use this utility, import its reload_all function, and pass it the name of an already loaded module (like you would the built-in reload function). When the file runs standalone, its self-test code will test itself—it has to import itself because its own name is not defined in the file without an import. I encourage you to study and experiment with this example on your own:


import types

def status(module):
    print 'reloading', module.__name__

def transitive_reload(module, visited):
    if not visited.has_key(module):                   # Trap cycles, dups
        status(module)                                # Reload this module
        reload(module)                               # And visit children
        visited[module] = None
        for attrobj in module.__dict__.values(  ):     # For all attrs
            if type(attrobj) == types.ModuleType:    # Recur if module
                transitive_reload(attrobj, visited)

def reload_all(*args):
    visited = {  }
    for arg in args:
        if type(arg) == types.ModuleType:
            transitive_reload(arg, visited)

if __name__ == '__main__':
    import reloadall                      # Test code: reload myself
    reload_all(reloadall)                 # Should reload this, types


				30.4.4.8.8 Recursive from Imports May Not Work

I saved the most bizarre (and, thankfully, obscure) gotcha for last. Because imports execute a file's statements from top to bottom, you need to be careful when using modules that import each other (known as recursive imports). Because the statements in a module may not all have been run when it imports another module, some of its names may not yet exist.

If you use import to fetch the module as a whole, this may or may not matter; the module's names won't be accessed until you later use qualification to fetch their values. But, if you use from to fetch specific names, you must bear in mind that you will only have access to names in that module that have already been assigned.

For instance, take the following modules, recur1 and recur2. recur1 assigns a name X, and then imports recur2 before assigning the name Y. At this point, recur2 can fetch recur1 as a whole with an import (it already exists in Python's internal modules table), but if it uses from, it will be able to see only the name X; the name Y, which is assigned below the import in recur1, doesn't yet exist, so you get an error:
Code View: Scroll / Show All


# File: recur1.py
X = 1
import recur2                              # Run recur2 now if it doesn't exist
Y = 2

# File: recur2.py
from recur1 import X                       # OK: "X" already assigned
from recur1 import Y                       # Error: "Y" not yet assigned
>>> import recur1 
Traceback (innermost last):
  File "<stdin>", line 1, in ?
  File "recur1.py", line 2, in ?
    import recur2
  File "recur2.py", line 2, in ?
    from recur1 import Y                   # Error: "Y" not yet assigned
ImportError: cannot import name Y

					  


Python avoids rerunning recur1's statements when they are imported recursively from recur2 (or else the imports would send the script into an infinite loop), but recur1's namespace is incomplete when imported by recur2.

The solution? Don't use from in recursive imports (no, really!). Python won't get stuck in a cycle if you do, but your programs will once again be dependent on the order of the statements in the modules.

There are two ways out of this gotcha:

    * You can usually eliminate import cycles like this by careful design—maximizing cohesion, and minimizing coupling are good first steps.
    * If you can't break the cycles completely, postpone module name accesses by using import and qualification (instead of from), or by running your froms either inside functions (instead of at the top level of the module), or near the bottom of your file to defer their execution.

			30.4.4.9 . Chapter Summary
This chapter surveyed some more advanced module-related concepts. We studied data hiding techniques, enabling new language features with the __future__ module, the __name__ usage mode variable, package-relative import syntax, and more. We also explored and summarized module design issues, and looked at common mistakes related to modules to help you avoid them in your code.

The next chapter begins our look at Python's object-oriented programming tool, the class. Much of what we've covered in the last few chapters will apply there, too—classes live in modules, and are namespaces as well, but they add an extra component to attribute lookup called "inheritance search." As this is the last chapter in this part of the book, however, before we dive into that topic, be sure to work through this part's set of lab exercises. And, before that, here is this chapter's quiz to review the topics covered here.

BRAIN BUILDER

Chapter Quiz

Q:	What is significant about variables at the top level of a module whose names begin with a single underscore?
Q:	What does it mean when a module's __name__ variable is the string "__main__"?
Q:	What is the difference between from mypkg import spam and from . import spam?
Q:	If the user interactively types the name of a module to test, how can you import it?
Q:	How is changing sys.path different from setting PYTHONPATH to modify the module search path?
Q:	If the module __future__ allows us to import from the future, can we also import from the past?


Quiz Answers

A:	Variables at the top level of a module whose names begin with a single underscore are not copied out to the importing scope when the from * statement form is used. They can still be accessed by an import, or the normal from statement form, though.
A:	If a module's __name__ variable is the string "__main__", it means that the file is being executed as a top-level script, instead of being imported from another file in the program. That is, the file is being used as a program, not a library.
A:	from mypkg import spam is an absolute import—mypkg is located in an absolute directory in sys.path. from . import spam, on the other hand, is a relative import—spam is looked up relative to the package in which this statement is contained before sys.path is searched.
A:	User input usually comes into a script as a string; to import the referenced module given its string name, you can build and run an import statement with exec, or pass the string name in a call to the __import__ function.
A:	Changing sys.path only affects one running program, and is temporary—the change goes away when the program ends. PYTHONPATH settings live in the operating system—they are picked up globally by all programs on a machine, and changes to these settings endure after programs exit.
A:	No, we can't import from the past in Python. We can install (or stubbornly use) an older version of the language, but the latest Python is generally the best Python.

			30.4.4.10. BRAIN BUILDER
|   1.  Import basics. Write a program that counts the lines and characters in a file (similar in spirit to wc on Unix). With your text editor, code a Python module called mymod.py that exports three top-level names:
|          * A countLines(name) function that reads an input file and counts the number of lines in it (hint: file.readlines does most of the work for you, and len does the rest).
|          * A countChars(name) function that reads an input file and counts the number of characters in it (hint: file.read returns a single string).
|          * A test(name) function that calls both counting functions with a given input filename. Such a filename generally might be passed in, hardcoded, input with raw_input, or pulled from a command line via the sys.argv list; for now, assume it's a passed-in function argument.
|
|      All three mymod functions should expect a filename string to be passed in. If you type more than two or three lines per function, you're working much too hard—use the hints I just gave!
|
|      Next, test your module interactively, using import and name qualification to fetch your exports. Does your PYTHONPATH need to include the directory where you created mymod.py? Try running your module on itself: e.g., test("mymod.py"). Note that test opens the file twice; if you're feeling ambitious, you may be able to improve this by passing an open file object into the two count functions (hint: file.seek(0) is a file rewind).

My answer:
>>> sys.path
['',
 '/usr/lib/python26.zip',
 ...
 '/usr/lib/python2.6/site-packages/gtk-2.0']
>>> os.listdir("/cygdrive/c")
['$Recycle.Bin',
 'ADOBEPATH',
 ...
 'work']
>>> sys.path.append("/cygdrive/c/work/scripts/python/learn/learning_python/")
>>> import wc_api
>>> os.listdir("/cygdrive/c/work/scripts/python/learn/learning_python/")
['adder.py', 'timerseqs.py', 'wc_api.py', 'wc_api.pyc']
>>> wc_api.test("/cygdrive/c/work/scripts/python/learn/learning_python/adder.py")
# lines in /cygdrive/c/work/scripts/python/learn/learning_python/adder.py is 50
# chars in /cygdrive/c/work/scripts/python/learn/learning_python/adder.py is 1117
>>> wc_api.test("/cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py")
# lines in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 14
# chars in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 349


|   2.  from/from *. Test your mymod module from exercise 1 interactively by using from to load the exports directly, first by name, then using the from * variant to fetch everything.

My answer:
>>> from wc_api import test
>>> test("/cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py")
# lines in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 14
# chars in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 349
>>> from wc_api import *
>>> count
countChars(  countLines(  
>>> countChars("/cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py")
349

|   3.  __main__. Add a line in your mymod module that calls the test function automatically only when the module is run as a script, not when it is imported. The line you add will probably test the value of __name__ for the string "__main__" as shown in this chapter. Try running your module from the system command line; then, import the module and test its functions interactively. Does it still work in both modes?
:!python /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py
# lines in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 15
# chars in /cygdrive/c/work/scripts/python/learn/learning_python/wc_api.py is 449

|   4.  Nested imports. Write a second module, myclient.py, that imports mymod, and tests its functions; then, run myclient from the system command line. If myclient uses from to fetch from mymod, will mymod's functions be accessible from the top level of myclient? What if it imports with import instead? Try coding both variations in myclient and test interactively by importing myclient and inspecting its __dict__ attribute.
|   5.  Package imports. Import your file from a package. Create a subdirectory called mypkg nested in a directory on your module import search path, move the mymod.py module file you created in exercise 1 or 3 into the new directory, and try to import it with a package import of the form import mypkg.mymod.
|
|      You'll need to add an __init__.py file in the directory your module was moved to make this go, but it should work on all major Python platforms (that's part of the reason Python uses "." as a path separator). The package directory you create can be simply a subdirectory of the one you're working in; if it is, it will be found via the home directory component of the search path, and you won't have to configure your path. Add some code to your __init__.py, and see if it runs on each import.
|   6.  Reloads. Experiment with module reloads: perform the tests in Chapter 19's changer.py example, changing the called function's message, and/or behavior repeatedly, without stopping the Python interpreter. Depending on your system, you might be able to edit changer in another window, or suspend the Python interpreter, and edit in the same window (on Unix, a Ctrl-Z key combination usually suspends the current process, and an fg command later resumes it).
|   7.  Circular imports.[59] In the section on recursive import gotchas, importing recur1 raised an error. But, if you restart Python, and import recur2 interactively, the error doesn't occur—test and see this for yourself. Why do you think it works to import recur2, but not recur1? (Hint: Python stores new modules in the built-in sys.modules table (a dictionary) before running their code; later imports fetch the module from this table first, whether the module is "complete" yet or not.) Now, try running recur1 as a top-level script file: python recur1.py. Do you get the same error that occurs when recur1 is imported interactively? Why? (Hint: when modules are run as programs, they aren't imported, so this case has the same effect as importing recur2 interactively; recur2 is the first module imported.) What happens when you run recur2 as a script?
|
|          [59] * Note that circular imports are extremely rare in practice. In fact, this author has never coded or come across a circular import in a decade of Python coding. On the other hand, if you can understand why they are a potential problem, you know a lot about Python's import semantics.	

---------------------------------------------------
ANSWERS
---------------------------------------------------
|   1.  Import basics. This one is simpler than you may think. When you're done, your file (mymod.py) and interaction should look similar to the following; remember that Python can read a whole file into a list of line strings, and the len built-in returns the length of strings and lists.


      def countLines(name):
          file = open(name)
          return len(file.readlines(  ))

      def countChars(name):
          return len(open(name).read(  ))

      def test(name):                                   # Or pass file object
          return countLines(name), countChars(name)     # Or return a dictionary

      % python 
      >>> import mymod 
      >>> mymod.test('mymod.py') 
      (10, 291)


      Note that these functions load the entire file in memory all at once, and so won't work for pathologically large files too big for your machine's memory. To be more robust, you could read line by line with iterators instead and count as you go:


      def countLines(name):
          tot = 0
          for line in open(name): tot += 1
          return tot

      def countChars(name):
          tot = 0
          for line in open(name): tot += len(line)
          return tot


      On Unix, you can verify your output with a wc command; on Windows, right-click on your file to view its properties. But note that your script may report fewer characters than Windows does—for portability, Python converts Windows \r\n line-end markers to \n, thereby dropping one byte (character) per line. To match byte counts with Windows exactly, you have to open in binary mode ('rb'), or add the number of bytes corresponding to the number of lines.

      Incidentally, to do the "ambitious" part of this exercise (passing in a file object, so you only open the file once), you'll probably need to use the seek method of the built-in file object. We didn't cover it in the text, but it works just like C's fseek call (and calls it behind the scenes): seek resets the current position in the file to a passed-in offset. After a seek, future input/output operations are relative to the new position. To rewind to the start of a file without closing and reopening it, call file.seek(0); the file read methods all pick up at the current position in the file, so you need to rewind to reread. Here's what this tweak would look like:

      def countLines(file):
          file.seek(0)                                  # Rewind to start of file
          return len(file.readlines(  ))

      def countChars(file):
          file.seek(0)                                  # Ditto (rewind if needed)
          return len(file.read(  ))

      def test(name):
          file = open(name)                             # Pass file object
          return countLines(file), countChars(file)     # Open file only once

      >>> import mymod2 
      >>> mymod2.test("mymod2.py") 
      (11, 392)

      					  


|   2.  from/from *. Here's the from * part; replace * with countChars to do the rest:


      % python
      >>> from mymod import *
      >>> countChars("mymod.py")
      291


|   3.  __main__. If you code it properly, it works in either mode (program run or module import):


      def countLines(name):
          file = open(name)
          return len(file.readlines(  ))

      def countChars(name):
          return len(open(name).read(  ))

      def test(name):                                   # Or pass file object
          return countLines(name), countChars(name)     # Or return a dictionary

      if __name__ == '__main__':
          print test('mymod.py')

      % python mymod.py 
      (13, 346)


|   4.  Nested imports. Here is my solution (file myclient.py):


      from mymod import countLines, countChars
      print countLines('mymod.py'), countChars('mymod.py')

      % python myclient.py
      13 346


      As for the rest of this one, mymod's functions are accessible (that is, importable) from the top level of myclient, since from simply assigns to names in the importer (it works almost as though mymod's defs appeared in myclient). For example, another file can say this:


      import myclient
      myclient.countLines(...)

      from myclient import countChars
      countChars(...)


      If myclient used import instead of from, you'd need to use a path to get to the functions in mymod through myclient:


      import myclient
      myclient.mymod.countLines(...)

      from myclient import mymod
      mymod.countChars(...)


      In general, you can define collector modules that import all the names from other modules so they're available in a single convenience module. Using the following code, you wind up with three different copies of the name somename (mod1.somename, collector.somename, and __main__.somename); all three share the same integer object initially, and only the name somename exists at the interactive prompt as is:

      # File: mod1.py
      somename = 42

      # File: collector.py
      from mod1 import *                                # Collect lots of names here
      from mod2 import *                                # from assigns to my names
      from mod3 import *

      >>> from collector import somename 

      					  


|   5.  Package imports. For this, I put the mymod.py solution file listed for exercise 3 into a directory package. The following is what I did to set up the directory and its required __init__.py file in a Windows console interface; you'll need to interpolate for other platforms (e.g., use mv and vi instead of move and edit). This works in any directory (I just happened to run my commands in Python's install directory), and you can do some of this from a file explorer GUI, too.

      When I was done, I had a mypkg subdirectory that contained the files __init__.py and mymod.py. You need an __init__.py in the mypkg directory, but not in its parent; mypkg is located in the home directory component of the module search path. Notice how a print statement coded in the directory's initialization file fires only the first time it is imported, not the second:


      C:\python25> mkdir mypkg 
      C:\Python25> move mymod.py mypkg\mymod.py 
      C:\Python25> edit mypkg\__init__.py ...coded a print statement... 
      C:\Python25> python 
      >>> import mypkg.mymod 
      initializing mypkg
      >>> mypkg.mymod.countLines('mypkg\mymod.py') 
      13
      >>> from mypkg.mymod import countChars 
      >>> countChars('mypkg\mymod.py') 
      346


|   6.  Reloads. This exercise just asks you to experiment with changing the changer.py example in the book, so there's nothing to show here.
|   7.  Circular imports. The short story is that importing recur2 first works because the recursive import then happens at the import in recur1, not at a from in recur2.

      The long story goes like this: importing recur2 first works because the recursive import from recur1 to recur2 fetches recur2 as a whole, instead of getting specific names. recur2 is incomplete when imported from recur1, but because it uses import instead of from, you're safe: Python finds and returns the already created recur2 module object, and continues to run the rest of recur1 without a glitch. When the recur2 import resumes, the second from finds the name Y in recur1 (it's been run completely), so no error is reported. Running a file as a script is not the same as importing it as a module; these cases are the same as running the first import or from in the script interactively. For instance, running recur1 as a script is the same as importing recur2 interactively, as recur2 is the first module imported in recur1.

	30.5. Classes and OOP
So far in this book, we've been using the term "object" generically. Really, the code written up to this point has been object-based—we've passed objects around our scripts, used them in expressions, called their methods, and so on. For our code to qualify as being truly object-oriented (OO), though, our objects will generally need to also participate in something called an inheritance hierarchy.

This chapter begins our exploration of the Python class—a device used to implement new kinds of objects in Python that support inheritance. Classes are Python's main object-oriented programming (OOP) tool, so we'll also look at OOP basics along the way in this part of the book. OOP offers a different and often more effective way of looking at programming, in which we factor code to minimize redundancy, and write new programs by customizing existing code instead of changing it in-place.

In Python, classes are created with a new statement: the class statement. As you'll see, the objects defined with classes can look a lot like the built-in types we studied earlier in the book. In fact, classes really just apply and extend the ideas we've already covered; roughly, they are packages of functions that largely use and process built-in object types. Classes, though, are designed to create and manage new objects, and they also support inheritance—a mechanism of code customization and reuse above and beyond anything we've seen so far.

One note up front: in Python, OOP is entirely optional, and you don't need to use classes just to get started. In fact, you can get plenty of work done with simpler constructs such as functions, or even simple top-level script code. Because using classes well requires some up-front planning, they tend to be of more interest to people who work in strategic mode (doing long-term product development) than to people who work in tactical mode (where time is in very short supply).

Still, as you'll see in this part of the book, classes turn out to be one of the most useful tools Python provides. When used well, classes can actually cut development time radically. They're also employed in popular Python tools like the Tkinter GUI API, so most Python programmers will usually find at least a working knowledge of class basics helpful.

		30.5.1. OOP: The Big Picture

			30.5.1.1 Why Use Classes?

Remember when I told you that programs "do things with stuff"? In simple terms, classes are just a way to define new sorts of stuff, reflecting real objects in a program's domain. For instance, suppose we decide to implement that hypothetical pizza-making robot we used as an example in Chapter 15. If we implement it using classes, we can model more of its real-world structure and relationships. Two aspects of OOP prove useful here:


Inheritance

    Pizza-making robots are kinds of robots, so they possess the usual robot-y properties. In OOP terms, we say they "inherit" properties from the general category of all robots. These common properties need to be implemented only once for the general case, and can be reused by all types of robots we may build in the future.

Composition

    Pizza-making robots are really collections of components that work together as a team. For instance, for our robot to be successful, it might need arms to roll dough, motors to maneuver to the oven, and so on. In OOP parlance, our robot is an example of composition; it contains other objects that it activates to do its bidding. Each component might be coded as a class, which defines its own behavior and relationships.

			30.5.1.2 OOP from 30,000 Feet 

Before we see what this all means in terms of code, I'd like to say a few words about the general ideas behind OOP. If you've never done anything object-oriented in your life before now, some of the terminology in this chapter may seem a bit perplexing on the first pass. Moreover, the motivation for these terms may be elusive until you've had a chance to study the ways that programmers apply them in larger systems. OOP is as much an experience as a technology.

				30.5.1.2.1 Attribute Inheritance Search

The good news is that OOP is much simpler to understand and use in Python than in other languages such as C++ or Java. As a dynamically typed scripting language, Python removes much of the syntactic clutter and complexity that clouds OOP in other tools. In fact, most of the OOP story in Python boils down to this expression:

			30.5.1.3 Chapter Summary

We took an abstract look at classes and OOP in this chapter, taking in the big picture before we dive into syntax details. As we've seen, OOP is mostly about looking up attributes in trees of linked objects; we call this lookup an inheritance search. Objects at the bottom of the tree inherit attributes from objects higher up in the tree—a feature that enables us to program by customizing code, rather than changing it, or starting from scratch. When used well, this model of programming can cut development time radically.

The next chapter will begin to fill in the coding details behind the picture painted here. As we get deeper into Python classes, though, keep in mind that the OOP model in Python is very simple; as I've already stated, it's really just about looking up attributes in object trees. Before we move on, here's a quick quiz to review what we've covered here.

		30.5.2. Class Coding Basis
Now that we've talked about OOP in the abstract, it's time to see how this translates to actual code. This chapter and the next will fill in the syntax details behind the class model in Python.

If you've never been exposed to OOP in the past, classes can seem somewhat complicated if taken in a single dose. To make class coding easier to absorb, we'll begin our detailed exploration of OOP by taking a first look at some basic classes in action in this chapter. We'll expand on the details introduced here in later chapters of this part of the book, but in their basic form, Python classes are easy to understand.

Classes have three primary distinctions. At a base level, they are mostly just namespaces, much like the modules we studied in Part 5. But, unlike modules, classes also have support for generating multiple objects, for namespace inheritance, and for operator overloading. Let's begin our class statement tour by exploring each of these three distinctions in turn.

			30.5.2.1 Classes Generate Multiple Instance Objects
To understand how the multiple objects idea works, you have to first understand that there are two kinds of objects in Python's OOP model: class objects, and instance objects. Class objects provide default behavior, and serve as factories for instance objects. Instance objects are the real objects your programs process—each is a namespace in its own right, but inherits (i.e., has automatic access to) names in the class from which it was created. Class objects come from statements, and instances from calls; each time you call a class, you get a new instance of that class.

This object-generation concept is very different from any of the other program constructs we've seen so far in this book. In effect, classes are factories for generating multiple instances. By contrast, only one copy of each module is ever imported into a single program (in fact, one reason that we have to call reload is to update the single module object so that changes are reflected once they've been made).

The following is a quick summary of the bare essentials of Python OOP. As you'll see, Python classes are in some ways similar to both defs and modules, but they may be quite different from what you're used to in other languages.

				30.5.2.1.1 Class Objects Provide Default Behavior

When we run a class statement, we get a class object. Here's a rundown of the main properties of Python classes:

    * The classs tatement creates a class object and assigns it a name. Just like the function def statement, the Python class statement is an executable statement. When reached and run, it generates a new class object, and assigns it to the name in the class header. Also, like defs, class statements typically run when the files they are coded in are first imported.
    * Assignments inside classs tatements make class attributes. Just like in module files, top-level assignments within a class statement (not nested in a def) generate attributes in a class object. Technically, the class statement scope morphs into the attribute namespace of the class object, just like a module's global scope. After running a class statement, class attributes are accessed by name qualification: object.name.
    * Class attributes provide object state and behavior. Attributes of a class object record state information and behavior to be shared by all instances created from the class; function def statements nested inside a class generate methods, which process instances.

				30.5.2.1.2 Instance Objects Are Concrete Items

When we call a class object, we get an instance object. Here's an overview of the key points behind class instances:

    * Calling a class object like a function makes a new instance object. Each time a class is called, it creates and returns a new instance object. Instances represent concrete items in your program's domain.
    * Each instance object inherits class attributes and gets its own namespace. Instance objects created from classes are new namespaces; they start out empty, but inherit attributes that live in the class objects from which they were generated.
    * Assignments to attributes of self in methods make per-instance attributes. Inside class method functions, the first argument (called self by convention) references the instance object being processed; assignments to attributes of self create or change data in the instance, not the class.

				30.5.2.1.3 A First Example

Let's turn to a real example to show how these ideas work in practice. To begin, let's define a class named FirstClass by running a Python class statement interactively:


>>> class FirstClass:  # Define a class object
...     def setdata(self, value):  # Define class methods
...         self.data = value  # self is the instance
...     def display(self): 
...         print self.data  # self.data: per instance
...


We're working interactively here, but typically, such a statement would be run when the module file it is coded in is imported. Like functions created with defs, this class won't even exist until Python reaches and runs this statement.

Like all compound statements, the class starts with a header line that lists the class name, followed by a body of one or more nested and (usually) indented statements. Here, the nested statements are defs; they define functions that implement the behavior the class means to export. As we've learned, def is really an assignment; here, it assigns function objects to the names set data and display in the class statement's scope, and so generates attributes attached to the class: FirstClass.setdata, and FirstClass.display. In fact, any name assigned at the top level of the class's nested block becomes an attribute of the class.

Functions inside a class are usually called methods. They're normal defs, and they support everything we've learned about functions already (they can have defaults, return values, and so on). But, in a method function, the first argument automatically receives an implied instance object when called—the subject of the call. We need to create a couple of instances to see how this works:


>>> x = FirstClass(  )  # Make two instances
>>> y = FirstClass(  )  # Each is a new namespace


By calling the class this way (notice the parentheses), we generate instance objects, which are just namespaces that have access to their class' attributes. Properly speaking, at this point, we have three objects—two instances, and a class. Really, we have three linked namespaces, as sketched in Figure 23-1. In OOP terms, we say that x "is a" FirstClass, as is y.

Figure 23-1. Classes and instances are linked namespace objects in a class tree that is searched by inheritance. Here, the "data" attribute is found in instances, but "setdata" and "display" are in the class above them.


The two instances start empty, but have links back to the class from which they were generated. If we qualify an instance with the name of an attribute that lives in the class object, Python fetches the name from the class by inheritance search (unless it also lives in the instance):


>>> x.setdata("King Arthur")  # Call methods: self is x
>>> y.setdata(3.14159)  # Runs: FirstClass.setdata(y, 3.14159)


Neither x nor y has a setdata attribute of its own, so to find it, Python follows the link from instance to class. And that's about all there is to inheritance in Python: it happens at attribute qualification time, and it just involves looking up names in linked objects (e.g., by following the is-a links in Figure 23-1).

In the setdata function inside FirstClass, the value passed in is assigned to self.data. Within a method, self—the name given to the leftmost argument by convention—automatically refers to the instance being processed (x or y), so the assignments store values in the instances' namespaces, not the class' (that's how the data names in Figure 23-1 are created).

Because classes generate multiple instances, methods must go through the self argument to get to the instance to be processed. When we call the class' display method to print self.data, we see that it's different in each instance; on the other hand, the name display itself is the same in x and y, as it comes (is inherited) from the class:


>>> x.display(  )  # self.data differs in each instance
King Arthur
>>> y.display(  ) 
3.14159


Notice that we stored different object types in the data member in each instance (a string, and a floating point). As with everything else in Python, there are no declarations for instance attributes (sometimes called members); they spring into existence the first time they are assigned values, just like simple variables. In fact, if we were to call display on one of our instances before calling setdata, we would trigger an undefined name error—the attribute named data doesn't even exist in memory until it is assigned within the setdata method.

As another way to appreciate how dynamic this model is, consider that we can change instance attributes in the class itself, by assigning to self in methods, or outside the class, by assigning to an explicit instance object:


>>> x.data = "New value"  # Can get/set attributes
>>> x.display(  )  # Outside the class too
New value


Although less common, we could even generate a brand new attribute in the instance's namespace by assigning to its name outside the class's method functions:


>>> x.anothername = "spam"  # Can set new attributes here too


This would attach a new attribute called anothername, which may or may not be used by any of the class' methods to the instance object x. Classes usually create all of the instance's attributes by assignment to the self argument, but they don't have to; programs can fetch, change, or create attributes on any objects to which they have references.

			30.5.2.2 Classes Are Customized by Inheritance
Besides serving as factories for generating multiple instance objects, classes also allow us to make changes by introducing new components (called subclasses), instead of changing existing components in-place. Instance objects generated from a class inherit the class' attributes. Python also allows classes to inherit from other classes, opening the door to coding hierarchies of classes that specialize behavior by overriding existing attributes lower in the hierarchy. Here, too, there is no parallel with modules: their attributes live in a single, flat namespace.

In Python, instances inherit from classes, and classes inherit from superclasses. Here are the key ideas behind the machinery of attribute inheritance:

    * Superclasses are listed in parentheses in aclassheader. To inherit attributes from another class, just list the class in parentheses in a class statement's header. The class that inherits is called a subclass, and the class that is inherited from is its superclass.
    * Classes inherit attributes from their superclasses. Just as instances inherit the attribute names defined in their classes, classes inherit all the attribute names defined in their superclasses; Python finds them automatically when they're accessed, if they don't exist in the subclasses.
    * Instances inherit attributes from all accessible classes. Each instance gets names from the class it's generated from, as well as all of that class' superclasses. When looking for a name, Python checks the instance, then its class, then all superclasses.
    * Each object.attribute reference invokes a new, independent search. Python performs an independent search of the class tree for each attribute fetch expression. This includes references to instances and classes made outside class statements (e.g., X.attr), as well as references to attributes of the self instance argument in class method functions. Each self.attr expression in a method invokes a new search for attr in self and above.
    * Logic changes are made by subclassing, not by changing superclasses. By redefining superclass names in subclasses lower in the hierarchy (tree), subclasses replace and thus customize inherited behavior.

The net effect, and the main purpose of all this searching, is that classes support factoring and customization of code better than any other language tool we've seen so far. On the one hand, they allow us to minimize code redundancy (and so reduce maintenance costs) by factoring operations into a single, shared implementation; on the other, they allow us to program by customizing what already exists, rather than changing it in-place or starting from scratch.

				30.5.2.2.1 A Second Example

This next example builds on the previous one. First, we'll define a new class, SecondClass, that inherits all of FirstClass' names and provides one of its own:


>>> class SecondClass(FirstClass):  # Inherits setdata
...     def display(self):  # Changes display
...         print 'Current value = "%s"' % self.data 
...


SecondClass defines the display method to print with a different format. By defining an attribute with the same name as an attribute in FirstClass, SecondClass effectively replaces the display attribute in its superclass.

Recall that inheritance searches proceed upward from instances, to subclasses, to superclasses, stopping at the first appearance of the attribute name that it finds. In this case, since the display name in SecondClass will be found before the one in FirstClass, we say that SecondClass overrides FirstClass's display. Sometimes we call this act of replacing attributes by redefining them lower in the tree overloading.

The net effect here is that SecondClass specializes FirstClass, by changing the behavior of the display method. On the other hand, SecondClass (and any instances created from it) still inherits the setdata method in FirstClass verbatim. Let's make an instance to demonstrate:


>>> z = SecondClass(  ) 
>>> z.setdata(42)  # Finds setdata in FirstClass
>>> z.display(  )  # Finds overridden method in SecondClass
Current value = "42"


As before, we make a SecondClass instance object by calling it. The setdata call still runs the version in FirstClass, but this time the display attribute comes from SecondClass and prints a custom message. Figure 23-2 sketches the namespaces involved.

Figure 23-2. Specialization by overriding inherited names by redefining them in extensions lower in the class tree. Here, SecondClass redefines and so customizes the "display" method for its instances.


Here's a very important thing to notice about OOP: the specialization introduced in SecondClass is completely external to FirstClass. That is, it doesn't affect existing or future FirstClass objects, like the x from the prior example:


>>> x.display(  )  # x is still a FirstClass instance (old message)
New value


Rather than changing FirstClass, we customized it. Naturally, this is an artificial example, but as a rule, because inheritance allows us to make changes like this in external components (i.e., in subclasses), classes often support extension and reuse better than functions or modules can.

				30.5.2.2.2 Classes Are Attributes in Modules

Before we move on, remember that there's nothing magic about a class name. It's just a variable assigned to an object when the class statement runs, and the object can be referenced with any normal expression. For instance, if our FirstClass was coded in a module file instead of being typed interactively, we could import it and use its name normally in a class header line:


from modulename import FirstClass           # Copy name into my scope
class SecondClass(FirstClass):              # Use class name directly
    def display(self): ...


Or, equivalently:


import modulename                           # Access the whole module
class SecondClass(modulename.FirstClass):   # Qualify to reference
    def display(self): ...


Like everything else, class names always live within a module, and so must follow all the rules we studied in Part 5. For example, more than one class can be coded in a single module file—like other statements in a module, class statements are run during imports to define names, and these names become distinct module attributes. More generally, each module may arbitrarily mix any number of variables, functions, and classes, and all names in a module behave the same way. The file food.py demonstrates:


# food.py
var = 1                                       # food.var
def func(  ):                                 # food.func
    ...
class spam:                                 # food.spam
    ...
class ham:                                  # food.ham
    ...
class eggs:                                 # food.eggs
    ...


This holds true even if the module and class happen to have the same name. For example, given the following file, person.py:


class person:
   ...


we need to go through the module to fetch the class as usual:


import person                                 # Import module
x = person.person(  )                         # Class within module


Although this path may look redundant, it's required: person.person refers to the person class inside the person module. Saying just person gets the module, not the class, unless the from statement is used:


from person import person                     # Get class from module
x = person(  )                                # Use class name


Like any other variable, we can never see a class in a file without first importing and somehow fetching it from its enclosing file. If this seems confusing, don't use the same name for a module and a class within it.

Also, keep in mind that although classes and modules are both namespaces for attaching attributes, they correspond to very different source code structures: a module reflects an entire file, but a class is a statement within a file. We'll say more about such distinctions later in this part of the book.

			30.5.2.3 Classes Can Intercept Python Operators
Now, let's take a look at the third major difference between classes and modules: operator overloading. In simple terms, operator overloading lets objects coded with classes intercept and respond to operations that work on built-in types: addition, slicing, printing, qualification, and so on. It's mostly just an automatic dispatch mechanism: expressions and other built-in operations route control to implementations in classes. Here, too, there is nothing similar in modules: modules can implement function calls, but not the behavior of expressions.

Although we could implement all class behavior as method functions, operator overloading lets objects be more tightly integrated with Python's object model. Moreover, because operator overloading makes our own objects act like built-ins, it tends to foster object interfaces that are more consistent and easier to learn, and it allows class-based objects to be processed by code written to expect a built-in type's interface. Here is a quick rundown of the main ideas behind overloading operators:

    * Methods named with double underscores (__X__) are special hooks. Python operator overloading is implemented by providing specially named methods to intercept operations. The Python language defines a fixed and unchangeable mapping from each of these operations to a specially named method.
    * Such methods are called automatically when instances appear in built-in operations. For instance, if an instance object inherits an __add__ method, that method is called whenever the object appears in a + expression. The method's return value becomes the result of the corresponding expression.
    * Classes may override most built-in type operations. There are dozens of special operator overloading method names for intercepting and implementing nearly every operation available for built-in types. This includes expressions, but also basic operations like printing and object creation.
    * There are no defaults for operator overloading methods, and none are required. If a class does not define or inherit an operator overloading method, it just means that the corresponding operation is not supported for the class' instances. If there is no __add__, for example, + expressions raise exceptions.
    * Operators allow classes to integrate with Python's object model. By overloading type operations, user-defined objects implemented with classes act just like built-ins, and so provide consistency as well as compatibility with expected interfaces.

Operator overloading is an optional feature; it's used primarily by people developing tools for other Python programmers, not by application developers. And, candidly, you probably shouldn't try to use it just because it seems "cool." Unless a class needs to mimic built-in type interfaces, it should usually stick to simpler named methods. Why would an employee database application support expressions like * and +, for example? Named methods like giveRaise and promote would usually make more sense.

Because of this, we won't go into details on every operator overloading method available in Python in this book. Still, there is one operator overloading method you are likely to see in almost every realistic Python class: the __init__ method, which is known as the constructor method, and is used to initialize objects' state. You should pay special attention to this method, because __init__, along with the self argument, turns out to be one of the keys to understanding OOP code in Python.

				30.5.2.3.1 A Third Example

On to another example. This time, we'll define a subclass of SecondClass that implements three specially named attributes that Python will call automatically: __init__ is called when a new instance object is being constructed (self is the new ThirdClass object), and __add__ and __mul__ are called when a ThirdClass instance appears in a + or * expression, respectively. Here's our new subclass:


>>> class ThirdClass(SecondClass):  # Is a SecondClass
...     def __init__(self, value):  # On "ThirdClass(value)"
...         self.data = value 
...     def __add__(self, other):  # On "self + other"
...         return ThirdClass(self.data + other) 
...     def __mul__(self, other): 
...         self.data = self.data * other  # On "self * other"
...
>>> a = ThirdClass("abc")  # New __init__ called
>>> a.display(  )  # Inherited method
Current value = "abc"

>>> b = a + 'xyz'  # New __add__: makes a new instance
>>> b.display(  ) 
Current value = "abcxyz"

>>> a * 3  # New __mul__: changes instance in-place
>>> a.display(  ) 
Current value = "abcabcabc"


ThirdClass "is a" SecondClass, so its instances inherit the display method from SecondClass. But, ThirdClass generation calls pass an argument now (e.g., "abc"); it's passed to the value argument in the __init__ constructor and assigned to self.data there. Further, ThirdClass objects can show up in + and * expressions; Python passes the instance object on the left to the self argument, and the value on the right to other, as illustrated in Figure 23-3.

Figure 23-3. In operator overloading, expression operators and other built-on operations performed on class instances are mapped back to specially named methods in the class. These special methods are optional, and may be inherited as usual. Here, a "*" expression triggers the "_mul_" method.


Specially named methods such as __init__ and __add__ are inherited by subclasses and instances, just like any other names assigned in a class. If the methods are not coded in a class, Python looks for such names in all its superclasses, as usual. Operator overloading method names are also not built-in or reserved words; they are just attributes that Python looks for when objects appear in various contexts. Python usually calls them automatically, but they may occasionally be called by your code as well (more on this later; the __init__ method, for example, is often called manually to trigger superclass constructors).

Notice that the __add__ method makes and returns a new instance object of its class (by calling ThirdClass with the result value), but __mul__ changes the current instance object in-place (by reassigning the self attribute). This is different from the behavior of built-in types such as numbers and strings, which always make new objects for the * operator. Because operator overloading is really just an expression-to-method dispatch mechanism, you can interpret operators any way you like in your own class objects.[63]

    [63] * But you probably shouldn't. Common practice dictates that overloaded operators should work the same way the built-in operator implementations do. In this case, that means our __mul__ method should also return a new object as its result, rather than changing the instance (self) in place; for in-place changes, a mul method call may be better style than a * overload here (e.g., a.mul(3) instead of a * 3).

				30.5.2.3.2 Why Use Operator Overloading?

As a class designer, you can choose to use operator overloading or not. Your choice simply depends on how much you want your object to look and feel like a built-in type. As mentioned earlier, if you omit an operator overloading method, and do not inherit it from a superclass, the corresponding operation will not be supported for your instances; if it's attempted, an exception will be thrown (or a standard default will be used).

Frankly, many operator overloading methods tend to be used only when implementing objects that are mathematical in nature; a vector or matrix class may overload the addition operator, for example, but an employee class likely would not. For simpler classes, you might not use overloading at all, and would rely instead on explicit method calls to implement your objects' behavior.

On the other hand, you might decide to use operator overloading if you need to pass a user-defined object to a function that was coded to expect the operators available on a built-in type like a list or a dictionary. Implementing the same operator set in your class will ensure that your objects support the same expected object interface, and so are compatible with the function.

One overloading method seems to show up in almost every realistic class: the __init__ constructor method. Because it allows classes to fill out the attributes in their newly created instances immediately, the constructor is useful for almost every kind of class you might code. In fact, even though instance attributes are not declared in Python, you can usually find out which attributes an instance will have by inspecting its class' __init__ method code. We won't go into too much detail on this advanced feature in this book, but we'll see some additional inheritance and operator overloading techniques in action in Chapter 24.

			30.5.2.4 The World's Simplest Python Class
We've begun studying class statement syntax in detail in this chapter, but I'd again like to remind you that the basic inheritance model that classes produce is very simple—all it really involves is searching for attributes in trees of linked objects. In fact, we can create a class with nothing in it at all. The following statement makes a class with no attributes attached (an empty namespace object):


>>> class rec: pass  # Empty namespace object


We need the no-operation pass statement (discussed in Chapter 13) here because we don't have any methods to code. After we make the class by running this statement interactively, we can start attaching attributes to the class by assigning names to it completely outside of the original class statement:


>>> rec.name = 'Bob'  # Just objects with attributes
>>> rec.age  = 40 


And, after we've created these attributes by assignment, we can fetch them with the usual syntax. When used this way, a class is roughly similar to a "struct" in C, or a "record" in Pascal—an object with field names attached to it (we can do similar work with dictionary keys, but it requires extra characters):


>>> print rec.name  # Like a C struct or a record
Bob


Notice that this works even though there are no instances of the class yet; classes are objects in their own right, even without instances. In fact, they are just self-contained namespaces, so as long as we have a reference to a class, we can set or change its attributes anytime we wish. Watch what happens when we do create two instances, though:


>>> x = rec(  )  # Instances inherit class names
>>> y = rec(  ) 


These instances begin their lives as completely empty namespace objects. Because they remember the class they were made from, though, they will obtain the attributes we attached to the class by inheritance:


>>> x.name, y.name  # Name is stored on the class only here
('Bob', 'Bob')


Really, these instances have no attributes of their own; they simply fetch the name attribute from the class object where it is stored. If we do assign an attribute to an instance, though, it creates (or changes) the attribute in that object, and no other—attribute references kick off inheritance searches, but attribute assignments affect only the objects in which the attributes are assigned. Here, x gets its own name, but y still inherits the name attached to the class above it:


>>> x.name = 'Sue'  # But assignment changes x only
>>> rec.name, x.name, y.name 
('Bob', 'Sue', 'Bob')


In fact, as we'll explore in more detail in the next chapter, the attributes of a namespace object are usually implemented as dictionaries, and class inheritance trees are (generally speaking) just dictionaries with links to other dictionaries. If you know where to look, you can see this explicitly. The __dict__ attribute is the namespace dictionary for most class-based objects:


>>> rec.__dict__.keys(  )
['age', '__module__', '__doc__', 'name']

>>> x.__dict__.keys(  )
['name']

>>> y.__dict__.keys(  )
[]


Here, the class' dictionary shows the name and age attributes we assigned to it, x has its own name, and y is still empty. Each instance has a link to its class for inheritance, though—it's called __class__, if you want to inspect it:


>>> x.__class__
<class __main__.rec at 0x00BAFF60>


Classes also have a __bases__ attribute, which is a tuple of their superclasses; these two attributes are how class trees are literally represented in memory by Python.

The main point to take away from this look under the hood is that Python's class model is extremely dynamic. Classes and instances are just namespace objects, with attributes created on the fly by assignment. Those assignments usually happen within the class statements you code, but they can occur anywhere you have a reference to one of the objects in the tree.

Even methods, normally created by a def nested in a class, can be created completely independent of any class object. The following, for example, defines a simple function outside of any class that takes one argument:


>>> def upperName(self): 
...     return self.name.upper(  )  # Still needs a self


There is nothing about a class here yet—it's a simple function, and it can be called as such at this point, provided we pass in an object with a name attribute (the name self does not make this special in any way). If we assign this simple function to an attribute of our class, though, it becomes a method, callable through any instance (as well as through the class name itself, as long as we pass in an instance manually):[64]

    [64] * In fact, this is one of the reasons the self argument must always be explicit in Python methods—because methods can be created as simple functions independent of a class, they need to make the implied instance argument explicit. Python cannot otherwise guess that a simple function might eventually become a class method. The main reason for the explicit self argument, though, is to make the meanings of names more obvious: names not referenced through self are simple variables, while names referenced through self are obviously instance attributes.


>>> rec.method = upperName 

>>> x.method(  )  # Run  method to process x
'SUE'

>>> y.method(  )  # Same, but  pass y to self
'BOB'

>>> rec.method(x)  # Can call through instance or class
'SUE'


Normally, classes are filled out by class statements, and instance attributes are created by assignments to self attributes in method functions. The point again, though, is that they don't have to be; OOP in Python really is mostly about looking up attributes in linked namespace objects.

			30.5.2.5 Chapter Summary
This chapter introduced the basics of coding classes in Python. We studied the syntax of the class statement, and saw how to use it to build up a class inheritance tree. We also studied how Python automatically fills in the first argument in method functions, how attributes are attached to objects in a class tree by simple assignment, and how specially named operator overloading methods intercept and implement built-in operations for our instances (e.g., expressions and printing).

In the next chapter, we'll continue our look at class coding, taking a second pass over the model to fill in some of the details that were omitted here to keep things simple. We'll also start to explore some larger and more realistic classes. First, though, let's work through a quiz to review the basics we've covered so far.

BRAIN BUILDER

Chapter Quiz

Q:	How are classes related to modules?
Q:	How are instances and classes created?
Q:	Where and how are class attributes created?
Q:	Where and how are instance attributes created?
Q:	What does self mean in a Python class?
Q:	How is operator overloading coded in a Python class?
Q:	When might you want to support operator overloading in your classes?
Q:	Which operator overloading method is most commonly used?
Q:	What are the two most important concepts in Python OOP code?


Quiz Answers

A:	Classes are always nested inside a module; they are attributes of a module object. Classes and modules are both namespaces, but classes correspond to statements (not entire files), and support the OOP notions of multiple instances, inheritance, and operator overloading. In a sense, a module is like a single-instance class without inheritance that corresponds to an entire file of code.
A:	Classes are made by running class statements; instances are created by calling a class as though it were a function.
A:	Class attributes are created by assigning attributes to a class object. They are normally generated by top-level assignments nested in a class statement—each name assigned in the class statement block becomes an attribute of the class object (technically, the class statement scope morphs into the class object's attribute namespace). Class attributes can also be created, though, by assigning attributes to the class anywhere a reference to the class object exists—i.e., even outside the class statement.
A:	Instance attributes are created by assigning attributes to an instance object. They are normally created within class method functions inside the class statement by assigning attributes to the self argument (which is always the implied instance). Again, though, they may be created by assignment anywhere a reference to the instance appears, even outside the class statement. Normally, all instance attributes are initialized in the __init__ constructor method; that way, later method calls can assume the attributes already exist.
A:	self is the name commonly given to the first (leftmost) argument in a class method function; Python automatically fills it in with the instance object that is the implied subject of the method call. This argument need not be called self; its position is what is significant. (Ex-C++ or Java programmers might prefer to call it this because in those languages that name reflects the same idea; in Python, though, this argument must always be explicit.)
A:	Operator overloading is coded in a Python class with specially named methods; they all begin and end with double underscores to make them unique. These are not built-in or reserved names; Python just runs them automatically when an instance appears in the corresponding operation. Python defines the mappings from operations to special method names.
A:	Operator overloading is useful to implement objects that resemble built-in types (e.g., sequences or numeric objects such as matrixes), and to mimic the built-in type interface expected by a piece of code. Mimicking built-in type interfaces enables you to pass in class instances that also have state information—i.e., attributes that remember data between operation calls. You shouldn't use operator overloading when a simple named method will suffice, though.
A:	The __init__ constructor method is the most commonly used; almost every class uses this method to set initial values for instance attributes and perform other startup tasks.
A:	The special self argument in method functions and the __init__ constructor method are the two cornerstones of OOP code in Python.

		30.5.3. Class Coding Details
If you did not understand all of Chapter 23, don't worry; now that we've had a quick tour, we're going to dig a bit deeper and study the concepts introduced earlier in further detail. In this chapter, we'll take another look at classes and methods, inheritance, and operator overloading, formalizing and expanding on some of the class coding ideas introduced in Chapter 23. Because the class is our last namespace tool, we'll summarize the concepts of namespaces in Python here as well. This chapter will also present some larger and more realistic classes than those we have seen so far, including a final example that ties together much of what we've learned about OOP.
			30.5.3.1 The class Statement
Although the Python class statement may seem similar to tools in other OOP languages on the surface, on closer inspection, it is quite different from what some programmers are used to. For example, as in C++, the class statement is Python's main OOP tool, but unlike in C++, Python's class is not a declaration. Like a def, a class statement is an object builder, and an implicit assignment—when run, it generates a class object, and stores a reference to it in the name used in the header. Also, like a def, a class statement is true executable code—your class doesn't exist until Python reaches and runs the class statement that defines it (typically while importing the module it is coded in, but not before).

				30.5.3.1.1 General Form

class is a compound statement, with a body of indented statements typically appearing under the header. In the header, superclasses are listed in parentheses after the class name, separated by commas. Listing more than one superclass leads to multiple inheritance (which we'll discuss further in the next chapter). Here is the statement's general form:


class <name>(superclass,...):         # Assign to name
    data = value                            # Shared class data
    def method(self,...):                    # Methods
        self.member = value                    # Per-instance data


Within the class statement, any assignments generate class attributes, and specially named methods overload operators; for instance, a function called __init__ is called at instance object construction time, if defined.

				30.5.3.1.2 Example

As we've seen, classes are mostly just namespaces—that is, tools for defining names (i.e., attributes) that export data and logic to clients. So, how do you get from the class statement to a namespace?

Here's how. Just like in a module file, the statements nested in a class statement body create its attributes. When Python executes a class statement (not a call to a class), it runs all the statements in its body, from top to bottom. Assignments that happen during this process create names in the class' local scope, which become attributes in the associated class object. Because of this, classes resemble both modules and functions:

    * Like functions, class statements are local scopes where names created by nested assignments live.
    * Like names in a module, names assigned in a class statement become attributes in a class object.

The main distinction for classes is that their namespaces are also the basis of inheritance in Python; reference attributes that are not found in a class or instance object are fetched from other classes.

Because class is a compound statement, any sort of statement can be nested inside its body—print, =, if, def, and so on. All the statements inside the class statement run when the class statement itself runs (not when the class is later called to make an instance). Assigning names inside the class statement makes class attributes, and nested defs make class methods, but other assignments make attributes, too.

For example, assignments of simple nonfunction objects to class attributes produce data attributes, shared by all instances:


>>> class SharedData: 
...     spam = 42  # Generates a class data attribute
...
>>> x = SharedData(  )  # Make two instances
>>> y = SharedData(  ) 
>>> x.spam, y.spam  # They inherit and share spam
(42, 42)


Here, because the name spam is assigned at the top level of a class statement, it is attached to the class, and so will be shared by all instances. We can change it by going through the class name, and refer to it through either instances or the class.[65]

    [65] * If you've used C++ you may recognize this as similar to the notion of C++'s "static" data members—members that are stored in the class, independent of instances. In Python, it's nothing special: all class attributes are just names assigned in the class statement, whether they happen to reference functions (C++'s "methods") or something else (C++'s "members").


>>> SharedData.spam = 99
>>> x.spam, y.spam, SharedData.spam
(99, 99, 99)


Such class attributes can be used to manage information that spans all the instances—a counter of the number of instances generated, for example (we'll expand on this idea in Chapter 26). Now, watch what happens if we assign the name spam through an instance instead of the class:


>>> x.spam = 88
>>> x.spam, y.spam, SharedData.spam
(88, 99, 99)


Assignments to instance attributes create or change the names in the instance, rather than in the shared class. More generally, inheritance searches occur only on attribute references, not on assignment: assigning to an object's attribute always changes that object, and no other.[66] For example, y.spam is looked up in the class by inheritance, but the assignment to x.spam attaches a name to x itself.

    [66] † Unless the class has redefined the attribute assignment operation to do something unique with the __setattr__ operator overloading method.

Here's a more comprehensive example of this behavior that stores the same name in two places. Suppose we run the following class:


class MixedNames:                            # Define class
    data = 'spam'                            # Assign class attr
    def __init__(self, value):             # Assign method name
        self.data = value                    # Assign instance attr
    def display(self):
        print self.data, MixedNames.data     # Instance attr, class attr


This class contains two defs, which bind class attributes to method functions. It also contains an = assignment statement; because this assignment assigns the name data inside the class, it lives in the class' local scope, and becomes an attribute of the class object. Like all class attributes, this data is inherited, and shared by all instances of the class that don't have data attributes of their own.

When we make instances of this class, the name data is attached to those instances by the assignment to self.data in the constructor method:
Code View: Scroll / Show All


>>> x = MixedNames(1)  # Make two instance objects
>>> y = MixedNames(2)  # Each has its own data
>>> x.display(  ); y.display(  )  # self.data differs, MixedNames.data is the same
1 spam
2 spam

					  


The net result is that data lives in two places: in the instance objects (created by the self.data assignment in __init__), and in the class from which they inherit names (created by the data assignment in the class). The class' display method prints both versions, by first qualifying the self instance, and then the class.

By using these techniques to store attributes in different objects, we determine their scope of visibility. When attached to classes, names are shared; in instances, names record per-instance data, not shared behavior or data. Although inheritance searches look up names for us, we can always get to an attribute anywhere in a tree by accessing the desired object directly.

In the preceding example, for instance, specifying x.data or self.data will return an instance name, which normally hides the same name in the class; however, MixedNames.data grabs the class name explicitly. We'll see various roles for such coding patterns later; the next section describes one of the most common.

			30.5.3.2 Methods
Because you already know about functions, you also know about methods in classes. Methods are just function objects created by def statements nested in a class statement's body. From an abstract perspective, methods provide behavior for instance objects to inherit. From a programming perspective, methods work in exactly the same way as simple functions, with one crucial exception: a method's first argument always receives the instance object that is the implied subject of the method call.

In other words, Python automatically maps instance method calls to class method functions as follows. Method calls made through an instance, like this:


instance.method(args...)


are automatically translated to class method function calls of this form:


class.method(instance, args...)


where the class is determined by locating the method name using Python's inheritance search procedure. In fact, both call forms are valid in Python.

Besides the normal inheritance of method attribute names, the special first argument is the only real magic behind method calls. In a class method, the first argument is usually called self by convention (technically, only its position is significant, not its name). This argument provides methods with a hook back to the instance that is the subject of the call—because classes generate many instance objects, they need to use this argument to manage data that varies per instance.

C++ programmers may recognize Python's self argument as being similar to C++'s this pointer. In Python, though, self is always explicit in your code: methods must always go through self to fetch or change attributes of the instance being processed by the current method call. This explicit nature of self is by design—the presence of this name makes it obvious that you are using instance attribute names in your script, not names in the local or global scope.

				30.5.3.2.1 Example

To clarify these concepts, let's turn to an example. Suppose we define the following class:


class NextClass:                            # Define class
    def printer(self, text):                # Define method
        self.message = text                 # Change instance
        print self.message                  # Access instance


The name printer references a function object; because it's assigned in the class statement's scope, it becomes a class object attribute, and is inherited by every instance made from the class. Normally, because methods like printer are designed to process instances, we call them through instances:


>>> x = NextClass(  )  # Make instance

>>> x.printer('instance call')  # Call its method
instance call

>>> x.message  # Instance changed
'instance call'


When we call it by qualifying an instance like this, printer is first located by inheritance, and then its self argument is automatically assigned the instance object (x); the text argument gets the string passed at the call ('instance call'). Notice that because Python automatically passes the first argument to self for us, we only actually have to pass in one argument. Inside printer, the name self is used to access or set per-instance data because it refers back to the instance currently being processed.

Methods may be called in one of two ways—through an instance, or through the class itself. For example, we can also call printer by going through the class name, provided we pass an instance to the self argument explicitly:


>>> NextClass.printer(x, 'class call')  # Direct class call
class call

>>> x.message  # Instance changed again
'class call'


Calls routed through the instance and the class have the exact same effect, as long as we pass the same instance object ourselves in the class form. By default, in fact, you get an error message if you try to call a method without any instance:
Code View: Scroll / Show All


>>> NextClass.printer('bad call')
TypeError: unbound method printer(  ) must be called with NextClass instance...

					  


				30.5.3.2.2 Calling Superclass Constructors

Methods are normally called through instances. Calls to methods through the class, though, do show up in a variety of special roles. One common scenario involves the constructor method. The __init__ method, like all attributes, is looked up by inheritance. This means that at construction time, Python locates and calls just one __init__. If subclass constructors need to guarantee that superclass construction-time logic runs, too, they generally must call the superclass's __init__ method explicitly through the class:
Code View: Scroll / Show All


class Super:
    def __init__(self, x):
        ...default code...

class Sub(Super):
    def __init__(self, x, y):
        Super.__init__(self, x)                                        # Run
superclass __init__
        ...custom code...                   # Do my init actions

I = Sub(1, 2)

					  


This is one of the few contexts in which your code is likely to call an operator overloading method directly. Naturally, you should only call the superclass constructor this way if you really want it to run—without the call, the subclass replaces it completely. For a more realistic illustration of this technique in action, stay tuned for the final example in this chapter.[67]

    [67] * On a somewhat related note, you can also code multiple __init__ methods within the same class, but only the last definition will be used; see Chapter 25 for more details.

				30.5.3.2.3 Other Method Call Possibilities

This pattern of calling methods through a class is the general basis of extending (instead of completely replacing) inherited method behavior. In Chapter 26, we'll also meet a new option added in Python 2.2, static methods, that allow you to code methods that do not expect instance objects in their first arguments. Such methods can act like simple instanceless functions, with names that are local to the classes in which they are coded. This is an advanced and optional extension, though; normally, you must always pass an instance to a method, whether it is called through an instance or a class.


			30.5.3.3 Inheritance
The whole point of a namespace tool like the class statement is to support name inheritance. This section expands on some of the mechanisms and roles of attribute inheritance in Python.

In Python, inheritance happens when an object is qualified, and it involves searching an attribute definition tree (one or more namespaces). Every time you use an expression of the form object.attr (where object is an instance or class object), Python searches the namespace tree from bottom to top, beginning with object, looking for the first attr it can find. This includes references to self attributes in your methods. Because lower definitions in the tree override higher ones, inheritance forms the basis of specialization.

				30.5.3.3.1 Attribute Tree Construction

Figure 24-1 summarizes the way namespace trees are constructed and populated with names. Generally:

    * Instance attributes are generated by assignments to self attributes in methods.
    * Class attributes are created by statements (assignments) in class statements.
    * Superclass links are made by listing classes in parentheses in a class statement header.

Figure 24-1. Program code creates a tree of objects in memory to be searched by attribute inheritance. Calling a class creates a new instance that remembers its class, running a class statement creates a new class, and superclasses are listed in parentheses in the class statement header. Each attribute reference triggers a new bottom-up tree search—even self attributes within a class' methods


The net result is a tree of attribute namespaces that leads from an instance, to the class it was generated from, to all the superclasses listed in the class header. Python searches upward in this tree, from instances to superclasses, each time you use qualification to fetch an attribute name from an instance object.[68]

    [68] * This description isn't 100 percent complete because we can also create instance and class attributes by assigning to objects outside class statements—but that's a much less common and sometimes more error-prone approach (changes aren't isolated to class statements). In Python, all attributes are always accessible by default; we'll talk more about name privacy in Chapter 26

				30.5.3.3.2 Specializing Inherited Methods

The tree-searching model of inheritance just described turns out to be a great way to specialize systems. Because inheritance finds names in subclasses before it checks superclasses, subclasses can replace default behavior by redefining their superclasses' attributes. In fact, you can build entire systems as hierarchies of classes, which are extended by adding new external subclasses rather than changing existing logic in-place.

The idea of redefining inherited names leads to a variety of specialization techniques. For instance, subclasses may replace inherited attributes completely, provide attributes that a superclass expects to find, and extend superclass methods by calling back to the superclass from an overridden method. We've already seen replacement in action. Here's an example that shows how extension works:


>>> class Super: 
...     def method(self): 
...         print 'in Super.method' 
...
>>> class Sub(Super): 
...     def method(self):  # Override method
...         print 'starting Sub.method'  # Add actions here
...         Super.method(self)  # Run default action
...         print 'ending Sub.method' 
...


Direct superclass method calls are the crux of the matter here. The Sub class replaces Super's method function with its own specialized version. But, within the replacement, Sub calls back to the version exported by Super to carry out the default behavior. In other words, Sub.method just extends Super.method's behavior, rather than replacing it completely:


>>> x = Super(  )  # Make a Super instance
>>> x.method(  )  # Runs Super.method
in Super.method

>>> x = Sub(  )  # Make a Sub instance
>>> x.method(  )  # Runs Sub.method, which calls Super.method
starting Sub.method
in Super.method
ending Sub.method


This extension coding pattern is also commonly used with constructors; see the earlier section, "Section 24.2," for an example.

				30.5.3.3.3 Class Interface Techniques

Extension is only one way to interface with a superclass. The file shown below, specialize.py, defines multiple classes that illustrate a variety of common techniques:


Super

    Defines a method function and a delegate that expects an action in a subclass.

Inheritor

    Doesn't provide any new names, so it gets everything defined in Super.

Replacer

    Overrides Super's method with a version of its own.

Extender

    Customizes Super's method by overriding and calling back to run the default.

Provider

    Implements the action method expected by Super's delegate method.

Study each of these subclasses to get a feel for the various ways they customize their common superclass. Here's the file:
Code View: Scroll / Show All


class Super:
    def method(self):
        print 'in Super.method'             # Default behavior
    def delegate(self):
        self.action(  )                     # Expected to be defined

class Inheritor(Super):                    # Inherit method verbatim
    pass

class Replacer(Super):                     # Replace method completely
    def method(self):
        print 'in Replacer.method'

class Extender(Super):                     # Extend method behavior
    def method(self):
        print 'starting Extender.method'
        Super.method(self)
        print 'ending Extender.method'

class Provider(Super):                     # Fill in a required method
    def action(self):
        print 'in Provider.action'

if __name__ == '__main__':
    for klass in (Inheritor, Replacer, Extender):
        print '\n' + klass.__name__ + '...'
        klass(  ).method(  )
    print '\nProvider...'
    x = Provider(  )
    x.delegate(  )

					  


A few things are worth pointing out here. First, the self-test code at the end of this example creates instances of three different classes in a for loop. Because classes are objects, you can put them in a tuple, and create instances generically (more on this idea later). Classes also have the special __name__ attribute, like modules; it's preset to a string containing the name in the class header. Here's what happens when we run the file:


% python specialize.py

Inheritor...
in Super.method

Replacer...
in Replacer.method

Extender...
starting Extender.method
in Super.method
ending Extender.method

Provider...
in Provider.action

				30.5.3.3.4 Abstract Superclasses

Notice how the Provider class in the prior example works. When we call the delegate method through a Provider instance, two independent inheritance searches occur:

   a.  On the initial x.delegate call, Python finds the delegate method in Super by searching the Provider instance and above. The instance x is passed into the method's self argument as usual.
   b.  Inside the Super.delegate method, self.action invokes a new, independent inheritance search of self and above. Because self references a Provider instance, the action method is located in the Provider subclass.

This "filling in the blanks" sort of coding structure is typical of OOP frameworks. At least in terms of the delegate method, the superclass in this example is what is sometimes called an abstract superclass—a class that expects parts of its behavior to be provided by its subclasses. If an expected method is not defined in a subclass, Python raises an undefined name exception when the inheritance search fails. Class coders sometimes make such subclass requirements more obvious with assert statements, or by raising the built-in NotImplementedError exception:


class Super:
    def method(self):
        print 'in Super.method'
    def delegate(self):
        self.action(  )
    def action(self):
        assert 0, 'action must be defined!'


We'll meet assert in Chapter 27; in short, if its expression evaluates to false, it raises an exception with an error message. Here, the expression is always false (0) so as to trigger an error message if a method is not redefined, and inheritance locates the version here. Alternatively, some classes simply raise a NotImplemented exception directly in such method stubs. We'll study the raise statement in Chapter 27.

For a somewhat more realistic example of this section's concepts in action, see exercise 8 at the end of Chapter 26, and its solution in "Section B.6" (in Appendix B). Such taxonomies are a traditional way to introduce OOP, but they're a bit removed from most developers' job descriptions.

			30.5.3.4 Operator Overloading

We looked briefly at operator overloading in the prior chapter; here, we'll fill in more details, and look at a few commonly used overloading methods. Here's a review of the key ideas behind overloading:

    * Operator overloading lets classes intercept normal Python operations.
    * Classes can overload all Python expression operators.
    * Classes can also overload operations such as printing, function calls, attribute qualifications, etc.
    * Overloading makes class instances act more like built-in types.
    * Overloading is implemented by providing specially named class methods.

Let's look at a simple example of overloading at work. If certain specially named methods are provided in a class, Python automatically calls them when instances of the class appear in expressions related to the associated operations. For instance, the Number class in the following file, number.py, provides a method to intercept instance construction (__init__), as well as one for catching subtraction expressions (__sub__). Special methods such as these are the hooks that let you tie into built-in operations:


class Number:
    def __init__(self, start):                 # On Number(start)
        self.data = start
    def __sub__(self, other):                  # On instance - other
        return Number(self.data - other)     # Result is a new instance

>>> from number import Number  # Fetch class from module
>>> X = Number(5)  # Number.__init__(X, 5)
>>> Y = X - 2  # Number.__sub__(X, 2)
>>> Y.data  # Y is new Number instance
3


As discussed previously, the __init__ constructor method seen in this code is the most commonly used operator overloading method in Python; it's present in most classes. In this section, we will sample some of the other tools available in this domain, and look at example code that applies them in common use cases.

				30.5.3.4.1 Common Operator Overloading Methods

Just about everything you can do to built-in objects such as integers and lists has a corresponding specially named method for overloading in classes. Table 24-1 lists a few of the most common; there are many more. In fact, many overloading methods come in multiple versions (e.g., __add__, __radd__, and __iadd__ for addition). See other Python books, or the Python language reference manual, for an exhaustive list of the special method names available.

Table 24-1. Common operator overloading methods
Method 	Overloads 	Called for
__init__ 	Constructor 	Object creation: X = Class( )
__del__ 	Destructor 	Object reclamation
__add__ 	Operator + 	X + Y, X += Y
__or__ 	Operator | (bitwise OR) 	X | Y, X |= Y
__repr__,__str__ 	Printing, conversions 	print X, repr(X), str(X)
__call__ 	Function calls 	X( )
__getattr__ 	Qualification 	X.undefined
__setattr__ 	Attribute assignment 	X.any = value
__getitem__ 	Indexing 	X[key], for loops and other iterations if no __iter__
__setitem__ 	Index assignment 	X[key] = value
__len__ 	Length 	len(X), truth tests
__cmp__ 	Comparison 	X == Y, X < Y
__lt__ 	Specific comparison 	X < Y (or else __cmp__)
__eq__ 	Specific comparison 	X == Y (or else __cmp__)
__radd__ 	Right-side operator + 	Noninstance + X
__iadd__ 	In-place (augmented) addition 	X += Y (or else __add__)
__iter__ 	Iteration contexts 	for loops, in tests, list comprehensions, map, others

All overloading methods have names that start and end with two underscores to keep them distinct from other names you define in your classes. The mappings from special method names to expressions or operations are predefined by the Python language (and documented in the standard language manual). For example, the name __add__ always maps to + expressions by Python language definition, regardless of what an __add__ method's code actually does.

All operator overloading methods are optional—if you don't code one, that operation is simply unsupported by your class (and may raise an exception if attempted). Most overloading methods are used only in advanced programs that require objects to behave like built-ins; the __init__ constructor tends to appear in most classes, however. We've already met the __init__ initialization-time constructor method, and a few of the others in Table 24-1. Let's explore some of the additional methods in the table by example.

				30.5.3.4.2 __getitem__ Intercepts Index References

The __getitem__ method intercepts instance-indexing operations. When an instance X appears in an indexing expression like X[i], Python calls the __getitem__ method inherited by the instance (if any), passing X to the first argument, and the index in brackets to the second argument. For instance, the following class returns the square of an index value:


>>> class indexer: 
...     def __getitem__(self, index): 
...         return index ** 2 
...
>>> X = indexer(  ) 
>>> X[2]  # X[i] calls __getitem__(X, i).
4
>>> for i in range(5): 

...     print X[i], 
...
0 1 4 9 16


				30.5.3.4.3 __getitem__ and __iter__ Implement Iteration

Here's a trick that isn't always obvious to beginners, but turns out to be incredibly useful. The for statement works by repeatedly indexing a sequence from zero to higher indexes, until an out-of-bounds exception is detected. Because of that, __getitem__ also turns out to be one way to overload iteration in Python—if this method is defined, for loops call the class' __getitem__ each time through, with successively higher offsets. It's a case of "buy one, get one free"—any built-in or user-defined object that responds to indexing also responds to iteration:


>>> class stepper: 
...     def __getitem__(self, i): 
...         return self.data[i] 
...
>>> X = stepper(  )  # X is a stepper object
>>> X.data = "Spam" 
>>>
>>> X[1]  # Indexing calls __getitem__
'p'
>>> for item in X:  # for loops call __getitem__
...     print item,  # for indexes items 0..N
...
S p a m


In fact, it's really a case of "buy one, get a bunch free." Any class that supports for loops automatically supports all iteration contexts in Python, many of which we've seen in earlier chapters (see Chapter 13 for other iteration contexts). For example, the in membership test, list comprehensions, the map built-in, list and tuple assignments, and type constructors will also call __getitem__ automatically, if it's defined:


>>> 'p' in X  # All call __getitem__ too
True

>>> [c for c in X]  # List comprehension
['S', 'p', 'a', 'm']

>>> map(None, X)  # map calls
['S', 'p', 'a', 'm']

>>> (a, b, c, d) = X  # Sequence assignments
>>> a, c, d 
('S', 'a', 'm')

>>> list(X), tuple(X), ''.join(X) 
(['S', 'p', 'a', 'm'], ('S', 'p', 'a', 'm'), 'Spam')

>>> X 
<__main__.stepper instance at 0x00A8D5D0>


In practice, this technique can be used to create objects that provide a sequence interface and to add logic to built-in sequence type operations; we'll revisit this idea when extending built-in types in Chapter 26.

				30.5.3.4.4 User-Defined Iterators

Today, all iteration contexts in Python will try the __iter__ method first, before trying __getitem__. That is, they prefer the iteration protocol we learned about in Chapter 13 to repeatedly indexing an object; if the object does not support the iteration protocol, indexing is attempted instead.

Technically, iteration contexts work by calling the iter built-in function to try to find an __iter__ method, which is expected to return an iterator object. If it's provided, Python then repeatedly calls this iterator object's next method to produce items until a StopIteration exception is raised. If no such __iter__ method is found, Python falls back on the __getitem__ scheme, and repeatedly indexes by offsets as before, until an IndexError exception is raised.

In the new scheme, classes implement user-defined iterators by simply implementing the iterator protocol introduced in Chapter 13 and Chapter 17 (refer back to those chapters for more background details on iterators). For example, the following file, iters.py, defines a user-defined iterator class that generates squares:
Code View: Scroll / Show All


class Squares:
    def __init__(self, start, stop):   # Save state when created
        self.value = start - 1
        self.stop  = stop
    def __iter__(self):                  # Get iterator object on iter(  )
        return self
    def next(self):                    # Return a square on each iteration
        if self.value == self.stop:
            raise StopIteration
        self.value += 1
        return self.value ** 2

% python 
>>> from iters import Squares 
>>> for i in Squares(1, 5):  # for calls iter(  ), which calls __iter__(  )
...     print i,  # Each iteration calls next(  )
...
1 4 9 16 25

					  


Here, the iterator object is simply the instance self because the next method is part of this class. In more complex scenarios, the iterator object may be defined as a separate class and object with its own state information to support multiple active iterations over the same data (we'll see an example of this in a moment). The end of the iteration is signaled with a Python raise statement (more on raising exceptions in the next part of this book).

An equivalent coding with __getitem__ might be less natural because the for would then iterate through all offsets zero and higher; the offsets passed in would be only indirectly related to the range of values produced (0..N would need to map to start..stop). Because __iter__ objects retain explicitly managed state between next calls, they can be more general than __getitem__.

On the other hand, __iter__-based iterators can sometimes be more complex and less convenient than __getitem__. They are really designed for iteration, not random indexing—in fact, they don't overload the indexing expression at all:


>>> X = Squares(1, 5)
>>> X[1]
AttributeError: Squares instance has no attribute '__getitem__'


The __iter__ scheme is also the implementation for all the other iteration contexts we saw in action for __getitem__ (membership tests, type constructors, sequence assignment, and so on). However, unlike __getitem__, __iter__ is designed for a single traversal, not many. For example, the Squares class is a one-shot iteration; once iterated, it's empty. You need to make a new iterator object for each new iteration:


>>> X = Squares(1, 5) 
>>> [n for n in X]  # Exhausts items
[1, 4, 9, 16, 25]
>>> [n for n in X]  # Now it's empty
[]
>>> [n for n in Squares(1, 5)]  # Make a new iterator object
[1, 4, 9, 16, 25]
>>> list(Squares(1, 3)) 
[1, 4, 9]


Notice that this example would probably be simpler if coded with generator functions (a topic introduced in Chapter 17 and related to iterators):
Code View: Scroll / Show All


>>> from __future__ import generators  # Needed in Python 2.2, but not later
>>>
>>> def gsquares(start, stop): 
...     for i in range(start, stop+1): 
...         yield i ** 2 
...
>>> for i in gsquares(1, 5): 
...     print i, 
...
1 4 9 16 25

					  


Unlike the class, the function automatically saves its state between iterations. Of course, for this artificial example, you could, in fact, skip both techniques and simply use a for loop, map, or list comprehension to build the list all at once. The best and fastest way to accomplish a task in Python is often also the simplest:


>>> [x ** 2 for x in range(1, 6)]
[1, 4, 9, 16, 25]


However, classes may be better at modeling more complex iterations, especially when they can benefit from state information and inheritance hierarchies. The next section explores one such use case.

					30.5.3.4.4.1 Multiple iterators on one object

Earlier, I mentioned that the iterator object may be defined as a separate class with its own state information to support multiple active iterations over the same data. Consider what happens when we step across a built-in type like a string:


>>> S = 'ace'
>>> for x in S:
...     for y in S:
...         print x + y,
...
aa ac ae ca cc ce ea ec ee


Here, the outer loop grabs an iterator from the string by calling iter, and each nested loop does the same to get an independent iterator. Because each active iterator has its own state information, each loop can maintain its own position in the string, regardless of any other active loops. To achieve the same effect with user-defined iterators, __iter__ simply needs to define a new stateful object for the iterator, instead of returning self.

The following, for instance, defines an iterator class that skips every other item on iterations; because the iterator object is created anew for each iteration, it supports multiple active loops:
Code View: Scroll / Show All


class SkipIterator:
    def __init__(self, wrapped):
        self.wrapped = wrapped                    # Iterator state information
        self.offset  = 0
    def next(self):
        if self.offset >= len(self.wrapped):      # Terminate iterations
            raise StopIteration
        else:
            item = self.wrapped[self.offset]      # else return and skip
            self.offset += 2
            return item

class SkipObject:
    def __init__(self, wrapped):                    # Save item to be used
        self.wrapped = wrapped
    def __iter__(self):
        return SkipIterator(self.wrapped)         # New iterator each time

if __name__ == '__main__':
    alpha = 'abcdef'
    skipper = SkipObject(alpha)                   # Make container object
    I = iter(skipper)                             # Make an iterator on it
    print I.next(), I.next(  ), I.next(  )              # Visit offsets 0, 2, 4

    for x in skipper:               # for calls __iter__ automatically
        for y in skipper:           # Nested fors call __iter__ again each time
            print x + y,            # Each iterator has its own state, offset

					  


When run, this example works like the nested loops with built-in strings—each active loop has its own position in the string because each obtains an independent iterator object that records its own state information:


% python skipper.py
a c e
aa ac ae ca cc ce ea ec ee


By contrast, our earlier Squares example supports just one active iteration, unless we call Squares again in nested loops to obtain new objects. Here, there is just one SkipObject, with multiple iterator objects created from it.

As before, we could achieve similar results with built-in tools—for example, slicing with a third bound to skip items:


>>> S = 'abcdef' 
>>> for x in S[::2]: 
...     for y in S[::2]:  # New objects on each iteration
...         print x + y, 
...
aa ac ae ca cc ce ea ec ee


This isn't quite the same, though, for two reasons. First, each slice expression here will physically store the result list all at once in memory; iterators, on the other hand, produce just one value at a time, which can save substantial space for large result lists. Second, slices produce new objects, so we're not really iterating over the same object in multiple places here. To be closer to the class, we would need to make a single object to step across by slicing ahead of time:


>>> S = 'abcdef' 
>>> S = S[::2] 
>>> S 
'ace'
>>> for x in S: 
...     for y in S:  # Same object, new iterators
...         print x + y, 
...
aa ac ae ca cc ce ea ec ee


This is more similar to our class-based solution, but it still stores the slice result in memory all at once (there is no generator form of slicing today), and it's only equivalent for this particular case of skipping every other item.

Because iterators can do anything a class can do, they are much more general than this example may imply. Whether our applications require such generality, user-defined iterators are a powerful tool—they allow us to make arbitrary objects look and feel like the other sequences and iterables we have met in this book. We could use this technique with a database object, for example, to make iterations to database fetches, with multiple cursors into the same query result.

				30.5.3.4.5 __getattr__ and __setattr__ Catch Attribute References

The __getattr__ method intercepts attribute qualifications. More specifically, it's called with the attribute name as a string whenever you try to qualify an instance with an undefined (nonexistent) attribute name. It is not called if Python can find the attribute using its inheritance tree search procedure. Because of its behavior, __getattr__ is useful as a hook for responding to attribute requests in a generic fashion. For example:


>>> class empty: 
...     def __getattr__(self, attrname): 
...         if attrname == "age": 
...             return 40 
...         else: 
...             raise AttributeError, attrname 
...
>>> X = empty(  ) 
>>> X.age 
40
>>> X.name ...error text omitted... 
AttributeError: name


Here, the empty class and its instance X have no real attributes of their own, so the access to X.age gets routed to the __getattr__ method; self is assigned the instance (X), and attrname is assigned the undefined attribute name string ("age"). The class makes age look like a real attribute by returning a real value as the result of the X.age qualification expression (40). In effect, age becomes a dynamically computed attribute.

For attributes that the class doesn't know how to handle, this __getattr__ raises the built-in AttributeError exception to tell Python that these are bona fide undefined names; asking for X.name triggers the error. You'll see __getattr__ again when we see delegation and properties at work in the next two chapters, and I'll say more about exceptions in Part 7.

A related overloading method, __setattr__, intercepts all attribute assignments. If this method is defined, self.attr = value becomes self.__setattr__('attr', value). This is a bit trickier to use because assigning to any self attributes within __setattr__ calls __setattr__ again, causing an infinite recursion loop (and eventually, a stack overflow exception!). If you want to use this method, be sure that it assigns any instance attributes by indexing the attribute dictionary, discussed in the next section. Use self.__dict__['name'] = x, not self.name = x:


>>> class accesscontrol: 
...     def __setattr__(self, attr, value): 
...         if attr == 'age' :
...             self.__dict__[attr] = value 
...         else: 
...             raise AttributeError, attr + ' not allowed' 
...
>>> X = accesscontrol(  ) 
>>> X.age = 40  # Calls __setattr__
>>> X.age 
40
>>> X.name = 'mel' ...text omitted... 
AttributeError: name not allowed


These two attribute-access overloading methods allow you to control or specialize access to attributes in your objects. They tend to play highly specialized roles, some of which we'll explore later in this book.

				30.5.3.4.6 Emulating Privacy for Instance Attributes

The following code generalizes the previous example, to allow each subclass to have its own list of private names that cannot be assigned to its instances:
Code View: Scroll / Show All


class PrivateExc(Exception): pass                   # More on exceptions later

class Privacy:
    def __setattr__(self, attrname, value):      # On self.attrname = value
        if attrname in self.privates:
            raise PrivateExc(attrname, self)
        else:
            self.__dict__[attrname] = value      # Self.attrname = value loops!
class Test1(Privacy):
    privates = ['age']

class Test2(Privacy):
    privates = ['name', 'pay']
    def __init__(self):
        self.__dict__['name'] = 'Tom'

x = Test1(  )
y = Test2(  )

x.name = 'Bob'
y.name = 'Sue'   # <== fails

y.age  = 30
x.age  = 40      # <== fails

					  


In fact, this is first-cut solution for an implementation of attribute privacy in Python (i.e., disallowing changes to attribute names outside a class). Although Python doesn't support private declarations per se, techniques like this can emulate much of their purpose. This is a partial solution, though; to make it more effective, it must be augmented to allow subclasses to set private attributes too and to use __getattr__ and a wrapper (sometimes called a proxy) class to check for private attribute fetches.

I'll leave the complete solution as a suggested exercise, because even though privacy can be emulated this way, it almost never is in practice. Python programmers are able to write large OOP frameworks and applications without private declarations—an interesting finding about access controls in general that is beyond the scope of our purposes here.

Catching attribute references and assignments is generally a useful technique; it supports delegation, a design technique that allows controller objects to wrap up embedded objects, add new behaviors, and route other operations back to the wrapped objects (more on delegation and wrapper classes in the next chapter).

				30.5.3.4.7 __repr__ and __str__ Return String Representations

The next example exercises the __init__ constructor, and the __add__ overload method we've already seen, but also defines a __repr__ method that returns a string representation for instances. String formatting is used to convert the managed self.data object to a string. If defined, __repr__ (or its sibling, __str__) is called automatically when class instances are printed or converted to strings. These methods allow you to define a better display format for your objects than the default instance display:


>>> class adder: 
...     def __init__(self, value=0): 
...         self.data = value  # Initialize data
...     def __add__(self, other): 
...         self.data += other  # Add other in-place
...
>>> class addrepr(adder):  # Inherit __init__, __add__
...     def __repr__(self):  # Add string representation
...         return 'addrepr(%s)' % self.data  # Convert to string as code
...
>>> x = addrepr(2)  # Runs __init__
>>> x + 1  # Runs __add__
>>> x  # Runs __repr__
addrepr(3)
>>> print x  # Runs __repr__
addrepr(3)
>>> str(x), repr(x)  # Runs __repr__
('addrepr(3)', 'addrepr(3)')


So why two display methods? Roughly, __str__ is tried first for user-friendly displays, such as the print statement, and the str built-in function. The __repr__ method should in principle return a string that could be used as executable code to re-create the object; it's used for interactive prompt echoes, and the repr function. If no __str__ is present, Python falls back on __repr__ (but not vice versa):


>>> class addstr(adder): 
...     def __str__(self):  # __str__ but no __repr__
...         return '[Value: %s]' % self.data  # Convert to nice string
...
>>> x = addstr(3) 
>>> x + 1 
>>> x  # Default repr
<__main__.addstr instance at 0x00B35EF0>
>>> print x  # Runs __str__
[Value: 4]
>>> str(x), repr(x) 
('[Value: 4]', '<__main__.addstr instance at 0x00B35EF0>')


Because of this, __repr__ may be best if you want a single display for all contexts. By defining both methods, though, you can support different displays in different contexts—for example, an end-user display with __str__, and a low-level display for programmers to use during development with __repr__:


>>> class addboth(adder): 
...     def __str__(self): 
...         return '[Value: %s]' % self.data  # User-friendly string
...     def __repr__(self): 
...         return 'addboth(%s)' % self.data  # As-code string
...
>>> x = addboth(4) 
>>> x + 1 
>>> x  # Runs __repr__
addboth(5)
>>> print x  # Runs __str__
[Value: 5]
>>> str(x), repr(x) 
('[Value: 5]', 'addboth(5)')


In practice, __str__ (or its low-level relative, __repr__) seems to be the second most commonly used operator overloading method in Python scripts, behind __init__; any time you can print an object and see a custom display, one of these two tools is probably in use.

				30.5.3.4.8 __radd__ Handles Right-Side Addition

Technically, the __add__ method that appeared in the prior example does not support the use of instance objects on the right side of the + operator. To implement such expressions, and hence support commutative-style operators, code the __radd__ method as well. Python calls __radd__ only when the object on the right side of the + is your class instance, but the object on the left is not an instance of your class. The __add__ method for the object on the left is called instead in all other cases:


>>> class Commuter: 
...     def __init__(self, val): 
...         self.val = val 
...     def __add__(self, other): 
...         print 'add', self.val, other 
...     def __radd__(self, other): 
...         print 'radd', self.val, other 
...
>>> x = Commuter(88) 
>>> y = Commuter(99) 
>>> x + 1  # __add__: instance + noninstance
add 88 1
>>> 1 + y  # __radd__: noninstance + instance
radd 99 1
>>> x + y  # __add__: instance + instance
add 88 <__main__.Commuter instance at 0x0086C3D8>


Notice how the order is reversed in __radd__: self is really on the right of the +, and other is on the left. Every binary operator has a similar right-side overloading method (e.g., __mul__ and __rmul__). Typically, a right-side method like __radd__ just converts if needed, and reruns a + to trigger __add__, where the main logic is coded. Also, note that x and y are instances of the same class here; when instances of different classes appear mixed in an expression, Python prefers the class of the one on the left.

Right-side methods are an advanced topic, and tend to be fairly rarely used in practice; you only code them when you need operators to be commutative, and then only if you need to support operators at all. For instance, a Vector class may use these tools, but an Employee or Button class probably would not.

				30.5.3.4.9 __call__ Intercepts Calls

The __call__ method is called when your instance is called. No, this isn't a circular definition—if defined, Python runs a __call__ method for function call expressions applied to your instances. This allows class instances to emulate the look and feel of things like functions:


>>> class Prod:
...     def __init__(self, value):
...         self.value = value
...     def __call__(self, other):
...         return self.value * other
...
>>> x = Prod(2)
>>> x(3)
6
>>> x(4)
8


In this example, the __call__ may seem a bit gratuitous. A simple method provides similar utility:


>>> class Prod:
...     def __init__(self, value):
...         self.value = value
...     def comp(self, other):
...         return self.value * other
...
>>> x = Prod(3)
>>> x.comp(3)
9
>>> x.comp(4)
12


However, __call__ can become more useful when interfacing with APIs that expect functions—it allows us to code objects that conform to an expected function call interface, but also retain state information. In fact, it's probably the third most commonly used operator overloading method, behind the __init__ constructor, and the __str__ and __repr__ display-format alternatives.

				30.5.3.4.10 Function Interfaces and Callback-Based Code

As an example, the Tkinter GUI toolkit, which we'll meet later in this book, allows you to register functions as event handlers (a.k.a. callbacks); when events occur, Tkinter calls the registered objects. If you want an event handler to retain state between events, you can register either a class' bound method, or an instance that conforms to the expected interface with __call__. In this section's code, both x.comp from the second example, and x from the first, can pass as function-like objects this way.

I'll have more to say about bound methods in the next chapter, but for now, here's a hypothetical example of __call__ applied to the GUI domain. The following class defines an object that supports a function-call interface, but also has state information that remembers the color a button should change to when it is later pressed:
Code View: Scroll / Show All


class Callback:
    def __init__(self, color):               # Function + state information
        self.color = color
    def __call__(self):                      # Support calls with no arguments
        print 'turn', self.color

					  


Now, in the context of a GUI, we can register instances of this class as event handlers for buttons, even though the GUI expects to be able to invoke event handlers as simple functions with no arguments:


cb1 = Callback('blue')                       # 'Remember' blue
cb2 = Callback('green')

B1 = Button(command=cb1)                     # Register handlers
B2 = Button(command=cb2)                     # Register handlers


When the button is later pressed, the instance object is called as a simple function, exactly like in the following calls. Because it retains state as instance attributes, though, it remembers what to do:


cb1(  )                                        # On events: prints 'blue'
cb2(  )                                        # Prints 'green'


In fact, this is probably the best way to retain state information in the Python language—better than the techniques discussed earlier for functions (global variables, enclosing-function scope references, and default mutable arguments). With OOP, the state remembered is made explicit with attribute assignments.

Before we move on, there are two other ways that Python programmers sometimes tie information to a callback function like this. One option is to use default arguments in lambda functions:


cb3 = (lambda color='red': 'turn ' + color)  # Or: defaults
print cb3(  )


The other is to use bound methods of a class—a kind of object that remembers the self instance and the referenced function, such that it may be called as a simple function without an instance later:
Code View: Scroll / Show All


class Callback:
    def __init__(self, color):                # Class with state information
        self.color = color
    def changeColor(self):                   # A normal named method
        print 'turn', self.color

cb1 = Callback('blue')
cb2 = Callback('yellow')

B1 = Button(command=cb1.changeColor)         # Reference, but don't call
B2 = Button(command=cb2.changeColor)         # Remembers function+self

					  


When this button is later pressed, it's as if the GUI does this, which invokes the changeColor method to process the object's state information:


object = Callback('blue')
cb = object.changeColor                        # Registered event handler
cb(  )                                         # On event prints 'blue'


This technique is simpler, but less general than overloading calls with __call__; again, watch for more about bound methods in the next chapter.

You'll also see another __call__ example in Chapter 26, where we will use it to implement something known as a function decorator—a callable object that adds a layer of logic on top of an embedded function. Because __call__ allows us to attach state information to a callable object, it's a natural implementation technique for a function that must remember and call another function.

				30.5.3.4.11 __del__ Is a Destructor

The __init__ constructor is called whenever an instance is generated. Its counterpart, the destructor method __del__, is run automatically when an instance's space is being reclaimed (i.e., at "garbage collection" time):


>>> class Life:
...     def __init__(self, name='unknown'):
...         print 'Hello', name
...         self.name = name
...     def __del__(self):
...         print 'Goodbye', self.name
...
>>> brian = Life('Brian')
Hello Brian
>>> brian = 'loretta'
Goodbye Brian


Here, when brian is assigned a string, we lose the last reference to the Life instance, and so trigger its destructor method. This works, and it may be useful for implementing some cleanup activities (such as terminating server connections). However, destructors are not as commonly used in Python as in some OOP languages, for a number of reasons.

For one thing, because Python automatically reclaims all space held by an instance when the instance is reclaimed, destructors are not necessary for space management.[69] For another, because you cannot always easily predict when an instance will be reclaimed, it's often better to code termination activities in an explicitly called method (or try/finally statement, described in the next part of the book); in some cases, there may be lingering references to your objects in system tables that prevent destructors from running.

    [69] * In the current C implementation of Python, you also don't need to close file objects held by the instance in destructors because they are automatically closed when reclaimed. However, as mentioned in Chapter 9, it's better to explicitly call file close methods because auto-close-on-reclaim is a feature of the implementation, not of the language itself (this behavior can vary under Jython).

That's as many overloading examples as we have space for here. Most of the other operator overloading methods work similarly to the ones we've explored, and all are just hooks for intercepting built-in type operations; some overloading methods, for example, have unique argument lists or return values. You'll see a few others in action later in the book, but for complete coverage, I'll defer to other documentation sources.

			30.5.3.5 Namespaces: The Whole Story
Now that we've examined class and instance objects, the Python namespace story is complete. For reference, I'll quickly summarize all the rules used to resolve names here. The first things you need to remember are that qualified and unqualified names are treated differently, and that some scopes serve to initialize object namespaces:

    * Unqualified names (e.g., X) deal with scopes.
    * Qualified attribute names (e.g., object.X) use object namespaces.
    * Some scopes initialize object namespaces (for modules and classes).

				30.5.3.5.1 Simple Names: Global Unless Assigned

Unqualified simple names follow the LEGB lexical scoping rule outlined for functions in Chapter 16:


Assignment (X = value)

    Makes names local: creates or changes the name X in the current local scope, unless declared global.

Reference (X)

    Looks for the name X in the current local scope, then any and all enclosing functions, then the current global scope, then the built-in scope.

				30.5.3.5.2 Attribute Names: Object Namespaces

Qualified attribute names refer to attributes of specific objects, and obey the rules for modules and classes. For class and instance objects, the reference rules are augmented to include the inheritance search procedure:


Assignment (object.X = value)

    Creates or alters the attribute name X in the namespace of the object being qualified, and none other. Inheritance-tree climbing happens only on attribute reference, not on attribute assignment.

Reference (object.X)

    For class-based objects, searches for the attribute name X in object, then in all accessible classes above it, using the inheritance search procedure. For nonclass objects such as modules, fetches X from object directly.

				30.5.3.5.3 The "Zen" of Python Namespaces: Assignments Classify Names

With distinct search procedures for qualified and unqualified names, and multiple lookup layers for both, it can sometimes be difficult to tell where a name will wind up going. In Python, the place where you assign a name is crucial—it fully determines the scope or object in which a name will reside. The file manynames.py illustrates how this principle translates to code, and summarizes the namespace ideas we have seen throughout this book:
Code View: Scroll / Show All


# manynames.py

X = 11                     # Global (module) name/attribute (X, or manynames.X)

def f(  ):
    print X                # Access global X (11)

def g(  ):
    X = 22                 # Local (function) variable (X, hides module X)
    print X

class C:
    X = 33                 # Class attribute (C.X)
    def m(self):
        X = 44             # Local variable in method (X)
        self.X = 55        # Instance attribute (instance.X)

					  


This file assigns the same name, X, five times. Because this name is assigned in five different locations, though, all five Xs in this program are completely different variables. From top to bottom, the assignments to X here generate: a module attribute (11), a local variable in a function (22), a class attribute (33), a local variable in a method (44), and an instance attribute (55). Although all five are named X, the fact that they are all assigned at different places in the source code or to different objects makes all of these unique variables.

You should take the time to study this example carefully because it collects ideas we've been exploring throughout the last few parts of this book. When it makes sense to you, you will have achieved a sort of Python namespace nirvana. Of course, an alternative route to nirvana is to simply run the program and see what happens. Here's the remainder of this source file, which makes an instance, and prints all the Xs that it can fetch:


# manynames.py, continued

if __name__ == '__main__':
    print X                  # 11: module (a.k.a. manynames.X outside file)
    f(  )                    # 11: global
    g(  )                    # 22: local
    print X                  # 11: module name unchanged

    obj = C(  )              # Make instance
    print obj.X              # 33: class name inherited by instance

    obj.m(  )                    # Attach attribute name X to instance now
    print obj.X            # 55: instance
    print C.X              # 33: class (a.k.a. obj.X if no X in instance)

    #print C.m.X           # FAILS: only visible in method
    #print f.X             # FAILS: only visible in function


The outputs that are printed when the file is run are noted in the comments in the code; trace through them to see which variable named X is being accessed each time. Notice in particular that we can go through the class to fetch its attribute (C.X), but we can never fetch local variables in functions, or methods from outside their def statements. Locals are only visible to other code within the def, and, in fact, only live in memory while a call to the function or method is executing.

Some of the names defined by this file are visible outside the file to other modules, but recall that we must always import before we can access names in another file—that is the main point of modules, after all:


# otherfile.py

import manynames

X = 66
print X                    # 66: the global here
print manynames.X          # 11: globals become attributes after imports

manynames.f(  )              # 11: manynames's X, not the one here!
manynames.g(  )              # 22: local in other file's function

print manynames.C.X        # 33: attribute of class in other module
I = manynames.C(  )
print I.X                  # 33: still from class here
I.m(  )
print I.X                  # 55: now from instance!


Notice here how manynames.f( ) prints the X in manynames, not the X assigned in this file—scopes are always determined by the position of assignments in your source code (i.e., lexically), and are never influenced by what imports what, or who imports whom. Also, notice that the instance's own X is not created until we call I.m( )—attributes, like all variables, spring into existence when assigned, and not before. Normally we create instance attributes by assigning them in class __init__ constructor methods, but this isn't the only option.

You generally shouldn't use the same name for every variable in your script, of course! But as this example demonstrates, even if you do, Python's namespaces will work to keep names used in one context from accidentally clashing with those used in another.

				30.5.3.5.4 Namespace Dictionaries

In Chapter 19, we learned that module namespaces are actually implemented as dictionaries, and exposed with the built-in __dict__ attribute. The same holds for class and instance objects: attribute qualification is really a dictionary indexing operation internally, and attribute inheritance is just a matter of searching linked dictionaries. In fact, instance and class objects are mostly just dictionaries with links inside Python. Python exposes these dictionaries, as well as the links between them, for use in advanced roles (e.g., for coding tools).

To help you understand how attributes work internally, let's work through an interactive session that traces the way namespace dictionaries grow when classes are involved. First, let's define a superclass and a subclass with methods that will store data in their instances:


>>> class super:
...     def hello(self):
...         self.data1 = 'spam'
...
>>> class sub(super):
...     def hola(self):
...         self.data2 = 'eggs'
...


When we make an instance of the subclass, the instance starts out with an empty namespace dictionary, but has links back to the class for the inheritance search to follow. In fact, the inheritance tree is explicitly available in special attributes, which you can inspect. Instances have a __class__ attribute that links to their class, and classes have a __bases__ attribute that is a tuple containing links to higher superclasses:


>>> X = sub(  )
>>> X.__dict__
{  }

>>> X.__class__
<class __main__.sub at 0x00A48448>

>>> sub.__bases__
(<class __main__.super at 0x00A3E1C8>,)

>>> super.__bases__
(  )


As classes assign to self attributes, they populate the instance objects—that is, attributes wind up in the instances' attribute namespace dictionaries, not in the classes'. An instance object's namespace records data that can vary from instance to instance, and self is a hook into that namespace:
Code View: Scroll / Show All


>>> Y = sub(  )

>>> X.hello(  )
>>> X.__dict__
{'data1': 'spam'}

>>> X.hola(  )
>>> X.__dict__
{'data1': 'spam', 'data2': 'eggs'}

>>> sub.__dict__
{'__module__': '__main__', '__doc__': None, 'hola': <function hola at
 0x00A47048>}
>>> super.__dict__
{'__module__': '__main__', 'hello': <function hello at 0x00A3C5A8>,
 '__doc__': None}

>>> sub.__dict__.keys(  ), super.__dict__.keys(  )
(['__module__', '__doc__', 'hola'], ['__module__', 'hello', '__doc__'])

>>> Y.__dict__
{  }

					  


Notice the extra underscore names in the class dictionaries; Python sets these automatically. Most are not used in typical programs, but there are tools that use some of them (e.g., __doc__ holds the docstrings discussed in Chapter 14).

Also, observe that Y, a second instance made at the start of this series, still has an empty namespace dictionary at the end, even though X's dictionary has been populated by assignments in methods. Again, each instance has an independent namespace dictionary, which starts out empty, and can record completely different attributes than those recorded by the namespace dictionaries of other instances of the same class.

Because attributes are actually dictionary keys inside Python, there are really two ways to fetch and assign their values—by qualification, or by key indexing:


>>> X.data1, X.__dict__['data1']
('spam', 'spam')

>>> X.data3 = 'toast'
>>> X.__dict__
{'data1': 'spam', 'data3': 'toast', 'data2': 'eggs'}

>>> X.__dict__['data3'] = 'ham'
>>> X.data3
'ham'


This equivalence applies only to attributes actually attached to the instance, though. Because attribute qualification also performs an inheritance search, it can access attributes that namespace dictionary indexing cannot. The inherited attribute X.hello, for instance, cannot be accessed by X.__dict__['hello'].

Finally, here is the built-in dir function we met in Chapter 4 and Chapter 14 at work on class and instance objects. This function works on anything with attributes: dir(object) is similar to an object.__dict__.keys( ) call. Notice, though, that dir sorts its list and includes some system attributes—as of Python 2.2, dir also collects inherited attributes automatically:[70]

    [70] * The contents of attribute dictionaries and dir call results may change over time. For example, because Python now allows built-in types to be subclassed like classes, the contents of dir results for built-in types have expanded to include operator overloading methods. In general, attribute names with leading and trailing double underscores are interpreter-specific. Type subclasses will be discussed further in Chapter 26.


>>> X.__dict__
{'data1': 'spam', 'data3': 'ham', 'data2': 'eggs'}
>>> X.__dict__.keys(  )
['data1', 'data3', 'data2']

>>>> dir(X)
['__doc__', '__module__', 'data1', 'data2', 'data3', 'hello', 'hola']
>>> dir(sub)
['__doc__', '__module__', 'hello', 'hola']
>>> dir(super)
['__doc__', '__module__', 'hello']


Experiment with these special attributes on your own to get a better feel for how namespaces actually do their attribute business. Even if you will never use these in the kinds of programs you write, seeing that they are just normal dictionaries will help demystify the notion of namespaces in general.

				30.5.3.5.5 Namespace Links

The prior section introduced the special __class__ and __bases__ instance and class attributes, without really explaining why you might care about them. In short, these attributes allow you to inspect inheritance hierarchies within your own code. For example, they can be used to display a class tree, as in the following example:


# classtree.py

def classtree(cls, indent):
    print '.'*indent, cls.__name__        # Print class name here
    for supercls in cls.__bases__:        # Recur to all superclasses
        classtree(supercls, indent+3)         # May visit super > once

def instancetree(inst):
    print 'Tree of', inst                     # Show instance
    classtree(inst.__class__, 3)          # Climb to its class

def selftest(  ):
    class A: pass
    class B(A): pass
    class C(A): pass
    class D(B,C): pass
    class E: pass
    class F(D,E): pass
    instancetree(B(  ))
    instancetree(F(  ))

if __name__ == '__main__': selftest(  )


The classtree function in this script is recursive—it prints a class' name using __name__, and then climbs up to the superclasses by calling itself. This allows the function to traverse arbitrarily shaped class trees; the recursion climbs to the top, and stops at root superclasses that have empty __bases__ attributes. Most of this file is self-test code; when run standalone, it builds an empty class tree, makes two instances from it, and prints their class tree structures:


% python classtree.py
Tree of <__main__.B instance at 0x00ACB438>
... B
...... A
Tree of <__main__.F instance at 0x00AC4DA8>
... F
...... D
......... B
............ A
......... C
............ A
...... E


Here, indentation marked by periods is used to denote class tree height. Of course, we could improve on this output format, and perhaps even sketch it in a GUI display.

We can import these functions anywhere we want a quick class tree display:


>>> class Emp: pass
...
>>> class Person(Emp): pass
...
>>> bob = Person(  )
>>> import classtree
>>> classtree.instancetree(bob)
Tree of <__main__.Person instance at 0x00AD34E8>
... Person
...... Emp


Whether you will ever code or use such tools, this example demonstrates one of the many ways that you can make use of special attributes that expose interpreter internals. You'll see another when we code a general-purpose attribute-listing class in the "Section 25.6" section of Chapter 25.

			30.5.3.6 A More Realistic Example

Most of the examples we've looked at so far have been artificial and self-contained to help you focus on the basics. However, we'll close out this chapter with a larger example that pulls together much of what we've studied here. I'm including this mostly as a self-study exercise—try to trace through this example's code to see how method calls are resolved.

In short, the following module, person.py, defines three classes:

    * GenericDisplay is a mix-in class that provides a generic __str__ method; for any class that inherits from it, this method returns a string giving the name of the class from which the instance was created, as well as "name=value" pairs for every attribute in the instance. It uses the __dict__ attribute namespace dictionary to build up the list of "name=value" pairs for each attribute in the class instance and the built-in __name__ of an instance's built-in __class__ to determine the class name. Because the print statement triggers __str__, this class' result is the custom print format displayed for all instances that derive from the class. It's a generic tool.
    * Person records general information about people, and provides two processing methods to use and change instance object state information; it also inherits the custom print format logic from its superclass. A person object has two attributes and two methods managed by this class.
    * Employee is a customization of Person that inherits the last-name extraction and custom print format, but adds a new method for giving a raise, and redefines the birthday operation to customize it (apparently, employees age faster than other people). Notice how the superclass constructor is invoked manually; we need to run the superclass version above in order to fill out the name and age.

As you study this module's code, you'll see that each instance has its own state information. Notice how inheritance is used to mix in and customize behavior, and how operator overloading is used to initialize and print instances:
Code View: Scroll / Show All


# person.py

class GenericDisplay:
    def gatherAttrs(self):
        attrs = '\n'
        for key in self.__dict__:
            attrs += '\t%s=%s\n' % (key, self.__dict__[key])
        return attrs
    def __str__(self):
        return '<%s: %s>' % (self.__class__.__name__, self.gatherAttrs(  ))

class Person(GenericDisplay):
    def __init__(self, name, age):
        self.name = name
        self.age  = age
    def lastName(self):
        return self.name.split(  )[-1]
    def birthDay(self):
        self.age += 1

class Employee(Person):
    def __init__(self, name, age, job=None, pay=0):
        Person.__init__(self, name, age)
        self.job  = job
        self.pay  = pay
    def birthDay(self):
        self.age += 2
    def giveRaise(self, percent):
        self.pay *= (1.0 + percent)

if __name__ == '__main__':
    bob = Person('Bob Smith', 40)
    print bob
    print bob.lastName(  )
    bob.birthDay(  )
    print bob

    sue = Employee('Sue Jones', 44, job='dev', pay=100000)
    print sue
    print sue.lastName(  )
    sue.birthDay(  )
    sue.giveRaise(.10)
    print sue

					  


To test the code, we can import the module and make instances interactively. Here, for example, is the Person class in action. Creating an instance triggers __init__, calling a named method uses or changes instance state information (attributes), and printing an instance invokes the inherited __str__ to print all attributes generically:


>>> from person import Person
>>> ann = Person('Ann Smith', 45)
>>> ann.lastName(  )
'Smith'
>>> ann.birthDay(  )
>>> ann.age
46
>>> print ann
<Person:
    age=46
    name=Ann Smith
>


Finally, here is the output of the file's self-test logic (the code at the bottom, under the __name__ test), which creates a person and an employee, and changes each of them. As usual, this self-test code is run only when the file is run as a top-level script, not when it is being imported as a library module. Notice how employees inherit print formats and last-name extraction, have more state information, have an extra method for getting a raise, and run a customized version of the birthday method (they age by two!):
Code View: Scroll / Show All


% python person.py
<Person:
    age=40
    name=Bob Smith
>
Smith
<Person:
    age=41
    name=Bob Smith
>
<Employee:
    job=dev
    pay=100000
    age=44
    name=Sue Jones
>
Jones
<Employee:
    job=dev
    pay=110000.0
    age=46
    name=Sue Jones
>

					  


Trace through the code in this example to see how this output reflects method calls; it summarizes most of the ideas behind the mechanisms of OOP in Python.

Now that you know about Python classes, you can probably appreciate the fact that the classes used here are not much more than packages of functions, which embed and manage built-in objects attached to instance attributes as state information. When the lastName method splits and indexes, for example, it is simply applying built-in string and list processing operations to an object managed by the class.

Operator overloading and inheritance—the automatic lookup of attributes in the implied class tree—are the main tools OOP adds to the picture. Ultimately, this allows the Employee class at the bottom of the tree to obtain quite a bit of behavior "for free"—which is, at the end of the day, the main idea behind OOP.

			30.5.3.7 Chapter Summary
This chapter took us on a second, more in-depth tour of the OOP mechanisms of the Python language. We learned more about classes and methods, inheritance, and additional operator overloading methods; we also wrapped up the namespace story in Python by extending it to cover its application to classes. Along the way, we looked at some more advanced concepts, such as abstract superclasses, class data attributes, and manual calls to superclass methods and constructors. Finally, we studied a larger example that tied together much of what we've learned about OOP so far.

Now that we've learned all about the mechanics of coding classes in Python, the next chapter turns to common design patterns—some of the ways that classes are commonly used and combined to optimize code reuse. Some of the material in the next chapter is not specific to the Python language, but is important for using classes well. Before you read on, though, be sure to work though the usual chapter quiz to review what we've covered here.

BRAIN BUILDER

Chapter Quiz

Q:	What is an abstract superclass?
Q:	What two operator overloading methods can you use to support iteration in your classes?
Q:	What happens when a simple assignment statement appears at the top level of a class statement?
Q:	Why might a class need to manually call the __init__ method in a superclass?
Q:	How can you augment, instead of completely replacing, an inherited method?
Q:	In this chapter's final example, what methods are run when the sue Employee instance is printed?
Q:	What . . . was the capital of Assyria?


Quiz Answers

A:	An abstract superclass is a class that calls a method, but does not inherit or define it—it expects the method to be filled in by a subclass. This is often used as a way to generalize classes when behavior cannot be predicted until a more specific subclass is coded. OOP frameworks also use this as a way to dispatch to client-defined, customizable operations.
A:	Classes can support iteration by defining (or inheriting) __getitem__ or __iter__. In all iteration contexts, Python tries to use __iter__ (which returns an object that supports the iteration protocol with a next method) first: if no __iter__ is found by inheritance search, Python falls back on the __getitem__ indexing method (which is called repeatedly, with successively higher indexes).
A:	When a simple assignment statement (X = Y) appears at the top level of a class statement, it attaches a data attribute to the class (Class.X). Like all class attributes, this will be shared by all instances; data attributes are not callable method functions, though.
A:	A class must manually call the __init__ method in a superclass if it defines an __init__ constructor of its own, but must still kick off the superclass' construction code. Python itself automatically runs just one constructor—the lowest one in the tree. Superclass constructors are called through the class name, passing in the self instance manually: Superclass.__init__(self, ...).
A:	To augment instead of completely replacing an inherited method, redefine it in a subclass, but call back to the superclass' version of the method manually from the new version of the method in the subclass. That is, pass the self instance to the superclass' version of the method manually: Superclass.method(self, ...).
A:	Printing sue ultimately runs the GenericDisplay.__str__ method and the GenericDisplay.gatherAttrs method it calls. In more detail, to print sue, the print statement converts her to her user-friendly display string by passing her to the built-in str function. In a class, this means look for a __str__ operator overloading method by inheritance search, and run it if it is found. sue's class, Employee, does not have a __str__ method; Person is searched next, and eventually __str__ is found in the GenericDisplay class.
A:	Ashur (or Qalat Sherqat), Calah (or Nimrud), the short-lived Dur Sharrukin (or Khorsabad), and finally Nineveh.

		30.5.4. Designing with Classes
So far in this part of the book, we've concentrated on using Python's OOP tool, the class. But OOP is also about design issues—i.e., how to use classes to model useful objects. This chapter will touch on a few core OOP ideas, and present some additional examples that are more realistic than those shown so far. Many of the design terms mentioned here (delegation, composition, factories, and more) require more explanation than I can provide in this book; if this material sparks your curiosity, I suggest exploring a text on OOP design, or design patterns as a next step.

			30.5.4.1  Python and OOP

Python's implementation of OOP can be summarized by three ideas:


Inheritance

    Inheritance is based on attribute lookup in Python (in X.name expressions).

Polymorphism

    In method, the meaning of method depends on the type (class) of X.

Encapsulation

    Methods and operators implement behavior; data hiding is a convention by default.

By now, you should have a good feel for what inheritance is all about in Python. We've also talked about Python's polymorphism a few times already; it flows from Python's lack of type declarations. Because attributes are always resolved at runtime, objects that implement the same interfaces are interchangeable; clients don't need to know what sorts of objects are implementing the methods they call.

Encapsulation means packaging in Python—that is, hiding implementation details behind an object's interface. It does not mean enforced privacy, as you'll see in Chapter 26. Encapsulation allows the implementation of an object's interface to be changed without impacting the users of that object.

				30.5.4.1.1  Overloading by Call Signatures (or Not)

Some OOP languages also define polymorphism to mean overloading functions based on the type signatures of their arguments. But because there are no type declarations in Python, this concept doesn't really apply; polymorphism in Python is based on object interfaces, not types.

You can try to overload methods by their argument lists, like this:


class C:
    def meth(self, x):
        ...
    def meth(self, x, y, z):
        ...


This code will run, but because the def simply assigns an object to a name in the class' scope, the last definition of the method function is the only one that will be retained (it's just as if you say X = 1, and then X = 2; X will be 2).

Type-based selections can always be coded using the type testing ideas we met in Chapter 4 and Chapter 9, or the argument list tools in Chapter 16:


class C:
    def meth(self, *args):
        if len(args) == 1:
            ...
        elif type(arg[0]) == int:
            ...


You normally shouldn't do this, though—as described in Chapter 15, you should write your code to expect an object interface, not a specific data type. That way, it will be useful for a broader category of types and applications, both now and in the future:


class C:
    def meth(self, x):
        x.operation(  )        # Assume x does the right thing


It's also generally considered better to use distinct method names for distinct operations, rather than relying on call signatures (no matter what language you code in).

			30.5.4.2  Classes As Records

Chapter 8 showed how to use dictionaries to record properties of entities in our programs. Let's explore this in more detail. Here is the example for dictionary-based records used earlier:


>>> rec = {}
>>> rec['name'] = 'mel'
>>> rec['age']  = 40
>>> rec['job']  = 'trainer/writer'
>>>
>>> print rec['name']
mel


This code emulates tools like records and structs in other languages. As we saw in Chapter 23, though, there are also multiple ways to do the same with classes. Perhaps the simplest is this:


>>> class rec: pass
...
>>> rec.name = 'mel'
>>> rec.age  = 40
>>> rec.job  = 'trainer/writer'
>>>
>>> print rec.age
40


This code has substantially less syntax than the dictionary equivalent. It uses an empty class statement to generate an empty namespace object (notice the pass statement—we need a statement syntactically even though there is no logic to code in this case). Once we make the empty class, we fill it out by assigning to class attributes over time.

This works, but a new class statement will be required for each distinct record we will need. Perhaps more typically, we can instead generate instances of an empty class to represent each distinct entity:


>>> class rec: pass
...
>>> pers1 = rec(  )
>>> pers1.name = 'mel'
>>> pers1.job  = 'trainer'
>>> pers1.age   = 40
>>>
>>> pers2 = rec(  )
>>> pers2.name = 'dave'
>>> pers2.job  = 'developer'
>>>
>>> pers1.name, pers2.name
('mel', 'dave')


Here, we make two records from the same class—instances start out life empty, just like classes. We then fill in the records by assigning to attributes. This time, though, there are two separate objects, and hence, two separate name attributes. In fact, instances of the same class don't even have to have the same set of attribute names; in this example, one has a unique age name. Instances really are distinct namespaces: each has a distinct attribute dictionary. Although they are normally filled out consistently by class methods, they are more flexible than you might expect.

Finally, we might instead code a more full-blown class to implement the record:


>>> class Person:
...     def __init__(self, name, job):
...         self.name = name
...         self.job  = job
...     def info(self):
...         return (self.name, self.job)
...
>>> mark = Person('ml', 'trainer')
>>> dave = Person('da', 'developer')
>>>
>>> mark.job, dave.info(  )
('trainer', ('da', 'developer'))


This scheme also makes multiple instances, but the class is not empty this time: we've added logic (methods) to initialize instances at construction time and collect attributes into a tuple. The constructor imposes some consistency on instances here by always setting name and job attributes.

We could further extend this code by adding logic to compute salaries, parse names, and so on (see the end of Chapter 24 for an example that does this). Ultimately, we might link the class into a larger hierarchy to inherit an existing set of methods via the automatic attribute search of classes, or perhaps even store instances of the class in a file with Python object pickling to make them persistent (more on pickling and persistence in the sidebar "Why You Will Care: Classes and Persistence," and again later in the book). In the end, although types like dictionaries are flexible, classes allow us to add behavior to objects in ways that built-in types and simple functions do not directly support.

			30.5.4.3  OOP and Inheritance: "Is-a" Relationships

We've explored the mechanics of inheritance in depth already, but I'd like to show you an example of how it can be used to model real-world relationships. From a programmer's point of view, inheritance is kicked off by attribute qualifications, which trigger searches for names in instances, their classes, and then any superclasses. From a designer's point of view, inheritance is a way to specify set membership: a class defines a set of properties that may be inherited and customized by more specific sets (i.e., subclasses).

To illustrate, let's put that pizza-making robot we talked about at the start of this part of the book to work. Suppose we've decided to explore alternative career paths and open a pizza restaurant. One of the first things we'll need to do is hire employees to serve customers, prepare the food, and so on. Being engineers at heart, we've decided to build a robot to make the pizzas; but being politically and cybernetically correct, we've also decided to make our robot a full-fledged employee with a salary.

Our pizza shop team can be defined by the four classes in the example file, employees.py. The most general class, Employee, provides common behavior such as bumping up salaries (giveRaise) and printing (__repr__). There are two kinds of employees, and so two subclasses of Employee: Chef and Server. Both override the inherited work method to print more specific messages. Finally, our pizza robot is modeled by an even more specific class: PizzaRobot is a kind of Chef, which is a kind of Employee. In OOP terms, we call these relationships "is-a" links: a robot is a chef, which is a(n) employee. Here's the employees.py file:
Code View: Scroll / Show All


class Employee:
    def __init__(self, name, salary=0):
        self.name   = name
        self.salary = salary
    def giveRaise(self, percent):
        self.salary = self.salary + (self.salary * percent)
    def work(self):
        print self.name, "does stuff"
    def __repr__(self):
        return "<Employee: name=%s, salary=%s>" % (self.name, self.salary)

class Chef(Employee):
    def __init__(self, name):
        Employee.__init__(self, name, 50000)
    def work(self):
        print self.name, "makes food"

class Server(Employee):
    def __init__(self, name):
        Employee.__init__(self, name, 40000)
    def work(self):
        print self.name, "interfaces with customer"

class PizzaRobot(Chef):
    def __init__(self, name):
        Chef.__init__(self, name)
    def work(self):
        print self.name, "makes pizza"

if __name__ == "__main__":
    bob = PizzaRobot('bob')       # Make a robot named bob
    print bob                     # Run inherited __repr__
    bob.work(  )                        # Run type-specific action
    bob.giveRaise(0.20)           # Give bob a 20% raise
    print bob; print

    for klass in Employee, Chef, Server, PizzaRobot:
        obj = klass(klass.__name__)
        obj.work(  )

					  


When we run the self-test code included in this module, we create a pizza-making robot named bob, which inherits names from three classes: PizzaRobot, Chef, and Employee. For instance, printing bob runs the Employee.__repr__ method, and giving bob a raise invokes Employee.giveRaise because that's where the inheritance search finds that method:


C:\python\examples> python employees.py
<Employee: name=bob, salary=50000>
bob makes pizza
<Employee: name=bob, salary=60000.0>
Employee does stuff
Chef makes food
Server interfaces with customer
PizzaRobot makes pizza


In a class hierarchy like this, you can usually make instances of any of the classes, not just the ones at the bottom. For instance, the for loop in this module's self-test code creates instances of all four classes; each responds differently when asked to work because the work method is different in each. Really, these classes just simulate real-world objects; work prints a message for the time being, but it could be expanded to do real work later.

			30.5.4.4  OOP and Composition: "Has-a" Relationships

The notion of composition was introduced in Chapter 22. From a programmer's point of view, composition involves embedding other objects in a container object, and activating them to implement container methods. To a designer, composition is another way to represent relationships in a problem domain. But, rather than set membership, composition has to do with components—parts of a whole.

Composition also reflects the relationships between parts, which is usually called a "has-a" relationship. Some OOP design texts refer to composition as aggregation (or distinguish between the two terms by using aggregation to describe a weaker dependency between container and contained); in this text, a "composition" simply refers to a collection of embedded objects. The composite class generally provides an interface all its own, and implements it by directing the embedded objects.

Now that we've implemented our employees, let's put them in the pizza shop and let them get busy. Our pizza shop is a composite object: it has an oven, and it has employees like servers and chefs. When a customer enters and places an order, the components of the shop spring into action—the server takes the order, the chef makes the pizza, and so on. The following example (the file pizzashop.py) simulates all the objects and relationships in this scenario:
Code View: Scroll / Show All


from employees import PizzaRobot, Server

class Customer:
    def __init__(self, name):
        self.name = name
    def order(self, server):
        print self.name, "orders from", server
    def pay(self, server):
        print self.name, "pays for item to", server

class Oven:
    def bake(self):
        print "oven bakes"
class PizzaShop:
    def __init__(self):
        self.server = Server('Pat')         # Embed other objects
        self.chef   = PizzaRobot('Bob')     # A robot named bob
        self.oven   = Oven(  )

    def order(self, name):
        customer = Customer(name)           # Activate other objects
        customer.order(self.server)         # Customer orders from server
        self.chef.work(  )
        self.oven.bake(  )
        customer.pay(self.server)

if __name__ == "__main__":
    scene = PizzaShop(  )                         # Make the composite
    scene.order('Homer')                    # Simulate Homer's order
    print '...'
    scene.order('Shaggy')                   # Simulate Shaggy's order

					  


The PizzaShop class is a container and controller; its constructor makes and embeds instances of the employee classes we wrote in the last section, as well as an Oven class defined here. When this module's self-test code calls the PizzaShop order method, the embedded objects are asked to carry out their actions in turn. Notice that we make a new Customer object for each order, and we pass on the embedded Server object to Customer methods; customers come and go, but the server is part of the pizza shop composite. Also, notice that employees are still involved in an inheritance relationship; composition and inheritance are complementary tools. When we run this module, our pizza shop handles two orders—one from Homer, and then one from Shaggy:


C:\python\examples> python pizzashop.py
Homer orders from <Employee: name=Pat, salary=40000>
Bob makes pizza
oven bakes
Homer pays for item to <Employee: name=Pat, salary=40000>
...
Shaggy orders from <Employee: name=Pat, salary=40000>
Bob makes pizza
oven bakes
Shaggy pays for item to <Employee: name=Pat, salary=40000>


Again, this is mostly just a toy simulation, but the objects and interactions are representative of composites at work. As a rule of thumb, classes can represent just about any objects and relationships you can express in a sentence; just replace nouns with classes, and verbs with methods, and you'll have a first cut at a design.

				30.5.4.4.1  Stream Processors Revisited

For a more realistic composition example, recall the generic data stream processor function we partially coded in the introduction to OOP in Chapter 22:


def processor(reader, converter, writer):
    while 1:
        data = reader.read(  )
        if not data: break
        data = converter(data)
        writer.write(data)


Rather than using a simple function here, we might code this as a class that uses composition to do its work to provide more structure and support inheritance. The following file, streams.py, demonstrates one way to code the class:


class Processor:
    def __init__(self, reader, writer):
        self.reader = reader
        self.writer = writer
    def process(self):
        while 1:
            data = self.reader.readline(  )
            if not data: break
            data = self.converter(data)
            self.writer.write(data)
    def converter(self, data):
        assert 0, 'converter must be defined'


Coded this way, reader and writer objects are embedded within the class instance (composition), and we supply the converter logic in a subclass rather than passing in a converter function (inheritance). The file converters.py shows how:


from streams import Processor

class Uppercase(Processor):
    def converter(self, data):
        return data.upper(  )

if __name__ == '__main__':
    import sys
    Uppercase(open('spam.txt'), sys.stdout).process(  )


Here, the Uppercase class inherits the stream-processing loop logic (and anything else that may be coded in its superclasses). It needs to define only the thing that is unique about it—the data conversion logic. When this file is run, it makes and runs an instance, which reads from the file spam.txt, and writes the uppercase equivalent of that file to the stdout stream:


C:\lp3e> type spam.txt
spam
Spam
SPAM!

C:\lp3e> python converters.py
SPAM
SPAM
SPAM!


To process different sorts of streams, pass in different sorts of objects to the class construction call. Here, we use an output file instead of a stream:


C:\lp3e> python
>>> import converters
>>> prog = converters.Uppercase(open('spam.txt'), open('spamup.txt', 'w'))
>>> prog.process(  )

C:\lp3e> type spamup.txt
SPAM
SPAM
SPAM!


But, as suggested earlier, we could also pass in arbitrary objects wrapped up in classes that define the required input and output method interfaces. Here's a simple example that passes in a writer class that wraps up the text inside HTML tags:


C:\lp3e> python
>>> from converters import Uppercase
>>>
>>> class HTMLize:
...      def write(self, line):
...         print '<PRE>%s</PRE>' % line[:−1]
...
>>> Uppercase(open('spam.txt'), HTMLize(  )).process(  )
<PRE>SPAM</PRE>
<PRE>SPAM</PRE>
<PRE>SPAM!</PRE>


If you trace through this example's control flow, you'll see that we get both uppercase conversion (by inheritance), and HTML formatting (by composition), even though the core processing logic in the original Processor superclass knows nothing about either step. The processing code only cares that writers have a write method, and that a method named convert is defined; it doesn't care what those calls do. Such polymorphism and encapsulation of logic is behind much of the power of classes.

As is, the Processor superclass only provides a file-scanning loop. In more real work, we might extend it to support additional programming tools for its subclasses, and, in the process, turn it into a full-blown framework. Coding such a tool once in a superclass enables you to reuse it in all of your programs. Even in this simple example, because so much is packaged and inherited with classes, all we had to code was the HTML formatting step; the rest was free.

For another example of composition at work, see exercise 9 at the end of Chapter 26 and its solution in Appendix B; it's similar to the pizza shop example. We've focused on inheritance in this book because that is the main tool that the Python language itself provides for OOP. But, in practice, composition is used as much as inheritance as a way to structure classes, especially in larger systems. As we've seen, inheritance and composition are often complementary (and sometimes alternative) techniques. Because composition is a design issue outside the scope of the Python language and this book, though, I'll defer to other resources for more on this topic.

Why You Will Care: Classes and Persistence

I've mentioned pickling a few times in this part of the book because it works especially well with class instances. For example, besides allowing us to simulate real-world interactions, the pizza shop classes developed here could also be used as the basis of a persistent restaurant database. Instances of classes can be stored away on disk in a single step using Python's pickle or shelve modules. The object pickling interface is remarkably easy to use:


import pickle
object = someClass(  )
file   = open(filename, 'wb')     # Create external file
pickle.dump(object, file)         # Save object in file

import pickle
file   = open(filename, 'rb')
object = pickle.load(file)        # Fetch it back later


Pickling converts in-memory objects to serialized byte streams, which may be stored in files, sent across a network, and so on; unpickling converts back from byte streams to identical in-memory objects. Shelves are similar, but they automatically pickle objects to an access-by-key database, which exports a dictionary-like interface:


import shelve
object = someClass(  )
dbase  = shelve.open('filename')
dbase['key'] = object             # Save under key

import shelve
dbase  = shelve.open('filename')
object = dbase['key']             # Fetch it back later


In our example, using classes to model employees means we can get a simple database of employees and shops with little extra work: pickling such instance objects to a file makes them persistent across Python program executions. See the standard library manual and later examples for more on pickling.

			30.5.4.5  OOP and Delegation

Object-oriented programmers often also talk about something called delegation, which usually implies controller objects that embed other objects to which they pass off operation requests. The controllers can take care of administrative activities, such as keeping track of accesses, and so on. In Python, delegation is often implemented with the __getattr__ method hook; because it intercepts accesses to nonexistent attributes, a wrapper class (sometimes called a proxy class) can use __getattr__ to route arbitrary accesses to a wrapped object. The wrapper class retains the interface of the wrapped object, and may add additional operations of its own.

Consider the file trace.py, for instance:


class wrapper:
    def __init__(self, object):
        self.wrapped = object                    # Save object
    def __getattr__(self, attrname):
        print 'Trace:', attrname                 # Trace fetch
        return getattr(self.wrapped, attrname)   # Delegate fetch


Recall from Chapter 24 that __getattr__ gets the attribute name as a string. This code makes use of the getattr built-in function to fetch an attribute from the wrapped object by name string—getattr(X,N) is like X.N, except that N is an expression that evaluates to a string at runtime, not a variable. In fact, getattr(X,N) is similar to X.__dict__[N], but the former also performs an inheritance search, like X.N, while the latter does not (see "Section 24.5.4" in Chapter 24 for more on the __dict__ attribute).

You can use the approach of this module's wrapper class to manage access to any object with attributes—lists, dictionaries, and even classes and instances. Here, the wrapper class simply prints a trace message on each attribute access, and delegates the attribute request to the embedded wrapped object:


>>> from trace import wrapper 
>>> x = wrapper([1,2,3])  # Wrap a list
>>> x.append(4)  # Delegate to list method
Trace: append
>>> x.wrapped  # Print my member
[1, 2, 3, 4]

>>> x = wrapper({"a": 1, "b": 2})  # Wrap a dictionary
>>> x.keys(  )  # Delegate to dictionary method
Trace: keys
['a', 'b']


The net effect is to augment the entire interface of the wrapped object, with additional code in the wrapper class. We can use this to log our method calls, route method calls to extra or custom logic, and so on.

We'll revive the notions of wrapped objects and delegated operations as one way to extend built-in types in Chapter 26. If you are interested in the delegation design pattern, also watch for the discussion of function decorators in Chapter 26—this is a strongly related concept, designed to augment a specific function or method call, rather than the entire interface of an object.

			30.5.4.6  Multiple Inheritance

In a class statement, more than one superclass can be listed in parentheses in the header line. When you do this, you use something called multiple inheritance—the class and its instances inherit names from all listed superclasses.

When searching for an attribute, Python searches superclasses in the class header from left to right until a match is found. Technically, the search proceeds depth-first all the way to the top of the inheritance tree, and then from left to right, as any of the superclasses may have superclasses of their own.

In general, multiple inheritance is good for modeling objects that belong to more than one set. For instance, a person may be an engineer, a writer, a musician, and so on, and inherit properties from all such sets.

Perhaps the most common way multiple inheritance is used is to "mix in" general-purpose methods from superclasses. Such superclasses are usually called mix-in classes—they provide methods you add to application classes by inheritance. For instance, Python's default way to print a class instance object isn't incredibly useful:


>>> class Spam: 
...     def __init__(self):  # No __repr__
...         self.data1 = "food" 
...
>>> X = Spam(  ) 
>>> print X  # Default: class, address
<__main__.Spam instance at 0x00864818>


As seen in the previous section on operator overloading, you can provide a __repr__ method to implement a custom string representation of your own. But, rather than coding a __repr__ in each and every class you wish to print, why not code it once in a general-purpose tool class and inherit it in all your classes?

That's what mix-ins are for. The following file, mytools.py, defines a mix-in class called Lister that overloads the __repr__ method for each class that includes Lister in its header line. It simply scans the instance's attribute dictionary (remember, it's exported in __dict__) to build up a string showing the names and values of all instance attributes. Because classes are objects, Lister's formatting logic can be used for instances of any subclass; it's a generic tool.[71]

    [71] * For an alternative way to do this, see the person.py module example at the end of Chapter 24. It also scans attribute namespace dictionaries, but assumes there are no double-underscore names to be skipped.

Lister uses two special tricks to extract the instance's class name and address. Each instance has a built-in __class__ attribute that references the class from which it was created, and each class has a __name__ attribute that references the name in the header, so self.__class__.__name__ fetches the name of an instance's class. You get the instance's memory address by calling the built-in id function, which returns any object's address (by definition, a unique object identifier):
Code View: Scroll / Show All


###########################################
# Lister can be mixed into any class to
# provide a formatted print of instances
# via inheritance of __repr__ coded here;
# self is the instance of the lowest class.
###########################################

class Lister:
   def __repr__(self):
       return ("<Instance of %s, address %s:\n%s>" %
                         (self.__class__.__name__,     # My class's name
                          id(self),                        # My address
                          self.attrnames(  )) )            # name=value list
   def attrnames(self):
       result = ''
       for attr in self.__dict__.keys(  ):               # Instance
namespace dict
           if attr[:2] == '__':
               result = result + "\tname %s=<built-in>\n" % attr
           else:
               result = result + "\tname %s=%s\n" % (attr, self.__dict__ [attr])
       return result

					  


Instances derived from this class display their attributes automatically when printed, giving a bit more information than a simple address:


>>> from mytools import Lister
>>> class Spam(Lister):
...     def __init__(self):
...         self.data1 = 'food'
...
>>> x = Spam(  )
>>> x
<Instance of Spam, address 8821568:
        name data1=food
>


The Lister class is useful for any classes you write—even classes that already have a superclass. This is where multiple inheritance comes in handy: by adding Lister to the list of superclasses in a class header (mixing it in), you get its __repr__ for free while still inheriting from the existing superclass. The file testmixin.py demonstrates:


from mytools import Lister            # Get tool class

class Super:
    def __init__(self):               # superclass __init__
        self.data1 = "spam"

class Sub(Super, Lister):             # Mix in a __repr__
    def __init__(self):                 # Lister has access to self
        Super.__init__(self)
        self.data2 = "eggs"           # More instance attrs
        self.data3 = 42
if __name__ == "__main__":
    X = Sub(  )
    print X                           # Mixed-in repr


Here, Sub inherits names from both Super and Lister; it's a composite of its own names and names in both its superclasses. When you make a Sub instance and print it, you automatically get the custom representation mixed in from Lister:


C:\lp3e> python testmixin.py
<Instance of Sub, address 7833392:
        name data3=42
        name data2=eggs
        name data1=spam
>


Lister works in any class it's mixed into because self refers to an instance of the subclass that pulls Lister in, whatever that may be. If you later decide to extend Lister's __repr__ to also print all the class attributes that an instance inherits, you're safe; because it's an inherited method, changing Lister.__repr__ automatically updates the display of each subclass that imports the class and mixes it in.[72]

    [72] * If you're curious how, flip back to "Section 24.5.4" in Chapter 24 for hints. We saw there that each class has a built-in attribute called __bases__, which is a tuple of the class' superclass objects. A general-purpose class hierarchy lister or browser can traverse the inheritance tree from an instance's __class__ to its class, and then from the class' __bases__ to all superclasses recursively, much like the classtree.py example shown earlier. In Python 2.2 and later, it's even simpler, as the built-in dir function now includes inherited attribute names automatically. If you don't care about displaying the tree structure, you can just scan the dir list instead of the dictionary keys list, and use getattr to fetch attributes by name string instead of dictionary-key indexing. We'll rehash this idea in one of this part's closing exercises.

In a sense, mix-in classes are the class equivalent of modules—packages of methods useful in a variety of clients. Here is Lister working again in single-inheritance mode on a different class's instances:


>>> from mytools import Lister
>>> class x(Lister):
...     pass
...
>>> t = x(  )
>>> t.a = 1; t.b = 2; t.c = 3
>>> t
<Instance of x, address 7797696:
        name b=2
        name a=1
        name c=3
>


OOP is all about code reuse, and mix-in classes are a powerful tool. Like almost everything else in programming, multiple inheritance can be a useful device when applied well; however, in practice, it is an advanced feature and can become complicated if used carelessly or excessively. We'll revisit this topic as a gotcha at the end of the next chapter. In that chapter, we'll also meet an option (new-style classes) that modifies the search order for one special multiple inheritance case.

			30.5.4.7  Classes Are Objects: Generic Object Factories

Because classes are objects, it's easy to pass them around a program, store them in data structures, and so on. You can also pass classes to functions that generate arbitrary kinds of objects; such functions are sometimes called factories in OOP design circles. They are a major undertaking in a strongly typed language such as C++, but almost trivial to implement in Python. The apply function and newer alternative syntax we met in Chapter 17 can call any class with any number of constructor arguments in one step to generate any sort of instance:[73]

    [73] * Actually, apply can call any callable object, including functions, classes, and methods. The factory function here can also run any callable object, not just a class (despite the argument name). Also, note that in recent Python versions, the aClass(*args) call syntax is generally preferred to the apply(aClass, args) built-in call.

Code View: Scroll / Show All


def factory(aClass, *args):                  # varargs tuple
    return apply(aClass, args)               # Call aClass, or: aClass(*args)

class Spam:
    def doit(self, message):
        print message

class Person:
    def __init__(self, name, job):
        self.name = name
        self.job  = job

object1 = factory(Spam)                      # Make a Spam object
object2 = factory(Person, "Guido", "guru")   # Make a Person object

					  


In this code, we define an object generator function called factory. It expects to be passed a class object (any class will do) along with one or more arguments for the class' constructor. The function uses apply to call the function and return an instance.

The rest of the example simply defines two classes, and generates instances of both by passing them to the factory function. And that's the only factory function you'll ever need to write in Python; it works for any class, and any constructor arguments.

One possible improvement worth noting is that to support keyword arguments in constructor calls, the factory can collect them with a **args argument, and pass them as a third argument to apply:


def factory(aClass, *args, **kwargs):        # +kwargs dict
    return apply(aClass, args, kwargs)       # Call aClass


By now, you should know that everything is an "object" in Python, including things like classes, which are just compiler input in languages like C++. However, as mentioned at the start of Part 6, only objects derived from classes are OOP objects in Python.

				30.5.4.7.1  Why Factories?

So what good is the factory function (besides providing an excuse to illustrate class objects in this book)? Unfortunately, it's difficult to show applications of this design pattern without listing much more code than we have space for here. In general, though, such a factory might allow code to be insulated from the details of dynamically configured object construction.

For example, recall the processor example presented in the abstract in Chapter 22, and then again as a has-a composition example in this chapter. It accepted reader and writer objects for processing arbitrary data streams.

The original version of this example manually passed in instances of specialized classes like FileWriter and SocketReader to customize the data streams being processed; later, we passed in hardcoded file, stream, and formatter objects. In a more dynamic scenario, external devices such as configuration files or GUIs might be used to configure the streams.

In such a dynamic world, we might not be able to hardcode the creation of stream interface objects in our script, but might instead create them at runtime according to the contents of a configuration file.

For instance, the file might simply give the string name of a stream class to be imported from a module, plus an optional constructor call argument. Factory-style functions or code might come in handy here because they would allow us to fetch and pass in classes that are not hardcoded in our program ahead of time. Indeed, those classes might not even have existed at all when we wrote our code:


classname = ...parse from config file...
classarg  = ...parse from config file...

import streamtypes                           # Customizable code
aclass = getattr(streamtypes, classname)     # Fetch from module
reader = factory(aclass, classarg)           # Or aclass(classarg)
processor(reader, ...)


Here, the getattr built-in is again used to fetch a module attribute given a string name (it's like saying obj.attr, but attr is a string). Because this code snippet assumes a single constructor argument, it doesn't strictly need factory or apply—we could make an instance with just aclass(classarg). They may prove more useful in the presence of unknown argument lists, however, and the general factory coding pattern can improve the code's flexibility. For more details on this topic, please consult books that cover OOP design and design patterns.

			30.5.4.8  Methods Are Objects: Bound or Unbound

Methods are a kind of object, much like functions. Class methods can be accessed from an instance or a class, and hence, they actually come in two flavors in Python:


Unbound class method objects: no self

    Accessing a function attribute of a class by qualifying a class returns an unbound method object. To call the method, you must provide an instance object explicitly as the first argument.

Bound instance method objects:self + function pairs

    Accessing a function attribute of a class by qualifying an instance returns a bound method object. Python automatically packages the instance with the function in the bound method object, so you don't need to pass an instance to call the method.

Both kinds of methods are full-fledged objects; they can be passed around, stored in lists, and so on. Both also require an instance in their first argument when run (i.e., a value for self). This is why we had to pass in an instance explicitly when calling superclass methods from subclass methods in the previous chapter; technically, such calls produce unbound method objects.

When calling a bound method object, Python provides an instance for you automatically—the instance used to create the bound method object. This means that bound method objects are usually interchangeable with simple function objects, and makes them especially useful for interfaces originally written for functions (see the sidebar "Why You Will Care: Bound Methods and Callbacks" for a realistic example).

To illustrate, suppose we define the following class:


class Spam:
    def doit(self, message):
        print message


Now, in normal operation, we make an instance, and call its method in a single step to print the passed-in argument:


object1 = Spam(  )
object1.doit('hello world')


Really, though, a bound method object is generated along the way, just before the method call's parentheses. In fact, we can fetch a bound method without actually calling it. An object.name qualification is an object expression. In the following, it returns a bound method object that packages the instance (object1) with the method function (Spam.doit). We can assign this bound method to another name, and then call it as though it were a simple function:


object1 = Spam(  )
x = object1.doit        # Bound method object: instance+function
x('hello world')        # Same effect as object1.doit('...')


On the other hand, if we qualify the class to get to doit, we get back an unbound method object, which is simply a reference to the function object. To call this type of method, we must pass in an instance as the leftmost argument:


object1 = Spam(  )
t = Spam.doit           # Unbound method object
t(object1, 'howdy')     # Pass in instance


By extension, the same rules apply within a class' method if we reference self attributes that refer to functions in the class. A self.method expression is a bound method object because self is an instance object:


class Eggs:
    def m1(self, n):
        print n
    def m2(self):
        x = self.m1     # Another bound method object
        x(42)           # Looks like a simple function

Eggs(  ).m2(  )              # Prints 42


Most of the time, you call methods immediately after fetching them with qualification, so you don't always notice the method objects generated along the way. But if you start writing code that calls objects generically, you need to be careful to treat unbound methods specially—they normally require an explicit instance object to be passed in.[74]

    [74] * See the discussion of static and class methods in Chapter 26 for an optional exception to this rule. Like bound methods, both of these can masquerade as basic functions, too, because they do not expect instances when called.

Now that you understand the method object model, for other examples of bound methods at work, see this chapter's sidebar "Why You Will Care: Bound Methods and Callbacks," and the prior chapter's discussion of callback handlers in "Section 24.4.9."

			30.5.4.9  Documentation Strings Revisited

Docstrings, which we covered in detail in Chapter 14, are string literals that show up at the top of various structures, and are automatically saved by Python in the corresponding objects' __doc__ attributes. This works for module files, function defs, and classes and methods. Now that we know more about classes and methods, the file docstr.py provides a quick but comprehensive example that summarizes the places where docstrings can show up in your code. All of these can be triple-quoted blocks:


"I am: docstr.__doc__"

class spam:
    "I am: spam.__doc__ or docstr.spam.__doc__"
    def method(self, arg):
        "I am: spam.method.__doc__ or self.method.__doc__"
        pass

def func(args):
    "I am: docstr.func.__doc__"
    pass


Why You Will Care: Bound Methods and Callbacks

Because bound methods automatically pair an instance with a class method function, you can use them anywhere a simple function is expected. One of the most common places you'll see this idea put to work is in code that registers methods as event callback handlers in the Tkinter GUI interface. Here's the simple case:


def handler(  ):
    ...use globals for state...
...
widget = Button(text='spam', command=handler)


To register a handler for button click events, we usually pass a callable object that takes no arguments to the command keyword argument. Function names (and lambdas) work here, and so do class methods, as long as they are bound methods:


class MyWidget:
    def handler(self):
        ...use self.attr for state...
    def makewidgets(self):
        b = Button(text='spam', command=self.handler)


Here, the event handler is self.handler—a bound method object that remembers both self and MyGui.handler. Because self will refer to the original instance when handler is later invoked on events, the method will have access to instance attributes that can retain state between events. With simple functions, state normally must be retained in global variables instead. See also the discussion of __call__ operator overloading in Chapter 24 for another way to make classes compatible with function-based APIs.


The main advantage of documentation strings is that they stick around at runtime. Thus, if it's been coded as a docstring, you can qualify an object with its __doc__ attribute to fetch its documentation:


>>> import docstr
>>> docstr.__doc__
'I am: docstr.__doc__'

>>> docstr.spam.__doc__
'I am: spam.__doc__ or docstr.spam.__doc__'

>>> docstr.spam.method.__doc__
'I am: spam.method.__doc__ or self.method.__doc__'
>>> docstr.func.__doc__
'I am: docstr.func.__doc__'


A discussion of the PyDoc tool, which knows how to format all these strings in reports, appears in Chapter 14.

Documentation strings are available at runtime, but they are less flexible syntactically than # comments (which can appear anywhere in a program). Both forms are useful tools, and any program documentation is good (as long as it's accurate).

			30.5.4.10 Classes Versus Modules

We'll wrap up this chapter by briefly comparing the topics of this book's last two parts: modules and classes. Because they're both about namespaces, the distinction can be confusing. In short:


Modules

        Are data/logic packages.

        Are created by writing Python files or C extensions.

        Are used by being imported.


Classes

        Implement new objects.

        Are created by class statements.

        Are used by being called.

        Always live within a module.

Classes also support extra features that modules don't, such as operator overloading, multiple instance generation, and inheritance. Although both classes and modules are namespaces, you should be able to tell by now that they are very different things.

			30.5.4.11 Chapter Summary
In this chapter, we sampled common ways to use and combine classes to optimize their reusability and factoring benefits—what are usually considered design issues that are often independent of any particular programming language (though Python can make them easier to implement). We studied delegation (wrapping objects in proxy classes), composition (controlling embedded objects), inheritance (acquiring behavior from other classes), and some more esoteric concepts such as multiple inheritance, bound methods, and factories.

The next chapter ends our look at classes and OOP by surveying more advanced class-related topics; some of its material may be of more interest to tool writers than application programmers, but it still merits a review by most people who will do OOP in Python. First, though, another quick chapter quiz.

BRAIN BUILDER

Chapter Quiz

Q:	What is multiple inheritance?
Q:	What is delegation?
Q:	What is composition?
Q:	What are bound methods?



Quiz Answers

A:	Multiple inheritance occurs when a class inherits from more than one superclass; it's useful for mixing together multiple packages of class-based code.
A:	Delegation involves wrapping an object in a proxy class, which adds extra behavior, and passes other operations to the wrapped object. The proxy retains the interface of the wrapped object.
A:	Composition is a technique whereby a controller class embeds and directs a number of objects, and provides an interface all its own; it's a way to build up larger structures with classes.
A:	Bound methods combine an instance and a method function; you can call them without passing in an instance object explicitly because the original instance is still available.

		30.5.5. Advanced Class Topics
This chapter concludes Part 6 and our look at OOP in Python by presenting a few more advanced class-related topics: we will survey subclassing built-in types, pseudoprivate attributes, new-style classes, static methods, function decorators, and more.

As we've seen, Python's OOP model is, at its core, very simple, and some of the topics presented in this chapter are so advanced and optional that you may not encounter them very often in your Python applications-programming career. In the interest of completeness, though, we'll round out our discussion of classes with a brief look at these advanced tools for advanced OOP work.

As usual, because this is the last chapter in this part of the book, it ends with a section on class-related gotchas, and the set of lab exercises for this part. I encourage you to work through the exercises to help cement the ideas we've studied here. I also suggest working on or studying larger OOP Python projects as a supplement to this book. As with much in computing, the benefits of OOP tend to become more apparent with practice.

			30.5.5.1 Extending Built-in Types

Besides implementing new kinds of objects, classes are sometimes used to extend the functionality of Python's built-in types to support more exotic data structures. For instance, to add queue insert and delete methods to lists, you can code classes that wrap (embed) a list object, and export insert and delete methods that process the list specially, like the delegation technique studied in Chapter 25. As of Python 2.2, you can also use inheritance to specialize built-in types. The next two sections show both techniques in action.

				30.5.5.1.1 Extending Types by Embedding

Remember those set functions we wrote in Part 4 Here's what they look like brought back to life as a Python class. The following example (the file setwrapper.py) implements a new set object type by moving some of the set functions to methods, and adding some basic operator overloading. For the most part, this class just wraps a Python list with extra set operations. Because it's a class, it also supports multiple instances and customization by inheritance in subclasses:
Code View: Scroll / Show All


class Set:
   def __init__(self, value = []):      # Constructor
       self.data = []                 # Manages a list
       self.concat(value)

   def intersect(self, other):        # other is any sequence
       res = []                       # self is the subject
       for x in self.data:
           if x in other:             # Pick common items
               res.append(x)
       return Set(res)                # Return a new Set

   def union(self, other):            # other is any sequence
       res = self.data[:]             # Copy of my list
       for x in other:                # Add items in other
           if not x in res:
               res.append(x)
       return Set(res)

   def concat(self, value):           # value: list, Set...
       for x in value:                # Removes duplicates
          if not x in self.data:
               self.data.append(x)

   def __len__(self):          return len(self.data)        # len(self)
   def __getitem__(self, key): return self.data[key]        # self[i]
   def __and__(self, other):   return self.intersect(other) # self & other
   def __or__(self, other):    return self.union(other)     # self | other
   def __repr__(self):         return 'Set:' + 'self.data'  # Print

					  


Overloading indexing enables instances of our Set class to masquerade as real lists. Because you will interact with and extend this class in an exercise at the end of this chapter, I won't say much more about this code until Appendix B.

				30.5.5.1.2 Extending Types by Subclassing

Beginning with Python 2.2, all the built-in types can now be subclassed directly. Type-conversion functions such as list, str, dict, and tuple have become built-in type names—although transparent to your script, a type-conversion call (e.g., list('spam')) is now really an invocation of a type's object constructor.

This change allows you to customize or extend the behavior of built-in types with user-defined class statements: simply subclass the new type names to customize them. Instances of your type subclasses can be used anywhere that the original built-in type can appear. For example, suppose you have trouble getting used to the fact that Python list offsets begin at 0 instead of 1. Not to worry—you can always code your own subclass that customizes this core behavior of lists. The file typesubclass.py shows how:


# Subclass built-in list type/class.
# Map 1..N to 0..N-1; call back to built-in version.

class MyList(list):
    def __getitem__(self, offset):
        print '(indexing %s at %s)' % (self, offset)
        return list.__getitem__(self, offset - 1)

if __name__ == '__main__':
    print list('abc')
    x = MyList('abc')               # __init__ inherited from list
    print x                         # __repr__ inherited from list

    print x[1]                      # MyList.__getitem__
    print x[3]                      # Customizes list superclass method

    x.append('spam'); print x       # Attributes from list superclass
    x.reverse(  );      print x


In this file, the MyList subclass extends the built-in list's __getitem__ indexing method only to map indexes 1 to N back to the required 0 to N−1. All it really does is decrement the index submitted, and call back to the superclass' version of indexing, but it's enough to do the trick:


% python typesubclass.py
['a', 'b', 'c']
['a', 'b', 'c']
(indexing ['a', 'b', 'c'] at 1)
a
(indexing ['a', 'b', 'c'] at 3)
c
['a', 'b', 'c', 'spam']
['spam', 'c', 'b', 'a']


This output also includes tracing text the class prints on indexing. Whether changing indexing this way is a good idea in general is another issue—users of your MyList class may very well be confused by such a core departure from Python sequence behavior. The fact that you can customize built-in types this way can be a powerful tool though, in general.

For instance, this coding pattern gives rise to an alternative way to code sets—as a subclass of the built-in list type, rather than a standalone class that manages an embedded list object. The following class, coded in the file setsubclass.py, customizes lists to add just methods and operators related to set processing. Because all other behavior is inherited from the built-in list superclass, this makes for a shorter and simpler alternative:
Code View: Scroll / Show All


class Set(list):
    def __init__(self, value = []):        # Constructor
        list.__init__([])                  # Customizes list
        self.concat(value)               # Copies mutable defaults

    def intersect(self, other):          # other is any sequence
        res = []                         # self is the subject
        for x in self:
            if x in other:               # Pick common items
                res.append(x)
        return Set(res)                  # Return a new Set

    def union(self, other):              # other is any sequence
        res = Set(self)                  # Copy me and my list
        res.concat(other)
        return res

    def concat(self, value):             # value: list, Set . . .
        for x in value:                  # Removes duplicates
            if not x in self:
                self.append(x)

    def __and__(self, other): return self.intersect(other)
    def __or__(self, other):  return self.union(other)
    def __repr__(self):       return 'Set:' + list.__repr__(self)

if __name__ == '__main__':
    x = Set([1,3,5,7])
    y = Set([2,1,4,5,6])
    print x, y, len(x)
    print x.intersect(y), y.union(x)
    print x & y, x | y
    x.reverse(  ); print x

					  


Here is the output of the self-test code at the end of this file. Because subclassing core types is an advanced feature, I'll omit further details here, but I invite you to trace through these results in the code to study its behavior:


% python setsubclass.py
Set:[1, 3, 5, 7] Set:[2, 1, 4, 5, 6] 4
Set:[1, 5] Set:[2, 1, 4, 5, 6, 3, 7]
Set:[1, 5] Set:[1, 3, 5, 7, 2, 4, 6]
Set:[7, 5, 3, 1]


There are more efficient ways to implement sets with dictionaries in Python, which replace the linear scans in the set implementations shown here with dictionary index operations (hashing), and so run much quicker. (For more details, see Programming Python.) If you're interested in sets, also take another look at the set object type we explored in Chapter 5; this type provides set operations as built-in tools. Set implementations are fun to experiment with, but they are no longer strictly required in Python today.

For another type subclassing example, see the implementation of the new bool type in Python 2.3: as mentioned earlier in the book, bool is a subclass of int with two instances (True and False) that behave like the integers 1 and 0, but inherit custom string-representation methods that display their names.

			30.5.5.2 Pseudoprivate Class Attributes
In Part 4, we learned that every name assigned at the top level of a module file is exported. By default, the same holds for classes—data hiding is a convention, and clients may fetch or change any class or instance attribute they like. In fact, attributes are all "public" and "virtual" in C++ terms; they're all accessible everywhere, and looked up dynamically at runtime.[75]

    [75] * This tends to scare C++ people unnecessarily. In Python, it's even possible to change or completely delete a class method at runtime. On the other hand, almost nobody ever does in practical programs. As a scripting language, Python is more about enabling than restricting. Also, recall from our discussion of operator overloading in Chapter 24 that __getattr__ and __setattr__ can be used to emulate privacy, but are generally not used for this in practice.

That's still true today. However, Python also supports the notion of name "mangling" (i.e., expansion) to localize some names in classes. Mangled names are sometimes misleadingly called "private attributes," but really this is just a way to localize a name to the class that created it—name mangling does not prevent access by code outside the class. This feature is mostly intended to avoid namespace collisions in instances, not to restrict access to names in general; mangled names are therefore better called "pseudoprivate" than "private."

Pseudoprivate names are an advanced and entirely optional feature, and you probably won't find them very useful until you start writing large class hierarchies in multi-programmer projects. But, because you may see this feature in other people's code, you need to be somewhat aware of it, even if you don't use it yourself.

				30.5.5.2.1 Name Mangling Overview

Here's how name mangling works: names inside a class statement that start with two underscores, but don't end with two underscores, are automatically expanded to include the name of the enclosing class. For instance, a name like __X within a class named Spam is changed to _Spam__X automatically: the original name is prefixed with a single underscore, and the enclosing class' name. Because the modified name contains the name of the enclosing class, it's somewhat unique; it won't clash with similar names created by other classes in a hierarchy.

Name mangling happens only in class statements, and only for names that begin with two leading underscores. However, it happens for every name preceded with double underscores, including method names and instance attribute names (for example, in our Spam class, the instance attribute reference self.__X would be transformed to self._Spam__X). Because more than one class may add attributes to an instance, this mangling helps avoid clashes—but we need to move on to an example to see how.

				30.5.5.2.2 Why Use Pseudoprivate Attributes?

The problem that the pseudoprivate attribute feature is meant to alleviate has to do with the way instance attributes are stored. In Python, all instance attributes wind up in the single instance object at the bottom of the class tree. This is very different from the C++ model, where each class gets its own space for data members it defines.

Within a class method in Python, whenever a method assigns to a self attribute (e.g., self.attr = value), it changes or creates an attribute in the instance (inheritance searches only happen on reference, not on assignment). Because this is true even if multiple classes in a hierarchy assign to the same attribute, collisions are possible.

For example, suppose that when a programmer codes a class, she assumes that she owns the attribute name X in the instance. In this class' methods, the name is set, and later fetched:


class C1:
    def meth1(self): self.X = 88         # Assume X is mine
    def meth2(self): print self.X


Suppose further that another programmer, working in isolation, makes the same assumption in a class that she codes:


class C2:
    def metha(self): self.X = 99         # Me too
    def methb(self): print self.X


Both of these classes work by themselves. The problem arises if the two classes are ever mixed together in the same class tree:


class C3(C1, C2): ...
I = C3(  )                                 # Only 1 X in I!


Now, the value that each class gets back when it says self.X will depend on which class assigned it last. Because all assignments to self.X refer to the same single instance, there is only one X attribute—I.X—no matter how many classes use that attribute name.

To guarantee that an attribute belongs to the class that uses it, prefix the name with double underscores everywhere it is used in the class, as in this file, private.py:


class C1:
    def meth1(self): self.__X = 88       # Now X is mine
    def meth2(self): print self.__X      # Becomes _C1__X in I
class C2:
    def metha(self): self.__X = 99       # Me too
    def methb(self): print self.__X      # Becomes _C2__X in I

class C3(C1, C2): pass
I = C3(  )                                 # Two X names in I

I.meth1(  ); I.metha(  )
print I.__dict__
I.meth2(  ); I.methb(  )


When thus prefixed, the X attributes will be expanded to include the names of their classes before being added to the instance. If you run a dir call on I, or inspect its namespace dictionary after the attributes have been assigned, you'll see the expanded names, _C1__X and _C2__X, but not X. Because the expansion makes the names unique within the instance, the class coders can safely assume that they truly own any names that they prefix with two underscores:


% python private.py
{'_C2__X': 99, '_C1__X': 88}
88
99


This trick can avoid potential name collisions in the instance, but note that it does not amount to true privacy. If you know the name of the enclosing class, you can still access either of these attributes anywhere you have a reference to the instance by using the fully expanded name (e.g., I._C1__X = 77). On the other hand, this feature makes it less likely that you will accidentally step on a class' names.

Again, I should note that this feature tends to be more useful for larger, multi-programmer projects, and then only for selected names. Don't be tempted to clutter your code unnecessarily; only use this feature for names that truly need to be controlled by a single class. For simpler programs, it's probably overkill.

	

Also, see the emulation of private instance attributes sketched in Chapter 24, in the __getattr__ section. Although it's possible to emulate access controls in Python classes, this is rarely done in practice, even for large systems.

			30.5.5.3 New-Style Classes
In Release 2.2, Python introduced a new flavor of classes, known as "new-style" classes; the classes covered so far in this part of the book are known as "classic classes" when comparing them to the new kind.

New-style classes are only slightly different from classic classes, and the ways in which they differ are completely irrelevant to the vast majority of Python users. Moreover, the classic class model, which has been with Python for some 15 years, still works exactly as I've described previously.

New-style classes are almost completely backward compatible with classic classes in syntax and behavior; they mostly just add a few advanced new features. However, because they modify one special case of inheritance, they had to be introduced as a distinct tool so as to avoid impacting any existing code that depends on the prior behavior.

New-style classes are coded with all the normal class syntax we have studied. The chief coding difference is that you subclass from a built-in type (e.g., list) to produce a new-style class. A new built-in name, object, is provided to serve as a superclass for new-style classes if no other built-in type is appropriate to use:


class newstyle(object):
    ...normal code...


More generally, any class derived from object, or any other built-in type, is automatically treated as a new-style class. (By derived, I mean that this includes subclasses of object, subclasses of subclasses of object, and so on—as long as a built-in is somewhere in the superclass tree, the new class will be treated as a new-style class.) Classes not derived from built-ins are considered classic.

	

Per Python creator Guido van Rossum, in Python 3.0, all classes will automatically be new-style, so the requirement of being derived from a built-in superclass will no longer exist. Because even standalone classes will be considered new-style, and because new-style classes are almost completely backward compatible with classic classes, for most programmers, the change will be transparent.

In the past, there was some concern that top-level classes might need to derive from object in Python 3.0, but Guido has recently stated that this won't be required. To most programmers, all classes in 3.0 will work as described in this book, but with the additional new-style features available. I can't predict the future completely, though, so be sure to check the 3.0 release notes for more on this front.

				30.5.5.3.1 Diamond Inheritance Change

Perhaps the most visible change in new-style classes is their slightly different treatment of inheritance for the so-called diamond pattern of multiple inheritance trees, where more than one superclass leads to the same higher superclass further above. The diamond pattern is an advanced design concept that we have not even discussed for normal classes.

In short, with classic classes, the inheritance search procedure is strictly depth first, and then left to right—Python climbs all the way to the top, hugging the left side of the tree, before it backs up, and begins to look further to the right. In new-style classes, the search is more breadth-first in such cases—Python first looks in any superclasses to the right of the first one searched before ascending all the way to the common superclass at the top. Because of this change, lower superclasses can overload attributes of higher superclasses, regardless of the sort of multiple inheritance trees they are mixed into.

					30.5.5.3.1.1 Diamond inheritance example

To illustrate, consider this simplistic incarnation of the diamond inheritance pattern for classic classes:


>>> class A:      attr = 1  # Classic
>>> class B(A):   pass 
>>> class C(A):   attr = 2 
>>> class D(B,C): pass  # Tries A before C
>>> x = D(  ) 
>>> x.attr 
1


The attribute here was found in superclass A, because with classic classes, the inheritance search climbs as high as it can before backing up and moving right—Python will search D, B, A, and then C (but will stop when attr is found in A, above B). With the new-style classes derived from a built-in like object, though, Python looks in C (to the right of B) before A (above B)—that is, it searches D, B, C, and then A (and in this case, stops in C):


>>> class A(object): attr = 1  # New style
>>> class B(A):      pass 
>>> class C(A):      attr = 2 
>>> class D(B,C):    pass  # Tries C before A
>>> x = D(  ) 
>>> x.attr 
2


This change in the inheritance search procedure is based upon the assumption that if you mix in C lower in the tree, you probably intend to grab its attributes in preference to A's. It also assumes that C is always intended to override A's attributes, which is probably true when it's used standalone, but may not be when it's mixed into a diamond with classic classes—you might not even know that C may be mixed in like this when you code it.
					30.5.5.3.1.2 Explicit conflict resolution

Of course, the problem with assumptions is that they assume things. If this search order deviation seems too subtle to remember, or if you want more control over the search process, you can always force the selection of an attribute from anywhere in the tree by assigning or otherwise naming the one you want at the place where the classes are mixed together:


>>> class A:      attr = 1  # Classic
>>> class B(A):   pass 
>>> class C(A):   attr = 2 
>>> class D(B,C): attr = C.attr  # Choose C, to the right
>>> x = D(  ) 
>>> x.attr  # Works like new style
2


Here, a tree of classic classes is emulating the search order of new-style classes: the assignment to the attribute in D picks the version in C, thereby subverting the normal inheritance search path (D.attr will be lowest in the tree). New-style classes can similarly emulate classic classes by choosing the attribute above at the place where the classes are mixed together:


>>> class A(object): attr = 1  # New style
>>> class B(A):      pass 
>>> class C(A):      attr = 2 
>>> class D(B,C):    attr = B.attr  # Choose A.attr, above
>>> x = D(  ) 
>>> x.attr  # Works like classic
1


If you are willing to always resolve conflicts like this, you can largely ignore the search order difference, and not rely on assumptions about what you meant when you coded your classes. Naturally, attributes picked this way can also be method functions—methods are normal, assignable objects:


>>> class A: 
...    def meth(s): print 'A.meth' 
>>> class C(A): 
...     def meth(s): print 'C.meth' 
>>> class B(A): 
...     pass 
>>> class D(B,C): pass  # Use default search order
>>> x = D(  )  # Will vary per class type
>>> x.meth(  )  # Defaults to classic order
A.meth

>>> class D(B,C): meth = C.meth  # Pick C's method: new style
>>> x = D(  ) 
>>> x.meth(  ) 
C.meth

>>> class D(B,C): meth = B.meth  # Pick B's method: classic
>>> x = D(  ) 
>>> x.meth(  ) 
A.meth


Here, we select methods by explicitly assigning to names lower in the tree. We might also simply call the desired class explicitly; in practice, this pattern might be more common, especially for things like constructors:


class D(B,C):
    def meth(self):                   # Redefine lower
        ...
        C.meth(self)                  # Pick C's method by calling


Such selections by assignment or call at mix-in points can effectively insulate your code from this difference in class flavors. Explicitly resolving the conflicts this way ensures that your code won't vary per Python version in the future (apart from perhaps needing to derive classes from a built-in type for the new style).[76]

    [76] * Even without the classic/new divergence, this technique may sometimes come in handy in multiple inheritance scenarios in general. If you want part of a superclass on the left and part of a superclass on the right, you might need to tell Python which same-named attributes to choose by using explicit assignments in subclasses. We'll revisit this notion in a gotcha at the end of this chapter. Also note that diamond inheritance patterns can be more problematic in some cases than I've implied here (e.g., what if B and C both have required constructors that call to A's?), but this is beyond this book's scope.

In sum, by default, the diamond pattern is searched differently for classic and new-style classes, and this is a nonbackward-compatible change. However, keep in mind that this change only affects diamond pattern cases; new-style class inheritance works unchanged for all other inheritance tree structures. Further, it's not impossible that this entire issue may be of more theoretical than practical importance—because it wasn't significant enough to change until 2.2, it seems unlikely to impact much Python code.
				30.5.5.3.2 Other New-Style Class Extensions

Beyond this change in the diamond inheritance search pattern (which is itself too obscure to matter to most readers of this book), new-style classes open up a handful of even more advanced possibilities. Here's a brief look at each.

					30.5.5.3.2.1 Static and class methods

As of Python 2.2, it is possible to define methods within a class that can be called without an instance: static methods work roughly like simple instanceless functions inside a class, and class methods are passed a class instead of an instance. Special built-in functions called staticmethod and classmethod must be called within the class to enable these method modes. Although this feature was added in conjunction with new-style classes, static and class methods work for classic classes, too. Because of that, we'll save this topic for the next section.

					30.5.5.3.2.2 Instance slots

By assigning a list of string attribute names to a special __slots__ class attribute, it is possible for a new-style class to limit the set of legal attributes that instances of the class will have. This special attribute is typically set by assigning to the variable __slots__ at the top level of a class statement: only those names in the __slots__ list can be assigned as instance attributes. However, like all names in Python, instance attribute names must still be assigned before they can be referenced, even if listed in __slots__. Here's an example to illustrate:


>>> class limiter(object): 
...     __slots__ = ['age', 'name', 'job'] 
...
>>> x = limiter(  ) 
>>> x.age  # Must assign before use
AttributeError: age

>>> x.age = 40 
>>> x.age 
40
>>> x.ape = 1000  # Illegal: not in slots
AttributeError: 'limiter' object has no attribute 'ape'


This feature was envisioned as a way to catch "typo" errors (assignments to illegal attribute names not in __slots__ are detected), and as an optimization mechanism (slot attributes may be stored in a tuple instead of a dictionary for quicker lookup).

Slots are something of a break with Python's dynamic nature, which dictates that any name may be created by assignment. They also have additional constraints and implications that are far too complex for us to discuss here. For example, some instances with slots may not have a __dict__ attribute dictionary, which can make some of the metaprograms we've coded in this book more complex; tools that generically list attributes, for instance, may have to inspect two sources instead of one. See the Python 2.2 release documents and Python's standard manual set for more details.

					30.5.5.3.2.3 Class properties

A mechanism known as properties provides another way for new-style classes to define automatically called methods for access or assignment to instance attributes. This feature is an alternative to many current uses of the __getattr__ and __setattr__ overloading methods we studied in Chapter 24. Properties have a similar effect to these two methods, but they incur an extra method call only for accesses to names that require dynamic computation. Properties (and slots) are based on a new notion of attribute descriptors, which is too advanced for us to cover here.

In short, properties are a type of object assigned to class attribute names. They are generated by calling a property built-in with three methods (handlers for get, set, and delete operations), as well as a docstring; if any argument is passed as None or omitted, that operation is not supported. Properties are typically assigned at the top level of a class statement [e.g., name = property(...)]. When thus assigned, accesses to the class attribute itself (e.g., obj.name) are automatically routed to one of the accessor methods passed into the property. For example, the __getattr__ method allows classes to intercept undefined attribute references:


>>> class classic: 
...     def __getattr__(self, name): 
...         if name == 'age': 
...             return 40 
...         else: 
...             raise AttributeError 
...
>>> x = classic(  ) 
>>> x.age  # Runs __getattr__
40
>>> x.name  # Runs __getattr__
AttributeError


Here is the same example, coded with properties instead:


>>> class newprops(object): 
...     def getage(self): 
...         return 40 
...     age = property(getage, None, None, None)  # get,set,del,docs
...
>>> x = newprops(  ) 
>>> x.age  # Runs getage
40
>>> x.name  # Normal fetch
AttributeError: newprops instance has no attribute 'name'


For some coding tasks, properties can be less complex and quicker to run than the traditional techniques. For example, when we add attribute assignment support, properties become more attractive—there's less code to type, and no extra method calls are incurred for assignments to attributes we don't wish to compute dynamically:


>>> class newprops(object): 
...     def getage(self): 
...         return 40 
...     def setage(self, value): 
...         print 'set age:', value 
...         self._age = value 
...     age = property(getage, setage, None, None) 
...
>>> x = newprops(  ) 
>>> x.age  # Runs getage
40
>>> x.age = 42  # Runs setage
set age: 42
>>> x._age  # Normal fetch; no getage call
42
>>> x.job = 'trainer'  # Normal assign; no setage call
>>> x.job  # Normal fetch; no getage call
'trainer'


The equivalent classic class might trigger extra method calls, and may need to route attribute assignments through the attribute dictionary to avoid loops:
Code View: Scroll / Show All


>>> class classic: 
...     def __getattr__(self, name):  # On undefined reference
...         if name == 'age': 
...             return 40 
...         else: 
...             raise AttributeError 
...     def __setattr__(self, name, value):  # On all assignments
...         print 'set:', name, value 
...         if name == 'age': 
...             self.__dict__['_age'] = value 
...         else: 
...             self.__dict__[name] = value 
...
>>> x = classic(  ) 
>>> x.age  # Runs __getattr__
40
>>> x.age = 41  # Runs __setattr__
set: age 41
>>> x._age  # Defined:
no __getattr__ call
41
>>> x.job = 'trainer'  # Runs __setattr__ again
>>> x.job  # Defined:
no __getattr__ call

					  


Properties seem like a win for this simple example. However, some applications of __getattr__ and __setattr__ may still require more dynamic or generic interfaces than properties directly provide. For example, in many cases, the set of attributes to be supported cannot be determined when the class is coded, and may not even exist in any tangible form (e.g., when delegating arbitrary method references to a wrapped/embedded object generically). In such cases, a generic __getattr__ or a __setattr__ attribute handler with a passed-in attribute name may be preferable. Because such generic handlers can also handle simpler cases, properties are largely an optional extension.

					30.5.5.3.2.4 New __getattribute__ overloading method

The __getattribute__ method, available for new-style classes only, allows a class to intercept all attribute references, not just undefined references (like __getattr__). It is also substantially trickier to use than __getattr__ and __setattr__ (it is prone to loops). I'll defer to Python's standard documentation for more details on this method.

Besides all these feature additions, new-style classes integrate with the notion of subclassable types mentioned earlier in this chapter; subclassable types and new-style classes were introduced in conjunction with a merging of the type/class dichotomy in Python 2.2 and beyond.

Because new-style class features are all advanced topics, we won't go into further details in this introductory text. Please see the Python 2.2 release documentation and the language reference for more information.

			30.5.5.4 Static and Class Methods
In Python releases prior to 2.2, class method functions can never be called without an instance. In Python 2.2 and later, this is also the default behavior, but it can be modified with a new optional feature known as static methods—simple functions with no self argument that appear nested in a class, and are designed to work on class attributes instead of instance attributes. Such methods usually keep track of information that spans all instances (e.g., the number created), rather than providing behavior for instances.

In the prior chapter, we talked about unbound methods: when we fetch a method function by qualifying a class (instead of an instance), we get an unbound method object. Even though they are defined with def statements, unbound method objects are not simple functions; they cannot be called without an instance.

For example, suppose we want to use class attributes to count how many instances are generated from a class (as in the following file, spam.py). Remember, class attributes are shared by all instances, so we can store the counter in the class object itself:


class Spam:
    numInstances = 0
    def __init__(self):
        Spam.numInstances = Spam.numInstances + 1
    def printNumInstances(  ):
        print "Number of instances created: ", Spam.numInstances


But this won't work—the printNumInstances method still expects an instance to be passed in when called because the function is associated with a class (even though there are no arguments in the def header):


>>> from spam import *
>>> a = Spam(  )
>>> b = Spam(  )
>>> c = Spam(  )
>>> Spam.printNumInstances(  )
Traceback (innermost last):
  File "<stdin>", line 1, in ?
TypeError: unbound method must be called with class instance 1st argument


The problem here is that unbound instance methods aren't exactly the same as simple functions. This is mostly a knowledge issue, but if you want to call functions that access class members without an instance, probably the most straightforward idea is to just make them simple functions, not class methods. This way, an instance isn't expected in the call:


def printNumInstances(  ):
    print "Number of instances created: ", Spam.numInstances

class Spam:
    numInstances = 0
    def __init__(self):
        Spam.numInstances = Spam.numInstances + 1

>>> import spam
>>> a = spam.Spam(  )
>>> b = spam.Spam(  )
>>> c = spam.Spam(  )
>>> spam.printNumInstances(  )
Number of instances created:  3
>>> spam.Spam.numInstances
3


Because the class name is accessible to the simple function as a global variable, this works fine. Also, note that the name of the function becomes global, but only to this single module; it will not clash with names in other files of the program.

We can also make this work by calling the function through an instance, as usual, although this can be inconvenient if making an instance changes the class data:


class Spam:
    numInstances = 0
    def __init__(self):
        Spam.numInstances = Spam.numInstances + 1
    def printNumInstances(self):
        print "Number of instances created: ", Spam.numInstances

>>> from spam import Spam
>>> a, b, c = Spam(), Spam(  ), Spam(  )
>>> a.printNumInstances(  )
Number of instances created:  3
>>> b.printNumInstances(  )
Number of instances created:  3
>>> Spam(  ).printNumInstances(  )
Number of instances created:  4


Prior to Python 2.2's static method extension, some language theorists claimed that the availability of this technique meant that Python didn't have class methods, only instance methods. I suspect they really meant that Python classes don't work the same as classes in some other languages. What Python really has are bound and unbound method objects, with well-defined semantics; qualifying a class gets you an unbound method, which is a special kind of function. Python does have class attributes, but functions in classes expect an instance argument.

Moreover, because Python already provides modules as a namespace-partitioning tool, there's usually no need to package functions in classes unless they implement object behavior. Simple functions within modules usually do most of what instanceless class methods could. For example, in the first code sample in this section, printNumInstances is already associated with the class because it lives in the same module. The only lost functionality is that the function name has a broader scope—the entire module, rather than the class.

				30.5.5.4.1 Using Static and Class Methods

Today, there is another option for coding simple functions associated with a class. As of Python 2.2, you can code classes with static and class methods, neither of which requires an instance argument to be passed in when they are invoked. To designate such methods, classes call the built-in functions staticmethod and classmethod, as hinted in the earlier discussion of new-style classes. For example:


class Multi:
    def imeth(self, x):          # Normal instance method
        print self, x
    def smeth(x):                # Static: no instance passed
        print x
    def cmeth(cls, x):           # Class: gets class, not instance
        print cls, x
    smeth = staticmethod(smeth)  # Make smeth a static method
    cmeth = classmethod(cmeth)   # Make cmeth a class method.


Notice how the last two assignments in this code simply reassign the method names smeth and cmeth. Attributes are created and changed by any assignment in a class statement, so these final assignments overwrite the assignments made earlier by the defs.

Technically, Python now supports three kinds of class-related methods: instance, static, and class. Instance methods are the normal (and default) case that we've seen in this book. You must always call an instance method with an instance object. When you call it through an instance, Python passes the instance to the first (leftmost) argument automatically; when you call it through a class, you pass along the instance manually:


>>> obj = Multi(  )  # Make an instance
>>> obj.imeth(1)  # Normal call, through instance
<__main__.Multi instance...> 1
>>> Multi.imeth(obj, 2)  # Normal call, through class
<__main__.Multi instance...> 2


By contrast, static methods are called without an instance argument; their names are local to the scopes of the classes in which they are defined, and may be looked up by inheritance. Mostly, they work like simple functions that happen to be coded inside a class:


>>> Multi.smeth(3)  # Static call, through class
3
>>> obj.smeth(4)  # Static call, through instance
4


Class methods are similar, but Python automatically passes the class (not an instance) in to a class method's first (leftmost) argument:


>>> Multi.cmeth(5)  # Class call, through class
__main__.Multi 5
>>> obj.cmeth(6)  # Class call, through instance
__main__.Multi 6


Static and class methods are new and advanced features of the language, with highly specialized roles that we don't have space to document fully here. Static methods are commonly used in conjunction with class attributes to manage information that spans all instances generated from the class. For example, to keep track of the number of instances generated from a class (as in the earlier example), we could use static methods to manage a counter attached as a class attribute. Because such a count has nothing to do with any particular instance, it would be inconvenient to have to access methods that process it through an instance (especially since making an instance to access the counter might change the counter). Moreover, static methods' proximity to the class provides a more natural solution than coding class-oriented functions outside the class.

Here is the static method equivalent of this section's original example:


class Spam:
    numInstances = 0
    def __init__(self):
        Spam.numInstances += 1
    def printNumInstances(  ):
        print "Number of instances:", Spam.numInstances
    printNumInstances = staticmethod(printNumInstances)

>>> a = Spam(  )
>>> b = Spam(  )
>>> c = Spam(  )
>>> Spam.printNumInstances(  )
Number of instances: 3
>>> a.printNumInstances(  )
Number of instances: 3


Compared to simply moving printNumInstances outside the class, as prescribed earlier, this version requires an extra staticmethod call; however, it localizes the function name in the class scope (it won't clash with other names in the module) and moves the function code closer to where it is used (inside the class statement). You should judge for yourself whether this is a net improvement or not.

In recent Python versions, the static method designation has become even simpler; the next section explains how.

			30.5.5.5 Function Decorators
Because the staticmethod call technique described in the prior section seemed obscure to some users, a feature was added to make the operation simpler. Function decorators provide a way to specify special operation modes for functions, by wrapping them in an extra layer of logic implemented as another function.

Function decorators turn out to be general tools: they are useful for adding many types of logic to functions besides the static method use case. For instance, they may be used to augment functions with code that logs calls made to them, checks the types of passed arguments during debugging, and so on. In some ways, function decorators are similar to the delegation design pattern we explored in Chapter 25, but they are designed to augment a specific function or method call, not an entire object interface.

Python provides some built-in function decorators for operations such as marking static methods, but programmers can also code arbitrary decorators of their own. Although they are not strictly tied to classes, user-defined function decorators often are coded as classes to save the original functions, along with other data, as state information.

Syntactically, a function decorator is a sort of runtime declaration about the function that follows. A function decorator is coded on a line just before the def statement that defines a function or method and consists of the @ symbol, followed by what we call a metafunction—a function (or other callable object) that manages another function. Static methods today, for example, may be coded with decorator syntax like this:


class C:
   @staticmethod
   def meth(  ):
       ...


Internally, this syntax has the same effect as the following (passing the function through the decorator and assigning the result back to the original name):


class C:
   def meth(  ):
       ...
   meth = staticmethod(meth)                     # Rebind name


The net effect is that calling the method function's name actually triggers the result of its staticmethod decorator first. Because a decorator can return any sort of object, this allows the decorator to insert a layer of logic to be run on every call. The decorator function is free to return the original function itself or a new object that saves the original function passed to the decorator to be invoked indirectly after the extra logic layer runs.

In fact, decorator syntax supports adding multiple layers of wrapper logic to a decorated function or method. A decorator line of this form:


@A @B @C
def f(  ):
    ...


runs the same as the following:


def f(  ):
    ...
f = A(B(C(f)))


It passes the original function through three different decorators, and assigns the result back to the original name. Again, the net effect is that when the original function name is called, three layers of logic can be invoked to augment the original function.

				30.5.5.5.1 Decorator Example

Here is an example of a user-defined decorator at work. Recall from Chapter 24 that the __call__ operator overloading method implements a function-call interface for class instances. The following code uses this to define a class that saves the decorated function in the instance and catches calls to the original name. Because this is a class, it also has state information (a counter of calls made):
Code View: Scroll / Show All


class tracer:
    def __init__(self, func):
        self.calls = 0
        self.func  = func
    def __call__(self, *args):
        self.calls += 1
        print 'call %s to %s' % (self.calls, self.func.__name__)
        self.func(*args)

@tracer
def spam(a, b, c):            # Wrap spam in a decorator object
    print a, b, c

spam(1, 2, 3)                  # Really calls the tracer wrapper object
spam('a', 'b', 'c')           # Invokes __call__ in class
spam(4, 5, 6)                 # __call__ adds logic and runs original object

					  


Because the spam function is run through the tracer decorator, when the original spam name is called, it actually triggers the __call__ method in the class. This method counts and logs the call, and then dispatches to the original wrapped function. Note how the *name argument syntax is used to pack and unpack arguments passed in; because of this, this decorator can be used to wrap any function with any number of arguments.

The net effect, again, is to add a layer of logic to the original spam function. Here is the script's output—the first line comes from the tracer class, and the second comes from the spam function:


call 1 to spam
1 2 3
call 2 to spam
a b c
call 3 to spam
4 5 6


Trace through this example's code for more insight.

Although they are a general mechanism, function decorators are an advanced feature of interest primarily to tool writers, not application programmers, so I'll again defer to Python's standard manual set for more details on this subject.

			30.5.5.6 Class Gotchas

Most class issues can usually be boiled down to namespace issues (which makes sense, given that classes are just namespaces with a few extra tricks). Some of the topics we'll cover in this section are more like case studies of advanced class usage than problems, and one or two of these gotchas have been eased by recent Python releases.

				30.5.5.6.1 Changing Class Attributes Can Have Side Effects

Theoretically speaking, classes (and class instances) are mutable objects. Like built-in lists and dictionaries, they can be changed in-place by assigning to their attributes—and, as with lists and dictionaries, this means that changing a class or instance object may impact multiple references to it.

That's usually what we want (and is how objects change their state in general), but this becomes especially critical to know when changing class attributes. Because all instances generated from a class share the class' namespace, any changes at the class level are reflected in all instances unless they have their own versions of the changed class attributes.

Because classes, modules, and instances are all just objects with attribute namespaces, you can normally change their attributes at runtime by assignments. Consider the following class. Inside the class body, the assignment to the name a generates an attribute X.a, which lives in the class object at runtime, and will be inherited by all of X's instances:


>>> class X: 
...     a = 1  # Class attribute
...
>>> I = X(  ) 
>>> I.a  # Inherited by instance
1
>>> X.a 
1


So far, so good—this is the normal case. But notice what happens when we change the class attribute dynamically outside the class statement: it also changes the attribute in every object that inherits from the class. Moreover, new instances created from the class during this session or program run get the dynamically set value, regardless of what the class' source code says:


>>> X.a = 2  # May change more than X
>>> I.a  # I changes too
2
>>> J = X(  )  # J inherits from X's runtime values
>>> J.a  # (but assigning to J.a changes a in J, not X or I)
2


Is this a useful feature or a dangerous trap? You be the judge. You can actually get work done by changing class attributes without ever making a single instance; this technique can simulate "records" or "structs" in other languages. As a refresher, consider the following unusual but legal Python program:


class X: pass                       # Make a few attribute namespaces
class Y: pass

X.a = 1                             # Use class attributes as variables
X.b = 2                             # No instances anywhere to be found
X.c = 3
Y.a = X.a + X.b + X.c

for X.i in range(Y.a): print X.i    # Prints 0..5


Here, the classes X and Y work like "fileless" modules—namespaces for storing variables we don't want to clash. This is a perfectly legal Python programming trick, but it's less appropriate when applied to classes written by others; you can't always be sure that class attributes you change aren't critical to the class' internal behavior. If you're out to simulate a C struct, you may be better off changing instances than classes, as that way, only one object is affected:


class Record: pass
X = Record(  )
X.name = 'bob'
X.job  = 'Pizza maker'


				30.5.5.6.2 Multiple Inheritance: Order Matters

This may be obvious, but it's worth underscoring: if you use multiple inheritance, the order in which superclasses are listed in the class statement header can be critical. Python always searches superclasses from left to right, according to their order in the header line.

For instance, in the multiple inheritance example we saw in Chapter 25, suppose that the Super class implemented a __repr__ method, too; would we want to inherit Lister's or Super's? We would get it from whichever class is listed first in Sub's class header, as inheritance searches proceed from left to right. Presumably, we would list Lister first because its whole purpose is its custom __repr__:
Code View: Scroll / Show All


class Lister:
    def __repr__(self): ...

class Super:
    def __repr__(self): ...

class Sub(Lister, Super):    # Get Lister's __repr__ by listing it first

					  


But now suppose Super and Lister have their own versions of other same-named attributes, too. If we want one name from Super, and another from Lister, the order in which we list them in the class header won't help—we will have to override inheritance by manually assigning to the attribute name in the Sub class:
Code View: Scroll / Show All


class Lister:
    def __repr__(self): ...
    def other(self): ...

class Super:
    def __repr__(self): ...
    def other(self): ...

class Sub(Lister, Super):    # Get Lister's __repr__ by listing it first
    other = Super.other      # But explicitly pick Super's version of other
    def __init__(self):
        ...

x = Sub(  )                    # Inheritance searches Sub before Super/Lister

					  


Here, the assignment to other within the Sub class creates Sub.other—a reference back to the Super.other object. Because it is lower in the tree, Sub.other effectively hides Lister.other, the attribute that the inheritance search would normally find. Similarly, if we listed Super first in the class header to pick up its other, we would need to select Lister's method explicitly:
Code View: Scroll / Show All


class Sub(Super, Lister):                 # Get Super's other by order
    __repr__ = Lister.__repr__    # Explicitly pick Lister.__repr__

					  


Multiple inheritance is an advanced tool. Even if you understood the last paragraph, it's still a good idea to use it sparingly and carefully. Otherwise, the meaning of a name may come to depend on the order in which classes are mixed in an arbitrarily far-removed subclass. (For another example of the technique shown here in action, see the discussion of explicit conflict resolution in "Section 26.3" earlier in this chapter.)

As a rule of thumb, multiple inheritance works best when your mix-in classes are as self-contained as possible—because they may be used in a variety of contexts, they should not make assumptions about names related to other classes in a tree. The pseudoprivate attributes feature we studied earlier can help by localizing names that a class relies on owning, and limiting the names that your mix-in classes add to the mix. In this example, for instance, if Lister only means to export its custom __repr__, it can name its other method __other to avoid clashing with other classes.

				30.5.5.6.3 Methods, Classes, and Nested Scopes

This gotcha went away in Python 2.2, with the introduction of nested function scopes, but I've retained it here for historical perspective, for readers working with older Python releases, and because it demonstrates what happens to the new nested function scope rules when one layer of the nesting is a class.

Classes introduce local scopes, just as functions do, so the same sorts of scope behavior can happen in a class statement body. Moreover, methods are further nested functions, so the same issues apply. Confusion seems to be especially common when classes are nested.

In the following example (the file nester.py), the generate function returns an instance of the nested Spam class. Within its code, the class name Spam is assigned in the generate function's local scope. But, in versions of Python prior to 2.2, within the class' method function, the class name Spam is not visible—method has access only to its own local scope, the module surrounding generate, and built-in names:
Code View: Scroll / Show All


def generate(  ):
    class Spam:
        count = 1
        def method(self):         # Name Spam not visible:
            print Spam.count      # Not local(def), global(module), built-in
    return Spam(  )

generate(  ).method(  )

C:\python\examples> python nester.py 
Traceback (innermost last):
  File "nester.py", line 8, in ?
    generate(  ).method(  )
  File "nester.py", line 5, in method
    print Spam.count              # Not local(def), global(module), built-in
NameError: Spam

					  


This example works in Python 2.2 and later because the local scopes of all enclosing function defs are automatically visible to nested defs (including nested method defs, as in this example). But, it doesn't work before 2.2 (see below for some possible solutions).

Note that even in 2.2, method defs cannot see the local scope of the enclosing class; they can only see the local scopes of enclosing defs. That's why methods must go through the self instance or the class name to reference methods and other attributes defined in the enclosing class statement. For example, code in the method must use self.count, or Spam.count, not just count.

If you're using a release prior to 2.2, there are a variety of ways to get the preceding example to work. One of the simplest is to move the name Spam out to the enclosing module's scope with a global declaration. Because method sees global names in the enclosing module, references to Spam will work:


def generate(  ):
    global Spam                 # Force Spam to module scope
    class Spam:
        count = 1
        def method(self):
            print Spam.count    # Works: in global (enclosing module)
    return Spam(  )

generate(  ).method(  )             # Prints 1


A better alternative would be to restructure the code such that the class Spam is defined at the top level of the module by virtue of its nesting level, rather than using global declarations. The nested method function and the top-level generate will then find Spam in their global scopes:


def generate(  ):
    return Spam(  )

class Spam:                    # Define at top level of module
    count = 1
    def method(self):
        print Spam.count       # Works: in global (enclosing module)

generate(  ).method(  )


In fact, this approach is recommended for all Python releases—code tends to be simpler in general if you avoid nesting classes and functions.

If you want to get complicated and tricky, you can also get rid of the Spam reference in method altogether by using the special __class__ attribute, which returns an instance's class object:
Code View: Scroll / Show All


def generate(  ):
    class Spam:
        count = 1
        def method(self):
            print self.__class__.count       # Works: qualify to get class
    return Spam(  )

generate(  ).method(  )

					  


				30.5.5.6.4 "Overwrapping-itis"

When used well, the code reuse features of OOP make it excel at cutting development time. Sometimes, though, OOP's abstraction potential can be abused to the point of making code difficult to understand. If classes are layered too deeply, code can become obscure; you may have to search through many classes to discover what an operation does.

For example, I once worked in a C++ shop with thousands of classes (some machine-generated), and up to 15 levels of inheritance. Deciphering method calls in such a complex system was often a monumental task: multiple classes had to be consulted for even the most basic of operations. In fact, the logic of the system was so deeply wrapped that understanding a piece of code in some cases required days of wading through related files.

The most general rule of thumb of Python programming applies here, too: don't make things complicated unless they truly must be. Wrapping your code in multiple layers of classes to the point of incomprehensibility is always a bad idea. Abstraction is the basis of polymorphism and encapsulation, and it can be a very effective tool when used well. However, you'll simplify debugging and aid maintainability if you make your class interfaces intuitive, avoid making your code overly abstract, and keep your class hierarchies short and flat unless there is a good reason to do otherwise.

			30.5.5.7 Chapter Summary
This chapter presented a handful of advanced class-related topics, including subclassing built-in types, pseudoprivate attributes, new-style classes, static methods, and function decorators. Most of these are optional extensions to the OOP model in Python, but they may become more useful as you start writing larger object-oriented programs.

This is the end of the class part of this book, so you'll find the usual lab exercises at the end of the chapter—be sure to work through them to get some practice coding real classes. In the next chapter, we'll begin our look at our last core language topic, exceptions. Exceptions are Python's mechanism for communicating errors and other conditions to your code. This is a relatively lightweight topic, but I've saved it for last because exceptions are supposed to be coded as classes today. Before we tackle that final subject, though, take a look at this chapter's quiz and the lab exercises.

BRAIN BUILDER

Chapter Quiz

Q:	Name two ways to extend a built-in object type.
Q:	What are function decorators used for?
Q:	How do you code a new-style class?
Q:	How are new-style and classic classes different?
Q:	How are normal and static methods different?
Q:	How long should you wait before lobbing a "Holy Hand Grenade"?



Quiz Answers

A:	You can embed a built-in object in a wrapper class, or subclass the built-in type directly. The latter of these tends to be simpler, as most original behavior is automatically inherited.
A:	Function decorators are generally used to add to an existing function a layer of logic that is run each time the function is called. They can be used to log or count calls to a function, check its argument types, and so on. They are also used to "declare" static methods—simple functions in a class that are not passed an instance.
A:	New-style classes are coded by inheriting from the object built-in class (or any other built-in type). In Python 3.0, this will likely not be required; all classes will be new-style classes by default.
A:	New-style classes search the diamond pattern of multiple inheritance trees differently—they essentially search breadth-first (across), instead of depth-first (up). New-style classes also support a set of advanced extra tools, including properties and a __slots__ instance attributes list.
A:	Normal (instance) methods receive a self argument (the implied instance), but static methods do not. Static methods are simple functions nested in a class object. To make a method static, it must be run through a special built-in function, or decorated with decorator syntax.
A:	Three seconds. (Or, more accurately: "And the Lord spake, saying, 'First shalt thou take out the Holy Pin. Then, shalt thou count to three, no more, no less. Three shalt be the number thou shalt count, and the number of the counting shall be three. Four shalt thou not count, nor either count thou two, excepting that thou then proceed to three. Five is right out. Once the number three, being the third number, be reached, then lobbest thou thy Holy Hand Grenade of Antioch towards thy foe, who, being naughty in my sight, shall snuff it.'")[77]

    [77] * This quote is from Monty Python and the Holy Grail.

			30.5.5.8 BRAIN BUILDER 

				30.5.5.8.1 Exercises

These exercises ask you to write a few classes, and experiment with some existing code. Of course, the problem with existing code is that it must be existing. To work with the set class in exercise 5, either pull the class source code off the Internet (see the Preface), or type it up by hand (it's fairly brief). These programs are starting to get more sophisticated, so be sure to check the solutions at the end of the book for pointers. You'll find them in in Appendix B, in "Section B.6."

					30.5.5.8.1.1 Inheritance. 
					Write a class called Adder that exports a method add(self, x, y) that prints a "Not Implemented" message. Then, define two subclasses of Adder that implement the add method:


    ListAdder

        With an add method that returns the concatenation of its two list arguments.

    DictAdder

        With an add method that returns a new dictionary containing the items in both its two dictionary arguments (any definition of addition will do).

    Experiment by making instances of all three of your classes interactively and calling their add methods.

    Now, extend your Adder superclass to save an object in the instance with a constructor (e.g., assign self.data a list or a dictionary), and overload the + operator with an __add__ method to automatically dispatch to your add methods (e.g., X + Y triggers X.add(X.data,Y)). Where is the best place to put the constructors and operator overloading methods (i.e., in which classes)? What sorts of objects can you add to your class instances?

    In practice, you might find it easier to code your add methods to accept just one real argument (e.g., add(self,y)), and add that one argument to the instance's current data (e.g., self.data + y). Does this make more sense than passing two arguments to add? Would you say this makes your classes more "object-oriented"?

					30.5.5.8.1.2 Operator overloading. 
					Write a class called Mylist that shadows ("wraps") a Python list: it should overload most list operators and operations, including +, indexing, iteration, slicing, and list methods such as append and sort. See the Python reference manual for a list of all possible methods to support. Also, provide a constructor for your class that takes an existing list (or a Mylist instance) and copies its components into an instance member. Experiment with your class interactively. Things to explore:

        Why is copying the initial value important here?

        Can you use an empty slice (e.g., start[:]) to copy the initial value if it's a Mylist instance?

        Is there a general way to route list method calls to the wrapped list?

        Can you add a Mylist and a regular list? How about a list and a Mylist instance?

        What type of object should operations like + and slicing return? What about indexing operations?

        If you are working with a more recent Python release (version 2.2 or later), you may implement this sort of wrapper class by embedding a real list in a standalone class, or by extending the built-in list type with a subclass. Which is easier, and why?

					30.5.5.8.1.3 Subclassing. 
					Make a subclass of Mylist from exercise 2 called MylistSub, which extends Mylist to print a message to stdout before each overloaded operation is called, and counts the number of calls. MylistSub should inherit basic method behavior from Mylist. Adding a sequence to a MylistSub should print a message, increment the counter for + calls, and perform the superclass' method. Also, introduce a new method that prints the operation counters to stdout, and experiment with your class interactively. Do your counters count calls per instance, or per class (for all instances of the class)? How would you program both of these? (Hint: it depends on which object the count members are assigned to: class members are shared by instances, but self members are per-instance data.)

					30.5.5.8.1.4 Metaclass methods. 
					Write a class called Meta with methods that intercept every attribute qualification (both fetches and assignments), and print messages listing their arguments to stdout. Create a Meta instance, and experiment with qualifying it interactively. What happens when you try to use the instance in expressions? Try adding, indexing, and slicing the instance of your class.

					30.5.5.8.1.5 Set objects. 
					Experiment with the set class described in "Section 26.1.1." Run commands to do the following sorts of operations:

        Create two sets of integers, and compute their intersection and union by using & and | operator expressions.

        Create a set from a string, and experiment with indexing your set. Which methods in the class are called?

        Try iterating through the items in your string set using a for loop. Which methods run this time?

        Try computing the intersection and union of your string set, and a simple Python string. Does it work?

        Now, extend your set by subclassing to handle arbitrarily many operands using the *args argument form. (Hint: see the function versions of these algorithms in Chapter 16.) Compute intersections and unions of multiple operands with your set subclass. How can you intersect three or more sets, given that & has only two sides?

        How would you go about emulating other list operations in the set class? (Hints: __add__ can catch concatenation, and __getattr__ can pass most list method calls off to the wrapped list.)

					30.5.5.8.1.6 Class tree links. 
					In "Section 24.5" in Chapter 24, and "Section 25.6" in Chapter 25, I mentioned that classes have a __bases__ attribute that returns a tuple of their superclass objects (the ones in parentheses in the class header). Use __bases__ to extend the Lister mix-in class (see Chapter 25) so that it prints the names of the immediate superclasses of the instance's class. When you're done, the first line of the string representation should look like this (your address may vary):


        <Instance of Sub(Super, Lister), address 7841200:


    How would you go about listing inherited class attributes, too? (Hint: classes have a __dict__ attribute.) Try extending your Lister class to display all accessible superclasses and their attributes as well; for hints on climbing class trees, see Chapter 24's classtree.py example, and the footnote about using dir and getattr in Python 2.2 in the "Section 25.6" section of Chapter 25.

					30.5.5.8.1.7 Composition. 
					Simulate a fast-food ordering scenario by defining four classes:


    Lunch

        A container and controller class.

    Customer

        The actor who buys food.

    Employee

        The actor from whom a customer orders.

    Food

        What the customer buys.

    To get you started, here are the classes and methods you'll be defining:
    Code View: Scroll / Show All


        class Lunch:
            def __init__(self)                 # Make/embed Customer and Employee
            def order(self, foodName)        # Start a Customer order simulation
            def result(self)                 # Ask the Customer what kind of Food it has

        class Customer:
            def __init__(self)                        # Initialize my food to None
            def placeOrder(self, foodName, employee)      # Place order with an Employee
            def printFood(self)                           # Print the name of my food

        class Employee:
            def takeOrder(self, foodName)    # Return a Food, with requested name

        class Food:
            def __init__(self, name)           # Store food name

    					  


    The order simulation works as follows:

        The Lunch class' constructor should make and embed an instance of Customer and an instance of Employee, and should export a method called order. When called, this order method should ask the Customer to place an order by calling its placeOrder method. The Customer's placeOrder method should in turn ask the Employee object for a new Food object by calling Employee's takeOrder method.

        Food objects should store a food name string (e.g., "burritos"), passed down from Lunch.order, to Customer.placeOrder, to Employee.takeOrder, and finally, to Food's constructor. The top-level Lunch class should also export a method called result, which asks the customer to print the name of the food it received from the Employee via the order (this can be used to test your simulation).

    Note that Lunch needs to pass either the Employee or itself to the Customer to allow the Customer to call Employee methods.

    Experiment with your classes interactively by importing the Lunch class, calling its order method to run an interaction, and then calling its result method to verify that the Customer got what he or she ordered. If you prefer, you can also simply code test cases as self-test code in the file where your classes are defined, using the module __name__ trick in Chapter 21. In this simulation, the Customer is the active agent; how would your classes change if Employee were the object that initiated customer/employee interaction instead?

					30.5.5.8.1.8 Zoo animal hierarchy. 
					Consider the class tree shown in Figure 26-1. Code a set of six class statements to model this taxonomy with Python inheritance. Then, add a speak method to each of your classes that prints a unique message, and a reply method in your top-level Animal superclass that simply calls self.speak to invoke the category-specific message printer in a subclass below (this will kick off an independent inheritance search from self). Finally, remove the speak method from your Hacker class so that it picks up the default above it. When you're finished, your classes should work this way:

    Figure 26-1. A zoo hierarchy composed of classes linked into a tree to be searched by attribute inheritance. Animal has a common "reply" method, but each class may have its own custom "speak" method called by "reply."


        % python 
        >>> from zoo import Cat, Hacker 
        >>> spot = Cat(  ) 
        >>> spot.reply(  )  # Animal.reply; calls Cat.speak
        meow
        >>> data = Hacker(  )  # Animal.reply; calls Primate.speak
        >>> data.reply(  ) 
        Hello world!


					30.5.5.8.1.9 The Dead Parrot Sketch. 
					Consider the object embedding structure captured in Figure 26-2. Code a set of Python classes to implement this structure with composition. Code your Scene object to define an action method, and embed instances of Customer, Clerk, and Parrot classes—all three of which should define a line method that prints a unique message. The embedded objects may inherit from a common superclass that defines line and simply provide message text, or define line themselves. In the end, your classes should operate like this:


        % python 
        >>> import parrot 
        >>> parrot.Scene(  ).action(  )  # Activate nested objects
        customer: "that's one ex-bird!"
        clerk: "no it isn't..."
        parrot: None


Figure 26-2. A scene composite with a controller class (Scene) that embeds and directs instances of three other classes (Customer, Clerk, Parrot). The embedded instance's classes may also participate in an inheritance hierarchy; composition and inheritance are often equally useful ways to structure classes for code reuse.


Why You Will Care: OOP by the Masters

When I teach Python classes, I invariably find that about halfway through the class, people who have used OOP in the past are following along intensely, while people who have not are beginning to glaze over (or nod off completely). The point behind the technology just isn't apparent.

In a book like this, I have the luxury of including material like the new Big Picture overview in Chapter 22—in fact, you should probably review that section if you're starting to feel like OOP is just some computer science mumbo-jumbo.

In real classes, however, to help get the newcomers on board (and keep them awake), I have been known to stop and ask the experts in the audience why they use OOP. The answers they've given might help shed some light on the purpose of OOP, if you are new to the subject.

Here, then, with only a few embellishments, are the most common reasons to use OOP, as cited by my students over the years:


Code reuse

    This one's easy (and is the main reason for using OOP). By supporting inheritance, classes allow you to program by customization, instead of starting each project from scratch.

Encapsulation

    Wrapping up implementation details behind object interfaces insulates users of a class from code changes.

Structure

    Classes provide new local scopes, which minimizes name clashes. They also provide a natural place to write and look for implementation code, and to manage object state.

Maintenance

    Classes naturally promote code factoring, which allows us to minimize redundancy. Thanks both to the structure and code reuse support of classes, usually only one copy of the code needs to be changed.

Consistency

    Classes and inheritance allow you to implement common interfaces, and hence, a common look and feel in your code; this eases debugging, comprehension, and maintenance.

Polymorphism

    This is more a property of OOP than a reason for using it, but by supporting code generality, polymorphism makes code more flexible and widely applicable, and hence, more reusable.

Other

    And, of course, the number one reason students gave for using OOP: it looks good on a résumé! (OK, I threw this one in as a joke, but it is important to be familiar with OOP if you plan to work in the software field today.)

Finally, keep in mind what I said at the beginning of Part 6: you won't fully appreciate OOP until you've used it for awhile. Pick a project, study larger examples, work through the exercises—do whatever it takes to get your feet wet with OO code; it's worth the effort.

				30.5.5.8.2 Answers

					30.5.5.8.2.1 Inheritance. 
					Here's the solution code for this exercise (file adder.py), along with some interactive tests. The __add__ overload has to appear only once, in the superclass, as it invokes type-specific add methods in subclasses:
Code View: Scroll / Show All


class Adder:
    def add(self, x, y):
        print 'not implemented!'
    def __init__(self, start=[]):
        self.data = start
    def __add__(self, other):                 # Or in subclasses?
        return self.add(self.data, other)         # Or return type?

class ListAdder(Adder):
    def add(self, x, y):
        return x + y

class DictAdder(Adder):
    def add(self, x, y):
        new = {}
        for k in x.keys(  ): new[k] = x[k]
        for k in y.keys(  ): new[k] = y[k]
        return new

% python 
>>> from adder import * 
>>> x = Adder(  ) 
>>> x.add(1, 2) 
not implemented!
>>> x = ListAdder(  ) 
>>> x.add([1], [2]) 
[1, 2]
>>> x = DictAdder(  ) 
>>> x.add({1:1}, {2:2}) 
{1: 1, 2: 2}

>>> x = Adder([1]) 
>>> x + [2] 
not implemented!
>>>
>>> x = ListAdder([1]) 
>>> x + [2] 
[1, 2]
>>> [2] + x 
Traceback (innermost last):
  File "<stdin>", line 1, in ?
TypeError: __add__ nor __radd__ defined for these operands

					  


Notice in the last test that you get an error for expressions where a class instance appears on the right of a +; if you want to fix this, use __radd__ methods, as described in "Section 24.4" in Chapter 24.

If you are saving a value in the instance anyhow, you might as well rewrite the add method to take just one argument, in the spirit of other examples in Part 6:
Code View: Scroll / Show All


class Adder:
    def __init__(self, start=[]):
        self.data = start
    def __add__(self, other):          # Pass a single argument
        return self.add(other)             # The left side is in self
    def add(self, y):
        print 'not implemented!'

class ListAdder(Adder):
    def add(self, y):
        return self.data + y

class DictAdder(Adder):
    def add(self, y):
        pass                           # Change me to use self.data instead of x

x = ListAdder([1, 2, 3])
y = x + [4, 5, 6]
print y                                # Prints [1, 2, 3, 4, 5, 6]

					  


Because values are attached to objects rather than passed around, this version is arguably more object-oriented. And, once you've gotten to this point, you'll probably find that you can get rid of add altogether, and simply define type-specific __add__ methods in the two subclasses.

					30.5.5.8.2.2 Operator overloading. 
					The solution code (file mylist.py) uses a few operator overloading methods that the text didn't say much about, but they should be straightforward to understand. Copying the initial value in the constructor is important because it may be mutable; you don't want to change or have a reference to an object that's possibly shared somewhere outside the class. The __getattr__ method routes calls to the wrapped list. For hints on an easier way to code this in Python 2.2 and later, see "Section 26.1.2" in Chapter 26:
Code View: Scroll / Show All


class MyList:
    def __init__(self, start):
        #self.wrapped = start[:]        # Copy start: no side effects
        self.wrapped = []               # Make sure it's a list here
        for x in start: self.wrapped.append(x)
    def __add__(self, other):
        return MyList(self.wrapped + other)
    def __mul__(self, time):
        return MyList(self.wrapped * time)
    def __getitem__(self, offset):
        return self.wrapped[offset]
    def __len__(self):
        return len(self.wrapped)
    def __getslice__(self, low, high):
        return MyList(self.wrapped[low:high])
    def append(self, node):
        self.wrapped.append(node)
    def __getattr__(self, name):        # Other members: sort/reverse/etc
        return getattr(self.wrapped, name)
    def __repr__(self):
        return repr(self.wrapped)

if __name__ == '__main__':
    x = MyList('spam')
    print x
    print x[2]
    print x[1:]
    print x + ['eggs']
    print x * 3
    x.append('a')
    x.sort(  )
    for c in x: print c,

% python mylist.py 
['s', 'p', 'a', 'm']
a
['p', 'a', 'm']
['s', 'p', 'a', 'm', 'eggs']
['s', 'p', 'a', 'm', 's', 'p', 'a', 'm', 's', 'p', 'a', 'm']
a a m p s

					  


Note that it's important to copy the start value by appending instead of slicing here because otherwise the result may not be a true list, and so will not respond to expected list methods, such as append (e.g., slicing a string returns another string, not a list). You would be able to copy a MyList start value by slicing because its class overloads the slicing operation, and provides the expected list interface; however, you need to avoid slice-based copying for objects such as strings. Also, note that sets are a built-in type in Python today, so this is largely just a coding exercise (see Chapter 5 for more on sets).

					30.5.5.8.2.3 Subclassing. 
					My solution (mysub.py) appears below. Your solution should be similar:
Code View: Scroll / Show All


from mylist import MyList

class MyListSub(MyList):
    calls = 0                                       # Shared by instances

    def __init__(self, start):
        self.adds = 0                               # Varies in each instance
        MyList.__init__(self, start)

    def __add__(self, other):
        MyListSub.calls = MyListSub.calls + 1       # Class-wide counter
        self.adds = self.adds + 1                   # Per-instance counts
        return MyList.__add__(self, other)

    def stats(self):
        return self.calls, self.adds                # All adds, my adds

if __name__ == '__main__':
    x = MyListSub('spam')
    y = MyListSub('foo')
    print x[2]
    print x[1:]
    print x + ['eggs']
    print x + ['toast']
    print y + ['bar']
    print x.stats(  )

% python mysub.py 
a
['p', 'a', 'm']
['s', 'p', 'a', 'm', 'eggs']
['s', 'p', 'a', 'm', 'toast']
['f', 'o', 'o', 'bar']
(3, 2)

					  


					30.5.5.8.2.4 Metaclass methods. 
					I worked through this exercise as follows. Notice that operators try to fetch attributes through __getattr__, too; you need to return a value to make them work:
Code View: Scroll / Show All


>>> class Meta:
...     def __getattr__(self, name):
...         print 'get', name
...     def __setattr__(self, name, value):
...         print 'set', name, value
...
>>> x = Meta(  )
>>> x.append
get append
>>> x.spam = "pork"
set spam pork
>>>
>>> x + 2
get __coerce__
Traceback (innermost last):
  File "<stdin>", line 1, in ?
TypeError: call of non-function
>>>
>>> x[1]
get __getitem__
Traceback (innermost last):
  File "<stdin>", line 1, in ?
TypeError: call of non-function

>>> x[1:5]
get __len__
Traceback (innermost last):
  File "<stdin>", line 1, in ?
TypeError: call of non-function

					  


					30.5.5.8.2.5 Set objects. 
					Here's the sort of interaction you should get. Comments explain which methods are called.


% python 
>>> from setwrapper import Set 
>>> x = Set([1, 2, 3, 4])  # Runs __init__
>>> y = Set([3, 4, 5]) 

>>> x & y  # __and__, intersect, then __repr__
Set:[3, 4]
>>> x | y  # __or__, union, then __repr__
Set:[1, 2, 3, 4, 5]

>>> z = Set("hello")  # __init__ removes duplicates
>>> z[0], z[-1]  # __getitem__
('h', 'o')

>>> for c in z: print c,  # __getitem__
...
h e l o
>>> len(z), z  # __len__, __repr__
(4, Set:['h', 'e', 'l', 'o'])

>>> z & "mello", z | "mello" 
(Set:['e', 'l', 'o'], Set:['h', 'e', 'l', 'o', 'm'])


My solution to the multiple-operand extension subclass looks like the class below (file multiset.py). It only needs to replace two methods in the original set. The class' documentation string explains how it works:
Code View: Scroll / Show All


from setwrapper import Set

class MultiSet(Set):
    """
    inherits all Set names, but extends intersect
    and union to support multiple operands; note
    that "self" is still the first argument (stored
    in the *args argument now); also note that the
    inherited & and | operators call the new methods
    here with 2 arguments, but processing more than
    2 requires a method call, not an expression:
    """

    def intersect(self, *others):
        res = []
        for x in self:                         # Scan first sequence
            for other in others:               # For all other args
                if x not in other: break       # Item in each one?
            else:                              # No: break out of loop
                res.append(x)                  # Yes: add item to end
        return Set(res)

    def union(*args):                          # Self is args[0]
        res = []
        for seq in args:                       # For all args
            for x in seq:                      # For all nodes
                if not x in res:
                    res.append(x)              # Add new items to result
        return Set(res)

					  


Your interaction with the extension will look something like the following. Note that you can intersect by using & or calling intersect, but you must call intersect for three or more operands; & is a binary (two-sided) operator. Also, note that we could have called MultiSet simply Set to make this change more transparent if we used setwrapper.Set to refer to the original within multiset:


>>> from multiset import * 
>>> x = MultiSet([1,2,3,4]) 
>>> y = MultiSet([3,4,5]) 
>>> z = MultiSet([0,1,2]) 

>>> x & y, x | y  # Two operands
(Set:[3, 4], Set:[1, 2, 3, 4, 5])

>>> x.intersect(y, z)  # Three operands
Set:[]
>>> x.union(y, z) 
Set:[1, 2, 3, 4, 5, 0]
>>> x.intersect([1,2,3], [2,3,4], [1,2,3])  # Four operands
Set:[2, 3]
>>> x.union(range(10))  # NonmultiSets work, too
Set:[1, 2, 3, 4, 0, 5, 6, 7, 8, 9]


					30.5.5.8.2.6 Class tree links. 
					Here is the way I changed the Lister class, and a rerun of the test to show its format. To display inherited class attributes, too, you'd need to do something like what the attrnames method currently does, but recursively, at each class reached by climbing __bases__ links. Because dir includes inherited attributes in Python 2.2, you might also simply loop through its result: say for x in dir(self) and use getattr(self,x). This won't directly help, though, if you wish to represent the class tree's structure in your display (as in the classtree.py example in Chapter 24):
Code View: Scroll / Show All


class Lister:
    def __repr__(self):
        return ("<Instance of %s(%s), address %s:\n%s>" %
                          (self.__class__.__name__,        # My class's name
                           self.supers(  ),                  # My class's supers
                           id(self),                         # My address
                           self.attrnames(  )) )             # name=value list
    def attrnames(self):
        ...unchanged ...
    def supers(self):
        result = ""
        first = 1
        for super in self.__class__.__bases__:           # One level up
from class
            if not first:
                result = result + ", "
            first = 0
            result = result + super.__name__             # name, not repr(super)
        return result

C:\python\examples> python testmixin.py 
<Instance of Sub(Super, Lister), address 7841200:
        name data3=42
        name data2=eggs
        name data1=spam
>

					  


					30.5.5.8.2.7 Composition. 
					My solution is below (file lunch.py), with comments from the description mixed in with the code. This is one case where it's probably easier to express a problem in Python than it is in English:
Code View: Scroll / Show All


class Lunch:
    def __init__(self):                       # Make/embed Customer and Employee
        self.cust = Customer(  )
        self.empl = Employee(  )
    def order(self, foodName):                 # Start a Customer order simulation
        self.cust.placeOrder(foodName, self.empl)
    def result(self):                          # Ask the Customer about its Food
        self.cust.printFood(  )
class Customer:
    def __init__(self):                         # Initialize my food to None
        self.food = None
    def placeOrder(self, foodName, employee):  # Place order with Employee
        self.food = employee.takeOrder(foodName)
    def printFood(self):                       # Print the name of my food
        print self.food.name

class Employee:
    def takeOrder(self, foodName):             # Return a Food, with requested name
        return Food(foodName)

class Food:
    def __init__(self, name):                  # Store food name
        self.name = name

if __name__ == '__main__':
    x = Lunch(  )                                # Self-test code
    x.order('burritos')                          # If run, not imported
    x.result(  )
    x.order('pizza')
    x.result(  )

% python lunch.py 
burritos
pizza

					  


					30.5.5.8.2.8 Zoo animal hierarchy. 
					Here is the way I coded the taxonomy on Python (file zoo.py); it's artificial, but the general coding pattern applies to many real structures, from GUIs to employee databases. Notice that the self.speak reference in Animal triggers an independent inheritance search, which finds speak in a subclass. Test this interactively per the exercise description. Try extending this hierarchy with new classes, and making instances of various classes in the tree:


class Animal:
    def reply(self):   self.speak(  )           # Back to subclass
    def speak(self):   print 'spam'             # Custom message

class Mammal(Animal):
    def speak(self):   print 'huh?'

class Cat(Mammal):
    def speak(self):   print 'meow'

class Dog(Mammal):
    def speak(self):   print 'bark'

class Primate(Mammal):
    def speak(self):   print 'Hello world!'

class Hacker(Primate): pass                   # Inherit from Primate


					30.5.5.8.2.9 The Dead Parrot Sketch. 
					Here's how I implemented this one (file parrot.py). Notice how the line method in the Actor superclass works: by accessing self attributes twice, it sends Python back to the instance twice, and hence invokes two inheritance searches—self.name and self.says( ) find information in the specific subclasses:


class Actor:
    def line(self): print self.name + ':', repr(self.says(  ))

class Customer(Actor):
    name = 'customer'
    def says(self): return "that's one ex-bird!"

class Clerk(Actor):
    name = 'clerk'
    def says(self): return "no it isn't..."

class Parrot(Actor):
    name = 'parrot'
    def says(self): return None

class Scene:
    def __init__(self):
        self.clerk    = Clerk(  )               # Embed some instances
        self.customer = Customer(  )            # Scene is a composite
        self.subject  = Parrot(  )

    def action(self):
        self.customer.line(  )                  # Delegate to embedded
        self.clerk.line(  )
        self.subject.line(  )

				30.5.5.8.3
	30.6. Exceptions and Tools

		30.6.1. Exception Basics
			30.6.1.1 Why Use Exceptions?
			30.6.1.2 Exception Handling: The Short Story
			30.6.1.3 The try/except/else Statement
			30.6.1.4 The try/finally Statement
			30.6.1.5 Unified try/except/finally
			30.6.1.6 The raise Statement
			30.6.1.7 The assert Statement
			30.6.1.8 with/as Context Managers
Context managers, with as, with_as

https://www.geeksforgeeks.org/context-manager-in-python/

Context Manager in Python
Managing Resources : In any programming language, the usage of resources like file operations or database connections is very common. But these resources are limited in supply. Therefore, the main problem lies in making sure to release these resources after usage. If they are not released then it will lead to resource leakage and may cause the system to either slow down or crash. It would be very helpful if user have a mechanism for the automatic setup and teardown of resources.In Python, it can be achieved by the usage of context managers which facilitate the proper handling of resources. The most common way of performing file operations is by using the withkeyword as shown below:
filter_none


brightness_4
# Python program showing  
# a use of with keyword 
  
with open("test.txt") as f:    
    data = f.read()
Let’s take the example of file management. When a file is opened, a file descriptor is consumed which is a limited resource. Only a certain number of files can be opened by a process at a time. The following program demonstrates it.
filter_none


brightness_4
file_descriptors = [] 
for x in range(100000): 
    file_descriptors.append(open('test.txt', 'w'))
Output:
Traceback (most recent call last):
  File "context.py", line 3, in 
OSError: [Errno 24] Too many open files: 'test.txt'
An error message saying that too many files are open. The above example is a case of file descriptor leakage. It happens because there are too many open files and they are not closed. There might be chances where a programmer may forget to close an opened file.
Managing Resources using context manager :
Suppose a block of code raises an exception or if it has a complex algorithm with multiple return paths, it becomes cumbersome to close a file in all the places. Generally in other languages when working with files try-except-finally is used to ensure that the file resource is closed after usage even if there is an exception.Python provides an easy way to manage resources: Context Managers. The with keyword is used. When it gets evaluated it should result in an object that performs context management. Context managers can be written using classes or functions(with decorators).
Creating a Context Manager :
When creating context managers using classes, user need to ensure that the class has the methods: __enter__()and __exit__(). The __enter__() returns the resource that needs to be managed and the __exit__() does not return anything but performs the cleanup operations. First, lets create a simple class called ContextManager to understand the basic structure of creating context managers using classes, as shown below:
filter_none


brightness_4
# Python program creating a 
# context manager 
  
class ContextManager(): 
    def __init__(self): 
        print('init method called') 
          
    def __enter__(self): 
        print('enter method called') 
        return self
      
    def __exit__(self, exc_type, exc_value, exc_traceback): 
        print('exit method called') 
  
  
with ContextManager() as manager: 
    print('with statement block')
Output:
init method called
enter method called
with statement block
exit method called
In this case a ContextManager object is created. This is assigned to the variable after the as keyword i.e manager. On running the above program, the following get executed in sequence:
* __init__()
* __enter__()
* statement body (code inside the with block)
* __exit__()[the parameters in this method are used to manage exceptions]
File management using context manager :
Let’s apply the above concept to create a class that helps in file resource management.The FileManager class helps in opening a file, writing/reading contents and then closing it.
filter_none


brightness_4
# Python program showing 
# file management using  
# context manager 
  
class FileManager(): 
    def __init__(self, filename, mode): 
        self.filename = filename 
        self.mode = mode 
        self.file = None
          
    def __enter__(self): 
        self.file = open(self.filename, self.mode) 
        return self.file
      
    def __exit__(self, exc_type, exc_value, exc_traceback): 
        self.file.close() 
  
# loading a file  
with FileManager('test.txt', 'w') as f: 
    f.write('Test') 
  
print(f.closed)
Output:
True
  File management using context manager and with statement :
On executing the with block, the following operations happen in sequence:
* A FileManager object is created with test.txt as the filename and w(write) as the mode when __init__ method is executed.
* The __enter__ method opens the test.txt file in write mode(setup operation) and returns the FileManager object to variable f.
* The text ‘Test’ is written into the file.
* The __exit__ method takes care of closing the file on exiting the with block(teardown operation). When print(f.closed) is run, the output is True as the FileManager has already taken care of closing the file which otherwise needed to be explicitly done.
Database connection management using context manager :
Let’s create a simple database connection management system. The number of database connections that can be opened at a time is also limited(just like file descriptors). Therefore context managers are helpful in managing connections to the database as there could be chances that the programmer may forget to close the connection.
filter_none


brightness_4
# Python program shows the 
# connection management  
# for MongoDB 
  
from pymongo import MongoClient 
  
class MongoDBConnectionManager(): 
    def __init__(self, hostname, port): 
        self.hostname = hostname 
        self.port = port 
        self.connection = None
  
    def __enter__(self): 
        self.connection = MongoClient(self.hostname, self.port) 
        return self
  
    def __exit__(self, exc_type, exc_value, exc_traceback): 
        self.connection.close() 
  
# connecting with a localhost 
with MongoDBConnectionManager('localhost', '27017') as mongo: 
    collection = mongo.connection.SampleDb.test 
    data = collection.find({'_id': 1}) 
    print(data.get('name'))
  Database connection management using context manager and with statement :
On executing the with block, the following operations happen in sequence:
* A MongoDBConnectionManager object is created with localhost as the hostnamename and 27017 as the port when __init__ method is executed.
* The __enter__ method opens the mongodb connection and returns the MongoDBConnectionManager object to variable mongo.
* The test collection in SampleDb database is accessed and the document with _id=1 is retrieved. The name field of the document is printed.
* The __exit__ method takes care of closing the connection on exiting the with block(teardown operation).
            
			30.6.1.9 Chapter Summary

		30.6.2. Exception Objects
			30.6.2.1 String-Based Exceptions
			30.6.2.2 Class-Based Exceptions
			30.6.2.3 General raise Statement Forms
			30.6.2.4 Chapter Summary

		30.6.3. Designing with Exceptions
			30.6.3.1 Nesting Exception Handlers
			30.6.3.2 Exception Idioms
			30.6.3.3 Exception Design Tips
			30.6.3.4 Exception Gotchas
			30.6.3.5 Core Language Summary
			30.6.3.6 Chapter Summary
			30.6.3.7 BRAIN BUILDER

		30.6.3.
	30.7. Appendixes

		30.7.1. Installation and Configuration
```
