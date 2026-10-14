---
type: reference
title: Exception handling
description: Section 5 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#5"
---

# Exception handling

[↑ kb-cpp](/kb-cpp/README.md)

## 5.1 Articles against exceptions handling.

### 5.1.1 "

```text
EXCEPTION HANDLING:
A FALSE SENSE OF SECURITY
by Tom Cargill

    This article first appeared in C++ Report, Volume 6, Number 9, November-December 1994.


I suspect that most members of the C++ community vastly underestimate the skills needed to program with exceptions and therefore underestimate the true costs of their use. The popular belief is that exceptions provide a straightforward mechanism for adding reliable error handling to our programs. On the contrary, I see exceptions as a mechanism that may cause more ills than it cures. Without extraordinary care, the addition of exceptions to most software is likely to diminish overall reliability and impede the software development process.

This ""extraordinary care"" demanded by exceptions originates in the subtle interactions among language features that can arise in exception handling. Counter-intuitively, the hard part of coding exceptions is not the explicit throws and catches. The really hard part of using exceptions is to write all the intervening code in such a way that an arbitrary exception can propagate from its throw site to its handler, arriving safely and without damaging other parts of the program along the way.

In the October 1993 issue of the C++ Report, David Reed argues in favor of exceptions that: ""Robust reusable types require a robust error handling mechanism that can be used in a consistent way across different reusable class libraries."" While entirely in favor of robust error handling, I have serious doubts that exceptions will engender software that is any more robust than that achieved by other means. I am concerned that exceptions will lull programmers into a false sense of security, believing that their code is handling errors when in reality the exceptions are actually compounding errors and hindering the software.

To illustrate my concerns concretely I will examine the code that appeared in Reed's article. The code (page 42, October 1993) is a Stack class template. To reduce the size of Reed's code for presentation purposes, I have made two changes. First, instead of throwing Exception objects, my version simply throws literal character strings. The detailed encoding of the exception object is irrelevant for my purposes, because we will see no extraction of information from an exception object. Second, to avoid having to break long lines of source text, I have abbreviated the identifier current_index to top. Reed's code follows. Spend a few minutes studying it before reading on. Pay particular attention to its exception handling. [Hint: Look for any of the classic problems associated with delete, such as too few delete operations, too man4ddelete operations or access to memory after its delete.]

template 
class Stack
{
  unsigned nelems;
  int top;
  T* v;
public:
  unsigned count();
  void push(T);
  T pop();

  Stack();
  ~Stack();
  Stack(const Stack&);
  Stack& operator=(const Stack&);
};

template 
Stack::Stack()
{
  top = -1;
  v = new T[nelems=10];
  if( v == 0 )
    throw ""out of memory"";
}

template 
Stack::Stack(const Stack& s)
{
  v = new T[nelems = s.nelems];
  if( v == 0 )
    throw ""out of memory"";
  if( s.top > -1 ){
    for(top = 0; top <= s.top; top++)
      v[top] = s.v[top];

    top--;
  }
}

template 
Stack::~Stack()
{
  delete [] v;
}

template 
void Stack::push(T element)
{
  top++;
  if( top == nelems-1 ){
    T* new_buffer = new T[nelems+=10];
    if( new_buffer == 0 )
      throw ""out of memory"";
    for(int i = 0; i < top; i++)
      new_buffer[i] = v[i];
    delete [] v;
    v = new_buffer;
  }
  v[top] = element;
}

template 
T Stack::pop()
{
  if( top < 0 )
    throw ""pop on empty stack"";
  return v[top--];
}

template 
unsigned Stack::count()
{
  return top+1;
}

template 
Stack&
Stack::operator=(const Stack& s)
{
  delete [] v;
  v = new T[nelems=s.nelems];
  if( v == 0 )
    throw ""out of memory"";
  if( s.top > -1 ){
    for(top = 0; top <= s.top; top++)
      v[top] = s.v[top];
    top--;
  }
  return *this;
}

My examination of the code is in three phases. First, I study the code's behavior along its ""normal,"" exception-free execution paths, those in which no exceptions are thrown. Second, I study the consequences of exceptions thrown explicitly by the member functions of Stack. Third, I study the consequences of exceptions thrown by the T objects that are manipulated by Stack. Of these three phases, it is unquestionably the third that involves the most demanding analysis.

Normal Execution Paths
Consider the following code, which uses assignment to make a copy of an empty stack:

Stack y;
Stack x = y;
assert( y.count() == 0 );
printf( ""%u\n"", x.count() );



17736

The object x should be made empty, since it is copied from an empty master. However, x is not empty according to x.count(); the value 17736 appears because x.top is not set by the copy constructor when copying an empty object. The test that suppresses the copy loop for an empty object also suppresses the setting of top. The value that top assumes is determined by the contents of its memory as left by the last occupant.

Now consider a similar situation with respect to assignment:

Stack a, b;
a.push(0);
a = b;
printf( ""%u\n"", a.count() );



1

Again, the object a should be empty. Again, it isn't. The boundary condition fault seen in the copy constructor also appears in operator=, so the value of a.top is not set to the value of b.top. There is a second bug in operator=. It does nothing to protect itself against self-assignment, that is, where the left-hand and right-hand sides of the assignment are the same object. Such an assignment would cause operator= to attempt to access deleted memory, with undefined results.

Exceptions Thrown by Stack
There are five explicit throw sites in Stack: four report memory exhaustion from operator new, and one reports stack underflow on a pop operation. (Stack assumes that on memory exhaustion operator new returns a null pointer. However, some implementations of operator new throw an exception instead. I will probably address exceptions thrown by operator new in a later column.)

The throw expressions in the default constructor and copy constructor of Stack are benign, by and large. When either of these constructors throws an exception, no Stack object remains and there is little left to say. (The little that does remain is sufficiently subtle that I will defer it to a later column as well.)

The throw from push is more interesting. Clearly, a Stack object that throws from a push operation has rejected the pushed value. However, when rejecting the operation, in what state should push leave its object? On push failure, this stack class takes its object into an inconsistent state, because the increment of top precedes a check to see that any necessary growth can be accomplished. The stack object is in an inconsistent state because the value of top indicates the presence of an element for which there is no corresponding entry in the allocated array.

Of course, the stack class might be documented to indicate that a throw from its push leaves the object in a state in which further member functions (count, push and pop) can no longer be used. However, it is simpler to correct the code. The push member function could be modified so that if an exception is thrown, the object is left in the state that it occupied before the push was attempted. Exceptions do not provide a rationale for an object to enter an inconsistent state, thus requiring clients to know which member functions may be called.

A similar problem arises in operator=, which disposes of the original array before successfully allocating a new one. If x and y are Stack objects and x=y throws the out-of-memory exception from x.operator=, the state of x is inconsistent. The value returned by a.count() does not reflect the number of elements that can be popped off the stack because the array of stacked elements no longer exists.

Exceptions Thrown by T
The member functions of Stack create and copy arbitrary T objects. If T is a built-in type, such as int or double, then operations that copy T objects do not throw exceptions. However, if T is another class type there is no such guarantee. The default constructor, copy constructor and assignment operator of T may throw exceptions just as the corresponding members of Stack do. Even if our program contains no other classes, client code might instantiate Stack>. We must therefore analyze the effect of an operation on a T object that throws an exception when called from a member function of Stack.

The behavior of Stack should be ""exception neutral"" with respect to T. The Stack class must let exceptions propagate correctly through its member functions without causing a failure of Stack. This is much easier said than done.

Consider an exception thrown by the assignment operation in the for loop of the copy constructor:

template 
Stack::Stack(const Stack& s)
{
  v = new T[nelems = s.nelems]; // leak
  if( v == 0 )
    throw ""out of memory"";
  if( s.top > -1 ){
    for(top = 0; top <= s.top; top++)
      v[top] = s.v[top]; // throw 
    top--;
  }
}

Since the copy constructor does not catch it, the exception propagates to the context in which the Stack object is being created. Because the exception came from a constructor, the creating context assumes that no object has been constructed. The destructor for Stack does not execute. Therefore, no attempt is made to delete the array of T objects allocated by the copy constructor. This array has leaked. The memory can never be recovered. Perhaps some programs can tolerate limited memory leaks. Many others cannot. A long-lived system, one that catches and successfully recovers from this exception, may eventually be throttled by the memory leaked in the copy constructor.

A second memory leak can be found in push. An exception thrown from the assignment of T in the for loop in push propagates out of the function, thereby leaking the newly allocated array, to which only new_buffer. points:

template 
void Stack::push(T element)
{
  top++;
  if( top == nelems-1 ){
    T* new_buffer = new T[nelems+=10]; // leak
    if( new_buffer == 0 )
      throw ""out of memory"";
    for(int i = 0; i < top; i++)
      new_buffer[i] = v[i]; // throw
    delete [] v;
    v = new_buffer;
  }
  v[top] = element;
}

The next operation on T we examine is the copy construction of the T object returned from pop:

template 
T Stack::pop()
{
  if( top < 0 )
    throw ""pop on empty stack"";
  return v[top--]; // throw
}

What happens if the copy construction of this object throws an exception? The pop operation fails because the object at the top of the stack cannot be copied (not because the stack is empty). Clearly, the caller does not receive a T object. But what should happen to the state of the stack object on which a pop operation fails in this way? A simple policy would be that if an operation on a stack throws an exception, the state of the stack is unchanged. A caller that removes the exception's cause can then repeat the pop operation, perhaps successfully.

However, pop does change the state of the stack when the copy construction of its result fails. The post-decrement of top appears in an argument expression to the copy constructor for T. Argument expressions are fully evaluated before their function is called. So top is decremented before the copy construction. It is therefore impossible for a caller to recover from this exception and repeat the pop operation to retrieve that element off the stack.

Finally, consider an exception thrown by the default constructor for T during the creation of the dynamic array of T in operator=:

template 
Stack&
Stack::operator=(const Stack& s)
{
  delete [] v;  // v undefined
  v = new T[nelems=s.nelems]; // throw
  if( v == 0 )
    throw ""out of memory"";
  if( s.top > -1 ){
    for(top = 0; top <= s.top; top++)
      v[top] = s.v[top];
    top--;
  }
  return *this;
}

The delete expression in operator= deletes the old array for the object on the left-hand side of the assignment. The delete operator leaves the value of v undefined. Mostimplementations leave v dangling unchanged, still pointing to the old array that has been returned to the heap. Suppose the exception from T::T() is thrown from within this assignment:

{
  Stack x, y;
  y = x;  // throw
} // double delete

As the exception propagates out of y.operator=, y.v is left pointing to the deallocated array. When the destructor for y executes at the end of the block, y.v still points to the deallocated array. The delete in the Stack destructor therefore has undefined results - it is illegal to delete the array twice.

An Invitation
Regular readers of this column might now expect to see a presentation of my version of Stack. In this case, I have no code to offer, at least at present. Although I can see how to correct many of the faults in Reed's Stack, I am not confident that I can produce a exception-correct version. Quite simply, I don't think that I understand all the exception related interactions against which Stack must defend itself. Rather, I invite Reed (or anyone else) to publish an exception-correct version of Stack. This task involves more than just addressing the faults I have enumerated here, because I have chosen not to identify all the problems that I found in Stack. This omission is intended to encourage others to think exhaustively about the issues, and perhaps uncover situations that I have missed. If I did offer all of my analysis, while there is no guarantee of it completeness, it might discourage others from looking further. I don't know for sure how many bugs must be corrected in Stack to make it exception-correct.

" 
```

### 5.1.2. Posted in November 13th, 2007 by Mark in Programming

```text
Exceptions are a necessary part of the C++ language, but for most programmers they are worse than worthless - they are unusable. When exceptions were first added to the language back in the days before standardization, they were seen as a brilliant improvement over the hideous setjmp/longjmp facility from ANSI C. Because exceptions unwind the stack when they are thrown, they call destructors and clean up all of your untidy messes as they go.


It didn't take long for somebody to notice that the emperor had no clothes. In 1994, Tom Cargill published a prescient article in the late C++ Report. Tom pointed out in detail just how difficult it was to write code that actually held up when exceptions were used. Scott Meyers flags this as one of his five Most Important C++ Non-Book Publications...Ever. (Incidentally, Tom is responsible for a piece of wisdom that sounds like a an offhand quip: the ninety-ninety rule. Any project manager who doesn't understand this rule all the way into his or her bones needs to quit. Now.)

The intervening years have not been kind to exceptions. The problems Tom foresaw in 1994 were real, and while they can be managed, writing exception-safe code is still fraught with peril. As a result, exceptions are basically unused by by most C++ programmers. After all, we have to deal with tough problems like writing safe multithreaded apps, understanding template metaprogramming, and dealing with the language's high-maintenance memory management. The last thing we need is to make use of a feature, that while useful, is basically impossible to use correctly.

Naturally, after this rather verbose introduction, you have probably guessed that I'm using this article to tell you about a simple little utility class I use to help me throw informative, easy to build exceptions in my C++ programs. Yes, exceptions are problematic, but there's one place I can use them with impunity: to cause a fatal error that aborts my program.
Fatal Errors Considered Exceptional

If you analyze Tom Cargill's article, or look into any of the additional work that has been done on exceptions up until today, you'll see that most of the nasty side effects are only a problem for a program that tries to keep running in a predictable and safe fashion while throwing and catching exceptions.

The side effects of code that isn't quite exception-safe include memory leaks, partially constructed objects, and invalid containers. All bad things. But the one place they usually don't matter to me is when things have degraded in my program to the point where I'm ready to throw in the towel anyway. That point is when I've encountered a fatal error and am aborting the program. At that point, I throw an exception, which generally percolates all the way up to main(), where it is caught, and error message is printed, and the program exits.

Handling fatal errors this way makes for much cleaner code. I generally assume that every method or function called in my program succeeds, and don't worry about creating special returns with error codes. I blithely march through call after call without checking results, secure in the knowledge that my code is working properly. I know this is the case, because if something went wrong, an exception would have been thrown, and my program would abort.

This error handling strategy is implemented entirely in main(), which generally follows this form in one of my programs:
HILITED HTML
C++:
int main( int argc, char *argv[] ) { try { // // all the work is enclosed in this try block // ... } catch ( const std::exception & e ) std::cout <<"\nFatal error: " <<e.what() <<"\n\n"; std::cout <<"Hit enter to continue..."; std::string temp; std::getline( std::cin, temp ); return -1; } return 0; }

There are a couple of interesting points to note about the error handler you see here. First, because I am catching std::exception, I will catch any errors in the standard library, such as bad_alloc, logic_error, runtime_error, etc. It's a good idea to have a top-level try/catch block for these items anyway, so my use of exceptions for fatal errors forces good hygiene practices.

Second, I'm using the what() method to give human-readable feedback on exactly what happened to send my program off the rails. This method is defined as virtual for the base class std::exception, so all derived classes will support it. There's no requirement that they populate this string with great prose, but we can at least expect implementors to provide something informative here.
My Exception Class

When I first started using exceptions for fatal errors, I kept things simple by just throwing instances of std::runtime_error when I wanted to abort my program. I could pass the constructor of this object a descriptive string as it was constructed, and that same string would be returned when what() was called in the exception handler. Typical usage might look like this:
HILITED HTML
C++:
#include <stdexcept> int main( int argc, char *argv[] ) { try { if ( argc <2 ) throw std::runtime_error( "Usage:\n\n" "add_link_error url\n" );

This code ensures that if the user leaves off the necessary command line argument, the catch() block will print out a usage statement and return an error value to the invoking shell, which is just what we want. I manage to handle faulty input with just one line of code, don't have to set any error variables, no if/then/break clause to print an error and then exit. It's tidy and works well.

Of course, it wasn't long until I ran into situations where I wanted to provide the user a little more information with a fatal error - information that had to be formatted at runtime. I ended up writing a lot of code that looked like this:
HILITED HTML
C++:
FILE *fp = fopen( "database.txt", "r" ); if ( !fp ) { std::stringstream s; s <<"Error opening file, errno value of " <<errno <<" translates to " <<strerror( errno ); throw std::runtime_error( s.str() ); };

This more or less worked, but it added a lot of lines to the code, and as a rule, the fewer lines, the less typing, the more I like it. In this case I have to construct a separate std::stringstream object to hold the formatted error message (or a character buffer if I choose to go old school and use vnsprintf() , a second line to do the formatting, and a third line to construct and throw the exception.

In addition to writing three lines instead of one, I now have to enclose the whole thing in brackets, because the clause following the if statement is multiple lines, which makes the whole thing require five lines of code instead of one!
A Better Way

I needed to find a better way to do this. I first dabbled with a class derived from std::exception that used vnsprintf() to format arguments, C-style. But there were a few disadvantages to this, the primary one being that it made it hard to take advantage of classes that have their own overrides to stream classes. In other words, if I've bothered to create a stream override so I can print the contents of class foo, it's easy to write that to a stream, but not so easy to insert it into a buffer being formatted with vnsprintf().

So I determined that I wanted to have a class that that let me rewrite the code shown above so that it all fits on one line, like this:
HILITED HTML
C++:
FILE *fp = fopen( "database.txt", "r" ); if ( !fp ) throw fatal_error() <<"Error opening file, errno value of " <<errno <<" translates to " <<strerror( error );

My Goal For Use of class fatal_error

My first stab at getting this to work was to create a class that used multiple inheritance to create a class that inherits from both std::exception and std::stringstream:
HILITED HTML
C++:
class fatal_error : public std::exception , public std::stringstream { ...

With this routine I'd just need to override the definition of what() and I would be in business.

But there was a fatal flaw in this problem: the absence of a copy constructor for std::stringstream. I had assumed that the copy constructor wouldn't be needed, as I was catching the exception object by reference. My thought was that the compiler would create a temporary object, pass it along to my catch clause, and all would be well.

No such luck. In this case, the compiler has the right to make a copy, and even if it doesn't make a copy, it has the right to insist on a copy constructor even if it is only considering the possibility of making a copy. Strike one.
This One Works

So I needed to make a version of my fatal_error class that doesn't try to call the copy constructor for std::stringstream. This is accomplished easily enough by using composition instead of inheritance:
HILITED HTML
C++:
class fatal_error : public std::exception { ... private : mutable std::stringstream mStream; };

This solves one problem, but creates another. Because fatal_error is no longer derived from std::stringstream, I've lost the overloaded operators that insert text into the object before it is thrown. In other words, my wished-for code shown above won't compile.

In this case, the solution is simple, I just add a template method to the class:
HILITED HTML
C++:
class fatal_error : public std::exception { public : template<typename T> fatal_error& operator<<( const T& t ) { mStream <<t; return *this; } ... }

Now the template class takes care of routing the stream insertion output into the std::stringstream member I've incorporated into my class. Note also that the overloaded insertion operator returns a reference to the fatal_error object, allowing me to chain insertions.
Almost Done

There only two more issues to deal with in order for this class to be ready for use. First, I need to deal with the possibility of a copy constructor being called as this exception is thrown. Because I can't copy the std::stringstream object from the old object to the new, I have to save off its contents into a mutable std::string member called mWhat. The result looks like this:
PLAIN TEXT
C++:

   a.
      fatal_error::fatal_error( const fatal_error &that )
   b.
      {
   c.
          mWhat += that.mStream.str();
   d.
      }

Finally, I need a good version of what() that conforms to what is expected for std::exception. This is nice and easy:
HILITED HTML
C++:
virtual const char *fatalError::what() const throw() { if ( mStream.str().size() ) { mWhat += mStream.str(); mStream.str( "" ); } return mWhat.c_str(); }

Wrapped Up

With that, I have an exception that I can use to easily generate fatal error exceptions with as much data as I want. I only have to include a single header file in any code that uses the class, and I can create and throw the exception in a single line of code, which adheres to the C ideologoy of minimal typing.

Life is good.

Complete source code from the single file, fatal_error.h, is given below. This code should work in g++ 3.x code, and Visual Studio 2003 and 2005 programs. If you run into problems with different versions of various compilers, please let me know!
HILITED HTML
C++:

// 
//fatal_error.h 
#include <sstream> 
#include <stdexcept> 
#include <string> 
// 
// This class is designed to make it a little easier 
// to throw informative exceptions. It's a little lame, 
// but I do like to be able to write code like this 
// for fatal errors: 
// 
// throw fatal_error() <<"Game over, " 
// <<mHealth 
// <<" health points!"; 
// 
// It works everywhere I've tested it, let's hope that it holds up. 
 class fatal_error : public std::exception 
{ public : 
	fatal_error() {}; 
// 
// Need a copy constructor, because the runtime of the compiler is 
// allowed to insist on it when it throws an object of this type, 
// even if it doesn't actually make a copy. When I make a copy, I 
// need to capture whatever is in the stringstream object. Note: 
// in many cases, attempting to copy an iostream object leads to 
// errors, so the copy constructor here constructs a brand new 
// mstream object. 
 fatal_error( const fatal_error &that ) { mWhat += that.mStream.str(); } 
// 
 Virtual dtor needed? Not really, but here it is anyway. 
 virtual ~fatal_error() throw(){}; 
// 
// When I finally get this object to an exception handler, 
// (hopefully catching by reference) I want to display the error 
// message that I've inserted. To do that, I just chapture 
// whatever is in the mWhat string object concatenated 
// with anything that might be in the stringstring mStream object, 
// and return it. (Odds are that only one of them will contain 
// anything, depending on whether or not the copy constructor 
// was called. 
 virtual const char *what() const throw() { if ( mStream.str().size() ) { mWhat += mStream.str(); mStream.str( "" ); } return mWhat.c_str(); } 
// 
// The template function used to create insertion operators for all 
// of the various types of objects one might insert into this guy. 
 template<typename T> fatal_error& operator<<( const T& t ) { mStream <<t; return *this; } private: mutable std::stringstream mStream; mutable std::string mWhat; };


	5.2
```
