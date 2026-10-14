---
type: reference
title: Nodejs and C++
description: Section 9 of the legacy nodejs-kb notes.
tags: [kb-nodejs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#9"
---

# Nodejs and C++

[↑ nodejs-kb](/kb-nodejs/README.md)

## 9.1 How NodeJS requires native shared objects

```text
Recently, I faced an issue with requiring native bindings in JavaScript code so I started researching it. If you ever used commands like require(‘my_module.node’) but don’t know how they work from JavaScript perspective — this article is for you.

C++ shares its methods to JavaScript!
What is .node files and why do we need them?
Sometimes, we are using npm packages that have native bindings for their purposes. Sometimes, we are building our own C++ code to extend the NodeJS functionality for our own purposes. In both cases, we need to build external native code to an object, that can be usable by NodeJS.
And that’s what .node files are for. In short, .node files are dynamically shared objects that NodeJS can load to its environment. Making an analogy here, I would say that .node files are very similar to .dll or .so files.
Where does require method come from?
Before digging into internals, let’s remember where require() comes from.
All of JavaScript files are actually wrapped into functions:
const WRAPPER = [
  '(function (exports, require, module, __filename, __dirname) { ',
  '\n})'
];
const JS_SOURCE = 'script here';
const WRAPPED_SCRIPT = WRAPPER[0] + JS_SOURCE + WRAPPER[1];
So, let say, you have some index.js file with the following content:
const fs = require('fs');
When NodeJS tries to load it, it will look like this:
(function (exports, require, module, __filename, __dirname) {
  const fs = require('fs');
})
It means, that all of files\scripts are functions that NodeJS will call when needed. Although, that means that require() method is provided when calling this function.
That function is being called in NativeModule.prototype.compile() method:

As we can see, require() method is pointing to NativeModule.require() method.
Though, there is another type of module. NativeModule is responsible for loading internal modules, but Module is responsible for loading your modules (aka userland).
Module.compile() has similar implementation as well:

Here, compile wraps source into a function and calls it. And, for this case, require argument is internalModule.makeRequireFunction.call(this).
So, for different types of modules NodeJS uses different loaders: NativeModule and Module. Though, we are going to talk about Module only.
Module has the following require() implementation:

So, our require() method, we are heavily using, is actually a pointer to Module.prototype.require() method. If I drop the details, then that’s all you should know, that require() -> Module.prototype.require().
Requiring .node file
Ok, so now, we know what is require() in our code. What happens if we will require a .node file:
const myBindings = require('./build/Release/mybinding.node');
What’s happened there? What was happening in require()?
Well, first of all, it goes into Module.prototype.require() method which calls Module._load() method with a provided path. In our case, ./build/Release/mybinding.node. Here is the implementation:

It checks, if our module exists in cache and, if not, it creates a Module instance and calls tryModuleLoad() function, providing the instance and a filename of our binding. All tryModuleLoad() is trying to do is to call load() method on its instance. Here is an implementation of load() method:

Here, it goes through a list of defined extensions in Module._extensions. This list contains functions that are processing loading of different filetypes. At the time of writing this article, this list contains functions for .js, .json and .node files. Though, I bet that this really will not be changed anyway.
So, if extension is found in that list, in our case .node, then it calls a function with a path to the module you want to require. In case with .node extension it calls a method that has process.dlopen() method, which is a binding from Node C++ sources into JavaScript context.

dlopen() method is actually very similar to how .dll or .so files are loading on Windows and Linux. Here is an implementation of a method that injects into JavaScript context as process.dlopen() method:

It tries to load a shared object via libuv API and if everything works as expected, it registers this dynamically shared object in exports object, returning it into JavaScript context.
Summary
Basically, that’s how require(‘binding.node’) works, so you can build C++ code to shared object, using node-gyp, and require it in your JavaScript code.
Don’t forget to follow me here if you’re interested in such things. Get in touch with me on Twitter. Feel free to ask any questions. Thanks for reading.

    9.2
```
