---
type: reference
title: ag silver searcher
description: Section 43 of the legacy KB_Linux notes.
tags: [kb-linux]
generated: { by: "human:izaqyos", at: "2025-10-03T11:21:05Z" }
status: stable
capture_type: source
legacy_source: "linux/KB_Linux#43"
---

# ag silver searcher

[↑ KB_Linux](/linux/kb-linux/README.md)

## 43.1 basics

## 43.2 advanced

### 43.2.1 https://www.alexwheeler.io/command-line/2018/08/02/ag.html

```text
- search sub dir 
  $ ag job src/transport/
src/transport/dto/creators-params.dto.ts
1:import {JobInfoDto} from './job-info.dto';
5:    importJobInfo: JobInfoDto<T>;

- search whole word match 
$ ag -w job src/transport/

- Search only TypeScript
$ ag --ts -w job src/transport/
full list of languages:
1$ ag --list-file-types

- just list matching files 
  $ ag --ts -w job src/transport/ -l
src/transport/dto/creators-params.dto.ts
src/transport/dto/transport-result.dto.tshark

- ignore directory
  $ ag --ts -w job src/transport/ --ignore-dir interfaces

- pipe input like grep
$ cat README.md  | ag docker
for running integration tests, it is needed to have a postgres running inside a docker container.
$ docker run --name local-postgres -e POSTGRES_USER=<your i username> -e POSTGRES_PASSWORD=<wanted local password> -d -p 5432:5432 postgres:9.6
$ docker ps -a
$ docker run --name local-redis -d -p 6379:6379 redis:4.0
this will create a docker container named "local-redis" in your environment.
$ docker start/stop local-redis
### Using docker-compose.yml
docker-compose up -d
docker-compose up -d --no-deps --build transport-service
$ cat README.md  | grep docker
for running integration tests, it is needed to have a postgres running inside a docker container.
$ docker run --name local-postgres -e POSTGRES_USER=<your i username> -e POSTGRES_PASSWORD=<wanted local password> -d -p 5432:5432 postgres:9.6
$ docker ps -a
$ docker run --name local-redis -d -p 6379:6379 redis:4.0
this will create a docker container named "local-redis" in your environment.
$ docker start/stop local-redis
### Using docker-compose.yml
docker-compose up -d
docker-compose up -d --no-deps --build transport-service


- regexp search
$ ag --ts -w "job.*dto" src/transport/ 
  src/transport/interfaces/transport.job.manager.interface.ts
3:import {JobInfoDto} from '../dto/job-info.dto';
9:    startJob<T>(transportType: { new(): T }, jobInfoDto: JobInfoDto<T>): Promise<TransportJobStatus>;

src/transport/interfaces/transport-broken-apps-handler.interface.ts
2:import {JobInfoDto} from '../dto/job-info.dto';
5:    preTransportAction<T>(jobInfoDto: JobInfoDto<T>, token: string): Promise<void>;
6:    concludeBrokenApps<T>(jobInfoDto: JobInfoDto<T>, token: string): Promise<BrokenEntity[]>;

- provide search context
$ ag --ts -w ".*dto" -C 3
src/report/interfaces/report-repository.interface.ts
1-import {DeleteResult} from 'typeorm';
2:import {ReportKeyDto} from '../dto/report-key.dto';
3:import {ReportDto} from '../dto/report.dto';
4-import {ReportEntity} from '../model/report.entity';
5-
6-export interface IReportRepository {
7:    getLastReport(key: ReportKeyDto): Promise<ReportEntity>;
8-    getReports(tenantId: string, instanceId: string): Promise<ReportEntity[]>;
9:    createOrUpdateReport(report: ReportDto): Promise<ReportDto>;
10:    deleteReport(key: ReportKeyDto): Promise<DeleteResult>;
11-    deleteReports(tenantId: string, instanceId: string): Promise<DeleteResult>;
12-}
13-
        43.2.2

    43.3
44.
```
