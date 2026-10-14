---
type: reference
title: NodeJS Design patterns
description: "Notes from the book Node.js Design Patterns: philosophy, reactor pattern and modules."
tags: [nodejs, design-patterns, book-notes, architecture, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#17"
---

# NodeJS Design patterns

[↑ nodejs-kb](/kb-nodejs/README.md)

```text
 open  ~/Downloads/Node.js_Design_Patterns__Mario_Casciaro.pdf
```

## 17.1 basics

### 17.1.1 nodejs philosophy

```text
- Modules and packages 
  Node.js uses the concept of module as a fundamental mean to structure the code of a
program. It is the brick for creating applications and reusable libraries called packages
(a package is also frequently referred to as just module; since, usually it has one
single module as an entry point). In Node.js, one of the most evangelized principles
is to design small modules, not only in terms of code size, but most importantly in
terms of scope.

- This principle has its roots in the Unix philosophy, particularly in two of its
precepts, which are as follows:
• "Small is beautiful."
• "Make each program do one thing well."
Node.js brought these concepts to a whole new level. Along with the help of npm,
the official package manager, Node.js helps solving the dependency hell problem
by making sure that each installed package will have its own separate set of
dependencies, thus enabling a program to depend on a lot of packages without
incurring in conflicts. The Node way, in fact, involves extreme levels of reusability,
whereby applications are composed of a high number of small, well-focused
dependencies. While this can be considered unpractical or even totally unfeasible
in other platforms, in Node.js this practice is encouraged. As a consequence, it is
not rare to find npm packages containing less than 100 lines of code or exposing
only one single function.
Besides the clear advantage in terms of reusability, a small module is also considered
to be the following:
• Easier to understand and use
• Simpler to test and maintain
• Perfect to share with the browser
Having smaller and more focused modules empowers everyone to share or reuse
even the smallest piece of code; it's the Don't Repeat Yourself (DRY) principle
applied at a whole new level

- small surface area 
In addition to being small in size and scope, Node.js modules usually also have the
characteristic of exposing only a minimal set of functionality. The main advantage
here is an increased usability of the API, which means that the API becomes clearer
to use and is less exposed to erroneous usage. Most of the time, in fact, the user of a
component is interested only in a very limited and focused set of features, without
the need to extend its functionality or tap into more advanced aspects.
In Node.js, a very common pattern for defining modules is to expose only one piece
of functionality, such as a function or a constructor, while letting more advanced
aspects or secondary features become properties of the exported function or
constructor. This helps the user to identify what is important and what is secondary.
It is not rare to find modules that expose only one function and nothing else, for the
simple fact that it provides a single, unmistakably clear entry point.

-  KISS principal 
```

### 17.1.2 reactor pattern

#### 17.1.2.1 background

```text
- IO is slow. RAM access is in the nanoseconds. Disk/network milliseconds
- bandwidth wise, similar. RAM reads are in order of GB/s. Disk/Network MB/s up to GB/s 
- human IO (UX) is orders of magnitude slower 

blocking IO calls (ex: buffer = socketfd.read() ) requires specific solutions for handling multiple request in parallel
a common model is to spawn (or acquire from pool) a worker thread so that when it blocks the main thread still unblocked
The cons of this model is that the worker threads are idle or blocked for a long time (processing an incoming 
request can further block on disk R/W etc) and that threads are not a cheap resource (they consume memory and 
have CPU context-switch cost)

most OSes support also non blocking IO calls 
In addition to blocking I/O, most modern operating systems support another
mechanism to access resources, called non-blocking I/O. In this operating mode,
the system call always returns immediately without waiting for the data to be read
or written. If no results are available at the moment of the call, the function will
simply return a predefined constant, indicating that there is no data available to
return at that moment.
For example, in Unix operating systems, the fcntl() function is used to
manipulate an existing file descriptor to change its operating mode to non-blocking
(with the O_NONBLOCK flag). Once the resource is in non-blocking mode, any read
operation will fail with a return code, EAGAIN, in case the resource doesn't have any
data ready to be read 

The most basic pattern for accessing this kind of non-blocking I/O is to actively
poll the resource within a loop until some actual data is returned; this is called
busy-waiting. The following pseudocode shows you how it's possible to read
from multiple resources using non-blocking I/O and a polling loop:
resources = [socketA, socketB, pipeA];
while(!resources.isEmpty()) {
for(i = 0; i < resources.length; i++) {
resource = resources[i];
//try to read
var data = resource.read();
if(data === NO_DATA_AVAILABLE)
//there is no data to read at the moment
continue;
if(data === RESOURCE_CLOSED)
//the resource was closed, remove it from the list
resources.remove(i);
else
//some data was received, process it
consumeData(data);
}
}
You can see that, with this simple technique, it is already possible to handle
different resources in the same thread, but it's still not efficient. In fact, in the
preceding example, the loop will consume precious CPU only for iterating over
resources that are unavailable most of the time. Polling algorithms usually result
in a huge amount of wasted CPU time.


Busy-waiting is definitely not an ideal technique for processing non-blocking
resources, but luckily, most modern operating systems provide a native mechanism
to handle concurrent, non-blocking resources in an efficient way; this mechanism
is called synchronous event demultiplexer or event notification interface. This
component collects and queues I/O events that come from a set of watched
resources, and block until new events are available to process. The following is the
pseudocode of an algorithm that uses a generic synchronous event demultiplexer to
read from two different resources:
socketA, pipeB;
watchedList.add(socketA, FOR_READ); //[1]
watchedList.add(pipeB, FOR_READ);
while(events = demultiplexer.watch(watchedList)) { //[2]
//event loop
foreach(event in events) { //[3]
//This read will never block and will always retu
data = event.resource.read();
if(data === RESOURCE_CLOSED)
//the resource was closed, remove it from the w
demultiplexer.unwatch(event.resource);
else
//some actual data was received, process it
consumeData(data);
}
}
These are the important steps of the preceding pseudocode:
|    1. The resources are added to a data structure, associating ea
|    with a specific operation, in our example a read.
|    2. The event notifier is set up with the group of resources to
|    This call is synchronous and blocks until any of the watch
|    ready for a read. When this occurs, the event demultiplex
|    the call and a new set of events is available to be processe
|    3. Each event returned by the event demultiplexer is process
|    the resource associated with each event is guaranteed to b
|    and to not block during the operation. When all the event
|    flow will block again on the event demultiplexer until new
|    available to be processed. This is called the event loop.

how concurrency works in a single-threaded
application using a synchronous event demultiplexer and non-blocking I/O. We can
see that using only one thread does not impair our ability to run multiple I/O bound
tasks concurrently. The tasks are spread over time, instead of being spread across
multiple threads. This has the clear advantage of minimizing the total idle time of the
thread, as clearly shown in the image. This is not the only reason for choosing this
model. To have only a single thread, in fact, also has a beneficial impact on the way
programmers approach concurrency in general. Throughout the book, we will see how
the absence of in-process race conditions and multiple threads to synchronize, allows
us to use much simpler concurrency strategies.
```

#### 17.1.2.2 reactor pattern

```text
reactor pattern is a specialization of the algorithm above. 
main idea is to have a handler (callback in nodejs) associated with each IO op. 
callback is invoked when an event is produced and processed by the event loop 

This is what happens in an application using the reactor pattern:
| 1. The application generates a new I/O operation by submitting a request to
| the Event Demultiplexer. The application also specifies a handler, which will
| be invoked when the operation completes. Submitting a new request to the
| Event Demultiplexer is a non-blocking call and it immediately returns the
| control back to the application.
| 2. When a set of I/O operations completes, the Event Demultiplexer pushes the
| new events into the Event Queue.
| 3. At this point, the Event Loop iterates over the items of the Event Queue.
| 4. For each event, the associated handler is invoked.
| 5. The handler, which is part of the application code, will give back the
| control to the Event Loop when its execution completes (5a). However,
| new asynchronous operations might be requested during the execution
| of the handler (5b), causing new operations to be inserted in the Event
| Demultiplexer (1), before the control is given back to the Event Loop.
| 6. When all the items in the Event Queue are processed, the loop will block
| again on the Event Demultiplexer which will then trigger another cycle.
| The asynchronous behavior is now clear: the application expresses the interest to
| access a resource at one point in time (without blocking) and provides a handler,
| which will then be invoked at another point in time when the operation completes
```

#### 17.1.2.3 libuv

```text
Each operating system has its own interface for the Event Demultiplexer:
epoll on Linux, kqueue on Mac OS X, and I/O Completion Port API (IOCP) on
Windows. Besides that, each I/O operation can behave quite differently depending
on the type of the resource, even within the same OS. For example, in Unix, regular
filesystem files do not support non-blocking operations, so, in order to simulate a
non-blocking behavior, it is necessary to use a separate thread outside the Event
Loop. All these inconsistencies across and within the different operating systems
required a higher-level abstraction to be built for the Event Demultiplexer. This is
exactly why the Node.js core team created a C library called libuv, with the
objective to make Node.js compatible with all the major platforms and normalize
the non-blocking behavior of the different types of resource; libuv today represents
the low-level I/O engine of Node.js.
Besides abstracting the underlying system calls, libuv also implements the reactor
pattern, thus providing an API for creating event loops, managing the event queue,
running asynchronous I/O operations, and queuing other types of tasks.
A great resource to learn more about libuv is the free
online book created by Nikhil Marathe, which is available
at http://nikhilm.github.io/uvbook/.
```

#### 17.1.2.4 nodejs structure

```text
The reactor pattern and libuv are the basic building blocks of Node.js, but we need
the following three other components to build the full platform:
• A set of bindings responsible for wrapping and exposing libuv and other
low-level functionality to JavaScript.
• V8, the JavaScript engine originally developed by Google for the Chrome
browser. This is one of the reasons why Node.js is so fast and efficient.
V8 is acclaimed for its revolutionary design, its speed, and for its efficient
memory management.
• A core JavaScript library (called node-core) that implements the high-level
Node.js API.

+----------------------------------------------------------------------+
|                                                                      |
|    +------------------------------------------------------+          |
|    |                                                      |          |
|    |                                                      |          |
|    |     User Land Modules and apps                       |          |                                    
|    |                                                      |          |                                    
|    |                                                      |          |                                    
|    |                                                      |          |                                    
|    |                                                      |          |                                    
|    |                                                      |          |                                    
|    +------------------------------------------------------+          |                                    
|                                                                      |                                    
|    +------------------------------------------------------+          |                                    
|    |   NodeJS                                             |          |                                    
|    |                                                      |          |                                    
|    |    +-----------------------------------------+       |          |                                    
|    |    |                                         |       |          |                                    
|    |    |                                         |       |          |                                    
|    |    |   node-core (core JS API)               |       |          |                                    
|    |    |                                         |       |          |                                    
|    |    |                                         |       |          |                                    
|    |    +-----------------------------------------+       |          |                                    
|    |                                                      |          |                                    
|    |     +----------------------------------------+       |          |                                    
|    |     |                                        |       |          |
|    |     |   Bindings                             |       |          |
|    |     |                                        |       |          |
|    |     |                                        |       |          |
|    |     +--------------+-------------------------+       |          |
|    |    ++--------------+                         |       |          |
|    |    |               |    +--------------------+       |          |
|    |    |  V8           |    |    libuv           |       |          |
|    |    +---------------+    |                    |       |          |
|    +----+---------------+----+--------------------+-------+          |
|                                                                      |
+----------------------------------------------------------------------+
```

#### 17.1.2.5 The callback pattern

```text
Callbacks are the materialization of the handlers of the reactor pattern and they are
literally one of those imprints that give Node.js its distinctive programming style.
Callbacks are functions that are invoked to propagate the result of an operation
and this is exactly what we need when dealing with asynchronous operations.
They practically replace the use of the return instruction that, as we know, always
executes synchronously. JavaScript is a great language to represent callbacks,
because as we know, functions are first class objects and can be easily assigned to
variables, passed as arguments, returned from another function invocation, or stored
into data structures. Also, closures are an ideal construct for implementing callbacks.
With closures, we can in fact reference the environment in which a function was
created, practically, we can always maintain the context in which the asynchronous
operation was requested, no matter when or where its callback is invoked.

The continuation-passing style
In JavaScript, a callback is a function that is passed as an argument to another
function and is invoked with the result when the operation completes. In functional
programming, this way of propagating the result is called continuation-passing
style, for brevity, CPS. It is a general concept, and it is not always associated with
asynchronous operations. In fact, it simply indicates that a result is propagated by
passing it to another function (the callback), instead of directly returning it to the caller.
Synchronous continuation-passing style
To clarify the concept, let's take a look at a simple synchronous function:
function add(a, b) {
return a + b;
}
There is nothing special here; the result is passed back to the caller using the
return instruction; this is also called direct style, and it represents the most
common way of returning a result in synchronous programming. The equivalent
continuation-passing style of the preceding function would be as follows:
function add(a, b, callback) {
callback(a + b);
}
The add() function is a synchronous CPS function, which means that it will
return a value only when the callback completes its execution. The following
code demonstrates this statement:
console.log('before');
add(1, 2, function(result) {
console.log('Result: ' + result);
});
console.log('after');
Since add() is synchronous, the previous code will trivially print the following:
before
Result: 3
after

Asynchronous continuation-passing style
Now, let's consider the case where the add() function is asynchronous, which is
as follows:
function addAsync(a, b, callback) {
setTimeout(function() {
callback(a + b);
}, 100);
}
In the previous code, we simply use setTimeout() to simulate an asynchronous
invocation of the callback. Now, let's try to use this function and see how the order
of the operations changes:
console.log('before');
addAsync(1, 2, function(result) {
console.log('Result: ' + result);
});
console.log('after');
The preceding code will print the following:
before
after
Result: 3
Since setTimeout() triggers an asynchronous operation, it will not wait anymore
for the callback to be executed, but instead, it returns immediately giving the control
back to addAsync(), and then back to its caller. This property in Node.js is crucial,
as it allows the stack to unwind, and the control to be given back to the event loop as
soon as an asynchronous request is sent, thus allowing a new event from the queue
to be processed.

When the asynchronous operation completes, the execution is then resumed
starting from the callback provided to the asynchronous function that caused the
unwinding. The execution will start from the Event Loop, so it will have a fresh stack.
This is where JavaScript comes in really handy, in fact, thanks to closures it is trivial to
maintain the context of the caller of the asynchronous function, even if the callback is
invoked at a different point in time and from a different location.

Non continuation-passing style callbacks
There are several circumstances in which the presence of a callback argument might
make you think that a function is asynchronous or is using a continuation-passing
style; that's not always true, let's take, for example, the map() method of the
Array object:
var result = [1, 5, 7].map(function(element) {
return element – 1;
});
Clearly, the callback is just used to iterate over the elements of the array, and not to
pass the result of the operation. In fact, the result is returned synchronously using a
direct style. The intent of a callback is usually clearly stated in the documentation of
the API.
Synchronous or asynchronous?
We have seen how the order of the instructions changes radically depending
on the nature of a function - synchronous or asynchronous. This has strong
repercussions on the flow of the entire application, both in correctness and efficiency.
The following is an analysis of these two paradigms and their pitfalls. In general,
what must be avoided, is creating inconsistency and confusion around the nature
of an API, as doing so can lead to a set of problems which might be very hard to
detect and reproduce. To drive our analysis, we will take as example the case of an
inconsistently asynchronous function.

An unpredictable function
One of the most dangerous situations is to have an API that behaves synchronously
under certain conditions and asynchronously under others. Let's take the following
code as an example:
var fs = require('fs');
var cache = {};
function inconsistentRead(filename, callback) {
if(cache[filename]) {
//invoked synchronously
callback(cache[filename]);
} else {
//asynchronous function 
fs.readFile(filename, 'utf8', function(err, data) {
cache[filename] = data;
callback(data);
});
}
}

The preceding function uses the cache variable to store the results of different
file read operations. Please bear in mind that this is just an example, it does not
have error management, and the caching logic itself is suboptimal. Besides this,
the preceding function is dangerous because it behaves asynchronously until the
cache is not set—which is until the fs.readFile() function returns its results—but
it will also be synchronous for all the subsequent requests for a file already in the
cache—triggering an immediate invocation of the callback.
Unleashing Zalgo
Now, let's see how the use of an unpredictable function, such as the one that we
defined previously, can easily break an application. Consider the following code:
function createFileReader(filename) {
var listeners = [];
inconsistentRead(filename, function(value) {
listeners.forEach(function(listener) {
listener(value);
});
});
return {
onDataReady: function(listener) {
listeners.push(listener);
}
};
}
When the preceding function is invoked, it creates a new object that acts as a notifier,
allowing to set multiple listeners for a file read operation. All the listeners will be
invoked at once when the read operation completes and the data is available. The
preceding function uses our inconsistentRead() function to implement this
functionality. Let's now try to use the createFileReader() function:
var reader1 = createFileReader('data.txt');
reader1.onDataReady(function(data) {
console.log('First call data: ' + data);//...sometime later we try to read again from
//the same file
var reader2 = createFileReader('data.txt');
reader2.onDataReady(function(data) {
console.log('Second call data: ' + data);
});
});
The preceding code will print the following output:
First call data: some data
As you can see, the callback of the second operation is never invoked. Let's see why:
• During the creation of reader1, our inconsistentRead() function behaves
asynchronously, because there is no cached result available. Therefore, we
have all the time to register our listener, as it will be invoked later in another
cycle of the event loop, when the read operation completes.
• Then, reader2 is created in a cycle of the event loop in which the
cache for the requested file already exists. In this case, the inner call to
inconsistentRead() will be synchronous. So, its callback will be invoked
immediately, which means that also all the listeners of reader2 will be
invoked synchronously. However, we are registering the listeners after the
creation of reader2, so they will never be invoked.
The callback behavior of our inconsistentRead() function is really unpredictable,
as it depends on many factors, such as the frequency of its invocation, the filename
passed as argument, and the amount of time taken to load the file.
The bug that we've just seen might be extremely complicated to identify and
reproduce in a real application. Imagine to use a similar function in a web server,
where there can be multiple concurrent requests; imagine seeing some of those
requests hanging, without any apparent reason and without any error being logged.
This definitely falls under the category of nasty defects.
Isaac Z. Schlueter, creator of npm and former Node.js project lead, in one of his blog
posts compared the use of this type of unpredictable functions to unleashing Zalgo.
If you're not familiar with Zalgo, you are invited to find out what it is.

see running example:
$ cat data.txt 
some text file 
$ cat unleashing_zalgo.js 
var fs = require('fs');
var cache = {};
function inconsistentRead(filename, callback) {
    if(cache[filename]) {
        //invoked synchronously
        console.log(`invoked synchronously for reading file ${filename}`);
        callback(cache[filename]);
    } else {
        //asynchronous function 
        console.log(`invoked asynchronously for reading file ${filename}`);
        fs.readFile(filename, 'utf8', function(err, data) {
            cache[filename] = data;
            callback(data);
        });
    }
}

function createFileReader(filename) {
    console.log(`creating a reader for file ${filename}`);
    var listeners = [];
    inconsistentRead(filename, function(value) {
        listeners.forEach(function(listener) {
            console.log(`updating listener ${listener} with value ${value}`);
            listener(value);
        });
    });
    return {
        onDataReady: function(listener) {
            listeners.push(listener);
        }
    };
}
// When the preceding function is invoked, it creates a new object that acts as a notifier,
// allowing to set multiple listeners for a file read operation. All the listeners will be
// invoked at once when the read operation completes and the data is available. The
// preceding function uses our inconsistentRead() function to implement this
// functionality. Let's now try to use the createFileReader() function:
//
var reader1 = createFileReader('data.txt');
reader1.onDataReady(function(data) {
    console.log('First call data: ' + data);//...sometime later we try to read again from
    //the same file
    var reader2 = createFileReader('data.txt');
    reader2.onDataReady(function(data) {
        console.log('Second call data: ' + data);
    });
});
creating a reader for file data.txt
invoked asynchronously for reading file data.txt
updating listener function(data) {
    console.log('First call data: ' + data);//...sometime later we try to read again from
    //the same file
    var reader2 = createFileReader('data.txt');
    reader2.onDataReady(function(data) {
        console.log('Second call data: ' + data);
    });
} with value some text file 

First call data: some text file 

creating a reader for file data.txt
invoked synchronously for reading file data.txt

Using synchronous APIs
The lesson to learn from the unleashing Zalgo example is that it is imperative for an
API to clearly define its nature, either synchronous or asynchronous.
One suitable fix for our inconsistentRead() function, is to make it totally
synchronous. This is possible because Node.js provides a set of synchronous
direct style APIs for most of the basic I/O operations. For example, we can use the
fs.readFileSync() function in place of its asynchronous counterpart. The code
would now be as follows:
var fs = require('fs');
var cache = {};
function consistentReadSync(filename) {
if(cache[filename]) {
return cache[filename];
} else {
cache[filename] = fs.readFileSync(filename, 'utf8');
return cache[filename];
}
}
We can see that the entire function was also converted to a direct style. There is no
reason for the function to have a continuation-passing style if it is synchronous.
In fact, we can state that it is always a good practice to implement a synchronous
API using a direct style; this will eliminate any confusion around its nature and
will also be more efficient from a performance perspective.

Please bear in mind that changing an API from CPS to a direct style, or from
asynchronous to synchronous, or vice versa might also require a change to the
style of all the code using it. For example, in our case, we will have to totally
change the interface of our createFileReader() API and adapt it to work
always synchronously.
Also, using a synchronous API instead of an asynchronous one has some caveats:
• A synchronous API might not be always available for the needed
functionality.
• A synchronous API will block the event loop and put the concurrent requests
on hold. It practically breaks the Node.js concurrency, slowing down the
whole application. We will see later in the book what this really means for
our applications.
In our consistentReadSync() function, the risk of blocking the event loop is
partially mitigated, because the synchronous I/O API is invoked only once per each
filename, while the cached value will be used for all the subsequent invocations. If
we have a limited number of static files, then using consistentReadSync() won't
have a big effect on our event loop. Things can change quickly if we have to read
many files and only once. Using synchronous I/O in Node.js is strongly discouraged
in many circumstances; however, in some situations, this might be the easiest and
most efficient solution. Always evaluate your specific use case in order to choose the
right alternative.

Deferred execution
Another alternative for fixing our inconsistentRead() function is to make it purely
asynchronous. The trick here is to schedule the synchronous callback invocation
to be executed "in the future" instead of being run immediately in the same event
loop cycle. In Node.js, this is possible using process.nextTick(), which defers
the execution of a function until the next pass of the event loop. Its functioning is
very simple; it takes a callback as an argument and pushes it on the top of the event
queue, in front of any pending I/O event, and returns immediately. The callback will
then be invoked as soon as the event loop runs again
Let's apply this technique to fix our inconsistentRead() function as follows:
var fs = require('fs');
var cache = {};
function consistentReadAsync(filename, callback) {
    if(cache[filename]) {
        process.nextTick(function() {
                callback(cache[filename]);
                });
    } else {
        //asynchronous function
        fs.readFile(filename, 'utf8', function(err, data) {
                cache[filename] = data;
                callback(data);
                });
    }
}
Now, our function is guaranteed to invoke its callback asynchronously,
under any circumstances.
Another API for deferring the execution of code is setImmediate(), which—despite
the name—might actually be slower than process.nextTick(). While their purpose
is very similar, their semantic is quite different. Callbacks deferred with process.
nextTick() run before any other I/O event is fired, while with setImmediate(),
the execution is queued behind any I/O event that is already in the queue. Since
process.nextTick() runs before any already scheduled I/O, it might cause I/O
starvation under certain circumstances, for example, a recursive invocation; this
can never happen with setImmediate(). We will learn to appreciate the difference
between these two APIs when we analyze the use of deferred invocation for running
synchronous CPU-bound tasks later in the book.
```

#### 17.1.2.6 Node.js callback conventions

```text
In Node.js, continuation-passing style APIs and callbacks follow a set of specific
conventions. These conventions apply to the Node.js core API but they are also
followed virtually by every userland module and application. So, it's very important
that we understand them and make sure that we comply whenever we need to
design an asynchronous API.
Callbacks come last
In Node.js, if a function accepts in input a callback, this has to be passed as the last
argument. Let's take the following Node.js core API as an example:
fs.readFile(filename, [options], callback)
As you can see from the signature of the preceding function, the callback is always
put in last position, even in the presence of optional arguments. The motivation
for this convention is that the function call is more readable in case the callback is
defined in place.
Error comes first
In CPS, errors are propagated as any other type of result, which means using the
callback. In Node.js, any error produced by a CPS function is always passed as
the first argument of the callback, and any actual result is passed starting from the
second argument. If the operation succeeds without errors, the first argument
will be null or undefined. The following code shows you how to define a callback
complying with this convention:
fs.readFile('foo.txt', 'utf8', function(err, data) {
if(err)
handleError(err);
else
processData(data);
});
It is a good practice to always check for the presence of an error, as not doing so will
make it harder for us to debug our code and discover the possible points of failures.
Another important convention to take into account is that the error must always be
of type Error. This means that simple strings or numbers should never be passed as
error objects.

Propagating errors
Propagating errors in synchronous, direct style functions is done with the
well-known throw command, which causes the error to jump up in the call
stack until it's caught.
In asynchronous CPS however, proper error propagation is done by simply passing
the error to the next callback in the CPS chain. The typical pattern looks as follows:
var fs = require('fs');
function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
            var parsed;
            if(err)
            //propagate the error and exit the current function
            return callback(err);
            try {
            //parse the file contents
            parsed = JSON.parse(data);
            } catch(err) {
            //catch parsing errors
            return callback(err);
            }
            //no errors, propagate just the data
            callback(null, parsed);
            });
};
The detail to notice in the previous code is how the callback is invoked when we
want to pass a valid result and when we want to propagate an error.

Uncaught exceptions
You might have seen from the readJSON() function defined previously that in
order to avoid any exception to be thrown into the fs.readFile() callback, we
put a try-catch block around JSON.parse(). Throwing inside an asynchronous
callback, in fact, will cause the exception to jump up to the event loop and never be
propagated to the next callback.

In Node.js, this is an unrecoverable state and the application will simply shut down
printing the error to the stderr interface. To demonstrate this, let's try to remove the
try-catch block from the readJSON() function defined previously:
var fs = require('fs');
function readJSONThrows(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
            if(err)
            return callback(err);
            //no errors, propagate just the data
            callback(null, JSON.parse(data));
            });
};
Now, in the function we just defined, there is no way of catching an eventual
exception coming from JSON.parse(). Let's try, for example, to parse an invalid
JSON file with the following code:
readJSONThrows('nonJSON.txt', function(err) {
console.log(err);
});
This would result in the application being abruptly terminated and the following
exception being printed on the console:
SyntaxError: Unexpected token d
at Object.parse (native)
at [...]/06_uncaught_exceptions/uncaught.js:7:25
at fs.js:266:14
at Object.oncomplete (fs.js:107:15)
Now, if we look at the preceding stack trace, we will see that it starts somewhere
from the fs.js module, practically from the point at which the native API has
completed reading and returned its result back to the fs.readFile() function, via
the event loop. This clearly shows us that the exception traveled from our callback
into the stack that we saw, and then straight into the event loop, where it's finally
caught and thrown in the console.

This also means that wrapping the invocation of readJSONThrows() with a
try-catch block will not work, because the stack in which the block operates
is different from the one in which our callback is invoked. The following code
shows the anti-pattern that we just described:
try {
readJSONThrows('nonJSON.txt', function(err, result) {
[...]
});
} catch(err) {
console.log('This will not catch the JSON parsing exception');
}
The preceding catch statement will never receive the JSON parsing exception,
as it will travel back to the stack in which the exception was thrown, and we just
saw that the stack ends up in the event loop and not with the function that triggers
the asynchronous operation.
We already said that the application is aborted the moment an exception reaches
the event loop; however, we still have a last chance to perform some cleanup
or logging before the application terminates. In fact, when this happens, Node.js
emits a special event called uncaughtException just before exiting the process.
The following code shows a sample use case:
process.on('uncaughtException', function(err){
console.error('This will catch at last the ' +
'JSON parsing exception: ' + err.message);
//without this, the application would continue
process.exit(1);
});
It's important to understand that an uncaught exception leaves the application in a
state that is not guaranteed to be consistent, which can lead to unforeseeable problems.
For example, there might still have incomplete I/O requests running, or closures might
have become inconsistent. That's why it is always advised, especially in production, to
exit anyway from the application after an uncaught exception is received.
running examples:
$ node error_propogation.js 
failed to read file. got error SyntaxError: Unexpected token s in JSON at position 0
    at JSON.parse (<anonymous>)
    at /Users/<user>/work/code/nodejs/nodejs_design_patterns/error_propogation.js:10:27
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3)
$ node error_propogation_bad.js 
undefined:1
some text file 
^

SyntaxError: Unexpected token s in JSON at position 0
    at JSON.parse (<anonymous>)
    at /Users/<user>/work/code/nodejs/nodejs_design_patterns/error_propogation_bad.js:7:33
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3)

$ cat error_propogation.js 
var fs = require('fs');
function readJSON(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
        var parsed;
        if(err)
            //propagate the error and exit the current function
            return callback(err);
        try {
            //parse the file contents
            parsed = JSON.parse(data);
        } catch(err) {
            //catch parsing errors
            return callback(err);
        }
        //no errors, propagate just the data
        callback(null, parsed);
    });
};

readJSON('data.txt', ( err, data)=>{
    if (err) {
        console.log('failed to read file. got error', err);
    }
    else {
        console.log('File content:', data);
    }
});

$ cat !$
cat error_propogation_bad.js
var fs = require('fs');
console.log('demo what happens when an error is not caught in async method. It is thrown and ends up in event loop. Causing abort with uncaught exception');
function readJSONThrows(filename, callback) {
    fs.readFile(filename, 'utf8', function(err, data) {
            if(err)
            return callback(err);
            //no errors, propagate just the data
            callback(null, JSON.parse(data));
            });
};

readJSONThrows('data.txt', function(err) {
console.log(err);
});

console.log('This exception can not be caught by wrapping with try catch since the exception has different call stack and bubbles up to the event loop');
try {
    readJSONThrows('nonJSON.txt', function(err, result) {
        console.log(result);
    });
} catch(err) {
    console.log('This will not catch the JSON parsing exception');
}

console.log('the last stop before process is aborted is to handle the uncaughtException');
process.on('uncaughtException', function(err){
    console.error('This will catch at last the ' +
'JSON parsing exception: ' + err.message);
    //without this, the application would continue
    process.exit(1);
});

            17.1.2.7
```

### 17.1.3 The module system

```text
Modules are the bricks for structuring non-trivial applications, but also the main mechanism to enforce information hiding by keeping private all the functions and variables that are not explicitly marked to be exported. In this section, we will introduce the Node.js module system and its most common usage patterns.
```

#### 17.1.3.1 The revealing module pattern

```text
One of the major problems with JavaScript is the absence of namespacing. Programs run in the global scope polluting it with data that comes from both internal application code and dependencies. A popular technique to solve this problem is called revealing module pattern and it looks like the following:
   var module = (function() {
     var privateFoo = function() {...};
     var privateVar = [];
     var export = {
       publicFoo: function() {...},
       publicBar: function() {...}
}
     return export;
   })();
This pattern leverages a self-invoking function to create a private scope, exporting only the parts that are meant to be public. In the preceding code, the module variable contains only the exported API, while the rest of the module content is practically inaccessible from outside. As we will see in a moment, the idea behind this pattern is used as a base for the Node.js module system.
```

#### 17.1.3.2 Node.js modules explained

```text
CommonJS is a group with the aim to standardize the JavaScript ecosystem, and one of their most popular proposals is called CommonJS modules. Node.js built its module system on top of this specification, with the addition of some custom extensions. To describe how it works, we can make an analogy with the revealing module pattern, where each module runs in a private scope, so that every variable that is defined locally does not pollute the global namespace.


example custom implementation of require 
$ cat !$
cat module_loader.js
const fs = require('fs');
const path = require('path');

function loadModule(filename, module, require) {
    console.log(`loading source code of ${filename}`);
    var wrappedSrc =
        '(function(module, exports, require) {' +
        fs.readFileSync(filename, 'utf8') +
        '})(module, module.exports, require);';
    eval(wrappedSrc);
}

var my_require = function(moduleName) {
    console.log('Require invoked for module: ' + moduleName);
    // var id = require.resolve(moduleName);
    let id =  require.resolve(moduleName);
    if(my_require.cache[id]) {
        return my_require.cache[id].exports;
    }
    //module metadata
    var module = {
        exports: {},
        id: id };   //Update the cache
    my_require.cache[id] = module;
    //load the module
    loadModule(id, module, my_require);
    //return exported variables
    return module.exports;
};
my_require.cache = {};
my_require.resolve = function(moduleName) {
    /* resolve a full module id from the moduleName */
    return path.basename(moduleName);
}

let foo = my_require('./foo_module.js');
foo.run();
console.log(JSON.stringify(foo, null, 4));
$ node module_loader.js 
Require invoked for module: ./foo_module.js
loading source code of /Users/<user>/work/code/nodejs/nodejs_design_patterns/foo_module.js
example module
{}

Defining a module
By looking at how our homemade require() function works, we should now know how to define a module. The following code gives us an example:
   //load another dependency
   var dependency = require('./anotherModule');
   //a private function
   function log() {
     console.log('Well done ' + dependency.username);
   }
   //the API to be exported for public use
   module.exports.run = function() {
log(); };
The essential concept to remember is that everything inside a module is private unless it's assigned to the module.exports variable. The contents of this variable are then cached and returned when the module is loaded using require().
Defining globals
Even if all the variables and functions that are declared in a module are defined in its local scope, it is still possible to define a global variable. In fact, the module system exposes a special variable called global, which can be used for this purpose. Everything that is assigned to this variable will end up automatically in the global scope.
Please note that polluting the global scope is considered a bad practice
and nullifies the advantage of having a module system. So, use it only
if you really know what you are doing.
```

#### 17.1.3.3 module.exports vs exports

```text
For many developers who are not yet familiar with Node.js, a common source of confusion is the difference between using exports and module.exports to expose a public API. The code of our homemade require function should again clear
any doubt. The variable exports is just a reference to the initial value of module. exports; we have seen that such a value is essentially a simple object literal created before the module is loaded.

see: https://www.geeksforgeeks.org/difference-between-module-exports-and-exports-in-node-js/#:~:text=1-,When%20we%20want%20to%20export%20a%20single%20class%2Fvariable%2Ffunction,2. 
The module is a plain JavaScript Object representing the current module. It is local to each module and also it is private. It has exports property which is a plain JavaScript variable, set to module.exports. At the end of the file, Node.js return module.exports to the required function.

About module.exports: 
When we want to export a single class/variable/function from one module to another module, we use module.exports way.

Example: Create two file calculator.js and operation.js and export the Arithmetic class from calculator.js to operation.js using module.exports method. Here, we have created a class Arithmetic and exported the whole class using module.exports.

Filename: calculator.js

class Artimatics {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
  
    add() {
        return this.a + this.b;
    }
    subtract() {
        return this.a - this.b;
    }
  
    multiply() {
        return this.a * this.b;
    }
  
    divide() {
        if (this.b != 0) {
            return this.a / this.b;
        }
        return "divided by zero !!!!";
    }
};
  
module.exports = Artimatics;
Filename: operation.js

const Artimatics = require('./calculator.js');
  
const op = new Artimatics(100,40);
  
console.log(`Addition -> ${op.add()}`);
console.log(`subtraction -> ${op.subtract()}`);
console.log(`Multiplication -> ${op.multiply()}`);
console.log(`Division -> ${op.divide()}`);
Run the operation.js file using the following command:

node operation.js
Output:


Using module.exports 

About exports:  
When we want to export multiple variables/functions from one module to another, we use exports.

Example: Create a two file calculator.js and operation.js and export multiple functions from calculator.js file. 

Filename: calculator.js


exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;
exports.divide = (a, b) => {
    if (b != 0) {
        return a / b;
    }
    return `Divided by zero !!!`;
}
Filename: operation.js

const Artimatics = require('./calculator.js');
  
console.log(`Addition -> ${Artimatics.add(100,40)}`);
console.log(`subtraction -> ${Artimatics.subtract(100,40)}`);
console.log(`Multiplication -> ${Artimatics.multiply(100,40)}`);
console.log(`Division -> ${Artimatics.divide(100,40)}`);
Run the operation.js file using the following command:

node operation.js
Output:


Using exports

Key difference between module.exports and exports: 

S.no

Module.exports

Exports

a When we want to export a single class/variable/function from one module to another module, we use the module.exports way.	When we want to export multiple variables/functions from one module to another, we use exports way.
b It is the object reference that gets returned from the require() calls.	The exports is not returned by require()
```

#### 17.1.3.4 require is synchronous

```text
Another important detail that we should take into account is that our homemade require function is synchronous. In fact, it returns the module contents using a simple direct style, and no callback is required. This is true for the original Node.js require() function too. As a consequence, any assignment to module.export must be synchronous as well. For example, the following code is incorrect:
   setTimeout(function() {
     module.exports = function() {...};
}, 100);
This property has important repercussions in the way we define modules, as it limits us to mostly using synchronous code during the definition of a module. This is actually one of the most important reasons why the core Node.js libraries offer synchronous APIs as an alternative to most of the asynchronous ones.

If we need some asynchronous initialization steps for a module, we can always
define and export an uninitialized module that is initialized asynchronously at
a later time. The problem with this approach though, is that loading such a module using require does not guarantee that it's ready to be used. In Chapter 6, Recipes, we will analyze this problem in detail and we will present some patterns to solve this issue elegantly.
```

#### 17.1.3.5 The resolving algorithm

```text
The term dependency hell, describes a situation whereby the dependencies of a software, in turn depend on a shared dependency, but require different incompatible versions. Node.js solves this problem elegantly by loading a different version of a module depending on where the module is loaded from. All the merits of this feature go to npm and also to the resolving algorithm used in the require function.
Let's now give a quick overview of this algorithm. As we saw, the resolve() function takes a module name (which we will call here, moduleName) as input and it returns the full path of the module. This path is then used to load its code and also to identify the module uniquely. The resolving algorithm can be divided into the following three major branches:
• File modules: If moduleName starts with "/" it's considered already an absolute path to the module and it's returned as it is. If it starts with "./", then moduleName is considered a relative path, which is calculated starting from the requiring module.
• Core modules: If moduleName is not prefixed with "/" or "./", the algorithm will first try to search within the core Node.js modules.
• Package modules: If no core module is found matching moduleName, then the search continues by looking for a matching module into the first node_modules directory that is found navigating up in the directory structure starting from the requiring module. The algorithm continues to search for a match by looking into the next node_modules directory up in the directory tree, until it reaches the root of the filesystem.

For file and package modules, both the individual files and directories can match
moduleName. In particular, the algorithm will try to match the following:
• <moduleName>.js
• <moduleName>/index.js
• The directory/file specified in the main property of <moduleName>/ package.json
The complete, formal documentation of the resolving algorithm can be found at http://nodejs.org/api/modules.html#modules_ all_together.
The node_modules directory is actually where npm installs the dependencies of each package. This means that, based on the algorithm we just described, each package can have its own private dependencies. For example, consider the following directory structure:
 myApp
├── foo.js
└── node_modules
    ├── depA
    │   └── index.js
    ├── depB
│ ├── bar.js
    │   └── node_modules
│
│
└── depC
└── depA
    └── index.js
├── foobar.js
└── node_modules
    └── depA
        └── index.js

        In the preceding example, myApp, depB, and depC all depend on depA; however,
they all have their own private version of the dependency! Following the rules of the resolving algorithm, using require('depA') will load a different file depending on the module that requires it, for example:
• Calling require('depA') from /myApp/foo.js will load /myApp/node_ modules/depA/index.js
• Calling require('depA') from /myApp/node_modules/depB/bar.js will load /myApp/node_modules/depB/node_modules/depA/index.js
• Calling require('depA') from /myApp/node_modules/depC/foobar.js will load /myApp/node_modules/depC/node_modules/depA/index.js
The resolving algorithm is the magic behind the robustness of the Node.js dependency management, and is what makes it possible to have hundreds or even thousands of packages in an application without having collisions or problems of version compatibility.
The resolving algorithm is applied transparently for us when we invoke require(); however, if needed, it can still be used directly by any module by simply invoking require.resolve().
```

#### 17.1.3.6 The module cache

```text
Each module is loaded and evaluated only the first time it is required, since any subsequent call of require() will simply return the cached version. This should result clear by looking at the code of our homemade require function. Caching is crucial for performances, but it also has some important functional implications:
• It makes it possible to have cycles within module dependencies
• It guarantees, to some extent, that always the same instance is returned
when requiring the same module from within a given package
The module cache is exposed in the require.cache variable, so it is possible to directly access it if needed. A common use case is to invalidate any cached module by deleting the relative key in the require.cache variable, a practice very useful during testing but very dangerous if applied in normal circumstances.
```

#### 17.1.3.7 Cycles

```text
Many consider circular dependencies as an intrinsic design issue, but it is something which might actually happen in a real project, so it's useful for us to know at least how this works in Node.js. If we look again at our homemade require() function, we immediately get a glimpse of how this might work and what are its caveats.
Suppose we have two modules defined as follows:
• Module a.js:
       exports.loaded = false;
       var b = require('./b');
       module.exports = {
         bWasLoaded: b.loaded,
         loaded: true
       };
• Module b.js:
       exports.loaded = false;
       var a = require('./a');
       module.exports = {
         aWasLoaded: a.loaded,
         loaded: true
       };
Now, let's try to load these from another module, main.js, as follows:
   var a = require('./a');
   var b = require('./b');
   console.log(a);
   console.log(b);
The preceding code will print the following output:
{ bWasLoaded: true, loaded: true }
{ aWasLoaded: false, loaded: true }
This result reveals the caveats of circular dependencies. While both the modules are completely initialized the moment they are required from the main module, the a.js module will be incomplete when it is loaded from b.js. In particular,
its state will be the one that it reached the moment it required b.js. This behavior should ring another bell, which will be confirmed if we swap the order in which the two modules are required in main.js.

        If you try it, you will see that this time it will be the module a.js that will receive an incomplete version of b.js. We understand now that this can become quite a fuzzy business if we lose control of which module is loaded first, which can happen quite easily if the project is big enough.
```

#### 17.1.3.8 Module definition patterns

```text
The module system, besides being a mechanism for loading dependencies, is also
a tool for defining APIs. As for any other problem related to API design, the main
factor to consider is the balance between private and public functionality. The aim is to maximize information hiding and API usability, while balancing these with other software qualities like extensibility and code reuse.
In this section, we will analyze some of the most popular patterns for defining
modules in Node.js; each one has its own balance of information hiding, extensibility, and code reuse.
```

#### 17.1.3.8.1 Named exports

```text
The most basic method for exposing a public API is using named exports, which consists in assigning all the values we want to make public to properties of the object referenced by exports (or module.exports). In this way, the resulting exported object becomes a container or namespace for a set of related functionality.
The following code shows a module implementing this pattern:
   //file logger.js
   exports.info = function(message) {
     console.log('info: ' + message);
   };
   exports.verbose = function(message) {
     console.log('verbose: ' + message);
};
The exported functions are then available as properties of the loaded module, as shown in the following code:
   //file main.js
   var logger = require('./logger');
   logger.info('This is an informational message');
   logger.verbose('This is a verbose message');
Most of the Node.js core modules use this pattern.
```

#### 17.1.3.8.2 Exporting a function

```text
One of the most popular module definition patterns consists in reassigning the whole module.exports variable to a function. Its main strength it's the fact that
it exposes only a single functionality, which provides a clear entry point for the module, and makes it simple to understand and use; it also honors the principle
of small surface area very well. This way of defining modules is also known in the community as substack pattern, after one of its most prolific adopters, James Halliday (nickname substack). The following code is an example of this pattern:
   //file logger.js
   module.exports = function(message) {
     console.log('info: ' + message);
};
A possible extension of this pattern is using the exported function as namespace for other public APIs. This is a very powerful combination, because it still gives the module the clarity of a single entry point (the main exported function), but it also allows us to expose other functionalities that have secondary or more advanced use cases. The following code shows you how to extend the module we defined previously by using the exported function as a namespace:
   module.exports.verbose = function(message) {
     console.log('verbose: ' + message);
};
The following code demonstrates how to use the module that we just defined:
   //file main.js
   var logger = require('./logger');
   logger('This is an informational message');
   logger.verbose('This is a verbose message');
Even though exporting just a function might seem a limitation, in reality, it's a perfect way to put the emphasis on a single functionality—the most important for the module—while giving less visibility to secondary aspects, which are instead exposed as properties of the exported function itself.
```

#### 17.1.3.8.3 Exporting a constructor

```text
A module that exports a constructor is a specialization of a module that exports a function. The difference is that with this new pattern, we allow the user to create new instances using the constructor, but we also give them the ability to extend its prototype and forge new classes. The following is an example of this pattern:
   //file logger.js
   function Logger(name) {
     this.name = name;
   };
   Logger.prototype.log = function(message) {
     console.log('[' + this.name + '] ' + message);
   };
   Logger.prototype.info = function(message) {
     this.log('info: ' + message);
   };
   Logger.prototype.verbose = function(message) {
     this.log('verbose: ' + message);
   };
   module.exports = Logger;
And, we can use the preceding module as follows:
   //file logger.js
   var Logger = require('./logger');
   var dbLogger = new Logger('DB');
   dbLogger.info('This is an informational message');
   var accessLogger = new Logger('ACCESS');
   accessLogger.verbose('This is a verbose message');
Exporting a constructor still provides a single entry point for the module, but compared to the substack pattern, it exposes a lot more of the module internals; however on the other side it allows much more power when it comes to extending its functionality.

A variation of this pattern consists in applying a guard against invocations that don't use the new instruction. This little trick allows us to use our module as a factory.
The following code shows you how this works:
   function Logger(name) {
     if(!(this instanceof Logger)) {
       return new Logger(name);
     }
     this.name = name;
   };
The trick is simple; we check whether this exists and is an instance of Logger. If any of these conditions is false, it means that the Logger() function was invoked without using new, so we proceed with creating the new instance properly and returning it to the caller. This technique allows us to use the module also as a factory, as shown in the following code:
   //file logger.js
   var Logger = require('./logger');
   var dbLogger = Logger('DB');
   accessLogger.verbose('This is a verbose message');
```

#### 17.1.3.8.4 Exporting an instance

```text
We can leverage the caching mechanism of require() to easily define stateful instances—objects with a state created from a constructor or a factory, which can be shared across different modules. The following code shows an example of this pattern:
   //file logger.js
   function Logger(name) {
     this.count = 0;
     this.name = name;
   };
   Logger.prototype.log = function(message) {
     this.count++;
     console.log('[' + this.name + '] ' + message);
   };
   module.exports = new Logger('DEFAULT');
This newly defined module can then be used as follows:
   //file main.js
   var logger = require('./logger');
   logger.log('This is an informational message');

Because the module is cached, every module that requires the logger module
will actually always retrieve the same instance of the object, thus sharing its state. This pattern is very much like creating a Singleton, however, it does not guarantee the uniqueness of the instance across the entire application, as it happens in the traditional Singleton pattern. When analyzing the resolving algorithm, we have seen in fact, that a module might be installed multiple times inside the dependency tree of an application. This results with multiple instances of the same logical module, all running in the context of the same Node.js application. In Chapter 5, Wiring Modules, we will analyze the consequences of exporting stateful instances and some of the patterns we can use as alternatives.
An extension to the pattern we just described, consists in exposing the constructor used to create the instance, in addition to the instance itself. This allows the user to create new instances of the same object, or even to extend it if necessary. To enable this, we just need to assign a new property to the instance, as shown in the following line of code:
   module.exports.Logger = Logger;
Then, we can use the exported constructor to create other instances of the class, as follows:
   var customLogger = new logger.Logger('CUSTOM');
   customLogger.log('This is an informational message');
From a usability perspective, this is similar to using an exported function as namespace; the module exports the default instance of an object—the piece of functionality we might want to use most of the time—while more advanced features, such as the ability to create new instances or extend the object, are still made available through less exposed properties.
```

#### 17.1.3.8.5 Modifying other modules or the global scope

```text
A module can even export nothing. This can look a bit out of place, however,
we should not forget that a module can modify the global scope and any object
in it, including other modules in the cache. Please note that these are in general considered bad practices, but since this pattern can be useful and safe under some circumstances (for example, for testing) and is sometimes used in the wild, it is worth to know and understand it. So, we said a module can modify other modules or objects in the global scope. Well, this is called monkey patching, which generally refers to the practice of modifying the existing objects at runtime to change or extend their behavior or to apply temporary fixes.
The following example shows you how we can add a new function to another module:
   //file patcher.js
   // ./logger is another module
   require('./logger').customMessage = function() {
     console.log('This is a new functionality');
   };
Using our new patcher module would be as easy as writing the following code: //file main.js
   require('./patcher');
   var logger = require('./logger');
   logger.customMessage();
In the preceding code, patcher must be required before using the logger module for the first time in order to allow the patch to be applied.
The techniques described here are all dangerous ones to apply. The main concern
is that, to have a module that modifies the global namespace or other modules is an
operation with side effects. In other words, it affects the state of entities outside their scope, which can have consequences that are not always predictable, especially when multiple modules interact with the same entities. Imagine to have two different modules trying to set the same global variable, or modifying the same property
of the same module; the effects might be unpredictable (which module wins?), but most importantly it would have repercussions on the entire application.
            17.1.3.9
```

### 17.1.4 The observer pattern

```text
The observer pattern
Another important and fundamental pattern used in Node.js is the observer pattern. Together with reactor, callbacks, and modules, this is one of the pillars of the platform and an absolute prerequisite for using many node-core and userland modules.
Observer is an ideal solution for modeling the reactive nature of Node.js, and a
perfect complement for callbacks. Let's give a formal definition as follows:
Pattern (observer): defines an object (called subject), which can notify a
set of observers (or listeners), when a change in its state happens.
The main difference from the callback pattern is that the subject can actually notify multiple observers, while a traditional continuation-passing style callback will usually propagate its result to only one listener, the callback.
```

#### 17.1.4.1 the EventEmitter

#### 17.1.4.1.1 observer pattern in OOP language (e.g. c++)

```text
see:
https://www.bogotobogo.com/DesignPatterns/observer.php
in OOP we have subject interface 
it has three public methods:
Attach(Observer)
Detach(Observer)
Update()
update pseudocode 
for obs in Observers:
    obs->update() 

ConcreteSubject implements Subject 
GetState() {return this.subjectState}
SetState()
subjectState 

Also, Observer interface with one method:
Update() 

and ConcreteObserver 
Update() {observerState = subject->GetState()}
observerState

#include <iostream>
#include <vector>
#include <time.h>
#include <sys/types.h>
#include <sys/timeb.h>
#include <string.h>

using namespace std ; 

class Subject; 

class Observer 
{ 
public: 
 Observer() {}; 
 ~Observer() {}; 
 virtual void Update(Subject* theChangeSubject) = 0; 
}; 

class Subject 
{ 
public: 
 Subject() {}; 
 virtual ~Subject() {}; 
 virtual void Attach(Observer*); 
 virtual void Detach(Observer*); 
 virtual void Notify();  
private: 
 vector<Observer*> _observers; 
}; 

void Subject::Attach (Observer* o) 
{ 
 _observers.push_back(o); 
} 

void Subject::Detach (Observer* o) 
{ 
 int count = _observers.size(); 
 int i; 

 for (i = 0; i < count; i++) { 
   if(_observers[i] == o) 
   break; 
 } 
 if(i < count) 
  _observers.erase(_observers.begin() + i); 

} 

void Subject::Notify () 
{ 
 int count = _observers.size(); 

 for (int i = 0; i < count; i++) 
   (_observers[i])->Update(this); 
}

class ClockTimer : public Subject 
{ 
public: 
 ClockTimer() { _strtime( tmpbuf ); }; 
 int GetHour(); 
 int GetMinute();
 int GetSecond(); 
 void Tick();   
private: 
 char tmpbuf[128]; 
}; 

 /* Set time zone from TZ environment variable. If TZ is not set, 
  * the operating system is queried to obtain the default value 
  * for the variable. 
 */ 
void ClockTimer::Tick() 
{ 
    _tzset(); 

// Obtain operating system-style time. 
    _strtime( tmpbuf ); 
    Notify(); 
} 

int ClockTimer::GetHour() 
{ 
 char timebuf[128]; 
 strncpy(timebuf, tmpbuf, 2); 
 timebuf[2] = NULL; 
  
 return atoi(timebuf); 
} 

int ClockTimer::GetMinute() 
{ 
 char timebuf[128]; 
 strncpy(timebuf, tmpbuf+3, 2); 
 timebuf[2] = NULL; 

 return atoi(timebuf); 
} 

int ClockTimer::GetSecond() 
{ 
 char timebuf[128];
 strncpy(timebuf, tmpbuf+6, 2); 
 timebuf[2] = NULL; 

 return atoi(timebuf); 
}


class DigitalClock: public Observer 
{ 
public: 
 DigitalClock(ClockTimer *);  
 ~DigitalClock();   
  void Update(Subject *);   
  void Draw();     
private: 
 ClockTimer *_subject;  
}; 

DigitalClock::DigitalClock (ClockTimer *s) 
{ 
 _subject = s; 
 _subject->Attach(this); 
} 

DigitalClock::~DigitalClock () 
{ 
 _subject->Detach(this); 
} 

void DigitalClock::Update (Subject *theChangedSubject) 
{ 
 if(theChangedSubject == _subject) 
  Draw(); 
} 

void DigitalClock::Draw () 
{ 
 int hour = _subject->GetHour(); 
 int minute = _subject->GetMinute(); 
 int second = _subject->GetSecond(); 

 cout << "Digital time is " << hour << ":" 
          << minute << ":" 
          << second << endl;           
}

class AnalogClock: public Observer 
{ 
public: 
 AnalogClock(ClockTimer *);  
 ~AnalogClock();    
  void Update(Subject *);  
  void Draw();     
private: 
 ClockTimer *_subject;   
}; 

AnalogClock::AnalogClock (ClockTimer *s) 
{ 
 _subject = s; 
 _subject->Attach(this); 
} 

AnalogClock::~AnalogClock () 
{ 
 _subject->Detach(this); 
} 

void AnalogClock::Update (Subject *theChangedSubject) 
{ 
 if(theChangedSubject == _subject) 
  Draw(); 
} 

void AnalogClock::Draw () 
{ 
 int hour = _subject->GetHour(); 
 int minute = _subject->GetMinute(); 
 int second = _subject->GetSecond(); 

 cout << "Analog time is " << hour << ":" 
         << minute << ":" 
         << second << endl; 
}

int main(void) 
{ 
 ClockTimer timer; 

 DigitalClock digitalClock(&timer;); 
 AnalogClock analogClock(&timer;); 
  
 timer.Tick();  
  
 return 0; 
}

Here are the summary of the pattern:

a. Objects (DigitalClock or AnalogClock object) use the Subject interfaces (Attach() or Detach()) either to subscribe (register) as observers or unsubscribe (remove) themselves from being observers.
DigitalClock::DigitalClock (ClockTimer *s) 
{ 
 _subject = s; 
 _subject->Attach(this); 
} 


DigitalClock::~DigitalClock () 
{ 
_subject->Detach(this); 
} 

b. Each subject can have many observers.
class Subject 
{ 
public: 
 Subject() {}; 
 ~Subject() {}; 
 void Attach(Observer*); 
 void Detach(Observer*); 
 void Notify(); 
private: 
 vector<Observer*> _observers; 
}; 

c. All observers need to implement the Observer interface. This interface just has one method, Update(), that gets called when the Subject's state changes.
class AnalogClock: public Observer 
{ 
public: 
 AnalogClock(ClockTimer *);  
 ~AnalogClock();    
  void Update(Subject *);  
  void Draw();     
private: 
 ClockTimer *_subject;   
};

e. In addition to the attach() and detach() methods, the concrete subject implements a Notify() method that is used to update all the current observers whenever state changes. But in this case, all of them are done in the parent class, Subject.
void Subject::Attach (Observer* o) 
{ 
 _observers.push_back(o); 
} 

void Subject::Detach(Observer* o) 
{ 
 int count = _observers.size(); 
 int i; 

 for (i = 0; i < count; i++) { 
   if(_observers[i] == o) 
   break; 
 } 
 if(i < count) 
  _observers.erase(_observers.begin() + i); 

} 

void Subject::Notify() 
{ 
 int count = _observers.size(); 

 for (int i = 0; i < count; i++) 
   (_observers[i])->Update(this); 
}

f. The Concrete object may also have methods for setting and getting its state.
class ClockTimer : public Subject 
{ 
public: 
 ClockTimer() { _strtime( tmpbuf ); }; 
 int GetHour(); 
 int GetMinute();
 int GetSecond(); 
 void Tick();   
private: 
 char tmpbuf[128]; 
}; 
g. Concrete observers can be any class that implements the Observer interface. Each observer subscribe (register) with a concrete subject to receive update.
DigitalClock::DigitalClock (ClockTimer *s) 
{ 
 _subject = s; 
 _subject->Attach(this); 
} 
The two objects of Observer Pattern are loosely coupled, they can interact but with little knowledge of each other.
```

#### 17.1.4.1.2 nodejs EventEmitter

```text
In traditional object-oriented programming, the observer pattern requires interfaces, concrete classes, and a hierarchy; in Node.js, all becomes much simpler. The observer pattern is already built into the core and is available through the EventEmitter class. The EventEmitter class allows us to register one or more functions as listeners, which will be invoked when a particular event type is fired. The following image visually explains the concept:
  Listener
Event A
EventEmitter Listener
Event B
 Listener
The EventEmitter is a prototype, and it is exported from the events core module. The following code shows how we can obtain a reference to it:
   var EventEmitter = require('events').EventEmitter;
   var eeInstance = new EventEmitter();
The essential methods of the EventEmitter are given as follows:
• on(event, listener): This method allows you to register a new listener
(a function) for the given event type (a string)
• once(event, listener): This method registers a new listener, which is
then removed after the event is emitted for the first time
• emit(event, [arg1], [...]): This method produces a new event and
provides additional arguments to be passed to the listeners
• removeListener(event, listener): This method removes a listener for the specified event type

All the preceding methods will return the EventEmitter instance to allow chaining. The listener function has the signature, function([arg1], [...]), so it simply accepts the arguments provided the moment the event is emitted. Inside the listener, this refers to the instance of the EventEmitter that produces the event.
We can already see that there is a big difference between a listener and a traditional Node.js callback; in particular, the first argument is not an error, but it can be any data passed to emit() at the moment of its invocation.

                17.1.4.1.3
```

#### 17.1.4.2 Create and use an EventEmitter

```text
Let's see how we can use an EventEmitter in practice. The simplest way is to create a new instance and use it directly. The following code shows a function, which uses an EventEmitter to notify its subscribers in real time when a particular pattern is found in a list of files:
   var EventEmitter = require('events').EventEmitter;
   var fs = require('fs');
   function findPattern(files, regex) {
     var emitter = new EventEmitter();
     files.forEach(function(file) {
       fs.readFile(file, 'utf8', function(err, content) {
         if(err)
           return emitter.emit('error', err);
         emitter.emit('fileread', file);
         var match = null;
         if(match = content.match(regex))
           match.forEach(function(elem) {
             emitter.emit('found', file, elem);
}); });
});
     return emitter;
   }
The EventEmitter created by the preceding function will produce the following three events:
• fileread: This event occurs when a file is read
• found: This event occurs when a match has been found
• error: This event occurs when an error has occurred during the reading of the file

Let's see now how our findPattern() function can be used:
   findPattern(
       ['fileA.txt', 'fileB.json'],
       /hello \w+/g
     )
     .on('fileread', function(file) {
       console.log(file + ' was read');
     })
     .on('found', function(file, match) {
       console.log('Matched "' + match + '" in file ' + file);
     })
     .on('error', function(err) {
       console.log('Error emitted: ' + err.message);
     });

- findPattern demo 

- My old demo 
code: 
$ cat !$
cat evtHandlingDemo.js
console.log("Event handling demo started");

// import events
var events = require('events');


//create eventEmitter
var eventEmitter = new events.EventEmitter();

//bind an event + event handler
//eventEmitter.on('eventName', eventHandler);
//
//emit event
//eventEmitter.emit('eventName');
//

//create event handler
var connectionHandler = function connected()  {

        console.log("connectionHandler called for successful connection");

        eventEmitter.emit('data_received');
}

//bind successful connection event to its event handler
eventEmitter.on('connection', connectionHandler);

eventEmitter.on('data_received', function () {
     console.log("anonymous data_received CB function called");
});

//fire the successful connection event
eventEmitter.emit('connection');

// listener #1
var listner1 = function listner1() {
   console.log('listner1 executed.');
}

// listener #2
var listner2 = function listner2() {
  console.log('listner2 executed.');
}

// Bind the connection event with the listner1 function
eventEmitter.addListener('connection', listner1);

// Bind the connection event with the listner2 function
eventEmitter.on('connection', listner2);

var eventListeners = require('events').EventEmitter.listenerCount
   (eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

// Fire the connection event 
eventEmitter.emit('connection');

// Remove the binding of listner1 function
eventEmitter.removeListener('connection', listner1);
console.log("Listner1 will not listen now.");

// Fire the connection event 
eventEmitter.emit('connection');

eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListeners + " Listner(s) listening to connection event");

console.log("Program Ended.");

console.log("Event handling demo ended");

run:
$ node !$
node evtHandlingDemo.js
Event handling demo started
connectionHandler called for successful connection
anonymous data_received CB function called
3 Listner(s) listening to connection event
connectionHandler called for successful connection
anonymous data_received CB function called
listner1 executed.
listner2 executed.
Listner1 will not listen now.
connectionHandler called for successful connection
anonymous data_received CB function called
listner2 executed.
2 Listner(s) listening to connection event
Program Ended.
Event handling demo ended

            17.1.4.3
```

### 17.1.5 summary

## 17.2 asynchronous control flow patterns

## 17.3 the module system patterns

## 17.4 streams

## 17.5 Design patterns

## 17.6 wiring modules

## 17.7 recipes

## See Also

<!-- backlinks:start -->
### Backlinks

* [Design Patterns - Interview Knowledge Base](/interviews/design-patterns.md)
<!-- backlinks:end -->
