---
type: reference
title: FAQ
description: Section 6 of the legacy nodejs-kb notes.
tags: [kb-nodejs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#6"
---

# FAQ

[↑ nodejs-kb](/kb-nodejs/README.md)

## 6.1 printing

### 6.1.1 Print JSON object

```text
use %o flag in console.log.
e.g.
console.log("queryId() was called\nreq=%o\nres=%o\n", req, res);

        6.1.2
```

## 6.2 modules

### 6.2.1 express

#### 6.2.1.1 process.env vs app.get('env') on getting the express.js environment

```text
q. So, in my node.js 5.2.0 / express.js 4.2.0 I can do

if (app.get('env') === 'development') {
  app.use(//etc

or

var env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  app.use(//etc

So process.env.NODE_ENV and app.get('env') both get the environment's value. Is there any significant difference besides the syntax?

a.  There is no significant difference.

Express app.get('env') returns 'development' if NODE_ENV is not defined. So you don't need the line to test its existence and set default.

        6.2.2
```

## 6.3 general

### 6.3.1 Is nodejs interpreted or compiled?

```text
v8 engine, written in c++ (https://chromium.googlesource.com/v8/v8.git/+/master) by google, commpiles and optimized the compiled code of nodejs.
It performs lexing, AST (abstract syntax tree) generation and creates machine code.
It also applies optimizations
```

### 6.3.2 V8

```text
http://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/
How the V8 engine works?

V8 is a JavaScript engine built at the google development center, in Germany. It is open source and written in C++. It is used for both client side (Google Chrome) and server side (node.js) JavaScript applications.

V8 was first designed to increase the performance of the JavaScript execution inside web browsers. In order to obtain speed, V8 translates JavaScript code into more efficient machine code instead of using an interpreter. It compiles JavaScript code into machine code at execution by implementing a JIT (Just-In-Time) compiler like a lot of modern JavaScript engines such as SpiderMonkey or Rhino (Mozilla) are doing. The main difference with V8 is that it doesn’t produce bytecode or any intermediate code.

The aim of this article is to show and to understand how V8 works, in order to produce optimized code for both client side or server side applications. If you are already asking yourself “Should I care about JavaScript performance?” then I will answer with a quote from Daniel Clifford (tech lead and manager of the V8 team): “It’s not just about making your current application run faster, it’s about enabling things that you have never been able to do in the past”.
V8!
Hidden class

JavaScript is a prototype-based language: there are no classes and objects are created by using a cloning process. JavaScript is also dynamically typed: types and type informations are not explicit and properties can be added to and deleted from objects on the fly. Accessing types and properties effectively makes a first big challenge for V8. Instead of using a dictionary-like data structure for storing object properties and doing a dynamic lookup to resolve the property location (like most JavaScript engines do), V8 creates hidden classes, at runtime, in order to have an internal representation of the type system and to improve the property access time.

Let’s have for instance a Point function and the creation of two Point objects:
hidden class

If the layouts are the same, which is the case here, p and q belong to the same hidden class created by V8. This highlights another advantage of using hidden classes: it allows V8 to group objects for which properties are the same. Here p and q use the same optimized code.

Now, let’s assume that we want to add a z property to our q object, right after its declaration (which is perfectly fine with a dynamically typed language).

How will V8 deal with this scenario? In fact, V8 creates a new hidden class everytime the constructor function declares a property and keeps track of the change in the hidden class. Why? Because if two objects are created (p and q) and if a member is added to the second object (q) after the creation, V8 needs to keep the last hidden class created (for the first object p) and to create a new one (for the second object q) with the new member.
transition information

Everytime a new hidden class is created, the previous one is updated with a class transition indicating what hidden class has to be used instead of it.
Code optimization

Because V8 creates a new hidden class for each property, hidden class creation should be kept to a minimum. To do this, try to avoid adding properties after the object creation, and always initialize object members in the same order (to avoid the creation of different tree of hidden classes).

[Update] Another trick: Monomorphic operations are operations which only work on objects with the same hidden class. V8 creates a hidden class when we call a function. If we call it again with different parameter types, V8 needs to create another hidden class: Prefer monomorphic code to polymorphic code



More example on how V8 optimized JavaScript code


Tagged values

To have an efficient representation of numbers and JavaScript objects, V8 represents both with a 32 bit value. It uses a bit to know if it is an object (flag = 1) or an integer (flag = 0) called here SMall Integer or SMI because of its 31 bits. Then, if a numeric value is bigger than 31 bits, V8 will box the number, turning it into a double and creating a new object to put the number inside.

Code optimization: Try to use 31 bit signed numbers whenever possible to avoid the expensive boxing operation into a JavaScript object.


Arrays

V8 uses two different methods to handle arrays:

    Fast elements: Designed for arrays where the set of keys are very compact. They have a linear storage buffer that can be accessed very efficiently.
    Dictionary elements: Designed for sparse arrays which don’t have every elements inside of them. It is actually a hash table, more expensive to access than “Fast Elements”

Code optimization: Be sure that V8 uses “Fast Elements” to handle arrays, in other words, avoid sparse arrays where keys are not next incremental numbers. Also, try to avoid pre-allocating large arrays. It is better to grow as you go. Finally, don’t delete elements in arrays: it makes the key set sparse.



How V8 compiles JavaScript code?


V8 has two compilers!

    A “Full” Compiler that can generate good code for any JavaScript: good but not great JIT code. The goal of this compiler is to generate code quickly. To achieve its goal, it doesn’t do any type analysis and doesn’t know anything about types. Instead, it uses an Inline Caches or “IC” strategy to refine knowledge about types while the program runs. IC is very efficient and brings about 20 times speed improvment.

    An Optimizing Compiler that produces great code for most of the JavaScript language. It comes later and re-compiles hot functions. The optimizing compiler takes types from the Inline Cache and make decisions about how to optimize the code better. However, some language features are not supported yet like try/catch blocks for instance. (The workaround for try/catch blocks is to write the “non stable” code in a function and call the function in the try block)


Code optimization: V8 also supports de-optimization: the optimizing compiler makes optimistic assumptions from the Inline Cache about the different types, de-optimization comes if these assumptions are invalid. For example, if a hidden class generated was not the one expected, V8 throws away the optimized code and comes back to the Full Compiler to get types again from the Inline Cache. This process is slow and should be avoided by trying to not change functions after they are optimized.

        6.3.3
```

## 6.4 arrays

### 6.4.1 convert array to json

```text
json = { ...array };

json = Object.assign({}, array);

json = array.reduce((json, value, key) => { json[key] = value; return json; }, {});

> arr
[ 'a', 'b' ]
> json = arr.reduce((json, v, k) => {json[k] = v; return json;}, {})
{ '0': 'a', '1': 'b' }
> j2={...arr};
{ '0': 'a', '1': 'b' }
> j3=Object.assign({}, arr)
{ '0': 'a', '1': 'b' }
```

## 6.5 functional programming

### 6.5.1 reduce

#### 6.5.1.1 reduce tutorial

```text
https://www.w3schools.com/jsref/jsref_reduce.asp
Syntax
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
Parameter Values
Parameter 	Description
function(total,currentValue, index,arr) 	Required. A function to be run for each element in the array.
Function arguments:
Argument 	Description
total 	Required. The initialValue, or the previously returned value of the function
currentValue 	Required. The value of the current element
currentIndex 	Optional. The array index of the current element
arr 	Optional. The array object the current element belongs to
initialValue 	Optional. A value to be passed to the function as the initial value

example:
 <button onclick="myFunction()">Try it</button>

<p>Sum of numbers in array: <span id="demo"></span></p>

<script>
var numbers = [15.5, 2.3, 1.1, 4.7];

function getSum(total, num) {
    return total + Math.round(num);
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum, 0);
}
</script> 

my example:
> arr
[ 'a', 'b' ]
> json = arr.reduce((json, v, k) => {json[k] = v; return json;}, {})
{ '0': 'a', '1': 'b' }
```

#### 6.5.1.2 reduce an array of string to set

```text
no need for reduce.
Just use Set CTOR
ex:
var arr = [1, 2, 3];
var set = new Set(arr);
console.log(set); // {1,2,3}


var arr = [1, 2, 1];
var set = new Set(arr);
console.log(set); // {1,2}
```

#### 6.5.1.3 reduce an array of string to map

```text
            var arr = [
    { key: 'foo', val: 'bar' },
    { key: 'hello', val: 'world' }
];

var result = arr.reduce(function(map, obj) {
    map[obj.key] = obj.val;
    return map;
}, {});

console.log(result);
// { foo:'bar', hello:'world' }

        6.5.2
```

## 6.6 typescript use string variable as property name

```text
    https://stackoverflow.com/questions/46050957/property-name-on-object-from-variable/46051069
Q: Is there a way in typescript to set a property name from a variable?

Something like this

export function objectFactory(prop: string) {
    return {
        prop: {
            valid: false
        }
    };
}
    
A: 
You are looking for computed properties
(https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names), this is an ES6 feature and not specific to TypeScript.

export function objectFactory(prop: string) {
    return {
        [prop]: {
            valid: false
        }
    };
}

Note that in TypeScript you also need to specify type or you'll get error.
see. https://stackoverflow.com/questions/44110641/typescript-a-computed-property-name-in-a-type-literal-must-directly-refer-to-a-b
Q: ERROR in ...component.ts (..,..): A computed property name in a type literal must directly refer to a built- in symbol. ...: Cannot find name 'any'.

I'm looking forward an object which contains strings which have other string, i.e:

{ abc: 'xyz' }
What I did:

foo: { [string]: string };

A: 27

An identifying name on the computed value is required:

foo: { [bar: string]: string };
```

## 6.7 Objects

### 6.7.1 DFS traverse object properties

```text
https://stackoverflow.com/questions/15690706/recursively-looping-through-an-object-to-build-a-property-list
ou'll run into issues with this if the object has loop in its object graph, e.g something like:

var object = {
    aProperty: {
        aSetting1: 1
    },
};
object.ref = object;
In that case you might want to keep references of objects you've already walked through & exclude them from the iteration.

Also you can run into an issue if the object graph is too deep like:

var object = {
  a: { b: { c: { ... }} }
};
You'll get too many recursive calls error. Both can be avoided:

function iterate(obj) {
    var walked = [];
    var stack = [{obj: obj, stack: ''}];
    while(stack.length > 0)
    {
        var item = stack.pop();
        var obj = item.obj;
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                if (typeof obj[property] == "object") {
                  var alreadyFound = false;
                  for(var i = 0; i < walked.length; i++)
                  {
                    if (walked[i] === obj[property])
                    {
                      alreadyFound = true;
                      break;
                    }
                  }
                  if (!alreadyFound)
                  {
                    walked.push(obj[property]);
                    stack.push({obj: obj[property], stack: item.stack + '.' + property});
                  }
                }
                else
                {
                    console.log(item.stack + '.' + property + "=" + obj[property]);
                }
            }
        }
    }
}

        6.7.2
    6.8
```
