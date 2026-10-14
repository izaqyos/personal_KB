---
type: reference
title: My demos
description: Pointers to personal Node.js demo projects.
tags: [nodejs, examples, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: deprecated
capture_type: source
legacy_source: "nodejs-kb#12"
---

# My demos

> **Deprecated (2026-10):** Grunt superseded. Current: npm scripts / modern bundlers. Source: <https://nodejs.org/api/test.html>

[↑ nodejs-kb](/kb-nodejs/README.md)

## 12.1 /Users/<user>/work/code/nodejs/tutorial/Gruntfile.js

```text
module.exports = function(grunt) {
	var banner = '/*n<%= pkg.name %> <%= pkg.version %> - <%= pkg.description %>n<%= pkg.repository.url %>nBuilt on <%= grunt.template.today("yyyy-mm-dd") %>n*/n';

        // section 1 - require modules
    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
                eslint: {
            options: {
                config: 'eslint.json',
                reset: true
            },
            target: ['*.js']
        },
        // task for mocha tests execution, they would be executed by nyc
        mochaTest: {
            local: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/*.js']
            }
        },
        // nyc - executes mochaTest task
        nyc: {
            local: {
                options: {
                    all: true,
                    exclude: [
                        "**/*.spec.js",
                        "**/Gruntfile.js",
                        "**/Mock*",
                        "**/coverage",
                        "**/resources"
                    ],
                    reporter: ['text-summary', 'html'],
                    checkCoverage: true,
                    lines: 90
                },
                cmd: false,
                args: ['grunt', 'mochaTest:local', '--force']
            }
        }
	});


// section 3 - register grunt tasks
        //    grunt.loadNpmTasks('gruntify-eslint');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-simple-nyc');

    // Default task
    //grunt.registerTask('default', [ 'test']);
    grunt.registerTask('default', ['lint', 'test']);
    // Lint task
    //grunt.registerTask('lint', ['eslint:ci']);
    grunt.registerTask('lint', ['eslint']);
    // Mocha test task
    grunt.registerTask('test', ['nyc:local']);
};
```

## 12.2 /Users/<user>/work/code/nodejs/tutorial/arraysDemo.js

```text
let myarray1 = [] //create an empty array
let myarray2 = ['a', 'b'] //create a non empty array
let myarrayofarrays=[myarray1, myarray2]

let printArr = function(arr){
    arr.forEach(function(item, index, array) {
        console.log(item, index);
});

};
console.log("Print arrays:");
printArr(myarrayofarrays);

let first = myarray2[0];
let last = myarray2[myarray2.length -1];


console.log("arrays add/remove operations:");
let newLength = myarray2.push('c'); //add to end
let lastElem = myarray2.pop(); // remove from end
let firstElem = myarray2.shift(); // remove from front
newLength = myarray2.unshift('aa'); //add to end
newLength = myarray2.unshift('aaa'); //add to end

let posofaa=myarray2.indexOf('aa');
printArr(myarray2);

//myarray2 = [aaa, aa, b]
//

console.log("remove n items from position. splice(pos, n). removing aa:");
let removedItem = myarray2.splice(myarray2.indexOf('aa'), 1);
printArr(myarray2);



console.log("arrays shallow copy");
let myarray3 = myarray2.slice();
printArr(myarray3);

console.log("array as result of regex match");
// Match one d followed by one or more b's followed by one d
// Remember matched b's and the following d
// Ignore case
var myRe = /d(b+)(d)/i;
var myarray4  = myRe.exec('cdbBdbsbz');
printArr(myarray4);

//Delete from array using filter https://stackoverflow.com/questions/10024866/remove-object-from-array-using-javascript
console.log('using filter to delete from array');
let myarray5 = myarray2.filter( (elem) => { return elem !== 'aaa';}) ;
printArr(myarray5);

let arrOfObj = [ {'k1':'val', 'k2':'val2'} , {'k3':'val3', 'k4':'val4'}]
console.log('array of objects print as string: %s', arrOfObj.toString());
console.log('array of objects print as string using join:  %s', arrOfObj.join(", "));
console.log('array of objects print as string using JSON.stringify:  %s', JSON.stringify(arrOfObj));
let myobj = {
        'arr': arrOfObj
}
console.log('nested object print as string using JSON.stringify:  %s', JSON.stringify(myobj, null, 4));
```

## 12.3 /Users/<user>/work/code/nodejs/tutorial/asyncAwaitDemo.js

```text
//async  function f(){
//        return 1;
//}

//f().then( res => console.log("promise returned %s", res));
//console.log("waiting on async promise. val=%s", f().then());
//
//
function createPromise(){
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000)
  });
}

async function f1() {

        let result;
        try{
  result = await createPromise(); // wait till the promise resolves (*), await can only be used in an async function. Its better than using .then() w/ success function
        }
        catch (err){
                console.log("promise rejected %s",err);
        }

  console.log("result=%s", result); // "done!"
        return result;
}

f1().then(res => console.log("res=%s",res));
```

## 12.4 /Users/<user>/work/code/nodejs/tutorial/buffers.js

```text
var buf = new Buffer(10); 
console.log("buf= ",buf);


var buf1 = new Buffer([1,2,3,4]); 
console.log("buf1= ",buf1);

var buf2 = new Buffer(256); 
wlen = buf2.write("writing to buffer");
console.log("wrote "+wlen+" bytes to buf2. content(hex)= ",buf2);
console.log("readable content= "+buf2.toString('utf8',0, wlen));

buf = new Buffer(26);
for (var i = 0 ; i < 26 ; i++) {
  buf[i] = i + 97;
}

console.log( buf.toString('ascii'));       // outputs: abcdefghijklmnopqrstuvwxyz
console.log( buf.toString('ascii',0,5));   // outputs: abcde
console.log( buf.toString('utf8',0,5));    // outputs: abcde
console.log( buf.toString(undefined,0,5)); // encoding defaults to 'utf8', outputs abcde




var buf = new Buffer('Simply Easy Learning');
var json = buf.toJSON(buf);

console.log(json);


var buffer1 = new Buffer('TutorialsPoint ');
var buffer2 = new Buffer('Simply Easy Learning');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 content: " + buffer3.toString());

var buffera = new Buffer('ABC');
var bufferb = new Buffer('ABCD');
var result = buffera.compare(buffer2);

if(result < 0) {
   console.log(buffera +" comes before " + bufferb);
}else if(result == 0){
   console.log(buffera +" is same as " + bufferb);
}else {
   console.log(buffera +" comes after " + bufferb);
}

var bufferc = new Buffer('ABC');

//copy a buffer
var bufferd = new Buffer(3);
bufferc.copy(bufferd);
console.log("bufferd content: " + bufferd.toString());

var buffere = new Buffer('TutorialsPoint');

//slicing a buffer
var bufferf = bufferd.slice(0,9);
console.log("bufferf content: " + bufferf.toString());


var bufferg = new Buffer('TutorialsPoint');

//length of the buffer
console.log("buffer length: " + bufferg.length);
```

## 12.5 /Users/<user>/work/code/nodejs/tutorial/classes.js

```text
class DemoClass{

        constructor(name){
                this.name = name;
        }

        printMe(){
                console.log("name is %s",this.name);
                console.log("undefined member: %s", this.undef);
                if (!this.undef) {
                        console.log("this.undef is undefined");
                }
                else{
                        console.log("this.undef is defined");
                }
        }
}

function test1(){
    demoC = new DemoClass('demo');
    demoC.printMe();
}

test1()
```

## 12.6 /Users/<user>/work/code/nodejs/tutorial/client.js

```text
var http = require('http');

// Options to be used by request 
var options = {
   host: 'localhost',
   port: '8081',
   path: '/index.htm'  
};

// Callback function is used to deal with response
var callback = function(response){
   // Continuously update stream with data
   var body = '';
   response.on('data', function(data) {
      body += data;
   });
   
   response.on('end', function() {
      // Data received completely.
      console.log(body);
   });
}
// Make a request to the server
var req = http.request(options, callback);
req.end();

// Options to be used by request 
var options1 = {
   host: 'localhost',
   port: '8081',
   path: '/client.js'
};

;
var req1 = http.request(options1, callback);
req1.end();
```

## 12.7 /Users/<user>/work/code/nodejs/tutorial/dictionaryDemo.js

```text
//ES5 JS

var dict = {};

var func1 = function(){
        console.log('func1 called');
}

var func2 = function(){
        console.log('func2 called');
}

//function as value
dict['func1'] = func1;
dict['func2'] = func2;

//function as key
dict[func1] = 'This is func1 value';
dict[func2] = 'This is func2 value';

Object.keys(dict).forEach(function (key, index){
        console.log('dictionary key ', key);
        console.log('dictionary index ', index);
        console.log('dictionary value ', dict[key]);
        if (typeof dict[key] === 'function'){
                console.log('encounter a function value. running it');
                dict[key]();
        }
});
```

## 12.8 /Users/<user>/work/code/nodejs/tutorial/eventEmitterListenersLeakDemo.js

```text
//Assume Logger is a module that emits errors
//var Logger = require('./Logger.js');


const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
for (var i = 0; i < 11; i++) {
console.log('number of listeres: ' +EventEmitter.listenerCount(myEmitter, 'event'));
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
}
myEmitter.emit('event');

//Note, to fix (node:85333) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 event listeners added. Use emitter.setMaxListeners() to increase limit
//remove the .on (register event listener)  from loop
```

## 12.9 /Users/<user>/work/code/nodejs/tutorial/evtHandlingDemo.js

```text
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
```

## 12.10 /Users/<user>/work/code/nodejs/tutorial/expressDemo.js

```text
var  express = require('express');

var app = express();

app.get('/', function(req, res){
        res.send('Hello world!!');
});

var server = app.listen(8081, function(){
        var host = server.address().address ;
        var port = server.address().port ;

        console.log("Example server listening at http://%s:%s",host, port);
});
```

## 12.11 /Users/<user>/work/code/nodejs/tutorial/fsDemo.js

```text
let fs = require("fs");


obj={
        'arr': ['a','b'],
        'innerObj': {
                'c': 1,
                'd': 'ddd'
        }
};

let buffer = new Buffer(JSON.stringify(obj, null, 4));
let filepath1='./fsDemoGeneratedOutput.json';
let filepath2='./fsDemoBufferedOutput.json';

console.log('async write buffer to file using low level api');
fs.open(filepath2, 'w', function(err, fd){
        if (err){
                throw 'error opening file '+ err;
        }

        fs.write(fd, buffer, 0, buffer.length, null, function(err){
                if (err){
                        throw 'error writing to file ' + err;
                }
                
                    fs.close(fd, function() {
                            console.log('finished writing. file closed.');
                    });
    })
});
console.log('finished async write buffer to file using low level api');

//now read back
fs.open(filepath2, 'r', function(err, fd){
        if (err){
                throw 'error opening file '+ err;
        }
                //at this point write has finished
                fs.read(fd, Buffer.alloc(300), 0, 300, 0, function(err, bytesRead, buf) {
                    if (err){
                            throw 'error reading from file ' + err;
                    }

                    console.log('read from file ');
                    console.log(buf.toString('utf8'));
                });
         fs.close(fd, function() {
                 console.log('finished reading. file closed.');
         });
});


console.log('async write JSON to file using higher level api');
fs.writeFile(filepath1, JSON.stringify(obj), 'utf8', function(err){
        if (err){
                console.log('fs.writeFile error '+err);
        }
        console.log('completed writing JSON to file');
});

setTimeout( function(){
        fs.readFile(filepath1, 'utf8' , function (err, data){
        if (err){
                console.log('fs.readFile error '+err);
        }
        let obj1 = JSON.parse(data); // convert to object just for kicks 

        console.log('readFile has read ', data);

        });
}, 1000);
```

## 12.12 /Users/<user>/work/code/nodejs/tutorial/globalsDemo.js

```text
console.log("Demo of nodejs globals");

console.log(" __filename = ", __filename);
console.log(" __dirname = ", __dirname);
console.log(" platform+arch = ", process.platform, process.arch);
console.log(" pid = ", process.pid);
console.log(" title = ", process.title);


console.log("setTimeout(cb,ms) triggers cb after ms...");

function echoMsg (argument) {
    console.log(argument.toString());
}

var to = setTimeout(echoMsg, 2000, "printed after 2 seconds");
var to1 = setTimeout(echoMsg, 2000, "printed after 2 seconds");

clearTimeout(to1);

setInterval(echoMsg, 1000, "Print after one second");
```

## 12.13 /Users/<user>/work/code/nodejs/tutorial/helloWorld.js

```text
console.log("importing http module and loading server");

var http =require("http");

http.createServer( function(request, response) {

    console.log("Sending HTTP header status 200 (ok) , type text/plain");
    response.writeHead(200, {'Content-Type':'text/plain'} ) ;


    console.log("Sending HTTP body status: Hello World nodejs  ");
    response.end('Hello World nodejs \n');
}).listen(8081);

console.log("server up. listen on http://127.0.0.1:8081/");

var fs = require("fs")

var data = fs.readFileSync('helloWorld.js');
console.log("Reading file synchronously. content: ", data.toString());



console.log("Reading file asynchronously by registering a callback function to do something w/ file content...");
fs.readFile('helloWorld.js', function (err,data) {
    if (err) return console.error(err);

    console.log("Printing file content from CB: ", data.toString());
});

console.log("End of demo program");
```

## 12.14 /Users/<user>/work/code/nodejs/tutorial/helloWorldClass.js

```text
class HelloWorld{
    constructor(msg){
            this.msg = msg;
    }

    printHelloWorld()
        {
                console.log(this.msg);
                return this.msg;
        }
}

module.exports = new HelloWorld ("Hello World. This is a demo of basic nodejs");
```

## 12.15 /Users/<user>/work/code/nodejs/tutorial/jsObjectDemo.js

```text
console.log('iterate object keys');
var data = {
  "VERSION": "2006-10-27.a",
  "JOBNAME": "EXEC_",
  "JOBHOST": "Test",
  "LSFQUEUE": "45",
  "LSFLIMIT": "2006-10-27",
  "NEWUSER": "3",
  "NEWGROUP": "2",
  "NEWMODUS": "640"
};

Object.keys(data).forEach(function(key) {
  console.log('Key : ' + key + ', Value : ' + data[key])
})

console.log('iterate array using forEach');
let arr = [1,2,3,4];
yourArray.forEach(function (arrayItem) {
    var x = arrayItem+ 2;
    console.log(x);
});


console.log('iterate array using for');
for (var j = 0; j < arr.length; j++){
  console.log(arr[j].x);
}


console.log('iterate array using for item');
for (let item of arr) {
    console.log(item); // Will display contents of the object inside the array
}

console.log('some use cases of looping through an array in the functional programming way in JavaScript');

//1. Just loop through an array

const myArray = [{x:100}, {x:200}, {x:300}];

myArray.forEach((element, index, array) => {
    console.log(element.x); // 100, 200, 300
    console.log(index); // 0, 1, 2
    console.log(array); // same myArray object 3 times
});
//Note: Array.prototype.forEach() is not a functional way strictly speaking, as the function it takes as the input parameter is not supposed to return a value, which thus cannot be regarded as a pure function.

//2. Check if any of the elements in an array pass a test

const people = [
    {name: 'John', age: 23},
    {name: 'Andrew', age: 3},
    {name: 'Peter', age: 8},
    {name: 'Hanna', age: 14},
    {name: 'Adam', age: 37}];

const anyAdult = people.some(person => person.age >= 18);
console.log(anyAdult); // true
//3. Transform to a new array

const myArray = [{x:100}, {x:200}, {x:300}];

const newArray= myArray.map(element => element.x);
console.log(newArray); // [100, 200, 300]
//Note: The map() method creates a new array with the results of calling a provided function on every element in the calling array.

//4. Sum up a particular property, and calculate its average

const myArray = [{x:100}, {x:200}, {x:300}];

const sum = myArray.map(element => element.x).reduce((a, b) => a + b, 0);
console.log(sum); // 600 = 0 + 100 + 200 + 300

const average = sum / myArray.length;
console.log(average); // 200
//5. Create a new array based on the original but without modifying it

const myArray = [{x:100}, {x:200}, {x:300}];

const newArray= myArray.map(element => {
    return {
        ...element,
        x: element.x * 2
    };
});

console.log(myArray); // [100, 200, 300]
console.log(newArray); // [200, 400, 600]
//6. Count the number of each category

const people = [
    {name: 'John', group: 'A'},
    {name: 'Andrew', group: 'C'},
    {name: 'Peter', group: 'A'},
    {name: 'James', group: 'B'},
    {name: 'Hanna', group: 'A'},
    {name: 'Adam', group: 'B'}];

const groupInfo = people.reduce((groups, person) => {
    const {A = 0, B = 0, C = 0} = groups;
    if (person.group === 'A') {
        return {...groups, A: A + 1};
    } else if (person.group === 'B') {
        return {...groups, B: B + 1};
    } else {
        return {...groups, C: C + 1};
    }
}, {});

console.log(groupInfo); // {A: 3, C: 1, B: 2}
//7. Retrieve a subset of an array based on particular criteria

const myArray = [{x:100}, {x:200}, {x:300}];

const newArray = myArray.filter(element => element.x > 250);
console.log(newArray); // [{x:300}]
//Note: The filter() method creates a new array with all elements that pass the test implemented by the provided function.

//8. Sort an array

const people = [
  { name: "John", age: 21 },
  { name: "Peter", age: 31 },
  { name: "Andrew", age: 29 },
  { name: "Thomas", age: 25 }
];

let sortByAge = people.sort(function (p1, p2) {
  return p1.age - p2.age;
});

console.log(sortByAge);

//9. Find an element in an array

const people = [ {name: "john", age:23},
                {name: "john", age:43},
                {name: "jim", age:101},
                {name: "bob", age:67} ];

const john = people.find(person => person.name === 'john');
console.log(john);

//The Array.prototype.find() method returns the value of the first element in the array that satisfies the provided testing function.
```

## 12.16 /Users/<user>/work/code/nodejs/tutorial/promiseDemo.js

```text
console.log("Starting promise demo");

function readJSONSync(filename){
let fs=require("fs");
        return JSON.parse(fs.readFileSync(filename, 'utf8'));
}

jsonData = readJSONSync("jsonFile");

console.log("Read data synchrounsly, %s ", JSON.stringify(jsonData));

function readJSONCB(filename, cb){
let fs=require("fs");
        fs.readFile(filename, 'utf8', function (err, res){
                if (err) return cb(err);
                cb(null, JSON.parse(res)) ;
        });
}

function printJSON(param1, json){
    console.log("Read data callback, %s ", JSON.stringify(json));
}

readJSONCB("jsonFile", printJSON);

//creating a promise
function readFilePromise(filename, encoding){

        console.log("readFilePromise called for file %s",filename);
        return new Promise( function(fulfill, reject){
                let fs = require("fs");
                fs.readFile(filename, encoding, function(err,res){
                        ////throw error commented code
                        //const errorMsg = new Error("Test error message");
                        //reject(errorMsg);
                        if (err) {

                                reject(err);
                        }
                        else {
                                fulfill(res);
                        }
                });
        });
}

//consuming a Promise
function readFileUsingPromise(filename){
        console.log("readFileUsingPromise called for file %s",filename);
        return readFilePromise(filename,  'utf8').then(function(res){
                console.log("readFileUsingPromise, read: %s", JSON.stringify(JSON.parse(res)));
                return JSON.parse(res);
        })
        .catch(function(err){
                console.log("Caught error %s",err.message);
        })
        ;
}

readFileUsingPromise("jsonFile");


//Manual tests. when lines 33-35 are active
// $ node promiseDemo.js 
// Starting promise demo
// Read data synchrounsly, {"name":"yosi","lastName":"izaq","Description":"Demo of nodejs promise"} 
// readFileUsingPromise called for file jsonFile
// readFilePromise called for file jsonFile
// Read data callback, {"name":"yosi","lastName":"izaq","Description":"Demo of nodejs promise"} 
// readFileUsingPromise, read: {"name":"yosi","lastName":"izaq","Description":"Demo of nodejs promise"}
// $ node promiseDemo.js 
// Starting promise demo
// Read data synchrounsly, {"name":"yosi","lastName":"izaq","Description":"Demo of nodejs promise"} 
// readFileUsingPromise called for file jsonFile
// readFilePromise called for file jsonFile
// Read data callback, {"name":"yosi","lastName":"izaq","Description":"Demo of nodejs promise"} 
// Caught error Test error message
//
//
let getDateTimeFunc = function getDateTime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + ":" + month + ":" + day + ":" + hour + ":" + min + ":" + sec;

}

console.log("Promise chaining demo");

//let toggle = false; //toggle for resolve / reject
let toggle = true; //toggle for resolve / reject
//1st promise.
let buyPhonePromise = new Promise( function(resove, reject){
        if (toggle){
                let phone = {
                        brand: 'apple',
                        color: 'black',
                        model: 'iphone xr'
                };
                resove(phone);
        } else{
                let error= new Error('too expensive lol');
                reject(error);
        }
});

//2nd promise, note takes 1st promise resolve as argument
let configurePhonePromise = function(phone){
        let message = 'successfully bought and configured new ' + phone.brand + ' phone, ' + phone.color + ' '+   phone.model;
        return Promise.resolve(message);
};

//3rd message, add date to message
let addDatePromise = function(message){
        let rmessage = getDateTimeFunc+' '+message;
        return Promise.resolve(message);
};

//chain promises for consumption
let simBuy = function(){

        buyPhonePromise
        .then(configurePhonePromise)
        .then(addDatePromise)
        .then(function(resolved){
                console.log(resolved);
        })
        .catch(function(reject){
                console.log(reject.message);
        });
};

simBuy();

console.log("Promise chaining demo using ES7 async await");


const buyPhonePromiseAA = new Promise( 
        (resolve, reject) => {
        if (toggle){
                console.log("buying phone...");
                const phone = {
                        brand: 'apple',
                        color: 'black',
                        model: 'iphone xr'
                };
                console.log("resolve phone %o",phone);
                resolve(phone);
        } else{
                console.log("not buying phone...");
                let error= new Error('too expensive lol');
                reject(error);
        }
});

//2nd promise, note takes 1st promise resolve as argument
async function  configurePhonePromiseAA (phone){
        return new Promise(
                (res,rej) => {
        let message = 'Async/Await successfully bought and configured new ' + phone.brand + ' phone, ' + phone.color + ' '+   phone.model;
        res(message);
                }
        );
};

//3rd message, add date to message
async function addDatePromiseAA (message){
        return new Promise(
                (res,jeg) => {
        let rmessage = getDateTimeFunc+' '+message;
        res(message);
                }
        )
};

async function simBuyAA(){

        try{
                console.log("Staring async calls...");
                let phone = await buyPhonePromiseAA;  
                console.log("bought phone %s",phone);
                let message = await configurePhonePromiseAA(phone);
                let rmessage = await addDatePromiseAA(message);
                console.log(rmessage);
                console.log("After async calls...");

        }
        catch (err){
                console.log(err);
        }
};

( async () => {
        await simBuyAA();
})();
```

## 12.17 /Users/<user>/work/code/nodejs/tutorial/regex.js

```text
const regexName = /^\w+$/

const testPatterns = ["a-c","$%", "abcd", "a_c", "a+b","a@b"];

let i;

for (i=0; i<testPatterns.length; i++)
{
        console.log("check pattern %s is a valid word. it is %s", testPatterns[i], regexName.test(testPatterns[i]));
}


const regexFilename = /^\w+$/
const filenameReservedRegex = require('filename-reserved-regex');
console.log(" filenameReservedRegex=%s", filenameReservedRegex);
const validFileName = require('valid-filename');

const testFileNames=["abs.js","a..cpp","\a","a:b",">a","v<a","aaa", ".","..","a.","b..", ".a"]; 
for (i=0; i<testFileNames.length; i++)
{
        console.log("check pattern %s is a valid filename. it is %s", testFileNames[i], validFileName(testFileNames[i]));
}
```

## 12.18 /Users/<user>/work/code/nodejs/tutorial/server.js

```text
var http = require('http');
var fs = require('fs');
var url = require('url');

// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   var pathname = url.parse(request.url).pathname;
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
```

## 12.19 /Users/<user>/work/code/nodejs/tutorial/serverRunner.js

```text
var server = require('./server/index.js');
var port = process.env.PORT || 3000;

server.listen(port, function(){
        console.log("server running on port %d", port);
});
```

## 12.20 /Users/<user>/work/code/nodejs/tutorial/sinonDemo.js

```text
class User{

        constructor (fname, lname){
                this.fname = fname;
                this.lname = lname;
        }

        getName()
        {
                return this.fname +" "+this.lname;
        }

        sleep(ms){
                return new Promise(resolve => setTimeout(resolve,ms));
        }

        async saveToDB()
        {
                console.log("sleeping...");
                await this.sleep(2000);
                console.log("woke up 2 sec later");
        }

        setName(fname,lname){
                this.fname = fname;
                this.lname = lname;
        }

        callSetThenGetName(){
                console.log("callSetThenGetName()");
                this.setName(this.fname, this.lname);
                this.saveToDB();
                this.getName();
        }
}


//module.exports = new User ("yosi","izaq");
module.exports = User ;

var sinon = require('sinon');
let user = new User("yosi","izaq");
var getNameSpy =  sinon.spy(user,"getName");

var i;
for (i=0;i<10;i++) user.getName();
console.log("user.getName() called %s times", getNameSpy.callCount);
//calling restore removes the spy. this is very important.
getNameSpy.restore();

user.saveToDB();
```

## 12.21 /Users/<user>/work/code/nodejs/tutorial/sinonDemoManager.js

```text
user = require('./sinonDemo.js');

class Manager{
        constructor(name){
                this.name =name;
        }

        hireNewEmployee( user)
        {
            console.log("hireNewEmployee()");
            user.callSetThenGetName();
        }
}

module.exports = Manager ;
```

## 12.22 /Users/<user>/work/code/nodejs/tutorial/streamsDemo.js

```text
var fs = require("fs");
var data = '';

console.log("demo read stream. node streams emit data,end,error,finish events...");
// Create a readable stream
var readerStream = fs.createReadStream('input.txt');

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

console.log("reader register on data CB");
// Handle stream events --> data, end, and error
readerStream.on('data', function(chunk) {
   console.log("reader on data CB got chunk: ", chunk);
   data += chunk;
});

readerStream.on('end',function(){
   console.log("on end CB ");
   console.log(data);
});

readerStream.on('error', function(err){
   console.log("on error CB ");
   console.log(err.stack);
});


console.log("demo write stream.");
//var data1="sample data";

var writeStream = fs.createWriteStream('output.txt');

writeStream.write(data,'UTF8');
writeStream.end();

writeStream.on('finish', function () {
   console.log("writer got finish event");
});


writeStream.on('error', function (err) {
   console.log("writer got error event: ", err.stack);
});

console.log("Demo piping streams"); 
var readerStream1 = fs.createReadStream('input.txt');
var writeStream1 = fs.createWriteStream('piped_output.txt');
readerStream1.pipe(writeStream1);

console.log("check piped output..."); 
fs.readFile('piped_output.txt', function (err,data) {
    if (err) return console.error(err);
    console.log("Printing piped_output.txt from CB: ", data.toString());
});

console.log("Demo chaining streams"); 
console.log("Demo chaining streams. Compressing"); 
var zlib = require('zlib');


var readerStream2 = fs.createReadStream('input.txt');
readerStream2.
        pipe(zlib.createGzip()).
        pipe(fs.createWriteStream('input.txt.gz'));


readerStream2.on('end' , function (){
console.log("input.txt.gz created"); 

console.log("Demo chaining streams. Decompressing"); 
var readerStream3 = fs.createReadStream('input.txt.gz');
        readerStream3.
        pipe(zlib.createGunzip()).
        pipe(fs.createWriteStream('input1.txt'));

        readerStream3.on('end', function () {
            console.log("input.txt.gz decompressed to input1.txt"); 
            
        });
});

console.log("Program Ended");
```

## 12.23 /Users/<user>/work/code/nodejs/tutorial/switchStringDemo.js

```text
//$ node switchStringDemo.js
//process.env.REGION=undefined
//$ export REGION=url
//$ node switchStringDemo.js
//url detected. process.env.REGION=url
//$ export REGION=json
//$ node switchStringDemo.js
//json detected. process.env.REGION=json     
let region = process.env.REGION;

switch (region){

        case "url":
                console.log("url detected. process.env.REGION=%s",region);
                break;
        case "json":
                console.log("json detected. process.env.REGION=%s",region);
                break;
        default:
                console.log("process.env.REGION=%s",region);
                break;

}
```

## 12.24 /Users/<user>/work/code/nodejs/tutorial/uuidDemo.js

```text
let uuid = require('uuid/v1');
let uuidvalidate = require('uuid-validate');

module.exports=  () => {
        uuidv1 = uuid();
console.log("Generated uuid: %s", uuidv1 );
        if (uuidvalidate(uuidv1)) {
                console.log("it is a valid version %s uuid ", uuidvalidate.version(uuidv1));
        }
        else{
                console.log("it is not valid");
        }
        return uuidv1;

};

let genUUIDv1 = module.exports;

genUUIDv1();
```

## 12.25 /Users/<user>/work/code/nodejs/tutorial/watchDogDemo.js

```text
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


//watchdog using setTimeout.
//wd.startWatch(1000); //ms

//watchdog using setInterval - more efficient since manual loop implementation is not required
const intervalId = setInterval(function() { wd.checkEnvVarHasChanged();}, 2000);
//wd.emit('envVarHasChanged');


console.log('more complex emmitter demo. A WatchDog thread the checks for a condition ever x ms and emits an event when condition is met');


    12.26  



    12.27  
    12.28  
    12.29  
    12.30  
    12.31  
    12.32  
    12.33  
    12.34  
    12.35  
    12.36  
    12.37  
    12.38  
    12.39  
    12.40  
    12.41  
    12.42  
    12.43  
    12.44  
    12.45  
    12.46  
    12.47  
    12.48  
    12.49  
    12.50  
    12.51  
    12.52  
    12.53  
    12.54  
    12.55  
    12.56  
    12.57  
    12.58  
    12.59  
    12.60  
    12.61  
    12.62  
    12.63  
    12.64  
    12.65  
    12.66  
    12.67  
    12.68  
    12.69  
    12.70  
    12.71  
    12.72  
    12.73  
    12.74  
    12.75  
    12.76  
    12.77  
    12.78  
    12.79  
    12.80  
    12.81  
    12.82  
    12.83  
    12.84  
    12.85  
    12.86  
    12.87  
    12.88  
    12.89  
    12.90  
    12.91  
    12.92  
    12.93  
    12.94  
    12.95  
    12.96  
    12.97  
    12.98  
    12.99  
    12.100 
    12.101 
```
