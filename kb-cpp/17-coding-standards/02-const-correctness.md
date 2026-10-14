---
type: reference
title: Const correctness
description: "C++ const-correctness: why it matters in large projects and how to apply const to variables, pointers and methods."
tags: [cpp, coding-standards, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.2"
---

# 17.2 Const correctness

[↑ Coding standards](/kb-cpp/17-coding-standards/README.md)

```text
"const-correctness" is a key concept in large scale software projects. Yet, to implement it thoroughly, one has to fully understand what const actually means. Oddly enough, this keyword has no less than three different meanings in C++. In this article I will explain each meaning and provide cues for coping with the baffling syntax. This discussion serves as the basis for future articles that will address const-correctness.
const objects

Declaring an object as const is a commitment made by the programmer that the program doesn't alter it subsequently. (Note that I'm using the term object in its wider sense, namely class objects and data variables.) A const definition (as opposed to a const declaration) must include a proper initializer. For example,

const int MAX_LINE=25;
const std::string address="203.178.156.66";
const char signage[15]="fire alarm";
const double in2cm = 2.54; 

const pointers

The second type of const refers to pointers. Declaring a pointer as const ensures that the program doesn't assign a new address to it afterwards. The object bound to such a pointer may be modified, though. For example,

int r=10, s=0;
int *const pci = &s; // pci is a const pointer to int
pci++; // error, can't modify a const pointer
pci= &r; // error
*pci=9; //OK 

const Member Functions

In addition to const objects and const pointers (which were originally introduced in C), C++ has a third type of const, namely const member functions. A class object's state consists of the values of its non-static data members. Declaring a member function as const ensures that that function doesn't change its object's state. You do that by appending const after the function's parameter list. For example,

class Student
{
public:
 double getAvg() const {return average;} //const member function
private:
 double average;
//...
};

Trying to modify a data member inside a const member function is an error:

int Student::getAvg() const
{
 average += 0.5; // compilation error
 return average; 
}

Complex Declarations

Because const can apply to both objects and pointers, and because its exact position in a declaration is flexible, even experienced programmers find const declarations of compound types confusing.

Consider the following example. Can you tell what the types of x and y are?

const char * x= "test";
char const * y= "another one";

x and y actually have the same type, namely "pointer to const char", in spite of the variation in the position of const. const may appear before or after a type name, without changing the declaration's meaning.

This free ordering rule isn't unique to const. Consider the position of the keywords long and unsigned in the following example:

int long n;
long int m; //same as above
unsigned long o;
long unsigned r; //same as above

Now consider the following const declaration:

char * const z= "test";

This time, the type of z is "const pointer to char". How does the compiler know that z is a const pointer, whereas x and y are not? More importantly, how can you distinguish between const pointers and pointers to const variables?

The secret lies in the location of const with respect to the asterisk. The sequence "* const" always indicates a const pointer. If, however, the const appears before the asterisk, then the object bound to the pointer is const. This brings us to yet another complexity.
const pointers of const objects

It's possible to combine const objects and const pointers in a single declaration. The result is a const pointer to a const object:

const int n=1;
const int * const p= &n; // const pointer to const int

Let's parse it together. p is a const pointer because its declaration contains the sequence "* const". It points to const int because declaration contains another const before the asterisk.

Is it possible to combine the three types of const in one declaration? Certainly:

class A
{
//...
const int * const get_scores(int id) const;
};

get_scores() is a const member function that returns a const pointer to const int.
operator const_cast<>

The operator const_cast<> removes the const quality of an object. Note that removing const-ness this doesn't mean that you can modify the resulting object. Consider:

const char *msg= "hello world";
int main() 
{
 char * s = const_cast <char *> (msg); // get rid of const
 strcpy(s, "bad idea!"); //undefined behavior
}

Any attempt to overwrite s will result in undefined behavior. The problem is that const objects may be stored in the system's read-only memory. A brute-force removal of const allows you to treat the object as if it weren't const, say passing it as an argument to a function that takes char *, but not to modify it.

const_cast<> performs the opposite operation as well, namely convert a non-const object to const. For example:

char s[]= "fasten your seatbelt";
size=strlen(const_cast<const char *> (s));// more explicit

You will rarely see such uses of const_cast<> though. C++ automatically converts non-const objects to const in a context that requires a const object. Therefore, using const_cast<> to make an object const is never mandatory, although it documents the programmer's intention explicitly.
Summary

The syntactic intricacies often cause programmers to give up the use of const, thereby producing code that is less secure and less readable. While the difference between pointers to const objects and const pointers is rather subtle, checking the position of the const qualifier with respect to the asterisk should resolve the ambiguity. const member functions are easily recognized by the presence of const after the parameter list.
Sample Chapters

"Object Engineering Techniques" By Richard Due is a sample chapter from Mentoring Object Technology Projects. This chapter discusses some of the common object-oriented design methods such as use case modeling and class-responsibility-collaboration (CRC) modeling.
Safari Books

Modern C++ Design: Generic Programming and Design Patterns Applied by Andrei Alexandrescu is an excellent guide to state-of-the-art C++ design. The books discusses powerful syntactic features such as partial template specialization along with guidelines for effective generic class design. 


	17.3
```
