---
type: reference
title: CLI
description: "NestJS CLI usage for creating projects (TypeORM, GraphQL) and generating code."
tags: [nestjs, cheatsheet, npm, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#3"
---

# CLI

[↑ nestjs-kb](/kb-nestjs/README.md)

## 3.1 official reference

```text
https://docs.nestjs.com/cli/usages
```

### 3.1.1 create new project

```text
nest n <name> [opts]

e.g.
$ nest new my-nest-project
$ cd my-nest-project
$ npm run start:dev
```

#### 3.1.1.1 With typeORM

```text
$ npm install --save @nestjs/typeorm typeorm mysql
```

#### 3.1.1.2 With GraphQL

```text
$ npm i @nestjs/graphql graphql-tools graphql



            3.1.1.3
```

### 3.1.2 generate code

```text
nest g <schematic> <name> [options]

Name	Alias	Description
application		Generate a new application within a monorepo (converting to monorepo if it's a standard structure).
library	lib	Generate a new library within a monorepo (converting to monorepo if it's a standard structure).
class	cl	Generate a new class.
controller	co	Generate a controller declaration.
decorator	d	Generate a custom decorator.
filter	f	Generate a filter declaration.
gateway	ga	Generate a gateway declaration.
guard	gu	Generate a guard declaration.
interface		Generate an interface.
interceptor	in	Generate an interceptor declaration.
middleware	mi	Generate a middleware declaration.
module	mo	Generate a module declaration.
pipe	pi	Generate a pipe declaration.
provider	pr	Generate a provider declaration.
resolver	r	Generate a resolver declaration.
service	s	Generate a service declaration.

Options

Option	Description
--dry-run	Reports changes that would be made, but does not change the filesystem.
Alias: -d
--project [project]	Project that element should be added to.
Alias: -p
--flat	Do not generate a folder for the element.
--collection [collectionName]	Specify schematics collection. Use package name of installed npm package containing schematic.
Alias: -c
--no-spec	Disable spec files generation
```

### 3.1.3 build

```text
         nest build <name> [options]
```

### 3.1.4 compile and run

```text
nest start <name> [options]
```

### 3.1.5 add/install a nest lib

```text
nest add <name> [options]
```

### 3.1.6 update package.json lib vers to latest

```text
        nest update
```

### 3.1.7 info

```text
        nest info

        3.1.8
    3.2
```
