---
type: reference
title: NestJS versions
description: "Notes on changes across NestJS versions 1 to 5 and more, including SWC."
tags: [nestjs, typescript, reference, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#10"
---

# NestJS versions , tags: versions

[↑ nestjs-kb](/kb-nestjs/README.md)

## 10.1 NestJS version 1

## 10.2 NestJS version 2

## 10.3 NestJS version 3

## 10.4 NestJS version 4

## 10.5 NestJS version 5

## 10.6 NestJS version 6

## 10.7 NestJS version 7

## 10.8 NestJS version 8

## 10.9 NestJS version 9 , tags: NestJS version 9

### 10.9.1 https://trilon.io/blog/nestjs-9-is-now-available

```text
reference: https://github.com/izaqyos/nestjs101

        10.9.2
```

## 10.10 NestJS version 10 , tags: NestJS version 10

### 10.10.1 https://trilon.io/blog/nestjs-10-is-now-available

#### 10.10.1.1 NestJS ❤️ SWC

```text
SWC (Speedy Web Compiler) is an extensible Rust-based platform that can be used for both compilation and bundling. Using SWC with Nest CLI is a great and simple way to significantly speed up your development process.

SWC is approximately x20 times faster than the default TypeScript compiler.

In v10, you can use SWC by simply passing the -b swc flag to the nest start command, as follows:

$ nest start -b swc

Or by setting the compilerOptions.builder property in your nest-cli.json file, as follows:

{
  "compilerOptions": {
    "builder": "swc"
  }
}
SWC does not perform any type checking itself (as opposed to the default TypeScript compiler), so to turn it on, you need to use the --type-check flag:

$ nest start -b swc --type-check
HINT Type-checking must be enabled when using CLI Plugins ⚠️!

This command will instruct the Nest CLI to run tsc in noEmit mode alongside SWC, which will asynchronously perform type checking. Again, instead of passing the --type-check flag you can also just set the compilerOptions.typeCheck property to true in your nest-cli.json file, like so:

{
  "compilerOptions": {
    "builder": "swc",
    "typeCheck": true
  }
}
You can also use jest and vitest in combination with SWC. To learn more, check out the SWC integration recipe in the NestJS documentation.

Vitest is a fast and lightweight test runner designed to work with Vite. It provides a modern, fast, and easy-to-use testing solution that can be integrated with NestJS projects.
```

#### 10.10.1.2 Overriding modules in tests

```text
NestJS 10 introduces a new feature that allows you to override modules in tests. This feature is especially useful when you want to mock the entire module all at once instead of mocking each provider individually.

Test.createTestingModule({
  ...
})
  .overrideModule(LoggerModule)
  .useModule(LoggerTestingModule)
  .compile();
As long as you have a LoggerTestingModule that exports the same providers as the LoggerModule (and so provides the same public API), Nest will use the LoggerTestingModule module instead of the LoggerModule in your tests.

Overriding test modules will help make things much simpler when you need to mock a module that has a lot of providers. Learn more about the new overriding test module feature here.
```

#### 10.10.1.3 Redis wildcard subscriptions

```text
In v10, we added support for Redis wildcard subscriptions. This feature allows you to subscribe to all messages that match a given pattern. As long as you set the wildcards configuration property to true in your microservice configuration, as follows:

const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  AppModule,
  {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      wildcards: true, // 👈 THIS IS NEW
    },
  }
);
Redis will use psubscribe/pmessage (learn more about Redis psubscribe) instead of subscribe/message under the hood. With wildcards enabled, you can use glob-style patterns in your subscriptions, as follows:

h?llo subscribes to hello, hallo and hxllo
h*llo subscribes to hllo and heeeello
h[ae]llo subscribes to hello and hallo, but not hillo
```

#### 10.10.1.4 Cache module

```text
The CacheModule has been removed from the @nestjs/common package and is now available as a standalone package - @nestjs/cache-manager. This change was made to avoid unnecessary dependencies in the @nestjs/common package. You can learn more about the @nestjs/cache-manager package here.
```

#### 10.10.1.5 Dropping support for Node.js v12

```text
As of NestJS 10, we no longer support Node.js v12, as v12 went EOL on April 30, 2022. This means that NestJS 10 requires Node.js v16 or higher. This decision was made to allow us to finally set target to ES2021 in our TypeScript configuration, instead of shipping polyfills as we did in the past.

From now on, every official NestJS package will be compiled to ES2021 by default, which should result in a smaller library size and sometimes even (slightly) better performance.
        10.10.2
```

## 10.11 NestJS version 11

## 10.12 NestJS version 12

## 10.13 NestJS version 13

## 10.14 NestJS version 14

## 10.15 NestJS version 15

## 10.16 NestJS version 16
