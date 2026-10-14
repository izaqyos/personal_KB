---
type: reference
title: modules
description: Section 2 of the legacy nestjs-kb notes.
tags: [kb-nestjs]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#2"
---

# modules

[↑ nestjs-kb](/kb-nestjs/README.md)

## 2.1 key modules

### 2.1.1 class-validator

#### 2.1.1.1 Validate properties

```text
        example:
import { IsString, MinLength, MaxLength, Matches, IsNotEmpty } from 'class-validator';

export class DestinationDataDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password too weak' },
  )
  password: string;
}
```

## 2.2 modules introduction

```text
https://docs.nestjs.com/modules

id=__nest_js_dynamic_modules__
```

## 2.3 dynamic modules

```text
https://docs.nestjs.com/fundamentals/dynamic-modules

example: https://github.com/nestjs/nest/tree/master/sample/25-dynamic-modules
env file: /Users/<user>/gitexternal/nest/sample/25-dynamic-modules/config/development.env

config.module:
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { CONFIG_OPTIONS } from './constants';

export interface ConfigModuleOptions {
  folder: string;
}

@Module({})
export class ConfigModule {
  static register(options: ConfigModuleOptions): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}

config.service:
import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './constants';
import { ConfigOptions, EnvConfig } from './interfaces';

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}

    2.4
```
