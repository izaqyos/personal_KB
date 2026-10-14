---
type: reference
title: types
description: "SQL tutorial note on types, with syntax and examples."
tags: [sql, database, tutorial, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.1.9"
---

# 3.1.9 types

[↑ Basic](/kb-db/03-sql-syntax/01-basic/README.md)

```text
Exact Numeric Data Types
DATA TYPE	FROM	TO
bigint	-9,223,372,036,854,775,808	9,223,372,036,854,775,807
int	-2,147,483,648	2,147,483,647
smallint	-32,768	32,767
tinyint	0	255
bit	0	1
decimal	-10^38 +1	10^38 -1
numeric	-10^38 +1	10^38 -1
money	-922,337,203,685,477.5808	+922,337,203,685,477.5807
smallmoney	-214,748.3648	+214,748.3647
Approximate Numeric Data Types

DATA TYPE	FROM	TO
float	-1.79E + 308	1.79E + 308
real	-3.40E + 38	3.40E + 38

Date and Time Data Types
DATA TYPE	FROM	TO
datetime	Jan 1, 1753	Dec 31, 9999
smalldatetime	Jan 1, 1900	Jun 6, 2079
date	Stores a date like June 30, 1991
time	Stores a time of day like 12:30 P.M.
Note − Here, datetime has 3.33 milliseconds accuracy where as smalldatetime has 1 minute accuracy.

Character Strings Data Types
Sr.No.	DATA TYPE & Description
1	char Maximum length of 8,000 characters.( Fixed length non-Unicode characters)

2	varchar Maximum of 8,000 characters.(Variable-length non-Unicode data).

3	varchar(max) Maximum length of 2E + 31 characters, Variable-length non-Unicode data (SQL Server 2005 only).

4	text Variable-length non-Unicode data with a maximum length of 2,147,483,647 characters.

Unicode Character Strings Data Types
Sr.No.	DATA TYPE & Description
1	nchar Maximum length of 4,000 characters.( Fixed length Unicode)

2	nvarchar Maximum length of 4,000 characters.(Variable length Unicode)

3	nvarchar(max) Maximum length of 2E + 31 characters (SQL Server 2005 only).( Variable length Unicode)

4	ntext Maximum length of 1,073,741,823 characters. ( Variable length Unicode )
```
