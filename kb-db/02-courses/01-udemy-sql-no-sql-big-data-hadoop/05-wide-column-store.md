---
type: reference
title: Wide column store
description: Udemy course notes on wide column store in the SQL/NoSQL/big data course.
tags: [nosql, big-data, database, course-notes, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2.1.5"
---

# 2.1.5 Wide column store

[↑ Udemy SQL, No SQL, Big Data & Hadoop](/kb-db/02-courses/01-udemy-sql-no-sql-big-data-hadoop/README.md)

```text
has rows like regular DBs but their columns are not fixed.
each column is a name plus k,v pair
no need for null values. no value, no need for column.
good for sparse dataset
schemaless
good for horizontal scaling
examples. google big table, amazon dynamodb, cassandra, hbase etc
```

#### 2.1.5.1 hbase

```text
modeled after googles big table
very fast lookups, even on bilions of entries
runs on HDFS (Hadoop distributed FS)
Primary, masters topology.
regions are DB distribution (akin to sharding in normal DB). see hbase architecture note
each region has log and stores. the stores have store files that use HFile and use DFS clients to access Hadoop to access DataNode
no data types. just binary bytes

HLog is append only read ahead log
memstore is a buffer for writes 
hfile, the data on Hadoop

namespace - akin to db. grouping of tables.
tables are described using DDL or java
specify column-families aka CF
structure

row-key-> CF1, CF2, ..., CFN
each CF can have columns C1,...,Ck

row-key are sorted
cell, pointed by 4 key set {row-key, cf, cell name, timestamp}
read will return latest timestamp value

uses bloom filter (probablistic data structure that uses hashes to give close to 100% accuracy answer to question whether an element is in a set)
no answer is 100% sure
yes has a certain std err
used in hbase to answer whether a column is in a row

regions can be split. either automatically or by configuration.
```

#### 2.1.5.2 zookeeper

```text
ZooKeeper is a centralized service for maintaining configuration information, naming, providing distributed synchronization, and providing group services. All of these kinds of services are used in some form or another by distributed applications. Each time they are implemented there is a lot of work that goes into fixing the bugs and race conditions that are inevitable. Because of the difficulty of implementing these kinds of services, applications initially usually skimp on them, which make them brittle in the presence of change and difficult to manage. Even when done correctly, different implementations of these services lead to management complexity when the applications are deployed.

used by hbase, hdfs and kafka

hbase uses ZooKeeper for node health monitoring, shared vars etc
```

#### 2.1.5.3 model movielens in hbase

```text
movie_id - move id + movie properties
genre - we need genre|movieId as key
ratings - movieId|userId

so, tables
movie -> CF(m) : title, year, generes cells, 

altMovie (genere|movieId) -> CF(a) movie ids (maybe copy of properties as well)
```

#### 2.1.5.4 hbase crud

```text
thrift protocol.
java
hbase shell
list_namespaces
list
create_namespace 'mvl'
#create a table movie in namespace mvl
create 'mvl:movie', 'a'
create 'mvl:user', 'u'
create 'mvl:altmovie', 'gm'

cd /Users/<user>/work/courses/sql_nosql_bigdata/rdbms_2_nosql/hbase/
$ ls movielens-hbase/run_code.sh 
movielens-hbase/run_code.sh

migration code:
movielens-hbase/src/main/java/com/okmich/movielens/hbase/Main.java
```

#### 2.1.5.5 SQL on hbase, Apache Phoenix

```text
created by salesforce and donated to Apache

            2.1.5.6


id=__Time_Series_DB__
```
