---
type: reference
title: advanced
description: "Advanced SQL: COALESCE and other less common functions with examples."
tags: [sql, database, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#3.2"
---

# 3.2 advanced

[↑ SQL Syntax](/kb-db/03-sql-syntax/README.md)

### 3.2.1 coalesce

```text
return first non null value
ex:
SELECT COALESCE(NULL, NULL, NULL, 'W3Schools.com', NULL, 'Example.com');
W3Schools.com

        3.2.2

    3.3
```
