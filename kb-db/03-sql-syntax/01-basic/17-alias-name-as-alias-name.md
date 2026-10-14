---
type: reference
title: "Alias, Name as alias_name"
description: "SQL tutorial note on Alias, Name as alias_name, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.24"
---

# 3.1.24 Alias, Name as alias_name

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
You can rename a table or a column temporarily by giving another name known as Alias. The use of table aliases is to rename a table in a specific SQL statement. The renaming is a temporary change and the actual table name does not change in the database. The column aliases are used to rename a table's columns for the purpose of a particular SQL query.

Syntax
The basic syntax of a table alias is as follows.

SELECT column1, column2....
FROM table_name AS alias_name
WHERE [condition];
The basic syntax of a column alias is as follows.

SELECT column_name AS alias_name
FROM table_name
WHERE [condition];
Example
Consider the following two tables.

Table 1 − CUSTOMERS Table is as follows.

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
Table 2 − ORDERS Table is as follows.

+-----+---------------------+-------------+--------+
|OID  | DATE                | CUSTOMER_ID | AMOUNT |
+-----+---------------------+-------------+--------+
| 102 | 2009-10-08 00:00:00 |           3 |   3000 |
| 100 | 2009-10-08 00:00:00 |           3 |   1500 |
| 101 | 2009-11-20 00:00:00 |           2 |   1560 |
| 103 | 2008-05-20 00:00:00 |           4 |   2060 |
+-----+---------------------+-------------+--------+
Now, the following code block shows the usage of a table alias.

SQL> SELECT C.ID, C.NAME, C.AGE, O.AMOUNT 
   FROM CUSTOMERS AS C, ORDERS AS O
   WHERE  C.ID = O.CUSTOMER_ID;
This would produce the following result.

+----+----------+-----+--------+
| ID | NAME     | AGE | AMOUNT |
+----+----------+-----+--------+
|  3 | kaushik  |  23 |   3000 |
|  3 | kaushik  |  23 |   1500 |
|  2 | Khilan   |  25 |   1560 |
|  4 | Chaitali |  25 |   2060 |
+----+----------+-----+--------+
Following is the usage of a column alias.

SQL> SELECT  ID AS CUSTOMER_ID, NAME AS CUSTOMER_NAME
   FROM CUSTOMERS
   WHERE SALARY IS NOT NULL;
This would produce the following result.

+-------------+---------------+
| CUSTOMER_ID | CUSTOMER_NAME |
+-------------+---------------+
|           1 | Ramesh        |
|           2 | Khilan        |
|           3 | kaushik       |
|           4 | Chaitali      |
|           5 | Hardik        |
|           6 | Komal         |
|           7 | Muffy         |
+-------------+---------------+
```
