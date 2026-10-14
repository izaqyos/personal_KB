---
type: reference
title: service workers
description: Section 3 of the legacy javascript-kb notes.
tags: [kb-javascript, service, workers]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "javascript-kb#3"
---

# tags: service workers

[↑ javascript-kb](/kb-javascript/README.md)

## 3.1 Introduction

```text
This are client side proxy in javascript
they run in background of application
Can store data in index DB 
use fetch and cache apis 
cache is persistent and independent from browser cache 
only works over https (and localhost http)
mainly used for caching and offline access to content 
lifecycle: registration, Installation, activation 
```

### 3.1.1 hello world code

```text
loosely based on https://www.html5rocks.com/en/tutorials/workers/basics/
```

#### 3.1.1.1 setup

```text
a. local web server (file:// for loading Javascript code will be blocked by chrome)
e.g. 
$ python3 -m http.server 

b. browse to localhost
http://localhost:8000/index.html 

c. code:
$ for f in $(ls); do echo "<<<<<< file: $f >>>>>"; cat $f; echo ""; done
<<<<<< file: index.html >>>>>
<!DOCTYPE html>
<html>
<head>hello service worker
<script src="main.js"> </script>
</head>
<body>
<h1>Hello service workers</h1>
<h2>click button</h2>
<p id="demo">a paragraph</p>
<button type="button" onclick="getClickDemo()">click me</button>
</body>

</html>
<<<<<< file: main.js >>>>>
function getClickDemo() {
    document.getElementById("demo").innerHTML = "you clicked demo";
}

// create service worker
const worker = new Worker('task.js');

worker.addEventListener('message', msg => {
    console.log('service worker says: ', msg.data);
}, false);

//launch service worker
worker.postMessage("Hello service worker");

<<<<<< file: task.js >>>>>
self.addEventListener('message', evt => {
    self.postMessage(evt.data);
}, false)

"
When postMessage() is called from the main page, our worker handles that message by defining an onmessage handler for the message event. The message payload (in this case 'Hello World') is accessible in Event.data. Although this particular example isn't very exciting, it demonstrates that postMessage() is also your means for passing data back to the main thread. Convenient!

Messages passed between the main page and workers are copied, not shared. For example, in the next example the 'msg' property of the JSON message is accessible in both locations. It appears that the object is being passed directly to the worker even though it's running in a separate, dedicated space. In actuality, what is happening is that the object is being serialized as it's handed to the worker, and subsequently, de-serialized on the other end. The page and worker do not share the same instance, so the end result is that a duplicate is created on each pass. Most browsers implement this feature by automatically JSON encoding/decoding the value on either end.
"
```

#### 3.1.1.2 a bit more advanced example, service worker lifecycle

```text
a. page 
$ cat index2.html 
<!DOCTYPE html>
<html>
<head>hello service worker. second phase
</head>
<body>
<h1>Hello service workers 2</h1>
<h2>buttons</h2>
<p id="paragraph">a paragraph</p>
<button onclick="sayHi()">say HI</button>
<button onclick="unknownCmd()">send an unknown command</button>
<button onclick="stopWorker()">stop the worker</button>
<output id="result"></output>
<script>
function sayHi() {
    worker.postMessage({'cmd': 'start', 'msg': 'Hi' })
}
function stopWorker() {
    //can also call worker.terminate()
    worker.postMessage({'cmd': 'stop', 'msg': 'Bye' })
}

function unknownCmd() {
    worker.postMessage({'cmd': 'foobar', 'msg': 'WTF??' })
}

// create service worker
const worker = new Worker('task2.js');

worker.addEventListener('message', evt => {
    console.log('service worker got: ', evt.data);
    document.getElementById('result').textContent = evt.data;
}, false);

//launch service worker
//worker.postMessage("Hello service worker");
</script>
</body>

</html>

b. service-worker
$ cat task2.js 
self.addEventListener('message', evt => {
    const data = evt.data;
    switch (data.cmd) {
        case 'start':
            self.postMessage('Worker started '+data.msg);
            break;
        case 'stop':
            self.postMessage('Worker stopped '+data.msg + ' buttons will stop working');
            // 2nd way to stop worker. by calling self.close() from within the worker
            self.close();
            break;
        default:
            self.postMessage('got an unknown cmd ' + data.msg);
    }
}, false)

c. test:
load web-server:
$ python3 -m http.server
Serving HTTP on :: port 8000 (http://[::]:8000/) ...

in browser navigate to: http://localhost:8000/index2.html

open dev-tools (alt+cmd+i)
click buttons, 'sayHi', 'unknownCmd' and 'stopWorker'

in console tab check service-worker prints:
service worker got:  Worker started Hi
index2.html:30 service worker got:  got an unknown cmd WTF??
index2.html:30 service worker got:  Worker stopped Bye buttons will stop working
```

#### 3.1.1.3 service-worker transferable objects

#### 3.1.1.3.1 explanation

```text
Most browsers implement the structured cloning (http://updates.html5rocks.com/2011/09/Workers-ArrayBuffer) algorithm, which allows you to pass more complex types in/out of Workers such as File, Blob, ArrayBuffer, and JSON objects. However, when passing these types of data using postMessage(), a copy is still made. Therefore, if you're passing a large 50MB file (for example), there's a noticeable overhead in getting that file between the worker and the main thread.

Structured cloning is great, but a copy can take hundreds of milliseconds. To combat the perf hit, you can use Transferable Objects (http://www.w3.org/html/wg/drafts/html/master/infrastructure.html#transferable-objects).

With Transferable Objects, data is transferred from one context to another. It is zero-copy, which vastly improves the performance of sending data to a Worker. Think of it as pass-by-reference if you're from the C/C++ world. However, unlike pass-by-reference, the 'version' from the calling context is no longer available once transferred to the new context. For example, when transferring an ArrayBuffer from your main app to Worker, the original ArrayBuffer is cleared and no longer usable. Its contents are (quiet literally) transferred to the Worker context.
- my note:  this is more like a unique pointer in C++ or pointers in rust 

To use transferrable objects, use a slightly different signature of postMessage():

worker.postMessage(arrayBuffer, [arrayBuffer]);
window.postMessage(arrayBuffer, targetOrigin, [arrayBuffer]);
The worker case, the first argument is the data and the second is the list of items that should be transferred. The first argument doesn't have to be an ArrayBuffer by the way. For example, it can be a JSON object:

worker.postMessage({data: int8View, moreData: anotherBuffer},
                   [int8View.buffer, anotherBuffer]);
The important point being: the second argument must be an array of ArrayBuffers. This is your list of transferrable items.

To see the speed improvement of transferrables, check out this DEMO(http://html5-demos.appspot.com/static/workers/transferables/index.html). For more information on transferrables, see our HTML5Rock post (http://updates.html5rocks.com/2011/12/Transferable-Objects-Lightning-Fast).
```

#### 3.1.1.3.2 demo

#### 3.1.1.4 The Worker Environment

#### 3.1.1.4.1 Worker Scope

```text
In the context of a worker, both self and this reference the global scope for the worker. Thus, the previous example could also be written as:

addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
  ...
}, false);
Alternatively, you could set the onmessage event handler directly (though addEventListener is always encouraged by JavaScript ninjas).

onmessage = function(e) {
  var data = e.data;
  ...
};
```

#### 3.1.1.4.2 Features Available to Workers

```text
Due to their multi-threaded behavior, web workers only has access to a subset of JavaScript's features:

The navigator object
The location object (read-only)
XMLHttpRequest
setTimeout()/clearTimeout() and setInterval()/clearInterval()
The Application Cache
Importing external scripts using the importScripts() method
Spawning other web workers
Workers do NOT have access to:

The DOM (it's not thread-safe)
The window object
The document object
The parent object
```

#### 3.1.1.4.3 Loading External Scripts

```text
You can load external script files or libraries into a worker with the importScripts() function. The method takes zero or more strings representing the filenames for the resources to import.

This example loads script1.js and script2.js into the worker:

worker.js:

importScripts('script1.js');
importScripts('script2.js');
Which can also be written as a single import statement:

importScripts('script1.js', 'script2.js');
```

#### 3.1.1.4.4 Subworkers

```text
Workers have the ability to spawn child workers. This is great for further breaking up large tasks at runtime. However, subworkers come with a few caveats:

Subworkers must be hosted within the same origin as the parent page.
URIs within subworkers are resolved relative to their parent worker's location (as opposed to the main page).
Keep in mind most browsers spawn separate processes for each worker. Before you go spawning a worker farm, be cautious about hogging too many of the user's system resources. One reason for this is that messages passed between main pages and workers are copied, not shared. See Communicating with a Worker via Message Passing.
https://www.html5rocks.com/en/tutorials/workers/basics/#toc-gettingstarted-workercomm

For an sample of how to spawn a subworker, see the example in the specification. https://html.spec.whatwg.org/multipage/workers.html#delegation
```

#### 3.1.1.4.4.1 web workers html documentation

```text
https://html.spec.whatwg.org/multipage/workers.html#workers
```

#### 3.1.1.4.4.1.1 calculate prime numbers in background

```text
The simplest use of workers is for performing a computationally expensive task without interrupting the user interface.

In this example, the main document spawns a worker to (naïvely) compute prime numbers, and progressively displays the most recently found prime number.
/Users/<user>/work/code/javascript/serviceWorkers/calculate_primes$ 
$ python3 -m http.server

$ for f in $(ls); do echo "<<<<<< file: $f >>>>>"; cat $f; echo ""; done
<<<<<< file: index.html >>>>>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>naive prime nums worker thread</title>
    </head>

    <body>
        <p>Highest prime found: <output id="res"></output></p>
        <script>
            const worker = new Worker("worker.js");
            worker.onmessage = (evt) => {
                document.getElementById("res").textContent = evt.data;
            };
        </script>
    </body>
</html>

The Worker() constructor call creates a worker and returns a Worker object representing that worker, which is used to communicate with the worker. That object's onmessage event handler allows the code to receive messages from the worker.


<<<<<< file: worker.js >>>>>
let n = 1;
gotosearch: while (true) {
    n+=1;
    for (let index = 2; index <= Math.sqrt(n); index++){
       if (n%index == 0) {
           continue gotosearch;
       } 
       postMessage(n);
    }
}
The bulk of this code is simply an unoptimized search for a prime number. The postMessage() method is used to send a message back to the page when a prime is found.


load in chrome: http://localhost:8000/index.html
```

#### 3.1.1.4.4.1.2 Using a JavaScript module as a workers

```text
/Users/<user>/work/code/javascript/serviceWorkers/images_decoding
                        3.1.1.4.4.1.3
                    3.1.1.4.4.2
```

#### 3.1.1.4.5 Inline workers

```text
What if you want to create your worker script on the fly, or create a self-contained page without having to create separate worker files? With Blob(), you can "inline" your worker in the same HTML file as your main logic by creating a URL handle to the worker code as a string:

var blob = new Blob([
    "onmessage = function(e) { postMessage('msg from worker'); }"]);

// Obtain a blob URL reference to our worker 'file'.
var blobURL = window.URL.createObjectURL(blob);

var worker = new Worker(blobURL);
worker.onmessage = function(e) {
  // e.data == 'msg from worker'
};
worker.postMessage(); // Start the worker.
Blob URLs
The magic comes with the call to window.URL.createObjectURL(). This method creates a simple URL string which can be used to reference data stored in a DOM File or Blob object. For example:

blob:http://localhost/c745ef73-ece9-46da-8f66-ebes574789b1
Blob URLs are unique and last for the lifetime of your application (e.g. until the document is unloaded). If you're creating many Blob URLs, it's a good idea to release references that are no longer needed. You can explicitly release a Blob URLs by passing it to window.URL.revokeObjectURL():

window.URL.revokeObjectURL(blobURL);
In Chrome, there's a nice page to view all of the created blob URLs: chrome://blob-internals/.

Full Example
Taking this one step further, we can get clever with how the worker's JS code is inlined in our page. This technique uses a <script> tag to define the worker:

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body>

  <div id="log"></div>

  <script id="worker1" type="javascript/worker">
    // This script won't be parsed by JS engines
    // because its type is javascript/worker.
    self.onmessage = function(e) {
      self.postMessage('msg from worker');
    };
    // Rest of your worker code goes here.
  </script>

  <script>
    function log(msg) {
      // Use a fragment: browser will only render/reflow once.
      var fragment = document.createDocumentFragment();
      fragment.appendChild(document.createTextNode(msg));
      fragment.appendChild(document.createElement('br'));

      document.querySelector("#log").appendChild(fragment);
    }

    var blob = new Blob([document.querySelector('#worker1').textContent]);

    var worker = new Worker(window.URL.createObjectURL(blob));
    worker.onmessage = function(e) {
      log("Received: " + e.data);
    }
    worker.postMessage(); // Start the worker.
  </script>
</body>
</html>
In my opinion, this new approach is a bit cleaner and more legible. It defines a script tag with id="worker1" and type='javascript/worker' (so the browser doesn't parse the JS). That code is extracted as a string using document.querySelector('#worker1').textContent and passed to Blob() to create the file.
```

#### 3.1.1.4.6 Loading External Scripts

```text
When using these techniques to inline your worker code, importScripts() will only work if you supply an absolute URI. If you attempt to pass a relative URI, the browser will complain with a security error. The reason being: the worker (now created from a blob URL) will be resolved with a blob: prefix, while your app will be running from a different (presumably http://) scheme. Hence, the failure will be due to cross origin restrictions.

One way to utilize importScripts() in an inline worker is to "inject" the current url of your main script is running from by passing it to the inline worker and constructing the absolute URL manually. This will insure the external script is imported from the same origin. Assuming your main app is running from http://example.com/index.html:

...
<script id="worker2" type="javascript/worker">
self.onmessage = function(e) {
  var data = e.data;

  if (data.url) {
    var url = data.url.href;
    var index = url.indexOf('index.html');
    if (index != -1) {
      url = url.substring(0, index);
    }
    importScripts(url + 'engine.js');
  }
  ...
};
</script>
<script>
  var worker = new Worker(window.URL.createObjectURL(bb.getBlob()));
  worker.postMessage({url: document.location});
</script>
```

#### 3.1.1.4.7 Handling Errors

```text
As with any JavaScript logic, you'll want to handle any errors that are thrown in your web workers. If an error occurs while a worker is executing, the an ErrorEvent is fired. The interface contains three useful properties for figuring out what went wrong: filename - the name of the worker script that caused the error, lineno - the line number where the error occurred, and message - a meaningful description of the error. Here is an example of setting up an onerror event handler to print the properties of the error:

<output id="error" style="color: red;"></output>
<output id="result"></output>

<script>
  function onError(e) {
    document.getElementById('error').textContent = [
      'ERROR: Line ', e.lineno, ' in ', e.filename, ': ', e.message
    ].join('');
  }

  function onMsg(e) {
    document.getElementById('result').textContent = e.data;
  }

  var worker = new Worker('workerWithError.js');
  worker.addEventListener('message', onMsg, false);
  worker.addEventListener('error', onError, false);
  worker.postMessage(); // Start worker without a message.
</script>
```

#### 3.1.1.4.8 A Word on Security

```text
Restrictions with Local Access
Due to Google Chrome's security restrictions, workers will not run locally (e.g. from file://) in the latest versions of the browser. Instead, they fail silently! To run your app from the file:// scheme, run Chrome with the --allow-file-access-from-files flag set. NOTE: It is not recommended to run your primary browser with this flag set. It should only be used for testing purposes and not regular browsing.

Other browsers do not impose the same restriction.

Same Origin Considerations
Worker scripts must be external files with the same scheme as their calling page. Thus, you cannot load a script from a data: URL or javascript: URL, and an https: page cannot start worker scripts that begin with http: URLs.

Use Cases
So what kind app would utilize web workers? Unfortunately, web workers are still relatively new and the majority of samples/tutorials out there involve computing prime numbers. Although that isn't very interesting, it's useful for understanding the concepts of web workers. Here are a few more ideas to get your brain churning:

Prefetching and/or caching data for later use
Code syntax highlighting or other real-time text formatting
Spell checker
Analyzing video or audio data
Background I/O or polling of webservices
Processing large arrays or humungous JSON responses
Image filtering in <canvas>
Updating many rows of a local web database

                3.1.1.4.9
            3.1.1.5
        3.1.2

    3.2
```
