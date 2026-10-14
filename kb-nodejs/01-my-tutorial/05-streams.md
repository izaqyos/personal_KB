---
type: reference
title: streams
description: Subsection 1.5 of my Tutorial.
tags: [kb-nodejs, node, npm, package-json, list, dependencies, dependency, tree, show, outdated, latest, version, leading, modules, and, packages, express, framework, tutorial, lodash, multer, upload, nodejs, unzipper, module, description, use, cases, code, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.5"
---

# 1.5 streams

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

```text
nodejs Streams

Streams are objects that let you read data from a source or write data to a destination in continuous fashion. In Node.js, there are four types of streams −
* Readable − Stream which is used for read operation.
* Writable − Stream which is used for write operation.
* Duplex − Stream which can be used for both read and write operation.
* Transform − A type of duplex stream where the output is computed based on input.
Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used events are −
* data − This event is fired when there is data is available to read.
* end − This event is fired when there is no more data to read.
* error − This event is fired when there is any error receiving or writing data.
* finish − This event is fired when all the data has been flushed to underlying system.
This tutorial provides a basic understanding of the commonly used operations on Streams.


Piping is a mechanism where we provide the output of one stream as the input to another stream. It is normally used to get data from one stream and to pass the output of that stream to another stream. There is no limit on piping operations. Now we'll show a piping example for reading from one file and writing it to another file.


Chaining the Streams
Chaining is a mechanism to connect the output of one stream to another stream and create a chain of multiple stream operations. It is normally used with piping operations. Now we'll use piping and chaining to first compress a file and then decompress the same.


Code:
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


Test:
$ node streamsDemo.js 
demo read stream. node streams emit data,end,error,finish events...
reader register on data CB
demo write stream.
Demo piping streams
check piped output...
Demo chaining streams
Demo chaining streams. Compressing
Program Ended
reader on data CB got chunk:  kkkalkslks
lasklk
asaa

writer got finish event
on end CB 
kkkalkslks
lasklk
asaa

input.txt.gz created
Demo chaining streams. Decompressing
Printing piped_output.txt from CB:  kkkalkslks
lasklk
asaa

input.txt.gz decompressed to input1.txt
```
