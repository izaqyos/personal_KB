---
type: reference
title: Syntax
description: "SQL tutorial note on Syntax, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.5"
---

# 3.1.5 Syntax

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

#### 3.1.5.1 SQL SELECT Statement

```text
SELECT column1, column2....columnN
FROM   table_name;

practice: https://www.w3schools.com/sql/trysql.asp?filename=trysql_asc
SELECT  CustomerName,ContactName FROM Customers
ORDER BY CustomerName ASC;
Number of Records: 91
CustomerName	ContactName
Alfreds Futterkiste	Maria Anders
Ana Trujillo Emparedados y helados	Ana Trujillo
Antonio Moreno Taquería	Antonio Moreno
```

#### 3.1.5.2 SQL DISTINCT Clause

```text
SELECT DISTINCT column1, column2....columnN
FROM   table_name;
```

#### 3.1.5.3 SQL WHERE Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION;
SELECT  * FROM Categories WHERE CategoryName like '%rages';
Result:
Number of Records: 1
CategoryID	CategoryName	Description
1	Beverages	Soft drinks, coffees, teas, beers, and ales
```

#### 3.1.5.4 SQL AND/OR Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION-1 {AND|OR} CONDITION-2;
SELECT  * FROM Categories WHERE  CategoryName='Beverages' or CategoryName like '%meat%';
    
Number of Records: 2
CategoryID	CategoryName	Description
1	Beverages	Soft drinks, coffees, teas, beers, and ales
6	Meat/Poultry	Prepared meats
```

#### 3.1.5.5 SQL IN Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name IN (val-1, val-2,...val-N);
```

#### 3.1.5.6 SQL BETWEEN Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name BETWEEN val-1 AND val-2;
```

#### 3.1.5.7 SQL LIKE Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name LIKE { PATTERN };
```

#### 3.1.5.8 SQL ORDER BY Clause

```text
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION
ORDER BY column_name {ASC|DESC};
```

#### 3.1.5.9 SQL GROUP BY Clause

```text
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name;
```

#### 3.1.5.10 SQL COUNT Clause

```text
SELECT COUNT(column_name)
FROM   table_name
WHERE  CONDITION;
```

#### 3.1.5.11 SQL HAVING Clause

```text
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name
HAVING (arithematic function condition);
```

#### 3.1.5.12 SQL CREATE TABLE Statement

```text
CREATE TABLE table_name(
column1 datatype,
column2 datatype,
column3 datatype,
.....
columnN datatype,
PRIMARY KEY( one or more columns )
);
```

#### 3.1.5.13 SQL DROP TABLE Statement

```text
DROP TABLE table_name;
```

#### 3.1.5.14 SQL CREATE INDEX Statement

```text
CREATE UNIQUE INDEX index_name
ON table_name ( column1, column2,...columnN);
```

#### 3.1.5.15 SQL DROP INDEX Statement

```text
ALTER TABLE table_name
DROP INDEX index_name;
```

#### 3.1.5.16 SQL DESC Statement

```text
DESC table_name;
```

#### 3.1.5.17 SQL TRUNCATE TABLE Statement

```text
TRUNCATE TABLE table_name;
```

#### 3.1.5.18 SQL ALTER TABLE Statement

```text
ALTER TABLE table_name {ADD|DROP|MODIFY} column_name {data_ype};
SQL ALTER TABLE Statement (Rename)
ALTER TABLE table_name RENAME TO new_table_name;
```

#### 3.1.5.19 SQL INSERT INTO Statement

```text
INSERT INTO table_name( column1, column2....columnN)
VALUES ( value1, value2....valueN);
```

#### 3.1.5.20 SQL UPDATE Statement

```text
UPDATE table_name
SET column1 = value1, column2 = value2....columnN=valueN
[ WHERE  CONDITION ];
```

#### 3.1.5.21 SQL DELETE Statement

```text
DELETE FROM table_name
WHERE  {CONDITION};
```

#### 3.1.5.22 SQL CREATE DATABASE Statement

```text
CREATE DATABASE database_name;
```

#### 3.1.5.23 SQL DROP DATABASE Statement

```text
DROP DATABASE database_name;
```

#### 3.1.5.24 SQL USE Statement

```text
USE database_name;
```

#### 3.1.5.25 SQL COMMIT Statement

```text
COMMIT;
```

#### 3.1.5.26 SQL ROLLBACK Statement

```text
ROLLBACK;
```
