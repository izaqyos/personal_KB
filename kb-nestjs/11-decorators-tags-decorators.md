---
type: reference
title: "decorators, tags decorators"
description: Section 11 of the legacy nestjs-kb notes.
tags: [kb-nestjs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#11"
---

# decorators, tags decorators

[↑ nestjs-kb](/kb-nestjs/README.md)

## 11.1 nestjs class decorator access to private member

```text
In NestJS, class decorators have access to the class's constructor function, including its private members, by using a technique called "hoisting". This allows the decorator to modify the class's behavior at runtime, including private members.

Here's an example of how you can access a private member of a class from a class decorator in NestJS:

typescript
Copy code
function MyDecorator() {
  return (target: any) => {
    const originalConstructor = target.prototype.constructor;
    target.prototype.constructor = function(...args) {
      // Access the private member "secret"
      console.log(this['secret']);

      // Call the original constructor
      originalConstructor.apply(this, args);
    };
  };
}

@MyDecorator()
class MyClass {
  private secret: string = 'Hello, world!';
  
  constructor() {
    console.log('MyClass constructor');
  }
}

const myObject = new MyClass(); // Output: "Hello, world!" "MyClass constructor"
In this example, we define a class decorator MyDecorator that modifies the behavior of the class's constructor function. Inside the decorator, we hoist the original constructor function and replace it with a new function that first logs the value of the private member secret and then calls the original constructor function.

When we apply the decorator to the MyClass class, the hoisted constructor function will be called when we create a new instance of the class using the new operator. This will log the value of the private member secret and then call the original constructor function.

Note that accessing private members using the ['memberName'] syntax is not officially supported in TypeScript and may be subject to change in future releases. You should use this technique with caution and consider using public getter and setter methods instead.

    11.2
```
