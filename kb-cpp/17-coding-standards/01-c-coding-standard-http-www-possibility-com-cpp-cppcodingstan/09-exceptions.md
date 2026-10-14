---
type: reference
title: Exceptions
description: "C++ coding standard: exception guidelines, e.g. one exception per library and avoiding elaborate hierarchies."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.9"
---

# 17.1.9. Exceptions

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Create One Exception for Each Library
Creating very elaborate exception hierarchies is a waste of time. Nobody ends of caring and all the effort goes to waste. Instead, create one exception per library or namespace and have an exception reason within that exception to indicate the type of the exception.

For example, for your OS encapsulation libary, make an exception called OsencapException.

By using just one exception you make it easy for people using your code to catch your exception. If you have thousand exceptions it is impossible for anyone to handle those. And as exceptions are added you will break existing code that thinks they are handling all your exceptions.

If you think you need to create derived exceptions the derive them from your libraries' base exception class. That allows your library users to still catch the base class exception if they wish.

Most exceptions are things the code can't do anything about anyway, so creating lots of exceptions to express every little thing that can go wrong with a separate class and is time confusing and confusing for the user. It's not necessary.

Make sure to document that an exception is being thrown in you method comment header.

Create a macro for throwing the exception so that you can transparently include __FILE__ and __LINE__ in the exception. This information is usefull when debugging. You can also automatically take a time stamp and get the thread ID.

The exception should take a one or two string arguments so developers can include all the information they need in the exception without having to create a derived exception to add a few more pieces of data.

Include a stack trace of where the exception happened so you can log the stack trace.

Throwing an exception should take only one line of code. Don't uglify your code with tons of exception handling. Make a macro that looks like:

THROW_NAMESPACE_EX_IF(cond, msg1, msg2, reason);

The condition causes the exception to be thrown when true. Msg1 and msg2 are local context. Reason is the specific error code for the exception, if you think you need it.

Don't worry about running out of memory errors. Go ahead and allocate memory in your exception code. If you are running out of memory that should be taken care of in the bad_alloc exception handler.

Selecting Between Exceptions And Asserts
If there is reason to believe that an important test could fail in the released product, it should not be tested with an assert, use an exception instead.

Two useful questions to ask yourself are:

   |1. Should this error ever happen?
   |2. Is the error so unexpected or potentially damaging that the system should failover if it is found? 

When at the boundry of user input we should expect invalid parameters and thus should use an exception instead of DBC.

Exception Definition
There are as many definitions of exception as there are programmers:

The Clean Code Definition

Write a function as if everything worked.
Any error handling that prevents the code from looking
like this is an exception.

The Design by Contract Definition

When an operation is invoked with it's pre-condition
satisfied, yet it cannot return with its post-condition
satisfied.

There are those who say that exceptions should NOT be used to catch things like range errors. Here's why:

Range errors fall into a class of problem that are called Programmer Errors. Programmer errors are things that should NOT occur in a Bug Free Program. Ideally, range type problems are one of those things that should be caught during development. It is for these problems that we have Design By Contract.

You program defensively by putting lots of asserts in to make sure that your program is functioning as expected. Then when you've committed a bug, like not checking user input properly, allowing an invalid index into an array to be derived, the assert macro catches it, and the program does a gracful crash.

Exceptions, on the other hand, should be used to catch problems that would arise even in a Bug Free Program, i.e. Exceptional Circumstances. The most perfect program can still be afflicted by things like shortage of memory and other resources, communications errors, and file problems. When one of these things occurs, an exception should be thrown, and caught at a point where the program can either deal with the problem, or close gracefully.

The real theory behind exceptions is to force the programmer to anticipate things the programmer has no control over. Exceptions support the following kind of scenarios:

   |1. Logic error in the middle of a database transaction. An exception would allow the program a chance to leave the database in a consistent state. A trashed database can be very expensive.
   |2. Logic error in the middle of a program that is using a resource ike a modem and the program runs unattended. Exception handling would give the program a chance to hang up the modem connection, rather than sit there with an connection until it's discovered the next day, running up the phone bill.
   |3. Logic error in the middle of something like a word processor. Consider the user that has been working for a couple of hours with unsaved edits, and your assert message pops up, and the last two hours of work are pretty much lost - causing the user some misery. If you used exception handling, you could at least give the user a chance to salvage the unsaved document in a different file as part of the cleanup. 

Design-by-Contract (DBC)
A design technique developed by Bertrand Meyer for producing "bug free" systems.

Design by Contract (DBC) views the relationship between a class and its clients as formal agreement, expressing each party's rights and obligation. Rights and obligations are determined by a class' specification. Correctness can only be determined in reference to an object's specification. Specifications, in DBC, are expressed through assertions.

Design by Contract is a development approach where a specification is associated with every software element. These specifications (or contracts) govern the interaction of the element with the rest of the world. A contract takes form as a set of preconditions, postconditions, and invariants that are run as the system executes. The contract is published in the comment block of each method.

Assertion
A boolean statement that should never be false and, therefore, will only be false because of a bug. Typically assertions are checked only during debug and are not checked during production execution, although they can be left in when performance and memory size are not issues.

Design by Contract uses three kinds of assertions: post-conditions, pre-conditions, and invariants. Pre-conditions and post-conditions apply to operations. Invariants apply to the class.

Pre-condition
A statement of how we expect the world to be before we execute an operation. We might design a pre-condition of the "square" operation as this >= 0. Such a pre-condition says that it is an error to invoke "square" on a negative number.

Post-condition
A statement of what the world should look like after execution of an operation. For example, if we define the operation "square" on a number, the post-condition would take the form result = this *this. The post-condition is a useful way of saying what we do without saying how we do it- in other words, of separating interface from implementation.

Invariant
An invariant is an assertion about a class. For instance, an Account class may have an invariant that says that balance == sum(entries.amount()). The invariant is always true for all instances of the class. "Always" means whenever the object is available for an operation to be invoked. During an operation invariants may not be satisfied, but invariants must hold when an operation has finished.

Is pop'ing an empty stack an exception?
When using a stack data structure is calling pop on an empty stack an exception? This is the standard use case for the endless discussions on what is and what isn't an exception. The upshot is there is not a "right" answer. In practice, as long as the library designer completely documents their choice the library user shouldn't make a mistake.

Let's apply our definition of exception.

The Clean Code View
If you write your application assuming everything works then is pop returning null something you wouldn't expect? It seems reasonable that if you ask for something it may not be there.

Before calling pop the client can call isEmpty to check if there's anything in the list. It's still possible in a multi-threaded environment for the stack to return null even if isEmpty returns true.

So don't use an exception. Pop returns data so it should return null when empty.

The Design by Contract View
Should the library designer have as a pre-condition that pop shouldn't be called when the stack is empty? From an implementor point of view this could seem reasonable. After all, why should an operation be called when there's nothing there? So, pop could assert.

But, library designers should alway see their clients point-of-view. It's a bit extreme to cause a system crash because pop has an empty stack. There's nothing fundamentally or systemically wrong in this scenario that would justify an assert.

It appears the pre-conditions are satisfied for pop. Would any post-conditions not be satisfied? (this defines an exception in DBC). The stack should still be empty after the operation so no post-conditions would be violated. Thus, by definition an exception should not be thrown.

Be Careful Throwing Exceptions in Destructors
An object is presumably created to do something. Some of the changes made by an object should persist after an object dies (is destructed) and some changes should not. Take an object implementing a SQL query. If a database field is updated via the SQL object then that change should persist after the SQL objects dies. To do its work the SQL object probably created a database connection and allocated a bunch of memory. When the SQL object dies we want to close the database connection and deallocate the memory, otherwise if a lot of SQL objects are created we will run out of database connections and/or memory.

The logic might look like:

Sql::~Sql()
{
   delete connection;
   delete buffer;
}

Let's say an exception is thrown while deleting the database connection. Will the buffer be deleted? No. Exceptions are basically non-local gotos with stack cleanup. The code for deleting the buffer will never be executed creating a gaping resource leak.

Special care must be taken to catch exceptions which may occur during object destruction. Special care must also be taken to fully destruct an object when it throws an exception.

Usign RAII can help prevent many of not most of these type of errors.

Working With Libaries Using All Sorts of Different Policies
On many projects we have to work with C libraries that use error return codes, old C++ libraries that use error return codes, and newer C++ libraries that use exceptions. How should all these different approaches work together?

Ideally exceptions should be used where possible because that's the where all new code is going. But I also see new libraries being forced to use error return codes because the old libraries use them and application maintainers don't want you to use exceptions.

In C++ any method can throw an exception and you can't tell. In Java you know when you are not catching an exception. Not in C++. So what happens is that if a new library comes in and throws an exception, a crticial program may start failing because an exception is not caught. This may make everyone use error codes instead of exceptions.

Don't give into this old timer bias. Error return codes are virtually useless because they are competely ingorable. Instead, an application should just wrap their code in a big try catch block that catches all exceptions. That way an application won't die with prejudice and C++ libarary writers can make use of exceptions in their design.
```
