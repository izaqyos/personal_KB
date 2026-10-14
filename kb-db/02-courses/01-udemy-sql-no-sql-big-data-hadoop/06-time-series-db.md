---
type: reference
title: Time Series DB
description: Udemy course notes on time Series DB in the SQL/NoSQL/big data course.
tags: [database, nosql, big-data, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.6"
---

# 2.1.6 Time Series DB

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

```text
matrix/regular - measurements every x seconds/minutes etc
events/iregular - measurements when something happens (stock sells etc)

univariant - one var (temperature)
multivariant - more than one variant 

why do we need it?
a. auto detect regular vs. iregular
b. more granularity is required for recent data. So need to manage data
lifecycle
c. exploration / aggregations on TSDBs are so common that the queries are
highly optimized
d.  update not needed

examples:
InfluxDB, OpenTSDB (over HBASE), kdb+, Timescale (postgres), Graphite, Prometheos
```

#### 2.1.6.1 Influx DB

```text
            2.1.6.2
```
