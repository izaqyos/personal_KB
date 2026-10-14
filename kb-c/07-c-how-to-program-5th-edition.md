---
type: reference
title: "C How to Program, 5th edition"
description: Section 7 of the legacy c-kb notes.
tags: [kb-c]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "c-kb#7"
---

# C How to Program, 5th edition

[↑ c-kb](/kb-c/README.md)

## 7.1 Introduction

### 7.1.1 History of C

```text
C evolved from two previous languages, BCPL and B. BCPL was developed in 1967 by
Martin Richards as a language for writing operating-systems software and compilers. Ken
Thompson modeled many features in his B language after their counterparts in BCPL,
and in 1970 he used B to create early versions of the UNIX operating system at Bell Laboratories
on a DEC PDP-7 computer. Both BCPL and B were “typeless” languages—every
data item occupied one “word” in memory, and the burden of typing variables fell on
the shoulders of the programmer.
The C language was evolved from B by Dennis Ritchie at Bell Laboratories and was
originally implemented on a DEC PDP-11 computer in 1972. C uses many of the important
concepts of BCPL and B while adding data typing and other powerful features. C ini-tially became widely known as the development language of the UNIX operating system.
Today, virtually all new major operating systems are written in C and/or C++. C is available
for most computers. C is also hardware independent. With careful design, it is possible
to write C programs that are portable to most computers.
By the late 1970s, C had evolved into what is now referred to as “traditional C.” The
publication in 1978 of Kernighan and Ritchie’s book, The C Programming Language, drew
wide attention to the language. This became one of the most successful computer science
books of all time.
The rapid expansion of C over various types of computers (sometimes called hardware
platforms) led to many variations that were similar but often incompatible. This was
a serious problem for programmers who needed to develop code that would run on several
platforms. It became clear that a standard version of C was needed. In 1983, the X3J11
technical committee was created under the American National Standards Committee on
Computers and Information Processing (X3) to “provide an unambiguous and machineindependent
definition of the language.” In 1989, the standard was approved; this standard
was updated in 1999. The standards document is referred to as INCITS/ISO/IEC 9899-1999. Copies may be ordered from the American National Standards Institute
(www.ansi.org) at webstore.ansi.org/ansidocstore.
C99 is a revised standard for the C programming language that refines and expands
the capabilities of C. C99 has not been widely adopted, and not all popular C compilers
support it. Of the compilers that do offer C99 support, most implement only a subset of
the new features. Chapters 1–16 of this book are based on the widely adopted international
Standard (ANSI/ISO) C. Chapter 17 introduces C99 and provides links to popular
C99 compilers and IDEs.
Portability Tip 1.1
Because C is a hardware-independent, widely available language, applications written in C can
run with little or no modifications on a wide range of different computer systems. 1.1
[Note: We will include many of these Portability Tips to highlight techniques that
will help you write programs that can run, with little or no modification, on a variety of
computers. We will also highlight Good Programming Practices (practices that can help
you write programs that are clear, understandable, maintainable and easy to test and
debug—that is, eliminate errors), Common Programming Errors (problems to watch out
for, so you do not make these same errors in your programs), Performance Tips (techniques
that will help you write programs that run faster and use less memory), Error-Prevention
Tips (techniques that will help you remove bugs from your programs and, more
important, help you write bug-free programs in the first place) and Software Engineering
Observations (concepts that affect and improve the overall architecture and quality of a
software system, and particularly of large software systems). Many of these techniques and
practices are only guidelines; you will, no doubt, develop your own preferred programming
style.]
```

### 7.1.2 C Standard Library

```text
As you will learn in Chapter 5, C programs consist of modules or pieces called functions.
You can program all the functions you need to form a C program, but most C programmers
take advantage of a rich collection of existing functions called the C Standard Li-brary. Thus, there are really two pieces to learning how to program in C. The first is
learning the C language itself, and the second is learning how to use the functions in the
C Standard Library. Throughout the book, we discuss many of these functions. P.J.
Plauger’s The Standard C Library is required reading for programmers who need a deep
understanding of the library functions, how to implement them and how to use them to
write portable code.
This textbook encourages a building-block approach to creating programs. Avoid
reinventing the wheel. Instead, use existing pieces—this is called software reusability, and
it is a key to the developing field of object-oriented programming, as we will see in our
treatment of C++ beginning in Chapter 18. When programming in C you will typically
use the following building blocks:
• C Standard Library functions
• Functions you create yourself
• Functions other people have created and made available to you
The advantage of creating your own functions is that you will know exactly how they
work. You will be able to examine the C code. The disadvantage is the time-consuming
effort that goes into designing, developing and debugging new functions.
If you use existing functions, you can avoid reinventing the wheel. In the case of the
Standard C functions, you know that they are carefully written, and you know that
because you are using functions that are available on virtually all Standard C implementations,
your programs will have a greater chance of being portable and error-free.
Performance Tip 1.1
Using Standard C library functions instead of writing your own comparable versions can improve
program performance, because these functions are carefully written to perform efficiently.1.1
Portability Tip 1.2
Using Standard C library functions instead of writing your own comparable versions can improve
program portability, because these functions are used in virtually all Standard C implementations.
```

### 7.1.3 C++

```text
C++ was developed by Bjarne Stroustrup at Bell Laboratories. It has its roots in C, providing
a number of features that “spruce up” the C language. More important, it provides capabilities
for object-oriented programming. C++ has become a dominant language in
both industry and universities.
Objects are essentially reusable software components that model items in the real
world. Software developers are discovering that using a modular, object-oriented design
and implementation approach can make software development groups much more productive
than is possible with conventional programming techniques.
Many people feel that the best educational strategy today is to master C, then study
C++. Therefore, in Chapters 18–27 of C How to Program: Fifth Edition, we present a condensed
treatment of C++ selected from our book C++ How to Program.We hope that you
find this valuable and that it will encourage you to pursue further study of C++ after com-pleting this book. As you study C++, check out our online C++ Resource Center at
www.deitel.com/cplusplus.
```

### 7.1.4 Java

```text
Many people believe that the next major area in which microprocessors will have a profound
impact is that of intelligent consumer electronic devices. In 1991, recognizing this,
Sun Microsystems funded an internal corporate research project code-named Green. The
project resulted in the development of a language based on C and C++, which its creator,
James Gosling, called Oak after an oak tree outside his window at Sun. It was later discovered
that there already was a computer language called Oak. When a group of Sun people
visited a local coffee place, the name Java was suggested and it stuck.
The Green project ran into some difficulties. The marketplace for intelligent consumer
electronic devices was not developing as quickly as Sun had anticipated. Worse yet,
a major contract for which Sun had competed was awarded to another company, putting
the project in danger of being canceled. By sheer good fortune, the World Wide Web
exploded in popularity in 1993, and Sun saw the immediate potential of using Java to
create web pages with so-called dynamic content.
Sun formally announced Java at a trade show in May 1995. Ordinarily, an event such
as this would not have generated much attention, but Java generated immediate interest
in the business community because of the phenomenal interest in the World Wide Web.
Java is now used to create web pages with dynamic and interactive content, develop largescale
enterprise applications, enhance the functionality of web servers (the computers that
provide the content we see in web browsers), provide applications for consumer devices
(such as cell phones, pagers and personal digital assistants) and do many more things.
In November of 1995, we were following the development of Java by Sun Microsystems
and we attended an Internet conference in Boston. A representative from Sun Microsystems
gave a rousing presentation on Java. As the talk proceeded, it became clear to us
that Java would certainly play a significant part in the development of interactive, multimedia
web pages. But we immediately saw a much greater potential for the language. We
saw Java as a superb language for teaching programming language students the essentials
of graphics, images, animation, audio, video, database, networking, multithreading and
collaborative computing.
In addition to its prominence in developing Internet- and intranet-based applications,
Java has become the language of choice for implementing software for devices that communicate
over a network (such as cellular phones, pagers and personal digital assistants).
Do not be surprised when your new stereo and other devices in your home are networked
together using Java technology!
```

### 7.1.5 BASIC, Visual Basic, Visual C++, Visual C# and .NET

```text
The BASIC (Beginner’s All-Purpose Symbolic Instruction Code) programming language
was developed in the mid-1960s by Professors John Kemeny and Thomas Kurtz of Dartmouth
College as a language for writing simple programs. BASIC’s primary purpose was
to familiarize novices with programming techniques. Visual Basic was introduced by Microsoft
in 1991 to simplify the process of developing Microsoft Windows applications.
Visual Basic, Visual C++ and Visual C# are designed for Microsoft’s new .NET programming
platform. All three languages make use of .NET’s powerful library of reusable
software components called the Framework Class Library (FCL).
Comparably to Java, the .NET platform enables web-based applications to be distributed
to many devices (even cell phones) and to desktop computers. The C# programming
language was designed specifically for the .NET platform as a language that would enable
programmers to migrate easily to .NET. C++, Java and C# all have their roots in the C programming
language.
```

### 7.1.6 Key Software Trend: Object Technology

```text
One of the authors, HMD, remembers the great frustration that was felt in the 1960s by
software development organizations, especially those developing large-scale projects. During
his undergraduate years, HMD had the privilege of working summers at a leading
computer vendor on the teams developing timesharing, virtual-memory operating systems.
This was a great experience for a college student. In the summer of 1967, reality set
in when the company “decommitted” from producing as a commercial product the particular
system on which hundreds of people had been working for many years. It was difficult
to get this software right. Software is “complex stuff.”
Improvements to software technology did start to appear, with the benefits of socalled
structured programming (and the related disciplines of structured systems analysis
and design) being realized in the 1970s. But not until the 1990s, when the technology of
object-oriented programming became widely used, did software developers finally feel
they had the tools for making major strides in the software development process.
Actually, object technology dates back to the mid 1960s. The C++ programming language,
developed at AT&T by Bjarne Stroustrup in the early 1980s, is based on two languages—
C and Simula 67, a simulation programming language developed in Europe and
released in 1967. C++ absorbed the features of C and added Simula’s capabilities for creating
and manipulating objects. Neither C nor C++ was originally intended for wide use
beyond the AT&T research laboratories. But grassroots support rapidly developed for
each.
What are objects and why are they special? Object technology is a packaging scheme
that enables programmers to create meaningful software units. These are large and highly
focused on particular applications areas. There are date objects, time objects, paycheck
objects, invoice objects, audio objects, video objects, file objects, record objects and so on.
In fact, almost any noun can be reasonably represented as an object.
We live in a world of objects. Just look around you. There are cars, planes, people,
animals, buildings, traffic lights, elevators, and the like. Before object-oriented languages
appeared, programming languages (such as Fortran, Pascal, Basic and C) were focused on
actions (verbs) rather than on things or objects (nouns). Now, with the availability of popular
object-oriented languages such as Java and C++, programmers continue to live in an
object-oriented world but can conveniently program in an object-oriented (noun-oriented)
manner. This is a more natural process than procedural programming and has
resulted in significant productivity enhancements.
A key problem with procedural programming is that the program units do not easily
mirror real-world entities effectively, so these units are not particularly reusable. It is not
unusual for programmers to “start fresh” on each new project and have to write similar software “from scratch.” Time and money are wasted as people repeatedly reinvent the
wheel. With object technology, the software entities created (called classes), if properly
designed, tend to be much more reusable on future projects. Using libraries of reusable
componentry, such as the .NET FCL and those produced by many other software development
organizations, can greatly reduce the amount of effort required to implement certain
kinds of systems (as compared to the effort reinventing these capabilities on new
projects).
Some organizations report that software reuse is not, in fact, the key benefit they get
from object-oriented programming. Rather, object-oriented programming tends to produce
software that is more understandable, better organized and easier to maintain,
modify and debug. This can be significant, because it has been estimated that as much as 80% of software costs are associated not with the original efforts to develop the software
but with the continued evolution and maintenance of that software throughout its lifetime.
Clearly, whatever its perceived benefits, object-oriented programming will be the key
programming methodology for the next several decades.
```

### 7.1.7 Typical C Program Development Environment

```text
C systems generally consist of several parts: a program development environment, the language
and the C Standard Library. The following discussion explains the typical C development
environment shown in Fig. 1.1.
C programs typically go through six phases to be executed (Fig. 1.1). These are: edit,
preprocess, compile, link, load and execute. Although C How to Program is a generic C
textbook (written independently of the details of any particular operating system), we concentrate
in this section on a typical Linux-based C system. [Note: The programs in this
book will run with little or no modification on most current C systems, including
Microsoft Windows-based systems.] If you are not using a Linux system, refer to the manuals
for your system or ask your instructor how to accomplish these tasks in your environment.
Also, check out our C Resource Center at www.deitel.com/C to locate “getting
started” tutorials for popular C compilers and development environments.
Phase 1: Creating a Program
Phase 1 consists of editing a file. This is accomplished with an editor program. Two editors
widely used on Linux systems are vi and emacs. Software packages for the C/C++ integrated
program development environments such as Borland C++ Builder and Microsoft
Visual Studio have editors that are integrated into the programming environment. We assume
that the reader knows how to edit a program. The programmer types a C program
with the editor, makes corrections if necessary, then stores the program on a secondary
storage device such as a disk. C program file names should end with the .c extension.
Phases 2 and 3: Preprocessing and Compiling a C Program
In Phase 2, the programmer gives the command to compile the program. The compiler
translates the C program into machine language-code (also referred to as object code). In
a C system, a preprocessor program executes automatically before the compiler’s translation
phase begins. The C preprocessor obeys special commands called preprocessor directives,
which indicate that certain manipulations are to be performed on the program before compilation. These manipulations usually consist of including other files in the file
to be compiled and performing various text replacements. The most common preprocessor
directives are discussed in the early chapters; a detailed discussion of preprocessor fea-tures appears in Chapter 13. In Phase 3, the compiler translates the C program into
machine-language code.
Phase 4: Linking
The next phase is called linking. C programs typically contain references to functions defined
elsewhere, such as in the standard libraries or in the private libraries of groups of programmers
working on a particular project. The object code produced by the C compiler
typically contains “holes” due to these missing parts. A linker links the object code with
the code for the missing functions to produce an executable image (with no missing pieces).
On a typical Linux system, the command to compile and link a program is called cc
(or gcc). To compile and link a program named welcome.c type
cc welcome.c
at the Linux prompt and press the Enter key (or Return key). [Note: Linux commands are
case sensitive; make sure that you type lowercase c’s and that the letters in the filename are
in the appropriate case.] If the program compiles and links correctly, a file called a.out is
produced. This is the executable image of our welcome.c program.
Phase 5: Loading
The next phase is called loading. Before a program can be executed, the program must first
be placed in memory. This is done by the loader, which takes the executable image from
disk and transfers it to memory. Additional components from shared libraries that support
the program are also loaded.
Phase 6: Execution
Finally, the computer, under the control of its CPU, executes the program one instruction
at a time. To load and execute the program on a Linux system, type ./a.out at the Linux
prompt and press Enter.
Problems That May Occur at Execution Time
Programs do not always work on the first try. Each of the preceding phases can fail because
of various errors that we will discuss. For example, an executing program might attempt
to divide by zero (an illegal operation on computers just as in arithmetic). This would
cause the computer to print an error message. You would then return to the edit phase,
make the necessary corrections and proceed through the remaining phases again to determine
that the corrections work properly.
Most programs in C input and/or output data. Certain C functions take their input
from stdin (the standard input stream), which is normally the keyboard, but stdin can
be connected to another stream. Data is often output to stdout (the standard output
stream), which is normally the computer screen, but stdout can be connected to another
stream. When we say that a program prints a result, we normally mean that the result is
displayed on a screen. Data may be output to devices such as disks and printers. There is
also a standard error stream referred to as stderr. The stderr stream (normally connected
to the screen) is used for displaying error messages. It is common to route regular
output data, i.e., stdout, to a device other than the screen while keeping stderr assigned
to the screen so that the user can be immediately informed of errors. 
```

### 7.1.8 Hardware Trends

```text
Every year, people generally expect to pay at least a little more for most products and services.
The opposite has been the case in the computer and communications fields, especially
with regard to the costs of hardware supporting these technologies. For many
decades, hardware costs have fallen rapidly, if not precipitously. Every year or two, the capacities
of computers have approximately doubled without any increase in price. This often
is called Moore’s Law, named after the person who first identified and explained the
trend, Gordon Moore, cofounder of Intel—the company that manufactures the vast majority
of the processors in today’s personal computers. Moore’s Law and similar trends are
especially true in relation to the amount of memory that computers have for programs, the
amount of secondary storage (such as disk storage) they have to hold programs and data
over longer periods of time, and their processor speeds—the speeds at which computers
execute programs (i.e., do their work). Similar growth has occurred in the communications
field, in which costs have plummeted as demand for communications bandwidth has
attracted intense competition. We know of no other fields in which technology improves
so quickly and costs fall so rapidly. Such improvement in the computing and communications
fields is truly fostering the so-called Information Revolution.
When computer use exploded in the 1960s and 1970s, many people discussed the
dramatic improvements in human productivity that computing and communications
would cause, but these improvements did not materialize. Organizations were spending
vast sums of money on these technologies, but without realizing the expected productivity
gains. The invention of microprocessor chip technology and its wide deployment in the
late 1970s and 1980s laid the groundwork for the productivity improvements that individuals
and businesses have achieved in recent years.
```

### 7.1.9 History of the Internet

```text
In the late 1960s, one of the authors (HMD) was a graduate student at MIT. His research
at MIT’s Project Mac (now the Laboratory for Computer Science—the home of the
World Wide Web Consortium) was funded by ARPA—the Advanced Research Projects
Agency of the Department of Defense. ARPA sponsored a conference at which several dozen
ARPA-funded graduate students were brought together at the University of Illinois at
Urbana-Champaign to meet and share ideas. During this conference, ARPA rolled out the
blueprints for networking the main computer systems of about a dozen ARPA-funded universities
and research institutions. They were to be connected with communications lines
operating at a then-stunning 56KB (i.e., 56,000 bits per second), at a time when most people
(of the few who could) were connecting over telephone lines at a rate of 110 bits per
second. HMD vividly recalls the excitement at that conference. Researchers at Harvard in
Massachusetts talked about communication with the Univac 1108 “supercomputer”

across the country at the University of Utah to handle calculations related to their computer
graphics research. Many other intriguing possibilities were raised. Academic research
was about to take a giant leap forward. Shortly after this conference, ARPA proceeded to
implement what quickly became called the ARPAnet, the grandparent of today’s Internet.
Things worked out differently than originally planned. Although the ARPAnet did
enable researchers to share each others’ computers, its chief benefit proved to be its capability
of quick and easy communication via what came to be known as electronic mail (email).
This is true even today on the Internet, with e-mail and other services facilitating
communications of all kinds among nearly a billion people worldwide.
One of ARPA’s primary goals for the network was to allow multiple users to send and
receive information at the same time over the same communications paths (such as phone
lines). The network operated with a technique called packet switching, in which digital
data was sent in small packages called packets. The packets contained data, address information,
error-control information and sequencing information. The address information
was used to route the packets of data to their destination. The sequencing information was
used to help reassemble the packets (which—because of complex routing mechanisms—
could actually arrive out of order) into their original order for presentation to the recipient.
Packets of many people were intermixed on the same lines. This packet-switching technique
greatly reduced transmission costs as compared to those of dedicated communications
lines.
The network was designed to operate without centralized control. This meant that if
a portion of the network should fail, the remaining working portions would still be able
to route packets from senders to receivers over alternate paths.
The protocol for communicating over the ARPAnet became known as TCP—the
Transmission Control Protocol. TCP ensured that messages were properly routed from
sender to receiver and that they messages arrived intact.
In parallel with the early evolution of the Internet, organizations worldwide were
implementing their own networks for both intraorganization (i.e., within the organization)
and interorganization (i.e., between organizations) communication. A huge variety
of networking hardware and software appeared. One challenge was to get these to intercommunicate.
ARPA accomplished this with the development of IP—the Internetworking
Protocol), truly creating a “network of networks,” the current architecture of the
Internet. The combined set of protocols is now commonly called TCP/IP.
Initially, use of the Internet was limited to colleges and research institutions; then the
military became a big user. Eventually, the government decided to allow access to the
Internet for commercial purposes. At first there was resentment among the research and
military communities—it was felt that response times would become poor as “the net”
became saturated with so many users.
In fact, the exact opposite has occurred. Businesses rapidly realized that, by making
effective use of the Internet, they could tune their operations and offer new and better services
to their clients, so they started spending vasts amounts of money to develop and
enhance the Internet. This generated fierce competition among the communications carriers
and the hardware and software suppliers to meet the demand. The result is that bandwidth
(i.e., the information-carrying capacity of communications lines) on the Internet
has increased tremendously and costs have plummeted. Countries worldwide now realize
that the Internet is crucial to their economic prosperity and competitiveness.
```

### 7.1.10 History of theWorldWideWeb

```text
The World Wide Web allows computer users to locate and view over the Internet multimedia-
based documents (i.e., documents with text, graphics, animations, audios and/or
videos) on almost any subject. Even though the Internet was developed more than three
decades ago, the introduction of the World Wide Web was a relatively recent event. In 1990, Tim Berners-Lee of CERN (the European Laboratory for Particle Physics) developed
the World Wide Web and several communication protocols that form its backbone.
The Internet and the World Wide Web will surely be listed among the most important
and profound creations of humankind. In the past, most computer applications ran
on “stand-alone” computers, i.e., computers that were not connected to one another.
Today’s applications can be written to communicate among the world’s hundreds of millions
of computers. The Internet mixes computing and communications technologies. It
makes our work easier. It makes information instantly and conveniently accessible worldwide.
It enables individuals and small businesses to get worldwide exposure. It is changing
the way business is done. People can search for the best prices on virtually any product or
service. Special-interest communities can stay in touch with one another. Researchers can
be made instantly aware of the latest breakthroughs worldwide. 
```

### 7.1.11 Notes About C and This Book

```text
Experienced C programmers sometimes take pride in being able to create weird, contorted,
convoluted usages of the language. This is a poor programming practice. It makes programs
more difficult to read, more likely to behave strangely, more difficult to test and
debug and more difficult to adapt to changing requirements. This book is geared for novice
programmers, so we stress program clarity. The following is our first “good programming
practice.”
Good Programming Practice 1.1
Write your C programs in a simple and straightforward manner. This is sometimes referred to
as KIS (“keep it simple”). Do not “stretch” the language by trying bizarre usages. 1.1
You may have heard that C is a portable language and that programs written in C can
run on many different computers. Portability is an elusive goal. The Standard C document
contains a lengthy list of portability issues, and complete books have been written that discuss
portability.
Portability Tip 1.3
Although it is possible to write portable programs, there are many problems between different C
compilers and different computers that make portability difficult to achieve. Simply writing programs
in C does not guarantee portability. The progammer will often need to deal directly with
complex computer variations. 1.3
We have done a careful walkthrough of the C Standard document and audited our
presentation against it for completeness and accuracy. However, C is a rich language, and
there are some subtleties in the language and some advanced subjects we have not covered.
If you need additional technical details on C, we suggest that you read the C Standard document
itself or the book by Kernighan and Ritchie.

We have limited our discussions in Chapters 1–16 to ANSI/ISO C. Many features of
this version of C are not compatible with older C implementations, so you may find that
some of the programs in this text do not work on older C compilers. Chapter 17 introduces
the newer C99 standard, which has not been widely accepted, but whose use is
growing.
Software Engineering Observation 1.1
Read the manuals for the version of C you are using. Reference these manuals frequently to be
sure you are aware of the rich collection of C features and that you are using these features
correctly. 1.1
Software Engineering Observation 1.2
Your computer and compiler are good teachers. If you are not sure how a feature of C works,
write a sample program with that feature, compile and run the program and see what happens. 1.2
```

### 7.1.12 Web Resources

```text
C Standard and Working Group
If you’d like to look at the precise definition of the C language or to follow the working
group that maintains and evolves C, visit the following sites:
www.open-std.org/jtc1/sc22/wg14/
Homepage of the C working group that governs the evolution of the C standard.
www.open-std.org/jtc1/sc22/wg14/www/C99RationaleV5.10.pdf
Rationale for the C standard. This document explains many changes that have been made to C over
the years.
www.open-std.org/jtc1/sc22/wg14/www/standards.html#9899
Provides access to the most recent publicly accessible version of the international C standard document,
the rationale for C99 and Technical Corrigendum 1 and Technical Corrigendum 2.
Free C/C++ Compilers and Development Tools
msdn.microsoft.com/vstudio/express/visualc/download/
Download the free Microsoft Visual C++ .NET 2005 Express Edition software. Full versions of the
software can be purchased through this site.
www.borland.com/bcppbuilder
Download the free trial edition of Borland C++Builder 2006. Full versions of the software can be
purchased through this site.
http://www.freescale.com/webapp/sps/site/overview.jsp?nodeId=01272600612247
Download the free trial edition of Freescale CodeWarrior Compiler. Full versions of the software
can be purchased through this site.
developer.intel.com/software/products/compilers/cwin/index.htm
Download the free trial edition of the Intel C++ Compiler 9.1 for Windows. Full versions of the
software can be purchased through this site.
gcc.gnu.org/install/binaries.html
Download the free, open-source GNU C++ compiler for a variety of systems.
developer.apple.com/tools/mpw-tools/
Download the free, open-source Macintosh Programmer’s Workshop for use with Mac OS 7.x, 8.x,
and 9.x.
www.bloodshed.net/devcpp.html
Free Bloodshed Dev-C++ IDE (Integrated Development Environment) for use with the MinGW
and Cygwin ports of the GNU Compiler.
sources.redhat.com/cygwin/
Download Cygwin, a free program that allows developers to use the GNU compiler and to develop
programs in a Linux-like environment onWindows systems.
www.mingw.org/
Download MinGW, another free program that allows developers to create programs in a Linux-like
environment onWindows systems.
www.codeblocks.org/
Download Code::Blocks—a free, open-source, cross-platform C++ IDE.
www.digitalmars.com/download/dmcpp.html
Digital Mars C/C++ compiler for Win32.
www.members.tripod.com/%7Eladsoft/frindx.htm?cc386.htm
LadSoft CC386 32-bit C compiler.
www.orbworks.com/
C compiler for use with PalmOs,WinCE andWin32.
www.c-compiler.com/
Miracle C by Tadeusz Szocik. This compiler is free to use, but a registered version that includes
source code of the compiler is also available on this site.
developer.sun.com/
Download the free Sun Studio compilers for Solaris and Linux.
```

### 7.1.13 Summary

```text
Section 1.1 Introduction
• Software (i.e., the instructions you write to command computers to perform actions and make
decisions) controls computers (often referred to as hardware).
• C was standardized in 1989 in the United States through the American National Standards Institute
(ANSI) then worldwide through the International Standards Organization (ISO).
• Computer use is increasing in almost every field of endeavor. In an era of steadily rising costs,
computing costs have been decreasing dramatically due to rapid developments in both hardware
and software technologies. Computers that might have filled large rooms and cost millions of
dollars a few decades ago can now be inscribed on the surfaces of silicon chips smaller than a fingernail,
costing perhaps a few dollars each.
• Silicon-chip technology has made computing so economical that about a billion general-purpose
computers are in use worldwide.

Section 1.2 What Is a Computer?
• A computer is a device capable of performing computations and making logical decisions at
speeds billions of times faster than human beings can. Today’s fastest supercomputers can peform
trillions of additions per second. Trillion-instruction-per-second computers are already
functioning in research laboratories!
• Computers process data under the control of sets of instructions called computer programs.
These computer programs guide the computer through orderly sets of actions specified by people
called computer programmers.
• A computer is comprised of various devices (such as the keyboard, screen, mouse, disks, memory,
DVD, CD-ROM and processing units) that are referred to as hardware.
• The computer programs that run on a computer are referred to as software.
• Hardware costs have been declining dramatically in recent years, to the point that personal computers
have become commodities.

Section 1.3 Computer Organization
• Regardless of differences in physical appearance, virtually every computer may be envisioned as
being divided into six logical units.
• The input unit is the “receiving” section of the computer. It obtains information (data and computer
programs) from input devices and places this information at the disposal of the other units
so that the information can be processed.
• The output unit is the “shipping” section of the computer. It takes information that has been
processed by the computer and places it on various output devices to make the information available
for use outside the computer.
• The memory unit is the rapid-access, relatively low-capacity “warehouse” section of the computer.
It retains information that has been entered through the input unit, so the information may
be made available for processing when needed. The memory unit also retains processed information
until that it can be placed on output devices by the output unit. The memory unit is often
called either memory or primary memory.
• The arithmetic and logic unit (ALU) is the “manufacturing” section of the computer. It is responsible
for performing calculations such as addition, subtraction, multiplication and division.
It contains the decision mechanisms that allow the computer, for example, to compare two items
from the memory unit to determine whether they are equal.
• The central processing unit (CPU) is the “administrative” section of the computer. It is the computer’s
coordinator and is responsible for supervising the operation of the other sections. The
CPU tells the input unit when information should be read into the memory unit, tells the ALU
when information from the memory unit should be used in calculations and tells the output unit
when to send information from the memory unit to certain output devices.
• Many of today’s computers have multiple processing units and, hence, can perform many operations
simultaneously—such computers are called multiprocessors.
• The secondary storage unit is the long-term, high-capacity “warehousing” section of the computer.
Programs or data not actively being used by the other units normally are placed on secondary
storage devices (such as disks) until they are again needed. Information in secondary storage takes
much longer to access than information in primary memory, but the cost per unit of secondary
storage is much less than that of primary memory.

Section 1.4 Early Operating Systems
• Early computers were capable of performing only one job or task at a time. This form of computer
operation is often called single-user batch processing.
• Software systems called operating systems were developed to help make it more convenient to
use computers. Early operating systems managed the smooth transition between jobs. This minimized
the time it took for computer operators to switch between jobs and hence increased the
amount of work, or throughput, computers could process.
• As computers became more powerful, it became evident that single-user batch processing rarely
utilized computer resources efficiently, because most of the time was spent waiting for slow input/
output devices to complete their tasks. It was thought that many jobs or tasks could be made

to share the resources of the computer to achieve better utilization. This is called multitasking.
Multitasking involves the “simultaneous” operation of many jobs on the computer—the computer
shares its resources among the jobs competing for its attention.
• In the 1960s, several groups pioneered timesharing operating systems. Timesharing is a special
case of multitasking, in which users access the computer through terminals, typically devices with
keyboards and screens. In a typical timesharing computer system, dozens or even hundreds of
users, sharing the computer at once. The computer actually does not process all the users simultaneously.
Rather, it runs a small portion of one user’s job, then moves on to service the next user.
The computer does this so quickly that it may provide service to each user several times per second.
Thus, the users’ programs appear to be running simultaneously. An advantage of timesharing
is that the user receives almost immediate responses to requests rather than having to wait
long periods for results.

Section 1.5 Personal, Distributed and Client/Server Computing
• In 1977, Apple Computer popularized the phenomenon of personal computing.
• In 1981, IBM, the world’s largest computer vendor, introduced the IBM Personal Computer,
which quickly legitimized personal computing.
• Personal computers were “stand-alone” units—people did their work on their own computers,
then transported disks back and forth to share information (often called “sneakernet”).
• Although early personal computers were not powerful enough to timeshare several users, these
machines could be linked together in computer networks, sometimes over telephone lines and
sometimes in local area networks (LANs) within an organization. This led to the phenomenon
of distributed computing, in which an organization’s computing, instead of being performed
strictly at some central computer installation, is distributed over networks to the sites at which
the work of the organization is performed.
• Personal computers were powerful enough to handle the computing requirements of individual
users, and to handle the basic communications tasks of passing information between one another
electronically.
• Today’s personal computers are as powerful as the million-dollar machines of just few decades ago.
• The most powerful desktop machines—called workstations—provide individual users with
enormous capabilities.
• Today, information is shared easily across computer networks, where computers called file servers
offer a common store data that may be used by client computers distributed throughout the
network—hence the term client/server computing.

Section 1.6 Machine Languages, Assembly Languages and High-Level Languages
• Programmers write instructions in various programming languages, some directly understandable
by computers and others requiring intermediate translation steps.
• Hundreds of computer languages are in use today. These may be divided into three general
types—machine languages, assembly languages and high-level languages.
• Any computer can directly understand only its own machine language—the “natural language”
of a particular computer. Machine languages generally consist of strings of numbers (ultimately
reduced to 1s and 0s) that instruct computers to perform their most elementary operations, one
at a time. Machine languages are machine dependent (i.e., a particular machine language can be
used on only one type of computer). Such languages are cumbersome for humans.
• Machine-language programming was simply too slow and tedious for most programmers. Instead
of using the strings of numbers that computers could directly understand, programmers be-

gan using English-like abbreviations to represent elementary operations. These abbreviations
formed the basis of assembly languages. Translator programs called assemblers convert assemblylanguage
programs to machine language at computer speeds. Although assembly language is
clearer to humans, it is incomprehensible to computers until translated to machine language.
• Computer usage increased rapidly with the advent of assembly languages, but programming in
these languages still required many instructions to accomplish even the simplest tasks. To speed
the programming process, high-level languages were developed, in which single statements could
be written to accomplish substantial tasks. The translator programs that convert high-level language
programs into machine language are called compilers. High-level languages allow programmers
to write instructions that look almost like everyday English and contain commonly
used mathematical notations. C, C++ and Java are among the most powerful and most widely
used high-level programming languages.
• The process of compiling a high-level language program into machine language can take a considerable
amount of computer time. Interpreter programs were developed to execute high-level
language programs directly without the need for compiling those programs into machine language.
Although compiled programs execute much faster than interpreted programs, interpreters
are popular in program development environments, in which programs are recompiled frequently
as new features are added and errors are corrected. Once a program is developed, a compiled
version can be produced to run most efficiently.

Section 1.7 Fortran, COBOL, Pascal and Ada
• Fortran was developed by IBM Corporation in the 1950s to be used for scientific and engineering
applications that require complex mathematical computations.
• COBOL was developed in 1959 by computer manufacturers, the government and industrial
computer users. COBOL is used for commercial applications that require precise and efficient
manipulation of large amounts of data.
• Research activity in the 1960s resulted in the evolution of structured programming—a disciplined
approach to writing programs that are clearer than unstructured programs, easier to test
and debug and easier to modify.
• One of the more tangible results of this research was the development of the Pascal programming
language by Professor Niklaus Wirth in 1971. Pascal was designed for teaching structured programming
and rapidly became the preferred programming language in most colleges.
• The Ada programming language was developed under the sponsorship of the U.S. Department
of Defense (DOD) during the 1970s and early 1980s. Hundreds of separate languages were being
used to produce the DOD’s massive command-and-control software systems. The DOD
wanted a single language that would fill most of its needs. Ada was named after Lady Ada Lovelace,
daughter of the poet Lord Byron. Lady Lovelace is credited with writing the world’s first
computer program in the early 1800s (for the Analytical Engine mechanical computing device
designed by Charles Babbage). One important capability of Ada is called multitasking, which allows
programmers to specify that many activities are to occur in parallel.

Section 1.8 History of C
• C evolved from two previous languages, BCPL and B. BCPL was developed in 1967 by Martin
Richards as a language for writing operating systems software and compilers. Ken Thompson
modeled many features in his B language after their counterparts in BCPL and in 1970, at Bell
Laboratories used B to create early versions of the UNIX operating system on a DEC PDP-7
computer. Both BCPL and B were “typeless” languages—every data item occupied one “word”
in memory, and the burden of typing variables fell on the shoulders of the programmer.

• The C language was evolved from B by Dennis Ritchie at Bell Laboratories and was originally
implemented in 1972 on a DEC PDP-11 computer. C uses many of the important concepts of
BCPL and B while adding data typing and other powerful features.
• C initially became widely known as the development language of the UNIX operating system.
Today, virtually all new major operating systems are written in C and/or C++.
• C is available for most computers. C is also hardware independent. With careful design, it is possible
to write C programs that are portable to most computers.
• By the late 1970s, C had evolved into what is now referred to as “traditional C.” The publication
in 1978 of Kernighan and Ritchie’s book, The C Programming Language, drew wide attention to
the language.
• The rapid expansion of C over various types of computers (sometimes called hardware platforms)
led to many variations that were similar but often incompatible. This was a serious problem for
program developers, who needed to develop code that would run on several platforms. It became
clear that a standard version of C was needed.
• In 1983, the X3J11 technical committee was created under the American National Standards
Committee on Computers and Information Processing (X3) to “provide an unambiguous and
machine-independent definition of the language.” In 1989, the standard was approved; this standard
was updated in 1999. The standards document is referred to as INCITS/ISO/IEC 9899- 1999. Copies of this document may be ordered from the American National Standards Institute
(www.ansi.org) at webstore.ansi.org/ansidocstore.
• C99 is a revised standard for the C programming language that refines and expands the capabilities
of C. Although it has not been widely adopted, support for it is growing. Chapter 17 introduces
C99. The front part of this book is based on the widely adopted international Standard C.

Section 1.9 C Standard Library
• C programs consist of modules or pieces called functions. You can program all the functions you
need to form a C program, but most C programmers take advantage of a rich collection of existing
functions called the C Standard Library. Thus, there are really two pieces to learning how to
program in C. The first is learning the C language itself, and the second is learning how to use
the functions in the C Standard Library.
• When programming in C you will typically use C Standard Library functions, functions you create
yourself and functions other people have created and made available to you.
• The advantage of creating your own functions is that you will know exactly how they work. You
will be able to examine the C code. The disadvantage is the time-consuming effort that goes into
designing and developing new functions.
• If you use existing functions, you can avoid reinventing the wheel. In the case of the Standard C
functions, you know that they are carefully written, and you know that because you are using
functions that are available on virtually all Standard C implementations, your programs will have
a greater chance of being portable.

Section 1.10 C++
• C++ was developed by Bjarne Stroustrup at Bell Laboratories. It has its roots in C and provides
capabilities for object-oriented programming.
• Objects are essentially reusable software components that model items in the real world.
• Software developers are discovering that using a modular, object-oriented design and implementation
approach can make software development groups much more productive than is possible
with conventional programming techniques.

Section 1.11 Java
• Many people believe that the next major area in which microprocessors will have a profound impact
is that of intelligent consumer electronic devices. In 1991, recognizing this, Sun Microsystems
funded an internal corporate research project code-named Green. The project resulted in
the development of Java.
• The World Wide Web exploded in popularity in 1993, and Sun saw the immediate potential of
using Java to create web pages with dynamic content.
• Sun formally announced Java at a trade show in May 1995. Java generated immediate interest in
the business community because of the phenomenal interest in the World Wide Web. Java is
now used to create web pages with dynamic and interactive content, develop large-scale enterprise
applications, enhance the functionality of web servers (the computers that provide the content
we see in our web browsers), provide applications for consumer devices (such as cell phones,
pagers and personal digital assistants) and do many more things.

Section 1.12 BASIC, Visual Basic, Visual C++, Visual C# and .NET
• The BASIC (Beginner’s All-Purpose Symbolic Instruction Code) programming language was developed
in the mid-1960s by Professors John Kemeny and Thomas Kurtz of Dartmouth College
as a language for writing simple programs. BASIC’s primary purpose was to familiarize novices
with programming techniques.
• Visual Basic was introduced by Microsoft in 1991 to simplify the process of developing Microsoft
Windows applications.
• Visual Basic, Visual C++ and Visual C# are designed for Microsoft’s .NET programming platform.
All three languages make use of .NET’s powerful library of reusable software components
called the Framework Class Library (FCL).
• Comparably to Java, the .NET platform enables web-based applications to be distributed to
many devices (even cell phones) and to desktop computers. The C# programming language was
designed specifically for the .NET platform as a language that would enable programmers to migrate
easily to .NET.
• C++, Java and C# all have their roots in the C programming language.

Section 1.13 Key Software Trend: Object Technology
• Improvements to software technology started to appear, with the benefits of so-called structured
programming (and the related disciplines of structured systems analysis and design) being realized
in the 1970s. But until the 1990s, when the technology of object-oriented programming became
widely used, that software did developers finally feel they had the necessary tools for making
major strides in the software development process.
• Object technology dates back to the mid 1960s. The C++ programming language, developed at
AT&T by Bjarne Stroustrup in the early 1980s, is based on two languages—C and Simula 67, a
simulation programming language developed in Europe and released in 1967. C++ absorbed the
features of C and added Simula’s capabilities for creating and manipulating objects. Neither C
nor C++ was originally intended for wide use beyond the AT&T research laboratories. But grassroots
support rapidly developed for each.
• Object technology is a packaging scheme that enables programmers to create meaningful software
units.
• Before object-oriented languages appeared, programming languages (such as Fortran, Pascal, Basic
and C) were focussed on actions (verbs) rather than on things or objects (nouns). Now, with
the availability of popular object-oriented languages such as Java and C++, programmers continue
to live in an object-oriented world but can conveniently program in an object-oriented (noun-oriented) manner. This is a more natural process than procedural programming and has resulted
in significant productivity enhancements.
• A key problem with procedural programming is that the program units do not easily mirror realworld
entities effectively, so these units are not particularly reusable. It is not unusual for programmers
to “start fresh” on each new project and have to write similar software “from scratch.”
• With object technology, the software entities created (called classes), if properly designed, tend
to be much more reusable on future projects.
• Using libraries of reusable componentry can greatly reduce the amount of effort required to implement
certain kinds of systems.
• Object-oriented programming tends to produce software that is more understandable, better organized
and easier to maintain, modify and debug.

Section 1.14 Typical C Program Development Environment
• You create a program by editing a file with an editor program. Software packages for the C/C++
integrated program development environments such as Borland C++ Builder and Microsoft Visual
Studio have editors that are integrated into the programming environment.
• C program file names should end with the .c extension.
• Compilers translate programs into machine-language code (also referred to as object code).
• In a C system, a preprocessor program executes automatically before the compiler’s translation
phase begins. The C preprocessor obeys special commands called preprocessor directives, which
indicate that certain manipulations are to be performed on the program before compilation.
These manipulations usually consist of including other files in the file to be compiled and performing
various text replacements.
• C programs typically contain references to functions defined elsewhere, such as in the standard
libraries or in the private libraries of groups of programmers working on a particular project. The
object code produced by the C compiler typically contains “holes” due to these missing parts. A
linker links the object code with the code for the missing functions to produce an executable image
(with no missing pieces).
• Before a program can be executed, it must first be placed in memory. This is done by the loader,
which takes the executable image from disk and transfers it to memory. Additional components
from shared libraries that support the program are also loaded.
• The computer, under the control of its CPU, executes the program one instruction at a time.

Section 1.15 Hardware Trends
• Every year, people generally expect to pay at least a little more for most products and services.
The opposite has been the case in the computer and communications fields, especially with regard
to the costs of hardware supporting these technologies. For many decades, hardware costs
have fallen rapidly, if not precipitously.
• Every year or two, the capacities of computers have approximately doubled without any increase
in price. This often is called Moore’s Law, named after the person who first identified and explained
the trend, Gordon Moore, cofounder of Intel—the company that manufactures the vast
majority of the processors in today’s personal computers.
• Moore’s Law is especially true in relation to the amount of memory that computers have for programs,
the amount of secondary storage (such as disk storage) they have to hold programs and
data over longer periods of time, and their processor speeds—the speeds at which computers execute
their programs (i.e., do their work).
• Similar growth has occurred in the communications field, in which costs have plummeted as
enormous demand for communications bandwidth has attracted intense competition.

Section 1.16 History of the Internet
• In the late 1960s, ARPA—the Advanced Research Projects Agency of the Department of Defense—
rolled out the blueprints for networking the main computer systems of about a dozen
ARPA-funded universities and research institutions. The network quickly became called the
ARPAnet, the grandparent of today’s Internet.
• ARPAnet’s chief benefit proved to be its capability of quick and easy communication via what
came to be known as electronic mail (e-mail). This is true even today on the Internet, with e-mail
and related services facilitating communications of all kinds among nearly a billion people worldwide.
• The network operated with a technique called packet switching in, which digital data was sent
in small packages called packets. The packets contained data, address information, error-control
information and sequencing information. The address information was used to route the packets
of data to their destination. The sequencing information was used to help reassemble the packets
into their original order for presentation to the recipient. Packets of many people were intermixed
on the same lines. This packet-switching technique greatly reduced transmission costs as
compared to those of dedicated communications lines.
• The network was designed to operate without centralized control. This meant that if a portion
of the network should fail, the remaining working portions would still be able to route packets
from senders to receivers over alternate paths.
• The protocol for communicating over the ARPAnet became known as TCP—the Transmission
Control Protocol. TCP ensured that messages were properly routed from sender to receiver and
that they arrived intact.
• In parallel with the early evolution of the Internet, organizations worldwide were implementing
their own networks for both intraorganization and interorganization communication. A huge variety
of networking hardware and software appeared. One challenge was to get these to intercommunicate.
ARPA accomplished this with the development of IP—the Internetworking
Protocol), truly creating a “network of networks,” the current architecture of the Internet. The
combined set of protocols is now commonly called TCP/IP.
• Use of the Internet was limited at first to colleges and research institutions; then the military became
a big user. Eventually, the government decided to allow access to the Internet for commercial
purposes.
• Businesses rapidly realized that, by making effective use of the Internet, they could tune their operations
and offer new and better services to their clients, so they started spending vasts amounts
of money to develop and enhance the Internet. This generated fierce competition among the
communications carriers and the hardware and software suppliers to meet the demand. The result
is that bandwidth on the Internet has increased tremendously and costs have plummeted.

Section 1.17 History of the World Wide Web
• The World Wide Web allows computer users to locate and view over the Internet multimediabased
documents on almost any subject. Even though the Internet was developed more than
three decades ago, the introduction of the World Wide Web was a relatively recent event. In 1990, Tim Berners-Lee of CERN (the European Laboratory for Particle Physics) developed the
World Wide Web and several communication protocols that form its backbone.
• The Internet and the World Wide Web will surely be listed among the most important and profound
creations of humankind. 
• Today’s applications can be written to communicate among the world’s hundreds of millions of
computers. The Internet mixes computing and communications technologies. It makes our
work easier. It makes information instantly and conveniently accessible worldwide. It enables individuals
and small businesses to get worldwide exposure. It is changing the way business is done.
People can search for the best prices on virtually any product or service. Special-interest communities
can stay in touch with one another. Researchers can be made instantly aware of the latest
breakthroughs worldwide.

		7.1.14
```

## 7.2 Introduction

```text
to C
Programming
OBJECTIVES
In this chapter, you will learn
■ To write simple computer programs in C.
■ To use simple input and output statements.
■ The fundamental data types.
■ Computer memory concepts.
■ To use arithmetic operators.
■ The precedence of arithmetic operators.
■ To write simple decision-making statements.

Note, my source code examples are in: /cygdrive/c/work/code/C/CHowToProgramm5thEd/
```

### 7.2.1 Introduction

```text
The C language facilitates a structured and disciplined approach to computer program design.
In this chapter we introduce C programming and present several examples that illustrate
many important features of C. Each example is carefully analyzed, one statement at
a time. In Chapters 3 and 4 we present an introduction to structured programming in C.
We then use the structured approach throughout the remainder of the text.
```

### 7.2.2 A Simple C Program: Printing a Line of Text

```text
C uses some notations that may appear strange to people who have not programmed computers.
We begin by considering a simple C program. Our first example prints a line of
text. The program and the program’s screen output are shown in Fig. 2.1.
Even though this program is simple, it illustrates several important features of the C
language.

/* Fig. 2.1: fig02_01.c
A first program in C */
#include <stdio.h>

/* function main begins program execution */
int main( void )
{
printf( "Welcome to C!\n" );

 return 0; /* indicate that program ended successfully */

 } /* end function main */

<URL:/cygdrive/c/work/code/C/CHowToProgramm5thEd/hello_world.c>

We now consider each line of the program in detail. Lines 1 and 2
/* Fig. 2.1: fig02_01.c
A first program in C */
begin with /* and end with */ indicating that these two lines are a comment. You insert
comments to document programs and improve program readability. Comments do not
cause the computer to perform any action when the program is run. Comments are ignored by the C compiler and do not cause any machine-language object code to be
generated. The preceding comment simply describes the figure number, file name and
purpose of the program. Comments also help other people read and understand your program,
but too many comments can make a program difficult to read.

Common Programming Error 2.1
Forgetting to terminate a comment with */. 2.1
Common Programming Error 2.2
Starting a comment with the characters */ or ending a comment with the characters /*. 2.2
*/

Line 3
#include <stdio.h>
is a directive to the C preprocessor. Lines beginning with # are processed by the preprocessor
before the program is compiled. Line 3 tells the preprocessor to include the contents
of the standard input/output header (<stdio.h>) in the program. This header contains
information used by the compiler when compiling calls to standard input/output library
functions such as printf.We explain the contents of headers in more detail in Chapter 5.


Line 6
int main( void )
is a part of every C program. The parentheses after main indicate that main is a program
building block called a function. C programs contain one or more functions, one of which
must be main. Every program in C begins executing at the function main. Functions can
return information. The keyword int to the left of main indicates that main “returns” an
integer (whole number) value. We will explain what it means for a function to “return a
value” when we demonstrate how to create your own functions in Chapter 5, C Functions.
For now, simply include the keyword int to the left of main in each of your programs.
Functions also can receive information when they are called upon to execute. The void in
parentheses here means that main does not receive any information. In Chapter 14, Other
C Topics, we’ll show an example of main receiving information.

Good Programming Practice 2.1
Every function should be preceded by a comment describing the purpose of the function. 2.1
A left brace, {, begins the body of every function (line 7). A corresponding right brace
ends each function (line 12). This pair of braces and the portion of the program between
the braces is called a block. The block is an important program unit in C.


Line 8
printf( "Welcome to C!\n" );
instructs the computer to perform an action, namely to print on the screen the string of
characters marked by the quotation marks. A string is sometimes called a character string,
a message or a literal. The entire line, including printf, its argument within the paren-theses and the semicolon (;), is called a statement. Every statement must end with a semicolon
(also known as the statement terminator). When the preceding printf statement
is executed, it prints the message Welcome to C! on the screen. The characters normally
print exactly as they appear between the double quotes in the printf statement. Notice
that the characters \n were not printed on the screen. The backslash (\) is called an escape
character. It indicates that printf is supposed to do something out of the ordinary. When
encountering a backslash in a string, the compiler looks ahead at the next character and
combines it with the backslash to form an escape sequence. The escape sequence \n means
newline. When a newline appears in the string output by a printf, the newline causes the
cursor to position to the beginning of the next line on the screen. Some common escape
sequences are listed in Fig. 2.2.


The last two escape sequences in Fig. 2.2 may seem strange. Because the backslash has
special meaning in a string, i.e., the compiler recognizes it as an escape character, we use a
double backslash (\\) to place a single backslash in a string. Printing a double quote also
presents a problem because double quotes mark the boundary of a string—such quotes are
not printed. By using the escape sequence \" in a string to be output by printf, we indicate
that printf should display a double quote.


Line 10
return 0; /* indicate that program ended successfully */
is included at the end of every main function. The keyword return is one of several means
we will use to exit a function. When the return statement is used at the end of main as
shown here, the value 0 indicates that the program has terminated successfully. In
Chapter 5 we discuss functions in detail, and the reasons for including this statement will
become clear. For now, simply include this statement in each program, or the compiler
might produce a warning on some systems. The right brace, }, (line 12) indicates that the
end of main has been reached.


Good Programming Practice 2.2
Add a comment to the line containing the right brace, }, that closes every function, including
main. 2.2
We said that printf causes the computer to perform an action. As any program
executes, it performs a variety of actions and makes decisions. At the end of this chapter,


Escape sequence Description
\n Newline. Position the cursor at the beginning of the next line.
\t Horizontal tab. Move the cursor to the next tab stop.
\a Alert. Sound the system bell.
\\ Backslash. Insert a backslash character in a string.
\" Double quote. Insert a double-quote character in a string.

we discuss decision making. In Chapter 3, we discuss this action/decision model of programming
in depth.

Common Programming Error 2.3
Typing the name of the output function printf as print in a program. 

It is important to note that standard library functions like printf and scanf are not
part of the C programming language. For example, the compiler cannot find a spelling
error in printf or scanf.When the compiler compiles a printf statement, it merely provides
space in the object program for a “call” to the library function. But the compiler does
not know where the library functions are—the linker does. When the linker runs, it locates
the library functions and inserts the proper calls to these library functions in the object
program. Now the object program is complete and ready to be executed. For this reason,
the linked program is called an executable. If the function name is misspelled, it is the
linker which will spot the error, because it will not be able to match the name in the C
program with the name of any known function in the libraries.


Good Programming Practice 2.3
The last character printed by a function that displays output should be a newline (\n). This ensures
that the function will leave the screen cursor positioned at the beginning of a new line. Conventions
of this nature encourage software reusability—a key goal in software development environments. 

Good Programming Practice 2.4
Indent the entire body of each function one level of indentation (we recommend three spaces)
within the braces that define the body of the function. This indentation emphasizes the functional
structure of programs and helps make programs easier to read. 

Good Programming Practice 2.5
Set a convention for the size of indent you prefer and then uniformly apply that convention. The
tab key may be used to create indents, but tab stops may vary. We recommend using three spaces
per level of indent. 

The printf function can print Welcome to C! several different ways. For example, the
program of Fig. 2.3 produces the same output as the program of Fig. 2.1. This works
because each printf resumes printing where the previous printf stopped printing. The
first printf (line 8) prints Welcome followed by a space and the second printf (line 9)
begins printing on the same line immediately following the space.
One printf can print several lines by using additional newline characters as in
Fig. 2.4. Each time the \n (newline) escape sequence is encountered, output continues at
the beginning of the next line.

/* function main begins program execution */
int main( void )
{


 return 0; /* indicate that program ended successfully */

 } /* end function main */

Welcome to C!


/* Fig. 2.4: fig02_04.c
Printing multiple lines with a single printf */
#include <stdio.h>

/* function main begins program execution */
int main( void )
{
printf( "Welcome to C!\n" );

 return 0; /* indicate that program ended successfully */

 } /* end function main */

Welcome
to
C!
```

### 7.2.3 Another Simple C Program: Adding Two Integers

```text
Our next program uses the Standard Library function scanf to obtain two integers typed
by a user at the keyboard, computes the sum of these values and prints the result using
printf. The program and sample output are shown in Fig. 2.5. [Note that in the input/
output dialog of Fig. 2.5, we highlight the numbers input by the user.]
The comment in lines 1–2 states the purpose of the program. As we stated earlier,
every program begins execution with main. The left brace { (line 7) marks the beginning
of the body of main and the corresponding right brace } (line 24) marks the end of main.

Lines 8–10
int integer1; /* first number to be input by user */
int integer2; /* second number to be input by user */
int sum; /* variable in which sum will be stored */

are definitions. The names integer1, integer2 and sum are the names of variables. A
variable is a location in memory where a value can be stored for use by a program. These
definitions specify that the variables integer1, integer2 and sum are of type int, which
means that these variables will hold integer values, i.e., whole numbers such as 7, –11, 0,
31914 and the like. All variables must be defined with a name and a data type immediately
after the left brace that begins the body of main before they can be used in a program.
There are other data types besides int in C. Note that the preceding definitions could have
been combined into a single definition statement as follows:
int integer1, integer2, sum;
A variable name in C is any valid identifier. An identifier is a series of characters consisting
of letters, digits and underscores ( _ ) that does not begin with a digit. An identifier
can be of any length, but only the first 31 characters are required to be recognized by C
compilers according to the C standard. C is case sensitive—uppercase and lowercase letters
are different in C, so a1 and A1 are different identifiers.

Common Programming Error 2.4
Using a capital letter where a lowercase letter should be used (for example, typing Main instead
of main).
```

### 7.2.4 Memory Concepts

```text
Variable names such as integer1, integer2 and sum actually correspond to locations in
the computer’s memory. Every variable has a name, a type and a value.
In the addition program of Fig. 2.5, when the statement (line 13)
scanf( "%d", &integer1 ); /* read an integer */
is executed, the value typed by the user is placed into a memory location to which the
name integer1 has been assigned. Suppose the user enters the number 45 as the value for
integer1. The computer will place 45 into location integer1 as shown in Fig. 2.6.
Whenever a value is placed in a memory location, the value replaces the previous value
in that location; thus, placing a new value into a memory location is said to be destructive.
Returning to our addition program again, when the statement (line 16)
scanf( "%d", &integer2 ); /* read an integer */
is executed, suppose the user enters the value 72. This value is placed into location integer2,
and memory appears as in Fig. 2.7. Note that these locations are not necessarily
adjacent in memory.
Once the program has obtained values for integer1 and integer2, it adds these
values and places the sum into variable sum. The statement (line 18)
sum = integer1 + integer2; /* assign total to sum */
that performs the addition also replaces whatever value was stored in sum. This occurs
when the calculated sum of integer1 and integer2 is placed into location sum (destroying
the value already in sum). After sum is calculated, memory appears as in Fig. 2.8. Note that
the values of integer1 and integer2 appear exactly as they did before they were used in
the calculation of sum. These values were used, but not destroyed, as the computer performed
the calculation. Thus, when a value is read from a memory location, the process is
said to be nondestructive
```

### 7.2.5 Arithmetic in C

```text
Most C programs perform arithmetic calculations. The C arithmetic operators are summarized
in Fig. 2.9. Note the use of various special symbols not used in algebra. The asterisk
(*) indicates multiplication and the percent sign (%) denotes the remainder
operator, which is introduced below. In algebra, if we want to multiply a times b, we can
simply place these single-letter variable names side by side as in ab. In C, however, if we
were to do this, ab would be interpreted as a single, two-letter name (or identifier). Therefore,
C (and other programming languages, in general) require that multiplication be explicitly
denoted by using the * operator as in a * b.
The arithmetic operators are all binary operators. For example, the expression 3 + 7
contains the binary operator + and the operands 3 and 7.
Integer division yields an integer result. For example, the expression 7 / 4 evaluates
to 1 and the expression 17 / 5 evaluates to 3. C provides the remainder operator, %, which
yields the remainder after integer division. The remainder operator is an integer operator
that can be used only with integer operands. The expression x % y yields the remainder
after x is divided by y. Thus, 7 % 4 yields 3 and 17 % 5 yields 2. We will discuss many interesting
applications of the remainder operator.

Fig. 2.8 | Memory locations after a calculation.
C operation Arithmetic operator Algebraic expression C expression
Addition + f + 7 f + 7
Subtraction – p – c p - c
Multiplication * bm b * m
Division / x / y or or x ÷ y x / y
Remainder % r mod s r % s

Common Programming Error 2.15
An attempt to divide by zero is normally undefined on computer systems and generally results in
a fatal error, i.e., an error that causes the program to terminate immediately without having successfully
performed its job. Nonfatal errors allow programs to run to completion, often producing
incorrect results. 2.15


Arithmetic Expressions in Straight-Line Form
Arithmetic expressions in C must be written in straight-line form to facilitate entering
programs into the computer. Thus, expressions such as “a divided by b” must be written
as a/b so that all operators and operands appear in a straight line. The algebraic notation
is generally not acceptable to compilers, although some special-purpose software packages
do exist that support more natural notation for complex mathematical expressions.
Parentheses for Grouping Subexpressions
Parentheses are used in C expressions in the same manner as in algebraic expressions. For
example, to multiply a times the quantity b + c we write a * ( b + c ).


Rules of Operator Precedence
C applies the operators in arithmetic expressions in a precise sequence determined by the
following rules of operator precedence, which are generally the same as those in algebra:
a. Operators in expressions contained within pairs of parentheses are evaluated first.
Thus, parentheses may be used to force the order of evaluation to occur in any sequence
desired by the programmer. Parentheses are said to be at the “highest level of precedence.”
In cases of nested, or embedded, parentheses, such as
( ( a + b ) + c )
the operators in the innermost pair of parentheses are applied first.
b. Multiplication, division and remainder operations are applied first. If an expression
contains several multiplication, division and remainder operations, evaluation
proceeds from left to right. Multiplication, division and remainder are
said to be on the same level of precedence.
c. Addition and subtraction operations are evaluated next. If an expression contains
several addition and subtraction operations, evaluation proceeds from left to right.
Addition and subtraction also have the same level of precedence, which is lower
than the precedence of the multiplication, division and remainder operations.
The rules of operator precedence specify the order C uses to evaluate expressions.
When we say evaluation proceeds from left to right, we are referring to the associativity of
the operators. We will see that some operators associate from right to left. Figure 2.10
summarizes these rules of operator precedence.

Sample Algebraic and C Expressions
Now let us consider several expressions in light of the rules of operator precedence. Each
example lists an algebraic expression and its C equivalent. The following example calculates
the arithmetic mean (average) of five terms:
```

### 7.2.6 Decision Making: Equality and Relational Operators

```text
	7.3
```

## 7.40 Source code examples

### 7.40.1 loops

#### 7.40.1.1 Average

```text
/*
 * =====================================================================================
 *
 *       Filename:  average.c
 *
 *    Description:  calculate average using sentinel controlled repetition
 *
 *        Version:  1.0
 *        Created:  08/21/11 10:03:34
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq (), <email>
 *        Company:  <employer>
 *
 * =====================================================================================
 */


#include	<stdlib.h>
#include	<stdio.h>

/* 
 * ===  FUNCTION  ======================================================================
 *         Name:  main
 *  Description:  
 * =====================================================================================
 */
	int
main ( int argc, char *argv[] )
{
	int counter = 0;
	int total = 0;
	int grade = 0;
	float average = 0;


	printf ("Please enter grade. -1 to end.\n");
	scanf("%d", &grade);

	while (grade != -1) //sentinel controlled loop. For countr controlled loop use (counter <= value) logic for example
	{
		counter++;
		total+=grade;


		printf ("Please enter grade. -1 to end.\n");
		scanf("%d", &grade);

	}

	if (counter>0 ) 
	{
		average = (float) total/counter; //cast to float to prevent truncation
	}
	else //avoid division by zero
	{
		average = 0;
	}
	printf("You entered %d grades. Average is %.4f\n",counter, average); //print average with four digits of precision

	return EXIT_SUCCESS;
}				/* ----------  end of function main  ---------- */

Run:
$ sed -ie '1s/^\xef\xbb\xbf//'  average.c
$ gcc average.c 
average.c: In function `main':
average.c:55: error: expected `;' before `}' token
$ gcc average.c 
$ a.exe 
Please enter grade. -1 to end.
4
Please enter grade. -1 to end.
2
Please enter grade. -1 to end.
6
Please enter grade. -1 to end.
-1
You entered 3 grades. Average is 4.000000$ a.exe 
Please enter grade. -1 to end.
-1
You entered 0 grades. Average is 0.000000$ 

			7.40.1.2
```

### 7.40.2 Operators

#### 7.40.2.1 Pre and Post increment

```text
Post increment will first use original value, then increment
Pre increment will first increment then use incremented value, 
/*
 * =====================================================================================
 *
 *       Filename:  pre_post_increment.c
 *
 *    Description:  demonstrates pre & post increment operators
 *
 *        Version:  1.0
 *        Created:  08/21/11 14:36:33
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  Yosi Izaq (), <email>
 *        Company:  <employer>
 *
 * =====================================================================================
 */

#include	<stdlib.h>
#include	<stdio.h>

/* 
 * ===  FUNCTION  ======================================================================
 *         Name:  main
 *  Description:  
 * =====================================================================================
 */
	int
main ( int argc, char *argv[] )
{
	int var = 5;

	//Post increment
	printf("Var is: %d\n",var);
	printf("Var is: %d\n",var++);
	printf("Var is: %d\n",var);

	var = 5;
	//Pre increment
	printf("Var is: %d\n",var);
	printf("Var is: %d\n",++var);
	printf("Var is: %d\n",var);

	return EXIT_SUCCESS;
}				/* ----------  end of function main  ---------- */
sed -ie '1s/^\xef\xbb\xbf//'  pre_post_increment.c
$ gcc pre_post_increment.c 
$ a.exe 
Var is: 5
Var is: 5
Var is: 6
Var is: 5
Var is: 6
Var is: 6

			7.40.2.2

		7.40.3
	7.41
```
