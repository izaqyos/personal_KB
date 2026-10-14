---
type: reference
title: Common concepts
description: Section 4 of the legacy kb-db notes.
tags: [kb-db]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "kb-db#4"
---

# Common concepts

[↑ kb-db](/kb-db/README.md)

## 4.1 Optimistic-locking

### 4.1.1 Chatgpt

#### 4.1.1.1 define optimistic locking

```text
Optimistic locking is a concurrency control mechanism used in database systems to handle concurrent access to shared data. It is based on the assumption that conflicts between multiple transactions accessing the same data are rare, so it allows concurrent operations to proceed without blocking or locking resources.

In optimistic locking, each transaction that accesses the shared data does not acquire any exclusive locks initially. Instead, it retrieves a version or timestamp associated with the data. When a transaction wants to modify the data, it checks if the version or timestamp of the data matches the version it initially read. If the versions match, it indicates that no other transaction has modified the data since it was read, and the transaction can proceed with the update. However, if the versions do not match, it means that another transaction has modified the data concurrently, and the current transaction may need to be aborted or retried.

The key idea behind optimistic locking is to delay the detection of conflicts until a transaction tries to commit its changes. By allowing concurrent transactions to proceed without blocking each other, it maximizes the system's throughput and reduces contention. However, it also introduces the possibility of conflicts that need to be resolved when committing the changes.

Optimistic locking is commonly used in scenarios where conflicts are infrequent or the cost of blocking concurrent access is high. It requires careful handling of conflicts and may involve techniques such as retrying failed transactions or applying conflict resolution strategies to ensure data consistency.

Overall, optimistic locking provides a way to achieve concurrency control in database systems by assuming that conflicts are rare and allowing transactions to proceed optimistically, only detecting and resolving conflicts when they arise during commit.
```

#### 4.1.1.2 what kind of conflicts may happen when optimistic locking is used

```text
When using optimistic locking, conflicts can occur when multiple transactions attempt to modify the same data concurrently. These conflicts arise due to the optimistic assumption that conflicts are rare and transactions can proceed without blocking each other. Here are two common types of conflicts that may happen:
```
