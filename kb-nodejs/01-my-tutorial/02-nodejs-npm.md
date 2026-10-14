---
type: reference
title: Nodejs NPM
description: Subsection 1.2 of my Tutorial.
tags: [kb-nodejs, node, npm, package-json, list, dependencies, dependency, tree, show, outdated, latest, version, leading, modules, and, packages, express, framework, tutorial, lodash, multer, upload, nodejs, unzipper, module, description, use, cases, code, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.2"
---

# 1.2 Nodejs NPM

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

### 1.2.1 basics

```text
Installing Modules using NPM
There is a simple syntax to install any Node.js module −
$ npm install <Module Name>
For example, following is the command to install a famous Node.js web framework module called express −
$ npm install express
Now you can use this module in your js file as following −
var express = require('express');

$ sudo npm install express
Password:
npm WARN saveError ENOENT: no such file or directory, open '/Users/<user>/Desktop/work/code/nodejs/tutorial/package.json'
npm WARN enoent ENOENT: no such file or directory, open '/Users/<user>/Desktop/work/code/nodejs/tutorial/package.json'
npm WARN tutorial No description
npm WARN tutorial No repository field.
npm WARN tutorial No README data
npm WARN tutorial No license field.

+ express@4.16.4
updated 1 package and audited 273 packages in 1.809s
found 0 vulnerabilities


List locally installed modules

$ npm ls
/Users/<user>/Desktop/work/code/nodejs/tutorial
└─┬ express@4.16.4
  ├─┬ accepts@1.3.5
  │ ├─┬ mime-types@2.1.20
  │ │ └── mime-db@1.36.0
  │ └── negotiator@0.6.1
  ├── array-flatten@1.1.1
  ├─┬ body-parser@1.18.3
  │ ├── bytes@3.0.0
…
$ ls ./node_modules/
accepts/		cookie-signature/	etag/			inherits/		mime-types/		qs/			setprototypeof/
array-flatten/		debug/			express/		ipaddr.js/		ms/			range-parser/		statuses/
body-parser/		depd/			finalhandler/		media-typer/		negotiator/		raw-body/		type-is/
bytes/			destroy/		forwarded/		merge-descriptors/	on-finished/		safe-buffer/		unpipe/
content-disposition/	ee-first/		fresh/			methods/		parseurl/		safer-buffer/		utils-merge/
content-type/		encodeurl/		http-errors/		mime/			path-to-regexp/		send/			vary/
cookie/			escape-html/		iconv-lite/		mime-db/


List globally installed modules

$ npm ls -g
…
$ ls /usr/local/lib/node_modules/
express/	grunt-cli/	npm/


nodejs package.json

Module structure file

ex.
$ ls /usr/local/lib/node_modules/express/package.json 
/usr/local/lib/node_modules/express/package.json$ ls /usr/local/lib/node_modules/express/package.json 
/usr/local/lib/node_modules/express/package.json

cat /usr/local/lib/node_modules/express/package.json 
{
  "_from": "express",
  "_id": "express@4.16.4",
  "_inBundle": false,
  "_integrity": "sha512-j12Uuyb4FMrd/qQAm6uCHAkPtO8FDTRJZBDd5D2KOL2eLaz1yUNdUB/NOIyq0iU4q4cFarsUCrnFDPBcnksuOg==",
  "_location": "/express",
  "_phantomChildren": {},
  "_requested": {
    "type": "tag",
    "registry": true,
    "raw": "express",
    "name": "express",
    "escapedName": "express",
    "rawSpec": "",
    "saveSpec": null,
    "fetchSpec": "latest"
  },
  "_requiredBy": [
    "#USER"
  ],
  "_resolved": "https://registry.npmjs.org/express/-/express-4.16.4.tgz",
  "_shasum": "fddef61926109e24c515ea97fd2f1bdbf62df12e",
  "_spec": "express",
  "_where": "/Users/<user>/Desktop/work/code/nodejs/tutorial",
  "author": {
    "name": "TJ Holowaychuk",
    "email": "tj@vision-media.ca"
  },
…

Attributes of Package.json
* name − name of the package
* version − version of the package
* description − description of the package
* homepage − homepage of the package
* author − author of the package
* contributors − name of the contributors to the package
* dependencies − list of dependencies. NPM automatically installs all the dependencies mentioned here in the node_module folder of the package.
* repository − repository type and URL of the package
* main − entry point of the package
* keywords − keywords



Uninstalling a Module
Use the following command to uninstall a Node.js module.
$ npm uninstall express
Once NPM uninstalls the package, you can verify it by looking at the content of /node_modules/ directory or type the following command −
$ npm ls
Updating a Module
Update package.json and change the version of the dependency to be updated and run the following command.
$ npm update express
Search a Module
Search a package name using NPM.
$ npm search express

Create a Module
Creating a module requires package.json to be generated. Let's generate package.json using NPM, which will generate the basic skeleton of the package.json.
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See 'npm help json' for definitive documentation on these fields
and exactly what they do.

Use 'npm install <pkg> --save' afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (webmaster)
You will need to provide all the required information about your module. You can take help from the above-mentioned package.json file to understand the meanings of various information demanded. Once package.json is generated, use the following command to register yourself with NPM repository site using a valid email address.
$ npm adduser
Username: mcmohd
Password:
Email: (this IS public) mcmohd@gmail.com
It is time now to publish your module −
$ npm publish
If everything is fine with your module, then it will be published in the repository and will be accessible to install using NPM like any other Node.js module.
```

### 1.2.2 my npm examples

```text
  cat node_modules/valid-filename/index.js 
  cd node_modules/
  cd node_modules/valid-filename/
  cdnode 
  node
  node  helloWorld.js 
  node client.js 
  node helloWorld.js 
  node helloWorldTests.js 
  node promiseDemo.js 
  node regex.js 
  node sinonDemo.js 
  node uuidDemo.js 
  npm install --save valid-filename
  npm install --save-dev eslint
  npm install --save-dev filename-regex
  npm install --save-dev grunt-eslint
  npm install --save-dev grunt-mocha-test
  npm install --save-dev grunt-simple-nyc
  npm install --save-dev load-grunt-tasks
  npm install --save-dev mocha-test
  npm install --save-dev simple-nyc
  npm install --save-dev sinon
  npm install --save-dev uuid
  npm install --save-dev uuid-validate
  npm install --save-dev uuid-validator
  npm install -g grunt-cli
  npm install -g mocha
  npm install chai --save
  npm install grunt --save-dev
  npm install mocha --save
  npm test
  sudo npm install -g grunt-cli
  sudo npm install -g mocha
  vi node_modules/filename-regex/index.js 
```

#### 1.2.2.1 install specific version , ^ - semantic range operator

```text
https://60devs.com/npm-install-specific-version.html

NPM: How to Install Specific Version of a Module

 
Newcomers to Node and NPM often ask how to install a specific version of a certain NPM package. There are several ways to accomplish this. First, let’s start with the basic NPM CLI syntax:

npm install lodash
This command installs lodash in the current folder and fetches the latest available version.

If you know the exact version of the package, you can append it to the package name after the @ character:

npm install lodash@4.17.4
You can look up the latest version for any NPM package at npmjs.com.

If you don’t know the exact version of the package, NPM allows using semantic ranges to define the version. For example,

npm install lodash@^4.0.0
This command will install the latest 4.x.x version. You can learn more about the syntax of semantic versioning at docs.npmjs.com.

Both aforementioned examples don’t modify package.json and don’t add installed modules to the list of dependencies. Use --save to add the installed module to the package.json’s dependencies and --save-dev to add it to devDependencies. If you install a module without defining a specific version (i.e. without any version or using a semantic range), NPM will add the semantic range to the package.json as is. To prevent this, use --save-exact flag in addition to --save or --save-dev. This flag will force NPM to store the exact module version in the package.json.

Examples
npm install lodash --save --save-exact - installs the latest version and saves the exact version in the dependencies in the package.json.
npm install lodash --save-dev --save-exact - installs the latest version and saves the exact version in the devDependencies map in the package.json.
npm install lodash --save - installs the latest version and saves the semantic range in the dependencies in the package.json. E.g. "lodash": "^4.17.4".

            1.2.2.2
```

### 1.2.3 list dependencies, dependency tree, tags: node, npm, package.json, list dependencies, dependency tree, show outdated, latest, version

```text
npm list
npm ls -all
```

### 1.2.4 update dependencies , packages, upgrade, update, up to date packages

#### 1.2.4.1 https://docs.npmjs.com/updating-packages-downloaded-from-the-registry

```text
$ cd /myproject
$ npm update
$ npm outdated

for global packages
npm install npm@latest -g 
npm outdated -g --depth=0

then either update one by one: npm update -g <package_name>
or all at once: npm update -g 

            1.2.4.2
```

### 1.2.5 top node modules, tags: leading npm modules and packages

#### 1.2.5.1 express framework , tags:express framework

#### 1.2.5.1.1 blog https://appdividend.com/2022/03/05/node-js-express-tutorial-for-beginners/, tags: express tutorial

```text
root dir: /Users/<user>/work/code/nodejs/tutorial/express
```

#### 1.2.5.1.1.1 first steps

```text
a. create expressdemo dir and run npm init
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (expressdemo) 
version: (1.0.0) 
description: express demo
entry point: (index.js) 
test command: test
git repository: 
keywords: 
author: yosi izaq
license: (ISC) 
About to write to /Users/<user>/work/code/nodejs/tutorial/express/expressdemo/package.json:

{
  "name": "expressdemo",
  "version": "1.0.0",
  "description": "express demo",
  "main": "index.js",
  "scripts": {
    "test": "test"
  },
  "author": "yosi izaq",
  "license": "ISC"
}


Is this OK? (yes) y

b. install Express 
$ npm i express --save

c.  Create a server.js file in the root.
Create our Node.js server through the following code.

// server.js

const express = require('express');
const app = express();
const port = 3000;
app.listen(port, function(){
  console.log('Node js Express js Tutorial');
});
We use the require() function to include the “express module.”

Before we can start using the express module, we need to make an object.

Here we are creating a callback function. This function will be called whenever anybody browses to the root of our web application which is http://localhost:3000.

The callback function will send the string ‘Node js Express js Tutorial’ to the web page.

In the callback function, we log the string ‘Node js Express js Tutorial’ back to the client.

We then use the listen to function to make our server application listen to client requests on port no 3000. You can specify any available port over here.

my example:
$ cat !$
cat server.js
const express = require('express');
const app = express();
const port=3030;
app.listen(port, () => {
    console.log('Welcome to express demo');
});

d. nodemon
If we do not want to restart the server manually, we can use a node package called nodemon. It resets the server every time we change the file.

npm install nodemon --save-dev
Change the package.json file and add the following line in the “scripts” object.

"scripts": {
    "start": "nodemon server.js"
},
When you type in terminal “npm start,” it will bootstrap the server, and when we change the files, it will automatically restart.
```

#### 1.2.5.1.1.2 ejs templating engine

```text
what is a templating engine. see: https://appdividend.com/2018/11/24/how-to-use-template-engines-with-express/
e.  Install the EJS templating engine.
To include the CSS and js files in the express, first, we will create a static directory called the public, and in that, we will put our CSS and JS files.
$ mkdir public
$ ls
node_modules/		package-lock.json	package.json		public/			server.js

add to // server.js

app.use(express.static('public'));
We will use “ejs” as a templating engine, so first, we need to download that through NPM.

// server.js

npm install --save ejs
Now we need to update our server.js file to set the view engine.

// server.js

app.set('view engine', 'ejs');
We need to create one folder inside our root called views. Then, in that folder, make one file called index.ejs.

<!-- index.ejs -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <div class="jumbotron">
        Node js Express js Tutorial
      </div>
    </div>
  </body>
</html>

$ mkdir views
$ cd !$
cd views
$ ed index.ejs
index.js: No such file or directory
a
<!-- index.ejs -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <div class="jumbotron">
        Node js Express js Tutorial
      </div>
    </div>
  </body>
</html>

.
w
323
q

f. To display this route, we need to add the following code to the server.js file.
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});
Our index.html file inside the public folder looks like this.

<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=He, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Node js tutorial</title>
</head>
<body>
   Node js tutorial
</body>
</html>

open browser at http://localhost:3030/
```

#### 1.2.5.1.1.3 handle routes

```text
Before we deep dive into routes, let’s understand the basics of routes in the Express web framework.

What are Routes
Routing determines how an application responds to a client request to a particular endpoint.

For example, a client can make a GET, POST, PUT or DELETE http request for various URLs such as the ones shown below;

http://localhost:3000/coins
http://localhost:3000/coins/post
In the above example,

If a GET request is made for the first URL, the response should ideally be a list of coins.
If the POST request is made for the second URL, we will save the data.
So based on the URL which is accessed, a different functionality on the web server will be invoked, and accordingly, the response will be sent to the client. This is the concept of routing.
Each route can have one or more handler functions executed when the route is matched.

Set up the routes for our application. So use the Router module provided by Express js. First, create a folder inside root called routes. Then, in that folder, make one file called CoinRouter.js.

const express = require('express');
const app = express();
const CoinRouter = express.Router();

CoinRouter.route('/').get(function (req, res) {
  res.render('index');
});
module.exports = CoinRouter;

here's mine:
$ cat routes/CoinRouter.js 
const express = require('express');
const app = express();
const CoinRouter = express.Router();

CoinRouter.route('/').get( (req, res) => {
    res.render('index');
});
module.exports = CoinRouter;

now wire it to server.js 
// server.js

const CoinRouter = require('./routes/CoinRouter');

app.use('/coins', CoinRouter);
Please switch to the browser URL: http://localhost:3000/coins/. It will display an index view.

The next step will be to create a bootstrap interface to add the coin name and price.

(I used port 3030, so http://localhost:3030/coins/)
```

#### 1.2.5.1.1.4 Create a form for adding coins

```text
In the views, the folder makes one file called to create.ejs file.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine generated coins form </title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
        <h1>Add Coin</h1>
        <form method="post" action="/coins/post">
          <div class="form-group">
            <label for="item">Coin Name</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="item">Coin Price</label>
            <input type="text" class="form-control" id="price" name="price">
          </div>
          <button type="submit" class="btn btn-default">Submit Coin</button>
        </form>
    </div>
  </body>
</html>

The next step is to create a route in the CoinRouter.js file, so put the following code.

// CoinRouter.js

CoinRouter.route('/create').get(function (req, res) {
   res.render('create');
 });

Navigate to form, http://localhost:3030/coins/create
```

#### 1.2.5.1.1.5 Install Mongoose Library.

```text
First get mongo container running. See: <url:/Users/<user>/work/KB/containers_kb#r=run_MongoDB_with_docker_>
verify mongo running:
$ docker ps -a | grep mongo
44fc8960722e   mongo:latest   "docker-entrypoint.s…"   2 days ago     Up 2 days                 0.0.0.0:27017->27017/tcp   test-mongo

We will use MongoDB for the database, so we set up a MongoDB database, so we need to download a package called Mongoose in our project.

npm install --save mongoose
Now, configure the database for our Node js application.

// server.js

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // only required for mongoose ver < 5. see https://stackoverflow.com/questions/51862570/mongoose-why-we-make-mongoose-promise-global-promise-when-setting-a-mongoo
mongoose.connect('mongodb://localhost/expressdemo');
```

#### 1.2.5.1.1.6 Install the body-parser module.

```text
We are sending the form data to the Node js server, so we need to install the body-parser module to parse our posted data and insert that data into the MongoDB database.

npm install --save body-parser
Now, include this module in our server.js file.
// server.js

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
```

#### 1.2.5.1.1.7 create a model

```text
Next is to create a model for our database. So create one folder in the root called models. In that folder, create one file called Coin.model.js.

// Coin.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Coin = new Schema({
  name: {
    type: String
  },
  price: {
     type: Number
  }
},{
    collection: 'coins'
});

module.exports = mongoose.model('Coin', Coin);
```

#### 1.2.5.1.1.8 add coin post route

```text
Now, create a  post route in the CoinRouter.js put the following code.

// CoinRouter.js

const Coin = require('../models/Coin.model');

CoinRouter.route('/post').post(function (req, res) {
   const coin = new Coin(req.body);
   console.log(coin);
   coin.save()
     .then(coin => {
     res.redirect('/coins');
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
Each route can have one or more handler functions executed when the route is matched.

The general syntax for a route is shown below.

app.METHOD(PATH, HANDLER)
Wherein,

1) app is an instance of the express module

2) METHOD is an HTTP request method (GET, POST, PUT or DELETE)

3) PATH is a path on the server.

4) HANDLER is the function executed when the route is matched.
```

#### 1.2.5.1.1.9 server.js

```text
Our server.js file looks like this.

// server.js

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/expressdemo');

const CoinRouter = require('./routes/CoinRouter');

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/coins', CoinRouter);

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port);
});
Here we define a route if the URL http://localhost:3000/coins is selected in the browser. In addition, we are attaching a callback function to the route that will be called when we browse to the coins listing URL.

When the URL contains /coins URI, it will execute CoinRouter, which includes many subroutes for Get, Post, Patch, and Delete requests.

Try to submit the Coin, and yes, it will successfully add to the MongoDB database.
```

#### 1.2.5.1.1.10 display coins list

```text
We need to get the data from the database, so you need to put the following code in the CoinRouter.js file.

// CoinRouter.js

CoinRouter.route('/').get(function (req, res) {
   Coin.find(function (err, coins){
      if(err){
        console.log(err);
      }
      else {
        res.render('index', {coins: coins});
      }
    });
});

Also, we need to modify that index.ejs view to show the data.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Node js Express Tutorial. EJS generated index for coins example </title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <td><b>Coin Name</b></td>
            <td><b>Coin Price</b></td>
            <td colspan="2"><b>Action</b></td>
          </tr>
        </thead>
        <tbody>
          <% for(var i=0; i < coins.length; i++) { %>
          <tr>
            <td><%= coins[i].name %></td>
            <td><%= coins[i].price %></td>
            <td><a href="" class="btn btn-primary">Edit</a></td>
            <td><a href="" class="btn btn-danger">Delete</a></td>
          </tr>
          <% } %>
        </tbody>
      </table>
    </div>
  </body>
</html>
```

#### 1.2.5.1.1.11 Make edit view and route.

```text
In the views folder, make one called edit.ejs. Also, we need to pass the data from the database by its id.
In MongoDB, the primary key is _id. So we need to fetch the collection of data by its id. So write the following code into the CoinRouter.js file.

// CoinRouter.js

CoinRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   Coin.findById(id, function (err, coin){
       res.render('edit', {coin: coin});
   });
 });

Create an edit.ejs file in the views directory.

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Edit Coin</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
        <h1>Edit Coin</h1>
        <form method="post" action="/coins/update/<%= coin._id %>">
          <div class="form-group">
            <label for="item">Coin Name</label>
            <input type="text" class="form-control" id="name" name="name" value="<%= coin.name %>">
          </div>
          <div class="form-group">
            <label for="item">Coin Price</label>
            <input type="text" class="form-control" id="price" name="price" value="<%= coin.price %>">
          </div>
          <button type="submit" class="btn btn-default">Update</button>
        </form>
    </div>
  </body>
</html>

Now, code the update function to update the values in the database.
```

#### 1.2.5.1.1.12 Delete the data.

```text
Now, delete functionality remains, which we will do and call it a day.

// CoinRouter.js

CoinRouter.route('/delete/:id').get(function (req, res) {
  Coin.findByIdAndRemove({_id: req.params.id},
       function(err, coin){
        if(err) res.json(err);
        else res.redirect('/coins');
    });
});
```

#### 1.2.5.1.1.13 Full code

```text
$ ls
models/			node_modules/		package-lock.json	package.json		public/			routes/			server.js		views/
```

#### 1.2.5.1.1.13.1 root level

```text
$ cat package.json 
{
  "name": "expressdemo",
  "version": "1.0.0",
  "description": "express demo",
  "main": "index.js",
  "scripts": {
    "start": "nodemon server.js",
    "test": "test"
  },
  "author": "yosi izaq",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.20.0",
    "ejs": "^3.1.8",
    "express": "^4.18.1",
    "mongoose": "^6.5.2"
  },
  "devDependencies": {
    "nodemon": "^2.0.19"
  }
}
$ cat server.js 
const express = require('express');
const app = express();
const CoinRouter = require('./routes/CoinRouter.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const port=3030;
mongoose.connect('mongodb://localhost/expressdemo');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.use('/coins', CoinRouter);

app.listen(port, () => {
    console.log('Welcome to express demo');
});
```

#### 1.2.5.1.1.13.2 models

```text
$ ls models/
Coin.model.js
$ cat models/Coin.model.js 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoinSchema = new Schema({
    name: {type: String},
    price: {type: Number}
},
    {collection: 'coins'}
);

module.exports = mongoose.model('Coin', CoinSchema);
```

#### 1.2.5.1.1.13.3 static

```text
$ ls public/
index.html
$ cat public/index.html 
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=He, initial-scale=1.0">
   <meta http-equiv="X-UA-Compatible" content="ie=edge">
   <title>Node js tutorial</title>
</head>
<body>
   Node js tutorial
</body>
</html>
```

#### 1.2.5.1.1.13.4 routes

```text
$ ls routes/
CoinRouter.js
$ cat routes/CoinRouter.js 
const Coin = require('../models/Coin.model');
const express = require('express');
// const app = express();
const CoinRouter = express.Router();

CoinRouter.route('/create').get( (req, res) => {
    res.render('create');
});

CoinRouter.route('/').get( (req, res) => {
    // 1st step return index.html
    // res.render('index');

    // 2nd step, after mongo and model are ready return coins list 
    Coin.find(  (errs, coins) => {
        if (errs) {
            console.log(`error producing coins list: ${errs}`);
        }
        else {
        }
        res.render('index', {coins: coins}); //note, that index.ejs will display the coins
    }
    );
});

CoinRouter.route('/edit/:id').get( (req, res) => {
    const id = req.params.id; // extract query (path) param id.
    Coin.findById(id, (err, coin) => {
        res.render('edit', {coin: coin});
    });
});

CoinRouter.route('/').post( (req, res) => {
    Coin.find( (err, coins) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {coins: coins});
        }
    }
    );
});

CoinRouter.route('/post').post( (req, res) => {
    console.log('/post got body ', JSON.stringify(req.body, null, 4));
    const coin = new Coin(req.body);
    console.log('/post got coin ', JSON.stringify(coin, null, 4));
    coin.save().then( coin => {
        res.redirect('/coins');
    }).catch( err => {
        const msg = `Failed to save coin to DB due to error: ${err}`
        res.status(400).send(msg);
    });
});

CoinRouter.route('/update/:id').post( (req, res) => {
    console.log('Trying to update coin with id', req.params.id);
    Coin.findById(req.params.id, (err, coin) => {
        if (!coin) {
            // return next(new Error('Failed to find coin for update'));
            res.status(403).send('Failed to find coin for update');
        }
        else {
            coin.name = req.body.name;
            coin.price = req.body.price;
            coin.save().then( coin => {
                res.redirect('/coins');
            }).catch( err => {
                res.status(400).send(`Failed to update DB for coin ${coin.name}`);
            });;
        }

    });
});

CoinRouter.route('/delete/:id').get(function (req, res) {
  Coin.findByIdAndRemove({_id: req.params.id},
       function(err, coin){
        if(err) res.json(err);
        else res.redirect('/coins');
    });
});

module.exports = CoinRouter;
```

#### 1.2.5.1.1.13.5 views

```text
$ for f in $(ls views/); do echo "$f"; cat "views/$f"; done
create.ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>EJS Engine generated coins form </title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
        <h1>Add Coin</h1>
        <form method="post" action="/coins/post">
          <div class="form-group">
            <label for="item">Coin Name</label>
            <input type="text" class="form-control" id="name" name="name">
          </div>
          <div class="form-group">
            <label for="item">Coin Price</label>
            <input type="text" class="form-control" id="price" name="price">
          </div>
          <button type="submit" class="btn btn-default">Submit Coin</button>
        </form>
    </div>
  </body>
</html>

edit.ejs
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Edit Coin</title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
        <h1>Edit Coin</h1>
        <form method="post" action="/coins/update/<%= coin._id %>">
          <div class="form-group">
            <label for="item">Coin Name</label>
            <input type="text" class="form-control" id="name" name="name" value="<%= coin.name %>">
          </div>
          <div class="form-group">
            <label for="item">Coin Price</label>
            <input type="text" class="form-control" id="price" name="price" value="<%= coin.price %>">
          </div>
          <button type="submit" class="btn btn-default">Update</button>
        </form>
    </div>
  </body>
</html>

index.ejs
<!-- index.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Node js Express Tutorial. EJS generated index for coins example </title>
    <link rel="stylesheet" href="/css/bootstrap.min.css">
  </head>
  <body>
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <td><b>Coin Name</b></td>
            <td><b>Coin Price</b></td>
            <td colspan="2"><b>Action</b></td>
          </tr>
        </thead>
        <tbody>
          <% for(var i=0; i < coins.length; i++) { %>
          <tr>
            <td><%= coins[i].name %></td>
            <td><%= coins[i].price %></td>
            <td><a href="coins/edit/<%= coins[i]._id %>" class="btn btn-primary">Edit</a></td>
            <td><a href="coins/delete/<%= coins[i]._id %>" class="btn btn-danger">Delete</a></td>
          </tr>
          <% } %>
        </tbody>
      </table>
    </div>
  </body>
</html>
```

#### 1.2.5.1.1.14 Run instructions

```text
a. mongo Container should be running:
e.g.
$ docker ps -a
CONTAINER ID   IMAGE          COMMAND                  CREATED        STATUS          PORTS                      NAMES
44fc8960722e   mongo:latest   "docker-entrypoint.s…"   12 days ago    Up 55 minutes   0.0.0.0:27017->27017/tcp   test-mongo

b. start web server
$cd /Users/<user>/work/code/nodejs/tutorial/express/expressdemo
$ npm run start

> expressdemo@1.0.0 start
> nodemon server.js

[nodemon] 2.0.19
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node server.js`
Welcome to express demo

c. browse to root http://localhost:3030/coins
cmd+alt+i for dev Tools

d. create a few coins 
http://localhost:3030/coins/create
use the form the create a few coins 

ex: 
Welcome to express demo
/post got body  {
    "name": "bitcoin",
    "price": "100"
}
/post got coin  {
    "name": "bitcoin",
    "price": 100,
    "_id": "6314c28eac5ecec51ada56bb"
}

e. delete coins by clicking delete 

f. update coins by clicking update 
Trying to update coin with id 6314c28eac5ecec51ada56bb

                    1.2.5.1.1.15
                1.2.5.1.2 


                1.2.5.1.3

            1.2.5.2
<url:#r=__express__>
```

#### 1.2.5.2 koa.js framework

```text
Koa works wonders creating different web services, aka APIs. With Koa, building these APIs becomes super fun and easy since it can efficiently deal with HTTP middleware with a stack-like method.

Further, it normalizes Node flaws constructively. You can maintain various forms of the content represented to the users with the same URL like translating a page, personalizing content in eCommerce websites, having different formats for images, and much more with this framework. 

Another perk of using Koa is that it’s quite similar to Express. You can still enjoy the flexibility of Express with more freedom and fewer complexities while writing code. This minimizes the scope of errors across the entire stack of the application. 

Features:

Is a Customizable & Futuristic framework- is referred to as a lightweight version of Express
Handles errors exceptionally 
Has cascading middleware (Personalizing user experience)
Normalises node inconsistencies clean and helps in maintaining code 
Cleans cache, supports proxy and content negotiation
Has more options for Customisation; allows building apps from scratch
When to use Koa.js 

When performance is a critical demand from your web application, Koa is what you need. Especially for a big project, the framework can build extensive apps with large and experienced development teams. Under certain circumstances, Koa has proven to be a faster framework than Express.

However, it may seem to be a difficult choice for beginners because it’s still in the growth stages with the community and is less popular as a result. 
```

#### 1.2.5.3 meteor framework

```text
If you are looking for a framework that is specific to Javascript and uses only one language, Meteor.js is the ideal pick.  

Officially launched in 2012, startup software, Meteor, developed Meteor.js — an open-source, isomorphic, Javascript web framework. It propagates automatic data changes to clients without developer’s efforts. Most importantly, it’s comfortable with variants of device-operating systems including Android, iOS for mobile devices and desktop applications all wrapped in one language- Javascript. 

Meteor has comprehensive libraries and testing features to keep up with the client-server communication. The framework is known for its smooth running of data between client and server, which most applications of high-streaming, real-time functionalities require. 

Meteor is a perfect Node.js framework to build simple, efficient, and modern web applications. 

Features:

Writing of code in modern JavaScript, Isomorphic framework
Cross-platform framework, building rapid prototyping with CLI
Extensive community support, open-source framework 
Full-stack solution 
Superfast interactions – fast results 
Easy integration with other frameworks
When to use Meteor.js

If your development team is good to go with Javascript, Meteor.js is a splendid choice. It is very easy to learn and super fun to program in. You can use it to build apps in no time since the framework allows you to use the same code written for a web app or mobile app. With Meteor, you can also deploy live updates even on the installed apps without disrupting an on-going user session. 

Also, did I mention? The framework builds real-time applications with its built-in core. Without a doubt, it’s a perfect solution for collaboration with real-time app projects, short deadlines, and cross-platform
```

#### 1.2.5.4 socket.io for chat apps

```text
Socket.io is a Javascript library used in building real-time apps and establishing bidirectional communication between web clients and servers. With this library framework, you can develop applications with requirements for websocket development. For example, chat applications like Whatsapp continuously run for live updates and refresh the background process for updates or messages. It also offers real-time analytics in fewer lines of code.

More than a thousand companies, including Bepro, Barogo, and Patreon, use Socket.io.

Features:

Binary support (with a client-side library and a server-side library)
Multiplexing support
Reliability
Auto-reconnection support
Error detection & auto-correction
Similar APIs for a client and server-side development
When to use Socket.io

Socket.io develops real-time applications like chat room applications, video conferencing apps, multiplayer games, and others, where servers are required to push the data without being requested from the client side. For example, live video calling apps like Zoom need to communicate real-time bidirectional data to several participants and Socket could come in handy with similar apps.
```

#### 1.2.5.5 nestjs

```text
see <url:/Users/<user>/work/KB/nestjs_kb>
```

#### 1.2.5.6 fastify

#### 1.2.5.7 lodash , tags: lodash

```text
Lodash is a popular utility library for JavaScript that provides a wide range of functions for working with arrays, objects, strings, and other types of data. Here are some useful Lodash functions that you might find helpful:

_.map(): Returns a new array with the results of calling a function on each element in the original array.
const arr = [1, 2, 3];
const doubled = _.map(arr, n => n * 2);
console.log(doubled); // [2, 4, 6]

_.filter(): Returns a new array with all elements from the original array that pass a test function.
const arr = [1, 2, 3];
const even = _.filter(arr, n => n % 2 === 0);
console.log(even); // [2]

_.reduce(): Reduces an array to a single value by calling a function on each element and accumulating the result.
const arr = [1, 2, 3];
const sum = _.reduce(arr, (acc, n) => acc + n, 0);
console.log(sum); // 6

_.groupBy(): Groups elements in an array by a given key.
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Alice' }
];
const byName = _.groupBy(arr, 'name');
console.log(byName);
/*
{
  Alice: [
    { id: 1, name: 'Alice' },
    { id: 4, name: 'Alice' }
  ],
  Bob: [
    { id: 2, name: 'Bob' }
  ],
  Charlie: [
    { id: 3, name: 'Charlie' }
  ]
}
*/

_.sortBy(): Returns a new array with the elements from the original array sorted by a given key.
const arr = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];
const byAge = _.sortBy(arr, 'age');
console.log(byAge);
/*
[
  { name: 'Alice', age: 25 },
  { name: 'Charlie', age: 30 },
  { name: 'Bob', age: 35 }
]
*/

_.isEqual(): Returns true if two values are deeply equal, meaning they have the same properties and values (for objects) or the same elements (for arrays).
const a = { x: [1, 2], y: 'hello' };
const b = { x: [1, 2], y: 'hello' };
console.log(_.isEqual(a, b)); // true
These are just a few examples of the many useful Lodash functions available. You can find more information and examples in the Lodash documentation.

_.cloneDeep(): Creates a deep copy of an object or array, including nested objects and arrays.
const obj = { a: { b: [1, 2] } };
const copy = _.cloneDeep(obj);
console.log(copy); // { a: { b: [1, 2] } }
console.log(copy === obj); // false
console.log(copy.a === obj.a); // false
console.log(copy.a.b === obj.a.b); // false

_.debounce(): Creates a debounced function that delays invoking a function until after a certain amount of time has elapsed since the last time it was called.
function saveChanges() {
  console.log('Changes saved!');
}

const debouncedSaveChanges = _.debounce(saveChanges, 1000);

debouncedSaveChanges();
debouncedSaveChanges();
debouncedSaveChanges();

// Only one "Changes saved!" message is logged, after one second has elapsed.

_.throttle(): Creates a throttled function that limits the rate at which a function can be called.
function logMessage() {
  console.log('Hello!');
}

const throttledLogMessage = _.throttle(logMessage, 1000);

setInterval(throttledLogMessage, 500);
// "Hello!" is logged every second, not every 500 milliseconds

_.chunk(): Creates an array of elements split into groups of a given size.
const arr = [1, 2, 3, 4, 5, 6];
const chunks = _.chunk(arr, 2);
console.log(chunks); // [[1, 2], [3, 4], [5, 6]]

_.zip(): Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements, and so on.
const a = [1, 2, 3];
const b = ['a', 'b', 'c'];
const zipped = _.zip(a, b);
console.log(zipped); // [[1, 'a'], [2, 'b'], [3, 'c']]

_.uniqBy(): Returns a new array with unique elements based on a given key.
const arr = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'Alice' }
];
const uniqueByName = _.uniqBy(arr, 'name');
console.log(uniqueByName); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
I hope these additional examples are helpful! Lodash provides many other useful functions as well, so it's worth exploring the documentation to see what else it can do.

_.omit(): Returns a new object with all properties of the original object except for the ones specified.
const obj = { a: 1, b: 2, c: 3 };
const withoutB = _.omit(obj, 'b');
console.log(withoutB); // { a: 1, c: 3 }

_.pick(): Returns a new object with only the properties of the original object specified.
const obj = { a: 1, b: 2, c: 3 };
const onlyBAndC = _.pick(obj, ['b', 'c']);
console.log(onlyBAndC); // { b: 2, c: 3 }

_.get(): Gets the value at the specified path in an object, or returns a default value if the path is not found.
const obj = { a: { b: { c: 1 } } };
console.log(_.get(obj, 'a.b.c')); // 1
console.log(_.get(obj, 'x.y.z', 'default')); // 'default'

_.set(): Sets the value at the specified path in an object.
const obj = { a: { b: { c: 1 } } };
_.set(obj, 'a.b.c', 2);
console.log(obj); // { a: { b: { c: 2 } } }

_.isEmpty(): Checks if a given value is empty (i.e. has no enumerable properties).
console.log(_.isEmpty({})); // true
console.log(_.isEmpty([])); // true
console.log(_.isEmpty('')); // true
console.log(_.isEmpty(null)); // true
console.log(_.isEmpty(undefined)); // true
console.log(_.isEmpty({ a: 1 })); // false
console.log(_.isEmpty([1])); // false
console.log(_.isEmpty('a')); // false
console.log(_.isEmpty(0)); // true (because 0 has no enumerable properties)

_.isEqual(): Compares two values to see if they are equivalent.
console.log(_.isEqual({ a: [1, 2] }, { a: [1, 2] })); // true
console.log(_.isEqual({ a: [1, 2] }, { a: [2, 1] })); // false
console.log(_.isEqual(1, '1')); // false

_.capitalize(): Capitalizes the first letter of a string.
console.log(_.capitalize('hello world')); // 'Hello world'
console.log(_.capitalize('42')); // '42'
console.log(_.capitalize('')); // ''

_.times(): Invokes a function a specified number of times, passing in the index of each iteration.
_.times(3, console.log);
// 0
// 1
// 2

const arr = _.times(3, n => n ** 2);
console.log(arr); // [0, 1, 4]
I hope these additional examples are helpful as well! Lodash is a very powerful library with many useful functions for manipulating data.P
```

#### 1.2.5.7.1 getting-started

```text
tutorial: https://www.tutorialspoint.com/lodash/lodash_environment.htm 
```

#### 1.2.5.7.2 unionWith

```text
$ cat unions.js 

const _ = require('lodash');

let arr1 = [ 1,2, [1,2]];
let arr2 = [ 1,3, 4];
let arr3 = _.union(arr1,arr2);
console.log('demo union of array ', arr1,' and array ', arr2, 'union: ', arr3);

let arrays = [ arr1, arr2, arr3];
let arr4 = _.unionWith(...arrays, (a,b) => {return a===b;});
console.log('demo union of array of arrays ', arrays, 'lodash union: ', arr4);
let arr5 = Array.from(new Set(...arrays));
let set1 = new Set(...arrays);
console.log('demo union of array of arrays ', arrays, 'Set from arrays: ', set1, ' ES6 union: ', arr5);
$ node unions.js 
node:internal/modules/cjs/loader:1093
  throw err;
  ^

Error: Cannot find module 'lodash'
$ npm i lodash
$ node unions.js 
demo union of array  [ 1, 2, [ 1, 2 ] ]  and array  [ 1, 3, 4 ] union:  [ 1, 2, [ 1, 2 ], 3, 4 ]
demo union of array of arrays  [ [ 1, 2, [ 1, 2 ] ], [ 1, 3, 4 ], [ 1, 2, [ 1, 2 ], 3, 4 ] ] lodash union:  [ 1, 2, [ 1, 2 ], 3, 4 ]
demo union of array of arrays  [ [ 1, 2, [ 1, 2 ] ], [ 1, 3, 4 ], [ 1, 2, [ 1, 2 ], 3, 4 ] ] Set from arrays:  Set(3) { 1, 2, [ 1, 2 ] }  ES6 union:  [ 1, 2, [ 1, 2 ] ]
```

#### 1.2.5.7.3 nested json paths

```text
                    1.2.5.7.3.1 is there a lodash utility function that returns a list of nested paths of JSON object 
Yes, Lodash has a utility function called _.toPath() that can be used to convert a string representation of a nested property path to an array of property names.

For example, given a JSON object like this:

const obj = {
  foo: {
    bar: {
      baz: 42
    }
  }
};

You can use _.toPath() to convert the string 'foo.bar.baz' to an array ['foo', 'bar', 'baz']:

const path = _.toPath('foo.bar.baz');
console.log(path); // ['foo', 'bar', 'baz']
To get a list of all possible nested paths of a JSON object, you can use a combination of Lodash's _.flatMapDeep() and _.toPath() functions.

Here's an example implementation:

const getAllNestedPaths = (obj, prefix = []) => {
  return _.flatMapDeep(obj, (value, key) => {
    const path = [...prefix, key];
    return _.isObject(value) ? getAllNestedPaths(value, path) : path;
  });
};

// Example usage:
const obj = {
  foo: {
    bar: {
      baz: 42
    },
    qux: [1, 2, 3]
  },
  fizz: 'buzz'
};

const paths = getAllNestedPaths(obj);
console.log(paths); // [['foo', 'bar', 'baz'], ['foo', 'qux'], ['fizz']]
The getAllNestedPaths() function takes a JSON object and an optional prefix array parameter (defaulted to an empty array), which is used to build up the path as we recursively traverse the object.

The function uses _.flatMapDeep() to iterate over each property of the object and return either an array of nested paths (if the property is an object), or a single path (if the property is not an object).

For object properties, we recursively call getAllNestedPaths() with the current property and the updated path, and flatten the resulting array using _.flatMapDeep(). For non-object properties, we simply return the current path.

Finally, we get a flat array of all nested paths by calling getAllNestedPaths() with the top-level object, and log the result to the console.

$ cat !$
cat get_all_nested_paths_simple.js
const _ = require('lodash');
const getAllNestedPaths = (obj, prefix = []) => {
  return _.flatMapDeep(obj, (value, key) => {
    const path = [...prefix, key];
    return _.isObject(value) ? getAllNestedPaths(value, path) : path;
  });
};

// Example usage:
const obj = {
  foo: {
    bar: {
      baz: 42
    },
    qux: [1, 2, 3]
  },
  fizz: 'buzz'
};

const paths = getAllNestedPaths(obj);
console.log("Getting all paths of", obj); 
console.log(paths); // [['foo', 'bar', 'baz'], ['foo', 'qux'], ['fizz']]

$ node get_all_nested_paths_simple.js
Getting all paths of { foo: { bar: { baz: 42 }, qux: [ 1, 2, 3 ] }, fizz: 'buzz' }
[
  'foo',  'bar', 'baz',
  'foo',  'qux', 0,
  'foo',  'qux', 1,
  'foo',  'qux', 2,
  'fizz'
]
```

#### 1.2.5.7.3.2 modify to get a nested list of key values of the paths

```text
To modify the previous implementation to get a nested list of key-value pairs for each path, we can simply modify the base case of the recursion to return an object with the current path and value, instead of just the path.

Here's the modified implementation:

const getAllNestedPaths = (obj, prefix = []) => {
  return _.flatMapDeep(obj, (value, key) => {
    const path = [...prefix, key];
    return _.isObject(value)
      ? getAllNestedPaths(value, path)
      : { path, value };
  });
};

// Example usage:
const obj = {
  foo: {
    bar: {
      baz: 42
    },
    qux: [1, 2, 3]
  },
  fizz: 'buzz'
};

const paths = getAllNestedPaths(obj);
console.log(paths);
The getAllNestedPaths() function is almost the same as before, but now we return an object with both the current path and value when we reach a non-object property.

We then use _.flatMapDeep() to recursively iterate over all properties, and return either a nested array of key-value pairs (if the property is an object), or a single key-value pair (if the property is not an object).

Finally, we get a flat array of all nested key-value pairs by calling getAllNestedPaths() with the top-level object, and log the result to the console.

This will output:

[
  { path: ['foo', 'bar', 'baz'], value: 42 },
  { path: ['foo', 'qux', '0'], value: 1 },
  { path: ['foo', 'qux', '1'], value: 2 },
  { path: ['foo', 'qux', '2'], value: 3 },
  { path: ['fizz'], value: 'buzz' }
]
As you can see, we now have a flat list of key-value pairs for each path in the original object.

$ cat !$
cat get_all_nested_paths_and_values.js
const _ = require('lodash');
const getAllNestedPaths = (obj, prefix = []) => {
  return _.flatMapDeep(obj, (value, key) => {
    const path = [...prefix, key];
    console.log(path);
    return _.isObject(value)
      ? getAllNestedPaths(value, path)
      : { path, value };
  });
};

// Example usage:
const obj = {
  foo: {
    bar: {
      baz: 42
    },
    qux: [1, 2, 3]
  },
  fizz: 'buzz'
};

const paths = getAllNestedPaths(obj);
console.log(paths);

$ node !$
node get_all_nested_paths_and_values.js
[ 'foo' ]
[ 'foo', 'bar' ]
[ 'foo', 'bar', 'baz' ]
[ 'foo', 'qux' ]
[ 'foo', 'qux', 0 ]
[ 'foo', 'qux', 1 ]
[ 'foo', 'qux', 2 ]
[ 'fizz' ]
[
  { path: [ 'foo', 'bar', 'baz' ], value: 42 },
  { path: [ 'foo', 'qux', 0 ], value: 1 },
  { path: [ 'foo', 'qux', 1 ], value: 2 },
  { path: [ 'foo', 'qux', 2 ], value: 3 },
  { path: [ 'fizz' ], value: 'buzz' }
]
                    1.2.5.7.3.3 modify to get path of specific property recurring in nested objects. say an id property
$ cat !$
cat get_all_nested_paths_and_values_for_property.js
const _ = require('lodash');
const getPathsForProperty = (obj, propName, prefix = []) => {
  return _.flatMapDeep(obj, (value, key) => {
    const path = [...prefix, key];
    if (_.isObject(value)) {
      return getPathsForProperty(value, propName, path);
    } else if (key === propName) {
      return {path, value};
    } else {
      return [];
    }
  });
};

// Example usage:
const obj = {
  foo: {
    id: 'fooId',
    bar: {
      id: 'barId',
      baz: {
        id: 'bazId'
      }
    }
  },
  fizz: {
    buzz: {
      id: 'buzzId'
    }
  }
};

console.log("getting all nested ids of", JSON.stringify(obj, null,4));
const paths = getPathsForProperty(obj, 'id');
console.log(paths);

$ node !$
node get_all_nested_paths_and_values_for_property.js
getting all nested ids of {
    "foo": {
        "id": "fooId",
        "bar": {
            "id": "barId",
            "baz": {
                "id": "bazId"
            }
        }
    },
    "fizz": {
        "buzz": {
            "id": "buzzId"
        }
    }
}
[
  { path: [ 'foo', 'id' ], value: 'fooId' },
  { path: [ 'foo', 'bar', 'id' ], value: 'barId' },
  { path: [ 'foo', 'bar', 'baz', 'id' ], value: 'bazId' },
  { path: [ 'fizz', 'buzz', 'id' ], value: 'buzzId' }
]
                    1.2.5.7.3.4
                1.2.5.7.4
```

#### 1.2.5.8 axios

```text
Axios is an HTTP client API framework that allows developers to make promises while making a request. Requests communicate with the server, and Axios responds with a promise as to whether your request was fulfilled or refused.

Among many developers, Axios is gaining a lot of traction, thanks to Axios-fetch, Axios-debug-log, Axios-mock-adapter, Axios-API-versioning, Axios-VCR, and other powerful third-party additions.

Axios can handle GET, POST, DELETE, and PUT requests.

Features of Axios
Allows developers to make simultaneous requests.
Axios supports promised base requests.
Transforms responses and requests to JSON data.
Requests and responses to interceptions.
Support HTTP requests for Node js apps
Supports HTTP requests from the browsers.
```

#### 1.2.5.9 karma

```text
Node js developers must test their applications to ensure they are stable, dependable, and perform well. This job requires a Karma package. Karma’s primary goal is to provide a productive testing environment to developers.

Features of Karma
Tests code in real browsers.
Tests code in multiple browsers (mobile phones, tablets, and desktops).
Controls the whole testing workflow from command or IDE.
Executes tests after every save.
Executes tests locally during development.
Executes tests on a continuous integration server.
```

#### 1.2.5.10 grunt

```text
With a task runner, Grunt developers can reduce the number of tasks required to maintain a project, automate minifications, compile jobs, testing, code linting, and other duties. 

Features of Grunt
Grunt has a plethora of plugins that can automate even the most monotonous jobs.
Grunt allows developers to publish Grunt-specific plugins through NPM.
```

#### 1.2.5.11 PM2

```text
For most Node js users, process management is a top concern. 

PM2 includes process management for production applications and a load balancer to assist with performance adjustments. 

PM2 allows developers to keep their applications online indefinitely. This step allows developers to reload applications without experiencing any downtime. 

Features of PM2
Behavior configuration
Container Integration
Watch & Reload
Log management
Monitoring
Max memory reload

            1.2.5.12 Mocha is a feature-rich JS test framework that runs on Node js and the browser, making asynchronous testing simple and enjoyable. 

Mocha tests are executed sequentially, allowing flexible and precise reporting while mapping uncaught exceptions to the appropriate test cases.

Features of Mocha
Multiple browser support.
Simple async support, including promises.
Test coverage reporting.
String diff support.
JavaScript API for running tests.
Auto-detects and disables coloring for non-TTYs.
Async test timeout support.
```

#### 1.2.5.13 jsonwebtoken

```text
Jsonwebtoken is a library to sign, verify and decode JSON Web Tokens.

const jwt = require('jsonwebtoken');
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');
```

#### 1.2.5.14 bcrypt

```text
Bcrypt is a library to hash and verify passwords with sync, callbacks, and promise interface.

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    // Store hash in your password DB.
});
```

#### 1.2.5.15 uuid

```text
UUID is a library to create RFC4122 universally unique identifiers.

const { v4: uuidv4 } = require('uuid');
uuidv4(); // => '1a68a438-b077-468b-b1e8-dcdd976a0f5b'
```

#### 1.2.5.16 passport

```text
Passport is Express-compatible authentication middleware for Node.js with 480+ strategies.

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));
```

#### 1.2.5.17 multer , tags: multer

#### 1.2.5.17.1 blog: https://blog.logrocket.com/multer-nodejs-express-upload-file , tags: multer express upload tutorial

#### 1.2.5.17.1.1 forms

```text
Web applications receive all different types of input from users, including text, graphical controls like checkboxes or radio buttons, and files, like images, videos, and other media.

In forms, each of these inputs are submitted to a server that processes the inputs, uses them in some way, perhaps saving them somewhere else, then gives the frontend a success or failed response.

When submitting forms that contain text inputs, the server, Node.js in our case, has less work to do. Using Express, you can easily grab all the inputs entered in the req.body object. However, submitting forms with files is a bit more complex because they require more processing, which is where Multer comes in.

                1.2.5.17.2
```

#### 1.2.5.18 https://www.npmjs.com/package/npkill

````text
`npkill` is a Node.js command-line utility that can be used to find and remove node_modules folders that are no longer being used by your project. 

Here's how you can use `npkill`:

| 1. Install `npkill` globally using the following command:
| 
| ```
| npm install -g npkill
| ```
| 
| 2. Navigate to the root directory of your project.
| 
| 3. Run `npkill` by typing `npkill` in the terminal and pressing Enter.
| 
| 4. `npkill` will display a list of all the `node_modules` folders in your project directory and its subdirectories, along with the disk space they are consuming.
| 
| 5. You can navigate through the list using the arrow keys and select the `node_modules` folders you want to remove using the spacebar.
| 
| 6. After selecting the folders you want to remove, press the Enter key to delete them.

Note that `npkill` will permanently delete the selected `node_modules` folders from your system, so be sure to double-check that you have selected the correct folders before confirming the deletion.

Also, make sure to run `npm install` after deleting the `node_modules` folders to re-install the dependencies needed for your project to run.
````

#### 1.2.5.19 nodejs unzipper module. description, use cases and code examples, tags: nodejs unzipper module. description use cases and code examples

````text
Absolutely! Let's dive into the `unzipper` module for Node.js:

**Description**

* **Purpose:** The `unzipper` module is designed for parsing and extracting `.zip` files in Node.js applications. It offers a convenient, stream-based API to handle large ZIP archives without loading them entirely into memory.
* **Core Features:**
    * Reads zip files as streams.
    * Extracts specific files based on filename patterns.
    * Supports events for entry opening, extraction, and closing.
    * Can handle various file types within zip archives.
    * No native module dependencies, relying on Node.js's built-in `zlib` module for decompression. 
* **Installation:**
   ```bash
   npm install unzipper
   ```

**Use Cases**

|1. **File Extraction:** Extract individual files or all files from a zip archive.
|2. **Filtering:** Extract only the files that match specific patterns (e.g., only `.txt` files).
|3. **Stream Processing:**  Process extracted files as they are being unzipped, ideal for large archives.
|4. **Custom Logic:** Execute custom actions for each entry in the archive (e.g., rename, move, validate files). 

**Code Examples**

**Example 1: Extracting All Files**

```javascript
const fs = require('fs');
const unzipper = require('unzipper');

fs.createReadStream('my_archive.zip')
  .pipe(unzipper.Extract({ path: 'output_directory' }))
  .on('close', () => console.log('Extraction complete!'));
```

**Example 2: Extracting Specific Files**

```javascript
const fs = require('fs');
const unzipper = require('unzipper');

fs.createReadStream('my_archive.zip')
  .pipe(unzipper.Parse()) // Parse the archive
  .on('entry', (entry) => {
    const fileName = entry.path;
    const type = entry.type; // 'Directory' or 'File'

    if (fileName.endsWith('.txt')) { 
      // Only extract text files
      entry.pipe(fs.createWriteStream('output_directory/' + fileName));
    } else {
      entry.autodrain(); // Discard non-text files
    }
  })
  .on('close', () => console.log('Extraction complete!'));
```

**Example 3: Extracting and Handling a Specific File**

```javascript
const fs = require('fs');
const unzipper = require('unzipper');

fs.createReadStream('my_archive.zip')
    .pipe(unzipper.ParseOne(/specific_file\.txt/)) // Extract this file only
    .pipe(fs.createWriteStream('specific_file.txt'))
    .on('error', (error) => console.error(error))
    .on('finish', () => console.log('File extraction complete!'));

```


**Explanation:**

|1. **Create a readable stream:** `fs.createReadStream` opens the ZIP file in streaming mode.
|2. **Pipe to `unzipper.Extract` or `unzipper.Parse`:**
|   * `unzipper.Extract` is used to directly extract all files to a specified directory.
|   * `unzipper.Parse` is for handling individual entries within the archive using the `entry` event.
|3. **`entry` Event:**  Emitted for each file or directory within the zip. You can examine the `entry.path` and `entry.type` to decide what to do with each entry.
|4. **`pipe` for Extraction:** To extract a file, pipe its contents to a writable stream (`fs.createWriteStream`).
|5. **`autodrain`:** Discard the contents of entries you don't want to extract.
|6. **`close` Event:** Indicates that the entire archive has been processed.


            1.2.5.20
        1.2.6
````
