---
type: reference
title: "**`handledType` Method:**"
description: "Jackson custom serializer: the handledType method."
tags: [java, json, serialization, legacy]
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
