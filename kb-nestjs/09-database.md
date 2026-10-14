---
type: reference
title: Database
description: NestJS database notes on TypeORM connections and connection pool size.
tags: [nestjs, database, typescript, backend, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "nestjs-kb#9"
---

# Database

[↑ nestjs-kb](/kb-nestjs/README.md)

## 9.1 TypeOrm

### 9.1.1 Db connections

#### 9.1.1.1 DB connections pool size

```text
documentation: https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md#common-connection-options
noteL
pool.max - The maximum number of connections there can be in the pool (default: 10).

pool.min - The minimum of connections there can be in the pool (default: 0).



https://stackoverflow.com/questions/46843248/create-connection-pool-typeorm
   TypeORM by default uses a connection pool which defaults to 10 connections. If you want to have custom pooling limit (advisable), the same can be mentioned for connectionLimit under extra options which are passed to the underlying MySQL driver.

 [
    {
        "name": "default",
        "type": "mysql",
        "host": "mysql.db",
        "port": 3306,
        "username": "appUser",
        "password": "appRandomPassword",
        "database": "entity_schema",
        "entities": [
            "dist/models/entities/**/*.js"
        ],
        "logging": [
            "error"
        ],
        "extra": {
            "connectionLimit": 5
        }
    }
] 
            9.1.1.2

        9.1.2

    9.2
```

## See Also

<!-- backlinks:start -->
### Backlinks

* [Technology Stack Comparisons - Interview Knowledge Base](/interviews/tech-stack.md)
<!-- backlinks:end -->
