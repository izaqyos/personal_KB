---
type: reference
title: "DISTINCT, handle duplicates"
description: Subsection 3.1.37 of Basic.
tags: [kb-db, sql, syntax, llms, chatgpt, gemini]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.37"
---

# 3.1.37 DISTINCT, handle duplicates

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
There may be a situation when you have multiple duplicate records in a table. While fetching such records, it makes more sense to fetch only unique records instead of fetching duplicate records.

The SQL DISTINCT keyword, which we have already discussed is used in conjunction with the SELECT statement to eliminate all the duplicate records and by fetching only the unique records.

Syntax
The basic syntax of a DISTINCT keyword to eliminate duplicate records is as follows.

SELECT DISTINCT column1, column2,.....columnN 
FROM table_name
WHERE [condition]
Example
Consider the CUSTOMERS table having the following records.

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
First, let us see how the following SELECT query returns duplicate salary records.

SQL> SELECT SALARY FROM CUSTOMERS
   ORDER BY SALARY;
This would produce the following result where the salary of 2000 is coming twice which is a duplicate record from the original table.

+----------+
| SALARY   |
+----------+
|  1500.00 |
|  2000.00 |
|  2000.00 |
|  4500.00 |
|  6500.00 |
|  8500.00 |
| 10000.00 |
+----------+
Now, let us use the DISTINCT keyword with the above SELECT query and see the result.

SQL> SELECT DISTINCT SALARY FROM CUSTOMERS
   ORDER BY SALARY;
This would produce the following result where we do not have any duplicate entry.

+----------+
| SALARY   |
+----------+
|  1500.00 |
|  2000.00 |
|  4500.00 |
|  6500.00 |
|  8500.00 |
| 10000.00 |
+----------+
```
