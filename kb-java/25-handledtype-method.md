---
type: reference
title: "**`handledType` Method:**"
description: Section 2 of the legacy java-kb notes.
tags: [kb-java]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#2"
---

# **`handledType` Method:**

[↑ java-kb](/kb-java/README.md)

````text
   - Specifies the type of objects that this serializer can handle. It's a method from the `JsonSerializer` interface.

   ```java
   @Override
   public Class<T> handledType() {
       return ...; // Return the class type that this serializer can handle
   }
   ```
````
