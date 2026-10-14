---
type: reference
title: "ECMA6, ES6, Javascript6"
description: "ES6 notes: arrow functions, classes and mocking ES6 classes."
tags: [javascript, nodejs, testing, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#8"
---

# ECMA6, ES6, Javascript6

[↑ nodejs-kb](/kb-nodejs/README.md)

## 8.1 lambda functions (aka => , fat arrow)

## 8.2 classes

### 8.1.1 ES6 classes

### 8.1.2 Mock class

#### 8.1.2.1 https://medium.com/@madhanganesh/how-to-mock-es6-class-749da63268fc

```text
How to mock ES6 class

This post intends to show how to mock a class in JavaScript for the purpose of Unit Testing. The post targets developers who are coming to ES6 from environments that has features like dependency injection and interfaces. Most part of the post will cover what is a class in ES6 and why we need them. Once the underlying model is covered mocking of the same will be obvious. This post will take you through the journey of creating objects in JavaScript.
Object Literal

Object is a first citizen in JavaScript land. The stunningly easy way to create an object makes this language simple to start. Here is a sample object.

var person = {
  name: 'Velu'
};

It is this simple. To create an object you start with object (and not class). In that regards I would argue JavaScript is true Object Oriented (and languages like Java are Class Oriented as you start will class to create objects).

Let us extend the above example to add a behaviour to our sample object, sayName.

var person1 = {
  name: 'Velu',
  sayName: function() {
    console.log(this.name);
  }
}

With this object, if you need to create multiple objects you need to duplicate the sayName function in each of the object. This would mean:

var person1 = {
  name: 'Velu',
  sayName: function() {
    console.log(this.name);
  }
}

var person2 = {
  name: 'Raj',
  sayName: function() {
    console.log(this.name);
  }
}

If you end up creating many people, this would mean there is lot of code duplication. To overcome this comes Constructor Function.
Constructor Function

Let us write a sample Constructor Function and talk about it:

function Person(name) {
  this.name = name;

  this.sayName = function() {
    console.log(this.name);
  }
}

At a first glance this is yet another function in JavaScript. What makes constructor function special is not the function itself but when it is associated with the new keyword. So a constructor function can be used as in:

var person1 = new Person('Velu');

The above line will create an object and literally the code will be transformed into:

var person1 = {
  name: 'Velu',

  sayName: function() {
    console.log(this.name);
  }
}

Now to create more people there is no code duplication. The blueprint is defined in Constructor Function and JavaScript magically converts that to object form at runtime.

With this, there is no code duplication but the underlying object still has duplicate piece. The function sayName is defined only once in the constructor function but still gets copied into each object that gets created. This means more memory. For instance if I create 1 billion people in my Mac Book Pro the node process crashes with out of memory. That brings a need to share the object model not just at code time but also at runtime.
Prototype

So what we need is a mechanism to share functions across objects. In JavaScript the mechanism to share code is again yet another object called prototype. Every JavaScript object that gets created has a built-in link called prototype to another object. This object is shared by all objects created using same Constructor Function. The layout below depicts this:

Now the obvious step is to move the sayName function from object to its prototype. Below code does this:

function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function() {
    console.log(this.name);
}

Also JavaScript ensures following 2 things to make it all possible:

    If a property is accessed on an object and is not present in that object it will be searched and accessed in its prototype
    The “this” reference in the functions attached to prototype with magically bound to the object on which it is invoked

So the below invocation of sayName is ensured that the this will be pointing to person1 object during runtime.

var person1 = new Person('Velu');
person1.sayName();

ES6 Class

Now coming to ES6 class, finally, is just a syntactic sugar that will generate the Constructor Function during runtime. The class syntax just brings this more concisely:

class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}

Having understood what ES6 class under the hood, there is yet another JavaScript concept to understand. Consider the following JavaScript modules and its dependencies:

In this structure Module A imports both B and C. Now when Module B also imports C the module loaded by A is reused and not a new one. This means if a ES6 class is exported from Module C, the definition of the same can be altered in A and the altered definition will be reflected in C. Armed with this understanding on ES6 classes and module system let us finally see how to mock.
Mocking ES6 class

Let us consider following test scenario. The Employee depends on a utility class Helper to get a random number. The Employee module would look like:

const Helper = require('./helper');

class Employee {
  constructor(name) {
    this.name = name;
  }

  getId() {
    const helper = new Helper();
    const id = helper.getRandom();

    return `${this.name}-${id}`;
  }
}

module.exports = Employee;

The unit test of Employee has to mock the getRandom method to drive the test on Employee.getId. The flow looks like:

Now with all the details we have gather so far, the mocking code is obvious and it goes like:

const expect = require('chai').expect;
const sinon = require('sinon');

const Employee = require('../src/employee');
const Helper = require('../src/helper');

describe('employee test', () => {
  it('should return right id', () => {
    // Arrange
    sinon.stub(Helper.prototype, 'getRandom').callsFake(() => 1);

    // Act
    const employee = new Employee('Velu');
    const id = employee.getId();

    // Assert
    expect(id).to.equals('Velu-1');
  });
});

Basically to mock a method on Helper class just get the reference of the function through class prototype and stub the same. This line stubs the getRandom function to always return 1 so the Employee.getId operation can be validated.

sinon.stub(Helper.prototype, 'getRandom').callsFake(() => 1);

The code base for this can be found https://github.com/madhanganesh/es6-class-mocking-sample
            8.1.2.2

        8.1.3

    8.3
```
