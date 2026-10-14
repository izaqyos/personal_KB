---
type: reference
title: "Youtube course https://www.youtube.com/watch?v=8jLOx1hD3_o&t=25s , c++ with visual Studio code"
description: Section 36 of the legacy kb-cpp notes.
tags: [kb-cpp]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#36"
---

# Youtube course https://www.youtube.com/watch?v=8jLOx1hD3_o&t=25s , c++ with visual Studio code

[↑ kb-cpp](/kb-cpp/README.md)

## 36.1 getting started

```text
a. in vscode extensions (shift+cmd+x), search c++ by Microsoft and Installing
b. setup compiler. verify you have g++ and clang++ installed (clang comes w/ xcode) then terminal, configure tasks, choose g++ (later repeat for clang++)
tasks.json will open up w/ defaults 
see:
$ ls -a .vscode/
./		../		launch.json	tasks*		tasks.dSYM/	tasks.json

change label, add -std= and modify what to compile (all .cpp) and target (main)
{
			"type": "cppbuild",
			"label": "Apple clang version 13.1.6",
			"command": "/usr/bin/clang++",
			"args": [
				"-fdiagnostics-color=always",
				"-g",
				"-std=c++20",
				"${workspaceFolder}//*.cpp",
				"-o",
				"${fileDirname}/main"
			],
			"options": {
				"cwd": "${fileDirname}"
			},
			"problemMatcher": [
				"$gcc"
			],
			"group": "build",
			"detail": "compiler: /usr/bin/clang++"
		}
c. to configure extension do cmd+p (command pallette) search extension c/c++ click settings (wheel) 

d. online compilers 
https://wandbox.org/

e. all the configuration for c++-20 is saved here, /Users/<user>/work/code/CPP/c++20vscodetemplate
This folder is a template for new projects 
actual configuration in: .vscode/tasks.json 
```

## 36.2 C++ basics

### 36.2.1 iostream and main

```text
iostream for input/output 
main - entry point to program
```

### 36.2.2 comments

```text
//online
//
/*
multi 
line
  */
```

### 36.2.3 Errors and warnings

#### 36.2.3.1 Compilation time errors

```text
fail Compilation
```

#### 36.2.3.2 runtime errors

```text
Compilation works but unexpected behavior and/or crashes
```

#### 36.2.3.3 warnings

```text
            36.2.3.4
```

### 36.2.4 statements and functions

```text
a statement is a basic unit of execution 
ends with a ;
a c++ program is a set of statements
statements are executed in order top to buttom

a function is a block of code that takes arguments and returns something 
a function must be defined before its called  
```

### 36.2.5 IO

```text
abstraction of OS output/input/error file-descriptors (0,1,2). so cout/cin/cerr (also clog prints logs to console)
```

### 36.2.6 execution and memory model

```text
see note: c++ execution and memory model 
```

### 36.2.7 core language vs Standard library vs STL

```text
- core language , c++ language itself
- Standard library, iostream, string, and more libraries 
- STL, part of the Standard-library. It's a subset that uses templates and provides collections, iterators and algorithms 
```

### 36.2.8 Variable types

```text
int, short, long int for integers (32,8 and 64 bits signed. there's also unsigned version)
double, float (32/64 bit precision floating-point numbers)
char, characters (8 bit)
void, no type 
auto, auto deduce type 

number systems:
- binary 
- octal
- hexadecimal
void numberSystemsFourteen(){
    int n1 = 14; //decimal
    int n2 = 016; //octal
    int n3 = 0x0e; //hexadecimal
    int n4 = 0b00001110; //c++-14 binary
    cout<<"14 as decimal "<<n1<<endl;
    cout<<"14 as octal "<<n2<<endl;
    cout<<"14 as hexadecimal "<<n3<<endl;
    cout<<"14 as binary "<<n4<<endl;
}

- Braces initialization 
void bracedInit() {
    int garbageVal;
    int initToZero{};
    int initToTen{10};
    int initFromExpression{initToTen+initToZero};
    // wontCompileBCInitFromUndeclared{foo+bar};
    // int initWithNarrowingConversion{3.2}; //  warning: implicit conversion from 'double' to 'int' changes value from 3.2 to 3 [-Wliteral-conversion]
}

- functional initialization, () less advisable as it implicitly casts 
e.g.
    // int initWithNarrowingConversion(3.2); //  will silently cast to 2

- assignment initialization 
e.g.
int var = 3;

- memory size 
  sizeof(int)
  sizeof(myvar)
  

            36.2.8.1 Floating
Uses IEEE_754 number system  

use f suffix for float number, L for long double
void floatingPoint() {
    float n1{1.101f};
    double n2{1.1012354};
    long double n3{1.101234234234234234234234234234234234234234234234234234234234234234234234L};
    cout<<"sizeof float "<<sizeof(float)<<endl;
    cout<<"sizeof double "<<sizeof(double)<<endl;
    cout<<"sizeof long double "<<sizeof(long double)<<endl;
}

run:
sizeof float 4
sizeof double 8
sizeof long double 8

            36.2.8.2 Booleans
true/false values 
take 1 byte in memory (although 1 bit is enough)

            36.2.8.3 characters and strings 
characters are encoded using ASCII 
char A = 65; 
int Avalue = static_cast<int>(A);

code:
           void asciiEncoding(){
    char a = 'a';
    char b{'b'};
    char A = 65;
    cout<<"char a "<<a<<", A "<<A<<", values: a="<<static_cast<int>(a)<<", A="<<static_cast<int>(A)<<endl;
} 
            36.2.8.4 auto
compiler deduction for types 

            36.2.8.5
        36.2.9 assignments 

int num{9};
num=10;

        36.2.10 Operations 
+-*/% etc
they have precedence, to make explicit use () 

++, -- increment/decrement
can be done post or prior 
x++ (use x then increment)
++x (increment then use x )

Compound operators 
+=, /=, -= etc 
x+=5, x is incremented by 5 and result is assigned to x
        36.2.11 comparisons operators
==, >=, >, < != etc 

&& and
|| or 
! not 
^ xor 


        36.2.12 output formatting 
all are std: namespace
endl (like /n) newline
flush (flush write buffer to output device)

setw set width
right, left - justify right left
setfill - set a fill character (defaults to space)
example:
auto column_width = 20;
std::cout<<std::right;
std::cout<<set::setw(column_width)<<"name"<<set::setw(column_width)<<"age"<<std::endl;
std::cout<<set::setw(column_width)<<"yosi"<<set::setw(column_width)<<"46"<<std::endl;


        36.2.13
    36.3

    36.3
37.
```
