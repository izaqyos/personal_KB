---
type: reference
title: Timers
description: "Node.js timers: setTimeout, setImmediate, setInterval and clearing them."
tags: [nodejs, async, javascript, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#10"
---

# Timers, tags: Timers, setTimeout, setImmediate, setInterval

[↑ nodejs-kb](/kb-nodejs/README.md)

```text
detailed explanation: <url:#r=_nodejs_eventloop_timers_and_nexttick>
```

## 10.1 https://nodejs.org/en/docs/guides/timers-in-node/

```text
Timers in Node.js and beyond

The Timers module in Node.js contains functions that execute code after a set period of time. Timers do not need to be imported via require(), since all the methods are available globally to emulate the browser JavaScript API. To fully understand when timer functions will be executed, it's a good idea to read up on the the Node.js Event Loop.

Controlling the Time Continuum with Node.js

The Node.js API provides several ways of scheduling code to execute at some point after the present moment. The functions below may seem familiar, since they are available in most browsers, but Node.js actually provides its own implementation of these methods. Timers integrate very closely with the system, and despite the fact that the API mirrors the browser API, there are some differences in implementation.
```

### 10.1.1 "When I say so" Execution ~ setTimeout()

```text
setTimeout() can be used to schedule code execution after a designated amount of milliseconds. This function is similar to window.setTimeout() from the browser JavaScript API, however a string of code cannot be passed to be executed.

setTimeout() accepts a function to execute as its first argument and the millisecond delay defined as a number as the second argument. Additional arguments may also be included and these will be passed on to the function. Here is an example of that:

function myFunc(arg) {
  console.log(`arg was => ${arg}`);
}

setTimeout(myFunc, 1500, 'funky');
The above function myFunc() will execute as close to 1500 milliseconds (or 1.5 seconds) as possible due to the call of setTimeout().

The timeout interval that is set cannot be relied upon to execute after that exact number of milliseconds. This is because other executing code that blocks or holds onto the event loop will push the execution of the timeout back. The only guarantee is that the timeout will not execute sooner than the declared timeout interval.

setTimeout() returns a Timeout object that can be used to reference the timeout that was set. This returned object can be used to cancel the timeout ( see clearTimeout() below) as well as change the execution behavior (see unref() below).
```

### 10.1.2 "Right after this" Execution ~ setImmediate()

```text
setImmediate() will execute code at the end of the current event loop cycle. This code will execute after any I/O operations in the current event loop and before any timers scheduled for the next event loop. This code execution could be thought of as happening "right after this", meaning any code following the setImmediate() function call will execute before the setImmediate() function argument.

The first argument to setImmediate() will be the function to execute. Any subsequent arguments will be passed to the function when it is executed. Here's an example:

console.log('before immediate');

setImmediate((arg) => {
  console.log(`executing immediate: ${arg}`);
}, 'so immediate');

console.log('after immediate');
The above function passed to setImmediate() will execute after all runnable code has executed, and the console output will be:

before immediate
after immediate
executing immediate: so immediate
setImmediate() returns an Immediate object, which can be used to cancel the scheduled immediate (see clearImmediate() below).

Note: Don't get setImmediate() confused with process.nextTick(). There are some major ways they differ. The first is that process.nextTick() will run before any Immediates that are set as well as before any scheduled I/O. The second is that process.nextTick() is non-clearable, meaning once code has been scheduled to execute with process.nextTick(), the execution cannot be stopped, just like with a normal function. Refer to this guide to better understand the operation of process.nextTick().


My Demo:
$ node watchDogDemo.js 
simple emmitter demo
************
an event occurred!
************
WatchDog::constructur() 
WatchDog::startWatch() for the night is cold and full of terror
more complex emmitter demo. A WatchDog thread the checks for a condition ever x ms and emits an event when condition is met
WatchDog::checkEnvVarHasChanged() 
WatchDog::emitEnvVarChanged() 
************
WatchDog::on(envVarHasChanged) called for env var NODE_ENV
************
WatchDog::checkEnvVarHasChanged() 
WatchDog::emitEnvVarChanged() 
************

code:
$ cat !$
cat watchDogDemo.js
const evtEmitter = require('events');

class MyEmitter extends evtEmitter {
  constructor() {
    super(); //must call super for "this" to be defined.
  }
}

console.log('simple emmitter demo');
const myEmitter = new MyEmitter();
myEmitter.on('event1', () => {
                console.log('************');
  console.log('an event occurred!');
                console.log('************');
});
myEmitter.emit('event1');

class WatchDog extends evtEmitter{

        constructor(){
                super(); //defines this
                console.log('WatchDog::constructur() ');
                this.envVarToWatch = 'NODE_ENV';
                this.envVarToWatchValue = process.env.NODE_ENV;
                this.fileToWatch = 'test';
                this.shouldStop=false;
        }

        emitEnvVarChanged(envName){
                console.log('WatchDog::emitEnvVarChanged() ');
                this.emit('envVarHasChanged', 'NODE_ENV'); 
        }

        checkEnvVarHasChanged(){
                console.log('WatchDog::checkEnvVarHasChanged() ');
                this.curVal = process.env.NODE_ENV;
                if (this.curVal !== this.envVarToWatchValue){
                    console.log('WatchDog::checkEnvVarHasChanged() detected change'); 
                    //this.emitEnvVarChanged('NODE_ENV'); 
                }
                this.emitEnvVarChanged('NODE_ENV'); // for real check put in above condition. I want to simulate change so emit always
        }

        sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }

        async startWatch(ms){
                console.log('WatchDog::startWatch() for the night is cold and full of terror');
                this.shouldStop = false; //stop by calling stopWatch 
                while (!this.shouldStop){
                    //console.log('WatchDog::startWatch() before sleep');
                        await this.sleep(ms);
                        this.checkEnvVarHasChanged();
                    //console.log('WatchDog::startWatch() after sleep');
                }
        }

        stopWatch(){
                console.log('WatchDog::stopWatch() ');
                this.shouldStop = true; 
        }
}

const wd = new WatchDog();
wd.on('envVarHasChanged', function(envName){
                console.log('************');
                console.log('WatchDog::on(envVarHasChanged) called for env var %s', envName);
                console.log('************');
        });


wd.startWatch(1000); //ms
//wd.emit('envVarHasChanged');


console.log('more complex emmitter demo. A WatchDog thread the checks for a condition ever x ms and emits an event when condition is met');
```

### 10.1.3 "Infinite Loop" Execution ~ setInterval()

```text
If there is a block of code that should execute multiple times, setInterval() can be used to execute that code. setInterval() takes a function argument that will run an infinite number of times with a given millisecond delay as the second argument. Just like setTimeout(), additional arguments can be added beyond the delay, and these will be passed on to the function call. Also like setTimeout(), the delay cannot be guaranteed because of operations that may hold on to the event loop, and therefore should be treated as an approximate delay. See the below example:

function intervalFunc() {
  console.log('Cant stop me now!');
}
        
        setInterval(intervalFunc, 1500);
In the above example, intervalFunc() will execute about every 1500 milliseconds, or 1.5 seconds, until it is stopped (see below).

Just like setTimeout(), setInterval() also returns a Timeout object which can be used to reference and modify the interval that was set.
```

### 10.1.4 Clearing the Future

```text
What can be done if a Timeout or Immediate object needs to be cancelled? setTimeout(), setImmediate(), and setInterval() return a timer object that can be used to reference the set Timeout or Immediate object. By passing said object into the respective clear function, execution of that object will be halted completely. The respective functions are clearTimeout(), clearImmediate(), and clearInterval(). See the example below for an example of each:

const timeoutObj = setTimeout(() => {
  console.log('timeout beyond time');
}, 1500);

const immediateObj = setImmediate(() => {
  console.log('immediately executing immediate');
});

const intervalObj = setInterval(() => {
  console.log('interviewing the interval');
}, 500);

clearTimeout(timeoutObj);
clearImmediate(immediateObj);
clearInterval(intervalObj);
Leaving Timeouts Behind

Remember that Timeout objects are returned by setTimeout and setInterval. The Timeout object provides two functions intended to augment Timeout behavior with unref() and ref(). If there is a Timeout object scheduled using a set function, unref() can be called on that object. This will change the behavior slightly, and not call the Timeout object if it is the last code to execute. The Timeout object will not keep the process alive, waiting to execute.

In similar fashion, a Timeout object that has had unref() called on it can remove that behavior by calling ref() on that same Timeout object, which will then ensure its execution. Be aware, however, that this does not exactly restore the initial behavior for performance reasons. See below for examples of both:

const timerObj = setTimeout(() => {
  console.log('will i run?');
});

// if left alone, this statement will keep the above
// timeout from running, since the timeout will be the only
// thing keeping the program from exiting
timerObj.unref();

// we can bring it back to life by calling ref() inside
// an immediate
setImmediate(() => {
  timerObj.ref();
});
Further Down the Event Loop

There's much more to the Event Loop and Timers than this guide has covered. To learn more about the internals of the Node.js Event Loop and how Timers operate during execution, check out this Node.js guide: The Node.js Event Loop, Timers, and process.nextTick().
```

## 10.2 The event loop

```text
https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

The Node.js Event Loop, Timers, and process.nextTick()

What is the Event Loop?

The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded — by offloading operations to the system kernel whenever possible.

Since most modern kernels are multi-threaded, they can handle multiple operations executing in the background. When one of these operations completes, the kernel tells Node.js so that the appropriate callback may be added to the poll queue to eventually be executed. We'll explain this in further detail later in this topic.

Event Loop Explained

When Node.js starts, it initializes the event loop, processes the provided input script (or drops into the REPL, which is not covered in this document) which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

The following diagram shows a simplified overview of the event loop's order of operations.

   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
note: each box will be referred to as a "phase" of the event loop.

Each phase has a FIFO queue of callbacks to execute. While each phase is special in its own way, generally, when the event loop enters a given phase, it will perform any operations specific to that phase, then execute callbacks in that phase's queue until the queue has been exhausted or the maximum number of callbacks has executed. When the queue has been exhausted or the callback limit is reached, the event loop will move to the next phase, and so on.

Since any of these operations may schedule more operations and new events processed in the poll phase are queued by the kernel, poll events can be queued while polling events are being processed. As a result, long running callbacks can allow the poll phase to run much longer than a timer's threshold. See the timers and poll sections for more details.

NOTE: There is a slight discrepancy between the Windows and the Unix/Linux implementation, but that's not important for this demonstration. The most important parts are here. There are actually seven or eight steps, but the ones we care about — ones that Node.js actually uses - are those above.

Phases Overview

timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
pending callbacks: executes I/O callbacks deferred to the next loop iteration.
idle, prepare: only used internally.
poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
check: setImmediate() callbacks are invoked here.
close callbacks: some close callbacks, e.g. socket.on('close', ...).
Between each run of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers and shuts down cleanly if there are not any.

Phases in Detail

timers

A timer specifies the threshold after which a provided callback may be executed rather than the exact time a person wants it to be executed. Timers callbacks will run as early as they can be scheduled after the specified amount of time has passed; however, Operating System scheduling or the running of other callbacks may delay them.

Note: Technically, the poll phase controls when timers are executed.

For example, say you schedule a timeout to execute after a 100 ms threshold, then your script starts asynchronously reading a file which takes 95 ms:

const fs = require('fs');

function someAsyncOperation(callback) {
  // Assume this takes 95ms to complete
  fs.readFile('/path/to/file', callback);
}

const timeoutScheduled = Date.now();

setTimeout(() => {
  const delay = Date.now() - timeoutScheduled;

  console.log(`${delay}ms have passed since I was scheduled`);
}, 100);


// do someAsyncOperation which takes 95 ms to complete
someAsyncOperation(() => {
  const startCallback = Date.now();

  // do something that will take 10ms...
  while (Date.now() - startCallback < 10) {
    // do nothing
  }
});
When the event loop enters the poll phase, it has an empty queue (fs.readFile() has not completed), so it will wait for the number of ms remaining until the soonest timer's threshold is reached. While it is waiting 95 ms pass, fs.readFile() finishes reading the file and its callback which takes 10 ms to complete is added to the poll queue and executed. When the callback finishes, there are no more callbacks in the queue, so the event loop will see that the threshold of the soonest timer has been reached then wrap back to the timers phase to execute the timer's callback. In this example, you will see that the total delay between the timer being scheduled and its callback being executed will be 105ms.

Note: To prevent the poll phase from starving the event loop, libuv (the C library that implements the Node.js event loop and all of the asynchronous behaviors of the platform) also has a hard maximum (system dependent) before it stops polling for more events.

pending callbacks

This phase executes callbacks for some system operations such as types of TCP errors. For example if a TCP socket receives ECONNREFUSED when attempting to connect, some *nix systems want to wait to report the error. This will be queued to execute in the pending callbacks phase.

poll

The poll phase has two main functions:

Calculating how long it should block and poll for I/O, then
Processing events in the poll queue.
When the event loop enters the poll phase and there are no timers scheduled, one of two things will happen:

If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted, or the system-dependent hard limit is reached.

If the poll queue is empty, one of two more things will happen:

If scripts have been scheduled by setImmediate(), the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.

If scripts have not been scheduled by setImmediate(), the event loop will wait for callbacks to be added to the queue, then execute them immediately.

Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached. If one or more timers are ready, the event loop will wrap back to the timers phase to execute those timers' callbacks.

check

This phase allows a person to execute callbacks immediately after the poll phase has completed. If the poll phase becomes idle and scripts have been queued with setImmediate(), the event loop may continue to the check phase rather than waiting.

setImmediate() is actually a special timer that runs in a separate phase of the event loop. It uses a libuv API that schedules callbacks to execute after the poll phase has completed.

Generally, as the code is executed, the event loop will eventually hit the poll phase where it will wait for an incoming connection, request, etc. However, if a callback has been scheduled with setImmediate() and the poll phase becomes idle, it will end and continue to the check phase rather than waiting for poll events.

close callbacks

If a socket or handle is closed abruptly (e.g. socket.destroy()), the 'close' event will be emitted in this phase. Otherwise it will be emitted via process.nextTick().

setImmediate() vs setTimeout()

setImmediate and setTimeout() are similar, but behave in different ways depending on when they are called.

setImmediate() is designed to execute a script once the current poll phase completes.
setTimeout() schedules a script to be run after a minimum threshold in ms has elapsed.
The order in which the timers are executed will vary depending on the context in which they are called. If both are called from within the main module, then timing will be bound by the performance of the process (which can be impacted by other applications running on the machine).

For example, if we run the following script which is not within an I/O cycle (i.e. the main module), the order in which the two timers are executed is non-deterministic, as it is bound by the performance of the process:

// timeout_vs_immediate.js
setTimeout(() => {
  console.log('timeout');
}, 0);

setImmediate(() => {
  console.log('immediate');
});
$ node timeout_vs_immediate.js
timeout
immediate

$ node timeout_vs_immediate.js
immediate
timeout
However, if you move the two calls within an I/O cycle, the immediate callback is always executed first:

// timeout_vs_immediate.js
const fs = require('fs');

fs.readFile(__filename, () => {
  setTimeout(() => {
    console.log('timeout');
  }, 0);
  setImmediate(() => {
    console.log('immediate');
  });
});
$ node timeout_vs_immediate.js
immediate
timeout

$ node timeout_vs_immediate.js
immediate
timeout
The main advantage to using setImmediate() over setTimeout() is setImmediate() will always be executed before any timers if scheduled within an I/O cycle, independently of how many timers are present.

process.nextTick()

Understanding process.nextTick()

You may have noticed that process.nextTick() was not displayed in the diagram, even though it's a part of the asynchronous API. This is because process.nextTick() is not technically part of the event loop. Instead, the nextTickQueue will be processed after the current operation completes, regardless of the current phase of the event loop.

Looking back at our diagram, any time you call process.nextTick() in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues. This can create some bad situations because it allows you to "starve" your I/O by making recursive process.nextTick() calls, which prevents the event loop from reaching the poll phase.

Why would that be allowed?

Why would something like this be included in Node.js? Part of it is a design philosophy where an API should always be asynchronous even where it doesn't have to be. Take this code snippet for example:

function apiCall(arg, callback) {
  if (typeof arg !== 'string')
    return process.nextTick(callback,
                            new TypeError('argument should be string'));
}
The snippet does an argument check and if it's not correct, it will pass the error to the callback. The API updated fairly recently to allow passing arguments to process.nextTick() allowing it to take any arguments passed after the callback to be propagated as the arguments to the callback so you don't have to nest functions.

What we're doing is passing an error back to the user but only after we have allowed the rest of the user's code to execute. By using process.nextTick() we guarantee that apiCall() always runs its callback after the rest of the user's code and before the event loop is allowed to proceed. To achieve this, the JS call stack is allowed to unwind then immediately execute the provided callback which allows a person to make recursive calls to process.nextTick() without reaching a RangeError: Maximum call stack size exceeded from v8.

This philosophy can lead to some potentially problematic situations. Take this snippet for example:

let bar;

// this has an asynchronous signature, but calls callback synchronously
function someAsyncApiCall(callback) { callback(); }

// the callback is called before `someAsyncApiCall` completes.
someAsyncApiCall(() => {
  // since someAsyncApiCall has completed, bar hasn't been assigned any value
  console.log('bar', bar); // undefined
});

bar = 1;
The user defines someAsyncApiCall() to have an asynchronous signature, but it actually operates synchronously. When it is called, the callback provided to someAsyncApiCall() is called in the same phase of the event loop because someAsyncApiCall() doesn't actually do anything asynchronously. As a result, the callback tries to reference bar even though it may not have that variable in scope yet, because the script has not been able to run to completion.

By placing the callback in a process.nextTick(), the script still has the ability to run to completion, allowing all the variables, functions, etc., to be initialized prior to the callback being called. It also has the advantage of not allowing the event loop to continue. It may be useful for the user to be alerted to an error before the event loop is allowed to continue. Here is the previous example using process.nextTick():

let bar;

function someAsyncApiCall(callback) {
  process.nextTick(callback);
}

someAsyncApiCall(() => {
  console.log('bar', bar); // 1
});

bar = 1;
Here's another real world example:

const server = net.createServer(() => {}).listen(8080);

server.on('listening', () => {});
When only a port is passed, the port is bound immediately. So, the 'listening' callback could be called immediately. The problem is that the .on('listening') callback will not have been set by that time.

To get around this, the 'listening' event is queued in a nextTick() to allow the script to run to completion. This allows the user to set any event handlers they want.

process.nextTick() vs setImmediate()

We have two calls that are similar as far as users are concerned, but their names are confusing.

process.nextTick() fires immediately on the same phase
setImmediate() fires on the following iteration or 'tick' of the event loop
In essence, the names should be swapped. process.nextTick() fires more immediately than setImmediate(), but this is an artifact of the past which is unlikely to change. Making this switch would break a large percentage of the packages on npm. Every day more new modules are being added, which means every day we wait, more potential breakages occur. While they are confusing, the names themselves won't change.

We recommend developers use setImmediate() in all cases because it's easier to reason about (and it leads to code that's compatible with a wider variety of environments, like browser JS.)

Why use process.nextTick()?

There are two main reasons:

Allow users to handle errors, cleanup any then unneeded resources, or perhaps try the request again before the event loop continues.

At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.

One example is to match the user's expectations. Simple example:

const server = net.createServer();
server.on('connection', (conn) => { });

server.listen(8080);
server.on('listening', () => { });
Say that listen() is run at the beginning of the event loop, but the listening callback is placed in a setImmediate(). Unless a hostname is passed, binding to the port will happen immediately. For the event loop to proceed, it must hit the poll phase, which means there is a non-zero chance that a connection could have been received allowing the connection event to be fired before the listening event.

Another example is running a function constructor that was to, say, inherit from EventEmitter and it wanted to call an event within the constructor:

const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);
  this.emit('event');
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
You can't emit an event from the constructor immediately because the script will not have processed to the point where the user assigns a callback to that event. So, within the constructor itself, you can use process.nextTick() to set a callback to emit the event after the constructor has finished, which provides the expected results:

const EventEmitter = require('events');
const util = require('util');

function MyEmitter() {
  EventEmitter.call(this);

  // use nextTick to emit the event once a handler is assigned
  process.nextTick(() => {
    this.emit('event');
  });
}
util.inherits(MyEmitter, EventEmitter);

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});

    10.3
```
