---
type: reference
title: Express
description: Subsection 1.10 of my Tutorial.
tags: [kb-nodejs, node, npm, package-json, list, dependencies, dependency, tree, show, outdated, latest, version, leading, modules, and, packages, express, framework, tutorial, lodash, multer, upload, nodejs, unzipper, module, description, use, cases, code, examples]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nodejs-kb#1.10"
---

# 1.10 Express, tags: Express framework

[↑ my Tutorial](/kb-nodejs/01-my-tutorial/README.md)

### 1.10.0 intro

```text
Express.js, aka Express, tops the list of best Node.js frameworks. It has a minimalistic approach and seems to be a classic and straightforward framework for coding architecture. Officially launched in 2010, it has been called the de facto standard for Node.js under the MIT license. 

It does not require you to go steeper in the learning curve; instead, just a basic understanding of Node.js environment and programming skills suffice. Its fast, robust, and asynchronous architecture jives well with Node.

Express aligns with high-speed I/O operations and single-threaded nature of Node making it a default requirement for apps built with Node.js platform.

A more robust Application User Interface(API) means a more streamlined form of client-to-server requests and visible user interactions. Using Express, these software engineering principles are well executed.

Improving communication between client and server provides a thoroughly enjoyable experience to a web or mobile user. Companies like Twitter, Uber, Accenture, and other tech giants like IBM deploy applications built with Express. 

Express offers some powerful features that take backend development to the next level. 

Features:

Rapid server-side programming packages- the framework has many Node.js features as functions and speeds up the process with few code lines. 
High performance- multiple operations are executed independently of each other using asynchronous programming
Super-high test coverage helps build applications with maximum testability. 
A myriad of HTTP helpers- they make programs more intelligible, reusable.
Better content negotiation- this helps in better communication between the client and server by providing HTTP headers to URLs, which fetch the exact information for the users/client-side. 
MVC Architectural pattern

You can develop web apps faster with the framework since it has almost readily available grounds for API generation. You can use it for any enterprise-grade or browser-based app because of its robust routing, templating, security features, and error handling provisions. 
```

### 1.10.1 Install

```text
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (tutorial) 
version: (1.0.0) 
description: yosi izaq node.js tutorial
entry point: (buffers.js) server.js
test command: server.js
git repository: 
keywords: 
author: yosi izaq
license: (ISC) 
About to write to /Users/<user>/Desktop/work/code/nodejs/tutorial/package.json:

{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "yosi izaq node.js tutorial",
  "main": "server.js",
  "dependencies": {
    "express": "^4.16.4"
  },
  "devDependencies": {},
  "scripts": {
    "test": "server.js",
    "start": "node server.js"
  },
  "author": "yosi izaq",
  "license": "ISC"
}


Is this OK? (yes) 
$ sudo npm install express --save
Password:
npm WARN tutorial@1.0.0 No repository field.

+ express@4.16.4
updated 1 package and audited 121 packages in 2.273s
found 0 vulnerabilities

$ cat package.json 
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "yosi izaq node.js tutorial",
  "main": "server.js",
  "dependencies": {
    "express": "^4.16.4"
  },
  "devDependencies": {},
  "scripts": {
    "test": "server.js",
    "start": "node server.js"
  },
  "author": "yosi izaq",
  "license": "ISC"
}


$ sudo npm install body-parser --save
Password:
npm WARN tutorial@1.0.0 No repository field.

+ body-parser@1.18.3
updated 1 package and audited 151 packages in 2.729s
found 0 vulnerabilities

$ sudo npm install cookie-parser --save
npm WARN tutorial@1.0.0 No repository field.

+ cookie-parser@1.4.3
added 1 package from 2 contributors and audited 154 packages in 2.5s
found 0 vulnerabilities

$ sudo npm install multer --save
npm WARN tutorial@1.0.0 No repository field.

+ multer@1.4.1
added 21 packages from 13 contributors and audited 192 packages in 2.033s
found 0 vulnerabilities

$ cat package.json 
{
  "name": "tutorial",
  "version": "1.0.0",
  "description": "yosi izaq node.js tutorial",
  "main": "server.js",
  "dependencies": {
    "body-parser": "^1.18.3",
    "cookie-parser": "^1.4.3",
    "express": "^4.16.4",
    "multer": "^1.4.1"
  },
  "devDependencies": {},
  "scripts": {
    "test": "server.js",
    "start": "node server.js"
  },
  "author": "yosi izaq",
  "license": "ISC"
}
```

### 1.10.2 Express and supertest

#### 1.10.2.1 https://www.codementor.io/knownasilya/testing-express-apis-with-supertest-du107mcv2

```text
Testing Express APIs with Supertest
Published Feb 22, 2015Last updated Feb 15, 2017
Introduction

Hello, I'm Ilya, a full-stack developer who uses Node.js on the server and Ember.js on the client. Lately I've been having lots of fun testing my Express APIs, and I just wanted to show-off how fun and simple it can be. Hope you enjoy this as much as I enjoyed writing it!
Getting Started

For this tutorial we'll start with a simple Express API, and we will set up a test environment and do some integration tests on our API using supertest and tape. Supertest is a library made specifically for testing nodejs http servers, and tape is an assertion library that we'll use to setup our testing structure.

I've created a repository on Github, where you will find a fully working application with the API and the tests. This is the code that I will be referencing throughout this tutorial.

Let's begin! We'll start by installing all of our dependencies:

npm install --save express
npm install --save-dev supertest tape

Now we'll create our project structure, something like:

my-project/
  |_ package.json
  |_ index.js
  |_ server/
  | |_index.js 
  |_ test/
     |_ index.js

This is my standard project structure when building Express apps. Now let's write that app!
Our API

Let us start with server/index.js where we will write a super simple API, which will work with some user data.

'use strict';

var express = require('express');
var app = express();
var users = ['John', 'Betty', 'Hal'];

app.get('/api/users', function (req, res) {
  res.json(users);
});

module.exports = app;

Note: Usually you'd make a call to a database, but for the sake of this tutorial, I'll use a simple fixture.

Now, if you notice, I'm not calling app.listen(..) anywhere, that is because supertest takes an app object, and doesn't need your app to be listening on a port. For our app to run we will add some code to our index.js file, which will be the main file that is called when invoking npm start.

'use strict';

var server = require('./server');
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server running on port %d', port);
});

Now we require our app from above, and we listen on it there. This gives us the ability to require our server and pass it to supertest. So now if we ran npm start we should see something like this:

Server running on port 3000

**
Note: ** If npm start doesn't do anything, add a start script to your package.json, see here.

Now that's wonderful and exciting, but how do we know that our app works? Well, we could visit localhost:3000/api/users and we'll see the resulting users. Maybe go ahead and try that now, I'll wait 😃
Are We Satisfied?

I hope your API worked, but do we really want to do that every time we make a change? No, because we have problems to solve and apps to build that will solve those problems.

This is where supertest comes into play, but before we can do that, let's setup our first dummy test, we'll do this in test/index.js.

'use strict';

var test = require('tape');

test('First test!', function (t) {
  t.end();
});

Now this is the most simple of tests, because it doesn't do anything! Here we are using tape to create a test, and we are letting it know that the test has finished. The API for tape is very simple, and should be relatively easy to grasp.

We can run this test if we modify our test script in package.json to node test, which will run test/index.js with node. So now if we run npm test, we'll see something like:

TAP version 13
# First test!

|1..0
# tests 0
# pass  0

# ok

This looks about right, and our test passed, but it's kind of ugly and unreadable. We can spice it up with npm install --save-dev tap-spec and by modifying our test script to node test | tap-spec.
Test It

Now that we can run a test, let's setup out API test. We do this by adding supertest and importing our app.

var request = require('supertest');
var app = require('../server');

That is all the setup that we need before we write our test.

test('Correct users returned', function (t) {
  request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      t.end();
    });
}); 

If we run this test as it is, we should have a passing result (although you'll see that it's 0 out of 0 tests, since we didn't assert anything with tape), and that is good because just from this code we know that our request was successful due to the 200 status code, and we are getting json back, just as expected since we used res.json.

Let's see if our result is as expected. For this we'll assert if our users are the correct users. We'll do this from inside the callback that we passed to end, which will return as an error or our response.

'use strict';

var test = require('tape');
var request = require('supertest');
var app = require('../server');

test('Correct users returned', function (t) {
  request(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      var expectedUsers = ['John', 'Betty', 'Hal'];

      t.error(err, 'No error');
      t.same(res.body, expectedUsers, 'Users as expected');
      t.end();
    });
});

Now we're getting somewhere!

We now have two assertions of the result that we have. First of all we test that there isn't an error by using t.error(). We follow by confirming that our users are indeed correct; for this we use t.same(), and we compare the result, which is stored in res.body, as expected.

We should now see the following when we run npm test:

Correct users returned

    ✓ No error
    ✓ Users as expected



  total:     2
  passing:   2
  duration:  135ms

  All tests pass!

Congratulations, you wrote your first API test!

From here you can get creative, and test express routers and middleware (with a little bootstrapping), and remember to visit the superagent documentation, because you can use those methods with supertest (supertest is based on superagent).

The full code is located in the testing-express-api repository.

            1.10.2.2
```

### 1.10.3 passport, authentication library

#### 1.10.3.1 web tutorials

#### 1.10.3.1.1 https://scotch.io/tutorials/easy-node-authentication-setup-and-local

#### 1.10.3.1.2 http://www.passportjs.org/docs/

```text
Overview

Passport is authentication middleware for Node. It is designed to serve a singular purpose: authenticate requests. When writing modules, encapsulation is a virtue, so Passport delegates all other functionality to the application. This separation of concerns keeps code clean and maintainable, and makes Passport extremely easy to integrate into an application.

In modern web applications, authentication can take a variety of forms. Traditionally, users log in by providing a username and password. With the rise of social networking, single sign-on using an OAuth provider such as Facebook or Twitter has become a popular authentication method. Services that expose an API often require token-based credentials to protect access.

Passport recognizes that each application has unique authentication requirements. Authentication mechanisms, known as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without creating unnecessary dependencies.

Despite the complexities involved in authentication, code does not have to be complicated.

app.post('/login', passport.authenticate('local', { successRedirect: '/',
                                                    failureRedirect: '/login' }));

Install

$ npm install passport

Authenticate

Authenticating requests is as simple as calling passport.authenticate() and specifying which strategy to employ. authenticate()'s function signature is standard Connect middleware, which makes it convenient to use as route middleware in Express applications.

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

By default, if authentication fails, Passport will respond with a 401 Unauthorized status, and any additional route handlers will not be invoked. If authentication succeeds, the next handler will be invoked and the req.user property will be set to the authenticated user.

Note: Strategies must be configured prior to using them in a route. Continue reading the chapter on configuration for details.
Redirects

A redirect is commonly issued after authenticating a request.

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

In this case, the redirect options override the default behavior. Upon successful authentication, the user will be redirected to the home page. If authentication fails, the user will be redirected back to the login page for another attempt.
Flash Messages

Redirects are often combined with flash messages in order to display status information to the user.

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

Setting the failureFlash option to true instructs Passport to flash an error message using the message given by the strategy's verify callback, if any. This is often the best approach, because the verify callback can make the most accurate determination of why authentication failed.

Alternatively, the flash message can be set specifically.

passport.authenticate('local', { failureFlash: 'Invalid username or password.' });

A successFlash option is available which flashes a success message when authentication succeeds.

passport.authenticate('local', { successFlash: 'Welcome!' });

Note: Using flash messages requires a req.flash() function. Express 2.x provided this functionality, however it was removed from Express 3.x. Use of connect-flash middleware is recommended to provide this functionality when using Express 3.x.
Disable Sessions

After successful authentication, Passport will establish a persistent login session. This is useful for the common scenario of users accessing a web application via a browser. However, in some cases, session support is not necessary. For example, API servers typically require credentials to be supplied with each request. When this is the case, session support can be safely disabled by setting the session option to false.

app.get('/api/users/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json({ id: req.user.id, username: req.user.username });
  });

Custom Callback

If the built-in options are not sufficient for handling an authentication request, a custom callback can be provided to allow the application to handle success or failure.

app.get('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/users/' + user.username);
    });
  })(req, res, next);
});

In this example, note that authenticate() is called from within the route handler, rather than being used as route middleware. This gives the callback access to the req and res objects through closure.

If authentication failed, user will be set to false. If an exception occurred, err will be set. An optional info argument will be passed, containing additional details provided by the strategy's verify callback.

The callback can use the arguments supplied to handle the authentication result as desired. Note that when using a custom callback, it becomes the application's responsibility to establish a session (by calling req.login()) and send a response.
Configure

Three pieces need to be configured to use Passport for authentication:

    Authentication strategies
    Application middleware
    Sessions (optional)

Strategies

Passport uses what are termed strategies to authenticate requests. Strategies range from verifying a username and password, delegated authentication using OAuth or federated authentication using OpenID.

Before asking Passport to authenticate a request, the strategy (or strategies) used by an application must be configured.

Strategies, and their configuration, are supplied via the use() function. For example, the following uses the LocalStrategy for username/password authentication.

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

Verify Callback

This example introduces an important concept. Strategies require what is known as a verify callback. The purpose of a verify callback is to find the user that possesses a set of credentials.

When Passport authenticates a request, it parses the credentials contained in the request. It then invokes the verify callback with those credentials as arguments, in this case username and password. If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated.

return done(null, user);

If the credentials are not valid (for example, if the password is incorrect), done should be invoked with false instead of a user to indicate an authentication failure.

return done(null, false);

An additional info message can be supplied to indicate the reason for the failure. This is useful for displaying a flash message prompting the user to try again.

return done(null, false, { message: 'Incorrect password.' });

Finally, if an exception occurred while verifying the credentials (for example, if the database is not available), done should be invoked with an error, in conventional Node style.

return done(err);

Note that it is important to distinguish the two failure cases that can occur. The latter is a server exception, in which err is set to a non-null value. Authentication failures are natural conditions, in which the server is operating normally. Ensure that err remains null, and use the final argument to pass additional details.

By delegating in this manner, the verify callback keeps Passport database agnostic. Applications are free to choose how user information is stored, without any assumptions imposed by the authentication layer.
Middleware

In a Connect or Express-based application, passport.initialize() middleware is required to initialize Passport. If your application uses persistent login sessions, passport.session() middleware must also be used.

app.configure(function() {
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

Note that enabling session support is entirely optional, though it is recommended for most applications. If enabled, be sure to use session() before passport.session() to ensure that the login session is restored in the correct order.

In Express 4.x, the Connect middleware is no longer included in the Express core, and the app.configure() method has been removed. The same middleware can be found in their npm module equivalents.

var session = require("express-session"),
    bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

Sessions

In a typical web application, the credentials used to authenticate a user will only be transmitted during the login request. If authentication succeeds, a session will be established and maintained via a cookie set in the user's browser.

Each subsequent request will not contain credentials, but rather the unique cookie that identifies the session. In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

In this example, only the user ID is serialized to the session, keeping the amount of data stored within the session small. When subsequent requests are received, this ID is used to find the user, which will be restored to req.user.

The serialization and deserialization logic is supplied by the application, allowing the application to choose an appropriate database and/or object mapper, without imposition by the authentication layer.
Username & Password

The most widely used way for websites to authenticate users is via a username and password. Support for this mechanism is provided by the passport-local module.
Install

$ npm install passport-local

Configuration

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

The verify callback for local authentication accepts username and password arguments, which are submitted to the application via a login form.
Form

A form is placed on a web page, allowing the user to enter their credentials and log in.

<form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>

Route

The login form is submitted to the server via the POST method. Using authenticate() with the local strategy will handle the login request.

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

Setting the failureFlash option to true instructs Passport to flash an error message using the message option set by the verify callback above. This is helpful when prompting the user to try again.
Parameters

By default, LocalStrategy expects to find credentials in parameters named username and password. If your site prefers to name these fields differently, options are available to change the defaults.

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'passwd'
  },
  function(username, password, done) {
    // ...
  }
));

OpenID

OpenID is an open standard for federated authentication. When visiting a website, users present their OpenID to sign in. The user then authenticates with their chosen OpenID provider, which issues an assertion to confirm the user's identity. The website verifies this assertion in order to sign the user in.

Support for OpenID is provided by the passport-openid module.
Install

$ npm install passport-openid

Configuration

When using OpenID, a return URL and realm must be specified. The returnURL is the URL to which the user will be redirected after authenticating with their OpenID provider. realm indicates the part of URL-space for which authentication is valid. Typically this will be the root URL of the website.

var passport = require('passport')
  , OpenIDStrategy = require('passport-openid').Strategy;

passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/'
  },
  function(identifier, done) {
    User.findOrCreate({ openId: identifier }, function(err, user) {
      done(err, user);
    });
  }
));

The verify callback for OpenID authentication accepts an identifier argument containing the user's claimed identifier.
Form

A form is placed on a web page, allowing the user to enter their OpenID and sign in.

<form action="/auth/openid" method="post">
    <div>
        <label>OpenID:</label>
        <input type="text" name="openid_identifier"/><br/>
    </div>
    <div>
        <input type="submit" value="Sign In"/>
    </div>
</form>

Routes

Two routes are required for OpenID authentication. The first route accepts the form submission containing an OpenID identifier. During authentication, the user will be redirected to their OpenID provider. The second route is the URL to which the user will be returned after authenticating with their OpenID provider.

// Accept the OpenID identifier and redirect the user to their OpenID
// provider for authentication.  When complete, the provider will redirect
// the user back to the application at:
//     /auth/openid/return
app.post('/auth/openid', passport.authenticate('openid'));

// The OpenID provider has redirected the user back to the application.
// Finish the authentication process by verifying the assertion.  If valid,
// the user will be logged in.  Otherwise, authentication has failed.
app.get('/auth/openid/return',
  passport.authenticate('openid', { successRedirect: '/',
                                    failureRedirect: '/login' }));

Profile Exchange

OpenID can optionally be configured to retrieve profile information about the user being authenticated. Profile exchange is enabled by setting the profile option to true.

passport.use(new OpenIDStrategy({
    returnURL: 'http://www.example.com/auth/openid/return',
    realm: 'http://www.example.com/',
    profile: true
  },
  function(identifier, profile, done) {
    // ...
  }
));

When profile exchange is enabled, the function signature of the verify callback accepts an additional profile argument containing user profile information provided by the OpenID provider; refer to User Profile for further information.
OAuth

OAuth is a standard protocol that allows users to authorize API access to web and desktop or mobile applications. Once access has been granted, the authorized application can utilize the API on behalf of the user. OAuth has also emerged as a popular mechanism for delegated authentication.

OAuth comes in two primary flavors, both of which are widely deployed.

The initial version of OAuth was developed as an open standard by a loosely organized collective of web developers. Their work resulted in OAuth 1.0, which was superseded by OAuth 1.0a. This work has now been standardized by the IETF as RFC 5849.

Recent efforts undertaken by the Web Authorization Protocol Working Group have focused on defining OAuth 2.0. Due to the lengthy standardization effort, providers have proceeded to deploy implementations conforming to various drafts, each with slightly different semantics.

Thankfully, Passport shields an application from the complexities of dealing with OAuth variants. In many cases, a provider-specific strategy can be used instead of the generic OAuth strategies described below. This cuts down on the necessary configuration, and accommodates any provider-specific quirks. See Facebook, Twitter or the list of providers for preferred usage.

Support for OAuth is provided by the passport-oauth module.
Install

$ npm install passport-oauth

OAuth 1.0

OAuth 1.0 is a delegated authentication strategy that involves multiple steps. First, a request token must be obtained. Next, the user is redirected to the service provider to authorize access. Finally, after authorization has been granted, the user is redirected back to the application and the request token can be exchanged for an access token. The application requesting access, known as a consumer, is identified by a consumer key and consumer secret.
Configuration

When using the generic OAuth strategy, the key, secret, and endpoints are specified as options.

var passport = require('passport')
  , OAuthStrategy = require('passport-oauth').OAuthStrategy;

passport.use('provider', new OAuthStrategy({
    requestTokenURL: 'https://www.provider.com/oauth/request_token',
    accessTokenURL: 'https://www.provider.com/oauth/access_token',
    userAuthorizationURL: 'https://www.provider.com/oauth/authorize',
    consumerKey: '123-456-789',
    consumerSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));

The verify callback for OAuth-based strategies accepts token, tokenSecret, and profile arguments. token is the access token and tokenSecret is its corresponding secret. profile will contain user profile information provided by the service provider; refer to User Profile for additional information.
Routes

Two routes are required for OAuth authentication. The first route initiates an OAuth transaction and redirects the user to the service provider. The second route is the URL to which the user will be redirected after authenticating with the provider.

// Redirect the user to the OAuth provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));

Link

A link or button can be placed on a web page, which will start the authentication process when clicked.

<a href="/auth/provider">Log In with OAuth Provider</a>

OAuth 2.0

OAuth 2.0 is the successor to OAuth 1.0, and is designed to overcome perceived shortcomings in the earlier version. The authentication flow is essentially the same. The user is first redirected to the service provider to authorize access. After authorization has been granted, the user is redirected back to the application with a code that can be exchanged for an access token. The application requesting access, known as a client, is identified by an ID and secret.
Configuration

When using the generic OAuth 2.0 strategy, the client ID, client secret, and endpoints are specified as options.

var passport = require('passport')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

passport.use('provider', new OAuth2Strategy({
    authorizationURL: 'https://www.provider.com/oauth2/authorize',
    tokenURL: 'https://www.provider.com/oauth2/token',
    clientID: '123-456-789',
    clientSecret: 'shhh-its-a-secret'
    callbackURL: 'https://www.example.com/auth/provider/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      done(err, user);
    });
  }
));

The verify callback for OAuth 2.0-based strategies accepts accessToken, refreshToken, and profile arguments. refreshToken can be used to obtain new access tokens, and may be undefined if the provider does not issue refresh tokens. profile will contain user profile information provided by the service provider; refer to User Profile for additional information.
Routes

Two routes are required for OAuth 2.0 authentication. The first route redirects the user to the service provider. The second route is the URL to which the user will be redirected after authenticating with the provider.

// Redirect the user to the OAuth 2.0 provider for authentication.  When
// complete, the provider will redirect the user back to the application at
//     /auth/provider/callback
app.get('/auth/provider', passport.authenticate('provider'));

// The OAuth 2.0 provider has redirected the user back to the application.
// Finish the authentication process by attempting to obtain an access
// token.  If authorization was granted, the user will be logged in.
// Otherwise, authentication has failed.
app.get('/auth/provider/callback',
  passport.authenticate('provider', { successRedirect: '/',
                                      failureRedirect: '/login' }));

Scope

When requesting access using OAuth 2.0, the scope of access is controlled by the scope option.

app.get('/auth/provider',
  passport.authenticate('provider', { scope: 'email' })
);

Multiple scopes can be specified as an array.

app.get('/auth/provider',
  passport.authenticate('provider', { scope: ['email', 'sms'] })
);

Values for the scope option are provider-specific. Consult the provider's documentation for details regarding supported scopes.
Link

A link or button can be placed on a web page, which will start the authentication process when clicked.

<a href="/auth/provider">Log In with OAuth 2.0 Provider</a>

User Profile

When authenticating using a third-party service such as Facebook or Twitter, user profile information will often be available. Each service tends to have a different way of encoding this information. To make integration easier, Passport normalizes profile information to the extent possible.

Normalized profile information conforms to the contact schema established by [Joseph Smarr][schema-author]. The common fields available are outlined in the following table.

provider {String}
    The provider with which the user authenticated (facebook, twitter, etc.).
id {String}
    A unique identifier for the user, as generated by the service provider.
displayName {String}
    The name of this user, suitable for display.
name {Object}

    familyName {String}
        The family name of this user, or "last name" in most Western languages.
    givenName {String}
        The given name of this user, or "first name" in most Western languages.
    middleName {String}
        The middle name of this user.

emails {Array} [n]

    value {String}
        The actual email address.
    type {String}
        The type of email address (home, work, etc.).

photos {Array} [n]

    value {String}
        The URL of the image.

Note that not all of the above fields are available from every service provider. Some providers may contain additional information not described here. Consult the provider-specific documentation for further details.
Facebook

The Facebook strategy allows users to log in to a web application using their Facebook account. Internally, Facebook authentication works using OAuth 2.0.

Support for Facebook is implemented by the passport-facebook module.
Install

$ npm install passport-facebook

Configuration

In order to use Facebook authentication, you must first create an app at Facebook Developers. When created, an app is assigned an App ID and App Secret. Your application must also implement a redirect URL, to which Facebook will redirect users after they have approved access for your application.

var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://www.example.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

The verify callback for Facebook authentication accepts accessToken, refreshToken, and profile arguments. profile will contain user profile information provided by Facebook; refer to User Profile for additional information.

Note: For security reasons, the redirection URL must reside on the same host that is registered with Facebook.
Routes

Two routes are required for Facebook authentication. The first route redirects the user to Facebook. The second route is the URL to which Facebook will redirect the user after they have logged in.

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

Note that the URL of the callback route matches that of the callbackURL option specified when configuring the strategy.
Permissions

If your application needs extended permissions, they can be requested by setting the scope option.

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: 'read_stream' })
);

Multiple permissions can be specified as an array.

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
);

Link

A link or button can be placed on a web page, allowing one-click login with Facebook.

<a href="/auth/facebook">Login with Facebook</a>

Twitter

The Twitter strategy allows users to sign in to a web application using their Twitter account. Internally, Twitter authentication works using OAuth 1.0a.

Support for Twitter is implemented by the passport-twitter module.
Install

$ npm install passport-twitter

Configuration

In order to use Twitter authentication, you must first create an application at Twitter Developers. When created, an application is assigned a consumer key and consumer secret. Your application must also implement a callback URL, to which Twitter will redirect users after they have approved access for your application.

var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

The verify callback for Twitter authentication accepts token, tokenSecret, and profile arguments. profile will contain user profile information provided by Twitter; refer to User Profile for additional information.
Routes

Two routes are required for Twitter authentication. The first route initiates an OAuth transaction and redirects the user to Twitter. The second route is the URL to which Twitter will redirect the user after they have signed in.

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

Note that the URL of the callback route matches that of the callbackURL option specified when configuring the strategy.
Link

A link or button can be placed on a web page, allowing one-click sign in with Twitter.

<a href="/auth/twitter">Sign in with Twitter</a>

Google

The Google strategy allows users to sign in to a web application using their Google account. Google used to support OpenID internally, but it now works based on OpenID Connect and supports oAuth 1.0 and oAuth 2.0.

Support for Google is implemented by the passport-google-oauth module.
Install

$ npm install passport-google-oauth

Configuration

The Client Id and Client Secret needed to authenticate with Google can be set up from the Google Developers Console. You may also need to enable Google+ API in the developer console, otherwise user profile data may not be fetched. Google supports authentication with both oAuth 1.0 and oAuth 2.0.
oAuth 1.0

The Google OAuth 1.0 authentication strategy authenticates users using a Google account and OAuth tokens. The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well as options specifying a consumer key, consumer secret, and callback URL.
Configuration

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    consumerKey: GOOGLE_CONSUMER_KEY,
    consumerSecret: GOOGLE_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

Routes

Use passport.authenticate(), specifying the 'google' strategy, to authenticate requests. Authentication with Google requires an extra scope parameter. For information, go here.

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

oAuth 2.0

The Google OAuth 2.0 authentication strategy authenticates users using a Google account and OAuth 2.0 tokens. The strategy requires a verify callback, which accepts these credentials and calls done providing a user, as well as options specifying a client ID, client secret, and callback URL.
Configuration

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

Routes

Use passport.authenticate(), specifying the 'google' strategy, to authenticate requests. Authentication with Google requires an extra scope parameter. For information, go here.

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve
//   redirecting the user to google.com.  After authorization, Google
//   will redirect the user back to this application at /auth/google/callback
app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

Link

A link or button can be placed on a web page, allowing one-click sign in with Google.

<a href="/auth/google">Sign In with Google</a>

Basic & Digest

Along with defining HTTP's authentication framework, RFC 2617 also defined the Basic and Digest authentications schemes. These two schemes both use usernames and passwords as credentials to authenticate users, and are often used to protect API endpoints.

It should be noted that relying on username and password creditials can have adverse security impacts, especially in scenarios where there is not a high degree of trust between the server and client. In these situations, it is recommended to use an authorization framework such as OAuth 2.0.

Support for Basic and Digest schemes is provided by the passport-http module.
Install

$ npm install passport-http

Basic

The Basic scheme uses a username and password to authenticate a user. These credentials are transported in plain text, so it is advised to use HTTPS when implementing this scheme.
Configuration

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

The verify callback for Basic authentication accepts username and password arguments.
Protect Endpoints

app.get('/api/me',
  passport.authenticate('basic', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

Specify passport.authenticate() with the basic strategy to protect API endpoints. Sessions are not typically needed by APIs, so they can be disabled.
Digest

The Digest scheme uses a username and password to authenticate a user. Its primary benefit over Basic is that it uses a challenge-response paradigm to avoid sending the password in the clear.
Configuration

passport.use(new DigestStrategy({ qop: 'auth' },
  function(username, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, user.password);
    });
  },
  function(params, done) {
    // validate nonces as necessary
    done(null, true)
  }
));

The Digest strategy utilizes two callbacks, the second of which is optional.

The first callback, known as the "secret callback" accepts the username and calls done supplying a user and the corresponding secret password. The password is used to compute a hash, and authentication fails if it does not match that contained in the request.

The second "validate callback" accepts nonce related params, which can be checked to avoid replay attacks.
Protect Endpoints

app.get('/api/me',
  passport.authenticate('digest', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

Specify passport.authenticate() with the digest strategy to protect API endpoints. Sessions are not typically needed by APIs, so they can be disabled.
OAuth

OAuth (formally specified by RFC 5849) provides a means for users to grant third-party applications access to their data without exposing their password to those applications.

The protocol greatly improves the security of web applications, in particular, and OAuth has been important in bringing attention to the potential dangers of exposing passwords to external services.

While OAuth 1.0 is still widely used, it has been superseded by OAuth 2.0. It is recommended to base new implementations on OAuth 2.0.

When using OAuth to protect API endpoints, there are three distinct steps that that must be performed:

    The application requests permission from the user for access to protected resources.
    A token is issued to the application, if permission is granted by the user.
    The application authenticates using the token to access protected resources.

Issuing Tokens

OAuthorize, a sibling project to Passport, provides a toolkit for implementing OAuth service providers.

The authorization process is a complex sequence that involves authenticating both the requesting application and the user, as well as prompting the user for permission, ensuring that enough detail is provided for the user to make an informed decision.

Additionally, it is up to the implementor to determine what limits can be placed on the application regarding scope of access, as well as subsequently enforcing those limits.

As a toolkit, OAuthorize does not attempt to make implementation decisions. This guide does not cover these issues, but does highly recommend that services deploying OAuth have a complete understanding of the security considerations involved.
Authenticating Tokens

Once issued, OAuth tokens can be authenticated using the passport-http-oauth module.
Install

$ npm install passport-http-oauth

Configuration

passport.use('token', new TokenStrategy(
  function(consumerKey, done) {
    Consumer.findOne({ key: consumerKey }, function (err, consumer) {
      if (err) { return done(err); }
      if (!consumer) { return done(null, false); }
      return done(null, consumer, consumer.secret);
    });
  },
  function(accessToken, done) {
    AccessToken.findOne({ token: accessToken }, function (err, token) {
      if (err) { return done(err); }
      if (!token) { return done(null, false); }
      Users.findById(token.userId, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        // fourth argument is optional info.  typically used to pass
        // details needed to authorize the request (ex: `scope`)
        return done(null, user, token.secret, { scope: token.scope });
      });
    });
  },
  function(timestamp, nonce, done) {
    // validate the timestamp and nonce as necessary
    done(null, true)
  }
));

In contrast to other strategies, there are two callbacks required by OAuth. In OAuth, both an identifier for the requesting application and the user-specific token are encoded as credentials.

The first callback is known as the "consumer callback", and is used to find the application making the request, including the secret assigned to it. The second callback is the "token callback", which is used to indentify the user as well as the token's corresponding secret. The secrets supplied by the consumer and token callbacks are used to compute a signature, and authentication fails if it does not match the request signature.

A final "validate callback" is optional, which can be used to prevent replay attacks by checking the timestamp and nonce used in the request.
Protect Endpoints

app.get('/api/me',
  passport.authenticate('token', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

Specify passport.authenticate() with the token strategy to protect API endpoints. Sessions are not typically needed by APIs, so they can be disabled.
OAuth 2.0

OAuth 2.0 (formally specified by RFC 6749) provides an authorization framework which allows users to authorize access to third-party applications. When authorized, the application is issued a token to use as an authentication credential. This has two primary security benefits:

    The application does not need to store the user's username and password.
    The token can have a restricted scope (for example: read-only access).

These benefits are particularly important for ensuring the security of web applications, making OAuth 2.0 the predominant standard for API authentication.

When using OAuth 2.0 to protect API endpoints, there are three distinct steps that must be performed:

    The application requests permission from the user for access to protected resources.
    A token is issued to the application, if permission is granted by the user.
    The application authenticates using the token to access protected resources.

Issuing Tokens

OAuth2orize, a sibling project to Passport, provides a toolkit for implementing OAuth 2.0 authorization servers.

The authorization process is a complex sequence that involves authenticating both the requesting application and the user, as well as prompting the user for permission, ensuring that enough detail is provided for the user to make an informed decision.

Additionally, it is up to the implementor to determine what limits can be placed on the application regarding scope of access, as well as subsequently enforcing those limits.

As a toolkit, OAuth2orize does not attempt to make implementation decisions. This guide does not cover these issues, but does highly recommend that services deploying OAuth 2.0 have a complete understanding of the security considerations involved.
Authenticating Tokens

OAuth 2.0 provides a framework, in which an arbitrarily extensible set of token types can be issued. In practice, only specific token types have gained widespread use.
Bearer Tokens

Bearer tokens are the most widely issued type of token in OAuth 2.0. So much so, in fact, that many implementations assume that bearer tokens are the only type of token issued.

Bearer tokens can be authenticated using the passport-http-bearer module.
Install

$ npm install passport-http-bearer

Configuration

passport.use(new BearerStrategy(
  function(token, done) {
    User.findOne({ token: token }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'read' });
    });
  }
));

The verify callback for bearer tokens accepts the token as an argument. When invoking done, optional info can be passed, which will be set by Passport at req.authInfo. This is typically used to convey the scope of the token, and can be used when making access control checks.
Protect Endpoints

app.get('/api/me',
  passport.authenticate('bearer', { session: false }),
  function(req, res) {
    res.json(req.user);
  });

Specify passport.authenticate() with the bearer strategy to protect API endpoints. Sessions are not typically needed by APIs, so they can be disabled.
API Schemes

The following is a list of strategies that implement authentication schemes used when protecting API endpoints.
Scheme 	Specification 	Developer
Anonymous 	N/A 	Jared Hanson
Bearer 	RFC 6750 	Jared Hanson
Basic 	RFC 2617 	Jared Hanson
Digest 	RFC 2617 	Jared Hanson
Hash 	N/A 	Yuri Karadzhov
Hawk 	hueniverse/hawk 	José F. Romaniello
Local API Key 	N/A 	Sudhakar Mani
OAuth 	RFC 5849 	Jared Hanson
OAuth 2.0 Client Password 	RFC 6749 	Jared Hanson
OAuth 2.0 JWT Client Assertion 	draft-jones-oauth-jwt-bearer 	xTuple
OAuth 2.0 Public Client 	RFC 6749 	Tim Shadel
Log In

Passport exposes a login() function on req (also aliased as logIn()) that can be used to establish a login session.

req.login(user, function(err) {
  if (err) { return next(err); }
  return res.redirect('/users/' + req.user.username);
});

When the login operation completes, user will be assigned to req.user.

Note: passport.authenticate() middleware invokes req.login() automatically. This function is primarily used when users sign up, during which req.login() can be invoked to automatically log in the newly registered user.
Log Out

Passport exposes a logout() function on req (also aliased as logOut()) that can be called from any route handler which needs to terminate a login session. Invoking logout() will remove the req.user property and clear the login session (if any).

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

Authorize

An application may need to incorporate information from multiple third-party services. In this case, the application will request the user to "connect", for example, both their Facebook and Twitter accounts.

When this occurs, a user will already be authenticated with the application, and any subsequent third-party accounts merely need to be authorized and associated with the user. Because authentication and authorization in this situation are similar, Passport provides a means to accommodate both.

Authorization is performed by calling passport.authorize(). If authorization is granted, the result provided by the strategy's verify callback will be assigned to req.account. The existing login session and req.user will be unaffected.

app.get('/connect/twitter',
  passport.authorize('twitter-authz', { failureRedirect: '/account' })
);

app.get('/connect/twitter/callback',
  passport.authorize('twitter-authz', { failureRedirect: '/account' }),
  function(req, res) {
    var user = req.user;
    var account = req.account;

    // Associate the Twitter account with the logged-in user.
    account.userId = user.id;
    account.save(function(err) {
      if (err) { return self.error(err); }
      self.redirect('/');
    });
  }
);

In the callback route, you can see the use of both req.user and req.account. The newly connected account is associated with the logged-in user and saved to the database.
Configuration

Strategies used for authorization are the same as those used for authentication. However, an application may want to offer both authentication and authorization with the same third-party service. In this case, a named strategy can be used, by overriding the strategy's default name in the call to use().

passport.use('twitter-authz', new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/connect/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    Account.findOne({ domain: 'twitter.com', uid: profile.id }, function(err, account) {
      if (err) { return done(err); }
      if (account) { return done(null, account); }

      var account = new Account();
      account.domain = 'twitter.com';
      account.uid = profile.id;
      var t = { kind: 'oauth', token: token, attributes: { tokenSecret: tokenSecret } };
      account.tokens.push(t);
      return done(null, account);
    });
  }
));

In the above example, you can see that the twitter-authz strategy is finding or creating an Account instance to store Twitter account information. The result will be assigned to req.account, allowing the route handler to associate the account with the authenticated user.
Association in Verify Callback

One downside to the approach described above is that it requires two instances of the same strategy and supporting routes.

To avoid this, set the strategy's passReqToCallback option to true. With this option enabled, req will be passed as the first argument to the verify callback.

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://www.example.com/auth/twitter/callback",
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    if (!req.user) {
      // Not logged-in. Authenticate based on Twitter account.
    } else {
      // Logged in. Associate Twitter account with user.  Preserve the login
      // state by supplying the existing user after association.
      // return done(null, req.user);
    }
  }
));

With req passed as an argument, the verify callback can use the state of the request to tailor the authentication process, handling both authentication and authorization using a single strategy instance and set of routes. For example, if a user is already logged in, the newly "connected" account can be associated. Any additional application-specific properties set on req, including req.session, can be used as well.

                1.10.3.1.3
            1.10.3.2
```

### 1.10.4 Schema validations

#### 1.10.4.1 swagger validation , Schema validations

#### 1.10.4.1.1 https://www.npmjs.com/package/express-openapi-validate

```text
index.js

const fs = require("fs");
const express = require("express");
const { OpenApiValidator } = require("express-openapi-validate");
const jsYaml = require("js-yaml");
 
const app = express();
app.use(express.json());
 
const openApiDocument = jsYaml.safeLoad(
  fs.readFileSync("openapi.yaml", "utf-8")
);
const validator = new OpenApiValidator(openApiDocument);
 
app.post("/echo", validator.validate("post", "/echo"), (req, res, next) => {
  res.json({ output: req.body.input });
});
 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    error: {
      name: err.name,
      message: err.message,
      data: err.data,
    },
  });
});
 
const server = app.listen(3000, () => {
  console.log("Listening on", server.address());
});
openapi.yaml

openapi: 3.0.1
info:
  title: Example API with a single echo endpoint
  version: 1.0.0
components:
  schemas:
    Error:
      type: object
      properties:
        error:
          type: object
          properties:
            name:
              type: string
            message:
              type: string
            data:
              type: array
              items:
                type: object
          required:
            - name
            - message
      required:
        - error
  responses:
    error:
      description: Default error response with error object
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/Error"
paths:
  /echo:
    post:
      description: Echo input back
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                input:
                  type: string
              required:
                - input
      responses:
        "200":
          description: Echoed input
          content:
            application/json:
              schema:
                type: object
                properties:
                  output:
                    type: string
        default:
          $ref: "#/components/responses/error"
```

#### 1.10.4.1.2 usage in semantic

```text
src/swagger folder contains .json resources for swagger usage.
validation jsons are in src/swagger/schemas
$ ls -R src/swagger/
app/		batch/		examples/	index.js	read/		schemas/	site/		swagger.json

src/swagger//app:
app-id.json	app.json

src/swagger//batch:
batch.json

src/swagger//examples:
app-list.json		entity-list.json	single-app.json		single-entity.json	single-site.json	site-list.json

src/swagger//read:
entity-type-id.json	entity-type.json

src/swagger//schemas:
batch-request.json	cdm.json		entity-list.json	id.json			single-entity.json

src/swagger//site:
site-id.json	site.json

$ cat src/swagger//schemas/id.json 
{
    "type": "string",
    "pattern": "^[\\w-:@+~./]+$",
    "minLength": 1,
    "maxLength": 70
}

The json schema are stored in 
    swaggerDoc.components.schemas = {
        'BatchRequest': require('./schemas/batch-request.json'),
        'EntityList': require('./schemas/entity-list.json'),
        'SingleEntity': require('./schemas/single-entity.json'),
        'CDM': require('./schemas/cdm.json'),
        'ID': require('./schemas/id.json')
    };
in swagger/index.js

note that the .json files use $ref to include the schemas. ex from app.json:
   "get": {
        "tags": [
            "App"
        ],
        "summary": "Read all apps, optionally filter by specific catalog/group, or a specific app, optionally with related entities",
        "parameters": [
            {
                "name": "contextId",
                "description": "The context id",
                "in": "query",
                "schema": {
                    "$ref": "#/components/schemas/ID"
                },

Actual validation:
        ex: sites.js:
        const requestValidator = new OpenApiValidator(swaggerDoc());

    const validateRequest = (req, res, next) => {
        requestValidator.validate(req.method.toLowerCase(), req.baseUrl + (req.params.id ? "/{id}" : ""))(req, res, next);
    };


                1.10.4.1.3
            1.10.4.2
```

### 1.10.5 express FAQ

#### 1.10.5.1 get request params and query params

```text
Express 4.x

To get a URL parameter's value, use req.params

app.get('/p/:tagId', function(req, res) {
  res.send("tagId is set to " + req.params.tagId);
});

// GET /p/5
// tagId is set to 5
If you want to get a query parameter ?tagId=5, then use req.query

app.get('/p', function(req, res) {
  res.send("tagId is set to " + req.query.tagId);
});

// GET /p?tagId=5
// tagId is set to 5

            1.10.5.2
```

### 1.10.6 X509 authentication

```text
resources:
https://smallstep.com/hello-mtls/doc/combined/express/nodejs
https://intown.biz/2016/11/22/node-client-auth/
```

#### 1.10.6.1 https://medium.com/@sevcsik/authentication-using-https-client-certificates-3c9d270e8326

```text
Authentication using HTTPS client certificates

We hear a lot about how passwords are insecure, and should not be used alone for authentication. They are hard to remember, so users are tempted to come up with weak passwords, and reuse them across multiple websites. Even if the password is strong, it’s still just a short string the users know.
Image for post
Image from betanews.com
There are numerous ways to mitigate this, such as HMAC or time-based one-time passwords or more recently universal 2nd-factor hardware tokens. They all based on something the user has, rather than something they know. What they have is a secret key, which they can use to generate a password or sign messages.
What seems to be forgotten in the consumer world is that every browser has had a feature built-in since TLS was introduced, called mutual authentication, which allows the user to present a certificate as well as the server. This means the user can authenticate with something they have and — if the certificate is protected by a passphrase — something they know.
In this post, we implement a simple Node.js example which uses client certificates to authenticate the user.
We only one need external dependency, express, otherwise, we just depend on the standard Node.js HTTPS server. We also need fs to read the certificates/keys to configure HTTPS.
const express = require('express')
const fs = require('fs')
const https = require('https')

Setting up the private key and the certificate
First of all, we need to generate our keys and certificates. We use the openssl command-line tool. On Linux, it’s likely already installed – if not, install the openssl package of your distribution. On Windows it’s a bit trickier, see this tutorial;
Like with every regular HTTPS server, we need to generate a server certificate. For the sake of brevity, we use a self-signed certificate here — in real life, you probably want to use a well-known certificate authority, such as Let’s Encrypt.
To generate a self-signed certificate (in our case, without encryption):
$ openssl req -x509 -newkey rsa:4096 -keyout server_key.pem -out server_cert.pem -nodes -days 365 -subj "/CN=localhost/O=Client\ Certificate\ Demo"
This is actually a three-step process combined into one command:
Create a new 4096bit RSA key and save it to server_key.pem, without DES encryption (-newkey, -keyout and -nodes)
Create a Certificate Signing Request for a given subject, valid for 365 days (-days, -subj)
Sign the CSR using the server key, and save it to server_cert.pem as an X.509 certificate (-x509, -out)
We could have also done this with tree commands, openssl genrsa, openssl req and openssl x509. We used the PEM format (the default setting), which is a base64-encoded text file with a ----- BEGIN/END CERTIFICATE/PRIVATE KEY ----- header and footer. Another option would be the DER format, which uses binary encoding. There is a bit of a confusion what the file extension should refer to: it’s also common to use .key or .crt, referring to the contents of the file rather than the encoding (in which case they can contain both DER- and PEM-encoded data).

Configuring the Node.js HTTP server
Let’s add our server key and certificate to the options object, which we pass to the HTTPS server later:
const opts = { key: fs.readFileSync('server_key.pem')
             , cert: fs.readFileSync('server_cert.pem')
Next, we instruct the HTTPS server to request a client certificate from the user
, requestCert: true
Then we tell it to accept requests with no valid certificate. We need this to handle invalid connections as well (for example to display an error message), otherwise, they would just get a cryptic HTTPS error message from the browser (ERR_BAD_SSL_CLIENT_AUTH_CERT to be precise)
, rejectUnauthorized: false

Finally, we supply a list of CA certificates that we consider valid. For now, we sign client certificates with our own server key, so it will be the same as our server certificate.
, ca: [ fs.readFileSync('server_cert.pem') ]
             }
Then we create our app. We use express only for routeing here — we could use the passport middleware as well, with a strategy for client certificates, but for now, we keep things simple.
const app = express()
We add our “landing page” first. This is unprotected, so everyone will see it whether they present a client cert or not.
app.get('/', (req, res) => {
	res.send('<a href="authenticate">Log in using client certificate</a>')
})

Then we add our protected endpoint: it just displays information about the user and the validity of their certificate. We can get the certificate information from the HTTPS connection handle:
app.get('/authenticate', (req, res) => {
	const cert = req.connection.getPeerCertificate()
The req.client.authorized flag will be true if the certificate is valid and was issued by a CA we white-listed earlier in opts.ca. We display the name of our user (CN = Common Name) and the name of the issuer, which is localhost.
if (req.client.authorized) {
		res.send(`Hello ${cert.subject.CN}, your certificate was issued by ${cert.issuer.CN}!`)

They can still provide a certificate which is not accepted by us. Unfortunately, the cert object will be an empty object instead of null if there is no certificate at all, so we have to check for a known field rather than truthiness.
} else if (cert.subject) {
		res.status(403)
		   .send(`Sorry ${cert.subject.CN}, certificates from ${cert.issuer.CN} are not welcome here.`)
And last, they can come to us with no certificate at all:
} else {
		res.status(401)
		   .send(`Sorry, but you need to provide a client certificate to continue.`)
	}
})

Let’s create our HTTPS server and we’re ready to go.
https.createServer(opts, app).listen(9999)
Then we can start our server with npm i && node server.js.

Setting up client certificates
If we try to “log in” to our site now, we get a 401 response, because we don’t have any client certificates yet. To test our setup, we create two certificates for our two users, Alice and Bob. Alice is nice as she has a valid certificate issued by us, while Bob is nasty and tries to log in using a self-signed certificate.
To create a key and a Certificate Signing Request for Alice and Bob we can use the following command:
$ openssl req -newkey rsa:4096 -keyout alice_key.pem -out alice_csr.pem -nodes -days 365 -subj "/CN=Alice"
$ openssl req -newkey rsa:4096 -keyout bob_key.pem -out bob_csr.pem -nodes -days 365 -subj "/CN=Bob"
We sign Alice’s CSR with our key and save it as a certificate. Here, we act as a Certificate Authority, so we supply our certificate and key via the -CA parameters:
$ openssl x509 -req -in alice_csr.pem -CA server_cert.pem -CAkey server_key.pem -out alice_cert.pem -set_serial 01 -days 365
Bob doesn’t believe in authority, so he just signs his certificate on his own:
$ openssl x509 -req -in bob_csr.pem -signkey bob_key.pem -out bob_cert.pem -days 365

Trying to get in
To use these certificates in our browser, we need to bundle them in PKCS#12 format. That will contain both the private key and the certificate, thus the browser can use it for encryption. For Alice, we add the -clcerts option, which excludes the CA certificate from the bundle. Since we issued the certificate, we already have the certificate: we don’t need to include it in Alice’s certificate as well. You can also password-protect the certificate.
$ openssl pkcs12 -export -clcerts -in alice_cert.pem -inkey alice_key.pem -out alice.p12
$ openssl pkcs12 -export -in bob_cert.pem -inkey bob_key.pem -out bob.p12
We can import these private keys to the browser. In Firefox, go to Preferences -> Advanced -> View Certificates -> Import, and choose both files.
If you open https://localhost:9999 in the browser now, a dialog will come up to choose a certificate. Note that only Alice’s certificate is in the list: that’s because the browser already knows that only certs issued by us will be accepted (because we advertise it using the opts.ca list). If you continue, you’ll see our success message with the details of Alice.

This is only a browser limitation, you can still try to get in with Bob’s cert using cURL:
$ curl --insecure --cert bob.p12 --cert-type p12 https://localhost:9999/authenticate
And see that Bob’s not welcome here!
Of course this solution isn’t practical in real life: we don’t want to genereate keys for our users via the command line and have them installing them into their browsers manually. In the next article, we’ll see how we can generate new client certificates dynamically and install them seamlessly to the users’ browser.
To try this server, there clone this post’s github repo, where you can also find the keys and certificates.
```

#### 1.10.6.2 https://intown.biz/2016/11/22/node-client-auth/

```text
USE SSL CLIENT AUTHENTICATION WITH NODE.JS AND EXPRESS
repo: https://github.com/mmendelson222/https-demo

step by step:
Create a signing key (CA)
Everything starts with a signing key, which can be created with a command similar to this:

$ openssl req -new -x509 -days 365 -keyout ca-key.pem -out ca-crt.pem
The resulting cert and key can then be used to sign other certificates. Creating a self signed cert is similar.

Create a signed certificate
Creating a signed certificate is a multi-step process. First you’ll need a signing key, as generated above.

export CERT=server
export CA_NAME=ca
#generating private key for server
openssl genrsa -out $CERT-key.pem 4096
#generate a signing request
openssl req -new -sha256 -config $CERT.cnf -key $CERT-key.pem -out $CERT-csr.pem
#perform the signing
openssl x509 -req -days 365 -in $CERT-csr.pem -CA $CA_NAME-crt.pem -CAkey $CA_NAME-key.pem -CAcreateserial -out $CERT-crt.pem
The initial command (genrsa) generates public and private keys. The third command’s final product, server-crt.pem, is used along with the private key to run ssh in express.

Set up https
To start, your express app must be running https, so you’ll need to have (or generate) a public and private key for that. Here is an example of how to set that up:



var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
var options = {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-crt.pem'),
};
app.use(function (req, res, next) {
    res.writeHead(200);
    res.end("hello world\n");
    next();
});
var listener = https.createServer(options, app).listen(4433, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});
Test https

$ node app
Express HTTPS server listening on port 4433
Test using curl in another window. Note that we use -k to bypass certificate validation.

$ curl https://127.0.0.1:4433 -k
hello world
Set up client authentication
Once you have ssh cooperating, you can add client auth. requestCert will require the client (e.g. curl, browser) to send a cert. rejectUnauthorized=false allows us to handle validation ourselves.

If you’re using a browser,

You’ll notice that now we have the client auth certificate. If this was created as a CA, then ANY certificate which is signed by this one will validate.

var options = {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-crt.pem'),
    ca: fs.readFileSync('certs/ca.pem'), #client auth ca OR cert
    requestCert: true,                   #new
    rejectUnauthorized: false            #new
};
Here’s how we handle the validation:

app.use(function (req, res, next) {
   if (!req.client.authorized) {
       return res.status(401).send('User is not authorized');
   }
   #examine the cert itself, and even validate based on that!
   var cert = req.socket.getPeerCertificate();
   if (cert.subject) {
       console.log(cert.subject.CN);
   }
   next();
});
Test client authentication
# Access the site using the client certificate created above.
curl -v -s -k --key certs/client1-key.pem --cert certs/client1-crt.pem https://localhost:4433
Test client authentication with a browser
Add the client pfx file to your certificate store. If you’re using a newly created CA, you might need to add its pfx as well. If you’re not presented with a dialog box in step 3, this is likely the problem.
Browse to https://localhost:4433.
You should be presented with a dialog box. Choose the client certificate.
Note that if you change the certificate, you will need to completely close Chrome (and possibly need to kill the task) in order to see the dialog again.

id=__nodejs_client_certificate_authentication__
```

#### 1.10.6.3 My example

```text
/Users/<user>/work/code/nodejs/net/x509server

id=__prepare_x509_certs_node__
```

#### 1.10.6.3.1 Prepare certificates

```text
All passwords. 1234
- server side

    -- server ca pvk+certificate 
    openssl req -new -x509 -days 365 -keyout server-ca-key.pem -out server-ca-crt.pem

    -- instead of answering prompts can use cnf. ex
    $ cat server.cnf 
[ req ]
default_bits           = 4096
days                   = 9999
distinguished_name     = req_distinguished_name
attributes             = req_attributes
prompt                 = no
x509_extensions        = v3_ca

[ req_distinguished_name ]
C                      = US
ST                     = VA
L                      = Herndon
O                      = Mycorp Inc
OU                     = devops
CN                     = localhost
emailAddress           = administrator@mycorp.com

[ req_attributes ]
challengePassword      = password

[ v3_ca ]
authorityInfoAccess = @issuer_info

[ issuer_info ]
OCSP;URI.0 = http://ocsp.example.com/
caIssuers;URI.0 = http://example.com/ca.cert


    -- create a signed server certificate
export CERT=server
export CA_NAME=server-ca
#generating private key for server
openssl genrsa -out $CERT-key.pem 4096
#generate a signing request
openssl req -new -sha256 -config $CERT.cnf -key $CERT-key.pem -out $CERT-csr.pem
#perform the signing
openssl x509 -req -days 365 -in $CERT-csr.pem -CA $CA_NAME-crt.pem -CAkey $CA_NAME-key.pem -CAcreateserial -out $CERT-crt.pem

    -- 
-client side
    -- client ca pvk+certificate 
    openssl req -new -x509 -days 365 -keyout client-ca-key.pem -out client-ca-crt.pem

    -- instead of answering prompts can use cnf. ex
    $ cat client.cnf 
[ req ]
default_bits           = 4096
days                   = 9999
distinguished_name     = req_distinguished_name
attributes             = req_attributes
prompt                 = no
x509_extensions        = v3_ca

[ req_distinguished_name ]
C                      = US
ST                     = VA
L                      = Yosi
O                      = SAP
OU                     = dev
CN                     = localhost
emailAddress           = <email>

[ req_attributes ]
challengePassword      = 1234

[ v3_ca ]
authorityInfoAccess = @issuer_info

[ issuer_info ]
OCSP;URI.0 = http://ocsp.example.com/
caIssuers;URI.0 = http://example.com/ca.cert


    -- create a signed client certificate
export CERT=client
export CA_NAME=client-ca
#generating private key for client
openssl genrsa -out $CERT-key.pem 4096
#generate a signing request
openssl req -new -sha256 -config $CERT.cnf -key $CERT-key.pem -out $CERT-csr.pem
#perform the signing
openssl x509 -req -days 365 -in $CERT-csr.pem -CA $CA_NAME-crt.pem -CAkey $CA_NAME-key.pem -CAcreateserial -out $CERT-crt.pem

package to pfx
openssl pkcs12 -export -in client-crt.pem -inkey client-key.pem -out client-crt.pfx
```

#### 1.10.6.3.2 setup node server app

```text
-- w/o client cert atn
$ cat app.js 
const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const options = {
    key: fs.readFileSync('x509/server-key.pem'),
    cert: fs.readFileSync('x509/server-crt.pem'),
};
app.use(function (req, res, next) {
    res.writeHead(200);
    res.end("hello world\n");
    next();
});
var listener = https.createServer(options, app).listen(4433, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});
-- $ node app.js 
Express HTTPS server listening on port 4433

-- $ curl https://127.0.0.1:4433 -k
hello world

-- Now add certificate authentication
$ cat app.js 
const express = require('express');
const fs = require('fs');
const https = require('https');
const app = express();
const options = {
    key: fs.readFileSync('x509/server-key.pem'),
    cert: fs.readFileSync('x509/server-crt.pem'),
    ca: fs.readFileSync('x509/client-ca-crt.pem'),
    requestCert: true,
    rejectUnauthorized: false,
};
app.use(function (req, res, next) {
    if (! req.client.authorized) {
        return res.status(401).send('User is not authorized');
    }
    const cert = req.socket.getPeerCertificate();
    if (cert.subject) {
        console.log('cert subject', cert.subject.CN);
        console.log(JSON.stringify(cert, null, 4));
    }
    res.writeHead(200);
    res.end("hello world\n");
    next();
});
var listener = https.createServer(options, app).listen(4433, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});

$ node app.js 
Express HTTPS server listening on port 4433
cert subject localhost
```

#### 1.10.6.3.3 client

#### 1.10.6.3.3.1 curl x509 client

```text
-- $ curl -v -s -k --key x509/client-key.pem --cert x509/client-crt.pem https://localhost:4433
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 4433 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/cert.pem
  CApath: none
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Request CERT (13):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Certificate (11):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS handshake, CERT verify (15):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
* ALPN, server accepted to use http/1.1
* Server certificate:
*  subject: C=US; ST=VA; L=Herndon; O=Mycorp Inc; OU=devops; CN=localhost; emailAddress=administrator@mycorp.com
*  start date: Jan 26 15:53:42 2021 GMT
*  expire date: Jan 26 15:53:42 2022 GMT
*  issuer: C=IL; ST=Some-State; L=Hadera; O=SAP; CN=server ca; emailAddress=<email>
*  SSL certificate verify result: unable to get local issuer certificate (20), continuing anyway.
> GET / HTTP/1.1
> Host: localhost:4433
> User-Agent: curl/7.64.1
> Accept: */*
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Date: Wed, 27 Jan 2021 09:35:01 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
< 
hello world
* Connection #0 to host localhost left intact
* Closing connection 0
```

#### 1.10.6.3.3.2 ssl x509 client (only connect, no http request)

```text
openssl s_client -CAfile x509/server-ca-crt.pem -cert x509/client-crt.pem -key x509/client-key.pem -connect localhost:4433 < /dev/null
```

#### 1.10.6.3.3.3 axios x509 client

```text
$ cat axio_client.js | pbcopy
const fs = require('fs');
const https = require('https');
const axios = require('axios');

// https://nodejs.org/api/https.html#https_https_request_options_callback...
const httpsAgent = new https.Agent({
    cert: fs.readFileSync(__dirname + '/x509/client-crt.pem'),
    key: fs.readFileSync(__dirname + '/x509/client-key.pem'),
    rejectUnauthorized: false, // required to prevent UNABLE_TO_VERIFY_LEAF_SIGNATURE error
    passphrase: '1234',
    // pfx: fs.readFileSync(__dirname + '/x509/client-crt.pfx'),
    // ca: [fs.readFileSync(__dirname + '/x509/server-ca-crt.pem')],
    // maxVersion: 'TLSv1.3',
    // minVersion: 'TLSv1.3',
     ca: fs.readFileSync('x509/server-ca-crt.pem'),
});
axios.get('https://localhost:4433', { httpsAgent }).then((response) => {
    console.log(response.data);
}, (error) => {
    console.log(error.code);
});

node axio_client.js
hello world
```

#### 1.10.6.3.3.4 request x509 client

```text
$ cat client.js | pbcopy
'use strict';

const request = require('request');
const fs = require('fs');

var options = {
    // rejectUnauthorized: false, // required to prevent UNABLE_TO_VERIFY_LEAF_SIGNATURE error, if the server CA is ok it is not required
    method: "GET",
    url: 'https://localhost:4433',
    headers: {
        "content-type": "application/json",
    },
    agentOptions: {
        // either client cert+pvk or pfx...
        cert: fs.readFileSync(__dirname + '/x509/client-crt.pem'),
        key: fs.readFileSync(__dirname + '/x509/client-key.pem'),
        // pfx: fs.readFileSync(__dirname + '/x509/client-crt.pfx'),

        passphrase: '1234',
        ca: [fs.readFileSync(__dirname + '/x509/server-ca-crt.pem')],
    }
};

request.get(options, (error, response, body) => {
    // console.log(error);
    // console.log(response);
    console.log(body);
});

$ node client.js
hello world
```

#### 1.10.6.3.3.5 capture

```text
$ tcpdump -i lo0 -s 0 -w x509.pcap
open pcap:

                    1.10.6.3.3.6
```

#### 1.10.6.3.4 Troubelshooting guide

```text
https://levelup.gitconnected.com/how-to-resolve-certificate-errors-in-nodejs-app-involving-ssl-calls-781ce48daded

                1.10.6.3.5
```

#### 1.10.6.4 Client side certificate based authentication

#### 1.10.6.4.1 axios, Client side certificate based authentication

```text
https://stackoverflow.com/questions/46894187/nodejs-request-to-a-web-service-with-p12-certificate
https://smallstep.com/hello-mtls/doc/client/axios
```

#### 1.10.6.4.1.1 Examples

```text
a. send cert+key+ca separately
const fs = require('fs');
const https = require('https');
const axios = require('axios');

// https://nodejs.org/api/https.html#https_https_request_options_callback...
const httpsAgent = new https.Agent({
  cert: fs.readFileSync('client.crt'),
  key: fs.readFileSync('client.key'),
  ca: fs.readFileSync('ca.crt'),
});

const result = await axios.get('https://myserver.internal.net:443', { httpsAgent });
// do something with the result

b.  send cert+key+ca as pkcs pfx
'use strict';

const request = require('request');
const fs = require('fs');

var options = {
    url: 'https://some-url/api',
    headers: {
        "content-type": "application/json",
    },
    agentOptions: {
        pfx: fs.readFileSync(__dirname + '/certs/myCert.p12'),
        passphrase: ''
    }
};

request.get(options, (error, response, body) => {
    console.log(error);
    console.log(response);
    console.log(body);
});

c.

                    1.10.6.4.1.2
```

#### 1.10.6.4.2 https agent

```text
https://nodejs.org/api/https.html#https_https_request_options_callback

looks like pfx is supported. see
- server side
const https = require('https');
const fs = require('fs');

const options = {
  pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
  passphrase: 'sample'
};

https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);

- client side

-
                1.10.6.4.3
```

#### 1.10.6.5 DER files

#### 1.10.6.5.1 read, write, compare DER certificate files

```text
$ cat DER_read_write.js 
const fs = require('fs');

const derBinary = fs.readFileSync(__dirname + '/x509/server-ca-crt.der');
console.log('Read DER in binary format. lenght', derBinary.length);

fs.writeFileSync(__dirname + '/x509/server-ca-crt2.der', derBinary);
const der2Binary = fs.readFileSync(__dirname + '/x509/server-ca-crt2.der');

function compare_buffers(b1, b2) {
    if (b1.length !== b2.length) {
        return false;
    }

    for (let index = 0; index < b1.length; index++) {
        if (b1[index] !== b2[index]) {
            return false;
        } 
    }
    return true 
}

const same = compare_buffers(der2Binary, derBinary);
console.log(`It is ${same} that input and output DER files are equal`);



$ node DER_read_write.js 
Read DER in binary format. lenght 979
It is true that input and output DER files are equal
                1.10.6.5.2

            1.10.6.6
        1.10.7
```
