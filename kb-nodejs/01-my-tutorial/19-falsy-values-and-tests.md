---
type: reference
title: falsy values and tests
description: "Falsy values in JavaScript with ts-node demos, ternary and nullish coalescing operator."
tags: [javascript, typescript, nodejs, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.19"
---

# 1.19 falsy values and tests

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

### 1.19.1 demo test falsy values and ternary ?: operator

```text
$ ts-node 
> const nu=null;
undefined
> const undef=undefined;
undefined
> const emp:string='';
undefined
> emp
''
> undef
undefined
> nu
null
> const t1 = emp? 'not falsy' : 'falsy';
undefined
> t1
'falsy'
> const t2 = undef? 'not falsy' : 'falsy';
undefined
> t2
'falsy'
> const t3 = nu? 'not falsy' : 'falsy';
undefined
> t3
'falsy'
> const t4 = nu != null? 'not falsy' : 'falsy';
undefined
> t4
'falsy'
> const t5 = undef != null? 'not falsy' : 'falsy';
undefined
> t5
'falsy'
> const t6 = emp != null? 'not falsy' : 'falsy';
undefined
> t6
'not falsy'

note t6 fails test..., conclusion use (var)? to test for all possible falsy values
```

### 1.19.2 Nullish coalescing operator ?? Operator

```text
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator


Using the nullish coalescing operator
In this example, we will provide default values but keep values other than null or undefined.
const nullValue = null;
const emptyText = ""; // falsy
const someNumber = 42;

const valA = nullValue ?? "default for A";
const valB = emptyText ?? "default for B";
const valC = someNumber ?? 0;

console.log(valA); // "default for A"
console.log(valB); // "" (as the empty string is not null or undefined)
console.log(valC); // 42

Assigning a default value to a variable
Earlier, when one wanted to assign a default value to a variable, a common pattern was to use the logical OR operator (||):
let foo;

//  foo is never assigned any value so it is still undefined
let someDummyText = foo || 'Hello!';


However, due to || being a boolean logical operator, the left hand-side operand was coerced to a boolean for the evaluation and any falsy value (0, '', NaN, null, undefined) was not returned. This behavior may cause unexpected consequences if you consider 0, '', or NaN as valid values.
let count = 0;
let text = "";

let qty = count || 42;
let message = text || "hi!";
console.log(qty);     // 42 and not 0
console.log(message); // "hi!" and not ""


The nullish coalescing operator avoids this pitfall by only returning the second operand when the first one evaluates to either null or undefined (but no other falsy values):
let myText = ''; // An empty string (which is also a falsy value)

let notFalsyText = myText || 'Hello world';
console.log(notFalsyText); // Hello world

let preservingFalsy = myText ?? 'Hi neighborhood';
console.log(preservingFalsy); // '' (as myText is neither undefined nor null)

Short-circuiting
Like the OR and AND logical operators, the right-hand side expression is not evaluated if the left-hand side proves to be neither null nor undefined.
function A() { console.log('A was called'); return undefined;}
function B() { console.log('B was called'); return false;}
function C() { console.log('C was called'); return "foo";}

console.log( A() ?? C() );
// logs "A was called" then "C was called" and then "foo"
// as A() returned undefined so both expressions are evaluated

console.log( B() ?? C() );
// logs "B was called" then "false"
// as B() returned false (and not null or undefined), the right
// hand side expression was not evaluated


No chaining with AND or OR operators
It is not possible to combine both the AND (&&) and OR operators (||) directly with ??. A SyntaxError will be thrown in such cases.
null || undefined ?? "foo"; // raises a SyntaxError
true || undefined ?? "foo"; // raises a SyntaxError


However, providing parenthesis to explicitly indicate precedence is correct:
(null || undefined) ?? "foo"; // returns "foo"

Relationship with the optional chaining operator (?.)
The nullish coalescing operator treats undefined and null as specific values and so does the optional chaining operator (?.) which is useful to access a property of an object which may be null or undefined.
let foo = { someFooProp: "hi" };

console.log(foo.someFooProp?.toUpperCase());  // "HI"
console.log(foo.someBarProp?.toUpperCase()); // undefined

        1.19.3

    1.20
```
