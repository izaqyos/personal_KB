---
type: reference
title: "Common , interesting, frequent queries"
description: "Common, interesting and frequent SQL queries, e.g. comparing two similar tables with the same primary key."
tags: [sql, database, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#5"
---

# Common , interesting, frequent queries , tags: Common , interesting, frequent queries ,

[↑ kb-db](/kb-db/README.md)

````text
    5.1 I have two similar DB tables with same primary key. say orders table and orders translations table. what sql would provide all the orders that are not in orders translations?
Gemini-Advanced:
Here's the SQL query to find orders that are not in the orders translations table:

```sql
SELECT * 
FROM orders o
WHERE NOT EXISTS (
    SELECT 1 
    FROM orders_translations ot
    WHERE o.primary_key = ot.primary_key -- Assuming 'primary_key' is the shared column
);
```

**Explanation**

* **`SELECT * FROM orders o`**: Selects all columns from the `orders` table and assigns the alias `o` to it.
* **`WHERE NOT EXISTS (...)`**: Filters the results to only include rows from `orders` where there is no matching row in `orders_translations`.
* **`SELECT 1 FROM orders_translations ot`**: This subquery looks for rows in the `orders_translations` table (alias `ot`).
* **`WHERE o.primary_key = ot.primary_key`**: The subquery's condition checks if the `primary_key` in the `orders` table matches the `primary_key` in the `orders_translations` table.

**Key Points:**

* **Assumes Shared Primary Key:** This query assumes both tables have a column named `primary_key` that serves as the primary key in both tables. If the primary key column has a different name, adjust the `WHERE` clause accordingly.
* **Efficiency:** The `NOT EXISTS` clause is generally efficient for this kind of query, as it stops searching as soon as it finds a match in the subquery.
* **Alternative with `LEFT JOIN`:** You could also achieve this with a `LEFT JOIN` and filter for nulls in the right table:

```sql
SELECT o.*
FROM orders o
LEFT JOIN orders_translations ot ON o.primary_key = ot.primary_key
WHERE ot.primary_key IS NULL;
```

This query joins the two tables based on the `primary_key` and then selects rows from `orders` where there is no corresponding `primary_key` in `orders_translations`.

**Important Note**

Ensure you replace 'primary_key' with the actual name of the primary key column in your tables.

in "SELECT 1 FROM orders_translations ot" what does 1 stand for?


In the SQL query `SELECT 1 FROM orders_translations ot`, the "1" is simply a placeholder value. It doesn't represent any actual data from the `orders_translations` table.

**Purpose**

The main purpose of this subquery within the `NOT EXISTS` clause is to check for the *existence* of a matching row in the `orders_translations` table, not to retrieve any specific data from it.  

* The `SELECT 1` essentially says, "If there's at least one row in `orders_translations` that matches the condition in the `WHERE` clause, return the value 1." 
* The `NOT EXISTS` then checks if the subquery returned any rows. If it didn't (meaning there was no match), the condition is true, and that row from the main `orders` table is included in the result.

**Why 1?**

You could use any constant value here (e.g., `SELECT 'x'`, `SELECT true`).  The specific value doesn't matter, as long as it's something that will be returned if a matching row is found. `1` is commonly used because it's simple and efficient. 

**Key Points:**

* **Focus on Existence:** The core purpose of this subquery is to determine existence, not to retrieve data.
* **Placeholder Value:** The "1" is just a placeholder to indicate that a row exists if the condition is met.
* **Efficiency:** Using a constant value like "1" can be slightly more efficient than selecting an actual column from the table, as it avoids any unnecessary data retrieval.

Let me know if you have any further questions or would like more clarification on SQL queries! 



    5.2
6.
````
