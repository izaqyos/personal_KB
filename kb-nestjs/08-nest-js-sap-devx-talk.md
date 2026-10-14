---
type: reference
title: Nest JS SAP devx talk
description: Section 8 of the legacy nestjs-kb notes.
tags: [kb-nestjs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#8"
---

# Nest JS SAP devx talk

[↑ nestjs-kb](/kb-nestjs/README.md)

```text
power point slides: /Users/<user>/work/code/nestjs/NestJS.pptx
git repo: https://github.com/izaqyos/nestjs101
```

## 8.1 readme

```text
# nestjs101.  Demonstrate the basics of NestJS framework #
NestJS is a framework for building efficient, scalable Typescript server-side applications, combining the flexibility of JS/NodeJS, Type safety of TS and an out-of-the-box application architecture which allows for the creation of highly testable, scalable, loosely coupled, and easily maintainable applications

## intro to nestjs ##
It is based oni the following:

### Javascript ###
Core WWW technology. Vast majority of websites use it for client side pages (frontend)
Its event driven, dynamically typed, functional and imperative and interacts well with the DOM.

### NodeJs ###
NodeJs allows JS code to run server side
Written, initially, by Ryan Dahl for Linux and OSX
It uses Googles C++ based V8 engine which compiles (jit) JS code to assembler. It also runs optimizations dynamically (inlining, copy elision), plus it has a GC
It relies heavily on libuv – a C lib that provides an abstraction for non blocking IO. An Event loop and async TCP/UDP/FS operations. Additional C lib are used like openSSL and zlib
Breaks away from the multi threaded concurrency model for web servers which is quite difficult to use efficiently and is worry free (locks, dead locks, starvation etc).

### Typescript ###
TS langauge, developed by Microsoft, is a super set of javascript. It is meant for large scale development and brings many advantages of OO languages such as C# and JAVA. 
Namely:
Static (optional) type system. Detect errors at compile time. Better communicate intention.
Interfaces, classes, generics and moduls
TS ”transpiles” to JS code

### NestJS concepts ###
* NestJS is a TS Framework. It shares many concepts other popular frameworks like spring boot and ruby on rails.
* It is inspired by AngularJS framework
* It supports IoC (Inverse of Control) via dependency injection
* It employs decorators/annotations to hide a lot of boilerplate JS code. Resulting in cleaner more concise code
* It comes bundled with two HTTP frameworks. Express (the default) and fastify
* It has a powerful CLI that can be used to generate code

#### controllers #### 
* Handle incoming requests
* Use the @controller(‘foo’) decorator. Paths support wildcards and path params with ‘:param’. Sub domain routing is also supported, like {host: ‘:my.domain.com’}
* Auto generate using $ nest g co foo
* All HTTP methods decorators are supported, @Get(), @Post() etc.
* All HTTP objects are available via decorators. @Req(), @Res(), @Session(), @Headers(), @Next() etc 
* @HttpCode(), @Header() and @Redirect() can be used for the response

Example:
`import { Controller, Get } from '@nestjs/common';
@Controller('foo')
export class FooController {
    @Get()
    foo(): string {
        return 'Hello from Foo';
    }
}`

#### Providers #### 
Any class that can be dependancy injected by the NEST runtime system. Annotated by @Injectable() decorator
Common providers in NEST: services, repositories, factories etc
Explicit instance creation and LCM is not required
To use a provider just wire it up in using class constructor. By default NEST RT will resolve the dependancy by type and, in the common cases, return a reference to the provider singelton.  Ex:
Constructor( private fooService: FooService)
Last, the provider needs to be added (and imported if external) to the using module.

Example:
`@Injectable()
export class FooService {   
    public bar(): string {
        return 'bar';
    }
}
Expose in module as provider:
@Module({
  providers: [FooService],
})
Inject to using class:
export class FooController {
    constructor( private fooService: FooService) {
    }
`

#### Modules #### 
Each app has least one. The root module which is the app’s starting point
Modules help organize the code to separate components which contain closely related capabilites. Like features, functionality etc
Modules should also reside in separate folders
@Module annotation that takes an object with properties:
Providers: will be instantiated and shared cross this module
Controllors: will be instantiated as well
Imports: imported modules
Exports: providers that this module wants to expose

Example:
`import { Module } from '@nestjs/common';
import { FooController } from './foo.controller';
import { FooService } from './foo.service';

@Module({
  controllers: [FooController],
  providers: [FooService]
})
`
#### Other features #### 
Middelwares. Pre route handlers. Similar to express (which NEST uses by default) middelwares. Any class that implements NestMiddleware
Exception filters. There’s an OOTB gloal exception filter and its possible to define custom exception filters.
Pipes. Used for validation and transformation of incoming arguments
Class validator. Defines decorators for properties. Like IsString(), IsInt(). Usually used together with validation pipes
Guards. Determine, based on specific conditions, whether or not a route handler will be called. Better choice for ATZ than middlewares since they “know” what will be executed next.
Interceptors. Similar to AOP decorators allows adding pre and post HTTP method execution code. They are good for audit logs and global input/output manipulation

#### More on validation #### 
Class-validator has a rich set of decorators for validation. Full list: https://github.com/typestack/class-validator#validation-decorators
A basic usage of validation would be to bind a global validation pipe at the root app level. Like:
async function bootstrap() { … app.useGlobalPipes(new ValidationPipe()); …}
And in the different DTOs for incoming requests payload add validation rules such as:
`
export class myDTO {
@IsDateString()
date: string;
@IsEmail()
email: string;
}
`

#### Injection Scopes #### 
Usually the default injection scope, providing singelton services, is sufficient. This works well in most cases because because the undelying NodeJs does not follow the multi-threaded stateless model. In which each incoming request is handled by a worker thread.
Still, there are cases when a singelton is not adequate. For these cases there are additional injection scopes:
REQUEST: new instance per request. GC when request is complete.
TRANSIENT: each consuming class gets its own instance of the transient provider. Example:
import { Injectable, Scope } from '@nestjs/common’;
 @Injectable({ scope: Scope.TRANSIENT }) export class FooTransientProvider {
}


## setup ##
branch: initial_setup

* $ brew install node
* $ npm i -g @nestjs/cli
* $ nest n demo
* $ rm demo/src/app.controller.spec.ts
* $ rm demo/src/app.service.ts
* $ rm demo/src/app.controller.ts

# remove refs in app.module
# update package.json and tsconfig


## branch: firstModule ##
* $ cd demo
* $ nest g mo foo
* $ nest g co foo --no-spec
* $ nest g s foo --no-spec
setup mock db in memory. add to foo service.
wireup get all in controller, use @Get()
test:
$ curl http://localhost:3000/foo

## branch: create_foo ##
create foo model. modify get to return foo type
add a createFoo method. install uuid for ids. add import `import {v1 as uuidv1} from 'uuid';`
in controller add a Post method for creation. just get and print body at first
Test. postman or curl:
curl --location --request POST 'http://localhost:3000/foo' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'title=new foo'

## branch: create_foo_2 ##
chg controller so that create takes params. then call service to crete foo
create a few tasks. the call get to show them


## branch: create_foo_3 ##
now add a DTO. change the controller to use it

## branch: foo_crud ##
add get by id @Get(':id'), create foo and get by id (@Param('id')) use array.find(elem => predicate)
add delete by id @Delete(':id'), create foo and delete by id (@Param('id')).  use array.findIndex(elem => predicate), then splice index,1

test delete by ID:
curl --location --request DELETE 'http://localhost:3000/foo/<id>'

for patch add @Patch(':id/state') update(@Param('id')..., @Body('state') state: FooState)
in service updateById method.  get foo by id and chg state. return foo...
test patch request to update state:
curl --location --request PATCH 'http://localhost:3000/foo/9a20cc40-0ef1-11eb-a5ed-a99485c02b39/state' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'state=WIP'


## branch: validationPipe ##
install packages:
$ npm i class-validator class-transformer --save

Notice that its possible to create with empty title. then add @IsNotEmpty() to DTO title.  Then add @UsePipes(ValidationPipe)
Test create with empty title. It will fail with detailed message that title is missing



    8.2
```
