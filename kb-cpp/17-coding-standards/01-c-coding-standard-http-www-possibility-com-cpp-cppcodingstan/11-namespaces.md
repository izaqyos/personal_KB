---
type: reference
title: Namespaces
description: "C++ coding standard: namespace guidelines, including unique namespace names and Boost include example."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1.11"
---

# 17.1.11. Namespaces

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
Create Unique Name Space Names
A namespace isn't of much use if it's not globally unique.

On way to make name spaces unique is to root tham at some naming

There are two basic strategies for naming: root that name at some naming authority, like the company name and division name. The Java convention is to use the inverse of the companys domain name for package names.

Personally that always seemed overkill to me, but does work in the large.

For internal packages just pick a short simple descriptive namespace that will likely prevent conflict within a project.

For externally visible code you'll probably need to the full domain style namespace just to be safe.

Don't Globally Define using
Don't place using namespace directive at global scope in a header file. This can cause lots of magic invisible conflicts that are hard to track. Keep using statements to implementation files.

For example, let's say I want to use boost's fabulous gregorian date library. In my class I want to return dates and use dates in methods. So my code ends up looking like:

#include "boost/date_time/gregorian/gregorian.hpp" //include all types plus i/o

 
class Calendar
{
public:
   boost::gregorian::date GetEventDate(void) const;
   void                   SetEventDate(boost::gregorian::date dateOfTheEvent);
};


Clearly these are long names and are noisy and are pain to use. So you are tempted to put at the top of you class file:

using namespace boost::gregorian;  // make namespace global for this file

This would mean you could just use "date" instead of "boost::gregorian::date". That's nice. But you can't do that. If you do you are making the decision for everyone who uses your class as well. They may have a conflict, "date" is a very common name afterall.

So, don't use using in you header file, but you can use it in your source file. Because it's your source file you can make the decision to use using to shorten up the names. This strategy preserves most of the convenience while being a good citizen.

Create Shortcut Names
You can use using to create aliases or shortcuts, that is names that are more convenient to access than long namespace names.

For example:

   namespace alias = a::very::long::namespace;
   class YourClass: public alias::TheirClass 
   { ... }

Clearly this makes code both harder to read and easier to read. The code is harder to read because you as a programmer have to compile the alias directive in your head and know what it means whenever it is used in the code.

The code is easier to read because it is less complex. Complex namespaces are distracting and confusing. Even with the additional cognitive load, using namespace alias make code a lot easier to read.
```
