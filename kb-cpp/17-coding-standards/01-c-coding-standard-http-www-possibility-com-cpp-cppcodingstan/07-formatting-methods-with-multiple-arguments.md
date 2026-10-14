---
type: reference
title: Formatting Methods with Multiple Arguments
description: "Subsection 17.1.8 of C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html."
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.8"
---

# 17.1.8. Formatting Methods with Multiple Arguments

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
We should try and make methods have as few parameters as possible. If you find yourself passing the same variables to every method then that variable should probably be part of the class. When a method does have a lot of parameters format it like this:

   int                     AnyMethod(
                              int   arg1,  
                              int   arg2, 
                              int   arg3,
                              int   arg4);

Different Accessor Styles
Why Accessors?
Access methods provide access to the physical or logical attributes of an object. Accessing an object's attributes directly as we do for C structures is greatly discouraged in C++. We disallow direct access to attributes to break dependencies, the reason we do most things. Directly accessing an attribute exposes implementation details about the object.

To see why ask yourself:

    * What if the object decided to provide the attribute in a way other than physical containment?
    * What if it had to do a database lookup for the attribute?
    * What if a different object now contained the attribute? 

If any of the above changed code would break. An object makes a contract with the user to provide access to a particular attribute; it should not promise how it gets those attributes. Accessing a physical attribute makes such a promise.
Accessors Considered Somewhat Harmful
At least in the public interface having accessors many times is an admission of failure, a failure to make an object's interface complete. At the protected or private level accessors are fine as these are the implementation levels of a class.
Implementing Accessors
There are three major idioms for creating accessors.
Get/Set

   class X
   {
   public:
      int    GetAge() const     { return mAge; }
      void   SetAge(int age)    { mAge= age; }
   private:
      int mAge;
   }

The problem with Get/Set is twofold:

    * It's ugly. Get and Set are strewn throughout the code cluttering it up.
    * It doesn't treat attributes as objects in their own right. An object will have an assignment operator. Why shouldn't age be an object and have its own assignment operator? 

One benefit, that it shares with the One Method Name, is when used with messages the set method can transparently transform from native machine representations to network byte order.
One Method Name

   class X
   {
   public:
      int    Age() const     { return mAge; }
      void   Age(int age)    { mAge= age; }
   private:
      int mAge;
   }

Similar to Get/Set but cleaner. Use this approach when not using the Attributes as Objects approach.
Attributes as Objects

   class X
   {
   public:
      int              Age() const     { return mAge; }
      int&             rAge()          { return mAge; } 

      const String&    Name() const    { return mName; }
      String&          rName()         { return mName; }
   private:
      int              mAge;
      String           mName;
   }

The above two attribute examples shows the strength and weakness of the Attributes as Objects approach.

When using an int type, which is not a real object, the int is set directly because rAge() returns a reference. The object can do no checking of the value or do any representation reformatting. For many simple attributes, however, these are not horrible restrictions. A way around this problem is to use a class wrapper around base types like int.

When an object is returned as reference its = operator is invoked to complete the assignment. For example:

   X x;
   x.rName()= "test";

This approach is also more consistent with the object philosophy: the object should do it. An object's = operator can do all the checks for the assignment and it's done once in one place, in the object, where it belongs. It's also clean from a name perspective.

When possible use this approach to attribute access.

Init Idiom for Initializing Objects

    * Objects with multiple constructors and/or multiple attributes should define a private Init() method to initialize all attributes. If the number of different member variables is small then this idiom may not be a big win and C++'s constructor initialization syntax can/should be used. 

Justification

    * When using C++'s ability to initialize variables in the constructor it's difficult with multiple constructors and/or multiple attributes to make sure all attributes are initialized. When an attribute is added or changed almost invariably we'll miss changing a constructor.

      It's better to define one method, Init(), that initializes all possible attributes. Init() should be called first from every constructor.

    * The Init() idiom cannot be used in two cases where initialization from a constructor is required:
          o constructing a member object
          o initializing a member attribute that is a reference 

Example

   class Test
   {
   public:
      Test()
      {
         Init();   // Call to common object initializer
      }

      Test(int val)
      {
         Init();   // Call to common object initializer
         mVal= val;
      }

   private:
      int      mVal;
      String*  mpName;

      void Init()
      {
         mVal  = 0;
         mpName= 0;
      }
   }

Since the number of member variables is small, this might be better
written as:

   class Test 
   {
   public:
     Test(int val = 0, String* name = 0)
       : mVal(val), mpName(name) {}
   private:
     int         mVal;
     String*     mpName;
   };

Initialize all Variables

    * You shall always initialize variables. Always. Every time. 

Justification

    * More problems than you can believe are eventually traced back to a pointer or variable left uninitialized. C++ tends to encourage this by spreading initialization to each constructor. See Init Idiom for Initializing Objects . 

Minimize Inlines
Minimize inlining in declarations or inlining in general. As soon as you put your C++ code in a shared library which you want to maintain compatibility with in the future, inlined code is a major pain in the butt. It's not worth it, for most cases.

Think About What Work to do in Constructors
Should you do work that can fail in constructors? If you have a compiler that does not support exceptions (or thread safe exceptions if it matters to you) then the answer is definitely no. Go directly to Do Work in Open. If your compiler supports exception then go to Do Work in Constructor. There are still reasons to use an Open method even with exceptions.
Use Open Reasons

   |1. It is difficult to write exception safe code in constructor. It's possible to throw an exception and not destruct objects allocated in the constructor. Use of auto_ptr can help prevent this problem.
   |2. Some compilers do not support thread safe exceptions on all platforms.
   |3. Virtual methods are not available in base classes. If the base class is expecting a virtual method implemented by derived classes to be available during construction then initialization must follow construction. This is common in frameworks.
   |4. Larger scale state machines may dictate when initialization should occur. An object may contain numerous other objects that may have complex initialization conditions. In this case we could wait to construct objects but then we always have to worry about null pointers.
   |5. If deletion is needed to free resources we still may want to keep the state around for debugging or statistics or as a supplier of information for other objects. 

Do Work in Constructor
With exceptions work done in the constructor can signal failure so it is fine to perform real work in the constructor. This is the guru endorced approach as a matter of fact. But there are reasons to still use an open style approach.

The constructor code must still be very careful not to leak resources in the constructor. It's possible to throw an exception and not destruct objects allocated in the constructor.

There is a pattern called Resource Acquisition as Initialization that says all initialization is performed in the constructor and released in the destructor. The idea is that this is a safer approach because it should reduce resource leaks.

Do Work in Open
Do not do any real work in an object's constructor. Inside a constructor initialize variables only and/or do only actions that can't fail.

Create an Open() method for an object which completes construction. Open() should be called after object instantiation.
Example

   class Device
   {
   public:
      Device()    { /* initialize and other stuff */ }
      int Open()  { return FAIL; }
   };

   Device dev;
   if (FAIL == dev.Open()) exit(1);

Don't Over Use Operators
C++ allows the overloading of all kinds of weird operators. Unless you are building a class directly related to math there are very few operators you should override. Only override an operator when the semantics will be clear to users.
Justification

    * Very few people will have the same intuition as you about what a particular operator will do. 

Thin vs. Thick Class Interfaces
How many methods should an object have? The right answer of course is just the right amount, we'll call this the Goldilocks level. But what is the Goldilocks level? It doesn't exist. You need to make the right judgment for your situation, which is really what programmers are for :-)

The two extremes are thin classes versus thick classes. Thin classes are minimalist classes. Thin classes have as few methods as possible. The expectation is users will derive their own class from the thin class adding any needed methods.

While thin classes may seem "clean" they really aren't. You can't do much with a thin class. Its main purpose is setting up a type. Since thin classes have so little functionality many programmers in a project will create derived classes with everyone adding basically the same methods. This leads to code duplication and maintenance problems which is part of the reason we use objects in the first place. The obvious solution is to push methods up to the base class. Push enough methods up to the base class and you get thick classes.

Thick classes have a lot of methods. If you can think of it a thick class will have it. Why is this a problem? It may not be. If the methods are directly related to the class then there's no real problem with the class containing them. The problem is people get lazy and start adding methods to a class that are related to the class in some willow wispy way, but would be better factored out into another class. Judgment comes into play again.

Thick classes have other problems. As classes get larger they may become harder to understand. They also become harder to debug as interactions become less predictable. And when a method is changed that you don't use or care about your code will still have to be recompiled, possibly retested, and rereleased.

Short Methods

    * Methods should limit themselves to a single page of code. 

Justification

    * The idea is that the each method represents a technique for achieving a single objective.
    * Most arguments of inefficiency turn out to be false in the long run.
    * True function calls are slower than not, but there needs to a thought out decision (see premature optimization). 

In a Source file Indicate if a Method is Static or Virtual
In a source file you can't tell a method is static or virtual because this information is in the header file. Knowing this information in a source file is useful and can be communicated using comments:

/*virtual*/ void
Class::method()
{
}

/*static*/ void
Class::method()
{
}

I've only seen this format once in source code, but it is interesting enough that I thought I would include here for your consideration. Notice how the method name sits alone on its own line. This looks more like C code and looks very clean for some reason.
```
