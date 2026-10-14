---
type: reference
title: "Copy from one table to another , backup table"
description: Subsection 3.1.39 of Basic.
tags: [kb-db, sql, syntax, llms, chatgpt, gemini]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.39"
---

# 3.1.39 Copy from one table to another , backup table

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
Copy all columns into a new table:

SELECT *
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
Copy only some columns into a new table:

SELECT column1, column2, column3, ...
INTO newtable [IN externaldb]
FROM oldtable
WHERE condition;
        3.1.40
```
