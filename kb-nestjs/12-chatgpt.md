---
type: reference
title: Chatgpt
description: Section 12 of the legacy nestjs-kb notes.
tags: [kb-nestjs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#12"
---

# Chatgpt

[↑ nestjs-kb](/kb-nestjs/README.md)

## 12.1 wire a nestjs app and controller into an existing nodejs express application

````text
To wire a NestJS app and controller into an existing Node.js Express application, you'll need to follow these steps:

|1. Install NestJS: If you haven't already, install NestJS globally by running the following command:

```shell
npm install -g @nestjs/cli
```

|2. Create a NestJS app: Use the NestJS CLI to create a new NestJS application in a separate directory:

```shell
nest new nest-app
```

|3. Create a controller: Generate a new controller within the NestJS app using the CLI. This controller will handle the routing and request/response logic:

```shell
nest generate controller example
```

This will create an `example.controller.ts` file in the `src` directory with a basic controller template.

|4. Implement the controller: In the generated `example.controller.ts` file, define your controller's routes and their corresponding handler methods. For example:

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('example')
export class ExampleController {
  @Get()
  getExample(): string {
    return 'This is an example route.';
  }
}
```

You can add more routes and handlers as needed.

|5. Build the NestJS app: Run the build command to generate the JavaScript files from your TypeScript code:

```shell
npm run build
```

|6. Import the NestJS app: In your existing Express application, import the NestJS app and attach it as a middleware:

```javascript
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('./dist/src/app.module'); // Path to your NestJS app module

async function bootstrap() {
  const app = express();

  const nestApp = await NestFactory.create(AppModule);
  nestApp.init();

  app.use('/nest', nestApp.getHttpAdapter().getInstance()); // Mount NestJS app at the desired path

  // ... Other routes and middleware for your existing Express app

  app.listen(3000, () => {
    console.log('Express app listening on port 3000');
  });
}

bootstrap();
```

In this example, the NestJS app is mounted under the `/nest` path. You can change this path according to your requirements.

|7. Start your Express app: Start your existing Express application using the regular command or script you use to run it:

```shell
node app.js
```

Now your existing Express application should have the NestJS app and its routes available under the specified path (`/nest` in the example). You can access the NestJS routes by appending the path to your base URL (e.g., `http://localhost:3000/nest/example`).

Remember to adjust the code and paths based on your specific project structure and requirements.


    12.2
13.
````
