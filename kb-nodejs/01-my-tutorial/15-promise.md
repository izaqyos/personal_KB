---
type: reference
title: promise
description: Subsection 1.15 of my Tutorial.
tags: [kb-nodejs, node, npm, package-json, list, dependencies, dependency, tree, show, outdated, latest, version, leading, modules, and, packages, express, framework, tutorial, lodash, multer, upload, nodejs, unzipper, module, description, use, cases, code, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.15"
---

# 1.15 promise

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

### 1.15.1 promises basics

```text
https://www.promisejs.org/
https://developer.ibm.com/node/2016/08/24/promises-in-node-js-an-alternative-to-callbacks/

check my tutorial code:
<url:/Users/<user>/work/code/nodejs/tutorial/promiseDemo.js>
console.log("Starting promise demo");

const fs = require('fs');
const util = require('util');

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

console.log('async await syntax (syntactic sugar for promises)');

async function readFileAsync(filename, encoding){
        let fs = require("fs");
        //return fs.readFile(filename, encoding); //-> exception, since core
    //API doesn't support promise syntax. must promisify
        return util.promisify(fs.readFile)(filename, encoding);
}

async function readFileUsingAsyncPromise(filename){
        console.log("readFileUsingAsyncPromise called for file %s",filename);
        let result;
        try {
            result = await readFileAsync(filename, 'utf8');
        } catch (err){
            console.log('readFileUsingAsyncPromise error ', err);
        }
        console.log('file %s content is: %s', filename, result);
        return result;
}

readFileUsingAsyncPromise("jsonFile").then( (content) => {
    console.log('readFileUsingAsyncPromise read ',content);   
});



console.log('async await syntax. promisify wrapper for core api (like fs)');
const readFileAW = util.promisify(fs.readFile);
async function readFileUsingAsyncPromise2(filename){
    return await readFileAW(filename);
}
readFileUsingAsyncPromise2("jsonFile").then( (content) => {
    console.log('readFileUsingAsyncPromise2 read ',content);   
});

console.log('fire multiple promises in paralel and return which have failed');
async function promise1(delayms, msg){
    return new Promise( (res, rej) => { setTimeout( (res,msg) => {console.log(msg); res(msg);} , delayms); } );
}

promise1();
```

### 1.15.2 promise all

```text
        1.15.3
```
