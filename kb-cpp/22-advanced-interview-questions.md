---
type: reference
title: Advanced Interview questions
description: Section 23 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#23"
---

# Advanced Interview questions

[↑ kb-cpp](/kb-cpp/README.md)

## 23.1 Advanced C++ and STL interview questions

```text
Q: How do you link a C++ program to C functions?

A: By using the extern "C" linkage specification around the C function declarations.

Q: Explain the scope resolution operator.

A: It permits a program to reference an identifier in the global scope that has been hidden by another identifier with the same name in the local scope.

Q: What are the differences between a C++ struct and C++ class?

A: The default member and base-class access specifiers are different.

Q: How many ways are there to initialize an int with a constant?

A: Two.

There are two formats for initializers in C++ as shown in the example that follows. The first format uses the traditional C notation. The second format uses constructor notation.

int foo = 123;

int bar (123);

Q: How does throwing and catching exceptions differ from using setjmp and longjmp?

A: The throw operation calls the destructors for automatic objects instantiated since entry to the try block.

Q: What is your reaction to this line of code?

delete this;

A: It’s not a good practice.

Q: What is a default constructor?

A: A constructor that has no arguments.

Q: What is a conversion constructor?

A: A constructor that accepts one argument of a different type.

Q: What is the difference between a copy constructor and an overloaded assignment operator?

A: A copy constructor constructs a new object by using the content of the argument object. An overloaded assignment operator assigns the contents of an existing object to another existing object of the same class.

Q: When should you use multiple inheritance?

A: There are three acceptable answers: "Never," "Rarely," and "When the problem domain cannot be accurately modeled any other way."

Q: What is a virtual destructor?

A: The simple answer is that a virtual destructor is one that is declared with the virtual attribute.

Q: Explain the ISA and HASA class relationships. How would you implement each in a class design?

A: A specialized class "is" a specialization of another class and, therefore, has the ISA relationship with the other class. An Employee ISA Person. This relationship is best implemented with inheritance. Employee is derived from Person. A class may have an instance of another class. For example, an employee "has" a salary, therefore the Employee class has the HASA relationship with the Salary class. This relationship is best implemented by embedding an object of the Salary class in the Employee class.

Q: When is a template a better solution than a base class?

A: When you are designing a generic class to contain or otherwise manage objects of other types, when the format and behavior of those other types are unimportant to their containment or management, and particularly when those other types are unknown (thus, the genericity) to the designer of the container or manager class.

Q: What is a mutable member?

A: One that can be modified by the class even when the object of the class or the member function doing the modification is const.

Q: What is an explicit constructor?

A: A conversion constructor declared with the explicit keyword. The compiler does not use an explicit constructor to implement an implied conversion of types. It’s purpose is reserved explicitly for construction.

Q: What is the Standard Template Library?

A: A library of container templates approved by the ANSI committee for inclusion in the standard C++ specification.

A programmer who then launches into a discussion of the generic programming model, iterators, allocators, algorithms, and such, has a higher than average understanding of the new technology that STL brings to C++ programming.

Q: Describe run-time type identification.

A: The ability to determine at run time the type of an object by using the typeid operator or the dynamic_cast operator.

Q: What problem does the namespace feature solve?

A: Multiple providers of libraries might use common global identifiers causing a name collision when an application tries to link with two or more such libraries. The namespace feature surrounds a library’s external declarations with a unique namespace that eliminates the potential for those collisions.

This solution assumes that two library vendors don’t use the same namespace identifier, of course.

Q: Are there any new intrinsic (built-in) data types?

A: Yes. The ANSI committee added the bool intrinsic type and its true and false value keywords. 
```

## 23.2 http://www.devbistro.com/tech-interview-questions/Cplusplus.jsp

```text
Q: Write a short code using C++ to print out all odd number from 1 to 100 using a for loop(Asked by Intacct.com people)

for( unsigned int i = 1; i < = 100; i++ )
    if( i & 0x00000001 )
        cout << i<<\",\";
ISO layers and what layer is the IP operated from?( Asked by Cisco system people)

Application, Presentation, Session, Transport, Network, Data link and Physical. The IP is operated in the Network layer.

Q: Write a program that ask for user input from 5 to 9 then calculate the average( Asked by Cisco system people)

A.int main()
{
int MAX=4; 
int total =0; 
int average=0; 
int numb;
cout<<"Please enter your input from 5 to 9";
cin>>numb; 
if((numb <5)&&(numb>9)) 
cout<<"please re type your input"; 
else 
for(i=0;i<=MAX; i++)
{
total = total + numb; 
average= total /MAX;
} 
cout<<"The average number is"<<average<<endl;

return 0; 
}

Q: Can you be able to identify between Straight- through and Cross- over cable wiring? and in what case do you use Straight- through and Cross-over? (Asked by Cisco system people)

A. Straight-through is type of wiring that is one to to one connection Cross- over is type of wiring which those wires are got switched

We use Straight-through cable when we connect between NIC Adapter and Hub. Using Cross-over cable when connect between two NIC Adapters or sometime between two hubs.

Q: If you hear the CPU fan is running and the monitor power is still on, but you did not see any thing show up in the monitor screen. What would you do to find out what is going wrong? (Asked by WNI people)

A. I would use the ping command to check whether the machine is still alive(connect to the network) or it is dead.



 How do you write a function that can reverse a linked-list? (Cisco System)

void reverselist(void)
{
	if(head==0)
		return;
	if(head->next==0)
		return;
	if(head->next==tail)
	{
		head->next = 0;
		tail->next = head;
	}
	else
	{
		node* pre = head;
		node* cur = head->next;
		node* curnext = cur->next;
		head->next = 0;
		cur->next = head;
		for(; curnext!=0; )
		{
			cur->next = pre;
			pre = cur;
			cur = curnext;
			curnext = curnext->next;
		}
		curnext->next = cur;
	}
}
What is polymorphism?

Polymorphism is the idea that a base class can be inherited by several classes. A base class pointer can point to its child class and a base class array can store different child class objects.

How do you find out if a linked-list has an end? (i.e. the list is not a cycle)

You can find out by using 2 pointers. One of them goes 2 nodes each time. The second one goes at 1 nodes each time. If there is a cycle, the one that goes 2 nodes each time will eventually meet the one that goes slower. If that is the case, then you will know the linked-list is a cycle.

How can you tell what shell you are running on UNIX system?

You can do the Echo $RANDOM. It will return a undefined variable if you are from the C-Shell, just a return prompt if you are from the Bourne shell, and a 5 digit random numbers if you are from the Korn shell. You could also do a ps -l and look for the shell with the highest PID.

What is Boyce Codd Normal form?

A relation schema R is in BCNF with respect to a set F of functional dependencies if for all functional dependencies in F+ of the form a->b, where a and b is a subset of R, at least one of the following holds:

a->b is a trivial functional dependency (b is a subset of a)
a is a superkey for schema R


Q1: Tell how to check whether a linked list is circular.

A: Create two pointers, each set to the start of the list. Update each as follows:

while (pointer1) {
 pointer1 = pointer1->next;
 pointer2 = pointer2->next; if (pointer2) pointer2=pointer2->next;
 if (pointer1 == pointer2) {
   print (\"circular\n\");
 }
}
Q2: OK, why does this work?
If a list is circular, at some point pointer2 will wrap around and be either at the item just before pointer1, or the item before that. Either way, it’s either 1 or 2 jumps until they meet.

How can you quickly find the number of elements stored in a a) static array b) dynamic array ?

Why is it difficult to store linked list in an array?

How can you find the nodes with repetetive data in a linked list?

Write a prog to accept a given string in any order and flash error if any of the character is different. For example : If abc is the input then abc, bca, cba, cab bac are acceptable but aac or bcd are unacceptable.

This is a C question that I had for an intern position at Microsoft: Write out a function that prints out all the permutations of a string. For example, abc would give you abc, acb, bac, bca, cab, cba. You can assume that all the characters will be unique. After I wrote out my function, he asked me to figure out from the code how many times the printf statement is run, and also questions on optimizing my algorithm.

What’s the output of the following program? Why?

#include <stdio.h>
main()
{
	typedef union
	{
		int a;
		char b[10];
		float c;
	}
	Union;
	
	Union x,y = {100};
	x.a = 50;
	strcpy(x.b,\"hello\");
	x.c = 21.50;
	
	printf(\"Union x : %d %s %f \n\",x.a,x.b,x.c );
	printf(\"Union y :%d %s%f \n\",y.a,y.b,y.c);
}
Given inputs X, Y, Z and operations | and & (meaning bitwise OR and AND, respectively)

What is output equal to in
output = (X & Y) | (X & Z) | (Y & Z)

^Back to Top
++ gamedev interview questions

This set of questions came from a prominent gaming company. As you can see, the answers are not given (the interviews are typically conducted by senior developers), but there’s a set of notes with common mistakes to avoid.

Explain which of the following declarations will compile and what will be constant - a pointer or the value pointed at:
const char *
char const *
char * const
Note: Ask the candidate whether the first declaration is pointing to a string or a single character. Both explanations are correct, but if he says that it’s a single character pointer, ask why a whole string is initialized as char* in C++. If he says this is a string declaration, ask him to declare a pointer to a single character. Competent candidates should not have problems pointing out why const char* can be both a character and a string declaration, incompetent ones will come up with invalid reasons.
You’re given a simple code for the class BankCustomer. Write the following functions:
Copy constructor
= operator overload
== operator overload
+ operator overload (customers’ balances should be added up, as an example of joint account between husband and wife)
Note:Anyone confusing assignment and equality operators should be dismissed from the interview. The applicant might make a mistake of passing by value, not by reference. The candidate might also want to return a pointer, not a new object, from the addition operator. Slightly hint that you’d like the value to be changed outside the function, too, in the first case. Ask him whether the statement customer3 = customer1 + customer2 would work in the second case.

What problems might the following macro bring to the application?
#define sq(x) x*x

Consider the following struct declarations:
struct A { A(){ cout << \"A\"; } };
struct B { B(){ cout << \"B\"; } };
struct C { C(){ cout << \"C\"; } };
struct D { D(){ cout << \"D\"; } };
struct E : D { E(){ cout << \"E\"; } };
struct F : A, B
{
	C c;
	D d;
	E e;
	F() : B(), A(),d(),c(),e() { cout << \"F\"; }
};
What constructors will be called when an instance of F is initialized? Produce the program output when this happens.

Anything wrong with this code?
T *p = new T[10];
delete p;
	
Note: Incorrect replies: “No, everything is correct”, “Only the first element of the array will be deleted”, “The entire array will be deleted, but only the first element destructor will be called”.

Anything wrong with this code?
T *p = 0;
delete p;
Note: Typical wrong answer: Yes, the program will crash in an attempt to delete a null pointer. The candidate does not understand pointers. A very smart candidate will ask whether delete is overloaded for the class T.

Explain virtual inheritance. Draw the diagram explaining the initialization of the base class when virtual inheritance is used.
Note: Typical mistake for applicant is to draw an inheritance diagram, where a single base class is inherited with virtual methods. Explain to the candidate that this is not virtual inheritance. Ask them for the classic definition of virtual inheritance. Such question might be too complex for a beginning or even intermediate developer, but any applicant with advanced C++ experience should be somewhat familiar with the concept, even though he’ll probably say he’d avoid using it in a real project. Moreover, even the experienced developers, who know about virtual inheritance, cannot coherently explain the initialization process. If you find a candidate that knows both the concept and the initialization process well, he’s hired.
What’s potentially wrong with the following code?

long value;
//some stuff
value &= 0xFFFF;
Note: Hint to the candidate about the base platform they’re developing for. If the person still doesn’t find anything wrong with the code, they are not experienced with C++.

What does the following code do and why would anyone write something like that?
void send (int *to, int * from, int count)
{
	int n = (count + 7) / 8;
	switch ( count  %  8)
	{
		case 0: do { *to++ = *from++;
		case 7: *to++ = *from++;
		case 6: *to++ = *from++;
		case 5: *to++ = *from++;
		case 4: *to++ = *from++;
		case 3: *to++ = *from++;
		case 2: *to++ = *from++;
		case 1: *to++ = *from++;
		} while ( --n > 0 );
	}
}
In the H file you see the following declaration:
class Foo {
void Bar( void ) const ;
};
Tell me all you know about the Bar() function.
```

## 23.3 http://www.decompile.com/interview/C%2B%2B_Interview_Questions_Page_02.htm

```text
C++ Language-specific Questions
by Curtis Krauskopf
Language-specific questions typically test your ability to understand why a certain rule exists in the language rather than simply knowing that a rule exists.


Programmers who recently learned C++ using a book such as Teach Yourself C++ in 24 Hours will have difficulty knowing the nuances of the C++ language.

Interviewers are interested in testing candidates for a depth of knowledge in the topic. The interviewer will also expect you to know these topics off the top-of-your-head because these basic facts should form the foundation of your C++ knowledge.

An array is instantiated with the new[] operator. Is it sufficient to delete the array using a delete operator or should a delete[] operator be used? Justify your answer.

Can I drop the [] when deleting an array of some built-in type (char, int, etc)?

What is an example of when a destructor is NOT called at the end of scope?

Explain stack unwinding.

When I write a derived class's destructor, do I need to explicitly call the destructor for my base class?

Explain the difference between a class and an object.

Explain the difference between a struct and a class.

What is difference between malloc/free and new/delete?

	
C++ Language Definition and Acronym Questions
by Curtis Krauskopf
Provide the definitions of each of these words or phrases. For the words that are C++ keywords, describe all of the ways that the keyword could be used.

What is polymorphism?
What is a virtual keyword used for?
What is the mutable keyword used for?
What is the explicit keyword used for?
What is template metaprogramming?
What do the public, private and protected keywords mean? 
What is the static keyword used for?
What is an assignment operator?
What is a dangling pointer?
What is a functor?
Acronyms
There are many common acronyms in the C++ programming language. What is the definition of each of these acronyms?
STL
RAII
VCL (this acronym only applies to developers who are interviewing for a position that will use a Borland C++ compiler) 
Why is C++ called C++?
If you saw a WChar type in a program you didn't write, what would it typically represent?

Efficient C++ Programming
by Curtis Krauskopf
Certain aspects of the C++ language were designed to perform more efficiently than other parts. Knowing which parts are designed to improve speed, reduce storage or improve programming productivity demonstrates your ability to use those techniques in your daily programming.

What executes faster: ++i or i++, where i is an integer variable? 
Which is generally more efficient: a function that returns a value by reference or a function that returns a value without using a reference? 
Describe inline functions and their limitations? 
Why use the STL sort() when we have "good old qsort()"? 
One programmer wants to sort a linked list using recursion; another programmer wants to do it without recursion. Which one has the better answer? 
When is an interface "good"?

Practical C++ Programming
by Curtis Krauskopf
The practical programming questions are the core of most C++ programming interviews. These questions test your knowledge of the C++ language and its features. The purpose of these questions is to eliminate the candidates that have not programmed in C++ recently or who recently learned C++ through a crash-course book.

What language feature is available when a function returns a reference? 
What is name mangling in C++? 
What is overriding? 
Can you assign to a reference? 
What happens if you assign to a reference? 
What is a static_cast and when should it be used? 
What are the names of the other cast operators? 
How do you trap an exception without knowing what exception might be thrown? 
Describe how you design a program. 
Most programming projects involve modifying existing code. What things do you look for when you're tasked with modifying an existing program? 
There is a memory leak in a program. What tools and techniques would you use to isolate, find and fix the memory leak? 
What's the difference between a linked list and an array? 
What is the difference between a vector, a list and a map? 
What is a namespace?
What is an anonymous namespace and how is it different than a regular namespace?

C++ Buzz Phrases
by Curtis Krauskopf
C++ has many buzz phrases. Some of them have arisen from the academic community; others were spawned by trade journals, books and common knowledge. Describe the definitions and concepts expressed in each of these buzz phrases:

Demeter's Law 
Liskov Substitution Principle 
Dependency Inversion 
Visitor Pattern 
Gang of Four 
Bridge Pattern

C++ Problem Solving
by Curtis Krauskopf
Computer programs are designed to solve problems. These programs test your ability to solve problems. The programs are small enough that they can be done on paper with the interviewer.

Find the number of bits in an unsigned integer data type without using the sizeof() function. 
Multiply an integer by 8 without using multiplication or addition. 
Write a function that adds two signed integers and checks for overflow. When an overflow is detected, cause an appropriate exception to be thrown. 
Write a program that counts the number of 'x' characters in an input stream. Assume the stream is binary. 
Write a program that detects if a text file is in Windows format (CR followed by LF) or in Unix/Linux format (CR) or in Mac format (LF). For this problem, it's okay to assume that all lines in the text file terminate the same way.









	
Software Engineering Communication
by Curtis Krauskopf
Communication is an important part of being able to interact with other professionals and with your non-technical coworkers. How well can you communicate about the following issues?

What was your biggest development screw-up? What insight did you learn from that? 
Explain the internet to a young child. 
Explain a database to your grandparents. 
Explain how you learn a new computer language. 
What C++-related magazines or websites do you read on a regular basis? 
Have you ever worked on an open-source project? If you have worked on one, what were the most difficult issues? If you were to work on one, what would you foresee as being some of the difficult issues? 
What are the three most recent computer languages you've learned and why did you learn them?





	
Job Interview Brain Teasers
by Curtis Krauskopf
Riddles seem to be popular amongst some interviewers. The purpose of the riddle is not necessarily to get the right answer -- rather, it's to see how the candidate reacts when faced with a non-standard programming question. Demonstrate your flexibility on-the-job by being able to answer these questions.

The Three Jugs Problem
Two friends who have an eight-quart jug of water wish to share it evenly. They also have two empty jars, one holding five quarts, the other three. How can they each measure exactly 4 quarts of water?

Geometry in real-life
Why is a manhole cover round?

We'll cross that bridge when we get to it
There are 4 women who want to cross a bridge. They all begin on the same side. You have 17 minutes to get all of them across to the other side. It is night. There is one flashlight. A maximum of two people can cross at one time. Any party who crosses, either 1 or 2 people, must have the flashlight with them. The flashlight must be walked back and forth, it cannot be thrown, etc. Each woman walks at a different speed. A pair must walk together at the rate of the slower woman's pace.

Woman 1: 1 minute to cross
Woman 2: 2 minutes to cross
Woman 3: 5 minutes to cross
Woman 4: 10 minutes to cross
For example if Woman 1 and Woman 4 walk across first, 10 minutes have elapsed when they get to the other side of the bridge. If Woman 4 then returns with the flashlight, a total of 20 minutes have passed and you have failed the mission. What is the order required to get all women across in 17 minutes? Now, what's the other way?




	
Job Interview: What's Wrong With this Code?
by Curtis Krauskopf
Good programming problems test more than just the language's syntax. Many programmers are also drawn toward interesting programming puzzles.

Gimpel Software creatively markets their C/C++ Lint tool (called PC-Lint) by publishing a new "Bug of the Month" in every issue of C/C++ User's Journal and Dr. Dobbs Journal. For example, "Bug of the Month" number 750 was published in January of 2006:

The New Year's celebration was marred by the lack of ice for the drinks. The compiler made no complaint. Can you discover the problem?

1    #include <stdio.h>
2
3    #define ON_THE_ROCKS
4
5    const char *ice()
	6    {
		7    #if defined(Shaken)
			8        return "shaken not stirred";
		9    #elif defined(Stirred)
			10       return "stirred not shaken";
		11   #elif defined(ON_THE_R0CKS)
			12       return "on the rocks";
		13   #else
			14       return "";
		15   #endif
			16   }
			17
			18   int main()
	19   {
		20       printf( "Celebrate the New Year " );
		21       printf( "with your drink %s.\n", ice() );
		22       return 0;
		23   }
				
			Output:
			Celebrate the New Year with your drink .


					
			Here are two other programming snippets to puzzle over. Neither one of these was a Gimpel.com "Bug of the Month", but they are typical of the types of programming problems given during C++ job interviews.

#1) What is wrong with this code?


			enum ResponseType { ReturnValues, InvalidInput };

string CreateWebText(string userInput, ResponseType operation) {
	   switch (operation) {
		         case ResponseType.ReturnValues:
				          userInput = "<h1>Values</h1>" + FilterOutBadStuff(userInput);
					           break;
						         case ResponseType.InvalidInput:
						            userInput = "<h1>Invalid</h1>" + FilterOutBadStuff(userInput);
							             break;
								        }
	      return userInput;
}
#2) What is wrong with this code?


struct Fred {
	  Fred(int n): v(n) {}
	    std::vector<int> v;
};

int main() {
	  using namespace std;
	    Fred f(1);
	      f.v[0] = 5;
	        cout << f.v[0] << endl;
		  f = 7;          // is this legal?
		    cout << f.v[0]; // what is output here?
}







	
Showing Skills with Short Programs on a Job Interview
by Curtis Krauskopf
Each of these programming problems should be conducted at a workstation. After thinking about the question for a reasonable timeframe, you should be able to answer the question, "How long will it take you to write this program?". Then prove yourself correct by writing and debugging program within the timeframe you've allotted for yourself.

An array that is instantiated with the new[] operator should also be deleted using the delete[] operator. Write a program that proves that the destructors for an array are not called when the array was instantiated with new [] and the array was deleted with delete (without the delete[] syntax). 
Write a String class that compares its strings by ignoring the case of the characters. 
A comma-delimited file has two columns: timeA and timeB. Both columns are times in the following format: hh:mm [a|p]m

where:
    hh is from 1 to 12.
    mm is from 1 to 60.
    [a|p] is either an 'a' or 'p'.

Example file:
5:57 pm,10:37 am
Write a program that reads the comma-delimited text file. For each line in the text file, report the time that is earlier. Assume all times are in the same time zone and that all times are for the same day.

Sort a linked list using recursion. 
Sort a linked list without using recursion. 
Reverse a single-linked list without using recursion.






	
Language Lawyer in a C++ Job Interview
by Curtis Krauskopf
Language Lawyer questions involve C++ language issues that are typically not seen in day-to-day programming projects. The questions might probe dark corners of the language definition or areas that are supported differently between different popular compilers.

Show an example of a valid C program that fails to compile in C++. 
Show an example of a valid C program that compiles cleanly in C++ but gives a different result. 
Why won't this compile?
for (int i = 0; i < 10; i++) {
  for (int k = 0; k < 10; k++) {
    if (e == 0) goto next_i;
  }
  next_i;
} 

A placement new exists in the C++ language. Is there a "placement delete"?






	
Unfair C++ Job Interview Questions
by Curtis Krauskopf
These questions are beyond the bounds of normal interview questions. I don't know if these questions have actually been asked in a real interview but somebody might think it's a cute question and ask. Being prepared for these out-of-bounds questions will prepare you for other difficult questions. When answering those questions, remember to use the same techniques that you use when practicing these questions.

The interviewer looks up from his newspaper, tosses a pencil at you and says, "Sell me this pencil". The interviewer immediately returns to reading his newspaper. 
The interviewer hands you a black pen and says nothing but "This pen is red." 
Write a program whose output is its own source code. 
Tell me the funniest programming joke you've ever heard.




---------------------------------------------------------------------------------------------------- 
Answers

	
C++ Language-specific Answers
by Curtis Krauskopf
One strategy to use when answering a language issue question is to examine the question from various perspectives. Some perspectives to consider are:

the language author wants to prevent ambiguities
the C++ compiler vendor want to simplify the compiler's implementation
the code writer wants clear rules for implementing a feature
the maintenance programmer needs to understand existing code
legacy code should not be broken by new features
The best answer is one that acknowledges the tradeoffs that were made to accommodate one or more of the above groups. When reviewing your video or audio tape, give yourself extra credit for each group that you mention and their tradeoffs.

Q1) An array is instantiated with the new[] operator. Is it sufficient to delete the array using a delete operator or should a delete[] operator be used? Justify your answer.

A1) The delete[] operator should always be used. This restriction applies for both built-in types (char, int and others) and for aggregate types (structs and classes). This is required by the C++ language definition (the Annotated C++ Reference Manual).

Q2) Can I drop the [] when deleting an array of some built-in type (char, int, etc)?

A2) No. Marshall Cline's C++ FAQ Lite contains a good explanation at parashift.com.

Q3) What is an example of when a destructor is NOT called at the end of scope?

A3) Bjarne Stroustrup's C++ Style and Technique FAQ provides an excellent explanation at att.com. The short answer is that objects that are created on the heap are not automatically destroyed at the end of the scope that created the object.

In addition to Bjarne Stroustrup's answer, I would also add that statically created objects are also not destroyed at the end of the scope.

Q4) Explain stack unwinding.

A4) Stack unwinding occurs when an exception is thrown and control passes from a try block to a handler. Automatic objects are destroyed in the reverse order of their construction. If a destructor throws an exception during the stack unwinding process, terminate is called.

From the Borland C++ Builder help:

When an exception is thrown, the runtime library takes the thrown object, gets the type of the object, and looks upward in the call stack for a handler whose type matches the type of the thrown object. Once a handler is found, the RTL unwinds the stack to the point of the handler, and executes the handler. In the unwind process, the RTL calls destructors for all local objects in the stack frames between where the exception was thrown and where it is caught. If a destructor causes an exception to be raised during stack unwinding and does not handle it, terminate is called. Destructors are called by default, but you can switch off the default by using the -xd compiler option.
Objects that are not allocated on the stack, such as heap allocations, are not automatically released. This can cause memory leaks unless the programmer takes extra precautions to release the allocated memory when an exception is thrown. There are various ways to prevent heap-memory leaks caused by stack unwinding. One way is a user-defined garbage-collection; a second way is to specifically deallocate those resources in the exception handler.

Q5) When I write a derived class's destructor, do I need to explicitly call the destructor for my base class?

A5) Marshall Cline's C++ FAQ Lite answers this question with "No". A more explicit explanation with an example is at parashift.com.

Q6) Explain the difference between a class and an object.

A6) A class is a blueprint for an object. It defines how the object will be created, what data is stored, how the data can be manipulated and how the object will be destroyed. An object is an instantiation of a class. There can be multiple objects instantiated from one class. Every object has one and only one class that it was instantiated from.

Q7) Explain the difference between a struct and a class.

A7) The default members and base classes of a class are private. The default members and base classes of a struct are public.

Other than the default protection, struct and class are equivalent.

An unwritten practice amongst C++ programmers is to define a class for objects that have few or no public data members and to define a struct for objects that have few or no public methods.

Q8) What is difference between malloc()/free() and new/delete?

A8) malloc() and new both allocate space from the heap. free() and delete both release previously allocated heap space. free() should only be used with malloc'd allocations and delete should only be used with new allocations. There are two varieties of new: array allocation through a new[] operator and single object allocation through a new operator. It's the programmer's responsibility to know and track which allocation method was used in order to apply the correct deallocation: free(), delete or array delete (operator delete[]).









	
C++ Language Definition and Acronym Answers
by Curtis Krauskopf
The key to answering a definition-type question is to keep the answer short. Even though you might be an expert on a particular word or phrase, the interviewer is generally not interested in that and they just want a simple explanation that shows you understand what it means.

Some interviewers adopt a more sadistic perspective. Their philosophy is follows the idiom "Give a man enough rope and he'll hang himself". The goal of the sadistic interviewer is to allow you to talk until you've said something that is undeniably incorrect and then point it out to you. Short answers prevent you from rambling on about a topic and then getting yourself into trouble by giving an inaccurate or misleading description.

One way to tell the difference between a language issue and a definition question is to examine the question. A definition-type answer is expected for questions similar to "What is X?". A language-issue type answer is expected for questions that ask how to do something, or why is something defined the way it is.

1) Polymorphism is the ability of a pointer to a derived object to be type-compatible with a pointer to its base class. If the interviewer's follow-up question is, "Huh?", you can answer:

Polymorphism allows two or more classes derived from the same base class to share a common base member function but have different behaviors. Moving to a whiteboard, you can whip up the sample program in Listing A. It uses a pure virtual base member but that's not a requirement. A regular virtual base member would also have been acceptable.

#include <iostream>

using namespace std;

class Vehicle {
public:
  virtual string getFuel() = 0;
};

class Car : public Vehicle {
public:
  virtual string getFuel()
    { return "gasoline"; }
};

class Truck : public Vehicle {
public:
  virtual string getFuel()
    { return "diesel"; }
};

void printFuel(Vehicle &v) {
  cout << v.getFuel() << endl;
}

int main(int, char **) {
  Car car;
  Truck truck;
  printFuel(car);
  printFuel(truck);
  return 0;
}
Listing A: Example of Polymorphism
In Listing A, polymorphism occurs with the Vehicle parameter for the printFuel() function. printFuel() can accept either an instantiation of Car or an instantiation of Truck.

A follow-up question might ask if a Vehicle object could be passed to the printFuel() function. The answer is "no" because Vehicle uses a pure-virtual function and classes with pure-virtual functions can not be instantiated.

2) virtual is a C++ keyword that is used for virtual methods and for virtual base classes.

3) mutable is a storage-class specifier. It allows const-member functions to modify the data member.

4) explicit is used on constructors that have one parameter. It prevents automatic type conversion from changing a candidate parameter into the type used in the constructor.

5) template metaprogramming is an idiom that uses templates to generate source code that calculates an answer at compile-time rather than at run-time.

Follow-up questions would ask about the Curiously Recurring Template Pattern, the Barton-Nackman trick, static polymorphism in template metaprogramming and the benefits and drawbacks of template metaprogramming. See wikipedia.org for a good explanation along with cross reference material.

6) public, private and protected are the access control specifiers in class and struct designs. All three of the keywords are used to control the access to methods and data in base classes and in derived classes. Listing A shows an example of a Car class defining public access to a Vehicle class. The Vehicle class defines public access of the getFuel() pure virtual method.

7) The static keyword is used all over the place in the C++ language. When used inside of a method or function, the static keyword preserves the last value of a variable between method or function calls. Inside of a class definition, a data value can be declared static -- this causes one version of the data to be shared amongst all of the objects of the class. Static member functions can not be virtual because they have external linkage. External linkage means that the function does not have a this pointer and the function can only call other static member functions and access static data.

8) An assignment operator is a simple equal (=) sign for built-in types or the operator=() method for objects. If your first answer only provided one of those assignment operators, a good interviewer would ask something like "is that all?". Written tests can't do that, of course, so be careful when giving what seems like an obvious answer.

9) A dangling pointer can be an unassigned pointer or it can be a pointer to an object that has been destroyed.

10) A functor is short for function object. Function objects are used as callbacks to modify or customize the behavior of an algorithm. Function objects define a member function that provides the glue between an algorithm and the customized behavior. Because functors are full-fledged objects, they have all of the power of an object: state, inheritance, encapsulation and templates. In Listing B, the operator() method of the magnitude structure is a functor. Listing C takes a slightly different approach by using an arbitrary method name, in this case called "isGreaterThan", to attach a customized behavior to an algorithm.

 #include <algorithm>
#include <function>
#include <assert>
#include <iostream>

using namespace std;

// Use the absolute value (magnitude) of the
// number.  For example:  3 < -5 because abs(3) < abs(-5)
struct magnitude {
  bool operator()(const int& x, const int& y)
    const
    { return abs(x) < abs(y); }
};


int main(int, char **) {
  int a[10];
  int i;

  for(i = 0; i < 10; ++i)
    a[i] = i * (i % 2 ? -1 : 1);
  random_shuffle(&a[0], &a[10]);

  // sort into special order:
  sort(&a[0], &a[10], magnitude());

  // Should be: 0,-1,2,-3,4,-5,6,-7,8,-9,
  for(i = 0; i < 10; ++i)
    cout << a[i] << ",";
  cout << endl;

  return 0;
}
Listing B: Functor Example


 #include <algorithm>
#include <iostream>

using namespace std;

// Used to allow for generic implementations of bubble_sort
struct SortOrder {
  virtual bool isGreaterThan(const int x, const int y) const = 0;
};

void bubble_sort(int *first, int *last, SortOrder &compare) {
  int numLaps = last - first - 1;
  for(int lap = 0; lap < numLaps; ++lap) {
    for(int *current = first; current != last; ++current) {
      int *next = current + 1;
      if (next == last)
        continue;
      if (compare.isGreaterThan(*current, *next)) {
        std::swap(*current, *next);
      }
    }
  }
}


// Use the absolute value (magnitude) of the
// number.  For example:  3 < -5 because abs(3) < abs(-5)
struct Magnitude : SortOrder {
  virtual bool isGreaterThan(const int x, const int y) const
    { return abs(x) > abs(y); }
};


int main(int, char **) {
  int a[10];
  int i;

  for(i = 0; i < 10; ++i)
    a[i] = i * (i % 2 ? -1 : 1);
  random_shuffle(&a[0], &a[10]);

  // sort into special order:
  Magnitude sort_by_magnitude;
  bubble_sort(&a[0], &a[10], sort_by_magnitude);

  // Should be: 0,-1,2,-3,4,-5,6,-7,8,-9,
  for(i = 0; i < 10; ++i)
    cout << a[i] << ",";
  cout << endl;

  return 0;
}
Listing C: Another Functor Example

Acronyms
Just like definitions, try to keep the answers to acronyms short.

1) STL: Standard Template Library

2) RAII: Resource Allocation is Initialization. See http://www.hackcraft.net/raii/ for a well-written tutorial on RAII.

3) VCL: Visual Component Library. I'll admit that even though I knew what the VCL was, I didn't know what its acronym stood for until I wrote this article.

4) C++: Quote from Chapter 1 of the C++ Programming Language (Stroustrup)

"The name C++ ... was coined by Rick Mascitti in the summer of 1983. The name signifies the evolutionary nature of the changes from C; "++" is the C increment operator."
See also att.com.
5) A WChar type in a program you didn't write would typically be a wide (16-bit) character type.







	
Efficient C++ Programming Answers
by Curtis Krauskopf
Almost every answer for an efficient programming question can start out with "Well, it depends...". The compiler vendor you use, the optimization settings, the operating system, the speed (and brand) of the CPU, the speed of the RAM memory and dozens of other factors can each affect the outcome of almost every efficiency programming question. The answers here are those that are generally accepted in the industry or can be shown to be true for a wide variety of common C++ compilers.

Q1) What executes faster: ++i or i++, where i is an integer variable?

A1) ++i probably executes faster because i++ would first fetch the value of i, push it on the stack, increment it and then pop the value of i from the stack. In contrast, ++i fetches the value of i, and then increments it. Yes, I'm leaving a lot of detail out and the push/pop cycle can be optimized away for many situations if the optimizer is good enough.

Q2) Which is generally more efficient: a function that returns a reference or a function that does not return a reference?

A2) Functions that don't return a reference are returning the object by value. This is accomplished by using the object's copy constructor. For non-trivial objects, the time and resource cost of copying the object can be easily measured. Functions that return an object by reference only return a pointer to the object. The object the reference points to is not copied.

Q3) What's the deal with inline functions?

A3) The keyword inline is a hint to the compiler that the function should be compiled into the code wherever it is used. This is normally done with a simple function that is called often, such as a getter or setter in a class or struct. The compiler implementer is allowed to ignore the inline hint and substitute a function call instead. Some compilers automatically disable the inlining of functions while debugging.

Q4) Why use the STL sort() when we have "good old qsort()"?

A4) The following answer is quoted from public.research.att.com:

To a novice,
qsort(array,asize,sizeof(elem),compare);
looks pretty weird, and is harder to understand than
sort(vec.begin(),vec.end());
To an expert, the fact that sort() tends to be faster than qsort() for the same elements and the same comparison criteria is often significant. Also, sort() is generic, so that it can be used for any reasonable combination of container type, element type, and comparison criterion. For example:
struct Record {
  string name;
  // ...
};

struct name_compare {	// compare Records using "name" as the key
  bool operator()(const Record& a, const Record& b) const
    { return a.name<b.name; }
};

void f(vector<Record>& vs)
{
  sort(vs.begin(), vs.end(), name_compare());
  // ...
}	
In addition, most people appreciate that sort() is type safe, that no casts are required to use it, and that they don't have to write a compare() function for standard types. The primary reason that sort() tends to outperform qsort() is that the comparison inlines better.
Q5) One programmer wants to sort a linked list using recursion; another programmer wants to do it without recursion. Which one has the better answer?

A5) It depends on the maximum number of items in the linked list. An implementation that uses recursion will eventually run out of stack space if the linked list is long enough. If the number of items in the linked list is relatively small, say around 30 or so, then either solution might be faster but both implementations will be so fast that it's usually not worth optimizing that one little routine. If the number of items in the list could ever be more than 30, then a non-recursive solution would probably be better because it will not run out of stack space when compared with the recursive solution.

Q6) When is an interface "good"?

A6) From parashift.com:

When it provides a simplified view of a chunk of software, and it is expressed in the vocabulary of a user (where a "chunk" is normally a class or a tight group of classes, and a "user" is another developer rather than the ultimate customer). The "simplified view" means unnecessary details are intentionally hidden. This reduces the user's defect-rate. The "vocabulary of users" means users don't need to learn a new set of words and concepts. This reduces the user's learning curve.
Previous Answers		More C++ Answers







	
Practical C++ Programming Answers
by Curtis Krauskopf
Some of the practical programming questions require experience and the answers to some of them can be learned by reading the right books. A core set of books that every professional C++ programmer should read are:
The C++ Programming Language (Stroustrup)
Effective C++ (Meyers)
Design Patterns (Gamma)
The Annotated Reference Manual (Stroustrup & Elis)
C++ Primer (Lippman)
C++ Standard Library (Josuttis)
STL Tutorial (Musser)
C++ Templates (Nico)
Advanced C++ (Coplien)
Q1) What language feature is available when a function returns a reference?

A1) The C++ FAQ-lite at parashift.com answers this question:

The function call can appear on the left hand side of an assignment operator. This ability may seem strange at first. For example, no one thinks the expression f() = 7 makes sense. Yet, if a is an object of class Array, most people think that a[i] = 7 makes sense even though a[i] is really just a function call in disguise (it calls Array::operator[](int), which is the subscript operator for class Array).

class Array {
public:
  int size() const;
  float& operator[] (int index);
  ...
};

int main() {
  Array a;
  for (int i = 0; i < a.size(); ++i)
    a[i] = 7; // invoke Array::operator[](int)
  ...
}

Q2) What is name mangling in C++?

A2) Name mangling encodes the type of the function's parameters into the name in order to create a unique name that is distinguished from identical function names with different parameter types. For example, the parameter int *p might be mangled to "intPtr". A function prototype defined as:


doit(int *p);

could name mangle the doit function into doit_intPtr.

Name mangling is compiler specific. The primary reason why object libraries from one compiler can not be linked with object libraries from another compiler is because each compiler vendor uses a slightly different name mangling scheme.

Q3) What is overriding?

A3) Overriding only occurs in a class hierarchy. An overridden method is one that is hidden from the normal method call hierarchy by a derived class that has a method with the same name, return type and parameter list. When a method is overridden by a subclass's method, the subclass's method is called instead of the parent class's method.

Q4) Can you assign to a reference?

A4) Yes, you can. Here's an example:

int i;
int &j = i;
j = 5;   // changes i to 5
Q5) What happens if you assign to a reference?

A5) From parasoft.com:

You change the state of the referent (the referent is the object to which the reference refers).
Remember: the reference is the referent, so changing the reference changes the state of the referent. In compiler writer lingo, a reference is an "lvalue" (something that can appear on the left hand side of an assignment operator).

Q6) What is a static_cast and when should it be used?

A6) A static_cast<> is the general replacement for the old-style (cast). A static_cast<> is safer than a (cast) because static_cast<> verifies at compile-time that the conversion makes sense.

Q7) What are the names of the other cast operators?

A7) const_cast, reinterpret_cast and dynamic_cast.

Q8) How do you trap an exception without knowing what exception might be thrown?

A8) Use the ... wildcard in the exception handler.

Q9) Describe how you design a program.

A9) Any reasonable answer that you can justify will work for this question. The better answers will include the phrases "top-down", and "bottom-up". Other phrases that could be used are "divide and conquer", "requirements gathering", budgeting, planning, and testing.

A poor answer is along the lines of, "I just sit down and start coding because I get something done right away". Most employers want to know that you spend time designing the program, that you sit at a blank piece of paper or a whiteboard and sketch out even a rough skeleton of how the program will work.

Programmers that design programs using extensive unit testing get extra credit points. If you're an advocate of extreme programming (XP) (www.extremeprogramming.org/), this would be a good time to talk about your experiences with XP and how it makes you a more efficient and better software engineer.

Q10) Most programming projects involve modifying existing code. What things do you look for when you're tasked with modifying an existing program?

A10) The first thing I do when I take over a legacy project is to attempt to compile the project in an isolated environment. I record the compile-time warnings I receive and I pay particular attention to any modules that compile with errors because that's an indication that I have an incomplete or inaccurate development environment. Next, I make a binary comparison between the legacy executable and the newly compiled executable. My goal is to create an executable that is identical to the legacy executable -- at that point I know I have the same environment and settings that the previous developers used.

The next thing I usually look at is any existing documentation. Although many C and C++ programming projects are notorious for having little or no documentation (or even inaccurate documentation!), I have seen projects that had extensive, amazing and accurate documentation -- even to the point where the number of lines of useful comments exceeded the number of lines of code.

Q11) There is a memory leak in a program. What tools and techniques would you use to isolate, find and fix it?

A11) I would first determine how big the memory leak is and look for patterns of when it appears and how quickly it grows. If the memory leak is small or grows slowly and the program terminates soon anyway, then I would say that the problem isn't worth fixing. This isn't out of laziness -- it's a prudent decision that recognizes that some things are too expensive to fix.

If a leak was determined to be worthy of fixing, I would next look for the smallest set of code that reproduces the problem. Can the problem be reproduced by launching and then immediately exiting the program? What's the simplest thing I can do that causes the biggest memory leak quickly?

I would also realize that there may be multiple memory leaks in the program and they might be interacting with each other in strange ways. An example would be a hash table that leaks whenever the hash table's contents are rehashed.

On a Windows system, the primary tool I use to monitor memory usage is the Windows Task Manager. A more aggressive approach is to instrument the malloc/free and new/delete methods to provide a log of memory consumption and releases.

Commercial tools are also available to assist in the detection and eradication of memory leaks. If you've used one before that you've liked, mention it in the interview to earn extra points.

Q12) What's the difference between a linked list and an array?

A12) An array allows random access to the array's elements. A linked list's elements can accessed by dereferencing the head (or tail) pointer and then dereferencing the next (or previous) pointers.

Inserting an element into an array is more difficult than inserting an element into a list. Deleting is similarly more difficult in an array than in a list.

Data is stored sequentially in an array but that is not a requirement for a list. Lists' data can be stored either sequentially or randomly.

Q13) What is the difference between a vector, a list and a map?

A13) All three of them are containers in the STL.

Maps use key/value pairs for the elements. The keys are sorted within the map to allow quick random access. Insertion and deletion are both very quick. Access to any particular element is also quick but each element requires a unique key.

STL vectors and STL lists behave the same as arrays and lists (see Q12).








	
C++ Buzz Phrase Answers
by Curtis Krauskopf
Buzz phrases show how well-read a C++ candidate is. The diversity of knowledge and wisdom embedded in any of these buzz phrases separates the advanced C++ programming candidates from the intermediate or beginner levels. Knowing when to apply these concepts, and equally important, knowing when to break the rules provided by these concepts, shows your ability to handle large C++ design and development projects.

A1) In C++, the Law of Demeter is a guideline for developing class hierarchies. The guideline states that a method inside of an object should only call the methods of:

The object itself
The objects passed as parameters to the method
Objects instantiated within the method
Objects that exist due to has-a relationships within the object
The purpose of the Law of Demeter is to reduce the dependencies between classes. Obeying the law requires the coder to create many wrapper methods that separate callees from callers.

A2) The Liskov Substitution Principle guarantees that code using a pointer to a base class doesn't break when a new class is added to the class hierarchy. One main principle provide this guarantee: the methods for subclasses are substitutable for the methods in the superclasses for instantiated objects.

Violating the principle requires subclasses (or modified superclasses) to check the object's state or the type of the subclass to determine how to dereference a request. Most commonly, this manifests itself in code with switch or if statements similar to:

switch (param.type) {
  case Integer:
    retval = param.toInt();
    break;
  case Double:
    retval = param.toDouble();
...
A3) Dependency Inversion abstracts dependencies into subclasses so that the superclasses become so generic that they no longer have interdependencies.

See Robert Martin's article for more details.

A4) The Visitor Pattern separates an algorithm from an object's structure. It can perform an operation (or groups of operations) on objects that belong to a structure. The objects are not required to have the same interfaces.

A5) The Gang of Four are Erich Gamma, Richard Helm, Ralph Johnson and John Vlissides. They collectively became famous for their seminal book "Design patterns : elements of reusable object-oriented software", Addison-Wesley (ISBN 0201633612 -- no, I don't expect you to memorize the ISBN number -- I'm providing it here in case you want to get the book).

A6) A Bridge Pattern separates an abstraction from its implementation so that they can change independently. Some examples of when a Bridge Pattern can be used are:

A reference counting mechanism that is invisible to the clients being counted.
When changes to a class hierarchy cause an exponential increase in the number of subclasses or superclasses.
When interfacing with a legacy system that can not be touched but must be extended.
Previous Answers		More C++ Answers









C++ Problem Solving
by Curtis Krauskopf
There are usually many ways to solve any programming problem. The solutions provided here are examples and are not necessarily the best -- but they do work.

When creating your solution for any problem-solving type question, remember to test edge-cases -- such as when there are zero, one or an infinite number of possibilities.

Q1) Find the size of an integer data type without using sizeof() function.

A1) Listing D is an example of one solution. What is not mentioned in the question is if the integer data type is signed or unsigned. Does your solution work for both? For edge-case support, we can assume that the integer data type has at least one bit because a 0-bit integer data type is pretty useless. Does your solution work for 1 or 2 bit integers, or did you assume that integers were a multiple of 8 bits?


#include <stdio.h>

template< typename IntType >
int numberOfBits() {
  IntType newValue = 1;
  IntType oldValue = 0;
  int numBits = 0;
  while(oldValue != newValue) {
    ++numBits;
    oldValue = newValue;
    newValue = (newValue << 1) + 1;
  }
  return numBits;
}

int main(int argc, char* argv[]) {
  printf("sizeof(int)  : %d\n", sizeof(int) * 8);
  printf("size of <int>: %d\n", numberOfBits<int>());
  printf("\n");
  printf("sizeof(unsigned int)  : %d\n", sizeof(unsigned int) * 8);
  printf("size of <unsigned int>: %d\n", numberOfBits<unsigned int>());
  printf("\n");
  printf("sizeof(short)  : %d\n", sizeof(short) * 8);
  printf("size of <short>: %d\n", numberOfBits<short>());
  return 0;
}

Listing D: Detect the size of an integer
Update: March 20, 2011
A decompile.com reader, Ján Staník, has submitted the following alternate solution. The solution in Listing D did not assume there are 8 bits per byte but Ján's solution does assume there are 8 bits per byte. However, Ján's solution provides an O(1) solution whereas the solution in Listing D is an O(n) solution.

I think it's useful to examine why his solution works because it makes a clever use of arrays and it calculates the distance between array elements in a template function.

The only change I made to his solution was to format it to stay within the minimum page width of this website.


#include <iostream>

template <typename T>
void SizeOf()
{
  T a[2];
  std::cout << "sizeof() = " << 8 * sizeof(T) << std::endl;
  std::cout << "SizeOf<> = ";
  std::cout << 8 * (((long int)((T*)a+1)) - ((long int)(T*)a));
  std::cout << std::endl;
}

int main( )
{
  SizeOf<unsigned int>();
}

Q2) Multiply an integer by 8 without using multiplication or addition.
A2) The key to the answer to this question is knowing about the shift operator and how it relates to the integer's internal representation. The following code snippet answers this question:


int x = 3;
x = x << 3;











	
	
Software Engineering Communication
by Curtis Krauskopf
Many communication-type questions don't have a specific "right" or "wrong" answer. Almost any reasonable answer will be acceptable as long as it answers the question.

Q1) What was your biggest development screw-up? What insight did you learn from that?

A1) A "wrong" answer to this question would be "I really haven't had any screw-ups -- all of my projects are done perfectly all of the time". If your projects really are like that, then contact me so I can hire you. For the rest of us, we can point out at least one project that could have been done better or wasn't delivered on-time or on-budget.

This question can become a trap for you when you start bad-mouthing a previous employer or your current or ex-coworkers. Keep the criticism self-centered and about how you contributed to the problem. Starting your answer with a sheepish grin (if you can manage that) can disarm the interviewer and give you a little more time to construct your answer.

Even though we would like to forget our screw-ups, it's important to have them ready for an explanation when we're asked about them. This shows that you care about the projects you've worked on, that you try to improve yourself by learning from your past mistakes and that you watch for signs of repeating previous problems. Ending your explanation by explaining all three of these things turns the response from being a low-point in the interview into a high-point -- where your abilities are shown to shine.

Q2) Explain the internet to a young child.

A2) The Internet is a way that computers can talk to each other.

I think the key to this question is keeping the explanation and vocabulary very simple.

Q3) Explain a database to your grandparents.

A3) A database stores information in the same way that a phone book stores information. When you want to search for somebody's phone number, you can easily find it because all of the names are in alphabetical order. Similarly, in a database, all the information is organized in ways that make it easy to find. Unlike a phone book, though, most databases allow new information to be added, old information to be deleted, and changes to be made to existing data.

Using an analogy for this question is appropriate because of the audience.

I picked a phone book because its features are well-understood by everybody.

Q4) Explain how you learn a new computer language.

A4) Just about any reasonable explanation could go here. Some people learn by example. Others learn by reading the definition and rules of the language. Your answer should probably cover how you use small test programs to try features before using them in a real program (you do that, don't you?).

The way I learn a language is to read the language's specification and see how it's similar to one of the languages I already know. I usually buy two books: one that gives the language's definition and a second that shows examples. Using sample programs, I write small test programs to test out features of the language. Then I'll intentionally create problems in those small programs to see how the compiler reacts or how the program blows up at runtime. What happens if a semi-colon is missing? What happens if I use a reserved word for a variable name?

Q5) What C++-related magazines or websites do you read on a regular basis?

A5) Since you're reading this article, you probably read websites that discuss C++ programming!

Some websites that discuss C++ programming issues are:

bcbjournal.com
dreamincode.net
codeproject.com
www.decompile.com/cpp/faq/
Q6) Have you ever worked on an open-source project? If you have worked on one, what were the most difficult issues? If you were to work on one, what would you foresee as being some of the difficult issues?

A6) One of the purposes of this question is to discover if you've ever worked in a team environment and how well you work on that team. Sometimes, large projects are distributed amongst teams of programmers that interact remotely. Your experience on large open-source projects will help you integrate into the company's distributed culture.

A recent slashdot.org article asked readers nearly the same question. The consensus opinions were to:

Find a project you're interested in.
Read the TODO list or find something that is broken or needs to be improved.
Read the discussion message boards and learn the acronyms and terminology that are unique to the project.
Communicate with the core developers to let them know you're interested in volunteering for the project.
Code and test and retest your solution before delivering it.
Deliver your project when you promised to deliver it. This shows that you are reliable and you'll be trusted with larger (and more interesting) assignments.
Don't take it personally if the core developers seem elitist or cliquish. Many open-source projects are run by developers with poor people-skills. If you find one of those projects, don't try to change them or even bother pointing out their behavior. Just move on to another open-source project. There are so many well-run open-source projects that there is inevitably a project that you would enjoy working on.
Q7) What are the three most recent languages you've learned and why did you learn them?

This is another question with no right or wrong answers. Just tell it truthfully without embellishing your answer. A typical follow-up to the question is "How long ago did you learn them?".

The interviewer is looking for your ability to adapt to modern programming conventions and to stay abreast of the industry's technology. The interviewer also wants to know if you're a naturally curious person. Even though it might seem nerdy to a non-professional, learning a language just for the sake of learning it does have merits. If the only language you know is C++, then every problem looks like it can only be solved with C++. Having a variety of languages under your belt (and that you stay current with) shows that you're flexible, well-rounded and professional.








	
Job Interview Brain Teasers
by Curtis Krauskopf
When an interviewer tests you with a brain-teaser, just remain calm. The worst answers are confrontational in which you ask, "How does putting water in a jar relate to the job I'm interviewing for?". Be careful about giving a snap-answer to a question, even if you think you've heard it before. The interviewer is expecting you to think about the problem and engage him with poignant questions. Giving the wrong answer quickly is not the impression you want to give.

Almost as bad as the confrontational answers are flippant answers, such as "I would go to the store and buy a measuring cup". However, you could start your answer that way with a qualification: "Assuming I can't go to the store...". The latter answer shows that you can think outside of the box whereas the first one dismisses the question sarcastically.

The interviewer is also testing to see how you react when you are told you had a wrong answer or when you can't find the answer. Certainly, getting hostile and attacking the question or complaining about how the interviewer didn't explain it well enough does not earn you points even though it might feel good for your damaged ego. Instead, sincerely ask what the answer is and how it is solved. Seem genuinely interested even if you don't care what the answer is -- the interviewer asked the question, so it seems important to him for some reason!

The Three Jugs Problem
Two friends who have an eight-quart jug of water wish to share it evenly. They also have two empty jars, one holding five quarts, the other three. How can they each measure exactly 4 quarts of water?

The Three Jugs Problem Answer
There are many variations on the three jugs problem, with different situations (sometimes sand, sometimes different jug volumes). The goal is generally the same: make a container hold exactly some amount of substance that can't be trivially measured.

Maybe you're blessed to be able to intuitively solve these kinds of problems. If so, just give the answer and impress the interviewer! For the rest of us, we have to solve it using some iterative process.

All of the versions of this problem can be solved by applying state-machine techniques. Starting with an initial condition, what are all of the possible permutations that lead to the next state? From that state, what are all of the possible permutations that lead to the third state and so on? Many of the possibilities might be physically impossible (such as pouring water from an empty jug) and others might undo the previous step. If paper or a whiteboard is available, show your design skills by plotting out the progress of your state-machine until you reach an answer. Most often, though, an interviewer will stop you midway through once it's clear that you're able to solve the problem.

Table 1 shows the initial conditions for the Three Jugs problem. Volume represents the amount of water in the jug in each state. The jugs are arbitrarily labeled A, B and C to easily identify them. Table 2 shows the state transitions in the problem. I've also given each of the transitions a unique number.

 	Jug A	Jug B	Jug C
Volume	8	0	0
Capacity	8	5	3
Table 1: Three Jugs Problem
Initial Conditions


Pour water from	Pour water to	Unique ID
A	B	1
A	C	2
B	A	3
B	C	4
C	A	5
C	B	6
Table 2: Three Jugs Problem
State Transitions
For bookkeeping purposes, you'll want to find a way to discover that you've already visited a previous state. This prevents infinite loops. For the initial conditions in Table 1, notice that the volume row uniquely represents the state. Using the volumes from jugs A, B and C, let's call 800 the initial state (the first digit is for jug A, the second digit is for jug B and the third digit is for jug C).

Now we know how to represent the final condition. That occurs when there are 4 quarts of water in two jugs. Only jugs A and B can contain four quarts of water. So the final condition is 440.

Using your whiteboard or paper, draw the initial condition using the code 800 and show the next state using the permutations in Table 2. Your diagram will look something like Figure A.

 
800 -> 350 (1)


800 -> 503 (2)


Figure A: Three Jugs Problem
First legal moves
The three jugs problem starts with all of the water in Jug A. Figure A shows the first legal moves from Table 2 that are applied to the initial conditions in Table 1. The transition ID number is in parenthesis.

From the initial conditions, there were only two valid transitions. I put the transition ID in parenthesis after the state number to help remember what happened. The next state transition diagram will look something like Figure B.

 
800 -> 350 (1) -> 053 (2)
               -> 800 (3)  X   
               -> 323 (4)
800 -> 503 (2) -> 053 (1)  X
               -> 800 (5)  X
               -> 530 (6)
Figure B: Three Jugs Problem
Next legal moves
The next step in the three jugs problem is to apply the transitions from Table 2 to the states recorded in Figure A. Three of the states are duplicates of a previous state. Those states are culled from further investigation by putting an X next to their transition numbers.

An 'X' is placed next to any state that is previously represented in the diagram, even if it's for another branch in the current state. This happened with 053 in the 800->503 branch because the first transition (A to B and A to C) was already 'discovered'.

By iteratively following this process, you'll either impress (or bore) the interviewer and he'll stop the question or you're arrive at an answer, whichever comes first.

Update: March 22, 2010
A decompile.com reader, Kang Zhao, has graciously provided his solution to the three jugs problem. I'm providing it here in case it makes more sense than the state-machine solution that is provided above.

Kang Zhao writes, "The key is to get 1 quart water. Because 8 - 5 = 3, 5 - 3 = 2, and 8 - 3 = 5, we need to find another way: 6 - 5 = 3 + 3 - 5 = 1".

Initial state:
A(8)	B(5)	C(3)
8
0
0
Solution:
3
5
0
3
2
3
6
2
0
6
0
2
1
5
2
1
4
3
4
4
0
Geometry in real-life
Why is a manhole cover round?

Geometry in Real-Life Answer
Some questions test your ability to think of a solution that doesn't involve programming and instead tests your general knowledge of chemistry, physics, geometry, biology and courses you took that you might have thought you never needed.

As with all brain teaser questions, it's not vitally important that you get the answer because you're being tested on how you solve a problem. One solution is to discuss the merits of a round manhole cover compared to other shapes.

For a humorous transcript of this answer, see Brian Groth's blog at msdn.com.

We'll cross that bridge when we get to it
There are 4 women who want to cross a bridge. They all begin on the same side. You have 17 minutes to get all of them across to the other side. It is night. There is one flashlight. A maximum of two people can cross at one time. Any party who crosses, either 1 or 2 people, must have the flashlight with them. The flashlight must be walked back and forth, it cannot be thrown, etc. Each woman walks at a different speed. A pair must walk together at the rate of the slower woman's pace.

Woman 1: 1 minute to cross
Woman 2: 2 minutes to cross
Woman 3: 5 minutes to cross
Woman 4: 10 minutes to cross
For example if Woman 1 and Woman 4 walk across first, 10 minutes have elapsed when they get to the other side of the bridge. If Woman 4 then returns with the flashlight, a total of 20 minutes have passed and you have failed the mission. What is the order required to get all women across in 17 minutes? Now, what's the other way?

Bridge Answer
The Bridge problem is similar to the Three Jugs problem. In both cases, things need to be transferred from one container to another (a side of a river versus a jug). The same state-machine techniques I described in the Three Jugs problem can be applied to the Bridge problem.

Table 3 shows the problem's initial conditions and Table 4 shows all of the transition states.

 	Woman A	Woman B	Woman C	Woman D
Bank (Left or Right)	L	L	L	L
Travel Time	1	2	5	10
Table 3: Bridge Problem
Initial Conditions


Move from Left bank
to Right bank:

Women	Time	Unique ID
A & B	2	1
A & C	5	2
A & D	10	3
B & C	5	4
B & D	10	5
C & D	10	6
Move from Right bank
to Left bank:

Woman	Time	Unique ID
A	1	7
B	2	8
C	5	9
D	10	10
Table 4: Bridge Problem
State Transitions
The last transition, ID#10, can be omitted because the problem can not be solved in time by having woman D travel from the right side to the left side by herself.

Starting with the initial conditions of ABCD| (in which the letters represent each of the women and the | symbol represents the river bank) the goal is to arrive at |ABCD in 17 or fewer elapsed minutes. Figure C shows the first set of transitions in the problem and Figure D shows the return trips for the first two possibilities in Figure C.

 
ABCD|_ 	-> CD|AB (1) (time: 2)
       	-> BD|AC (2) (time: 5)
       	-> BC|AD (3) (time: 10)
       	-> AD|BC (4) (time: 5)
        -> AC|BD (5) (time: 10)   
        -> AB|CD (6) (time: 10)
Figure C: Bridge Problem
First legal moves
All of the women initially start on the left bank. Figure C shows the first transition from the initial conditions in Table 3 using the states in Table 4.

 
ABCD|_ -> CD|AB (1) (time: 2)
                    -> ACD|B (7)  (elapsed time: 3)
                    -> BCD|A (8)  (elapsed time: 4)
       -> BD|AC (2) (time: 5)
                    -> ABD|C (7)  (elapsed time: 6)
                    -> BCD|A (9)  (elapsed time: 10)
       -> BC|AD (3) (time: 10)
                    -> ABC|D (7)  (elapsed time: 11)
                    -> BCD|A (10) (elapsed time: 20)  X   
       -> AD|BC (4) (time: 5)
                    -> ABD|C (8)  (elapsed time: 7)
                    -> ACD|B (9)  (elapsed time: 10)
       -> AC|BD (5) (time: 10)
                    -> ABC|D (8)  (elapsed time: 12)
                    -> ACD|B (10) (elapsed time: 20)  X
       -> AB|CD (6) (time: 10)
                    -> ABC|D (9)  (elapsed time: 15)
                    -> ABD|C (10) (elapsed time: 20)  X
Figure D: Bridge Problem
Next legal moves
The return trips from Figure C are extrapolated using the transitions from Table 3. Illegal moves (moving a woman who is not on the right bank) have been ignored. Three of the subsequent states exceeded the 17 minute time limit. Those states are marked with an 'X'.

Using this technique, you will find both of the solutions. Don't worry about the proliferation of states in the first few iterations. The 17 minute time limit puts a tight leash on the problem and you'll find the solution pretty quickly.





	
Job Interview: What's Wrong With this Code?
by Curtis Krauskopf
The problem with the Gimpel Software Bug of the Month #750 (repeated in Listing 1 for your convenience) is on line 11. Carefully look at the ON_THE_R0CKS symbol. The O of ROCKS is actually a zero (0). Gimpel's PC-lint tool provides a hint to the problem by reporting that the ON_THE_ROCKS symbol is not used in the program even though it's defined.

 1    #include <stdio.h>
2
3    #define ON_THE_ROCKS
4
5    const char *ice()
6    {
7    #if defined(Shaken)
8        return "shaken not stirred";
9    #elif defined(Stirred)
10       return "stirred not shaken";
11   #elif defined(ON_THE_R0CKS)
12       return "on the rocks";
13   #else
14       return "";
15   #endif
16   }
17
18   int main()
19   {
20       printf( "Celebrate the New Year " );
21       printf( "with your drink %s.\n", ice() );
22       return 0;
23   }
Listing 1: Gimpel Softare Bug Example
The zero in the ON_THE_R0CKS symbol causes the ice() function to compile with one line:


return "";

Many thanks to alert reader ZenJu for correcting my original answer.

The next code sample is actually in C#. You might think that it's not fair to use a C# code sample in a C++ interview. I, as an interviewer, would not do that but I've been in an interview where the interviewer thought that JavaScript and Java were the same thing. If you recognized that the program was in C# and said something to the interviewer in a cordial way, then points for you. Even though you might not have ever programmed in C#, the syntax is close enough that you should be able to provide constructive criticism about the code sample.

Eric Gunnerson's blog on msdn.com provides details about what's wrong with the code from a C# programmer's perspective.

Assuming that I didn't know C# and wasn't familiar with HTML, I would suspect that appending the input string to "<h1>Values</h1>" would cause the input string to be adjacent to the label. For example: ValuesLike this. This is not the case for normal HTML because the </h1> tag forces a new paragraph (caveat: this might be overridable with CSS but I'm not that much of a CSS expert to know).

The point of the first code sample was to provide an example of a program that wasn't C++ but was similar to C++ and to examine it from a C++ coder's perspective.

This is the C# code for your convenience:

 
enum ResponseType { ReturnValues, InvalidInput };

string CreateWebText(string userInput, ResponseType operation) {
   switch (operation) {
      case ResponseType.ReturnValues:
         userInput = "<h1>Values</h1>" + FilterOutBadStuff(userInput);
         break;
      case ResponseType.InvalidInput:
         userInput = "<h1>Invalid</h1>" + FilterOutBadStuff(userInput);
         break;
   }
   return userInput;
}

Listing 2: C# Code Example
The second code sample, shown in Listing 3, asks if a number can be assigned to a structure. The trick in Listing 3 is that the code looks like it's doing one thing when it's really doing something else. When 7 is being assigned to the Fred structure, the compiler looks for a conversion for 7 to the Fred structure. One is available with Fred's constructor. By tracing this code in C++ Builder, you'll be able to see what happens. A std::vector with 7 empty elements is instantiated. The std::vector::operator=() method copies the temporarily instantiated empty vector to f. The value that is written to cout is 0 because the temporary vector was instantiated with 7 empty elements.

 
struct Fred {
  Fred(int n): v(n) {}
  std::vector<int> v;
};

int main() {
  using namespace std;
  Fred f(1);
  f.v[0] = 5;
  cout << f.v[0] << endl;
  f = 7;          // is this legal?
  cout << f.v[0]; // what is output here?
}

Listing 3: Is this code legal?









	
Short C++ Program Answers
by Curtis Krauskopf
Two factors are important with the "Showing Skills" type questions. The first is to create a working program that solves the problem. The second factor is to do the work within the time you've allotted yourself.

Giving an accurate time estimate is a skill that I've had to learn to develop. I practice it daily by challenging myself even on routine matters, such as how long will it take me to debug a problem, or how long will it take me to design a module?

Asking how long a task will take is a reasonable question for an employer or customer because they want to know when a solution will be available and how much the solution will cost.

For yourself, it's part of time management and being able to deliver projects on-time and on-budget.

The solutions for the six "Showing Skills" problems are shown in listings F through K. I've provided the time I took to create the solution. The purpose is to give you a benchmark with which to gauge your productivity. For example, if you estimate 30 minutes for a problem and you're still working on it two hours later, that should tell you something constructive about your organization, coding skills, and debugging skills.

I used all available references for my solutions. When I interview people, I allow them to use references because employers never take away your programming books when they assign you a project. When given a programming assignment, you should feel free to ask about using reference books or the Internet.

Array destruction

An array that is instantiated with the new[] operator should also be deleted using the delete[] operator. Write a program that proves that the destructors for an array are not called when the array was instantiated with new [] and the array was deleted with delete (without the delete[] syntax).
My first version of the array destruction test in Listing F did not use the VCL (a Borland C++ compiler feature) and an access violation was thrown at runtime. I tried to wrap the delete with a try/catch, but the exception still wasn't caught. The debugger told me that an EAccessViolation exception was being thrown and the C++ Builder Help told me that it was defined in the VCL. So I converted the program to use the VCL and tried it again. The VCL version does not cause an access violation at runtime, so I removed the try/catch block in the code.

 
// An array that is instantiated with the new[] operator 
// should also be deleted using the delete[] operator.  
// Write a program that proves that the destructors for 
// an array are not called when the array was instantiated 
// with new [] and the array was deleted with delete 
// (without the delete[] syntax).

// This program took 15 minutes to write and debug.

#include <vcl.h>
#include <iostream>

using namespace std;   // okay for small programs

int g_LiveInstances = 0;

struct Trivial {
  Trivial() {
    cout << "Creating object #" << ++g_LiveInstances << endl;
  }
  virtual ~Trivial() {
    cout << "Deleting an object" << endl;
    --g_LiveInstances;
  }
};

int main(int, char**) {
  Trivial *p = new Trivial[5];
  delete p;

  // This should show:
  //    Number of Trivial instantiations remaining: 4
  cout << "Number of Trivial instantiations remaining: ";
  cout << g_LiveInstances << endl;
  return 0;
}

Listing F: Array Destruction Test
Caseless string comparison

Write a String class that compares its strings by ignoring the case of the characters.
I had two choices when writing the caseless string comparison solution in Listing G. I could either create my own string class that stores a string using a has-a relationship or I could override the compare method in the std::char_traits class. The former would require me to write helper functions for all of the public and protected constructors and methods. I chose the latter solution because its code should be limited to a specialized std::char_traits class.

Notice that I didn't have to write any specialized comparison methods (operator==, operator<, operator>, and others). I used the template supplied by the STL, which calls _Traits::compare(). The static compare() method in CaselessTrait was created by debug-tracing a normal std::string comparison into the char_traits.h file. I copy-pasted the definition of compare() from char_traits into the solution and changed the comparison function from memcpy to strnicmp.

 // Code and debug time:  35 minutes.

#include <iostream>
#include <string>


template <class _CharT>
class CaselessTrait : public std::char_traits<_CharT>
{
public:
  static int _STLP_CALL compare(const char* __s1, 
                                const char* __s2, 
                                size_t __n)
    { return strnicmp(__s1, __s2, __n); }

};


// Not asked for by the problem but I threw it in anyway
std::ostream
&operator<<(std::ostream &os,
            const std::basic_string<char, CaselessTrait<char>, 
            std::allocator<char> > &obj
           )
{
  os << obj.c_str();
  return os;
}


int main(int, char**) {
  typedef std::basic_string<char, CaselessTrait<char> > CaselessString;
  CaselessString test1 = "Hello World";
  CaselessString test2 = "hello world";

  std::cout << test1 << std::endl;
  std::cout << test2 << std::endl;

  if (test1 == test2) {
    std::cout << "Strings are equal" << std::endl;
  }
  else {
    std::cout << "String are not equal" << std::endl;
  }
  return 0;
}
Listing G: Caseless string comparison
Time difference

A comma-delimited file has two columns: timeA and timeB. Both columns are times in the following format: hh:mm [a|p]m

where:
    hh is from 1 to 12.
    mm is from 1 to 60.
    [a|p] is either an 'a' or 'p'.

Example file:
5:57 pm,10:37 am
Write a program that reads the comma-delimited text file. For each line in the text file, report the time that is earlier. Assume all times are in the same time zone and that all times are for the same day.

The time comparison solution in Listing H primarily converts both times into the number of minutes past midnight and then simply compares those two values. I added some code that reports errors, such as when the file can't be opened or when the data format is grossly wrong.

The parsing algorithm in decodeTime() assumes the data is in the right format. The problem doesn't require anything more than this but in a real interview I would ask if the program should check for incorrectly formatted data or invalid data, such as 11:88am. My am/pm detection only checks for "pm" and assumes all other values, including "PM", are "am". I could have easily used stricmp instead of operator==(), but at that point in the parser I was assuming that the data would be correctly formatted. These are the kinds of tradeoffs one makes when keeping the solution simple and staying within the deadline.

 
// Code and debug time:  45 minutes

#include <fstream>
#include <iostream>

// okay for small programs
using namespace std;

// Time converted to the number of minutes past midnight
typedef unsigned int Time;


// Given a data value of the form:
//   hh:mm [a|p]m
// convert the string to the number of
// minutes past midnight.
Time decodeTime(const string text) {
  string::size_type colonPos = text.find(':');
  string::size_type blankPos = text.find(' ');

  int hours = atoi(text.substr(0, colonPos).c_str());
  int mins  = atoi(text.substr(colonPos+1, blankPos-colonPos).c_str());
  string amPm = text.substr(blankPos+1);

  // "midnight" and "noon" are special because we want
  // the number of minutes past midnight... so switch a 12 into
  // a 0 to accomodate the calculation.
  if (hours == 12) hours = 0;

  Time minsPastMidnight = mins;

  if (amPm == "pm")
    minsPastMidnight += (12 + hours) * 60;
  else
    minsPastMidnight += hours * 60;

  return minsPastMidnight;
}


int main(int argc, char* argv[]) {
  ifstream csv("data.csv", ios::in);
  if (!csv) {
    cout << "Can not open data.csv\n";
    return 1;
  }

  string line;   // line from CSV file
  while (getline(csv, line, '\n')) {
    // find the ',' separator
    string::size_type commaPos = line.find(',');
    if (commaPos == string::npos) {
      cout << "Invalid CSV line: " << line << endl;
    }
    else {
      Time firstTime = decodeTime(line.substr(0, commaPos));
      Time secondTime = decodeTime(line.substr(commaPos+1));
      if (firstTime < secondTime)
        cout << line.substr(0, commaPos) << endl;
      else
        cout << line.substr(commaPos+1) << endl;
    }
  }
  return 0;
}

Listing H: Array Destruction Test
Recursive sort

Sort a linked list using recursion.
The recursive sort algorithm in Listing I took a lot longer than I would have expected. My implementation assumes that only the head pointer is available. A flag, sortAgain, is initialized to false and is used to tell Sort() if any of the nodes in the list were swapped. If RecursiveSort() returns with sortAgain still false, the list has been sorted. Otherwise, sortAgain is reset to false and the list is resorted.

To keep the algorithm simple, I didn't make any attempt to keep track of the sorted and unsorted parts of the list. The entire list is sorted every time RecursiveSort is called.

Recursive sort solutions that swap the key values or swap the struct's payload values should be considered failures. Shuffling the data inside of the list defeats the purpose of using a linked list. The main reason for using a linked list is because the data is supposedly large or difficult to copy. If that were not the case, then an array would have been used. List nodes are being used to point to the data. The head pointer and the next pointers are the only parts of the list that need to be modified to sort it.

Don't forget to test your final solution for an empty list and for a list with only one item in it. The first version of my algorithm would have thrown an access violation for an empty list.


// Code and debug time: 1 hour, ten minutes.

#include <stdlib.h>   // for rand()
#include <algorithm>
#include <function>
#include <iostream>

struct List {
  List(int val) : key(val), next(NULL)
  {}
  int key;
  List *next;
};


// Called by Sort(List *) to recursively sort the
// linked list.
//
List * RecursiveSort(List *current, List *prev, bool &sortAgain) {
  List *head = current;

  if (current == NULL || current->next == NULL)
    return current;    // nothing to sort

  if (current->key > current->next->key) {
    if (prev == NULL) {
      head = current->next;
      current->next = head->next;
      head->next = current;
      current = head;
      sortAgain = true;
    }
    else {
      // The unsorted order of the nodes is:
      //    prev, current, node, after
      // The sorted order of the nodes is:
      //    prev, node, current, after
      List *node = current->next;
      List *after = node->next;

      head = current->next;
      prev->next = node;
      current->next = after;
      node->next = current;

      sortAgain = true;
    }
  }

  if (current->next != NULL) {
    RecursiveSort(current->next, current, sortAgain);
  }

  return head;
}



// Sort the single-linked list.
List * Sort(List *head) {
  // Keep sorting the list until the entire
  // list is sorted.
  bool sortAgain = false;
  do {
    sortAgain = false;
    head = RecursiveSort(head, NULL, sortAgain);
  } while (sortAgain == true);
  return head;
}


// Print the keys of the list separated by commas.
void Print(const List *head) {
  const List *node = head;
  std::cout << "List: ";
  while (node != NULL) {
    std::cout << node->key << ",";
    node = node->next;
  }
  std::cout << "\n";
}



int main(int, char**)
{
  // Create an unsorted array that will
  // be transformed into an unsorted linked
  // list.
  int a[10];
  const int numElements = sizeof(a) / sizeof(int);
  for(int i = 0; i < numElements; ++i)
    a[i] = i * (i % 2 ? -1 : 1);
  randomize();
  std::random_shuffle(&a[0], &a[numElements]);

  // Transfer the unsorted array into a list...
  List *head = NULL;
  List *tail = NULL;
  for(int i = 0; i < numElements; ++i) {
    List *node = new List(a[i]);
    if (head == NULL) {
      head = node;
      tail = node;
    }
    else {
      tail->next = node;
      tail = node;
    }
  }

  std::cout << "Before sort:\n";
  Print(head);

  head = Sort(head);

  std::cout << "\nAfter sort:\n";
  Print(head);

  return 0;
}

Listing I: Recursive Sort
Iterative list sorting

Sort a linked list without using recursion.
Listing J shows my solution for nonrecursively sorting the single-linked list. I cheated a little bit and used the recursive sort solution from listing I as a starting point. It's not really cheating, though, because I'm allowed to use whatever resources are available.

In the process of looking at the swap algorithm a second time, I noticed it could be improved a little. I think the version in listing J is a little clearer because only the work that's needed for the boundary condition (the very first element in the list) is inside of the if statement.

 
// Code and debug time: 15 minutes (using the RecursiveSort.cpp 
// as a starting point)

#include <stdlib.h>   // for rand()
#include <algorithm>
#include <function>
#include <iostream>

struct List {
  List(int val) : key(val), next(NULL)
  {}
  int key;
  List *next;
};


// Sort the single-linked list.
List * Sort(List *head) {
  if (head == NULL || head->next == NULL)
    return head;    // nothing to sort

  List *prev = NULL;
  List *current = NULL;

  bool sortAgain = false;
  do {
    sortAgain = false;
    current = head;
    prev = NULL;
    while (current != NULL && current->next != NULL) {
      if (current->key > current->next->key) {
        sortAgain = true;

        // The unsorted order of the nodes is:
        //    prev, current, node, after
        // The sorted order of the nodes is:
        //    prev, node, current, after
        List *node = current->next;
        List *after = node->next;

        if (prev == NULL) {
          head = current->next;
        }
        else {
          prev->next = node;
        }
        current->next = after;
        node->next = current;
      }
      prev = current;
      current = current->next;
    }
  } while (sortAgain == true);

  return head;
}



// Print the keys of the list separated by commas.
void Print(const List *head) {
  const List *node = head;
  std::cout << "List: ";
  while (node != NULL) {
    std::cout << node->key << ",";
    node = node->next;
  }
  std::cout << "\n";
}



int main(int, char**)
{
  // Create an unsorted array that will
  // be transformed into an unsorted linked
  // list.
  int a[10];
  const int numElements = sizeof(a) / sizeof(int);
  for(int i = 0; i < numElements; ++i)
    a[i] = i * (i % 2 ? -1 : 1);
  randomize();
  std::random_shuffle(&a[0], &a[numElements]);

  // Transfer the unsorted array into a list...
  List *head = NULL;
  List *tail = NULL;
  for(int i = 0; i < numElements; ++i) {
    List *node = new List(a[i]);
    if (head == NULL) {
      head = node;
      tail = node;
    }
    else {
      tail->next = node;
      tail = node;
    }
  }

  std::cout << "Before sort:\n";
  Print(head);

  head = Sort(head);

  std::cout << "\nAfter sort:\n";
  Print(head);

  return 0;
}

Listing J: Iterative List Sorting
Reversing a single linked list

Reverse a single-linked list without using recursion.
My solution for reversing the single-linked list, in Listing K, was based on the code in Listing J. The solution does not overwrite the next pointer for the head node until the entire list has been sorted. I thought this would be easier than checking, on each loop iteration, if the head node was being modified.

As with the sorting solutions, any solutions that involve moving the data values instead of changing the head and next pointers is a failure.

If I were to provide the linked list problems as an interviewer, I would provide everything in the solution except for the sorting or reversing method and everything in the main() function up to the first Print method.

 
// Code and debug time: 20 minutes (using the 
// IterativeSort.cpp as a starting point)

#include <iostream>

struct List {
  List(int val) : key(val), next(NULL)
  {}
  int key;
  List *next;
};



// Print the keys of the list separated by commas.
void Print(const List *head) {
  const List *node = head;
  std::cout << "List: ";
  while (node != NULL) {
    std::cout << node->key << ",";
    node = node->next;
  }
  std::cout << "\n";
}


List * ReverseList(List *head) {
  if (head == NULL || head->next == NULL)
    return head;    // Nothing to reverse;

  // Reverse the list except for the
  // head node.
  List *prev = head;
  List *current = prev->next;
  while (current != NULL) {
      List *after = current->next;
      current->next = prev;    // reverse the list
      prev = current;
      current = after;
  }

  // In the reversed list, the head element becomes
  // the last element, so terminate the list at
  // the head element
  head->next = NULL;
  return prev;
}


int main(int, char**)
{
  const int numElements = 10;

  // Create a list from 0..9:
  List *head = NULL;
  List *tail = NULL;
  for(int i = 0; i < numElements; ++i) {
    List *node = new List(i);
    if (head == NULL) {
      head = node;
    }
    else {
      tail->next = node;
    }
    tail = node;
  }

  std::cout << "Before Reverse:\n";
  Print(head);

  head = ReverseList(head);

  std::cout << "\nAfter Reverse:\n";
  Print(head);

  return 0;
}

Listing K: Reversing a Single Linked List









	
	
Answers for C++ Language Lawyer Questions
by Curtis Krauskopf
Language lawyer questions sometimes seem pointless, but they come into practice when you're modifying a program written by someone else. The previous developer might have misunderstood a part of the language or the language might have changed since the code was written. Being able to know the details of the language and even know how the language has changed over the years shows that you're able to understand the existing programs that the customer or employer has.

Q1) Show an example of a valid C program that fails to compile in C++.

A1) Use any C++ keyword that doesn't exist in C. The class keyword is a good example: int class = 5;

Q2) Show an example of a valid C program that compiles cleanly in C++ but gives a different result.

A2) This one is a little bit trickier. We want some feature in C++ that wasn't backwards compatible with C. Thinking outside of the box, you could come up with:


#ifdef __cplusplus
  printf("I am C++\n");
#else
  printf("I am C\n");
#endif

The interviewer might accept that the __cplusplus compiler directive was not defined in a normal C program.

However, keeping with the spirit of the question, there are a couple reasonable solutions available:

1. C++ comments use both // and /* */ whereas standard C uses only //. If you can construct an expression in a C program that contains /* and */, it will compile cleanly in both compilers but give different runtime results.

2. Literal characters in C (such as 'a'), are of type int. Therefore, in C, sizeof('a') is the same as sizeof(int). Literal characters in C++ are of type char. On all Borland C++ compilers, sizeof(int) != sizeof(char).

David Tribble's web site contains a detailed synopsis of the incompatibilities between C and C++.

Q3) Why won't this compile?


for (int i = 0; i < 10; i++) {
  for (int k = 0; k < 10; k++) {
    if (e == 0) goto next_i;
  }
  next_i;
} 


A3) The next_i label needs a colon (:) after it, like this: next_i:

Q4) Is there a "placement delete"?

A4) No, but you can write your own. Stroustrup discusses this on his C++ FAQ page at att.com.








	
Answers to Unfair C++ Job Interview Questions
by Curtis Krauskopf
Preparing for unfair questions will also prepare you for the toughest 'fair' questions. In both cases, just remain calm, think about your answer and then proceed. Whatever you do, don't argue with the interviewer or complain that the question is unfair.

If it's a legally unfair question (a question that should not be asked during an interview), then proceed using your best judgment. An article on CareerBuilder.com that is no longer available provided several provided several techniques for dodging a question without being antagonistic:

In the United States...

[t]here are several questions that employers may not legally ask applicants. Federal law attempts to ensure that candidates are hired on job qualifications and not by prejudicial criteria. Questions structured to obtain information on race, gender, religion, marital status, age, physical and/or mental status, ethnic background, country of origin, sexual preference, or any other discriminatory factor are generally illegal as grounds for making employment decisions. With few exceptions, these factors contribute nothing to your ability to perform a job, and an employer must substantiate those cases where a direct relationship is thought to exist. Anything that is not a bona fide occupational qualification may not be covered directly, although the interviewer may seek the information indirectly.
Most unfair questions that are not illegal do not have a specific right answer. Many of them depend on your people-skills and being able to read the situation. Consider the situation the same as if you were working a trade-show booth and a potential customer came up to you and asked you a loaded or unfair question. How would you turn that situation around to be a positive for your company and for yourself?

I personally know one person who was given exactly that kind of situation at a trade show. Unbeknownst to my coworker, his company's president was within earshot of the entire exchange. Within two months, my coworker was promoted to a much higher position within the company. Part of the promotion was due to hard work, but part of it was undoubtedly due to the way he handled the customer that had a problem. The other lesson in this example is that you're always interviewing for your next position. Practicing your people-skills will set you apart from the workers who just write code all day long.

Q1) The interviewer looks up from his newspaper, tosses a pencil at you and says, "Sell me this pencil". The interviewer immediately returns to reading his newspaper.

A1) You might be able to relate to this question if you've ever had to sell a programming idea to a negative audience or had to get your boss' attention on an important matter when she seemed distracted. Remember that there is no right answer so whatever you do, other than complain, is an acceptable answer.

Depending on your personality, you might take a passive approach and simply toss the pencil back to the interviewer and say, "Here, you just bought it". A more aggressive responder would yank the newspaper from the interviewer and go into a sales pitch that starts with "You need this pencil because...". If you have the interviewer's phone number in your cell phone, you could call the interviewer and start selling them the pencil when they answer the phone. Do whatever suits your personality best - this way, you will feel the most comfortable while answering the question.

Q2) The interviewer hands you a black pen and says nothing but "This pen is red."

A2) Remember the interviewer I had that thought Java and JavaScript were the same thing? This is almost the same type of question but in my case, the interviewer was seriously ignorant. When I looked at his coworkers to get a read of whether he was trying to trick me or not, they were so embarrassed that they looked like they wanted to crawl under the table.

For the red pen problem, I would write on a piece of paper to see if the ink was black or red even though the outer shell was black. You never know -- he might have installed the ink reservoir from a red pen. If the ink was red, I would agree with him. If it was black, I would show him the proof on the paper.

Q3) Write a program whose output is its own source code.

A3) A program whose output is its own source is called a quine. Some people think those kinds of programs are interesting. The techniques involved in making a quine have applications in compiler, decompiler, and encryption technologies.

Depending on the mood of the interviewer, you could initially try:


cout << "its own source code";

which the interviewer would have to admit does answer the question. A solution that is closer to the spirit of the question is in Listing L.

The interviewer might insist on a self-contained solution that doesn't use external files or resources. I found one on the Internet that is only four lines of code.

 #include<stdio.h>
#include<conio.h>
#include<iostream.h>

int main(int, char**) {
  FILE *fp;
  fp = fopen("myself.cpp","r");
  char buffer[80];
  while (fgets(buffer,sizeof(buffer),fp)) {
    cout << buffer;
  }
  return 0;
}
Listing L: A program whose output is its own source code.
Q4) Tell me the funniest programming joke you've ever heard.

A4) For this unfair question, there's obviously no right answer and the interviewer is just seeing how well you can think "on-your-feet". If you can't think of a joke, you can just make one up on the spot. You can make your own variation of a classic joke ("Three programmers walk into a bar...") or tell about a time when something humorous happened at work. You could resite your favorite xkcd cartoon.

Whatever your response, remember to have fun with the unfair questions. If the question is clearly unfair, and the interviewer just wants to see how you respond to a situation, then go along with the situation. You can decide later if you want to work for the company based on the kinds of interview questions that were asked.
















---------------------------------------------------------------------------------------------------- 

	23.3 
	23.4 
	23.5 
	23.6 
	23.7 
	23.8 
	23.9 
```
