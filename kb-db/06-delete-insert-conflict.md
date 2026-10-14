---
type: reference
title: Delete-Insert Conflict
description: Section 2 of the legacy kb-db notes.
tags: [kb-db]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#2"
---

# Delete-Insert Conflict:

[↑ kb-db](/kb-db/README.md)

```text
   A delete-insert conflict, also known as a lost update conflict, occurs when a transaction reads a record and intends to update it, but another transaction deletes the same record and inserts a new one before the first transaction commits. As a result, the first transaction's update is applied to a non-existent record, leading to data loss or inconsistency. This conflict can be detected when the first transaction tries to commit and realizes that the record it intends to update has been deleted.

When conflicts occur, the optimistic locking approach typically involves rolling back or retrying the transaction that experiences the conflict. This allows the transaction to re-read the data, incorporate any changes made by other transactions, and reapply its modifications based on the updated data. Conflict resolution strategies may also be employed, such as selecting the most recent changes or merging conflicting updates.

It's important to note that the specific types of conflicts and their resolution methods may vary depending on the implementation and the data management system used. Optimistic locking is a technique to mitigate conflicts but does not completely eliminate them. Careful handling of conflicts is necessary to maintain data consistency when employing optimistic locking.
            4.1.1.3
        4.1.2

    4.2
```
