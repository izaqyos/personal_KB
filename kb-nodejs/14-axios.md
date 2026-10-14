---
type: reference
title: Axios
description: "Axios HTTP client: basics, max response size and response headers."
tags: [nodejs, http, javascript, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#14"
---

# Axios

[↑ nodejs-kb](/kb-nodejs/README.md)

## 14.1 axios 101

```text
Tutorial
Init projects
$ npm init -y
Wrote to /Users/<user>/work/code/nodejs/axios/package.json:

{
  "name": "axios",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

Install axios
~/work/code/nodejs/axios101:]2043$ npm i axios



Axios Response object
When we send a request to a server, it returns a response. The Axios response object consists of:
* data - the payload returned from the server
* status - the HTTP code returned from the server
* statusText - the HTTP status message returned by the server
* headers - headers sent by server
* config - the original request configuration
* request - the request object

Simple example:
Cat get.js

const ax = require('axios')

ax.get('http://ynet.co.il').then(resp => {
    console.log('get response:',resp.data);
});

async function aget() {
    const resp = await ax.get('http://ynet.co.il');
    console.log('async/await got response:',resp.data);
}

aget();


Axios basic API
The get(), post(), or delete() methods are convenience methods for the basic axios API: axios(config) and axios(url, config).
basic_api.js
const axios = require('axios');

async function makeRequest() {

    const config = {
        method: 'get',
        url: 'http://webcode.me'
    }

    let res = await axios(config)

    console.log(res.status);
}

makeRequest();
The example creates a GET request to webcode.me.
const config = {
    method: 'get',
    url: 'http://webcode.me'
}
We specify the details of the request in the configuration object.

id=__axiosSet_max_response_size__
```

## 14.2 Set max response size

```text
$ cat !$
cat get_setmaxsize.js
const ax = require('axios')
const http = require('http');
const fs = require('fs');
const path = require('path');
const file='aa'
bigfileurl20mb='http://ipv4.download.thinkbroadband.com:8080/20MB.zip'
bigfileurl80mb='http://ipv4.download.thinkbroadband.com:8080/50MB.zip';
bigfileurl200mb='http://ipv4.download.thinkbroadband.com:8080/200MB.zip';
bigfilehost='ipv4.download.thinkbroadband.com';
// const maxsize = 2048;
const maxsize = 25*1024*1024;

url = 'http://localhost'+'/'+file;
// const url = 'http://localhost';

function getMaxSizeLim(url) {
    console.log('axios url', url);
    const config = {
        method: 'get',
        url: url,
        maxContentLength: maxsize, // response
        // maxBodyLength: maxsize, // request
        headers: {
            'User-Agent': 'Yosi Console',
            'maxContentLength': maxsize,
        }
    };
    ax(config).then(resp => {
        console.log(url+'download finished');
    })
    .catch (err => {
        console.log(url+'got error'+ err.message);
    });
}


function getMaxSizeLimAsStream(url) {
    console.log('axios url response as stream', url);
    const config = {
        method: 'get',
        url: url,
        // port: 8080,
        maxContentLength: maxsize, // response
        maxBodyLength: maxsize, // request
        responseType: 'stream',
        headers: {
            'User-Agent': 'Yosi Console',
            'maxContentLength': maxsize,
        }
    };
    ax(config).then(resp => {
        const fname = path.basename(url)
        resp.data.pipe(fs.createWriteStream(fname));
    })
        .catch (err => {
            console.log('HTTP get error', err.message);
        });
}

function getUsingRequests(url) {

    console.log('request url', url);
        const fname = path.basename(url)
    const opts = {
        method: 'GET',
        url: url,
        encoding: null,
        // hostname: bigfilehost,
        // path: path.basename(url),
    };
    const req = http.request(opts, resp => {
        console.log('get response status', resp.statusCode);
        console.log('get response length', resp.headers['content-length']);
        const file = fs.createWriteStream(fname);
        let size = 0;
        resp.on('data', data => {
            size+=data.length;
            if (size > maxsize) {
                console.log(`size ${size} exceeds limit ${maxsize}`);
                resp.abort(); //aborting response closes the stream
                fs.unlink(fname);
            }

        }).pipe(file);
        file.on('finish', () => {
            console.log('finished writing file');
            file.close();
        })
        // let data='';
        // resp.on('data', chunk => {
        //     data += chunk;
        // });
    });

    req.on('end', ()  => {
        console.log('end getting data. total length', data.length);
    });
    req.on('error', err  => {
        console.log('got error', err);
    });

    // req.write(data);
       req.end();

}

getMaxSizeLim(bigfileurl20mb);
getMaxSizeLim(bigfileurl80mb);
getMaxSizeLim(bigfileurl200mb);

// takes a long time so commented out
// getMaxSizeLimAsStream(bigfileurl20mb);
// getMaxSizeLimAsStream(bigfileurl80mb);
// getMaxSizeLimAsStream(bigfileurl200mb);
$ node get_setmaxsize.js 
axios url http://ipv4.download.thinkbroadband.com:8080/20MB.zip
axios url http://ipv4.download.thinkbroadband.com:8080/50MB.zip
axios url http://ipv4.download.thinkbroadband.com:8080/200MB.zip
http://ipv4.download.thinkbroadband.com:8080/200MB.zipgot errormaxContentLength size of 26214400 exceeded
http://ipv4.download.thinkbroadband.com:8080/50MB.zipgot errormaxContentLength size of 26214400 exceeded
http://ipv4.download.thinkbroadband.com:8080/20MB.zipdownload finished
```

## 14.3 axios response headers

### 14.3.1 simple example

```text
const axios = require('axios');

async function makeGetRequest() {

  let res = await axios.get('http://webcode.me');

  let data = res.data;
  let headers = res.headers;

  console.log(typeof headers);
  console.log(headers);
}

makeGetRequest();

run on repl:
> async function makeGetRequest() {
... 
...   let res = await axios.get('http://webcode.me');
... 
...   let data = res.data;
...   let headers = res.headers;
...   console.log(headers);
... }
undefined
> 
> makeGetRequest();
Promise { <pending> }
> {
  server: 'nginx/1.6.2',
  date: 'Wed, 31 Mar 2021 15:07:00 GMT',
  'content-type': 'text/html',
  'content-length': '348',
  'last-modified': 'Sat, 20 Jul 2019 11:49:25 GMT',
  connection: 'close',
  etag: '"5d32ffc5-15c"',
  'access-control-allow-origin': '*',
  'accept-ranges': 'bytes'
}

    14.4
```
