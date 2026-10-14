---
type: reference
title: kb-dot-net
description: "Legacy KB kb-dot-net, kept as a single fenced text note."
tags: [kb-dot-net]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: windows/kb-dot-net
---

# kb-dot-net

```text
Description: 	Visual basic & visual C  -> .net
Author:		Yosi Izaq.

Some of the Vim commands used for editing the text:
remove dos carriage retrurns
%s/\r//g
replace non asci chars with '
%s/[^a-zA-Z0-9_[:space:][:punct:]]/'/gc


1. Programming Visual Basic 2008
Welcome to Programming Visual Basic 2008! I know you're going to enjoy it; I've read it five times already. You're probably anxious to get to Chapter 1, but I recommend you read this preface to make sure you paid for the right book.

1.1. Preface

	1.1.1. Who Is Reading This Book?
Writing a book is a lot like writing a Visual Basic application. Well, except for the
part about finding a publisher, and working with an editor. And then there's that
pesky rule about correct spelling. Come to think of it, they're really quite different.
But in one way, books and programs are similar: both are written to meet the needs
of the user. When writing software applications, the user's needs drive the organization and features of the final program. When writing a book, like the one you're
looking at now, the needs of the user'that's you, the reader'drive the organization and features of the final text.
So it was with you in mind that I set out to write this book. Oh, there's the fame and
the prestige, but it's really about you. You, the person who seeks to understand
Visual Basic and the .NET Framework on which it is built. When I thought about
you and your needs, I came up with these ideas:
You might know how to program, but maybe not
In the programming world, there are four types of people: (1) those who
already program joyfully; (2) those who don't program, but will learn it and
love it; (3) those who don't program, but will learn it and struggle with it; and
(4) those who should return this book immediately to the bookstore. If you are
in one of the first three groups, this book is definitely for you. I believe that anyone
who can break down a task into its basic step-by-step instructions can successfully
program in Visual Basic. If you are unsure about your ability to quantify tasks in
this way, you might want to start out with a book on basic programming concepts.

	1.1.2. What's in This Book?

	1.1.3. What's in the Software Download?

	1.1.4. Conventions Used in This Book

	1.1.5. Using Code Examples

	1.1.6. How to Contact Us

	1.1.7. Safari® Books Online

	1.1.8. Acknowledgments
1.2. Introducing .NET

	1.2.1. Before .NET

	1.2.2. Back to Introducing .NET

	1.2.3. The .NET Object

	1.2.4. The Parts of the .NET Framework

	1.2.5. From Source Code to EXE

	1.2.6. What About Visual Studio and Visual Basic?

	1.2.7. Visual Studio 2008

	1.2.8. Summary

	1.2.9. Project
1.3. Introducing Visual Basic

	1.3.1. The History of the Visual Basic Revolution

	1.3.2. Visual Basic from the Inside Out

	1.3.3. The Basics of Logic and Data

	1.3.4. Data Types and Variables

	1.3.5. Intermission

	1.3.6. Comments

	1.3.7. Option Statements

	1.3.8. Basic Operators

	1.3.9. Using Functions and Subroutines

	1.3.10. Conditions

	1.3.11. Loops

	1.3.12. Creating Your Own Procedures

	1.3.13. Other Flow Control Features

	1.3.14. Events and Event Handlers

	1.3.15. Namespaces

	1.3.16. The My Namespace

	1.3.17. Summary

	1.3.18. Project
1.4. Introducing the Project

	1.4.1. The Library Project

	1.4.2. The Needs of the Users

	1.4.3. The Life of a Project

	1.4.4. Summary

	1.4.5. Project
1.5. Designing the Database

	1.5.1. Relational Databases

	1.5.2. SQL Server 2005

	1.5.3. SQL

	1.5.4. Using Databases in Visual Basic

	1.5.5. Documenting the Database

	1.5.6. Summary

	1.5.7. Project
1.6. .NET Assemblies

	1.6.1. What Is an Assembly?

	1.6.2. What's Inside an Assembly?

	1.6.3. Assemblies and Applications

	1.6.4. The My Namespace and Assemblies

	1.6.5. Directives and Assemblies

	1.6.6. Summary

	1.6.7. Project
1.7. Data and Data Types

	1.7.1. The Nature of Computer Data

	1.7.2. Data in .NET

	1.7.3. Visual Basic Data Types

	1.7.4. Literals

	1.7.5. Constants

	1.7.6. Enumerations

	1.7.7. Variables

	1.7.8. Variable and Constant Naming Conventions

	1.7.9. Local Type Inference

	1.7.10. Operators

	1.7.11. Static Variables

	1.7.12. Arrays

	1.7.13. Nullable Types

	1.7.14. Common Visual Basic Functions

	1.7.15. Summary

	1.7.16. Project
1.8. Windows Forms

	1.8.1. Inside a Windows Application

	1.8.2. Windows in .NET

	1.8.3. Making Forms Useful

	1.8.4. Summary

	1.8.5. Project
1.9. Classes and Inheritance

	1.9.1. Object-Oriented Programming Concepts

	1.9.2. OOP in Visual Basic and .NET

	1.9.3. Related Issues

	1.9.4. Summary

	1.9.5. Project
1.10. Functional Programming

	1.10.1. Lambda Expressions

	1.10.2. Object Initializers

	1.10.3. Error Handling in Visual Basic

	1.10.4. The Nature of Errors in Visual Basic

	1.10.5. Unstructured Error Handling

	1.10.6. Structured Error Handling

	1.10.7. Unhandled Errors

	1.10.8. Managing Errors

	1.10.9. Summary

	1.10.10. Project
1.11. ADO.NET

	1.11.1. What Is ADO.NET?

	1.11.2. Overview of ADO.NET

	1.11.3. Data Sets Versus No Data Sets

	1.11.4. Connecting to SQL Server with Visual Studio

	1.11.5. Interacting with SQL Server in Code

	1.11.6. Database Transactions

	1.11.7. ADO.NET Entity Framework

	1.11.8. Summary

	1.11.9. Project
1.12. Security

	1.12.1. Security Features in .NET

	1.12.2. Cryptography and Encryption

	1.12.3. Encryption in .NET

	1.12.4. Other Security Features

	1.12.5. Summary

	1.12.6. Project
1.13. Overloads and Extensions

	1.13.1. What Is Operator Overloading?

	1.13.2. What Can You Overload?

	1.13.3. Other Operator Overloading Issues

	1.13.4. Extension Methods

	1.13.5. Summary

	1.13.6. Project
1.14. XML

	1.14.1. What Is XML?

	1.14.2. The XML Rule

	1.14.3. XML Content

	1.14.4. Using XML in .NET: The Old Way

	1.14.5. Using XML in .NET: The New Way

	1.14.6. Summary

	1.14.7. Project
1.15. Application Settings

	1.15.1. A Short History of Settings

	1.15.2. Settings in Visual Basic 2008

	1.15.3. Summary

	1.15.4. Project
1.16. Files and Directories

	1.16.1. Traditional Visual Basic File Management

	1.16.2. Manipulating Files Through Streams

	1.16.3. File Management with the My Namespace

	1.16.4. Summary

	1.16.5. Project
1.17. Generics

	1.17.1. What Are Generics?

	1.17.2. Variations of Generic Declaration

	1.17.3. Summary

	1.17.4. Project
1.18. LINQ

	1.18.1. What Is LINQ?

	1.18.2. Anonymous Types

	1.18.3. LINQ to Objects

	1.18.4. Basic Query Expressions

	1.18.5. Converting Results to Other Forms

	1.18.6. Aggregate Queries

	1.18.7. Advanced Query Expressions

	1.18.8. LINQ to XML

	1.18.9. LINQ for ADO.NET-Related Data

	1.18.10. Deferred Execution

	1.18.11. Summary

	1.18.12. Project
1.19. User Interface

	1.19.1. Overview of GDI+

	1.19.2. Selecting a Canvas

	1.19.3. Choosing Pens and Brushes

	1.19.4. Flowing Text from the Font

	1.19.5. Imagining Images

	1.19.6. Exposing Your True Artist

	1.19.7. Paths: Drawings on Macro-Vision

	1.19.8. Keeping It Regional

	1.19.9. Twisting and Turning with Transformations

	1.19.10. Enhancing Controls Through Owner Draw

	1.19.11. Windows Presentation Foundation

	1.19.12. Enhancing Classes with Attributes

	1.19.13. Summary

	1.19.14. Project
1.20. Localization and Globalization

	1.20.1. Defining Globalization and Localization

	1.20.2. Resource Files

	1.20.3. The My.Resources Object

	1.20.4. Localizing Forms Within Visual Studio

	1.20.5. Adding Resources Outside Visual Studio

	1.20.6. Manually Compiling Resources

	1.20.7. Other Localization Features

	1.20.8. Summary

	1.20.9. Project
1.21. Printing

	1.21.1. Printing in Windows

	1.21.2. Printing in .NET

	1.21.3. Printing a Document

	1.21.4. Print Preview

	1.21.5. Counting and Numbering Pages

	1.21.6. Printing in "Raw" Mode

	1.21.7. Summary

	1.21.8. Project
1.22. Reporting

	1.22.1. Report Options in .NET

	1.22.2. Using Reporting Controls in .NET

	1.22.3. Summary

	1.22.4. Project
1.23. Licensing Your Application

	1.23.1. Software Licensing Options

	1.23.2. License Agreements

	1.23.3. Obfuscation

	1.23.4. The Library Licensing System

	1.23.5. Summary

	1.23.6. Project
1.24. Web Development

	1.24.1. How the Internet Works

	1.24.2. Programming the Internet

	1.24.3. ASP.NET Features

	1.24.4. Trying Out ASP.NET

	1.24.5. More About Events

	1.24.6. State and View State

	1.24.7. Data Validation

	1.24.8. Database Integration

	1.24.9. Windows Communication Foundation

	1.24.10. Summary

	1.24.11. Project
1.25. Adding Online Help

	1.25.1. Windows Online Help Options

	1.25.2. Designing HTML Help

	1.25.3. Accessing HTML Help

	1.25.4. Summary

	1.25.5. Project
1.26. Deployment

	1.26.1. What's Involved in Deployment?

	1.26.2. Deployment Methods Within Visual Studio

	1.26.3. Summary

	1.26.4. Project
1.27. Project Complete

	1.27.1. The Library Project

	1.27.2. Visual Basic Flexibility

	1.27.3. The Programming Mindset

	1.27.4. Summary

1.28 TokenAppendix A. Installing the Software

Section A.1. Download the Software

Section A.2. Install the Software

Section A.3. Install Project Templates

Section A.4. Install Code Snippets

Section A.5. Bar Code Support
```
