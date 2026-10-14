---
type: reference
title: Names
description: "Subsection 17.1.3 of C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html."
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.3"
---

# 17.1.3. Names

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Make Names Fit
Names are the heart of programming. In the past people believed knowing someone's true name gave them magical power over that person. If you can think up the true name for something, you give yourself and the people coming after power over the code. Don't laugh!

A name is the result of a long deep thought process about the ecology it lives in. Only a programmer who understands the system as a whole can create a name that "fits" with the system. If the name is appropriate everything fits together naturally, relationships are clear, meaning is derivable, and reasoning from common human expectations works as expected.

If you find all your names could be Thing and DoIt then you should probably revisit your design.

Class Names

    * Name the class after what it is. If you can't think of what it is that is a clue you have not thought through the design well enough.
    * Compound names of over three words are a clue your design may be confusing various entities in your system. Revisit your design. Try a CRC card session to see if your objects have more responsibilities than they should.
    * Avoid the temptation of bringing the name of the class a class derives from into the derived class's name. A class should stand on its own. It doesn't matter what it derives from.
    * Suffixes are sometimes helpful. For example, if your system uses agents then naming something DownloadAgent conveys real information. 

Method and Function Names

    * Usually every method and function performs an action, so the name should make clear what it does: CheckForErrors() instead of ErrorCheck(), DumpDataToFile() instead of DataFile(). This will also make functions and data objects more distinguishable.

      Classes are often nouns. By making function names verbs and following other naming conventions programs can be read more naturally.

    * Suffixes are sometimes useful:
          o Max - to mean the maximum value something can have.
          o Cnt - the current count of a running count variable.
          o Key - key value. 

      For example: RetryMax to mean the maximum number of retries, RetryCnt to mean the current retry count.

    * Prefixes are sometimes useful:
          o Is - to ask a question about something. Whenever someone sees Is they will know it's a question.
          o Get - get a value.
          o Set - set a value. 

      For example: IsHitRetryLimit.

Include Units in Names
If a variable represents time, weight, or some other unit then include the unit in the name so developers can more easily spot problems. For example:

uint32 mTimeoutMsecs;
uint32 mMyWeightLbs;

Better yet is to make a variable into a class so bad conversions can be caught.

No All Upper Case Abbreviations

    * When confronted with a situation where you could use an all upper case abbreviation instead use an initial upper case letter followed by all lower case letters. No matter what. 

Justification

    * People seem to have very different intuitions when making names containing abbreviations. It's best to settle on one strategy so the names are absolutely predictable.

      Take for example NetworkABCKey. Notice how the C from ABC and K from key are confused. Some people don't mind this and others just hate it so you'll find different policies in different code so you never know what to call something. 

Example

   class FluidOz             // NOT FluidOZ
   class NetworkAbcKey       // NOT NetworkABCKey

Class Names

    * Use upper case letters as word separators, lower case for the rest of a word
    * First character in a name is upper case
    * No underbars ('_') 

Justification

    * Of all the different naming strategies many people found this one the best compromise. 

Example

   class NameOneTwo
  
   class Name

Class Library Names

    * Now that name spaces are becoming more widely implemented, name spaces should be used to prevent class name conflicts among libraries from different vendors and groups.
    * When not using name spaces, it's common to prevent class name clashes by prefixing class names with a unique string. Two characters is sufficient, but a longer length is fine. 

Example
John Johnson's complete data structure library could use JJ as a prefix, so classes would be:

   class JjLinkList
   {
   }

Method Names

    * Use the same rule as for class names. 

Justification

    * Of all the different naming strategies many people found this one the best compromise. 

Example

   class NameOneTwo
   {
   public:
      int                   DoIt();
      void                  HandleError();
   }

Class Attribute Names

    * Attribute names should be prepended with the character 'm'.
    * After the 'm' use the same rules as for class names.
    * 'm' always precedes other name modifiers like 'p' for pointer. 

Justification

    * Prepending 'm' prevents any conflict with method names. Often your methods and attribute names will be similar, especially for accessors. 

Example

   class NameOneTwo
   {
   public:
      int                   VarAbc();
      int                   ErrorNumber();
   private:
      int                   mVarAbc;
      int                   mErrorNumber;
      String*               mpName;
   }

Method Argument Names

    * The first character should be lower case.
    * All word beginnings after the first letter should be upper case as with class names. 

Justification

    * You can always tell which variables are passed in variables.
    * You can use names similar to class names without conflicting with class names. 

Example

   class NameOneTwo
   {
   public:
      int                   StartYourEngines(
                               Engine& rSomeEngine, 
                               Engine& rAnotherEngine);
   }

Variable Names on the Stack

    * use all lower case letters
    * use '_' as the word separator. 

Justification

    * With this approach the scope of the variable is clear in the code.
    * Now all variables look different and are identifiable in the code. 

Example

   int
   NameOneTwo::HandleError(int errorNumber)
   {
      int            error= OsErr();
      Time           time_of_error;
      ErrorProcessor error_processor;
      Time*          p_out_of_time= 0;
   }

The standard pointer notation is not entirely satisfactory because it doesn't look quite right, but it is consistent.

How do you handle statics? There's never a reason to have a static local to a function so there's no reason to invent a syntax for it. But like for most absolute rules, there is an exception, that is when making singletons. Use a "s_" prefix in this case. Take a look at Singleton Pattern for more details.

Pointer Variables

    * pointers should be prepended by a 'p' in most cases
    * place the * close to the pointer type not the variable name 

Justification

    * The idea is that the difference between a pointer, object, and a reference to an object is important for understanding the code, especially in C++ where -> can be overloaded, and casting and copy semantics are important.
    * Pointers really are a change of type so the * belongs near the type. One reservation with this policy relates to declaring multiple variables with the same type on the same line. In C++ the pointer modifier only applies to the closest variable, not all of them, which can be very confusing, especially for newbies. You want to have one declaration per line anyway so you can document each variable. 

Example

  String* pName= new String;

  String* pName, name, address; // note, only pName is a pointer.

Reference Variables and Functions Returning References

    * References should be prepended with 'r'. 

Justification

    * The difference between variable types is clarified.
    * It establishes the difference between a method returning a modifiable object and the same method name returning a non-modifiable object. 

Example

   class Test
   {
   public:
      void               DoSomething(StatusInfo& rStatus);

      StatusInfo&        rStatus();
      const StatusInfo&  Status() const;

   private:
      StatusInfo&        mrStatus;
   }

Global Variables

    * Global variables should be prepended with a 'g'. 

Justification

    * It's important to know the scope of a variable. 

Example

    Logger  gLog;
    Logger* gpLog;

Global Constants

    * Global constants should be all caps with '_' separators. 

Justification
It's tradition for global constants to named this way. You must be careful to not conflict with other global #defines and enum labels.
Example

    const int A_GLOBAL_CONSTANT= 5;

Static Variables

    * Static variables may be prepended with 's'. 

Justification

    * It's important to know the scope of a variable. 

Example

   class Test
   {
   public:
   private:
      static StatusInfo msStatus;
   }

Type Names

    * When possible for types based on native types make a typedef.
    * Typedef names should use the same naming policy as for a class with the word Type appended. 

Justification

    * Of all the different naming strategies many people found this one the best compromise.
    * Types are things so should use upper case letters. Type is appended to make it clear this is not a class. 

Example

   typedef uint16  ModuleType;
   typedef uint32  SystemType;

Enum Names
Labels All Upper Case with '_' Word Separators
This is the standard rule for enum labels.
Example

   enum PinStateType
   {
      PIN_OFF,
      PIN_ON
   };

Enums as Constants without Class Scoping
Sometimes people use enums as constants. When an enum is not embedded in a class make sure you use some sort of differentiating name before the label so as to prevent name clashes.
Example

   enum PinStateType            If PIN was not prepended a conflict 
   {                            would occur as OFF and ON are probably
      PIN_OFF,                  already defined.
      PIN_ON
   };

Enums with Class Scoping
Just name the enum items what you wish and always qualify with the class name: Aclass::PIN_OFF.
Make a Label for an Error State
It's often useful to be able to say an enum is not in any of its valid states. Make a label for an uninitialized or error state. Make it the first label if possible.
Example

enum { STATE_ERR,  STATE_OPEN, STATE_RUNNING, STATE_DYING};

#define and Macro Names

    * Put #defines and macros in all upper using '_' separators. 

Justification
This makes it very clear that the value is not alterable and in the case of macros, makes it clear that you are using a construct that requires care.

Some subtle errors can occur when macro names and enum labels use the same name.
Example

#define MAX(a,b) blah
#define IS_ERR(err) blah

C Function Names

    * In a C++ project there should be very few C functions.
    * For C functions use the GNU convention of all lower case letters with '_' as the word delimiter. 

Justification

    * It makes C functions very different from any C++ related names. 

Example

   int
   some_bloody_function()
   {
   }

C++ File Extensions
In short: Use the .h extension for header files and .cc for source files.

For some reason an odd split occurred in early C++ compilers around what C++ source files should be called. C header files always use the .h and C source files always use the .c extension. What should we use for C++?

The short answer is as long as everyone on your project agrees it doesn't really matter. The build environment should be able to invoke the right compiler for any extension. Historically speaking here have been the options:

    * Header Files: .h, .hh, .hpp
    * Source Files: .C, .cpp, .cc 

Header File Extension Discussion
Using .hh extension is not widely popular but makes a certain kind of sense. C header files use .h file extension and C++ based header files use .hh file extension. The problem is if we consider a header file an interface to a service then we can have a C interface to a service and C++ interface to the service in the same file. Using preprocessor directives this is possible and common. The recommendation is to stick with using the .h extension.

Source File Extension Discussion
The problem with the .C extension is that it is indistinguishable from the .c extensions in operating systems that aren't case sensitive. Yes, this is a UNIX vs. windows issue. Since it is a simple step aiding portability we won't use the .C extension. The .cpp extension is a little wordy. So the .cc extension wins by default.
```
