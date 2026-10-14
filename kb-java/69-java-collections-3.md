---
type: reference
title: java collections
description: "Java collections, e.g. Collections.singletonList and other utilities (duplicate copy of an earlier note)."
tags: [java, data-structures, examples, legacy]
generated: { by: "human:izaqyos", at: "2026-04-10T12:41:42Z" }
status: stable
capture_type: source
legacy_source: "java-kb#17"
---

# java collections, tags: java collections

[↑ java-kb](/kb-java/README.md)

## 17.1 java Collections.singletonList

````text
`Collections.singletonList()` is a method in the Java Collections Framework that returns an immutable list containing only the specified object. 

Here is an example of how to use `Collections.singletonList()`:

```java
import java.util.Collections;
import java.util.List;

public class SingletonListExample {
    public static void main(String[] args) {
        String fruit = "apple";
        List<String> fruitList = Collections.singletonList(fruit);
        System.out.println(fruitList);
    }
}
```

In this example, we use `Collections.singletonList()` to create an immutable list containing a single string object `"apple"`. The `singletonList()` method takes a single argument that represents the object to be added to the list. 

The resulting list is immutable, meaning that its size cannot be modified, and any attempt to add or remove elements will result in an `UnsupportedOperationException`. This method is useful when you need to pass a single object as a list to a method or API that expects a list as input.

Yes, here are a few other use cases where `Collections.singletonList()` can be helpful:

|1. As a return value: If you have a method that returns a list containing a single element, using `Collections.singletonList()` can be a clean and simple way to create and return that list.
|
|2. As a parameter: If you have a method that takes a list as a parameter, and you only need to pass a single element to that method, you can use `Collections.singletonList()` to create a temporary list containing that element.
|
|3. As an optimization: If you have a situation where you know that a list will only ever contain a single element, using `Collections.singletonList()` can be more memory-efficient than creating a regular ArrayList or other list implementation.

Overall, `Collections.singletonList()` is a useful utility method that can simplify your code and make it more efficient in certain situations where you only need to work with a list containing a single element.

    17.2
````
