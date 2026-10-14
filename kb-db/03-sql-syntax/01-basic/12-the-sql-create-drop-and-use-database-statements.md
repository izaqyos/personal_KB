---
type: reference
title: "The SQL CREATE, DROP and USE DATABASE statements"
description: "SQL tutorial note on The SQL CREATE, DROP and USE DATABASE statements, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.12"
---

# 3.1.12 The SQL CREATE, DROP and USE DATABASE statements

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
Syntax
The basic syntax of this CREATE DATABASE statement is as follows −

CREATE DATABASE DatabaseName;
Always the database name should be unique within the RDBMS.

Example
If you want to create a new database <testDB>, then the CREATE DATABASE statement would be as shown below −

SQL> CREATE DATABASE testDB;
Make sure you have the admin privilege before creating any database. Once a database is created, you can check it in the list of databases as follows −

SQL> SHOW DATABASES;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| AMROOD             |
| TUTORIALSPOINT     |
| mysql              |
| orig               |
| test               |
| testDB             |
+--------------------+
7 rows in set (0.00 sec)

The SQL DROP DATABASE statement is used to drop an existing database in SQL schema.

Syntax
The basic syntax of DROP DATABASE statement is as follows −

DROP DATABASE DatabaseName;
Always the database name should be unique within the RDBMS.

Example
If you want to delete an existing database <testDB>, then the DROP DATABASE statement would be as shown below −

SQL> DROP DATABASE testDB;
When you have multiple databases in your SQL Schema, then before starting your operation, you would need to select a database where all the operations would be performed.

The SQL USE statement is used to select any existing database in the SQL schema.

Syntax
The basic syntax of the USE statement is as shown below −

USE DatabaseName;
```
