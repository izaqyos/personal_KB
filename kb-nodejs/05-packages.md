---
type: reference
title: Packages
description: "Useful Node packages: sprintf-style formatting, nodemon and jsonwebtoken."
tags: [nodejs, npm, jwt, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#5"
---

# Packages

[↑ nodejs-kb](/kb-nodejs/README.md)

## 5.1 sprintf

```text
basic "sprintf":
There is now printf-like support in util.format().  Example: 
util.format('hello %s', 'world');

Full support in package sprintf.
https://www.npmjs.com/package/sprintf-js

npm install sprintf-js

Usage

var sprintf = require("sprintf-js").sprintf,
    vsprintf = require("sprintf-js").vsprintf

sprintf("%2$s %3$s a %1$s", "cracker", "Polly", "wants")
vsprintf("The first 4 letters of the english alphabet are: %s, %s, %s and %s", ["a", "b", "c", "d"])
```

## 5.2 nodemon, monitor nodejs code execution

```text
$ sudo npm install -g nodemon
$ nodemon buffers.js 
```

## 5.3 jsonwebtoken

### 5.3.1 web tutorials

#### 5.3.1.1 https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e

```text
            5.3.1.2

        5.3.2
```

## 5.4 rewire

### 5.4.1 https://www.npmjs.com/package/rewire

```text
rewire adds a special setter and getter to modules so you can modify their behaviour for better unit testing. You may

inject mocks for other modules or globals like process
inspect private variables
override variables within the module.
Please note: The current version of rewire is only compatible with CommonJS modules. See Limitations.


Installation

npm install rewire


Introduction

Imagine you want to test this module:

// lib/myModules.js
// With rewire you can change all these variables
var fs = require("fs"),
    path = "/somewhere/on/the/disk";
 
function readSomethingFromFileSystem(cb) {
    console.log("Reading from file system ...");
    fs.readFile(path, "utf8", cb);
}
 
exports.readSomethingFromFileSystem = readSomethingFromFileSystem;
Now within your test module:

// test/myModule.test.js
var rewire = require("rewire");
 
var myModule = rewire("../lib/myModule.js");
rewire acts exactly like require. With just one difference: Your module will now export a special setter and getter for private variables.

myModule.__set__("path", "/dev/null");
myModule.__get__("path"); // = '/dev/null'
This allows you to mock everything in the top-level scope of the module, like the fs module for example. Just pass the variable name as first parameter and your mock as second.

var fsMock = {
    readFile: function (path, encoding, cb) {
        expect(path).to.equal("/somewhere/on/the/disk");
        cb(null, "Success!");
    }
};
myModule.__set__("fs", fsMock);
 
myModule.readSomethingFromFileSystem(function (err, data) {
    console.log(data); // = Success!
});
You can also set multiple variables with one call.

myModule.__set__({
    fs: fsMock,
    path: "/dev/null"
});
You may also override globals. These changes are only within the module, so you don't have to be concerned that other modules are influenced by your mock.

myModule.__set__({
    console: {
        log: function () { /* be quiet */ }
    },
    process: {
        argv: ["testArg1", "testArg2"]
    }
});
__set__ returns a function which reverts the changes introduced by this particular __set__ call

var revert = myModule.__set__("port", 3000);
 
// port is now 3000
revert();
// port is now the previous value
For your convenience you can also use the __with__ method which reverts the given changes after it finished.

myModule.__with__({
    port: 3000
})(function () {
    // within this function port is 3000
});
// now port is the previous value again
The __with__ method is also aware of promises. If a thenable is returned all changes stay until the promise has either been resolved or rejected.

myModule.__with__({
    port: 3000
})(function () {
    return new Promise(...);
}).then(function () {
    // now port is the previous value again
});
// port is still 3000 here because the promise hasn't been resolved yet
```

### 5.4.2 How rewire is useful for unit tests

```text
getting a module via require always returns a reference to the same module (which is also cached).
It is possible to delete the module but when the module is instantiated differently according to external conditions (Configuration, environment etc)
delete is not helpful for getting different instances of the module.
rewire has a nice side effect:
"
Caveats

Difference to require()
Every call of rewire() executes the module again and returns a fresh instance.

rewire("./myModule.js") === rewire("./myModule.js"); // = false
This can especially be a problem if the module is not idempotent like mongoose models.

Globals are imported into the module's scope at the time of rewiring
Since rewire imports all gobals into the module's scope at the time of rewiring, property changes on the global object after that are not recognized anymore. This is a problem when using sinon's fake timers after you've called rewire().

Dot notation
Although it is possible to use dot notation when calling __set__, it is strongly discouraged in most cases. For instance, writing myModule.__set__("console.log", fn) is effectively the same as just writing console.log = fn. It would be better to write:

myModule.__set__("console", {
    log: function () {}
});
This replaces console just inside myModule. That is, because rewire is using eval() to turn the key expression into an assignment. Hence, calling myModule.__set__("console.log", fn) modifies the log function on the global console object.

"

Example. In semantic service rewire app (express instance) after stubbing some dependencies that are hard to satisfy when in unit test mode.
/Users/<user>/Desktop/work/<employer>/<internal-path>/<internal-path>/test/unit/routes/read.spec.js :
    before(() => {
        loggerStub = sinon.stub(cfLogger, 'initLogger').returns(loggerMock);
        configUtilsStub = sinon.stub(configUtils, 'isClpScenario').returns(true);
        passportStub = sinon.stub(passport, 'authenticate').returns((req, res, next) => {
            req.authInfo = StoreVars.authInfo;
            next();
        });
        xsenvGetServiceStub = sinon.stub(xsenv, 'getServices').returns({'uaa':{}});

        app = rewire('../../../src/app');
        isLocal = app.locals.isLocal;
        StoreClient = require('../../../src/services/store/store-client-factory').create();
    });

        5.4.3

    5.5
```
