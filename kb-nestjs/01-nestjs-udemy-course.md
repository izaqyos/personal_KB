---
type: reference
title: NestJS Udemy course
description: NestJS Udemy course notes covering install and a management app project.
tags: [nestjs, course-notes, nodejs, typescript, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#1"
---

# NestJS Udemy course

[↑ nestjs-kb](/kb-nestjs/README.md)

## 1.1 install

```text
 $ install node js
 $ ~/work/code/nestjs/zero2heroUdemyCourse:]2129$ npm install -g @nestjs/cli 
 yarn global add @nestjs/cli

✨  Done in 13.93s.
$ nest --version
| 6.11.3

dev tools
visual-studio-code + typescript extenstion pack
postman
```

## 1.2 Management app

```text
Tasks manager app

@Module - decorator for class modules that adds:
-> providers, dependency injected providers
-> controllers, controllers array, will be instantiated in module
-> exports, array of providers to be exported
-> imports, required modules. the modules that they export are
dependency-injected to own module
"

create module
$ nest g module tasks


Controllers,
handle rest api endpoints
use @Controller decorator
has @Method (Get/Post etc) handlers

create controller:
$ nest g controller tasks --no-spec

Providers
-> @Injectable decorater for injecting to constructors
-> can be plain value, class, sync/async factory etc
-> must be provided to a module to be used
-> can be exported from a module and then can be imported by other modules

Services 
-> subset of Providers
-> When wrapped with @Injectable() decorator and provided to module they are
singeltos 
-> bussiness logic

So, module is a package that handles a feature. It will have controller/s for
handling rest and using services for bussiness logic

create service:
$ nest g service tasks --no-spec

Model,
class or interface that defines the data model

common build error 
Cannot write file '/Users/<user>/work/code/nestjs/zero2heroUdemyCourse/nestjs-task-management/dist/tasks/tasks.model.d.ts' because it would overwrite input file

fix, delete manually

add uuid module
npm i --save uuid && yarn add uuid

DTO, Data Transfer Object, an object that encapsulated data shared between networks/systems

Doesn't have behavior except storage, retrieval, de/serialization
Can be used for validation
is NOT a model, defines data shape not full information model
reccomended to use classes for DTO (not interfaces)
Very much like structs in C/C++

Pipes,
validate or manipulate data before it is passed to route handler

E.g. ValidationPipe, ParseIntPipe (conver valid number string to int)
are classes annodated w/ @Injectable decorator and implement PipeTransform
interface.
transform accepts value and metadata
exception thrown will return to client as HTTP errors
there are global, handler and parameter pipes
$ npm i class-validator class-transformer --save
$ yarn add class-validator class-transformer --save


install postgresql and pgadmin, see note (Postgresql getting started)

TypeOrm
install,
 2043  yarn add @nestjs/typeorm typeorm pg
 2044  npm i --save  @nestjs/typeorm typeorm pg

 if u get error dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.63.dylib npm mac
and same for yarn do $ brew update

since uuid is not needed (TypeOrm has annotation for id column) remove it.
 yarn remove uuid
 npm uninstall uuid


Course code:
$ ls -l
total 4104
-> react client: client_task_management/ , to run npm i && npm start , open
browser on localhost:3001
->  cloned for course git: nestjs-course-task-management/
->  my material: nestjs-task-management/
->  script: nestjsCourseCliSession

-> Test framework, jest

->




    1.3
```
