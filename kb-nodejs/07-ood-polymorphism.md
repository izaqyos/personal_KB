---
type: reference
title: "OOD, polymorphism"
description: "Object-oriented design in JavaScript: removing if/else with guards, ternary and function delegation."
tags: [javascript, design-patterns, nodejs, refactoring, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#7"
---

# OOD, polymorphism

[↑ nodejs-kb](/kb-nodejs/README.md)

## 7.1 removing if/else, alternatives to statement branching

```text
https://javascriptweblog.wordpress.com/2010/07/26/no-more-ifs-alternatives-to-statement-branching-in-javascript/

You could do this..
	
//Example 1
function getEventTarget(evt) {
    if (!evt) {
        evt = window.event;
    }
    if (!evt) {
        return;
    }
    var target;
    if (evt.target) {
        target = evt.target;
    } else {
        target = evt.srcElement;
    }
    return target;
}

or you could do this…
	
//Example 2
function getEventTarget(evt) {
    evt = evt || window.event;
    return evt && (evt.target || evt.srcElement);
}


To avoid ambiguity I’ll explain how I’m using a couple of terms in this article:
• statement branching: any construct that alters the sequence of statement execution within the global or functional scope. These include if, else, switch, for and while statements.
• micro-branching: conditional logic contained within a statement that has no effect on the statement execution seqeunce. The following operators facilitate micro-branching: ternary, && and ||.

OK back to the examples…

Example 1 employs statement branching, i.e. its statements are designed to execute non-linearly. Aside from the obvious bloating effect, statement branching tends to become unintuitive as it progresses (its really just one step up on the food chain from the widely discredited goto statement). As humans we are inclined to read function code top-down, line by line through to the last line. Logic built on statement branching forces us to mentally track each possible execution sequence. As branching logic gets more complex the number of forking paths increases and it becomes easy to overlook edge-case flow scenarios. Bugs love overlooked scenarios.

Example 2 uses micro-branching. The logic flows sequentially from top to bottom and even from left to right. There are no forks in the road. There is only one return statement and its at the bottom where we expect it. Best of all it’s short. Nothing is wasted. In fact it’s terse enough to be barely procedural at all.

Statement branching is necessary and useful but having the full toolkit of alternatives at hand helps to keep our JavaScript readable, concise and robust. There’s also an ideological element here: there’s a lot of power in JavaScript’s functional capabilities, but we need to let go of some procedural baggage in order to unleash it.

Alternatives to statement branching fall into two broad categories: micro-branching and no branching at all. Let’s dig deeper into each:
```

### 7.1.1 micro-branching

#### 7.1.1.1 Guards (&&) and Defaults(||)

```text
The logical boolean operators && and || are familiar syntax in many languages.
JavaScript has a liberal approach to these operators:
• Constructs formed by logical boolean operators can be used as expressions within statements or can form the entire statement
• The operands need not evaluate to booleans but will be coerced to booleans to facilitate the logical operation
• The result of evaluating a logical boolean expression need not be a boolean value
(see ECMA 5 11.11)

This provides for some gorgeously succinct non-branching conditional logic:
	
//invoke callback if there is one
callback && callback();
//delay by argument or 20
delayBy(delay || 20);
//remove node from its parent
node && node.parent && node.parent.removeChild(node);
//log a test in the console id we have one
window.console && console.log('test');
```

#### 7.1.1.2 The Ternary operator

```text
Also (and more clumsily) known as the conditional ?: operator, this is another cross-language standard which we can leverage to lay down conditions without affecting the sequence of statement execution.

When used badly ternary operators are no better than bad imitations of if/else branching. The perplexed smiley in the middle of this one says it all:
	
//Bad example - ternary that thinks its an if/else.
var a = 2, b = 1;
a ? (
    b++,
    a = a*2,
    console.log(a,b)
):(
    b--,
    a = a/2,
    alert(a + " " + b)
);

However when used as a conditional assignment or intra-statement switch, the logic is clean and easy to follow.
	
//make an array of the args if any, or return empty array
var args = arguments ? toArray(arguments) : [];
//end game or go to next level
gameOver ? finally() : nextLevel();
```

#### 7.1.1.3 Function Delegation

```text
As if/else blocks get bigger and/or nested they get harder to follow. If the statement block(s) are more than a few lines it generally suggests the need for an additional function or functions.

Here is a function for dropping a dragged item in a box. Firstly using if/else and multiple bailing returns….
	
function itemDropped(item, location) {
    if (!item) {
        return false;
    } else if (outOfBounds(location) {
        var error = outOfBounds;
        server.notify(item, error);
        items.resetAll();
        return false;
    } else {
        animateCanvas();
        server.notify(item, location);
        return true;
    }
}

…and secondly reimplemented to use function delegation, a ternary and one trailing return per function. Note the added bonus of being able to name your conditions – like a built-in comment.
	
function itemDropped(item, location) {
    var dropOut = function() {
        server.notify(item, outOfBounds);
        items.resetAll();
        return false;
    }
 
    var dropIn = function() {
        server.notify(item, location);
        animateCanvas();
        return true;
    }
 
    return !!item && (outOfBounds(location) ? dropOut() : dropIn());
}
Be careful with “bailing” returns

Some things just have a natural place. Birds in the sky, fish in the sea and a return statement at the end of a function. Short circuiting a function when an variable is null or some other non-useful value might be handy for developers but it can sometimes be a source of obfuscation for reviewers and bug fixers (and more often than not the bug fixer is the original developer). I’m as guilty as anyone else when it comes to bailing returns but other people’s code is often more readable without them. The example just above and Example 2 at the beginning of this article illustrate strategies for avoiding bailing returns.
```

### 7.1.2 non-branching

#### 7.1.2.1 Property look-ups (a.k.a. dispatch tables)

```text
My very first blog post touted my preference for hash look-ups over switch statments so I won’t re-hash(!) all the same arguments here. Suffice to say, functions are most expressive when they eschew data considerations and focus on form. Defining data dependent action properties elsewhere enables just such a separation.

Here’s an example that reacts to a toolbar button being clicked in a file manager type application. First using a switch. Note the clicked function is specific to fileManager and as a consequence we start to build up some ominous looking namespace chaining:
	
fileManager.toolbar.clicked = function(buttonId) {
    switch(buttonId) {
        case 'open': fileManager.openNew(true);
            break;
        case 'save': fileManager.saveSelected(true);
            break;
        case 'run': fileManager.executeSelected(true);
            break;
        default: coreUtils.notImplemented();
    }
}
 
fileManager.toolbar.clicked('save');

Now here’s an alternate implementation using a hash table for lookup. Adding a new button will be a breeze – just add a new property to the actions object. And the clicked function is now generic – action objects can be passed as parameters from any toolbar.
	
fileManager.toolbarActions = {
    'open': {fn: fileManager.openNew, args: [true]},
    'save': {fn: fileManager.saveSelected, args: [false]},
    'run': {fn: fileManager.execSelected, args: [false]},
    'default': {fn: coreUtils.notImplemented, ctxt: coreUtils},
}
 
toolbar.clicked = function(actions, buttonId) {
    var action = actions[buttonId] || actions['default'];
    action.fn.apply(action.ctxt, action.args);
}
 
toolbar.clicked(fileManager.toolbarActions, 'save');
```

#### 7.1.2.2 Array functions, map, filter, reduce

```text
All the major JavaScript frameworks define a rich set of higher order functions for use with Arrays. ECMA 5 also defines a similar set of functions and they are already implemented in all browsers except for IE<=8.

(A note on performance – if your array is very large you might see some performance degradation with the higher order array function – every function call carries a small but cumulative cost. As with all coding – write it for sturdiness and readability, optimize later if you have to – and you probably won’t have to)

Consider a function that returns all words longer than four letters. First the naive approach. The array is short and the test is simple but the logic will still touch about 50 statements in a loopy-doopy sequence.The author is forced to churn out the same mundane looping syntax that she will probably repeat multiple times elsewhere. It’s donkey work that increases the probability of errors and only serves to obfuscate the more meaningful content.
	
function dropShortWords(words) {
    var wordArray = words.split(" ");
    var longWords = [];
    for (var i=0; i<wordArray.length; i++) {
        var word = wordArray[i];
        if (word.length>4) {
            longWords.push(word);
        }
    }
    return longWords.join(" ");
}
 
dropShortWords("The quick brown fox jumped over the lazy dog"); //"quick brown jumped"

… and here is we define the same function using the higher order filter function. Four lines and we left the looping and branching to the safety of an industry tested utility. Moreover with the distraction of the looping syntax removed, the intent of the function becomes clearer.
	
//(will not work in IE<9)
function dropShortWords(words) {
    var longWords = words.split(" ").filter(function(word){
        return word.length>4;
     });
     return longWords.join(" ");
}
 
dropShortWords("The quick brown fox jumped over the lazy dog"); //"quick brown jumped"
```

#### 7.1.2.3 Functions as Data

```text
Functions are first class objects in JavaScript and this allows us to pass them as parameters to other functions. Amongst other things, this provides an alternative to branching.

Here is a simple calculator. With ifs….
	
var calc = {
    run: function(op, n1, n2) {
        var result;
        if (op == "add") {
            result = n1 + n2;
        } else if (op == "sub" ) {
            result = n1 - n2;
        } else if (op == "mult" ) {
            result = n1 * n2;
        } else if (op == "div" ) {
            result = n1 / n2;
        }
        return result;
    }
}
 
calc.run("sub", 5, 3); //2

…and now using run as a higher order function instead:
	
var calc = {
    add : function(a,b) {
        return a + b;
    },
    sub : function(a,b) {
        return a - b;
    },
    mult : function(a,b) {
        return a * b;
    },
    div : function(a,b) {
        return a / b;
    },
    run: function(fn, a, b) {
        return fn && fn(a,b);
    }
}
calc.run(calc.mult, 7, 4); //28

        7.1.3
```

## 7.2 What is polymorphism in Javascript?

```text
https://stackoverflow.com/questions/27642239/what-is-polymorphism-in-javascript#_=_

Q.  I have read some possible article I could found on the internet on polymorphism. But I think I could not quite grasp the meaning of it and its importance. Most of the articles don't say why it is important and how I can achieve polymorphic behavior in OOP (of course in JavaScript).

I can not provide any code example because I haven't got the idea how to implement it, so my questions are below:

    What is it?
    Why we need it ?
    How it works?
    How can I achieve this polymorphic behavior in javascript?

I have got this example. But it is easily understandable what will be outcome of this code. It doesn't give any clear idea about polymorphism itself.

function Person(age, weight) {
    this.age = age;
    this.weight = weight;
    this.getInfo = function() {
        return "I am " + this.age + " years old " +
        "and weighs " + this.weight +" kilo.";
    }
}
function Employee(age, weight, salary) {
    this.salary = salary;
    this.age = age;
    this.weight = weight;
    this.getInfo = function() {
        return "I am " + this.age + " years old " +
        "and weighs " + this.weight +" kilo " +
        "and earns " + this.salary + " dollar.";
    }
}

Employee.prototype = new Person();
Employee.prototype.constructor = Employee;
  // The argument, 'obj', can be of any kind
  // which method, getInfo(), to be executed depend on the object
  // that 'obj' refer to.

function showInfo(obj) {
    document.write(obj.getInfo() + "<br>");
}

var person = new Person(50,90);
var employee = new Employee(43,80,50000);
showInfo(person);
showInfo(employee);
```

### 7.2.1 A1

```text
What is the purpose of polymorphism?

Polymorphism makes a static type system more flexible without losing (significant) static type safety by loosening the conditions for type equivalence. The proof remains that a program will only run if it doesn't contain any type errors.

A polymorphic function or data type is more general than a monomorphic one, because it can be used in a wider range of scenarios. In this sense polymorphism represents the idea of generalization in strictly typed languages.
How does this apply to Javascript?

Javascript has a weak, dynamic type system. Such a type system is equivalent with a strict type system containing only one type. We can think of such a type as a huge union type (pseudo syntax):

type T =
 | Undefined
 | Null
 | Number
 | String
 | Boolean
 | Symbol
 | Object
 | Array
 | Map
 | ...

Every value will be associated to one of these type alternatives at run-time. And since Javascript is weakly typed, every value can change its type any number of times.

If we take a type theoretical perspective and consider that there is only one type, we can say with certainty that Javascript's type system doesn't have a notion of polymorphism. Instead we have duck typing and implicit type coercion.

But this shouldn't keep us from thinking about types in our programs. Due to the lack of types in Javascript we need to infer them during the coding process. Our mind have to stand in for the missing compiler, i.e. as soon as we look at a program we must recognize not only the algorithms, but also the underlying (maybe polymorphic) types. These types will help us to build more reliable and more robust programs.

In order to do this properly I am going to give you an overview of the most common manifestations of polymorphism.
```

#### 7.2.1.1 Parametric polymorphism (aka generics)

```text
Parametric polymorphism says that different types are interchangeable because types doesn't matter at all. A function that defines one or more parameters of parametric polymorphic type must not know anything about the corresponding arguments but treat them all the same, because they can adopt to any type. This is quite restricting, because such a function can only work with those properties of its arguments that are not part of their data:

// parametric polymorphic functions

const id = x => x;

id(1); // 1
id("foo"); // "foo"

const k = x => y => x;
const k_ = x => y => y;

k(1) ("foo"); // 1
k_(1) ("foo"); // "foo"

const append = x => xs => xs.concat([x]);

append(3) ([1, 2]); // [1, 2, 3]
append("c") (["a", "b"]); // ["a", "b", "c"]
```

#### 7.2.1.2 Ad-hoc polymorphism (aka overloading)

```text
Ad-hoc polymorphism says that different types are equivalent for a specific purpose only. To be equivalent in this sense a type must implement a set of functions specific to that purpose. A function that defines one or more parameters of ad-hoc polymorphic type then needs to know which sets of functions are associated to each of its arguments.

Ad-hoc polymorphism makes a function compatible to a larger domain of types. The following example illustrates the "map-over" purpose and how types can implement this constraint. Instead of a set of function the "mappable" constraint only includes a single map function:

// Option type
class Option {
  cata(pattern, option) {
    return pattern[option.constructor.name](option.x);
  }
  
  map(f, opt) {
    return this.cata({Some: x => new Some(f(x)), None: () => this}, opt);
  }
};

class Some extends Option {
  constructor(x) {
    super(x);
    this.x = x;
  }
};

class None extends Option {
  constructor() {
    super();
  }
};


// ad-hoc polymorphic function
const map = f => t => t.map(f, t);

// helper/data

const sqr = x => x * x;

const xs = [1, 2, 3];
const x = new Some(5);
const y = new None();

// application

console.log(
  map(sqr) (xs) // [1, 4, 9]
);

console.log(
  map(sqr) (x) // Some {x: 25}
);

console.log(
  map(sqr) (y) // None {}
);
```

#### 7.2.1.3 subtype (aka inheritance) polymorphism

#### 7.2.1.3.1 https://stackoverflow.com/questions/44391149/es6-classes-ability-to-perform-polymorphism

```text
Every JavaScript object has an internal "prototype" property, often called [[prototype]], which points to the object from which it directly inherits.

Every JavaScript function [object] has a property prototype, which is initialized with an [nearly] empty object. When you create a new instance of this function by calling it as a constructor, the [[prototype]] of that new object will point to the constructor's prototype object.

So, when you write this var myPerson = new Person('Jon', 20);,you have the method showInfo because you have this

Person.prototype.showInfo = function(){
    return "Im " + this._name + ", aged " + this._age;
};

With ES6 if you want to see the polymorphism you could do that :

class Person {
    constructor (name, age) {
        this._name = name;
        this._age = age;
    }
        
    showInfo () {
        return "Im " + this._name + ", aged " + this._age;
    }
}

class Employee extends Person {
    constructor (name, age, sex) {
        super(name,age);
        this._sex = sex;
    }
        
    showInfo(){
        return "Im " + this._sex + ", named " + this._name + ", aged " + this._age;
    }
}

var myPerson = new Person('Jon', 20);
var myEmployee = new Employee('Doe', 10, 'men');

document.write(myPerson.showInfo() + "<br><br>");   // Im Jon, aged 20
document.write(myEmployee.showInfo() + "<br><br>"); // Im men, named Doe, aged 10
                7.2.1.3.2
```

#### 7.2.1.4 Structural polymorphism (aka strutrual subtyping)

```text
https://stackoverflow.com/questions/27642239/what-is-polymorphism-in-javascript#_=_

Structural polymorphism says that different types are equivalent, if they contain the same structure in such a way, that one type has all the properties of the other one but may include additional properties. That being said, structural polymorphism is duck typing at compile time and certainly offers some additional type safety. But by claiming that two values are of the same type just because they share some properties, it completely ignores the semantic level of values:

const weight = {value: 90, foo: true};
const speed =  {value: 90, foo: false, bar: [1, 2, 3]};

Unfortunately, speed is considered a subtype of weight and as soon as we compare the value properties we are virtually comparing apples with oranges. 

            7.2.1.5
        7.2.2
    7.3
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Clean Code Principles - Interview Knowledge Base](/interviews/clean-code.md)
<!-- backlinks:end -->
