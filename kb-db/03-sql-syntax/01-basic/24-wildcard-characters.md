---
type: reference
title: wildcard characters
description: "SQL tutorial note on wildcard characters, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.31"
---

# 3.1.31 wildcard characters

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
We have already discussed about the SQL LIKE operator, which is used to compare a value to similar values using the wildcard operators.

SQL supports two wildcard operators in conjunction with the LIKE operator which are explained in detail in the following table.

Sr.No.	Wildcard & Description
1	
The percent sign (%)

Matches one or more characters.

Note − MS Access uses the asterisk (*) wildcard character instead of the percent sign (%) wildcard character.

2	
The underscore (_)

Matches one character.

Note − MS Access uses a question mark (?) instead of the underscore (_) to match any one character.

The percent sign represents zero, one or multiple characters. The underscore represents a single number or a character. These symbols can be used in combinations.

Syntax
The basic syntax of a '%' and a '_' operator is as follows.

SELECT * FROM table_name
WHERE column LIKE 'XXXX%'

or 

SELECT * FROM table_name
WHERE column LIKE '%XXXX%'

or

SELECT * FROM table_name
WHERE column LIKE 'XXXX_'

or

SELECT * FROM table_name
WHERE column LIKE '_XXXX'

or

SELECT * FROM table_name
WHERE column LIKE '_XXXX_'
You can combine N number of conditions using the AND or the OR operators. Here, XXXX could be any numeric or string value.

Example
The following table has a number of examples showing the WHERE part having different LIKE clauses with '%' and '_' operators.

Sr.No.	Statement & Description
1	
WHERE SALARY LIKE '200%'

Finds any values that start with 200.

2	
WHERE SALARY LIKE '%200%'

Finds any values that have 200 in any position.

3	
WHERE SALARY LIKE '_00%'

Finds any values that have 00 in the second and third positions.

4	
WHERE SALARY LIKE '2_%_%'

Finds any values that start with 2 and are at least 3 characters in length.

5	
WHERE SALARY LIKE '%2'

Finds any values that end with 2.

6	
WHERE SALARY LIKE '_2%3'

Finds any values that have a 2 in the second position and end with a 3.

7	
WHERE SALARY LIKE '2___3'

Finds any values in a five-digit number that start with 2 and end with 3.

Let us take a real example, consider the CUSTOMERS table having the following records.

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
The following code block is an example, which would display all the records from the CUSTOMERS table where the SALARY starts with 200.

SQL> SELECT * FROM CUSTOMERS
WHERE SALARY LIKE '200%';
This would produce the following result.

+----+----------+-----+-----------+----------+
| ID | NAME     | AGE | ADDRESS   | SALARY   |
+----+----------+-----+-----------+----------+
|  1 | Ramesh   |  32 | Ahmedabad |  2000.00 |
|  3 | kaushik  |  23 | Kota      |  2000.00 |
+----+----------+-----+-----------+----------+
```
