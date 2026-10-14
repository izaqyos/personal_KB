---
type: reference
title: Memory Management
description: "Java memory management: getting object size without sizeof."
tags: [java, memory, guide, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#13"
---

# Memory Management

[↑ java-kb](/kb-java/README.md)

## 13.1 memsize equivalent - How to Get the Size of an Object

### 13.1.1 https://www.baeldung.com/java-size-of-object

```text
Unlike C/C++ where we can use sizeof() method to get an object size in bytes, there's no true equivalent of such method in Java.

In this article, we'll demonstrate how we can still get the size of a particular object.

Memory Consumption in Java
Although there is no sizeof operator in Java, we actually don't need one. All primitive types have a standard size, and there are typically no pad or alignment bytes. Still, this isn't always straightforward.

Although primitives must behave as if they have the official sizes, a JVM can store data in any way it pleases internally, with any amount of padding or overhead. It can choose to store a boolean[] in 64-bit long chunks like BitSet, allocate some temporary Objects on the stack or optimize some variables or method calls totally out of existence replacing them with constants, etc… But, as long as the program gives the same result, it's perfectly fine.

Taking also into the account hardware and OS caches impact (our data could be duplicated on every cache level), it means that we can only roughly predict RAM consumptionUnlike C/C++ where we can use sizeof() method to get an object size in bytes, there's no true equivalent of such method in Java.

In this article, we'll demonstrate how we can still get the size of a particular object.
```
