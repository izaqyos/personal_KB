---
type: reference
title: ALTER TABLE
description: Subsection 3.1.26 of Basic.
tags: [kb-db, sql, syntax, llms, chatgpt, gemini]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.26"
---

# 3.1.26 ALTER TABLE

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
The SQL ALTER TABLE command is used to add, delete or modify columns in an existing table. You should also use the ALTER TABLE command to add and drop various constraints on an existing table.

Syntax
The basic syntax of an ALTER TABLE command to add a New Column in an existing table is as follows.

ALTER TABLE table_name ADD column_name datatype;
The basic syntax of an ALTER TABLE command to DROP COLUMN in an existing table is as follows.

ALTER TABLE table_name DROP COLUMN column_name;
The basic syntax of an ALTER TABLE command to change the DATA TYPE of a column in a table is as follows.

ALTER TABLE table_name MODIFY COLUMN column_name datatype;
The basic syntax of an ALTER TABLE command to add a NOT NULL constraint to a column in a table is as follows.

ALTER TABLE table_name MODIFY column_name datatype NOT NULL;
The basic syntax of ALTER TABLE to ADD UNIQUE CONSTRAINT to a table is as follows.

ALTER TABLE table_name 
ADD CONSTRAINT MyUniqueConstraint UNIQUE(column1, column2...);
The basic syntax of an ALTER TABLE command to ADD CHECK CONSTRAINT to a table is as follows.

ALTER TABLE table_name 
ADD CONSTRAINT MyUniqueConstraint CHECK (CONDITION);
The basic syntax of an ALTER TABLE command to ADD PRIMARY KEY constraint to a table is as follows.

ALTER TABLE table_name 
ADD CONSTRAINT MyPrimaryKey PRIMARY KEY (column1, column2...);
The basic syntax of an ALTER TABLE command to DROP CONSTRAINT from a table is as follows.

ALTER TABLE table_name 
DROP CONSTRAINT MyUniqueConstraint;
If you're using MySQL, the code is as follows −

ALTER TABLE table_name 
DROP INDEX MyUniqueConstraint;
The basic syntax of an ALTER TABLE command to DROP PRIMARY KEY constraint from a table is as follows.

ALTER TABLE table_name 
DROP CONSTRAINT MyPrimaryKey;
If you're using MySQL, the code is as follows −

ALTER TABLE table_name 
DROP PRIMARY KEY;
Example
Consider the CUSTOMERS table having the following records −

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
Following is the example to ADD a New Column to an existing table −

ALTER TABLE CUSTOMERS ADD SEX char(1);
Now, the CUSTOMERS table is changed and following would be output from the SELECT statement.

+----+---------+-----+-----------+----------+------+
| ID | NAME    | AGE | ADDRESS   | SALARY   | SEX  |
+----+---------+-----+-----------+----------+------+
|  1 | Ramesh  |  32 | Ahmedabad |  2000.00 | NULL |
|  2 | Ramesh  |  25 | Delhi     |  1500.00 | NULL |
|  3 | kaushik |  23 | Kota      |  2000.00 | NULL |
|  4 | kaushik |  25 | Mumbai    |  6500.00 | NULL |
|  5 | Hardik  |  27 | Bhopal    |  8500.00 | NULL |
|  6 | Komal   |  22 | MP        |  4500.00 | NULL |
|  7 | Muffy   |  24 | Indore    | 10000.00 | NULL |
+----+---------+-----+-----------+----------+------+
Following is the example to DROP sex column from the existing table.

ALTER TABLE CUSTOMERS DROP SEX;
Now, the CUSTOMERS table is changed and following would be the output from the SELECT statement.

+----+---------+-----+-----------+----------+
| ID | NAME    | AGE | ADDRESS   | SALARY   |
+----+---------+-----+-----------+----------+
|  1 | Ramesh  |  32 | Ahmedabad |  2000.00 |
|  2 | Ramesh  |  25 | Delhi     |  1500.00 |
|  3 | kaushik |  23 | Kota      |  2000.00 |
|  4 | kaushik |  25 | Mumbai    |  6500.00 |
|  5 | Hardik  |  27 | Bhopal    |  8500.00 |
|  6 | Komal   |  22 | MP        |  4500.00 |
|  7 | Muffy   |  24 | Indore    | 10000.00 |
+----+---------+-----+-----------+----------+
```
