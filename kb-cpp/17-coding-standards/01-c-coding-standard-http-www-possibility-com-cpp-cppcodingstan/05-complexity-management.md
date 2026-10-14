---
type: reference
title: Complexity Management
description: "C++ Coding Standard on complexity management, including layering."
tags: [cpp, coding-standards, legacy, third-party, architecture]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.5"
---

# 17.1.5. Complexity Management

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Layering
Layering is the primary technique for reducing complexity in a system. A system should be divided into layers. Layers should communicate between adjacent layers using well defined interfaces. When a layer uses a non-adjacent layer then a layering violation has occurred.

A layering violation simply means we have dependency between layers that is not controlled by a well defined interface. When one of the layers changes code could break. We don't want code to break so we want layers to work only with other adjacent layers.

Sometimes we need to jump layers for performance reasons. This is fine, but we should know we are doing it and document appropriately.

Minimize Dependencies with Abstract Base Classes
One of the most important strategies in C++ is to remove dependencies among different subsystems. Abstract base classes (ABCs) are a solid technique for dependency removal.

An ABC is an abstraction of a common form such that it can be used to build more specific forms. An ABC is a common interface that is reusable across a broad range of similar classes. By specifying a common interface as long as a class conforming to that interface is used it doesn't really matter what is the type of the derived type. This breaks code dependencies. New classes, conforming to the interface, can be substituted in at will without breaking code. In C++ interfaces are specified by using base classes with virtual methods.

The above is a bit rambling because it's a hard idea to convey. So let's use an example: We are doing a GUI where things jump around on the screen. One approach is to do something like:

   class Frog
   {
   public:
      void Jump();
   }
   class Bean
   {
   public:
      void Jump();
   }

The GUI folks could instantiate each object and call the Jump method of each object. The Jump method of each object contains the implementation of jumping behavior for that type of object. Obviously frogs and beans jump differently even though both can jump.

Unfortunately the owner of Bean didn't like the word Jump so they changed the method name to Leap. This broke the code in the GUI and one whole week was lost.

Then someone wanted to see a horse jump so a Horse class was added:

   class Horse
   {
   public:
      void Jump();
   }

The GUI people had to change their code again to add Horse.

Then someone updated Horse so that its Jump behavior was slightly different. Unfortunately this caused a total recompile of the GUI code and they were pissed.

Someone got the bright idea of trying to remove all the above dependencies using abstract base classes. They made one base class that specified an interface for jumping things:

   class Jumpable
   {
   public:
      virtual void Jump() = 0;
   }

Jumpable is a base class because other classes need to derive from it so they can get Jumpable's interface. It's an abstract base class because one or more of its methods has the = 0 notation which means the method is a pure virtual method. Pure virtual methods must be implemented by derived classes. The compiler checks.

Not all methods in an ABC must be pure virtual, some may have an implementation. This is especially true when creating a base class encapsulating a process common to a lot of objects. For example, devices that must be opened, diagnostics run, booted, executed, and then closed on a certain event may create an ABC called Device that has a method called LifeCycle which calls all other methods in turn thus running through all phases of a device's life. Each device phase would have a pure virtual method in the base class requiring implementation by more specific devices. This way the process of using a device is made common but the specifics of a device are hidden behind a common interface.

Back to Jumpable. All the classes were changed to derive from Jumpable:

   class Frog : public Jumpable
   {
   public:
      virtual void Jump() { ... }
   }

   etc ...

We see an immediate benefit: we know all classes derived from Jumpable must have a Jump method. No one can go changing the name to Leap without the compiler complaining. One dependency broken.

Another benefit is that we can pass Jumpable objects to the GUI, not specific objects like Horse or Frog:

   class Gui
   {
   public:
      void MakeJump(Jumpable*);
   }

   Gui gui;
   Frog* pFrog= new Frog;
  
   gui.MakeJump(pFrog); 

Notice Gui doesn't even know it's making a frog jump, it just has a jumpable thing, that's all it cares about. When Gui calls the Jump method it will get the implementation for Frog's Jump method. Another dependency down. Gui doesn't have to know what kind of objects are jumping.

We also removed the recompile dependency. Because Gui doesn't contain any Frog objects it will not be recompiled when Frog changes.
Downside
Wow! Great stuff! Yes but there are a few downsides:
Overhead for Virtual Methods
Virtual methods have a space and time penalty. It's not huge, but should be considered in design.
Make Everything an ABC!
Sometimes people overdo it, making everything an ABC. The rule is make an ABC when you need one not when you might need one. It takes effort to design a good ABC, throwing in a virtual method doesn't an ABC make. Pick and choose your spots. When some process or some interface can be reused and people will actually make use of the reuse then make an ABC and don't look back.

Liskov's Substitution Principle (LSP)
This principle states:

   All classes derived from a base class should be interchangeable
   when used as a base class.

The idea is users of a class should be able to count on similar behavior from all classes that derive from a base class. No special code should be necessary to qualify an object before using it. If you think about it violating LSP is also violating the Open/Closed principle because the code would have to be modified every time a derived class was added. It's also related to dependency management using abstract base classes.

For example, if the Jump method of a Frog object implementing the Jumpable interface actually makes a call and orders pizza we can say its implementation is not in the spirit of Jump and probably all other objects implementing Jump. Before calling a Jump method a programmer would now have to check for the Frog type so it wouldn't screw up the system. We don't want this in programs. We want to use base classes and feel comfortable we will get consistent behaviour.

LSP is a very restrictive idea. It constrains implementors quite a bit. In general people support LSP and have LSP as a goal.

Open/Closed Principle
The Open/Closed principle states a class must be open and closed where:

    * open means a class has the ability to be extended.
    * closed means a class is closed for modifications other than extension. The idea is once a class has been approved for use having gone through code reviews, unit tests, and other qualifying procedures, you don't want to change the class very much, just extend it. 

The Open/Closed principle is a pitch for stability. A system is extended by adding new code not by changing already working code. Programmers often don't feel comfortable changing old code because it works! This principle just gives you an academic sounding justification for your fears :-)

In practice the Open/Closed principle simply means making good use of our old friends abstraction and polymorphism. Abstraction to factor out common processes and ideas. Inheritance to create an interface that must be adhered to by derived classes. In C++ we are talking about using abstract base classes . A lot.

Register/Dispatch Idiom
Another strategy for reducing dependencies in a system is the Register/Dispatch Idiom (RDI). RDI treats large grained occurrences in a system as events. Events are identified by some unique identifier. Objects in the system register with a dispatch system for events or classes of events it is interested in. Objects that are event sources send events into the dispatch system so the dispatch system can route events to consumers.

RDI separates producers and consumers on a distributed scale. Event producers and consumers don't have to know about each other at all. Consumers can drop out of the event stream by deregistering for events. New consumers can register for events at anytime. Event producers can drop out with no ill effect to event consumers, the consumer just won't get any more events. It is a good idea for producers to have an "I'm going down event" so consumers can react intelligently.

Logically the dispatch system is a central entity. The implementation however can be quite different. For a highly distributed system a truly centralized event dispatcher would be a performance bottleneck and a single point of failure. Think of event dispatchers as being a lot of different processes cast about on various machines for redundancy purposes. Event processors communicate amongst each other to distribute knowledge about event consumers and producers. Much like a routing protocol distributes routing information to its peers.

RDI works equally well in the small, in processes and single workstations. Parts of the system can register as event consumers and event producers making for a very flexible system. Complex decisions in a system are expressed as event registrations and deregistrations. No further level of cooperation required.

More expressive event filters can also be used. The above proposal filters events on some unique ID. Often you want events filtered on more complex criteria, much like a database query. For this to work the system has to understand all data formats. This is easy if you use a common format like attribute value pairs. Otherwise each filter needs code understanding packet formats. Compiling in filter code to each dispatcher is one approach. Creating a downloadable generic stack based filter language has been used with success on other projects, being both simple and efficient.

Delegation
Delegation is the idea of a method using another object's method to do the real work. In some sense the top layer method is a front for the other method. Delegation is a form of dependency breaking. The top layer method never has to change while it's implementation can change at will.

Delegation is an alternative to using inheritance for implementation purposes. One can use inheritance to define an interface and delegation to implement the interface.

Some people feel delegation is a more robust form of OO than using implementation inheritance. Delegation encourages the formation of abstract class interfaces and HASA relationships. Both of which encourage reuse and dependency breaking.
Example

   class TestTaker
   {
   public:
      void WriteDownAnswer()   { mPaidTestTaker.WriteDownAnswer(); } 
   private:
      PaidTestTaker  mPaidTestTaker;
   }

In this example a test taker delegates actually answering the question to a paid test taker. Not ethical but a definite example of delegation!

Follow the Law of Demeter
The Law of Demeter states (Wikipedia): An object A can request a service (call a method) of an object instance B, but object A cannot âreach throughâ object B to access yet another object to request its services. Doing so would mean that object A implicitly requires greater knowledge of object Bâs internal structure. Instead, Bâs class should be modified if necessary so that object A can simply make the request directly of object B, and then let object B propagate the request to any relevant subcomponents. If the law is followed, only object B knows its internal structure.
Justification
The purpose of this law is to break dependencies so implementations can change without breaking code. If an object wishes to remove one of its contained objects it won't be able to do so because some other object is using it. If instead the service was through an interface the object could change its implementation anytime without ill effect.
Caveat
As for most laws the Law of Demeter should be ignored in certain cases. If you have a really high level object that contains a lot of subobjects, like a car contains thousands of parts, it can get absurd to created a method in car for every access to a subobject.
Example

   class SunWorkstation
   {
   public:
      void          UpVolume(int amount) { mSound.Up(amount); }

      SoundCard     mSound;

   private:
      GraphicsCard  mGraphics;
   }

   SunWorksation sun;

   Do   : sun.UpVolume(1);
   Don't: sun.mSound.Up(1);


Design by Contract
The idea of design by contract is strongly related to LSP . A contract is a formal statement of what to expect from another party. In this case the contract is between pieces of code. An object and/or method states that it does X and you are supposed to believe it. For example, when you ask an object for its volume that's what you should get. And because volume is a verifiable attribute of a thing you could run a series of checks to verify volume is correct, that is, it satisfies its contract.

The contract is enforced in languages like Eiffel by pre and post condition statements that are actually part of the language. In other languages a bit of faith is needed.

Design by contract when coupled with language based verification mechanisms is a very powerful idea. It makes programming more like assembling spec'd parts.
Using Design by Contract

   |1. DO NOT PUT "REAL" CODE IN DBC CALLS.. Dbc calls should only test conditions. No code that can't be compiled out should be included in Dbc calls.
   |2. Every method should define its pre and post conditions.
   |3. Every class should define its invariants.
   |4. Callers are responsible for checking preconditions. An object may not and is not required to test for assertion violations.
   |5. Method pre-conditions should be documented in a method's interface documentation.
   |6. Pre-conditions can be weakened by derived classes.
   |7. Post-conditions can be strengthened by derived classes.
   |8. Every Class Should:
         |1. Develop its class invariants.
         |2. Code its invariants and call them in its operations.
         |3. Document its invariants in the class documentation. 
      Yes, this takes a lot of work, but high availibility is the system's __primary goal__, meeting this goal requires a lot of work and effort by each programmer.
   |9. Every Method Should:
         |1. Develop a list of exceptions.
         |2. Develop operation pre-conditions.
         |3. Develop operation post-conditions.
         |4. Code the exceptions, pre, and post conditions.
         |5. Document the exceptions, pre, and post conditions. 
      Yes, this takes a lot of work, but high availibility is the system's __primary goal__, meeting this goal requires a lot of work and effort by each programmer. 
```
