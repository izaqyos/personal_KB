---
type: reference
title: "CPPUnit, Unit tests framework for C++"
description: "Unit testing frameworks: JUnit and CppUnit for C++, with what a unit test is."
tags: [cpp, testing, junit, legacy, tutorial]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-cpp#7"
---

# CPPUnit, Unit tests framework for C++

[↑ kb-cpp](/kb-cpp/README.md)

```text
What is Unit Test?
    ->  Unit Test: A unit can be an operation, a class, a software package, or a subsystem
    ->  Integration Test: Interactions between units
    ->  System Test: System verification and validation as a whole
    ->  Acceptance Test: Testing as a end user; Expected results from system

    Three Principles
    ->  Testing as you go: the earlier a bug is found, the better!  Test can be done once a unit is ready:
    -> Bottom-up testing: with Drivers Top-down testing: with Stubs
    ->  Design test cases systematically: Include boundary values for each feature Make sure every line of code is executed

What can be tested in units?
    ->  A functional requirement 
    ->  Given input that satisfies the precondition, whether the output satisfies the post-condition
    ->  A unit can be a member function, a class, a package or component or a subsystem Â¿
    ->  Automation is the key! Replace user interaction with the scripts, if possible; replace some units with stubs
    ->  A unit tested can still have bugs, but most trivial bugs should have been found

What can not?
    ->  Generally, test can not replace the verification or code review
    ->  Specifically for unit test, interactions between this unit and other units after integration, system and user acceptance are not possible when the system is not ready yet
```

## 7.1 JUnit

```text
	JUnit and Example
 Refer to: http://www.junit.org
 Some concepts or classes:
Fixture: a set of objects against which tests are run
Test Case:
a class which defines the fixture to run multiple tests
- create a subclass of TestCase
- add an instance variable for each part of the fixture
- override setUp() to initialize the variables
- override tearDown() to release any permanent
resource allocated in setUp
setup: a method which sets up the fixture, called before a test is
executed.
teardown: a method to tear down the fixture, called after a test is
executed.
Test Suite: a collection of test cases.
TestRunner: a tool to define the test suite to be run and to display
its results
 A JUnit example (in Eclipse):
source code: junit\samples\money (simplified)
functionality: single currency arithmetic
```

## 7.2 CPP Unit

```text
CppUnit and Example
 Refer to: http://cppunit.sourceforge.net/cgibin/
moin.cgi
 A compiled CppUnit module in CDF
/u/yijun/software/cppunit-1.10.2
 An example of CppUnit
/cppunit-1.10.2/examples/money
```
