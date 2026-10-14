---
type: reference
title: Classes
description: "Subsection 17.1.6 of C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html."
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.6"
---

# 17.1.6. Classes

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Naming Class Files
Class Definition in One File
Each class definition should be in its own file where each file is named directly after the class's name:

   ClassName.h

Implementation in One File
In general each class should be implemented in one source file:

   ClassName.cc   // or whatever the extension is: cpp, c++

But When it Gets Really Big...
If the source file gets too large or you want to avoid compiling templates all the time then add additional files named according to the following rule:

   ClassName_section.C

section is some name that identifies why the code is chunked together. The class name and section name are separated by '_'.

Class Layout
A common class layout is critical from a code comprehension point of view and for automatically generating documentation. C++ programmers, through a new set of tools, can enjoy the same level generated documentation Java programmers take for granted.

Class and Method Documentation
It is recommended a program like Doxygen be used to document C++ classes, method, variables, functions, and macros. The documentation can be extracted and put in places in a common area for all programmers to access. This saves programmers having to read through class headers. Documentation generation should be integrated with the build system where possible.

Template
Please use the following template when creating a new class.

/**  A one line description of the class.  
 *
 * #include "XX.h" <BR>
 * -llib 
 *
 * A longer description.
 *  
 * @see something
 */

#ifndef XX_h
#define XX_h

// SYSTEM INCLUDES
//

// PROJECT INCLUDES
//

// LOCAL INCLUDES
//

// FORWARD REFERENCES
//


class XX
{
public:
// LIFECYCLE

   /** Default constructor.
    */
   XX(void);


   /** Copy constructor.
    * 
    * @param from The value to copy to this object.
    */
   XX(const XX& from);


   /** Destructor.
    */
   ~XX(void);


// OPERATORS

   /** Assignment operator.
    *
    * @param from THe value to assign to this object.
    *
    * @return A reference to this object.
    */
   XX&                     operator=(const XX& from);  

// OPERATIONS                       
// ACCESS
// INQUIRY

protected:
private:
};

// INLINE METHODS
//

// EXTERNAL REFERENCES
//

#endif  // _XX_h_

Required Methods Placeholders
The template has placeholders for required methods . You can delete them or implement them.
Ordering is: public, protected, private
Notice that the public interface is placed first in the class, protected next, and private last. The reasons are:

    * programmers should care about a class's interface more than implementation
    * when programmers need to use a class they need the interface not the implementation 

It makes sense then to have the interface first. Placing implementation, the private section, first is a historical accident as the first examples used the private first layout. Over time emphasis has switched deemphasizing a class's interface over implementation details.
LIFECYCLE
The life cycle section is for methods that control the life cycle of an object. Typically these methods include constructors, destructors, and state machine methods.
OPERATORS
Place all operators in this section.
OPERATIONS
Place the bulk of a class's non access and inquiry method methods here. A programmer will look here for the meat of a class's interface.
ACCESS
Place attribute accessors here.
INQUIRY
These are the Is* methods. Whenever you have a question to ask about an object it can be asked via in Is method. For example: IsOpen() will indicate if the object is open. A good strategy is instead of making a lot of access methods you can turn them around to be questions about the object thus reducing the exposure of internal structure. Without the IsOpen() method we might have had to do: if (STATE_OPEN == State()) which is much uglier.

What should go in public/protected/private?
Public Section
Only put an object's interface in the public section. DO NOT expose any private data items in the public section. At least encapsulate access via access methods. Ideally your method interface should make most access methods unnecessary. Do not put data in the public interface.
Protected and Private Section
What should go into the protected section versus the private section is always a matter of debate.
All Protected
Some say there should be no private section and everything not in the public section should go in the protected section. After all, we should allow all our children to change anything they wish.

All Private
Another camp says by making the public interface virtual any derived class can change behavior without mucking with internals.

Wishy Washy
Rationally decide where elements should go and put them there. Not very helpful.
And the Winner Is...
Keeping everything all private seems the easiest approach. By making the public methods virtual flexibility is preserved.

Prototype Source File

#include "XX.h"  // class implemented


/////////////////////////////// PUBLIC ///////////////////////////////////////

//============================= LIFECYCLE ====================================

XX::XX()
{
}// XX

XX::XX(const XX&)
{
}// XX

XX::~XX()
{
}// ~XX


//============================= OPERATORS ====================================

XX& 
XX::operator=(const XX&);
{
   return *this;

}// =

//============================= OPERATIONS ===================================
//============================= ACESS      ===================================
//============================= INQUIRY    ===================================
/////////////////////////////// PROTECTED  ///////////////////////////////////

/////////////////////////////// PRIVATE    ///////////////////////////////////

Use Header File Guards
Include files should protect against multiple inclusion through the use of macros that "guard" the files.
When Not Using Namespces

#ifndef filename_h
#define filename_h

#endif 


The new line after the endif if is required by some compilers.

When Using Namespaces
If namespaces are used then to be completely safe:

#ifndef namespace_filename_h
#define namespace_filename_h

#endif 

   |1. Replace filename with the name of the file being guarded. This should usually be the name of class contained in the file. Use the exact class name. Some standards say use all upper case. This is a mistake because someone could actually name a class the same as yours but using all upper letters. If the files end up be included together one file will prevent the other from being included and you will be one very confused puppy. It has happened!

   |2. Most standards put a leading _ and trailing _. This is no longer valid as the C++ standard reserves leading _ to compiler writers.

   |3. When the include file is not for a class then the file name should be used as the guard name.

   |4. Compilers differ on how comments are handled on preprocessor directives. Historically many compilers have not accepted comments on preprocessor directives.

   |5. Historically many compilers require a new line after last endif.

Required Methods for a Class
To be good citizens almost all classes should implement the following methods. If you don't have to define and implement any of the "required" methods they should still be represented in your class definition as comments.

    * Default Constructor

      If your class needs a constructor, make sure to provide one. You need one if during the operation of the class it creates something or does something that needs to be undone when the object dies. This includes creating memory, opening file descriptors, opening transactions etc.

      If the default constructor is sufficient add a comment indicating that the compiler-generated version will be used.

      If your default constructor has one or more optional arguments, add a comment indicating that it still functions as the default constructor.

    * Virtual Destructor

      If your class is intended to be derived from by other classes then make the destructor virtual.

    * Copy Constructor

      If your class is copyable, either define a copy constructor and assignment operator or add a comment indicating that the compiler-generated versions will be used.

      If your class objects should not be copied, make the copy constructor and assignment operator private and don't define bodies for them. If you don't know whether the class objects should be copyable, then assume not unless and until the copy operations are needed.

    * Assignment Operator

      If your class is assignable, either define a assignment operator or add a comment indicating that the compiler-generated versions will be used.

      If your objects should not be assigned, make the assignment operator private and don't define bodies for them. If you don't know whether the class objects should be assignable, then assume not. 

Justification

    * Virtual destructors ensure objects will be completely destructed regardless of inheritance depth. You don't have to use a virtual destructor when:
          o You don't expect a class to have descendants.
          o The overhead of virtualness would be too much.
          o An object must have a certain data layout and size. 
    * A default constructor allows an object to be used in an array.
    * The copy constructor and assignment operator ensure an object is always properly constructed. 

The Law of The Big Three
A class with any of (destructor, assignment operator, copy constructor) generally needs all 3. For more information see http://www.parashift.com/c++-faq-lite/coding-standards.html#[25.9].
Example
The default class template with all required methods. An example using default values:

class Planet
{
public:
  /** The following is the default constructor if no arguments are supplied.
   */
  Planet(int radius= 5);
  
  // Use compiler-generated copy constructor, assignment, and destructor.
  // Planet(const Planet&);
  // Planet& operator=(const Planet&);
  // ~Planet();
};

Method Layout
The approach used is to place a comment block before each method that can be extracted by a tool and be made part of the class documentation. Here we'll use Doxygen which supports the Javadoc format. See the Doxygen documentation for a list of attributes supported by the document generator.

Method Header
Every parameter should be documented. Every return code should be documented. All exceptions should be documented. Use complete sentences when describing attributes. Make sure to think about what other resources developers may need and encode them in with the @see attributes.

  /** Assignment operator.
   * 
   *
   * @param val The value to assign to this object.
   * @exception LibaryException The explanation for the exception.
   * @return A reference to this object.
   */
   XX&                     operator=(XX& val);

Additional Sections
In addition to the standard attribute set, the following sections can be included in the documentation:

   |1. PRECONDITION
      Document what must have happened for the object to be in a state where the method can be called.

   |2. WARNING
      Document anything unusual users should know about this method.

   |3. LOCK REQUIRED
      Some methods require a semaphore be acquired before using the method. When this is the case use lock required and specify the name of the lock.

   |4. EXAMPLES
      Include exampes of how to use a method. A picture says a 1000 words, a good example answers a 1000 questions.

For example:

  /** Copy one string to another.
   *
   * PRECONDITION

   * REQUIRE(from != 0)
   * REQUIRE(to != 0)
   *
   * WARNING

   * The to buffer must be long enough to hold
   * the entire from buffer.
   *
   * EXAMPLES

   * 

   * strcpy(somebuf, "test")
   * 


   *
   * @param from The string to copy.
   * @param to The buffer to copy the string to.
   *
   * @return void
   */
   void  strcpy(const char* from, char* to); 

Common Exception Sections
If the same exceptions are being used in a number of methods, then the exceptions can be documented once in the class header and referred to from the method documentation.
```
