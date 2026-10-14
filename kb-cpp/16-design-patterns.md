---
type: reference
title: Design patterns
description: Section 16 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#16"
---

# Design patterns

[↑ kb-cpp](/kb-cpp/README.md)

## 16.1 Singelton

### 16.1.1 First example

```text
Singleton Pattern & its implementation with C++
Singleton is one of the commonly used patterns in object oriented developments. In this article I am discussing abt this pattern in general and how we can implement this pattern with C++.
Introduction

Suppose we have to use a single object of a class throughout the lifetime of an application. In C++, it is possible to declare a global object, which can be used anywhere inside the program. But a good object oriented design strictly prohibits the use of global variables or methods, since they are against the fundamental principles of object orientation like data encapsulation or data hiding. More over, most latest object oriented programming languages like JAVA or C# do not support global variables or functions.

Another practical solution to get a single object is by declaring a class, which contains only static methods. A static class is loaded into memory when the execution of the program starts and it remains there till the application ends. Remember that for invoking a static method of a class, it is not necessary to create an instance of the class. But remember that a class with only static methods and variables are not a good object oriented design. A class of static methods unfortunately breaks down to a list of functions or utilities.

When we want to create only one instance of a class in a truly object oriented fashion by adhering to the basic principles of object oriented programming, the Singleton patterns are used. The Singleton Pattern comes under that classification of Creational Pattern, which deals with the best ways to create objects. The Singleton Design pattern is used, where only one instance of an object is needed throughout the lifetime of an application. The Singleton class is instantiated at the time of first access and same instance is used thereafter till the application quits.

There are very good non-software examples available in real world for Singleton patterns. The office of the Principal of my college is a Singleton. The University specifies the means by which a principal is selected, limits the term of office, and defines the order of succession. As a result, there can be at most one active principal at any given time. Regardless of the personal identity of the principal, the title, "The Principal" is a global point of access that identifies the person in the office.

The Singletons are often used to control access to resources such as database connections or sockets. Suppose we have a license for only one connection for our database. A Singleton connection object makes sure that only one connection can be made at any time.

It is pretty easy to implement the Singleton Pattern in any object oriented programming languages like C++, JAVA or C#. There are lots of different ways to implement the Singleton Pattern. But by using a private constructor and a static method to create and return an instance of the class is a popular way for implementing Singleton Pattern. The UML representation of a Singleton Pattern is shown below.

C++ Implementation

/*
Creational Pattern: SINGLETON
Author: Rajesh V.S
Language: C++
Email: rajeshvs@msn.com
*/

#include <iostream>


using namespace std;

class Singleton
{
private:
    static bool instanceFlag;
    static Singleton *single;
    Singleton()
    {
        //private constructor

    }
public:
    static Singleton* getInstance();
    void method();
    ~Singleton()
    {
        instanceFlag = false;
    }
};

bool Singleton::instanceFlag = false;
Singleton* Singleton::single = NULL;
Singleton* Singleton::getInstance()
{
    if(! instanceFlag)
    {
        single = new Singleton();
        instanceFlag = true;
        return single;
    }
    else
    {
        return single;
    }
}

void Singleton::method()
{
    cout << "Method of the singleton class" << endl;
}

int main()
{
    Singleton *sc1,*sc2;
    sc1 = Singleton::getInstance();
    sc1->method();
    sc2 = Singleton::getInstance();
    sc2->method();

    return 0;
}
```

### 16.1.2 2nd example

```text
Introduction

In the course of developing software applications, repetitive patterns emerge as the application is developed. As whole software systems are developed, many of these same patterns become evident at scale.

This concept of repetitive pattern is evident in other applications. One such application is automobile manufacturing. Many different automobile models share the same sub-assemblies from the most basic components, such as light bulbs and fasteners, to larger assemblies, such as chassis and engines.

In homebuilding, the repetitive pattern concept applies to screws and nails as well as to whole building electrical distribution systems. Whether a team is assembled to create a new automobile or a new building design, it usually does not have to ponder problems that were solved before. If a team assigned to design and build a house had to rethink and design every single component of the house, the whole process would take much longer than it currently does. Design decisions such as the height of a door or the function of a light switch are well understood. A house designer does not have to redesign and reconstruct a different type of device to deliver and collect water in order to meet a requirement to supply hand washing functionality to different parts of the house: a standard sink, as well as a standard interface of hot and cold water inputs and drain water output, are well understood components of house construction. The repetitive pattern concept can be applied over and over to nearly everything we surround ourselves with, including software.

The automobile and homebuilding examples help visualize some general abstract concepts in software design and construction. The concept of well-defined general purpose units of functionality that are well understood is the motivation for design patterns and the focus of two other design pattern articles, Exploring the Factory Design Pattern and Exploring the Observer Design Pattern. These patterns cover nearly every aspect of object-oriented software design including object creation, object interaction, and object lifetime. For the scope of this article, we are going to discuss the Singleton pattern, which lives in a family of creational patterns.

Creational patterns dictate how and when objects get created. Many instances require special behavior that can only be solved though creational techniques, rather than trying to force a desired behavior after an instance is created. One of the best examples of this type of behavioral requirement is contained in the Singleton pattern. The Singleton pattern was formally defined in the classic reference, Design Patterns: Elements of Reusable Software by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides (also known as the Gang of Four, or GoF). This pattern is one of the least complicated, as well as most popular, in Design Patterns. However, as we will see, there can be problems with implementing this pattern. This article attempts to examine the Singleton pattern from its beginning though various early implementations, as well as how to best use it in MicrosoftÂ® .NET application development.
Singleton Pattern

The intent of the Singleton pattern as defined in Design Patterns is to "ensure a class has only one instance, and provide a global point of access to it".

What problem does this solve, or put another way, what is our motivation to use it? In nearly every application, there is a need to have an area from which to globally access and maintain some type of data. There are also cases in object-oriented (OO) systems where there should be only one class, or a predefined number of instances of a class, running at any given time. For example, when a class is being used to maintain an incremental counter, the simple counter class needs to keep track of an integer value that is being used in multiple areas of an application. The class needs to be able to increment this counter as well as return the current value. For this situation, the desired class behavior would be to have exactly one instance of a class that maintains the integer and nothing more.

At first glance, one might be tempted to create an instance of a counter class as a just a static global variable. This is a common technique but really only solves part of the problem; it solves the problem of global accessibility, but does nothing to ensure that there is only one instance of the class running at any given time. The responsibility of having only one instance of the class should fall on the class itself and not on the user of the class. The users of the class should always be free from having to monitor and control the number of running instances of the class.

What is needed is a way to control how class instances are created and then ensure that only one gets created at any given time. This would give us exactly the behavior we require and free a client from having to know any class details.
Logical Model

The model for a singleton is very straightforward. There is (usually) only one singleton instance. Clients access the singleton instance through one well-known access point. The client in this case is an object that needs access to a sole instance of a singleton. Figure 1 shows this relationship graphically.

Ee817670.singletondespatt01(en-us,PandP.10).gif

Figure 1. Singleton pattern logical model
Physical Model

The physical model for the Singleton pattern is also very simple. However, there are several slightly different ways that singletons have been implemented over time. Let's look at the original GoF singleton implementation. Figure 2 shows a UML model of the original Singleton pattern as defined in Design Patterns.

Ee817670.singletondespatt02(en-us,PandP.10).gif

Figure 2. Singleton pattern physical model from design patterns

What we see is a simple class diagram showing that there is a private static property of a singleton object as well as public method Instance() that returns this same property. This is really the core of what makes a singleton. The other properties and methods are there to show additional operations that may be allowed on the class. For the purpose of this discussion, let's focus on the instance property and method.

Clients access any instance of a singleton only through the Instance method. How the instance gets created is not defined here. What we also want to be able to do is control how and when an instance will get created. In OO development, special object creation behavior is generally best handled in the constructor for a class. This case is no different. What we can do is define when and how we construct a class instance and then keep any client from calling the constructor directly. This is the approach always used for singleton construction. Let's look at the original example from Design Patterns. The C++ Singleton Sample Implementation Code example shown below is generally considered the default implementation for a singleton. This sample has been ported to many other programming languages and generally exists everywhere in very near this same form.
C++ Singleton Sample Implementation Code

// Declaration
class Singleton {
public: 
    static Singleton* Instance();
protected: 
    Singleton();
private:
    static Singleton* _instance;
}

// Implementation 
Singleton* Singleton::_instance = 0;

Singleton* Singleton::Instance() {
    if (_instance == 0) {
        _instance = new Singleton;
    }
    return _instance;
}

Letâs examine this code for a moment. This simple class has one member variable and that is a pointer to itself. Notice that the constructor is protected and that the only public method is the Instance method. In the implementation of the Instance method, there is a control block (if) that checks to see if the member variable has been initialized, and if not creates a new instance. This lazy initialization in the control block means that the Singleton instance is initialized, or created, only on the first call to the Instance() method. For many applications, this approach works just fine. But, for multithreaded applications, this approach proves to have a potentially hazardous side effect. If two threads manage to enter the control block at the same time, two instances of the member variable could be created. To solve this, you might be tempted to merely place a critical section around the control block in order to guarantee thread safety. If you do this, then all calls to the Instance method would be serialized and could have a very negative impact on performance, depending on the application. It is for this reason that another version of this pattern was created that uses something called a double-check mechanism. The next code sample shows an example of a double-check lock using Java syntax.
		16.1.3
	16.2
```
