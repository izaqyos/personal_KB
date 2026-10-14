---
type: reference
title: official documentation
description: "Notes on the official NestJS documentation: first steps, controllers, providers and modules."
tags: [nestjs, backend, typescript, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#4"
---

# official documentation

[↑ nestjs-kb](/kb-nestjs/README.md)

## 4.1 overview

### 4.1.1 first steps

```text
In this set of articles, you'll learn the core fundamentals of Nest. To get familiar with the essential building blocks of Nest applications, we'll build a basic CRUD application with features that cover a lot of ground at an introductory level.

Language#
We're in love with TypeScript, but above all - we love Node.js. That's why Nest is compatible with both TypeScript and pure JavaScript. Nest takes advantage of the latest language features, so to use it with vanilla JavaScript we need a Babel compiler.

We'll mostly use TypeScript in the examples we provide, but you can always switch the code snippets to vanilla JavaScript syntax (simply click to toggle the language button in the upper right hand corner of each snippet).

Prerequisites#
Please make sure that Node.js (>= 8.9.0) is installed on your operating system.

Setup#
Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:


$ npm i -g @nestjs/cli
$ nest new project-name
The project directory will be created, node modules and a few other boilerplate files will be installed, and a src/ directory will be created and populated with several core files.

src
app.controller.ts
app.module.ts
main.ts
Here's a brief overview of those core files:

app.controller.ts	Basic controller sample with a single route.
app.module.ts	The root module of the application.
main.ts	The entry file of the application which uses the core function NestFactory to create a Nest application instance.
The main.ts includes an async function, which will bootstrap our application:

main.ts JS

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
To create a Nest application instance, we use the core NestFactory class. NestFactory exposes a few static methods that allow creating an application instance. The create() method returns an application object, which fulfills the INestApplication interface. This object provides a set of methods which are described in the coming chapters. In the main.ts example above, we simply start up our HTTP listener, which lets the application await inbound HTTP requests.

Note that a project scaffolded with the Nest CLI creates an initial project structure that encourages developers to follow the convention of keeping each module in its own dedicated directory.

Platform#
Nest aims to be a platform-agnostic framework. Platform independence makes it possible to create reusable logical parts that developers can take advantage of across several different types of applications. Technically, Nest is able to work with any Node HTTP framework once an adapter is created. There are two HTTP platforms supported out-of-the-box: express and fastify. You can choose the one that best suits your needs.

platform-express	Express is a well-known minimalist web framework for node. It's a battle tested, production-ready library with lots of resources implemented by the community. The @nestjs/platform-express package is used by default. Many users are well served with Express, and need take no action to enable it.
platform-fastify	Fastify is a high performance and low overhead framework highly focused on providing maximum efficiency and speed. Read how to use it here.
Whichever platform is used, it exposes its own application interface. These are seen respectively as NestExpressApplication and NestFastifyApplication.

When you pass a type to the NestFactory.create() method, as in the example below, the app object will have methods available exclusively for that specific platform. Note, however, you don't need to specify a type unless you actually want to access the underlying platform API.


const app = await NestFactory.create<NestExpressApplication>(AppModule);
Running the application#
Once the installation process is complete, you can run the following command at your OS command prompt to start the application listening for inbound HTTP requests:


$ npm run start
This command starts the app with the HTTP server listening on the port defined in the src/main.ts file. Once the application is running, open your browser and navigate to http://localhost:3000/. You should see the Hello World! message.
```

### 4.1.2 controllers

```text
Controllers are responsible for handling incoming requests and returning responses to the client.


A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

In order to create a basic controller, we use classes and decorators. Decorators associate classes with required metadata and enable Nest to create a routing map (tie requests to the corresponding controllers).

Routing#
In the following example we'll use the @Controller() decorator, which is required to define a basic controller. We'll specify an optional route path prefix of cats. Using a path prefix in a @Controller() decorator allows us to easily group a set of related routes, and minimize repetitive code. For example, we may choose to group a set of routes that manage interactions with a customer entity under the route /customers. In that case, we could specify the path prefix customers in the @Controller() decorator so that we don't have to repeat that portion of the path for each route in the file.

cats.controller.ts JS

import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
HINT
To create a controller using the CLI, simply execute the $ nest g controller cats command.
The @Get() HTTP request method decorator before the findAll() method tells Nest to create a handler for a specific endpoint for HTTP requests. The endpoint corresponds to the HTTP request method (GET in this case) and the route path. What is the route path? The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the request decorator. Since we've declared a prefix for every route ( cats), and haven't added any path information in the decorator, Nest will map GET /cats requests to this handler. As mentioned, the path includes both the optional controller path prefix and any path string declared in the request method decorator. For example, a path prefix of customers combined with the decorator @Get('profile') would produce a route mapping for requests like GET /customers/profile.

In our example above, when a GET request is made to this endpoint, Nest routes the request to our user-defined findAll() method. Note that the method name we choose here is completely arbitrary. We obviously must declare a method to bind the route to, but Nest doesn't attach any significance to the method name chosen.

This method will return a 200 status code and the associated response, which in this case is just a string. Why does that happen? To explain, we'll first introduce the concept that Nest employs two different options for manipulating responses:

Standard (recommended)	Using this built-in method, when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON. When it returns a JavaScript primitive type (e.g., string, number, boolean), however, Nest will send just the value without attempting to serialize it. This makes response handling simple: just return the value, and Nest takes care of the rest. 

Furthermore, the response's status code is always 200 by default, except for POST requests which use 201. We can easily change this behavior by adding the @HttpCode(...) decorator at a handler-level (see Status codes).
Library-specific	We can use the library-specific (e.g., Express) response object, which can be injected using the @Res() decorator in the method handler signature (e.g., findAll(@Res() response)). With this approach, you have the ability (and the responsibility), to use the native response handling methods exposed by that object. For example, with Express, you can construct responses using code like response.status(200).send()
WARNING
You cannot use both approaches at the same time. Nest detects when the handler is using either @Res() or @Next(), indicating you have chosen the library-specific option. If both approaches are used at the same time, the Standard approach is automatically disabled for this single route and will no longer work as expected.
Request object#
Handlers often need access to the client request details. Nest provides access to the request object of the underlying platform (Express by default). We can access the request object by instructing Nest to inject it by adding the @Req() decorator to the handler's signature.

cats.controller.ts JS

import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }
}
HINT
In order to take advantage of express typings (as in the request: Request parameter example above), install @types/express package.
The request object represents the HTTP request and has properties for the request query string, parameters, HTTP headers, and body (read more here). In most cases, it's not necessary to grab these properties manually. We can use dedicated decorators instead, such as @Body() or @Query(), which are available out of the box. Below is a list of the provided decorators and the plain platform-specific objects they represent.

@Request()	req
@Response(), @Res()*	res
@Next()	next
@Session()	req.session
@Param(key?: string)	req.params / req.params[key]
@Body(key?: string)	req.body / req.body[key]
@Query(key?: string)	req.query / req.query[key]
@Headers(name?: string)	req.headers / req.headers[name]
@Ip()	req.ip
* For compatibility with typings across underlying HTTP platforms (e.g., Express and Fastify), Nest provides @Res() and @Response() decorators. @Res() is simply an alias for @Response(). Both directly expose the underlying native platform response object interface. When using them, you should also import the typings for the underlying library (e.g., @types/express) to take full advantage. Note that when you inject either @Res() or @Response() in a method handler, you put Nest into Library-specific mode for that handler, and you become responsible for managing the response. When doing so, you must issue some kind of response by making a call on the response object (e.g., res.json(...) or res.send(...)), or the HTTP server will hang.

HINT
To learn how to create your own custom decorators, visit this chapter.
Resources#
Earlier, we defined an endpoint to fetch the cats resource (GET route). We'll typically also want to provide an endpoint that creates new records. For this, let's create the POST handler:

cats.controller.ts JS

import { Controller, Get, Post } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
It's that simple. Nest provides the rest of the standard HTTP request endpoint decorators in the same fashion - @Put(), @Delete(), @Patch(), @Options(), @Head(), and @All(). Each represents its respective HTTP request method.

Route wildcards#
Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, and will match any combination of characters.


@Get('ab*cd')
findAll() {
  return 'This route uses a wildcard';
}
The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.

Status code#
As mentioned, the response status code is always 200 by default, except for POST requests which are 201. We can easily change this behavior by adding the @HttpCode(...) decorator at a handler level.


@Post()
@HttpCode(204)
create() {
  return 'This action adds a new cat';
}
HINT
Import HttpCode from the @nestjs/common package.
Often, your status code isn't static but depends on various factors. In that case, you can use a library-specific response (inject using @Res()) object (or, in case of an error, throw an exception).

Headers#
To specify a custom response header, you can either use a @Header() decorator or a library-specific response object (and call res.header() directly).


@Post()
@Header('Cache-Control', 'none')
create() {
  return 'This action adds a new cat';
}
HINT
Import Header from the @nestjs/common package.
Redirection#
To redirect a response to a specific URL, you can either use a @Redirect() decorator or a library-specific response object (and call res.redirect() directly).

@Redirect() takes a required url argument, and an optional statusCode argument. The statusCode defaults to 302 (Found) if omitted.


@Get()
@Redirect('https://nestjs.com', 301)
Sometimes you may want to determine the HTTP status code or the redirect URL dynamically. Do this by returning an object from the route handler method with the shape:


{
  "url": string,
  "statusCode": number
}
Returned values will override any arguments passed to the @Redirect() decorator. For example:


@Get('docs')
@Redirect('https://docs.nestjs.com', 302)
getDocs(@Query('version') version) {
  if (version && version === '5') {
    return { url: 'https://docs.nestjs.com/v5/' };
  }
}

path param
Route parameters#
Routes with static paths won't work when you need to accept dynamic data as part of the request (e.g., GET /cats/1 to get cat with id 1). In order to define routes with parameters, we can add route parameter tokens in the path of the route to capture the dynamic value at that position in the request URL. The route parameter token in the @Get() decorator example below demonstrates this usage. Route parameters declared in this way can be accessed using the @Param() decorator, which should be added to the method signature.

JS

@Get(':id')
findOne(@Param() params): string {
  console.log(params.id);
  return `This action returns a #${params.id} cat`;
}
@Param() is used to decorate a method parameter (params in the example above), and makes the route parameters available as properties of that decorated method parameter inside the body of the method. As seen in the code above, we can access the id parameter by referencing params.id. You can also pass in a particular parameter token to the decorator, and then reference the route parameter directly by name in the method body.

HINT
Import Param from the @nestjs/common package.
JS

@Get(':id')
findOne(@Param('id') id): string {
  return `This action returns a #${id} cat`;
}
Scopes#
For people coming from different programming language backgrounds, it might be unexpected to learn that in Nest, almost everything is shared across incoming requests. We have a connection pool to the database, singleton services with global state, etc. Remember that Node.js doesn't follow the request/response Multi-Threaded Stateless Model in which every request is processed by a separate thread. Hence, using singleton instances is fully safe for our applications.

However, there are edge-cases when request-based lifetime of the controller may be the desired behavior, for instance per-request caching in GraphQL applications, request tracking or multi-tenancy. Learn how to control scopes here.

Asynchronicity#
We love modern JavaScript and we know that data extraction is mostly asynchronous. That's why Nest supports and works well with async functions.

HINT
Learn more about async / await feature here
Every async function has to return a Promise. This means that you can return a deferred value that Nest will be able to resolve by itself. Let's see an example of this:

cats.controller.ts JS

@Get()
async findAll(): Promise<any[]> {
  return [];
}
The above code is fully valid. Furthermore, Nest route handlers are even more powerful by being able to return RxJS observable streams. Nest will automatically subscribe to the source underneath and take the last emitted value (once the stream is completed).

cats.controller.ts JS

@Get()
findAll(): Observable<any[]> {
  return of([]);
}
Both of the above approaches work and you can use whatever fits your requirements.

Request payloads#
Our previous example of the POST route handler didn't accept any client params. Let's fix this by adding the @Body() decorator here.

But first (if you use TypeScript), we need to determine the DTO (Data Transfer Object) schema. A DTO is an object that defines how the data will be sent over the network. We could determine the DTO schema by using TypeScript interfaces, or by simple classes. Interestingly, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime.

Let's create the CreateCatDto class:

create-cat.dto.ts JS

export class CreateCatDto {
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}
It has only three basic properties. Thereafter we can use the newly created DTO inside the CatsController:

cats.controller.ts JS

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  return 'This action adds a new cat';
}
Handling errors#
There's a separate chapter about handling errors (i.e., working with exceptions) here.

Full resource sample#
Below is an example that makes use of several of the available decorators to create a basic controller. This controller exposes a couple of methods to access and manipulate internal data.

cats.controller.ts JS

import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
Getting up and running#
With the above controller fully defined, Nest still doesn't know that CatsController exists and as a result won't create an instance of this class.

Controllers always belong to a module, which is why we include the controllers array within the @Module() decorator. Since we haven't yet defined any other modules except the root AppModule, we'll use that to introduce the CatsController:

app.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
We attached the metadata to the module class using the @Module() decorator, and Nest can now easily reflect which controllers have to be mounted.

Appendix: Library-specific approach#
So far we've discussed the Nest standard way of manipulating responses. The second way of manipulating the response is to use a library-specific response object. In order to inject a particular response object, we need to use the @Res() decorator. To show the differences, let's rewrite the CatsController to the following:

JS

import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
     res.status(HttpStatus.OK).json([]);
  }
}
Though this approach works, and does in fact allow for more flexibility in some ways by providing full control of the response object (headers manipulation, library-specific features, and so on), it should be used with care. In general, the approach is much less clear and does have some disadvantages. The main disadvantages are that you lose compatibility with Nest features that depend on Nest standard response handling, such as Interceptors and the @HttpCode() decorator. Also, your code can become platform-dependent (as underlying libraries may have different APIs on the response object), and harder to test (you'll have to mock the response object, etc.).

As a result, the Nest standard approach should always be preferred when possible.
```

### 4.1.3 Providers

```text
Providers

Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can inject dependencies; this means objects can create various relationships with each other, and the function of "wiring up" instances of objects can largely be delegated to the Nest runtime system. A provider is simply a class annotated with an @Injectable() decorator.


In the previous chapter, we built a simple CatsController. Controllers should handle HTTP requests and delegate more complex tasks to providers. Providers are plain JavaScript classes with an @Injectable() decorator preceding their class declaration.

HINT
Since Nest enables the possibility to design and organize dependencies in a more OO-way, we strongly recommend following the SOLID principles.
Services#
Let's start by creating a simple CatsService. This service will be responsible for data storage and retrieval, and is designed to be used by the CatsController, so it's a good candidate to be defined as a provider. Thus, we decorate the class with @Injectable().

cats.service.ts JS

import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
HINT
To create a service using the CLI, simply execute the $ nest g service cats command.
Our CatsService is a basic class with one property and two methods. The only new feature is that it uses the @Injectable() decorator. The @Injectable() decorator attaches metadata, which tells Nest that this class is a Nest provider. By the way, this example also uses a Cat interface, which probably looks something like this:


export interface Cat {
  name: string;
  age: number;
  breed: string;
}
Now that we have a service class to retrieve cats, let's use it inside the CatsController:

cats.controller.ts JS

import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }
}
The CatsService is injected through the class constructor. Notice the use of the private readonly syntax. This shorthand allows us to both declare and initialize the catsService member immediately in the same location.

Dependency injection#
Nest is built around the strong design pattern commonly known as Dependency injection. We recommend reading a great article about this concept in the official Angular documentation.

In Nest, thanks to TypeScript capabilities, it's extremely easy to manage dependencies because they are resolved just by type. In the example below, Nest will resolve the catsService by creating and returning an instance of CatsService (or, in the normal case of a singleton, returning the existing instance if it has already been requested elsewhere). This dependency is resolved and passed to your controller's constructor (or assigned to the indicated property):


constructor(private readonly catsService: CatsService) {}
Scopes#
Providers normally have a lifetime ("scope") synchronized with the application lifecycle. When the application is bootstrapped, every dependency must be resolved, and therefore every provider has to be instantiated. Similarly, when the application shuts down, each provider will be destroyed. However, there are ways to make your provider lifetime request-scoped as well. You can read more about these techniques here.

Custom providers#
Nest has a built-in inversion of control ("IoC") container that resolves relationships between providers. This feature underlies the dependency injection feature described above, but is in fact far more powerful than what we've described so far. The @Injectable() decorator is only the tip of the iceberg, and is not the only way to define providers. In fact, you can use plain values, classes, and either asynchronous or synchronous factories. More examples are provided here.

Optional providers#
Occasionally, you might have dependencies which do not necessarily have to be resolved. For instance, your class may depend on a configuration object, but if none is passed, the default values should be used. In such a case, the dependency becomes optional, because lack of the configuration provider wouldn't lead to errors.

To indicate a provider is optional, use the @Optional() decorator in the constructor's signature.


import { Injectable, Optional, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}
}
Note that in the example above we are using a custom provider, which is the reason we include the HTTP_OPTIONS custom token. Previous examples showed constructor-based injection indicating a dependency through a class in the constructor. Read more about custom providers and their associated tokens here.

Property-based injection#
The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method. In some very specific cases, property-based injection might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling super() in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the @Inject() decorator at the property level.


import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class HttpService<T> {
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
WARNING
If your class doesn't extend another provider, you should always prefer using constructor-based injection.
Provider registration#
Now that we have defined a provider (CatsService), and we have a consumer of that service (CatsController), we need to register the service with Nest so that it can perform the injection. We do this by editing our module file (app.module.ts) and adding the service to the providers array of the @Module() decorator.

app.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class AppModule {}
Nest will now be able to resolve the dependencies of the CatsController class.

This is how our directory structure should look now:

src
    cats
        dto
         create-cat.dto.ts
        interfaces
         cat.interface.ts
        cats.service.ts
        cats.controller.ts
    app.module.ts
    main.ts
```

### 4.1.4 modules

```text
        Modules

A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.


Each application has at least one module, a root module. The root module is the starting point Nest uses to build the application graph - the internal data structure Nest uses to resolve module and provider relationships and dependencies. While very small applications may theoretically have just the root module, this is not the typical case. We want to emphasize that modules are strongly recommended as an effective way to organize your components. Thus, for most applications, the resulting architecture will employ multiple modules, each encapsulating a closely related set of capabilities.

The @Module() decorator takes a single object whose properties describe the module:

providers	the providers that will be instantiated by the Nest injector and that may be shared at least across this module
controllers	the set of controllers defined in this module which have to be instantiated
imports	the list of imported modules that export the providers which are required in this module
exports	the subset of providers that are provided by this module and should be available in other modules which import this module
The module encapsulates providers by default. This means that it's impossible to inject providers that are neither directly part of the current module nor exported from the imported modules. Thus, you may consider the exported providers from a module as the module's public interface, or API.

Feature modules#
The CatsController and CatsService belong to the same application domain. As they are closely related, it makes sense to move them into a feature module. A feature module simply organizes code relevant for a specific feature, keeping code organized and establishing clear boundaries. This helps us manage complexity and develop with SOLID principles, especially as the size of the application and/or team grow.

To demonstrate this, we'll create the CatsModule.

cats/cats.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
HINT
To create a module using the CLI, simply execute the $ nest g module cats command.
Above, we defined the CatsModule in the cats.module.ts file, and moved everything related to this module into the cats directory. The last thing we need to do is import this module into the root module (the AppModule, defined in the app.module.ts file).

app.module.ts JS

import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule {}
Here is how our directory structure looks now:

src
cats
dto
create-cat.dto.ts
interfaces
cat.interface.ts
cats.service.ts
cats.controller.ts
cats.module.ts
app.module.ts
main.ts
Shared modules#
In Nest, modules are singletons by default, and thus you can share the same instance of any provider between multiple modules effortlessly.


Every module is automatically a shared module. Once created it can be reused by any module. Let's imagine that we want to share an instance of the CatsService between several other modules. In order to do that, we first need to export the CatsService provider by adding it to the module's exports array, as shown below:

cats.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService]
})
export class CatsModule {}
Now any module that imports the CatsModule has access to the CatsService and will share the same instance with all other modules that import it as well.

Module re-exporting#
As seen above, Modules can export their internal providers. In addition, they can re-export modules that they import. In the example below, the CommonModule is both imported into and exported from the CoreModule, making it available for other modules which import this one.


@Module({
  imports: [CommonModule],
  exports: [CommonModule],
})
export class CoreModule {}
Dependency injection#
A module class can inject providers as well (e.g., for configuration purposes):

cats.module.ts JS

import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
However, module classes themselves cannot be injected as providers due to circular dependency .

Global modules#
If you have to import the same set of modules everywhere, it can get tedious. Unlike in Nest, Angularproviders are registered in the global scope. Once defined, they're available everywhere. Nest, however, encapsulates providers inside the module scope. You aren't able to use a module's providers elsewhere without first importing the encapsulating module.

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module global with the @Global() decorator.


import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
The @Global() decorator makes the module global-scoped. Global modules should be registered only once, generally by the root or core module. In the above example, the CatsService provider will be ubiquitous, and modules that wish to inject the service will not need to import the CatsModule in their imports array.

HINT
Making everything global is not a good design decision. Global modules are available to reduce the amount of necessary boilerplate. The imports array is generally the preferred way to make the module's API available to consumers.
Dynamic modules#
The Nest module system includes a powerful feature called dynamic modules. This feature enables you to easily create customizable modules that can register and configure providers dynamically. Dynamic modules are covered extensively here. In this chapter, we'll give a brief overview to complete the introduction to modules.

Following is an example of a dynamic module definition for a DatabaseModule:

JS

import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}
HINT
The forRoot() method may return a dynamic module either synchronously or asynchronously (i.e., via a Promise).
This module defines the Connection provider by default (in the @Module() decorator metadata), but additionally - depending on the entities and options objects passed into the forRoot() method - exposes a collection of providers, for example, repositories. Note that the properties returned by the dynamic module extend (rather than override) the base module metadata defined in the @Module() decorator. That's how both the statically declared Connection provider and the dynamically generated repository providers are exported from the module.

Once defined as above, the DatabaseModule can be imported and configured in the following manner:


import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
})
export class AppModule {}
If you want to in turn re-export a dynamic module, you can omit the forRoot() method call in the exports array:


import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { User } from './users/entities/user.entity';

@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
The Dynamic modules chapter covers this topic in greater detail, and includes a working example.
```

### 4.1.5 middleware

```text
Middleware

Middleware is a function which is called before the route handler. Middleware functions have access to the request and response objects, and the next() middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.


Nest middleware are, by default, equivalent to express middleware. The following description from the official express documentation describes the capabilities of middleware:

Middleware functions can perform the following tasks:
execute any code.
make changes to the request and the response objects.
end the request-response cycle.
call the next middleware function in the stack.
if the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.
You implement custom Nest middleware in either a function, or in a class with an @Injectable() decorator. The class should implement the NestMiddleware interface, while the function does not have any special requirements. Let's start by implementing a simple middleware feature using the class method.

logger.middleware.ts JS

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
Dependency injection#
Nest middleware fully supports Dependency Injection. Just as with providers and controllers, they are able to inject dependencies that are available within the same module. As usual, this is done through the constructor.

Applying middleware#
There is no place for middleware in the @Module() decorator. Instead, we set them up using the configure() method of the module class. Modules that include middleware have to implement the NestModule interface. Let's set up the LoggerMiddleware at the AppModule level.

app.module.ts JS

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
In the above example we have set up the LoggerMiddleware for the /cats route handlers that were previously defined inside the CatsController. We may also further restrict a middleware to a particular request method by passing an object containing the route path and request method to the forRoutes() method when configuring the middleware. In the example below, notice that we import the RequestMethod enum to reference the desired request method type.

app.module.ts JS

import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cats', method: RequestMethod.GET });
  }
}
HINT
The configure() method can be made asynchronous using async/await (e.g., you can await completion of an asynchronous operation inside the configure() method body).
Route wildcards#
Pattern based routes are supported as well. For instance, the asterisk is used as a wildcard, and will match any combination of characters:


forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
The 'ab*cd' route path will match abcd, ab_cd, abecd, and so on. The characters ?, +, *, and () may be used in a route path, and are subsets of their regular expression counterparts. The hyphen ( -) and the dot (.) are interpreted literally by string-based paths.

Middleware consumer#
The MiddlewareConsumer is a helper class. It provides several built-in methods to manage middleware. All of them can be simply chained in the fluent style. The forRoutes() method can take a single string, multiple strings, a RouteInfo object, a controller class and even multiple controller classes. In most cases you'll probably just pass a list of controllers separated by commas. Below is an example with a single controller:

app.module.ts JS

import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller.ts';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(CatsController);
  }
}
HINT
The apply() method may either take a single middleware, or multiple arguments to specify multiple middlewares.
Quite often we might want to exclude certain routes from having the middleware applied. When defining middleware with a class (as we have been doing so far, as opposed to using the alternative functional middleware), we can easily exclude certain routes with the exclude() method. This method takes one or more objects identifying the path and method to be excluded, as shown below:


consumer
  .apply(LoggerMiddleware)
  .exclude(
    { path: 'cats', method: RequestMethod.GET },
    { path: 'cats', method: RequestMethod.POST }
  )
  .forRoutes(CatsController);
With the example above, LoggerMiddleware will be bound to all routes defined inside CatsControllerexcept the two passed to the exclude() method. Please note that the exclude() method does not work with functional middleware (middleware defined in a function rather than in a class; see below for more details). In addition, this method doesn't exclude paths from more generic routes (e.g., wildcards). If you need that level of control, you should put your paths-restriction logic directly into the middleware and, for example, access the request's URL to conditionally apply the middleware logic.

Functional middleware#
The LoggerMiddleware class we've been using is quite simple. It has no members, no additional methods, and no dependencies. Why can't we just define it in a simple function instead of a class? In fact, we can. This type of middleware is called functional middleware. Let's transform the logger middleware from class-based into functional middleware to illustrate the difference:

logger.middleware.ts JS

export function logger(req, res, next) {
  console.log(`Request...`);
  next();
};
And use it within the AppModule:

app.module.ts JS

consumer
  .apply(logger)
  .forRoutes(CatsController);
HINT
Consider using the simpler functional middleware alternative any time your middleware doesn't need any dependencies.
Multiple middleware#
As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the apply() method:


consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
Global middleware#
If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance:


const app = await NestFactory.create(AppModule);
app.use(logger);
await app.listen(3000);
```

### 4.1.6 exception filters

```text
Exception filters

Nest comes with a built-in exceptions layer which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.


Out of the box, this action is performed by a built-in global exception filter, which handles exceptions of type HttpException (and subclasses of it). When an exception is unrecognized (is neither HttpException nor a class that inherits from HttpException), the built-in exception filter generates the following default JSON response:


{
  "statusCode": 500,
  "message": "Internal server error"
}
Throwing standard exceptions#
Nest provides a built-in HttpException class, exposed from the @nestjs/common package. For typical HTTP REST/GraphQL API based applications, it's best practice to send standard HTTP response objects when certain error conditions occur.

For example, in the CatsController, we have a findAll() method (a GET route handler). Let's assume that this route handler throws an exception for some reason. To demonstrate this, we'll hard-code it as follows:

cats.controller.ts JS

@Get()
async findAll() {
  throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
}
HINT
We used the HttpStatus here. This is a helper enum imported from the @nestjs/common package.
When the client calls this endpoint, the response looks like this:


{
  "statusCode": 403,
  "message": "Forbidden"
}
The HttpException constructor takes two required arguments which determine the response:

The response argument defines the JSON response body. It can be a string or an object as described below.
The status argument defines the HTTP status code.
By default, the JSON response body contains two properties:

statusCode: defaults to the HTTP status code provided in the status argument
message: a short description of the HTTP error based on the status
To override just the message portion of the JSON response body, supply a string in the response argument.

To override the entire JSON response body, pass an object in the response argument. Nest will serialize the object and return it as the JSON response body.

The second constructor argument - status - should be a valid HTTP status code. Best practice is to use the HttpStatus enum imported from @nestjs/common.

Here's an example overriding the entire response body:

cats.controller.ts JS

@Get()
async findAll() {
  throw new HttpException({
    status: HttpStatus.FORBIDDEN,
    error: 'This is a custom message',
  }, 403);
}
Using the above, this is how the response would look:


{
  "status": 403,
  "error": "This is a custom message"
}
Custom exceptions#
In many cases, you will not need to write custom exceptions, and can use the built-in Nest HTTP exception, as described in the next section. If you do need to create customized exceptions, it's good practice to create your own exceptions hierarchy, where your custom exceptions inherit from the base HttpException class. With this approach, Nest will recognize your exceptions, and automatically take care of the error responses. Let's implement such a custom exception:

forbidden.exception.ts JS

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
Since ForbiddenException extends the base HttpException, it will work seamlessly with the built-in exception handler, and therefore we can use it inside the findAll() method.

cats.controller.ts JS

@Get()
async findAll() {
  throw new ForbiddenException();
}
Built-in HTTP exceptions#
Nest provides a set of standard exceptions that inherit from the base HttpException. These are exposed from the @nestjs/common package, and represent many of the most common HTTP exceptions:

BadRequestException
UnauthorizedException
NotFoundException
ForbiddenException
NotAcceptableException
RequestTimeoutException
ConflictException
GoneException
PayloadTooLargeException
UnsupportedMediaTypeException
UnprocessableEntityException
InternalServerErrorException
NotImplementedException
BadGatewayException
ServiceUnavailableException
GatewayTimeoutException
Exception filters#
While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

Let's create an exception filter that is responsible for catching exceptions which are an instance of the HttpException class, and implementing custom response logic for them. To do this, we'll need to access the underlying platform Request and Response objects. We'll access the Request object so we can pull out the original url and include that in the logging information. We'll use the Response object to take direct control of the response that is sent, using the response.json() method.

http-exception.filter.ts JS

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
HINT
All exception filters should implement the generic ExceptionFilter<T> interface. This requires you to provide the catch(exception: T, host: ArgumentsHost) method with its indicated signature. T indicates the type of the exception.
The @Catch(HttpException) decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type HttpException and nothing else. The @Catch() decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.

Arguments host#
Let's look at the parameters of the catch() method. The exception parameter is the exception object currently being processed. The host parameter is an ArgumentsHost object. ArgumentsHost is a powerful utility object that we'll examine further in other chapters*. In this context, its main purpose is to provide us with a reference to the Request and Response objects that are being passed to the original request handler (in the controller where the exception originates). In this context, we've used some helper methods on ArgumentsHost to get the desired Request and Response objects.

The host.switchToHttp() helper call returns us an HttpArgumentsHost object. The HttpArgumentsHost object, in turn, has two useful methods. We use these methods to extract the desired objects, also using the Express type assertions in this case to return native Express typed objects:


const response = ctx.getResponse<Response>();
const request = ctx.getRequest<Request>();
*The reason for this level of abstraction is that ArgumentsHost functions in all contexts (e.g., the HTTP server context we're working with now, but also Microservices and Sockets). Later, we'll see how we can access the appropriate underlying arguments for any execution context with the power of ArgumentsHost and its helper functions. This will allow us to write generic exception filters that operate across all contexts.

Binding filters#
Let's tie our new HttpExceptionFilter to the CatsController's create() method.

cats.controller.ts JS

@Post()
@UseFilters(new HttpExceptionFilter())
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
HINT
The @UseFilters() decorator is imported from the @nestjs/common package.
We have used the @UseFilters() decorator here. Similar to the @Catch() decorator, it can take a single filter instance, or a comma-separated list of filter instances. Here, we created the instance of HttpExceptionFilter in place. Alternatively, you may pass the class (instead of an instance), leaving responsibility for instantiation to the framework, and enabling dependency injection.

cats.controller.ts JS

@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
HINT
Prefer applying filters by using classes instead of instances when possible. It reduces memory usage since Nest can easily reuse instances of the same class across your entire module.
In the example above, the HttpExceptionFilter is applied only to the single create() route handler, making it method-scoped. Exception filters can be scoped at different levels: method-scoped, controller-scoped, or global-scoped. For example, to set up a filter as controller-scoped, you would do the following:

cats.controller.ts JS

@UseFilters(new HttpExceptionFilter())
export class CatsController {}
This construction sets up the HttpExceptionFilter for every route handler defined inside the CatsController.

To create a global-scoped filter, you would do the following:

main.ts JS

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
WARNING
The useGlobalFilters() method does not set up filters for gateways or hybrid applications.
Global-scoped filters are used across the whole application, for every controller and every route handler. In terms of dependency injection, global filters registered from outside of any module (with useGlobalFilters() as in the example above) cannot inject dependencies since this is done outside the context of any module. In order to solve this issue, you can register a global-scoped filter directly from any module using the following construction:

app.module.ts JS

import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
HINT
When using this approach to perform dependency injection for the filter, note that regardless of the module where this construction is employed, the filter is, in fact, global. Where should this be done? Choose the module where the filter (HttpExceptionFilter in the example above) is defined. Also, useClass is not the only way of dealing with custom provider registration. Learn more here.
You can add as many filters with this technique as needed; simply add each to the providers array.

Catch everything#
In order to catch every unhandled exception (regardless of the exception type), leave the @Catch() decorator's parameter list empty, e.g., @Catch().


import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
In the example above the filter will catch each exception thrown, regardless of its type (class).

Inheritance#
Typically, you'll create fully customized exception filters crafted to fulfill your application requirements. However, there might be use-cases when you would like to simply extend the built-in default global exception filter, and override the behavior based on certain factors.

In order to delegate exception processing to the base filter, you need to extend BaseExceptionFilter and call the inherited catch() method.

all-exceptions.filter.ts JS

import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
WARNING
Method-scoped and Controller-scoped filters that extend the BaseExceptionFilter should not be instantiated with new. Instead, let the framework instantiate them automatically.
The above implementation is just a shell demonstrating the approach. Your implementation of the extended exception filter would include your tailored business logic (e.g., handling various conditions).

Global filters can extend the base filter. This can be done in either of two ways.

The first method is to inject the HttpServer reference when instantiating the custom global filter:


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
The second method is to use the APP_FILTER token as shown here.
```

### 4.1.7 Pipes

### 4.1.8 controllers

### 4.1.9 controllers

### 4.1.10 controllers

```text
    4.2
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Frameworks Deep Dive - Interview Knowledge Base](/interviews/frameworks.md)
<!-- backlinks:end -->
