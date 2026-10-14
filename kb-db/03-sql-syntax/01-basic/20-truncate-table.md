---
type: reference
title: TRUNCATE TABLE
description: Subsection 3.1.27 of Basic.
tags: [kb-db, sql, syntax, llms, chatgpt, gemini]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.27"
---

# 3.1.27 TRUNCATE TABLE

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
The SQL TRUNCATE TABLE command is used to delete complete data from an existing table.

You can also use DROP TABLE command to delete complete table but it would remove complete table structure form the database and you would need to re-create this table once again if you wish you store some data.

Syntax
The basic syntax of a TRUNCATE TABLE command is as follows.

TRUNCATE TABLE  table_name;
Example
Consider a CUSTOMERS table having the following records −

+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  2 | Khilan   |  25 | Delhi     |  1500.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
|  4 | Chaitali |  25 | Mumbai    |  6500.00 |
|  5 | Hardik   |  27 | Bhopal    |  8500.00 |
|  6 | Komal    |  22 | MP        |  4500.00 |
|  7 | Muffy    |  24 | Indore    | 10000.00 |
+----+----------+-----+-----------+----------+
Following is the example of a Truncate command.

SQL > TRUNCATE TABLE CUSTOMERS;
Now, the CUSTOMERS table is truncated and the output from SELECT statement will be as shown in the code block below −

SQL> SELECT * FROM CUSTOMERS;
Empty set (0.00 sec)
```
