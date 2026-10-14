---
type: reference
title: Node features per version
description: Section 16 of the legacy nodejs-kb notes.
tags: [kb-nodejs, node, "16", version, "18"]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#16"
---

# Node features per version

[↑ nodejs-kb](/kb-nodejs/README.md)

```text
https://nodejs.org/en/docs/es6/
```

## 16.1 background

```text
CMAScript 2015 (ES6) and beyond

Node.js is built against modern versions of V8 (https://v8.dev/). By keeping up-to-date with the latest releases of this engine, we ensure new features from the JavaScript ECMA-262 specification (http://www.ecma-international.org/publications/standards/Ecma-262.htm) are brought to Node.js developers in a timely manner, as well as continued performance and stability improvements.

All ECMAScript 2015 (ES6) features are split into three groups for shipping, staged, and in progress features:

All shipping features, which V8 considers stable, are turned on by default on Node.js and do NOT require any kind of runtime flag.
Staged features, which are almost-completed features that are not considered stable by the V8 team, require a runtime flag: --harmony.
In progress features can be activated individually by their respective harmony flag, although this is highly discouraged unless for testing purposes. Note: these flags are exposed by V8 and will potentially change without any deprecation notice.
Which features ship with which Node.js version by default?

The website node.green (https://node.green/) provides an excellent overview over supported ECMAScript features in various versions of Node.js, based on kangax's compat-table.

Which features are in progress?

New features are constantly being added to the V8 engine. Generally speaking, expect them to land on a future Node.js release, although timing is unknown.

You may list all the in progress features available on each Node.js release by grepping through the --v8-options argument. Please note that these are incomplete and possibly broken features of V8, so use them at your own risk:

node --v8-options | grep "in progress"

- determine V8 version:
| (node 14)
| $ node -p process.versions.v8
| 8.4.371.23-node.85
| $ sudo n 17
| Password:
|   installing : node-v17.9.0
|        mkdir : /usr/local/n/versions/node/17.9.0
|        fetch : https://nodejs.org/dist/v17.9.0/node-v17.9.0-darwin-arm64.tar.xz
|    installed : v17.9.0
| $ node -p process.versions.v8
| 9.6.180.15-node.16
```

## 16.2 node version 0-4

## 16.3 node version 6-7

## 16.4 node version 8-9

## 16.5 node version 10-11

## 16.6 node version 12-13

## 16.7 node version 14-15

## 16.8 node version 16, tags: node 16 version

```text
- session,
  -- create presentation (power-point)
  -- git repo of code samples 
  --
```

### 16.8.0 Platform support

```text
       https://www.redhat.com/en/blog/nodejs-16-here-updated-platform-support-v8-version-9-and-more 
As with most major releases, this release updates the minimum supported levels for platforms and tooling used to build Node.js. Some examples include updating the minimum supported Xcode version to 11 and the GCC version for Linux and AIX platforms to 8.3. Please check the documentation in Node's building instructions for all the latest minimum levels.

More interesting is the work being done to add support for the new Apple M1 architecture. The Red Hat team is active in the Node.js build working group, helping to keep the infrastructure running to support the Power PC and s390 architectures, but also helps with work across the other architectures.

Red Hat's Ash Cripps, a build work group member for Node.js, has been actively working to install/configure M1 machines so that we can test/build binaries that are compiled for M1 and run natively. Node.js 16 will be the first version to provide native M1 support.
```

### 16.8.1 V8 version 9

```text
resources:
sheli wiki: <internal-url>
https://v8.dev/blog/v8-release-90
```

#### 16.8.1.1 RegExp match indices

```text
ex:
$ node -v
v17.9.0
$ node
Welcome to Node.js v17.9.0.
Type ".help" for more information.
> const re=/(a+)(b*)/d
undefined
> const m = re.exec('aaab');
undefined
> m.indices[0]
[ 0, 4 ]
> m.indices[1]
[ 0, 3 ]
> m.indices[2]
[ 3, 4 ]

Note d flag is toggle for creating match indices! (see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#advanced_searching_with_flags)

BTW, all supported flags are:
d	Generate indices for substring matches.	RegExp.prototype.hasIndices
g	Global search.	RegExp.prototype.global
i	Case-insensitive search.	RegExp.prototype.ignoreCase
m	Multi-line search.	RegExp.prototype.multiline
s	Allows . to match newline characters.	RegExp.prototype.dotAll
u	"unicode"; treat a pattern as a sequence of unicode code points.	RegExp.prototype.unicode
y	Perform a "sticky" search that matches starting at the current position in the target string. See sticky.	RegExp.prototype.sticky 
```

### 16.8.2 Faster super property access

```text
Accessing super properties (for example, super.x) has been optimized by using V8’s inline cache system and optimized code generation in TurboFan. With these changes, super property access is now closer to being on par with regular property access, as can be seen from the graphs below.
```

#### 16.8.2.1 v8 dev blog, https://v8.dev/blog/fast-super

```text
V8 already has an optimization mechanism for property access ( data driven inline caching - https://mathiasbynens.be/notes/shapes-ics)
V8 uses ignition interpreter to generate bytecode for tapping into the IC with a new LoadSuperIC cache - https://v8.dev/blog/fast-properties https://docs.google.com/document/d/1mEhMn7dbaJv68lTAvzJRCQpImQoO6NZa61qRimVeA-k/edit?usp=sharing

            16.8.2.2
```

### 16.8.3 for ( async of disallowed

```text
https://betterprogramming.pub/a-quick-look-at-the-node-js-16-features-d616e8b2f29

A grammar ambiguity was recently discovered and fixed in V8 v9.0.
The token sequence for ( async of now no longer parses
The token sequence for (async of is ambiguous. It can be the prefix for either for (async of => {};;) or for (async of foo). Therefore, it is disallowed.

Meanwhile, for await (async of is still allowed, since there is no for (await (;;), and thus no ambiguity.

for async of: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of

demo:
const foo = [1,2,3]; 
for (async of => foo;;) {console.log('infinite loop');} // allowed 
for (async of foo) {console.log(iter);} // disallowed since ambiguity with above syntax 
Uncaught SyntaxError: The left-hand side of a for-of loop may not be 'async'.
allowed syntax:
> for await (async of foo) {console.log('a');}
a
a
a
```

#### 16.8.3.1 my demo

```text
            16.8.3.2
```

### 16.8.4 WebAssembly

```text
Faster JS-to-Wasm calls
V8 uses different representations for the parameters of WebAssembly and JavaScript functions. For this reason, when JavaScript calls an exported WebAssembly function, the call goes through a so-called JS-to-Wasm wrapper, responsible for adapting parameters from JavaScript land to WebAssembly land as well as adapting results in the opposite direction.

Unfortunately, this comes with a performance cost, which meant that calls from JavaScript to WebAssembly were not as fast as calls from JavaScript to JavaScript. To minimize this overhead the JS-to-Wasm wrapper can now be inlined at the call site, simplifying the code and removing this extra frame.

Let’s say we have a WebAssembly function to add two double floating point numbers, like this:

double addNumbers(double x, double y) {
  return x + y;
}
and say we call that from JavaScript to add some vectors (represented as typed arrays):

const addNumbers = instance.exports.addNumbers;

function vectorSum(len, v1, v2) {
  const result = new Float64Array(len);
  for (let i = 0; i < len; i++) {
    result[i] = addNumbers(v1[i], v2[i]);
  }
  return result;
}

const N = 100_000_000;
const v1 = new Float64Array(N);
const v2 = new Float64Array(N);
for (let i = 0; i < N; i++) {
  v1[i] = Math.random();
  v2[i] = Math.random();
}

// Warm up.
for (let i = 0; i < 5; i++) {
  vectorSum(N, v1, v2);
}

// Measure.
console.time();
const result = vectorSum(N, v1, v2);
console.timeEnd();
On this simplified microbenchmark, we see the following improvements:


Microbenchmark comparison
The feature is still experimental and can be enabled through the --turbo-inline-js-wasm-calls flag.

For more details, see the design document.
```

### 16.8.5 Promises-based timer functions are supported in Node.js 16

```text
https://www.stefanjudis.com/snippets/promises-based-timer-functions-are-supported-in-node-js-16/

So to implement sleep like in other languages you need something like:
        sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

source: /Users/<user>/work/code/nodejs/tutorial/watchDogDemo.js

but as of nodejs-16 it's not needed anymore (see: https://nodejs.org/docs/latest-v16.x/api/timers.html#timers_timers_promises_api)

demo:
$ node !$
node timers_promises_demo.mjs
setTimeout result :)
setImmediate result :)
1650211609809
1650211609859
1650211609911
1650211609961
1650211610013
1650211610064
1650211610115
1650211610165
1650211610217

code:
$ cat !$
cat timers_promises_demo.mjs
import { setTimeout, setInterval, setImmediate} from 'timers/promises';

const setTORes = await setTimeout(500, "setTimeout result :)");
console.log(setTORes);
const setImmediateRes = await setTimeout(500, "setImmediate result :)");
console.log(setImmediateRes);

const interval = 50;
for await (const startTime of setInterval(interval, Date.Now)) {
    const now = Date.now();
    console.log(now);
    if ((now-startTime) > 1000) {
        break;
    }
}
console.log(Date.now());
```

### 16.8.6 AbortController and AbortSignal APIs

#### 16.8.6.1 https://www.nearform.com/blog/using-abortsignal-in-node-js/

#### 16.8.6.1.1 Promise.race()

```text
const timeout = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('timed out')), 10000);
});

await Promise.race([
  someLongRunningTask(),
  timeout
]);

    The intent here is straightforward: Start a potentially long-running task but trigger a timeout if that task takes too long to complete. This is generally a good idea, but there are quite a few problems with this common example.

First, although the promise returned by Promise.race() will be fulfilled as soon as the first of the given promises is settled, the other promises are not cancelled and will keep on running. Although the timeout timer did fire, the long-running task is never actually interrupted and stopped.

Second, what happens to the timeout promise if the long-running task completes before the timeout is triggered? The answer is simple: The timer keeps running, and the promise will end up rejecting, still with an unhandled rejection — unnecessarily risking performance issues and possible memory leaks in your application.

To correctly handle this pattern, we need a reliable mechanism for signalling across the two promises, canceling either the timer or the long-running task as appropriate and ensuring that once the timeout is triggered all resources are cleaned up as quickly as possible. Fortunately, Web Platform APIs provide a standard mechanism for this kind of signalling — the AbortController and AbortSignal APIs.
```

#### 16.8.6.1.2 AbortController()

```text
import { setTimeout } from 'timers/promises';

const cancelTimeout = new AbortController();
const cancelTask = new AbortController();

async function timeout() {
  try {
    await setTimeout(10000, undefined, { signal: cancelTimeout.signal });
    cancelTask.abort();
  } catch {
    // Ignore rejections here
  }
}

async function task() {
  try {
    await someLongRunningTask({ signal: cancelTask.signal });
  } finally {
    cancelTimeout.abort();
  }
}

await Promise.race([ timeout(), task() ]);

As with the previous example, two promises are created. However, when each completes, it uses the AbortController and AbortSignal APIs to explicitly signal to the other that it should stop. As long as the code in those is written to support the AbortSignal API, everything just works.

For instance, in the example we make use of the recently added awaitable timers API in Node.js. These are variants of the setTimeout() and setInterval() that return promises.

Copy to Clipboard

import { setTimeout } from 'timers/promises';

// Awaits a promise that fulfills after 10 seconds
await setTimeout(10000);
The awaitable timer API supports the ability to pass in an AbortSignal instance. When the AbortSignal is triggered, the timer is cleared and the promise immediately rejects with an AbortError.

Support for AbortController and AbortSignal is being rolled out across the Node.js core API and can now be found in most of the major subsystems. Before we explore where the API can be used, let’s find out a bit more about the API itself.
```

#### 16.8.6.1.3 My example

```text
(thanks Gil for helping)


Test: 
$ node abortControllerDemo.mjs 
Cancel promise using AbortController
got signal { signal: AbortSignal { aborted: false } }
aborting task

Code:
import { setTimeout, setInterval, setImmediate} from 'timers/promises';

/*
long running promise 
note use of options argument to pass the abort signal in
also not check for aborted signal after firing the long time operation (simulated by setTimeout)
 */
const someLongRunningTask = async (delay, msg, options) => {
   const signal = {...options};
    console.log('got signal', signal);
   const res = await setTimeout(delay, msg);
    console.log('got signal 2 ', JSON.stringfy(signal, null, 4));
    if (signal.signal.aborted === true) {
        throw new Error('someLongRunningTask cancelled');
    }
   console.log(`waited ${delay}, ${msg}`);
};

console.log('Cancel promise using AbortController');

// straightforward, an AbortController for TO and Task promises
const cancelTO = new AbortController();
const cancelTask = new AbortController();

async function timeout1() {
    try {
        await setTimeout(1000, undefined, {signal: cancelTO.signal}); // note, setTimeout options argument passes cancelTO signal
        console.log('aborting task');
        cancelTask.abort(); // timeout1 cancels task after 1 second
        
    } catch (e) {
        /* handle error */
    }
}

async function task() {
    try {
        await someLongRunningTask(5000,  'long running task finished', {signal: cancelTask.signal}); //  note, setTimeout options argument passes cancelTask signal 
    }
    finally {
        cancelTO.abort(); // task cancels timeout1 
    }
    }

await Promise.race([timeout1(), task()]);
```

#### 16.8.6.2 https://javascript.info/fetch-abort

#### 16.8.6.2.1 The AbortController object

```text
As we know, fetch returns a promise. And JavaScript generally has no concept of “aborting” a promise. So how can we cancel an ongoing fetch? E.g. if the user actions on our site indicate that the fetch isn’t needed any more.

There’s a special built-in object for such purposes: AbortController. It can be used to abort not only fetch, but other asynchronous tasks as well.

The usage is very straightforward:

The AbortController object
Create a controller:

let controller = new AbortController();
A controller is an extremely simple object.

It has a single method abort(),
And a single property signal that allows to set event listeners on it.
When abort() is called:

controller.signal emits the "abort" event.
controller.signal.aborted property becomes true.
Generally, we have two parties in the process:

The one that performs a cancelable operation, it sets a listener on controller.signal.
The one that cancels: it calls controller.abort() when needed.
Here’s the full example (without fetch yet):

let controller = new AbortController();
let signal = controller.signal;

// The party that performs a cancelable operation
// gets the "signal" object
// and sets the listener to trigger when controller.abort() is called
signal.addEventListener('abort', () => alert("abort!"));

// The other party, that cancels (at any point later):
controller.abort(); // abort!

// The event triggers and signal.aborted becomes true
alert(signal.aborted); // true
As we can see, AbortController is just a mean to pass abort events when abort() is called on it.

We could implement the same kind of event listening in our code on our own, without the AbortController object.

But what’s valuable is that fetch knows how to work with the AbortController object. It’s integrated in it.

my example:
$ node !$
node simpleAbort.js
signal.aborted before abort false
operation aborted
signal.aborted after abort true
$ cat !$
cat simpleAbort.js
let controller = new AbortController();
let signal = controller.signal;

signal.addEventListener('abort', () => console.log('operation aborted'));

console.log('signal.aborted before abort', signal.aborted);
controller.abort();
console.log('signal.aborted after abort', signal.aborted);
```

#### 16.8.6.2.2 Using with fetch

```text
To be able to cancel fetch, pass the signal property of an AbortController as a fetch option:

let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
The fetch method knows how to work with AbortController. It will listen to abort events on signal.

Now, to abort, call controller.abort():

controller.abort();
We’re done: fetch gets the event from signal and aborts the request.

When a fetch is aborted, its promise rejects with an error AbortError, so we should handle it, e.g. in try..catch.

Here’s the full example with fetch aborted after 1 second:

// abort in 1 second
let controller = new AbortController();
setTimeout(() => controller.abort(), 1000);

try {
  let response = await fetch('/article/fetch-abort/demo/hang', {
    signal: controller.signal
  });
} catch(err) {
  if (err.name == 'AbortError') { // handle abort()
    alert("Aborted!");
  } else {
    throw err;
  }
}

my demo:
$ cat !$
cat fetchabort.mjs
import fetch from 'node-fetch';

async function demo_fetch_abort(abortDelay) {
    const controller = new AbortController();
    setTimeout( () => controller.abort(), abortDelay);
    try {
        let resp = await fetch('https://javascript.info/fetch-abort', {signal: controller.signal});
        console.log(resp);

    } catch (e) {
        if (e.name === 'AbortError') {
            console.log('fetch was aborted');
        }
        else {
            console.log(`got error ${e}`);
        }
        /* handle error */
    }
}

console.log('Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)');
demo_fetch_abort(1000);
console.log('Demo aborting fetch using node 16 AbortController. Second run abort fetch if longer than 10ms (expect abort), will print before first :) ');
demo_fetch_abort(10);
$ node !$
node fetchabort.mjs
Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)
Demo aborting fetch using node 16 AbortController. Second run abort fetch if longer than 10ms (expect abort), will print before first :) 
fetch was aborted
Response {
  ...
    type: 'default',
    url: 'https://javascript.info/fetch-abort',
    status: 200,
    statusText: 'OK',
  
}
```

#### 16.8.6.2.3 AbortController is scalable

```text
AbortController is scalable. It allows to cancel multiple fetches at once.

Here’s a sketch of code that fetches many urls in parallel, and uses a single controller to abort them all:

let urls = [...]; // a list of urls to fetch in parallel

let controller = new AbortController();

// an array of fetch promises
let fetchJobs = urls.map(url => fetch(url, {
  signal: controller.signal
}));

let results = await Promise.all(fetchJobs);

// if controller.abort() is called from anywhere,
// it aborts all fetches
If we have our own asynchronous tasks, different from fetch, we can use a single AbortController to stop those, together with fetches.

We just need to listen to its abort event in our tasks:

let urls = [...];
let controller = new AbortController();

let ourJob = new Promise((resolve, reject) => { // our task
  ...
  controller.signal.addEventListener('abort', reject);
});

let fetchJobs = urls.map(url => fetch(url, { // fetches
  signal: controller.signal
}));

// Wait for fetches and our task in parallel
let results = await Promise.all([...fetchJobs, ourJob]);

// if controller.abort() is called from anywhere,
// it aborts all fetches and ourJob
```

#### 16.8.6.2.4 my fetch abort example

```text
test: 
$ node fetchabort.mjs 30
got delay argument 30
Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)
fetch from  https://www.brainyquote.com/quote_of_the_day
fetch was aborted
$ node fetchabort.mjs 3000
got delay argument 3000
Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)
fetch from  https://www.brainyquote.com/quote_of_the_day
<meta name="twitter:description" content="&quot;Childhood is a short season.&quot; - Helen Hayes">
code: 
$ cat fetchabort.mjs 
import fetch from 'node-fetch';

const delay = process.argv[2] ?? 10000;
console.log('got delay argument', delay);
const url1 = 'https://www.brainyquote.com/quote_of_the_day';
async function demo_fetch_abort(abortDelay, url) {
    const controller = new AbortController();
    setTimeout( () => controller.abort(), abortDelay);
    console.log('fetch from ', url);
    try {
        let resp = await fetch(url, {signal: controller.signal});
        const text = await resp.text();
        const lines = text.split('\n');
        //console.log(typeof text);
        console.log( lines.find( elem => elem.includes('twitter:description') ) );
    } catch (e) {
        if (e.name === 'AbortError') {
            console.log('fetch was aborted');
        }
        else {
            console.log(`got error ${e}`);
        }
        /* handle error */
    }
}

console.log('Demo aborting fetch using node 16 AbortController. First run abort fetch if longer than 1 sec (expect success)');
demo_fetch_abort(delay, url1);
// console.log('Demo aborting fetch using node 16 AbortController. Second run abort fetch if longer than 10ms (expect abort), will print before first :) ');
// demo_fetch_abort(10);
                16.8.6.2.5
            16.8.6.3 

                16.8.6.3.1 



            16.8.6.4
```

### 16.8.7 Web Crypto API

```text
Node.js provides an implementation of the standard Web Crypto API. All of the new Web Crypto methods are available on the subtle interface. 

More info: https://nodejs.org/api/webcrypto.html
https://www.nearform.com/blog/implementing-the-web-cryptography-api-for-node-js-core/
```

#### 16.8.7.1 Example generate key and use it to sign:

```text
$ cat webcrypto_hmac.mjs 
import { webcrypto } from 'crypto';
const { subtle } = webcrypto;
 
(async function() {
  const key = await subtle.generateKey({
    name: 'HMAC',
    hash: 'SHA-256',
    length: 256
  }, true, ['sign', 'verify']);
 
  const digest = await subtle.sign({
    name: 'HMAC'
  }, key, 'foo bar');
 
  console.log(digest);
})();

$ node webcrypto_hmac.mjs
ArrayBuffer {
  [Uint8Contents]: <55 6d f0 91 59 16 a6 2c 58 24 18 05 73 ee 80 79 a8 08 29 f3 2e 07 f2 52 b3 e9 76 49 53 cd d3 6b>,
  byteLength: 32
}
```

#### 16.8.7.2 webcrypto api

```text
Most of the cryptographic functions require the use of a key. In the Web Crypto API, keys are represented by CryptoKey objects. These may be generated (using subtle.generateKey()), imported (using subtle.importKey()) or derived (using subtle.deriveKey()). All keys are either symmetric, meaning a single key that is shared and kept secret by the parties using the cryptographic functions, or asymmetric, meaning a pair of keys that are mathematically bound to one another, one of which is meant to be shared while the other is kept private.

The Web Cryptography API supports both symmetric and asymmetric key algorithms:

Symmetric Key Algorithms	
AES-CTR (encrypt/decrypt)
AES-CBC (encrypt/decrypt)
AES-GCM (encrypt/decrypt)
AES-KW (key wrap/unwrap)
HMAC (cryptographic digest)
HKDF (key and bit derivation)
PBKDF2 (key and bit derivation)

Asymmetric Key Algorithms
RSASSA-PKCS1-v1_5 (sign/verify)
RSA-PSS (sign/verify)
RSA-OAEP (encrypt/decrypt)
ECDSA (sign/verify)
ECDH (key and bit derivation)

- full API: https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto 
- Doesn’t Node.js already have crypto?
Anyone who has used Node.js for a period of time knows that the platform already has support for low-level cryptographic functions accessible by using require('crypto'). This existing module provides mechanisms for all the same cryptographic primitives as Web Crypto — and in several cases, provides support for a broader range of algorithms than what is minimally defined by the W3C standard.

So, if Node.js already has a crypto module, why does it need the Web Crypto API? This is a good question, and it’s one that has been asked many times over the years. In fact, there has until recently been an active reluctance to add the Web Crypto API into Node.js at all. What has changed? As JavaScript becomes more ubiquitous across all platforms and environments (client, server, edge, etc.), the need for cross-platform and cross-environment compatibility becomes more important to enable the portability of code (and knowledge!) across environments.

There is also the fact that Promise-based development is advancing in JavaScript. Promises (and async/await syntax) can make reasoning about asynchronous code easier in many ways. The Web Crypto API is defined entirely around asynchronous APIs that return promises, while the existing Node.js crypto module uses a combination of synchronous primitives, callbacks and stream APIs. Adopting Web Crypto into Node.js provides an additional promise-based approach that appeals to many developers.

So, instead of continuing to debate whether we should or should not adopt Web Crypto in Node.js, I decided to just go ahead and write it — and while the pull request has not landed at the time of this writing, I do expect it to land soon.

The Node.js implementation of the SubtleCrypto interface is accessible using require('crypto').webcrypto or import { webcrypto } from 'crypto' if you are using ESM syntax. The API has been implemented to be entirely compatible with the browser implementations.

Unfortunately, implementing the new API was not particularly straightforward or easy due to a number of issues in Node’s native C/C++ internals.

-
```

#### 16.8.7.3 Using the Web Cryptography APIs

#### 16.8.7.3.1 Generating symmetric and asymmetric keys

```text
The prior examples illustrate a few of the basics on how the Web Crypto API is used. Here, I want to show a few more examples and offer a few more details on each.

The Web Crypto API is accessed using:

const { subtle, getRandomValues } = require('crypto').webcrypto;
If you are using ESM module syntax, that would be:

import { webcrypto } from 'crypto'
The subtle property is a singleton instance of SubtleCrypto and is equivalent to window.crypto.subtle in Web browsers. The getRandomValues() function is the Web Crypto API equivalent to Node.js’ existing randomFillSync() method for synchronously generating random data.

Generating symmetric and asymmetric keys
The AES cipher and cryptographic digest algorithms require the use of symmetric (“secret”) keys. For AES and HMAC, these can be generated using the subtle.generateKey() method.

Example 5: Generating an AES key

const { subtle } = require('crypto').webcrypto;

// Node.js Web Crypto only supports 128-bit and 256-bit AES keys
async function generateKey(length) {
  return subtle.generateKey(
    { name: 'AES-CBC', length },
    true,
    ['encrypt', 'decrypt']);
}
If successful, the promise returned will be resolved with a single CryptoKey object representing the generated key. The arguments and key usages (e.g. ‘encrypt’ and ‘decrypt’ in the example) are validated based on the named algorithm and will vary from one key type to the next.

my example:
$ cat !$
cat webcrypto_key_gen.mjs
// non esm module syntax:
//const { subtle, getRandomValues } = require('crypto').webcrypto;

// esm module syntax:
import { webcrypto } from 'crypto'
const { subtle } = webcrypto;

const getAESKey = async function generateKey(length) {
  return subtle.generateKey(
    { name: 'AES-CBC', length: 256 },
    true,
    ['encrypt', 'decrypt'])};

const aesKey = await getAESKey();
console.log('Generated AES Cipher Block Chaining key', aesKey);




$ node !$
node webcrypto_key_gen.mjs
Generated AES Cipher Block Chaining key CryptoKey {
  type: 'secret',
  extractable: true,
  algorithm: { name: 'AES-CBC', length: 256 },
  usages: [ 'encrypt', 'decrypt' ]
}
Example 6: Generating an elliptic curve key pair

const { subtle } = require('crypto').webcrypto;

async function generateKeyPair() {
  return subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-521' },
    false,
    ['sign', 'verify']);
}
If successful, the promise returned will be resolved with an object containing publicKey and privateKey properties.

In both examples, the boolean argument identifies whether the resulting keys are exportable using the subtle.exportKey() function. If a generated key is not exportable, there will be no way of accessing the raw key data, which means the key data will be lost once the CryptoKey object is garbage collected.
                16.8.7.3.2

            16.8.7.4
```

### 16.8.8 Apple silicon processors supported

```text
A change that’s completely new in v16 is the publication of builds for Apple Silicon processors.

This should improve performance on new Mac hardware. Node.js will run natively on the Apple M1, instead of using emulation layer.
```

### 16.8.9 base64 utility methods

```text
https://medium.com/codex/whats-new-in-nodejs-16-c6d455ebfb90
Atob and btoa for your base64
Those two functions allow us to encode and decode base64 string. They are very easy to use as all they need are strings!

const base64 = atob("foobar"); // Results as a base64 encoded string
const initialString = btoa(base64); // back to "foobar
```

### 16.8.10 ES 2021 support

```text
dashboard of nodejs supported features per version: https://node.green/ 
String Replace all
Numeric separators
Weak refs – great for in memory caches allows GC to clean up better
FinalizationRegistry (a destructor) – works well with weak refs
||= , a || = b
&&= , a &&= b
??= , a ??= b

demo:
$ cat !$
cat es2021.mjs
console.log('string replaceALl now supported. No need to use regex or split and join');
const str='This is a demo string';
const str_with_commas=str.replaceAll(' ',',');
console.log(`replace all spaces in: ${str}. result is: ${str_with_commas}`);
const bignum=100_000_000_000;
console.log('can now represent nums with _ as separator. e.g. 100_000_000_000 value is:', bignum);
$ node !$
node es2021.mjs
string replaceALl now supported. No need to use regex or split and join
replace all spaces in: This is a demo string. result is: This,is,a,demo,string
can now represent nums with _ as separator. e.g. 100_000_000_000 value is: 100000000000
```

### 16.8.11 deprecated

```text
https://www.geekstrick.com/news/node-16-is-released-with-updated-platform-support-and-much-more/
fs.rmdir no longer supported. Instead use fs.rm(dir, {recursive:true})


        16.8.12
```

## 16.9 node version 17

## 16.10 node version 18, tags: node version 18

```text
Node.js major release is updated every six months. The new release becomes the Current release for six months, which gives library authors time to add support for them.

After six months, odd-numbered releases, such as 17, become unsupported, and even-numbered releases, such as 16, move to the Active LTS (long-term support) status and are ready for general use. LTS release typically guarantees that critical bugs will be fixed for a total of 30 months. Production applications should only use Active LTS or Maintenance LTS releases.

Node.js 18 was released on April 19, 2022. It becomes the Current release. It comes with 5 major features:

Experimental fetch API
Web Streams API
HTTP Timeouts
Experimental test runner
V8 JavaScript engine is updated to V8 10.1

First, install 18 LTS 
$ nvm install 18.12.0 #LTS version
Downloading and installing node v18.12.0...
Downloading https://nodejs.org/dist/v18.12.0/node-v18.12.0-darwin-arm64.tar.xz...
############################################################################################################################################################################################################# 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v18.12.0 (npm v8.19.2)
Creating default alias: default -> 18.12.0 (-> v18.12.0)
$ nvm use 18.12.0
Now using node v18.12.0 (npm v8.19.2)
$ node --version
v18.12.0
```

### 16.10.1 sources

```text
https://betterprogramming.pub/5-major-features-of-node-js-18-5f4a164cc9fc
https://nodesource.com/blog/11-features-nodeJS-18-to-try
https://youtu.be/XLGIPoBYqD4

examples: 
```

### 16.10.2 features

#### 16.10.2.1 fetch finally arrives to NodeJS

```text
bringing uniformity with browsers
example:
$ cat fetch.js 
const url = 'https://jsonplaceholder.typicode.com/todos/1'
const getJsonFromUrl= async (url)  => {
    console.log(`GET from ${url}`);
    const resp = await fetch(url);
    if (resp.ok) {
        const jsonData = await resp.json();
        console.log(`Got json ${JSON.stringify(jsonData, null, 4)} from ${url}`);
        //console.log(`Got json ${JSON.stringify(jsonData, null, ' ')} from ${url}`);
        //console.log(`Got json ${JSON.stringify(jsonData, null, "\t")} from ${url}`);
    }
    else {
        console.error(`Got error ${resp.status} ${resp.statusText}`);
    }
}

getJsonFromUrl(url);

$ node !$
node fetch.js
GET from https://jsonplaceholder.typicode.com/todos/1
(node:1350) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
Got json {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
} from https://jsonplaceholder.typicode.com/todos/1

Note:
a. fetch only rejects on network errors. It does not reject on HTTP errors.
b. need to check response.ok and when not ok response.status response.statusText
c. initial fetch response contains headers and more info but doesn't yet contain the body (since it needs to be gathered from the underlying TCP stream and marshalled + parsed)
interface Response extends Body {
  readonly headers: Headers;
  readonly ok: boolean;
  readonly redirected: boolean;
  readonly status: number;
  readonly statusText: string;
  readonly type: ResponseType;
  readonly url: string;
  clone(): Response;
}
d. To get the JSON from body call .json() - which is asynchronous
e. fetch is supported since 2015 on all browsers (- IE)
f. In NodeJS it is based on https://undici.nodejs.org/#/ client lib
g. fetch, FormData, Headers, Request, Response are now global objects in JavaScript
```

#### 16.10.2.2 webstreams API

```text
Again, trying to make NodeJS streams more compatible with browser streams.
Streams allow process in chunks instead of waiting for entire download of a resource (file, image, video etc) to complete, then deserialized into memory
Also streams allow detection of start/end and errors and can be canceled and chained
```

#### 16.10.2.2.1 Read Demo

```text
$ node readableStreamDemo.js
GET from https://jsonplaceholder.typicode.com/todos/1 using ReadableStream and ReadableStreamDefaultController
(node:3673) ExperimentalWarning: The Fetch API is an experimental feature. This feature could change at any time
(Use `node --trace-warnings ...` to show where the warning was created)
got response.body = ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
streamReader= ReadableStreamDefaultReader {
  stream: ReadableStream { locked: true, state: 'readable', supportsBYOB: false },
  readRequests: 0,
  close: Promise { <pending> }
}
controller= ReadableStreamDefaultController {}
ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
false Uint8Array(83) [
  123, 10,  32,  32,  34, 117, 115, 101, 114,  73, 100,  34,
   58, 32,  49,  44,  10,  32,  32,  34, 105, 100,  34,  58,
   32, 49,  44,  10,  32,  32,  34, 116, 105, 116, 108, 101,
   34, 58,  32,  34, 100, 101, 108, 101,  99, 116, 117, 115,
   32, 97, 117, 116,  32,  97, 117, 116, 101, 109,  34,  44,
   10, 32,  32,  34,  99, 111, 109, 112, 108, 101, 116, 101,
  100, 34,  58,  32, 102,  97, 108, 115, 101,  10, 125
]
Got stream done. Done state=true
result is: { userId: 1, id: 1, title: 'delectus aut autem', completed: false }
code:
$ cat readableStreamDemo.js |pbcopy
const url = 'https://jsonplaceholder.typicode.com/todos/1'
const getJsonFromUrl= (url)  => {
    console.log(`GET from ${url} using ReadableStream and ReadableStreamDefaultController`);
    fetch(url).then( (resp) => {
        console.log('got response.body =',resp.body); //should print got response.body =ReadableStream { locked: false, state: 'readable', supportsBYOB: false }
        return resp.body;
    })
    .then( responseBody => {
        const streamReader = responseBody.getReader();
        console.log('streamReader=', streamReader);
        // should print
        // streamReader= ReadableStreamDefaultReader {
        //   stream: ReadableStream { locked: true, state: 'readable', supportsBYOB: false },
        //   readRequests: 0,
        //   close: Promise { <pending> }

        // now return a ReadableStream
        return new ReadableStream({
            start(controller) {
                console.log('controller=', controller);

                // push is the chunk handler
                function push() {
                    //ReadableStreamDefaultReader promise return function w/ 2
                    //params. done - boolean (true when stream is done)
                    //Uint8Array - binary buffer
                    streamReader.read().then( ({done, value}) => {
                        if (done) {
                            console.log(`Got stream done. Done state=${done}`);
                            controller.close();
                            return;
                        }
                        controller.enqueue(value); //put current chunk in Q
                        console.log(done,value); //should print false and Uint8Array content
                        push(); //call push again to process next chunk
                    });

                }
                push(); //process first chunk and cont. until done

            },
        });
    })
    .then( stream => {
        console.log(stream)// will print ReadableStream { locked: false, state: 'readable', supportsBYOB: false}
        return new Response( stream, {
            headers: { 'Content-Type': 'application/json'},
        }).json();
    }).then ( result => {
        console.log('result is:', result); //the end result all the chunks parsed as json
    });
};

getJsonFromUrl(url);

- Code explanation
define the function arrow syntax: const getJsonFromUrl= (url)  => {
- call fetch: fetch(url).then( (resp) => {} which returns a promise which returns the response
- returns the response.body promise 
        return resp.body;
- when response.body is ready handle it by extracting a ReadableStreamDefaultReader
    .then( responseBody => {
        const streamReader = responseBody.getReader();
and return a new ReadableStream to process the stream:
        return new ReadableStream({
- The ReadableStream type has three optional callbacks. see: 
interface UnderlyingSource<R = any> {
  cancel?: UnderlyingSourceCancelCallback;
  pull?: UnderlyingSourcePullCallback<R>;
  start?: UnderlyingSourceStartCallback<R>;
  type?: undefined;
}
- The ReadableStream in the example implements the start callback.
            start(controller) {
start() receives a controller (of type ReadableStreamDefaultController)

- The controller can put data on stream Q and close it

    -- Put data in Q:
controller.enqueue(value);
    -- Close stream
controller.close();
- override push to define how data is processed 
function push() {
- Once the new ReadableStream is returned it's processed by 
.then((stream) => {

- which creates a Response w/ the stream content
        return new Response( stream, {
- And at last we print the response
    }).then ( result => {
        console.log('result is:', result); //the end result all the chunks parsed as json
```

#### 16.10.2.2.2 Other streams

```text
ReadableStream
ReadableStreamDefaultReader
ReadableStreamBYOBReader
ReadableStreamBYOBRequest
ReadableByteStreamController
ReadableStreamDefaultController
TransformStream
TransformStreamDefaultController
WritableStream
WritableStreamDefaultWriter
WritableStreamDefaultController
ByteLengthQueuingStrategy
CountQueuingStrategy
TextEncoderStream
TextDecoderStream
CompressionStream
DecompressionStream

                16.10.2.2.3
```

#### 16.10.2.3 HTTP timeouts

```text
There are two server side timeouts
for headers and for the whole request:
server.headersTimeout and server.requestTimeout
if they expire the server responds w/ 408 (the request will not be sent to RequestListener) and close connection
demo:
```

#### 16.10.2.3.1 - side note import.meta

```text
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta
import.meta
The import.meta meta-property exposes context-specific metadata to a JavaScript module. It contains information about the module, such as the module's URL.

Syntax
import.meta
Value
The import.meta object is created by the host environment, as an extensible null-prototype object where all properties are writable, configurable, and enumerable. The spec doesn't specify any properties to be defined on it, but hosts usually implement the following property:

url
The full URL to the module, includes query parameters and/or hash (following the ? or #). In browsers, this is either the URL from which the script was obtained (for external scripts), or the URL of the containing document (for inline scripts). In Node.js, this is the file path (including the file:// protocol).

Description
The import.meta syntax consists of the keyword import, a dot, and the identifier meta. Because import is a reserved word, not an identifier, this is not a property accessor, but a special expression syntax.

The import.meta meta-property is available in JavaScript modules; using import.meta outside of a module (including direct eval() within a module) is a syntax error.
```

#### 16.10.2.3.1.1 Use for Passing query parameters

```text
Using query parameters in the import specifier allows module-specific argument passing, which may be complementary to reading parameters from the application-wide window.location (or on Node.js, through process.argv). For example, with the following HTML:

<script type="module">
  import "./index.mjs?someURLInfo=5";
</script>
Copy to Clipboard
The index.mjs module is able to retrieve the someURLInfo parameter through import.meta:

// index.mjs
new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
Copy to Clipboard
The same applies when a module imports another:

// index.mjs
import "./index2.mjs?someURLInfo=5";

// index2.mjs
new URL(import.meta.url).searchParams.get("someURLInfo"); // 5
The ES module implementation in Node.js supports resolving module specifiers containing query parameters (or the hash), as in the latter example. However, you cannot use queries or hashes when the module is specified through the CLI command (like node index.mjs?someURLInfo=5), because the CLI entrypoint uses a more CommonJS-like resolution mode, treating the path as a file path rather than a URL. To pass parameters to the entrypoint module, use CLI arguments and read them through process.argv instead (like node index.mjs --someURLInfo=5).
```

#### 16.10.2.3.1.2 Getting current module's file path

```text
In Node.js CommonJS modules, there's a __dirname variable that contains the absolute path to the folder containing current module, which is useful for resolving relative paths. However, ES modules cannot have contextual variables except for import.meta. Therefore, to get the current module's file path, you can use import.meta.url.
```

#### 16.10.2.3.1.2.1 Before (CommonJS)

```text
const fs = require("fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "someFile.txt");
fs.readFile(filePath, "utf8").then(console.log);
```

#### 16.10.2.3.1.2.2 After (ES modules)

```text
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";

const filePath = fileURLToPath(new URL('./someFile.txt', import.meta.url));
fs.readFile(filePath, "utf8").then(console.log);

                        16.10.2.3.1.2.3
```

#### 16.10.2.3.2 demo

```text
$ node httpTimeoutes.mjs
headersTimeout= 60000
requestTimeout= 300000
^C
$ cat !$
cat httpTimeoutes.mjs
import express from 'express';
import path, {dirname} from 'path';
import {fileURLToPath} from 'url';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'index.html')));

app.get('/*', (req, res) => {
    setTimeout( () => res.sendFile(path.join(__dirname, './index.html')), 2000);
});

const server = app.listen(8080);
console.log('headersTimeout=', server.headersTimeout);
console.log('requestTimeout=', server.requestTimeout);

                16.10.2.3.3
```

#### 16.10.2.4 Native Test Runner

```text
import the new 'node:test' module.
Write UT and report results in TAP format (TAP= Test Anything Protocol)

Example tests run:
$ node fetch-spec.mjs 
GET from https://jsonplaceholder.typicode.com/todos/1
TAP version 13
Got json {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
} from https://jsonplaceholder.typicode.com/todos/1
# Subtest: Standalone Test fetch positive
ok 1 - Standalone Test fetch positive
  ---
  duration_ms: 112.746666
  ...
GET from null
got error TypeError, message Failed to parse URL from null
# Subtest: Nested Tests, fetch negatives
    # Subtest: Fetch null url
    ok 1 - Fetch null url
      ---
      duration_ms: 0.390417
      ...
GET from https://jsonplaceholder.typicode.com/todos/nonexistent
Got error 404 Not Found
got error Error, message Got error 404 Not Found
    # Subtest: Fetch wrong url
    ok 2 - Fetch wrong url
      ---
      duration_ms: 29.089209
      ...
    1..2
ok 2 - Nested Tests, fetch negatives
  ---
  duration_ms: 29.896416
  ...
1..2
# tests 2
# pass 2
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 154.950833

Tests code:
$ cat fetch.mjs 
const url = 'https://jsonplaceholder.typicode.com/todos/1'
export async function getJsonFromUrl(url){
    console.log(`GET from ${url}`);
    const resp = await fetch(url);
    if (resp.ok) {
        const jsonData = await resp.json();
        console.log(`Got json ${JSON.stringify(jsonData, null, 4)} from ${url}`);
        //console.log(`Got json ${JSON.stringify(jsonData, null, ' ')} from ${url}`);
        //console.log(`Got json ${JSON.stringify(jsonData, null, "\t")} from ${url}`);
        return jsonData;
    }
    else {
        console.error(`Got error ${resp.status} ${resp.statusText}`);
        throw new Error(`Got error ${resp.status} ${resp.statusText}`);
    }
}


//getJsonFromUrl(url);
// module.exports={ getJsonFromUrl};

$ cat fetch-spec.mjs 
import test from 'node:test';
import assert from 'node:assert/strict';
import {getJsonFromUrl} from './fetch.mjs';

test('Standalone Test fetch positive', async (t) => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1'
    const expected = {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false
    };
    const data = await getJsonFromUrl(url);
    assert.deepStrictEqual(data, expected);
});

test('Nested Tests, fetch negatives', async (t) => {
    await t.test('Fetch null url', async (t) => {
        const url = null;
        await assert.rejects(
            getJsonFromUrl(url),
            err => {
                console.log(`got error ${err.name}, message ${err.message}`); // would print got error TypeError, message Failed to parse URL from null
                //assert.strictEqual(err.name, 'TypeError');
                //assert.strictEqual(err.message, 'Failed to parse URL from null');
                return true;
            }
        );
    });
    await t.test('Fetch wrong url', async (t) => {
        const url =  'https://jsonplaceholder.typicode.com/todos/nonexistent';
        await assert.rejects(
            getJsonFromUrl(url),
            err => {
                console.log(`got error ${err.name}, message ${err.message}`); // would print got error TypeError, message Failed to parse URL from null
                assert.equal(err.name, 'Error');
                assert.equal(err.message, 'Got error 404 Not Found');
                return true;
            }
        );
    });
});
```

#### 16.10.2.5 V8 version 10.1

```text
performance improvements:
- class fields and private class methods

features:
- findLast and findLastIndex methods on arrays

- locale improvements: Intl.Locale (https://v8.dev/blog/v8-release-74#intl.locale) improvments (https://v8.dev/blog/v8-release-99#intl.locale-extensions)
  added properties calendars, collations, hourCycles, numberingSystems, timeZones, textInfo, and weekInfo.
- Intl supportedValuesOf (https://v8.dev/blog/v8-release-99#intl-enumeration) 

demo code:
$ cat v8_ver10_1_features.mjs | pbcopy
import { setTimeout } from 'timers/promises';

console.log('Demo new features in V8 10.1');


console.log('Locale improvements. mainly added properties: calendars, collations, hourCycles, numberingSystems, timeZones, textInfo, and weekInfo.');
function printIntlLocaleDetails(localeStr) {
    console.log('Printing locale', localeStr);
    try {
        const locale= new Intl.Locale(localeStr);
        console.log(`${locale} details:`);
        console.log(`locale calendar: ${locale.calendars}, collations: ${locale.collations}, hourCycles: ${locale.hourCycles}, numberingSystems: ${locale.numberingSystems}, writing direction: ${JSON.stringify(locale.textInfo)}, week info: ${JSON.stringify(locale.weekInfo)}`);
        console.log('locale timeZones', locale.timeZones);
    }
    catch (err) {
        console.log(`cant init locale due to error ${err.name} ${err.message}`);
    }
}
//const eUSLocale= new Intl.Locale('en-us');
// printIntlLocaleDetails('en-us');

function allLocalesDetails() {
//Locale list courtesy of SAP help :) - https://help.sap.com/docs/SAP_BUSINESSOBJECTS_BUSINESS_INTELLIGENCE_PLATFORM/09382741061c40a989fae01e61d54202/46758c5e6e041014910aba7db0e91070.html?locale=en-US
const all_locales=[	'af-ZA',	'sq-AL',	'ar-DZ',	'ar-BH',	'ar-EG',	'ar-IQ',	'ar-JO',	'ar-KW',	'ar-LB',	'ar-LY',	'ar-MA',	'ar-OM',	'ar-QA',	'ar-SA',	'ar-SY',	'ar-TN',	'ar-AE',	'ar-YE',	'hy-AM',	'az-AZ',	'eu-ES',	'be-BY',	'bn-IN',	'bs-BA',	'bg-BG',	'ca-ES',	'zh-CN',	'zh-HK',	'zh-MO',	'zh-SG',	'zh-TW',	'hr-HR',	'cs-CZ',	'da-DK',	'nl-BE',	'nl-NL',	'en-AU',	'en-BZ',	'en-CA',	'en-IE',	'en-JM',	'en-NZ',	'en-PH',	'en-ZA',	'en-TT',	'en-VI',	'en-GB',	'en-US',	'en-ZW',	'et-EE',	'fo-FO',	'fi-FI',	'fr-BE',	'fr-CA',	'fr-FR',	'fr-LU',	'fr-MC',	'fr-CH',	'gl-ES',	'ka-GE',	'de-AT',	'de-DE',	'de-LI',	'de-LU',	'de-CH',	'el-GR',	'gu-IN',	'he-IL',	'hi-IN',	'hu-HU',	'is-IS',	'id-ID',	'it-IT',	'it-CH',	'ja-JP',	'kn-IN',	'kk-KZ',	'kok-IN',	'ko-KR',	'lv-LV',	'lt-LT',	'mk-MK',	'ms-BN',	'ms-MY',	'ml-IN',	'mt-MT',	'mr-IN',	'mn-MN',	'se-NO',	'nb-NO',	'nn-NO',	'fa-IR',	'pl-PL',	'pt-BR',	'pt-PT',	'pa-IN',	'ro-RO',	'ru-RU',	'sr-BA',	'sr-CS',	'sk-SK',	'sl-SI',	'es-AR',	'es-BO',	'es-CL',	'es-CO',	'es-CR',	'es-DO',	'es-EC',	'es-SV',	'es-GT',	'es-HN',	'es-MX',	'es-NI',	'es-PA',	'es-PY',	'es-PE',	'es-PR',	'es-ES',	'es-UY',	'es-VE',	'sw-KE',	'sv-FI',	'sv-SE',	'syr-SY',	'ta-IN',	'te-IN',	'th-TH',	'tn-ZA',	'tr-TR',	'uk-UA',	'uz-UZ',	'vi-VN',	'cy-GB',	'xh-ZA',	'zu-ZA',];	
}

const all_locale_abber = [['Afrikaans (South Africa)',	'af-ZA'], ['Albanian (Albania)',	'sq-AL'], ['Arabic (Algeria)',	'ar-DZ'], ['Arabic (Bahrain)',	'ar-BH'], ['Arabic (Egypt)',	'ar-EG'], ['Arabic (Iraq)',	'ar-IQ'], ['Arabic (Jordan)',	'ar-JO'], ['Arabic (Kuwait)',	'ar-KW'], ['Arabic (Lebanon)',	'ar-LB'], ['Arabic (Libya)',	'ar-LY'], ['Arabic (Morocco)',	'ar-MA'], ['Arabic (Oman)',	'ar-OM'], ['Arabic (Qatar)',	'ar-QA'], ['Arabic (Saudi Arabia)',	'ar-SA'], ['Arabic (Syria)',	'ar-SY'], ['Arabic (Tunisia)',	'ar-TN'], ['Arabic (United Arab Emirates)',	'ar-AE'], ['Arabic (Yemen)',	'ar-YE'], ['Armenian (Armenia)',	'hy-AM'], ['Azerbaijani (Azerbaijan)',	'az-AZ'], ['Basque (Spain)',	'eu-ES'], ['Belarusian (Belarus)',	'be-BY'], ['Bengali (India)',	'bn-IN'], ['Bosnian (Bosnia and Herzegovina)',	'bs-BA'], ['Bulgarian (Bulgaria)',	'bg-BG'], ['Catalan (Spain)',	'ca-ES'], ['Chinese (China)',	'zh-CN'], ['Chinese (Hong Kong SAR China)',	'zh-HK'], ['Chinese (Macao SAR China)',	'zh-MO'], ['Chinese (Singapore)',	'zh-SG'], ['Chinese (Taiwan)',	'zh-TW'], ['Croatian (Croatia)',	'hr-HR'], ['Czech (Czech Republic)',	'cs-CZ'], ['Danish (Denmark)',	'da-DK'], ['Dutch (Belgium)',	'nl-BE'], ['Dutch (Netherlands)',	'nl-NL'], ['English (Australia)',	'en-AU'], ['English (Belize)',	'en-BZ'], ['English (Canada)',	'en-CA'], ['English (Ireland)',	'en-IE'], ['English (Jamaica)',	'en-JM'], ['English (New Zealand)',	'en-NZ'], ['English (Philippines)',	'en-PH'], ['English (South Africa)',	'en-ZA'], ['English (Trinidad and Tobago)',	'en-TT'], ['English (U.S. Virgin Islands)',	'en-VI'], ['English (United Kingdom)',	'en-GB'], ['English (United States)',	'en-US'], ['English (Zimbabwe)',	'en-ZW'], ['Estonian (Estonia)',	'et-EE'], ['Faroese (Faroe Islands)',	'fo-FO'], ['Finnish (Finland)',	'fi-FI'], ['French (Belgium)',	'fr-BE'], ['French (Canada)',	'fr-CA'], ['French (France)',	'fr-FR'], ['French (Luxembourg)',	'fr-LU'], ['French (Monaco)',	'fr-MC'], ['French (Switzerland)',	'fr-CH'], ['Galician (Spain)',	'gl-ES'], ['Georgian (Georgia)',	'ka-GE'], ['German (Austria)',	'de-AT'], ['German (Germany)',	'de-DE'], ['German (Liechtenstein)',	'de-LI'], ['German (Luxembourg)',	'de-LU'], ['German (Switzerland)',	'de-CH'], ['Greek (Greece)',	'el-GR'], ['Gujarati (India)',	'gu-IN'], ['Hebrew (Israel)',	'he-IL'], ['Hindi (India)',	'hi-IN'], ['Hungarian (Hungary)',	'hu-HU'], ['Icelandic (Iceland)',	'is-IS'], ['Indonesian (Indonesia)',	'id-ID'], ['Italian (Italy)',	'it-IT'], ['Italian (Switzerland)',	'it-CH'], ['Japanese (Japan)',	'ja-JP'], ['Kannada (India)',	'kn-IN'], ['Kazakh (Kazakhstan)',	'kk-KZ'], ['Konkani (India)	k','ok-IN'], ['Korean (South Korea)',	'ko-KR'], ['Latvian (Latvia)',	'lv-LV'], ['Lithuanian (Lithuania)',	'lt-LT'], ['Macedonian (Macedonia)',	'mk-MK'], ['Malay (Brunei)',	'ms-BN'], ['Malay (Malaysia)',	'ms-MY'], ['Malayalam (India)',	'ml-IN'], ['Maltese (Malta)',	'mt-MT'], ['Marathi (India)',	'mr-IN'], ['Mongolian (Mongolia)',	'mn-MN'], ['Northern Sami (Norway)',	'se-NO'], ['Norwegian Bokml (Norway)',	'nb-NO'], ['Norwegian Nynorsk (Norway)',	'nn-NO'], ['Persian (Iran)',	'fa-IR'], ['Polish (Poland)',	'pl-PL'], ['Portuguese (Brazil)',	'pt-BR'], ['Portuguese (Portugal)',	'pt-PT'], ['Punjabi (India)',	'pa-IN'], ['Romanian (Romania)',	'ro-RO'], ['Russian (Russia)',	'ru-RU'], ['Serbian (Bosnia and Herzegovina)',	'sr-BA'], ['Serbian (Serbia And Montenegro)',	'sr-CS'], ['Slovak (Slovakia)',	'sk-SK'], ['Slovenian (Slovenia)',	'sl-SI'], ['Spanish (Argentina)',	'es-AR'], ['Spanish (Bolivia)',	'es-BO'], ['Spanish (Chile)',	'es-CL'], ['Spanish (Colombia)',	'es-CO'], ['Spanish (Costa Rica)',	'es-CR'], ['Spanish (Dominican Republic)',	'es-DO'], ['Spanish (Ecuador)',	'es-EC'], ['Spanish (El Salvador)',	'es-SV'], ['Spanish (Guatemala)',	'es-GT'], ['Spanish (Honduras)',	'es-HN'], ['Spanish (Mexico)',	'es-MX'], ['Spanish (Nicaragua)',	'es-NI'], ['Spanish (Panama)',	'es-PA'], ['Spanish (Paraguay)',	'es-PY'], ['Spanish (Peru)',	'es-PE'], ['Spanish (Puerto Rico)',	'es-PR'], ['Spanish (Spain)',	'es-ES'], ['Spanish (Uruguay)',	'es-UY'], ['Spanish (Venezuela)',	'es-VE'], ['Swahili (Kenya)',,	'sw-KE'], ['Swedish (Finland)',	'sv-FI'], ['Swedish (Sweden)',	'sv-SE'], ['Syriac (Syria)	s','yr-SY'], ['Tamil (India)',	'ta-IN'], ['Telugu (India)',	'te-IN'], ['Thai (Thailand)',	'th-TH'], ['swana (South Africa)',	'tn-ZA'], ['Turkish (Turkey)',	'tr-TR'], ['Ukrainian (Ukraine)',	'uk-UA'], ['Uzbek (Uzbekistan)',	'uz-UZ'], ['Vietnamese (Vietnam)',	'vi-VN'], ['Welsh (United Kingdom)',	'cy-GB'], ['Xhosa (South Africa)',	'xh-ZA'], ['Zulu (South Africa)',	'zu-ZA'],];

let pauseTimes=0;
console.log('--------------------------------------------------------------------------------');
for (const locale_abber of all_locale_abber) {
    pauseTimes++;
    if (pauseTimes == 5){
        console.log('--------------------------------------------------------------------------------');
        await setTimeout(1500);
        pauseTimes = 0;
    }
    console.log(`Printing the details of locale ${locale_abber[0]} ${locale_abber[1]}`);
    printIntlLocaleDetails(locale_abber[1]);
}

console.log('--------------------------------------------------------------------------------');
console.log('Locale improvements. get array of supported values in V8 for Intl APIs using Intl.supportedValuesOf(code). code can be calander, collation, currency, numberingSystems, timeZone etc');
console.log(Intl.supportedValuesOf('calendar'));
await setTimeout(1000);
console.log('--------------------------------------------------------------------------------');
console.log(Intl.supportedValuesOf('collation'));
await setTimeout(1000);
console.log('--------------------------------------------------------------------------------');
console.log(Intl.supportedValuesOf('currency'));
await setTimeout(1000);
console.log('--------------------------------------------------------------------------------');
console.log(Intl.supportedValuesOf('numberingSystem'));
await setTimeout(1000);
console.log('--------------------------------------------------------------------------------');
console.log(Intl.supportedValuesOf('timeZone'));
await setTimeout(1000);
console.log('--------------------------------------------------------------------------------');

console.log('Array findLast and findLastIndex...');
const myArray = [
    {val: 1 },
    {val: 2 },
    {val: 3 },
    {val: 4 },
    {val: 5 },
    {val: 6 },
    {val: 7 },
    {val: 8 },
    {val: 9 },
    {val: 10},
    {val: 11},
];

console.log(`Find element divisible by 5 ${JSON.stringify(myArray.find( elem => elem.val %5 == 0))}`);
console.log(`Find last element divisible by 5 ${JSON.stringify(myArray.findLast( elem => elem.val %5 == 0))}`);
console.log(`Find index of element divisible by 5 ${myArray.findIndex( elem => elem.val %5 == 0)}`);
console.log(`Find index of last element divisible by 5 ${myArray.findLastIndex( elem => elem.val %5 == 0)}`);
console.log('--------------------------------------------------------------------------------');


            16.10.2.6
        16.10.3
```

## 16.11 node version 19

## 16.12 node version 20
