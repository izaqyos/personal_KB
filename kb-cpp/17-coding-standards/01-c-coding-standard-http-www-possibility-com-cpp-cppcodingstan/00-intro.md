---
type: reference
title: "C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html — intro"
description: Intro to the possibility.com C++ Coding Standard.
tags: [cpp, coding-standards, legacy, third-party, reference]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#17.1/intro"
---

# Intro

[↑ C++ Coding Standard, http://www.possibility.com/Cpp/CppCodingStandard.html](/kb-cpp/17-coding-standards/01-c-coding-standard-http-www-possibility-com-cpp-cppcodingstan/README.md)

```text
 Contents
To make comments on this page please see the new Disqus comment section. Pferor was also nice enough to make a copy of this document available in pdf format.

|   17.1.1. Introduction
|          * Standardization is Important
|          * Standards Enforcement
|          * Accepting an Idea
|          * 6 Phases of a Project (joke)
|          * Flow Chart of Project Decision Making (joke)
|          * On Leadership 
|   17.1.2. Resources- Take a Look!
|          * General
|          * Book Recommendations 
|   17.1.3. Names
|          * Make Names Fit
|          * Include Units in Names
|          * No All Upper Case Abbreviations
|          * Class Names
|          * Class Library Names
|          * Method Names
|          * Class Attribute Names
|          * Method Argument Names
|          * Variable Names on the Stack
|          * Pointer Variables
|          * Reference Variables and Functions Returning References
|          * Global Variables
|          * Global Constants
|          * Static Variables
|          * Type Names
|          * Enum Names
|          * #define and Macro Names
|          * C Function Names
|          * C++ File Extensions 
|   17.1.4. Documentation
|          * Comments Should Tell a Story
|          * Document Decisions
|          * Use Extractable Headers
|          * Comment All Questions a Programmer May Have When Looking at Your Code
|          * Make Your Code Discoverable by Browsing
|          * Write Comments as You Code
|          * Make Gotchas Explicit
|          * Interface and Implementation Documentation
|          * Directory Documentation
|          * Include Statement Documentation
|          * Block Comments 
|   17.1.5. Complexity Management
|          * Layering
|          * Minimize Dependencies with Abstract Base Classes
|          * Liskov's Substitution Prinicple
|          * Open/Closed Principle
|          * Register/Dispatch Idiom
|          * Delegation
|          * Follow the Law of Demeter
|          * Design by Contract 
|   17.1.6. Classes
|          * Naming Class Files
|          * Class Layout
|          * What should go in public/protected/private?
|          * Prototype Source File
|          * Use Header File Guards
|          * Required Methods for a Class
|          * Method Layout
|          * Formating Methods with Multiple Arguments
|          * Different Accessor Styles
|          * Init Idiom for Initializing Objects
|          * Initialize all Variables
|          * Minimize Inlines
|          * Think About What Work to do in Constructors
|          * Don't Over Use Operators
|          * Thin vs. Thick Class Interfaces
|          * Short Methods
|          * In a Source file Indicate if a Method is Static or Virtual 
|   17.1.7. Process
|          * Use a Design Notation and Process
|          * Using Use Cases
|          * Using Stories
|          * Unified Modeling Language
|          * Code Reviews
|          * Create a Source Code Control System Early and Not Often
|          * Create a Bug Tracking System Early and Not Often
|          * Create a Wiki System Early and Not Often
|          * RCS Keyword, Change Log, and History Policy
|          * Honor Responsibilities
|          * Process Automation
|          * Tools Agreement
|          * Non-Blocking Scheduling
|          * Using Personas
|          * Use a Continuous Build System
|          * Code in the Dominant Style
|          * Run Unit Tests Before Every Check-in 
|   17.1.8. Formatting
|          * Brace {} Policy
|          * Indentation/Tabs/Space Policy
|          * Parens () with Key Words and Functions Policy
|          * A Line Should Not Exceed 78 Characters
|          * If Then Else Formatting
|          * switch Formatting
|          * Use of goto,continue,break and ?:
|          * One Statement Per Line
|          * Alignment of Declaration Blocks
|          * Document Null Statements
|          * Include static and virtual Key Words in Source File 
|   17.1.9. Exceptions
|          * Create One Exception for Each Library
|          * Selecting Between Exceptions And Asserts
|          * Be Careful Throwing Exceptions in Destructors
|          * Working With Libaries Using All Sorts of Different Policies 
|  17.1.10. Templates
|  17.1.11. Namespaces
|          * Create Unique Name Space Names
|          * Don't Globally Define using
|          * Create Shortcut Names 
|  17.1.12. Miscellaneous
|          * Be Const Correct
|          * Placement of the Const Qualifier
|          * Use Streams
|          * No Magic Numbers
|          * Error Return Check Policy
|          * To Use Enums or Not to Use Enums
|          * Macros
|          * Do Not Default If Test to Non-Zero
|          * The Bull of Boolean Types
|          * Usually Avoid Embedded Assignments
|          * Reusing Your Hard Work and the Hard Work of Others
|          * Commenting Out Large Code Blocks
|          * Use #if Not #ifdef
|          * Creating a C Function in C++
|          * Mixing C and C++
|          * No Data Definitions in Header Files
|          * Make Functions Reentrant
|          * Use the Resource Acquisition is Initialization (RAII) Idiom
|          * Remove Trailing Whitespace 
|  17.1.13. Portability
|          * Use Typedefs for Types
|          * Alignment of Class Members
|          * Compiler Dependent Exceptions
|          * Compiler Dependent RTTI 
|  17.1.14. Popular Myths
|          * Promise of OO
|          * You can't use OO and C++ on Embedded Systems 
```
