---
type: reference
title: SQL - temporary tables
description: Subsection 3.1.33 of Basic.
tags: [kb-db, sql, syntax, llms, chatgpt, gemini]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.33"
---

# 3.1.33 SQL - temporary tables

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
What are Temporary Tables?
There are RDBMS, which support temporary tables. Temporary Tables are a great feature that lets you store and process intermediate results by using the same selection, update, and join capabilities that you can use with typical SQL Server tables.

The temporary tables could be very useful in some cases to keep temporary data. The most important thing that should be known for temporary tables is that they will be deleted when the current client session terminates.

Temporary tables are available in MySQL version 3.23 onwards. If you use an older version of MySQL than 3.23, you can't use temporary tables, but you can use heap tables.

As stated earlier, temporary tables will only last as long as the session is alive. If you run the code in a PHP script, the temporary table will be destroyed automatically when the script finishes executing. If you are connected to the MySQL database server through the MySQL client program, then the temporary table will exist until you close the client or manually destroy the table.

Example
Here is an example showing you the usage of a temporary table.

mysql> CREATE TEMPORARY TABLE SALESSUMMARY (
   -> product_name VARCHAR(50) NOT NULL
   -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
   -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
   -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
);
Query OK, 0 rows affected (0.00 sec)

mysql> INSERT INTO SALESSUMMARY
   -> (product_name, total_sales, avg_unit_price, total_units_sold)
   -> VALUES
   -> ('cucumber', 100.25, 90, 2);

mysql> SELECT * FROM SALESSUMMARY;
+--------------+-------------+----------------+------------------+
| product_name | total_sales | avg_unit_price | total_units_sold |
+--------------+-------------+----------------+------------------+
| cucumber     |      100.25 |          90.00 |                2 |
+--------------+-------------+----------------+------------------+
1 row in set (0.00 sec)
When you issue a SHOW TABLES command, then your temporary table will not be listed out in the list. Now, if you log out of the MySQL session and then issue a SELECT command, you will find no data available in the database. Even your temporary table will not be existing.

Dropping Temporary Tables
By default, all the temporary tables are deleted by MySQL when your database connection gets terminated. Still if you want to delete them in between, then you can do so by issuing a DROP TABLE command.

Following is an example on dropping a temporary table.

mysql> CREATE TEMPORARY TABLE SALESSUMMARY (
   -> product_name VARCHAR(50) NOT NULL
   -> , total_sales DECIMAL(12,2) NOT NULL DEFAULT 0.00
   -> , avg_unit_price DECIMAL(7,2) NOT NULL DEFAULT 0.00
   -> , total_units_sold INT UNSIGNED NOT NULL DEFAULT 0
);
Query OK, 0 rows affected (0.00 sec)

mysql> INSERT INTO SALESSUMMARY
   -> (product_name, total_sales, avg_unit_price, total_units_sold)
   -> VALUES
   -> ('cucumber', 100.25, 90, 2);

mysql> SELECT * FROM SALESSUMMARY;
+--------------+-------------+----------------+------------------+
| product_name | total_sales | avg_unit_price | total_units_sold |
+--------------+-------------+----------------+------------------+
| cucumber     |      100.25 |          90.00 |                2 |
+--------------+-------------+----------------+------------------+
1 row in set (0.00 sec)
mysql> DROP TABLE SALESSUMMARY;
mysql>  SELECT * FROM SALESSUMMARY;
ERROR 1146: Table 'TUTORIALS.SALESSUMMARY' doesn't exist
```
