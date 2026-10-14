---
type: reference
title: Miscellaneous
description: "C++ coding standard: miscellaneous do and dont rules on floating point, #define macros and constants."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.12"
---

# 17.1.12. Miscellaneous

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
This section contains some miscellaneous do's and don'ts.

    * Don't use floating-point variables where discrete values are needed. Using a float for a loop counter is a great way to shoot yourself in the foot. Always test floating-point numbers as <= or >=, never use an exact comparison (== or !=).

    * Compilers have bugs. Common trouble spots include structure assignment and bit fields. You cannot generally predict which bugs a compiler has. You could write a program that avoids all constructs that are known broken on all compilers. You won't be able to write anything useful, you might still encounter bugs, and the compiler might get fixed in the meanwhile. Thus, you should write ``around'' compiler bugs only when you are forced to use a particular buggy compiler.

    * Do not rely on automatic beautifiers. The main person who benefits from good program style is the programmer him/herself, and especially in the early design of handwritten algorithms or pseudo-code. Automatic beautifiers can only be applied to complete, syntactically correct programs and hence are not available when the need for attention to white space and indentation is greatest. Programmers can do a better job of making clear the complete visual layout of a function or file, with the normal attention to detail of a careful programmer (in other words, some of the visual layout is dictated by intent rather than syntax and beautifiers cannot read minds). Sloppy programmers should learn to be careful programmers instead of relying on a beautifier to make their code readable. Finally, since beautifiers are non-trivial programs that must parse the source, a sophisticated beautifier is not worth the benefits gained by such a program. Beautifiers are best for gross formatting of machine-generated code.

    * Accidental omission of the second ``='' of the logical compare is a problem. The following is confusing and prone to error.

              if (abool= bbool) { ... }
           

      Does the programmer really mean assignment here? Often yes, but usually no. The solution is to just not do it, an inverse Nike philosophy. Instead use explicit tests and avoid assignment with an implicit test. The recommended form is to do the assignment before doing the test:


             abool= bbool;
             if (abool) { ... }
          

    * Modern compilers will put variables in registers automatically. Use the register sparingly to indicate the variables that you think are most critical. In extreme cases, mark the 2-4 most critical values as register and mark the rest as REGISTER. The latter can be #defined to register on those machines with many registers. 

Be Const Correct
C++ provides the const key word to allow passing as parameters objects that cannot change to indicate when a method doesn't modify its object. Using const in all the right places is called "const correctness."

It's hard at first, but using const really tightens up your coding style. Const correctness grows on you.

If you don't use const correctness from the start it can be nightmare to add it in later because it causes a chain reaction of needing const everywhere. It's better to start being const correct from the start or you probably won't be.

You can always cast aways constness when necessary, but it's better not to.

For more information see Const Correctness in the C++ FAQ.

Placement of the Const Qualifier
When you combine const with pointers it can become quite confusing as to what const means. For example, is "const int * = NULL" an unchangeable pointer or is the int that it points to unchangeable? I know it always confuses me. Reese Anschultz suggested an alternate standard syntax that I've never tried, but it makes sense, so here it is:

int const = constant integer
int const * = pointer to constant integer
int const * const = constant pointer to constant integer
int const * const * = pointer to constant pointer to constant integ

This looks disturbingly different than the more common "const int A_GLOBAL_CONSTANT= 5" syntax we are used to seeing. But, according to the standards, the qualifier modifies everything to its left with the special exception where the qualifier precedes the first type and modifies just that type. Since there is one generalized form that works for all occasions, it is more consistent to always put the qualifier to the right of whatever is qualified.

Use Streams
Programmers transitioning from C to C++ find stream IO strange preferring the familiarity of good old stdio. Printf and gang seem to be more convenient and are well understood.

Type Safety
Stdio is not type safe, which is one of the reasons you are using C++, right? Stream IO is type safe. That's one good reason to use streams.

Standard Interface
When you want to dump an object to a stream there is a standard way of doing it: with the << operator. This is not true of objects and stdio.
Interchangeablity of Streams
One of the more advanced reasons for using streams is that once an object can dump itself to a stream it can dump itself to any stream. One stream may go to the screen, but another stream may be a serial port or network connection. Good stuff.
Streams Got Better
Stream IO is not perfect. It is however a lot better than it used to be. Streams are now standardized, acceptably efficient, more reliable, and now there's lots of documentation on how to use streams.
Check Thread Safety
Some stream implementations are not yet thread safe. Make sure that yours is.
But Not Perfect
For an embedded target tight on memory streams do not make sense. Streams inline a lot of code so you might find the image larger than you wish. Experiment a little. Streams might work on your target.

No Magic Numbers
A magic number is a bare naked number used in source code. It's magic because no-one has a clue what it means including the author inside 3 months. For example:

if      (22 == foo) { start_thermo_nuclear_war(); }
else if (19 == foo) { refund_lotso_money(); }
else if (16 == foo) { infinite_loop(); }
else                { cry_cause_im_lost(); }

In the above example what do 22 and 19 mean? If there was a number change or the numbers were just plain wrong how would you know?

Instead of magic numbers use a real name that means something. You can use #define or constants or enums as names. Which one is a design choice. For example:

#define   PRESIDENT_WENT_CRAZY  (22)
const int WE_GOOFED= 19;
enum 
{
   THEY_DIDNT_PAY= 16
};

if      (PRESIDENT_WENT_CRAZY == foo) { start_thermo_nuclear_war(); }
else if (WE_GOOFED            == foo) { refund_lotso_money(); }
else if (THEY_DIDNT_PAY       == foo) { infinite_loop(); }
else                                  { happy_days_i_know_why_im_here(); }

Now isn't that better? The const and enum options are preferable because when debugging the debugger has enough information to display both the value and the label. The #define option just shows up as a number in the debugger which is very inconvenient. The const option has the downside of allocating memory. Only you know if this matters for your application.

Error Return Check Policy

    * Check every system call for an error return, unless you know you wish to ignore errors. For example, printf returns an error code but rarely would you check for its return code. In which case you can cast the return to (void) if you really care.
    * Include the system error text for every system error message.
    * Check every call to malloc or realloc unless you know your versions of these calls do the right thing. You might want to have your own wrapper for these calls, including new, so you can do the right thing always and developers don't have to make memory checks everywhere. 

To Use Enums or Not to Use Enums
C++ allows constant variables, which should deprecate the use of enums as constants. Unfortunately, in most compilers constants take space. Some compilers will remove constants, but not all. Constants taking space precludes them from being used in tight memory environments like embedded systems. Workstation users should use constants and ignore the rest of this discussion.

In general enums are preferred to #define as enums are understood by the debugger.

Be aware enums are not of a guaranteed size. So if you have a type that can take a known range of values and it is transported in a message you can't use an enum as the type. Use the correct integer size and use constants or #define. Casting between integers and enums is very error prone as you could cast a value not in the enum.
A C++ Workaround
C++ allows static class variables. These variables are available anywhere and only the expected amount of space is taken.
Example

class Variables
{
public:
   static const int   A_VARIABLE;
   static const int   B_VARIABLE;
   static const int   C_VARIABLE;
}

Macros
Don't Turn C++ into Pascal
Don't change syntax via macro substitution. It makes the program unintelligible to all but the perpetrator.
Replace Macros with Inline Functions
In C++ macros are not needed for code efficiency. Use inlines.
Example

#define  MAX(x,y)	(((x) > (y) ? (x) : (y))	// Get the maximum

The macro above can be replaced for integers with the following inline function with no loss of efficiency:

   inline int 
   max(int x, int y)
   {
      return (x > y ? x : y);
   }

Be Careful of Side Effects
Macros should be used with caution because of the potential for error when invoked with an expression that has side effects.
Example

   MAX(f(x),z++);

Always Wrap the Expression in Parenthesis
When putting expressions in macros always wrap the expression in parenthesis to avoid potential communitive operation ambiguity.
Example

#define ADD(x,y) x + y

must be written as 

#define ADD(x,y) ((x) + (y))

Make Macro Names Unique
Like global variables macros can conflict with macros from other packages.

   |1. Prepend macro names with package names.
   |2. Avoid simple and common names like MAX and MIN. 

Do Not Default If Test to Non-Zero
Do not default the test for non-zero, i.e.


   if (FAIL != f()) 

is better than


   if (f()) 

even though FAIL may have the value 0 which C considers to be false. An explicit test will help you out later when somebody decides that a failure return should be -1 instead of 0. Explicit comparison should be used even if the comparison value will never change; e.g., if (!(bufsize % sizeof(int))) should be written instead as if ((bufsize % sizeof(int)) == 0) to reflect the numeric (not boolean) nature of the test. A frequent trouble spot is using strcmp to test for string equality, where the result should never ever be defaulted. The preferred approach is to define a macro STREQ.


   #define STREQ(a, b) (strcmp((a), (b)) == 0) 

Or better yet use an inline method:


   inline bool
   StringEqual(char* a, char* b)
   {
      return strcmp(a, b) == 0;
   }

Note, this is just an example, you should really use the standard library string type for doing the comparison.

The non-zero test is often defaulted for predicates and other functions or expressions which meet the following restrictions:

    * Returns 0 for false, nothing else.
    * Is named so that the meaning of (say) a true return is absolutely obvious. Call a predicate IsValid(), not CheckValid(). 

The Bull of Boolean Types
Any project using source code from many sources knows the pain of multiple conflicting boolean types. The new C++ standard defines a native boolean type. Until all compilers support bool, and existing code is changed to use it, we must still deal with the cruel world.

The form of boolean most accurately matching the new standard is:


   typedef int     bool;
   #define TRUE    1
   #define FALSE   0

or

   const int TRUE  = 1;
   const int FALSE = 0;

Note, the standard defines the names true and false not TRUE and FALSE. The all caps versions are used to not clash if the standard versions are available.

Even with these declarations, do not check a boolean value for equality with 1 (TRUE, YES, etc.); instead test for inequality with 0 (FALSE, NO, etc.). Most functions are guaranteed to return 0 if false, but only non-zero if true. Thus,


   if (TRUE == func()) { ... 

must be written


   if (FALSE != func()) { ... 

Usually Avoid Embedded Assignments
There is a time and a place for embedded assignment statements. In some constructs there is no better way to accomplish the results without making the code bulkier and less readable.


   while (EOF != (c = getchar())) 
   {
      process the character
   }

The ++ and -- operators count as assignment statements. So, for many purposes, do functions with side effects. Using embedded assignment statements to improve run-time performance is also possible. However, one should consider the tradeoff between increased speed and decreased maintainability that results when embedded assignments are used in artificial places. For example,


   a = b + c;
   d = a + r; 

should not be replaced by


   d = (a = b + c) + r; 

even though the latter may save one cycle. In the long run the time difference between the two will decrease as the optimizer gains maturity, while the difference in ease of maintenance will increase as the human memory of what's going on in the latter piece of code begins to fade.

Reusing Your Hard Work and the Hard Work of Others
Reuse across projects is almost impossible without a common framework in place. Objects conform to the services available to them. Different projects have different service environments making object reuse difficult.

Developing a common framework takes a lot of up front design effort. When this effort is not made, for whatever reasons, there are several techniques one can use to encourage reuse:

Ask! Email a Broadcast Request to the Group
This simple technique is rarely done. For some reason programmers feel it makes them seem less capable if they ask others for help. This is silly! Do new interesting work. Don't reinvent the same stuff over and over again.

If you need a piece of code email to the group asking if someone has already done it. The results can be surprising.

In most large groups individuals have no idea what other people are doing. You may even find someone is looking for something to do and will volunteer to do the code for you. There's always a gold mine out there if people work together.
Tell! When You do Something Tell Everyone
Let other people know if you have done something reusable. Don't be shy. And don't hide your work to protect your pride. Once people get in the habit of sharing work everyone gets better.
Don't be Afraid of Small Libraries
One common enemy of reuse is people not making libraries out of their code. A reusable class may be hiding in a program directory and will never have the thrill of being shared because the programmer won't factor the class or classes into a library.

One reason for this is because people don't like making small libraries. There's something about small libraries that doesn't feel right. Get over it. The computer doesn't care how many libraries you have.

If you have code that can be reused and can't be placed in an existing library then make a new library. Libraries don't stay small for long if people are really thinking about reuse.

If you are afraid of having to update makefiles when libraries are recomposed or added then don't include libraries in your makefiles, include the idea of services. Base level makefiles define services that are each composed of a set of libraries. Higher level makefiles specify the services they want. When the libraries for a service change only the lower level makefiles will have to change.

Keep a Repository
Most companies have no idea what code they have. And most programmers still don't communicate what they have done or ask for what currently exists. The solution is to keep a repository of what's available.

In an ideal world a programmer could go to a web page, browse or search a list of packaged libraries, taking what they need. If you can set up such a system where programmers voluntarily maintain such a system, great. If you have a librarian in charge of detecting reusability, even better.

Another approach is to automatically generate a repository from the source code. This is done by using common class, method, library, and subsystem headers that can double as man pages and repository entries.

Commenting Out Large Code Blocks
Sometimes large blocks of code need to be commented out for testing.
Using #if 0
The easiest way to do this is with an #if 0 block:

   void 
   example()
   {
      great looking code

      #if 0
      lots of code
      #endif
    
      more code
    }

You can't use /**/ style comments because comments can't contain comments and surely a large block of your code will contain a comment, won't it?

Don't use #ifdef as someone can unknowingly trigger ifdefs from the compiler command line.
Use Descriptive Macro Names Instead of 0
The problem with #if 0 is that even day later you or anyone else has no idea why this code is commented out. Is it because a feature has been dropped? Is it because it was buggy? It didn't compile? Can it be added back? It's a mystery.
Use Descriptive Macro Names Instead of #if 0

#if NOT_YET_IMPLEMENTED  

#if OBSOLETE

#if TEMP_DISABLED 

Add a Comment to Document Why
Add a short comment explaining why it is not implemented, obsolete or temporarily disabled.

Use #if Not #ifdef
Use #if MACRO not #ifdef MACRO. Someone might write code like:

#ifdef DEBUG
        temporary_debugger_break();
#endif

Someone else might compile the code with turned-of debug info like:

cc -c lurker.cpp -DDEBUG=0

Alway use #if, if you have to use the preprocessor. This works fine, and does the right thing, even if DEBUG is not defined at all (!)

#if DEBUG
        temporary_debugger_break();
#endif

If you really need to test whether a symbol is defined or not, test it with the defined() construct, which allows you to add more things later to the conditional without editing text that's already in the program:

#if !defined(USER_NAME)
 #define USER_NAME "john smith"
#endif

Creating a C Function in C++

extern "C" void
a_c_function_in_cplusplus(int a)
{
}

__cplusplus Preprocessor Directive
If you have code that must compile in a C and C++ environment then you must use the __cplusplus preprocessor directive. For example:

#ifdef __cplusplus

extern "C" some_function();

#else

extern some_function();

#endif

Mixing C and C++
In order to be backward compatible with dumb linkers C++'s link time type safety is implemented by encoding type information in link symbols, a process called name mangling. This creates a problem when linking to C code as C function names are not mangled. When calling a C function from C++ the function name will be mangled unless you turn it off. Name mangling is turned off with the extern "C" syntax. If you want to create a C function in C++ you must wrap it with the above syntax. If you want to call a C function in a C library from C++ you must wrap in the above syntax. Here are some examples:

Calling C Functions from C++

extern "C" int strncpy(...);
extern "C" int my_great_function();
extern "C"
{
   int strncpy(...);
   int my_great_function();
};

No Data Definitions in Header Files
Do not put data definitions in header files. for example:

/* 
 * aheader.h 
 */
int x = 0;

   |1. It's bad magic to have space consuming code silently inserted through the innocent use of header files.
   |2. It's not common practice to define variables in the header file so it will not occur to devellopers to look for this when there are problems.
   |3. Consider defining the variable once in a .cpp file and use an extern statement to reference it.
   |4. Consider using a singleton for access to the data. 

Make Functions Reentrant
Functions should not keep static variables that prevent a function from being reentrant. Functions can declare variables static. Some C library functions in the past, for example, kept a static buffer to use a temporary work area. Problems happen when the function is called one or more times at the same time. This can happen when multiple tasks are used or say from a signal handler. Using the static buffer caused results to overlap and become corrupted.

The moral is make your functions reentrant by not using static variables in a function. Besides, every machine has 128MB of RAM now so we don't worry about buffer space any more :-)

Use the Resource Acquisition is Initialization (RAII) Idiom
RAII is a pattern useful in making sure allocated resources get freed. What kind of resources? Memory usually. Could be file descriptors or locks too. Anything that is allocated at one point and needs to be deleted at another point in your code.

C++ can help make this painless because of a feature I miss a lot in Java, that your destructor is always called when an object leaves scope. This feature has caused the creation of the Guard idiom. A Guard can be wrapped around any resource so has to free the resource when the guard goes out of scope.

If you think you are always so careful to pair new and deletes that you don't need to use one of those pattern thingies then I am sure I'll be sitting beside you someday, like I have dozens of times before, searching for resource leaks in your code.

The acquisition phase happens at construction. You are supposed to do all the initialization in the constructor so you can do all the cleaning up in the destructor. And if you can guarantee through some different means that the destructor is always called then you can be pretty sure you won't leak.

Some intialization sequences can't be done in the constructor, particularly those using message driven state machines, but pretty much everything else can. And for those things use RAII. The justification is that it will save your butt from the many memory links that haunt large software products written in C++.

The key is to make sure the destructor is always called. The easiest way is to use a stack variable. That way you know the destructor will be called when leaving scope.

For pointers you can use one of the many smart pointer variants like auto_ptr. These will make sure your pointers are deleted when memory ownership is transferred or the scope is exited. You can even use them as member variables so you don't have to write code in the destructor.

If you can't use exceptions then this idiom isn't for you. As you are doing a lot of work in the constructor you can have errors and you'll want throw an exception.

See http://www.hackcraft.net/raii/ for a better explanation of RAII.

Remove Trailing Whitespace
Avoid trailing whitespace in source code as it causes source control systems that show diffs to show unecessary diffs that overwhelm the poor programmers ability to care.
```
