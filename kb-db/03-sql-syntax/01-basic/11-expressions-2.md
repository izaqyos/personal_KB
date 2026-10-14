---
type: reference
title: Expressions
description: "SQL tutorial note on Expressions, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.11"
---

# 3.1.11 Expressions

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
Syntax
Consider the basic syntax of the SELECT statement as follows −

SELECT column1, column2, columnN 
FROM table_name 
WHERE [CONDITION|EXPRESSION];
There are different types of SQL expressions, which are mentioned below −

Boolean
Numeric
Date
Let us now discuss each of these in detail.

Boolean Expressions
SQL Boolean Expressions fetch the data based on matching a single value. Following is the syntax −

SELECT column1, column2, columnN 
FROM table_name 
WHERE SINGLE VALUE MATCHING EXPRESSION;
Consider the CUSTOMERS table having the following records −

SQL> SELECT * FROM CUSTOMERS;
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
7 rows in set (0.00 sec)
The following table is a simple example showing the usage of various SQL Boolean Expressions −

SQL> SELECT * FROM CUSTOMERS WHERE SALARY = 10000;
+----+-------+-----+---------+----------+
| ID | NAME  | AGE | ADDRESS | SALARY   |
+----+-------+-----+---------+----------+
|  7 | Muffy |  24 | Indore  | 10000.00 |
+----+-------+-----+---------+----------+
1 row in set (0.00 sec)
Numeric Expression
These expressions are used to perform any mathematical operation in any query. Following is the syntax −

SELECT numerical_expression as  OPERATION_NAME
[FROM table_name
WHERE CONDITION] ;
Here, the numerical_expression is used for a mathematical expression or any formula. Following is a simple example showing the usage of SQL Numeric Expressions −

SQL> SELECT (15 + 6) AS ADDITION
+----------+
| ADDITION |
+----------+
|       21 |
+----------+
1 row in set (0.00 sec)
There are several built-in functions like avg(), sum(), count(), etc., to perform what is known as the aggregate data calculations against a table or a specific table column.

SQL> SELECT COUNT(*) AS "RECORDS" FROM CUSTOMERS; 
+---------+
| RECORDS |
+---------+
|       7 |
+---------+
1 row in set (0.00 sec)
Date Expressions
Date Expressions return current system date and time values −

SQL>  SELECT CURRENT_TIMESTAMP;
+---------------------+
| Current_Timestamp   |
+---------------------+
| 2009-11-12 06:40:23 |
+---------------------+
1 row in set (0.00 sec)
Another date expression is as shown below −

SQL>  SELECT  GETDATE();;
+-------------------------+
| GETDATE                 |
+-------------------------+
| 2009-10-22 12:07:18.140 |
+-------------------------+
1 row in set (0.00 sec)
```
