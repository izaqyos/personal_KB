---
type: cheatsheet
title: oneliners
description: Section 47 of the legacy KB_python notes.
tags: [kb-python]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "python/KB_python#47"
---

# oneliners

[↑ KB_python](/python/kb-python/README.md)

## 47.1 https://blog.finxter.com/10-python-one-liners/

```text
# 10. Palindrome Python One-Liner
phrase.find(phrase[::-1])
# 9. Swap Two Variables Python One-Liner
a, b = b, a
# 8. Sum Over Every Other Value Python One-Liner
sum(stock_prices[::2])
# 7. Read File Python One-Liner
[line.strip() for line in open(filename)]
# 6. Factorial Python One-Liner
reduce(lambda x, y: x * y, range(1, n+1))
# 5. Performance Profiling Python One-Liner
python -m cProfile foo.py
# 4. Superset Python One-Liner
lambda l: reduce(lambda z, x: z + [y + [x] for y in z], l, [[]])
# 3. Fibonacci Python One-Liner
lambda x: x if x<=1 else fib(x-1) + fib(x-2) 
# 2. Quicksort Python One-liner
lambda L: [] if L==[] else qsort([x for x in L[1:] if x< L[0]]) + L[0:1] + qsort([x for x in L[1:] if x>=L[0]])
# 1. Sieve of Eratosthenes Python One-liner
reduce( (lambda r,x: r-set(range(x**2,n,x)) if (x in r) else r), range(2,int(n**0.5)), set(range(2,n)))


One-liner #10: check if a string is a palindrome
What is a palindrome? A palindrome is a sequence of characters or numbers “which reads the same backward as forward, such as madam or racecar or the number 10201” (Wikipedia).

Write a Python one-liner that returns the integer value 0, if the sequence is a palindrome. Otherwise, your script should return the integer value -1.

# THE DATA
phrase = "anna"
 
# THE ONE LINER
is_palindrome = phrase.find(phrase[::-1])
 
# THE RESULT
print(is_palindrome)
# 0 (if it wasn't a palindrome, the result would be -1)
The Python one-liner uses two tools to achieve the goal: the find() function and slicing.

The find() function returns an index of a searched subsequence within a sequence. For example, you call y.find(x) on any string y in Python. If the string y contains the string x, the find function returns the start index of the string x within y. Otherwise, it returns the index -1 (the string y does not contain a substring x).

Slicing is a Python-specific concept for carving out a range of values from sequence types such as lists or strings. Slicing is based on the concise notation [start:stop:step] to carve out a sequence starting in index “start” (inclusive) and ending in index “end” (exclusive). The third parameter “step” allows you to define the step size, i.e., how many characters from the original sequence your slice will skip before taking the next character (e.g. step=2 means that your slice will consist of only every other character). If you want to become a true master in the powerful slicing concept, download my ebook “Coffee Break Python Slicing” for free.

A negative step size indicates that the slice is carved out “backward”, i.e., from the right to the left. In this way, the one-liner reverses the string by using the slicing operation (phrase[::-1]).

Why reverse the string at all? Easy: If the original string contains the reversed string, it is a palindrome. Think about it for a moment and enjoy this wonderful concise Python one-liner.

One-liner #9: swap two variables
Suppose, you have two variables a and b. You want to assign the value of a to the variable b and the value of b to the variable a. How to do this in Python?

# THE DATA
a = "hello"
b = "bye"
 
# THE ONE-LINER
a, b = b, a
 
# THE RESULT
print(a)
# bye
print(b)
# hello
This is a nice little trick of the Python programming language. Although the one-liner is very simple, it is definitely worth this label because it nicely demonstrates the expressiveness of the Python language. The standard way of achieving this simple task in other programming languages is to create a third “container” variable that does nothing but keeping the value for a short moment while both variables a and b have the same value:

# THE UGLY THREE-LINER
c = a
a = b
b = c
Two lines saved while improving readability – not bad for a one-liner!

One-liner #8: sum over every second list value
Given a list of values which can be either integers or floats. The goal of this task is to sum over all values in the list that have an even index value (e.g. list values with index 0, 2, 4, 6, 8, …). How to solve it in a single line of code?

# THE DATA
stock_prices = [23, 24, 26, 29, 41, 29, 35]
 
# THE ONE-LINER
res = sum(stock_prices[::2])
 
# THE RESULT
print(res)
# 125
Again, the one-liner uses the advanced slicing notation. Recap that slicing carves out a range of values from the list using the notation [start:stop:step]. The first index of the slice is “start” (inclusive) and the last index of the slice is “end” (exclusive). As you may have guessed, the third parameter “step” defines the step size, i.e., how many characters from the original sequence will be skipped before taking the next character (e.g. step=2 means that your slice will consist of only every other character).

Get the free slicing book.

Finally, the sum operation takes any iterable and sums over all values in the iterable. In the one-liner, it simply sums over all remaining values after excluding every other value from the sequence.

One-liner #7: read lines from a file and store them in a list
Your program must communicate with the outside world to have any impact. One way of doing this is to use the file system for input and output.

How can you read all the lines from a file in one line? As a bonus, how can you get rid of trailing whitespaces while reading the lines (e.g. the newline character ‘\n’)?

# THE DATA
filename = 'oneliners.py'
 
# THE ONE-LINER
lines = [line.strip() for line in open(filename)]
 
# THE RESULT
print(lines)
# ['# THE DATA', "filename = 'oneliners.py'", '', '# THE ONE-LINER', 'lines = [line.strip() for line in open(filename)]', '', '# THE RESULT', 'print(lines)', '']
Complex Python one-liners built upon simpler one-liners. You have to master the simple ones first in order to be able to understand the more complex ones.

This one-liner is simple but nevertheless very important. It uses list comprehension to create a new list ‘lines’ that stores all lines from the file as separate string values.

What’s list comprehension anyways? List comprehension is a compact way of creating lists. If you really want to master list comprehension once and for all, read this in-depth tutorial about list comprehension. The simple formula of list comprehension is [ expression + context ].

Expression: What to do with each list element?
Context: Which list elements to select? It consists of an arbitrary number of for and if statements.
For example, the one-liner uses the expression line.strip(). The function strip() simply removes the leading and trailing whitespaces (e.g. the newline character ‘\n’) of each line returned by the context.

The context iterates over the file object that is returned by the open(filename) statement. It specifies the universe of objects on which the expression should be performed. In this case, the universe is all the lines in the file (string objects).

Thus, the result is a list of lines that are contained in the file ‘oneliners.py’ (let’s assume that all the code of this one-liner is stored in this file and nothing else).

One-liner #6: calculate the mathematical factorial function (n!)
This is a fun challenge that is often asked in Python programming interviews. As always, there are many ways of solving this problem, but why not impress the interviewer with a beautiful Python one-liner solution?

# THE DATA
from functools import reduce
n = 100
 
# THE ONE-LINER
factorial = reduce(lambda x, y: x * y, range(1, n+1))
 
# THE RESULT
print(factorial)
# 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000
The one-liner uses the reduce() function. The reduce function takes two arguments: a function and a sequence. It takes two values from the sequence and combines them according to the function argument. Then it repeats this procedure until only one value is left. This value is returned as a result of the reduce() function. It’s that simple.

In Python 3, the reduce function is not a built-in function anymore (like in Python 2), so you have to import it from the functools library.

The one-liner makes use of the lambda expression which defines an anonymous function. The lambda function takes two arguments x and y and combines them via multiplication, i.e., x * y. In this way, the reduce function multiplies all values in the sequence.

One-liner #5: profile a Python script
Performance optimization is of critical importance for all applications that go beyond small scripts to solve a small problem. Performance matters. A few examples are web development, algorithmic trading, security profiling, automatic driving, and robotics.

This one-liner can be executed directly in the terminal without opening the Python application. Say, you want to profile the Python script ‘foo.py’.

# THE ONE-LINER
python -m cProfile foo.py
The one-liner uses the cProfile application to profile the performance bottlenecks of the file ‘foo.py’. You don’t have to execute the Python script to profile it – the cProfile application does it for you. Then, it tracks statistics (e.g. which functions took the most amount of time) and outputs these statistics to the console.

Here is an example output of such a profiling call (source)

      197 function calls (192 primitive calls) in 0.002 seconds
 
Ordered by: standard name
 
ncalls  tottime  percall  cumtime  percall filename:lineno(function)
     1    0.000    0.000    0.001    0.001 <string>:1(<module>)
     1    0.000    0.000    0.001    0.001 re.py:212(compile)
     1    0.000    0.000    0.001    0.001 re.py:268(_compile)
     1    0.000    0.000    0.000    0.000 sre_compile.py:172(_compile_charset)
     1    0.000    0.000    0.000    0.000 sre_compile.py:201(_optimize_charset)
     4    0.000    0.000    0.000    0.000 sre_compile.py:25(_identityfunction)
   3/1    0.000    0.000    0.000    0.000 sre_compile.py:33(_compile)
As you can see, the profiler keeps track of the numbers of calls of each function and how long each function runs (its latency). These statistics will help you greatly when optimizing your code. It certainly helped me a lot

One-liner #4: write a function that returns the superset of a set
What is a superset? The superset is the set of all subsets of this set. Note that the function argument is a list rather than a set. It’s not possible to define a set of sets in Python because the set data type is not hashable. But sets can only consist of data elements that are hashable – because the hash value of elements is used to determine, in a very fast manner, whether the element is already in the set.

# THE DATA
from functools import reduce
dataset = {1,2,3}
 
# THE ONE-LINER
f = lambda l: reduce(lambda z, x: z + [y + [x] for y in z], l, [[]])
 
# THE RESULT
print(f(dataset))
# [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
The source code is modified from this article.

The one-liner shows an elegant way to solve the problem of calculating the superset. Still, I have to admit, it’s hard to understand. The idea is to start the superset as an empty list and repeatedly adding subsets to it until no more subsets can be found. Initially, only the empty set is in the superset. Now, in each step, we take one element x out of the dataset and create a bunch of new subsets that arise when adding x to all of the subsets that are already in the superset. Hence, the superset grows one dataset element at a time.

The one-liner uses the reduce function to accomplish this idea. In the variable z, it stores the current superset (which contains initially only the empty set []). Using list comprehension, it creates a number of new subsets for all existing subsets and adds them to the superset z. In particular, it adds the value x from the dataset to each subset and thus doubles the size of the superset (containing the subsets WITH and WITHOUT the dataset element x). In this way, the reduce function repeatedly “merges” two elements: the superset z and an element x from the dataset.

This was a very hard one-liner but you can see how important it is to properly understand the basics (lambda function, list comprehension, list operations).

One-liner #3: find the first n Fibonacci numbers
What are Fibonacci numbers? They are the values of the Fibonacci series. The Fibonacci series is created by the Italian mathematician “Leonardo of Pisa”. It is very popular because it has many applications in math, art, and biology (read more fascinating applications).

The series starts with the numbers 0 and 1. Each following series element is the sum of the two previous series elements.

# THE DATA
n = 10
# THE ONE-LINER
fib = lambda x: x if x<=1 else fib(x-1) + fib(x-2) 
# THE RESULT
for i in range(n):
    print(fib(i))
"""
0
1
1
2
3
5
8
13
21
34
"""
The one-liner computes the Fibonacci series recursively. It defines an anonymous function with one parameter x to calculate the x-th Fibonacci element. The recursion base cases are x=0 and x=1 for which the Fibonacci numbers are 0 and 1, respectively. On top of that, the function calls itself to calculate the (x-1)-th and (x-2)-th Fibonacci numbers – and sums over both to calculate the x-th Fibonacci number.

While this is an intuitive way of defining the Fibonacci series, it is very inefficient because of highly redundant function calls. For example, the third Fibonacci number is calculated from scratch to find the fourth, the fifth, and the sixth Fibonacci number. A much better way would be to store the third (and every other) Fibonacci number in a list rather than recompute it again and again.

Therefore, the function becomes very slow to calculate only a few dozen Fibonacci values. Still, this one-liner serves educative purposes and is both readable and concise.

One-liner #2: write the Quicksort algorithm
If you don’t know the quicksort algorithm, have a look at this video:


Now, create a one-liner that runs this algorithm!

# THE DATA
unsorted = [33,2,3,45,6,54]
 
# THE ONE-LINER
qsort = lambda L: [] if L==[] else qsort([x for x in L[1:] if x< L[0]]) + L[0:1] + qsort([x for x in L[1:] if x>=L[0]])
 
# THE RESULT
print(qsort(unsorted))
# [2, 3, 6, 33, 45, 54]
The Quicksort algorithm (source) selects a pivot element from the list. In the code, it selects the first element of the list, i.e., L[0]. Then, the algorithm moves all elements that are smaller than the pivot to the left side. Similarly, it moves elements that are larger or equal than the pivot to the right side.

This is repeated in a recursive manner for the left and the right lists. Suppose, you create a new list as follows. You put all elements that are smaller than the pivot to the left, the pivot to the center, and all elements that are larger or equal the pivot to the right. You would consider the resulting list to be a bit more sorted, right? If the two sublists were already sorted, the list would be perfectly sorted. This is where the recursive call of qsort comes into play. It takes over the problem of sorting each sublist by applying the same scheme of pivoting and recursion to the sublist.

One-liner #1: write the Sieve of Eratosthenes
The Sieve of Eratosthenes is an ancient algorithm to find the prime numbers up to a specified number n. If you don’t know the algorithm, here is a very nice video from Khan Academy:


The idea is based on the fact that all non-prime numbers are composites of prime numbers. Thus, you exclude all numbers that are not prime using the following method. First, you mark all multiples of 2 as “not prime”. Second, you mark all multiples of the next unmarked number in your array (which is 3) as “not prime”. In general, for the unmarked number x, you mark the multiples from x starting in the number x**2. So if x**2 is larger than n, you are done. The rest of the numbers are prime.

# THE DATA
n=100
 
# THE ONE-LINER
primes = reduce( (lambda r,x: r-set(range(x**2,n,x)) if (x in r) else r), range(2,int(n**0.5)), set(range(2,n)))
 
# THE RESULT
print(primes)
# {2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97}
This one-liner is based on a StackOverflow answer.

It’s very elegant but you need to invest some time to understand it. The one-liner uses the reduce function to remove, one step at a time, all “marked” numbers from the initial set of all numbers between 2 and n (in the one-liner: set(range(2,n))). It takes this set as the initial value for r. Now it goes over all numbers x between 2 and the square root of n (in the one-liner: range(2,int(n**0.5))) and removes the multiples of x from the set r (starting at x**2) – but only if the number x is a prime number (i.e., it is not removed from the set r at this point in time). Spend 5 minutes to watch the video above and revisit this one-liner, then you will understand the algorithm.


    47.2
```
